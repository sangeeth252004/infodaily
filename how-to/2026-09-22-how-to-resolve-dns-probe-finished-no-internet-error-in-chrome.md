---
title: "How to Resolve 'DNS_PROBE_FINISHED_NO_INTERNET' Error in Chrome"
date: "2026-09-22T03:22:19.835Z"
slug: "how-to-resolve-dns-probe-finished-no-internet-error-in-chrome"
type: "how-to"
description: "Learn how to fix the 'DNS_PROBE_FINISHED_NO_INTERNET' error in Chrome with this practical, step-by-step guide. Troubleshoot common causes and get back online."
keywords: "DNS_PROBE_FINISHED_NO_INTERNET, Chrome error, no internet, DNS, network troubleshooting, fix internet, browser error"
---

## Understanding the 'DNS_PROBE_FINISHED_NO_INTERNET' Error

You're trying to access a website in Google Chrome, but instead of the familiar page loading, you're met with a stark white screen and a message: "DNS_PROBE_FINISHED_NO_INTERNET." This error signifies that your browser couldn't translate a website's domain name (like `www.example.com`) into an IP address that your computer can use to connect to the server. Essentially, your computer doesn't know where to go to find the website you're trying to visit, leading to the inability to connect to the internet for that specific request.

This problem is frustrating because it often appears even when other applications on your computer or other devices on your network can access the internet just fine. The error message itself suggests a lack of internet connectivity, but the root cause usually lies deeper within your network configuration or your computer's ability to communicate with DNS servers.

## Why This Error Occurs

The "DNS_PROBE_FINISHED_NO_INTERNET" error primarily stems from a failure in the Domain Name System (DNS) resolution process. When you type a web address, your computer sends a request to a DNS server to find the corresponding IP address. If this request fails, times out, or receives an invalid response, Chrome flags it as a "DNS probe finished no internet" issue. Several factors can interrupt this process: problems with your current DNS server, outdated DNS cache on your computer, incorrect network settings, or even issues with your router or modem. In some cases, firewall or antivirus software might be inadvertently blocking DNS queries.

## Step-by-Step Solution

Here's a comprehensive approach to resolving the "DNS_PROBE_FINISHED_NO_INTERNET" error. Work through these steps sequentially; often, an earlier step will resolve the issue.

### ## Step 1: Restart Your Router and Modem

This is the most common fix for many internet-related issues, including DNS problems. Power cycling your network hardware can clear temporary glitches and re-establish a stable connection.

1.  **Unplug** the power cords from both your modem and your router.
2.  **Wait** for at least 30-60 seconds. This allows the devices to fully discharge and reset.
3.  **Plug in** the modem first and wait for its indicator lights to stabilize (usually 1-2 minutes).
4.  **Plug in** the router next and wait for its lights to stabilize.
5.  **Test** your internet connection in Chrome.

### ## Step 2: Flush Your DNS Cache

Your computer stores a local cache of recently visited websites and their IP addresses to speed up future lookups. However, this cache can become corrupted or outdated, leading to resolution errors.

*   **On Windows:**
    1.  Open the **Command Prompt** as an administrator. Search for "cmd" in the Start menu, right-click "Command Prompt," and select "Run as administrator."
    2.  Type the following command and press Enter:
        ```bash
        ipconfig /flushdns
        ```
    3.  You should see a message confirming that the DNS Resolver cache has been flushed.

*   **On macOS:**
    1.  Open **Terminal** (Applications > Utilities > Terminal).
    2.  Type the following command and press Enter (you may be prompted for your administrator password):
        ```bash
        sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
        ```
    3.  Press Enter after typing your password.

### ## Step 3: Change Your DNS Servers

Your Internet Service Provider (ISP) typically assigns DNS servers automatically. However, these servers can sometimes be slow or unreliable. Switching to public DNS servers like Google DNS or Cloudflare DNS can often improve performance and resolve connection issues.

*   **On Windows:**
    1.  Open **Network Connections**. Search for "ncpa.cpl" in the Start menu and press Enter.
    2.  **Right-click** on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select **Properties**.
    3.  In the properties window, find and select **Internet Protocol Version 4 (TCP/IPv4)**, then click **Properties**.
    4.  Select **"Use the following DNS server addresses"**.
    5.  Enter the following for Google DNS:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    6.  Click **OK** on both windows.

*   **On macOS:**
    1.  Go to **System Preferences > Network**.
    2.  Select your active network connection (e.g., Wi-Fi or Ethernet) from the left-hand list.
    3.  Click **Advanced...**.
    4.  Go to the **DNS** tab.
    5.  Click the **"+"** button under "DNS Servers" and add `8.8.8.8` and `8.8.4.4`.
    6.  Click **OK**, then **Apply**.

### ## Step 4: Reset Your TCP/IP Stack and Winsock

Corrupted network configurations can also cause DNS probe errors. Resetting these components can restore them to their default states.

*   **On Windows:**
    1.  Open the **Command Prompt** as an administrator.
    2.  Type the following commands, pressing Enter after each one:
        ```bash
        netsh winsock reset
        netsh int ip reset
        ```
    3.  After running both commands, **restart your computer**.

### ## Step 5: Disable Your VPN or Proxy Server

If you are using a Virtual Private Network (VPN) or a proxy server, it might be interfering with your DNS resolution. Temporary disable them to see if that resolves the issue.

1.  **For VPNs:** Locate your VPN application and find the option to disconnect or disable it.
2.  **For Proxy Servers:**
    *   **On Windows:** Go to Settings > Network & internet > Proxy. Toggle off "Automatically detect settings" and any manual proxy setup.
    *   **On macOS:** Go to System Preferences > Network. Select your connection, click Advanced..., then Proxies. Uncheck any selected proxy protocols.

After disabling, try accessing the website again. If it works, the VPN or proxy was the culprit.

### ## Step 6: Check Your Antivirus and Firewall Settings

Occasionally, overly aggressive antivirus or firewall software can block legitimate DNS requests. Temporarily disabling them for a short period can help diagnose if this is the cause.

1.  Locate your antivirus software and your operating system's firewall.
2.  Find the option to temporarily disable real-time protection or the firewall. **Be cautious** when doing this and re-enable them immediately after testing.
3.  Test if the website loads. If it does, you'll need to configure your antivirus/firewall to allow DNS traffic or add an exception. Consult your software's documentation for specific instructions.

### ## Step 7: Reset Chrome Settings

If none of the above steps work, the issue might be specific to Chrome's configuration. Resetting Chrome to its default settings can clear any problematic extensions or settings.

1.  Open **Google Chrome**.
2.  Click the **three vertical dots** (More) in the top-right corner.
3.  Go to **Settings**.
4.  Scroll down and click **Advanced**.
5.  Under the "Reset and clean up" section, click **Restore settings to their original defaults**.
6.  Click **Reset settings**.

## Common Mistakes

A frequent mistake when troubleshooting DNS issues is neglecting to restart network equipment. Simply flushing the DNS cache or changing servers won't always be effective if the underlying problem is a temporary glitch in your router or modem. Another common oversight is forgetting to re-enable security software after temporarily disabling it, leaving your system vulnerable. Additionally, users sometimes incorrectly assume the problem is with Chrome itself when it's actually a system-wide network configuration or hardware issue. Finally, when changing DNS servers, users might enter incorrect IP addresses, which will prevent any internet access.

## Prevention Tips

To minimize the chances of encountering the "DNS_PROBE_FINISHED_NO_INTERNET" error in the future, ensure your network hardware is kept up-to-date. Regularly restarting your router and modem, perhaps once a month, can prevent minor issues from escalating. Maintaining a clean DNS cache by periodically running the `ipconfig /flushdns` command (or its macOS equivalent) can also be beneficial, especially if you notice slower browsing speeds. Ensure your operating system's network drivers are current, as outdated drivers can sometimes lead to connectivity problems. Finally, when choosing public DNS servers, opt for reputable providers known for their speed and reliability, such as Google DNS or Cloudflare DNS, and configure them consistently across your devices.