---
title: "How to Fix \"Windows Update Service Not Running\" Error in Windows 10"
date: "2026-09-18T09:23:18.715Z"
slug: "how-to-fix-windows-update-service-not-running-error-in-windows-10"
type: "how-to"
description: "Resolve the \"Windows Update Service Not Running\" error in Windows 10 with this comprehensive, step-by-step technical guide. Learn the causes and effective solutions."
keywords: "Windows Update, Service Not Running, Windows 10, Error Fix, Troubleshooting, Computer Help, Tech Support"
---

# How to Fix "Windows Update Service Not Running" Error in Windows 10

Encountering issues with Windows Update can be frustrating, especially when the service responsible for delivering crucial security patches and feature enhancements fails to launch. A common manifestation of this problem is the "Windows Update Service Not Running" error. When this occurs, users might observe that Windows Update attempts to check for updates but gets stuck in a loop or displays an error message indicating that the service cannot be started or is not running. This prevents Windows from downloading and installing necessary updates, leaving your system vulnerable.

## Problem Explanation

The core of this issue lies with the Windows Update service itself, a background process essential for managing the update mechanism within Windows 10. When this service is not running, Windows Update cannot communicate with Microsoft's servers to check for, download, or install new software. This can manifest in several ways: the Windows Update troubleshooter might report that the service is stopped, or attempts to manually start it may fail. You might see specific error codes related to the service not responding or being inaccessible. Consequently, you're unable to update your operating system, which is a critical component of maintaining your computer's security and performance.

## Why It Happens

The "Windows Update Service Not Running" error can stem from various underlying causes. Often, it's due to corrupted system files that the Windows Update service relies on. These corruptions can occur due to incomplete or interrupted updates, malware infections, or improper system shutdowns. Another frequent culprit is a conflict with third-party software, such as antivirus programs or system optimization tools, that may inadvertently interfere with the Windows Update service's operation. Additionally, essential services that the Windows Update service depends on might also be stopped or misconfigured, preventing it from starting. In some cases, a simple glitch or temporary issue can cause the service to stop unexpectedly.

## Step-by-Step Solution

This section provides a comprehensive set of steps to diagnose and resolve the "Windows Update Service Not Running" error. It's recommended to follow these steps sequentially, as they progress from simpler checks to more involved troubleshooting.

## Step 1: Restart the Windows Update Service and its Dependencies

The most straightforward approach is to restart the Windows Update service and any services it depends on.

1.  Press **Windows Key + R** to open the Run dialog box.
2.  Type `services.msc` and press **Enter** or click **OK**. This will open the Services window.
3.  In the Services window, scroll down and locate the **Windows Update** service.
4.  Right-click on **Windows Update** and select **Properties**.
5.  Under the "General" tab, ensure that the "Startup type" is set to **Automatic**. If it's not, click the dropdown menu and select **Automatic**.
6.  If the "Service status" shows "Stopped," click the **Start** button.
7.  Click **Apply** and then **OK**.
8.  Now, repeat steps 3-7 for the following dependent services:
    *   **Background Intelligent Transfer Service (BITS)**
    *   **Cryptographic Services**
    *   **Windows Installer**
9.  After ensuring all these services are running and set to Automatic, try running Windows Update again.

## Step 2: Run the Windows Update Troubleshooter

Microsoft provides a built-in troubleshooter designed to automatically detect and fix common Windows Update problems.

1.  Open **Settings** by pressing **Windows Key + I**.
2.  Click on **Update & Security**.
3.  In the left-hand pane, select **Troubleshoot**.
4.  Click on **Additional troubleshooters**.
5.  Find and click on **Windows Update**.
6.  Click **Run the troubleshooter**.
7.  Follow the on-screen prompts. The troubleshooter will scan for issues and attempt to resolve them automatically.

## Step 3: Use the System File Checker (SFC) and Deployment Image Servicing and Management (DISM) Tools

Corrupted system files can prevent the Windows Update service from functioning correctly. SFC and DISM can scan for and repair these files.

1.  Open **Command Prompt as Administrator**. To do this, type `cmd` in the Windows search bar, right-click on **Command Prompt**, and select **Run as administrator**.
2.  In the Command Prompt window, type the following command and press **Enter**:
    `sfc /scannow`
    This process can take some time.
3.  Once SFC has completed, type the following commands one by one, pressing **Enter** after each:
    `DISM /Online /Cleanup-Image /ScanHealth`
    `DISM /Online /Cleanup-Image /CheckHealth`
    `DISM /Online /Cleanup-Image /RestoreHealth`
    These DISM commands will attempt to repair the Windows image.
4.  After all commands have finished, restart your computer and check if Windows Update is working.

## Step 4: Reset the Windows Update Components

If the above steps don't resolve the issue, resetting the Windows Update components can sometimes fix persistent problems by re-registering DLL files and resetting the update folders.

1.  Open **Command Prompt as Administrator** (as described in Step 3).
2.  Execute the following commands, pressing **Enter** after each one:
    ```cmd
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
    These commands stop the services involved in Windows Update.
3.  Now, rename the SoftwareDistribution and catroot2 folders. Type the following commands and press **Enter** after each:
    ```cmd
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
    These commands effectively clear the Windows Update cache.
4.  Finally, restart the services. Type the following commands and press **Enter** after each:
    ```cmd
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Restart your computer and try Windows Update again.

## Step 5: Check for Malware

Malware can interfere with Windows services, including Windows Update. Running a full system scan with your antivirus software is crucial.

1.  Ensure your antivirus software is up-to-date.
2.  Perform a full system scan. Most antivirus programs offer a "Full Scan" or "Deep Scan" option.
3.  If any threats are detected, follow the antivirus software's instructions to remove them.
4.  After removing malware, restart your computer and try running Windows Update.

## Step 6: Clean Boot

A clean boot starts Windows with a minimal set of drivers and startup programs, helping to identify if a background program is interfering with the Windows Update service.

1.  Press **Windows Key + R**, type `msconfig`, and press **Enter**.
2.  In the System Configuration window, go to the **Services** tab.
3.  Check the box that says **Hide all Microsoft services**.
4.  Click **Disable all**.
5.  Go to the **Startup** tab and click **Open Task Manager**.
6.  In Task Manager, right-click on each startup item and select **Disable**.
7.  Close Task Manager and click **OK** in the System Configuration window.
8.  Restart your computer.
9.  Once Windows has started in a clean boot state, try running Windows Update. If it works, you can re-enable services and startup items incrementally to find the culprit.

## Common Mistakes

A common pitfall is attempting to start the Windows Update service manually from the Services console without first ensuring its startup type is set to Automatic. If the startup type is Disabled or Manual, clicking "Start" might only be a temporary fix or might fail altogether if its dependencies aren't met. Another mistake is neglecting to restart the computer after making changes to services or running system tools like SFC and DISM. These actions often require a system reboot to take full effect. Users also sometimes forget to run Command Prompt or PowerShell as an administrator when executing critical system commands, which will lead to permission errors and the commands failing.

## Prevention Tips

To prevent the "Windows Update Service Not Running" error from occurring in the future, maintain regular system maintenance. This includes keeping your antivirus software updated and performing regular scans to detect and remove potential malware that could disrupt services. Ensure that Windows is allowed to complete its updates without abrupt shutdowns; always use the "Shut down" or "Restart" options from the Start menu. Consider disabling aggressive third-party cleanup or optimization tools that might interfere with system services, or at least ensure they are configured to exclude critical Windows processes. Keeping your Windows 10 installation up-to-date with its own updates is paramount, as many issues are resolved in subsequent patches.