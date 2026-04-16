---
title: "How to Fix \"Windows Update Service is Not Running\" Error"
date: "2026-04-16T16:22:28.319Z"
slug: "how-to-fix-windows-update-service-is-not-running-error"
type: "how-to"
description: "Resolve the \"Windows Update Service is Not Running\" error with this comprehensive, step-by-step guide. Learn why it happens and how to fix it."
keywords: "Windows Update not running, Windows Update service error, fix Windows Update, Windows Update troubleshoot, Windows Update service stopped, Windows update problem"
---

# How to Fix "Windows Update Service is Not Running" Error

Encountering the dreaded "Windows Update Service is Not Running" error can be incredibly frustrating. This problem prevents your Windows operating system from downloading and installing crucial updates, leaving your system vulnerable to security threats and missing out on new features and performance improvements. You might see messages like "Windows Update couldn't check for updates because the service isn't running. You may need to restart your computer," or simply find that Windows Update shows an endless loop of checking for updates without any progress.

This error indicates that the essential Windows Update service, responsible for managing the entire update process, has either stopped unexpectedly or is failing to start. Without this service, your computer cannot communicate with Microsoft's update servers, retrieve update files, or install them correctly. It's a roadblock that many Windows users have faced at some point, and thankfully, there are several effective ways to get it back on track.

## Why It Happens

The Windows Update service can stop running for a variety of reasons, often stemming from software conflicts, corrupted system files, or incorrect service configurations. Sometimes, a previous failed update attempt can leave the service in an unstable state. Other common culprits include third-party antivirus or firewall software that might mistakenly interfere with the update process, or even malware that has disabled the service to prevent its own detection and removal.

Occasionally, registry issues or corrupted Windows Update components can also lead to the service failing to start or stay running. It’s a complex system, and any disruption in its normal operation can trigger this error. Understanding these potential causes helps in diagnosing and applying the right fix.

## Step-by-Step Solution

Here's a comprehensive guide to help you get the Windows Update service running again:

### Step 1: Restart the Windows Update Service Manually

The simplest solution is often the most effective. We'll try to start the service directly.

1.  Press the **Windows key + R** on your keyboard to open the Run dialog box.
2.  Type `services.msc` and press **Enter** or click **OK**. This will open the Services window.
3.  In the Services window, scroll down and find **Windows Update**.
4.  Right-click on **Windows Update** and select **Start**.
5.  If the service was already stopped, it should now start. If it was running but still causing issues, right-click it again and select **Restart**.
6.  After restarting the service, try running Windows Update again by going to **Settings > Update & Security > Windows Update**.

### Step 2: Check Dependencies for the Windows Update Service

The Windows Update service relies on other services to function correctly. If these dependent services are not running, Windows Update itself may fail.

1.  Open the Services window as described in Step 1 (Run dialog box: `services.msc`).
2.  Locate **Windows Update** and double-click it to open its Properties.
3.  In the Windows Update Properties window, go to the **Dependencies** tab.
4.  You will see a list of services that the Windows Update service depends on. Note these down.
5.  Go back to the main Services window and ensure that all of these listed dependent services are running. If any are stopped, right-click them and select **Start**. For each dependent service, you may need to check *its* dependencies as well by following the same process.
6.  Common dependencies include **Background Intelligent Transfer Service (BITS)** and **Cryptographic Services**. Ensure these are running and set to start automatically.

### Step 3: Run the Windows Update Troubleshooter

Microsoft provides a built-in troubleshooter designed to automatically detect and fix common Windows Update problems.

1.  Open **Settings** by pressing **Windows key + I**.
2.  Click on **Update & Security** (or **System > Troubleshoot** in Windows 11).
3.  Select **Troubleshoot** from the left-hand menu.
4.  Click on **Additional troubleshooters**.
5.  Find and click on **Windows Update**.
6.  Click **Run the troubleshooter** and follow any on-screen prompts. The troubleshooter will scan for issues and attempt to resolve them automatically.

### Step 4: Use the Command Prompt to Repair Corrupted System Files

Corrupted system files can interfere with the operation of various Windows services. The System File Checker (SFC) tool can scan for and repair these files.

1.  Press **Windows key + X** and select **Command Prompt (Admin)** or **Windows PowerShell (Admin)**. If prompted by User Account Control, click **Yes**.
2.  In the Command Prompt window, type the following command and press **Enter**:
    ```
    sfc /scannow
    ```
3.  This process can take some time. Once it's complete, it will report whether it found and fixed any issues.
4.  After the SFC scan, it's also beneficial to run the Deployment Image Servicing and Management (DISM) tool to repair the Windows image itself. Type the following command and press **Enter**:
    ```
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
5.  This command also takes time to complete. Once both commands are finished, restart your computer and try running Windows Update again.

### Step 5: Reset the Windows Update Components

If the above steps don't work, the Windows Update components themselves might be corrupted. This involves stopping the relevant services, renaming the distribution folders, and then restarting the services.

1.  Open **Command Prompt (Admin)** or **Windows PowerShell (Admin)** as described in Step 4.
2.  Stop the Windows Update-related services by typing these commands one by one and pressing **Enter** after each:
    ```
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the Software Distribution and Catroot2 folders. These folders store downloaded update files and related information. Type these commands and press **Enter** after each:
    ```
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
4.  Restart the services you stopped earlier. Type these commands and press **Enter** after each:
    ```
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close the Command Prompt and restart your computer. Windows will recreate the necessary folders, and you can then try running Windows Update.

### Step 6: Check for Malware

Malware can actively disable services like Windows Update to prevent your system from being secured. Running a full scan with your antivirus software is a crucial step.

1.  Ensure your antivirus software is up-to-date.
2.  Perform a full system scan. This might take a while, so it's best to do it when you can afford to leave your computer running.
3.  If your current antivirus software doesn't detect anything or you suspect it might be compromised, consider using a reputable on-demand malware scanner (like Malwarebytes) for a second opinion.
4.  If malware is detected, follow the antivirus program's instructions to remove it. After cleaning, restart your computer and try running Windows Update.

### Step 7: Configure Windows Update Service Startup Type

Ensuring the Windows Update service is set to start automatically is vital for its continuous operation.

1.  Open the Services window (Run dialog: `services.msc`).
2.  Locate **Windows Update**, right-click it, and select **Properties**.
3.  In the Windows Update Properties window, find the **Startup type** dropdown menu.
4.  Select **Automatic** from the dropdown.
5.  If the service is stopped, click the **Start** button.
6.  Click **Apply** and then **OK**.
7.  Restart your computer.

## Common Mistakes

One common mistake is forgetting to restart the computer after making changes to services or running system repair tools. Many of these changes require a system reboot to take full effect. Another pitfall is attempting to manually download and install updates from unofficial sources when the service is malfunctioning. This can lead to installing incorrect or even malicious software. Rushing through the steps without verifying that each command has completed successfully or without checking for error messages can also cause further complications. Lastly, users sometimes overlook the possibility of third-party software interference, particularly antivirus programs, and focus solely on Windows-native tools.

## Prevention Tips

To prevent the "Windows Update Service is Not Running" error from recurring, regularly maintain your system. Keep your antivirus software up-to-date and schedule regular full system scans. Avoid installing software from untrusted sources, as this is a common vector for malware that can disable essential services. Ensure that Windows Update itself is configured to run automatically and that you don't habitually disable services or tamper with system configurations unless you fully understand the implications. Periodically running `sfc /scannow` and DISM commands as part of your system maintenance can also help preemptively fix corrupted files before they impact services. Finally, ensure your internet connection is stable, as intermittent connectivity can sometimes disrupt the update process and cause service issues.