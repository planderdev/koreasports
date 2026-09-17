import {editorUrl} from './admin-content.js';
import * as r from './services/repository.js';
import {esc,icon,toast} from './renderers.js';

export function csvCell(value){const text=String(value??'');return '"'+(/^[\s]*[=+@-]/.test(text)?"'"+text:text).replaceAll('"','""')+'"';}
export function commonStatuses(rows){return rows.length?r.allowedAdminStatuses(rows[0]).filter(s=>rows.every(row=>r.allowedAdminStatuses(row).includes(s))):[];}
const labels={published:'게시',draft:'초안',true:'모집중',false:'모집마감'};
const choicesFor=key=>key==='members'?['활동','휴면']:key==='organizations'?['승인대기','승인','반려']:key==='clubs'?['true','false']:['published','draft'];

export function enhanceAdminTables(){
 document.querySelectorAll('.admin-main form[data-filter]').forEach(form=>{const reset=document.createElement('a');reset.className='button secondary';reset.textContent='필터 초기화';const type=new URLSearchParams(location.search).get('type');reset.href=location.pathname+(type?'?type='+encodeURIComponent(type):'');form.append(reset);});
 document.querySelectorAll('.admin-main .data-table-wrap').forEach((wrap,index)=>{
  const table=wrap.querySelector('table'),head=table.tHead.rows[0];
  const rows=[...table.tBodies[0].rows].filter(row=>!row.querySelector('td[colspan]'));
  const notification=head.cells[0]?.textContent.trim()==='선택';
  wrap.classList.add('admin-table-scroll');wrap.tabIndex=0;wrap.setAttribute('aria-label','관리 목록 · 가로 스크롤 가능');
  const card=document.createElement('section');card.className='admin-data-card';wrap.before(card);card.append(wrap);
  const toolbar=document.createElement('div');toolbar.className='admin-table-tools';
  toolbar.innerHTML=`<div><strong>목록 <span>${rows.length}</span></strong><span class="admin-table-hint">현재 검색 결과에서 선택</span></div><label class="admin-local-search">${icon('search-line')}<span class="sr-only">목록 ${index+1} 내 검색</span><input type="search" placeholder="목록 내 검색" aria-label="목록 ${index+1} 내 검색"></label>`;
  card.prepend(toolbar);
  const bar=document.createElement('div');bar.className='admin-bulk-bar';bar.innerHTML=`<span data-selection-count role="status" aria-live="polite">0개 선택</span><div><button class="button secondary small" data-clear disabled>선택 해제</button><button class="button secondary small" data-export disabled>${icon('download-2-line')}선택 CSV</button><button class="button small" data-bulk disabled>${icon('edit-2-line')}일괄 변경</button></div>`;wrap.before(bar);
  const footer=document.createElement('div');footer.className='admin-table-footer';footer.textContent=`${rows.length}개 항목 · 검색 결과 전체를 선택할 수 있습니다.`;card.append(footer);
  const th=notification?head.cells[0]:document.createElement('th');if(!notification)head.prepend(th);
  th.className='admin-check-cell';th.scope='col';th.innerHTML=`<label class="admin-check-target"><input type="checkbox" data-select-all aria-label="목록 ${index+1} 검색 결과 전체 선택"><span class="sr-only">전체 선택</span></label>`;
  const all=th.querySelector('input');all.disabled=!rows.length;
  if(!rows.length){const empty=table.querySelector('td[colspan]');if(empty&&!notification)empty.colSpan+=1;}
  const entries=rows.map((row,i)=>{
   const edit=row.querySelector('[data-edit]'),status=row.querySelector('[data-status]');
   const title=(notification?row.cells[1]:row.cells[0]).textContent.trim();
   let check=row.querySelector('[name=recipient]');
   if(!check){const td=document.createElement('td');td.className='admin-check-cell';td.innerHTML=`<label class="admin-check-target"><input type="checkbox" aria-label="${esc(title)} 선택"><span class="sr-only">선택</span></label>`;row.prepend(td);check=td.querySelector('input');}
   else{check.parentElement.classList.add('admin-check-cell');check.setAttribute('aria-label',title+' 선택');}
   return {row,check,title,id:status?.dataset.status||edit?.dataset.edit,key:edit?.dataset.key,type:status?'status':edit?'record':'read',text:row.textContent.toLocaleLowerCase()};
  });
  const chosen=()=>entries.filter(e=>e.check.checked&&!e.row.hidden);
  const bulk=bar.querySelector('[data-bulk]');bulk.hidden=!entries.some(e=>e.type!=='read'&&e.key!=='notificationTemplates')||!!table.querySelector('[data-deleted]');
  function update(){const visible=entries.filter(e=>!e.row.hidden),selected=chosen();all.checked=!!visible.length&&selected.length===visible.length;all.indeterminate=selected.length>0&&selected.length<visible.length;all.setAttribute('aria-checked',all.indeterminate?'mixed':String(all.checked));all.disabled=!visible.length;
   bar.querySelector('[data-selection-count]').textContent=`${selected.length}개 선택 / ${visible.length}개 결과`;
   bar.classList.toggle('has-selection',!!selected.length);
   bar.querySelectorAll('button').forEach(b=>b.disabled=!selected.length);
   entries.forEach(e=>e.row.classList.toggle('is-selected',e.check.checked));
   footer.textContent=visible.length?`${visible.length}개 항목 · 전체 ${entries.length}개 중 검색 결과`:'검색 결과가 없습니다. 검색어를 바꾸어보세요.';
  }
  entries.forEach(e=>e.check.addEventListener('change',update));
  all.addEventListener('change',()=>{const checked=all.checked;entries.filter(e=>!e.row.hidden).forEach(e=>{e.check.checked=checked;e.check.dispatchEvent(new Event('change',{bubbles:true}));});update();});
  bar.querySelector('[data-clear]').onclick=()=>{entries.forEach(e=>{e.check.checked=false;e.check.dispatchEvent(new Event('change',{bubbles:true}));});update();};
  toolbar.querySelector('input').addEventListener('input',e=>{const q=e.target.value.trim().toLocaleLowerCase();entries.forEach(entry=>{entry.row.hidden=!entry.text.includes(q);if(entry.row.hidden&&entry.check.checked){entry.check.checked=false;entry.check.dispatchEvent(new Event('change',{bubbles:true}));}});update();});
  [...head.cells].slice(1).forEach((cell,i)=>{cell.scope='col';if(['관리','처리','안내','선택','작업'].includes(cell.textContent.trim()))return;const label=cell.textContent;cell.innerHTML=`<button class="admin-sort" type="button">${esc(label)} ${icon('arrow-up-down-line')}</button>`;cell.setAttribute('aria-sort','none');cell.querySelector('button').onclick=()=>{const asc=cell.getAttribute('aria-sort')!=='ascending';[...head.cells].forEach(c=>{if(c.hasAttribute('aria-sort'))c.setAttribute('aria-sort','none');});cell.setAttribute('aria-sort',asc?'ascending':'descending');[...rows].sort((a,b)=>(asc?1:-1)*a.cells[i+1].textContent.localeCompare(b.cells[i+1].textContent,'ko',{numeric:true})).forEach(row=>table.tBodies[0].append(row));};});
  bar.querySelector('[data-export]').onclick=()=>{const selected=chosen();const cols=[...head.cells].map((c,i)=>({i,title:c.textContent.replace(/[\uE000-\uF8FF]/g,'').trim()})).filter(c=>c.i>0&&!['관리','처리','안내','작업'].includes(c.title));const headers=cols.map(c=>c.title);const values=selected.map(e=>cols.map(c=>e.row.cells[c.i].textContent.trim()));const blob=new Blob(['\uFEFF'+[headers,...values].map(row=>row.map(csvCell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`kwsa-${document.body.dataset.admin}-selected.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast(`${selected.length}개 항목을 내보냈습니다.`);};
  bulk.onclick=()=>{const selected=chosen(),first=selected[0];if(first)location.href=editorUrl(first.type==='status'?'requests':first.key,'','bulk',selected.map(e=>e.id));};
  update();
 });
}
