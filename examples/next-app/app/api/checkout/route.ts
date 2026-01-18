import { NextResponse } from "next/server";
import { createOrder } from "vendura-core";
import { getCart, saveOrder } from "@vendura/mongodb";
import { guardRequest } from "@vendura/next";

export async function POST(req: Request) {
  await guardRequest(req);

  const { cartId } = await req.json();
  const cart = await getCart(cartId);

  if (!cart) {
    return new NextResponse("Cart not found", { status: 404 });
  }

  const order = createOrder(cart);
  await saveOrder(order);

  return NextResponse.json(order);
}
