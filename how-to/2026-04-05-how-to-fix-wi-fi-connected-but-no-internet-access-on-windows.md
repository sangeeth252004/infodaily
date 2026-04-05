---
title: "How to Fix \"Wi-Fi Connected But No Internet Access\" on Windows"
date: "2026-04-05T10:32:41.678Z"
slug: "how-to-fix-wi-fi-connected-but-no-internet-access-on-windows"
type: "how-to"
description: "Troubleshoot and fix the \"Wi-Fi Connected, No Internet\" issue on Windows. Learn step-by-step solutions for network connectivity problems, including DNS, IP configuration, and driver fixes."
keywords: "Wi-Fi connected no internet, Windows internet fix, network problem, no internet access, troubleshooting Wi-Fi, DNS flush, IP renew, Wi-Fi driver update, network reset"
---

## Problem Explanation

The "Wi-Fi Connected But No Internet Access" error is a common and frustrating issue for Windows users. Your computer indicates it's successfully connected to a Wi-Fi network – the Wi-Fi icon in the system tray shows full bars and no explicit error, or perhaps a small asterisk or a warning triangle. However, despite this apparent connection, you cannot browse the internet, access online applications, or perform any network-dependent tasks. When checking your network status, Windows might report "No Internet, secured," "Limited connectivity," or simply fail to load any web pages in your browser, displaying error messages like "ERR_INTERNET_DISCONNECTED" or "This site can't be reached."

This scenario indicates a disconnect between your local network connection and the wider internet. Your device has successfully established a link with your router or access point, allowing it to communicate within your home or office network. However, it's failing to receive or send data beyond that local network to the internet itself, effectively leaving you "online" but isolated.

## Why It Happens

This specific problem typically stems from issues that prevent your computer from properly communicating with the internet, even when a local Wi-Fi connection is established. The root causes can vary widely. Often, it's an IP address conflict or a problem with the Domain Name System (DNS) server, which translates human-readable website addresses (like example.com) into numerical IP addresses. If your computer cannot resolve these addresses, it cannot find websites.

Other common culprits include a malfunctioning router or modem that isn't providing internet access, outdated or corrupted network adapter drivers, incorrect network configuration settings on your Windows machine, or interference from security software like firewalls or VPNs. Less frequently, it could be an issue with your Internet Service Provider (ISP), an overloaded network, or even a hardware fault with your Wi-Fi adapter. The key is to systematically diagnose and address these potential points of failure to restore full internet access.

## Step-by-Step Solution

### 1. Perform Basic Network and PC Restarts

Always start with the simplest solutions. Many intermittent network problems are resolved by a simple power cycle.

1.  **Restart your Computer:** Save your work, close all applications, and restart your Windows PC. This can clear temporary glitches in your operating system and network stack.
2.  **Power Cycle Your Router and Modem:**
    *   Locate your Wi-Fi router and your internet modem (sometimes these are combined into one device).
    *   Unplug the power cable from both devices.
    *   Wait for at least 30 seconds. This allows the devices to completely clear their cache and reset.
    *   Plug the power cable back into your modem first. Wait until its indicator lights stabilize (typically indicating a stable internet connection, e.g., solid green lights). This usually takes 1-2 minutes.
    *   Once the modem is stable, plug the power cable back into your router. Wait another 1-2 minutes for its indicator lights to stabilize and for it to broadcast the Wi-Fi signal.
    *   Reconnect your Windows PC to the Wi-Fi network and test for internet access.
3.  **Check Other Devices:** Verify if other devices (e.g., a smartphone, another laptop) connected to the same Wi-Fi network also lack internet access. If they do, the problem is likely with your router, modem, or ISP. If they have internet, the issue is specific to your Windows PC.

### 2. Run the Windows Network Troubleshooter

Windows includes built-in troubleshooters designed to diagnose and fix common network issues.

1.  **Open Network & Internet Settings:** Right-click on the Wi-Fi icon in your system tray (bottom-right corner) and select "Open Network & Internet settings" or "Network and Internet settings."
2.  **Access Troubleshooter:**
    *   **Windows 10:** In the "Status" tab, scroll down and click on "Network troubleshooter."
    *   **Windows 11:** Go to "Advanced network settings," then scroll down to "Network troubleshooter" and click "Run."
3.  **Follow On-Screen Prompts:** The troubleshooter will attempt to identify and fix common network problems. Follow any recommendations it provides.
4.  **Test Internet:** After the troubleshooter completes, test your internet connection.

### 3. Renew IP Configuration and Flush DNS

Incorrect IP addresses or corrupted DNS cache entries are frequent causes of this problem.

1.  **Open Command Prompt as Administrator:**
    *   Type `cmd` into the Windows search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator." Confirm the User Account Control prompt.
2.  **Execute Network Commands:** Type the following commands, pressing `Enter` after each one:
    *   `ipconfig /release` (This releases your current IP address.)
    *   `ipconfig /renew` (This requests a new IP address from your router.)
    *   `ipconfig /flushdns` (This clears your computer's DNS resolver cache, removing any outdated entries.)
    *   `netsh winsock reset` (This resets the Winsock catalog, which defines how Windows network software accesses network services.)
    *   `netsh int ip reset` (This resets the TCP/IP stack to its default configuration.)
    *   `exit` (Close the Command Prompt.)
3.  **Restart PC (Recommended):** After running these commands, restart your computer to ensure all changes take effect.
4.  **Test Internet:** After the restart, check if you have internet access.

### 4. Verify and Change DNS Server Settings

Sometimes, the default DNS servers provided by your ISP can be slow, unreliable, or temporarily down. Using public DNS servers can resolve this.

1.  **Open Network Connections:**
    *   Right-click on the Wi-Fi icon in the system tray and select "Open Network & Internet settings."
    *   Click on "Change adapter options" (Windows 10) or "More network adapter options" (Windows 11).
2.  **Access Wi-Fi Properties:** Right-click on your "Wi-Fi" adapter and select "Properties."
3.  **Configure IPv4 Properties:**
    *   Scroll down and select "Internet Protocol Version 4 (TCP/IPv4)."
    *   Click "Properties."
4.  **Set Custom DNS:**
    *   Select "Use the following DNS server addresses."
    *   For **Preferred DNS server**, enter `8.8.8.8` (Google Public DNS).
    *   For **Alternate DNS server**, enter `8.8.4.4` (Google Public DNS).
    *   *Alternatively, you can use Cloudflare DNS:* Preferred `1.1.1.1`, Alternate `1.0.0.1`.
    *   Check "Validate settings upon exit" if available.
    *   Click "OK" on both dialog boxes to save changes.
5.  **Test Internet:** Close all windows and test your internet connection. If it works, the DNS was the issue. If not, revert to "Obtain DNS server address automatically" and proceed to the next step.

### 5. Update or Reinstall Wi-Fi Adapter Driver

An outdated or corrupted Wi-Fi driver can lead to connectivity problems, even if Windows reports the adapter is working.

1.  **Open Device Manager:**
    *   Type `Device Manager` into the Windows search bar and open it.
2.  **Locate Network Adapters:** Expand the "Network adapters" section.
3.  **Update Driver:**
    *   Right-click on your Wi-Fi adapter (it might have "Wireless," "WLAN," or the manufacturer's name in its title, e.g., "Intel Dual Band Wireless-AC 7260").
    *   Select "Update driver."
    *   Choose "Search automatically for drivers." If Windows finds and installs a new driver, restart your PC and test.
4.  **Reinstall Driver (If update fails or no new driver is found):**
    *   If updating doesn't help, right-click your Wi-Fi adapter again and select "Uninstall device."
    *   **Crucial:** Do NOT check the box that says "Delete the driver software for this device" unless you have already downloaded a new driver from the manufacturer's website.
    *   Click "Uninstall."
    *   Restart your PC. Windows will usually reinstall a generic driver automatically.
    *   If a new driver is needed or the generic one doesn't work, visit your laptop or Wi-Fi adapter manufacturer's website (e.g., Dell, HP, Lenovo, Intel, Realtek) on another device or via a wired connection, download the latest Wi-Fi driver for your specific model and Windows version, transfer it to your PC, and install it.
5.  **Test Internet:** After installing or reinstalling drivers, restart your PC and check for internet access.

### 6. Reset Network Settings (Windows 10/11)

This option reinstalls all network adapters and resets networking components to their original settings. This is a more drastic but often effective step.

1.  **Open Network Reset:**
    *   **Windows 10:** Go to "Settings" > "Network & Internet" > "Status" > "Network reset."
    *   **Windows 11:** Go to "Settings" > "Network & Internet" > "Advanced network settings" > "Network reset."
2.  **Initiate Reset:** Click "Reset now," then "Yes" to confirm.
3.  **Restart PC:** Your computer will restart automatically after the network reset process.
4.  **Reconnect to Wi-Fi:** After restarting, you will need to re-enter your Wi-Fi password and reconnect to your network, as all saved Wi-Fi networks will be forgotten.
5.  **Test Internet:** Check for internet connectivity.

### 7. Check Firewall and VPN Interference

Security software or VPN clients can sometimes interfere with network connectivity.

1.  **Temporarily Disable Firewall:**
    *   If you use a third-party antivirus/firewall suite, temporarily disable its firewall component.
    *   For Windows Defender Firewall: Type `Windows Defender Firewall` into search, open it, and click "Turn Windows Defender Firewall on or off" on the left. Temporarily select "Turn off Windows Defender Firewall" for both private and public networks. **Remember to turn it back on after testing.**
2.  **Disable VPN:** If you use a VPN client, disable it or disconnect from the VPN service.
3.  **Test Internet:** Try accessing the internet. If disabling the firewall or VPN resolves the issue, you'll need to configure your security software to allow proper network access or troubleshoot your VPN client. Re-enable security measures immediately after testing to maintain protection.

## Common Mistakes

When troubleshooting "Wi-Fi Connected But No Internet," users often make several common mistakes that can prolong the resolution process or create new problems:

*   **Not Power Cycling Router/Modem Correctly:** Simply unplugging and immediately plugging back in doesn't allow devices to fully reset. The 30-second waiting period is crucial for a hard reset.
*   **Only Restarting the PC:** Assuming the problem is entirely with the computer and neglecting to check or reset the network hardware (router, modem) is a common oversight. The issue often lies outside the PC.
*   **Skipping Basic Checks:** Failing to confirm if other devices on the same network have internet access means you don't quickly isolate whether the problem is specific to your PC or a broader network/ISP issue.
*   **Jumping to Complex Solutions:** Users sometimes immediately dive into advanced settings like IP configurations or driver reinstalls without first trying basic restarts or the Windows troubleshooter. Always start simple and escalate as needed.
*   **Ignoring Physical Wi-Fi Switches:** Some older laptops have a physical Wi-Fi toggle switch or a function key combination that can disable the Wi-Fi adapter. Accidentally activating this can appear as a software issue.

## Prevention Tips

Preventing the "Wi-Fi Connected But No Internet" error often involves maintaining a healthy network environment and keeping your system up-to-date:

*   **Regularly Power Cycle Your Router/Modem:** Make it a habit to restart your network equipment once a month or whenever you notice general slowdowns. This helps clear caches and maintain optimal performance.
*   **Keep Wi-Fi Drivers Updated:** Periodically check your laptop or Wi-Fi adapter manufacturer's website for the latest drivers. Updated drivers often include bug fixes and performance improvements. You can also use Windows Update, but manufacturer sites often have newer versions.
*   **Use Reliable Security Software:** Ensure your antivirus and firewall are reputable and configured correctly. Avoid installing too many conflicting security programs, which can create network conflicts.
*   **Monitor ISP Outages:** If multiple devices are affected, check your Internet Service Provider's (ISP) website or social media for reported outages in your area.
*   **Avoid Overloading Your Network:** Be mindful of the number of devices actively streaming or downloading large files simultaneously, especially on older or less powerful routers, as this can strain network resources and lead to connectivity issues.
*   **Maintain Router Placement:** Keep your Wi-Fi router in a central location, away from obstructions and interfering electronics, to ensure a strong and stable wireless signal.