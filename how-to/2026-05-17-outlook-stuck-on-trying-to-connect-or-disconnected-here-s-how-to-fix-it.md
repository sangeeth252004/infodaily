---
title: "Outlook Stuck on 'Trying to connect...' or 'Disconnected'? Here's How to Fix It"
date: "2026-05-17T20:50:15.741Z"
slug: "outlook-stuck-on-trying-to-connect-or-disconnected-here-s-how-to-fix-it"
type: "how-to"
description: "Resolve Outlook connection issues like 'Trying to connect...' or 'Disconnected' with this step-by-step guide. Learn common causes and prevention tips."
keywords: "Outlook, connect, disconnected, trying to connect, email, troubleshooting, fix, error, Microsoft Outlook, connection problems, offline"
---

## Problem Explanation

You're trying to send an important email, check your inbox, or access your calendar in Microsoft Outlook, but instead of showing a healthy connection status, it's frozen on "Trying to connect..." or displaying "Disconnected" in the bottom right corner of the application window. This means Outlook is unable to establish or maintain a connection with your email server. Consequently, you can't send or receive new messages, update your mailbox, or access any online features. This can be incredibly frustrating, especially when you rely on Outlook for daily communication and productivity. The status bar, typically found at the bottom of the Outlook window, is where you'll see these messages, indicating a breakdown in communication between your Outlook client and the mail server.

## Why It Happens

The "Trying to connect..." or "Disconnected" status in Outlook usually stems from an issue preventing your application from reaching your email server. This could be due to a variety of reasons. Network problems are a common culprit; your internet connection might be down, unstable, or experiencing high latency, making it impossible for Outlook to communicate. Alternatively, there might be an issue with the email server itself – it could be undergoing maintenance, experiencing an outage, or having a temporary glitch. Sometimes, outdated Outlook settings, corrupted profile data, or even an overzealous firewall or antivirus program blocking Outlook's access can lead to these connection woes. Even simple things like incorrect account credentials can prevent a successful connection.

## Step-by-Step Solution

### ## Step 1: Check Your Internet Connection

Before diving into Outlook-specific settings, ensure your internet is working correctly.

1.  Open a web browser and try to visit a few different websites (e.g., google.com, microsoft.com).
2.  If websites don't load or load very slowly, the issue is likely with your internet connection.
3.  Restart your router and modem by unplugging them for 30 seconds and then plugging them back in.
4.  Wait for your network devices to fully restart and reconnect.
5.  Try accessing Outlook again.

### ## Step 2: Verify Outlook's Work Offline Setting

Sometimes, Outlook can accidentally be set to "Work Offline" mode, which will obviously prevent it from connecting.

1.  Open Microsoft Outlook.
2.  Look at the **Send/Receive** tab in the ribbon at the top of the window.
3.  In the **Preferences** group, check the **Work Offline** button.
4.  If the **Work Offline** button is highlighted (meaning it's active), click it once to disable it.
5.  Outlook should immediately attempt to connect.

### ## Step 3: Restart Outlook and Your Computer

A simple restart can resolve many temporary glitches.

1.  Completely close Microsoft Outlook. Ensure it's not just minimized but fully exited. You can do this by right-clicking its icon in the taskbar and selecting "Close window" or "Exit."
2.  Restart your computer. This clears temporary system files and can refresh network connections.
3.  After your computer has fully restarted, open Outlook again and see if the connection is restored.

### ## Step 4: Check Your Account Settings in Outlook

Incorrect server settings or credentials can prevent Outlook from connecting.

1.  Open Microsoft Outlook.
2.  Go to **File** > **Account Settings** > **Account Settings**.
3.  In the **Email** tab, select your email account and click **Change**.
4.  Verify that your **Username**, **Password**, **Incoming mail server**, and **Outgoing mail server** (SMTP) details are correct. If you're unsure of these details, contact your email provider or IT administrator.
5.  Click **More Settings** and navigate to the **Outgoing Server** tab. Ensure **My outgoing server (SMTP) requires authentication** is checked and that **Use same settings as my incoming mail server** is selected.
6.  Go to the **Advanced** tab. Check the port numbers for **Incoming server (IMAP/POP3)** and **Outgoing server (SMTP)**. Again, confirm these with your email provider. Typically, IMAP uses port 993 (SSL/TLS), POP3 uses port 995 (SSL/TLS), and SMTP uses port 587 (STARTTLS) or 465 (SSL/TLS).
7.  Click **Next**. Outlook will attempt to test these settings. If it fails, you'll receive an error message indicating the specific problem. Address any errors reported.
8.  Click **Finish** once the tests are successful.

### ## Step 5: Repair Your Outlook Data File (.PST or .OST)

Corrupted Outlook data files can lead to connection issues.

1.  Close Outlook.
2.  **For .OST files (Exchange, Outlook.com, IMAP accounts):** You generally cannot directly repair an .OST file. Instead, you'll need to remove the account from Outlook and re-add it. Outlook will then download a fresh copy of your data from the server.
    *   Go to **File** > **Account Settings** > **Account Settings**.
    *   Select your account and click **Remove**.
    *   Restart Outlook.
    *   Go to **File** > **Add Account** and re-enter your email credentials.
3.  **For .PST files (older POP accounts, exported data):**
    *   Navigate to the **Inbox Repair Tool (scanpst.exe)**. The location varies by Outlook version:
        *   **Outlook 2019/2016/2013:** `C:\Program Files (x86)\Microsoft Office\root\Office16` (or `Office15` for 2013)
        *   **Outlook 2010:** `C:\Program Files (x86)\Microsoft Office\Office14`
        *   *Note: The exact path might differ slightly based on your installation type (e.g., Click-to-Run vs. MSI).*
    *   Double-click `scanpst.exe` to open the tool.
    *   Click **Browse** to locate your Outlook data file (.pst). You can find its location by going to **File** > **Account Settings** > **Account Settings** > **Data Files** in Outlook.
    *   Click **Start**. The tool will scan for errors.
    *   If errors are found, click **Repair**.
    *   Once the repair is complete, open Outlook and check the connection.

### ## Step 6: Temporarily Disable Antivirus/Firewall

Your security software might be mistakenly blocking Outlook.

1.  Locate your antivirus or firewall software icon in the system tray (usually near the clock).
2.  Right-click the icon and look for an option to "Disable," "Turn off," or "Pause" protection. Select a temporary duration (e.g., 10 minutes, 30 minutes).
3.  Try connecting Outlook again.
4.  **Important:** If disabling your security software resolves the issue, it means it's the cause. You'll need to configure your antivirus/firewall to allow Outlook to access the internet. Consult your security software's documentation for specific instructions on adding exceptions for applications. **Do not leave your security software disabled.**

### ## Step 7: Create a New Outlook Profile

A corrupted Outlook profile can cause a wide range of problems, including connection issues. Creating a new profile allows Outlook to start fresh.

1.  Close Outlook.
2.  Open the **Control Panel**. You can search for "Control Panel" in the Windows search bar.
3.  In the Control Panel, search for "Mail" (or find it under User Accounts). Click on **Mail (Microsoft Outlook)**.
4.  In the **Mail Setup - Outlook** dialog box, click **Show Profiles**.
5.  Click **Add...** to create a new profile.
6.  Enter a name for the new profile (e.g., "OutlookProfile2") and click **OK**.
7.  Follow the prompts to add your email account(s) to this new profile. You will need to enter your email address and password. Outlook will try to auto-configure your settings.
8.  Once your account is added, select **"Always use this profile"** and choose your newly created profile from the dropdown list.
9.  Click **Apply** and then **OK**.
10. Open Outlook. It will now load with your new profile. Check if the connection issue is resolved. If it is, you can move your data from the old profile if necessary, or consider using the new profile permanently.

## Common Mistakes

A frequent mistake users make is immediately assuming the problem is with their email provider or Outlook itself, when in reality, the issue is a simple network problem with their home or office internet. Another common pitfall is forgetting to check if Outlook is accidentally set to "Work Offline." This setting is easily overlooked and will prevent any connection, regardless of network status. Users also sometimes skip the basic step of restarting Outlook and their computer, which can fix transient glitches. Lastly, when dealing with account settings, users might make typos in their passwords or server names, or incorrectly configure authentication settings, leading to failed connection attempts.

## Prevention Tips

To help prevent Outlook from getting stuck in a "Trying to connect..." or "Disconnected" state, ensure you have a stable and reliable internet connection. Regularly update your Outlook application and your Windows operating system to benefit from the latest bug fixes and performance improvements. Keep your email account password secure and be mindful of any changes made to your network settings or security software, as these can sometimes interfere with Outlook's connectivity. Periodically review your Outlook account settings to ensure they are still accurate, especially if your email provider has made changes to their server configurations. Maintaining your computer's general health by running regular antivirus scans and disk cleanup can also indirectly contribute to Outlook's stability.