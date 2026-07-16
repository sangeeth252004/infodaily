---
title: "How to Fix \"Wi-Fi Connected, No Internet\" on Windows 10/11: A Comprehensive Guide"
date: "2026-07-16T20:56:11.993Z"
slug: "how-to-fix-wi-fi-connected-no-internet-on-windows-10-11-a-comprehensive-guide"
type: "how-to"
description: "Solve the frustrating \"Wi-Fi Connected, No Internet\" issue on Windows 10/11 with this expert guide. Learn to diagnose and fix common causes like DNS errors, IP configuration problems, and driver issues through detailed, step-by-step solutions."
keywords: "Wi-Fi connected no internet, Windows 10 no internet, Windows 11 no internet, fix internet connection, DNS error, network troubleshooter, IP configuration reset, Wi-Fi driver update, network reset Windows, no internet access, troubleshooting Wi-Fi."
---

The "Wi-Fi Connected, No Internet" error is a common yet frustrating issue that many Windows 10 and 11 users encounter. Your computer indicates it's successfully connected to a Wi-Fi network, displaying the familiar Wi-Fi icon without an asterisk or exclamation mark, suggesting a healthy connection. However, despite this apparent connectivity, you cannot browse the web, access online applications, or use any internet-dependent services. Web browsers typically display error messages such as "DNS_PROBE_FINISHED_NO_INTERNET," "ERR_INTERNET_DISCONNECTED," or simply state "No internet access," indicating that while your device can communicate with your router, the internet gateway remains unreachable. This specific problem is distinct from a complete Wi-Fi disconnection, as your device maintains a local network link but fails to establish a wider connection to the internet.

This issue can manifest suddenly, even if your network was working perfectly moments before. It's often compounded by the fact that other devices (like smartphones or tablets) on the same Wi-Fi network might be accessing the internet without any problems, isolating the issue to your specific Windows machine. Understanding the root causes is crucial for effective troubleshooting, enabling you to systematically address the problem rather than resorting to guesswork.

### Why It Happens

The "Wi-Fi Connected, No Internet" error primarily arises when there's a breakdown in communication between your Windows device and the broader internet, even though the connection to your local router is stable. Several factors can contribute to this communication failure. One common culprit is an issue with the Domain Name System (DNS) resolver. DNS is like an internet phonebook, translating human-readable website names (like `google.com`) into machine-readable IP addresses. If your device's DNS cache is corrupted or your configured DNS servers are unresponsive, your browser won't be able to find websites, leading to a "no internet" experience.

Another frequent cause involves incorrect or corrupted IP configurations. Your computer needs a valid IP address, subnet mask, and default gateway to communicate effectively on a network and the internet. If these settings are misconfigured, perhaps due to a glitch in the DHCP process (which automatically assigns IP addresses), your device won't know how to route traffic outside your local network. Furthermore, outdated, corrupted, or incompatible Wi-Fi adapter drivers can impair your system's ability to handle network protocols correctly. Less common but equally disruptive causes include interference from third-party security software (firewalls or antivirus programs), glitches within the Windows network stack itself, or even problems with your router or Internet Service Provider (ISP), though the latter is less likely if other devices are working fine.

### Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "Wi-Fi Connected, No Internet" issue on your Windows 10 or 11 computer.

## Step 1: Perform Initial Checks and Router/Modem Reboot

Before diving into complex solutions, always start with the basics.
1.  **Check Other Devices:** Verify if other devices connected to the same Wi-Fi network (e.g., smartphone, tablet, another computer) can access the internet. If they also have no internet, the problem likely lies with your router, modem, or ISP.
2.  **Reboot Router and Modem:** Unplug your Wi-Fi router and your internet modem (if they are separate devices) from their power outlets. Wait for at least 30 seconds. Plug the modem back in first, wait for its lights to stabilize (usually 1-2 minutes), then plug the router back in and wait for its lights to stabilize. This clears temporary glitches and refreshes network connections.
3.  **Restart Your PC:** Sometimes, a simple system restart can resolve temporary software conflicts or network card hang-ups.

After these checks, test your internet connection. If the issue persists, proceed to the next step.

## Step 2: Run the Windows Network Troubleshooter

Windows includes a built-in troubleshooter that can automatically detect and fix common network issues.
1.  **For Windows 10:** Go to `Start` > `Settings` > `Update & Security` > `Troubleshoot` > `Additional troubleshooters`. Select `Internet Connections` and click `Run the troubleshooter`.
2.  **For Windows 11:** Go to `Start` > `Settings` > `System` > `Troubleshoot` > `Other troubleshooters`. Select `Internet Connections` and click `Run`.
3.  Follow the on-screen prompts. The troubleshooter will attempt to identify and resolve common problems with your network adapter, DNS, or IP configuration.

If the troubleshooter identifies and fixes an issue, test your internet connection. If not, or if it finds nothing, continue to Step 3.

## Step 3: Reset TCP/IP Stack, Winsock, and Flush DNS

This crucial step resets core network components and clears cached DNS entries that might be causing conflicts.
1.  **Open Command Prompt as Administrator:**
    *   **Windows 10:** Type `cmd` in the Start search bar, right-click `Command Prompt`, and select `Run as administrator`.
    *   **Windows 11:** Right-click the `Start` button, and select `Terminal (Admin)` or `Windows PowerShell (Admin)`.
2.  **Execute the following commands one by one, pressing Enter after each:**
    *   `ipconfig /release` (Releases your current IP address.)
    *   `ipconfig /renew` (Requests a new IP address from your router.)
    *   `ipconfig /flushdns` (Clears your computer's DNS resolver cache.)
    *   `netsh int ip reset` (Resets the TCP/IP stack.)
    *   `netsh winsock reset` (Resets the Winsock Catalog, which helps Windows access network services.)
3.  After running all commands, **restart your computer**.

Upon reboot, check if your internet connection has been restored. These commands often resolve issues related to IP address conflicts or corrupted network settings.

## Step 4: Update or Reinstall Your Wi-Fi Adapter Driver

An outdated or corrupted Wi-Fi adapter driver can lead to connectivity problems.
1.  **Open Device Manager:**
    *   **Windows 10/11:** Right-click the `Start` button and select `Device Manager`.
2.  **Locate Network Adapters:** Expand the `Network adapters` section.
3.  **Update Driver:** Right-click on your Wi-Fi adapter (it might be listed as "Wireless Adapter," "Wi-Fi," or include the manufacturer's name like "Intel Wireless-AC") and select `Update driver`. Choose `Search automatically for drivers`. If Windows finds a newer driver, install it.
4.  **Reinstall Driver (if update fails or no new driver is found):** If updating doesn't help or no update is available, right-click the Wi-Fi adapter again and select `Uninstall device`. **Do NOT check the box "Attempt to remove the driver software for this device"** unless you have a known good driver ready to install.
5.  **Restart your computer.** Windows will usually reinstall the driver automatically upon reboot. If it doesn't, you may need to visit your computer manufacturer's website (or the Wi-Fi adapter manufacturer's website) to download and install the latest driver manually. You might need to use another device to download the driver and transfer it via USB.

Test your internet connection after updating or reinstalling the driver.

## Step 5: Reset All Network Settings in Windows

This option completely removes and then reinstalls all network adapters and resets networking components to their default settings. This is a more comprehensive step than previous resets.
1.  **For Windows 10:** Go to `Start` > `Settings` > `Network & Internet` > `Status`. Scroll down and click `Network reset`.
2.  **For Windows 11:** Go to `Start` > `Settings` > `Network & internet` > `Advanced network settings`. Scroll down and click `Network reset`.
3.  Click `Reset now` and then `Yes` to confirm.
4.  **Restart your computer.**

After the restart, you will need to re-enter your Wi-Fi password to reconnect to your network. This process can resolve deeper network configuration issues.

## Step 6: Temporarily Disable Firewall and Antivirus Software

Third-party firewall or antivirus programs can sometimes interfere with network connections, mistakenly blocking legitimate internet traffic.
1.  **Temporarily Disable:** Locate your antivirus software icon in the system tray (bottom-right corner of the screen), right-click it, and look for an option to temporarily disable its firewall or protection. If you're using Windows Defender Firewall, you can disable it via `Start` > `Settings` > `Privacy & security` (Win 11) or `Update & Security` (Win 10) > `Windows Security` > `Firewall & network protection`. Select your active network and turn off the firewall.
2.  **Test Internet:** With the firewall/antivirus temporarily disabled, try to access the internet.
3.  **Re-enable:** If disabling it resolves the issue, you've found the culprit. You will need to check your security software's settings to ensure it's not blocking internet access, or consider contacting the software's support. **Remember to re-enable your firewall and antivirus software immediately after testing** to protect your system.

## Step 7: Change DNS Servers (Optional, if problem persists)

If DNS issues are still suspected, manually configuring your DNS servers to public ones (like Google DNS or Cloudflare DNS) can bypass problems with your ISP's DNS.
1.  **Open Network Connections:**
    *   **Windows 10/11:** Type `ncpa.cpl` in the Start search bar and press Enter. This opens `Network Connections`.
2.  **Access Wi-Fi Adapter Properties:** Right-click on your Wi-Fi adapter (often named "Wi-Fi") and select `Properties`.
3.  **Configure DNS:** In the Wi-Fi Properties window, select `Internet Protocol Version 4 (TCP/IPv4)` and click `Properties`.
4.  **Enter New DNS:** Select `Use the following DNS server addresses:` and enter:
    *   **Google DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
5.  Click `OK` on both windows to save changes.
6.  **Restart your computer** for the changes to take full effect.

Test your internet connection. If these public DNS servers resolve the issue, it indicates a problem with your router's or ISP's default DNS.

### Common Mistakes

When troubleshooting the "Wi-Fi Connected, No Internet" problem, users often make several common mistakes that can prolong the resolution process or lead to unnecessary frustration. One frequent error is immediately jumping to complex solutions without performing basic checks like restarting the router, modem, and the computer itself. Many temporary network glitches can be resolved with a simple power cycle. Another common pitfall is failing to verify if other devices can access the internet. If the internet is down for all devices, the problem is likely with the ISP or the main network equipment, not your specific Windows machine.

Furthermore, some users might repeatedly try the same troubleshooting step, such as flushing DNS, without progressing to other potential causes. Overlooking driver issues is another mistake; an outdated or corrupted Wi-Fi driver is a surprisingly common reason for this type of connectivity problem. Lastly, people sometimes forget to re-enable their firewall or antivirus after temporarily disabling it for testing, leaving their system vulnerable. Systematically working through solutions, from simplest to most complex, and thoroughly checking after each step, is key to efficient problem-solving.

### Prevention Tips

Preventing the "Wi-Fi Connected, No Internet" issue often involves maintaining a healthy network environment and keeping your system up-to-date. Regularly updating your Wi-Fi adapter drivers is crucial; visit your computer manufacturer's website or the Wi-Fi adapter manufacturer's site periodically to check for and install the latest stable drivers. These updates often include bug fixes and performance improvements that enhance network stability. Similarly, ensure your router's firmware is up to date, as manufacturers frequently release updates to improve security and address known network issues.

Avoid making unnecessary or experimental changes to your network adapter settings, IP configurations, or firewall rules unless you understand the implications. When installing new software, especially security-related applications, pay attention to their network-related settings to prevent accidental blocking of internet access. Finally, running the built-in Windows Network Troubleshooter occasionally, even when you don't have an issue, can help detect potential problems before they escalate. A proactive approach to driver and firmware maintenance, coupled with mindful network configuration, significantly reduces the likelihood of encountering "Wi-Fi Connected, No Internet" problems.