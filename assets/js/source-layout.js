import {hydrateAdminMedia,hydrateAdminAttachments} from './services/repository.js';
// Present the imported original nodes without rewriting their wording or order.
export function bindSourceLayouts(){
 hydrateAdminAttachments(document).then(cleanup=>window.addEventListener('pagehide',cleanup,{once:true}));
 const root=document.querySelector('.source-original');
 if(!root)return;
 hydrateAdminMedia(root).then(cleanup=>window.addEventListener('pagehide',cleanup,{once:true}));
 const id=new URLSearchParams(location.search).get('id');
 const kind=document.body.dataset.page==='post'?'article':id;
 root.dataset.layout=kind;
 root.querySelectorAll('p,h4').forEach(node=>{
  if(!node.textContent.trim()&&!node.querySelector('img,video'))node.classList.add('source-spacer');
 });
 if(kind==='history')buildHistory(root);
 if(kind==='greeting'){
  const paragraphs=[...root.querySelectorAll('p')].filter(p=>p.textContent.trim());
  paragraphs[0]?.classList.add('greeting-lead');
  paragraphs.slice(-3).forEach(p=>p.classList.add('greeting-signature'));
 }
 if(kind==='organization')buildOrganization(root);
 if(kind==='regional')buildRegional(root);
 if(kind==='committee')buildOfficers(root);
}

function sectionHeading(root){
 const previous=root.querySelector('h1,h2');
 if(!previous)return;
 const title=document.createElement('h2');title.className='directory-heading';
 title.textContent=previous.textContent.replace(/^[\s\uF071]+/,'').trim();previous.replaceWith(title);
}

function buildRegional(root){
 const entries=[...root.querySelectorAll('h2')];
 const grid=document.createElement('div');grid.className='source-directory';
 entries[0]?.before(grid);
 entries.forEach(entry=>{
  const text=entry.textContent.replace(/^\s*○\s*/,''),split=text.indexOf('회장');
  const region=split<0?text:text.slice(0,split).trim(),name=split<0?'':text.slice(split+2).trim();
  const card=document.createElement('article');card.className='regional-card';
  const icon=document.createElement('i');icon.className='ri-map-pin-2-line';icon.setAttribute('aria-hidden','true');
  const title=document.createElement('h3');title.textContent=region;
  const top=document.createElement('div');top.className='regional-card-heading';top.append(icon,title);
  const person=document.createElement('p');person.className='regional-person';
  const role=document.createElement('span');role.textContent='회장';
  const value=document.createElement('strong');value.textContent=name||'—';if(!name)value.setAttribute('aria-label','성명 미기재');
  person.append(role,value);card.append(top,person);grid.append(card);entry.remove();
 });
 [...root.querySelectorAll('blockquote')].reverse().forEach(node=>node.replaceWith(...node.childNodes));
 root.querySelectorAll('.source-spacer').forEach(node=>node.remove());
 sectionHeading(root);
}

function buildOfficers(root){
 let group,list;
 [...root.children].forEach(node=>{
  if(!node.textContent.trim()){node.remove();return;}
  if(node.matches('p')&&/^\s*\[/.test(node.textContent)){
   group=document.createElement('section');group.className='source-officer-group';node.before(group);
   const head=document.createElement('div');head.className='officer-group-heading';
   const symbol=document.createElement('i');symbol.className='ri-team-line';symbol.setAttribute('aria-hidden','true');
   const title=document.createElement('h3');title.textContent=node.textContent.replace(/^\s*\[\s*|\s*\]\s*$/g,'');
   head.append(symbol,title);list=document.createElement('dl');list.className='officer-roles';group.append(head,list);node.remove();return;
  }
  if(group){
   const text=node.textContent.replace(/^\s*•\s*/,''),colon=text.indexOf(':');
   const row=document.createElement('div'),term=document.createElement('dt'),description=document.createElement('dd');
   term.textContent=colon<0?text:text.slice(0,colon).trim();description.textContent=colon<0?'':text.slice(colon+1).trim();
   row.append(term,description);list.append(row);node.remove();
  }
 });
 sectionHeading(root);
}

function buildOrganization(root){
 sectionHeading(root);
 const entries=[...root.querySelectorAll('h3')];
 root.querySelectorAll('img').forEach(image=>image.remove());
 if(entries.length<2)return;
 const chart=document.createElement('div');chart.className='organization-chart';
 chart.setAttribute('aria-label','대한직장인체육회 조직 체계');
 const createNode=entry=>{
  const item=document.createElement('li');
  const card=document.createElement('div');card.className='organization-node';
  const text=entry.textContent.trim().replace(/^•\s*/,''),colon=text.indexOf(':');
  const title=document.createElement('h3');title.textContent=colon<0?text:text.slice(0,colon).trim();
  card.append(title);
  if(colon>=0){const description=document.createElement('p');description.textContent=text.slice(colon+1).trim();card.append(description);}
  item.append(card);return item;
 };
 const tree=document.createElement('ul');tree.className='organization-tree';
 const top=createNode(entries[0]);top.firstChild.classList.add('organization-node-primary');
 const leadership=document.createElement('ul'),leader=createNode(entries[1]);
 leader.firstChild.classList.add('organization-node-leader');
 const branches=document.createElement('ul');branches.className='organization-branches';
 entries.slice(2).forEach(entry=>branches.append(createNode(entry)));
 leader.append(branches);leadership.append(leader);top.append(leadership);tree.append(top);chart.append(tree);
 entries[0].before(chart);entries.forEach(entry=>entry.remove());
 [...root.querySelectorAll('blockquote')].reverse().forEach(node=>node.replaceWith(...node.childNodes));
 root.querySelectorAll('p').forEach(node=>{if(!node.textContent.trim()&&!node.closest('.organization-node'))node.remove();});
}

function buildHistory(root){
 sectionHeading(root);
 const original=[...root.childNodes];
 const timeline=document.createElement('div');timeline.className='history-timeline';
 const track=document.createElement('div');track.className='history-track';track.setAttribute('aria-hidden','true');
 const fill=document.createElement('div');fill.className='history-progress';track.append(fill);timeline.append(track);
 let year='',section,list,item;
 const sections=[];
 for(const node of original){
  const match=node.textContent.trim().match(/^(\d{4})\s*[.년-]/);
  if(match&&match[1]!==year){
   year=match[1];section=document.createElement('section');section.className='history-period';
   section.id='history-'+year+'-'+sections.length;section.dataset.year=year;
   const label=document.createElement('h2');label.className='history-year-label';label.textContent=year;
   const dot=document.createElement('span');dot.className='history-dot';dot.setAttribute('aria-hidden','true');
   list=document.createElement('div');list.className='history-records';
   section.append(label,dot,list);timeline.append(section);sections.push(section);item=null;
  }
  if(!section){if(node.nodeType===1&&!node.classList.contains('directory-heading'))node.classList.add('history-intro');continue;}
  if(match||!item){item=document.createElement('div');item.className='history-record';list.append(item);}
  if(node.nodeType===1)node.classList.add('history-original-entry');
  item.append(node);
 }
 if(!sections.length)return;
 root.append(timeline);
 let queued=false;
 const update=()=>{
  queued=false;
  const anchor=Math.min(innerHeight*.34,280);
  let current=0;
  sections.forEach((section,index)=>{if(section.getBoundingClientRect().top<=anchor)current=index;});
  sections.forEach((section,index)=>{
   section.classList.toggle('is-active',index===current);
   section.classList.toggle('is-complete',index<current);
   if(index===current)section.setAttribute('aria-current','step');else section.removeAttribute('aria-current');
  });
  const first=sections[0].querySelector('.history-dot').getBoundingClientRect();
  const last=sections.at(-1).querySelector('.history-dot').getBoundingClientRect();
  const start=first.top+first.height/2, length=last.top+last.height/2-start;
  track.style.height=Math.max(0,length)+'px';
  fill.style.transform=`scaleY(${length?Math.max(0,Math.min(1,(anchor-start)/length)):1})`;
 };
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);
 new ResizeObserver(schedule).observe(timeline);document.fonts?.ready.then(schedule);update();
}
