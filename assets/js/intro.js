import {getRole} from './services/repository.js';
const KEY='kwsa-intro-seen';
const remember=()=>{try{sessionStorage.setItem(KEY,'1');}catch{}};
export function bindIntro(){
 const intro=document.getElementById('site-intro'),root=document.documentElement;
 if(!intro||root.classList.contains('intro-seen'))return;
 const behind=[...document.body.children].filter(el=>el!==intro&&!['SCRIPT','DIALOG'].includes(el.tagName));
 behind.forEach(el=>{el.inert=true;});
 if(getRole()!=='guest'){
  intro.querySelector('[data-intro-member-title]').innerHTML='<b>회원님, 환영합니다.</b><br>신청 내역과 회원 서비스를 확인해보세요.';
  const login=intro.querySelector('[data-intro-login]');login.href='/mypage.php';login.querySelector('span').textContent='마이페이지';login.querySelector('i').className='ri-user-line';
  intro.querySelector('[data-intro-bubble]').hidden=true;
  const join=intro.querySelector('[data-intro-join]');join.href='/mypage.php?tab=card';join.querySelector('i').className='ri-qr-code-line';join.querySelector('strong').textContent='모바일 회원증';join.querySelector('.site-intro-card-text span').textContent='대회 현장에서 회원증을 바로 제시할 수 있습니다.';
 }
 const close=()=>{
  remember();
  behind.forEach(el=>{el.inert=false;});
  const done=()=>{root.classList.add('intro-seen');root.classList.remove('intro-leaving');document.getElementById('main')?.focus({preventScroll:true});};
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches||root.classList.contains('reduce-motion');
  if(reduced){done();return;}
  root.classList.add('intro-leaving');
  intro.addEventListener('transitionend',e=>{if(e.target===intro)done();},{once:true});
  setTimeout(done,700);
 };
 intro.querySelectorAll('[data-intro-enter]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();close();}));
 intro.querySelectorAll('[data-intro-leave]').forEach(a=>a.addEventListener('click',remember));
 intro.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
}
