# 체육회사업 콘텐츠 보강

## 변경 파일과 경로
- `assets/js/business-content.js`: 사용자 지시서의 웹용 확정 문안, 사진 메타데이터, 메뉴 참조.
- `assets/js/data.js`: 전용 콘텐츠 연결과 business/operations 임시 소개 교체.
- `assets/js/pages/business.js`: 주요사업·대회운영 전용 렌더러와 교육·자격 소개 영역.
- `assets/js/pages/catalog.js`: business/operations 분기와 교육 소개 적용.
- `assets/js/pages/member.js`: 자격검증 상단 소개 적용.
- `assets/css/pages.css`: `.business-page` 및 `.business-intro` 전용 스타일만 추가.
- `assets/images/business/{football,basketball,badminton}.jpeg`: PDF 이미지 스트림 원본.
- `changes.patch`: 이번 작업 시작 시점 대비 텍스트 diff. 앞선 미커밋 작업과 구분 가능.

실제 경로: `/page.php?id=business`, `/page.php?id=operations`, `/education.php`, `/qualification.php`.

## 자료와 보존
- `business-pages-codex-instructions.md`의 확정 문안을 구조화. 공통 제목·메뉴·URL·breadcrumb 유지.
- 원본 PDF: `C:/Users/pc/Documents/카카오톡 받은 파일/KOWSC_대한직장인체육회_소개자료.pdf`.
- 4쪽 종목 기반, 5쪽 개최 경험, 6~7쪽 국제교류, 9쪽 협력방향을 기준으로 제공된 문안 반영. 8쪽 추진 경과를 추가 성과로 사용하지 않음.
- 5쪽 사진 직접 확인: xref 42 축구(531×552), 43 농구(405×255), 44 풋살(600×400), 45 배드민턴(600×400).
- 풋살 사진은 앞선 작업에서 추출한 `assets/images/about/domestic-sports.jpeg` 재사용.
- 농구 사진은 단체 촬영 장면이므로 설명을 “K직장인농구리그에서 함께한 참가자들의 모습”으로 조정.
- 사진을 자르거나 확대하지 않고 원본 비율로 표시. width/height/alt/lazy 지정.
- sourcePages에는 business/operations 공식 원문이 없음. 기존 operations의 합성 소개에 있던 안전교육 절차를 PDF에 근거한 확정 정책으로 재사용하지 않음. 실제 대회 상세·신청·학습·자격 데이터와 기능은 수정하지 않음.
- 국제교류 전용 사업 상세 경로가 없어 해당 사업에는 버튼 없음. 나머지 링크는 현재 navigation 데이터에서 제목으로 조회.
- 비전·설립목적·헤더·푸터·관리자·토큰·원문 파일은 이번 작업에서 변경하지 않음.

## 검증
- 네 URL을 1440/768/390px에서 확인: 단일 소개, 가로 넘침 없음, 빈 링크와 임시 문구 없음.
- 주요사업/대회운영 PC·모바일 스크린샷 저장. 모바일 단일 열, PC 사진 2열, 실제 이미지 로딩 및 원본 이하 표시 크기 확인.
- 교육 카드 DOM과 자격 카드·탭 DOM이 기존과 동일함을 AOS 상태 속성을 제외하고 비교.
- 교육 “보수교육” 필터 선택 후 검색 → 기존 해당 과정 표시 확인.
- 자격 합격조회·발급/재발급신청 탭 클릭 → 비로그인 안내와 기존 탭 전환 확인.
- 대회·행사, 대회공고, 포토·영상, 기업파트너십 실제 목적지 렌더링 확인. 교육·자격·대회운영 링크도 해당 경로와 일치.
- JS 구문 검사, education.php/qualification.php PHP lint, diff 공백 검사 통과.
- 기존 npm test 50/50 통과(신청·발급 및 원문 보존 테스트 포함).

## 확인 범위와 한계
- 로컬 Chromium viewport에서 검증. 실기기 및 Safari/Firefox 미검증.
- 실제 계정의 새 신청·발급·재발급을 제출하지 않음. 기존 기능 보존은 DOM 비교, 탭·필터 동작, 기존 테스트로 확인.
- 외부 서비스 또는 운영 서버의 인증·영속 저장을 새로 검증하거나 구현하지 않음.
- 스크린샷은 스크롤로 AOS를 노출한 뒤 상단으로 복귀하여 촬영.
- 배포·커밋·푸시는 실행하지 않음.
