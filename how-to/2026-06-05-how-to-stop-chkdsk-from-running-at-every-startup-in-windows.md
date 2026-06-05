---
title: "How to Stop CHKDSK from Running at Every Startup in Windows"
date: "2026-06-05T03:37:28.938Z"
slug: "how-to-stop-chkdsk-from-running-at-every-startup-in-windows"
type: "how-to"
description: "Learn how to prevent CHKDSK from automatically scanning your hard drive at every Windows startup. This guide explains why it happens and provides step-by-step solutions."
keywords: "CHKDSK, Windows startup, disk check, error checking, auto scan, fix CHKDSK loop, prevent disk check"
---

**Problem Explanation**

Have you ever booted up your Windows computer, only to be greeted by a black screen with text scrolling rapidly, indicating that "CHKDSK" is scanning your hard drive? This process, known as Check Disk, is designed to find and fix errors on your disk volumes. While it's a vital tool for maintaining disk health, it becomes a frustrating problem when it runs automatically every single time you start your PC. Instead of a quick boot-up, you're forced to wait for the lengthy disk check to complete, often interrupting your workflow or delaying your access to your computer. The situation is particularly annoying if CHKDSK seems to get stuck in a loop, repeatedly checking the same drive without apparent resolution.

This persistent CHKDSK scan at startup usually signifies that Windows has detected potential issues with your hard drive that require attention. It might be due to a dirty shutdown (like a power outage or forced restart), file system errors, bad sectors on the disk, or even problems with the disk hardware itself. While the scan is intended to resolve these issues, its automatic and recurring nature suggests that the underlying problem hasn't been fully addressed or that Windows is still flagging the drive as potentially problematic.

**Why It Happens**

The primary reason CHKDSK runs automatically at startup is that Windows has marked your hard drive or a specific volume as "dirty." This "dirty bit" is a flag set on a file system that indicates it wasn't properly dismounted the last time it was accessed. Common culprits for a dirty bit include:

*   **Abrupt Shutdowns:** If your computer loses power unexpectedly or you force a shutdown without properly closing Windows, the file system might not have completed its write operations. This leaves it in an inconsistent state, and Windows flags it for a check on the next boot.
*   **System Crashes or Freezes:** Similar to abrupt shutdowns, if your system crashes or freezes, the same ungraceful dismount can occur.
*   **File System Errors:** Sometimes, minor glitches or corruption within the file system itself can trigger the dirty bit flag, even without a power loss.
*   **Malware:** In rare cases, certain types of malware can interfere with file system operations and cause this issue.
*   **Hardware Issues:** A failing hard drive or loose cable can also lead to I/O errors that Windows interprets as a need for CHKDSK.

Windows automatically schedules CHKDSK to run on the next reboot when it detects this dirty bit or other potential file system inconsistencies to ensure data integrity. However, if CHKDSK consistently reports errors and the flag isn't cleared, it will continue to run every startup.

**Step-by-Step Solution**

The most direct way to stop CHKDSK from running at every startup is to address the underlying cause and manually tell Windows that you've acknowledged and (potentially) resolved the issue.

## Step 1: Access Command Prompt as Administrator

This is where we'll issue commands to control CHKDSK's behavior.
1.  Click the **Start** button.
2.  Type `cmd` in the search bar.
3.  Right-click on **Command Prompt** in the search results.
4.  Select **Run as administrator**.
5.  If prompted by User Account Control (UAC), click **Yes**.

## Step 2: Check the Status of the Drive

Before making any changes, it's good practice to understand the current state of your drive. We'll use the `fsutil` command to check the dirty bit.
1.  In the Administrator Command Prompt window, type the following command and press Enter:
    ```
    fsutil dirty query C:
    ```
    *   **Note:** Replace `C:` with the drive letter that CHKDSK is scanning (e.g., `D:`, `E:`).
2.  This command will tell you if the specified drive is marked as dirty. It will output something like:
    *   `Volume C: is Dirty`
    *   `Volume C: is not Dirty`

## Step 3: Manually Schedule or Cancel a CHKDSK Scan (if needed)

If you want to run CHKDSK manually to resolve persistent errors, you can schedule it. If you believe the errors are resolved or want to bypass it for now, you can try to cancel any pending scan.

*   **To Schedule a Disk Check:** If you saw that the drive is dirty and want CHKDSK to run to fix it (and hopefully only once), you can schedule it for the next reboot.
    1.  In the Administrator Command Prompt, type the following command and press Enter:
        ```
        chkdsk C: /f /r
        ```
        *   **Important:** `/f` fixes errors on the disk. `/r` locates bad sectors and recovers readable information. This is a thorough scan and can take a very long time.
        *   You'll likely see a message stating that the volume is in use and that CHKDSK can't run now, asking if you want to schedule it for the next restart. Type `Y` and press Enter.
    2.  Restart your computer. CHKDSK will run before Windows starts.

*   **To Cancel a Pending Disk Check:** If CHKDSK is already scheduled to run at the next startup (and you want to cancel it *before* it runs, perhaps to try a different approach or if you just want to boot faster), you can use the following command:
    1.  In the Administrator Command Prompt, type the following command and press Enter:
        ```
        chkntfs /x C:
        ```
        *   **Note:** Replace `C:` with the drive letter you want to exclude from the automatic scan.
    2.  This command tells Windows *not* to check the specified drive at startup. You should see a confirmation message.

## Step 4: Clear the Dirty Bit (Advanced)

If CHKDSK continues to run despite the drive not showing as dirty in `fsutil`, or if you've run CHKDSK and it still persists, you can try to manually clear the dirty bit. **Use this with caution, as an improperly dismounted file system can lead to data loss.** It's generally better to let CHKDSK fix it if it's dirty. However, if you've tried everything else and the drive is *not* dirty but CHKDSK still runs, you might consider this as a last resort.

1.  **Open Command Prompt as Administrator** (as described in Step 1).
2.  To force a dismount and clear the dirty bit, you can use the `dismount` command. First, ensure no programs are using files on that drive. Close all open applications.
3.  In the Administrator Command Prompt, type the following command and press Enter:
    ```
    dismount C:
    ```
    *   **Note:** Replace `C:` with the drive letter.
    *   If this command succeeds, it means the drive was successfully dismounted, and the dirty bit might be cleared. If it fails, it means files are still in use.
4.  After attempting to dismount, you can restart your computer. If the dismount was successful, Windows might not flag the drive as dirty anymore.

## Step 5: Check for Windows Updates

Sometimes, bugs in Windows itself can cause unusual behavior, including persistent CHKDSK scans. Ensuring your system is up-to-date can resolve these underlying issues.
1.  Click the **Start** button.
2.  Go to **Settings** (the gear icon).
3.  Click on **Update & Security** (or **Windows Update** on Windows 11).
4.  Click **Check for updates**.
5.  Download and install any available updates, and then restart your computer.

## Step 6: Run System File Checker (SFC) and DISM

Corrupted system files can sometimes interfere with disk checks and startup processes.
1.  **Open Command Prompt as Administrator** (as described in Step 1).
2.  Type the following command and press Enter to run the System File Checker:
    ```
    sfc /scannow
    ```
    This process can take some time.
3.  Once SFC is complete, run the Deployment Image Servicing and Management (DISM) tool by typing the following commands, pressing Enter after each:
    ```
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
4.  After these commands complete, restart your computer.

**Common Mistakes**

One of the most common mistakes users make is attempting to disable CHKDSK through registry edits without understanding the implications. While the registry can control CHKDSK's behavior, incorrect modifications can lead to system instability or prevent critical disk checks from ever running, potentially allowing undetected errors to cause more significant data loss. Another frequent error is running `chkdsk C: /f /r` repeatedly without allowing the scan to complete or without fixing the underlying issue that causes the drive to be marked dirty. This can lead to frustration and a perceived CHKDSK loop when the system is simply trying to perform its necessary task. Finally, users often forget to run Command Prompt as an administrator, which means the commands they enter won't have the necessary permissions to execute correctly.

**Prevention Tips**

To prevent CHKDSK from running at every startup, the best approach is to maintain good computing habits. Always shut down your computer properly by using the "Shut down" option from the Start menu. Avoid force-restarting or pulling the power plug unless absolutely necessary. Ensure your system is protected against power surges with a good quality surge protector or an Uninterruptible Power Supply (UPS), especially if you live in an area prone to power outages. Regularly update your Windows operating system and drivers, as these updates often include bug fixes and performance improvements that can prevent file system corruption. Finally, if you suspect your hard drive might be failing, back up your important data immediately and consider replacing the drive. Performing regular, manual disk checks (e.g., once every few months using `chkdsk D: /f`) when you have the time can also help catch minor issues before they escalate into a problem that triggers automatic scans.