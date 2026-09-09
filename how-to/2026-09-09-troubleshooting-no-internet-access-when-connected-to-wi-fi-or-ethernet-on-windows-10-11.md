---
title: "Troubleshooting \"No Internet Access\" When Connected to Wi-Fi or Ethernet on Windows 10/11"
date: "2026-09-09T18:18:44.548Z"
slug: "troubleshooting-no-internet-access-when-connected-to-wi-fi-or-ethernet-on-windows-10-11"
type: "how-to"
description: "Resolve the frustrating \"No Internet Access\" error on Windows 10 and 11, even when you're connected to Wi-Fi or Ethernet. This comprehensive guide provides step-by-step solutions and prevention tips."
keywords: "No Internet Access, Wi-Fi connected no internet, Ethernet connected no internet, Windows 10 internet fix, Windows 11 internet fix, network troubleshooter, DNS cache, IP address, router reset, network adapter reset"
---

## Problem Explanation

You're experiencing the frustrating "No Internet Access" error on your Windows 10 or Windows 11 computer. You've successfully connected to your Wi-Fi network or plugged in your Ethernet cable, and Windows confirms the connection. However, when you try to open a web browser, use online applications, or access any internet-based service, you're met with messages like "You are not connected," "This site can't be reached," or a network icon with an exclamation mark. This situation indicates that while your device is communicating with your local network (router), it's unable to reach the wider internet.

This issue can manifest in various ways. You might see the familiar Wi-Fi or Ethernet icon in the system tray with a small yellow triangle and an exclamation mark. Clicking on it might present a prompt stating "No Internet access" or "Not connected." Sometimes, even if the icon appears normal, attempting to browse a website will result in an error page or a message indicating a lack of internet connectivity. This discrepancy between being physically connected and having no functional internet access is the core of this common technical problem.

## Why It Happens

The "No Internet Access" error, despite a seemingly active network connection, typically arises from a breakdown in communication *beyond* your local network. Your computer is talking to your router, but your router isn't successfully communicating with your Internet Service Provider (ISP) or the wider internet. Common culprits include issues with your IP address configuration, problems with the Domain Name System (DNS) server, a malfunctioning router, or a temporary network glitch. Your computer might have received a local IP address from the router but is failing to obtain a valid gateway address or DNS server information required for internet traversal.

Other potential causes involve corrupted network drivers on your computer, firewall or antivirus software blocking internet traffic, or even issues with your ISP's service. Essentially, something is preventing the data packets from your computer from reaching their intended destinations on the internet and vice-versa. This could be a misconfiguration on your device, a problem with the network hardware, or an external network issue outside your immediate control.

## Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "No Internet Access" issue.

### ## Step 1: Run the Windows Network Troubleshooter

Windows has a built-in troubleshooter designed to automatically detect and fix common network problems. This is often the quickest way to identify and resolve the issue.

1.  **Windows 10:**
    *   Right-click on the network icon (Wi-Fi or Ethernet) in the system tray.
    *   Select "Troubleshoot problems."
    *   Follow the on-screen prompts.

2.  **Windows 11:**
    *   Right-click on the network icon (Wi-Fi or Ethernet) in the system tray.
    *   Select "Network and Internet settings."
    *   Scroll down and click on "Advanced network settings."
    *   Under "More settings," click on "Network troubleshooter."
    *   Select the network adapter (Wi-Fi or Ethernet) you are using and click "Next."
    *   Follow the on-screen prompts.

### ## Step 2: Restart Your Modem and Router

A simple power cycle of your network equipment can resolve many temporary connectivity issues.

1.  **Unplug:** Disconnect the power cables from both your modem and your router.
2.  **Wait:** Allow at least 30-60 seconds for the devices to fully discharge.
3.  **Plug In Modem:** Plug the power cable back into your modem first. Wait for all the indicator lights on the modem to stabilize (this may take a few minutes).
4.  **Plug In Router:** Once the modem is fully operational, plug the power cable back into your router. Wait for its indicator lights to stabilize.
5.  **Test:** Once both devices are powered on and fully booted, try to access the internet on your computer again.

### ## Step 3: Reset Network Settings

This action reverts your network configurations to their default settings, which can fix corrupted settings or incorrect configurations.

1.  **Open Command Prompt as Administrator:**
    *   Search for "Command Prompt" in the Windows search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."

2.  **Execute Commands:** Type the following commands one by one, pressing Enter after each:
    *   `netsh winsock reset`
    *   `netsh int ip reset`
    *   `ipconfig /release`
    *   `ipconfig /renew`
    *   `ipconfig /flushdns`

3.  **Restart Computer:** After all commands have been executed, restart your computer.

### ## Step 4: Update or Reinstall Network Adapter Drivers

Outdated, corrupted, or incompatible network drivers can cause connectivity problems.

1.  **Open Device Manager:**
    *   Press `Windows Key + X` and select "Device Manager."

2.  **Locate Network Adapters:** Expand the "Network adapters" section.

3.  **Update Driver:**
    *   Right-click on your Wi-Fi or Ethernet adapter.
    *   Select "Update driver."
    *   Choose "Search automatically for drivers."
    *   If a new driver is found, follow the prompts to install it.

4.  **Reinstall Driver (If Update Fails or No New Driver Found):**
    *   Right-click on your network adapter.
    *   Select "Uninstall device."
    *   **Important:** If prompted, do NOT check the box that says "Delete the driver software for this device."
    *   Click "Uninstall."
    *   Once uninstalled, click "Action" in the Device Manager menu bar and select "Scan for hardware changes." Windows will automatically reinstall the driver.
    *   Alternatively, restart your computer, and Windows will attempt to reinstall the driver upon startup.

### ## Step 5: Check Proxy Settings

Incorrect proxy settings can block internet access.

1.  **Open Internet Options:**
    *   Search for "Internet Options" in the Windows search bar and open it.

2.  **Go to Connections Tab:**
    *   Click on the "Connections" tab.
    *   Click on the "LAN settings" button.

3.  **Verify Settings:**
    *   Ensure that "Automatically detect settings" is checked.
    *   Ensure that "Use a proxy server for your LAN" is *unchecked* unless you specifically know you need one and it's configured correctly.
    *   Click "OK" on both windows to save changes.

### ## Step 6: Manually Set DNS Servers

Sometimes, your ISP's DNS servers might be experiencing issues. Switching to public DNS servers like Google DNS or Cloudflare DNS can resolve this.

1.  **Open Network Connections:**
    *   Search for "View network connections" in the Windows search bar and open it.

2.  **Access Adapter Properties:**
    *   Right-click on your active network adapter (Wi-Fi or Ethernet).
    *   Select "Properties."

3.  **Configure IPv4 DNS:**
    *   In the properties window, double-click on "Internet Protocol Version 4 (TCP/IPv4)."
    *   Select "Use the following DNS server addresses."
    *   Enter the following (for Google DNS):
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   Or, for Cloudflare DNS:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   Check "Validate settings upon exit."
    *   Click "OK" on both windows.

4.  **Test:** Try accessing the internet. You may need to run `ipconfig /flushdns` again in Command Prompt as administrator.

## Common Mistakes

A frequent oversight when troubleshooting this issue is forgetting to restart all network devices. While restarting your computer is essential, the modem and router are often the source of the problem and require their own power cycle. Another common mistake is making multiple changes simultaneously without testing after each step. This makes it impossible to pinpoint which specific action resolved the issue, hindering future troubleshooting. Users also sometimes disable their firewall or antivirus software entirely without understanding the risks, or they fail to run Command Prompt as administrator when executing network reset commands, rendering those commands ineffective. Finally, not confirming the correct network adapter (Wi-Fi vs. Ethernet) when updating drivers or changing settings can lead to modifying the wrong configuration.

## Prevention Tips

To minimize the chances of encountering the "No Internet Access" error, ensure your network hardware is kept up-to-date. Regularly update your router's firmware, as manufacturers release updates to improve performance and security. Maintain updated network drivers on your Windows computer by checking for driver updates periodically, especially after major Windows updates. Implementing a consistent reboot schedule for your modem and router (e.g., once a week) can also prevent many minor glitches from escalating. Furthermore, be cautious about installing unfamiliar network-related software or making significant changes to network settings without a clear understanding of their impact. Regularly testing your internet connection after any network changes can also catch problems early.