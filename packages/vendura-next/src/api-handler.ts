import { guardRequest } from "./guard";

type ApiHandler<T = any> = (req: Request) => Promise<T>;

export function createApiHandler(handler: ApiHandler) {
  return async function (req: Request): Promise<Response> {
    try {
      await guardRequest(req);

      const result = await handler(req);

      return new Response(JSON.stringify(result ?? {}), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (err: any) {
      const status =
        err?.statusCode ||
        err?.status ||
        (err?.message === "NOT_FOUND" ? 404 : 400);

      return new Response(
        JSON.stringify({
          error: err?.message || "BAD_REQUEST"
        }),
        {
          status,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  };
}
