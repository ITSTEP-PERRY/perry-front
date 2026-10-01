# Creates / refreshes "Perry Desktop" and "Perry Mobile" shortcuts
# in the repo root and on the current user's Desktop.
# Run after clone:  powershell -ExecutionPolicy Bypass -File .\Install-Perry-Shortcuts.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sh = New-Object -ComObject WScript.Shell

$desktopCmd = Join-Path $root "start-desktop.cmd"
$mobileCmd = Join-Path $root "start-mobile.cmd"
if (-not (Test-Path -LiteralPath $desktopCmd)) { throw "Missing $desktopCmd" }
if (-not (Test-Path -LiteralPath $mobileCmd)) { throw "Missing $mobileCmd" }

$targets = @(
  @{ Name = "Perry Desktop.lnk"; Target = $desktopCmd; WorkDir = $root; Icon = "shell32.dll,14" },
  @{ Name = "Perry Mobile.lnk"; Target = $mobileCmd; WorkDir = (Join-Path $root "mobile"); Icon = "shell32.dll,13" }
)

$desktopDir = [Environment]::GetFolderPath("Desktop")
$dirs = @($root, $desktopDir) | Select-Object -Unique

foreach ($dir in $dirs) {
  foreach ($t in $targets) {
    $path = Join-Path $dir $t.Name
    $lnk = $sh.CreateShortcut($path)
    $lnk.TargetPath = $t.Target
    $lnk.WorkingDirectory = $t.WorkDir
    $lnk.WindowStyle = 1
    $lnk.Description = $t.Name.Replace(".lnk", "")
    $lnk.IconLocation = $t.Icon
    $lnk.Save()
    Write-Host "OK  $path"
  }
}

Write-Host ""
Write-Host "Shortcuts ready. Double-click:"
Write-Host "  Perry Desktop  -> http://localhost:3000"
Write-Host "  Perry Mobile   -> http://localhost:8081"
