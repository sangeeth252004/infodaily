---
title: "Fixing Windows 10/11 Stuck in an Infinite Boot Loop: A Comprehensive Guide"
date: "2026-10-10T05:19:56.268Z"
slug: "fixing-windows-10-11-stuck-in-an-infinite-boot-loop-a-comprehensive-guide"
type: "how-to"
description: "Resolve Windows 10 or Windows 11 stuck in an infinite boot loop with this practical, step-by-step guide. Learn common causes, solutions, and prevention tips."
keywords: "Windows 10 boot loop, Windows 11 boot loop, infinite boot loop fix, Windows startup repair, boot loop error, Windows recovery, system restore, safe mode Windows"
---

The "infinite boot loop" is a frustrating and common issue where your Windows 10 or Windows 11 computer repeatedly restarts itself during the startup process without ever reaching the login screen or desktop. You might see the Windows logo appear, followed by a spinning circle of dots, and then the screen goes black or the system abruptly restarts. This cycle can continue indefinitely, rendering your computer unusable.

This problem indicates a critical failure in the Windows startup process. It signifies that the operating system is unable to load essential files or processes required for a successful boot. The computer gets stuck trying to load Windows, fails, and automatically restarts to try again, creating a continuous loop of failure.

## Why It Happens

An infinite boot loop is typically triggered by corrupted system files, driver conflicts, issues with recent Windows updates, or problems with installed hardware. A faulty driver, for instance, can prevent the operating system from initializing properly. Similarly, a corrupt system file, perhaps damaged during a power outage or a failed update, can halt the boot process at a critical juncture. Malware infections can also be a cause, as they can intentionally corrupt or interfere with boot-critical components. In some cases, failing hardware, such as a hard drive or RAM, can manifest as boot loop issues if these components are essential for loading the operating system.

Occasionally, a botched BIOS/UEFI update or a misconfigured boot order can also lead to this predicament. Essentially, anything that disrupts the chain of events required to load Windows from power-on to desktop can result in an infinite boot loop. The system's internal checks detect a fatal error during startup and initiate a restart to prevent further damage or data corruption.

## Step-by-Step Solution

To break free from the boot loop, you'll need to access advanced startup options. This usually requires booting from a Windows installation media (USB drive or DVD) or using the Windows Recovery Environment (WinRE).

## Step 1: Accessing Advanced Startup Options

If your computer is stuck in a boot loop, it will likely automatically enter the Windows Recovery Environment (WinRE) after a few failed startup attempts. You will see a blue screen with options like "Choose an option."

If WinRE does not automatically appear, you will need to create Windows 10 or Windows 11 installation media on another working computer. Download the Media Creation Tool from Microsoft's official website, create a bootable USB drive, and then boot your problematic computer from this USB drive. To do this, you may need to change your BIOS/UEFI boot order to prioritize the USB drive. Once booted from the USB, select your language, time, and keyboard preferences, then click "Next." On the next screen, click "Repair your computer" in the bottom-left corner. This will also lead you to the "Choose an option" screen.

From the "Choose an option" screen, select **Troubleshoot**.

## Step 2: Using Startup Repair

Startup Repair is designed to automatically diagnose and fix problems that prevent Windows from loading.

1.  From the "Choose an option" screen, navigate to **Troubleshoot** > **Advanced options** > **Startup Repair**.
2.  Select your operating system (Windows 10 or Windows 11).
3.  The tool will then attempt to identify and fix startup problems. This process can take some time.
4.  Once complete, your computer will restart. Check if the boot loop has been resolved.

## Step 3: Booting into Safe Mode

Safe Mode starts Windows with a minimal set of drivers and services. If the boot loop is caused by a faulty driver or software, booting into Safe Mode will allow you to uninstall it or perform other troubleshooting steps.

1.  From the "Choose an option" screen, navigate to **Troubleshoot** > **Advanced options** > **Startup Settings**.
2.  Click **Restart**.
3.  After your computer restarts, you'll see a list of options. Press **4** or **F4** to boot into Safe Mode, or **5** or **F5** to boot into Safe Mode with Networking (if you need internet access).
4.  If you can successfully boot into Safe Mode, you can proceed to uninstall recently installed software or drivers.

## Step 4: Uninstalling Recent Updates or Drivers (from Safe Mode)

If you suspect a recent update or driver installation caused the boot loop, you can remove them from Safe Mode.

**To uninstall a recent Windows update:**

1.  In Safe Mode, search for "Command Prompt" and right-click it, then select "Run as administrator."
2.  Type the following command and press Enter:
    ```
    wusa /uninstall /kb:<KB_number>
    ```
    Replace `<KB_number>` with the KB number of the update you want to uninstall. You may need to find this information from your update history if you can access it.
3.  Alternatively, from Safe Mode, go to **Settings** > **Update & Security** > **Windows Update** > **View update history** > **Uninstall updates**. Select the problematic update and uninstall it.

**To uninstall a recent driver:**

1.  In Safe Mode, right-click the Start button and select **Device Manager**.
2.  Expand the category of the suspected driver (e.g., Display adapters, Network adapters).
3.  Right-click the driver, select **Uninstall device**, and check the box that says "Delete the driver software for this device" if available.
4.  Restart your computer normally.

## Step 5: System Restore

System Restore allows you to revert your system files to a previous state when the computer was working correctly.

1.  From the "Choose an option" screen, navigate to **Troubleshoot** > **Advanced options** > **System Restore**.
2.  Select your operating system.
3.  Follow the on-screen prompts to choose a restore point. Ensure the chosen restore point predates the onset of the boot loop.
4.  Click "Next" and then "Finish" to begin the restoration process.

## Step 6: Command Prompt for System File Checker and DISM

Corrupted system files can be repaired using built-in command-line tools.

1.  From the "Choose an option" screen, navigate to **Troubleshoot** > **Advanced options** > **Command Prompt**.
2.  Type the following command to run the System File Checker (SFC) and press Enter:
    ```
    sfc /scannow
    ```
    This command will scan for and attempt to repair corrupted Windows system files.
3.  If SFC finds issues but cannot fix them, or if it completes without resolving the boot loop, run the Deployment Image Servicing and Management (DISM) tool. First, to identify your Windows partition, you might need to list volumes:
    ```
    diskpart
    list volume
    exit
    ```
    Note the drive letter of your Windows installation (usually C: or D: in WinRE). Then, run the DISM commands, replacing `C:` with your Windows drive letter if it's different:
    ```
    DISM /Online /Cleanup-Image /CheckHealth
    DISM /Online /Cleanup-Image /ScanHealth
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    If you are running DISM from WinRE and `/Online` doesn't work, you might need to specify the image:
    ```
    DISM /Image:C:\ /Cleanup-Image /RestoreHealth /Source:X:\sources\install.wim
    ```
    (Replace `C:` with your Windows drive letter and `X:` with the drive letter of your installation media).
4.  After running these commands, restart your computer.

## Step 7: Reset This PC or Clean Install

If none of the above steps resolve the boot loop, your final resort is to reset your PC or perform a clean installation of Windows.

**Reset This PC:**

1.  From the "Choose an option" screen, navigate to **Troubleshoot** > **Reset this PC**.
2.  You will have two options: "Keep my files" (reinstalls Windows but keeps your personal files) or "Remove everything" (deletes all files, apps, and settings). Choose the option that best suits your needs.
3.  Follow the on-screen prompts.

**Clean Install:**

1.  If resetting doesn't work or you want a completely fresh start, you'll need to perform a clean installation using your Windows installation media.
2.  Boot from your Windows installation USB drive.
3.  Select your language and click "Next."
4.  Click "Install now."
5.  Follow the on-screen prompts, selecting "Custom: Install Windows only (advanced)."
6.  Delete existing partitions or format them, then select the unallocated space to install Windows. **Warning: This will erase all data on the selected drive.**

## Common Mistakes

One of the most common mistakes is attempting to access the boot menu or recovery options by repeatedly pressing the wrong key during startup. Each computer manufacturer has a specific key (e.g., F2, F10, F12, DEL, ESC) for BIOS/UEFI access or boot menu selection. Users often panic and repeatedly hit the Windows key or Spacebar, which doesn't trigger the desired menu. Another frequent error is not having Windows installation media readily available when needed. Relying solely on automatic WinRE entry can be problematic if it fails to trigger. Furthermore, users sometimes skip the crucial step of trying to boot into Safe Mode first, immediately jumping to more drastic measures like a clean install, which could lead to unnecessary data loss. Finally, performing a clean install without backing up important data is a significant oversight if the goal was to preserve files.

## Prevention Tips

To prevent future boot loops, maintain a regular backup schedule for your important files. This can be done using external hard drives, cloud storage services, or Windows' built-in backup tools. Always ensure your Windows operating system is up-to-date, but install major updates cautiously. Read reviews or wait a few days for major feature updates to be released before installing them to avoid potential bugs. Be selective when installing new drivers or third-party software; always download from official sources and consider creating a system restore point before installing significant new hardware drivers or applications. Running regular antivirus and anti-malware scans can also help prevent infections that might corrupt system files. Finally, ensure your PC has adequate cooling and is free from dust buildup, as overheating can lead to hardware instability and corrupted data.