---
title: "How to Fix \"No Bootable Device Found\" Error in Windows 10/11"
date: "2026-02-13T20:37:44.622Z"
slug: "how-to-fix-no-bootable-device-found-error-in-windows-10-11"
type: "how-to"
description: "Resolve the \"No Bootable Device Found\" error in Windows 10 and 11 with this practical, step-by-step troubleshooting guide."
keywords: "No Bootable Device Found, Windows 10, Windows 11, boot error, fix boot, computer won't start, BIOS, UEFI, boot order, hard drive error, MBR, boot sector"
---

## Problem Explanation

You're trying to start your Windows computer, expecting it to load the familiar desktop. Instead, you're met with a stark black screen displaying a message like:

*   "No bootable device found."
*   "Boot device not found."
*   "Insert boot disk in specified device."
*   "Boot failure. Insert boot disk and press any key."

This means your computer's firmware (BIOS or UEFI) cannot locate a device with a functional operating system to start from. Your system can power on, but it doesn't know where to find Windows. This prevents your computer from booting into the operating system, leaving you stranded at this error message.

## Why It Happens

The "No Bootable Device Found" error signals that the system's boot loader, which is responsible for initiating the Windows startup process, cannot be found or accessed. This can happen for several reasons. The most common is a change in the boot order within the BIOS/UEFI settings, where the system is trying to boot from a device that doesn't contain a bootable operating system (like a USB drive or network boot). Alternatively, the hard drive or SSD itself might have a problem, such as physical damage, corruption of its boot sector or Master Boot Record (MBR), or it might not be properly connected. In some cases, a recent hardware change or a failed Windows update could also disrupt the boot process.

## Step-by-Step Solution

Here's a systematic approach to troubleshoot and resolve the "No Bootable Device Found" error.

### ## Step 1: Check External Devices

Before delving into system settings, rule out the simplest cause.

1.  **Disconnect all external USB drives, external hard drives, SD cards, and any other removable media.**
2.  **Restart your computer.**

If the computer boots normally, one of these devices was preventing it from finding the internal boot drive. You can then reconnect them one by one to identify the problematic device.

### ## Step 2: Verify Boot Order in BIOS/UEFI

The system firmware dictates which device your computer attempts to boot from first. If this order is incorrect, it will look for a bootable system on the wrong device.

1.  **Restart your computer.**
2.  **As soon as the manufacturer logo appears (or the screen goes black before Windows starts loading), repeatedly press the BIOS/UEFI access key.** Common keys include **F2, F10, F12, DEL, or ESC**. The specific key is usually displayed on the screen for a brief moment. If you miss it, restart and try again.
3.  Once in the BIOS/UEFI setup utility, navigate using your keyboard arrow keys. Look for a section labeled **"Boot," "Boot Order," "Boot Priority,"** or **"Boot Sequence."**
4.  **Ensure your primary boot device is set to your internal hard drive or SSD** (it might be listed as "Windows Boot Manager," the drive manufacturer name, or the drive model).
5.  If you see multiple entries for your boot drive (e.g., UEFI and Legacy modes), ensure the correct one for your Windows installation is prioritized. Typically, for modern systems, the UEFI entry is preferred.
6.  **Save your changes** (usually by pressing **F10**) and **exit** the BIOS/UEFI. The computer will restart.

### ## Step 3: Check Hard Drive Connection (If Comfortable)

A loose or disconnected hard drive can cause this error. This step involves opening your computer, so proceed with caution and only if you're comfortable.

1.  **Power off your computer completely and unplug the power cord.**
2.  **Discharge any static electricity** by touching a grounded metal object.
3.  **Open your computer case** (refer to your computer's manual or manufacturer's website for specific instructions).
4.  **Locate your hard drive or SSD.**
5.  **Carefully remove and reinsert the SATA data cable and SATA power cable** that connect to the drive. Ensure they are seated firmly.
6.  **Close the computer case, reconnect the power cord, and attempt to boot.**

### ## Step 4: Use Windows Recovery Environment (WinRE)

WinRE provides tools to repair startup issues.

1.  **Create a Windows 10/11 Installation Media:** You'll need a USB flash drive (at least 8GB) and another working computer to download the Media Creation Tool from the official Microsoft website. Use the tool to create a bootable USB drive for your Windows version.
2.  **Boot from the USB drive:**
    *   Insert the USB installation media into your computer.
    *   Restart your computer and enter the BIOS/UEFI settings (as in Step 2).
    *   Set the USB drive as the primary boot device.
    *   Save changes and exit.
3.  **Access Startup Repair:**
    *   When the Windows Setup screen appears, select your language, time, and keyboard layout, then click **"Next."**
    *   Click on **"Repair your computer"** in the bottom-left corner.
    *   Select **"Troubleshoot"** > **"Advanced options"** > **"Startup Repair."**
    *   Let the process complete. It will attempt to automatically fix startup problems.

### ## Step 5: Repair Boot Records Using Command Prompt

If Startup Repair fails, you can manually repair the boot sector.

1.  **Follow steps 1-3 from Step 4 to boot from your Windows installation media and access the "Advanced options" menu.**
2.  Select **"Command Prompt."**
3.  **Type the following commands, pressing Enter after each one:**

    ```bash
    bootrec /fixmbr
    bootrec /fixboot
    bootrec /scanos
    bootrec /rebuildbcd
    ```
    *   **`bootrec /fixmbr`**: Writes a new Master Boot Record to the system partition.
    *   **`bootrec /fixboot`**: Writes a new boot sector to the system partition. (You might see an "Access is denied" error here; if so, proceed to the next step.)
    *   **`bootrec /scanos`**: Scans all disks for Windows installations.
    *   **`bootrec /rebuildbcd`**: Scans for Windows installations and allows you to add them to the boot configuration data.

4.  If `bootrec /fixboot` gives "Access denied," you may need to assign a drive letter to the EFI System Partition (ESP) first:
    *   In the Command Prompt, type `diskpart` and press Enter.
    *   Type `list vol` and press Enter to identify the volume letter of your EFI partition (it's usually FAT32 and around 100-500MB).
    *   Type `sel vol X` (replace `X` with the volume number of your EFI partition) and press Enter.
    *   Type `assign letter=Z:` (or any available letter) and press Enter.
    *   Type `exit` to leave Diskpart.
    *   Now, retry `bootrec /fixboot`.
5.  After running the commands, type `exit` to close the Command Prompt and restart your computer. Remove the USB drive.

### ## Step 6: Check Hard Drive Health with CHKDSK

File system errors on your hard drive can cause boot issues.

1.  **Boot from your Windows installation media** (as in Step 4).
2.  Access **"Command Prompt"** from the **"Advanced options"** menu.
3.  **Determine your Windows drive letter:** In Command Prompt, type `diskpart`, then `list volume`. Note the drive letter assigned to your Windows partition (usually C: or D:). If you're unsure, you might need to try `dir C:\` or `dir D:\` to see which one contains your Windows files.
4.  **Type the following command**, replacing `X:` with your Windows drive letter, and press Enter:

    ```bash
    chkdsk X: /f /r
    ```
    *   `/f` fixes errors on the disk.
    *   `/r` locates bad sectors and recovers readable information.

5.  This process can take a significant amount of time. Once it completes, type `exit`, remove the USB, and restart your computer.

### ## Step 7: System Restore or Reset/Reinstall Windows

If none of the above steps work, the problem might be more deeply rooted in your Windows installation or the hardware itself.

*   **System Restore:** If you previously created a restore point, you can revert your system to a state where it was working correctly. From the **"Advanced options"** menu, select **"System Restore."**
*   **Reset this PC:** This option reinstalls Windows while allowing you to keep or remove your files. From the **"Troubleshoot"** menu, select **"Reset this PC."**
*   **Clean Install:** This is the most drastic but often most effective solution if the drive is functional. It involves formatting the drive and installing a fresh copy of Windows. You can initiate this from the Windows installation media by selecting **"Install now"** and following the prompts, making sure to choose a custom installation and format the drive.

## Common Mistakes

A frequent mistake is repeatedly trying to boot from external devices that are still plugged in after a BIOS/UEFI adjustment. Users also sometimes incorrectly identify their boot drive in the BIOS/UEFI, selecting a secondary drive or an incorrect boot mode (e.g., Legacy instead of UEFI or vice-versa) that doesn't match their Windows installation. Another common pitfall is skipping the creation of bootable media, which is essential for accessing the repair tools when Windows itself cannot start. Lastly, users might attempt the command-line repairs without understanding the purpose of each command, potentially leading to further complications.

## Prevention Tips

To prevent the "No Bootable Device Found" error from recurring, maintain good hardware health and software practices. Regularly back up your important data to an external drive or cloud storage. Avoid abruptly shutting down your computer; always use the proper shutdown procedure. Keep your BIOS/UEFI firmware updated, as manufacturers often release updates that improve stability and compatibility. When installing new hardware or making significant system changes, ensure they are compatible and installed correctly. Periodically run disk checks (`chkdsk`) on your system drive to catch potential file system errors before they escalate. Lastly, consider creating a system restore point before performing major software updates or hardware installations.