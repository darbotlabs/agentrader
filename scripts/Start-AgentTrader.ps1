# Durable AgentTrader daemon launcher (Windows)
# Breaks out of parent Job Objects so the daemon survives agent shells.
param(
  [string]$HostBind = "127.0.0.1",
  [int]$Port = 8000,
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
)

$ErrorActionPreference = "Stop"
$data = Join-Path $env:USERPROFILE ".agentrader"
New-Item -ItemType Directory -Force -Path $data | Out-Null
$pidFile = Join-Path $data "daemon.pid"
$outLog = Join-Path $data "daemon.out.log"
$errLog = Join-Path $data "daemon.err.log"
$daemonRel = "app\dist\daemon.mjs"
$daemonAbs = Join-Path $Root $daemonRel

if (-not (Test-Path $daemonAbs)) {
  throw "Missing $daemonAbs - run: cd app; npx tsup"
}
if (-not (Test-Path (Join-Path $Root "app\frontend\index.html"))) {
  throw "Missing app/frontend - build pro/frontend and copy dist to app/frontend"
}

# Persist bind settings (and env override path)
$settings = @{ host = $HostBind; port = $Port } | ConvertTo-Json
Set-Content (Join-Path $data "settings.json") -Value $settings -Encoding UTF8

function Test-Health {
  try {
    return Invoke-RestMethod -Uri "http://${HostBind}:${Port}/api/health" -TimeoutSec 2
  } catch {
    return $null
  }
}

Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue | ForEach-Object {
  Write-Host "Stopping previous PID $($_.OwningProcess) on :$Port"
  Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
}
Start-Sleep -Milliseconds 900

$startCmdPath = Join-Path $data "start-daemon.cmd"
$startCmd = @"
@echo off
set ADMIN_PASSWORD=agentrader
set DATABASE_URL=file:C:/Users/darbot/.agentrader/dev.db
set HOST=$HostBind
set PORT=$Port
set AGENTTRADER_VERSION=1.0.0-beta.29
rem Open self-hosted: do NOT set AGENTTRADER_REQUIRE_AUTH
cd /d "$Root"
node $daemonRel >> "$outLog" 2>> "$errLog"
"@
Set-Content $startCmdPath -Value $startCmd -Encoding ASCII

# UseShellExecute + cmd start = breakaway from job object (critical for reliability)
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "cmd.exe"
$psi.Arguments = "/c start `"agentrader`" /MIN `"$startCmdPath`""
$psi.WorkingDirectory = $Root
$psi.UseShellExecute = $true
$psi.CreateNoWindow = $false
[void][System.Diagnostics.Process]::Start($psi)

Write-Host "Launched via breakaway start-daemon.cmd"

$health = $null
for ($i = 0; $i -lt 50; $i++) {
  Start-Sleep -Milliseconds 400
  $health = Test-Health
  if ($health -and $health.ok) { break }
}

if (-not $health -or -not $health.ok) {
  Write-Host "Daemon failed to become healthy. Last err log:"
  if (Test-Path $errLog) { Get-Content $errLog -Tail 40 }
  if (Test-Path $outLog) { Get-Content $outLog -Tail 20 }
  throw "AgentTrader not healthy on http://${HostBind}:${Port}"
}

# Record listener PID
$listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue |
  Select-Object -First 1 -ExpandProperty OwningProcess
if ($listener) { $listener | Set-Content $pidFile }

Write-Host "HEALTH $($health | ConvertTo-Json -Compress)"
Write-Host "UI http://${HostBind}:${Port}/"
Write-Host "PID file $pidFile listener=$listener"
