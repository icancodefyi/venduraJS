import { NextResponse } from "next/server";
import { addItem } from "vendura-core";
import { getCart, saveCart } from "@vendura/mongodb";
import { guardRequest } from "@vendura/next";

export async function POST(req: Request) {
  await guardRequest(req);

  const body = await req.json();
  const { cartId, item } = body;

  const cart = await getCart(cartId);
  if (!cart) {
    return new NextResponse("Cart not found", { status: 404 });
  }

  addItem(cart, item);
  await saveCart(cart);

  return NextResponse.json(cart);
}
