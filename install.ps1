param([string]$ProjectPath = 'F:\plan d\plan-d')
$ErrorActionPreference = 'Stop'
$target = (Resolve-Path -LiteralPath $ProjectPath).Path
if (!(Test-Path -LiteralPath (Join-Path $target 'package.json'))) { throw '请选择网站项目目录。' }
$expected = @{
 'BjdApp.tsx'='56A29E18AAEF12C608895F99163E77B198871633B664D5EDD92BA40613138277'
 'MobileHome.tsx'='136FA41624E3384901C1D3654245617864E7D1CE0059BD2AA34571B078F9487C'
 'HomeSupport.tsx'='D0A5C50BF40BBBA367794121A14A6BB78D1A6B372821133C9372121E12E6D0A4'
}
foreach ($name in $expected.Keys) {
 $file = Join-Path $target ('src\'+$name)
 if (!(Test-Path -LiteralPath $file) -or (Get-FileHash -LiteralPath $file).Hash -ne $expected[$name]) { throw ('文件已变更，停止更新以避免覆盖：'+$name) }
}
foreach ($name in @('HomeStoryEntry.tsx','home-entry-refresh.css')) {
 if (Test-Path -LiteralPath (Join-Path $target ('src\'+$name))) { throw ('新文件已存在，停止更新：'+$name) }
}
$backup = Join-Path $target ('home-update-backup-'+(Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $backup | Out-Null
foreach ($name in $expected.Keys) { Copy-Item -LiteralPath (Join-Path $target ('src\'+$name)) -Destination (Join-Path $backup $name) }
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'restore.ps1') -Destination (Join-Path $backup 'restore.ps1')
foreach ($file in Get-ChildItem -LiteralPath (Join-Path $PSScriptRoot 'src') -File) { Copy-Item -LiteralPath $file.FullName -Destination (Join-Path $target ('src\'+$file.Name)) }
Write-Host ('更新完成。原文件已备份到：'+$backup)
Write-Host '未发布上线。请在项目目录运行 npm run build，检查通过后再自行发布。'
