---
title: "How to Fix 'Wi-Fi Connected But No Internet' on Windows 10/11"
date: "2026-09-03T14:08:39.864Z"
slug: "how-to-fix-wi-fi-connected-but-no-internet-on-windows-10-11"
type: "how-to"
description: "Resolve the frustrating \"Wi-Fi connected but no internet\" error on Windows 10 and 11 with this comprehensive troubleshooting guide. Fix common causes and get back online."
keywords: "Wi-Fi connected no internet, Windows 10, Windows 11, network troubleshoot, internet connection, no internet access, Wi-Fi fix, network adapter, DNS issues, IP address"
---

## Problem Explanation

You've successfully connected your Windows 10 or Windows 11 computer to a Wi-Fi network. The icon in your system tray clearly indicates a strong Wi-Fi signal, and it even says "Connected, secured." Yet, when you try to open a web browser, visit a website, or use any application that requires an internet connection, nothing loads. You might see error messages like "This site can't be reached," "Page cannot be displayed," or simply a blank screen with a spinning loader that never finishes. This is the classic "Wi-Fi connected but no internet" problem, leaving you online but effectively offline.

This issue is particularly maddening because the core connection to the Wi-Fi router is established. The problem lies not in reaching the router, but in the router's ability to provide you with a gateway to the wider internet, or in your computer's configuration to properly utilize that gateway. It can manifest suddenly, even if everything was working fine moments before, or it could be a persistent issue after a network change or software update.

## Why It Happens

The root cause of the "Wi-Fi connected but no internet" error is usually a breakdown in communication *beyond* your local Wi-Fi network. While your computer is talking to your router, the router itself might not be getting an internet signal from your Internet Service Provider (ISP), or it might be having trouble distributing that signal to your device. Alternatively, your computer's network settings might be misconfigured, preventing it from obtaining a valid IP address, DNS server information, or a proper gateway address from the router. This can be due to a temporary glitch, a driver issue with your network adapter, incorrect network configuration on the router itself, or even a conflict with security software.

In simpler terms, imagine your Wi-Fi is a road from your house to your driveway. You can drive to your driveway (connect to Wi-Fi), but if the main road leading out of your neighborhood (the internet connection from your ISP) is closed, or if your car's navigation system (your computer's network settings) is pointing to the wrong destination, you can't get to the store (the internet). This guide will help you fix the common reasons why that "main road" or "navigation system" might be malfunctioning.

## Step-by-Step Solution

Here's a systematic approach to troubleshoot and resolve the "Wi-Fi connected but no internet" issue on Windows 10 and 11. Work through these steps sequentially, testing your internet connection after each one.

### ## Step 1: Restart Your Network Devices

This is the simplest and often most effective solution. A power cycle can clear temporary glitches in your router, modem, and computer.

1.  **Turn off your computer.**
2.  **Unplug the power cords** from both your Wi-Fi router and your modem (if you have a separate modem).
3.  **Wait for at least 30 seconds.** This ensures all residual power is discharged.
4.  **Plug the modem back in first.** Wait for its lights to stabilize (usually 1-2 minutes), indicating it has connected to your ISP.
5.  **Plug the router back in.** Wait for its lights to stabilize (another 1-2 minutes).
6.  **Turn on your computer.** Once it boots up, try to connect to your Wi-Fi and test your internet.

### ## Step 2: Run the Windows Network Troubleshooter

Windows has a built-in tool designed to automatically detect and fix common network problems.

1.  **For Windows 10:**
    *   Right-click the Wi-Fi icon in the system tray.
    *   Select "Troubleshoot problems."
2.  **For Windows 11:**
    *   Go to **Settings > Network & internet**.
    *   Click on **Advanced network settings**.
    *   Under "More settings," click **Network troubleshooter**.

Follow the on-screen prompts. The troubleshooter will scan for issues and suggest fixes, which you should apply.

### ## Step 3: Check Your IP Address and DNS Settings

Incorrect or unavailable IP and DNS settings are a frequent cause of this problem.

1.  **Open Command Prompt as Administrator:**
    *   Search for `cmd` in the Windows search bar.
    *   Right-click "Command Prompt" and select "Run as administrator."
2.  **Release and Renew IP Address:**
    *   Type the following commands, pressing Enter after each:
        ```bash
        ipconfig /release
        ipconfig /renew
        ```
    *   This forces your computer to request a new IP address from the router.
3.  **Flush DNS Cache:**
    *   Type the following command and press Enter:
        ```bash
        ipconfig /flushdns
        ```
    *   This clears out old DNS records that might be causing resolution issues.
4.  **Test your connection** after running these commands.

### ## Step 4: Reset Network Adapters

Sometimes, the network adapter itself can get into a bad state. Resetting it can resolve this.

1.  **Open Command Prompt as Administrator** (as described in Step 3).
2.  **Execute the following commands**, pressing Enter after each:
    ```bash
    netsh winsock reset
    netsh int ip reset
    ```
    *   `netsh winsock reset` resets the Winsock Catalog, which controls how Windows networking components interact.
    *   `netsh int ip reset` resets TCP/IP stack settings.
3.  **Restart your computer** after running these commands.

### ## Step 5: Update or Reinstall Network Adapter Drivers

Outdated or corrupt network drivers are a common culprit.

1.  **Open Device Manager:**
    *   Search for "Device Manager" in the Windows search bar and open it.
2.  **Expand "Network adapters."**
3.  **Locate your Wi-Fi adapter.** It will likely have "Wireless" or "Wi-Fi" in its name (e.g., "Intel(R) Dual Band Wireless-AC 8265").
4.  **Update Driver:**
    *   Right-click your Wi-Fi adapter and select "Update driver."
    *   Choose "Search automatically for drivers." If Windows finds a newer driver, install it.
5.  **Reinstall Driver (if updating doesn't work):**
    *   Right-click your Wi-Fi adapter and select "Uninstall device."
    *   **Crucially, do NOT check the box that says "Attempt to remove the driver software for this device"** unless you have downloaded a new driver to install immediately.
    *   Once uninstalled, **restart your computer**. Windows will usually automatically reinstall the driver upon reboot. If not, go back to Device Manager, click "Action" > "Scan for hardware changes."

*Note: If you know your Wi-Fi adapter model, you can visit the manufacturer's website (e.g., Intel, Realtek, Broadcom) on another device to download the latest driver and then install it manually.*

### ## Step 6: Change DNS Server Settings

Your computer uses DNS (Domain Name System) servers to translate website names (like google.com) into IP addresses. If your ISP's DNS servers are slow or unavailable, you won't be able to access websites. You can switch to public DNS servers like Google DNS or Cloudflare DNS.

1.  **Open Network Connections:**
    *   Search for "View network connections" in the Windows search bar and open it.
2.  **Right-click your Wi-Fi adapter** and select "Properties."
3.  **In the list of items, find and double-click "Internet Protocol Version 4 (TCP/IPv4)."**
4.  **Select "Use the following DNS server addresses."**
5.  **Enter preferred DNS server addresses:**
    *   **Google DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
6.  **Click "OK" on both windows** to save the changes.
7.  **Test your connection.**

### ## Step 7: Check Proxy Settings

An incorrect proxy configuration can block internet access.

1.  **For Windows 10:**
    *   Go to **Settings > Network & Internet > Proxy**.
    *   Ensure that "Automatically detect settings" is turned ON.
    *   Ensure that "Use a proxy server" is turned OFF.
2.  **For Windows 11:**
    *   Go to **Settings > Network & internet > Proxy**.
    *   Ensure "Automatically detect settings" is toggled ON.
    *   Ensure "Use a proxy server" is toggled OFF.
3.  **Test your connection.**

## Common Mistakes

One common mistake is repeatedly restarting just the computer without power cycling the router and modem. This is like resetting your computer's brain but not the mail delivery system it relies on. Another pitfall is forgetting to run Command Prompt as an administrator when executing network commands; if not run as admin, commands like `ipconfig /renew` or `netsh winsock reset` will fail to make system-wide changes. Users also sometimes jump straight to reinstalling drivers without first trying simpler steps like network restarts or troubleshooting, which can be a time-consuming overreaction. Finally, changing DNS settings without noting down the original ones can be problematic if the new servers don't work out, making it harder to revert.

## Prevention Tips

To minimize the chances of encountering the "Wi-Fi connected but no internet" issue, practice good network hygiene. Regularly restart your router and modem – a weekly or bi-weekly reboot can prevent many minor glitches from escalating. Keep your Windows operating system and network adapter drivers up-to-date; Windows Update often includes critical network performance and stability patches. Avoid installing third-party network management software unless you fully understand its functionality, as these can sometimes conflict with built-in Windows networking. If you have a complex network setup, consider assigning static IP addresses within your router's DHCP range to devices that frequently exhibit network issues, though this requires more advanced configuration. Lastly, ensure your Wi-Fi password is strong and that your network is secured to prevent unauthorized access, which could consume bandwidth or cause other network disruptions.