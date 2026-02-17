---
title: "How to Fix Windows 10/11 Stuck in an Automatic Repair Loop"
date: "2026-02-17T15:52:34.506Z"
slug: "how-to-fix-windows-10-11-stuck-in-an-automatic-repair-loop"
type: "how-to"
description: "Detailed guide to fix Windows 10 or 11 caught in an Automatic Repair loop. Learn common causes and step-by-step solutions including advanced troubleshooting with command prompt."
keywords: "Windows automatic repair loop fix, Windows 10 repair loop, Windows 11 repair loop, automatic repair couldn't repair your PC, your PC did not start correctly, boot loop fix, SFC DISM, rebuild BCD, chkdsk, advanced startup options"
---

**1. Problem Explanation**
The "Automatic Repair Loop" is a frustrating and common issue for Windows 10 and 11 users. When encountering this problem, your PC attempts to diagnose and fix startup issues but fails repeatedly, returning to the same diagnostic screens after each reboot. Users typically see messages like "Automatic Repair couldn't repair your PC" or "Your PC did not start correctly." Following this, the system presents options such as "Restart" or "Advanced options." Selecting "Restart" merely sends the system back into the same diagnostic cycle, preventing access to the Windows desktop or normal boot-up.

This continuous loop signifies that Windows is unable to load its operating system environment successfully. It's a critical error that blocks all normal functionality, leaving users unable to access their files, applications, or even perform basic tasks. The core issue is that the operating system's self-healing mechanisms are failing to identify or rectify the underlying problem, leading to an endless cycle of attempted repair and subsequent failure.

**2. Why It Happens**
Several root causes can lead to Windows getting trapped in an Automatic Repair loop. Fundamentally, the loop occurs when critical system files or boot configuration data become corrupted or inaccessible, preventing Windows from initiating a normal startup sequence. Common culprits include corrupted Boot Configuration Data (BCD), which tells Windows how to start; damaged system files crucial for the operating system's integrity; or issues with the Windows Registry.

Furthermore, recently installed updates, faulty device drivers, or even malware can introduce instability that triggers the repair loop. Hardware problems, such as a failing hard drive or memory issues, can also prevent Windows from reading necessary boot files correctly. Unexpected power outages during critical write operations or system updates can leave files in an inconsistent state, making the system unbootable and forcing it into this diagnostic loop. The system's inability to resolve these issues means it continuously attempts the repair, fails, and reboots to try again.

**3. Step-by-Step Solution**

To resolve the Windows Automatic Repair loop, you'll need to access the Windows Recovery Environment (WinRE). If your PC consistently enters the loop, it should eventually present the "Advanced options" screen. If not, you may need a Windows installation USB drive or DVD to boot into WinRE.

### Step 1: Access Advanced Startup Options

When you encounter the "Automatic Repair couldn't repair your PC" or "Your PC did not start correctly" screen, click on **Advanced options**. This will take you to the Choose an option screen in the Windows Recovery Environment. From here, select **Troubleshoot**, then **Advanced options**. This is the gateway to all the diagnostic and repair tools we'll be using.

### Step 2: Try Startup Repair

While often unsuccessful in breaking severe repair loops, "Startup Repair" is the first and simplest diagnostic tool to try. It's designed to fix common issues that prevent Windows from loading.

1.  From the **Advanced options** screen (accessed in Step 1), select **Startup Repair**.
2.  Choose your operating system (e.g., "Windows 10" or "Windows 11").
3.  Allow the process to complete. It may take some time.
4.  If it succeeds, your PC should restart normally. If it fails, you'll likely return to the "Automatic Repair couldn't repair your PC" screen, and you should proceed to the next steps.

### Step 3: Uninstall Recent Updates

Sometimes, a problematic Windows update can be the cause of the repair loop. Windows provides an option to uninstall recent quality or feature updates.

1.  From the **Advanced options** screen, select **Uninstall Updates**.
2.  You'll be presented with two options: **Uninstall latest quality update** and **Uninstall latest feature update**.
3.  Start by selecting **Uninstall latest quality update**. If that doesn't resolve the issue after a restart, go back and try **Uninstall latest feature update**.
4.  Follow the prompts to complete the uninstallation. If successful, your PC should restart normally.

### Step 4: Run SFC and DISM Commands

Corrupt system files are a common cause of boot issues. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can help repair them.

1.  From the **Advanced options** screen, select **Command Prompt**.
2.  Once the Command Prompt window opens, first type `sfc /scannow` and press Enter. This command scans for and repairs corrupted Windows system files. This process can take a significant amount of time; do not close the window until it completes.
3.  If SFC finds issues it can't fix, or if the problem persists, run the DISM commands. DISM is used to repair the Windows image itself. Type the following commands one by one, pressing Enter after each:
    *   `DISM /Online /Cleanup-Image /CheckHealth`
    *   `DISM /Online /Cleanup-Image /ScanHealth`
    *   `DISM /Online /Cleanup-Image /RestoreHealth`
    *   *Note: If you are in the WinRE environment and not fully booted into Windows, the `/Online` parameter might not work. In such cases, you might need to specify a source for the repair files, typically from a Windows installation media. However, often `/Online` works even in WinRE for basic repairs.*
4.  After these commands complete, type `exit` and press Enter to close the Command Prompt. Try restarting your PC.

### Step 5: Check Disk for Errors (chkdsk)

Disk errors, bad sectors, or file system corruption on your hard drive can also lead to boot problems.

1.  From the **Advanced options** screen, select **Command Prompt**.
2.  Type `chkdsk C: /f /r /x` and press Enter.
    *   `C:` refers to your primary Windows drive. If Windows is installed on a different drive letter, replace `C:` accordingly.
    *   `/f` fixes errors on the disk.
    *   `/r` locates bad sectors and recovers readable information.
    *   `/x` forces the volume to dismount first if necessary.
3.  If prompted to schedule the check on the next restart, type `Y` and press Enter (though usually, it runs immediately from WinRE).
4.  This scan can take a very long time, especially for large drives. Let it complete.
5.  After completion, type `exit` and press Enter and try restarting your PC.

### Step 6: Rebuild the Boot Configuration Data (BCD)

The BCD stores information about how Windows starts. If it's corrupted, Windows won't boot.

1.  From the **Advanced options** screen, select **Command Prompt**.
2.  Enter the following commands sequentially, pressing Enter after each:
    *   `bootrec /scanos` (This scans for Windows installations and lists them.)
    *   `bootrec /fixmbr` (Writes a new master boot record.)
    *   `bootrec /fixboot` (Writes a new boot sector. If you get "Access Denied," you may need to format the EFI partition. This is a more advanced step and generally `fixboot` works without issue.)
    *   `bootrec /rebuildbcd` (Scans for Windows installations and lets you add them to the BCD.)
3.  If `bootrec /fixboot` returns "Access Denied," you might need to assign a drive letter to the EFI partition first.
    *   Type `diskpart` and press Enter.
    *   Type `list volume` and press Enter (identify the EFI partition, usually FAT32, small size, like 100-500MB). Note its volume number (e.g., Volume 2).
    *   Type `select volume [number]` (replace `[number]` with your EFI partition's volume number).
    *   Type `assign letter=Z` and press Enter (you can use any unused letter).
    *   Type `exit` to leave diskpart.
    *   Now, you can attempt to recreate the boot directory:
        *   `cd /d Z:\EFI\Microsoft\Boot\`
        *   `bootrec /fixboot` (This should now work)
        *   `ren BCD BCD.old` (Renames the old BCD store)
        *   `bcdboot C:\Windows /l en-us /s Z: /f ALL` (This command rebuilds the BCD, assuming C: is your Windows drive, Z: is your EFI partition, and en-us is your language)
    *   *Note: This sequence is more complex. Only proceed if `bootrec /fixboot` fails with "Access Denied."*
4.  After rebuilding the BCD, type `exit` and press Enter. Restart your PC.

### Step 7: System Restore or Reset This PC

If the above steps fail, you might need to revert your system to an earlier state or reinstall Windows.

1.  From the **Advanced options** screen, select **System Restore**. This will revert your system to a previous restore point, hopefully before the problem occurred, without affecting your personal files. Choose an appropriate restore point and follow the prompts.
2.  If System Restore doesn't work or if you don't have a restore point, go back to **Troubleshoot** and select **Reset this PC**.
    *   You'll have two options: **Keep my files** (removes apps and settings but keeps personal data) or **Remove everything** (a full factory reset).
    *   **Keep my files** is often enough to fix boot issues.
    *   *Warning: "Remove everything" will erase all your personal data and installed programs. Only use this as a last resort.*
3.  Follow the on-screen instructions. This process can take a long time.

**4. Common Mistakes**
One of the most common mistakes users make is immediately attempting a full Windows reinstallation without exhausting the diagnostic and repair options available in the Windows Recovery Environment. This can lead to unnecessary data loss if files aren't backed up. Another pitfall is neglecting to verify the correct drive letter for Windows (which might not always be 'C:' in the WinRE command prompt) when running commands like `chkdsk` or `bcdboot`, leading to commands failing or targeting the wrong partition. Furthermore, users often prematurely exit diagnostic scans like `sfc /scannow` or `chkdsk` before they complete, rendering them ineffective.

Skipping steps or performing them out of logical sequence can also hinder troubleshooting efforts. For instance, attempting to rebuild the BCD before checking for disk errors or corrupted system files might address a symptom without resolving the underlying cause. Finally, panicking and making impulsive changes without understanding the implications of specific commands can further complicate the problem, potentially rendering the system unbootable or unrecoverable without professional assistance.

**5. Prevention Tips**
Preventing your Windows system from falling into an Automatic Repair loop involves several proactive measures. Regularly creating System Restore points, especially before installing new drivers or major software, provides a quick and easy rollback option if something goes wrong. Implementing a consistent backup strategy for your important data, either to an external drive or cloud service, ensures that even in the worst-case scenario (like a full system reset), your personal files remain safe.

Maintaining up-to-date but stable device drivers and keeping your Windows operating system updated with the latest security patches and quality updates (while being mindful of potential problematic updates) are crucial. Good antivirus software and regular scans can prevent malware from corrupting system files. Furthermore, always performing proper shutdowns (avoiding hard power-offs unless absolutely necessary) and ensuring a stable power supply can prevent file corruption. Creating a Windows installation media or recovery drive beforehand is also invaluable, as it provides a reliable way to access the Advanced Startup Options when your PC won't boot normally.