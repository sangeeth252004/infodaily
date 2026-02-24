---
title: "How to Resolve \"No Bootable Device Found\" Error in Windows 10/11"
date: "2026-02-24T02:01:23.897Z"
slug: "how-to-resolve-no-bootable-device-found-error-in-windows-10-11"
type: "how-to"
description: "Troubleshoot and fix the common \"No Bootable Device Found\" error on your Windows 10 or 11 PC with this easy-to-follow guide. Learn the causes and solutions."
keywords: "No Bootable Device Found, Windows 10, Windows 11, boot error, fix boot, hard drive not detected, BIOS, UEFI, boot order, Windows repair"
---

## The Dreaded "No Bootable Device Found" Error

You power on your Windows 10 or Windows 11 computer, expecting to see your familiar desktop, but instead, a stark message greets you: "No bootable device found." This is a frustrating and often alarming error that means your computer cannot find a drive with the necessary files to start up your operating system. You might see variations of this message, such as "Boot Device Not Found," "No bootable devices found. Press any key to reboot," or simply a blinking cursor on a black screen. Whatever the exact wording, the outcome is the same: your PC refuses to boot.

This error prevents you from accessing your files, applications, and the operating system itself. It can happen unexpectedly, leaving users unsure of what went wrong and how to proceed. Without a bootable device, your computer is essentially a very expensive paperweight, unable to perform its primary function.

## Why Your Computer Can't Find a Bootable Device

The "No Bootable Device Found" error typically arises because your computer's BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface) cannot locate a storage device (like a hard drive or SSD) that contains the essential operating system files needed to launch Windows. There are several common culprits behind this issue.

One of the most frequent reasons is a **misconfigured boot order** in your BIOS/UEFI settings. Your computer checks devices in a specific sequence to find a bootable drive, and if the correct one (usually your primary hard drive or SSD) isn't at the top of that list, it won't be found. Another significant cause is a **corrupted Master Boot Record (MBR)** or **GUID Partition Table (GPT)**, which are critical structures on your storage device that tell the computer how to load the operating system. Physical issues, such as a **loose or disconnected drive cable**, **failure of the hard drive/SSD itself**, or even **recent hardware changes** that weren't properly configured, can also lead to this error. Sometimes, a recent **Windows update gone wrong** can also corrupt boot files.

## Step-by-Step Solution to Fix the "No Bootable Device Found" Error

Don't panic! This error is often fixable with a systematic approach. Follow these steps to diagnose and resolve the issue:

### ## Step 1: Check Your BIOS/UEFI Boot Order

This is the most common and often the easiest fix. Your computer's BIOS/UEFI controls the startup sequence of devices.

1.  **Restart your computer.**
2.  As soon as the manufacturer's logo appears (or before it, if it's a very quick startup), repeatedly press the key that enters your BIOS/UEFI setup. Common keys are **F2, F10, F12, DEL, or ESC**. If you're unsure, check your computer's manual or search online for your specific model.
3.  Once in the BIOS/UEFI, navigate to the **"Boot"**, **"Boot Order"**, or **"Boot Sequence"** section. The exact naming varies by manufacturer.
4.  Ensure that your primary hard drive or SSD (where Windows is installed) is listed as the **first boot device**. If you see options like "Windows Boot Manager," that's usually the correct choice.
5.  If your drive is not listed first, use the on-screen instructions (usually arrow keys and Enter) to move it to the top of the list.
6.  **Save your changes** and exit the BIOS/UEFI. This is typically done by pressing the **F10** key and confirming with "Yes" or "Y."
7.  Your computer will restart. See if it boots into Windows.

### ## Step 2: Ensure All Cables are Securely Connected (Desktop PCs)

For desktop computers, a loose connection is a surprisingly common culprit.

1.  **Shut down your computer completely** and unplug the power cord from the wall outlet.
2.  **Open your computer's case.** This usually involves unscrewing a side panel.
3.  Locate your hard drive or SSD.
4.  **Check both the SATA data cable (thin, flat cable) and the SATA power cable (wider cable) connecting your drive to the motherboard and power supply.**
5.  **Gently but firmly reseat both cables** at both ends (on the drive and on the motherboard/power supply). Wiggle them slightly to ensure a solid connection.
6.  Close the computer case, reconnect the power cord, and try booting your computer again.

### ## Step 3: Run Startup Repair from Windows Recovery Environment

If the boot order is correct and cables are secure, the boot files themselves might be corrupted.

1.  You'll need a **Windows 10 or 11 installation media** (USB drive or DVD). If you don't have one, you'll need to create it on another working computer using the Media Creation Tool from Microsoft's website.
2.  **Insert the installation media** into your computer and **restart it**.
3.  **Enter your BIOS/UEFI** (as in Step 1) and ensure that the **USB drive or DVD drive is set as the first boot device**. Save and exit.
4.  Your computer should now boot from the installation media. You'll see a "Windows Setup" screen.
5.  Select your language, time, and keyboard input, then click **"Next."**
6.  On the next screen, click **"Repair your computer"** (usually in the bottom-left corner).
7.  Select **"Troubleshoot"** > **"Advanced options"** > **"Startup Repair."**
8.  Let the process complete. It will attempt to automatically fix issues that prevent Windows from loading. Your computer will restart automatically afterward.

### ## Step 4: Use Command Prompt to Repair Boot Records

If Startup Repair doesn't work, you can manually repair the boot records using Command Prompt.

1.  Follow steps 1-6 from Step 3 to get to the **"Choose an option"** screen within the Windows Recovery Environment.
2.  Select **"Troubleshoot"** > **"Advanced options"** > **"Command Prompt."**
3.  In the Command Prompt window, type the following commands, pressing Enter after each one:
    *   `diskpart` (This opens the Disk Partitioning utility)
    *   `list disk` (This shows all disks connected to your computer. Identify your Windows drive – usually Disk 0.)
    *   `select disk X` (Replace 'X' with the number of your Windows disk, e.g., `select disk 0`)
    *   `list partition` (This shows partitions on the selected disk. Find your main Windows partition, which is typically the largest one.)
    *   `select partition Y` (Replace 'Y' with the number of your Windows partition.)
    *   `active` (This marks the partition as active, essential for booting)
    *   `exit` (This exits Diskpart)
4.  Now, to rebuild the boot configuration data (BCD):
    *   `bootrec /fixmbr` (Writes a new Master Boot Record to the system partition.)
    *   `bootrec /fixboot` (Writes a new boot sector to the system partition.)
    *   `bootrec /scanos` (Scans disks for Windows installations.)
    *   `bootrec /rebuildbcd` (Scans disks for Windows installations and allows you to add them to the boot list.)
5.  When prompted to add installation to boot list, type **Y** and press Enter.
6.  Close the Command Prompt and click **"Continue"** to exit and restart your PC.

### ## Step 5: Reinstall Windows (Last Resort)

If none of the above steps resolve the issue, your Windows installation might be too severely corrupted, or the drive itself may have failed. Reinstalling Windows will wipe your drive and install a fresh copy of the operating system.

1.  Follow steps 1-4 from Step 3 to boot from your Windows installation media.
2.  On the "Windows Setup" screen, click **"Next"**.
3.  Click **"Install now"**.
4.  If prompted for a product key, click **"I don't have a product key"** (Windows will activate automatically if it was previously activated on this hardware).
5.  Select the version of Windows you want to install.
6.  Accept the license terms and click **"Next."**
7.  Choose **"Custom: Install Windows only (advanced)."**
8.  You will see a list of drives and partitions. **Carefully select the partition where Windows is currently installed** (usually the largest one on Drive 0).
9.  Click **"Delete"** to remove the existing Windows partition. If you have multiple partitions related to the old Windows installation (e.g., System Reserved, Recovery), delete those too. **Be absolutely certain you are deleting the correct partitions, as this will erase data.**
10. Select the **"Unallocated Space"** that was created by deleting partitions, and click **"New."** Windows will automatically create the necessary partitions.
11. Select the newly created primary partition and click **"Next"** to begin the installation.
12. Follow the on-screen prompts to set up Windows.

## Common Mistakes to Avoid

When tackling the "No Bootable Device Found" error, users often make a few common missteps that can hinder their progress or even worsen the situation. One frequent mistake is **repeatedly forcing shutdown and restarts without allowing the BIOS/UEFI to properly check devices**. This can sometimes corrupt boot sectors further. Another common error is **being too aggressive with command-line repairs**, such as typing incorrect or conflicting commands into the Command Prompt, which can lead to more significant boot problems. Users also sometimes forget to **change the boot order back** after using installation media, causing their computer to boot from the USB/DVD again on subsequent restarts. Finally, **jumping straight to reinstalling Windows without trying basic checks** like cable connections or boot order can lead to unnecessary data loss and a time-consuming reinstall when a simpler fix was available.

## Prevention Tips to Keep Your PC Running Smoothly

To minimize the chances of encountering the "No Bootable Device Found" error in the future, consider these preventative measures. **Regularly back up your important data**. This is the most crucial step, as it ensures that even if you have to reinstall Windows or replace a drive, your personal files will be safe. **Avoid abruptly powering off your computer** while it's running or during updates. Always use the "Shut down" option in Windows. **Keep your BIOS/UEFI firmware updated**. Manufacturers sometimes release updates that improve compatibility and stability. Check your computer or motherboard manufacturer's website for instructions. If you're upgrading hardware, **ensure compatibility** and follow proper installation procedures. Lastly, **be cautious with third-party system optimization tools** that claim to "clean up" your boot files, as some can cause more harm than good.