# 도메인 연결 (kowsc.or.kr · 대한직장인체육회.kr)

기준일 2026-09-30. 메인 도메인은 **kowsc.or.kr**, 한글 도메인 대한직장인체육회.kr(퓨니코드 `xn--vk1bt59apha8fv7hr8fd3swhc.kr`)과 `www.kowsc.or.kr`은 kowsc.or.kr로 308 리다이렉트합니다.

## 1. Vercel 쪽 (완료)
프로젝트 `planderdevs-projects/koreasports`에 다음 도메인을 추가했습니다.

| 도메인 | 역할 |
|---|---|
| kowsc.or.kr | 메인 (프로덕션) |
| www.kowsc.or.kr | → kowsc.or.kr 308 |
| xn--vk1bt59apha8fv7hr8fd3swhc.kr (대한직장인체육회.kr) | → kowsc.or.kr 308 |

프로젝트의 배포 보호(SSO)는 "커스텀 도메인 제외"라 위 도메인은 누구나 접속할 수 있습니다. SSL 인증서는 DNS가 연결되면 Vercel이 자동 발급합니다.

## 2. 등록기관 쪽 (사용자/체육회가 해야 할 일)
- 두 도메인 모두 등록대행자는 **가비아**, 네임서버는 **카페24**(ns1/ns2.cafe24.com, ns1/ns2.cafe24.co.kr)입니다.
- 카페24 웹호스팅은 **서비스 만료 상태**입니다(2026-09-30 확인: kowsc.or.kr 첫 화면이 카페24 만료 안내로 이동, 이미지 경로도 만료 페이지로 302). 만료된 호스팅의 DNS 관리 화면에 들어갈 수 없으면 아래 B안으로 진행합니다.

### A안. 카페24 DNS 관리에서 레코드만 바꾸기
| 도메인 | 종류 | 호스트 | 값 |
|---|---|---|---|
| kowsc.or.kr | A | @ | 76.76.21.21 |
| kowsc.or.kr | CNAME | www | cname.vercel-dns.com |
| 대한직장인체육회.kr | A | @ | 76.76.21.21 |

기존 `183.111.138.226`을 가리키는 A 레코드(및 `*` 와일드카드)는 삭제합니다.

### B안. 가비아에서 네임서버를 Vercel로 변경 (권장)
가비아 → 도메인 관리 → 네임서버 설정에서 두 도메인 모두 다음으로 변경:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

변경 후에는 A/CNAME을 따로 넣을 필요가 없습니다(Vercel이 관리).

### 이메일 주의
현재 두 도메인에 카페24 메일 MX(`mw-002.cafe24.com`, `uws64-047.cafe24.com`)와 SPF가 걸려 있습니다. `@kowsc.or.kr` 메일을 실제로 쓰고 있다면 B안 진행 시 Vercel DNS에 같은 MX·TXT를 다시 넣어야 합니다(사이트는 kowsc@naver.com만 안내하고 있어 사용 여부 확인 필요).

## 3. 반영 확인
네임서버 변경은 보통 수 시간, 길면 24~48시간 걸립니다. 확인 명령:

```bash
dig +short A kowsc.or.kr        # 76.76.21.21 이면 완료
vercel domains inspect kowsc.or.kr --scope planderdevs-projects
```

반영 뒤 `https://kowsc.or.kr`, `https://www.kowsc.or.kr`, `https://대한직장인체육회.kr` 세 주소가 모두 새 사이트로 열리는지 eyes 스킬로 캡처해 확인합니다.

## 4. 알고 있어야 할 것
- 커뮤니티 게시글 일부(`source-content.js`)에 옛 사이트 이미지 주소 `http://kowsc.or.kr/data/file/...` 36건이 남아 있습니다. 이 파일들은 이관 시점(2026-09-17)에도 카페24 서버가 HTML만 돌려줘 받지 못했고(`docs/research/kowsc/full-content-manifest.json`의 `unavailableAssets`), 지금도 만료 페이지로 리다이렉트되므로 **도메인 이전과 무관하게 이미 깨진 상태**입니다. 체육회에서 원본 사진을 받으면 교체합니다.
