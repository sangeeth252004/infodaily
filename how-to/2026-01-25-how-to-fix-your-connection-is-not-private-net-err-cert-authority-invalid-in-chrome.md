---
title: "How to Fix \"Your connection is not private\" (NET::ERR_CERT_AUTHORITY_INVALID) in Chrome"
date: "2026-01-25T10:21:38.018Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-authority-invalid-in-chrome"
type: "how-to"
description: "A comprehensive guide to troubleshoot and resolve the \"Your connection is not private\" error with NET::ERR_CERT_AUTHORITY_INVALID in Google Chrome, covering common causes and step-by-step solutions."
keywords: "Chrome error, connection not private, NET::ERR_CERT_AUTHORITY_INVALID, SSL error, certificate invalid, fix browser error, private connection, trusted authority, Chrome security"
---

### Problem Explanation

Encountering the "Your connection is not private" error in Google Chrome can be a frustrating roadblock when trying to access a website. This specific variation, often accompanied by the error code `NET::ERR_CERT_AUTHORITY_INVALID`, indicates a fundamental issue with the website's security certificate as perceived by your browser. Instead of the expected webpage, you're presented with a full-page warning in red, stating "Your connection is not private" and featuring a large warning icon. Below this, you'll typically see a message explaining that attackers might be trying to steal your information, along with the precise error code `NET::ERR_CERT_AUTHORITY_INVALID` if you click the "Advanced" button.

This error essentially means that Chrome cannot establish a secure, private connection to the website you're attempting to visit. While some "Your connection is not private" errors relate to expired certificates or domain mismatches, `NET::ERR_CERT_AUTHORITY_INVALID` specifically points to a problem with the authenticity or trustworthiness of the Certificate Authority (CA) that issued the website's SSL/TLS certificate. Your browser is designed to trust only certificates issued by a recognized and reputable CA, and in this scenario, that trust chain is broken.

### Why It Happens

The `NET::ERR_CERT_AUTHORITY_INVALID` error primarily arises when Google Chrome cannot verify the legitimacy of the certificate authority (CA) that signed a website's SSL/TLS certificate. Every secure website uses an SSL/TLS certificate to encrypt data exchanged between your browser and the server. These certificates are issued by CAs, which act as trusted third parties. Your operating system and browser maintain a list of trusted root CAs; if the CA that issued a website's certificate isn't on that list, or if its signature cannot be verified through a chain of trust back to a trusted root, Chrome will flag the connection as untrustworthy.

Several factors can cause this specific invalidation of the certificate authority. The most common reasons include an incorrect system date and time on your computer, which can make a valid certificate appear out of its valid timeframe. Interference from security software (like antivirus or firewalls) performing "SSL inspection" can also intercept and re-sign certificates with their own, untrusted certificates. In corporate environments, a proxy server or VPN might be configured to intercept traffic, using an internal CA that your browser doesn't inherently trust. Less commonly, but still possible, the certificate itself might be self-signed (common on internal servers but untrusted externally), or a critical root certificate on your system might be missing, corrupted, or outdated, preventing the proper validation of the trust chain.

### Step-by-Step Solution

Addressing `NET::ERR_CERT_AUTHORITY_INVALID` requires a methodical approach, starting with common system-level checks before moving to more advanced troubleshooting.

#### ## Step 1: Verify Your System Date and Time

An incorrect date or time on your computer is one of the most frequent causes of certificate errors. SSL certificates have validity periods, and if your system's clock is out of sync, Chrome might incorrectly believe the certificate is expired or not yet valid.

1.  **For Windows:**
    *   Right-click the clock in the bottom-right corner of your screen and select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are both toggled **On**.
    *   Click "Sync now" under "Synchronize your clock" to force a sync with an internet time server.
2.  **For macOS:**
    *   Go to Apple Menu > System Settings (or System Preferences) > General > Date & Time.
    *   Ensure "Set date and time automatically" is checked and that you have selected the correct time zone.

After adjusting, restart Chrome and try accessing the website again.

#### ## Step 2: Clear Chrome's Browser Data

Corrupted or outdated cached data within Chrome can sometimes interfere with certificate validation. Clearing these can resolve the issue without impacting your essential browser settings.

1.  Open Chrome and click the three-dot menu icon in the top-right corner.
2.  Go to "More tools" > "Clear browsing data."
3.  In the pop-up window, set the "Time range" to "All time."
4.  Ensure "Cookies and other site data" and "Cached images and files" are checked. You may also check "Browsing history" if desired, but it's not strictly necessary for this fix.
5.  Click "Clear data."
6.  Restart Chrome and re-test the website.

#### ## Step 3: Temporarily Disable Antivirus/Firewall SSL Inspection

Many security software solutions, particularly enterprise-grade antivirus or firewalls, include an "SSL inspection" or "HTTPS scanning" feature. While designed to protect you, this feature can intercept encrypted connections and re-sign certificates with their own, untrusted certificates, leading to `NET::ERR_CERT_AUTHORITY_INVALID`.

1.  Locate your antivirus or firewall software's icon in your system tray (Windows) or menu bar (macOS).
2.  Right-click the icon and look for options like "Pause protection," "Disable web shield," "Disable HTTPS scanning," or "Disable SSL inspection."
3.  If you find such a setting, disable it temporarily (e.g., for 10-15 minutes).
4.  Restart Chrome and try accessing the website.
5.  **Important:** If this resolves the issue, you'll need to re-enable your security software's protection and then consult its documentation on how to add exceptions for trusted sites or properly integrate its SSL inspection feature with your browser's trust store. Do not leave security features permanently disabled.

#### ## Step 4: Update Your Operating System and Chrome

Outdated operating systems and browser versions may lack the latest root certificates or security patches needed to validate modern SSL certificates. Ensuring everything is up-to-date can resolve trust issues.

1.  **Update Google Chrome:**
    *   Open Chrome, click the three-dot menu, go to "Help" > "About Google Chrome."
    *   Chrome will automatically check for updates and install them. You may need to relaunch the browser.
2.  **Update Operating System:**
    *   **For Windows:** Go to Settings > Update & Security > Windows Update and click "Check for updates."
    *   **For macOS:** Go to Apple Menu > System Settings (or System Preferences) > General > Software Update and check for pending updates.

Install any available updates, restart your computer if prompted, and then re-check the website.

#### ## Step 5: Reset Network Settings and Flush DNS

Corrupted DNS cache or network configurations can sometimes misdirect certificate validation or prevent proper resolution. Resetting these can clear underlying network-related issues.

1.  **Flush DNS Cache (Windows):**
    *   Open Command Prompt as an administrator (Search "cmd", right-click, "Run as administrator").
    *   Type `ipconfig /flushdns` and press Enter. You should see a confirmation message.
2.  **Reset TCP/IP (Windows):**
    *   In the same elevated Command Prompt, type `netsh int ip reset` and press Enter.
    *   Then type `netsh winsock reset` and press Enter.
    *   Restart your computer.
3.  **For macOS:** DNS caching is usually handled automatically, but you can try renewing your DHCP lease:
    *   Go to Apple Menu > System Settings (or System Preferences) > Network.
    *   Select your active network connection (e.g., Wi-Fi), click "Details" (or "Advanced"), then "TCP/IP," and click "Renew DHCP Lease."
    *   You might also consider restarting your router/modem.

#### ## Step 6: Manage Trusted Root Certification Authorities (Advanced)

This step directly addresses the "Authority Invalid" aspect by looking into your system's trust store. This is especially relevant in corporate environments where custom root certificates might be deployed or where public root certificates could be missing/corrupted. **Proceed with caution; improper changes can affect system security.**

1.  **For Windows:**
    *   Press `Windows Key + R`, type `certmgr.msc`, and press Enter. This opens the Certificate Manager.
    *   In the left pane, expand "Trusted Root Certification Authorities" > "Certificates."
    *   Review the list for any certificates that appear expired, duplicated, or suspicious. Also, ensure major CAs like "DigiCert," "GlobalSign," "Let's Encrypt," "Cloudflare," etc., are present if you visit sites using their certificates.
    *   If you suspect a specific certificate is missing (e.g., one deployed by your IT department for a proxy), you might need to obtain it and import it (Action > All Tasks > Import...).
    *   If you find a suspicious certificate that you know shouldn't be there, you can delete it (right-click > Delete), but only if you are absolutely certain of its invalidity or if instructed by IT.
2.  **For macOS:**
    *   Open "Keychain Access" (Applications > Utilities > Keychain Access).
    *   In the left sidebar, select "System Roots" under "Keychains."
    *   Look for certificates related to the website you're trying to visit or any suspicious entries. You can inspect their details by double-clicking them.
    *   Similar to Windows, if a specific corporate root certificate is missing, you may need to import it.

After making any changes (or just verifying), restart your computer and Chrome.

### Common Mistakes

When troubleshooting `NET::ERR_CERT_AUTHORITY_INVALID`, users often make several common mistakes that can complicate the fix or even compromise security:

*   **Ignoring the Warning and Proceeding:** Clicking "Proceed to [website] (unsafe)" is a temporary bypass and a significant security risk. It tells Chrome to ignore the certificate error, leaving your connection vulnerable to potential eavesdropping or data theft, especially on sensitive sites.
*   **Not Checking System Date/Time First:** This is the simplest and most common fix, yet it's often overlooked in favor of more complex solutions. Always start here.
*   **Blaming the Website Prematurely:** While the website *could* have a misconfigured certificate, `NET::ERR_CERT_AUTHORITY_INVALID` more frequently points to an issue on the client-side (your computer) or network, particularly with the CA trust chain.
*   **Permanently Disabling Security Software:** If disabling your antivirus's SSL inspection fixes the issue, the correct action is to re-enable it and configure an exception or find proper integration, not to leave your system unprotected.

### Prevention Tips

Preventing `NET::ERR_CERT_AUTHORITY_INVALID` and similar certificate errors often comes down to maintaining a healthy and secure computing environment:

*   **Keep Your Operating System and Browser Updated:** Regular updates ensure you have the latest security patches and, critically, the most current list of trusted root certificate authorities. This is vital for Chrome to validate modern SSL certificates correctly.
*   **Maintain Correct System Date and Time:** Always ensure your computer's date and time are set to synchronize automatically with an internet time server. This prevents certificates from appearing invalid due to time discrepancies.
*   **Use Reputable Security Software (Antivirus/Firewall):** While security software can sometimes cause this error (as seen with SSL inspection), using well-regarded software and configuring it correctly is crucial for overall security. Understand its features and how to manage them without compromising web browsing.
*   **Be Cautious with Public Wi-Fi:** Public Wi-Fi networks can sometimes be susceptible to Man-in-the-Middle attacks where an attacker intercepts your connection and presents invalid certificates. Exercise caution and consider using a reputable VPN on public networks.
*   **Understand Corporate Proxy/VPN Implications:** If you're connecting via a corporate network, proxy, or VPN, understand that your IT department might be using internal CAs. If you frequently encounter this error in such an environment, consult your IT support for guidance on importing necessary root certificates.
*   **Periodically Scan for Malware:** Malicious software can sometimes interfere with network connections and certificate validation processes. Regular, thorough scans with a trusted anti-malware program can help prevent such issues.