import {initSelectControls} from './select-controls.js';
import {bindDesignSystem} from './pages/design-system.js';
import {renderPage} from './router.js';
import {setupShell,bindCommon} from './interactions.js';
import {bindHome} from './pages/home.js';
import {bindMember} from './pages/member.js';
import {bindAdmin} from './pages/admin.js';
import {initAnimations} from './animations.js';
setupShell();
try{document.getElementById('main').innerHTML=renderPage(document.body.dataset.page);const title=document.querySelector('main h1')?.textContent;document.title=(title?title+' | ':'')+'대한직장인체육회';bindCommon();bindHome();bindMember();bindAdmin();bindDesignSystem();initSelectControls();requestAnimationFrame(()=>initAnimations());}catch(error){console.error(error);document.getElementById('main').innerHTML='<div class="container content-section"><div class="empty"><h1>화면을 불러오지 못했습니다</h1><p>일시적인 오류입니다. 페이지를 새로고침하거나 데모 상태를 초기화해주세요.</p><a class="button" href="/index.php">홈으로 이동</a></div></div>';}
