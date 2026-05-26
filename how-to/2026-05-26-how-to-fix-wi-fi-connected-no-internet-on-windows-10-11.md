---
title: "How to Fix \"Wi-Fi Connected, No Internet\" on Windows 10/11"
date: "2026-05-26T21:44:03.332Z"
slug: "how-to-fix-wi-fi-connected-no-internet-on-windows-10-11"
type: "how-to"
description: "Resolve the common \"Wi-Fi connected, no internet\" error on Windows 10 and 11 with this comprehensive, step-by-step troubleshooting guide."
keywords: "Wi-Fi connected no internet, Windows 10 no internet, Windows 11 no internet, internet troubleshooting, network adapter, DNS, IP address, router reset, network reset"
---

## Problem Explanation

You're connected to your Wi-Fi network, the icon in your system tray indicates a strong signal, and everything seems normal. Yet, when you try to open a website, launch an online application, or update software, you're met with error messages like "This site can't be reached," "No internet connection," or a yellow exclamation mark on your Wi-Fi icon. This frustrating scenario, commonly displayed as "Wi-Fi Connected, No Internet," means your computer is successfully communicating with your router but cannot access the wider internet. Your local network is functional, but the pathway to the global network is blocked or misconfigured.

## Why It Happens

The "Wi-Fi Connected, No Internet" error is a symptom, not a single cause. It typically arises when the communication between your computer and the internet service provider (ISP) is interrupted. This can be due to issues with your router's internet connection, incorrect network settings on your Windows device, problems with your ISP's service, or even temporary glitches in the network stack of your operating system. Common culprits include outdated network adapter drivers, a misconfigured IP address or DNS settings, or a router that needs a simple reboot to re-establish its connection to your ISP's servers.

## Step-by-Step Solution

Follow these steps to systematically diagnose and resolve the "Wi-Fi Connected, No Internet" issue.

### ## Step 1: Restart Your Router and Modem

This is the most common and often the most effective fix.

1.  **Unplug** both your modem and your router from their power outlets.
2.  **Wait** for at least 30-60 seconds. This allows the devices to fully discharge and clear their temporary memory.
3.  **Plug in** your modem first. Wait for all its indicator lights to become stable, typically indicating a successful internet connection. This can take a few minutes.
4.  **Plug in** your router. Wait for its indicator lights to stabilize.
5.  Once both devices are fully powered up, **try connecting** to the internet on your Windows device again.

### ## Step 2: Run the Windows Network Troubleshooter

Windows has a built-in tool designed to automatically detect and fix common network problems.

1.  **Right-click** the Wi-Fi icon in your system tray (bottom-right corner of your screen).
2.  Select **"Troubleshoot problems"**.
3.  The troubleshooter will scan your network for issues. Follow any on-screen prompts. It may offer to reset your network adapter or make other configuration changes.
4.  If it finds and fixes a problem, **test your internet connection** again.

### ## Step 3: Forget and Reconnect to the Wi-Fi Network

Sometimes, the saved network profile on your computer can become corrupted.

1.  **Open** **Settings** (Windows Key + I).
2.  Navigate to **Network & internet**.
3.  Click on **Wi-Fi**.
4.  Click on **"Manage known networks"**.
5.  Find your Wi-Fi network in the list, **click on it**, and then click **"Forget"**.
6.  Go back to the Wi-Fi list, **select your network** again, and **re-enter your Wi-Fi password** to reconnect.

### ## Step 4: Check and Update Your Network Adapter Driver

Outdated or corrupted network drivers can prevent your computer from accessing the internet.

1.  **Right-click** the **Start button** and select **Device Manager**.
2.  Expand the **"Network adapters"** section.
3.  **Right-click** on your Wi-Fi adapter (it will likely have "Wireless" or "Wi-Fi" in its name).
4.  Select **"Update driver"**.
5.  Choose **"Search automatically for drivers"**. Windows will try to find and install the latest driver.
6.  If Windows doesn't find a new driver, you can visit your computer manufacturer's website (e.g., Dell, HP, Lenovo) or the network adapter manufacturer's website (e.g., Intel, Realtek) to manually download and install the latest driver.
7.  After updating, **restart your computer** and check your internet connection.

### ## Step 5: Reset Your Network Settings

This step will reset all your network adapters to their default settings and reinstall network components.

1.  **Open** **Settings** (Windows Key + I).
2.  Navigate to **Network & internet**.
3.  Scroll down and click on **"Advanced network settings"** (on Windows 11, it's directly under Network & internet).
4.  Click on **"Network reset"**.
5.  Click **"Reset now"**.
6.  Your computer will restart. After it boots up, you will need to re-enter your Wi-Fi password. **Test your internet connection**.

### ## Step 6: Change DNS Servers

Sometimes, issues with your Internet Service Provider's DNS servers can cause connectivity problems. You can switch to public DNS servers like Google DNS or Cloudflare DNS.

1.  **Right-click** the **Start button** and select **Network Connections**.
2.  Click on **"Change adapter options"**.
3.  **Right-click** your **Wi-Fi adapter** and select **Properties**.
4.  In the Properties window, select **"Internet Protocol Version 4 (TCP/IPv4)"** and click **Properties**.
5.  Select **"Use the following DNS server addresses:"**.
6.  Enter the following addresses:
    *   **Preferred DNS server:** `8.8.8.8` (Google DNS)
    *   **Alternate DNS server:** `8.8.4.4` (Google DNS)
    *   Alternatively, for Cloudflare DNS: `1.1.1.1` (Preferred) and `1.0.0.1` (Alternate).
7.  Click **OK** on all open windows.
8.  **Flush your DNS cache**: Open Command Prompt as administrator and type `ipconfig /flushdns` then press Enter.
9.  **Test your internet connection**.

### ## Step 7: Check for Proxy Settings

Incorrect proxy settings can block internet access.

1.  **Open** **Settings** (Windows Key + I).
2.  Navigate to **Network & internet**.
3.  Click on **"Proxy"** (it might be under "Advanced network settings" in Windows 11).
4.  Ensure that **"Automatically detect settings"** is turned **On**.
5.  Ensure that **"Use a proxy server"** is turned **Off**, unless you know you require one for your network (e.g., in a corporate environment). If it's on, toggle it off.
6.  Close Settings and **test your internet connection**.

## Common Mistakes

A common pitfall is to immediately assume the problem is with your ISP or the router hardware without performing basic troubleshooting. Users often forget the simple power cycle of their router and modem, which resolves a significant percentage of these issues. Another mistake is to repeatedly run the troubleshooter without trying other manual fixes like forgetting and rejoining the network or updating drivers. Furthermore, users might incorrectly input DNS server addresses or disable essential proxy settings without understanding their purpose, potentially exacerbating the problem.

## Prevention Tips

To minimize the recurrence of the "Wi-Fi Connected, No Internet" issue, regular maintenance is key. Periodically rebooting your modem and router, perhaps once a month, can help clear temporary glitches and ensure smooth operation. Keep your Windows operating system and network adapter drivers updated; manufacturers frequently release patches that address bugs and improve stability. Consider enabling automatic updates for Windows to ensure you're always running the latest software. Finally, if you frequently move your laptop or experience connection issues, ensure your Wi-Fi adapter settings are configured for optimal performance and power management.