import {navigation} from '../assets/js/data.js';
import fs from 'node:fs';
let md=`# 전체 메뉴 및 URL 매핑

첨부 지시서의 원문 항목을 기준으로 정규화했습니다. HWPX 원본은 미제공입니다. 우수동호히 → 우수동호회, 기업파트너쉽 → 기업파트너십으로 교정했습니다. Vision 1/2, 대회운영, 교육사업, 자격검증의 하위 항목은 별도 URL 또는 탭으로 연결합니다.

| 대메뉴 | 원문 / 최종 항목 | URL |
|---|---|---|
`;
for(const n of navigation)for(const i of n.items)md+=`| ${n.title} | ${i.title} | ${i.url} |\n`;
md+=`
## 공통 유틸리티

| 기능 | 목적지 |
|---|---|
| 통합검색 | /search.php |
| 로그인 | /login.php |
| 선수등록 | /join.php |
| 마이페이지 | /mypage.php |
| 모바일 회원증 | /mypage.php?tab=card |
| 전체메뉴 | 헤더 모달 · 모바일 아코디언 |
| 산하 협회 | /page.php?id=associations |
| 로그아웃 | 현재 데모 역할을 비회원으로 변경 |

## 상세·흐름

| 유형 | 예시 URL |
|---|---|
| 대회 | /event.php?id=event-1 |
| 신청 | /apply.php?kind=event&id=event-1 |
| 게시글 | /post.php?id=post-1 |
| 동호회 | /club.php?id=club-1 |
| 교육 | /course.php?id=course-1 |
| 학습 | /learn.php?id=course-1 |
| 자원봉사 | /volunteer.php?id=volunteer-1 |
| 기업 등록 | /join.php?type=organization |
| 동호회 등록 | /join.php?type=club |

## 관리자

`;
for(const n of ['index','members','organizations','clubs','events','applications','education','qualifications','volunteers','safety','content','sponsors','notifications'])md+=`- /admin/${n}.php\n`;
fs.writeFileSync(new URL('../docs/sitemap.md',import.meta.url),md);
