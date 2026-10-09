---
title: "How to Fix \"Windows Update Agent Could Not Be Started\" Error (0x80070057)"
date: "2026-10-09T20:00:15.393Z"
slug: "how-to-fix-windows-update-agent-could-not-be-started-error-0x80070057"
type: "how-to"
description: "Resolve the \"Windows Update Agent Could Not Be Started\" error (0x80070057) on Windows. This guide provides a step-by-step solution and prevention tips for this common update issue."
keywords: "Windows Update error 0x80070057, Windows Update Agent not starting, fix Windows update error, Windows update issues, 0x80070057, update agent error"
---

## Problem Explanation

The "Windows Update Agent Could Not Be Started" error, often accompanied by the error code 0x80070057, signifies a critical failure in the Windows Update service. This means your system is unable to initiate or manage the process of downloading and installing important operating system updates, security patches, and feature enhancements. When this error occurs, users typically encounter a message stating something along the lines of: "Windows could not search for new updates. An error occurred while checking for updates, but we couldn't search for them at this time. Error(s) found: Code 80070057." This prevents any further update attempts and leaves your system vulnerable.

## Why It Happens

The root cause of the "Windows Update Agent Could Not Be Started" error (0x80070057) is frequently linked to corrupted system files or issues with the Windows Update service itself. This corruption can stem from various factors, including incomplete or interrupted update installations, malware infections that tamper with system files, or even unexpected system shutdowns that prevent the update process from completing cleanly. Additionally, problems with the underlying Windows Update components, such as the SoftwareDistribution folder or the Catroot2 folder, can also lead to this error. The 0x80070057 error code specifically indicates a "parameter is incorrect" issue, suggesting that a component of the update process is receiving faulty or malformed data, thus preventing the service from starting.

## Step-by-Step Solution

Here's a systematic approach to resolve the "Windows Update Agent Could Not Be Started" error (0x80070057):

### Step 1: Run the Windows Update Troubleshooter

The built-in Windows Update troubleshooter is designed to automatically detect and fix common update-related problems.

1.  Press the **Windows key + I** to open **Settings**.
2.  Click on **Update & Security**.
3.  Select **Troubleshoot** from the left-hand menu.
4.  Click on **Additional troubleshooters**.
5.  Locate and click on **Windows Update**.
6.  Click **Run the troubleshooter**.
7.  Follow the on-screen prompts. The troubleshooter will scan for issues and attempt to resolve them. Restart your computer after it completes.

### Step 2: Verify and Repair System Files (SFC and DISM)

Corrupted system files are a common culprit. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can scan for and repair these issues.

1.  Search for **Command Prompt** in the Windows search bar.
2.  Right-click on **Command Prompt** and select **Run as administrator**.
3.  In the Command Prompt window, type the following command and press Enter:
    ```
    sfc /scannow
    ```
4.  Allow the scan to complete. This may take some time.
5.  Once SFC has finished, type the following DISM commands, pressing Enter after each one:
    ```
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
6.  Each DISM command will take some time to execute. Once all three are complete, close the Command Prompt and restart your computer.

### Step 3: Reset Windows Update Components

Corrupted or misconfigured Windows Update components can prevent the service from starting. Resetting these components can resolve the issue.

1.  Open **Command Prompt as administrator** (as described in Step 2).
2.  Stop the Windows Update services by entering the following commands, pressing Enter after each:
    ```
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the SoftwareDistribution and Catroot2 folders. These folders store downloaded update files and information.
    ```
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
4.  Restart the Windows Update services by entering the following commands, pressing Enter after each:
    ```
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close the Command Prompt and restart your computer. After restarting, Windows will recreate the SoftwareDistribution and Catroot2 folders.

### Step 4: Check Windows Update Service Status

Ensure that the Windows Update service is running and set to start automatically.

1.  Press **Windows key + R**, type `services.msc`, and press Enter.
2.  In the Services window, scroll down and locate **Windows Update**.
3.  Double-click on **Windows Update**.
4.  Under the **General** tab:
    *   Ensure that the **Startup type** is set to **Automatic**. If not, change it.
    *   If the **Service status** is **Stopped**, click the **Start** button.
5.  Click **Apply** and then **OK**.
6.  Restart your computer.

### Step 5: Manually Update Windows (If Necessary)

If the above steps don't resolve the issue and you still can't update, you might consider manually downloading and installing updates from the Microsoft Update Catalog.

1.  Identify the specific update you are trying to install (e.g., by its KB number, if you can find it in your update history or a related error message).
2.  Go to the **Microsoft Update Catalog** website.
3.  Search for the KB number of the update.
4.  Download the appropriate version of the update for your system (e.g., x64 for 64-bit Windows).
5.  Run the downloaded `.msu` file to install the update.

### Step 6: Use the System Restore Point

If the error started occurring recently, a system restore point might revert your system to a state where updates were functioning correctly.

1.  Search for **Create a restore point** in the Windows search bar and open it.
2.  In the System Properties window, click the **System Restore...** button.
3.  Click **Next**.
4.  Select a restore point dated before the error began to occur.
5.  Click **Next** and then **Finish**.
6.  Follow the on-screen instructions to complete the restore process. Note that this will uninstall applications and drivers installed after the restore point was created.

## Common Mistakes

A common mistake is to repeatedly run the Windows Update troubleshooter without addressing underlying system file corruption or service issues. Users also sometimes incorrectly assume that simply restarting the computer will fix a persistent service error without actively checking or restarting the relevant services. Forgetting to run Command Prompt as an administrator when executing commands like `sfc` or `DISM` will lead to them failing silently or with permission errors. Additionally, manually renaming the `SoftwareDistribution` folder without first stopping the associated services can lead to data corruption within the folder itself, requiring manual deletion and recreation.

## Prevention Tips

To prevent the "Windows Update Agent Could Not Be Started" error from recurring, maintain good system hygiene. Regularly run the SFC and DISM commands as part of your system maintenance routine. Ensure that Windows Update services are always set to start automatically and that the service is running. Avoid forcefully shutting down your computer during Windows updates; always allow updates to complete their installation. Consider disabling unnecessary startup programs that might interfere with system services. Lastly, maintain a clean system by using reputable antivirus software and performing regular malware scans, as infections can corrupt critical system files required for updates.