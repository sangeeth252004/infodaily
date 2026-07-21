---
title: "How to Fix the 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-07-21T21:07:25.557Z"
slug: "how-to-fix-the-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "Resolve the common 'DNS_PROBE_FINISHED_NXDOMAIN' error in Google Chrome with this comprehensive, step-by-step guide. Learn why it happens and how to fix it."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, fix DNS error, internet connection problem, website not loading, DNS cache, flush DNS, change DNS server, network adapter, troubleshoot Chrome"
---

When you attempt to visit a website in Google Chrome, you might be met with an inconvenient error message: `DNS_PROBE_FINISHED_NXDOMAIN`. This error indicates that your browser couldn't find the IP address associated with the domain name you're trying to reach. Instead of displaying the webpage, Chrome shows a blank page with the error text, often accompanied by the message "This site can’t be reached" or "DNS_PROBE_FINISHED_NXDOMAIN". This effectively prevents you from accessing the internet content you're looking for, regardless of whether it's a news site, an online service, or a personal blog.

The `DNS_PROBE_FINISHED_NXDOMAIN` error essentially means that the Domain Name System (DNS) server your computer is querying could not resolve the hostname to an IP address. DNS acts like a phonebook for the internet, translating human-readable domain names (like `www.example.com`) into numerical IP addresses (like `192.168.1.1`) that computers use to communicate. When this translation fails, your browser doesn't know where to find the website's server, leading to this error. The "NXDOMAIN" part specifically signifies "Non-Existent Domain," meaning the DNS server reported that the domain doesn't exist or isn't properly configured.

## Why It Happens

The `DNS_PROBE_FINISHED_NXDOMAIN` error can arise from a variety of issues, often related to your computer's network configuration, your router, or even the DNS servers themselves. Common culprits include a corrupted DNS cache on your computer, incorrect DNS server settings, issues with your router's DNS resolution, or problems with the website's domain registration or server configuration. Sometimes, incorrect entries in your computer's hosts file can also cause this. Essentially, something is preventing your system from successfully translating the website's name into a usable IP address.

In simpler terms, imagine trying to call a friend, but your phone's contact list has an incorrect number for them, or the phone company's directory assistance can't find their listing. The call won't go through. Similarly, if your computer's DNS information is out of date or incorrect, or if the DNS servers it's trying to use are experiencing problems, it can't find the correct "address" for the website. This can happen due to temporary glitches, software updates, or even malware.

## Step-by-Step Solution

Here are the most effective ways to resolve the `DNS_PROBE_FINISHED_NXDOMAIN` error in Chrome. Try these steps in order, and test if the problem is resolved after each one.

## Step 1: Flush Your DNS Cache

Over time, your computer stores DNS records to speed up subsequent visits to websites. However, these cached records can become outdated or corrupted, leading to resolution errors. Flushing the DNS cache forces your computer to retrieve fresh DNS information.

*   **On Windows:**
    1.  Open the Command Prompt as an administrator. To do this, search for "cmd" in the Windows search bar, right-click on "Command Prompt," and select "Run as administrator."
    2.  In the Command Prompt window, type the following command and press Enter:
        ```bash
        ipconfig /flushdns
        ```
    3.  You should see a message confirming that the DNS Resolver Cache has been successfully flushed.

*   **On macOS:**
    1.  Open the Terminal application. You can find it in `Applications > Utilities > Terminal` or by searching for "Terminal" using Spotlight (Cmd + Space).
    2.  Type the following command, depending on your macOS version, and press Enter:
        *   macOS Ventura and later:
            ```bash
            sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
            ```
        *   macOS Monterey and earlier (most versions):
            ```bash
            sudo killall -HUP mDNSResponder
            ```
    3.  You may be prompted to enter your administrator password. Type it in (you won't see characters appear as you type) and press Enter.

*   **On Linux:**
    1.  The command to flush DNS depends on the DNS caching service you are using (e.g., `systemd-resolved`, `dnsmasq`, `nscd`). A common command for `systemd-resolved` is:
        ```bash
        sudo systemd-resolve --flush-caches
        ```
    2.  For other services, you might need to restart the respective service.

After flushing the DNS cache, restart Chrome and try accessing the website again.

## Step 2: Reset Your TCP/IP Stack

Sometimes, the TCP/IP configuration on your computer can become corrupted. Resetting it can resolve network connectivity issues.

1.  Open the Command Prompt as an administrator on Windows (follow the same steps as in Step 1).
2.  Enter the following commands one by one, pressing Enter after each:
    ```bash
    netsh winsock reset
    netsh int ip reset
    ipconfig /release
    ipconfig /renew
    ```
3.  After executing these commands, restart your computer.

## Step 3: Change Your DNS Servers

Your Internet Service Provider (ISP) assigns default DNS servers to your network. These servers can sometimes be slow or experience issues. Switching to public DNS servers like Google DNS or Cloudflare DNS can often improve speed and reliability.

*   **On Windows:**
    1.  Search for "Network Status" in the Windows search bar and open it.
    2.  Click on "Change adapter options."
    3.  Right-click on your active network adapter (usually Wi-Fi or Ethernet) and select "Properties."
    4.  In the properties window, find and double-click on "Internet Protocol Version 4 (TCP/IPv4)."
    5.  Select the option "Use the following DNS server addresses."
    6.  Enter the preferred DNS server addresses:
        *   **Google DNS:**
            *   Preferred DNS server: `8.8.8.8`
            *   Alternate DNS server: `8.8.4.4`
        *   **Cloudflare DNS:**
            *   Preferred DNS server: `1.1.1.1`
            *   Alternate DNS server: `1.0.0.1`
    7.  Click "OK" on both windows to save the changes.
    8.  You may need to restart your computer or at least your network adapter.

*   **On macOS:**
    1.  Go to `System Preferences > Network`.
    2.  Select your active network connection (Wi-Fi or Ethernet) from the left sidebar.
    3.  Click the "Advanced" button.
    4.  Navigate to the "DNS" tab.
    5.  Click the "+" button under the DNS server list to add new servers.
    6.  Enter the IP addresses for Google DNS (`8.8.8.8`, `8.8.4.4`) or Cloudflare DNS (`1.1.1.1`, `1.0.0.1`).
    7.  Click "OK," then "Apply."

*   **On Linux:**
    1.  The process varies by distribution and desktop environment. Typically, you'll find network settings in your system settings. Look for DNS configuration and enter the desired public DNS IP addresses.

After changing your DNS servers, restart Chrome and try visiting the website.

## Step 4: Disable Your VPN or Proxy Server

If you are using a Virtual Private Network (VPN) or a proxy server, these services can sometimes interfere with DNS resolution. Try temporarily disabling them to see if the error resolves. If the website loads after disabling, the issue lies with your VPN or proxy configuration. You may need to reconfigure its settings or contact its support.

## Step 5: Check Your Computer's Hosts File

The hosts file on your computer allows you to manually map hostnames to IP addresses. If there's an incorrect or outdated entry for the website you're trying to access, it can cause the `NXDOMAIN` error.

*   **On Windows:**
    1.  Open Notepad as an administrator. Search for "Notepad," right-click, and select "Run as administrator."
    2.  Go to `File > Open`.
    3.  Navigate to `C:\Windows\System32\drivers\etc\`.
    4.  In the file name field, type `hosts` and press Enter. Ensure "All Files" is selected in the dropdown if you don't see it.
    5.  Look for any lines that contain the domain name of the website you're trying to visit. If you find any, and they look suspicious or you didn't add them, you can comment them out by placing a '#' symbol at the beginning of the line, or delete the line entirely if you are sure it's incorrect.
    6.  Save the file (`File > Save`).

*   **On macOS and Linux:**
    1.  Open Terminal.
    2.  Type `sudo nano /etc/hosts` and press Enter.
    3.  Enter your administrator password if prompted.
    4.  Edit the file as described for Windows, looking for entries related to the problematic domain.
    5.  Press `Ctrl + X` to exit, then `Y` to save, and `Enter` to confirm the filename.

After modifying the hosts file, restart Chrome.

## Step 6: Scan for Malware

Malware can sometimes interfere with your network settings, including DNS resolution. Run a full system scan with your antivirus software to detect and remove any potential threats. Ensure your antivirus software is up-to-date.

## Step 7: Restart Your Router and Modem

A simple power cycle of your network hardware can often resolve temporary glitches that might be causing DNS issues.

1.  Unplug the power cords from both your modem and your router.
2.  Wait for at least 30-60 seconds.
3.  Plug the modem back in first and wait for its lights to stabilize (usually 1-2 minutes).
4.  Plug the router back in and wait for its lights to stabilize.
5.  Once your network is back online, restart your computer and try accessing the website again.

## Common Mistakes

A common mistake is immediately assuming the problem is with Chrome itself. While browser-specific issues can occur, `DNS_PROBE_FINISHED_NXDOMAIN` is almost always a network-level problem. Another frequent error is not running Command Prompt or Terminal as an administrator when executing network commands, which can lead to the commands failing without clear error messages. Furthermore, users might forget to restart their browser or computer after making significant network configuration changes, leading them to believe the fix didn't work when it simply hadn't been fully applied. Lastly, blindly copying and pasting commands without understanding what they do can sometimes lead to unintended consequences if the command isn't appropriate for the specific operating system or network setup.

## Prevention Tips

To minimize the chances of encountering the `DNS_PROBE_FINISHED_NXDOMAIN` error in the future, it's wise to maintain good network hygiene. Regularly update your operating system and browser, as these updates often include network stability improvements. If you frequently experience DNS issues, consider sticking with reliable public DNS servers like Google DNS or Cloudflare DNS, which are generally more robust than ISP-provided ones. Periodically run malware scans to ensure your system is free of malicious software that could disrupt your network. Finally, if you make manual changes to your hosts file, keep it tidy and remove entries you no longer need.