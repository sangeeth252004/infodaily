---
title: "How to Fix \"Error Code: 0x80070005 Access Denied\" When Installing Windows Updates"
date: "2026-06-09T17:24:20.247Z"
slug: "how-to-fix-error-code-0x80070005-access-denied-when-installing-windows-updates"
type: "how-to"
description: "Resolve the frustrating \"Error Code: 0x80070005 Access Denied\" when updating Windows with this comprehensive, step-by-step guide."
keywords: "Windows Update error 0x80070005, access denied Windows update, fix update error, Windows troubleshooting, solve 0x80070005"
---

It's a familiar, unwelcome sight: you're trying to keep your Windows operating system secure and up-to-date, and suddenly, you're met with an error message. One of the most common and perplexing is **"Error Code: 0x80070005 Access Denied."** This error typically pops up during the Windows Update process, preventing your computer from downloading or installing crucial patches and feature updates. You might see a message stating something like, "Windows Update encountered an unknown error and was unable to complete the process. Error code: 0x80070005." This leaves your system vulnerable and without the latest improvements.

### Why It Happens

The "Error Code: 0x80070005 Access Denied" error fundamentally means that Windows cannot access or modify certain files or registry keys it needs to complete the update process. This isn't usually due to a deliberate malicious act, but rather a permission issue or a conflict with another process or security setting. Common culprits include:

*   **Incorrect Permissions:** Essential system files or folders might have their permissions corrupted or set incorrectly, preventing the Windows Update service or its components from interacting with them.
*   **Antivirus or Firewall Interference:** Overly aggressive security software can sometimes mistakenly flag legitimate update files or processes as threats, blocking their access.
*   **Corrupted System Files:** If critical Windows system files are damaged, the update process may fail because it can't read or write to these files.
*   **Windows Update Service Issues:** The Windows Update service itself, or its related components (like the Background Intelligent Transfer Service - BITS), might be malfunctioning or not running correctly due to permission problems or conflicts.

### Step-by-Step Solution

Don't worry, this error is usually fixable with a methodical approach. Let's work through the common solutions to get your Windows Updates back on track.

## Step 1: Run the Windows Update Troubleshooter

Windows has built-in tools designed to diagnose and fix common problems, including update errors. This is the simplest first step.

1.  Click the **Start button** and type **"Troubleshoot settings."**
2.  Select **"Troubleshoot settings"** from the search results.
3.  In the Troubleshoot window, click on **"Additional troubleshooters."**
4.  Find **"Windows Update"** and click on it.
5.  Click **"Run the troubleshooter."**
6.  Follow the on-screen prompts. The troubleshooter will scan for issues and attempt to fix them automatically. If it finds and resolves problems, try running Windows Update again.

## Step 2: Check and Correct File and Folder Permissions

This is a crucial step as the "Access Denied" error directly points to permission issues. We'll focus on the Windows Update download folder.

1.  Open **File Explorer** (you can press `Windows key + E`).
2.  Navigate to `C:\Windows`.
3.  Locate the **"SoftwareDistribution"** folder.
4.  **Right-click** on the "SoftwareDistribution" folder and select **Properties**.
5.  Go to the **"Security"** tab.
6.  Click **"Edit..."**.
7.  In the Permissions window, ensure that **"SYSTEM"** and **"Administrators"** have **"Full control"** and **"Modify"** permissions. If they don't, select the user/group, check the "Allow" boxes for "Full control" and "Modify," and click **"Apply,"** then **"OK."**
8.  If you don't see "SYSTEM" or "Administrators" listed, click **"Add..."**, type `SYSTEM` in the object name field, click **"Check Names,"** then **"OK."** Repeat this process for `Administrators`.
9.  Once permissions are set, click **"OK"** on all open windows.
10. **Restart your computer** and try running Windows Update again.

## Step 3: Temporarily Disable Antivirus and Firewall

Sometimes, security software can be too zealous. Temporarily disabling it can help determine if it's the cause.

1.  **For Antivirus:** Locate your antivirus program's icon in the system tray (usually near the clock). Right-click it and look for an option like "Disable protection," "Turn off," or "Exit." Choose a duration that allows you to test the update (e.g., 15 minutes or until the next restart).
2.  **For Windows Defender Firewall:**
    *   Click the **Start button** and type **"Windows Defender Firewall."**
    *   Select **"Windows Defender Firewall"** from the results.
    *   In the left-hand pane, click **"Turn Windows Defender Firewall on or off."**
    *   Select **"Turn off Windows Defender Firewall (not recommended)"** for both "Private network settings" and "Public network settings."
    *   Click **"OK."**
3.  **Attempt to run Windows Update.**
4.  **Crucially, re-enable your antivirus and firewall immediately after testing**, whether the update succeeds or fails, to keep your system protected.

## Step 4: Reset Windows Update Components

This is a more advanced step that involves stopping update services, renaming cache folders, and restarting the services. This effectively gives Windows Update a clean slate.

1.  Open **Command Prompt as Administrator**. To do this, click the **Start button**, type `cmd`, right-click **"Command Prompt,"** and select **"Run as administrator."**
2.  In the Command Prompt window, type the following commands one by one, pressing **Enter** after each:
    *   `net stop wuauserv` (Stops the Windows Update service)
    *   `net stop cryptSvc` (Stops the Cryptographic service)
    *   `net stop bits` (Stops the Background Intelligent Transfer Service)
    *   `net stop msiserver` (Stops the Windows Installer service)
3.  Now, we need to rename the download cache folders. Type these commands and press **Enter** after each:
    *   `ren C:\Windows\SoftwareDistribution SoftwareDistribution.old`
    *   `ren C:\Windows\System32\catroot2 catroot2.old`
4.  Restart the services you stopped. Type these commands and press **Enter** after each:
    *   `net start wuauserv`
    *   `net start cryptSvc`
    *   `net start bits`
    *   `net start msiserver`
5.  Close the Command Prompt and **restart your computer**.
6.  Try running Windows Update again.

## Step 5: Run System File Checker (SFC) and DISM

Corrupted system files can also be the root cause. These tools scan for and repair damaged Windows files.

1.  Open **Command Prompt as Administrator** (as described in Step 4).
2.  Type the following command and press **Enter**:
    *   `sfc /scannow`
3.  This process can take some time. Let it complete. If it finds and repairs errors, restart your computer and try Windows Update again.
4.  If `sfc /scannow` doesn't resolve the issue or reports that it couldn't fix everything, run the Deployment Image Servicing and Management (DISM) tool. Type the following commands one by one, pressing **Enter** after each:
    *   `DISM /Online /Cleanup-Image /ScanHealth`
    *   `DISM /Online /Cleanup-Image /RestoreHealth`
5.  These DISM commands can also take a significant amount of time. Once completed, **restart your computer** and try Windows Update again.

## Step 6: Perform a Clean Boot

A clean boot starts Windows with a minimal set of drivers and startup programs, which helps eliminate software conflicts.

1.  Click the **Start button** and type `msconfig`.
2.  Select **"System Configuration"** from the search results.
3.  In the System Configuration window, go to the **"Services"** tab.
4.  Check the box that says **"Hide all Microsoft services."**
5.  Click **"Disable all."**
6.  Now, go to the **"Startup"** tab.
7.  Click **"Open Task Manager."**
8.  In Task Manager, under the "Startup" tab, for each startup item, select it and click **"Disable."**
9.  Close Task Manager.
10. In the System Configuration window, click **"Apply"** and then **"OK."**
11. You will be prompted to restart your computer. Click **"Restart."**
12. After the restart, try running Windows Update. If the update is successful, it means a third-party service or startup program was causing the conflict. You can then re-enable services and startup items gradually to identify the culprit.

### Common Mistakes

One common pitfall when encountering this error is immediately resorting to drastic measures like resetting or reinstalling Windows without trying the simpler, targeted solutions first. Another mistake is forgetting to re-enable security software after disabling it for testing, leaving the system vulnerable. Users also sometimes skip the "Run as administrator" step when using Command Prompt, which prevents the commands from executing correctly. Finally, some may overlook the importance of restarting the computer after making changes, which is often necessary for those changes to take full effect.

### Prevention Tips

To minimize the chances of encountering the "Error Code: 0x80070005 Access Denied" in the future, it's a good practice to:

*   **Keep your antivirus software updated and configured correctly.** Ensure it's not overly aggressive to the point of blocking legitimate system processes.
*   **Regularly run Windows Update.** Don't postpone updates indefinitely, as this can lead to larger, more complex update packages that are more prone to errors.
*   **Avoid installing software from unverified sources.** Unwanted programs can sometimes interfere with system services and permissions.
*   **Perform periodic system file checks.** Running `sfc /scannow` every few months can proactively catch and fix minor file corruption before it causes larger issues.
*   **Maintain your user account permissions.** Ensure your primary user account has administrator privileges and that system files are not accidentally modified.