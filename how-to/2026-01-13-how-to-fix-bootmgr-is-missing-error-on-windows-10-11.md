---
title: "How to Fix \"BOOTMGR is missing\" Error on Windows 10/11"
date: "2026-01-13T17:00:31.290Z"
slug: "how-to-fix-bootmgr-is-missing-error-on-windows-10-11"
type: "how-to"
description: "A comprehensive guide to fixing the \"BOOTMGR is missing\" error on Windows 10 and 11. Learn the causes and step-by-step solutions, including using Startup Repair, rebuilding BCD, and checking boot order."
keywords: "BOOTMGR is missing, fix BOOTMGR, Windows 10 BOOTMGR error, Windows 11 BOOTMGR error, boot manager missing, repair Windows boot, BCD rebuild, startup repair, boot order, diskpart"
---

### Problem Explanation

Encountering the "BOOTMGR is missing" error can be a frustrating experience, as it prevents your Windows 10 or 11 system from starting up normally. When this issue occurs, your computer typically displays a black screen immediately after powering on, presenting a message similar to:

"BOOTMGR is missing
Press Ctrl+Alt+Del to restart"

or sometimes:

"BOOTMGR is missing
Press any key to restart"

This error indicates that the Windows Boot Manager (BOOTMGR), a crucial program responsible for loading the operating system, cannot be found or accessed by your system's BIOS/UEFI firmware. Without BOOTMGR, your computer doesn't know how to initiate the boot process for Windows, leaving you stuck at this message.

### Why It Happens

The "BOOTMGR is missing" error can stem from several underlying causes, often related to the integrity or accessibility of your system's boot files. Understanding these causes helps in systematically troubleshooting the problem:

*   **Corrupted or Missing Boot Configuration Data (BCD) Files:** The BCD stores boot options and dictates how Windows starts. If it becomes corrupted, misconfigured, or deleted, BOOTMGR won't function correctly. This is one of the most common reasons.
*   **Incorrect Boot Order in BIOS/UEFI:** Your computer's firmware might be attempting to boot from a non-bootable device (like a USB drive, an optical drive with no disc, or an secondary hard drive without an OS) before it checks the drive containing Windows.
*   **Damaged Hard Drive Sectors or File System Errors:** Physical damage to the hard drive where boot files reside, or logical file system errors, can make BOOTMGR inaccessible.
*   **Loose or Faulty Hard Drive Connection:** If the cable connecting your primary hard drive to the motherboard is loose, damaged, or the drive itself is failing, the system may not detect the boot drive.
*   **Incorrectly Configured Active Partition:** For older BIOS systems or specific configurations, the partition containing the boot files needs to be marked as 'active'. If another partition is mistakenly marked active, or no partition is, BOOTMGR cannot be found.
*   **Recent Hardware or Software Changes:** Installing new hardware (especially storage devices) or software that interferes with system boot files can inadvertently lead to this error.

### Step-by-Step Solution

To fix the "BOOTMGR is missing" error, you'll need a Windows 10 or 11 installation media (USB drive or DVD). If you don't have one, you'll need to create it from another working computer.

---

### Step 1: Check Physical Connections and BIOS/UEFI Boot Order

Before diving into complex software fixes, ensure the basics are correct.

1.  **Restart your computer.**
2.  **Access your BIOS/UEFI settings:** As soon as the computer starts, repeatedly press the designated key (commonly F2, F10, F12, DEL, or ESC) to enter the BIOS/UEFI setup. The exact key varies by manufacturer.
3.  **Check Hard Drive Connectivity:** In the BIOS/UEFI, navigate to the storage or boot devices section. Ensure your primary hard drive (the one with Windows installed) is detected and listed correctly. If it's not, power down the computer, open the case, and check if the SATA/IDE data and power cables connected to the hard drive are secure. Reseat them if necessary.
4.  **Verify Boot Order:** Locate the "Boot Order," "Boot Priority," or "Boot Device Priority" section. Make sure your primary hard drive (e.g., "Windows Boot Manager," "SATA HDD," or the specific model of your drive) is set as the first boot device. If you have any external USB drives or optical discs connected that are not your installation media, remove them temporarily to prevent the system from trying to boot from them.
5.  **Save Changes and Exit:** Save any changes you've made (usually F10) and exit the BIOS/UEFI. Your computer will restart.

If the error persists, proceed to the next step.

---

### Step 2: Use Windows Startup Repair

Windows' built-in Startup Repair tool can automatically diagnose and fix many boot-related issues, including a missing BOOTMGR.

1.  **Boot from Installation Media:** Insert your Windows 10/11 installation USB or DVD into your computer and restart it. You may need to press a key (like F12 for boot menu) during startup to select the USB/DVD as the boot device.
2.  **Select Language and Region:** When the Windows Setup screen appears, select your language, time and currency format, and keyboard layout, then click "Next."
3.  **Access Repair Options:** On the next screen, instead of clicking "Install now," click "Repair your computer" in the bottom-left corner.
4.  **Navigate to Troubleshoot:** Select "Troubleshoot" from the "Choose an option" screen.
5.  **Run Startup Repair:** Choose "Startup Repair."
6.  **Select Target Operating System:** Select "Windows 10" or "Windows 11" from the list. The repair tool will then scan your system for problems and attempt to fix them automatically. This process can take some time.
7.  **Restart:** Once the repair is complete, remove the installation media and restart your computer.

If Startup Repair reports it couldn't fix the problem, or the error reappears, move to the manual rebuild of boot files.

---

### Step 3: Rebuild the Boot Configuration Data (BCD)

If Startup Repair fails, manually rebuilding the BCD from the Command Prompt is often the most effective solution. This requires using the Command Prompt in the Windows Recovery Environment.

1.  **Boot to Command Prompt:** Follow steps 1-4 from "Step 2: Use Windows Startup Repair" (Boot from installation media, "Repair your computer," "Troubleshoot").
2.  **Open Command Prompt:** From the "Troubleshoot" menu, select "Command Prompt."
3.  **Execute Boot Repair Commands:** In the Command Prompt window, type the following commands, pressing Enter after each one:

    ```cmd
    bootrec /fixmbr
    bootrec /fixboot
    bootrec /scanos
    bootrec /rebuildbcd
    ```

    *   `bootrec /fixmbr`: This command writes a new Master Boot Record (MBR) to the system partition without overwriting the existing partition table.
    *   `bootrec /fixboot`: This command writes a new boot sector to the system partition.
    *   `bootrec /scanos`: This command scans all disks for Windows installations and displays them.
    *   `bootrec /rebuildbcd`: This command scans for Windows installations and allows you to add them to the BCD. When prompted "Add installation to boot list? (Y/N/A)", type `Y` and press Enter.

4.  **Exit and Restart:** After running all commands, type `exit` and press Enter, then restart your computer, removing the installation media.

If `bootrec /fixboot` gives an "Access is denied" error, you might need to perform a few extra steps before re-running it:

*   Type `diskpart` and press Enter.
*   Type `list volume` and press Enter (identify your EFI partition, usually FAT32).
*   Type `select volume X` (replace X with the volume number of your EFI partition).
*   Type `assign letter=Z:` (or any unused letter) and press Enter.
*   Type `exit` and press Enter to exit `diskpart`.
*   Now navigate to the assigned drive letter: `Z:` and press Enter.
*   Type `cd EFI\Microsoft\Boot` and press Enter.
*   Type `ren BCD BCD.bak` and press Enter (renames the existing BCD).
*   Now try `bootrec /rebuildbcd` again, and then `bootrec /fixboot` if it was previously denied.

---

### Step 4: Mark the System Partition as Active

Sometimes, the "BOOTMGR is missing" error can occur because the partition containing the boot files is not marked as active. This step is particularly relevant for systems booting in Legacy BIOS mode rather than UEFI.

1.  **Boot to Command Prompt:** Follow steps 1-4 from "Step 2: Use Windows Startup Repair" and then open "Command Prompt" (as in Step 3).
2.  **Start DiskPart:** Type `diskpart` and press Enter.
3.  **List Disks:** Type `list disk` and press Enter. Identify your primary hard drive (usually Disk 0).
4.  **Select Disk:** Type `select disk X` (replace X with the number of your primary hard drive, e.g., `select disk 0`) and press Enter.
5.  **List Partitions:** Type `list partition` and press Enter.
6.  **Identify System Partition:** Look for the partition that contains your Windows boot files. This is often a small partition (e.g., 100-500 MB) labeled "System" or "EFI System Partition" (though for Legacy BIOS, it's typically your primary Windows partition that needs to be active). If you're unsure, select the partition where Windows is installed (usually the largest one).
7.  **Select Partition:** Type `select partition Y` (replace Y with the number of the partition you identified) and press Enter.
8.  **Mark as Active:** Type `active` and press Enter. (Note: For UEFI systems, you typically manage EFI partitions, not 'active' flags).
9.  **Exit DiskPart:** Type `exit` and press Enter.
10. **Exit Command Prompt:** Type `exit` and press Enter, then restart your computer.

---

### Step 5: Run CHKDSK to Check for Hard Drive Errors

Corrupted sectors on your hard drive can lead to boot file inaccessibility. Running a `chkdsk` command can identify and repair such issues.

1.  **Boot to Command Prompt:** Follow steps 1-4 from "Step 2: Use Windows Startup Repair" and then open "Command Prompt" (as in Step 3).
2.  **Run CHKDSK:** In the Command Prompt, type the following command and press Enter:

    ```cmd
    chkdsk C: /f /r
    ```
    *   Replace `C:` with the drive letter of your Windows installation if it's different.
    *   `/f` fixes errors on the disk.
    *   `/r` locates bad sectors and recovers readable information.

    This process can take a considerable amount of time, depending on the size and health of your hard drive. Do not interrupt it.
3.  **Exit and Restart:** Once `chkdsk` completes, type `exit` and press Enter, then restart your computer.

---

### Step 6: Perform a System Restore

If the error started appearing after a recent software installation, driver update, or system configuration change, a System Restore might revert your system to a state where BOOTMGR was functional.

1.  **Boot to System Restore:** Follow steps 1-4 from "Step 2: Use Windows Startup Repair."
2.  **Select System Restore:** From the "Troubleshoot" menu, choose "System Restore."
3.  **Select Operating System:** Select "Windows 10" or "Windows 11."
4.  **Follow On-Screen Prompts:** The System Restore wizard will guide you through the process. Choose a restore point created *before* the BOOTMGR error started occurring.
5.  **Confirm and Finish:** Confirm your choice and let System Restore complete its operation. Your computer will restart.

---

### Common Mistakes

When attempting to fix the "BOOTMGR is missing" error, users sometimes make mistakes that can complicate the repair process or lead to data loss:

*   **Not Creating or Using Correct Bootable Media:** Attempting to boot from a non-bootable USB drive or using a recovery disc from a different Windows version can prevent access to the necessary repair tools. Always ensure your installation media matches your Windows version (10 or 11) and architecture (64-bit).
*   **Incorrect BIOS/UEFI Settings:** Failing to verify or adjust the boot order can mean the computer never attempts to load from the correct drive, even if the boot files are fixed. Also, mistakenly changing other critical BIOS/UEFI settings can introduce new problems.
*   **Assuming a Clean Install is the Only Option:** Many users panic and immediately consider reinstalling Windows, which can lead to data loss if not backed up. Most "BOOTMGR is missing" errors are fixable without resorting to a full reinstallation.
*   **Incorrectly Identifying Drive Letters:** In the Command Prompt within the recovery environment, drive letters might be different from when Windows is running normally. For example, your Windows drive might be `D:` instead of `C:`. Always verify by using commands like `dir C:` or `dir D:` to check folder contents before running commands that modify files.

### Prevention Tips

To minimize the chances of encountering the "BOOTMGR is missing" error again, consider these preventative measures:

*   **Regular Data Backups and System Images:** Implement a robust backup strategy. Regularly back up your important files to an external drive or cloud service. Additionally, create system image backups periodically, which can be used to restore your entire operating system to a previous working state if boot issues arise.
*   **Safe Shutdown Practices:** Always shut down your computer properly through the Windows Start Menu. Avoid forced shutdowns (e.g., holding the power button) unless absolutely necessary, as this can corrupt system files, including boot records.
*   **Careful Software and Driver Installations:** Be cautious when installing new software or drivers, especially those from untrusted sources. Ensure drivers are compatible with your Windows version and obtain them from official manufacturer websites.
*   **Maintain Hard Drive Health:** Periodically check your hard drive's health using built-in Windows tools or third-party utilities. Address any warning signs (e.g., slow performance, strange noises) promptly. Ensure adequate ventilation to prevent overheating, which can degrade drive lifespan.
*   **Keep Windows Updated:** Regularly apply Windows updates. These updates often include fixes for system vulnerabilities and improvements to core components, enhancing overall system stability.
*   **Avoid Unnecessary System Tweaks:** Refrain from making drastic changes to system files, boot configurations, or registry settings unless you fully understand the implications. Incorrect modifications can easily lead to boot problems.