---
title: "How to Fix 'Your connection is not private' (NET::ERR_CERT_COMMON_NAME_INVALID) Error in Chrome"
date: "2026-11-14T23:38:12.717Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-common-name-invalid-error-in-chrome"
type: "how-to"
description: "Solve the NET::ERR_CERT_COMMON_NAME_INVALID error in Chrome. Learn why your connection is not private and get step-by-step solutions to restore secure browsing."
keywords: "NET::ERR_CERT_COMMON_NAME_INVALID, Chrome error, connection not private, SSL certificate error, common name invalid, fix connection error, Chrome security, browser fix, TLS error"
---

### Problem Explanation

Encountering the "Your connection is not private" error message in Google Chrome can be a frustrating roadblock to accessing websites. Instead of the page you intended to visit, Chrome displays a full-page warning, often featuring a prominent red lock icon and the stark message: "Attackers might be trying to steal your information from [website name] (for example, passwords, messages, or credit cards)." While this generic warning covers several underlying issues, the specific problem we're addressing today is identified by the error code **NET::ERR_CERT_COMMON_NAME_INVALID**. You'll typically find this detailed error code when you click the "Advanced" button on the warning page.

This error essentially means that the security certificate presented by the website doesn't match the domain name you're trying to access. Chrome, acting as your digital bodyguard, detects this mismatch and blocks the connection, assuming it could be an attempt to trick you into connecting to a malicious site or an intercepted connection. It's a critical security warning, indicating a potential vulnerability or misconfiguration that needs to be addressed before you can safely proceed.

### Why It Happens

The **NET::ERR_CERT_COMMON_NAME_INVALID** error specifically points to an issue with the "Common Name" (CN) or "Subject Alternative Name" (SAN) in a website's SSL/TLS certificate. When you visit a secure website (HTTPS), the site presents a digital certificate to your browser. This certificate contains information, including the domain name it's issued for (its Common Name). Chrome checks if this name matches the domain name you typed in the address bar. If there's a mismatch, the error occurs.

There are several common scenarios that can trigger this problem. The most straightforward is when a website administrator has incorrectly configured their SSL certificate, perhaps by issuing it for `example.com` but users are trying to access `www.example.com`, or vice versa, without proper redirects or SAN entries. Another common cause, especially in corporate or public Wi-Fi environments, is a proxy server or security software intercepting your connection and presenting its own, generic certificate, which won't match the destination website. Less common but still possible causes include local DNS resolution issues where your computer tries to connect to an incorrect IP address, or even malware/browser extensions attempting to interfere with secure connections, leading to the certificate mismatch.

### Step-by-Step Solution

Let's walk through the steps to diagnose and resolve the **NET::ERR_CERT_COMMON_NAME_INVALID** error. Work through these methodically to pinpoint the cause.

#### ## Step 1: Verify the URL and Try Incognito Mode

First, double-check that you've typed the website's address correctly. A simple typo can lead to this error if the mistyped domain happens to have an unrelated certificate.

After confirming the URL, try accessing the website in an Incognito window. Incognito mode in Chrome opens a clean browsing session, free from cached data, cookies, and most extensions. If the website loads correctly in Incognito, it suggests that a cached file, cookie, or one of your browser extensions is interfering with the connection.

To open an Incognito window:
*   Click the **three vertical dots** in the top right corner of Chrome.
*   Select **"New Incognito window"** (or use the shortcut `Ctrl+Shift+N` on Windows/Linux or `Cmd+Shift+N` on macOS).

#### ## Step 2: Clear Your Browser's Cache and Cookies

If Incognito mode resolves the issue, clearing your browser's data is a strong next step. Outdated or corrupted cache files and cookies can sometimes cause certificate validation problems.

1.  Open Chrome settings by typing `chrome://settings/clearBrowserData` into the address bar and pressing Enter.
2.  In the "Clear browsing data" window, select the "Advanced" tab.
3.  Set the "Time range" to **"All time"**.
4.  Ensure that **"Cached images and files"** and **"Cookies and other site data"** are checked. You may also check "Browser history" if you wish, but it's not strictly necessary for this error.
5.  Click the **"Clear data"** button.
6.  Restart Chrome completely before attempting to access the website again.

#### ## Step 3: Check Your System's Date and Time Settings

An incorrect date and time on your computer can cause Chrome to believe that a website's SSL certificate is either expired or not yet valid. Certificates have specific validity periods, and if your system's clock is out of sync, Chrome won't be able to accurately verify them.

**For Windows:**
1.  Right-click the clock in your taskbar and select **"Adjust date/time"**.
2.  Ensure that **"Set time automatically"** and **"Set time zone automatically"** are both turned **On**.
3.  Click **"Sync now"** under "Synchronize your clock" to force an immediate synchronization with an internet time server.

**For macOS:**
1.  Go to **Apple menu > System Settings**.
2.  Click **"General"** in the sidebar, then click **"Date & Time"** on the right.
3.  Make sure **"Set date and time automatically"** and **"Set time zone automatically using your current location"** are both checked.

After adjusting, restart your browser and check the website.

#### ## Step 4: Temporarily Disable Browser Extensions

As identified in Step 1, a problematic browser extension can interfere with secure connections. If the website works in Incognito mode, an extension is a likely culprit.

1.  Type `chrome://extensions/` into your Chrome address bar and press Enter.
2.  You'll see a list of all installed extensions.
3.  **Disable all extensions** by toggling off the blue switch next to each one.
4.  Restart Chrome and try to access the problematic website.
5.  If the website loads, re-enable your extensions one by one, testing the website after each re-enablement, until you find the one causing the conflict. Once identified, you can either keep it disabled, look for an alternative, or update it.

#### ## Step 5: Review Antivirus and Firewall Software Settings

Some antivirus programs and network firewalls include features like "HTTPS scanning," "SSL inspection," or "web shield" that intercept secure connections to scan for threats. While well-intentioned, this interception can sometimes replace a website's legitimate certificate with one generated by the security software, leading to the `NET::ERR_CERT_COMMON_NAME_INVALID` error.

1.  **Temporarily disable** your antivirus program's web protection or HTTPS scanning feature. Consult your specific antivirus software's documentation for instructions on how to do this. Be mindful that this temporarily reduces your protection, so re-enable it quickly after testing.
2.  Try accessing the website again.
3.  If the issue is resolved, you'll need to configure your antivirus to either trust the specific website or disable the problematic scanning feature permanently (if you're comfortable with the security implications). Alternatively, you might need to install the antivirus's root certificate into your system's trusted store, a process also specific to each software.

#### ## Step 6: Flush Your DNS Cache and Reset Network Settings

Your computer maintains a cache of DNS (Domain Name System) lookups, which helps it quickly find websites. If this cache contains an outdated or incorrect entry for a website, it could lead to connecting to the wrong server, thus causing a certificate mismatch. Resetting your network's Winsock catalog can also resolve various connectivity issues.

**For Windows:**
1.  Open the Start Menu, type `cmd`, right-click on "Command Prompt," and select **"Run as administrator."**
2.  In the Command Prompt window, type the following command and press Enter:
    `ipconfig /flushdns`
3.  You should see a confirmation message: "Successfully flushed the DNS Resolver Cache."
4.  Next, type the following command and press Enter:
    `netsh winsock reset`
5.  You'll be prompted to restart your computer. Do so.

**For macOS:**
1.  Open **Terminal** (Applications > Utilities > Terminal).
2.  Type the following command and press Enter:
    `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
3.  You may be prompted for your administrator password. Enter it and press Enter.

After performing these steps and restarting your computer (Windows), test the website again.

#### ## Step 7: Update Chrome and Your Operating System

Outdated browser versions can sometimes have compatibility issues with newer SSL/TLS certificate standards or lack updated root certificate stores required to validate modern certificates. Similarly, your operating system maintains its own store of trusted root certificates, and if it's outdated, it might not recognize newer certificate authorities.

1.  **Update Google Chrome:**
    *   Open Chrome.
    *   Click the **three vertical dots** in the top right corner.
    *   Go to **Help > About Google Chrome**.
    *   Chrome will automatically check for updates and install them. You'll be prompted to relaunch the browser.
2.  **Update Your Operating System:**
    *   **Windows:** Go to `Settings > Update & Security > Windows Update` and check for updates.
    *   **macOS:** Go to **Apple menu > System Settings > General > Software Update** and check for updates.

Keeping both your browser and operating system up-to-date ensures you have the latest security patches and certificate trust lists.

### Common Mistakes

When troubleshooting the `NET::ERR_CERT_COMMON_NAME_INVALID` error, users often make a few common mistakes:

*   **Ignoring the Specific Error Code:** Many users see "Your connection is not private" and immediately think of generic fixes, overlooking the `NET::ERR_CERT_COMMON_NAME_INVALID` detail that points to a specific certificate mismatch. Always check the "Advanced" section for the precise error code.
*   **Assuming it's Always the Website's Fault:** While a misconfigured server is a possibility, it's a mistake to overlook local factors like incorrect system time, aggressive antivirus software, or browser extensions. Many fixes are client-side.
*   **Proceeding Unsafely:** Although Chrome offers an "Proceed to [website] (unsafe)" option, it should almost never be used when encountering this specific error. Doing so bypasses critical security checks and can expose your data to potential attackers, especially given that this error indicates a direct mismatch in the security identity.
*   **Disabling Security Software Permanently:** Temporarily disabling antivirus or firewall is a valid diagnostic step. However, forgetting to re-enable it or permanently disabling it exposes your system to risks. If your security software is the culprit, look for specific configuration options rather than turning it off entirely.
*   **Not Restarting:** After making significant changes like clearing cache, flushing DNS, or updating software, failing to restart Chrome or your entire computer can prevent the changes from taking full effect.

### Prevention Tips

Preventing the `NET::ERR_CERT_COMMON_NAME_INVALID` error from recurring involves a combination of good browsing habits and system maintenance:

*   **Keep Your Software Updated:** Regularly update Google Chrome and your operating system. These updates often include critical security patches, improved certificate validation protocols, and refreshed root certificate lists, all of which are essential for secure browsing.
*   **Be Mindful of Browser Extensions:** Install extensions only from trusted sources and regularly review your installed extensions. If you experience unexpected browsing issues, consider temporarily disabling extensions to rule them out as a cause.
*   **Maintain Correct System Date and Time:** Ensure your computer's date and time are set to synchronize automatically with an internet time server. This is a fundamental security practice that prevents many certificate-related errors.
*   **Understand Your Network Environment:** If you're on a corporate network or public Wi-Fi, be aware that network-level proxies or security appliances might be inspecting your traffic. If you frequently encounter this error in such environments, consulting your network administrator might be necessary.
*   **Verify URLs Carefully:** Always double-check the URL in your address bar, especially when clicking links from emails or social media. This habit helps ensure you're connecting to the intended site and not a spoofed version.
*   **Configure Antivirus/Firewall Intelligently:** If your security software performs HTTPS/SSL inspection, ensure it's correctly configured and, if necessary, its root certificate is properly installed in your system's trust store. This allows it to perform its protective functions without causing legitimate certificate mismatches.