---
title: "How to Resolve 'Your connection is not private' (NET::ERR_CERT_AUTHORITY_INVALID) Error in Google Chrome"
date: "2026-01-28T10:28:04.578Z"
slug: "how-to-resolve-your-connection-is-not-private-net-err-cert-authority-invalid-error-in-google-chrome"
type: "how-to"
description: "Detailed guide to fix the NET::ERR_CERT_AUTHORITY_INVALID error in Chrome. Learn why it happens and get step-by-step solutions to restore secure browsing."
keywords: "NET::ERR_CERT_AUTHORITY_INVALID, Chrome error, connection not private, SSL certificate error, fix certificate error, Chrome security warning, untrusted certificate, browser security, HTTPS error"
---

## Problem Explanation

Encountering a "Your connection is not private" error in Google Chrome can be a frustrating halt to your web browsing experience. Specifically, when this warning is accompanied by the error code `NET::ERR_CERT_AUTHORITY_INVALID`, it indicates a fundamental issue with the website's security certificate that your browser cannot validate. Instead of the expected webpage, you are presented with a full-screen warning page, often with a large red padlock icon and text stating that attackers might be trying to steal your information.

This error page typically offers an "Advanced" button. Clicking it usually reveals the specific error code, such as `NET::ERR_CERT_AUTHORITY_INVALID`, and sometimes provides an option to "Proceed to [website] (unsafe)." While proceeding might seem like a quick fix, it bypasses crucial security checks, potentially exposing you to risks. The core of this problem is that Chrome does not trust the entity that issued the website's security certificate, making it impossible to establish a secure, private connection.

## Why It Happens

The `NET::ERR_CERT_AUTHORITY_INVALID` error occurs when Google Chrome, or more accurately, your operating system, cannot verify the authenticity of the Secure Sockets Layer (SSL) or Transport Layer Security (TLS) certificate presented by a website. Every secure website (HTTPS) uses a certificate issued by a trusted Certificate Authority (CA). Your browser relies on a pre-installed list of trusted CAs to validate these certificates.

When the certificate authority is deemed "invalid," it typically means one of several things: the website's certificate might be self-signed (meaning it wasn't issued by a recognized CA), it might be issued by a CA not trusted by your operating system, or it could be a corporate firewall or proxy intercepting your connection and replacing the website's legitimate certificate with its own, which your system doesn't trust. Less common but equally disruptive causes include an incorrect system date and time, outdated browser or operating system root certificates, or interference from antivirus software, malware, or network configuration issues that disrupt the certificate validation process.

## Step-by-Step Solution

### ## Step 1: Check Your System Date and Time

One of the most common and often overlooked causes of certificate errors is an incorrect system date or time. SSL certificates have validity periods, and if your computer's clock is outside this period, the browser will deem the certificate invalid.

1.  **For Windows:**
    *   Right-click on the clock in the bottom-right corner of your screen.
    *   Select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are both toggled **On**.
    *   If they are off, toggle them on, then click "Sync now" under "Synchronize your clock."
2.  **For macOS:**
    *   Go to "System Settings" (or "System Preferences" on older versions).
    *   Click on "General" > "Date & Time."
    *   Ensure "Set date and time automatically" and "Set time zone automatically using your current location" are checked.
    *   If not, check them and ensure your Mac has an internet connection to sync.
After adjusting, restart Chrome and try accessing the website again.

### ## Step 2: Clear Browser Data

Corrupted cache files or cookies can sometimes interfere with how Chrome processes website certificates, leading to spurious errors. Clearing this data can resolve the issue.

1.  Open Google Chrome.
2.  Click the three-dot menu icon in the top-right corner.
3.  Go to "More tools" > "Clear browsing data."
4.  In the "Time range" dropdown, select "All time."
5.  Ensure "Cookies and other site data" and "Cached images and files" are checked. You can uncheck "Browsing history" if you wish to preserve it.
6.  Click "Clear data."
Restart Chrome after the process is complete and re-attempt to visit the problematic website.

### ## Step 3: Temporarily Disable Antivirus/Firewall Software

Many antivirus programs include features like "HTTPS scanning," "SSL inspection," or "web shield" that intercept secure connections to scan for malware. While well-intentioned, these features often replace a website's legitimate SSL certificate with their own, which Chrome might not trust, triggering the `NET::ERR_CERT_AUTHORITY_INVALID` error.

1.  Locate your antivirus software icon in the system tray (Windows) or menu bar (macOS).
2.  Right-click the icon and look for options to "Disable protection," "Pause firewall," or specifically disable "HTTPS scanning" or "web shield."
3.  Choose to disable it temporarily (e.g., for 10 minutes or until the next restart).
4.  With the antivirus temporarily disabled, try accessing the website in Chrome.
If the error disappears, you've found the culprit. Re-enable your antivirus and consult its documentation on how to configure its HTTPS scanning feature or add an exception for the specific website, or consider disabling that specific feature if it consistently causes issues.

### ## Step 4: Review Proxy Settings

If you are using a proxy server, especially in a corporate or educational network environment, it might be intercepting your connection and causing certificate validation issues. Proxies often re-issue certificates, and if the proxy's certificate authority isn't trusted by your system, you'll encounter this error.

1.  **For Windows:**
    *   Open "Settings" > "Network & Internet" > "Proxy."
    *   Ensure "Automatically detect settings" is enabled, or if you use a manual proxy, ensure the server address and port are correct and authorized by your network administrator.
    *   Alternatively, open the "Control Panel" > "Internet Options" > "Connections" tab > "LAN settings." Uncheck "Use a proxy server for your LAN" if you are not supposed to be using one.
2.  **For macOS:**
    *   Go to "System Settings" (or "System Preferences") > "Network."
    *   Select your active network connection (e.g., Wi-Fi or Ethernet), then click "Details" (or "Advanced").
    *   Go to the "Proxies" tab. Check if any proxy protocols are enabled. If you don't use a proxy, ensure these are unchecked.
If you are on a corporate network, consult your IT department before making changes to proxy settings. They may need to install specific root certificates on your system.

### ## Step 5: Check for Malware or Adware

Malware or adware can sometimes redirect your internet traffic through their own servers, often resulting in certificate errors because they present forged or untrusted certificates.

1.  **Run a full scan with your primary antivirus software.** Ensure your antivirus definitions are up-to-date before scanning.
2.  **Consider a second-opinion scanner:** Use a reputable anti-malware tool like Malwarebytes (free version is sufficient for scanning) to perform a deeper scan for adware and potentially unwanted programs (PUPs) that your primary antivirus might miss.
3.  **Remove any detected threats.** Follow the instructions of your chosen security software to quarantine or remove malicious programs.
After removal, restart your computer and try accessing the website again.

### ## Step 6: Reset Google Chrome Settings

If the issue persists and appears to be isolated to Chrome, resetting the browser to its default settings can resolve underlying configuration conflicts or problematic extensions.

1.  Open Google Chrome.
2.  Click the three-dot menu icon in the top-right corner.
3.  Go to "Settings."
4.  Scroll down and click "Reset settings" in the left-hand navigation pane.
5.  Click "Restore settings to their original defaults."
6.  Confirm by clicking "Reset settings."
This action will disable all extensions, clear temporary data, and reset most settings but will not delete your bookmarks, history, or saved passwords. You can then re-enable essential extensions one by one to see if any of them were causing the issue.

### ## Step 7: Update Operating System and Browser

Ensuring your operating system and Chrome browser are up-to-date is crucial. Operating system updates often include new root certificates or certificate revocation lists (CRLs) that are essential for validating current SSL/TLS certificates. Browser updates fix bugs and improve compatibility with new web standards.

1.  **Update Google Chrome:**
    *   Click the three-dot menu in Chrome.
    *   Go to "Help" > "About Google Chrome."
    *   Chrome will automatically check for and install updates. Relaunch the browser if prompted.
2.  **Update Your Operating System:**
    *   **For Windows:** Go to "Settings" > "Windows Update" and click "Check for updates."
    *   **For macOS:** Go to "System Settings" (or "System Preferences") > "General" > "Software Update."
After ensuring both your OS and Chrome are fully updated, restart your computer and test the website again.

## Common Mistakes

When troubleshooting the `NET::ERR_CERT_AUTHORITY_INVALID` error, users often make several common mistakes that can either prolong the issue or compromise security:

1.  **Blindly proceeding to the website:** The "Proceed to [website] (unsafe)" option is an override, not a fix. It tells your browser to ignore the security warning, leaving your connection vulnerable to eavesdropping or data tampering. Only use this if you fully understand the risks and trust the site implicitly, and ideally, only after investigating the root cause.
2.  **Assuming the problem is always with the website:** While a website's misconfigured certificate can be the cause, frequently, the issue lies on the client side – your computer's settings, software, or network configuration. Failing to investigate local factors means missing the actual solution.
3.  **Not checking system date/time first:** This simple check is often overlooked but resolves a significant percentage of certificate errors. It's quick, easy, and completely safe.
4.  **Making permanent changes to security software:** When troubleshooting with antivirus or firewall software, temporarily disabling features is a diagnostic step. Permanently disabling security features or creating broad exceptions without understanding the implications can leave your system exposed to actual threats.
5.  **Focusing on only one website:** If the error occurs on multiple secure websites, it strongly suggests a local system or network issue rather than a problem with a single site's certificate.

## Prevention Tips

Preventing the `NET::ERR_CERT_AUTHORITY_INVALID` error from recurring involves maintaining good system hygiene and understanding secure browsing practices:

1.  **Keep Your Operating System and Browser Updated:** Regularly update Windows, macOS, and Google Chrome. These updates include critical security patches, new root certificates, and compatibility improvements that ensure your browser can properly validate website certificates.
2.  **Use Reputable Antivirus and Security Software:** Invest in and maintain a high-quality antivirus solution. While these can sometimes cause conflicts, their overall benefit for system security outweighs the occasional troubleshooting required. Ensure its definitions are always up-to-date.
3.  **Be Wary of Public Wi-Fi and Unsecured Networks:** Public Wi-Fi networks are often vulnerable to "Man-in-the-Middle" (MitM) attacks, where an attacker intercepts your connection and presents untrusted certificates. Avoid conducting sensitive transactions on public Wi-Fi without a Virtual Private Network (VPN).
4.  **Understand Your Network Environment:** If you're on a corporate, school, or other managed network, certificate errors can often stem from the organization's network filtering or proxy solutions. Your IT department typically manages these and can provide specific guidance or install necessary root certificates.
5.  **Periodically Clear Browser Cache:** A build-up of old or corrupted browser data can lead to various browsing issues, including certificate errors. Regularly clearing your cache and cookies helps maintain a clean and efficient browsing environment.