---
title: "How to Fix \"VCRUNTIME140.dll Was Not Found\" Error When Launching Applications"
date: "2026-05-10T07:25:14.399Z"
slug: "how-to-fix-vcruntime140-dll-was-not-found-error-when-launching-applications"
type: "how-to"
description: "Experiencing \"VCRUNTIME140.dll was not found\" errors? Learn to troubleshoot and fix this common issue with a comprehensive, step-by-step guide focusing on reinstalling Visual C++ Redistributables and system checks."
keywords: "VCRUNTIME140.dll, DLL error, Visual C++ Redistributable, fix missing DLL, application launch error, Windows error, sfc /scannow, DISM, missing DLL file, troubleshooting guide"
---

When you're trying to launch your favorite game, a crucial productivity application, or even a system utility, and you're met with an abrupt error message, it can be incredibly frustrating. One of the most common and perplexing messages Windows users encounter is related to a missing or corrupt Dynamic Link Library (DLL) file, specifically the "VCRUNTIME140.dll was not found" error. This frustrating pop-up prevents your application from starting, leaving you unable to use your software.

This specific error message typically appears in a dialog box stating, "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem," or sometimes, "VCRUNTIME140.dll was not found." While the prompt suggests reinstalling the application, this often doesn't resolve the underlying issue, as the problem usually lies deeper within your Windows system's core components.

## Why It Happens

The VCRUNTIME140.dll file is a vital component of the Microsoft Visual C++ Redistributable Package for Visual Studio 2015, 2017, 2019, and 2022. Essentially, it's a runtime library that applications built using Visual C++ need to function correctly. Many modern applications, from games to video editors and specialized software, rely on these C++ runtime components to operate smoothly.

The "VCRUNTIME140.dll was not found" error typically occurs for a few primary reasons:
*   **Accidental Deletion or Corruption:** The file might have been inadvertently deleted, moved, or corrupted by another program, a failed update, or even user error.
*   **Incomplete Installation:** The software you're trying to run, or a previous installation of another program, might have failed to correctly install or update the necessary Visual C++ Redistributable package.
*   **Malware Infection:** Malicious software can sometimes target and corrupt or delete crucial system files, including DLLs, to disrupt your system's stability.
*   **Windows Update Issues:** Occasionally, a botched Windows update can interfere with system files or the redistributable packages, leading to missing DLL errors.
*   **Conflicting Software:** Less commonly, another installed application might have overwritten or introduced an incompatible version of the DLL, causing conflicts.

## Step-by-Step Solution

Let's walk through a comprehensive set of solutions, starting with the simplest and moving to more in-depth system checks, to get your applications running again.

### Step 1: Restart Your Computer

It might sound too simple, but a good old-fashioned restart can often resolve temporary glitches, clear system memory, and reinitialize processes that might be causing the error. Save your work, close all applications, and perform a full system restart before attempting any further troubleshooting.

### Step 2: Reinstall the Problematic Application

While the error message's suggestion to reinstall the program doesn't always work, it's a good next step. Sometimes, an application's installer will check for and install its required dependencies, including the Visual C++ Redistributables, as part of its setup routine.

1.  Open **Settings** (Windows key + I).
2.  Go to **Apps** > **Apps & features**.
3.  Find the application that's giving you the error, click on it, and select **Uninstall**. Follow any on-screen prompts.
4.  Once uninstalled, download a fresh installer for the application from its official source.
5.  Run the installer and follow the instructions to reinstall the application.

### Step 3: Download and Reinstall the Microsoft Visual C++ Redistributable Packages

This is often the most effective solution, as VCRUNTIME140.dll is part of these packages. You need to ensure you have the correct and uncorrupted versions installed.

1.  **Identify Your System Type:**
    *   Open **Settings** (Windows key + I).
    *   Go to **System** > **About**.
    *   Look for "System type." It will typically say "64-bit operating system, x64-based processor" or "32-bit operating system, x86-based processor." This tells you whether you need x64 or x86 (or both) versions. For 64-bit systems, it's often best to install *both* the x86 and x64 versions, as many 32-bit applications still run on 64-bit Windows.
2.  **Uninstall Existing Corrupt Packages:**
    *   Go to **Settings** > **Apps** > **Apps & features**.
    *   Scroll through the list and look for anything named "Microsoft Visual C++ 2015-2022 Redistributable (x64)" or "Microsoft Visual C++ 2015-2022 Redistributable (x86)."
    *   Click on each one you find and select **Uninstall**. If there are multiple versions (e.g., 2015, 2017, 2019, 2022), remove all of them. Don't worry, you'll reinstall the latest version.
3.  **Download New Packages from Microsoft:**
    *   Open your web browser and go directly to the official Microsoft download page for the latest Visual C++ Redistributables. You can usually find this by searching "Microsoft Visual C++ Redistributable latest supported downloads" or by going to `support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9fa3-2cd17f63fcdb`.
    *   Look for the section titled "Visual Studio 2015, 2017, 2019, and 2022."
    *   Download both `vc_redist.x86.exe` (for 32-bit systems, and necessary for 32-bit apps on 64-bit systems) and `vc_redist.x64.exe` (for 64-bit systems).
4.  **Install the Downloaded Packages:**
    *   Run `vc_redist.x86.exe` first. Accept the license terms and click **Install**.
    *   Once that's complete, run `vc_redist.x64.exe`. Accept the license terms and click **Install**.
    *   Restart your computer after both installations are finished.

### Step 4: Run a System File Checker (SFC) Scan

Windows has a built-in tool called System File Checker (SFC) that can scan for and restore corrupted or missing Windows system files, including DLLs.

1.  Press **Windows key + R**, type `cmd`, and then press **Ctrl+Shift+Enter** to open an elevated Command Prompt (Run as administrator).
2.  In the Command Prompt window, type `sfc /scannow` and press **Enter**.
3.  The scan will take some time to complete. Do not close the window until it reaches 100%.
4.  If it finds integrity violations, it will attempt to repair them. Once complete, restart your computer.

### Step 5: Perform a DISM Scan

If the SFC scan didn't resolve the issue or couldn't fix all problems, the Deployment Image Servicing and Management (DISM) tool can often repair a corrupted Windows system image, which SFC relies upon.

1.  Open an elevated Command Prompt again (Windows key + R, type `cmd`, then Ctrl+Shift+Enter).
2.  Type the following command and press **Enter**:
    `DISM /Online /Cleanup-Image /RestoreHealth`
3.  This scan can take a considerable amount of time. Allow it to finish completely.
4.  Once the DISM scan is done, it's a good idea to run the `sfc /scannow` command again (as in Step 4) to ensure everything is in order.
5.  Restart your computer.

### Step 6: Check for Windows Updates

Sometimes, underlying system library issues or necessary redistributable updates are bundled with Windows updates. Ensuring your operating system is fully up-to-date can resolve many compatibility and missing file errors.

1.  Open **Settings** (Windows key + I).
2.  Go to **Windows Update**.
3.  Click **Check for updates**.
4.  Download and install any available updates.
5.  Restart your computer as prompted.

### Step 7: Scan for Malware

Malware can sometimes corrupt or delete essential system files, leading to errors like the missing VCRUNTIME140.dll. A thorough scan can help identify and remove any malicious software.

1.  Open **Windows Security** (search for "Windows Security" in the Start menu).
2.  Go to **Virus & threat protection**.
3.  Click on **Scan options** and select **Full scan**.
4.  Click **Scan now**. This scan can take a long time.
5.  If any threats are found, follow the instructions to quarantine or remove them.
6.  Consider running a scan with a reputable third-party anti-malware tool for an additional layer of checking.
7.  Restart your computer after the scan.

## Common Mistakes

When troubleshooting the "VCRUNTIME140.dll was not found" error, it's easy to fall into common traps that can worsen the problem or waste your time.

*   **Downloading DLLs from Unofficial Sites:** Never download VCRUNTIME140.dll or any other DLL file from random websites. These sites are often unreliable and can distribute outdated, corrupted, or even malicious files disguised as the legitimate DLL, potentially infecting your system with malware or causing further instability. Always use official Microsoft sources for redistributable packages.
*   **Only Installing One Version (x86 or x64):** On a 64-bit Windows system, it's crucial to install *both* the x86 (32-bit) and x64 (64-bit) versions of the Visual C++ Redistributables. Many applications, even on 64-bit Windows, are still 32-bit and require the x86 redistributable to function correctly.
*   **Not Uninstalling Before Reinstalling:** Simply running the new redistributable installer over an existing, corrupted one might not fully replace all the necessary files. A clean uninstall of the old package before installing the fresh one ensures a pristine installation.
*   **Ignoring System Architecture:** Not verifying whether your system is 32-bit or 64-bit before downloading can lead to installing the wrong package, which won't fix the problem. Always check your "System type" in Windows Settings.

## Prevention Tips

Preventing the "VCRUNTIME140.dll was not found" error is largely about maintaining a healthy and updated Windows environment.

*   **Keep Your Operating System Updated:** Regularly install Windows updates. These updates often include important security patches and sometimes updated runtime libraries that can prevent DLL conflicts or missing file issues.
*   **Download Software from Official Sources:** Always obtain applications, games, and drivers directly from the developer's official website or reputable digital storefronts (like Steam, Microsoft Store, Epic Games Store). This minimizes the risk of downloading compromised or incomplete installation packages.
*   **Maintain Robust Antivirus/Anti-Malware Protection:** Use a reliable antivirus program and keep it updated. Regular scans can detect and remove malicious software before it has a chance to corrupt or delete critical system files.
*   **Exercise Caution When Deleting Files:** Avoid manually deleting files from system directories unless you are absolutely certain of their function and necessity. If in doubt, don't delete it.
*   **Ensure Proper Software Installation and Uninstallation:** When installing new software, allow it to complete its installation process fully. When uninstalling, use the "Apps & features" section in Windows Settings to ensure a clean removal, rather than just deleting program folders.