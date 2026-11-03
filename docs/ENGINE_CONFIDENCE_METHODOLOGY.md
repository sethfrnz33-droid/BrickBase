# Brick ECU engine confidence methodology (v2)

**Updated:** 2026-11-03  
**Live implementation:** `docs/engine-confidence-v2.js`  
**Scope:** 237 research entries across Big Brick and Mini Brick. Scores are screening heuristics for *factory installed* ignition/trigger/fuel hardware, **not measured probabilities, certified compatibility, wiring instructions, or finished base tunes**.

All seven layers are **independent** and always visible in the [engine finder](compatibility.html), with expandable evidence, source links, differences between Big/Mini, and the next required verification.

## Layer weights

| Layer | Weight | What actually changes the rating |
| --- | ---: | --- |
| Crank trigger / decoder | 25 | rusEFI named decoder versus only physical tooth resemblance; exact sensor/wheel generation; timing offset and edge; true 720-degree sync. Optical CAS and broken trigger profiles block the factory trigger path. |
| Injector count vs outputs | 15 | **Actual injector count is not assumed proven.** The baseline conditional model is one port injector per cylinder. Compare to Big's eight-cylinder sequential / twelve-cylinder batch ceiling and shared low-side resources; Mini has four dedicated injector outputs plus three separately available high-current low-side channels subject to driver, configuration and current validation. |
| Coil count vs ignition I/O | 14 | Verified factory distributor (one signal), twin distributors (two), wasted spark (cylinders/2), or COP (one/cylinder); otherwise show **unknown topology** and only describe worst-case conditional demand. Big has 12 smart logic-level signal channels; Mini has four ignition signals. |
| Coil/igniter electrical architecture | 14 | **Smart coils highest.** External multi-channel igniters are good conditional candidates. Passive/dumb coils are strong Big Brick candidates at six power stages or fewer, but extremely low on Mini until an external power stage is documented. Big's **six IGBT-capable channels are not additional to its sixteen low-side outputs**; they share physical outputs. Do not assume a three-pin coil is smart. |
| Cam sync + VVT wheel | 14 | Home/phase pattern match, continuous versus switched VVT, number of phase sensors and actuators, firmware cam decoder, and the two native VR input limit. Three VR pickups (VR crank + two VR cams) need validated conditioning for a third channel. |
| Factory air-load sensor | 8 | Factory manifold MAP and known calibration favor rusEFI speed-density; MAF-only engines remain possible via MAF fueling or a **separately fitted, calibrated external manifold MAP**. A boost-control pressure sensor is not always a full-range manifold MAP sensor. Mark uncertain factory MAP/MAF as **unknown**, not MAF. |
| Injection architecture | 10 | Normal port injection is viable by output type subject to injector driver assessment. Factory high-pressure GDI, including combined PFI+DI, gets **0** for native stock fueling: Big external GDI controller is experimental/unvalidated and Mini has no GDI software. Rotary fuel/ignition scheduling likewise remains unvalidated. |

**Method:** Each layer is 0–100 with evidence and explicit outstanding tasks, then the weighted average is calculated using the percentages above. Untested whole-engine candidates are capped at **79/100**. A true native blocker (stock GDI, unsupported Nissan optical CAS, broken factory trigger or rotary fuel/ignition scheduling) sets **the overall score to 0** while preserving all seven subsystem layer scores. Mini eight-cylinder-plus engines are out of scope. A low score does not prove impossibility after modifying the factory hardware.

**Scope separation:** Trigger-wheel identification is not cam decoder verification; 720-degree phase is not ignition timing accuracy; GPIO output count is not electrical power-stage compliance; and having a single stock MAP does not prove adequate boost/vacuum range. Source quality (engine code and year, manufacturer/manual, family guide, firmware decoder list, unverified lead) is shown separately from the numerical rating.

## Coil hierarchy and physical I/O

1. **Smart coil with internal igniter:** highest electrical suitability if the actual installed coil accepts Brick's 5 V logic levels, dwell and edge. The voltage level is still to be confirmed for the exact part.
2. **Single coil + OEM/external igniter + distributor:** one timing command typically fits. Adjustable distributors can complicate initial locked base timing, phase/rotor alignment and waveform validation; verify with a timing light and donor service references. A twin distributor requires two corresponding signals.
3. **External multi-channel igniter for passive COP/wasted spark:** can work when ECU output level, edge and module supply/power stage are independently characterized.
4. **Dumb COP coils directly on Big Brick:** at most **six** separately driven IGBT-capable channels, physically part of the 16 low-side outputs. Coil peak current, thermal protection and scheduling must be established.
5. **Dumb coils directly on Mini Brick:** not assumed supported; its four ignition outputs are *not* claimed to be four high-current IGBT power stages. An appropriate verified external power stage is required.

Coil connector pin count is not reliable proof of built-in ignition drivers; confirm the actual manufacturer coil/module and wiring. [Haltech igniter identification](https://support.haltech.com/portal/en/kb/articles/internal-igniter-or-not) · [Ignition strategies (COP/wasted/distributor)](https://support.haltech.com/portal/en/kb/articles/ignition-system).

## Mini six-cylinder nuance

Mini has four ordinary ignition signals, not six: **six individual OEM COP signals exceed Mini's native signal count**. Wasted spark with three commands is a *possible conversion*, not proof that the stock six-COP engine can use its factory coil wiring. It has four dedicated injector outputs plus three high-current low-side channels that may serve injectors, but six sequential injector channels must be confirmed in the *actual firmware and output mapping*; otherwise a separately assessed batch strategy is needed.

## MAP / MAF

rusEFI recommends speed-density for its development maturity and turbo use, and also offers MAF and Alpha-N options. The website therefore **favors a real manifold MAP** without treating MAF-only engines as unsupported. Brick's analog input provision **does not imply an internal MAP transducer**. For an external MAP, verify part number, scale, ground, intake pressure tap, IAT and voltage compatibility. ITB engines may require Alpha-N or hybrid loading if manifold vacuum is unsuitable. Reference: [rusEFI speed density](https://wiki.rusefi.com/Speed-Density/).

A real source conflict or model variance is recorded, not averaged away:

- Toyota 4A-GE: some 16V versions have MAF and others MAP; 20V Silvertop uses vane MAF while Blacktop uses MAP. [4AG guide](https://support.haltech.com/portal/en/kb/articles/4ag-engine).
- Toyota 3S-GTE: Gen 1–2 MAF, Gen 3+ MAP; early versions are external-igniter distributors, later direct-fire smart coils. [3SG guide](https://support.haltech.com/portal/en/kb/articles/3sg-engine).
- BMW M50: factory MAF and passive COP without built-in power stages. [BMW M50 guide](https://support.haltech.com/portal/en/kb/articles/m50-engine).
- VW/Audi 1.8T: stock factory MAF and no confirmed full-range manifold MAP in cited engine-family guide; ignition module differs with engine code. [VW 1.8T guide](https://support.haltech.com/portal/en/kb/articles/1-8-turbo-20v).
- GM LS1: factory manifold MAP and MAF; COP with igniters built into the coil. [GM LS1 guide](https://support.haltech.com/portal/en/kb/articles/ls1-engine).
- Toyota JZ: non-VVT-i GTE direct fire via external igniter, VVT-i GTE wasted spark with three signals; distributor 2JZ-GE is a separate variant. [JZ guide](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine).
- Toyota 1UZ original: twin distributors/twin igniters; UZ VVT-i variants have two cam pickups; no factory manifold MAP and early MAF may use frequency output. [1UZ guide](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine).
- Ford Barra: factory dumb coils, MAP, dual continuously variable cams, and more native VR pickups than Brick has conditioning channels. [Barra guide](https://support.haltech.com/portal/en/kb/articles/4-0l-barra-engine).
- Subaru EJ207: factory smart coils; the OEM MAP on cited EJ20 vehicles can be intended for boost control rather than full vacuum. [EJ20 guide](https://support.haltech.com/portal/en/kb/articles/ej20-engine).
- Nissan VQ35DE: factory smart COP and MAF but no factory manifold MAP. [VQ35DE guide](https://support.haltech.com/portal/en/kb/articles/vq35de-engine).
- Honda K20/K24: factory smart COP, 12+1 crank generation and cam/VTC differences; **unverified community reports of timing wander** reduce trigger confidence until a real logged timing verification. [Honda K guide](https://support.haltech.com/portal/en/kb/articles/thomas-te) · [rusEFI trigger catalogue](https://wiki.rusefi.com/All-Supported-Triggers/).
- Honda F20C/F22C1: factory smart COP and MAP; VTEC is lift control, **not** evidence of variable cam phase. Haltech discusses conflicting trigger offsets, so this is not a verified Brick preset. [Honda S2000 guide](https://support.haltech.com/portal/en/kb/articles/f20c-ap1-engine).

## Evidence statuses and what remains unknown

The new v2 subsystem profiles are **not OEM certified**; exact source-specific rules exist for a subset of engines. Others intentionally display `unknown` for unverified factory coil type, coil layout, MAP/MAF, VVT or source signal. The derived generic requirements (one port injector per cylinder, COP demand if applicable) are explicitly conditional estimates.

Important original source data and warnings remain in `engine-finder-data.js`, `engine-finder-expansion.js`, and [the unfinished research audit](ENGINE_RESEARCH_AUDIT.md). These are **not** finished installation guides. Until engine-year pin views, waveform logs, sensor electrical data, and a Brick-running test are independently verified, **no entry is marked finished**.

## Work required before actual compatibility approval

For every exact engine code and donor year: inspect OEM connector face and pin assignments; document crank/cam physical wheels and VR/Hall signal type; verify sensor power and bias, scope polarity and cam angle, and specify tested firmware/TunerStudio crank & cam selections. Determine injector count, impedance/current, flow and voltage deadtime; coil internal igniter, edge and dwell; wiring harness and output sharing; actual sensor pressure/temperature transfer; VVT solenoid and DBW control needs. Capture cranking and running synchronization, verify locked base timing and rotor phase where appropriate, and record limits with real engine testing.

**No per-engine score certifies street or dyno operation, and competitor ECU terminal numbers are not Brick ECU pin numbers.**
