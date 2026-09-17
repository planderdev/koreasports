import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {sourcePosts,sourceMedia,sourcePages} from '../assets/js/source-content.js';
import {pageContents,posts} from '../assets/js/data.js';
import {pagination} from '../assets/js/renderers.js';

test('imported public records retain provenance, local assets and valid page targets',()=>{
 assert.equal(sourcePosts.length,159);
 assert.equal(new Set(sourcePosts.map(p=>p.id)).size,159);
 for(const p of sourcePosts){
  assert.ok(p.sourceUrl.startsWith('http://5.78.131.126:8090/public/'));
  assert.ok(p.isDemo);assert.ok(Array.isArray(p.body));
  assert.ok(existsSync(new URL('..'+p.image,import.meta.url)),p.image);
 }
 for(const m of sourceMedia)assert.ok(posts.some(p=>p.id===m.postId));
 for(const key of Object.keys(sourcePages))assert.equal(pageContents[key].sourceUrl,sourcePages[key].sourceUrl);
 assert.equal(sourcePages.regional.regional.length,16);
 assert.equal(sourcePages.history.history.length,258);
});

test('large imported boards keep pagination bounded and preserve category filters',()=>{
 globalThis.location={search:'?category=뉴스&q=스포츠'};
 const html=pagination(159,12);
 assert.equal((html.match(/<a /g)||[]).length,5);
 assert.ok(html.includes('p=11'));assert.ok(html.includes('p=13'));
 assert.ok(html.includes('category='));assert.ok(html.includes('aria-current="page"'));
 delete globalThis.location;
});

test('all imported originals exactly match public response snapshots without summarization',()=>{
 for(const post of sourcePosts){
  const raw=JSON.parse(readFileSync(new URL(`../docs/research/kowsc/raw/${post.id}.json`,import.meta.url),'utf8'));
  assert.equal(post.body[0],raw.content,post.id);
  assert.deepEqual(post.originalBody,post.body);
  assert.equal(post.contentHash,createHash('sha256').update(raw.content).digest('hex'));
  assert.equal(post.contentMode,'full-original');
  assert.ok(post.bodyHtml.includes('source-text'));
 }
 const rawPages=JSON.parse(readFileSync(new URL('../docs/research/kowsc/raw/pages.json',import.meta.url),'utf8'));
 for(const page of Object.values(sourcePages)){
  assert.ok(rawPages.some(raw=>raw.content===page.originalContent));
  assert.equal(page.contentHash,createHash('sha256').update(page.originalContent).digest('hex'));
  assert.equal(page.contentMode,'full-original');
  assert.doesNotMatch(page.bodyHtml,/<script|<iframe|\son\w+=|\sstyle=|javascript:/i);
 }
});
