---
title: "How to Resolve \"We couldn't complete the updates. Undoing changes.\" Loop in Windows 10/11"
date: "2026-03-15T10:28:33.780Z"
slug: "how-to-resolve-we-couldn-t-complete-the-updates-undoing-changes-loop-in-windows-10-11"
type: "how-to"
description: "Stuck in a Windows update loop showing 'Undoing changes'? Learn expert step-by-step solutions to resolve this frustrating error on Windows 10 and 11, including advanced troubleshooting and prevention tips."
keywords: "Windows update loop, undoing changes, couldn't complete updates, Windows 10 update error, Windows 11 update error, update failed, update stuck, update troubleshooting, system restore, safe mode, DISM, SFC, Windows Update troubleshooter, software distribution, system file check"
---

### Problem Explanation

Encountering the "We couldn't complete the updates. Undoing changes. Don't turn off your computer." message can be one of the most frustrating experiences for a Windows user. This error typically appears after your computer attempts to install a Windows update, restarts, and then fails to properly apply the changes. Instead of booting into your desktop, your system gets stuck in a cycle: it attempts to apply the update, fails, then tries to revert the changes, often restarting multiple times and showing the same message repeatedly.

Users typically see their computer restart, display the "Working on updates" screen, perhaps reaching a certain percentage, then reboot again only to show the "We couldn't complete the updates. Undoing changes." message. This loop can last for minutes or even hours, preventing access to the operating system entirely and creating a sense of helplessness, as simply turning off the computer is advised against. The critical part is that you cannot interact with Windows in its normal state, making standard troubleshooting difficult.

### Why It Happens

This persistent update failure and undoing loop can stem from several underlying issues, often related to the integrity of system files, the update process itself, or conflicts with installed software or hardware.

One common culprit is corrupted update files. During the download or installation phase, a file might become damaged, leading to an incomplete or incorrect update that the system cannot fully integrate. Software conflicts, such as an aggressive antivirus program, incompatible drivers, or other third-party applications, can also interfere with the update process, causing it to fail. Insufficient disk space on the system drive is another frequent cause, as Windows needs ample room to download, extract, and install updates. Less commonly, but still possible, are underlying corrupted system files (which `DISM` and `SFC` can often address), or even a brief power interruption during a critical update phase, which can leave the system in an inconsistent state.

### Step-by-Step Solution

When your Windows PC gets stuck in the "Undoing changes" loop, your primary goal is to gain access to the Windows Recovery Environment (WinRE) to initiate troubleshooting. The steps below are designed to help you resolve this issue methodically.

### 1. Access Windows Recovery Environment (WinRE)

Since you cannot boot into Windows normally, you'll need to force your PC into WinRE.

*   **Force Shutdown:** Turn on your computer. As soon as you see the Windows logo, immediately press and hold the power button to force a shutdown.
*   **Repeat:** Do this two more times. On the third boot attempt, Windows should recognize that it failed to start correctly and will automatically launch the Automatic Repair screen, which leads to WinRE.
*   **Navigate to Advanced Options:** Once in the "Automatic Repair" or "Recovery" screen, select "See advanced repair options" or "Advanced options." From there, choose "Troubleshoot" > "Advanced options." This menu will be your starting point for most of the following steps.

### 2. Try Startup Repair

Startup Repair is an automated troubleshooting tool that can fix common startup problems, including those related to failed updates.

*   **From Advanced Options:** In the WinRE "Advanced options" menu, select "Startup Repair."
*   **Follow Prompts:** Allow the tool to run. It will attempt to diagnose and fix the boot issues. This process can take some time. If successful, your PC might restart and boot into Windows normally. If it fails, proceed to the next step.

### 3. Uninstall Recent Updates

Sometimes, a specific faulty update is the cause. Removing it can allow your system to boot correctly.

*   **From Advanced Options:** In the WinRE "Advanced options" menu, select "Uninstall Updates."
*   **Choose Update Type:** You'll typically see two options: "Uninstall latest quality update" and "Uninstall latest feature update."
    *   Start by trying to uninstall the "latest quality update" first, as these are more frequent and often the culprits.
    *   If that doesn't work, return to this step and try "Uninstall latest feature update." Feature updates are larger and less frequent, but if one was just installed, it could be the issue.
*   **Confirmation:** Confirm the uninstallation. Your PC will restart, and hopefully, boot into Windows.

### 4. Boot into Safe Mode to Clear Cache & Run System Checks

Safe Mode starts Windows with a minimal set of drivers and services, which can help bypass conflicts that prevent normal boot.

*   **From Advanced Options:** In the WinRE "Advanced options" menu, select "Startup Settings." Then click "Restart."
*   **Choose Safe Mode:** After the restart, you'll see a list of startup options. Press `4` or `F4` for "Enable Safe Mode" or `5` or `F5` for "Enable Safe Mode with Networking." Safe Mode with Networking is generally preferred if you might need internet access.
*   **Once in Safe Mode, perform the following:**

    *   **A. Clear Windows Update Cache:** Corrupted update cache files can cause repeated failures.
        *   Open an elevated Command Prompt (search for "cmd", right-click, "Run as administrator").
        *   Type the following commands, pressing Enter after each:
            ```cmd
            net stop wuauserv
            net stop bits
            net stop dosvc
            ```
        *   Open File Explorer and navigate to `C:\Windows\SoftwareDistribution`. Delete all contents within this folder. If you can't delete everything, skip the problematic files; the important part is to clear as much as possible.
        *   Return to the Command Prompt and restart the services:
            ```cmd
            net start wuauserv
            net start bits
            net start dosvc
            ```

    *   **B. Run DISM and SFC Scans:** These tools check and repair corrupted system files.
        *   In the same elevated Command Prompt, run:
            ```cmd
            DISM /Online /Cleanup-Image /RestoreHealth
            ```
            This command repairs the Windows image. It might take some time and appear to be stuck at 20% or 40% – be patient.
        *   Once DISM completes, run:
            ```cmd
            sfc /scannow
            ```
            This command checks for and repairs corrupted system files. Let it complete 100%.
*   **Restart PC:** Exit Safe Mode by simply restarting your computer. See if it boots normally.

### 5. Perform a System Restore

If you have system restore points enabled, you can revert your system to a previous working state before the problematic update.

*   **From Advanced Options:** In the WinRE "Advanced options" menu, select "System Restore."
*   **Select Restore Point:** Follow the wizard. Choose a restore point created *before* you started experiencing the update loop. If you're unsure, pick the oldest available restore point that makes sense.
*   **Confirm and Finish:** Confirm your choice and let the process complete. Your computer will restart and attempt to restore. This does not affect your personal files, but programs installed after the restore point will be uninstalled.

### 6. Reset This PC (Last Resort)

If all else fails, resetting your PC can resolve deep-seated system issues. You have two options: keeping your files or removing everything.

*   **From Advanced Options:** In the WinRE "Advanced options" menu, select "Reset this PC."
*   **Choose Option:**
    *   **"Keep my files":** This reinstalls Windows but preserves your personal files. You will need to reinstall all your applications.
    *   **"Remove everything":** This is a clean installation of Windows, wiping all your personal files, apps, and settings. This is the most drastic step but often resolves persistent issues. Ensure you have backed up any critical data before choosing this.
*   **Follow Prompts:** Windows will guide you through the reset process. This can take a significant amount of time.

### Common Mistakes

When faced with the "Undoing changes" loop, it's easy to fall into common pitfalls that can sometimes worsen the situation or waste time. One frequent mistake is repeatedly force shutting down the computer without allowing the "Undoing changes" process to complete its cycle at least once or twice. While forcing a shutdown is necessary to get into WinRE, doing it indiscriminately while the system is actively trying to undo changes can further corrupt the operating system. Another common error is immediately jumping to drastic measures like "Reset this PC" without first trying simpler, less intrusive steps like Startup Repair, uninstalling updates, or running SFC/DISM scans. These initial steps are often sufficient and can save you the hassle of reinstalling applications or restoring data. Finally, neglecting to ensure stable power during troubleshooting (especially for laptops running on low battery) can lead to further interruptions and complications.

### Prevention Tips

Preventing the "We couldn't complete the updates. Undoing changes." loop involves proactive maintenance and mindful update practices.

*   **Maintain Sufficient Disk Space:** Always ensure your primary drive (C: drive) has at least 20-30 GB of free space. Windows needs this room for update downloads, temporary files, and system operations.
*   **Regular Backups:** Regularly back up your important personal files to an external drive or cloud storage. This is crucial for peace of mind, especially before major Windows feature updates or if you ever need to use the "Reset this PC" option. Consider creating a system image backup as well.
*   **Update Drivers:** Keep your device drivers, especially for critical components like graphics cards, network adapters, and chipsets, updated to the latest versions directly from the manufacturer's website. Outdated or incompatible drivers are a frequent cause of update failures.
*   **Run System File Checks Periodically:** Proactively running `sfc /scannow` and `DISM /Online /Cleanup-Image /RestoreHealth` from an elevated Command Prompt every few months can help catch and repair minor system file corruptions before they escalate.
*   **Disable Third-Party Antivirus (Temporarily):** During significant Windows feature updates, temporarily disabling your third-party antivirus software can prevent conflicts that block the update process. Remember to re-enable it immediately after the update is complete.
*   **Ensure Stable Power:** For desktop PCs, consider a UPS (Uninterruptible Power Supply). For laptops, ensure they are plugged into power and have a full battery charge before starting any significant update. Power interruptions during updates are a common cause of corruption.