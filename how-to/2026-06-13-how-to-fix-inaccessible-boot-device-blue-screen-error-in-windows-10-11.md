---
title: "How to Fix \"INACCESSIBLE BOOT DEVICE\" Blue Screen Error in Windows 10/11"
date: "2026-06-13T16:13:31.475Z"
slug: "how-to-fix-inaccessible-boot-device-blue-screen-error-in-windows-10-11"
type: "how-to"
description: "Resolve the \"INACCESSIBLE BOOT DEVICE\" Blue Screen of Death (BSOD) error in Windows 10/11. Learn the causes and follow step-by-step instructions to troubleshoot and fix common boot issues, storage driver problems, and corrupted system files."
keywords: "INACCESSIBLE BOOT DEVICE, Windows 10, Windows 11, BSOD fix, boot error, storage driver, BCD rebuild, MBR fix, startup repair, system files, BIOS settings, UEFI"
---

### Problem Explanation

The "INACCESSIBLE BOOT DEVICE" error is a critical system fault in Windows 10 and Windows 11, typically resulting in a Blue Screen of Death (BSOD). When this error occurs, your system attempts to boot but cannot access the drive containing the Windows operating system. You will see a blue screen displaying the error message "Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you." followed by the "Stop code: INACCESSIBLE BOOT DEVICE." Your computer will then restart, often entering an automatic repair loop or failing to boot into Windows entirely, preventing access to your desktop and files.

This issue indicates that Windows has lost access to the boot device (usually your primary hard drive or solid-state drive) during the startup process. The system either cannot find the boot drive, or it cannot read the necessary boot files from it. This prevents Windows from loading completely and renders your computer unusable until the underlying problem is resolved.

### Why It Happens

The "INACCESSIBLE BOOT DEVICE" error commonly stems from issues related to the storage device itself or how Windows interacts with it. One of the most frequent causes is a corrupted, outdated, or incorrect storage controller driver (e.g., SATA, NVMe controller driver). If Windows cannot properly communicate with the hardware that controls your primary drive, it cannot access the operating system. This is particularly common after a Windows update that introduces incompatible drivers or after a hardware change.

Other significant causes include a corrupted Boot Configuration Data (BCD) or Master Boot Record (MBR), which are critical components that tell Windows how to start. Physical hardware failures, such as a failing hard drive, a loose data cable, or a faulty SATA port, can also trigger this error. Furthermore, recent changes to the system's BIOS/UEFI settings (like switching the SATA operation mode from AHCI to IDE or RAID, or an incorrect boot order), or even a system file corruption, can prevent Windows from locating and booting from the correct device.

### Step-by-Step Solution

Addressing the "INACCESSIBLE BOOT DEVICE" error requires methodical troubleshooting, often utilizing the Windows Recovery Environment (WinRE).

### ## Step 1: Initial Checks and Safe Mode Attempt

Before diving into advanced solutions, perform basic checks.
1.  **Check Physical Connections:** Ensure all power and data cables connected to your hard drive or SSD are securely seated. If you recently moved your PC or installed new hardware, a cable might have come loose.
2.  **Restart:** Sometimes, a simple restart can resolve transient issues. If the PC enters an automatic repair loop, allow it to complete, as it may find a simple fix.
3.  **Attempt Safe Mode:** If Windows tries to boot but fails, it might eventually offer troubleshooting options. Try to boot into Safe Mode:
    *   If Windows fails to boot three times in a row, it should automatically enter WinRE.
    *   From the "Choose an option" screen, select **Troubleshoot > Advanced options > Startup Settings > Restart**.
    *   After the restart, you'll see a list of options. Press `4` or `F4` for "Enable Safe Mode" or `5` or `F5` for "Enable Safe Mode with Networking." If you can boot into Safe Mode, you might be able to update drivers or run system checks from there.

### ## Step 2: Access the Windows Recovery Environment (WinRE)

If Safe Mode is inaccessible, you'll need to enter WinRE using other methods.
1.  **Automatic Entry:** As mentioned, failing to boot Windows three consecutive times will usually trigger automatic entry into WinRE.
2.  **Using Installation Media:** If automatic entry fails, you'll need a Windows 10/11 installation USB drive or DVD.
    *   Insert the media and boot your computer. You may need to change the boot order in your BIOS/UEFI settings to prioritize booting from the USB/DVD.
    *   Once the Windows Setup screen appears, select your language preferences and click **Next**.
    *   Click **Repair your computer** (bottom-left corner) to enter WinRE.
Once in WinRE, select **Troubleshoot** to proceed with advanced options.

### ## Step 3: Run Startup Repair

Startup Repair is an automated diagnostic and repair tool within WinRE that can often fix common boot problems.
1.  From the WinRE "Choose an option" screen, select **Troubleshoot > Advanced options > Startup Repair**.
2.  Select your operating system (e.g., "Windows 10" or "Windows 11").
3.  Allow the tool to run. It will scan for issues and attempt to fix them automatically. This process can take some time.
4.  If it successfully fixes the problem, your PC will restart normally. If it fails, or reports it "couldn't repair your PC," proceed to the next steps.

### ## Step 4: Rebuild Boot Configuration Data (BCD) and Master Boot Record (MBR)

A corrupted BCD or MBR is a common cause of boot errors. You can fix this using Command Prompt in WinRE.
1.  From WinRE, select **Troubleshoot > Advanced options > Command Prompt**.
2.  Once the Command Prompt window opens, type the following commands, pressing `Enter` after each:
    *   `bootrec /fixmbr` (Fixes the Master Boot Record)
    *   `bootrec /fixboot` (Writes a new boot sector to the system partition. If you get "Access is denied," proceed to the next command, then retry this one.)
    *   `bootrec /scanos` (Scans for Windows installations)
    *   `bootrec /rebuildbcd` (Rebuilds the Boot Configuration Data. If it finds Windows installations, type `Y` or `A` to add them to the boot list.)
3.  After executing these commands, type `exit` and press `Enter`.
4.  Restart your computer and check if Windows boots.

### ## Step 5: Check System Files and Disk Integrity

Corrupted system files or bad sectors on your drive can also lead to this error.
1.  From WinRE, go to **Troubleshoot > Advanced options > Command Prompt**.
2.  Run the System File Checker (SFC) command to repair corrupted Windows system files:
    *   `sfc /scannow` (This command requires Windows to be running. If not, you'll need to specify the Windows directory. For WinRE, use: `sfc /scannow /offbootdir=D:\ /offwindir=D:\Windows` replacing `D:` with your actual Windows drive letter, which might not be `C:` in WinRE.)
3.  Next, use Deployment Image Servicing and Management (DISM) to repair the Windows image (Windows 10/11 only):
    *   `DISM /Online /Cleanup-Image /RestoreHealth` (Again, if not in a booted Windows environment, you'll need to specify source paths. In WinRE, you might need an internet connection or specify a Windows ISO as a source if this command fails.)
4.  Finally, check your disk for errors:
    *   `chkdsk /f /r C:` (Replace `C:` with your Windows drive letter. This command attempts to fix errors and recover bad sectors.)
5.  Type `exit` and restart your PC.

### ## Step 6: Verify BIOS/UEFI Settings and Storage Drivers

Incorrect BIOS/UEFI settings or outdated/corrupted storage drivers are prime suspects.
1.  **Access BIOS/UEFI:** Restart your PC and repeatedly press the key to enter BIOS/UEFI setup (commonly `Del`, `F2`, `F10`, `F12`, or `Esc`).
2.  **Check SATA Operation Mode:** Look for settings related to "SATA Mode," "SATA Configuration," or "Storage Configuration." Ensure it is set to **AHCI** (Advanced Host Controller Interface). If it was recently changed to IDE or RAID, switching back to AHCI might fix the issue, but beware that changing this *after* Windows installation can sometimes cause a different boot error if Windows wasn't installed with that mode enabled. If you switched to AHCI and get another BSOD, you may need to switch back and investigate driver injection.
3.  **Check Boot Order:** Verify that your primary hard drive or SSD is listed first in the boot order.
4.  **Load Optimized Defaults:** If unsure, load "Optimized Defaults" or "Factory Defaults" in BIOS/UEFI, save changes, and exit.
5.  **Address Storage Drivers:** This is critical.
    *   If you *can* boot into Safe Mode with Networking (from Step 1), download the latest storage controller drivers (chipset drivers, NVMe drivers) directly from your motherboard manufacturer's website. Install them.
    *   If you can *only* access WinRE:
        *   From Command Prompt (WinRE), it's difficult to install drivers without knowing the exact hardware. Your best bet here is to try the "Uninstall Updates" option in WinRE (**Troubleshoot > Advanced options > Uninstall Updates**) if the error appeared after a recent Windows update, as a problematic driver update could be the cause. Uninstalling the "Latest quality update" or "Latest feature update" might revert the driver.
        *   Alternatively, if you have another PC, download the drivers to a USB drive, then use the Command Prompt in WinRE to try and install them or copy them to the Windows installation's `drivers` folder (this is advanced and requires precise knowledge of driver installation via command line). A more practical approach from WinRE is to aim for a System Restore first if drivers are suspected.

### ## Step 7: System Restore or Reinstallation

If all other steps fail, you may need to restore your system or perform a clean reinstallation.
1.  **System Restore:** From WinRE, select **Troubleshoot > Advanced options > System Restore**. Choose a restore point from before the error began. This will revert your system to an earlier state without affecting your personal files.
2.  **Reset This PC:** If System Restore isn't an option or doesn't work, consider "Reset this PC" from WinRE (**Troubleshoot > Reset this PC**). You'll have the option to "Keep my files" (which removes apps and settings but preserves personal data) or "Remove everything" (a clean slate). Choose "Keep my files" first, and if that fails, "Remove everything."
3.  **Clean Installation:** As a last resort, perform a clean installation of Windows using your installation media. This will erase everything on your boot drive, so ensure you have backups of important data if possible (you may be able to retrieve data by booting from a live Linux USB or connecting the drive to another PC).

### Common Mistakes

When troubleshooting the "INACCESSIBLE BOOT DEVICE" error, users often make several common mistakes. One is immediately jumping to complex solutions without first checking basic hardware connections or attempting Startup Repair. Many issues are simpler than they appear. Another mistake is incorrectly using Command Prompt commands, especially `bootrec` commands, or not knowing which drive letter represents their Windows installation when in WinRE, leading to commands being executed on the wrong partition. Users also frequently overlook the importance of BIOS/UEFI settings, such as the SATA operation mode, which can be a direct cause of the error if changed post-installation. Finally, neglecting to back up data is a significant oversight; while many fixes don't touch personal files, a full system reinstallation (a last resort) will erase everything if not prepared for.

### Prevention Tips

Preventing the "INACCESSIBLE BOOT DEVICE" error primarily involves maintaining system health and being cautious with changes.
1.  **Regular Driver Updates (Carefully):** Keep your storage controller and chipset drivers updated by downloading them directly from your motherboard or PC manufacturer's website. However, avoid automatic driver updates from unknown sources, as incompatible drivers are a common cause of this error. Research driver compatibility before updating.
2.  **Windows Updates:** Allow Windows to install updates, but consider pausing them for a few days after release to see if others report widespread issues. If the error appears after an update, use the "Uninstall Updates" option in WinRE.
3.  **Regular Backups:** Implement a robust backup strategy for your important files and, ideally, create system images. This ensures data recovery is possible even if your boot drive fails completely.
4.  **Hardware Health:** Monitor the health of your primary storage drive using tools that check S.M.A.R.T. data. Ensure internal cables are secure and free from damage.
5.  **System Restore Points:** Ensure System Restore is enabled and that restore points are created automatically (or manually before major changes like driver installations or software updates). This provides an easy rollback option if a change introduces a boot problem.
6.  **BIOS/UEFI Configuration:** Avoid unnecessary changes to your BIOS/UEFI settings, especially those related to storage controllers. If you do change them, understand the implications and document the original settings.