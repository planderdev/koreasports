# 대한직장인체육회 홈페이지

PHP 멀티페이지와 Vanilla JavaScript ES modules로 구성한 홈페이지·관리자 프로젝트입니다. 원본 콘텐츠와 현재 공개 페이지 디자인을 유지하며 관리자 편집과 목록 업무를 별도 구성합니다.

## 실행과 빌드

```powershell
npm ci
npm run build
php -S 127.0.0.1:8080 -t .
```

- 홈페이지: http://127.0.0.1:8080/index.php
- 관리자: http://127.0.0.1:8080/admin/index.php
- 디자인시스템: http://127.0.0.1:8080/design-system.php
- 테스트: `npm test`
- 에디터 변경 자동 빌드: `npm run dev:editor`
- 디자인 토큰 생성: `python scripts/build-design-tokens.py`

PHP 8.1 이상. 의존성과 lockfile, `assets/js/generated/`를 함께 관리합니다. 생성 번들을 포함하면 PHP 서버에서 Node 런타임 없이 실행할 수 있습니다.

## 구조

- `includes/`, 루트 PHP: 공개 페이지와 공통 템플릿
- `admin/`: 관리자 PHP 진입점
- `assets/js/admin-*.js`: 관리자 셸, 검색/선택, 목록, 편집, 대화상자
- `assets/js/editor/`: 실제 Tiptap과 본문 변환/공개 렌더링
- `assets/js/services/`: repository 및 브라우저 저장 어댑터
- `assets/design-system/tokens.json`: 공개 디자인 토큰 원본
- `assets/css/admin-tokens.css`: 관리자 전용 설계값

## 데이터와 연동 범위

현재 데이터 변경은 브라우저 세션 저장소의 오버레이입니다. 실제 서버 인증·권한·DB·결제·메시지 발송은 연결되어 있지 않습니다. 관리자 역할 전환은 운영 인증이 아닙니다. 미디어와 문서별 임시저장은 해당 브라우저에 저장됩니다.

원본 KOWSC 콘텐츠의 문구·순서·줄바꿈·이미지를 보존합니다. 출처와 원본은 `docs/research/kowsc`에 기록되며 수집 도구는 `scripts/import-kowsc-content.py`입니다. 공개 화면에 개발/이관 안내 문구를 삽입하지 않습니다.

[관리자 변경·본문 정책·검증 기록](docs/admin-upgrade/README.md), [디자인시스템](docs/design-system.md), [서버 연동 계획](docs/integration-plan.md)을 참고하세요.
