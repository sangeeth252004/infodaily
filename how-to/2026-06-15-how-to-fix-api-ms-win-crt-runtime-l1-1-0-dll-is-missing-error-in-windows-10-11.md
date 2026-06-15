---
title: "How to Fix 'api-ms-win-crt-runtime-l1-1-0.dll is Missing' Error in Windows 10/11"
date: "2026-06-15T10:54:24.102Z"
slug: "how-to-fix-api-ms-win-crt-runtime-l1-1-0-dll-is-missing-error-in-windows-10-11"
type: "how-to"
description: "Resolve the persistent 'api-ms-win-crt-runtime-l1-1-0.dll is missing' error in Windows 10 and 11 with this comprehensive technical guide. Learn the causes, step-by-step solutions, and prevention tips."
keywords: "api-ms-win-crt-runtime-l1-1-0.dll, missing dll, Windows 10 error, Windows 11 error, runtime error, Visual C++ Redistributable, DLL error fix, software installation error"
---

The 'api-ms-win-crt-runtime-l1-1-0.dll is missing' error is a common, albeit frustrating, problem encountered by Windows users. This error message typically appears when you attempt to launch a specific application, or sometimes even when starting up your computer. The precise wording might vary slightly, but it often states something to the effect of: "The program can't start because api-ms-win-crt-runtime-l1-1-0.dll is missing from your computer." This prevents the intended software from executing, leaving you unable to use it.

This error signifies that a critical component of the Windows operating system, specifically a dynamic-link library (DLL) file named `api-ms-win-crt-runtime-l1-1-0.dll`, cannot be found or accessed by the application trying to use it. DLL files are essential pieces of code that multiple programs can share, allowing for more efficient use of system resources. When one of these vital files is missing, corrupted, or improperly registered, applications that depend on it will fail to launch.

### Why It Happens

The `api-ms-win-crt-runtime-l1-1-0.dll` file is part of the Universal C Runtime (UCRT) in Windows. The UCRT is a foundational component that provides standard C library functions for applications developed using Microsoft's Visual C++ development tools. Essentially, many modern applications, especially those built for Windows, rely on this specific DLL to perform core runtime operations.

This error most commonly occurs due to incomplete or failed software installations, uninstallation of programs that remove shared dependencies, or corruption of system files. When an application is installed, it often installs its required runtime libraries. If this installation process is interrupted, or if a later action inadvertently removes or damages the UCRT components, the `api-ms-win-crt-runtime-l1-1-0.dll` file can become inaccessible. It's also possible for Windows updates to sometimes cause conflicts or for malware to interfere with system files, leading to such issues.

### Step-by-Step Solution

The most effective and recommended way to resolve the 'api-ms-win-crt-runtime-l1-1-0.dll is missing' error is by installing or repairing the necessary Microsoft Visual C++ Redistributable package. This package contains the UCRT and related runtime libraries that your applications need.

## Step 1: Identify Your Windows Architecture (32-bit or 64-bit)

Before downloading the correct Visual C++ Redistributable package, you need to know whether your Windows operating system is 32-bit (x86) or 64-bit (x64).

1.  Press the `Windows key + I` to open **Settings**.
2.  Click on **System**.
3.  Scroll down and click on **About**.
4.  Under "Device specifications," look for "System type." It will indicate either "64-bit operating system, x64-based processor" or "32-bit operating system, x86-based processor."

## Step 2: Download the Microsoft Visual C++ Redistributable Package

Microsoft provides a consolidated download package that includes the necessary runtime components for both 32-bit and 64-bit systems.

1.  Open your web browser and go to the official Microsoft download page for the latest supported Visual C++ Redistributable downloads. Search for "Visual C++ Redistributable latest supported downloads" on your preferred search engine, and ensure you click on a Microsoft-signed link.
2.  On the download page, you will typically see options for different versions. Look for the section that mentions the **latest supported Visual C++ Redistributable downloads**.
3.  You will usually find download links for `vc_redist.x86.exe` (for 32-bit systems) and `vc_redist.x64.exe` (for 64-bit systems).
4.  **Download both `vc_redist.x86.exe` and `vc_redist.x64.exe`**, regardless of your system's architecture. This ensures you cover all potential dependencies for applications.

## Step 3: Install the Downloaded Packages

With the files downloaded, it's time to install them. It's generally best to install the 32-bit version first, followed by the 64-bit version, though the order is often not critical.

1.  Locate the downloaded files (e.g., `vc_redist.x86.exe` and `vc_redist.x64.exe`) in your Downloads folder.
2.  Double-click on `vc_redist.x86.exe` to run the installer.
3.  Follow the on-screen prompts. You will need to accept the license terms and click **Install**.
4.  Once the installation is complete, repeat the process for `vc_redist.x64.exe`. Accept the license terms and click **Install**.

If prompted to repair an existing installation, choose that option.

## Step 4: Restart Your Computer

After successfully installing both redistributable packages, a system restart is crucial to ensure that the changes are applied correctly and that all running processes recognize the newly installed or updated DLL files.

1.  Close all open applications.
2.  Click on the **Start** button.
3.  Click on the **Power** icon.
4.  Select **Restart**.

## Step 5: Test the Application

Once your computer has restarted, try launching the application that was previously giving you the 'api-ms-win-crt-runtime-l1-1-0.dll is missing' error.

1.  Navigate to the application's shortcut or executable file.
2.  Double-click to launch it.

If the problem was due to the missing or corrupted DLL, the application should now start without displaying the error message.

## Step 6: If the Error Persists, Use the System File Checker (SFC)

In rare cases, the issue might be related to broader system file corruption. The System File Checker (SFC) tool can scan for and repair corrupted Windows system files, including DLLs.

1.  Open **Command Prompt as administrator**.
    *   Click the **Start** button.
    *   Type `cmd`.
    *   Right-click on **Command Prompt** in the search results and select **Run as administrator**.
2.  In the Command Prompt window, type the following command and press `Enter`:
    ```
    sfc /scannow
    ```
3.  Allow the scan to complete. This process can take some time. The tool will report if it found any issues and if it was able to repair them.

## Step 7: Restart and Test Again

After running the SFC scan, restart your computer one more time to ensure all repaired files are properly implemented. Then, test the application again to see if the error is resolved.

### Common Mistakes

One of the most frequent mistakes users make is attempting to download DLL files from unofficial third-party websites. These sites often host outdated or corrupted versions of DLLs, or they might bundle malware with the download. This can exacerbate the problem, introduce security risks, or lead to new, unexpected errors. Always obtain system files and redistributable packages directly from the official vendor, which in this case is Microsoft. Another common error is not restarting the computer after installation; the system needs a reboot for the newly registered DLLs to be recognized by all running processes.

Some users might also incorrectly assume they only need to install the 32-bit or 64-bit version based on their system type. While this is often true, applications can sometimes have dependencies on the opposite architecture, especially in complex software environments. Installing both versions ensures maximum compatibility and addresses potential hidden dependencies. Finally, failing to run the Command Prompt or PowerShell as an administrator for commands like `sfc /scannow` will prevent the tool from making necessary system changes, rendering the operation ineffective.

### Prevention Tips

To prevent the 'api-ms-win-crt-runtime-l1-1-0.dll is missing' error and similar DLL-related issues from recurring, it's essential to maintain a healthy and updated Windows environment. Regularly run Windows Update to ensure your operating system and its core components, including the Universal C Runtime, are up to date. These updates often include fixes and enhancements that can prevent such problems.

Be mindful during software installations and uninstalls. Pay attention to prompts, especially those related to installing runtime libraries. Avoid forcefully closing or interrupting software installations. When uninstalling programs, use the official uninstaller provided by Windows or the software itself, rather than manually deleting program folders, as this can inadvertently remove shared DLL files. Consider using a reputable antivirus program and keeping it updated to protect your system from malware that could corrupt or delete critical system files.