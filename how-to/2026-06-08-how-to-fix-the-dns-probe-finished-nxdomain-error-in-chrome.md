---
title: "How to Fix the 'DNS_PROBE_FINISHED_NXDOMAIN' Error in Chrome"
date: "2026-06-08T14:05:36.286Z"
slug: "how-to-fix-the-dns-probe-finished-nxdomain-error-in-chrome"
type: "how-to"
description: "Learn how to resolve the common 'DNS_PROBE_FINISHED_NXDOMAIN' error in Google Chrome with this comprehensive, step-by-step troubleshooting guide."
keywords: "DNS_PROBE_FINISHED_NXDOMAIN, Chrome error, fix DNS error, website not loading, internet connection, troubleshooting, NXDOMAIN, DNS resolution"
---

When you try to visit a website in Google Chrome, you might instead be greeted with a frustrating error page. One of the most common messages you'll see is **"DNS_PROBE_FINISHED_NXDOMAIN"**. This typically appears with a plain white background and a message indicating that the website you're trying to reach could not be found. Chrome tries its best to connect you to the internet and the websites you request, but sometimes it hits a roadblock, and this error is one such sign.

This error means that your computer, through Chrome, attempted to translate a human-readable website address (like `www.example.com`) into a numerical IP address (like `192.168.1.1`) that computers use to communicate. However, the system responsible for this translation, the Domain Name System (DNS), couldn't find a record for the domain name you entered. Essentially, your computer is asking, "Where is this website?" and the DNS servers are responding, "I don't know, that domain name doesn't seem to exist."

### Why It Happens

The core of the **DNS_PROBE_FINISHED_NXDOMAIN** error lies in the DNS resolution process. When you type a URL into your browser, your computer sends a request to a DNS server. This server looks up the corresponding IP address for that domain. If the DNS server cannot find an entry for the domain name, it returns an "NXDOMAIN" (Non-Existent Domain) response. Your browser, receiving this response, displays the error you're seeing.

There are several reasons why this DNS lookup might fail. It could be a typo in the website address you entered, meaning you've requested a domain that genuinely doesn't exist or is misspelled. Alternatively, your computer's DNS cache might be holding outdated or incorrect information, leading it to believe a valid domain doesn't exist. Network issues, such as a faulty modem, router, or an unstable internet connection, can also prevent your computer from reaching the DNS servers. Finally, the DNS server itself might be experiencing problems, or the website you're trying to access might have been taken down or its domain registration expired.

## Step 1: Check the Website Address for Typos

This might seem obvious, but it's the most common culprit. A simple mistake in spelling, a missing dot, or an extra hyphen can lead to the **DNS_PROBE_FINISHED_NXDOMAIN** error. Before diving into more complex troubleshooting, carefully re-examine the URL in your browser's address bar. Type it out again slowly and ensure every character is correct.

## Step 2: Clear Chrome's DNS Cache

Your browser and operating system store a cache of recently visited websites and their corresponding IP addresses to speed up future access. However, if this cache becomes corrupted or outdated, it can cause issues like the NXDOMAIN error. Clearing this cache forces your computer to look up the DNS information again.

1.  Open Google Chrome.
2.  In the address bar, type `chrome://net-internals/#dns` and press Enter.
3.  On the left-hand side, click on **DNS**.
4.  Click the **"Clear host cache"** button.

## Step 3: Flush Your Computer's DNS Cache

Similar to Chrome's cache, your operating system also maintains its own DNS cache. Clearing this can resolve issues where the OS is providing incorrect DNS information.

*   **For Windows:**
    1.  Open the Command Prompt as an administrator. To do this, search for "cmd" in the Windows search bar, right-click on "Command Prompt," and select "Run as administrator."
    2.  In the Command Prompt window, type the following command and press Enter:
        ```bash
        ipconfig /flushdns
        ```
    3.  You should see a message confirming that the DNS Resolver Cache was successfully flushed.

*   **For macOS:**
    1.  Open the Terminal application (you can find it in Applications > Utilities or by searching with Spotlight).
    2.  The command varies slightly depending on your macOS version. For most modern versions, use:
        ```bash
        sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
        ```
    3.  Press Enter and you'll likely be prompted to enter your administrator password. Type it in (you won't see characters appear) and press Enter.

*   **For Linux:**
    1.  The command can differ based on your distribution and the DNS resolver service you're using (like systemd-resolved, dnsmasq, etc.). A common command for systems using systemd-resolved is:
        ```bash
        sudo systemd-resolve --flush-caches
        ```
    2.  If you are unsure about your specific setup, consult your Linux distribution's documentation or search online for commands relevant to your version.

## Step 4: Change Your DNS Servers

Your Internet Service Provider (ISP) typically assigns you DNS servers automatically. However, these servers can sometimes be slow or unreliable. Switching to public DNS servers like Google DNS or Cloudflare DNS can often improve performance and resolve connectivity issues.

*   **For Windows:**
    1.  Go to **Control Panel** > **Network and Internet** > **Network and Sharing Center**.
    2.  Click on **"Change adapter settings"** on the left sidebar.
    3.  Right-click on your active network connection (Wi-Fi or Ethernet) and select **Properties**.
    4.  In the properties window, find and select **"Internet Protocol Version 4 (TCP/IPv4)"**.
    5.  Click the **Properties** button.
    6.  Select the option **"Use the following DNS server addresses"**.
    7.  Enter the preferred DNS server addresses:
        *   **Google DNS:** Preferred DNS server: `8.8.8.8`, Alternate DNS server: `8.8.4.4`
        *   **Cloudflare DNS:** Preferred DNS server: `1.1.1.1`, Alternate DNS server: `1.0.0.1`
    8.  Click **OK** to save the changes, and then **Close** the windows.
    9.  You might want to flush your DNS cache again (as in Step 3) after making this change.

*   **For macOS:**
    1.  Go to **System Preferences** > **Network**.
    2.  Select your active network connection (Wi-Fi or Ethernet) on the left.
    3.  Click the **Advanced** button.
    4.  Go to the **DNS** tab.
    5.  Click the **"+"** button under the DNS Servers list.
    6.  Enter the preferred DNS server addresses (e.g., `8.8.8.8` and `8.8.4.4` for Google DNS, or `1.1.1.1` and `1.0.0.1` for Cloudflare DNS).
    7.  Click **OK**, then **Apply**.
    8.  Flush your DNS cache again (as in Step 3).

*   **For Linux:** The process varies greatly by distribution. Generally, you'll need to edit network configuration files or use network manager applets. For example, on Ubuntu with NetworkManager, you might:
    1.  Open **Settings** > **Network**.
    2.  Click the gear icon next to your active connection.
    3.  Go to the **IPv4** tab.
    4.  Toggle **"Automatic"** for DNS to **OFF**.
    5.  Enter the desired DNS server IP addresses (e.g., `8.8.8.8,8.8.4.4`) in the DNS field.
    6.  Click **Apply**.
    7.  Flush your DNS cache again (as in Step 3).

## Step 5: Reset Chrome's Network Settings

Chrome has its own internal network settings that can sometimes become misconfigured. Resetting these can help.

1.  Open Google Chrome.
2.  In the address bar, type `chrome://settings/reset` and press Enter.
3.  Click on **"Restore settings to their original defaults."**
4.  In the confirmation pop-up, click **"Reset settings."**
    *Note: This will reset your startup page, new tab page, search engine, and pinned tabs. It will also disable extensions and clear temporary data like cookies. Your bookmarks, history, and passwords will not be cleared.*

## Step 6: Restart Your Router and Modem

A simple restart of your network hardware can resolve many intermittent connectivity issues, including DNS problems.

1.  Unplug the power cables from both your modem and your router.
2.  Wait for at least 30-60 seconds.
3.  Plug the modem back in first and wait for its lights to stabilize (usually 1-2 minutes).
4.  Plug the router back in and wait for its lights to stabilize.
5.  Once both devices are fully powered up and connected, try accessing the website again in Chrome.

## Step 7: Check Your Hosts File

The hosts file on your computer allows you to manually map domain names to IP addresses. If an incorrect entry exists in your hosts file, it can redirect or block access to legitimate websites, leading to the **DNS_PROBE_FINISHED_NXDOMAIN** error.

*   **For Windows:**
    1.  Open Notepad as an administrator. Search for "Notepad" in the Windows search bar, right-click it, and select "Run as administrator."
    2.  In Notepad, go to **File** > **Open**.
    3.  Navigate to `C:\Windows\System32\drivers\etc\`
    4.  In the "File name" field at the bottom, change the file type from "Text Documents (*.txt)" to "All Files (*.*)".
    5.  Select the `hosts` file and click **Open**.
    6.  Look for any lines that might be associated with the website you're trying to access or any unusual entries. If you find anything suspicious, you can comment it out by placing a `#` symbol at the beginning of the line, or delete the line entirely. **Be very careful not to delete essential system entries.** If unsure, it's best to leave it untouched.
    7.  Save the file by going to **File** > **Save**.

*   **For macOS:**
    1.  Open Terminal.
    2.  Type `sudo nano /private/etc/hosts` and press Enter.
    3.  Enter your administrator password when prompted.
    4.  Carefully review the contents for any erroneous entries related to the website you're having trouble with. Comment out or delete suspicious lines by placing a `#` at the beginning of the line.
    5.  Press **Ctrl+X** to exit, then **Y** to confirm saving, and **Enter** to save with the same filename.

## Common Mistakes

A frequent oversight is **not restarting the browser or computer** after making changes. Many of the steps, especially those involving flushing caches or changing DNS settings, require a fresh start to take effect. Another common pitfall is **incorrectly entering IP addresses** when changing DNS servers. Double-check that you've typed the numbers precisely as they should be. Some users also make the mistake of **modifying their hosts file without understanding its purpose**, potentially breaking access to other sites or system functions. If you're unsure about a line in your hosts file, it's safer to leave it alone or back it up before making changes.

## Prevention Tips

To minimize the chances of encountering the **DNS_PROBE_FINISHED_NXDOMAIN** error in the future, **regularly clear your browser's DNS cache** and **flush your operating system's DNS cache**, especially if you notice slow browsing or connection issues. **Using reliable public DNS servers** like Google DNS or Cloudflare DNS can also contribute to a more stable internet experience. Ensure your **router and modem firmware are up to date**, as outdated software can lead to compatibility problems. Finally, **maintain a healthy internet connection** by checking your ISP's service status and ensuring your networking hardware is functioning correctly.