---
title: "How to Fix \"VCRUNTIME140.dll not found\" Error When Launching Applications on Windows"
date: "2026-02-14T10:26:27.819Z"
slug: "how-to-fix-vcruntime140-dll-not-found-error-when-launching-applications-on-windows"
type: "how-to"
description: "Resolve the \"VCRUNTIME140.dll not found\" error on Windows. Learn step-by-step solutions including reinstalling Visual C++ Redistributable, repairing system files, and checking for malware to get your applications running again."
keywords: "VCRUNTIME140.dll, not found, missing DLL, error fix, Windows, Visual C++ Redistributable, applications crash, software launch error, system files, repair, Microsoft Visual C++, runtime error"
---

### Problem Explanation

Users encountering the "VCRUNTIME140.dll not found" error typically experience an application failing to launch or crashing immediately upon startup. This critical error manifests as a pop-up window, often stating: "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem." While the suggestion to reinstall the program is present, it frequently does not resolve the underlying issue. This problem can affect a wide range of applications, from video games and productivity suites to specialized software, making them unusable.

The core issue is that the operating system or the application cannot locate a crucial dynamic-link library (DLL) file required for its execution. Without VCRUNTIME140.dll, the application lacks a fundamental component needed to interact with the system's C++ runtime environment, leading to an immediate halt in its operation.

### Why It Happens

The VCRUNTIME140.dll file is a component of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. This redistributable package contains essential runtime libraries that many applications, particularly those developed using Microsoft Visual Studio, require to run correctly on a Windows system. When an application is launched, it attempts to load these libraries, and if VCRUNTIME140.dll is missing, corrupted, or incompatible, the application fails.

Several factors can lead to this error:

*   **Missing or Corrupted Visual C++ Redistributable:** The most common cause is that the necessary Visual C++ Redistributable package was either never installed, became corrupted, or was inadvertently deleted during another software's uninstallation.
*   **Incomplete Software Installation:** The application that requires VCRUNTIME140.dll might have been installed incorrectly, failing to include or properly link the necessary runtime libraries.
*   **Malware or Antivirus Interference:** Malicious software can sometimes delete or corrupt critical system files, including DLLs. Conversely, an overly aggressive antivirus program might mistakenly quarantine or delete the file.
*   **System File Corruption:** Broader Windows system file corruption can also affect the integrity of DLL files, leading to them being unreadable or reported as missing.
*   **Windows Update Issues:** In rare cases, a Windows update might cause conflicts or improperly manage these shared libraries.

### Step-by-Step Solution

Addressing the "VCRUNTIME140.dll not found" error typically involves ensuring the correct Microsoft Visual C++ Redistributable packages are properly installed and system integrity is maintained.

#### ## Step 1: Restart Your Computer

Before attempting more complex fixes, a simple system restart can often resolve temporary glitches. This clears the system's memory, reloads all services, and can sometimes rectify transient issues where the DLL might not have been correctly loaded or recognized.

1.  Save any open work and close all applications.
2.  Click the **Start** button.
3.  Click the **Power** icon.
4.  Select **Restart**.
5.  After the restart, attempt to launch the problematic application again.

#### ## Step 2: Reinstall the Microsoft Visual C++ Redistributable Packages

This is the most effective and common solution, as VCRUNTIME140.dll is part of these packages. It's crucial to install the correct versions (x86 and x64 for 64-bit systems).

1.  **Uninstall existing packages:**
    *   Press `Windows Key + R`, type `appwiz.cpl`, and press `Enter` to open "Programs and Features".
    *   Locate all "Microsoft Visual C++ Redistributable" entries for **2015-2022**.
    *   For each entry (e.g., "Microsoft Visual C++ 2015-2022 Redistributable (x64)"), select it and click **Uninstall**.
    *   Follow any on-screen prompts to complete the uninstallation.
    *   *Note:* It's often sufficient to just install the new ones over existing, but uninstalling first ensures a clean slate.

2.  **Download new packages:**
    *   Open a web browser and navigate to the official Microsoft Visual C++ Redistributable downloads page. (A quick search for "Microsoft Visual C++ Redistributable Visual Studio 2015 2022" will lead you to the correct Microsoft support page).
    *   Download both the **x86** and **x64** versions of the "Visual Studio 2015, 2017, 2019, and 2022" redistributable. The filenames are typically `vc_redist.x86.exe` and `vc_redist.x64.exe`.
    *   *Important:* Even if you have a 64-bit Windows operating system, many applications are 32-bit and require the x86 redistributable. Install both.

3.  **Install the packages:**
    *   Locate the downloaded `vc_redist.x86.exe` and `vc_redist.x64.exe` files.
    *   Right-click on each file and select **Run as administrator**.
    *   Accept the license terms and click **Install**. If prompted, choose **Repair** if an existing installation is detected.
    *   Restart your computer after installing both packages.
    *   Test the problematic application.

#### ## Step 3: Run a System File Checker (SFC) Scan

The System File Checker tool scans for and repairs corrupted Windows system files, which might include VCRUNTIME140.dll if it's a critical system dependency.

1.  Press `Windows Key + S`, type `cmd`.
2.  Right-click on **Command Prompt** and select **Run as administrator**.
3.  In the Command Prompt window, type `sfc /scannow` and press `Enter`.
4.  Allow the scan to complete. This can take some time.
5.  After the scan, you will see one of the following messages:
    *   "Windows Resource Protection did not find any integrity violations." (No issues found)
    *   "Windows Resource Protection found corrupt files and successfully repaired them." (Issues resolved)
    *   "Windows Resource Protection found corrupt files but was unable to fix some of them." (Some issues remain)
6.  Restart your computer and check if the application now launches.

#### ## Step 4: Use DISM (Deployment Image Servicing and Management) Tool

If the SFC scan indicates it couldn't fix some corrupted files, or if the issue persists, the DISM tool can be used to repair the Windows system image, from which SFC draws its files.

1.  Press `Windows Key + S`, type `cmd`.
2.  Right-click on **Command Prompt** and select **Run as administrator**.
3.  Execute the following commands one by one, pressing `Enter` after each:
    *   `DISM /Online /Cleanup-Image /CheckHealth` (Checks for corruption)
    *   `DISM /Online /Cleanup-Image /ScanHealth` (Performs a more advanced scan)
    *   `DISM /Online /Cleanup-Image /RestoreHealth` (Repairs the image using Windows Update)
4.  Each command can take several minutes to complete. Do not close the window until the process finishes.
5.  Once DISM completes, run the `sfc /scannow` command again (as in Step 3) to ensure all system files are now correctly repaired.
6.  Restart your computer and test the application.

#### ## Step 5: Perform a Clean Reinstallation of the Problematic Application

If the error persists and is specific to one application, the application's installation itself might be faulty or outdated.

1.  **Uninstall the application:**
    *   Press `Windows Key + R`, type `appwiz.cpl`, and press `Enter`.
    *   Locate the problematic application, select it, and click **Uninstall**.
    *   Follow all uninstallation prompts and restart your computer if requested.
2.  **Clean up residual files (Optional but Recommended):**
    *   After uninstalling, manually check common installation directories (e.g., `C:\Program Files`, `C:\Program Files (x86)`, `C:\Users\%username%\AppData\Local`, `C:\Users\%username%\AppData\Roaming`) for any remaining folders related to the application and delete them.
    *   *Caution:* Be careful when deleting files. Ensure you are only deleting folders related to the application you uninstalled.
3.  **Reinstall the application:**
    *   Download the latest installer for the application from its official website.
    *   Run the installer as an administrator (right-click the installer executable and select **Run as administrator**).
    *   Follow the installation instructions carefully.
4.  Attempt to launch the application.

#### ## Step 6: Check for Malware

Malware can corrupt or delete system files, including DLLs, leading to errors. Running a thorough scan can identify and remove such threats.

1.  Open **Windows Security** (formerly Windows Defender) by searching for "Windows Security" in the Start menu.
2.  Navigate to **Virus & threat protection**.
3.  Click on **Scan options**.
4.  Select **Full scan** and then click **Scan now**.
5.  Allow the scan to complete and follow any instructions to remove detected threats. Consider using a reputable third-party anti-malware tool for a second opinion if the issue persists.
6.  Restart your computer after the scan and remediation.

#### ## Step 7: Update Windows

Ensuring your Windows operating system is up-to-date can resolve underlying compatibility issues and often includes updates for system components and runtime libraries.

1.  Press `Windows Key + I` to open **Settings**.
2.  Go to **Windows Update**.
3.  Click **Check for updates**.
4.  Download and install any available updates.
5.  Restart your computer when prompted to finalize the updates.

### Common Mistakes

When troubleshooting the "VCRUNTIME140.dll not found" error, several common pitfalls can hinder resolution or even introduce new problems:

*   **Downloading DLLs from Unofficial Websites:** A prevalent mistake is searching for "VCRUNTIME140.dll download" and obtaining the file from untrusted third-party DLL download sites. These files are often outdated, corrupted, infected with malware, or simply incompatible, and manually placing them into system folders can exacerbate issues or compromise system security.
*   **Only Installing the x64 Redistributable:** Many users with a 64-bit Windows system mistakenly believe they only need the x64 version of the Visual C++ Redistributable. However, many applications, even on 64-bit systems, are 32-bit and require the x86 (32-bit) redistributable package to function correctly. Always install both.
*   **Not Restarting the System:** After installing, uninstalling, or repairing components, failing to restart the computer means changes may not be fully applied, leading to continued errors.
*   **Ignoring the Root Cause:** Simply reinstalling the problematic application without addressing the underlying missing or corrupted Visual C++ Redistributable packages often results in the error reappearing or affecting other applications.
*   **Skipping Administrator Privileges:** Not running installers or command prompt commands (like `sfc /scannow`) with administrator privileges can prevent the necessary system changes from being made, rendering the troubleshooting steps ineffective.

### Prevention Tips

Preventing the "VCRUNTIME140.dll not found" error, and similar DLL-related issues, involves maintaining a healthy and secure Windows environment:

*   **Keep Windows Up-to-Date:** Regularly update your Windows operating system. Microsoft often includes critical security patches, bug fixes, and updated system components, including runtime libraries, in its updates.
*   **Obtain Software from Official Sources:** Always download applications, games, and drivers directly from the official developer's website or reputable digital storefronts. This minimizes the risk of installing incomplete, modified, or malicious software that might mishandle system dependencies.
*   **Maintain Robust Antivirus Protection:** Use a reliable and up-to-date antivirus or anti-malware solution (like Windows Security) and perform regular full system scans. This helps detect and remove threats that could corrupt or delete essential system files.
*   **Exercise Caution During Uninstallation:** When uninstalling software, pay attention to any warnings about shared components or libraries. If in doubt, allow the uninstaller to keep shared files, especially if other applications rely on them.
*   **Avoid Manual DLL Manipulation:** Never manually download individual DLL files from unofficial sources or attempt to place them into system directories (like `System32` or `SysWOW64`). Always use official installers for redistributable packages to ensure correct installation and registration.
*   **Create System Restore Points:** Before installing major software updates or making significant system changes, create a system restore point. This provides a safety net, allowing you to revert your system to a previous working state if an installation causes unforeseen issues.