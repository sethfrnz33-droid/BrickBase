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
  const statusText={named:"Named decoder in rusEFI",pattern:"Wheel-pattern candidate",research:"Needs trigger verification",blocked:"Factory-system limitation"};
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
  function scoreCard(name,pct,verified=false){
    const card=elm("div","ef-score-card"+(pct===0&&!verified?" ef-score-zero":""));
    const header=elm("div","ef-score-header");
    header.append(elm("span","ef-score-name",name),elm("strong","ef-score-number",verified?"RUNNING":pct+"/100"));
    const meter=elm("progress","ef-score-meter");
    meter.max=100;meter.value=pct;meter.setAttribute("aria-label",name+" engineering screening score: "+pct+" out of 100; not a measured probability");
    card.append(header);if(!verified)card.append(meter);
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
    const v=e.confidenceV2,wrap=elm("section","ef-layered ef-fit-view");
    if(!v)return wrap;
    wrap.append(elm("h4",null,"Hardware fit"));
    wrap.append(elm("p","ef-layer-intro","Review Big Brick hardware fit by category, with engine-specific evidence and references."));
    const d=v.model||{};
    const quick=elm("dl","ef-fit-facts");
    quick.append(
      field("Injectors",d.stockGDI?"Factory direct injection — specialist hardware needed":d.injectorZ==="low"?"Factory low-impedance — check resistor/current limiting":"Standard high-impedance port injectors — natively supported"),
      field("Ignition",({smart:"Smart coils",dumb:"Passive coils — Big has six IGBT outputs","external-multi":"External ignition module","external-single":"Single coil / distributor with igniter",varies:"Varies by model year",unknown:"Factory coil details not yet listed"})[d.coilType]||"Check factory coil type"),
      field("Load signal",({map:"Factory MAP",both:"Factory MAP and MAF",maf:"Factory MAF (MAP can be added)","limited-map":"Factory boost MAP; verify range",mixed:"Varies by model year",unknown:"Factory MAP/MAF not yet listed"})[d.factoryLoadSensor]||""),
      field("VVT",d.vvtClass==="unknown"?"Details not yet listed":d.vvtClass)
    );
    wrap.append(quick);
    const list=elm("div","ef-layer-list");
    for(const b of v.big?.layers||[]){
      const panel=elm("details","ef-layer-item"),summary=elm("summary","ef-layer-summary");
      summary.append(elm("span","ef-layer-name",b.label),elm("span","ef-layer-chip","Big Brick "+b.score));
      panel.append(summary);
      const body=elm("div","ef-layer-body");
      const brief=(txt)=>String(txt||"").replace(/\b(NOT|SHARED|FOUR|TWO|ONE)\b/g,x=>x.toLowerCase());
      for(const [name,x] of [["Big Brick",b]]){
        const part=elm("div","ef-layer-evidence");
        part.append(elm("strong",null,name+" · "+x.state),elm("p",null,brief(x.detail)));
        if(x.refs?.length){
          const refs=elm("p","ef-layer-refs"),seen=new Set();
          for(const url of x.refs){if(seen.has(url)||!/^https:\/\//.test(url))continue;seen.add(url);
            let host="Technical source";try{host=new URL(url).hostname.replace(/^www\./,"");}catch(_){}
            const a=elm("a",null,host);a.href=url;a.target="_blank";a.rel="noopener noreferrer";refs.append(a);
          }
          part.append(refs);
        }
        body.append(part);
      }
      panel.append(body);list.append(panel);
    }
    wrap.append(list);
    return wrap;
  }
  function fold(label,content,expanded=false){
    const panel=elm("details","ef-subsection");
    const heading=elm("summary",null,label);
    panel.append(heading,content);
    if(expanded)panel.open=true;
    return panel;
  }
  function researchSection(e){
    const r=e.research,wrap=elm("section","ef-research");
    wrap.append(elm("h4",null,"OEM trigger-wheel research"));
    if(!r){
      const status=elm("p","ef-research-pending","Engine-specific OEM wheel research is pending. The trigger choices above are preliminary and must not be treated as verified for this variant.");
      wrap.append(status);
      return wrap;
    }
    const tr=e.technicalResearch||{};
    const badge=elm("p","ef-research-status","Trigger documentation: "+({
      "wheel-sourced":"Crank geometry documented; specific donor detail shown below",
      "family-wheel-sourced":"Family trigger documented; donor variant check required",
      "oem-wheel-sourced":"OEM crank geometry documented; decoder pairing under research",
      "partial-wheel-sourced":"Partial OEM wheel research; more evidence required",
      "hardware-constraint":"OEM hardware limitation identified",
      "generic-correlation-pending":"OEM shape documented; generic rusEFI cam/crank pairing needs validation",
      "decoder-only":"Decoder or catalogue reference checked; OEM variant-wheel evidence still missing"
    }[r.status]||"Research in progress"));
    const dl=elm("dl","ef-specs");
    dl.append(
      field("OEM crank / primary pattern",tr.crank||r.crankWheel),
      field("Crank / primary sensor type",tr.ckp||"Not established"),
      field("OEM cam / cycle reference",tr.cam||r.camWheel),
      field("Cam / phase sensor type",tr.cmp||"Not established"),
      field("rusEFI decoder correlation",tr.decoder||r.decoderCorrelation)
    );
    wrap.append(elm("p","ef-research-note","Trigger research is evaluated from OEM geometry and sensor/control references. A running vehicle is not required for a documented research result."));
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
      return "Factory GDI using external control is experimental and has not been validated on Big Brick.";
    }
    if(e.cyl>8)return "Big Brick: batch fuel/sequential spark may be possible up to 12 cylinders; no engine-specific allocation validated.";
    if(e.cyl>6)return "Big Brick: channel-count candidate for up to 8-cylinder sequential fuel and spark.";
    if(e.cyl>4)return "Big Brick: channel-count candidate for sequential fuel and spark.";
    return "Big Brick: preliminary channel-count candidate only; actual trigger, ignition and sensor integration are untested.";
  }
  function runningSection(e){
    const data=e.runningEvidence||{},wrap=elm("div","ef-running-evidence");
    if(data.brickBig){
      const strong=elm("strong",null,"Running on Big Brick");
      const p=elm("p",null,"Brick ECU developer-tested VQ35DE, with a successful running result.");
      wrap.append(strong,p);
    }else if(data.brickFamily){
      const strong=elm("strong",null,"Big Brick-tested engine family");
      const p=elm("p",null,"A Gen IV LS has been run successfully on Big Brick; the exact engine code has not been specified, so this is family-level evidence.");
      wrap.append(strong,p);
    }
    if(data.community?.length){
      const community=elm("details","ef-community-evidence");
      community.append(elm("summary",null,"rusEFI community examples ("+data.community.length+")"));
      const ul=elm("ul");
      for(const ex of data.community){
        const li=elm("li"),a=elm("a",null,ex.label);a.href=ex.url;a.target="_blank";a.rel="noopener noreferrer";
        li.append(a);
        if(ex.scope)li.append(elm("span",null," — "+ex.scope));
        ul.append(li);
      }
      community.append(ul);wrap.append(community);
    }
    return wrap.childElementCount?wrap:null;
  }
  function renderDetails(){
    details.replaceChildren();
    if(!selected||!byId.has(selected)){
      const empty=elm("div","ef-placeholder");
      empty.append(elm("h3",null,"Select an engine to explore its reference"),elm("p",null,"Choose an engine from the list or search by engine code."));
      details.append(empty);return;
    }
    const e=byId.get(selected),top=elm("div","ef-detail-top");
    const kicker=elm("span","ef-eyebrow",e.make+"  /  "+e.family);
    const title=elm("h3",null,e.model);
    const flag=elm("span","ef-level ef-level-"+e.level,e.technicalResearch?.stageLabel||statusText[e.level]);
    top.append(kicker,title,flag);
    const scores=elm("div","ef-scores");
    scores.append(scoreCard("Big Brick",e.confidenceV2?.big?.score??e.confidence?.big??0));
    const assessment=elm("section","ef-detail-note");
    assessment.append(elm("strong",null,"Control-method hardware assessment"));
    const hardware=elm("dl","ef-specs"),research=e.technicalResearch||{};
    hardware.append(field("Big Brick",research.bigAssessment||"Control and sensor research pending"));
    assessment.append(hardware);
    const scoreDisclaimer=elm("p","ef-score-disclaimer","Hardware-fit scores are a guide, not a reliability percentage. High-impedance port injectors are natively supported.");
    const grid=elm("dl","ef-specs");
    grid.append(field("Cylinders / rotors",e.cyl===0?"2 rotors":String(e.cyl)),field("Fuel system",e.fuel),field("Crank trigger",e.technicalResearch?.crank||e.crank),field("Cam / VVT reference",e.technicalResearch?.cam||e.cam));
    const note=elm("div","ef-detail-note");
    note.append(elm("strong",null,"Variant notes and cautions"),elm("p",null,e.notes));
    const warning=elm("div","notice warning");
    warning.hidden=e.level!=="blocked";warning.textContent="";
    if(e.level==="blocked"){
      const mod=e.confidenceV2?.model||{};
      warning.textContent=mod.stockGDI?"WARNING: Factory GDI/high-pressure injector control is not natively validated on Brick ECU. External GDI integration is experimental and unvalidated.":mod.rotary?"WARNING: Rotary fuel and leading/trailing ignition scheduling are not Brick ECU validated.":mod.stockOpticalCAS?"WARNING: Stock high-resolution Nissan optical CAS is not natively verified; an alternative trigger would need independent validation.":"WARNING: rusEFI marks this stock trigger decoder as unsupported/problematic. Do not claim validated compatibility.";
    }
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
    const int=e.integration||{},d=elm("dl","ef-specs"),hw=e.confidenceV2?.model||{};
    const inj=hw.stockGDI?"Factory direct injection uses specialist high-pressure control. Big Brick external GDI integration is experimental and unvalidated.":hw.injectorZ==="low"?"Original low-impedance injectors require appropriate current limiting"+(hw.factoryResistorPack===true?" (factory resistor pack is documented).":"; confirm the original resistor arrangement."):"Standard high-impedance (>8 Ω) port injectors work directly with Brick saturated injector outputs. No peak-and-hold controller is required.";
    const coil=hw.coilType==="smart"?"Factory smart coils have built-in power stages.":hw.coilType==="dumb"?"Factory passive coils need high-current ignition stages (six native IGBT-capable outputs on Big Brick).":hw.coilType==="external-multi"?"Factory coils use an external ignition module.":hw.coilType==="external-single"?"Distributor/single coil uses an external or integral igniter.":int.ignition;
    d.append(field("Crank / cam sensors",int.sensors),field("Ignition",coil),field("Injectors",inj),field("VVT / throttle / auxiliaries",int.actuators));
    integration.append(d);
    
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
    
    const ul=elm("ul");
    for(const x of e.references||[]){
      const li=elm("li");const a=elm("a",null,x.label||"Technical source");
      a.href=x.url;a.target="_blank";a.rel="noopener noreferrer";li.append(a);
      if(x.scope)li.append(document.createTextNode(" — "+x.scope));
      ul.append(li);
    }
    if(ul.childElementCount) audit.append(ul);
    else audit.append(elm("p",null,"No engine-specific external source verified; firmware reference links follow."));
    
    const panels=[
      fold("Engine and trigger reference",grid,true),
      fold("Crank / cam research",researchSection(e)),
      fold("Wiring and sensor details",integration),
      ...(issues.length?[fold("Conflicting sources and limitations ("+issues.length+")",conflicts)]:[]),
      fold("Variant notes",note),
      fold("References ("+(e.references?.length||0)+")",audit)
    ];
    const running=runningSection(e);details.append(top,assessment,scores,scoreDisclaimer,...(e.level==="blocked"?[warning]:[]),confidenceLayerSection(e),...panels,...(running?[running]:[]));
  }
  function renderList(){
    const found=filtered();list.replaceChildren();
    count.textContent=found.length+" matching engine record"+(found.length===1?"":"s")+" · "+records.length+" total";
    if(!found.length)list.append(elm("p","ef-empty","No matching entries. Try an engine code (for example LS3, M54B30, K24A2, VQ35DE) or reset the filters."));
    const frag=document.createDocumentFragment();
    found.slice(0,shown).forEach(e=>{
      const row=elm("button","ef-result"+(e.id===selected?" selected":""),"");
      row.type="button";row.setAttribute("aria-pressed",String(e.id===selected));
      row.append(elm("span","ef-result-name",e.model),elm("span","ef-result-family",e.make+" · "+e.family),elm("span","ef-result-trigger",e.technicalResearch?.crank||e.crank),elm("span","ef-result-ratings","Big "+(e.confidenceV2?.big?.score??e.confidence?.big??0)+"/100"),elm("span","ef-mini-status",e.technicalResearch?.stageLabel||statusText[e.level]));
      row.addEventListener("click",()=>choose(e.id,true));
      frag.append(row);
    });
    list.append(frag);
    more.hidden=found.length<=shown;
    more.textContent="Show "+Math.min(40,Math.max(0,found.length-shown))+" more engines";
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
