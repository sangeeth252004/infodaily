---
title: "How to Fix \"MSVCP140.dll Not Found\" Error During Software Installation"
date: "2026-06-27T02:56:38.521Z"
slug: "how-to-fix-msvcp140-dll-not-found-error-during-software-installation"
type: "how-to"
description: "Learn to fix the \"MSVCP140.dll not found\" error during software installation. This guide provides step-by-step instructions to resolve missing Visual C++ Redistributable issues and prevent future problems."
keywords: "MSVCP140.dll, MSVCP140.dll missing, Visual C++ Redistributable, fix DLL error, software installation error, runtime error, Windows error, VC_redist.x64.exe, VC_redist.x86.exe"
---

### Problem Explanation

The "MSVCP140.dll Not Found" error is a common runtime issue that often arises when attempting to install or launch new software, especially games or other demanding applications, on a Windows operating system. Users typically encounter a pop-up error message that states something similar to: "The program can't start because MSVCP140.dll is missing from your computer. Try reinstalling the program to fix this problem." In some cases, the error might appear slightly differently, such as "MSVCP140.dll is missing" or "MSVCP140.dll was not found," but the underlying issue remains the same.

This error effectively prevents the intended software from running, making the application unusable. It directly points to a missing dynamic-link library (DLL) file that a specific program requires to function correctly. While the error message might suggest reinstalling the problematic program, this often only provides a temporary or incomplete solution because the root cause of the missing DLL is typically external to the application itself.

### Why It Happens

The MSVCP140.dll file is a crucial component of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. This redistributable package contains runtime components that are necessary to run applications developed using Microsoft Visual Studio. Many software developers use Visual C++ to build their applications, and these applications rely on these specific DLL files being present on the end-user's system.

The "MSVCP140.dll Not Found" error typically occurs because the required Visual C++ Redistributable package is either not installed on your system, has become corrupted, or was inadvertently removed by another software installation or uninstallation process. When the application you're trying to run searches for this specific DLL file and cannot locate it in the expected system directories, it throws the "not found" error, halting its execution. Simply put, the program needs a library (MSVCP140.dll) that isn't available, preventing it from executing its critical functions.

### Step-by-Step Solution

To resolve the "MSVCP140.dll Not Found" error, the most effective approach is to correctly install or repair the Microsoft Visual C++ Redistributable package that contains the missing DLL.

#### Step 1: Understand the Role of MSVCP140.dll

Before proceeding, it's essential to reiterate that MSVCP140.dll is part of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. This means you do *not* need to search for and download the individual MSVCP140.dll file from unofficial sources. Doing so can introduce security risks, malware, or incorrect versions of the file, leading to further system instability. The correct and safe method is to install the official Microsoft package.

#### Step 2: Identify Your System Architecture

The Visual C++ Redistributable comes in different versions for 32-bit (x86) and 64-bit (x64) operating systems. It is critical to download the correct version for your system. Even on a 64-bit system, many applications are still 32-bit and require the x86 redistributable. For maximum compatibility on a 64-bit Windows system, it is often recommended to install *both* the x86 and x64 versions of the redistributable.

To check your system architecture:
1.  Press `Windows Key + R` to open the Run dialog.
2.  Type `msinfo32` and press Enter.
3.  Look for "System Type" in the System Summary. It will typically show "x64-based PC" for 64-bit systems or "x86-based PC" for 32-bit systems.

#### Step 3: Download and Install the Latest Visual C++ Redistributable

This is the most crucial step. You need to obtain the official redistributable package directly from Microsoft.
1.  Open your web browser and navigate to the official Microsoft download page for Visual C++ Redistributable. A quick search for "Visual C++ Redistributable latest supported downloads" will lead you to the correct page on `docs.microsoft.com` or `learn.microsoft.com`.
2.  Locate the section for "Visual Studio 2015, 2017, 2019, and 2022." This is the combined package that contains MSVCP140.dll.
3.  Download both the `vc_redist.x86.exe` (for 32-bit applications) and `vc_redist.x64.exe` (for 64-bit applications and systems) installers. Even if you have a 64-bit system, download both. If you have a 32-bit system, only download `vc_redist.x86.exe`.
4.  Once downloaded, run the `vc_redist.x64.exe` file first (if applicable).
    *   If it's already installed, you will likely see options to "Repair" or "Uninstall." Choose "Repair."
    *   If it's not installed, follow the prompts to install it (agree to terms, then click "Install").
5.  After the x64 version, run the `vc_redist.x86.exe` file.
    *   Again, choose "Repair" if available, or "Install" if not.
6.  Once both (or the single x86) packages are installed/repaired, restart your computer. This ensures that the newly installed DLL files are properly recognized by the operating system.

#### Step 4: Reinstall the Problematic Software

After installing the Visual C++ Redistributable and restarting your computer, try launching the problematic software again. If the error persists, consider reinstalling the application that was giving the error. This can sometimes help the application detect the newly available DLLs or properly link to them.
1.  Go to `Settings > Apps > Apps & features`.
2.  Locate the software causing the error, click on it, and select "Uninstall."
3.  Follow the uninstallation prompts, then restart your computer.
4.  Reinstall the software from its official source.

#### Step 5: Run System File Checker (SFC)

Corrupted Windows system files can sometimes lead to issues with DLLs. Running the System File Checker tool can help identify and repair such files.
1.  Press `Windows Key + R`, type `cmd`, and then press `Ctrl+Shift+Enter` to open Command Prompt as an administrator.
2.  In the Command Prompt window, type `sfc /scannow` and press Enter.
3.  The scan will take some time to complete. Do not close the window until the verification is 100% complete.
4.  If SFC finds and repairs files, restart your computer and try the software again.

#### Step 6: Update Windows

Ensuring your operating system is fully up-to-date can sometimes resolve underlying dependency issues. Windows updates often include fixes for runtime components and may provide more stable versions of system DLLs or related frameworks.
1.  Go to `Settings > Update & Security` (or `Windows Update` on Windows 11).
2.  Click on "Check for updates."
3.  Install any available updates and restart your computer if prompted.

### Common Mistakes

*   **Downloading DLLs from Unofficial Websites:** A common and dangerous mistake is searching for "MSVCP140.dll download" and getting the file from a third-party, unofficial website. These files are often outdated, incorrect versions, or even contain malware, leading to system instability or security breaches. Always use official Microsoft redistributable packages.
*   **Only Installing the x64 Version on a 64-bit System:** Many 64-bit Windows users mistakenly believe they only need the x64 redistributable. However, numerous applications, even on 64-bit systems, are compiled as 32-bit and require the x86 (32-bit) version of the redistributable. Failing to install both can leave the error unresolved for 32-bit applications.
*   **Not Restarting the Computer:** After installing or repairing the redistributable packages, it's crucial to restart your computer. This allows the operating system to properly register the new or repaired DLL files and apply any changes. Skipping this step can lead to the error persisting.
*   **Ignoring Exact Error Messages:** Attempting unrelated fixes (like registry cleaners or driver updates) without understanding that MSVCP140.dll specifically points to a Visual C++ Redistributable issue. Focusing on the exact DLL name provided in the error message is key to an efficient solution.

### Prevention Tips

*   **Always Download Software from Official Sources:** Obtain applications, especially games, directly from the developer's official website, reputable digital storefronts (like Steam, Epic Games Store, Microsoft Store), or trusted distributors. This minimizes the risk of incomplete or modified installations that might omit necessary runtime components.
*   **Keep Windows Updated:** Regularly check for and install Windows updates. Microsoft often includes fixes, performance improvements, and updated runtime libraries within these updates, which can help prevent various DLL-related issues.
*   **Avoid Unverified "DLL Fixer" Tools:** Be wary of software claiming to "fix" all your DLL problems. Many such tools are ineffective, harmful, or simply try to trick you into downloading malware or paying for unnecessary services. Stick to official solutions provided by Microsoft or the software vendor.
*   **Create System Restore Points:** Before installing new software or making significant system changes, create a system restore point. If an installation inadvertently causes an issue like a missing DLL, you can easily revert your system to a previous stable state.
    *   Search for "Create a restore point" in the Windows search bar.
    *   Click "Create..." and follow the prompts.
*   **Maintain Good Antivirus Protection:** Ensure you have a reputable antivirus program active and updated. Malware can sometimes corrupt or delete system files, including DLLs, leading to errors. A robust security solution can help prevent such occurrences.