---
title: "How to Fix \"ERR_CERT_COMMON_NAME_INVALID\" in Google Chrome"
date: "2026-02-18T20:38:40.415Z"
slug: "how-to-fix-err-cert-common-name-invalid-in-google-chrome"
type: "how-to"
description: "Learn how to troubleshoot and fix the \"ERR_CERT_COMMON_NAME_INVALID\" error in Google Chrome with this step-by-step guide, covering common causes and practical solutions."
keywords: "ERR_CERT_COMMON_NAME_INVALID, Chrome error, SSL error, certificate invalid, common name mismatch, fix connection private, Chrome troubleshooting, SSL certificate, network error"
---

Encountering an error message when you're trying to access a website can be frustrating, especially when it prevents you from reaching your destination. One such common error in Google Chrome is "ERR_CERT_COMMON_NAME_INVALID." This guide will walk you through understanding, troubleshooting, and ultimately resolving this specific issue.

### 1. Problem Explanation

When you try to visit a website and encounter the "ERR_CERT_COMMON_NAME_INVALID" error, Google Chrome is telling you that there's a problem with the website's security certificate. Instead of seeing the webpage, you'll likely be presented with a full-screen warning page displaying "Your connection is not private."

On this warning page, you'll see a prominent message stating "Attackers might be trying to steal your information from [website name] (for example, passwords, messages, or credit cards)." Below this, the specific error code "NET::ERR_CERT_COMMON_NAME_INVALID" will be visible. This error effectively blocks your access to the site because Chrome cannot securely verify its identity, prioritizing your safety over loading potentially compromised content.

### 2. Why It Happens

The "ERR_CERT_COMMON_NAME_INVALID" error primarily occurs when there's a mismatch between the domain name you're trying to access and the domain name listed on the website's SSL/TLS security certificate. Every secure website (those starting with `https://`) uses a digital certificate to prove its identity and encrypt communication. This certificate contains information about the website, including its "Common Name" (CN) and "Subject Alternative Names" (SANs), which specify the domain names the certificate is valid for.

When your browser connects to a website, it checks if the domain you've typed in matches one of the names on the certificate. If, for instance, the certificate is issued for `example.com` but you're trying to access `www.example.com` (and `www.example.com` isn't listed as a SAN), or if there's a typo, Chrome will flag it as a mismatch. Other contributing factors can include outdated browser data (cached certificates), incorrect system date and time (making valid certificates appear expired), interference from antivirus software or firewalls, misconfigured proxy settings, or even server-side issues with the certificate itself.

### 3. Step-by-Step Solution

Here's a comprehensive set of steps to help you diagnose and fix the "ERR_CERT_COMMON_NAME_INVALID" error.

#### Step 1: Check the Website URL and Basic Connectivity

Before diving into complex solutions, start with the basics. A simple typo in the website's address bar can trigger this error.

1.  **Verify the URL:** Carefully re-check the URL you entered in the address bar. Ensure there are no misspellings, extra characters, or incorrect subdomains. For example, if the certificate is for `mysite.com`, but you typed `my-site.com`, this error will appear.
2.  **Try a Different Browser (Optional):** Attempt to access the same website using a different web browser (e.g., Firefox, Edge). If the error persists across multiple browsers, the issue is likely with the website's server or your network rather than Chrome specifically.
3.  **Check Your Internet Connection:** Ensure your internet connection is stable. Try accessing other popular websites like Google or Wikipedia to confirm your network is functioning correctly. Restarting your router can sometimes resolve transient network issues.

#### Step 2: Clear Browser Data, Including SSL State

Your browser stores cached versions of websites and certificate information. Outdated or corrupted cached data can lead to certificate errors.

1.  **Clear Chrome's Cache and Cookies:**
    *   Open Chrome.
    *   Type `chrome://settings/clearBrowserData` into the address bar and press Enter.
    *   In the "Clear browsing data" window, set the "Time range" to "**All time**."
    *   Ensure "**Cached images and files**" and "**Cookies and other site data**" are checked. You can uncheck "Browsing history" if you wish.
    *   Click the "**Clear data**" button.
2.  **Clear SSL State (Windows Specific):**
    *   This step clears your computer's cached SSL certificates, which can become stale.
    *   Press `Windows Key + R` to open the Run dialog.
    *   Type `inetcpl.cpl` and press Enter to open "Internet Properties."
    *   Go to the "**Content**" tab.
    *   Click the "**Clear SSL state**" button.
    *   Click "OK" to close the Internet Properties window.

#### Step 3: Verify Your System Date and Time

Incorrect date and time settings on your computer can cause certificates to appear invalid, even if they are perfectly fine. Certificates have validity periods, and if your system's clock is off, it might think a valid certificate is expired or not yet valid.

1.  **For Windows:**
    *   Right-click on the clock in your taskbar and select "Adjust date/time."
    *   Ensure "Set time automatically" and "Set time zone automatically" are both toggled **On**.
    *   If they are already on, try toggling them off and then back on to force a sync.
2.  **For macOS:**
    *   Go to "Apple menu" > "System Settings" (or "System Preferences" on older versions).
    *   Click "General" > "Date & Time."
    *   Ensure "Set date and time automatically" is checked and select a network time server if prompted.

#### Step 4: Temporarily Disable Antivirus/Firewall/VPN (With Caution)

Some security software, including antivirus programs, firewalls, and VPNs, can interfere with or intercept secure connections (SSL inspection) for security scanning. This interception can sometimes cause certificate validation errors.

1.  **Temporarily Disable:** Locate your antivirus or firewall software's icon in your system tray (bottom-right on Windows) or menu bar (top-right on macOS). Right-click it and look for options to "Disable protection temporarily" or similar.
2.  **Test the Website:** Try accessing the problematic website again.
3.  **Re-enable Immediately:** If disabling the security software resolves the issue, you've found the culprit. **It is crucial to re-enable your security software immediately after testing.** You may need to investigate your antivirus/firewall settings to add an exception for Chrome or the specific website, or report the issue to the software vendor. Do NOT browse the internet with your security software permanently disabled.

#### Step 5: Check Proxy Settings

Proxy servers act as intermediaries between your browser and the internet. If your proxy settings are misconfigured or a proxy is intercepting traffic incorrectly, it can lead to certificate errors.

1.  **Open Chrome's Proxy Settings:**
    *   Type `chrome://settings/system` into the address bar and press Enter.
    *   Under the "System" section, find "Open your computer's proxy settings" and click it.
2.  **Review System Proxy Settings:**
    *   **On Windows:** This will open the "Proxy" section of your Windows settings. Ensure "Automatically detect settings" is turned **On** and that "Use a proxy server" is turned **Off** unless you explicitly know you need a proxy.
    *   **On macOS:** This will open "Network" settings. Select your active connection (Wi-Fi or Ethernet), click "Details" (or "Advanced"), then "Proxies." Ensure no unnecessary proxy settings are enabled or configured incorrectly.
3.  **Test Again:** After adjusting proxy settings, try revisiting the website.

#### Step 6: Update Chrome and Operating System

Outdated browser versions or operating systems can sometimes have bugs or lack the latest security protocols, leading to certificate validation issues.

1.  **Update Google Chrome:**
    *   Open Chrome.
    *   Type `chrome://settings/help` into the address bar and press Enter.
    *   Chrome will automatically check for updates and download them if available. Relaunch Chrome when prompted.
2.  **Update Your Operating System:**
    *   **On Windows:** Go to "Settings" > "Windows Update" and check for updates.
    *   **On macOS:** Go to "Apple menu" > "System Settings" (or "System Preferences") > "General" > "Software Update."

#### Step 7: Investigate the Certificate Itself (Advanced)

If all the above steps fail, the problem might be with the website's certificate configuration on the server side. You can examine the certificate details in Chrome to confirm this.

1.  **View Certificate Details:**
    *   On the problematic "Your connection is not private" page, click the **lock icon** (or the red "Not secure" warning) in the address bar.
    *   Click on "Connection is secure" (even if it's showing an error, this option might still be present) or "Certificate is valid" (if available).
    *   Click on "**Certificate**" to view its details.
2.  **Examine "Issued To" and "Subject Alternative Name":**
    *   Look at the "Details" tab. Pay close attention to the "Subject" field (specifically the "Common Name" part, e.g., `CN=example.com`) and the "Subject Alternative Name" field.
    *   Compare these names to the exact URL you are trying to access. If the URL doesn't match any of the names listed in the certificate (e.g., certificate is for `domain.com` but you're trying to access `sub.domain.com` and `sub.domain.com` isn't listed), then the certificate is indeed invalid for your requested domain.
3.  **Contact the Website Administrator:** If you confirm a mismatch, especially if it's for a website you frequently visit and trust, the issue lies with the website's server configuration. It's best to contact the website administrator or support team and inform them of the "ERR_CERT_COMMON_NAME_INVALID" error and the certificate details you observed.

### 4. Common Mistakes

When troubleshooting this error, users often fall into a few traps:

*   **Ignoring the warning and proceeding:** Clicking "Proceed to [website] (unsafe)" is a risky workaround. While it might sometimes work for self-signed certificates on internal networks, doing this for public websites bypasses critical security checks and can expose you to potential data theft or malware. Always understand the implications before proceeding unsafely.
*   **Only clearing browser cache:** Many users clear their browser's cache and cookies but forget to clear the "SSL state" on their operating system. This cache specifically stores information about certificates, and a stale entry here can perpetuate the error.
*   **Misdiagnosing the problem:** Assuming the problem is always on the user's side. While often true, sometimes the issue is with the website's certificate installation or configuration, requiring intervention from the website's administrator.
*   **Disabling security software permanently:** Temporarily disabling antivirus or firewalls for testing is acceptable, but leaving them off long-term leaves your system vulnerable to threats. If your security software is the cause, configure it correctly or seek support from its vendor.

### 5. Prevention Tips

To minimize the chances of encountering the "ERR_CERT_COMMON_NAME_INVALID" error in the future, consider these best practices:

*   **Keep Software Updated:** Regularly update your Google Chrome browser and your operating system. Updates often include critical security patches and improved handling of web certificates.
*   **Maintain Correct System Time:** Ensure your computer's date and time are set to update automatically. This prevents certificate validation issues caused by an out-of-sync clock.
*   **Be Mindful of URLs:** Double-check website URLs before entering sensitive information. Bookmark frequently visited, trusted sites to avoid typos.
*   **Use Reputable Security Software:** Ensure your antivirus and firewall are up-to-date and from a reputable vendor. Configure them correctly to avoid unnecessary SSL interception without compromising your security.
*   **Understand Certificate Warnings:** When presented with a certificate warning, take a moment to understand what it means rather than blindly bypassing it. A "COMMON_NAME_INVALID" error, in particular, suggests a direct mismatch, which can sometimes indicate a phishing attempt or a misconfigured server.
*   **For Website Owners/Administrators:** Ensure your SSL/TLS certificates are correctly issued for all relevant domain names (e.g., both `example.com` and `www.example.com` via Subject Alternative Names), installed properly, and renewed well before their expiration dates.