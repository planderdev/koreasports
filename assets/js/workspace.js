import * as r from './services/repository.js';
import {modal} from './renderers.js';
export function setupWorkspace(){
 document.getElementById('workspace-role').textContent=r.getRole()==='admin'?'관리자 데모 세션':'프론트 프로토타입';
 const logout=document.getElementById('workspace-logout');logout.hidden=r.getRole()!=='admin';logout.onclick=()=>{r.setRole('guest');location.reload();};
 document.getElementById('demo-reset').onclick=()=>{modal('시연 데이터 초기화','<p>현재 세션의 시연 내역을 초기 합성 데이터로 되돌립니다.</p><div class="form-actions"><button class="button secondary" data-close>돌아가기</button><button class="button" id="reset-confirm">초기화</button></div>');document.getElementById('reset-confirm').onclick=()=>{r.resetDemo();location.reload();};};
 const d=document.getElementById('modal');d.addEventListener('close',()=>{d.returnFocus?.focus();});document.addEventListener('click',e=>{if(e.target.closest('[data-close]'))d.close();});
}
