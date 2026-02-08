---
title: "How to Fix \"Windows Update Failed to Install\" Error Code 0x80070002 on Windows 10/11"
date: "2026-02-08T10:26:16.199Z"
slug: "how-to-fix-windows-update-failed-to-install-error-code-0x80070002-on-windows-10-11"
type: "how-to"
description: "Fix Windows Update error 0x80070002 on Windows 10/11. This guide provides step-by-step solutions to resolve failed updates, including resetting components and checking system files."
keywords: "Windows Update failed, error 0x80070002, Windows 10 update fix, Windows 11 update fix, update installation error, fix update problems, system file checker, DISM, reset Windows Update components"
---

### Problem Explanation

Encountering a "Windows Update Failed to Install" error with code 0x80070002 indicates a specific problem during the update process on both Windows 10 and Windows 11 systems. When this issue occurs, your system attempts to download and install updates, but the process fails, often reporting the error in the Windows Update history. You might see a message stating, "There were problems installing some updates, but we'll try again later," followed by the error code 0x80070002.

This error typically prevents your operating system from installing crucial security patches, feature updates, and performance improvements. The update history in your Settings app (under "Update & Security" on Windows 10 or "Windows Update" on Windows 11) will show the particular update that failed, alongside the persistent error code, indicating a consistent roadblock in maintaining an up-to-date and secure system.

### Why It Happens

The 0x80070002 error code is a general indicator of file system or service-related corruption preventing Windows Update from completing its tasks. The primary root causes usually involve corrupted or missing files within the Windows Update component directory itself, issues with the BITS (Background Intelligent Transfer Service) or Windows Update service, or sometimes even incorrect system date and time settings.

Essentially, Windows Update relies on a series of services, temporary files, and system directories to download, stage, and install updates. If any of these components become corrupted, are misconfigured, or if the update download is incomplete or damaged, the process breaks down. This error often points to the operating system failing to locate a necessary file or directory, or that a critical service required for the update is not functioning correctly.

### Step-by-Step Solution

Follow these steps carefully to diagnose and resolve the 0x80070002 error.

### Step 1: Verify Date and Time Settings

Incorrect date and time settings can disrupt secure connections necessary for Windows Update to function correctly. This is a simple yet often overlooked fix.

1.  Right-click on the clock in the bottom-right corner of your taskbar.
2.  Select **"Adjust date and time"**.
3.  Ensure that **"Set time automatically"** and **"Set time zone automatically"** are both toggled **On**.
4.  If they are already on, toggle them off, wait a few seconds, then toggle them back on.
5.  Click **"Sync now"** under "Additional settings" or "Synchronize your clock" to force a synchronization with time.windows.com.
6.  Restart your computer and attempt the update again.

### Step 2: Run the Windows Update Troubleshooter

Windows includes a built-in troubleshooter designed to detect and resolve common update issues.

1.  **On Windows 10:** Go to **Settings > Update & Security > Troubleshoot > Additional troubleshooters**. Select **"Windows Update"** and click **"Run the troubleshooter"**.
2.  **On Windows 11:** Go to **Settings > System > Troubleshoot > Other troubleshooters**. Find **"Windows Update"** and click the **"Run"** button next to it.
3.  Allow the troubleshooter to complete its scan and apply any recommended fixes.
4.  Restart your computer and check for updates.

### Step 3: Reset Windows Update Components Manually

This is often the most effective solution, as it involves stopping the Windows Update services, clearing corrupted update cache files, and then restarting the services.

1.  Press **Windows Key + R**, type `cmd`, then press **Ctrl+Shift+Enter** to open Command Prompt as an administrator. Confirm the UAC prompt if it appears.
2.  Stop the BITS, Windows Update, and Cryptographic Services by typing the following commands, pressing **Enter** after each:
    ```cmd
    net stop wuauserv
    net stop cryptSvc
    net stop bits
    net stop msiserver
    ```
3.  Rename the `SoftwareDistribution` and `Catroot2` folders. These folders store temporary update files and update components. Renaming them forces Windows to recreate them, effectively clearing any corruption. Type the following commands, pressing **Enter** after each:
    ```cmd
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 Catroot2.old
    ```
    *   *Note:* If you receive an "Access Denied" message, ensure you ran Command Prompt as administrator and that the services in step 2 were successfully stopped. You may need to reboot and try again.
4.  Restart the BITS, Windows Update, and Cryptographic Services by typing the following commands, pressing **Enter** after each:
    ```cmd
    net start wuauserv
    net start cryptSvc
    net start bits
    net start msiserver
    ```
5.  Close Command Prompt and restart your computer.
6.  Attempt to check for and install updates again.

### Step 4: Run System File Checker (SFC) and DISM

Corrupted system files can interfere with Windows Update. SFC scans for and restores corrupted Windows system files, while DISM (Deployment Image Servicing and Management) repairs the Windows system image itself.

1.  Press **Windows Key + R**, type `cmd`, then press **Ctrl+Shift+Enter** to open Command Prompt as an administrator.
2.  First, run the SFC scan. Type the following command and press **Enter**:
    ```cmd
    sfc /scannow
    ```
    Allow the scan to complete. This may take some time. Do not close the window until the verification is 100% complete.
3.  After SFC finishes, run the DISM commands. Type the following commands, pressing **Enter** after each, allowing each to complete before moving to the next:
    ```cmd
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    The `/RestoreHealth` command can take a while to finish, especially if it finds and repairs issues.
4.  Close Command Prompt and restart your computer.
5.  Attempt to check for and install updates again.

### Step 5: Temporarily Disable Third-Party Security Software

Third-party antivirus programs or firewalls can sometimes overzealously block Windows Update processes.

1.  Locate your antivirus software icon in the system tray (bottom-right of the taskbar), right-click it, and look for an option to "Disable," "Turn off," or "Exit."
2.  If you have a separate third-party firewall, disable that as well.
3.  **Crucially, only disable these temporarily.** As soon as you have tested Windows Update, re-enable your security software to protect your system.
4.  With security software temporarily disabled, attempt to run Windows Update.
5.  Remember to re-enable your antivirus and firewall after checking for updates, regardless of whether the update succeeds or fails.

### Step 6: Manually Download and Install the Update

If you know the specific KB (Knowledge Base) number of the update that failed, you can try to download and install it manually.

1.  Note the KB number of the failed update from your Windows Update history (e.g., KB5012345).
2.  Open your web browser and navigate to the **Microsoft Update Catalog** website.
3.  In the search bar, type the KB number (e.g., `KB5012345`) and press Enter.
4.  Find the correct update for your version of Windows (Windows 10 or 11) and system architecture (x64 for most modern PCs).
5.  Click the **"Download"** button next to the appropriate update.
6.  In the pop-up window, click the link to download the `.msu` file.
7.  Once downloaded, double-click the `.msu` file to run the installer and follow the on-screen prompts.
8.  Restart your computer after installation.

### Common Mistakes

When attempting to fix update errors, several common mistakes can prevent a successful resolution. One frequent error is failing to run Command Prompt as an administrator, which leads to "Access Denied" errors when trying to stop services or rename system folders. Another mistake is not restarting the computer after significant troubleshooting steps, as a reboot is often necessary for changes to take full effect. Users might also skip steps, assuming they are redundant, thereby missing a crucial part of the diagnostic process that could resolve the issue. Finally, mis-typing commands in the Command Prompt can prevent the necessary actions from executing, so double-checking syntax is important.

### Prevention Tips

To minimize the recurrence of the 0x80070002 error and other Windows Update issues, consider these best practices. Regularly restart your computer, especially if it runs for extended periods without a full shutdown, as this helps clear temporary files and refresh system processes. Ensure you have ample free disk space on your C: drive (at least 20-30 GB) to accommodate update downloads and installations. Maintain good system hygiene by regularly running Disk Cleanup and keeping your drivers updated. Lastly, ensure your third-party security software is compatible with your Windows version and is not configured too aggressively, which can sometimes interfere with legitimate system operations like Windows Update.