---
title: "How to Fix 'NET::ERR_CERT_DATE_INVALID' Error in Chrome"
date: "2026-10-30T11:11:13.867Z"
slug: "how-to-fix-net-err-cert-date-invalid-error-in-chrome"
type: "how-to"
description: "Resolve the NET::ERR_CERT_DATE_INVALID error in Chrome by correcting system time, clearing browser data, and updating software. A practical guide to restoring secure browsing."
keywords: "NET::ERR_CERT_DATE_INVALID, Chrome error, fix SSL certificate, invalid date error, browser security, connection not private, system clock, fix time, Chrome troubleshooting"
---

### Problem Explanation

When attempting to access a website in Google Chrome, you might be abruptly stopped by a full-page warning stating, "Your connection is not private." Below this prominent warning, you will typically see the specific error code `NET::ERR_CERT_DATE_INVALID`. This message indicates that Chrome encountered an issue with the website's security certificate, specifically regarding its validity period relative to your system's current date and time.

Instead of the expected website content, Chrome displays this security page to prevent you from potentially connecting to a compromised or insecure server. The browser interprets the date mismatch as a severe security risk, as valid SSL/TLS certificates have specific start and expiration dates. If your system's clock falls outside this valid range, Chrome cannot reliably verify the certificate's authenticity, leading to the `NET::ERR_CERT_DATE_INVALID` error.

### Why It Happens

The primary cause of the `NET::ERR_CERT_DATE_INVALID` error is an incorrect system date or time on your computer. Websites use SSL/TLS certificates to establish secure, encrypted connections. These certificates are issued for a specific period, with defined start and end dates. Your browser checks these dates against your local system's date and time to ensure the certificate is currently valid.

If your computer's clock is set incorrectly – whether it's significantly ahead or behind the actual current date and time – Chrome will perceive the website's certificate as either not yet valid or already expired, even if it is perfectly valid according to global time. This discrepancy prevents Chrome from establishing a trusted, secure connection, triggering the `NET::ERR_CERT_DATE_INVALID` error. Less commonly, issues like time zone mismatches, persistent browser cache problems, or interference from security software can exacerbate or indirectly contribute to this date validation failure.

### Step-by-Step Solution

Follow these steps to diagnose and resolve the `NET::ERR_CERT_DATE_INVALID` error.

#### 1. Correct Your System Date and Time

The most frequent culprit is an incorrect system clock. This must be the first thing you check and correct.

*   **For Windows:**
    1.  Right-click on the clock in the bottom-right corner of your taskbar.
    2.  Select "Adjust date and time."
    3.  Ensure "Set time automatically" and "Set time zone automatically" are both toggled **On**.
    4.  If they were off, toggle them on, then click "Sync now" under "Synchronize your clock" to force an immediate update.
    5.  Verify the displayed date and time are correct.
*   **For macOS:**
    1.  Click the Apple menu in the top-left corner of the screen.
    2.  Select "System Settings" (or "System Preferences" on older versions).
    3.  Go to "General" (or "Date & Time").
    4.  Select "Date & Time."
    5.  Ensure "Set date and time automatically" is checked and select a network time server (e.g., Apple Americas/U.S. (time.apple.com)).
    6.  Verify the displayed date and time are correct.
*   **For Linux (e.g., Ubuntu/Debian based):**
    1.  Open "Settings" and navigate to "Date & Time."
    2.  Toggle "Automatic Date & Time" and "Automatic Time Zone" to **On**.
    3.  Alternatively, using the terminal:
        *   Check current status: `timedatectl status`
        *   Enable NTP synchronization: `sudo timedatectl set-ntp true`
        *   Verify after a few moments.

After making changes, close and reopen Chrome, then attempt to access the website again. A system reboot may be necessary if the changes don't take effect immediately.

#### 2. Verify Time Zone and Automatic Synchronization

Even if the numerical time appears correct, an incorrect time zone setting can lead to certificate validation failures. This step ensures your system clock is not only accurate but also correctly calibrated for your geographical location.

*   Return to your system's date and time settings (as described in Step 1).
*   Confirm that your current time zone is accurately selected. If "Set time zone automatically" is an option, ensure it is enabled.
*   If you're using a device that moves between time zones frequently (e.g., a laptop), ensure it's set to automatically detect your location or manually update it when you change regions.
*   Ensure that Network Time Protocol (NTP) synchronization is active. This service automatically keeps your clock accurate by syncing with internet time servers. If NTP is off or failing, your clock can drift over time.
    *   On Windows, ensure "Set time automatically" is enabled.
    *   On macOS, ensure "Set date and time automatically" is checked.
    *   On Linux, use `sudo timedatectl set-ntp true`.

Once confirmed, retest the website in Chrome.

#### 3. Clear Chrome's Browser Data

Sometimes, a persistent error page might be cached, or old cookies could interfere with how Chrome processes security information. Clearing your browser's cache and cookies can resolve these residual issues.

1.  Open Chrome.
2.  Type `chrome://settings/clearBrowserData` into the address bar and press Enter.
3.  In the "Clear browsing data" window, select the "Advanced" tab.
4.  Set the "Time range" to "All time."
5.  Check the boxes for "Cookies and other site data" and "Cached images and files." You can uncheck others if you wish to preserve your browsing history or saved passwords, though clearing them can sometimes help.
6.  Click the "Clear data" button.
7.  Close and reopen Chrome, then try accessing the problematic website.

#### 4. Temporarily Disable Security Software

Antivirus programs, firewalls, or VPN clients can sometimes intercept secure connections for scanning purposes. This interception can occasionally interfere with SSL certificate validation, leading to false `NET::ERR_CERT_DATE_INVALID` errors.

1.  Temporarily disable your antivirus software, firewall, or VPN. Refer to your specific software's documentation for instructions on how to do this.
2.  With the security software temporarily disabled, try accessing the website in Chrome.
3.  **Important:** If the error is resolved, re-enable your security software immediately. You may need to configure an exception for Chrome or adjust your security software's settings to prevent it from interfering with SSL/TLS connections in the future. Do not leave your system unprotected.

#### 5. Update Chrome and Your Operating System

Outdated browser versions or operating systems can sometimes lead to compatibility issues with newer security certificates or contain bugs that affect date/time handling.

1.  **Update Chrome:**
    *   Type `chrome://settings/help` into the Chrome address bar and press Enter.
    *   Chrome will automatically check for updates and install them. You may need to relaunch the browser.
2.  **Update Operating System:**
    *   **Windows:** Go to "Settings" > "Update & Security" > "Windows Update" and click "Check for updates."
    *   **macOS:** Go to "System Settings" > "General" > "Software Update."
    *   **Linux:** Open a terminal and run `sudo apt update && sudo apt upgrade` (for Debian/Ubuntu-based systems) or equivalent commands for your distribution.

Ensure all pending updates are installed, then restart your computer if prompted. Retest the website.

#### 6. Test in Incognito Mode

Chrome's Incognito Mode runs without extensions and a clean session, which can help determine if an extension or a corrupted session state is causing the problem.

1.  Open Chrome.
2.  Click the three vertical dots (More) menu in the top-right corner.
3.  Select "New Incognito window."
4.  In the Incognito window, try navigating to the website that was previously displaying the `NET::ERR_CERT_DATE_INVALID` error.

If the site loads correctly in Incognito Mode, an installed extension or your regular browser profile's settings might be the cause. You can then disable extensions one by one (`chrome://extensions`) to identify the culprit, or consider resetting Chrome settings (as a last resort).

### Common Mistakes

When troubleshooting the `NET::ERR_CERT_DATE_INVALID` error, users often make several common mistakes that prolong the fix:

*   **Ignoring the Date:** Many users focus only on correcting the hour and minute, completely overlooking that the *day, month, or year* is incorrect. This error specifically references the certificate's *date* validity, so ensuring the full date is accurate is paramount.
*   **Disabling Automatic Time Synchronization:** Manually setting the time without enabling automatic synchronization. While a manual correction might work temporarily, the system clock can drift again, especially after a reboot, leading to recurring errors.
*   **Overlooking Time Zone Settings:** Even if the numerical time is correct, an incorrect time zone can cause a mismatch when the browser evaluates certificates based on a globally recognized time standard.
*   **Blaming the Website Immediately:** Before checking local system settings, users often assume the website itself has an expired certificate. While possible for other SSL errors, `NET::ERR_CERT_DATE_INVALID` is overwhelmingly a client-side issue related to your computer's clock.
*   **Not Restarting Chrome/System:** After making changes to system date/time or clearing browser data, failing to fully restart Chrome or, in some cases, the entire computer, can prevent the changes from taking full effect.

### Prevention Tips

Preventing the `NET::ERR_CERT_DATE_INVALID` error largely comes down to maintaining accurate system time and a healthy browser environment:

*   **Always Enable Automatic Time Synchronization:** This is the single most effective prevention strategy. Ensure your operating system is configured to automatically synchronize its date and time with internet time servers (NTP). This feature keeps your clock precise, eliminating the most common cause of the error.
*   **Maintain Up-to-Date Software:** Regularly update Google Chrome and your operating system. Updates often include critical security patches, bug fixes, and improvements to how certificates are handled, reducing the likelihood of encountering such validation errors.
*   **Monitor for Clock Drift:** If you frequently experience system clock inaccuracies even with automatic synchronization enabled, it could indicate a failing CMOS battery (for desktop computers or some laptops) that stores the BIOS settings, including the time. Consider having the battery checked and replaced by a professional.
*   **Avoid Manual Time Adjustments:** Unless absolutely necessary for specific troubleshooting, refrain from manually changing your system's date and time. Always revert to automatic synchronization as soon as possible.
*   **Regularly Clear Browser Cache:** Periodically clearing Chrome's cache and cookies can prevent accumulated data from interfering with secure connections and certificate validation processes.