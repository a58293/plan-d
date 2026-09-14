// Persist only a random retry token, never certificates, orders or their hashes.
const storageKey = 'lumen-pending-verification-v1';
let pending: {id: string; pair?: string} | null = null;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function beginVerificationOperation(certificate: string, order: string) {
  const pair = `${certificate}:${order}`;
  if (!pending) {
    try {
      const id = sessionStorage.getItem(storageKey);
      if (id && uuid.test(id)) pending = {id};
    } catch { /* restricted storage: in-memory retries still work */ }
  }
  if (!pending || (pending.pair !== undefined && pending.pair !== pair)) {
    pending = {id: crypto.randomUUID(), pair};
  }
  pending.pair = pair;
  try { sessionStorage.setItem(storageKey, pending.id); } catch { /* optional */ }
  return pending.id;
}
export function completeVerificationOperation(id: string) {
  if (pending?.id !== id) return;
  pending = null;
  try { sessionStorage.removeItem(storageKey); } catch { /* optional */ }
}
