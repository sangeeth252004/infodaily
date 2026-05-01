---
title: "How to Fix 'Wi-Fi Connected But No Internet' Error on Windows 10/11"
date: "2026-05-01T02:54:45.217Z"
slug: "how-to-fix-wi-fi-connected-but-no-internet-error-on-windows-10-11"
type: "how-to"
description: "Resolve the frustrating 'Wi-Fi connected but no internet' error on Windows 10 and 11 with this practical, step-by-step guide. Learn the common causes and effective solutions."
keywords: "Wi-Fi connected no internet, Windows 10 internet fix, Windows 11 Wi-Fi error, no internet connection, network troubleshooting, fix Wi-Fi, internet troubleshooting, Windows network problems"
---

## Problem Explanation

You've successfully connected your Windows 10 or Windows 11 computer to your Wi-Fi network. The Wi-Fi icon in the system tray indicates a strong signal, often displaying "Connected, secured." However, when you try to open a web browser or use any application that requires internet access, nothing loads. You might see error messages like "This page is not available," "ERR_INTERNET_DISCONNECTED," or simply a spinning wheel that never resolves. This frustrating scenario means your device is communicating with your router, but the router itself is not getting an internet connection from your Internet Service Provider (ISP), or there's a misconfiguration preventing your computer from reaching the internet.

## Why It Happens

The "Wi-Fi connected but no internet" error is a common network issue that can stem from several sources. At its core, it signifies a break in the chain between your computer and the World Wide Web. This could be a problem with your router's connection to your ISP, a temporary glitch in the router's firmware, an outdated or corrupt network driver on your Windows machine, incorrect IP address or DNS settings, or even a firewall or VPN interference. Essentially, while your local network (your computer to your router) is functioning, the pathway from your router to the wider internet is blocked or misdirected.

## Step-by-Step Solution

Follow these steps methodically to diagnose and resolve the 'Wi-Fi connected but no internet' error.

### Step 1: Restart Your Network Equipment

This is the simplest yet most effective first step. A full network restart can clear temporary glitches in your modem and router.

1.  **Unplug the power** from both your modem and your router.
2.  **Wait for at least 30 seconds.** This ensures all components are fully powered down.
3.  **Plug the modem back in first.** Wait for its indicator lights to stabilize, which typically means it has re-established its connection with your ISP. This can take a few minutes.
4.  **Plug the router back in.** Wait for its indicator lights to stabilize as well.
5.  Once both devices are fully powered on and their lights indicate normal operation, **try connecting to the internet** on your Windows computer.

### Step 2: Check Internet Connection on Other Devices

To determine if the issue is with your Windows computer or your overall internet service, test other devices connected to the same Wi-Fi network.

1.  Try browsing the internet on your smartphone, tablet, or another computer.
2.  If other devices also cannot access the internet, the problem likely lies with your ISP or your modem/router. Contact your ISP for support.
3.  If other devices can access the internet, the problem is specific to your Windows computer. Proceed to the next steps.

### Step 3: Run the Windows Network Troubleshooter

Windows has built-in tools designed to automatically detect and fix common network issues.

1.  **For Windows 10:**
    *   Go to **Settings** > **Network & Internet** > **Status**.
    *   Scroll down and click on **Network troubleshooter**.
    *   Follow the on-screen prompts.
2.  **For Windows 11:**
    *   Go to **Settings** > **Network & internet** > **Advanced network settings**.
    *   Under "More settings," click on **Network troubleshooter**.
    *   Select **Wi-Fi** and click **Next**.
    *   Follow the on-screen prompts.

### Step 4: Reset Your Network Adapter and TCP/IP Stack

Corrupted network configurations or IP/DNS settings can cause this problem. Resetting them to their defaults can help.

1.  Open **Command Prompt** as an administrator. To do this, search for "cmd" in the Windows search bar, right-click on "Command Prompt," and select "Run as administrator."
2.  Type the following commands one by one, pressing Enter after each:
    *   `netsh winsock reset` (This resets the Winsock Catalog)
    *   `netsh int ip reset` (This resets the IP stack)
    *   `ipconfig /release` (This releases your current IP address)
    *   `ipconfig /renew` (This obtains a new IP address)
    *   `ipconfig /flushdns` (This flushes the DNS resolver cache)
3.  After running all commands, **restart your computer**.

### Step 5: Update or Reinstall Your Wi-Fi Driver

An outdated or corrupt network adapter driver is a frequent culprit.

1.  Press **Windows Key + X** and select **Device Manager**.
2.  Expand **Network adapters**.
3.  Right-click on your Wi-Fi adapter (it might be named something like "Intel(R) Dual Band Wireless..." or "Realtek PCIe GbE Family Controller").
4.  Select **Update driver**.
5.  Choose **Search automatically for drivers**. Windows will attempt to find and install the latest driver.
6.  If that doesn't work, or if you suspect the driver is corrupt:
    *   Go back to the Wi-Fi adapter, right-click, and select **Uninstall device**.
    *   **Crucially, do NOT check the box that says "Delete the driver software for this device" if it appears.**
    *   Click **Uninstall**.
    *   **Restart your computer.** Windows will automatically attempt to reinstall a generic driver upon reboot.
7.  If the issue persists, you may need to download the latest driver from your laptop manufacturer's website or the Wi-Fi adapter manufacturer's website, using another device if necessary. Install it manually.

### Step 6: Change Your DNS Server

Sometimes, the default DNS servers provided by your ISP can be slow or unreliable. Switching to public DNS servers like Google DNS or Cloudflare DNS can resolve connectivity issues.

1.  Right-click on the **Wi-Fi icon** in your system tray and select **Open Network & Internet settings**.
2.  Click on **Change adapter options** (or **Advanced network settings** > **More network adapter options** in Windows 11).
3.  Right-click on your Wi-Fi adapter and select **Properties**.
4.  In the list, double-click on **Internet Protocol Version 4 (TCP/IPv4)**.
5.  Select **Use the following DNS server addresses**.
6.  Enter the following for Google DNS:
    *   **Preferred DNS server:** `8.8.8.8`
    *   **Alternate DNS server:** `8.8.4.4`
    *   Alternatively, for Cloudflare DNS:
    *   **Preferred DNS server:** `1.1.1.1`
    *   **Alternate DNS server:** `1.0.0.1`
7.  Click **OK** on both windows.
8.  **Flush your DNS cache again** by running `ipconfig /flushdns` in an administrator Command Prompt.

### Step 7: Temporarily Disable Firewall or Antivirus Software

Occasionally, your firewall or antivirus software can mistakenly block your internet connection.

1.  **For Windows Defender Firewall:**
    *   Search for "Windows Defender Firewall" in the Windows search bar and open it.
    *   Click on "Turn Windows Defender Firewall on or off" in the left-hand pane.
    *   Select "Turn off Windows Defender Firewall (not recommended)" for both Private and Public network settings.
    *   **Test your internet connection.**
    *   **IMPORTANT:** Remember to turn your firewall back on immediately after testing.
2.  **For Third-Party Antivirus/Firewall:**
    *   Locate your antivirus software in the system tray (usually in the bottom right corner).
    *   Right-click on its icon and look for an option to disable its firewall or real-time protection temporarily.
    *   **Test your internet connection.**
    *   **IMPORTANT:** Re-enable your antivirus/firewall as soon as you're done testing.

If disabling these software components restores your internet, you will need to investigate their specific settings to allow your network traffic.

## Common Mistakes

One of the most common mistakes is forgetting to restart both the modem *and* the router after unplugging them. Simply unplugging one device might not be enough. Another frequent error is failing to run the network commands in an administrator Command Prompt; without administrative privileges, these commands won't execute correctly. Many users also overlook the possibility of a simple cable issue – ensure all Ethernet cables connecting your modem to your router and potentially to your computer (if wired) are securely plugged in and undamaged. Finally, not testing on other devices first can lead to unnecessary troubleshooting of the computer when the problem lies with the ISP or router.

## Prevention Tips

To minimize the chances of encountering the "Wi-Fi connected but no internet" error, keep your network equipment updated. Ensure your router's firmware is up to date, as manufacturers often release patches to fix bugs and improve performance. Regularly restart your modem and router, perhaps once a week, to clear out temporary issues before they become problematic. Maintain updated network drivers on your Windows computer. For most users, setting the network adapter to obtain an IP address and DNS server automatically is the best practice, but be aware of your router's IP address range in case you need to manually configure static IPs. Finally, avoid installing overly aggressive third-party security software that might interfere with legitimate network traffic.