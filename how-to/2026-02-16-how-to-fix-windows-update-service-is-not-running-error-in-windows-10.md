---
title: "How to Fix \"Windows Update Service is Not Running\" Error in Windows 10"
date: "2026-02-16T02:03:47.390Z"
slug: "how-to-fix-windows-update-service-is-not-running-error-in-windows-10"
type: "how-to"
description: "Resolve the \"Windows Update Service is Not Running\" error in Windows 10 with this comprehensive, step-by-step guide. Learn common causes, solutions, and prevention tips."
keywords: "Windows Update service not running, Windows 10 update error, fix Windows Update, Windows Update troubleshooter, DISM, SFC scan, reset Windows Update components, service host local system"
---

When your Windows 10 system displays the frustrating "Windows Update Service is Not Running" error, it effectively halts your ability to download and install critical updates. This means you're missing out on vital security patches, performance improvements, and new features from Microsoft. You might encounter this message directly within the Windows Update settings page, often accompanied by a red "Fix issues" button or simply a spinning wheel that never resolves, preventing you from checking for, downloading, or installing any updates. The system might report error codes like 0x80070422 or 0x80070005, or it might just tell you that the service needed to update Windows isn't operational.

This isn't just an inconvenience; it's a security risk. Without regular updates, your system becomes vulnerable to new threats and exploits. You might also find other related services failing, or experience general system instability because underlying dependencies for many Windows functions rely on a healthy and up-to-date operating system. The inability to update can leave you with outdated drivers, compatibility issues, and a less secure computing experience overall.

### Why It Happens

The "Windows Update Service is Not Running" error typically stems from a few core issues that prevent the essential Windows Update service (wuauserv) from starting or operating correctly. One of the most common reasons is that the service itself has been inadvertently disabled, either manually by a user, by a third-party application, or due to a system glitch. Sometimes, even if set to "Automatic," the service might fail to start due to dependency issues with other critical Windows services like Background Intelligent Transfer Service (BITS) or Workstation service.

Beyond simple service status, underlying corruption within system files or the Windows Update component store can also trigger this error. Malicious software, overzealous antivirus programs, or even incorrect registry entries can interfere with the service's ability to initialize or connect to Microsoft's update servers. When these core components are damaged or misconfigured, Windows Update loses its ability to function, resulting in the "service not running" message.

### Step-by-Step Solution

Let's walk through a series of steps to diagnose and fix the "Windows Update Service is Not Running" error. It's best to follow them in order.

## Step 1: Verify and Start the Windows Update Service

The first and most straightforward step is to check if the Windows Update service is actually running and set to start automatically.

1.  Press `Win + R` to open the Run dialog box.
2.  Type `services.msc` and press Enter. This will open the Services management console.
3.  In the Services window, scroll down and locate **Windows Update**.
4.  Right-click on **Windows Update** and select **Properties**.
5.  In the Properties window, ensure the **Startup type** is set to **Automatic**.
6.  Check the **Service status**. If it's "Stopped," click the **Start** button.
7.  Click **Apply** and then **OK**.
8.  While you're here, also check the **Background Intelligent Transfer Service (BITS)** and **Workstation** services. Ensure their **Startup type** is also set to **Automatic** (or Manual for BITS if Automatic isn't available) and that they are **Running**. Start them if they are stopped.
9.  Close the Services window and try to run Windows Update again.

## Step 2: Run the Windows Update Troubleshooter

Windows 10 includes built-in troubleshooters designed to automatically detect and fix common issues, including problems with Windows Update.

1.  Press `Win + I` to open the Settings app.
2.  Click on **Update & Security**.
3.  In the left-hand menu, click on **Troubleshoot**.
4.  Under "Get up and running," select **Windows Update**.
5.  Click **Run the troubleshooter**.
6.  Allow the troubleshooter to scan for issues and apply recommended fixes. Follow any on-screen prompts.
7.  Once completed, restart your computer and try checking for updates again.

## Step 3: Reset Windows Update Components Manually

If the troubleshooter didn't solve the issue, resetting the Windows Update components can often clear out corrupted temporary files and settings. This involves stopping related services, clearing specific folders, and then restarting the services.

1.  Type `cmd` in the Windows search bar, right-click on **Command Prompt**, and select **Run as administrator**.
2.  Once the Command Prompt opens, execute the following commands one by one, pressing Enter after each:
    ```cmd
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
    (These commands stop the Windows Update Service, Cryptographic Services, Background Intelligent Transfer Service, and the Windows Installer Service.)
3.  Next, rename the SoftwareDistribution and Catroot2 folders, which store temporary update files:
    ```cmd
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
    (If you get an "access denied" error, ensure you ran Command Prompt as administrator and that all services are stopped.)
4.  Now, restart the services you stopped earlier:
    ```cmd
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close Command Prompt and restart your computer. Then, try to run Windows Update.

## Step 4: Check for System File Corruption (SFC Scan)

Corrupted system files can sometimes prevent Windows services from running correctly. The System File Checker (SFC) tool can scan for and repair these files.

1.  Type `cmd` in the Windows search bar, right-click on **Command Prompt**, and select **Run as administrator**.
2.  In the Command Prompt window, type `sfc /scannow` and press Enter.
3.  The scan will take some time to complete. Do not close the window until the verification is 100% complete.
4.  Once finished, you might see one of several messages:
    *   "Windows Resource Protection did not find any integrity violations." (No issues found)
    *   "Windows Resource Protection found corrupt files and successfully repaired them." (Issues found and fixed)
    *   "Windows Resource Protection found corrupt files but was unable to fix some of them." (Some issues remain)
5.  If issues were found and repaired, restart your PC and then attempt to update Windows. If issues remained unfixed, proceed to Step 5.

## Step 5: Run the DISM Tool

If SFC found unfixable corruption, or if the problem persists, the Deployment Image Servicing and Management (DISM) tool can repair the Windows system image, which SFC relies on.

1.  Type `cmd` in the Windows search bar, right-click on **Command Prompt**, and select **Run as administrator**.
2.  Execute the following commands one by one, pressing Enter after each:
    ```cmd
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    *   `/CheckHealth` checks for corruption quickly.
    *   `/ScanHealth` performs a more advanced scan.
    *   `/RestoreHealth` attempts to repair the system image using Windows Update to download necessary files. This command can take a long time to complete and might seem stuck at 20% or 40% — be patient.
3.  After `DISM /Online /Cleanup-Image /RestoreHealth` completes, restart your computer.
4.  Once rebooted, run the `sfc /scannow` command again (as in Step 4) to ensure any remaining corrupted files are fixed.
5.  Finally, try checking for Windows Updates.

## Step 6: Perform a Clean Boot

Sometimes, third-party software or startup programs can conflict with Windows Update. A clean boot starts Windows with a minimal set of drivers and startup programs, helping you identify if a third-party application is the culprit.

1.  Press `Win + R`, type `msconfig`, and press Enter to open System Configuration.
2.  Go to the **Services** tab.
3.  Check the box that says **Hide all Microsoft services**.
4.  Click **Disable all**.
5.  Go to the **Startup** tab.
6.  Click **Open Task Manager**.
7.  In Task Manager, go through each startup item, select it, and click **Disable**. Do this for all items.
8.  Close Task Manager.
9.  Back in the System Configuration window, click **Apply** and then **OK**.
10. When prompted, click **Restart**.
11. After your PC restarts in a clean boot state, try to run Windows Update. If it works, a third-party application is causing the issue. You can then re-enable services and startup items incrementally (a few at a time) to identify the specific conflicting program. Remember to return to `msconfig` and set your system back to "Normal startup" once troubleshooting is complete.

### Common Mistakes

When troubleshooting the "Windows Update Service is Not Running" error, users often make a few common mistakes that can hinder their progress or even worsen the situation. One frequent oversight is not running Command Prompt or PowerShell as an administrator. Without administrative privileges, many critical commands, especially those that stop services or modify system files, will fail with "Access Denied" errors, leading to frustration and the belief that the fix isn't working.

Another common pitfall is not restarting the computer after significant changes, such as running troubleshooters or resetting update components. While some changes take effect immediately, a full reboot ensures all services are properly reinitialized and cached information is cleared, providing a fresh state for Windows Update to function. Skipping steps or not following the exact command syntax can also lead to incomplete fixes, so it's crucial to be meticulous and patient throughout the process.

### Prevention Tips

Preventing the "Windows Update Service is Not Running" error largely involves maintaining a healthy and secure Windows environment. Regularly running system maintenance tasks can significantly reduce the chances of encountering this issue. This includes periodically running the Windows Update troubleshooter as a preventative measure, ensuring your antivirus software is up-to-date and performing regular scans, and uninstalling any unnecessary or suspicious third-party applications that might interfere with system services.

Additionally, always ensure you have enough free disk space on your C: drive, as a lack of space can impede the Windows Update process. Avoid manually disabling critical system services unless you are certain of their function. If you encounter performance issues, address them promptly rather than letting them fester, as underlying system instability can sometimes manifest as update service errors. By keeping your system clean, secure, and well-maintained, you can significantly improve the reliability of Windows Update.