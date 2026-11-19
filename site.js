(()=>{"use strict";const toggle=document.querySelector(".menu-toggle"),menu=document.querySelector(".navlinks");if(toggle&&menu){toggle.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))})}document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());const list=[...document.querySelectorAll(".reveal")];const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if("IntersectionObserver" in window&&!reduce){const obs=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}},{threshold:.06});list.forEach(el=>obs.observe(el))}else list.forEach(el=>el.classList.add("visible"));const engineSearch=document.querySelector("#engine-search"),engineEcu=document.querySelector("#engine-ecu"),engineCards=[...document.querySelectorAll("[data-engine]")],engineCount=document.querySelector("#engine-count");function filter(){const q=(engineSearch?.value||"").trim().toLowerCase(),type=engineEcu?.value||"all";let n=0;engineCards.forEach(card=>{const ok=card.textContent.toLowerCase().includes(q)&&(type==="all"||card.dataset.ecus?.split(" ").includes(type));card.hidden=!ok;if(ok)n++});if(engineCount)engineCount.textContent=n+" engine reference entr"+(n===1?"y":"ies")}engineSearch?.addEventListener("input",filter);engineEcu?.addEventListener("change",filter);filter()})();

/* Ask Brick: self-contained classic script; no separate module request required. */
(()=>{
/* Site-wide Brick documentation assistant: always available.
 * Cloudflare AI is used only after the configured free-tier Worker responds.
 * When the Worker is unavailable, clearly labelled local FAQ guidance still works.
 * No transcript is written to browser storage.
 */
const ENDPOINT="https://brick-ecu-help.sethfrnz33.workers.dev/";
let aiReady=false, statusLabel=null;
let answerBank=null;
const bankReady=import('/ai/answers.js').then(m=>{answerBank=m;return m;}).catch(()=>null);
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
 if(/3ds|dsi|brick.?tuner|brickos|homebrew|modded|jailbreak|nintendo/.test(q)){
  return {answer:"Brick Tuner Suite is experimental BrickOS homebrew for Nintendo 3DS and DSi. Both need a homebrew-enabled (modded/jailbroken) console; stock consoles cannot run it. The apps connect to Brick ECU over local Wi-Fi for live gauges and tuning functions, with some editing workflows still unfinished. Only the 3DS has stereoscopic 3D map viewing. These are not official Nintendo apps.",sources:[{title:"Handheld tuning",url:"/docs/software.html"},{title:"Big Brick",url:"/products/big-brick.html"}]};
 }
 if(/injector|impedance|peak.and.hold|saturated/.test(q)){
  return {answer:"Standard high-impedance (>8 Ω) port injectors are supported. Low-impedance injectors need appropriate current limiting. Check the output ratings and exact injector requirements before wiring.",sources:[{title:"Big Brick specifications",url:"/docs/big-brick.html"},{title:"Engine reference",url:"/docs/compatibility.html"}]};
 }
 if(/pinout|connector|harness|cavity|wiring|wire|can bus|ground|vr sensor|hall sensor/.test(q)){
  return {answer:"Big Brick now uses a 121-pin connector. The older 94-pin diagram is not applicable. A preliminary 121-pin map is available, but cavity assignments and orientation still need verification against the final production schematic before wiring.",sources:[{title:"121-pin pinout",url:"/docs/big-brick-pinout.html"},{title:"Setup guide",url:"/docs/engine-setup.html"}]};
 }
 if(/tuner|tuning|afr|fuel map|ve table|spark|ignition map|dwell|wideband|auto.?tune|fuel trim|idle|dbw|phone|browser|wifi|wi-fi/.test(q)){
  return {answer:"Big Brick supports local Wi-Fi tuning with a phone browser and TunerStudio. Its onboard ESP32 communicates over CAN and USB. The Nintendo 3DS and DSi homebrew apps are experimental and require modded consoles. Use hardware-matched documentation before making calibration or firmware changes.",sources:[{title:"Tuning interfaces",url:"/docs/software.html"},{title:"Downloads",url:"/docs/downloads.html"}]};
 }
 if(/warranty|return|refund|shipping|ship|purchase|buy|cost|price|delivery|order|contact|support/.test(q)){
  return {answer:"Big Brick costs C$799 in one fully equipped configuration, including all eight onboard IGBTs and 256 MB SD logging. No hardware add-ons. Build and delivery are targeted within three weeks, subject to availability and shipping. Online checkout is not active yet.",sources:[{title:"Product and pricing",url:"/products/big-brick.html"},{title:"Warranty and ordering",url:"/terms.html"}]};
 }
 if(/big|proteus|v8|eight.cylinder|twelve.cylinder/.test(q)){
  return {answer:"Big Brick has 16 dedicated 2 A low-side outputs, 12 smart ignition outputs, eight included parallel-drive IGBT stages, four 2 A high-side outputs, two H-bridges, two CAN buses and two wideband controllers. The IGBTs do not add independent ignition timing channels.",sources:[{title:"Big Brick hardware",url:"/products/big-brick.html"},{title:"Technical specifications",url:"/docs/big-brick.html"}]};
 }
 if(/vq35|gen.iv|ls[0-9]|engine|trigger|crank|cam|compatib|supported/.test(q)){
  return {answer:"The developer reports running VQ35DE and a Gen IV LS engine on Big Brick. The exact LS variant was not recorded. Engine Finder entries are research references, not verified plug-and-play compatibility or wiring lists.",sources:[{title:"Engine Finder",url:"/docs/compatibility.html"}]};
 }
 return {answer:"I can point you to Big Brick specs, wiring references, engine research, software and ordering details. The AI service is offline, so this is the site's built-in reference guide.",sources:[{title:"Setup guide",url:"/docs/engine-setup.html"},{title:"Big Brick",url:"/products/big-brick.html"}]};
}

function initialize(){
 const nav=document.querySelector(".navlinks");
 if(nav&&!nav.querySelector('[href$="ask-brick.html"]')){
  const help=el("a",null,"Help");
  help.href="/docs/ask-brick.html";
  nav.append(help);
 }
 if(document.getElementById("brick-help-toggle"))return;
 const launcher=el("button","brick-help-toggle");
 const avatar=el("img","brick-help-avatar");
 avatar.src="/assets/ask-brick-avatar.webp";
 avatar.alt="";
 avatar.width=30;avatar.height=30;
 avatar.loading="lazy";
 avatar.decoding="async";
 launcher.append(avatar,el("span","brick-help-label","Ask Brick"));
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
 messages.append(el("p","brick-help-intro","Need a hand? Ask about the ECU, setup, software or ordering. Answers link to the docs."));
 const examples=el("div","brick-help-questions");
 const here=location.pathname;
 const prompts=/engine-setup|pinout|planning|wiring-examples/.test(here)
  ? ["Where do I start wiring?","Is the pinout final?","What's the difference between grounds?"]
  : /compatibility|research-status/.test(here)
  ? ["What do fit scores mean?","Is this engine tested?","How do I check a trigger?"]
  : /software|downloads/.test(here)
  ? ["Can I tune from a 3DS?","Does the DSi need homebrew?","How do I find the right INI?"]
  : /terms|big-brick\.html/.test(here)
  ? ["What's included for C$799?","Is shipping included?","How does the warranty work?"]
  : ["What's included for C$799?","Can I tune from a 3DS?","Where's the setup guide?"];
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
 function openFromContext(prompt){
  open();
  if(prompt){input.value=prompt;input.focus();}
 }
 document.querySelectorAll('[data-ask-brick]').forEach(btn=>btn.addEventListener("click",()=>openFromContext(btn.getAttribute("data-ask-brick")||"")));
 // Only suggest help after a concrete no-results event; no automatic chat popups.
 const emptyCounter=document.getElementById("ef-count")||document.getElementById("audit-result");
 if(emptyCounter && typeof MutationObserver!=="undefined"){
  const prompt=el("div","brick-help-inline brick-help-no-results");
  const ask=el("button","brick-help-inline-button","No matches? Ask Brick");
  ask.type="button";
  ask.addEventListener("click",()=>openFromContext("I can't find my engine in the research list. What should I check?"));
  prompt.append(ask);
  emptyCounter.insertAdjacentElement("afterend",prompt);
  const refresh=()=>{
   const label=(emptyCounter.textContent||"").trim();
   prompt.hidden=!/^0(?:\s+matching|\s*\/\s*\d+)/i.test(label);
  };
  new MutationObserver(refresh).observe(emptyCounter,{childList:true,subtree:true,characterData:true});
  refresh();
 }
 const main=document.querySelector("main");
 if(main && !document.querySelector(".brick-help-inline")){
  const inline=el("div","brick-help-inline");
  const link=el("button","brick-help-inline-button","Questions? Ask Brick");
  link.type="button";
  link.setAttribute("aria-label","Open Brick ECU documentation help");
  link.addEventListener("click",()=>openFromContext(""));
  inline.append(link);
  const anchor=main.querySelector(".page-head,.release .lede,.policy-head,.audit-head,.guide-hero,.home-details");
  if(anchor)anchor.insertAdjacentElement("afterend",inline);
 }
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
     await bankReady;
     pending.remove();
     const local=answerBank?.directAnswer(question)||localAnswer(question);
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
       await bankReady;
       const local=answerBank?.directAnswer(question)||localAnswer(question);
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
     await bankReady;
     const local=answerBank?.directAnswer(question)||localAnswer(question);
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

})();
