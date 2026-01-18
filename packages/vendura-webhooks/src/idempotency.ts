import { getClient } from "@vendura/mongodb";

const COLLECTION = "vendura_webhook_events";

export async function hasProcessed(eventId: string): Promise<boolean> {
  const client = await getClient();
  const existing = await client
    .db()
    .collection(COLLECTION)
    .findOne({ eventId });

  return !!existing;
}

export async function markProcessed(eventId: string) {
  const client = await getClient();
  await client.db().collection(COLLECTION).insertOne({
    eventId,
    processedAt: new Date()
  });
}
