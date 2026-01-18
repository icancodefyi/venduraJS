import { NextResponse } from "next/server";
import { createCart } from "vendura-core";
import { saveCart } from "@vendura/mongodb";
import { guardRequest } from "@vendura/next";

export async function POST(req: Request) {
  await guardRequest(req);

  const cart = createCart();
  await saveCart(cart);

  return NextResponse.json(cart);
}
