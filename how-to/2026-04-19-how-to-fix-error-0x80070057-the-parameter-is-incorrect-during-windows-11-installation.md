---
title: "How to Fix \"Error 0x80070057: The Parameter Is Incorrect\" During Windows 11 Installation"
date: "2026-04-19T20:36:46.956Z"
slug: "how-to-fix-error-0x80070057-the-parameter-is-incorrect-during-windows-11-installation"
type: "how-to"
description: "Resolve the frustrating \"Error 0x80070057: The Parameter Is Incorrect\" during Windows 11 installation with this comprehensive technical guide."
keywords: "Windows 11 installation error, 0x80070057, parameter is incorrect, fix installation, Windows setup error, troubleshooting"
---

## Problem Explanation

Encountering "Error 0x80070057: The Parameter Is Incorrect" during a Windows 11 installation can halt your upgrade or clean install process abruptly. This error typically manifests as a pop-up window during the file copying or installation phase, preventing the operating system from proceeding. Users might see a message stating something similar to:

"Windows could not install the required files. The error is 0x80070057. This could be due to a corrupted file or a problem with your computer's hardware."

This error signifies that a critical parameter passed to a system function during the installation is invalid or unexpected, leading to the setup process failing. It's a common yet disruptive issue that requires a systematic approach to diagnose and resolve.

## Why It Happens

The "Error 0x80070057" during Windows 11 installation is often rooted in issues related to data integrity and storage. The most frequent culprits include:

*   **Corrupted Installation Media:** The USB drive or DVD containing the Windows 11 installation files may have become corrupted during the download, creation process, or due to a faulty drive itself. If any part of the ISO image is damaged, or if the writing process to the bootable media was incomplete, the setup process will encounter invalid parameters when trying to read these files.
*   **Hard Drive/SSD Issues:** Problems with the target storage device (HDD or SSD) are another significant cause. This could involve bad sectors, a failing drive, or incorrect partitioning. The Windows installer needs to access and write to specific locations on the disk, and if these operations are hindered by disk errors, the "parameter is incorrect" error can arise.
*   **Registry Corruption (Less Common during initial install):** While more common during an in-place upgrade or after installation, severe underlying registry corruption on the source system (if upgrading) could theoretically interfere with the setup process, though this is a less likely primary cause for a clean install error.
*   **BIOS/UEFI Settings:** Incorrect or conflicting BIOS/UEFI settings, particularly those related to storage controller modes (e.g., AHCI vs. IDE, RAID configurations), can sometimes lead to parameter errors when the installer attempts to communicate with the storage hardware.

Understanding these potential causes is the first step toward effectively troubleshooting and resolving the error.

## Step-by-Step Solution

The following steps outline a comprehensive approach to resolving "Error 0x80070057" during Windows 11 installation. It's recommended to proceed through them sequentially.

### ## Step 1: Verify and Recreate the Installation Media

A corrupted or improperly created bootable USB drive is a prime suspect. This process ensures the integrity of your installation source.

1.  **Download the Latest Windows 11 ISO:** Visit the official Microsoft Download Windows 11 page and download the latest ISO file. Ensure you are downloading from a trusted Microsoft source.
2.  **Format the USB Drive:**
    *   Connect your USB drive (at least 8GB, preferably 16GB or larger).
    *   Open **Command Prompt as Administrator**. To do this, search for "cmd" in the Start menu, right-click on "Command Prompt," and select "Run as administrator."
    *   Type `diskpart` and press Enter.
    *   Type `list disk` and press Enter to see a list of all connected drives.
    *   **Carefully** identify your USB drive by its size and type `select disk X` (replace `X` with the number corresponding to your USB drive). **Ensure you select the correct disk to avoid data loss on other drives.**
    *   Type `clean` and press Enter. This will erase all data on the USB drive.
    *   Type `create partition primary` and press Enter.
    *   Type `select partition 1` and press Enter.
    *   Type `active` and press Enter.
    *   Type `format fs=fat32 quick` and press Enter. (For UEFI systems, FAT32 is generally preferred for bootability. For older BIOS systems or if FAT32 fails, you might try `format fs=ntfs quick`).
    *   Type `assign` and press Enter.
    *   Type `exit` and press Enter to leave Diskpart.
3.  **Mount the ISO and Copy Files:**
    *   In File Explorer, double-click the downloaded Windows 11 ISO file. This will mount it as a virtual drive.
    *   Open another instance of File Explorer, navigate to the mounted ISO drive, select all its contents (Ctrl+A), and copy them (Ctrl+C).
    *   Navigate to your formatted USB drive, and paste all the copied files (Ctrl+V).
    *   Wait for the file transfer to complete.

### ## Step 2: Test the Target Hard Drive/SSD

If the installation media is verified, the issue likely lies with the target drive.

1.  **Access Command Prompt from Windows Recovery Environment:**
    *   Boot from your newly created Windows 11 USB drive.
    *   When the Windows Setup screen appears, select your language, time, and keyboard preferences, then click "Next."
    *   Click **"Repair your computer"** (usually in the bottom-left corner).
    *   Select **"Troubleshoot."**
    *   Select **"Advanced options."**
    *   Select **"Command Prompt."**
2.  **Run Disk Check (CHKDSK):**
    *   In the Command Prompt window, type `chkdsk C: /f /r` and press Enter. (Replace `C:` with the drive letter where you intend to install Windows if it's different. You might need to check which drive letter is assigned to your system drive within the recovery environment, as it may not always be C:).
    *   This command will scan the drive for errors, attempt to fix them (`/f`), and locate bad sectors, attempting to recover readable information (`/r`). This process can take a considerable amount of time, especially on larger drives.
    *   If prompted to schedule the check on the next restart, type `Y` and press Enter, then restart your computer. The check will run before Windows boots.

### ## Step 3: Format the Target Drive During Installation

Sometimes, a clean format of the target partition during the installation process itself can resolve underlying file system issues.

1.  **Boot from Installation Media:** Start your computer and boot from your prepared Windows 11 USB drive.
2.  **Proceed to Drive Selection:** Follow the initial setup prompts until you reach the screen asking "Which type of installation do you want?"
3.  **Select "Custom: Install Windows only (advanced)".**
4.  **Identify and Format the Target Partition:**
    *   You will see a list of drives and partitions. **Carefully select the partition where you intend to install Windows 11.**
    *   **WARNING:** Formatting a partition will erase all data on it. Ensure you have backed up any important files if this is not a clean install on a new drive.
    *   Click **"Format."** Confirm the operation.
    *   If you are performing a clean install on a drive that has been previously partitioned, you may choose to **"Delete"** existing partitions and then **"New"** to create them again, effectively starting with unallocated space.
    *   Once formatted or re-partitioned, select the desired partition (it should be empty or show unallocated space, then click "New" and "Apply" to create it) and click **"Next"** to continue the installation.

### ## Step 4: Check and Adjust BIOS/UEFI Storage Settings

Incorrect storage controller modes can interfere with the installer.

1.  **Access BIOS/UEFI:** Restart your computer and press the designated key during boot-up to enter your system's BIOS or UEFI setup. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc`. Consult your motherboard or computer manufacturer's documentation if unsure.
2.  **Locate Storage Controller Settings:** Navigate through the BIOS/UEFI menus to find settings related to SATA Configuration, Storage Mode, or similar.
3.  **Set to AHCI:** Ensure that the SATA controller is set to **AHCI (Advanced Host Controller Interface)** mode. If it's set to IDE or RAID (and you're not intentionally using RAID), try switching it to AHCI.
    *   **Note:** If you are upgrading an existing Windows installation and it was installed in IDE mode, switching to AHCI might cause boot issues for the *current* OS. For a clean install, AHCI is generally the recommended and most compatible mode. If you encounter issues after changing to AHCI, you might need to revert if you cannot complete the Windows 11 installation.
4.  **Save and Exit:** Save your BIOS/UEFI changes and exit. The computer will restart, and you can then attempt the Windows 11 installation again.

### ## Step 5: Run System File Checker (SFC) and DISM (if upgrading)

If you are encountering this error during an in-place upgrade from a previous Windows version, underlying system file corruption on the source OS might be the cause.

1.  **Boot into Existing Windows:** Start your computer into your current Windows operating system.
2.  **Open Command Prompt as Administrator:** Search for "cmd," right-click "Command Prompt," and select "Run as administrator."
3.  **Run SFC:** Type `sfc /scannow` and press Enter. This will scan for and attempt to repair corrupted system files.
4.  **Run DISM:** After SFC completes, type the following commands one by one, pressing Enter after each:
    ```bash
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    These DISM commands will check for and repair image corruption, which can sometimes affect the SFC scan.
5.  **Restart and Retry Installation:** Once these scans are complete, restart your computer and attempt the Windows 11 installation again.

## Common Mistakes

Users often make a few common mistakes when troubleshooting this error, which can lead to further frustration or data loss:

*   **Not Verifying the ISO:** Users might assume the downloaded ISO is always perfect and skip the step of verifying its integrity or recreating the bootable media. A simple corruption during download can be the sole reason for the error.
*   **Ignoring Hardware:** Focusing solely on software solutions and neglecting potential issues with the hard drive or USB drive can waste time. Running disk checks and ensuring the USB drive is healthy are crucial.
*   **Incorrectly Formatting/Deleting Partitions:** During Step 3, accidentally formatting or deleting the wrong partition can lead to irreversible data loss. Always double-check the drive and partition selection before proceeding.
*   **Not Backing Up Data:** When attempting to format or delete partitions, forgetting to back up critical data beforehand is a common and costly oversight.

## Prevention Tips

To minimize the chances of encountering this or similar errors in the future:

*   **Always Use Official Sources:** Download ISO files and create installation media only from official Microsoft websites. This ensures you're using a clean, uncorrupted source.
*   **Use High-Quality USB Drives:** Invest in reliable, reputable USB flash drives for your bootable media. Cheap, unbranded drives are more prone to corruption and failure.
*   **Perform Regular Disk Health Checks:** Periodically run `chkdsk` on your primary drives to identify and fix potential issues before they escalate and cause installation or operational problems.
*   **Keep Drivers Updated:** Ensure your motherboard's storage drivers (SATA/AHCI/NVMe) are up-to-date. While less critical for initial installation media, up-to-date drivers can prevent communication issues between the OS installer and hardware.
*   **Maintain a Stable Power Supply:** Power interruptions during file copying or installation can corrupt data. Ensure your computer is connected to a stable power source.