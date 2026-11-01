---
title: "How to Resolve \"Scratch Disks are Full\" Error in Adobe Photoshop"
date: "2026-11-01T04:28:41.178Z"
slug: "how-to-resolve-scratch-disks-are-full-error-in-adobe-photoshop"
type: "how-to"
description: "Learn how to fix the persistent \"Scratch Disks are Full\" error in Adobe Photoshop with this comprehensive, step-by-step guide. Free up space and get back to creating."
keywords: "Photoshop scratch disk full, fix Photoshop error, clear Photoshop scratch disk, Photoshop disk space, Photoshop performance, Photoshop troubleshooting"
---

## Problem Explanation

You're in the middle of a creative session in Adobe Photoshop, perhaps working on a complex image with many layers or using intensive filters. Suddenly, your workflow grinds to a halt. A dreaded dialog box appears on your screen, boldly stating: **"Scratch Disks are Full."** This error message is Photoshop's way of telling you that it has run out of temporary storage space to perform its operations. Without adequate scratch disk space, Photoshop simply cannot continue processing your commands, leading to an inability to save your work, use certain tools, or even close the application gracefully. This can be incredibly frustrating, especially when you're on a deadline or deep into a project.

The "Scratch Disks are Full" error typically manifests as a pop-up window from Photoshop itself. It might offer a direct link to manage scratch disks, or it might simply halt all further actions until the issue is resolved. You might also notice significant performance degradation leading up to this error, with commands taking longer to execute or the application becoming unresponsive. Understanding this error is the first step toward efficiently resolving it and preventing it from disrupting your creative flow again.

## Why It Happens

At its core, the "Scratch Disks are Full" error occurs because Photoshop uses your computer's hard drive (or multiple drives) as temporary overflow storage. When you perform actions like opening large files, applying complex filters, using the History panel extensively, or working with many layers, Photoshop generates a lot of temporary data. If your computer's RAM (Random Access Memory) isn't sufficient to hold all this data, Photoshop writes it to designated "scratch disks." These scratch disks are essentially temporary workspace areas on your hard drives.

The problem arises when these designated scratch disk locations become filled up with this temporary Photoshop data, or when the drive they reside on is already low on general free space. Photoshop needs this space to process commands, undo operations, and manage various elements of your project. When it can't find enough space, it throws the "Scratch Disks are Full" error because it can no longer function as intended. Factors like extremely large or complex files, insufficient RAM, or simply having too many applications running simultaneously that also consume disk space can exacerbate this issue.

## Step-by-Step Solution

Here’s how to tackle the "Scratch Disks are Full" error and get back to your work:

### ## Step 1: Close Unnecessary Applications and Documents

Before diving into Photoshop's specific settings, it's crucial to free up general system resources. Other running applications and open documents on your computer can consume significant amounts of disk space.

1.  **Identify resource-heavy applications:** Look for applications that you aren't actively using but are still running. This could include web browsers with many tabs open, cloud storage sync clients, or other demanding software.
2.  **Close unnecessary applications:** Systematically close any applications you don't need for your current Photoshop task.
3.  **Close unused Photoshop documents:** If you have multiple Photoshop documents open, close any that are not essential to your current work. This reduces Photoshop's immediate memory and disk footprint.

### ## Step 2: Clear Photoshop's Preferences File (If Necessary)

Sometimes, Photoshop's preference file can become corrupted, leading to unexpected behavior, including scratch disk issues. Clearing this file forces Photoshop to create a new, default preferences file.

1.  **Quit Photoshop completely.**
2.  **Locate the Preferences folder:**
    *   **Windows:** Press `Ctrl + Alt + Shift` immediately after launching Photoshop. Keep holding these keys until the "Preferences File Override" dialog box appears. Click **Yes**.
    *   **macOS:** Press `Command + Option + Shift` immediately after launching Photoshop. Keep holding these keys until the "Preferences File Override" dialog box appears. Click **Yes**.
3.  **Restart Photoshop:** After Photoshop restarts, it will generate a new preferences file.

### ## Step 3: Reconfigure Photoshop's Scratch Disks

This is the most direct way to address the "Scratch Disks are Full" error. You'll tell Photoshop which drives to use for temporary storage and in what order.

1.  **Open Photoshop.**
2.  **Access Scratch Disk Preferences:**
    *   **Windows:** Go to `Edit > Preferences > Scratch Disks...`
    *   **macOS:** Go to `Photoshop > Preferences > Scratch Disks...`
3.  **Review Existing Scratch Disks:** You'll see a list of available drives on your computer. Photoshop prioritizes drives listed first. Look for any drives that are nearly full or have very little free space.
4.  **Add or Remove Scratch Disks:**
    *   **Add:** If you have other drives with significant free space, click on the empty checkboxes to enable them as scratch disks.
    *   **Remove:** You can uncheck drives that are consistently problematic or have very little space.
    *   **Reorder:** Use the up and down arrows to prioritize your fastest drive (e.g., an SSD) as your primary scratch disk. **It is highly recommended to use an SSD for scratch disks for optimal performance.**
5.  **Ensure Sufficient Free Space:** Make sure the drive(s) you select as scratch disks have plenty of free space. A good rule of thumb is to have at least 100GB of free space on your primary scratch disk, and more for very large projects.
6.  **Click OK.** You will be prompted to restart Photoshop for the changes to take effect.

### ## Step 4: Free Up Space on Your Hard Drives

Even if you configure Photoshop's scratch disks correctly, the underlying hard drive needs to have sufficient free space.

1.  **Identify full drives:** Use your operating system's file explorer to check the free space on all your hard drives, especially those designated as scratch disks.
2.  **Delete unnecessary files:**
    *   **Temporary files:** Windows has a built-in Disk Cleanup tool (`cleanmgr.exe`). On macOS, you can look for large, unused files in your Downloads folder or elsewhere.
    *   **Old downloads:** Clear out your Downloads folder.
    *   **Large media files:** Move or delete old videos, photos, or music files that you no longer need on your primary drives.
    *   **Unused applications:** Uninstall programs you no longer use.
3.  **Empty Recycle Bin/Trash:** Ensure you have permanently deleted files by emptying your Recycle Bin (Windows) or Trash (macOS).

### ## Step 5: Optimize Your Photoshop Preferences for Performance

Beyond scratch disks, other Photoshop settings can impact performance and temporary file usage.

1.  **Open Photoshop Preferences** (as described in Step 3).
2.  **Go to the "Performance" tab.**
3.  **History & Cache:**
    *   **History States:** Reduce the number of History States if you don't need dozens of undo steps. A lower number consumes less memory and disk space for the History panel.
    *   **Cache Levels:** Increasing Cache Levels can speed up viewing large images but uses more RAM and scratch disk space. For scratch disk issues, a moderate level is often best.
4.  **Memory Usage:** Ensure Photoshop is allocated a healthy percentage of your RAM. A common recommendation is to leave around 20-25% of your RAM for other system processes. If this value is too high, other applications and the OS might struggle, and Photoshop might rely too heavily on scratch disks.
5.  **Click OK.**

### ## Step 6: Consider RAM Upgrade

While not a direct fix, insufficient RAM is a primary driver for Photoshop needing to use its scratch disks excessively. If you consistently face scratch disk issues despite optimizing your settings, your computer might simply not have enough RAM for your typical workload.

1.  **Check your current RAM:** Go to your system information (System Properties in Windows, "About This Mac" in macOS) to see how much RAM you have installed.
2.  **Research your computer's RAM capacity:** Determine the maximum RAM your computer can support.
3.  **Consider upgrading:** If your RAM is low (e.g., 8GB or less for professional photo editing), upgrading to 16GB, 32GB, or even more can significantly reduce reliance on scratch disks.

## Common Mistakes

One common pitfall is simply trying to delete random files from the Photoshop scratch disk folder. **Do not do this.** Photoshop manages its scratch files automatically. Manually deleting them can lead to application instability or data corruption. Another mistake is allocating all available RAM to Photoshop in the Performance preferences. While it seems like it would help, leaving insufficient RAM for your operating system and other background processes can actually *worsen* performance and lead to more system-wide issues, including scratch disk problems. Users also sometimes forget to restart Photoshop after making scratch disk changes, meaning the adjustments don't take effect. Finally, focusing solely on Photoshop's settings without considering the overall free space on the hard drive itself is a frequent oversight.

## Prevention Tips

To prevent the "Scratch Disks are Full" error from happening again, adopt these practices:

*   **Regularly maintain free space:** Make it a habit to check your hard drive's free space regularly, especially on drives designated as scratch disks. Aim to keep at least 20-25% of your drive space free.
*   **Optimize your workflow:** Close unnecessary applications and documents before starting intensive Photoshop work. Save your work frequently, using "Save As" for major revisions to avoid bloating a single file with countless history states.
*   **Use fast storage for scratch disks:** Ideally, configure your fastest SSD (Solid State Drive) as your primary scratch disk. This significantly speeds up temporary file operations. If you have multiple SSDs, use them all as scratch disks.
*   **Allocate RAM wisely:** Ensure Photoshop has enough RAM, but don't starve your operating system. Regularly review the Memory Usage slider in Photoshop's Performance preferences.
*   **Consider a RAM upgrade:** If you frequently work with large files, many layers, or complex edits, investing in more RAM can drastically reduce your reliance on scratch disks.
*   **Clean up temporary files:** Periodically use your operating system's disk cleanup tools to remove temporary files that accumulate over time.