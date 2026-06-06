---
title: "How to Resolve 'No Boot Device Found' Error in Windows 10/11"
date: "2026-06-06T07:45:36.614Z"
slug: "how-to-resolve-no-boot-device-found-error-in-windows-10-11"
type: "how-to"
description: "Comprehensive guide to resolve the 'No Boot Device Found' error in Windows 10/11. Learn common causes and step-by-step solutions for this critical boot issue."
keywords: "No Boot Device Found, Windows 10, Windows 11, boot error, boot device not found, hard drive not detected, fix boot, UEFI, BIOS, MBR, GPT, boot sequence, repair, startup repair"
---

When your Windows 10 or 11 system fails to boot, presenting a "No Boot Device Found" error, it signifies a critical problem preventing the operating system from loading. This guide provides a structured approach to diagnose and resolve this issue, from basic hardware checks to advanced software repairs.

### Problem Explanation

The "No Boot Device Found" error is a common yet frustrating issue that completely prevents your computer from starting up. When this problem occurs, your screen typically remains black after the manufacturer's logo, displaying a message similar to:

*   "No Boot Device Found. Press any key to reboot the machine."
*   "No Bootable Device -- insert boot disk and press any key"
*   "Boot Device Not Found. Please install an operating system on your hard disk."
*   "PXE-E61: Media test failure, check cable." (This specific message often points to network boot attempts when no local boot device is found.)

This message indicates that the system's Basic Input/Output System (BIOS) or Unified Extensible Firmware Interface (UEFI) firmware cannot locate a valid storage device (like a hard drive or SSD) containing an operating system from which to boot. Without a recognized boot device, the computer cannot load Windows, rendering it unusable until the issue is addressed.

### Why It Happens

This error primarily occurs when your computer's BIOS/UEFI is unable to find or access the drive where Windows is installed, or when the boot configuration itself is corrupted. The root causes can range from simple oversights to serious hardware failures.

Common reasons include a loose or faulty data cable connecting the hard drive/SSD to the motherboard, incorrect boot order settings in the BIOS/UEFI that prioritize a non-bootable device, or the boot drive itself becoming corrupted or physically failing. Additionally, changes to hardware, updates to the BIOS/UEFI firmware, or even malware can sometimes interfere with the boot process, leading to this error. Understanding these potential causes is the first step in effective troubleshooting.

### Step-by-Step Solution

Follow these steps methodically to diagnose and resolve the "No Boot Device Found" error.

## Step 1: Perform Basic Checks and Reseat Cables

Before delving into complex software solutions, ensure the hardware is correctly connected.

1.  **Power Cycle:** Turn off your computer completely, unplug it from the power outlet, and hold the power button for 15-30 seconds to discharge residual power. Replug and attempt to boot.
2.  **Remove External Devices:** Disconnect all non-essential external devices (USB drives, external hard drives, printers, etc.). Sometimes, an external device can interfere with the boot process or be mistakenly prioritized in the boot order.
3.  **Check Internal Connections:** If you are comfortable opening your computer case, power down and unplug the machine. Open the case and visually inspect the SATA data and power cables connecting your hard drive or SSD to the motherboard and power supply.
    *   **Reseat Cables:** Disconnect and firmly reconnect both the SATA data cable (the thinner one) and the power cable (the wider one) to the drive and the motherboard. Ensure they are snug.
    *   **Try Different Ports/Cables:** If possible, try connecting the drive to a different SATA port on the motherboard and use a different SATA data cable. Faulty cables or ports can cause detection issues.
    *   **Confirm Power to Drive:** Listen for the drive spinning up (if it's an HDD) or feel for any vibration. Some SSDs have activity lights. Ensure the drive is receiving power.

After performing these checks, reassemble your computer and attempt to boot.

## Step 2: Verify Boot Order in BIOS/UEFI Settings

The BIOS/UEFI firmware dictates which device your computer attempts to boot from. An incorrect boot order is a common cause of the "No Boot Device Found" error.

1.  **Enter BIOS/UEFI:** As your computer starts, repeatedly press the designated key to enter BIOS/UEFI settings. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc`. The exact key varies by manufacturer (e.g., Dell, HP, Lenovo). You may see a message like "Press [key] to enter Setup."
2.  **Navigate to Boot Settings:** Within the BIOS/UEFI interface, look for sections labeled "Boot," "Boot Order," "Boot Priority," or "Startup."
3.  **Set Correct Boot Device:** Identify your primary hard drive or SSD (e.g., "Windows Boot Manager," "SATA SSD," or the specific model name). Ensure it is listed as the first boot option. If you see "Network Boot" or "PXE Boot" as the first option, move your actual boot drive above it.
4.  **Save and Exit:** Save your changes (often `F10`) and exit the BIOS/UEFI. The system will restart.

## Step 3: Adjust BIOS/UEFI Mode and Secure Boot Settings

Mismatching boot modes or restrictive Secure Boot settings can prevent Windows from loading, especially after a system update or hardware change.

1.  **Re-enter BIOS/UEFI (Step 2.1).**
2.  **Locate Boot Mode Settings:** Look for settings related to "Boot Mode," "UEFI/Legacy Boot," or "CSM (Compatibility Support Module)."
    *   **UEFI vs. Legacy:** Modern Windows 10/11 installations typically use UEFI mode. If Windows was installed in UEFI mode, ensure "UEFI" is selected. If it was an older installation or specifically set up in Legacy/CSM mode (which is less common for Windows 10/11 but possible), select "Legacy" or enable "CSM." An incorrect mode will prevent the bootloader from being found. Try switching between the two if you're unsure how Windows was installed.
3.  **Secure Boot:** Find the "Secure Boot" setting, usually under "Boot," "Security," or "Authentication."
    *   **Toggle Secure Boot:** For troubleshooting, you might temporarily try disabling Secure Boot. If disabling it allows Windows to boot, you may need to re-enable it and investigate why it caused a conflict (e.g., unsigned drivers). For most modern Windows 10/11 installations, Secure Boot should be enabled.
4.  **Disable Fast Boot (if present):** Sometimes, "Fast Boot" or "Ultra Fast Boot" can interfere with device detection during startup. Temporarily disable it.
5.  **Save and Exit:** Save any changes and restart your computer.

## Step 4: Use Windows Automatic Repair / Startup Repair

If the problem isn't physical or a simple BIOS setting, Windows's built-in repair tools can often fix boot issues. You'll need Windows installation media (USB or DVD) for this step.

1.  **Create Installation Media:** If you don't have one, create a bootable USB drive using the Media Creation Tool from Microsoft's website on another working computer.
2.  **Boot from Media:** Insert the Windows installation media and restart your computer. You may need to press a key (like `F12` or `Esc`) during startup to bring up a boot menu and select your USB drive or DVD.
3.  **Access Repair Options:** Once the Windows Setup screen appears, select your language and region, then click "Next." Instead of clicking "Install now," click on "Repair your computer" in the bottom-left corner.
4.  **Run Startup Repair:**
    *   Navigate to: "Troubleshoot" -> "Advanced options" -> "Startup Repair."
    *   Select your operating system (Windows 10 or 11).
    *   Let the repair process run. It will scan for and attempt to fix common boot problems. This can take some time.
5.  **Restart:** After the repair attempt, remove the installation media and restart your computer to see if the issue is resolved.

## Step 5: Rebuild Boot Configuration Data (BCD) and Master Boot Record (MBR)

Corrupted boot sector or BCD can directly lead to "No Boot Device Found." This requires using the Command Prompt from the Windows Recovery Environment (accessed via installation media, as in Step 4).

1.  **Access Command Prompt:** Boot from your Windows installation media (as in Step 4). Go to "Repair your computer" -> "Troubleshoot" -> "Advanced options" -> "Command Prompt."
2.  **Identify Windows Drive Letter:** The drive letters might be different in the recovery environment. Use `diskpart` to identify your Windows installation drive:
    *   Type `diskpart` and press Enter.
    *   Type `list volume` and press Enter. Note the drive letter (e.g., `C:` or `D:`) corresponding to your Windows partition. Type `exit` and press Enter.
3.  **Execute Boot Repair Commands:**
    *   Type `bootrec /fixmbr` and press Enter (Fixes the Master Boot Record).
    *   Type `bootrec /fixboot` and press Enter (Writes a new boot sector). You might get an "Access Denied" error; proceed to the next command if so.
    *   Type `bootrec /scanos` and press Enter (Scans for Windows installations).
    *   Type `bootrec /rebuildbcd` and press Enter (Rebuilds the Boot Configuration Data). If it finds Windows installations, type `Y` to add them to the boot list.
4.  **Restart:** Type `exit` and press Enter to close Command Prompt, then click "Continue" or restart your PC to see if Windows boots.

## Step 6: Check Disk for Errors (chkdsk)

File system corruption on your boot drive can also lead to boot failures. `chkdsk` can scan for and repair such errors.

1.  **Access Command Prompt:** Follow Step 5.1 to open Command Prompt from the recovery environment.
2.  **Run chkdsk:** Assuming your Windows drive is `C:` (verify with `list volume` from `diskpart` if unsure, as in Step 5.2), type the following command and press Enter:
    `chkdsk C: /f /r /x`
    *   `/f`: Fixes errors on the disk.
    *   `/r`: Locates bad sectors and recovers readable information.
    *   `/x`: Forces the volume to dismount first if necessary.
    This process can take a significant amount of time, depending on the drive size and the extent of corruption. Do not interrupt it.
3.  **Restart:** After `chkdsk` completes, type `exit` and press Enter, then restart your computer.

## Step 7: Reinstall Windows (Last Resort)

If all previous steps fail, the operating system installation might be too corrupted to repair, or your drive might be failing. A clean installation of Windows is a final troubleshooting step, but it will erase all data on the drive.

1.  **Data Recovery (Optional but Recommended):** If you have critical data on the drive, consider connecting the drive to another computer as a secondary drive to attempt data recovery before proceeding. There are also bootable live Linux USBs that can sometimes access data.
2.  **Perform Clean Installation:** Boot from your Windows installation media (as in Step 4). This time, proceed with "Install now." Follow the prompts to install Windows, selecting the partition where your previous installation was located. You will likely need to format this partition during the process.

### Common Mistakes

When encountering the "No Boot Device Found" error, users often make mistakes that can complicate troubleshooting or lead to data loss.

One common mistake is immediately jumping to advanced software fixes or even attempting a clean Windows reinstallation without first performing basic hardware checks. Often, the issue is as simple as a loose cable or an incorrect boot order in the BIOS. Another pitfall is randomly changing BIOS/UEFI settings without understanding their function, which can create new problems or make existing ones harder to diagnose. Always make one change at a time and test the system before making further adjustments.

Furthermore, many users neglect to create backups, especially of critical personal data. When a boot issue leads to a necessary Windows reinstallation or indicates a failing drive, the absence of a backup means permanent data loss. Always assume data loss is a possibility and prepare for it.

### Prevention Tips

Preventing the "No Boot Device Found" error involves a combination of good hardware practices and regular system maintenance.

Regularly backing up your essential data to an external drive or cloud storage is paramount. This ensures that even in the event of a catastrophic boot drive failure, your files remain safe. Beyond backups, ensure your computer's internal components, especially the storage drive and its cables, are securely seated and free from physical stress. Avoid forcefully shutting down your computer, as this can corrupt critical system files and lead to boot issues.

Keep your Windows operating system and device drivers updated, as these updates often include stability improvements and bug fixes that can prevent boot-related problems. Periodically check your drive health using tools like `chkdsk` or third-party SMART monitoring software to catch potential drive failures early. Finally, be cautious when making changes in BIOS/UEFI settings, and only adjust parameters you understand.