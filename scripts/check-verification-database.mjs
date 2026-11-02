import {PGlite} from '@electric-sql/pglite';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {randomUUID} from 'node:crypto';
import assert from 'node:assert/strict';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
const require=createRequire(import.meta.url);
const {publicResult}=require('../backend/cloudbase/functions/verify-authenticity/core.js');
const db=new PGlite();
try {
  for(const name of ['001_init_anti_counterfeit.sql','002_add_order_hash.sql','003_idempotent_verifications.sql','004_atomic_verification.sql']) await db.exec(await readFile(new URL('../backend/cloudbase/'+name,import.meta.url),'utf8'));
  await db.exec(`INSERT INTO anti_counterfeit.authenticity_codes(batch_id,serial_number,code_hash,order_hash) SELECT id,'TEST',repeat('a',64),repeat('b',64) FROM anti_counterfeit.batches LIMIT 1`);
  const call=async(op,code='a'.repeat(64))=>(await db.query('SELECT anti_counterfeit.verify_once($1::uuid,$2,$3,$4,$5,$6::uuid) AS payload',[op,code,'b'.repeat(64),'c'.repeat(64),'d'.repeat(64),randomUUID()])).rows[0].payload;
  const op=randomUUID(), first=await call(op);
  assert.equal(first.result,'valid_first');
  assert.deepEqual(await call(op),first,'Lost-response retry must replay original result');
  assert.equal((await call(op,'e'.repeat(64))).result,'idempotency_conflict');
  const repeats=await Promise.all(Array.from({length:8},()=>call(op)));
  assert.ok(repeats.every(row=>JSON.stringify(row)===JSON.stringify(first)));
  assert.equal((await db.query('SELECT verification_count FROM anti_counterfeit.authenticity_codes')).rows[0].verification_count,1);
  for(const status of ['blocked','void']) {
    await db.query('UPDATE anti_counterfeit.authenticity_codes SET status=$1',[status]);
    assert.equal((await call(randomUUID())).result,status);
  }
  assert.equal((await db.query('SELECT verification_count FROM anti_counterfeit.authenticity_codes')).rows[0].verification_count,1);
  await db.exec("UPDATE anti_counterfeit.authenticity_codes SET status='active'");
  assert.equal((await call(randomUUID())).verification_count,2);
  assert.equal((await call(randomUUID(),'e'.repeat(64))).result,'not_found');
  for(const result of ['unexpected','error',undefined]) assert.equal(publicResult({result},'test').body.ok,false);
  const count=(await db.query('SELECT COUNT(*)::int AS n FROM anti_counterfeit.verification_events')).rows[0].n;
  assert.equal(count,5,'Retries and conflicts must not create extra attempt events');
  const temporary=await mkdtemp(join(tmpdir(),'lumen-import-'));
  try {
    const csv=join(temporary,'input.csv'),sql=join(temporary,'output.sql');
    const generate=async(batch,order='123456789012')=>{
      await rm(sql,{force:true});
      await writeFile(csv,`serial_number,certificate_code,order_number,batch_code\nIMPORT-TEST,ABCDEFGHIJKL,${order},${batch}\n`);
      execFileSync(process.execPath,['backend/cloudbase/tools/build-code-import.mjs',csv,sql],{env:{...process.env,VERIFICATION_HASH_PEPPER:'test-only-'.repeat(5)},stdio:'pipe'});
      return readFile(sql,'utf8');
    };
    await assert.rejects(async()=>db.exec(await generate('MISSING')),/Unknown batch/);await db.exec('ROLLBACK');
    const valid=await generate('JX-001');await db.exec(valid);await db.exec(valid);
    assert.equal((await db.query("SELECT COUNT(*)::int n FROM anti_counterfeit.authenticity_codes WHERE serial_number='IMPORT-TEST'")).rows[0].n,1);
    await assert.rejects(async()=>db.exec(await generate('JX-001','987654321012')),/Conflicting/);await db.exec('ROLLBACK');
  } finally {await rm(temporary,{recursive:true,force:true});}
  console.log('防伪数据库验证通过：迁移、重试回放、冲突、重复提交、禁用/作废、恢复状态和未知响应。');
} finally {await db.close();}
