---
title: "How to Fix \"This Site Can't Be Reached\" (ERR_CONNECTION_FAILED) in Google Chrome"
date: "2026-01-28T01:44:11.648Z"
slug: "how-to-fix-this-site-can-t-be-reached-err-connection-failed-in-google-chrome"
type: "how-to"
description: "Troubleshoot and resolve the frustrating \"This Site Can't Be Reached\" error (ERR_CONNECTION_FAILED) in Google Chrome with this comprehensive step-by-step guide."
keywords: "ERR_CONNECTION_FAILED, This Site Can't Be Reached, Google Chrome, fix connection error, internet troubleshooting, network problems, DNS cache, proxy settings, firewall"
---

# How to Fix "This Site Can't Be Reached" (ERR_CONNECTION_FAILED) in Google Chrome

Encountering the dreaded "This site can't be reached" error in Google Chrome can be incredibly frustrating. You click a link, type in a URL, and instead of seeing the webpage you expect, you're met with a blank page and a cryptic message. The most common iteration of this problem is the `ERR_CONNECTION_FAILED` error code, indicating that your browser attempted to connect to the requested website but was unsuccessful. This typically presents as a page stating "This site can't be reached" followed by the specific error code, like `ERR_CONNECTION_FAILED`, and sometimes includes suggestions like "Check the connection" or "Check the spelling of www.example.com."

This error signifies that Google Chrome, or your system at a lower level, is unable to establish a connection with the server hosting the website you're trying to access. It's a broad error message that can stem from a variety of issues, ranging from simple temporary glitches to more complex network configuration problems. Understanding the potential causes is the first step toward a swift resolution.

## Why It Happens

The `ERR_CONNECTION_FAILED` error can arise for several reasons, often related to how your computer communicates with the internet and how websites are located. One primary culprit is an issue with your **Domain Name System (DNS) cache**. When you type a website address (like `www.google.com`), your computer uses DNS to translate that human-readable name into an IP address that computers understand. If the DNS cache on your computer or router is corrupted or outdated, it might be pointing to the wrong IP address, or no IP address at all, leading to the connection failure.

Another common cause is a problem with your **network configuration**, particularly with your internet connection itself, proxy settings, or even your firewall. If your computer is configured to use a proxy server that is down or misconfigured, Chrome won't be able to reach the internet. Similarly, an overzealous firewall or antivirus software might be mistakenly blocking the connection to a legitimate website. Even issues with your router or modem, or temporary server-side problems on the website's end, can manifest as this error.

## Step-by-Step Solution

Here’s a comprehensive approach to troubleshooting and resolving the "This site can't be reached" error:

### ## Step 1: Basic Checks and Reboots

Before diving into more technical fixes, let's cover the fundamentals. Often, a simple restart can resolve temporary glitches.

1.  **Check Your Internet Connection:** Ensure your Wi-Fi or Ethernet cable is properly connected. Look for the network icon in your system tray to confirm you have an active internet connection. Try loading a different, well-known website like `google.com` or `bing.com` to see if the issue is specific to one site.
2.  **Restart Your Router and Modem:** Unplug the power cords from both your modem and router. Wait for about 30-60 seconds, then plug the modem back in first. Wait for all its lights to stabilize, then plug in the router. Once both devices are fully rebooted, try accessing the website again.
3.  **Restart Your Computer:** A full system restart can clear out temporary software conflicts that might be interfering with network connections.

### ## Step 2: Clear Chrome's Cache and Cookies

Corrupted cache data or cookies can sometimes interfere with website loading.

1.  Open Google Chrome.
2.  Click on the three vertical dots in the top-right corner to open the Chrome menu.
3.  Select "Clear browsing data."
4.  In the "Time range" dropdown, select "All time."
5.  Ensure that "Cookies and other site data" and "Cached images and files" are checked. You can choose to uncheck "Browsing history" if you wish to keep it.
6.  Click "Clear data."
7.  Close and reopen Chrome, then try accessing the website.

### ## Step 3: Reset Chrome's Network Settings

Chrome has a built-in option to reset its network-related settings to their defaults, which can fix issues caused by incorrect configurations.

1.  Open Google Chrome.
2.  Click on the three vertical dots in the top-right corner.
3.  Select "Settings."
4.  In the left-hand menu, click on "Reset settings."
5.  Under "Restore settings to their original defaults," click "Reset settings."
6.  A confirmation box will appear. Click "Reset settings" again.
7.  Close and reopen Chrome and test the connection.

### ## Step 4: Flush Your DNS Cache and Reset Your IP Address

This step involves using the command prompt to clear out old DNS entries and obtain a fresh IP address.

1.  **For Windows:**
    *   Search for "Command Prompt" in the Windows search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
    *   In the Command Prompt window, type the following commands, pressing Enter after each one:
        ```bash
        ipconfig /release
        ipconfig /renew
        ipconfig /flushdns
        ```
    *   After executing these commands, close the Command Prompt and restart your computer.
2.  **For macOS:**
    *   Open "Terminal" (Applications > Utilities > Terminal).
    *   Type the following command and press Enter:
        ```bash
        sudo killall -HUP mDNSResponder
        ```
    *   You will be prompted for your administrator password. Type it in (you won't see characters appear as you type) and press Enter.
    *   To flush the DNS cache specifically, you might also need to run:
        ```bash
        sudo dscacheutil -flushcache
        ```
    *   Restart your Mac after running these commands.

### ## Step 5: Change Your DNS Server

Sometimes, the default DNS servers provided by your Internet Service Provider (ISP) can be slow or unreliable. Switching to a public DNS server like Google DNS or Cloudflare DNS can improve performance and resolve connectivity issues.

1.  **For Windows:**
    *   Search for "Network Status" in the Windows search bar and open it.
    *   Click on "Change adapter options."
    *   Right-click on your active network connection (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    *   Select "Use the following DNS server addresses."
    *   Enter the preferred and alternate DNS server addresses. For example, for Google DNS:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   Click "OK" on both windows.
2.  **For macOS:**
    *   Go to System Preferences > Network.
    *   Select your active network connection from the list on the left.
    *   Click the "Advanced..." button.
    *   Go to the "DNS" tab.
    *   Click the "+" button under "DNS Servers" to add new DNS servers.
    *   Enter the preferred and alternate DNS server addresses (e.g., `8.8.8.8` and `8.8.4.4`).
    *   Click "OK" and then "Apply."
3.  After changing DNS servers, you may need to flush your DNS cache again (as per Step 4) or restart your computer.

### ## Step 6: Disable Proxy Settings

Incorrect proxy settings are a common cause of connection errors.

1.  **For Windows:**
    *   Search for "Internet Options" in the Windows search bar and open it.
    *   Go to the "Connections" tab.
    *   Click on "LAN settings."
    *   Ensure that "Automatically detect settings" is checked, and that "Use a proxy server for your LAN" is **unchecked**.
    *   Click "OK" on both windows.
2.  **For macOS:**
    *   Go to System Preferences > Network.
    *   Select your active network connection.
    *   Click the "Advanced..." button.
    *   Go to the "Proxies" tab.
    *   Ensure that none of the proxy options are checked unless you specifically need them and know they are configured correctly.
    *   Click "OK" and then "Apply."

### ## Step 7: Temporarily Disable Firewall and Antivirus

Your security software might be mistakenly blocking Chrome or the website.

1.  **Temporarily disable your Windows Firewall:** Search for "Windows Defender Firewall" in the Windows search bar, open it, and click "Turn Windows Defender Firewall on or off" from the left-hand menu. Turn it off for both private and public network settings.
2.  **Temporarily disable your third-party antivirus:** Locate your antivirus software's icon in the system tray (usually near the clock), right-click it, and look for an option to disable protection or turn off the firewall.
3.  **Test the connection.** If the website loads, you've found the culprit. Re-enable your security software and look for settings within it that might be blocking the site. You may need to add an exception for Chrome or the specific website.
4.  **Important:** Remember to re-enable your firewall and antivirus software immediately after testing.

## Common Mistakes

One of the most frequent mistakes users make is not performing basic troubleshooting like restarting their router and computer. They might jump straight to complex command-line fixes without realizing a simple reboot could have solved the issue. Another common oversight is forgetting to disable the proxy server settings after checking them, leaving them inadvertently enabled. Users also sometimes forget to re-enable their firewall and antivirus software after disabling it for testing, leaving their system vulnerable. Lastly, when clearing cache and cookies, users might only clear a specific time range instead of "All time," which can leave behind the problematic data.

## Prevention Tips

To minimize the chances of encountering the "This site can't be reached" error in the future, practice good network hygiene. Keep your router's firmware updated, as manufacturers often release updates to improve performance and security. Regularly restart your router and modem (e.g., weekly) to ensure they are functioning optimally. Maintain a clean browsing history by periodically clearing cache and cookies. Ensure your operating system and browser are always updated to their latest versions, as these updates often include fixes for network-related bugs. Finally, be cautious when configuring proxy settings and ensure you understand their purpose before enabling them.