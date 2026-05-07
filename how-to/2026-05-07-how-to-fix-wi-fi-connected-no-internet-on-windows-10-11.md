---
title: "How to Fix 'Wi-Fi Connected, No Internet' on Windows 10/11"
date: "2026-05-07T16:49:03.802Z"
slug: "how-to-fix-wi-fi-connected-no-internet-on-windows-10-11"
type: "how-to"
description: "Resolve the 'Wi-Fi Connected, No Internet' error on Windows 10 and 11 with this comprehensive, step-by-step guide. Troubleshoot common causes and restore your internet access."
keywords: "Wi-Fi connected no internet, Windows 10 no internet, Windows 11 no internet, fix network issue, internet access problem, network troubleshooter, flush DNS, renew IP, Wi-Fi driver update"
---

The "Wi-Fi Connected, No Internet" status is a frustrating yet common problem for Windows 10 and 11 users. This issue manifests when your computer indicates a successful connection to your local Wi-Fi network – often displaying full signal strength and reporting "Connected" in the network status – but fails to access any external websites or online services. When you attempt to browse the internet, applications like web browsers or email clients will report connection errors, and the network icon in your system tray might show a small globe or an exclamation mark, specifically stating "No Internet access." Essentially, your PC can "talk" to your router but cannot reach the wider internet.

This problem differentiates itself from a complete disconnection (where your Wi-Fi icon would show no available networks or a disconnected state) because the local network link is functional. Your device has successfully joined the Wi-Fi network and received a local IP address from your router. However, the critical link between your router and the internet service provider (ISP), or a configuration issue on your Windows PC, prevents traffic from reaching beyond your local network perimeter.

### Why It Happens

The "Wi-Fi Connected, No Internet" error typically arises from a breakdown in communication at one of several critical points in your network path. It's not usually a simple Wi-Fi signal strength issue. The root causes often include:

*   **Internet Service Provider (ISP) Outage:** The internet service itself might be down in your area, or there's an issue with your modem or router's connection to your ISP. In this scenario, no device connected to your network would have internet access.
*   **Router/Modem Malfunction:** Your router or modem might be experiencing a temporary software glitch, requiring a simple reboot to restore its functionality. It might also have lost its configuration or failed to establish an external connection.
*   **DNS Resolution Issues:** The Domain Name System (DNS) translates human-readable website names (like `google.com`) into numerical IP addresses. If your computer cannot reach a DNS server, or the assigned DNS server is faulty, it won't be able to find websites even if the underlying internet connection is present.
*   **Incorrect IP Configuration:** While your PC receives a local IP address, there might be a conflict, an expired lease, or an issue with the gateway address preventing proper routing of internet traffic.
*   **Corrupted Network Adapter Drivers:** The software that allows your Wi-Fi adapter to communicate with Windows might be outdated, corrupted, or incompatible, leading to intermittent or complete internet connectivity failure.
*   **Windows Network Stack Corruption:** The core networking components within Windows can sometimes become corrupted, hindering network communication. This often requires resetting the network configuration.
*   **Firewall or Antivirus Interference:** Overly aggressive security software can sometimes mistakenly block all incoming or outgoing internet traffic, preventing your PC from connecting to online services.

Understanding these potential causes is the first step towards an effective resolution, as many fixes target these specific areas.

### Step-by-Step Solution

Follow these steps in order, testing your internet connection after each one.

#### ## Step 1: Perform a Full Network and PC Reboot

The simplest solutions are often the most effective. Many network issues are temporary glitches that a power cycle can resolve.

1.  **Reboot your Modem and Router:**
    *   Unplug the power cable from your modem (the device connected to your ISP's line, e.g., cable, fiber).
    *   Unplug the power cable from your Wi-Fi router (if it's a separate device).
    *   Wait for at least 30 seconds. This allows capacitors to fully discharge and ensures a clean reboot.
    *   Plug the modem back in first. Wait for all its indicator lights to stabilize (this can take 1-2 minutes).
    *   Plug the router back in. Wait for its indicator lights (especially the internet/WAN light) to stabilize.
2.  **Restart your Windows PC:** Once your network equipment is fully online, restart your computer. Go to **Start** > **Power** > **Restart**.

After your PC reboots, check if your internet connection has been restored.

#### ## Step 2: Verify Internet Access on Other Devices and Check ISP Status

This step helps isolate whether the problem is specific to your Windows PC or affects your entire network.

1.  **Check Other Devices:** Try connecting to the internet on another device (e.g., smartphone, tablet, another computer) that uses the *same Wi-Fi network*.
    *   If other devices also have "No Internet," the problem likely lies with your ISP or your modem/router. Proceed to contact your ISP or troubleshoot your router.
    *   If other devices *do* have internet access, the issue is almost certainly localized to your Windows PC. Continue with the next troubleshooting steps on your computer.
2.  **Check ISP Status (Optional):** Visit your ISP's website (via a cellular connection if necessary) or use an app to check for known outages in your area.

#### ## Step 3: Run the Windows Network Troubleshooter

Windows includes a built-in troubleshooter designed to diagnose and fix common network problems.

1.  Open **Settings** (press `Win + I`).
2.  Navigate to **Network & internet**.
3.  Under the "Status" or "Advanced network settings" section (varies slightly between Windows 10/11), find and click **Network troubleshooter**.
4.  Follow the on-screen prompts. The troubleshooter will attempt to identify and resolve issues like IP configuration, DNS problems, or gateway issues.
5.  Apply any recommended fixes and restart your PC if prompted.

#### ## Step 4: Renew IP Address and Flush DNS Cache

Your PC's IP configuration and DNS cache can sometimes become stale or corrupted, leading to connectivity problems. Renewing them can often resolve this.

1.  Open **Command Prompt as Administrator**:
    *   In the Windows search bar, type `cmd`.
    *   Right-click on "Command Prompt" and select **Run as administrator**.
    *   Click **Yes** if prompted by User Account Control.
2.  Execute the following commands one by one, pressing **Enter** after each:
    *   `ipconfig /release` (This releases your current IP address.)
    *   `ipconfig /renew` (This requests a new IP address from your router.)
    *   `ipconfig /flushdns` (This clears your computer's DNS resolver cache.)
    *   `netsh winsock reset` (This resets the Winsock catalog, which defines how Windows applications access network services.)
    *   `netsh int ip reset` (This resets the TCP/IP stack to its default state.)
3.  Close the Command Prompt and **restart your PC**.

#### ## Step 5: Update or Reinstall Wi-Fi Adapter Driver

An outdated or corrupted Wi-Fi adapter driver is a very common cause of network connectivity issues.

1.  Open **Device Manager**:
    *   Right-click the **Start** button and select **Device Manager**.
2.  Expand **Network adapters**.
3.  Locate your Wi-Fi adapter (it might be listed as "Wireless Adapter," "WLAN," or include your manufacturer's name like "Intel Wireless-AC").
4.  **Update Driver:**
    *   Right-click on your Wi-Fi adapter and select **Update driver**.
    *   Choose **Search automatically for drivers**. Windows will attempt to find and install the latest driver.
    *   If Windows finds a new driver, install it and restart your PC.
5.  **Reinstall Driver (if update fails or isn't available):**
    *   Right-click on your Wi-Fi adapter and select **Uninstall device**.
    *   **Crucially, if available, check the box that says "Attempt to remove the driver for this device" or "Delete the driver software for this device."** This ensures a clean slate.
    *   Click **Uninstall**.
    *   **Restart your PC.** Windows will usually automatically detect the hardware on startup and reinstall a generic Wi-Fi driver.
6.  **Manufacturer's Website (Advanced):** If problems persist, visit your laptop manufacturer's website (e.g., Dell, HP, Lenovo) or your Wi-Fi adapter manufacturer's website (e.g., Intel, Realtek) directly. Download the latest Wi-Fi driver specifically for your model and operating system, then install it manually.

#### ## Step 6: Configure DNS Servers Manually

If DNS resolution is the problem, manually setting reliable public DNS servers can bypass faulty ISP DNS servers.

1.  Open **Settings** (press `Win + I`).
2.  Go to **Network & internet**.
3.  Under the "Advanced network settings" section, click **More network adapter options** (Windows 11) or **Change adapter options** (Windows 10). This opens the Network Connections window.
4.  Right-click on your **Wi-Fi adapter** and select **Properties**.
5.  In the Properties window, select **Internet Protocol Version 4 (TCP/IPv4)** and click **Properties**.
6.  Select the option **Use the following DNS server addresses**.
7.  Enter the preferred and alternate DNS server addresses:
    *   **Google Public DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
    *   You can choose either Google or Cloudflare. Cloudflare is generally faster.
8.  Click **OK** on both windows.
9.  **Restart your PC** for the changes to take full effect.

#### ## Step 7: Perform a Network Reset

If all else fails, a full network reset reinstalls all network adapters and resets networking components to their default settings. This is a drastic but often effective solution for deep-seated network issues.

1.  Open **Settings** (press `Win + I`).
2.  Go to **Network & internet**.
3.  Scroll down and click on **Advanced network settings**.
4.  Click on **Network reset**.
5.  Read the warning carefully. You will need to re-enter all your Wi-Fi passwords and reconnect to any VPNs after this process.
6.  Click **Reset now** and then **Yes** to confirm.
7.  Your PC will restart automatically. After it reboots, reconnect to your Wi-Fi network using your password.

### Common Mistakes

When troubleshooting "Wi-Fi Connected, No Internet," users often make specific mistakes that can prolong the resolution process or lead to frustration:

*   **Skipping the Router/Modem Reboot:** Many users focus immediately on their PC, overlooking that the router or modem is the gateway to the internet. A simple power cycle of these devices often resolves a majority of such issues.
*   **Failing to Check Other Devices:** Assuming the problem is only with their computer without verifying if other devices on the same Wi-Fi network have internet access. This crucial step helps quickly determine if the issue is PC-specific or network-wide.
*   **Not Restarting After Changes:** Many network configuration changes (like `ipconfig` commands, driver updates, or DNS changes) require a full PC restart to take effect properly. Simply closing windows or waiting will not apply the changes fully.
*   **Ignoring Driver Issues:** Users often neglect checking or updating their Wi-Fi adapter drivers, which are a frequent cause of intermittent or complete loss of internet connectivity.
*   **Incorrect Manual Network Settings:** When attempting manual DNS or IP configurations, entering incorrect values can disable internet access entirely rather than fixing it. Always double-check IP addresses and DNS entries.

### Prevention Tips

While some network issues are unavoidable, you can adopt several practices to minimize the likelihood of encountering the "Wi-Fi Connected, No Internet" problem:

*   **Regularly Update Wi-Fi Drivers:** Keep your Wi-Fi adapter drivers current. Check your PC manufacturer's website or the adapter manufacturer's website every few months for newer versions. Outdated drivers can lead to instability and connectivity issues.
*   **Keep Windows Updated:** Ensure your Windows 10/11 operating system is always up to date. Microsoft frequently releases network-related fixes and improvements that can enhance stability.
*   **Periodic Router Reboots:** Make it a habit to power cycle your router and modem once a month. This clears out temporary data, refreshes network settings, and can prevent minor glitches from escalating into full-blown connectivity problems.
*   **Review Firewall and Antivirus Settings:** Be mindful of overly aggressive firewall or antivirus software settings. If you install new security software, monitor its impact on network connectivity and adjust settings if it starts blocking legitimate traffic.
*   **Ensure Proper Cable Connections:** For your modem and router, periodically check that all Ethernet and coaxial/fiber optic cables are securely plugged in, both at the device end and the wall outlet. Loose connections can lead to intermittent internet loss.
*   **Avoid Public DNS Overrides unless Necessary:** While setting manual DNS can fix issues, relying on your ISP's DHCP-assigned DNS is generally fine. Only manually override if you encounter persistent DNS problems or prefer specific public DNS providers.