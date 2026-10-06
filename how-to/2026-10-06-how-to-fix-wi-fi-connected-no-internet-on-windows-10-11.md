---
title: "How to Fix \"Wi-Fi Connected, No Internet\" on Windows 10/11"
date: "2026-10-06T04:56:46.499Z"
slug: "how-to-fix-wi-fi-connected-no-internet-on-windows-10-11"
type: "how-to"
description: "Detailed guide to troubleshoot and fix the \"Wi-Fi Connected, No Internet\" error on Windows 10 and 11. Learn step-by-step solutions including IP resets, DNS changes, and driver updates."
keywords: "Wi-Fi connected no internet, Windows 10 no internet, Windows 11 no internet, fix internet connection, network troubleshoot, DNS issue, ipconfig, network reset, Wi-Fi driver, network problem, limited connectivity"
---

## Problem Explanation

The "Wi-Fi Connected, No Internet" error is a frustratingly common issue for Windows users. Your computer indicates that it is successfully connected to your Wi-Fi network – the Wi-Fi icon in the taskbar shows full bars without an 'X' or globe symbol, and your network name appears in the list of connected networks. However, despite this apparent local connectivity, you cannot access any websites, online services, or applications that require an internet connection. Browsers will typically display errors like "This site can't be reached," "No Internet," or "ERR_INTERNET_DISCONNECTED." In your network status settings, Windows might explicitly state "No Internet access" or "Connected, no Internet."

This specific problem highlights a critical distinction: your device has successfully established a connection with your local router (the Wi-Fi part), but that router, or something beyond it, is failing to provide access to the wider internet. Essentially, your computer can talk to your router, but your router can't talk to the world, or your computer isn't correctly understanding how to reach the world through the router.

## Why It Happens

The root causes of "Wi-Fi Connected, No Internet" can vary significantly, ranging from simple router glitches to more complex software conflicts on your Windows machine. Often, the issue stems from incorrect network configuration settings on your computer, preventing it from properly requesting or receiving an IP address and DNS information from your router, or from properly routing traffic. This can be due to a corrupted IP address lease, an invalid DNS server entry, or a temporary glitch in the Windows network stack.

Less commonly, the problem might originate from your router itself – perhaps its internet connection from your Internet Service Provider (ISP) has dropped, or its internal software (firmware) is malfunctioning. Outdated or corrupted Wi-Fi adapter drivers on your Windows PC can also interfere with proper communication, even if a basic Wi-Fi link is established. Finally, conflicts with third-party security software, VPN clients, or even malware can sometimes hijack network settings, leading to a state where local Wi-Fi connectivity exists but internet access is blocked.

## Step-by-Step Solution

### ## Step 1: Perform Initial Checks and Router Reboot

Before delving into complex troubleshooting, always start with the basics.
1.  **Check Other Devices:** Try accessing the internet on another device (smartphone, tablet, another computer) connected to the *same* Wi-Fi network. If other devices also have no internet, the problem is likely with your router or your Internet Service Provider (ISP).
2.  **Restart Your Router:** Unplug your Wi-Fi router from its power source. Wait for at least 30 seconds, then plug it back in. Allow a few minutes for the router to fully boot up and re-establish its connection. This often resolves temporary glitches.
3.  **Check Cables:** If you have an external modem, ensure all cables are securely connected. Consider restarting the modem as well, following the same unplug-wait-plug-in procedure.

### ## Step 2: Run the Windows Network Troubleshooter

Windows includes a built-in troubleshooter designed to diagnose and fix common network problems.
1.  **On Windows 10:** Go to **Settings** > **Update & Security** > **Troubleshoot** > **Additional troubleshooters**. Select "Internet Connections" and then "Run the troubleshooter."
2.  **On Windows 11:** Go to **Settings** > **System** > **Troubleshoot** > **Other troubleshooters**. Select "Internet Connections" and click "Run."
3.  Follow the on-screen prompts. The troubleshooter may identify and automatically fix issues, or suggest steps to take.

### ## Step 3: Reset IP Configuration and Flush DNS

Corrupted IP addresses or outdated DNS cache are very common culprits. This step will force your computer to request new network information.
1.  Open **Command Prompt** as an administrator. Search for "cmd" in the Start Menu, right-click "Command Prompt," and select "Run as administrator."
2.  Execute the following commands one by one, pressing **Enter** after each:
    *   `ipconfig /release` (This releases your current IP address.)
    *   `ipconfig /renew` (This requests a new IP address from your router.)
    *   `ipconfig /flushdns` (This clears your computer's DNS resolver cache.)
    *   `netsh winsock reset` (Resets the Winsock Catalog, which helps Windows access network services.)
    *   `netsh int ip reset` (Resets TCP/IP settings.)
3.  After running all commands, **restart your computer**. This is crucial for the changes to take effect.

### ## Step 4: Change DNS Servers

Sometimes, the DNS servers provided by your ISP can be slow, unreliable, or temporarily down. Switching to public DNS servers can resolve this.
1.  Open **Network Connections**:
    *   **On Windows 10:** Go to **Settings** > **Network & Internet** > **Status** > **Change adapter options**.
    *   **On Windows 11:** Go to **Settings** > **Network & internet** > **Advanced network settings** > **More network adapter options**.
2.  Right-click on your **Wi-Fi adapter** (usually named "Wi-Fi" or "Wireless Network Connection") and select **Properties**.
3.  In the Wi-Fi Properties window, select "Internet Protocol Version 4 (TCP/IPv4)" and click **Properties**.
4.  Select "Use the following DNS server addresses."
5.  Enter the following for Google Public DNS:
    *   **Preferred DNS server:** `8.8.8.8`
    *   **Alternate DNS server:** `8.8.4.4`
    Or, for Cloudflare DNS:
    *   **Preferred DNS server:** `1.1.1.1`
    *   **Alternate DNS server:** `1.0.0.1`
6.  Click **OK** on both windows. Restart your browser or computer to test the connection.

### ## Step 5: Update or Reinstall Wi-Fi Adapter Driver

An outdated or corrupted Wi-Fi driver can lead to connectivity issues.
1.  Open **Device Manager**. Search for "Device Manager" in the Start Menu and open it.
2.  Expand "Network adapters."
3.  Right-click on your Wi-Fi adapter (it will usually have "Wireless," "Wi-Fi," or "802.11" in its name) and select "Update driver."
4.  Choose "Search automatically for updated driver software." If Windows finds a new driver, install it and restart your computer.
5.  If no update is found, or the issue persists, try reinstalling the driver:
    *   Right-click the Wi-Fi adapter again and select "Uninstall device."
    *   **Do not check** "Attempt to remove the driver software for this device" unless you have a specific replacement driver ready.
    *   After uninstallation, **restart your computer**. Windows will usually automatically detect and reinstall a generic driver upon reboot.
6.  For the best results, visit your computer manufacturer's website (e.g., Dell, HP, Lenovo) or the Wi-Fi adapter manufacturer's website (e.g., Intel, Realtek) and download the latest Windows 10/11 Wi-Fi driver for your specific model. Install it manually.

### ## Step 6: Perform a Windows Network Reset

As a last resort for persistent network stack issues, Windows offers a full network reset feature. This will reinstall all network adapters and reset network components to their default settings. You will need to re-enter your Wi-Fi password afterwards.
1.  **On Windows 10:** Go to **Settings** > **Network & Internet** > **Status**. Scroll down and click on "Network reset."
2.  **On Windows 11:** Go to **Settings** > **Network & internet** > **Advanced network settings**. Scroll down and click on "Network reset."
3.  Click "Reset now" and then "Yes" to confirm.
4.  Your computer will restart automatically. After restarting, you will need to reconnect to your Wi-Fi network and enter its password.

## Common Mistakes

When troubleshooting "Wi-Fi Connected, No Internet," several common mistakes can prolong the frustration or lead to unnecessary steps:

*   **Ignoring the Router/ISP:** Many users immediately focus on their computer without first checking if the problem lies with the router or the internet service itself. A quick check with another device or a simple router reboot can often pinpoint the true source or fix the issue immediately, saving a lot of time.
*   **Changing Too Many Settings at Once:** Randomly altering multiple network settings (IP addresses, DNS, proxy settings) without understanding their function or testing after each change makes it impossible to identify which modification might have fixed (or broken) something. Always make one change, test, and then proceed.
*   **Forgetting to Restart:** Many network-related changes, especially command-line `netsh` resets or driver installations, require a full system restart to take effect. Simply closing and reopening applications or rebooting the router is often insufficient for Windows to fully apply the changes.
*   **Not Considering Drivers:** Users often overlook outdated or corrupted Wi-Fi drivers as a potential cause, assuming that if Wi-Fi connects, the driver must be fine. However, a driver can be functional enough for local connection but faulty in handling internet traffic.

## Prevention Tips

While "Wi-Fi Connected, No Internet" can sometimes be unavoidable due to external factors, adopting certain practices can significantly reduce its likelihood:

*   **Regular Router Maintenance:** Periodically restart your Wi-Fi router (e.g., once a month). This clears its internal memory and helps it maintain optimal performance. Also, check for and install firmware updates for your router, as these can resolve bugs and improve stability.
*   **Keep Windows and Drivers Updated:** Ensure your Windows operating system is up-to-date through Windows Update. Similarly, regularly check for updated drivers for your Wi-Fi adapter, ideally directly from your computer or adapter manufacturer's website. Newer drivers often contain bug fixes and performance improvements.
*   **Use Reliable DNS Servers:** Consider permanently configuring your network adapter to use reputable public DNS servers like Google DNS (8.8.8.8, 8.8.4.4) or Cloudflare DNS (1.1.1.1, 1.0.0.1) instead of relying solely on your ISP's DNS. These are often faster and more reliable.
*   **Avoid Unnecessary Network Software:** Be cautious when installing third-party network optimization tools, VPN clients, or excessive security suites, as these can sometimes interfere with Windows' native network stack and lead to connectivity issues. Ensure any such software is reputable and kept updated.