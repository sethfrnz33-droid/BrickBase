/* Source-backed November 4, 2026 field research.
   These are donor/family technical references, never verified Brick ECU wiring, maps, or sync.
   Loaded after engine-finder-expansion.js and before engine-confidence-v2.js. */
(()=>{
"use strict";
const all=window.BRICK_ENGINE_PRESETS;
if(!Array.isArray(all))return;
const sources={
  hondaL:"https://support.haltech.com/portal/en/kb/articles/l-engine",
  hondaR:"https://support.haltech.com/portal/en/kb/articles/r18-engine",
  aaaMAF:"https://charm.li/Volkswagen/1995/Golf%20III%20%281H1%29%20V6-2.8L%20%28AAA%29/Repair%20and%20Diagnosis/Powertrain%20Management/Fuel%20Delivery%20and%20Air%20Induction/Locations/Air%20Cleaner%20Assembly/",
  aaaInjection:"https://charm.li/Volkswagen/1995/Jetta%20III%20%281H2%29%20V6-2.8L%20%28AAA%29/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Testing%20and%20Inspection/Scan%20Tool%20Testing%20and%20Procedures/Output%20Diagnostic%20Test%20Mode%20%28DTM%29%20%28Function%2003%29/",
  r32BFH:"https://australiancar.reviews/vw-mk-4-golf-r32-bfh-bml-ea390-vr6-engine/",
  r32BUB:"https://australiancar.reviews/vw-mk-5-golf-r32-bdb-bmj-bub-cbra-ea390-engine/",
  audiStages:"https://diagnostdata.com/audi/a6/c5-facelift-2001-2004/remont/ignition-system/ignitionglow-plug-system-27l-v6-biturbo-apb-bel/other/",
  audiBEL:"https://charm.li/Audi/2004/A6%20Quattro%20Wagon%20%284B5%29%20V6-2.7L%20Turbo%20%28BEL%29/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Ignition%20Coil/Testing%20and%20Inspection/With%20Generic%20Scan%20Tool/Ignition%20Coils%2C%20Checking/",
  audiCam:"https://charm.li/Audi/2001/S4%20Quattro%20Wagon%20%288D5%29%20V6-2.7L%20Turbo%20%28APB%29/Repair%20and%20Diagnosis/Engine%2C%20Cooling%20and%20Exhaust/Engine/Camshaft%2C%20Lifters%20and%20Push%20Rods/Camshaft/Service%20and%20Repair/",
  m104Crank:"https://charm.li/Mercedes%20Benz/1996/E%20320%20%28210.055%29%20L6-3.2L%20%28104.995%29/Repair%20and%20Diagnosis/Powertrain%20Management/Computers%20and%20Control%20Systems/Description%20and%20Operation/Input%20Signals%20for%20HFM%20SFI%2FIgnition%20System/",
  m104Family:"https://www.australiancar.reviews/mercedes-benz-m104-engine-1989-98/",
  m111:"https://charm.li/Mercedes%20Benz/1995/C%20220%20%28202.022%29%20L4-2.2L%20%28111.961%29/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Description%20and%20Operation/",
  mbIgnition:"https://charm.li/Mercedes%20Benz/2002/ML%20500%20%28163.175%29%20V8-5.0L%20%28113.965%29/Repair%20and%20Diagnosis/Powertrain%20Management/Ignition%20System/Description%20and%20Operation/ME-SFI%20Ignition%20System%20Function/",
  mbCam:"https://emdi.app/en/documents/ar1510p2000a",
  m113Sync:"https://lemon-manuals.org.ua/Mercedes%20Benz/2003/S430%20Base/Repair%20and%20Diagnosis%20%28Single%20Page%29/Engine%20Performance/Fuel%20Delivery/Mixture%20Formation%20--%20Basic%20Knowledge%20--%20215%20%26%20220%20Chassis%20-%202%20Of%202/Basic%20Knowledge/ME-SFI%20synchronization%20of%20fuel%20injection%20and%20firing%20order%2C%20function%20-%20GF07.61-P-4009/ME-SFI%20synchronization%20of%20fuel%20injection%20and%20firing%20order%2C%20function%20-%20GF07.61-P-4009SM/"
};
const updates={
 "new-honda-l-r-series-l15a-port-injection":{
  urls:[sources.hondaL],
  scope:"Haltech L-family source depicts L15A7 60-2 crank and three unequal cam teeth; these must not be assumed on every L15A/i-DSI engine.",
  crank:"L15A7 donor reference: 60-2 crank wheel using a powered Hall pickup. Confirm wheel on the specific L15A donor before a rusEFI selection.",
  cam:"L15A7 donor reference: three cam teeth of unequal sizes, Hall pickup. L15A1 uses switched VTEC; L15A7 i-VTEC has continuously variable intake cam timing.",
  electrical:"L15A7 technical reference describes powered Hall crank and cam sensors, individual coils with integrated igniters, factory manifold MAP and variable DBW/cable throttle by donor.",
  notes:"L15A covers different hardware: L15A1 VTEC and L15A7 i-VTEC do not have identical cam control; older i-DSI variants have dual plugs per cylinder. L15B7 turbo DI is a different unsupported fuel architecture.",
  status:"family-wheel-sourced",
  sensors:"L15A7 service reference: 60-2 Hall crank, unequal three-tooth Hall cam, manifold MAP. Confirm sensor supply/edges using the actual donor wiring and sync capture.",
  ignition:"L-series source shows per-cylinder coils with integrated igniters for its covered variants; older i-DSI dual-plug arrangements are excluded and must not inherit this claim.",
  injectors:"Four port-injection cylinders on the referenced L15A variants; exact injector part, resistance, current, fuel pressure, flow and deadtime remain unknown.",
  actuators:"L15A1 switched VTEC versus L15A7 variable intake cam: confirm donor. Electronic versus cable throttle and idle strategy also vary.",
  remaining:"Identify exact L15A suffix and year (especially L15A1 vs L15A7 vs i-DSI), capture crank/cam waveforms, correlate rusEFI decoder and trigger angle, verify coil logic/injector electricals, and publish Brick engine wiring and running logs."
 },
 "new-honda-l-r-series-r18a-1-8-i-vtec":{
  urls:[sources.hondaR],
  scope:"Haltech R18 family technical guide covers R18A1/A2 and related variants; cam sensor connector information is explicitly called unverified in its reference.",
  crank:"R18 family reference: 12 crank teeth plus one additional indexing tooth (NOT a 12-1 missing-tooth wheel), Hall CKP.",
  cam:"Hall cam phase sensor; SOHC R18 i-VTEC switches an economy cam lobe/valve action, not a continuously phased Honda K-series VTC cam.",
  electrical:"Haltech documents powered Hall CKP/CMP, four COP units with built-in igniters, factory MAP and MAF/IAT, and single electronic throttle. Its CMP wiring illustration is flagged unverified.",
  notes:"Do not substitute a generic 12-1 decoder for the R18 12+1 pattern. Factory i-VTEC is switched cam-lobe economy control; a matching rusEFI trigger/sync profile has not been validated on Brick.",
  status:"family-wheel-sourced",
  sensors:"Documented 12+1 Hall crank and Hall cam; OEM MAP and MAF with intake temperature in MAF. Confirm R18A1/A2 sensor connectors and measured signal levels.",
  ignition:"Four factory coil-on-plug assemblies with integrated power stages in the R18 family guide; verify exact installed part before specifying signal polarity or dwell.",
  injectors:"Four gasoline port injectors. The reference gives an example of 185 cc/min but does not establish the donor's actual injector part, resistance, pressure, or deadtime.",
  actuators:"Drive-by-wire throttle, switched economy-mode i-VTEC and variable intake runner system; electronic torque and idle behavior require independent setup validation.",
  remaining:"Confirm R18A1 versus R18A2 donor year, OEM Hall cam connector orientation (source calls it unverified), waveform and correct rusEFI decoder for 12+1, coil power stage, injector characterization, VTEC/DBW control, and real Brick sync and running logs."
 },
 "new-volkswagen-audi-vr6-aaa-2-8-vr6-12v":{
  urls:[sources.aaaMAF,sources.aaaInjection],
  scope:"1995 VW AAA Golf/Jetta factory repair references support OEM MAF and six fuel-injector channels; the crank-tooth geometry and ignition power stage are not established by these links.",
  cam:"Factory AAA camshaft position sensor G40 is documented in VW service material; target shape, sensor electrical requirements and synch edge still need checking.",
  electrical:"1995 AAA VW service references identify stock mass-airflow sensor G70 and six named port injectors N30–N33/N83/N84; confirm crank/cam and ignition stages by donor year.",
  notes:"OEM MAF and six fuel injectors are documented. Do not automatically assign a 60-2 wheel, distributor arrangement, or coil power-stage type without matching the specific AAA year.",
  sensors:"Factory air-cleaner service reference confirms MAF G70. Engine speed pickup G28 and cam G40 need donor-year scope, power and connector confirmation.",
  injectors:"Six OEM port injectors are separately identified in the 1995 AAA VW diagnostic test procedure; resistance, flow, pressure, injector latency and mapping remain unverified.",
  remaining:"Obtain the specific AAA donor year and factory CKP/CMP waveform, exact coil module stage, 1995-to-later harness differences, injector part/impedance/flow and Brick sync and running proof."
 },
 "new-volkswagen-audi-vr6-3-2-vr6-r32-bfh-bub":{
  urls:[sources.r32BFH,sources.r32BUB],
  scope:"Separate Mk4 BFH/BML and Mk5 BUB EA390 technical overviews support twin cam VVT, six port injectors and individual ignition coils; exact CKP/CMP patterns remain unsourced.",
  cam:"Documented continuously variable intake AND exhaust cam timing on BFH/Mk4 and BUB/Mk5 3.2 VR6; exact cam trigger geometry and phase mapping remain unknown.",
  electrical:"Mk4 and Mk5 R32 3.2 petrol: six individual coils, six sequential port injectors, drive-by-wire throttle, twin-path intake switching and dual cam VVT. Do not transfer ECU connector mappings across generations.",
  notes:"BFH (Mk4) and BUB (Mk5) use dual cam VVT, six separate coils and sequential multiport fuel injection; wheel pattern and coil internal igniter design still require service verification.",
  sensors:"Factory R32 dual cam actuators and electronic throttle require separate sensing/control. Crank/cam pickup type, supply, edge and wheel patterns remain unknown.",
  ignition:"Six individual coil assemblies are documented; internal power stages and native Brick interface are not verified.",
  injectors:"Six sequential port fuel injectors are documented; OEM injector resistance, deadtime, fuel pressure and electrical limits remain unknown.",
  actuators:"Both camshafts variable, electronic throttle and twin-path manifold actuator: reserve channels and verify control frequencies and feedback sensors per donor model.",
  remaining:"Separate BFH/BUB model and ECU, source crank/cam wheel and Hall/VR electrical data, verify both cam phase decoders and dwell, donor harness and injector parameters, then obtain Brick logs."
 },
 "new-volkswagen-audi-v6-2-7t-2-7t-apb-30v":{
  urls:[sources.audiStages,sources.audiCam],
  scope:"Audi C5 2.7T APB/BEL service description distinguishes APB external stages from BEL built-in stages; APB cam rotor is described in a separate APB OEM service page.",
  cam:"APB OEM service identifies a cam Hall sender and camshaft adjustment mechanism; exact phase target and bank synchronization need scope confirmation.",
  electrical:"APB has six individual passive coil primaries driven via separate bank power stages N122/N192. BEL uses integrated-stage coils; the wiring is not interchangeable.",
  notes:"APB uses two external ignition power stages (one per bank) for six COP units, unlike BEL's integrated-stage coils. Original stages may require a validated compatible ECU signal, not an assumed 5 V connection.",
  sensors:"Audi APB cam Hall sender rotor and cam adjuster are documented. Factory RPM reference wheel count, edge and bank phase remain unresolved.",
  ignition:"APB OEM: six coils, power transistors external in bank modules N122/N192. Validate stock module trigger signal and dwell or use a properly characterized alternative; do not classify APB coils as built-in smart.",
  injectors:"Audi 2.7T service reference identifies six port injectors; stock impedance, dwell/deadtime and duty-cycle behavior must still be sourced.",
  actuators:"Twin turbochargers, boost control and intake cam adjustment plus two-bank knock and lambda inputs require a donor-specific channel budget.",
  remaining:"Confirm APB engine-year crank wheel and VR/Hall conditioning, Hall cam edges, bank phase control, electrical logic needed by external N122/N192 power stages, OEM injector data and real Brick synchronization/logging."
 },
 "new-volkswagen-audi-v6-2-7t-2-7t-bel-30v":{
  urls:[sources.audiStages,sources.audiBEL],
  scope:"2004 A6 2.7T BEL factory coil test confirms each 4-pin coil includes its ignition power output stage. Other APB/BEL systems may differ by model year.",
  electrical:"BEL has six 4-pin individual coils with built-in output stages. APB instead uses two separate bank modules; do not copy APB ignition wiring into BEL.",
  notes:"BEL integrated-stage ignition coils are not electrically interchangeable with APB's external-module coils. Confirm cam/crank triggers and all donor sensors separately.",
  ignition:"BEL factory repair source confirms six individual coils with integrated ignition power stages. Verify donor pin functions, signal voltage and dwell before treating as 5 V logic-compatible.",
  injectors:"The OEM six-cylinder port fuel-injection system is documented; verify the actual BEL injector electrical specifications and deadtime.",
  actuators:"Boost regulation, electronic throttle/idle, camshaft adjusters and two-bank engine sensor interfaces depend on BEL year and ECU.",
  remaining:"Confirm BEL CKP wheel waveform and sensor supply, cam phase signals, actual 4-pin coil trigger levels, fuel injector current/data and Brick sync/integration logs."
 },
 "new-mercedes-benz-m104-m111-m112-m113-m104-3-2-inline-six":{
  urls:[sources.m104Crank,sources.m104Family],
  scope:"1996 Mercedes E320 104.995 HFM-SFI factory document establishes 60-2 flywheel CKP and Hall cam; early M104 KE/LH systems differ in ignition and fuel hardware.",
  crank:"1996 104.995 HFM-SFI: 60-2 crank flywheel pattern, variable-reluctance CKP alternating-voltage signal. Earlier M104 generations must be verified separately.",
  cam:"1996 HFM-SFI has camshaft Hall reference; M104 family includes switched intake cam adjustment. Exact 104.xxx suffix and phase wheel remain relevant.",
  electrical:"For 104.995 HFM-SFI, CKP is an unpowered reluctor on 60-2 flywheel and cam is Hall; the earlier CIS-E/LH distributor arrangements and later coil packs differ.",
  notes:"M104 3.2 is not one electrical variant: HFM-SFI 104.995 60-2 VR crank/Hall cam is service-documented, while early distributor/LH variants require their own ignition and injection assessment.",
  status:"family-wheel-sourced",
  sensors:"HFM-SFI 104.995 service shows a VR 60-2 flywheel CKP and Hall cam; it uses airflow metering. Earlier 104.xxx setups must be investigated individually.",
  ignition:"Early M104 CIS-E/LH versions use a distributor; later HFM versions use three two-spark coil modules. OEM primary coil power transistor and dwell require exact donor verification.",
  actuators:"Switched intake cam adjustment is documented on M104 family; original throttle and idle hardware differ among HFM, LH and early CIS-E.",
  remaining:"Split M104 by 104.xxx / HFM versus LH/CIS-E year before assigning crank and spark profile; validate wheel edge, cam sync, distributor vs paired coils, OEM injector hardware and Brick running data."
 },
 "new-mercedes-benz-m104-m111-m112-m113-m111-2-0-2-3-four-cylinder":{
  urls:[sources.m111,sources.mbIgnition],
  scope:"1995 C220 M111.961 factory ignition description documents HFM-SFI crank/cam use. A general ME-SFI ignition reference describes paired-spark engine 111 architecture.",
  cam:"1995 M111.961 HFM-SFI uses cam position to identify cylinder-one TDC; check the cam phase target and cam adjustment by exact M111 variant.",
  electrical:"1995 M111.961 HFM-SFI has CKP and cam position sensing and paired ignition coils; later ME and Kompressor models may change sensors and power stages.",
  notes:"M111.961 service shows sequential HFM-SFI ignition architecture; M111 Kompressor/ME versions must not inherit the 1995 donor's electrical assumptions.",
  sensors:"CKP and cam phase used by the 1995 M111.961 HFM system; exact CKP wheel count and Hall/VR sensor supply require further donor-year service data.",
  ignition:"Two spark/coil circuits serve four cylinders on 1995 HFM-era M111 (paired sparks); ignition output stage and coil driver polarity must be validated for the specific model.",
  actuators:"Camshaft adjustment, idle and throttle vary by 111.xxx, with extra supercharger controls on Kompressor variants.",
  remaining:"Split M111 donor as 111.xxx HFM or ME and Kompressor/non-Kompressor, obtain exact wheel and cam waveform, primary coil driver requirements, injector electricals and verified Brick running evidence."
 },
 "new-mercedes-benz-m104-m111-m112-m113-m112-3-2-v6":{
  urls:[sources.mbIgnition,sources.mbCam],
  scope:"Mercedes ME-SFI service explains M112/113 paired plugs/dual coil packs and cam Hall; it does not prove that the original power stages can be driven by Brick without adaptation.",
  cam:"Factory camshaft Hall sensor B6/1 documented for M112; phase wheel details and any exact model-year differences remain unverified.",
  electrical:"M112 uses six dual-spark ignition-coil packs (two individually controlled spark circuits per cylinder) and factory cam Hall phase sensing.",
  notes:"M112 has two plugs per cylinder and independently scheduled twin-spark events in its original ME-SFI system. Six dual coil packs do NOT establish a six-output direct ignition solution.",
  sensors:"Mercedes ME-SFI lists crank position sensor L5, cam Hall B6/1 and hot-film MAF B2/5; exact CKP wheel pattern needs an M112-specific donor record.",
  ignition:"Twelve spark plugs driven through six double-coil assemblies; original ECU can offset the two sparks per cylinder. Coil input stage, number of independent primary channels and timing strategy require evaluation.",
  injectors:"Six intake-port injection cylinders are represented in ME-SFI references; injector part/resistance/flow/deadtime still lack donor-specific evidence.",
  actuators:"Throttle/pedal and ancillary equipment should be matched to M112 suffix/model, not inferred from M113 documentation.",
  remaining:"Identify 112.xxx/year, CKP wheel geometry and Hall cam target, whether two spark circuits need twelve separately timed drivers, stock coil ignition-stage interface, OEM injector values and Brick test logs."
 },
 "new-mercedes-benz-m104-m111-m112-m113-m113-5-0-5-4-v8":{
  urls:[sources.mbIgnition,sources.m113Sync,sources.mbCam],
  scope:"Mercedes M113 113.965 ME-SFI and 113.986–989 service explain double coils, 60-2 VR crank, Hall cam and sequential injection; the 5.4 Kompressor donor differs.",
  crank:"M113.986–989 ME-SFI factory reference: 60-2 crank target sensed by a variable-reluctance alternating-voltage sensor; exact M113K configuration still donor-dependent.",
  cam:"Mercedes M113 ME-SFI synchronizes with cam Hall B6/1; actual target/phase edge must be confirmed on the engine.",
  electrical:"M113 uses eight dual ignition coil packs and two spark plugs per cylinder. ME-SFI can stagger each cylinder's two sparks; 113.986–989 crank is a 60-2 VR target.",
  notes:"Eight twin-spark packs require a specific ignition-channel and driver strategy; eight cylinders alone do not imply that eight 5 V outputs reproduce the OEM sixteen individually timed sparks.",
  status:"family-wheel-sourced",
  sensors:"M113.986–989 factory ME-SFI reference confirms 60-2 VR crank and Hall cam; hot-film MAF and electronic throttle present on the reference system.",
  ignition:"Eight double-coil assemblies serve sixteen plugs and stock ME-SFI independently schedules two primary events per cylinder. Driver electricals, output count and scheduling require verification.",
  injectors:"Eight port-fuel injectors are controlled by OEM ME-SFI; injector current and deadtime remain donor- and part-specific.",
  actuators:"Electronic throttle and model-dependent accessories; forced-induction and air-management differ for M113K versus naturally aspirated 5.0/5.4.",
  remaining:"Split naturally aspirated M113 from M113K and verify exact 113.xxx, 60-2 wheel, cam edge, independent twin-spark channels/driver supply, injection/actuation data, and Brick runtime evidence."
 }
};
for(const e of all){
  const u=updates[e.id];if(!u)continue;
  const r=e.research|| (e.research={});
  for(const key of ["crank","cam","notes"])if(typeof u[key]==="string")e[key]=u[key];
  for(const key of ["crank","cam"]){const k=key==="crank"?"crankWheel":"camWheel";if(u[key])r[k]=u[key];}
  for(const key of ["electrical","remaining","notes"])if(u[key])r[key]=u[key];
  if(u.status)r.status=u.status;
  r.checked="2026-11-04";
  const unique=[...new Set([...(e.sources||[]),...(r.sources||[]),...u.urls])];
  e.sources=[...new Set([...(e.sources||[]),...u.urls])];
  r.sources=unique;
  e.integration ||= {};
  for(const key of ["sensors","ignition","injectors","actuators"])if(u[key])e.integration[key]=u[key];
  e.integration.referenceScope="These technical sources cover named donor engines or engine families, never a verified Brick ECU connector assignment. "+u.scope;
  e.integration.validation=u.remaining+" Before claiming an installation, verify OEM signal wiring and trigger waveforms, ECU pin allocations, fixed timing, firmware sync and running logs.";
  e.references ||= [];
  for(const url of u.urls)if(!e.references.some(x=>x.url===url))e.references.push({
    url,label:"Engine service / technical reference",scope:u.scope
  });
  e.audit ||= {};
  e.audit.checked="2026-11-04";
  e.audit.researchStatus=r.status;
  e.audit.sourceCount=e.references.length;
  e.audit.pinoutVerified=false;
  e.audit.brickTested=false;
}
})();
