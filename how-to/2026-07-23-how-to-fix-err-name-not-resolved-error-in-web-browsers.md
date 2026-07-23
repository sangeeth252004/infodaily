---
title: "How to Fix 'ERR_NAME_NOT_RESOLVED' Error in Web Browsers"
date: "2026-07-23T16:25:17.914Z"
slug: "how-to-fix-err-name-not-resolved-error-in-web-browsers"
type: "how-to"
description: "Resolve the 'ERR_NAME_NOT_RESOLVED' error quickly. Learn the causes and follow expert step-by-step solutions to fix DNS resolution issues in Chrome, Firefox, Edge, and other web browsers."
keywords: "ERR_NAME_NOT_RESOLVED, DNS error, name not resolved, browser error, fix DNS, Chrome error, Firefox error, Edge error, internet error, cannot reach site, DNS flush, change DNS, network troubleshooting"
---

### Problem Explanation

The "ERR_NAME_NOT_RESOLVED" error is a common internet browsing issue indicating that your web browser cannot translate a website's domain name (e.g., `www.example.com`) into its corresponding Internet Protocol (IP) address (e.g., `192.0.2.1`). This translation is crucial for your computer to locate and connect to the web server hosting the desired website.

When this error occurs, users typically encounter a message in their browser window stating "This site can't be reached" or "There is no internet connection," even if other websites load successfully or the device is clearly connected to the internet. The specific domain name that failed to resolve is often highlighted in the error message. This means the browser has received a request to access a specific website but cannot find its "address" on the internet, preventing any further connection attempts and displaying a blank or error-filled page.

### Why It Happens

The fundamental cause of an "ERR_NAME_NOT_RESOLVED" error is a failure within the Domain Name System (DNS) resolution process. DNS functions as the internet's phonebook, translating human-friendly domain names into numerical IP addresses that computers use to identify each other on a network. When you enter a URL, your operating system and browser initiate a DNS query to find the correct IP address.

This resolution process can fail for several reasons:
*   **Local DNS Cache Corruption:** Your operating system or browser maintains a local cache of previously resolved DNS queries. If this cache becomes corrupted or outdated, it can return incorrect or non-existent IP addresses.
*   **Incorrect DNS Server Settings:** Your device might be configured to use DNS servers that are unresponsive, overloaded, or incorrectly configured. This could be your Internet Service Provider's (ISP) default DNS servers or manually configured ones.
*   **Router/Modem Issues:** Your network hardware (router, modem) may have an internal DNS cache that is corrupted or be experiencing temporary connectivity problems preventing proper DNS forwarding.
*   **Firewall or Antivirus Interference:** Security software can sometimes incorrectly block DNS queries or network traffic, preventing the resolution process.
*   **VPN or Proxy Service Conflicts:** Virtual Private Networks (VPNs) and proxy servers reroute internet traffic, including DNS queries, and can sometimes introduce resolution issues if misconfigured or experiencing problems.
*   **`hosts` File Misconfiguration:** The local `hosts` file on your computer can manually map domain names to IP addresses, overriding DNS. Incorrect entries here can redirect traffic or prevent resolution for specific domains.
*   **Website-Specific DNS Problems:** Less commonly, the issue might stem from problems with the website's own DNS records or its authoritative DNS servers, making the site unreachable globally.

### Step-by-Step Solution

Follow these steps in order to diagnose and resolve the "ERR_NAME_NOT_RESOLVED" error.

#### ## Step 1: Verify Basic Internet Connectivity and Test Different Resources

Before proceeding to more complex solutions, ensure your internet connection is functional and test the scope of the problem.

1.  **Check Physical Connection:** If using an Ethernet cable, ensure it's securely plugged into both your computer and router/modem. For Wi-Fi, confirm you are connected to the correct network and have a strong signal.
2.  **Test Other Websites:** Open your web browser and try accessing a popular, reliable website like `www.google.com`, `www.bing.com`, or `www.wikipedia.org`. If these sites load successfully, the problem is specific to the original website or your DNS configuration. If *no* websites load, the issue is likely a broader internet connection problem.
3.  **Test on Another Device:** Try accessing the problematic website from another device (smartphone, tablet, another computer) connected to the *same network*. If it loads on other devices, the issue is specific to your computer. If it fails on all devices, the problem likely lies with your router, modem, or ISP.
4.  **Try a Different Browser:** Attempt to open the problematic website in an alternative browser (e.g., if you use Chrome, try Firefox or Edge). If it works in another browser, the issue might be specific to your primary browser's settings or extensions.

#### ## Step 2: Flush DNS Resolver Cache and Renew IP Address

Your operating system caches DNS resolutions locally to speed up subsequent requests. A corrupted or outdated local cache can lead to resolution failures.

1.  **For Windows:**
    *   Open **Command Prompt** as an administrator. Search for "cmd" in the Start menu, right-click, and select "Run as administrator."
    *   Execute the following commands in order, pressing Enter after each:
        ```cmd
        ipconfig /flushdns
        ipconfig /release
        ipconfig /renew
        netsh int ip reset
        netsh winsock reset
        ```
    *   These commands clear the DNS cache, release your current IP address, request a new one, and reset the IP and Winsock catalog, which can resolve underlying network issues.
2.  **For macOS:**
    *   Open **Terminal** (Applications > Utilities > Terminal).
    *   Execute the following command, pressing Enter. You will be prompted for your administrator password:
        ```bash
        sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
        ```
    *   This command flushes the DNS cache and restarts the mDNSResponder service responsible for DNS resolution.
3.  **For Linux:**
    *   The method to flush DNS cache varies by distribution and configured DNS service (e.g., systemd-resolved, dnsmasq).
    *   For `systemd-resolved` (common in Ubuntu 18.04+, Fedora):
        ```bash
        sudo systemctl restart systemd-resolved
        ```
        or
        ```bash
        sudo resolvectl flush caches
        ```
    *   For `dnsmasq`:
        ```bash
        sudo /etc/init.d/dnsmasq restart
        ```
    *   After flushing, **restart your web browser** and test the website again.

#### ## Step 3: Change Your DNS Server Settings

If your ISP's default DNS servers are unreliable or experiencing issues, switching to public DNS servers can often resolve the problem. Popular choices include Google Public DNS and Cloudflare DNS.

1.  **For Windows:**
    *   Right-click the **Start** button, then click **Network Connections**.
    *   In the "Status" tab, click **Change adapter options**.
    *   Right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet") and select **Properties**.
    *   Select **Internet Protocol Version 4 (TCP/IPv4)** and click **Properties**.
    *   Select "Use the following DNS server addresses."
    *   Enter the preferred DNS server addresses. For **Google Public DNS**:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   For **Cloudflare DNS**:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   Click **OK**, then **Close**. Restart your browser.
2.  **For macOS:**
    *   Go to **Apple menu** > **System Settings** (or System Preferences for older versions).
    *   Click **Network**.
    *   Select your active network connection (e.g., Wi-Fi, Ethernet) and click **Details...** (or Advanced...).
    *   Go to the **DNS** tab.
    *   Click the **+** button to add new DNS servers. Remove any existing entries if necessary.
    *   Enter the desired public DNS server addresses (e.g., `8.8.8.8` and `8.8.4.4` for Google, or `1.1.1.1` and `1.0.0.1` for Cloudflare).
    *   Click **OK**, then **Apply**. Restart your browser.
3.  **For Linux:**
    *   DNS settings are often managed via NetworkManager, `systemd-resolved`, or directly in `/etc/resolv.conf`. The most common way on desktop environments is through the **Network Settings** GUI.
    *   Navigate to your **Network Settings**.
    *   Select your active connection (Wi-Fi or Wired).
    *   Go to the **IPv4** tab (or similar).
    *   Change the "DNS" method from "Automatic (DHCP)" to "Automatic (DHCP) addresses only" or "Manual."
    *   Enter the public DNS server addresses (e.g., `8.8.8.8, 8.8.4.4` or `1.1.1.1, 1.0.0.1`).
    *   Apply changes, then restart your browser or your network interface.

#### ## Step 4: Clear Browser Cache and Check `hosts` File

Browser-specific issues or local overrides can cause resolution problems.

1.  **Clear Browser Cache and Cookies:**
    *   Open your browser's settings or preferences.
    *   Look for "Privacy and security," "History," or "Clear browsing data."
    *   Select to clear "Cached images and files" and "Cookies and other site data." Choose "All time" for the time range.
    *   Perform this action and restart your browser.
2.  **Check `hosts` File:** The `hosts` file can manually map domain names to IP addresses, overriding DNS. Incorrect entries can cause an "ERR_NAME_NOT_RESOLVED" error if they point a legitimate domain to an incorrect or non-existent IP.
    *   **For Windows:** Navigate to `C:\Windows\System32\drivers\etc` and open the `hosts` file with Notepad (run Notepad as administrator to save changes).
    *   **For macOS/Linux:** Open `Terminal` and type `sudo nano /etc/hosts`. Enter your password.
    *   Review the file for any suspicious or incorrect entries related to the website you are trying to reach. Lines starting with `#` are comments and can be ignored. Delete any problematic lines, save the file, and then restart your browser and flush DNS again (Step 2).

#### ## Step 5: Temporarily Disable VPN, Proxy, and Firewall/Antivirus

Third-party network software can interfere with DNS resolution.

1.  **Disable VPN/Proxy:** If you are using a VPN client or have proxy settings configured in your browser or operating system, temporarily disable them. Test the website. If it works, the VPN or proxy service is the culprit. Re-enable and investigate its settings or contact its support.
    *   **Browser Proxy Settings:** Check `Settings` > `System` (Chrome/Edge) or `Preferences` > `Network Settings` (Firefox).
    *   **OS Proxy Settings:** Windows: `Settings` > `Network & Internet` > `Proxy`. macOS: `System Settings` > `Network` > `Details...` > `Proxies`.
2.  **Disable Firewall/Antivirus:** Temporarily disable your third-party firewall or antivirus software. If the website loads after disabling, configure your security software to allow DNS queries or specific browser traffic. Remember to re-enable your security software immediately after testing.

#### ## Step 6: Restart Router/Modem and Perform a Full System Reboot

A simple power cycle of your network equipment can resolve many transient network issues, and a full system reboot can clear any lingering OS-level problems.

1.  **Power Cycle Router/Modem:**
    *   Unplug your internet modem and Wi-Fi router from their power outlets.
    *   Wait for at least 30 seconds.
    *   Plug the modem back in and wait until its indicator lights are stable.
    *   Plug the router back in and wait until its indicator lights are stable.
2.  **Full System Reboot:** Perform a complete shutdown and restart of your computer. This clears the operating system's memory and restarts all services, including network components.

### Common Mistakes

When troubleshooting the "ERR_NAME_NOT_RESOLVED" error, users often make several common mistakes that prolong the resolution process:

*   **Skipping Basic Connectivity Checks:** Many users immediately jump to flushing DNS or changing server settings without first verifying if their internet connection is active, or if the problem is localized to a single website, browser, or device. This can lead to unnecessary complexity when a simple router reboot might have been the solution.
*   **Not Fully Restarting Components:** After making changes, particularly to DNS settings or flushing the cache, users often fail to fully restart their browser, or even the operating system, for the changes to take full effect. Simply closing a browser tab or navigating away is insufficient; a complete browser application restart is frequently required.
*   **Incorrectly Entering DNS Server Addresses:** When manually configuring DNS servers, entering incorrect IP addresses (e.g., typos) or mixing IPv4 and IPv6 addresses improperly will prevent resolution entirely. Always double-check the server addresses.
*   **Overlooking VPN/Proxy Settings:** Forgetting that an active VPN or proxy service can override local DNS settings and potentially be the source of the issue. These services should always be considered when diagnosing network connectivity problems.

### Prevention Tips

Implementing these best practices can help reduce the likelihood of encountering the "ERR_NAME_NOT_RESOLVED" error in the future:

*   **Utilize Reliable Public DNS Servers:** Configure your devices or router to use well-regarded public DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1). These often offer better performance, reliability, and security compared to default ISP servers, which can sometimes be slow or prone to localized issues.
*   **Keep Network Hardware Firmware Updated:** Regularly check for and install firmware updates for your router and modem. Firmware updates often include bug fixes, security patches, and performance improvements that can enhance network stability and DNS handling.
*   **Maintain Operating System and Browser Updates:** Ensure your operating system and web browsers are always updated to their latest versions. Updates often contain critical fixes for network stacks, browser engines, and security components that contribute to stable internet connectivity and DNS resolution.
*   **Be Mindful of Third-Party Network Software:** Exercise caution when installing VPN clients, proxy tools, or advanced security software. Ensure they are from reputable sources and properly configured to avoid unintended interference with your network's DNS resolution process. Periodically review and disable any such software if you suspect it's causing issues.
*   **Regularly Clear Browser Cache (Periodically):** While not a daily task, clearing your browser's cache and cookies periodically can prevent outdated or corrupted website data from causing loading issues, which might sometimes manifest as DNS-related errors.