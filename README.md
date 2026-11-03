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
| `/docs/compatibility.html` | Cascading text-only engine finder with 166 named/pattern/research entries across 22 manufacturers |
| `/docs/visual-library.html` | Original full-size Big Brick connector A/B/C posters only |
| `/docs/planning.html` | Documentation and verification planning |
| `/docs/software.html` | Wi-Fi, TunerStudio, logging and firmware features |

### Shared files

- `site.css` — original retro blue / beveled encyclopedia-style design with responsive pages.
- `site.js` — navigation and reveal animations.
- `pinout.js` — developer-provided Big Brick pin data; filters and copy function.
- `docs/assets/full-pinout-connector-{a,b,c}.svg` — illustrated full-page connector/pin tables sourced from `pinout.js`.
- `docs/engine-finder-data.js` — text-only research catalog (166 make/family/engine entries; current rusEFI named decoders and pattern candidates kept distinct).
- `docs/engine-finder.js` — cascading manufacturer/family/engine selection, code search, live results, detailed text card and shareable engine deep links.
- The five obsolete engine SVG sheets and five obsolete engine HTML pages were deliberately removed and replaced by the finder. Physical connector posters were retained.
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
- Big Brick pin **A17 is SGND**, pin **A19 is AV8**, and **C9 / PRTL resets forgotten Wi-Fi SSID and password** (it is not the ordinary captive portal trigger).
- Connector B H-bridge outputs B1/B2/B4/B5 are annotated **6 A max** in the developer-supplied original pinout drawing; earlier 8 A transcription was incorrect.
- Engine factory coil type varies: M54 passive/dumb (DME-side driver); common GM LS smart; VW 1.8T AEB external module vs later internal igniter; early 4G63 turbo external igniter vs some later internal igniters; K20A/K24A factory coils to be confirmed for the exact part and year.
- The previous AI-generated engine wiring diagrams contained unverified assumptions and **must not be treated as installation instructions**.
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

## Confirmed research notes (user-reviewed)

- **GM LS Gen IV factory 58X crank sensor:** use **5 V supply**, consistent with the MicroSquirt/MegaSquirt reference and confirmed by the project owner on 2026-11-02. An earlier third-party Haltech wiring reference cited 12 V; do not copy that into Brick ECU wiring guidance for the factory Gen IV 58X sensor. Verify sensor part number and signal pull-up requirements for every actual harness before publishing a connector-level wiring diagram.
- **Gen III 24X** uses a 12 V supplied internally conditioned digital crank sensor, generally a 1X cam and factory smart coils. **Gen IV 58X** uses a different crank pattern and 4X cam, generally smart coils. **Gen V 58X / 4X** additionally introduces GDI that is not validated on Big Brick.
- Big Brick LS candidate support is not a proven vehicle installation; publish engine-specific physical connector maps only after sensor/harness variant verification.

- **Always publish exact rusEFI / TunerStudio selections as well as hardware:** crank trigger pattern and menu label, cam/VVT wheel mode and menu label, trigger input pin assignment, Hall/VR classification and sensor supply voltage, trigger edge/polarity, trigger angle/offset, synchronization evidence, ignition-driver type, injector type, and firmware build used. Do not use physical wheel descriptions alone in a base-calibration guide.
- **GM Gen III 24X:** starting crank menu family **GM 24x** (rusEFI firmware enumerates **GM 24x 3 degree** and **GM 24x 5 degree** variants; match actual wheel/firmware rather than assuming either). Cam mode is **Half Moon** or **Single Tooth**, depending on the physical cam wheel; aftermarket conversion kits may change the correct choice. User-supplied configuration guidance, checked against rusEFI supported-trigger enumeration; not a fully verified Brick calibration.
- **GM Gen IV 58X / 4X:** starting crank mode **60-2** and cam/VVT mode **Bosch Quick Start**, per user-verified rusEFI setup. rusEFI documents both 60-2 and Bosch Quick Start menu choices; confirm actual cam waveform/4X compatibility with the installed firmware and trigger logger before publishing as a tested preset. Factory Gen IV 58X crank sensor **5 V** supply as noted above.
- **GM mixed trigger builds:** choose from the physical crank/cam hardware, not just the nominal engine generation; cam kits and timing covers can swap 1X, 2X, and 4X hardware. A 24X crank + 4X cam combination is specifically reported unsupported in Haltech's documented LS trigger combinations; no assumption that rusEFI matches this without separate verification.
- Apply the same crank-menu + cam-menu + electrical requirements + trigger-angle verification to each BMW engine variant when research is reviewed. Store unknown selections as **unverified**, never infer from BMW family or 60-2 tooth count alone.
- **Honda K20/K24 buyer caution:** community members have reportedly observed significant ignition-timing wander with rusEFI's factory 12+1 Honda K crank decoder. The reports are user-supplied and have not been independently reproduced or verified on Brick ECU. Do not assume that decoder availability demonstrates timing stability: assess logged synchronization and fixed timing against a physical reference; consider compatible higher-resolution trigger-wheel options if reliable timing is not achieved. No replacement-wheel/decoder combination has been validated on Brick ECU.

## Trigger wheel and synchronization constraints

- **Big Brick / rusEFI general wheel configuration limit: 300 teeth per crank revolution** (current TunerStudio `customTotalToothCount` upper bound is 300). Check the actual tooth/event count in the correct rotational domain, and ensure the chosen decoder supports the electrical waveform; tooth count alone does not establish compatibility.
- **GM Gen II LT1/LT4 Optispark:** the distributor is driven at cam speed and contains **360 high-resolution optical slots per distributor revolution** (equivalent to **180 slots per crankshaft revolution**) plus a separate **8-slot, varying-width low-resolution track**. Do not incorrectly classify it as >300 teeth *per crank revolution* based on the 360-slot number.
- Current rusEFI offers the exact trigger option **`GM LT1 Optispark (8-slot only)`**. This uses the low-resolution 8-slot track and *does not* read the 360-slot track. An aftermarket crank trigger wheel is **not inherently required** if the 8-slot decoding and installation are suitable, but is a reasonable separately validated option when higher-resolution triggering is desired.
- As with all engine guides, require actual sync logs and verified ignition timing stability before advertising confirmed support. References: https://github.com/rusefi/rusefi/blob/master/firmware/integration/rusefi_config.txt and https://www.msextra.com/doc/pdf/MS3XV357_Hardware-1.4.pdf .
