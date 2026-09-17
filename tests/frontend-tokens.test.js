import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const source=JSON.parse(readFileSync(new URL('assets/design-system/tokens.json',root),'utf8'));
const tokens=source.groups.flatMap(g=>g.tokens);
const styles=readdirSync(new URL('assets/css/',root)).filter(n=>n.endsWith('.css')&&n!=='tokens.css').map(name=>({name,css:readFileSync(new URL('assets/css/'+name,root),'utf8')}));
test('authored CSS uses tokens for fixed dimensions, color and duration',()=>{
 for(const {name,css} of styles){
  const declarations=css.replace(/\/\*[\s\S]*?\*\//g,'').replace(/@font-face\s*\{[^}]*\}/g,'').replace(/@media[^{}]*\{/g,'{').replace(/var\(--[\w-]+(?:,[^)]*)?\)/g,'TOKEN');
  assert.doesNotMatch(declarations, /#[\da-f]{3,8}\b|(?<![\w-])(?:\d*\.)?\d+(?:px|rem|em|ms|deg)\b/i,name);
 }
});
test('all font size tokens respect the 13px minimum',()=>{
 for(const t of tokens.filter(t=>/^--font-size-|^--type-.*-size$/.test(t.name))){
  if(t.value.endsWith('px'))assert.ok(parseFloat(t.value)>=13,t.name);
 }
});
test('CSS variable references have a token or local runtime definition',()=>{
 const css=styles.map(s=>s.css).join('\n');
 const known=new Set([...tokens.map(t=>t.name),...Array.from(css.matchAll(/(--[\w-]+)\s*:/g),m=>m[1])]);
 // These properties are supplied by the interactive specimen renderer.
 for(const n of ['--type-size','--type-line','--example-duration','--avatar-color'])known.add(n);
 for(const [,name] of css.matchAll(/var\((--[\w-]+)/g))assert.ok(known.has(name),name);
});
