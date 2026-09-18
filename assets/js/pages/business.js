import * as r from '../services/repository.js';
import {esc, heading} from '../renderers.js';

function links(items = []) {
  const menus = r.content('navigation').flatMap(group => group.items.flatMap(item => [item, ...(item.children || [])]));
  return items.map((item, index) => {
    const target = menus.find(menu => menu.title === item.menu);
    return target ? `<a class="button ${index ? 'ds-text small' : 'secondary'}" href="${esc(target.url)}">${esc(item.label)}</a>` : '';
  }).join('');
}

const columnImage = item => `<div class="business-column-image"><img src="${esc(item.image.src)}" alt="${esc(item.image.alt)}" width="${item.image.width}" height="${item.image.height}" loading="lazy" decoding="async"></div>`;

export function businessIntro(key) {
  const item = r.content('businessContent')[key];
  return `<section class="business-intro" aria-labelledby="business-intro-title">${item.label ? `<span class="eyebrow">${esc(item.label)}</span>` : ''}<h2 id="business-intro-title">${esc(item.headline)}</h2><p>${esc(item.body)}</p></section>`;
}

export function businessPage(id, page) {
  const data = r.content('businessContent')[id];
  const number = index => `<span class="business-number" aria-hidden="true">0${index + 1}</span>`;
  let content;
  if (id === 'business') {
    const cooperation = data.cooperation;
    content = `<section class="business-fields" aria-labelledby="business-fields-title"><h2 id="business-fields-title">주요 사업 분야</h2>${data.fields.map((item, index) => `<article class="business-field"><header>${number(index)}<h3>${esc(item.title)}</h3></header><div><h4>${esc(item.subtitle)}</h4><p>${esc(item.body)}</p><ul class="business-points">${item.items.map(text => `<li>${esc(text)}</li>`).join('')}</ul>${item.links ? `<div class="business-links">${links(item.links)}</div>` : ''}</div></article>`).join('')}</section><section class="business-cooperation"><h2>${esc(cooperation.title)}</h2><p>${esc(cooperation.body)}</p><div class="business-columns">${cooperation.items.map(item => `<article>${columnImage(item)}<h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></article>`).join('')}</div></section>`;
  } else {
    content = `<section class="business-fields" aria-labelledby="business-fields-title"><h2 id="business-fields-title">주요 개최 분야</h2><div class="business-columns">${data.fields.map((item, index) => `<article>${columnImage(item)}${number(index)}<h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></article>`).join('')}</div></section><section class="business-gallery"><h2>${esc(data.galleryTitle)}</h2><p>${esc(data.galleryIntro)}</p><div class="business-photo-grid">${data.photos.map(item => `<figure><div class="business-photo-frame"><img src="${esc(item.src)}" alt="${esc(item.alt)}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async"></div><figcaption><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></figcaption></figure>`).join('')}</div></section><section class="business-guidance"><div><h2>${esc(data.guidance.title)}</h2><p>${esc(data.guidance.body)}</p></div><div class="business-links">${links(data.guidance.links)}</div></section>`;
  }
  return `${heading(page.title, '', '체육회사업')}<article class="container content-section business-page">${businessIntro(id)}${content}</article>`;
}
