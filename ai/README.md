# Retired Ask Brick integration

As of 2026-11-19, Brick ECU no longer has a public AI assistant. The chatbot launcher, prompts, mascot, public answer page and all browser-side assistant requests have been removed from the website.

The only remaining Worker entry point is `ai/worker.js`, which returns HTTP 410 (Gone) and does not call Workers AI. `ai/wrangler.jsonc` is retained solely so a separately deployed Cloudflare Worker can be redeployed with the disabled handler. Previously deployed Workers are outside GitHub's control: disable/delete `brick-ecu-help` in the Cloudflare account to guarantee it cannot process further requests. The website itself no longer requests this service.

The previous implementation is recoverable from Git history but must not be advertised as active. Use the installation guide and published documentation for support.
