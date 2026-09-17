import test from 'node:test';
import assert from 'node:assert/strict';
import * as r from '../assets/js/services/repository.js';
import {csvCell,commonStatuses} from '../assets/js/admin-tables.js';
test('bulk status validates every row before saving and requires rejection reasons',()=>{
 r.resetDemo();r.setRole('member');const rows=[r.submitApplication({kind:'club',targetId:'club-1'}),r.submitApplication({kind:'club',targetId:'club-2'})],ids=rows.map(x=>x.id);r.setRole('admin');
 const before=structuredClone(r.state());
 assert.throws(()=>r.adminBulkStatus([...ids,'missing'],'접수'));
 assert.deepEqual(r.state(),before);
 assert.throws(()=>r.adminBulkStatus(ids,'반려','   '),/사유/);
 assert.deepEqual(r.state(),before);
 assert.equal(r.adminBulkStatus([...ids,ids[0]],'반려','서류 확인 필요'),2);
 assert.ok(r.state().applications.filter(a=>ids.includes(a.id)).every(a=>a.status==='반려'&&a.reason==='서류 확인 필요'));
});
test('bulk qualification success does not issue duplicate certificates',()=>{
 r.resetDemo();r.setRole('member');const a=r.submitApplication({kind:'qualification',targetId:'qual-2'});r.setRole('admin');
 r.adminBulkStatus([a.id,a.id],'합격');r.adminBulkStatus([a.id],'합격');
 assert.equal(r.state().certificates.filter(c=>c.programId===a.targetId&&c.memberId===a.memberId).length,1);
});
test('bulk records require admin, valid fields and existing ids',()=>{
 r.resetDemo();assert.throws(()=>r.adminBulkRecords('members',['member-1'],'status','휴면'),/관리자/);r.setRole('admin');
 const before=structuredClone(r.state());assert.throws(()=>r.adminBulkRecords('members',['member-1','missing'],'status','휴면'));
 assert.deepEqual(r.state(),before);assert.throws(()=>r.adminBulkRecords('members',['member-1'],'name','bad'));
 assert.equal(r.adminBulkRecords('members',['member-1','member-2'],'status','휴면'),2);
 assert.ok(r.collection('members').slice(0,2).every(x=>x.status==='휴면'));
 r.saveRecord('clubs','',{title:'신규 테스트 동호회',recruiting:true});const club=r.collection('clubs').at(-1);
 r.adminBulkRecords('clubs',[club.id],'recruiting',false);assert.equal(r.collection('clubs').at(-1).recruiting,false);
});
test('mixed selection offers only common statuses and CSV neutralizes formulas',()=>{
 assert.deepEqual(commonStatuses([{kind:'volunteer'},{kind:'qualification'}]),['접수']);
 assert.equal(csvCell('=1+1'),'"\'=1+1"');assert.equal(csvCell('a"b'),'"a""b"');
});
