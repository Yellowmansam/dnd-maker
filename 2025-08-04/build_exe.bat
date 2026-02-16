@echo off
setlocal

cd /d "%~dp0"

if not exist ".venv" (
  py -m venv .venv
)

call ".venv\Scripts\activate.bat"
python -m pip install --upgrade pip
pip install -r requirements-desktop.txt

pyinstaller --noconfirm --clean --windowed --onefile --name dnd-character-builder desktop_launcher.py

echo.
echo Build complete. EXE is in: dist\dnd-character-builder.exe
endlocal
