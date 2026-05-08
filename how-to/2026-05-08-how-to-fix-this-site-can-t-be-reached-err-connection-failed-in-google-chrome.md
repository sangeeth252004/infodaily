---
title: "How to Fix \"This Site Can't Be Reached\" (ERR_CONNECTION_FAILED) in Google Chrome"
date: "2026-05-08T02:49:02.910Z"
slug: "how-to-fix-this-site-can-t-be-reached-err-connection-failed-in-google-chrome"
type: "how-to"
description: "Troubleshoot and resolve the frustrating \"This site can't be reached\" (ERR_CONNECTION_FAILED) error in Google Chrome with our comprehensive, step-by-step guide."
keywords: "ERR_CONNECTION_FAILED, This site can't be reached, Chrome error, fix internet connection, network troubleshooting, browser issues, Google Chrome help, connectivity problems, website not loading"
---

You're trying to access your favorite website, catch up on the news, or maybe even get some work done, and suddenly Google Chrome throws up a roadblock. Instead of the familiar webpage, you see a stark, unhelpful message: "This site can't be reached." Below that, you might find a specific error code, most commonly **ERR_CONNECTION_FAILED**. This means Chrome simply couldn't establish a connection with the server hosting the website you're trying to visit. It's a common and incredibly frustrating problem that can leave you feeling completely cut off from the online world.

This error indicates that your browser, Google Chrome, has attempted to communicate with the web server where the requested website is located but failed to receive any response. Think of it like trying to call someone, but the phone line is dead or the number doesn't exist. Chrome sent out a request, but it never got a reply back from the server. This failure can stem from a variety of issues, ranging from simple network glitches on your end to more complex problems with the website itself or the path your request takes to get there.

## Why It Happens

The "This site can't be reached" error, specifically the **ERR_CONNECTION_FAILED** variant, occurs because of a breakdown in communication between your device and the website's server. This can happen for several reasons. Your internet connection might be unstable or down, meaning your computer can't even send the request. Alternatively, the problem could lie with your computer's network settings, such as incorrect DNS (Domain Name System) information, which is like the internet's phonebook that translates website names into IP addresses. Sometimes, aggressive firewall or antivirus software can mistakenly block legitimate website connections, or your browser's cache and cookies might be corrupted, interfering with how it accesses websites. Finally, the issue could, in rare cases, be with the website's server itself, which is beyond your direct control.

Essentially, **ERR_CONNECTION_FAILED** means the pathway to the website is broken somewhere along the line. Your computer can't "see" or "talk to" the server. This could be due to a physical disconnection (your Wi-Fi is off), a logical disconnection (your computer is pointing to the wrong address for the website), or an external force (like security software) preventing the communication. Understanding these underlying causes helps us systematically address the problem.

## Step-by-Step Solution

Let's systematically work through the potential causes to get you back online.

### ## Step 1: Check Your Internet Connection

This might seem obvious, but it's the most common culprit. Before diving into more complex solutions, ensure your internet connection is actually working.

1.  **Check your Wi-Fi or Ethernet connection:** Look at your router or modem. Are the lights indicating an active internet connection?
2.  **Try visiting other websites:** Open a new tab in Chrome and try to access well-known sites like google.com, bbc.com, or wikipedia.org. If these also fail, the problem is likely with your overall internet service.
3.  **Restart your modem and router:** Unplug both your modem and router from the power outlet, wait about 30 seconds, and then plug them back in, starting with the modem. Wait for them to fully boot up (this can take a few minutes) before testing your connection again.

### ## Step 2: Clear Chrome's Cache and Cookies

Corrupted cache or cookies can sometimes prevent Chrome from loading websites correctly.

1.  **Open Chrome's "Clear browsing data" settings:** You can do this by typing `chrome://settings/clearBrowserData` into the address bar and pressing Enter.
2.  **Select a Time Range:** Choose "All time" from the dropdown menu to ensure you clear everything.
3.  **Check the boxes for "Cookies and other site data" and "Cached images and files".**
4.  **Click "Clear data".**
5.  **Restart Chrome** and try visiting the website again.

### ## Step 3: Flush Your DNS Cache and Reset Network Settings

Your computer's DNS cache might be storing outdated or incorrect information about the website's address. Resetting your network settings can also resolve underlying connectivity issues.

**For Windows Users:**

1.  **Open Command Prompt as Administrator:** Search for "cmd" in the Windows search bar, right-click on "Command Prompt," and select "Run as administrator."
2.  **Type the following commands, pressing Enter after each one:**
    *   `ipconfig /release`
    *   `ipconfig /renew`
    *   `ipconfig /flushdns`
    *   `netsh winsock reset`
    *   `netsh int ip reset`
3.  **Restart your computer** for these changes to take full effect.

**For macOS Users:**

1.  **Open Terminal:** You can find Terminal in Applications > Utilities, or by searching in Spotlight (Cmd + Space).
2.  **Type the following command and press Enter:**
    *   `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
3.  **Enter your administrator password** when prompted.
4.  **Restart your Mac.**

### ## Step 4: Check Your Firewall and Antivirus Software

Sometimes, security software can be overly cautious and block legitimate website connections.

1.  **Temporarily disable your firewall and antivirus:** Locate your antivirus program and firewall settings and temporarily disable them. **Be sure to re-enable them after testing.**
2.  **Try visiting the website:** See if the error is resolved.
3.  **If the website loads:** You'll need to configure your security software to allow Chrome or the specific website. Consult your antivirus/firewall software's documentation for instructions on adding exceptions.

### ## Step 5: Change Your DNS Server

Your Internet Service Provider (ISP) might have slow or unreliable DNS servers. Switching to a public DNS server like Google DNS or Cloudflare DNS can sometimes speed up connections and resolve this error.

**For Windows Users:**

1.  **Open Network Connections:** Search for "Network Status" in the Windows search bar, then click "Change adapter options."
2.  **Right-click on your active network adapter** (e.g., Wi-Fi or Ethernet) and select "Properties."
3.  **Select "Internet Protocol Version 4 (TCP/IPv4)"** and click "Properties."
4.  **Select "Use the following DNS server addresses."**
5.  **Enter the preferred DNS addresses:**
    *   **Google DNS:**
        *   Preferred DNS server: `8.8.8.8`
        *   Alternate DNS server: `8.8.4.4`
    *   **Cloudflare DNS:**
        *   Preferred DNS server: `1.1.1.1`
        *   Alternate DNS server: `1.0.0.1`
6.  **Click "OK"** on all open windows.
7.  **Restart Chrome** and test the website.

**For macOS Users:**

1.  **Open System Preferences.**
2.  **Click "Network."**
3.  **Select your active network connection** (Wi-Fi or Ethernet) from the left-hand list.
4.  **Click the "Advanced..." button.**
5.  **Go to the "DNS" tab.**
6.  **Click the "+" button** under "DNS Servers" to add new addresses.
7.  **Enter the preferred DNS addresses:**
    *   **Google DNS:** `8.8.8.8`, `8.8.4.4`
    *   **Cloudflare DNS:** `1.1.1.1`, `1.0.0.1`
8.  **Click "OK"** and then "Apply."
9.  **Restart Chrome** and test the website.

### ## Step 6: Check Proxy Settings

Incorrect proxy settings can block your internet access.

1.  **Open Chrome's Settings:** Type `chrome://settings/` into the address bar.
2.  **In the search bar at the top of the Settings page, type "proxy".**
3.  **Click on "Open your computer's proxy settings."** This will open your operating system's proxy configuration.
4.  **Ensure "Automatically detect settings" is ON** (if applicable) and that **no manual proxy server is entered** unless you specifically need one.
5.  **Disable any manual proxy server settings** that you don't recognize or need.
6.  **Save changes** and restart Chrome.

### ## Step 7: Test in Incognito Mode or Another Browser

This helps determine if the issue is specific to your Chrome profile or a more general network problem.

1.  **Open an Incognito window in Chrome:** Press `Ctrl+Shift+N` (Windows/Linux) or `Cmd+Shift+N` (macOS). Try visiting the website. If it works here, an extension or a specific setting in your regular Chrome profile might be the cause. You can then try disabling extensions one by one.
2.  **Try another browser:** If you have Firefox, Edge, or another browser installed, try accessing the website there. If it works in another browser, the problem is almost certainly with Chrome itself. You might consider resetting Chrome to its default settings (`chrome://settings/reset`) as a last resort, but this will remove extensions, themes, and some other settings.

## Common Mistakes

One of the most common mistakes when troubleshooting **ERR_CONNECTION_FAILED** is jumping straight to complex solutions without first verifying a stable internet connection. Many users will immediately start flushing DNS or changing network settings when the real issue is simply that their Wi-Fi has dropped or their ISP is experiencing an outage. Another frequent error is forgetting to **restart the browser or computer** after making network or DNS changes. These changes often require a system restart to be fully implemented. Furthermore, some users might incorrectly disable their antivirus or firewall without re-enabling it afterwards, leaving their system vulnerable. Lastly, attempting to fix the problem by constantly clearing cache and cookies without addressing the underlying network or DNS issues will likely be ineffective and time-consuming.

## Prevention Tips

To minimize the chances of encountering the "This site can't be reached" error again, maintain a stable internet connection by regularly checking your router and modem. Keep your network adapter drivers updated on your computer, as outdated drivers can sometimes cause connectivity issues. Regularly update your web browser, Google Chrome, to the latest version, as updates often include performance improvements and bug fixes that can address connectivity problems. Avoid installing too many browser extensions, as some might interfere with your browsing experience, and always be cautious about the security software you install, ensuring it's reputable and configured correctly to avoid accidental website blocking. Finally, periodically clearing your browser's cache and cookies can help prevent them from becoming corrupted and causing future loading issues.