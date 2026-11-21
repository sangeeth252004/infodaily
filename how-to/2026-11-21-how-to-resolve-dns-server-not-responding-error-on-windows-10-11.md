---
title: "How to Resolve \"DNS Server Not Responding\" Error on Windows 10/11"
date: "2026-11-21T17:05:56.301Z"
slug: "how-to-resolve-dns-server-not-responding-error-on-windows-10-11"
type: "how-to"
description: "Fix the \"DNS Server Not Responding\" error on Windows 10/11 with this comprehensive, step-by-step guide. Learn common causes, solutions like flushing DNS, changing server settings, and prevention tips."
keywords: "DNS Server Not Responding, Windows 10, Windows 11, DNS error fix, network troubleshooting, ipconfig, flush DNS, change DNS server, network problem, internet connectivity"
---

### Problem Explanation

The "DNS Server Not Responding" error is a common internet connectivity issue that prevents your Windows 10 or Windows 11 computer from accessing websites and online services. When this problem occurs, you typically cannot browse the internet, although your device might still show a connected network status. Browsers will display messages such as "This site can't be reached," "No internet access," or "Server Not Found."

You might specifically encounter this error when running the Windows Network Troubleshooter, which will report "The DNS server isn't responding" or "Your computer appears to be correctly configured, but the device or resource (DNS server) is not responding." This indicates that while your system knows it's connected to a network, it cannot translate website names (like `google.com`) into their corresponding IP addresses, which is a fundamental step for any internet communication.

### Why It Happens

This error primarily occurs when your computer fails to connect to a Domain Name System (DNS) server, or when the DNS server itself is unavailable or misconfigured. DNS acts like the internet's phonebook, translating human-readable domain names into machine-readable IP addresses. Without a working DNS server, your browser doesn't know where to send requests for a website.

Several factors can cause this failure:
*   **Router/Modem Issues:** The most common culprits are your router or modem, which might be experiencing temporary glitches, outdated firmware, or incorrect DNS forwarding settings.
*   **Corrupted DNS Cache:** Your computer maintains a local cache of DNS resolutions. If this cache becomes corrupted, it can lead to incorrect or failed lookups.
*   **Incorrect DNS Server Settings:** Your network adapter might be configured with invalid or unresponsive DNS server addresses, either manually or via DHCP.
*   **DNS Client Service Problems:** The built-in DNS Client service on Windows might be stopped, stuck, or misbehaving.
*   **Network Adapter Issues:** Problems with your network adapter drivers, configuration, or even hardware can prevent proper communication.
*   **Firewall or Antivirus Interference:** Security software can sometimes incorrectly block DNS queries, mistaking them for malicious activity.
*   **ISP DNS Problems:** Occasionally, your Internet Service Provider's (ISP) default DNS servers might be down or experiencing widespread issues.

### Step-by-Step Solution

Follow these steps in order to diagnose and resolve the "DNS Server Not Responding" error. Test your internet connectivity after each step.

#### Step 1: Perform Basic Network Resets

Before diving into complex settings, ensure your network hardware is not the source of the problem.

1.  **Restart Router and Modem:** Unplug your router and modem from their power sources. Wait for at least 30 seconds, then plug the modem back in and wait for it to fully boot (usually indicated by stable status lights). Then, plug in your router and wait for it to boot completely. This clears temporary glitches and refreshes network connections.
2.  **Check Cables:** Ensure all Ethernet cables are securely plugged into your computer, router, and modem. If using Wi-Fi, ensure your computer is connected to the correct network and within range.
3.  **Test with Another Device:** Try connecting another device (e.g., a smartphone or tablet) to the same network. If other devices also cannot access the internet, the problem likely lies with your router, modem, or ISP.

#### Step 2: Flush DNS Cache and Reset IP Configuration

A corrupted local DNS cache or stale IP configuration can prevent proper resolution.

1.  **Open Command Prompt as Administrator:** Search for `cmd` in the Start menu, right-click "Command Prompt," and select "Run as administrator."
2.  **Execute DNS Flush Commands:** Type the following commands one by one, pressing Enter after each:
    ```cmd
    ipconfig /flushdns
    ipconfig /registerdns
    ipconfig /release
    ipconfig /renew
    netsh winsock reset
    netsh int ip reset
    ```
    *   `ipconfig /flushdns` clears your computer's DNS resolver cache.
    *   `ipconfig /registerdns` attempts to register DNS names again.
    *   `ipconfig /release` releases your current IP address.
    *   `ipconfig /renew` requests a new IP address from your DHCP server (usually your router).
    *   `netsh winsock reset` resets the Winsock catalog, which handles how Windows interacts with network services.
    *   `netsh int ip reset` resets the TCP/IP stack.
3.  **Restart Your Computer:** A full system restart is often required for these changes to take full effect.

#### Step 3: Change Your DNS Server to Public DNS

Using reliable public DNS servers like Google DNS or Cloudflare DNS can bypass issues with your ISP's DNS servers or local network configuration.

1.  **Open Network Connections:** Press `Windows Key + R`, type `ncpa.cpl`, and press Enter. This opens the Network Connections window.
2.  **Access Adapter Properties:** Right-click on your active network adapter (e.g., "Ethernet" for wired, "Wi-Fi" for wireless) and select "Properties."
3.  **Configure IPv4 DNS:**
    *   In the properties window, select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    *   Select "Use the following DNS server addresses."
    *   Enter the preferred and alternate DNS server addresses.
        *   **Google Public DNS:**
            *   Preferred DNS server: `8.8.8.8`
            *   Alternate DNS server: `8.8.4.4`
        *   **Cloudflare DNS:**
            *   Preferred DNS server: `1.1.1.1`
            *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" twice to save changes and close all windows.
4.  **Test Connectivity:** Open your browser and try to visit a few websites.

#### Step 4: Restart the DNS Client Service

The DNS Client service is crucial for local DNS resolution. If it's not running or is stuck, it can cause problems.

1.  **Open Services Manager:** Press `Windows Key + R`, type `services.msc`, and press Enter.
2.  **Locate DNS Client:** Scroll down and find "DNS Client" in the list.
3.  **Restart Service:**
    *   Right-click "DNS Client" and select "Restart." If "Restart" is greyed out, select "Stop" first, wait a few seconds, then right-click again and select "Start."
    *   Ensure the "Startup type" for DNS Client is set to "Automatic." Right-click, select "Properties," change the "Startup type" if necessary, and click "Apply" then "OK."
4.  **Test Connectivity:** Check if the internet connection is restored.

#### Step 5: Disable IPv6 (Temporary Fix or Specific Issue)

While IPv6 is the future, some older routers or network configurations can have issues with it, leading to DNS problems. Disabling it can sometimes resolve the error.

1.  **Open Network Connections:** Press `Windows Key + R`, type `ncpa.cpl`, and press Enter.
2.  **Access Adapter Properties:** Right-click on your active network adapter and select "Properties."
3.  **Disable IPv6:** In the properties window, uncheck the box next to "Internet Protocol Version 6 (TCP/IPv6)."
4.  **Save Changes:** Click "OK" to close the window.
5.  **Test Connectivity:** See if your internet access is restored. If this resolves the issue, you might consider leaving IPv6 disabled until you can update your router firmware or resolve any specific IPv6 configuration conflicts.

#### Step 6: Temporarily Disable Firewall/Antivirus

Your security software might be mistakenly blocking DNS traffic.

1.  **Disable Temporarily:** Locate your antivirus software icon in the system tray (bottom-right corner of the screen), right-click it, and look for an option to "Disable temporarily" or "Pause protection." Similarly, you can temporarily disable Windows Defender Firewall via "Windows Security" settings.
2.  **Test Connectivity:** With the firewall/antivirus disabled, try accessing websites.
3.  **Re-enable and Investigate:** If disabling fixed the issue, immediately re-enable your security software. Then, investigate its settings to create an exception for DNS traffic or your web browser, or consider updating/reinstalling the software if it's outdated or corrupted. Running without protection is risky.

#### Step 7: Update Network Adapter Drivers

Outdated or corrupted network drivers can cause various connectivity problems, including DNS resolution failures.

1.  **Open Device Manager:** Right-click the Start button and select "Device Manager."
2.  **Locate Network Adapters:** Expand the "Network adapters" section.
3.  **Update Driver:**
    *   Right-click on your primary network adapter (e.g., "Intel(R) Ethernet Connection" or "Realtek PCIe GbE Family Controller" for wired, or your Wi-Fi adapter name).
    *   Select "Update driver."
    *   Choose "Search automatically for drivers." Windows will attempt to find and install the latest driver.
    *   If Windows reports that the best driver is already installed, visit your computer manufacturer's website or the network adapter manufacturer's website (e.g., Intel, Realtek, Broadcom) to download the latest drivers manually. Install them and then restart your computer.

### Common Mistakes

*   **Skipping Basic Checks:** Many users jump straight to complex commands without first restarting their router/modem or checking physical connections. These simple steps resolve a significant percentage of network issues.
*   **Not Testing After Each Step:** It's crucial to test your internet connection after completing each troubleshooting step. This helps pinpoint exactly which action resolved the problem and prevents unnecessary further troubleshooting.
*   **Incorrect Command Prompt Usage:** Forgetting to run Command Prompt as an administrator or mistyping commands will prevent them from executing correctly.
*   **Overlooking Firewall/Antivirus:** Assuming security software isn't the cause can lead to frustrating hours of troubleshooting. Temporarily disabling it (safely, for testing only) is a valid diagnostic step.
*   **Ignoring Other Devices:** If other devices on the same network also can't connect, the problem is likely with the router, modem, or ISP, not specifically your computer's DNS settings.

### Prevention Tips

*   **Regular Router Reboots:** Periodically rebooting your router (e.g., once a month) can prevent accumulation of minor glitches and refresh its internal state, improving overall network stability.
*   **Keep Drivers Updated:** Ensure your network adapter drivers are always up-to-date. Check your computer manufacturer's website regularly or use Windows Update.
*   **Use Reliable DNS Servers:** Consider permanently using public DNS servers like Google (8.8.8.8, 8.8.4.4) or Cloudflare (1.1.1.1, 1.0.0.1) if your ISP's DNS servers are frequently unreliable.
*   **Monitor Network Health:** Pay attention to unusual network slowdowns or disconnections, which can be early indicators of impending problems.
*   **Avoid Unnecessary VPNs/Proxies:** While useful, VPNs and proxy services can sometimes interfere with DNS resolution if misconfigured or experiencing issues. Only use them when necessary.
*   **Run Network Troubleshooter:** Windows' built-in Network Troubleshooter can often identify and fix common issues, and it's a good first step when connectivity problems arise.