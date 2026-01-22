---
title: "How to Diagnose and Fix the 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-01-22T15:30:57.132Z"
slug: "how-to-diagnose-and-fix-the-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "Resolve the 'DNS_PROBE_FINISHED_NXDOMAIN' error in Google Chrome with this expert guide. Learn the causes and follow step-by-step instructions to flush DNS, change DNS servers, clear caches, and restore your internet access."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, fix DNS error, NXDOMAIN, DNS probe finished, Google Chrome troubleshooting, flush DNS, change DNS server, clear browser cache"
---

### Problem Explanation

When attempting to browse the internet using Google Chrome, encountering the "DNS_PROBE_FINISHED_NXDOMAIN" error can be a frustrating roadblock. Instead of the webpage you intended to visit, Chrome displays a white page with the message "This site can't be reached" followed by "DNS_PROBE_FINISHED_NXDOMAIN" and sometimes "Check if there is a typo in [website address]." This error specifically indicates that the Domain Name System (DNS) lookup process has failed. The "NXDOMAIN" part stands for "Non-Existent Domain," which tells us that your computer's DNS resolver could not find a valid IP address for the domain name you entered, or that the domain itself genuinely does not exist or is currently unavailable on the DNS servers.

This isn't just a simple "page not found" error. It signifies a fundamental breakdown in how your browser and operating system translate human-readable website addresses (like `www.example.com`) into machine-readable IP addresses (like `192.0.2.1`) that direct you to the correct server on the internet. Without this translation, your browser has no idea where to send its request, resulting in the connection failure and the display of this specific error message.

### Why It Happens

The "DNS_PROBE_FINISHED_NXDOMAIN" error typically arises from issues within the Domain Name System resolution process. At its core, DNS acts like the internet's phonebook, translating domain names into IP addresses. When you type a website address into Chrome, your computer queries a DNS server to find the corresponding IP address. If this query fails or receives an "NXDOMAIN" response, the error occurs.

Several factors can contribute to this failure. The most common causes include an incorrectly configured DNS server on your computer or router, a corrupted DNS cache on your operating system or within Chrome itself, or temporary network glitches preventing your computer from reaching the DNS server. Less frequently, the domain you are trying to reach might genuinely be down, misspelled, or no longer registered. Furthermore, issues with your local network, such as a misbehaving router, interference from firewall or antivirus software, or conflicts with VPN/proxy settings, can also disrupt DNS resolution and trigger this specific error.

### Step-by-Step Solution

Addressing the "DNS_PROBE_FINISHED_NXDOMAIN" error often involves systematically troubleshooting your network configuration and DNS settings. Start with the simpler steps and progress to more involved ones.

#### ## Step 1: Perform Basic Connectivity and Website Checks

Before diving into complex solutions, verify the most straightforward possibilities.

1.  **Check for Typos:** Double-check the website address you entered in Chrome. A single typo can lead to an "NXDOMAIN" error.
2.  **Test Another Device/Browser:** Try accessing the same website from a different browser (e.g., Firefox, Edge) on your current device, or from another device connected to the same network (e.g., a smartphone on Wi-Fi). If the site loads elsewhere, the issue is localized to your Chrome browser or computer. If it fails on all devices, the problem likely lies with your router, internet service provider (ISP), or the website itself.
3.  **Verify Website Status:** Use an online tool (search for "is website down for everyone or just me") to confirm if the website is actually down for everyone or if it's just inaccessible from your location. This helps differentiate between a local issue and a global website problem.

#### ## Step 2: Clear Chrome's DNS Host Cache

Chrome maintains its own DNS cache to speed up page loading. A corrupted entry here can cause the error.

1.  Open a new tab in Chrome.
2.  Type `chrome://net-internals/#dns` into the address bar and press Enter.
3.  Locate the "Clear host cache" button and click it. This will clear Chrome's internal DNS cache.
4.  Restart Chrome completely by closing all windows and reopening the application.
5.  Attempt to visit the problematic website again.

#### ## Step 3: Flush Your Operating System's DNS Cache and Renew IP Address

Your operating system also maintains a DNS cache. Flushing it forces your computer to re-resolve domain names.

**For Windows:**

1.  Press `Windows Key + R`, type `cmd`, and press `Ctrl+Shift+Enter` to open Command Prompt as an administrator.
2.  In the Command Prompt window, execute the following commands one by one, pressing Enter after each:
    *   `ipconfig /flushdns` (Flushes the DNS resolver cache)
    *   `ipconfig /release` (Releases your current IP address)
    *   `ipconfig /renew` (Renews your IP address)
3.  Close the Command Prompt and restart your computer.

**For macOS:**

1.  Open Terminal (Applications > Utilities > Terminal).
2.  Execute the following command, pressing Enter:
    *   `sudo killall -HUP mDNSResponder` (You may be prompted for your administrator password).
3.  Close Terminal.

#### ## Step 4: Change Your DNS Servers

If your ISP's DNS servers are unreliable or misconfigured, switching to public DNS servers can often resolve the issue. Google Public DNS or Cloudflare DNS are popular, reliable choices.

**For Windows (using Google Public DNS as an example):**

1.  Right-click the Start button and select "Network Connections."
2.  Under "Advanced network settings," click "More network adapter options."
3.  Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
4.  Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
5.  Select "Use the following DNS server addresses."
6.  Enter the following addresses:
    *   **Preferred DNS server:** `8.8.8.8`
    *   **Alternate DNS server:** `8.8.4.4`
    *(For Cloudflare DNS, use `1.1.1.1` and `1.0.0.1`)*
7.  Click "OK" on both windows to save changes.
8.  Repeat Step 3 to flush your DNS cache and renew your IP.
9.  Restart your computer and test Chrome.

**For macOS (using Google Public DNS as an example):**

1.  Go to Apple menu > System Settings (or System Preferences for older versions).
2.  Click "Network."
3.  Select your active network connection (e.g., Wi-Fi or Ethernet) from the left sidebar and click "Details..." (or "Advanced...").
4.  Go to the "DNS" tab.
5.  Click the `+` button to add new DNS servers.
6.  Enter `8.8.8.8` and `8.8.4.4` (or `1.1.1.1` and `1.0.0.1` for Cloudflare).
7.  Drag the newly added servers to the top of the list to prioritize them.
8.  Click "OK" or "Apply" and then "Done."
9.  Repeat Step 3 to flush your DNS cache.
10. Restart your computer and test Chrome.

#### ## Step 5: Power Cycle Your Router and Modem

A simple restart of your networking equipment can clear temporary glitches and renew network connections.

1.  Unplug your modem and router from their power outlets.
2.  Wait for at least 30 seconds.
3.  Plug your modem back in and wait until its indicator lights are stable.
4.  Plug your router back in and wait until its indicator lights are stable.
5.  Once both devices are fully powered up, restart your computer and test Chrome.

#### ## Step 6: Temporarily Disable Firewall or Antivirus

Security software can sometimes interfere with network connections and DNS resolution.

1.  Temporarily disable your third-party firewall or antivirus software.
2.  Attempt to visit the website in Chrome.
3.  If the website loads, you've identified the culprit. Re-enable your security software and check its settings for an option to allow Chrome or specific network traffic. You may need to add an exception or update the software.
4.  Remember to re-enable your security software immediately after testing if it doesn't resolve the issue to protect your system.

#### ## Step 7: Check Your Hosts File

The `hosts` file on your computer can override DNS lookups. An incorrect entry for the problematic domain could be causing the error.

**For Windows:**

1.  Open Notepad as an administrator: Search for "Notepad" in the Start Menu, right-click, and select "Run as administrator."
2.  In Notepad, go to "File" > "Open."
3.  Navigate to `C:\Windows\System32\drivers\etc`.
4.  In the "File name" dropdown, change "Text Documents (*.txt)" to "All Files (*.*)".
5.  Select the `hosts` file and click "Open."
6.  Examine the file for any entries related to the website you're trying to reach. If you find a line containing the domain name, especially if it's pointing to `127.0.0.1` or an incorrect IP address, delete that entire line.
7.  Save the `hosts` file and close Notepad.
8.  Flush your DNS cache (Step 3) and restart your computer.

### Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NXDOMAIN" error, users often make a few common mistakes:

*   **Skipping Basic Checks:** Many jump straight into complex DNS settings without first confirming if the website is actually online or if a simple typo is the cause. Always perform the basic connectivity checks and ensure the domain name is spelled correctly.
*   **Forgetting to Restart:** Changes to DNS settings, clearing caches, or power cycling network hardware often require a full restart of the browser, computer, or both, for the changes to take effect. Neglecting this crucial step can lead to frustration as the issue persists despite correct configuration adjustments.
*   **Not Flushing DNS Cache:** Simply changing DNS server settings isn't always enough. Your operating system's old DNS cache might still contain the problematic entry. Flushing the cache explicitly forces your system to use the new settings immediately.
*   **Ignoring Router Issues:** The router is a critical component in your home network. Overlooking a simple router power cycle can prolong troubleshooting, as many transient network issues are resolved with a quick restart.
*   **Permanent Disabling of Security Software:** While temporarily disabling antivirus or firewall is a valid diagnostic step, forgetting to re-enable it leaves your system vulnerable. Only disable it long enough to test, and if it's the cause, properly configure an exception rather than leaving it off.

### Prevention Tips

Preventing the "DNS_PROBE_FINISHED_NXDOMAIN" error from recurring involves maintaining good network hygiene and understanding your DNS configuration.

*   **Use Reliable DNS Servers:** Instead of relying solely on your ISP's default DNS servers, consider configuring your network adapters or router to use well-known public DNS services like Google DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1). These are generally faster, more secure, and more reliable, reducing the likelihood of DNS resolution failures.
*   **Keep Your Router Firmware Updated:** Outdated router firmware can introduce bugs and performance issues, including those affecting DNS proxy services your router might provide. Regularly check your router manufacturer's website for firmware updates and install them.
*   **Regularly Clear Browser Cache:** While not always the direct cause, a bloated or corrupted browser cache can sometimes contribute to connection issues. Periodically clearing your browser's cache and cookies can help maintain smooth performance.
*   **Exercise Caution with VPNs and Proxies:** If you use a VPN or proxy service, ensure it's configured correctly and is from a reputable provider. Misconfigured or problematic VPN/proxy settings are a common cause of DNS resolution errors. If you experience issues, try disabling them temporarily to see if the problem resolves.
*   **Maintain Up-to-Date Operating System and Browser:** Keep your operating system and Google Chrome updated to their latest versions. Software updates often include bug fixes and improvements to network stack components and DNS resolution mechanisms, which can prevent such errors.