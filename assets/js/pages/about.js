import * as r from '../services/repository.js';
import {esc, heading, icon} from '../renderers.js';

export function bindAboutParallax() {
  const closing = document.querySelector('.about-page .about-closing');
  if (!closing) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  const update = () => {
    frame = 0;
    const bounds = closing.getBoundingClientRect();
    const offset = motion.matches ? 0 : Math.max(-60, Math.min(60, (innerHeight / 2 - bounds.top - bounds.height / 2) * 0.14));
    closing.style.setProperty('--about-parallax-y', `${offset.toFixed(2)}px`);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  motion.addEventListener('change', schedule);
  update();
}

const numbered = (items, className) => `<ol class="${className}">${items.map((item, i) => `<li><span class="about-number" aria-hidden="true">0${i + 1}</span><div><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></div></li>`).join('')}</ol>`;
const photo = item => `<figure><img src="${esc(item.src)}" alt="${esc(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"><figcaption>${esc(item.caption)}</figcaption></figure>`;

export function aboutPage(id, page) {
  const data = r.content('aboutContent');
  const isPurpose = id === 'purpose';
  const content = isPurpose ? data.purpose : data.vision;
  const areaIndex = id === 'vision-1' ? 0 : id === 'vision-2' ? 1 : -1;
  const area = content.areas?.[areaIndex];
  const lead = area ? {headline: area.title, body: area.body} : content;
  let body;
  if (area) {
    const visual = r.content('mediaAssets').find(item => item.id === area.photo.mediaId);
    body = `<ul class="about-keywords">${area.keywords.map(text => `<li>${esc(text)}</li>`).join('')}</ul><div class="about-area-photo"><img src="${esc(visual.image)}" alt="${esc(visual.alt)}" width="${area.photo.width}" height="${area.photo.height}" loading="lazy" decoding="async"></div>`;
  } else if (isPurpose) {
    body = `<section class="about-section" aria-labelledby="about-values"><h2 id="about-values">우리가 지향하는 가치</h2>${numbered(content.values, 'about-values')}</section><section class="about-section about-practice" aria-labelledby="about-activities"><div><h2 id="about-activities">가치를 실천하는 활동</h2><p>${esc(content.activityIntro)}</p></div><ul class="about-activities">${content.activities.map(item => `<li><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></li>`).join('')}</ul></section>`;
  } else {
    body = `<section class="about-section" aria-labelledby="about-future"><h2 id="about-future">우리가 그리는 미래</h2><div class="about-paths">${content.areas.map((item, i) => `<a href="/page.php?id=vision-${i + 1}"><span class="about-number" aria-hidden="true">0${i + 1}</span><h3>${esc(item.title)}</h3><span class="about-path-label">Vision ${i + 1} ${icon('arrow-right-up-line')}</span></a>`).join('')}</div></section><section class="about-section" aria-labelledby="about-directions"><h2 id="about-directions">비전을 실현하는 네 가지 방향</h2>${numbered(content.directions, 'about-directions')}</section><section class="about-section" aria-labelledby="about-photos"><h2 id="about-photos">${esc(content.photoTitle)}</h2><div class="about-photos">${content.photos.map(photo).join('')}</div></section>`;
  }
  return `${heading(page.title, '', '체육회소개')}<article class="container content-section about-page"><header class="about-intro"><span class="eyebrow">${content.label}</span><h2>${esc(lead.headline)}</h2><p>${esc(lead.body)}</p></header>${body}${area ? '' : `<p class="about-closing">${esc(content.closing)}</p>`}</article>`;
}
