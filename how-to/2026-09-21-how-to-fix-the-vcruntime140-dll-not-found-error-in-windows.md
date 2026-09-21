---
title: "How to Fix the 'VCRUNTIME140.dll Not Found' Error in Windows"
date: "2026-09-21T03:23:08.845Z"
slug: "how-to-fix-the-vcruntime140-dll-not-found-error-in-windows"
type: "how-to"
description: "Resolve the VCRUNTIME140.dll not found error in Windows with this comprehensive step-by-step guide. Learn why it happens and how to fix it."
keywords: "VCRUNTIME140.dll, DLL error, Windows error, fix VCRUNTIME140.dll, DLL not found, Visual C++ Redistributable, Windows 10, Windows 11"
---

# How to Fix the 'VCRUNTIME140.dll Not Found' Error in Windows

## Problem Explanation

You're trying to launch a specific application, play a game, or even install a new program on your Windows computer, and suddenly you're met with an error message. The most common variations include:

*   "VCRUNTIME140.dll not found."
*   "The program can't start because VCRUNTIME140.dll is missing from your computer."
*   "Cannot find C:\Windows\System32\VCRUNTIME140.dll."
*   "A required DLL file, VCRUNTIME140.dll, was not found."

This error indicates that a crucial component of the program you're trying to run, specifically the `VCRUNTIME140.dll` file, is either missing from your system or inaccessible. Without this file, Windows cannot properly execute the application, leading to it failing to launch or crashing unexpectedly. This is a frustrating roadblock for users who simply want to use their software.

## Why It Happens

The `VCRUNTIME140.dll` file is a dynamic-link library (DLL) that is part of Microsoft's Visual C++ Redistributable packages. These packages contain core runtime components that many Windows applications, especially those developed using Microsoft Visual C++, require to function correctly. Think of it as a shared toolbox that multiple programs can access to perform common operations.

When you encounter the "VCRUNTIME140.dll not found" error, it typically means that the specific version of the Visual C++ Redistributable package that your application needs is either not installed on your system, has become corrupted, or is not registered correctly with Windows. This can happen for several reasons, including incomplete software installations or uninstalls, accidental deletion of system files, or issues during Windows updates. Essentially, the program is looking for a specific tool in its toolbox, and it's either missing or broken.

## Step-by-Step Solution

The most reliable way to fix the "VCRUNTIME140.dll not found" error is to ensure the correct version of the Visual C++ Redistributable package is installed. Since `VCRUNTIME140.dll` is part of the Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022, installing the latest supported version will usually resolve the issue.

### ## Step 1: Identify the Correct Visual C++ Redistributable Version

The `VCRUNTIME140.dll` file is associated with Visual C++ Redistributable packages for Visual Studio 2015 and later. Therefore, the solution involves installing or repairing the "Microsoft Visual C++ Redistributable for Visual Studio 2015-2022". This single package covers multiple versions, making it the most comprehensive fix.

### ## Step 2: Download the Visual C++ Redistributable Package

1.  Open your web browser and navigate to the official Microsoft download page for the latest supported Visual C++ Redistributable downloads. You can search for "Visual C++ Redistributable latest supported downloads" or visit the Microsoft Download Center.
2.  On the download page, locate the section for **"Visual Studio 2015, 2017, 2019, and 2022"**.
3.  You will see options to download both `x86` (32-bit) and `x64` (64-bit) versions.
4.  **Crucially, download both versions.** Even if you are running a 64-bit version of Windows, some 32-bit applications might still require the 32-bit runtime components.

### ## Step 3: Install the Downloaded Packages

1.  Once the downloads are complete, navigate to your Downloads folder or wherever you saved the files.
2.  **First, run the `x64` installer.** Double-click the executable file (it will likely have a name similar to `vc_redist.x64.exe`).
3.  Follow the on-screen prompts. You will need to accept the license terms and click "Install."
4.  **After the `x64` installation is finished, run the `x86` installer.** Double-click the executable file (it will likely have a name similar to `vc_redist.x86.exe`).
5.  Again, accept the license terms and click "Install."

### ## Step 4: Restart Your Computer

After successfully installing both the `x86` and `x64` versions of the Visual C++ Redistributable, it is highly recommended to restart your computer. This ensures that all system files are properly loaded and that any changes made by the installation are fully applied.

### ## Step 5: Test the Application or Game

1.  After your computer has restarted, try running the application or game that was previously giving you the "VCRUNTIME140.dll not found" error.
2.  If the installation was successful and this was the root cause, the application should now launch without the DLL error.

### ## Step 6: (If the error persists) Repair Existing Installations

In rare cases, the error might persist if you already had a version of the Visual C++ Redistributable installed, but it became corrupted.

1.  Open **"Control Panel"**.
2.  Navigate to **"Programs" > "Programs and Features"**.
3.  In the list of installed programs, look for entries that say **"Microsoft Visual C++ 2015-2022 Redistributable (x86)"** and **"Microsoft Visual C++ 2015-2022 Redistributable (x64)"**.
4.  Select one of these entries, and then click **"Change"** at the top.
5.  If a "Repair" option is available, click it and follow the on-screen instructions.
6.  Repeat this process for the other `x86` or `x64` version if it also shows a "Repair" option.
7.  Restart your computer after completing any repairs.

## Common Mistakes

One common mistake users make is only downloading and installing the `x64` version of the Visual C++ Redistributable. While most modern applications are 64-bit, many older programs or even some newer ones might still be compiled as 32-bit applications. These 32-bit applications require the `x86` runtime components to function, even on a 64-bit Windows system. Failing to install both can leave you with the same DLL error for those specific applications. Another mistake is downloading DLL files from untrusted third-party websites. These sites often host malware or outdated versions of DLLs, which can further compromise your system's security and stability. Always obtain necessary system files directly from official Microsoft sources.

## Prevention Tips

To prevent the "VCRUNTIME140.dll not found" error from recurring, it's important to maintain your system's health and ensure proper software management. Keep your Windows operating system updated regularly. Microsoft often includes fixes and updates for core runtime components through Windows Update. Additionally, when uninstalling programs, use their dedicated uninstaller tools or Windows' built-in "Add or remove programs" feature. Avoid manually deleting program files or registry entries, as this can lead to orphaned or corrupted runtime components. If you frequently install or uninstall software, consider periodically downloading and installing the latest Visual C++ Redistributable packages from Microsoft to ensure you have the most up-to-date and functional versions of these essential libraries.