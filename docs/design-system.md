# KWSA Design System v2

시작: [디자인시스템](http://127.0.0.1:8080/design-system.php)

## 구성

- Foundations: 개요, Colors, Typography, Elevation, Grid, Icons, Spacing & Radius, Motion, Token explorer.
- Components: Montage 웹 분류의 53개 항목. 각 상세 페이지에 실행 예제, 코드, 구조, 상태/동작, API/마크업, 사용 및 접근성 안내, 연결 토큰을 제공합니다. 버튼은 variant/size/state를 변경할 수 있습니다. 입력과 선택 계열에는 상태 비교 예제가 추가되어 있습니다.
- Utilities: 31개 웹 항목. PHP/Vanilla 환경에서 CSS, 네이티브 HTML, JavaScript 함수로 대응합니다.
- 문서 검색: 한글·영문 주요 키워드 지원. 토큰은 별도로 이름·정의·분류로 검색합니다.
- 테마: 문서 안에서 라이트/다크 토큰을 비교합니다. 홈페이지에 전체 다크 모드를 적용한 것은 아닙니다.

## 토큰의 원본과 빌드

`assets/design-system/tokens.json`이 단일 원본입니다. 현재 14개 그룹, 623개 토큰입니다.

1. Atomic colors: 10개 팔레트 × 12단계.
2. Semantic colors: Primary, Label, Fill, Line, Background, Static, Inverse, Interaction, Status, Accent, Material.
3. Typography: 19개 크기·행간·자간 조합 및 4개 굵기.
4. Geometry: 간격, 둥글기, 테두리.
5. Elevation: Normal/Spread 각각 6단계 및 z-index.
6. Motion: 시간, 이징, 상태 투명도.
7. Layout: 컨테이너, 여백, 브레이크포인트, 아이콘 크기.
8. Component: 컨트롤·입력·카드·모달·배지·스위치·아바타.
9. Compatibility: 기존 홈페이지의 `--color-*`, `--shadow-*` 별칭.

```powershell
python scripts/build-design-tokens.py
node --test tests/design-system.test.js
```

빌드 결과는 `assets/css/tokens.css`, `assets/js/design-system/tokens.js`입니다. 생성 파일을 직접 편집하지 마세요. 실행 중 Python/Node는 필요 없습니다.

예: `--atomic-green-60` → `--semantic-primary-normal` → `--control-bg`.
토큰 탐색기는 정의된 값과 현재 테마의 계산값을 함께 표시하며 `var(--토큰명)`을 복사합니다.

## 구현 파일

- `assets/js/design-system/catalog.js`: 항목명, 설명, 사용 가이드, 원문 링크, 검색 키워드.
- `documentation.js`: 분류/상세 라우팅, 검색, 테마, 토큰 값 표시, 버튼 Playground.
- `foundations.js`: 기초 규칙과 토큰 탐색기.
- `components.js`: 실제 HTML 예제와 이벤트 바인딩.
- `specimens.js`: 상태 비교와 구현 코드.
- `utilities.js`: 검증된 색상 투명도, 타이포그래피, 위치 계산, 지역별 표시 함수.
- `assets/css/design-system-docs.css`: 문서 레이아웃, 재사용 가능한 `ds-*` 컴포넌트/유틸리티 클래스.
- `assets/js/pages/design-system.js`: 기존 라우터의 진입 어댑터.

기존 공개/관리자 화면은 호환 색상 별칭과 공통 버튼·입력·모달 토큰을 사용합니다. 모든 기존 페이지의 장식 수치를 일괄 제거한 것은 아닙니다.

## Montage와의 관계

Chrome에서 Foundations/Components/Utilities의 전체 웹 목록, Colors Semantic, Typography, Elevation, Button Design, FocusScope 상세를 직접 확인했습니다. 기본 구성과 문서 수준을 참고했으며 공식 패키지를 설치하거나 공식 구현을 그대로 복사한 것이 아닙니다.

- KWSA 그린 팔레트, Pretendard, 기존 Remix Icon 4.6.0을 사용합니다.
- Typography의 19개 크기/행간/자간은 확인한 Montage 스케일을 반영합니다.
- Date/Time/Select/Autocomplete는 브라우저 기본 컨트롤입니다. 플랫폼마다 모습과 조작 방식이 다를 수 있습니다.
- FocusScope/Portal/Popup은 네이티브 `dialog.showModal()`에 대응합니다.
- Popover/DismissableLayer는 `popover=auto`와 위치 보정 함수를 사용합니다. 스크롤 중 자동 추적하는 범용 Popper 엔진은 아닙니다.
- NoSsr는 DOM 준비 후 마운트하는 PHP 환경 예제이며 React SSR 제어 API가 아닙니다.
- use* 항목은 로컬 함수·DOM 동작의 대응 예제이며 React hook이 아닙니다.
- iOS/Android 전용 항목은 웹 프로젝트에 구현하지 않았습니다.
- 문서 프리뷰 ID는 단일 인스턴스 기준입니다. 같은 예제를 반복 마운트하려면 ID를 고유하게 조정해야 합니다.

## 확인 결과

- 문서 95개 경로를 Chrome 360px에서 순회: 콘텐츠 렌더링, 페이지 가로 넘침, 깨진 이미지 검사 통과.
- 대표 문서 5개 + 기존 홈/관리자, 총 35개 화면 폭 조합(1440/1024/768/390/360) 검사 통과. 홈의 모션 초기화 직후 일시적인 치수 측정값은 렌더링 후 다시 확인했습니다.
- 버튼 변형/로딩, 토큰 필터/복사, 테마 계산값, 문서 검색, 탭 방향키, 폼 오류, 모달 Escape/포커스 복귀, 레이어 닫기, 실행 취소, 지역 표기, 스위치 동작 확인.
- 디자인시스템 테스트 7개 통과. 기존 데이터 흐름 12개도 통과.
- 구문 검사 통과. 콘솔에는 비동기 메시지 채널 종료 오류가 일부 기록되었으며 앱 코드 발생 여부는 확인되지 않았습니다. 문서 렌더링/조작 실패는 재현되지 않았습니다.

기록: `design-system-route-audit.json`, `design-system-responsive-audit.json`, `screenshots/design-system-*.png`.

## 레퍼런스

- [Montage Foundations](https://montage.wanted.co.kr/docs/foundations)
- [Montage Components](https://montage.wanted.co.kr/docs/components)
- [Montage Utilities](https://montage.wanted.co.kr/docs/utilities)
- [Colors](https://montage.wanted.co.kr/docs/foundations/base-material/colors/semantic)
- [Typography](https://montage.wanted.co.kr/docs/foundations/base-material/typography)
- [Elevation](https://montage.wanted.co.kr/docs/foundations/base-material/elevation/normal)
- [Button](https://montage.wanted.co.kr/docs/components/actions/button/design)
- [FocusScope](https://montage.wanted.co.kr/docs/utilities/web-utility-components/focus-scope)

## 최소 글자 크기
- 타이포그래피 최소 크기는 13px. Caption 1/2는 모두 13px, 행간 18px, 자간 0.0194em이며 기존 이름을 유지합니다.
- 디자인시스템 문서와 컴포넌트의 13px 미만 고정 글자 크기를 캡션 토큰으로 통일했습니다.
- 토큰 원본에서 CSS/문서 메타데이터 재생성, 기존 테스트 7개 통과 및 브라우저 캡션 계산값 확인.


## 프론트 CSS 토큰화 (v2.1)

- `assets/css`의 직접 작성한 CSS 10개와 PHP/JS 템플릿의 정적 인라인 스타일을 토큰 참조로 변경했습니다. 외부 vendor CSS는 라이브러리 원본으로 유지합니다.
- 색상, 고정 크기, 여백, 글자 크기/굵기/행간/자간, 테두리, 반경, 그림자, 불투명도, 레이어, 모션 시간/각도를 중앙 관리합니다. 추가 토큰은 Frontend Color/Layout/Typography/Effect/Motion 그룹에서 확인할 수 있습니다.
- `tokens.json`을 수정한 뒤 `python scripts/build-design-tokens.py`로 CSS와 문서 메타데이터를 생성합니다. 생성된 파일을 직접 수정하지 않습니다.
- 미디어쿼리 조건은 CSS 변수 사용이 불가능하므로 리터럴로 유지합니다. 0/1, %, fr, 뷰포트 기반 비율, auto/none 같은 구조 값, @font-face 메타데이터, 데이터 기반 진행률 및 인터랙티브 예제 입력값은 디자인 상수가 아닙니다.
- 폰트 토큰의 최소값 13px을 프론트에도 적용했습니다. 모바일 헤더의 영문 보조 워드마크는 공간 확보를 위해 숨깁니다.
- `tests/frontend-tokens.test.js`에서 고정 CSS 값 재유입, 미정의 토큰 참조, 최소 글자 크기를 검사합니다. 전체 테스트 22개 통과.
- 홈, 대회 목록, 회원가입, 관리자 진입, 타이포그래피 문서를 1440/360px에서 확인했습니다. 가로 넘침 없음. 토큰 탐색기에서 신규 그룹과 계산값 표시 확인.

## 활성 상태 표현 규칙
- 활성 상태를 표시하기 위한 왼쪽 테두리 또는 그림자(inset 포함)를 사용하지 않습니다. 메뉴 선택은 배경색, 글자색, 글자 굵기로 표현합니다.

## Surface 및 운영 상태
- `--color-surface` 기본값은 `#f7f7f9`입니다.
- 접수(파랑), 승인대기(노랑), 승인(초록), 반려(빨강), 취소(회색), 진행중(청록), 완료(보라) 등 상태별 토큰 색상을 적용하고 텍스트 레이블을 유지합니다.
- 활성 메뉴의 왼쪽 테두리/그림자 금지, Remix Icon normal weight, 13px 최소 글자 크기 규칙을 유지합니다.
