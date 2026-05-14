---
title: "How to Resolve 'Your connection is not private' (NET::ERR_CERT_AUTHORITY_INVALID) in Chrome"
date: "2026-05-14T21:09:06.313Z"
slug: "how-to-resolve-your-connection-is-not-private-net-err-cert-authority-invalid-in-chrome"
type: "how-to"
description: "Resolve the Chrome error 'Your connection is not private' (NET::ERR_CERT_AUTHORITY_INVALID) with this comprehensive, step-by-step guide. Fix untrusted certificate issues quickly."
keywords: "Chrome, NET::ERR_CERT_AUTHORITY_INVALID, connection not private, SSL certificate error, untrusted connection, fix Chrome error, certificate authority invalid, HTTPS error"
---

## Problem Explanation

Encountering a "Your connection is not private" error in Google Chrome can be unsettling. This warning indicates that Chrome cannot establish a secure connection to the website you are trying to visit. Specifically, when you see the `NET::ERR_CERT_AUTHORITY_INVALID` code accompanying this message, it means Chrome does not trust the Certificate Authority (CA) that issued the website's SSL/TLS certificate.

When this problem occurs, Chrome typically displays a full-page red warning with a large padlock icon crossed out. The primary message states, "Your connection is not private," followed by an explanation like "Attackers might be trying to steal your information from [website name] (for example, passwords, messages, or credit cards)." Below this, you'll see the specific error code `NET::ERR_CERT_AUTHORITY_INVALID` and an option to click "Advanced" for more details or to proceed unsafely. Proceeding unsafely is rarely recommended, as it bypasses critical security checks.

## Why It Happens

The `NET::ERR_CERT_AUTHORITY_INVALID` error arises when Chrome cannot verify the legitimacy of a website's SSL/TLS certificate chain. Every secure website uses a certificate to prove its identity and encrypt data. These certificates are issued by trusted third-party Certificate Authorities. Chrome, and other browsers, have a built-in list of root CAs they trust.

This specific error means one of two primary things: either the certificate presented by the website was issued by an unknown or untrusted CA, or a legitimate certificate has been intercepted and re-signed by an intermediary (like an antivirus program, a corporate proxy, or even malware) using an untrusted certificate. Common causes include: a self-signed certificate on the server (often in development environments), an outdated or misconfigured system clock on your computer, interference from antivirus software performing HTTPS inspection, a corporate firewall or proxy re-encrypting traffic without the necessary root certificates installed on your machine, or less commonly, a genuinely compromised connection.

## Step-by-Step Solution

Follow these steps to diagnose and resolve the `NET::ERR_CERT_AUTHORITY_INVALID` error.

### Step 1: Correct Your System Date and Time

An incorrect system date or time is a remarkably common cause of certificate errors. SSL certificates have validity periods, and if your system clock is out of sync, Chrome might incorrectly perceive a valid certificate as expired or not yet valid.

1.  **For Windows:**
    *   Right-click the clock in the bottom-right corner of your screen.
    *   Select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are both toggled **On**.
    *   If they are already on, toggle them off and then on again to force a synchronization.
    *   Reboot your computer if the time was significantly off.
2.  **For macOS:**
    *   Click the Apple menu in the top-left corner.
    *   Select "System Settings" (or "System Preferences" on older macOS versions).
    *   Go to "General" > "Date & Time" (or "Date & Time" directly).
    *   Ensure "Set date and time automatically" is enabled and correctly selects your time zone.
    *   If changes were made, restart Chrome and re-test the website.

### Step 2: Clear Chrome's Browsing Data

Corrupted cache or old cookies can sometimes interfere with how Chrome processes secure connections. Clearing these can provide a fresh start.

1.  Open Chrome.
2.  Click the three-dot menu icon in the top-right corner.
3.  Go to "More tools" > "Clear browsing data."
4.  In the "Time range" dropdown, select "All time."
5.  Ensure "Cookies and other site data" and "Cached images and files" are checked. You may also check "Browsing history."
6.  Click "Clear data."
7.  Close and reopen Chrome, then try accessing the website again.

### Step 3: Temporarily Disable Antivirus/Firewall HTTPS Inspection

Many security software solutions (antivirus, internet security suites, firewalls) include a feature called "HTTPS scanning" or "SSL inspection." While designed to protect you from malicious encrypted traffic, this feature works by intercepting secure connections, decrypting them, scanning them, and then re-encrypting them with its own generated certificate. If this internal certificate isn't properly trusted by your system, Chrome will flag it with `NET::ERR_CERT_AUTHORITY_INVALID`.

1.  Open your antivirus or internet security software.
2.  Look for settings related to "HTTPS scanning," "SSL inspection," "web protection," or "encrypted connection scanning."
3.  Temporarily disable this feature. The exact steps vary by software (e.g., Avast, AVG, Bitdefender, Kaspersky all have similar features).
4.  Restart Chrome and try to visit the website.
5.  **Important:** If this resolves the issue, you should *not* leave the feature disabled permanently. Instead, consult your security software's documentation for instructions on how to properly install its root certificate onto your system's trust store, or add an exception for the specific website if appropriate. Re-enable the feature once tested.

### Step 4: Check for Corporate Proxy or VPN Interference

If you are on a corporate network or using a Virtual Private Network (VPN), the network's security infrastructure might be responsible. Corporate proxies often perform SSL inspection for security purposes, similar to antivirus software, by re-signing certificates.

1.  **Corporate Network:** If you are at work or using a device provided by your employer, contact your IT department. They can advise if a corporate proxy is in use and provide the necessary certificate or configuration to trust it.
2.  **VPN:** If you are using a VPN, try temporarily disconnecting from it and accessing the website. If the error resolves, the VPN might be interfering. Check your VPN's settings or contact their support. You might need to exclude certain domains or adjust its security features.

### Step 5: Inspect the Server's Certificate

Understanding *which* certificate authority is invalid can provide crucial clues, especially if steps 1-4 haven't worked.

1.  When you encounter the "Your connection is not private" error page, click the "Advanced" link.
2.  Look for text like "This server could not prove that it is [website.com]; its security certificate is not trusted by your operating system."
3.  On the left of the address bar, click the **"Not Secure"** text or the crossed-out padlock icon.
4.  In the small pop-up, click on "Certificate is invalid" (or "Certificate (Invalid)").
5.  A new window will open displaying the certificate details. Navigate to the "Details" tab.
6.  Scroll down and look for fields like "Issued to," "Issued by," and "Valid from/to."
7.  Pay close attention to "Issued by." If it's a name you don't recognize, or if it's the name of your antivirus/proxy, that confirms interference. If it's a legitimate CA that *should* be trusted (e.g., Let's Encrypt, DigiCert, GlobalSign), then the problem might be with your system's trust store.

### Step 6: Reset Chrome Settings or Reinstall

If the issue persists and other websites load correctly, the problem might be localized to Chrome's configuration or a deeper browser-related issue.

1.  **Reset Chrome Settings:**
    *   Type `chrome://settings/reset` into the Chrome address bar and press Enter.
    *   Click "Restore settings to their original defaults."
    *   Confirm by clicking "Reset settings." This will disable extensions, clear temporary data, and reset themes, but won't delete bookmarks, history, or saved passwords.
2.  **Reinstall Chrome:**
    *   Completely uninstall Chrome from your system (using Control Panel > Programs and Features on Windows, or by dragging to Trash on macOS).
    *   Download the latest version of Chrome from the official Google Chrome website and install it.

### Step 7: Scan for Malware

Malware can sometimes inject itself into your network connection or browser, leading to certificate errors by acting as a "man-in-the-middle" to intercept and re-sign secure connections.

1.  Run a full scan with a reputable antivirus and anti-malware program (e.g., Malwarebytes, Windows Defender).
2.  Ensure your chosen security software is up-to-date before running the scan.
3.  Remove any detected threats and restart your computer.

## Common Mistakes

When trying to resolve `NET::ERR_CERT_AUTHORITY_INVALID`, users often make several key mistakes:

*   **Ignoring the Warning:** The most dangerous mistake is consistently clicking "Proceed to [website] (unsafe)" or "Advanced" > "Proceed anyway." This bypasses crucial security checks, potentially exposing your data to actual attackers.
*   **Assuming it's Always the Website's Fault:** While the certificate *is* from the website, the `AUTHORITY_INVALID` error often originates from your local machine's configuration, network setup, or security software, not a fault of the website itself.
*   **Disabling Antivirus Permanently:** If your antivirus's HTTPS scanning causes the issue, disabling it permanently leaves you vulnerable to threats lurking in encrypted traffic. The correct approach is to configure it properly or install its root certificate.
*   **Tampering with Root Certificates:** Attempting to manually install or delete root certificates without proper understanding can severely compromise your system's security and trust model. Only do this if explicitly instructed by a trusted IT professional or software vendor.
*   **Not Rebooting:** Sometimes, changes to system time, network settings, or security software require a system or browser restart to take full effect.

## Prevention Tips

Preventing `NET::ERR_CERT_AUTHORITY_INVALID` errors largely involves maintaining a healthy, up-to-date system and understanding your network environment.

*   **Keep System Time Synchronized:** Always ensure your operating system is set to automatically synchronize its date and time with internet time servers. This is the simplest and most effective prevention for many certificate errors.
*   **Keep Software Updated:** Regularly update Chrome, your operating system (Windows, macOS), and your antivirus/firewall software. Updates often include critical security patches and updated lists of trusted Certificate Authorities.
*   **Be Cautious with Browser Extensions:** Malicious or poorly coded browser extensions can sometimes interfere with network requests and certificate validation. Only install extensions from trusted sources and remove any you don't recognize or use.
*   **Understand Your Network Environment:** If you frequently use corporate or public Wi-Fi networks, be aware that these networks might employ proxies or firewalls that could trigger certificate warnings. Your IT department is the best resource for corporate network issues.
*   **Use Reputable VPNs (If Applicable):** If you use a VPN, choose a reputable provider. Poorly configured VPNs can sometimes cause network issues, including certificate errors, by mishandling secure connections.