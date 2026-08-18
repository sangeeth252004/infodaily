---
title: "How to Fix \"Windows Update Service is Not Running\" Error"
date: "2026-08-18T20:20:57.110Z"
slug: "how-to-fix-windows-update-service-is-not-running-error"
type: "how-to"
description: "Learn how to resolve the common \"Windows Update Service is Not Running\" error with this easy-to-follow, step-by-step guide. Fix your Windows updates today!"
keywords: "Windows Update Service, Windows Update not running, fix update service, troubleshoot Windows updates, Windows update error, update service not started"
---

**Problem Explanation**

You're trying to update your Windows operating system, perhaps to get the latest security patches or new features, but it's just not happening. Instead of a smooth update process, you're met with an error message. A particularly frustrating and common one is the "Windows Update service is not running" error. This message directly tells you that a critical background process, the one responsible for managing and downloading updates, has stopped working. Consequently, Windows Update is unable to perform its duties, leaving your system vulnerable and preventing you from accessing the latest improvements. You might see this message pop up in the Windows Update settings, or you might receive a more general error code indicating a problem with the update service itself.

When this error occurs, you'll likely find that clicking the "Check for updates" button does nothing, or it immediately returns an error. No new updates will be downloaded or installed, and you'll be stuck in a loop of failed attempts. This can be particularly concerning as Windows updates are crucial for maintaining the security and stability of your computer. Without them, your system is more susceptible to malware and performance issues.

**Why It Happens**

The "Windows Update service is not running" error typically stems from issues with the Windows Update service itself, or its dependencies. This service, officially named "Windows Update" (wuauserv), relies on other system services to function correctly. The most prominent of these dependencies are the "Background Intelligent Transfer Service" (BITS) and the "Cryptographic Services." If either of these underlying services is stopped or encounters an error, it can prevent the Windows Update service from starting or running as expected.

Other common culprits include corrupted system files, conflicting third-party software (like aggressive antivirus programs that might mistakenly flag update components as malicious), or even a corrupted Windows Update cache. Sometimes, a previous failed update can leave the service in an inconsistent state, leading to it failing to start on subsequent attempts. Essentially, something is preventing the engine that drives Windows updates from turning over.

**Step-by-Step Solution**

Here's a comprehensive guide to help you get your Windows Update service back on track:

## Step 1: Restart the Windows Update Service

Often, the simplest solution is the most effective. A quick restart can resolve temporary glitches.

1.  Press the **Windows Key + R** on your keyboard to open the Run dialog box.
2.  Type `services.msc` and press **Enter** or click **OK**. This will open the Services window.
3.  Scroll down in the list of services and find **Windows Update**.
4.  Right-click on **Windows Update** and select **Restart**.
5.  If the service is not running, you'll see **Start** instead of Restart. Click **Start**.
6.  Once the service has restarted, try checking for updates again.

## Step 2: Restart Dependent Services (BITS and Cryptographic Services)

The Windows Update service relies on other services to function. If these are not running, it can cause problems.

1.  Open the **Services** window again by following steps 1-3 from Step 1.
2.  Locate **Background Intelligent Transfer Service (BITS)**. Right-click on it and select **Restart**. If it's not running, select **Start**.
3.  Next, find **Cryptographic Services**. Right-click on it and select **Restart**. If it's not running, select **Start**.
4.  After restarting these services, attempt to check for Windows updates once more.

## Step 3: Run the Windows Update Troubleshooter

Microsoft provides a built-in troubleshooter designed to automatically detect and fix common Windows Update problems.

1.  Press the **Windows Key + I** to open Settings.
2.  Click on **Update & Security** (or **System > Troubleshoot** on Windows 11).
3.  Select **Troubleshoot** from the left-hand menu.
4.  Click on **Additional troubleshooters** (or **Other troubleshooters** on Windows 11).
5.  Find and click on **Windows Update**.
6.  Click **Run the troubleshooter**.
7.  Follow the on-screen prompts. The troubleshooter will scan for issues and attempt to resolve them.

## Step 4: Reset Windows Update Components

Corrupted update files or a cluttered cache can prevent the service from running. This step involves stopping the update service, renaming the software distribution folders (which essentially clears the cache), and then restarting the service.

1.  Open **Command Prompt as Administrator**. To do this, type `cmd` in the Windows search bar, right-click on **Command Prompt**, and select **Run as administrator**.
2.  In the Command Prompt window, type the following commands, pressing **Enter** after each one:
    *   `net stop wuauserv`
    *   `net stop cryptSvc`
    *   `net stop bits`
    *   `net stop msiserver`
3.  Now, you need to rename the Software Distribution and catroot2 folders. Type the following commands, pressing **Enter** after each one:
    *   `ren C:\Windows\SoftwareDistribution SoftwareDistribution.old`
    *   `ren C:\Windows\System32\catroot2 catroot2.old`
4.  Finally, restart the services by typing these commands and pressing **Enter** after each:
    *   `net start wuauserv`
    *   `net start cryptSvc`
    *   `net start bits`
    *   `net start msiserver`
5.  Close the Command Prompt and restart your computer. After restarting, try checking for updates.

## Step 5: Check for Corrupted System Files using SFC and DISM

Corrupted system files can interfere with various Windows services, including Windows Update. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can help repair these.

1.  Open **Command Prompt as Administrator** (as described in Step 4).
2.  Type the following command and press **Enter**:
    *   `sfc /scannow`
    *   This command will scan for and attempt to repair corrupted system files. It may take some time.
3.  Once the SFC scan is complete, even if it reports no issues, it's a good idea to run DISM. Type the following command and press **Enter**:
    *   `DISM /Online /Cleanup-Image /RestoreHealth`
    *   This command checks for and repairs corrupted Windows images.
4.  After both scans are finished, restart your computer and try checking for updates.

## Step 6: Scan for Malware

Malware can interfere with system services, including Windows Update. Running a full system scan can help rule this out.

1.  Ensure your antivirus software is up to date.
2.  Open your antivirus program.
3.  Perform a **full system scan**.
4.  If any threats are detected, follow your antivirus program's instructions to remove them.
5.  Restart your computer and try checking for updates.

## Step 7: Manually Re-register Windows Update DLL Files

In rare cases, the dynamic-link library (DLL) files that Windows Update relies on might become unregistered. Re-registering them can help.

1.  Open **Command Prompt as Administrator** (as described in Step 4).
2.  Type the following commands, pressing **Enter** after each one. You will see messages indicating success or failure for each.
    *   `regsvr32 wuapi.dll`
    *   `regsvr32 wuaueng.dll`
    *   `regsvr32 wups2.dll`
    *   `regsvr32 wucltui.dll`
    *   `regsvr32 msxml3.dll`
    *   `regsvr32 msxml6.dll`
    *   `regsvr32 jscript.dll`
    *   `regsvr32 vbscript.dll`
3.  After attempting to re-register these files, restart your computer. Then, try checking for updates.

**Common Mistakes**

One of the most common mistakes people make is not running the Command Prompt or Services window "as administrator." Many of these crucial troubleshooting steps require elevated privileges to make changes to system files and services. Failing to do so means your commands or actions will simply fail without providing a clear error, leading to further confusion. Another frequent pitfall is not restarting the computer after making significant changes, such as resetting update components or running SFC/DISM scans. These changes often require a system reboot to take full effect. Lastly, some users might try to manually delete files from the Software Distribution folder without stopping the Windows Update service first. This can lead to file in-use errors or even further corruption.

**Prevention Tips**

To prevent the "Windows Update service is not running" error from recurring, maintain a healthy system. Ensure you have a reliable antivirus program and run regular scans to keep malware at bay, as infections are a significant cause of service disruptions. Keep your system drivers updated, as outdated or corrupted drivers can sometimes cause conflicts. Avoid installing too many third-party system optimization or cleaning tools, as they can sometimes interfere with essential Windows services. Finally, ensure that Windows is allowed to install updates promptly when they are available. Delayed updates can sometimes lead to more significant issues down the line. Regularly checking the status of your Windows Update service and its dependencies through the `services.msc` tool can also help you catch potential problems early.