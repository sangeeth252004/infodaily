---
title: "How to Resolve 'ERR_NAME_NOT_RESOLVED' Error in Chrome"
date: "2026-10-08T04:34:38.682Z"
slug: "how-to-resolve-err-name-not-resolved-error-in-chrome"
type: "how-to"
description: "Expert guide to fix 'ERR_NAME_NOT_RESOLVED' in Chrome. Learn why it happens and follow step-by-step solutions to restore internet access, including DNS flushing, network settings, and browser troubleshooting."
keywords: "ERR_NAME_NOT_RESOLVED, Chrome error, DNS error, network resolution, internet connection fix, browser troubleshooting, flush DNS, change DNS, Chrome fix"
---

The "ERR_NAME_NOT_RESOLVED" error is a common message encountered by Google Chrome users when the browser fails to connect to a website. This error signifies that Chrome cannot translate the human-readable domain name (like `example.com`) into an IP address that computers use to locate servers on the internet. When this issue occurs, users typically see a Chrome error page displaying "This site can't be reached" followed by the specific error code "ERR_NAME_NOT_RESOLVED" and a suggestion to check the internet connection or proxy settings.

Essentially, your browser is trying to dial a phone number (the IP address) but doesn't have the correct listing for the name you've provided. Without this translation, the connection cannot be established, and the requested webpage remains inaccessible. While frustrating, this error is often resolvable with a series of systematic troubleshooting steps that address potential points of failure in the domain name resolution process.

### Why It Happens

The "ERR_NAME_NOT_RESOLVED" error primarily indicates a failure in the Domain Name System (DNS) resolution process. DNS acts as the internet's phonebook, translating domain names into IP addresses. When you type a URL into your browser, your computer queries a DNS server to find the corresponding IP address. If this lookup fails, the error occurs.

Several factors can lead to DNS resolution failure. These include issues with your local DNS cache (which might be corrupt or outdated), problems with your Internet Service Provider's (ISP) DNS servers, incorrect network configuration settings on your computer or router, interference from VPNs or proxy servers, firewall restrictions, or even malware. Less commonly, an outdated browser or operating system, or a problem with the website itself, could also contribute, although the latter usually presents with different error codes if the DNS lookup itself succeeds.

### Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "ERR_NAME_NOT_RESOLVED" error.

### Step 1: Check Internet Connection and Website Status

Before diving into complex troubleshooting, ensure your internet connection is active and the website itself isn't down.

1.  **Verify Internet Connectivity:**
    *   Try accessing other popular websites (e.g., `google.com`, `wikipedia.org`). If these also fail, the problem is likely with your general internet connection.
    *   Check your Wi-Fi or Ethernet connection status. Ensure your cables are securely plugged in and Wi-Fi is connected.
    *   **Restart your router and modem:** Unplug both devices from power for 30 seconds, then plug the modem back in, wait for it to fully boot, then plug in the router and wait for it to boot. This can clear temporary network glitches.
2.  **Check Website Status:**
    *   Use a website like `downdetector.com` or `isitdownrightnow.com` to see if the specific website you're trying to access is experiencing an outage. This helps differentiate between a local issue and a server-side problem.

### Step 2: Clear Chrome's DNS Cache

Chrome maintains its own internal DNS cache, which can sometimes become corrupted or outdated, leading to resolution failures.

1.  **Open Chrome's Net Internals:** Type `chrome://net-internals/#dns` into your Chrome address bar and press Enter.
2.  **Clear Host Cache:** On the left-hand menu, ensure "DNS" is selected. You will see a button labeled "Clear host cache." Click this button.
3.  **Test:** Close and reopen Chrome, then try accessing the website again.

### Step 3: Flush Local DNS Cache and Renew IP Address

Your operating system also maintains a DNS cache. Flushing this cache forces your computer to retrieve fresh DNS records. Renewing your IP address can help if your network configuration has become stale.

1.  **For Windows:**
    *   Open **Command Prompt as Administrator**. Search for "cmd", right-click, and select "Run as administrator."
    *   Execute the following commands in order, pressing Enter after each:
        *   `ipconfig /flushdns` (Clears the DNS resolver cache)
        *   `ipconfig /release` (Releases your current IP address)
        *   `ipconfig /renew` (Renews your IP address from the DHCP server)
    *   Restart your computer.
2.  **For macOS:**
    *   Open **Terminal** (Applications > Utilities > Terminal).
    *   Execute the following command, pressing Enter:
        *   `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
    *   You may be prompted for your administrator password. Enter it and press Enter.
3.  **For Linux (Ubuntu/Debian-based with systemd-resolved):**
    *   Open **Terminal**.
    *   Execute the following command:
        *   `sudo systemd-resolve --flush-caches`
    *   Alternatively, for systems using `nscd`:
        *   `sudo /etc/init.d/nscd restart`
    *   Restart your computer.

### Step 4: Change Your DNS Server

If your ISP's DNS servers are experiencing issues, switching to a public, reliable DNS server like Google Public DNS or Cloudflare DNS can often resolve the problem.

1.  **For Windows:**
    *   Open **Control Panel** > **Network and Sharing Center**.
    *   Click on "Change adapter settings" on the left pane.
    *   Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    *   Choose "Use the following DNS server addresses."
    *   Enter the addresses for Google Public DNS:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   Alternatively, use Cloudflare DNS:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" twice to save changes. Restart your browser.
2.  **For macOS:**
    *   Go to **System Settings** > **Network**.
    *   Select your active network connection (e.g., "Wi-Fi" or "Ethernet") and click "Details..."
    *   Navigate to the "DNS" tab.
    *   Click the "+" button under "DNS Servers" to add new servers.
    *   Enter `8.8.8.8` and `8.8.4.4` (for Google DNS) or `1.1.1.1` and `1.0.0.1` (for Cloudflare DNS).
    *   Click "OK," then "Apply." Restart your browser.

### Step 5: Disable Proxy Servers or VPN

Proxy servers and VPNs can sometimes interfere with DNS resolution or routing, leading to the "ERR_NAME_NOT_RESOLVED" error.

1.  **Check Chrome's Proxy Settings:**
    *   Type `chrome://settings/system` into your Chrome address bar and press Enter.
    *   Under the "System" section, click "Open your computer's proxy settings." This will open your operating system's proxy configuration.
2.  **For Windows:**
    *   In the "Proxy" settings window, ensure "Automatically detect settings" is off if you're not using a proxy. If a proxy is configured, try turning it off or using "No proxy" and test.
    *   For VPNs, temporarily disable your VPN software and try accessing the website.
3.  **For macOS:**
    *   In **System Settings** > **Network**, select your active connection and click "Details..."
    *   Go to the "Proxies" tab. Ensure no proxy is enabled unless you specifically need one. If one is enabled, try unchecking it temporarily.
    *   Temporarily disable any active VPN connection through your VPN client.
    *   Restart your browser and test.

### Step 6: Reset Chrome Settings or Reinstall Chrome

If the issue persists and appears to be specific to Chrome (other browsers work fine), resetting or reinstalling Chrome might resolve it.

1.  **Reset Chrome Settings:**
    *   Type `chrome://settings/reset` into your Chrome address bar and press Enter.
    *   Click on "Restore settings to their original defaults" and confirm. This resets your startup page, new tab page, search engine, and disables extensions, but does not clear your bookmarks, history, or saved passwords.
    *   Restart Chrome and test.
2.  **Reinstall Chrome:**
    *   If resetting doesn't work, completely uninstall Chrome from your system.
    *   Download the latest version of Chrome from the official website (`google.com/chrome`).
    *   Install Chrome and test.

### Step 7: Check Firewall and Antivirus Settings

Firewall or antivirus software can sometimes aggressively block network connections or interfere with DNS queries, even for legitimate websites.

1.  **Temporarily Disable:**
    *   Temporarily disable your third-party firewall or antivirus software. *Be cautious when doing this and only for a short period to test.*
    *   Try accessing the website again.
2.  **Add Exception:**
    *   If disabling the software resolves the issue, re-enable it and add an exception for Google Chrome to its trusted applications list. Consult your specific software's documentation for instructions on how to do this.
3.  **Check Windows Defender Firewall:**
    *   For Windows, search for "Windows Defender Firewall" in the Start menu.
    *   Click "Allow an app or feature through Windows Defender Firewall" on the left.
    *   Ensure "Google Chrome" has both "Private" and "Public" boxes checked. If not, click "Change settings" and check them.

### Common Mistakes

When troubleshooting "ERR_NAME_NOT_RESOLVED," users often make several common errors that can prolong the resolution process:

1.  **Neglecting Basic Checks:** Immediately jumping to advanced DNS settings without first verifying fundamental internet connectivity or confirming the website's uptime can lead to unnecessary troubleshooting. Always start by restarting your router and checking if other sites load.
2.  **Ignoring Browser-Specific Caches:** Many forget that Chrome maintains its own separate DNS cache, in addition to the operating system's cache. Clearing both is crucial for a clean slate.
3.  **Incorrect DNS Entry:** When manually changing DNS servers, entering incorrect IP addresses for preferred and alternate DNS can lead to further connectivity problems. Double-check the numbers (e.g., 8.8.8.8, 1.1.1.1).
4.  **Forgetting Restarts:** Changes to network settings, DNS caches, or proxy configurations often require a restart of the browser or the entire computer to take full effect. Failing to do so can make it seem like a fix didn't work.
5.  **Overlooking VPN/Proxy Interference:** Active VPNs or proxy settings, especially if they are misconfigured or experiencing issues, are frequent culprits behind DNS resolution errors but are often forgotten in initial troubleshooting steps.

### Prevention Tips

To minimize the chances of encountering the "ERR_NAME_NOT_RESOLVED" error in the future, consider these best practices:

1.  **Use Reliable DNS Servers:** Configure your network adapter or router to use public, reputable DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1). These are generally faster and more reliable than many ISP-provided DNS servers.
2.  **Keep Software Updated:** Regularly update your operating system (Windows, macOS, Linux) and your Chrome browser. Updates often include critical bug fixes and network stack improvements that can prevent DNS-related issues.
3.  **Periodically Clear Caches:** While not necessary daily, a routine of occasionally clearing your browser's and operating system's DNS caches (as described in Step 2 and 3) can prevent stale or corrupted records from causing problems.
4.  **Monitor Network Hardware:** Periodically restart your router and modem. This simple action can refresh network connections, clear temporary bugs, and improve overall network stability.
5.  **Be Mindful of Browser Extensions:** Some Chrome extensions, particularly those related to security, privacy, or ad-blocking, can sometimes interfere with network requests. Install extensions only from trusted sources and review their permissions.
6.  **Maintain Good Cybersecurity Hygiene:** Use reputable antivirus and anti-malware software and keep it updated. Malware can sometimes corrupt network settings or redirect DNS requests, leading to resolution failures.