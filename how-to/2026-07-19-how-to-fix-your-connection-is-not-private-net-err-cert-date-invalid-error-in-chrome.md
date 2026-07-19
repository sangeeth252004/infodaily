---
title: "How to Fix 'Your connection is not private' (NET::ERR_CERT_DATE_INVALID) Error in Chrome"
date: "2026-07-19T15:56:38.027Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-date-invalid-error-in-chrome"
type: "how-to"
description: "Resolve the 'Your connection is not private' (NET::ERR_CERT_DATE_INVALID) error in Chrome. Learn why expired certificates cause this issue and follow step-by-step instructions to fix system date/time, clear cache, and manage certificates effectively."
keywords: "NET::ERR_CERT_DATE_INVALID fix, Chrome connection not private, fix expired certificate Chrome, correct system time error, browser security error, SSL certificate invalid date, Chrome privacy error solution, how to fix connection errors"
---

### Problem Explanation

When attempting to access a website in Google Chrome, you might encounter a prominent warning page displaying the message "Your connection is not private." Below this, you'll often see an explanation that "Attackers might be trying to steal your information from [website name] (for example, passwords, messages, or credit cards)." Crucially, for this specific guide, the error code displayed at the bottom of the page will be **NET::ERR_CERT_DATE_INVALID**. This specific error code indicates that Chrome believes the website's security certificate is either expired or not yet valid according to your system's current date and time.

This error page effectively blocks you from accessing the website, as Chrome prioritizes your security. While there might be an "Advanced" option that reveals a "Proceed to [website name] (unsafe)" link, clicking this bypasses critical security checks and should generally be avoided, especially when the `NET::ERR_CERT_DATE_INVALID` error is present, as it suggests a fundamental issue that needs to be addressed rather than ignored. The browser is explicitly telling you that it cannot establish a secure and trustworthy connection because the website's identity (as verified by its certificate) appears compromised due to an incorrect date.

### Why It Happens

The `NET::ERR_CERT_DATE_INVALID` error primarily occurs because of a mismatch between the current date and time on your computer and the validity period embedded within a website's SSL/TLS certificate. Every secure website uses an SSL/TLS certificate to encrypt data flowing between your browser and the server, ensuring privacy and data integrity. These certificates are issued by trusted Certificate Authorities (CAs) and have a defined start date and an expiration date.

Your browser, Chrome in this case, checks this validity period against your system's clock. If your computer's date is set incorrectly – for example, if it's set to a date in the past before the certificate was issued, or to a date in the future after the certificate has expired – Chrome will interpret the certificate as invalid. It then assumes that the certificate cannot be trusted, potentially due to malicious tampering or simply neglect, and blocks access to protect you from what it perceives as an insecure or fraudulent connection. Other less common causes can include an outdated browser, conflicting antivirus software with SSL scanning features, or even malware altering system time or network settings.

### Step-by-Step Solution

Follow these detailed steps to diagnose and resolve the `NET::ERR_CERT_DATE_INVALID` error. Start from the first step as it addresses the most common cause.

#### ## Step 1: Verify and Correct Your System Date and Time

The most frequent culprit behind the `NET::ERR_CERT_DATE_INVALID` error is an incorrect date or time on your computer.

1.  **Check your system clock:** Look at the date and time displayed in the taskbar (Windows) or menu bar (macOS/Linux). Ensure it accurately reflects the current date, time, and timezone.
2.  **Adjust Date & Time (Windows):**
    *   Right-click on the clock in your taskbar and select "**Adjust date/time**."
    *   In the "Date & time" settings window, ensure that "**Set time automatically**" and "**Set time zone automatically**" are both toggled **On**.
    *   If they were already on, toggle them off and then back on to force a resync.
    *   Click the "**Sync now**" button under "Synchronize your clock" to ensure your system clock is aligned with an internet time server.
3.  **Adjust Date & Time (macOS):**
    *   Go to Apple menu > "**System Settings**" (or "System Preferences" on older macOS versions).
    *   Click on "**General**" > "**Date & Time**."
    *   Ensure "**Set date and time automatically**" and "**Set time zone automatically using your current location**" are checked. You may need to click the padlock icon and enter your password to make changes.
    *   If your system clock frequently loses accuracy, consider replacing your motherboard's CMOS battery (desktop PCs only).
4.  **Restart Chrome:** Close all Chrome windows and reopen the browser. Try accessing the website again.

#### ## Step 2: Clear Chrome's Browser Data (Cache and Cookies)

Sometimes, stale or corrupted cached data can interfere with how Chrome processes security certificates.

1.  **Open Chrome Settings:** Open Chrome, click the three-dot menu icon in the top-right corner, and select "**Settings**."
2.  **Navigate to Privacy and Security:** In the Settings menu, navigate to "**Privacy and security**" in the left-hand sidebar.
3.  **Clear Browsing Data:** Click on "**Clear browsing data**."
4.  **Select Data Range and Items:**
    *   In the "Time range" dropdown, select "**All time**."
    *   Ensure "**Cookies and other site data**" and "**Cached images and files**" are checked. You can uncheck "Browsing history" if you wish to retain it, but the other two are crucial.
5.  **Execute Clear:** Click the "**Clear data**" button.
6.  **Restart Chrome:** Close and reopen Chrome, then retest the website.

#### ## Step 3: Check for Conflicting Antivirus or Firewall Settings

Certain antivirus programs or firewalls include features that intercept and scan SSL/TLS encrypted traffic (often called "HTTPS scanning" or "SSL inspection"). If these features are misconfigured or use outdated root certificates, they can inadvertently cause `NET::ERR_CERT_DATE_INVALID` errors.

1.  **Identify Potential Conflict:** Temporarily disable the HTTPS scanning or SSL inspection feature within your antivirus software settings. Refer to your antivirus software's documentation for exact steps, as this varies widely between products (e.g., Avast Web Shield, Bitdefender Online Threat Prevention, ESET Web Access Protection).
2.  **Test Access:** With the feature disabled, try accessing the problematic website again in Chrome.
3.  **Re-enable and Update:** If disabling the feature resolves the issue, you should then re-enable it and ensure your antivirus software is fully updated to its latest version. If the problem reappears after re-enabling, you might need to adjust specific settings within your antivirus or consider using alternative security software. Do not leave your antivirus completely disabled for extended periods.

#### ## Step 4: Update Chrome to the Latest Version

An outdated browser version might contain bugs related to certificate handling or have an outdated internal root certificate store.

1.  **Access About Chrome:** Open Chrome, click the three-dot menu icon in the top-right corner, hover over "**Help**," and select "**About Google Chrome**."
2.  **Automatic Update:** Chrome will automatically check for and install updates. If an update is available, it will download and prompt you to relaunch the browser.
3.  **Relaunch and Test:** Relaunch Chrome after any updates are applied and attempt to visit the website.

#### ## Step 5: Reset Chrome Settings to Default

If browser settings have become corrupted or an extension is interfering, resetting Chrome to its default state can help.

1.  **Open Chrome Settings:** Click the three-dot menu icon in the top-right corner and select "**Settings**."
2.  **Navigate to Reset Settings:** Scroll down or use the search bar to find "**Reset settings**" (often under "Advanced" or directly visible).
3.  **Restore Settings:** Click on "**Restore settings to their original defaults**."
4.  **Confirm Reset:** A confirmation dialog will appear, explaining that this will disable extensions, clear temporary data, and reset themes, but your bookmarks, history, and saved passwords will not be deleted. Click "**Reset settings**."
5.  **Restart and Test:** After the reset, close and reopen Chrome, then try accessing the website. You may need to re-enable essential extensions one by one to identify any problematic ones.

#### ## Step 6: Flush DNS Cache

Your computer's DNS cache stores IP addresses of websites you've visited. If this cache contains outdated or corrupted information, it can sometimes lead to connectivity issues, including certificate errors, though this is less common for `NET::ERR_CERT_DATE_INVALID`.

1.  **Open Command Prompt as Administrator (Windows):**
    *   Type `cmd` in the Windows search bar.
    *   Right-click on "Command Prompt" and select "**Run as administrator**."
2.  **Execute Flush Command:** In the Command Prompt window, type the following command and press Enter:
    `ipconfig /flushdns`
3.  **Confirm Success:** You should see a message confirming "Successfully flushed the DNS Resolver Cache."
4.  **Restart Chrome:** Close and reopen Chrome, then reattempt to access the website.

#### ## Step 7: Check for Malware

Malware can sometimes interfere with system settings, network configurations, or even manipulate security certificates, leading to various browser errors, including date-related certificate problems.

1.  **Run a Full Scan:** Use a reputable antivirus or anti-malware program (e.g., Windows Defender, Malwarebytes, ESET, Bitdefender) to perform a full system scan.
2.  **Remove Threats:** If any threats are detected, follow the software's instructions to quarantine and remove them.
3.  **Re-check System Time:** After removing malware, double-check your system's date and time settings (refer back to Step 1) as malware can sometimes alter these.
4.  **Restart Computer:** Reboot your computer after cleaning for changes to take full effect.
5.  **Test Chrome:** Open Chrome and try accessing the website again.

### Common Mistakes

When troubleshooting the `NET::ERR_CERT_DATE_INVALID` error, users often make several common mistakes that can prolong the resolution process or create further issues:

*   **Ignoring the Specific Error Code:** Simply seeing "Your connection is not private" and attempting generic fixes without noting `NET::ERR_CERT_DATE_INVALID` means you might miss the direct clue pointing to date/time issues.
*   **Only Adjusting the Time, Not the Date or Time Zone:** Many users quickly correct the hour or minute but forget to verify the day, month, year, or the crucial timezone setting. An incorrect timezone can still lead to a perceived time mismatch with certificate validity.
*   **Forgetting to Re-enable "Set Time Automatically":** After manually correcting the time, some users forget to switch back to automatic time synchronization, leaving their system vulnerable to future clock drift and recurrence of the error.
*   **Not Clearing "All Time" Browsing Data:** When clearing cache and cookies, selecting a time range like "Last hour" or "Last 24 hours" might not remove the specific corrupted data causing the problem. Always choose "All time" for a comprehensive clear.
*   **Jumping to Complex Solutions:** Users sometimes immediately try advanced network resets or reinstallation before attempting the simple, highly effective fix of correcting the system's date and time.
*   **Failing to Restart Chrome/Computer:** Many changes, especially to system time or browser settings, require a full restart of Chrome or even the entire computer to take effect properly.

### Prevention Tips

Preventing the `NET::ERR_CERT_DATE_INVALID` error from recurring involves maintaining good system hygiene and understanding the underlying causes:

*   **Always Enable Automatic Time Synchronization:** Ensure "Set time automatically" and "Set time zone automatically" are always enabled in your operating system's date and time settings. This synchronizes your clock with reliable internet time servers, minimizing drift and preventing certificate validity mismatches.
*   **Keep Your Operating System Updated:** Regular OS updates often include security patches, updated root certificate stores, and improvements to time synchronization mechanisms that can prevent these errors.
*   **Keep Google Chrome Updated:** Configure Chrome to update automatically. A current browser version ensures you have the latest security features, bug fixes, and updated certificate handling logic.
*   **Use and Update Reputable Antivirus Software:** Maintain an active, up-to-date antivirus and anti-malware solution. Ensure its HTTPS/SSL scanning features are configured correctly and that the software itself is updated to prevent it from causing certificate conflicts.
*   **Be Mindful of Browser Extensions:** Install extensions only from the Chrome Web Store and disable or remove any that you don't recognize or trust, as some can interfere with browser functionality and security.
*   **Avoid Manually Setting System Dates Indiscriminately:** Unless troubleshooting a very specific issue that absolutely requires it, avoid manually setting your system date far into the past or future, as this will inevitably cause widespread certificate errors.
*   **Regularly Clear Browser Data (If Prone to Issues):** While not a daily necessity, if you frequently encounter browser issues, a routine clearing of cache and cookies (e.g., once a month) can help maintain optimal performance and prevent stale data conflicts.