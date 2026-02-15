---
title: "How to Fix \"Error 0x80070005: Access Denied\" During Windows Updates"
date: "2026-02-15T02:07:50.030Z"
slug: "how-to-fix-error-0x80070005-access-denied-during-windows-updates"
type: "how-to"
description: "Resolve the \"Error 0x80070005: Access Denied\" when updating Windows with this comprehensive, step-by-step technical guide. Learn the causes and effective solutions."
keywords: "Windows Update error 0x80070005, Access Denied, Windows Update fix, solve update error, Windows 10 update problem, Windows 11 update error"
---

## Understanding Error 0x80070005: Access Denied During Windows Updates

When attempting to install critical security patches, feature updates, or even driver updates for your Windows operating system, you might encounter the frustrating "Error 0x80070005: Access Denied." This error message typically appears within the Windows Update interface, halting the download and installation process abruptly. It signifies that Windows Update cannot access or modify the necessary files or registry keys required to complete the update operation. This prevents your system from receiving important security enhancements and new functionalities, leaving it vulnerable.

The "Access Denied" component of this error is key. It means that the user account or system process attempting to perform the update lacks the necessary permissions. This is not an issue with corrupted update files themselves, but rather with the system's ability to manipulate them. The error can manifest at various stages of the update process, from downloading files to applying them, but the root cause remains the same: a permission-related roadblock.

## Why Error 0x80070005 Occurs

The primary reason behind Error 0x80070005 is a configuration issue with file or registry permissions within the Windows operating system. These permissions are crucial for maintaining system stability and security, dictating which users and processes can read, write, or execute specific files and system components. When these permissions become incorrectly set, perhaps due to aggressive third-party security software, manual user modifications, or even malware, Windows Update can be blocked from accessing essential files.

Another common culprit is the Windows Update service itself not running with the correct administrative privileges. Services operate under specific user contexts, and if the Windows Update service is somehow restricted from accessing its required system directories (like SoftwareDistribution), the "Access Denied" error will occur. Furthermore, corrupted system files, particularly those related to the Windows Update components, can also lead to permission discrepancies and trigger this error.

## Step-by-Step Solution

This section provides a series of actionable steps to systematically resolve the "Error 0x80070005: Access Denied" during Windows Updates. It's recommended to proceed through these steps sequentially.

### ## Step 1: Run the Windows Update Troubleshooter

The built-in Windows Update Troubleshooter is designed to automatically detect and fix common update-related problems, including permission issues.

1.  Navigate to **Settings** > **Update & Security** (Windows 10) or **Settings** > **System** > **Troubleshoot** (Windows 11).
2.  Click on **Additional troubleshooters** (Windows 10) or **Other troubleshooters** (Windows 11).
3.  Select **Windows Update** and click **Run the troubleshooter**.
4.  Follow the on-screen prompts. The troubleshooter will attempt to identify and fix any issues it finds.
5.  Once completed, restart your computer and attempt to run Windows Update again.

### ## Step 2: Ensure Windows Update Service is Running and Configured Correctly

The Windows Update service must be running and set to start automatically for updates to download and install properly.

1.  Press **Windows Key + R**, type `services.msc`, and press Enter.
2.  In the Services window, locate **Windows Update**.
3.  Double-click on **Windows Update**.
4.  Under the "Startup type" dropdown, select **Automatic**.
5.  If the service is not running, click the **Start** button.
6.  Click **Apply** and then **OK**.
7.  Restart your computer and try updating again.

### ## Step 3: Reset the SoftwareDistribution Folder

This folder stores the downloaded Windows Update files. Corrupted files within this folder can cause various update errors, including access issues.

1.  Stop the Windows Update service and the Cryptographic Services.
    *   Press **Windows Key + R**, type `cmd`, right-click on **Command Prompt**, and select **Run as administrator**.
    *   In the administrator Command Prompt, type the following commands, pressing Enter after each:
        ```
        net stop wuauserv
        net stop cryptSvc
        ```
2.  Rename the `SoftwareDistribution` folder.
    *   Still in the administrator Command Prompt, type:
        ```
        ren %systemroot%\SoftwareDistribution SoftwareDistribution.old
        ```
3.  Restart the Windows Update service and the Cryptographic Services.
    *   In the administrator Command Prompt, type:
        ```
        net start wuauserv
        net start cryptSvc
        ```
4.  Close the Command Prompt, restart your PC, and try running Windows Update.

### ## Step 4: Check and Correct File System Permissions

This is a more advanced step and requires careful execution. It involves checking and correcting the permissions of the `catroot2` and `qmgr` folders, which are crucial for the Windows Update process.

1.  Open an administrator Command Prompt by pressing **Windows Key + R**, typing `cmd`, right-clicking on **Command Prompt**, and selecting **Run as administrator**.
2.  Stop the `BITS` (Background Intelligent Transfer Service) and `wuauserv` (Windows Update) services:
    ```
    net stop bits
    net stop wuauserv
    ```
3.  Navigate to the `System32` directory:
    ```
    cd %windir%\System32
    ```
4.  Rename the `catroot2` folder.
    ```
    ren catroot2 catroot2.old
    ```
5.  Restart the `BITS` and `wuauserv` services:
    ```
    net start bits
    net start wuauserv
    ```
6.  Restart your computer and attempt to run Windows Update.

### ## Step 5: Run System File Checker (SFC) and DISM Tools

Corrupted system files can interfere with update processes. SFC and DISM can repair these files.

1.  Open an administrator Command Prompt.
2.  Run the System File Checker:
    ```
    sfc /scannow
    ```
    This process can take some time.
3.  After SFC completes, run the Deployment Image Servicing and Management (DISM) tool to repair the Windows image:
    ```
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
4.  Once both scans are complete, restart your computer and try Windows Update again.

### ## Step 6: Check Permissions for the Windows Update Agent

In rare cases, the permissions for the Windows Update agent itself might be misconfigured.

1.  Press **Windows Key + R**, type `regedit`, and press Enter to open the Registry Editor.
2.  Navigate to `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate`.
3.  Right-click on the **WindowsUpdate** key, select **Permissions**.
4.  Ensure that your user account and the `SYSTEM` account have **Full Control** or at least **Read** and **Write** permissions. If not, click **Add**, enter `SYSTEM` and your username, then grant appropriate permissions.
5.  Click **Apply** and **OK**.
6.  Navigate to `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\WindowsUpdate`.
7.  Repeat step 4 for this key, ensuring `SYSTEM` and your user account have the necessary permissions.
8.  Close the Registry Editor, restart your PC, and try updating.

## Common Mistakes

A frequent mistake users make is attempting to manually change permissions on individual update files or folders without understanding the consequences. This can inadvertently worsen the problem by further corrupting the system's permission structure. Another common pitfall is disabling or interfering with essential Windows services (like the Windows Update service or BITS) when trying to troubleshoot, which halts the update process entirely. Additionally, relying solely on third-party antivirus software to "fix" update errors without understanding its actions can sometimes lead to misconfigurations that trigger the 0x80070005 error. Users might also skip the restart steps after applying fixes, which is crucial for changes to take effect.

## Prevention Tips

To prevent "Error 0x80070005" from recurring, maintain a proactive approach to system health. Regularly run the Windows Update troubleshooter, even when no errors are apparent, as it can catch potential issues early. Ensure your antivirus and firewall software are up-to-date but also configure them carefully to avoid overly aggressive scanning that might block legitimate Windows processes. Avoid making manual, deep system configuration changes unless you have a thorough understanding of their implications. Keep your operating system and all installed applications updated, as outdated software can sometimes create compatibility issues that lead to permission conflicts. Finally, perform regular system backups so you can quickly restore your system to a working state if a problematic update or configuration change occurs.