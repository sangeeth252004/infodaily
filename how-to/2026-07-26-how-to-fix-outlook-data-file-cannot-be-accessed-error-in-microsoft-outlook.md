---
title: "How to Fix \"Outlook Data File Cannot Be Accessed\" Error in Microsoft Outlook"
date: "2026-07-26T02:36:54.635Z"
slug: "how-to-fix-outlook-data-file-cannot-be-accessed-error-in-microsoft-outlook"
type: "how-to"
description: "Resolve the \"Outlook Data File Cannot Be Accessed\" error with this comprehensive guide. Learn the causes and follow step-by-step solutions to regain access to your Outlook data."
keywords: "Outlook data file, cannot be accessed, PST file, OST file, Outlook error, fix Outlook, email troubleshooting, Microsoft Outlook help"
---

## Problem Explanation

A common and frustrating issue users encounter with Microsoft Outlook is the dreaded "Outlook Data File Cannot Be Accessed" error. This message typically appears when Outlook attempts to open or work with your personal storage table (.PST) or offline storage table (.OST) files, which contain all your emails, contacts, calendar entries, and other Outlook items. When this error occurs, Outlook is unable to read or write to these critical data files, effectively locking you out of your mailboxes and preventing you from sending, receiving, or even viewing your messages. The exact wording might vary slightly depending on your Outlook version and the specific circumstances, but it generally conveys the inability to access the underlying data file.

The consequence of this error is a complete disruption of your email workflow. You might see the error message pop up immediately upon launching Outlook, or it could appear intermittently as you try to navigate through your mailboxes. This situation can be particularly stressful for individuals and businesses that rely heavily on Outlook for daily communication and organization. Without access to your data, you cannot effectively perform essential tasks, leading to potential missed deadlines, lost communication, and significant operational delays.

## Why It Happens

The "Outlook Data File Cannot Be Accessed" error can stem from several underlying causes, most of which relate to the integrity or accessibility of the .PST or .OST file itself. One of the most frequent culprits is file corruption. Over time, and especially due to improper shutdowns of Outlook or Windows, power outages, or abrupt system restarts, the data file can become corrupted, rendering it unreadable. This corruption can range from minor inconsistencies to severe damage that makes the file completely inaccessible.

Another significant reason is file location and permissions. If the .PST or .OST file is stored on a network drive, a removable drive, or a location with restricted access, Outlook may not have the necessary permissions to open it. Issues with the drive itself, such as a failing hard drive, can also lead to this error. Furthermore, if another application is currently using or has locked the Outlook data file, Outlook will be unable to gain access. This can sometimes occur with antivirus software scanning the file in real-time or if multiple instances of Outlook are inadvertently running.

## Step-by-Step Solution

### ## Step 1: Check Outlook and Computer Status

Before diving into complex fixes, ensure that Outlook is not currently running or that you haven't inadvertently left multiple instances open. Close Outlook completely through the Task Manager if necessary. Also, restart your computer. A simple reboot can resolve temporary system glitches or file lock issues that might be preventing Outlook from accessing its data file.

### ## Step 2: Locate Your Outlook Data File

The location of your .PST or .OST file can vary based on your Outlook version and whether you're using an Exchange account, POP3, or IMAP.
*   **For Outlook 2010 and later (Windows):** Navigate to `Control Panel` > `Mail (Microsoft Outlook)` > `Show Profiles...` > Select your profile > `E-mail Accounts...` > `Data Files` tab. This will list your data files and their locations.
*   **Common Default Locations (Windows):**
    *   `C:\Users\<username>\Documents\Outlook Files\` (for .PST files)
    *   `C:\Users\<username>\AppData\Local\Microsoft\Outlook\` (for .OST files)
    *   `C:\Program Files\Microsoft Office\OfficeXX\Outlook.pst` (older versions, less common now)
    *   `C:\Program Files (x86)\Microsoft Office\OfficeXX\Outlook.pst` (older versions, less common now)

Once you've found the file, note its exact path.

### ## Step 3: Run the Inbox Repair Tool (ScanPST.exe)

Microsoft provides a built-in utility called ScanPST.exe (Inbox Repair Tool) designed to scan and repair corrupted Outlook data files.

1.  **Locate ScanPST.exe:** The location of this tool varies by Outlook version:
    *   **Outlook 2019, 2016, 2013:** `C:\Program Files (x86)\Microsoft Office\root\Office16\` (or appropriate Office version number)
    *   **Outlook 2010:** `C:\Program Files\Microsoft Office\Office14\`
    *   **Outlook 2007:** `C:\Program Files\Microsoft Office\Office12\`
    *   *Note:* If you can't find it, search your computer for `SCANPST.EXE`.

2.  **Run ScanPST.exe:**
    *   Double-click `SCANPST.EXE` to open the Inbox Repair Tool.
    *   Click `Browse...` and navigate to your .PST or .OST file (identified in Step 2).
    *   Click `Start` to begin the scan.
    *   If errors are found, you will be prompted to `Repair`. Click `Repair`.
    *   Once the repair is complete, Outlook will indicate if it was successful. You may need to restart Outlook.

### ## Step 4: Check File Permissions and Location

If the Inbox Repair Tool doesn't resolve the issue, verify the file's location and permissions.

1.  **File Location:**
    *   **Avoid Network Drives or External Drives:** If your .PST/.OST file is stored on a network share, external hard drive, USB flash drive, or cloud-synced folder (like OneDrive, Dropbox, Google Drive) that isn't set to "Files On-Demand," move it to your local hard drive (e.g., your Documents folder or a dedicated Outlook folder). Accessing data files from these locations can be unreliable and prone to errors.
    *   **Local Drive:** Ensure the file is on a healthy, local drive.

2.  **File Permissions:**
    *   Right-click on the .PST or .OST file.
    *   Select `Properties`.
    *   Go to the `Security` tab.
    *   Ensure your user account has "Full control" or at least "Read" and "Write" permissions. If not, click `Edit...` and grant these permissions.
    *   Check the `General` tab for an "Attributes" section. If the file is marked as "Read-only," uncheck it.
    *   Click `Apply` and then `OK`.

### ## Step 5: Create a New Outlook Profile

Sometimes, the Outlook profile itself can become corrupted, leading to issues accessing data files. Creating a new profile can resolve this.

1.  **Open Mail Setup:** Go to `Control Panel` > `Mail (Microsoft Outlook)` > `Show Profiles...`.
2.  **Add New Profile:** Click `Add...`.
3.  **Name the New Profile:** Enter a descriptive name for the new profile (e.g., "MyNewProfile").
4.  **Configure Email Account:** Follow the on-screen prompts to set up your email account(s) in the new profile. You will likely need to re-enter your email address and password.
5.  **Set as Default:** After creating the new profile, ensure it is set as the default profile by selecting it from the "Always use this profile" dropdown.
6.  **Open Outlook:** Launch Outlook. It should now use the new profile and attempt to access your data files. If your data file is a .PST, Outlook may prompt you to open it.

### ## Step 6: Create a New Data File and Import Data (if necessary)

If the above steps do not work, and you suspect severe corruption that ScanPST.exe couldn't fix, you might need to create a new data file and import your old data into it. This is generally for .PST files.

1.  **Create New Data File:**
    *   In Outlook, go to `File` > `Account Settings` > `Account Settings...`.
    *   Go to the `Data Files` tab.
    *   Click `New...`.
    *   Select `Outlook Data File (.pst)`.
    *   Click `OK`.
    *   Choose a location and name for your new .PST file, then click `OK`.
    *   You may be prompted to create a password for the new file.

2.  **Import Data from Old File:**
    *   Go to `File` > `Open & Export` > `Import/Export`.
    *   Select `Import from another program or file` and click `Next`.
    *   Select `Outlook Data File (.pst)` and click `Next`.
    *   Click `Browse...` and select your *original*, corrupted .PST file.
    *   Choose how to handle duplicate items (e.g., "Replace duplicates with items imported").
    *   Click `Next`.
    *   Select the *new* data file you created as the destination folder for the import.
    *   Click `Finish`.

    Outlook will attempt to import the data. If successful, you can then set this new data file as your default.

## Common Mistakes

A prevalent mistake is assuming the data file itself is the sole problem without checking for simpler issues first. For example, users might immediately resort to complex repair tools without first restarting their computer or closing all instances of Outlook, which can often resolve the problem. Another common pitfall is attempting to repair or access the data file while Outlook is actively running, which can lead to further corruption or inconsistent results. Many users also overlook the importance of file permissions or try to use a .PST file that is stored on a network drive without understanding the risks and limitations. Lastly, when creating a new profile, some users forget to set it as the default, so Outlook continues to try and use the old, potentially corrupted profile.

## Prevention Tips

To prevent the "Outlook Data File Cannot Be Accessed" error from recurring, regular maintenance is key. Ensure Outlook and Windows are always shut down gracefully. Avoid force-closing Outlook unless absolutely necessary. Regularly back up your Outlook data files (.PST files are especially susceptible to issues and should be backed up to a separate location). Moving your Outlook data file to a local drive, rather than a network or cloud-synced location, significantly improves reliability. Periodically running the Inbox Repair Tool as a preventative measure can also help catch minor corruption before it becomes a major problem. Lastly, maintaining sufficient free space on your hard drive and ensuring your system is free from malware can contribute to the overall health of your data files.