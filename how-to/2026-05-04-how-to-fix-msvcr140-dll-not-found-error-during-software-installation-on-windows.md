---
title: "How to Fix 'MSVCR140.dll Not Found' Error During Software Installation on Windows"
date: "2026-05-04T07:46:58.000Z"
slug: "how-to-fix-msvcr140-dll-not-found-error-during-software-installation-on-windows"
type: "how-to"
description: "Resolve the 'MSVCR140.dll Not Found' error during software installation on Windows with this comprehensive, step-by-step guide. Learn what causes it and how to quickly fix it."
keywords: "MSVCR140.dll, not found error, fix, Windows, software installation, Visual C++ Redistributable, runtime error, DLL missing, repair, install, update"
---

### Problem Explanation

Encountering an error message that states a ".dll" file is missing can be particularly frustrating, especially when you're in the middle of installing new software. The "MSVCR140.dll Not Found" error is one such common hurdle faced by Windows users. When this issue occurs, you'll typically see a pop-up dialog box either during the software installation process, immediately after it finishes, or when you attempt to launch the newly installed application for the first time.

The specific messages can vary slightly but generally convey the same problem:
*   "The program can't start because MSVCR140.dll is missing from your computer. Try reinstalling the program to fix this problem."
*   "MSVCR140.dll Not Found"
*   "Cannot find MSVCR140.dll"
*   "There was a problem starting MSVCR140.dll"
*   "MSVCR140.dll is missing from your system."

This error prevents the software from launching or installing correctly, leaving you unable to use your desired application.

### Why It Happens

The MSVCR140.dll file is a crucial component of the Microsoft Visual C++ Redistributable Package for Visual Studio 2015, 2017, 2019, and 2022. Many applications, especially games and professional software, are developed using Microsoft Visual C++ and rely on these runtime components to function correctly on a Windows operating system. If this specific DLL (Dynamic Link Library) file is either missing, corrupted, or incompatible with the application you're trying to run, you'll encounter the "Not Found" error.

The root causes typically fall into a few categories:
*   **Missing Package:** The most common reason is that the required Microsoft Visual C++ Redistributable package, which includes MSVCR140.dll, is simply not installed on your system. While software installers often bundle these dependencies, sometimes their installation fails or is skipped.
*   **Corrupted Installation:** An existing Visual C++ Redistributable package might be corrupted due to a faulty update, a power outage, or another system anomaly.
*   **Accidental Deletion or Quarantine:** Less commonly, the MSVCR140.dll file might have been accidentally deleted, or an overzealous antivirus program might have incorrectly flagged and quarantined it.
*   **System Conflicts:** In rare cases, conflicts with other installed software or system components might prevent the DLL from being accessed correctly.

### Step-by-Step Solution

Let's walk through the steps to get that pesky MSVCR140.dll error sorted out and your software running smoothly.

#### ## Step 1: Restart Your Computer

It might seem too simple, but a fresh start can resolve many temporary system glitches that could be causing a DLL not to load correctly. Before diving into more complex solutions, always give your system a clean reboot.

1.  Save any open work.
2.  Click the **Start** button.
3.  Click the **Power** icon.
4.  Select **Restart**.
5.  After your computer restarts, try installing or launching your software again.

#### ## Step 2: Reinstall the Problematic Software

Sometimes, the original software installation might have been incomplete or failed to correctly install its dependencies. A clean reinstallation can often resolve this.

1.  **Uninstall the Software:**
    *   Press `Windows key + R` to open the Run dialog.
    *   Type `appwiz.cpl` and press Enter to open "Programs and Features."
    *   Locate the software that is giving you the error, select it, and click **Uninstall**.
    *   Follow any on-screen prompts to complete the uninstallation.
2.  **Restart Your Computer:** Perform another restart after uninstalling.
3.  **Reinstall the Software:**
    *   Run the installer for your software again.
    *   Ensure you run the installer as an administrator by right-clicking the setup file and choosing "Run as administrator."
    *   Pay close attention to any prompts during installation, as some installers give you the option to install prerequisites like the Visual C++ Redistributable. Make sure these options are selected.

#### ## Step 3: Download and Install the Microsoft Visual C++ Redistributable Packages

This is the most common and effective solution. MSVCR140.dll is part of the Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022. It's crucial to install both the 32-bit (x86) and 64-bit (x64) versions, even if you have a 64-bit operating system, as many applications are still 32-bit.

1.  **Navigate to the Official Microsoft Website:** Open your web browser and search for "Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022." Ensure you download directly from a trusted Microsoft domain (e.g., `microsoft.com`).
2.  **Download Both Versions:**
    *   Look for `vc_redist.x86.exe` (the 32-bit version).
    *   Look for `vc_redist.x64.exe` (the 64-bit version).
    *   Download both files.
3.  **Install the Packages:**
    *   Locate the downloaded files in your Downloads folder.
    *   **Right-click** on `vc_redist.x86.exe` and select "Run as administrator."
    *   If prompted, choose "Repair" if it's already installed, or "Install" if it's new. Follow the on-screen instructions.
    *   Repeat the process for `vc_redist.x64.exe`.
4.  **Restart Your Computer:** A final restart ensures all changes are properly integrated.
5.  Try your software again.

#### ## Step 4: Repair Existing Microsoft Visual C++ Redistributables

If you already have the required Visual C++ Redistributable installed, but it might be corrupted, repairing it can often fix the issue.

1.  Open "Programs and Features":
    *   Press `Windows key + R`.
    *   Type `appwiz.cpl` and press Enter.
2.  **Locate the Packages:** Scroll through the list and find "Microsoft Visual C++ 2015-2022 Redistributable (x64)" and "Microsoft Visual C++ 2015-2022 Redistributable (x86)." (The exact year range might vary slightly depending on your system, but look for the most recent 2015-2022 package).
3.  **Repair Each Package:**
    *   Select the `(x64)` version, click **Change** at the top, then choose **Repair**.
    *   Repeat for the `(x86)` version.
4.  **Restart Your Computer:** Reboot your system to apply the repairs.
5.  Test your software.

#### ## Step 5: Run a System File Checker (SFC) Scan

System File Checker is a Windows utility that allows users to scan for and restore corruptions in Windows system files. While less common for MSVCR140.dll specifically, a corrupted system file could theoretically impact how DLLs are handled.

1.  **Open Command Prompt as Administrator:**
    *   Click the **Start** button.
    *   Type `cmd`.
    *   Right-click on "Command Prompt" in the search results and select "Run as administrator."
2.  **Run the SFC Scan:**
    *   In the Command Prompt window, type the following command and press Enter:
        ```cmd
        sfc /scannow
        ```
    *   The scan will take some time to complete. Do not close the window until it's finished.
3.  **Review Results:**
    *   If it reports "Windows Resource Protection found corrupt files and successfully repaired them," restart your computer and try your software.
    *   If it reports "Windows Resource Protection found corrupt files but was unable to fix some of them," you might need to try other troubleshooting steps or consider a DISM scan.
4.  Restart your computer and check if the error persists.

#### ## Step 6: Update Windows

Keeping your Windows operating system up to date is vital for system stability and security. Windows updates often include critical bug fixes, driver updates, and even new runtime components that could resolve underlying issues contributing to DLL errors.

1.  **Open Windows Update:**
    *   Click the **Start** button.
    *   Click on the **Settings** icon (gear).
    *   Go to "Update & Security" (on Windows 10) or "Windows Update" (on Windows 11).
2.  **Check for and Install Updates:**
    *   Click "Check for updates."
    *   Download and install all available updates. This might require multiple restarts.
3.  **Restart Your Computer:** Ensure all updates are fully integrated.
4.  Once your system is fully updated, try installing or launching your software again.

#### ## Step 7: Check for Malware or Antivirus Interference

In some rare cases, malware can corrupt or delete system files, including DLLs. Conversely, an overly aggressive antivirus program might mistakenly quarantine legitimate DLL files, preventing applications from accessing them.

1.  **Perform a Full System Scan:**
    *   Open your installed antivirus software.
    *   Initiate a full, deep system scan. This can take several hours.
    *   If any threats are found, follow your antivirus program's instructions to remove or quarantine them.
2.  **Check Antivirus Quarantine/History:**
    *   Browse through your antivirus software's quarantine, history, or protection logs.
    *   Look for any entries related to `MSVCR140.dll` or the application you're trying to install.
    *   If found and you are confident it's a false positive, you might be able to restore the file from quarantine, or temporarily disable your antivirus (at your own risk) during installation to see if it resolves the issue. Remember to re-enable it immediately afterward.
3.  Restart your computer and attempt to use your software.

### Common Mistakes

When trying to fix the 'MSVCR140.dll Not Found' error, users often fall into common traps that can worsen the problem or expose their system to risks:

*   **Downloading DLLs from Unofficial Websites:** Never download individual DLL files from websites claiming to provide them for free. These sites are often unreliable, and the downloaded files can be outdated, corrupted, or even laced with malware, leading to further system instability or security breaches. Always use official Microsoft redistributable packages.
*   **Only Installing the x64 Version:** On a 64-bit Windows system, it's a common misconception that only the x64 (64-bit) version of the Visual C++ Redistributable is needed. However, many applications are still compiled as 32-bit and require the x86 (32-bit) version to run. Always install both.
*   **Not Running Installers as Administrator:** Failing to run the Visual C++ Redistributable installers (or the software installer itself) with administrator privileges can lead to incomplete installations or permission issues, preventing the DLL files from being correctly placed or registered.
*   **Ignoring the Specific Version:** While `MSVCR140.dll` specifically points to the Visual C++ 2015-2022 Redistributable, some users might mistakenly try to install older or different versions, which will not resolve the problem. Ensure you're getting the correct package.

### Prevention Tips

Preventing the 'MSVCR140.dll Not Found' error and similar dependency issues involves good system maintenance and safe software practices:

*   **Keep Windows Updated:** Regularly check for and install Windows Updates. These updates often include important system libraries, security patches, and runtime components that prevent compatibility issues and keep your system healthy.
*   **Install Essential Runtimes Proactively:** After a fresh Windows installation, or if you frequently install new software, consider proactively installing the latest Microsoft Visual C++ Redistributable Packages (both x86 and x64 for Visual Studio 2015-2022 and potentially older versions like 2013 if needed for very old software). This creates a solid foundation for most applications.
*   **Download Software from Official Sources:** Always obtain software installers from the developer's official website or trusted platforms. This minimizes the risk of downloading modified or incomplete packages that might lack necessary dependencies or include unwanted malware.
*   **Use a Reliable Antivirus:** Keep your antivirus software updated and perform regular scans. A good antivirus can protect against malware that might corrupt or delete legitimate system files, including DLLs, and can help prevent false positives by properly identifying safe files.
*   **Avoid Manual DLL File Manipulation:** Unless you are an expert and know exactly what you're doing, never manually delete, move, or modify DLL files found in system folders (like `C:\Windows\System32` or `C:\Windows\SysWOW64`). This can lead to system instability and errors for multiple applications.