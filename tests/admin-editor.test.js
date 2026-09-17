import test from 'node:test';
import assert from 'node:assert/strict';
import * as r from '../assets/js/services/repository.js';
import {contentSchemas,parseContentForm,rowActions} from '../assets/js/admin-content.js';
import {statusTone} from '../assets/js/renderers.js';
function fields(key,record){const f=new FormData();for(const field of contentSchemas[key].groups.flatMap(g=>g.fields)){const value=record[field.name];if(field.type==='checks'){for(const v of value||[])f.append(field.name,v);}else if(field.type==='checkbox'){if(value)f.append(field.name,'on');}else f.append(field.name,Array.isArray(value)?value.join('\n\n'):field.type==='datetime-local'?String(value).slice(0,16):value??(field.name==='status'?'published':''));}return f;}
test('specialized editors preserve each content type and validate date order',()=>{
 r.resetDemo();const event=r.collection('events')[0],form=fields('events',event);const patch=parseContentForm('events',form);
 assert.equal(patch.capacity,80);assert.equal(patch.startsAt,event.startsAt);assert.deepEqual(patch.applicationType,['individual','team']);
 form.set('registrationEndsAt','2027-01-01T10:00');assert.throws(()=>parseContentForm('events',form),/순서/);
 const club=parseContentForm('clubs',fields('clubs',r.collection('clubs')[0]));assert.equal(typeof club.recruiting,'boolean');
 const post=parseContentForm('posts',fields('posts',r.collection('posts')[0]));assert.ok(Array.isArray(post.body));assert.equal(post.pinned,true);
 const report=fields('donationReports',r.collection('donationReports')[0]);assert.equal(parseContentForm('donationReports',report).amount,null);report.set('amount','0');assert.equal(parseContentForm('donationReports',report).amount,0);
});
test('editors reject unsafe destinations, invalid enums and rejection without a reason',()=>{
 const banner=fields('heroSlides',r.collection('heroSlides')[0]);banner.set('url','javascript:alert(1)');assert.throws(()=>parseContentForm('heroSlides',banner),/내부 경로/);
 const org=fields('organizations',r.collection('organizations')[0]);org.set('status','unknown');assert.throws(()=>parseContentForm('organizations',org));org.set('status','반려');assert.throws(()=>parseContentForm('organizations',org),/사유/);
});
test('new records can be edited, trashed and restored without losing content',()=>{
 r.resetDemo();assert.throws(()=>r.adminTrashRecord('posts','post-1'),/관리자/);r.setRole('admin');
 const saved=r.saveRecord('sponsors','',{title:'테스트 후원사',description:'설명',status:'draft'});
 r.saveRecord('sponsors',saved.id,{title:'수정 후원사'});assert.equal(r.collection('sponsors')[0].title,'수정 후원사');
 r.adminTrashRecord('sponsors',saved.id);assert.equal(r.collection('sponsors').length,0);assert.equal(r.collection('sponsors',{includeDeleted:true}).length,1);
 r.adminTrashRecord('sponsors',saved.id,true);assert.equal(r.collection('sponsors')[0].description,'설명');
 assert.throws(()=>r.saveRecord('missing','',{}));assert.throws(()=>r.saveRecord('posts','missing',{}));
});
test('safety corrections retain actual learning steps and require an audit reason',()=>{
 r.resetDemo();r.setRole('admin');assert.throws(()=>r.adminSaveProgress('member-1','완료',''),/근거/);
 r.adminSaveProgress('member-1','완료','오프라인 이수 확인');const p=r.state().progress[0];assert.deepEqual(p.steps,[]);assert.equal(p.adminNote,'오프라인 이수 확인');
});
test('status colors distinguish lifecycle states and actions use dedicated destinations',()=>{
 assert.equal(new Set(['접수','승인대기','승인','반려','취소'].map(statusTone)).size,5);
 const html=rowActions('events','event-1','대회');assert.match(html,/more-2-fill/);assert.match(html,/mode=status/);assert.match(html,/mode=delete/);assert.doesNotMatch(html,/data-edit=/);
});

test('every existing content schema parses its record without unrelated generic fields',()=>{
 r.resetDemo();for(const key of Object.keys(contentSchemas)){const record=r.collection(key)[0];if(!record)continue;const patch=parseContentForm(key,fields(key,record));assert.ok(patch.updatedAt,key);if(key==='volunteerPrograms')assert.deepEqual(patch.roles,record.roles);if(key==='members')assert.equal(patch.organizationNameSnapshot,record.organizationNameSnapshot);}
});
