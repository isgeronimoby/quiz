 @echo off

attrib -r *.* /s

FOR /D %%p IN ("bin\*.*") DO rmdir "%%p" /s /q

set "browsers=chrome firefox safari"

set pth=%~dp0
echo %pth%


set contentFolders[chrome]=chrome
set contentFolders[firefox]=firefox\content
set contentFolders[safari]=safari\toolbar.safariextension

set htmlPath[chrome]=../
set htmlPath[firefox]=chrome://wg/content/html/
set htmlPath[safari]=../

echo ****%cf.chrome%

setlocal enableDelayedExpansion
FOR %%C IN (%browsers%) DO (

	

	
	mkdir bin\!contentFolders[%%C]!\html
	xcopy /s/y %%C bin\%%C
	xcopy /s/y html bin\!contentFolders[%%C]!\html


    xcopy /y inject.js bin\!contentFolders[%%C]!

	xcopy /y inject_content.js bin\!contentFolders[%%C]!

	set htmlfiles=
	cd bin\!contentFolders[%%C]!\html
	FOR /F "delims=" %%i IN ('dir /s/b *.html') DO ( 
		call :removeSubstr %%i  %pth%bin\!contentFolders[%%C]!\html\
	set "htmlfiles=!htmlfiles!,!substr!"
	)
	
	cd %pth%
	 
	call :FindReplace "{HTML_FILES}" "!htmlfiles:~1!" bin\%%C\inject_content.js		
	
	call :FindReplace "{HTML_PATH}" "!htmlPath[%%C]!" bin\!contentFolders[%%C]!\html\css\all.css	
	
	
	
)

cd bin\firefox
	..\..\7za a -tzip ..\..\firefox.xpi *
cd %pth%

cd bin\chrome\html\images
set imgPathes=
	FOR /F "delims=" %%i IN ('dir /s/b *.*') DO set "imgPathes=!imgPathes!^",^"%%i"
	set "imgPathes=!imgPathes:%pth%bin\chrome\=!"
	set imgPathes=!imgPathes:~2!^"
	echo ######!imgPathes!
	cd %pth%
	
	

endlocal
exit /b


rem set "clubs=Liverpool Everton"
set "clubs=Everton"

FOR %%C IN (%clubs%) DO (

	FOR %%A IN (%browsers%) DO (
		call :FindReplace "{CLUB_NAME}" "%%C" bin\%%C\%%A\common.js		
	)


call :FindReplace "{CLUB_NAME}" "%%C" bin\%%C\chrome\manifest.json
call :FindReplace "{CLUB_NAME}" "%%C" bin\%%C\chrome\global.html
call :FindReplace "{HASH_TAG}" "%%hashTag[%%C]%%" bin\%%C\chrome\global.html
	call :FindReplace "{BUILD_VERSION}" "%version%" bin\%%C\chrome\manifest.json
	
	call :FindReplace "{CLUB_NAME}" "%%C" bin\%%C\firefox\install.rdf
	call :FindReplace "{CLUB_NAME}" "%%C" bin\%%C\firefox\content\templates.html
	call :FindReplace "{HASH_TAG}" "%%hashTag[%%C]%%" bin\%%C\firefox\content\templates.html
	call :FindReplace "{BUILD_VERSION}" "%version%" bin\%%C\firefox\install.rdf
	call :FindReplace "{BUILD_VERSION}" "%version%" bin\%%C\firefox\content\adapter.js
	call :FindReplace "{BUILD_VERSION}" "%version%" bin\%%C\firefox\bootstrap.js
	call :FindReplace "{SERVER_URL}" "%%serverUrl[%%C%build%]%%" bin\%%C\firefox\install.rdf
	
	call :FindReplace "{CLUB_NAME}" "%%C" bin\%%C\safari\toolbar.safariextension\info.plist
	call :FindReplace "{CLUB_NAME}" "%%C" bin\%%C\safari\toolbar.safariextension\global.html
	call :FindReplace "{HASH_TAG}" "%%hashTag[%%C]%%" bin\%%C\safari\toolbar.safariextension\global.html
	call :FindReplace "{BUILD_VERSION}" "%version%" bin\%%C\safari\toolbar.safariextension\info.plist
	call :FindReplace "{SERVER_URL}" "%%serverUrl[%%C%build%]%%" bin\%%C\safari\toolbar.safariextension\info.plist

	cd bin\%%C
	..\..\7za a -tzip %%C.zip chrome\

	cd firefox

	

	

	..\..\..\7za a -tzip ..\%%C.xpi *

	C:\cygwin64\bin\sha256sum ..\%%C.xpi
	cd..
	cd..
	cd..

	ECHO ****************%%C***************
)




exit /b 

:FindReplace <findstr> <replstr> <file>
set tmp="%temp%\tmp.txt"
If not exist %temp%\_.vbs call :MakeReplace
for /f "tokens=*" %%a in ('dir "%3" /s /b /a-d /on') do (
  for /f "usebackq" %%b in (`Findstr /mic:"%~1" "%%a"`) do (
    echo(&Echo Replacing "%~1" with "%~2" in file %%~nxa
    <%%a cscript //nologo %temp%\_.vbs "%~1" "%~2">%tmp%
	echo ##"%~2"
    if exist %tmp% move /Y %tmp% "%%~dpnxa">nul
  )
)
del %temp%\_.vbs
exit /b

:MakeReplace
>%temp%\_.vbs echo with Wscript
>>%temp%\_.vbs echo set args=.arguments
>>%temp%\_.vbs echo .StdOut.Write _
>>%temp%\_.vbs echo Replace(.StdIn.ReadAll,args(0),args(1),1,-1,1)
>>%temp%\_.vbs echo end with

exit /b




:removeSubstr <str> <substr> 
set substr=%1
set substr=!substr:%2=!
exit /b
