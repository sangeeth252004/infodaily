---
title: "How to Fix \"DNS Server Isn't Responding\" Error on Windows 10/11"
date: "2026-08-16T10:20:47.908Z"
slug: "how-to-fix-dns-server-isn-t-responding-error-on-windows-10-11"
type: "how-to"
description: "A comprehensive guide to troubleshoot and fix the \"DNS Server Isn't Responding\" error on Windows 10 and 11, with detailed steps, common mistakes, and prevention tips."
keywords: "DNS server not responding, Windows 10, Windows 11, DNS error fix, network troubleshooting, ipconfig /flushdns, change DNS server, network driver update"
---

The "DNS Server Isn't Responding" error is a common and frustrating network connectivity issue encountered by users on Windows 10 and 11. When this problem arises, your computer struggles to connect to the internet, or certain websites and online services become inaccessible. You might experience extremely slow browsing speeds, or web pages simply fail to load, displaying messages like "This site can't be reached" or `ERR_NAME_NOT_RESOLVED` in your browser. Often, the Network and Sharing Center in Windows will show a yellow exclamation mark over your network connection icon, indicating "No Internet Access" or "Limited connectivity," even if your Wi-Fi or Ethernet connection appears active.

This error specifically points to a failure in the Domain Name System (DNS) resolution process. DNS acts as the internet's phonebook, translating human-readable website names (like `example.com`) into machine-readable IP addresses (like `192.0.2.1`). When your DNS server fails to respond, your computer cannot perform this crucial translation, effectively preventing it from finding and connecting to the servers hosting the websites or services you're trying to reach.

### Why It Happens

The "DNS Server Isn't Responding" error typically indicates that your computer is unable to communicate with the DNS server it's configured to use. This can stem from several underlying causes, ranging from simple network hiccups to more complex configuration issues. Your router or modem might be experiencing a temporary fault, preventing it from relaying DNS requests or responses. Similarly, your ISP's DNS servers themselves could be down or overloaded, leading to unresponsiveness.

Beyond external factors, the problem can often originate directly from your Windows system. Outdated or corrupted network adapter drivers can interfere with proper network communication, including DNS queries. Incorrectly configured DNS settings on your computer, a corrupted DNS cache, or interference from a VPN client or a firewall can also block DNS traffic. In some cases, malware or other network-interfering software can compromise your system's ability to resolve domain names, manifesting as this particular error.

### Step-by-Step Solution

Solving the "DNS Server Isn't Responding" error often involves a systematic approach, addressing the most common causes first. Follow these steps sequentially to troubleshoot and resolve the issue.

## Step 1: Restart Your Network Hardware

Often, temporary glitches in your router or modem can cause DNS resolution problems. A simple restart can clear these issues and re-establish a fresh connection with your ISP's DNS servers.

1.  **Unplug your router and modem** from their power outlets.
2.  **Wait for at least 30 seconds** to ensure all cached data is cleared.
3.  **Plug your modem back in** and wait for it to fully boot up (usually indicated by stable status lights).
4.  **Plug your router back in** and wait for it to fully boot up.
5.  **Restart your Windows PC** after your network hardware is back online.
6.  **Test your internet connection.**

## Step 2: Flush DNS Cache and Reset Network Configuration

Your Windows PC maintains a local cache of DNS resolutions to speed up future requests. A corrupted cache can lead to errors. Resetting network configuration components can also resolve underlying connectivity issues.

1.  **Open Command Prompt as an administrator:**
    *   Press `Windows key + R`, type `cmd`, then press `Ctrl + Shift + Enter`.
    *   Alternatively, search for "cmd" in the Start menu, right-click "Command Prompt," and select "Run as administrator."
2.  **Execute the following commands one by one, pressing Enter after each:**
    *   `ipconfig /flushdns` (Clears your computer's DNS resolver cache)
    *   `ipconfig /registerdns` (Registers DNS names with your DNS server)
    *   `ipconfig /release` (Releases your current IP address configuration)
    *   `ipconfig /renew` (Renews your IP address configuration)
    *   `netsh winsock reset` (Resets the Winsock Catalog, which helps manage network connections)
    *   `netsh int ip reset` (Resets TCP/IP settings)
3.  **Restart your computer** after executing all commands.
4.  **Test your internet connection.**

## Step 3: Change Your DNS Server Addresses

If your current DNS server (often provided by your ISP) is unresponsive or unreliable, switching to a public DNS server can often resolve the issue. Google Public DNS and Cloudflare DNS are popular, reliable, and free options.

1.  **Open Network Connections:**
    *   Press `Windows key + R`, type `ncpa.cpl`, and press Enter.
    *   Alternatively, go to `Settings > Network & Internet > Advanced network settings > More network adapter options`.
2.  **Right-click on your active network adapter** (e.g., "Ethernet" or "Wi-Fi") and select **"Properties."**
3.  **Select "Internet Protocol Version 4 (TCP/IPv4)"** and click **"Properties."**
4.  **Select "Use the following DNS server addresses."**
5.  **Enter the preferred and alternate DNS server addresses:**
    *   **Google Public DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
6.  **Check "Validate settings upon exit"** and click **"OK,"** then **"Close."**
7.  **Restart your computer** (recommended, though not always strictly necessary).
8.  **Test your internet connection.** If this resolves the issue, your ISP's DNS servers might be the problem.

## Step 4: Update Network Adapter Drivers

Outdated or corrupted network drivers can cause various connectivity problems, including DNS resolution failures. Ensuring your drivers are current is crucial for stable network performance.

1.  **Open Device Manager:**
    *   Press `Windows key + R`, type `devmgmt.msc`, and press Enter.
    *   Alternatively, search for "Device Manager" in the Start menu.
2.  **Expand "Network adapters."**
3.  **Right-click on your primary network adapter** (e.g., "Realtek PCIe GbE Family Controller" for Ethernet or "Intel(R) Wi-Fi 6 AX201" for Wi-Fi) and select **"Update driver."**
4.  **Choose "Search automatically for drivers."** Windows will attempt to find and install the latest drivers.
5.  If Windows reports that the best drivers are already installed, or if the problem persists, consider visiting your **PC manufacturer's website** (e.g., Dell, HP, Lenovo) or the **network adapter manufacturer's website** (e.g., Intel, Realtek, Broadcom). Download the latest drivers specifically for your model and operating system, then install them manually.
6.  **Restart your computer** after updating drivers.
7.  **Test your internet connection.**

## Step 5: Temporarily Disable Firewall and Antivirus

Sometimes, security software (firewalls, antivirus programs, VPNs) can mistakenly block legitimate DNS traffic, leading to connection issues. Temporarily disabling them can help identify if they are the root cause.

1.  **Temporarily disable your third-party antivirus software:** Right-click its icon in the system tray and look for an option like "Disable," "Pause protection," or "Exit."
2.  **Temporarily disable Windows Defender Firewall:**
    *   Search for "Windows Defender Firewall" in the Start menu and open it.
    *   Click "Turn Windows Defender Firewall on or off" on the left pane.
    *   Select "Turn off Windows Defender Firewall (not recommended)" for both private and public networks. Click "OK."
3.  **If you use a VPN, temporarily disable or uninstall it.**
4.  **Test your internet connection.**
5.  **IMPORTANT:** If disabling the firewall/antivirus resolves the issue, immediately re-enable them to protect your system. Then, investigate their settings to allow DNS traffic or report the issue to the software vendor. Do not leave your system unprotected.

## Step 6: Run the Windows Network Troubleshooter

Windows includes a built-in troubleshooter that can automatically diagnose and fix common network problems.

1.  **Open Windows Settings:** Press `Windows key + I`.
2.  Go to `Network & Internet` (Windows 10) or `Network & internet` (Windows 11).
3.  Click on `Advanced network settings`.
4.  Scroll down and click on `Network troubleshooter`.
5.  Follow the on-screen prompts. The troubleshooter will attempt to identify and fix issues with your network adapters and connections.
6.  **Test your internet connection.**

### Common Mistakes

When troubleshooting the "DNS Server Isn't Responding" error, users often make several common mistakes that can prolong the resolution process or create new issues:

*   **Forgetting to restart the PC:** After executing commands like `netsh winsock reset` or changing DNS settings, a system restart is often crucial for the changes to take full effect. Many users skip this step, leading them to believe a solution didn't work when it simply hadn't been fully applied.
*   **Not testing after each step:** It's important to test your internet connection after completing each troubleshooting step. This helps you identify exactly which action resolved the problem, making it easier to pinpoint the root cause and prevent future occurrences. Skipping tests can lead to unnecessary further troubleshooting.
*   **Permanently disabling security software:** While temporarily disabling your firewall or antivirus can be a valid diagnostic step, forgetting to re-enable them leaves your system vulnerable. Always re-enable security software immediately after testing, even if it was the cause of the problem, and then adjust its settings accordingly.
*   **Overlooking router/modem issues:** Many users immediately jump into Windows settings without first performing the most basic troubleshooting step: restarting their network hardware. Routers and modems are complex devices that can experience temporary glitches, and a simple power cycle can often resolve DNS-related issues originating from them.

### Prevention Tips

To minimize the chances of encountering the "DNS Server Isn't Responding" error again, consider implementing these best practices for network and system maintenance:

*   **Regularly Update Network Drivers:** Keep your network adapter drivers up to date. While Windows Update often handles this, occasionally checking your PC manufacturer's or adapter manufacturer's website for the latest drivers can prevent compatibility or performance issues that might lead to DNS errors.
*   **Maintain Router Firmware:** Periodically check for and install firmware updates for your router. Router manufacturers release updates to improve performance, enhance security, and fix bugs that could affect network stability and DNS resolution.
*   **Use Reliable DNS Servers:** Consider permanently using public DNS servers like Google (8.8.8.8, 8.8.4.4) or Cloudflare (1.1.1.1, 1.0.0.1) instead of relying solely on your ISP's DNS servers, which can sometimes be slower or less reliable.
*   **Practice Network Hygiene:** Avoid installing unnecessary or suspicious network-related software, especially VPNs or proxy tools, unless you fully trust their source and need their functionality. Such software can sometimes interfere with DNS resolution.
*   **Perform Routine System Scans:** Regularly scan your system for malware and viruses using reputable antivirus software. Malicious software can alter network settings or interfere with DNS resolution, leading to connectivity problems.