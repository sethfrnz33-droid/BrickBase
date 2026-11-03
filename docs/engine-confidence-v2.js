/* Brick ECU v2: independent confidence layers, evidence labels and conservatively handled unknowns.
 * This file runs AFTER base + expansion data and BEFORE engine-finder.js.
 * Scores are engineering screening heuristics, NOT probabilities of a safe or successful installation.
 */
(()=>{
"use strict";
const items=Array.isArray(window.BRICK_ENGINE_PRESETS)?window.BRICK_ENGINE_PRESETS:[];
const sources={"ls":"https://support.haltech.com/portal/en/kb/articles/ls1-engine","ls4":"https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine","bmw":"https://support.haltech.com/portal/en/kb/articles/m50-engine","m54":"https://bmwtuning.co/wp-content/uploads/2023/08/BMW-M54-Training-Doc.pdf","vag":"https://support.haltech.com/portal/en/kb/articles/1-8-turbo-20v","honda":"https://support.haltech.com/portal/en/kb/articles/b-series","k":"https://support.haltech.com/portal/en/kb/articles/thomas-te","ag":"https://support.haltech.com/portal/en/kb/articles/4ag-engine","sg":"https://support.haltech.com/portal/en/kb/articles/3sg-engine","jz":"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","buick":"https://support.haltech.com/portal/en/kb/articles/holden-buick-v6-ecotec","rb":"https://support.haltech.com/portal/en/kb/articles/rb-engine","ign":"https://support.haltech.com/portal/en/kb/articles/internal-igniter-or-not","mode":"https://support.haltech.com/portal/en/kb/articles/ignition-system","speed":"https://wiki.rusefi.com/Speed-Density/","triggers":"https://wiki.rusefi.com/All-Supported-Triggers/","mini":"https://wiki.rusefi.com/Hardware-microRusEFI-wiring/","proteus":"https://wiki.rusefi.com/Proteus-Manual/","volvo":"https://archive.breakfast.institute/breakfastmotorsport/Volvo_B230FT_sensors_and_actuators_for_use_with_a_stand-alone_ECU/src/commit/e30afeebcc2b2a6aebb0a3671f76966a31b85755","maz":"https://support.haltech.com/portal/en/kb/articles/ej20-engine","focus":"https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl","hondaK":"https://support.haltech.com/portal/en/kb/articles/thomas-te"};
const rules=[["LS Gen III 24X","Chevrolet / GM",null,{"coil":"smart","layout":"cop","air":"both","cam":"fixed","fuelPort":true},"https://support.haltech.com/portal/en/kb/articles/ls1-engine","GM LS Gen III LS1 reference; sibling engine/harness differences remain."],["LS Gen IV 58X","Chevrolet / GM",null,{"coil":"smart","layout":"cop","air":"both","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine","GM Gen IV typical factory coil and load topology; verify the individual donor."],["LS2 transitional","Chevrolet / GM",null,{"coil":"smart","layout":"cop","air":"both"},"https://support.haltech.com/portal/en/kb/articles/ls2-ls3-gen-4-engine","Transitional LS2 24X and 58X equipment varies."],["M50","BMW",null,{"coil":"dumb","layout":"cop","air":"maf","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/m50-engine","M50 non-TU: passive coils and MAF; TU has switched intake VANOS."],["M50","BMW","M50B25TU",{"cam":"switched"},"https://support.haltech.com/portal/en/kb/articles/m50-engine","M50TU switched intake VANOS."],["M54","BMW",null,{"coil":"dumb","layout":"cop","air":"maf","cam":"dual"},"https://bmwtuning.co/wp-content/uploads/2023/08/BMW-M54-Training-Doc.pdf","BMW M54 passive coils and double VANOS; crank/cam phase remains unvalidated on Brick."],["1.8T","Volkswagen / Audi",null,{"air":"maf"},"https://support.haltech.com/portal/en/kb/articles/1-8-turbo-20v","Factory MAF and charge-pressure information are NOT evidence of an OEM manifold MAP sensor."],["1.8T","Volkswagen / Audi","AEB 1.8T",{"coil":"external-multi","layout":"cop","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/1-8-turbo-20v","Early AEB external ignition power stage; confirm installed module and coil part."],["1.8T","Volkswagen / Audi","ATW 1.8T",{"cam":"switched"},"https://support.haltech.com/portal/en/kb/articles/1-8-turbo-20v","Cam phaser and ignition variant may differ; coil type intentionally unassigned."],["K20 port-injected","Honda",null,{"coil":"smart","layout":"cop","air":"map","cam":"single"},"https://support.haltech.com/portal/en/kb/articles/thomas-te","Honda K-series factory COP with internal igniters, MAP and intake VTC; check exact donor."],["K24 port-injected","Honda",null,{"coil":"smart","layout":"cop","air":"map","cam":"single"},"https://support.haltech.com/portal/en/kb/articles/thomas-te","K20 source supplies family-level evidence; K24 connector and cam variations require checking."],["Distributor-era Honda","Honda",null,{"coil":"external-single","layout":"distributor","air":"map","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/b-series","Honda B-series source directly verifies distributor and MAP; D/H variant fit requires own service reference."],["A-series 4A-G","Toyota","4A-GE 16V 24+1 distributor",{"coil":"external-single","layout":"distributor","air":"mixed","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/4ag-engine","4A-GE 16V original equipment differs between USDM vane MAF and JDM MAP; no single universal stock load."],["A-series 4A-G","Toyota","4A-GE 20V Silvertop",{"coil":"external-single","layout":"distributor","air":"maf","cam":"switched","itb":true},"https://support.haltech.com/portal/en/kb/articles/4ag-engine","Factory vane MAF with individual throttle bodies; MAP conversion needs stable load signal."],["A-series 4A-G","Toyota","4A-GE 20V Blacktop",{"coil":"external-single","layout":"distributor","air":"map","cam":"switched","itb":true},"https://support.haltech.com/portal/en/kb/articles/4ag-engine","Factory MAP with individual throttle bodies; Alpha-N or hybrid strategy may be useful."],["A-series 4A-G","Toyota","4A-GZE supercharged",{"coil":"external-multi","layout":"wasted","air":"mixed","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/4ag-engine","Bigport and smallport 4A-GZE split MAF vs MAP; factory wasted-spark with ignition module."],["S-series 3S","Toyota","3S-GTE Gen 1–3 distributor",{"coil":"external-single","layout":"distributor","air":"mixed","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/3sg-engine","3S-GTE Gen1–2 MAF but Gen3 MAP; one record spans distinctly different engines."],["S-series 3S","Toyota","3S-GTE Gen 4–5 coil-on-plug",{"coil":"smart","layout":"cop","air":"map","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/3sg-engine","3S-GTE late direct-fire factory smart coils and manifold MAP."],["S-series 3S","Toyota","3S-GE BEAMS Redtop",{"coil":"smart","layout":"cop","cam":"single","air":"unknown"},"https://support.haltech.com/portal/en/kb/articles/3sg-engine","BEAMS Redtop single VVT-i; both cam pickups are VR, requiring separate conditioning assessment."],["S-series 3S","Toyota","3S-GE BEAMS Blacktop",{"coil":"smart","layout":"cop","cam":"dual","air":"unknown"},"https://support.haltech.com/portal/en/kb/articles/3sg-engine","BEAMS Blacktop dual VVT-i; three VR pickups (crank plus both cam)."],["JZ non-VVT-i","Toyota","1JZ-GTE non-VVT-i",{"air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","JZ-GTE engine family MAP reference."],["JZ non-VVT-i","Toyota","2JZ-GTE non-VVT-i",{"air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","JZ-GTE engine family MAP reference."],["JZ VVT-i","Toyota","1JZ-GTE VVT-i",{"air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","JZ-GTE engine family MAP reference."],["JZ VVT-i","Toyota","2JZ-GTE VVT-i",{"air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","JZ-GTE engine family MAP reference."],["Buick 3800 V6","Chevrolet / GM",null,{"coil":"external-multi","layout":"wasted","air":"maf"},"https://support.haltech.com/portal/en/kb/articles/holden-buick-v6-ecotec","The source covers Holden/Buick V6 modules and market differences; verify L-series variant, bypass and OEM sensors."],["Redblock","Volvo","B230FT LH2.4 / EZK",{"coil":"external-single","layout":"distributor","air":"maf","cam":"fixed"},"https://archive.breakfast.institute/breakfastmotorsport/Volvo_B230FT_sensors_and_actuators_for_use_with_a_stand-alone_ECU/src/commit/e30afeebcc2b2a6aebb0a3671f76966a31b85755","Late LH2.4/EZK B230FT configuration; do not apply to earlier LH2.2."],["KA / CA / RB","Nissan","RB20DET optical CAS",{"coil":"external-multi","layout":"cop","air":"maf"},"https://support.haltech.com/portal/en/kb/articles/rb-engine","Older RB factory external igniters; the original high-resolution Nissan optical CAS needs alternate trigger validation."],["High-resolution optical CAS","Nissan","RB25DET OEM CAS",{"air":"maf"},"https://support.haltech.com/portal/en/kb/articles/rb-engine","Early RB25 has external igniter; later RB25 Series 2 may use smart coils, so factory ignition type is unassigned."],["High-resolution optical CAS","Nissan","RB26DETT OEM CAS",{"air":"maf"},"https://support.haltech.com/portal/en/kb/articles/rb-engine","RB OEM Nissan optical CAS unverified on rusEFI; coil ignition changes by generation."],["Zetec-E / Lima / ST","Ford","Zetec-E 2.0 early no VCT",{"cam":"fixed","air":"maf"},"https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl","Zetec-E generation-specific wiring needed; do not confuse Duratec engines."],["Zetec-E / Lima / ST","Ford","Zetec-E 2.0 later VCT",{"cam":"single","air":"maf"},"https://support.haltech.com/portal/en/kb/articles/duratec-zeta-2-0l-4-cyl","Zetec exhaust VCT variant needs exact cam signal identification."],["JZ non-VVT-i","Toyota","1JZ-GTE non-VVT-i",{"coil":"external-multi","layout":"cop","cam":"fixed","air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","Factory non-VVTi turbo JZ COP with external power stage; six individual ignition signals. MAP reference may differ by chassis/year."],["JZ non-VVT-i","Toyota","2JZ-GTE non-VVT-i",{"coil":"external-multi","layout":"cop","cam":"fixed","air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","Factory non-VVTi turbo JZ COP with external power stage. Verify sensor scale and coil model."],["JZ non-VVT-i","Toyota","2JZ-GE non-VVT-i distributor variant",{"coil":"external-single","layout":"distributor","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","Source confirms factory distributor and single igniter architecture; baseline timing and rotor phasing must be checked."],["JZ VVT-i","Toyota","1JZ-GTE VVT-i",{"coil":"external-multi","layout":"wasted","cam":"single","air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","Factory VVT-i turbo JZ uses three wasted-spark ignition commands through an external igniter; different from non-VVTi COP."],["JZ VVT-i","Toyota","2JZ-GTE VVT-i",{"coil":"external-multi","layout":"wasted","cam":"single","air":"map"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","Factory VVT-i turbo JZ uses three wasted-spark ignition commands through an external igniter; different from non-VVTi COP."],["JZ VVT-i","Toyota","2JZ-GE VVT-i",{"coil":"external-multi","layout":"wasted","cam":"single"},"https://support.haltech.com/portal/en/kb/articles/2jz-1jz-engine","Factory 2JZ-GE VVT-i wasted spark per family reference; exact module and air-load sensor unverified."],["KA / CA / RB","Nissan","KA24DE 2.4 optical CAS",{"coil":"external-single","layout":"distributor","air":"maf","cam":"fixed"},"https://support.haltech.com/portal/en/kb/articles/ka24de","S13 KA24DE factory single passive coil with external igniter and no manifold MAP; verify exact KA year before copying wiring."]];
const weights={trigger:25,injectors:15,ignitionIO:14,coilDriver:14,camVvt:14,airLoad:8,fueling:10};
const names={trigger:"Crank trigger + decoder",injectors:"Injector channels vs outputs",ignitionIO:"Coil count vs ignition I/O",coilDriver:"Coil type + power stage",camVvt:"Cam sync + VVT wheel",airLoad:"Stock MAP / MAF + load",fueling:"Port injection vs GDI"};
const note={
 big:"Big Brick (user-stated): up to 8-cylinder sequential fuel/spark; up to 12-cylinder batch fuel and sequential spark; 12 5 V smart ignition signals, and six IGBT dumb-coil channels SHARED with its 16 low-side outputs (not 16+6).",
 mini:"Mini Brick (user-stated): 4 ignition signals, 4 dedicated injector channels plus 3 high-current low sides that can serve injectors subject to firmware/output allocation; 6 cylinders planned for wasted spark, not six independent coil channels. Native high-current ignition drive is NOT confirmed."
};
function ruleMatches(r,e){return r[0]===e.family&&r[1]===e.make&&(!r[2]||r[2]===e.model);}
function model(e){
 const m={coil:"unknown",layout:"unknown",air:"unknown",cam:"unknown",itb:false,refs:{},notes:[],sourceLevel:{}};
 for(const rule of rules){if(!ruleMatches(rule,e))continue;
   for(const [k,v] of Object.entries(rule[3])){m[k]=v;m.refs[k]=rule[4];m.sourceLevel[k]=rule[2]?"engine-variant external reference":"engine-family external reference";}
   m.notes.push(rule[5]);
 }
 if(m.cam==="unknown"){
   const s=(e.model+" "+e.family+" "+(e.notes||"")).toLowerCase();
   if(/non.vvt|non.vct|fixed cam|no vvt|without vvt/.test(s))m.cam="fixed";
   else if(/quad.cam|ti.vct|coyote/.test(s))m.cam="quad";
   else if(/dual vvt|double vanos|double vvt|dual avcs|dual cam vvt/.test(s))m.cam="dual";
   else if(/vvt|vanos|mivec|avcs|vct|variable intake cam|cam phas/i.test(s))m.cam="single";
   if(m.cam!=="unknown"){m.sourceLevel.cam="textual lead only, not verified";m.notes.push("Cam/VVT classification also uses existing notes; actual cam wheel, control mode and sensor count must be verified.");}
 }
 // Do NOT infer a factory MAP sensor from 'boost', generic 5 V inputs, or a charge-pressure sensor.
 const fuel=String(e.fuel||"");
 m.gdi=/direct\s*(?:\+|and|injection)|\bGDI\b|\bFSI\b|\bTSI\b|\bTFSI\b|D-4S|\bDIT\b/i.test(fuel);
 m.rotary=e.cyl===0;
 m.optical=/Nissan/i.test(e.make)&&/optical\s+CAS|high.resolution optical CAS|360.slot optical/i.test(e.model+" "+e.crank+" "+e.notes);
 m.broken=e.level==="blocked"&&!m.gdi&&!m.rotary&&!m.optical||/broken decoder/i.test(e.notes||"");
 const r=e.research||{};
 m.extraVR=/3 VR|three VR|two VR cam|2 VR cam|VR crank \+ two VR|VR crank.*both.*cam|both VR cams|crank plus two cam VR|crank and two VR cam|two native VR/i.test([e.notes,r.electrical,r.remaining].join(" "));
 if(m.layout==="unknown"&&!m.gdi&&!m.rotary){m.notes.push("Factory coil topology/count not source-confirmed: coil-channel result below is conditional, not a statement of actual coils.");}
 return m;
}
function layer(key,value,state,detail,required,refs){return {id:key,label:names[key],score:Math.max(0,Math.min(100,Math.round(value))),state,detail,required,refs:[...new Set(refs||[])]};}
function calc(e,m,ecu){
 const big=ecu==="big",n=e.cyl,ranked=[],isPort=!m.gdi&&!m.rotary;
 const log=(...x)=>ranked.push(layer(...x));
 const ref=[...(e.research?.sources||[]),...(e.sources||[])].find(u=>/haltech|rusefi/.test(u))||sources.triggers;
 if(m.optical)log("trigger",0,"Unsupported stock trigger","Factory Nissan high-resolution optical CAS does not have verified native rusEFI decoder.","Validated replacement trigger and proven synchronization required.",[sources.triggers]);
 else if(m.broken)log("trigger",0,"Decoder warning","Firmware/trigger decoding is marked unsupported or problematic for this stock application.","Change trigger hardware or establish supported decoder with logs.",[sources.triggers]);
 else{
   const status=e.level==="named"?"Named decoder":e.level==="pattern"?"Physical-wheel candidate":"Not established";
   let v=e.level==="named"?77:e.level==="pattern"?62:29;
   if((e.research?.status||"")==="decoder-only")v=Math.min(v,42);
   if(/family-wheel-sourced/.test(e.research?.status||""))v=Math.min(v,65);
   if(m.gdi&&e.level==="blocked")v=35;
   if(/timing wander/i.test(e.notes||""))v=Math.min(v,45); // GDI blocks fueling, not automatically trigger geometry.
   log("trigger",v,status,e.crank+"; "+(e.research?.decoderCorrelation||"decoder correlation unverified"),
       "Confirm exact crank waveform, sensor supply/edge, menu selection, cranking sync and fixed ignition timing.",[ref,sources.triggers]);
 }
 if(m.rotary){log("injectors",0,"Architecture unvalidated","Rotary fuel schedule and staged port-injection architecture not evaluated by piston-cylinder output math.","Document rotor-specific firmware control first.",[sources.triggers]);}
 else if(m.gdi){log("injectors",0,"Native GDI blocked","High-pressure OEM DI injectors are not equivalent to low-side port injector channels.","Big: external driver would be experimental; Mini: no GDI software.",[]);}
 else if(n>12){log("injectors",0,"Insufficient modeled capacity",n+" cylinders exceed catalog's maximum supported engine scope.","External system or redesign required.",[]);}
 else if(big){
   const sequential=n<=8,required=sequential?"Sequential candidate":"Batch-only candidate";
   log("injectors",sequential?80:49,"Count-based, unverified",n+" port injectors modeled (ONE per cylinder, not OEM count verified); 16 total low-side outputs with other uses competing. "+required+".", "Confirm real injector count, impedance/current, drivers, battery offset and shared low-side budget.",[]);
 }else if(n<=4){
   log("injectors",82,"Dedicated channels, count assumption",n+" port injectors modeled; Mini has four dedicated injector outputs (plus three separately allocated high-current low-side channels).","Verify actual injector count, impedance and setup; reserve outputs for VVT and auxiliaries.",[]);
 }else if(n<=6){
   log("injectors",55,"Conditional extra channels",n+" injectors modeled; Mini only has FOUR dedicated injector outputs. Up to three separate high-current low-side channels may be assigned as injector outputs subject to actual firmware and electrical limits.","Six-cylinder sequential fueling is NOT assumed supported until two additional channels and scheduling are verified; batch-mode alternative requires validation.",[]);
 }else {
   log("injectors",0,"Output capacity excluded",n+"-cylinder factory fuel control exceeds Mini's intended engine scope.","Mini not designed for this engine count.",[]);
 }
 const coilDescription={
 smart:"OEM smart coils with internal igniters",
 dumb:"OEM passive/dumb coils needing high-current ignition stages",
 "external-multi":"Coils driven through an external multi-channel igniter/power stage",
 "external-single":"Single distributor coil driven through an external or distributor-integrated igniter",
 unknown:"Coil type/power stage unresolved"
 };
 const layout=m.layout;
 const required=layout==="distributor"?1:layout==="wasted"?Math.ceil(n/2):layout==="cop"?n:null;
 const maxIgn=big?12:4;
 if(m.rotary){log("ignitionIO",0,"Rotary scheduling unvalidated","Leading/trailing ignition events are not equivalent to a cylinder-count coil calculation.","Confirm native rotary ignition firmware and rotor timing.",[]);}
 else if(required===null){
  const caution=n>maxIgn?"If factory COP, "+n+" separate outputs would exceed "+maxIgn+" signals.":"If factory COP, "+n+" signals would fit by raw count.";
  log("ignitionIO",n>maxIgn?30:51,"Actual coil count unknown",caution+" Factory layout must be documented before a pass can be claimed.","Identify OEM coil count and actual firing strategy, then check independent scheduling/driver allocation.",[sources.mode]);
 } else if(required>maxIgn){
  log("ignitionIO",big?0:17,"Factory topology exceeds outputs",layout+" ignition requires "+required+" signals while "+(big?"Big":"Mini")+" provides "+maxIgn+" compatible smart-output signals (not high-current guarantees).","Aftermarket wasted spark or external sequencing needs specific firmware and hardware verification.",[sources.mode,m.refs.coil].filter(Boolean));
 }else{
  const score=m.sourceLevel.coil?.startsWith("engine-variant")?92:83;
  log("ignitionIO",score,"Count fits; topology reference",layout+" topology uses "+required+" ignition output"+(required===1?"":"s")+", within "+maxIgn+" signal outputs.","Confirm coil part number, active edge, firmware firing order and real output assignment.",[sources.mode,m.refs.coil].filter(Boolean));
 }
 if(m.rotary){log("coilDriver",0,"Rotary timing not validated","Leading/trailing rotor ignition and coil drive unvalidated.","Do not use ordinary 4-stroke dwell assumptions.",[]);}
 else{
  const type=m.coil,desc=coilDescription[type],base=type==="smart"?95:type==="external-multi"?83:type==="external-single"?76:type==="dumb"?(big?(n<=6?83:24):8):32;
  let extra="";
  if(type==="dumb"){
    extra=big?"Big has six user-specified IGBT ignition-capable channels, SHARED with its sixteen low-side outputs. "+(n>6?"Factory COP for >6 cylinders exceeds these six IGBT power stages.":"Individual power-stage loading and output sharing still need validation.")
       :"Mini's four ignition signals have NOT been confirmed as high-current IGBT stages: factory dumb coils need verified external igniters.";
  } else if(type==="external-single"){
    extra="One ECU ignition signal can be enough through the original igniter. Baseline timing may be harder on adjustable-distributor engines: set locked timing with a timing light, check distributor pickup phase and rotor alignment.";
  }else if(type==="smart")extra="Use 5 V logic-compatible smart coil commands; coil dwell, signal polarity and input current still require exact part verification.";
  else if(type==="external-multi")extra="The igniter powers the coils; confirm signal voltage, dwell polarity, channel count and module compatibility.";
  else extra="Do not infer igniter from connector pin count; OEM 3-wire coils can still be dumb.";
  log("coilDriver",base,type==="unknown"?"Unknown driver":type==="dumb"&&!big?"Mini lacks verified power stage":m.sourceLevel.coil||"Architecture referenced",desc+". "+extra,"Verify exact coil and igniter part numbers plus electrical compatibility before wiring.",[m.refs.coil,sources.ign].filter(Boolean));
 }
 const camStatus=m.cam;const camRefs=[m.refs.cam].filter(Boolean);
 let cv=camStatus==="fixed"?76:camStatus==="switched"?73:camStatus==="single"?61:camStatus==="dual"?46:camStatus==="quad"?39:34;
 let cState=camStatus==="unknown"?"Cam/VVT unresolved":m.sourceLevel.cam||"Variable-cam family lead";
 let cDetail={fixed:"No continuous VVT asserted; phase input may still be required for sequential injection/ignition.",
 switched:"On/off cam actuation is distinct from continuous feedback VVT; exact command output and cam phase remain to verify.",
 single:"One continuously variable cam bank inferred or referenced; exact cam wheel and control method not validated.",
 dual:"Two cam actuators/sensors may need separate input and output assignments; exact wheel mode unknown.",
 quad:"Four cam actuators and their phase pickups require separate signal routing and closed-loop firmware verification.",
 unknown:"No verified exact cam/home wheel or VVT control requirement for this model/year."}[camStatus];
 if(m.extraVR){cv=Math.min(cv,21);cState="Native VR input constraint";cDetail+=" Existing reference indicates crank + TWO VR cams (3 VR channels) vs TWO native Brick VR inputs; third channel needs proven external conditioner and firmware-readable input.";}
 if(!big&&camStatus==="quad")cv=Math.min(cv,21);
 if(/cam sensor|cam input|home/i.test(e.cam||"")&&/unverified|unknown|needs/i.test(e.cam||""))cv=Math.min(cv,40);
 log("camVvt",cv,cState,cDetail,"Scope actual cam tooth geometry and phase, decode 720-degree sync, confirm VVT solenoid count/current and closed-loop feedback.",[...camRefs,ref,sources.triggers]);
 const airNotes={
 map:"Factory manifold MAP is documented: preferred for speed-density tuning, PROVIDED sensor scale and boost range are suitable.",
 both:"Factory MAP and MAF are documented: MAP can be selected for rusEFI speed-density; confirm the actual stock MAP range.",
 maf:"Factory MAF identified, but no established stock MANIFOLD MAP for this particular variant: speed-density requires a suitable separate manifold MAP sensor (and IAT). MAF or Alpha-N also possible.",
 mixed:"Different stock variants use MAF vs MAP. Exact engine-year or market must be known before choosing a load source.",
 unknown:"Neither factory manifold MAP nor MAF status has sufficient variant-specific evidence. No bonus for unknown sensor equipment."
 };
 let airScore=m.air==="both"?94:m.air==="map"?92:m.air==="maf"?53:m.air==="mixed"?43:32;
 if(m.itb&&m.air==="map"){airScore=79;airNotes.map+=" Individual throttle bodies can cause low/misaligned vacuum; consider validated Alpha-N/hybrid if MAP signal is unsuitable.";}
 log("airLoad",airScore,m.air==="unknown"?"Factory load sensor unverified":m.sourceLevel.air||"Family/reference only",airNotes[m.air],"Document factory load sensor and transfer function. MAP is an external 0–5 V input on Brick; no onboard manifold MAP sensor is claimed.",[m.refs.air,sources.speed].filter(Boolean));
 if(m.rotary)log("fueling",0,"Rotary architecture unvalidated","Port fuel injectors alone do not establish rotary rotary injection or ignition schedules.","Verify rotary-specific firmware capabilities before making support claims.",[sources.triggers]);
 else if(m.gdi)log("fueling",0,"OEM GDI unsupported","Factory high-pressure direct injection, including hybrid port+GDI, is NOT plug-and-play on Brick.","Big Brick: external dedicated GDI control path untested/experimental. Mini Brick: no GDI control software.",[]);
 else log("fueling",92,"Port injection by catalog", "Engine catalog lists port injection; suitable for low-side port drivers in principle. Injector impedance and fuel-system data are still unverified.","Confirm injector count, impedance, voltage/current limits, fuel pressure, flow/deadtime, and rail pressure strategy.",[]);
 const sum=ranked.reduce((t,v)=>t+v.score*weights[v.id],0)/100;
 let score=Math.min(79,Math.round(sum)), block=[];
 if(m.gdi)block.push("Stock GDI/combined DI fueling is not validated; no native stock-fuel system support.");
 if(m.optical||m.broken)block.push("Factory trigger has no established supported native decoding.");
 if(m.rotary)block.push("Rotary fuel/ignition firmware behavior not validated.");
 if(!big&&n>6)block.push("Mini Brick is not designed for more than six cylinders.");
 if(big&&n>12)block.push("Big Brick engine cylinder capacity exceeds the documented 12-cylinder batch ceiling.");
 if(!big&&m.coil==="dumb"){score=Math.min(score,14);block.push("Mini Brick does not have a verified native dumb-coil power stage; external igniters required.");}
 if(!big&&n===6&&m.layout==="cop")score=Math.min(score,35);
 if(big&&m.coil==="dumb"&&n>6){score=Math.min(score,34);block.push("More than six dumb COP coils exceed Big Brick's six native IGBT ignition channels.");}
 if(m.extraVR)score=Math.min(score,60);
 if(/timing wander/i.test(e.notes||""))score=Math.min(score,63);
 if(block.some(s=>/GDI|trigger|Rotary|more than six cylinders|cylinder capacity/.test(s)))score=0;
 return {ecu,score,weightedUncapped:Math.round(sum),hardBlocks:block,layers:ranked,
   grade:score===0?"Not native-ready":score<40?"Major redesign / evidence gaps":score<60?"Conditional research candidate":"Promising but untested",
   hardware:big?note.big:note.mini};
}
for(const e of items){const m=model(e);e.confidenceV2={version:"2.0",reviewed:"2026-11-03",model:{
  coilType:m.coil,ignitionLayout:m.layout,factoryLoadSensor:m.air,vvtClass:m.cam,sourceKinds:m.sourceLevel,
  notes:m.notes,stockGDI:m.gdi,rotary:m.rotary,stockOpticalCAS:m.optical,extraNativeVRNeeded:m.extraVR
 },big:calc(e,m,"big"),mini:calc(e,m,"mini"),weights,names,sourceLinks:sources,
 disclaimer:"Engine-specific engineering screening scores, NOT probabilities and NOT proven installation compatibility. Unknown means no evidence, not verified absence. No Brick ECU engine test is on record."};
}
})();