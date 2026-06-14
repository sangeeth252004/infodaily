---
title: "How to Resolve 'Outlook Search Not Working' in Microsoft Outlook"
date: "2026-06-14T11:56:38.843Z"
slug: "how-to-resolve-outlook-search-not-working-in-microsoft-outlook"
type: "how-to"
description: "Fix the common 'Outlook search not working' issue with this comprehensive, step-by-step guide. Learn the causes and practical solutions for a functional Outlook search."
keywords: "Outlook search not working, fix Outlook search, Outlook indexing, Outlook search issues, search index corrupted, Outlook search troubleshooting, rebuild Outlook search index"
---

**Problem Explanation**

You're trying to find an important email, a specific contact, or a meeting in Microsoft Outlook, but the search function is failing you. Instead of returning relevant results, Outlook search might:

*   Return no results, even when you know the item exists.
*   Display an error message stating "Search is not available for this folder" or "Nothing has been indexed yet."
*   Show incomplete or outdated results.
*   Simply hang indefinitely without producing any output.
*   The search bar might be greyed out or unresponsive.

This issue can severely hinder productivity, making it difficult to locate critical information quickly.

**Why It Happens**

The primary reason Outlook search stops working is an issue with its search indexing. Outlook relies on a search index to quickly find items. This index is a database that contains information about the content of your emails, contacts, calendar items, and tasks. When this index becomes corrupted, incomplete, or is not being updated properly, Outlook cannot effectively search your data.

Several factors can lead to index corruption or failure:

*   **Software Glitches:** A temporary bug in Outlook or Windows can disrupt the indexing process.
*   **Corrupted Outlook Data Files:** If your .PST (for POP accounts) or .OST (for Exchange/IMAP accounts) files become damaged, the index derived from them will also be affected.
*   **Antivirus Interference:** Aggressive antivirus software can sometimes interfere with the indexing process, mistakenly flagging Outlook's index files as a threat.
*   **Windows Search Service Issues:** Outlook search in newer versions is integrated with the Windows Search service. If this service is not running or is malfunctioning, Outlook search will fail.
*   **Large Mailboxes:** Extremely large mailboxes or mailboxes with very old data can sometimes overwhelm the indexing process.

**Step-by-Step Solution**

Here’s a systematic approach to troubleshooting and resolving Outlook search issues. Start with the simplest solutions and progress to more involved steps.

## Step 1: Restart Outlook and Your Computer

This is the most basic troubleshooting step, but often effective. A simple restart can clear temporary glitches in Outlook and the Windows operating system that might be affecting the search index.

1.  **Close Outlook:** Ensure Outlook is completely closed. Check the system tray (near the clock) for the Outlook icon and right-click to exit if it's running in the background.
2.  **Restart Your Computer:** Click the Start button, then Power, and select Restart.
3.  **Re-open Outlook:** Once your computer has restarted, launch Outlook and test the search function.

## Step 2: Check Outlook Search Options

Sometimes, the search scope might be incorrectly configured, leading to no results.

1.  **Open Outlook.**
2.  **Click in the Search bar** at the top of your Outlook window.
3.  The **Search** tab should appear in the ribbon.
4.  Under **Scope**, ensure that "All Outlook items" or the relevant folder is selected. If it's set to "Current Folder," Outlook will only search within that specific folder.
5.  If you recently changed the search scope, try setting it back to "All Outlook items" and test.

## Step 3: Rebuild the Outlook Search Index

This is the most common and effective solution for corrupted search indexes. Rebuilding the index forces Outlook to re-scan your data and create a fresh index.

**For Outlook 2013, 2016, 2019, and Microsoft 365:**

1.  **Open Outlook.**
2.  Click **File** > **Options**.
3.  In the Outlook Options dialog box, click **Search** in the left-hand pane.
4.  Click the **Indexing Options...** button. This will open the Indexing Options window.
5.  In the Indexing Options window, click **Advanced**. You may be prompted for an administrator password.
6.  In the Advanced Options dialog box, under the "Index Settings" tab, click **Rebuild**.
7.  Outlook will display a message indicating that the index is being rebuilt. This process can take a significant amount of time, depending on the size of your mailbox. You can continue using Outlook during this process, but search performance will be degraded until it's complete.
8.  Once complete, close the Indexing Options and Outlook Options windows.
9.  **Restart Outlook** and test the search.

**For older versions of Outlook (e.g., Outlook 2010):**

The steps are similar but the location of Indexing Options might vary slightly. Generally, it's found via File > Options > Search.

## Step 4: Verify Windows Search Service is Running

Outlook search in modern versions relies on the Windows Search service. If this service is not running or is misconfigured, search will fail.

1.  Press **Windows Key + R** to open the Run dialog box.
2.  Type `services.msc` and press Enter.
3.  In the Services window, scroll down and find **Windows Search**.
4.  Check the **Status** column for Windows Search.
    *   If it says **Running**, right-click on **Windows Search** and select **Restart**.
    *   If it says **Stopped**, right-click on **Windows Search** and select **Start**.
5.  Ensure the **Startup Type** is set to **Automatic**. If it's not, right-click **Windows Search**, select **Properties**, change "Startup type" to **Automatic**, and click **Apply** then **OK**.
6.  After restarting or starting the service, **restart Outlook** and test search.

## Step 5: Check Your Antivirus and Firewall Settings

Occasionally, overzealous antivirus or firewall software can block Outlook's access to its index files or interfere with the Windows Search service.

1.  **Temporarily Disable Antivirus/Firewall:** As a diagnostic step, temporarily disable your antivirus software and any third-party firewall. **IMPORTANT:** Remember to re-enable them immediately after testing.
2.  **Test Search:** Open Outlook and try searching.
3.  **If Search Works:** The antivirus/firewall is likely the culprit. You'll need to configure your security software to exclude Outlook's data files (.PST, .OST) and potentially the Windows Search service from real-time scanning or blocking. Consult your security software's documentation for specific instructions.
4.  **If Search Doesn't Work:** Re-enable your security software and proceed to the next step.

## Step 6: Repair Your Outlook Data File (.PST or .OST)

Corrupted Outlook data files are a common cause of search and other Outlook problems. Outlook has a built-in repair tool.

**For Outlook data files (.PST):**

1.  **Close Outlook.**
2.  Navigate to your Outlook data file. The location varies by Outlook version and Windows version, but common locations include:
    *   `C:\Users\<Your Username>\Documents\Outlook Files\`
    *   `C:\Program Files\Microsoft Office\OfficeXX` (where XX is your Office version, e.g., 16.0)
3.  Search for `SCANPST.EXE`. If you can't find it, search your entire C: drive.
4.  Run `SCANPST.EXE`.
5.  Click **Browse** and select your Outlook data file (.PST).
6.  Click **Start** to begin the scan.
7.  If errors are found, click **Repair**. You might be prompted to create a backup of your file first. It is highly recommended to do so.
8.  Once the repair is complete, **open Outlook** and test the search.

**For Outlook Offline Data Files (.OST) (used with Exchange, Outlook.com, IMAP):**

OST files are typically not repaired directly. The process is to remove the account and let Outlook recreate the OST file and its index.

1.  **Close Outlook.**
2.  Go to **Control Panel** > **Mail (Microsoft Outlook)**.
3.  Click **Email Accounts...**.
4.  Select your account (usually Exchange or Outlook.com) and click **Remove**.
5.  Confirm the removal.
6.  **Click New...** to add the account back. Follow the prompts to reconfigure your account.
7.  Once Outlook is re-synced, the OST file will be recreated, and indexing will begin from scratch. **Restart Outlook** and test search.

## Step 7: Recreate Outlook Search Index (Advanced)

If rebuilding the index multiple times doesn't work, you might need to manually clear and recreate the index.

1.  **Open Indexing Options** (as described in Step 3).
2.  Click **Advanced**.
3.  Under "Troubleshooting," click **Re-index Now**. This is similar to rebuilding but can sometimes resolve deeper issues.
4.  If that doesn't work, you can also try **deleting the Outlook search catalog** and letting Windows rebuild it. This is a more aggressive step.
    *   First, identify the index location: In the Advanced Options of Indexing Options, under "Index location," you'll see the path.
    *   **Close Outlook.**
    *   Navigate to that index location. It's often a hidden folder named `~usertrunc.dat` or similar.
    *   **Delete all files** within this index location folder. Be cautious not to delete files outside this specific index folder.
    *   **Restart Outlook.** Windows will automatically begin recreating the search index. This can take a very long time.

**Common Mistakes**

A frequent mistake is not understanding the difference between Outlook search and Windows Search. While they are integrated, issues with the Windows Search service itself can impact Outlook. Users might also repeatedly try rebuilding the index without addressing underlying problems like antivirus interference or data file corruption. Another common oversight is failing to restart Outlook or the computer after making changes, which is crucial for many fixes to take effect. Trying to repair PST files without closing Outlook first can also lead to further corruption.

**Prevention Tips**

To minimize the chances of Outlook search failing again, practice good digital hygiene:

*   **Regularly Maintain Outlook:** Keep your Outlook application updated. Install the latest service packs and updates for your version of Microsoft Office.
*   **Manage Mailbox Size:** Archive old emails regularly. Large mailboxes can strain the indexing process. Use Outlook's AutoArchive feature or manually move older emails to an archive PST file.
*   **Scan Regularly:** Run full antivirus scans regularly, but configure your antivirus to exclude Outlook's data files (.PST/.OST) and the Windows Search index locations from deep real-time scans to prevent interference.
*   **Graceful Shutdowns:** Always close Outlook properly. Avoid shutting down your computer abruptly, as this can sometimes lead to data file corruption or incomplete index updates.
*   **Monitor Windows Search:** Periodically check that the Windows Search service is running and set to Automatic in `services.msc`.