# Montage 리팩터링 검증 기록

검증일: 2026-09-17. 기존 사용자 변경을 포함한 시작 상태를 작업 공간 밖에 보관하고 원본 선언을 수정했다. 데이터·라우팅·콘텐츠 구조는 유지했다.

## 확인한 공식 근거

- [Typography](https://montage.wanted.co.kr/docs/foundations/base-material/typography): 19개 조합. Caption 1 12/16px/.0252em, Caption 2 11/14px/.0311em. Headline 2는 표의 17/26px 사용.
- [Foundations](https://montage.wanted.co.kr/docs/foundations)의 color/semantic/elevation과 실제 페이지에 로드된 공식 CSS를 확인했다. 추출값은 official-tokens.json에 보관했다. 원본 stylesheet는 `https://montage.wanted.co.kr/_next/static/chunks/3dinud6wrc5zf.css`이며 배포에 따라 URL이 변경될 수 있다.
- [Button Design](https://montage.wanted.co.kr/docs/components/actions/button/design)과 [Web](https://montage.wanted.co.kr/docs/components/actions/button/web): 실제 예제 높이 32/40/48px, radius 8/10/12px, label 600 및 행간 18/22/24px 확인.
- Chip, Icon button, Text field, Select, Text area, Checkbox, Card, Content badge, Popup, Popover, Tab을 포함해 총 12개 Component Design 문서를 브라우저로 확인했다. official-components.json 및 official-button/input-computed.json에 근거를 보관했다.

확인하지 않은 프로젝트 spacing·motion·컨테이너를 공식 규격으로 표시하지 않았으며, 모든 간격을 8의 배수로 변경하지 않았다.

## 충돌 원인과 수정

| 문제 | 원인 및 수정 |
| --- | --- |
| 공개 버튼의 최종값이 14px/19.6px/650으로 혼합 | components.css 앞뒤의 중복 `.button` 선언이 결합. 기본 선언을 하나로 통합하고 문서의 ds-button도 이관. 현재 medium은 40px, 15/22px/.0096em, 600, radius 10px. |
| 페이지·문서·관리자의 입력 규격 중첩 | native 필드의 기본 규격을 components로 통합. input/select 48px, 16/24px/.0057em, radius 12px. textarea는 reading 행간 26px와 최소 80px. 합성 검색창은 input-plain 명시적 변형. |
| 공통 중립 UI까지 녹색으로 변형 | HEX 이름과 legacy alias를 semantic으로 이관. label normal #171719, solid line #e1e2e4 등 공식 중립값 적용. 브랜드 액션은 분리. |
| 두 Caption 모두 13/18px | JSON 원본과 문서·생성 결과에서 공식 조합으로 수정. |
| 중첩 테마 alias 및 텍스트 상속 오류 | 의존 alias를 양쪽 테마 경계에 재생성하고 color/color-scheme을 경계에 적용. dark 내부 light까지 실측. |
| header/moments/layout 및 docs 미디어 선언 중복 | 소유 파일의 원본 규칙으로 병합. 과도한 ID 접두사 제거. 이동 중 발견한 모바일 메뉴 display 회귀도 원본 미디어 규칙에서 해결. |
| 공개 상태 배지가 관리자 CSS에 의존 | 배지 상태를 공통 components로 이동한 후 불필요한 페이지별 CSS 로드 제거. |

source-audit.json에는 authored CSS, important, 지역 변수 및 PHP/JS 인라인·스타일 주입 위치를 기록했다. 최종 동일 문맥/동일 selector 반복과 parse error는 0건이다. 이 수치가 모든 cascade의 자동 증명은 아니며 대표 요소의 실제 computed 값을 추가 확인했다.

## 구조와 제거 내역

[토큰 대응표](token-migration.md)에 기존 이름 → 새 토큰/지역값 → 이유 → 사용 파일을 기록했다. Frontend Color/Layout/Typography/Effect/Motion 및 Compatibility 그룹을 제거했다. 원본은 9그룹 410토큰이며 개수 축소 자체가 목표는 아니다.

- space-193px/185px, size-169px 등은 지역값 또는 의미 있는 layout 역할로 이관.
- HEX 이름, font-size-N/19px, 중복 긴 폰트 문자열, duration-p2s, layer-*를 semantic/type/font-family/duration-normal/z-*로 정리.
- 의미가 다른 동일 값은 유지. surface는 project primitive → semantic 경로를 사용하며 color-surface legacy alias는 제거.
- dark의 동일 geometry/type/layout 반복은 제거하고 테마 의존 alias는 유지.
- removed-declarations.json에 초기 제거 내역을 보관. 공통 버튼·입력, 문서 v1, 중복 header/footer, focus 보정 및 페이지별 내부 규격을 원본에서 정리.
- override/fix 파일, 새 cascade layer, 우선순위 강제 해결은 추가하지 않음. 남은 important는 hidden 계약, reduced-motion, 요청된 Remix normal.

Swiper/AOS/Remix vendor는 유지했다. 라이브러리의 동적 크기·transform, JS 슬라이드 진행률, 메뉴 viewport 위치 보정, 문서 토큰 미리보기 지역 변수는 동작을 위해 유지했다. 공식 CSS보다 뒤에 보정을 덧붙이는 방식이 아니라 공유 규칙의 소유권을 정리했다.

## 의도적인 차이와 예외

- 원본 첨부 지시서의 “C시안 / 대기업브랜드형 / 01 골프협회 / 페어웨이 그린”에 근거해 기존 브랜드 매핑 유지. 정확한 #176b45 및 dark green 매핑은 프로젝트 설정이며 공식 blue primary와 구분.
- 사용자 요청 surface #f7f7f9 유지. 공식 light alternative는 #f7f7f8.
- 로컬 Pretendard Variable 및 한국어 keep-all 유지. 공식 문서는 Pretendard JP 안내.
- 요청된 포커스 아웃라인 제거, Chip hover=active, Remix normal, active 좌측 border/shadow 금지 유지. 키보드 동작은 유지하나 포커스 표시 제거는 공식 접근성 권장과 다름.
- K-club 참고 컨테이너·헤더, 스포츠 이미지 연출 유지. 히어로 clamp, 장식 숫자, 본문/푸터/code 읽기 행간, 이미지 overlay는 지역 예외.
- PHP/HTML/Vanilla 구현 유지. Montage React 패키지를 설치하거나 모든 예제를 그대로 복제한 것은 아님.

## 화면 및 자동 검증

- 메인·대회 목록·로그인·Button 문서: 390/834/1440px, 총 12화면. 가로 overflow 없음. 폰트 로딩·버튼 계산값 확인. responsive-audit.json과 after 이미지 참조.
- 관리자 대회 목록·개별 수정: 같은 3개 폭, 총 6화면. 일반 입력 48px, 가로 overflow 없음. admin-audit.json 참조. 데이터를 저장하거나 삭제하지 않음.
- fixture: light → dark → light, 버튼 3크기와 default/hover/pressed/disabled, 키보드 focus, error/disabled input, select, textarea, 카드 텍스트, Caption 확인. nested-theme-computed.json 참조.
- 실제 문서 다크 토글에서 버튼 배경 rgb(125,245,165), black 텍스트, 40px 확인. Popup 480px/24px padding 및 Escape 닫기 확인. 모바일 전체메뉴 표시/닫기 확인.
- before/after 스크린샷 보관. 버튼 밀도·중립색·Caption 변화는 의도한 변경. before/after-login은 기본 브라우저 크기로 비교하고 반응형 캡처는 폭을 파일명에 표기.
- 89개 CSS/PHP/JS/HTML 및 53 Component/31 Utility 렌더링 문자열의 정적 변수 참조 누락 없음. 양 테마 순환 참조는 생성기와 테스트에서 검사.
- 최종 테스트·문법·재생성 결과는 validation.json에 기록.

공개 전체 다크 모드를 추가하지 않았다. 모든 콘텐츠 조합, 53개 문서의 모든 상호작용, 브라우저별 픽셀 동등성, 실제 운영 백엔드 통합은 검증 범위에 포함하지 않는다. 기존 프로토타입 기능을 유지한 상태에서 대표 화면과 공유 계약을 검증했다. Git unstaged diff에서 원본·생성 결과를 함께 검토할 수 있다.
