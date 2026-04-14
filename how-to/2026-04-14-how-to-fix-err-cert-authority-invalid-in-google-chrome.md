---
title: "How to Fix \"ERR_CERT_AUTHORITY_INVALID\" in Google Chrome"
date: "2026-04-14T02:28:47.714Z"
slug: "how-to-fix-err-cert-authority-invalid-in-google-chrome"
type: "how-to"
description: "Resolve the ERR_CERT_AUTHORITY_INVALID error in Google Chrome with this practical, step-by-step guide. Learn common causes and effective solutions."
keywords: "ERR_CERT_AUTHORITY_INVALID, Chrome error, SSL certificate, invalid certificate, fix browser error, security certificate, troubleshoot Chrome"
---

**Problem Explanation**

You're trying to access a website in Google Chrome, and instead of seeing the content you expect, you're met with a blank page or an error message stating, "Your connection is not private" or "This site can't be reached." Often, the specific error code displayed is "ERR_CERT_AUTHORITY_INVALID." This error indicates that Google Chrome cannot verify the security certificate presented by the website you're trying to visit. It means the browser doesn't trust the source of the website's identity, and therefore, it prevents you from proceeding to protect you from potentially fraudulent or compromised sites.

When this error occurs, you will typically see a stark red warning page in Chrome. It will explicitly mention that the website's security certificate is not valid or trusted. The message might be accompanied by technical details about the certificate itself, such as its issuer or expiration date, but the core issue is that Chrome's security checks have failed. This is a crucial security measure designed to prevent man-in-the-middle attacks and unauthorized access to your sensitive information.

**Why It Happens**

The "ERR_CERT_AUTHORITY_INVALID" error primarily arises because Google Chrome cannot validate the authenticity of the SSL/TLS certificate presented by the website's server. SSL/TLS certificates are digital documents that prove a website's identity and enable encrypted communication (HTTPS). They are issued by trusted Certificate Authorities (CAs). When your browser encounters a certificate it cannot verify against its list of trusted CAs, it flags the connection as insecure.

There are several reasons why a certificate might be invalid or untrusted. The website's certificate could be expired, meaning it's no longer considered valid by the issuing CA. It might be issued by an untrusted or self-signed certificate authority, which Chrome doesn't recognize. Another common cause is a mismatch between the domain name the certificate is intended for and the domain name you're actually visiting. Sometimes, incorrect system time on your computer can also lead to the browser misinterpreting the certificate's validity period, triggering this error. Finally, network issues or interference from antivirus software or firewalls can sometimes corrupt or block the certificate verification process.

**Step-by-Step Solution**

## Step 1: Check Your Computer's Date and Time

An incorrect system date or time is one of the most frequent culprits behind certificate errors. Browsers rely on your system's clock to validate the expiration dates of SSL certificates.

*   **On Windows:**
    1.  Right-click on the clock in the taskbar (bottom-right corner).
    2.  Select "Adjust date/time."
    3.  Ensure "Set time automatically" and "Set time zone automatically" are turned **On**.
    4.  If they are already on, try turning them off, waiting a few seconds, and then turning them back on.
    5.  Click "Sync now" to ensure your system is up-to-date.
*   **On macOS:**
    1.  Go to Apple menu > System Settings (or System Preferences).
    2.  Click on "General" and then "Date & Time."
    3.  Ensure "Set date and time automatically" is checked.
    4.  If it is already checked, uncheck it, wait a moment, and then re-check it.
    5.  Verify the correct time zone is selected.

After adjusting your date and time, restart Google Chrome and try accessing the website again.

## Step 2: Clear Browser Cache and Cookies

Corrupted cache data or outdated cookies can sometimes interfere with website loading and certificate verification.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner to open the menu.
3.  Select "Clear browsing data."
4.  In the dialog box, choose a "Time range" of "All time."
5.  Make sure "Cookies and other site data" and "Cached images and files" are checked.
6.  Click "Clear data."
7.  Close and reopen Chrome, then try the website again.

## Step 3: Try Incognito Mode

Incognito mode disables extensions and doesn't use existing cookies or cache, which can help determine if the issue is related to these factors.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Select "New Incognito window."
4.  In the Incognito window, navigate to the website that was showing the error.
5.  If the website loads correctly in Incognito mode, an extension or corrupted browser data is likely the cause. Proceed to Step 4.

## Step 4: Disable Chrome Extensions

Conflicting or malfunctioning extensions can interfere with network requests, including SSL certificate verification.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Hover over "Extensions" and select "Manage Extensions."
4.  For each extension, toggle the switch to the **Off** position.
5.  Restart Chrome and try accessing the website again.
6.  If the website now works, re-enable your extensions one by one, testing the website after each activation, until you identify the problematic extension. Once found, remove or disable that extension permanently.

## Step 5: Check Your Antivirus or Firewall Settings

Some antivirus or firewall software includes features that scan SSL/TLS connections for threats. This feature can sometimes interfere with valid certificates.

1.  Temporarily disable your antivirus software. Consult your antivirus program's documentation for instructions on how to do this.
2.  Temporarily disable your firewall. Again, refer to your operating system's or firewall software's documentation.
3.  Try accessing the website in Chrome.
4.  If the website now loads, the issue lies with your antivirus or firewall. You will need to re-enable them and then look for specific settings within the software that allow you to whitelist the problematic website or disable SSL scanning. Consult your software's support for detailed guidance.

**Important:** Remember to re-enable your antivirus and firewall immediately after testing to maintain your system's security.

## Step 6: Reset Chrome Settings

If none of the above steps work, resetting Chrome to its default settings can resolve deeper configuration issues. This process will reset your startup page, new tab page, search engine, and pinned tabs. It will also disable all extensions and clear temporary data like cookies. Your bookmarks, history, and passwords will not be cleared.

1.  Open Google Chrome.
2.  Click the three vertical dots in the top-right corner.
3.  Select "Settings."
4.  In the left-hand menu, click "Reset settings."
5.  Click "Restore settings to their original defaults."
6.  Confirm by clicking "Reset settings" in the pop-up window.
7.  Restart Chrome and test the website.

## Step 7: Flush DNS Cache and Reset Network Settings (Advanced)

In some cases, the issue might be related to your computer's cached DNS information or network configuration.

*   **Flush DNS Cache:**
    *   **On Windows:**
        1.  Open the Command Prompt as an administrator. Search for "cmd" in the Start menu, right-click on "Command Prompt," and select "Run as administrator."
        2.  Type the following command and press Enter: `ipconfig /flushdns`
    *   **On macOS:**
        1.  Open the Terminal application (Applications > Utilities > Terminal).
        2.  Type the following command and press Enter: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
        3.  You may be prompted for your administrator password.
*   **Reset Network Settings (Windows):**
    1.  Open "Settings" > "Network & Internet."
    2.  Scroll down and click "Network reset."
    3.  Click "Reset now" and confirm. Your computer will restart.

After performing these network-related steps, restart your computer and try accessing the website in Chrome.

**Common Mistakes**

A common mistake when troubleshooting this error is immediately assuming the website itself is broken. While this can occasionally be true, the "ERR_CERT_AUTHORITY_INVALID" error often points to a configuration issue on the user's end or a problem with the browser's ability to verify the certificate. Another frequent misstep is to ignore the error and click through to the website anyway by selecting "Proceed to [website name] (unsafe)." This bypasses Chrome's security checks and exposes you to potential risks. Furthermore, users sometimes forget to test the website in Incognito mode or after disabling extensions, leading them to perform unnecessary or incorrect troubleshooting steps. Finally, not understanding the role of antivirus software in scanning secure connections can lead to confusion when those programs are the actual cause.

**Prevention Tips**

To minimize the occurrence of "ERR_CERT_AUTHORITY_INVALID" errors, ensure your operating system and Google Chrome are always updated to the latest versions. Updates often include improved security protocols and updated lists of trusted Certificate Authorities. Maintain accurate date and time settings on your computer, as this is a fundamental requirement for proper SSL certificate validation. Be cautious when installing new browser extensions and review their permissions carefully, as malicious or poorly coded extensions can cause unexpected issues. Regularly review and, if necessary, reconfigure your antivirus and firewall settings to ensure they are not overly aggressive in blocking legitimate secure connections. Consider using a reputable VPN service if you frequently connect to public Wi-Fi, as network intermediaries on public networks can sometimes disrupt certificate verification.