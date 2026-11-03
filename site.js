(()=>{"use strict";const toggle=document.querySelector(".menu-toggle"),menu=document.querySelector(".navlinks");if(toggle&&menu){toggle.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))})}document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());const list=[...document.querySelectorAll(".reveal")];const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if("IntersectionObserver" in window&&!reduce){const obs=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}},{threshold:.06});list.forEach(el=>obs.observe(el))}else list.forEach(el=>el.classList.add("visible"));const engineSearch=document.querySelector("#engine-search"),engineEcu=document.querySelector("#engine-ecu"),engineCards=[...document.querySelectorAll("[data-engine]")],engineCount=document.querySelector("#engine-count");function filter(){const q=(engineSearch?.value||"").trim().toLowerCase(),type=engineEcu?.value||"all";let n=0;engineCards.forEach(card=>{const ok=card.textContent.toLowerCase().includes(q)&&(type==="all"||card.dataset.ecus?.split(" ").includes(type));card.hidden=!ok;if(ok)n++});if(engineCount)engineCount.textContent=n+" engine reference entr"+(n===1?"y":"ies")}engineSearch?.addEventListener("input",filter);engineEcu?.addEventListener("change",filter);filter()})();

/* The documentation widget is always shown; AI availability is checked inside it.
 * Load as a module relative to the shared site.js URL on all static pages.
 */
{
 const script=document.currentScript||document.querySelector('script[src$="site.js"]');
 if(script?.src){
   const widget=document.createElement("script");
   widget.type="module";
   widget.src=new URL("./ai/widget.js",script.src).href;
   document.head.appendChild(widget);
 }
}
