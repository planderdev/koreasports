import {bindMobileMenu} from './mobile-menu.js';
import {setupHeaderNavigation} from './header-navigation.js';
import {setupWorkspace} from './workspace.js';
import * as r from './services/repository.js';
import {esc,icon,modal,toast,image} from './renderers.js';
export function setupShell(){if(['admin','design-system'].includes(document.body.dataset.page)){setupWorkspace();return;}const nav=r.content('navigation');setupHeaderNavigation(nav);
 document.getElementById('site-footer').innerHTML=`<div class="container footer-shell">
 <div class="footer-content"><div class="footer-information">
 <a class="footer-logo" href="/index.php"><img src="/assets/images/kowsc/logo-w.svg" alt="대한직장인체육회" width="374.73" height="120.87" loading="lazy"></a>
 <nav class="footer-policy" aria-label="하단 정책 및 안내"><a href="/page.php?id=privacy">개인정보처리방침</a><a href="/page.php?id=terms">이용약관</a><a href="/page.php?id=directions">오시는길</a><a href="/support.php?tab=partnership">제휴 문의</a></nav>
 <div class="footer-details"><strong>대한직장인체육회</strong><p>${esc(r.config().address)} · ${esc(r.config().email)}</p><p class="footer-copyright">© 2026 KOWSC. All rights reserved.</p></div>
 </div><div class="footer-related"><label class="sr-only" for="family-site">패밀리사이트</label><select id="family-site"><option value="">Family Site</option>${r.content('familySites').map(site=>`<option value="${esc(site.url)}">${esc(site.title)} (새 창)</option>`).join('')}</select><a class="footer-association-link" href="/page.php?id=associations">산하 종목협회 소개 ${icon('arrow-right-up-line')}</a>${r.collection('sponsors').length?`<div class="footer-partners">${r.collection('sponsors').map(s=>`<span>${esc(s.title)}</span>`).join('')}</div>`:''}</div></div>
 </div>`;
 const currentUrl=new URL(location.href);
 document.querySelectorAll('.footer-policy a').forEach(link=>{
  const target=new URL(link.href);
  const active=target.pathname===currentUrl.pathname&&[...target.searchParams].every(([key,value])=>currentUrl.searchParams.get(key)===value);
  link.classList.toggle('active',active);
  if(active)link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');
 });
 document.documentElement.classList.toggle('reduce-motion',!!r.state().reducedMotion);if(r.getCurrentMember()){const l=document.getElementById('login-link');l.innerHTML=icon('user-line')+'<span class="sr-only">마이페이지</span>';l.setAttribute('aria-label','마이페이지');l.href='/mypage.php';const logout=document.createElement('button');logout.textContent='로그아웃';logout.className='logout-button';logout.onclick=()=>{r.setRole('guest');location.href='/index.php';};l.after(logout);}
 document.getElementById('family-site').onchange=e=>{const value=e.target.value;if(!value)return;if(r.content('familySites').some(site=>site.url===value))window.open(value,'_blank','noopener,noreferrer');e.target.value='';};

 document.querySelectorAll('[data-menu]').forEach(b=>b.onclick=()=>{
  document.dispatchEvent(new Event('closeheadermenus'));
  const member=r.getCurrentMember();
  modal('전체메뉴',`<nav class="menu-account-links" aria-label="회원 및 검색"><a href="${member?'/mypage.php':'/login.php'}">${icon(member?'user-line':'login-box-line')}${member?'마이페이지':'로그인'}</a><a href="/join.php">${icon('user-add-line')}선수등록</a><a href="/search.php">${icon('search-line')}통합검색</a></nav><div class="menu-navigation"><nav class="menu-category-index" aria-label="전체메뉴 대분류">${nav.map((n,i)=>`<button type="button" data-menu-category="${i}" aria-controls="all-menu-section-${i}">${esc(n.title)}</button>`).join('')}</nav><nav class="all-menu" aria-label="전체 사이트 메뉴">${nav.map((n,i)=>`<section id="all-menu-section-${i}" aria-labelledby="all-menu-title-${i}"><h3 id="all-menu-title-${i}">${esc(n.title)}</h3><div>${n.items.map(x=>x.children?.length?`<div class="all-menu-branch"><a class="all-menu-parent" href="${esc(x.url)}">${esc(x.title)}</a><ul>${x.children.map(child=>`<li><a href="${esc(child.url)}">${esc(child.title)}</a></li>`).join('')}</ul></div>`:`<a href="${esc(x.url)}">${esc(x.title)}</a>`).join('')}</div></section>`).join('')}</nav></div>`);
  document.getElementById('modal').classList.add('menu-dialog');
  bindMobileMenu(document.getElementById('modal'));
 });
 const d=document.getElementById('modal');d.addEventListener('close',()=>{d.querySelectorAll('video').forEach(v=>v.pause());d.classList.remove('menu-dialog');d.returnFocus?.focus();document.dispatchEvent(new CustomEvent('modalchange',{detail:false}));});new MutationObserver(()=>{if(d.open)document.dispatchEvent(new CustomEvent('modalchange',{detail:true}));}).observe(d,{attributes:true,attributeFilter:['open']});document.addEventListener('click',e=>{if(e.target.closest('[data-close]'))d.close();});d.addEventListener('click',e=>{if(e.target===d){const rect=d.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)d.close();}});
 document.querySelector('.back-top').onclick=()=>document.dispatchEvent(new Event('scrolltotop'));
}
export function bindCommon(){if(['events','clubs','board','education','volunteers'].includes(document.body.dataset.page)){try{sessionStorage.setItem('kwsa-list:'+location.pathname,location.pathname+(location.search||'?'));}catch{}} document.querySelectorAll('[data-filter]').forEach(form=>form.onsubmit=e=>{e.preventDefault();const old=new URLSearchParams(location.search),q=new URLSearchParams();for(const [k,v] of new FormData(form))if(v)q.set(k,v);if(old.has('sort'))q.set('sort',old.get('sort'));location.search=q.toString();});document.querySelector('[data-sort]')?.addEventListener('change',e=>{const q=new URLSearchParams(location.search);q.set('sort',e.target.value);q.delete('p');location.search=q;});
 document.addEventListener('error',e=>{if(e.target instanceof HTMLImageElement&&!e.target.dataset.fallback){e.target.dataset.fallback='1';e.target.src='/assets/images/fallback.svg';e.target.alt+=' (대체 이미지)';}},true);
 document.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>{const p=r.content('mediaAssets').find(p=>p.id===b.dataset.photo);modal('스포츠로 빛나는 순간',`${image(p,'modal-image')}<p class="demo-note">스톡 이미지 · 실제 체육회 행사 사진이 아닙니다.<br>Photo: ${esc(p.author)} / Unsplash</p>`);});
 
 document.querySelectorAll('[data-video]').forEach(b=>b.onclick=()=>{const v=r.content('videoAssets').find(v=>v.id===b.dataset.video);modal(v.title,`<video class="modal-image" controls playsinline preload="metadata" poster="${v.poster}" src="${v.url}" aria-label="야간 축구 활동 스톡 영상"></video><p class="demo-note">예시 영상 · 실제 체육회 행사 기록이 아닙니다.<br>Video: ${v.author} / Pixabay. 소리 없는 현장 관찰 영상입니다.</p>`);});
 document.querySelectorAll('[role=tablist]').forEach(list=>{if(list.classList.contains('ds-tabs'))return;const tabs=[...list.querySelectorAll('[role=tab]')];tabs.forEach(t=>t.tabIndex=t.getAttribute('aria-selected')==='true'?0:-1);list.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();let index=tabs.indexOf(document.activeElement);index=e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[index].focus();tabs[index].click();});});
}
