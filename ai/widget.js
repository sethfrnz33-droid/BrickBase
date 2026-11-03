import {API_ENDPOINT} from "./config.js";

/* Small, intentionally unobtrusive site assistant.
 * The launcher is only shown after a working AI backend responds to /health.
 * No transcript is written to browser storage.
 */
const ENDPOINT=API_ENDPOINT;
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
 heading.append(el("strong",null,"Ask Brick"),el("span",null,"Hardware, wiring & tuning help"));
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
   try{
     const response=await fetch(ENDPOINT,{
       method:"POST",headers:{"content-type":"application/json","accept":"application/json"},
       body:JSON.stringify({question,history:history.slice(-4)})
     });
     const data=await response.json();
     pending.remove();
     if(!response.ok||!data.answer){
       addMessage(data.error||"The assistant is unavailable. Use the linked docs instead.","assistant",data.sources);
       return;
     }
     addMessage(data.answer,"assistant",data.sources);
     history.push({role:"user",content:question},{role:"assistant",content:data.answer});
     if(history.length>6)history.splice(0,history.length-6);
   }catch(_){
     pending.remove();
     addMessage("The AI service isn't reachable right now. Try the Engine Finder or hardware documentation.","assistant",[
       {title:"Engine Finder",url:"/docs/compatibility.html"},
       {title:"Documentation",url:"/docs/index.html"}
     ]);
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
 try{
   const controller=new AbortController();
   const timer=setTimeout(()=>controller.abort(),5000);
   let response;
   try{response=await fetch(ENDPOINT,{method:"GET",headers:{"accept":"application/json"},signal:controller.signal});}
   finally{clearTimeout(timer)}
   if(!response.ok)return;
   const data=await response.json();
   if(data?.service==="Brick ECU help"&&data.configured===true)initialize();
 }catch(_){/* No public launcher until a functioning AI backend is deployed. */}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",probe,{once:true});
else probe();
