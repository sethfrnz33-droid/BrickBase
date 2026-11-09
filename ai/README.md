# Ask Brick — website AI documentation assistant

**Status:** Frontend and backend source committed; **not automatically live** on the existing Cloudflare Workers static deployment. The chat launcher is always visible. If the Worker reports `configured: true`, live AI answers are enabled; otherwise the widget uses clearly labelled built-in documentation answers, without any AI inference.

This provides short answers to basic Brick ECU product, wiring-reference and tuning-concept questions. The replies use a curated product/documentation knowledge base, and the UI shows **actual local documentation links** alongside each answer. It cannot read an ECU, calculate a verified base tune, produce a confirmed donor-vehicle pinout, connect to TunerStudio, or approve a particular installation.

## Files

- `/ai/knowledge.js` — source-linked summaries of Brick ECU product specs, native high-impedance injector support, wiring-reference locations, TunerStudio, orders and safety.
- `/ai/worker.js` — request validation, short AI prompt, Cloudflare Workers AI inference, server-returned source links, CORS.
- `/ai/config.js` — endpoint for the optional standalone ES-module widget. The live storefront currently embeds its chat widget in root `site.js`, with its own `ENDPOINT` constant.
- `/ai/widget.js` — small accessibility-conscious conversation interface, loaded from the shared `site.js` on every website page.
- `/ai/wrangler.jsonc` — standalone Workers AI deployment configuration.

## Deployment — current static Cloudflare Workers website

BrickBase currently has static HTML/CSS/JS with **no Worker entry script or Wrangler asset configuration in this repository**. GitHub auto-deployment of the storefront alone will *not* activate an API route or AI binding. Do **not** add secret keys to the public website. Workers AI uses a server-side Cloudflare `AI` binding.

### Easiest setup — Cloudflare dashboard + existing GitHub repository

You can use Cloudflare's built-in **GitHub Worker deployment** without setting up a local build tool. In Workers & Pages → **Create application → GitHub**, select the **same BrickBase repository** again to create a **separate** Worker. For this new Worker, set the **root directory to `ai`** (which contains `wrangler.jsonc`); use the Worker name **`brick-ecu-help`**, matching that config. Cloudflare's default deploy command is `npx wrangler deploy`. Confirm the `AI` binding appears in the new Worker's settings and inspect the deployed Worker URL. This is a separate app and does not replace the existing storefront.

Then follow steps 3–5 in Option A below to allow the store's exact origin and set the `ENDPOINT` constant in root `site.js` to the new Worker's real URL. **An account owner must configure the Cloudflare Worker and billing/security settings; this code commit cannot turn on the live service by itself.**

References: [Cloudflare Git integration](https://developers.cloudflare.com/workers/ci-cd/builds/) and [monorepo root directories](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/).

### Option A — separate backend Worker (does not affect store deployment)

1. In your local clone of BrickBase, open a terminal in `ai/`. Log in to the appropriate Cloudflare account with `npx wrangler login`.
2. Deploy the separate service with `npx wrangler deploy --config wrangler.jsonc`. Its `AI` binding is already declared in that configuration. Cloudflare returns a Worker URL like `https://brick-ecu-help.<YOUR-SUBDOMAIN>.workers.dev`. **This is a placeholder, not a verified or preconfigured URL.**
3. In Cloudflare Workers & Pages → select `brick-ecu-help` → Settings → Variables and Secrets, add a **plain text** `ALLOWED_ORIGINS` value containing the *actual complete origin* of your website, for example `https://YOUR-REAL-DOMAIN`. If you use multiple site origins, separate them with commas. No wildcard or trailing slash. Redeploy the AI Worker if your dashboard requires it.
4. For the current public storefront, change the `ENDPOINT` constant in root `site.js` to the real HTTPS Worker URL; also change `API_ENDPOINT` in `ai/config.js` if independently using the ES-module `ai/widget.js`. Commit the source changes to the storefront.
5. Open the Worker URL: `GET /` should respond with JSON containing `"service":"Brick ECU help","configured":true`. From your store origin, the widget should switch from documentation-only answers to AI-powered answers and send a successful POST request. If it stays hidden, check the browser's Network panel for endpoint/CORS errors and confirm `ALLOWED_ORIGINS`.

### Option B — same-origin Worker route

Attach the AI Worker to an existing Cloudflare-proxied **custom hostname** on route `/api/brick-help*` using Cloudflare Worker routing if compatible with your domain's present Worker deployment. The public widget default `API_ENDPOINT="/api/brick-help"` then works unchanged, with no cross-origin requests. **Do not replace the static site's origin Worker or route all traffic to this API Worker.** Determine the actual Cloudflare hostname/routing before creating a route; this repo doesn't specify it.

### Important: don't deploy the storefront as the AI Worker

The storefront and assistant are **two separately deployed Workers** connected to the same GitHub repository. For the **storefront** Worker, use the repository root (`/`) and its existing static deployment settings. For the **brick-ecu-help** Worker, set **Settings → Build → Root directory** to `ai` and deploy with `npx wrangler deploy`. The AI Worker uses `ai/wrangler.jsonc` and `ai/worker.js`.

An obsolete optional Cloudflare Pages Function formerly at `functions/api/brick-help.js` caused Wrangler 4.157.0 to reject deploying the static repository root. That file was deleted 2026-11-03. The top-level `functions/` directory is **absent** from the GitHub root, so this specific error is resolved. If Cloudflare still shows the old checkout, trigger a fresh deployment from the latest commit rather than a stale earlier commit.

The separate AI Worker does not automatically give your storefront an API path: use the Worker URL in `ai/config.js` plus the correct `ALLOWED_ORIGINS` as outlined above. The chat launcher remains visible and switches to Cloudflare AI only when the Worker returns `configured: true`.


## Billing and abuse controls

Workers AI offers an account-dependent free allocation and usage-based pricing. Check the latest Cloudflare pricing before making the service public: <https://developers.cloudflare.com/workers-ai/platform/pricing/>. The backend restricts message length, shortens chat history, limits output tokens, rejects unapproved browser origins and returns `Cache-Control: no-store`, but **it does not implement persistent per-IP rate limiting or a daily budget cap**.

Before enabling on a public domain, configure appropriate Cloudflare WAF rate limiting/Turnstile or a Cloudflare-supported rate-limit binding for the API Worker, and set billing alerts or limits as appropriate for your account. CORS/Origin checks are **not authentication** and do not stop scripted abuse or unexpected inference spending.

No application-side transcripts are intentionally logged or saved by this code. Requests still reach Cloudflare's AI infrastructure; review the Cloudflare account's inference data policies and any platform logging/analytics configuration.

## Response limits

- Use `@cf/meta/llama-3.1-8b-instruct-fast` by default through `env.AI.run` (override with a compatible `AI_MODEL` environment variable if needed).
- The assistant must not invent Brick connector cavities, sensor/coil voltages, crank/cam decoder configurations, tuning numbers or fixed ignition/dwell settings.
- It may explain concepts, refer readers to engine-specific references, and answer general product/sales questions.
- High-impedance (>8 Ω) port injectors are natively supported; low-impedance injectors need a verified current-limiting arrangement.
- It must distinguish VQ35DE Big Brick developer testing, a **family-level** Gen IV LS report, and unrelated upstream rusEFI community runs.
- For installation work, vehicle electrical safety, and live engine control, recommend checking the actual hardware/vehicle service manual and seeking qualified assistance.
- The client renders answers using text only, never model-generated HTML, and attaches links from a controlled list of local documentation pages.

## Smoke test

Check `GET /api/brick-help` (or the separate Worker URL) for `configured: true`. Example test questions: “Does Mini Brick drive high-impedance injectors?”, “Where is the Big Brick pinout?”, “What does a crank trigger decoder do?”, “How does TunerStudio Lite differ from registered?”, and “Which engines have been reported running on Big Brick?”.

Confirm the answer **does not** fabricate a pin, guaranteed engine support or a complete tune, and that document links open on the store domain. If `AI` is unbound, the health check returns `configured: false` and the public widget uses built-in documentation answers without AI inference.

Official Cloudflare documentation:
- <https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/>
- <https://developers.cloudflare.com/workers-ai/configuration/bindings/>
- <https://developers.cloudflare.com/pages/functions/bindings/>
- <https://developers.cloudflare.com/workers/configuration/routing/routes/>

## Mini Brick availability policy
Mini Brick is in development, is not for sale and has no announced launch date. Keep the hardcoded fallback in root `site.js`, the optional `ai/widget.js`, the server knowledge in `ai/knowledge.js` and the Worker system guidance consistent. Never offer a Mini Brick purchase or shipment date until the developer confirms its launch.
