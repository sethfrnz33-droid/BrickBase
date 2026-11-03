# Brick ECU — Website and technical documentation

Public website source for **Brick ECU**: Mini Brick and Big Brick standalone engine management.

## Site structure

The storefront and the technical manuals are separate static pages. No framework or build dependencies are needed.

| Route | Purpose |
| --- | --- |
| `/index.html` | Compact sales landing page and both Payhip purchase links |
| `/products/mini-brick.html` | Mini Brick sales page |
| `/products/big-brick.html` | Big Brick sales page |
| `/docs/index.html` | Technical documentation index |
| `/docs/big-brick.html` | Big Brick hardware specifications |
| `/docs/mini-brick.html` | Mini Brick hardware specifications |
| `/docs/big-brick-pinout.html` | Interactive 94-position A/B/C pinout |
| `/docs/compatibility.html` | Searchable engine compatibility *research* directory |
| `/docs/engines/*.html` | Engine-family reference entries (currently unvalidated) |
| `/docs/planning.html` | Documentation and verification planning |
| `/docs/software.html` | Wi-Fi, TunerStudio, logging and firmware features |

### Shared files

- `site.css` — original retro blue / beveled encyclopedia-style design with responsive pages.
- `site.js` — navigation, reveal animations, searchable engine directory.
- `pinout.js` — developer-provided Big Brick pin data; filters and copy function.
- `assets/` — original supplied PCB and vehicle photographs.

### Purchasing

- **Mini Brick**: CAD $600 shipped — https://payhip.com/b/K6IX5
- **Big Brick**: CAD $1,200 shipped — https://payhip.com/b/6OIjf

Both advertised prices include mating harness connectors and terminal pins. Payment is processed by Payhip, not this static website.

### Accuracy rules

- Big Brick has **exactly 16** low-side outputs; six of those same channels also include IGBT dumb-coil drivers.
- All **12 Big Brick smart ignition outputs are 5 V logic**, separate from **four switched VBAT high-side outputs**.
- Big Brick has the integrated LSU 4.9 controller, knock sensing and non-removable 256 MB logging card.
- Big Brick potential external GDI hardware integration is **not tested or validated**.
- Mini Brick **does not support GDI** and does **not** have an internal wideband controller.
- Big Brick pin **A17 is SGND** and pin **A19 is AV8**.
- Mini Brick has no independently confirmed complete Brick-specific terminal-level pinout in this repository.
- Engine library entries are **research candidates, not verified compatible installations**. Never invent vehicle-side pinouts, tested calibrations, sensor requirements or fuse values.

Descriptions and ratings are supplied by the Brick ECU developer; linked rusEFI manuals explain the upstream firmware/platform concepts, not guaranteed Brick-specific implementation.

### Adding validated engine guides

Each engine page must include exact engine code and model/year, OEM connector references, verified Brick ECU pin and configuration mapping, sensor power requirements, document revision, testing evidence, and known limitations. Until all are verified, leave the existing 'not assigned' placeholders and research status in place.

### Deployment

Cloudflare Workers is connected to this GitHub repository; changes to the configured production branch should trigger a deployment. The site is static HTML/CSS/JS; linked pages must be served as files from the repository root.

## External documentation

- [rusEFI Proteus manual](https://wiki.rusefi.com/Proteus-Manual/)
- [rusEFI microRusEFI wiring](https://wiki.rusefi.com/Hardware-microRusEFI-wiring/)
- [rusEFI trigger patterns](https://wiki.rusefi.com/All-Supported-Triggers/)
- [rusEFI wiring concepts](https://wiki.rusefi.com/FAQ-Basic-Wiring-and-Connections/)
