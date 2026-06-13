---
title: "How to Fix 'Outlook Not Responding' or Freezing Issues in Microsoft Outlook"
date: "2026-06-13T03:35:13.337Z"
slug: "how-to-fix-outlook-not-responding-or-freezing-issues-in-microsoft-outlook"
type: "how-to"
description: "Learn how to diagnose and resolve common 'Outlook Not Responding' and freezing errors with this comprehensive, step-by-step guide. Fix your Outlook issues quickly."
keywords: "Outlook not responding, Outlook freezing, fix Outlook, Outlook error, Outlook slow, Outlook crash, email client issues, Microsoft Outlook troubleshooting"
---

## Problem Explanation

You're in the middle of sending an important email, searching for a critical message, or simply trying to open Outlook, and suddenly, the application becomes unresponsive. The familiar "Outlook is not responding" message appears in the title bar, often accompanied by a grayed-out window. Clicking anywhere on the screen yields no results, and the only recourse is to close the application forcefully via Task Manager. This recurring issue disrupts workflow, leads to lost data, and causes significant frustration for users who rely on Outlook for daily communication and organization.

This problem manifests as a complete halt in Outlook's functionality. The program stops accepting input, the cursor might turn into a spinning circle or an hourglass, and the application window displays "(Not Responding)" in its title bar. Attempts to minimize, maximize, or close the window are ignored until the operating system intervenes, prompting you to wait for the program to respond or to close it. This often leads to the loss of any unsaved work within Outlook at the time of the freeze.

## Why It Happens

The "Outlook Not Responding" error is a symptom of various underlying issues, most commonly related to add-ins, corrupted data files, or resource conflicts. Outlook, as a feature-rich application, relies on several components working in harmony. When one of these components malfunctions or becomes overloaded, it can cause the entire application to freeze. A frequent culprit is a faulty or incompatible Outlook add-in, which can interfere with Outlook's normal operations. Over time, Outlook's data files (.PST or .OST) can become fragmented or corrupted, leading to slow performance and unresponsiveness. Furthermore, issues with other Microsoft Office applications, network connectivity problems, or even insufficient system resources can contribute to Outlook freezing.

Another significant cause is an excessively large or corrupted Outlook data file. As your mailbox grows, so does the size of your PST (for POP accounts or older PST-based profiles) or OST (for Exchange, Outlook.com, or IMAP accounts) file. Large data files can become unwieldy and prone to corruption, especially if Outlook is not closed properly. Additionally, when Outlook attempts to process a large volume of data, such as during an initial synchronization or after recovering from a crash, it can strain system resources, leading to temporary unresponsiveness. Conflicts with antivirus software, which may be scanning email traffic in real-time, can also create delays and freezes.

## Step-by-Step Solution

### ## Step 1: Restart Outlook and Your Computer

Often, the simplest solution is the most effective. A quick restart can clear temporary glitches and free up system resources.

1.  Close Outlook. If it's not responding, press **Ctrl + Shift + Esc** to open Task Manager.
2.  In Task Manager, go to the "Processes" tab.
3.  Locate "OUTLOOK.EXE" (or simply "Outlook").
4.  Right-click on it and select "End task."
5.  After Outlook is closed, restart your computer.
6.  Once your computer has rebooted, try opening Outlook again.

### ## Step 2: Start Outlook in Safe Mode

Starting Outlook in Safe Mode disables all add-ins. If Outlook works correctly in Safe Mode, an add-in is likely the cause.

1.  Press **Windows Key + R** to open the Run dialog box.
2.  Type `outlook.exe /safe` and press Enter or click OK.
3.  If Outlook opens and functions without freezing, proceed to Step 3.

### ## Step 3: Disable Outlook Add-ins

If Outlook worked in Safe Mode, you need to identify and disable the problematic add-in(s).

1.  Open Outlook normally.
2.  Go to **File** > **Options**.
3.  In the Outlook Options window, select **Add-ins** from the left-hand pane.
4.  At the bottom of the Add-ins screen, next to "Manage:", ensure "COM Add-ins" is selected and click **Go...**.
5.  In the COM Add-Ins dialog box, uncheck the box for all listed add-ins.
6.  Click **OK**.
7.  Close and restart Outlook.
8.  If Outlook now works, re-enable your add-ins one by one, restarting Outlook after each to identify the culprit. Once you find the add-in causing the issue, keep it disabled or look for an updated version.

### ## Step 4: Repair Your Outlook Data Files (.PST and .OST)

Corrupted data files are a common cause of Outlook freezing. The Inbox Repair Tool (SCANPST.EXE) can often fix these issues.

1.  **Locate SCANPST.EXE:** The location of this tool varies depending on your Outlook version.
    *   **Outlook 2019, 2016, 2013:** `C:\Program Files (x86)\Microsoft Office\root\Office16\` or `C:\Program Files\Microsoft Office\root\Office16\`
    *   **Outlook 2010:** `C:\Program Files\Microsoft Office\Office14\`
    *   **Outlook 2007:** `C:\Program Files\Microsoft Office\Office12\`
    *   *Note: If you have a Click-to-Run installation, the path might be slightly different, often within a "vfs" folder. Search your C: drive for `SCANPST.EXE` if you can't find it.*
2.  **Run SCANPST.EXE:** Double-click the executable to open the Microsoft Outlook Inbox Repair Tool.
3.  **Browse for your data file:** Click **Browse...** and navigate to your Outlook data file.
    *   **To find your data file:** In Outlook, go to **File** > **Account Settings** > **Account Settings...**. Select the **Data Files** tab. Select your primary data file and click **Open File Location**.
4.  Click **Start** to begin the scan.
5.  If errors are found, you'll be prompted to repair. Click **Repair**.
6.  Once the repair is complete, click **OK**.
7.  Open Outlook and test if the issue is resolved. You may need to create a new Outlook data file if the repair is unsuccessful or if the file is severely corrupted.

### ## Step 5: Create a New Outlook Profile

A corrupted Outlook profile can also cause unresponsiveness. Creating a new profile doesn't delete your existing data but sets up a fresh configuration for Outlook.

1.  Close Outlook.
2.  Open the Control Panel. You can search for "Control Panel" in the Windows search bar.
3.  In the Control Panel, search for "Mail" (or "Mail (Microsoft Outlook)"). Click on it.
4.  In the Mail Setup - Outlook dialog box, click **Show Profiles...**.
5.  Click **Add...** to create a new profile.
6.  Enter a name for the new profile (e.g., "MyNewProfile") and click **OK**.
7.  Follow the prompts to set up your email account(s) within this new profile. You will need your email address and password.
8.  Once the account is set up, click **Finish**.
9.  Back in the "Mail" dialog box, under "Always use this profile," select the **new profile** you just created.
10. Click **Apply** and then **OK**.
11. Open Outlook. It will now use the new profile. Test if the freezing issue persists. If it's resolved, you can eventually move your data to the new profile or continue using the new one.

### ## Step 6: Update Outlook and Windows

Outdated software can contain bugs that lead to performance issues. Ensure both Outlook and your Windows operating system are up to date.

1.  **Update Outlook:**
    *   Open Outlook.
    *   Go to **File** > **Office Account** (or **Account**).
    *   Under "Product Information," click **Update Options** > **Update Now**.
2.  **Update Windows:**
    *   Go to **Settings** > **Update & Security** > **Windows Update**.
    *   Click **Check for updates**.
    *   Install any available updates.

### ## Step 7: Check for Large Mailboxes or Excessive Folders

A mailbox that has accumulated an extremely large number of items or has many deeply nested folders can impact performance.

1.  **Archive Old Items:** Outlook's AutoArchive feature can move older items to an archive file, reducing the size of your main data file.
    *   Go to **File** > **Info** > **Tools** > **Clean Up Old Items**.
    *   Follow the prompts to archive items older than a specified date.
2.  **Empty Deleted Items and Junk Email Folders:** These folders can grow quite large.
    *   Right-click on the **Deleted Items** folder and select **Empty Folder**.
    *   Right-click on the **Junk Email** folder and select **Empty Folder**.
3.  **Check Folder Sizes:** In Outlook, go to **File** > **Account Settings** > **Account Settings...**. Select your email account and click **Change**. Then click **Outlook Data File Settings**. This will show you the size of your PST/OST file. If it's very large (e.g., over 20GB), consider archiving.

## Common Mistakes

A frequent mistake is assuming the problem is with Outlook itself without investigating other factors. Users often repeatedly force-close Outlook without attempting any troubleshooting steps, which can exacerbate data file corruption. Another common error is failing to restart the computer after making changes; many updates and settings require a reboot to take full effect. When disabling add-ins, users might disable them all at once and then struggle to re-enable them systematically, making it difficult to pinpoint the specific culprit. Finally, some users skip the step of repairing their data files, jumping directly to creating a new profile, which may not be necessary if the data file is the sole issue.

## Prevention Tips

To prevent Outlook from freezing in the future, maintain your data files diligently. Regularly archive older emails to keep your primary PST or OST file manageable in size. Be cautious when installing new Outlook add-ins; research their reputation and functionality before enabling them, and consider disabling them if you experience performance issues. Ensure that your Outlook and Windows are always kept up to date with the latest patches and security updates, as these often include performance enhancements and bug fixes. Periodically running the Inbox Repair Tool as a preventative measure can also help catch minor corruption before it escalates. Finally, ensure Outlook is closed properly each time you finish using it, avoiding abrupt shutdowns that can lead to data file issues.