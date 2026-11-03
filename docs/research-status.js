/* Brick ECU complete engine-research inventory; derives all figures from current engine finder data. */
(()=>{
 "use strict";
 const data=Array.isArray(window.BRICK_ENGINE_PRESETS)?window.BRICK_ENGINE_PRESETS:[];
 const q=id=>document.getElementById(id);
 const make=q("audit-make"), stage=q("audit-stage"),search=q("audit-search"),completion=q("audit-completion"),rows=q("audit-rows");
 if(!make||!stage||!search||!completion||!rows)return;
 const descriptions={
  "wheel-sourced":"Specific trigger-wheel geometry sourced",
  "family-wheel-sourced":"Engine-family wheel data sourced",
  "partial-wheel-sourced":"Partial trigger-wheel research",
  "hardware-constraint":"Hardware / decoder / fuel-system constraint",
  "decoder-only":"Firmware decoder only; OEM wheel unverified",
  "oem-wheel-sourced":"OEM wheel sourced; firmware match unresolved",
  "generic-correlation-pending":"Generic crank/cam decoder pairing unresolved"
 };
 const isComplete=e=>e.audit?.pinoutVerified===true&&e.audit?.brickTested===true&&e.audit?.validatedCalibration===true;
 const sort=(a,b)=>a.localeCompare(b,undefined,{sensitivity:"base",numeric:true});
 const total=data.length,finished=data.filter(isComplete).length;
 q("audit-total").textContent=total;
 q("audit-finished").textContent=finished;
 q("audit-unfinished").textContent=total-finished;
 function makeOptions(select,values){
   for(const value of values){const el=document.createElement("option");el.value=value;el.textContent=select===stage?(descriptions[value]||value):value;select.append(el)}
 }
 makeOptions(make,[...new Set(data.map(e=>e.make))].sort(sort));
 makeOptions(stage,[...new Set(data.map(e=>e.research?.status||"unknown"))].sort((a,b)=>sort(descriptions[a]||a,descriptions[b]||b)));
 const counts=new Map;
 for(const e of data){const s=e.research?.status||"unknown";counts.set(s,(counts.get(s)||0)+1);}
 for(const [type,n] of [...counts].sort((a,b)=>b[1]-a[1])){
   const el=document.createElement("div");el.className="audit-state";
   const label=document.createElement("span");label.textContent=descriptions[type]||type;
   const number=document.createElement("strong");number.textContent=n;el.append(label,number);q("audit-stages").append(el);
 }
 const cell=(tr,s)=>{const td=document.createElement("td");if(s!==undefined)td.textContent=s;tr.append(td);return td;};
 const link=(href,text)=>{const a=document.createElement("a");a.href=href;a.textContent=text;return a;};
 function render(){
   const terms=search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
   const filtered=data.filter(e=>(!make.value||e.make===make.value)&&(!stage.value||stage.value===(e.research?.status||"unknown"))&&
      (!completion.value||(completion.value==="complete"&&isComplete(e))||(completion.value==="incomplete"&&!isComplete(e)))&&
      terms.every(term=>[e.make,e.family,e.model,e.research?.crankWheel,e.research?.remaining,e.integration?.validation].filter(Boolean).join(" ").toLowerCase().includes(term)))
     .sort((a,b)=>sort(a.make+" "+a.family+" "+a.model,b.make+" "+b.family+" "+b.model));
   rows.replaceChildren();
   q("audit-result").textContent=filtered.length+" / "+data.length+" engines shown";
   if(!filtered.length){const tr=document.createElement("tr");const td=cell(tr,"No matching engine records.");td.colSpan=7;rows.append(tr);return;}
   const fragment=document.createDocumentFragment();
   for(const e of filtered){
     const tr=document.createElement("tr");
     const name=cell(tr);name.append(link("compatibility.html#engine="+encodeURIComponent(e.id),e.model));const where=document.createElement("small");where.textContent=e.make+" / "+e.family;name.append(where);
     cell(tr,isComplete(e)?"Finished / verified":"Unfinished / untested").className="audit-unknown";
     cell(tr,(e.confidenceV2?.big?.score??"—")+"/100").className="audit-category";
     cell(tr,(e.confidenceV2?.mini?.score??"—")+"/100").className="audit-category";
     cell(tr,descriptions[e.research?.status]||e.research?.status||"Unknown").className="audit-category";
     const missing=cell(tr,e.research?.remaining||e.integration?.validation||"Exact OEM wiring, trigger/cam decoding, input conditioning, sensor calibration and live Brick validation still needed.");
     if(e.conflicts?.length){const conflicting=document.createElement("p");conflicting.className="audit-conflict";conflicting.textContent=e.conflicts.length+" known conflict(s) or special warnings recorded";missing.append(conflicting);}
     const sources=cell(tr),refs=(e.references||[]);
     if(refs.length){
        sources.append(link("compatibility.html#engine="+encodeURIComponent(e.id),refs.length+" engine source link(s)"));
        const aux=document.createElement("small");aux.textContent="Inspect source scope and conflicts in engine detail";sources.append(aux);
     } else {
        const no=document.createElement("span");no.className="audit-unknown";no.textContent="No entry-specific external sources logged";sources.append(no);
     }
     fragment.append(tr);
   }
   rows.append(fragment);
 }
 for(const ctrl of [make,stage,completion])ctrl.addEventListener("change",render);
 search.addEventListener("input",render);
 render();
})();