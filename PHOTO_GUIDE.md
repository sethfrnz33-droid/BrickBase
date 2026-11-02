# Brick ECU website asset guide

Website source: `index.html` (static; no build tools required).

## Photos to provide
1. **Hero:** Big Brick and Mini Brick together at a 3/4 angle, preferably on a matte dark background, horizontal ~2000 × 1200 px.
2. **Big Brick:** isolated high-resolution 3/4 product photo and straight-on top view.
3. **Mini Brick:** same lighting and angle as the Big Brick photos.
4. **Connector kits:** each ECU with the included mating connectors and terminal pins clearly visible.
5. **Board details:** sharp macro/top-down shots of both PCBs and connector faces, with no serial numbers or sensitive labels exposed.
6. **Software:** real TunerStudio connected screenshot and captive portal screenshot, with personal credentials/network information hidden.
7. **Optional:** professionally photographed installed ECU or clean wiring harness.

Use neutral, consistent lighting. Ideally provide lossless PNG or high-quality JPEG; web-optimized WebP can be prepared afterward. No AI-generated product imagery is currently used.

## Launch checklist
- Replace the labeled photo placeholders in `index.html` with real photos.
- Add official Payhip product URLs to purchase buttons; the current site deliberately does not pretend checkout exists.
- Verify final published pinouts, electrical ratings, CAN interfaces, firmware capabilities, warranty and regional shipping terms.
- Add privacy/contact/terms information before accepting orders.
- Deploy as a static site through Cloudflare Pages or GitHub Pages.

## Product data accuracy
- Big Brick has **16 total** low-side outputs, and **6 of those same 16** also drive dumb coils through IGBT stages. Do not add them twice.
- Big Brick GDI integration is experimental and has **not** been validated; requires separate external drivers.
- Mini Brick does not contain GDI software support.
- Both models include mating harness connectors and pins, and listed CAD prices include shipping and delivery.
