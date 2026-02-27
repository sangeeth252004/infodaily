---
title: "How to Fix Windows 10/11 Stuck in 'Automatic Repair' Loop"
date: "2026-02-27T10:36:40.299Z"
slug: "how-to-fix-windows-10-11-stuck-in-automatic-repair-loop"
type: "how-to"
description: "A comprehensive guide to fixing Windows 10/11 stuck in the Automatic Repair loop. Learn the causes and follow step-by-step solutions using Advanced Startup Options and Command Prompt."
keywords: "Windows Automatic Repair Loop, Windows 10 stuck, Windows 11 stuck, Automatic Repair couldn't repair your PC, boot loop fix, advanced startup options, bootrec, chkdsk, system restore, reset PC"
---

## Problem Explanation

The "Automatic Repair Loop" is a frustrating and common issue in Windows 10 and 11 where your system repeatedly attempts and fails to start. Users typically encounter a blue screen displaying "Your PC did not start correctly" or "Automatic Repair couldn't repair your PC." Before reaching this screen, the system often shows "Preparing Automatic Repair" or "Diagnosing your PC" as it tries to self-diagnose and fix startup problems. The core problem is that the operating system cannot load essential components, leading to a continuous cycle of booting, failing, attempting repair, and rebooting without ever successfully reaching the desktop.

This loop prevents access to Windows entirely, making it impossible to perform standard troubleshooting or access personal files without specialized tools. The system will endlessly reboot into the same diagnostic screens, offering limited options like "Restart" (which leads back to the loop) or "Advanced options" (which is where the real troubleshooting begins).

## Why It Happens

The Automatic Repair loop primarily occurs when Windows detects an issue preventing it from booting normally but cannot resolve it through its automated repair processes. The root causes are varied but generally revolve around corruption or damage to critical system files or the boot configuration. Common culprits include:

*   **Corrupted Boot Files:** The Master Boot Record (MBR), Boot Configuration Data (BCD), or other boot-related files become damaged, preventing the system from locating or loading the operating system.
*   **Recent Windows Updates:** A faulty or incompatible Windows update can introduce conflicts or break critical system components, leading to startup failure.
*   **Driver Issues:** A recently installed or updated device driver (especially for graphics cards, chipsets, or storage controllers) can cause system instability and prevent booting.
*   **Software Conflicts:** Newly installed applications, particularly those that modify system-level settings or inject themselves into the boot process, can trigger the loop.
*   **Hard Drive Issues:** Bad sectors on the hard drive, failing drive components, or a corrupted file system can make it impossible for Windows to read necessary boot files or system components.
*   **Registry Corruption:** Damage to the Windows Registry, often due to malware, improper shutdowns, or faulty software, can prevent the operating system from initializing correctly.
*   **Malware Infection:** Viruses or other malicious software can corrupt system files or interfere with the boot process.

## Step-by-Step Solution

To resolve the Automatic Repair loop, you will primarily work within the Windows Recovery Environment (WinRE). The most challenging part is often getting into WinRE consistently if the loop is aggressive.

### Step 1: Access Advanced Startup Options (Windows Recovery Environment)

If your PC is stuck in a continuous loop, you’ll need to force it into the Windows Recovery Environment (WinRE).
1.  **Turn off your PC** by holding down the power button for 10 seconds.
2.  **Press the power button again** to turn on your PC.
3.  As soon as you see the Windows logo, **turn off your PC again** by holding down the power button for 10 seconds.
4.  **Press the power button again** to turn on your PC.
5.  This time, let it boot completely. You should then see the "Preparing Automatic Repair" screen, followed by "Diagnosing your PC," and finally, the "Automatic Repair couldn't repair your PC" screen with options.
6.  Click **"Advanced options"**.
7.  From the "Choose an option" screen, select **"Troubleshoot"**.
8.  Then, select **"Advanced options"** again.

If you have a Windows installation USB drive, you can boot from it and select "Repair your computer" from the initial setup screen to directly access WinRE.

### Step 2: Uninstall Recent Updates

Faulty Windows updates are a common cause of boot issues.
1.  From the "Advanced options" screen (reached in Step 1), select **"Uninstall Updates"**.
2.  You will typically have two options: **"Uninstall latest quality update"** and **"Uninstall latest feature update."**
    *   Try "Uninstall latest quality update" first. This removes smaller, monthly security updates.
    *   If that doesn't work, return to "Uninstall Updates" and try "Uninstall latest feature update." Feature updates are larger, semi-annual updates that often introduce more significant changes.
3.  Follow the on-screen prompts and then attempt to restart your PC.

### Step 3: Perform Startup Repair

While "Automatic Repair" often fails, performing a manual "Startup Repair" from the Advanced options can sometimes work, especially after other underlying issues (like updates) have been addressed.
1.  From the "Advanced options" screen (reached in Step 1), select **"Startup Repair"**.
2.  Windows will attempt to diagnose and fix startup issues. This process can take some time.
3.  Once complete, it will either indicate it couldn't repair your PC (in which case, proceed to the next step) or successfully fix the issue.
4.  If successful, restart your PC to see if it boots normally.

### Step 4: Use Command Prompt for Boot Sector Repair and File System Checks

This is often the most effective step, addressing corrupted boot files and disk errors.
1.  From the "Advanced options" screen (reached in Step 1), select **"Command Prompt"**.
2.  You'll need to identify your Windows installation drive letter. It's often `C:` or `D:`. Type `dir C:` and then `dir D:` until you see common Windows folders like `Program Files`, `Users`, and `Windows`. Let's assume it's `C:` for the following commands.
3.  **Repair the Master Boot Record (MBR):**
    ```cmd
    bootrec /fixmbr
    ```
    Press Enter. This command writes a Windows 10/11 compatible MBR to the system partition.
4.  **Write a new boot sector:**
    ```cmd
    bootrec /fixboot
    ```
    Press Enter. If you get "Access Denied," you may need to try `bootsect /nt60 C:` (replace `C:` with your Windows drive letter).
5.  **Rebuild the Boot Configuration Data (BCD):**
    ```cmd
    bootrec /rebuildbcd
    ```
    Press Enter. If it finds Windows installations, type `Y` to add them to the boot list.
6.  **Check and repair disk errors:**
    ```cmd
    chkdsk /f /r C:
    ```
    Press Enter. Replace `C:` with your Windows drive letter. This command checks for and repairs logical file system errors (`/f`) and locates bad sectors and recovers readable information (`/r`). This can take a very long time, sometimes hours, depending on disk size and errors. Let it complete.
7.  **Scan for and repair corrupted system files:**
    ```cmd
    sfc /scannow /offbootdir=C:\ /offwindir=C:\windows
    ```
    Press Enter. Replace `C:` with your Windows drive letter. This command (System File Checker) scans for and repairs corrupted Windows system files. Note that `sfc /scannow` alone might not work effectively outside a running OS without specifying the boot and Windows directories.
8.  **Exit Command Prompt:** Type `exit` and press Enter.
9.  Attempt to restart your PC.

### Step 5: Restore System

If you have a system restore point created before the issue started, you can roll back your system to that point.
1.  From the "Advanced options" screen (reached in Step 1), select **"System Restore"**.
2.  Follow the on-screen wizard. Select a restore point that predates the automatic repair loop issue.
3.  Confirm your selection and start the restoration process. This will not affect your personal files but will revert system settings, installed programs, and drivers to the state they were in at the time the restore point was created.
4.  Restart your PC after the restoration is complete.

### Step 6: Reset This PC

If previous steps fail, "Reset this PC" is a more drastic but often effective solution. You have two primary options:
1.  From the "Advanced options" screen (reached in Step 1), select **"Reset this PC"**.
2.  Choose one of the following:
    *   **"Keep my files"**: This option reinstalls Windows but preserves your personal files (documents, pictures, etc.). It will remove applications and drivers not factory-installed.
    *   **"Remove everything"**: This option performs a clean installation of Windows, deleting all personal files, applications, and settings. This is akin to a fresh start.
3.  Follow the prompts to complete the reset. This process can take a significant amount of time.

### Step 7: Clean Installation (Last Resort)

If all troubleshooting steps fail, a clean installation of Windows is the ultimate solution. This will erase everything on your system drive and install a fresh copy of Windows.
1.  You will need a Windows 10/11 installation USB drive (created from another working computer).
2.  Boot your problematic PC from the USB drive. You might need to change the boot order in your BIOS/UEFI settings.
3.  Follow the on-screen instructions to perform a custom installation. During this process, you will typically delete existing partitions on your primary drive and install Windows onto the unallocated space.
4.  **Important:** This will result in complete data loss on the drive where Windows is installed. If you have critical data, consider professional data recovery services or attempt to back up files using a Linux Live USB or by connecting the drive to another computer before proceeding.

## Common Mistakes

*   **Panicking and Immediately Reinstalling Windows:** Many users jump straight to a clean installation without attempting simpler fixes. This can lead to unnecessary data loss and missed opportunities to salvage the existing installation.
*   **Skipping Steps or Not Completing Commands:** Each step in the troubleshooting process builds upon the previous one. Rushing through or aborting commands like `chkdsk /f /r` prematurely can exacerbate the problem or prevent a successful resolution.
*   **Incorrect Drive Letter:** When using Command Prompt, failing to identify the correct drive letter for your Windows installation (`C:`, `D:`, etc.) will cause commands like `chkdsk` or `sfc` to fail or operate on the wrong partition.
*   **Assuming Hardware Failure Too Soon:** While hardware can be a cause, software corruption is more frequent. Thoroughly exhausting software-based fixes before concluding a hardware issue can save time and money.
*   **Not Creating a Bootable USB in Advance:** Having a Windows installation media or a recovery drive ready on a USB stick (created from a working PC) is crucial. Without it, some recovery options might be unavailable, especially if WinRE itself is damaged.

## Prevention Tips

Preventing the Automatic Repair loop involves a combination of good maintenance practices and proactive measures:

*   **Regular Data Backups:** The most critical prevention is regularly backing up your important files to an external drive, cloud storage, or network location. This ensures that even if your system becomes unbootable, your data remains safe. Consider full system image backups for quicker recovery.
*   **Maintain Driver Hygiene:** Only install drivers from official manufacturer websites (e.g., Dell, HP, NVIDIA, AMD). Avoid generic driver update tools, which can sometimes install incompatible or unstable drivers. Update drivers only when necessary or when experiencing issues.
*   **Create System Restore Points:** Windows can automatically create restore points, but it's good practice to manually create one before installing major software, drivers, or Windows updates. This gives you a quick rollback option if something goes wrong.
*   **Use Reliable Antivirus/Antimalware Software:** Keep your security software up-to-date and run regular scans to prevent malware infections that can corrupt system files.
*   **Perform Regular Disk Health Checks:** Periodically run the `chkdsk` command (e.g., `chkdsk C: /f`) to scan for and fix file system errors. Also, monitor your drive's health using tools that report S.M.A.R.T. data.
*   **Ensure Proper Shutdowns:** Always shut down your computer gracefully through the Start Menu. Avoid forcing power-offs unless absolutely necessary, as sudden power loss can corrupt open files or the file system.
*   **Manage Windows Updates:** While essential for security, sometimes updates cause issues. Consider pausing updates for a short period after they are released to allow others to discover any major bugs, or ensure you have a recovery plan before installing.