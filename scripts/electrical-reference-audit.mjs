#!/usr/bin/env node
// Source consistency check for Brick ECU board details; not electrical certification.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const guide=read('docs/engine-setup.html'), pins=read('docs/big-brick-pinout.html');
const hardware=read('docs/big-brick.html'), notes=read('docs/BOARD_ELECTRICAL_NOTES.md');
const errors=[], check=(test,message)=>{if(!test)errors.push(message);};
for(const [f,s] of [['guide',guide],['pinout',pins],['hardware',hardware],['design notes',notes]]){
  for(const part of ['4.7 kΩ','100 nF','2.2 kΩ','1 nF']){
    check(s.includes(part),f+': missing input RC '+part);
  }
}
for(const part of ['ISL9V3040D3ST-F085C','IFX9201SG','MAX9924UAUB','TLS115B0EJ']){
  check(guide.includes(part), 'Guide lacks '+part);
  check(pins.includes(part), 'Pinout lacks '+part);
  check(hardware.includes(part), 'Hardware page lacks '+part);
}
for(const part of ['STM32F767ZGT6','MKDV2GCL-ABF','B6B-PH-SM4-TB(LF)(SN)']){
  check(hardware.includes(part),'Hardware inventory lacks '+part);
  check(notes.includes(part),'Engineering reference lacks '+part);
}
check(hardware.includes('150 mA')&&pins.includes('150 mA')&&notes.includes('150 mA'),'Supplier-rated sensor supply output missing');
check(notes.includes('19 V continuous withstand')&&notes.includes('17 V'),'Unreconciled 17/19 V statements omitted');
check(hardware.includes('both 17 V and 19 V'),'Ambiguous withstand values must not be published as an agreed safe rating');
check(guide.includes('ground-pulled')&&pins.includes('ground-pulling'),'Digital inputs need ground-only signal caveat');
check(notes.includes('not a USB-C receptacle')||notes.includes('not a USB-C jack'),'JST USB connection identity not distinguished');
check(!/200 mA.*(?:per sensor|sensor rail|TLS115B0)|TLS115B0.*200 mA/i.test(hardware),'Incompatible 200 mA claim on public hardware page');
if(errors.length){console.error('Electrical reference audit failed:\n- '+errors.join('\n- '));process.exit(1);}
console.log('Electrical reference audit passed: input networks, component identities, 150 mA tracker limit, unsettled AV rating.');
