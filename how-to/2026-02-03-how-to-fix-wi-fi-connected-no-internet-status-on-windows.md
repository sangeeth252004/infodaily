---
title: "How to Fix \"Wi-Fi Connected, No Internet\" Status on Windows"
date: "2026-02-03T15:49:55.993Z"
slug: "how-to-fix-wi-fi-connected-no-internet-status-on-windows"
type: "how-to"
description: "Troubleshoot and resolve the \"Wi-Fi Connected, No Internet\" error on Windows with this comprehensive guide. Learn the causes and step-by-step solutions for regaining internet access."
keywords: "Wi-Fi connected no internet, Windows network fix, no internet access, DNS flush, IP reset, network troubleshooter, internet troubleshooting, Wi-Fi problem, Windows 10, Windows 11"
---

### Problem Explanation

The "Wi-Fi Connected, No Internet" status on a Windows computer is a frustrating and common issue where your device shows that it's successfully connected to a wireless network, often displaying a strong signal, but fails to access any online resources. Visually, you might see the Wi-Fi icon in the system tray with a yellow exclamation mark or, in newer Windows versions, a globe icon indicating "No Internet access." Despite the connection, web browsers will display error messages like "This site can’t be reached," "No internet," or "DNS_PROBE_FINISHED_NO_INTERNET," and applications requiring internet connectivity will fail to load content or synchronize data. Essentially, your computer can communicate with your local router, but the router isn't successfully forwarding your requests to the wider internet, or your computer can't properly interpret the internet's responses.

This state is distinct from being completely disconnected from Wi-Fi (where the icon would show no available networks or a red X) or having a weak signal, which typically manifests as slow speeds. The core of this problem is a breakdown in the communication chain beyond the local wireless link, preventing data from flowing between your Windows machine and external servers on the internet, even though the local Wi-Fi connection itself appears stable.

### Why It Happens

This specific issue can stem from various points of failure, primarily falling into three categories: your Windows computer, your local network equipment (router/modem), or your Internet Service Provider (ISP). On the computer side, incorrect network settings, corrupted network adapter drivers, or issues with the DNS (Domain Name System) cache can prevent it from resolving website addresses or obtaining a valid IP address from the router. For instance, if your computer tries to use an outdated or incorrect DNS server, it won't be able to translate human-readable website names (like "google.com") into the numerical IP addresses computers use to find them.

At the network equipment level, the router or modem might be experiencing a temporary glitch, its internet connection might have dropped, or its internal firmware could be misconfigured. The router acts as the gateway to the internet; if it loses its connection to your ISP or fails to properly assign IP addresses to devices, your Windows PC will be "connected" to the router but unable to reach beyond it. Less frequently, but still possible, the problem might reside entirely with your ISP, where their service is temporarily down or experiencing an outage in your area, affecting all devices connected to your network, regardless of their local Wi-Fi status. Understanding these potential points of failure helps in systematically troubleshooting the problem.

### Step-by-Step Solution

Follow these steps in order, testing your internet connection after each one.

#### ## Step 1: Reboot Your Network Equipment and PC

Often, the simplest solution is the most effective. Many temporary glitches in network devices or your computer can be resolved with a fresh restart.

1.  **Power off your computer.**
2.  **Unplug your router and modem** (if they are separate devices) from their power outlets.
3.  **Wait for at least 30 seconds.** This allows the devices to fully power down and clear their temporary memory.
4.  **Plug your modem back in first.** Wait until all indicator lights (especially the internet/online light) stabilize, which can take a few minutes.
5.  **Plug your router back in.** Wait for its indicator lights to stabilize.
6.  **Power on your computer.**
7.  Once Windows has fully loaded, attempt to connect to the internet.

#### ## Step 2: Run the Windows Network Troubleshooter

Windows includes a built-in troubleshooter that can automatically detect and resolve common network issues.

1.  Right-click the **Wi-Fi icon** in your system tray (bottom-right corner of the screen).
2.  Select "**Troubleshoot problems**" or "**Diagnose network problems**."
3.  Follow the on-screen prompts. The troubleshooter will attempt to identify the issue and suggest fixes. It may reset your Wi-Fi adapter or make other changes.
4.  After the troubleshooter completes, check if the internet connection is restored.

#### ## Step 3: Flush DNS and Reset IP Stack

Corrupted DNS cache or IP configuration can prevent internet access. Flushing these settings forces your computer to request new ones.

1.  Press `Win + R` to open the Run dialog.
2.  Type `cmd` and press `Ctrl + Shift + Enter` to open **Command Prompt as an administrator**. Click "Yes" if prompted by User Account Control.
3.  Execute the following commands one by one, pressing `Enter` after each:
    *   `ipconfig /release` (This releases your current IP address.)
    *   `ipconfig /renew` (This requests a new IP address.)
    *   `ipconfig /flushdns` (This clears the DNS resolver cache.)
    *   `netsh int ip reset` (This resets the TCP/IP stack.)
    *   `netsh winsock reset` (This resets the Winsock catalog.)
4.  **Restart your computer** after executing all commands. This is crucial for the changes to take effect.

#### ## Step 4: Verify IP Configuration and DNS Servers

Ensure your computer is receiving a valid IP address and using correct DNS servers. An IP address starting with `169.254.x.x` (APIPA) indicates a failure to obtain an IP from your router.

1.  Open **Command Prompt as an administrator** (as in Step 3).
2.  Type `ipconfig /all` and press `Enter`.
3.  Look for your Wi-Fi adapter's details. Check the "IPv4 Address" and "Default Gateway."
    *   The **IPv4 Address** should typically start with `192.168.x.x` or `10.x.x.x` and not `169.254.x.x`.
    *   The **Default Gateway** should be the IP address of your router (e.g., `192.168.1.1`).
    *   Check the **DNS Servers**. These are often your router's IP or public DNS servers (like Google's `8.8.8.8` and `8.8.4.4`). If they are incorrect or missing, you may need to manually configure them in your Wi-Fi adapter's properties (right-click Wi-Fi icon -> Network & Internet settings -> Change adapter options -> right-click Wi-Fi adapter -> Properties -> IPv4 -> Properties -> "Use the following DNS server addresses").

#### ## Step 5: Update or Reinstall Wi-Fi Adapter Drivers

Outdated or corrupted network drivers can cause connectivity issues.

1.  Press `Win + X` and select "**Device Manager**."
2.  Expand "**Network adapters**."
3.  Right-click your Wi-Fi adapter (it might have "Wireless" or "802.11" in its name) and select "**Update driver**."
4.  Choose "**Search automatically for drivers**." If Windows finds a newer driver, install it.
5.  If updating doesn't help or no new drivers are found, try reinstalling: Right-click the Wi-Fi adapter, select "**Uninstall device**," then check the box "**Attempt to remove the driver software for this device**" if available.
6.  **Restart your computer.** Windows will usually reinstall the driver automatically. If not, go back to Device Manager, click "Action" > "Scan for hardware changes."
7.  Consider visiting your computer manufacturer's website (or the Wi-Fi adapter manufacturer's website) to download the latest driver manually, especially if automatic updates fail.

#### ## Step 6: Disable and Re-enable Network Adapter

This can often resolve minor glitches by refreshing the adapter's state.

1.  Press `Win + R`, type `ncpa.cpl`, and press `Enter` to open Network Connections.
2.  Right-click your Wi-Fi adapter (often named "Wi-Fi" or "Wireless Network Connection").
3.  Select "**Disable**."
4.  Wait a few seconds.
5.  Right-click the adapter again and select "**Enable**."
6.  Test your internet connection.

#### ## Step 7: Temporarily Disable Firewall/Antivirus/VPN

Security software or VPN clients can sometimes interfere with network connectivity.

1.  Temporarily **disable your third-party antivirus software** and **Windows Firewall**.
    *   For Windows Firewall: Search for "Windows Defender Firewall" in the Start menu, click "Turn Windows Defender Firewall on or off" on the left, and select "Turn off Windows Defender Firewall" for both private and public networks. **Remember to re-enable it after testing.**
    *   For antivirus: Right-click its icon in the system tray and look for an option to disable it temporarily.
2.  If you use a **VPN client**, ensure it's disconnected or temporarily disable its service.
3.  Test your internet connection. If it works, gradually re-enable your security software and VPN to identify the culprit, then adjust its settings accordingly. **Do not leave your firewall or antivirus disabled for extended periods.**

### Common Mistakes

When troubleshooting "Wi-Fi Connected, No Internet," users often make several common mistakes that can prolong the resolution process or lead to incorrect conclusions. The most prevalent error is **failing to restart all network equipment (modem and router) and the PC first.** Many issues are temporary glitches that a simple power cycle can fix, yet users often jump directly to complex command-line solutions without trying this essential initial step. Another mistake is **only troubleshooting the computer**, assuming the problem lies solely with Windows. This overlooks potential issues with the router, modem, or even the ISP. If other devices on the same Wi-Fi network also lack internet, the problem is likely external to your PC. Finally, **overlooking simple physical connections** on the modem and router, such as loose Ethernet cables connecting the modem to the router, can also be a pitfall, even for Wi-Fi-specific issues.

### Prevention Tips

To minimize the chances of encountering the "Wi-Fi Connected, No Internet" problem again, adopt these best practices:

1.  **Regularly Reboot Your Network Equipment:** Make it a habit to power cycle your modem and router at least once a month. This clears their internal caches and refreshes their connections, preventing minor glitches from accumulating.
2.  **Keep Network Drivers Updated:** Regularly check for and install updates for your Wi-Fi adapter drivers. While Windows Update handles many drivers, checking your computer manufacturer's website or the Wi-Fi adapter manufacturer's website can provide the absolute latest versions, which often include bug fixes and performance improvements.
3.  **Maintain Windows Updates:** Ensure your Windows operating system is always up to date. Microsoft frequently releases network-related fixes and improvements that can prevent common connectivity issues.
4.  **Router Firmware Updates:** Check your router manufacturer's website for firmware updates. Firmware updates often improve stability, security, and compatibility, reducing the likelihood of router-related internet connectivity problems.
5.  **Avoid Unnecessary Network Software:** Be cautious when installing third-party network optimization tools or VPNs, as they can sometimes interfere with Windows' native network stack if not properly configured. If you do use them, ensure they are from reputable sources and kept updated.