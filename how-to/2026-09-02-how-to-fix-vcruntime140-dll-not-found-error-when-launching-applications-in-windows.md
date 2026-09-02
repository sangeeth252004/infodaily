---
title: "How to Fix 'VCRUNTIME140.dll Not Found' Error When Launching Applications in Windows"
date: "2026-09-02T02:56:05.963Z"
slug: "how-to-fix-vcruntime140-dll-not-found-error-when-launching-applications-in-windows"
type: "how-to"
description: "Comprehensive guide to fix the 'VCRUNTIME140.dll Not Found' error in Windows. Learn why it happens and follow step-by-step solutions to resolve it, including reinstalling Visual C++ Redistributables."
keywords: "VCRUNTIME140.dll, not found, missing dll, Windows error, fix application launch, Visual C++ Redistributable, DLL error, Windows problem, troubleshooting, system file error"
---

Encountering a "VCRUNTIME140.dll Not Found" error can be incredibly frustrating, especially when you're just trying to launch an application. This message often appears as a pop-up window, preventing your desired software from starting, leaving you wondering what went wrong and how to make it work. It's a common hurdle for many Windows users, but thankfully, it's usually fixable with a few targeted troubleshooting steps.

When this error strikes, you'll typically see a small dialog box titled with the name of the application you're trying to launch, or simply "Windows Error." Inside, the message will clearly state something like: "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem." While reinstalling the program is often suggested, it's not always the complete solution, as the underlying issue lies deeper within your Windows system files.

## Why It Happens

The "VCRUNTIME140.dll" file is a crucial component of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. This redistributable package contains a set of runtime library components that many applications developed using Visual Studio require to function correctly. Essentially, when a program needs to perform certain actions, it looks for these shared libraries – including VCRUNTIME140.dll – to execute its code.

The error primarily occurs for a few reasons: the file might be genuinely missing, it could be corrupted, or it might be an outdated version. This can happen due to an incomplete or failed installation of an application, a Windows update gone awry, accidental deletion, or even malware interference. Sometimes, multiple versions of the Visual C++ Redistributable coexist on a system, and an application might specifically require a version that isn't properly installed or registered.

## Step-by-Step Solution

Let's get that application running again! Follow these steps carefully to resolve the "VCRUNTIME140.dll Not Found" error.

### Step 1: Restart Your Computer

It might seem too simple, but a quick restart can often resolve temporary glitches and refresh system processes. Before diving into more complex solutions, save any open work and give your computer a fresh start. Sometimes, pending updates or processes need a reboot to finalize, which might silently fix the underlying issue.

### Step 2: Reinstall the Problematic Application

If the error specifically points to one application, reinstalling it can sometimes resolve the dependency issue. The application's installer might include a fresh copy of the necessary runtime files or trigger a repair of the Visual C++ Redistributables.

1.  **Uninstall the application:** Go to `Settings > Apps > Apps & features`. Find the application in the list, click on it, and select "Uninstall." Follow any on-screen prompts.
2.  **Download a fresh installer:** Obtain the latest version of the application from its official website.
3.  **Reinstall the application:** Run the installer you just downloaded. Pay attention during installation for any options related to installing prerequisites or Visual C++ components.

### Step 3: Install/Repair the Microsoft Visual C++ Redistributable

This is often the most effective solution, as VCRUNTIME140.dll is a core part of this package. You need to ensure the correct version of the redistributable is installed and functioning properly.

1.  **Identify the correct package:** VCRUNTIME140.dll belongs to the **Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022**.
2.  **Download from Microsoft:** Open your web browser and search for "Microsoft Visual C++ Redistributable for Visual Studio 2015-2022." Always download these files directly from Microsoft's official website.
3.  **Download both x86 and x64 versions:**
    *   On the download page, you will typically see two files: `vc_redist.x86.exe` (for 32-bit applications) and `vc_redist.x64.exe` (for 64-bit applications).
    *   Even if you have a 64-bit Windows system, you **must download and install both** the x86 and x64 versions. Many 64-bit Windows systems run 32-bit applications that require the x86 redistributable.
4.  **Run the installers:**
    *   Locate the downloaded `vc_redist.x86.exe` and `vc_redist.x64.exe` files.
    *   Run `vc_redist.x64.exe` first. If it's already installed, you'll see options to "Repair" or "Uninstall." Choose "Repair" to fix any potential corruption. If it's not installed, proceed with the installation.
    *   Repeat the process for `vc_redist.x86.exe`.
5.  **Restart your computer:** After installing or repairing both packages, it's crucial to restart your system to ensure all changes take effect.

### Step 4: Run System File Checker (SFC) and DISM

Corrupted Windows system files can sometimes cause DLL errors. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can help identify and repair such issues.

1.  **Open Command Prompt as Administrator:**
    *   Type `cmd` in the Windows search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
    *   Click "Yes" if prompted by User Account Control.
2.  **Run SFC scan:** In the Command Prompt window, type `sfc /scannow` and press Enter. This process will scan for corrupted system files and attempt to repair them. It can take some time.
3.  **Run DISM commands:** If SFC reports issues it couldn't fix, or even as a general measure, run these DISM commands (one by one, pressing Enter after each):
    *   `DISM /Online /Cleanup-Image /CheckHealth`
    *   `DISM /Online /Cleanup-Image /ScanHealth`
    *   `DISM /Online /Cleanup-Image /RestoreHealth`
    These commands will check and repair the Windows system image.
4.  **Restart your computer:** Once all commands have finished, restart your PC.

### Step 5: Check for Windows Updates

Keeping your Windows operating system up-to-date is vital. Windows updates often include security patches, bug fixes, and updated runtime libraries that can resolve various system issues, including missing DLL errors.

1.  Go to `Settings > Update & Security > Windows Update`.
2.  Click on "Check for updates."
3.  Install any available updates and restart your computer if prompted.

### Step 6: Perform a Malware Scan

Malware or viruses can sometimes corrupt or delete system files, leading to errors like VCRUNTIME140.dll being missing. A thorough scan can help rule out malicious software as the cause.

1.  Use your preferred antivirus software (e.g., Windows Security, Malwarebytes, etc.).
2.  Perform a full system scan. This may take a while.
3.  If any threats are found, follow the instructions to quarantine or remove them.
4.  After the scan, restart your computer and check if the error persists.

### Step 7: Consider a System Restore

If the error started appearing recently after a new installation, update, or system change, Windows System Restore can revert your system to a previous state where the error did not occur.

1.  Type "create a restore point" in the Windows search bar and select the corresponding option.
2.  In the System Properties window, click on the "System Restore..." button.
3.  Follow the wizard, choosing a restore point from a date **before** you started experiencing the VCRUNTIME140.dll error.
4.  Confirm your selection and proceed with the restore. Your computer will restart and revert to the chosen state. This will not affect your personal files, but applications installed after the restore point will be removed.

## Common Mistakes

When trying to fix DLL errors, it's easy to fall into certain traps that can worsen the problem or leave your system vulnerable.

One of the most common mistakes is downloading VCRUNTIME140.dll from unofficial, third-party DLL download websites. These sites often host outdated or even malicious versions of DLLs, which can introduce viruses, Trojans, or further system instability. Always obtain system files and runtime libraries directly from the official source, which in this case is Microsoft. Another oversight is neglecting to install both the x86 and x64 versions of the Visual C++ Redistributable on a 64-bit system; many applications are still 32-bit and require the x86 package. Finally, forgetting to restart your computer after making significant changes, such as installing or repairing system components, can prevent the fixes from taking full effect.

## Prevention Tips

Preventing future occurrences of the "VCRUNTIME140.dll Not Found" error involves maintaining a healthy and secure Windows environment.

First and foremost, keep your Windows operating system and all installed applications updated. Regular updates often include fixes for known issues, security patches, and updated runtime libraries that are essential for smooth operation. Secondly, always download and install software from official and reputable sources. Avoiding pirated software or downloads from suspicious websites significantly reduces the risk of installing corrupted files or malware that could interfere with system DLLs. Lastly, maintain a reliable antivirus or anti-malware solution and perform regular full system scans to detect and neutralize threats before they can damage critical system files. Regularly creating system restore points can also be a lifesaver, allowing you to quickly roll back to a stable state if problems arise.