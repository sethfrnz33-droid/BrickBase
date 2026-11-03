/* Brick ECU developer results vs upstream rusEFI community references.
 * Sources are evidence of builds, NOT engine-specific wiring certification.
 * Loaded after engine-confidence-v2.js and before engine-finder.js.
 */
(()=>{
"use strict";
const records=Array.isArray(window.BRICK_ENGINE_PRESETS)?window.BRICK_ENGINE_PRESETS:[];
const rules=[{"models":["2JZ-GTE non-VVT-i"],"label":"2JZ-GTE non-VVT-i listed in rusEFI running-engine archive (2016)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Exact engine designation; original ECU hardware/wiring not necessarily Brick."},{"models":["M52B28"],"label":"BMW E36 328i M52B28 Turbo rusEFI example (2017)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Engine-family match; turbo hardware and donor electronics differ."},{"models":["B16A"],"label":"Honda CRX B16A rusEFI example (2017)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Named engine in rusEFI archive; vehicle wiring not transferable."},{"models":["B20B"],"label":"Honda CR-V B20 rusEFI example (2018)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"B20 family example; B20B/B20Z exact engine code not established."},{"models":["KA24DE 2.4 optical CAS"],"label":"1994 Nissan Altima KA24DE rusEFI example (2017)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Running report does not establish use of unmodified optical CAS; trigger conversion may have been used."},{"models":["B230FT LH2.4 / EZK"],"label":"Volvo 240 Turbo/B230 rusEFI examples (2017, 2019)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Family-level B230 evidence only; exact distributor/trigger parts depend on year."},{"models":["4A-GE 16V 24+1 distributor"],"label":"1986 MR2 with 4A-GE rusEFI example (2020)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"4A-GE family example; actual distributor tooth pattern not provided."},{"models":["1JZ-GTE non-VVT-i"],"label":"1JZ-GTE non-VVT-i in S13 with microRusEFI (2020)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Community example uses different ECU hardware; check exact coil and injector configuration."},{"models":["M42B18"],"label":"BMW M42-powered Opel Manta rusEFI example (2020)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Engine family indicated by swap description; actual sensor variant unknown."},{"models":["M111 2.0/2.3 four-cylinder"],"label":"Mercedes M111 supercharged 190E community build and separate daily-driver case study","source":"https://wiki.rusefi.com/Case-Studies/","scope":"M111 family; exact version and wiring are not supplied here."},{"models":["4B11T Evo X"],"label":"Evo X power-build example in rusEFI Case Studies","source":"https://wiki.rusefi.com/Case-Studies/","scope":"Case study; car and installed original sensors require separate confirmation."},{"models":["5.0 Gen I 2011–14"],"label":"Coyote running-video references in rusEFI Case Studies","source":"https://wiki.rusefi.com/Case-Studies/","scope":"Coyote generation is not identified; cannot imply Gen I-specific test."},{"models":["VQ35DE"],"label":"350Z rusEFI plug-and-play demonstration in Case Studies","source":"https://wiki.rusefi.com/Case-Studies/","scope":"350Z case-study engine version is not specified; VQ35DE-versus-HR hardware not established."},{"models":["LS1 5.7","LS3 6.2"],"label":"LS V8 and Camaro rusEFI case-study examples","source":"https://wiki.rusefi.com/Case-Studies/","scope":"LS family only, not confirmation of this exact engine generation or Brick wiring."},{"models":["4G63T 1G","4G63T 2G","4G63T Evo 4–8","4G63T Evo 9"],"label":"Mitsubishi 4G63 named in rusEFI archive and case studies","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"No factory 4G63 generation documented, so evidence is family-level only."},{"models":["AEB 1.8T","ATW 1.8T","AUG 1.8T","AWM 1.8T"],"label":"VW 1.8T DBW running-engine archive entry (2020)","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Exact engine code is not identified; applies to the 1.8T family, not each coil/trigger revision."},{"models":["B6 1.6 NA","BP 1.8 NA","BP 1.8 NB1","BP 1.8 NB2"],"label":"Multiple Mazda Miata rusEFI running-engine examples","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"Miata 1.6/1.8 NA/NB vehicles reported; individual trigger variants require matching actual build."},{"models":["Neon 2.0 1995-era","Neon 2.0 2003-era"],"label":"1995 bench and 2003 test-mule Neon entries","source":"https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/","scope":"The 1995 entry is marked BENCH ONLY; 2003 test mule is not proof of prolonged road operation."}];
const sourceList="https://wiki.rusefi.com/List-of-Engines-Running-rusEFI/";
const caseStudy="https://wiki.rusefi.com/Case-Studies/";
for(const e of records){
 const community=rules.filter(x=>x.models.includes(e.model)).map(x=>({type:"rusEFI community",label:x.label,url:x.source,scope:x.scope}));
 const bigVQ=e.make==="Nissan"&&e.model==="VQ35DE";
 const genIV=e.make==="Chevrolet / GM"&&e.family==="LS Gen IV 58X";
 e.runningEvidence={
   brickBig:bigVQ?{
     level:"engine-specific",
     label:"Running on Big Brick",
     description:"Brick ECU developer reports personally running VQ35DE successfully on Big Brick. Engine-year, coil hardware and tuning files have not been published.",
     source:"developer firsthand report · 2026-11-03",
     ecu:"Big Brick"
   }:null,
   brickFamily:genIV?{
     level:"family-only",
     label:"Big Brick-tested engine family",
     description:"Brick ECU developer reports successfully running a Gen IV LS engine on Big Brick. The exact LS engine code, vehicle year and configuration were not specified; this is NOT a separate test of every listed Gen IV variant.",
     source:"developer firsthand report · 2026-11-03",
     ecu:"Big Brick"
   }:null,
   community,
   listUrl:sourceList,
   casesUrl:caseStudy
 };
 if(bigVQ&&e.audit){e.audit.brickTested=true;e.audit.brickTestedScope="Big Brick only; developer firsthand report, 2026-11-03; hardware/wiring details not supplied";}
}
})();