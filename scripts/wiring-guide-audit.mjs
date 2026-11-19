#!/usr/bin/env node
// Verify the wiring guide has discoverable, device-specific explanations.
// This is a source integrity test, not electrical certification.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const guide=fs.readFileSync(path.join(root,'docs/engine-setup.html'),'utf8');
const pinout=fs.readFileSync(path.join(root,'docs/big-brick-pinout.html'),'utf8');
const css=fs.readFileSync(path.join(root,'docs/pinout-theme.css'),'utf8');
const errors=[];
function check(test,reason){if(!test)errors.push(reason);}
const legendStart=guide.indexOf('<section class="connector-legend" id="connector-legend"');
const legendEnd=guide.indexOf('<div class="chapter-break" id="chapter-foundation"',legendStart);
check(legendStart!==-1&&legendEnd>legendStart,'Terminal-name guide section missing');
const legend=legendStart>=0&&legendEnd>legendStart?guide.slice(legendStart,legendEnd):'';
const aliases=(legend.match(/<tr>/g)||[]).length;
const topics=(legend.match(/<details class="connector-alias-group"/g)||[]).length;
const walks=(guide.match(/<details class="wire-breakdown"/g)||[]).length;
check(topics>=4,'Expected four common-label reference categories');
check(aliases>=32,'Expected at least 32 terminal-name mappings');
check(walks>=17,'Expected at least 17 detailed diagram walkthroughs');
for(const label of ['APP1','PPS1','VPA1','APP2','TPS1','TPS2','ETB+','IGT','IGF','COIL−','AT1','CKP','VR+','CAN-H','CAN-L','H−','SGND','KEY','VIN']){
 check(legend.includes(label),'Missing label: '+label);
}
for(const id of ['power','pressure-sensors','clt-iat','bosch-lsu49','throttle','position','ignition','injectors','fuel-fan-relays','vvt','can-bus-wiring','flex-fuel-wiring','boost-control-wiring','electronic-wastegate-wiring','switch-inputs']){
 check(guide.includes('id="'+id+'"'),'Missing existing chapter: '+id);
}
check(guide.includes('manufacturer\'s connector drawing'),'Missing manufacturer connector warning');
check(guide.includes('wire color'),'Missing wire-color caveat');
check(guide.includes('not universal definitions'),'Missing label-ambiguity caveat');
check(guide.includes('id="how-to-read-diagrams"'),'Missing explanation of diagrams');
check(guide.includes('AV1–AV11'),'Missing confirmed eleventh analog input');
check(guide.includes('Bosch LSU 4.9')&&legend.includes('specifically numbered LSU table'),'Missing explicit LSU sensor connector exception');
check(pinout.includes('href="engine-setup.html#connector-legend"'),'Pinout does not link to terminal legend');
check(pinout.includes('href="engine-setup.html#how-to-read-diagrams"'),'Pinout does not link to diagram guidance');
check(pinout.includes('class="pinout-guide-promo"'),'Prominent guide navigation missing from pinout');
check(css.includes('.pinout-guide-promo'),'Pinout guide navigation is unstyled');
check(pinout.includes('pinout-theme.css?v=20261119-wiring-guide'),'New stylesheet version not referenced');
check(guide.includes('.engine-guide .wire-breakdown')&&guide.includes('.engine-guide .connector-legend'),'Guide subcomponents not styled');
if(errors.length){console.error('Wiring guide audit FAILED:\n- '+errors.join('\n- '));process.exitCode=1;}
else console.log('Wiring guide audit OK: '+topics+' terminology groups, '+aliases+' name rows, '+walks+' diagram walkthroughs, pinout cross-links and caveats.');
