---
title: "How to Fix 'Your connection is not private' (NET::ERR_CERT_COMMON_NAME_INVALID) Error in Chrome"
date: "2026-02-19T20:32:08.728Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-common-name-invalid-error-in-chrome"
type: "how-to"
description: "Resolve the Chrome NET::ERR_CERT_COMMON_NAME_INVALID error. This guide provides step-by-step solutions for \"Your connection is not private\" issues, focusing on common name mismatches, system time, and security software conflicts."
keywords: "NET::ERR_CERT_COMMON_NAME_INVALID, Chrome connection not private, fix SSL error, common name mismatch, HTTPS error, website security warning, Chrome certificate error, connection isn't private fix, flush DNS, disable antivirus SSL scan"
---

### Problem Explanation

When attempting to access a website using Google Chrome, you may encounter a full-page security warning stating "Your connection is not private." This warning indicates that Chrome has identified an issue with the website's security certificate, preventing it from establishing a secure and trusted connection. The specific error code, `NET::ERR_CERT_COMMON_NAME_INVALID`, is prominently displayed, signifying a particular type of certificate validation failure.

This error means that the browser cannot verify the identity of the website you are trying to reach. Instead of loading the site content, Chrome presents an interstitial page that usually features a large red warning symbol, the "Your connection is not private" message, and the technical error code. You will typically see options to "Go back" or, in some cases, "Proceed to [website] (unsafe)," though the latter is often disabled or heavily discouraged for good reason.

### Why It Happens

The `NET::ERR_CERT_COMMON_NAME_INVALID` error primarily occurs because the domain name presented in the website's SSL/TLS security certificate does not match the actual domain name of the website you are trying to access in your browser's address bar. Every secure website (HTTPS) uses an SSL/TLS certificate to encrypt data and verify its identity. This certificate includes a "Common Name" (CN) or "Subject Alternative Names" (SANs) field, which specifies the domain(s) the certificate is issued for.

If Chrome requests `https://www.example.com` but the website's certificate is issued only for `example.com` (without `www.`), or for an entirely different domain, the Common Name validation fails. This mismatch can arise from several factors: a misconfigured web server, incorrect DNS records, a proxy server or VPN interfering with the connection, an outdated local DNS cache, or even aggressive security software on your machine intercepting and re-encrypting traffic with its own generated certificate that doesn't match the original site's details. Essentially, Chrome sees a discrepancy between who the website claims to be (by its URL) and who its security certificate says it is, leading to a trust breakdown.

### Step-by-Step Solution

Addressing the `NET::ERR_CERT_COMMON_NAME_INVALID` error requires systematic troubleshooting, as the root cause can vary. Start with the simpler, more common solutions and progress to the more technical ones.

#### ## Step 1: Verify System Date and Time

An incorrect date or time on your computer can cause significant issues with SSL certificate validation, as certificates have specific validity periods. If your system's clock is out of sync, Chrome may perceive a valid certificate as expired or not yet valid.

1.  **For Windows:**
    *   Right-click the clock in the bottom-right corner of your screen and select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are both turned **on**.
    *   Click "Sync now" under "Synchronize your clock" to force an update.
2.  **For macOS:**
    *   Go to "System Settings" (or "System Preferences" on older versions).
    *   Search for "Date & Time."
    *   Ensure "Set date and time automatically" is checked and select a reliable network time server.

After correcting, close and reopen Chrome and try accessing the website again.

#### ## Step 2: Clear Chrome's Browser Data

Corrupted cache files or outdated cookies can sometimes interfere with how Chrome processes website connections and certificates. Clearing this data can resolve transient issues.

1.  Open Chrome and click the three-dot menu icon in the top-right corner.
2.  Go to "More tools" > "Clear browsing data."
3.  In the "Clear browsing data" window, set the "Time range" to "All time."
4.  Ensure "Cookies and other site data" and "Cached images and files" are checked. You may also check "Browsing history" if desired, but it's not strictly necessary for this fix.
5.  Click "Clear data."
6.  Restart Chrome and attempt to visit the website.

#### ## Step 3: Temporarily Disable Antivirus/Firewall SSL Scanning

Many antivirus and internet security suites include features that intercept and scan encrypted (HTTPS) traffic. To do this, they essentially act as a man-in-the-middle, generating their own temporary certificates. If this process is misconfigured or incompatible with a specific website's certificate, it can lead to `NET::ERR_CERT_COMMON_NAME_INVALID`.

1.  Locate your antivirus or firewall software's settings.
2.  Look for options related to "HTTPS scanning," "SSL inspection," "Web shield," "Web protection," or similar features.
3.  **Temporarily disable** these features. The exact steps vary widely by software (e.g., Avast, Bitdefender, ESET, Kaspersky often have this feature).
4.  With the feature disabled, try accessing the website in Chrome.
5.  **Important:** If disabling the feature resolves the issue, you should re-enable it and then explore options within your security software to either add an exception for the specific website or reconfigure the SSL scanning feature. Running without these protections long-term is not recommended.

#### ## Step 4: Flush Your DNS Cache

Your operating system maintains a local cache of DNS (Domain Name System) lookups to speed up website access. If this cache contains outdated or incorrect information for a particular domain, it can lead to Chrome trying to connect to the wrong server or misinterpreting certificate details, resulting in a common name mismatch.

1.  **For Windows:**
    *   Press `Windows Key + R` to open the Run dialog.
    *   Type `cmd` and press `Enter` to open the Command Prompt.
    *   Type `ipconfig /flushdns` and press `Enter`. You should see a confirmation message: "Successfully flushed the DNS Resolver Cache."
2.  **For macOS:**
    *   Open "Terminal" from Applications > Utilities.
    *   Type `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` and press `Enter`.
    *   You will be prompted to enter your administrator password.

After flushing the DNS cache, close and reopen Chrome before re-testing the website.

#### ## Step 5: Check Proxy Settings and VPN

Proxy servers or Virtual Private Networks (VPNs) can reroute your internet traffic, sometimes altering how SSL certificates are presented or validated. If you are using a proxy or VPN, try disabling it temporarily.

1.  **For Chrome's Proxy Settings (Windows/macOS):**
    *   Go to Chrome Settings (three-dot menu > Settings).
    *   Search for "proxy" in the settings search bar.
    *   Click "Open your computer's proxy settings."
    *   Ensure "Automatically detect settings" is enabled and that no manual proxy server is configured unless you specifically require one.
2.  **For VPN:**
    *   Disable your VPN software or browser extension.
    *   Test the website.
    *   If the VPN is the cause, consider trying a different server location or contacting your VPN provider's support.

#### ## Step 6: Verify Certificate Details (Advanced)

This step helps diagnose if the issue is truly a common name mismatch, which can be useful for reporting to the website administrator if you don't own the site.

1.  When you encounter the "Your connection is not private" error, click on the **lock icon with a red cross** (or "Not secure") in the address bar.
2.  Click on "Certificate invalid" or "Certificate is not valid."
3.  In the certificate viewer window, go to the "Details" tab.
4.  Look for the "Subject" field, which typically contains the "Common Name" (CN), and also look for "Subject Alternative Name" (SAN).
5.  Compare the domain(s) listed there with the actual URL you typed into Chrome's address bar. If they do not match, this confirms the `COMMON_NAME_INVALID` error is accurate, indicating the website's certificate configuration is incorrect for the domain you're trying to reach.

### Common Mistakes

*   **Ignoring the Warning:** The most significant mistake is to blindly click "Proceed to [website] (unsafe)" without understanding the risks. While it might sometimes work for self-owned, internal sites you explicitly trust, doing so on public websites can expose you to man-in-the-middle attacks, where malicious actors could intercept your data.
*   **Confusing `COMMON_NAME_INVALID` with other SSL errors:** While all lead to "Your connection is not private," errors like `NET::ERR_CERT_DATE_INVALID` (expired certificate) or `NET::ERR_CERT_AUTHORITY_INVALID` (untrusted issuer) require different troubleshooting paths. This guide specifically targets the common name mismatch.
*   **Permanently disabling security software:** Disabling your antivirus or firewall's SSL scanning capabilities indefinitely for convenience severely compromises your system's security. These features are vital for protecting against malware and phishing. Always re-enable them after troubleshooting, and seek proper configuration if they were the cause.
*   **Assuming the problem is always on your end:** While many fixes involve client-side actions, the `COMMON_NAME_INVALID` error often points to a misconfiguration on the *website's server*. If you've tried all client-side solutions, the website owner needs to address their SSL certificate setup.

### Prevention Tips

*   **Maintain Accurate System Time:** Always ensure your computer's date and time are set to synchronize automatically with an internet time server. This prevents certificate validation failures due to clock discrepancies.
*   **Keep Software Updated:** Regularly update your operating system, Google Chrome, and any antivirus/firewall software. Updates often include critical security patches and improved compatibility that can prevent certificate errors.
*   **Understand Security Software Settings:** If your antivirus or firewall uses HTTPS inspection, familiarize yourself with its settings. Ensure it's configured correctly, and create specific exceptions for known, trusted sites if necessary, rather than broadly disabling features.
*   **For Website Owners:** If you manage a website, ensure your SSL/TLS certificate is correctly installed and covers all necessary domain variations (e.g., `www.yourdomain.com` and `yourdomain.com`). Renew certificates well before their expiration date, and always configure your web server to serve the correct certificate for each hostname. Using services that automate certificate issuance and renewal (like Let's Encrypt) can help prevent these issues.
*   **Be Cautious on Public Wi-Fi:** Public Wi-Fi networks are notorious for potential security vulnerabilities, including man-in-the-middle attacks that can trigger `NET::ERR_CERT_COMMON_NAME_INVALID` errors. Use a trusted VPN when connecting to public networks to encrypt your traffic and bypass potential network-level interference.