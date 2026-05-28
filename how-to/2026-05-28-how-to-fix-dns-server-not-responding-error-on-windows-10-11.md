---
title: "How to Fix \"DNS Server Not Responding\" Error on Windows 10/11"
date: "2026-05-28T08:42:17.420Z"
slug: "how-to-fix-dns-server-not-responding-error-on-windows-10-11"
type: "how-to"
description: "Troubleshoot and resolve the frustrating \"DNS Server Not Responding\" error on Windows 10 and 11 with this comprehensive, step-by-step guide. Learn why it happens and how to fix it."
keywords: "DNS server not responding, Windows 10, Windows 11, internet connection, network error, DNS, fix DNS, troubleshoot network, resolve DNS error"
---

When you try to access websites or use online services, and instead of seeing the expected content, you encounter messages like "This site can't be reached," "Page cannot be displayed," or specifically "DNS server not responding," it can be incredibly frustrating. This error means your computer is unable to translate the human-readable website names (like google.com) into the numerical IP addresses that computers use to communicate. Essentially, your computer is asking for directions to a website, but the map service (the DNS server) isn't answering.

This "DNS server not responding" error prevents you from browsing the internet, accessing online applications, or connecting to network resources. It’s a common roadblock that can bring your online activities to a halt, leaving you wondering what went wrong and how to get back online.

### Why It Happens

The "DNS server not responding" error typically arises when your Windows computer cannot successfully communicate with its configured Domain Name System (DNS) server. DNS servers are like the phonebooks of the internet; they hold vast databases that map domain names (like `www.example.com`) to their corresponding IP addresses (like `192.168.1.1`). When you type a website address into your browser, your computer queries a DNS server to find the IP address. If that server is unavailable, misconfigured, or too slow to respond, your computer can't get the necessary information to connect to the website.

Several factors can contribute to this issue. It could be a problem with your current DNS server, such as it being down for maintenance or experiencing technical difficulties. Alternatively, the issue might stem from your own network configuration, including a faulty router, incorrect network settings on your computer, or even a temporary glitch with your Internet Service Provider (ISP). In some cases, network adapter issues or firewall restrictions can also interfere with DNS lookups.

## Step-by-Step Solution

Here’s a comprehensive guide to help you tackle the "DNS server not responding" error on your Windows 10 or Windows 11 computer:

## Step 1: Restart Your Modem and Router

Often, network-related issues, including DNS problems, can be resolved with a simple restart of your network hardware. This clears temporary glitches and refreshes the connection to your ISP.

1.  **Unplug the power cords** from both your modem and your router.
2.  **Wait for at least 30 seconds**. This ensures that all residual power is drained and the devices completely reset.
3.  **Plug the modem back in** first. Wait for its indicator lights to stabilize, usually indicating a stable internet connection (this can take a minute or two).
4.  **Plug the router back in**. Again, wait for its lights to indicate a stable connection.
5.  **Restart your computer** and try browsing the internet again.

## Step 2: Flush Your DNS Cache

Your computer stores a local cache of recently visited domain names and their IP addresses. If this cache becomes corrupted or outdated, it can lead to DNS resolution errors. Flushing this cache forces your computer to fetch fresh DNS information.

1.  Click the **Start button**.
2.  Type `cmd` in the search bar.
3.  **Right-click** on "Command Prompt" in the search results.
4.  Select "**Run as administrator**". This is crucial to allow the command to execute properly.
5.  In the Command Prompt window, type the following command and press **Enter**:
    ```bash
    ipconfig /flushdns
    ```
6.  You should see a message confirming that "Successfully flushed the DNS Resolver Cache."
7.  Close the Command Prompt window and try accessing websites again.

## Step 3: Change Your DNS Server Settings

Your ISP typically assigns you their default DNS servers. However, these servers can sometimes be slow or unreliable. Switching to a public DNS server, such as Google DNS or Cloudflare DNS, can often improve speed and reliability.

1.  Click the **Start button**.
2.  Type `ncpa.cpl` and press **Enter**. This will open the "Network Connections" window.
3.  **Right-click** on your active network adapter (usually "Wi-Fi" or "Ethernet").
4.  Select "**Properties**".
5.  In the Properties window, scroll down and find "**Internet Protocol Version 4 (TCP/IPv4)**".
6.  Select it and click the "**Properties**" button.
7.  At the bottom of the IPv4 Properties window, select "**Use the following DNS server addresses**".
8.  Enter the preferred and alternate DNS server addresses. Here are common examples:
    *   **Google DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
9.  Check the box for "**Validate settings upon exit**".
10. Click "**OK**" on both the IPv4 Properties window and the adapter's Properties window.
11. Windows will test the new settings. If successful, try browsing again.

## Step 4: Renew Your IP Address and DNS Settings

Sometimes, your computer might have an outdated or conflicting IP address and DNS configuration. Renewing these settings can resolve such issues.

1.  Open **Command Prompt as administrator** (follow steps 1-5 from "Step 2: Flush Your DNS Cache").
2.  Type the following commands one by one, pressing **Enter** after each:
    ```bash
    ipconfig /release
    ipconfig /renew
    ipconfig /flushdns
    ```
    *   `ipconfig /release` releases your current IP address.
    *   `ipconfig /renew` obtains a new IP address from your router.
    *   `ipconfig /flushdns` (included again for good measure) ensures the DNS cache is clean.
3.  Close the Command Prompt and test your internet connection.

## Step 5: Disable Your Firewall and Antivirus Temporarily

Firewalls and antivirus software are essential for security, but they can occasionally interfere with network processes, including DNS lookups, by mistakenly identifying them as threats. Temporarily disabling them allows you to check if they are the cause.

1.  **For Windows Defender Firewall:**
    *   Click the **Start button**.
    *   Type `Windows Security` and open it.
    *   Click on "**Firewall & network protection**".
    *   Click on the active network (e.g., "Domain network" or "Private network").
    *   Toggle the switch for "**Microsoft Defender Firewall**" to **Off**.
2.  **For Third-Party Antivirus/Firewall:**
    *   Locate your antivirus software's icon in the system tray (near the clock).
    *   **Right-click** on it and look for an option like "Disable," "Turn off protection," or "Exit." Choose a temporary disabling option (e.g., for 15 minutes or until restart).
3.  **Test your internet connection.**
4.  **Crucially, remember to re-enable your firewall and antivirus software** immediately after testing, regardless of whether it resolved the issue, to maintain your system's security.

## Step 6: Update Your Network Adapter Drivers

Outdated or corrupt network adapter drivers can cause a variety of network problems, including DNS issues. Updating them can resolve these underlying conflicts.

1.  Click the **Start button**.
2.  Type `device manager` and open it.
3.  Expand the "**Network adapters**" section.
4.  **Right-click** on your primary network adapter (e.g., "Intel(R) Dual Band Wireless-AC 8265" or "Realtek PCIe GbE Family Controller").
5.  Select "**Update driver**".
6.  Choose "**Search automatically for drivers**". Windows will search for and install any available updates.
7.  If Windows can't find a driver, you might need to visit the manufacturer's website for your specific network adapter or laptop/motherboard model to download the latest drivers manually.
8.  After updating, **restart your computer**.

## Step 7: Check Network Adapter Settings (IPv6)

While less common, sometimes issues with the IPv6 protocol can interfere with DNS resolution. Disabling IPv6 can help diagnose this.

1.  Open **Network Connections** by typing `ncpa.cpl` in the Start menu search and pressing Enter.
2.  **Right-click** on your active network adapter (Wi-Fi or Ethernet).
3.  Select "**Properties**".
4.  In the Properties window, uncheck the box next to "**Internet Protocol Version 6 (TCP/IPv6)**".
5.  Click "**OK**".
6.  Test your internet connection. If this resolves the issue, you might have a problem with your network's IPv6 implementation or your ISP's IPv6 support. You can leave it disabled or investigate further into IPv6 connectivity. Remember to re-enable it if it doesn't solve the problem.

### Common Mistakes

A frequent mistake users make is not running the Command Prompt as administrator for commands like `ipconfig` and `flushdns`. These commands require elevated privileges to modify system network settings. Another common pitfall is forgetting to restart the modem and router in the correct order, or not waiting long enough for them to fully boot up, which can lead to an incomplete network refresh. Some users also skip the crucial step of re-enabling their firewall and antivirus after temporarily disabling them, leaving their systems vulnerable. Finally, people often overlook the possibility of a temporary issue with their ISP and spend too much time troubleshooting their own equipment.

### Prevention Tips

To minimize the chances of encountering the "DNS server not responding" error, keep your network hardware firmware up to date. Regularly restart your modem and router, perhaps once a month, to clear out any lingering issues. Maintain updated network adapter drivers on your computer. Consider using reliable public DNS servers like Google DNS or Cloudflare DNS, as they are often more stable and performant than ISP-provided ones. Also, ensure your computer's operating system and security software are consistently updated, as these updates can include network-related patches and improvements. If you frequently experience DNS issues, it might be worth contacting your ISP to inquire about the stability of their DNS services.