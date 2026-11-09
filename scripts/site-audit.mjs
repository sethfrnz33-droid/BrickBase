#!/usr/bin/env node
// Self-contained BrickBase static publishing checks. No npm install required.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const skip = new Set(['.git','node_modules']);
const files = [];
function walk(dir) {
  for (const item of fs.readdirSync(dir,{withFileTypes:true})) {
    if (skip.has(item.name)) continue;
    const p = path.join(dir,item.name);
    if (item.isDirectory()) walk(p);
    else if (item.name.endsWith('.html')) files.push(p);
  }
}
walk(root);
const errors=[];
const contents = new Map(files.map(file=>[file,fs.readFileSync(file,'utf8')]));
const ids = new Map([...contents].map(([file,html])=>[file,new Set([...html.matchAll(/\\bid\\s*=\\s*["']([^"']+)["']/gi)].map(m=>m[1]))]));
function fail(file,msg) { errors.push(path.relative(root,file)+': '+msg); }
for(const [file,html] of contents){
  if (!/<meta\\s+name=["']viewport["']/i.test(html)) fail(file,'missing responsive viewport meta tag');
  if (/payhip\\.com\\/b\\/K6IX5/i.test(html)) fail(file,'Mini Brick checkout remains linked, but Mini is not for sale');
  if(file.endsWith('/products/mini-brick.html') && (!/in development/i.test(html) || /Buy Mini Brick|visit Payhip to purchase/i.test(html))){
    fail(file,'Mini Brick product page must show development status and never offer checkout');
  }
  for(const [, , value] of html.matchAll(/\\b(href|src)\\s*=\\s*(["'])(.*?)\\2/gi)){
    if (!value || /^(?:https?:|mailto:|tel:|data:|javascript:|\\/\\/)/i.test(value)) continue;
    const hashIdx=value.indexOf('#');
    const pathname=(hashIdx>=0?value.slice(0,hashIdx):value).split('?')[0];
    const fragment=hashIdx>=0?value.slice(hashIdx+1):'';
    let target=file;
    if(pathname){
      try { target=path.resolve(path.dirname(file),decodeURIComponent(pathname)); }
      catch { fail(file,'invalid linked URL: '+value);continue; }
      if(!target.startsWith(root+path.sep) && target!==root){fail(file,'path leaves repo: '+value);continue;}
      if(!fs.existsSync(target)){fail(file,'missing file: '+value);continue;}
    }
    if(fragment && ids.has(target)){
      let id;
      try{id=decodeURIComponent(fragment);}catch{fail(file,'invalid fragment: '+value);continue;}
      if(!ids.get(target).has(id))fail(file,'missing target anchor: '+value);
    }
  }
}
if(errors.length){
  console.error('BrickBase site audit failed ('+errors.length+' issues):');
  for(const e of errors) console.error(' - '+e);
  process.exitCode=1;
}else{
  console.log('BrickBase site audit OK: '+files.length+' HTML pages checked for local links, anchors, viewport, and Mini Brick prelaunch safety.');
}
