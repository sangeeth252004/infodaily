---
title: "How to Fix \"Your connection is not private\" Error (NET::ERR_CERT_COMMON_NAME_INVALID) in Chrome"
date: "2026-09-23T18:51:08.940Z"
slug: "how-to-fix-your-connection-is-not-private-error-net-err-cert-common-name-invalid-in-chrome"
type: "how-to"
description: "Resolve the NET::ERR_CERT_COMMON_NAME_INVALID error in Chrome with this comprehensive guide. Learn why this common privacy error occurs and follow step-by-step solutions to regain secure browsing."
keywords: "NET::ERR_CERT_COMMON_NAME_INVALID, Your connection is not private, Chrome error, SSL certificate, HTTPS, secure connection, website error, fix error, common name invalid"
---

When you attempt to visit a website in Google Chrome, you might encounter a stark red warning page stating, "Your connection is not private." Below this, you'll often see a specific error code, such as **NET::ERR_CERT_COMMON_NAME_INVALID**. This message is a critical security alert from your browser, indicating that Chrome cannot verify the identity of the website you're trying to access. It typically prevents you from proceeding to the site, safeguarding you from potentially malicious or compromised connections.

This error signifies a mismatch between the domain name you've entered in your browser's address bar and the domain name listed on the website's SSL (Secure Sockets Layer) or TLS (Transport Layer Security) certificate. SSL/TLS certificates are essential for establishing a secure, encrypted connection between your browser and the website's server. They help ensure that the data you send and receive is private and hasn't been tampered with. The **NET::ERR_CERT_COMMON_NAME_INVALID** error specifically means that the name of the website you're trying to reach is not listed as a valid name on the digital certificate presented by the server.

## Why It Happens

The **NET::ERR_CERT_COMMON_NAME_INVALID** error primarily arises due to issues with the website's SSL certificate configuration. The most common reason is that the certificate was issued for a different domain name than the one you are currently trying to access. For example, a certificate might be valid for `www.example.com` but not for `example.com`, or vice versa. This can also happen if a website uses a wildcard certificate (e.g., `*.example.com`) and you're trying to access a subdomain that isn't covered by it.

Another significant cause can be problems with the date and time settings on your computer. SSL certificates have validity periods; they expire. If your computer's clock is significantly out of sync, your browser might incorrectly perceive a valid certificate as expired or not yet valid, leading to this error. Network intermediaries, such as firewalls or proxies, that intercept and decrypt SSL traffic can also cause this error if they are not properly configured to handle the website's certificate. Finally, issues on the website's server-side, like incorrect SSL configuration or a mismanaged certificate renewal process, are often the root cause.

## Step-by-Step Solution

Here are the steps you can take to resolve the "Your connection is not private" error (NET::ERR_CERT_COMMON_NAME_INVALID) in Chrome:

## Step 1: Check Your Computer's Date and Time Settings

An incorrect date or time on your computer is a surprisingly common culprit for SSL certificate errors.

1.  **Windows:**
    *   Right-click on the clock in the taskbar and select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are turned on. If they are already on, try toggling them off and on again.
    *   Click "Sync now" to force a synchronization with time servers.
2.  **macOS:**
    *   Go to System Preferences (or System Settings on newer macOS versions) > Date & Time.
    *   Make sure "Set date and time automatically" is checked.
    *   Ensure the correct time zone is selected.

After adjusting your date and time, try reloading the website.

## Step 2: Clear Your Browser's Cache and Cookies

Corrupted cache or cookies can sometimes interfere with how Chrome handles website certificates.

1.  Open Chrome and click the three vertical dots in the top-right corner.
2.  Go to "More tools" > "Clear browsing data."
3.  In the "Time range" dropdown, select "All time."
4.  Check the boxes for "Cookies and other site data" and "Cached images and files."
5.  Click "Clear data."
6.  Close and reopen Chrome, then try visiting the website again.

## Step 3: Try Incognito Mode

Incognito mode disables extensions and doesn't use existing cookies or cache, which can help determine if one of these is the cause.

1.  Open Chrome.
2.  Click the three vertical dots in the top-right corner and select "New Incognito window."
3.  In the Incognito window, navigate to the website that was showing the error.

If the website loads correctly in Incognito mode, an extension or your regular browser data is likely the issue. You can then proceed to disable extensions (Step 4).

## Step 4: Disable Chrome Extensions

A problematic browser extension can interfere with your secure connections.

1.  Open Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Go to "Extensions" > "Manage Extensions."
4.  Systematically disable each extension by toggling its switch off.
5.  After disabling an extension, try reloading the problematic website. If the error disappears, you've found the culprit. You can then choose to keep it disabled, remove it, or check for updates for that extension.

## Step 5: Check Your Antivirus or Firewall Software

Some antivirus and firewall programs include features that scan encrypted connections. This feature, sometimes called "HTTPS scanning" or "SSL protection," can sometimes misinterpret valid certificates.

1.  Open your antivirus or firewall application.
2.  Look for settings related to web protection, network protection, or SSL/TLS scanning.
3.  Try temporarily disabling this specific feature. **Note:** Do this with caution, as it reduces your protection against certain online threats.
4.  Attempt to access the website. If it works, the antivirus/firewall setting was the cause. You might need to configure your security software to exclude the specific website or adjust its scanning settings. Re-enable the security feature afterward.

## Step 6: Proceed to the Website (Use With Extreme Caution)

Chrome provides an option to bypass this warning, but it should only be used if you are absolutely certain the website is safe and the error is a false positive.

1.  On the "Your connection is not private" error page, look for a link that says "Advanced." Click it.
2.  You should see a message like "NET::ERR_CERT_COMMON_NAME_INVALID."
3.  Below this, there will usually be a link that says "Proceed to [website address] (unsafe)."
4.  Click this link to access the website.

**Warning:** Only use this option if you are confident in the website's legitimacy. This bypasses a crucial security check and could expose you to risks if the website is indeed compromised.

## Step 7: Contact the Website Administrator

If none of the above steps resolve the issue, the problem is very likely on the website's end.

1.  Look for a "Contact Us" or "Support" link on the website (if you can access it through another browser or by bypassing the error).
2.  Inform them about the **NET::ERR_CERT_COMMON_NAME_INVALID** error you are encountering and the steps you have already taken.
3.  They may need to reissue or reconfigure their SSL certificate.

## Common Mistakes

A frequent mistake is to assume the error is always a minor glitch and to immediately click through to the website without considering the security implications. The "Proceed to [website address] (unsafe)" option should be a last resort, used only when you have a high degree of certainty that the site is trustworthy. Another common oversight is forgetting to check system-level security software like antivirus or firewalls, which often have their own SSL scanning features that can conflict with browser settings. Users might also repeatedly try clearing cache without checking their system's date and time, which is a simpler and often effective fix.

## Prevention Tips

To minimize the chances of encountering the **NET::ERR_CERT_COMMON_NAME_INVALID** error in the future, ensure your computer's operating system and browser are always updated. Updates often include patches for security vulnerabilities and improved certificate validation mechanisms. Regularly check and maintain the accuracy of your computer's date and time settings. If you manage websites, always ensure your SSL certificates are correctly configured for all intended domain variations (including `www` and non-`www` versions) and that you renew them well before they expire. For network administrators, maintaining up-to-date and correctly configured SSL inspection policies on firewalls and proxies is crucial.