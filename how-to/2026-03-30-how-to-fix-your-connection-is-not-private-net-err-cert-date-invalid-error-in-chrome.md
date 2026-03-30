---
title: "How to Fix \"Your connection is not private\" (NET::ERR_CERT_DATE_INVALID) Error in Chrome"
date: "2026-03-30T16:05:30.527Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-date-invalid-error-in-chrome"
type: "how-to"
description: "Detailed guide to fix the Chrome NET::ERR_CERT_DATE_INVALID error. Learn the causes and step-by-step solutions for incorrect system date, time, and related issues."
keywords: "NET::ERR_CERT_DATE_INVALID, Chrome error, connection not private, fix certificate date invalid, browser security error, system time incorrect, SSL certificate error, Chrome date error"
---

### Problem Explanation

When attempting to browse the internet using Google Chrome, you may occasionally encounter a full-page warning stating, "Your connection is not private." While several specific error codes can accompany this message, the one we are focusing on is **`NET::ERR_CERT_DATE_INVALID`**. This particular error indicates that Chrome has detected an issue with the website's security certificate related to its validity period, specifically the date.

Upon seeing this error, the browser typically displays a large red warning symbol, the title "Your connection is not private," and the aforementioned error code at the bottom. The page will also contain an explanatory message, such as "Attackers might be trying to steal your information from example.com (for example, passwords, messages, or credit cards)." You'll be presented with options like "Back to safety" and an "Advanced" button. Clicking "Advanced" might reveal more technical details and, in some cases, an option to proceed unsafely (which is generally not recommended). The crucial aspect of `NET::ERR_CERT_DATE_INVALID` is that it directly points to a mismatch between your system's date/time and the validity period of the website's SSL/TLS certificate.

### Why It Happens

The `NET::ERR_CERT_DATE_INVALID` error primarily occurs because your computer's system date and time do not align with the valid "from" and "to" dates embedded within the website's SSL/TLS certificate. Secure websites use SSL/TLS certificates to encrypt communication between your browser and their server, ensuring data privacy and integrity. These certificates are issued for a specific duration, having a "Valid From" start date and a "Valid To" end date.

When your system's clock is set to a date outside this valid period – for instance, if your computer's date is significantly in the past, or conversely, far in the future – Chrome cannot verify the certificate's authenticity. From Chrome's perspective, an expired certificate (or one not yet valid) means the connection cannot be trusted, as it could indicate a malicious attempt to intercept your data using a forged or outdated certificate. While it *can* sometimes indicate a genuinely expired certificate on the website's server, the `NET::ERR_CERT_DATE_INVALID` code very frequently points to a client-side (your computer's) issue with the date and time settings, including an incorrect time zone, or the failure of the system to synchronize with a network time server.

### Step-by-Step Solution

Addressing the `NET::ERR_CERT_DATE_INVALID` error typically involves ensuring your system's date and time are accurate and synchronized. Follow these steps carefully:

#### ## Step 1: Correct Your System Date and Time Settings

This is the most common and effective solution for `NET::ERR_CERT_DATE_INVALID`. Ensure your operating system's date, time, and time zone are set correctly and automatically synchronized.

**For Windows Users:**
1.  Right-click on the clock in the bottom-right corner of your taskbar and select "Adjust date/time."
2.  In the "Date & time" settings window, toggle "Set time automatically" to **On**.
3.  Toggle "Set time zone automatically" to **On**.
4.  Below these options, click the "Sync now" button next to "Synchronize your clock."
5.  If "Set time automatically" was already on but the time was still wrong, toggle it off, wait a few seconds, then toggle it back on.
6.  Restart your browser and try accessing the website again. A system restart might also be beneficial if the issue persists.

**For macOS Users:**
1.  Click the Apple menu in the top-left corner of your screen and select "System Settings" (or "System Preferences" on older macOS versions).
2.  Scroll down to "General" in the sidebar, then click on "Date & Time."
3.  Ensure the toggle for "Set date and time automatically" is **On**. If it's off, turn it on.
4.  Make sure "Set time zone automatically using your current location" is also **On**.
5.  Close System Settings and restart Chrome.

**For Linux Users (e.g., Ubuntu/Debian-based with GNOME):**
1.  Open "Settings" (usually found in the applications menu).
2.  Navigate to "Date & Time."
3.  Ensure "Automatic Date & Time" and "Automatic Time Zone" are both toggled **On**.
4.  If using a terminal, you can also use `sudo timedatectl set-ntp true` to enable network time synchronization and `timedatectl status` to check the current status.
5.  Close settings and restart Chrome.

#### ## Step 2: Clear Chrome's Browser Data (Cache and Cookies)

Sometimes, corrupted or outdated cached data can interfere with how Chrome processes certificate information. Clearing your browser's cache and cookies can resolve such conflicts.

1.  Open Chrome.
2.  Click the three-dot menu icon in the top-right corner.
3.  Go to "More tools" > "Clear browsing data."
4.  In the dialog box, set the "Time range" to "**All time**."
5.  Ensure that "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you wish to retain it.
6.  Click "Clear data."
7.  Restart Chrome and try accessing the website again.

#### ## Step 3: Temporarily Disable Antivirus/Firewall SSL Scanning

Some antivirus or security software can intercept secure connections (SSL/TLS inspection) for scanning purposes. If the security software's certificate store is outdated or misconfigured, it might present an invalid certificate to Chrome, leading to the `NET::ERR_CERT_DATE_INVALID` error.

1.  Locate your antivirus or internet security software icon in the system tray (Windows) or menu bar (macOS).
2.  Right-click it and look for options like "Disable protection," "Pause firewall," or specifically, "Disable SSL scanning" or "HTTPS scanning."
3.  Temporarily disable these features for a few minutes.
4.  With the security software temporarily disabled, try to access the problematic website in Chrome.
5.  **Important:** If the error is resolved, re-enable your security software immediately. Then, go into your security software's settings to find and update its SSL/HTTPS scanning components, or consider reinstalling it. Never browse the internet without active security protection for an extended period.

#### ## Step 4: Update Your Operating System and Chrome Browser

Outdated software can lead to various compatibility issues, including problems with certificate validation. Ensuring your system and browser are up-to-date can often resolve underlying bugs or missing root certificates.

1.  **Update Chrome:**
    *   Open Chrome.
    *   Click the three-dot menu icon > "Help" > "About Google Chrome."
    *   Chrome will automatically check for updates and install them. Restart Chrome if prompted.
2.  **Update Operating System:**
    *   **Windows:** Go to "Settings" > "Update & Security" > "Windows Update" and click "Check for updates."
    *   **macOS:** Go to "System Settings" (or "System Preferences") > "General" > "Software Update."
    *   **Linux:** Use your distribution's package manager (e.g., `sudo apt update && sudo apt upgrade` for Debian/Ubuntu) or the graphical software updater.
    *   After updating, restart your computer.

#### ## Step 5: Check for CMOS Battery Failure (Desktop PCs)

If you are using a desktop computer and consistently find your system's date and time incorrect *after* a full shutdown (but not a restart), it could indicate a failing CMOS battery on your motherboard. This small, coin-cell battery powers the real-time clock and BIOS/UEFI settings when the computer is off.

1.  If your system date/time frequently resets to an old default (like 2008 or 2010) after the computer has been completely powered off for some time, this is a strong indicator of a dead CMOS battery.
2.  Replacing a CMOS battery is a hardware fix. If you're comfortable opening your desktop PC, you can locate the CR2032 coin-cell battery on the motherboard and replace it. If not, consider seeking assistance from a qualified technician. Laptop users rarely encounter this specific issue.

#### ## Step 6: Inspect the Website's Certificate Details

While `NET::ERR_CERT_DATE_INVALID` often points to your system, it's good practice to confirm the certificate details to rule out a genuine website-side expiration, especially if you've exhausted other steps.

1.  On the Chrome error page, click the "Advanced" button. If there's an option to "Proceed to example.com (unsafe)," click it (use caution and proceed only if you understand the risks, perhaps for a site you trust deeply or for diagnostic purposes).
2.  Once on the site (or if the site loads after bypassing the error), click the **red padlock icon** (which usually indicates an insecure connection now) in the browser's address bar.
3.  Click "Connection is not secure" (or similar) > "Certificate is not valid."
4.  In the Certificate Viewer window, look for the "Validity Period" or "Dates" section.
5.  Note the "Issued On" (Valid From) and "Expires On" (Valid To) dates.
6.  Compare these dates to your current system date. If your system date *is* correct, but the certificate itself has genuinely expired according to these dates, then the problem lies with the website, and you cannot fix it directly. You would need to contact the website administrator.

### Common Mistakes

When troubleshooting the `NET::ERR_CERT_DATE_INVALID` error, users often make a few common mistakes:

1.  **Ignoring the specific error code:** Many users see "Your connection is not private" and immediately jump to generic solutions like clearing caches or resetting network settings, without realizing `NET::ERR_CERT_DATE_INVALID` specifically points to a date/time discrepancy. Addressing the clock issue first is paramount.
2.  **Manually setting the time incorrectly:** While manually setting the date and time can work, users often forget to set the correct time zone or neglect to re-enable automatic time synchronization. This can lead to the error reappearing later, especially after a reboot or connection loss. Always prefer automatic synchronization.
3.  **Not restarting Chrome or the system:** After making changes to system date/time or security software, Chrome may need a full restart (closing all instances) or even a system reboot to fully apply the changes and re-evaluate certificate trust.
4.  **Permanently disabling security software:** Temporarily disabling antivirus or firewall features for testing is acceptable, but permanently leaving them off exposes your system to significant risks. Always re-enable them after testing and investigate a proper resolution if they were the cause.
5.  **Assuming the website is always at fault:** While website certificates can expire, the `NET::ERR_CERT_DATE_INVALID` error more often indicates a problem with the user's local system clock.

### Prevention Tips

To minimize the chances of encountering the `NET::ERR_CERT_DATE_INVALID` error again, consider these prevention tips:

1.  **Always enable automatic time synchronization:** Ensure your operating system is configured to set the date and time automatically using Network Time Protocol (NTP) servers. This keeps your clock accurate and reduces the likelihood of manual errors.
2.  **Keep your operating system and Chrome browser updated:** Regular updates ensure you have the latest security patches, root certificates, and bug fixes, which can prevent certificate validation issues.
3.  **Maintain your CMOS battery (for desktop PCs):** If you use a desktop, be aware that the CMOS battery has a finite lifespan (typically 3-5 years). If you notice your system clock repeatedly falling behind after a full shutdown, plan to replace the battery.
4.  **Be mindful of security software configurations:** If you install or update antivirus/firewall software, ensure its SSL/HTTPS scanning features are configured correctly and that the software itself is kept up-to-date.
5.  **Avoid manually changing the system date/time unnecessarily:** Only adjust it manually if automatic sync fails and you absolutely know the correct time. Always revert to automatic settings as soon as possible.