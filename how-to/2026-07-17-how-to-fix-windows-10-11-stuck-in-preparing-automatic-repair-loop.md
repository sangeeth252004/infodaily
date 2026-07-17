---
title: "How to Fix Windows 10/11 Stuck in 'Preparing Automatic Repair' Loop"
date: "2026-07-17T16:14:44.118Z"
slug: "how-to-fix-windows-10-11-stuck-in-preparing-automatic-repair-loop"
type: "how-to"
description: "Resolve Windows 10/11 getting stuck in the 'Preparing Automatic Repair' loop. This guide provides step-by-step solutions, from system checks to boot configuration fixes, to restore your PC."
keywords: "Windows 10, Windows 11, Preparing Automatic Repair, automatic repair loop, boot loop, system repair, WinRE, command prompt, SFC, DISM, BCD rebuild, chkdsk, startup repair"
---

### Problem Explanation

Users encountering the "Preparing Automatic Repair" loop find their Windows 10 or Windows 11 PC unable to boot normally. The system powers on, displays the manufacturer's logo, and then proceeds to a black screen with the message "Preparing Automatic Repair" appearing, often followed by "Diagnosing your PC." Instead of resolving the issue, the system either reboots and repeats the cycle indefinitely, or presents a blue "Automatic Repair" screen with options that ultimately fail to fix the underlying problem, returning the user to the same loop. This state renders the operating system inaccessible, preventing users from logging in or using their computer.

This persistent loop signifies a critical failure in the Windows startup process. The operating system attempts to initiate its built-in recovery environment to self-diagnose and repair boot issues, but it continuously fails to complete this process or identify a viable solution. The result is a frustrating cycle where the PC never fully loads Windows, leaving users without access to their files or applications.

### Why It Happens

The "Preparing Automatic Repair" loop typically occurs due to corrupted system files, boot configuration data (BCD) errors, or issues with device drivers that prevent Windows from starting correctly. Common triggers include recent Windows updates that went awry, power outages during critical system operations, incorrect shutdowns, or malware infections that have damaged core OS components. Essentially, something has interfered with the integrity of the boot-up sequence, making it impossible for Windows to load all necessary components for a stable environment.

Beyond software corruption, hardware problems can also instigate this loop. A failing hard drive or solid-state drive (SSD), faulty RAM, or even a corrupted Master Boot Record (MBR) can cause critical boot files to become unreadable or inaccessible. When Windows detects an inability to boot properly, it defaults to the automatic repair process. However, if the tools within this environment are themselves compromised, or if the underlying issue is too severe (like physical damage to the boot drive), the repair process fails repeatedly, leading to the endless loop.

### Step-by-Step Solution

The goal is to access the Windows Recovery Environment (WinRE) to utilize its diagnostic and repair tools.

#### ## Step 1: Force Shutdown and Access Advanced Startup Options

Since your PC is stuck in a loop, you need to interrupt the boot process to reach the Windows Recovery Environment (WinRE).
1.  **Power on your PC.**
2.  **As soon as you see the Windows logo or the "Preparing Automatic Repair" message, immediately press and hold the power button until the PC shuts down.** (This usually takes about 5-10 seconds).
3.  **Repeat this process two more times.**
4.  On the third or fourth boot attempt, Windows should recognize multiple failed startups and automatically enter the WinRE, presenting you with a "Recovery" screen or "Automatic Repair" options.
5.  From this screen, select **"See advanced repair options"** or **"Advanced options"**.
6.  Then navigate to **Troubleshoot > Advanced options**.

#### ## Step 2: Attempt Startup Repair

This is often the first and simplest solution offered by Windows, though it frequently fails for complex issues.
1.  From the **Advanced options** screen, select **"Startup Repair"**.
2.  Allow the tool to run. It will attempt to diagnose and fix common boot problems.
3.  If it succeeds, your PC will restart normally. If it fails, you will likely return to the "Advanced options" screen. Proceed to the next step.

#### ## Step 3: Uninstall Recent Updates

A problematic Windows update is a common cause of boot loops.
1.  From the **Advanced options** screen, select **"Uninstall Updates"**.
2.  You will be given two options: **"Uninstall latest quality update"** and **"Uninstall latest feature update"**.
3.  Start by selecting **"Uninstall latest quality update"**. Follow the prompts and let the process complete. If successful, your PC might restart normally.
4.  If the problem persists, return to **"Uninstall Updates"** and try **"Uninstall latest feature update"**.
5.  After attempting both, try to boot your PC normally. If it still loops, proceed.

#### ## Step 4: Perform System File Checker (SFC) and DISM Scans

Corrupted system files are a primary cause. We will use Command Prompt to run checks.
1.  From the **Advanced options** screen, select **"Command Prompt"**.
2.  Once the Command Prompt window opens, type the following command and press Enter:
    `sfc /scannow`
    Allow this scan to complete. It will check for and attempt to repair corrupted Windows system files.
3.  After SFC completes, run the Deployment Image Servicing and Management (DISM) tool. Type the following commands one by one, pressing Enter after each:
    `DISM /Online /Cleanup-Image /CheckHealth`
    `DISM /Online /Cleanup-Image /ScanHealth`
    `DISM /Online /Cleanup-Image /RestoreHealth`
    *Note: If Windows is completely unable to boot, the `/Online` switch might not work. In such cases, you might need bootable Windows installation media to run DISM with an offline source, which is beyond the scope of a simple loop fix. However, try these commands first as WinRE often provides enough functionality.*
4.  Close Command Prompt and try to restart your PC.

#### ## Step 5: Rebuild the Boot Configuration Data (BCD)

Corrupted Boot Configuration Data (BCD) or Master Boot Record (MBR) can prevent Windows from finding the operating system.
1.  From the **Advanced options** screen, select **"Command Prompt"**.
2.  Type the following commands one by one, pressing Enter after each:
    `bootrec /fixmbr`
    `bootrec /fixboot`
    *If `bootrec /fixboot` gives an "Access Denied" error, you may need to assign a drive letter to the EFI partition first. This is more advanced and less common for this specific loop, so try the next command first.*
    `bootrec /rebuildbcd`
3.  If prompted to "Add installation to boot list?", type `Y` and press Enter.
4.  After these commands complete, type `exit` and press Enter to close the Command Prompt.
5.  Try restarting your PC.

#### ## Step 6: Check for Hard Drive Errors

A failing hard drive sector or file system corruption can cause boot problems.
1.  From the **Advanced options** screen, select **"Command Prompt"**.
2.  You need to identify the drive letter of your Windows installation. It's often `C:`, but can sometimes be `D:` or `E:` in WinRE. You can try `dir c:` and `dir d:` to see which one contains Windows files (like `Program Files`, `Users`). Assuming it's `C:`, type:
    `chkdsk C: /f /r`
    *Replace `C:` with the correct drive letter if it's different.*
3.  Press Enter. This scan can take a long time, especially for large or damaged drives. The `/f` switch fixes errors on the disk, and `/r` locates bad sectors and recovers readable information.
4.  Once completed, type `exit` and press Enter, then restart your PC.

#### ## Step 7: System Restore or Reset This PC

If none of the above steps work, you may need to revert your system to a previous state or reinstall Windows.
1.  From the **Advanced options** screen:
    *   **System Restore:** Select **"System Restore"**. This will revert your system files, installed applications, and registry to a previous restore point without affecting your personal files. Choose a restore point from before the issue started.
    *   **Reset this PC:** If System Restore fails or no suitable restore points exist, select **"Reset this PC"**. You will be given two options:
        *   **"Keep my files"**: This option reinstalls Windows but preserves your personal files. It will remove installed apps and drivers.
        *   **"Remove everything"**: This option performs a clean reinstallation of Windows, deleting all personal files, apps, and settings. This is a last resort and should only be done after backing up important data if possible (e.g., by connecting the drive to another PC).
2.  Follow the on-screen prompts for your chosen option. These processes can take a significant amount of time.

### Common Mistakes

One common mistake is panicking and immediately attempting drastic solutions like reinstalling Windows without trying less destructive troubleshooting steps first. Many users overlook the power of the Command Prompt tools available in WinRE, which can often resolve the issue without data loss. Another pitfall is not carefully noting the exact error messages or symptoms, which can provide crucial clues for diagnosis. Incorrectly typing commands in the Command Prompt, missing spaces or slashes, can also lead to failure or further frustration. Finally, some users might assume a hardware failure too quickly without ruling out software issues through the advanced repair options.

### Prevention Tips

To minimize the chances of encountering the "Preparing Automatic Repair" loop again, adopt several best practices. Regularly back up your important files to an external drive or cloud service. Create system restore points before installing major updates or new software. Ensure your Windows operating system is always up-to-date with the latest security patches and bug fixes. Use a reliable antivirus program and perform regular scans to protect against malware. Avoid forced shutdowns unless absolutely necessary, and ensure a stable power supply, especially during critical operations like updates. Periodically check your hard drive health using tools like `chkdsk` and keep your device drivers updated from official sources.