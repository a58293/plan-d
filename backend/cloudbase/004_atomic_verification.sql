BEGIN;
CREATE TABLE IF NOT EXISTS anti_counterfeit.verification_operations (
  operation_id UUID PRIMARY KEY,
  code_hash CHAR(64) NOT NULL,
  order_hash CHAR(64) NOT NULL,
  response JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION anti_counterfeit.verify_once(
  op UUID, code_value TEXT, order_value TEXT, ip_value TEXT, ua_value TEXT, req UUID
) RETURNS JSONB LANGUAGE plpgsql VOLATILE AS $$
DECLARE
  previous anti_counterfeit.verification_operations%ROWTYPE;
  matched RECORD;
  attempts INTEGER;
  outcome TEXT;
  payload JSONB;
BEGIN
  -- Each statement below gets a fresh READ COMMITTED snapshot after waiting.
  PERFORM pg_advisory_xact_lock(hashtextextended(op::text, 0));
  SELECT * INTO previous FROM anti_counterfeit.verification_operations WHERE operation_id = op;
  IF FOUND THEN
    IF previous.code_hash <> code_value OR previous.order_hash <> order_value THEN
      RETURN jsonb_build_object('result','idempotency_conflict');
    END IF;
    RETURN previous.response;
  END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(ip_value, 1));
  SELECT COUNT(*) INTO attempts FROM anti_counterfeit.verification_events
    WHERE ip_hash = ip_value AND occurred_at >= NOW() - INTERVAL '10 minutes';
  IF attempts >= 30 THEN
    outcome := 'rate_limited';
  ELSE
    SELECT ac.*, b.batch_code, p.name AS product_name, p.series_name, p.public_details
      INTO matched FROM anti_counterfeit.authenticity_codes ac
      JOIN anti_counterfeit.batches b ON b.id = ac.batch_id
      JOIN anti_counterfeit.products p ON p.id = b.product_id
      WHERE ac.code_hash = code_value AND ac.order_hash = order_value FOR UPDATE OF ac;
    IF NOT FOUND THEN outcome := 'not_found';
    ELSIF matched.status IN ('blocked','void') THEN outcome := matched.status;
    ELSIF matched.status = 'active' THEN
      UPDATE anti_counterfeit.authenticity_codes SET
        verification_count = verification_count + 1,
        first_verified_at = COALESCE(first_verified_at, NOW()), last_verified_at = NOW()
        WHERE id = matched.id
        RETURNING verification_count, first_verified_at, last_verified_at
        INTO matched.verification_count, matched.first_verified_at, matched.last_verified_at;
      outcome := CASE WHEN matched.verification_count = 1 THEN 'valid_first' ELSE 'valid_repeat' END;
    ELSE RAISE EXCEPTION 'Unexpected credential status';
    END IF;
  END IF;
  payload := jsonb_build_object('result',outcome,'request_id',req);
  IF outcome IN ('valid_first','valid_repeat') THEN
    payload := payload || jsonb_build_object('serial_number',matched.serial_number,
      'verification_count',matched.verification_count,'first_verified_at',matched.first_verified_at,
      'last_verified_at',matched.last_verified_at,'batch_code',matched.batch_code,
      'product_name',matched.product_name,'series_name',matched.series_name,'public_details',matched.public_details);
  END IF;
  INSERT INTO anti_counterfeit.verification_events
    (request_id,operation_id,authenticity_code_id,submitted_hash,result,ip_hash,user_agent_hash)
    VALUES (req::text,CASE WHEN outcome = 'rate_limited' THEN gen_random_uuid() ELSE op END,CASE WHEN outcome IN ('valid_first','valid_repeat','blocked','void') THEN matched.id ELSE NULL END,
      code_value,outcome,ip_value,ua_value);
  -- Rate limits are temporary; retries may proceed once the window expires.
  IF outcome <> 'rate_limited' THEN
    INSERT INTO anti_counterfeit.verification_operations(operation_id,code_hash,order_hash,response)
      VALUES(op,code_value,order_value,payload);
  END IF;
  RETURN payload;
END;
$$;
COMMIT;
