---
title: "How to Fix 'ERR_NAME_NOT_RESOLVED' Error in Chrome"
date: "2026-07-03T12:08:37.449Z"
slug: "how-to-fix-err-name-not-resolved-error-in-chrome"
type: "how-to"
description: "Comprehensive guide to troubleshoot and fix the 'ERR_NAME_NOT_RESOLVED' error in Google Chrome. Learn common causes and step-by-step solutions for DNS, network, and browser-specific issues."
keywords: "ERR_NAME_NOT_RESOLVED, Chrome error, fix DNS error, Google Chrome troubleshooting, network problem, internet connectivity, DNS resolver, flush DNS, change DNS server, browser cache, IP address lookup."
---

### Problem Explanation

The "ERR_NAME_NOT_RESOLVED" error in Google Chrome is a frustrating message that indicates your browser is unable to translate a website's domain name (like `www.example.com`) into its corresponding IP address (like `192.0.2.1`). This process, known as Domain Name System (DNS) resolution, is fundamental to how the internet works. When you encounter this error, Chrome typically displays a page stating "This site can't be reached" followed by "ERR_NAME_NOT_RESOLVED" or "DNS_PROBE_FINISHED_NXDOMAIN" at the bottom, often accompanied by suggestions to check your internet connection, proxy, or firewall. Essentially, your computer or browser can't find the correct "address book" entry to locate the website you're trying to visit.

This specific error means that the DNS lookup for the domain name failed entirely. It’s not a connection timeout or a server error from the website itself, but rather an issue occurring before your browser even attempts to connect to the target server. You might see this error across multiple websites, or sometimes just on a specific few, pointing to either a widespread network problem on your end or a specific issue with how certain domains are being resolved by your system.

### Why It Happens

The root cause of the "ERR_NAME_NOT_RESOLVED" error almost always lies with a failure in the DNS resolution process. When you type a domain name into your browser, your computer sends a request to a DNS server (typically provided by your Internet Service Provider, or ISP) to find the website's IP address. If this server fails to respond, responds incorrectly, or if your computer itself has outdated or corrupted DNS information, this error occurs.

Several factors can lead to this DNS resolution failure. Common culprits include a stale DNS cache on your browser or operating system, which might be holding onto old or incorrect IP addresses. Issues with your network hardware, such as your router or modem, can also prevent DNS requests from reaching their destination. Furthermore, your assigned DNS servers (like those from your ISP) might be experiencing outages, congestion, or misconfigurations. Less common but still possible causes include interference from security software (firewalls, antivirus), VPNs, proxy settings, or even outdated network drivers on your computer, all of which can block or redirect DNS queries incorrectly.

### Step-by-Step Solution

Addressing the "ERR_NAME_NOT_RESOLVED" error typically involves systematically troubleshooting your network, DNS settings, and browser configuration. Follow these steps in order to diagnose and resolve the issue.

#### ## Step 1: Check Your Internet Connection and Restart Network Devices

Before delving into complex solutions, ensure your basic internet connection is working.
1.  **Verify connectivity:** Try accessing other websites (e.g., `google.com`, `wikipedia.org`). If only one specific site is affected, the problem might be on their end.
2.  **Check other devices:** Can other devices (smartphone, tablet) on the same network access the internet? If they can, the problem is likely with your specific computer.
3.  **Power Cycle Network Hardware:** Unplug your modem and router from power. Wait at least 30 seconds, then plug the modem back in. Once its indicator lights stabilize (usually 1-2 minutes), plug your router back in. Wait another 1-2 minutes for it to fully boot up. This clears temporary glitches and refreshes network connections.

#### ## Step 2: Clear Chrome's Browser Data and Internal DNS Cache

Your browser maintains its own cache of DNS information and browsing data that can become corrupted.
1.  **Clear Browsing Data:**
    *   Open Chrome, click the three-dot menu (top-right), go to **More tools > Clear browsing data...**.
    *   Set the **Time range** to "All time".
    *   Ensure "Cached images and files" and "Cookies and other site data" are checked. You may also check "Browsing history".
    *   Click **Clear data**.
2.  **Clear Chrome's Internal DNS Cache:**
    *   Type `chrome://net-internals/#dns` into Chrome's address bar and press Enter.
    *   On the page that opens, locate and click the **"Clear host cache"** button. This flushes Chrome's specific DNS cache.

#### ## Step 3: Flush DNS Cache and Renew IP Address on Your Operating System

Your operating system also maintains a DNS cache. Flushing it forces your system to retrieve fresh DNS information.

1.  **For Windows Users:**
    *   Press `Windows Key + R`, type `cmd`, and press `Ctrl + Shift + Enter` to open Command Prompt as an administrator.
    *   Execute the following commands one by one, pressing Enter after each:
        *   `ipconfig /flushdns` (Flushes the DNS resolver cache)
        *   `ipconfig /release` (Releases your current IP address)
        *   `ipconfig /renew` (Renews your IP address from the DHCP server)
    *   Close Command Prompt and test Chrome.

2.  **For macOS Users:**
    *   Open Terminal (found in `Applications/Utilities`).
    *   Execute the following command, then press Enter. You may be prompted for your administrator password:
        *   `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
    *   Close Terminal and test Chrome.

#### ## Step 4: Change Your DNS Servers

If your ISP's default DNS servers are unreliable or slow, switching to public DNS servers can often resolve the issue. Popular public DNS providers include Google Public DNS and Cloudflare DNS.

1.  **For Windows Users:**
    *   Right-click the **Start button**, then click **Network Connections**.
    *   Click **Change adapter options**.
    *   Right-click on your active network adapter (e.g., "Ethernet" or "Wi-Fi"), then select **Properties**.
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click **Properties**.
    *   Select "Use the following DNS server addresses" and enter the preferred DNS servers:
        *   **Google DNS:**
            *   Preferred DNS server: `8.8.8.8`
            *   Alternate DNS server: `8.8.4.4`
        *   **Cloudflare DNS:**
            *   Preferred DNS server: `1.1.1.1`
            *   Alternate DNS server: `1.0.0.1`
    *   Click **OK** on both windows to save changes.

2.  **For macOS Users:**
    *   Go to **Apple menu > System Settings** (or System Preferences on older macOS versions).
    *   Click **Network**.
    *   Select your active network connection (e.g., Wi-Fi or Ethernet) from the left sidebar.
    *   Click **Details...** (or Advanced...).
    *   Go to the **DNS** tab.
    *   Click the `+` button to add new DNS servers. Remove any existing entries if they are causing issues.
    *   Enter your chosen public DNS servers (e.g., `8.8.8.8` and `8.8.4.4` for Google, or `1.1.1.1` and `1.0.0.1` for Cloudflare).
    *   Click **OK** or **Apply**.

#### ## Step 5: Disable Firewall/Antivirus Temporarily

Sometimes, overly aggressive firewall or antivirus software can interfere with DNS requests or block Chrome's access to the internet.
1.  **Temporarily Disable:** Temporarily disable your third-party firewall or antivirus software and immediately try accessing the problematic website.
    *   **Caution:** Only disable them briefly for testing, and re-enable them immediately afterward to maintain your system's security.
2.  **Check Settings:** If disabling resolves the issue, review your security software's settings to ensure Chrome is allowed full network access and that no DNS-related filtering is enabled. You may need to add an exception for Chrome or adjust specific network protection rules.

#### ## Step 6: Reset Chrome Settings

Resetting Chrome to its default settings can fix a range of browser-related issues, including conflicts caused by extensions or corrupted settings.
1.  Open Chrome, click the three-dot menu (top-right), and go to **Settings**.
2.  Scroll down and click **Reset settings**.
3.  Click **"Restore settings to their original defaults"**.
4.  Confirm by clicking **"Reset settings"**. This will disable all extensions and reset most browser settings, but your bookmarks, history, and saved passwords will remain.

#### ## Step 7: Update Network Drivers or Chrome Itself

Outdated software can lead to compatibility issues and network problems.
1.  **Update Network Drivers:**
    *   **For Windows:** Press `Windows Key + X`, select **Device Manager**. Expand "Network adapters", right-click your adapter, and choose "Update driver". You might need to visit your computer manufacturer's or network adapter manufacturer's website for the latest drivers.
    *   **For macOS:** Network drivers are updated with system updates. Ensure your macOS is up to date via **System Settings > General > Software Update**.
2.  **Update Google Chrome:**
    *   Open Chrome, click the three-dot menu, go to **Help > About Google Chrome**. Chrome will automatically check for and install updates. Restart Chrome after an update.

### Common Mistakes

When troubleshooting the "ERR_NAME_NOT_RESOLVED" error, users often make several common mistakes that can delay resolution:

*   **Only Clearing Browser Cache:** Many users only clear their Chrome's browsing data (cache and cookies) but neglect to clear Chrome's internal DNS cache (`chrome://net-internals/#dns`) or, crucially, their operating system's DNS cache. The OS DNS cache is a frequent culprit for this specific error.
*   **Not Restarting Network Hardware:** Skipping the step of power cycling the modem and router. This simple action often resolves temporary network glitches that can impede DNS resolution.
*   **Ignoring Firewall/Antivirus:** Overlooking the possibility that security software is blocking network connections or DNS queries. Users might be hesitant to temporarily disable security software, but it's a critical diagnostic step.
*   **Assuming the Problem is Remote:** Immediately concluding that the website itself is down. While possible, the "ERR_NAME_NOT_RESOLVED" error specifically points to a local DNS issue, meaning the problem is almost always on your end (your device, network, or DNS server). Always try another device or network (like mobile data) to confirm if the issue is widespread for that site.
*   **Not Trying Different DNS Servers:** Sticking with the default ISP DNS servers even after flushing caches. If your ISP's DNS is experiencing issues, changing to a public DNS server is often the most effective solution.

### Prevention Tips

To minimize the chances of encountering the "ERR_NAME_NOT_RESOLVED" error again, consider adopting these best practices:

*   **Keep Your Operating System and Browser Updated:** Regularly apply updates to your operating system (Windows, macOS) and Google Chrome. Updates often include critical bug fixes, security patches, and performance improvements that can resolve underlying network and DNS-related issues.
*   **Use Reliable DNS Servers:** Consider permanently switching to stable and fast public DNS servers like Google Public DNS (`8.8.8.8`, `8.8.4.4`) or Cloudflare DNS (`1.1.1.1`, `1.0.0.1`). These services are generally more robust and less prone to outages than many ISP-provided DNS servers.
*   **Regularly Maintain Browser Data:** Periodically clear your Chrome's browsing data, especially cached images and files, and clear its internal DNS cache (`chrome://net-internals/#dns`). This prevents stale or corrupted data from causing conflicts.
*   **Maintain a Healthy Network Environment:** Ensure your router firmware is up-to-date and your Wi-Fi signal is strong and stable. An unreliable home network can lead to intermittent DNS resolution failures. If possible, use an Ethernet connection for critical tasks.
*   **Be Mindful of New Software:** Be cautious when installing new VPNs, proxy software, or network-monitoring tools. These applications often modify network settings and can inadvertently interfere with DNS resolution. Always review their settings if you encounter network issues after installation.
*   **Review Security Software Settings:** Periodically check your firewall and antivirus settings to ensure they are not overly aggressive in blocking legitimate network traffic or DNS requests. Make sure Chrome is granted appropriate network permissions.