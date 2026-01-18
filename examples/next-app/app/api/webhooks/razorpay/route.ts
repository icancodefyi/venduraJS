import { handleRazorpayWebhook } from "@vendura/webhooks";

export async function POST(req: Request) {
  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const body = await req.json();

  try {
    await handleRazorpayWebhook(body, signature);
    return new Response("OK", { status: 200 });
  } catch {
    return new Response("Invalid webhook", { status: 400 });
  }
}
