---
title: "How to Fix \"Your connection is not private\" (NET::ERR_CERT_DATE_INVALID) in Chrome"
date: "2026-08-02T11:15:29.269Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-date-invalid-in-chrome"
type: "how-to"
description: "Learn how to resolve the Chrome error \"Your connection is not private\" with the NET::ERR_CERT_DATE_INVALID code. This guide provides step-by-step solutions for system clock, browser, and security software issues."
keywords: "NET::ERR_CERT_DATE_INVALID, Chrome error, connection not private, SSL certificate invalid date, fix certificate error, system clock sync, Chrome security, browser fix"
---

## Problem Explanation

When attempting to access a website using Google Chrome, users may encounter a full-page error displaying "Your connection is not private." This message indicates that Chrome detected a potential security risk in the connection, preventing it from securely establishing communication with the website's server. While this generic message can be triggered by various underlying issues, this guide specifically addresses the `NET::ERR_CERT_DATE_INVALID` error code, which is usually visible beneath the main heading or by clicking "Advanced" on the error page.

This particular error signifies that the SSL/TLS certificate presented by the website server has a date validation problem. The page will typically display an icon of a padlock with a red cross or a broken padlock, alongside text warning about attackers potentially stealing information. The key identifier here is the `NET::ERR_CERT_DATE_INVALID` code, confirming the issue is related to the certificate's validity period.

## Why It Happens

The `NET::ERR_CERT_DATE_INVALID` error occurs when Chrome detects that the SSL/TLS certificate presented by a website is either expired or not yet valid according to the system's current date and time. SSL/TLS certificates are digital documents that authenticate the identity of a website and encrypt communication between your browser and the server. Every certificate has a specific "valid from" and "valid to" date range.

The most common root cause for this specific error is an incorrect date and time setting on the user's computer or device. If your system clock is significantly out of sync with the actual global time, Chrome will evaluate the website's certificate against your incorrect local time and determine that the certificate is either expired (if your clock is set in the past) or not yet valid (if your clock is set too far in the future). Less common, but possible, causes include an actual expired certificate on the website's server, an outdated browser lacking current root certificates, or interference from security software performing SSL inspection without properly handling certificate dates.

## Step-by-Step Solution

### 1. Verify and Correct System Date and Time

The primary cause of `NET::ERR_CERT_DATE_INVALID` is an incorrect system clock. Ensure your operating system's date and time are accurate and synchronized automatically.

*   **For Windows:**
    1.  Right-click the clock in the bottom-right corner of your taskbar.
    2.  Select "Adjust date and time."
    3.  Toggle "Set time automatically" to **On**.
    4.  Toggle "Set time zone automatically" to **On**.
    5.  Click "Sync now" under "Synchronize your clock" to force an immediate synchronization.
    6.  Restart Chrome and attempt to access the website.

*   **For macOS:**
    1.  Click the Apple menu in the top-left corner and select "System Settings" (or "System Preferences" on older versions).
    2.  Navigate to "General" > "Date & Time."
    3.  Ensure "Set date and time automatically" is enabled. If it's disabled, click the padlock to unlock settings and enable it.
    4.  Verify that the correct time zone is selected, or enable "Set time zone automatically."
    5.  Close System Settings and restart Chrome.

After correcting your system time, restart your browser and re-test the website.

### 2. Clear Chrome Browser Data

Outdated cached data, including old certificate information or corrupted browser files, can sometimes lead to this error even if your system time is correct. Clearing browsing data can resolve such inconsistencies.

1.  Open Chrome.
2.  Click the three-dot menu icon in the top-right corner.
3.  Go to "More tools" > "Clear browsing data."
4.  In the "Time range" dropdown, select "All time."
5.  Ensure that "Cookies and other site data" and "Cached images and files" are checked. Deselect other options if you wish to retain them.
6.  Click "Clear data."
7.  Close and reopen Chrome, then try accessing the website again.

### 3. Check Antivirus/Firewall Settings

Some security software, particularly those with features like "HTTPS scanning," "SSL inspection," or "web protection," can intercept and re-sign SSL certificates. If this process goes awry or uses outdated internal certificates, it can trigger `NET::ERR_CERT_DATE_INVALID`.

1.  Temporarily disable your antivirus or firewall software (consult your specific software's documentation for instructions).
2.  With the security software disabled, attempt to access the problematic website in Chrome.
3.  If the error resolves, re-enable your security software. Then, investigate its settings for options related to "HTTPS scanning," "SSL inspection," or "web protection." Try disabling these specific features within the security software, or adding an exception for Chrome or the problematic website if possible.
4.  If the issue persists, ensure your security software is fully updated.

Remember to re-enable your security software fully once testing is complete, or if disabling it does not resolve the issue. Running without protection is not advisable.

### 4. Update Google Chrome

An outdated version of Chrome might contain bugs, or it might not have the latest root certificates required to validate newer website certificates. Ensuring your browser is up-to-date is a fundamental troubleshooting step.

1.  Open Chrome.
2.  Click the three-dot menu icon in the top-right corner.
3.  Go to "Help" > "About Google Chrome."
4.  Chrome will automatically check for and install any available updates.
5.  If an update is installed, you will be prompted to "Relaunch" the browser. Click this button.
6.  After Chrome restarts, attempt to access the website again.

### 5. Update Operating System

Similar to browser updates, an outdated operating system might lack crucial security updates, updated root certificate bundles, or patches that address certificate validation issues.

*   **For Windows:**
    1.  Go to "Start" > "Settings" > "Windows Update."
    2.  Click "Check for updates" and install any available updates.
    3.  Restart your computer if prompted.

*   **For macOS:**
    1.  Click the Apple menu in the top-left corner and select "System Settings" (or "System Preferences").
    2.  Go to "General" > "Software Update."
    3.  Install any available macOS updates.
    4.  Restart your computer if prompted.

After updating your OS, restart your machine and re-test Chrome.

### 6. Examine SSL Certificate Details (Advanced)

If the error persists, inspecting the certificate details can provide insight into whether the issue truly lies with the website's certificate or your client configuration.

1.  When the "Your connection is not private" error page appears, click the "Not secure" indicator (or padlock icon with an error) next to the URL in the address bar.
2.  Select "Connection is not secure" (or "Certificate (Invalid)").
3.  Click "Certificate is not valid" (or "Certificate viewer" for more details).
4.  A certificate viewer window will appear. Look specifically for the "Valid from" and "Valid to" dates.
5.  Compare these dates to your system's current date and time. If your system time is correct and the certificate's "Valid to" date is in the past, or "Valid from" date is in the future, then the website itself is using an invalid certificate. If the certificate dates are valid, this suggests a client-side issue not related to the certificate's actual validity period (e.g., cached data, security software).
6.  If the certificate on the website is genuinely invalid, there is no client-side fix beyond waiting for the website administrator to update their certificate.

### 7. Reset Chrome Settings (Last Resort)

If all previous steps fail, resetting Chrome's settings to their default can resolve underlying configuration issues that might be causing the error. This will disable extensions, clear temporary data, and reset startup pages, but it will not clear your bookmarks, history, or saved passwords.

1.  Open Chrome.
2.  Click the three-dot menu icon in the top-right corner.
3.  Go to "Settings."
4.  In the left sidebar, click "Reset settings."
5.  Click "Restore settings to their original defaults."
6.  Confirm by clicking "Reset settings."
7.  Close and reopen Chrome, then attempt to access the website.

## Common Mistakes

When troubleshooting `NET::ERR_CERT_DATE_INVALID`, several common missteps can hinder resolution:

*   **Ignoring the Specific Error Code:** Many "Your connection is not private" errors exist. Focusing solely on the generic message without identifying `NET::ERR_CERT_DATE_INVALID` can lead to pursuing incorrect solutions. Always check the specific error code.
*   **Failing to Synchronize System Time Automatically:** Users sometimes manually adjust their system clock but do not enable automatic synchronization. This leaves the system vulnerable to drift, causing the error to reappear. Always ensure automatic time and time zone settings are enabled.
*   **Not Restarting Chrome/Computer:** Changes to system settings, browser caches, or security software often require a full browser restart or even a system reboot to take effect. Neglecting this step can make it seem as if a solution didn't work.
*   **Immediately Bypassing the Warning:** Chrome provides an option to "Proceed to [website] (unsafe)." While tempting, bypassing the warning without understanding the root cause is risky. It exposes your data to potential interception and doesn't solve the underlying problem.

## Prevention Tips

Preventing the `NET::ERR_CERT_DATE_INVALID` error primarily involves maintaining accurate system time and ensuring your software is up-to-date.

*   **Enable Automatic Time Synchronization:** Always ensure your operating system is configured to set the date and time automatically using a reliable network time server. This is the most crucial preventive measure against this specific error.
*   **Keep Operating System Updated:** Regularly install OS updates. These updates often include critical security patches and updated root certificate bundles, which help your system properly validate website certificates.
*   **Keep Google Chrome Updated:** Configure Chrome to update automatically. A current browser version ensures you have the latest security protocols and bug fixes, reducing the likelihood of certificate validation issues.
*   **Maintain Current Security Software:** Keep your antivirus and firewall software up-to-date. If your security software performs SSL inspection, ensuring it's running the latest version helps prevent it from interfering with valid certificates.
*   **Be Mindful of Public Wi-Fi:** Public Wi-Fi networks can sometimes be susceptible to attacks that interfere with SSL connections. Using a Virtual Private Network (VPN) on public networks can add an extra layer of security.