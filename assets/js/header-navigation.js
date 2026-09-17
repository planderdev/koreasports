import {icon,esc} from './renderers.js';
export function setupHeaderNavigation(nav){
 const header=document.getElementById('site-header'),gnb=document.getElementById('gnb');
 const topRow=header.querySelector('.header-top'),desktop=matchMedia('(min-width:801px)');
 let lastScroll=Math.max(0,window.scrollY),framePending=false;
 const revealHeader=()=>header.classList.remove('is-nav-only');
 const syncHeaderSize=()=>{header.style.setProperty('--header-top-height',topRow.getBoundingClientRect().height+'px');revealHeader();lastScroll=Math.max(0,window.scrollY);};
 new ResizeObserver(syncHeaderSize).observe(topRow);
 window.addEventListener('scroll',()=>{
  if(framePending)return;
  framePending=true;
  requestAnimationFrame(()=>{
   const current=Math.max(0,window.scrollY),delta=current-lastScroll;
   if(!desktop.matches||current<=topRow.offsetHeight)revealHeader();
   else if(Math.abs(delta)>=6){
    header.classList.toggle('is-nav-only',delta>0);
    if(delta>0){topRow.querySelector('[aria-expanded="true"]')?.click();}
   }
   if(Math.abs(delta)>=6||current===0)lastScroll=current;
   framePending=false;
  });
 },{passive:true});
 header.addEventListener('focusin',revealHeader);
 desktop.addEventListener('change',syncHeaderSize);
 gnb.innerHTML=nav.map((n,i)=>`<div class="gnb-item"><button data-nav="${i}" aria-expanded="false" aria-controls="nav-panel-${i}">${esc(n.title)}</button><div class="gnb-panel" id="nav-panel-${i}" hidden><nav aria-label="${esc(n.title)} 하위 메뉴">${n.items.map((item,j)=>item.children?.length?`<div class="nav-branch"><div class="nav-branch-row"><a href="${item.url}">${esc(item.title)}</a><button class="nav-expand" data-subnav aria-expanded="false" aria-controls="nav-third-${i}-${j}" aria-label="${esc(item.title)} 3차 메뉴">${icon('arrow-right-s-line')}</button></div><div class="nav-third" id="nav-third-${i}-${j}" hidden>${item.children.map(child=>`<a href="${child.url}">${esc(child.title)}</a>`).join('')}</div></div>`:`<a href="${item.url}">${esc(item.title)}</a>`).join('')}</nav></div></div>`).join('');
 const subTriggers=[...gnb.querySelectorAll('[data-subnav]')];
 const setSub=(button,expanded)=>{if(expanded)subTriggers.filter(b=>b!==button).forEach(b=>setSub(b,false));button.setAttribute('aria-expanded',String(expanded));document.getElementById(button.getAttribute('aria-controls')).hidden=!expanded;};
 subTriggers.forEach(button=>{const branch=button.closest('.nav-branch');branch.addEventListener('mouseenter',()=>{if(matchMedia('(hover:hover)').matches)setSub(button,true);});branch.addEventListener('mouseleave',()=>{if(!branch.contains(document.activeElement))setSub(button,false);});branch.addEventListener('focusout',e=>{if(!branch.contains(e.relatedTarget))setSub(button,false);});button.onclick=()=>setSub(button,button.getAttribute('aria-expanded')!=='true');branch.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();setSub(button,true);branch.querySelector('.nav-third a').focus();}if(e.key==='ArrowLeft'||e.key==='Escape'){e.preventDefault();e.stopPropagation();setSub(button,false);button.focus();}});});
 const triggers=[...gnb.querySelectorAll('[data-nav]')],family=document.getElementById('header-associations'),familyButton=document.getElementById('association-toggle');
 const close=()=>{subTriggers.forEach(b=>setSub(b,false));triggers.forEach(b=>{b.setAttribute('aria-expanded','false');document.getElementById(b.getAttribute('aria-controls')).hidden=true;});family.hidden=true;familyButton.setAttribute('aria-expanded','false');};
 const open=b=>{close();b.setAttribute('aria-expanded','true');const panel=document.getElementById(b.getAttribute('aria-controls'));panel.hidden=false;panel.style.marginLeft='';const bounds=panel.getBoundingClientRect(),extra=panel.querySelector('.nav-third')?bounds.width:0;panel.style.marginLeft=`${-Math.max(0,bounds.right+extra-document.documentElement.clientWidth)}px`;};
 triggers.forEach(b=>{const item=b.closest('.gnb-item');item.addEventListener('mouseenter',()=>{if(matchMedia('(pointer:fine)').matches)open(b);});item.addEventListener('mouseleave',()=>{if(!item.contains(document.activeElement))close();});b.onclick=()=>open(b);b.onkeydown=e=>{if(e.key==='ArrowDown'){e.preventDefault();open(b);document.getElementById(b.getAttribute('aria-controls')).querySelector('a')?.focus();}if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();const next=triggers[(triggers.indexOf(b)+(e.key==='ArrowRight'?1:-1)+triggers.length)%triggers.length];close();next.focus();}};});
 familyButton.onclick=()=>{const expanded=familyButton.getAttribute('aria-expanded')==='true';close();if(!expanded){family.hidden=false;familyButton.setAttribute('aria-expanded','true');}};
 document.addEventListener('click',e=>{if(!header.contains(e.target))close();});
 header.addEventListener('focusout',e=>{if(!header.contains(e.relatedTarget))close();});
 header.addEventListener('keydown',e=>{if(e.key==='Escape'){const active=triggers.find(b=>b.getAttribute('aria-expanded')==='true')||(family.hidden?null:familyButton);close();active?.focus();}});
 document.addEventListener('closeheadermenus',close);
 matchMedia('(max-width:800px)').addEventListener('change',close);
}
