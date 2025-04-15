@echo off
setlocal enabledelayedexpansion

:: اطلاعات اسکریپت
echo ****************************************************
echo * تغییر پسوند فایل‌ها در پوشه جاری و زیرپوشه‌ها *
echo ****************************************************
echo.

:: دریافت پارامترها
if "%~1"=="" (
    set /p "oldExt=لطفا پسوند فعلی فایل‌ها را وارد کنید (مثلا txt): "
) else (
    set "oldExt=%~1"
)

if "%~2"=="" (
    set /p "newExt=لطفا پسوند جدید را وارد کنید (مثلا doc): "
) else (
    set "newExt=%~2"
)

:: اعتبارسنجی ورودی‌ها
if "!oldExt!"=="" (
    echo خطا: پسوند فعلی نمی‌تواند خالی باشد
    pause
    exit /b 1
)

if "!newExt!"=="" (
    echo خطا: پسوند جدید نمی‌تواند خالی باشد
    pause
    exit /b 1
)

:: نمایش اطلاعات
echo.
echo در حال جستجو برای فایل‌های *.!oldExt! در پوشه جاری و زیرپوشه‌ها...
echo پسوند جدید: !newExt!
echo.

:: شمارنده فایل‌ها
set totalCount=0

:: تابع تغییر پسوند
call :ChangeExtensions

:: نمایش نتیجه نهایی
echo.
echo عملیات تکمیل شد!
echo تعداد کل فایل‌های تغییر یافته: !totalCount!
pause
exit /b 0

:: --------------------------------------------------
:: تابع اصلی برای تغییر پسوند فایل‌ها
:ChangeExtensions
for /r %%f in (*.!oldExt!) do (
    set "filePath=%%~dpf"
    set "fileName=%%~nf"
    
    echo تغییر نام: %%f
    ren "%%f" "!fileName!.!newExt!"
    
    set /a "totalCount+=1"
)

:: پردازش برای فایل‌هایی که پسوندشان با حروف بزرگ نوشته شده
for /r %%f in (*.!oldExt:~0,1!) do (
    set "ext=%%~xf"
    set "ext=!ext:~1!"
    
    if /i "!ext!"=="!oldExt!" (
        set "filePath=%%~dpf"
        set "fileName=%%~nf"
        
        echo تغییر نام: %%f
        ren "%%f" "!fileName!.!newExt!"
        
        set /a "totalCount+=1"
    )
)
goto :eof