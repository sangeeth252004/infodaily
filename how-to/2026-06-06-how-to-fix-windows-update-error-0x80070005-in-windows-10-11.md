---
title: "How to Fix Windows Update Error 0x80070005 in Windows 10/11"
date: "2026-06-06T21:03:23.225Z"
slug: "how-to-fix-windows-update-error-0x80070005-in-windows-10-11"
type: "how-to"
description: "Resolve Windows Update Error 0x80070005 (Access Denied) in Windows 10/11 with this comprehensive, step-by-step guide. Learn to troubleshoot permissions, system files, and update components effectively."
keywords: "Windows Update error 0x80070005, fix 0x80070005, Windows 10 update error, Windows 11 update error, access denied error, Windows Update troubleshooting, system file checker, DISM, reset update components, grant permissions, software distribution folder"
---

### Problem Explanation

Windows Update Error 0x80070005, often accompanied by the message "ACCESS DENIED," signifies a critical permission-related issue preventing Windows from successfully downloading, installing, or configuring updates. When this error occurs, users typically observe that Windows Update attempts to download or install available updates but ultimately fails, reporting the error code 0x80070005 in the update history. This can manifest as an inability to install cumulative updates, security patches, or even feature updates, leaving the system vulnerable and potentially missing out on critical improvements.

Beyond the specific error code in the update history, users may notice that their system repeatedly tries and fails to install the same updates, leading to a cycle of unsuccessful attempts. In some cases, the error can prevent access to other system services or applications if their functionality relies on successfully installed updates. The core symptom is a halt in the update process, regardless of the update's type or size, due to an underlying lack of proper access rights.

### Why It Happens

The root cause of Windows Update Error 0x80070005 is fundamentally a permissions problem. The Windows Update service, or one of its many underlying components, is being denied access to a necessary file, folder, or registry key required to complete the update operation. This "ACCESS DENIED" situation can arise from several factors:

*   **Incorrect File or Registry Permissions:** Essential system folders (like `SoftwareDistribution`, `catroot2`, or `Temp`) or critical registry keys might have their security permissions altered, preventing the System account or relevant services from writing or modifying data. This can happen due to malware infection, overzealous third-party security software, or manual system modifications.
*   **Corrupted System Files:** Damage to core Windows system files can lead to integrity issues that prevent proper service operation and permission enforcement, indirectly causing access denied errors during updates.
*   **Interference from Third-Party Software:** Antivirus programs, firewalls, or other security applications might aggressively block access to legitimate Windows Update processes, mistaking them for malicious activity.
*   **Malware or Virus Infection:** Malicious software can deliberately modify system permissions or corrupt files to prevent updates, thereby hindering security patches and maintaining control over the system.

### Step-by-Step Solution

Addressing error 0x80070005 requires a systematic approach to identify and rectify the underlying permission or corruption issue.

#### ## Step 1: Run the Windows Update Troubleshooter

The built-in Windows Update Troubleshooter can automatically detect and resolve common issues that prevent updates.

1.  Press `Win + I` to open **Settings**.
2.  Navigate to **Update & Security** (Windows 10) or **System > Troubleshoot** (Windows 11).
3.  In Windows 10, select **Troubleshoot** from the left pane, then click **Additional troubleshooters**. In Windows 11, click **Other troubleshooters**.
4.  Locate **Windows Update** and click **Run the troubleshooter**.
5.  Follow the on-screen prompts and apply any recommended fixes.
6.  After the troubleshooter completes, restart your computer and attempt to run Windows Update again.

#### ## Step 2: Check Date and Time Settings

Incorrect date and time settings can disrupt secure connections necessary for Windows Update to function correctly.

1.  Right-click on the clock in the system tray and select **Adjust date/time**.
2.  Ensure **Set time automatically** and **Set time zone automatically** are both toggled **On**.
3.  Click **Sync now** under "Synchronize your clock" (Windows 10) or "Additional settings" (Windows 11) to ensure your system clock is accurate.
4.  Reboot your PC and reattempt Windows Update.

#### ## Step 3: Run System File Checker (SFC) and DISM Tools

Corrupted system files are a common cause of update errors. SFC and DISM can repair these.

1.  Press `Win + R`, type `cmd`, then press `Ctrl + Shift + Enter` to open **Command Prompt as Administrator**.
2.  First, run the Deployment Image Servicing and Management (DISM) tool to prepare your system for SFC:
    `DISM /Online /Cleanup-Image /RestoreHealth`
    This process can take several minutes to complete. Do not close the window.
3.  Once DISM finishes, run the System File Checker (SFC):
    `sfc /scannow`
    This will scan for and attempt to repair corrupted Windows system files.
4.  After both commands complete, close the Command Prompt and restart your computer. Then, try Windows Update again.

#### ## Step 4: Reset Windows Update Components

Resetting critical Windows Update services and components can clear out corrupted temporary files and re-initialize the update process.

1.  Open **Command Prompt as Administrator** (as in Step 3).
2.  Stop the necessary Windows Update services:
    ```cmd
    net stop bits
    net stop wuauserv
    net stop appidsvc
    net stop cryptsvc
    ```
3.  Delete the contents of the `SoftwareDistribution` and `catroot2` folders, which store temporary update files and update logs. These folders will be recreated automatically.
    ```cmd
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
4.  Restart the services you stopped earlier:
    ```cmd
    net start bits
    net start wuauserv
    net start appidsvc
    net start cryptsvc
    ```
5.  Close Command Prompt and restart your computer. Then, attempt Windows Update.

#### ## Step 5: Grant Full Control Permissions to the "System" Account

This step directly addresses the "ACCESS DENIED" aspect by ensuring the "System" account has necessary permissions to critical update directories. We'll focus on the `SoftwareDistribution` folder as a primary culprit, but the principle applies to others like `catroot2` or `Temp`.

1.  Press `Win + E` to open **File Explorer**.
2.  Navigate to `C:\Windows`.
3.  Locate the `SoftwareDistribution` folder, right-click it, and select **Properties**.
4.  Go to the **Security** tab and click **Edit...**.
5.  Click **Add...**. In the "Enter the object names to select" field, type `SYSTEM` and click **Check Names**, then **OK**.
6.  Select the newly added `SYSTEM` user/group. Under "Permissions for SYSTEM," ensure the **Allow** checkbox for **Full Control** is checked.
7.  Click **Apply**, then **OK** on all open windows.
8.  Repeat this process for the `C:\Windows\System32\catroot2` folder.
9.  Restart your computer and try Windows Update again.

#### ## Step 6: Temporarily Disable Third-Party Antivirus/Firewall

Third-party security software can sometimes interfere with Windows Update by mistakenly blocking legitimate processes.

1.  Locate your antivirus program's icon in the system tray (bottom-right corner) or in the Start menu.
2.  Right-click the icon and look for options like "Disable," "Exit," "Pause Protection," or "Turn Off Firewall." Select the option that temporarily disables its real-time protection and firewall. Most programs offer to disable for a set period (e.g., 1 hour) or until reboot.
3.  **Immediately** attempt to run Windows Update.
4.  If the update succeeds, re-enable your antivirus/firewall software promptly. If the problem persists with it disabled, re-enable it before proceeding, as it's not the cause. You may need to add exceptions for Windows Update components in your antivirus settings if this consistently resolves the issue.

### Common Mistakes

When troubleshooting error 0x80070005, users often make a few common mistakes that can hinder resolution or even create new problems:

*   **Not Running Commands as Administrator:** Many of the critical steps, especially those involving Command Prompt (SFC, DISM, resetting update components), require elevated administrative privileges. Running them without admin rights will result in "Access Denied" errors within the commands themselves, falsely indicating the fix won't work. Always open Command Prompt by searching for "cmd," right-clicking, and selecting "Run as administrator."
*   **Skipping the Basics:** Jumping straight to complex permission changes or registry edits without first trying simpler solutions like the troubleshooter or checking date/time settings can waste time and overlook an easy fix. A systematic approach is crucial.
*   **Modifying Registry without Caution:** While not extensively covered here due to its complexity and risk, some users might attempt to modify registry keys related to permissions. Incorrect registry edits can severely destabilize the operating system, often requiring a full reinstallation. Always back up the registry before making any changes, and only modify keys with explicit, reliable instructions.

### Prevention Tips

Preventing Windows Update Error 0x80070005 largely involves maintaining a healthy, secure, and properly configured Windows environment:

*   **Regular System File Integrity Checks:** Periodically running `sfc /scannow` and `DISM /Online /Cleanup-Image /RestoreHealth` (e.g., once a month) can proactively identify and repair corrupted system files before they lead to update errors or other issues. This ensures the foundational components of Windows are sound.
*   **Maintain Up-to-Date Security Software:** Use a reputable antivirus and keep it updated. This helps prevent malware infections that could corrupt system files or alter permissions, which are primary causes of the 0x80070005 error. Ensure your security software is configured not to interfere excessively with legitimate Windows processes.
*   **Avoid Unnecessary System Modifications:** Be cautious when using "optimization" tools or manually altering system permissions, registry settings, or core Windows files unless you fully understand the implications. Such modifications can inadvertently break the intricate permission structure required for Windows Update.
*   **Keep Drivers Updated:** While less directly related to 0x80070005, outdated or corrupted drivers can sometimes cause system instability that indirectly manifests as update failures. Keeping device drivers current helps maintain overall system health and compatibility.