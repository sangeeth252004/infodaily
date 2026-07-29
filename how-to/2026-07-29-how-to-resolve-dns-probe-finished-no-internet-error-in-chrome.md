---
title: "How to Resolve 'DNS_PROBE_FINISHED_NO_INTERNET' Error in Chrome"
date: "2026-07-29T07:41:54.467Z"
slug: "how-to-resolve-dns-probe-finished-no-internet-error-in-chrome"
type: "how-to"
description: "Learn to fix the 'DNS_PROBE_FINISHED_NO_INTERNET' error in Google Chrome with expert step-by-step solutions, including flushing DNS, changing DNS servers, and network resets."
keywords: "DNS_PROBE_FINISHED_NO_INTERNET, Chrome error, DNS error fix, no internet connection, flush DNS, change DNS server, network reset, Chrome troubleshooting"
---

The "DNS_PROBE_FINISHED_NO_INTERNET" error is a common and frustrating message encountered by Google Chrome users when attempting to access websites. Instead of the intended webpage, users are presented with a blank page displaying the error text, often accompanied by the familiar T-Rex dinosaur game indicating a lost connection. This error specifically points to a failure in resolving a website's domain name into an IP address, or a broader issue preventing Chrome from connecting to the internet altogether.

This problem manifests as a complete inability to load web pages in Chrome, even when other applications or browsers on the same device might seem to have internet access, or when other devices on the same network are functioning normally. It signifies that Chrome cannot establish the initial connection required to fetch web content, often trapping users in a state of digital limbo despite their computer appearing to be connected to a network.

### Why It Happens

The "DNS_PROBE_FINISHED_NO_INTERNET" error fundamentally indicates a problem with how your computer resolves domain names or connects to the internet. DNS (Domain Name System) acts like a phonebook for the internet, translating human-readable website names (like `google.com`) into machine-readable IP addresses (like `172.217.160.142`). When your DNS client or server fails to perform this lookup correctly, or if there's an underlying network connectivity issue, Chrome cannot find the website's location, leading to the "DNS_PROBE_FINISHED" part of the error. The "NO_INTERNET" suffix often implies that the DNS lookup failed because Chrome couldn't even reach the internet to *attempt* the lookup.

Root causes for this error can vary widely. They include temporary glitches with your router or modem, corrupted DNS cache on your computer, incorrect or overloaded DNS server settings, interference from VPNs or proxy servers, issues with your network adapter, firewall or antivirus software blocking connections, or even certain types of malware. Essentially, anything that disrupts the flow of internet traffic or the crucial domain name resolution process can trigger this specific Chrome error.

### Step-by-Step Solution

## Step 1: Check Your Basic Internet Connection and Hardware

Before diving into complex solutions, confirm that your internet connection is generally functional.

*   **Verify other devices:** Check if other computers, smartphones, or tablets connected to the same Wi-Fi network can access the internet. If they can, the problem is likely localized to your computer. If not, the issue might be with your router or ISP.
*   **Check network cables:** If using an Ethernet connection, ensure the cable is securely plugged into both your computer and the router/modem.
*   **Router/Modem lights:** Examine the indicator lights on your modem and router. Typically, there should be lights indicating power, internet connectivity, and network activity. Consult your device's manual to understand what each light signifies for a healthy connection.

## Step 2: Restart Your Router/Modem and Computer

A simple reboot can often resolve temporary network glitches by clearing caches and resetting connections.

1.  **Power down your computer:** Shut down your computer completely.
2.  **Unplug your router/modem:** Locate your internet router and modem (they might be a single device). Unplug their power cables from the electrical outlet.
3.  **Wait for 30 seconds:** Allow both devices to remain unpowered for at least 30 seconds. This ensures a full power cycle and cache clear.
4.  **Plug in modem first:** Plug your modem back in and wait for all its indicator lights to stabilize (this can take a few minutes).
5.  **Plug in router:** Once the modem is stable, plug your router back in and wait for its lights to stabilize.
6.  **Restart computer:** Turn on your computer and try accessing a website in Chrome.

## Step 3: Flush DNS Cache and Renew IP Address

Your computer stores a local cache of DNS resolutions to speed up future lookups. If this cache becomes corrupted, it can lead to errors.

1.  **Open Command Prompt as Administrator:**
    *   **Windows:** Type `cmd` into the Windows search bar. Right-click on "Command Prompt" and select "Run as administrator."
    *   **macOS:** Open Terminal from `Applications/Utilities/Terminal`. (Note: macOS uses `dscacheutil` for DNS flushing, which is covered in Step 4 if needed for a deeper DNS change).
2.  **Execute DNS flush command:** In the Command Prompt window, type the following command and press Enter:
    ```cmd
    ipconfig /flushdns
    ```
    You should see a message confirming "Successfully flushed the DNS Resolver Cache."
3.  **Renew IP address:** Next, release and renew your IP address by typing these commands sequentially, pressing Enter after each:
    ```cmd
    ipconfig /release
    ipconfig /renew
    ```
4.  **Exit Command Prompt:** Close the Command Prompt window and try Chrome again.

## Step 4: Change Your DNS Server Settings

Using public, reliable DNS servers (like Google Public DNS or Cloudflare DNS) can often bypass issues with your ISP's default DNS servers.

1.  **Open Network Settings:**
    *   **Windows:** Go to `Start > Settings > Network & Internet > Ethernet` (for wired) or `Wi-Fi` (for wireless). Click on "Change adapter options."
    *   **macOS:** Go to `System Settings > Network`. Select your active network connection (Wi-Fi or Ethernet).
2.  **Access Adapter Properties (Windows):** Right-click on your active network adapter (e.g., "Ethernet" or "Wi-Fi") and select "Properties." In the properties window, select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
3.  **Configure DNS (Windows):** Select "Use the following DNS server addresses" and enter:
    *   **Preferred DNS server:** `8.8.8.8`
    *   **Alternate DNS server:** `8.8.4.4`
    (Alternatively, use Cloudflare DNS: `1.1.1.1` and `1.0.0.1`)
    Click "OK" on both windows.
4.  **Configure DNS (macOS):** Click "Details..." for your active connection, then go to the "DNS" tab. Click the `+` button to add new DNS servers. Enter `8.8.8.8` and `8.8.4.4` (or `1.1.1.1` and `1.0.0.1`). Drag these to the top of the list if other servers are present. Click "OK" then "Apply."
5.  **Flush DNS (macOS specific):** After changing DNS on macOS, open Terminal and run:
    ```bash
    sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
    ```
    You may be prompted for your administrator password.
6.  **Test Chrome:** Close and reopen Chrome, then try to access a website.

## Step 5: Disable Proxy Settings

Proxy servers can sometimes interfere with internet connectivity if misconfigured or if the server itself is down.

1.  **Open Chrome Settings:** Open Google Chrome, click the three-dot menu in the top-right corner, and select "Settings."
2.  **Access Proxy Settings:** In the search bar within Chrome settings, type `proxy` and select "Open your computer's proxy settings." This will open your system's network proxy configuration.
3.  **Disable Proxy (Windows):** In the "Proxy" section of Network settings:
    *   Ensure "Automatically detect settings" is turned **on**.
    *   Ensure "Use a proxy server" under "Manual proxy setup" is turned **off**.
4.  **Disable Proxy (macOS):** In System Settings > Network > Details... (for your active connection) > Proxies tab:
    *   Make sure no proxy protocols (like "Web Proxy (HTTP)" or "Secure Web Proxy (HTTPS)") are checked, or if they are, ensure their configuration is correct and necessary. For most home users, these should be unchecked.
5.  **Save changes and test:** Close the settings windows and try accessing a website in Chrome.

## Step 6: Reset Winsock and IP Stack

Winsock (Windows Sockets API) defines how Windows network applications access network services. A corrupted Winsock catalog can cause connectivity issues.

1.  **Open Command Prompt as Administrator:** (Refer to Step 3 for instructions).
2.  **Execute reset commands:** Type the following commands sequentially, pressing Enter after each:
    ```cmd
    netsh winsock reset
    netsh int ip reset
    ```
3.  **Restart your computer:** After executing both commands, restart your computer for the changes to take effect.
4.  **Test Chrome:** Open Chrome and check if the error is resolved.

## Step 7: Check Firewall and Antivirus Software

Your firewall or antivirus program might be mistakenly blocking Chrome or essential network processes.

1.  **Temporarily disable (caution advised):** As a test, temporarily disable your firewall and antivirus software. If disabling them resolves the issue, you'll need to re-enable them and then find specific settings within them to allow Chrome and related network services (like DNS lookups) full access.
    *   **Windows Defender Firewall:** Type `Windows Defender Firewall` into the Windows search, open it, and click "Turn Windows Defender Firewall on or off" to temporarily disable.
    *   **Third-party antivirus/firewall:** Refer to your specific software's documentation for instructions on how to temporarily disable it.
2.  **Re-enable and configure:** If disabling resolves the error, immediately re-enable your security software. Then, go into its settings and add Chrome as an allowed application, ensuring it has permission to access the internet and perform DNS queries. Look for "Application Rules," "Program Control," or "Whitelist" sections.

### Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NO_INTERNET" error, several common mistakes can prolong the resolution process. One frequent error is *skipping the basic reboot steps*. Users often jump straight to complex commands without first giving their router, modem, and computer a simple power cycle, which often resolves temporary glitches. Another mistake is *not trying alternative DNS servers* or incorrectly entering them. Typing a digit wrong or not applying the settings correctly means the change won't take effect. Furthermore, some users *overlook potential interference from VPNs or proxy settings* that might be enabled by default or due to previous usage, which can severely disrupt network traffic. Finally, *incorrectly executing Command Prompt commands* or forgetting to run Command Prompt as an administrator can lead to commands failing without providing useful feedback, making users think the solution doesn't work when it simply wasn't applied correctly.

### Prevention Tips

To minimize the chances of encountering the "DNS_PROBE_FINISHED_NO_INTERNET" error again, adopt a few proactive network hygiene practices. Regularly restarting your router and modem (for example, once a month) can prevent accumulation of temporary glitches and keep your network hardware functioning optimally. Ensure your operating system and web browser (Chrome) are always up-to-date, as updates often include bug fixes and improved network stability. Consider consistently using reliable public DNS servers like Google Public DNS or Cloudflare DNS, as they tend to be more robust and often faster than default ISP DNS servers. Finally, be mindful of browser extensions, VPNs, and proxy settings; only use trusted ones and ensure they are configured correctly or disabled when not needed, as misconfigurations are a common source of network connectivity issues.