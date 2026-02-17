---
title: "How to Fix \"This Site Can't Be Reached\" (ERR_NAME_NOT_RESOLVED) in Chrome"
date: "2026-02-17T20:36:54.562Z"
slug: "how-to-fix-this-site-can-t-be-reached-err-name-not-resolved-in-chrome"
type: "how-to"
description: "Resolve the \"This Site Can't Be Reached\" (ERR_NAME_NOT_RESOLVED) error in Google Chrome with this comprehensive, step-by-step troubleshooting guide. Learn the causes and effective solutions."
keywords: "ERR_NAME_NOT_RESOLVED, This Site Can't Be Reached, Chrome error, internet connection, DNS, network troubleshooting, fix internet problem"
---

## Problem Explanation

You're trying to visit a website in Google Chrome, perhaps your favorite news source, a work portal, or an online store, but instead of seeing the familiar content, you're met with a stark error page. The message typically reads: "This site can't be reached." Below this, you'll often see specific error codes, and the most common one associated with this problem is `ERR_NAME_NOT_RESOLVED`. This error signifies that your browser, Chrome, is unable to connect to the server hosting the website because it cannot translate the website's domain name (like `www.example.com`) into an IP address that computers understand. It's like trying to call someone but not being able to find their phone number in the directory.

When this error occurs, the webpage simply won't load. You might see a generic Chrome error page with an illustration, often a broken Wi-Fi icon or a lost robot. The text will explicitly state "This site can't be reached" and "Google Chrome could not resolve the website's DNS address." This indicates a fundamental breakdown in the communication process between your device and the internet's naming system. Until this issue is resolved, you will be unable to access any websites using that specific domain name through Chrome.

## Why It Happens

The `ERR_NAME_NOT_RESOLVED` error fundamentally points to a failure in the Domain Name System (DNS) resolution process. DNS is the internet's phone book, responsible for converting human-readable domain names into machine-readable IP addresses. When you type a website address into your browser, your computer sends a request to a DNS server. This server looks up the domain name and returns the corresponding IP address, allowing your browser to connect to the correct server and load the webpage. The `ERR_NAME_NOT_RESOLVED` error means this crucial lookup failed.

Several factors can lead to this DNS resolution failure. Most commonly, it's an issue with your local network's DNS settings or the DNS server you are currently using. This could be due to your Internet Service Provider's (ISP) DNS server experiencing an outage or misconfiguration, or your computer's own network adapter settings pointing to an incorrect or unreachable DNS server. Other possibilities include problems with your router's DNS cache, issues with your operating system's network configuration, or even temporary network connectivity problems that prevent your device from reaching any DNS server. In some rarer cases, malware or incorrect firewall settings could also interfere with DNS lookups.

## Step-by-Step Solution

Here are the steps to systematically troubleshoot and resolve the "This Site Can't Be Reached" (ERR_NAME_NOT_RESOLVED) error in Chrome:

### ## Step 1: Check Your Internet Connection

Before diving into more complex solutions, ensure your basic internet connection is stable.

1.  **Open another website:** Try loading a different, well-known website like `google.com` or `bing.com` in Chrome. If other sites load, the problem is likely specific to the original website or its DNS records. If no sites load, the issue is with your overall internet connection.
2.  **Check your Wi-Fi or Ethernet connection:** Verify that your device is connected to your Wi-Fi network or Ethernet cable. Look for the Wi-Fi icon in your system tray (Windows) or menu bar (macOS). If it shows no connection or a limited connection, troubleshoot your Wi-Fi or Ethernet connection first.
3.  **Restart your modem and router:** Unplug your modem and router from the power outlet. Wait for at least 30 seconds, then plug the modem back in. Once the modem's lights indicate it's fully connected, plug your router back in. Wait for your router to boot up completely, then try accessing the website again.

### ## Step 2: Clear Chrome's Browser Cache and Cookies

Corrupted cache or cookies can sometimes interfere with website loading.

1.  **Open Chrome Settings:** Click the three vertical dots in the top-right corner of Chrome and select "Settings."
2.  **Navigate to Privacy and Security:** In the left-hand menu, click on "Privacy and security."
3.  **Clear browsing data:** Click on "Clear browsing data."
4.  **Select time range and data types:** In the "Time range" dropdown, select "All time." Make sure "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you wish to keep it.
5.  **Click "Clear data":** Click the "Clear data" button.
6.  **Restart Chrome:** Close and reopen Google Chrome, then try visiting the website.

### ## Step 3: Flush Your DNS Cache and Reset Network Settings (Windows)

Your computer also maintains a local DNS cache. Flushing it can resolve issues with outdated or corrupted entries.

1.  **Open Command Prompt as Administrator:**
    *   Click the Windows Start button.
    *   Type `cmd` in the search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
2.  **Execute the following commands, pressing Enter after each one:**
    *   `ipconfig /flushdns` (This command flushes the DNS resolver cache.)
    *   `ipconfig /registerdns` (This command attempts to register all adapter DNS records and reloads DNS settings.)
    *   `ipconfig /release` (This command releases your current IP address.)
    *   `ipconfig /renew` (This command obtains a new IP address.)
    *   `netsh winsock reset` (This command resets the Winsock Catalog, which controls how Windows applications access network services.)
3.  **Restart your computer:** After running these commands, it's essential to restart your computer for the changes to take full effect.

### ## Step 4: Change Your DNS Server

If your ISP's DNS servers are experiencing issues, switching to a public DNS server can often fix `ERR_NAME_NOT_RESOLVED`. Google Public DNS and Cloudflare DNS are popular and reliable options.

**For Windows:**

1.  **Open Network Connections:**
    *   Click the Windows Start button and type `ncpa.cpl` in the search bar, then press Enter. This will open the Network Connections window.
2.  **Select your active network adapter:** Right-click on your active internet connection (either "Wi-Fi" or "Ethernet") and select "Properties."
3.  **Open TCP/IPv4 properties:** In the properties window, find "Internet Protocol Version 4 (TCP/IPv4)" in the list, select it, and click "Properties."
4.  **Enter DNS server addresses:**
    *   Select "Use the following DNS server addresses."
    *   **For Google Public DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **For Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
5.  **Click OK:** Click "OK" on both the TCP/IPv4 Properties window and the adapter Properties window.
6.  **Flush DNS cache again:** Re-run `ipconfig /flushdns` in the administrator Command Prompt as described in Step 3.
7.  **Restart your computer:** Restart your computer.

**For macOS:**

1.  **Open System Preferences:** Click the Apple menu in the top-left corner and select "System Preferences."
2.  **Go to Network:** Click on "Network."
3.  **Select your active connection:** In the left-hand pane, select your active network connection (Wi-Fi or Ethernet).
4.  **Click "Advanced...":** Click the "Advanced..." button in the bottom-right corner.
5.  **Go to the DNS tab:** Click on the "DNS" tab.
6.  **Add DNS servers:** Click the "+" button under "DNS Servers."
    *   **For Google Public DNS:**
        *   Enter `8.8.8.8`
        *   Click "+" again and enter `8.8.4.4`
    *   **For Cloudflare DNS:**
        *   Enter `1.1.1.1`
        *   Click "+" again and enter `1.0.0.1`
7.  **Remove existing DNS servers (optional but recommended):** Select any existing DNS server addresses and click the "-" button to remove them.
8.  **Click OK:** Click "OK."
9.  **Apply changes:** Click "Apply" in the Network preferences window.
10. **Restart your computer.**

### ## Step 5: Check Your Hosts File

The `hosts` file on your computer can manually map domain names to IP addresses. If it has an incorrect entry for the website you're trying to reach, it can cause this error.

**For Windows:**

1.  **Open Notepad as Administrator:**
    *   Click the Windows Start button.
    *   Type `notepad` in the search bar.
    *   Right-click on "Notepad" and select "Run as administrator."
2.  **Open the hosts file:** In Notepad, go to `File` > `Open...`.
3.  **Navigate to the hosts file location:** In the "File name" field, type `%SystemRoot%\System32\drivers\etc\` and press Enter.
4.  **Show all files:** Change the file type dropdown from "Text Documents (*.txt)" to "All Files (*.*)".
5.  **Open the `hosts` file.**
6.  **Examine entries:** Look for any lines that contain the domain name of the website you cannot reach. If you find a line like `127.0.0.1 www.example.com` or `0.0.0.0 www.example.com`, it means the website is being blocked or redirected.
7.  **Comment out or delete problematic lines:** To disable an entry, add a `#` symbol at the beginning of the line. For example, `# 127.0.0.1 www.example.com`. If you're unsure about an entry, it's safer to comment it out temporarily.
8.  **Save and close:** Save the file (`File` > `Save`) and close Notepad.
9.  **Flush DNS:** Run `ipconfig /flushdns` in an administrator Command Prompt and restart your computer.

**For macOS:**

1.  **Open Terminal:** Go to `Applications` > `Utilities` > `Terminal`.
2.  **Open the hosts file with a text editor:** Type the following command and press Enter:
    `sudo nano /private/etc/hosts`
3.  **Enter your administrator password** when prompted.
4.  **Examine entries:** Similar to Windows, look for any lines that contain the problematic domain name and are not commented out with a `#`.
5.  **Edit or delete entries:** Use the arrow keys to navigate. To disable an entry, add a `#` at the beginning of the line.
6.  **Save and exit:** Press `Control + X`, then `Y` to confirm saving, and `Enter` to exit nano.
7.  **Flush DNS:** In Terminal, type `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` and press Enter.
8.  **Restart your computer.**

### ## Step 6: Temporarily Disable Firewall and Antivirus

Your firewall or antivirus software might be mistakenly blocking DNS requests.

1.  **Locate your firewall/antivirus:** Find the icon for your security software in your system tray or Windows Security settings.
2.  **Temporarily disable it:** Look for an option to "Disable," "Turn off," or "Pause protection." Follow the prompts to disable it temporarily.
3.  **Test the website:** Try visiting the website again.
4.  **Re-enable security software:** **Crucially, re-enable your firewall and antivirus immediately after testing.** If the website loads with security software disabled, you'll need to configure exceptions within your security software to allow access to that specific website or domain. Consult your software's documentation for instructions on adding exceptions.

### ## Step 7: Check Chrome Flags (Advanced)

In rare cases, experimental Chrome flags can cause network issues.

1.  **Open Chrome Flags:** Type `chrome://flags` into the Chrome address bar and press Enter.
2.  **Search for network-related flags:** Use the search bar at the top to look for terms like "DNS," "networking," or "sockets."
3.  **Reset all flags:** The safest approach is to click the "Reset all" button at the top right of the `chrome://flags` page. This will revert all experimental features to their default settings.
4.  **Relaunch Chrome:** After resetting, you'll be prompted to relaunch Chrome.
5.  **Test the website.**

## Common Mistakes

One of the most frequent mistakes when troubleshooting `ERR_NAME_NOT_RESOLVED` is not performing basic connectivity checks first. Users often jump directly to complex network configurations without confirming their internet is working at all or that their modem/router isn't the source of the problem. Another common pitfall is forgetting to restart the computer after making significant network changes, such as flushing DNS or changing DNS servers. Many of these changes require a system reboot to be fully implemented.

Furthermore, users sometimes misunderstand the `hosts` file. They might delete entries they don't recognize without understanding their purpose, potentially causing other system issues. It's vital to only modify or comment out entries directly related to the problematic website. Lastly, many forget to re-enable their firewall or antivirus software after testing. This leaves their system vulnerable. Always remember to re-activate your security measures once you've confirmed if they were the cause of the issue.

## Prevention Tips

To minimize the occurrence of `ERR_NAME_NOT_RESOLVED` and similar network errors, it's beneficial to maintain your network equipment and software. Regularly restarting your modem and router, perhaps once a week, can help clear temporary glitches and ensure a stable connection. Keeping your operating system and Chrome browser updated is also crucial, as updates often include network-related patches and improvements.

Consider using reliable public DNS servers like Google DNS or Cloudflare DNS as your default. This can provide a more consistent and faster DNS resolution experience compared to some ISP-provided servers. Finally, be cautious about installing untrusted software or visiting suspicious websites, as malware can interfere with network settings and DNS resolution, leading to persistent connectivity problems. Regularly running a reputable antivirus scan can help detect and remove any such threats.