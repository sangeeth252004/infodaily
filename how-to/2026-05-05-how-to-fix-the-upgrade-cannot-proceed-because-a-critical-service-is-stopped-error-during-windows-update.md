---
title: "How to Fix \"The upgrade cannot proceed because a critical service is stopped\" Error During Windows Update"
date: "2026-05-05T21:01:30.862Z"
slug: "how-to-fix-the-upgrade-cannot-proceed-because-a-critical-service-is-stopped-error-during-windows-update"
type: "how-to"
description: "Resolve the frustrating \"critical service is stopped\" error that prevents Windows updates from completing. This guide provides clear, step-by-step solutions."
keywords: "Windows Update error, critical service stopped, Windows upgrade failed, fix update error, service stopped Windows 10, service stopped Windows 11, Windows troubleshooting"
---

## Problem Explanation

You're trying to update your Windows operating system, whether it's a routine monthly patch or a major feature upgrade, and suddenly the process halts. Instead of a smooth installation, you're greeted with a cryptic error message stating: **"The upgrade cannot proceed because a critical service is stopped."** This message is accompanied by a failure to complete the update, leaving your system potentially vulnerable or missing out on new features and security fixes. This can be a particularly jarring experience, as it disrupts a fundamental process of maintaining your computer's health and functionality. You might see this error at various stages of the update, from the initial download and preparation to the final installation phase.

This error effectively tells you that Windows Update relies on specific background processes, known as services, to function correctly. When one of these essential services isn't running, the update mechanism doesn't have the necessary components to proceed, leading to this roadblock. It's like trying to build a house when the foundation isn't in place – the construction simply can't continue. Understanding which services are critical and how to get them running again is key to resolving this issue.

## Why It Happens

The most common reason for this error is that one or more of the services essential for Windows Update have been accidentally disabled, corrupted, or are otherwise not running. This can happen for several reasons:

*   **Third-Party Software Interference:** Some applications, particularly antivirus programs or system optimization tools, might interfere with the normal operation of Windows services, sometimes disabling them unintentionally.
*   **Malware or Viruses:** Malicious software can actively disable critical Windows services to hinder security updates or to maintain its own clandestine operations.
*   **System File Corruption:** More general issues with your Windows installation, such as corrupted system files, can also lead to services failing to start or remain active.
*   **Manual Disablement:** In some cases, users might have manually disabled services in the past, forgetting to re-enable them, which then impacts future updates.
*   **Windows Update Service Glitches:** Occasionally, the Windows Update service itself or its dependencies might encounter internal errors that prevent them from starting properly.

Essentially, Windows Update is a complex process that depends on a chain of interconnected services. If any link in that chain breaks – meaning a required service stops – the entire update process grinds to a halt, presenting you with this specific error.

## Step-by-Step Solution

Here’s how to troubleshoot and fix the "critical service is stopped" error during Windows Update:

### ## Step 1: Check and Restart Essential Windows Update Services

The first and most direct approach is to ensure the core Windows Update services are running.

1.  Press the **Windows key + R** on your keyboard to open the Run dialog box.
2.  Type `services.msc` and press **Enter** or click **OK**. This will open the Services management console.
3.  In the Services window, locate the following services:
    *   **Windows Update**
    *   **Background Intelligent Transfer Service (BITS)**
    *   **Cryptographic Services**
    *   **Windows Installer**
4.  For each of these services, check the **"Status"** column. If the status is not **"Running"**, right-click on the service and select **"Start"**.
5.  If the service is already running, right-click on it and select **"Restart"**. This can often resolve temporary glitches.
6.  Ensure that the **"Startup Type"** for each of these services is set to **"Automatic"** or **"Automatic (Delayed Start)"**. To change this, double-click on the service, select the desired Startup Type from the dropdown menu, and click **"Apply"** then **"OK"**.
7.  After ensuring all these services are running and configured correctly, try running Windows Update again.

### ## Step 2: Run the Windows Update Troubleshooter

Microsoft provides built-in troubleshooters to help diagnose and fix common Windows issues, including update problems.

1.  Open the **Settings** app by pressing **Windows key + I**.
2.  Navigate to **"Update & Security"** (Windows 10) or **"System"** > **"Troubleshoot"** (Windows 11).
3.  Click on **"Troubleshoot"** or **"Additional troubleshooters"**.
4.  Select **"Windows Update"** from the list of troubleshooters.
5.  Click **"Run the troubleshooter"**.
6.  Follow the on-screen prompts. The troubleshooter will scan for issues, and if it finds any related to the Windows Update services, it will attempt to fix them automatically.
7.  Once the troubleshooter has completed its scan and repair process, restart your computer and attempt to run Windows Update again.

### ## Step 3: Use the System File Checker (SFC) and DISM Tools

Corrupted system files can prevent services from starting. SFC and DISM are powerful command-line tools to scan for and repair these files.

1.  Click the **Start** button, type `cmd`, right-click on **"Command Prompt"**, and select **"Run as administrator"**.
2.  In the administrator Command Prompt window, type the following command and press **Enter**:
    `sfc /scannow`
3.  This command will scan your system for corrupted files and attempt to replace them with cached copies. This process can take some time.
4.  Once SFC has finished, run the following DISM commands, pressing **Enter** after each one:
    `DISM /Online /Cleanup-Image /ScanHealth`
    `DISM /Online /Cleanup-Image /CheckHealth`
    `DISM /Online /Cleanup-Image /RestoreHealth`
5.  These DISM commands will check for and repair Windows image corruption, which can also affect services.
6.  After all commands have completed, restart your computer and try running Windows Update again.

### ## Step 4: Temporarily Disable Third-Party Antivirus Software

Sometimes, overzealous antivirus or firewall software can block Windows Update services from functioning correctly.

1.  Locate your antivirus program in the system tray (usually in the bottom-right corner of your screen, near the clock).
2.  Right-click on the antivirus icon and look for an option to **"Disable," "Pause Protection,"** or **"Exit."** Select an option that will temporarily disable its real-time protection or firewall features. The exact wording varies by antivirus vendor.
3.  **Important:** Remember to re-enable your antivirus protection immediately after you have finished attempting to run Windows Update, regardless of whether the update succeeds or fails.
4.  Attempt to run Windows Update again.

### ## Step 5: Check for and Remove Problematic Software

If you recently installed new software or updated existing programs, they might be the culprits.

1.  Open **Settings** > **"Apps"** > **"Apps & features"**.
2.  Review the list of installed applications. If you see any programs that were installed just before the update issue began, or programs known for system-level changes (like system optimizers, advanced registry cleaners, or some game launchers), consider uninstalling them.
3.  After uninstalling any suspicious software, restart your computer and try running Windows Update.

### ## Step 6: Perform a Clean Boot

A clean boot starts Windows with a minimal set of drivers and startup programs, which helps you identify if a background program is causing the conflict.

1.  Press **Windows key + R**, type `msconfig`, and press **Enter** to open System Configuration.
2.  Go to the **"Services"** tab.
3.  Check the box that says **"Hide all Microsoft services."**
4.  Click **"Disable all."**
5.  Go to the **"Startup"** tab.
6.  Click **"Open Task Manager."**
7.  In Task Manager, for each startup item, right-click and select **"Disable."**
8.  Close Task Manager.
9.  In the System Configuration window, click **"Apply"** and then **"OK."**
10. You will be prompted to restart your computer. Perform the restart.
11. After the computer restarts, attempt to run Windows Update. If the update proceeds without the error, it means one of the disabled services or startup programs was the cause. You can then re-enable them in batches to pinpoint the exact culprit.

## Common Mistakes

One of the most common mistakes users make is forgetting to restart their computer after making changes to services or running troubleshooters. Many of these changes only take effect after a system reboot. Another frequent error is disabling essential Microsoft services when trying to disable third-party ones in the System Configuration; always remember to hide Microsoft services first to avoid this. Additionally, some users might not run the Command Prompt as an administrator when using SFC or DISM, which will prevent these commands from executing properly. Finally, if you disable your antivirus, make absolutely sure to re-enable it afterward to maintain your system's security.

## Prevention Tips

To prevent the "critical service is stopped" error from occurring in the future, it's wise to adopt a few good practices. Keep your Windows operating system and installed applications up to date; timely updates often include fixes for known service-related issues. Avoid using aggressive third-party system optimization tools or registry cleaners, as these can sometimes tamper with critical system services without your knowledge. Regularly run a reputable antivirus and anti-malware scan to ensure your system is free from infections that could disable services. Finally, if you do encounter issues with services, consult reliable guides and be cautious when making manual changes to system configurations. A well-maintained and secure system is less prone to these types of disruptive errors.