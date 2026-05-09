---
title: "How to Fix \"Error 0x80070005: Access Denied\" When Installing Windows Updates"
date: "2026-05-09T02:43:31.197Z"
slug: "how-to-fix-error-0x80070005-access-denied-when-installing-windows-updates"
type: "how-to"
description: "Resolve the \"Error 0x80070005: Access Denied\" when installing Windows updates with this comprehensive, step-by-step technical guide. Learn why it happens and how to fix it."
keywords: "Windows Update error, 0x80070005, Access Denied, Windows update failed, fix update error, Windows troubleshooting"
---

## Problem Explanation

You're trying to install important Windows updates, but the process grinds to a halt, displaying an error message: "There were problems installing some updates, but we let you know about it so you can try again. Error 0x80070005 – Access Denied." This message indicates that Windows Update components lack the necessary permissions to access, modify, or delete files or folders required for the update process. Essentially, the system is preventing the update mechanism from performing its intended actions. This can be frustrating as it blocks crucial security patches and feature enhancements, leaving your system vulnerable.

## Why It Happens

The "Error 0x80070005: Access Denied" typically occurs when the Windows Update service or its associated components encounter permission issues on critical system files or folders. This can stem from several sources. Corrupted system files, incorrect security permissions on the SoftwareDistribution folder (where Windows stores downloaded update files), or issues with the Windows Update service itself are common culprits. In some cases, third-party security software might aggressively block access to certain system areas, mistaking legitimate update activities for malicious behavior. Malware infections can also alter system file permissions, leading to this error.

## Step-by-Step Solution

### ## Step 1: Run the Windows Update Troubleshooter

The built-in Windows troubleshooter is designed to automatically detect and fix common Windows Update problems.

1.  Navigate to **Settings** > **Update & Security** > **Troubleshoot**.
2.  Click on **Additional troubleshooters**.
3.  Select **Windows Update** and then click **Run the troubleshooter**.
4.  Follow the on-screen prompts and allow the troubleshooter to make any necessary changes.
5.  Restart your computer after the troubleshooter has completed.

### ## Step 2: Check File and Folder Permissions for the SoftwareDistribution Folder

The SoftwareDistribution folder is where Windows stores update files. Incorrect permissions here can cause access denied errors.

1.  Open **Command Prompt** as an administrator. To do this, search for "cmd" in the Start menu, right-click on "Command Prompt," and select "Run as administrator."
2.  Stop the Windows Update service by typing the following command and pressing Enter:
    `net stop wuauserv`
3.  Stop the Cryptographic Services by typing the following command and pressing Enter:
    `net stop cryptSvc`
4.  Stop the Bits service by typing the following command and pressing Enter:
    `net stop bits`
5.  Stop the Software Protection service by typing the following command and pressing Enter:
    `net stop sppsvc`
6.  Rename the SoftwareDistribution folder. Navigate to `C:\Windows\SoftwareDistribution` using File Explorer. Rename the folder to `SoftwareDistribution.old`.
7.  Rename the Catroot2 folder. Navigate to `C:\Windows\System32`. Rename the `catroot2` folder to `catroot2.old`.
8.  Restart the Windows Update service by typing the following command and pressing Enter:
    `net start wuauserv`
9.  Restart the Cryptographic Services by typing the following command and pressing Enter:
    `net start cryptSvc`
10. Restart the Bits service by typing the following command and pressing Enter:
    `net start bits`
11. Restart the Software Protection service by typing the following command and pressing Enter:
    `net start sppsvc`
12. Close the Command Prompt and try running Windows Update again.

### ## Step 3: Reset the Windows Update Components Manually

If renaming the folders doesn't resolve the issue, manually resetting the Windows Update components can help. This is a more thorough process than simply renaming.

1.  Open **Command Prompt** as an administrator.
2.  Execute the following commands one by one, pressing Enter after each:
    `net stop wuauserv`
    `net stop cryptSvc`
    `net stop bits`
    `net stop msiserver`
3.  Delete the contents of the SoftwareDistribution folder. Navigate to `C:\Windows\SoftwareDistribution` in File Explorer. Delete all files and folders *inside* this folder. **Do not delete the folder itself.**
4.  Delete the contents of the Catroot2 folder. Navigate to `C:\Windows\System32`. Delete all files and folders *inside* the `catroot2` folder. **Do not delete the folder itself.**
5.  Re-register the DLL files associated with Windows Update. In the administrator Command Prompt, type and press Enter for each command:
    `regsvr32 mshtml.dll`
    `regsvr32 shdocvw.dll`
    `regsvr32 browseui.dll`
    `regsvr32 jscript.dll`
    `regsvr32 vbscript.dll`
    `regsvr32 scrrun.dll`
    `regsvr32 msxml.dll`
    `regsvr32 msxml3.dll`
    `regsvr32 msxml6.dll`
6.  Restart the services. In the administrator Command Prompt, type and press Enter for each command:
    `net start wuauserv`
    `net start cryptSvc`
    `net start bits`
    `net start msiserver`
7.  Close the Command Prompt and restart your computer. Then, try running Windows Update again.

### ## Step 4: Temporarily Disable Antivirus Software

Sometimes, aggressive antivirus programs can interfere with the Windows Update process by blocking access to certain files or services.

1.  Locate your antivirus software's icon in the system tray (usually at the bottom-right of your screen).
2.  Right-click on the icon and look for an option to "Disable," "Turn off," or "Exit." Select the option that will temporarily disable real-time protection.
3.  Try running Windows Update.
4.  **Crucially, remember to re-enable your antivirus software immediately after the update process is complete.** Failure to do so leaves your system vulnerable to threats.

### ## Step 5: Run System File Checker (SFC) and DISM

Corrupted system files can also lead to access denied errors during updates. SFC and DISM can help repair these.

1.  Open **Command Prompt** as an administrator.
2.  Run the System File Checker. Type the following command and press Enter:
    `sfc /scannow`
3.  Wait for the scan to complete. If SFC finds and repairs corrupted files, restart your computer and try updating again.
4.  If SFC cannot repair the files or the problem persists, run the Deployment Image Servicing and Management (DISM) tool. Type the following commands one by one, pressing Enter after each:
    `DISM /Online /Cleanup-Image /ScanHealth`
    `DISM /Online /Cleanup-Image /CheckHealth`
    `DISM /Online /Cleanup-Image /RestoreHealth`
5.  Once DISM has completed, run `sfc /scannow` again.
6.  Restart your computer and attempt to install Windows Updates.

### ## Step 6: Check Permissions for the Windows Update Service

Ensure the Windows Update service has the correct permissions to access necessary files and folders.

1.  Search for "Services" in the Start menu and open the Services application.
2.  Locate the **Windows Update** service in the list.
3.  Right-click on the **Windows Update** service and select **Properties**.
4.  Go to the **Log On** tab. Ensure that "Local System account" is selected. If it's not, select it and click **Apply**, then **OK**.
5.  While still in the Properties window, go to the **Recovery** tab. Set the "First failure," "Second failure," and "Subsequent failures" to **Restart the Service**. Click **Apply**, then **OK**.
6.  Right-click on the **Windows Update** service again and select **Restart**.
7.  Try running Windows Update.

## Common Mistakes

A common mistake when encountering this error is to repeatedly run the Windows Update troubleshooter or attempt to download and install updates manually without addressing the underlying permission issues. Simply restarting the computer or the Windows Update service without performing the necessary file and folder permission checks or component resets is often insufficient. Another pitfall is disabling antivirus software and forgetting to re-enable it, leaving the system exposed. Over-aggressive manual modifications to registry keys related to Windows Update without proper backups or understanding can also exacerbate the problem.

## Prevention Tips

To prevent "Error 0x80070005: Access Denied" from recurring, maintain a proactive approach to system health. Regularly run Windows Update and install all available updates promptly. Ensure your antivirus software is up-to-date and configured correctly, but avoid settings that are overly restrictive. Perform regular system file checks using `sfc /scannow` and DISM to catch and repair minor corruptions before they escalate. Keep your operating system and drivers updated from official sources. Consider creating a system restore point before making significant system changes or installing new software that might alter system permissions.