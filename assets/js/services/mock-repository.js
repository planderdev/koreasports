import * as data from '../data.js';
const KEY='kwsa-demo-v1';
const copy=x=>structuredClone(x);
const initial=()=>({role:'guest',applications:copy([...data.applications,...data.volunteerApplications]),registrations:[],progress:[],notifications:[],edits:{},certificates:copy(data.certificates),preferences:{sms:false,email:false},inquiries:[]});
let memory=initial();
export function state(){try{const v=JSON.parse(sessionStorage.getItem(KEY));return v&&Array.isArray(v.applications)?v:memory;}catch{return memory;}}
function write(s){try{if(typeof window!=='undefined'||typeof sessionStorage!=='undefined')sessionStorage.setItem(KEY,JSON.stringify(s));}catch(error){throw Error('저장 공간에 기록하지 못했습니다. 입력 내용을 유지한 채 다시 시도해주세요.');}memory=s;return copy(s);}
export function resetDemo(){write(initial());}
export function setRole(role){if(!['guest','member','manager','admin'].includes(role))throw Error('잘못된 역할입니다.');const s=state();s.role=role;write(s);}
export const getRole=()=>state().role;
export const getCurrentMember=()=>getRole()==='guest'?null:collection('members')[0];
export const config=()=>copy(data.siteConfig);
export const content=key=>copy(data[key]??[]);
export function collection(key,{includeDeleted=false}={}){const list=data[key]||[];const s=state();return list.map(x=>({...copy(x),...copy(s.edits[`${key}:${x.id}`]||{})})).concat(copy(s.edits[`new:${key}`]||[])).filter(x=>includeDeleted||!x.deletedAt);}
export function eventStatus(event,now=new Date()){if(new Date(event.registrationStartsAt)>now)return '접수예정';if(new Date(event.registrationEndsAt)<now||event.participantCount>=event.capacity)return '마감';return '접수중';}
export function effectiveEvent(e){const count=state().applications.filter(a=>a.kind==='event'&&a.targetId===e.id&&!['취소','반려'].includes(a.status)).reduce((n,a)=>n+(Number(a.teamSize)||1),0);return {...e,participantCount:e.participantCount+count};}
export function listEvents(f={}){return collection('events').map(effectiveEvent).filter(e=>(!f.q||`${e.title} ${e.venue}`.includes(f.q))&&(!f.sport||e.sport===f.sport)&&(!f.region||e.region===f.region)&&(!f.associationId||e.associationId===f.associationId)&&(!f.status||eventStatus(e)===f.status)).sort((a,b)=>f.sort==='date'?a.startsAt.localeCompare(b.startsAt):a.id.localeCompare(b.id,undefined,{numeric:true}));}
export const getEvent=id=>listEvents().find(e=>e.id===id);
export function listPosts(f={}){return collection('posts').filter(p=>(p.category!=='회원전용'||getCurrentMember())&&(!f.category||p.category===f.category)&&(!f.q||`${p.title} ${p.summary}`.includes(f.q))).sort((a,b)=>b.createdAt.localeCompare(a.createdAt));}
export const getPost=id=>listPosts().find(p=>p.id===id);
export function listClubs(f={}){return collection('clubs').filter(c=>(!f.q||c.title.includes(f.q))&&(!f.sport||c.sport===f.sport)&&(!f.region||c.region===f.region)&&(!f.recruiting||c.recruiting===true)&&(!f.featured||c.featured));}
export function searchAll(q){if(!q.trim())return [];return [...listEvents().map(x=>({...x,type:'대회·행사',url:`/event.php?id=${x.id}`})),...listPosts().map(x=>({...x,type:x.category,url:`/post.php?id=${x.id}`})),...listClubs().map(x=>({...x,type:'동호회',url:`/club.php?id=${x.id}`})),...collection('courses').map(x=>({...x,type:'교육',url:`/course.php?id=${x.id}`}))].filter(x=>`${x.title} ${x.summary}`.includes(q.trim()));}
export function submitApplication(payload){
 const member=getCurrentMember();if(!member)throw Error('회원 로그인이 필요합니다.');
 const s=state();const {kind,targetId}=payload;const keys={event:'events',club:'clubs',course:'courses',qualification:'qualificationPrograms',volunteer:'volunteerPrograms'};
 const target=collection(keys[kind]).find(x=>x.id===targetId);if(!target)throw Error('신청 대상을 찾을 수 없습니다.');
 if(s.applications.some(a=>a.memberId===member.id&&a.kind===kind&&a.targetId===targetId&&!['취소','반려','미선발'].includes(a.status)))throw Error('이미 신청한 항목입니다. 마이페이지에서 확인하세요.');
 const teamSize=payload.applicationType==='team'?Number(payload.teamSize):1;if(!Number.isInteger(teamSize)||teamSize<1||teamSize>30)throw Error('참가 인원은 1~30명으로 입력해주세요.');
 if(kind==='event'){const e=getEvent(targetId);if(eventStatus(e)!=='접수중')throw Error('현재 접수할 수 없는 대회입니다.');if(e.participantCount+teamSize>e.capacity)throw Error('잔여 정원을 초과했습니다.');}
 if(kind==='club'&&!target.recruiting)throw Error('현재 모집이 마감된 동호회입니다.');
 const a={id:`app-${crypto.randomUUID()}`,memberId:member.id,organizationId:member.organizationId,organizationNameSnapshot:member.organizationNameSnapshot,kind,targetId,title:target.title,status:kind==='club'?'승인대기':'접수',createdAt:new Date().toISOString(),isDemo:true,applicationType:payload.applicationType==='team'?'team':'individual',teamSize,role:kind==='volunteer'&&target.roles.includes(payload.role)?payload.role:null,cohort:target.cohort||null,eventId:kind==='event'?targetId:target.eventId||null,courseId:kind==='course'?targetId:target.courseId||null};
 s.applications.push(a);write(s);return copy(a);
}
export function cancelApplication(id){const s=state();const a=s.applications.find(x=>x.id===id&&x.memberId===getCurrentMember()?.id);if(!a)throw Error('신청 내역이 없습니다.');a.status='취소';write(s);}
export function getMemberDashboard(memberId){const s=state();return {member:collection('members').find(x=>x.id===memberId),applications:copy(s.applications.filter(x=>x.memberId===memberId)),registrations:copy(s.registrations),progress:copy(s.progress.filter(x=>x.memberId===memberId)),certificates:copy(s.certificates.filter(x=>x.memberId===memberId)),notifications:copy(s.notifications),preferences:copy(s.preferences),inquiries:copy(s.inquiries)};}
const cleanSports=list=>Array.isArray(list)?list.filter(x=>typeof x==='string'&&x.trim()).map(x=>x.trim().slice(0,40)).slice(0,30):[];
export function register(type,payload){const s=state();if(type==='member'){s.role='member';const sports=cleanSports(payload?.sports);/* 등록 때 고른 참여 종목을 로그인 회원(members[0])의 프로필에 반영합니다. */if(sports.length){const key=`members:${data.members[0].id}`;s.edits[key]={...(s.edits[key]||{}),interests:sports};}s.notifications.push({id:crypto.randomUUID(),templateId:'welcome',body:data.notificationTemplates[0].body,status:'미리보기',createdAt:new Date().toISOString()});}else{s.registrations.push({id:`registration-${crypto.randomUUID()}`,type,title:type==='club'?'신규 동호회':'신규 기업',status:'승인대기',region:data.regions.includes(payload.region)?payload.region:'서울',sport:data.sports.includes(payload.sport)?payload.sport:(Array.isArray(payload.sports)&&typeof payload.sports[0]==='string'&&payload.sports[0].trim()?payload.sports[0].trim().slice(0,40):'골프'),sports:cleanSports(payload.sports),organizationId:payload.organizationId==='org-1'?'org-1':null,createdAt:new Date().toISOString(),isDemo:true});s.role='manager';}write(s);}
export function allowedAdminStatuses(row){return row.kind==='volunteer'?['접수','선발','미선발','취소']:row.kind==='qualification'?['접수','합격','불합격','반려']:['접수','승인대기','승인','반려','취소'];}
export function adminBulkStatus(ids,status,reason=''){
 if(getRole()!=='admin')throw Error('관리자 역할을 선택해주세요.');
 const s=copy(state()),unique=[...new Set(ids)];if(!unique.length)throw Error('대상을 선택해주세요.');
 const rows=unique.map(id=>[...s.applications,...s.registrations].find(x=>x.id===id));
 if(rows.some(x=>!x))throw Error('내역이 없습니다. 목록을 새로고침해주세요.');
 if(rows.some(x=>!allowedAdminStatuses(x).includes(status)))throw Error('선택 항목에 허용되지 않는 상태입니다.');
 if(['반려','미선발','불합격'].includes(status)&&!reason.trim())throw Error('사유를 입력해주세요.');
 for(const row of rows){row.updatedAt=new Date().toISOString();row.history=[...(row.history||[]),{from:row.status,to:status,reason,at:row.updatedAt}];row.status=status;row.reason=reason.trim().slice(0,200);
 if(row.kind==='qualification'&&status==='합격'&&!s.certificates.some(c=>c.programId===row.targetId&&c.memberId===row.memberId))s.certificates.push({id:`cert-${crypto.randomUUID()}`,memberId:row.memberId,programId:row.targetId,title:row.title,status:'합격',number:'KOWSC-CERT-'+String(s.certificates.length+1).padStart(4,'0'),isDemo:true});}
 write(s);return rows.length;
}
export function adminStatus(id,status,reason=''){return adminBulkStatus([id],status,reason);}
export function adminBulkRecords(key,ids,field,value,reason=''){
 if(getRole()!=='admin')throw Error('관리자 역할이 필요합니다.');
 const allowed={members:{status:['활동','휴면']},organizations:{status:['승인대기','승인','반려']},clubs:{recruiting:[true,false]},events:{status:['published','draft']},courses:{status:['published','draft']},qualificationPrograms:{status:['published','draft']},posts:{status:['published','draft']},heroSlides:{status:['published','draft']},volunteerPrograms:{status:['published','draft']},sponsors:{status:['published','draft']},donationReports:{status:['published','draft']}};
 if(!allowed[key]?.[field]?.includes(value))throw Error('지원하지 않는 일괄 작업입니다.');
 if(key==='organizations'&&value==='반려'&&!reason.trim())throw Error('반려 사유를 입력해주세요.');
 const unique=[...new Set(ids)],records=collection(key);if(!unique.length)throw Error('대상을 선택해주세요.');
 if(unique.some(id=>!records.some(x=>x.id===id)))throw Error('선택 항목을 찾을 수 없습니다.');
 const s=copy(state());for(const id of unique){const fresh=s.edits[`new:${key}`]?.find(x=>x.id===id),patch={[field]:value,updatedAt:new Date().toISOString(),...(key==='organizations'?{reviewNote:reason.trim()}: {})};if(fresh)Object.assign(fresh,patch);else s.edits[`${key}:${id}`]={...s.edits[`${key}:${id}`],...patch};}
 write(s);return unique.length;
}
export function saveRecord(key,id,patch){
 if(getRole()!=='admin')throw Error('관리자 역할이 필요합니다.');
 if(!Array.isArray(data[key]))throw Error('지원하지 않는 콘텐츠입니다.');
 patch={...patch,updatedAt:new Date().toISOString()};const s=copy(state());if(id){const original=collection(key,{includeDeleted:true}).find(x=>x.id===id);if(!original)throw Error('항목을 찾을 수 없습니다.');const fresh=s.edits[`new:${key}`]?.find(x=>x.id===id);if(fresh)Object.assign(fresh,copy(patch));else s.edits[`${key}:${id}`]={...s.edits[`${key}:${id}`],...copy(patch)};write(s);return {...original,...copy(patch)};}
 const record={createdAt:new Date().toISOString(),...(key==='posts'?{body:[],author:'대한직장인체육회',views:0}:{}),...copy(patch),id:`${key}-${crypto.randomUUID()}`,isDemo:true};s.edits[`new:${key}`]=[...(s.edits[`new:${key}`]||[]),record];write(s);return copy(record);
}
export function adminTrashRecord(key,id,restore=false){return saveRecord(key,id,{deletedAt:restore?null:new Date().toISOString()});}
export function adminSaveProgress(memberId,status,note){
 if(getRole()!=='admin')throw Error('관리자 역할이 필요합니다.');
 if(!collection('members').some(x=>x.id===memberId))throw Error('회원이 없습니다.');
 if(!['미시작','진행중','완료'].includes(status)||!note.trim())throw Error('이수 상태와 정정 근거를 입력해주세요.');
 const s=copy(state());let p=s.progress.find(x=>x.memberId===memberId&&x.courseId==='course-5');if(!p){p={memberId,courseId:'course-5',steps:[]};s.progress.push(p);}p.status=status;p.adminNote=note.trim();p.reviewedAt=new Date().toISOString();write(s);
}
export function progressStep(courseId,step){const s=state();const member=getCurrentMember();if(!member)throw Error('로그인이 필요합니다.');if(!s.applications.some(a=>a.kind==='course'&&a.targetId===courseId&&a.memberId===member.id&&a.status!=='취소'))throw Error('교육 신청 후 학습할 수 있습니다.');let p=s.progress.find(x=>x.memberId===member.id&&x.courseId===courseId);if(!p){p={memberId:member.id,courseId,steps:[],status:'진행중'};s.progress.push(p);}if([0,1,2].includes(step)&&!p.steps.includes(step))p.steps.push(step);write(s);return p;}
export function markVideoComplete(courseId){const s=state();const p=s.progress.find(x=>x.memberId===getCurrentMember()?.id&&x.courseId===courseId);if(!p)throw Error('학습단계를 먼저 열어주세요.');p.videoWatched=true;write(s);}
export function completeCourse(courseId,{read,answer}){const s=state();const p=s.progress.find(x=>x.memberId===getCurrentMember()?.id&&x.courseId===courseId);if(!p||p.steps.length<3||!read||answer!=='stop')throw Error('모든 단계 열람, 자료 필독 확인, 정답 선택이 필요합니다.');if(['course-1','course-5'].includes(courseId)&&!p.videoWatched)throw Error('필수 현장 관찰 영상을 끝까지 시청해주세요.');p.status='완료';p.completedAt=new Date().toISOString();write(s);}
export function issueCertificate(id,reissue=false){const s=state();const c=s.certificates.find(x=>x.id===id&&x.memberId===getCurrentMember()?.id);if(!c)throw Error('합격 내역을 찾을 수 없습니다.');if(reissue&&!c.issuedAt)throw Error('최초 발급 후 재발급을 신청해주세요.');c.issuedAt=new Date().toISOString();c.status=reissue?'재발급 완료':'발급 완료';write(s);return copy(c);}
export function savePreferences(p){const s=state();s.preferences={sms:!!p.sms,email:!!p.email};write(s);}
export function saveInquiry(category,payload={}){const s=state();s.inquiries.push({id:crypto.randomUUID(),title:payload.title||`${category} 문의`,body:payload.body||'',attachments:payload.attachments||[],category,status:'접수',createdAt:new Date().toISOString()});write(s);}
export function logNotification(record){if(getRole()!=='admin')throw Error('관리자 역할이 필요합니다.');const s=state();s.notifications.push({...record,id:crypto.randomUUID(),status:'발송 대기',createdAt:new Date().toISOString()});write(s);}

export function setReducedMotion(value){const s=state();s.reducedMotion=!!value;write(s);}

// Per-record outcomes are returned by the adapter, including storage failures.
export function processAdminBatch(key,ids,action,reason=''){
 const result={success:[],failed:[]};for(const id of new Set(ids)){try{if(action==='trash'||action==='restore')adminTrashRecord(key,id,action==='restore');else if(key==='requests')adminStatus(id,action,reason);else adminBulkRecords(key,[id],key==='clubs'?'recruiting':'status',key==='clubs'?action==='true':action,reason);result.success.push(id);}catch(error){result.failed.push({id,message:error.message});}}return result;
}
