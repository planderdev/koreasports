<?php if ($pageType === 'admin'): ?>
<header class="workspace-header admin-topbar"><a class="workspace-brand" href="/admin/index.php"><strong>KOWSC</strong><span>운영 관리</span></a><div class="admin-menu-search"><label class="sr-only" for="admin-menu-search">메뉴 검색</label><input id="admin-menu-search" type="search" placeholder="업무 메뉴 검색" autocomplete="off"><div id="admin-menu-results" hidden></div></div><nav aria-label="관리자 상단 메뉴"><a class="admin-topbar-action" href="/index.php" target="_blank" rel="noopener">사이트 보기 <i class="ri-external-link-line" aria-hidden="true"></i></a><a class="admin-topbar-action" href="/admin/notifications.php">알림 관리</a><details class="admin-account"><summary class="admin-topbar-action">계정<i class="ri-arrow-down-s-line" aria-hidden="true"></i></summary><div><span id="workspace-role"></span><button id="workspace-logout" hidden>로그아웃</button></div></details></nav></header>
<?php else: ?>
<header class="workspace-header">
<a class="workspace-brand" href="<?=$pageType === 'admin' ? '/admin/index.php' : '/design-system.php'?>"><strong>KWSA</strong><span><?=$pageType === 'admin' ? '운영 관리' : 'Design System'?></span></a>
<nav aria-label="작업 공간 메뉴"><a href="/index.php">홈페이지</a><a href="/design-system.php" <?=$pageType === 'design-system' ? 'aria-current="page"' : ''?>>디자인시스템</a><a href="/admin/index.php" <?=$pageType === 'admin' ? 'aria-current="page"' : ''?>>관리자</a></nav>
</header>

<?php endif; ?>
