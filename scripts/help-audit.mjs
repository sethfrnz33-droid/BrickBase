#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ANSWERS,selectAnswers,directAnswer} from '../ai/answers.js';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const errors=[], ids=new Set();
function check(x,message){if(!x)errors.push(message);}
check(ANSWERS.length>=125,'Help library needs at least 125 entries');
for(const entry of ANSWERS){
 check(!ids.has(entry.id),'Duplicate answer ID: '+entry.id);ids.add(entry.id);
 check(Array.isArray(entry.terms)&&entry.terms.length>0,'No matching phrases: '+entry.id);
 check(typeof entry.answer==='string'&&entry.answer.length>=35,'Answer too short: '+entry.id);
 check(Array.isArray(entry.sources)&&entry.sources.length>0,'Missing citation: '+entry.id);
 for(const source of entry.sources||[]){
  const target=path.join(root,source.url.replace(/^\//,''));
  check(source.url.startsWith('/')&&fs.existsSync(target),'Missing linked source '+entry.id+': '+source.url);
 }
}
const cases=[
 ['price','799'],
 ['how much','799'],
 ['igbt included','eight'],
 ['121 pins','121'],
 ['wrong pinout','121'],
 ['what is gdi','direct injection'],
 ['does my dsi need homebrew','homebrew'],
 ['nintendo 3ds','stereoscopic'],
 ['tune from anywhere','local'],
 ['how fast is wireless update rate','100 hz'],
 ['sd card removable','non-removable'],
 ['where is my ecu pinout','121'],
 ['is mini brick available','only ecu'],
 ['what are engine fit scores','score'],
 ['does ai control my ecu','cannot']
];
for(const [question,needle] of cases){
 const out=directAnswer(question);
 if(!out)errors.push('No direct answer: '+question);
 else if(!out.answer.toLowerCase().includes(needle))errors.push('Incorrect answer for "'+question+'": '+out.answer);
}
check(selectAnswers('').length===0,'Empty question should return no matches');
if(errors.length){console.error('Ask Brick audit failed:\n- '+errors.join('\n- '));process.exitCode=1;}
else console.log('Ask Brick audit OK: '+ANSWERS.length+' grounded answers, '+cases.length+' sample questions, all source paths valid.');
