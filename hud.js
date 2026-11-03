/* Brick ECU HUD interactions — progressive enhancement, no dependencies. */
(()=>{"use strict";
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
const progress=document.querySelector(".hud-bar-progress");
const sectionLinks=[...document.querySelectorAll('nav .links a[href^="#"]')];
let scrollQueued=false;
function onScroll(){if(scrollQueued)return;scrollQueued=true;requestAnimationFrame(()=>{const doc=document.documentElement;const max=doc.scrollHeight-doc.clientHeight;if(progress)progress.style.transform="scaleX("+(max>0?Math.min(1,window.scrollY/max):0)+")";scrollQueued=false;});}
window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll,{passive:true});onScroll();
const revealNodes=[...document.querySelectorAll(".section .product,.section .spec,.section .feature,.section .order-card,.section .hardware-gallery figure,.hero-grid>div,.stat")];
if("IntersectionObserver" in window && !reduce.matches){
 const revealObserver=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add("is-visible");revealObserver.unobserve(entry.target)}}},{threshold:.08,rootMargin:"0px 0px -25px 0px"});
 revealNodes.forEach((el,i)=>{el.setAttribute("data-reveal","");el.style.transitionDelay=((i%3)*75)+"ms";revealObserver.observe(el)});
}else revealNodes.forEach(el=>el.classList.add("is-visible"));
const linksById=new Map(sectionLinks.map(a=>[a.getAttribute("href").slice(1),a]));
if("IntersectionObserver" in window){
 const obs=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){sectionLinks.forEach(a=>a.removeAttribute("aria-current"));const a=linksById.get(entry.target.id);if(a)a.setAttribute("aria-current","location")}}},{rootMargin:"-20% 0px -65% 0px"});
 document.querySelectorAll("section[id]").forEach(el=>obs.observe(el));
}
const visual=document.querySelector(".visual");
if(visual&&!reduce.matches){
 let frame=0;
 visual.addEventListener("pointermove",ev=>{
  if(ev.pointerType==="touch")return;
  if(frame)cancelAnimationFrame(frame);
  frame=requestAnimationFrame(()=>{const r=visual.getBoundingClientRect();const x=(ev.clientX-r.left)/r.width-.5;const y=(ev.clientY-r.top)/r.height-.5;const hud=visual.querySelector(".hero-hud");const radar=visual.querySelector(".radar-card");if(hud)hud.style.transform="translate("+(-x*11)+"px,"+(-y*9)+"px)";if(radar)radar.style.transform="translate("+(x*8)+"px,"+(y*7)+"px)";});
 });
 visual.addEventListener("pointerleave",()=>{visual.querySelectorAll(".hero-hud,.radar-card").forEach(x=>x.style.transform="")});
}
})();
