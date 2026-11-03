# rusEFI community running-engine examples

This is a **reference index**, not a Brick ECU compatibility guarantee. The [official rusEFI running-engine archive](https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/) documents its early community projects through 2020 and explicitly says it stopped counting every engine in 2021. More recent examples appear in [rusEFI Case Studies](https://wiki.rusefi.com/Case-Studies/). Follow those sources for the original builders' threads, videos and hardware details.

## Big Brick — developer firsthand reports

| Engine | Reported result | Scope |
| --- | --- | --- |
| **Nissan VQ35DE** | **Running successfully on Big Brick** | Reported directly by Brick ECU's developer on 2026-11-03; donor year, exact ignition hardware, logs and harness pin map not yet supplied. **Big Brick specifically**, not Mini. |
| **GM Gen IV LS** | **Running successfully on Big Brick** | Developer confirms the Gen IV LS family has worked; the specific LS2/LS3/LS7/L92/L96 code has **not** been identified. This is not evidence that each variant was individually tested. |

## rusEFI community — documented projects

These examples involve **rusEFI software and various hardware**, not necessarily Brick ECU. A named vehicle does not automatically establish OEM trigger-wheel type, untouched factory ignition hardware or firmware revision.

| Engine / platform | Relevant historical reports |
| --- | --- |
| **GM / V8** | Dodge Ram and Holden V8 reports; an LS-swapped Volvo on Proteus. Separate Camaro LS and E38 stories appear in Case Studies. |
| **Toyota JZ** | Non-VVT-i 2JZ-GTE and a 1JZ-GTE swap using microRusEFI. |
| **Toyota 4A-GE** | AW11 MR2 example. |
| **Nissan KA24DE / SR20** | KA24DE sedan and SR20VE builds. A 350Z PnP example appears in Case Studies; its exact VQ version is not specified. |
| **Honda B-series** | B16A CRX and B20 CR-V builds, plus Civic examples. |
| **BMW** | M52B28 turbo, older 3-series, six-cylinder and V8 builds, M42 swap and M73 V12 example. |
| **Mazda** | Many NA/NB Miata builds, including VVT, turbo and race applications; Protege and 626 examples. |
| **Mitsubishi** | Multiple 4G63 entries; Evo X example in Case Studies. Exact engine generations differ. |
| **VW** | 1.8T with electronic throttle, a supercharged Passat and an air-cooled Beetle; an older VW GDI experiment is listed, but **this does not establish GDI compatibility on Brick**. |
| **Subaru / Volvo** | Supercharged EJ25 and several 240/B230 turbo projects. |
| **Ford / Chrysler** | Aspire, Neon test vehicles, and engine-swapped applications. |
| **Mercedes / Renault / French makes** | M111 Mercedes builds, Renault and Citroën/Peugeot projects. |
| **Smaller / unusual engines** | Small single-cylinder, motorcycle and two-stroke demonstration projects. |

**Evidence quality matters:** the historical archive labels its 1995 Neon as a bench example and its 1995 Honda Accord as a failed test mule; neither is evidence of a proven road-going setup. Some descriptions provide only vehicle model or engine family. The official lists are historical, not exhaustive, and do not establish current firmware compatibility with every stock sensor.

## Sources and next-step references

- [All historical entries and links to original rusEFI builder threads](https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/)
- [rusEFI Case Studies — LS, Evo X, Coyote, 350Z, M111, 4G63 and more](https://wiki.rusefi.com/Case-Studies/)
- [rusEFI supported trigger decoder catalogue](https://wiki.rusefi.com/All-Supported-Triggers/)
- [rusEFI high-impedance port injector requirements](https://wiki.rusefi.com/Injectors/)

Some of these names also appear as **community examples** in Brick ECU's searchable [Engine Finder](compatibility.html). The finder deliberately keeps three different claims separate: **Big Brick developer-tested**, **rusEFI community running example**, and **documented trigger/firmware research**. No upstream case study makes an untested Brick harness or GDI setup plug-and-play.
