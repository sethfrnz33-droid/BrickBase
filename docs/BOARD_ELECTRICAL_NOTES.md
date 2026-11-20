# Big Brick electrical design notes — 121-pin board

**Source:** Brick ECU designer-supplied board data, November 20, 2026. The installed component identities were checked against published manufacturer or distributor listings, but PCB schematics, protective circuit operation, temperature-rise results and installed-harness ratings were **not** independently verified.

## Analog and digital input networks

| ECU group | Reported board circuit | Intended input | What not to infer |
|---|---|---|---|
| AT1–AT4 | **4.7 kΩ to 5 V**, **100 nF to ground** at each input | Resistance-based temperature/thermistor sensing | The bias does not make the input suitable for direct battery-driven switching |
| D1–D6 | **2.2 kΩ to 5 V**, **1 nF to ground** at each input | Ground-pulling Hall, pulse/frequency, or switch contacts | Do not actively drive the line with 12 V; voltage/current limits must be established by hardware validation |
| AV1–AV11 | Eleven analog measurement inputs; overvoltage protection claimed by designer | Calibrated analog voltage sensors, as supported by firmware | **Conflict remains:** designer said **19 V continuous withstand** and later **17 V** in the same message; neither figure proves intended continuous operating voltage or validates direct vehicle-battery connections |
| VR1/VR2 | Analog Devices/Maxim **MAX9924UAUB** differential VR interfaces | Compatible variable-reluctance sensor pairs | VR negative is not SGND, and IC presence alone does not validate any engine's trigger decoder |

**Do not merge withstand voltage, normal sensor operating range and recommended wiring into a single figure.** The designer also cautioned that battery voltage should not be connected to a 5 V-biased sensor input because it can inject noise into the 5 V network. Confirm the 17/19 V statement against the actual circuit and separately document both limits. Do not publish a final AV absolute-maximum rating until reconciled.

## Named components

| Function | Exact component reported | Published source / verification notes |
|---|---|---|
| Main MCU | **STMicroelectronics STM32F767ZGT6** | [ST product page](https://www.st.com/en/microcontrollers-microprocessors/stm32f767zg.html) |
| Eight ignition power stages | **onsemi ISL9V3040D3ST-F085C** | [onsemi family datasheet](https://www.onsemi.com/download/data-sheet/pdf/isl9v3040-f085c-d.pdf). This is an ignition IGBT; component-level ratings do not automatically apply to the PCB output or every coil |
| Two H-bridge power stages | **Infineon IFX9201SG** | [Infineon device page](https://www.infineon.com/part/IFX9201SG); listed as a 6 A device, which is not a verified 6 A Big Brick connector rating |
| Differential VR conditioning | **MAX9924UAUB** | [Analog Devices product family](https://www.analog.com/en/products/max9924.html). Exact purchase suffix and installed board count must come from the actual BOM |
| SD NAND storage | **MK MKDV2GCL-ABF** | [JLCPCB product listing](https://jlcpcb.com/partdetail/MK-MKDV2GCLABF/C51966231): **2 Gbit** nominal, i.e. **256 MB** raw capacity (not necessarily fully usable file capacity) |
| Two sensor 5 V trackers | **Infineon TLS115B0EJ**, two installed | [Infineon product page](https://www.infineon.com/part/TLS115B0EJ). Manufacturer states **150 mA** per IC, subject to board thermal/design conditions; do **not** advertise 200 mA per tracker as a verified continuous rating |
| Internal USB assembly header | **JST B6B-PH-SM4-TB(LF)(SN)** | [LCSC listing, C471518](https://www.lcsc.com/product-detail/C471518.html): vertical six-position, 2 mm PH-series wire-to-board header. This is **not** a USB-C receptacle; board uses it as the described USB connection assembly interface |

## Open verification before publishing final electrical limits

- Resolve **17 V versus 19 V** and whether both statements were meant for AV or if the 17 V statement concerned another input type. Preserve both reports until the schematic and test basis establish the distinction.
- Check the AT and D input protection and rail-backfeeding behavior; RC filter values are user-provided and not equivalent to protection certification.
- Determine the **per-rail, connector and thermal** continuous load permitted for the two TLS115B0EJ 5 V sensor supplies. The IC is specified for 150 mA, not the older 200 mA sensor-output claim.
- Verify the exact ignition-to-IGBT pairing, final board/connector pinout, and allowable coil-driver operating conditions.
- Verify each H-bridge's actual connector current and thermal constraints separately from the IFX9201SG manufacturer's component capability.
- Verify the USB cable/board assembly pin mapping; a six-pin JST header must not be described as the USB-C jack itself.
- Verify production hardware revision and qualified engineering review before giving installation-specific electrical maxima.

These notes support [the public hardware page](big-brick.html), [121-pin map](big-brick-pinout.html), and [installation guide](engine-setup.html). All physical ratings above are either designer-reported or component manufacturer properties as explicitly labeled, not independent Brick ECU system certification.
