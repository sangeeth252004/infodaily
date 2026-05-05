---
title: "How to Fix \"This Site Can't Be Reached\" (ERR_NAME_RESOLUTION_FAILED) in Google Chrome"
date: "2026-05-05T07:15:16.150Z"
slug: "how-to-fix-this-site-can-t-be-reached-err-name-resolution-failed-in-google-chrome"
type: "how-to"
description: "Troubleshoot and resolve the \"This Site Can't Be Reached\" error (ERR_NAME_RESOLUTION_FAILED) in Google Chrome with this comprehensive, step-by-step guide. Learn why it happens and how to fix it."
keywords: "ERR_NAME_RESOLUTION_FAILED, This Site Can't Be Reached, Google Chrome error, fix Chrome error, network error, DNS error, website not loading, internet connection problem"
---

Experiencing the frustrating "This Site Can't Be Reached" error in Google Chrome, often accompanied by the specific code `ERR_NAME_RESOLUTION_FAILED`, can bring your browsing to a standstill. This message means Chrome tried to find the IP address for a website you entered, but it couldn't resolve the domain name. Essentially, your browser doesn't know where to find the server hosting the website. It's a common issue that can stem from various sources, disrupting your ability to access the internet.

When you see `ERR_NAME_RESOLUTION_FAILED`, Chrome is telling you it failed in a crucial step: translating a human-readable website address (like `www.example.com`) into a machine-readable IP address (like `192.168.1.1`). This translation is handled by Domain Name System (DNS) servers. If Chrome can't communicate with these servers, or if the information they provide is incorrect or inaccessible, you'll encounter this error. It’s a fundamental networking problem that prevents your browser from connecting to the intended destination on the internet.

## Step 1: Check Your Internet Connection

Before diving into more complex solutions, it's essential to rule out a basic internet connectivity issue.

1.  **Test Other Websites:** Try opening several different websites in Chrome, or even in another browser. If other sites also fail to load, the problem is likely with your overall internet connection, not just Chrome or a specific site.
2.  **Check Your Router/Modem:** Look at the indicator lights on your router and modem. Are they indicating a stable connection? If not, try power cycling them: unplug both devices, wait for about 30 seconds, then plug the modem back in first. Wait for it to fully boot up (usually indicated by stable lights), then plug in the router. Wait another minute or two for the router to boot before testing your connection again.
3.  **Connect Via Wi-Fi vs. Ethernet:** If you're on Wi-Fi, try connecting your computer directly to the router with an Ethernet cable, if possible. If the website loads via Ethernet but not Wi-Fi, the issue might be with your Wi-Fi signal or settings.

## Step 2: Flush Your DNS Cache

Your computer stores a local cache of DNS lookups to speed up future requests. Sometimes, this cache can become outdated or corrupted, leading to `ERR_NAME_RESOLUTION_FAILED`. Clearing it forces your computer to get fresh DNS information.

**For Windows:**

1.  Open **Command Prompt** as an administrator. You can do this by searching for "cmd" in the Windows search bar, right-clicking on "Command Prompt," and selecting "Run as administrator."
2.  In the Command Prompt window, type the following command and press Enter:
    ```bash
    ipconfig /flushdns
    ```
3.  You should see a message confirming that the DNS Resolver Cache was successfully flushed.

**For macOS:**

1.  Open **Terminal** (Applications > Utilities > Terminal).
2.  Type the following command and press Enter (you may be prompted for your administrator password):
    ```bash
    sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
    ```

**For Linux:**

The command can vary slightly depending on your Linux distribution and the DNS resolver service being used. A common command for systems using `systemd-resolved` is:

1.  Open **Terminal**.
2.  Type the following command and press Enter:
    ```bash
    sudo systemd-resolve --flush-caches
    ```

## Step 3: Change Your DNS Servers

Your Internet Service Provider (ISP) usually assigns you DNS servers automatically. However, these servers can sometimes be slow, unreliable, or have issues. Switching to a public DNS service like Google DNS or Cloudflare DNS can often resolve `ERR_NAME_RESOLUTION_FAILED`.

**For Windows:**

1.  Right-click on the network icon in your system tray (usually bottom right corner) and select **"Open Network & Internet settings."**
2.  Click on **"Change adapter options."**
3.  Right-click on your active network connection (e.g., "Wi-Fi" or "Ethernet") and select **"Properties."**
4.  In the properties window, select **"Internet Protocol Version 4 (TCP/IPv4)"** and click **"Properties."**
5.  Select **"Use the following DNS server addresses."**
6.  Enter the following for Google DNS:
    *   **Preferred DNS server:** `8.8.8.8`
    *   **Alternate DNS server:** `8.8.4.4`
    *(Alternatively, for Cloudflare DNS: Preferred: `1.1.1.1`, Alternate: `1.0.0.1`)*
7.  Check **"Validate settings upon exit"** and click **"OK."**

**For macOS:**

1.  Go to **Apple menu > System Preferences > Network.**
2.  Select your active network connection (e.g., Wi-Fi or Ethernet) from the list on the left.
3.  Click the **"Advanced..."** button.
4.  Go to the **"DNS"** tab.
5.  Click the **"+"** button to add a DNS server.
6.  Enter `8.8.8.8` (or `1.1.1.1` for Cloudflare).
7.  Click the **"+"** button again to add a second server.
8.  Enter `8.8.4.4` (or `1.0.0.1` for Cloudflare).
9.  Click **"OK"** and then **"Apply."**

## Step 4: Clear Chrome's Cache and Cookies

Corrupted cache data or cookies within Chrome can sometimes interfere with website loading and DNS resolution.

1.  Open **Google Chrome.**
2.  Click on the **three vertical dots** in the top-right corner to open the Chrome menu.
3.  Select **"Clear browsing data..."**
4.  In the dialog box, set the **"Time range"** to **"All time."**
5.  Make sure **"Cookies and other site data"** and **"Cached images and files"** are checked. You can also choose to clear browsing history if you wish.
6.  Click the **"Clear data"** button.
7.  Close and reopen Chrome, then try visiting the website again.

## Step 5: Disable Your VPN or Proxy Server (If Applicable)

If you are using a Virtual Private Network (VPN) or a proxy server, it can sometimes interfere with DNS resolution.

1.  **VPN:** Locate your VPN application and disconnect from your current server. Try connecting to a different server or disabling the VPN entirely. If the website loads without the VPN, the issue is with your VPN service or its configuration.
2.  **Proxy Server:**
    *   **On Windows:** Go to **Settings > Network & Internet > Proxy.** Ensure "Automatically detect settings" is turned ON and "Use a proxy server" is turned OFF.
    *   **On macOS:** Go to **Apple menu > System Preferences > Network.** Select your active connection, click **"Advanced..."**, and go to the **"Proxies"** tab. Ensure no proxy protocols are checked, or if they are, that the server address and port are correct and accessible.

## Step 6: Check Your Hosts File

The hosts file on your computer allows you to manually map IP addresses to domain names. If an incorrect entry exists here for the website you're trying to visit, it can cause `ERR_NAME_RESOLUTION_FAILED`.

**For Windows:**

1.  Open **Notepad** as an administrator (search for "notepad," right-click, and select "Run as administrator").
2.  In Notepad, go to **File > Open.**
3.  Navigate to `C:\Windows\System32\drivers\etc\`
4.  In the file name box, type `hosts` and press Enter. If you don't see it, make sure "All Files (*.*)" is selected in the "Files of type" dropdown.
5.  Look for any lines that contain the domain name of the website you're trying to reach. If you find one that has an incorrect IP address or is mapping it to `127.0.0.1` (localhost) when it shouldn't, delete that line.
6.  Save the hosts file (**File > Save**).

**For macOS:**

1.  Open **Terminal.**
2.  Type `sudo nano /etc/hosts` and press Enter. Enter your administrator password when prompted.
3.  Look for any lines that contain the domain name. Delete incorrect entries by pressing `Ctrl+K` on that line.
4.  Press `Ctrl+O` to save, then `Enter` to confirm the filename, and `Ctrl+X` to exit.

## Step 7: Temporarily Disable Your Firewall or Antivirus Software

Firewall or antivirus software can sometimes mistakenly block legitimate network traffic. Temporarily disabling them can help determine if they are the cause.

1.  **Windows Firewall:** Search for "Windows Defender Firewall" in the Windows search bar and open it. Click "Turn Windows Defender Firewall on or off" in the left pane. Turn off the firewall for both private and public networks. **Remember to turn it back on after testing.**
2.  **Antivirus Software:** Locate your antivirus program in the system tray or start menu, and look for an option to temporarily disable its real-time protection. The exact steps vary greatly by antivirus provider. **Ensure you re-enable your antivirus immediately after testing.**

If disabling these programs allows you to access the site, you'll need to configure your firewall or antivirus to allow Chrome or specific websites, or consider a different security software.

### Common Mistakes

One common mistake is assuming the problem is with Google Chrome itself and repeatedly reinstalling the browser without checking the underlying network or DNS configuration. Users also often forget to restart their computer or router after making network setting changes, which is sometimes necessary for those changes to take full effect. Another pitfall is only testing one website; if multiple sites are inaccessible, the problem is likely system-wide, not specific to a single URL. Finally, when changing DNS servers, people might enter incorrect IP addresses, further hindering connectivity.

### Prevention Tips

To minimize the occurrence of `ERR_NAME_RESOLUTION_FAILED`, maintain a stable internet connection and regularly check your router's firmware for updates. Keeping your operating system and browser updated is also crucial, as updates often include networking improvements and security patches. Consider setting up reliable public DNS servers permanently in your network adapter settings, as they are often faster and more stable than ISP-provided ones. Regularly flushing your DNS cache, perhaps once a month, can also help prevent issues arising from outdated local records.