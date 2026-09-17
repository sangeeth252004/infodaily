---
title: "How to Fix 'Wi-Fi Connected But No Internet Access' on Windows 10/11"
date: "2026-09-17T18:49:19.472Z"
slug: "how-to-fix-wi-fi-connected-but-no-internet-access-on-windows-10-11"
type: "how-to"
description: "Resolve the frustrating \"Wi-Fi Connected, No Internet\" error on Windows 10 and 11 with this practical, step-by-step troubleshooting guide."
keywords: "Wi-Fi connected no internet, Windows 10 no internet, Windows 11 no internet, Wi-Fi not working, internet connection problems, network troubleshooting"
---

## Problem Explanation

You're connected to your Wi-Fi network – the icon in the taskbar clearly indicates a strong signal, and the network name is listed as "Connected." Yet, when you try to open a web browser, load a webpage, or use any online application, you encounter an error message like "Page cannot be displayed," "This site can’t be reached," or a generic "No Internet Access" notification. This is a common and frustrating issue where your computer has successfully joined the wireless network but is unable to establish a connection to the wider internet.

This situation often manifests as a limited or no internet connection status on your network adapter. While your device is communicating with your router, the crucial link from the router to your Internet Service Provider (ISP) is broken or misconfigured. This prevents data from flowing to and from the internet, rendering your online activities impossible.

## Why It Happens

The "Wi-Fi Connected, No Internet" problem typically stems from one of several root causes, often related to network configuration, hardware, or software conflicts. A primary culprit is often an issue with your router or modem. The router might have lost its connection to your ISP, or it might be experiencing a temporary glitch requiring a restart. DNS (Domain Name System) issues are another frequent cause. Your computer relies on DNS servers to translate human-readable website names (like google.com) into IP addresses that computers understand. If your DNS settings are incorrect or the DNS server is unresponsive, you won't be able to reach websites even if you have a valid IP address from your router.

Other common reasons include IP address conflicts (where two devices on your network are assigned the same IP address), outdated or corrupt network drivers on your Windows machine, firewall or antivirus software incorrectly blocking internet access, or even problems with the network adapter itself. In some cases, a simple but overlooked issue is the router not getting a valid IP address from your ISP, which can happen due to modem problems or ISP-side outages.

## Step-by-Step Solution

Here's a systematic approach to diagnosing and resolving the "Wi-Fi Connected, No Internet" error on Windows 10 and 11.

### ## Step 1: Restart Your Network Devices

This is the simplest yet often most effective solution.

1.  **Turn off your modem and router.** Unplug the power cords from both devices.
2.  **Wait for at least 30-60 seconds.** This allows the devices to fully discharge and reset their internal states.
3.  **Turn on your modem first.** Plug in its power cord and wait for its indicator lights to stabilize (usually indicating it has an internet connection).
4.  **Turn on your router.** Plug in its power cord and wait for its indicator lights to stabilize.
5.  **On your Windows computer, disconnect and reconnect to your Wi-Fi network.** Go to **Settings > Network & internet > Wi-Fi**, click on your network name, and then click **Disconnect**. Wait a few seconds, then click **Connect** again.

### ## Step 2: Run the Windows Network Troubleshooter

Windows has built-in tools that can automatically detect and fix common network problems.

1.  **Open Settings.** Press `Windows key + I`.
2.  **Navigate to Network & internet.**
3.  **Scroll down and click on "Network troubleshooter."**
4.  **Follow the on-screen prompts.** The troubleshooter will scan your network and attempt to identify and resolve issues. It might suggest changes to your network configuration.

### ## Step 3: Reset Your TCP/IP Stack and DNS Cache

Corrupted network settings or an outdated DNS cache can cause connectivity issues.

1.  **Open Command Prompt as Administrator.**
    *   Search for `cmd` in the Start menu.
    *   Right-click on "Command Prompt" and select "Run as administrator."
2.  **Execute the following commands, pressing Enter after each one:**
    *   `netsh winsock reset` (Resets the Winsock Catalog)
    *   `netsh int ip reset` (Resets TCP/IP stack)
    *   `ipconfig /release` (Releases current IP address)
    *   `ipconfig /renew` (Obtains a new IP address)
    *   `ipconfig /flushdns` (Clears the DNS resolver cache)
3.  **Restart your computer.**

### ## Step 4: Check Your IP Address and DNS Settings

Ensure your computer is receiving a valid IP address and is using appropriate DNS servers.

1.  **Open Command Prompt as Administrator** (as described in Step 3).
2.  **Type `ipconfig /all` and press Enter.**
3.  **Look for your Wi-Fi adapter.** Under its section, check the "IPv4 Address," "Default Gateway," and "DNS Servers."
    *   **IPv4 Address:** Should typically start with `192.168.x.x` or `10.x.x.x` (depending on your router's configuration). If it's `169.254.x.x` (APIPA address), it means your computer is not getting a valid IP address from the router.
    *   **Default Gateway:** This should be your router's IP address (e.g., `192.168.1.1`). You should be able to ping it.
    *   **DNS Servers:** These are important for resolving website names.
4.  **Test your default gateway:** In Command Prompt, type `ping [your_default_gateway_IP]` (e.g., `ping 192.168.1.1`) and press Enter. If you get replies, your computer can communicate with the router.
5.  **If your DNS settings look incorrect or you suspect issues, consider using public DNS servers like Google DNS or Cloudflare DNS.**
    *   Go to **Settings > Network & internet > Wi-Fi** (or **Ethernet** if wired).
    *   Click on your network name or connection.
    *   Under "IP settings," click **Edit**.
    *   Change the dropdown from "Automatic (DHCP)" to "Manual."
    *   Turn on **IPv4**.
    *   Enter preferred DNS (e.g., `8.8.8.8`) and alternate DNS (e.g., `8.8.4.4`).
    *   Click **Save**. Restart your computer.

### ## Step 5: Update or Reinstall Your Wi-Fi Adapter Driver

Outdated or corrupt drivers can prevent proper network communication.

1.  **Open Device Manager.** Search for "Device Manager" in the Start menu and open it.
2.  **Expand "Network adapters."**
3.  **Locate your Wi-Fi adapter.** It will likely have "Wireless," "Wi-Fi," or "WLAN" in its name.
4.  **Right-click on your Wi-Fi adapter and select "Update driver."** Choose "Search automatically for drivers." If Windows finds a newer driver, install it and restart your computer.
5.  **If updating doesn't work, or if no update is found:**
    *   Right-click on your Wi-Fi adapter again and select **"Uninstall device."**
    *   **Crucially, if prompted, DO NOT check the box that says "Delete the driver software for this device."** If you do, Windows may not be able to reinstall it automatically.
    *   Click **Uninstall**.
    *   **Restart your computer.** Windows will attempt to automatically reinstall the driver upon startup. If it doesn't, you may need to visit your laptop manufacturer's website or the Wi-Fi card manufacturer's website to download the latest driver manually.

### ## Step 6: Temporarily Disable Firewall or Antivirus Software

Security software can sometimes be overzealous and block legitimate internet traffic.

1.  **Temporarily disable your third-party antivirus or firewall software.** Consult your software's documentation for instructions on how to do this.
2.  **Test your internet connection.** If it works, you've found the culprit.
3.  **Re-enable your security software immediately.** Then, reconfigure its settings to allow internet access for your browser and applications. If you're using Windows Defender, it's generally less likely to cause this issue, but it's still worth checking. You can access Windows Defender Firewall settings by searching for "Windows Defender Firewall" in the Start menu.

### ## Step 7: Reset Network Settings on Windows

This is a more drastic step that resets all network adapters and settings to their defaults.

1.  **Open Settings.** Press `Windows key + I`.
2.  **Navigate to "Network & internet."**
3.  **Scroll down and click on "Advanced network settings."**
4.  **Under "More settings," click on "Network reset."**
5.  **Click "Reset now."** You will see a warning that this will remove and then reinstall all network adapters and set other networking components back to their original settings.
6.  **Click "Yes" to confirm.** Your computer will restart automatically after the reset process is complete. You will need to re-enter your Wi-Fi password.

## Common Mistakes

A common mistake is to only restart the computer and not the router/modem. Your computer might be fine, but if the router isn't functioning correctly, you won't have internet. Another frequent error is when users try to manually assign IP addresses without understanding DHCP, leading to IP conflicts. Forgetting to run Command Prompt as an administrator when executing network commands will result in the commands failing without clear error messages. Lastly, users often jump to complex solutions without performing the basic troubleshooting steps like checking physical cable connections (if applicable to modem/router) or confirming the internet service is active with the ISP.

## Prevention Tips

To minimize the occurrence of this issue, keep your router's firmware updated. Manufacturers release updates to fix bugs and improve performance. Regularly restart your modem and router, perhaps once a week, as part of routine maintenance. This can clear out temporary glitches before they become persistent problems. Ensure your Windows operating system and network drivers are also kept up-to-date. Regularly scan your computer for malware, as malicious software can interfere with network settings. If you consistently experience connectivity issues on a specific network, consider testing a different device on that network to isolate whether the problem lies with your Windows computer or the network itself.