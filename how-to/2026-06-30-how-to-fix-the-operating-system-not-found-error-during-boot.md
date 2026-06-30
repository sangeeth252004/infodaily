---
title: "How to Fix the \"Operating System Not Found\" Error During Boot"
date: "2026-06-30T12:07:36.798Z"
slug: "how-to-fix-the-operating-system-not-found-error-during-boot"
type: "how-to"
description: "Resolve the \"Operating System Not Found\" error during PC boot with a comprehensive, step-by-step guide covering common causes, boot order checks, boot file repair, and hardware diagnostics."
keywords: "Operating System Not Found, OS Not Found error, boot error, PC won't boot, fix boot order, repair MBR, rebuild BCD, no boot device, Windows boot fix, hardware diagnostic boot"
---

### Problem Explanation

When a computer displays the "Operating System Not Found" error, it signifies that the system's Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) firmware cannot locate a valid operating system to load. This message typically appears shortly after the manufacturer's logo or the initial Power-On Self-Test (POST) screen, often accompanied by variations like "No Boot Device Found," "Missing Operating System," "PXE-E61: Media test failure, check cable," or simply a black screen with a blinking cursor. The system halts, preventing the desktop environment from loading, and the user cannot interact with the operating system.

This error essentially means the computer doesn't know where to find the instructions to start up Windows, Linux, or macOS. It's like a car engine trying to start without fuel – all the basic systems might be working, but the critical component (the operating system) is inaccessible or missing from its expected location. Without a functional operating system, the computer cannot proceed beyond the most basic initialization stages.

### Why It Happens

The "Operating System Not Found" error primarily occurs when the system's firmware fails to identify a bootable drive or, if identified, cannot find the necessary boot files (like the Master Boot Record, MBR, or Boot Configuration Data, BCD) on that drive. Several factors can lead to this:

*   **Incorrect Boot Order:** The most common cause is the BIOS/UEFI being configured to attempt booting from a non-bootable device (e.g., a secondary data drive, a USB drive without an OS, or a network boot server) before the actual primary drive containing the operating system.
*   **Damaged or Disconnected Drive:** The hard disk drive (HDD) or solid-state drive (SSD) containing the operating system might be physically disconnected, faulty, or corrupted, making it undetectable by the system firmware.
*   **Corrupt Boot Sector/Files:** Critical boot files (MBR, BCD, boot partition) can become corrupted due to power outages, improper shutdowns, malware infections, disk errors, or incorrect system configurations, rendering the OS unbootable even if the drive is detected.
*   **Operating System Installation Issues:** An incomplete, failed, or improperly executed operating system installation can leave the drive without the necessary bootloader or system files.
*   **Hardware Failure:** Less common but possible, a failing motherboard, SATA/NVMe controller, or power supply can prevent the storage drive from being recognized or powered correctly.
*   **System Configuration Changes:** Recent changes to partitions, disk management, or multi-boot setups can inadvertently damage or alter the boot information required for the primary OS.

### Step-by-Step Solution

Follow these steps sequentially to diagnose and resolve the "Operating System Not Found" error.

## Step 1: Perform Basic Checks and Remove External Devices

Begin with the simplest troubleshooting steps. Often, overlooked external devices or loose connections are the culprits.

1.  **Remove All External Peripherals:** Disconnect all non-essential external devices, including USB drives, external hard drives, CDs/DVDs in optical drives, memory cards, and any other peripherals except for the keyboard, mouse, and monitor. Sometimes, the system attempts to boot from these devices first, especially if they are bootable.
2.  **Check Internal Connections:** For desktop PCs, power down the system completely, unplug it, and open the case. Carefully check that the SATA/NVMe data cables and power cables connected to your primary hard drive or SSD (the one with your OS) are securely seated at both ends (drive and motherboard/power supply). For laptops, this is more difficult and usually requires professional assistance unless you are experienced.
3.  **Restart the Computer:** After performing these checks, restart your computer and observe if the error persists.

## Step 2: Verify Boot Order in BIOS/UEFI Settings

The most frequent cause is an incorrect boot sequence. Your system needs to know which drive to look at first.

1.  **Access BIOS/UEFI Setup:** As soon as you power on your computer, repeatedly press the designated key to enter the BIOS/UEFI setup. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc`. The specific key is usually displayed on the screen during the initial POST.
2.  **Navigate to Boot Options:** Once in the BIOS/UEFI, look for a section labeled "Boot," "Boot Order," "Boot Priority," or "Startup."
3.  **Set Primary Boot Device:** Ensure that your primary hard drive or SSD (the one where your operating system is installed) is listed as the first boot device. If you have multiple drives, confirm you select the correct one.
    *   **UEFI vs. Legacy/CSM:** Pay attention to "Boot Mode" or "UEFI/Legacy Support" settings. If your OS was installed in UEFI mode, ensure "UEFI" is selected. If it was installed in Legacy/CSM mode (common for older Windows installations), select "Legacy" or "CSM." Mismatched modes can prevent the OS from booting.
4.  **Save and Exit:** Save your changes (often `F10`) and exit the BIOS/UEFI setup. The computer will restart.

## Step 3: Test Hard Drive/SSD Functionality

If the boot order is correct, the issue might be with the drive itself.

1.  **Check Drive Detection in BIOS/UEFI:** Re-enter BIOS/UEFI (as in Step 2). Look for a section like "Main," "Standard CMOS Features," or "Storage Configuration." Verify that your hard drive or SSD is listed and correctly identified. If your drive is not listed here, it indicates a significant problem: either a physical disconnection (revisit Step 1), a dead drive, or a faulty motherboard controller.
2.  **Run System Diagnostics:** Many motherboards and OEM computers (Dell, HP, Lenovo) have built-in hardware diagnostics accessible from the BIOS/UEFI or a dedicated pre-boot menu.
    *   For Dell: Press `F12` during boot and select "Diagnostics" (ePSA).
    *   For HP: Press `Esc` then `F2` for System Diagnostics.
    *   For Lenovo: Press `F12` or `Fn+F12` for Boot Menu, then look for diagnostics.
    *   Run a comprehensive test on your storage drive. If diagnostics report a failure, your drive may be faulty and require replacement.

## Step 4: Repair Boot Files (Windows Specific)

If the drive is detected and appears healthy, the boot files on the drive might be corrupted. This step requires a Windows installation media (USB or DVD).

1.  **Boot from Windows Installation Media:** Insert your Windows installation USB or DVD and restart your computer. You may need to temporarily adjust the boot order in BIOS/UEFI (Step 2) to boot from the installation media.
2.  **Access Repair Options:**
    *   On the Windows Setup screen, select your language and keyboard layout, then click "Next."
    *   Click "Repair your computer" in the bottom-left corner.
    *   Select "Troubleshoot" > "Advanced options."
3.  **Use Startup Repair:** Select "Startup Repair." This tool attempts to automatically fix boot problems. If it fails, proceed to the Command Prompt.
4.  **Use Command Prompt for Boot Repair:**
    *   Select "Command Prompt" from the Advanced options.
    *   Type the following commands, pressing `Enter` after each:
        *   `bootrec /fixmbr` (Writes a new MBR without overwriting the partition table.)
        *   `bootrec /fixboot` (Writes a new boot sector to the system partition.)
        *   `bootrec /scanos` (Scans for Windows installations and displays them.)
        *   `bootrec /rebuildbcd` (Rebuilds the Boot Configuration Data store, which contains boot options.)
    *   After executing these commands, type `exit` and press `Enter`. Remove the installation media and restart your computer.

## Step 5: Check Disk Partitions and Active Status (Windows Specific)

Sometimes, the correct boot partition isn't marked as active, or there are partition issues. This is an advanced step.

1.  **Access Command Prompt (from Windows Installation Media):** Follow steps 1 and 2 from "Step 4" to get back to the Command Prompt.
2.  **Use DiskPart Utility:**
    *   Type `diskpart` and press `Enter`.
    *   Type `list disk` and press `Enter`. Note the disk number corresponding to your primary OS drive (e.g., Disk 0).
    *   Type `select disk X` (replace `X` with your OS disk number) and press `Enter`.
    *   Type `list partition` and press `Enter`. Identify your system partition (often a small partition, 100-500MB, usually formatted as FAT32 or NTFS, sometimes labeled "System").
    *   Type `select partition Y` (replace `Y` with your system partition number) and press `Enter`.
    *   Type `active` and press `Enter`. (This command marks the partition as active. Note: This is primarily for MBR-based systems. UEFI systems use EFI System Partition, which doesn't need to be marked active.)
    *   Type `exit` and press `Enter` to exit DiskPart.
    *   Type `exit` again to close Command Prompt, remove the installation media, and restart your computer.

## Step 6: Reinstall Operating System (Last Resort)

If all previous steps fail, a full operating system reinstallation may be necessary. This is a destructive process that will erase all data on the primary drive.

1.  **Backup Data (If Possible):** If you can, use a Linux Live USB (e.g., Ubuntu Live) or connect your drive to another computer to back up essential files before proceeding.
2.  **Boot from Installation Media:** Insert your Windows installation USB/DVD and boot from it (as in Step 4).
3.  **Perform Custom Installation:**
    *   On the Windows Setup screen, select your language, then click "Next."
    *   Click "Install now."
    *   Enter your product key or click "I don't have a product key."
    *   Accept the license terms and click "Next."
    *   Choose "Custom: Install Windows only (advanced)."
    *   Carefully select the partition where your previous OS was installed (or the entire drive). You may need to delete existing partitions and create a new one to ensure a clean install.
    *   Proceed with the installation.

### Common Mistakes

When troubleshooting the "Operating System Not Found" error, users frequently make a few critical mistakes:

*   **Ignoring External Devices:** Failing to remove all USB drives, CDs/DVDs, or other external storage devices before attempting to boot can mislead the system into trying to boot from an empty or non-bootable device.
*   **Incorrect Boot Order:** Many users adjust the boot order without fully understanding which drive contains their operating system, or they might change the boot mode (UEFI/Legacy) incorrectly, further complicating the issue.
*   **Skipping Basic Checks:** Jumping straight to complex boot repair commands without first verifying physical connections or checking if the drive is even detected in BIOS can waste time and overlook simple solutions.
*   **Assuming Hardware Failure Too Soon:** While hardware failure is a possibility, it's often a software-related boot configuration issue. Rushing to replace hardware without exhausting software troubleshooting can be costly and unnecessary.
*   **Reinstalling OS Without Backup:** Performing a clean operating system reinstallation without backing up critical data is a common and irreversible mistake, leading to permanent data loss.

### Prevention Tips

Preventing the "Operating System Not Found" error primarily involves good system maintenance and careful handling:

*   **Regular Data Backups:** Implement a routine for backing up your important files to an external drive, network location, or cloud storage. This is the single most important prevention strategy, mitigating data loss even if the worst happens.
*   **Safe Shutdown Practices:** Always shut down your computer properly through the operating system. Avoid sudden power cuts or forced shutdowns, as these can corrupt file systems and boot sectors.
*   **Secure Physical Connections:** Periodically check that all internal data and power cables to your hard drives/SSDs are firmly seated. Vibrations or accidental nudges can loosen these connections over time.
*   **Mindful BIOS/UEFI Changes:** Only modify BIOS/UEFI settings if you understand their implications. Unnecessary changes to boot order, SATA modes, or boot modes can introduce boot problems.
*   **Prudent Software Installation and Removal:** Be cautious when installing or uninstalling software, especially disk management utilities or third-party bootloaders, as they can sometimes interfere with the system's boot configuration.
*   **Keep OS and Drivers Updated:** Regularly update your operating system and device drivers. Updates often include fixes for stability issues and security vulnerabilities that could otherwise lead to system corruption.
*   **Use Reliable Anti-Malware Software:** Maintain up-to-date antivirus and anti-malware software to protect against infections that can target and corrupt boot files.