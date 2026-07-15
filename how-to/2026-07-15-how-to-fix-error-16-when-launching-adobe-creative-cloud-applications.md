---
title: "How to Fix 'Error 16' When Launching Adobe Creative Cloud Applications"
date: "2026-07-15T20:58:43.516Z"
slug: "how-to-fix-error-16-when-launching-adobe-creative-cloud-applications"
type: "how-to"
description: "Resolve Adobe Creative Cloud Error 16 with this comprehensive guide. Learn the causes and follow step-by-step solutions to get your Adobe apps working again."
keywords: "Adobe Error 16, Creative Cloud Error 16, fix Adobe launch error, Adobe application error, Creative Cloud troubleshooting, Adobe permissions error, clear Adobe cache"
---

### Problem Explanation

Have you ever tried to launch your favorite Adobe Creative Cloud application, like Photoshop, Illustrator, or Premiere Pro, only to be met with a frustrating error message? One of the most common and disruptive errors you might encounter is "Error 16." This error typically appears in a pop-up window shortly after you attempt to open an Adobe application. The message often reads something like: "Adobe Creative Cloud – Error: 16" or "Adobe Creative Suite – Error: 16," followed by a brief, sometimes cryptic, explanation or simply an "OK" button. This prevents you from accessing your creative tools, halting your workflow entirely.

This error signifies a fundamental issue with how the Adobe Creative Cloud application is trying to access or write to its configuration files. Essentially, the application is being blocked from making necessary changes to its own setup or preferences, which are crucial for it to launch correctly and operate as intended. The inability to modify these files means the program cannot initialize properly, leading to the abrupt termination of the launch process and the appearance of the dreaded Error 16.

### Why It Happens

The primary reason behind Adobe Creative Cloud's Error 16 is almost always related to **permissions issues** on your computer's file system. Adobe applications, during installation and regular use, need to create, modify, and read various configuration files, preference files, and cache data stored within specific folders on your system. If the user account you are currently logged into lacks the necessary read/write permissions for these critical Adobe directories, the application will fail to perform these actions, resulting in Error 16.

These permissions can become corrupted or incorrectly set for several reasons. Sometimes, a previous installation or uninstallation of Adobe software might have left behind files with incorrect permissions. In other cases, system updates, security software interfering with Adobe processes, or even manual changes to folder permissions can inadvertently restrict Adobe's access. The core of the problem lies in the operating system's security protocols preventing the Adobe application from doing what it needs to do to start up.

### Step-by-Step Solution

The most effective way to resolve Adobe Creative Cloud Error 16 involves ensuring that Adobe's core application folders have the correct permissions. This is typically done by manually resetting these permissions.

## Step 1: Close All Adobe Processes

Before you begin making any changes, it's crucial to ensure that no Adobe applications or background processes are running. This prevents any ongoing operations from interfering with the permission changes.

1.  **On Windows:**
    *   Press **Ctrl + Shift + Esc** to open the Task Manager.
    *   Go to the **Processes** tab.
    *   Look for any processes related to Adobe Creative Cloud, Adobe Update Notifier, Adobe Acrobat Distiller, or any specific Adobe application you're trying to launch (e.g., Photoshop.exe, Illustrator.exe).
    *   Select each Adobe-related process and click **End task**.
2.  **On macOS:**
    *   Press **Command + Option + Esc** to open the Force Quit Applications window.
    *   Select any running Adobe applications and click **Force Quit**.
    *   Alternatively, open **Activity Monitor** (Applications > Utilities > Activity Monitor), search for Adobe processes, select them, and click the "X" button to quit.

## Step 2: Locate and Reset Adobe Application Permissions Folder

This is the most critical step. You need to navigate to a specific folder where Adobe stores its application support files and reset its permissions. The exact path can vary slightly depending on your operating system version.

**For Windows:**

1.  Open **File Explorer**.
2.  Navigate to the following directory:
    `C:\Program Files (x86)\Common Files\Adobe\`
    *   **Important:** If you are on a 32-bit system or have installed Creative Cloud in a different location, you might need to adjust this path. For most users, this is the correct location.
3.  Right-click on the **Adobe** folder within the `Common Files` directory.
4.  Select **Properties**.
5.  Go to the **Security** tab.
6.  Click the **Edit** button.
7.  In the new window, select your **user account** from the list under "Group or user names."
8.  In the "Permissions for [Your Username]" box below, ensure that **Full control** is checked under the "Allow" column. If it's not checked, check it.
9.  If your username isn't listed, click **Add**, type your username, click **Check Names**, and then click **OK**. Then, grant it Full control.
10. Click **Apply**, then **OK** on the "Permissions" window.
11. Click **OK** on the "Properties" window.

**For macOS:**

1.  Open **Finder**.
2.  From the menu bar, click **Go**, then select **Go to Folder...**
3.  Type the following path and press **Go**:
    `/Library/Application Support/Adobe/`
    *   **Note:** Do *not* confuse this with `~/Library` (which is your user library). You need the system-wide `/Library`.
4.  Right-click (or Control-click) on the **Adobe** folder.
5.  Select **Get Info**.
6.  Expand the **Sharing & Permissions** section at the bottom of the Get Info window.
7.  Click the lock icon in the bottom-right corner and enter your administrator password to make changes.
8.  In the list of users and groups, find your **user account**.
9.  Change the privilege for your user account to **Read & Write**. If your user account is not listed, click the "+" button, select your user account, and then set its privilege to "Read & Write."
10. Click the gear icon at the bottom and select **Apply to enclosed items...** This is crucial to ensure all subfolders and files within the Adobe folder inherit these permissions.
11. Click **OK** to confirm applying to enclosed items.
12. Click the lock icon again to save your changes.
13. Close the Get Info window.

## Step 3: Clear Adobe Creative Cloud Cache Files

Sometimes, corrupted cache files can also contribute to launch issues, even if permissions are corrected. Clearing these can help.

**For Windows:**

1.  Close all Adobe applications and processes (as per Step 1).
2.  Open **File Explorer**.
3.  Navigate to:
    `C:\Users\[Your Username]\AppData\Local\Temp\`
    *   **Note:** The `AppData` folder is hidden by default. To show hidden files, go to File Explorer's **View** tab and check **Hidden items**.
4.  Delete all files and folders within the `Temp` folder.
5.  **Also navigate to and clear the Adobe's specific cache folder:**
    `C:\Users\[Your Username]\AppData\Local\Adobe\`
    Delete the entire `Adobe` folder here.
6.  Empty your Recycle Bin.

**For macOS:**

1.  Close all Adobe applications and processes (as per Step 1).
2.  Open **Finder**.
3.  From the menu bar, click **Go**, then select **Go to Folder...**
4.  Type the following path and press **Go**:
    `/Users/[Your Username]/Library/Caches/`
    *   **Note:** `[Your Username]` should be replaced with your actual macOS username. The `Library` folder in your user directory is hidden by default. To access it, hold down the **Option** key while clicking the **Go** menu in Finder.
5.  Delete the `Adobe` folder located within the `Caches` directory.
6.  **Also navigate to and clear the Adobe's specific cache folder:**
    `/Users/[Your Username]/Library/Application Support/Adobe/`
    Delete the `AAMUpdater` folder within this directory if it exists.
7.  Empty your Trash.

## Step 4: Reinstall Adobe Creative Cloud Desktop Application

If the above steps don't resolve the issue, there might be a problem with the Creative Cloud Desktop application itself. Reinstalling it can often fix underlying corruptions.

1.  **Uninstall Creative Cloud Desktop App:**
    *   **Windows:** Go to **Settings > Apps > Apps & features**, find "Adobe Creative Cloud," and click **Uninstall**.
    *   **macOS:** Open **Finder**, go to **Applications**, find "Adobe Creative Cloud," and move it to the Trash. You may also want to run the Adobe Creative Cloud Cleaner Tool (search for it on Adobe's support site if needed for a thorough clean).
2.  **Restart your computer.**
3.  **Download the latest Creative Cloud Desktop App:** Go to the official Adobe Creative Cloud website and download the installer for the desktop application.
4.  **Install the Creative Cloud Desktop App:** Run the downloaded installer and follow the on-screen instructions.
5.  **Sign in** to your Adobe account within the Creative Cloud Desktop app.

## Step 5: Reinstall the Problematic Adobe Application

After reinstalling the Creative Cloud Desktop app, you may need to reinstall the specific Adobe application that was giving you Error 16.

1.  Open the **Creative Cloud Desktop application**.
2.  Go to the **Apps** tab.
3.  Find the application that was causing the error.
4.  Click **Uninstall** if it's currently installed, or click **Install** if it's not.
5.  Once uninstalled (if applicable), click **Install** again to reinstall it.

## Step 6: Check Adobe Acrobat Pro DC Preferences (If Applicable)

For some users, Error 16 is specifically linked to Adobe Acrobat Pro DC. In this case, a corrupt preference file within Acrobat itself can be the culprit.

1.  Close all Adobe applications.
2.  **On Windows:**
    *   Open **Run** by pressing **Windows key + R**.
    *   Type `%appdata%\Adobe\Acrobat\DC\Preferences` and press **Enter**.
    *   Locate the `com.adobe.Acrobat.Pro.plist` file (or similar for your version).
    *   Rename this file to `com.adobe.Acrobat.Pro.plist.old`.
3.  **On macOS:**
    *   Open **Finder**.
    *   Go to **Go > Go to Folder...**
    *   Type `~/Library/Preferences/` and press **Go**.
    *   Locate the `com.adobe.Acrobat.Pro.plist` file (or similar).
    *   Rename this file to `com.adobe.Acrobat.Pro.plist.old`.
4.  Try launching Adobe Acrobat Pro DC again. It will recreate a new preferences file.

## Step 7: Run as Administrator (Windows Only)

As a temporary diagnostic step, or if you prefer to use this method, you can try running the Adobe application with administrator privileges. This bypasses standard user permission checks. However, this is not a permanent fix and can sometimes cause other issues if done regularly.

1.  Locate the shortcut or executable file for the Adobe application you want to launch (e.g., `Photoshop.exe`).
2.  **Right-click** on the file.
3.  Select **Run as administrator**.
4.  If this allows the application to launch, it strongly indicates a permissions issue as described in the previous steps.

### Common Mistakes

One of the most common mistakes users make is not fully closing all Adobe processes before attempting to change permissions. If an application is still running in the background, your permission changes might not be applied correctly, or the application might overwrite them upon closing. Another frequent error is trying to change permissions on the wrong folder; users might go to their *user* library (`~/Library` on Mac or `C:\Users\[Username]\AppData` on Windows) instead of the *system-wide* library (`/Library` on Mac or `C:\Program Files\Common Files\Adobe` on Windows) for shared Adobe files. Forgetting to apply permissions to enclosed items on macOS is also a significant oversight, as it means only the top-level folder is affected, leaving subfolders with incorrect settings. Finally, simply restarting the computer without performing the permission reset steps will not resolve the underlying problem.

### Prevention Tips

To prevent Error 16 from recurring, it's essential to maintain proper system hygiene and be mindful of how software is installed and uninstalled. Regularly ensure that your operating system and all Adobe software are up-to-date. Adobe updates often include fixes for permission-related issues. When uninstalling Adobe applications or the Creative Cloud Desktop app, always use the official uninstaller provided by Adobe, or consider using the Adobe Creative Cloud Cleaner Tool for a thorough removal. Avoid manually deleting Adobe application files from your computer, as this can leave behind corrupted permissions and orphaned files. Finally, be cautious with third-party system optimization or cleaning tools, as they can sometimes inadvertently alter file permissions in ways that negatively impact Adobe applications. If you do need to manually adjust permissions, do so deliberately and always apply them recursively to all subfolders.