# Brick ECU — engine source addendum (November 8, 2026)

This is an additional source-backed research pass on the [237-engine catalog](research-status.html). It supplements, but does not rewrite, the [November 4 historical research snapshot](ENGINE_TRIGGER_SENSOR_AUDIT_20261104.md).

**Research coverage after this pass: 33/237 with all seven technical fields addressed; 204/237 still incomplete.** These numbers are independently reproduced by the automated Node engine research audit in `scripts/research-audit.mjs` and the live [research status page](research-status.html). Research completion is *not* an ECU installation, calibration, wiring-harness or roadworthiness validation.

| Engine | Newly documented field | Evidence |
| --- | --- | --- |
| Toyota **1UZ-FE VVT-i** | OEM cam pickup is inductive/reluctor, with three features on the VVT-i cam target; not a generic Hall sensor. | [Haltech UZ technical guide](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine) |
| Ford **Zetec-E 2.0 later VCT** | Later five-feature cam target uses a passive two-wire reluctor cam pickup; separate from later Mazda-derived Duratec engine families. | [Haltech Zetec-E guide](https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl) |
| Honda **D16Z6** | 1994 Del Sol SOHC VTEC factory distributor houses CKP, TDC and CYP magnetic pick-up coils; CYP is a passive inductive phase pickup. | [1994 Honda Del Sol factory service description](https://workshop-manuals.com/honda/del_sol/l4-1.6l_sohc_%28vtec%29/sensors_and_switches/sensors_and_switches_powertrain_management/sensors_and_switches_computers_and_control_systems/camshaft_position_sensor/component_information/diagrams/page_366/) |
| Mazda **BP 1.8 NB1** | The NB1 original nonuniform crank pattern has a named `MAZDA_MIATA_NB1` special decoder in rusEFI; it is not equivalent to generic four equally spaced teeth. | [Official rusEFI supported triggers](https://wiki.rusefi.com/All-Supported-Triggers/) |
| Ford **Barra 4.0 NA / Turbo** | Separate intake and exhaust 3+1 cam targets with passive reluctor pickups are described for BA–FG engines. | [Haltech Barra guide](https://support.haltech.com/portal/en/kb/articles/4-0l-barra-engine) |
| Toyota **1JZ-GTE / 2JZ-GTE non-VVT-i** | Each non-VVT-i turbo cam trigger uses a single tooth, with two independent VR cam pickups present. | [Haltech JZ technical guide](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine) |
| Toyota **2AZ-FE 2.4** | The intake cam has a three-tooth phase target with a passive reluctor sensor. | [Haltech 2AZ-FE guide](https://support.haltech.com/portal/en/kb/articles/2az-fe-engine) |
| Ford **2.0 Zetec SVT / ST170** | The later exhaust-cam phase target uses five features and a passive reluctor pickup. | [Haltech Zetec-E guide](https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl) |

## Remaining investigation

No unsupported data was filled merely to make a record pass the checklist. Remaining work across the catalog includes model-year-specific primary crank geometry, exact cam targets, OEM sensor technology, original ignition-driver topology and firmware correlation. For all 237 engines, preserve family-versus-engine scope, wiring risks, and limitations on factory GDI, unusual optical sensors and additional VR interfaces.

The live catalog loads `engine-source-addendum-20261108.js` **after** the earlier studies and **before** the seven-check research calculation, so these findings affect both the Engine Finder and live progress statistics. Use the current searchable research status rather than the historical November 4 counts.
