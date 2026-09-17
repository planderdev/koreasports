// Keep native select behavior; only replace the browser's decorative arrow.
export function initSelectControls(){
 const decorate=root=>{
  const selects=root.matches?.('select')?[root]:[...root.querySelectorAll?.('select')||[]];
  selects.forEach(select=>{
   if(select.multiple||select.size>1||select.parentElement?.classList.contains('select-shell'))return;
   const shell=document.createElement('span');shell.className='select-shell';
   select.before(shell);shell.append(select);
   const arrow=document.createElement('i');arrow.className='ri-arrow-down-s-line select-arrow';arrow.setAttribute('aria-hidden','true');shell.append(arrow);
  });
 };
 decorate(document);
 const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)decorate(node);} )));
 observer.observe(document.body,{childList:true,subtree:true});
 window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});
}
