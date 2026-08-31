---
title: "How to Fix \"Your connection is not private\" (NET::ERR_CERT_DATE_INVALID) in Chrome"
date: "2026-08-31T03:43:06.551Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-date-invalid-in-chrome"
type: "how-to"
description: "Solve the frustrating \"Your connection is not private\" error (NET::ERR_CERT_DATE_INVALID) in Google Chrome with this comprehensive, step-by-step guide. Learn why it happens and how to fix it."
keywords: "Chrome error, NET::ERR_CERT_DATE_INVALID, connection not private, SSL certificate error, fix Chrome error, browser security, certificate date invalid"
---

You're trying to visit a website, maybe your bank or your favorite online store, and instead of seeing the familiar page, you're met with a stark, red warning: "Your connection is not private." Below that, you might see an error code like `NET::ERR_CERT_DATE_INVALID`. This message is unsettling because it suggests something is wrong with the security of your connection, potentially exposing your sensitive information. It’s a common, albeit alarming, roadblock that prevents you from accessing the content you need.

This error essentially means that Chrome can't verify the identity of the website you're trying to reach because its security certificate has expired or is invalid for some reason. Think of a security certificate like an ID card for a website. It proves that the website is who it says it is and that your connection to it is encrypted and secure. When this "ID card" is out of date or corrupted, Chrome can't trust the website, and it stops you from proceeding to protect you from potentially malicious sites.

### Why It Happens

The `NET::ERR_CERT_DATE_INVALID` error specifically points to an issue with the validity dates of the website's SSL/TLS certificate. Every security certificate has a "valid from" and "expires on" date. Websites must renew these certificates before they expire to maintain a secure connection. If a website's certificate has passed its expiration date, or if the date on your computer is significantly different from the actual date, Chrome will flag it as invalid. This could be due to the website owner neglecting to renew their certificate, or more commonly, an issue with your own computer's date and time settings.

Another less common, but still possible, reason is that your operating system might not trust the certificate authority that issued the website's certificate. This can sometimes happen with older operating systems or if specific root certificates are missing. However, the most frequent culprit by far is an incorrect system clock. If your computer’s date or time is wrong, it can cause all sorts of security-related issues, including this one, because the browser is trying to validate a certificate based on a faulty timeline.

### Step-by-Step Solution

Here’s how to tackle the "Your connection is not private" error when it’s caused by `NET::ERR_CERT_DATE_INVALID`:

## Step 1: Check Your Computer's Date and Time

This is the most common fix, so start here. An incorrect system clock can throw off the validation of security certificates.

*   **On Windows:**
    1.  Right-click on the clock in the taskbar (bottom-right corner).
    2.  Select "Adjust date/time."
    3.  Ensure that "Set time automatically" and "Set time zone automatically" are turned on.
    4.  If they are already on, try turning them off, manually setting the correct date and time, and then turning them back on.
    5.  Click "Sync now" to ensure your system clock is up-to-date.

*   **On macOS:**
    1.  Go to the Apple menu () > System Settings (or System Preferences).
    2.  Click "General" > "Date & Time."
    3.  Make sure "Set date and time automatically" is checked.
    4.  If it is already checked, uncheck it, manually set the correct date and time, and then re-check it.
    5.  Ensure the correct time zone is selected.

After adjusting your date and time, close all Chrome windows and reopen Chrome. Try visiting the website again.

## Step 2: Clear Chrome's Cache and Cookies

Sometimes, outdated cached data can interfere with website security checks. Clearing these can force Chrome to fetch fresh information.

1.  Open Google Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner to open the menu.
3.  Hover over "More tools" and then click "Clear browsing data."
4.  In the "Time range" dropdown, select "All time."
5.  Make sure "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you wish to keep it.
6.  Click "Clear data."
7.  Restart Chrome and try the website again.

## Step 3: Try Incognito Mode

Incognito mode in Chrome doesn't use existing cookies or cached data, which can help determine if the issue is related to your browser's stored information.

1.  Open Google Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner.
3.  Select "New incognito window."
4.  In the incognito window, try to access the website.

If the website loads correctly in incognito mode, it strongly suggests that the problem is with your Chrome profile, extensions, or cached data.

## Step 4: Disable Chrome Extensions

Certain extensions can sometimes interfere with secure connections. Temporarily disabling them can help isolate the cause.

1.  Open Google Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner.
3.  Hover over "Extensions" and then click "Manage Extensions."
4.  Toggle off each extension one by one.
5.  After disabling an extension, try visiting the website. If the website loads, the last extension you disabled is likely the culprit. You can then decide to keep it disabled, remove it, or look for an update.

## Step 5: Check Your Antivirus or Firewall Software

Occasionally, overzealous antivirus or firewall software can mistakenly block secure website connections.

1.  Temporarily disable your antivirus or firewall software. **Be very cautious when doing this and re-enable it immediately after testing.**
2.  Try to access the website in Chrome.
3.  If the website loads, the issue lies with your security software. You'll need to access your antivirus/firewall settings and look for an option to whitelist the website or disable "HTTPS scanning" or "SSL inspection" for specific sites or temporarily. Consult your security software's documentation for detailed instructions.

## Step 6: Try a Different Browser

To confirm if the issue is specific to Chrome, try accessing the website using another browser like Firefox, Edge, or Safari.

1.  Open your preferred alternative browser.
2.  Navigate to the website that was giving you the error in Chrome.

If the website works in another browser, the problem is definitely within your Chrome installation or settings. If it also fails in other browsers, the problem is more likely with the website itself or your network.

## Step 7: Reset Chrome Settings

If none of the above steps work, you can try resetting Chrome to its default settings. This will disable extensions, clear temporary data, and reset startup pages, new tab pages, search engines, and pinned tabs. Your bookmarks, history, and passwords will not be cleared.

1.  Open Google Chrome.
2.  Click the three vertical dots (⋮) in the top-right corner.
3.  Click "Settings."
4.  Scroll down and click "Advanced."
5.  Under "Reset and clean up," click "Restore settings to their original defaults."
6.  Click "Reset settings" in the confirmation pop-up.
7.  Restart Chrome and try accessing the website.

### Common Mistakes

One common mistake is immediately trying to bypass the warning by clicking the "Proceed to [website name] (unsafe)" link. While this might let you access the site, it defeats the purpose of the security warning and leaves your connection vulnerable. Another frequent error is assuming the problem is with the website when it's actually your computer's clock that is out of sync – this is why checking your system date and time is the crucial first step. Some users also forget to re-enable their antivirus after testing, leaving their system exposed. Lastly, attempting to fix the issue by simply clearing browsing history without clearing cache and cookies can be insufficient.

### Prevention Tips

To prevent the `NET::ERR_CERT_DATE_INVALID` error from recurring, the most important step is to ensure your computer's date and time are always set automatically. This synchronizes your system clock with reliable time servers, preventing most date-related certificate issues. Regularly update your operating system and browser; updates often include fixes for security vulnerabilities and improve certificate handling. If you manage websites, ensure you have a robust system for monitoring certificate expiration dates and renewing them well in advance. For general users, being mindful of your antivirus software's settings and occasionally checking for updates to both your browser and security software can go a long way in maintaining a secure and smooth online experience.