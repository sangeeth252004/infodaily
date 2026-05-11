---
title: "How to Resolve 'Windows Update Service Not Running' Error 0x80070422 in Windows 10/11"
date: "2026-05-11T08:23:29.673Z"
slug: "how-to-resolve-windows-update-service-not-running-error-0x80070422-in-windows-10-11"
type: "how-to"
description: "Encountering Windows Update error 0x80070422? Learn how to fix the 'Windows Update Service Not Running' issue with this comprehensive, step-by-step guide."
keywords: "Windows Update, error 0x80070422, service not running, Windows 10, Windows 11, fix, troubleshoot, Windows Update issues"
---

## Problem Explanation

Are you trying to update your Windows operating system, download new features, or install crucial security patches, only to be met with an error message? A common and frustrating roadblock is the **error code 0x80070422**. This error typically appears with a message indicating that the Windows Update service is not running or cannot be started. You might see something like: "There were problems installing some updates, but we'll try again later. If you're still getting this and want to search for the latest, here's how: [Link to Windows Update] Error code: 0x80070422". This prevents your system from connecting to Microsoft's update servers, leaving you vulnerable and unable to benefit from the latest software enhancements.

This issue essentially stops the Windows Update service in its tracks, preventing any communication with the update servers. Without this service functioning correctly, your computer cannot download or install any updates, leaving your system exposed to potential security risks and missing out on performance improvements or new functionalities. It's a critical service that needs to be active for your Windows experience to remain smooth and secure.

## Why It Happens

The primary reason for error 0x80070422 is that the **Windows Update service itself is not running or has been disabled**. This service is configured to start automatically when Windows boots up. However, various factors can lead to it becoming disabled or failing to start. These include conflicts with third-party software (especially antivirus programs or system optimizers that might incorrectly flag the service as unnecessary), corrupted system files, or incorrect configuration settings that might have been altered by the user or another application. Sometimes, a previous failed update process can also leave the service in a broken state.

In essence, the error is a direct consequence of the Windows Update service being unavailable. Think of it like trying to order something online without your internet connection being active – the store (Microsoft's update servers) is there, but your computer can't reach it because the necessary channel (the Windows Update service) is down. Troubleshooting this error usually involves ensuring this crucial service is running, set to start automatically, and free from any interfering processes.

## Step-by-Step Solution

Let's systematically get your Windows Update service back on its feet and resolve error 0x80070422.

### ## Step 1: Check and Restart the Windows Update Service

This is the most direct approach. We need to ensure the service is enabled and running.

1.  Press the **Windows key + R** on your keyboard to open the Run dialog box.
2.  Type `services.msc` and press **Enter** or click **OK**. This will open the Services window.
3.  In the Services window, scroll down to find **Windows Update**.
4.  Check the **Status** column for Windows Update. If it says "Running," right-click on it and select **Restart**. If it's blank or says anything else, right-click on it and select **Start**.
5.  Now, right-click on **Windows Update** again and select **Properties**.
6.  In the Properties window, click on the **Startup type** dropdown menu.
7.  Select **Automatic**.
8.  Click **Apply**, then **OK**.
9.  Try running Windows Update again.

### ## Step 2: Check Dependent Services

The Windows Update service relies on other services to function correctly. If these dependent services are not running, Windows Update might fail.

1.  Open the Services window as described in Step 1 (`services.msc`).
2.  Locate **Windows Update** and open its **Properties** (right-click > Properties).
3.  Go to the **Dependencies** tab.
4.  You'll see two sections: "This service depends on the following system components" and "The following system components depend on this service."
5.  For the components listed under the first section, you need to ensure they are running. The most critical ones are **Background Intelligent Transfer Service (BITS)** and **Cryptographic Services**.
6.  Go back to the main Services list. Find **Background Intelligent Transfer Service (BITS)** and ensure its **Startup type** is set to **Automatic** and its **Status** is **Running**. If not, adjust it like you did for Windows Update.
7.  Similarly, find **Cryptographic Services**, ensure its **Startup type** is **Automatic**, and its **Status** is **Running**. Restart these services if they are already running but you suspect issues.

### ## Step 3: Run the Windows Update Troubleshooter

Microsoft provides built-in troubleshooters designed to automatically detect and fix common Windows issues, including update problems.

1.  **For Windows 11:**
    *   Go to **Settings** > **System** > **Troubleshoot** > **Other troubleshooters**.
    *   Click **Run** next to **Windows Update**.
2.  **For Windows 10:**
    *   Go to **Settings** > **Update & Security** > **Troubleshoot**.
    *   Click **Additional troubleshooters**.
    *   Click **Windows Update** and then **Run the troubleshooter**.
3.  Follow the on-screen prompts. The troubleshooter will scan for problems and attempt to fix them automatically. It may restart services or reset certain settings.

### ## Step 4: Scan for Corrupted System Files

Corrupted system files can interfere with the proper functioning of various Windows services. Running the System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can help repair these.

1.  Open **Command Prompt** as an administrator. To do this, search for "cmd" in the Start menu, right-click on "Command Prompt," and select "Run as administrator."
2.  In the Command Prompt window, type the following command and press **Enter**:
    `sfc /scannow`
3.  Wait for the scan to complete. This process can take some time. SFC will scan for and attempt to repair corrupted system files.
4.  Once SFC is finished, it's recommended to run DISM to ensure the component store is healthy. Type the following commands, pressing **Enter** after each one:
    `DISM /Online /Cleanup-Image /CheckHealth`
    `DISM /Online /Cleanup-Image /ScanHealth`
    `DISM /Online /Cleanup-Image /RestoreHealth`
5.  After these commands complete, restart your computer and try running Windows Update again.

### ## Step 5: Reset Windows Update Components

If the above steps don't resolve the issue, you might need to manually reset the Windows Update components. This involves stopping the Windows Update service and related services, renaming the SoftwareDistribution and catroot2 folders (where Windows Update stores downloaded files and information), and then restarting the services.

1.  Open **Command Prompt** as an administrator (as described in Step 4).
2.  To stop the necessary services, type the following commands, pressing **Enter** after each:
    `net stop wuauserv`
    `net stop cryptSvc`
    `net stop bits`
    `net stop msiserver`
3.  Now, rename the SoftwareDistribution and catroot2 folders. Type these commands and press **Enter** after each:
    `ren C:\Windows\SoftwareDistribution SoftwareDistribution.old`
    `ren C:\Windows\System32\catroot2 catroot2.old`
4.  Finally, restart the services. Type these commands and press **Enter** after each:
    `net start wuauserv`
    `net start cryptSvc`
    `net start bits`
    `net start msiserver`
5.  Close the Command Prompt and restart your computer. Then, attempt to check for updates.

### ## Step 6: Check for Third-Party Software Interference

Aggressive antivirus programs or system optimization tools can sometimes interfere with essential Windows services. Temporarily disabling your antivirus software or closing any system optimization utilities can help determine if they are the cause.

1.  **Temporarily disable your antivirus software.** The exact method varies by program, but usually, there's an option in the system tray or the program's main interface to disable real-time protection.
2.  **Close any system optimization or cleaning tools** you might be running.
3.  Attempt to run Windows Update.
4.  **Remember to re-enable your antivirus software immediately afterward**, regardless of whether it solved the problem. If disabling the software allowed updates to run, you'll need to configure your antivirus or optimization tool to exclude the Windows Update service or its related folders.

## Common Mistakes

One common mistake users make is jumping straight to more complex solutions without first performing the basic checks. Forgetting to restart the computer after making changes to services or system files is another frequent oversight that can lead to the problem persisting. Additionally, users might incorrectly try to start the Windows Update service manually through the registry editor, which can cause more harm than good if not done precisely. Running commands in Command Prompt without administrator privileges will also result in errors. Finally, not re-enabling antivirus software after testing can leave your system vulnerable.

## Prevention Tips

To prevent the "Windows Update Service Not Running" error from recurring, it's wise to maintain a healthy system. Regularly run the Windows Update troubleshooter (as outlined in Step 3) proactively, perhaps once a month. Ensure your antivirus software is up-to-date and configured to be compatible with Windows updates – consult your antivirus provider's documentation if unsure. Avoid using third-party system optimization or registry cleaner tools unless you are very experienced, as they can inadvertently disable or corrupt critical Windows services. Keeping your Windows system files clean by periodically running `sfc /scannow` and DISM can also help maintain stability. Finally, always ensure you have sufficient disk space, as insufficient space can sometimes lead to failed update installations and subsequent service issues.