<?php
// 인트로 현황 카드: [수치, 설명]. 한 줄 추가하면 카드가 하나 늘고, 순서대로 하나씩 나타납니다(최대 6개).
$introStats = [
    ['69.1만', '가입 회원 수(2023.8)'],
    ['약 1500만명', '생활체육 직장인 (26.01 기준)'],
];
?>
<section id="site-intro" class="site-intro" aria-labelledby="site-intro-title" data-lenis-prevent>
<img class="site-intro-image" src="/assets/images/hero/slide-1.webp" alt="" width="1332" height="749" fetchpriority="high" decoding="async">
<div class="site-intro-inner">
 <div class="site-intro-brand"><img src="/assets/images/kowsc/logo-w.svg" alt="대한직장인체육회" width="374.73" height="120.87"></div>
 <div class="site-intro-layout">
  <div class="site-intro-copy">
   <h2 id="site-intro-title"><img src="/assets/images/kowsc/k-platform-wordmark.webp" alt="K-직장인 스포츠 플랫폼" width="2000" height="176"></h2>
   <p class="site-intro-summary">대회·행사부터 동호회, 교육, 자격검증까지.<br>직장인의 건강한 일상을 대한직장인체육회가 함께합니다.</p>
   <ul class="site-intro-stats" aria-label="주요 현황">
<?php foreach ($introStats as [$value, $label]): ?>
    <li><strong><?=htmlspecialchars($value, ENT_QUOTES, 'UTF-8')?></strong><span><?=htmlspecialchars($label, ENT_QUOTES, 'UTF-8')?></span></li>
<?php endforeach; ?>
   </ul>
   <a class="button accent large site-intro-enter" href="/index.php" data-intro-enter>홈페이지 접속<i class="ri-arrow-right-line" aria-hidden="true"></i></a>
  </div>
  <div class="site-intro-cards">
   <div class="site-intro-card">
    <h3 data-intro-member-title><b>대한직장인체육회</b>의<br>다양한 서비스를 경험해보세요.</h3>
    <a class="button accent large site-intro-card-enter" href="/index.php" data-intro-enter>홈페이지 접속<i class="ri-arrow-right-line" aria-hidden="true"></i></a>
    <a class="button large site-intro-login" href="/login.php" data-intro-leave data-intro-login><i class="ri-login-box-line" aria-hidden="true"></i><span>로그인</span></a>
    <p class="site-intro-bubble" data-intro-bubble>선수등록을 마치신 분은 로그인해주세요.</p>
   </div>
   <a class="site-intro-card site-intro-link-card" href="/join.php" data-intro-leave data-intro-join>
    <span class="site-intro-card-icon"><i class="ri-user-add-line" aria-hidden="true"></i></span>
    <span class="site-intro-card-text"><strong>아직 등록하지 않으셨나요?</strong><span>선수 등록하러 가기</span></span>
    <i class="ri-arrow-right-up-line" aria-hidden="true"></i>
   </a>
  </div>
 </div>
</div>
</section>
