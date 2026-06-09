---
title: "How to Fix \"Wi-Fi Connected, No Internet Access\" on Windows 10/11"
date: "2026-06-09T21:46:25.732Z"
slug: "how-to-fix-wi-fi-connected-no-internet-access-on-windows-10-11"
type: "how-to"
description: "Resolve the frustrating \"Wi-Fi connected, no internet access\" error on Windows 10 and 11 with this comprehensive, step-by-step guide. Learn common causes and effective solutions."
keywords: "Wi-Fi connected no internet, Windows 10 internet fix, Windows 11 Wi-Fi issue, no internet access, network troubleshooting, internet connectivity problem"
---

# How to Fix "Wi-Fi Connected, No Internet Access" on Windows 10/11

## Problem Explanation

You've successfully connected your Windows 10 or Windows 11 computer to your Wi-Fi network, but a red "X" appears over the Wi-Fi icon, or you see a message indicating "No Internet Access" or "Connected, no internet." This is a common and frustrating issue. While your computer believes it's online, it cannot reach any external websites or online services. This prevents you from browsing the web, checking email, streaming, or using any internet-dependent applications. The system reports a stable wireless connection to your router, but that connection doesn't extend beyond your local network.

The most common visual indicator is the Wi-Fi icon in the system tray (bottom right corner of your screen). Instead of the usual Wi-Fi signal bars, you might see an exclamation mark, a globe icon, or a red "X" over the Wi-Fi symbol. When you hover over it or click it, you'll likely see a message like "Internet access is blocked" or "No Internet." This signifies that while your device can communicate with your router, your router itself cannot reach the internet, or there's a misconfiguration preventing your computer from properly accessing the internet through the router.

## Why It Happens

The "Wi-Fi Connected, No Internet Access" error typically stems from an issue that prevents your computer from obtaining a valid IP address from your router, or from communicating with your router's gateway to reach the internet. This could be due to a temporary glitch in the network adapter, incorrect network settings on your computer, problems with your router or modem, or even interference from security software. Sometimes, a simple restart of your network devices can resolve temporary communication hiccups.

More complex causes include outdated or corrupted network drivers, DNS (Domain Name System) resolution failures (where your computer can't translate website names like google.com into IP addresses), IP address conflicts, or problems with your Internet Service Provider (ISP). In essence, your computer is talking to the local network, but the path from your local network to the global internet is broken or blocked.

## Step-by-Step Solution

Here’s a systematic approach to diagnosing and fixing the "Wi-Fi Connected, No Internet Access" error on your Windows machine.

### ## Step 1: Restart Your Network Devices

This is the most basic yet often most effective solution.

1.  **Power off your modem and router.** Unplug the power cords for both devices.
2.  **Wait for at least 30-60 seconds.** This allows the devices to fully discharge and reset.
3.  **Power on your modem first.** Wait for all its indicator lights to stabilize (usually 1-2 minutes).
4.  **Power on your router next.** Wait for its indicator lights to stabilize.
5.  **Restart your computer.** Once both devices are fully powered up, restart your Windows PC.
6.  **Check the Wi-Fi connection.** See if the internet access issue is resolved.

### ## Step 2: Run the Windows Network Troubleshooter

Windows has built-in tools designed to automatically detect and fix network problems.

1.  **For Windows 10:**
    *   Right-click the Wi-Fi icon in the system tray.
    *   Select "Troubleshoot problems."
    *   Follow the on-screen prompts.
2.  **For Windows 11:**
    *   Go to `Settings` > `Network & internet` > `Advanced network settings`.
    *   Under "Network troubleshooter," click "Run."
    *   Follow the on-screen prompts.

The troubleshooter may identify and resolve issues with your IP settings, DNS, or the network adapter itself.

### ## Step 3: Reset Network Settings

This process reverts your network configuration to its default settings.

1.  **For Windows 10:**
    *   Go to `Settings` > `Network & Internet` > `Status`.
    *   Scroll down and click "Network reset."
    *   Click "Reset now" and confirm. Your PC will restart afterward.
2.  **For Windows 11:**
    *   Go to `Settings` > `Network & internet` > `Advanced network settings`.
    *   Click "Network reset."
    *   Click "Reset now" and confirm. Your PC will restart afterward.

**Note:** After a network reset, you will need to re-enter your Wi-Fi password.

### ## Step 4: Update or Reinstall Network Adapter Drivers

Corrupted or outdated drivers are a frequent cause of connectivity problems.

1.  **Open Device Manager.** Search for "Device Manager" in the Windows search bar and open it.
2.  **Expand "Network adapters."**
3.  **Locate your Wi-Fi adapter.** It will likely have "Wireless" or "Wi-Fi" in its name (e.g., "Intel(R) Wi-Fi 6 AX201").
4.  **Update the driver:**
    *   Right-click your Wi-Fi adapter and select "Update driver."
    *   Choose "Search automatically for drivers."
    *   If Windows finds a new driver, follow the prompts to install it.
5.  **If updating doesn't work, try reinstalling:**
    *   Right-click your Wi-Fi adapter again and select "Uninstall device."
    *   **Crucially, if prompted, do NOT check the box that says "Delete the driver software for this device."** This ensures Windows can easily reinstall a generic driver upon restart.
    *   Click "Uninstall."
    *   Restart your computer. Windows should automatically detect the network adapter and reinstall the driver upon boot.

If the automatic reinstallation doesn't work, you may need to manually download the latest driver from your laptop manufacturer's website or the Wi-Fi adapter manufacturer's website.

### ## Step 5: Flush DNS and Reset IP Configuration

Incorrect or outdated DNS or IP settings can prevent internet access.

1.  **Open Command Prompt as Administrator.** Search for "cmd" in the Windows search bar, right-click "Command Prompt," and select "Run as administrator."
2.  **Execute the following commands one by one, pressing Enter after each:**
    *   `ipconfig /release` (This releases your current IP address.)
    *   `ipconfig /renew` (This obtains a new IP address from your router.)
    *   `ipconfig /flushdns` (This clears the DNS resolver cache, forcing your computer to get fresh DNS information.)
    *   `netsh winsock reset` (This resets the Winsock Catalog, which handles network protocol communication.)
    *   `netsh int ip reset` (This resets the TCP/IP stack.)
3.  **Restart your computer.**

### ## Step 6: Check Proxy Settings

An incorrectly configured proxy server can block internet access.

1.  **For Windows 10:**
    *   Go to `Settings` > `Network & Internet` > `Proxy`.
    *   Ensure "Automatically detect settings" is turned ON.
    *   Ensure "Use a proxy server" is turned OFF, unless you are certain you need one and it's configured correctly.
2.  **For Windows 11:**
    *   Go to `Settings` > `Network & internet` > `Proxy`.
    *   Under "Manual proxy setup," ensure "Use a proxy server" is toggled OFF.
    *   Under "Automatic proxy setup," ensure "Automatically detect settings" is toggled ON.

### ## Step 7: Temporarily Disable Antivirus/Firewall

Your security software might be mistakenly blocking your internet connection.

1.  **Locate your antivirus or firewall program** in the system tray (usually near the clock).
2.  **Right-click the icon** and look for an option to disable it temporarily (e.g., "Disable Firewall," "Turn off Antivirus," "Disable real-time protection").
3.  **Choose a short duration** (e.g., 15 minutes or 1 hour).
4.  **Test your internet connection.**
5.  **If the internet works,** the problem lies with your security software. You'll need to re-enable it and then access its settings to add an exception for your network or specific applications. Consult your security software's documentation for how to do this.
6.  **If the internet still doesn't work,** re-enable your antivirus/firewall immediately, as it's likely not the cause.

## Common Mistakes

One common mistake is immediately assuming the router is the issue without troubleshooting the computer first. Many users forget to restart their modem and router in the correct order. Another pitfall is failing to run Command Prompt as an administrator when performing network resets, which prevents the commands from executing properly. Users also sometimes get stuck on updating drivers and don't consider reinstalling them if an update fails or doesn't resolve the problem. Finally, some users may forget to re-enter their Wi-Fi password after a network reset, leading them to believe the reset itself didn't work.

## Prevention Tips

To minimize the chances of encountering the "Wi-Fi Connected, No Internet Access" error, ensure your network drivers are kept up-to-date. Regularly run Windows updates, as these often include driver improvements. Periodically restart your modem and router (e.g., once a month) to keep them running smoothly. Avoid installing too many third-party network management or security tools, as they can sometimes conflict. If you frequently encounter this issue, consider checking your router's firmware for updates, as outdated firmware can also lead to connectivity problems. Finally, ensure your Wi-Fi password is strong and that your network is secured to prevent unauthorized access that could disrupt your connection.