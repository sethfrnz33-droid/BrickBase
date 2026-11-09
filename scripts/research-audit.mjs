#!/usr/bin/env node
// Verify the exact engine research pipeline used by the public Engine Finder.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root=path.resolve(import.meta.dirname,'..','docs');
const scripts=[
 'engine-finder-data.js',
 'engine-finder-expansion.js',
 'engine-field-research-20261104.js',
 'engine-field-research-20261104-batch2.js',
 'engine-field-research-20261104-batch3.js',
 'engine-field-research-20261104-batch4.js',
 'engine-trigger-sensor-20261104.js',
 'engine-trigger-sensor-supplement-20261104.js',
 'engine-trigger-sensor-thirdpass-20261104.js',
 'engine-trigger-sensor-fourthpass-20261104.js',
 'engine-source-addendum-20261108.js',
 'engine-confidence-v2.js',
 'engine-research-goal-20261104.js'
];
const context=vm.createContext({window:{},console});
for(const script of scripts){
 const filename=path.join(root,script);
 vm.runInContext(fs.readFileSync(filename,'utf8'),context,{filename,timeout:3000});
}
const records=context.window.BRICK_ENGINE_PRESETS;
const summary=context.window.BRICK_ENGINE_RESEARCH_SUMMARY;
if(!Array.isArray(records)||records.length!==237)throw Error('Expected exactly 237 named engine records');
if(context.window.BRICK_ENGINE_ADDENDUM_COUNT!==4)throw Error('Expected four sourced engine addenda to apply');
const ids=new Set();
for(const r of records){
 if(ids.has(r.id))throw Error('Duplicate engine id: '+r.id);
 ids.add(r.id);
 if(!r.technicalResearch||r.technicalResearch.checks.length!==7)throw Error('Missing seven-check audit: '+r.id);
 if(r.technicalResearch.known<0||r.technicalResearch.known>7)throw Error('Invalid research score: '+r.id);
 if(r.technicalResearch.complete && r.technicalResearch.known!==7)throw Error('Incorrect completion state: '+r.id);
}
if(summary.total!==237||summary.complete<23)throw Error('Unexpected research counts after source addendum');
const categories=['crank','cam','ckp','cmp','ignition','fuel','decoder'];
const missing=Object.fromEntries(categories.map(k=>[k,records.filter(r=>r.technicalResearch.checks.some(c=>c.id===k&&!c.done)).length]));
console.log('Engine research verified: '+summary.complete+' / '+summary.total+' records with all seven research fields addressed.');
console.log('Still incomplete: '+(summary.total-summary.complete));
console.log('Missing evidence by category: '+JSON.stringify(missing));
