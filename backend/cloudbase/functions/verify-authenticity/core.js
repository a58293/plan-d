'use strict';

const crypto = require('node:crypto');

const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_ATTEMPTS = 30;

function normalizeCertificate(value) {
  return typeof value === 'string'
    ? value.normalize('NFKC').trim().toUpperCase().replace(/[\s-]+/g, '')
    : '';
}

function normalizeOrder(value) {
  return typeof value === 'string'
    ? value.normalize('NFKC').trim().replace(/[\s-]+/g, '')
    : '';
}

function hmac(namespace, value, pepper) {
  return crypto.createHmac('sha256', pepper).update(`${namespace}:${value}`, 'utf8').digest('hex');
}

function rowsToObjects(raw) {
  const result = raw?.Response || raw || {};
  const columns = result.Columns || [];
  const rows = result.Rows || [];
  return rows.map(row => {
    const values = typeof row === 'string' ? JSON.parse(row) : row;
    return Object.fromEntries(columns.map((column, index) => [column, values[index]]));
  });
}

function verificationSql({ codeHash, orderHash, ipHash, userAgentHash, requestId, operationId }) {
  for (const value of [codeHash, orderHash, ipHash, userAgentHash]) {
    if (!/^[0-9a-f]{64}$/.test(value)) throw new Error('INVALID_HASH');
  }
  if (!validateOperationId(operationId) || !validateOperationId(requestId)) throw new Error('INVALID_OPERATION');
  return `SELECT anti_counterfeit.verify_once('${operationId}'::uuid, '${codeHash}', '${orderHash}', '${ipHash}', '${userAgentHash}', '${requestId}'::uuid) AS payload`;
}

function publicResult(row, requestId) {
  if (row?.payload) row = typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload;
  requestId = row?.request_id || requestId;
  const result = row?.result || 'error';
  if (result === 'idempotency_conflict') return { statusCode:409, body:{ok:false,result,requestId,message:'请求标识已用于其他凭证，请重新提交。'} };
  if (!['valid_first','valid_repeat','not_found','blocked','void','rate_limited'].includes(result)) {
    return { statusCode: 500, body: { ok: false, result: 'service_unavailable', requestId, message: '核验服务暂时不可用，请稍后重试。' } };
  }
  if (result === 'rate_limited') {
    return { statusCode: 429, body: { ok: false, result, requestId, message: '查询过于频繁，请稍后再试。' } };
  }
  if (result === 'not_found') {
    return { statusCode: 200, body: { ok: false, result, requestId, message: '未找到匹配记录，请核对编号与订单号。' } };
  }
  if (result === 'blocked' || result === 'void') {
    return { statusCode: 200, body: { ok: false, result, requestId, message: '该凭证当前无法通过核验，请联系绘屿造物客服。' } };
  }

  let publicDetails = row?.public_details || {};
  if (typeof publicDetails === 'string') {
    try { publicDetails = JSON.parse(publicDetails); } catch { publicDetails = {}; }
  }
  return {
    statusCode: 200,
    body: {
      ok: true,
      result,
      requestId,
      product: {
        name: row.product_name,
        seriesName: row.series_name,
        batchCode: row.batch_code,
        serialNumber: row.serial_number,
        publicDetails,
      },
      verification: {
        count: Number(row.verification_count || 0),
        firstVerifiedAt: row.first_verified_at,
        lastVerifiedAt: row.last_verified_at,
      },
      message: result === 'valid_first'
        ? '首次核验通过。'
        : '凭证有效，但此前已被查询，请核对首次核验时间。',
    },
  };
}

function validateOperationId(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

module.exports = {
  RATE_LIMIT_ATTEMPTS,
  normalizeCertificate,
  normalizeOrder,
  hmac,
  rowsToObjects,
  verificationSql,
  publicResult,
  validateOperationId,
};
