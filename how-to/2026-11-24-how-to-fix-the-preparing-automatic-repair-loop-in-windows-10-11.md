---
title: "How to Fix the \"Preparing Automatic Repair\" Loop in Windows 10/11"
date: "2026-11-24T08:27:24.770Z"
slug: "how-to-fix-the-preparing-automatic-repair-loop-in-windows-10-11"
type: "how-to"
description: "Stuck in the \"Preparing Automatic Repair\" loop on Windows 10 or 11? This comprehensive guide provides step-by-step solutions, from basic troubleshooting to advanced command-line fixes, to get your PC booting again."
keywords: "Windows 10, Windows 11, Automatic Repair loop, Preparing Automatic Repair, startup repair, boot loop, system restore, SFC, DISM, safe mode, fix boot problem, Windows startup issue"
---

The "Preparing Automatic Repair" loop is a frustrating issue that can prevent your Windows 10 or 11 computer from booting correctly. When encountering this problem, your PC attempts to diagnose and fix startup issues but fails, often getting stuck in a continuous cycle. This guide will walk you through the necessary steps to diagnose and resolve this problem, restoring your system to a functional state.

### Problem Explanation

When your computer starts, you might first see the manufacturer's logo, followed by a black screen with spinning dots and the message "Preparing Automatic Repair." After a few moments, this often transitions to "Diagnosing your PC." In an ideal scenario, Windows Automatic Repair would successfully identify and fix the underlying boot problem, leading to a normal startup. However, in the dreaded "loop," the repair process fails, and the system either reboots only to display the "Preparing Automatic Repair" message again, or it presents the "Automatic Repair couldn't repair your PC" screen, sometimes offering an "Advanced options" button that leads back to the same failed attempts. This cycle prevents you from accessing your desktop and using your computer.

### Why It Happens

This persistent loop indicates a critical issue preventing Windows from booting properly. The root causes are varied but typically revolve around corruption or damage to essential system files or the boot configuration. Common reasons include:

*   **Corrupt System Files:** Critical Windows files necessary for startup might become damaged due to malware, sudden power loss, or improper shutdowns.
*   **Damaged Boot Sector or MBR:** The Master Boot Record (MBR) or the boot sector on your hard drive, which tells your computer where to find the operating system, can become corrupted.
*   **Recent Driver Conflicts:** A newly installed or updated device driver might be incompatible or faulty, causing a boot failure.
*   **Failed Windows Updates:** An incomplete or corrupted Windows update can introduce conflicts that prevent the system from starting.
*   **Malware or Virus Infection:** Malicious software can damage system files or boot components, leading to startup problems.
*   **Hardware Changes:** Recently installed hardware, or even failing hardware (like a hard drive or RAM), can disrupt the boot process.
*   **Sudden Power Loss:** An unexpected shutdown during critical operations can leave system files in an inconsistent state.

The Automatic Repair feature is designed to address these issues, but when it repeatedly fails, it signifies that the underlying problem is beyond its automated capabilities or that its own files are compromised.

### Step-by-Step Solution

To effectively troubleshoot and fix the "Preparing Automatic Repair" loop, you'll need to access the Windows Recovery Environment (WinRE). Since your PC isn't booting normally, you'll likely need to force it into WinRE.

#### How to Access Windows Recovery Environment (WinRE)

If your computer is stuck in a loop, force it to shut down three consecutive times:

1.  Turn on your computer.
2.  As soon as you see the Windows logo (or spinning dots), press and hold the power button for 5-10 seconds to force a shutdown.
3.  Repeat this process two more times.
4.  On the third startup, Windows should recognize multiple failed boot attempts and automatically enter the WinRE, presenting you with a "Recovery" screen or "Automatic Repair couldn't repair your PC" with an "Advanced options" button. Select "Advanced options" to proceed.

From the "Choose an option" screen in WinRE, select **Troubleshoot**, then **Advanced options**. This is where you'll find the tools needed to resolve the issue.

#### ## Step 1: Try Startup Repair

The most straightforward initial step is to let Windows attempt its built-in Startup Repair again, as sometimes a subsequent attempt can succeed.

1.  In WinRE, go to **Troubleshoot > Advanced options > Startup Repair**.
2.  Select your operating system (usually "Windows 10" or "Windows 11").
3.  Allow the process to run. It will attempt to diagnose and fix common startup problems.
4.  If it succeeds, your PC will restart normally. If it fails, you will likely return to the "Automatic Repair couldn't repair your PC" screen. Proceed to the next step.

#### ## Step 2: Uninstall Recent Updates

Windows updates are a common culprit for boot issues. If the loop started after a recent update, uninstalling it might resolve the problem.

1.  In WinRE, go to **Troubleshoot > Advanced options > Uninstall Updates**.
2.  You will be presented with two options:
    *   **Uninstall latest quality update:** This is usually a smaller, monthly update. Try this first.
    *   **Uninstall latest feature update:** This is a larger, semi-annual update that can significantly change Windows.
3.  Select the option you believe might be causing the problem.
4.  Follow the prompts to uninstall the update. Your PC will restart. If successful, it should boot normally.

#### ## Step 3: Perform a System Restore

System Restore allows you to revert your computer's system files, installed applications, and registry to an earlier point in time, without affecting your personal files. This is incredibly useful if the problem is recent.

1.  In WinRE, go to **Troubleshoot > Advanced options > System Restore**.
2.  Select your operating system.
3.  The System Restore wizard will open. Click **Next**.
4.  Choose a restore point from the list. Ideally, select a point created *before* the "Preparing Automatic Repair" loop began.
5.  Click **Scan for affected programs** to see what will be removed or added, then click **Next** and **Finish**.
6.  Confirm your choice. Your computer will restart and apply the restore point. This process can take some time.

*   **Note:** This option only works if you have previously enabled System Protection and created restore points.

#### ## Step 4: Run System File Checker (SFC) and DISM Scans

Corrupt system files are a frequent cause of boot loops. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can scan for and repair these issues. You'll need to use the Command Prompt for this.

1.  In WinRE, go to **Troubleshoot > Advanced options > Command Prompt**.
2.  **Identify your Windows installation drive:** In the Command Prompt, type `diskpart` and press Enter. Then type `list volume` and press Enter. Look for the volume that contains your Windows installation (it's usually the largest partition, typically marked as `Boot` in the `Info` column, but its drive letter might not be C: in WinRE; it could be D: or E:). Note down the drive letter of your Windows partition (e.g., `D:`). Also, note the letter of your system reserved/boot partition (often `C:` in WinRE, even if Windows is on D:). Type `exit` and press Enter to leave `diskpart`.
3.  **Run SFC:** Type the following command, replacing `D:` with the actual drive letter of your Windows installation, and `C:` with your boot partition letter if different:
    `sfc /scannow /offbootdir=C:\ /offwindir=D:\Windows`
    Press Enter. This scan can take some time.
4.  **Run DISM:** After SFC completes, type the following command, replacing `D:` with your Windows installation drive letter:
    `DISM /Image:D:\ /Cleanup-Image /RestoreHealth`
    Press Enter. This process can also take significant time and might appear to hang at certain percentages. Be patient.
5.  After both scans complete, type `exit` and press Enter to close the Command Prompt.
6.  Click **Continue** to exit WinRE and restart your PC.

#### ## Step 5: Boot into Safe Mode

If the issue is caused by a faulty driver or third-party software, booting into Safe Mode can help you isolate and remove the problematic item. Safe Mode starts Windows with a minimal set of drivers and services.

1.  In WinRE, go to **Troubleshoot > Advanced options > Startup Settings**.
2.  Click **Restart**.
3.  Your PC will restart and present a list of startup options.
4.  Press **4** or **F4** for "Enable Safe Mode" or **5** or **F5** for "Enable Safe Mode with Networking" (if you need internet access to download drivers or tools).
5.  If Windows boots successfully into Safe Mode, you can then:
    *   Uninstall recently installed software.
    *   Update or roll back recently installed drivers (e.g., graphics card, network adapter).
    *   Run a full virus scan.
6.  After making changes, restart your PC normally to see if the loop is resolved.

#### ## Step 6: Reset This PC or Clean Reinstallation

If all other methods fail, a full reset or clean reinstallation of Windows is usually the last resort.

1.  **Reset This PC:**
    *   In WinRE, go to **Troubleshoot > Reset this PC**.
    *   You'll be given two options:
        *   **Keep my files:** This reinstalls Windows but preserves your personal files. It will remove installed applications and settings.
        *   **Remove everything:** This performs a clean installation, deleting all personal files, apps, and settings. This is often more effective but requires backing up your important data beforehand.
    *   Follow the on-screen prompts. Choose between a "Cloud download" (downloads a fresh copy of Windows) or "Local reinstall" (uses existing system files). Cloud download is generally more reliable.
2.  **Clean Installation (Requires Windows Installation Media):**
    *   If "Reset this PC" fails, or you prefer a completely fresh start, you can perform a clean installation using a Windows 10/11 installation USB drive or DVD. This requires creating bootable media on another working computer.
    *   Boot your PC from the installation media, then follow the setup prompts to install Windows. This will erase everything on your system drive.

### Common Mistakes

When trying to fix the "Preparing Automatic Repair" loop, users often make several common mistakes that can complicate the recovery process:

*   **Panicking and Immediately Reinstalling:** Many users jump straight to reinstalling Windows without trying simpler, less destructive fixes like Startup Repair, System Restore, or uninstalling updates. This can lead to unnecessary data loss and time spent on reinstallation and software setup.
*   **Ignoring Potential Hardware Issues:** While the problem often appears to be software-related, underlying hardware failures (e.g., a failing hard drive, corrupt RAM, or an incompatible new component) can trigger these boot issues. If software fixes repeatedly fail, consider testing your hardware.
*   **Not Backing Up Data:** Before attempting any significant repair like a "Reset this PC" with "Remove everything" or a clean installation, failing to back up important files can result in permanent data loss. Always prioritize data backup if you can access your files (e.g., via Safe Mode or by attaching the drive to another PC).
*   **Incorrectly Using Command Prompt Commands:** Typos or misunderstandings of commands like `sfc` and `DISM` can lead to ineffective repairs or even further issues. Ensure you correctly identify your Windows installation drive letter when using `/offbootdir`, `/offwindir`, or `/Image` switches.

### Prevention Tips

Preventing the "Preparing Automatic Repair" loop involves good system hygiene and proactive measures:

*   **Regular Backups:** The most critical prevention tip is to regularly back up your important files to an external drive or cloud storage. This ensures that even in the event of a catastrophic system failure, your data remains safe. Consider creating full system image backups periodically.
*   **Keep Drivers Updated (Carefully):** While outdated drivers can cause issues, faulty or incompatible drivers can also trigger problems. Obtain drivers directly from your hardware manufacturer's website, and avoid generic driver update tools. If a problem starts after a driver update, know how to roll it back.
*   **Avoid Force Shutdowns:** Whenever possible, shut down your computer properly through the Windows Start Menu. Force shutdowns (holding the power button) can corrupt system files if Windows is performing critical operations.
*   **Install Windows Updates Reliably:** Ensure your internet connection is stable during Windows updates. Avoid turning off your computer or disconnecting from the network while updates are being installed.
*   **Use Antivirus/Antimalware Software:** Keep your security software updated and perform regular scans to protect against malware that can damage system files.
*   **Monitor Disk Health:** Tools like `chkdsk` (run from Command Prompt) can help check for and repair bad sectors on your hard drive. Consider using third-party disk health monitoring tools for early detection of potential drive failures.