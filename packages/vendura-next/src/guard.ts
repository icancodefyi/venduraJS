import { rateLimit } from "./rate-limit";

export async function guardRequest(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown";

  await rateLimit(ip);
}
