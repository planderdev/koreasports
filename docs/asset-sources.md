# 자산 출처 및 고정 의존성

확인일 2026-09-17. 원본 페이지를 열어 작가와 무료 이용 표시를 확인했으며 이미지/영상의 로딩을 브라우저에서 확인했다. 모든 스포츠 자산은 실제 체육회 행사 사진이 아닌 예시이며 화면에도 이를 표시한다.

| 로컬 파일 | 원본 | 작가 | 용도 |
|---|---|---|---|
| golf.webp | https://unsplash.com/photos/qsOlzJgdCeY | Robert Ruggiero | 골프 코스 히어로·카드 |
| fencing.webp | https://unsplash.com/photos/d7bwJnE8HPk | Nathanaël Desmeules | 펜싱 히어로·카드 |
| horse.webp | https://unsplash.com/photos/qaF4IhTuZv0 | Filip Eliasson | 승마 카드 |
| soccer.webp | https://unsplash.com/photos/8-s5QuUBtyM | Abigail Keenan | 팀 스포츠 히어로·카드 |
| field-training.mp4, video-poster.jpg | https://pixabay.com/videos/football-training-evening-sport-205193/ | fokus_media | 갤러리 및 안전 과정의 현장 관찰 예시 |

Unsplash 이미지 파일은 원본 페이지 DOM에서 확인한 images.unsplash.com URL을 사용해 최적화 WebP로 보관했다. `-800.webp`는 로컬에서 생성한 카드 크기 파생본이다. 랜덤 이미지 API는 없다.

영상 원본: `https://cdn.pixabay.com/video/2024/03/22/205193-926528071_large.mp4` (14.335초), 포스터: 같은 디렉토리의 `205193-926528071_tiny.jpg`. 페이지의 Free for use under Pixabay Content License 표시를 확인했다. 소리가 없는 스포츠 현장 관찰 클립이며 공식 안전교육 영상으로 표현하지 않는다. `preload=metadata`, 사용자 재생 방식으로 사용한다.

이용 조건 확인: https://unsplash.com/license 및 https://pixabay.com/service/license-summary/ . 일반 무료 사용·수정 허용 범위에서 프로젝트 화면에 통합했다. 자산 자체의 단독 판매/재배포 서비스, 상표 또는 공식 후원·보증으로 오인시키는 사용은 하지 않는다. 공개 운영 전 초상·장소 등 제3자 권리는 운영 맥락에 맞춰 재검토할 필요가 있다.

## 라이브러리

런타임 CDN 접속 없이 `assets/vendor`에서 로드한다. npm의 jsDelivr 배포 파일을 정확한 버전으로 다운로드해 저장했다. 설치 스크립트에서 `latest`를 사용하지 않는다.

| 의존성 | 고정 버전 | 확인한 공식 문서 |
|---|---|---|
| Swiper | 12.0.3 | https://swiperjs.com/get-started |
| AOS | 2.3.4 | https://github.com/michalsnik/aos |
| GSAP + ScrollTrigger | 3.13.0 | https://gsap.com/docs/v3/Installation/ |
| Lenis | 1.3.11 | https://github.com/darkroomengineering/lenis |
| Remix Icon | 4.6.0 | https://github.com/Remix-Design/RemixIcon |
| Pretendard Variable | 1.3.9 | https://github.com/orioncactus/pretendard |

Swiper는 히어로 및 모바일 대회/갤러리/협회 슬라이드, AOS는 일반 섹션 제목, GSAP는 히어로 텍스트와 후원 제목 진입, Lenis는 마우스 환경의 페이지 스크롤만 담당한다. 같은 요소의 transform 제어를 겹치지 않는다. Lenis는 GSAP ticker 하나만 사용한다. 동작 감소 설정에서는 자동재생·부드러운 스크롤·등장 효과가 꺼진다.

임시 KWSA 워드마크는 텍스트 조판이다. 공식 CI로 확정하거나 타 기관 로고를 복제하지 않았다. fallback.svg는 코드로 작성한 오류 상태 안내이며 실사나 공식 로고로 쓰지 않는다.
