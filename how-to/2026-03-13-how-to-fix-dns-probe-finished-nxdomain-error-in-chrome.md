---
title: "How to Fix 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-03-13T10:36:00.168Z"
slug: "how-to-fix-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "Resolve the `DNS_PROBE_FINISHED_NXDOMAIN` error in Chrome with expert, step-by-step solutions including DNS flushing, changing DNS servers, and network resets."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, fix DNS, NXDOMAIN, DNS probe finished, network error, Chrome DNS cache, flush DNS, change DNS servers, site can't be reached"
---

### Problem Explanation

The `DNS_PROBE_FINISHED_NXDOMAIN` error is a common internet browsing issue primarily encountered in Google Chrome. When this error occurs, instead of loading the desired webpage, Chrome displays a stark "This site can't be reached" message, often accompanied by "DNS_PROBE_FINISHED_NXDOMAIN" at the bottom. This indicates that the browser failed to resolve the domain name (e.g., example.com) into an IP address that the web server understands, essentially meaning the requested domain either doesn't exist, cannot be found, or there's a problem with your computer's ability to locate it.

Users typically experience this error when attempting to navigate to a specific website, with all other internet functionalities (like email or other applications) potentially working fine, or as a symptom of a broader network connectivity problem. The presence of "NXDOMAIN" is crucial, as it stands for "Non-Existent Domain," signaling that the DNS resolver was explicitly told the domain does not exist, or it timed out trying to find it.

### Why It Happens

The `DNS_PROBE_FINISHED_NXDOMAIN` error stems from an issue within the Domain Name System (DNS) resolution process. DNS acts like a phonebook for the internet, translating human-readable domain names (like `google.com`) into machine-readable IP addresses (like `172.217.160.142`). When you type a website address into Chrome, your computer queries a DNS server to find the corresponding IP address. If this process fails, the `NXDOMAIN` error is triggered.

Root causes can vary, but commonly include: incorrect or corrupt DNS server settings on your computer or router; a local DNS cache (both browser and system-wide) holding outdated or incorrect entries; temporary glitches with your internet service provider's (ISP) DNS servers; interference from firewall or antivirus software blocking DNS requests; or, less commonly, the domain name truly doesn't exist or has expired. Network configuration errors, such as a misconfigured IP address or gateway, can also prevent successful DNS lookups.

### Step-by-Step Solution

Follow these steps to diagnose and resolve the `DNS_PROBE_FINISHED_NXDOMAIN` error.

#### ## Step 1: Check Your Internet Connection

Before delving into complex solutions, confirm your basic internet connectivity. This simple check can rule out broader network issues.

1.  **Test Other Websites:** Try accessing several other popular websites (e.g., `google.com`, `youtube.com`) in Chrome. If all sites fail, the problem is likely with your internet connection or router, not specific to a single domain.
2.  **Test on Another Device:** Try accessing the problem website, or any website, on another device connected to the same network (e.g., a smartphone or tablet). If other devices can browse normally, the issue is specific to your computer.
3.  **Restart Your Router/Modem:** Power cycle your internet router and modem. Unplug both devices from their power sources, wait for 30 seconds, then plug the modem back in. Once its lights stabilize, plug the router back in and wait for it to fully boot up.

#### ## Step 2: Clear Chrome's DNS Cache

Chrome maintains its own internal DNS cache to speed up page loading. A corrupted or outdated entry in this cache can lead to `NXDOMAIN` errors for specific sites.

1.  **Open Chrome's Internal DNS Settings:** Type `chrome://net-internals/#dns` into your Chrome address bar and press Enter.
2.  **Clear Host Cache:** On the page that opens, locate and click the "Clear host cache" button. This action flushes Chrome's internal DNS cache.
3.  **Restart Chrome:** Close all Chrome windows and reopen the browser. Then, try accessing the problematic website again.

#### ## Step 3: Flush Your System's DNS Cache

Your operating system also maintains a DNS cache. Flushing it forces your computer to request new DNS information, potentially resolving issues caused by stale entries.

1.  **Open Command Prompt (Windows):**
    *   Press `Windows Key + R` to open the Run dialog.
    *   Type `cmd` and press `Ctrl + Shift + Enter` to open an elevated Command Prompt. Confirm the UAC prompt if it appears.
2.  **Flush DNS:** In the Command Prompt window, type the following command and press Enter:
    ```cmd
    ipconfig /flushdns
    ```
    You should see a confirmation message: "Successfully flushed the DNS Resolver Cache."
3.  **Open Terminal (macOS):**
    *   Open Spotlight Search (`Command + Space`) and type `Terminal`, then press Enter.
4.  **Flush DNS (macOS):** The command varies slightly by macOS version. Try these, one at a time, until one works:
    ```bash
    sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
    sudo killall -HUP mDNSResponder
    ```
    You will be prompted for your administrator password.
5.  **Restart your computer** after flushing the system DNS cache, then try accessing the website.

#### ## Step 4: Renew Your IP Address

Renewing your IP address can resolve network configuration conflicts that might be preventing proper DNS resolution. This process releases your current IP and requests a new one from your router's DHCP server.

1.  **Open Command Prompt (Windows):** Follow the steps in Step 3 to open an elevated Command Prompt.
2.  **Release IP Address:** Type the following command and press Enter:
    ```cmd
    ipconfig /release
    ```
3.  **Renew IP Address:** Type the following command and press Enter:
    ```cmd
    ipconfig /renew
    ```
4.  **Restart your computer** and test the website again.
5.  **Restart Network Interface (macOS):**
    *   Go to `System Settings` (or `System Preferences` on older macOS).
    *   Navigate to `Network`.
    *   Select your active network connection (e.g., Wi-Fi or Ethernet).
    *   Click `Details` (or `Advanced` on older macOS).
    *   Go to the `TCP/IP` tab.
    *   Click `Renew DHCP Lease`.
6.  **Restart your computer** and test the website.

#### ## Step 5: Change Your DNS Servers

Your ISP's default DNS servers might be experiencing issues or be configured suboptimally. Switching to public, reliable DNS servers (like Google Public DNS or Cloudflare DNS) can often resolve DNS-related problems.

1.  **Open Network Connections (Windows):**
    *   Press `Windows Key + R`, type `ncpa.cpl`, and press Enter.
    *   Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select `Properties`.
2.  **Configure DNS (Windows):**
    *   In the Properties window, select `Internet Protocol Version 4 (TCP/IPv4)` and click `Properties`.
    *   Select "Use the following DNS server addresses."
    *   Enter the preferred and alternate DNS server addresses.
        *   **Google Public DNS:** Preferred: `8.8.8.8`, Alternate: `8.8.4.4`
        *   **Cloudflare DNS:** Preferred: `1.1.1.1`, Alternate: `1.0.0.1`
    *   Click `OK` twice to save changes.
    *   Repeat the process for `Internet Protocol Version 6 (TCP/IPv6)` using these addresses (if applicable):
        *   **Google Public DNS:** Preferred: `2001:4860:4860::8888`, Alternate: `2001:4860:4860::8844`
        *   **Cloudflare DNS:** Preferred: `2606:4700:4700::1111`, Alternate: `2606:4700:4700::1001`
3.  **Configure DNS (macOS):**
    *   Go to `System Settings` > `Network`.
    *   Select your active network connection (e.g., Wi-Fi).
    *   Click `Details` (or `Advanced`).
    *   Go to the `DNS` tab.
    *   Click the `+` button to add new DNS servers.
    *   Enter the preferred and alternate DNS server addresses (e.g., 8.8.8.8 and 8.8.4.4).
    *   Remove any existing DNS entries that are no longer needed.
    *   Click `OK` or `Apply`.
4.  **Restart your computer** and check the website.

#### ## Step 6: Temporarily Disable Firewall and Antivirus

Security software can sometimes interfere with network connections, including DNS requests. Temporarily disabling your firewall and antivirus can help determine if they are the cause.

1.  **Disable Firewall:**
    *   **Windows:** Search for "Windows Defender Firewall" in the Start menu. Click "Turn Windows Defender Firewall on or off" on the left pane, then select "Turn off Windows Defender Firewall (not recommended)" for both private and public networks. **Remember to re-enable it after testing.**
    *   **macOS:** Go to `System Settings` > `Network` > `Firewall` and temporarily turn it off. **Re-enable after testing.**
2.  **Disable Antivirus:** Temporarily disable your third-party antivirus software by right-clicking its icon in the system tray and choosing the disable option. The steps vary by software. **Re-enable immediately after testing.**
3.  **Test the Website:** Try accessing the problematic website. If it loads, re-enable your security software one by one to identify the culprit, then configure an exception or update the software.

#### ## Step 7: Reset Network Settings / Check Router DNS

If none of the above steps work, a more comprehensive network reset or checking your router's DNS settings might be necessary.

1.  **Reset Network Settings (Windows 10/11):**
    *   Go to `Settings` > `Network & internet` > `Advanced network settings` > `Network reset`.
    *   Click `Reset now`. This will reinstall network adapters and reset network components to their original settings. Your computer will restart.
2.  **Reset Network Settings (macOS):**
    *   This is more involved and usually requires deleting network preference files. A simpler alternative is to create a new network location. Go to `System Settings` > `Network` > `Locations` (dropdown at the top) > `Edit Locations` > `+` to add a new location, then configure your Wi-Fi or Ethernet.
3.  **Check Router DNS Settings:** Access your router's administration page (usually `192.168.1.1` or `192.168.0.1` in a web browser). Look for DNS settings under "WAN," "Internet," or "Network Settings." Ensure it's set to "Obtain DNS automatically" from your ISP, or manually configure it to use reliable public DNS servers (like Google or Cloudflare) as a global setting for all devices on your network. Consult your router's manual for specific instructions.
4.  **Factory Reset Router (Last Resort):** As a final, drastic step, consider performing a factory reset on your router. This reverts all settings to default. **Be aware you will need to reconfigure your Wi-Fi name, password, and any custom settings.**

### Common Mistakes

When troubleshooting the `DNS_PROBE_FINISHED_NXDOMAIN` error, users often make several common mistakes that can prolong the resolution process or lead to frustration:

*   **Skipping Basic Checks:** Immediately jumping to complex solutions without first confirming a working internet connection or restarting the router. A simple restart often fixes transient issues.
*   **Not Restarting After Changes:** Many DNS and network configuration changes require a full browser restart, system restart, or both, to take effect. Applying changes without a proper restart means the system might still be using old cached data.
*   **Incorrectly Entering DNS Servers:** Typos when manually entering IP addresses for public DNS servers (e.g., `8.8.8.8` instead of `8.8.8.8`). Double-check all entries for accuracy, especially for IPv6 addresses which are longer and more complex.
*   **Forgetting to Re-enable Security Software:** Temporarily disabling firewalls or antivirus is a valid diagnostic step, but forgetting to re-enable them leaves your system vulnerable. Always re-enable them immediately after testing.
*   **Changing DNS on the Wrong Adapter:** If connected via Wi-Fi, ensure DNS settings are changed for the Wi-Fi adapter, not an unused Ethernet adapter, and vice versa.

### Prevention Tips

Preventing the `DNS_PROBE_FINISHED_NXDOMAIN` error primarily involves maintaining a healthy network environment and proactive measures:

*   **Use Reliable Public DNS Servers:** Configure your computer or, ideally, your router, to use trusted public DNS servers like Google Public DNS or Cloudflare DNS. These are often faster and more reliable than default ISP servers and less prone to outages or caching issues.
*   **Keep Your Operating System and Browser Updated:** Regular updates for Windows, macOS, and Google Chrome often include bug fixes and performance improvements that can address underlying network or browser-specific issues contributing to DNS problems.
*   **Regularly Clear Browser and System Caches:** While not always necessary, periodically clearing Chrome's host cache (`chrome://net-internals/#dns`) and your system's DNS cache (`ipconfig /flushdns` on Windows) can prevent stale or corrupted entries from causing issues.
*   **Monitor Router Health:** Ensure your router's firmware is up-to-date and that it's functioning correctly. An aging or faulty router can introduce intermittent network problems, including DNS resolution failures.
*   **Be Mindful of Software Installations:** New VPN clients, proxy software, or network-monitoring tools can sometimes interfere with DNS resolution. If you notice the error after installing new software, consider temporarily disabling or uninstalling it for testing.