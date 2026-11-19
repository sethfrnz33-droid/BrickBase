#!/usr/bin/env node
// Verify the current Big Brick connector's complete, user-facing pin explanations.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const page=read('docs/big-brick-pinout.html');
const match=page.match(/<script>\s*(const data=[\s\S]*?)<\/script>/);
if(!match)throw Error('Pinout inline script not found');
const script=match[1];
new vm.Script(script); // Validate all JS, including browser event handlers.
const head=script.slice(0,script.indexOf('const pinUseToast='));
const api=vm.runInNewContext(head+'\n({data,groups,colors,shortFor,usageFor})',{}, {timeout:2000});
const {data,groups,colors,shortFor,usageFor}=api;
const errors=[];
const assert=(condition,message)=>{if(!condition)errors.push(message);};
assert(data.length===121,'Expected 121 physical cavities');
assert(new Set(data.map(p=>p.n)).size===121,'Cavity numbers are not unique');
assert(data.every(p=>p.n>=1&&p.n<=121),'Cavity number out of range');
const nc=[52,55,56,71,74,75];
assert(JSON.stringify(data.filter(p=>p.label==='NC').map(p=>p.n))===JSON.stringify(nc),'Six intentionally unconnected cavities do not match');
assert(data.filter(p=>/^IN-AV(?:[1-9]|10|11)$/.test(p.label)).length===11,'Expected AV1 through AV11');
assert(data.find(p=>p.n===14)?.label==='IN-AV11','AV11 must be pin 14');
assert(data.find(p=>p.n===4)?.label==='KEY','KEY must be pin 4');
assert(data.find(p=>p.n===5)?.label==='VIN','VIN must be pin 5');
assert(data.filter(p=>p.type==='igniter').length===8,'Expected eight included IGBT channels');
assert(data.filter(p=>p.type==='ignition').length===12,'Expected twelve ignition logic channels');
for(const pin of data){
 const brief=shortFor(pin),full=usageFor(pin);
 assert(typeof brief==='string'&&brief.length>=28,'Missing specific table description for pin '+pin.n);
 assert(typeof full==='string'&&full.length>=80,'Missing expanded explanation for pin '+pin.n);
 assert(!/unverified|legacy av11|eleventh.{0,30}unconfirmed/i.test(brief+' '+full),'Stale description at pin '+pin.n);
 assert(groups[pin.type]&&colors[pin.type],'Missing pin legend or color at '+pin.n);
}
for(const pathName of ['index.html','docs/big-brick.html','products/big-brick.html','docs/engine-setup.html']){
 const text=read(pathName);
 assert(!/AV1[–-]AV10|10 analog.voltage|10 available AV|Analog voltage<\/td><td>10|Analog voltage<\/dt><dd>10/i.test(text),'Stale 10-input specification in '+pathName);
}
assert(page.includes('pin-use-toast'),'No unobtrusive bottom pin information UI');
assert(page.includes('intentionally not connected (NC)'),'No public explanation of unused cavities');
assert(usageFor(data.find(p=>p.n===4)).includes('position-1'),'KEY purpose unclear');
assert(usageFor(data.find(p=>p.n===5)).includes('10 A'),'VIN fuse allowance unclear');
assert(usageFor(data.find(p=>p.n===14)).includes('eleven confirmed'),'AV11 explanation unclear');
if(errors.length){console.error('Big Brick pinout audit FAILED:\n- '+errors.join('\n- '));process.exit(1);}
console.log('Big Brick pinout audit OK: 121/121 explanations, 11 analog inputs, 6 NC cavities, valid inline JavaScript.');
