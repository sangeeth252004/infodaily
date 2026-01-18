---
title: "How to Fix \"Windows Update Service Not Running\" Error in Windows 10"
date: "2026-01-18T20:21:50.286Z"
slug: "how-to-fix-windows-update-service-not-running-error-in-windows-10"
type: "how-to"
description: "Resolved the \"Windows Update Service Not Running\" error in Windows 10 with this comprehensive, step-by-step guide. Learn why it happens and how to fix it."
keywords: "Windows Update Service, Windows 10, error, fix, not running, troubleshooting, service not starting, update issues"
---

## Problem Explanation

Have you ever tried to check for or install Windows updates, only to be met with a frustrating message indicating that Windows Update isn't working correctly? A common culprit behind this is the "Windows Update Service not running" error. This often appears as a message like "Windows Update can't check for updates because a required service isn't running." or simply a persistent inability to initiate or complete any update processes. Your system might feel stuck, unable to access critical security patches, feature updates, or even driver updates, leaving it vulnerable and potentially performing suboptimally.

When this service fails to start or crashes unexpectedly, your Windows operating system loses its connection to the update servers, preventing any download or installation of new software. This can be particularly alarming when you know there are important security updates pending that could protect your system from malware and other online threats. The inability to update can lead to a cascade of other issues, making this a problem that needs prompt attention.

## Why It Happens

The "Windows Update Service not running" error can stem from several underlying causes, often related to system file corruption, conflicting software, or incorrect service configurations. One of the most frequent reasons is damage or deletion of critical files associated with the Windows Update service itself. This can occur due to aggressive antivirus scans, unexpected system shutdowns, or even issues during previous update installations. When these essential files are compromised, the service simply cannot start.

Another common factor is interference from third-party applications, particularly those that modify system settings or run in the background. Antivirus programs, system optimizers, or even certain VPNs can sometimes mistakenly flag Windows Update components as a threat or conflict with the service's operations, leading it to stop or fail to launch. Additionally, incorrect registry settings or corrupted Windows Update components can also prevent the service from functioning as intended.

## Step-by-Step Solution

Let's walk through a series of steps designed to get your Windows Update service back up and running.

### ## Step 1: Restart the Windows Update Service

Often, a simple restart can resolve temporary glitches.

1.  Press the `Windows key + R` on your keyboard to open the Run dialog box.
2.  Type `services.msc` and press Enter or click OK. This will open the Services window.
3.  Scroll down the list and locate "Windows Update."
4.  Right-click on "Windows Update" and select "Restart."
5.  If "Restart" is grayed out, it likely means the service isn't running. In this case, right-click again and select "Start."
6.  Once it's started, right-click "Windows Update" one more time and select "Properties."
7.  Under the "General" tab, ensure that the "Startup type" is set to "Automatic." If it's not, change it to "Automatic" and click "Apply," then "OK."
8.  Now, try checking for updates again.

### ## Step 2: Run the Windows Update Troubleshooter

Microsoft provides a built-in troubleshooter specifically designed to fix common Windows Update issues.

1.  Open the **Settings** app by pressing `Windows key + I`.
2.  Click on **Update & Security**.
3.  In the left-hand menu, select **Troubleshoot**.
4.  Click on **Additional troubleshooters**.
5.  Find and click on **Windows Update**.
6.  Click the **Run the troubleshooter** button.
7.  Follow the on-screen prompts. The troubleshooter will attempt to identify and fix any problems with Windows Update.

### ## Step 3: Check and Restart Related Services

The Windows Update service relies on other services to function correctly. We need to ensure these are also running and set to start automatically.

1.  Open the Services window again by typing `services.msc` in the Run dialog box (`Windows key + R`).
2.  Locate and check the status of the following services:
    *   **Background Intelligent Transfer Service (BITS)**
    *   **Cryptographic Services**
    *   **Microsoft Background Intelligent Transfer Service (MSIServer)**
    *   **Windows Installer**
3.  For each of these services, if they are not running, right-click and select "Start."
4.  If they are running, right-click and select "Restart."
5.  After ensuring they are running, right-click on each service, select "Properties," and verify that the "Startup type" is set to "Automatic." Adjust if necessary and click "Apply" then "OK."

### ## Step 4: Use the System File Checker (SFC) and DISM Tools

Corrupted system files can prevent services from starting. SFC and DISM can help repair these.

1.  Press the `Windows key` and type `cmd`.
2.  Right-click on **Command Prompt** in the search results and select **Run as administrator**.
3.  In the administrator Command Prompt window, type the following command and press Enter:
    ```bash
    sfc /scannow
    ```
    This command will scan for and attempt to repair corrupted system files. This process can take some time.
4.  Once SFC has completed, even if it found no issues, run the DISM (Deployment Image Servicing and Management) tool. Type the following command and press Enter:
    ```bash
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    This command will download and replace any corrupted files in your Windows image.
5.  After both commands have finished, restart your computer.

### ## Step 5: Reset Windows Update Components

If the above steps haven't worked, the Windows Update components themselves might be corrupted. This involves stopping certain services, renaming some folders, and then restarting the services.

1.  Open **Command Prompt as administrator** (as described in Step 4).
2.  Stop the Windows Update-related services by typing the following commands, pressing Enter after each one:
    ```bash
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the Software Distribution and Catroot2 folders. Type the following commands and press Enter after each:
    ```bash
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
    *Note: If you encounter errors saying the folders are in use, ensure all the services from the previous step were stopped correctly. You might need to restart your computer and try this step again if problems persist.*
4.  Restart the Windows Update-related services by typing the following commands and pressing Enter after each:
    ```bash
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close the Command Prompt and restart your computer. After restarting, the system will recreate the necessary folders, and you can try checking for updates.

### ## Step 6: Check for Malware Interference

Malware can sometimes disable or corrupt Windows Update services to prevent itself from being detected and removed.

1.  Ensure your antivirus software is up to date.
2.  Run a full system scan with your antivirus program.
3.  If you don't have a preferred antivirus, consider using Microsoft Defender (built into Windows 10) by searching for "Windows Security" in the Start menu and running a full scan from there.
4.  If any threats are detected, follow your antivirus program's instructions to quarantine or remove them.
5.  After the scan, restart your computer and try checking for updates.

## Common Mistakes

A frequent mistake when troubleshooting the "Windows Update Service not running" error is not running commands or troubleshooters with administrator privileges. Many system-level operations require elevated permissions, and if you don't run them as an administrator, they will fail or have no effect. Another common pitfall is rushing the process; commands like `sfc /scannow` and the DISM tool can take a significant amount of time to complete, and interrupting them prematurely can sometimes lead to further system issues.

Users also sometimes forget to restart their computer after making significant changes to services or running system repair tools. A restart is crucial for Windows to properly apply these changes and load the services correctly. Finally, some individuals might jump to more drastic solutions like system restore or even a clean installation without exhausting simpler, less invasive troubleshooting steps first, which can be time-consuming and lead to data loss if not done carefully.

## Prevention Tips

To help prevent the "Windows Update Service not running" error from recurring, it's essential to maintain a healthy and well-managed Windows environment. Regularly running Windows Updates is paramount; by keeping your system updated, you patch vulnerabilities that malware might exploit to disable services. Ensure your antivirus software is always active and up-to-date, and avoid installing questionable software from untrusted sources, as these can often interfere with system processes.

Furthermore, be cautious with third-party system optimization tools. While some can be helpful, others can be too aggressive and may inadvertently disable or corrupt essential Windows services. Stick to reputable tools and understand what changes they are making to your system. Regularly performing disk cleanup and checking for hard drive errors can also contribute to overall system stability, reducing the chances of file corruption that could affect Windows Update.