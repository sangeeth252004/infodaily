---
title: "How to Fix \"Your connection is not private\" (NET::ERR_CERT_DATE_INVALID) in Chrome"
date: "2026-04-02T16:00:22.391Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-date-invalid-in-chrome"
type: "how-to"
description: "Troubleshoot and fix the Chrome \"Your connection is not private\" (NET::ERR_CERT_DATE_INVALID) error. Learn step-by-step how to correct system date/time, clear cache, and resolve certificate validation issues for secure browsing."
keywords: "NET::ERR_CERT_DATE_INVALID, Chrome connection not private, fix SSL error, certificate date invalid, system clock error, secure connection error, Chrome certificate error, troubleshoot browser error"
---

When browsing the web, encountering an error message that prevents you from accessing a website can be frustrating, especially when it concerns your security. One common and particularly vexing error in Google Chrome is "Your connection is not private," often accompanied by the specific error code `NET::ERR_CERT_DATE_INVALID`. This message halts your browsing experience, presenting a red "Not Secure" warning in the address bar and a large, red "Your connection is not private" screen, effectively blocking access to the site you're trying to visit.

This error explicitly tells you that Chrome believes the security certificate for the website you're trying to reach is invalid due to an incorrect date. You'll see details like "Attackers might be trying to steal your information from [website name] (for example, passwords, messages, or credit cards)" and the critical `NET::ERR_CERT_DATE_INVALID` code. This is Chrome's way of protecting you from potential security risks, even if the underlying cause is something simple on your end.

### Why It Happens

The `NET::ERR_CERT_DATE_INVALID` error occurs when Chrome detects that a website's SSL/TLS certificate either has an expired date, or its validity period doesn't align with your system's current date and time. While it's possible for a website's certificate to genuinely expire, the most common reason for *this specific error code* appearing on various sites or specific reputable sites is an incorrect date and time setting on your computer or device.

If your computer's clock is set to a date in the past, for instance, Chrome might see a perfectly valid and current website certificate as one that hasn't become valid yet, or worse, one that has already expired. Similarly, if your clock is set far into the future, current certificates might appear expired to your browser. Less common causes include an outdated browser cache holding old certificate information, interference from overly zealous antivirus software, or an actual expired certificate on the website's server (though if this were the case, many users would report it, and the website administrator would likely resolve it quickly).

### Step-by-Step Solution

Addressing the `NET::ERR_CERT_DATE_INVALID` error typically involves checking and correcting your system settings. Follow these steps carefully to restore your secure browsing experience.

## Step 1: Correct Your System Date and Time

This is by far the most frequent culprit. An incorrect date or time on your computer can cause Chrome to misinterpret the validity of a website's SSL certificate.

### For Windows:
1.  Right-click on the date and time display in the bottom-right corner of your taskbar.
2.  Select "Adjust date and time."
3.  In the "Date & time" settings window, ensure "Set time automatically" and "Set time zone automatically" are both toggled **On**.
4.  If they are off, toggle them on. If they are already on, toggle them off for a few seconds, then toggle them back on to force a resynchronization.
5.  Optionally, click "Sync now" under "Synchronize your clock" to manually force an update.
6.  Close the settings window and restart Chrome, then try accessing the website again.

### For macOS:
1.  Click the Apple menu () in the top-left corner of your screen.
2.  Select "System Settings" (or "System Preferences" on older macOS versions).
3.  Scroll down to "General" and click "Date & Time."
4.  Ensure "Set time and date automatically" is enabled. If it's already enabled, disable it for a moment, then re-enable it.
5.  Verify that the correct time zone is selected.
6.  Close System Settings and restart Chrome, then try accessing the website.

## Step 2: Clear Chrome's Cache and Cookies

Sometimes, cached data in your browser can become corrupted or outdated, leading to certificate validation errors. Clearing this data can resolve the issue.

1.  Open Google Chrome.
2.  Click the three vertical dots (More actions) in the top-right corner.
3.  Go to "More tools" > "Clear browsing data."
4.  In the "Clear browsing data" window, select "All time" for the "Time range."
5.  Ensure "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you wish to keep it.
6.  Click "Clear data."
7.  Close Chrome completely and reopen it, then attempt to visit the website.

## Step 3: Temporarily Disable Antivirus/Firewall

Some security software, particularly those with "HTTPS scanning" or "SSL inspection" features, can interfere with Chrome's ability to properly validate website certificates.

1.  Locate your antivirus or firewall software icon in your system tray (Windows) or menu bar (macOS).
2.  Right-click the icon and look for an option to temporarily disable or pause protection. Note that the exact steps vary widely by software.
3.  Disable protection for a short period (e.g., 5-10 minutes).
4.  While disabled, try accessing the problematic website in Chrome.
5.  **Crucially, re-enable your antivirus/firewall software immediately after testing.** If this resolves the issue, you may need to investigate your security software's settings for SSL inspection or add an exception for Chrome or specific websites. Consult your antivirus software's documentation for detailed guidance.

## Step 4: Update Google Chrome and Your Operating System

Outdated browser versions or operating systems can sometimes contain bugs or lack updated root certificates necessary for proper SSL/TLS validation.

1.  **Update Chrome:**
    *   Open Chrome.
    *   Click the three vertical dots in the top-right corner.
    *   Go to "Help" > "About Google Chrome."
    *   Chrome will automatically check for and download updates. If an update is available, you'll be prompted to relaunch the browser.
2.  **Update Your Operating System:**
    *   **Windows:** Go to "Settings" > "Windows Update" and click "Check for updates."
    *   **macOS:** Go to "System Settings" (or "System Preferences") > "General" > "Software Update."
    *   Install any pending updates and restart your computer if required. After updating, retest the website.

## Step 5: Check Certificate Details (Advanced)

If the problem persists after the previous steps, it's worth inspecting the certificate details to confirm if the issue is indeed date-related or if there's an actual problem with the website's certificate.

1.  When you encounter the "Your connection is not private" error, click the "Not Secure" padlock icon (or the warning triangle) in the address bar.
2.  Click "Certificate is invalid" (or "Certificate" on older versions).
3.  A certificate viewer window will appear. Look for the "Validity period" or "Valid from/to" dates.
4.  Carefully compare the certificate's "Valid to" date with your current system date. If your system date is correct and the certificate's "Valid to" date is in the past, then the website's certificate has genuinely expired. In this rare case, the website administrator needs to renew their certificate, and there's little you can do but wait or contact the website owner. If the dates appear fine, it reinforces that the problem is likely on your end, warranting a revisit to Step 1.

## Step 6: Reset Chrome Settings

As a last resort before reinstalling or deeper troubleshooting, resetting Chrome's settings can resolve issues caused by misconfigurations or corrupted profiles.

1.  Open Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Go to "Settings."
4.  In the left sidebar, click "Reset settings."
5.  Click "Restore settings to their original defaults."
6.  Confirm by clicking "Reset settings."
7.  This action will reset your startup page, new tab page, search engine, and pinned tabs, disable extensions, and clear temporary data, but your bookmarks, history, and saved passwords will not be cleared.
8.  Restart Chrome and test the website.

### Common Mistakes

When troubleshooting `NET::ERR_CERT_DATE_INVALID`, users often make a few key mistakes that prolong the fix:

*   **Ignoring the System Clock:** Many users immediately jump to clearing browser data or disabling security software without first verifying their computer's date and time. An incorrect system clock is the most frequent cause, and checking it first saves a lot of time and effort.
*   **Bypassing the Warning:** While Chrome offers an "Advanced" option to proceed to the unsafe site, doing so when `NET::ERR_CERT_DATE_INVALID` is displayed can be risky. If the error isn't due to your clock, you're potentially exposing yourself to an insecure connection. Always try to fix the root cause rather than bypassing security warnings.
*   **Assuming the Website is Always at Fault:** While a website's certificate *can* expire, for the `NET::ERR_CERT_DATE_INVALID` error, the problem is overwhelmingly likely to be on the user's local system, primarily with the date and time settings.
*   **Not Restarting Chrome/Computer:** After making changes, especially to system settings or clearing browser data, it's crucial to fully restart Chrome (and sometimes your computer) to ensure the changes take effect.

### Prevention Tips

To prevent the "Your connection is not private" (NET::ERR_CERT_DATE_INVALID) error from recurring, incorporate these best practices into your routine:

*   **Keep System Date and Time Synchronized Automatically:** Always ensure your operating system is set to automatically synchronize its date and time with an internet time server. This is the most effective way to prevent date-related certificate errors and ensures your system's clock is always accurate.
*   **Regularly Update Your Operating System and Browser:** Keep Chrome and your operating system up to date. Updates often include critical security patches and updated root certificate lists, which are essential for properly validating website security.
*   **Maintain Antivirus/Firewall Software:** While security software can sometimes interfere, it's crucial for your overall system security. Ensure your antivirus and firewall are updated and configured correctly. If you've found an SSL inspection feature causing issues, configure it to allow Chrome or specific trusted sites to pass without interference, rather than disabling your security entirely.
*   **Be Mindful of Time Zone Changes:** If you frequently travel or your device's time zone changes, ensure it's updated automatically. Incorrect time zones, even with automatic time setting, can sometimes cause minor discrepancies that trigger certificate warnings.