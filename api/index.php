<?php
declare(strict_types=1);
// Vercel 전용 프론트 컨트롤러. vercel-php 런타임은 api/ 아래 함수만 실행하므로
// 요청 경로를 고정된 진입점 목록과 대조해 연결합니다. 사용자 입력을 include 경로에 직접 연결하지 않습니다.
$root = dirname(__DIR__);
$entries = [];
foreach (['index','page','board','post','events','event','apply','clubs','club','education','course','learn','qualification','support','search','login','join','mypage','volunteers','volunteer','design-system'] as $name) {
    $entries['/' . $name . '.php'] = $root . '/' . $name . '.php';
}
foreach (['index','members','organizations','clubs','events','applications','education','qualifications','volunteers','safety','content','sponsors','notifications','edit'] as $name) {
    $entries['/admin/' . $name . '.php'] = $root . '/admin/' . $name . '.php';
}
$entries['/'] = $entries['/index.php'];
$entries['/admin/'] = $entries['/admin'] = $entries['/admin/index.php'];

$path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
if (is_string($path) && isset($entries[$path])) {
    require $entries[$path];
    return;
}
// 목록에 없는 경로는 layout.php의 404 처리로 넘깁니다.
require $root . '/includes/layout.php';
