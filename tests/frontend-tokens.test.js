import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const source=JSON.parse(readFileSync(new URL('assets/design-system/tokens.json',root),'utf8'));
const tokens=source.groups.flatMap(g=>g.tokens);
const styles=readdirSync(new URL('assets/css/',root)).filter(n=>n.endsWith('.css')&&n!=='tokens.css').map(name=>({name,css:readFileSync(new URL('assets/css/'+name,root),'utf8')}));
test('literal harvesting and legacy aliases cannot return',()=>{
 assert.ok(!source.groups.some(g=>g.id.startsWith('frontend-')||g.id==='compatibility'));
 for(const t of tokens)assert.doesNotMatch(t.name,/^--(?:color-[0-9a-f]{6,}|size-\d+px|space-\d+px|layer-|duration-p|font-size-)/);
 for(const {name,css} of styles)assert.doesNotMatch(css,/@media[^{}]*var\(/,name);
});
test('Project typography has a 13px floor and distinct Caption tuples',()=>{
 const by=new Map(tokens.map(t=>[t.name,t.value]));
 for(const t of tokens.filter(t=>/^--type-.*-size$/.test(t.name)))assert.ok(parseFloat(t.value)>=13,t.name);
 for(const [name,size,line,tracking] of [['caption-1','14px','20px','0.0145em'],['caption-2','13px','18px','0.0194em']]){
  assert.equal(by.get('--type-'+name+'-size'),size);assert.equal(by.get('--type-'+name+'-line'),line);assert.equal(by.get('--type-'+name+'-tracking'),tracking);
 }
});
test('CSS variable references have a token or local runtime definition',()=>{
 const css=styles.map(s=>s.css).join('\n');
 const known=new Set([...tokens.map(t=>t.name),...Array.from(css.matchAll(/(--[\w-]+)\s*:/g),m=>m[1])]);
 // These properties are supplied by the interactive specimen renderer.
 for(const n of ['--type-size','--type-line','--example-duration','--avatar-color'])known.add(n);
 for(const [,name] of css.matchAll(/var\((--[\w-]+)/g))assert.ok(known.has(name),name);
});

test('theme boundaries rebind dependent aliases without repeating geometry',()=>{
 const css=readFileSync(new URL('assets/css/tokens.css',root),'utf8');
 for(const theme of ['light','dark']){
  const block=css.match(new RegExp('\\[data-ds-theme="'+theme+'"\\] \\{([^}]+)\\}'))?.[1];
  assert.ok(block);
  for(const name of ['--control-bg','--control-hover','--input-bg','--card-bg'])assert.ok(block.includes(name+':'),theme+' '+name);
  assert.doesNotMatch(block,/--(?:space-|radius-|type-|layout-|control-height)/);
 }
});

test('button and native form visuals have one shared source',()=>{
 const css=styles.find(s=>s.name==='components.css').css;
 assert.equal((css.match(/^\.button \{/gm)||[]).length,1);
 assert.match(css,/input:not\(:where\(\[type=checkbox\],\[type=radio\],\[type=range\]\)\), select, textarea \{/);
 assert.match(css,/min-height: var\(--input-height\)/);
 for(const name of ['pages.css','admin.css','admin-editor.css','design-system-docs.css']){
  const sheet=styles.find(s=>s.name===name).css;
  for(const [,selector,body] of sheet.matchAll(/([^{}]+)\{([^{}]+)\}/g)){
   if(/\.button\b/.test(selector))assert.doesNotMatch(body,/(?:font-size|line-height|background|border-radius|padding|min-height):/,selector);
  }
 }
});
