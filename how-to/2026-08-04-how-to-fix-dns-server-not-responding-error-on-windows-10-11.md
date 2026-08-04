---
title: "How to Fix 'DNS Server Not Responding' Error on Windows 10/11"
date: "2026-08-04T21:13:58.239Z"
slug: "how-to-fix-dns-server-not-responding-error-on-windows-10-11"
type: "how-to"
description: "A comprehensive guide to troubleshoot and resolve the 'DNS Server Not Responding' error on Windows 10 and 11, including step-by-step solutions, common causes, and prevention tips."
keywords: "DNS server not responding, Windows 10, Windows 11, DNS fix, network error, internet connectivity, troubleshoot DNS, flush DNS, change DNS, IP configuration"
---

### Problem Explanation

The "DNS Server Not Responding" error is a common internet connectivity issue encountered by Windows 10 and 11 users. When this problem occurs, your computer fails to connect to the Domain Name System (DNS) server, which is responsible for translating human-readable website names (like `google.com`) into numerical IP addresses (like `172.217.160.142`) that computers use to locate each other on the internet. Users typically experience a complete inability to access websites or online services, even if their device indicates a successful connection to the local network or Wi-Fi.

This error often manifests as browser messages such as "This site can’t be reached," "No internet access," or "Server not found." Windows built-in network troubleshooter might specifically report "Your computer appears to be correctly configured, but the device or resource (DNS server) is not responding." In the Network and Sharing Center, your internet connection status might show "No Internet access" or "Limited connectivity," even if the physical connection appears stable. The core issue is that your system cannot resolve domain names, effectively rendering the internet unreachable despite an active physical connection.

### Why It Happens

The root causes of a "DNS Server Not Responding" error can vary, ranging from simple network glitches to more complex software or hardware conflicts. At its core, the problem indicates that your computer cannot successfully communicate with a DNS server, whether it's one provided by your Internet Service Provider (ISP), a public DNS server, or a local server within your network.

Common culprits include temporary issues with your router or modem, which might be failing to assign DNS servers correctly or have cached incorrect information. Corrupted DNS cache entries on your Windows system can also lead to misdirection when attempting to resolve domain names. Furthermore, incorrectly configured network adapter settings, outdated network drivers, or interference from third-party software like firewalls, antivirus programs, or VPN clients can block DNS queries. Less frequently, the issue might stem from the DNS server itself (e.g., your ISP's DNS servers experiencing downtime) or even malware altering network settings.

### Step-by-Step Solution

Addressing the "DNS Server Not Responding" error typically involves a series of diagnostic and configuration steps. Start with the simpler solutions and progress to the more involved ones.

## Step 1: Restart Your Network Devices and Computer

Often, temporary glitches in your router, modem, or computer can lead to DNS resolution problems. A simple restart can clear these temporary states and re-establish proper communication.

1.  **Power off your router and modem:** Unplug their power cables from the outlet.
2.  **Wait for at least 30 seconds:** This ensures a complete power cycle and discharge of any residual power.
3.  **Plug in your modem first:** Wait until all its indicator lights stabilize (usually 1-2 minutes).
4.  **Plug in your router:** Wait until its indicator lights stabilize (another 1-2 minutes).
5.  **Restart your computer:** Perform a full shutdown and power-on of your Windows 10/11 machine.
6.  Once your computer has restarted, test your internet connection by attempting to visit several websites.

## Step 2: Flush DNS Cache and Reset IP Configuration

Your computer maintains a local cache of DNS resolutions to speed up future requests. A corrupted or outdated entry in this cache can cause resolution failures. Resetting your IP configuration can also resolve underlying network issues.

1.  **Open Command Prompt as Administrator:**
    *   Press `Windows Key + R`, type `cmd`, then press `Ctrl + Shift + Enter` and click "Yes" on the UAC prompt.
    *   Alternatively, search for "cmd" in the Start Menu, right-click "Command Prompt," and select "Run as administrator."
2.  **Execute the following commands in order, pressing Enter after each:**
    *   `ipconfig /flushdns` (Clears the DNS resolver cache)
    *   `ipconfig /release` (Releases the current IP address)
    *   `ipconfig /renew` (Renews the IP address from the DHCP server)
    *   `netsh winsock reset` (Resets the Winsock Catalog, which helps with network connectivity issues)
    *   `netsh int ip reset` (Resets TCP/IP settings)
3.  **Restart your computer** after executing all commands to ensure changes take effect. Test your internet connection.

## Step 3: Change DNS Server Address

If your ISP's DNS servers are experiencing issues or are slow, switching to a public, reliable DNS server like Google Public DNS or Cloudflare DNS can often resolve the problem.

1.  **Open Network Connections:**
    *   Press `Windows Key + R`, type `ncpa.cpl`, and press Enter.
    *   Alternatively, go to `Settings > Network & Internet > Advanced network settings > More network adapter options`.
2.  **Right-click your active network adapter** (e.g., "Ethernet" for wired, "Wi-Fi" for wireless) and select `Properties`.
3.  **Select "Internet Protocol Version 4 (TCP/IPv4)"** and click `Properties`.
4.  **Select "Use the following DNS server addresses"** and enter one of the following public DNS server sets:
    *   **Google Public DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
5.  **Check "Validate settings upon exit"** and click `OK` twice to apply the changes.
6.  **Restart your computer** and check for internet access.

## Step 4: Temporarily Disable IPv6

While IPv6 is the successor to IPv4, some network configurations or router firmwares might have issues with its implementation, occasionally leading to DNS resolution problems.

1.  **Open Network Connections** as described in Step 3 ( `ncpa.cpl`).
2.  **Right-click your active network adapter** and select `Properties`.
3.  **Uncheck the box next to "Internet Protocol Version 6 (TCP/IPv6)".**
4.  Click `OK` to save the change.
5.  **Restart your computer** and test the internet connection. If this resolves the issue, you may leave IPv6 disabled or investigate further into your router's IPv6 support.

## Step 5: Disable Firewall and Antivirus Software

Third-party firewall or antivirus software can sometimes aggressively block network traffic, including legitimate DNS queries, leading to this error.

1.  **Temporarily disable your third-party antivirus software:** Right-click its icon in the system tray and look for an option like "Disable," "Stop," or "Exit." The duration of disablement might also be configurable (e.g., for 10 minutes or until restart).
2.  **Temporarily disable Windows Defender Firewall:**
    *   Search for "Windows Defender Firewall" in the Start Menu and open it.
    *   Click "Turn Windows Defender Firewall on or off" on the left pane.
    *   Select "Turn off Windows Defender Firewall (not recommended)" for both Private and Public networks. Click `OK`.
3.  **Test your internet connection.** If the problem is resolved, re-enable the firewall/antivirus one by one to identify the culprit. You may need to add exceptions for certain network processes or consider using different security software. **Remember to re-enable your security software immediately after testing.**

## Step 6: Update or Reinstall Network Adapter Drivers

Outdated or corrupted network adapter drivers can cause a variety of network connectivity issues, including problems with DNS resolution.

1.  **Open Device Manager:** Press `Windows Key + R`, type `devmgmt.msc`, and press Enter.
2.  **Expand "Network adapters".**
3.  **Right-click your active network adapter** (e.g., "Realtek PCIe GbE Family Controller" for Ethernet, or your Wi-Fi adapter name) and select `Update driver`.
4.  **Choose "Search automatically for updated driver software".** If Windows finds and installs a new driver, restart your computer and test.
5.  If no update is found, or the issue persists, try reinstalling:
    *   Right-click the adapter again and select `Uninstall device`.
    *   Check "Delete the driver software for this device" if prompted, then click `Uninstall`.
    *   **Restart your computer.** Windows will usually reinstall a generic driver automatically.
6.  If automatic reinstallation doesn't happen or the problem persists, visit your computer manufacturer's website or the network adapter manufacturer's website to download and install the latest driver specific to your model and Windows version.

## Step 7: Reset Network Settings

Windows 10/11 includes a feature to reset all network adapters and components to their default settings, which can resolve stubborn network issues.

1.  **Open Windows Settings:** Press `Windows Key + I`.
2.  Go to `Network & Internet`.
3.  Scroll down and click `Advanced network settings`.
4.  Under "More settings," click `Network reset`.
5.  Click `Reset now` and then `Yes` to confirm.
6.  Your computer will restart automatically after the reset. You will need to re-enter any Wi-Fi passwords and potentially reconfigure VPNs or other custom network settings after the restart.

### Common Mistakes

When troubleshooting the "DNS Server Not Responding" error, users often make several common mistakes that can prolong the resolution process or lead to frustration:

1.  **Skipping basic restarts:** Many users jump straight to complex solutions without performing a simple restart of their router, modem, and PC. This is often the quickest fix for transient network glitches.
2.  **Not verifying network cable connections:** For wired connections, a loose or damaged Ethernet cable can cause intermittent or complete connectivity loss, which might be mistaken for a DNS issue.
3.  **Incorrectly typing DNS server addresses:** When manually changing DNS servers, entering an incorrect IP address (e.g., a typo in `8.8.8.8` or `1.1.1.1`) will prevent resolution entirely. Double-check all entered numbers.
4.  **Forgetting to re-enable disabled security software:** If you temporarily disable your firewall or antivirus to test for interference, forgetting to re-enable it leaves your system vulnerable. Always re-enable them, even if they aren't the cause of the DNS issue.
5.  **Overlooking ISP-specific issues:** While less common, your ISP's DNS servers can genuinely be down or experiencing issues. It's easy to assume the problem is always on your end without considering external factors. A quick check of your ISP's status page or contacting their support can rule this out.

### Prevention Tips

Preventing the "DNS Server Not Responding" error involves adopting good network maintenance practices and being mindful of your system's configuration.

1.  **Regularly restart your network equipment:** Make it a habit to power cycle your router and modem at least once a month. This clears their internal cache, updates IP assignments, and often resolves minor performance issues before they escalate.
2.  **Keep network adapter drivers updated:** Periodically check for updated drivers for your network adapters from your computer manufacturer's website or the adapter's vendor. Outdated drivers can lead to instability and connectivity problems.
3.  **Use reliable DNS servers:** Consider configuring your router or individual devices to use public, reputable DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) as a primary or secondary option. These are often more reliable and faster than default ISP DNS servers.
4.  **Maintain system hygiene:** Regularly run antivirus and anti-malware scans. Malicious software can sometimes alter network settings, including DNS configurations, to redirect traffic or cause connectivity issues.
5.  **Avoid unnecessary network configuration changes:** Unless you understand the implications, refrain from tweaking advanced network settings, especially in your router. Incorrect configurations can disrupt essential network services like DNS resolution.