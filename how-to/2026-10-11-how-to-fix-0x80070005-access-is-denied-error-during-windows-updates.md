---
title: "How to Fix '0x80070005 - Access is denied' Error During Windows Updates"
date: "2026-10-11T19:20:49.103Z"
slug: "how-to-fix-0x80070005-access-is-denied-error-during-windows-updates"
type: "how-to"
description: "Resolve Windows Update error 0x80070005 'Access is denied' with a comprehensive guide. Learn the causes and step-by-step solutions to restore update functionality and system security, including permissions fixes and component resets."
keywords: "0x80070005, Windows Update error, Access denied, fix Windows Update, Windows 10 update error, Windows 11 update error, system update failed, update service, permissions error, CBS.log, SFC scan, DISM, reset Windows Update components, SoftwareDistribution, Catroot2"
---

The "0x80070005 - Access is denied" error is a common and frustrating issue that can prevent your Windows operating system from installing crucial updates. When this error occurs, users typically see a message within the Windows Update interface stating "Something went wrong. Try to reopen Settings later," accompanied by the specific error code `0x80070005`. The update process will fail to download or install, often appearing stuck or simply reverting changes without completing the installation. This blockage not only prevents your system from receiving new features and performance improvements but also leaves it vulnerable to security threats that updated patches are designed to mitigate.

This specific error code almost universally points to a permissions issue. At its core, the `0x80070005` error means that the Windows Update service, or one of its dependent components, does not have the necessary access rights to certain files, folders, or registry keys required to perform an update operation. This often involves critical system directories like `C:\Windows\SoftwareDistribution` or `C:\Windows\System32\catroot2`, where update files are stored and processed, or temporary directories where the installer extracts files. Various factors can lead to these permission discrepancies, including corrupted system files, interference from third-party security software, malware infections, or even incorrect configurations within Windows services responsible for updates. Understanding that this is fundamentally an access rights problem helps in approaching the solution systematically.

***

### Step-by-Step Solution

Solving the `0x80070005` error requires a methodical approach, addressing the most common causes first before moving to more advanced troubleshooting. Ensure you have administrator privileges on your system before proceeding with these steps.

### ## Step 1: Run the Windows Update Troubleshooter

The built-in Windows Update Troubleshooter is designed to diagnose and automatically fix common issues preventing updates. It's always the first step to take.

1.  Press `Windows key + I` to open **Settings**.
2.  Navigate to **Update & Security** (Windows 10) or **System > Troubleshoot > Other troubleshooters** (Windows 11).
3.  Under "Get up and running" or "Most frequent," select **Windows Update**.
4.  Click **Run the troubleshooter**.
5.  Follow the on-screen prompts and apply any recommended fixes.
6.  Once the troubleshooter completes, restart your computer and try running Windows Update again.

### ## Step 2: Temporarily Disable Third-Party Security Software

Aggressive antivirus programs or firewalls can sometimes interfere with Windows Update processes by blocking access to system files or network connections.

1.  Locate your third-party antivirus software icon in the system tray (usually near the clock).
2.  Right-click the icon and look for options like "Disable," "Exit," or "Turn off protection." Choose to disable it temporarily for a short duration (e.g., 15-30 minutes, or until the next reboot).
3.  If you have a third-party firewall, disable that as well.
4.  With your security software temporarily disabled, attempt to run Windows Update.
5.  **Important:** Remember to re-enable your security software immediately after testing, regardless of the outcome, to maintain system protection.

### ## Step 3: Reset Windows Update Components Manually

This is often the most effective solution, as it clears out potentially corrupted update files and resets the services involved in the update process.

1.  Type `cmd` into the Windows search bar. Right-click on **Command Prompt** and select **Run as administrator**.
2.  Stop the essential Windows Update services by typing the following commands, pressing `Enter` after each:
    ```cmd
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the `SoftwareDistribution` and `Catroot2` folders. These folders store temporary update files and update history. Renaming them forces Windows to recreate them. Type the following commands, pressing `Enter` after each:
    ```cmd
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
4.  Restart the services you stopped earlier. Type the following commands, pressing `Enter` after each:
    ```cmd
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close Command Prompt and restart your computer.
6.  Attempt to run Windows Update again.

### ## Step 4: Run System File Checker (SFC) and DISM Commands

Corrupted system files can lead to permission issues for Windows services. SFC and DISM tools help identify and repair such corruption.

1.  Type `cmd` into the Windows search bar. Right-click on **Command Prompt** and select **Run as administrator**.
2.  First, run the System File Checker (SFC) by typing:
    ```cmd
    sfc /scannow
    ```
    Press `Enter`. This process may take some time. Do not close the window until it completes and displays a message.
3.  After SFC completes, run the Deployment Imaging and Servicing Management (DISM) tool. This tool helps fix more profound system image corruption that SFC might not address. Type the following commands, pressing `Enter` after each:
    ```cmd
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    Each DISM command can take several minutes to complete. The `RestoreHealth` command is particularly important, as it attempts to repair any detected issues.
4.  Once all commands have finished, close Command Prompt, restart your computer, and try Windows Update.

### ## Step 5: Verify and Adjust Permissions for Critical Folders

Incorrect permissions on specific folders where Windows Update operates can directly cause the `0x80070005` error. Ensuring the `SYSTEM` account has full control is crucial.

1.  Open **File Explorer**.
2.  Navigate to `C:\Windows`.
3.  Locate the `SoftwareDistribution` folder, right-click it, and select **Properties**.
4.  Go to the **Security** tab and click **Edit...**.
5.  Click **Add...**, type `SYSTEM` into the "Enter the object names to select" field, and click **Check Names**. Then click **OK**.
6.  Ensure that `SYSTEM` is selected in the "Group or user names" list. In the "Permissions for SYSTEM" box below, check the **Full Control** checkbox under "Allow."
7.  Click **Apply** then **OK**.
8.  Repeat this process for the `C:\Windows\System32\catroot2` folder.
9.  Also, check permissions for `C:\Windows\Temp`. Ensure the `SYSTEM` account has **Full Control** here as well. If it doesn't, grant it.
10. Restart your computer and attempt to run Windows Update.

### ## Step 6: Perform a Clean Boot

A clean boot helps eliminate software conflicts by starting Windows with a minimal set of drivers and startup programs. This can pinpoint if a third-party application is causing the permissions issue.

1.  Press `Windows key + R`, type `msconfig`, and press `Enter` to open **System Configuration**.
2.  Go to the **Services** tab.
3.  Check the box next to **Hide all Microsoft services**.
4.  Click **Disable all**.
5.  Go to the **Startup** tab and click **Open Task Manager**.
6.  In Task Manager, go to the **Startup** tab. Select each item individually and click **Disable**.
7.  Close Task Manager.
8.  Back in the System Configuration window, click **Apply** and then **OK**.
9.  You will be prompted to restart your computer. Choose **Restart**.
10. After the clean boot, try running Windows Update. If the update succeeds, a third-party program was the culprit. You can then re-enable services and startup items one by one to find the specific conflicting software.
11. To return to a normal startup, reverse the steps: go to `msconfig`, select "Normal startup" on the General tab, and re-enable services and startup items.

### ## Step 7: Create a New User Account

In rare cases, the user profile itself might be corrupted, leading to permissions issues even for system-level operations. Creating a new administrative user account can rule this out.

1.  Press `Windows key + I` to open **Settings**.
2.  Navigate to **Accounts > Family & other users** (Windows 10) or **Accounts > Other users** (Windows 11).
3.  Click **Add someone else to this PC**.
4.  Follow the prompts to create a new local user account (you can choose "I don't have this person's sign-in information" and "Add a user without a Microsoft account").
5.  Once the account is created, click on the new account, select **Change account type**, and set it to **Administrator**.
6.  Log out of your current user account and log in with the newly created administrative account.
7.  Attempt to run Windows Update from this new account. If it works, your original user profile might be corrupted, and you may consider migrating your data to the new profile.

***

### Common Mistakes

When troubleshooting the `0x80070005` error, users often make several common mistakes that can prolong the issue or even exacerbate it. One frequent error is neglecting to run Command Prompt or PowerShell as an administrator. Many of the crucial commands, such as `net stop`, `ren`, `sfc`, and `DISM`, require elevated permissions, and failing to execute them as an administrator will result in a different "Access is denied" message for the command itself, rendering the step ineffective.

Another common pitfall is giving up after the first or second troubleshooting step fails. The `0x80070005` error can have multiple underlying causes, and a systematic approach is essential. Skipping steps, particularly the manual reset of Windows Update components (Step 3) or the SFC/DISM scans (Step 4), often means missing the core problem. Lastly, some users forget to re-enable their third-party security software after temporarily disabling it for testing, leaving their system vulnerable. Always ensure your antivirus and firewall are active once troubleshooting is complete.

***

### Prevention Tips

Preventing the `0x80070005` error largely involves maintaining a healthy and secure Windows environment. Regularly ensuring your system files are intact is a crucial preventative measure; consider running `sfc /scannow` and `DISM /Online /Cleanup-Image /RestoreHealth` commands periodically (e.g., once a month) to proactively detect and repair corruption before it causes update issues. Keeping your operating system and all installed software up to date also minimizes vulnerabilities that could be exploited to manipulate system permissions.

Furthermore, always use reputable antivirus and anti-malware software, and perform regular scans to detect and remove any malicious software that might interfere with system processes or alter critical permissions. Avoid installing unverified third-party "optimization" or "cleaning" tools, as these can sometimes incorrectly modify registry entries or file permissions, leading to unexpected errors like `0x80070005`. Finally, ensure you have sufficient free disk space, as inadequate space can sometimes cause update failures, although this is less directly related to permission issues, it can compound problems.