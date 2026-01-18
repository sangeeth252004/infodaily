---
title: "How to Fix the 'INACCESSIBLE_BOOT_DEVICE' Blue Screen Error in Windows 10/11"
date: "2026-01-18T15:18:53.397Z"
slug: "how-to-fix-the-inaccessible-boot-device-blue-screen-error-in-windows-10-11"
type: "how-to"
description: "Troubleshoot and resolve the 'INACCESSIBLE_BOOT_DEVICE' Blue Screen of Death (BSOD) error in Windows 10 or 11 with this comprehensive, step-by-step guide. Fix common causes like driver issues, corrupted boot files, and hardware problems."
keywords: "INACCESSIBLE_BOOT_DEVICE, Blue Screen Error, BSOD, Windows 10, Windows 11, boot device error, fix inaccessible boot device, Windows startup repair, bootrec, chkdsk, storage driver, corrupted boot files"
---

### Problem Explanation

The "INACCESSIBLE_BOOT_DEVICE" error is a critical Blue Screen of Death (BSOD) that prevents Windows 10 or 11 from booting normally. When this error occurs, your system will display a blue screen with the message "Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you," followed by the Stop Code: "INACCESSIBLE_BOOT_DEVICE". Your computer will typically attempt to restart, often cycling back to the same error or entering an automatic repair loop that ultimately fails.

This error indicates that Windows has lost access to the boot device (your primary hard drive or SSD) during startup. This means the operating system can no longer find the files it needs to load, effectively halting the boot process before the desktop can even appear. The system is trying to access the device where it expects to find the boot files, but it's encountering an unexpected failure or absence.

### Why It Happens

The "INACCESSIBLE_BOOT_DEVICE" error primarily stems from an issue preventing Windows from reading essential boot data from your storage drive. The root causes are varied but generally fall into a few categories:

*   **Corrupted Boot Configuration Data (BCD) or System Files:** Essential files that tell Windows how to boot can become damaged due to improper shutdowns, disk errors, or malware.
*   **Storage Controller Driver Issues:** This is a very common cause. If the driver responsible for communicating with your hard drive or SSD is missing, outdated, or corrupted, Windows cannot access the boot device. This often happens after a Windows update or a hardware change.
*   **Hardware Problems:** A failing or improperly connected hard drive/SSD, a loose SATA cable, or even a faulty motherboard can prevent the system from recognizing the boot device.
*   **Recent System Changes:** A freshly installed Windows update, a new piece of hardware, or a BIOS/UEFI setting change can inadvertently disrupt the boot process or introduce incompatible drivers.
*   **Master Boot Record (MBR) / GUID Partition Table (GPT) Corruption:** The partition information critical for booting Windows can become damaged.

### Step-by-Step Solution

To resolve the "INACCESSIBLE_BOOT_DEVICE" error, you'll generally need to access the Windows Recovery Environment (WinRE). If your PC enters an automatic repair loop, it should eventually offer WinRE options. If not, you may need to create a Windows installation media (USB drive) on another working computer and boot from it.

**To access WinRE via Automatic Repair:**
1.  Turn on your PC.
2.  As soon as the Windows logo appears, press and hold the power button to force shutdown.
3.  Repeat this process 2-3 times.
4.  On the next startup, your PC should enter the "Preparing Automatic Repair" mode, leading to the Advanced Options screen.

**To access WinRE via Installation Media:**
1.  Insert your Windows 10/11 installation USB drive.
2.  Boot your PC from the USB drive (you might need to adjust BIOS/UEFI boot order).
3.  Select your language and region, then click "Next".
4.  Click "Repair your computer" in the bottom-left corner.

Once in WinRE, navigate to **Troubleshoot > Advanced options** to access the tools described below.

---

### **Step 1: Perform Basic Hardware Checks**

Before diving into software fixes, rule out simple hardware issues.
1.  **Power off** your computer completely.
2.  **Unplug** the power cable and any peripherals.
3.  **Open** your computer case (if it's a desktop). For laptops, this step is more difficult, but you can still check external connections.
4.  **Verify** that the SATA or NVMe data cables connecting your hard drive/SSD to the motherboard are securely seated at both ends.
5.  **Check** the power cables to the drive.
6.  If you recently installed new hardware, remove it temporarily to see if it's the culprit.
7.  **Reconnect** everything securely, close the case, and attempt to boot.

---

### **Step 2: Uninstall Recent Updates or Use System Restore**

Recent Windows updates are a common cause of this error due to driver conflicts.
1.  From the WinRE **Advanced options** menu, select **Uninstall Updates**.
2.  You'll have two options: **Uninstall latest quality update** (for smaller cumulative updates) or **Uninstall latest feature update** (for major version upgrades like 20H2 to 21H1). Try uninstalling the latest quality update first.
3.  If that doesn't work, return to **Advanced options** and select **System Restore**.
4.  Follow the prompts to choose a restore point created before the error started occurring. This will revert your system files and settings to an earlier state without affecting your personal files.

---

### **Step 3: Update or Reinstall Storage Controller Drivers**

Corrupted or incorrect storage drivers are a frequent cause. This typically requires using the Command Prompt.
1.  From the WinRE **Advanced options** menu, select **Command Prompt**.
2.  Type `dir c:` and press Enter to confirm which drive letter corresponds to your Windows installation (it might not always be C: in WinRE, often D: or E:). Adjust commands accordingly. Let's assume it's `C:`.
3.  Type `pnputil /enum-drivers` and press Enter. This lists all installed drivers. Look for drivers related to your storage controller (e.g., Intel RST, AMD SATA Controller, Standard NVM Express Controller).
4.  If you know your storage controller manufacturer (e.g., Intel), you might try to disable or remove its driver. This is advanced and risky. A safer approach is to check if disabling Safe Mode driver enforcement helps:
    *   From **Advanced options**, select **Startup Settings**, then **Restart**.
    *   Press `F4` or `4` to Enable Safe Mode. If Windows boots in Safe Mode, it indicates a driver issue. You can then go to Device Manager and update or uninstall the problematic storage controller drivers.
    *   To manually update drivers if you can access another PC: download the latest drivers for your motherboard's storage controller from the manufacturer's website, place them on a USB drive, and then in Command Prompt use `dism /image:C:\ /add-driver /driver:X:\path\to\driver.inf` (replace `X` with your USB drive letter).
5.  A simpler alternative if you suspect a driver issue but can't find specific drivers: type `regedit` in Command Prompt to open Registry Editor.
    *   Navigate to `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services`.
    *   Scroll through the list and check drivers related to storage controllers (e.g., `iaStorA`, `iaStorAV`, `storahci`, `nvme`). Ensure their "Start" value is `0` (boot at startup). If it's `4` (disabled), change it to `0`. This is especially relevant if you recently switched between IDE/AHCI/RAID modes in BIOS.

---

### **Step 4: Repair Corrupted Boot Files**

Damage to the Boot Configuration Data (BCD) or Master Boot Record (MBR) can cause this error.
1.  From the WinRE **Advanced options** menu, select **Command Prompt**.
2.  Execute the following commands in order, pressing Enter after each:
    *   `bootrec /fixmbr` (Repairs the Master Boot Record)
    *   `bootrec /fixboot` (Writes a new boot sector to the system partition)
    *   `bootrec /scanos` (Scans for Windows installations)
    *   `bootrec /rebuildbcd` (Rebuilds the Boot Configuration Data)
3.  When prompted by `bootrec /rebuildbcd` to "Add installation to boot list? (Y/N/All):", type `Y` and press Enter.
4.  Type `exit` and restart your computer.

---

### **Step 5: Check Disk for Errors (chkdsk)**

Bad sectors or file system errors on your boot drive can lead to inaccessibility.
1.  From the WinRE **Advanced options** menu, select **Command Prompt**.
2.  Type `chkdsk C: /f /r /x` (replace `C:` with your Windows drive letter if different) and press Enter.
    *   `/f` fixes errors on the disk.
    *   `/r` locates bad sectors and recovers readable information.
    *   `/x` forces the volume to dismount first if necessary.
3.  This process can take a long time, depending on your drive size and number of errors. Let it complete without interruption.
4.  Once finished, type `exit` and restart your computer.

---

### **Step 6: Use DISM and SFC Scans**

These tools check and repair Windows system files.
1.  From the WinRE **Advanced options** menu, select **Command Prompt**.
2.  Execute the Deployment Image Servicing and Management (DISM) commands first:
    *   `DISM /Image:C:\ /Cleanup-Image /RestoreHealth` (Again, replace `C:` if your Windows drive is different). This command attempts to repair the Windows image using an online source. If you're using installation media, it might use files from there.
3.  After DISM completes, run the System File Checker (SFC) command:
    *   `sfc /scannow /offbootdir=C:\ /offwindir=C:\windows` (Ensure `C:` is correct).
4.  These scans can also take a while. After they complete, type `exit` and restart your computer.

---

### **Step 7: Reset This PC or Clean Installation**

If all previous steps fail, your Windows installation may be too corrupted to repair.
1.  From the WinRE **Troubleshoot** menu, select **Reset this PC**.
2.  You'll have two options:
    *   **Keep my files:** This reinstalls Windows but preserves your personal files. It will remove apps and settings.
    *   **Remove everything:** This performs a clean reinstallation, deleting all personal files, apps, and settings.
3.  Choose the option that best suits your needs. "Keep my files" is often sufficient.
4.  If "Reset this PC" also fails, a **clean installation of Windows** using a bootable USB drive (created on another PC) is the last resort. This will erase everything on your boot drive, so ensure you've attempted data recovery if needed beforehand.

---

### Common Mistakes

When troubleshooting the "INACCESSIBLE_BOOT_DEVICE" error, people often make a few common mistakes that can prolong the fix or even worsen the situation:

*   **Skipping Hardware Checks:** Many users immediately jump to software fixes without first verifying physical connections. A loose SATA cable or power connector is a simple fix that is often overlooked.
*   **Incorrect Drive Letter in WinRE:** In the Command Prompt within WinRE, the Windows installation drive is often not `C:`. Incorrectly assuming `C:` can lead to commands failing or targeting the wrong partition. Always verify the correct drive letter using `dir C:` or `dir D:`, etc.
*   **Panicking and Immediately Reinstalling Windows:** While a clean install is a valid last resort, it's often unnecessary and can lead to data loss. Taking the time to go through diagnostic steps can save your current installation and data.
*   **Not Creating Installation Media:** If your PC cannot enter WinRE through automatic repair, having a bootable Windows installation USB drive ready is crucial. Waiting until the error occurs to create one can be frustrating.
*   **Ignoring BIOS/UEFI Settings:** Sometimes, a recent change in BIOS (e.g., switching between AHCI and IDE mode for SATA operations, or Secure Boot settings) can cause this error. Forgetting to check or revert these changes can prevent a solution.

### Prevention Tips

Preventing the "INACCESSIBLE_BOOT_DEVICE" error involves good system maintenance and cautious practices:

*   **Regular Backups:** The most important prevention tip. Regularly back up your essential data to an external drive or cloud service. This ensures that even if your boot drive becomes truly inaccessible or corrupted, your important files are safe.
*   **Keep Drivers Updated (Carefully):** While outdated drivers can cause issues, so can buggy new ones. Obtain storage controller drivers directly from your motherboard manufacturer's website. Avoid generic drivers or untested beta versions.
*   **Monitor Drive Health:** Use tools like CrystalDiskInfo or your SSD manufacturer's utility to periodically check the S.M.A.R.T. status of your hard drive or SSD. Early warnings can help you replace a failing drive before it causes critical errors.
*   **Perform Safe Shutdowns:** Avoid forcing your computer to shut down by holding the power button unless absolutely necessary. Improper shutdowns can corrupt system files and the BCD.
*   **Be Cautious with System Changes:** When installing new hardware, making significant changes to BIOS/UEFI settings, or performing major Windows updates, ensure you understand the implications and have a backup plan (like a System Restore point).
*   **Ensure Proper Ventilation:** Overheating can stress hardware components, including storage drives. Ensure your PC has adequate airflow to prevent premature hardware failure.