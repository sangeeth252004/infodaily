---
title: "How to Resolve 'DNS Server Not Responding' Error on Windows"
date: "2026-09-02T14:05:44.595Z"
slug: "how-to-resolve-dns-server-not-responding-error-on-windows"
type: "how-to"
description: "Troubleshoot and fix the 'DNS Server Not Responding' error on Windows. This comprehensive guide provides step-by-step solutions, from basic network resets to advanced DNS configuration, to restore your internet connection."
keywords: "DNS server not responding, Windows DNS error, fix internet connection, DNS resolution issue, flush DNS cache, change DNS server, network troubleshooting Windows, DNS_PROBE_FINISHED_NO_INTERNET"
---

### Problem Explanation

The "DNS Server Not Responding" error is a common internet connectivity issue encountered by Windows users. It essentially means your computer is unable to translate website names (like `google.com`) into numerical IP addresses (like `172.217.160.142`) that computers use to locate each other on the internet. Without this critical translation, your web browser cannot find or connect to the websites you are trying to visit.

When this problem occurs, you might experience a complete loss of internet access, or your web pages might load very slowly or partially. You'll often see error messages in your browser such as "This site can't be reached," "DNS_PROBE_FINISHED_NO_INTERNET," or "Server not found." Your network icon in the system tray might display a yellow exclamation mark, indicating "No Internet Access" or "Limited Connectivity," even if you appear to be connected to your local network.

### Why It Happens

The Domain Name System (DNS) is often called the "phonebook of the internet." When you type a website name into your browser, your computer sends a request to a DNS server, which then looks up the corresponding IP address and directs your computer to the correct server where the website is hosted. The "DNS Server Not Responding" error indicates that your computer's request to the DNS server is not being acknowledged or processed.

Several factors can lead to this issue. It could be a temporary glitch with your router or modem, which acts as the intermediary for DNS requests. Your Internet Service Provider's (ISP) DNS servers might be experiencing an outage or slowdown. Incorrect DNS settings on your Windows computer, a corrupted local DNS cache, or even outdated network adapter drivers can prevent proper DNS resolution. Less commonly, but equally disruptive, firewall restrictions, VPN conflicts, or malware infections can interfere with your computer's ability to communicate with DNS servers.

### Step-by-Step Solution

Follow these steps in the order presented to systematically troubleshoot and resolve the "DNS Server Not Responding" error.

## Step 1: Restart Your Network Hardware and Computer

Many transient network issues can be resolved with a simple power cycle. This clears temporary data and re-establishes network connections.

1.  **Power off your computer.**
2.  **Unplug your router and modem** from their power outlets. Wait at least 30 seconds.
3.  **Plug your modem back in** and wait for all its indicator lights to stabilize (usually 1-2 minutes).
4.  **Plug your router back in** and wait for its indicator lights to stabilize.
5.  **Restart your computer.**
6.  Once your computer is fully booted, test your internet connection.

## Step 2: Flush DNS Cache and Reset IP Configuration

Your Windows computer maintains a local cache of DNS resolutions to speed up future requests. A corrupted cache can lead to resolution failures. Resetting your IP configuration can also resolve underlying network conflicts.

1.  **Open Command Prompt as Administrator:**
    *   Press `Windows Key + R`, type `cmd`, and press `Ctrl + Shift + Enter` to open with administrative privileges. Alternatively, search for "Command Prompt," right-click it, and select "Run as administrator."
2.  **Execute the following commands one by one, pressing Enter after each:**
    *   `ipconfig /flushdns` (Clears the local DNS resolver cache)
    *   `ipconfig /registerdns` (Refreshes all DHCP leases and re-registers DNS names)
    *   `ipconfig /release` (Releases the current IP address)
    *   `ipconfig /renew` (Renews the IP address from the DHCP server)
    *   `netsh winsock reset` (Resets the Winsock Catalog, which helps with network connectivity issues)
    *   `netsh int ip reset` (Resets TCP/IP settings)
3.  **Close Command Prompt** and **restart your computer** for the changes to take full effect.
4.  Test your internet connection.

## Step 3: Change Your DNS Server Addresses

If your ISP's DNS servers are unreliable, switching to public DNS servers like Google DNS or Cloudflare DNS can often resolve the issue.

1.  **Open Network Connections:**
    *   Right-click the network icon in your system tray and select "Open Network & Internet settings."
    *   Click "Change adapter options" (or navigate to Control Panel > Network and Internet > Network and Sharing Center > Change adapter settings).
2.  **Identify your active network adapter:**
    *   Right-click on the network adapter you are currently using for internet access (e.g., "Ethernet" for wired, "Wi-Fi" for wireless) and select "Properties."
3.  **Configure IPv4 DNS settings:**
    *   In the properties window, scroll down and select "Internet Protocol Version 4 (TCP/IPv4)."
    *   Click the "Properties" button.
    *   Select "Use the following DNS server addresses."
    *   **For Google Public DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **For Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
4.  Click "OK" on both windows to save the changes.
5.  **Restart your computer** and test your internet connection.

## Step 4: Temporarily Disable IPv6

While IPv6 is the successor to IPv4, some network configurations or hardware may not fully support it, leading to conflicts. Disabling it temporarily can help identify if it's the root cause.

1.  **Open Network Connections** as in Step 3.
2.  **Right-click your active network adapter** and select "Properties."
3.  **Uncheck the box next to "Internet Protocol Version 6 (TCP/IPv6).**"
4.  Click "OK" to save the change.
5.  **Restart your computer** and test your internet connection.
    *   *Note:* If this resolves the issue, you might consider leaving it disabled or investigating your router/ISP for IPv6 compatibility. If it doesn't help, re-enable IPv6 to ensure full functionality.

## Step 5: Update Your Network Adapter Drivers

Outdated or corrupted network adapter drivers can cause various connectivity problems, including DNS resolution issues.

1.  **Open Device Manager:**
    *   Press `Windows Key + X` and select "Device Manager."
2.  **Expand "Network adapters."**
3.  **Update Driver:**
    *   Right-click on your primary network adapter (e.g., "Intel(R) Ethernet Connection," "Realtek PCIe GbE Family Controller," or your Wi-Fi adapter).
    *   Select "Update driver."
    *   Choose "Search automatically for updated driver software." If Windows finds and installs a new driver, follow the prompts.
    *   If Windows reports that the best driver is already installed, you might need to visit your computer manufacturer's website (or the network adapter manufacturer's website) to download the latest driver manually, especially for older systems.
4.  **Restart your computer** after updating the drivers and check for internet access.

## Step 6: Check Windows Firewall or Antivirus Settings

Firewalls and antivirus software, while essential for security, can sometimes mistakenly block legitimate network traffic, including DNS requests.

1.  **Temporarily Disable Firewall/Antivirus (for testing purposes only):**
    *   Access your Windows Security settings (search for "Windows Security") or your third-party antivirus software interface.
    *   Locate the "Firewall & network protection" section (for Windows Defender Firewall) or the equivalent in your antivirus.
    *   Temporarily disable the firewall or real-time protection.
    *   **Important:** Re-enable your security software immediately after testing, as running without protection can expose your system to threats.
2.  **Test your internet connection.**
    *   If disabling the firewall/antivirus resolves the issue, you will need to reconfigure your security software to allow DNS traffic or add an exception for your web browser. Consult your security software's documentation for specific instructions.
3.  **Re-enable your firewall and antivirus software.**

## Step 7: Scan for Malware

Malware can sometimes interfere with network settings, including redirecting DNS requests to malicious servers or blocking them entirely.

1.  **Perform a full system scan:**
    *   Open Windows Security (search for "Windows Security").
    *   Go to "Virus & threat protection."
    *   Click "Scan options" and select "Full scan."
    *   Click "Scan now" and allow the scan to complete.
2.  If any threats are detected, follow the instructions to quarantine or remove them.
3.  Consider running a scan with a reputable third-party anti-malware tool for a second opinion if the issue persists.
4.  **Restart your computer** after the scan and check your internet connection.

### Common Mistakes

When troubleshooting the "DNS Server Not Responding" error, users often make a few common mistakes that can prolong the resolution process or lead to frustration:

*   **Skipping basic restarts:** Many users jump straight to complex solutions without first power cycling their router, modem, and computer. A simple restart often resolves temporary glitches more effectively than any advanced command.
*   **Incorrectly typing commands or DNS addresses:** Typos in Command Prompt commands (e.g., `ipconfig /flusdns` instead of `ipconfig /flushdns`) or when entering public DNS server addresses (e.g., `8.8.8.8` vs. `8.8.8.4`) will prevent the fixes from working. Always double-check your entries.
*   **Not running Command Prompt as Administrator:** Many network-related commands require elevated permissions. Running `cmd` without administrator privileges will result in "Access Denied" errors, making the steps ineffective.
*   **Forgetting to restart after applying changes:** Some network configuration changes, especially IP and DNS resets, require a system restart to fully apply and synchronize with the network. Failing to restart can make it seem like a solution didn't work.
*   **Leaving security software disabled:** While temporarily disabling your firewall or antivirus for testing is a valid step, forgetting to re-enable it leaves your system vulnerable. Always re-enable your security measures promptly.

### Prevention Tips

To minimize the chances of encountering the "DNS Server Not Responding" error again, consider adopting these best practices:

*   **Regularly Power Cycle Your Network Hardware:** Make it a habit to restart your router and modem at least once a month. This clears out their internal caches, refreshes connections, and often prevents minor glitches from escalating into full-blown issues.
*   **Keep Network Drivers Updated:** Ensure your network adapter drivers are current. While Windows Update handles many drivers, occasionally checking your computer manufacturer's website for the latest network drivers can provide better stability and performance.
*   **Use Reliable DNS Servers:** If your ISP's DNS servers frequently cause issues, switch to well-known public DNS providers like Google DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1). These are generally more reliable and faster.
*   **Maintain Up-to-Date Security Software:** Keep your Windows operating system and any third-party antivirus/anti-malware software updated. Regular updates ensure that your system is protected against new threats that could interfere with network functions and that your security software is running optimally.
*   **Monitor Router Firmware:** Periodically check your router manufacturer's website for firmware updates. Firmware updates often include bug fixes, security enhancements, and performance improvements that can contribute to more stable network operation, including DNS handling.