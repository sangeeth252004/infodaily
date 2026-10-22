---
title: "How to Resolve 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-10-22T03:25:08.042Z"
slug: "how-to-resolve-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "A comprehensive guide to fixing the 'DNS_PROBE_FINISHED_NXDOMAIN' error in Chrome, covering step-by-step solutions from basic checks to advanced network configuration."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, DNS error, NXDOMAIN fix, internet connection problem, Chrome troubleshooting, DNS resolver, network configuration"
---

### Problem Explanation

The "DNS_PROBE_FINISHED_NXDOMAIN" error is a common message encountered by users attempting to browse the internet using Google Chrome. When this error appears, it signifies that the browser was unable to connect to the requested website because the Domain Name System (DNS) lookup failed. Instead of loading the webpage, Chrome displays a white error screen with the message "This site can't be reached" followed by the specific error code "DNS_PROBE_FINISHED_NXDOMAIN" and often "Check if there is a typo in [website address]".

This error effectively prevents you from accessing a specific website, or in some cases, multiple websites. It's a clear indication that while your device might be connected to a network, it's having trouble translating human-readable domain names (like `example.com`) into machine-readable IP addresses (like `192.0.2.1`). Without this translation, your browser cannot locate the server hosting the website, resulting in the connection failure.

### Why It Happens

The core of the "DNS_PROBE_FINISHED_NXDOMAIN" error lies in the Domain Name System (DNS) resolution process. DNS acts like the internet's phonebook, translating domain names into IP addresses. When you type a website address into your browser, your computer sends a request to a DNS server to find the corresponding IP address. If the DNS server cannot find an entry for that domain name, or if there's an issue reaching the DNS server itself, the "NXDOMAIN" (Non-Existent Domain) response is returned.

This problem can stem from several root causes:

*   **Incorrect Domain Name:** The most straightforward cause is a typo in the website address. If the domain name doesn't exist, the DNS server will correctly report "NXDOMAIN".
*   **DNS Server Issues:** The DNS server configured on your computer or router might be down, overloaded, misconfigured, or simply unable to resolve the domain. This could be your ISP's DNS server or a public one.
*   **Local DNS Cache Corruption:** Your operating system and browser maintain local caches of DNS lookups to speed up future requests. If this cache becomes corrupted or contains outdated information, it can lead to incorrect resolutions.
*   **Network Configuration Problems:** Issues with your local network settings, such as IP address conflicts, incorrect subnet masks, or gateway problems, can prevent proper DNS communication.
*   **Firewall or Antivirus Interference:** Security software can sometimes incorrectly block DNS requests or interfere with network connections, leading to resolution failures.
*   **Router/Modem Glitches:** Temporary errors in your network hardware can disrupt DNS forwarding or overall internet connectivity.
*   **Hosts File Modification:** The `hosts` file on your computer can override DNS lookups. If it contains incorrect or malicious entries, it can redirect valid domain names or block access.

### Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "DNS_PROBE_FINISHED_NXDOMAIN" error.

#### ## Step 1: Check Your Internet Connection and Router

Before diving into complex solutions, ensure your basic internet connection is working.

1.  **Verify Other Websites:** Try accessing other popular websites (e.g., `google.com`, `youtube.com`) to determine if the issue is isolated to one site or widespread.
2.  **Check Network Cables:** Ensure all Ethernet cables (if applicable) are securely plugged into your computer and router/modem.
3.  **Restart Your Router/Modem:** Power cycle your network hardware.
    *   Unplug your router and modem from the power outlet.
    *   Wait for 30-60 seconds.
    *   Plug the modem back in first and wait until all indicator lights stabilize.
    *   Plug the router back in and wait until its indicator lights stabilize.
    *   Test your connection again.

#### ## Step 2: Clear Chrome's DNS Cache

Chrome maintains its own internal DNS cache, separate from the operating system's. Clearing it can resolve issues caused by stale entries.

1.  Open Google Chrome.
2.  Type `chrome://net-internals/#dns` into the address bar and press Enter.
3.  On the page that appears, locate the "Host resolver cache" section.
4.  Click the "Clear host cache" button.
5.  Close and reopen Chrome, then try accessing the website again.

#### ## Step 3: Flush Local DNS Cache and Reset IP Configuration

Your operating system also caches DNS records. Flushing this cache forces your computer to request fresh DNS information. This step also includes renewing your IP address, which can resolve network configuration issues.

1.  Open Command Prompt as an administrator:
    *   **Windows 10/11:** Right-click the Start button, select "Run", type `cmd`, then press `Ctrl+Shift+Enter` (or search for "Command Prompt", right-click and select "Run as administrator").
    *   **macOS:** Open Terminal from `Applications/Utilities`.
2.  Execute the following commands one by one, pressing Enter after each:
    *   **For Windows:**
        *   `ipconfig /flushdns` (Flushes the DNS resolver cache)
        *   `ipconfig /release` (Releases the current IP address)
        *   `ipconfig /renew` (Renews the IP address from your router/DHCP server)
        *   `netsh winsock reset` (Resets the Winsock Catalog, which helps with network connectivity issues)
        *   `netsh int ip reset` (Resets the TCP/IP stack)
    *   **For macOS:**
        *   `sudo dscacheutil -flushcache` (Flushes the DNS cache)
        *   `sudo killall -HUP mDNSResponder` (Another command to flush DNS cache in newer macOS versions)
3.  Restart your computer after running these commands.
4.  Test your connection in Chrome.

#### ## Step 4: Change Your DNS Server Settings

If your ISP's DNS servers are experiencing issues, switching to a reliable public DNS service can often resolve the problem. Google Public DNS and Cloudflare DNS are popular, fast, and secure options.

1.  **For Windows:**
    *   Right-click the Start button, select "Network Connections" or "Network & Internet settings".
    *   Click "Change adapter options" (under "Advanced network settings").
    *   Right-click on your active network adapter (e.g., "Ethernet" or "Wi-Fi"), then select "Properties".
    *   In the Properties window, select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties".
    *   Select "Use the following DNS server addresses".
    *   Enter the preferred DNS servers:
        *   **Google Public DNS:**
            *   Preferred DNS server: `8.8.8.8`
            *   Alternate DNS server: `8.8.4.4`
        *   **Cloudflare DNS:**
            *   Preferred DNS server: `1.1.1.1`
            *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" twice to save changes.
2.  **For macOS:**
    *   Go to `Apple menu > System Settings > Network`.
    *   Select your active network connection (e.g., Wi-Fi, Ethernet) from the sidebar.
    *   Click "Details..." (for Wi-Fi) or "Advanced..." (for Ethernet).
    *   Go to the "DNS" tab.
    *   Click the "+" button under "DNS Servers" to add new servers.
    *   Add your chosen public DNS server addresses (e.g., `8.8.8.8`, `8.8.4.4`).
    *   Remove any existing, problematic DNS entries.
    *   Click "OK" or "Apply".
3.  Restart your browser and test.

#### ## Step 5: Disable Firewall/Antivirus Temporarily

Security software can sometimes mistakenly block network traffic or DNS requests. Temporarily disabling them can help identify if they are the cause.

1.  Locate your firewall or antivirus software icon in the system tray (Windows) or menu bar (macOS).
2.  Right-click the icon and look for an option to "Disable" or "Exit" the program.
3.  Alternatively, access the software's settings through the Control Panel (Windows) or Applications folder (macOS) and look for a temporary disable option.
4.  **Important:** Only disable them for a brief period to test. Re-enable them immediately after testing to maintain your system's security.
5.  If disabling the software resolves the error, you'll need to configure an exception for Chrome or adjust its settings to allow DNS traffic. Consult your security software's documentation for specific instructions.

#### ## Step 6: Reset TCP/IP Stack (Advanced)

If earlier network resets didn't work, a full TCP/IP stack reset can resolve deeper connectivity issues. This is a more comprehensive version of the `netsh` commands from Step 3.

1.  Open Command Prompt as an administrator (refer to Step 3).
2.  Execute the following commands one by one, pressing Enter after each:
    *   `netsh winsock reset`
    *   `netsh int ip reset`
    *   `ipconfig /release`
    *   `ipconfig /renew`
    *   `ipconfig /flushdns`
3.  Restart your computer after running all these commands.
4.  Test your connection in Chrome.

#### ## Step 7: Check Your Hosts File

The `hosts` file is a local file that maps domain names to IP addresses. It overrides DNS lookups. Malicious software or incorrect manual entries can cause "NXDOMAIN" errors.

1.  **For Windows:**
    *   Open Notepad as an administrator: Search for "Notepad", right-click and select "Run as administrator".
    *   In Notepad, go to `File > Open`.
    *   Navigate to `C:\Windows\System32\drivers\etc`.
    *   In the "File name:" field, type `*.*` and press Enter to show all files, then select `hosts`.
    *   Examine the contents. Legitimate entries typically start with `127.0.0.1 localhost` and `::1 localhost`. Any other entries that block legitimate websites or redirect them to `127.0.0.1` (localhost) could be causing the issue.
    *   If you find suspicious entries for the website you're trying to reach, delete those specific lines.
    *   Save the file (`Ctrl+S`).
2.  **For macOS:**
    *   Open Terminal from `Applications/Utilities`.
    *   Type `sudo nano /etc/hosts` and press Enter.
    *   Enter your administrator password when prompted.
    *   Review the file for suspicious entries that might block or redirect the domain you're trying to reach.
    *   To delete a line, use arrow keys to navigate, then `Ctrl+K` to cut the line.
    *   To save, press `Ctrl+O`, then Enter, then `Ctrl+X` to exit.
3.  Restart your computer and test.

### Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NXDOMAIN" error, users frequently make a few common mistakes:

*   **Overlooking Basic Connectivity:** Many users immediately jump to complex DNS fixes without first confirming that their internet connection is fundamentally working or by simply restarting their router and modem. A simple network hiccup or hardware glitch is often the root cause.
*   **Confusing Caches:** There's a distinction between Chrome's internal DNS cache, the operating system's DNS cache, and the DNS cache on your router. Failing to clear all relevant caches (as outlined in steps 2 and 3) might leave stale information behind, preventing a full resolution.
*   **Incorrect DNS Server Entry:** When manually configuring DNS servers, typos can render your internet connection unusable or redirect it improperly. Always double-check the IP addresses for public DNS servers (e.g., `8.8.8.8`, `1.1.1.1`) before applying changes.
*   **Forgetting to Re-enable Security Software:** Temporarily disabling firewalls or antivirus software for testing is a valid troubleshooting step, but forgetting to re-enable them afterward leaves your system vulnerable. Always turn your security software back on once testing is complete.

### Prevention Tips

Implementing a few best practices can help reduce the likelihood of encountering the "DNS_PROBE_FINISHED_NXDOMAIN" error in the future:

*   **Use Reliable DNS Servers:** Instead of relying solely on your ISP's default DNS servers, consider configuring your network adapters to use public DNS services like Google Public DNS (`8.8.8.8`, `8.8.4.4`) or Cloudflare DNS (`1.1.1.1`, `1.0.0.1`). These are generally more robust and faster.
*   **Keep Network Drivers Updated:** Outdated network adapter drivers can sometimes lead to connectivity issues, including DNS resolution problems. Regularly check for and install updates for your Ethernet and Wi-Fi drivers.
*   **Regular Router/Modem Reboots:** Periodically restarting your router and modem (e.g., once a month) can clear out temporary glitches and refresh their network configuration, improving stability.
*   **Be Cautious with Browser Extensions:** Some Chrome extensions, especially those related to VPNs, proxies, or ad-blocking, can interfere with DNS resolution. If the error frequently occurs after installing a new extension, consider disabling or removing it.
*   **Maintain Good Security Practices:** Keep your operating system and security software updated. Regularly scan for malware, as malicious software can alter your DNS settings or `hosts` file to redirect traffic or block access to legitimate sites.