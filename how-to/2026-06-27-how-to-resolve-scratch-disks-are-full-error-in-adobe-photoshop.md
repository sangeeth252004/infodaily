---
title: "How to Resolve 'Scratch Disks Are Full' Error in Adobe Photoshop"
date: "2026-06-27T07:48:53.813Z"
slug: "how-to-resolve-scratch-disks-are-full-error-in-adobe-photoshop"
type: "how-to"
description: "Resolve the \"Scratch Disks Are Full\" error in Adobe Photoshop with this comprehensive guide. Learn why it happens, clear temporary files, manage preferences, and prevent future occurrences for optimal performance."
keywords: "Photoshop, scratch disk, scratch disks full, error fix, Adobe Photoshop error, storage full, temporary files, Photoshop performance, clear scratch disk, preferences, memory, hard drive space"
---

When working with Adobe Photoshop, encountering the "Scratch Disks Are Full" error can halt your workflow, preventing you from saving, opening, or even performing basic operations. This guide provides a comprehensive, step-by-step approach to resolve this common issue and optimize Photoshop for sustained performance.

### Problem Explanation

The specific error message users typically encounter is: "Could not complete your request because the scratch disks are full." or "Could not open [document name] because the scratch disks are full." This message indicates that Photoshop cannot perform the requested operation because it has run out of temporary storage space. When this occurs, Photoshop may become unresponsive, lag significantly, or even crash, leading to potential data loss if your work is not saved. This error primarily manifests when attempting to open large files, apply complex filters, or work with multiple high-resolution layers that exceed your system's available RAM and designated scratch disk space.

### Why It Happens

Adobe Photoshop utilizes "scratch disks" as temporary storage for operations that exceed the capacity of your system's Random Access Memory (RAM). Essentially, when your RAM is insufficient to handle a complex task or large file, Photoshop offloads data onto designated hard drives or solid-state drives (SSDs) to process information. The "Scratch Disks Are Full" error occurs when these designated storage drives lack sufficient free space for Photoshop to write its temporary files. Common reasons for this include:

1.  **Insufficient Free Space:** The primary scratch disk (often your operating system's drive) has run out of available storage.
2.  **Large Document Size:** Working with extremely large images, numerous layers, smart objects, or high-resolution videos within Photoshop demands significant scratch disk space.
3.  **Low RAM Allocation:** If Photoshop is not allocated enough RAM, it relies more heavily on scratch disks, increasing the likelihood of filling them.
4.  **Accumulated Temporary Files:** Photoshop can leave behind large temporary files (e.g., "Photoshop Tempxxxx") if the application crashes or is improperly shut down, which then occupy persistent disk space.

### Step-by-Step Solution

To effectively resolve the "Scratch Disks Are Full" error, follow these detailed steps.

#### ## Step 1: Free Up Space on Your Primary Scratch Disk

The most immediate solution is to create more free space on the drive(s) currently designated as Photoshop's scratch disk. By default, this is often your primary system drive (e.g., C: drive on Windows, Macintosh HD on macOS).

1.  **Empty Recycle Bin/Trash:** Permanently delete files you've moved to the Recycle Bin (Windows) or Trash (macOS).
2.  **Delete Temporary Files:**
    *   **Windows:** Press `Windows Key + R`, type `%TEMP%`, and press Enter. Delete all files and folders in this directory that are not actively in use (skip those that prompt "File in Use"). Look specifically for files starting with "Photoshop Temp" if Photoshop is closed.
    *   **macOS:** Open Finder, press `Command + Shift + G`, type `/tmp` and press Enter. Delete any files beginning with "Photoshop Temp" or similar. You might also check `~/Library/Caches/Adobe/Photoshop/`.
3.  **Uninstall Unused Applications:** Remove any software you no longer use to free up significant space.
4.  **Move Large Files:** Transfer large documents, videos, or archives to an external hard drive or cloud storage.
5.  **Use Disk Cleanup Tools:**
    *   **Windows:** Search for "Disk Cleanup" in the Start menu, select your primary drive, and choose files to delete (e.g., temporary files, downloads, Recycle Bin).
    *   **macOS:** Go to `Apple menu > About This Mac > Storage > Manage`. Use tools like "Reduce Clutter" or "Optimize Storage" to identify and remove unnecessary files.

#### ## Step 2: Clear Photoshop's Internal Cache

Photoshop maintains an internal cache of history states and clipboard data. Clearing this can free up space if you're actively working on a document.

1.  Open Photoshop.
2.  Go to `Edit > Purge`.
3.  Select `All` to clear all undo states, clipboard data, and history. If `All` is grayed out, there's nothing to purge.
    *   *Note:* This action is irreversible for your current session's history. Save your work before purging if needed.

#### ## Step 3: Change Photoshop Scratch Disk Preferences

If your primary drive consistently runs low on space, designate a different, faster drive as your scratch disk. An internal SSD separate from your OS drive is ideal.

1.  **Launch Photoshop.** If you cannot launch Photoshop due to the error, hold down `Ctrl + Alt` (Windows) or `Command + Option` (macOS) immediately after launching the application. This will bring up the Scratch Disk Preferences dialog.
2.  If Photoshop launches successfully, go to `Edit > Preferences > Scratch Disks` (Windows) or `Photoshop > Preferences > Scratch Disks` (macOS).
3.  In the Preferences dialog, you will see a list of available drives. Select a drive that has ample free space and is fast (an SSD is highly recommended). You can select multiple scratch disks, and Photoshop will use them in the order they are listed. Drag drives to reorder their priority.
4.  Ensure the drive with the most available space is at the top of the list.
5.  Click `OK` to apply changes.
6.  **Restart Photoshop** for the new scratch disk settings to take effect.

#### ## Step 4: Allocate More RAM to Photoshop

While not directly about disk space, increasing the RAM allocated to Photoshop reduces its reliance on scratch disks, which can mitigate the error.

1.  Open Photoshop.
2.  Go to `Edit > Preferences > Performance` (Windows) or `Photoshop > Preferences > Performance` (macOS).
3.  In the "Memory Usage" section, adjust the "Let Photoshop Use" slider. Adobe recommends allocating 70-80% of your total available RAM to Photoshop for optimal performance.
4.  Be cautious not to allocate too much RAM (e.g., 90%+) as this can starve your operating system and other applications, leading to overall system instability.
5.  Click `OK` and **restart Photoshop** for the changes to take effect.

#### ## Step 5: Optimize Photoshop Document Workflow

Adjusting how you work with large files can prevent the scratch disk from filling up prematurely.

1.  **Reduce Document Size:** If the final output doesn't require extreme resolution, consider reducing the image dimensions or resolution (`Image > Image Size`).
2.  **Flatten Layers:** When layers are no longer needed for editing, flatten them (`Layer > Flatten Image`) to reduce file size and complexity. This is particularly useful for background layers or elements that are finalized.
3.  **Delete Unused Elements:** Remove any unused layers, channels, or paths from your document.
4.  **Save Incrementally:** Instead of continually saving over the same file, use `File > Save As...` to create new versions of your project periodically (e.g., `project_v1.psd`, `project_v2.psd`). This can sometimes prevent single large temp files from accumulating and also provides recovery points.

#### ## Step 6: Consider Hardware Upgrades

If you frequently encounter the scratch disk error despite following the above steps, it might indicate a need for hardware improvements.

1.  **Add More RAM:** Increasing your system's RAM reduces Photoshop's reliance on scratch disks. Modern Photoshop versions thrive with 16GB or more.
2.  **Install a Dedicated SSD:** Add a fast internal Solid State Drive (SSD) purely for Photoshop's scratch disk use. A dedicated drive ensures no competition for read/write operations with your OS or other applications.

### Common Mistakes

When troubleshooting the "Scratch Disks Are Full" error, users often make several common mistakes:

*   **Attempting to clear files while Photoshop is running:** Many temporary files generated by Photoshop are actively in use. Trying to delete them while Photoshop is open will result in "file in use" errors and will not free up space. Always close Photoshop before manually deleting temp files.
*   **Selecting a slow external drive:** Designating a slow USB hard drive as a scratch disk can alleviate the "full" error but will severely degrade Photoshop's performance. Always prioritize fast internal SSDs.
*   **Not restarting Photoshop:** Changing scratch disk preferences or RAM allocation requires a full restart of Photoshop to apply the new settings.
*   **Ignoring regular maintenance:** Failing to regularly clean up temporary files or manage disk space allows the problem to recur.
*   **Confusing partitions for separate drives:** Designating a different *partition* on the *same physical drive* as a scratch disk offers minimal performance benefit over using the primary partition, as the drive still shares read/write heads. Always aim for a separate physical drive if possible.

### Prevention Tips

Proactive measures can significantly reduce the likelihood of encountering the "Scratch Disks Are Full" error again:

*   **Maintain Ample Free Space:** Always ensure your designated scratch disks (especially your primary OS drive) have at least 20-30% of their total capacity free. This provides a buffer for temporary files and general system operations.
*   **Dedicate a Fast Scratch Disk:** If possible, install a separate, fast internal SSD (NVMe or SATA III) solely for Photoshop's scratch disk use. This isolates Photoshop's intensive I/O operations, improving performance and preventing conflicts.
*   **Regularly Purge Caches:** Make it a habit to use `Edit > Purge > All` at the end of intensive Photoshop sessions, especially before closing the application or when switching between large projects.
*   **Close Photoshop Properly:** Always close Photoshop gracefully rather than force-quitting. This allows the application to clean up its temporary files more effectively.
*   **Monitor Resources:** Periodically check your system's disk space and RAM usage. Tools provided by your operating system can help you stay aware of potential bottlenecks before they become critical errors.