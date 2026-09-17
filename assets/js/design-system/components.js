import {esc,icon,eventCard,modal,toast} from '../renderers.js';
import * as r from '../services/repository.js';
import {addOpacity,formatRegion,positionLayer,getTypographyStyle} from './utilities.js';
const btn=(text,extra='',cls='')=>`<button type="button" class="${cls.includes('ds-chip')?cls:'button '+cls}" ${extra}>${text}</button>`;
const input=(type='text',extra='')=>`<input class="ds-input" type="${type}" ${extra}>`;
const avatars=()=>`<div class="ds-avatars" aria-label="참가자: 김민수, 이서연, 박지훈 외 3명">${['김','이','박','+3'].map((n,i)=>`<span class="ds-avatar" style="--avatar-color:var(${['--semantic-background-status-positive','--semantic-surface-blue','--semantic-surface-violet','--semantic-background-status-cautionary'][i]})">${n}</span>`).join('')}</div>`;
const choose=(labels=['전체','골프','펜싱'])=>`<div class="ds-choice" role="group" aria-label="보기 선택">${labels.map((l,i)=>btn(l,`data-choice aria-pressed="${!i}"`)).join('')}</div><p class="ds-result" role="status">${labels[0]} 선택</p>`;
const stepper=()=>`<ol class="ds-steps">${['정보 입력','내용 확인','신청 완료'].map((s,i)=>`<li ${i===0?'aria-current="step"':''}><span>${i+1}</span>${s}</li>`).join('')}</ol><div class="ds-flex">${btn('이전','data-step="-1" disabled','ds-outline')}${btn('다음','data-step="1"')}</div>`;
const field=()=>`<form data-example-form novalidate><label for="example-name">이름 <span aria-hidden="true">*</span></label>${input('text','id="example-name" name="name" required autocomplete="off" placeholder="이름을 입력하세요" aria-describedby="example-help example-error"')}<p id="example-error" class="ds-error" aria-live="polite"></p><button class="button" type="submit">입력 확인</button></form>`;
const pop=(menu=false)=>`${btn(menu?'추가 작업':'상세 안내','popovertarget="example-popover" data-layer-trigger','ds-outline')}<div id="example-popover" popover="auto" class="ds-popover">${menu?`<nav aria-label="추가 작업">${['공유 링크 확인','즐겨찾기 추가','목록에 보관'].map(l=>btn(l,'data-menu-action','ds-text')).join('')}</nav>`:'<strong>대회 참가 안내</strong><p>직장인 개인회원으로 참가할 수 있습니다.</p>'}</div><p class="ds-result" role="status"></p>`;
export function renderComponent(id){switch(id){
 case 'action-area':return `<p>신청 내용을 확인한 뒤 제출해주세요.</p><div class="ds-action-area">${btn('취소','data-demo-toast','ds-outline')}${btn('신청 확정','data-demo-toast')}</div>`;
 case 'button':return btn(`${icon('add-line')} 참가 신청`,'data-demo-toast');
 case 'chip':return `<div class="ds-flex">${['골프','펜싱','승마'].map((l,i)=>btn(l,`data-toggle aria-pressed="${!i}"`,'ds-chip')).join('')}</div>`;
 case 'icon-button':return `<div class="ds-flex">${[['search-line','검색'],['heart-line','좋아요'],['more-2-fill','더보기']].map(([i,l])=>btn(icon(i),`aria-label="${l}" data-demo-toast`,'ds-icon ds-outline')).join('')}</div>`;
 case 'text-button':return btn(`전체보기 ${icon('arrow-right-line')}`,'data-demo-toast','ds-text');
 case 'accordion':return `<div class="ds-accordion">${['참가 자격을 알려주세요','신청 내역은 어디에서 확인하나요?','신청을 취소할 수 있나요?'].map((s,i)=>`<details ${i===0?'open':''}><summary>${s}</summary><p>${['직장인 개인회원으로 가입 후 대회별 자격 조건을 확인해주세요.','마이페이지의 참가 내역에서 접수 상태를 확인할 수 있습니다.','취소 가능 기간 안에 마이페이지에서 취소할 수 있습니다.'][i]}</p></details>`).join('')}</div>`;
 case 'avatar':return `<div class="ds-flex">${['sm','md','lg'].map(s=>`<span class="ds-avatar" style="width:var(--avatar-${s});height:var(--avatar-${s})" aria-label="김민수 프로필">김</span>`).join('')}<span>김민수 · 개인회원</span></div>`;
 case 'avatar-group':return avatars();
 case 'card':return `<div class="ds-card-example">${eventCard(r.listEvents()[0])}</div>`;
 case 'content-badge':return `<div class="ds-flex">${['접수중','접수예정','마감','반려'].map((s,i)=>`<span class="ds-badge" data-tone="${['positive','cautionary','neutral','negative'][i]}">${s}</span>`).join('')}</div>`;
 case 'list-card':return `<a class="ds-list-card" href="/event.php?id=event-1"><img src="/assets/images/golf.webp" alt="골프 코스"><div><span class="ds-badge">골프</span><h3>2026 직장인 그린컵</h3></div>${icon('arrow-right-s-line')}</a>`;
 case 'list-cell':return `<div class="ds-list">${['회원 정보','신청 내역','교육 이수'].map((n,i)=>`<a href="/mypage.php?tab=${['profile','events','education'][i]}"><span>${icon(['user-line','file-list-line','book-line'][i])}${n}</span>${icon('arrow-right-s-line')}</a>`).join('')}</div>`;
 case 'play-badge':return `<div class="ds-video-thumb"><img src="/assets/images/video-poster.jpg" alt="축구 훈련 영상 미리보기">${btn(icon('play-fill'),'data-open="video" aria-label="축구 영상 재생"','ds-icon')}</div>`;
 case 'section-header':return `<div class="ds-section-header"><div><p class="ds-help">SPORTS & PEOPLE</p><h3>함께 도전하는 대회</h3><p>다음 일정을 만나보세요.</p></div><a class="button ds-text" href="/events.php">전체보기 ${icon('arrow-right-line')}</a></div>`;
 case 'table':return `<div class="ds-table-scroll" tabindex="0" role="region" aria-label="대회 현황 표"><table class="ds-table"><caption>대회 접수 현황</caption><thead><tr><th scope="col">대회명</th><th scope="col">종목</th><th scope="col">상태</th></tr></thead><tbody>${[['그린컵','골프','접수중'],['퇴근 후 챌린지','펜싱','접수중'],['가을 페스티벌','승마','접수예정']].map(x=>`<tr>${x.map(t=>`<td>${t}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 case 'thumbnail':return `<div class="ds-thumbnails">${['1 / 1','4 / 3','16 / 9'].map(a=>`<figure><img src="/assets/images/golf-800.webp" alt="초록빛 골프 코스" style="aspect-ratio:${a}"><figcaption>${a}</figcaption></figure>`).join('')}</div>`;
 case 'alert':return btn('안내 확인','data-open="alert"');
 case 'fallback-view':return `<div class="ds-empty">${icon('search-line')}<h3>검색 결과가 없습니다</h3><p>검색어를 줄이거나 다른 종목을 선택해주세요.</p>${btn('조건 초기화','data-empty-reset','ds-outline')}<p class="ds-result" role="status"></p></div>`;
 case 'push-badge':return `<div class="ds-push">${btn(icon('notification-3-line'),'aria-label="새 알림 3건" data-demo-toast','ds-icon ds-outline')}<span aria-hidden="true">3</span></div>`;
 case 'section-message':return `<div class="ds-stack">${[['info','안내','접수 마감일을 확인해주세요.'],['positive','완료','신청 내용이 확인되었습니다.'],['negative','오류','필수 입력값을 확인해주세요.']].map(([tone,t,d])=>`<div class="ds-message" data-tone="${tone}">${icon(tone==='negative'?'error-warning-line':'information-line')}<div><strong>${t}</strong><p>${d}</p></div></div>`).join('')}</div>`;
 case 'snackbar':return `<p id="example-saved">임시 내용이 아직 보관되지 않았습니다.</p>${btn('임시 보관','data-snackbar')}<div class="ds-snackbar" hidden role="status"><span>임시 보관했습니다.</span>${btn('실행 취소','data-undo','ds-text')}</div>`;
 case 'toast':return btn('완료 메시지 표시','data-demo-toast');
 case 'loading':return `<div class="ds-flex" role="status" aria-busy="true"><span class="ds-spinner" aria-hidden="true"></span><span>콘텐츠를 불러오고 있습니다.</span></div>`;
 case 'skeleton':return `<div role="status" aria-label="카드 로딩 중" aria-busy="true"><div class="ds-skeleton" aria-hidden="true"><div></div><span></span><span></span></div></div>`;
 case 'bottom-navigation':return `<nav class="ds-bottom-nav" aria-label="주요 화면 예시">${[['home-5-line','홈','/index.php'],['trophy-line','대회','/events.php'],['user-line','마이','/mypage.php']].map(([i,t,l])=>`<a href="${l}">${icon(i)}${t}</a>`).join('')}</nav>`;
 case 'category':return choose();
 case 'segmented-control':return choose(['목록','캘린더']);
 case 'page-counter':case 'pagination':case 'pagination-dots':return `<nav class="ds-pagination" aria-label="예시 페이지">${btn(icon('arrow-left-s-line'),'data-page-step="-1" aria-label="이전 페이지" disabled','ds-icon ds-outline')}${id==='page-counter'?'<span><b data-page-number>1</b> / 3</span>':[1,2,3].map(n=>btn(id==='pagination-dots'?'<span class="ds-dot"></span>':n,`data-demo-page="${n}" aria-label="${n}페이지" ${n===1?'aria-current="page"':''}`,'ds-icon ds-outline')).join('')}${btn(icon('arrow-right-s-line'),'data-page-step="1" aria-label="다음 페이지"','ds-icon ds-outline')}</nav><p class="ds-result" role="status">1페이지 · 참가 안내</p>`;
 case 'progress-indicator':return `<label for="example-progress">진행률 <output id="progress-value">40%</output></label><progress id="example-progress" value="40" max="100">40%</progress>${btn('20% 진행','data-progress','ds-outline')}`;
 case 'progress-tracker':return stepper();
 case 'tab':return `<div class="ds-tabs" role="tablist" aria-label="대회 정보">${['안내','일정','준비물'].map((t,i)=>`<button role="tab" id="demo-tab-${i}" aria-controls="demo-panel" aria-selected="${!i}" tabindex="${i?-1:0}">${t}</button>`).join('')}</div><div role="tabpanel" id="demo-panel" aria-labelledby="demo-tab-0" tabindex="0">직장인을 위한 생활체육 프로그램입니다.</div>`;
 case 'top-navigation':return `<nav class="ds-top-nav" aria-label="대회 화면 탐색"><a href="/index.php" aria-label="홈으로">${icon('arrow-left-line')}</a><strong>대회·행사</strong><a href="/search.php" aria-label="검색">${icon('search-line')}</a></nav><p class="ds-help">사이트 실제 경로로 이동하는 링크입니다.</p>`;
 case 'autocomplete':return `<label for="example-auto">관심 종목</label>${input('text','id="example-auto" list="example-sports" placeholder="골프 또는 펜싱 입력"')}<datalist id="example-sports">${['골프','펜싱','승마','풋살'].map(s=>`<option value="${s}"></option>`).join('')}</datalist><p class="ds-help">브라우저 기본 후보 목록을 사용합니다.</p>`;
 case 'bottom-sheet':return btn('하단 시트 열기','data-open="sheet"');
 case 'menu':return pop(true);
 case 'popover':return pop();
 case 'popup':return btn('팝업 열기','data-open="popup"');
 case 'tooltip':return `<span class="ds-tooltip-wrap">${btn(icon('information-line'),'aria-label="참가 자격 도움말" aria-describedby="example-tooltip"','ds-icon ds-outline')}<span role="tooltip" id="example-tooltip">직장인 개인회원으로 참가할 수 있습니다.</span></span>`;
 case 'check-mark':return `<div class="ds-flex"><span class="ds-checkmark">${icon('check-line')} 확인 완료</span><span class="ds-help">정보성 상태 표시</span></div>`;
 case 'checkbox':return `<fieldset><legend>관심 종목 (복수 선택)</legend><div class="ds-stack">${['골프','펜싱','승마'].map((t,i)=>`<label class="ds-check"><input type="checkbox" ${!i?'checked':''}>${t}</label>`).join('')}</div></fieldset>`;
 case 'date-picker':return `<label for="example-date">참가 희망일</label>${input('date','id="example-date" value="2026-10-10" min="2026-09-01" max="2026-12-31"')}<p class="ds-help">2026년 9월 1일 ~ 12월 31일</p>`;
 case 'filter-button':return `${btn(`${icon('filter-3-line')} 접수중 <span data-filter-count>0</span>`,'data-filter-toggle aria-pressed="false"','ds-outline')}<p class="ds-result" role="status">모든 상태를 표시합니다.</p>`;
 case 'framed-style':return `<fieldset><legend>참가 유형</legend><div class="ds-frame-grid">${['개인 참가','팀 참가'].map((t,i)=>`<label class="ds-framed"><input type="radio" name="example-framed" ${!i?'checked':''}><strong>${t}</strong><span>${i?'동료와 함께 참가합니다.':'개인 일정에 맞춰 참가합니다.'}</span></label>`).join('')}</div></fieldset>`;
 case 'radio':return `<fieldset><legend>연락 방법</legend><div class="ds-flex">${['이메일','문자'].map((t,i)=>`<label class="ds-check"><input type="radio" name="example-radio" ${!i?'checked':''}>${t}</label>`).join('')}</div></fieldset>`;
 case 'search-field':return `<form data-example-search><label for="example-search">종목 검색</label><div class="ds-search-input">${input('search','id="example-search" placeholder="골프, 펜싱, 승마, 풋살"')}<button class="button ds-icon" aria-label="검색 실행">${icon('search-line')}</button></div><p class="ds-result" role="status">검색어를 입력해주세요.</p></form>`;
 case 'select':return `<label for="example-select">활동 지역</label><select class="ds-input" id="example-select"><option>서울</option><option>경기</option><option>인천</option><option>부산</option></select>`;
 case 'slider':return `<label for="example-range">참가 인원 <output id="range-value">10명</output></label><input id="example-range" type="range" min="1" max="30" value="10" aria-describedby="range-value"><p class="ds-help">1명 ~ 30명 · 방향키로 조절</p>`;
 case 'switch':return `<label class="ds-switch"><input type="checkbox" role="switch" id="example-switch"><span aria-hidden="true"></span>알림 받기</label><p class="ds-result" role="status">알림 꺼짐</p>`;
 case 'text-area':return `<label for="example-textarea">문의 내용</label><textarea class="ds-input" id="example-textarea" maxlength="200" rows="4" placeholder="내용을 입력해주세요" aria-describedby="textarea-count"></textarea><p class="ds-help" id="textarea-count">0 / 200</p>`;
 case 'text-field':return field();
 case 'time-picker':return `<label for="example-time">시작 시간</label>${input('time','id="example-time" value="18:30" step="900"')}<p class="ds-help">15분 단위로 입력합니다.</p>`;
 default:return '<p>사용 예제를 준비하지 못했습니다.</p>';
}}
export function renderUtility(id){
 const reuse={'dismissable-layer':'popover','focus-scope':'popup','form':'text-field','label':'text-field','portal':'popup','popper':'popover','use-alert':'alert','use-snackbar':'snackbar','use-toast':'toast'};
 if(reuse[id])return renderComponent(reuse[id]);
 switch(id){
 case 'animation-presence':return `${btn('표시 전환','data-presence aria-expanded="true" aria-controls="presence-box"')}<div id="presence-box" class="ds-box ds-presence">자연스러운 등장과 퇴장</div>`;
 case 'box':return '<div class="ds-box">Box · padding 24 · radius 12 · surface</div>';
 case 'divider':return '<p>기본 정보</p><hr class="ds-divider"><p>참가 정보</p>';
 case 'flex-box':return `<div class="ds-flex">${['왼쪽','가운데','오른쪽'].map(t=>`<div class="ds-box">${t}</div>`).join('')}</div>`;
 case 'force-theme':case 'use-theme-control':return `${btn('영역 테마 전환','data-force-theme','ds-outline')}<div class="ds-box" data-theme-sample data-ds-theme="dark"><strong>독립적인 표면</strong><p>한 영역에서 밝고 어두운 테마를 비교합니다.</p></div>`;
 case 'grid':return `<div class="ds-demo-grid">${[1,2,3,4,5,6].map(n=>`<div class="ds-box">${n}</div>`).join('')}</div>`;
 case 'no-ssr':return '<div class="ds-message" data-client-only role="status">브라우저 마운트 대기</div><noscript>JavaScript를 켜면 클라이언트 예시가 표시됩니다.</noscript>';
 case 'region-config':return '<label for="example-locale">표시 지역</label><select class="ds-input" id="example-locale"><option value="ko-KR">한국어</option><option value="en-US">English (US)</option><option value="ja-JP">日本語</option></select><p class="ds-result" role="status" id="locale-result"></p>';
 case 'scroll-area':return `<div class="ds-scroll-area" tabindex="0" role="region" aria-label="스크롤 가능한 참가 안내">${Array.from({length:12},(_,i)=>`<p>${i+1}. 참가 안내 · 키보드 방향키로 스크롤할 수 있습니다.</p>`).join('')}</div>`;
 case 'typography':case 'typography-style':return ['title-3','body-1','caption-1'].map(n=>`<p style="${getTypographyStyle(n)}">${n} · 스포츠로 연결되는 일상</p>`).join('');
 case 'with-interaction':return btn('포인터와 키보드로 확인','data-demo-toast','ds-interactive ds-outline');
 case 'add-opacity':return `<div class="ds-flex">${[1,.72,.4,.16].map(a=>`<div class="ds-opacity" style="background:${addOpacity('#176b45',a)}">${a}</div>`).join('')}</div>`;
 case 'aria-hidden':return btn(`${icon('check-line')} 신청 확인`,'data-demo-toast');
 case 'container-style':return '<div class="ds-container ds-box">max-width: 1320px<br>모바일 20px / 데스크톱 48px</div>';
 case 'ellipsis-typography-style':return '<div class="ds-box" style="max-width:280px"><p class="ds-ellipsis">한 줄로 요약되는 긴 제목입니다. 원문은 DOM에 유지됩니다.</p><hr><p class="ds-clamp">대한직장인체육회는 일상 속 스포츠 활동을 통해 건강한 내일을 만들어갑니다. 함께 참여하고 배우는 즐거움을 경험해보세요. 두 줄 이후는 줄임표로 표시합니다.</p></div>';
 case 'gradient':return '<div class="ds-gradient">SPORTS CONNECTS US</div>';
 case 'list-style':return '<ul class="ds-styled-list"><li>참가 자격 확인</li><li>필수 정보 입력</li><li>신청 내역 확인</li></ul>';
 case 'media':return '<div class="ds-box"><strong data-media-label></strong><p>600px 미만 Mobile / 600–1199px Tablet / 1200px 이상 Desktop</p></div>';
 case 'navigation':return '<nav class="ds-flex" aria-label="사이트 탐색 예시"><a class="button ds-outline" href="/events.php">대회 목록</a><a class="button ds-outline" href="/education.php">교육 목록</a></nav>';
 case 'use-size':return '<div class="ds-resize" data-measure><strong>오른쪽 아래 모서리를 드래그하세요</strong><p data-size-result role="status"></p></div>';
 default:return '<p>이 유틸리티의 문서 예제는 제공되지 않습니다.</p>';
 }
}
export function bindExamples(root){
 const on=(selector,event,fn)=>root.querySelectorAll(selector).forEach(el=>el.addEventListener(event,e=>fn(e,el)));
 root.querySelector('.ds-tabs')?.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const tabs=[...root.querySelectorAll('[role=tab]')],i=tabs.indexOf(document.activeElement),next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();tabs[next].click();});
 const tooltip=root.querySelector('.ds-tooltip-wrap');if(tooltip){tooltip.addEventListener('keydown',e=>{if(e.key==='Escape')tooltip.classList.add('ds-tooltip-dismissed');});tooltip.addEventListener('focusout',()=>tooltip.classList.remove('ds-tooltip-dismissed'));tooltip.addEventListener('mouseleave',()=>tooltip.classList.remove('ds-tooltip-dismissed'));}
 on('[data-demo-toast]','click',()=>toast('동작을 확인했습니다.'));
 on('[data-toggle]','click',(_,el)=>el.setAttribute('aria-pressed',String(el.getAttribute('aria-pressed')!=='true')));
 on('[data-choice]','click',(_,el)=>{root.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===el)));root.querySelector('.ds-result').textContent=el.textContent+' 선택';});
 on('[data-open]','click',(_,el)=>{const kind=el.dataset.open;const d=modal(kind==='sheet'?'참가 방식 선택':kind==='video'?'축구 훈련 영상':'내용 확인',`<div class="ds-demo">${kind==='video'?'<video controls playsinline class="ds-video" src="/assets/videos/field-training.mp4"></video><p>스톡 영상 · 실제 행사 기록이 아닙니다.</p>':`<div class="ds-action-area">${btn('취소','data-close','ds-outline')}${btn('확인','data-close')}</div>`}</div>`);d.classList.toggle('ds-bottom-sheet',kind==='sheet');d.dataset.dsTheme=document.getElementById('ds-root')?.dataset.dsTheme||'light';});
 on('[data-layer-trigger]','click',(_,el)=>requestAnimationFrame(()=>{const layer=document.getElementById('example-popover');if(layer.matches(':popover-open')){layer.dataset.dsTheme=document.getElementById('ds-root')?.dataset.dsTheme||'light';positionLayer(el,layer);}}));
 on('[data-menu-action]','click',(_,el)=>{root.querySelector('.ds-result').textContent=el.textContent+' 완료';document.getElementById('example-popover').hidePopover();});
 on('[data-example-form]','submit',(e,el)=>{e.preventDefault();const i=el.querySelector('input'),bad=!i.value.trim();i.setAttribute('aria-invalid',String(bad));el.querySelector('.ds-error').textContent=bad?'이름을 입력해주세요.':'입력 형식이 올바릅니다. 저장되지 않았습니다.';if(bad)i.focus();});
 on('[data-example-search]','submit',(e,el)=>{e.preventDefault();const q=el.querySelector('input').value.trim(),results=['골프','펜싱','승마','풋살'].filter(t=>t.includes(q));el.querySelector('.ds-result').textContent=results.length?`${results.length}개 종목 · ${results.join(', ')}`:'검색 결과가 없습니다.';});
 on('[data-empty-reset]','click',(_,el)=>{el.parentElement.querySelector('.ds-result').textContent='검색 조건을 초기화했습니다. 전체 4개 종목을 확인할 수 있습니다.';});
 on('[data-snackbar]','click',()=>{root.querySelector('#example-saved').textContent='임시 보관된 내용이 있습니다.';root.querySelector('.ds-snackbar').hidden=false;});
 on('[data-undo]','click',()=>{root.querySelector('#example-saved').textContent='임시 보관을 취소했습니다.';root.querySelector('.ds-snackbar').hidden=true;});
 let page=1;const updatePage=n=>{page=Math.max(1,Math.min(3,n));root.querySelectorAll('[data-demo-page]').forEach(b=>{if(+b.dataset.demoPage===page)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');});root.querySelector('[data-page-number]')?.replaceChildren(String(page));root.querySelector('[data-page-step="-1"]').disabled=page===1;root.querySelector('[data-page-step="1"]').disabled=page===3;root.querySelector('.ds-result').textContent=`${page}페이지 · ${['참가 안내','일정 확인','준비물 안내'][page-1]}`;};
 on('[data-demo-page]','click',(_,el)=>updatePage(+el.dataset.demoPage));on('[data-page-step]','click',(_,el)=>updatePage(page+Number(el.dataset.pageStep)));
 on('[data-progress]','click',()=>{const p=root.querySelector('progress');p.value=p.value===100?0:p.value+20;root.querySelector('#progress-value').textContent=p.value+'%';});
 let step=0;on('[data-step]','click',(_,el)=>{step=Math.max(0,Math.min(2,step+Number(el.dataset.step)));root.querySelectorAll('.ds-steps li').forEach((li,i)=>{li.removeAttribute('aria-current');li.classList.toggle('complete',i<step);if(i===step)li.setAttribute('aria-current','step');});root.querySelector('[data-step="-1"]').disabled=!step;root.querySelector('[data-step="1"]').disabled=step===2;});
 on('[role=tab]','click',(_,el)=>{root.querySelectorAll('[role=tab]').forEach(t=>{t.setAttribute('aria-selected',String(t===el));t.tabIndex=t===el?0:-1;});const p=root.querySelector('[role=tabpanel]');p.setAttribute('aria-labelledby',el.id);p.textContent=['직장인을 위한 생활체육 프로그램입니다.','2026년 10월 10일에 진행합니다.','편한 운동복과 운동화를 준비해주세요.'][Number(el.id.slice(-1))];});
 on('#example-range','input',(_,el)=>root.querySelector('#range-value').textContent=el.value+'명');
 on('#example-textarea','input',(_,el)=>root.querySelector('#textarea-count').textContent=el.value.length+' / 200');
 on('#example-switch','change',(_,el)=>root.querySelector('.ds-result').textContent=el.checked?'알림 켜짐':'알림 꺼짐');
 on('[data-filter-toggle]','click',(_,el)=>{const active=el.getAttribute('aria-pressed')!=='true';el.setAttribute('aria-pressed',String(active));el.querySelector('[data-filter-count]').textContent=active?'1':'0';root.querySelector('.ds-result').textContent=active?'접수중인 항목만 표시합니다.':'모든 상태를 표시합니다.';});
 on('[data-presence]','click',(_,el)=>{const box=root.querySelector('#presence-box'),visible=el.getAttribute('aria-expanded')!=='true';el.setAttribute('aria-expanded',String(visible));box.classList.toggle('is-hidden',!visible);box.inert=!visible;});
 on('[data-force-theme]','click',()=>{const el=root.querySelector('[data-theme-sample]');el.dataset.dsTheme=el.dataset.dsTheme==='dark'?'light':'dark';});
 const locale=root.querySelector('#example-locale');const region=()=>{const result=formatRegion(locale.value);root.querySelector('#locale-result').textContent=result.date+' · '+result.number;};if(locale){locale.onchange=region;region();}
 const client=root.querySelector('[data-client-only]');if(client)client.textContent='브라우저에서 마운트되었습니다. DOM을 사용할 수 있습니다.';
 const measure=root.querySelector('[data-measure]');if(measure){const observer=new ResizeObserver(([entry])=>measure.querySelector('[data-size-result]').textContent=Math.round(entry.contentRect.width)+'px × '+Math.round(entry.contentRect.height)+'px');observer.observe(measure);window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});}
 const media=root.querySelector('[data-media-label]');if(media){const update=()=>media.textContent=innerWidth<600?'Mobile':innerWidth<1200?'Tablet':'Desktop';update();window.addEventListener('resize',update);}
}
