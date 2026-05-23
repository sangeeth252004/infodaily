---
title: "How to Resolve 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-05-23T11:09:59.734Z"
slug: "how-to-resolve-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "Troubleshoot and fix the 'DNS_PROBE_FINISHED_NXDOMAIN' error in Google Chrome with this step-by-step guide. Learn common causes, solutions, and prevention tips for non-existent domain issues."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, DNS error fix, NXDOMAIN, domain name resolution, network troubleshooting, flush DNS, change DNS server, hosts file, Chrome network error"
---

The `DNS_PROBE_FINISHED_NXDOMAIN` error is a common networking issue encountered by users of Google Chrome. When this error appears, it signifies that the browser failed to connect to the website you were trying to reach because the Domain Name System (DNS) could not resolve the domain name. Essentially, your computer was unable to translate the human-readable website address (like `example.com`) into an IP address that computers use to locate each other on the internet.

When you encounter `DNS_PROBE_FINISHED_NXDOMAIN`, Chrome typically displays a page with the message "This site can't be reached" followed by "DNS_PROBE_FINISHED_NXDOMAIN". This indicates a fundamental problem with how your system or network is handling domain name lookups, preventing any further communication with the target server. It's distinct from a server being down, as the DNS query itself is failing or returning a "non-existent domain" response.

### Why It Happens

This error primarily occurs because your system or network's DNS resolver, or the DNS server it's querying, reports that the requested domain name does not exist (`NXDOMAIN` stands for "Non-Existent Domain"). Multiple factors can contribute to this issue. It could stem from a temporary glitch with your internet service provider's (ISP) DNS servers, an incorrectly configured DNS setting on your computer or router, or a corrupted DNS cache on your browser or operating system.

Other potential causes include network connectivity problems, interference from a firewall or antivirus software blocking DNS requests, an entry in your local `hosts` file redirecting the domain incorrectly, or even a simple typo in the domain name itself. In rarer cases, the domain genuinely might not exist, might have expired, or its DNS records might be incorrectly configured at the domain registrar level, but usually, the problem lies closer to the user's end.

### Step-by-Step Solution

Follow these steps methodically to diagnose and resolve the `DNS_PROBE_FINISHED_NXDOMAIN` error.

#### ## Step 1: Verify Network Connectivity and Power Cycle Router/Modem

Before delving into complex fixes, ensure your internet connection is stable.
1.  **Check other websites:** Try accessing several other well-known websites (e.g., google.com, youtube.com). If they also fail, the issue is likely with your general internet connection.
2.  **Check other devices:** See if other devices (smartphone, tablet) connected to the same network can access the problematic website. This helps narrow down if the problem is specific to your computer or the entire network.
3.  **Power Cycle Your Router/Modem:**
    *   Disconnect the power cable from your internet modem and Wi-Fi router.
    *   Wait for at least 30 seconds.
    *   Reconnect the power cable to your modem first, wait for it to fully boot up (all indicator lights stable).
    *   Then, reconnect the power cable to your router and wait for it to boot up.
    *   Restart your computer after the network devices are fully online.

#### ## Step 2: Clear Chrome's Host Cache

Chrome maintains its own DNS cache. A corrupted entry here can lead to `NXDOMAIN` errors for specific sites.
1.  Open Google Chrome.
2.  Type `chrome://net-internals/#dns` into the address bar and press Enter.
3.  On the page that appears, locate and click the "**Clear host cache**" button.
4.  Optionally, clear your general browser cache and cookies. Press `Ctrl+Shift+Delete` (Windows/Linux) or `Cmd+Shift+Delete` (macOS), select "All time" for the time range, ensure "Cached images and files" and "Cookies and other site data" are checked, and click "Clear data".

#### ## Step 3: Flush DNS Cache and Renew IP on Operating System

Your operating system also maintains a DNS cache. Flushing it forces your system to request new DNS information.
1.  **For Windows:**
    *   Press `Win + R`, type `cmd`, and press `Ctrl+Shift+Enter` to open Command Prompt as an administrator.
    *   Execute the following commands in order, pressing Enter after each:
        ```cmd
        ipconfig /flushdns
        ipconfig /release
        ipconfig /renew
        ```
    *   Reboot your computer after executing these commands.
2.  **For macOS:**
    *   Open Terminal (Finder > Applications > Utilities > Terminal).
    *   Execute the following command, then enter your administrator password when prompted:
        ```bash
        sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
        ```
3.  **For Linux:**
    *   The command varies by distribution. Common commands include:
        ```bash
        sudo systemctl restart NetworkManager
        sudo /etc/init.d/nscd restart
        ```
    *   If using `systemd-resolved`:
        ```bash
        sudo resolvectl flush caches
        ```

#### ## Step 4: Change DNS Server Settings

Your ISP's default DNS servers might be slow, unreliable, or experiencing issues. Switching to public DNS servers like Google DNS or Cloudflare DNS can often resolve the problem.
1.  **For Windows:**
    *   Right-click the Start button and select "Network Connections" or navigate to "Settings" > "Network & Internet" > "Change adapter options".
    *   Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties".
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties".
    *   Choose "Use the following DNS server addresses".
    *   Enter Google's DNS servers:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   Alternatively, use Cloudflare's DNS:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" and then "Close". Restart your browser.
2.  **For macOS:**
    *   Go to "System Settings" (or "System Preferences" on older macOS).
    *   Click "Network".
    *   Select your active network connection (e.g., Wi-Fi or Ethernet) from the sidebar.
    *   Click the "Details..." button (or "Advanced..." on older macOS).
    *   Go to the "DNS" tab.
    *   Click the `+` button to add new DNS servers. Add `8.8.8.8` and `8.8.4.4` (or `1.1.1.1` and `1.0.0.1`).
    *   Drag these new entries to the top of the list to prioritize them.
    *   Click "OK" and then "Apply".

#### ## Step 5: Inspect the `hosts` File

The `hosts` file is a local DNS resolver. If an entry for the problematic domain is present and incorrect, it can cause the `NXDOMAIN` error.
1.  **For Windows:**
    *   Open Notepad as an administrator (Search for "Notepad", right-click, "Run as administrator").
    *   In Notepad, go to `File > Open`.
    *   Navigate to `C:\Windows\System32\drivers\etc`.
    *   Change the "Files of type" dropdown from "Text Documents (*.txt)" to "All Files (*.*)".
    *   Select and open the `hosts` file.
    *   Review the contents. Look for any lines that contain the domain name you're having trouble with. If found, and it's pointing to an incorrect IP address or a loopback address (`127.0.0.1`), delete or comment out that line by adding a `#` at the beginning.
    *   Save the file and try accessing the website again.
2.  **For macOS/Linux:**
    *   Open Terminal.
    *   Type `sudo nano /etc/hosts` and press Enter. Enter your password.
    *   Review the file for any suspicious entries related to your problematic domain.
    *   Delete or comment out any problematic lines.
    *   Press `Ctrl+X`, then `Y` to save, then Enter to exit.

#### ## Step 6: Temporarily Disable Firewall/Antivirus

Security software can sometimes interfere with DNS queries, blocking legitimate network traffic.
1.  Temporarily disable your third-party antivirus software.
2.  Temporarily disable Windows Defender Firewall (or your macOS firewall):
    *   **Windows:** Go to `Settings > Update & Security > Windows Security > Firewall & network protection`. Click on your active network profile and toggle "Microsoft Defender Firewall" to "Off".
    *   **macOS:** Go to `System Settings > Network > Firewall` and toggle it off.
3.  Test if the website loads.
4.  **Crucially, re-enable your firewall and antivirus immediately after testing** to maintain system security. If disabling them fixes the issue, configure your security software to allow DNS traffic (typically UDP port 53) or add an exception for Chrome.

#### ## Step 7: Reset Network Stack (Windows Specific)

If previous steps fail on Windows, resetting the entire network stack can resolve underlying corruption.
1.  Open Command Prompt as an administrator (see Step 3).
2.  Execute the following commands, pressing Enter after each:
    ```cmd
    netsh winsock reset
    netsh int ip reset
    ipconfig /release
    ipconfig /renew
    ipconfig /flushdns
    ```
3.  **Important:** Restart your computer immediately after running these commands.

### Common Mistakes

When troubleshooting `DNS_PROBE_FINISHED_NXDOMAIN`, users frequently make a few common errors:
1.  **Overlooking Basic Connectivity:** Assuming the problem is complex without first verifying a stable internet connection or power cycling the router. A simple network hiccup is often the culprit.
2.  **Incomplete Cache Clearing:** Only clearing the browser cache, but neglecting to flush the operating system's DNS cache. Both caches can harbor outdated or corrupted DNS records.
3.  **Incorrect DNS Server Configuration:** Typing DNS server addresses incorrectly, or failing to save and apply the changes to the network adapter properties.
4.  **Misinterpreting the `hosts` File:** Deleting legitimate entries or incorrectly modifying the `hosts` file without understanding its purpose, which can lead to new connectivity issues. Always make a backup or comment out lines instead of deleting immediately.
5.  **Forgetting to Re-enable Security:** Temporarily disabling firewalls or antivirus software for testing but forgetting to re-enable them, leaving the system vulnerable.

### Prevention Tips

Proactive measures can help minimize the occurrence of `DNS_PROBE_FINISHED_NXDOMAIN` and similar network errors:
1.  **Use Reliable DNS Servers:** Configure your router or individual devices to use reputable, public DNS servers like Google DNS (`8.8.8.8`, `8.8.4.4`) or Cloudflare DNS (`1.1.1.1`, `1.0.0.1`). These are generally faster and more reliable than many ISP-provided DNS servers.
2.  **Keep Software Updated:** Regularly update your operating system, web browser (especially Chrome), and network drivers. Updates often include fixes for network-related bugs and improvements to DNS resolution.
3.  **Regular Network Device Maintenance:** Periodically power cycle your router and modem, perhaps once a month or if you notice any unusual network behavior. This clears their internal caches and refreshes their connection.
4.  **Practice Good Digital Hygiene:** Be cautious when installing new software or browser extensions, as some can interfere with network settings or even modify your `hosts` file without explicit permission.
5.  **Verify Domain Spelling:** Always double-check the spelling of domain names, especially for less common websites. A single typo can result in an `NXDOMAIN` error.