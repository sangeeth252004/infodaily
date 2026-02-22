---
title: "How to Fix \"User Profile Service failed the logon\" Error in Windows 10/11"
date: "2026-02-22T10:24:40.094Z"
slug: "how-to-fix-user-profile-service-failed-the-logon-error-in-windows-10-11"
type: "how-to"
description: "Resolve the \"User Profile Service failed the logon\" error in Windows 10/11 with this step-by-step guide. Learn the causes and how to restore access to your user profile."
keywords: "User Profile Service failed the logon, Windows 10, Windows 11, fix user profile error, temporary profile, logon error, registry fix, SID, profilelist, windows logon issue"
---

### Problem Explanation

The "User Profile Service failed the logon" error is a critical system issue that prevents users from accessing their Windows account. When this error occurs, you will typically see a message on the screen stating: "The User Profile Service failed the logon. User profile cannot be loaded." Following this message, Windows might load a temporary profile, which looks like a fresh, new user account. This temporary profile will lack all your personalized settings, desktop icons, documents, and installed applications. Any changes made or files saved within this temporary profile are usually lost upon logout or restart, making it impractical for regular use and highlighting the urgency of restoring your original profile.

This issue effectively locks you out of your primary user environment, rendering your usual Windows experience inaccessible. You won't be able to access your saved passwords, browser history, application configurations, or personal files stored within your original user directory. The system might also feel sluggish or behave unexpectedly in the temporary profile.

### Why It Happens

This error primarily stems from corruption within your user profile's core files or, more commonly, issues in the Windows Registry that dictate how your user profile is loaded. Each user profile in Windows has a unique Security Identifier (SID) associated with it, and this SID is linked to specific registry entries under `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`. When these registry entries become corrupted, duplicated, or incorrectly configured, Windows fails to properly load your profile.

Common causes include unexpected system shutdowns, disk errors, malware infections, Windows updates that didn't complete correctly, or third-party software conflicts (such as antivirus programs that interfere with system files). Sometimes, the actual profile folder on the hard drive becomes corrupted, leading Windows to believe the profile is inaccessible or malformed. In essence, Windows loses the correct "map" to your user profile data, causing the User Profile Service to fail during the login process.

### Step-by-Step Solution

Addressing this error often requires direct intervention in the Windows Registry. Ensure you have administrator privileges and proceed carefully. It's highly recommended to back up your registry before making changes.

## Step 1: Boot into Safe Mode or Windows Recovery Environment (WinRE)

Since you cannot log in normally, you must access the system's advanced startup options.

1.  **Restart your PC multiple times during startup:** Turn on your PC, and as soon as you see the Windows logo, hold down the power button to force a shutdown. Repeat this 2-3 times. This should automatically trigger the Windows Recovery Environment (WinRE).
2.  **Navigate to Safe Mode:**
    *   Once in WinRE, select **Troubleshoot** > **Advanced options** > **Startup Settings** > **Restart**.
    *   After the restart, you'll see a list of options. Press `F4` or `4` to **Enable Safe Mode** or `F5` or `5` to **Enable Safe Mode with Networking**.

If you have another administrator account that still works, you can log in with that, otherwise, use Safe Mode to proceed.

## Step 2: Back Up the Registry (Optional, but Recommended)

Before making any changes, create a backup of your registry.

1.  In Safe Mode (or your working admin account), press `Win + R`, type `regedit`, and press `Enter`.
2.  In the Registry Editor, click **File** > **Export**.
3.  Choose a location (e.g., your Desktop or a USB drive), name the file (e.g., `registry_backup.reg`), and ensure **Export range** is set to **All**. Click **Save**.

## Step 3: Identify and Repair Corrupted Profile Registry Entries

This is the core fix and involves carefully modifying specific registry keys.

1.  Open the Registry Editor as described in Step 2.
2.  Navigate to the following path:
    `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`
3.  Under the `ProfileList` key, you will see several sub-keys starting with `S-1-5-`. These are Security Identifiers (SIDs).
4.  **Identify the problem SIDs:**
    *   Look for two SIDs that are identical except one has a `.bak` extension (e.g., `S-1-5-21-...-1000`) and the other is without the `.bak` extension (`S-1-5-21-...-1000.bak`). The SID *without* `.bak` is often the corrupted one that Windows is trying to load. The one *with* `.bak` is typically a backup or an older, working version.
    *   If you only see *one* SID with a `.bak` extension and *no* corresponding non-`.bak` SID, that's also a common scenario.
    *   To confirm which SID belongs to your user profile, click on each `S-1-5-...` key and look at the `ProfileImagePath` value in the right pane. It will show the path to the user profile folder (e.g., `C:\Users\YourUserName`).
5.  **Perform the repair:**
    *   **Scenario A: Two identical SIDs (one with .bak, one without).**
        1.  Right-click the SID *without* `.bak` (the corrupted one) and select **Rename**. Add `.bad` to the end (e.g., `S-1-5-21-...-1000.bad`).
        2.  Right-click the SID *with* `.bak` and select **Rename**. Remove the `.bak` extension (e.g., `S-1-5-21-...-1000`).
        3.  Now, rename the `.bad` SID back to its original name, but add `.bak` (e.g., `S-1-5-21-...-1000.bak`). (This effectively swaps them, making the original `.bak` the primary).
    *   **Scenario B: Only one SID with a .bak extension (no corresponding non-.bak SID).**
        1.  Right-click the SID *with* `.bak` and select **Rename**. Remove the `.bak` extension.
6.  **Modify values within the corrected SID:**
    *   Click on the newly renamed SID (the one now *without* `.bak` extension, corresponding to your user profile).
    *   In the right pane, locate `RefCount`. Double-click it and change its **Value data** to `0`. Click **OK**.
    *   Locate `State`. Double-click it and change its **Value data** to `0`. Click **OK**.
7.  Close Registry Editor and restart your computer normally. Attempt to log in to your user profile.

## Step 4: Check Disk for Errors (chkdsk)

Disk corruption can sometimes contribute to profile issues.

1.  If you can't log in after Step 3, or as a preventative measure, boot back into WinRE (Step 1).
2.  Select **Troubleshoot** > **Advanced options** > **Command Prompt**.
3.  In the Command Prompt, type `chkdsk /f /r C:` and press `Enter`. (Replace `C:` with your Windows installation drive letter if it's different).
4.  If prompted to run on next restart, type `Y` and press `Enter`.
5.  Restart your computer and let `chkdsk` complete. This process can take a long time, so be patient.

## Step 5: Run System File Checker (SFC) and DISM

These tools can repair corrupted Windows system files.

1.  Boot into WinRE and open **Command Prompt** (as in Step 4).
2.  Type `sfc /scannow` and press `Enter`. Let the scan complete. This will check for and repair corrupted system files.
3.  After `sfc`, run the Deployment Image Servicing and Management (DISM) tool to ensure the Windows image is healthy:
    *   `DISM /Online /Cleanup-Image /RestoreHealth`
    *   Press `Enter`. This command requires an internet connection if Windows needs to download repair files. If you are in WinRE, this might not work directly. Alternatively, if `sfc` fails, you might need to try DISM later if you can get into a functional Windows environment.
4.  Restart your computer after the scans are complete.

## Step 6: Create a New User Profile (If Previous Steps Fail)

If the registry fix and system checks don't work, your current profile might be severely corrupted. Creating a new profile is a viable workaround.

1.  Boot into Safe Mode (Step 1) or log in with another administrator account if available.
2.  Go to **Settings** > **Accounts** > **Family & other users**.
3.  Click **Add someone else to this PC**.
4.  Follow the prompts to create a new local user account. Choose "I don't have this person's sign-in information," then "Add a user without a Microsoft account."
5.  After creating, click on the new account and select **Change account type** to make it an **Administrator**.
6.  Log out of the current account and log in with the new administrator account.
7.  **Transfer your data:**
    *   Navigate to `C:\Users\`
    *   Open your old, corrupted user profile folder (e.g., `C:\Users\YourOldUserName`). You might need to grant permission.
    *   Copy your personal files and folders (Documents, Downloads, Pictures, Music, Videos, Desktop) from the old profile to the corresponding folders in your new user profile (`C:\Users\YourNewUserName`). **Do not copy the `NTUSER.DAT` file or hidden `AppData` folder directly**, as this can reintroduce corruption. Instead, manually reinstall applications and reconfigure settings as needed.

## Step 7: Perform a System Restore (If Restore Point Exists)

If you created a system restore point prior to the error, this can revert your system to a working state.

1.  Boot into WinRE (Step 1).
2.  Select **Troubleshoot** > **Advanced options** > **System Restore**.
3.  Follow the on-screen instructions to choose a restore point dated before the issue started.
4.  Initiate the restore and wait for it to complete. Your computer will restart.

### Common Mistakes

One of the most common mistakes is making indiscriminate changes in the Registry Editor without understanding the specific SIDs involved. Incorrectly renaming or deleting the wrong SID can lead to further system instability or make the situation worse. Another pitfall is failing to back up the registry before making modifications; without a backup, reverting changes becomes much more difficult. Some users also mistakenly try to fix the issue by copying the entire corrupted profile folder, including system files like `NTUSER.DAT`, to a new profile, which often reintroduces the corruption. Finally, overlooking the necessity of booting into Safe Mode or WinRE is a frequent error, as these environments provide the necessary permissions and stability to perform advanced troubleshooting steps.

### Prevention Tips

To minimize the chances of encountering the "User Profile Service failed the logon" error again, adopt these best practices:

*   **Regular Backups:** Implement a robust backup strategy for your entire system, including regular file backups and system image backups. This ensures you can always restore your system to a known good state.
*   **Graceful Shutdowns:** Always shut down your computer properly through the Windows Start Menu. Avoid forced shutdowns (holding the power button) unless absolutely necessary, as these can corrupt system files and user profiles.
*   **Keep Windows Updated:** Ensure your Windows operating system is up-to-date. Microsoft frequently releases patches and bug fixes that can prevent profile-related issues.
*   **Maintain Disk Health:** Regularly run disk error checks (`chkdsk`) to identify and repair bad sectors or file system corruption before they escalate into larger problems.
*   **Use Reliable Antivirus Software:** Keep your antivirus software updated and perform regular scans to protect your system from malware that can corrupt user profiles or system files.