/* Animated Brick ECU menu highlights. Runs after HTML; no dependencies. */
(()=>{"use strict";
const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
const visual=document.querySelector(".visual");
if(visual&&!motion.matches){
 const field=document.createElement("div");field.className="hud-spark-field";field.setAttribute("aria-hidden","true");
 const sparks=[[8,23,10,7.5,-2],[23,81,7,10,-8],[38,12,8,8,-5],[59,32,6,11,-3],[76,75,9,9,-7],[92,18,5,8.5,-6],[11,63,4,10.5,-4],[48,93,7,12,-10],[83,44,6,9.5,-7],[69,9,5,11,-3],[30,48,6,10,-9],[56,70,4,8,-4]];
 for(const [x,y,size,duration,delay] of sparks){const s=document.createElement("i");s.className="hud-spark";s.style.setProperty("--fx-x",x+"%");s.style.setProperty("--fx-y",y+"%");s.style.setProperty("--fx-s",size+"px");s.style.setProperty("--fx-duration",duration+"s");s.style.setProperty("--fx-delay",delay+"s");field.appendChild(s)}
 visual.appendChild(field);
}
const menu=document.querySelector(".catalog-side");
if(!menu)return;
const links=[...menu.querySelectorAll('a[href^="#"]')];
if(!links.length)return;
const label=document.createElement("p");label.className="catalog-highlight";label.setAttribute("aria-live","off");
label.innerHTML="SELECTED: <b>MINI BRICK</b>";menu.appendChild(label);
function activate(item){links.forEach(a=>a.classList.toggle("is-selected",a===item));const title=item.firstChild?.textContent?.trim()||item.textContent.trim();label.replaceChildren(document.createTextNode("SELECTED: "));const strong=document.createElement("b");strong.textContent=title.toUpperCase();label.appendChild(strong)}
activate(links[0]);
links.forEach((a,i)=>{
 a.addEventListener("pointerenter",()=>activate(a));
 a.addEventListener("focus",()=>activate(a));
 a.addEventListener("keydown",e=>{
  if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"].includes(e.key))return;
  e.preventDefault();const next=(i+(["ArrowDown","ArrowRight"].includes(e.key)?1:-1)+links.length)%links.length;
  links[next].focus();
 });
});
})();
