# BrickBase — Brick ECU website

Official static Brick ECU storefront. Built as plain HTML/CSS/JavaScript with no dependencies. Connected to Cloudflare Workers by the repository owner.

## Pages and functionality

- `index.html` — product pages, comparison, FAQ, full Big Brick connector section.
- `glass.css` — translucent, Pikmin-inspired blue-green design (original styling, no Nintendo assets).
- `pinout.js` — searchable/copyable **94-position** Big Brick ECU connector reference. All IGN1–IGN12 outputs are 5 V logic; HS1–HS4 are separate VBAT high-side outputs.
- `commerce.css` — product-centric layout, comparison and ordering sections.\n- `PHOTO_GUIDE.md` — image capture instructions and launch checklist.

## Current advertised products

**Mini Brick — CAD $600 shipped:** rusEFI MRE/STM32F407 based, native Wi-Fi TunerStudio, protected outputs, 6 A H-bridge, primarily four-cylinder or six-cylinder wasted-spark applications. No GDI software and no internal wideband controller.

**Big Brick — CAD $1,200 shipped:** Proteus-based hardware with 16 low-side channels (six of those support IGBT ignition), onboard knock sensing, native Wi-Fi, LSU 4.9 wideband controller, 256 MB non-removable SD logging, and larger engine support. Possible external GDI hardware integration **has not been validated**.

Both products include mating harness connectors and pins.

## Pinout caution

The Big Brick connector reference is transcribed from the supplied hardware drawing and corrections, **not an independently validated vehicle harness schematic**. A17 is sensor ground (SGND), and A19 is AV8, per the latest corrections. The source previously mislabeled C31–C34; the user confirmed all 12 smart ignition outputs are 5 V logic. Do not wire based on unresolved labels.

## Deployment

The site is entirely static. Cloudflare should point its deployment to the repository root on `main`. The pinout filter uses client-side JavaScript; no external API is required.

## Photos and checkout

The storefront now references six prepared product/vehicle/software photos under `assets/`, including `big-brick.webp`, `mini-brick.webp`, and `vehicle.webp`. The images must be uploaded to the repository's `assets/` directory for them to display; placeholders remain as a fallback until that happens. Checkout links are also not connected. See [PHOTO_GUIDE.md](PHOTO_GUIDE.md).
