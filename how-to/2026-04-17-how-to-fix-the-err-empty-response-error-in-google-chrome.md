---
title: "How to Fix the 'ERR_EMPTY_RESPONSE' Error in Google Chrome"
date: "2026-04-17T20:42:28.959Z"
slug: "how-to-fix-the-err-empty-response-error-in-google-chrome"
type: "how-to"
description: "Learn how to troubleshoot and resolve the 'ERR_EMPTY_RESPONSE' error in Google Chrome with this comprehensive technical guide."
keywords: "ERR_EMPTY_RESPONSE, Chrome error, fix Chrome, empty response, website error, network error, clear cache, disable extensions, reset Chrome"
---

When attempting to load a webpage in Google Chrome, you might encounter the disruptive 'ERR_EMPTY_RESPONSE' error. This message typically appears in a stark white or gray page, indicating that the browser sent a request to the server, but the server sent back no data in response. This leaves the page blank and inaccessible, preventing you from viewing the intended content. The error message itself, `ERR_EMPTY_RESPONSE`, is Chrome's way of signaling a communication breakdown where a response was expected but never arrived.

This problem signifies that while Chrome successfully connected to the server hosting the website, the server failed to send back any content. It's akin to knocking on a door and having no one answer, even though you know someone is inside. The cause can stem from various points in the data transfer process, from your local network to the website's server itself, or even intermediary network devices.

## Why It Happens

The 'ERR_EMPTY_RESPONSE' error typically arises due to issues that prevent the web server from successfully transmitting data back to your browser. This could be due to a server-side problem where the website's application or server is malfunctioning, causing it to fail in generating or sending the requested page. Alternatively, it might be a network-related issue where data packets are lost or corrupted during transit between the server and your device. Sometimes, security software on your computer or network can mistakenly interfere with the connection, leading to an empty response.

Another common culprit is an overloaded or misconfigured server. If a website's server is experiencing high traffic, it might struggle to handle all incoming requests efficiently, leading to timeouts or incomplete responses for some users. Similarly, if there are issues with the website's configuration, such as incorrect routing or firewall rules, it can prevent the server from sending the expected data. Even client-side factors, like corrupted browser cache or conflicting extensions, can sometimes manifest as this error by interfering with how Chrome handles incoming data.

## Step-by-Step Solution

### ## Step 1: Clear Browser Cache and Cookies

Corrupted cache or cookies can sometimes lead to unexpected errors, including 'ERR_EMPTY_RESPONSE'. Clearing them forces Chrome to fetch fresh data from the website.

1.  Open **Google Chrome**.
2.  Click the **three vertical dots** (More) in the top-right corner.
3.  Select **Settings**.
4.  In the left-hand menu, click **Privacy and security**.
5.  Click **Clear browsing data**.
6.  In the "Time range" dropdown, select **All time**.
7.  Ensure that **"Cookies and other site data"** and **"Cached images and files"** are checked.
8.  Click **Clear data**.
9.  Restart Chrome and try accessing the website again.

### ## Step 2: Disable Browser Extensions

Conflicting or faulty browser extensions are frequent causes of web browsing issues. Temporarily disabling them helps isolate if an extension is causing the 'ERR_EMPTY_RESPONSE' error.

1.  Open **Google Chrome**.
2.  Click the **three vertical dots** (More) in the top-right corner.
3.  Hover over **Extensions** and click **Manage Extensions**.
4.  Toggle off each extension individually.
5.  After disabling each extension, try reloading the problematic webpage.
6.  If the error disappears, re-enable extensions one by one, reloading the page after each to identify the specific extension causing the conflict.

### ## Step 3: Check Your Internet Connection and Restart Your Router

A stable internet connection is fundamental for loading webpages. Issues with your router or modem can disrupt data flow.

1.  **Test your connection:** Visit other websites to see if they load correctly. If multiple sites are inaccessible, the issue is likely with your internet service.
2.  **Restart your router/modem:**
    *   Unplug the power cable from your router and modem.
    *   Wait for at least 30 seconds.
    *   Plug the modem back in first and wait for its lights to stabilize.
    *   Plug the router back in and wait for its lights to stabilize.
3.  Once your network is back online, try accessing the website again.

### ## Step 4: Temporarily Disable Antivirus or Firewall Software

Overly aggressive antivirus or firewall software can sometimes mistakenly block legitimate website traffic.

1.  Locate your **antivirus** or **firewall** application icon in your system tray (usually near the clock).
2.  Right-click the icon and look for an option like "Disable," "Turn off protection," or "Pause."
3.  Select an option to temporarily disable it for a short period (e.g., 15-30 minutes).
4.  Attempt to load the webpage.
5.  **Crucially, remember to re-enable your security software afterward.** If this step resolves the issue, you may need to configure your antivirus/firewall to allow traffic from the specific website or adjust its settings.

### ## Step 5: Update Google Chrome

An outdated browser can have compatibility issues with modern web standards and may contain bugs that lead to errors.

1.  Open **Google Chrome**.
2.  Click the **three vertical dots** (More) in the top-right corner.
3.  Hover over **Help** and click **About Google Chrome**.
4.  Chrome will automatically check for updates and download them if available.
5.  If an update is installed, you will be prompted to **Relaunch** Chrome.
6.  After relaunching, try accessing the website again.

### ## Step 6: Flush DNS Cache and Reset Network Settings

Outdated or corrupted DNS entries can cause connection problems. Flushing the DNS cache can resolve this.

1.  **Flush DNS Cache (Windows):**
    *   Press the **Windows key + R** to open the Run dialog.
    *   Type `cmd` and press **Ctrl + Shift + Enter** to open Command Prompt as administrator.
    *   In the Command Prompt window, type the following command and press Enter:
        `ipconfig /flushdns`
    *   You should see a message confirming "Successfully flushed the DNS Resolver Cache."
2.  **Flush DNS Cache (macOS):**
    *   Open **Terminal** (Applications > Utilities > Terminal).
    *   Enter the following command and press Enter (you may need to enter your administrator password):
        `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
3.  **Reset Network Settings (Windows):**
    *   Go to **Settings** > **Network & Internet**.
    *   Scroll down and click **Network reset**.
    *   Click **Reset now** and confirm by clicking **Yes**. Your PC will restart.
4.  After performing these steps, try accessing the website.

### ## Step 7: Reset Google Chrome to Default Settings

If none of the above steps resolve the 'ERR_EMPTY_RESPONSE' error, resetting Chrome to its default settings can resolve persistent configuration issues. This will disable extensions, clear temporary data, and reset startup pages and pinned tabs.

1.  Open **Google Chrome**.
2.  Click the **three vertical dots** (More) in the top-right corner.
3.  Select **Settings**.
4.  In the left-hand menu, click **Reset settings**.
5.  Click **Restore settings to their original defaults**.
6.  Click **Reset settings** in the confirmation dialog.
7.  Restart Chrome and test the website.

## Common Mistakes

A frequent mistake is solely focusing on client-side fixes while neglecting potential server-side issues. Users might spend hours clearing caches and resetting network settings when the problem lies with the website itself. Another common oversight is forgetting to re-enable security software after temporarily disabling it, leaving the system vulnerable. Rushing through the steps without carefully reading instructions can also lead to errors, such as not running commands as an administrator or not selecting the correct time range when clearing browsing data. Finally, assuming the error is permanent without trying all the troubleshooting steps is also a common pitfall.

## Prevention Tips

To prevent 'ERR_EMPTY_RESPONSE' errors from recurring, maintain an updated browser by regularly checking for and installing Google Chrome updates. Keep your operating system and network drivers up to date as well, as these can impact network communication. Regularly clear your browser's cache and cookies to avoid data corruption. Be selective with browser extensions; only install those from trusted sources and periodically review and remove extensions that are no longer needed or are not actively used. Ensure your antivirus and firewall software are configured correctly, creating exceptions for trusted websites if necessary, rather than broadly blocking traffic. Regularly restarting your router and modem can also help maintain a stable network connection.