---
title: "How to Resolve \"VCRUNTIME140.dll Not Found\" Error When Launching Applications"
date: "2026-05-14T11:51:48.036Z"
slug: "how-to-resolve-vcruntime140-dll-not-found-error-when-launching-applications"
type: "how-to"
description: "Detailed guide to fix the \"VCRUNTIME140.dll not found\" error. Learn why it happens and follow step-by-step solutions including reinstalling Visual C++ Redistributable, using SFC, and preventing future issues."
keywords: "VCRUNTIME140.dll, DLL error, not found, missing DLL, Visual C++ Redistributable, Windows error, application launch error, fix DLL, system file checker, Windows troubleshooting"
---

### Problem Explanation

Users often encounter the "VCRUNTIME140.dll Not Found" error when attempting to launch specific applications, ranging from games and productivity software to system utilities. This error manifests as a pop-up window, typically with a red "X" icon, displaying a message similar to:

"***The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem.***"

Alternatively, the message might be displayed within a command prompt window or an application's custom error dialog. Upon clicking "OK" or closing the error, the application usually fails to launch entirely. This problem prevents the software from initiating, making it unusable until the underlying issue with the missing or corrupted VCRUNTIME140.dll file is resolved.

### Why It Happens

The `VCRUNTIME140.dll` file is a crucial component of the Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. It is a runtime library required by applications developed using Microsoft Visual C++. Many applications rely on this specific DLL (Dynamic Link Library) to execute essential functions. When an application attempts to load this DLL and cannot find it in the expected system directories, or if the file is corrupted, the "Not Found" error occurs.

The root causes for this file being missing or unavailable can include:
*   **Accidental Deletion:** The file might have been inadvertently deleted by the user or another application.
*   **Corruption:** The DLL file could have become corrupted due to disk errors, malware infection, or improper shutdowns.
*   **Incomplete Installation:** The Visual C++ Redistributable package might not have been installed correctly, or it may be an outdated version.
*   **Software Conflicts:** Other installed software might have modified or removed the required DLL.
*   **System Issues:** Underlying Windows operating system problems or updates might affect system files.

### Step-by-Step Solution

Addressing the "VCRUNTIME140.dll Not Found" error requires a systematic approach, often starting with the simplest and most common fixes.

#### ## Step 1: Restart Your Computer

Before attempting more complex solutions, a simple system restart can often resolve temporary glitches or processes that might be preventing the DLL from being properly recognized.
1.  Save any open work and close all applications.
2.  Click the **Start** button, then select **Power** > **Restart**.
3.  Once your computer has restarted, attempt to launch the problematic application again.

#### ## Step 2: Reinstall the Affected Application

If the error appears only when launching a specific application, reinstalling that application might resolve the issue by replacing any missing or corrupted files specific to its installation, including the necessary runtime libraries.
1.  Open **Settings** > **Apps** > **Apps & features**.
2.  Locate the application that is displaying the error.
3.  Click on the application and select **Uninstall**. Follow any on-screen prompts to complete the uninstallation.
4.  Restart your computer.
5.  Download the latest installer for the application from its official website.
6.  Run the installer and follow the instructions to reinstall the application.
7.  After installation, attempt to launch the application.

#### ## Step 3: Install the Microsoft Visual C++ Redistributable Package

This is the most common and effective solution, as `VCRUNTIME140.dll` is part of this package. It's crucial to install the correct version (x86 for 32-bit applications, x64 for 64-bit applications). For most modern systems, installing both x86 and x64 versions of the *latest* package is recommended. The `VCRUNTIME140.dll` specifically comes from the Visual C++ Redistributable for Visual Studio 2015-2022.
1.  Open your web browser and search for "Microsoft Visual C++ Redistributable for Visual Studio 2015-2022". Ensure you navigate to the official Microsoft website (typically `docs.microsoft.com` or `learn.microsoft.com`).
2.  On the Microsoft download page, locate the installers for both:
    *   `vc_redist.x86.exe` (for 32-bit applications)
    *   `vc_redist.x64.exe` (for 64-bit applications)
3.  Download both files.
4.  Run `vc_redist.x64.exe` first. If prompted with "Repair" or "Uninstall," choose **Repair**. If prompted with "Install," choose **Install** and agree to the license terms.
5.  After the x64 installation/repair, run `vc_redist.x86.exe` and follow the same steps (Repair or Install).
6.  Restart your computer after both installations are complete.
7.  Attempt to launch the application.

#### ## Step 4: Run System File Checker (SFC) and DISM

Corrupted system files can sometimes lead to missing or damaged DLLs. Windows includes built-in tools to scan for and repair these issues.
1.  Open the **Start** menu, type `cmd`, right-click on **Command Prompt**, and select **Run as administrator**.
2.  In the Command Prompt window, type `sfc /scannow` and press Enter. This command scans for corrupted Windows system files and attempts to repair them. The scan may take some time.
3.  Once the SFC scan is complete, if it found and repaired issues, restart your computer and test the application.
4.  If SFC reports issues it couldn't fix, or if the problem persists, run the Deployment Image Servicing and Management (DISM) tool. In the same elevated Command Prompt, type the following commands, pressing Enter after each:
    *   `DISM /Online /Cleanup-Image /CheckHealth`
    *   `DISM /Online /Cleanup-Image /ScanHealth`
    *   `DISM /Online /Cleanup-Image /RestoreHealth`
5.  Allow each DISM command to complete. This process can take a while, especially `RestoreHealth`.
6.  After DISM completes, run `sfc /scannow` again.
7.  Restart your computer and check if the error is resolved.

#### ## Step 5: Check for Windows Updates

Keeping your operating system up-to-date ensures that you have the latest system files, security patches, and runtime components, which can resolve underlying compatibility issues or supply missing DLLs.
1.  Open **Settings** > **Update & Security** (on Windows 10) or **Settings** > **Windows Update** (on Windows 11).
2.  Click **Check for updates**.
3.  Download and install any available updates.
4.  Restart your computer as prompted after updates are installed.
5.  Test the application.

#### ## Step 6: Perform a Clean Boot

A clean boot starts Windows with a minimal set of drivers and startup programs. This can help identify if a third-party application or service is conflicting with the necessary DLL.
1.  Open the **Start** menu, type `msconfig`, and select **System Configuration**.
2.  Go to the **Services** tab. Check the box **Hide all Microsoft services**, then click **Disable all**.
3.  Go to the **Startup** tab, and click **Open Task Manager**.
4.  In Task Manager, go through each startup item, select it, and click **Disable**. Close Task Manager.
5.  Back in System Configuration, click **Apply** and then **OK**.
6.  Restart your computer.
7.  After a clean boot, try launching the problematic application. If it works, a third-party service or startup item is the culprit. Re-enable services and startup items one by one, restarting after each, until you find the one causing the conflict.
8.  Once you identify the conflicting item, you can keep it disabled or look for an update or alternative. To return to a normal startup, open System Configuration, select **Normal startup** on the **General** tab, and apply changes.

### Common Mistakes

When attempting to resolve the "VCRUNTIME140.dll Not Found" error, users frequently make certain mistakes that can complicate the fix or even introduce new problems:

*   **Downloading DLLs from Unofficial Websites:** A prevalent mistake is to search for and download `VCRUNTIME140.dll` from third-party DLL download sites. These websites are often sources of outdated, corrupted, or malicious files (malware). Installing such files can lead to system instability, security vulnerabilities, or further DLL errors. Always obtain system files and redistributables directly from official Microsoft sources.
*   **Installing the Wrong Architecture (x86 vs. x64):** Users might install only the x86 (32-bit) version of the Visual C++ Redistributable when a 64-bit application requires the x64 version, or vice-versa. While it's generally safe to install both, failing to install the correct architecture for the problematic application will not resolve the error.
*   **Not Restarting the Computer:** After installing or repairing the Visual C++ Redistributable package or running system commands, many users forget or neglect to restart their computer. A restart is often necessary for changes to take full effect and for the operating system to properly register the newly installed or repaired files.
*   **Ignoring Windows Updates:** Delaying or ignoring Windows updates can leave the operating system without critical patches or updated runtime libraries that applications might expect. This can lead to various compatibility issues, including DLL errors.

### Prevention Tips

Preventing the "VCRUNTIME140.dll Not Found" error and similar DLL issues largely revolves around maintaining a healthy and up-to-date Windows environment.

*   **Keep Your Operating System Updated:** Regularly check for and install Windows updates. These updates often include critical security patches, bug fixes, and updated system libraries, including components of the Visual C++ Redistributable. This proactive approach ensures your system has the latest dependencies required by modern applications.
*   **Install Software from Reputable Sources:** Always download and install applications from their official developer websites or trusted digital storefronts. Avoid using pirated software or installers from unverified sources, as these can be incomplete, modified, or bundled with malware that could corrupt or delete essential system files.
*   **Maintain Antivirus and Anti-malware Protection:** Keep your antivirus software updated and perform regular system scans. Malware can target and corrupt system DLLs, leading to errors. A robust security solution can detect and remove threats before they cause damage.
*   **Avoid Manual DLL File Manipulation:** Unless you are an expert and know precisely what you are doing, refrain from manually deleting, moving, or renaming DLL files in your system directories. Windows and installed applications rely on these files being in their expected locations. If you suspect a DLL issue, use official uninstallers or reinstallers rather than manual file management.
*   **Back Up Your System Regularly:** Consider using Windows' built-in System Restore feature or third-party backup solutions to create restore points or full system images. In cases where a severe system file corruption occurs, you can revert your system to a previous, stable state without losing data or requiring a complete reinstallation of Windows.