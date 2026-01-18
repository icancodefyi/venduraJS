type WebhookContext = {
  body: any;
  rawBody: string;
  headers: Headers;
};

type WebhookHandler = (ctx: WebhookContext) => Promise<void>;

export function createWebhookHandler(handler: WebhookHandler) {
  return async function (req: Request): Promise<Response> {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const rawBody = await req.text();
    let body: any;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    try {
      await handler({
        body,
        rawBody,
        headers: req.headers
      });

      return new Response("OK", { status: 200 });
    } catch (err) {
      return new Response("Webhook Error", { status: 400 });
    }
  };
}
