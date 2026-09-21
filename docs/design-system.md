# KWSA Design System v3.1

[실행 화면](http://127.0.0.1:8080/design-system.php) · [리팩터링 기록](refactor/README.md) · [이관 대응표](refactor/token-migration.md)

## 원본과 빌드

assets/design-system/tokens.json이 단일 원본이다. 9개 그룹, 414개 토큰은 정리 결과이며 개수 자체는 품질 기준이 아니다.

- Primitive: 공식 팔레트·최소 13px 프로젝트 타이포그래피과 프로젝트 geometry/motion. 브랜드는 별도 그룹.
- Semantic: 텍스트·배경·경계·상태·상호작용·elevation.
- Component: 버튼 32/40/48px, 입력 48px, 카드·모달 등 공유 계약.
- Layout: 프로젝트 컨테이너·헤더·레이어·아이콘. 공식 Montage 치수로 표현하지 않는다.
- Local: 히어로 연출·이미지·장식 위치는 해당 CSS/JS에 유지한다.

python scripts/build-design-tokens.py 실행 후 npm test로 검사한다. 생성 CSS와 JS를 직접 수정하지 않는다. 생성기는 JSON만 읽으며 화면 리터럴을 수집하지 않는다. 참조 누락·순환·중복 이름은 오류다.

## CSS 소유권

includes/head.php에서 외부 Remix/Swiper/AOS 다음 tokens → base → layout → components → controls를 로드한다.

- 공개: pages, header, footer. 메인만 moments.
- 관리자: design-system(작업 공간 셸), admin, admin-editor.
- 문서: design-system, design-system-docs.

버튼과 native 입력은 components가 소유한다. 페이지는 배치와 고유 표현만 담당한다. 버튼은 small/large 또는 data-size 및 명시적 variant를 사용한다. 합성 검색창은 input-plain을 사용한다. 페이지 선택자로 내부 디자인을 덮어쓰지 않는다.

## Typography와 테마

19개 프로젝트 조합은 type-* 클래스 또는 getTypographyStyle()로 사용한다. size/line/tracking을 함께 적용하고 굵기는 400/500/600/700 중 역할에 맞춰 선택한다. 최신 요청에 따라 전체 크기를 2px, 행간을 4px 확대했다. Caption 1은 14/20px/.0145em, Caption 2는 13/18px/.0194em이며 본문은 17·18px이다. 자간은 기존 스케일에서 새 크기에 해당하는 값으로 보간했다. Montage 원본과 다른 프로젝트 규격이며 각 토큰의 referenceValue에 변경 전 기준값을 보관한다.

테마 경계는 :root 및 data-ds-theme=light/dark이다. 실제 달라지는 값과 이를 참조하는 모든 alias를 양쪽 경계에서 재선언한다. 공통 크기·간격은 반복하지 않는다. dark 안의 light도 지원한다. 홈페이지 전체 다크 토글을 새로 만든 것은 아니다.

일반 CSS media query는 기존 유효한 리터럴 조건을 유지한다. var(--breakpoint-*)를 조건에 사용하지 않는다.

## 프로젝트 차이

공식 로고(assets/images/kowsc/logo.svg)에서 가져온 네이비 #003b83(primary)·레드 #e60012(accent) 브랜드와 사용자 지정 surface #f7f7f9를 유지한다. 나머지 중립색과 shadow는 공식 기준에 맞춘다. 한국어 Pretendard Variable, Remix normal, 포커스 아웃라인 제거, Chip hover=active는 프로젝트 요구에 따른 차이다.

Components 53개, Utilities 31개 문서는 PHP/Vanilla 대응 예제다. Montage React 패키지 API나 모든 화면의 픽셀 동등성을 보장하는 복제본은 아니다. 직접 확인한 공식 문서·화면 검증·남은 예외는 리팩터링 기록을 참조한다.
