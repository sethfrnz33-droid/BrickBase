import {API_ENDPOINT} from "./config.js";

/* Site-wide Brick documentation assistant: always available.
 * Cloudflare AI is used only after the configured free-tier Worker responds.
 * When the Worker is unavailable, clearly labelled local FAQ guidance still works.
 * No transcript is written to browser storage.
 */
const ENDPOINT=API_ENDPOINT;
let aiReady=false, statusLabel=null;
const validSource=url=>typeof url==="string"&&/^\/(?!\/)(?:docs|products)\/[a-z0-9/._-]+(?:#[a-z0-9_-]+)?$/i.test(url)||url==="/terms.html";
function el(tag,cls,text){
 const node=document.createElement(tag);
 if(cls)node.className=cls;
 if(text!==undefined)node.textContent=text;
 return node;
}
function linkList(sources){
 const clean=(Array.isArray(sources)?sources:[]).filter(s=>s&&validSource(s.url)).slice(0,4);
 if(!clean.length)return null;
 const wrap=el("div","brick-help-sources");
 wrap.append(el("strong",null,"Related references"));
 for(const src of clean){
  const a=el("a",null,src.title||"Open documentation");
  a.href=src.url;
  a.rel="noopener noreferrer";
  wrap.append(a);
 }
 return wrap;
}
function localAnswer(question){
 const q=String(question||"").toLowerCase();
 if(/injector|impedance|peak.and.hold|saturated/.test(q)){
   return {answer:"Standard high-impedance (>8 Ω) port injectors are natively supported on Brick ECU. Low-impedance injectors need suitable current limiting. For the injector count and output assignments, check the ECU specification and the Engine Finder.",sources:[{title:"Engine Finder",url:"/docs/compatibility.html"},{title:"Big Brick technical specs",url:"/docs/big-brick.html"}]};
 }
 if(/pinout|connector|harness|cavity|wiring|wire|can bus|ground|vr sensor|hall sensor/.test(q)){
   return {answer:"The Big Brick 94-pin lookup identifies the documented connector assignments. Verify connector orientation, exact ECU hardware revision, OEM sensor wiring and electrical loads before installation. I can't confirm a wiring connection from a chat question alone.",sources:[{title:"Big Brick pinout",url:"/docs/big-brick-pinout.html"},{title:"Mini Brick documentation",url:"/docs/mini-brick.html"},{title:"Installation planning",url:"/docs/planning.html"}]};
 }
 if(/tuner|tuning|afr|fuel map|ve table|spark|ignition map|dwell|wideband|auto.?tune|fuel trim|idle|dbw/.test(q)){
   return {answer:"Brick ECUs work with TunerStudio; the registered edition provides additional tuning tools. Big Brick has an onboard LSU 4.9 wideband, while Mini Brick uses an external wideband. For safe calibration, use the relevant manuals and qualified tuning help rather than guessed fuel or ignition values.",sources:[{title:"Tuning and Wi-Fi",url:"/docs/software.html"},{title:"Downloads",url:"/docs/downloads.html"}]};
 }
 if(/warranty|return|refund|shipping|ship|purchase|buy|cost|price|delivery|order|contact|support/.test(q)){
   return {answer:"Big Brick is available to order for CAD $1,200, including shipping and the mating connector kit; allow up to four weeks before dispatch plus transit. Mini Brick is IN DEVELOPMENT, cannot be purchased, and has a planned launch price of CAD $600 shipped. The Big Brick purchase carries the published limited warranty; see the ordering and safety terms.",sources:[{title:"Ordering, warranty and safety",url:"/terms.html"}]};
 }
 if(/mini|little brick|f407/.test(q)&&!/big/.test(q)){
   return {answer:"Mini Brick is IN DEVELOPMENT and is not available for purchase. The planned hardware is intended for four-cylinder engines and selected six-cylinder wasted-spark builds, with four injector outputs, four ignition signals, native Wi-Fi, CAN and a 6 A DBW H-bridge. It has no onboard wideband controller or GDI support.",sources:[{title:"Mini Brick hardware",url:"/products/mini-brick.html"},{title:"Mini Brick technical specs",url:"/docs/mini-brick.html"}]};
 }
 if(/big|proteus|v8|eight.cylinder|twelve.cylinder/.test(q)&&!/mini/.test(q)){
   return {answer:"Big Brick provides up to eight-cylinder sequential fuel and spark, 16 low-side outputs (including six IGBT-capable ignition channels), 12 separate 5 V smart-coil outputs, integrated LSU 4.9 wideband, knock sensing and Wi-Fi. Check output allocation against your engine's actual hardware.",sources:[{title:"Big Brick hardware",url:"/products/big-brick.html"},{title:"Big Brick pinout",url:"/docs/big-brick-pinout.html"}]};
 }
 if(/vq35|gen.iv|\bls\d|engine|trigger|crank|cam|compatib|supported/.test(q)){
   return {answer:"The developer reports running VQ35DE and a Gen IV LS engine successfully on Big Brick. The exact LS engine code wasn't recorded, and a family-level example isn't proof of every variant. Use the Engine Finder for engine-specific trigger and sensor references.",sources:[{title:"Engine Finder",url:"/docs/compatibility.html"}]};
 }
 if(/mini|compare|difference|which one/.test(q)){
   return {answer:"Mini Brick is still in development and cannot be ordered; its planned launch price is CAD $600 shipped. Big Brick is available to order for CAD $1,200 shipped, with more I/O, onboard wideband, knock sensing and wider cylinder support. Both designs include Wi-Fi tuning and mating connector kits.",sources:[{title:"Mini Brick",url:"/products/mini-brick.html"},{title:"Big Brick",url:"/products/big-brick.html"}]};
 }
 return {answer:"I can help find Brick ECU hardware specifications, engine references, tuning documentation, warranty details and wiring diagrams. The AI service is currently offline, so this answer uses the built-in reference guide rather than generated AI. Try asking about an ECU model, injector type or technical manual.",sources:[{title:"Documentation",url:"/docs/index.html"},{title:"Engine Finder",url:"/docs/compatibility.html"}]};
}

function initialize(){
 if(document.getElementById("brick-help-toggle"))return;
 const launcher=el("button","brick-help-toggle","Ask Brick");
 launcher.id="brick-help-toggle";
 launcher.type="button";
 launcher.setAttribute("aria-controls","brick-help-panel");
 launcher.setAttribute("aria-expanded","false");
 launcher.setAttribute("aria-label","Ask Brick ECU about wiring, tuning concepts and hardware");
 const panel=el("section","brick-help-panel");
 panel.id="brick-help-panel";
 panel.hidden=true;
 panel.setAttribute("role","region");
 panel.setAttribute("aria-label","Brick ECU documentation assistant");
 const header=el("div","brick-help-header");
 const heading=el("div","brick-help-heading");
 statusLabel=el("span",null,"Documentation help · Checking AI");
 heading.append(el("strong",null,"Ask Brick"),statusLabel);
 const close=el("button","brick-help-close","×");
 close.type="button";close.setAttribute("aria-label","Close assistant");
 header.append(heading,close);
 const messages=el("div","brick-help-messages");
 messages.setAttribute("role","log");
 messages.setAttribute("aria-live","polite");
 messages.setAttribute("aria-relevant","additions");
 messages.append(el("p","brick-help-intro","Ask about either ECU, basic TunerStudio concepts, or where to find original wiring and engine references."));
 const examples=el("div","brick-help-questions");
 const prompts=["Mini vs Big Brick?","Do high-impedance injectors work?","Where are the connector pinouts?"];
 const form=el("form","brick-help-form");
 const input=el("input","brick-help-input");
 input.type="text";input.name="question";
 input.maxLength=750;input.minLength=3;input.required=true;
 input.autocomplete="off";input.placeholder="Ask a Brick ECU question…";
 input.setAttribute("aria-label","Your Brick ECU question");
 const send=el("button","brick-help-send","Send");
 send.type="submit";
 form.append(input,send);
 const foot=el("p","brick-help-disclaimer","Reference help only. Verify wiring and tuning against the manuals; no ECU control.");
 panel.append(header,messages,examples,form,foot);
 document.body.append(launcher,panel);
 let busy=false;
 const history=[];
 const open=()=>{panel.hidden=false;launcher.setAttribute("aria-expanded","true");input.focus()};
 const shut=()=>{panel.hidden=true;launcher.setAttribute("aria-expanded","false");launcher.focus()};
 launcher.addEventListener("click",()=>{if(panel.hidden)open();else shut()});
 close.addEventListener("click",shut);
 panel.addEventListener("keydown",event=>{if(event.key==="Escape"){event.preventDefault();shut()}});
 function addMessage(text,from,sources){
   const box=el("div","brick-help-message brick-help-"+from);
   box.append(el("p",null,text));
   const refs=linkList(sources);
   if(refs)box.append(refs);
   messages.append(box);
   messages.scrollTop=messages.scrollHeight;
   return box;
 }
 async function ask(question){
   if(busy)return;
   question=String(question).trim().slice(0,750);
   if(question.length<3)return;
   busy=true;send.disabled=true;input.disabled=true;
   examples.hidden=true;
   addMessage(question,"user");
   input.value="";
   const pending=addMessage("Looking through Brick ECU references…","assistant");
   if(!aiReady){
     pending.remove();
     const local=localAnswer(question);
     addMessage(local.answer,"assistant",local.sources);
     busy=false;send.disabled=false;input.disabled=false;input.focus();
     return;
   }
   try{
     const response=await fetch(ENDPOINT,{
       method:"POST",headers:{"content-type":"application/json","accept":"application/json"},
       body:JSON.stringify({question,history:history.slice(-4)})
     });
     const data=await response.json();
     pending.remove();
     if(!response.ok||!data.answer){
       aiReady=false;
       if(statusLabel)statusLabel.textContent="Documentation help · AI offline";
       const local=localAnswer(question);
       addMessage(local.answer,"assistant",local.sources);
       return;
     }
     addMessage(data.answer,"assistant",data.sources);
     history.push({role:"user",content:question},{role:"assistant",content:data.answer});
     if(history.length>6)history.splice(0,history.length-6);
   }catch(_){
     pending.remove();
     aiReady=false;
     if(statusLabel)statusLabel.textContent="Documentation help · AI offline";
     const local=localAnswer(question);
     addMessage(local.answer,"assistant",local.sources);
   }finally{busy=false;send.disabled=false;input.disabled=false;input.focus()}
 }
 for(const prompt of prompts){
   const b=el("button","brick-help-prompt",prompt);
   b.type="button";
   b.addEventListener("click",()=>ask(prompt));
   examples.append(b);
 }
 form.addEventListener("submit",event=>{event.preventDefault();ask(input.value)});
}
async function probe(){
 initialize(); // Never hide the widget just because Cloudflare AI is unavailable.
 try{
   const controller=new AbortController();
   const timer=setTimeout(()=>controller.abort(),5000);
   let response;
   try{response=await fetch(ENDPOINT,{method:"GET",headers:{"accept":"application/json"},signal:controller.signal});}
   finally{clearTimeout(timer)}
   if(!response.ok)throw new Error("Assistant endpoint unavailable");
   const data=await response.json();
   aiReady=(data?.service==="Brick ECU help"&&data.configured===true);
   if(statusLabel)statusLabel.textContent=aiReady?"Cloudflare AI connected · Documentation":"Documentation help · AI offline";
 }catch(_){
   aiReady=false;
   if(statusLabel)statusLabel.textContent="Documentation help · AI offline";
 }
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",probe,{once:true});
else probe();
