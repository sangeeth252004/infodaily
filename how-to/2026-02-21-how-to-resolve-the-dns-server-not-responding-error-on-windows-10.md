---
title: "How to Resolve the \"DNS Server Not Responding\" Error on Windows 10"
date: "2026-02-21T15:24:38.198Z"
slug: "how-to-resolve-the-dns-server-not-responding-error-on-windows-10"
type: "how-to"
description: "Detailed guide to fix the \"DNS Server Not Responding\" error on Windows 10. Learn causes and step-by-step solutions including DNS flushing, changing servers, and driver updates."
keywords: "DNS server not responding, Windows 10, fix DNS error, internet connectivity, network troubleshooting, flush DNS, change DNS server, network reset, network adapter drivers"
---

### Problem Explanation

The "DNS Server Not Responding" error on Windows 10 is a frustrating network issue that prevents your computer from connecting to the internet or accessing specific websites. When this problem occurs, you'll typically see error messages in your web browser like "DNS_PROBE_FINISHED_NO_INTERNET," "This site can't be reached," or "Server Not Found." You might also notice a "No Internet Access" status in your network connection icon in the system tray, even if your Wi-Fi or Ethernet connection appears active.

Essentially, your computer is struggling to translate human-readable website names (like "google.com") into the numerical IP addresses that computers use to locate servers on the internet. While some local network resources might still be accessible, the broader internet will feel broken. This error disrupts your online experience, making it impossible to browse, stream, or access most web-based applications.

### Why It Happens

This error primarily indicates a failure in the Domain Name System (DNS) resolution process. DNS acts as the internet's phonebook, converting domain names into IP addresses. When a DNS server isn't responding, your computer can't find the correct "address" for the websites you're trying to visit. Several factors can cause this disruption:

*   **Router or Modem Issues:** Your network hardware might be experiencing a temporary glitch, preventing it from properly forwarding DNS requests.
*   **ISP DNS Server Problems:** The DNS servers provided by your Internet Service Provider (ISP) might be temporarily down, overloaded, or experiencing technical difficulties.
*   **Incorrect Network Configuration:** Your computer's network settings might be misconfigured, either manually or due to a software conflict, pointing to a non-existent or incorrect DNS server.
*   **Corrupted DNS Cache:** Your Windows operating system maintains a local cache of recently resolved DNS entries. If this cache becomes corrupted, it can lead to lookup failures.
*   **Firewall or Antivirus Interference:** Security software can sometimes be overly aggressive, blocking legitimate DNS queries and preventing your system from communicating with DNS servers.
*   **Outdated or Corrupt Network Adapter Drivers:** The software that allows your network adapter to communicate with Windows might be outdated or corrupted, leading to network instability.
*   **Malware Infection:** Malicious software can interfere with network settings, redirect DNS queries, or block internet access as part of its payload.

### Step-by-Step Solution

Addressing the "DNS Server Not Responding" error often involves a systematic approach, tackling the most common causes first. Follow these steps sequentially, testing your internet connection after each one.

## Step 1: Restart Network Hardware and Flush DNS Cache

A significant number of network issues, including DNS problems, can be resolved by simply restarting your network devices and clearing your system's DNS cache.

1.  **Restart Your Router and Modem:**
    *   Unplug your internet modem and Wi-Fi router from their power outlets.
    *   Wait for at least 30-60 seconds.
    *   Plug the modem back in first, and wait until its indicator lights stabilize (usually 1-2 minutes).
    *   Then, plug your router back in and wait for its lights to stabilize.
    *   Restart your Windows 10 computer.
2.  **Flush DNS Cache and Reset Network Configuration:**
    *   Type `cmd` into the Windows search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
    *   In the Command Prompt window, enter the following commands one by one, pressing Enter after each:
        ```cmd
        ipconfig /flushdns
        ipconfig /registerdns
        ipconfig /release
        ipconfig /renew
        netsh winsock reset
        netsh int ip reset
        ```
    *   After executing all commands, close the Command Prompt and restart your computer.

## Step 2: Change Your DNS Server to a Public Alternative

If your ISP's DNS servers are experiencing issues, switching to a reliable public DNS server can often resolve the problem. Google Public DNS and Cloudflare DNS are popular, fast, and secure alternatives.

1.  **Open Network Connections:**
    *   Right-click the network icon (Wi-Fi or Ethernet) in the system tray.
    *   Select "Open Network & Internet settings."
    *   Under "Advanced network settings," click "Change adapter options."
2.  **Modify Adapter Settings:**
    *   In the Network Connections window, right-click on your active network adapter (e.g., "Wi-Fi" or "Ethernet").
    *   Select "Properties."
3.  **Configure IPv4 DNS:**
    *   In the Properties window, select "Internet Protocol Version 4 (TCP/IPv4)."
    *   Click "Properties."
    *   Select "Use the following DNS server addresses."
    *   For Google Public DNS, enter:
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   For Cloudflare DNS, enter:
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   Click "OK" on both windows to save the changes.
    *   Restart your browser or computer and test your internet connection.

## Step 3: Temporarily Disable Windows Firewall and Antivirus

Sometimes, security software can mistakenly block DNS traffic, leading to connection issues. Temporarily disabling them can help determine if they are the cause.

1.  **Disable Windows Defender Firewall:**
    *   Type `firewall` into the Windows search bar and select "Windows Defender Firewall."
    *   Click "Turn Windows Defender Firewall on or off" on the left pane.
    *   Select "Turn off Windows Defender Firewall (not recommended)" for both "Private network settings" and "Public network settings."
    *   Click "OK."
2.  **Disable Third-Party Antivirus (If Applicable):**
    *   Locate your antivirus icon in the system tray (bottom-right of your screen).
    *   Right-click the icon and look for options like "Disable," "Stop Protection," or "Exit." Follow the prompts.
3.  **Test Connection:** Attempt to access websites.
4.  **Re-enable Protection:** Regardless of the outcome, **immediately re-enable your firewall and antivirus software** after testing. Running without protection leaves your system vulnerable.

## Step 4: Update Network Adapter Drivers

Outdated or corrupted network drivers can cause various connectivity problems, including DNS resolution issues.

1.  **Open Device Manager:**
    *   Right-click the Start button and select "Device Manager."
2.  **Locate Network Adapters:**
    *   Expand the "Network adapters" section.
    *   Identify your Wi-Fi or Ethernet adapter (e.g., "Intel Wireless-AC 9560" or "Realtek PCIe GbE Family Controller").
3.  **Update Driver:**
    *   Right-click on your network adapter and select "Update driver."
    *   Choose "Search automatically for updated driver software."
    *   If Windows finds a newer driver, install it.
4.  **Manual Update (if automatic fails):**
    *   If Windows reports that the best driver is already installed, visit your computer manufacturer's website (e.g., Dell, HP, Lenovo) or the network adapter manufacturer's website (e.g., Intel, Realtek, Broadcom).
    *   Download the latest network adapter driver compatible with your Windows 10 version.
    *   Run the installer and follow the on-screen instructions.
    *   Restart your computer after installation.

## Step 5: Run Network Troubleshooter and Perform a Network Reset

Windows 10 includes built-in tools that can diagnose and sometimes automatically fix network problems. A full network reset can often resolve stubborn issues by reinstalling network components.

1.  **Run Network Troubleshooter:**
    *   Type `troubleshoot` into the Windows search bar and select "Troubleshoot settings."
    *   Click "Additional troubleshooters."
    *   Select "Internet Connections" and click "Run the troubleshooter."
    *   Follow any on-screen prompts.
2.  **Perform a Network Reset:**
    *   Go to "Settings" (Windows Key + I).
    *   Click "Network & Internet."
    *   Scroll down the "Status" tab and click "Network reset."
    *   Click "Reset now" and then "Yes" to confirm.
    *   Your computer will restart. After it reboots, you will need to reconnect to your Wi-Fi network and re-enter its password. This process essentially reinstalls all network adapters and restores network components to their default settings.

### Common Mistakes

When troubleshooting the "DNS Server Not Responding" error, users often fall into common pitfalls that can delay resolution or even exacerbate the problem:

*   **Skipping the Basics:** Many users immediately jump to complex solutions without first performing simple steps like restarting their router/modem or flushing the DNS cache. These basic actions often resolve temporary glitches quickly.
*   **Incorrectly Entering DNS Addresses:** When manually changing DNS servers, entering an incorrect IP address (e.g., a typo like `8.8.8.1` instead of `8.8.8.8`) will inevitably lead to further connectivity issues. Always double-check the numbers.
*   **Forgetting to Re-enable Security Software:** Temporarily disabling your firewall or antivirus for testing is a valid troubleshooting step, but forgetting to re-enable them leaves your system vulnerable to security threats.
*   **Making Too Many Changes at Once:** Applying multiple fixes simultaneously without testing after each step makes it impossible to identify which specific action resolved the problem, or worse, which action might have introduced a new issue.
*   **Overlooking Physical Connections:** While primarily a software issue, a loose Ethernet cable or a faulty Wi-Fi adapter can sometimes present similar symptoms. Always ensure physical connections are secure.

### Prevention Tips

While not entirely preventable, you can significantly reduce the likelihood of encountering the "DNS Server Not Responding" error by adopting these best practices:

*   **Keep Windows and Drivers Updated:** Regularly install Windows updates and ensure your network adapter drivers are current. Updates often include bug fixes and performance improvements that enhance network stability.
*   **Use Reliable Public DNS Servers:** Consider proactively switching to well-known, reliable public DNS servers like Google Public DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) instead of relying solely on your ISP's potentially less stable servers.
*   **Regular Router/Modem Restarts:** Periodically restarting your router and modem (e.g., once a month) can clear out minor glitches and refresh their internal processes, preventing cumulative issues.
*   **Maintain Antivirus and Firewall Protection:** Use a reputable antivirus program and keep it updated. Ensure your Windows Defender Firewall (or a third-party firewall) is always active and configured correctly to prevent malware that could interfere with network functions.
*   **Avoid Suspicious Downloads and Websites:** Malicious software can alter your network settings. Be vigilant about what you download and which websites you visit to minimize the risk of infection.
*   **Understand Your Network Settings:** Familiarize yourself with basic network settings on your Windows 10 computer. Knowing how to access and modify IP and DNS settings can empower you to troubleshoot effectively.