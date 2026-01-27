---
title: "How to Fix \"NTFS_FILE_SYSTEM\" Blue Screen of Death (BSOD) Error in Windows 10/11"
date: "2026-01-27T10:27:47.319Z"
slug: "how-to-fix-ntfs-file-system-blue-screen-of-death-bsod-error-in-windows-10-11"
type: "how-to"
description: "Experiencing the \"NTFS_FILE_SYSTEM\" BSOD in Windows 10/11? Learn step-by-step how to diagnose and fix this critical error, from disk checks to driver updates."
keywords: "NTFS_FILE_SYSTEM, BSOD, Blue Screen of Death, Windows 10, Windows 11, fix error, chkdsk, SFC, DISM, disk error, corrupted drive, system crash, driver issues, memory diagnostic"
---

The "NTFS_FILE_SYSTEM" Blue Screen of Death (BSOD) is a critical error message that indicates a problem with your Windows file system. When this error occurs, your computer will suddenly stop functioning, display a blue screen with the "NTFS_FILE_SYSTEM" stop code (often followed by a hexadecimal value like `0x00000024`), and then usually restart. This abrupt shutdown prevents data corruption and further damage to your system but leaves you unable to access your operating system.

Users encountering this issue typically see a full-screen blue background with a sad face emoji, a message stating "Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.", and below it, the "Stop code: NTFS_FILE_SYSTEM". In some cases, the system might enter a boot loop, continuously restarting and showing the same error, making it difficult to even reach the login screen.

### Why It Happens

The "NTFS_FILE_SYSTEM" error points directly to an issue with the NTFS (New Technology File System) driver, `Ntfs.sys`, which is fundamental for Windows to interact with your hard drive or solid-state drive. This file system organizes and stores all the data on your drive. When this driver or the file system it manages becomes corrupted or encounters an unreadable sector, Windows cannot proceed, leading to the BSOD.

Root causes often include bad sectors on the hard drive, which are areas of the disk that have become physically or logically damaged and can no longer store data reliably. File system corruption, perhaps due to sudden power loss, improper shutdowns, or malware, can also trigger this error. Furthermore, outdated, corrupted, or incompatible device drivers (especially those related to storage controllers), faulty RAM, or a failing hard drive/SSD can also manifest as an `NTFS_FILE_SYSTEM` error because they prevent Windows from correctly reading or writing data to the disk.

### Step-by-Step Solution

Addressing the "NTFS_FILE_SYSTEM" error requires a systematic approach, often involving tools accessible through the Windows Recovery Environment (WinRE) if your system cannot boot normally.

#### ## Step 1: Initial Troubleshooting and Accessing Windows Recovery Environment (WinRE)

First, try a simple restart. Sometimes, the error is a one-off glitch. If the error persists or prevents booting, you'll need to access the Windows Recovery Environment (WinRE).
To do this:
1.  **Force Shutdown:** Turn off your computer by pressing and holding the power button for 5-10 seconds.
2.  **Repeat:** Turn it on, and as soon as you see the Windows logo, force it off again.
3.  **Third Time:** Repeat this process a third time. On the third boot, Windows should automatically enter the "Automatic Repair" screen.
4.  **Access Advanced Options:** From the "Automatic Repair" screen, select "Advanced options." Then navigate to "Troubleshoot" > "Advanced options."

From here, you can attempt a "Startup Repair" first. If that doesn't resolve it, proceed to the following steps within the "Advanced options."

#### ## Step 2: Utilize System Restore or Safe Mode

If you recently installed new software, hardware, or drivers, a System Restore might revert your system to a stable state before the problem occurred.
1.  From WinRE ("Advanced options" > "Troubleshoot" > "Advanced options"), select "System Restore."
2.  Choose a restore point from before the error began. Follow the prompts to complete the restore.
If System Restore fails or isn't available, try booting into Safe Mode to diagnose or perform repairs without problematic drivers loading.
1.  From WinRE ("Advanced options" > "Troubleshoot" > "Advanced options"), select "Startup Settings" then click "Restart."
2.  After restarting, press `4` or `F4` to enable Safe Mode, or `5` or `F5` for Safe Mode with Networking. If you can boot into Safe Mode, you can proceed with driver updates or uninstallation from there.

#### ## 3: Run Disk Check (`chkdsk`) to Repair File System Errors

The `chkdsk` command is crucial for fixing file system corruption and bad sectors. This should be a priority for "NTFS_FILE_SYSTEM" errors.
1.  From WinRE ("Advanced options" > "Troubleshoot" > "Advanced options"), select "Command Prompt."
2.  In the Command Prompt, you might need to identify your Windows installation drive letter. It might not be `C:` in WinRE. Type `diskpart` and press Enter. Then type `list volume` and press Enter. Look for the volume labeled "Boot" or "System" and note its drive letter (e.g., `D:`). Type `exit` and press Enter to leave `diskpart`.
3.  Now, run the `chkdsk` command. Replace `C:` with the correct drive letter if it's different.
    ```cmd
    chkdsk /f /r C:
    ```
    -   `/f` fixes errors on the disk.
    -   `/r` locates bad sectors and recovers readable information.
    -   The command might take a long time to complete, depending on the size and condition of your drive. Let it run completely.
4.  Once `chkdsk` finishes, type `exit` and press Enter, then try restarting your computer normally.

#### ## 4: Check System Files with SFC and DISM

Corrupted Windows system files can also cause the `NTFS_FILE_SYSTEM` error. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can help.
1.  From WinRE ("Advanced options" > "Troubleshoot" > "Advanced options"), select "Command Prompt."
2.  Run the System File Checker:
    ```cmd
    sfc /scannow
    ```
    This command scans for and repairs corrupted Windows system files. Allow it to complete.
3.  If SFC reports that it found errors but couldn't fix them, or if the problem persists, use DISM to repair the Windows image. Again, ensure you use the correct drive letter if your Windows installation isn't on `C:` (use `/Image:D:\` for instance, if `D:` is your Windows drive).
    ```cmd
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    If running from WinRE and not booted into Windows, you might need to specify the source. For simplicity, if `/Online` doesn't work, ensure you've first attempted `sfc /scannow`. If SFC fails and you're still in WinRE, a cleaner approach might be a full Windows reinstall if other steps don't work, but typically the `/Online` variant works even from WinRE if it can access the installation image.
4.  After DISM completes (which can also take time), run `sfc /scannow` again for good measure.
5.  Type `exit` and press Enter, then try restarting your computer normally.

#### ## 5: Update or Roll Back Device Drivers

Outdated or corrupted drivers, especially for your storage controller, can interfere with file system operations.
1.  If you can boot into Windows (even Safe Mode), right-click the Start button and select "Device Manager."
2.  Expand "IDE ATA/ATAPI controllers" and "Storage controllers."
3.  Right-click on each device listed and select "Update driver." Choose "Search automatically for drivers."
4.  If updating doesn't help or if the error started after a driver update, try "Roll Back Driver" if the option is available under the driver's Properties > Driver tab.
5.  Also, check for any devices with yellow exclamation marks, which indicate a problem. Update or uninstall and reinstall their drivers.
6.  If you recently installed a new peripheral, try uninstalling its drivers.

#### ## 6: Test Your RAM (Memory)

Faulty RAM can lead to data corruption that manifests as file system errors because data read from or written to memory becomes corrupted.
1.  If you can boot into Windows, type "Windows Memory Diagnostic" into the Start search bar and open it.
2.  Select "Restart now and check for problems (recommended)."
3.  Your computer will restart and run a memory test. If errors are found, it indicates faulty RAM, which may need to be replaced.
4.  If you cannot boot, you might need to use a bootable memory testing tool (like MemTest86, which requires creating a bootable USB drive) if the Windows Memory Diagnostic doesn't run from WinRE.

#### ## 7: Check Disk Health and Consider Replacement

Ultimately, the `NTFS_FILE_SYSTEM` error can be a symptom of a failing hard drive or SSD.
1.  While Windows has some built-in tools, they are primarily for logical errors. For physical health, if you can boot into Windows, use third-party disk utility software (many free options are available) to check your drive's S.M.A.R.T. (Self-Monitoring, Analysis, and Reporting Technology) status. This will indicate if your drive is failing.
2.  If the S.M.A.R.T. data shows warnings or if `chkdsk` repeatedly finds and fixes bad sectors, your drive is likely failing. In this scenario, the best solution is to back up your data immediately and replace the drive. A fresh installation of Windows on the new drive will then be necessary.

### Common Mistakes

When faced with a BSOD, it's easy to panic and make common mistakes that can complicate the repair process:
*   **Skipping `chkdsk`:** Many users immediately jump to more complex solutions without running `chkdsk`, which is often the most direct fix for `NTFS_FILE_SYSTEM` errors. It should always be one of the first diagnostic steps.
*   **Ignoring backups:** Before attempting any major repairs, especially those involving disk operations, failing to back up critical data can lead to permanent data loss if the drive fails during the process.
*   **Aggressive driver uninstallation:** Randomly uninstalling drivers without identifying the problematic one can lead to more system instability. Always try updating or rolling back first.
*   **Misinterpreting "automatic repair loop":** While frustrating, the automatic repair loop is Windows' way of trying to fix itself or get you into WinRE. Don't immediately assume a full reinstall is needed without exhausting other repair options through WinRE.

### Prevention Tips

Preventing the `NTFS_FILE_SYSTEM` error involves good computer maintenance practices:
*   **Regular Backups:** Always have a current backup of your important files. Cloud storage or external hard drives are excellent options. This minimizes data loss if your drive fails.
*   **Monitor Disk Health:** Periodically check your hard drive's health using built-in Windows tools or reputable third-party software. Look out for increasing bad sectors or S.M.A.R.T. warnings.
*   **Keep Drivers Updated:** Ensure your device drivers, especially those for chipsets and storage controllers, are up to date. Download drivers directly from your computer manufacturer's website or the component manufacturer's site.
*   **Proper Shutdowns:** Always shut down Windows correctly. Avoid forcefully powering off your computer unless absolutely necessary, as this can corrupt the file system.
*   **Maintain System Integrity:** Run regular antivirus scans to protect against malware that could corrupt system files. Also, avoid installing software from untrusted sources.