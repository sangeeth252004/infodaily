---
title: "How to Fix 'DNS Server Isn't Responding' Error on Windows 10/11"
date: "2026-11-14T04:58:29.130Z"
slug: "how-to-fix-dns-server-isn-t-responding-error-on-windows-10-11"
type: "how-to"
description: "Resolve the 'DNS Server Isn't Responding' error on Windows 10 and 11 with this comprehensive guide. Learn step-by-step solutions to restore internet access, from flushing DNS to changing server addresses and updating drivers."
keywords: "DNS server isn't responding, Windows 10 DNS fix, Windows 11 DNS error, fix DNS error, internet not working, DNS_PROBE_FINISHED_NO_INTERNET, flush DNS, change DNS server, network troubleshooting"
---

When your computer struggles to connect to the internet, and you see messages like "DNS Server Isn't Responding" or encounter browser errors such as "DNS_PROBE_FINISHED_NO_INTERNET," it can be a frustrating experience. This error typically prevents you from loading websites, accessing online services, and generally disrupts your internet connectivity, even if your network status indicates you're connected. You might find that some applications work while others fail, or that your entire internet access is blocked.

The "DNS Server Isn't Responding" error specifically indicates a problem with your computer's ability to translate human-readable website addresses (like `www.example.com`) into numerical IP addresses that computers use to locate each other on the internet. This translation service is performed by DNS (Domain Name System) servers. When these servers fail to respond, your computer cannot find the web servers it needs to load content, resulting in the error message and an inability to browse the web.

### Why It Happens

The underlying causes for a non-responsive DNS server can vary, ranging from simple network glitches to more complex software conflicts or misconfigurations. Often, the issue stems from your router or modem experiencing a temporary fault, preventing it from correctly relaying DNS requests. Incorrect DNS settings on your Windows machine, either manually entered or corrupted, can also lead to this problem, directing your system to a non-existent or overloaded DNS server.

Other potential culprits include outdated or corrupted network adapter drivers, which can hinder your computer's communication with the network hardware. Firewall or antivirus software might aggressively block DNS traffic, mistakenly identifying it as a threat. Furthermore, a corrupted local DNS cache on your computer can store outdated information, preventing fresh lookups. Less commonly, but still possible, the DNS servers provided by your Internet Service Provider (ISP) might be experiencing outages or performance issues.

### Step-by-Step Solution

Follow these steps carefully to diagnose and resolve the "DNS Server Isn't Responding" error on your Windows 10 or 11 system.

## Step 1: Restart Your Router/Modem and Computer

Many network-related issues can be resolved with a simple power cycle of your network hardware. This clears temporary caches and resets network connections.

1.  **Shut down your computer:** Go to Start > Power > Shut down.
2.  **Unplug your router and modem:** Locate the power cables for both your internet modem (the device that brings internet into your home) and your Wi-Fi router (if separate), and unplug them from the electrical outlet.
3.  **Wait for 30-60 seconds:** This allows the devices to fully discharge.
4.  **Plug your modem back in:** Wait for all the indicator lights on the modem to stabilize, usually 1-2 minutes.
5.  **Plug your router back in:** Wait for its indicator lights to stabilize.
6.  **Start your computer:** Once all devices are fully powered up and stable, turn on your computer and check if the internet connection is restored.

## Step 2: Flush DNS Cache and Reset Network Configuration

Your Windows system maintains a local DNS cache. If this cache becomes corrupted or contains outdated entries, it can cause DNS resolution problems. Resetting network configurations can also resolve underlying issues.

1.  **Open Command Prompt as Administrator:**
    *   On Windows 10, search for "cmd" in the Start menu, right-click "Command Prompt," and select "Run as administrator."
    *   On Windows 11, right-click the Start button, select "Terminal (Admin)" or "Windows PowerShell (Admin)."
2.  **Execute the following commands one by one, pressing Enter after each:**
    *   `ipconfig /flushdns` (This clears your computer's local DNS cache.)
    *   `ipconfig /registerdns` (This attempts to register DNS names.)
    *   `ipconfig /release` (This releases your current IP address.)
    *   `ipconfig /renew` (This requests a new IP address from your router.)
    *   `netsh winsock reset` (This resets the Winsock catalog, which manages network services.)
    *   `netsh int ip reset` (This resets TCP/IP settings.)
3.  **Restart your computer:** After executing all commands, restart your PC to ensure all changes take effect.

## Step 3: Change Your DNS Server Address

If your ISP's DNS servers are unreliable, switching to public DNS servers like Google DNS or Cloudflare DNS can often resolve the problem and even improve browsing speed.

1.  **Open Network Connections:**
    *   Right-click the network icon in your system tray (bottom-right corner) and select "Open Network & Internet settings" (Windows 10) or "Network and Internet settings" (Windows 11).
    *   Go to "Change adapter options" (Windows 10) or "Advanced network settings" then "More network adapter options" (Windows 11).
2.  **Select Your Network Adapter:** Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and choose "Properties."
3.  **Configure IPv4 Properties:**
    *   In the Properties window, select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
4.  **Enter New DNS Server Addresses:**
    *   Select "Use the following DNS server addresses."
    *   For Google Public DNS:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   For Cloudflare DNS:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" twice to save the changes.
5.  **Restart your computer:** Reboot your system to apply the new DNS settings.

## Step 4: Update Your Network Adapter Drivers

Outdated or corrupted network drivers can lead to connectivity issues, including DNS problems.

1.  **Open Device Manager:**
    *   Right-click the Start button and select "Device Manager."
2.  **Locate Network Adapters:** Expand the "Network adapters" category.
3.  **Update Driver:**
    *   Right-click on your network adapter (e.g., "Intel(R) Dual Band Wireless-AC" or "Realtek PCIe GbE Family Controller").
    *   Select "Update driver."
    *   Choose "Search automatically for updated driver software." If Windows finds a newer driver, follow the prompts to install it.
    *   If Windows doesn't find one, you can try "Browse my computer for driver software" and then "Let me pick from a list of available drivers on my computer" to select an older version that might be more stable.
    *   **Advanced Tip:** For the best results, visit your computer manufacturer's website (or the network adapter manufacturer's website) and download the latest drivers specifically for your model and Windows version. Install them manually after uninstalling the current driver in Device Manager (check the "Delete the driver software for this device" box if prompted).
4.  **Restart your computer:** After updating or reinstalling drivers, always restart your PC.

## Step 5: Temporarily Disable Windows Firewall or Antivirus

Security software can sometimes interfere with network connections, including DNS queries. Temporarily disabling them can help determine if they are the cause.

1.  **Disable Windows Defender Firewall (Temporarily):**
    *   Search for "Windows Defender Firewall" in the Start menu and open it.
    *   Click "Turn Windows Defender Firewall on or off" on the left pane.
    *   Select "Turn off Windows Defender Firewall (not recommended)" for both Private and Public networks.
    *   Click "OK."
2.  **Disable Third-Party Antivirus (Temporarily):**
    *   Locate your antivirus software icon in the system tray, right-click it, and look for an option to "Disable," "Stop," or "Exit." Consult your antivirus software's documentation for exact steps.
3.  **Test your internet connection:** Try accessing websites.
4.  **Re-enable Firewall/Antivirus:** **Crucially, re-enable your firewall and antivirus immediately after testing** to protect your system. If disabling them resolved the issue, you might need to add exceptions for DNS traffic or consider different security software.

## Step 6: Run the Network Troubleshooter

Windows includes built-in troubleshooters that can automatically detect and fix common network problems.

1.  **Open Settings:** Press `Windows Key + I`.
2.  **Navigate to Troubleshooters:**
    *   On Windows 10: Go to "Update & Security" > "Troubleshoot" > "Additional troubleshooters."
    *   On Windows 11: Go to "System" > "Troubleshoot" > "Other troubleshooters."
3.  **Run Network Adapter Troubleshooter:** Find "Network Adapter" (or "Internet Connections" on Windows 10) and click "Run the troubleshooter."
4.  **Follow On-Screen Instructions:** Allow the troubleshooter to diagnose and attempt to fix any detected issues.

## Step 7: Check for VPN or Proxy Settings

VPNs and proxy servers often route network traffic through their own DNS servers. If these services are misconfigured or experiencing issues, they can lead to the "DNS Server Isn't Responding" error.

1.  **Check VPN Connection:** If you use a VPN, try disconnecting from it completely and then test your internet connection. If the internet works without the VPN, the issue lies with your VPN service or its configuration.
2.  **Check Proxy Settings:**
    *   On Windows 10: Go to Start > Settings > Network & Internet > Proxy. Ensure "Automatically detect settings" is enabled and "Use a proxy server" is turned off, unless you specifically require a proxy.
    *   On Windows 11: Go to Start > Settings > Network & Internet > Proxy. Ensure "Automatically detect settings" is enabled and "Use a proxy server" is turned off, unless you specifically require a proxy.
3.  **Disable Proxy (if active and not needed):** If a proxy server is configured and you don't use one, toggle the "Use a proxy server" option to "Off."
4.  **Test connection:** See if disabling VPN or proxy resolves the issue.

### Common Mistakes

When troubleshooting the "DNS Server Isn't Responding" error, users often make several common mistakes that can prolong the resolution process or lead to frustration. A frequent oversight is skipping the most basic step: restarting the router/modem and the computer. Many transient network glitches are resolved by a simple power cycle, yet people jump to more complex solutions first. Another mistake is failing to reboot the computer after making significant network configuration changes, such as flushing the DNS cache or changing DNS server addresses. These changes often require a fresh system start to take full effect.

Users sometimes change their DNS servers without verifying if the new addresses are correct or reliable, potentially exacerbating the problem. Overlooking the possibility of interference from security software like firewalls or antivirus programs is also common; these tools can mistakenly block legitimate DNS traffic. Finally, some users neglect to update their network adapter drivers, assuming Windows will handle it automatically, when a manual check of the manufacturer's website might reveal a crucial stability update.

### Prevention Tips

To minimize the chances of encountering the "DNS Server Isn't Responding" error again, consider implementing these preventative measures:

Regularly update your network adapter drivers. While Windows Update provides some driver updates, checking your computer or network adapter manufacturer's website periodically for the latest versions can ensure optimal performance and stability. Keep your Windows operating system updated as well, as these updates often include network stack improvements and bug fixes. Consider using reliable, public DNS servers like Google DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) as your default, rather than solely relying on your ISP's potentially less stable servers.

Periodically restart your router and modem, perhaps once a month or whenever you notice a slight dip in network performance. This simple habit can prevent many network-related issues from escalating. Furthermore, ensure your router's firmware is up-to-date; check your router manufacturer's website for firmware updates and installation instructions. Lastly, be mindful of installing too many conflicting network utilities, VPNs, or aggressive firewall rules, as these can sometimes create unforeseen conflicts that interfere with DNS resolution.