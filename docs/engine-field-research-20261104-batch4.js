/* Final VW/Audi source pass, Nov 4 2026. Donor-specific verification is required. */
(()=>{
"use strict";
const all=window.BRICK_ENGINE_PRESETS;
if(!Array.isArray(all))return;
const studies=[{"model":"2.8 VR6 24V AQP/BDF","source":"https://charm.li/Volkswagen/2001/Jetta%20GLS%20VR6%20Sedan%20%289M2%29%20V6-2.8L%20%28AFP%29/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Ignition%20Coil/Testing%20and%20Inspection/With%20Generic%20Scan%20Tool/","note":"VW factory BDF service instructions identify six integrated-output-stage ignition coils. This evidence is BDF-specific even though the catalog combines AQP and BDF; confirm AQP original ignition hardware independently. Cam timing controls and CKP/CMP wheel geometry still need exact donor service evidence.","ign":"BDF service covers separate built-in-power-stage ignition coils for six cylinders; AQP's original coil topology and driver interface remain to be verified. Combined AQP/BDF row must not assert one universal coil type.","control":"BDF camshaft-timing control housing appears in OEM service. Confirm exact phaser number and electrical output needs per AQP or BDF.","fields":{}},{"model":"2.0 TFSI EA113 BPY","source":"https://oemdtc.com/tsb/10121170/","note":"VW factory technical bulletin identifies 2005–2007 BPY 2.0T FSI engine with cam-driven high-pressure fuel pump and wearing cam follower. This is high-pressure direct injection: no native Big Brick validated driver, and Mini Brick has no GDI software. CKP/CMP pattern, cylinder coils and HPFP actuation need separate service source.","fuel":"Factory 2.0T BPY FSI is high-pressure direct injected; the injector/HPFP stage is not a normal low-side port injector output. Big external DI driver integration is untested; Mini unsupported.","control":"High-pressure pump regulation, intake cam phasing, turbo pressure control and electronic throttle require dedicated support and donor verification.","fields":{}},{"model":"2.0 TSI EA888 Gen 1/2","source":"https://charm.li/Audi/2010/A4%20Sedan%20%288K2%29%20L4-2.0L%20Turbo%20%28CAEB%29/Repair%20and%20Diagnosis/Powertrain%20Management/Fuel%20Delivery%20and%20Air%20Induction/Locations/Engine%20Code%20CMPA/","note":"2010 Audi CAEB EA888 technical reference documents four high-pressure direct injectors N30–N33 and separate mechanical fuel pump; a 2012 CAEB reference identifies integrated-stage COP. This is evidence for CAEB only; EA888 Gen1/2 has multiple engine codes and cam/trigger revisions.","fuel":"2010 CAEB shows four high-pressure fuel injectors spraying directly into chambers. Native port-injector outputs are not replacements for this fuel system.","ign":"2012 Audi CAEB service lists four integrated-stage coils; CCTA/CBFA and other engine codes must be checked independently.","fields":{}},{"model":"2.0 TSI EA888 Gen 3","source":"https://lemon-manuals.org.ua/Volkswagen/2015/GTI%20SE%2C%202D%20Hatchback%2C%202.0L%20Eng%20VIN%204%2C%20Standard%20Trans/Repair%20and%20Diagnosis%20%28Single%20Page%29/Engine%20Mechanical/Mechanical/Engine%20System%20%28Precautions%20%26%20General%20Information%20%20-%20CXBA%2C%20CNSA%2C%20CXBB%2C%20CNSB%2C%20CXCA%2C%20CXCB%29/00%20General%2C%20Technical%20Data/Identification/Engine%20Number%2FEngine%20Specifications/Engine%20Specifications/","note":"2015 VW GTI factory data identifies CXCA/CNTA/CXCB North American Gen3 engines as direct injection with BOTH intake and exhaust cam timing; later CXDB is recorded with direct plus multiport injection. Do not assume every regional EA888 Gen3 has port injection. Factory GDI must remain unverified for Big and unsupported for Mini.","fuel":"EA888 Gen3 injection is engine-code and region-specific: CXCA/CNTA/CXCB direct only, later CXDB direct+port according to VW factory table. DI-only hardware is not controllable by Mini Brick; Big external DI control untested.","control":"2015 VW technical data confirms intake and exhaust camshaft VVT and valve-lift change on specified GTI codes; CKP/CMP decoder details still need donor-year waveforms.","fields":{}}];
let count=0;
for(const s of studies){
 for(const e of all.filter(e=>e.model===s.model)){
   const r=e.research||(e.research={});
   e.integration ||= {};
   r.notes=[r.notes,s.note].filter(Boolean).join(" Technical addendum: ");
   e.notes=[e.notes,s.note].filter(Boolean).join(" Technical addendum: ");
   if(s.ign)e.integration.ignition=s.ign;
   if(s.fuel)e.integration.injectors=s.fuel;
   if(s.control)e.integration.actuators=[e.integration.actuators,s.control].filter(Boolean).join(" Donor detail: ");
   e.integration.referenceScope=[e.integration.referenceScope,"Additional source is specifically for one named engine code/year. Combined record may include nonmatching OEM systems; no Brick pinout asserted."].filter(Boolean).join(" ");
   r.checked="2026-11-04";
   e.sources=[...new Set([...(e.sources||[]),s.source])];
   r.sources=[...new Set([...(r.sources||[]),s.source])];
   e.references ||= [];
   if(!e.references.some(x=>x.url===s.source))e.references.push({url:s.source,label:"Factory service / technical bulletin",scope:"Original hardware evidence scoped to named engine code, not confirmed on every family variant and not a Brick installation."});
   e.audit||={};
   Object.assign(e.audit,{checked:"2026-11-04",researchStatus:r.status,sourceCount:e.references.length,pinoutVerified:false,brickTested:false});
   count++;
 }
}
window.BRICK_RESEARCH_BATCH4_COUNT=count;
})();