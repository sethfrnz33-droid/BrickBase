/* Brick ECU engineering-research progress, independent of running a physical installation.
 * Goals: OEM crank/cam geometry, pickup technologies, control architecture and decoder fit.
 * No completion requirement for harness assembly, calibration or engine running tests.
 */
(()=>{
"use strict";
const data=window.BRICK_ENGINE_PRESETS;
if(!Array.isArray(data))return;
const missing=/\b(?:not established|not documented|not verified|unverified|unknown|not determined|need(?:s)?(?: to)? verify|requires? (?:donor|exact|year|OEM)|no .*?source|awaiting|not sourced|unresolved|pending|not yet confirmed)\b/i;
const tentative=/\b(?:candidate|hypothesis|likely|reportedly|commonly reported|may be|appears|possible|not independently|not specified|not proven|family only|donor-dependent|may differ|must be confirmed|still to source)\b/i;
const shape=/(?:\b\d{1,3}\s*[-+]\s*\d{1,3}(?:\s*[-+]\s*\d{1,3}){0,3}\b|\b\d{1,3}[\w\s-]{0,55}\b(?:teeth|tooth|slots|positions|events|pulses|features|blocks)\b|\b(?:one|two|three|four|five|six|seven|eight|twelve|twenty.four)(?:[\w-]+|\s+){0,3}\b(?:teeth|tooth|slots|pulses|events|features|blocks)\b|\b(?:missing.tooth|half.moon|one.tooth|two.tooth|irregular|asymmetric|multi.gap|optical|signature)\b)/i;
const camShape=/(?:\b\d+(?:[\w-]+|\s+){0,3}\b(?:teeth|tooth|slots|events|pulses|windows|features)\b|\b(?:one|two|three|four|six)(?:[\w-]+|\s+){0,2}\b(?:teeth|tooth|slots|events|pulses|features)\b|\b(?:one.?tooth|half.?moon|single.?tooth|unequal|cam.speed|distributor|cam phase|cam Hall|two-track|multiple cam|vvt cam|pulse per|phase reference)\b)/i;
function type(text,kind){
 const s=String(text||"");
 if(/all three position sensors are Hall.effect/i.test(s))return "Powered Hall/digital";
 const segments=s.split(/(?<=[.;])\s+|\s+Additional donor-scoped evidence:/i);
 const names=kind==="crank"?/\b(?:crank|CKP|G28)\b/i:/\b(?:cam|CMP|G40|phase)\b/i;
 for(const segment of segments){
   if(!names.test(segment))continue;
   // Qualified negatives invalidate the sentence as a sensor-type source.
   if(/\b(?:may|might|could|possibly|unknown|uncertain|unverified|not verified|verify|confirm|varies|different|either|or VR|or Hall|need)\b/i.test(segment))continue;
   const pairs=kind==="crank"?
     [/(?:crank|CKP|G28)[^\n.;]{0,54}?\b(?:magnetoresistive|MRE|magnetic resistance|MR element|Hall.effect|Hall|inductive|variable reluctance|reluctor|VR|optical)\b/i,/\b(?:magnetoresistive|MRE|magnetic resistance|MR element|Hall.effect|Hall|inductive|variable reluctance|reluctor|VR|optical)\b[^\n.;]{0,35}?(?:crank|CKP|G28)\b/i]:
     [/(?:cam|CMP|G40|phase)[^\n.;]{0,54}?\b(?:magnetoresistive|MRE|magnetic resistance|Hall.effect|Hall|inductive|variable reluctance|reluctor|VR|optical)\b/i,/\b(?:magnetoresistive|MRE|magnetic resistance|Hall.effect|Hall|inductive|variable reluctance|reluctor|VR|optical)\b[^\n.;]{0,35}?(?:cam|CMP|G40|phase)\b/i];
   let term=null;
   for(const re of pairs){
     const m=segment.match(re);
     if(m){term=m[0].match(/magnetoresistive|magnetic resistance|MRE|MR element|Hall.effect|Hall|inductive|variable reluctance|reluctor|\bVR\b|optical/i)?.[0];if(term)break;}
   }
   if(term){
     if(/magnetoresistive|MRE|magnetic resistance|MR element/i.test(term))return "Active magnetoresistive (MR/MRE)";
     if(/Hall/i.test(term))return "Powered Hall/digital";
     if(/inductive|variable reluctance|reluctor|\bVR\b/i.test(term))return "Passive VR/inductive";
     if(/optical/i.test(term))return "Optical/digital";
   }
 }
 return null;
}
function hardwareAssessment(e,m,ecu,crankLevel){
 const big=ecu==="big",n=Number(e.cyl)||0;
 if(m.stockGDI)return big?"Factory GDI cannot run natively: external specialized injector/pump drivers remain experimental.":"Factory GDI control is not available in Mini Brick software.";
 if(n===0)return "Rotary-leading/trailing ignition and fuel scheduling need a dedicated compatibility assessment.";
 if(!big&&n>6)return "Mini Brick is outside its intended cylinder/output capacity.";
 if(big&&n>12)return "More cylinders than Big Brick's stated 12-cylinder batch-fuel/sequential-spark capability.";
 if(m.stockOpticalCAS)return "Original high-resolution Nissan optical CAS has no verified native decoder path; a different trigger/interface may be necessary.";
 if(m.brokenDecoder)return "Original trigger decoder is flagged problematic; firmware support needs independent review.";
 if(/frequency.excited|frequency.coded|frequency.modulated/i.test(e.triggerGuide?.cmp||""))return "OEM cam sensor uses a frequency-coded interface rather than ordinary Hall/VR; a supported alternate sensor or decoder is needed for reliable full phase control.";
 if(!big&&m.coilType==="dumb")return "Original passive coils need a separately verified ignition power stage; Mini has no validated native dumb-coil driver.";
 if(big&&m.coilType==="dumb"&&n>6)return "More than six passive COP coils require additional external ignition power stages beyond Big's six native IGBT stages.";
 if(!big&&n===6)return "Six-cylinder use requires a verified wasted-spark/injector-output allocation rather than assumed full sequential I/O.";
 if(m.extraNativeVRNeeded)return "Original pickup set may exceed independently documented conditioned VR channels; confirm signal-interface budget.";
 if(crankLevel==="missing")return "Factory crank geometry is not yet established for this donor; no reliable trigger/ECU fit decision yet.";
 return "Preliminary control-topology candidate; confirm cam decoder, signal voltage, injector type, ignition drivers and required actuator channels.";
}
const stageLabel={
 "wheel-sourced":"Crank wheel documented",
 "family-wheel-sourced":"Engine-family wheel reference",
 "partial-wheel-sourced":"Trigger details incomplete",
 "oem-wheel-sourced":"OEM wheel documented",
 "generic-correlation-pending":"Firmware decoder pairing unresolved",
 "decoder-only":"Firmware shape only; donor unspecified",
 "hardware-constraint":"Fuel/driver or decoder limitation"
};
for(const e of data){
 const r=e.research||{},g=e.triggerGuide||{},i=e.integration||{},m=e.confidenceV2?.model||{};
 const crank=String(g.crank||r.crankWheel||e.crank||"No pattern established");
 const cam=String(g.cam||r.camWheel||e.cam||"No phase reference established");
 const sensorText=[r.electrical,i.sensors].filter(Boolean).join(". ");
 const ckp=String(g.ckp||type(sensorText,"crank")||"Not independently identified for this exact engine variant");
 const cmp=String(g.cmp||type(sensorText,"cam")||"Not independently identified for this exact engine variant");
 const crankDirect=(r.status==="wheel-sourced"||r.status==="oem-wheel-sourced")&&shape.test(crank)&&!missing.test(crank)&&!tentative.test(crank);
 const crankFamily=(r.status==="family-wheel-sourced")&&shape.test(crank)&&!missing.test(crank);
 const crankOther=shape.test(crank)&&!missing.test(crank)&&!tentative.test(crank);
 const crankLevel=g.primaryPatternEvidence==="engine"?"documented":g.primaryPatternEvidence==="family"?"family":crankDirect?"documented":crankFamily?"family":crankOther?"described":"missing";
 const camLevel=g.camPatternEvidence==="engine"?"described":g.camPatternEvidence==="family"?"family":/synthetic CAMOUT|synthesi[sz]ed cam.phase|no physical cam tooth/i.test(cam)&&/ICM|module/i.test(cam)?"described":camShape.test(cam)&&!missing.test(cam)&&!tentative.test(cam)?"described":"missing";
 const ckpKnown=!missing.test(ckp)&&!/not independently identified/i.test(ckp);
 const cmpKnown=!missing.test(cmp)&&!/not independently identified/i.test(cmp);
 const ignitionKnown=!["unknown","varies",undefined].includes(m.coilType)&&!["unknown","varies",undefined].includes(m.ignitionLayout);
 const fuelKnown=/port|direct|GDI|indirect|sequential|batch|carb|rotary|injection/i.test(e.fuel||"");
 const triggerDecoder=String(g.decoder||r.decoderCorrelation||"");
 const decoderDocumented=/(?:rusEFI|TOOTHED_WHEEL|GM_|FORD_|NISSAN_|HONDA_|MAZDA_|BMW_|JEEP_|ROVER_|TOYOTA_|\b36-1\b|\b60-2\b)/i.test(triggerDecoder)&&!/\b(?:no (?:exact|proven|verified|confirmed)|unsupported|not a proven|not supported)\b/i.test(triggerDecoder);
 const checks=[
  {id:"crank",label:"OEM crank/primary trigger geometry",done:crankLevel==="documented",state:crankLevel},
  {id:"cam",label:"Cam or cycle-phase target geometry",done:camLevel==="described",state:camLevel},
  {id:"ckp",label:"Crank or primary trigger sensor technology",done:ckpKnown,state:ckpKnown?"documented":"missing"},
  {id:"cmp",label:"Cam/phase sensor technology or documented no-sensor strategy",done:cmpKnown,state:cmpKnown?"documented":"missing"},
  {id:"ignition",label:"Original ignition coil and power-stage architecture",done:ignitionKnown,state:ignitionKnown?"described":"missing"},
  {id:"fuel",label:"Original injector/fueling method",done:fuelKnown,state:fuelKnown?"described":"missing"},
  {id:"decoder",label:"rusEFI decoder or supported generic-wheel correlation",done:decoderDocumented,state:decoderDocumented?"candidate":"missing"}
 ];
 const complete=checks.every(c=>c.done);
 e.technicalResearch={crank,cam,ckp,cmp,crankLevel,camLevel,decoder:triggerDecoder,stageLabel:crankLevel==="missing"&&["wheel-sourced","oem-wheel-sourced"].includes(r.status)?"Crank evidence incomplete":stageLabel[r.status]||"Research candidate",checks,known:checks.filter(c=>c.done).length,total:checks.length,missing:checks.filter(c=>!c.done).map(c=>c.label),complete,
  bigAssessment:hardwareAssessment(e,m,"big",crankLevel),miniAssessment:hardwareAssessment(e,m,"mini",crankLevel),notice:"Research is judged from OEM engine geometry, sensor type and control-method references. Family-only or donor-variable claims are explicitly qualified; physical installation testing is not a completion requirement."};
}
window.BRICK_ENGINE_RESEARCH_SUMMARY={total:data.length,complete:data.filter(e=>e.technicalResearch.complete).length,
  crankDocumented:data.filter(e=>e.technicalResearch.crankLevel==="documented").length,
  familyCrank:data.filter(e=>e.technicalResearch.crankLevel==="family").length,
  sensorTypes:data.filter(e=>e.technicalResearch.ckp&&!e.technicalResearch.ckp.startsWith("Not independently")).length};
})();