---
title: "How to Resolve Windows Update Error 0x80070005: Access Denied"
date: "2026-03-12T20:34:02.559Z"
slug: "how-to-resolve-windows-update-error-0x80070005-access-denied"
type: "how-to"
description: "Learn how to fix Windows Update error 0x80070005, the \"Access Denied\" issue, with our comprehensive step-by-step guide."
keywords: "Windows Update error 0x80070005, Access Denied, Windows Update fix, troubleshoot Windows Update, permission error Windows"
---

## Problem Explanation

Users attempting to download and install updates for their Windows operating system may encounter the frustrating error code 0x80070005, often accompanied by the message "Access Denied." This error prevents the Windows Update service from accessing necessary files or locations on the system, thereby halting the update process entirely. When this occurs, Windows Update might display a message stating that updates could not be installed and provide the specific error code 0x80070005. This roadblock can leave your system vulnerable to security threats and prevent you from benefiting from new features and performance improvements.

## Why It Happens

The core reason behind Windows Update error 0x80070005 is a permissions issue. The Windows Update service, which runs with specific system privileges, is unable to gain the necessary access to folders or files that it needs to download, extract, or install update components. This lack of access can stem from several underlying causes. Most commonly, it is due to incorrect file permissions on critical system folders, such as the Software Distribution folder, where update files are temporarily stored. Additionally, third-party security software, such as antivirus or firewall programs, might be overly aggressive and inadvertently block the Windows Update service from accessing its required resources. In rarer cases, a corrupted system file or an issue with the Windows Update service itself can also lead to this access denial.

## Step-by-Step Solution

Here’s a comprehensive approach to resolving the Windows Update error 0x80070005:

### Step 1: Run the Windows Update Troubleshooter

The built-in Windows Update Troubleshooter is designed to automatically detect and fix common Windows Update problems.

1.  Press the **Windows key + I** to open Settings.
2.  Navigate to **Update & Security** (or **System > Troubleshoot** on Windows 11).
3.  Click on **Troubleshoot** in the left-hand pane.
4.  Select **Additional troubleshooters**.
5.  Find **Windows Update** and click on **Run the troubleshooter**.
6.  Follow the on-screen prompts and allow the troubleshooter to make any necessary changes.
7.  Restart your computer after the troubleshooter has completed its scan and attempted repairs.

### Step 2: Check and Correct File Permissions for the SoftwareDistribution Folder

Incorrect permissions on the SoftwareDistribution folder are a frequent culprit.

1.  Open **Command Prompt as an administrator**. To do this, search for "cmd" in the Start menu, right-click on "Command Prompt," and select "Run as administrator."
2.  Stop the Windows Update service by typing the following command and pressing Enter:
    ```
    net stop wuauserv
    ```
3.  Stop the Cryptographic Services by typing the following command and pressing Enter:
    ```
    net stop cryptSvc
    ```
4.  Stop the BITS (Background Intelligent Transfer Service) by typing the following command and pressing Enter:
    ```
    net stop bits
    ```
5.  Close Command Prompt.
6.  Open **File Explorer** and navigate to `C:\Windows\`.
7.  Locate the **SoftwareDistribution** folder.
8.  Right-click on the **SoftwareDistribution** folder and select **Properties**.
9.  Go to the **Security** tab and click **Edit**.
10. In the new window, select **Users** from the list of Group or user names.
11. Ensure that the **Full control** checkbox under "Allow" is checked for Users. If it's not, check it.
12. Click **Apply** and then **OK** on all open windows.
13. Reopen **Command Prompt as an administrator**.
14. Restart the Windows Update service by typing:
    ```
    net start wuauserv
    ```
15. Restart the Cryptographic Services by typing:
    ```
    net start cryptSvc
    ```
16. Restart the BITS service by typing:
    ```
    net start bits
    ```
17. Close Command Prompt and try running Windows Update again.

### Step 3: Temporarily Disable Antivirus and Firewall Software

Security software can sometimes interfere with Windows Update.

1.  Locate your antivirus program's icon in the system tray (near the clock).
2.  Right-click on the icon and look for an option to disable protection or exit the program. Select an option that will temporarily disable it.
3.  If you are using Windows Firewall, you can temporarily disable it by searching for "Windows Defender Firewall" in the Start menu, clicking "Turn Windows Defender Firewall on or off," and then selecting "Turn off Windows Defender Firewall" for both private and public network settings.
4.  Attempt to run Windows Update.
5.  **Crucially, re-enable your antivirus and firewall immediately after the update attempt.**

### Step 4: Re-register DLL Files Related to Windows Update

Corrupted or incorrectly registered DLL files can cause access issues.

1.  Open **Command Prompt as an administrator**.
2.  Type the following commands, pressing Enter after each one:
    ```
    regsvr32 mshtml.dll
    regsvr32 shdocvw.dll
    regsvr32 browseui.dll
    regsvr32 vbscript.dll
    regsvr32 scrrun.dll
    regsvr32 msxml.dll
    regsvr32 msxml3.dll
    regsvr32 msxml6.dll
    regsvr32 jscript.dll
    regsvr32 urlmon.dll
    regsvr32 wintrust.dll
    regsvr32 dssenh.dll
    regsvr32 cryptdlg.dll
    regsvr32 initpki.dll
    regsvr32 rsaenh.dll
    regsvr32 gpkcsp.dll
    regsvr32 sccbase.dll
    regsvr32 slid.dll
    regsvr32 es.dll
    ```
3.  After successfully re-registering all DLLs (you should see a confirmation message for each), restart your computer.

### Step 5: Reset Windows Update Components

This is a more advanced step that involves stopping services, renaming specific folders, and then restarting services.

1.  Open **Command Prompt as an administrator**.
2.  Stop the necessary services:
    ```
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the SoftwareDistribution and catroot2 folders:
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
5.  Close Command Prompt and restart your computer.
6.  After restarting, try running Windows Update. If it works, you can delete the `.old` folders from `C:\Windows\` to reclaim disk space.

### Step 6: Run System File Checker (SFC) and DISM Tools

Corrupted system files can also lead to permission errors.

1.  Open **Command Prompt as an administrator**.
2.  Run the System File Checker (SFC) tool by typing:
    ```
    sfc /scannow
    ```
    Let this process complete.
3.  If SFC finds and fixes errors, restart your computer and try Windows Update. If SFC cannot fix the issues or if the problem persists, run the Deployment Image Servicing and Management (DISM) tool.
4.  Run the DISM tool by typing the following commands, pressing Enter after each:
    ```
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    This process can take a significant amount of time.
5.  Once DISM has completed, restart your computer and try Windows Update again.

## Common Mistakes

A frequent mistake when encountering error 0x80070005 is attempting to manually change permissions on too many system files or folders unnecessarily. This can inadvertently create new, more complex permission issues. Another common pitfall is forgetting to re-enable antivirus and firewall software after temporarily disabling them. Leaving these security measures off can expose your system to threats. Users also sometimes skip the step of running Command Prompt or PowerShell as an administrator, which is essential for the commands to execute correctly and make the necessary system changes. Finally, not restarting the computer after performing significant troubleshooting steps can prevent the changes from taking effect.

## Prevention Tips

To minimize the chances of encountering Windows Update error 0x80070005 in the future, it's crucial to maintain a healthy system. Regularly running the Windows Update Troubleshooter, even when you aren't experiencing issues, can help catch potential problems early. Ensure your antivirus and firewall software are configured to allow legitimate system processes, such as Windows Update, to run without undue restriction. Keep your system’s user account control (UAC) settings at their default levels, as significant modifications can sometimes impact permissions. Periodically running SFC and DISM scans can help identify and repair corrupted system files before they contribute to update errors. Lastly, always ensure you have enough free disk space on your system drive, as low disk space can sometimes interfere with the update download and installation process.