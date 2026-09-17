# 데이터 모델

`assets/js/data.js → services/repository.js → 상태·필터 계산 → renderers/pages → UI`

운영 콘텐츠는 JS 모듈의 내보내기로 정의한다. PHP는 공통 레이아웃과 명시적인 파일 진입점을 제공한다. 반복 콘텐츠를 PHP에 복제하지 않는다.

| 개체 | 연결 관계 |
|---|---|
| member | organizationId, organizationNameSnapshot |
| organization | 기업 자체. club과 다른 개체 |
| club | organizationId(nullable), associationId |
| association | sport, theme, logo(nullable), navigation, layoutVariant, enabledModules |
| membership | memberId + associationId + clubId + role + status |
| event | associationId, 접수 시작·마감, 개최일, capacity, participantCount |
| application | memberId, organizationId, 입력 당시 기업명, kind, targetId, eventId/courseId |
| course | lessonIds, associationId |
| learningProgress | memberId + courseId, steps, videoWatched, status |
| certificate | memberId + programId, number, issuedAt |
| volunteerProgram | eventId, cohort, roles, courseId |
| volunteer application | memberId + targetId, eventId, cohort, role, status |
| notificationLog | templateId, recipientIds, body, status, createdAt |

기본 데이터: 대회 16, 게시글 64, 동호회 16, 교육 8, 자원봉사 프로그램 6. 공식 통계로 표시하지 않으며 모든 레코드는 합성 데이터다.

## 저장 및 조회

- 기본 콘텐츠는 data.js, 시연 변경분은 sessionStorage의 `kwsa-demo-v1`에 저장한다.
- 동일 탭에서 PHP 페이지를 이동하면 상태가 유지된다. 새 탭/새 세션 간 공유 DB가 아니다.
- 회원가입/문의 폼의 실입력값, 비밀번호, 실제 파일 바이트는 저장하지 않는다. 완료 후 합성 회원·등록 내역을 생성한다.
- 관리자 콘텐츠 수정은 sessionStorage의 `edits`로 오버레이한다. 초기화 시 원본 data.js로 돌아간다.
- 내보낸 배열은 repository에서 복사하여 전달한다. 렌더러는 원본을 변경하지 않는다.
- 목록 쿼리는 URL에 보존하며, 필터 제출 시 페이지 번호를 제거한다. 목록 복귀 URL도 동일 세션에 저장한다.

## 상태 규칙

대회: 접수 시작 전 → 접수예정, 접수 마감 후 또는 정원 도달 → 마감, 나머지 → 접수중. 날짜는 ISO 8601 +09:00으로 정의하며 표시에는 Asia/Seoul을 사용한다. 만료된 데모 데이터를 계속 접수중이라고 표시하지 않는다.

신청: 비회원 거절 → 대상 존재 확인 → 중복 확인 → 정원/기간 확인 → 접수. 취소·반려·미선발 이후 재신청 가능. 개인은 1명, 팀은 1~30명이며 합산 정원을 검증한다.

기업/동호회: 승인대기 → 승인 또는 반려. 자원봉사: 접수 → 선발/미선발/취소. 자격: 접수 → 합격/불합격/반려; 합격 처리 시 합성 자격증을 생성한다.

교육: 신청 필요 → 3개 단계 열람 → 안전 과정은 관찰 영상 시청(종료 및 재생 누적 확인) → 자료 필독 체크 + 정답 → 완료. 단순 페이지 열람만으로 완료하지 않는다. 프론트 로직은 사용자 조작을 방어하는 보안 장치가 아니다.
