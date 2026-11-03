/* Text-only Brick ECU engine finder. Engine entries are research candidates, not tuning files or verified installations. */
(()=>{
  "use strict";
  const records=Array.isArray(window.BRICK_ENGINE_PRESETS)?window.BRICK_ENGINE_PRESETS:[];
  const byId=new Map(records.map(e=>[e.id,e]));
  const $=id=>document.getElementById(id);
  const make=$("ef-make"), family=$("ef-family"), variant=$("ef-variant"), search=$("ef-search");
  const count=$("ef-count"), list=$("ef-results"), more=$("ef-more"), details=$("ef-details"), reset=$("ef-reset");
  if(!make||!family||!variant||!search||!list||!details)return;
  const source="https://wiki.rusefi.com/All-Supported-Triggers/";
  const firmware="https://github.com/rusefi/rusefi/blob/master/firmware/integration/rusefi_config.txt";
  const statusText={named:"Named decoder in rusEFI",pattern:"Wheel-pattern candidate",research:"Needs trigger verification",blocked:"Stock trigger unsupported / warned"};
  let selected=null,shown=40;
  const sort=(a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:"base"});
  const unique=a=>[...new Set(a)].sort(sort);
  function setOptions(control,placeholder,items,retain){
    control.replaceChildren();
    const initial=document.createElement("option");initial.value="";initial.textContent=placeholder;control.append(initial);
    items.forEach(item=>{const opt=document.createElement("option");opt.value=item.value;opt.textContent=item.label;control.append(opt)});
    control.value=retain&&items.some(x=>x.value===retain)?retain:"";
  }
  function populateMake(retain){
    setOptions(make,"All manufacturers",unique(records.map(e=>e.make)).map(s=>({value:s,label:s})),retain);
  }
  function populateFamily(retain){
    const arr=records.filter(e=>!make.value||e.make===make.value);
    setOptions(family,"All engine families",unique(arr.map(e=>e.family)).map(s=>({value:s,label:s})),retain);
  }
  function populateVariant(retain){
    const arr=records.filter(e=>(!make.value||e.make===make.value)&&(!family.value||e.family===family.value));
    setOptions(variant,"All engine variants",arr.slice().sort((a,b)=>sort(a.make+" "+a.family+" "+a.model,b.make+" "+b.family+" "+b.model)).map(e=>({value:e.id,label:e.model+(!family.value?" — "+e.family:"")})),retain);
  }
  function matchesSearch(e){
    const q=search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if(!q.length)return true;
    const str=[e.make,e.family,e.model,e.crank,e.cam,e.notes,e.fuel,e.research?.crankWheel,e.research?.camWheel,e.research?.electrical,e.research?.decoderCorrelation,e.integration?.sensors,e.integration?.ignition,e.integration?.actuators,e.confidenceV2?.model?.coilType,e.confidenceV2?.model?.factoryLoadSensor,e.confidenceV2?.model?.vvtClass].filter(Boolean).join(" ").toLowerCase();
    return q.every(word=>str.includes(word));
  }
  function filtered(){
    return records.filter(e=>(!make.value||e.make===make.value)&&(!family.value||e.family===family.value)&&(!variant.value||e.id===variant.value)&&matchesSearch(e))
      .sort((a,b)=>sort(a.make+" "+a.family+" "+a.model,b.make+" "+b.family+" "+b.model));
  }
  function field(label,value){
    const row=document.createElement("div");row.className="ef-spec";
    const term=document.createElement("dt");term.textContent=label;
    const desc=document.createElement("dd");desc.textContent=value||"Not established";
    row.append(term,desc);return row;
  }
  function elm(tag,cls,txt){
    const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;
  }
  function scoreCard(name,pct){
    const card=elm("div","ef-score-card"+(pct===0?" ef-score-zero":""));
    const header=elm("div","ef-score-header");
    header.append(elm("span","ef-score-name",name),elm("strong","ef-score-number",pct+"%"));
    const meter=elm("progress","ef-score-meter");
    meter.max=100;meter.value=pct;meter.setAttribute("aria-label",name+" engineering screening confidence: "+pct+" percent");
    card.append(header,meter);
    return card;
  }
  function scoreExplanation(e){
    const wrap=elm("div","ef-score-reasons");
    wrap.append(elm("strong",null,"Previous screening methodology (superseded)"));
    const ul=elm("ul");
    (e.confidence?.basis||["No rating methodology recorded."]).forEach(msg=>ul.append(elm("li",null,msg)));
    wrap.append(ul);
    return wrap;
  }
  function confidenceLayerSection(e){
    const v=e.confidenceV2,wrap=elm("section","ef-layered");
    if(!v)return wrap;
    const h=elm("h4",null,"Compatibility confidence by engineering layer");
    const intro=elm("p","ef-layer-intro","Seven independent checks compare Big vs Mini, with the evidence source and outstanding verification visible in each row. Scores describe a preliminary hardware/firmware screening, NOT real-world success probability.");
    const weights=elm("p","ef-layer-weights","Weights: crank decoder 25 · injector I/O 15 · ignition count 14 · ignition power stage 14 · cam/VVT 14 · load sensor 8 · injection technology 10. Untested total capped at 79; a stock-system blocker overrides the combined total to 0.");
    wrap.append(h,intro,weights);
    const profile=elm("div","ef-layer-profile");
    const dat=v.model||{};
    profile.append(field("Factory coil type",({
       smart:"Smart coils / built-in igniter",dumb:"Passive coils / external power stage required",
       "external-multi":"Coils via multi-channel external igniter",
       "external-single":"Single coil via OEM igniter / distributor",
       unknown:"Unknown: coil and driver require source verification"
     })[dat.coilType]||"Unknown"),
     field("Stock load sensor",({
       map:"Manifold MAP",both:"MAP and MAF",maf:"MAF, no confirmed manifold MAP",\n       "limited-map":"Stock MAP present, but limited calibration / vacuum range",
       mixed:"Model-year/market dependent MAP or MAF",unknown:"Unknown; no assumed factory MAP"
     })[dat.factoryLoadSensor]||"Unknown"),
     field("Ignition firing topology",(dat.ignitionLayout==="twin-distributor"?"Two coils via two distributors":dat.ignitionLayout)||"unknown"),
     field("Cam/VVT complexity",dat.vvtClass||"unknown"));
    const engineNotes=(dat.notes||[]);
    if(engineNotes.length){
      const note=elm("p","ef-layer-source-note",engineNotes.join(" "));
      profile.append(note);
    }
    wrap.append(profile);
    const list=elm("div","ef-layer-list");
    const miniMap=new Map((v.mini?.layers||[]).map(x=>[x.id,x]));
    for(const b of v.big?.layers||[]){
      const m=miniMap.get(b.id)||b;
      const item=elm("details","ef-layer-item");
      const sum=elm("summary","ef-layer-summary");
      const name=elm("span","ef-layer-name",b.label);
      const cb=elm("span","ef-layer-chip","Big "+b.score+"/100");
      const cm=elm("span","ef-layer-chip","Mini "+m.score+"/100");
      sum.append(name,cb,cm);item.append(sum);
      const body=elm("div","ef-layer-body");
      for(const [title,x] of [["Big Brick",b],["Mini Brick",m]]){
         const part=elm("div","ef-layer-evidence");
         part.append(elm("strong",null,title+" · "+x.state+" · "+x.score+"/100"));
         part.append(elm("p",null,x.detail));
         part.append(elm("p","ef-layer-required","Next verification: "+x.required));
         if(x.refs?.length){
           const refs=elm("p","ef-layer-refs");
           x.refs.slice(0,5).forEach((u,i)=>{if(!/^https:\/\//.test(u))return;
             const a=elm("a",null,"Reference "+(i+1));a.href=u;a.target="_blank";a.rel="noopener noreferrer";
             refs.append(a);});
           part.append(refs);
         }
         body.append(part);
      }
      item.append(body);list.append(item);
    }
    wrap.append(list);
    if(v.big?.hardBlocks?.length||v.mini?.hardBlocks?.length){
      const caution=elm("div","ef-layer-blockers");
      caution.append(elm("h4",null,"Compatibility limits and required modifications"));
      for(const [title,c] of [["Big Brick",v.big],["Mini Brick",v.mini]]){
         if(!c?.hardBlocks?.length)continue;
         const p=elm("p",null,title+": "+c.hardBlocks.join(" "));
         caution.append(p);
      }
      wrap.append(caution);
    }
    wrap.append(elm("p","ef-layer-disclaimer",v.disclaimer));
    return wrap;
  }
  function researchSection(e){
    const r=e.research,wrap=elm("section","ef-research");
    wrap.append(elm("h4",null,"OEM trigger-wheel research"));
    if(!r){
      const status=elm("p","ef-research-pending","Engine-specific OEM wheel research is pending. The trigger choices above are preliminary and must not be treated as verified for this variant.");
      wrap.append(status);
      return wrap;
    }
    const badge=elm("p","ef-research-status","Research status: "+({
      "wheel-sourced":"Trigger geometry sourced; exact variant and Brick synchronization not tested",
      "family-wheel-sourced":"Engine-family trigger documented; exact variant still to confirm",
      "oem-wheel-sourced":"OEM wheel documented; rusEFI correlation unresolved",
      "partial-wheel-sourced":"Partial OEM wheel research; more evidence required",
      "hardware-constraint":"OEM hardware limitation identified",
      "generic-correlation-pending":"OEM shape documented; generic rusEFI cam/crank pairing needs validation",
      "decoder-only":"Decoder or catalogue reference checked; OEM variant-wheel evidence still missing"
    }[r.status]||"Research in progress"));
    const dl=elm("dl","ef-specs");
    dl.append(field("OEM crank wheel",r.crankWheel),field("OEM cam/phase wheel",r.camWheel),field("OEM sensor hardware",r.electrical),field("rusEFI decoder correlation",r.decoderCorrelation),field("Still to verify",r.remaining));
    if(r.genericWheel){
      const g=r.genericWheel;
      dl.append(field("Custom wheel candidate",g.menu+": "+g.total+" nominal positions / "+g.missing+" missing / "+g.operation));
      if(g.caution)dl.append(field("Custom wheel caveat",g.caution));
    }
    wrap.append(badge,dl);
    if(r.notes)wrap.append(elm("p","ef-research-note",r.notes));
    return wrap;
  }
  function ecuFit(e){
    if(e.cyl===0)return "Rotary management is not established by matching a crank pattern; dedicated engine synchronization, ignition and injection scheduling require separate verification.";
    if(e.fuel.toLowerCase().includes("direct injection")){
      return "Factory GDI is not natively validated on Big Brick; external GDI control is untested. Mini Brick has no GDI support.";
    }
    if(e.cyl>8)return "Big Brick: batch fuel/sequential spark may be possible up to 12 cylinders; no engine-specific allocation validated. Mini Brick: not designed for this cylinder count.";
    if(e.cyl>6)return "Big Brick: channel-count candidate for up to 8-cylinder sequential fuel and spark. Mini Brick: not intended for 8-cylinder sequential builds.";
    if(e.cyl>4)return "Big Brick: channel-count candidate for sequential fuel/spark. Mini Brick: six-cylinder operation requires a separate wasted-spark and injector-output assessment.";
    return "Big Brick / Mini Brick: preliminary channel-count candidates only; actual trigger, ignition and sensor integration are untested.";
  }
  function renderDetails(){
    details.replaceChildren();
    if(!selected||!byId.has(selected)){
      const empty=elm("div","ef-placeholder");
      empty.append(elm("h3",null,"Select an engine to view its trigger reference"),elm("p",null,"Choose a make, family and model above, or search for an engine code and select a matching result."));
      details.append(empty);return;
    }
    const e=byId.get(selected),top=elm("div","ef-detail-top");
    const kicker=elm("span","ef-eyebrow",e.make+"  /  "+e.family);
    const title=elm("h3",null,e.model);
    const flag=elm("span","ef-level ef-level-"+e.level,statusText[e.level]);
    top.append(kicker,title,flag);
    const scores=elm("div","ef-scores");
    scores.append(scoreCard("Big Brick",e.confidenceV2?.big?.score??e.confidence?.big??0),scoreCard("Mini Brick",e.confidenceV2?.mini?.score??e.confidence?.mini??0));
    const scoreDisclaimer=elm("p","ef-score-disclaimer","Seven weighted engineering evidence layers for stock engine systems, NOT measured probabilities, tests or validated installations. A zero total means a native stock-system blocker, not that a redesigned engine can never work.");
    const grid=elm("dl","ef-specs");
    grid.append(field("Engine",e.make+" / "+e.family+" / "+e.model),field("Cylinders / rotors",e.cyl===0?"2 rotors (rotary)":String(e.cyl)),field("Fuel system",e.fuel),field("rusEFI crank / trigger selection",e.crank),field("rusEFI cam / VVT selection",e.cam),field("ECU channel suitability",ecuFit(e)));
    const note=elm("div","ef-detail-note");
    note.append(elm("strong",null,"Variant notes and cautions"),elm("p",null,e.notes));
    const warning=elm("div","notice warning");
    warning.textContent="Research entry only — no Brick ECU harness, tune, synchronization or ignition timing has been tested for this variant. A decoder name is not a guarantee of compatibility.";
    if(e.level==="blocked")warning.textContent="WARNING: rusEFI marks the selected decoder as problematic. Do not treat this engine as a supported trigger application.";
    const refs=elm("p","ef-sources");
    const a=elm("a",null,"rusEFI trigger reference");a.href=source;a.target="_blank";a.rel="noopener noreferrer";
    const b=elm("a",null,"Current firmware trigger menu");b.href=firmware;b.target="_blank";b.rel="noopener noreferrer";
    refs.append(a,document.createTextNode("  ·  "),b);
    [...new Set([...(e.sources||[]),...(e.research?.sources||[])])].forEach((url,i)=>{
      const link=elm("a",null,"Engine technical source "+(i+1));
      link.href=url;link.target="_blank";link.rel="noopener noreferrer";
      refs.append(document.createTextNode("  ·  "),link);
    });
    const integration=elm("section","ef-research");
    integration.append(elm("h4",null,"Engine management and wiring research"));
    const int=e.integration||{},d=elm("dl","ef-specs");
    d.append(field("Crank/cam sensors and electrical requirements",int.sensors),
      field("Ignition coils / power stages",int.ignition),
      field("Injectors / fueling interface",int.injectors),
      field("VVT, throttle and auxiliary actuators",int.actuators),
      field("OEM connector and terminal mappings",int.vehicleWiring),
      field("Required testing before installation",int.validation));
    integration.append(d);
    if(int.referenceScope)integration.append(elm("p","ef-research-note",int.referenceScope));
    const conflicts=elm("section","ef-research");
    conflicts.append(elm("h4",null,"Conflicting information and limitations"));
    const issues=e.conflicts||[];
    if(!issues.length)conflicts.append(elm("p","ef-research-note","No specific published conflict logged for this variant; this does not establish that its electrical information is verified."));
    else for(const c of issues){
      const p=elm("p","ef-research-note",c.issue);
      const urls=[...new Set(c.refs||[])];
      for(const url of urls){const a=elm("a",null,"Conflict reference");a.href=url;a.target="_blank";a.rel="noopener noreferrer";p.append(document.createTextNode(" · "),a);}
      conflicts.append(p);
    }
    const audit=elm("section","ef-research");
    audit.append(elm("h4",null,"Evidence and original sources"));
    const ar=e.audit||{};
    audit.append(elm("p","ef-research-note", "Original harness pinout verified: "+(ar.pinoutVerified?"Yes":"No")+" · Brick ECU installation tested: "+(ar.brickTested?"Yes":"No")+" · Evidence type: "+(ar.researchStatus||"unclassified")));
    const ul=elm("ul");
    for(const x of e.references||[]){
      const li=elm("li");const a=elm("a",null,x.label||"Technical source");
      a.href=x.url;a.target="_blank";a.rel="noopener noreferrer";li.append(a);
      if(x.scope)li.append(document.createTextNode(" — "+x.scope));
      ul.append(li);
    }
    if(ul.childElementCount) audit.append(ul);
    else audit.append(elm("p",null,"No engine-specific external source verified; firmware reference links follow."));
    details.append(top,scores,scoreDisclaimer,confidenceLayerSection(e),grid,researchSection(e),integration,conflicts,audit,note,warning,refs);
  }
  function renderList(){
    const found=filtered();list.replaceChildren();
    count.textContent=found.length+" matching engine preset"+(found.length===1?"":"s")+" · "+records.length+" research entries";
    if(!found.length)list.append(elm("p","ef-empty","No matching entries. Try an engine code (for example LS3, M54B30, K24A2, VQ35DE) or reset the filters."));
    const frag=document.createDocumentFragment();
    found.slice(0,shown).forEach(e=>{
      const row=elm("button","ef-result"+(e.id===selected?" selected":""),"");
      row.type="button";row.setAttribute("aria-pressed",String(e.id===selected));
      row.append(elm("span","ef-result-name",e.model),elm("span","ef-result-family",e.make+" · "+e.family),elm("span","ef-result-trigger",e.crank),elm("span","ef-result-ratings","Big "+(e.confidenceV2?.big?.score??e.confidence?.big??0)+"/100   ·   Mini "+(e.confidenceV2?.mini?.score??e.confidence?.mini??0)+"/100"),elm("span","ef-mini-status",statusText[e.level]));
      row.addEventListener("click",()=>choose(e.id,true));
      frag.append(row);
    });
    list.append(frag);
    more.hidden=found.length<=shown;
    more.textContent="Show more results ("+Math.min(40,Math.max(0,found.length-shown))+" next)";
  }
  function render(){renderList();renderDetails();}
  function choose(id,changeHash){
    const e=byId.get(id);if(!e)return;
    selected=id;
    make.value=e.make;populateFamily(e.family);populateVariant(id);
    search.value="";
    shown=40;render();
    if(changeHash)history.replaceState(null,"","#engine="+encodeURIComponent(id));
  }
  make.addEventListener("change",()=>{selected=null;populateFamily("");populateVariant("");shown=40;render();});
  family.addEventListener("change",()=>{selected=null;populateVariant("");shown=40;render();});
  variant.addEventListener("change",()=>{selected=variant.value||null;shown=40;render();if(selected)history.replaceState(null,"","#engine="+encodeURIComponent(selected));});
  search.addEventListener("input",()=>{shown=40;selected=null;render();});
  more.addEventListener("click",()=>{shown+=40;renderList();});
  reset.addEventListener("click",()=>{make.value="";populateFamily("");populateVariant("");search.value="";selected=null;shown=40;history.replaceState(null,"",window.location.pathname+window.location.search);render();});
  function fromHash(){
    const m=window.location.hash.match(/^#engine=(.+)$/);
    if(!m)return;
    let id;try{id=decodeURIComponent(m[1]);}catch(_){return;}
    if(byId.has(id))choose(id,false);
  }
  populateMake("");populateFamily("");populateVariant("");render();fromHash();
  window.addEventListener("hashchange",fromHash);
})();
