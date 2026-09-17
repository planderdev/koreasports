import * as r from './services/repository.js';
import {modal} from './renderers.js';
export function setupWorkspace(){
 document.getElementById('workspace-role').textContent=r.getRole()==='admin'?'관리자':'';
 const logout=document.getElementById('workspace-logout');logout.hidden=r.getRole()!=='admin';logout.onclick=()=>{r.setRole('guest');location.reload();};
 const d=document.getElementById('modal');d.addEventListener('close',()=>{d.returnFocus?.focus();});document.addEventListener('click',e=>{if(e.target.closest('[data-close]'))d.close();});
}
