---
title: "Fixing \"No Internet Access\" When Connected to Wi-Fi on Windows 10/11"
date: "2026-04-25T02:22:54.713Z"
slug: "fixing-no-internet-access-when-connected-to-wi-fi-on-windows-10-11"
type: "how-to"
description: "Resolve the frustrating \"No Internet Access\" error on Windows 10/11 even when connected to Wi-Fi. This practical guide offers step-by-step solutions and prevention tips."
keywords: "no internet access wifi windows 10 windows 11 fix internet connection troubleshoot wifi not working connected but no internet"
---

## Problem Explanation

You're connected to your Wi-Fi network, the icon in your taskbar shows a strong signal, but when you try to open a website, send an email, or use any online application, you're met with an error message like "This site can't be reached," "No internet connection," or a yellow exclamation mark on the Wi-Fi icon. This is a common and highly disruptive issue where your Windows 10 or Windows 11 computer believes it's connected to a network, but it cannot establish a connection to the wider internet. It's like having a phone line plugged in but no dial tone.

## Why It Happens

The "No Internet Access" error, despite a Wi-Fi connection, indicates a breakdown in the communication chain between your computer and the internet. This can stem from several sources. Your computer might have an IP address conflict, meaning it's using an IP address that another device on the network is already using. Alternatively, the Domain Name System (DNS) settings might be incorrect or unreachable, preventing your computer from translating website names (like google.com) into IP addresses. Network adapter driver issues, corrupt network configurations, or even firewall/antivirus software blocking the connection can also cause this problem. It's a multifaceted issue, and the solution often lies in systematically troubleshooting these potential culprits.

## Step-by-Step Solution

### ## Step 1: Restart Your Modem and Router

This is the most basic yet often effective solution.
1. Unplug the power cables from both your modem and your Wi-Fi router.
2. Wait for at least 30 seconds. This ensures all residual power is drained and the devices fully reset.
3. Plug the modem back in first. Wait for all its indicator lights to stabilize (usually takes 1-2 minutes).
4. Plug the Wi-Fi router back in. Wait for its lights to stabilize as well.
5. Once both devices are fully restarted, check your Wi-Fi connection on your computer.

### ## Step 2: Run the Windows Network Troubleshooter

Windows has built-in tools designed to diagnose and fix common network problems.
1. Go to **Settings** (Windows key + I).
2. For Windows 10: Navigate to **Network & Internet** > **Status**. Scroll down and click on **Network troubleshooter**.
3. For Windows 11: Navigate to **System** > **Troubleshoot**. Then click on **Other troubleshooters**. Find **Network Adapter** or **Internet Connections** and click **Run**.
4. Follow the on-screen prompts. The troubleshooter will attempt to identify and fix the issue automatically.

### ## Step 3: Reset Network Settings

This process will remove and then reinstall all your network adapters and reset network components to their default settings.
1. Go to **Settings** (Windows key + I).
2. For Windows 10: Navigate to **Network & Internet** > **Status**. Scroll down and click on **Network reset**.
3. For Windows 11: Navigate to **Network & Internet** > **Advanced network settings**. Click on **Network reset**.
4. Click **Reset now**. Your computer will restart automatically after this process. You'll need to re-enter your Wi-Fi password after the restart.

### ## Step 4: Flush DNS and Reset IP Address

Corrupted DNS caches or incorrect IP configurations can cause this issue.
1. Open **Command Prompt** as an administrator. Search for "cmd" in the Start menu, right-click on Command Prompt, and select "Run as administrator."
2. Type the following commands one by one, pressing Enter after each:
   - `ipconfig /release`
   - `ipconfig /renew`
   - `ipconfig /flushdns`
3. After running these commands, try connecting to the internet again.

### ## Step 5: Change DNS Server Settings

Sometimes, your ISP's default DNS servers can be slow or problematic. Switching to public DNS servers like Google DNS or Cloudflare DNS can resolve this.
1. Open **Network Connections**. Search for "ncpa.cpl" in the Start menu and press Enter.
2. Right-click on your Wi-Fi adapter and select **Properties**.
3. Double-click on **Internet Protocol Version 4 (TCP/IPv4)**.
4. Select **Use the following DNS server addresses**.
5. Enter these for Google DNS:
   - **Preferred DNS server:** `8.8.8.8`
   - **Alternate DNS server:** `8.8.4.4`
   Or for Cloudflare DNS:
   - **Preferred DNS server:** `1.1.1.1`
   - **Alternate DNS server:** `1.0.0.1`
6. Click **OK** to save the changes, then click **Close**. Restart your computer for the changes to take full effect.

### ## Step 6: Update or Reinstall Network Adapter Drivers

Outdated or corrupted network drivers are a frequent cause of connectivity problems.
1. Open **Device Manager**. Search for "Device Manager" in the Start menu and open it.
2. Expand the **Network adapters** category.
3. Right-click on your Wi-Fi adapter (it will likely have "Wireless" or "Wi-Fi" in its name).
4. Select **Update driver**. Choose **Search automatically for drivers**.
5. If Windows finds a newer driver, follow the prompts to install it. If not, you can try uninstalling the driver:
   - Right-click on your Wi-Fi adapter again and select **Uninstall device**.
   - Check the box that says "Attempt to remove the driver software for this device" if it appears.
   - Click **Uninstall**.
   - Restart your computer. Windows will automatically reinstall a generic driver upon startup. If it doesn't, go back to Device Manager, click **Action** > **Scan for hardware changes**, and it should detect and install the adapter.

### ## Step 7: Temporarily Disable Firewall and Antivirus Software

Occasionally, your security software can mistakenly block internet access.
1. Temporarily disable your third-party antivirus and firewall software. Consult your software's documentation for instructions on how to do this.
2. Try accessing the internet.
3. If you gain internet access, the issue lies with your security software. Re-enable it and check its settings for any specific network restrictions or create an exception for your browser or network traffic. If you don't have third-party software, you can also check Windows Defender Firewall:
   - Search for "Windows Defender Firewall" in the Start menu.
   - Click "Turn Windows Defender Firewall on or off" on the left pane.
   - Select "Turn off Windows Defender Firewall" for both private and public networks (remember to turn it back on afterward).

## Common Mistakes

A frequent mistake is repeatedly restarting the router and modem without waiting long enough between steps. A proper power cycle requires a significant pause to ensure all cached data and configurations are cleared. Another common pitfall is neglecting to run the Windows Network Troubleshooter first, as it often identifies and resolves simple issues automatically. Users also sometimes forget to re-enter their Wi-Fi password after a network reset, leading them to believe the reset failed. Finally, users may assume the problem is with their internet service provider (ISP) without adequately troubleshooting their own device and local network first.

## Prevention Tips

To minimize the occurrence of this frustrating issue, ensure your router's firmware is kept up-to-date. Most routers offer an automatic update feature or can be manually updated through their web interface. Regularly restart your modem and router, perhaps once a week, to keep them running smoothly. Keep your Windows operating system and its network drivers updated, as Microsoft and hardware manufacturers frequently release patches that address bugs and improve stability. Avoid installing too many VPNs or network utility software simultaneously, as these can sometimes conflict with your system's network configuration. Finally, consider assigning static IP addresses to critical devices on your network if you frequently encounter IP conflicts, though this is a more advanced configuration.