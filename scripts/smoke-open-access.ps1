# Adversarial open-access smoke for self-hosted AgentTrader
$ErrorActionPreference = "Stop"
$base = $env:AGENTTRADER_URL
if (-not $base) { $base = "http://127.0.0.1:8000" }

Write-Host "=== AgentTrader open-access smoke @ $base ==="

$health = Invoke-RestMethod -Uri "$base/api/health" -TimeoutSec 5
if (-not $health.ok) { throw "health.ok != true" }
if ($health.authRequired -eq $true) { throw "authRequired is true (expected open default)" }
if (-not $health.version) { throw "health.version missing (traceability)" }
if ($null -eq $health.uptimeSec) { throw "health.uptimeSec missing" }
Write-Host "health OK mode=$($health.mode) ui=$($health.ui) v=$($health.version) up=$($health.uptimeSec)s pid=$($health.pid) reqs=$($health.requestCount)"

# metrics path
$metrics = Invoke-RestMethod -Uri "$base/api/metrics" -TimeoutSec 5
if (-not $metrics.ok) { throw "metrics.ok != true" }
Write-Host "metrics OK reqs=$($metrics.requestCount)"

function Assert-TrpcOk([string]$proc) {
  $r = Invoke-WebRequest -Uri "$base/api/trpc/$proc" -UseBasicParsing -TimeoutSec 10
  if ($r.StatusCode -ne 200) { throw "$proc status $($r.StatusCode)" }
  if ($r.Content -match "UNAUTHORIZED") { throw "$proc returned UNAUTHORIZED" }
  Write-Host "OK $proc"
}

Assert-TrpcOk "bot.list"
Assert-TrpcOk "exchangeAccount.list"
Assert-TrpcOk "bot.getStrategies"

$html = (Invoke-WebRequest -Uri "$base/" -UseBasicParsing).Content
if ($html -notmatch "agentrader") { throw "UI title missing" }
$spa = Invoke-WebRequest -Uri "$base/dashboard/bot" -UseBasicParsing
if ($spa.StatusCode -ne 200) { throw "SPA deep link failed" }

Write-Host "ALL PASS - open self-hosted + pro native UI"
