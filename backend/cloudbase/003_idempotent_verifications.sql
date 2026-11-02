BEGIN;

ALTER TABLE anti_counterfeit.verification_events
  ADD COLUMN IF NOT EXISTS operation_id UUID;

-- Legacy rows have no client operation key; assign unique migration-only IDs.
UPDATE anti_counterfeit.verification_events
SET operation_id = gen_random_uuid()
WHERE operation_id IS NULL;

ALTER TABLE anti_counterfeit.verification_events
  ALTER COLUMN operation_id SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_verification_events_operation_id
  ON anti_counterfeit.verification_events(operation_id);

COMMIT;
