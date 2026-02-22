---
title: "How to Fix the \"DNS_PROBE_FINISHED_NXDOMAIN\" Error in Chrome"
date: "2026-02-22T15:24:54.727Z"
slug: "how-to-fix-the-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "Learn to diagnose and fix the \"DNS_PROBE_FINISHED_NXDOMAIN\" error in Chrome with this comprehensive step-by-step guide. Resolve your internet connectivity issues quickly and effectively."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, DNS error, NXDOMAIN fix, internet connectivity, network troubleshooting, Chrome browser fix, DNS probe finished, DNS cache, IP flush"
---

### Problem Explanation

When you try to access a website in Google Chrome and encounter the "DNS_PROBE_FINISHED_NXDOMAIN" error, it means your browser couldn't find the internet address for the website you're trying to reach. Instead of the site loading, you'll typically see a "This site can't be reached" message on a white page, often accompanied by the specific error code beneath it. This error prevents your browser from translating the human-readable website name (like "example.com") into the machine-readable IP address (like "192.0.2.1") that computers use to locate servers on the internet.

Essentially, the "NXDOMAIN" part of the error stands for "Non-Existent Domain." It's Chrome telling you that the Domain Name System (DNS) query for the requested website either failed to find an IP address, or explicitly reported that the domain name doesn't exist. This can be frustrating, as it completely blocks access to what might be a perfectly legitimate website for reasons that aren't immediately obvious.

### Why It Happens

The internet relies on the Domain Name System (DNS) as its phonebook. When you type a website address into your browser, your computer sends a request to a DNS server to look up the corresponding IP address for that domain. If the DNS server can't find an entry for the domain, or if your computer can't reach the DNS server, this error occurs.

Several factors can lead to "DNS_PROBE_FINISHED_NXDOMAIN." Common causes include a simple typo in the website address, the website genuinely being down or having been moved, an issue with your local DNS cache (which might be storing outdated or incorrect information), problems with your internet service provider's (ISP) DNS servers, incorrect DNS settings on your computer or router, or interference from a firewall, VPN, or proxy service. It's fundamentally a communication breakdown between your device and the system responsible for resolving domain names into IP addresses.

### Step-by-Step Solution

Here's a structured approach to troubleshoot and resolve the "DNS_PROBE_FINISHED_NXDOMAIN" error. Work through these steps methodically.

### ## Step 1: Check for Typos and Website Status

Before diving into complex network settings, perform a quick sanity check.
*   **Verify the URL:** Double-check the website address you've entered. A single typo (e.g., "gooogle.com" instead of "google.com") can trigger this error.
*   **Try another device/browser:** Attempt to access the same website from a different device on the same network (e.g., your smartphone) or using a different browser (e.g., Firefox, Edge). If it works elsewhere, the problem is likely specific to your Chrome browser or computer.
*   **Check website status:** Use an online service like DownDetector or "Is It Down Right Now?" by searching for "is [website name] down" on Google. This quickly tells you if the problem is with your connection or if the website itself is unreachable for everyone. If the site is down, you'll simply need to wait for it to come back online.

### ## Step 2: Clear Chrome's Host Cache

Chrome maintains its own internal DNS cache, separate from your operating system's cache. If this cache contains outdated or corrupted information, it can lead to the NXDOMAIN error.

1.  Open a new tab in Chrome.
2.  Type `chrome://net-internals/#dns` into the address bar and press Enter.
3.  On the page that appears, locate and click the "**Clear host cache**" button.
4.  Restart Chrome completely by closing all windows and reopening the browser.

### ## Step 3: Flush Your Operating System's DNS Cache

Your operating system also maintains a DNS cache. Flushing it forces your computer to request new DNS information, potentially clearing out any bad data.

**For Windows:**
1.  Press the `Windows key + R` to open the Run dialog.
2.  Type `cmd` and press `Ctrl + Shift + Enter` to open Command Prompt as an administrator.
3.  In the Command Prompt window, type the following command and press Enter:
    `ipconfig /flushdns`
4.  You should see a confirmation message: "Successfully flushed the DNS Resolver Cache."
5.  Close the Command Prompt and try accessing the website again.

**For macOS:**
1.  Open **Terminal** from Applications > Utilities.
2.  Type the following command and press Enter. You may be prompted for your administrator password:
    `sudo killall -HUP mDNSResponder`
3.  Close Terminal and retry the website. (For older macOS versions, commands like `dscacheutil -flushcache` might be needed, but `killall -HUP mDNSResponder` is generally effective for modern versions).

**For Linux (systemd-resolved):**
1.  Open a terminal window.
2.  Type the following command and press Enter:
    `sudo systemd-resolve --flush-caches`
3.  You can verify the cache status with `sudo systemd-resolve --statistics`.
4.  Close Terminal and retry the website.

### ## Step 4: Change Your DNS Servers

If your ISP's default DNS servers are experiencing issues, changing to a public DNS server can often resolve the problem. Google Public DNS and Cloudflare DNS are popular, reliable options.

**For Windows:**
1.  Right-click the network icon in your system tray (bottom-right corner) and select "Open Network & Internet settings" or "Open Network and Sharing Center."
2.  In Network & Internet settings, click "Change adapter options." If in Network and Sharing Center, click "Change adapter settings."
3.  Right-click on your active network connection (e.g., "Ethernet" or "Wi-Fi") and select "Properties."
4.  Select "Internet Protocol Version 4 (TCP/IPv4)" and click the "Properties" button.
5.  Choose "Use the following DNS server addresses" and enter:
    *   **Google Public DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
6.  Click "OK" on both windows to save the changes.
7.  Restart your computer to ensure the new DNS settings are applied.

**For macOS:**
11. Go to **System Settings** (or System Preferences for older macOS).
12. Click on **Network**.
13. Select your active connection (Wi-Fi or Ethernet) on the left sidebar.
14. Click the "Details..." button (or "Advanced..." for older macOS).
15. Go to the "DNS" tab.
16. Click the `+` button under "DNS Servers" to add new DNS servers. Add `8.8.8.8` and `8.8.4.4` (or `1.1.1.1` and `1.0.0.1`).
17. Drag the new DNS entries to the top of the list if they are not already.
18. Click "OK" then "Apply."
19. Restart your computer.

**(Optional: Change DNS on your Router)**
For a more permanent solution across all devices on your network, you can configure the DNS settings directly on your router. The steps vary significantly by router model, but generally involve logging into your router's administration interface via a web browser (usually by typing its IP address, like `192.168.1.1` or `192.168.0.1`, into the address bar), finding the "DNS" or "Network Settings" section, and entering the desired public DNS server addresses. Consult your router's manual for specific instructions.

### ## Step 5: Renew Your IP Address and Reset Network Adapters

Sometimes, your computer's IP configuration can become corrupted. Renewing your IP address and resetting network adapters can help.

**For Windows:**
1.  Open Command Prompt as an administrator (refer to Step 3).
2.  Type the following commands, pressing Enter after each:
    *   `ipconfig /release` (This releases your current IP address)
    *   `ipconfig /renew` (This requests a new IP address)
    *   `netsh winsock reset` (This resets the Winsock catalog, which manages network connections)
    *   `netsh int ip reset` (This resets the TCP/IP stack)
3.  Restart your computer after running all commands.

**For macOS:**
1.  Go to **System Settings** > **Network**.
2.  Select your active connection (Wi-Fi or Ethernet).
3.  Click "Details..." (or "Advanced...").
4.  Go to the "TCP/IP" tab.
5.  Click "Renew DHCP Lease."
6.  Click "OK" then "Apply."
7.  Restart your computer.

### ## Step 6: Restart Your Router and Modem

A simple power cycle of your network hardware can often resolve temporary glitches.

1.  Unplug your internet modem from its power source.
2.  Unplug your Wi-Fi router from its power source (if it's a separate device).
3.  Wait for at least 30 seconds.
4.  Plug your modem back in and wait until all indicator lights are stable (this can take a minute or two).
5.  Plug your router back in and wait until its indicator lights are stable.
6.  Once your network is fully back online, try accessing the website again.

### ## Step 7: Temporarily Disable VPN, Proxy, or Firewall

Third-party software designed to enhance security or privacy, such as VPNs, proxy servers, or overly aggressive firewalls, can sometimes interfere with DNS resolution.

1.  **Disable your VPN:** If you are using a VPN client, temporarily disconnect from it or disable it.
2.  **Disable your Proxy:**
    *   **Windows:** Go to **Settings > Network & Internet > Proxy**. Turn off "Automatically detect settings" and "Use a proxy server."
    *   **macOS:** Go to **System Settings > Network**. Select your connection, click "Details...", then go to the "Proxies" tab. Uncheck any enabled proxy protocols.
3.  **Disable your Firewall:** Temporarily disable any third-party firewall software you have installed. If using Windows Defender Firewall, it's less likely to cause this specific issue, but you can try temporarily disabling it via **Control Panel > System and Security > Windows Defender Firewall > Turn Windows Defender Firewall on or off**.
4.  Test the website. If it loads, re-enable these services one by one to identify the culprit. You may need to adjust their settings or consider alternative software. Remember to re-enable your firewall as soon as testing is complete for security reasons.

### Common Mistakes

*   **Forgetting to restart:** Many network changes, especially flushing DNS or changing server addresses, require a system or browser restart to take full effect. Simply applying a setting and immediately retesting without a restart is a common oversight.
*   **Ignoring typos or website status:** Jumping directly to complex troubleshooting steps without first verifying that the URL is correct or that the website itself is operational can waste a lot of time.
*   **Not checking multiple devices:** Assuming the problem is entirely with your computer when other devices on the same network might also be experiencing issues (pointing to a router or ISP problem) or, conversely, not checking other devices to rule out a local machine-specific issue.
*   **Overlooking VPNs/Proxies:** Forgetting that a VPN or proxy service is active, which can significantly alter network routing and DNS resolution, is a frequent cause of confusion.

### Prevention Tips

*   **Use Reliable DNS Servers:** Configure your devices or router to use well-known, fast, and reliable public DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) instead of relying solely on your ISP's potentially less stable options.
*   **Keep Software Updated:** Regularly update your operating system, browser, and network drivers. Updates often include bug fixes and improvements that can prevent network-related issues.
*   **Regular Router Restart:** Make it a habit to power cycle your router and modem occasionally (e.g., once a month). This clears their caches and can prevent various network glitches.
*   **Be Mindful of VPN/Proxy Use:** Understand how your VPN or proxy service handles DNS requests. If you frequently encounter issues, check their settings or consider a different service.
*   **Bookmark Important Sites:** To avoid typos, bookmark frequently visited websites. For new sites, verify the URL carefully before attempting to access it.