---
title: "How to Fix \"DNS Server Not Responding\" Error on Windows 10/11"
date: "2026-05-14T02:58:11.429Z"
slug: "how-to-fix-dns-server-not-responding-error-on-windows-10-11"
type: "how-to"
description: "A comprehensive guide to troubleshoot and fix the \"DNS Server Not Responding\" error on Windows 10 and 11. Learn common causes and step-by-step solutions including flushing DNS, changing DNS servers, and driver updates."
keywords: "DNS Server Not Responding, Windows 10, Windows 11, DNS error fix, network troubleshooting, ipconfig, flush DNS, change DNS server, network adapter driver, internet connection issue"
---

### Problem Explanation

The "DNS Server Not Responding" error is a common network connectivity issue that prevents a computer from accessing websites and other internet resources. When this error occurs, your web browser will typically display messages such as "This site can't be reached," "Server Not Found," or "No Internet Access." Windows itself might report a network issue, stating "DNS server isn't responding" when you run the Network Troubleshooter. This indicates that your system is unable to translate human-readable domain names (like `www.example.com`) into machine-readable IP addresses, which is a fundamental step for any internet communication.

Essentially, your computer is attempting to contact a Domain Name System (DNS) server to get the IP address for a website you want to visit, but the server is either unreachable or failing to provide a response. This failure effectively severs your connection to the wider internet, even if your local network connection (to your router) appears active.

### Why It Happens

This error primarily occurs because your Windows system cannot establish proper communication with the DNS server configured for your network connection. Several factors can contribute to this communication breakdown. The most frequent causes include issues with your router or modem, which might be experiencing a temporary glitch or firmware problem that disrupts DNS queries. Incorrect DNS server addresses manually configured on your Windows machine, or a corrupted DNS cache on your computer, can also lead to the server appearing unresponsive.

Furthermore, an outdated or corrupted network adapter driver can prevent your system from correctly sending or receiving DNS requests. Interference from firewall or antivirus software, which might be blocking legitimate DNS traffic, is another common culprit. Less common, but still possible, are problems with your Internet Service Provider's (ISP) DNS servers, although these typically affect a broader user base. Lastly, third-party VPN clients can sometimes reconfigure network settings in a way that conflicts with standard DNS resolution.

### Step-by-Step Solution

Solving the "DNS Server Not Responding" error involves systematically checking and rectifying potential points of failure, starting with basic network resets and progressing to more specific system configurations.

#### ## Step 1: Restart Your Router and Modem

Often, network devices like routers and modems can experience temporary glitches that disrupt DNS resolution. A simple power cycle can resolve these issues.

1.  **Unplug** your router and modem from their power outlets.
2.  **Wait** for at least 30 seconds to allow the devices to fully power down and dissipate any residual charge.
3.  **Plug** your modem back in first, and wait until its indicator lights are stable (usually 1-2 minutes).
4.  **Plug** in your router next, and wait until its indicator lights are also stable.
5.  **Restart** your Windows computer.
6.  Once your computer has restarted, test your internet connection.

#### ## Step 2: Flush DNS Cache and Reset Network Configuration

Windows caches DNS entries and network settings to speed up browsing. A corrupted cache or outdated network configuration can lead to DNS resolution problems. Resetting these can clear the issue.

1.  Press `Windows Key + R`, type `cmd`, and press `Ctrl + Shift + Enter` to open Command Prompt as an administrator.
2.  Execute the following commands in sequence, pressing `Enter` after each:
    *   `ipconfig /flushdns` (Clears the DNS resolver cache)
    *   `ipconfig /release` (Releases your current IP address)
    *   `ipconfig /renew` (Requests a new IP address from the DHCP server)
    *   `netsh winsock reset` (Resets the Winsock Catalog, which helps with network connectivity)
    *   `netsh int ip reset` (Resets TCP/IP settings)
3.  **Restart** your computer after executing all commands.
4.  After restarting, test your internet connection.

#### ## Step 3: Change DNS Servers

If your ISP's DNS servers are problematic, or if your local network's DNS server (often your router) is misconfigured, switching to a public, reliable DNS server can resolve the issue. Google Public DNS or Cloudflare DNS are popular and reliable choices.

1.  Right-click the **Start button** and select **Network Connections** (Windows 10) or **Network and Internet** (Windows 11).
2.  Click **Change adapter options** (Windows 10) or **Advanced network settings** then **More network adapter options** (Windows 11).
3.  Right-click on your active network adapter (e.g., "Ethernet" for wired, "Wi-Fi" for wireless) and select **Properties**.
4.  In the properties window, select **Internet Protocol Version 4 (TCP/IPv4)** and click **Properties**.
5.  Select **Use the following DNS server addresses**.
6.  Enter the preferred and alternate DNS server addresses:
    *   **Google Public DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   **Quad9 DNS (Security-focused):**
        *   Preferred DNS server: `9.9.9.9`
        *   Alternate DNS server: `149.112.112.112`
7.  Click **OK** on both property windows to save changes.
8.  **Restart** your computer and test your internet connection.

#### ## Step 4: Update or Reinstall Network Adapter Drivers

Outdated or corrupted network adapter drivers can cause various network issues, including problems with DNS resolution.

1.  Press `Windows Key + X` and select **Device Manager**.
2.  Expand **Network adapters**.
3.  Right-click on your active network adapter (e.g., "Realtek PCIe GbE Family Controller" for Ethernet, "Intel(R) Dual Band Wireless-AC" for Wi-Fi) and select **Update driver**.
4.  Choose **Search automatically for drivers**. If Windows finds and installs a new driver, restart your PC.
5.  If no update is found or the issue persists, right-click the adapter again and select **Uninstall device**. Check the box "Attempt to remove the driver software for this device" if available.
6.  **Restart** your computer. Windows will typically reinstall the generic driver automatically upon reboot.
7.  If the issue persists, visit your computer manufacturer's website or the network adapter manufacturer's website to download the latest driver specific to your model and Windows version, then install it manually.

#### ## Step 5: Temporarily Disable Firewall and Antivirus

Firewall or antivirus software can sometimes incorrectly block DNS traffic, leading to the "DNS Server Not Responding" error.

1.  **Temporarily disable** your third-party antivirus software. The method varies by software, usually found in its settings or by right-clicking its icon in the system tray.
2.  **Temporarily disable** Windows Defender Firewall:
    *   Press `Windows Key + R`, type `control firewall.cpl`, and press `Enter`.
    *   Click **Turn Windows Defender Firewall on or off** on the left pane.
    *   Select **Turn off Windows Defender Firewall (not recommended)** for both private and public networks.
3.  **Test** your internet connection.
4.  If the internet works, re-enable your firewall and antivirus one by one to identify the culprit. You may need to add exceptions for DNS traffic within your security software. **Remember to re-enable your firewall and antivirus even if they are not the cause** for security reasons.

#### ## Step 6: Run Windows Network Troubleshooter

Windows includes a built-in troubleshooter that can automatically detect and fix common network problems.

1.  Right-click the **Start button** and select **Settings**.
2.  Go to **Network & Internet**.
3.  Under the "Status" tab, click **Network troubleshooter**.
4.  Follow the on-screen prompts. The troubleshooter will attempt to identify and resolve any detected issues.

#### ## Step 7: Check VPN Connection (If Applicable)

If you use a Virtual Private Network (VPN), it can sometimes interfere with DNS resolution, either due to misconfiguration or conflicting settings.

1.  **Disable** your VPN client and disconnect from the VPN.
2.  **Test** your internet connection.
3.  If the internet works, try reconnecting to your VPN. If the error returns, try reinstalling your VPN client or checking its settings for any DNS-related configurations. Some VPNs have a "DNS Leak Protection" feature that, if misconfigured, can cause issues.

### Common Mistakes

When troubleshooting the "DNS Server Not Responding" error, users frequently make a few common mistakes that can prolong the resolution process or create new problems. A primary error is failing to restart the computer and/or network equipment after applying changes. Many network configuration adjustments, especially driver updates or IP/DNS resets, require a full system restart to take effect. Another mistake is jumping directly to complex solutions without first trying the simpler, more effective steps like power cycling the router or flushing the DNS cache, which often resolve the issue quickly. Lastly, users sometimes forget to re-enable security features (like firewalls or antivirus) after temporarily disabling them for testing, leaving their system vulnerable. It is crucial to systematically test each change and revert any unnecessary alterations.

### Prevention Tips

Preventing the "DNS Server Not Responding" error often comes down to maintaining good network hygiene and keeping your system updated. Regularly update your router's firmware to ensure it has the latest bug fixes and security patches, as outdated firmware can lead to stability issues. Keep your Windows operating system and all network adapter drivers updated; Windows Update typically handles this, but manual checks, especially for network drivers, can be beneficial. Consider using reliable, public DNS servers (like Google or Cloudflare) as a permanent setting if your ISP's DNS servers are frequently problematic. Avoid making arbitrary changes to your network adapter settings unless guided by a specific troubleshooting procedure. Finally, periodically running system scans with reputable antivirus software can help prevent malware from interfering with network functions, which can sometimes manifest as DNS resolution issues.