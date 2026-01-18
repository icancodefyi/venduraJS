const buckets = new Map<string, { count: number; ts: number }>();

export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60000
) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now - bucket.ts > windowMs) {
    buckets.set(key, { count: 1, ts: now });
    return;
  }

  if (bucket.count >= limit) {
    throw new Error("RATE_LIMITED");
  }

  bucket.count++;
}
