---
title: "How to Fix 'VCRUNTIME140.dll is missing' Error During Software Installation on Windows"
date: "2026-07-05T07:56:11.880Z"
slug: "how-to-fix-vcruntime140-dll-is-missing-error-during-software-installation-on-windows"
type: "how-to"
description: "Resolve the 'VCRUNTIME140.dll is missing' error on Windows by correctly installing the Microsoft Visual C++ Redistributable for Visual Studio 2015-2022."
keywords: "VCRUNTIME140.dll missing, fix VCRUNTIME140.dll, Visual C++ Redistributable, software installation error, Windows DLL error, Microsoft Visual Studio 2015-2022, program can't start, DLL fix, Windows troubleshooting"
---

## Problem Explanation

Encountering the error message "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem." is a common roadblock for Windows users attempting to install or launch new software. This specific error typically manifests as a pop-up dialog box, preventing the software installation from completing or the application from launching successfully after installation. The dialog box might appear immediately after clicking the installer executable, or upon the first attempt to run the newly installed application. Despite the suggestion to reinstall the program, this action often fails to resolve the underlying issue, leading to repeated frustrating attempts.

This error signals that a critical system file, `VCRUNTIME140.dll`, required by the software you're trying to use, cannot be located by Windows. Without this dynamic link library (DLL) file, the operating system cannot execute certain functions necessary for the program to operate. The absence of this file essentially leaves a crucial piece of the software's foundation missing, rendering it inoperable until the file is restored or properly installed on your system.

## Why It Happens

The `VCRUNTIME140.dll` file is a core component of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. Many applications developed using Microsoft Visual C++ require these runtime components to function correctly. When you see the "VCRUNTIME140.dll is missing" error, it generally means one of a few things:

1.  **Missing Redistributable Package:** The most common cause is that the required Microsoft Visual C++ Redistributable package was either not installed on your system, or it was not installed correctly by the software's installer. While many software installers *attempt* to bundle and install these prerequisites, sometimes this process fails, or the installer expects it to already be present.
2.  **Corrupted Installation:** An existing Visual C++ Redistributable installation on your computer might be corrupted due to system errors, improper shutdowns, or conflicts with other software. Even if the package is present, a damaged `VCRUNTIME140.dll` file will still result in the error.
3.  **Accidental Deletion or Removal:** Another program or a user might have inadvertently deleted or moved the `VCRUNTIME140.dll` file, or uninstalled the associated Visual C++ Redistributable package, perhaps during a system cleanup or software removal process.
4.  **Bit-Version Mismatch:** Sometimes, the wrong bit-version (32-bit vs. 64-bit) of the redistributable is installed. A 64-bit application may require the 64-bit redistributable, even if a 32-bit version is present, and vice versa. It's often necessary to have both `x86` (32-bit) and `x64` (64-bit) versions installed on a 64-bit Windows system to support all applications.

## Step-by-Step Solution

The most reliable way to fix the `VCRUNTIME140.dll` missing error is to manually install or repair the correct Microsoft Visual C++ Redistributable package.

### ## Step 1: Restart Your Computer

Before proceeding with more complex solutions, perform a simple system restart. Sometimes, temporary glitches or processes that prevented a proper installation can be cleared by a fresh boot. This can occasionally resolve issues where a previous installation attempt partially failed.

### ## Step 2: Reinstall the Problematic Software

Although the error message suggests this, it's worth trying once more after a restart.
1.  **Uninstall:** Go to "Settings" > "Apps" > "Apps & features". Find the software that's giving you the error, click on it, and select "Uninstall".
2.  **Reboot:** Restart your computer after uninstalling.
3.  **Reinstall:** Attempt to install the software again, preferably by right-clicking the installer and selecting "Run as administrator". Observe if the error persists.

### ## Step 3: Install or Repair Microsoft Visual C++ Redistributable for Visual Studio 2015-2022

This is the most critical step. You need to download and install the official Microsoft Visual C++ Redistributable package.
1.  **Download from Microsoft:** Open your web browser and go to the official Microsoft support page for the latest supported Visual C++ Redistributable downloads. Search for "latest supported Visual C++ Redistributable downloads" or navigate to the Microsoft Learn site.
2.  **Identify Correct Version:** Look for the "Visual Studio 2015, 2017, 2019, and 2022" section. It's crucial to download *both* the `x86` (32-bit) and `x64` (64-bit) versions, even if you have a 64-bit Windows operating system. Many 64-bit systems still run 32-bit applications that require the `x86` redistributable.
    *   For 64-bit Windows: Download `vc_redist.x86.exe` and `vc_redist.x64.exe`.
    *   For 32-bit Windows: Download only `vc_redist.x86.exe`. (A `vc_redist.arm64.exe` also exists but is for ARM-based systems, not typical desktop installations).
3.  **Install/Repair:**
    *   Run `vc_redist.x86.exe` first. If it's already installed, you will be prompted with "Repair" or "Uninstall". Choose "Repair". If it's not installed, you'll see "Install". Accept the license terms and click "Install".
    *   Repeat the process for `vc_redist.x64.exe` (if applicable). Again, choose "Repair" if available, otherwise "Install".
4.  **Reboot:** Restart your computer after both installations/repairs are complete.
5.  **Test:** Try launching or installing the problematic software again.

### ## Step 4: Run System File Checker (SFC) and DISM

If installing the redistributable doesn't work, there might be deeper system file corruption.
1.  **Open Command Prompt as Administrator:** Search for "cmd" in the Windows search bar, right-click "Command Prompt," and select "Run as administrator."
2.  **Run SFC:** Type `sfc /scannun` and press Enter. This tool will scan for and repair corrupted Windows system files. Let it complete 100%.
3.  **Run DISM (if SFC finds issues):** If SFC reports that it found corrupted files but couldn't fix them, or if you want to ensure the system image is healthy, run the Deployment Image Servicing and Management (DISM) tool.
    *   Type `DISM /Online /Cleanup-Image /RestoreHealth` and press Enter. This command uses Windows Update to provide any files that are needed to repair corruptions.
4.  **Reboot:** Restart your computer after these scans are complete.

### ## Step 5: Check for Windows Updates

Ensure your Windows operating system is fully up to date. Sometimes, critical updates or service packs include newer versions of essential runtime components or resolve underlying compatibility issues that affect DLL files.
1.  Go to "Settings" > "Update & Security" > "Windows Update."
2.  Click "Check for updates" and install any pending updates.
3.  Restart your computer if prompted.

### ## Step 6: Perform a Clean Installation of the Problematic Software (Last Resort for Software)

If all else fails, and you're still facing the issue with a specific piece of software, consider a more thorough clean installation.
1.  **Uninstall Thoroughly:** Use a third-party uninstaller tool (if comfortable) or manually check common installation directories (`C:\Program Files`, `C:\Program Files (x86)`, `C:\Users\[YourUsername]\AppData\Local`, `C:\Users\[YourUsername]\AppData\Roaming`) to delete any leftover folders related to the software after uninstalling it via "Apps & features".
2.  **Clean Registry (Optional, Advanced):** If you're an advanced user, you might consider carefully removing relevant entries from the Windows Registry (use `regedit.exe`). **Backup your registry before making any changes.** This step is generally not recommended for average users due to the risk of system instability.
3.  **Reboot:** Restart your computer.
4.  **Reinstall:** Download a fresh copy of the software installer and run it as an administrator.

## Common Mistakes

*   **Downloading from Unofficial Sources:** Never download DLL files individually from random websites. These files can be outdated, corrupted, or even contain malware. Always obtain necessary runtime components from official Microsoft sources.
*   **Installing Only One Architecture:** On a 64-bit Windows system, only installing the `x64` version of the Visual C++ Redistributable is a common mistake. Many applications are still 32-bit and require the `x86` version. Always install both `x86` and `x64` packages for the specified Visual Studio version.
*   **Ignoring Existing Installations:** If you encounter a prompt to "Repair" an existing Visual C++ Redistributable, always choose "Repair" rather than uninstalling or just cancelling. A corrupted existing installation won't be fixed by simply installing a new one alongside it without repair.
*   **Not Restarting:** After installing or repairing redistributable packages, a system restart is often necessary for the changes to take full effect and for Windows to correctly register the newly available DLL files.
*   **Only Reinstalling the Problematic Program:** The error message suggests reinstalling the program, but this rarely works because the problem lies with a *system-level* dependency (the DLL) rather than the program's files themselves.

## Prevention Tips

*   **Keep Windows Updated:** Regularly check for and install Windows updates. Microsoft often bundles essential runtime libraries and system stability fixes with these updates, which can prevent DLL-related issues.
*   **Download Software from Reputable Sources:** Always obtain software installers from the official developer's website or trusted app stores. This reduces the risk of downloading incomplete or tampered installers that might omit necessary redistributable packages.
*   **Allow Installers to Run Fully:** Do not interrupt software installations. Many programs include the necessary Visual C++ Redistributable installers as part of their setup process. Interrupting this can prevent the DLLs from being correctly placed.
*   **Perform Regular System Maintenance:** Tools like Disk Cleanup and regular antivirus scans can help keep your system healthy. While not directly preventing DLL errors, a well-maintained system is less prone to corruption that could affect these critical files.
*   **Backup Your System (Optional but Recommended):** For critical systems, consider creating system restore points or full system backups before installing new software or making significant system changes. This allows you to revert to a previous stable state if a new installation causes unexpected issues.