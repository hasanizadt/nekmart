@echo off
tree /F /A > project_structure.txt
echo. >> project_structure.txt
echo ========== لیست کامل فایل‌ها ========== >> project_structure.txt
dir /s /b >> project_structure.txt
echo ساختار پروژه در project_structure.txt ذخیره شد.
pause