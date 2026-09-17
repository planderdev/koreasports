import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAttachments} from '../assets/js/inquiry-attachments.js';
test('inquiry attachment validation rejects invalid batches',()=>{
 const file={name:'자료.pdf',size:1024};
 assert.equal(validateAttachments([file]),'');
 assert.ok(validateAttachments(Array(4).fill(file)));
 assert.ok(validateAttachments([{...file,size:5*1024*1024+1}]));
 assert.ok(validateAttachments([{...file,name:'script.exe'}]));
 assert.ok(validateAttachments([{...file,size:0}]));
 assert.equal(validateAttachments([{...file,name:'소개.HWPX',size:5*1024*1024}]),'');
});
