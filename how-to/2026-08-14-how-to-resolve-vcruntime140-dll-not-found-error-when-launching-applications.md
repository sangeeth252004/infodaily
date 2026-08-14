---
title: "How to Resolve 'VCRUNTIME140.dll Not Found' Error When Launching Applications"
date: "2026-08-14T15:49:43.920Z"
slug: "how-to-resolve-vcruntime140-dll-not-found-error-when-launching-applications"
type: "how-to"
description: "Troubleshoot and fix the 'VCRUNTIME140.dll Not Found' error when launching applications. Learn why it happens and follow step-by-step solutions including reinstalling Visual C++ Redistributable, running SFC, and preventing future occurrences."
keywords: "VCRUNTIME140.dll, DLL missing error, Visual C++ Redistributable, fix application launch error, runtime error, Windows troubleshooting, missing DLL file, VCRUNTIME140.dll fix"
---

## Problem Explanation

When attempting to launch certain applications on a Windows operating system, users may encounter a persistent error message preventing the software from starting. The most common manifestation of this issue is a dialog box displaying the message: "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem." This error is particularly prevalent with games, professional creative software, or older applications that rely on specific runtime components.

This error effectively blocks the application from initializing. Clicking "OK" on the error dialog typically closes it, but the application will not launch. Users might experience this with newly installed software, after a system update, or seemingly at random. The presence of this message indicates that a critical system file, required by the application, cannot be located or is corrupted.

## Why It Happens

The `VCRUNTIME140.dll` file is a dynamic link library that forms a core part of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. Many applications, especially those developed using Microsoft Visual C++, depend on these runtime components to function correctly. This DLL handles specific C++ runtime functions and is essential for linking the application's executable code to the operating system's features.

The "Not Found" error typically occurs for several key reasons:

*   **Missing or Corrupted Redistributable Package:** The most common cause is that the necessary Microsoft Visual C++ Redistributable package was either not installed correctly, became corrupted, or was inadvertently deleted from your system. Applications often bundle this package with their installers, but sometimes the installation fails or is skipped.
*   **Incorrect Version:** An application might require a specific 32-bit (x86) or 64-bit (x64) version of the redistributable, and only the incorrect version is installed on your system, or both are needed but only one is present.
*   **System File Corruption:** While less common, underlying corruption within Windows system files can sometimes affect the integrity or accessibility of legitimate DLLs.
*   **Malware Infection:** Malicious software can sometimes delete or corrupt system files, including crucial DLLs, leading to such errors.
*   **Conflicting Software:** Rarely, other installed software might interfere with or incorrectly modify shared system components.

## Step-by-Step Solution

Follow these steps in order to diagnose and resolve the "VCRUNTIME140.dll Not Found" error.

### Step 1: Restart Your Computer

Before proceeding with more complex troubleshooting, a simple system restart can often resolve temporary glitches or processes that might be preventing the DLL from being properly recognized. This is a fundamental first step for many software-related issues.

1.  Save any open work.
2.  Click the **Start** button.
3.  Select **Power** > **Restart**.
4.  Once your computer has restarted, attempt to launch the problematic application again.

### Step 2: Reinstall the Problematic Application

The error message itself often suggests reinstalling the program. Many application installers include the necessary Visual C++ Redistributable packages, and a fresh installation can correctly place all required dependencies.

1.  Open **Settings** (Windows Key + I).
2.  Navigate to **Apps** > **Apps & features**.
3.  Locate the application that is displaying the error.
4.  Click on the application entry, then select **Uninstall**. Follow any on-screen prompts to complete the uninstallation.
5.  After uninstallation, restart your computer.
6.  Reinstall the application from its original installer or a trusted source.
7.  Attempt to launch the application.

### Step 3: Download and Install Microsoft Visual C++ Redistributable Packages

This is the most critical step for resolving the `VCRUNTIME140.dll` error, as it directly addresses the missing component.

1.  Open your web browser and navigate to the official Microsoft support page for the latest supported Visual C++ Redistributable downloads. A quick search for "Microsoft Visual C++ Redistributable" will typically lead you to the correct page on `support.microsoft.com` or `learn.microsoft.com`.
2.  On the download page, locate the section for "Visual Studio 2015, 2017, 2019, and 2022."
3.  You will typically find two important files:
    *   `vc_redist.x86.exe` (for 32-bit applications)
    *   `vc_redist.x64.exe` (for 64-bit applications)
4.  **Download BOTH** `vc_redist.x86.exe` and `vc_redist.x64.exe` to ensure all application types are covered, regardless of your operating system's architecture.
5.  Once downloaded, run `vc_redist.x86.exe` first.
    *   If prompted with "Repair" or "Uninstall," choose **Repair**.
    *   If prompted with "Install," accept the license terms and click **Install**.
6.  Repeat the process for `vc_redist.x64.exe`.
    *   If prompted with "Repair" or "Uninstall," choose **Repair**.
    *   If prompted with "Install," accept the license terms and click **Install**.
7.  Restart your computer after installing both packages.
8.  Try launching the problematic application.

### Step 4: Repair Existing Microsoft Visual C++ Redistributable Installations

If the redistributable packages are already installed but potentially corrupted, repairing them can restore the necessary DLLs without a full reinstallation.

1.  Open **Settings** (Windows Key + I).
2.  Navigate to **Apps** > **Apps & features**.
3.  Scroll through the list and locate all entries named "Microsoft Visual C++ Redistributable" that mention "2015-2022" (or "2015, 2017, 2019, 2022").
4.  For each relevant entry (both x86 and x64 versions if present), click on it and select **Modify** or **Change**.
5.  In the dialog box that appears, select the **Repair** option.
6.  Follow any on-screen prompts to complete the repair process for each package.
7.  After repairing all relevant packages, restart your computer.
8.  Attempt to launch the application.

### Step 5: Run System File Checker (SFC) and DISM

Corrupt Windows system files can sometimes lead to issues with DLLs. Running the System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can scan for and repair corrupted system files.

1.  Open **Command Prompt as Administrator**:
    *   Type `cmd` in the Windows search bar.
    *   Right-click on "Command Prompt" and select **Run as administrator**.
2.  First, run the DISM tool to prepare your system for the SFC scan:
    *   Type `DISM /Online /Cleanup-Image /RestoreHealth` and press Enter.
    *   This process can take several minutes to complete. Do not close the window until it indicates completion.
3.  Once DISM is finished, run the System File Checker:
    *   Type `sfc /scannow` and press Enter.
    *   This scan will check for and attempt to repair any corrupted Windows system files.
4.  After both commands have completed, restart your computer.
5.  Test the application again.

### Step 6: Check for Windows Updates

Ensure your Windows operating system is fully up-to-date. Important updates often include bug fixes, security patches, and sometimes updated runtime components that can resolve underlying compatibility or corruption issues.

1.  Open **Settings** (Windows Key + I).
2.  Navigate to **Windows Update**.
3.  Click **Check for updates**.
4.  Install any available updates and restart your computer if prompted.
5.  After the updates are installed and your system has restarted, try launching the application.

### Step 7: Perform a Full Malware Scan

Malware can sometimes corrupt or delete critical system files, including DLLs, to hide its presence or disrupt system functionality. A thorough scan can identify and remove such threats.

1.  Ensure your antivirus software is up-to-date with the latest definitions.
2.  Perform a **full system scan** using your preferred reputable antivirus program (e.g., Windows Defender, Malwarebytes, Avast, etc.). A quick scan might miss deeply embedded threats.
3.  Allow the scan to complete and follow any instructions to quarantine or remove detected threats.
4.  After the scan, restart your computer.
5.  Attempt to launch the application.

## Common Mistakes

When troubleshooting the `VCRUNTIME140.dll` error, users often make several common mistakes that can complicate the fix or even introduce new problems:

*   **Downloading from Unofficial DLL Websites:** A significant pitfall is downloading `VCRUNTIME140.dll` from third-party "DLL download" websites. These sites are frequently vectors for malware, offer outdated or incorrect versions of the DLL, and can introduce more severe system instability or security risks. Always obtain redistributable packages directly from Microsoft.
*   **Only Installing One Version of the Redistributable:** Many users mistakenly only install the 64-bit (x64) version because their operating system is 64-bit. However, some applications, even on a 64-bit OS, might be 32-bit (x86) and require the corresponding `vc_redist.x86.exe` package. Always install both the x86 and x64 versions of the Visual C++ Redistributable for comprehensive coverage.
*   **Manually Copying the DLL:** Attempting to manually copy `VCRUNTIME140.dll` into `System32` or an application's directory can lead to version conflicts, improper registration, or a partial fix that doesn't address the underlying dependency issues. The redistributable installer correctly registers the DLLs and handles all associated files.
*   **Ignoring Application-Specific Prerequisites:** Some applications have specific or older Visual C++ Redistributable requirements (e.g., 2013, 2010). While `VCRUNTIME140.dll` is part of the 2015-2022 package, ensure you've also installed any other redistributables explicitly mentioned by your application's documentation or installer.

## Prevention Tips

Preventing the "VCRUNTIME140.dll Not Found" error from recurring involves maintaining a healthy and updated Windows environment:

*   **Keep Windows and Applications Updated:** Regularly install Windows updates and keep your applications updated. Operating system updates often include critical security patches and system component improvements, while application updates can include newer, more stable runtime dependencies.
*   **Install Software from Trusted Sources:** Only download and install applications from their official websites or reputable digital storefronts. Unofficial sources might provide tampered installers that omit necessary components or introduce malware.
*   **Use Reliable Antivirus Software:** Maintain an active, updated antivirus solution on your system. Regular full system scans can detect and neutralize malware that might corrupt or delete system files, including essential DLLs.
*   **Avoid Forcefully Deleting System Files:** Refrain from manually deleting files or folders within system directories like `C:\Windows\System32` or `C:\Windows\SysWOW64` unless you are absolutely certain of their purpose and impact. Accidental deletion of critical DLLs is a common cause of such errors.
*   **Create System Restore Points:** Before making significant system changes (like installing new software, major updates, or registry edits), consider creating a system restore point. If an error occurs, you can revert your system to a previous, stable state without losing personal files.