$ErrorActionPreference = "Stop"

function WriteFile($path, $content) {
  New-Item -ItemType File -Force -Path $path | Out-Null
  Set-Content -Path $path -Value $content -Encoding UTF8
}

Write-Host "Installing dependencies..." -ForegroundColor Cyan
pnpm add rate-limiter-flexible mongodb

# ---------------- MONGO CLIENT ----------------

WriteFile "packages/vendura-next/src/mongo.ts" @"
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL!;
let client: MongoClient;

export async function getMongoClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client;
}
"@

# ---------------- RATE LIMITER ----------------

WriteFile "packages/vendura-next/src/rate-limit.ts" @"
import { RateLimiterMongo } from "rate-limiter-flexible";
import { getMongoClient } from "./mongo";

let limiter: RateLimiterMongo;

export async function rateLimit(key: string) {
  if (!limiter) {
    const client = await getMongoClient();
    limiter = new RateLimiterMongo({
      storeClient: client.db(),
      keyPrefix: "vendura_rl",
      points: 10,
      duration: 60
    });
  }

  await limiter.consume(key);
}
"@

# ---------------- REQUEST GUARD ----------------

WriteFile "packages/vendura-next/src/guard.ts" @"
import { rateLimit } from "./rate-limit";

export async function guardRequest(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("cf-connecting-ip") ??
    "unknown";

  await rateLimit(ip);
}
"@

# ---------------- EXPORTS ----------------

WriteFile "packages/vendura-next/src/index.ts" @"
export * from "./mongo";
export * from "./rate-limit";
export * from "./guard";
"@

Write-Host "✅ MongoDB-backed rate limiting added successfully" -ForegroundColor Green
Write-Host "Next: wire guardRequest() inside Next.js route handlers" -ForegroundColor Cyan
