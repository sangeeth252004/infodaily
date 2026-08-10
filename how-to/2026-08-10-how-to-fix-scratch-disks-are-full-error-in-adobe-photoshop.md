---
title: "How to Fix \"Scratch Disks are Full\" Error in Adobe Photoshop"
date: "2026-08-10T06:09:40.529Z"
slug: "how-to-fix-scratch-disks-are-full-error-in-adobe-photoshop"
type: "how-to"
description: "Resolve the \"Scratch Disks are Full\" error in Adobe Photoshop with this comprehensive guide. Learn why it happens, clear space, adjust settings, and prevent future occurrences."
keywords: "Photoshop scratch disk full, fix scratch disk error, Adobe Photoshop error, clear scratch disk, Photoshop performance, free up disk space, Photoshop troubleshooting"
---

### Problem Explanation

Adobe Photoshop users frequently encounter a frustrating interruption to their workflow: the "Scratch Disks are Full" error. This critical message typically appears as a modal dialog box stating, "Could not complete your request because the scratch disks are full" or, when attempting to open a file, "Could not open document '[filename.psd]' because the scratch disks are full." The immediate consequence is an inability to perform operations, save your work, or even launch Photoshop with certain files, effectively halting productivity. This isn't just a warning; it's a hard stop that prevents further interaction with your projects until the issue is resolved.

Users experiencing this problem often notice a significant slowdown in Photoshop's performance leading up to the error, or it might appear abruptly when working on large, complex files, applying filters, or attempting to save. The error indicates that Photoshop has run out of its designated temporary storage space, making it impossible to process additional data or complete current tasks. Without sufficient scratch disk capacity, Photoshop cannot function as intended, leaving your work vulnerable and your progress stalled.

### Why It Happens

The "scratch disk" in Photoshop is essentially a portion of your hard drive that Photoshop uses as temporary virtual memory when your computer's RAM (Random Access Memory) is insufficient to handle all the active data. When you work on large images, files with many layers, Smart Objects, high-resolution textures, or perform memory-intensive operations (like applying complex filters, retaining numerous history states, or processing large video layers), Photoshop offloads this data to the scratch disk. It acts as a swap file, allowing Photoshop to manage more data than your physical RAM can hold at any given moment.

The "Scratch Disks are Full" error occurs when the hard drive designated as Photoshop's scratch disk runs out of available storage space. This can happen for several reasons: the selected scratch disk might already be nearly full with other files, Photoshop's temporary files from previous sessions might not have been properly cleared, or your current project simply demands an immense amount of temporary storage that exceeds the available capacity on that drive. While having ample RAM is beneficial, even systems with significant RAM can encounter this issue if Photoshop's scratch disk settings are pointed to a drive with limited free space, especially when dealing with extremely large or complex documents.

### Step-by-Step Solution

Solving the "Scratch Disks are Full" error involves a combination of freeing up space and optimizing Photoshop's resource allocation. Follow these steps methodically to resolve the issue.

#### ## Step 1: Understand and Identify Your Scratch Disks

Before you can fix the problem, you need to know which drive(s) Photoshop is currently using.
1.  **Launch Photoshop:** If Photoshop won't launch due to the error, hold down `Ctrl + Alt` (Windows) or `Command + Option` (macOS) immediately after clicking the Photoshop icon. This should bring up the Scratch Disk Preferences dialog, allowing you to change settings before a document attempts to load.
2.  **Access Preferences:** If Photoshop launches, go to `Edit > Preferences > Scratch Disks` (Windows) or `Photoshop > Preferences > Scratch Disks` (macOS).
3.  **Note Current Settings:** In the preferences window, you will see a list of available drives with checkboxes next to them. The checked drives are currently designated as scratch disks. Note which drive(s) are selected and how much free space is available on them.

#### ## Step 2: Free Up Space on Your Current Scratch Disk(s)

This is often the most direct solution. Identify the drive(s) Photoshop is currently using and clear as much space as possible.
1.  **Empty Recycle Bin/Trash:** This is a quick and effective way to free up space.
2.  **Delete Temporary Files:**
    *   **Windows:** Press `Windows Key + R`, type `%temp%`, and press Enter. This opens your user's temporary files folder. Select all files (`Ctrl + A`) and delete them. Skip any files that are currently in use.
    *   **macOS:** Go to `Finder > Go > Go to Folder...`, type `~/Library/Caches`, and press Enter. You can manually delete folders related to applications that might be storing large temporary files (e.g., com.adobe.Photoshop). Also check `/private/var/folders` for large temporary system files, though this requires more caution.
3.  **Uninstall Unused Applications:** Remove any software you no longer need.
4.  **Move Large Files:** Transfer large documents, videos, or games to an external hard drive or cloud storage.
5.  **Clean Up Downloads Folder:** Often overlooked, this folder can accumulate significant data over time.
6.  **Use Disk Cleanup Utilities:**
    *   **Windows:** Search for "Disk Cleanup" in the Start Menu, select your system drive (usually C:), and choose files to delete (e.g., Temporary Internet Files, Recycle Bin, Temporary files).
    *   **macOS:** Go to `Apple Menu > About This Mac > Storage > Manage Storage`. Here, you can optimize storage by moving files to iCloud, removing large files, emptying trash automatically, and more.

#### ## Step 3: Change Photoshop's Scratch Disk Preferences

If freeing up space on the primary scratch disk isn't enough, or if you have another faster drive, change Photoshop's scratch disk assignment.
1.  **Access Scratch Disks Preferences:** Go to `Edit > Preferences > Scratch Disks` (Windows) or `Photoshop > Preferences > Scratch Disks` (macOS).
2.  **Select a Different Drive:** Uncheck the full drive and select a different, internal drive with ample free space. Solid State Drives (SSDs) are highly recommended for scratch disks due to their speed. Avoid using external USB drives unless absolutely necessary and ensure they are fast (USB 3.0 or Thunderbolt).
3.  **Prioritize Drives:** You can select multiple scratch disks, and Photoshop will use them in the order they are listed from top to bottom. Drag and drop drives to reorder them. Place the fastest drive with the most free space at the top.
4.  **Restart Photoshop:** After making changes, click "OK" and restart Photoshop for the new settings to take effect.

#### ## Step 4: Optimize Photoshop's Performance Settings

Adjusting Photoshop's internal performance settings can reduce its reliance on scratch disks.
1.  **Access Performance Preferences:** Go to `Edit > Preferences > Performance` (Windows) or `Photoshop > Preferences > Performance` (macOS).
2.  **Adjust Memory Usage:**
    *   **RAM Allocation:** Under "Memory Usage," you'll see a slider for "Let Photoshop Use." Aim for 70-80% of your available RAM. Allocating too much can starve your operating system and other applications, leading to instability. Allocating too little forces Photoshop to rely heavily on scratch disks.
3.  **History & Cache:**
    *   **History States:** Reduce the number of "History States." Each state consumes memory and scratch disk space. A value between 20-50 is usually sufficient for most users.
    *   **Cache Levels:** For large files with many layers, higher cache levels (e.g., 4 or 6) can improve performance. For smaller files or web design, lower cache levels (e.g., 2) might be better. Experiment to find what works best for your workflow.
4.  **Restart Photoshop:** Apply changes and restart Photoshop.

#### ## Step 5: Clear Photoshop's Internal Cache

Photoshop has an internal cache for various operations (e.g., Undo history, clipboard). Clearing these can sometimes free up temporary space.
1.  **Access Purge Options:** With a document open in Photoshop (even a blank one if necessary), go to `Edit > Purge`.
2.  **Select Items to Purge:**
    *   **Undo:** Clears the Undo history for the current document.
    *   **Clipboard:** Clears the contents of the clipboard.
    *   **All:** Clears all purgeable caches for the current document.
    *   **Video Cache:** Specific to video editing workflows.
3.  **Purge:** Select "All" if possible, then restart Photoshop. Note that this action cannot be undone.

#### ## Step 6: Reset Photoshop Preferences (As a Last Resort)

If all else fails, corrupted preferences can sometimes lead to unexpected behavior, including scratch disk issues.
1.  **Quit Photoshop:** Ensure Photoshop is completely closed.
2.  **Reset during Launch:** Hold down `Ctrl + Alt + Shift` (Windows) or `Command + Option + Shift` (macOS) immediately after clicking the Photoshop icon.
3.  **Confirm Reset:** A dialog box will appear asking, "Delete the Adobe Photoshop Settings file?" Click "Yes."
4.  **Reconfigure Preferences:** Photoshop will launch with default preferences. You will need to reconfigure your scratch disks, memory allocation, and other custom settings.

### Common Mistakes

When trying to resolve the "Scratch Disks are Full" error, users often make several common mistakes that can prolong the troubleshooting process or lead to recurrence:

*   **Only Deleting a Few Small Files:** Simply deleting a couple of small images or documents from the full drive is often insufficient. Photoshop can require tens or even hundreds of gigabytes of scratch space for complex projects. A thorough cleanup, as described in Step 2, is crucial.
*   **Ignoring Photoshop's Performance Settings:** Focusing solely on disk space without optimizing Photoshop's RAM allocation, history states, and cache levels can mean the problem reappears quickly. An inefficient Photoshop configuration will constantly demand more scratch space than necessary.
*   **Selecting a Slow External Drive as a Scratch Disk:** While changing the scratch disk to an external drive might seem like a quick fix, if that drive is slow (e.g., an older HDD connected via USB 2.0), it will severely degrade Photoshop's performance. The speed of the scratch disk directly impacts how quickly Photoshop can access temporary data.
*   **Assuming More RAM Alone Solves the Problem:** While more RAM reduces scratch disk usage, it doesn't eliminate it entirely. Extremely large files or highly complex operations will always leverage scratch disks. Even with 64GB of RAM, a 50GB PSD file with many history states can easily fill a scratch disk if not managed correctly.

### Prevention Tips

Proactive measures can significantly reduce the likelihood of encountering the "Scratch Disks are Full" error again, ensuring a smoother workflow.

*   **Regular System Maintenance:** Make it a habit to regularly clear your system's temporary files, empty your Recycle Bin/Trash, and uninstall unused applications. Performing a comprehensive disk cleanup once a month can free up substantial space before it becomes critical.
*   **Monitor Drive Space:** Keep an eye on the free space available on your designated scratch disk(s). Aim to maintain at least 100-200GB of free space on the primary scratch disk, especially if you work with large files. For professional users, having a dedicated SSD with 500GB-1TB of free space purely for scratch disk use is highly recommended.
*   **Use a Fast, Dedicated Scratch Disk:** Whenever possible, use an internal Solid State Drive (SSD) specifically for Photoshop's scratch disk, distinct from your operating system drive. SSDs offer significantly faster read/write speeds than traditional HDDs, greatly improving Photoshop's performance when relying on scratch space.
*   **Optimize Photoshop Performance Settings:** Ensure Photoshop is allocated an optimal amount of RAM (70-80% is a good starting point) and that your History States and Cache Levels are set appropriately for your workflow. Adjust these settings if you frequently switch between different types of projects (e.g., photo retouching versus large-format print design).
*   **Save Incrementally and Flatten Layers:** For very large files, save your work frequently and incrementally (e.g., MyProject_v01.psd, MyProject_v02.psd). When layers are no longer needed for editing, consider merging or flattening them to reduce file size and memory footprint. You can always save a flattened copy while retaining a layered master file.