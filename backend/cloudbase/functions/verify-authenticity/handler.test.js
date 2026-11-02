'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {createHandler}=require('./index');
test('invalid JSON, null and arrays return client errors without database access',async()=>{
 process.env.VERIFICATION_HASH_PEPPER='test-pepper-'.repeat(4);
 const handler=createHandler(()=>{throw Error('must not access database');});
 for(const body of ['{','null','[]']) {
  const result=await handler({httpMethod:'POST',body});
  assert.equal(result.statusCode,400);assert.equal(JSON.parse(result.body).result,'invalid_input');
 }
});
test('health fails closed for missing configuration, migration or unavailable database',async()=>{
 delete process.env.VERIFICATION_HASH_PEPPER;
 assert.equal((await createHandler()({httpMethod:'GET'})).statusCode,503);
 process.env.VERIFICATION_HASH_PEPPER='test-pepper-'.repeat(4);
 for(const provider of [()=>({executePGSql:async()=>({Columns:['ready'],Rows:[[false]]})}),()=>({executePGSql:async()=>{throw Error('offline');}})]) assert.equal((await createHandler(provider)({httpMethod:'GET'})).statusCode,503);
 assert.equal((await createHandler(()=>({executePGSql:async()=>({Columns:['ready'],Rows:[[true]]})}))({httpMethod:'GET'})).statusCode,200);
});
