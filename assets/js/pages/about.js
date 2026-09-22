import * as r from '../services/repository.js';
import {esc, heading} from '../renderers.js';

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

const area = (item, i) => {
  const visual = r.content('mediaAssets').find(media => media.id === item.photo.mediaId);
  return `<section class="about-section about-area" aria-labelledby="about-area-${i + 1}"><div class="about-area-text"><span class="about-number" aria-hidden="true">0${i + 1}</span><h2 id="about-area-${i + 1}">${esc(item.title)}</h2><p>${esc(item.body)}</p><ul class="about-keywords">${item.keywords.map(text => `<li>${esc(text)}</li>`).join('')}</ul></div><div class="about-area-photo"><img src="${esc(visual.image)}" alt="${esc(visual.alt)}" width="${item.photo.width}" height="${item.photo.height}" loading="lazy" decoding="async"></div></section>`;
};

export function aboutPage(id, page) {
  const data = r.content('aboutContent');
  const isPurpose = id === 'purpose';
  const content = isPurpose ? data.purpose : data.vision;
  let body;
  if (isPurpose) {
    body = `<section class="about-section" aria-labelledby="about-values"><h2 id="about-values">우리가 지향하는 가치</h2>${numbered(content.values, 'about-values')}</section><section class="about-section about-practice" aria-labelledby="about-activities"><div><h2 id="about-activities">가치를 실천하는 활동</h2><p>${esc(content.activityIntro)}</p></div><ul class="about-activities">${content.activities.map(item => `<li><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></li>`).join('')}</ul></section>`;
  } else {
    // Vision 1·2 were merged into this page: each former sub page is now an inline section.
    body = `${content.areas.map(area).join('')}<section class="about-section" aria-labelledby="about-directions"><h2 id="about-directions">비전을 실현하는 네 가지 방향</h2>${numbered(content.directions, 'about-directions')}</section><section class="about-section" aria-labelledby="about-photos"><h2 id="about-photos">${esc(content.photoTitle)}</h2><div class="about-photos">${content.photos.map(photo).join('')}</div></section>`;
  }
  return `${heading(page.title, '', '소개')}<article class="container content-section about-page"><header class="about-intro"><span class="eyebrow">${content.label}</span><h2>${esc(content.headline)}</h2><p>${esc(content.body)}</p></header>${body}<p class="about-closing">${esc(content.closing)}</p></article>`;
}
