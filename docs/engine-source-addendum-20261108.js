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
,{"models":["Barra 4.0 NA","Barra 4.0 Turbo"],"url":"https://support.haltech.com/portal/en/kb/articles/4-0l-barra-engine","scope":"Ford Barra BA-FG 4.0 six-cylinder technical reference, dual VR cam pickups with separate 3+1 crank-relative phase targets","cam":"Two cam targets, one each on intake and exhaust, have three regularly spaced teeth plus one additional index feature (3+1 pattern).","camEvidence":"engine"},{"models":["1JZ-GTE non-VVT-i","2JZ-GTE non-VVT-i"],"url":"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","scope":"Non-VVT-i Toyota 1JZ/2JZ factory turbo crank/cam sensors per Haltech technical reference","cam":"Non-VVT-i JZ turbo engines have two independent cam sensors G1 and G2, both passive VR/reluctor pickups, each sensing a single tooth. One suitable phase input is used for engine sync.","camEvidence":"engine"},{"models":["2AZ-FE 2.4"],"url":"https://support.haltech.com/portal/en/kb/articles/2az-fe-engine","scope":"Toyota 2AZ-FE intake-cam target has three features and a passive reluctor cam sensor, per Haltech 2AZ-FE guide","cam":"Toyota 2AZ-FE: one intake-cam reluctor target with three physical teeth for phase detection and intake VVT-i.","camEvidence":"engine"},{"models":["2.0 Zetec SVT / ST170"],"url":"https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl","scope":"Ford 2.0L Zetec-E ST170/SVT engine with variable exhaust cam timing and later five-tooth phase trigger","cam":"Ford SVT/ST170 later Zetec-E: one exhaust-cam five-tooth phase target with unequal spacing, using a passive VR/inductive cam sensor. No intake VCT.","camEvidence":"engine"}]; 
let touched=0;
for(const study of studies){
 for(const e of all.filter(x=>study.models.includes(x.model))){
  const g=e.triggerGuide||(e.triggerGuide={}),r=e.research||(e.research={});
  if(study.cam){g.cam=study.cam;e.cam=study.cam;r.camWheel=study.cam;}
  if(study.camEvidence==="engine")g.camPatternEvidence="engine";
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