---
title: "How to Fix 'DNS_PROBE_FINISHED_NO_INTERNET' Error in Chrome"
date: "2026-07-07T21:22:48.214Z"
slug: "how-to-fix-dns-probe-finished-no-internet-error-in-chrome"
type: "how-to"
description: "A comprehensive guide to troubleshooting and resolving the 'DNS_PROBE_FINISHED_NO_INTERNET' error in Google Chrome, covering network checks, DNS flushing, server changes, and more."
keywords: "DNS_PROBE_FINISHED_NO_INTERNET, Chrome error, DNS error, no internet, fix DNS probe, network troubleshooting, Google Chrome, internet connectivity, DNS flush, change DNS, network adapter"
---

When attempting to browse the internet using Google Chrome, encountering a "DNS_PROBE_FINISHED_NO_INTERNET" error can be a frustrating roadblock. Instead of your desired website, Chrome displays a dedicated error page with a message similar to "This site can't be reached" or "There is no internet connection." The core of the problem is often signaled by the "DNS_PROBE_FINISHED" part, indicating that the browser failed to successfully complete a DNS lookup for the domain you were trying to access.

This error specifically means that your browser was unable to translate the human-readable website address (like `google.com`) into an IP address (like `172.217.160.142`) that computers use to locate each other on the network. While the "NO_INTERNET" suffix might suggest a complete lack of connectivity, the issue typically lies within the Domain Name System (DNS) resolution process rather than a complete absence of an internet connection to your router or ISP. You might find that other applications work, or that simply pinging an IP address (like `ping 8.8.8.8`) succeeds, while browser-based access fails.

### Why It Happens

The Domain Name System (DNS) functions as the internet's phonebook. When you type a website address into your browser, your computer sends a request to a DNS server to find the corresponding IP address. If this lookup process fails or takes too long, Chrome will report the "DNS_PROBE_FINISHED_NO_INTERNET" error.

Several factors can cause this DNS probe failure. Common culprits include a corrupted local DNS cache on your computer, incorrect or unreachable DNS server settings (either on your machine or within your router), network adapter issues, interference from security software like firewalls or antivirus programs, or even temporary problems with your Internet Service Provider's (ISP) DNS servers. Less frequently, VPNs, proxy settings, or outdated network drivers can also disrupt DNS resolution, preventing your browser from successfully connecting to websites.

### Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "DNS_PROBE_FINISHED_NO_INTERNET" error. Test your internet connection after each step.

## Step 1: Perform Basic Network Checks and Restart Devices

Before diving into complex configurations, begin with the fundamental troubleshooting steps. Many network issues are transient and can be resolved by simply resetting network components.

1.  **Check Physical Connections:** Ensure all Ethernet cables are securely plugged into your computer and router. If you're using Wi-Fi, verify that your device is connected to the correct network.
2.  **Confirm Other Devices:** Try accessing the internet on another device connected to the same network (e.g., a smartphone or another computer). If other devices can connect, the issue is likely with your specific computer.
3.  **Restart Your Router and Modem:** Unplug your internet modem and Wi-Fi router from their power outlets. Wait at least 30 seconds, then plug the modem back in. Wait for its indicator lights to stabilize (usually 1-2 minutes) before plugging in your Wi-Fi router. Wait for the router's lights to stabilize, then try connecting again.
4.  **Restart Your Computer:** A simple system restart can clear temporary glitches and reinitialize network services.

## Step 2: Flush DNS Cache and Reset Network Configuration

Your computer stores a local cache of DNS lookups to speed up future requests. A corrupted DNS cache can lead to resolution failures. Resetting network components ensures a fresh start.

1.  **Open Command Prompt as Administrator:**
    *   In Windows, type `cmd` into the Start search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
2.  **Execute the following commands in order, pressing Enter after each:**
    *   `ipconfig /flushdns`
        *   *Purpose:* Clears your computer's DNS resolver cache.
    *   `ipconfig /release`
        *   *Purpose:* Releases your current IP address configuration.
    *   `ipconfig /renew`
        *   *Purpose:* Requests a new IP address configuration from your DHCP server (usually your router).
    *   `netsh int ip reset`
        *   *Purpose:* Resets TCP/IP settings. This effectively rewrites several critical network registry keys.
    *   `netsh winsock reset`
        *   *Purpose:* Resets the Winsock Catalog to its default state. Winsock (Windows Sockets API) manages how network applications access network services. A corrupted Winsock can block internet access.
3.  **Restart your computer** after executing these commands to ensure all changes take effect.

## Step 3: Change DNS Server Address

Your computer typically uses DNS servers provided by your ISP. If these servers are slow or experiencing issues, switching to public DNS servers (like Google Public DNS or Cloudflare DNS) can often resolve the problem.

1.  **Open Network Connections:**
    *   In Windows 10/11, search for "Network Status" or "Network & Internet settings."
    *   Click on "Change adapter options" or "Advanced network settings."
    *   Alternatively, navigate to `Control Panel > Network and Sharing Center > Change adapter settings`.
2.  **Select Your Active Network Adapter:** Right-click on the network adapter you are currently using for internet access (e.g., "Ethernet" for wired, "Wi-Fi" for wireless) and select "Properties."
3.  **Configure IPv4 Properties:**
    *   From the list, select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
4.  **Enter New DNS Server Addresses:**
    *   Select the "Use the following DNS server addresses" option.
    *   Enter the preferred DNS servers:
        *   **Google Public DNS:**
            *   Preferred DNS server: `8.8.8.8`
            *   Alternate DNS server: `8.8.4.4`
        *   **Cloudflare DNS:**
            *   Preferred DNS server: `1.1.1.1`
            *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" on both dialog boxes to save the changes.
5.  **Restart your browser** (and ideally your computer) and test your connection.

## Step 4: Disable Proxy Settings and VPN

Proxy servers or VPNs, if misconfigured or malfunctioning, can interfere with DNS resolution and block internet access.

1.  **Check Chrome Proxy Settings:**
    *   Open Chrome and go to `Settings`.
    *   Scroll down and click "System" on the left panel.
    *   Click "Open your computer's proxy settings." This will open your operating system's proxy configuration.
2.  **Configure System Proxy Settings:**
    *   In Windows, ensure "Automatically detect settings" is enabled and "Use a proxy server" is disabled under the "Manual proxy setup" section. If you use a third-party proxy, temporarily disable it.
3.  **Disable VPN (if applicable):** If you are using a VPN client, temporarily disconnect from it or disable it entirely to see if it's causing the conflict. Re-enable it after confirming the internet connection works without it.

## Step 5: Temporarily Disable Firewall and Antivirus Software

Security software is designed to protect your system, but sometimes it can mistakenly block legitimate network traffic, including DNS requests.

1.  **Temporarily Disable Firewall:**
    *   **Windows Defender Firewall:** Search for "Windows Defender Firewall" in the Start menu. Click "Turn Windows Defender Firewall on or off" and temporarily select "Turn off Windows Defender Firewall" for both private and public networks.
    *   **Third-Party Firewall:** If you use a third-party firewall, consult its documentation to temporarily disable it.
2.  **Temporarily Disable Antivirus Software:** Right-click on your antivirus icon in the system tray and look for an option to "Pause protection" or "Disable for 10 minutes."
3.  **Test Connection:** After disabling, check if the internet works. If it does, your security software is likely the culprit. Re-enable it immediately and investigate its settings to add exceptions for Chrome or network services. If the problem persists with security software disabled, re-enable it before proceeding.

## Step 6: Update Network Adapter Drivers

Outdated or corrupted network adapter drivers can lead to various connectivity issues, including DNS resolution failures.

1.  **Open Device Manager:**
    *   In Windows, right-click the Start button and select "Device Manager."
2.  **Locate Network Adapters:** Expand the "Network adapters" section.
3.  **Update Driver:**
    *   Right-click on your active network adapter (e.g., "Intel(R) Ethernet Connection" or "Realtek RTL8822CE 802.11ac PCIe Adapter").
    *   Select "Update driver."
    *   Choose "Search automatically for drivers." Windows will attempt to find and install the latest driver.
4.  **Manual Update (if automatic fails):** If Windows can't find an update, visit your computer manufacturer's website or the network adapter manufacturer's website. Download the latest driver for your specific model and operating system, then install it manually.
5.  **Restart your computer** after updating drivers.

## Step 7: Reset Google Chrome Settings

Sometimes, accumulated browser data, extensions, or misconfigured Chrome settings can interfere with network requests. Resetting Chrome to its default state can clear these issues.

1.  **Open Chrome Settings:** Open Chrome, click the three-dot menu in the top right corner, and select "Settings."
2.  **Reset Settings:**
    *   Scroll down to the bottom of the left-hand panel and click "Reset settings."
    *   Click "Restore settings to their original defaults."
    *   Confirm the action. This will disable extensions, clear temporary data, and reset startup pages without deleting your bookmarks, history, or saved passwords.
3.  **Restart Chrome** and check if the error is resolved. You may need to re-enable your preferred extensions one by one to identify any problematic ones.

### Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NO_INTERNET" error, users often make a few common mistakes that can prolong the resolution process:

*   **Skipping Basic Restarts:** Overlooking the simple yet highly effective step of restarting the router, modem, and computer. Many transient network glitches are resolved by a power cycle.
*   **Incorrectly Entering DNS Server Addresses:** When manually changing DNS servers, typing the IP addresses incorrectly (e.g., `8.8.88` instead of `8.8.8.8`) will prevent DNS resolution entirely. Double-check your entries.
*   **Forgetting to Re-enable Security Software:** Temporarily disabling firewalls or antivirus for testing is crucial, but forgetting to re-enable them afterward leaves your system vulnerable. Always re-enable them once testing is complete.
*   **Changing Settings for the Wrong Adapter:** If you're connected via Wi-Fi, ensure you're changing the DNS settings for your Wi-Fi adapter, not your Ethernet adapter (or vice-versa). Modifying the inactive adapter's settings will have no effect.
*   **Assuming a Widespread Outage:** Immediately concluding that your ISP or the entire internet is down without performing local troubleshooting first. While possible, local issues are far more common.

### Prevention Tips

To minimize the chances of encountering the "DNS_PROBE_FINISHED_NO_INTERNET" error in the future, consider implementing these best practices:

*   **Maintain Up-to-Date Network Drivers:** Regularly check for and install updates for your network adapter drivers. Manufacturers frequently release updates that improve stability and performance.
*   **Keep Your Operating System Updated:** Ensure your Windows or macOS installation is always current. System updates often include critical network component fixes and improvements.
*   **Utilize Reliable DNS Servers:** Consider using public DNS servers like Google (8.8.8.8, 8.8.4.4) or Cloudflare (1.1.1.1, 1.0.0.1) permanently. They are often faster and more reliable than ISP-provided DNS.
*   **Be Mindful of Browser Extensions:** Install extensions only from trusted sources and remove any that you no longer use or that seem suspicious. Some extensions can interfere with network requests.
*   **Secure Your Network:** Regularly update your router's firmware, use strong Wi-Fi passwords, and secure your network. A compromised network can lead to various connectivity problems.
*   **Periodically Clear Browser Data:** While less directly related to DNS, occasionally clearing Chrome's browser cache, cookies, and other site data can prevent various browser-specific issues that might indirectly impact network interactions.