export function bindMobileMenu(dialog){
 const list=dialog.querySelector('.all-menu'),sections=[...list.children],buttons=[...dialog.querySelectorAll('[data-menu-category]')];
 const mobile=()=>matchMedia('(max-width:800px)').matches;
 const reduced=()=>matchMedia('(prefers-reduced-motion:reduce)').matches||document.documentElement.classList.contains('reduce-motion');
 const mark=index=>buttons.forEach((button,i)=>{if(i===index)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');});
 const scrollToSection=(index,behavior)=>{const top=sections[index].getBoundingClientRect().top-list.getBoundingClientRect().top+list.scrollTop;list.scrollTo({top,behavior});mark(index);};
 buttons.forEach((button,index)=>button.addEventListener('click',()=>scrollToSection(index,reduced()?'instant':'smooth')));
 const update=()=>{if(!mobile())return;let index=0;const top=list.getBoundingClientRect().top;sections.forEach((section,i)=>{if(section.getBoundingClientRect().top<=top+48)index=i;});if(list.scrollTop>0&&Math.ceil(list.scrollTop+list.clientHeight)>=list.scrollHeight-2)index=sections.length-1;mark(index);};
 list.addEventListener('scroll',update,{passive:true});
 const current=new URL(location.href);let active=0;
 list.querySelectorAll('a').forEach(link=>{const target=new URL(link.href);if(target.pathname===current.pathname&&[...target.searchParams].every(([key,value])=>current.searchParams.get(key)===value)){link.setAttribute('aria-current','page');active=sections.indexOf(link.closest('section'));}});
 mark(active);requestAnimationFrame(()=>{if(mobile()&&dialog.open)scrollToSection(active,'instant');});
}
