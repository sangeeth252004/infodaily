---
title: "How to Fix 'Could Not Complete Your Request Because The Scratch Disks Are Full' Error in Adobe Photoshop"
date: "2026-07-19T11:08:23.269Z"
slug: "how-to-fix-could-not-complete-your-request-because-the-scratch-disks-are-full-error-in-adobe-photoshop"
type: "how-to"
description: "Resolve the Adobe Photoshop \"Scratch Disks Are Full\" error with this comprehensive guide. Learn why it happens and follow step-by-step instructions to free up space, adjust settings, and prevent future occurrences."
keywords: "Photoshop scratch disk full, Photoshop error, scratch disk problem, free up scratch disk, Photoshop storage error, Adobe Photoshop fix, disk space error, could not complete your request"
---

### Problem Explanation

The error message "Could not complete your request because the scratch disks are full" is a common and frustrating issue encountered by Adobe Photoshop users. This critical warning typically appears when Photoshop attempts to perform an operation but cannot find sufficient temporary storage space on the designated drive(s). Users will observe Photoshop either failing to open a file, refusing to save an in-progress project, or crashing unexpectedly while editing complex documents. In some cases, the application may become unresponsive or display the error repeatedly, preventing any further work until the problem is addressed. This often leads to lost progress and significant workflow disruption, especially when working on time-sensitive projects or large, resource-intensive files.

When this error strikes, Photoshop effectively halts, indicating a bottleneck in its ability to process data beyond the system's active RAM. It's not just a minor notification; it's a hard stop that prevents the application from completing its requested action. The specific phrasing "Could not complete your request" coupled with "scratch disks are full" directly points to a storage limitation that impacts Photoshop's core operational capabilities.

### Why It Happens

The "scratch disks are full" error fundamentally occurs because Adobe Photoshop relies heavily on temporary storage known as "scratch disks" to handle operations that exceed the available physical RAM (Random Access Memory). When you're working on a large image, applying complex filters, or managing numerous layers, Photoshop often needs to swap data out of RAM to a dedicated section of your hard drive or solid-state drive (SSD). This scratch disk acts as virtual memory, allowing Photoshop to process much larger files than your system's RAM alone could accommodate.

Several factors can lead to the scratch disks becoming full:

1.  **Insufficient Free Space on Designated Drives:** The most straightforward cause is simply a lack of available free space on the drive(s) Photoshop is configured to use as its scratch disk. If your primary system drive (often C: on Windows or the Macintosh HD on macOS) is nearly full, and it's also set as Photoshop's primary scratch disk, the error will inevitably occur.
2.  **Accumulation of Temporary Files:** Photoshop frequently creates large temporary files (.tmp or .psd) during active sessions. While these are usually deleted upon closing the application, crashes or improper shutdowns can leave these files behind, consuming valuable scratch disk space over time.
3.  **Working with Extremely Large or Complex Files:** High-resolution images, documents with hundreds of layers, smart objects, or extensive history states can rapidly consume scratch disk space, especially if your system has limited RAM. A single massive file can quickly exceed available scratch disk capacity.
4.  **Incorrect Scratch Disk Configuration:** Photoshop's preferences might be set to use a slow, small, or nearly full drive as its scratch disk, even if other, more suitable drives are available on your system.
5.  **Low System RAM:** While scratch disks offload RAM, an exceptionally low amount of physical RAM forces Photoshop to rely even more heavily on its scratch disk, exacerbating the problem when disk space is limited.

Understanding these root causes is crucial for implementing an effective solution, as addressing them often involves both freeing up space and optimizing Photoshop's resource management.

### Step-by-Step Solution

Addressing the "scratch disks are full" error involves a multi-pronged approach, focusing on freeing up space, reconfiguring Photoshop's settings, and optimizing system performance. Follow these steps systematically to resolve the issue.

#### ## Step 1: Free Up Space on Your Primary Scratch Disk

The immediate priority is to create more free space on the drive Photoshop is currently using for its scratch disk. This is often your system's C: drive (Windows) or Macintosh HD (macOS).

*   **Check Disk Space:**
    *   **Windows:** Open "File Explorer," navigate to "This PC," and check the free space listed under your local drives.
    *   **macOS:** Click the Apple menu, choose "About This Mac," then go to the "Storage" tab.
*   **Delete Unnecessary Files:**
    *   **Empty Recycle Bin/Trash:** This is often overlooked but can free up gigabytes of space.
    *   **Delete Large, Unused Files:** Check your "Downloads" folder, "Documents," and "Pictures" for large files (old installers, videos, duplicate images) you no longer need.
    *   **Uninstall Unused Applications:** Go to "Settings" > "Apps" > "Apps & features" (Windows) or "Applications" folder (macOS) and uninstall software you no longer use.
    *   **Run Disk Cleanup (Windows):** Search for "Disk Cleanup" in the Start Menu. Select your C: drive, then click "Clean up system files" to remove temporary files, old Windows updates, and more.
    *   **Manage Storage (macOS):** In "About This Mac" > "Storage," click "Manage..." to access tools for optimizing storage, like moving files to iCloud, emptying Trash automatically, and reviewing large files.

#### ## Step 2: Clear Photoshop's Internal Cache and Temporary Files

Photoshop maintains internal caches and often leaves behind temporary files that can consume significant disk space.

*   **Purge Cache within Photoshop:**
    *   If Photoshop can still open, navigate to **Edit > Purge > All**. This clears Photoshop's internal undo states, clipboard, and history, which can free up immediate RAM and some scratch disk space. Note that this action cannot be undone.
*   **Manually Delete Photoshop Temp Files:**
    *   **Crucial:** Close Photoshop completely before attempting this.
    *   **Windows:** Open "File Explorer" and type `%TEMP%` into the address bar and press Enter. Look for files starting with "Photoshop Temp" or names like `~pst###.tmp`. These can be safely deleted once Photoshop is closed. You might also check the root of your primary scratch disk for similar files.
    *   **macOS:** Go to "Finder," click "Go" in the menu bar, then "Go to Folder..." and type `/tmp` or `~/Library/Caches/Adobe/Photoshop` and press Enter. Look for temporary files, though macOS manages these more aggressively. More commonly, check the root of your designated scratch disk for large, orphaned Photoshop temporary files.

#### ## Step 3: Configure Photoshop Scratch Disk Preferences

The most effective long-term solution is to assign a different, faster, and larger drive as Photoshop's scratch disk.

*   **Access Preferences:**
    *   **If Photoshop can open:** Go to **Edit > Preferences > Scratch Disks...** (Windows) or **Photoshop > Preferences > Scratch Disks...** (macOS).
    *   **If Photoshop cannot open:** Hold **Ctrl + Alt + Shift** (Windows) or **Cmd + Option + Shift** (macOS) immediately after launching Photoshop. You will be prompted to delete the Photoshop Settings file. Confirm to reset preferences, then Photoshop should open. Immediately go to the Scratch Disks preferences as above.
*   **Change Scratch Disk Assignment:**
    *   In the Scratch Disks preference panel, you will see a list of available drives. Select a drive with ample free space and, if possible, an SSD (Solid State Drive) for superior performance.
    *   **Prioritize:** Drag and drop drives in the list to set their priority. Place your fastest, largest, and emptiest drive at the top. It is beneficial to select multiple drives if you have them, allowing Photoshop to utilize more space.
    *   Click "OK" and restart Photoshop for the changes to take effect.
    *   **Recommendation:** A dedicated internal SSD that is not your primary OS drive makes an ideal scratch disk.

#### ## Step 4: Adjust Photoshop Performance Settings

Optimizing how Photoshop uses your system's resources can reduce its reliance on the scratch disk.

*   **Access Performance Preferences:** Go to **Edit > Preferences > Performance...** (Windows) or **Photoshop > Preferences > Performance...** (macOS).
*   **Memory Usage:**
    *   Adjust the "Memory Usage" slider. Photoshop recommends a range, typically 70-80% of your total available RAM. Allocating more RAM means Photoshop has to use the scratch disk less often. Avoid allocating too much (e.g., 90%+) as this can starve your operating system and other applications, leading to overall system instability.
*   **History & Cache:**
    *   **History States:** Reduce the number of "History States." Each state takes up memory and scratch disk space. If you typically don't need to revert more than 20-30 steps, set a lower number (e.g., 20 or 30 instead of the default 50).
    *   **Cache Levels & Tile Size:** For general use, the default settings (Cache Levels: 4, Cache Tile Size: 1024K) are usually fine. If you work with very large pixel dimensions (e.g., panoramas, high-res prints), consider increasing Cache Levels to 6-8. For documents with many layers but smaller dimensions, a smaller Cache Tile Size might be more efficient. Adjust these carefully, as higher cache levels can sometimes consume *more* scratch disk space.
*   Click "OK" and restart Photoshop.

#### ## Step 5: Update Photoshop and Your Operating System

Software updates often include critical bug fixes, performance improvements, and better resource management.

*   **Update Photoshop:** Open the Adobe Creative Cloud Desktop application. Navigate to the "Apps" tab and check for available updates for Photoshop. Install any pending updates.
*   **Update Operating System:**
    *   **Windows:** Go to "Settings" > "Update & Security" > "Windows Update" and check for updates.
    *   **macOS:** Go to "System Settings" > "General" > "Software Update" and check for updates.
Keeping both Photoshop and your OS up to date ensures you benefit from the latest optimizations that can help prevent scratch disk issues.

#### ## Step 6: Consider Upgrading System Hardware (Long-Term)

While not an immediate fix, inadequate hardware is a common underlying cause.

*   **Increase RAM:** Adding more physical RAM to your system is one of the most impactful upgrades for Photoshop performance, significantly reducing its reliance on the scratch disk. Aim for at least 16GB, with 32GB or more being ideal for heavy users.
*   **Faster/Larger SSD:** Upgrading your primary system drive to a larger, faster SSD (if you're still on an HDD) or adding a dedicated, fast internal SSD for Photoshop's scratch disk will dramatically improve performance and prevent "disk full" errors. NVMe SSDs offer the best speed.

### Common Mistakes

When encountering the "scratch disks are full" error, users often make several common mistakes that can delay resolution or exacerbate the problem:

1.  **Ignoring the Error Until It's Critical:** Many users only address the issue when Photoshop completely refuses to operate. Proactive monitoring of disk space and regular maintenance can prevent this critical blockage.
2.  **Only Purging Cache Within Photoshop:** While `Edit > Purge > All` helps, it only clears Photoshop's *active* memory caches. It does not delete large, orphaned temporary files from previous sessions that are physically occupying disk space, nor does it address general system disk fullness.
3.  **Deleting Random Files:** Frantically deleting files without understanding their purpose can lead to data loss or system instability. Always be systematic and delete only files you are certain are unnecessary or temporary.
4.  **Assigning a Slow or Already Full Drive as a Scratch Disk:** Without checking available space and drive speed, users sometimes reassign the scratch disk to another drive that is equally full or significantly slower (e.g., an external USB 2.0 HDD), which offers no real solution or even worsens performance.
5.  **Not Restarting Photoshop:** Many changes to Photoshop's preferences, especially scratch disk assignments, require a full restart of the application to take effect. Forgetting this step means your changes won't be applied.
6.  **Believing RAM Solves Everything:** While more RAM is beneficial, it doesn't eliminate the need for scratch disk space entirely, especially with extremely large files. Photoshop will always use a scratch disk for operations that exceed even vast amounts of RAM.

### Prevention Tips

Preventing the "scratch disks are full" error is far more efficient than constantly troubleshooting it. Incorporate these best practices into your workflow:

1.  **Maintain Ample Free Space:** Always ensure that your designated scratch disk(s) have a significant amount of free space. A good rule of thumb is to have at least 50-100 GB free, or at least 3-5 times the size of the largest file you typically work with. Regularly check disk usage.
2.  **Utilize a Dedicated, Fast SSD for Scratch:** If possible, install a separate, internal SSD (preferably NVMe if your system supports it) and dedicate it solely as Photoshop's primary scratch disk. This isolates Photoshop's temporary files from your operating system and other applications, preventing conflicts and boosting performance.
3.  **Regularly Clear Photoshop's Cache and Temp Files:** Make it a habit to purge Photoshop's internal caches (Edit > Purge > All) before closing the application after a heavy session. Periodically check and manually delete orphaned Photoshop temporary files from your scratch disk locations (after ensuring Photoshop is closed).
4.  **Allocate Optimal RAM:** In Photoshop's Performance Preferences, set "Memory Usage" to 70-80% of your system's total RAM. This balance allows Photoshop ample resources without starving the operating system.
5.  **Optimize Document Workflow:** For extremely large or complex projects, consider saving versions incrementally. Flatten layers or convert Smart Objects when their editability is no longer required to reduce file size. Use "Save As" frequently to create new versions, which can help manage temporary file growth.
6.  **Close Unnecessary Applications:** When working in Photoshop, close other demanding applications, web browsers with many tabs, and other background processes that consume RAM and CPU cycles. This frees up system resources for Photoshop.
7.  **Keep Software Updated:** Regularly update Adobe Photoshop and your operating system. These updates often include performance enhancements and bug fixes that can improve how Photoshop manages resources and prevent such errors.