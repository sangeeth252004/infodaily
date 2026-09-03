---
title: "How to Fix 'VCRUNTIME140.dll Not Found' Error When Launching Applications in Windows"
date: "2026-09-03T22:21:37.399Z"
slug: "how-to-fix-vcruntime140-dll-not-found-error-when-launching-applications-in-windows"
type: "how-to"
description: "Resolve the 'VCRUNTIME140.dll Not Found' error on Windows by understanding its causes and following a comprehensive step-by-step guide."
keywords: "VCRUNTIME140.dll, Windows error, DLL not found, Visual C++ Redistributable, application error, software fix"
---

## Problem Explanation

When attempting to launch certain applications on Windows, users may encounter an error message stating: "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem." This error prevents the application from running, leaving the user unable to access or utilize the software they intend to use. The message is direct and suggests a common, though often incomplete, solution. This issue can manifest for various programs, from games to productivity software, indicating a dependency problem rather than a fault within the application itself.

The absence of VCRUNTIME140.dll signifies that a critical component required by the application is not present on the system. This DLL file is part of the Microsoft Visual C++ Redistributable package, a collection of system libraries that many Windows applications rely on for core functionalities. Without these libraries, applications that link to them cannot execute, leading to the prominent "not found" error. The experience is frustrating as it blocks access to essential tools and can occur without any apparent user action or prior system changes.

## Why It Happens

The VCRUNTIME140.dll error typically arises because the Microsoft Visual C++ Redistributable package, which includes this specific DLL file, is either not installed on the user's system or is corrupted. Applications developed using Microsoft Visual Studio often require these redistributable packages to function correctly. When an application is installed, it usually attempts to install the necessary redistributable packages. However, this process can fail due to various reasons, including interrupted installations, incomplete downloads, or conflicts with existing software.

Furthermore, the error can occur if the user has uninstalled a different program that provided a version of the Visual C++ Redistributable package, inadvertently removing the dependency for other applications. Conversely, sometimes a specific version of the redistributable is required, and if an incompatible or older version is present, or if critical files within it become damaged, the VCRUNTIME140.dll will appear missing to the applications that need it. This dependency on external libraries makes software installation and maintenance a nuanced process.

## Step-by-Step Solution

### ## Step 1: Download and Install the Latest Microsoft Visual C++ Redistributable Package

The most direct and effective solution is to download and install the correct version of the Microsoft Visual C++ Redistributable package. Since VCRUNTIME140.dll is associated with Visual C++ 2015, 2017, 2019, and 2021, you will need to download the package that supports these versions.

1.  **Navigate to the Official Microsoft Download Center:** Open your web browser and go to the official Microsoft website. Search for "Microsoft Visual C++ Redistributable latest supported downloads."
2.  **Identify the Correct Version:** Look for the section labeled "Visual Studio 2015, 2017, 2019, and 2021." There will be download links for both x86 (32-bit) and x64 (64-bit) versions.
3.  **Determine Your System Architecture:** To know which version to download, you need to know if your Windows operating system is 32-bit or 64-bit.
    *   Right-click on the **Start button**.
    *   Select **System**.
    *   Under "Device specifications," look for **System type**. It will state "64-bit operating system, x64-based processor" or "32-bit operating system, x86-based processor."
4.  **Download the Appropriate Installer:**
    *   If your system is **64-bit**, download both the `vc_redist.x86.exe` (32-bit) and `vc_redist.x64.exe` (64-bit) installers. Most applications will require the 32-bit libraries even on a 64-bit system.
    *   If your system is **32-bit**, download only the `vc_redist.x86.exe` installer.
5.  **Run the Installers:** Locate the downloaded `.exe` files and run them. Accept the license terms and click **Install**. You may be prompted to restart your computer after installation. It is recommended to restart even if not explicitly asked.

### ## Step 2: Repair or Reinstall the Problematic Application

If installing the Visual C++ Redistributable package doesn't immediately resolve the issue, the application itself might have a corrupted installation.

1.  **Access Apps & Features:**
    *   Press the **Windows key + I** to open Settings.
    *   Click on **Apps**, then **Apps & features**.
2.  **Locate the Application:** Scroll through the list to find the application that is giving you the VCRUNTIME140.dll error.
3.  **Repair or Uninstall:**
    *   Click on the application name.
    *   If a **Modify** or **Repair** option is available, click it and follow the on-screen prompts to repair the installation.
    *   If repair is not an option, click **Uninstall**.
4.  **Reinstall the Application:** After uninstalling, restart your computer. Then, download a fresh copy of the application from its official source and reinstall it. Ensure you have the latest version.

### ## Step 3: Check for Windows Updates

Windows updates often include updates to core system components, including the Visual C++ Redistributable packages. Installing pending updates can sometimes resolve compatibility issues.

1.  **Open Windows Update:**
    *   Press the **Windows key + I** to open Settings.
    *   Click on **Update & Security** (or **Windows Update** in Windows 11).
2.  **Check for Updates:** Click **Check for updates**.
3.  **Install Updates:** If any updates are found, download and install them. You may need to restart your computer afterward.

### ## Step 4: Run System File Checker (SFC)

The System File Checker tool can scan for and restore corrupted system files, which might include components of the Visual C++ Redistributable.

1.  **Open Command Prompt as Administrator:**
    *   In the Windows search bar, type `cmd`.
    *   Right-click on **Command Prompt** and select **Run as administrator**.
2.  **Execute the SFC Scan:** In the Command Prompt window, type the following command and press Enter:
    ```bash
    sfc /scannow
    ```
3.  **Wait for Completion:** The scan can take some time. Once it's finished, restart your computer.

### ## Step 5: Scan for Malware

In rare cases, malware can corrupt or delete system files, leading to errors like the VCRUNTIME140.dll issue.

1.  **Use Windows Security:**
    *   Open **Settings** (Windows key + I).
    *   Click on **Update & Security** (or **Privacy & Security** in Windows 11).
    *   Select **Windows Security**.
    *   Click **Virus & threat protection**.
2.  **Run a Full Scan:** Click **Scan options**, then select **Full scan**, and click **Scan now**.
3.  **Remove Threats:** Follow the prompts to remove any detected threats.

## Common Mistakes

A frequent mistake users make is attempting to manually download VCRUNTIME140.dll from unofficial third-party websites. These sites often bundle malware, viruses, or outdated/incorrect versions of DLL files, which can exacerbate the problem, introduce new security vulnerabilities, or cause further system instability. It's crucial to always obtain system files and redistributable packages directly from Microsoft's official download center. Another common error is only installing the x64 version of the Visual C++ Redistributable on a 64-bit system, forgetting that many applications, especially older ones or those designed for broader compatibility, still require the x86 (32-bit) libraries to function.

Users also sometimes overlook the possibility that the application itself is the source of the issue. Instead of focusing solely on the DLL, they might not consider repairing or reinstalling the program that is failing to launch. This can be a simpler and quicker solution if the core problem lies within the application's installation integrity rather than a system-wide missing component. Finally, forgetting to restart the computer after installing the redistributable packages is a missed step that can prevent the fix from taking effect.

## Prevention Tips

To prevent the VCRUNTIME140.dll not found error in the future, maintain an updated Windows operating system. Regular Windows updates often include the latest versions of essential system components, including the Visual C++ Redistributable packages, ensuring that your system has the necessary libraries for modern applications. Always download and install software from trusted, official sources. This reduces the risk of encountering installation errors or installing incompatible versions of required software packages.

When uninstalling applications, be mindful that some may have installed system dependencies. If you encounter issues after uninstalling a program, consider reinstalling the Visual C++ Redistributable packages, especially if you suspect the uninstalled program might have removed shared libraries. Periodically running a system file checker scan (`sfc /scannow`) can also help identify and repair corrupted system files before they lead to specific DLL errors. This proactive approach to system maintenance can save significant troubleshooting time down the line.