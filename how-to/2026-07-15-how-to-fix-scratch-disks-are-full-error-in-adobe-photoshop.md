---
title: "How to Fix 'Scratch Disks are Full' Error in Adobe Photoshop"
date: "2026-07-15T02:19:15.723Z"
slug: "how-to-fix-scratch-disks-are-full-error-in-adobe-photoshop"
type: "how-to"
description: "Resolve the frustrating 'Scratch Disks are Full' error in Adobe Photoshop with this practical, step-by-step guide. Learn the causes, solutions, and prevention tips."
keywords: "Photoshop scratch disk full, Photoshop error, free up scratch disk, Photoshop performance, clear Photoshop cache, Photoshop full disk error, Photoshop troubleshooting"
---

When working with Adobe Photoshop, especially on complex projects involving large files, multiple layers, or extensive edits, you might encounter a critical error message: "Scratch Disks are Full." This message is not only disruptive but can also halt your workflow entirely, preventing you from saving or even continuing to edit your work. The error typically appears as a dialog box with a prominent warning, often stating something like, "Could not complete your request because the scratch disks are full." This signifies that Photoshop has run out of temporary storage space it needs to process and store information during your editing sessions.

This error directly impacts Photoshop's ability to function. When you perform actions in Photoshop, such as applying filters, undoing changes, or even opening large files, the program utilizes your computer's hard drive as "scratch space" to temporarily store data. This is crucial because RAM (Random Access Memory) has a finite capacity. When RAM is exhausted, Photoshop offloads excess data to the designated scratch disk(s). If the selected scratch disk(s) run out of free space, Photoshop can no longer perform these operations, leading to the dreaded "Scratch Disks are Full" error.

## Why It Happens

The primary reason for the "Scratch Disks are Full" error is a lack of available free space on the hard drive(s) designated by Photoshop as scratch disks. This can occur for several reasons. Firstly, your system drive (often where Photoshop is installed and by default, the primary scratch disk) may be nearly full due to a large number of installed applications, system files, or accumulated user data. Secondly, the specific Photoshop projects you are working on might be exceptionally large. High-resolution images, numerous layers, complex effects, and extensive history states all consume significant amounts of temporary storage.

Furthermore, Photoshop itself can contribute to this issue by not efficiently managing its temporary files. Over time, Photoshop might leave behind temporary files that are no longer needed but still occupy space on the scratch disk. If you are working with multiple demanding applications simultaneously, they might also be competing for hard drive space, further exacerbating the problem. Essentially, it's a combination of insufficient physical storage on your designated scratch disk(s) and the demands placed upon that space by Photoshop's operations and your project files.

## Step 1: Free Up Space on Your System Drive

The most direct solution is to clear space on the hard drive acting as your primary scratch disk. This is often your main system drive (usually C: on Windows or Macintosh HD on macOS).

*   **On Windows:**
    *   Open File Explorer.
    *   Right-click on your C: drive and select "Properties."
    *   Click the "Disk Cleanup" button.
    *   Select the file types you want to remove (e.g., Temporary Internet Files, Downloads, Recycle Bin, Temporary files).
    *   Click "OK" and then "Delete Files."
    *   Consider running Disk Cleanup as an administrator for more options.
*   **On macOS:**
    *   Click the Apple menu > "About This Mac" > "Storage" > "Manage."
    *   Use the recommendations to store in iCloud, optimize storage, or reduce clutter.
    *   Manually delete large, unneeded files from your Downloads folder, Desktop, or Documents. Empty the Trash.

## Step 2: Clear Photoshop's Cache and Temporary Files

Photoshop accumulates temporary files and cache data that can take up significant space.

*   **Clear Recent Files List:**
    *   Go to `Edit > Preferences > File Handling` (Windows) or `Photoshop > Preferences > File Handling` (macOS).
    *   Under "Recent Files List," set the number to a lower value, or click "Purge" to clear the current list.
*   **Purge Memory & Image Cache:**
    *   Go to `Edit > Purge` (Windows) or `Photoshop > Purge` (macOS).
    *   You'll see options to purge "Undo," "Clipboard," "Histories," "All," etc.
    *   **Crucially, select "All" if prompted and then confirm.** This will delete all undo states, clipboard content, and history states for all open documents. **Note:** This action cannot be undone.
    *   You can also selectively purge individual items if you're concerned about losing recent undo steps for a specific document, but purging "All" is most effective for freeing scratch disk space.

## Step 3: Reassign Photoshop Scratch Disks

If you have multiple hard drives, you can dedicate a drive with more free space specifically for Photoshop's scratch disk. This is highly recommended for performance.

*   Go to `Edit > Preferences > Scratch Disks` (Windows) or `Photoshop > Preferences > Scratch Disks` (macOS).
*   You will see a list of available drives. Your system drive will likely be listed first.
*   **Crucially, ensure that your primary scratch disk (often C:) has ample free space if it's the only one checked.**
*   If you have other drives with more free space (e.g., a secondary SSD or HDD), check those boxes.
*   **Order matters:** Place the drive with the most free space and the fastest speed (SSD is best) at the top of the list. You can drag and drop them to reorder.
*   Click "OK."
*   **Restart Photoshop** for the changes to take effect.

## Step 4: Reduce Image Cache Size (If Applicable to Other Adobe Apps)

While Photoshop's primary "scratch disk" is for active operations, the "Image Cache" setting in Lightroom (if you use it in conjunction with Photoshop) can sometimes indirectly influence performance and disk usage. This is less common for the direct "Scratch Disks are Full" error but worth checking if you use both.

*   In Lightroom, go to `Edit > Preferences` (Windows) or `Lightroom Classic > Preferences` (macOS) > "Performance" tab.
*   Ensure "Use Graphics Processor" is enabled if your system supports it.
*   Check the "Camera Raw Cache Settings." A very large cache size can consume disk space. Consider reducing it or clicking "Purge Cache" if it's excessively large.

## Step 5: Close Unnecessary Applications and Files

Other running applications, especially those that also use significant resources like video editors, web browsers with many tabs open, or virtual machines, can consume RAM and disk space.

*   Close any applications that are not essential for your current Photoshop task.
*   Within Photoshop, close any documents or tabs that you are not actively working on. This frees up RAM and reduces the amount of data Photoshop needs to manage.

## Step 6: Optimize Your Photoshop Preferences for Performance

Beyond scratch disks, several other preferences can impact performance and how much temporary data is generated.

*   Go to `Edit > Preferences > Performance` (Windows) or `Photoshop > Preferences > Performance` (macOS).
*   **Memory Usage:** Increase the "RAM Reserved for Other Applications" value slightly if you have ample RAM (e.g., 32GB or more) and are not running many other heavy applications. Conversely, if you have limited RAM, you might need to lower this to give Photoshop more. Aim for around 70-80% of your total RAM for Photoshop if you have plenty.
*   **History States:** The "History States" setting under `Edit > Preferences > Performance` determines how many previous steps Photoshop remembers. A higher number means more undo capability but also more scratch disk usage. Reduce this number if you are consistently running into space issues. Default is usually around 50, which is often sufficient.
*   **Scratch Disk Order:** As mentioned in Step 3, ensure your fastest, largest drive is prioritized.

## Step 7: Restart Your Computer

A simple restart can often resolve temporary glitches and clear out any lingering processes or temporary files that might be hogging resources. After restarting, check your free disk space again and then launch Photoshop.

## Common Mistakes

A common mistake is to only focus on freeing up space on the main system drive without considering other available drives. If you have a dedicated, fast SSD with ample space, making it the primary scratch disk is often the most impactful change. Another pitfall is not restarting Photoshop after changing scratch disk settings; these changes are not applied until Photoshop is relaunched. Users also sometimes forget about the "Purge" function under the Edit/Photoshop menu, which is a quick and effective way to clear out temporary data. Finally, people might be reluctant to purge undo states, but in a dire "scratch disks full" situation, this is often a necessary sacrifice to regain functionality.

## Prevention Tips

To prevent the "Scratch Disks are Full" error from becoming a recurring problem, adopt a proactive approach. Regularly monitor the free space on your hard drives, especially your system drive and any drives designated as scratch disks. Develop a habit of clearing out unnecessary files from your computer. Before starting large or complex Photoshop projects, ensure you have at least 50-100GB of free space on your primary scratch disk, ideally more. Consider investing in a fast, large SSD specifically for your scratch disks if you frequently work with demanding files. Keep your Photoshop preferences optimized, especially the memory allocation and history states, based on your system's resources and typical workflow. Regularly clearing Photoshop's cache and temporary files, as outlined in the steps above, can also help maintain smooth operation.