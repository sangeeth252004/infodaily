---
title: "How to Fix 'DNS Server Not Responding' Error on Windows 10/11"
date: "2026-02-26T15:53:07.017Z"
slug: "how-to-fix-dns-server-not-responding-error-on-windows-10-11"
type: "how-to"
description: "Resolve the 'DNS Server Not Responding' error on Windows 10/11 with this comprehensive, step-by-step guide. Learn common causes, troubleshooting techniques, and prevention tips to restore your internet connection."
keywords: "DNS Server Not Responding, Windows 10, Windows 11, fix internet connection, network troubleshooting, DNS flush, change DNS, network reset, ipconfig, netsh, network adapter"
---

### Problem Explanation

The "DNS Server Not Responding" error is a frustrating network connectivity issue that prevents your Windows 10 or Windows 11 computer from accessing the internet. When you encounter this problem, you might see a "No Internet access" message in your network status, or your web browser might display errors like "This site can't be reached," "DNS_PROBE_FINISHED_NXDOMAIN," or "Server not found." Essentially, your computer is struggling to translate human-readable website addresses (like `www.google.com`) into numerical IP addresses that computers use to locate servers on the internet. Without this critical translation service, you cannot browse websites, use online applications, or perform any internet-dependent tasks, even if your local network connection appears active.

This error specifically indicates that your computer is unable to reach the configured Domain Name System (DNS) server, or that the server is failing to respond to its requests. While your Wi-Fi or Ethernet connection might show as "Connected," the underlying problem is the inability to resolve domain names, making the internet effectively inaccessible. You might experience slow loading times before the error appears, or a complete and immediate failure to connect to any online resource.

### Why It Happens

The Domain Name System (DNS) acts as the internet's phonebook. When you type a website address into your browser, your computer queries a DNS server to find the corresponding IP address. If the DNS server doesn't respond, your computer can't find the website, leading to the error. Several factors can cause a DNS server to become unresponsive.

Common culprits include temporary glitches with your router or modem, which might be failing to correctly assign DNS server addresses or forwarding requests. Incorrect DNS settings on your computer, either manually misconfigured or corrupted, can also prevent successful communication. Your Internet Service Provider's (ISP) DNS servers might be experiencing an outage or slowdown, or a third-party firewall or antivirus software could be blocking DNS queries. Furthermore, outdated network adapter drivers, malware infections, or even fundamental network configuration issues (like a faulty IP address acquisition) can interfere with DNS resolution. Sometimes, the problem lies with the DNS server itself being overloaded or down, irrespective of your local setup.

### Step-by-Step Solution

Addressing the "DNS Server Not Responding" error involves systematically checking and reconfiguring various network settings. Follow these steps carefully to diagnose and resolve the issue.

#### ## Step 1: Restart Your Network Hardware and Flush DNS Cache

Often, the simplest solution is the most effective. Your router and modem can accumulate temporary glitches.
1.  **Power Cycle Network Hardware:**
    *   Unplug your router and modem from their power outlets.
    *   Wait for at least 30 seconds.
    *   Plug the modem back in and wait until all its indicator lights are stable.
    *   Plug the router back in and wait until its indicator lights are stable.
    *   Restart your Windows PC.
2.  **Flush DNS Cache:**
    *   Press `Windows Key + R`, type `cmd`, and press `Ctrl+Shift+Enter` to open Command Prompt as an administrator.
    *   Type the following commands, pressing `Enter` after each one:
        *   `ipconfig /flushdns` (Clears the local DNS cache)
        *   `ipconfig /registerdns` (Registers DNS names with your DNS server)
        *   `ipconfig /release` (Releases your current IP address)
        *   `ipconfig /renew` (Renews your IP address)
        *   `netsh int ip reset` (Resets IP settings)
        *   `netsh winsock reset` (Resets Winsock catalog)
    *   Restart your computer after running all commands.

#### ## Step 2: Verify Network Adapter Settings

Ensure your network adapter is configured to obtain DNS server addresses automatically or to use specific, working servers.
1.  **Open Network Connections:**
    *   Right-click the Start button and select `Network Connections`.
    *   Under "Advanced network settings," click `More network adapter options`.
2.  **Access Adapter Properties:**
    *   Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select `Properties`.
3.  **Configure IPv4 Properties:**
    *   Scroll down and select `Internet Protocol Version 4 (TCP/IPv4)`.
    *   Click `Properties`.
    *   Ensure "Obtain an IP address automatically" and "Obtain DNS server address automatically" are selected. This is the default and often recommended setting. If they are already selected, proceed to Step 3. If they were set to specific IPs, note them down, then switch to "Obtain automatically" and test.

#### ## Step 3: Change DNS Servers to Public Alternatives

If your ISP's DNS servers are problematic, using reliable public DNS servers can often resolve the issue. Google Public DNS and Cloudflare DNS are popular, fast, and secure options.
1.  **Follow Steps 1-3 from "Step 2: Verify Network Adapter Settings".**
2.  **Enter Manual DNS Addresses:**
    *   Select "Use the following DNS server addresses."
    *   For Google Public DNS:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   For Cloudflare DNS:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   Click `OK` and then `Close`.
    *   Restart your web browser or computer and test your internet connection.

#### ## Step 4: Temporarily Disable Windows Firewall or Third-Party Antivirus

Sometimes, security software can mistakenly block DNS queries, leading to the "not responding" error.
1.  **Disable Windows Firewall (Temporary):**
    *   Press `Windows Key + R`, type `firewall.cpl`, and press `Enter`.
    *   Click "Turn Windows Defender Firewall on or off" in the left pane.
    *   Select "Turn off Windows Defender Firewall (not recommended)" for both private and public networks.
    *   Click `OK`.
    *   Test your internet connection. Remember to re-enable your firewall immediately after testing to maintain security.
2.  **Disable Third-Party Antivirus/Firewall:**
    *   If you use third-party security software (e.g., Avast, Norton, McAfee), right-click its icon in the system tray and look for an option to temporarily disable its firewall or protection. Consult its documentation if you're unsure how.
    *   Test your internet connection. Re-enable the software promptly.

#### ## Step 5: Update Network Adapter Drivers

Outdated or corrupted network drivers can cause various connectivity problems, including DNS resolution issues.
1.  **Open Device Manager:**
    *   Right-click the Start button and select `Device Manager`.
2.  **Locate Network Adapters:**
    *   Expand the "Network adapters" section.
3.  **Update Driver:**
    *   Right-click on your active network adapter (e.g., "Intel(R) Dual Band Wireless-AC 7260" or "Realtek PCIe GbE Family Controller").
    *   Select `Update driver`.
    *   Choose "Search automatically for drivers." If Windows finds a newer driver, install it and restart your PC.
    *   If Windows reports that the best driver is already installed, you can also try "Uninstall device" (do NOT check "Delete the driver software for this device"). After uninstalling, restart your computer; Windows will typically reinstall the driver automatically.
4.  **Manufacturer's Website:**
    *   If automatic updates don't help, visit your computer manufacturer's website (e.g., Dell, HP, Lenovo) or the network adapter manufacturer's website (e.g., Intel, Realtek) to download and install the latest drivers specifically for your model and Windows version.

#### ## Step 6: Check for Malware

Malware can interfere with network settings, redirect DNS requests, or block internet access. While not a direct fix for DNS, it's a crucial check if other steps fail.
1.  **Run a Full System Scan:**
    *   Use Windows Security (formerly Windows Defender) or your preferred reputable antivirus software to perform a full system scan.
    *   To open Windows Security, type `Windows Security` in the Start menu search bar and select the app.
    *   Navigate to "Virus & threat protection" and click "Scan options" to select "Full scan."
2.  **Remove Threats:**
    *   If any threats are detected, follow the software's instructions to quarantine or remove them.
    *   Restart your computer after cleaning.

### Common Mistakes

When troubleshooting the "DNS Server Not Responding" error, users frequently make a few critical mistakes. The most common error is skipping the basic restart of the router, modem, and computer. Many complex issues resolve with a simple power cycle because it clears temporary caches and resets connections. Another mistake is incorrectly entering public DNS server addresses in Step 3; even a single digit wrong will prevent resolution. Users sometimes forget to re-enable their firewall or antivirus software after testing, leaving their system vulnerable. Additionally, failing to test the internet connection after each individual step makes it difficult to pinpoint which action actually solved the problem, leading to unnecessary further troubleshooting. Finally, confusing local network connectivity (e.g., being connected to Wi-Fi) with actual internet access often leads to frustration, as the "DNS Server Not Responding" error specifically indicates a failure in accessing external resources despite a local connection.

### Prevention Tips

Preventing the "DNS Server Not Responding" error largely involves maintaining a healthy network environment and keeping your system updated. Regularly restarting your router and modem (e.g., once a month) can prevent accumulation of temporary glitches that lead to DNS resolution issues. Similarly, periodically flushing your DNS cache via `ipconfig /flushdns` can clear stale or corrupted entries.

It's also beneficial to keep your network adapter drivers updated to ensure optimal performance and compatibility. Consider using reliable public DNS servers like Google Public DNS or Cloudflare DNS if your ISP's servers are frequently unresponsive, as these often offer better reliability and speed. Finally, always keep your operating system and security software updated, and run regular malware scans. These practices help prevent malicious software from interfering with your network settings and ensure your system is robust against common connectivity problems.