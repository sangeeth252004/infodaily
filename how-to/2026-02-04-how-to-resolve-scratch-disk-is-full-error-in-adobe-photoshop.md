---
title: "How to Resolve 'Scratch Disk is Full' Error in Adobe Photoshop"
date: "2026-02-04T20:34:04.993Z"
slug: "how-to-resolve-scratch-disk-is-full-error-in-adobe-photoshop"
type: "how-to"
description: "Learn how to effectively fix the frustrating \"Scratch Disk is Full\" error in Adobe Photoshop with this detailed, step-by-step technical guide."
keywords: "Photoshop scratch disk full, Photoshop error, scratch disk full fix, Photoshop performance, optimize Photoshop, clear Photoshop scratch disk"
---

## Problem Explanation

You're in the middle of a critical editing session in Adobe Photoshop, perhaps working on a complex composite image or a high-resolution photo, and suddenly, the program grinds to a halt. The most common and disruptive symptom is a dialog box appearing with the message: "**Scratch Disk is Full**." This error prevents you from performing many fundamental operations within Photoshop, such as undoing actions, saving your work, or even applying simple filters. Essentially, Photoshop is telling you that it has run out of temporary storage space needed to perform its intricate calculations and manage your document's history.

This error is not just an inconvenience; it can be a significant roadblock, potentially leading to lost work and frustration. When this dialog box appears, you'll often find that many of Photoshop's tools and menu options become grayed out or unresponsive. The application might become sluggish, or worse, it might crash entirely, forcing you to restart and potentially lose unsaved progress. Understanding the nature of this error is the first step towards a swift and effective resolution.

## Why It Happens

Adobe Photoshop uses your computer's hard drive (or multiple drives) as "scratch disks" – temporary storage areas for its operations. When you perform actions like opening large files, applying complex filters, using the History panel extensively, or working with numerous layers, Photoshop needs to store intermediate data. This data is written to the scratch disk. The "Scratch Disk is Full" error occurs when this designated temporary storage space becomes completely occupied and there's no more room for Photoshop to write the necessary data.

Several factors contribute to this phenomenon. Firstly, the primary reason is insufficient free space on the drive designated as the Photoshop scratch disk. This could be due to a generally full hard drive, or more specifically, a lack of free space on the drive(s) you've configured in Photoshop's preferences. Secondly, working with very large files (e.g., high-resolution images, complex 3D renders, or very long video timelines) naturally requires more scratch disk space. The History panel, while incredibly useful, can also consume significant space as each step is recorded. Finally, if Photoshop is configured to use a drive that is already heavily utilized by other applications or the operating system, it can quickly run out of room.

## Step-by-Step Solution

Resolving the "Scratch Disk is Full" error involves freeing up space on your designated scratch disks and, in some cases, reconfiguring Photoshop to use more or different storage.

### ## Step 1: Close Unnecessary Applications and Documents

Before diving into more complex solutions, the simplest approach is to reduce the immediate demand on your system's resources. Close any other applications that you are not actively using, especially those that are memory-intensive or disk-intensive (e.g., video editors, web browsers with many tabs open, other Adobe Creative Suite applications). Additionally, close any Photoshop documents that you are not currently working on. Even if they are saved, simply having them open consumes RAM and can indirectly impact scratch disk usage.

### ## Step 2: Clear Photoshop's History Panel

The History panel in Photoshop records every action you take. While invaluable for undoing mistakes, each step recorded consumes scratch disk space. If you've performed a very long and complex series of edits, the History panel can become quite large.

1.  Open your Photoshop document.
2.  Locate the **History** panel (Window > History).
3.  At the top of the History panel, you'll see the original state of your document. You can choose to clear the history up to a certain point by clicking on an earlier state and then clicking the **Trash Can** icon at the bottom of the History panel. **Caution:** This action is irreversible and will delete all subsequent history states. For immediate relief, you can select the earliest recorded state (usually the initial open state) and click the trash can icon. This will clear all subsequent history, freeing up significant scratch disk space.

### ## Step 3: Reduce History States (Preferably Before the Error Occurs)

While clearing the History panel is a reactive measure, it's also good practice to manage the number of history states Photoshop keeps. This is best done proactively in Photoshop's Preferences.

1.  Go to **Edit > Preferences > Performance** (or **Photoshop > Preferences > Performance** on macOS).
2.  In the "History & Cache" section, you'll find a dropdown for **"History States."**
3.  By default, this is often set to 50. While higher numbers offer more flexibility for undoing, they also consume more scratch disk space. Consider reducing this value to something like 20 or 30 if you are frequently encountering scratch disk issues. **Note:** Lowering this setting means you'll have fewer "undo" steps available in the future.

### ## Step 4: Free Up Space on Your Hard Drive(s)

This is the most direct and often most effective solution. If your primary or secondary hard drives are full, Photoshop will have nowhere to write its temporary files.

1.  **Identify your scratch disk location:** In Photoshop, go to **Edit > Preferences > Scratch Disks** (or **Photoshop > Preferences > Scratch Disks** on macOS). Note which drives are listed.
2.  **Check free space:** On your operating system, check the free space on each of these drives.
    *   **Windows:** Open File Explorer, right-click on the drive (e.g., C:, D:), and select "Properties."
    *   **macOS:** Open Finder, select the drive, and press **Command + I** (Get Info).
3.  **Delete unnecessary files:** Go through your files and delete any large, unnecessary items. This could include old downloads, temporary files, large video files you no longer need, or unused applications.
4.  **Empty the Recycle Bin/Trash:** After deleting files, remember to empty your Recycle Bin (Windows) or Trash (macOS) to reclaim the space.

### ## Step 5: Reconfigure Photoshop's Scratch Disks

Photoshop allows you to designate multiple drives as scratch disks. This is highly recommended for performance and to prevent the "Scratch Disk is Full" error. The ideal scenario is to use your fastest drives (e.g., SSDs) that are *not* your operating system drive.

1.  Go to **Edit > Preferences > Scratch Disks** (or **Photoshop > Preferences > Scratch Disks** on macOS).
2.  You will see a list of available drives. By default, your primary system drive (often C: on Windows) is usually selected.
3.  **Prioritize fast, empty drives:** Ensure that your fastest available drives (SSDs are best) that have the most free space are selected. You can select up to four drives.
4.  **Order the drives:** Photoshop uses the drives in the order they are listed. Place your fastest, largest-capacity drives at the top of the list.
5.  **Add or remove drives:** Click the checkboxes to select or deselect drives. You can also reorder them using the up/down arrows.
6.  **Apply Changes:** Click **OK**. You will be prompted to restart Photoshop for these changes to take effect.

### ## Step 6: Purge Unused Memory and Cache

Photoshop also uses RAM for its operations. While not directly a "scratch disk" issue, insufficient RAM can force Photoshop to rely more heavily on scratch disks, exacerbating the problem.

1.  Go to **Edit > Purge > All** (or **Photoshop > Purge > All** on macOS).
2.  This action clears Photoshop's undo history, clipboard, and cache. **Be aware:** Purging "All" will clear your entire History panel, so only do this if you are sure you don't need to undo further actions. You can also choose to purge specific items like "Undo," "Clipboard," "History," "Frame Cache," or "All" from the "Purge" submenu.

### ## Step 7: Check for Corrupted Preferences or Plugins

In rare cases, corrupted Photoshop preferences or third-party plugins can cause unusual behavior that leads to excessive scratch disk usage.

1.  **Reset Preferences:** To reset your preferences to their default state, close Photoshop. Then, press and hold **Ctrl + Alt + Shift** (Windows) or **Command + Option + Shift** (macOS) immediately after clicking the Photoshop icon to launch the application. You will be asked if you want to delete the Photoshop Settings file. Click "Yes."
2.  **Disable Plugins:** If resetting preferences doesn't help, try disabling third-party plugins. You can often do this by moving the plugin files from their installation directories to a temporary folder outside of Photoshop's plugins folder. Then, restart Photoshop to see if the issue is resolved. If it is, re-enable plugins one by one to identify the culprit.

## Common Mistakes

One of the most common mistakes users make is only focusing on freeing up space on their primary C: drive. Photoshop's scratch disk settings allow for multiple drive configurations, and often, other drives have more available space or are faster. Another frequent oversight is forgetting to restart Photoshop after changing scratch disk preferences; these changes don't take effect until the application is relaunched. Additionally, users sometimes attempt to purge "All" from the Purge menu without realizing this clears the entire History panel, losing all undo capabilities for the current session. Finally, users might incorrectly assume the error is related to insufficient RAM only, overlooking the critical role of dedicated scratch disk space.

## Prevention Tips

To prevent the "Scratch Disk is Full" error from recurring, adopt a proactive approach to disk management and Photoshop's settings. Regularly monitor the free space on your hard drives, especially those designated as scratch disks. Aim to keep at least 10-15% of your drive's total capacity free. Consider dedicating a separate, fast SSD solely for Photoshop's scratch disks. This drive should ideally be separate from your operating system drive. Also, be mindful of the number of history states you are keeping in Photoshop's Preferences, adjusting it based on your typical workflow and available disk space. Regularly closing unused applications and documents also helps maintain system performance and reduces the strain on your scratch disks. For very demanding workflows, investing in a larger or additional SSD specifically for scratch disk purposes is a wise long-term solution.