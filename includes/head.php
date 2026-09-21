<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#176B45"><meta name="description" content="일하는 우리, 스포츠로 하나 되다. 대한직장인체육회 홈페이지 ."><meta name="robots" content="noindex,nofollow">
<title>대한직장인체육회 | 스포츠로 연결되는 일상</title>
<link rel="icon" href="data:,">
<link rel="preload" href="/assets/vendor/PretendardVariable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/vendor/remixicon.css"><?php if ($pageType !== 'admin'): ?><link rel="stylesheet" href="/assets/vendor/swiper.css"><link rel="stylesheet" href="/assets/vendor/aos.css"><?php endif; ?>
<?php
$styles = ['tokens', 'base', 'layout', 'components', 'controls'];
if ($pageType === 'admin') {
    $styles = array_merge($styles, ['design-system', 'prose', 'admin-tokens', 'admin', 'admin-editor', 'rich-editor']);
} elseif ($pageType === 'design-system') {
    $styles = array_merge($styles, ['design-system', 'design-system-docs']);
} else {
    $styles = array_merge($styles, ['prose', 'pages', 'header', 'footer']);
    if ($pageType === 'home') array_push($styles, 'moments', 'intro');
}
foreach ($styles as $css): ?><link rel="stylesheet" href="/assets/css/<?=$css?>.css"><?php endforeach; ?>
<?php if ($pageType === 'home'): ?><script src="/assets/js/intro-gate.js"></script><?php endif; ?>
</head>

