---
title: "How to Fix \"Error 0x80070005: Access Denied\" During Windows Update Installation"
date: "2026-08-23T05:28:14.809Z"
slug: "how-to-fix-error-0x80070005-access-denied-during-windows-update-installation"
type: "how-to"
description: "Learn how to troubleshoot and fix Error 0x80070005 (Access Denied) that prevents Windows Updates from installing. Follow expert step-by-step solutions to resolve this common update issue."
keywords: "Windows Update Error 0x80070005, Access Denied, Windows Update failure, fix Windows Update, update installation error, 0x80070005 solution, Windows security update error, access denied update"
---

### Problem Explanation

Encountering "Error 0x80070005: Access Denied" during a Windows Update installation can be a frustrating roadblock. This specific error code signifies that Windows Update is being prevented from accessing a necessary file, folder, or registry key to complete the installation process. You might see a pop-up message stating, "There were some problems installing updates, but we'll try again later. If you keep seeing this and want to search the web or contact support for information, this may help: (0x80070005)." This error prevents your system from installing critical security patches, feature updates, and performance enhancements, leaving your system potentially vulnerable or outdated.

The error typically appears after Windows has successfully downloaded the update package but fails during the installation phase, often when the system attempts to modify protected system files or registry entries. While the download completes without issue, the inability to "write" the changes to the necessary locations triggers the "Access Denied" message, halting the update process entirely.

### Why It Happens

The root cause of "Error 0x80070005" during Windows Update is almost always related to insufficient permissions. When the Windows Update service tries to install an update, it requires specific access rights to various system resources. If these permissions are missing, corrupted, or being blocked, the installation fails.

Several factors can lead to this permissions-related issue:
*   **Corrupted System Files:** Essential system files that Windows Update relies on might be damaged, leading to access issues.
*   **Incorrect Folder/Registry Permissions:** The most common culprit is a misconfigured or corrupted permission setting on critical system folders (like `C:\Windows\SoftwareDistribution`, `C:\Windows\System32\catroot2`, or even `C:\Windows` itself) or specific registry keys that the update process needs to modify. This can happen due to malware, third-party software installations, or manual system tweaks.
*   **Third-Party Interference:** Overly aggressive antivirus software, firewalls, or other security applications might mistakenly block the legitimate actions of the Windows Update service, interpreting its system-level changes as malicious.
*   **Windows Update Service Issues:** The Windows Update service itself or its related components (Background Intelligent Transfer Service, Cryptographic Services) might be corrupted or stuck in a bad state, preventing them from operating with the correct privileges.
*   **Corrupted User Profile:** Less common, but a severely corrupted user profile could sometimes interfere with system-wide processes, including updates.

### Step-by-Step Solution

Follow these steps carefully to diagnose and resolve Error 0x80070005. It's recommended to try them in order, as they progress from simpler fixes to more comprehensive troubleshooting.

## Step 1: Run the Windows Update Troubleshooter

The built-in Windows Update Troubleshooter can automatically detect and fix common issues that prevent updates from installing correctly.

1.  Press `Windows Key + I` to open **Settings**.
2.  Navigate to **Update & Security** (or **System** > **Troubleshoot** > **Other troubleshooters** on Windows 11).
3.  Click on **Troubleshoot** in the left-hand pane.
4.  Select **Additional troubleshooters**.
5.  Under "Get up and running," click on **Windows Update** and then select **Run the troubleshooter**.
6.  Allow the troubleshooter to complete its scan and apply any recommended fixes.
7.  Restart your computer and attempt to run Windows Update again.

## Step 2: Check System File Integrity with SFC and DISM

Corrupted system files are a frequent cause of various Windows errors, including permission issues. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can help repair these.

1.  Press `Windows Key + R`, type `cmd`, and then press `Ctrl + Shift + Enter` to open an **elevated Command Prompt** (Run as administrator).
2.  In the Command Prompt window, type the following command and press `Enter`:
    `sfc /scannow`
    Allow the scan to complete. This may take some time. If SFC finds corrupted files, it will attempt to repair them.
3.  After the SFC scan finishes, even if it reports no integrity violations, it's good practice to run the DISM tool. Type the following commands, pressing `Enter` after each:
    `DISM /Online /Cleanup-Image /CheckHealth`
    `DISM /Online /Cleanup-Image /ScanHealth`
    `DISM /Online /Cleanup-Image /RestoreHealth`
    The `RestoreHealth` command can take a while to complete, as it downloads necessary repair files from Windows Update. Ensure you have an active internet connection.
4.  Once both SFC and DISM processes are finished, restart your computer and try Windows Update again.

## Step 3: Reset Windows Update Components Manually

Manually resetting the Windows Update components often resolves persistent update errors by clearing corrupted cache and restarting the relevant services.

1.  Open an **elevated Command Prompt** (Run as administrator) as described in Step 2.
2.  Stop the necessary Windows Update services by typing the following commands one by one, pressing `Enter` after each:
    ```cmd
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the `SoftwareDistribution` and `catroot2` folders to clear the update cache. These folders will be recreated automatically when the services restart. Type these commands and press `Enter` after each:
    ```cmd
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
4.  Restart the Windows Update services by typing the following commands one by one, pressing `Enter` after each:
    ```cmd
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close the Command Prompt, restart your computer, and then attempt to check for and install updates.

## Step 4: Verify and Adjust Permissions for Critical System Folders

Incorrect permissions on key system folders can directly cause "Access Denied" errors. We'll specifically check `C:\Windows\SoftwareDistribution` and `C:\Windows` itself to ensure `SYSTEM` and `Administrators` have full control.

1.  Open **File Explorer** and navigate to `C:\Windows`.
2.  Right-click on the `SoftwareDistribution` folder and select **Properties**.
3.  Go to the **Security** tab and click **Edit...**.
4.  Ensure that `SYSTEM` and `Administrators` (or your specific administrator group) are listed and have "Full control" checked under "Allow." If they are missing or don't have full control, click **Add...**, type `SYSTEM` and click `Check Names`, then `OK`. Repeat for `Administrators`. Grant them "Full control."
5.  Click **Apply**, then **OK**.
6.  Now, return to `C:\Windows`. Right-click on the `Windows` folder itself and select **Properties**.
7.  Go to the **Security** tab and click **Advanced**.
8.  Click **Change permissions**. If prompted, click **Add**. Click **Select a principal**, type `SYSTEM`, click **Check Names**, then **OK**. Set "Type" to `Allow`, "Applies to" to `This folder, subfolders and files`, and check **Full Control**. Click **OK**.
9.  Repeat the process for the `Administrators` group if it doesn't already have full control.
10. Click **Apply**, then **OK** on all open windows. You might be prompted to confirm permission changes, especially for subfolders.
11. Restart your computer and try updating Windows.

## Step 5: Temporarily Disable Third-Party Antivirus/Firewall

Third-party security software can sometimes be overly protective, leading to false positives that block legitimate Windows Update processes.

1.  Locate your antivirus software icon in the system tray (bottom-right corner of your screen).
2.  Right-click the icon and look for options like "Disable," "Exit," "Pause Protection," or "Turn off firewall." Choose to temporarily disable it for about 15-30 minutes.
3.  If you have a separate third-party firewall, disable that as well.
4.  **Important:** Do NOT disable Windows Defender Firewall unless instructed by a specific troubleshooting step. Windows Defender is less likely to cause this particular error.
5.  Once disabled, immediately attempt to run Windows Update.
6.  After the update either succeeds or fails, remember to **re-enable your antivirus and firewall** to protect your system.

## Step 6: Perform a Clean Boot

A clean boot starts Windows with a minimal set of drivers and startup programs. This helps eliminate software conflicts that might be causing the "Access Denied" error.

1.  Press `Windows Key + R`, type `msconfig`, and press `Enter` to open the **System Configuration** utility.
2.  Go to the **Services** tab.
3.  Check the box next to **Hide all Microsoft services**.
4.  Click **Disable all**.
5.  Go to the **Startup** tab and click **Open Task Manager**.
6.  In Task Manager, for each startup item, select it and click **Disable**. Close Task Manager.
7.  Click **OK** on the System Configuration window and then **Restart** your computer.
8.  Once your computer reboots in a clean boot state, try running Windows Update.
9.  If the update succeeds, you can enable services and startup items one by one (restarting after each group) to identify the culprit. Remember to re-enable everything eventually.

## Step 7: Create a New User Account

If the problem persists, your current user profile might be corrupted, interfering with system processes. Creating a new administrative user account can help determine if this is the case.

1.  Press `Windows Key + I` to open **Settings**.
2.  Go to **Accounts** > **Family & other users** (or **Other users** on Windows 11).
3.  Click **Add someone else to this PC**.
4.  Choose "I don't have this person's sign-in information," then "Add a user without a Microsoft account."
5.  Enter a username (e.g., "TestAdmin") and a password (optional for testing), then click **Next**.
6.  Click on the newly created account, then click **Change account type**.
7.  Change the "Account type" from "Standard User" to **Administrator**, then click **OK**.
8.  Log out of your current account and log in with the new administrator account.
9.  From the new account, attempt to run Windows Update. If the update succeeds, your old user profile may be corrupted, and you might consider migrating your data to the new account.

### Common Mistakes

When troubleshooting Error 0x80070005, users often make a few common mistakes that can prolong the resolution or even cause new issues:

*   **Not Running Commands as Administrator:** Many of the fixes, especially those involving the Command Prompt or modifying system settings, require elevated permissions. Failing to "Run as administrator" will result in further "Access Denied" errors and the commands won't execute properly.
*   **Skipping Steps or Not Following Instructions Precisely:** Each step is designed to address a potential cause. Skipping a step or not executing a command exactly as written can lead to incomplete fixes or missed opportunities to resolve the issue. Pay close attention to syntax, especially for Command Prompt commands.
*   **Forgetting to Re-enable Security Software/Services:** After temporarily disabling your antivirus or performing a clean boot, it's crucial to re-enable your security software and services. Forgetting this leaves your system vulnerable to malware and can cause other applications to malfunction.
*   **Not Restarting When Instructed:** Many changes made during troubleshooting, especially those affecting system files or services, require a full system restart to take effect. Ignoring restart prompts can prevent the fixes from applying correctly.

### Prevention Tips

To minimize the chances of encountering "Error 0x80070005" or similar Windows Update issues in the future, consider these best practices:

*   **Maintain Up-to-Date Security Software:** Use a reputable antivirus and keep it updated. Ensure it's not overly aggressive with real-time scanning that might interfere with legitimate system processes like Windows Update. Consider using Windows Defender if you experience frequent conflicts with third-party solutions.
*   **Regular System Maintenance:** Periodically run Disk Cleanup to remove temporary files and `sfc /scannow` (as shown in Step 2) to check and repair system file integrity. This helps prevent file corruption that can lead to permission issues.
*   **Avoid Unauthorized System Tweaks or Software:** Be cautious when installing third-party software, especially those promising "optimization" or "cleaning." Many such tools can inadvertently modify system permissions or critical files, leading to update problems. Stick to trusted sources for downloads.
*   **Ensure Sufficient Disk Space:** Windows Updates require a significant amount of free disk space for temporary files and installation. Running low on storage can cause various update failures. Aim for at least 20-30 GB of free space on your system drive.
*   **Perform Regular Backups:** While not directly preventing the error, having regular backups of your important data ensures that even if you encounter a severe issue that requires a system reset, your files are safe.