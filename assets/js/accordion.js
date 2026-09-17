// Keep native details keyboard semantics and animate both directions.
export function initAccordions(){
 const initialized=new WeakSet();
 const decorate=()=>document.querySelectorAll('.accordion details,.ds-accordion details').forEach(details=>{
  if(initialized.has(details))return;
  const summary=details.querySelector(':scope > summary');if(!summary)return;
  initialized.add(details);
  const icon=document.createElement('i');icon.className='ri-arrow-down-s-line accordion-icon';icon.setAttribute('aria-hidden','true');summary.append(icon);
  let expanded=details.open,animation=null;
  details.dataset.expanded=String(expanded);
  summary.addEventListener('click',event=>{
   if(event.target.closest('a,button,input'))return;
   event.preventDefault();
   const start=details.getBoundingClientRect().height;
   animation?.cancel();animation=null;
   expanded=!expanded;details.dataset.expanded=String(expanded);
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||document.documentElement.classList.contains('reduce-motion');
   if(reduced){details.open=expanded;details.style.removeProperty('overflow');return;}
   details.open=true;
   const style=getComputedStyle(details),border=parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth);
   const end=expanded?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+border;
   const token=style.getPropertyValue('--duration-normal').trim();
   const duration=parseFloat(token)*(token.endsWith('ms')?1:1000)||200;
   details.style.overflow='hidden';
   animation=details.animate([{height:`${start}px`},{height:`${end}px`}],{duration,easing:'ease-in-out'});
   animation.onfinish=()=>{details.open=expanded;details.style.removeProperty('overflow');animation=null;};
  });
 });
 decorate();
 const observer=new MutationObserver(decorate);observer.observe(document.getElementById('main'),{childList:true,subtree:true});
 window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
}
