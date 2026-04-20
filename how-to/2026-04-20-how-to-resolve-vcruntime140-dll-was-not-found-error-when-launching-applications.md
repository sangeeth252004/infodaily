---
title: "How to Resolve 'VCRUNTIME140.dll Was Not Found' Error When Launching Applications"
date: "2026-04-20T07:15:28.605Z"
slug: "how-to-resolve-vcruntime140-dll-was-not-found-error-when-launching-applications"
type: "how-to"
description: "Learn how to fix the common 'VCRUNTIME140.dll was not found' error in Windows, preventing applications from launching. This guide provides clear steps, explanations, and prevention tips."
keywords: "VCRUNTIME140.dll, DLL error, Windows error, application launch failed, Visual C++ Redistributable, fix DLL missing, runtime error"
---

## Problem Explanation

Users encountering the "VCRUNTIME140.dll was not found" error are unable to launch specific applications on their Windows computers. This error typically manifests as a pop-up dialog box, often displaying a message similar to:

"The program can't start because VCRUNTIME140.dll is missing from your computer. Try reinstalling the program to fix this problem."

This error message signifies that a critical system file, VCRUNTIME140.dll, which is part of the Microsoft Visual C++ runtime libraries, is either absent, corrupted, or inaccessible to the application attempting to launch. Consequently, the application cannot find the necessary components it needs to execute, leading to its immediate failure to start. This can be particularly frustrating as it prevents access to desired software, whether it's a game, a productivity tool, or another application.

## Why It Happens

The VCRUNTIME140.dll file is a dynamic-link library (DLL) that is part of the Microsoft Visual C++ Redistributable package. These redistributable packages contain runtime components that are essential for many modern applications developed using Microsoft's Visual C++ development tools. Applications that are compiled using newer versions of Visual C++ rely on these DLLs to function correctly.

This error occurs when the specific version of the Visual C++ Redistributable package that the application requires is either not installed on your system, is an older version that lacks the necessary VCRUNTIME140.dll file, or has become corrupted. Sometimes, the installation of a new application might overwrite or interfere with existing redistributable packages, leading to this missing file scenario. It's also possible that a system update or another software installation could inadvertently remove or damage the file.

## Step-by-Step Solution

The most common and effective solution for the "VCRUNTIME140.dll was not found" error is to install or repair the Microsoft Visual C++ Redistributable package. Since VCRUNTIME140.dll is part of the Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022, you need to download and install the appropriate version.

### Step 1: Identify the Correct Version to Download

Applications typically specify which version of the Visual C++ Redistributable they require. While you might not always know this explicitly, the VCRUNTIME140.dll file is associated with the *Visual C++ Redistributable for Visual Studio 2015-2022*. This is the primary package you should focus on. It's important to download both the x86 (32-bit) and x64 (64-bit) versions, as some applications might be 32-bit even on a 64-bit operating system, or vice-versa.

### Step 2: Download the Visual C++ Redistributable Package

Navigate to the official Microsoft download page for the latest supported Visual C++ Redistributable downloads. Search online for "Visual C++ Redistributable latest supported downloads" and select the official Microsoft link.

On the download page, look for the section labeled "Visual Studio 2015, 2017, 2019, and 2022." You will find download links for both the **x86: vc_redist.x86.exe** and **x64: vc_redist.x64.exe** installers.

### Step 3: Install the x86 Version

First, download the `vc_redist.x86.exe` file. Once downloaded, run the executable. You will be presented with a license agreement; read and accept it. Then, click "Install."

Follow the on-screen prompts to complete the installation. If the package is already installed, the installer might offer a "Repair" option. In this case, selecting "Repair" is a good alternative to a fresh installation.

### Step 4: Install the x64 Version

After installing the x86 version, download the `vc_redist.x64.exe` file. Run this installer as well. Again, accept the license agreement and click "Install."

Similar to the x86 installer, if the x64 package is already present, you may see a "Repair" option. Choose to repair if available.

### Step 5: Restart Your Computer

After successfully installing both the x86 and x64 versions of the Visual C++ Redistributable, it is crucial to restart your computer. This ensures that all system processes recognize the newly installed or repaired runtime components and that any pending changes are properly applied.

### Step 6: Relaunch the Application

Once your computer has restarted, attempt to launch the application that was previously giving you the "VCRUNTIME140.dll was not found" error. The issue should now be resolved, and the application should launch without the DLL error.

### Step 7: If the Issue Persists, Reinstall the Application

If, after following the steps above, the error persists, there might be a deeper issue with the application's installation itself. In this scenario, you should uninstall the problematic application completely from your system. Then, download a fresh installer for the application and reinstall it. This ensures that all of the application's files, including its dependencies, are correctly placed.

## Common Mistakes

A frequent mistake users make is attempting to manually copy the VCRUNTIME140.dll file from another computer or the internet into their System32 folder. While this might seem like a quick fix, it's generally **not recommended**. DLLs are often version-specific, and copying a file from an incompatible source can lead to further system instability, different error messages, or security vulnerabilities. Relying on official Microsoft installers ensures you get the correct, verified version of the runtime libraries. Another common oversight is not installing *both* the x86 and x64 versions of the redistributable package, which can lead to the same error if the application requires a different architecture than what was installed.

## Prevention Tips

To prevent the "VCRUNTIME140.dll was not found" error and similar DLL-related issues in the future, maintain a proactive approach to your system's health. Ensure that your Windows operating system is regularly updated. Microsoft often bundles updated runtime libraries with Windows updates, which can help keep your system's components current. Additionally, be cautious when installing software from untrusted sources, as these applications might not properly install or manage their dependencies, potentially leading to conflicts or missing files. Keeping your essential system components, like the Visual C++ Redistributable packages, up-to-date by periodically checking the Microsoft download page for new versions can also be a good preventive measure, although typically the latest version installed will cover most needs for many years.