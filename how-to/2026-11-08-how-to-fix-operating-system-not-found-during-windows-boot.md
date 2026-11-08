---
title: "How to Fix \"Operating System Not Found\" During Windows Boot"
date: "2026-11-08T19:20:01.354Z"
slug: "how-to-fix-operating-system-not-found-during-windows-boot"
type: "how-to"
description: "Resolve the \"Operating System Not Found\" error on Windows during boot. This guide provides step-by-step solutions from checking boot order to rebuilding boot files and advanced recovery options."
keywords: "Operating System Not Found, Windows boot error, fix boot, MBR repair, BCD rebuild, Windows boot repair, No boot device, bootrec, chkdsk, Windows recovery environment, startup repair"
---

The "Operating System Not Found" error is a critical issue that prevents Windows from starting. This guide provides a comprehensive, step-by-step approach to diagnose and resolve this problem.

### Problem Explanation

When you power on your Windows computer, instead of loading the operating system, you encounter a black screen displaying a message similar to: "Operating System Not Found," "No Operating System Found," "Missing Operating System," or "No Boot Device Found." Sometimes, it might appear as "Bootmgr is missing" or "NTLDR is missing." This error indicates that the computer's Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) firmware cannot locate a valid Windows installation to boot from. The system halts, unable to proceed to the Windows login screen or desktop, leaving the user with an unresponsive machine that cannot start Windows.

### Why It Happens

This error fundamentally occurs because the computer's startup sequence cannot identify or access the necessary boot files or the Windows operating system itself. Several factors can contribute to this. The most common causes include an incorrect boot order configured in the BIOS/UEFI settings, where the system is attempting to boot from a non-bootable device (like a USB stick or network drive) before the actual hard drive. Other reasons include a corrupted Master Boot Record (MBR) or Boot Configuration Data (BCD), which are critical components that tell the system how to load Windows. Physical issues such as a faulty or disconnected hard drive, a corrupted Windows installation, or even a damaged partition table can also trigger this error. Essentially, the computer doesn't know where Windows lives or how to start it.

### Step-by-Step Solution

To effectively troubleshoot and fix the "Operating System Not Found" error, follow these steps systematically. You will need a Windows installation media (USB drive or DVD) for most of these steps.

#### ## Step 1: Check Physical Connections and BIOS/UEFI Boot Order

First, ensure all physical connections are secure and verify the boot order in your computer's firmware settings.

1.  **Power off** your computer completely.
2.  **Disconnect** any external USB drives, DVDs, or other peripherals that are not essential for booting.
3.  **Check Internal Connections:** If comfortable, open your computer case and ensure the SATA data and power cables connecting your hard drive (or SSD) to the motherboard and power supply are firmly seated.
4.  **Enter BIOS/UEFI Setup:** Power on your computer and immediately press the designated key to enter BIOS/UEFI settings. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc` (consult your motherboard or PC manufacturer's documentation if unsure).
5.  **Verify Boot Order:** Navigate to the "Boot" or "Startup" tab within the BIOS/UEFI settings. Ensure that your primary hard drive (the one containing Windows) is listed as the first boot device. If it's not present, it could indicate a hardware failure or disconnection.
6.  **Save and Exit:** Save any changes you've made and exit the BIOS/UEFI. The computer will restart. Check if Windows now boots.

#### ## Step 2: Utilize Windows Automatic Repair

Windows includes a built-in automatic repair utility that can often fix common startup problems.

1.  **Prepare Installation Media:** Insert your Windows installation USB drive or DVD into the computer.
2.  **Boot from Media:** Restart your computer and press the appropriate key (often `F12`, `F10`, `Esc`, or similar) to access the boot menu. Select your installation media to boot from it.
3.  **Windows Setup:** When the Windows Setup screen appears, select your language, time, and keyboard preferences, then click `Next`.
4.  **Access Repair Options:** Click on `Repair your computer` in the bottom-left corner, rather than "Install now."
5.  **Navigate to Startup Repair:** Select `Troubleshoot` > `Advanced options` > `Startup Repair`.
6.  **Select Target OS:** Choose your Windows installation (e.g., "Windows 10" or "Windows 11") if prompted. The utility will attempt to diagnose and fix startup issues.
7.  **Restart:** After the repair process completes, remove the installation media and restart your computer.

#### ## Step 3: Rebuild Boot Configuration Data (BCD) and Master Boot Record (MBR)

If automatic repair fails, manually rebuilding crucial boot components is often the solution. This is done via the Command Prompt in the Windows Recovery Environment.

1.  **Boot to Recovery Environment:** Repeat steps 1-4 from "Step 2: Utilize Windows Automatic Repair" to reach the `Troubleshoot` screen.
2.  **Open Command Prompt:** Select `Troubleshoot` > `Advanced options` > `Command Prompt`.
3.  **Identify OS Drive (Optional but Recommended):**
    *   Type `diskpart` and press `Enter`.
    *   Type `list volume` and press `Enter`. Note the drive letter assigned to your Windows installation (it might not be C: in the recovery environment, often D: or E:). Type `exit` and press `Enter`.
4.  **Rebuild MBR:**
    *   Type `bootrec /fixmbr` and press `Enter`. This writes a new MBR without overwriting the existing partition table.
5.  **Write a New Boot Sector:**
    *   Type `bootrec /fixboot` and press `Enter`. This writes a new boot sector to the system partition. Access might be denied in some UEFI scenarios; proceed to the next step if so.
6.  **Scan for Windows Installations:**
    *   Type `bootrec /scanos` and press `Enter`. This scans all disks for Windows installations.
7.  **Rebuild BCD:**
    *   Type `bootrec /rebuildbcd` and press `Enter`. If `bootrec /scanos` found installations, it will prompt you to add them to the BCD. Type `Y` (Yes) and press `Enter`.
8.  **Exit and Restart:** Type `exit` and press `Enter`, then restart your computer.

#### ## Step 4: Check Disk for Errors

A corrupted file system or bad sectors on the hard drive can cause boot issues. `chkdsk` can scan and fix these problems.

1.  **Access Command Prompt:** Repeat steps 1-2 from "Step 3: Rebuild Boot Configuration Data (BCD) and Master Boot Record (MBR)."
2.  **Run CHKDSK:** Assuming your Windows installation is on drive `C:` (replace with the correct drive letter if it's different):
    *   Type `chkdsk C: /f /r` and press `Enter`.
    *   `/f` fixes errors on the disk.
    *   `/r` locates bad sectors and recovers readable information.
3.  **Wait for Completion:** This process can take a significant amount of time, depending on the drive size and errors found. Do not interrupt it.
4.  **Exit and Restart:** After `chkdsk` completes, type `exit` and press `Enter`, then restart your computer.

#### ## Step 5: Restore System from a Backup or System Restore Point

If you have a system restore point or a full system image backup, you can revert your system to a previous working state.

1.  **Access Advanced Options:** Repeat steps 1-4 from "Step 2: Utilize Windows Automatic Repair" to reach `Troubleshoot` > `Advanced options`.
2.  **System Restore:**
    *   Select `System Restore`.
    *   Choose your Windows installation, then follow the on-screen prompts to select a restore point created before the issue began.
    *   Confirm and proceed with the restore. This will undo recent system changes but keep your personal files.
3.  **System Image Recovery (If Applicable):**
    *   If you created a system image, select `System Image Recovery`.
    *   Follow the prompts to locate and apply your system image. **Warning:** This will overwrite your current disk with the contents of the image, potentially causing data loss for files created after the image.

#### ## Step 6: Perform a Clean Installation of Windows

If all previous steps fail, a clean installation of Windows is the most definitive solution. This will, however, erase all data on the primary drive.

1.  **Backup Data:** If possible, boot into the recovery environment and use Command Prompt (or a live Linux USB) to copy essential files to an external drive.
2.  **Boot from Installation Media:** Repeat steps 1-2 from "Step 2: Utilize Windows Automatic Repair."
3.  **Start Installation:** Click `Install now` on the Windows Setup screen.
4.  **Follow Prompts:** Proceed through the installation wizard, selecting the drive where Windows should be installed. Choose to format the drive if necessary.
5.  **Reinstall Drivers and Software:** After installation, you will need to reinstall all your applications and drivers.

### Common Mistakes

*   **Ignoring Physical Checks:** Many users jump straight to software fixes without verifying if the hard drive is properly connected or if there's a simpler hardware issue.
*   **Incorrect BIOS/UEFI Settings:** Accidentally changing boot order to a non-existent device or disabling the correct drive can exacerbate the problem.
*   **Not Using Proper Installation Media:** Attempting repairs without a valid Windows installation USB/DVD that matches your Windows version.
*   **Misidentifying the OS Drive:** In the Command Prompt environment, the C: drive letter might be assigned to the recovery partition, not your actual Windows installation. Always verify with `diskpart` if unsure.
*   **Interrupting Disk Operations:** Halting `chkdsk` or `bootrec` commands prematurely can lead to further data corruption or an unbootable system.
*   **Forgetting Data Backup:** Proceeding with advanced fixes like `chkdsk /r` or a clean install without backing up critical data, which can be lost during the process.

### Prevention Tips

*   **Regular Backups:** Implement a routine for backing up important files and consider creating system image backups to quickly recover from critical failures.
*   **Safe Shutdowns:** Always shut down Windows properly. Forced shutdowns can sometimes corrupt system files or the boot sector.
*   **Monitor Drive Health:** Use tools (like CrystalDiskInfo) to monitor the health of your hard drive or SSD. Early detection of impending drive failure can prevent data loss and boot issues.
*   **Keep Windows Updated:** Regular Windows updates include stability improvements and bug fixes that can prevent corruption.
*   **Avoid Unnecessary BIOS/UEFI Changes:** Unless you know exactly what you're doing, avoid altering critical boot-related settings in the BIOS/UEFI.
*   **Use Quality Hardware:** Investing in reliable storage devices and power supplies can reduce the risk of hardware-related boot failures.