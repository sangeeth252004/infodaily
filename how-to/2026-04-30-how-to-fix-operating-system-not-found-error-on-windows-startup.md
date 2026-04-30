---
title: "How to Fix 'Operating System Not Found' Error on Windows Startup"
date: "2026-04-30T16:18:31.790Z"
slug: "how-to-fix-operating-system-not-found-error-on-windows-startup"
type: "how-to"
description: "Troubleshoot and resolve the 'Operating System Not Found' error on Windows startup. This comprehensive guide provides step-by-step solutions, from BIOS checks to boot record repairs, to get your PC running again."
keywords: "Operating System Not Found, Windows startup error, boot error, fix boot, MBR repair, BCD rebuild, BIOS settings, hard drive detection, Windows boot repair, PC won't start, boot device not found, missing operating system"
---

### Problem Explanation

Encountering the "Operating System Not Found" error is a frustrating experience for any Windows user. When this issue occurs, your computer fails to load Windows and instead displays a black screen with a message similar to:

*   "Operating System Not Found"
*   "Missing Operating System"
*   "No Boot Device Found"
*   "Non-system disk or disk error"

This error signifies that your computer's BIOS or UEFI firmware cannot locate a valid operating system to boot from on any of the connected storage devices. The system effectively stops before Windows even has a chance to begin loading, leaving you unable to access your files or applications.

### Why It Happens

The "Operating System Not Found" error can stem from several underlying causes, ranging from simple configuration issues to more severe hardware failures. Understanding these root causes is crucial for effective troubleshooting.

Common culprits include an incorrect boot order in the BIOS/UEFI settings, preventing the computer from looking for Windows on the correct drive. The boot sector or Boot Configuration Data (BCD) on your hard drive might be corrupted, making it impossible for the system to initiate the Windows loading process. Furthermore, a physically disconnected, damaged, or failing hard drive can lead to this error, as the system simply cannot detect the storage device where the operating system resides. Less commonly, a corrupted Windows installation or even malicious software can damage critical boot files, rendering the operating system unbootable.

### Step-by-Step Solution

Follow these steps meticulously to diagnose and resolve the "Operating System Not Found" error.

#### Step 1: Perform Initial Hardware and BIOS/UEFI Checks

Before diving into complex software fixes, it's essential to rule out basic hardware and configuration problems.

1.  **Check Physical Connections:** Power down your computer, unplug it, and open the case. Ensure that the SATA data and power cables connecting your hard drive (or SSD) to the motherboard and power supply are securely seated. Loose connections are a surprisingly common cause.
2.  **Enter BIOS/UEFI Setup:** Restart your computer and immediately press the designated key to enter BIOS/UEFI setup. Common keys include `Del`, `F2`, `F10`, `F12`, or `Esc` (consult your motherboard or PC manufacturer's manual if unsure).
3.  **Verify Hard Drive Detection:** Once in the BIOS/UEFI, navigate to the "Storage," "Boot," or "Main" tab to confirm that your primary hard drive (where Windows is installed) is listed and detected. If it's not detected, there might be a physical issue with the drive itself, its cables, or the motherboard.
4.  **Check Boot Order:** Go to the "Boot" or "Boot Options" section. Ensure that your hard drive containing Windows is set as the first boot device in the boot priority list. If a different drive (like a USB drive or DVD drive) is prioritized, the system might skip your OS drive.
5.  **Save and Exit:** After making any necessary changes, save your settings (usually by pressing `F10` or selecting "Save and Exit") and restart your computer.

#### Step 2: Utilize Windows Automatic Startup Repair

Windows includes a built-in recovery environment that can often fix boot issues automatically.

1.  **Prepare Windows Installation Media:** You will need a Windows 10/11 installation USB drive or DVD. If you don't have one, you can create one using the Media Creation Tool from Microsoft's website on another working computer.
2.  **Boot from Installation Media:** Insert the USB/DVD and restart your computer. You may need to press a key (like `F12` for boot menu) or change the boot order in BIOS/UEFI (as in Step 1) to boot from the media.
3.  **Access Repair Options:** When prompted, select your language, time, and keyboard input. Instead of clicking "Install now," click on "Repair your computer" in the bottom-left corner.
4.  **Run Startup Repair:** Navigate to `Troubleshoot` > `Advanced options` > `Startup Repair`. Select your operating system (e.g., "Windows 10" or "Windows 11"). Let the repair process complete. This tool attempts to automatically find and fix problems preventing Windows from loading.
5.  **Reboot:** After the repair, remove the installation media and restart your computer to see if the issue is resolved.

#### Step 3: Rebuild the Master Boot Record (MBR) and Boot Configuration Data (BCD)

If Startup Repair fails, manually repairing the boot records is often the next most effective solution.

1.  **Access Command Prompt:** Boot from your Windows installation media again (as in Step 2). Select "Repair your computer" > `Troubleshoot` > `Advanced options` > `Command Prompt`.
2.  **Execute Boot Repair Commands:** In the Command Prompt window, type the following commands one by one, pressing `Enter` after each:
    *   `bootrec /fixmbr` (This command writes a new MBR to the system partition, but doesn't overwrite the existing partition table.)
    *   `bootrec /fixboot` (This command writes a new boot sector to the system partition. On UEFI systems, if you get an "Access Denied" error, proceed to the next commands.)
    *   `bootrec /scanos` (This command scans all disks for Windows installations and displays them.)
    *   `bootrec /rebuildbcd` (This command rebuilds the Boot Configuration Data store. If `scanos` found your Windows installation, you will be prompted to add it to the boot list; type `Y` and press `Enter`.)
3.  **Exit and Reboot:** Type `exit` and press `Enter`. Remove the installation media and restart your computer.

#### Step 4: Verify Disk Partitions and Active Status (Legacy MBR Systems)

For older MBR-based systems, ensuring the correct partition is marked as "active" is vital for booting. This step is generally not applicable to UEFI systems.

1.  **Access Command Prompt:** Boot from your Windows installation media and navigate to the Command Prompt (as in Step 3).
2.  **Use Diskpart:** Type `diskpart` and press `Enter`.
3.  **List Disks and Partitions:**
    *   Type `list disk` and press `Enter`. Identify your main OS drive (usually Disk 0 or Disk 1).
    *   Type `select disk X` (replace `X` with the number of your OS drive) and press `Enter`.
    *   Type `list partition` and press `Enter`. Identify your primary Windows partition (usually the largest one, or labeled "Primary").
    *   Type `select partition Y` (replace `Y` with the number of your primary Windows partition) and press `Enter`.
4.  **Mark Partition Active (MBR only):**
    *   Type `active` and press `Enter`. (You will see a message confirming the partition is marked active).
5.  **Exit and Reboot:** Type `exit` twice to close Diskpart and Command Prompt. Remove the installation media and restart.

#### Step 5: Perform System Restore or Uninstall Updates

If the issue started recently after an update or software change, reverting to a previous state might help.

1.  **Access Advanced Options:** Boot from your Windows installation media, then select "Repair your computer" > `Troubleshoot` > `Advanced options`.
2.  **System Restore:** Select `System Restore`. If you have previously created system restore points, choose a point from before the error began and follow the prompts to restore your system. This will revert system files, installed applications, and registry settings to an earlier state without affecting your personal files.
3.  **Uninstall Updates:** If System Restore isn't an option or doesn't work, try `Uninstall Updates`. You can attempt to remove the latest "Quality Update" or "Feature Update," which might have introduced a conflict.
4.  **Reboot:** After the process, restart your computer.

#### Step 6: Reinstall Windows (Last Resort)

If all previous steps fail, a clean installation of Windows might be necessary. This will erase all data on the primary drive, so consider backing up your files first if possible.

1.  **Backup Data (If Possible):** If you have critical data, consider removing the hard drive and connecting it to another computer to retrieve files, or use a Linux Live USB to boot your PC and copy files to an external drive.
2.  **Boot from Installation Media:** Boot from your Windows installation USB/DVD (as in Step 2).
3.  **Begin Installation:** Select your language, then click "Install now."
4.  **Custom Installation:** When prompted, choose "Custom: Install Windows only (advanced)."
5.  **Delete Partitions:** Select the primary partition where Windows was installed (and any related system partitions like "System Reserved" or "Recovery"), and click "Delete." This will create unallocated space.
6.  **Install Windows:** Select the "Unallocated Space" and click "Next" to begin the installation. Windows will create the necessary partitions and install itself. Follow the on-screen prompts to complete the setup.

### Common Mistakes

When troubleshooting the "Operating System Not Found" error, users often make several common mistakes that can complicate the repair process or even lead to further issues. A frequent oversight is neglecting to check basic hardware connections and BIOS/UEFI settings first; many complex software fixes are attempted when a simple cable reseat or boot order adjustment would suffice. Another pitfall is not creating or using the correct Windows installation media for your specific version of Windows, which is crucial for accessing the recovery environment and executing commands.

Users might also make random changes in the BIOS/UEFI without understanding their impact, potentially introducing new problems. Forgetting to save changes before exiting the BIOS/UEFI setup is also common, leading to frustration when settings revert. Lastly, some users prematurely conclude that their hard drive has failed, when in fact, the issue is often software-related and fixable with the appropriate boot repair commands.

### Prevention Tips

Preventing the "Operating System Not Found" error involves adopting good computing habits and proactive maintenance. Regularly backing up your system, either through full system image backups or crucial personal files, ensures you can recover quickly from any major boot failure without data loss. Keeping your Windows operating system and drivers updated helps maintain system stability and prevents corruption that could affect boot files.

Using reliable antivirus and anti-malware software is essential to protect your boot sectors from malicious attacks. Always perform graceful shutdowns of your computer to avoid sudden power loss, which can corrupt critical system files. Periodically check internal cable connections for your storage drives to ensure they remain secure, especially if you move your computer frequently. Finally, creating a dedicated Windows Recovery Drive or keeping your Windows installation media accessible is a smart move, providing you with the necessary tools to repair boot issues whenever they arise.