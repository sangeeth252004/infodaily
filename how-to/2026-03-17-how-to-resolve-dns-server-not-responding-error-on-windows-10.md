---
title: "How to Resolve 'DNS Server Not Responding' Error on Windows 10"
date: "2026-03-17T16:05:32.379Z"
slug: "how-to-resolve-dns-server-not-responding-error-on-windows-10"
type: "how-to"
description: "Learn how to troubleshoot and fix the 'DNS Server Not Responding' error on Windows 10 with a comprehensive step-by-step guide. Identify causes and implement solutions like flushing DNS, configuring manual DNS, and resetting network settings."
keywords: "DNS Server Not Responding, Windows 10, DNS error fix, network troubleshooting, flush DNS cache, change DNS server, network reset, ipconfig commands, DNS_PROBE_FINISHED_NO_INTERNET"
---

### Problem Explanation

The "DNS Server Not Responding" error is a common network connectivity issue encountered by Windows 10 users. It typically manifests as an inability to access websites or online services, even when the computer indicates it is connected to the internet. When attempting to browse, users often see browser-specific error messages such as "This site can't be reached," "DNS_PROBE_FINISHED_NO_INTERNET," or "ERR_NAME_NOT_RESOLVED." In the Windows Network and Sharing Center, the network status might show "No Internet Access" or "Limited Connectivity" despite the Wi-Fi or Ethernet connection appearing active. This error indicates that your computer is unable to translate domain names (like `www.example.com`) into their corresponding IP addresses, which is a fundamental step for accessing internet resources.

### Why It Happens

This error occurs when your computer fails to connect with a Domain Name System (DNS) server, or when the DNS server itself is not functioning correctly. DNS servers act as the internet's phonebook, translating human-readable domain names into machine-readable IP addresses. If this translation process fails, your computer cannot locate the servers hosting the websites or services you're trying to reach. Common root causes include issues with your router or modem, incorrect DNS server settings on your computer, a corrupted local DNS cache, interference from third-party security software (firewalls or antivirus), outdated network adapter drivers, or even problems with your Internet Service Provider's (ISP) DNS servers. Occasionally, a VPN client or malware can also redirect or block DNS requests, leading to this error.

### Step-by-Step Solution

#### Step 1: Check Basic Connectivity and Restart Devices

Before attempting more complex fixes, ensure your network hardware is functioning correctly. A simple power cycle can resolve many transient network issues.

1.  **Restart your computer:** Perform a standard restart of your Windows 10 PC.
2.  **Restart your router and modem:**
    *   Unplug your internet modem and Wi-Fi router from their power sources.
    *   Wait for at least 30 seconds.
    *   Plug the modem back in and wait for all indicator lights to stabilize (usually a minute or two).
    *   Plug the router back in and wait for its indicator lights to stabilize.
3.  **Test connection:** After all devices have restarted, try accessing a website to see if the issue is resolved.

#### Step 2: Flush DNS Cache and Reset Network Configuration

A corrupted DNS cache on your computer can prevent it from resolving new addresses. Resetting your network configuration can clear various accumulated network issues.

1.  **Open Command Prompt as Administrator:** Press `Windows key + X`, then select "Command Prompt (Admin)" or "Windows PowerShell (Admin)".
2.  **Execute the following commands in order, pressing Enter after each:**
    *   `ipconfig /flushdns` (Clears the DNS resolver cache.)
    *   `ipconfig /registerdns` (Refreshes all DHCP leases and re-registers DNS names.)
    *   `ipconfig /release` (Releases the current IP address.)
    *   `ipconfig /renew` (Renews the IP address from the DHCP server.)
    *   `netsh winsock reset` (Resets the Winsock Catalog, which stores network configuration.)
    *   `netsh int ip reset` (Resets TCP/IP settings.)
3.  **Restart your computer:** It is crucial to restart your PC after executing these commands for the changes to take full effect.
4.  **Test connection:** Check if the DNS error persists.

#### Step 3: Configure DNS Server Manually

Using public DNS servers, such as Google DNS or Cloudflare DNS, can often bypass issues with your ISP's default DNS servers.

1.  **Open Network Connections:** Right-click the network icon in your system tray, then select "Open Network & Internet settings."
2.  **Access Adapter Options:** Under "Advanced network settings," click "Change adapter options."
3.  **Select your active adapter:** Right-click on your active network adapter (e.g., "Ethernet" or "Wi-Fi") and select "Properties."
4.  **Configure IPv4 DNS:**
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    *   Choose "Use the following DNS server addresses."
    *   Enter the preferred DNS server address (e.g., for Google DNS: `8.8.8.8`) and the alternate DNS server address (e.g., `8.8.4.4`).
    *   (Optional: For Cloudflare DNS, use `1.1.1.1` and `1.0.0.1`).
    *   Check "Validate settings upon exit" if available, then click "OK" twice to save.
5.  **Restart your computer:** Restart for changes to apply.
6.  **Test connection:** Verify if the problem is resolved.

#### Step 4: Disable IPv6 (Temporarily) or Configure Its DNS

While IPv6 is the successor to IPv4, some network configurations or older routers can experience conflicts. Temporarily disabling it can rule out a potential cause.

1.  **Open Network Connections:** Follow steps 1-3 from "Step 3: Configure DNS Server Manually" to open your active adapter's properties.
2.  **Disable IPv6:** Uncheck the box next to "Internet Protocol Version 6 (TCP/IPv6)."
3.  **Apply changes:** Click "OK" twice to save.
4.  **Restart your computer:** Restart your PC.
5.  **Test connection:** If the issue is resolved, it suggests an IPv6 conflict. You can either leave it disabled or try configuring IPv6 DNS servers (e.g., Google's IPv6 DNS: `2001:4860:4860::8888` and `2001:4860:4860::8844`) in the IPv6 properties.

#### Step 5: Update Network Adapter Drivers

Outdated or corrupted network drivers can lead to various connectivity problems, including DNS resolution issues.

1.  **Open Device Manager:** Press `Windows key + X`, then select "Device Manager."
2.  **Locate Network Adapters:** Expand the "Network adapters" section.
3.  **Update driver:** Right-click on your active network adapter (e.g., "Realtek PCIe GbE Family Controller" or your Wi-Fi adapter name) and select "Update driver."
4.  **Search automatically:** Choose "Search automatically for updated driver software."
5.  **Install or check manufacturer website:** If Windows finds a new driver, install it. If not, visit your computer manufacturer's website or the network adapter manufacturer's website (e.g., Intel, Realtek, Broadcom) to download and install the latest driver specific to your Windows 10 version.
6.  **Restart your computer:** Reboot your PC after installing any new drivers.
7.  **Test connection:** Check for resolution.

#### Step 6: Temporarily Disable Firewall or Antivirus

Third-party firewalls, antivirus software, or VPN clients can sometimes interfere with DNS requests, incorrectly identifying them as threats.

1.  **Disable security software:** Temporarily disable your third-party antivirus program, firewall, or VPN client. Look for an option to disable or pause protection in their respective settings or by right-clicking their icon in the system tray.
2.  **Disable Windows Defender Firewall:**
    *   Go to `Settings > Update & Security > Windows Security > Firewall & network protection`.
    *   Click on your active network profile (usually "Private network" or "Public network") and toggle "Microsoft Defender Firewall" to "Off" *temporarily*.
3.  **Test connection:** If disabling resolves the issue, re-enable the software one by one to identify the culprit. You may need to adjust the settings of the problematic software to allow DNS traffic or configure exceptions. Remember to re-enable your security software once testing is complete.

#### Step 7: Perform a Network Reset

If all previous steps fail, a full network reset can often resolve deeply rooted configuration problems by reinstalling all network adapters and reverting network settings to their defaults.

1.  **Open Network Reset:** Go to `Settings > Network & Internet > Status`.
2.  **Initiate reset:** Scroll down and click on "Network reset."
3.  **Confirm reset:** Click "Reset now," then "Yes" to confirm.
4.  **Restart and reconfigure:** Your computer will restart automatically after 5 minutes. After the restart, you will need to re-enter your Wi-Fi password (if applicable) and reconfigure any specific network settings you may have had, such as VPN profiles or static IP addresses.
5.  **Test connection:** This should restore core network functionality.

### Common Mistakes

When troubleshooting the "DNS Server Not Responding" error, users often overlook basic yet crucial steps. A common mistake is not fully restarting the router and modem; simply cycling power through software can be insufficient. Another frequent error is misconfiguring DNS server addresses when attempting to manually set them, leading to even worse connectivity issues. Users sometimes forget to flush their DNS cache and reset network settings after making changes, preventing the new configurations from taking effect immediately. Lastly, many users don't consider their security software (antivirus, firewall) or VPN as potential culprits, often assuming they are benign, thus missing a significant source of interference.

### Prevention Tips

To minimize the chances of encountering the "DNS Server Not Responding" error again, adopt several best practices. Regularly update your network adapter drivers to ensure compatibility and performance, ideally checking for updates every few months. Consider using reliable third-party DNS servers like Google DNS or Cloudflare DNS permanently, as they are often more stable and faster than ISP defaults. Periodically flush your DNS cache to prevent corruption (`ipconfig /flushdns` in Command Prompt). Ensure your router's firmware is up to date, as outdated firmware can lead to various network instabilities. Finally, maintain a clean system by regularly running antivirus scans and avoiding unnecessary third-party network optimization tools that might interfere with core network functions.