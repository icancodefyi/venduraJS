import { verifyRazorpaySignature } from "@vendura/razorpay";
import { getOrder, saveOrder } from "@vendura/mongodb";
import { assertTransition } from "vendura-core";
import { hasProcessed, markProcessed } from "./idempotency";

export async function handleRazorpayWebhook(
  payload: any,
  signature: string
) {
  const eventId = payload.event_id;
  if (await hasProcessed(eventId)) return;

  const entity = payload.payload.payment.entity;
  const orderId = entity.order_id;
  const paymentId = entity.id;

  if (!verifyRazorpaySignature(orderId, paymentId, signature)) {
    throw new Error("INVALID_SIGNATURE");
  }

  const order = await getOrder(entity.receipt);
  if (!order) throw new Error("ORDER_NOT_FOUND");

  if (payload.event === "payment.captured") {
    assertTransition(order.state, "PAID");
    order.state = "PAID";
  }

  if (payload.event === "payment.failed") {
    assertTransition(order.state, "FAILED");
    order.state = "FAILED";
  }

  await saveOrder(order);
  await markProcessed(eventId);
}
