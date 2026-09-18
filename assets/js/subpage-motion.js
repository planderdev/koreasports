// Animate content groups once; controls and individual table rows remain stable.
export function prepareSubpageMotion() {
  const main = document.querySelector('main');
  if (!main) return;
  const selectors = [
    '.page-heading > .container', '.about-page > *', '.ci-page > section',
    '.source-original > *:not(.source-spacer)', '.source-signature',
    '.inquiry-guide', '.inquiry-form', '.login-layout',
    '.detail-content > *', '.grid-3 > *', '.gallery-grid > *',
    '.board-list', '.data-table-wrap', '.filters', '.pagination',
    '.history-period', '.directory-heading', '.ci-file-guide',
  ];
  const candidates = new Set(main.querySelectorAll(selectors.join(',')));
  // Cover the remaining public subpage layouts without targeting inputs individually.
  main.querySelectorAll(':scope > .container').forEach(container => {
    if (container.matches('form')) candidates.add(container);
    else [...container.children].forEach(child => {
      if (!child.querySelector(selectors.join(','))) candidates.add(child);
    });
  });
  const nodes = [...candidates].filter(node =>
    !node.matches('script,style,aside,input,button,select,textarea,dialog,[hidden]') &&
    !node.closest('dialog,.detail-aside') &&
    (node.textContent.trim() || node.querySelector('img,iframe,video')) &&
    ![...candidates].some(parent => parent !== node && parent.contains(node))
  );
  const groups = new Map();
  nodes.forEach(node => {
    const index = groups.get(node.parentElement) || 0;
    groups.set(node.parentElement, index + 1);
    node.dataset.aos = node.matches('form,.board-list,.data-table-wrap,.login-layout') ? 'subpage-fade' : 'subpage-up';
    node.dataset.aosDuration = '500';
    node.dataset.aosDelay = String(Math.min(index % 3, 2) * 50);
    node.dataset.aosAnchorPlacement = 'top-bottom';
  });
  // Keyboard navigation must never land in content that is still visually hidden.
  main.addEventListener('focusin', event => {
    event.target.closest('[data-aos]')?.classList.add('aos-animate');
  });
  main.addEventListener('load', () => window.AOS?.refresh(), true);
  document.fonts?.ready.then(() => window.AOS?.refresh());
}
