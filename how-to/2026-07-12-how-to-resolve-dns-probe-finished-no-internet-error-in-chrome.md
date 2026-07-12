---
title: "How to Resolve \"DNS_PROBE_FINISHED_NO_INTERNET\" Error in Chrome"
date: "2026-07-12T11:09:03.943Z"
slug: "how-to-resolve-dns-probe-finished-no-internet-error-in-chrome"
type: "how-to"
description: "A comprehensive guide to troubleshoot and fix the \"DNS_PROBE_FINISHED_NO_INTERNET\" error in Google Chrome, covering network checks, DNS flushing, server changes, and prevention tips."
keywords: "DNS_PROBE_FINISHED_NO_INTERNET, Chrome error, internet connection problem, fix DNS error, troubleshoot network, DNS flush, change DNS server, network reset, Chrome no internet"
---

### Problem Explanation

The "DNS_PROBE_FINISHED_NO_INTERNET" error is a common connectivity issue encountered by users of Google Chrome. When this error occurs, your browser displays a page with the message "There is no Internet connection" along with the specific error code `DNS_PROBE_FINISHED_NO_INTERNET`. Despite appearing as a general lack of internet, your device might still show a connection to your local network or Wi-Fi. This error prevents you from accessing any websites, indicating a failure in the process of translating website domain names into IP addresses.

Users typically see an opaque white page with an icon of a disconnected plug and the aforementioned error message, irrespective of whether other applications on the system (like email clients or chat apps) might still show some form of network activity. This discrepancy often leads to confusion, as the system itself might report "Connected" to a network, yet Chrome remains unable to browse.

### Why It Happens

This error primarily signals a failure in Domain Name System (DNS) resolution. DNS acts as the internet's phonebook, translating human-readable website names (like `www.example.com`) into machine-readable IP addresses (like `192.0.2.1`). When this translation process fails, your browser cannot locate the server hosting the website you're trying to reach, resulting in the "DNS_PROBE_FINISHED_NO_INTERNET" error.

Several factors can cause DNS resolution to fail:

*   **Incorrect DNS Server Settings:** Your computer might be configured to use DNS servers that are unresponsive, overloaded, or incorrectly specified.
*   **Corrupted DNS Cache:** Your operating system and browser maintain a cache of previously resolved DNS queries. If this cache becomes corrupted, it can lead to incorrect or failed resolutions.
*   **Router or Modem Issues:** Your network hardware (router, modem) may be experiencing temporary glitches, preventing proper forwarding of DNS requests.
*   **Firewall or Antivirus Interference:** Security software can sometimes incorrectly block legitimate DNS traffic, leading to connectivity issues.
*   **Outdated Network Drivers:** Old or corrupted network adapter drivers can lead to unstable network connections and DNS resolution failures.
*   **VPN/Proxy Conflicts:** Virtual Private Networks (VPNs) or proxy servers, while providing anonymity or access to geo-restricted content, can sometimes misconfigure network settings or redirect DNS requests improperly.
*   **ISP-Related DNS Problems:** Occasionally, the issue might stem from your Internet Service Provider's (ISP) DNS servers experiencing an outage or performance degradation.

### Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "DNS_PROBE_FINISHED_NO_INTERNET" error.

## Step 1: Perform Basic Network Troubleshooting and Restart Devices

Before delving into complex solutions, perform fundamental network checks. This often resolves transient network glitches.

1.  **Restart Your Router/Modem:** Disconnect the power cable from your internet modem and Wi-Fi router. Wait for 30 seconds, then reconnect the modem's power. Once the modem is fully online (indicated by stable lights, usually taking 1-2 minutes), reconnect the router's power.
2.  **Restart Your Computer:** A simple system reboot can clear temporary software conflicts or network adapter issues.
3.  **Check Physical Connections:** Ensure all Ethernet cables (if applicable) are securely plugged into your computer, router, and modem.

After these restarts, open Chrome and try accessing websites.

## Step 2: Flush DNS Cache and Renew IP Address

Your operating system stores a cache of DNS lookups to speed up subsequent requests. A corrupted cache can lead to errors. Resetting network configurations can also resolve underlying connectivity issues.

1.  **Open Command Prompt as Administrator:**
    *   Press `Windows Key + R`, type `cmd`, then press `Ctrl + Shift + Enter` to open with administrative privileges. Alternatively, search for "Command Prompt" in the Start Menu, right-click, and select "Run as administrator."
2.  **Execute DNS Commands:** Type each command below, pressing `Enter` after each:
    *   `ipconfig /flushdns` (Clears the DNS resolver cache)
    *   `ipconfig /release` (Releases your current IP address)
    *   `ipconfig /renew` (Requests a new IP address from your router/DHCP server)
3.  **Exit Command Prompt:** Type `exit` and press `Enter`.

Test Chrome again.

## Step 3: Change DNS Server Address

Using alternative, publicly available DNS servers (like Google Public DNS or Cloudflare DNS) can often bypass issues with your ISP's DNS servers or incorrect local configurations.

1.  **Open Network Connections:**
    *   Press `Windows Key + R`, type `ncpa.cpl`, and press `Enter`. This opens the Network Connections window.
2.  **Access Adapter Properties:**
    *   Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
3.  **Modify IPv4 DNS Settings:**
    *   In the properties window, select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    *   Select "Use the following DNS server addresses."
    *   Enter the preferred and alternate DNS server addresses:
        *   **Google Public DNS:**
            *   Preferred DNS server: `8.8.8.8`
            *   Alternate DNS server: `8.8.4.4`
        *   **Cloudflare DNS:**
            *   Preferred DNS server: `1.1.1.1`
            *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" to close the IPv4 properties, then "OK" again to close the adapter properties.
4.  **Modify IPv6 DNS Settings (Optional but Recommended):**
    *   If you use IPv6, repeat the process for "Internet Protocol Version 6 (TCP/IPv6)."
        *   **Google Public DNS:**
            *   Preferred DNS server: `2001:4860:4860::8888`
            *   Alternate DNS server: `2001:4860:4860::8844`
        *   **Cloudflare DNS:**
            *   Preferred DNS server: `2606:4700:4700::1111`
            *   Alternate DNS server: `2606:4700:4700::1001`

Close all network windows and retest Chrome.

## Step 4: Reset Winsock and IP Stack

The Windows Sockets (Winsock) catalog and the IP stack are critical components for network communication. Resetting them can resolve deeper network corruption.

1.  **Open Command Prompt as Administrator:** (Refer to Step 2 for instructions.)
2.  **Execute Reset Commands:** Type each command, pressing `Enter` after each:
    *   `netsh winsock reset` (Resets the Winsock catalog)
    *   `netsh int ip reset` (Resets the IP stack configuration)
3.  **Restart Your Computer:** A restart is crucial for these changes to take full effect.

After the restart, check Chrome.

## Step 5: Temporarily Disable Firewall and Antivirus

Security software can sometimes aggressively block network traffic, including DNS requests, leading to this error.

1.  **Disable Firewall:**
    *   **Windows Firewall:** Search for "Windows Defender Firewall" in the Start Menu. Click "Turn Windows Defender Firewall on or off" from the left pane. Select "Turn off Windows Defender Firewall (not recommended)" for both private and public networks.
    *   **Third-party Firewall:** Consult your specific antivirus or security suite documentation to temporarily disable its firewall component.
2.  **Disable Antivirus Software:** Right-click on your antivirus icon in the system tray and look for options like "Disable," "Stop," or "Pause protection."
3.  **Test Connection:** With the security software temporarily disabled, try accessing websites in Chrome.
4.  **Re-enable Security Software:** **Crucially, re-enable your firewall and antivirus immediately after testing, regardless of whether this step resolved the issue.** Running without protection leaves your system vulnerable.

If disabling resolved the issue, investigate your security software's settings to create an exception or reconfigure it to allow Chrome's network access.

## Step 6: Update Network Adapter Drivers

Outdated or corrupted network drivers can cause unstable connections and DNS resolution failures.

1.  **Open Device Manager:**
    *   Press `Windows Key + X` and select "Device Manager" from the menu.
2.  **Locate Network Adapters:** Expand the "Network adapters" category.
3.  **Update Driver:**
    *   Right-click on your active network adapter (e.g., "Intel(R) Dual Band Wireless-AC 7260" or "Realtek PCIe GbE Family Controller").
    *   Select "Update driver."
    *   Choose "Search automatically for drivers." If Windows finds a newer driver, follow the prompts to install it.
    *   If Windows reports that the best driver is already installed, you can also try "Search for updated drivers on Windows Update" or manually download the latest driver from your computer manufacturer's website or the network adapter manufacturer's website.
4.  **Restart Your Computer:** After updating drivers, always restart your system.

## Step 7: Check Proxy Settings and Disable VPN

Incorrect proxy configurations or active VPN connections can sometimes intercept or misroute DNS requests, leading to the error.

1.  **Check Chrome Proxy Settings:**
    *   Open Chrome, go to `Settings` (three vertical dots menu) -> `System` -> `Open your computer's proxy settings`.
    *   This will open Windows Proxy settings.
2.  **Disable Manual Proxy (if enabled):**
    *   Under "Manual proxy setup," ensure "Use a proxy server" is toggled **Off**, unless you specifically require a proxy for your network configuration.
3.  **Disable VPN:**
    *   If you are using a VPN, temporarily disable or disconnect from it via its client application.
    *   If the error resolves, the VPN might be misconfigured, or its DNS servers are unresponsive.

### Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NO_INTERNET" error, users frequently make a few common mistakes that can prolong the resolution process:

*   **Skipping Basic Restarts:** Many users jump straight to complex commands without first trying a simple reboot of their router, modem, and computer. Transient network issues are often resolved by these fundamental steps, saving significant troubleshooting time.
*   **Not Running Command Prompt as Administrator:** Many `ipconfig` and `netsh` commands require elevated privileges to execute correctly. Failing to run Command Prompt as an administrator will result in "Access Denied" errors, preventing the fixes from being applied.
*   **Forgetting to Re-enable Security Software:** Temporarily disabling firewalls or antivirus programs is a valid troubleshooting step, but it is critical to re-enable them immediately after testing. Leaving your system unprotected poses a significant security risk.
*   **Incorrectly Entering DNS Server Addresses:** Miskeying a single digit when manually setting DNS server addresses will lead to continued or new connectivity issues. Double-check the IP addresses before confirming.
*   **Assuming it's Only a Chrome Issue:** While the error appears in Chrome, the underlying problem is almost always system-wide network or DNS configuration. Focusing solely on Chrome settings (e.g., reinstalling the browser) without addressing the broader network context is often unproductive.

### Prevention Tips

Preventing the "DNS_PROBE_FINISHED_NO_INTERNET" error involves maintaining good network hygiene and keeping your system updated.

*   **Regular Router/Modem Restarts:** Periodically restarting your network hardware (e.g., once a month or if you notice minor connectivity issues) can clear internal caches and resolve minor glitches before they escalate into significant problems.
*   **Keep Network Drivers Updated:** Ensure your network adapter drivers are always current. Windows Update typically handles this, but occasionally, manual checks on your computer manufacturer's website (or the adapter manufacturer's) can be beneficial, especially after major OS updates.
*   **Use Reliable DNS Servers:** Configuring your network adapter to use stable, publicly available DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) can provide more consistent and faster DNS resolution than relying solely on default ISP servers, which can sometimes be unreliable.
*   **Maintain OS and Browser Updates:** Keep your operating system (Windows, macOS, Linux) and Google Chrome updated to their latest versions. Updates often include critical bug fixes and performance improvements that can address network stability and browser-related issues.
*   **Review Firewall/Antivirus Settings:** Periodically review your security software's settings to ensure it is not overly aggressive in blocking legitimate network traffic. If you install new software or change network configurations, check for potential conflicts.
*   **Be Cautious with VPNs and Proxies:** While valuable, VPNs and proxy services can sometimes introduce their own set of network complexities. Ensure you use reputable providers and understand how they interact with your network settings. If you experience issues, temporarily disabling them is often a good first troubleshooting step.