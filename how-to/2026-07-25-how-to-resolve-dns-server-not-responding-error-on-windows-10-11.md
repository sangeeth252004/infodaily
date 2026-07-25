---
title: "How to Resolve \"DNS Server Not Responding\" Error on Windows 10/11"
date: "2026-07-25T20:50:31.021Z"
slug: "how-to-resolve-dns-server-not-responding-error-on-windows-10-11"
type: "how-to"
description: "Learn how to fix the \"DNS Server Not Responding\" error on Windows 10 and 11 with this comprehensive guide. Troubleshoot network issues and regain internet access."
keywords: "DNS server not responding, Windows 10, Windows 11, internet troubleshooting, network error, fix DNS, ipconfig, flush DNS, command prompt, router settings"
---

## Problem Explanation

You're trying to browse the internet, access a website, or perhaps update an application on your Windows 10 or Windows 11 computer, and suddenly, nothing loads. Instead, you're met with frustrating error messages. These commonly include "This site can't be reached," "DNS_PROBE_FINISHED_NXDOMAIN," "Page cannot be displayed," or the most direct of them all: "DNS Server Not Responding." This error signifies a breakdown in the fundamental process of translating human-readable website addresses (like `google.com`) into the numerical IP addresses that computers use to communicate. Without this translation, your computer doesn't know where to find the information you're requesting.

When this error occurs, it's not just that a single website is down; it indicates a broader network communication issue. You'll likely find that no matter which website you try to visit, you encounter the same problem. This can manifest in various ways, from a complete inability to connect to any online resource to intermittent connectivity issues that resolve themselves briefly before failing again. The core of the problem lies in the communication pathway between your device and the Domain Name System (DNS) servers responsible for performing these crucial translations.

## Why It Happens

The "DNS Server Not Responding" error occurs when your Windows computer attempts to query a DNS server to resolve a domain name, but it doesn't receive a timely or valid response. There are several underlying reasons for this. Primarily, the issue can stem from a problem with your current DNS server itself. This could be the DNS server provided by your Internet Service Provider (ISP), or it could be a public DNS server you've manually configured. The server might be temporarily overloaded, undergoing maintenance, experiencing an outage, or misconfigured.

Another significant cause is a problem with your local network configuration. Your computer relies on its network adapter settings to know which DNS servers to contact. If these settings are incorrect, corrupted, or if there's a conflict on your local network, your requests might not even reach the intended DNS server. This can also be related to issues with your router or modem. Your router acts as a gateway for your network, and if it's not properly forwarding DNS requests or is itself having communication problems with the ISP's DNS servers, this error will occur. Furthermore, temporary glitches in your computer's network stack or a firewall blocking DNS traffic can also lead to this frustrating error.

## Step-by-Step Solution

To effectively resolve the "DNS Server Not Responding" error, we'll systematically address potential causes, starting with the simplest and most common fixes.

### ## Step 1: Restart Your Router and Modem

Often, the simplest solutions are the most effective. Network devices, like routers and modems, can sometimes encounter temporary glitches or memory leaks that disrupt their normal operation, including DNS resolution.

1.  **Unplug your modem and router** from their power sources. If you have a combined modem/router unit, unplug that single device.
2.  **Wait for at least 30-60 seconds**. This ensures that all residual power drains and the devices fully reset.
3.  **Plug your modem back in first** and wait for its indicator lights to stabilize, signifying it has reconnected to your ISP. This can take a minute or two.
4.  **Then, plug your router back in** and wait for its lights to stabilize.
5.  Once both devices are fully operational, **restart your computer** and try accessing the internet again.

### ## Step 2: Flush Your DNS Cache

Your computer keeps a local cache of DNS records to speed up future lookups. However, this cache can become outdated or corrupted, leading to resolution errors. Flushing it forces your computer to re-query DNS servers for fresh information.

1.  Press the **Windows key + R** to open the Run dialog box.
2.  Type `cmd` and press **Ctrl + Shift + Enter** to open Command Prompt as an administrator. This is crucial for executing the necessary commands.
3.  In the Command Prompt window, type the following command and press Enter:
    ```bash
    ipconfig /flushdns
    ```
4.  You should see a message confirming that the DNS Resolver Cache was flushed successfully.
5.  Close the Command Prompt window and attempt to access the internet.

### ## Step 3: Reset Your TCP/IP Stack and Winsock Catalog

The TCP/IP protocol is the foundation of internet communication on your computer. If its configuration becomes corrupted, it can cause a wide range of network issues, including DNS problems. Resetting it can often resolve these deeper configuration issues.

1.  Open **Command Prompt as an administrator** again (Windows key + R, type `cmd`, Ctrl + Shift + Enter).
2.  Execute the following commands one by one, pressing Enter after each:
    ```bash
    netsh winsock reset
    netsh int ip reset
    ```
3.  After executing these commands, **restart your computer**. These commands reset the Winsock catalog and the TCP/IP stack to their default configurations.

### ## Step 4: Change Your DNS Server Settings

Your ISP's DNS servers are not always the fastest or most reliable. Switching to a public DNS server like Google DNS or Cloudflare DNS can sometimes resolve "DNS Server Not Responding" errors by using a more stable and performant server.

1.  Press the **Windows key + I** to open Settings.
2.  Go to **Network & internet**.
3.  Click on **Ethernet** (if you're using a wired connection) or **Wi-Fi** (if you're using a wireless connection).
4.  Click on the network you are currently connected to.
5.  Scroll down to **IP settings** and click **Edit**.
6.  In the "Edit IP settings" window, change the dropdown from "Automatic (DHCP)" to **Manual**.
7.  Toggle **IPv4** to **On**.
8.  Enter the following DNS server addresses:
    *   **Preferred DNS:** `8.8.8.8` (Google DNS)
    *   **Alternate DNS:** `8.8.4.4` (Google DNS)
    *   Alternatively, for Cloudflare DNS:
        *   **Preferred DNS:** `1.1.1.1`
        *   **Alternate DNS:** `1.0.0.1`
9.  Ensure **"Don't cache DNS queries locally"** is checked (this setting is present on some Windows versions).
10. Click **Save**.
11. **Restart your computer** and test your internet connection.

### ## Step 5: Temporarily Disable Firewall and Antivirus Software

Occasionally, your firewall or antivirus software might be too aggressive and mistakenly block DNS traffic. Temporarily disabling them can help determine if they are the cause.

1.  **For Windows Firewall:**
    *   Search for "Windows Defender Firewall" in the Start menu and open it.
    *   Click "Turn Windows Defender Firewall on or off" in the left-hand pane.
    *   Select "Turn off Windows Defender Firewall (not recommended)" for both private and public network settings.
2.  **For Third-Party Antivirus/Firewall:**
    *   Locate the icon for your antivirus or firewall software in the system tray (near the clock).
    *   Right-click on the icon and look for an option to disable or turn off the firewall/real-time protection. This option varies by software.
3.  **Test your internet connection.** If it works, the firewall or antivirus is the culprit. You will need to re-enable them and then configure them to allow DNS traffic or create an exception for your network adapter. **Remember to re-enable your security software immediately after testing.**

### ## Step 6: Check Network Adapter Settings (Obtain DNS Server Automatically)

Even if you haven't manually changed them, your network adapter's settings can sometimes become misconfigured, especially if they were set to use static IPs previously. Ensuring they are set to obtain DNS automatically is a good practice.

1.  Press **Windows key + R**, type `ncpa.cpl`, and press Enter. This opens Network Connections.
2.  **Right-click** on the network adapter you are currently using (e.g., "Wi-Fi" or "Ethernet").
3.  Select **Properties**.
4.  In the Properties window, scroll down the list and select **Internet Protocol Version 4 (TCP/IPv4)**.
5.  Click the **Properties** button.
6.  Ensure that **"Obtain an IP address automatically"** and **"Obtain DNS server address automatically"** are selected.
7.  Click **OK** on both windows to save the changes.
8.  You may wish to **restart your router/modem and computer** as described in Step 1.

### ## Step 7: Update Network Adapter Drivers

Outdated or corrupt network adapter drivers can cause all sorts of connectivity issues, including problems with DNS resolution.

1.  Press **Windows key + X** and select **Device Manager**.
2.  Expand the **Network adapters** section.
3.  **Right-click** on your network adapter (e.g., "Intel(R) Ethernet Connection," "Realtek PCIe GBE Family Controller," or your Wi-Fi adapter).
4.  Select **Update driver**.
5.  Choose **"Search automatically for drivers."** Windows will attempt to find and install the latest driver.
6.  If Windows doesn't find a new driver, you can try visiting your computer manufacturer's website (e.g., Dell, HP, Lenovo) or the network adapter manufacturer's website (e.g., Intel, Realtek) to download the latest driver manually and then install it by selecting "Browse my computer for drivers" in the Device Manager.
7.  **Restart your computer** after the driver installation.

## Common Mistakes

A prevalent mistake is not performing a full network device restart. Many users might only restart their computer or unplug their router for a few seconds, which isn't enough to clear temporary issues. Another common oversight is failing to run Command Prompt or PowerShell as an administrator when executing network commands like `ipconfig /flushdns` or `netsh winsock reset`. These commands require elevated privileges to modify system network settings. Additionally, when changing DNS servers, some users forget to restart their computer or renew their IP address, which is necessary for the new DNS settings to take effect properly. Lastly, aggressively disabling security software without re-enabling it afterward leaves the system vulnerable.

## Prevention Tips

To minimize the occurrence of the "DNS Server Not Responding" error, consider a few best practices. Regularly restarting your router and modem, perhaps once a month, can help prevent accumulating minor glitches. Keep your network adapter drivers updated by periodically checking for new releases from your hardware manufacturer. Consider setting your network adapter to obtain DNS server addresses automatically, and only switch to manual DNS servers if you have a specific reason and understand the implications. If you do opt for manual DNS, choose reputable public DNS providers known for their reliability. Finally, ensure your antivirus and firewall software are properly configured and not overly restrictive, allowing essential network traffic to pass through without unnecessary blocking.