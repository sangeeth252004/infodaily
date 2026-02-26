---
title: "How to Fix \"Default Gateway Is Not Available\" Error in Windows 10/11"
date: "2026-02-26T05:57:18.881Z"
slug: "how-to-fix-default-gateway-is-not-available-error-in-windows-10-11"
type: "how-to"
description: "Resolve the \"Default Gateway Is Not Available\" error in Windows 10 and 11 with this comprehensive, step-by-step guide. Learn the causes and effective solutions."
keywords: "default gateway not available, windows 10, windows 11, network error, internet connection, fix network, router, ip address, dns, troubleshoot"
---

The "Default Gateway Is Not Available" error is a common and frustrating network issue that prevents your Windows computer from accessing the internet or other devices on your local network. When this problem occurs, you'll typically see a network icon with a red 'X' or a yellow exclamation mark in your system tray. Clicking on it often reveals a troubleshooter that states something like "The default gateway is not available" or "Wi-Fi doesn't have a valid IP configuration." This means your computer can't find the device that acts as the entry point to your broader network, usually your router.

### Problem Explanation

When you try to connect to the internet, your computer needs a way to send data to devices outside your immediate local network. This is where the "default gateway" comes in. Think of it as the post office for your network – it's the device (usually your router) that knows how to forward your requests to the wider internet. When Windows reports that the "Default Gateway Is Not Available," it signifies that your computer cannot establish communication with this crucial network gateway. Consequently, you'll likely find yourself unable to browse websites, stream media, or access online services, even though your Wi-Fi or Ethernet connection might appear to be active.

### Why It Happens

This error usually points to a problem with your computer's IP address configuration or the router's ability to assign one. The most frequent culprit is a misconfiguration of your computer's IP address settings. This could be due to your router not assigning an IP address correctly via DHCP (Dynamic Host Configuration Protocol), your computer obtaining an incorrect IP address, or even a temporary glitch in the network adapter. Other common reasons include outdated network adapter drivers, issues with your router itself, or even a firewall blocking the necessary communication. In essence, your computer is trying to talk to the internet, but it doesn't have the correct "address" or can't find the "post office" to send its messages.

### Step-by-Step Solution

Here’s a comprehensive approach to resolve the "Default Gateway Is Not Available" error in Windows 10 and 11:

## Step 1: Restart Your Router and Modem

This is the simplest yet often most effective solution. A quick power cycle can resolve temporary glitches and re-establish communication.

1.  **Unplug the power cords** from both your modem and your router.
2.  **Wait for at least 30 seconds**. This ensures that all residual power drains from the devices.
3.  **Plug the modem back in first** and wait for its indicator lights to stabilize (this can take a minute or two).
4.  **Then, plug the router back in** and wait for its lights to stabilize.
5.  **Restart your computer** and check if the internet connection is restored.

## Step 2: Run the Network Troubleshooter

Windows has built-in tools that can automatically diagnose and fix network issues.

1.  **Right-click** on the network icon (Wi-Fi or Ethernet) in your system tray.
2.  Select **"Troubleshoot problems."**
3.  Follow the on-screen prompts. The troubleshooter will attempt to identify and resolve common network issues, including gateway problems.

## Step 3: Reset Your IP Address and Flush DNS

Incorrect IP configurations or DNS cache entries can cause this error. You can reset these using Command Prompt.

1.  **Search for "Command Prompt"** in the Windows search bar.
2.  **Right-click** on "Command Prompt" and select **"Run as administrator."**
3.  In the Administrator Command Prompt window, type the following commands, pressing Enter after each one:
    *   `ipconfig /release` (This releases your current IP address.)
    *   `ipconfig /renew` (This requests a new IP address from your router.)
    *   `ipconfig /flushdns` (This clears your DNS cache.)
4.  After running these commands, **restart your computer** and check your connection.

## Step 4: Reset the Network Stack

This command resets various networking components to their default settings, which can resolve deeper configuration issues.

1.  **Open Command Prompt as administrator** (as described in Step 3).
2.  Execute the following commands, pressing Enter after each:
    *   `netsh winsock reset`
    *   `netsh int ip reset`
3.  **Restart your computer** after these commands have completed.

## Step 5: Update or Reinstall Network Adapter Drivers

Outdated or corrupted network drivers can cause connectivity problems.

1.  **Press Windows Key + X** and select **"Device Manager."**
2.  Expand **"Network adapters."**
3.  **Right-click** on your Wi-Fi or Ethernet adapter (e.g., "Intel(R) Dual Band Wireless-AC 8265" or "Realtek PCIe GbE Family Controller").
4.  Select **"Update driver."**
5.  Choose **"Search automatically for drivers."** If Windows finds a newer driver, it will install it.
6.  If that doesn't work, **try uninstalling the driver**. Right-click the adapter, select **"Uninstall device,"** and then **restart your computer**. Windows will attempt to reinstall the driver automatically upon reboot. If not, you may need to download the latest driver from your computer manufacturer's website.

## Step 6: Manually Configure IP Address and DNS Settings

If DHCP is not working correctly, you can try setting a static IP address.

1.  **Search for "Network Connections"** in the Windows search bar and open it.
2.  **Right-click** on your active network adapter (Wi-Fi or Ethernet) and select **"Properties."**
3.  In the list, double-click **"Internet Protocol Version 4 (TCP/IPv4)."**
4.  Select **"Use the following IP address"** and **"Use the following DNS server addresses."**
5.  **Find your router's IP address**. This is usually your default gateway. You can find it by typing `ipconfig` in Command Prompt and looking for "Default Gateway."
6.  Enter the following, replacing the examples with your actual network information:
    *   **IP address:** (e.g., `192.168.1.150` - ensure the last number is not already in use and within your router's subnet, usually `192.168.1.x` or `192.168.0.x`)
    *   **Subnet mask:** (Usually `255.255.255.0`)
    *   **Default gateway:** (Your router's IP address, e.g., `192.168.1.1`)
    *   **Preferred DNS server:** (Often your router's IP address, or you can use public DNS like Google DNS: `8.8.8.8` or Cloudflare DNS: `1.1.1.1`)
    *   **Alternate DNS server:** (e.g., `8.8.4.4` for Google DNS, or `1.0.0.1` for Cloudflare DNS)
7.  Click **"OK"** on all open windows.
8.  **Test your connection.**

## Step 7: Check Router Settings and Firewall

If none of the above steps work, the issue might be with your router's configuration or a firewall.

1.  **Access your router's admin page** by typing its IP address (your default gateway) into a web browser. You'll typically need a username and password.
2.  **Check your router's DHCP settings** to ensure it's enabled and configured to assign IP addresses.
3.  **Temporarily disable your firewall** (both Windows Defender Firewall and any third-party firewall software) to see if it's blocking the connection. **Remember to re-enable it afterward.**

### Common Mistakes

One common mistake is not restarting all network devices after making changes. Simply restarting your computer isn't always enough; the router and modem also need a fresh start to re-establish network assignments. Another pitfall is rushing through the Command Prompt commands. Ensure you are running Command Prompt as an administrator and typing the commands exactly as shown, paying attention to spaces. Users also sometimes forget to check their physical connections – a loose Ethernet cable or a malfunctioning Wi-Fi card can cause this error. Finally, when manually assigning IP addresses, users often pick an IP address that is already in use by another device on the network, leading to IP conflicts.

### Prevention Tips

To prevent the "Default Gateway Is Not Available" error from recurring, ensure your router's firmware is up-to-date. Manufacturers regularly release updates that fix bugs and improve performance. Regularly restart your router and modem, perhaps once a week, to keep them running smoothly. Keep your network adapter drivers updated on your computer. Finally, if you have a stable network configuration, consider setting a static IP address for your computer within your router's DHCP range, but ensure it's outside the range of IPs your router automatically assigns to other devices. This can help prevent IP conflicts and ensure your computer always has the correct network information.