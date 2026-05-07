---
title: "How to Fix \"No Boot Device Found\" Error on Windows PCs"
date: "2026-05-07T11:46:26.793Z"
slug: "how-to-fix-no-boot-device-found-error-on-windows-pcs"
type: "how-to"
description: "Resolve the \"No Boot Device Found\" error on Windows with this comprehensive guide. Learn to troubleshoot, repair boot files, and prevent future issues."
keywords: "No Boot Device Found, Windows boot error, boot device not found, fix boot error, Windows PC troubleshooting, bootrec, BIOS settings, UEFI, hard drive not detected"
---

The "No Boot Device Found" error is a critical issue that prevents your Windows PC from starting up, leaving you unable to access your operating system and files. When this problem occurs, your computer's Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) is unable to locate a valid storage device containing the necessary boot files to load Windows. Instead of seeing the familiar Windows loading screen, users are typically presented with a black screen displaying messages such as "No Boot Device Found," "No Bootable Device -- Insert boot disk and press any key," or "Boot Device Not Found. Please install an operating system on your hard disk." This indicates that the system cannot find where Windows is installed, or the pathway to it is obstructed.

This frustrating error primarily arises when the computer cannot communicate with the hard drive or Solid State Drive (SSD) that holds the Windows operating system. The root causes can range from simple configuration oversights to significant hardware malfunctions. Common culprits include loose or faulty data cables connecting the storage drive to the motherboard, incorrect boot order settings in the BIOS/UEFI, a corrupt Master Boot Record (MBR) or GUID Partition Table (GPT), damaged boot files, or even a complete failure of the boot drive itself. Understanding these potential causes is the first step toward effective troubleshooting and getting your system back online.

---

## Step-by-Step Solution

### ## Step 1: Perform Basic Checks and Restart

Before diving into complex diagnostics, rule out simple issues.
1.  **Remove Peripherals:** Disconnect all unnecessary external devices (USB drives, external hard drives, printers, second monitors, etc.). Sometimes a non-bootable USB device can confuse the system's boot sequence.
2.  **Hard Reboot:** Perform a full shutdown (hold the power button for 10-15 seconds) and then restart your computer. This can sometimes resolve temporary glitches.
3.  **Check for Disk Activity:** Listen for any sounds from your hard drive during startup. A completely silent drive might indicate a power or hardware failure.

### ## Step 2: Verify Drive Detection and Boot Order in BIOS/UEFI

The BIOS/UEFI firmware controls the fundamental operations of your computer, including which device it attempts to boot from.
1.  **Access BIOS/UEFI Setup:** Restart your PC and repeatedly press the designated key to enter the BIOS/UEFI setup utility. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc`. The specific key often appears on the screen during startup.
2.  **Navigate to Storage/SATA Configuration:** Look for sections labeled "Storage," "SATA Configuration," "Drives," or similar. Confirm that your primary boot drive (SSD or HDD) is listed and recognized by the system. If it's not listed, it points to a potential physical connection issue or drive failure.
3.  **Check and Adjust Boot Order:** Go to the "Boot Options," "Boot Sequence," or "Boot Priority" section. Ensure that your primary hard drive (e.g., "Windows Boot Manager," or the name of your SSD/HDD) is set as the first boot device. If a different device (like a USB drive or network boot) is prioritized, move your Windows boot drive to the top of the list.
4.  **Save Changes and Exit:** Save any changes you made (usually by pressing `F10`) and exit the BIOS/UEFI utility. Your computer will restart.

### ## Step 3: Check Physical Drive Connections

A loose or faulty cable is a common, yet often overlooked, cause.
1.  **Power Down and Disconnect:** Completely shut down your computer and disconnect it from the power outlet. For laptops, remove the battery if possible.
2.  **Open PC Case:** Open your computer's case to access the internal components. For laptops, consult your manual for access to the storage drive bay.
3.  **Reseat Cables:** Locate your primary boot drive. Carefully disconnect and then firmly re-connect both the **SATA data cable** (narrow, flat cable connecting to the motherboard) and the **SATA power cable** (wider cable from the power supply unit).
4.  **Try Different Ports/Cables:** If available, try connecting the SATA data cable to a different SATA port on your motherboard. If you have spare cables, try replacing both the SATA data and power cables to rule out cable failure.
5.  **Secure Drive:** Ensure the drive itself is securely mounted in its bay.
6.  **Close Case and Restart:** Close the case, reconnect power, and attempt to boot your PC.

### ## Step 4: Run System Diagnostics (If Available)

Many modern PCs come with built-in diagnostic tools that can test hardware components, including storage drives.
1.  **Access Diagnostics:** Restart your computer and look for a prompt during startup (e.g., "Press F12 for Boot Menu" or "Press F9 for Diagnostics"). The key varies by manufacturer.
2.  **Run Storage Test:** Within the diagnostic utility, select the option to test your hard drive or SSD. This typically performs a quick self-test and may provide an error code if a problem is detected.
3.  **Interpret Results:** If the diagnostic reports an error with your storage drive, it strongly suggests a hardware failure, indicating the drive may need replacement.

### ## Step 5: Repair Windows Boot Files using Installation Media

If your drive is detected and physically sound, the problem likely lies with corrupted Windows boot files. This requires a Windows installation USB or DVD.
1.  **Create Windows Installation Media:** If you don't have one, create a bootable USB drive using the Media Creation Tool from Microsoft on another working PC.
2.  **Boot from Installation Media:** Insert the USB/DVD, restart your PC, and press the designated key (often `F12`, `F10`, or `Esc`) to access the Boot Menu. Select your USB drive or DVD drive as the boot device.
3.  **Access Repair Options:** Once the Windows setup screen appears, choose your language and keyboard layout, then click "Next." Instead of "Install now," click "Repair your computer" in the bottom-left corner.
4.  **Navigate to Command Prompt:** Go to "Troubleshoot" > "Advanced options" > "Command Prompt."
5.  **Execute Boot Repair Commands:** In the Command Prompt, type the following commands, pressing `Enter` after each:
    *   `bootrec /fixmbr` (Repairs the Master Boot Record)
    *   `bootrec /fixboot` (Writes a new boot sector)
    *   `bootrec /rebuildbcd` (Scans for Windows installations and adds them to the Boot Configuration Data)
    *   `exit`
6.  **Restart:** Remove the installation media and restart your computer.

### ## Step 6: Check BIOS/UEFI Boot Mode (Legacy/UEFI) and Secure Boot

An incorrect boot mode can prevent the system from recognizing your Windows installation, especially if you've recently reinstalled Windows or changed hardware.
1.  **Access BIOS/UEFI:** Restart your PC and enter the BIOS/UEFI setup (as in Step 2).
2.  **Locate Boot Mode Settings:** Look for sections like "Boot Mode," "UEFI/Legacy Boot," or "CSM (Compatibility Support Module)."
3.  **Match Boot Mode to Installation:**
    *   If your Windows installation uses **UEFI** (common for Windows 8/10/11 on newer systems), ensure "UEFI" mode is selected.
    *   If your Windows installation uses **Legacy BIOS** (older systems or specific configurations), ensure "Legacy" or "CSM" is enabled.
    *   Generally, if your drive uses GPT partitioning, it needs UEFI. If it uses MBR, it needs Legacy.
4.  **Secure Boot:** While in BIOS/UEFI, temporarily disable "Secure Boot" if it's enabled and you're troubleshooting boot issues, then re-enable it after resolving the problem if desired.
5.  **Save and Exit:** Save changes and restart your computer.

### ## Step 7: Consider Drive Failure or Windows Reinstallation

If none of the above steps resolve the issue, and especially if your drive is not detected in BIOS/UEFI or fails diagnostics, it points strongly to a failing or failed boot drive.
1.  **Data Recovery (Optional):** If the drive is partially functional and contains critical data, consider connecting it as a secondary drive to another PC using a SATA-to-USB adapter to attempt data recovery before further action.
2.  **Replace Drive:** If the drive is confirmed faulty, it will need to be replaced.
3.  **Reinstall Windows:** After replacing the drive, or if you suspect deep corruption beyond repair, you will need to perform a clean installation of Windows using your installation media. Be aware that this will erase all data on the target drive.

---

## Common Mistakes

When troubleshooting the "No Boot Device Found" error, several common mistakes can prolong the process or exacerbate the problem:

*   **Ignoring Physical Connections:** Many users immediately jump to software solutions without first checking that the hard drive is properly connected and receiving power. A loose SATA cable or power connector is a surprisingly common cause, and it's the easiest to fix.
*   **Incorrect BIOS/UEFI Settings:** Users might incorrectly set the boot order, prioritize a non-bootable device, or mistakenly switch between UEFI and Legacy boot modes without understanding their implications, causing further boot failures. Always ensure the primary drive with Windows is prioritized.
*   **Panicking and Reinstalling Windows Immediately:** Rushing to reinstall Windows without attempting basic troubleshooting can lead to data loss and is often unnecessary. Most issues can be resolved without a full reinstallation. Always back up data if possible before resorting to a clean install.

---

## Prevention Tips

Preventing the "No Boot Device Found" error largely revolves around good computer maintenance practices and data security.

*   **Regular Data Backups:** The most crucial prevention tip is to regularly back up your important files. While not preventing the error itself, a current backup ensures that you can recover your data even if your boot drive completely fails. Use cloud services, external hard drives, or network-attached storage.
*   **Safe Shutdown Procedures:** Always shut down your computer properly through the Windows Start menu rather than simply cutting power. Abrupt power loss can corrupt system files, including those critical for booting.
*   **Monitor Drive Health:** Utilize built-in Windows tools or third-party software to monitor the health of your SSD or HDD. Tools like CrystalDiskInfo can report SMART (Self-Monitoring, Analysis, and Reporting Technology) data, providing early warnings of potential drive failure.
*   **Handle Hardware with Care:** When installing new components or cleaning your PC, be gentle with internal cables and connections. Ensure all cables are firmly seated but not strained. Avoid bumping or dropping your computer, especially if it contains a traditional hard drive.
*   **Keep Drivers and Firmware Updated:** While less common, outdated storage controller drivers or motherboard BIOS/UEFI firmware can sometimes contribute to boot issues. Ensure your system's essential drivers and firmware are kept reasonably up-to-date.