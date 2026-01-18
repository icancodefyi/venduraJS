import { razorpay } from "./client";
import { Order } from "vendura-core";

export async function createRazorpayOrder(order: Order) {
  return razorpay.orders.create({
    amount: order.total.amount,
    currency: order.total.currency,
    receipt: order.id
  });
}
