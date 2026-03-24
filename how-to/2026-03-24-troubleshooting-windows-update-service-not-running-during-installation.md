---
title: "Troubleshooting \"Windows Update Service Not Running\" During Installation"
date: "2026-03-24T20:40:35.495Z"
slug: "troubleshooting-windows-update-service-not-running-during-installation"
type: "how-to"
description: "Resolve the \"Windows Update Service Not Running\" error encountered during Windows installation with this comprehensive step-by-step guide."
keywords: "Windows Update Service, Windows Installation Error, Service Not Running, Fix Installation, Windows Update Stuck, Troubleshoot Windows Update"
---

## Problem Explanation

During the process of installing or upgrading Windows, users may encounter a critical error message indicating that the "Windows Update service is not running." This often manifests as a halt in the installation progress, preventing the system from downloading or applying necessary updates or components required for a successful setup. The installation might become stuck at a specific percentage, or a dialog box might appear stating that the update service cannot be started or is inaccessible. This error is particularly frustrating as it directly impedes the core functionality of the Windows setup process, leaving the system in an incomplete or unusable state.

When this issue occurs, the installation wizard typically cannot proceed because it relies on the Windows Update service to fetch and install critical files, drivers, or feature updates that are part of the installation package. Without a running Windows Update service, the installation is fundamentally unable to complete its tasks, leading to the observed standstill or explicit error message. This can occur during clean installations, in-place upgrades, or even when applying major feature updates through the Windows Update interface itself, though the focus here is specifically on the installation phase.

## Why It Happens

The "Windows Update service is not running" error during installation typically arises due to a conflict or corruption within the Windows Update components or their dependencies. During the setup phase, the installer attempts to initialize various system services, including the Windows Update service (wuauserv). If this service is not configured correctly, is disabled by a previous configuration, or its associated files are corrupted, the installation process will fail. This corruption can stem from various sources, including incomplete previous updates, interference from third-party software (like antivirus programs that might aggressively scan installation processes), or issues with the system image being used for installation.

Another common cause is incorrect service dependencies. The Windows Update service relies on other services to function, such as the Cryptographic Services, Background Intelligent Transfer Service (BITS), and DCOM Server Process Launcher. If any of these prerequisite services are not running or are misconfigured, the Windows Update service will fail to start. During installation, these dependencies might not be set up correctly within the temporary environment the installer is working in, leading to the service failing to launch when called upon. Disk errors or a lack of sufficient disk space can also indirectly contribute by preventing services from starting correctly or corrupting essential files.

## Step-by-Step Solution

### ## Step 1: Accessing Command Prompt with Administrator Privileges

This is the initial and most crucial step to gain the necessary permissions to manage system services.

1.  **Boot from Windows Installation Media:** Insert your Windows installation USB drive or DVD into the computer and boot from it. You may need to adjust your BIOS/UEFI settings to prioritize booting from the USB/DVD.
2.  **Enter Windows Setup:** Proceed through the initial language and keyboard layout selections.
3.  **Access Repair Options:** On the "Install now" screen, look for and click on the **"Repair your computer"** link, usually located in the bottom-left corner.
4.  **Navigate to Command Prompt:** In the "Choose an option" screen, select **"Troubleshoot"**, then **"Advanced options"**, and finally **"Command Prompt"**. This will open a command prompt window with administrative privileges within the Windows Preinstallation Environment (WinPE).

### ## Step 2: Checking and Starting Dependent Services

We need to ensure that the services that Windows Update relies on are running.

1.  **Identify Dependent Services:** The key services are BITS, Cryptographic Services, and Windows Update itself.
2.  **Check Service Status:** In the Command Prompt, type the following commands one by one and press Enter after each:
    *   `sc query bits` (Checks the status of the Background Intelligent Transfer Service)
    *   `sc query cryptsvc` (Checks the status of the Cryptographic Services)
    *   `sc query wuauserv` (Checks the status of the Windows Update service)
3.  **Start Services (if stopped):** If any of these services are reported as "STOPPED," you can attempt to start them. Use these commands, replacing `STOPPED` with `START` if necessary for the `sc start` command (though `sc start` is the primary command to use):
    *   `sc start bits`
    *   `sc start cryptsvc`
    *   `sc start wuauserv`
4.  **Verify Status:** After attempting to start them, run the `sc query` commands again to confirm they are now "RUNNING."

### ## Step 3: Restarting Windows Update Components Manually

Sometimes, the update components themselves might be corrupted and require a reset.

1.  **Stop Services:** In the Command Prompt (ensure you are still in the WinPE environment), stop the Windows Update service and the BITS service:
    *   `net stop wuauserv`
    *   `net stop bits`
2.  **Rename SoftwareDistribution and catroot2 Folders:** These folders store Windows Update files and are a common source of corruption. Renaming them forces Windows to recreate them upon the next service start.
    *   Navigate to the `SoftwareDistribution` folder: `cd %SystemRoot%\SoftwareDistribution` (This might not work directly in WinPE, so we'll use direct paths).
    *   Instead, use direct paths to rename:
        *   `ren %SystemRoot%\SoftwareDistribution SoftwareDistribution.old`
        *   `ren %SystemRoot%\System32\catroot2 catroot2.old`
        *(Note: If you encounter errors stating the folder is in use, this might indicate an issue with the underlying installation environment. Proceed cautiously.)*
3.  **Restart Services:** Start the services again:
    *   `net start wuauserv`
    *   `net start bits`

### ## Step 4: Registering Missing DLL Files

Critical DLL files for the Windows Update service might be unregistered or missing.

1.  **Execute Registration Commands:** In the Command Prompt, carefully type and execute the following commands. Press Enter after each one. This process can take a few minutes.
    *   `regsvr32 wuapi.dll`
    *   `regsvr32 wuaueng.dll`
    *   `regsvr32 qmgr.dll`
    *   `regsvr32 msxml3.dll`
    *   `regsvr32 msxml2.sax`
    *   `regsvr32 msxml6.dll`
    *   `regsvr32 jscript.dll`
    *   `regsvr32 vbscript.dll`
    *   `regsvr32 wintrust.dll`
    *   `regsvr32 initpki.dll`
    *   `regsvr32 wuwebv.dll`
    *   `regsvr32 cryptui.dll`
    *   `regsvr32 wucltux.dll`
    *   `regsvr32 wups.dll`
    *   `regsvr32 wuobundle.dll`
    *   `regsvr32 wups2.dll`
    *   `regsvr32 wuipolicymanager.dll`
    *   `regsvr32 wuaupdateprovider.dll`
    *   `regsvr32 wuwebadmin.dll`
    *   `regsvr32 wuautil.dll`
    *   `regsvr32 wucltui.dll`
    *   `regsvr32 wucltui.dll` (This one might appear twice, it's safe to run it again).
2.  **Confirm Registration:** You should receive a confirmation message for each successful registration (e.g., "DllRegisterServer in wuapi.dll succeeded"). If you get an error like "0x80070002" or "0x8007007e", it may indicate a deeper issue or that the file is indeed missing.

### ## Step 5: Manually Starting the Windows Module Installer Service

This service is crucial for installing Windows updates and components.

1.  **Check Status:** In the Command Prompt, type:
    *   `sc query trustedinstaller`
2.  **Start Service:** If it's stopped, try starting it:
    *   `sc start trustedinstaller`
3.  **Verify:** Check its status again using `sc query trustedinstaller`.

### ## Step 6: Running the System File Checker (SFC) and DISM

These tools can repair corrupted system files, including those related to Windows Update.

1.  **Run SFC:**
    *   In the Command Prompt, type: `sfc /scannow`
    *   This command will scan and attempt to repair corrupted system files. This process can take a significant amount of time.
2.  **Run DISM (Deployment Image Servicing and Management):** If SFC finds issues it cannot fix, or if SFC itself fails, use DISM.
    *   Type the following commands, pressing Enter after each:
        *   `DISM /Online /Cleanup-Image /ScanHealth`
        *   `DISM /Online /Cleanup-Image /RestoreHealth`
    *(Note: In the WinPE environment, `/Online` might not be applicable. If these commands fail, you might need to use DISM with an offline image, which is more complex. However, try these first.)*

### ## Step 7: Reattempting the Installation

After performing the above steps, it's time to try the installation again.

1.  **Exit Command Prompt:** Type `exit` and press Enter.
2.  **Continue Installation:** From the "Choose an option" screen, select **"Continue"** to exit to Windows 10/11 (or your current OS) to restart, or select **"Turn off your PC"** and then restart the computer and boot from the installation media again to retry the installation from the beginning. If you are in the middle of an installation that is stuck, simply exiting the command prompt might allow the installer to resume.

## Common Mistakes

A frequent error users make is attempting to fix this issue *after* Windows has fully installed, rather than during the preinstallation environment (WinPE) where the setup is actually failing. Many of the repair tools and service management commands are best executed from this environment. Another common pitfall is not running the Command Prompt with administrator privileges, which will lead to permission denied errors for most of the necessary commands. Forgetting to rename the `SoftwareDistribution` and `catroot2` folders or attempting to start services without addressing their potential corruption is also a common oversight. Finally, users sometimes skip the DLL registration steps, which are critical for ensuring the Windows Update service components are correctly recognized by the system.

## Prevention Tips

To prevent the "Windows Update service not running" error from occurring during future installations, maintain a healthy Windows Update history on your existing system. Ensure all cumulative updates, service stack updates, and feature updates are installed and completed successfully before attempting an in-place upgrade or a fresh installation. Regularly run the Windows Update troubleshooter; while it's more effective on a running system, it can sometimes identify and fix underlying issues that might manifest later. Keeping third-party security software temporarily disabled during major Windows installations can also prevent interference. Finally, ensuring your hard drive is healthy and has sufficient free space can prevent file corruption and service startup issues.