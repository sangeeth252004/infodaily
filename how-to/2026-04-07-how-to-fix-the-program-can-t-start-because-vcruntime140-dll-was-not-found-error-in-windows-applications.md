---
title: "How to Fix \"The program can't start because VCRUNTIME140.dll was not found\" Error in Windows Applications"
date: "2026-04-07T10:54:13.719Z"
slug: "how-to-fix-the-program-can-t-start-because-vcruntime140-dll-was-not-found-error-in-windows-applications"
type: "how-to"
description: "Resolve the \"VCRUNTIME140.dll not found\" error in Windows applications by understanding its cause and following a step-by-step guide to reinstall Visual C++ Redistributables and verify system integrity."
keywords: "VCRUNTIME140.dll, DLL error, Windows fix, C++ Redistributable, runtime error, application error, missing DLL, program launch error"
---

### Problem Explanation

Users frequently encounter a critical error message when attempting to launch specific applications on their Windows operating system: "The program can't start because VCRUNTIME140.dll was not found. Try reinstalling the program to fix this problem." This message typically appears in a dialog box, preventing the target application from starting or causing it to crash immediately after launch. The application could be anything from a productivity suite, a game, a development tool, to a utility. The error is an immediate blocker, rendering the affected software unusable until the underlying issue is resolved.

The presence of this error indicates that a crucial component required by the application is missing or corrupted on the system. While the error message suggests reinstalling the program, this often addresses the symptom rather than the root cause, leading to recurring issues with other applications that might depend on the same component. Understanding what VCRUNTIME140.dll is and its role is key to a robust solution.

### Why It Happens

VCRUNTIME140.dll is a Dynamic Link Library (DLL) file that is an integral part of the Microsoft Visual C++ Redistributable Package for Visual Studio 2015, 2017, 2019, and 2022. This package contains runtime components of Visual C++ libraries that are required to run applications developed with Visual Studio, specifically those compiled using the Visual C++ compiler. Many third-party applications rely on these shared libraries to function correctly.

The "VCRUNTIME140.dll not found" error primarily occurs for a few reasons:
1.  **Missing Redistributable Package**: The most common cause is that the necessary Microsoft Visual C++ Redistributable package was never installed on your system, or it was uninstalled. This can happen if an application that previously installed it was removed, or if a clean OS installation never included it.
2.  **Corrupt Redistributable Installation**: The existing Visual C++ Redistributable installation on your system may have become corrupted due to various factors like disk errors, malware, or incomplete updates.
3.  **Incorrect Architecture**: An application might require the 32-bit (x86) version of the DLL, but only the 64-bit (x64) version is present (or vice-versa), even on a 64-bit Windows system where 32-bit applications can run.
4.  **Application-Specific Issue**: Less commonly, the DLL might be specifically bundled with the problematic application, and a faulty installation of that application could lead to its absence or corruption.

### Step-by-Step Solution

Follow these steps in the order provided to systematically troubleshoot and resolve the "VCRUNTIME140.dll not found" error.

#### ## Step 1: Restart Your Computer

Before attempting more complex fixes, a simple system restart can sometimes resolve temporary glitches. System restarts can clear transient memory issues, refresh system paths, and ensure all processes are correctly initialized.

1.  Save any open work and close all applications.
2.  Click the **Start** button, then select **Power** > **Restart**.
3.  After the system restarts, attempt to launch the problematic application again.

#### ## Step 2: Reinstall the Problematic Application

If the error persists after a restart, the issue might be specific to the application attempting to load the DLL. Reinstalling the application can sometimes replace missing or corrupted files that are bundled with it.

1.  Open **Settings** > **Apps** > **Apps & features**.
2.  Locate the problematic application in the list, click on it, and select **Uninstall**. Follow any on-screen prompts to complete the uninstallation.
3.  Restart your computer (refer to Step 1).
4.  Download the latest version of the application from its official website.
5.  Run the installer and follow the instructions to reinstall the application.
6.  Attempt to launch the application.

#### ## Step 3: Download and Install Microsoft Visual C++ Redistributable Packages

This is the most frequent and effective solution. VCRUNTIME140.dll is part of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. It's crucial to install the correct versions. On a 64-bit Windows system, it is recommended to install *both* the x86 (32-bit) and x64 (64-bit) versions, as many 32-bit applications require the x86 redistributable even on a 64-bit OS.

1.  Open your web browser and navigate to the official Microsoft website (search for "Microsoft Visual C++ Redistributable latest supported downloads").
2.  Locate the section for "Visual Studio 2015, 2017, 2019, and 2022".
3.  Download the following files:
    *   **`vc_redist.x86.exe`** (for 32-bit systems or 32-bit applications on 64-bit systems)
    *   **`vc_redist.x64.exe`** (for 64-bit systems)
    *   *Note*: If you have a 64-bit operating system, you MUST install both the x86 and x64 versions. If you have a 32-bit operating system, only install the x86 version.
    *   To check your system type: Right-click **Start**, select **System**, and look under "System type."
4.  Run `vc_redist.x86.exe` first. If it's already installed, you might be offered "Repair" or "Uninstall." Choose **Repair** if available, otherwise, proceed to reinstall.
5.  Run `vc_redist.x64.exe` (if applicable for your system). Again, choose **Repair** or reinstall.
6.  Restart your computer after installing/repairing both packages.
7.  Attempt to launch the problematic application.

#### ## Step 4: Repair Existing Microsoft Visual C++ Redistributable Installations

If you suspect the redistributable packages are already installed but might be corrupted, repairing them can resolve the issue without needing to reinstall from scratch.

1.  Open **Settings** > **Apps** > **Apps & features**.
2.  Scroll through the list of installed programs and locate all entries for "Microsoft Visual C++ Redistributable" from "2015-2022" (there might be multiple for x86 and x64, and potentially older versions).
3.  For each "Microsoft Visual C++ Redistributable (x64) - 14.X.XXXXX" and "Microsoft Visual C++ Redistributable (x86) - 14.X.XXXXX" (where 14.X.XXXXX indicates the version number), click on the entry.
4.  Select **Modify** (or **Change**), then choose the **Repair** option in the dialog box that appears.
5.  Repeat this for all relevant 2015-2022 redistributable packages (both x86 and x64).
6.  Restart your computer.
7.  Attempt to launch the application.

#### ## Step 5: Run System File Checker (SFC) and DISM

Corrupted Windows system files can sometimes affect the integrity of DLL files or how applications access them. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can scan and repair these system files.

1.  Open the **Command Prompt** as an administrator:
    *   Type `cmd` in the Windows search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
2.  First, run DISM to prepare for SFC by checking and repairing the Windows image:
    *   Type `DISM /Online /Cleanup-Image /RestoreHealth` and press Enter.
    *   This process may take some time to complete. Allow it to finish (it might appear stuck at 20% for a while).
3.  Once DISM is complete, run SFC to scan for and repair corrupted system files:
    *   Type `sfc /scannow` and press Enter.
    *   This scan will also take some time. Do not close the command prompt until it indicates completion and shows results like "Windows Resource Protection did not find any integrity violations" or "Windows Resource Protection found corrupt files and successfully repaired them."
4.  Restart your computer after both commands have finished.
5.  Attempt to launch the problematic application.

#### ## Step 6: Check for Windows Updates

Ensure your Windows operating system is fully up to date. Windows updates can sometimes include newer versions of system libraries and runtime components, which might resolve compatibility or missing file issues.

1.  Go to **Settings** > **Update & Security** > **Windows Update**.
2.  Click **Check for updates**.
3.  If updates are available, download and install them.
4.  Restart your computer if prompted to complete the update process.
5.  After the restart, attempt to launch the problematic application.

### Common Mistakes

*   **Downloading DLLs from Untrusted Websites**: Never download VCRUNTIME140.dll from "DLL download" websites. These sites often provide outdated, corrupted, or even malicious versions of DLLs, which can introduce security risks or cause further system instability. Always obtain system components like redistributables directly from Microsoft.
*   **Installing Only One Architecture (x86 or x64)**: On a 64-bit Windows system, users often only install the x64 version of the Visual C++ Redistributable. However, many applications are still 32-bit and require the x86 version to run, even on a 64-bit OS. Always install both x86 and x64 packages on a 64-bit system.
*   **Not Restarting After Installation/Repair**: Crucial system changes like installing runtime libraries or repairing system files often require a full system restart to properly register the new files and update system paths. Skipping this step can lead to the error persisting even after the fix has been applied.
*   **Ignoring Older Visual C++ Redistributables**: While VCRUNTIME140.dll specifically relates to the 2015-2022 package, some applications may have dependencies on older Visual C++ runtimes. While not directly related to *this specific error*, ensuring all necessary redistributables are present and healthy is a good practice for system stability.

### Prevention Tips

*   **Keep Your Windows OS Updated**: Regularly installing Windows updates ensures your system has the latest security patches and runtime components, reducing the likelihood of encountering missing or outdated DLL issues.
*   **Download Software from Official Sources**: Always acquire applications and their updates directly from the official developer's website or reputable digital storefronts. Unofficial sources may provide tampered or incomplete installations that lack necessary dependencies.
*   **Install All Required Visual C++ Redistributables**: When setting up a new Windows installation, or after a major system recovery, proactively download and install the latest Microsoft Visual C++ Redistributable packages (both x86 and x64) from Microsoft's official site. This provides a solid foundation for most applications.
*   **Perform Regular System Maintenance**: Utilize built-in Windows tools like Disk Cleanup and regularly run SFC/DISM commands (as shown in Step 5) to maintain system file integrity and clear out potential sources of corruption.
*   **Use Reliable Antivirus Software**: Keep your antivirus software updated and perform regular scans to protect against malware, which can corrupt system files including DLLs.