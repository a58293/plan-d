$ErrorActionPreference='Stop'
$project=Split-Path -Parent $PSScriptRoot
foreach($name in @('BjdApp.tsx','MobileHome.tsx','HomeSupport.tsx')){
 Copy-Item -LiteralPath (Join-Path $PSScriptRoot $name) -Destination (Join-Path $project ('src\'+$name))
}
Write-Host '原首页已恢复。新增的两个文件保留在 src 中，但不再被首页引用。'
