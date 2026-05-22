---
title: "How to Fix \"Wi-Fi Connected But No Internet Access\" Error on Windows"
date: "2026-05-22T03:32:58.363Z"
slug: "how-to-fix-wi-fi-connected-but-no-internet-access-error-on-windows"
type: "how-to"
description: "Troubleshoot and resolve the \"Wi-Fi Connected, No Internet Access\" error on Windows with this expert guide, covering causes, step-by-step solutions, and prevention tips."
keywords: "Wi-Fi connected no internet, Windows internet error, fix Wi-Fi no internet, limited access Wi-Fi, DNS error Windows, IP configuration error, network reset, network adapter reset, Windows 10 Wi-Fi fix, Windows 11 Wi-Fi no internet, internet troubleshooting."
---

The "Wi-Fi Connected But No Internet Access" error is a common and frustrating issue for Windows users. Your computer clearly indicates it's connected to your Wi-Fi network – the Wi-Fi icon in the taskbar shows full bars, and the network name is visible under your wireless settings. However, despite this connection, you are unable to browse the web, use online applications, or access any internet-dependent services. You might see a yellow exclamation mark over the Wi-Fi icon, or in Windows settings, it explicitly states "No Internet access" beneath your connected Wi-Fi network name. Attempts to open a web browser typically result in error messages such as "This site can't be reached," "No internet connection," or similar indications that the internet is unreachable.

This problem specifically means your device has successfully established a local connection with your wireless router or access point, but it cannot reach the broader internet beyond that point. It's not a complete Wi-Fi failure; rather, it's a breakdown in the internet's path from your router to your computer. Understanding the distinct nature of this problem – a local connection without global reach – is the first step toward effectively diagnosing and resolving it.

### Why It Happens

This specific error occurs when your Windows computer can communicate with your local Wi-Fi router, but something is preventing the data from traversing beyond the router to the internet or from being correctly processed by your computer for internet access. The root causes can vary, spanning from simple router glitches to more complex network configuration issues on your Windows machine.

Common culprits include temporary IP address conflicts or incorrect DNS server settings, where your computer struggles to translate website names into numerical addresses. The router or modem itself might be experiencing an internal software bug or a transient connection drop with your Internet Service Provider (ISP). Sometimes, a corrupted network adapter driver on your Windows PC or an overly aggressive firewall or VPN software can inadvertently block internet traffic. Identifying the underlying cause is crucial for applying the correct fix.

### Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "Wi-Fi Connected But No Internet Access" error on your Windows computer.

### ## Step 1: Restart Your Router/Modem and Computer

Many temporary network glitches can be resolved with a simple power cycle. This clears out any cached data or minor software bugs in your networking hardware.

1.  **Disconnect Power:** Unplug your Wi-Fi router and your modem (if they are separate devices) from their power outlets.
2.  **Wait:** Wait for at least 30 seconds. This ensures a complete power drain and reset.
3.  **Reconnect Power:** Plug your modem back in first, wait for all its indicator lights to stabilize (usually 1-2 minutes).
4.  **Reconnect Router:** Plug your Wi-Fi router back in, and wait for its lights to stabilize.
5.  **Restart PC:** Completely restart your Windows computer.
6.  **Test:** Once your computer restarts, try accessing the internet.

### ## Step 2: Run the Windows Network Troubleshooter

Windows includes a built-in troubleshooter that can automatically detect and fix many common network problems.

1.  **Open Settings:** Press `Windows Key + I` to open Settings.
2.  **Navigate to Network:** Go to "Network & Internet" (Windows 10) or "Network & internet" (Windows 11).
3.  **Run Troubleshooter:**
    *   **Windows 10:** Scroll down to "Status" and click "Network troubleshooter."
    *   **Windows 11:** Click "Advanced network settings," then scroll down and click "Network troubleshooter."
4.  **Follow Prompts:** Allow the troubleshooter to run and apply any suggested fixes. It might ask you to reset the Wi-Fi adapter or make other changes.
5.  **Test:** Check if internet access has been restored.

### ## Step 3: Reset TCP/IP Stack and Clear DNS Cache

Corrupted TCP/IP settings or a stale DNS cache are frequent causes of this error. Resetting them can resolve many underlying communication issues.

1.  **Open Command Prompt (Admin):**
    *   Type `cmd` in the Windows search bar.
    *   Right-click "Command Prompt" and select "Run as administrator."
2.  **Execute Commands:** Enter the following commands one by one, pressing `Enter` after each:
    *   `netsh winsock reset`
    *   `netsh int ip reset`
    *   `ipconfig /release`
    *   `ipconfig /renew`
    *   `ipconfig /flushdns`
3.  **Restart PC:** After executing all commands, close Command Prompt and restart your computer.
4.  **Test:** Verify if you can access the internet.

### ## Step 4: Verify IP and DNS Settings on Your Adapter

Ensure your Wi-Fi adapter is configured to obtain IP and DNS settings automatically, or try using public DNS servers if automatic fails.

1.  **Open Network Connections:**
    *   Press `Windows Key + R`, type `ncpa.cpl`, and press `Enter`. This opens the Network Connections window.
2.  **Access Wi-Fi Properties:** Right-click on your "Wi-Fi" adapter and select "Properties."
3.  **Configure IPv4:**
    *   Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
4.  **Automatic Settings (Default):**
    *   Ensure both "Obtain an IP address automatically" and "Obtain DNS server address automatically" are selected. This is the recommended setting for most home networks.
    *   Click "OK" on both windows to save changes.
5.  **Try Public DNS (If Automatic Fails):** If automatic settings don't work, go back to IPv4 Properties and select "Use the following DNS server addresses." Enter:
    *   Preferred DNS server: `8.8.8.8` (Google Public DNS)
    *   Alternate DNS server: `8.8.4.4` (Google Public DNS)
    *   Click "OK" and then "OK" again.
6.  **Restart PC (Important):** Restart your computer after making these changes.
7.  **Test:** Check for internet access. Remember to revert to "Obtain DNS server address automatically" if this step doesn't resolve the issue, as it's generally preferred.

### ## Step 5: Update or Reinstall Network Adapter Drivers

Outdated or corrupted Wi-Fi adapter drivers can cause connectivity issues.

1.  **Open Device Manager:**
    *   Type `Device Manager` in the Windows search bar and open it.
2.  **Locate Network Adapters:** Expand "Network adapters."
3.  **Update Driver:**
    *   Right-click on your Wi-Fi adapter (it might have "Wireless" or "802.11" in its name).
    *   Select "Update driver."
    *   Choose "Search automatically for updated driver software." If an update is found, install it.
4.  **Reinstall Driver (If Update Fails or No Update):**
    *   If no update is found or the issue persists, right-click your Wi-Fi adapter again.
    *   Select "Uninstall device."
    *   Confirm the uninstallation (do NOT check "Attempt to remove the driver software for this device" unless specifically instructed by hardware support).
    *   Restart your computer. Windows will usually reinstall the driver automatically upon reboot.
5.  **Test:** After the restart and driver reinstallation, check for internet connectivity.

### ## Step 6: Disable and Re-enable Your Wi-Fi Adapter

A quick toggle of your Wi-Fi adapter can resolve minor software hang-ups without a full driver reinstallation.

1.  **Open Network Connections:**
    *   Press `Windows Key + R`, type `ncpa.cpl`, and press `Enter`.
2.  **Disable Adapter:** Right-click on your "Wi-Fi" adapter and select "Disable."
3.  **Enable Adapter:** Wait a few seconds, then right-click the "Wi-Fi" adapter again and select "Enable."
4.  **Test:** See if internet access is restored.

### ## Step 7: Perform a Network Reset

If all previous steps fail, a full network reset in Windows can be a powerful solution. This will reinstall all network adapters and reset networking components to their default settings. **Be aware that this will forget all Wi-Fi passwords and reconfigure any VPNs or other custom network settings.**

1.  **Open Settings:** Press `Windows Key + I`.
2.  **Navigate to Network Reset:**
    *   **Windows 10:** Go to "Network & Internet" > "Status" > Scroll down and click "Network reset."
    *   **Windows 11:** Go to "Network & internet" > "Advanced network settings" > Scroll down and click "Network reset."
3.  **Initiate Reset:** Click "Reset now" and confirm your decision.
4.  **Restart PC:** Your computer will restart after the reset.
5.  **Reconnect Wi-Fi:** After restarting, you will need to reconnect to your Wi-Fi network and enter its password again.
6.  **Test:** Check for internet access.

### Common Mistakes

When troubleshooting this specific error, users often make several key mistakes that can prolong the resolution process or lead to incorrect diagnoses. A common error is only restarting the computer while overlooking the importance of restarting the router and modem. Many transient network issues originate from the router, and simply restarting the PC won't address that. Another mistake is immediately assuming the problem lies with the computer's Wi-Fi adapter or software, without first confirming that the router itself is connected to the internet (e.g., by checking indicator lights or testing with another device). Incorrectly configuring static IP addresses or DNS servers without a clear understanding of your network setup can also create new connectivity issues. Lastly, failing to fully restart the computer after applying certain network changes, especially after resetting the TCP/IP stack or reinstalling drivers, means the changes may not take full effect.

### Prevention Tips

To minimize the chances of encountering the "Wi-Fi Connected But No Internet Access" error in the future, consider these best practices:

*   **Regularly Update Windows:** Ensure your Windows operating system is always up to date. Microsoft frequently releases network-related fixes and driver updates that can prevent issues.
*   **Keep Drivers Current:** Periodically check for updates for your Wi-Fi adapter drivers, especially after major Windows updates. While Windows often handles this, a manual check can catch missed updates.
*   **Router Firmware:** Check your router manufacturer's website for firmware updates. Keeping your router's software updated can improve stability and security.
*   **Scheduled Router Restarts:** Consider performing a quick power cycle of your router and modem once every few weeks. This routine maintenance can prevent minor issues from escalating.
*   **Avoid Unnecessary Network Changes:** Unless you have a specific reason and understand the implications, keep your network adapter settings (IP and DNS) on "Obtain automatically."
*   **Review Security Software:** If you install new antivirus software, firewall, or VPN clients, monitor your internet connectivity. Some aggressive configurations might unintentionally block legitimate internet traffic. If issues arise, temporarily disabling these applications can help diagnose if they are the cause.