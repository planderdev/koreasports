import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {tokenGroups} from '../assets/js/design-system/tokens.js';
import {components,utilities,allDocs} from '../assets/js/design-system/catalog.js';
import {addOpacity,getTypographyStyle,formatRegion} from '../assets/js/design-system/utilities.js';
import {renderComponent,renderUtility} from '../assets/js/design-system/components.js';
const source=JSON.parse(readFileSync(new URL('../assets/design-system/tokens.json',import.meta.url),'utf8'));
const tokens=source.groups.flatMap(g=>g.tokens),byName=new Map(tokens.map(t=>[t.name,t]));
function resolve(name,dark=false,seen=new Set()){
 assert.ok(byName.has(name),`Missing token ${name}`);
 assert.ok(!seen.has(name),`Circular token ${name}`);
 const next=new Set(seen);next.add(name);const t=byName.get(name);
 return (dark?t.dark??t.value:t.value).replace(/var\((--[\w-]+)\)/g,(_,ref)=>resolve(ref,dark,next));
}
test('generated documentation metadata matches canonical token source',()=>assert.deepEqual(tokenGroups,source.groups));
test('all token references resolve without cycles in both themes',()=>{
 assert.equal(byName.size,tokens.length);
 for(const t of tokens)for(const dark of [false,true])assert.ok(!resolve(t.name,dark).includes('var('));
});
test('brand mapping, official neutral and button sizes resolve in both themes',()=>{
 assert.equal(resolve('--semantic-primary-normal').toLowerCase(),'#176b45');
 assert.equal(resolve('--semantic-label-normal').toLowerCase(),'#171719');
 assert.equal(resolve('--control-height-md'),'40px');
 assert.notEqual(resolve('--control-bg'),resolve('--control-bg',true));
 assert.notEqual(resolve('--semantic-label-normal'),resolve('--semantic-label-normal',true));
});
test('reference catalog contains unique complete web documentation routes',()=>{
 assert.equal(components.length,53);assert.equal(utilities.length,31);
 assert.equal(new Set(allDocs.map(d=>d.section+'/'+d.id)).size,allDocs.length);
 assert.ok(allDocs.every(d=>d.name&&d.description));
});
test('every documented component and utility has a concrete preview',()=>{
 for(const entry of components){const html=renderComponent(entry.id);assert.ok(html.length>30);assert.ok(!html.includes('준비하지 못했습니다'),entry.id);}
 for(const entry of utilities){const html=renderUtility(entry.id);assert.ok(html.length>30);assert.ok(!html.includes('제공되지 않습니다'),entry.id);}
});
test('opacity utility validates input and preserves channel values',()=>{
 assert.equal(addOpacity('#176B45',.5),'rgba(23, 107, 69, 0.5)');
 for(const args of [['red',.5],['#176b45',2],['#176b45',NaN]])assert.throws(()=>addOpacity(...args),TypeError);
});
test('type utility rejects unknown names; locale utility changes regional output',()=>{
 assert.match(getTypographyStyle('body-1'),/--type-body-1-size/);
 assert.throws(()=>getTypographyStyle('unknown'),TypeError);
 assert.notEqual(formatRegion('ko-KR').date,formatRegion('en-US').date);
 assert.equal(formatRegion('en-US').number,'1,234,567');
});
