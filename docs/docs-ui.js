/* Lightweight topic search and in-page section navigation for the docs only. */
(()=>{
 "use strict";
 const input=document.querySelector("#docs-search");
 if(input){
   const links=[...document.querySelectorAll("[data-doc-topic]")];
   const groups=[...document.querySelectorAll("[data-doc-group]")];
   const count=document.querySelector("#docs-search-count");
   const empty=document.querySelector("#docs-search-empty");
   const reset=document.querySelector("#docs-search-reset");
   function filter(){
     const terms=input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
     let total=0;
     links.forEach(link=>{
       const haystack=(link.dataset.search+" "+link.textContent).toLowerCase();
       const match=terms.every(term=>haystack.includes(term));
       link.hidden=!match;if(match)total++;
     });
     groups.forEach(group=>{group.hidden=![...group.querySelectorAll("[data-doc-topic]")].some(link=>!link.hidden);});
     if(empty)empty.hidden=total!==0;
     if(count)count.textContent=terms.length?(total+" matching guide"+(total===1?"":"s")):"Search across "+links.length+" guides or choose a topic below.";
   }
   input.addEventListener("input",filter);
   reset?.addEventListener("click",()=>{input.value="";filter();input.focus();});
   document.addEventListener("keydown",e=>{
     if(e.key==="/"&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&!/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||"")&&!document.activeElement?.isContentEditable){e.preventDefault();input.focus();}
     if(e.key==="Escape"&&document.activeElement===input){input.value="";filter();input.blur();}
   });
   filter();
 }
 const sections=[...document.querySelectorAll(".doc-main > section.frame")].filter(section=>section.querySelector(":scope > .frame-head strong"));
 if(sections.length>2){
   const nav=document.createElement("nav");nav.className="docs-section-nav";nav.setAttribute("aria-label","Jump to section");
   const heading=document.createElement("strong");heading.textContent="On this page";nav.append(heading);
   const used=new Set();
   sections.forEach((section,index)=>{
     if(!section.id){
       const raw=section.querySelector(":scope > .frame-head strong").textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
       let id=raw||"section-"+(index+1),n=2;
       while(document.getElementById(id)||used.has(id))id=(raw||"section")+"-"+n++;
       section.id=id;
     }
     used.add(section.id);
     const link=document.createElement("a");link.href="#"+section.id;
     const label=section.querySelector(":scope > .frame-head strong").textContent.trim();
     link.textContent=label.charAt(0)+label.slice(1).toLowerCase();nav.append(link);
   });
   sections[0].before(nav);
 }
})();
