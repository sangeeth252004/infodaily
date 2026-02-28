---
title: "How to Fix 'Scratch Disks are Full' Error in Adobe Photoshop"
date: "2026-02-28T10:22:36.117Z"
slug: "how-to-fix-scratch-disks-are-full-error-in-adobe-photoshop"
type: "how-to"
description: "Learn how to resolve the \"Scratch Disks are Full\" error in Adobe Photoshop with a comprehensive, step-by-step guide. Understand why it happens, clear disk space, change preferences, and prevent future occurrences."
keywords: "Photoshop scratch disk full, fix scratch disk error, Adobe Photoshop error, clear scratch disk, Photoshop storage error, scratch disk preferences, free up disk space Photoshop, Photoshop performance, scratch disk management"
---

### Problem Explanation

Working with Adobe Photoshop, you might suddenly encounter a frustrating error message that stops your creative flow: "Could not complete your request because the scratch disks are full." This message can appear at various critical moments – when opening a new file, saving an existing project, performing complex filters, or even just launching the application. When this happens, Photoshop often becomes unresponsive, freezes, or simply refuses to execute the command you've given it, effectively halting your work.

Visually, this error typically manifests as a modal dialog box displaying the exact "Scratch disks are full" message. Depending on the severity and timing, Photoshop might crash entirely, or simply prevent you from saving your work, potentially leading to lost progress if you haven't saved recently. It’s a clear signal that Photoshop doesn’t have enough temporary storage to perform its operations, trapping you until the issue is resolved.

### Why It Happens

The "Scratch Disks are Full" error arises when Adobe Photoshop runs out of temporary storage space. Photoshop uses what are called "scratch disks" as virtual memory when your computer's RAM (Random Access Memory) isn't enough to handle all the active operations, open documents, and history states. It writes portions of your project files, undo steps, and intermediate results to these designated disk drives.

Essentially, your scratch disk acts as a temporary workspace, taking the load off your RAM. The problem occurs when the hard drive or SSD Photoshop is assigned to use as a scratch disk no longer has sufficient free space. This can happen for several reasons: you might be working with extremely large, high-resolution files with many layers, your history states might be set very high, or the scratch disk drive itself is simply filled with other applications, personal files, or residual temporary files from previous Photoshop sessions that weren't properly cleared. If Photoshop can't find the necessary space to write these temporary files, it throws the "Scratch Disks are Full" error and can't proceed.

### Step-by-Step Solution

Solving the "Scratch Disks are Full" error involves a combination of freeing up space, reconfiguring Photoshop's settings, and optimizing your system. Follow these steps to get back to creating.

#### ## Step 1: Free Up Space on Your Current Scratch Disk

The most immediate solution is to clear space on the drive(s) currently designated as Photoshop's scratch disk. This typically means your primary system drive (C: on Windows, Macintosh HD on macOS) if you haven't changed Photoshop's default settings.

*   **Empty the Recycle Bin/Trash:** Files deleted normally go here first. Permanently delete them to free up space.
*   **Delete Temporary Files:**
    *   **Windows:** Press `Windows Key + R`, type `%temp%` and press Enter. This opens the Temp folder. Select all files and folders (Ctrl+A) and delete them. Skip any files that are currently in use.
    *   **macOS:** Open Finder, go to `Go > Go to Folder...`, type `~/Library/Caches` and press Enter. You can manually browse and delete cached files from various applications, though be cautious. A safer bet might be to use a dedicated disk cleanup utility.
*   **Uninstall Unused Applications:** Go through your installed programs and remove anything you no longer use.
*   **Move Large Files:** Transfer large personal files (videos, old backups, large installers) from your primary drive to an external drive or cloud storage.
*   **Clear Browser Cache:** Web browsers can accumulate a surprising amount of data. Clear their caches to recover some space.

#### ## Step 2: Change Scratch Disk Preferences (If Photoshop Can Launch)

If Photoshop still launches, even with warnings, you can change its scratch disk preferences to a drive with more available space.

1.  **Launch Photoshop.**
2.  Go to `Edit > Preferences > Scratch Disks` (Windows) or `Photoshop > Preferences > Scratch Disks` (macOS).
3.  In the Preferences dialog, you'll see a list of your available drives. Check the boxes next to drives with ample free space. It's best to prioritize a fast SSD if you have one that isn't your primary system drive.
4.  Uncheck any drives that are nearly full or significantly slower (e.g., external HDDs unless absolutely necessary).
5.  You can reorder the scratch disks by dragging them up or down to set their priority. Photoshop uses the topmost available disk first.
6.  Click **OK** and then **restart Photoshop** for the changes to take effect.

#### ## Step 3: Force Photoshop to Launch to Access Preferences (If Photoshop Won't Launch)

If the "Scratch Disks are Full" error prevents Photoshop from even launching, you need to force it to open the Preferences dialog at startup.

*   **Windows:** Hold down `Ctrl + Alt` immediately after double-clicking the Photoshop icon to launch it.
*   **macOS:** Hold down `Cmd + Option` immediately after clicking the Photoshop icon in the Dock or Applications folder.

This action should prompt a "Scratch Disk Preferences" dialog box to appear before Photoshop fully loads. From this dialog, you can select new scratch disk drives as described in Step 2. Choose a drive with plenty of free space, click **OK**, and Photoshop should then proceed to launch normally.

#### ## Step 4: Optimize Photoshop Performance Settings

Beyond scratch disks, other performance settings can impact how much temporary space Photoshop needs.

1.  **Allocate More RAM:**
    *   Go to `Edit > Preferences > Performance` (Windows) or `Photoshop > Preferences > Performance` (macOS).
    *   Under "Memory Usage," adjust the "Let Photoshop Use" slider. Adobe recommends setting it between 70% and 85% of your available RAM. Avoid setting it too high (e.g., 90%+) as this can starve other critical system processes.
2.  **Reduce History States:**
    *   In the same "Performance" preferences, locate "History & Cache."
    *   Lower the "History States" value. A high number of history states (e.g., 50 or 100+) means Photoshop is storing more undo steps, which consumes significant scratch disk space. Reducing it to a more moderate number (e.g., 20-30) can help, though it means fewer undo steps are available.
3.  **Manage Cache Levels:** While in "Performance" preferences, you can also adjust "Cache Levels" and "Cache Tile Size." For most users, "Default" is fine, but if you work with very large pixel dimensions, increasing cache levels can sometimes help performance, potentially impacting scratch disk usage less directly than history states.

#### ## Step 5: Purge Photoshop's Internal Caches

Photoshop maintains its own internal caches for things like undo states and clipboard data. Clearing these can sometimes free up immediate space without restarting.

1.  With Photoshop open, go to `Edit > Purge`.
2.  You'll see options: `Undo`, `History`, `All`, and `Video Cache`.
3.  Selecting `All` will clear all temporary memory used by Photoshop for undo states, history panel, and clipboard. This cannot be undone, so be sure you don't need to revert to previous states of your current document before purging.

#### ## Step 6: Consider a Dedicated Scratch Disk

For serious Photoshop users, especially those working with large files consistently, investing in and dedicating a fast internal SSD (Solid State Drive) solely for Photoshop's scratch disk can dramatically improve performance and prevent "Scratch Disks are Full" errors.

1.  **Install a New SSD:** If you have an available M.2 or SATA slot, install a new, fast SSD.
2.  **Format the Drive:** Ensure the drive is properly formatted and recognized by your operating system.
3.  **Configure in Photoshop:** Follow the steps in "Step 2: Change Scratch Disk Preferences" to select this new, dedicated SSD as your primary scratch disk, ensuring it's at the top of the list. Since it's dedicated, it should have ample free space.

### Common Mistakes

When troubleshooting the "Scratch Disks are Full" error, several common mistakes can hinder your progress or even exacerbate the issue.

One frequent pitfall is only clearing space on your primary system drive without verifying which drive Photoshop is *actually* using as its scratch disk. By default, it's often the system drive, but if you've previously changed settings or have multiple drives, cleaning the wrong drive won't solve the problem. Another mistake is setting Photoshop's RAM allocation too low, forcing it to rely more heavily on the scratch disk, or conversely, setting it too high (e.g., 95% or more) which can starve your operating system and other applications, leading to overall system instability and potentially slowing Photoshop down rather than speeding it up. Lastly, many users overlook the impact of their "History States" count. Keeping an extremely high number of history states (e.g., 1000+) can quickly fill up even large scratch disks, especially with complex, multi-layered documents, yet people often forget to adjust this setting.

### Prevention Tips

Preventing the "Scratch Disks are Full" error is far easier than fixing it mid-project. Proactive management of your system resources and Photoshop settings can keep your workflow smooth.

Regularly monitor the free space on your scratch disk drives, especially those you've designated in Photoshop's preferences. Make it a habit to periodically clear your computer's temporary files and empty the Recycle Bin/Trash, as these can quickly accumulate. It's also a best practice to close unnecessary applications while working in Photoshop to free up RAM. Within Photoshop, consider setting a reasonable number of "History States" (e.g., 20-50) rather than an excessively high value, and consistently allocate 70-85% of your system's RAM to Photoshop in its Performance preferences. For power users, dedicating a fast, internal SSD specifically for Photoshop's scratch disk can significantly enhance performance and virtually eliminate scratch disk full errors, as it ensures there's always ample, high-speed temporary storage available.