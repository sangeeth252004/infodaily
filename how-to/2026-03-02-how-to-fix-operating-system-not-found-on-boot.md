---
title: "How to Fix 'Operating System Not Found' on Boot"
date: "2026-03-02T15:41:17.149Z"
slug: "how-to-fix-operating-system-not-found-on-boot"
type: "how-to"
description: "A comprehensive, step-by-step guide to troubleshoot and fix the 'Operating System Not Found' error on boot. Learn causes, solutions, and prevention tips."
keywords: "operating system not found, boot error, fix boot, Windows repair, MBR repair, BCD rebuild, startup repair, computer won't boot, bootrec, chkdsk, hardware failure, BIOS boot order"
---

## Problem Explanation

When you power on your computer, you expect it to load your operating system (OS) and present you with a login screen or desktop. However, sometimes the boot process halts abruptly with a stark message like "Operating System Not Found," "No Operating System," "Missing Operating System," or "BOOTMGR is missing." This typically appears on a black screen, preventing any further progress. The computer is unable to locate or initiate the essential files required to start Windows or another installed OS, leaving you with an unbootable system.

This error indicates that the basic input/output system (BIOS) or Unified Extensible Firmware Interface (UEFI) firmware cannot find a valid bootable device or that the boot loader on the detected device is corrupted or missing. It's a critical error that prevents your computer from functioning, as the OS is the foundation upon which all other software runs.

## Why It Happens

This problem primarily stems from the computer's inability to correctly identify and access the necessary boot files. Several factors can contribute to this issue:

1.  **Incorrect Boot Order:** The BIOS/UEFI settings might be configured to try booting from a non-existent drive, an empty optical drive, or a USB drive before checking the hard drive containing your OS.
2.  **Corrupted Master Boot Record (MBR) or Boot Configuration Data (BCD):** The MBR, located at the beginning of a hard drive, contains information about the drive's partitions and acts as the initial stage of the boot process. The BCD stores boot options and settings. If either of these critical structures becomes corrupted due to power outages, disk write errors, or malware, the OS cannot be found.
3.  **Damaged or Missing System Files:** Essential Windows boot files (like `winload.exe`, `bootmgr`) can become corrupted, deleted, or misplaced, rendering the system unbootable.
4.  **Hard Drive Failure or Disconnection:** The hard drive or solid-state drive (SSD) where the OS resides might be physically disconnected, failing, or has developed bad sectors that encompass critical boot data.
5.  **Failed OS Installation or Updates:** An incomplete or corrupted OS installation, or a failed system update, can leave the boot configuration in an inconsistent state.
6.  **BIOS/UEFI Issues:** Firmware updates gone wrong, or incorrect settings (e.g., Secure Boot conflicting with an older OS installation, or CSM/Legacy mode not enabled for MBR drives) can cause boot failures.

## Step-by-Step Solution

Addressing the "Operating System Not Found" error requires a systematic approach, starting with the simplest checks and progressing to more complex repairs. You will need a Windows installation media (USB drive or DVD) for most of these steps.

### ## Step 1: Verify Boot Order and Hardware Connections

Before delving into software repairs, ensure your computer is attempting to boot from the correct device and that all hardware is properly connected.

1.  **Restart your computer.** As it powers on, repeatedly press the key to enter your BIOS/UEFI settings. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc`. The specific key is often displayed on the screen during startup.
2.  **Navigate to the "Boot" or "Boot Options" menu.**
3.  **Check the Boot Order/Priority.** Ensure that your primary hard drive or SSD (the one containing your operating system) is listed first in the boot sequence. If it's not, move it to the top.
4.  **Save changes and exit** BIOS/UEFI. The computer will restart.
5.  **Physical Connection Check:** If the issue persists, power down your computer completely. Open the computer case and physically check the SATA data cables and power cables connected to your hard drive/SSD. Ensure they are firmly seated at both ends (drive and motherboard/power supply). Loose connections are a common, easily overlooked cause.
6.  **Check for External Media:** Disconnect any USB drives, external hard drives, or optical discs that might be plugged in, as the computer might be trying to boot from them unintentionally.

### ## Step 2: Utilize Automatic Repair (Windows Recovery Environment)

Windows includes a built-in recovery environment (WinRE) that can diagnose and fix many boot problems automatically.

1.  **Prepare Installation Media:** You'll need a Windows installation USB drive or DVD for your version of Windows. If you don't have one, create it using another computer and the official Windows Media Creation Tool.
2.  **Boot from Installation Media:** Insert the USB/DVD and restart your computer. You may need to press a key (like `F12` for boot menu) or re-enter BIOS/UEFI to set the USB/DVD as the primary boot device temporarily.
3.  **Start Windows Setup:** When prompted, select your language, time, and keyboard input.
4.  **Access Repair Options:** Instead of clicking "Install now," click "Repair your computer" in the bottom-left corner.
5.  **Navigate to Startup Repair:** Go to "Troubleshoot" > "Advanced options" > "Startup Repair."
6.  **Select OS:** Choose your operating system (e.g., "Windows 10").
7.  **Allow Repair:** Windows will attempt to diagnose and fix the boot issue automatically. This process can take some time.
8.  **Reboot:** Once finished, remove the installation media and restart your computer.

### ## Step 3: Manually Rebuild Boot Configuration Data (BCD) and Master Boot Record (MBR)

If Startup Repair fails, the MBR or BCD might be severely corrupted and require manual intervention via the Command Prompt in WinRE.

1.  **Access Command Prompt:** Boot from your Windows installation media again (as in Step 2) and navigate to "Repair your computer" > "Troubleshoot" > "Advanced options" > "Command Prompt."
2.  **Execute Bootrec Commands:** Type the following commands, pressing `Enter` after each:
    *   `bootrec /fixmbr` (Writes a new MBR to the system partition, fixing corruption without overwriting existing partition tables.)
    *   `bootrec /fixboot` (Writes a new boot sector to the system partition. This may fail on UEFI systems with "Access is denied" if the EFI partition needs to be mounted first. If it fails, proceed to the next commands.)
    *   `bootrec /scanos` (Scans all disks for Windows installations and displays them.)
    *   `bootrec /rebuildbcd` (Adds missing Windows installations to the BCD. If it finds installations, type `Y` and press `Enter` to add them.)
3.  **Exit and Reboot:** Type `exit` and press `Enter`. Remove the installation media and restart your computer.

*   **UEFI Specific Note for `bootrec /fixboot` failure:** If `bootrec /fixboot` returns "Access is denied" on a UEFI system, you might need to recreate the EFI System Partition or manually configure BCD. This is more advanced. A common approach involves:
    1.  `diskpart`
    2.  `list vol` (identify the EFI partition, usually a small FAT32 volume, e.g., Volume 2)
    3.  `sel vol <EFI_volume_number>`
    4.  `assign letter=Z:` (assign a temporary drive letter)
    5.  `exit`
    6.  `cd /d Z:\efi\microsoft\boot\` (navigate to boot directory on EFI partition)
    7.  `bootrec /fixboot` (try again, might work now)
    8.  If still fails, try `ren BCD BCD.old` (rename corrupted BCD)
    9.  `bootrec /rebuildbcd`
    10. `bcdboot C:\Windows /s Z: /f UEFI` (recreates BCD and boot files, replacing `C:` with your actual Windows drive letter and `Z:` with the assigned EFI letter).
    11. `exit` and reboot.

### ## Step 4: Check Disk for Errors

Corrupted sectors on your hard drive can also prevent the OS from booting. Use the `chkdsk` command to scan and attempt to repair these errors.

1.  **Access Command Prompt:** Boot into WinRE's Command Prompt again (as in Step 3).
2.  **Identify OS Drive Letter:** Your Windows installation might not be C: in the recovery environment. Type `dir c:` then `dir d:` etc., until you find a drive containing `Program Files`, `Users`, and `Windows` folders. Let's assume it's `C:` for now.
3.  **Run Chkdsk:** Type the following command and press `Enter`:
    `chkdsk /f /r C:` (Replace `C:` with the correct drive letter for your Windows installation.)
    *   `/f`: Fixes errors on the disk.
    *   `/r`: Locates bad sectors and recovers readable information. This can take a long time (several hours for large drives).
4.  **Wait for Completion:** Do not interrupt `chkdsk`. Once it finishes, type `exit` and restart your computer.

### ## Step 5: Restore from a System Image or System Restore Point

If you have a system image backup or a system restore point created before the issue, you can use it to revert your system to a working state.

1.  **Access System Restore/Image Recovery:** Boot from your Windows installation media, go to "Repair your computer" > "Troubleshoot" > "Advanced options."
2.  **System Restore:** Choose "System Restore" to revert your system files to an earlier restore point. Follow the on-screen prompts.
3.  **System Image Recovery:** Choose "System Image Recovery" if you have a full system image backup. You will need to locate the backup (e.g., on an external hard drive). Follow the instructions to restore your system.
4.  **Reboot:** After the restore process completes, remove the media and restart.

### ## Step 6: Reinstall the Operating System (Last Resort)

If all previous steps fail, reinstalling Windows is often the most effective solution, though it will typically erase all data on your OS drive.

1.  **Backup Data (If Possible):** If you have another working computer, you might be able to remove your hard drive, connect it as a secondary drive to another PC, and back up your critical files before proceeding. Alternatively, boot a Linux Live USB to copy files.
2.  **Boot from Installation Media:** Insert your Windows installation USB/DVD and boot from it.
3.  **Start Installation:** Select your language and click "Install now."
4.  **Custom Installation:** Choose "Custom: Install Windows only (advanced)."
5.  **Delete Partitions:** Select the partition(s) related to your existing Windows installation (usually C: drive and any small system partitions like EFI or Recovery) and click "Delete." This will remove all data on those partitions.
6.  **Create New Partition:** Select the unallocated space and click "New" to create a new partition, then "Format" it.
7.  **Proceed with Installation:** Select the newly created partition and click "Next" to begin the installation.
8.  **Complete Setup:** Follow the on-screen prompts to complete the Windows installation.

### ## Step 7: Diagnose Hardware Failure

If even a fresh OS installation fails or if the drive is not detected in the BIOS/UEFI, the hard drive itself might be faulty.

1.  **Check Drive Detection:** Re-enter BIOS/UEFI (Step 1). Look for your hard drive/SSD listed under "Storage," "SATA Configuration," or "Boot Devices." If it's not listed, it indicates a significant hardware problem.
2.  **Test Drive on Another PC:** If possible, remove the hard drive/SSD and connect it to another computer as a secondary drive. See if it's detected and accessible.
3.  **Use Diagnostic Tools:** Many drive manufacturers offer diagnostic tools that can be run from a bootable USB.
4.  **Replace Drive:** If the drive is not detected or fails diagnostic tests, it likely needs to be replaced. After replacement, you will need to perform a fresh OS installation (Step 6).
5.  **Professional Help:** If you're uncomfortable with hardware troubleshooting, consider taking your computer to a professional technician.

## Common Mistakes

When encountering the "Operating System Not Found" error, users often make several common mistakes:

*   **Panicking and Reinstalling Immediately:** Many users jump straight to reinstalling Windows without checking basic settings or attempting repairs. This can lead to unnecessary data loss if the issue was simple (like incorrect boot order) and could have been fixed. Always start with the simplest solutions.
*   **Ignoring Hardware Checks:** Overlooking loose cables or a completely failed hard drive in favor of complex software troubleshooting. A quick check of physical connections can save hours.
*   **Incorrectly Identifying Drive Letters:** In the Command Prompt environment, the drive letter for your Windows installation might not be `C:`. Guessing or using the wrong letter for commands like `chkdsk` or `bcdboot` will lead to further errors or no resolution. Always use `dir` or `diskpart` to confirm.
*   **Forgetting to Remove Installation Media:** After successful repairs, leaving the USB drive or DVD in the computer can cause it to try booting from the media again, leading to confusion. Always remove it before the final restart.
*   **Skipping Backups:** Not having a system image or regular file backups means that critical data is at high risk if a full OS reinstall or drive replacement becomes necessary.

## Prevention Tips

Preventing the "Operating System Not Found" error involves adopting good computing practices:

*   **Regular Data and System Backups:** Regularly back up your important files to an external drive or cloud service. Create system image backups periodically using Windows' built-in tools or third-party software. This ensures you can recover quickly from critical failures.
*   **Proper Shutdown Procedures:** Always shut down your computer properly through the OS. Avoid sudden power cuts or holding the power button to force a shutdown, as this can corrupt system files and the MBR/BCD.
*   **Monitor Drive Health:** Use utilities like `CrystalDiskInfo` or Windows' built-in tools to monitor the health of your hard drive or SSD. Early warnings about impending drive failure can help you replace it proactively.
*   **Use a Reliable Power Supply/UPS:** A stable power supply unit (PSU) and an uninterruptible power supply (UPS) can protect your computer from power fluctuations and sudden outages, which are common causes of data corruption.
*   **Keep Drivers and OS Updated:** Ensure your operating system and essential drivers are kept up to date. While updates can sometimes introduce issues, they often include critical bug fixes and stability improvements that can prevent future problems.
*   **Be Cautious with Disk Management Tools:** When using disk management software or partitioning tools, always proceed with caution and ensure you understand the implications of any changes, especially to system partitions.