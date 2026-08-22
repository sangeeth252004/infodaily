---
title: "How to Fix \"The program can't start because VCRUNTIME140.dll is missing from your computer\" Error in Windows"
date: "2026-08-22T05:24:53.488Z"
slug: "how-to-fix-the-program-can-t-start-because-vcruntime140-dll-is-missing-from-your-computer-error-in-windows"
type: "how-to"
description: "Resolve the VCRUNTIME140.dll missing error in Windows by following this comprehensive technical guide. Learn the causes and effective solutions."
keywords: "VCRUNTIME140.dll, missing dll, windows error, program error, visual c++ runtime, fix dll, error code, application error"
---

# How to Fix "The program can't start because VCRUNTIME140.dll is missing from your computer" Error in Windows

When attempting to launch certain applications on your Windows computer, you might encounter a frustrating error message stating: "The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem." This message typically appears as a pop-up dialog box, often preventing the desired software from opening altogether. The absence of this specific Dynamic Link Library (DLL) file signifies a critical dependency failure for the application you are trying to run.

## Problem Explanation

The error message "The program can't start because VCRUNTIME140.dll is missing from your computer" is a clear indicator that a required system file, `VCRUNTIME140.dll`, is not present in the expected locations on your Windows operating system, or that the existing file is corrupted. This DLL is an integral part of the Microsoft Visual C++ Redistributable package, specifically for Visual Studio 2015, 2017, 2019, and 2022. Many modern applications are built using C++ and rely on these redistributable packages to function correctly. Without `VCRUNTIME140.dll`, the program lacks the necessary runtime components to execute its code, leading to the "program can't start" error.

## Why It Happens

The primary reason for the `VCRUNTIME140.dll` missing error is that the necessary Microsoft Visual C++ Redistributable package has not been installed on your system, or its installation is incomplete or corrupted. This can occur for several reasons:

*   **Fresh Windows Installation:** After installing Windows from scratch, many essential system components and runtime libraries are not present by default and need to be installed separately.
*   **Application Installation Issues:** Some applications might not correctly install or bundle the required Visual C++ Redistributable packages during their own installation process. This can happen due to interrupted installations, incomplete downloads, or conflicts with existing software.
*   **Accidental Deletion or Corruption:** While less common, system files like DLLs can sometimes be accidentally deleted by the user, or they can become corrupted due to disk errors, malware infections, or improper system shutdowns.
*   **Antivirus Interference:** In rare cases, overzealous antivirus software might mistakenly quarantine or delete DLL files, flagging them as potentially malicious.

Essentially, the application you are trying to run has a dependency on the functionality provided by `VCRUNTIME140.dll`, and when that dependency isn't met, the program cannot proceed.

## Step-by-Step Solution

The most reliable method to fix the "VCRUNTIME140.dll is missing" error is to install or repair the Microsoft Visual C++ Redistributable package that contains this file.

### ## Step 1: Identify the Correct Visual C++ Redistributable Version

The `VCRUNTIME140.dll` file is part of the **Microsoft Visual C++ Redistributable for Visual Studio 2015-2022**. It's crucial to download the correct version for your system architecture (32-bit or 64-bit). Most modern Windows installations are 64-bit.

### ## Step 2: Download the Microsoft Visual C++ Redistributable Package

1.  Open a web browser and navigate to the official Microsoft download page for the latest supported Visual C++ Redistributable downloads. Search for "Visual C++ Redistributable latest supported downloads" to find the official Microsoft page.
2.  Locate the section for **Visual Studio 2015, 2017, 2019, and 2022**.
3.  Download the appropriate installer based on your system's architecture. For most users, this will be the **X64** version. If you have a very old 32-bit system, you would download the **X86** version. You can download both if you are unsure or have applications that might require either.

### ## Step 3: Install the Downloaded Package

1.  Locate the downloaded installer file (it will typically have a name like `vc_redist.x64.exe` or `vc_redist.x86.exe`).
2.  Double-click the installer file to run it.
3.  Read and accept the license terms.
4.  Click the **Install** button.
5.  If prompted by User Account Control (UAC), click **Yes** to allow the installation.
6.  Wait for the installation process to complete. You should see a confirmation message indicating that the installation was successful.
7.  If you downloaded both X64 and X86 versions, repeat steps 2-6 for the other installer.

### ## Step 4: Restart Your Computer

After the installation is complete, it is highly recommended to restart your computer. This ensures that all system services and applications recognize the newly installed files and that any cached configurations are refreshed.

### ## Step 5: Test the Application

1.  Once your computer has restarted, try launching the application that was previously giving you the `VCRUNTIME140.dll` error.
2.  The application should now start without the missing DLL error.

### ## Step 6: Consider Reinstalling the Problematic Application (If Necessary)

In some rare instances, even after installing the correct Visual C++ Redistributable package, the application might still fail if its own installation was corrupted or incomplete. If the error persists, try uninstalling and then reinstalling the application that caused the issue. This will ensure that the application's files are properly set up in conjunction with the now-present runtime libraries.

## Common Mistakes

One of the most frequent mistakes users make is downloading DLL files from unofficial third-party websites. While these sites might offer the `VCRUNTIME140.dll` file, they are often untrustworthy and can lead to more significant problems, such as malware infections or the installation of incorrect or outdated DLL versions. Always obtain system files and redistributable packages directly from the official Microsoft website. Another common pitfall is failing to install the correct architecture (X86 vs. X64) for the Visual C++ Redistributable, which can lead to continued errors if the application requires a specific bitness. Lastly, users sometimes forget to restart their computer after installation, which can prevent the system from properly recognizing the new files.

## Prevention Tips

To prevent the "VCRUNTIME140.dll is missing" error and similar DLL-related issues in the future, it's beneficial to follow a few best practices. Regularly update your Windows operating system; Microsoft often includes updated runtime libraries as part of Windows updates. When installing new software, ensure that the installation process completes successfully without any errors. If an application requires specific runtime components, it's often a good idea to manually download and install the latest supported Microsoft Visual C++ Redistributable packages periodically, even if no errors are currently present. This proactive approach ensures that your system has all the necessary building blocks for a wide range of applications. Additionally, maintain a reputable antivirus program and keep it updated, and avoid downloading software from unverified sources.