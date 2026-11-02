import { createHmac } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [, , inputName, outputName = 'authenticity-code-import.sql'] = process.argv;
const pepper = process.env.VERIFICATION_HASH_PEPPER || '';
if (!inputName) throw new Error('请提供 CSV 文件路径。');
if (pepper.length < 32) throw new Error('请先设置至少 32 字符的 VERIFICATION_HASH_PEPPER。');

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted && char === '"' && text[i + 1] === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && text[i + 1] === '\n') i += 1;
      row.push(cell); cell = '';
      if (row.some(value => value.trim())) rows.push(row);
      row = [];
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  if (quoted) throw new Error('CSV 引号未闭合。');
  return rows;
}

const quote = value => `'${String(value).replaceAll("'", "''")}'`;
const normalizeCode = value => value.normalize('NFKC').trim().toUpperCase().replace(/[\s-]+/g, '');
const normalizeOrder = value => value.normalize('NFKC').trim().replace(/[\s-]+/g, '');
const hash = (namespace, value) => createHmac('sha256', pepper).update(`${namespace}:${value}`, 'utf8').digest('hex');

const parsed = parseCsv(await readFile(resolve(inputName), 'utf8'));
const headers = parsed.shift()?.map(value => value.trim().replace(/^\uFEFF/, '')) || [];
const required = ['serial_number', 'certificate_code', 'order_number', 'batch_code'];
for (const field of required) if (!headers.includes(field)) throw new Error(`CSV 缺少列：${field}`);
const seenCodes = new Set(), seenSerials = new Set();
const values = parsed.map((cells, rowIndex) => {
  const item = Object.fromEntries(headers.map((header, index) => [header, (cells[index] || '').trim()]));
  const code = normalizeCode(item.certificate_code);
  const order = normalizeOrder(item.order_number);
  if (!item.serial_number || !item.batch_code || !/^[A-Z0-9]{12,32}$/.test(code) || !/^\d{10,32}$/.test(order)) {
    throw new Error(`第 ${rowIndex + 2} 行字段为空或格式不正确。`);
  }
  if (seenCodes.has(code) || seenSerials.has(item.serial_number)) throw new Error(`第 ${rowIndex + 2} 行存在重复编号。`);
  seenCodes.add(code); seenSerials.add(item.serial_number);
  return `(${quote(item.serial_number)}, ${quote(hash('code', code))}, ${quote(hash('order', order))}, ${quote(item.batch_code)})`;
});
if (!values.length) throw new Error('CSV 中没有可导入的数据。');

const sql = `BEGIN;
LOCK TABLE anti_counterfeit.authenticity_codes IN SHARE ROW EXCLUSIVE MODE;
CREATE TEMP TABLE incoming(serial_number TEXT, code_hash TEXT, order_hash TEXT, batch_code TEXT) ON COMMIT DROP;
INSERT INTO incoming VALUES ${values.join(',\n')};
DO $$
BEGIN
  IF EXISTS(SELECT 1 FROM incoming i LEFT JOIN anti_counterfeit.batches b ON b.batch_code=i.batch_code WHERE b.id IS NULL) THEN
    RAISE EXCEPTION 'Unknown batch: import cancelled';
  END IF;
  IF EXISTS(SELECT 1 FROM incoming i JOIN anti_counterfeit.authenticity_codes ac ON ac.serial_number=i.serial_number OR ac.code_hash=i.code_hash
    JOIN anti_counterfeit.batches b ON b.batch_code=i.batch_code
    WHERE ac.serial_number<>i.serial_number OR ac.code_hash<>i.code_hash OR ac.order_hash IS DISTINCT FROM i.order_hash OR ac.batch_id<>b.id) THEN
    RAISE EXCEPTION 'Conflicting serial, code, order or batch: import cancelled';
  END IF;
END $$;
WITH inserted AS (
  INSERT INTO anti_counterfeit.authenticity_codes(batch_id,serial_number,code_hash,order_hash)
  SELECT b.id,i.serial_number,i.code_hash,i.order_hash FROM incoming i JOIN anti_counterfeit.batches b ON b.batch_code=i.batch_code
  ON CONFLICT(serial_number) DO NOTHING RETURNING id
)
SELECT ${values.length} AS expected, COUNT(*) AS inserted, ${values.length}-COUNT(*) AS identical_skipped, 0 AS conflicts FROM inserted;
COMMIT;
`;

await writeFile(resolve(outputName), sql, { encoding: 'utf8', flag: 'wx' });
console.log(`已生成 ${values.length} 条待导入记录（执行后核对 inserted/identical_skipped）：${resolve(outputName)}`);
