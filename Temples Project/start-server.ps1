$ErrorActionPreference = "Stop"

 $connection = Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue
 $process = if ($connection) { Get-Process -Id $connection.OwningProcess -ErrorAction SilentlyContinue } else { $null }

if ($process -and $process.ProcessName -eq "python") {
  Write-Host "Stopping the old Python preview server on port 8000..."
  Stop-Process -Id $process.Id -Force
}

Write-Host "Starting TempleTrip with email delivery support..."
node server.js