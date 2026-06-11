---
title: "How to Fix 'ERR_CONNECTION_TIMED_OUT' Error in Chrome"
date: "2026-06-11T03:51:18.052Z"
slug: "how-to-fix-err-connection-timed-out-error-in-chrome"
type: "how-to"
description: "Resolve the 'ERR_CONNECTION_TIMED_OUT' error in Google Chrome with this practical, step-by-step guide. Learn common causes and effective solutions."
keywords: "ERR_CONNECTION_TIMED_OUT, Chrome error, internet connection, network problem, fix connection timeout, Chrome troubleshooting"
---

## Problem Explanation

The `ERR_CONNECTION_TIMED_OUT` error in Google Chrome signifies that your browser attempted to establish a connection with a website's server, but the server did not respond within a reasonable timeframe. Essentially, Chrome waited for data from the website, and the server never sent it back. This prevents the webpage from loading, leaving you with a blank screen or an error message indicating the connection has timed out. You will typically see this error displayed prominently on a Chrome error page, often with a message like "This site can't be reached" or "This webpage is not available."

This frustrating error can occur on any website, regardless of its reputation or your browsing history. It's not a reflection of a problem with Chrome itself, but rather an issue that arises during the communication process between your computer and the website's server. The timeout means the communication channel was established, but no usable data was exchanged before the allowed waiting period expired.

## Why It Happens

The `ERR_CONNECTION_TIMED_OUT` error is primarily a network-related issue, indicating that the request from your browser to the server took too long to be processed or that there's an obstruction preventing a timely response. Several factors can contribute to this:

*   **Poor Internet Connection:** A slow, unstable, or interrupted internet connection is the most frequent culprit. If your network is struggling to send and receive data efficiently, requests to websites will take longer, eventually exceeding Chrome's timeout threshold. This can be due to issues with your modem, router, Wi-Fi signal, or even your Internet Service Provider (ISP).
*   **Server-Side Issues:** The website you are trying to access might be experiencing technical difficulties. The server could be overloaded, undergoing maintenance, or experiencing a downtime. In such cases, the server is unable to respond to your requests in a timely manner, leading to a timeout.
*   **Firewall or Antivirus Interference:** Your computer's firewall or antivirus software might be mistakenly identifying the website's connection as a threat and blocking it. This can create a barrier that prevents your browser from receiving a response from the server, resulting in the timeout error.
*   **DNS Cache Problems:** The Domain Name System (DNS) is like a phonebook for the internet, translating website names into IP addresses. If your computer's DNS cache is corrupted or outdated, it might be pointing to incorrect or unresponsive servers, causing connection delays.
*   **Proxy Server Issues:** If you are using a proxy server, either manually configured in Chrome or through your network, a misconfigured or unresponsive proxy can significantly slow down or block your connection to websites.

## Step-by-Step Solution

To resolve the `ERR_CONNECTION_TIMED_OUT` error, you need to systematically address potential network and software conflicts.

## Step 1: Check Your Internet Connection

Before delving into more complex solutions, verify that your internet connection is stable and working correctly.

1.  **Test Other Websites:** Try accessing several other reputable websites (e.g., google.com, wikipedia.org). If they load fine, the issue is likely specific to the website you're having trouble with. If multiple sites are failing, the problem is with your internet connection.
2.  **Restart Your Modem and Router:** Unplug both your modem and router from power. Wait for at least 30 seconds. Plug the modem back in first and wait for its lights to stabilize. Then, plug in the router and wait for its lights to stabilize. Attempt to access the website again.
3.  **Check Your Wi-Fi Signal:** If you are on Wi-Fi, ensure you have a strong signal. Move closer to the router or try connecting via an Ethernet cable if possible.
4.  **Contact Your ISP:** If these steps don't resolve the issue and multiple websites are affected, contact your Internet Service Provider to inquire about any outages or issues in your area.

## Step 2: Clear Chrome's Cache and Cookies

Corrupted cache or cookies can sometimes interfere with website loading.

1.  Open Google Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner to open the menu.
3.  Hover over "More tools" and then click "Clear browsing data..."
4.  In the dialog box, select a "Time range." For a thorough cleanup, choose "All time."
5.  Make sure the boxes for "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you wish to keep it.
6.  Click the "Clear data" button.
7.  Close and reopen Chrome, then try accessing the website again.

## Step 3: Temporarily Disable Firewall and Antivirus

Your security software might be blocking the connection.

1.  **Locate Your Firewall/Antivirus:** This varies depending on your operating system and the software you use.
    *   **Windows Defender Firewall:** Search for "Windows Defender Firewall" in the Windows search bar and open it. Click "Turn Windows Defender Firewall on or off" in the left pane. Select "Turn off Windows Defender Firewall (not recommended)" for both Private and Public network settings.
    *   **Third-Party Antivirus:** Consult your antivirus software's documentation on how to temporarily disable its real-time protection. This is usually found in the software's settings or system tray icon menu.
2.  **Test the Website:** After disabling your firewall and antivirus, try accessing the website.
3.  **Re-enable Security Software:** **Crucially, remember to re-enable your firewall and antivirus immediately after testing.** If the website loads with them disabled, you'll need to configure your security software to allow access to that specific site or adjust its settings.

## Step 4: Flush and Reset DNS Settings

Corrupted DNS entries can cause connection issues.

1.  **Open Command Prompt as Administrator:**
    *   On Windows, search for "cmd" in the Windows search bar. Right-click on "Command Prompt" and select "Run as administrator."
2.  **Execute the Commands:** Type the following commands one by one, pressing Enter after each:
    *   `ipconfig /release`
    *   `ipconfig /renew`
    *   `ipconfig /flushdns`
    *   `netsh winsock reset`
3.  **Restart Your Computer:** After running these commands, restart your computer for the changes to take effect.
4.  Try accessing the website again.

## Step 5: Change Your DNS Server

Using public DNS servers like Google DNS or Cloudflare DNS can sometimes resolve issues caused by your ISP's DNS servers.

1.  **Open Network Connections:**
    *   On Windows, search for "ncpa.cpl" and press Enter.
2.  **Access Adapter Properties:** Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
3.  **Configure IPv4 DNS:**
    *   In the list, find and double-click on "Internet Protocol Version 4 (TCP/IPv4)."
    *   Select "Use the following DNS server addresses."
    *   Enter the preferred and alternate DNS server addresses. For example, for Google DNS:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   Alternatively, for Cloudflare DNS:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
4.  **Confirm Changes:** Click "OK" on all open windows.
5.  **Flush DNS Cache:** Open Command Prompt as administrator again and run `ipconfig /flushdns`.
6.  Restart Chrome and test the website.

## Step 6: Check Proxy Settings in Chrome

An incorrect proxy configuration can cause timeouts.

1.  Open Google Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner.
3.  Go to "Settings."
4.  In the left-hand menu, click "System."
5.  Click "Open your computer's proxy settings." This will open your operating system's proxy settings.
6.  **Disable Proxy (if enabled):**
    *   On Windows, under "Manual proxy setup" or "Automatic proxy setup," ensure that the toggle for "Use a proxy server" is turned OFF. If it's set to automatically detect settings, try turning that off as well.
7.  Close the settings window and try accessing the website.

## Step 7: Try Incognito Mode or a Different Browser

This helps determine if the issue is browser-specific or system-wide.

1.  **Incognito Mode:** Open a new Incognito window in Chrome (Ctrl+Shift+N on Windows, Cmd+Shift+N on Mac). Try accessing the website. Incognito mode disables extensions and doesn't use existing cookies/cache, which can bypass some temporary issues.
2.  **Different Browser:** Try accessing the same website using a different browser (e.g., Firefox, Edge, Safari). If it works in another browser, the problem is likely with your Chrome installation or its settings. If it fails in all browsers, the issue is more likely with your network or the website itself.

## Common Mistakes

A common mistake when encountering `ERR_CONNECTION_TIMED_OUT` is to immediately assume the website is down or there's a major problem with your internet. While these are possibilities, users often overlook simpler solutions like restarting their router or checking for basic network connectivity before troubleshooting more complex settings. Another frequent error is forgetting to re-enable security software after temporarily disabling it, leaving your computer vulnerable. Additionally, some users attempt to flush DNS or reset network settings without understanding what these actions do, potentially leading to other connectivity problems if not done correctly. Lastly, making drastic changes to system network configurations without proper understanding can exacerbate the issue.

## Prevention Tips

To minimize the chances of encountering the `ERR_CONNECTION_TIMED_OUT` error in the future, maintain a healthy network environment and good browsing habits. Regularly restart your modem and router, ideally once a week, to clear temporary glitches and ensure optimal performance. Keep your operating system and Chrome browser updated, as updates often include performance improvements and bug fixes that can address network-related issues. Ensure your Wi-Fi signal is strong and stable; consider using a wired Ethernet connection for critical tasks if Wi-Fi is consistently unreliable. Periodically review your firewall and antivirus settings to ensure they are not overly aggressive and are configured to allow legitimate website traffic. Regularly clearing your browser's cache and cookies can also prevent accumulation of potentially conflicting data.