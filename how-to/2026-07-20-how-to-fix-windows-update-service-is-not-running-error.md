---
title: "How to Fix \"Windows Update Service is Not Running\" Error"
date: "2026-07-20T21:11:04.556Z"
slug: "how-to-fix-windows-update-service-is-not-running-error"
type: "how-to"
description: "Resolve the \"Windows Update Service is Not Running\" error with this comprehensive guide. Learn the causes, step-by-step solutions, common mistakes, and prevention tips to get Windows Update working again."
keywords: "Windows Update service not running, fix Windows Update error, Windows Update stuck, cannot start Windows Update service, Windows Update troubleshooting, service control manager, BITS, Cryptographic Services, Windows Update agent"
---

When attempting to update your Windows operating system, you might encounter a frustrating error message indicating that the "Windows Update Service is Not Running." This can prevent you from downloading and installing critical security patches, feature updates, and driver updates, leaving your system vulnerable and potentially hindering performance. You might see various messages related to this issue, such as "Windows Update Service is not running. Click Start to start the service," or the update process may simply fail to initiate or complete without any specific error code.

This problem arises because the Windows Update service is a critical background process responsible for managing and executing the entire update process. If this service is stopped, disabled, or encountering an issue, Windows cannot communicate with Microsoft's update servers, download necessary files, or apply them to your system. The service relies on other related services and specific configurations to function correctly, and any disruption in these dependencies can lead to the "not running" state.

### Why It Happens

The "Windows Update Service is Not Running" error is typically a symptom of a deeper issue within the Windows Update components or system files. Several factors can cause this service to stop or fail to start. One common culprit is corrupted system files that Windows Update relies on. Over time, or due to improper shutdowns, malware infections, or aggressive system cleaning tools, these files can become damaged, preventing the service from functioning.

Another frequent cause is conflicts with third-party software, particularly antivirus programs or firewalls that might interfere with the update process by blocking necessary connections or modifying system settings. Additionally, if the essential services that Windows Update depends on, such as the Background Intelligent Transfer Service (BITS) or the Cryptographic Services, are not running or are misconfigured, the Windows Update service itself will be unable to start. Manual changes to service configurations or registry settings can also inadvertently disable or disrupt the Windows Update service.

## Step 1: Restart the Windows Update Service

The simplest solution is often to restart the service. This can resolve temporary glitches that might be preventing it from running.

1.  Press the `Windows key + R` on your keyboard to open the Run dialog box.
2.  Type `services.msc` and press Enter or click "OK." This will open the Services management console.
3.  In the Services window, scroll down and locate "Windows Update."
4.  Right-click on "Windows Update" and select "Properties."
5.  Under the "General" tab, ensure that the "Startup type" is set to "Automatic." If it's set to "Manual" or "Disabled," change it to "Automatic."
6.  If the "Service status" is "Stopped," click the "Start" button. If it's already running, click the "Stop" button, wait a few seconds, and then click the "Start" button again to restart it.
7.  Click "Apply" and then "OK."
8.  Restart your computer and try running Windows Update again.

## Step 2: Check and Restart Related Services

The Windows Update service relies on other services to function correctly. If these dependent services are not running, Windows Update will fail. The most critical ones are Background Intelligent Transfer Service (BITS), Cryptographic Services, and Windows Installer.

1.  Open the Services console by typing `services.msc` in the Run dialog box (`Windows key + R`).
2.  Locate and examine the status of the following services:
    *   **Background Intelligent Transfer Service (BITS)**
    *   **Cryptographic Services**
    *   **Windows Installer**
3.  For each of these services, ensure their "Startup type" is set to "Automatic" and their "Service status" is "Running."
4.  If any of these services are stopped, right-click on them, select "Properties," change the "Startup type" to "Automatic," click "Start," and then click "Apply" and "OK."
5.  If they are already running, right-click on them and select "Restart" to refresh their status.
6.  After ensuring all dependent services are running, try restarting the "Windows Update" service again as described in Step 1.

## Step 3: Run the Windows Update Troubleshooter

Microsoft provides a built-in troubleshooter specifically designed to diagnose and fix common Windows Update problems.

1.  Open the Windows Settings app by pressing `Windows key + I`.
2.  Click on "Update & Security" (or "System" > "Troubleshoot" in Windows 11).
3.  In Windows 10, click on "Troubleshoot" in the left-hand pane, then click "Additional troubleshooters." In Windows 11, click "Other troubleshooters."
4.  Find and click on "Windows Update."
5.  Click the "Run the troubleshooter" button.
6.  Follow the on-screen instructions. The troubleshooter will scan for issues and attempt to automatically repair them, including problems with the Windows Update service.
7.  Once the troubleshooter has finished, restart your computer and try updating Windows again.

## Step 4: Reset Windows Update Components

If the troubleshooter doesn't resolve the issue, manually resetting the Windows Update components can often fix persistent problems. This involves stopping the relevant services, renaming the software distribution folders where update files are stored, and then restarting the services.

1.  Open Command Prompt as an administrator. Search for "cmd" in the Start menu, right-click on "Command Prompt," and select "Run as administrator."
2.  In the Command Prompt window, type the following commands, pressing Enter after each one:
    ```bash
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
    These commands stop the Windows Update service and its dependencies.
3.  Next, rename the SoftwareDistribution and catroot2 folders. Type the following commands and press Enter after each:
    ```bash
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
    If you encounter "Access is denied" errors, ensure you are running Command Prompt as administrator and that no Windows Update processes are actively running.
4.  Now, restart the services you stopped earlier by typing and executing these commands:
    ```bash
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close the Command Prompt window and restart your computer. Windows will recreate the SoftwareDistribution folder with fresh files, and the Windows Update service should now function correctly.

## Step 5: Use System File Checker (SFC) and DISM

Corrupted system files can directly impact the Windows Update service. SFC and DISM are powerful tools that can scan for and repair these corrupted files.

1.  Open Command Prompt as an administrator (as described in Step 4).
2.  First, run the System File Checker. Type the following command and press Enter:
    ```bash
    sfc /scannow
    ```
    This process can take some time. It will scan all protected system files and replace corrupted versions with cached copies.
3.  If SFC finds issues it cannot fix, or if the problem persists after running SFC, use the Deployment Image Servicing and Management (DISM) tool. Type the following commands and press Enter after each:
    ```bash
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    These commands will scan for corruption in the Windows image and attempt to repair it.
4.  After both SFC and DISM have completed their scans and repairs, restart your computer and try running Windows Update again.

## Step 6: Check for Malware

Malware can interfere with essential Windows services, including Windows Update. Running a full system scan with your antivirus software can help identify and remove any malicious programs that might be causing the issue. Ensure your antivirus definitions are up-to-date before performing the scan.

## Step 7: Perform a Clean Boot

A clean boot starts Windows with a minimal set of startup programs and services, helping to identify if a third-party application is causing conflicts with the Windows Update service.

1.  Press `Windows key + R`, type `msconfig`, and press Enter to open System Configuration.
2.  In the "Services" tab, check the box that says "Hide all Microsoft services."
3.  Click "Disable all."
4.  Go to the "Startup" tab and click "Open Task Manager."
5.  In Task Manager, disable all startup items by right-clicking on each one and selecting "Disable."
6.  Close Task Manager, and click "OK" in the System Configuration window.
7.  Restart your computer.
8.  Once in the clean boot environment, try to start the Windows Update service and run an update. If it works, then a third-party service or startup item was the cause. You can then re-enable services and startup items one by one (or in small groups) and restart your computer each time to pinpoint the offender.

Common Mistakes

One common mistake is attempting to force the Windows Update service to start manually through the Services console without addressing the underlying cause. If the service is disabled due to corruption or a dependency issue, simply clicking "Start" will likely fail. Another pitfall is using aggressive third-party cleanup utilities that might inadvertently disable or delete critical system files or services related to Windows Update. Users also sometimes forget to restart their computer after making changes, which is crucial for those changes to take effect. Finally, users might skip running the troubleshooter or resetting components, opting for more complex solutions prematurely.

Prevention Tips

To prevent the "Windows Update Service is Not Running" error from recurring, it's essential to maintain a healthy system. Regularly run Windows Update troubleshooter and scan for updates. Avoid using third-party system optimizers or registry cleaners unless you are confident in their functionality and understand the potential risks. Ensure your antivirus software is always up-to-date and performing regular scans. Crucially, always shut down your computer properly rather than forcing a shutdown, as this can help prevent file corruption. Keeping your system and drivers updated through legitimate channels can also contribute to overall system stability.