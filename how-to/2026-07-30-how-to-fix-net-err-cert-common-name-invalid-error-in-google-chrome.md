---
title: "How to Fix 'NET::ERR_CERT_COMMON_NAME_INVALID' Error in Google Chrome"
date: "2026-07-30T16:25:31.649Z"
slug: "how-to-fix-net-err-cert-common-name-invalid-error-in-google-chrome"
type: "how-to"
description: "Learn to effectively troubleshoot and resolve the 'NET::ERR_CERT_COMMON_NAME_INVALID' error in Google Chrome with this step-by-step guide, covering common causes and preventative measures."
keywords: "NET::ERR_CERT_COMMON_NAME_INVALID, Chrome error fix, SSL certificate error, common name invalid, website not secure, fix certificate error, browser security, TLS error."
---

### Problem Explanation

When browsing the internet with Google Chrome, encountering the "NET::ERR_CERT_COMMON_NAME_INVALID" error can be a frustrating roadblock. This message is typically displayed on a full-page warning screen, often stating "Your connection is not private," accompanied by the specific error code at the bottom. The core issue revolves around the inability of your browser to securely verify the identity of the website you are trying to visit. Instead of displaying the intended webpage, Chrome presents this security alert, indicating a potential risk to your data and privacy.

This error essentially means that the SSL/TLS certificate presented by the website does not match the domain name you typed into your browser. While you might expect to see a padlock icon and "https://" indicating a secure connection, this error replaces it with a prominent warning, preventing you from proceeding to the site until the underlying issue is addressed. It's a critical security mechanism designed to protect you from spoofed websites or man-in-the-middle attacks, but often it can arise from simple misconfigurations.

### Why It Happens

The "NET::ERR_CERT_COMMON_NAME_INVALID" error stems from a mismatch between the domain name specified in a website's SSL/TLS certificate and the actual domain name being accessed. Every secure website uses an SSL/TLS certificate to encrypt data and verify its identity. This certificate contains information, crucially including the "Common Name" (CN) or, more commonly today, "Subject Alternative Names" (SANs), which list the domain(s) the certificate is valid for.

When your browser attempts to establish a secure connection, it checks if the website's URL (e.g., `www.example.com`) is listed in the certificate's CN or SAN fields. If there's no exact match—for instance, if the certificate is issued for `example.com` but you're trying to access `www.example.com` and `www.example.com` isn't included in the SANs, or if an IP address is used instead of a domain name for a certificate issued for a domain—Chrome flags this discrepancy. Other contributing factors can include outdated browser or operating system software, interference from security software (antivirus, firewalls), incorrect system date and time, or even a legitimate misconfiguration by the website owner, rendering their site's certificate invalid for the specific URL you're using.

### Step-by-Step Solution

#### 1. Check Your System Date and Time

An incorrect system date or time is a surprisingly common cause for certificate errors. SSL/TLS certificates have specific validity periods, and if your system's clock is significantly out of sync, your browser may incorrectly perceive a certificate as expired or not yet valid.

*   **For Windows:**
    1.  Right-click on the clock in the bottom-right corner of your screen.
    2.  Select "Adjust date and time."
    3.  Ensure "Set time automatically" and "Set time zone automatically" are both toggled **On**.
    4.  Click "Sync now" under "Synchronize your clock" to force a synchronization.
*   **For macOS:**
    1.  Go to "System Settings" (or "System Preferences" on older versions).
    2.  Search for "Date & Time."
    3.  Ensure "Set date and time automatically" is checked and that the correct time zone is selected.
*   After adjusting, restart Chrome and try accessing the website again.

#### 2. Clear Browser Data and Try Incognito Mode

Corrupted browser cache, cookies, or old browser data can sometimes interfere with certificate validation. Testing in Incognito mode can quickly rule out extensions or cached data as the cause.

*   **Clear Browser Data:**
    1.  Open Chrome, click the three-dot menu (top-right).
    2.  Go to "More tools" > "Clear browsing data."
    3.  Set "Time range" to "All time."
    4.  Check "Cookies and other site data" and "Cached images and files."
    5.  Click "Clear data."
*   **Use Incognito Mode:**
    1.  Open Chrome, click the three-dot menu.
    2.  Select "New Incognito window" (or press `Ctrl+Shift+N` on Windows/Linux, `Cmd+Shift+N` on macOS).
    3.  In the Incognito window, try navigating to the problematic website. If it works, an extension or your regular browser data was likely the culprit.

#### 3. Inspect the Website's SSL Certificate

Understanding the certificate details can provide crucial insight into the mismatch. This step helps confirm if the Common Name or SANs actually differ from the URL you are using.

*   When you encounter the "Your connection is not private" error, click on the **"Not secure"** indicator or the small **lock icon (often crossed out or red)** in the address bar (if it lets you proceed to some extent).
*   In the pop-up, click on "Certificate is invalid" or "Certificate (Invalid)" followed by "Certificate details" or "Connection is not secure" then "Certificate invalid."
*   Navigate to the **"Details"** tab in the certificate viewer.
*   Look for the **"Subject"** field, which typically contains the `CN=` (Common Name).
*   Also, look for the **"Subject Alternative Name"** (SAN) field. This field lists all valid domain names for the certificate.
*   Compare these names directly with the URL you typed into your browser. If your URL (e.g., `www.example.com`) is not present in either the CN or SANs, that's the precise mismatch causing the error. This often indicates a misconfiguration by the website owner.

#### 4. Temporarily Disable VPN, Proxy, or Antivirus/Firewall

Security software, VPNs, and proxy servers sometimes intercept SSL traffic for inspection, which can inadvertently lead to certificate validation errors if their own certificates are not properly trusted by your browser or if they modify the original certificate.

*   **VPN/Proxy:** If you are using a VPN client or a proxy server, temporarily disable it.
*   **Antivirus/Firewall:** Temporarily disable your antivirus software's web shield or SSL scanning feature. Consult your security software's documentation for exact steps.
    *   **Caution:** Only do this briefly and for testing purposes on trusted networks. Re-enable them immediately after testing to maintain your system's security.
*   After disabling, attempt to access the website again.

#### 5. Flush DNS Cache and Reset Network Settings

Sometimes, outdated DNS records or corrupted network configurations can lead to connection issues, including certificate validation problems.

*   **For Windows:**
    1.  Open Command Prompt as Administrator: Search for "cmd," right-click, and select "Run as administrator."
    2.  Type `ipconfig /flushdns` and press Enter. You should see "Successfully flushed the DNS Resolver Cache."
    3.  Type `netsh winsock reset` and press Enter.
    4.  Restart your computer for the changes to take effect.
*   **For macOS:**
    1.  Open Terminal (Applications > Utilities > Terminal).
    2.  Type `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` and press Enter.
    3.  Enter your administrator password when prompted.

#### 6. Update Google Chrome and Your Operating System

Outdated browser versions might lack support for newer certificate standards or have bugs that cause validation issues. Similarly, an outdated operating system might have old root certificates or security vulnerabilities.

*   **Update Google Chrome:**
    1.  Open Chrome, click the three-dot menu (top-right).
    2.  Go to "Help" > "About Google Chrome."
    3.  Chrome will automatically check for updates and install them. You may need to relaunch the browser.
*   **Update Your Operating System:**
    1.  **Windows:** Go to "Settings" > "Update & Security" > "Windows Update" and check for updates.
    2.  **macOS:** Go to "System Settings" (or "System Preferences") > "General" > "Software Update."

#### 7. Contact the Website Administrator

If you've tried all the above steps and still encounter the "NET::ERR_CERT_COMMON_NAME_INVALID" error, especially after inspecting the certificate and confirming a mismatch (Step 3), the problem most likely lies with the website's certificate configuration. The website owner needs to ensure their certificate correctly lists all domain variations (e.g., `example.com` and `www.example.com`) in the Subject Alternative Names. If possible, contact the website's support team or administrator and inform them of the specific error, mentioning the certificate common name mismatch.

### Common Mistakes

Many users encountering this error make common mistakes that can hinder troubleshooting or compromise security:

*   **Ignoring the warning without understanding the risk:** The "Your connection is not private" message is a serious security alert. Bypassing it without proper investigation, especially on unfamiliar sites, can expose you to data interception or malicious content. It's not just an inconvenience.
*   **Assuming it's always their computer's fault:** While local factors often contribute, the error frequently points to a misconfiguration on the website's server itself. Trying to "fix" it solely on your end might be fruitless if the root cause is external.
*   **Not checking the system clock first:** This simple oversight often leads to hours of complex troubleshooting when a quick time synchronization would have resolved the issue immediately.
*   **Clearing too much browser data indiscriminately:** While clearing cache and cookies can help, clearing all browser data (including passwords, autofill, etc.) can be disruptive if not done selectively or if the problem isn't browser-data related.
*   **Keeping security software permanently disabled:** Disabling antivirus or firewall temporarily for testing is acceptable, but leaving them off for extended periods, especially on untrusted networks, leaves your system vulnerable.

### Prevention Tips

Preventing the "NET::ERR_CERT_COMMON_NAME_INVALID" error primarily involves good browsing habits and ensuring your system and browser are up-to-date. For website owners, meticulous certificate management is key.

*   **Keep Software Updated:** Regularly update Google Chrome, your operating system, and any security software. Updates often include critical security patches and updated root certificate lists, ensuring compatibility with the latest web standards.
*   **Maintain Correct System Time:** Ensure your system's date and time are set to synchronize automatically with a reliable internet time server. This prevents many certificate validation issues related to time discrepancies.
*   **Be Cautious with Public Wi-Fi:** Public Wi-Fi networks can be susceptible to man-in-the-middle attacks where malicious actors try to intercept your traffic, potentially leading to certificate errors as they try to spoof legitimate sites. Use a reputable VPN when connecting to unsecured public networks.
*   **Verify URLs Carefully:** Always double-check the URL in your address bar, especially when clicking links from emails or untrusted sources. Minor typos can lead you to a different site with a certificate that doesn't match the intended domain.
*   **For Website Owners:**
    *   **Obtain Certificates for All Relevant Domains:** Ensure your SSL/TLS certificate includes all necessary Subject Alternative Names (SANs) for your domain, covering `www.yourdomain.com`, `yourdomain.com`, and any relevant subdomains.
    *   **Monitor Certificate Expiration:** Keep track of your certificate's expiration date and renew it well in advance to avoid service interruptions.
    *   **Proper Server Configuration:** Configure your web server correctly to serve the right certificate for each domain and ensure your server is sending the full certificate chain.