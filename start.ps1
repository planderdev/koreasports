$projectPath = $PSScriptRoot
Set-Location -LiteralPath $projectPath
php -S 127.0.0.1:8080 -t $projectPath
