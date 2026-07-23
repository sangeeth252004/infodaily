---
title: "How to Fix 'Operating System Not Found' Error During Startup"
date: "2026-07-23T02:34:57.409Z"
slug: "how-to-fix-operating-system-not-found-error-during-startup"
type: "how-to"
description: "Learn how to troubleshoot and resolve the \"Operating System Not Found\" error that prevents your computer from booting up. This comprehensive guide covers common causes and provides step-by-step solutions."
keywords: "Operating System Not Found, boot error, startup problem, computer won't boot, fix boot, BIOS, UEFI, boot order, hard drive not detected, MBR, boot sector"
---

# How to Fix 'Operating System Not Found' Error During Startup

Encountering the dreaded "Operating System Not Found" error message when you try to start your computer can be a frustrating experience. This message typically appears immediately after your computer's initial hardware check (POST - Power-On Self-Test) and before the familiar operating system loading screen. It signifies that your computer's firmware (BIOS or UEFI) cannot locate the necessary files to load your operating system (like Windows or macOS) from any connected storage device.

When this error occurs, your computer will likely halt at this screen, displaying text similar to:

*   "Operating System Not Found"
*   "No Boot Device Found"
*   "Bootmgr is missing" (for Windows)
*   A black screen with a blinking cursor and the message "Operating System not found"

This prevents your computer from proceeding to the login screen or desktop, effectively rendering it unusable until the issue is resolved.

## Why It Happens

The "Operating System Not Found" error is fundamentally a communication breakdown between your computer's firmware and its storage device containing the operating system. There are several primary reasons this can occur:

1.  **Incorrect Boot Order:** Your computer's firmware is configured to check for bootable operating systems in a specific sequence (e.g., USB drive, CD/DVD drive, hard drive). If the boot order is set incorrectly, or if a non-bootable device is prioritized, the firmware might not find your operating system on the intended drive.
2.  **Corrupted Boot Files:** The Master Boot Record (MBR) or GUID Partition Table (GPT) on your hard drive, which contains critical information about how to boot the operating system, can become corrupted. This corruption can happen due to sudden power outages, improper shutdowns, malware, or disk errors.
3.  **Hardware Failure or Disconnection:** The hard drive or SSD that contains your operating system might be failing, has become physically disconnected from the motherboard, or is not being recognized by the system due to a faulty connection or drive failure.
4.  **BIOS/UEFI Settings Misconfiguration:** Changes made to BIOS/UEFI settings, such as switching between Legacy BIOS and UEFI modes, or incorrect SATA controller modes (AHCI vs. IDE), can prevent the system from recognizing the boot drive.
5.  **New Hardware Installation:** Sometimes, installing new hardware can inadvertently alter boot settings or conflict with existing boot configurations.

## Step-by-Step Solution

Resolving the "Operating System Not Found" error often involves a systematic approach to identify and correct the underlying cause. The following steps will guide you through the troubleshooting process.

### ## Step 1: Check Physical Connections and Boot Order

Before diving into software solutions, it's crucial to ensure the hardware is properly connected and that the system is looking in the right place.

1.  **Restart Your Computer:** A simple restart can sometimes resolve temporary glitches.
2.  **Enter BIOS/UEFI Settings:** As your computer starts up (immediately after pressing the power button), repeatedly press the designated key to enter BIOS or UEFI setup. Common keys include **F2, F10, F12, DEL, or ESC**. The exact key is usually displayed on the screen during the initial boot sequence.
3.  **Locate Boot Order Settings:** Navigate through the BIOS/UEFI menus to find the "Boot," "Boot Order," "Boot Priority," or "Boot Sequence" section.
4.  **Verify Boot Drive Priority:** Ensure that your primary hard drive or SSD (where your operating system is installed) is listed as the first boot device. If you see multiple drives, identify the one that contains your OS.
5.  **Adjust Boot Order (if necessary):** If your hard drive is not at the top, use the on-screen instructions (usually arrow keys and Enter) to move it to the first position.
6.  **Save and Exit:** Select the "Save Changes and Exit" or "Exit Saving Changes" option. Your computer will restart.

If your operating system still doesn't load, proceed to the next step.

### ## Step 2: Perform a Hard Drive Check in BIOS/UEFI

This step verifies if your computer's firmware can detect the hard drive at all.

1.  **Re-enter BIOS/UEFI Settings:** Follow the same procedure as in Step 1 to access your BIOS/UEFI.
2.  **Locate System Information/Storage Configuration:** Look for a section that lists detected storage devices. This might be labeled "System Information," "Standard CMOS Features," "Storage Configuration," "SATA Configuration," or similar.
3.  **Verify Hard Drive Detection:** Check if your hard drive or SSD is listed among the detected devices. If it's not listed here, it suggests a more serious hardware issue (see Step 5).
4.  **Save and Exit:** If the drive is listed, save changes (if any were made) and exit to let the system attempt to boot.

### ## Step 3: Use Startup Repair (Windows)

If your hard drive is detected but the OS isn't loading, the boot configuration might be corrupted. Windows provides a built-in tool to fix this.

1.  **Create a Windows Installation Media:** You'll need a bootable USB drive or DVD containing the Windows installation files for your version of Windows. You can create this on another working computer using the Media Creation Tool from Microsoft's website.
2.  **Boot from Installation Media:** Insert the USB drive or DVD into your computer. Restart the computer and enter BIOS/UEFI settings (as in Step 1). Change the boot order to prioritize the USB drive or DVD drive, then save and exit.
3.  **Start Windows Setup:** Your computer will boot from the installation media. When the Windows Setup screen appears, select your language, time, and keyboard preferences, then click "Next."
4.  **Access Repair Options:** On the next screen, do **not** click "Install now." Instead, click on **"Repair your computer"** in the bottom-left corner.
5.  **Navigate to Startup Repair:** From the "Choose an option" screen, select **"Troubleshoot" > "Advanced options" > "Startup Repair."**
6.  **Let Startup Repair Run:** Windows will attempt to diagnose and fix startup problems automatically. This process can take some time. Once completed, remove the installation media and restart your computer normally.

### ## Step 4: Rebuild the Master Boot Record (MBR) or Boot Configuration Data (BCD)

If Startup Repair doesn't work, you might need to manually repair or rebuild the boot-related data.

1.  **Boot from Windows Installation Media:** Follow steps 1-3 from Step 3 to boot from your Windows installation media.
2.  **Open Command Prompt:** On the "Choose an option" screen, select **"Troubleshoot" > "Advanced options" > "Command Prompt."**
3.  **Rebuild BCD:** In the Command Prompt window, type the following commands, pressing Enter after each one:
    ```
    bootrec /fixmbr
    bootrec /fixboot
    bootrec /scanos
    bootrec /rebuildbcd
    ```
    *   `/fixmbr` writes a new Master Boot Record to the system partition.
    *   `/fixboot` writes a new boot sector to the system partition.
    *   `/scanos` scans all disks for Windows installations.
    *   `/rebuildbcd` rebuilds the Boot Configuration Data. You may be prompted to add installations to the boot list; type **Y** and press Enter.
4.  **Exit and Restart:** Once the commands have executed, type `exit` and press Enter to close the Command Prompt. Then, restart your computer normally, removing the installation media.

### ## Step 5: Check Hard Drive Health and Connections

If the hard drive is not detected in BIOS/UEFI or if the boot repair steps fail, it's time to suspect a hardware problem.

1.  **Power Off Completely:** Shut down your computer and unplug the power cord.
2.  **Open the Computer Case:** Carefully open your computer's case. Refer to your computer's manual if you are unsure how to do this.
3.  **Inspect Data and Power Cables:** Locate your hard drive or SSD. Ensure that both the data cable (usually SATA) connecting it to the motherboard and the power cable connecting it to the power supply unit are firmly seated.
4.  **Reseat Cables:** Gently unplug both cables from the drive and the motherboard/power supply, then firmly plug them back in.
5.  **Test with Different Cables/Ports (if possible):** If you have spare SATA data cables or unused SATA ports on your motherboard, try using them to rule out a faulty cable or port.
6.  **Check Drive in Another Computer (Advanced):** If you are comfortable doing so, you can temporarily remove the drive and connect it to another working computer (either internally or using a USB enclosure) to see if it's detected and accessible.

If the drive is still not detected after reseating cables or testing elsewhere, the hard drive itself may have failed.

### ## Step 6: Consider Operating System Reinstallation or Professional Help

If all previous steps have failed, and especially if the hard drive is not detected by the system, it's highly likely that either the hard drive has failed or there's a more complex motherboard issue.

*   **Hard Drive Failure:** If your hard drive has failed, you will need to replace it. If you have a backup, you can then reinstall your operating system on the new drive. If you don't have a backup, data recovery services might be an option, though they can be expensive.
*   **Motherboard Issue:** In rare cases, a motherboard problem can prevent storage devices from being recognized.
*   **Reinstall Operating System:** If you suspect boot file corruption that cannot be repaired, and your hard drive is functional, a clean installation of your operating system is the next step. Ensure you have backed up any important data if possible before proceeding with a full reinstallation.
*   **Seek Professional Assistance:** If you are uncomfortable performing these steps or if the problem persists, it's best to consult a qualified computer technician.

## Common Mistakes

When troubleshooting the "Operating System Not Found" error, users often make a few common mistakes that can hinder their progress or even worsen the situation:

*   **Ignoring BIOS/UEFI Settings:** Many users jump directly to software solutions without first checking if the BIOS/UEFI is correctly configured to recognize the boot drive and if the boot order is set appropriately.
*   **Forgetting to Save BIOS/UEFI Changes:** If you make changes to the boot order or other settings in BIOS/UEFI, remember to save them before exiting. Simply exiting without saving will revert any changes.
*   **Using Incorrect Installation Media:** Trying to repair Windows with installation media that doesn't match your installed version (e.g., using Windows 10 media to repair Windows 11) can lead to compatibility issues or failure of the repair process.
*   **Overlooking Simple Hardware Checks:** Failing to check physical cable connections for the hard drive is a common oversight. Loose or faulty cables are a frequent culprit for drives not being detected.
*   **Assuming Drive Failure Too Early:** While drive failure is a possibility, it's essential to exhaust all other troubleshooting steps, such as checking cables and BIOS settings, before concluding that the drive is dead.

## Prevention Tips

Preventing the "Operating System Not Found" error involves good computing habits and regular maintenance.

*   **Safe Shutdowns:** Always shut down your computer properly through the operating system's shutdown menu. Avoid force-shutting down by holding the power button unless absolutely necessary, as this can corrupt boot files.
*   **Use a UPS (Uninterruptible Power Supply):** A UPS provides a battery backup in case of power outages, allowing you to safely shut down your computer and preventing sudden power loss that can corrupt data and boot sectors.
*   **Regular Backups:** Regularly back up your important data to an external drive, cloud storage, or a network-attached storage (NAS) device. This ensures that even if your primary drive fails or your OS becomes unbootable, your files are safe.
*   **Keep Drivers Updated:** While less common for this specific error, ensuring your motherboard chipset drivers and storage controller drivers are up-to-date can help maintain system stability.
*   **Monitor Drive Health:** Use diagnostic tools provided by your drive manufacturer or built into the operating system (like `chkdsk` in Windows or Disk Utility in macOS) to check the health of your hard drives or SSDs periodically. Many SSDs also have their own utility software.
*   **Avoid Unauthorized BIOS/UEFI Changes:** Be cautious when modifying BIOS/UEFI settings. If you're unsure about a setting, it's best to leave it at its default or research it thoroughly before changing.