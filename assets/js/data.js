import {sportsMedia, sportsPhoto} from './sports-media.js';
import {businessContent} from './business-content.js';
export {businessContent};
import {aboutContent} from './about-content.js';
export {aboutContent};
import {sourcePosts,sourceMedia,sourcePages} from './source-content.js';
export {sourceMedia};
// Public KOWSC content snapshots and synthetic interaction demo records are separated by source metadata.
export const siteConfig = {name:'대한직장인체육회',englishName:'KOREA Workers Sports Committee',president:'어명수',address:'06927 서울특별시 동작구 노량진로6길 6-13, 2층',phone:null,email:'kowsc@naver.com',logo:'/assets/images/kowsc/logo-w.svg',version:1,isDemo:true};
const page = (title,id) => ({title,url:`/page.php?id=${id}`,id});
const link = (title,url) => ({title,url});
export const navigation = [
 {title:'체육회소개',english:'ABOUT US',items:[page('회장인사말','greeting'),{...page('Vision','vision'),children:[page('Vision 1','vision-1'),page('Vision 2','vision-2')]},page('설립목적','purpose'),page('조직기구표','organization'),page('시·도 체육회장','regional'),page('임원 & 위원회','committee'),page('연혁','history'),page('체육회 CI','ci'),page('정관','articles'),page('오시는길','directions')]},
 {title:'체육회사업',english:'OUR BUSINESS',items:[page('주요사업','business'),page('개혁과제','reform'),{...link('대회·행사','/events.php'),children:[page('대회운영','operations'),link('대회참가신청','/events.php?status=접수중'),link('대회소식/공지','/board.php?category=대회공고'),link('현장갤러리','/board.php?category=포토·영상')]},{...link('교육사업','/education.php'),children:[link('레슨 & 안전교육','/education.php?category=레슨'),link('보수교육','/education.php?category=보수교육')]},{...link('자격검증','/qualification.php'),children:[link('자격검증신청','/qualification.php?tab=programs'),link('합격조회·발급','/qualification.php?tab=results'),link('재발급신청','/qualification.php?tab=reissue'),page('인재매칭(인력풀)','talent')]},page('안전관리','safety'),page('문화예술 육성사업','culture'),{...link('동호회 가입','/clubs.php'),children:[page('복지정책','welfare'),link('클럽/동호회 등록','/join.php?type=club')]}]},
 {title:'알림마당',english:'NEWS & STORIES',items:['공지사항','대회공고','대회공모','언론·보도','포토·영상'].map(t=>link(t,`/board.php?category=${t}`))},
 {title:'커뮤니티',english:'COMMUNITY',items:[link('Club Matching','/clubs.php'),link('우리 동호회 자랑','/board.php?category=동호회 소식'),link('이달의 우수동호회','/clubs.php?featured=1'),page('자주묻는질문','faq'),link('자료실','/board.php?category=자료실'),link('안전개선제안','/board.php?category=안전개선제안'),link('회원전용','/board.php?category=회원전용')]},
 {title:'후원참여',english:'TOGETHER',items:[link('후원금집행내역','/support.php?tab=reports'),link('기업파트너십','/support.php?tab=partnership'),link('모집안내/권리','/support.php?tab=rights'),link('후원하기','/support.php?tab=donate'),link('후원사현황','/support.php?tab=sponsors'),link('자원봉사 신청','/volunteers.php')]}
];
export const sports = ['골프','펜싱','승마','풋살'];
export const regions = ['서울','경기','인천','부산'];
// 선수등록비 유형(연간). 금액·혜택은 체육회 제공 회비 기준표 원문입니다.
export const registrationPlans = [
 {id:'basic',title:'기본형',price:'50,000원',unit:'연',benefits:['필수 스포츠상해보험 자동 가입','체육회 주관 대회 참가비 10~20% 할인','모바일 선수증 발급']},
 {id:'premium',title:'프리미엄형',price:'100,000원',unit:'연',benefits:['보장 범위가 확대된 프리미엄 상해보험','주관 대회 참가비 우대 할인','제휴 스포츠 용품 할인 쿠폰북 제공','모바일 선수증 발급']}
];
export const registrationPlanNote = '회원 및 선수등록자에게는 시중 온라인몰 금액보다 10% 저렴한 대한직장인체육회 복지몰 이용권한을 제공합니다.';
// 선수등록 약관동의 3종. {identity}는 화면에서 '주민등록번호' 또는 (외국인) '여권번호'로 바뀝니다.
// 문안은 법률 검토 전 초안이며, 수집 항목은 선수등록 폼의 실제 입력 항목과 일치시켰습니다.
export const registrationConsents = [
 {id:'privacy',required:true,title:'개인정보 수집·이용에 관한 동의',sections:[
  {heading:'1. 수집·이용 목적',items:['선수등록 접수와 본인 확인, 모바일 선수증 발급','체육회 주최·주관 대회 및 교육의 참가 신청 접수, 기록 관리','공지사항과 등록·대회 관련 안내 전달','응급상황 발생 시 법적 보호자 연락']},
  {heading:'2. 수집하는 개인정보의 항목',items:['필수: 이름, 이메일, 연락처, 성별, 소재지, 비상연락처(법적 보호자), 참여 종목, 등록 유형','선택: 소속 직장','서비스 이용 과정에서 자동으로 생성·수집되는 정보: 접속 일시, IP 주소, 쿠키, 기기 및 브라우저 정보']},
  {heading:'3. 수집 방법',paragraphs:['대한직장인체육회는 개인정보를 본인의 동의 없이 수집하지 않으며, 홈페이지 선수등록 화면에서 본인이 직접 입력한 정보만 수집합니다. 입력하신 정보는 위에 밝힌 목적 이외의 용도로 사용하지 않습니다.']},
  {heading:'4. 보유 및 이용 기간',paragraphs:['선수등록 종료(회원 탈퇴) 시까지 보유하며, 수집·이용 목적이 달성되면 지체 없이 파기합니다. 다만 관계 법령에 따라 보존할 의무가 있는 경우에는 해당 기간 동안 보관합니다.']},
  {heading:'5. 동의를 거부할 권리 및 거부에 따른 불이익',paragraphs:['위 개인정보의 수집·이용에 동의하지 않을 권리가 있습니다. 다만 필수 항목은 선수등록에 꼭 필요한 정보이므로, 동의하지 않으면 선수등록을 진행할 수 없습니다.']}
 ]},
 {id:'usage',required:true,title:'개인정보 활용 동의서',note:'보험 가입을 위한 {identity} 처리 포함',sections:[
  {heading:'1. 고유식별정보의 수집·이용',items:['수집 항목: 이름, {identity}','수집 방법: 홈페이지 선수등록(보험 가입)','이용 목적: 스포츠 단체 상해보험 가입 및 보험금 청구 지원','제공받는 자: 대한직장인체육회와 단체 상해보험 계약을 맺은 보험회사(보험 가입 목적에 한함)']},
  {heading:'2. 개인정보의 활용',items:['선수증 발급, 대회 기록 관리와 결과 게재, 대회 물품 제공 등 서비스 운영','체육회 주최·주관 대회와 행사에서 촬영된 사진·영상 등 기록물은 홈페이지, 보도자료, 홍보물 등 대회 홍보와 운영 목적으로 사용할 수 있습니다.','대회 사진·영상의 저작권은 주최 측에 있으며, 체육회가 제공하는 서비스 외의 상업적 이용은 금지됩니다. 초상권은 당사자 개인에게 있으므로 타인의 기록물을 무단으로 사용해서는 안 됩니다.']},
  {heading:'3. 보유 및 이용 기간',paragraphs:['{identity}는 보험 계약 기간이 끝나면 지체 없이 파기합니다. 그 밖의 정보는 수집·이용 목적이 달성된 후 지체 없이 파기하며, 관계 법령에 따라 보존할 의무가 있는 경우에는 해당 기간 동안 보관합니다.']},
  {heading:'4. 동의를 거부할 권리 및 거부에 따른 불이익',paragraphs:['위 사항에 동의하지 않을 권리가 있습니다. 다만 단체 상해보험 가입은 선수등록의 필수 요건이므로, 동의하지 않으면 선수등록과 대회 참가가 제한될 수 있습니다.']},
  {heading:'5. 책임의 범위',paragraphs:['대한직장인체육회가 주최·주관하지 않는 대회의 운영과 그에 따른 책임은 해당 대회의 주최 측에 있습니다.']}
 ]},
 {id:'marketing',required:false,title:'마케팅 및 광고에 관한 동의',sections:[
  {heading:'1. 수집·이용 목적',items:['대한직장인체육회가 주최·주관하는 대회, 교육, 행사 정보와 콘텐츠 제공','이벤트, 복지몰, 후원사 혜택 등 광고성 정보 전달(이메일, 문자, 알림)']},
  {heading:'2. 이용하는 개인정보의 항목',items:['이름, 이메일, 연락처, 소재지, 참여 종목']},
  {heading:'3. 보유 및 이용 기간',paragraphs:['동의를 철회하거나 선수등록을 종료(회원 탈퇴)할 때까지 이용하며, 이후 지체 없이 파기합니다.']},
  {heading:'4. 동의를 거부할 권리',paragraphs:['선택 항목이므로 동의하지 않아도 선수등록과 서비스 이용에 제한이 없으며, 동의 후에도 언제든지 철회할 수 있습니다.']}
 ]}
];
// 선수등록 폼의 소재지: 대한민국 17개 시·도(행정구역 공식 명칭).
export const provinces = ['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시','경기도','강원특별자치도','충청북도','충청남도','전북특별자치도','전라남도','경상북도','경상남도','제주특별자치도'];
// 선수등록 폼의 참여 종목(복수 선택). 마지막에 '직접입력' 항목이 자동으로 붙습니다.
export const participationSports = ['축구','족구','농구','야구','볼링','골프','마라톤','등산','태권도','워킹','댄스스포츠','당구','테니스','자전거','복싱','피트니스','파크골프','모터스포츠','수상스키','배드민턴','e-sports','뉴스포츠'];
// 종목명 → assets/images/sport-icons.svg 의 symbol id. 목록에 없는 종목은 'custom' 아이콘을 씁니다.
export const participationSportIcons = {'축구':'soccer','족구':'jokgu','농구':'basketball','야구':'baseball','볼링':'bowling','골프':'golf','마라톤':'marathon','등산':'hiking','태권도':'taekwondo','워킹':'walking','댄스스포츠':'dance','당구':'billiards','테니스':'tennis','자전거':'cycling','복싱':'boxing','피트니스':'fitness','파크골프':'parkgolf','모터스포츠':'motorsports','수상스키':'waterski','배드민턴':'badminton','e-sports':'esports','뉴스포츠':'newsports','직접입력':'custom'};
export const associations = sports.map((sport,i)=>({id:`assoc-${i+1}`,name:`${sport} 종목협회`,slug:['golf','fencing','equestrian','futsal'][i],theme:'fairway',logo:null,sport,navigation:['events','clubs','education'],layoutVariant:'C',enabledModules:['events','clubs','education'],isDemo:true}));
export const mediaAssets = [
 {id:'golf',image:'/assets/images/golf.webp',alt:'호수와 산을 배경으로 펼쳐진 초록빛 골프 코스',author:'Robert Ruggiero',source:'https://unsplash.com/photos/qsOlzJgdCeY',isDemo:true},
 {id:'fencing',image:'/assets/images/fencing.webp',alt:'실내 코트에서 펜싱 경기를 펼치는 두 선수',author:'Nathanaël Desmeules',source:'https://unsplash.com/photos/d7bwJnE8HPk',isDemo:true},
 {id:'horse',image:'/assets/images/horse.webp',alt:'해변에서 백마를 타는 승마인',author:'Filip Eliasson',source:'https://unsplash.com/photos/qaF4IhTuZv0',isDemo:true},
 {id:'soccer',image:'/assets/images/soccer.webp',alt:'조명이 켜진 잔디 구장에서 함께 축구하는 선수들',author:'Abigail Keenan',source:'https://unsplash.com/photos/8-s5QuUBtyM',isDemo:true}
];
mediaAssets.push(...sportsMedia);
const sportPhotos = [['golf-swing','golf-player','golf'],['fencing','fencing-training'],['horse','riding'],['soccer','football']];
const sportPhoto = (index, offset = 0) => { const group = sportPhotos[index % 4]; return mediaAssets.find(photo => photo.id === group[(Math.floor(index / 4) + offset) % group.length]); };
// Hero photographs selected by the site owner, in display order.
const heroPhotos = [
  {
    // The association's own photo of the event this slide links to (sourceMedia[0]),
    // cropped to remove the white side margins of the original upload.
    "image": "/assets/images/hero/slide-exam.webp",
    "scrim": true,
    "source": sourceMedia[0].source,
    "alt": "요가지도자 자격 검정시험장에서 좌식 책상 앞에 앉아 시험을 준비하는 응시자들"
  },
  {
    "image": "/assets/images/hero/slide-1.webp",
    "source": "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "alt": "야간 조명 아래 야외 코트에서 운동하는 사람들"
  },
  {
    "image": "/assets/images/hero/slide-3.webp",
    "source": "https://images.unsplash.com/photo-1766970096320-c62c49517226?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "alt": "햇빛과 그림자가 드리운 길을 달리는 러너"
  }
];
mediaAssets.push(...heroPhotos.map((photo, i) => ({...photo, id: `hero-photo-${i + 1}`})));
export const heroSlides = sourceMedia.slice(0,3).map((m,i)=>({id:'hero-'+(i+1),eyebrow:'KOWSC · SPORTS PEOPLE',title:i===0?'배움과 도전,\n스포츠로 이어지다.':i===1?'세계와 함께하는\n직장인 스포츠.':'함께한 순간,\n더 큰 무대로.',summary:m.title,image:heroPhotos[i].image,alt:heroPhotos[i].alt,textTone:'light',scrim:!!heroPhotos[i].scrim,cta:'현장 소식 보기',url:'/post.php?id='+m.postId,isDemo:true,sourceUrl:heroPhotos[i].source}));
export const quickLinks = [ ['trophy-line','대회 참가신청','/events.php'],['team-line','동호회 찾기','/clubs.php'],['book-open-line','교육 신청','/education.php'],['medal-line','자격검증','/qualification.php'],['hand-heart-line','자원봉사','/volunteers.php'],['id-card-line','모바일 회원증','/mypage.php?tab=card'] ].map(([icon,title,url],i)=>({icon,title,url,image:'/assets/images/quick-'+(i+1)+'.png'}));
export const audienceServices = [
 {title:'개인회원',heading:'나의 일상에, 스포츠를 더하다.',summary:'대회 참가부터 배움과 새로운 만남까지. 나에게 맞는 스포츠 생활을 시작해보세요.',links:[quickLinks[0],quickLinks[1],quickLinks[2]]},
 {title:'기업·동호회',heading:'함께하는 팀의 가능성을 넓히세요.',summary:'기업과 동호회를 각각 등록하고, 구성원들과 스포츠로 연결됩니다.',links:[{icon:'building-line',title:'기업회원 등록',url:'/join.php?type=organization'},{icon:'team-line',title:'동호회 등록',url:'/join.php?type=club'},quickLinks[0]]},
 {title:'지도자·전문인력',heading:'경험을 나누고, 전문성을 키우다.',summary:'인력풀 등록과 보수교육, 자격검증을 한곳에서 만나보세요.',links:[{icon:'user-star-line',title:'인력풀 등록',url:'/page.php?id=talent'},quickLinks[3],{icon:'book-read-line',title:'보수교육',url:'/education.php?category=보수교육'}]},
 {title:'자원봉사자',heading:'가장 가까이에서, 함께 만드는 대회.',summary:'현장 운영에 참여하고 필수 안전교육을 통해 든든하게 준비하세요.',links:[quickLinks[4],{icon:'shield-check-line',title:'안전교육',url:'/education.php?category=안전교육'},{icon:'file-list-3-line',title:'나의 참여내역',url:'/mypage.php?tab=volunteers'}]}
];
const base = (id,title,category='')=>({id,slug:id,title,category,summary:'스포츠가 있는 건강한 일상을 함께 만듭니다.',createdAt:'2026-09-01',updatedAt:'2026-09-17',status:'published',isDemo:true});
export const events = Array.from({length:16},(_,i)=>({...base(`event-${i+1}`,['2026 직장인 그린컵 골프대회','퇴근 후, 펜싱 챌린지','가을 승마 페스티벌','직장인 풋살 리그'][i%4]+(i>=4?` · ${Math.floor(i/4)+1}차`:''),sports[i%4]),sport:sports[i%4],region:regions[Math.floor(i/4)],venue:['그린필드 골프클럽','시민 펜싱센터','숲길 승마파크','리버사이드 풋살장'][i%4]+' (가상)',startsAt:`2026-${i<8?'10':'11'}-${String(10+i%8*2).padStart(2,'0')}T09:00:00+09:00`,endsAt:`2026-${i<8?'10':'11'}-${String(10+i%8*2).padStart(2,'0')}T18:00:00+09:00`,registrationStartsAt:i%6===4?'2026-10-01T09:00:00+09:00':'2026-09-01T09:00:00+09:00',registrationEndsAt:i%6===5?'2026-09-10T18:00:00+09:00':'2026-10-05T18:00:00+09:00',capacity:80,participantCount:i===9?80:24+i,eligibility:'스포츠를 사랑하는 직장인 및 동호회 회원',applicationType:['individual','team'],associationId:`assoc-${i%4+1}`,image:sportPhoto(i,0).image,alt:sportPhoto(i,0).alt,summary:['초록빛 필드 위에서 함께하는 기분 좋은 도전.','처음이어도 괜찮아요. 펜싱의 매력을 만나보세요.','자연과 호흡하며 즐기는 특별한 하루.','동료와 함께 뛰며 만드는 우리 팀의 순간.'][i%4]}));
export const boards = ['공지사항','대회공고','대회공모','언론·보도','포토·영상','동호회 소식','우수동호회','자료실','안전개선제안','회원전용'];
const postTitles = ['2026 하반기 직장인 생활체육 프로그램 안내','가을 시즌 대회 참가자를 모집합니다','함께 만드는 안전한 스포츠 문화','새로운 동료를 만나는 동호회 활동','직장인 스포츠 참여 안내서','우리의 열정이 빛났던 순간'];
export const posts = sourcePosts;
export const clubs = Array.from({length:16},(_,i)=>({...base(`club-${i+1}`,['그린메이트 골프클럽','퇴근길 펜싱크루','위켄드 승마클럽','오후 여섯시 FC'][i%4]+(i>=4?` ${regions[Math.floor(i/4)]}`:''),sports[i%4]),sport:sports[i%4],region:regions[Math.floor(i/4)],recruiting:i%5!==4,featured:i<4,memberCount:12+i*2,meeting:['격주 토요일 오전','매주 수요일 저녁','매월 둘째 주 일요일','매주 금요일 저녁'][i%4],organizationId:i%2===0?'org-1':null,associationId:`assoc-${i%4+1}`,image:sportPhoto(i,1).image,alt:sportPhoto(i,1).alt,summary:['스코어보다 함께하는 즐거움, 주말 라운딩 친구를 만나요.','퇴근 후 한 시간, 새로운 취미를 함께 배워요.','도시를 벗어나 말과 교감하는 여유로운 주말.','승패보다 팀워크! 함께 땀 흘릴 동료를 기다려요.'][i%4]}));
const coursePhotos = ['running','golf-player','swimming','fencing-training','cycling','riding','football','tennis'].map(sportsPhoto);
export const courses = Array.from({length:8},(_,i)=>({...base(`course-${i+1}`,['스포츠 현장 안전교육','처음 시작하는 골프 레슨','생활체육 지도자 보수교육','펜싱 입문 클래스','자원봉사자 사전 안전교육','승마 기초와 안전수칙','풋살 팀워크와 기본기','지도자를 위한 응급 대응'][i],i%4===0?'안전교육':i===2?'보수교육':'레슨'),image:coursePhotos[i].image,alt:coursePhotos[i].alt,duration:'약 10분 · 3개 학습단계',format:'온라인',associationId:`assoc-${i%4+1}`,lessonIds:['lesson-1','lesson-2','lesson-3']}));
export const lessons = [{id:'lesson-1',title:'01. 활동 전 준비',body:'활동 전 본인의 건강 상태를 확인하고 충분히 준비운동을 합니다. 장소와 비상 연락망을 먼저 확인하세요.'},{id:'lesson-2',title:'02. 현장 안전수칙',body:'종목별 보호장비를 착용하고 운영자의 안내를 따릅니다. 이상 징후가 있으면 즉시 활동을 멈추고 담당자에게 알립니다.'},{id:'lesson-3',title:'03. 안전 확인',body:'자료를 읽고 아래 확인 질문에 답해주세요. 이 페이지는 공인 안전교육을 대체하지 않습니다.'}];
export const qualificationPrograms = [{...base('qual-1','생활체육 운영 실무 자격검증','운영'),summary:'운영 기초와 안전 지식을 확인하는 자격검증',courseId:'course-1'},{...base('qual-2','동호회 리더 역량 검증','지도'),summary:'동호회 운영 및 커뮤니케이션 역량 검증',courseId:'course-3'}];
export const members = [{id:'member-1',name:'김스포츠',number:'KOWSC-2026-0001',organizationId:'org-1',organizationNameSnapshot:'가상 그린워크',joinedAt:'2026-09-01',status:'활동',interests:['골프','풋살'],isDemo:true},{id:'member-2',name:'이필드',number:'KOWSC-2026-0002',organizationId:'org-2',organizationNameSnapshot:'가상 플레이랩',joinedAt:'2026-09-02',status:'활동',interests:['펜싱'],isDemo:true}];
export const organizations = [{id:'org-1',title:'가상 그린워크',status:'승인',region:'서울',isDemo:true},{id:'org-2',title:'가상 플레이랩',status:'승인대기',region:'경기',isDemo:true}];
export const memberships = [{id:'membership-1',memberId:'member-1',associationId:'assoc-1',clubId:'club-1',role:'member',status:'승인'}];
export const applications = [{id:'app-demo-1',memberId:'member-2',kind:'event',targetId:'event-2',eventId:'event-2',title:events[1].title,status:'접수',createdAt:'2026-09-16',isDemo:true}];
export const certificates = [{id:'cert-1',memberId:'member-1',programId:'qual-1',title:'생활체육 운영 실무 자격검증',status:'합격',number:'KOWSC-CERT-0001',issuedAt:null,isDemo:true}];
export const volunteerPrograms = Array.from({length:6},(_,i)=>({...base(`volunteer-${i+1}`,`${sports[i%4]} 대회 운영 자원봉사 ${i+1}기`,'자원봉사'),eventId:`event-${i+1}`,cohort:`${i+1}기`,roles:['현장 안내','경기 운영 지원','안전 지원'],courseId:'course-5',region:regions[i%4],image:sportPhoto(i,2).image,alt:sportPhoto(i,2).alt}));
export const volunteerApplications = [{id:'vol-app-1',memberId:'member-2',kind:'volunteer',targetId:'volunteer-1',eventId:'event-1',cohort:'1기',role:'현장 안내',title:volunteerPrograms[0].title,status:'선발',createdAt:'2026-09-16',isDemo:true}];
export const safetyMaterials = [{id:'guide-1',title:'스포츠 현장 안전 가이드',url:'/assets/safety-guide.txt'}];
export const learningProgress = [];
export const sponsors = [];
export const donationReports = [{...base('report-1','후원금 집행내역 공개 양식','검토용 양식'),period:'2026',amount:null,description:'공식 금액과 증빙은 제공되지 않았습니다. 운영자가 검토한 집행내역을 등록하는 양식입니다.'}];
export const notificationTemplates = [
 {id:'welcome',title:'가입 환영',body:'대한직장인체육회 회원이 되신 것을 환영합니다! 귀하의 모바일 회원증이 발급되었습니다.'},
 {id:'approved',title:'기업 정회원 승인',body:'{name}님의 기업회원 등록이 승인되었습니다. 마이페이지에서 확인해주세요.'},
 {id:'rejected',title:'반려 및 보완 요청',body:'등록 내용을 보완해주세요. 사유: {reason}'},
 {id:'application',title:'대회 신청 접수',body:'{name}님의 {event} 신청이 접수되었습니다.'},
 {id:'selected',title:'자원봉사 선발',body:'{event} 자원봉사에 선발되셨습니다. 장소: {venue}, 집결: {time}, 준비물: {items}'},
 {id:'safety',title:'필수 안전교육 안내',body:'{event} 참여 전 필수 안전교육을 완료해주세요. 장소: {venue}, 집결: {time}, 준비물: {items}'}
];
export const notificationLogs = [];
const copy = {
 greeting:['스포츠가 일상이 되는 세상.','일하는 사람들의 건강한 일상과 즐거운 도전을 응원합니다.','회장 인사말 원고와 성명은 공식 자료 수령 후 교체합니다.'],
 'vision':[aboutContent.vision.headline,'',aboutContent.vision.body],
 'vision-1':[aboutContent.vision.areas[0].title,'',aboutContent.vision.areas[0].body],
 'vision-2':[aboutContent.vision.areas[1].title,'',aboutContent.vision.areas[1].body],
 'purpose':[aboutContent.purpose.headline,'',aboutContent.purpose.body],
 organization:['함께 움직이는 체육회','총회 → 이사회 → 사무국 → 종목협회','아래 조직 구조는 교체 가능한 예시이며 확정 조직도가 아닙니다.'],
 committee:['전문성과 현장의 경험을 연결합니다','임원 및 위원회 소개','성명, 직위, 임기는 공식 명단 수령 후 등록합니다.'],
 history:['함께 쌓아갈 스포츠의 기록','주요 연혁','확정 연혁을 등록하면 연도별 타임라인으로 표시됩니다.'],
 ci:['대한직장인체육회 · 스포츠피플','기존 사이트 로고','기존 사이트에서 사용하는 로고를 현재 홈페이지에 적용했습니다.'],
 articles:['공정하고 투명한 운영을 위해','정관 및 운영 규정','법적 효력이 없는 검토용 페이지입니다. 공식 정관과 개정 이력은 검토 후 게시합니다.'],
 directions:['체육회에 오시는 길','주소 및 문의 안내','기존 사이트 하단에 공개된 주소와 이메일을 안내합니다.'],
 business:[businessContent.business.headline,'',businessContent.business.body],
 reform:['더 열린 체육회를 향한 변화','참여 중심의 서비스 개선','투명한 정보 공개와 쉬운 신청, 접근성 개선을 위한 제안 과제입니다.'],
 operations:[businessContent.operations.headline,'',businessContent.operations.body],
 talent:['경험이 필요한 곳에, 당신의 역량을','지도자·전문인력 인력풀','관심 분야와 활동 지역을 등록하는 신청입니다.'],
 safety:['즐거움의 시작은, 안전입니다','활동 전 준비부터 현장 대응까지','안전 가이드를 읽고 교육 과정을 통해 기본 수칙을 확인하세요.'],
 culture:['스포츠와 문화가 만나는 순간','문화예술 육성사업','직장인의 문화 참여를 위한 사업 소개 템플릿입니다. 세부 사업은 공식 검토 후 확정합니다.'],
 welfare:['건강한 일상을 위한 작은 변화','직장인 복지정책 안내','정책 대상과 적용 조건은 공식 사업 지침 수령 후 확정합니다.'],
 faq:['궁금한 점을 빠르게 확인하세요','자주묻는질문','회원, 대회, 동호회 및 교육 이용 방법을 안내합니다.'],
 'safety-proposal':['여러분의 제안이 더 안전한 현장을 만듭니다','안전개선제안','장소, 상황과 개선 의견을 남겨주세요. 긴급 신고 접수 기능은 아닙니다.'],
 'members-only':['회원과 함께 나누는 이야기','회원 전용 자료','개인회원으로 전환하여 전용 자료와 참여 이력을 확인하세요.'],
 terms:['서비스 이용약관','검토 필요 원고','이 페이지는 법률 검토와 운영 정책 확정 전의 화면 양식입니다. 실제 서비스 약관 동의로 사용하지 않습니다.'],
 privacy:['개인정보처리방침','검토 필요 원고','개인정보처리방침을 확인해주세요.'],
 associations:['다양한 종목, 하나의 연결','산하 종목협회','협회명은 확장 구조를 보여주는 예시이며 공식 명단이 아닙니다.']
};
export const pageContents = {...Object.fromEntries(Object.entries(copy).map(([id,[headline,subtitle,body]])=>[id,{id,title:navigation.flatMap(n=>n.items.flatMap(x=>[x,...(x.children||[])])).find(x=>x.id===id)?.title||headline,headline,subtitle,body,isDemo:true}])),...Object.fromEntries(Object.entries(sourcePages).map(([id,value])=>[id,{id,...value,isDemo:true}]))};
export const faqs = [{q:'대회에는 어떻게 참가하나요?',a:'대회·행사에서 접수중인 대회를 선택하고 참가 유형과 정보를 입력한 뒤 신청을 확인하세요. 신청 내역은 마이페이지에 표시됩니다.'},{q:'기업회원과 동호회 등록은 무엇이 다른가요?',a:'기업은 소속 직장이고 동호회는 활동 모임입니다. 별도로 등록하며 동호회 등록 시 기업을 연결할 수 있습니다.'},{q:'신청 후 취소할 수 있나요?',a:'마이페이지 신청 내역에서 신청을 취소할 수 있습니다. 실제 취소·환불 정책은 후속 운영 정책으로 확정합니다.'},{q:'교육 수료는 어떻게 확인하나요?',a:'모든 학습단계 열람, 자료 필독 확인과 안전 질문의 정답 제출을 완료하면 이수가 기록됩니다.'}];

export const videoAssets = [{id:'field-video',title:'함께 뛰는 저녁의 그라운드',url:'/assets/videos/field-training.mp4',poster:'/assets/images/video-poster.jpg',author:'fokus_media',source:'https://pixabay.com/videos/football-training-evening-sport-205193/',isDemo:true}];

export const familySites = [
 {title:'재정경제부',url:'https://mofe.go.kr/'},
 {title:'국세청',url:'https://www.nts.go.kr/'},
 {title:'서울특별시',url:'https://www.seoul.go.kr/'},
 {title:'CSIT',url:'https://www.csit.sport/'}
];
