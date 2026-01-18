---
title: "How to Fix 'The program can't start because VCRUNTIME140.dll was not found' Error in Windows"
date: "2026-01-18T01:48:05.178Z"
slug: "how-to-fix-the-program-can-t-start-because-vcruntime140-dll-was-not-found-error-in-windows"
type: "how-to"
description: "Resolve the VCRUNTIME140.dll not found error on Windows. This guide provides a comprehensive, step-by-step solution to get your applications running again."
keywords: "VCRUNTIME140.dll, error, fix, Windows, program not starting, dll missing, visual c++ runtime"
---

When you attempt to launch a program or game on your Windows computer, you might be greeted by an error message stating: "The program can't start because VCRUNTIME140.dll was not found. Reinstalling the program may fix this problem." This message is often accompanied by a generic application icon, indicating that the system cannot locate a crucial component needed for the software to execute. This is a common and frustrating issue that prevents users from accessing their applications.

The VCRUNTIME140.dll file is a dynamic-link library (DLL) file that is part of the Microsoft Visual C++ Redistributable package. These packages provide essential runtime components that many applications, particularly those developed using Microsoft's Visual C++ development environment, rely on to function correctly. Without this specific DLL, the program lacks the necessary building blocks to load and run, hence the error message.

## Why It Happens

The "VCRUNTIME140.dll was not found" error typically occurs for a few primary reasons. The most common cause is that the required Microsoft Visual C++ Redistributable package, specifically the version that includes VCRUNTIME140.dll (which is part of Visual C++ 2015-2022), is either not installed on your system or is corrupted. This can happen during operating system updates, clean installations, or if the package was inadvertently uninstalled or its files damaged.

Another possibility is that the program itself was not installed correctly, or its installation files are incomplete or corrupted, leading to a missing or invalid VCRUNTIME140.dll. In some rarer cases, malware or aggressive antivirus software might interfere with system files, including DLLs, by quarantining or deleting them. The VCRUNTIME140.dll file is vital for many modern Windows applications, and its absence or corruption will inevitably lead to program startup failures.

## Step-by-Step Solution

The most reliable way to fix the "VCRUNTIME140.dll was not found" error is to reinstall the necessary Microsoft Visual C++ Redistributable package. This package contains the VCRUNTIME140.dll file and other essential components.

### Step 1: Identify the Correct Visual C++ Redistributable Package

The VCRUNTIME140.dll file is distributed as part of the Microsoft Visual C++ 2015-2022 Redistributable package. It's important to download the correct version for your system architecture (32-bit or 64-bit). Most modern Windows systems are 64-bit.

### Step 2: Download the Visual C++ Redistributable Package

Navigate to the official Microsoft download page for the Visual C++ Redistributable packages. Search for "Visual C++ Redistributable latest supported download" in your web browser, or use the direct link if you are confident in its stability. You will find options for both x86 (32-bit) and x64 (64-bit) versions.

### Step 3: Install the Downloaded Package

Once the download is complete, locate the downloaded file (it will likely be an `.exe` file, such as `vc_redist.x64.exe` for 64-bit systems or `vc_redist.x86.exe` for 32-bit systems). Double-click the file to run the installer. Follow the on-screen prompts to accept the license terms and proceed with the installation. If prompted to repair an existing installation, choose that option. If it's a fresh installation, simply proceed.

### Step 4: Restart Your Computer

After the installation process is finished, it is crucial to restart your computer. This ensures that all system files are properly loaded and that the newly installed VCRUNTIME140.dll is recognized by the operating system and available to applications.

### Step 5: Test the Application

After restarting your computer, attempt to run the program or game that was previously showing the VCRUNTIME140.dll error. In most cases, this will resolve the issue, and the application should launch without further problems.

### Step 6: If the Error Persists, Reinstall the Problematic Program

If the error continues to occur even after installing the Visual C++ Redistributable package, the issue might lie with the program's installation itself. In this scenario, the best course of action is to uninstall the program completely and then reinstall it from its original source. Ensure you are downloading the latest version from a reputable source.

### Step 7: Consider System File Checker (SFC)

As a last resort, if none of the above steps work, you can use the built-in System File Checker tool to scan for and repair corrupted Windows system files. Open Command Prompt as an administrator by searching for "cmd" in the Start menu, right-clicking on "Command Prompt," and selecting "Run as administrator." Then, type `sfc /scannow` and press Enter. This process can take some time.

## Common Mistakes

One common mistake is downloading DLL files from unofficial third-party websites. These sites are often unreliable, may distribute malware, and the DLL files they offer could be outdated or incompatible, potentially causing more problems than they solve. Always obtain the Visual C++ Redistributable packages directly from Microsoft's official website. Another mistake is failing to restart the computer after installation. Without a restart, the system might not recognize the newly installed DLL, rendering the installation ineffective. Furthermore, users sometimes overlook the distinction between 32-bit (x86) and 64-bit (x64) versions, installing the wrong one for their system, which won't resolve the error.

## Prevention Tips

To prevent the "VCRUNTIME140.dll was not found" error from occurring in the future, ensure your Windows operating system is kept up-to-date with all available updates. Microsoft often bundles necessary runtime components with Windows updates. When installing new software, always download it from the official publisher's website. Avoid downloading software from untrusted sources, as these installations might be incomplete or may not include all required dependencies. Regularly running a reputable antivirus and anti-malware scan can also help prevent malicious software from corrupting or deleting essential system files like DLLs. If you frequently encounter this error across multiple applications, consider performing a more thorough check of your system's integrity.