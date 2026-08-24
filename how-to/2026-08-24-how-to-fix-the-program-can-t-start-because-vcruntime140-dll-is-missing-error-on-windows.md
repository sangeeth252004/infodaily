---
title: "How to Fix \"The program can't start because VCRUNTIME140.dll is missing\" Error on Windows"
date: "2026-08-24T20:27:46.062Z"
slug: "how-to-fix-the-program-can-t-start-because-vcruntime140-dll-is-missing-error-on-windows"
type: "how-to"
description: "Resolve the \"VCRUNTIME140.dll is missing\" error on Windows with this comprehensive guide. Learn the causes and follow step-by-step solutions to get your programs running again."
keywords: "VCRUNTIME140.dll, missing DLL, Windows error, program not starting, Visual C++ Redistributable, fix DLL error, Windows troubleshooting, application error"
---

# How to Fix "The program can't start because VCRUNTIME140.dll is missing" Error on Windows

Encountering the "The program can't start because VCRUNTIME140.dll is missing" error message on your Windows computer can be frustrating. This error typically appears when you attempt to launch a specific application, game, or even sometimes during the Windows startup process. The message is straightforward: the system cannot find a crucial file, `VCRUNTIME140.dll`, which is essential for the program's execution. Without this file, the application is unable to load its necessary components and therefore cannot begin to run, leaving you with an unopenable program.

This particular DLL file, `VCRUNTIME140.dll`, is part of the Microsoft Visual C++ Redistributable package. Programs developed using Microsoft Visual Studio, a popular integrated development environment (IDE) for C++ and other languages, often rely on these redistributable packages to function correctly. These packages contain runtime components that applications need to operate, such as libraries for handling functions, memory management, and other essential programming tasks. When this specific DLL is missing or corrupted, the applications that depend on it will fail to launch.

## Why It Happens

The root cause of the "VCRUNTIME140.dll is missing" error is almost always related to the absence or corruption of the Microsoft Visual C++ Redistributable package for Visual Studio 2015, 2017, 2019, and 2022. When a program is installed, it might assume that the necessary Visual C++ runtime libraries are already present on your system. However, if they are not installed, or if they become corrupted due to incomplete installations, software conflicts, system crashes, or even malware, programs that require them will then present this "missing DLL" error.

Think of these DLL files as shared tools that multiple applications can use. If a particular set of tools (the Visual C++ Redistributable package) isn't available or is broken, any application that needs those specific tools will be unable to work. The error is a clear indicator that the software environment is not set up as the application expects, specifically concerning these fundamental runtime components provided by Microsoft.

## Step-by-Step Solution

The most reliable way to fix this error is by installing or repairing the Microsoft Visual C++ Redistributable package that contains the `VCRUNTIME140.dll` file. Since this DLL is part of newer Visual C++ versions, you'll typically need to install the latest supported versions.

### Step 1: Identify the Required Visual C++ Redistributable Version

The `VCRUNTIME140.dll` file is part of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. This means you need to download and install the package that supports these versions. Microsoft often bundles these together.

### Step 2: Download the Microsoft Visual C++ Redistributable Package

1.  Open your web browser and navigate to the official Microsoft website. Search for "Visual C++ Redistributable latest supported downloads."
2.  Locate the download page for the latest supported Visual C++ Redistributable packages. It's usually titled something like "Latest supported Visual C++ Redistributable downloads."
3.  You will typically see options for both x86 (32-bit) and x64 (64-bit) versions. Most modern Windows installations are 64-bit, but it's a good practice to download both to ensure compatibility with all applications. Look for the download links under the "Visual Studio 2015, 2017, 2019 and 2022" section.
4.  Download the appropriate installer files (e.g., `vc_redist.x64.exe` and `vc_redist.x86.exe`).

### Step 3: Install the Downloaded Packages

1.  Close all running applications to avoid potential conflicts during the installation process.
2.  Locate the downloaded installer files on your computer (usually in your Downloads folder).
3.  Double-click on the `vc_redist.x64.exe` file to run the installer.
4.  Accept the license terms and click "Install."
5.  Once the installation is complete, run the `vc_redist.x86.exe` file in the same manner, accepting the terms and installing it.
6.  You may be prompted to restart your computer after the installations are finished. It is highly recommended to do so.

### Step 4: Restart Your Computer

After installing the Visual C++ Redistributable packages, a system restart is crucial. This ensures that the newly installed DLL files are properly registered and available to the operating system and your applications.

### Step 5: Test the Application

1.  Once your computer has restarted, try launching the application that was previously giving you the "VCRUNTIME140.dll is missing" error.
2.  If the installation was successful and the package contained the necessary files, the application should now launch without the error.

### Step 6: Reinstall the Problematic Application (If Necessary)

In some rare cases, the application itself might have been corrupted during its installation. If reinstalling the Visual C++ Redistributable packages doesn't resolve the issue, try uninstalling and then reinstalling the specific program that is causing the error. This ensures that the application's files are correctly placed and that it can properly detect the newly installed runtime components.

### Step 7: Run System File Checker (Advanced Troubleshooting)

If the above steps do not resolve the issue, there might be deeper system file corruption. You can use the System File Checker (SFC) tool to scan for and repair corrupted Windows system files.

1.  Click the Start button, type `cmd` in the search bar.
2.  Right-click on "Command Prompt" and select "Run as administrator."
3.  In the Command Prompt window, type the following command and press Enter:
    ```
    sfc /scannow
    ```
4.  This process may take some time. Once it's finished, restart your computer and try launching the application again.

## Common Mistakes

A common mistake users make is attempting to download `VCRUNTIME140.dll` from unofficial "DLL download" websites. These sites can be risky, as they may offer outdated, incorrect, or even malware-infected DLL files. Downloading files from untrusted sources can lead to further system instability, security vulnerabilities, and more complex problems than the original error. Always obtain necessary system files and redistributable packages directly from official Microsoft sources to ensure safety and integrity.

Another mistake is only installing the x64 version of the Visual C++ Redistributable without the x86 version. While most modern systems are 64-bit, many applications, especially older ones or those designed for broader compatibility, are 32-bit and require the x86 libraries. Failing to install both can leave you with missing dependencies for certain programs.

## Prevention Tips

To prevent the "VCRUNTIME140.dll is missing" error and similar DLL-related issues from occurring in the future, it's essential to maintain a healthy and updated operating system. Regularly update Windows, as these updates often include fixes and newer versions of system components, including Visual C++ Redistributables. When installing new software, pay attention to any prerequisites or dependencies listed. If an application requires a specific Visual C++ Redistributable version, ensure it's installed.

Avoid abruptly shutting down your computer or uninstalling programs by force, as these actions can sometimes lead to corrupted or missing system files. If you encounter a software crash or system instability, it's a good practice to run `sfc /scannow` or a DISM scan (Deployment Image Servicing and Management) to ensure your system files are intact. Keeping your antivirus software up-to-date and performing regular scans can also help prevent malware from corrupting essential system files.