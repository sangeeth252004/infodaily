---
title: "How to Fix 'VCRUNTIME140.dll not found' Error When Launching Applications in Windows"
date: "2026-09-11T09:21:45.152Z"
slug: "how-to-fix-vcruntime140-dll-not-found-error-when-launching-applications-in-windows"
type: "how-to"
description: "Learn how to resolve the VCRUNTIME140.dll not found error in Windows, a common issue preventing applications from starting. This guide provides a step-by-step solution and prevention tips."
keywords: "VCRUNTIME140.dll, Windows error, DLL not found, Visual C++ Redistributable, application error, fix DLL error, Windows troubleshooting"
---

## Problem Explanation

You're trying to launch a program on your Windows computer, whether it's a game, a productivity application, or even a system utility, and instead of starting normally, you're met with an error message. This message commonly states something like: "This application failed to start because VCRUNTIME140.dll was not found. Reinstalling the application may fix this problem." Sometimes, the message might be slightly different, but the core issue remains the same: a critical system file, `VCRUNTIME140.dll`, is missing or corrupted. This prevents the application from loading its necessary components and therefore prevents it from running.

This error can be frustrating because it often appears without any obvious changes to your system. You might have recently installed a new piece of software, updated another, or even just restarted your computer, and suddenly applications that worked fine before now refuse to open, displaying this persistent `VCRUNTIME140.dll` error. It's a roadblock that stops your digital workflow dead in its tracks.

## Why It Happens

The `VCRUNTIME140.dll` file is part of Microsoft's Visual C++ Redistributable package. Specifically, it's associated with Visual Studio 2015, 2017, 2019, and 2022. Many modern applications, especially those developed using these versions of Visual Studio, rely on this DLL file to function correctly. It contains essential functions and libraries that the application needs to execute.

The error "VCRUNTIME140.dll not found" occurs when Windows cannot locate this file in its expected directories, or when the file is corrupted, incomplete, or an incorrect version. This can happen for several reasons:

*   **Incomplete Installation:** The application that requires this DLL might not have been installed completely, meaning the Redistributable package wasn't properly installed alongside it.
*   **Accidental Deletion:** While unlikely for system files, it's possible the DLL was inadvertently deleted or moved by another program or user.
*   **Software Conflicts:** Sometimes, other software installations or updates can overwrite or interfere with existing system files, leading to corruption or removal.
*   **Corrupted System Files:** General corruption within your Windows operating system can also affect critical DLLs.
*   **Malware Infection:** In rarer cases, malware could delete or corrupt system files like `VCRUNTIME140.dll`.

## Step-by-Step Solution

The most reliable way to fix the "VCRUNTIME140.dll not found" error is to reinstall the necessary Microsoft Visual C++ Redistributable package. Since this DLL is part of a package that supports multiple versions of Visual C++, you will want to install the latest supported version.

### ## Step 1: Identify Your Windows Architecture (32-bit or 64-bit)

Before downloading the correct installer, you need to know if your Windows operating system is 32-bit or 64-bit.

1.  Press the **Windows key + R** on your keyboard to open the Run dialog box.
2.  Type `msinfo32` and press **Enter** or click **OK**. This opens the System Information window.
3.  In the System Summary pane, look for the "System Type" entry. It will say either "x64-based PC" (for 64-bit) or "x86-based PC" (for 32-bit).
4.  Note this down and close the System Information window.

### ## Step 2: Download the Microsoft Visual C++ Redistributable Package

Visit the official Microsoft website to download the correct package. It's crucial to download from Microsoft directly to avoid malware.

1.  Open your web browser and go to the Microsoft Visual C++ Redistributable latest supported downloads page. (A quick search for "Visual C++ Redistributable download" will lead you there, typically the first result is from microsoft.com).
2.  Scroll down to the section titled "Visual Studio 2015, 2017, 2019, and 2022".
3.  Under this section, you will see download links. Look for **vc\_redist.x64.exe** for 64-bit systems and **vc\_redist.x86.exe** for 32-bit systems.
4.  If your system is 64-bit, download **vc\_redist.x64.exe**. If your system is 32-bit, download **vc\_redist.x86.exe**. **If you are unsure or have a 64-bit system, it's generally recommended to download and install both the x64 and x86 versions, as some older applications might still require the 32-bit components even on a 64-bit OS.**

### ## Step 3: Run the Installer

Once the download is complete, you need to run the installer(s).

1.  Locate the downloaded installer file(s) (e.g., `vc_redist.x64.exe` or `vc_redist.x86.exe`) in your Downloads folder or wherever you saved them.
2.  Double-click the installer file to begin the installation process.
3.  You will likely see a license terms agreement. Read and accept the terms.
4.  Click the **Install** button.
5.  The installer will proceed to install or repair the Visual C++ Redistributable components. This process usually takes only a minute or two.
6.  If prompted, click **Yes** to allow the app to make changes to your device.
7.  If the installer indicates that the components are already installed and offers a "Repair" option, choose **Repair** instead of Install. This will attempt to fix any corrupted files.
8.  If you downloaded both x64 and x86 versions, repeat steps 2-7 for the other installer file.

### ## Step 4: Restart Your Computer

A restart is crucial for the system to properly recognize and load the newly installed or repaired DLL files.

1.  After the installation or repair process is complete, you will usually see a confirmation message.
2.  Click on the **Restart now** button if it's offered, or manually restart your computer through the Start Menu.

### ## Step 5: Test the Application

After your computer has restarted, try launching the application that was previously giving you the `VCRUNTIME140.dll` error.

1.  Navigate to the application's executable file or its shortcut.
2.  Double-click to launch it.
3.  If the application now starts without displaying the error message, the problem is resolved.

### ## Step 6: If the Error Persists (Advanced Troubleshooting)

If the error continues to appear after reinstalling the Redistributables, there might be a deeper issue.

1.  **Run System File Checker (SFC):** This built-in Windows tool scans for and repairs corrupted system files.
    *   Open **Command Prompt as Administrator**. To do this, type `cmd` in the Windows search bar, right-click on "Command Prompt," and select "Run as administrator."
    *   In the Command Prompt window, type the following command and press **Enter**:
        ```
        sfc /scannow
        ```
    *   Let the scan complete. It can take some time. Once finished, restart your computer and test the application again.
2.  **Check for Windows Updates:** Ensure your Windows operating system is fully up to date, as updates can sometimes include fixes for system component issues.

## Common Mistakes

One of the most common mistakes users make is attempting to manually download `VCRUNTIME140.dll` from unofficial "DLL download" websites. These sites are often filled with malware, outdated files, or incorrectly modified DLLs. Installing a file from such a source can lead to more severe system instability, security risks, and further application errors. It's vital to stick to official Microsoft downloads for system-critical files. Another mistake is not understanding the difference between 32-bit (x86) and 64-bit (x64) versions of the Visual C++ Redistributable. Installing the wrong architecture, or failing to install both if necessary, can leave the required DLL missing. Finally, forgetting to restart the computer after installation is a missed step that can prevent the fix from taking effect.

## Prevention Tips

To prevent the `VCRUNTIME140.dll not found` error from recurring, adopt good system maintenance practices. Keep your Windows operating system and all installed applications updated. Regular Windows Updates often include crucial fixes and patches for system components like the Visual C++ Redistributables. When installing new software, pay attention to the installation process. If a program offers to install prerequisites like Visual C++ Redistributables, allow it to do so. Avoid uninstalling or modifying system components unless you are certain of their function and impact. Finally, maintain robust antivirus and anti-malware protection. Regular scans can detect and remove threats that might compromise system files.