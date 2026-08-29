---
title: "How to Fix the 'NET::ERR_CERT_DATE_INVALID' Error in Google Chrome"
date: "2026-08-29T18:11:02.497Z"
slug: "how-to-fix-the-net-err-cert-date-invalid-error-in-google-chrome"
type: "how-to"
description: "Learn how to resolve the 'NET::ERR_CERT_DATE_INVALID' error in Google Chrome with this comprehensive, step-by-step guide. Understand the causes and effective solutions."
keywords: "NET::ERR_CERT_DATE_INVALID, Chrome error, SSL certificate, date invalid, fix certificate error, browser security"
---

# How to Fix the 'NET::ERR_CERT_DATE_INVALID' Error in Google Chrome

Encountering the `NET::ERR_CERT_DATE_INVALID` error in Google Chrome can be a frustrating experience, often preventing you from accessing websites you rely on. When this issue arises, Chrome will typically display a "Your connection is not private" or "This site can’t be reached" page, with a specific message indicating `NET::ERR_CERT_DATE_INVALID`. This error signifies that the security certificate presented by the website is no longer valid due to an issue with its date. You might see variations of this message, such as "NET::ERR_CERT_DATE_INVALID net::err_cert_date_invalid" or "NET::ERR_CERT_DATE_INVALID privacy error." This effectively acts as a warning, as an invalid certificate can be a sign of a potential security risk, even if the underlying cause is benign.

## Problem Explanation

The `NET::ERR_CERT_DATE_INVALID` error is a security alert issued by Google Chrome when it attempts to establish a secure connection (HTTPS) with a website, but the website's SSL/TLS certificate has an expired or invalid date. This means the certificate has either passed its valid expiration date or has not yet reached its valid start date. Websites use SSL/TLS certificates to encrypt the data exchanged between your browser and the server, ensuring that your information is kept private and secure. When Chrome detects an invalid certificate date, it cannot confidently verify the identity of the website or guarantee the security of your connection, leading to the error message and blocking your access to the site.

## Why It Happens

The primary reason for the `NET::ERR_CERT_DATE_INVALID` error is a mismatch between the current date and time on your computer and the validity period of the SSL/TLS certificate installed on the website's server. Certificates have a defined lifespan, with a "Not Before" and "Not After" date. If your system clock is incorrect, Chrome might perceive a valid certificate as expired or not yet valid. Alternatively, the website's server itself might have an expired certificate that has not been renewed by the website administrator. In rare cases, this error can also be triggered by issues with your operating system's time synchronization or even by specific antivirus or firewall software that might be interfering with the SSL connection.

## Step-by-Step Solution

Here's a comprehensive approach to troubleshooting and resolving the `NET::ERR_CERT_DATE_INVALID` error in Google Chrome:

### ## Step 1: Check Your Computer's Date and Time

The most common culprit is an incorrect date or time on your computer. Even a few minutes' difference can sometimes trigger this error.

1.  **On Windows:**
    *   Right-click on the clock in the bottom-right corner of your taskbar.
    *   Select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are turned on.
    *   Click "Sync now" under "Additional clocks" if available.
    *   If the time is still incorrect, manually adjust it by turning off "Set time automatically," setting the correct date and time, and then turning "Set time automatically" back on.

2.  **On macOS:**
    *   Go to the Apple menu > System Settings (or System Preferences).
    *   Click "General" > "Date & Time."
    *   Make sure "Set date and time automatically" is checked.
    *   If it's already checked and the time is wrong, uncheck it, set the correct date and time manually, and then re-check "Set date and time automatically."

3.  **On Linux (Ubuntu Example):**
    *   Open "Settings."
    *   Navigate to "Date & Time."
    *   Ensure "Automatic Date & Time" and "Automatic Time Zone" are toggled on.
    *   If issues persist, you might need to sync your system with an NTP server. Open a terminal and run:
        ```bash
        sudo timedatectl set-nt true
        ```

### ## Step 2: Clear Chrome's Cache and Cookies

Corrupted cached data or cookies can sometimes cause unexpected browser behavior, including certificate errors.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner to open the "Menu."
3.  Hover over "More tools" and select "Clear browsing data."
4.  In the "Time range" dropdown, select "All time."
5.  Ensure "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you wish to keep it.
6.  Click "Clear data."
7.  Close and reopen Chrome, then try to access the website again.

### ## Step 3: Try Incognito Mode

Testing in Incognito mode helps determine if extensions or cached data are the cause, as Incognito mode runs without extensions and doesn't store cookies or browsing history.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Select "New Incognito window."
4.  Attempt to access the problematic website in this new window. If it works, an extension is likely the culprit. Proceed to Step 4.

### ## Step 4: Disable Chrome Extensions

If the website works in Incognito mode, one of your installed extensions might be interfering with the SSL connection.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Hover over "Extensions" and select "Manage Extensions."
4.  One by one, toggle off each extension using the switch on its card.
5.  After disabling an extension, try reloading the website.
6.  When you find the extension causing the issue, you can either keep it disabled or look for an update for it.

### ## Step 5: Check Your Antivirus or Firewall Software

Some antivirus or firewall programs have built-in "SSL scanning" or "HTTPS filtering" features that can sometimes interfere with secure connections.

1.  Temporarily disable your antivirus and/or firewall software. **(Note: Do this with caution and only for a brief test. Re-enable them immediately after testing.)**
2.  Try to access the website.
3.  If the website loads, your security software is the cause. You'll need to find the specific setting within your antivirus/firewall that handles SSL inspection and disable it or add an exception for the website. Consult your security software's documentation for specific instructions.

### ## Step 6: Reset Chrome Settings

Resetting Chrome to its default settings can resolve underlying configuration issues that might be causing the error. This process will disable extensions, clear temporary data, and reset startup pages, but it won't delete your bookmarks, history, or passwords.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Select "Settings."
4.  In the left-hand menu, click "Reset settings."
5.  Click "Restore settings to their original defaults."
6.  Click "Reset settings" in the confirmation pop-up.

### ## Step 7: Update Google Chrome

An outdated version of Chrome might have bugs or compatibility issues that could lead to this error.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Hover over "Help" and select "About Google Chrome."
4.  Chrome will automatically check for updates and prompt you to relaunch the browser if an update is available.
5.  Click "Relaunch."

## Common Mistakes

A common mistake is assuming the problem lies solely with the website itself and not investigating your local system. Many users overlook checking their computer's date and time, which is often the simplest fix. Another frequent error is randomly trying different complex solutions without systematically ruling out the basic causes, like clearing cache or testing in Incognito mode. Furthermore, some users might permanently disable their antivirus software instead of investigating its specific SSL scanning settings, leaving themselves vulnerable. Lastly, making drastic changes to system network configurations without understanding the implications can sometimes worsen the problem.

## Prevention Tips

To prevent the `NET::ERR_CERT_DATE_INVALID` error from recurring, ensure your operating system's time synchronization is always active and functioning correctly. Regularly update your web browser, Google Chrome, to the latest version, as updates often include security patches and bug fixes that address compatibility issues. Be judicious with browser extensions; only install extensions from trusted sources and periodically review them to disable or remove any that are no longer needed or that might be causing conflicts. If you manage a website, ensure that your SSL certificates are renewed well before their expiration dates to maintain a secure and uninterrupted connection for your users. For businesses, consider having a monitoring system in place to alert you of approaching certificate expirations.