---
title: "How to Fix \"Your DNS Server Isn't Responding\" Error on Windows 10"
date: "2026-04-07T20:46:07.110Z"
slug: "how-to-fix-your-dns-server-isn-t-responding-error-on-windows-10"
type: "how-to"
description: "Troubleshoot and resolve the frustrating \"Your DNS server isn't responding\" error on Windows 10 with this comprehensive step-by-step guide."
keywords: "DNS server error, Windows 10, internet not working, fix DNS, network troubleshooting, no internet access, DNS cache flush, network adapter reset"
---

When you're trying to browse the web, check your email, or use any internet-dependent application on your Windows 10 computer, you might encounter a frustrating message: "Your DNS server isn't responding." This often appears in your web browser, preventing you from loading any websites. You might see variations of this message, such as "This site can't be reached," or "DNS_PROBE_FINISHED_NXDOMAIN." Essentially, your computer is unable to translate website names (like www.google.com) into the numerical IP addresses that computers use to communicate on the internet. This effectively cuts off your internet access.

### Why It Happens

The "Your DNS Server Isn't Responding" error occurs because the Domain Name System (DNS) is having trouble. Think of DNS as the internet's phonebook. When you type a website address into your browser, your computer asks a DNS server to look up the corresponding IP address. If your computer can't reach or get a response from this DNS server, it can't find the IP address, and therefore, can't connect to the website. This issue can stem from several sources: problems with your current DNS server, issues with your network adapter, outdated network drivers, or even temporary glitches in your router or modem.

## Step 1: Restart Your Computer and Modem/Router

Often, the simplest solutions are the most effective. A quick restart can clear out temporary software glitches and reset your network connections, which might be all your DNS server needs to start responding again.

1.  **Restart your computer:** Click the **Start** button, then **Power**, and select **Restart**.
2.  **Restart your modem and router:**
    *   Unplug the power cables from both your modem and your router.
    *   Wait for at least 30 seconds to allow them to fully discharge.
    *   Plug the modem back in first and wait for its indicator lights to stabilize (usually 1-2 minutes).
    *   Then, plug your router back in and wait for its lights to stabilize.
    *   Once both devices have fully restarted, try connecting to the internet again on your computer.

## Step 2: Flush Your DNS Cache

Your computer stores a local cache of DNS records to speed up future lookups. However, this cache can sometimes become corrupted or outdated, leading to connection issues. Flushing it forces your computer to retrieve fresh DNS information.

1.  Open the **Command Prompt** as an administrator. You can do this by searching for "cmd" in the Windows search bar, right-clicking on "Command Prompt," and selecting "Run as administrator."
2.  In the Command Prompt window, type the following command and press **Enter**:
    ```bash
    ipconfig /flushdns
    ```
3.  You should see a confirmation message stating "Successfully flushed the DNS Resolver Cache."
4.  Close the Command Prompt and try accessing websites again.

## Step 3: Change Your DNS Server Settings

Your Internet Service Provider (ISP) typically assigns you a DNS server automatically. However, these servers can sometimes be slow or unreliable. Switching to a public DNS server like Google DNS or Cloudflare DNS can often improve performance and resolve this error.

1.  Right-click the **Start** button and select **Network Connections**.
2.  Click on **Change adapter options**.
3.  Right-click on the network adapter you are currently using (usually "Wi-Fi" or "Ethernet") and select **Properties**.
4.  In the properties window, scroll down and select **Internet Protocol Version 4 (TCP/IPv4)**, then click **Properties**.
5.  Select the option **Use the following DNS server addresses**.
6.  You can enter the following public DNS server addresses:
    *   **Google DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
7.  Click **OK** on both windows to save your changes.
8.  Test your internet connection.

## Step 4: Reset the TCP/IP Stack

The Transmission Control Protocol/Internet Protocol (TCP/IP) stack is a fundamental component of your network communication. Corrupted or misconfigured TCP/IP settings can cause a variety of network problems, including DNS resolution failures. Resetting it can often fix these issues.

1.  Open the **Command Prompt** as an administrator (as described in Step 2).
2.  Type the following commands one by one, pressing **Enter** after each:
    ```bash
    netsh winsock reset
    netsh int ip reset
    ```
3.  You should see messages indicating that the operations completed successfully.
4.  Restart your computer after running these commands.

## Step 5: Update or Reinstall Your Network Adapter Driver

Outdated or corrupted network adapter drivers can interfere with your computer's ability to communicate with DNS servers. Updating or reinstalling these drivers can resolve the problem.

1.  Right-click the **Start** button and select **Device Manager**.
2.  Expand the **Network adapters** section.
3.  Right-click on your primary network adapter (e.g., "Intel(R) Dual Band Wireless-AC 7265" or "Realtek PCIe GBE Family Controller") and select **Update driver**.
4.  Choose **Search automatically for drivers**. Windows will attempt to find and install the latest driver.
5.  If Windows cannot find a newer driver, you can try uninstalling the driver:
    *   Right-click your network adapter again and select **Uninstall device**.
    *   Check the box that says "Delete the driver software for this device" if it appears.
    *   Click **Uninstall**.
    *   After uninstalling, restart your computer. Windows should automatically reinstall a generic driver upon startup.
    *   Alternatively, you can visit your computer manufacturer's website or the website of your network card manufacturer to download the latest driver manually.

## Step 6: Disable Your Firewall or Antivirus Temporarily

Sometimes, your firewall or antivirus software can be overzealous and block legitimate network traffic, including DNS requests. Temporarily disabling them can help determine if they are the cause of the issue.

1.  **For Windows Firewall:**
    *   Search for "Windows Defender Firewall" in the Windows search bar and open it.
    *   Click on "Turn Windows Defender Firewall on or off" in the left-hand pane.
    *   Under "Private network settings" and "Public network settings," select "Turn off Windows Defender Firewall (not recommended)."
    *   Click **OK**.
2.  **For Third-Party Antivirus/Firewall:**
    *   Locate your antivirus or firewall software in the system tray (near the clock) or by searching for it.
    *   Right-click its icon and look for an option to temporarily disable or pause protection.
3.  **Test your connection.** If your internet starts working, the firewall or antivirus was the culprit. Re-enable your security software immediately and look for settings within it that might be blocking DNS traffic. You may need to add an exception for DNS or adjust its settings.

### Common Mistakes

One common mistake is not fully restarting network equipment; simply unplugging and immediately plugging back in might not be enough. Another frequent error is typing the DNS server IP addresses incorrectly when manually changing settings, which can lead to the same or even worse connectivity issues. People also sometimes forget to run Command Prompt commands as an administrator, rendering the commands ineffective. Finally, neglecting to re-enable security software after testing is a significant oversight, leaving your system vulnerable.

### Prevention Tips

To prevent the "Your DNS Server Isn't Responding" error from recurring, it's beneficial to regularly update your network adapter drivers and ensure your router's firmware is up to date. Using reliable public DNS servers like Google DNS or Cloudflare DNS can also help maintain consistent connectivity. Periodically clearing your DNS cache (using `ipconfig /flushdns`) can also be a good maintenance practice. Lastly, always ensure your security software is configured correctly and isn't unnecessarily blocking network traffic.