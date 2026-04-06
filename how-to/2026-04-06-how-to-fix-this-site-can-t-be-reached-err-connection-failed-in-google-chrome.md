---
title: "How to Fix \"This Site Can't Be Reached\" (ERR_CONNECTION_FAILED) in Google Chrome"
date: "2026-04-06T02:26:29.966Z"
slug: "how-to-fix-this-site-can-t-be-reached-err-connection-failed-in-google-chrome"
type: "how-to"
description: "Troubleshoot and resolve the \"This Site Can't Be Reached\" (ERR_CONNECTION_FAILED) error in Google Chrome with this comprehensive step-by-step guide."
keywords: "ERR_CONNECTION_FAILED, Chrome error, This Site Can't Be Reached, internet connection, network troubleshooting, fix browser errors"
---

## Problem Explanation

You're trying to access a website in Google Chrome, but instead of the expected content, you see a stark error page. The message typically reads: **"This site can't be reached"** followed by **"ERR_CONNECTION_FAILED"** or a similar connection-related failure code. This means Chrome attempted to establish a connection to the requested website, but the attempt failed for reasons related to your network, device, or the website itself. It's a frustrating roadblock that prevents you from browsing the web.

When this error occurs, the page will likely display additional diagnostic information, such as "DNS probe finished no internet," "ERR_NAME_RESOLUTION_FAILED," or "ERR_CONNECTION_TIMED_OUT." These variations point to different underlying causes for the connection failure, but they all signify that your browser could not successfully load the intended webpage.

## Why It Happens

The `ERR_CONNECTION_FAILED` error is a broad indicator that Google Chrome cannot establish a stable and successful connection with the server hosting the website you're trying to visit. The root causes are diverse and can stem from issues on your end, such as an unstable or improperly configured internet connection, problems with your computer's network settings, or interference from security software. It can also be caused by temporary issues with the website's server or network infrastructure, or even problems with your router or modem. Essentially, something in the communication pathway between your browser and the website's server has been disrupted.

Common culprits include a faulty or outdated network adapter driver, incorrect DNS settings, a misconfigured proxy server, firewall restrictions, or even malware interfering with your network traffic. In some cases, the problem might be as simple as a temporary glitch with your router or a problem with your Internet Service Provider's (ISP) network. Understanding these potential causes is crucial for systematically troubleshooting and resolving the `ERR_CONNECTION_FAILED` error.

## Step-by-Step Solution

Here's a structured approach to diagnose and fix the "This Site Can't Be Reached" (ERR_CONNECTION_FAILED) error in Google Chrome:

### ## Step 1: Check Your Internet Connection and Restart Your Router/Modem

Before diving into more complex solutions, verify your basic internet connectivity.
1.  **Test other websites:** Try visiting several different, reputable websites (e.g., google.com, wikipedia.org). If all of them fail to load, the issue is likely with your internet connection itself, not a specific website or Chrome.
2.  **Check your Wi-Fi or Ethernet connection:** Ensure you are connected to the correct network. If using Wi-Fi, check the signal strength. If using Ethernet, ensure the cable is securely plugged in at both ends.
3.  **Restart your router and modem:** This is often the simplest and most effective solution.
    *   Unplug the power cords from both your modem and your router.
    *   Wait for at least 30-60 seconds.
    *   Plug the modem back in first and wait for its lights to stabilize (usually 1-2 minutes).
    *   Plug the router back in and wait for its lights to stabilize.
    *   Once both devices are fully powered on, try accessing the website again in Chrome.

### ## Step 2: Clear Chrome's Cache and Cookies

Corrupted cache or cookie data can sometimes interfere with website loading.
1.  Open Google Chrome.
2.  Click the **three vertical dots** (More) in the top-right corner.
3.  Go to **"Clear browsing data."**
4.  In the dialog box, select a **"Time range"** of **"All time."**
5.  Ensure **"Cookies and other site data"** and **"Cached images and files"** are checked. You can also choose to clear browsing history.
6.  Click **"Clear data."**
7.  Close and reopen Chrome, then try the website again.

### ## Step 3: Flush DNS Cache and Reset Network Settings

Your computer's DNS cache might be holding outdated information, or your network settings could be misconfigured.
1.  **Flush DNS Cache:**
    *   **Windows:**
        *   Press the **Windows key + R** to open the Run dialog.
        *   Type `cmd` and press **Ctrl + Shift + Enter** to open Command Prompt as an administrator.
        *   In the Command Prompt window, type `ipconfig /flushdns` and press Enter. You should see a message confirming the DNS resolver cache was flushed.
    *   **macOS:**
        *   Open **Terminal** (Applications > Utilities > Terminal).
        *   Type `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` and press Enter. You'll be prompted for your administrator password.
2.  **Reset Network Settings (Windows):**
    *   Go to **Settings > Network & Internet > Status**.
    *   Scroll down and click on **"Network reset."**
    *   Click **"Reset now."** Your computer will restart after this.
3.  **Reset Network Settings (macOS):**
    *   Go to **System Preferences > Network**.
    *   Select your active network connection (Wi-Fi or Ethernet) from the left-hand list.
    *   Click the **gear icon** (or the minus '-' button if available) below the list and select **"Make Service Active."**
    *   Click **"Apply."**
    *   You may also need to remove and re-add the network interface. Click the **"-"** button to remove it, then click the **"+"** button to re-add it, selecting the correct interface and protocol.

After these steps, restart your computer and try accessing the website.

### ## Step 4: Check Your Proxy Settings

An incorrect proxy configuration can block internet access.
1.  **For Windows:**
    *   Go to **Settings > Network & Internet > Proxy.**
    *   Under "Manual proxy setup," ensure that **"Use a proxy server"** is turned **Off**.
    *   If you use a VPN or specific proxy, ensure it's correctly configured and active.
2.  **For macOS:**
    *   Go to **System Preferences > Network**.
    *   Select your active network connection (Wi-Fi or Ethernet).
    *   Click **"Advanced..."**
    *   Go to the **"Proxies"** tab.
    *   Ensure that no proxy protocols (Web Proxy (HTTP), Secure Web Proxy (HTTPS), etc.) are checked unless you intentionally use them and know their correct settings.
    *   Click **"OK"** and then **"Apply."**

### ## Step 5: Disable Antivirus and Firewall Temporarily

Your antivirus or firewall software might be mistakenly blocking the website.
1.  **Temporarily disable your antivirus software.** Refer to your antivirus program's documentation for specific instructions.
2.  **Temporarily disable your Windows Firewall or macOS Firewall.**
    *   **Windows:** Go to **Settings > Update & Security > Windows Security > Firewall & network protection**. Select your active network (e.g., Domain network, Private network, Public network) and toggle the switch to **Off**.
    *   **macOS:** Go to **System Preferences > Security & Privacy > Firewall**. Click the lock to make changes, enter your password, and then click **"Turn Off Firewall."**
3.  After disabling, try loading the website. **Remember to re-enable your antivirus and firewall immediately** after testing, regardless of whether it fixed the issue, to maintain your system's security. If disabling them fixes the problem, you'll need to add an exception for the website or adjust the firewall/antivirus settings.

### ## Step 6: Update Your Network Adapter Driver (Windows)

An outdated or corrupted network adapter driver can cause connection problems.
1.  Press **Windows key + X** and select **"Device Manager."**
2.  Expand **"Network adapters."**
3.  Right-click on your primary network adapter (e.g., "Intel(R) Wi-Fi 6 AX201," "Realtek PCIe GbE Family Controller").
4.  Select **"Update driver."**
5.  Choose **"Search automatically for drivers."** Windows will attempt to find and install the latest driver.
6.  If Windows doesn't find a new driver, you can visit your computer manufacturer's website or the network adapter manufacturer's website to download and install the latest driver manually.
7.  Restart your computer after updating the driver.

### ## Step 7: Check for Malware

Malware can interfere with your network connections and cause various browsing issues, including connection failures.
1.  Ensure your antivirus software is up-to-date.
2.  Perform a full system scan.
3.  Consider using a reputable anti-malware scanner (e.g., Malwarebytes) for a second opinion, as some malware can evade traditional antivirus detection.
4.  Remove any detected threats and restart your computer.

## Common Mistakes

A frequent mistake is to immediately assume the website is down for everyone when encountering `ERR_CONNECTION_FAILED`. This error is often specific to your connection or device. Another common pitfall is not restarting your router and modem; this simple step resolves a surprising number of network glitches. Users also sometimes forget to re-enable their firewall and antivirus software after temporarily disabling them, leaving their systems vulnerable. Additionally, making incorrect changes to advanced network settings without understanding their function can exacerbate the problem.

## Prevention Tips

To minimize the chances of encountering `ERR_CONNECTION_FAILED`, maintain a stable internet connection by ensuring your modem and router are up-to-date and in good working condition. Regularly restart your network hardware (e.g., weekly) to clear temporary glitches. Keep your operating system and Chrome browser updated, as updates often include network-related fixes and security patches. Install reputable antivirus and anti-malware software and run regular scans to prevent infections that could disrupt your network. Finally, be cautious when configuring network settings and avoid making changes unless you understand their purpose.