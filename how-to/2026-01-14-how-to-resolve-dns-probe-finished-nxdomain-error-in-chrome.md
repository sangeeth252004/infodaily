---
title: "How to Resolve 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-01-14T15:25:42.608Z"
slug: "how-to-resolve-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "A comprehensive guide to troubleshoot and fix the 'DNS_PROBE_FINISHED_NXDOMAIN' error in Google Chrome, covering common causes, step-by-step solutions, and prevention tips."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, DNS error fix, NXDOMAIN, internet connection problem, troubleshoot DNS, flush DNS, change DNS servers, Chrome issues"
---

The internet, while seemingly seamless, relies on a complex underlying infrastructure. One of the most critical components is the Domain Name System (DNS), which acts as the internet's phonebook, translating human-readable website names (like `google.com`) into machine-readable IP addresses (like `172.217.160.142`). When this translation process encounters a hitch, you might be met with a frustrating error in your browser, preventing you from accessing a website.

### Problem Explanation

The `DNS_PROBE_FINISHED_NXDOMAIN` error in Google Chrome is a clear indication that your browser failed to resolve the domain name of the website you're trying to reach. When this error occurs, Chrome displays a stark white page with the message "This site can't be reached" followed by "Check if there is a typo in [website address]." Below this, you'll see the specific error code `DNS_PROBE_FINISHED_NXDOMAIN`. This signifies that the DNS lookup process, which "probes" for the website's IP address, has completed but resulted in an "NXDOMAIN" status, meaning "Non-Existent Domain." It tells you that the requested domain either doesn't exist, is misspelled, or your system is unable to find its corresponding IP address.

### Why It Happens

This error primarily indicates an issue with the Domain Name System resolution process, either locally on your machine, within your network, or sometimes at the domain's server itself. The "NXDOMAIN" part of the error is crucial; it means that the DNS server you're querying explicitly reported that the domain name does not exist. This can stem from several root causes:

1.  **Incorrect or Corrupted DNS Cache**: Your operating system and browser store a local cache of previously resolved DNS queries to speed up future access. If this cache becomes corrupted or contains outdated information, it can lead to `NXDOMAIN` errors for valid websites.
2.  **Misconfigured DNS Settings**: Your computer or router might be configured to use an unreliable, slow, or incorrect DNS server. If the designated DNS server fails to respond or cannot resolve the domain, the error appears.
3.  **Network Connectivity Issues**: While less direct for an `NXDOMAIN` specifically, underlying network problems can prevent your device from reaching *any* DNS server, effectively making all domains appear non-existent.
4.  **VPN or Antivirus/Firewall Interference**: Security software or Virtual Private Networks (VPNs) often route or intercept DNS requests, and a misconfiguration or bug in these tools can block proper DNS resolution.
5.  **Server-Side Domain Issues**: Occasionally, the problem isn't with your setup at all. The website's domain might genuinely be expired, suspended, or have misconfigured DNS records at the registrar or hosting provider's end. In such cases, no one can access the site.
6.  **Hosts File Entries**: The local hosts file on your computer can manually map domain names to IP addresses. An incorrect or malicious entry in this file can redirect or block access to specific domains.

### Step-by-Step Solution

Follow these steps in the given order to systematically troubleshoot and resolve the `DNS_PROBE_FINISHED_NXDOMAIN` error.

#### ## Step 1: Check Your Internet Connection and Basic Connectivity

Before delving into complex DNS fixes, ensure your fundamental internet connection is active and stable.
1.  **Verify other websites**: Try accessing other popular websites (e.g., `google.com`, `youtube.com`) that you know are typically reliable. If you can access them, the issue might be specific to the problematic website or your DNS configuration.
2.  **Try another device**: Attempt to access the problematic website from another device connected to the same network (e.g., a smartphone or tablet via Wi-Fi). If it works on another device, the problem is likely isolated to your computer.
3.  **Ping a known IP address**: Open Command Prompt (Windows) or Terminal (macOS/Linux) and type `ping 8.8.8.8` (Google's public DNS server). If you get a reply, your basic network connectivity to external servers is working. If you see "Request timed out" or "Destination Host Unreachable," there's a more fundamental network issue.

#### ## Step 2: Clear Chrome's Host Cache and Your System's DNS Cache

Corrupted or outdated DNS cache can frequently cause this error. Clearing both the browser-specific and operating system-level caches can force a fresh DNS lookup.

1.  **Clear Chrome's Host Cache**:
    *   Open a new tab in Chrome.
    *   Type `chrome://net-internals/#dns` in the address bar and press Enter.
    *   Click the "Clear host cache" button.
2.  **Clear Your Operating System's DNS Cache**:
    *   **Windows**:
        *   Open Command Prompt as an administrator (search for `cmd`, right-click, "Run as administrator").
        *   Type `ipconfig /flushdns` and press Enter. You should see "Successfully flushed the DNS Resolver Cache."
    *   **macOS**:
        *   Open Terminal (Finder > Applications > Utilities > Terminal).
        *   Type `sudo killall -HUP mDNSResponder` and press Enter. You may be prompted for your administrator password.
    *   **Linux (systemd-resolved)**:
        *   Open Terminal.
        *   Type `sudo systemctl restart systemd-resolved` or `sudo resolvectl flush caches`.
    After clearing, restart Chrome and try accessing the website again.

#### ## Step 3: Release and Renew Your IP Address

This process can resolve local network configuration conflicts and obtain a fresh IP address and DNS server assignment from your router.

1.  **Windows**:
    *   Open Command Prompt as an administrator.
    *   Type `ipconfig /release` and press Enter. This will release your current IP address.
    *   Type `ipconfig /renew` and press Enter. This will request a new IP address.
    *   Type `ipconfig /flushdns` (again, for good measure) and press Enter.
2.  **macOS**:
    *   Go to Apple menu > System Settings (or System Preferences) > Network.
    *   Select your active network connection (e.g., Wi-Fi or Ethernet).
    *   Click "Details..." (or "Advanced...").
    *   Go to the "TCP/IP" tab.
    *   Click "Renew DHCP Lease."
After completing these steps, restart your computer and test Chrome.

#### ## Step 4: Change Your DNS Servers

If your current DNS server is unreliable or having issues, switching to a public, trustworthy DNS server can often resolve the problem. Google Public DNS and Cloudflare DNS are popular, fast, and reliable options.

1.  **Windows**:
    *   Right-click the network icon in your system tray and select "Open Network & Internet settings."
    *   Click "Change adapter options."
    *   Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    *   Select "Use the following DNS server addresses."
    *   Enter the preferred and alternate DNS server addresses:
        *   **Google DNS**: Preferred: `8.8.8.8`, Alternate: `8.8.4.4`
        *   **Cloudflare DNS**: Preferred: `1.1.1.1`, Alternate: `1.0.0.1`
    *   Click "OK" twice to save changes.
2.  **macOS**:
    *   Go to Apple menu > System Settings (or System Preferences) > Network.
    *   Select your active network connection and click "Details..." (or "Advanced...").
    *   Go to the "DNS" tab.
    *   Click the `+` button to add new DNS servers.
    *   Enter your chosen DNS servers (e.g., `8.8.8.8`, `8.8.4.4` or `1.1.1.1`, `1.0.0.1`).
    *   Remove any old or problematic DNS entries.
    *   Click "OK" or "Apply" to save changes.
After changing DNS servers, clear your DNS cache (Step 2) again and restart your browser.

#### ## Step 5: Temporarily Disable VPN, Antivirus, and Firewall

Security software or VPN clients can sometimes interfere with network connections and DNS resolution by intercepting or rerouting traffic.

1.  **Disable VPN**: If you are using a VPN, disconnect from it or temporarily disable the client.
2.  **Disable Antivirus/Firewall**: Temporarily disable your antivirus software and any third-party firewalls. Be cautious when doing this and re-enable them immediately after testing to ensure your system remains protected.
After disabling, test if the website loads. If it does, re-enable them one by one to identify the culprit and adjust its settings accordingly.

#### ## Step 6: Reset Your Router/Modem

A simple power cycle of your network hardware can often resolve a surprising array of network issues, including DNS problems. It clears the router's internal cache and resets its network configuration.

1.  Locate your internet router and modem (they might be combined into one device).
2.  Unplug the power cable from both devices.
3.  Wait for at least 30 seconds to a full minute.
4.  Plug the modem back in first and wait for all its indicator lights to stabilize.
5.  Plug the router back in and wait for its lights to stabilize as well.
Once your network is fully back online, try accessing the website in Chrome.

#### ## Step 7: Check Your Hosts File (Advanced)

The hosts file is a local plain-text file that maps hostnames to IP addresses. It's consulted *before* DNS servers. Sometimes, malicious software or user error can add incorrect entries that prevent access to websites.

1.  **Windows**:
    *   Navigate to `C:\Windows\System32\drivers\etc`.
    *   Right-click on the `hosts` file and choose "Open with" > "Notepad."
    *   Carefully review the file. Any lines starting with a `#` are comments and can be ignored. Look for entries that manually map a domain to an IP address (e.g., `127.0.0.1 example.com`).
    *   If you find suspicious entries related to the website you're trying to access, you can delete them. Save the file. (You might need to copy it to your desktop, edit it, then replace the original file, requiring administrator privileges).
2.  **macOS/Linux**:
    *   Open Terminal.
    *   Type `sudo nano /etc/hosts` and press Enter. You'll need your administrator password.
    *   Review and modify the file similarly to Windows.
    *   Press `Ctrl+X`, then `Y` (for yes), then Enter to save and exit.
Be extremely careful when editing the hosts file, as incorrect changes can prevent access to other legitimate websites. If you're unsure, it's safer to comment out suspicious lines by adding a `#` at the beginning rather than deleting them.

### Common Mistakes

When troubleshooting `DNS_PROBE_FINISHED_NXDOMAIN`, users often make a few common errors that hinder quick resolution:

1.  **Not Restarting After Changes**: Many network and DNS changes require a browser restart, an application restart, or even a full system reboot to take effect. Simply closing the error page and trying again is often insufficient.
2.  **Assuming the Problem is Always Local**: While many DNS issues are local, it's crucial to consider that the website you're trying to reach might genuinely be down or have its own DNS issues. Quickly checking status pages or trying from another network can rule this out.
3.  **Making Too Many Changes at Once**: If you change your DNS servers, flush the cache, and reset your router all at once without testing after each step, it becomes difficult to pinpoint which action actually fixed the problem, or if one of them introduced a new issue.
4.  **Overlooking Router DNS Settings**: Many users change DNS settings only on their computer, forgetting that the router itself often acts as a DNS forwarder for all devices on the network. If the router's DNS settings are incorrect, all devices connected to it might experience issues.

### Prevention Tips

To minimize the likelihood of encountering the `DNS_PROBE_FINISHED_NXDOMAIN` error in the future, consider these best practices:

1.  **Use Reliable DNS Servers**: Configure your devices and router to use well-known, public DNS servers like Google DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1). These are generally faster, more secure, and more reliable than those provided by some ISPs.
2.  **Keep Software Updated**: Regularly update your operating system, browser, and network drivers. Updates often include bug fixes for network-related issues and improvements to DNS handling.
3.  **Regularly Clear Browser Data**: While not a daily necessity, periodically clearing your browser's cache, cookies, and host cache can prevent accumulated corrupt data from causing issues.
4.  **Monitor VPN/Antivirus Settings**: If you use a VPN or advanced security software, ensure their network and DNS settings are correctly configured and not overly aggressive, which could inadvertently block legitimate DNS queries.
5.  **Reboot Your Router Periodically**: A monthly or bi-monthly power cycle of your router can help clear its internal cache and resolve minor network glitches before they escalate into noticeable errors.
6.  **Avoid Unofficial Hosts File Edits**: Unless you specifically know why you're editing it, avoid making manual changes to your hosts file. Malicious software can sometimes alter this file, so a routine scan with reputable antivirus software can help.