---
title: "How to Fix 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome (and Other Browsers)"
date: "2026-08-02T07:30:58.732Z"
slug: "how-to-fix-dns-probe-finished-nxdomain-error-in-chrome-and-other-browsers"
type: "how-to"
description: "A comprehensive, step-by-step guide to troubleshoot and fix the 'DNS_PROBE_FINISHED_NXDOMAIN' error, including flushing DNS, changing DNS servers, and more."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, fix DNS error, Chrome DNS error, NXDOMAIN, DNS probe finished, website not reachable, DNS resolution failed, troubleshoot internet connection"
---

The internet is a vast and incredible place, but sometimes, getting to your favorite websites can feel like navigating a maze blindfolded. One of the most common and frustrating roadblocks you might encounter is the "DNS_PROBE_FINISHED_NXDOMAIN" error. When this message pops up, it essentially means your browser is lost and can't find the directions to the website you're trying to visit.

You'll typically see this error displayed prominently in your web browser, often with a message like "This site can't be reached" or "Hmm. We’re having trouble finding that site." Below this, you'll find the specific error code, "DNS_PROBE_FINISHED_NXDOMAIN." It can appear in Google Chrome, Mozilla Firefox, Microsoft Edge, and other browsers, bringing your browsing session to an abrupt halt and leaving you wondering what went wrong.

### Why It Happens

To understand why "DNS_PROBE_FINISHED_NXDOMAIN" occurs, think of the internet like a massive phone book. Every website has an address, known as an IP address (e.g., 192.168.1.1), but we humans remember domain names (like google.com) much more easily. When you type a domain name into your browser, your computer sends a request to a Domain Name System (DNS) server. This server's job is to look up the domain name in its "phone book" and tell your computer the corresponding IP address, so your browser can then connect to the correct web server.

The "NXDOMAIN" part of the error stands for "Non-Existent Domain." This means that when your computer asked its assigned DNS server for the IP address of the website you typed, the DNS server responded, "I can't find that domain." This could be for several reasons: you might have mistyped the website address, the website itself might genuinely be offline or no longer exist, or there could be a problem with your computer's DNS cache, your router, your internet service provider's (ISP) DNS servers, or even interference from your firewall or VPN.

### Step-by-Step Solution

Let's walk through some reliable solutions to get you back online. Try these steps in order, testing after each one, as they progress from the simplest to more involved fixes.

## Step 1: Double-Check the URL and Website Status

First things first, let's rule out the simplest explanations. A typo is incredibly common and easy to overlook.

*   **Check for typos:** Carefully re-examine the URL you entered in your browser's address bar. Even a single misplaced letter, a missing dot, or an incorrect extension (like `.co` instead of `.com`) can lead to an NXDOMAIN error.
*   **Try a different browser:** Open the same URL in another web browser (e.g., if you're using Chrome, try Firefox or Edge). If it works there, the issue might be specific to your primary browser.
*   **Check website status:** If you're certain the URL is correct, the website itself might be down. You can often check this by asking a friend if they can access it, or by using a website down-detector service (search for "is website down" on a search engine, but be cautious about clicking unfamiliar links). If the site is down for everyone, you'll just have to wait for the site owner to fix it.

## Step 2: Clear Your Browser's DNS Cache

While your operating system maintains a DNS cache, browsers like Chrome also keep their own separate cache for quicker loading. Clearing this can resolve issues where your browser has stored outdated or incorrect DNS information.

*   **For Google Chrome:**
    1.  Open a new tab and type `chrome://net-internals/#dns` into the address bar.
    2.  Press Enter.
    3.  You will see an option labeled "Clear host cache." Click this button.
    4.  Restart Chrome completely by closing all windows and reopening it.
*   **For other browsers (Firefox, Edge, etc.):** While these browsers don't have a direct "DNS cache" button like Chrome, clearing their general browser cache and cookies can often resolve similar issues.
    *   Go to your browser's settings or history menu.
    *   Look for an option like "Clear browsing data," "Clear recent history," or "Privacy, search, and services."
    *   Select "Cached images and files" and "Cookies and other site data" (and optionally "Browsing history") and clear them.

## Step 3: Flush Your Operating System's DNS Cache and Renew IP

Your operating system (Windows, macOS, Linux) also stores a local DNS cache to speed up website lookups. If this cache becomes corrupted or contains outdated information, it can lead to NXDOMAIN errors. Flushing it forces your computer to request fresh DNS information. We'll also renew your IP address to ensure your network settings are fresh.

*   **For Windows:**
    1.  Open the Command Prompt as an administrator. To do this, type `cmd` into the Windows search bar, right-click on "Command Prompt," and select "Run as administrator."
    2.  In the Command Prompt window, type the following commands one by one, pressing Enter after each:
        ```cmd
        ipconfig /flushdns
        ipconfig /release
        ipconfig /renew
        netsh int ip reset
        netsh winsock reset
        ```
    3.  Restart your computer after running these commands.

*   **For macOS:**
    1.  Open Terminal. You can find it in Applications > Utilities > Terminal, or by searching for "Terminal" in Spotlight (Cmd + Space).
    2.  Type the following command and press Enter. You may be prompted for your administrator password:
        ```bash
        sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
        ```
    3.  You won't see a confirmation message, but the cache will be cleared.

## Step 4: Change Your DNS Servers

Your internet service provider (ISP) automatically assigns DNS servers to your router and devices. Sometimes, these default DNS servers can be slow, unreliable, or temporarily down, leading to connection issues like NXDOMAIN. Switching to public DNS servers, like Google Public DNS or Cloudflare DNS, can often resolve this.

*   **For Windows:**
    1.  Right-click the Start button and select "Network Connections."
    2.  Click "Change adapter options."
    3.  Right-click on your active network connection (e.g., "Wi-Fi" or "Ethernet") and select "Properties."
    4.  Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    5.  Select "Use the following DNS server addresses."
    6.  Enter the preferred DNS server and Alternate DNS server addresses.
        *   **Google Public DNS:** Preferred: `8.8.8.8`, Alternate: `8.8.4.4`
        *   **Cloudflare DNS:** Preferred: `1.1.1.1`, Alternate: `1.0.0.1`
    7.  Click "OK" on both windows to save the changes.
    8.  Restart your computer.

*   **For macOS:**
    1.  Go to Apple menu > System Settings (or System Preferences on older versions).
    2.  Click "Network."
    3.  Select your active network connection (e.g., "Wi-Fi" or "Ethernet") in the sidebar.
    4.  Click "Details..." (or "Advanced..." on older versions).
    5.  Go to the "DNS" tab.
    6.  Click the "+" button under "DNS Servers" to add new DNS servers.
    7.  Enter your chosen public DNS addresses (e.g., `8.8.8.8` and `8.8.4.4` for Google, or `1.1.1.1` and `1.0.0.1` for Cloudflare).
    8.  Click "OK" or "Apply."

## Step 5: Restart Your Router and Modem

This might seem like a generic troubleshooting step, but it's surprisingly effective for many network-related issues, including DNS errors. Restarting your router and modem clears their caches, resets their network connections, and allows them to re-establish a fresh connection with your ISP.

1.  Locate your router and modem (they might be combined into one device).
2.  Unplug the power cables from both devices.
3.  Wait for about 30 seconds to a full minute. This ensures that any residual power is drained and caches are fully cleared.
4.  Plug the power cable back into your modem first. Wait until its indicator lights stabilize (usually solid green or blue, not blinking rapidly). This can take a few minutes.
5.  Once the modem is stable, plug the power cable back into your router. Wait for its indicator lights to stabilize as well.
6.  Once both devices are fully powered up and stable, try accessing the website again.

## Step 6: Temporarily Disable Firewall, Antivirus, or VPN/Proxy

While crucial for security, sometimes firewalls, antivirus software, or even VPNs/proxies can inadvertently interfere with your DNS lookups or block legitimate network traffic.

*   **Check Firewall/Antivirus:** Temporarily disable your firewall (e.g., Windows Defender Firewall, or a third-party firewall) and antivirus software. *Important: Only do this for a brief test and re-enable them immediately afterward to maintain your system's security.* If the website loads with them off, you'll need to investigate their settings to ensure they are not blocking your browser or DNS requests.
*   **Check VPN/Proxy:** If you're using a Virtual Private Network (VPN) or a proxy server, try disconnecting from it. These services route your internet traffic through different servers, which can sometimes lead to DNS resolution issues or use their own DNS servers that might not be functioning correctly. If the site works without the VPN/proxy, the problem lies with that service.

## Step 7: Check Network Adapter Drivers

Outdated or corrupted network adapter drivers can lead to various connectivity issues, including DNS problems. Ensuring your drivers are up-to-date is a good practice.

*   **For Windows:**
    1.  Right-click the Start button and select "Device Manager."
    2.  Expand "Network adapters."
    3.  Right-click on your Wi-Fi or Ethernet adapter and select "Update driver."
    4.  Choose "Search automatically for updated driver software."
    5.  If Windows finds a newer driver, install it. If not, you might need to visit your computer manufacturer's website or the network adapter manufacturer's website (e.g., Intel, Realtek) to download the latest drivers directly.
    6.  Restart your computer after updating drivers.

### Common Mistakes

When troubleshooting the "DNS_PROBE_FINISHED_NXDOMAIN" error, users often make a few common mistakes that can prolong the frustration:

*   **Not testing after each step:** It's crucial to try accessing the website after completing *each* troubleshooting step. This helps you identify exactly which solution fixed the problem, saving you time and preventing unnecessary changes.
*   **Only checking one browser:** If a site doesn't load in Chrome, quickly checking it in Firefox or Edge can instantly tell you if the problem is browser-specific or a broader network issue.
*   **Forgetting to restart:** Many network changes, especially flushing DNS or changing DNS servers, require a system restart (or at least a browser restart for browser-specific caches) to fully take effect. Don't skip this step.
*   **Ignoring the actual website status:** Before diving into complex troubleshooting, it's worth a quick check to ensure the website you're trying to reach isn't actually offline or experiencing its own server issues.

### Prevention Tips

While errors can pop up unexpectedly, adopting a few best practices can minimize the chances of encountering the "DNS_PROBE_FINISHED_NXDOMAIN" error again:

*   **Use reliable DNS servers:** Consider permanently switching to reputable public DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) as your default. These are generally faster and more reliable than many ISP-provided servers.
*   **Keep your operating system and browsers updated:** Software updates often include fixes for network components and security vulnerabilities that can inadvertently cause or contribute to connectivity issues.
*   **Periodically restart your network equipment:** Make it a habit to power cycle your router and modem once every few weeks or months. This helps clear their internal caches and keeps their performance optimal.
*   **Maintain your system:** Regularly run system maintenance, including clearing browser caches and potentially using disk cleanup tools, to ensure your system isn't bogged down by corrupted files or outdated data.
*   **Be mindful of browser extensions:** Some browser extensions can interfere with network requests. If you notice problems after installing a new extension, try disabling it to see if it resolves the issue.