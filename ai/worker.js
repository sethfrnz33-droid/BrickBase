/* The former Ask Brick AI endpoint is retired.
   This deliberately provides no inference or user-facing assistant.
   If an existing Cloudflare Worker was deployed separately, redeploy this
   source or disable that Worker in Cloudflare to deactivate the old endpoint. */
export async function handleRequest() {
  return new Response("This assistant has been retired.", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff"
    }
  });
}
export default {fetch: handleRequest};
