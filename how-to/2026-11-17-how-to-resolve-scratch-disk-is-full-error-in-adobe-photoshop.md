---
title: "How to Resolve 'Scratch Disk is Full' Error in Adobe Photoshop"
date: "2026-11-17T18:56:54.937Z"
slug: "how-to-resolve-scratch-disk-is-full-error-in-adobe-photoshop"
type: "how-to"
description: "Solve the persistent 'Scratch Disk is Full' error in Adobe Photoshop with this comprehensive, step-by-step guide. Learn why it happens and how to prevent it."
keywords: "Photoshop scratch disk full, Photoshop error, scratch disk full, full scratch disk, Photoshop disk space, clear Photoshop cache, Photoshop performance"
---

## Problem Explanation

You're in the middle of a crucial design, a complex photo edit, or a demanding video project within Adobe Photoshop, and suddenly, everything grinds to a halt. A jarring alert box appears, proclaiming: "Scratch Disk is Full." This error message is one of the most frustrating obstacles a Photoshop user can encounter. It effectively paralyzes your workflow, preventing you from performing almost any operation that requires temporary file storage, which, as it turns out, is most operations in Photoshop. You'll find yourself unable to open new files, save existing ones, apply filters, or even undo your last action.

When this error strikes, Photoshop essentially stops responding. You might see the spinning beach ball (on macOS) or the hourglass cursor (on Windows) indefinitely. If you're lucky, you might be able to force quit the application, but attempting to reopen Photoshop or your project will likely result in the same "Scratch Disk is Full" message, leaving you in a loop of frustration. This issue is particularly common when working with large, high-resolution files, complex layered documents, or when performing memory-intensive tasks.

## Why It Happens

Adobe Photoshop uses your computer's hard drive (or multiple drives) as "scratch disks" when your system's RAM (Random Access Memory) is insufficient to hold all the temporary data needed for your current project. Think of scratch disks as an overflow area for your RAM. When you open a large image, apply multiple adjustment layers, use sophisticated filters, or perform actions like transforming large selections, Photoshop creates temporary files to store this data. If your RAM gets full, Photoshop will start writing this temporary data to your designated scratch disk(s).

The "Scratch Disk is Full" error occurs when the drive(s) designated as scratch disks run out of available free space. This can happen for several reasons. Firstly, you might simply not have enough free space on the drive chosen for scratch disk usage. This is especially common if you've designated a smaller, secondary drive or even your primary system drive (which is often not ideal) as your scratch disk. Secondly, Photoshop's temporary files can accumulate over time, especially if you haven't been closing the application cleanly or if you frequently work on very large files without clearing these temporary caches. Finally, other applications on your computer might be consuming significant disk space, leaving insufficient room for Photoshop's demanding needs.

## Step-by-Step Solution

### ## Step 1: Check Photoshop's Scratch Disk Preferences

The first and most crucial step is to understand how Photoshop is configured to use your drives.

1.  Open **Adobe Photoshop**.
2.  On **macOS**, go to **Photoshop > Preferences > Scratch Disks...**.
3.  On **Windows**, go to **Edit > Preferences > Scratch Disks...**.
4.  In the Scratch Disk preferences window, you'll see a list of available drives on your system. Photoshop will show which drive(s) are currently being used for scratch disk purposes (marked with a checkmark).
5.  Observe the "Free" space listed for each drive. This will give you an immediate indication of which drives are low on space. Ideally, your primary scratch disk should have a significant amount of free space (tens or even hundreds of gigabytes, depending on your workflow).

### ## Step 2: Free Up Space on Your Primary Scratch Disk

If your primary scratch disk (or any drive designated for scratch disk use) is low on space, you need to clear it.

1.  **Identify the drive:** Based on the Photoshop Scratch Disk preferences, determine which drive needs attention.
2.  **Delete unnecessary files:** Navigate to that drive using your operating system's file explorer (Finder on macOS, File Explorer on Windows).
3.  **Look for large files or folders:** Sort by size to find the biggest space hogs. This could include old project files, downloaded installers, large video clips, or redundant backups.
4.  **Empty your Recycle Bin/Trash:** Remember that files deleted go to the Recycle Bin or Trash. You must empty these to reclaim the disk space.

### ## Step 3: Add More Scratch Disks (If Available)

Photoshop can utilize multiple drives for scratch disk purposes, which is highly recommended for performance and stability.

1.  Go back to **Photoshop > Preferences > Scratch Disks...** (or **Edit > Preferences > Scratch Disks...** on Windows).
2.  Look for other drives on your system that have ample free space and are not your operating system drive.
3.  **Check the boxes** next to these available drives to add them to the scratch disk list.
4.  **Order matters:** The order in which the drives are listed dictates the priority Photoshop uses. Place the fastest drive with the most free space at the top of the list. This is often an SSD (Solid State Drive). If you have multiple SSDs, choose the one with the most available space.
5.  Click **OK** to save your changes. You will likely need to **restart Photoshop** for these changes to take full effect.

### ## Step 4: Clear Photoshop's Cache and Temporary Files

Photoshop can sometimes hold onto a lot of temporary data that isn't automatically cleared.

1.  While Photoshop is open, go to **Edit > Purge**.
2.  You will see options to purge: **Undo**, **Clipboard**, **Histories**, **Video Cache**, and **All**.
3.  **Start with "Undo," "Clipboard," and "Histories."** These are usually safe to purge and can free up significant space. **Note:** Purging "Undo" will remove your ability to undo actions, and purging "Histories" will remove your history states. If you are actively working on a complex project and want to preserve your undo history, do not purge these unless absolutely necessary.
4.  If the problem persists or you need more space, you can select **"All"**. This will purge everything, including your undo history and clipboard contents. **Be absolutely sure you want to do this before proceeding.**
5.  After purging, you may need to restart Photoshop.

### ## Step 5: Optimize Your Photoshop Performance Settings

Beyond scratch disks, other performance settings can indirectly affect disk usage.

1.  Go to **Photoshop > Preferences > Performance...** (or **Edit > Preferences > Performance...** on Windows).
2.  **RAM Usage:** You'll see a slider for "RAM Reserved for Photoshop." Increase this value if you have plenty of RAM available (e.g., 16GB or more). However, don't set it too high, as your operating system and other applications also need RAM. A good starting point is to leave around 20-30% of your RAM free for the OS.
3.  **History States & Cache:** Ensure "History States" and "Cache Levels" are set to reasonable numbers. Very high values can consume more RAM and contribute to scratch disk usage. Experiment with values like 50-100 for History States and 4-6 for Cache Levels.
4.  **Cache Tile Size:** For larger images, a larger cache tile size can improve performance, but it also uses more scratch disk space. You may need to balance this based on your system and image size.
5.  Click **OK** to save your changes. Restart Photoshop.

### ## Step 6: Manage Your Temporary Photoshop Files (Advanced)

In rare cases, Photoshop's temporary files might get stuck and not be properly cleared even after purging.

1.  **Close Photoshop completely.** Ensure no Photoshop processes are running in the background.
2.  Navigate to the default temporary file location for Photoshop. This location is often set by your operating system.
    *   **On Windows:** Typically found within `C:\Users\[Your Username]\AppData\Local\Temp` or `C:\ProgramData\Adobe\Photoshop\[Version]\Adobe Photoshop Temp`.
    *   **On macOS:** Typically found within `/private/var/folders/`. This directory is hidden by default and contains many subfolders.
3.  **Look for folders named like `Photoshop Temp` or similar.** Be extremely cautious here. **Do NOT delete any files or folders unless you are absolutely certain they are Photoshop temporary files and that Photoshop is closed.** If you're unsure, it's safer to skip this step or consult a more advanced guide on identifying OS temporary files.
4.  If you find identifiable Photoshop temporary files or folders and are confident they are safe to delete, **delete them.**
5.  **Restart your computer** and then relaunch Photoshop.

## Common Mistakes

A common pitfall is trying to free up space on the wrong drive. Users might delete files from their system drive (C: on Windows, Macintosh HD on macOS) without realizing that drive is also being used as a scratch disk, or they might focus on secondary drives that aren't designated for scratch disk use at all. Another mistake is not restarting Photoshop after making changes to scratch disk preferences or after purging cache. These changes often require a full application restart to be properly implemented. Lastly, users sometimes get into a cycle of purging undo history when they are actively working, which can lead to accidental data loss if they need to revert a step. Always assess your immediate need to undo versus the need to free up space.

## Prevention Tips

The best way to avoid the "Scratch Disk is Full" error is through proactive management. Ensure your primary scratch disk has a minimum of 50-100GB of free space, and ideally more, especially if you work with very large files. Utilize multiple fast drives (SSD is highly recommended) as scratch disks, placing your fastest drive with the most free space at the top of the priority list in Photoshop's preferences. Regularly clear your computer's general temporary files and your browser's cache. Before starting a demanding session, close unnecessary applications to free up RAM and system resources. Develop a habit of purging Photoshop's undo and history cache when you've completed a significant stage of your work and are unlikely to need to backtrack extensively. Performing routine maintenance on your hard drives, such as disk cleanup or defragmentation (on HDDs), can also contribute to better overall performance and stability.