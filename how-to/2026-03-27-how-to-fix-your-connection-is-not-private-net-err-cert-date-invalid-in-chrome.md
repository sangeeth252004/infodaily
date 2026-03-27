---
title: "How to Fix \"Your connection is not private\" (NET::ERR_CERT_DATE_INVALID) in Chrome"
date: "2026-03-27T15:52:13.394Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-date-invalid-in-chrome"
type: "how-to"
description: "Resolve the Chrome error NET::ERR_CERT_DATE_INVALID, often caused by an incorrect system clock, with this step-by-step guide to restore secure browsing."
keywords: "NET::ERR_CERT_DATE_INVALID, Chrome error, connection not private, fix SSL error, certificate date invalid, secure connection, system clock, time synchronization"
---

### Problem Explanation

When attempting to browse a website using Google Chrome, you might encounter a full-page warning stating, "Your connection is not private." This critical security alert indicates that Chrome has identified an issue preventing it from establishing a secure and trusted connection to the website. The specific error code associated with this problem, `NET::ERR_CERT_DATE_INVALID`, provides a crucial clue: it signifies that the website's security certificate, intended to verify its identity and encrypt your data, has a date-related discrepancy.

When this error appears, you'll see a prominent red warning page in your browser. Below the main "Your connection is not private" message, Chrome typically provides a brief explanation like "Attackers might be trying to steal your information from [website name] (for example, passwords, messages, or credit cards)." Crucially, you'll find the specific error code `NET::ERR_CERT_DATE_INVALID` displayed near the bottom of the page, often under "Advanced" or "Details." This error prevents you from proceeding to the website without overriding the security warning, which is generally not recommended as it bypasses critical security checks.

### Why It Happens

The `NET::ERR_CERT_DATE_INVALID` error code indicates that Chrome found a problem with the validity period of the website's SSL/TLS certificate. SSL/TLS certificates are digital documents that encrypt the communication between your browser and the website, ensuring data privacy and verifying the website's authenticity. Every certificate has a "Not Before" date (when it becomes valid) and a "Not After" date (when it expires).

The most common reason for users to encounter `NET::ERR_CERT_DATE_INVALID` on their personal computer is an **incorrect system date and time** on their device. If your computer's clock is set inaccurately—either far into the past or the future—Chrome will compare this incorrect system time against the website's certificate dates. A perfectly valid certificate might appear expired or not yet valid to Chrome because your computer's clock is out of sync. For example, if your computer's clock is set to 2010, a certificate issued in 2023 will appear to be "future-dated" and thus invalid. Similarly, if your clock is set to 2030, a certificate expiring in 2025 will appear "expired." While less common, the error can also occur if the website genuinely has an expired, revoked, or future-dated certificate, though usually, a misconfigured local system clock is the culprit for the `NET::ERR_CERT_DATE_INVALID` error on multiple sites.

### Step-by-Step Solution

Addressing the `NET::ERR_CERT_DATE_INVALID` error primarily involves ensuring your system's time and related settings are correct. Follow these steps methodically.

#### 1. Correct Your System Date and Time

This is the most frequent cause and solution for `NET::ERR_CERT_DATE_INVALID`. Chrome relies heavily on your system's clock to validate security certificates.

*   **For Windows:**
    1.  Right-click on the clock in the bottom-right corner of your taskbar and select **"Adjust date and time"**.
    2.  In the "Date & time" settings window, ensure **"Set time automatically"** is toggled **On**.
    3.  Also, ensure **"Set time zone automatically"** is toggled **On**.
    4.  If they are already on, toggle them off and then back on to force a resynchronization.
    5.  Alternatively, under "Synchronize your clock," click **"Sync now"**.
    6.  Restart Chrome and try accessing the website again.

*   **For macOS:**
    1.  Click the **Apple menu** in the top-left corner and select **"System Settings..."** (or "System Preferences" on older macOS versions).
    2.  Navigate to **"General"** > **"Date & Time"**.
    3.  Ensure the **"Set time and date automatically"** option is checked (or toggled on). This typically uses Apple's time servers or your network's time server.
    4.  If it's already on, toggle it off and then back on.
    5.  Restart Chrome and re-test the website.

*   **For Linux:**
    1.  Open your system's **Settings** application and locate the **"Date & Time"** section.
    2.  Enable the option to **"Set Date & Time automatically"** (or similar wording). This often involves using NTP (Network Time Protocol) servers.
    3.  If using the command line, you can use `sudo timedatectl set-ntp true` to enable automatic time synchronization.
    4.  Restart Chrome and check if the issue is resolved.

#### 2. Clear Chrome's Browser Data

Outdated cached data or cookies can sometimes interfere with security checks, though less likely for a specific `NET::ERR_CERT_DATE_INVALID` error. Clearing them can resolve obscure conflicts.

1.  Open Chrome and type `chrome://settings/clearBrowserData` into the address bar and press Enter.
2.  In the "Clear browsing data" window, select the **"Advanced"** tab.
3.  Set the "Time range" to **"All time"**.
4.  Ensure **"Cookies and other site data"** and **"Cached images and files"** are checked. You may also select "Browsing history" if desired, but it's not strictly necessary for this error.
5.  Click the **"Clear data"** button.
6.  Close and reopen Chrome, then try the website again.

#### 3. Temporarily Disable Antivirus/Firewall Software

Certain antivirus or firewall programs, particularly those with HTTPS scanning or SSL inspection features, can sometimes intercept secure connections and, if misconfigured or outdated, present their own security certificates which Chrome might then deem invalid.

1.  Locate your antivirus or firewall software icon in your system tray (Windows) or menu bar (macOS).
2.  Right-click and look for an option to **temporarily disable protection** or a specific component like "HTTPS scanning" or "Web Shield."
3.  **Disable it only for a few minutes** and immediately try accessing the website in Chrome.
4.  If the error resolves, re-enable your security software immediately. You may then need to investigate your security software's settings or update it to its latest version. If the error returns, consider contacting your security software's support or looking for specific configuration guides for SSL scanning.

#### 4. Update Your Operating System

An outdated operating system might lack the latest root certificates, which are essential for trusting websites, or have bugs related to time synchronization.

*   **For Windows:** Go to **Settings > Update & Security > Windows Update** and click "Check for updates." Install any available updates.
*   **For macOS:** Go to **System Settings... (or System Preferences) > General > Software Update** and install any available updates.
*   **For Linux:** Use your distribution's package manager (e.g., `sudo apt update && sudo apt upgrade` for Debian/Ubuntu) to ensure your system is fully updated.

#### 5. Reset Chrome Settings to Default

If none of the above steps work, an errant Chrome setting or extension might be interfering. Resetting Chrome can resolve such issues.

1.  Open Chrome and type `chrome://settings/reset` into the address bar and press Enter.
2.  Click **"Restore settings to their original defaults"**.
3.  Confirm by clicking **"Reset settings"**.
4.  This will disable extensions, clear temporary data, and reset most settings but will not clear bookmarks, history, or saved passwords.
5.  Restart Chrome and test the website.

#### 6. Check for Malicious Software

Though less common for `NET::ERR_CERT_DATE_INVALID`, malware or adware can sometimes interfere with network connections and security certificates.

1.  Run a full system scan using your trusted antivirus or anti-malware software (e.g., Windows Defender, Malwarebytes).
2.  Ensure your security software definitions are up-to-date before scanning.
3.  Remove any detected threats.

#### 7. Test with Another Browser

If, after all these steps, the error persists only for a *specific website*, try accessing that website using a different web browser (e.g., Firefox, Edge, Safari).

1.  If the website loads correctly in another browser without a privacy error, it points to a Chrome-specific issue (which steps 1-6 should have covered).
2.  If the same "Your connection is not private" error (or similar) appears in other browsers for the *same website*, it strongly suggests that the problem genuinely lies with the website's SSL certificate itself. In this scenario, there is little more you can do as a user other than contact the website administrator and inform them of the issue.

### Common Mistakes

When encountering `NET::ERR_CERT_DATE_INVALID`, users often make mistakes that either delay the fix or misdiagnose the problem:

*   **Ignoring the specific error code:** Many users see "Your connection is not private" and immediately jump to generic solutions like clearing DNS cache or disabling VPNs, which are irrelevant for `NET::ERR_CERT_DATE_INVALID`. The `DATE_INVALID` part explicitly points to time synchronization or certificate validity issues.
*   **Not checking system date/time first:** This is the most common cause, yet many overlook it, diving into more complex troubleshooting before checking the simplest and most probable culprit.
*   **Assuming the website is always at fault:** While possible, your local system's misconfigured clock is a much more frequent reason for *you* to see this specific error code than the website actually having an expired certificate (especially if it's a popular site).
*   **Disabling antivirus/firewall permanently:** Temporarily disabling security software is a diagnostic step. Leaving it off exposes your system to risks. Always re-enable it immediately after testing.
*   **Forgetting to restart Chrome or the computer:** Many changes, especially to system time or browser settings, require a restart of the application or the entire system to take full effect.

### Prevention Tips

To prevent `NET::ERR_CERT_DATE_INVALID` and similar certificate errors from recurring, adopt these best practices:

*   **Enable Automatic Time Synchronization:** Always keep your operating system set to automatically synchronize its date and time with an internet time server. This ensures your system clock is consistently accurate and aligns with global standards, preventing certificate validation issues due to local time discrepancies.
*   **Keep Your Operating System Updated:** Regularly install updates for Windows, macOS, or Linux. OS updates often include critical security patches, updated root certificate lists, and improvements to time synchronization mechanisms that help maintain secure connections.
*   **Keep Your Browser Updated:** Ensure Google Chrome is always running its latest version. Browser updates include security fixes, performance enhancements, and updated trust stores for SSL/TLS certificates. Chrome typically updates automatically, but you can manually check via `chrome://settings/help`.
*   **Use Reputable Antivirus/Firewall Software and Keep It Updated:** A well-maintained security suite is crucial. Ensure your antivirus and firewall definitions are up-to-date to prevent malware that might interfere with network connections or certificate validation. If your security software offers HTTPS inspection, ensure its own internal certificates are current.
*   **Avoid Manually Changing System Time:** Unless absolutely necessary for a specific, isolated task, refrain from manually setting your system's date and time. This introduces the risk of errors and can lead to certificate validation failures.