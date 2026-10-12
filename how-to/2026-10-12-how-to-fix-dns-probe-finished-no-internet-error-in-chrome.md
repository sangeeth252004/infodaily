---
title: "How to Fix 'DNS_PROBE_FINISHED_NO_INTERNET' Error in Chrome"
date: "2026-10-12T22:23:28.630Z"
slug: "how-to-fix-dns-probe-finished-no-internet-error-in-chrome"
type: "how-to"
description: "Resolve the 'DNS_PROBE_FINISHED_NO_INTERNET' error in Chrome with this comprehensive guide. Learn the causes and follow step-by-step solutions to restore your internet connection."
keywords: "DNS_PROBE_FINISHED_NO_INTERNET, Chrome error, fix internet connection, DNS issues, network troubleshooting, no internet Chrome"
---

When you try to access a website in Google Chrome, you might encounter an error message stating: **"DNS_PROBE_FINISHED_NO_INTERNET"**. This message typically appears prominently on a blank or error page, informing you that your computer is unable to connect to the internet, despite your Wi-Fi or Ethernet connection appearing active. You won't be able to load any web pages, and this indicates a problem with how your device is resolving domain names into IP addresses, or a more general network connectivity issue.

This error signifies that your browser attempted to translate a website's domain name (like "google.com") into its numerical IP address using the Domain Name System (DNS), but it failed. This failure can stem from various points in the communication chain between your device and the DNS server, or it could indicate a broader problem with your computer's network configuration preventing it from reaching the internet at all.

### Why It Happens

The "DNS_PROBE_FINISHED_NO_INTERNET" error typically occurs because your computer cannot communicate with a DNS server or because the DNS server itself is unable to resolve the requested domain name. The DNS is often referred to as the "phonebook of the internet," translating human-readable website names into machine-readable IP addresses. If this translation process fails, your browser cannot locate the server hosting the website, leading to this error. Common culprits include issues with your current DNS settings, problems with your network adapter, outdated network drivers, or even malware interfering with your network configurations.

Essentially, your device is not receiving or correctly processing the information needed to find websites. This could be due to a temporary glitch with your internet service provider's (ISP) DNS servers, a configuration issue on your router, or a problem on your computer's end that's preventing it from reaching out to these DNS servers effectively. Understanding these underlying causes is the first step toward a successful resolution.

## Step 1: Restart Your Router and Modem

A simple restart of your networking equipment can resolve many transient network issues, including DNS problems. This process forces your router and modem to re-establish their connections with your ISP and refresh their network configurations.

1.  **Unplug your modem:** Locate your modem (the device that connects to your internet line, often from your ISP) and unplug its power adapter.
2.  **Unplug your router:** If you have a separate router, unplug its power adapter as well.
3.  **Wait:** Leave both devices unplugged for at least 30 seconds to a minute. This allows them to fully discharge and reset.
4.  **Plug in the modem:** Plug the modem back in and wait for its lights to stabilize, indicating it has reconnected to your ISP (this may take a few minutes).
5.  **Plug in the router:** Once the modem is ready, plug your router back in and wait for its lights to stabilize.
6.  **Test connection:** Try accessing a website in Chrome.

## Step 2: Flush Your DNS Cache

Over time, your computer stores cached DNS records to speed up future website lookups. However, if these records become corrupted or outdated, they can lead to connection errors. Flushing this cache forces your computer to fetch fresh DNS information.

1.  **Open Command Prompt as Administrator:**
    *   Click the Windows Start button.
    *   Type `cmd` in the search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
    *   If prompted by User Account Control, click "Yes."
2.  **Execute the flush command:** In the Command Prompt window, type the following command and press Enter:
    ```
    ipconfig /flushdns
    ```
3.  **Verify completion:** You should see a message confirming that the DNS Resolver Cache was successfully flushed.
4.  **Restart your computer:** It's a good practice to restart your computer after flushing the DNS cache.

## Step 3: Change Your DNS Server

Your ISP's default DNS servers might be experiencing issues or may be slower than alternatives. Switching to public DNS servers like Google DNS or Cloudflare DNS can often improve speed and reliability.

1.  **Open Network Connections:**
    *   Click the Windows Start button.
    *   Type `ncpa.cpl` and press Enter. This will open the Network Connections window.
2.  **Select your active network adapter:** Right-click on your current internet connection (either Wi-Fi or Ethernet) and select "Properties."
3.  **Configure IPv4 DNS:**
    *   In the properties window, find and select "Internet Protocol Version 4 (TCP/IPv4)."
    *   Click the "Properties" button.
4.  **Enter new DNS server addresses:**
    *   Select "Use the following DNS server addresses."
    *   **For Google DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **For Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
5.  **Save changes:** Click "OK" on both the TCP/IPv4 properties window and the adapter properties window.
6.  **Test connection:** Try loading a website in Chrome. You may also want to restart your computer.

## Step 4: Reset Your TCP/IP Stack and Winsock Catalog

Corrupted network configurations on your computer can prevent proper internet access. Resetting the TCP/IP stack and the Winsock catalog can often fix these underlying issues.

1.  **Open Command Prompt as Administrator:** Follow the same steps as in Step 2 to open Command Prompt with administrative privileges.
2.  **Reset TCP/IP:** Type the following command and press Enter:
    ```
    netsh int ip reset
    ```
3.  **Reset Winsock:** Type the following command and press Enter:
    ```
    netsh winsock reset
    ```
4.  **Restart your computer:** A restart is crucial for these changes to take effect.

## Step 5: Disable Your VPN or Proxy Server

If you are using a Virtual Private Network (VPN) or a proxy server, these services can sometimes interfere with DNS resolution or your internet connection. Temporarily disabling them can help diagnose if they are the cause of the "DNS_PROBE_FINISHED_NO_INTERNET" error.

*   **For VPNs:** Locate your VPN client software, disconnect from your VPN server, and then try accessing a website. If the connection works, the issue lies with your VPN service or its configuration.
*   **For Proxy Servers:**
    1.  Click the Windows Start button.
    2.  Type `inetcpl.cpl` and press Enter to open Internet Properties.
    3.  Go to the "Connections" tab.
    4.  Click "LAN settings."
    5.  Uncheck the box that says "Use a proxy server for your LAN (These settings will not apply to dial-up or VPN connections)."
    6.  Click "OK" on both windows.
    7.  Test your connection.

## Step 6: Check for Malware

Malware can interfere with your network settings, including DNS configurations, leading to connectivity issues like the one you're experiencing.

1.  **Run a full system scan:** Use your installed antivirus or anti-malware software to perform a comprehensive scan of your computer.
2.  **Remove any threats:** If the scan detects any malicious software, follow the instructions to quarantine or remove it.
3.  **Restart your computer:** After the scan and any necessary removals, restart your computer.
4.  **Test connection:** See if you can now access websites.

## Step 7: Update Your Network Adapter Drivers

Outdated or corrupted network adapter drivers can cause various connectivity problems. Updating them can resolve compatibility issues and improve performance.

1.  **Open Device Manager:**
    *   Click the Windows Start button.
    *   Type `device manager` and select it from the search results.
2.  **Locate Network Adapters:** Expand the "Network adapters" category.
3.  **Update your adapter:** Right-click on your primary network adapter (e.g., "Intel(R) Dual Band Wireless-AC...") and select "Update driver."
4.  **Search automatically:** Choose "Search automatically for drivers." Windows will search online for the latest driver.
5.  **Install if available:** If a newer driver is found, follow the on-screen instructions to install it.
6.  **Restart your computer:** After installation, restart your computer.
7.  **Test connection:** Try browsing the web.

### Common Mistakes

One of the most common mistakes is not restarting networking equipment when instructed. Many users skip the router and modem reboot, assuming it's unnecessary, but this step is crucial for clearing temporary glitches. Another frequent error is forgetting to run Command Prompt "as administrator" when executing network commands. Without elevated privileges, these commands will fail, leading users to believe the solution doesn't work. Some users also forget to restart their computer after applying critical network changes, which is essential for the system to properly recognize and implement the new settings. Finally, incorrectly entering DNS server addresses or network commands can inadvertently create new problems, so double-checking for typos is vital.

### Prevention Tips

To prevent the "DNS_PROBE_FINISHED_NO_INTERNET" error from recurring, maintain a clean and updated system. Regularly run antivirus scans to protect against malware that could interfere with network settings. Keep your operating system and network adapter drivers up-to-date, as these updates often include fixes for connectivity issues. Consider using reliable public DNS servers (like Google DNS or Cloudflare DNS) for improved performance and stability, rather than relying solely on your ISP's default servers. Finally, periodically restart your router and modem as part of your regular tech maintenance routine, perhaps once a month, to ensure they are running smoothly and free from accumulating minor issues.