# Brick ECU ten-stage field guide — BrickOS alignment

This document tracks the website's **original Brick ECU** learning path against the separate BrickOS Full Tour. It is a repository-maintenance crosswalk, not a calibration procedure.

## Source of truth

- BrickOS tour metadata: [firmware/BrickOS/web/guide-catalog.json](https://github.com/sethfrnz33-droid/BrickOS/blob/main/firmware/BrickOS/web/guide-catalog.json) (`tour_steps`, ten nodes).
- BrickOS implementation notes: [docs/27-hpa-master-tour.md](https://github.com/sethfrnz33-droid/BrickOS/blob/main/docs/27-hpa-master-tour.md).
- BrickBase publication: [docs/engine-setup.html](engine-setup.html), ten-stage navigation, with the full pre-existing wiring library retained separately.

The website uses the catalogue's **node identifiers and chapter order** only. All stage headings, explanations, readiness checkpoints and supporting references are written independently for the 121-pin Big Brick. The website does not reproduce course scripts, proprietary lesson text, images, tuning tables or lesson prompts. Industry-standard checks may follow a common logical progression without copying teaching materials.

| # | BrickOS node | Original website stage name | Website section |
|---|---|---|---|
| 1 | `tour.configuration` | Know the ECU | `#brick-stage-1` |
| 2 | `tour.trigger` | Trust the position signal | `#brick-stage-2` |
| 3 | `tour.base_tables` | Map the starting point | `#brick-stage-3` |
| 4 | `tour.reference` | Verify real-world references | `#brick-stage-4` |
| 5 | `tour.starting` | Review first-start readiness | `#brick-stage-5` |
| 6 | `tour.idle` | Understand idle behavior | `#brick-stage-6` |
| 7 | `tour.steady_fuel` | Understand the fuel picture | `#brick-stage-7` |
| 8 | `tour.steady_spark` | Understand the ignition picture | `#brick-stage-8` |
| 9 | `tour.full_power` | Collect complete evidence | `#brick-stage-9` |
| 10 | `tour.confirm` | Record the result | `#brick-stage-10` |

## Why the wiring library is separate

The website also teaches practical physical I/O identification, connector orientations, main relay, KEY/VIN, sensor supplies, DBW, injector and ignition wiring. These are **installation references**, not a separate tuning curriculum and not a claim that passing a checklist validates engine safety.

The browser interface and ESP guide are distinct. The website never opens a live ECU connection, writes calibrations, performs output tests, or automatically advances software state. Stage completion and tuning safety are not inferred.

## Keeping both guides synchronized

If BrickOS changes the ten `tour_steps` IDs or their order, update this crosswalk, the website's `data-brickos-node` attributes, navigation labels and the `scripts/ten-stage-audit.mjs` test together. Do **not** import prose or third-party educational content from the source. Keep the terminal-name legend, diagram-specific wiring walkthroughs and independent technical caveats intact.

`node scripts/ten-stage-audit.mjs` checks the stage sequence and cross-links locally; only a separate review of the BrickOS catalogue confirms the external source has not changed.
