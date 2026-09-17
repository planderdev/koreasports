<?php
declare(strict_types=1);
$allowed = ['home','page','board','post','events','event','apply','clubs','club','education','course','qualification','support','search','login','join','mypage','volunteers','volunteer','learn','admin','design-system'];
if (!isset($pageType) || !in_array($pageType, $allowed, true)) { http_response_code(404); $pageType = 'page'; }
$pageIds = ['greeting','vision','vision-1','vision-2','purpose','organization','committee','history','ci','articles','directions','business','reform','operations','talent','safety','culture','welfare','faq','qna','safety-proposal','members-only','terms','privacy','associations'];
if ($pageType === 'page' && (!is_string($_GET['id'] ?? null) || !in_array($_GET['id'], $pageIds, true))) { http_response_code(404); }
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; media-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'self'");
?><!doctype html>
<html lang="ko">
<?php require __DIR__.'/head.php'; ?>
<body data-page="<?=htmlspecialchars($pageType, ENT_QUOTES, 'UTF-8')?>" data-admin="<?=htmlspecialchars($adminSection ?? '', ENT_QUOTES, 'UTF-8')?>">
<a class="skip-link" href="#main">본문 바로가기</a>
<?php require __DIR__. (in_array($pageType, ['admin','design-system'], true) ? '/workspace-header.php' : '/header.php'); ?>
<main id="main" tabindex="-1"><div class="container loading" role="status"><span class="skeleton"></span>화면을 불러오고 있습니다.</div></main>
<noscript><div class="container notice">이 프로토타입의 콘텐츠 및 신청 기능은 JavaScript가 필요합니다. 브라우저 설정에서 JavaScript를 활성화해주세요.</div></noscript>
<?php require __DIR__. (in_array($pageType, ['admin','design-system'], true) ? '/workspace-footer.php' : '/footer.php'); ?>
<dialog id="modal" aria-labelledby="modal-title" data-lenis-prevent><div class="modal-header"><h2 id="modal-title"></h2><button class="icon-button" data-close aria-label="닫기"><i class="ri-close-line" aria-hidden="true"></i></button></div><div id="modal-body"></div></dialog>
<div id="toast" role="status" aria-live="polite"></div>
<?php require __DIR__.'/scripts.php'; ?>
</body></html>
