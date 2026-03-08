---
title: "How to Resolve \"DNS Server Not Responding\" Error on Windows 10/11"
date: "2026-03-08T10:24:19.348Z"
slug: "how-to-resolve-dns-server-not-responding-error-on-windows-10-11"
type: "how-to"
description: "Comprehensive guide to fix the \"DNS Server Not Responding\" error on Windows 10/11. Learn step-by-step solutions including flushing DNS, changing server addresses, and driver updates."
keywords: "DNS Server Not Responding, Windows 10, Windows 11, DNS error fix, internet access issue, network troubleshooting, ipconfig, change DNS, network adapter"
---

### Problem Explanation

The "DNS Server Not Responding" error is a common networking issue that prevents your Windows 10 or 11 computer from accessing the internet effectively. When this problem occurs, your web browser will typically display messages like "This site can't be reached," "ERR_NAME_NOT_RESOLVED," or simply fail to load any webpage. You might also see a yellow exclamation mark over your network icon in the system tray, indicating "No Internet access" or "Limited connectivity," even if you are connected to your Wi-Fi network or have an Ethernet cable plugged in.

Essentially, your computer cannot translate human-readable domain names (like google.com) into numerical IP addresses that computers use to locate websites on the internet. Without this translation, your system doesn't know where to send requests, resulting in the inability to browse the web, access online services, or run applications that require an active internet connection.

### Why It Happens

This error primarily indicates a failure in the Domain Name System (DNS) resolution process. DNS acts like the internet's phonebook, converting domain names into IP addresses. When your DNS server, which is usually provided by your internet service provider (ISP) or configured manually, fails to respond to your computer's requests, the connection breaks down.

Root causes can vary widely. It could stem from a temporary glitch with your router or modem, outdated or corrupt network adapter drivers on your computer, incorrect DNS settings, a clogged DNS cache, or even interference from third-party security software like firewalls or antivirus programs. Less commonly, the issue might be on your ISP's end, with their DNS servers experiencing an outage or maintenance. Understanding these potential causes is the first step towards an effective troubleshooting strategy.

### Step-by-Step Solution

Follow these steps in order to systematically diagnose and resolve the "DNS Server Not Responding" error.

#### 1. Perform Basic Network Checks and Restart Router

Before diving into complex software fixes, ensure the most fundamental aspects of your network are functioning.

1.  **Check Physical Connections:** If using an Ethernet cable, ensure it's securely plugged into both your computer and the router/modem. Try a different port on the router or a different cable if available. For Wi-Fi, ensure your device is connected to the correct network and the signal strength is adequate.
2.  **Restart Your Router/Modem:** Unplug the power cable from your router and modem (if separate devices). Wait for at least 30 seconds, then plug the modem back in. Wait for it to fully boot up (status lights should be steady), then plug in your router and wait for it to boot up as well. This simple power cycle can clear temporary glitches and re-establish a stable connection.
3.  **Test with Another Device:** Try accessing the internet from another device (smartphone, tablet, another computer) connected to the same network. If other devices can connect, the issue is likely specific to your Windows computer.

#### 2. Flush DNS Cache and Reset IP Configuration

Your computer stores a local cache of DNS resolutions to speed up future lookups. This cache can become corrupted, leading to resolution failures. Resetting your network's IP configuration can also resolve underlying issues.

1.  **Open Command Prompt as Administrator:** Search for "cmd" in the Windows search bar, right-click on "Command Prompt," and select "Run as administrator."
2.  **Execute DNS Flush and Registration:** Type the following commands, pressing Enter after each one:
    ```cmd
    ipconfig /flushdns
    ipconfig /registerdns
    ```
3.  **Reset IP Configuration:** Continue with these commands to release and renew your IP address and reset network protocols:
    ```cmd
    ipconfig /release
    ipconfig /renew
    netsh winsock reset
    netsh int ip reset
    ```
4.  **Restart Your Computer:** After executing all commands, restart your computer to ensure all changes take effect. Test your internet connection.

#### 3. Change Your DNS Server Address

If your ISP's default DNS servers are unreliable or unresponsive, switching to public DNS servers (like Google Public DNS or Cloudflare DNS) can often resolve the issue.

1.  **Open Network Connections:** Go to `Settings > Network & Internet > Advanced network settings > More network adapter options` (Windows 11) or `Control Panel > Network and Sharing Center > Change adapter settings` (Windows 10).
2.  **Access Adapter Properties:** Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
3.  **Configure IPv4 DNS:**
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    *   Choose "Use the following DNS server addresses."
    *   Enter the preferred and alternate DNS server addresses. Popular, reliable options include:
        *   **Google Public DNS:** Preferred: `8.8.8.8`, Alternate: `8.8.4.4`
        *   **Cloudflare DNS:** Preferred: `1.1.1.1`, Alternate: `1.0.0.1`
    *   Click "OK" to save changes.
4.  **Configure IPv6 DNS (Optional, but Recommended):**
    *   Select "Internet Protocol Version 6 (TCP/IPv6)" and click "Properties."
    *   Choose "Use the following DNS server addresses."
    *   For Google Public DNS IPv6: Preferred: `2001:4860:4860::8888`, Alternate: `2001:4860:4860::8844`
    *   For Cloudflare DNS IPv6: Preferred: `2606:4700:4700::1111`, Alternate: `2606:4700:4700::1001`
    *   Click "OK" and then "Close" on the adapter properties window.
5.  **Restart Your Computer** and test your connection.

#### 4. Update Network Adapter Drivers

Outdated or corrupt network adapter drivers can lead to various connectivity issues, including DNS resolution problems.

1.  **Open Device Manager:** Right-click the Start button and select "Device Manager."
2.  **Locate Network Adapters:** Expand the "Network adapters" section.
3.  **Update Driver:** Right-click on your active network adapter (e.g., "Intel(R) Dual Band Wireless-AC 7260" or "Realtek PCIe GbE Family Controller") and select "Update driver."
4.  **Search Automatically:** Choose "Search automatically for updated driver software." If Windows finds a newer driver, follow the prompts to install it.
5.  **Manual Update (If automatic fails):** If no updates are found, visit your computer manufacturer's website or the network adapter manufacturer's website (e.g., Intel, Realtek, Broadcom). Download the latest driver for your specific model and Windows version. You may need another internet-connected device to do this. Once downloaded, return to Device Manager, right-click the adapter, choose "Update driver," then "Browse my computer for driver software," and navigate to the downloaded driver file.
6.  **Restart Your Computer** after the driver update is complete.

#### 5. Disable IPv6 and Check Firewall Settings

Sometimes, issues with IPv6 implementation can cause DNS problems. Additionally, an overzealous firewall might block DNS traffic.

1.  **Disable IPv6 (Temporarily for Testing):**
    *   Repeat steps 1 and 2 from "Change Your DNS Server Address" to open your network adapter's properties.
    *   Uncheck the box next to "Internet Protocol Version 6 (TCP/IPv6)."
    *   Click "OK" and "Close."
    *   Restart your computer and test. If this resolves the issue, you can leave IPv6 disabled or investigate further for root causes (e.g., router firmware updates). Remember to re-enable it if it doesn't help.
2.  **Check Windows Firewall:**
    *   Search for "Windows Defender Firewall" in the Windows search bar and open it.
    *   Click "Allow an app or feature through Windows Defender Firewall" on the left pane.
    *   Ensure that any browser or network-dependent applications are allowed. While Windows Firewall typically allows DNS, custom rules or third-party firewalls can interfere.
3.  **Temporarily Disable Third-Party Antivirus/Firewall:** If you have any third-party antivirus software or a security suite installed, temporarily disable its firewall component or the entire program (consult its documentation for instructions). Test your internet connection. If the issue resolves, re-enable the software and look for settings within it that might be blocking DNS traffic, or consider a different security solution.

#### 6. Run Windows Network Troubleshooter

Windows includes built-in troubleshooters that can automatically detect and fix common network problems.

1.  **Access Troubleshooter:** Go to `Settings > Network & Internet > Advanced network settings > Network troubleshooter` (Windows 11) or `Settings > Network & Internet > Status > Network troubleshooter` (Windows 10).
2.  **Follow Prompts:** Run the troubleshooter and follow any on-screen instructions. It will attempt to identify and resolve network issues, including DNS-related problems.
3.  **Review Results:** Pay attention to any suggestions or fixes the troubleshooter provides, even if it doesn't fully resolve the issue.

### Common Mistakes

When troubleshooting the "DNS Server Not Responding" error, users often make several common mistakes that can prolong the resolution process or lead to frustration:

*   **Skipping the Basic Restart:** Many users jump straight to complex software fixes without first restarting their router and computer. A simple power cycle often resolves transient network glitches more effectively than any command.
*   **Incorrectly Entering DNS Addresses:** When manually changing DNS servers, typing an incorrect IP address or mixing up IPv4 and IPv6 entries will simply replace one problem with another, preventing proper resolution. Double-check every digit.
*   **Forgetting to Flush DNS and Reset IP:** Even after changing DNS servers, an old, corrupted DNS cache or stale IP configuration can prevent the new settings from taking effect immediately. The `ipconfig /flushdns` and `netsh` commands are crucial.
*   **Ignoring Physical Connections:** Assuming Wi-Fi or Ethernet cables are fine without visually inspecting them or trying alternatives can lead to hours of futile software troubleshooting for what is a basic hardware issue.
*   **Overlooking Firewall Interference:** Users often forget that third-party antivirus or firewall software can sometimes aggressively block legitimate network traffic, including DNS queries, especially after a software update or configuration change.

### Prevention Tips

To minimize the chances of encountering the "DNS Server Not Responding" error again, adopt these best practices:

*   **Keep Router Firmware Updated:** Regularly check your router manufacturer's website for firmware updates. Newer firmware often includes bug fixes and performance improvements that can enhance network stability and DNS handling.
*   **Use Reliable DNS Servers:** Consider permanently switching to public, reliable DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) instead of relying solely on your ISP's potentially less stable servers.
*   **Maintain Up-to-Date Network Drivers:** Ensure your network adapter drivers are current. While Windows Update handles many drivers, manually checking your computer or adapter manufacturer's website periodically can ensure you have the absolute latest versions, which often include stability improvements.
*   **Run Regular Malware Scans:** Malicious software can interfere with network settings and DNS resolution. Use a reputable antivirus program to perform regular full system scans to detect and remove any threats.
*   **Monitor Network Health:** If your router has a management interface, occasionally check its status logs for any recurring errors or dropped connections that might indicate underlying issues. Avoid unnecessarily tweaking network settings unless you understand their function.