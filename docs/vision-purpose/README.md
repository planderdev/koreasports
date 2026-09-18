# 비전·설립목적 반영 기록

## 범위
- `/page.php?id=vision`: 도입, 국내·국제 하위 화면 연결, 네 가지 방향, 활동 사진, 마무리.
- `/page.php?id=vision-1`: 국내 영역의 확정 본문·키워드·국내 대회 사진.
- `/page.php?id=vision-2`: 국제 영역의 확정 본문·키워드·국제교류 사진.
- `/page.php?id=purpose`: 도입, 네 가지 가치, 실천 활동, 마무리.
- 기존 메뉴명·URL·헤더·푸터·공통 페이지 헤더 유지. 다른 본문과 관리자 파일은 이번 작업에서 변경하지 않음.

## 자료와 구현
- 문안: 사용자 제공 `vision-purpose-codex-instructions (1).md`의 웹 게시용 최종 문안.
- PDF: `C:/Users/pc/Documents/카카오톡 받은 파일/KOWSC_대한직장인체육회_소개자료.pdf`.
- 표지 포함 2·4·5·6·7·9쪽 텍스트 확인, 사진 페이지 5·6·7쪽 렌더링 확인.
- 국내 사진: 5쪽, 풋살대회 이미지 xref 44, 600×400. `assets/images/about/domestic-sports.jpeg`.
- 국제 사진: 7쪽, 2019 스페인 WSG 참가 이미지 xref 61, 549×349. `assets/images/about/international-exchange.jpeg`.
- 사진은 PDF 내 이미지 스트림 그대로 추출. 슬라이드 문구/배경을 포함하지 않으며 비율 유지, 원본 너비 제한, alt·width·height·lazy 적용.
- `sourcePages`에는 대상 네 ID가 없으며, 기존 purpose 문구는 공식 원고 교체를 요청하는 임시 문구였다. 별도 검증된 공식 설립목적 원문을 삭제하지 않음.
- `assets/js/about-content.js`를 단일 문안 원본으로 사용하고 `data.js`에서 연결. `pageContents`의 기존 임시 문구도 동일 데이터 참조로 교체.
- `pages/catalog.js`에서 대상 ID만 `pages/about.js`로 분기. source-content/source-layout 원본 데이터와 다른 경로 렌더링은 유지.
- CSS는 기존 `pages.css` 내 `.about-page` 아래로 제한. 기존 public semantic/type/space 토큰 재사용, 전역 토큰 변경 없음.
- 이번 작업 시작 시점 대비 텍스트 파일 diff: `existing-files.patch`. 기존 미커밋 관리자 작업과 분리해 확인 가능.

## 검증
- 위 4개 URL × 1440/768/390px, 총 12개 조합: 콘텐츠 표시, 가로 넘침 없음, 임시 문구 없음, 빈 링크 없음.
- 비전·설립목적 전체 화면 스크린샷 6개 저장 및 PC·태블릿·모바일 레이아웃 확인.
- 비전 사진 2개: 모든 검증 너비에서 로딩 성공, naturalWidth 확인 및 원본보다 확대되지 않음.
- 브라우저 콘솔 오류 0건.
- CI 기존 페이지 비교: container 1329px, h2 30px/42px, 본문 18px/28px, padding 44px 0 88px 등 작업 전후 동일.
- JS 구문 검사, page.php PHP lint, git diff --check 통과. npm test 50/50 통과.
- 기존 원문 보존 테스트 통과. 공통 헤더·푸터·메뉴 코드 변경 없음.

## 검증 한계
- 로컬 Chromium 기반 브라우저와 viewport 크기로 확인했으며, 실제 모바일 기기 및 Safari/Firefox 별도 검증은 하지 않음.
- 나머지 전체 페이지를 개별 캡처 비교한 것은 아님. 대상 루트 CSS 격리와 CI 대표 페이지 비교, 기존 테스트로 회귀 범위를 확인함.
- 배포·커밋·푸시는 이번 요청에 포함되지 않아 실행하지 않음.
