---
title: "How to Fix 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-09-27T03:44:28.586Z"
slug: "how-to-fix-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "A comprehensive guide to troubleshoot and resolve the 'DNS_PROBE_FINISHED_NXDOMAIN' error in Google Chrome, covering common causes and step-by-step solutions."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, DNS fix, NXDOMAIN, browser error, internet connection problem, DNS cache, network troubleshooting"
---

## Problem Explanation

The "DNS_PROBE_FINISHED_NXDOMAIN" error is a common internet browsing issue encountered by Google Chrome users. When this error appears, the browser typically displays a message stating, "This site can't be reached," accompanied by "DNS_PROBE_FINISHED_NXDOMAIN" and sometimes "The webpage at [URL] might be temporarily down or it may have moved permanently to a new web address." This specific error indicates that the browser failed to resolve the domain name system (DNS) query for the requested website. Essentially, your browser couldn't translate the human-readable web address (like `google.com`) into its corresponding machine-readable IP address.

The "NXDOMAIN" portion of the error stands for "Non-Existent Domain." It means that after probing the DNS servers, no valid IP address was found for the domain you tried to access. While it might seem like a simple internet connection problem, this error points specifically to a breakdown in the DNS resolution process, rather than a complete lack of connectivity. You might still be able to access other websites, or even use other internet-dependent applications, making the issue isolated to certain domain lookups.

## Why It Happens

The Domain Name System (DNS) acts as the internet's phonebook, translating domain names into IP addresses that computers use to identify each other on the network. When you type a URL into your browser, a DNS query is sent to a DNS server, which then provides the corresponding IP address for the website. The "DNS_PROBE_FINISHED_NXDOMAIN" error occurs when this critical translation process fails.

Several root causes can lead to this failure. The most common involve issues with your local DNS cache, which might contain outdated or corrupted records. Incorrect or unreliable DNS server settings, either on your computer, your router, or provided by your Internet Service Provider (ISP), are frequent culprits. Additionally, interference from firewalls, antivirus software, VPNs, or proxy settings can obstruct DNS queries. Less common but still possible causes include typos in the URL, the website genuinely being down or having an expired domain, or broader network configuration problems on your local machine.

## Step-by-Step Solution

### Step 1: Verify URL and Perform Basic Checks

Before delving into complex network configurations, ensure the simplest explanations are ruled out.
1.  **Check the URL:** Carefully examine the website address in the Chrome address bar for any typos, incorrect characters, or missing parts. A single character difference can lead to a "Non-Existent Domain" error.
2.  **Try a Different Browser or Device:** Attempt to access the same website using a different web browser (e.g., Firefox, Edge, Safari) or another device connected to the same network (e.g., a smartphone or tablet). If it works elsewhere, the issue is likely specific to your Chrome browser or computer's configuration. If it fails on all devices, the problem might be with your network, router, or the website itself.
3.  **Restart Chrome and Your Computer:** A simple restart can often clear temporary glitches. Close all Chrome windows, then relaunch the browser. If the error persists, restart your entire computer.

### Step 2: Flush Your Local DNS Cache

Your operating system maintains a local cache of DNS records to speed up website loading. If this cache becomes corrupted or outdated, it can lead to "NXDOMAIN" errors.
1.  **For Windows:**
    *   Press `Windows Key + R`, type `cmd`, and press `Ctrl + Shift + Enter` to open Command Prompt as an administrator.
    *   Execute the following commands one by one, pressing `Enter` after each:
        *   `ipconfig /flushdns` (Clears the DNS resolver cache.)
        *   `ipconfig /registerdns` (Refreshes all DHCP leases and re-registers DNS names.)
        *   `ipconfig /release` (Releases the current IP address.)
        *   `ipconfig /renew` (Renews the IP address.)
        *   `netsh int ip reset` (Resets the TCP/IP stack.)
        *   `netsh winsock reset` (Resets the Winsock Catalog.)
    *   Restart your computer after running these commands for changes to take full effect.
2.  **For macOS:**
    *   Open Terminal (Go > Utilities > Terminal).
    *   Execute the appropriate command for your macOS version:
        *   `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` (for macOS 10.10.4 and later)
        *   `sudo killall -HUP mDNSResponder` (for macOS 10.10 to 10.10.3)
        *   `sudo discoveryutil udnsflushcaches` (for macOS 10.9)
        *   `sudo dscacheutil -flushcache` (for macOS 10.7 and 10.8)
    *   Enter your administrator password when prompted.

### Step 3: Change Your DNS Server Settings

Your computer defaults to using DNS servers provided by your ISP, which can sometimes be unreliable or slow. Switching to public DNS servers like Google DNS or Cloudflare DNS can resolve many DNS-related issues.
1.  **For Windows:**
    *   Right-click the Start button and select `Network Connections`.
    *   Click `Change adapter options`.
    *   Right-click on your active network adapter (e.g., `Ethernet` or `Wi-Fi`) and select `Properties`.
    *   Select `Internet Protocol Version 4 (TCP/IPv4)` and click `Properties`.
    *   Select `Use the following DNS server addresses`.
    *   Enter `8.8.8.8` as the `Preferred DNS server` and `8.8.4.4` as the `Alternate DNS server` (for Google DNS). Alternatively, use Cloudflare DNS: `1.1.1.1` (Preferred) and `1.0.0.1` (Alternate).
    *   Click `OK` twice to save changes.
2.  **For macOS:**
    *   Go to `System Settings` (or `System Preferences` on older versions).
    *   Click `Network`.
    *   Select your active network connection (e.g., `Wi-Fi` or `Ethernet`) and click `Details` (or `Advanced`).
    *   Go to the `DNS` tab.
    *   Click the `+` button to add new DNS servers.
    *   Enter `8.8.8.8` and `8.8.4.4` (or `1.1.1.1` and `1.0.0.1`).
    *   Click `OK` and then `Apply`.

### Step 4: Reset Chrome's Network Settings

Chrome has its own internal network configuration that can sometimes cause issues.
1.  Open Chrome.
2.  Type `chrome://net-internals/#dns` into the address bar and press `Enter`.
3.  Click the `Clear host cache` button.
4.  Restart Chrome. This clears Chrome's internal DNS cache.

### Step 5: Temporarily Disable Firewall and Antivirus

Security software can sometimes mistakenly block legitimate DNS queries, leading to "NXDOMAIN" errors.
1.  **Disable your computer's firewall:**
    *   **Windows:** Go to `Start > Settings > Privacy & security > Windows Security > Firewall & network protection`. Click on your active network and toggle `Microsoft Defender Firewall` to `Off`.
    *   **Third-party firewalls:** Refer to your specific software's documentation to disable it temporarily.
2.  **Disable your antivirus software:** Most antivirus programs have a system tray icon (bottom-right of the screen on Windows) where you can right-click and select an option to temporarily disable protection.
3.  **Test the website:** After disabling, try accessing the problematic website.
4.  **Re-enable immediately:** If the issue is resolved, re-enable your firewall and antivirus. You may need to investigate your security software's settings to create an exception or reconfigure it to allow DNS traffic.

### Step 6: Power Cycle Your Router

Your router also maintains its own DNS cache and can experience configuration issues. A simple restart can often resolve these.
1.  **Unplug the power cable** from your router.
2.  **Wait for at least 30 seconds** to ensure all residual power drains.
3.  **Plug the power cable back in.**
4.  **Wait for the router to fully boot up** (indicated by stable indicator lights), which can take a few minutes.
5.  Try accessing the website again.

### Step 7: Disable VPN or Proxy Services

If you are using a Virtual Private Network (VPN) or a proxy server, these services route your internet traffic through their own servers, potentially interfering with DNS resolution.
1.  **Disable your VPN client:** Most VPN applications have a clear "Disconnect" or "Disable" option.
2.  **Disable proxy settings:**
    *   **Windows:** Go to `Start > Settings > Network & Internet > Proxy`. Ensure `Automatically detect settings` is off and `Use a proxy server` is off.
    *   **macOS:** Go to `System Settings > Network > select your active connection > Details > Proxies`. Uncheck any active proxy protocols.
3.  Test the website after disabling these services. If it resolves the issue, you may need to reconfigure your VPN/proxy or contact their support.

## Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NXDOMAIN" error, users often make several key mistakes. A common oversight is failing to properly check for typos in the URL; even a minor error can cause an NXDOMAIN response. Another frequent mistake is not restarting the browser or the entire computer after applying DNS or network configuration changes. Many network adjustments, especially those involving `ipconfig` or `netsh` commands, require a system reboot to take full effect.

Users might also neglect to check if the website itself is genuinely down or if the domain has expired by using external tools or attempting access from another network. Overlooking router-level DNS issues, assuming the problem is always client-side, is another pitfall. Lastly, some users might temporarily disable security software without remembering to re-enable it, leaving their system vulnerable, or they might make changes to the wrong network adapter if multiple are present.

## Prevention Tips

To minimize the chances of encountering the "DNS_PROBE_FINISHED_NXDOMAIN" error in the future, adopt the following best practices:
1.  **Use Reliable DNS Servers:** Configure your operating system and, if possible, your router to use widely respected and fast public DNS servers like Google DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1). These are generally more reliable and performant than default ISP DNS servers.
2.  **Keep Network Drivers Updated:** Ensure your network adapter drivers are always up-to-date. Outdated drivers can lead to various connectivity and DNS resolution issues.
3.  **Regularly Clear Browser Cache:** While not always the direct cause of NXDOMAIN, routinely clearing your browser's cache and cookies can prevent accumulated data from interfering with web processes.
4.  **Configure Security Software Correctly:** Ensure your firewall and antivirus programs are properly configured to allow necessary DNS traffic. If you encounter issues after installing new security software, review its settings.
5.  **Be Mindful of VPN/Proxy Use:** If you use VPNs or proxy servers, ensure they are from reputable providers and are configured correctly. Be aware that switching servers or providers can sometimes lead to temporary DNS issues.
6.  **Periodic Router Reboot:** Occasionally power cycle your router. This clears its internal cache and can refresh network connections, preventing many intermittent issues.