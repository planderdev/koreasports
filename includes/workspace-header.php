<header class="workspace-header">
<a class="workspace-brand" href="<?=$pageType === 'admin' ? '/admin/index.php' : '/design-system.php'?>"><strong>KWSA</strong><span><?=$pageType === 'admin' ? '운영 관리' : 'Design System'?></span></a>
<nav aria-label="작업 공간 메뉴"><a href="/index.php">홈페이지</a><a href="/design-system.php" <?=$pageType === 'design-system' ? 'aria-current="page"' : ''?>>디자인시스템</a><a href="/admin/index.php" <?=$pageType === 'admin' ? 'aria-current="page"' : ''?>>관리자</a></nav>
</header>
