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
| `/docs/compatibility.html` | Cascading text-only engine finder with 237 named/pattern/research entries across 22 manufacturers |
| `/docs/visual-library.html` | Original full-size Big Brick connector A/B/C posters only |
| `/docs/planning.html` | Documentation and verification planning |
| `/docs/software.html` | Wi-Fi, TunerStudio, logging and firmware features |
| `/docs/downloads.html` | Official TunerStudio MS downloads/registration and upstream Big Brick Proteus F7 / Mini Brick MRE F4 firmware ZIPs |

### Documentation navigation

The `/docs/index.html` landing page is organized by user task (engine lookup, 94-pin connector lookup, Big/Mini specifications, tuning, installation planning and original connector posters), with a seven-guide keyword search and `/` keyboard focus shortcut. Documentation detail pages use `/docs/docs.css` for a lighter content hierarchy and grouped sticky/sidebar navigation; `/docs/docs-ui.js` generates on-page section jump links. On narrow screens the navigation is horizontally scrollable. The large connector posters remain unchanged, but appear *after* the searchable pin table on the pinout page.

### Shared files

- `site.css` — original retro blue / beveled encyclopedia-style design with responsive pages.
- `site.js` — navigation and reveal animations.
- `pinout.js` — developer-provided Big Brick pin data; filters and copy function.
- `docs/assets/full-pinout-connector-{a,b,c}.svg` — illustrated full-page connector/pin tables sourced from `pinout.js`.
- `docs/engine-finder-data.js` — text-only research catalog (237 make/family/engine entries; current rusEFI named decoders and pattern candidates kept distinct).
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

## All-engine research expansion (November 2, 2026)

Research fields now appear for every one of 170 catalog entries, with crank geometry, cam synchronization, electrical sensor requirements, actual rusEFI decoder correlation, unresolved validation and technical source links.

Research added for: GM LS2 24X/1X, Gen V LT 58X/4X and GDI limits, GM 7X and Optispark; BMW M54/S54 double VANOS, N54 Hall 60-2 vs N55 magnetic multipole; Ford TFI, Modular 3V, Coyote Ti-VCT and Duratec; Honda OBD1 distributor 24+1 and earlier 16-tooth, K24 and J30A2; Nissan QR25/MR18 36-2-2, HR irregular crank, VK56DE 36-1-1 plus phase, VQ30 cam-only; Mazda Miata 4+2 CAS, NC MZR multi-gap, RX8 and Skyactiv limits; Mitsubishi special 36_2_1 and 6G72; Subaru uneven six-crank/seven-cam, EZ30, SVX multiple pickups; Dodge Neon, Chrysler NGC decoder warnings, Jeep Renix, Hemi, Viper; and Suzuki, Daihatsu, Rover, Renault, Skoda, Fiat, Mercedes, Kawasaki, Benelli and Arctic Cat.

**Scope:** A special multi-gap, distributor, optical or magnetic wheel must not be represented by an arbitrary generic number of missing teeth. All documented custom counts are crank-only candidates unless cam/phase also matches. Native factory GDI remains unsupported/untested on Brick hardware: Big Brick external driver integration is experimental and Mini Brick has no GDI software.

## Engine finder confidence methodology — historical v1, superseded by v2

The original 170-entry original `docs/engine-finder-data.js` catalog, expanded by 67 research records in `docs/engine-finder-expansion.js`, contains separate per-entry `confidence.big` and `confidence.mini` **non-statistical engineering screening percentages** plus `confidence.basis[]` explanations. These are not verified success probabilities, test results, installation recommendations or guaranteed engine compatibility. No engine in this list is asserted to have run on a Brick ECU.

**Rubric v1** (applied to native factory trigger and original factory fuel system):
- Trigger evidence: named rusEFI decoder +42; source-identified generic wheel candidate +30; unknown exact crank/cam configuration +14; broken or stock-unsupported = 0.
- Phase evidence: known cam/VVT mode adds up to 12; less certain information adds 3–7.
- Hardware: Big Brick up to 8 cylinders +26; 9–12 cylinders +16 and penalty for mandatory batch fuel. Mini Brick 1–4 cylinders +24; 5–6 cylinders +11 with added wasted-spark/injector-allocation penalty; >6 cylinders = 0.
- Additional caps/penalties for non-native actuator control such as BMW Valvetronic, passive ignition-coil drivers, quad-cam VVT, S54 complexities, decoder issues and unverified Honda K timing wander.
- Original factory GDI, unsupported Nissan factory 360-slot optical CAS, broken decoders, and unverified rotary fuel/ignition scheduling = 0% in the *native-stock-system assessment*. Aftermarket trigger replacements, port-injection conversions, or external GDI controller experiments are not evaluated by this score.
- Maximum permitted untested score is 80%; confirmation would require correct OEM variant, sensor waveforms/voltage, firmware mode, sync logs, fixed-timing verification, safe coil/injector drivers, and an actual installation validation record.

**Trigger-wheel research notes:** the Ford Coyote Gen I pattern is documented as 36-1 by Haltech, while Gen III is described as 60-2 in third-party tuning documentation (the Gen IV wheel remains unverified); the rusEFI wiki explicitly does not support Nissan's factory high-resolution optical CAS; 4B11 and 4G69 are listed examples of 36-2-1. Exact engine variants and all wiring are still unvalidated. Selected individual entries include technical-source links.

Source references: [latest rusEFI trigger menu](https://github.com/rusefi/rusefi/blob/master/firmware/integration/rusefi_config.txt), [supported trigger wiki](https://wiki.rusefi.com/All-Supported-Triggers/), [rusEFI wiring and injection limits](https://wiki.rusefi.com/FAQ-Basic-Wiring-and-Connections/), [Ford Coyote trigger reference](https://support.haltech.com/portal/en/kb/articles/coyote-engine).


## Engine-by-engine trigger-wheel research and evidence levels

- The engine finder stores research fields per engine variant (OEM evidence and decoder evidence vary): `crankWheel`, `camWheel`, `electrical`, `decoderCorrelation`, `remaining`, `notes`, `status`, `checked` and `sources`.
- Where proven physical wheels match rusEFI's general missing-tooth shape, `research.genericWheel` records the TunerStudio generic-wheel option plus nominal tooth count and missing tooth count. A numerical match does **not** prove that cam phase or synchronization works.
- **Original research audit completed for 170/170 records; 46 regular missing-tooth crank candidates.** Evidence: 55 trigger wheel sourced, 55 family-wheel sourced, 3 OEM wheel sourced (rusEFI pair unresolved), 19 partial, 20 hardware constraints, 2 unresolved cam/crank generic pairings, and **16 decoder-only entries** lacking independently verified OEM wheel details for a particular year/variant. No record is a tested Brick ECU installation. Never infer generic wheel counts from unsupported shapes.
- Variants split after audit: early/VVT-i 1UZ and 2UZ, crank-sensor versus distributor 2JZ-GE, and Mitsubishi 4G63 Evo 4–8 versus Evo 9; those have substantially different engine-position patterns.
- Source-checked examples: [Toyota UZ](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine), [Honda F20C](https://support.haltech.com/portal/en/kb/articles/f20c-ap1-engine), [Ford Barra](https://support.haltech.com/portal/en/kb/articles/4-0l-barra-engine), [Mazda LF-VE NC](https://support.haltech.com/portal/en/kb/articles/mazda-lf-mzr-engine), [Mitsubishi 4G63](https://support.haltech.com/portal/en/kb/articles/4g63-trigger), [rusEFI current firmware](https://github.com/rusefi/rusefi/blob/master/firmware/integration/rusefi_config.txt).
- Crucial limitation: Big/Mini each expose two native VR channels. A VR crank plus both VR cams (Barra and some Toyota UZ VVT-i arrangements) requires third-channel signal conditioning; the candidate scores reflect that need.
- **Open issue:** Haltech documents 12 V power to typical Gen IV LS 58X sensors, while MS3 guides document 5 V power to gray 58X sensors. We do not resolve this by assumption; always verify the actual sensor part number and intended supply.

## Software downloads and licensing
- Downloads page: `/docs/downloads.html`. The current installer for TunerStudio MS Lite (free) and registered TunerStudio MS (licensed) comes from EFI Analytics: https://www.tunerstudio.com/index.php/downloads .
- Registration: https://www.efianalytics.com/register/register.jsp?appName=TunerStudioMS . A one-time optional paid TunerStudio MS license activates VE Analyze Live (AutoTune), high-speed logging (over the approximately 15 Hz Lite limit, hardware permitting), tabbed customized gauge dashboards, and advanced analysis. This license is purchased from EFI Analytics, not Brick ECU; **MS Ultra** is a separate optional tier. Prices/activation terms are set by the vendor.
- Big Brick upstream board target: Proteus F7, `https://rusefi.com/build_server/rusefi_bundle_proteus_f7.zip`.
- Mini Brick upstream board target: microRusEFI F4, STM32F407, `https://rusefi.com/build_server/rusefi_bundle_mre_f4.zip`.
- Both ZIPs are **generic rusEFI builds**, not Brick ECU-validated firmware releases. Generic packages may change board mappings, wireless support, or tune compatibility; back up settings and verify exact hardware/firmware targets before any use. Big/Mini are not interchangeable.
- Fast TunerStudio laptop logging is a licensed application capability and is conditional on the ECU and physical/network connection. Big Brick's onboard 256 MB logging is a distinct function.
- Source of current firmware links: https://rusefi.com/build_server/ ; registered MS feature list: https://www.tunerstudio.com/index.php/products/tuner-studio/tunerstudioms .

## Navigation and discoverability

The homepage now exposes Engine Finder, Big Brick pinouts, Downloads and Documentation as four visible navigation shortcuts; main navigation links Engine Finder and Downloads separately. Documentation indexes all eight resources under `Tools`, `Downloads`, `Hardware` and `Guides`. Downloads is its own category, not a guide. Mini and Big Brick product pages also link directly to relevant product resources. Keyword search remains optional, not required to discover sections.

### Honda distributor, BMW M54 and early EJ Subaru wheel cross-check (2026-11-02)

- Honda D/B/H OEM distributor variants: 24 CKP teeth on a CAM-speed distributor produce 12 events per crank revolution. rusEFI's Honda OBD1 profile explicitly uses `TT_12_TOOTH_CRANK` with `VVT_SINGLE_TOOTH` for CYP; this is not equivalent to arbitrary generic 12/0 tooth settings. Early 16-tooth distributors and some late H22A oil-pump mounted CKF variations require separate identification. Sources: https://github.com/rusefi/rusefi/blob/master/firmware/config/engines/honda_obd1.cpp ; https://rusefi.com/forum/viewtopic.php?t=2013 ; https://support.haltech.com/portal/en/kb/articles/b-series .
- BMW M54: official M54 MS43 training documents Hall-effect crank and two Hall-effect cam sensors; 60-2 crank reference is supported by aftermarket M54 engine data. Cam impulse-wheel phase shapes and full double VANOS remain untested with Brick. Sources: https://bmwtuning.co/wp-content/uploads/2023/08/BMW-M54-Training-Doc.pdf ; https://www.vems.hu/wiki/index.php?page=MembersPage%2FJosephBmw .
- Subaru early 6/7: **six crank teeth and seven cam teeth**, both VR for specifically documented EJ20G/EJ20K. Use the named `SUBARU_7_6` decoder, NOT a generic even 6/0. EJ22/EJ25 entries remain variant-dependent until OEM year/sensor evidence is available. Sources: https://support.haltech.com/portal/en/kb/articles/ej20-engine ; https://wiki.rusefi.com/All-Supported-Triggers/ .


## 2026-11-02 engine-library research extension

- **67 new engine research candidates** added in `docs/engine-finder-expansion.js` across VW/Audi VR6/2.7T/EA113/EA888, Toyota 4AG/3S/GR/AR, Volvo Redblock/Whiteblock, BMW M20/M42/M44/S50/S52/M60/M62, GM 3800/Ecotec, Honda J/L/R, Mercedes M-series, Ford Zetec/Lima/ST, Nissan KA/CA/RB, Mazda rotary and Subaru EJ207/FA/FA24. **237 total records**.
- The expansion is loaded after the original 170 and before `engine-finder.js`; it adds practical integration questions and explicit external-source annotations to *all* entries. Sensor, coil, injector, actuator, vehicle harness and validation sections appear per engine.
- Reference URLs, even when well-identified, have **not all been independently checked for accessibility or applicability**; verify each exact model/year from OEM service literature before publishing electrical specs. Family-level evidence and competitor ECU pinouts are not engine harness verification.
- All per-engine entries remain research candidates, **not verified engine compatibility**, with no Brick ECU install test or verified engine-side pin map. Default unknowns intentionally remain unassigned. New source conflicts are tracked separately and shown in the finder.
- Special engineering cautions: 4A-G and 3S generation-specific trigger variations; VR6 and EA888 engine-code variations; factory GDI outside validated software; Nissan factory optical CAS not natively validated; rotary synchronization and trailing ignition not Brick-validated; third VR sensor conditioning for certain VVT engines.
- **Research not finished:** all 237 still require exact donor VIN/engine code, matching OEM wiring schematic, connector terminal views, waveforms, sensor transfer functions, injection specifications, timing-light verification and physical Brick ECU validation to claim confirmed support. The legacy 16 decoder-only entries remain unresolved.


## November 2026 catalog expansion and status

- An additional **67 researched candidate variants** across 11 existing/new manufacturer groups have been added, bringing the searchable catalog from **170 to 237 records** and **23 manufacturers** (Volvo is new).
- `docs/engine-finder-expansion.js` applies a supplemental source/electrical audit to every original and new record; the engine finder now displays sensor requirements, ignition-stage cautions, injector considerations, auxiliary controls, vehicle-harness validation gaps, conflicting references and source links.
- New families include VW/Audi VR6, R32, 2.7T, EA113/EA888; Toyota 4A-G, 3S, GR, AR, AZ, NZ; Volvo redblock/whiteblock; BMW M20/M42/M44, S50/S52, M60/M62; GM 3800/Ecotec; Honda J/L/R; Mercedes M104/M111/M112/M113; Ford Zetec/Lima/ST; Nissan KA/CA/RB; Mazda RX-7; Subaru EJ207/FA20/FA24.
- **Evidence limit:** 237 catalog entries are *research records*, not 237 verified Brick ECU configurations. Source lists include independent third-party references and firmware documentation; a URL does not establish a specific engine/year pinout, and linked material may apply only to adjacent versions. Detailed wiring and sensors remain unresolved where source specificity is insufficient. The original 16 decoder-only entries remain unresolved.
- **Do not publish unverified pin numbers, supply voltages, trigger edges, ignition dwell or ECU mappings as confirmed facts.** Existing known conflicts remain explicitly visible. Factory GDI and rotary management are unvalidated.


## Engine research completion inventory

- [Full 237-engine finished/unfinished research ledger](docs/ENGINE_RESEARCH_AUDIT.md) — all records grouped by evidence status, with remaining verification, technical reference links and uncited-engine gaps.
- [Searchable on-site research status](docs/research-status.html) — filter by manufacturer, evidence stage, engine code and completion. All current entries are research-only; none is validated as fully finished.

## Engine confidence v2: seven independent evidence layers (November 3, 2026)

The live engine finder uses `docs/engine-confidence-v2.js` to calculate **independent Big Brick and Mini Brick** scores in seven engineering categories: crank trigger (25%), injector channel count (15%), ignition signal count (14%), coil/igniter electrical type (14%), cam/VVT wheel and VR input capability (14%), factory MAP/MAF load strategy (8%), and port versus direct injection (10%). **See [the complete v2 scoring method](docs/ENGINE_CONFIDENCE_METHODOLOGY.md).**

Smart coils are preferred; a compatible external igniter or an ignited single-coil distributor may be workable, but check distributor base timing and rotor phasing. Big Brick's six native IGBT power stages **share** the 16 low-side channels. Mini Brick ignition output power-stage capability is not assumed, so dumb factory coils score extremely poorly without an independently verified external igniter. Native factory GDI is unvalidated, and third VR pickups exceed the two native VR conditioners without extra hardware.

The model distinguishes factory manifold MAP from MAF and from boost-only sensors. rusEFI speed-density is preferred when MAP is suitable, while MAF/Alpha-N may still work. **Unknown OEM equipment remains unknown.** No score is a success probability or a verified wiring/calibration endorsement; total confidence is capped at 79 before testing and set to zero for known native stock-system blockers. All 237 entries have the seven layers, but some layers still have unverified coil, airflow and VVT specifics, so this is **not a completed engine-by-engine approval audit**.
