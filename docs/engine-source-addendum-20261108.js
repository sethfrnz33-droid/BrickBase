/* OEM and firmware references verified 2026-11-08.
 * A documented sensor/decoder is not a validated Brick ECU installation.
 * Exact donor hardware and crank/cam signal edges still require independent checking.
 */
(()=>{
"use strict";
const all=window.BRICK_ENGINE_PRESETS;
if(!Array.isArray(all))return;
const studies=[
 {models:["1UZ-FE VVT-i"],
  url:"https://support.haltech.com/portal/en/kb/articles/1uz-fe-engine",
  scope:"Toyota 1UZ-FE VVT-i (1998-on) three-feature cam target and reluctor sensor, per Haltech UZ family guide",
  cmp:"Passive VR/inductive reluctor cam pickup on each 1UZ VVT-i intake cam; each cam target has three teeth. Factory VVT-i reference; not a general Hall input."},
 {models:["Zetec-E 2.0 later VCT"],
  url:"https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl",
  scope:"Late Ford Zetec-E 2.0 VCT cam sensor technology; Haltech separates Zetec-E from Mazda-derived Duratec engines",
  cmp:"Passive VR/inductive two-wire cam sensor, paired with the late five-feature exhaust-cam target; not a powered Hall sensor."},
 {models:["D16Z6"],
  url:"https://workshop-manuals.com/honda/del_sol/l4-1.6l_sohc_%28vtec%29/sensors_and_switches/sensors_and_switches_powertrain_management/sensors_and_switches_computers_and_control_systems/camshaft_position_sensor/component_information/diagrams/page_366/",
  scope:"1994 Honda Del Sol 1.6L SOHC VTEC OEM distributor CKP/TDC/CYP pick-up coil description",
  cmp:"Distributor CYP cycle-phase pickup is a passive inductive magnetic pick-up coil. The CKP and TDC pickups are separate coils on the same cam-driven distributor shaft."},
 {models:["BP 1.8 NB1"],
  url:"https://wiki.rusefi.com/All-Supported-Triggers/",
  scope:"rusEFI official supported trigger reference names MAZDA_MIATA_NB1 for the 1999-2000 Mazda BP-4W NB1 trigger",
  decoder:"rusEFI MAZDA_MIATA_NB1 is a named supported special trigger for the sourced NB1 geometry. This confirms a documented firmware candidate, not Brick ECU running validation or every factory cam/edge setting."}
];
let touched=0;
for(const study of studies){
 for(const e of all.filter(x=>study.models.includes(x.model))){
  const g=e.triggerGuide||(e.triggerGuide={}),r=e.research||(e.research={});
  if(study.cmp){
    g.cmp=study.cmp;
    r.electrical=[r.electrical,"Additional phase pickup: "+study.cmp].filter(Boolean).join("; ");
  }
  if(study.decoder){g.decoder=study.decoder;r.decoderCorrelation=study.decoder;}
  g.scope=[g.scope,study.scope].filter(Boolean).join(" | ");
  e.sources=[...new Set([...(e.sources||[]),study.url])];
  r.sources=[...new Set([...(r.sources||[]),study.url])];
  e.references ||= [];
  if(!e.references.some(x=>x.url===study.url))e.references.push({
   url:study.url,label:"2026-11-08 OEM/firmware evidence",
   scope:study.scope+"; no implied Brick harness, live test or universal calibration."
  });
  r.checked="2026-11-08";
  e.audit ||= {};
  e.audit.checked="2026-11-08";
  e.audit.sourceCount=e.references.length;
  touched++;
 }
}
window.BRICK_ENGINE_ADDENDUM_COUNT=touched;
})();