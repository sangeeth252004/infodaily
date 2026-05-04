---
title: "How to Fix 'Scratch Disk Full' Error in Adobe Photoshop"
date: "2026-05-04T11:47:40.901Z"
slug: "how-to-fix-scratch-disk-full-error-in-adobe-photoshop"
type: "how-to"
description: "Resolve the \"Scratch Disk Full\" error in Adobe Photoshop with a practical, step-by-step guide. Learn how to free up space, change preferences, and prevent future occurrences."
keywords: "Photoshop scratch disk full, fix scratch disk error, Adobe Photoshop storage, clear Photoshop temp files, optimize Photoshop performance"
---

### Problem Explanation

The "Scratch Disk Full" error is a common and frustrating issue for Adobe Photoshop users, bringing creative workflows to a halt. When this problem occurs, Photoshop typically displays an error message such as "Could not complete your request because the scratch disks are full" or "Could not initialize Photoshop because the scratch disks are full." Depending on when the error manifests, it can prevent you from opening a document, saving your work, applying a filter, or even launching Photoshop itself. This error indicates that Photoshop has run out of temporary storage space on the designated drive(s) it uses for its operations.

The immediate consequence of encountering this error is an inability to proceed with your work. You might find yourself unable to perform memory-intensive tasks like using large brushes, applying complex filters, or working with high-resolution images and numerous layers. The error message is direct, but it doesn't immediately tell you *how* to resolve the underlying storage issue, leaving many users scrambling to figure out a solution.

### Why It Happens

Photoshop utilizes a concept called a "scratch disk" – essentially virtual memory that it uses to store temporary parts of your document and operation history when your system's RAM is insufficient. Think of it as Photoshop's temporary workspace on your hard drive. When you edit large files, have many layers, or utilize numerous undo states, Photoshop writes this data to the scratch disk. The "Scratch Disk Full" error occurs when the drive(s) designated as Photoshop's scratch disk runs out of available space.

Several factors contribute to this problem. The most common cause is simply a full hard drive, especially if your operating system drive (typically C: on Windows or your boot drive on macOS) is also set as Photoshop's primary scratch disk. Over time, accumulated temporary files from Photoshop itself, other applications, and general system usage can consume all available space. Other contributors include working with exceptionally large documents (e.g., gigapixel images), having an excessive number of history states, using a small, slow drive as the scratch disk, or even corruption within Photoshop's temporary files, which can incorrectly report a full disk even if space technically exists.

### Step-by-Step Solution

Addressing the "Scratch Disk Full" error typically involves freeing up space and reconfiguring Photoshop's preferences. Follow these steps methodically to resolve the issue.

#### ## Step 1: Free Up Immediate Disk Space

The quickest way to alleviate the "Scratch Disk Full" error is to free up space on the drive(s) Photoshop is currently using for its scratch disk.

1.  **Empty the Recycle Bin/Trash:** This is often overlooked. Deleted files still occupy space until the bin is emptied.
    *   **Windows:** Right-click the "Recycle Bin" icon on your desktop and select "Empty Recycle Bin."
    *   **macOS:** Right-click (or Control-click) the "Trash" icon in your Dock and select "Empty Trash."
2.  **Delete Unnecessary Files:** Scan your designated scratch drive(s) for large, unneeded files. This could include old downloads, installers, large video files, or archived projects. Move non-essential large files to an external drive or cloud storage if you need to keep them.
3.  **Uninstall Unused Applications:** Remove any software you no longer use, as applications often leave behind temporary files and occupy significant space.

#### ## Step 2: Change Photoshop's Scratch Disk Preferences

If freeing up space on your current scratch disk is difficult or insufficient, or if it's a slow drive, configure Photoshop to use a different drive with more free space. An SSD is highly recommended for scratch disks due to its speed.

1.  **Launch Photoshop (if possible):**
    *   Go to `Edit > Preferences > Scratch Disks` (Windows) or `Photoshop > Preferences > Scratch Disks` (macOS).
    *   **If Photoshop won't launch:** Hold down `Ctrl+Alt` (Windows) or `Cmd+Option` (macOS) immediately after clicking the Photoshop icon. Keep holding until the "Scratch Disk Preferences" dialog appears.
2.  **Select a New Scratch Disk:** In the preferences dialog, you'll see a list of your available drives.
    *   Check the box next to a drive that has ample free space (ideally 50-100 GB or more) and is *not* your primary operating system drive, if possible.
    *   Uncheck the box next to the drive that was previously full.
    *   You can also drag and drop drives to change their priority; Photoshop uses the top-listed enabled drive first.
3.  **Click "OK" and Restart Photoshop:** For changes to take effect, you must restart Photoshop.

#### ## Step 3: Manually Clear Photoshop's Temporary Files

Photoshop often leaves behind temporary scratch files, especially if the application crashes or is force-quit. These files can accumulate and consume significant disk space. You must quit Photoshop before attempting this step.

1.  **Quit Photoshop Completely.**
2.  **Locate Temporary Files:**
    *   **Windows:** Navigate to `C:\Users\[Your Username]\AppData\Local\Temp`. This `AppData` folder is often hidden; you may need to enable "Show hidden files, folders, and drives" in File Explorer's "View" tab under "Options" or "Folder Options." Look for files named `Photoshop Temp[xxxx]` (where `xxxx` is a series of numbers or letters).
    *   **macOS:** Open "Finder," click "Go" in the menu bar, then select "Go to Folder..." Type `/tmp` and press Enter. Alternatively, you might find them in `/var/folders/` within specific subdirectories, but `/tmp` is the most common location. Look for files starting with "Photoshop Temp" or similarly large, unnamed files.
3.  **Delete Temp Files:** Select and delete these large temporary files. Be careful not to delete any critical system files. If you're unsure, only delete files clearly identified as Photoshop temp files. Empty your Recycle Bin/Trash again after deleting.

#### ## Step 4: Optimize Photoshop Performance Settings

Adjusting Photoshop's internal performance settings can reduce its reliance on scratch disk space.

1.  **Open Performance Preferences:** Go to `Edit > Preferences > Performance` (Windows) or `Photoshop > Preferences > Performance` (macOS).
2.  **Adjust History States:** Lower the "History & Cache" > "History States" value. A high number (e.g., 1000) means Photoshop stores many undo steps, consuming significant scratch disk space. A value between 20-50 is usually sufficient for most users.
3.  **Adjust Cache Levels:** "Cache Levels" (under "History & Cache") affect how Photoshop processes image data. Higher cache levels generally improve performance with larger files but use more memory and potentially more scratch disk space. Try setting it to 4 or 6, or experiment based on your typical file size.
4.  **Memory Usage:** Ensure the "Memory Usage" slider is set appropriately. Photoshop should be allocated a significant portion of your RAM (e.g., 70-80%), but leave enough for your operating system and other critical applications. More RAM allocated to Photoshop means less reliance on the scratch disk.
5.  **Click "OK" and Restart Photoshop.**

#### ## Step 5: Increase System RAM (Hardware Solution)

While not an immediate software fix, increasing your computer's physical RAM (Random Access Memory) is one of the most effective ways to mitigate scratch disk issues. More RAM means Photoshop can keep more image data and history states in faster memory, reducing the frequency with which it needs to write to the slower scratch disk. This translates to better overall performance and less chance of encountering the "Scratch Disk Full" error. Consult your computer's specifications for compatible RAM upgrades.

#### ## Step 6: Reset Photoshop Preferences

If the problem persists and you suspect corrupted preferences are incorrectly reporting the scratch disk status, resetting Photoshop preferences can sometimes resolve the issue. Be aware that this will revert all your custom settings (workspaces, shortcuts, plugin settings) to their defaults.

1.  **Launch Photoshop:** Immediately after clicking the Photoshop icon to launch it, hold down `Ctrl+Alt+Shift` (Windows) or `Cmd+Option+Shift` (macOS).
2.  **Confirm Reset:** A dialog box will appear asking, "Delete the Adobe Photoshop Settings file?" Click "Yes."
3.  Photoshop will then launch with default settings. You will need to reconfigure your scratch disk preferences again (refer to Step 2).

#### ## Step 7: Check Disk Health and Integrity

In rare cases, a failing or corrupted scratch disk can contribute to or cause this error. Running a disk check can identify and sometimes repair errors.

1.  **Windows:**
    *   Open "This PC" or "My Computer."
    *   Right-click on the drive designated as your scratch disk.
    *   Select "Properties," then navigate to the "Tools" tab.
    *   Under "Error checking," click "Check." Follow the prompts to scan and repair the drive if errors are found.
2.  **macOS:**
    *   Open "Disk Utility" (Applications > Utilities > Disk Utility).
    *   Select the drive designated as your scratch disk from the sidebar.
    *   Click "First Aid" and then "Run" to check and repair any disk errors.

### Common Mistakes

When troubleshooting the "Scratch Disk Full" error, users often make several common mistakes that can prolong the problem or create new issues:

*   **Only focusing on the C: drive:** Many users assume the primary system drive is always the scratch disk. If you previously configured Photoshop to use a different drive, freeing space on C: will not help. Always check Photoshop's preferences (Step 2) to identify the active scratch disks.
*   **Deleting critical system files:** In an attempt to free up space, some users might delete files they are unfamiliar with outside of the `Photoshop Temp` designation. Always be cautious when deleting files, especially from system folders like `AppData` or `/tmp`, and only remove files you are certain are temporary or unnecessary.
*   **Ignoring the error until critical:** Allowing your scratch disk to consistently fill up can lead to data loss or system instability, not just Photoshop issues. Proactive management is key.
*   **Choosing a slow scratch disk:** While any drive with space will work in a pinch, using a traditional Hard Disk Drive (HDD) as a scratch disk will significantly slow down Photoshop compared to a Solid State Drive (SSD). Not optimizing this choice reduces performance.

### Prevention Tips

To avoid encountering the "Scratch Disk Full" error in the future, implement these best practices:

*   **Dedicate a Fast Scratch Disk:** If possible, set up a dedicated internal SSD (Solid State Drive) that is *separate* from your operating system drive for Photoshop's scratch disk. SSDs are significantly faster than HDDs, improving Photoshop's performance and minimizing scratch disk issues. Aim for at least 100-200 GB of free space on this dedicated drive.
*   **Regularly Clear Temporary Files:** Make it a habit to quit Photoshop and manually delete old `Photoshop Temp` files from your designated scratch disk directory (as described in Step 3) every few days or weeks, especially after working on large projects.
*   **Monitor Disk Space:** Periodically check the free space on your scratch disk drive(s). Windows users can do this via "This PC," and macOS users via "Finder" > "About This Mac" > "Storage." Aim to keep at least 20-30% of the drive's total capacity free.
*   **Optimize Photoshop Preferences Proactively:** Keep your "History States" and "Cache Levels" (Step 4) at reasonable values to reduce scratch disk consumption. Adjust them only when necessary for specific, demanding tasks.
*   **Empty Recycle Bin/Trash Regularly:** This simple habit ensures that genuinely deleted files are not still consuming valuable disk space.
*   **Close Unused Applications:** Running multiple memory-intensive applications simultaneously reduces available RAM for Photoshop, increasing its reliance on the scratch disk. Close any applications you're not actively using.