# Brick ECU — engine field-by-field evidence ledger

**Generated from the current 237-record live catalog on 2026-11-03.** This is a **research queue**, not a compatibility endorsement, wiring plan or tested ECU installation. Source-backed data may refer to a specific donor year only. A nominal 0–79/100 engineering score is not a probability. None of the records has been fully validated on an operating Brick ECU.

## Verified research fields versus still open

| Evidence field | Reference-backed / identified | Still unknown or variant-dependent |
| --- | ---: | ---: |
| Original ignition coil/power-stage type | 109 | 128 |
| Factory load-sensor type (MAP/MAF) | 102 | 135 |
| Original port injector count (not driver compatibility) | 71 | 166 |
| Injector impedance class | 6 | 231 |
| Fully validated Brick installation | 0 | 237 |

The layered engine finder also has an **eight-check source-coverage score** separate from Big/Mini hardware compatibility. An entry is never considered finished without source-verified original connector/sensor information, stable synchronized firmware setup, electrical driver compliance and actual Brick operation. Source-backed is not the same as installed/tested. Direct engine-specific links are in the [engine finder](compatibility.html) under the individual layers.

### Abbreviations

- **Unknown**: no sufficiently specific source; no automatic assumption is permitted.
- **Varies**: multiple OEM revisions/markets combined into the current row and requiring a split.
- **inj-Z**: electrical impedance class, *not* an injector current rating; low impedance may require a validated resistor pack/current-limited driver.
- **Open gaps**: each item needs more exact evidence; **Brick running test** is outstanding for every entry.

## Arctic Cat

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Arctic Cat / **Arctic Cat matching decoder** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Benelli

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Tre / **Benelli Tre triple** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## BMW

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| M/S V8 and Motorsport / **M60B40** | 34 / 0 | dumb / cop | maf | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://charm.li/BMW/1994/740i%20%28E32%29%20V8-3982cc%204.0L%20DOHC%20%28M60%29/Repair%20and%20Diagnosis/Powertrain%20Management/Relays%20and%20Modules%20-%20Powertrain%20Management/Relays%20and%20Modules%20-%20Computers%20and%20Control%20Systems/Engine%20Control%20Module/Description%20and%20Operation/Control%20Unit%20%28DME%29/) |
| M/S V8 and Motorsport / **M62B44 non-TU** | 34 / 0 | dumb / cop | maf | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://forums.linkecu.com/topic/27850-bmw-m62b44/) |
| M/S V8 and Motorsport / **M62TUB44 VANOS** | 34 / 0 | dumb / cop | maf | 8 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://charm.li/BMW/2003/X5%204.6iS%20%28E53%29%20V8-4619cc%204.6L%20DOHC%20%28M62%29/Repair%20and%20Diagnosis/Description%20and%20Operation/Complete%20Vehicle/Output%20Control%20Functions/) |
| M/S V8 and Motorsport / **S50B30 European** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M/S V8 and Motorsport / **S50B30US** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M/S V8 and Motorsport / **S52B32US** | 51 / 44 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M20 / M42 / M44 / **M20B25 early Motronic two flywheel sensors** | 68 / 14 | dumb / distributor | maf | 6 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://charm.li/BMW/1987/325is%20%28E30%29%20L6-2494cc%202.5L%20SOHC%20%28M20%29/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Locations/Component%20Locator/) |
| M20 / M42 / M44 / **M20B25 late single 60-2 crank** | 76 / 14 | dumb / distributor | maf | 6 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://charm.li/BMW/1992/325i%20Convertible%20%28E30%29%20L6-2494cc%202.5L%20SOHC%20%28M20%29/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Description%20and%20Operation/) |
| M20 / M42 / M44 / **M42B18** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M20 / M42 / M44 / **M44B19** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M50 / **M50B20** | 75 / 14 | dumb / cop | maf | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/m50-engine) |
| M50 / **M50B25** | 75 / 14 | dumb / cop | maf | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/m50-engine) |
| M50 / **M50B25TU** | 74 / 14 | dumb / cop | maf | count unknown; Z unknown | switched | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/m50-engine) |
| M52 / M52TU / **M52B25** | 67 / 14 | dumb / cop | maf | 6 injectors; Z unknown | switched | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/m52-engine) |
| M52 / M52TU / **M52B28** | 67 / 14 | dumb / cop | maf | 6 injectors; Z unknown | switched | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/m52-engine) |
| M52 / M52TU / **M52TUB25** | 64 / 14 | dumb / cop | maf | 6 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/m52-engine) |
| M52 / M52TU / **M52TUB28** | 64 / 14 | dumb / cop | maf | 6 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/m52-engine) |
| M54 / **M54B22** | 71 / 14 | dumb / cop | maf | count unknown; Z unknown | dual | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://bmwtuning.co/wp-content/uploads/2023/08/BMW-M54-Training-Doc.pdf) |
| M54 / **M54B25** | 71 / 14 | dumb / cop | maf | count unknown; Z unknown | dual | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://bmwtuning.co/wp-content/uploads/2023/08/BMW-M54-Training-Doc.pdf) |
| M54 / **M54B30** | 71 / 14 | dumb / cop | maf | count unknown; Z unknown | dual | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://bmwtuning.co/wp-content/uploads/2023/08/BMW-M54-Training-Doc.pdf) |
| N52 / **N52B25** | 63 / 56 | unknown / unknown | unknown | count unknown; Z unknown | single | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://github.com/rusefi/rusefi/blob/master/firmware/config/engines/bmw.cpp) |
| N52 / **N52B30** | 63 / 56 | unknown / unknown | unknown | count unknown; Z unknown | single | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://github.com/rusefi/rusefi/blob/master/firmware/config/engines/bmw.cpp) |
| N54 / **N54B30** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| N55 / **N55B30** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| S54 / **S54B32** | 72 / 14 | dumb / cop | maf | 6 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://charm.li/BMW/2004/M3%20Coupe%20%28E46%29%20L6-3.2L%20%28S54%29/Repair%20and%20Diagnosis/Description%20and%20Operation/Complete%20Vehicle/M3%20Complete%20Vehicle/Engine%20Electronics/Ignition%20Management/Workshop%20Hints/) |

## Chevrolet / GM

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Buick 3800 V6 / **3800 Series II L36 NA** | 68 / 64 | external-multi / wasted | maf | 6 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/holden-buick-v6-ecotec) |
| Buick 3800 V6 / **3800 Series II L67 supercharged** | 68 / 64 | external-multi / wasted | maf | 6 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/holden-buick-v6-ecotec) |
| Buick 3800 V6 / **3800 Series III L32 supercharged** | 68 / 64 | external-multi / wasted | maf | 6 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/holden-buick-v6-ecotec) |
| Ecotec four-cylinder / **Ecotec L61 2.2** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Ecotec four-cylinder / **Ecotec LE5 2.4** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Ecotec four-cylinder / **Ecotec LNF 2.0 turbo** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Ecotec four-cylinder / **Ecotec LSJ 2.0 supercharged** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Gen V LT / **L83 5.3** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Gen V LT / **L86 6.2** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Gen V LT / **LT1 6.2 Gen V** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Gen V LT / **LT4 6.2 Gen V** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| GM 7X V6 / **2.8 V6 7X applications** | 59 / 53 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) |
| GM 7X V6 / **3.1 V6 7X applications** | 59 / 53 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) |
| GM 7X V6 / **3.4 V6 7X applications** | 59 / 53 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) |
| LS Gen III 24X / **LM7 5.3** | 79 / 0 | smart / cop | both | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ls1-engine) |
| LS Gen III 24X / **LQ4 6.0** | 79 / 0 | smart / cop | both | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ls1-engine) |
| LS Gen III 24X / **LQ9 6.0** | 79 / 0 | smart / cop | both | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ls1-engine) |
| LS Gen III 24X / **LS1 5.7** | 79 / 0 | smart / cop | both | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/ls1-engine) |
| LS Gen III 24X / **LS6 5.7** | 79 / 0 | smart / cop | both | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ls1-engine) |
| LS Gen IV 58X / **L92 6.2** | 79 / 0 | smart / cop | both | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine) |
| LS Gen IV 58X / **L96 6.0** | 79 / 0 | smart / cop | both | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine) |
| LS Gen IV 58X / **LS2 6.0 58X** | 79 / 0 | smart / cop | map | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine) |
| LS Gen IV 58X / **LS3 6.2** | 79 / 0 | smart / cop | both | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine) |
| LS Gen IV 58X / **LS7 7.0** | 79 / 0 | smart / cop | both | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine) |
| LS2 transitional / **Early LS2 6.0 24X** | 78 / 0 | smart / cop | both | count unknown; Z unknown | unknown | 4/8 | injector count, injector current, cam/VVT, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Coil](https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine) |
| Optispark Gen II / **LT1 5.7 Gen II** | 78 / 0 | external-single / distributor | mixed | 8 injectors; Z unknown | fixed | 5/8 | injector current, MAP/MAF, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://support.haltech.com/portal/en/kb/articles/lt1-350-optispark-engine) |
| Optispark Gen II / **LT4 5.7 Gen II** | 78 / 0 | external-single / distributor | mixed | 8 injectors; Z unknown | fixed | 5/8 | injector current, MAP/MAF, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://support.haltech.com/portal/en/kb/articles/lt1-350-optispark-engine) |

## Daewoo / GM

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| F8CV / **F8CV 0.8** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Daihatsu

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Daihatsu 3 cylinder / **Daihatsu 3-cylinder matching wheel** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Daihatsu 4 cylinder / **Daihatsu 4-cylinder matching wheel** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Dodge / Chrysler / Jeep

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Chrysler NGC / **NGC 36-2-2 applications** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Hemi 5.7 / **5.7 Hemi Eagle** | 51 / 0 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Hemi 5.7 / **5.7 Hemi early** | 34 / 0 | dumb / cop | map | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://charm.li/Dodge%20and%20Ram/2005/RAM%201500%20Truck%202WD%20V8-5.7L%20VIN%20D/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Description%20and%20Operation/) |
| Jeep 18-2-2-2 / **Jeep with 18-2-2-2 wheel** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Jeep EVD / **Jeep EVD 36-2-2 applications** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Jeep Renix / **Renix 4.0 44-2-2** | 79 / 78 | external-single / distributor | map | 6 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://www.carmanualsonline.info/jeep-cherokee-1988-service-repair-manual/85) |
| Jeep Renix / **Renix 4.0 66-2-2-2** | 79 / 78 | external-single / distributor | map | 6 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://www.carmanualsonline.info/jeep-cherokee-1988-service-repair-manual/85) |
| Jeep XJ / **XJ 2.5 four-cylinder** | 79 / 79 | external-single / distributor | map | count unknown; Z unknown | fixed | 5/8 | injector count, injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Coil](https://www.jcherokee.com/description_and_operation-1001.html) |
| Neon early / **Neon 2.0 1995-era** | 79 / 14 | dumb / wasted | map | 4 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://lemon-manuals.la/Plymouth/1995/Neon%20L4-2.0L%20DOHC/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Description%20and%20Operation/) |
| Neon later / **Neon 2.0 2003-era** | 79 / 14 | dumb / wasted | map | 4 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://charm.li/Dodge%20and%20Ram/2001/Neon%20R%2FT%20L4-2.0L%20VIN%20F%20HO/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Description%20and%20Operation/) |
| Neon later / **SRT-4 2.4 2003-era** | 79 / 14 | dumb / wasted | map | 4 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://www.manualslib.com/manual/1005204/Dodge-2004-Neon-Sx2.html) |
| Ram 1+16 / **Ram engines with 1+16 wheel** | 47 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Stratus / **Stratus V6 matching decoder** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Viper V10 / **Viper 8.0 V10** | 43 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Viper V10 / **Viper 8.3 V10** | 43 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Viper V10 / **Viper 8.4 V10** | 43 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Fiat

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| IAW P8 / **Fiat engines with IAW P8 trigger** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Ford

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Aspire / Mazda 121 / **1.3 Aspire / 121** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Barra 4.0 / **Barra 4.0 NA** | 60 / 14 | dumb / cop | map | count unknown; Z unknown | dual | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/4-0l-barra-engine) |
| Barra 4.0 / **Barra 4.0 Turbo** | 60 / 14 | dumb / cop | map | count unknown; Z unknown | dual | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/4-0l-barra-engine) |
| Cologne V6 TFI / **4.0 Cologne V6 TFI applications** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Coyote Gen I / II / **5.0 Gen I 2011–14** | 34 / 0 | dumb / cop | maf | 8 injectors; Z unknown | quad | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/coyote-engine) |
| Coyote Gen I / II / **5.0 Gen II 2015–17** | 48 / 0 | unknown / unknown | unknown | count unknown; Z unknown | quad | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Coyote Gen III / IV / **5.0 Gen III 2018–23** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | quad | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Coyote Gen III / IV / **5.0 Gen IV 2024+** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | quad | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Cyclone V6 / **3.7 Cyclone** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Duratec / MZR / **Duratec 2.0** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Duratec / MZR / **Duratec 2.3** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Duratec / MZR / **Duratec 2.5** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Focus ST170 / **2.0 Zetec SVT / ST170** | 74 / 75 | external-multi / wasted | maf | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl) |
| Godzilla V8 / **7.3 Godzilla** | 47 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Modular V8 / **4.6 2V** | 34 / 0 | dumb / cop | unknown | 8 injectors; Z unknown | fixed | 4/8 | wheel/decoder, injector current, MAP/MAF, Brick running test | [Injector](https://charm.li/Ford/2002/Mustang%20GT%20V8-4.6L%20SOHC%20VIN%20X/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Description%20and%20Operation/Ignition%20Systems/) |
| Modular V8 / **4.6 3V** | 59 / 0 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Modular V8 / **4.6 4V** | 62 / 0 | unknown / unknown | unknown | count unknown; Z unknown | fixed | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Modular V8 / **5.4 2V** | 62 / 0 | unknown / unknown | unknown | count unknown; Z unknown | fixed | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Modular V8 / **5.4 3V** | 34 / 0 | dumb / cop | unknown | 8 injectors; Z unknown | single | 4/8 | wheel/decoder, injector current, MAP/MAF, Brick running test | [Injector](https://charm.li/Ford/2008/F%20150%204WD%20V8-5.4L/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Description%20and%20Operation/Powertrain%20Control%20Hardware/) |
| Modular V8 / **5.4 4V** | 34 / 0 | dumb / cop | maf | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/boss-5-4l-v8) |
| Windsor TFI EFI / **302 5.0 TFI EFI** | 56 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Windsor TFI EFI / **351W 5.8 TFI EFI** | 56 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Zetec-E / Lima / ST / **Focus ST225 2.5 five-cylinder** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Zetec-E / Lima / ST / **Lima 2.3 Turbo EFI** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Zetec-E / Lima / ST / **Zetec-E 2.0 early no VCT** | 76 / 77 | external-multi / wasted | maf | 4 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl) |
| Zetec-E / Lima / ST / **Zetec-E 2.0 later VCT** | 74 / 75 | external-multi / wasted | maf | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl) |

## Honda

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| CBR600 / **CBR600 with compatible cam wheel** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Distributor-era Honda / **B16A** | 78 / 79 | external-single / distributor | map | 4 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/b-series) |
| Distributor-era Honda / **B18B** | 78 / 79 | external-single / distributor | map | 4 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/b-series) |
| Distributor-era Honda / **B18C** | 79 / 79 | external-single / distributor | map | 4 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://support.haltech.com/portal/en/kb/articles/b-series) |
| Distributor-era Honda / **B20B** | 78 / 79 | external-single / distributor | map | 4 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/b-series) |
| Distributor-era Honda / **D15B** | 77 / 77 | external-single / distributor | map | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/b-series) |
| Distributor-era Honda / **D16Y8** | 78 / 78 | external-single / distributor | map | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/b-series) |
| Distributor-era Honda / **D16Z6** | 79 / 79 | external-single / distributor | map | count unknown; Z unknown | fixed | 5/8 | injector count, injector current, Brick running test | [Decoder](https://rusefi.com/forum/viewtopic.php?t=2013) · [Coil](https://support.haltech.com/portal/en/kb/articles/b-series) |
| Distributor-era Honda / **H22A** | 77 / 77 | external-single / distributor | map | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/b-series) |
| J-series V6 / **J32A 3.2 V6** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| J-series V6 / **J35A 3.5 V6** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| J30A2 / **J30A2** | 52 / 45 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| K20 port-injected / **K20A2** | 63 / 63 | smart / cop | map | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/thomas-te) |
| K20 port-injected / **K20Z1** | 63 / 63 | smart / cop | map | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/thomas-te) |
| K20 port-injected / **K20Z3** | 63 / 63 | smart / cop | map | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/thomas-te) |
| K24 port-injected / **K24A2** | 63 / 63 | smart / cop | map | count unknown; Z unknown | single | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/thomas-te) |
| K24 port-injected / **K24A4** | 63 / 63 | smart / cop | map | count unknown; Z unknown | single | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/thomas-te) |
| K24 port-injected / **K24Z** | 63 / 63 | smart / cop | map | count unknown; Z unknown | single | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/thomas-te) |
| K24W direct injection / **K24W 2013+ Accord applications** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| L / R series / **L15A port injection** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| L / R series / **R18A 1.8 i-VTEC** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| S2000 F-series / **F20C** | 77 / 77 | smart / cop | map | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/f20c-ap1-engine) |
| S2000 F-series / **F22C1** | 77 / 77 | smart / cop | map | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/f20c-ap1-engine) |

## Kawasaki

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| KX450F / **KX450F** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Mazda

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Miata NA / **B6 1.6 NA** | 79 / 79 | external-multi / wasted | maf | 4 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://support.haltech.com/portal/en/kb/articles/na6-89-93-1-6l-b6-ze) |
| Miata NA / **BP 1.8 NA** | 79 / 79 | external-multi / wasted | maf | 4 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://support.haltech.com/portal/en/kb/articles/93-na8-1-6l-b6-ze) |
| Miata NB / **BP 1.8 NB1** | 79 / 79 | smart / wasted | maf | 4 injectors; Z unknown | fixed | 6/8 | injector current, Brick running test | [Decoder](https://support.haltech.com/portal/en/kb/articles/99-00-nb1-1-8l-bp-4w) |
| Miata NB / **BP 1.8 NB2** | 79 / 79 | smart / wasted | maf | 4 injectors; Z unknown | single | 6/8 | injector current, Brick running test | [Decoder](https://support.haltech.com/portal/en/kb/articles/01-05-nb2-1-8l-w-vvt-bp-z3-bp-ve) |
| Miata NC / MZR / **L5 2.5 NC swap** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Miata NC / MZR / **LF 2.0 NC** | 79 / 79 | smart / cop | map | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/mazda-lf-mzr-engine) |
| Protege / **B6 SOHC** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Protege / **BP DOHC early** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Protege / **Z5 1.5** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| RX-7 rotary / **12A Turbo rotary** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| RX-7 rotary / **13B-REW FD3S rotary** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| RX-7 rotary / **13B-T FC3S Series 4/5 rotary** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| RX-8 Renesis / **13B-MSP 4-port** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| RX-8 Renesis / **13B-MSP 6-port** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Skyactiv gasoline GDI / **Skyactiv-G 2.0** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Skyactiv gasoline GDI / **Skyactiv-G 2.5** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Mercedes-Benz

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| M104 / M111 / M112 / M113 / **M104 3.2 inline-six** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M104 / M111 / M112 / M113 / **M111 2.0/2.3 four-cylinder** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M104 / M111 / M112 / M113 / **M112 3.2 V6** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| M104 / M111 / M112 / M113 / **M113 5.0/5.4 V8** | 47 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Two-segment systems / **Mercedes two-segment flywheel engines** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Mitsubishi

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| 3A92 / **3A92** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| 4B11 / **4B11 MIVEC** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| 4B11 / **4B11T Evo X** | 74 / 75 | smart / cop | maf | 4 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://lemon-manuals.la/Mitsubishi/2008/Lancer%20Evolution%20L4-2.0L%20Turbo%20%284B11T%2FC%29/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Description%20and%20Operation/General%20Information/) |
| 4G63 / **4G63T 1G** | 65 / 65 | external-multi / wasted | maf | 4 injectors; low-Z | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://www.dsmfaq.com/q/277) · [Coil](https://support.haltech.com/portal/en/kb/articles/4g63-engine) |
| 4G63 / **4G63T 2G** | 56 / 56 | unknown / wasted | maf | 4 injectors; low-Z | fixed | 4/8 | wheel/decoder, injector current, coil power stage, Brick running test | [Injector](https://www.dsmfaq.com/q/277) · [Coil](https://support.haltech.com/portal/en/kb/articles/4g63-engine) |
| 4G63 / **4G63T Evo 4–8** | 71 / 72 | unknown / wasted | maf | count unknown; Z unknown | fixed | 4/8 | injector count, injector current, coil power stage, Brick running test | [Decoder](https://support.haltech.com/portal/en/kb/articles/4g63-trigger) · [Coil](https://support.haltech.com/portal/en/kb/articles/4g63-engine) |
| 4G63 / **4G63T Evo 9** | 67 / 68 | smart / wasted | maf | count unknown; Z unknown | single | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/4g63-engine) |
| 4G69 / **4G69 MIVEC** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| 6G72 / **6G72 DOHC** | 66 / 62 | external-multi / wasted | unknown | 6 injectors; Z unknown | fixed | 4/8 | wheel/decoder, injector current, MAP/MAF, Brick running test | [Injector](https://charm.li/Mitsubishi/1997/3000GT%20SL%20V6-2972cc%203.0L%20DOHC%20MFI/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Testing%20and%20Inspection/Component%20Tests%20and%20General%20Diagnostics/) |
| 6G72 / **6G72 SOHC** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| 6G75 / **6G75 MIVEC** | 51 / 44 | unknown / unknown | unknown | count unknown; Z unknown | single | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Nissan

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| High-resolution optical CAS / **RB25DET OEM CAS** | 0 / 0 | varies / cop | maf | 6 injectors; Z unknown | unknown | 3/8 | wheel/decoder, injector current, coil power stage, cam/VVT, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/rb-engine) |
| High-resolution optical CAS / **RB26DETT OEM CAS** | 0 / 0 | external-multi / cop | maf | 6 injectors; Z unknown | unknown | 4/8 | wheel/decoder, injector current, cam/VVT, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/rb-engine) |
| High-resolution optical CAS / **SR20DET OEM CAS** | 0 / 0 | varies / cop | maf | 4 injectors; Z unknown | unknown | 3/8 | wheel/decoder, injector current, coil power stage, cam/VVT, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/sr20-engine) |
| HR / **HR15DE** | 56 / 56 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| HR / **HR16DE** | 56 / 56 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| HR12DDR / **HR12DDR** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| KA / CA / RB / **CA18DET optical CAS** | 0 / 0 | external-multi / varies | maf | 4 injectors; Z unknown | fixed | 4/8 | wheel/decoder, injector current, coil layout, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/ca18-engine) |
| KA / CA / RB / **KA24DE 2.4 optical CAS** | 0 / 0 | external-single / distributor | maf | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ka24de) |
| KA / CA / RB / **RB20DET optical CAS** | 0 / 0 | external-multi / cop | maf | 6 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/rb-engine) |
| KA / CA / RB / **RB30DET converted hybrid** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| KA / CA / RB / **RB30E distributor** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Micra K11 / **CG10DE** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Micra K11 / **CG13DE** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| MR18 / **MR18DE** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://github.com/rusefi/rusefi/blob/master/firmware/controllers/trigger/decoders/trigger_nissan.cpp) |
| Primera / **Primera with matching OEM crank pattern** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| QR25 / **QR25DE** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://github.com/rusefi/rusefi/blob/master/firmware/controllers/trigger/decoders/trigger_nissan.cpp) |
| VK56DE / **VK56DE** | 59 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://github.com/rusefi/rusefi/blob/master/firmware/controllers/trigger/decoders/trigger_nissan.cpp) |
| VQ30 / **VQ30DE** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| VQ35 / **VQ35DE** | 77 / 35 | smart / cop | maf | 6 injectors; Z unknown | dual | 6/8 | injector current, Brick running test | [Decoder](https://support.haltech.com/portal/en/kb/articles/vq35de-engine) |

## Renault

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| F3R / **F3R 2.0** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 1/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) |
| Renix / **Renault Renix 44-2-2 matching wheel** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Rover

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| K-series / **Rover K 1.4** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| K-series / **Rover K 1.6** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| K-series / **Rover K 1.8** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Skoda

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Favorit / **Favorit 1.3** | 59 / 60 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Subaru

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| EJ alternate / **EJ-series 6-tooth crank version** | 56 / 56 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EJ flat-four / **EJ20 7+6 version** | 60 / 60 | unknown / unknown | limited-map | count unknown; Z unknown | unknown | 2/8 | injector count, injector current, coil layout, coil power stage, cam/VVT, Brick running test | [Decoder](https://support.haltech.com/portal/en/kb/articles/ej20-engine) |
| EJ flat-four / **EJ22 7+6 version** | 54 / 54 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EJ flat-four / **EJ25 7+6 version** | 54 / 54 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EJ207 / FA20 / FA24 / **EJ207 pre-AVCS** | 71 / 71 | smart / cop | limited-map | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ej20-engine) |
| EJ207 / FA20 / FA24 / **EJ207 with AVCS** | 60 / 60 | smart / cop | limited-map | count unknown; Z unknown | dual | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/ej20-engine) |
| EJ207 / FA20 / FA24 / **FA20D BRZ/86 naturally aspirated** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EJ207 / FA20 / FA24 / **FA20DIT turbo** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EJ207 / FA20 / FA24 / **FA24D BRZ/GR86** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EJ207 / FA20 / FA24 / **FA24DIT turbo** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EZ30 / **EZ30** | 79 / 35 | smart / cop | both | 6 injectors; Z unknown | dual | 6/8 | injector current, Brick running test | [Decoder](https://wiki.rusefi.com/All-Supported-Triggers/) · [Injector](https://support.haltech.com/portal/en/kb/articles/ez30-engine) |
| SVX EG33 / **EG33 3.3** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Suzuki

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| G13 / **G13B / G13B GTi** | 53 / 53 | external-single / distributor | maf | 4 injectors; low-Z 2.2Ω | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/g13b-engine) |
| G16 / **G16B** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| K6A / **K6A** | 56 / 57 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Suzuki missing tooth / **Suzuki 36-2-2 wheel applications** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Toyota

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| A-series 4A-G / **4A-GE 16V 24+1 distributor** | 66 / 66 | external-single / distributor | mixed | count unknown; Z unknown | fixed | 3/8 | wheel/decoder, injector count, injector current, MAP/MAF, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/4ag-engine) |
| A-series 4A-G / **4A-GE 20V Blacktop** | 69 / 69 | external-single / distributor | map | count unknown; Z unknown | switched | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/4ag-engine) |
| A-series 4A-G / **4A-GE 20V Silvertop** | 66 / 67 | external-single / distributor | maf | count unknown; Z unknown | switched | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/4ag-engine) |
| A-series 4A-G / **4A-GZE supercharged** | 67 / 67 | external-multi / wasted | mixed | count unknown; Z unknown | fixed | 3/8 | wheel/decoder, injector count, injector current, MAP/MAF, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/4ag-engine) |
| GR / AR / AZ / NZ / **1NZ-FE 1.5** | 76 / 77 | smart / cop | maf | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/1nz-fe-engine) |
| GR / AR / AZ / NZ / **2AR-FE 2.5** | 47 / 48 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| GR / AR / AZ / NZ / **2AZ-FE 2.4** | 76 / 77 | smart / cop | maf | 4 injectors; Z unknown | single | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/2az-fe-engine) |
| GR / AR / AZ / NZ / **2GR-FE 3.5 V6** | 64 / 35 | smart / cop | maf | 6 injectors; Z unknown | quad | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://device.report/m/40df13ca4f8ff2b6bb0cd71f50ce2760eba886cda8f252010675676d90aa567a) |
| JZ non-VVT-i / **1JZ-GTE non-VVT-i** | 79 / 35 | external-multi / cop | map | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine) |
| JZ non-VVT-i / **2JZ-GE non-VVT-i crank-sensor variant** | 62 / 55 | unknown / unknown | unknown | 6 injectors; high-Z | fixed | 1/8 | wheel/decoder, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | [Injector](https://diyautotune.com/blogs/installation-guides/megasquirt-your-mk4-toyota-supra-or-non-vvti-toyota-2jz) |
| JZ non-VVT-i / **2JZ-GE non-VVT-i distributor variant** | 65 / 61 | external-single / distributor | unknown | 6 injectors; high-Z | fixed | 4/8 | wheel/decoder, injector current, MAP/MAF, Brick running test | [Injector](https://diyautotune.com/blogs/installation-guides/megasquirt-your-mk4-toyota-supra-or-non-vvti-toyota-2jz) · [Coil](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine) |
| JZ non-VVT-i / **2JZ-GTE non-VVT-i** | 76 / 35 | external-multi / cop | map | 6 injectors; low-Z 1.95Ω | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://www.2jzgarage.com/wp-content/uploads/Supra/Workshop_Manual/SFI.pdf) · [Coil](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine) |
| JZ VVT-i / **1JZ-GTE VVT-i** | 77 / 73 | external-multi / wasted | map | count unknown; Z unknown | single | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine) |
| JZ VVT-i / **2JZ-GE VVT-i** | 72 / 69 | external-multi / wasted | unknown | count unknown; Z unknown | single | 3/8 | wheel/decoder, injector count, injector current, MAP/MAF, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine) |
| JZ VVT-i / **2JZ-GTE VVT-i** | 77 / 73 | external-multi / wasted | map | count unknown; Z unknown | single | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine) |
| S-series 3S / **3S-GE BEAMS Blacktop** | 60 / 60 | smart / cop | unknown | count unknown; Z unknown | dual | 3/8 | wheel/decoder, injector count, injector current, MAP/MAF, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/3sg-engine) |
| S-series 3S / **3S-GE BEAMS Redtop** | 60 / 60 | smart / cop | unknown | count unknown; Z unknown | single | 3/8 | wheel/decoder, injector count, injector current, MAP/MAF, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/3sg-engine) |
| S-series 3S / **3S-GTE Gen 1–3 distributor** | 66 / 67 | external-single / distributor | mixed | 4 injectors; Z unknown | fixed | 4/8 | wheel/decoder, injector current, MAP/MAF, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/3sg-engine) |
| S-series 3S / **3S-GTE Gen 4–5 coil-on-plug** | 79 / 79 | smart / cop | map | 4 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/3sg-engine) |
| UZ V8 / **1UZ-FE non-VVT-i** | 76 / 0 | external-multi / twin-distributor | maf | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine) |
| UZ V8 / **1UZ-FE VVT-i** | 60 / 0 | smart / cop | maf | 8 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine) |
| UZ V8 / **2UZ-FE non-VVT-i** | 60 / 0 | smart / cop | maf | 8 injectors; Z unknown | fixed | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine) |
| UZ V8 / **2UZ-FE VVT-i** | 60 / 0 | smart / cop | maf | 8 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine) |
| UZ V8 / **3UZ-FE VVT-i** | 60 / 0 | smart / cop | maf | 8 injectors; Z unknown | dual | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine) |

## Volkswagen / Audi

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| 1.8T / **AEB 1.8T** | 76 / 76 | external-multi / cop | maf | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://support.haltech.com/portal/en/kb/articles/1-8-turbo-20v) |
| 1.8T / **ATW 1.8T** | 77 / 78 | smart / cop | maf | 4 injectors; Z unknown | switched | 5/8 | wheel/decoder, injector current, Brick running test | [Injector](https://charm.li/Volkswagen/2005/Passat%20Sedan%20%283B3%29%20L4-1.8L%20Turbo%20%28AWM%29/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Testing%20and%20Inspection/Component%20Tests%20and%20General%20Diagnostics/Ignition%20Coils%20With%20Power%20Output%20Stage%2C%20Checking/) · [Cam](https://support.haltech.com/portal/en/kb/articles/1-8-turbo-20v) |
| 1.8T / **AUG 1.8T** | 72 / 73 | smart / cop | maf | 4 injectors; Z unknown | unknown | 4/8 | wheel/decoder, injector current, cam/VVT, Brick running test | [Injector](https://charm.li/Volkswagen/2005/Passat%20Sedan%20%283B3%29%20L4-1.8L%20Turbo%20%28AWM%29/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Testing%20and%20Inspection/Component%20Tests%20and%20General%20Diagnostics/Ignition%20Coils%20With%20Power%20Output%20Stage%2C%20Checking/) |
| 1.8T / **AWM 1.8T** | 72 / 73 | smart / cop | maf | 4 injectors; Z unknown | unknown | 4/8 | wheel/decoder, injector current, cam/VVT, Brick running test | [Injector](https://charm.li/Volkswagen/2005/Passat%20Sedan%20%283B3%29%20L4-1.8L%20Turbo%20%28AWM%29/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Testing%20and%20Inspection/Component%20Tests%20and%20General%20Diagnostics/Ignition%20Coils%20With%20Power%20Output%20Stage%2C%20Checking/) |
| EA113 / EA888 / **2.0 TFSI EA113 BPY** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EA113 / EA888 / **2.0 TSI EA888 Gen 1/2** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| EA113 / EA888 / **2.0 TSI EA888 Gen 3** | 0 / 0 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| V6 2.7T / **2.7T APB 30V** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| V6 2.7T / **2.7T BEL 30V** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| VR6 / **2.8 VR6 24V AQP/BDF** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| VR6 / **3.2 VR6 R32 BFH/BUB** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| VR6 / **AAA 2.8 VR6 12V** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Volvo

| Engine family / variant | Big / Mini | Coil / firing scheme | Stock load | Injector count / electrical | Cam/VVT | Evidence | Open gaps | Field source examples |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- |
| Redblock / **B230FT LH2.4 / EZK** | 75 / 75 | external-single / distributor | maf | count unknown; Z unknown | fixed | 4/8 | wheel/decoder, injector count, injector current, Brick running test | [Coil](https://archive.breakfast.institute/breakfastmotorsport/Volvo_B230FT_sensors_and_actuators_for_use_with_a_stand-alone_ECU/src/commit/e30afeebcc2b2a6aebb0a3671f76966a31b85755) |
| Whiteblock 5-cylinder / **B5234T 2.3 turbo** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Whiteblock 5-cylinder / **B5244T 2.4 turbo** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |
| Whiteblock 5-cylinder / **B5254T 2.5 turbo** | 47 / 41 | unknown / unknown | unknown | count unknown; Z unknown | unknown | 0/8 | wheel/decoder, injector count, injector current, coil layout, coil power stage, cam/VVT, MAP/MAF, Brick running test | No field-specific link |

## Trust and validation policy

1. Source metadata does not prove current hardware is unchanged or that a referenced competitor's wiring should be used on Brick.
2. If a source covers an engine family rather than exact engine code/year, the engine remains a research candidate. Multiple factory revisions should be split once reliable data exists.
3. Big's six IGBT-compatible ignition outputs are part of its sixteen low-side channels; Mini has no independently validated native high-current ignition drivers. OEM coil power stages require part-number verification before any physical integration.
4. Big's external GDI module integration is untested and Mini has no GDI control software; a factory GDI engine is not natively compatible even if its other categories have scores.
5. Check original sensor transfer data, external MAP placement/range, VR/Hall supply/polarity, injector electrical requirements, actual I/O allocation, timing synchronization and coil firing strategy before describing an engine as finished.
