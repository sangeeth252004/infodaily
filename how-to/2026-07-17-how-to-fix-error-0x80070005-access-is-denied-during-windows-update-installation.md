---
title: "How to Fix \"Error 0x80070005: Access is Denied\" During Windows Update Installation"
date: "2026-07-17T02:30:34.395Z"
slug: "how-to-fix-error-0x80070005-access-is-denied-during-windows-update-installation"
type: "how-to"
description: "Resolve the frustrating \"Error 0x80070005: Access is Denied\" when installing Windows Updates with this comprehensive, step-by-step guide."
keywords: "Windows Update error 0x80070005, access denied, fix update, Windows installation error, troubleshoot update"
---

## Problem Explanation

Encountering error code **0x80070005** during a Windows Update installation can be a significant roadblock to keeping your system secure and up-to-date. This error typically appears as a message stating something like: "There were problems installing some updates, but we let you know because this update is important. Here's what to do: [Error code: 0x80070005]". When this happens, the Windows Update service is unable to complete the download or installation of critical system files or patches. This means your computer might be missing out on important security fixes, performance enhancements, or new features. The process halts abruptly, leaving you with an incomplete update and a nagging sense of unease about your system's security posture.

## Why It Happens

The "Access is Denied" error, code 0x80070005, fundamentally means that the Windows Update service or the components it's trying to access don't have the necessary permissions to perform their tasks. This can stem from a variety of underlying causes. Most commonly, it's due to file system permissions being incorrect on critical Windows system folders, especially those related to the Windows Update service itself. Antivirus software or other third-party security applications can sometimes interfere with the update process by mistakenly flagging system files as malicious and blocking access. Corrupted system files or a damaged Windows Update component can also lead to this permission issue. In rarer cases, issues with user account control (UAC) settings or even malware could be the culprit.

## Step-by-Step Solution

This section outlines a series of troubleshooting steps to resolve the "Error 0x80070005: Access is Denied" during Windows Update installation. It's recommended to follow these steps in order, as they progressively address more common and complex causes.

### ## Step 1: Run the Windows Update Troubleshooter

Windows has a built-in troubleshooter designed to automatically detect and fix common problems with the Windows Update service. This is the simplest first step and can often resolve the issue.

1.  Navigate to **Settings** (you can press `Windows key + I`).
2.  Click on **Update & Security** (or **System** > **Troubleshoot** on Windows 11).
3.  Select **Troubleshoot** from the left-hand menu.
4.  Click on **Additional troubleshooters**.
5.  Find and click on **Windows Update**.
6.  Click **Run the troubleshooter**.
7.  Follow any on-screen prompts. The troubleshooter will scan for issues and attempt to fix them automatically.

### ## Step 2: Check Folder Permissions for Windows Update Components

Incorrect permissions on the SoftwareDistribution and Catroot2 folders are a very common cause of this error. These folders are crucial for storing downloaded update files and the digital signatures of updates.

1.  Open **Command Prompt as Administrator**. To do this, search for "cmd" in the Start menu, right-click on "Command Prompt," and select "Run as administrator."
2.  Stop the Windows Update service by typing the following command and pressing Enter:
    ```
    net stop wuauserv
    ```
3.  Stop the Cryptographic service by typing the following command and pressing Enter:
    ```
    net stop cryptSvc
    ```
4.  Stop the Bits service by typing the following command and pressing Enter:
    ```
    net stop bits
    ```
5.  Stop the TrustedInstaller service by typing the following command and pressing Enter:
    ```
    net stop trustedinstaller
    ```
6.  Now, you need to grant full control permissions to the SYSTEM account for these folders. First, navigate to `C:\Windows`.
7.  Locate the **SoftwareDistribution** folder. Right-click on it and select **Properties**.
8.  Go to the **Security** tab and click **Edit**.
9.  In the new window, click **Add...**.
10. In the "Enter the object names to select" field, type `SYSTEM` and click **Check Names**, then click **OK**.
11. Select **SYSTEM** from the list of "Group or user names."
12. Ensure that **Full control** is checked under "Allow" permissions. Click **Apply** and then **OK**.
13. Repeat steps 7-12 for the **Catroot2** folder, which is also located in `C:\Windows`. If Catroot2 is not visible, it might be a hidden folder, or you may need to enable "Show hidden files, folders, and drives" in Folder Options.
14. After setting permissions, restart the services you stopped:
    ```
    net start wuauserv
    net start cryptSvc
    net start bits
    net start trustedinstaller
    ```
15. Restart your computer and try running Windows Update again.

### ## Step 3: Temporarily Disable Antivirus Software

Your antivirus program might be aggressively scanning or blocking access to files that Windows Update needs. Temporarily disabling it can help determine if it's the cause.

1.  Locate your antivirus icon in the system tray (usually near the clock).
2.  Right-click on the antivirus icon.
3.  Look for an option to "Disable," "Turn off," or "Exit." Select the option that will disable real-time protection for a short period. The exact wording will vary depending on your antivirus software.
4.  **Important:** Remember to re-enable your antivirus immediately after checking if Windows Update works. You can also try to add an exception for the Windows Update service or the relevant folders in your antivirus settings.

### ## Step 4: Clean Boot Your System

A clean boot starts Windows with a minimal set of drivers and startup programs, helping to eliminate software conflicts.

1.  Press `Windows key + R` to open the Run dialog.
2.  Type `msconfig` and press Enter to open **System Configuration**.
3.  Go to the **Services** tab.
4.  Check the box that says **Hide all Microsoft services**.
5.  Click **Disable all**.
6.  Go to the **Startup** tab.
7.  Click **Open Task Manager**.
8.  For each startup item, select it and click **Disable**.
9.  Close Task Manager.
10. Click **OK** in the System Configuration window and then **Restart** your computer.
11. After the computer restarts, try running Windows Update.
12. **Crucially, remember to re-enable all services and startup items** by reversing these steps (unchecking "Hide all Microsoft services," and re-enabling services and startup items in Task Manager) once you're done troubleshooting.

### ## Step 5: Reset Windows Update Components Manually

If the troubleshooter and permission fixes didn't work, you might need to manually reset the Windows Update components. This involves stopping services, renaming specific folders, and then restarting the services.

1.  Open **Command Prompt as Administrator** (as described in Step 2).
2.  Stop the necessary services:
    ```
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the SoftwareDistribution and Catroot2 folders. This effectively forces Windows to create new, clean versions of these folders.
    ```
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
4.  Restart the services:
    ```
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close the Command Prompt.
6.  Restart your computer and try running Windows Update again.

### ## Step 6: Run System File Checker (SFC) and DISM

Corrupted system files can prevent updates from installing correctly. SFC and DISM are powerful tools to scan for and repair these files.

1.  Open **Command Prompt as Administrator**.
2.  Run the System File Checker tool. Type the following command and press Enter:
    ```
    sfc /scannow
    ```
    This process can take some time. Wait for it to complete.
3.  If SFC finds and repairs errors, restart your computer and try Windows Update. If it finds errors but cannot fix them, or if the problem persists, proceed to run DISM.
4.  Run the Deployment Image Servicing and Management (DISM) tool. Type the following commands one by one and press Enter after each:
    ```
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    The `RestoreHealth` command may take a while and will attempt to repair any found issues.
5.  Once DISM completes, restart your computer and try running Windows Update.

### ## Step 7: Check for Updates Manually via Microsoft Update Catalog

If all else fails, you can try to download and install the problematic update manually from the Microsoft Update Catalog. This bypasses the Windows Update service entirely.

1.  Identify the exact update that is failing. You can usually find this in the Update History within Windows Update settings. Note the KB number (e.g., KB5000000).
2.  Go to the [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/).
3.  Search for the KB number of the update you want to install.
4.  Download the correct version for your Windows operating system (e.g., Windows 10 64-bit).
5.  Run the downloaded `.msu` file to install the update.

## Common Mistakes

One of the most common mistakes users make is rushing through the steps without ensuring they are running commands or accessing settings with administrator privileges. Without administrator rights, many of these fixes simply won't have the necessary permissions to make changes. Another frequent oversight is forgetting to re-enable antivirus software or startup services after completing the troubleshooting steps. Leaving these disabled can leave your system vulnerable. Users also sometimes skip the built-in troubleshooter, which is often the quickest and easiest way to resolve simpler permission or service-related issues. Lastly, not restarting the computer after making changes can prevent those changes from taking effect, leading to continued frustration.

## Prevention Tips

To prevent the "Error 0x80070005: Access is Denied" from reappearing, maintaining proper system hygiene is key. Regularly running the Windows Update Troubleshooter, even when you're not experiencing issues, can catch potential problems early. Ensure your antivirus software is always up-to-date and configured to allow legitimate Windows processes. Avoid installing too many third-party system optimization or cleaning tools, as these can sometimes interfere with Windows' core services and permissions. Keeping your user account control (UAC) settings at a reasonable level (not disabling it entirely) is also beneficial. Finally, performing regular system file checks using `sfc /scannow` can help ensure the integrity of your Windows installation and proactively prevent file corruption that could lead to update errors.