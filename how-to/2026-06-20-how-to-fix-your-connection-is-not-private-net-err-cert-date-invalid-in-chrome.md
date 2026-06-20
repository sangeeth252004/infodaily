---
title: "How to Fix \"Your connection is not private\" (NET::ERR_CERT_DATE_INVALID) in Chrome"
date: "2026-06-20T11:55:23.173Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-date-invalid-in-chrome"
type: "how-to"
description: "Learn how to resolve the \"Your connection is not private\" error in Chrome, specifically the NET::ERR_CERT_DATE_INVALID error. Follow our step-by-step guide to fix this common issue."
keywords: "NET::ERR_CERT_DATE_INVALID, Your connection is not private, Chrome error, fix security error, SSL certificate error, date invalid, internet connection error"
---

# How to Fix "Your connection is not private" (NET::ERR_CERT_DATE_INVALID) in Chrome

You're trying to visit a website, perhaps to check your bank account, read the news, or buy something online. Suddenly, instead of the familiar webpage, you're greeted with a stark, red warning screen. It reads: "Your connection is not private" and beneath it, the technical detail "NET::ERR_CERT_DATE_INVALID". This message is alarming, and it effectively blocks you from accessing the site, leaving you wondering what went wrong and how to get back online.

This error message, "NET::ERR_CERT_DATE_INVALID," specifically means that the security certificate presented by the website you're trying to visit is no longer valid because its date has expired. Websites use SSL/TLS certificates to encrypt your connection, ensuring that the data exchanged between your browser and the website is secure and private. These certificates have a specific lifespan, and when that lifespan ends, they become invalid. Chrome, being a security-conscious browser, flags this as a significant risk, preventing you from proceeding to a site that might be compromised or impersonating a legitimate one.

## Why It Happens

The core reason for the "NET::ERR_CERT_DATE_INVALID" error lies in the validation of the website's SSL/TLS certificate. This certificate is issued by a trusted Certificate Authority (CA) and contains information about the website's identity, along with a validity period. When you attempt to connect to a website, your browser checks this certificate. If the current date falls outside the "Valid from" and "Valid to" dates listed on the certificate, Chrome will display this error. This usually means the website's administrator has not renewed their certificate in time, or there's a discrepancy with your computer's clock.

While the most common culprit is an expired certificate on the website's end, there's another significant possibility: your computer's date and time might be incorrect. Browsers rely on your system's clock to verify the validity of SSL certificates. If your computer's clock is significantly ahead or behind, it can falsely interpret a valid certificate as expired or not yet valid. It's a fundamental check that ensures the integrity of your online security.

## Step-by-Step Solution

Here's how to tackle the "Your connection is not private" (NET::ERR_CERT_DATE_INVALID) error:

### ## Step 1: Check Your System's Date and Time

This is the simplest and often most effective fix. An incorrect system clock is a frequent cause of certificate date validation issues.

1.  **For Windows:**
    *   Right-click on the clock in the bottom-right corner of your screen.
    *   Select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are toggled ON. If they are already on, toggle them OFF and then back ON.
    *   Click "Sync now" to force a time synchronization.
    *   Close the settings and try accessing the website again.

2.  **For macOS:**
    *   Go to Apple menu > System Settings (or System Preferences).
    *   Click on "General" in the sidebar, then click "Date & Time."
    *   Make sure "Set date and time automatically" is checked. If it is, uncheck it, wait a few seconds, and then check it again.
    *   Click "Set Date and Time" to manually verify and set it if needed, then click "OK."
    *   Close the settings and attempt to load the website.

### ## Step 2: Clear Your Browser's Cache and Cookies

Outdated cache or cookie data can sometimes interfere with secure connections and lead to this error.

1.  Open Google Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner to open the Chrome menu.
3.  Hover over "More tools" and then select "Clear browsing data."
4.  In the "Time range" dropdown, select "All time."
5.  Make sure "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you prefer to keep it.
6.  Click the "Clear data" button.
7.  After the process completes, close and reopen Chrome, then try to access the website.

### ## Step 3: Try Incognito Mode

Incognito mode disables extensions and doesn't use existing cookies, which can help determine if either of these is causing the problem.

1.  Open Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner.
3.  Select "New Incognito window."
4.  In the Incognito window, try navigating to the website that was giving you the error.
5.  If the website loads correctly in Incognito mode, an extension or corrupted browser data is likely the cause. You'll need to investigate your extensions (see Step 4).

### ## Step 4: Disable Chrome Extensions

Conflicting or outdated browser extensions can interfere with SSL/TLS connections.

1.  Open Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner.
3.  Hover over "Extensions" and then select "Manage Extensions."
4.  Go through your list of installed extensions. For each one, toggle the switch OFF to disable it.
5.  After disabling each extension one by one, try refreshing the problematic website. When the website loads successfully, you've found the culprit.
6.  Once identified, you can either keep the extension disabled, uninstall it, or check for updates for that specific extension.

### ## Step 5: Check Your Antivirus or Firewall Software

Some antivirus or firewall programs have features that scan encrypted connections (SSL/HTTPS scanning). This feature can sometimes incorrectly flag legitimate certificates.

1.  Temporarily disable your antivirus and firewall software. Refer to your software's documentation for instructions on how to do this.
2.  Try accessing the website again.
3.  If the website loads, the antivirus or firewall was the cause. You'll need to go into its settings and find an option related to "HTTPS scanning," "SSL scanning," or "Encrypted connection scanning" and disable it. Alternatively, you might be able to add the specific website to an exception list.
4.  **Important:** Remember to re-enable your antivirus and firewall software after testing.

### ## Step 6: Try Accessing the Website on a Different Device or Network

This helps determine if the issue is specific to your computer or your current internet connection.

1.  Attempt to access the website from another device (e.g., a smartphone on mobile data, a different computer on the same network).
2.  If the website works on another device on the same network, the problem is likely with your Chrome browser or system settings on the original device.
3.  If the website fails on all devices on your current network, the issue might be with your router or your Internet Service Provider (ISP). You could try restarting your router by unplugging it for 30 seconds and plugging it back in.

### ## Step 7: Proceed with Caution (If You Understand the Risks)

Chrome presents this warning for a reason, and generally, you should heed it. However, if you are absolutely certain the website is legitimate and you understand the risks, there's an option to bypass the warning for that specific session.

1.  On the "Your connection is not private" error page, look for a link that says "Advanced."
2.  Click on "Advanced."
3.  You should see a message like "This site can’t be reached" followed by the specific error code. Below this, you might see a link that says "Proceed to [website address] (unsafe)."
4.  Click this link.
5.  **Warning:** Use this option with extreme caution. You are explicitly telling Chrome to ignore the security warning, which could expose you to risks if the website is indeed compromised or not what it appears to be. This bypass is usually temporary and may need to be re-done if you close and reopen Chrome.

## Common Mistakes

One common mistake is immediately trying to bypass the warning by clicking "Proceed to [website address] (unsafe)." While this might grant access, it bypasses crucial security checks and can leave you vulnerable to malicious sites. Users often forget to check their system's date and time, which is the simplest and most probable fix, jumping straight to more complex troubleshooting. Another pitfall is assuming the problem is solely with the website; it could easily be a configuration issue on your end, such as an overzealous antivirus or a problematic browser extension. Lastly, forgetting to re-enable security software after testing can leave your system unprotected.

## Prevention Tips

To minimize the chances of encountering the "NET::ERR_CERT_DATE_INVALID" error, always ensure your computer's date and time are set to synchronize automatically. Regularly update your operating system and web browser, as updates often include security patches and improved certificate handling. Be cautious about installing too many browser extensions, and periodically review and disable those you don't actively use. If you manage a website, ensure your SSL/TLS certificates are renewed well before their expiration date and that your web server is configured correctly to handle certificate validation. Keeping your antivirus and firewall software up-to-date and configured appropriately, with proper settings for scanning encrypted connections, can also help prevent conflicts.