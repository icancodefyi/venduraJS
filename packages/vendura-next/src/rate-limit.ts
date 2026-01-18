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
