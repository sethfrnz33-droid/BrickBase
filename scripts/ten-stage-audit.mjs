#!/usr/bin/env node
// BrickOS/BrickBase public guide alignment: structural metadata, original website prose.
// This checks repository source; it does not certify tuning, hardware, or a live deployment.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const guide=read('docs/engine-setup.html');
const home=read('index.html');
const software=read('docs/software.html');
const map=read('docs/BRICKOS_TEN_STAGE_ALIGNMENT.md');
const expected=[
 'tour.configuration','tour.trigger','tour.base_tables','tour.reference','tour.starting',
 'tour.idle','tour.steady_fuel','tour.steady_spark','tour.full_power','tour.confirm'
];
const errors=[];
const test=(yes,reason)=>{if(!yes)errors.push(reason);};
const found=[...guide.matchAll(/<article class="brick-stage" id="brick-stage-(\d+)" data-brickos-node="([^"]+)" data-step="(\d+)"/g)]
 .map(m=>({anchor:Number(m[1]),node:m[2],step:Number(m[3])}));
test(found.length===10,'Expected exactly 10 distinct stage articles');
for(let i=0;i<10;i++){
 const row=found[i]||{};
 test(row.anchor===i+1&&row.step===i+1&&row.node===expected[i],'Wrong stage node/order at '+(i+1));
 test((guide.match(new RegExp('href="#brick-stage-'+(i+1)+'"','g'))||[]).length>=3,'Stage '+(i+1)+' missing mobile, desktop or shortcut links');
 test(map.includes(expected[i]),'Crosswalk missing '+expected[i]);
}
test(guide.indexOf('id="brick-ten-tour"')<guide.indexOf('id="connector-legend"'),'Ten-stage path should precede wiring legend');
test(guide.indexOf('id="connector-legend"')<guide.indexOf('id="chapter-foundation"'),'Wiring legend must precede wiring library');
for(const anchor of ['harness-plan','power','sensors','throttle','position','ignition','injectors','commission','can-flex-boost','switches']){
 test(guide.includes('id="'+anchor+'"'),'Missing essential wiring/reference section '+anchor);
}
test((guide.match(/<details class="wire-breakdown"/g)||[]).length===17,'Existing 17 wiring walkthroughs must be preserved');
test(guide.includes('11 analog-voltage inputs (AV1–AV11)'),'AV11 data removed from installation guidance');
test(guide.includes('Completing a stage doesn\'t prove')||guide.includes("Completing a stage doesn't prove"),'Missing calibration-validation caveat');
test(!/HP Academy|High Performance Academy|HPA|practical standalone tuning/i.test(guide),'Public website must not reproduce or market third-party course');
test(home.includes('engine-setup.html#brick-ten-tour'),'Homepage does not promote 10-stage guide');
test(software.includes('engine-setup.html#brick-ten-tour'),'Software page does not link 10-stage guide');
test(map.includes('original Brick ECU')&&map.includes('node identifiers and chapter order'),'Original-language policy missing from crosswalk');
if(errors.length){
 console.error('Ten-stage guide audit failed:\n- '+errors.join('\n- '));
 process.exit(1);
}
console.log('Ten-stage guide audit OK: ten ordered BrickOS IDs, original website stages, all navigation links and 17 wiring walkthroughs.');
