# Brick ECU — Product images and documentation assets

The storefront now uses the supplied Mini Brick and Big Brick board images. The website has been reorganized into a short storefront plus separate product and technical documentation pages.

## Present in the repository

- `assets/mini-brick.webp` — Mini Brick PCB render
- `assets/big-brick.webp` — Big Brick PCB render
- `assets/vehicle.webp` — automotive action photograph
- Additional tuning images in `assets/` may be used in future documentation.

## Most useful additional photographs

1. **Both ECUs together**: real assembled hardware, consistent lighting, three-quarter angle, wide landscape image.
2. **Big Brick case/enclosure**: final complete unit with connector face visible.
3. **Mini Brick case/enclosure**: assembled unit with the same camera angle.
4. **Included connector kits**: each model with its mating connector housings and terminal pins.
5. **Connector identification**: sharp, readable close-ups with physical A/B/C or equivalent labels.
6. **TunerStudio screenshots**: live tuning, datalogging, VVT and wideband pages, with sensitive details hidden.
7. **Engine installation examples**: real tested builds, with engine code and permission to show details.

Image naming: descriptive lowercase kebab-case (e.g., `big-brick-case.webp`). Resize large images and preserve legibility of printed board details. Do not use AI-generated substitutes for production hardware photos.

## Publication checklist

- Confirm the final Mini Brick hardware-specific pinout before adding a terminal map.
- Confirm all Big Brick connector assignments and load limits against production boards.
- Publish vehicle-specific compatibility pages only after engine code, connector numbering, sensor types, ECU channel allocation and actual testing are documented.
- Verify shipping scope and warranty/returns wording for published product pages.
- Maintain checkout on the supplied official Payhip product URLs: Mini https://payhip.com/b/K6IX5 and Big https://payhip.com/b/6OIjf.
- Confirm Cloudflare Workers serves nested HTML routes after deploying `docs/` and `products/`.

## Main documents

- Storefront: `index.html`
- Technical library: `docs/index.html`
- Big Brick pinout: `docs/big-brick-pinout.html`
- Engine directory: `docs/compatibility.html`
