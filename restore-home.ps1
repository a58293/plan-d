param([string]$ProjectPath='F:\plan d\plan-d')
$ErrorActionPreference='Stop'
$target=(Resolve-Path -LiteralPath $ProjectPath).Path
$expected=@{
 'BjdApp.tsx'='FE757AA74FD4662C0D86EA23C0B88382A577F78F1B2B5FC5362B31C9541F0C16'
 'MobileHome.tsx'='0847232D882A8A64D9E96A7BADE465C8C0FD27069BBDB4459A1F1923F4F76620'
 'HomeSupport.tsx'='4C0396207184513A9C009F2667DC02C5F6301FFE7E52F653BB2AA43E3A0C2A52'
}
foreach($name in $expected.Keys){
 $file=Join-Path $target ('src\'+$name)
 if(!(Test-Path -LiteralPath $file) -or (Get-FileHash -LiteralPath $file).Hash -ne $expected[$name]){throw ('文件已再次修改，停止以免覆盖：'+$name)}
}
$backup=Join-Path $target ('before-home-restore-'+(Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $backup | Out-Null
foreach($name in $expected.Keys){
 Copy-Item -LiteralPath (Join-Path $target ('src\'+$name)) -Destination (Join-Path $backup $name)
}
foreach($name in $expected.Keys){
 Copy-Item -LiteralPath (Join-Path $PSScriptRoot ('src\'+$name)) -Destination (Join-Path $target ('src\'+$name))
}
Write-Host '已恢复原首页结构、电脑防伪章节、手机防伪板块及主推区防伪入口。未发布上线。'
Write-Host ('恢复前文件备份：'+$backup)
