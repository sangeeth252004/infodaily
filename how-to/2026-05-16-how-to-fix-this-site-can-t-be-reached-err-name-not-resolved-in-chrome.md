---
title: "How to Fix \"This Site Can't Be Reached\" (ERR_NAME_NOT_RESOLVED) in Chrome"
date: "2026-05-16T02:47:40.690Z"
slug: "how-to-fix-this-site-can-t-be-reached-err-name-not-resolved-in-chrome"
type: "how-to"
description: "Expert guide to troubleshoot and resolve the \"This Site Can't Be Reached\" (ERR_NAME_NOT_RESOLVED) error in Google Chrome, covering common causes and step-by-step fixes for a reliable internet connection."
keywords: "ERR_NAME_NOT_RESOLVED, This Site Can't Be Reached, Chrome error, DNS error, internet problem, website not loading, fix internet connection, clear DNS cache, change DNS server, network reset, browser cache, troubleshooting Chrome."
---

### Problem Explanation

When attempting to access a website in Google Chrome, you might occasionally encounter a blank white page displaying the message "This site can't be reached." Below this primary message, a more specific error code often appears: `ERR_NAME_NOT_RESOLVED`. This indicates a fundamental issue in how your browser or computer is trying to locate the website you wish to visit. Essentially, Chrome is unable to translate the human-readable domain name (like "example.com") into the numerical IP address that computers use to identify servers on the internet.

This error is a roadblock, preventing your browser from establishing a connection with the target web server. It's similar to trying to call a friend by their name, but your phone directory doesn't have their number listed. Without that crucial IP address, Chrome cannot send its request to the correct destination, resulting in the site being unreachable, even if the website itself is operational and your internet connection appears to be working for other tasks.

### Why It Happens

The `ERR_NAME_NOT_RESOLVED` error is almost exclusively a Domain Name System (DNS) resolution issue. The DNS acts as the internet's phone book, translating domain names into IP addresses. When you type a website address into your browser, your computer queries a DNS server to find the corresponding IP address. If this query fails or receives an invalid response, Chrome cannot proceed, leading to the error.

Several factors can cause this DNS resolution failure. Your computer's local DNS cache might be corrupted, holding onto outdated or incorrect information. Similarly, your router or internet service provider's (ISP) DNS servers might be experiencing issues, be misconfigured, or be slow to respond. Proxy servers, VPNs, or certain firewall settings can also interfere with the DNS lookup process, redirecting or blocking requests. In some cases, a problem with your general internet connectivity, though less common for this specific error, could also indirectly prevent successful DNS lookups.

### Step-by-Step Solution

Follow these steps in order, testing after each one to see if the issue is resolved.

#### ## Step 1: Check Your Basic Internet Connection

Before delving into complex solutions, confirm that your internet connection is functional.
1.  **Test other websites:** Try opening well-known sites like `google.com`, `youtube.com`, or `wikipedia.org`. If these also fail, the problem is likely with your general internet connection, not just a specific site or DNS resolution.
2.  **Check Wi-Fi/Ethernet connection:** Ensure your device is properly connected to your network. For Wi-Fi, check the signal strength; for Ethernet, ensure the cable is securely plugged into both your computer and router/modem.
3.  **Restart your computer:** A simple restart can often resolve temporary glitches in your operating system's network stack.

#### ## Step 2: Clear Your Browser's DNS Cache

Chrome maintains its own internal DNS cache, separate from your operating system's cache. If this cache holds a bad entry, it can cause `ERR_NAME_NOT_RESOLVED`.
1.  Open a new tab in Chrome.
2.  Type `chrome://net-internals/#dns` into the address bar and press Enter.
3.  On the page that appears, locate and click the "**Clear host cache**" button.
4.  Close and reopen Chrome, then try accessing the website again.

#### ## Step 3: Flush Your Operating System's DNS Cache

Your operating system (Windows, macOS) also stores a local DNS cache to speed up future requests. A corrupted entry here can lead to the error.

**For Windows:**
1.  Search for "Command Prompt" in the Start menu.
2.  Right-click on "Command Prompt" and select "Run as administrator."
3.  In the Command Prompt window, type the following command and press Enter:
    `ipconfig /flushdns`
4.  You should see a confirmation message: "Successfully flushed the DNS Resolver Cache."
5.  Type `exit` and press Enter to close the Command Prompt.

**For macOS:**
1.  Open "Terminal" from Applications > Utilities.
2.  Type the following command and press Enter:
    `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
3.  You will be prompted to enter your administrator password. Type it (characters won't appear) and press Enter.
4.  No confirmation message usually appears, but the cache will be cleared.
5.  Type `exit` and press Enter to close the Terminal.

After flushing the OS DNS cache, try accessing the website in Chrome again.

#### ## Step 4: Restart Your Router and Modem

Your router and modem also maintain their own caches and can sometimes get stuck or experience temporary issues with DNS resolution.
1.  Unplug the power cables from both your internet modem (the device that connects to your ISP, usually via a cable or fiber line) and your Wi-Fi router (if it's a separate device).
2.  Wait for at least 30 seconds. This ensures all residual power drains and the devices fully reset.
3.  Plug the modem back in first and wait for all its indicator lights to stabilize (this might take a few minutes).
4.  Then, plug your router back in and wait for its lights to stabilize.
5.  Once both devices are fully powered up and connected, try accessing the website in Chrome.

#### ## Step 5: Change Your DNS Server

If your ISP's default DNS servers are unreliable, slow, or experiencing issues, switching to a public DNS server (like Google DNS or Cloudflare DNS) can often resolve `ERR_NAME_NOT_RESOLVED`.

**For Windows:**
1.  Right-click the Start button and select "Network Connections."
2.  Click "Change adapter options" or "More network adapter options."
3.  Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
4.  Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
5.  Select "Use the following DNS server addresses."
6.  Enter your preferred DNS server addresses. Popular, reliable options include:
    *   **Google DNS:** Preferred: `8.8.8.8`, Alternate: `8.8.4.4`
    *   **Cloudflare DNS:** Preferred: `1.1.1.1`, Alternate: `1.0.0.1`
7.  Click "OK" on both windows to save changes.
8.  Repeat Step 3 (flush OS DNS cache) after changing DNS servers.

**For macOS:**
1.  Go to Apple menu > System Settings (or System Preferences for older macOS).
2.  Click "Network."
3.  Select your active network connection (e.g., "Wi-Fi" or "Ethernet") from the left sidebar.
4.  Click "Details..." (or "Advanced..." for older macOS).
5.  Go to the "DNS" tab.
6.  Click the "+" button at the bottom of the "DNS Servers" list.
7.  Enter your preferred DNS server addresses (e.g., `8.8.8.8` and `8.8.4.4` for Google DNS, or `1.1.1.1` and `1.0.0.1` for Cloudflare DNS).
8.  Remove any existing DNS entries that might conflict.
9.  Click "OK" or "Apply" to save changes.
10. Repeat Step 3 (flush OS DNS cache) after changing DNS servers.

Try accessing the website again after changing DNS servers.

#### ## Step 6: Disable Proxy or VPN

Proxy servers or VPNs can sometimes interfere with DNS resolution, especially if they are misconfigured or experiencing issues.
1.  **Check Chrome's proxy settings:**
    *   Open Chrome and type `chrome://settings/system` into the address bar.
    *   Under "System," click "Open your computer's proxy settings." This will open your operating system's proxy configuration.
2.  **For Windows:**
    *   In the "Proxy" settings window, ensure "Automatically detect settings" is enabled and "Use a proxy server" is turned off, unless you specifically use one.
3.  **For macOS:**
    *   In System Settings > Network > select your active connection > Details... > Proxies, ensure no proxy is active unless necessary.
4.  **Disable your VPN:** If you are using a VPN client, temporarily disconnect from it or disable it entirely.
5.  Test the website after disabling any proxy or VPN connections.

#### ## Step 7: Reset Network Settings (Windows Only, As a Last Resort)

If all else fails on Windows, resetting your network settings can resolve deeper network configuration issues. This will reinstall network adapters and reset networking components to their original state.
1.  Go to Start > Settings > Network & Internet.
2.  Scroll down and click on "Advanced network settings."
3.  Click "Network reset."
4.  Click "Reset now" and confirm.
5.  Your computer will restart. After it reboots, you will need to reconnect to your Wi-Fi network and potentially re-enter passwords.
6.  Test the website after the network reset.

### Common Mistakes

When troubleshooting `ERR_NAME_NOT_RESOLVED`, users often make a few common mistakes that can prolong the resolution process:

1.  **Neglecting Basic Connectivity Checks:** Many users jump straight to advanced DNS troubleshooting without first confirming that their internet connection is generally working or that other websites load. This wastes time if the issue is a simple disconnect.
2.  **Only Clearing Browser Cache:** It's common to clear Chrome's cache but forget to flush the operating system's DNS cache, which is equally, if not more, critical for resolving `ERR_NAME_NOT_RESOLVED`. Both caches need to be addressed.
3.  **Not Power Cycling the Router/Modem:** Simply restarting your computer isn't enough. Your network hardware (router and modem) has its own memory and cache that can become corrupted, requiring a full power cycle to clear and reset.
4.  **Assuming the Website is Down:** While a website can indeed be down, `ERR_NAME_NOT_RESOLVED` specifically points to a DNS problem on your end, not an issue with the remote server failing to respond (which typically yields a different error like `ERR_CONNECTION_REFUSED`).

### Prevention Tips

To minimize the chances of encountering the "This Site Can't Be Reached" (`ERR_NAME_NOT_RESOLVED`) error in the future, consider implementing these best practices:

1.  **Use Reliable DNS Servers:** Instead of relying solely on your ISP's default DNS servers, consider configuring your network adapters or router to use well-known public DNS services like Google DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1). These services are often faster, more reliable, and offer better security features.
2.  **Keep Your Browser and OS Updated:** Regularly update Google Chrome and your operating system (Windows, macOS). Updates often include bug fixes, security patches, and performance improvements that can prevent network-related issues, including those affecting DNS resolution.
3.  **Periodically Clear Caches:** While not strictly necessary for prevention, routinely clearing your browser's cache and occasionally flushing your operating system's DNS cache can help prevent stale or corrupted entries from accumulating, which might otherwise lead to resolution problems.
4.  **Restart Your Router/Modem Regularly:** Much like your computer, network hardware benefits from periodic reboots. Consider restarting your router and modem once a month or whenever you notice general network sluggishness. This clears internal caches and refreshes connections, maintaining optimal performance.
5.  **Be Mindful of VPNs and Proxies:** If you use a VPN or proxy service, ensure it's from a reputable provider and properly configured. Malfunctioning or untrustworthy services can significantly interfere with your network's ability to resolve domain names correctly.