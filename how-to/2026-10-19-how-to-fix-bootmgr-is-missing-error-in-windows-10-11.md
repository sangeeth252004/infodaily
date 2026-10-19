---
title: "How to Fix \"BOOTMGR is Missing\" Error in Windows 10/11"
date: "2026-10-19T03:18:56.141Z"
slug: "how-to-fix-bootmgr-is-missing-error-in-windows-10-11"
type: "how-to"
description: "Learn how to troubleshoot and fix the \"BOOTMGR is Missing\" error in Windows 10/11 with this comprehensive, step-by-step guide. Repair your boot records and get your system running again."
keywords: "BOOTMGR is Missing, Windows 10, Windows 11, fix boot error, bootmgr repair, MBR repair, BCD repair, bootrec commands, Windows boot manager, troubleshooting boot issues, system won't start"
---

### Problem Explanation

Encountering the "BOOTMGR is Missing" error can be one of the most frustrating experiences for a Windows user. Instead of your familiar login screen or desktop, your computer displays a black screen with the stark message: "BOOTMGR is Missing Press Ctrl+Alt+Del to restart". Your system refuses to boot, leaving you unable to access Windows or any of your files. This error indicates that the Windows Boot Manager, a crucial component responsible for loading your operating system, cannot be found or accessed by your computer's BIOS or UEFI firmware.

When you see this message, restarting your computer (as suggested by the prompt) typically leads you right back to the same error screen, trapped in a loop. It's a clear signal that the system cannot locate the necessary boot files to initiate the Windows startup process, effectively rendering your computer inoperable until the issue is resolved.

### Why It Happens

The "BOOTMGR is Missing" error usually stems from issues related to the boot sector, boot configuration data, or the physical storage device itself. Here are the most common culprits:

*   **Corrupted Boot Configuration Data (BCD):** The BCD store contains critical boot information, including which operating system to load and where to find it. Corruption in the BCD is a primary cause, often due to improper shutdowns, power outages, disk write errors, or malware.
*   **Damaged Master Boot Record (MBR):** The MBR is the first sector of a hard drive that tells your computer how to load the operating system. If the MBR is corrupted or damaged, your system won't know where to find BOOTMGR.
*   **Incorrect Boot Order:** Your computer's BIOS/UEFI settings dictate the order in which devices are checked for bootable media. If the primary hard drive containing Windows is not set as the first boot device, or if an unbootable device (like a USB drive or DVD) is mistakenly prioritized, the system won't find BOOTMGR on your main drive.
*   **Faulty or Loose Hard Drive Connection:** A physically disconnected, partially connected, or failing hard drive will prevent the system from reading any boot files.
*   **Active Partition Not Set:** The partition containing the BOOTMGR files might not be marked as "active," which is necessary for the BIOS/UEFI to identify it as a bootable volume.
*   **Recent System Changes:** Installing new hardware, software, or operating system updates, or even an attempted dual-boot setup that went awry, can sometimes interfere with boot files.

### Step-by-Step Solution

To fix the "BOOTMGR is Missing" error, you'll need a Windows 10 or 11 installation media (USB drive or DVD). If you don't have one, you'll need to create it on another working computer using Microsoft's Media Creation Tool.

#### ## Step 1: Check Boot Order in BIOS/UEFI

Before diving into complex repairs, ensure your computer is attempting to boot from the correct drive.

1.  **Restart your computer.** As soon as it starts, repeatedly press the key to enter your BIOS/UEFI settings. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc`. The specific key often flashes on the screen briefly at startup.
2.  Navigate to the **"Boot"** or **"Boot Order"** section.
3.  Ensure your primary hard drive (the one with Windows installed) is listed as the **first boot device**. If you have multiple drives, identify the correct one.
4.  While you're there, ensure there are no unbootable USB drives, CDs/DVDs, or external hard drives connected to your computer that might be accidentally prioritized in the boot order. Remove any unnecessary bootable media.
5.  **Save your changes** and **exit BIOS/UEFI**. Your computer will restart. If the error persists, proceed to the next step.

#### ## Step 2: Repair the Master Boot Record (MBR) and Boot Configuration Data (BCD)

This is often the most effective solution for BOOTMGR errors. You'll need your Windows installation media.

1.  **Insert your Windows 10/11 installation media** (USB or DVD) into your computer.
2.  **Restart your computer** and boot from the installation media. You might need to press a key (like `F12` or `Esc`) during startup to bring up a boot menu and select your USB/DVD drive.
3.  Once the Windows Setup screen appears, select your **language, time, and keyboard preferences**, then click **"Next"**.
4.  On the next screen, click **"Repair your computer"** (located in the bottom-left corner).
5.  Select **"Troubleshoot"** > **"Advanced options"** > **"Command Prompt"**.
6.  In the Command Prompt, type the following commands, pressing `Enter` after each one:
    ```cmd
    bootrec /fixmbr
    bootrec /fixboot
    bootrec /rebuildbcd
    ```
    *   `bootrec /fixmbr`: This command writes a new MBR to the system partition without overwriting the existing partition table.
    *   `bootrec /fixboot`: This command writes a new boot sector to the system partition.
    *   `bootrec /rebuildbcd`: This command scans for Windows installations and allows you to add them to the BCD. When it asks "Add installation to boot list? (Yes/No/All):", type `Y` or `A` and press `Enter`.
7.  After running these commands, type `exit` and press `Enter` to close Command Prompt.
8.  Click **"Continue"** or **"Turn off your PC"** and remove the installation media. Restart your computer.

#### ## Step 3: Mark the Primary Partition as Active

Sometimes, the boot partition isn't marked as "active," preventing the system from booting.

1.  Boot from your Windows installation media again and navigate to **"Repair your computer" > "Troubleshoot" > "Advanced options" > "Command Prompt"** (as in Step 2).
2.  In the Command Prompt, type `diskpart` and press `Enter`.
3.  Type `list disk` and press `Enter` to see all connected drives. Identify your main hard drive (usually Disk 0, based on size).
4.  Type `select disk X` (replace `X` with the number of your main hard drive, e.g., `select disk 0`) and press `Enter`.
5.  Type `list partition` and press `Enter` to see partitions on the selected disk. Identify your primary Windows partition (often the largest one, or labeled as "Primary").
6.  Type `select partition Y` (replace `Y` with the number of your Windows partition) and press `Enter`.
7.  Type `active` and press `Enter`. This marks the partition as active.
8.  Type `exit` and press `Enter` to exit DiskPart.
9.  Type `exit` again and press `Enter` to close Command Prompt.
10. Remove your installation media and restart your computer.

#### ## Step 4: Run System File Checker (SFC) and DISM

Corrupted system files can sometimes lead to boot issues. SFC and DISM can help repair them.

1.  Boot from your Windows installation media and navigate to **"Repair your computer" > "Troubleshoot" > "Advanced options" > "Command Prompt"** (as in Step 2).
2.  First, you might need to determine the drive letter of your Windows installation, as it might not be `C:` in the recovery environment. Type `dir c:` then `dir d:` etc., until you find the drive containing your "Windows" folder. Let's assume it's `C:` for the commands below.
3.  Type `sfc /scannow /offbootdir=C:\ /offwindir=C:\Windows` and press `Enter`. This will scan for and repair corrupted system files. This process can take some time.
4.  Once SFC completes, run the Deployment Image Servicing and Management (DISM) tool to fix potential issues with the Windows image itself. Type the following commands, pressing `Enter` after each:
    ```cmd
    DISM /Image:C:\ /Cleanup-Image /RestoreHealth
    ```
    *Note: If `C:` is not your Windows drive, replace it with the correct drive letter.*
5.  After DISM finishes, type `exit` and press `Enter` to close Command Prompt.
6.  Remove your installation media and restart your computer.

#### ## Step 5: Check for Hard Drive Issues with CHKDSK

A failing hard drive or bad sectors can also cause the BOOTMGR error.

1.  Boot from your Windows installation media and navigate to **"Repair your computer" > "Troubleshoot" > "Advanced options" > "Command Prompt"** (as in Step 2).
2.  Once in Command Prompt, determine the correct drive letter for your Windows installation (as explained in Step 4). Let's assume it's `C:`.
3.  Type `chkdsk C: /f /r` and press `Enter`.
    *   `/f` fixes errors on the disk.
    *   `/r` locates bad sectors and recovers readable information.
    4. This process can take a long time, especially for larger drives or drives with many errors. Do not interrupt it.
    5. After `chkdsk` completes, type `exit` and press `Enter` to close Command Prompt.
    6. Remove your installation media and restart your computer.

#### ## Step 6: Perform a System Restore (If Available)

If the error started after a recent change, a system restore might revert your system to a working state.

1.  Boot from your Windows installation media and navigate to **"Repair your computer" > "Troubleshoot" > "Advanced options"**.
2.  Click **"System Restore"**.
3.  Follow the on-screen prompts to choose a restore point created before the error started.
4.  Confirm your selection and let the restore process complete. This can take some time.
5.  Once finished, your computer will restart.

### Common Mistakes

When trying to resolve the "BOOTMGR is Missing" error, users often make a few common mistakes:

*   **Panicking and Skipping Steps:** Jumping directly to drastic measures like reinstalling Windows without trying simpler fixes first can lead to unnecessary data loss. Follow a methodical troubleshooting process.
*   **Incorrect Boot Order:** Many users forget to check their BIOS/UEFI boot order, which is the simplest potential fix. Always verify that your primary hard drive is first in the boot sequence.
*   **Not Using the Correct Windows Installation Media:** Using installation media for a different version of Windows (e.g., Windows 7 media for a Windows 10 system) or corrupt media can complicate or prevent repairs. Ensure you have the correct version of the media.
*   **Mistyping Commands:** Command Prompt commands are case-insensitive but must be typed precisely. A single typo can lead to errors or ineffective repairs. Double-check your input before pressing Enter.
*   **Ignoring Data Backup:** While troubleshooting, there's always a small risk of data loss. Assuming your data is safe and not having a backup is a major pitfall. If critical data is on the drive, consider backing it up using a live Linux USB or another method before extensive repair attempts.

### Prevention Tips

Preventing the "BOOTMGR is Missing" error is largely about maintaining system health and practicing safe computing habits.

*   **Regular Backups:** The most crucial prevention tip is to regularly back up your important files and, ideally, create system image backups. This ensures that even if a catastrophic boot error occurs, your data is safe and you can quickly restore your entire system.
*   **Safe Shutdowns:** Always shut down your computer properly. Avoid forced shutdowns (holding the power button) unless absolutely necessary, as these can corrupt system files, including boot data.
*   **Reliable Power Supply:** Use a UPS (Uninterruptible Power Supply) to protect against sudden power outages, which are a common cause of file system and boot record corruption.
*   **Keep Windows Updated:** Ensure your Windows operating system and drivers are regularly updated. Updates often include fixes for potential system vulnerabilities and improvements to stability.
*   **Scan for Malware:** Use reputable antivirus software and perform regular scans to protect your system from malware that could corrupt boot sectors or system files.
*   **Be Cautious with Disk Management Tools:** When using disk partitioning tools or making changes to boot configurations (e.g., setting up dual boot), proceed with extreme caution and understand the implications of each action. Incorrect operations can easily damage boot records.