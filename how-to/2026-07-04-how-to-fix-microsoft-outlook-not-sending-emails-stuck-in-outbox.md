---
title: "How to Fix Microsoft Outlook Not Sending Emails (Stuck in Outbox)"
date: "2026-07-04T11:25:25.799Z"
slug: "how-to-fix-microsoft-outlook-not-sending-emails-stuck-in-outbox"
type: "how-to"
description: "A practical guide to troubleshoot and fix Microsoft Outlook emails stuck in the Outbox. Learn to diagnose connection issues, incorrect settings, and prevent recurrence."
keywords: "Outlook not sending, emails stuck Outbox, Outlook error, fix Outlook send, SMTP issue, Outlook connection problem, send/receive error, Outlook profile corruption"
---

Microsoft Outlook is a vital communication tool for many, but encountering issues where emails refuse to send can disrupt workflows significantly. This guide provides a direct, actionable approach to resolving instances where emails get stuck in your Outlook Outbox.

## Problem Explanation

The primary symptom of this issue is that outgoing emails remain indefinitely in your Microsoft Outlook's "Outbox" folder instead of being delivered to recipients. You might compose and click "Send," but the email never leaves your local Outlook application. While a message sits in the Outbox, recipients will not receive it.

Users typically observe several indicators:
*   The Outlook status bar at the bottom right might display messages like "Trying to connect," "Disconnected," "Needs Password," or "Processing."
*   When attempting a manual "Send/Receive All Folders" action, the progress bar might get stuck or complete quickly without actually sending the Outbox items.
*   No explicit error message appears immediately, though after a prolonged period, you might receive a "0x800CCC0F - The connection to the server was interrupted" or similar SMTP-related error.
*   Even after restarting Outlook, the emails persist in the Outbox.

## Why It Happens

This problem can stem from various underlying causes, often related to connectivity, account configuration, or local data integrity. Understanding these root causes is crucial for effective troubleshooting.

Common reasons include:
*   **Offline Mode:** Outlook might be inadvertently set to "Work Offline," preventing any network communication.
*   **Internet Connectivity Issues:** A lost or unstable internet connection will naturally prevent Outlook from connecting to your mail server.
*   **Incorrect Account Settings:** The most frequent culprit is misconfigured outgoing mail server (SMTP) settings, including the server address, port number, encryption type (SSL/TLS), or authentication requirements.
*   **Password Changes:** If your email account password has been changed recently, Outlook needs to be updated with the new credentials.
*   **Large Attachments:** Emails with excessively large attachments can exceed your email provider's outgoing message size limits, causing them to stall.
*   **Corrupt Outlook Profile or Data File:** Over time, Outlook data files (.PST or .OST) can become corrupted, impacting send/receive functionality.
*   **Antivirus or Firewall Interference:** Security software can sometimes incorrectly block Outlook's outgoing connections, mistaking them for suspicious activity.
*   **Stuck Messages:** A single corrupted or very large email can sometimes "block" other legitimate messages from sending, creating a queue.

## Step-by-Step Solution

Follow these steps sequentially to diagnose and resolve your Outlook sending issues.

### ## Step 1: Verify Internet Connection and Outlook Status

First, establish that your computer has a stable internet connection and that Outlook is not operating in an offline state.

1.  **Check Internet Connectivity:**
    *   Open a web browser and try to visit a reliable website (e.g., google.com). If you cannot access websites, your internet connection is the primary issue, not Outlook itself. Resolve network connectivity first.
2.  **Toggle "Work Offline" Mode:**
    *   In Outlook, navigate to the **Send/Receive** tab on the ribbon.
    *   Locate the **"Work Offline"** button. If it is highlighted or appears pressed, click it once to toggle Outlook back online. The status bar should change from "Working Offline" to "Connected" or "Online."
    *   Attempt to Send/Receive again.

### ## Step 2: Clear the Outbox and Attempt Manual Send/Receive

A single problematic email can sometimes hold up the entire Outbox. It's often best to deal with such emails before proceeding with deeper troubleshooting.

1.  **Open the Outbox:**
    *   In Outlook's Folder Pane (usually on the left), click on **Outbox**.
2.  **Move or Delete Stuck Emails:**
    *   **Important:** Before moving or deleting, Outlook must be offline. Go to the **Send/Receive** tab and click **Work Offline**.
    *   Right-click on any emails in the Outbox. For suspicious or very large emails, choose **Delete** or **Move > Other Folder...** to move them to your Drafts folder for later review.
    *   If you choose to move, you can edit the email, reduce attachment size, or resend it later.
    *   Once the Outbox is clear or only contains emails you are confident are valid, toggle **Work Offline** off again.
3.  **Perform Manual Send/Receive:**
    *   Go to the **Send/Receive** tab and click **Send/Receive All Folders** (or press F9). Observe the status bar for any errors.

### ## Step 3: Review and Correct Account Settings (SMTP)

Incorrect outgoing mail server (SMTP) settings are a very common cause. You'll need your email provider's specific SMTP server details.

1.  **Access Account Settings:**
    *   In Outlook, go to **File > Account Settings > Account Settings...**
    *   Select the email account that is experiencing the sending issue and click **Change...**
2.  **Verify Outgoing Mail Server (SMTP):**
    *   Ensure the "Outgoing mail server (SMTP)" field matches your email provider's specified server address (e.g., `smtp.outlook.com`, `smtp.gmail.com`, `mail.yourdomain.com`).
3.  **Check More Settings:**
    *   Click the **More Settings...** button.
    *   Navigate to the **Outgoing Server** tab.
    *   Most providers require authentication. Ensure **"My outgoing server (SMTP) requires authentication"** is checked. Select **"Use same settings as my incoming mail server"** unless your provider specifies otherwise.
    *   Go to the **Advanced** tab.
    *   **Outgoing server (SMTP) port:** This is critical. Common ports are **587** (for TLS/STARTTLS) or **465** (for SSL).
    *   **Use the following type of encrypted connection:** Select **TLS**, **SSL**, or **Auto** based on your provider's recommendation.
    *   Click **OK** to close "More Settings," then **Next**, and **Finish**. Outlook will attempt to test the settings. Look for green checkmarks. If there are errors, double-check your provider's exact settings.

### ## Step 4: Temporarily Disable Antivirus/Firewall

Security software can sometimes interfere with Outlook's ability to send emails. This step is for testing purposes only; do not leave your security software disabled indefinitely.

1.  **Identify Your Security Software:**
    *   Note down which antivirus software and/or third-party firewall you are using.
2.  **Temporarily Disable:**
    *   Access your antivirus/firewall software settings (usually via the system tray icon or Control Panel/Settings).
    *   Look for options to temporarily disable real-time protection or the firewall. Disable it for 5-10 minutes.
    *   **Crucially, make sure you know how to re-enable it before proceeding.**
3.  **Test Outlook:**
    *   With the security software disabled, try sending an email from Outlook.
    *   If emails send successfully, your security software is the culprit. Re-enable it and then look for settings within the software to add Outlook as an exception or contact your security software vendor for support.
4.  **Re-enable Security Software:** Immediately re-enable your antivirus and firewall after testing.

### ## Step 5: Repair Outlook Data Files or Create a New Profile

Corrupt Outlook data files (.PST for POP accounts, .OST for Exchange/IMAP) can lead to sending issues. If the above steps haven't worked, consider repairing your data file or creating a fresh Outlook profile.

1.  **Locate and Run the Inbox Repair Tool (scanpst.exe):**
    *   Close Outlook completely.
    *   The `scanpst.exe` tool is usually found in your Microsoft Office installation directory. Common locations include:
        *   `C:\Program Files\Microsoft Office\root\Office16` (for Office 2016/2019/365 64-bit)
        *   `C:\Program Files (x86)\Microsoft Office\root\Office16` (for Office 2016/2019/365 32-bit)
        *   Adjust the `Office16` part to `Office15` (2013), `Office14` (2010), etc., depending on your Outlook version.
    *   Run `scanpst.exe`.
    *   Click **Browse...** and locate your Outlook data file.
        *   To find your data file location: In Outlook, **File > Account Settings > Account Settings... > Data Files tab**. Note the "Location" path.
    *   Click **Start** to begin the scan. If errors are found, click **Repair**. Run the tool multiple times if necessary.
2.  **Create a New Outlook Profile:**
    *   If repairing doesn't help, your profile might be severely corrupted. Creating a new profile often resolves deep-seated issues.
    *   Close Outlook.
    *   Open **Control Panel** (search for it in Windows Start Menu).
    *   Change "View by" to **Large icons** or **Small icons**.
    *   Click **Mail (Microsoft Outlook <version>)**.
    *   In the Mail Setup dialog box, click **Show Profiles...**.
    *   Click **Add...**, give your new profile a name (e.g., "Outlook New"), and click **OK**.
    *   Follow the prompts to add your email account(s) to the new profile, using your correct server settings.
    *   Once configured, in the "Mail Setup" dialog, use the "Always use this profile" dropdown to select your new profile.
    *   Start Outlook. If sending works with the new profile, you can migrate any old data if needed and eventually remove the old profile.

## Common Mistakes

When troubleshooting Outlook sending issues, users often make these common mistakes:

*   **Overlooking "Work Offline" Mode:** This is the simplest fix, yet frequently missed. Always check it first.
*   **Assuming Correct Passwords:** If your email password was recently changed elsewhere (e.g., webmail), you *must* update it in Outlook's account settings. Outlook often won't prompt you immediately, leading to silent sending failures.
*   **Ignoring SMTP Specifics:** Mixing up incoming (POP/IMAP) and outgoing (SMTP) server details, using incorrect port numbers (e.g., 25 instead of 587 or 465), or forgetting to enable SMTP authentication are common configuration errors.
*   **Not Testing After Each Step:** Jumping through multiple fixes without testing after each significant change makes it hard to pinpoint the actual cause.
*   **Dismissing Large Attachments:** An email with a 50MB attachment can easily exceed typical provider limits and cause all subsequent emails to backlog. Always check the size of stuck Outbox items.
*   **Troubleshooting the Wrong Account:** If you have multiple accounts, ensure you are checking and modifying the settings for the account that is failing to send.

## Prevention Tips

Adopting these practices can significantly reduce the likelihood of encountering Outlook sending issues in the future:

*   **Keep Outlook and Windows Updated:** Ensure both your Microsoft Office suite and Windows operating system are updated regularly. Updates often include bug fixes and improved compatibility that can prevent issues.
*   **Understand Your Email Provider's Settings:** Keep a record of your email provider's precise incoming (POP/IMAP) and outgoing (SMTP) server settings, including port numbers, encryption types, and authentication requirements. This is invaluable for quick troubleshooting or setting up new profiles.
*   **Manage Attachment Sizes:** Before sending large files, consider using cloud storage services (like OneDrive, Google Drive, Dropbox) and sharing a link to the file instead of attaching it directly. This bypasses email size limits and reduces strain on your mail server.
*   **Regularly Clear the Outbox:** Periodically check your Outbox, especially after sending emails with large attachments, to ensure items are moving out promptly.
*   **Promptly Update Passwords:** Whenever you change your email account password via your webmail interface, immediately update the password in Outlook's account settings.
*   **Monitor Outlook Status:** Pay attention to the status bar at the bottom of the Outlook window. Messages like "Disconnected" or "Needs Password" are early warnings.