---
title: "How to Fix \"VCRUNTIME140.dll Not Found\" Error When Launching Applications"
date: "2026-07-14T16:13:07.105Z"
slug: "how-to-fix-vcruntime140-dll-not-found-error-when-launching-applications"
type: "how-to"
description: "Resolve the \"VCRUNTIME140.dll Not Found\" error with a comprehensive, step-by-step guide. Understand why it happens and learn to properly reinstall the Microsoft Visual C++ Redistributable packages."
keywords: "VCRUNTIME140.dll, DLL error, Not Found, missing DLL, Visual C++ Redistributable, fix application error, Windows error, how-to guide, technical troubleshooting"
---

## Problem Explanation

Encountering the "VCRUNTIME140.dll Not Found" error can be a frustrating roadblock when you're trying to launch an application. This specific issue manifests as a pop-up dialog box, typically stating something similar to: "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem." or "VCRUNTIME140.dll was not found." This error prevents the associated application from starting, leaving you unable to use the software you intended to open. While the error message might suggest reinstalling the specific program, the root cause is often system-wide and requires a different approach.

This error can affect a wide range of applications, from video games and productivity suites to specialized software, indicating that the problem lies not with the application itself, but with a fundamental component it relies on to run. Without the `VCRUNTIME140.dll` file, the application cannot access crucial runtime libraries necessary for its execution, leading to an immediate termination of the launch process.

## Why It Happens

The `VCRUNTIME140.dll` file is a core component of the Microsoft Visual C++ Redistributable Package for Visual Studio 2015, 2017, 2019, and 2022. Dynamic Link Libraries (DLLs) like this one contain essential functions and data that multiple programs can use simultaneously. Many applications are developed using Microsoft Visual C++, and to run these applications on a computer that doesn't have the full Visual Studio development environment, the necessary runtime libraries (like `VCRUNTIME140.dll`) must be present.

The "Not Found" error typically occurs for several reasons:
*   **Missing Installation:** The most common reason is that the required Microsoft Visual C++ Redistributable Package was never installed on your system, or it was not installed correctly.
*   **Corruption:** The `VCRUNTIME140.dll` file itself or its associated redistributable package might have become corrupted due to a faulty installation, a system crash, power outage, or malware infection.
*   **Accidental Deletion:** The file might have been inadvertently deleted by user action, overzealous antivirus software, or during an uninstallation process of another program.
*   **Conflicting Software:** In rare cases, other software installations or updates might interfere with the existing Visual C++ Redistributable files, leading to conflicts or overwrites. When the operating system or an application tries to load this DLL and cannot locate it in the expected system directories, the "Not Found" error is triggered.

## Step-by-Step Solution

### Step 1: Restart Your Computer

Before delving into more complex solutions, a simple system restart can often resolve temporary glitches. Sometimes, a process might be stuck, or a minor system error could be preventing the DLL from being properly recognized. A fresh start clears the system's memory and reloads all operating system components, which can sometimes rectify the issue without further intervention.

### Step 2: Reinstall the Problematic Application (If Applicable)

If the error only occurs with one specific application, and especially if it's a recently installed one, reinstalling that particular application might resolve the issue. Application installers often include the necessary Visual C++ Redistributable packages as part of their setup process.
1.  Open **Settings** > **Apps** > **Apps & features**.
2.  Locate the problematic application, select it, and click **Uninstall**.
3.  Follow the on-screen prompts to complete the uninstallation.
4.  Restart your computer.
5.  Download a fresh installer for the application from its official source and run the installation process again. Pay attention during installation for any prompts regarding Visual C++ Redistributables.

### Step 3: Download and Install the Latest Microsoft Visual C++ Redistributable Package

This is the most common and effective solution. The `VCRUNTIME140.dll` file is part of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. You need to ensure you have the correct and most up-to-date version installed.
1.  Open your web browser and search for "Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022."
2.  Navigate to the **official Microsoft website** for the download (usually docs.microsoft.com or support.microsoft.com). *It is crucial to download these packages only from Microsoft's official site to avoid malware or corrupted files.*
3.  On the download page, you will typically find two versions for your Windows architecture:
    *   `vc_redist.x86.exe` (for 32-bit applications)
    *   `vc_redist.x64.exe` (for 64-bit applications)
    *   **Even if you have a 64-bit operating system, you MUST install both the x86 and x64 versions**, as many 64-bit systems still run 32-bit applications that require the x86 runtime.
4.  Download both `vc_redist.x86.exe` and `vc_redist.x64.exe`.
5.  Run each downloaded installer. If a package is already installed, the installer might offer options to "Repair" or "Uninstall." Choose "Repair" if available; otherwise, proceed with "Install." If prompted, accept the license terms and click "Install" or "Repair."
6.  Once both installations are complete, restart your computer.

### Step 4: Repair Microsoft Visual C++ Redistributable Packages

If you suspect existing redistributable packages are corrupted, but the previous step didn't offer a repair option, you can explicitly repair them through Windows settings.
1.  Open **Settings** > **Apps** > **Apps & features**.
2.  Scroll down or use the search bar to find all entries starting with "Microsoft Visual C++ Redistributable."
3.  For each entry you find, especially those for "2015-2022" or similar recent versions:
    *   Select the entry.
    *   Click "Modify."
    *   In the dialog box that appears, choose "Repair."
4.  Repeat this process for all relevant Visual C++ Redistributable packages.
5.  Restart your computer after completing all repairs.

### Step 5: Run a System File Checker (SFC) Scan

Corrupted Windows system files can sometimes lead to issues with core DLLs. The System File Checker (SFC) utility scans for and restores corrupted system files.
1.  Press the **Windows key + R** to open the Run dialog.
2.  Type `cmd` and press **Ctrl + Shift + Enter** to open Command Prompt as an administrator.
3.  In the elevated Command Prompt window, type the following command and press Enter:
    ```cmd
    sfc /scannow
    ```
4.  Allow the scan to complete. This process can take some time.
5.  If SFC finds corrupted files, it will attempt to repair them. You might see messages like "Windows Resource Protection found corrupt files and successfully repaired them" or "Windows Resource Protection did not find any integrity violations."
6.  Once the scan is finished, restart your computer.

### Step 6: Check for Windows Updates

Keeping your operating system up-to-date ensures that you have the latest security patches, bug fixes, and system components. Sometimes, a Windows update might include necessary runtime components or address underlying system issues contributing to the DLL error.
1.  Open **Settings** > **Update & Security** (or **Windows Update** on Windows 11).
2.  Click "Check for updates."
3.  If updates are available, download and install them.
4.  Restart your computer as prompted after updates are installed.

### Step 7: Perform a Clean Boot (Advanced Troubleshooting)

If the error persists after trying the above steps, it's possible that a third-party application or service is conflicting with the Visual C++ Redistributable. A clean boot starts Windows with a minimal set of drivers and startup programs, helping to identify software conflicts.
1.  Press the **Windows key + R**, type `msconfig`, and press Enter to open System Configuration.
2.  Go to the **Services** tab.
3.  Check the box for "Hide all Microsoft services."
4.  Click "Disable all."
5.  Go to the **Startup** tab.
6.  Click "Open Task Manager."
7.  In Task Manager, disable each startup item one by one (right-click and select "Disable").
8.  Close Task Manager.
9.  Back in System Configuration, click "Apply" and then "OK."
10. Restart your computer.
11. If the error is resolved in the clean boot environment, you can then enable services and startup items one by one to pinpoint the conflicting software. Remember to reverse these changes once troubleshooting is complete.

## Common Mistakes

When trying to fix the "VCRUNTIME140.dll Not Found" error, users often fall into a few common traps:
*   **Downloading DLL files from unofficial websites:** This is arguably the most dangerous mistake. Many websites claim to offer individual DLL files for download. These files are often outdated, corrupted, or, worse, bundled with malware and viruses. Always obtain system files and redistributable packages directly from the official Microsoft website.
*   **Only installing one architecture (x64 vs. x86):** A common misconception is that if you have a 64-bit operating system, you only need the x64 version of the redistributable. However, many 64-bit systems still run 32-bit applications that require the x86 (32-bit) version of the runtime libraries. Failing to install both can leave the error unresolved for specific applications.
*   **Skipping basic troubleshooting:** Jumping straight to complex solutions without trying a simple restart or application reinstallation can lead to unnecessary effort and frustration.
*   **Ignoring existing installations:** If the Visual C++ Redistributable is already installed, merely reinstalling without first attempting a repair or uninstalling the old version can sometimes compound the issue rather than fix it. Always use the "Repair" option if prompted.

## Prevention Tips

Preventing the "VCRUNTIME140.dll Not Found" error, and similar DLL issues, largely involves maintaining a healthy and up-to-date operating system:
*   **Keep Windows Up-to-Date:** Regularly checking for and installing Windows updates ensures that your system has the latest security patches, performance improvements, and essential system components, including updated runtime libraries.
*   **Install Software from Trusted Sources:** Always download applications, drivers, and system components from official developer websites or reputable app stores. Avoid third-party download sites that may bundle unwanted software or modified files.
*   **Use Reputable Antivirus Software:** A good antivirus program can prevent malware from corrupting or deleting critical system files like DLLs. Regularly scan your system for threats.
*   **Avoid Manual DLL File Manipulation:** Unless you are an expert and understand the implications, never manually delete, move, or modify DLL files in your system directories. These files are crucial for many applications and the operating system itself.
*   **Create System Restore Points:** Before installing major software or making significant system changes, consider creating a system restore point. This allows you to revert your system to a previous working state if something goes wrong, including issues related to missing DLLs.