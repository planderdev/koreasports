import test from 'node:test';
import assert from 'node:assert/strict';
import {usesOriginalBody,post} from '../assets/js/pages/catalog.js';
import {sourcePosts} from '../assets/js/source-content.js';

test('original rich text yields to a saved plain-text edit',()=>{
 const record={bodyHtml:'<p>Original<br>second line</p>',body:['Original','second line'],originalBody:['Original','second line']};
 assert.equal(usesOriginalBody(record),true);
 assert.equal(usesOriginalBody({...record,body:['Changed by administrator']}),false);
 assert.equal(usesOriginalBody({...record,body:[]}),false);
 assert.equal(usesOriginalBody({body:['Ordinary post']}),false);
});

test('post displays original rich text without repeating its lead image and keeps edits escaped',()=>{
 const record=sourcePosts[0];
 const original='<p>Original<br>second line</p><img src="/assets/images/kowsc/logo.svg" alt="Association">';
 const edit={bodyHtml:original,body:['Original','second line'],originalBody:['Original','second line'],showLeadImage:false};
 globalThis.location={search:`?id=${record.id}`,origin:'http://localhost'};
 globalThis.sessionStorage={getItem:()=>JSON.stringify({applications:[],edits:{[`posts:${record.id}`]:edit}})};
 try {
  const rendered=post();
  assert.ok(rendered.includes(original));
  assert.ok(!rendered.includes('class="source-post-image"'));
  edit.body=['<script>Edited text</script>'];
  const changed=post();
  assert.ok(!changed.includes(original));
  assert.ok(changed.includes('&lt;script&gt;Edited text&lt;/script&gt;'));
 } finally {delete globalThis.location;delete globalThis.sessionStorage;}
});
