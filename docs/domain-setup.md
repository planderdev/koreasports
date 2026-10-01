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

**주의(2026-10-01 실제 겪은 문제):** 프로젝트에 도메인을 추가하는 것만으로는 Vercel DNS 존이 생기지 않습니다(`zone: false`). 이 상태에서 네임서버를 Vercel로 바꾸면 Vercel 네임서버가 질의를 거부(REFUSED)해 사이트가 열리지 않습니다. 네임서버를 바꾸기 **전에** 존을 켜 두어야 합니다:

```bash
vercel api /v3/domains/<도메인> -X PATCH -f op=update -F zone=true --scope planderdevs-projects
vercel dns ls <도메인> --scope planderdevs-projects   # ALIAS·CAA 기본 레코드가 보이면 정상
vercel certs issue kowsc.or.kr www.kowsc.or.kr --scope planderdevs-projects   # 인증서가 바로 안 붙으면
```

대시보드에서는 Domains → 해당 도메인 → "Enable Vercel DNS"에 해당합니다.

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

## 5. 진행 상태 (2026-10-01)
- kowsc.or.kr: 가비아에서 네임서버를 Vercel로 변경 완료(.kr 레지스트리 반영). Vercel DNS 존 활성화, Let's Encrypt 인증서 발급(만료 2026-12-30, 자동 갱신). `https://kowsc.or.kr` 200, `www`·`http`는 308로 메인에 연결. Cloudflare·Google·LG U+·SK 리졸버는 새 IP, KT(168.126.63.1)는 옛 IP 캐시가 남아 있어 TTL 만료까지 대기.
- 대한직장인체육회.kr: 레지스트리 네임서버가 아직 카페24. Vercel 쪽 존은 미리 켜 둠 → 가비아에서 네임서버만 바꾸면 됨.
- 메일: Vercel 존에 MX 없음. `@kowsc.or.kr` 메일을 쓰려면 MX·SPF 추가 필요.
