---
title: "How to Fix \"DNS_PROBE_FINISHED_NXDOMAIN\" Error in Chrome"
date: "2026-02-09T15:55:26.682Z"
slug: "how-to-fix-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "A comprehensive guide to fixing the \"DNS_PROBE_FINISHED_NXDOMAIN\" error in Google Chrome. Learn the causes and step-by-step solutions to restore internet access."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, fix DNS error, NXDOMAIN, DNS resolution failed, browser error, internet connectivity, DNS settings, flush DNS"
---

## Problem Explanation

The "DNS_PROBE_FINISHED_NXDOMAIN" error is a common internet connectivity issue encountered by Google Chrome users. When this error appears, your browser window displays a message stating "This site can't be reached" or "This webpage is not available," accompanied by the specific error code "DNS_PROBE_FINISHED_NXDOMAIN." Crucially, the website you attempted to visit fails to load, preventing you from accessing its content. This indicates a problem in the process of translating a human-readable domain name (like `google.com`) into a machine-readable IP address (like `172.217.160.142`).

What you see is a dead-end browser page, often with an illustration of a broken puzzle piece or an inaccessible website, making it clear that your request to reach the server for the specified domain has failed at a fundamental level. While other websites might load correctly, this specific error points to a failure in the Domain Name System (DNS) resolution for the particular site you are trying to reach, or a broader issue with how your system communicates with DNS servers.

## Why It Happens

This error occurs when your computer, or more specifically its DNS client, cannot successfully translate the domain name you've entered into an IP address that the web server hosting the website understands. DNS (Domain Name System) acts like an internet phonebook, matching domain names to IP addresses. When you type a website address, your browser sends a request to a DNS resolver (usually managed by your Internet Service Provider, or ISP). The "NXDOMAIN" part of the error stands for "Non-Existent Domain," meaning the DNS resolver either couldn't find an IP address for the domain you requested or couldn't reach a DNS server that could provide this information.

Several factors can lead to this failure. The most common causes include: issues with your local DNS cache (both within Chrome and your operating system), incorrect or unresponsive DNS server settings, network connectivity problems (e.g., router malfunction, Wi-Fi issues), interference from VPNs or proxy servers, firewall restrictions, or even a genuinely non-existent or temporarily offline domain name. Sometimes, the problem lies with your ISP's DNS servers experiencing a temporary outage or configuration issue, preventing them from resolving domain names correctly.

## Step-by-Step Solution

### Step 1: Check Basic Connectivity and Website Status

Before diving into complex solutions, verify the basics.

1.  **Check your internet connection:**
    *   Try opening other well-known websites (e.g., `google.com`, `wikipedia.org`) to see if the issue is isolated to one site or a broader internet problem.
    *   If no websites load, restart your router and modem. Unplug them from power for 30 seconds, then plug them back in and wait for them to fully reboot.
2.  **Verify the website isn't actually down:**
    *   Use an online tool like `downforeveryoneorjustme.com` to check if the specific website you're trying to reach is down for everyone or just you. If it's down for everyone, the problem is with the website, not your connection.
3.  **Check for typos:**
    *   Ensure you have typed the website address correctly in the Chrome address bar. A simple typo can result in a "NXDOMAIN" error.

### Step 2: Clear Chrome's Internal DNS Cache

Chrome maintains its own internal DNS cache, which can sometimes become stale or corrupted, leading to resolution errors.

1.  Open a new tab in Google Chrome.
2.  Type `chrome://net-internals/#dns` into the address bar and press Enter.
3.  On the page that appears, locate and click the "**Clear host cache**" button.
4.  Restart Chrome completely by closing all windows and reopening the browser.
5.  Try accessing the problematic website again.

### Step 3: Flush DNS Resolver Cache and Renew IP Address

Your operating system also maintains a DNS resolver cache. Flushing this cache forces your computer to request fresh DNS information, while renewing your IP address can resolve network configuration issues.

#### For Windows:

1.  Press `Windows Key + R` to open the Run dialog.
2.  Type `cmd` and press `Ctrl + Shift + Enter` to open Command Prompt as an administrator.
3.  Execute the following commands one by one, pressing Enter after each:
    ```cmd
    ipconfig /flushdns
    ipconfig /registerdns
    ipconfig /release
    ipconfig /renew
    netsh winsock reset
    ```
4.  Restart your computer after running all commands.

#### For macOS:

1.  Open Terminal from `Applications > Utilities > Terminal`.
2.  Execute the appropriate command for your macOS version:
    *   **macOS Sierra, High Sierra, Mojave, Catalina, Big Sur, Monterey, Ventura, Sonoma:**
        ```bash
        sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
        ```
    *   (Enter your administrator password when prompted.)
3.  Restart your computer.

### Step 4: Change Your DNS Servers

Your ISP's default DNS servers might be slow, unreliable, or misconfigured. Switching to public DNS servers like Google DNS or Cloudflare DNS can often resolve this.

#### For Windows:

1.  Press `Windows Key + R`, type `ncpa.cpl`, and press Enter to open Network Connections.
2.  Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
3.  Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
4.  Select "Use the following DNS server addresses."
5.  Enter the preferred and alternate DNS server addresses:
    *   **Google DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
6.  Click "OK" twice to save the changes.
7.  Repeat Step 3 to flush the DNS cache and restart your computer.

#### For macOS:

1.  Go to `Apple menu > System Settings` (or `System Preferences` on older versions).
2.  Click "Network."
3.  Select your active network connection (e.g., Wi-Fi or Ethernet) from the left sidebar and click "Details..." (or "Advanced...").
4.  Go to the "DNS" tab.
5.  Click the `+` button under "DNS Servers" to add new servers.
    *   Add `8.8.8.8` and `8.8.4.4` (for Google DNS) or `1.1.1.1` and `1.0.0.1` (for Cloudflare DNS).
6.  Click "OK" and then "Apply" to save changes.
7.  Repeat Step 3 to flush the DNS cache and restart your computer.

### Step 5: Disable VPN/Proxy and Check Firewall

VPNs or proxy servers can sometimes interfere with DNS resolution, redirecting traffic through misconfigured servers. Similarly, a firewall might be blocking DNS requests.

1.  **Disable VPN/Proxy:** Temporarily disable any VPN software or proxy settings you are using.
    *   **Chrome Proxy Settings:** Go to `Chrome Menu > Settings > System > Open your computer's proxy settings`. Ensure "Use a proxy server" is off or "Automatically detect settings" is enabled, unless you specifically require a proxy.
2.  **Check Firewall:**
    *   Temporarily disable your third-party firewall (if you have one) or Windows Defender Firewall to see if it resolves the issue.
    *   Remember to re-enable your firewall after testing for security reasons. If disabling it fixes the problem, you'll need to configure your firewall to allow DNS traffic (usually UDP port 53).

### Step 6: Reset Network Settings (Windows Only)

If previous steps haven't worked, resetting your network components to their default settings can resolve deeper configuration issues.

1.  Go to `Settings > Network & Internet > Advanced network settings` (or `Network & Internet > Status` on older Windows versions).
2.  Click "Network reset."
3.  Click "Reset now" and confirm the action.
4.  Your computer will restart. You will need to reconnect to your Wi-Fi networks and re-enter passwords.

### Step 7: Check Router DNS Settings and Firmware

Your router might be using its own set of DNS servers, or its firmware could be outdated, causing resolution problems.

1.  **Access Router Settings:** Open a web browser and type your router's IP address (commonly `192.168.1.1` or `192.168.0.1`) into the address bar. Enter your router's admin credentials.
2.  **Check DNS Configuration:** Look for a "DNS" or "WAN Settings" section. You can try manually setting the DNS servers on your router to public DNS (e.g., Google DNS `8.8.8.8`, `8.8.4.4`) instead of "Get automatically from ISP." Save changes and reboot the router.
3.  **Update Firmware:** Check your router manufacturer's website for firmware updates. Outdated firmware can cause various network instabilities. Follow their instructions carefully to update.

## Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NXDOMAIN" error, users often make a few common mistakes:

1.  **Skipping Basic Checks:** Many jump straight to flushing DNS or changing server settings without first verifying internet connectivity or ruling out a website being genuinely offline. Always start with the simplest checks.
2.  **Only Clearing Chrome's Cache:** While clearing Chrome's internal DNS cache is a good first step, it often doesn't address underlying OS-level or network-wide DNS issues. The operating system's DNS resolver cache (`ipconfig /flushdns`) is equally, if not more, important.
3.  **Incorrectly Entering DNS Server Addresses:** When manually configuring DNS servers, misremembering or mistyping IP addresses (e.g., `8.8.8.0` instead of `8.8.8.8`) will inevitably lead to more connectivity problems. Double-check the numbers carefully.
4.  **Forgetting to Restart:** After making significant changes to network settings or flushing caches, a full system restart is often crucial to apply the changes correctly. Simply closing and reopening Chrome is usually not enough for OS-level changes.
5.  **Ignoring VPN/Proxy Interference:** Users sometimes forget they have a VPN or proxy service enabled, which can override local DNS settings and direct traffic through problematic servers.

## Prevention Tips

Preventing the "DNS_PROBE_FINISHED_NXDOMAIN" error largely involves maintaining healthy network configurations and being aware of potential interference.

1.  **Use Reliable DNS Servers:** Instead of relying solely on your ISP's default DNS, consider configuring your network adapters (and potentially your router) to use reputable public DNS servers like Google DNS (`8.8.8.8`, `8.8.4.4`) or Cloudflare DNS (`1.1.1.1`, `1.0.0.1`). These are generally faster, more secure, and more reliable.
2.  **Regularly Clear Caches:** While not necessary daily, if you frequently encounter connectivity issues, occasionally flushing your operating system's DNS cache and Chrome's host cache can prevent stale entries from causing problems. This ensures your system always fetches the freshest DNS records.
3.  **Keep Software Updated:** Ensure your operating system, web browser (Chrome), and router firmware are kept up-to-date. Updates often include fixes for network-related bugs and improvements to DNS handling.
4.  **Review Network Configurations:** Be mindful of changes to your network settings. If you install new network-related software (VPNs, proxies, firewalls), understand how they might interact with your DNS resolution and adjust their settings if conflicts arise.
5.  **Maintain Router Health:** Periodically restart your router and modem. This clears their internal caches and can resolve minor network glitches before they escalate into significant errors.