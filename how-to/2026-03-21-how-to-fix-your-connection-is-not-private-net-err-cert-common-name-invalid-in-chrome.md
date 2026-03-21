---
title: "How to Fix 'Your connection is not private' (NET::ERR_CERT_COMMON_NAME_INVALID) in Chrome"
date: "2026-03-21T01:54:40.060Z"
slug: "how-to-fix-your-connection-is-not-private-net-err-cert-common-name-invalid-in-chrome"
type: "how-to"
description: "Resolve the NET::ERR_CERT_COMMON_NAME_INVALID error in Chrome. Learn why your connection isn't private and get step-by-step solutions to regain secure browsing."
keywords: "NET::ERR_CERT_COMMON_NAME_INVALID, Your connection is not private, Chrome error, SSL certificate, HTTPS, troubleshoot, fix connection, browser security"
---

## Understanding the 'Your connection is not private' (NET::ERR_CERT_COMMON_NAME_INVALID) Error

You've likely encountered a jarring red screen in Google Chrome, accompanied by the message "Your connection is not private." Below this, you might see a more technical error code like `NET::ERR_CERT_COMMON_NAME_INVALID`. This alert signifies a significant security issue: Chrome cannot verify the identity of the website you're trying to visit. It’s a crucial safeguard designed to protect you from potentially malicious sites that could be trying to impersonate legitimate ones and steal your personal information. When this error appears, it means the digital certificate presented by the website doesn't match the address you've typed into your browser.

This error prevents you from proceeding to the website by default, and attempting to bypass it without understanding the cause can expose you to risks like phishing attacks, data interception, or malware. It’s a clear indication that the secure, encrypted connection that usually protects your browsing session cannot be established. The core of the problem lies in a mismatch between the website's security certificate and the web address (domain name) you are trying to access.

## Why the NET::ERR_CERT_COMMON_NAME_INVALID Error Occurs

The `NET::ERR_CERT_COMMON_NAME_INVALID` error specifically points to a discrepancy in the domain name associated with the website's SSL/TLS certificate. Every secure website has an SSL/TLS certificate that acts like a digital passport, proving its identity to your browser. This certificate includes information like the website's domain name. When you try to visit `https://www.example.com`, Chrome checks the certificate to ensure it’s valid and that the domain name listed on the certificate is indeed `www.example.com`. If the certificate is for a different domain (e.g., `www.anothersite.com`) or if it’s a wildcard certificate not properly configured for the subdomain you’re accessing, Chrome flags it as invalid.

There are several common reasons for this mismatch. The website owner might have obtained an SSL certificate for the wrong domain name, or perhaps they have multiple domains and the certificate was issued for a primary domain and not a specific subdomain you are visiting. Another possibility is that the website is using a wildcard certificate (like `*.example.com`) which is intended to cover multiple subdomains, but it might not be correctly installed or configured to cover the specific subdomain you are trying to access. In some cases, especially with older or misconfigured servers, the certificate might simply not be up-to-date or might have been issued with incorrect information.

## Step-by-Step Solution to Fix the Error

If you're encountering the `NET::ERR_CERT_COMMON_NAME_INVALID` error, here's a systematic approach to resolving it:

## Step 1: Verify the Website Address and Browser Cache

Before diving into more complex solutions, ensure you've typed the website address correctly. Even a small typo can lead to accessing the wrong server or a non-existent domain. Double-check the URL for any errors.

Next, clear your browser's cache and cookies. Stale cache data can sometimes cause Chrome to incorrectly believe a site's certificate is invalid.
1. Open Google Chrome.
2. Click the three vertical dots in the top-right corner of the window.
3. Select "Clear browsing data."
4. In the "Time range" dropdown, choose "All time."
5. Make sure "Cookies and other site data" and "Cached images and files" are checked.
6. Click "Clear data."
7. Restart Chrome and try accessing the website again.

## Step 2: Check Your System's Date and Time

An incorrect system date and time can significantly impact how your browser validates SSL certificates. Certificates have specific validity periods, and if your computer's clock is far off, Chrome may perceive a valid certificate as expired or not yet valid.
1. On Windows, right-click the clock in the taskbar and select "Adjust date/time." Ensure "Set time automatically" and "Set time zone automatically" are enabled. If they are, try toggling them off and on again, then click "Sync now."
2. On macOS, go to "System Preferences" > "Date & Time." Ensure "Set date and time automatically" is checked.

## Step 3: Try an Incognito Window

Testing the website in an Incognito window helps determine if a browser extension is interfering with the connection. Extensions can sometimes interfere with network requests or SSL certificate validation.
1. Open Chrome.
2. Click the three vertical dots in the top-right corner.
3. Select "New Incognito window."
4. In the Incognito window, navigate to the website that was causing the error.
5. If the site loads correctly in Incognito mode, a browser extension is likely the culprit. Proceed to Step 4.

## Step 4: Disable Potentially Conflicting Browser Extensions

If the website loaded fine in Incognito mode, an extension is the probable cause. You'll need to identify and disable it.
1. Go back to a regular Chrome window.
2. Click the three vertical dots in the top-right corner.
3. Select "More tools" > "Extensions."
4. Review your installed extensions. Disable them one by one, reloading the problematic website after each disable.
5. When the website loads without the error, you've found the offending extension. You can choose to keep it disabled or look for an alternative.

## Step 5: Examine the Website's SSL Certificate Details

While Chrome will block you from proceeding easily, you can often view the certificate details to get more information.
1. On the error page, look for an "Advanced" button or a link that says "Proceed to [website address] (unsafe)". **Do not click proceed unless you fully understand the risks and are confident the site is trustworthy.**
2. Instead, look for an option like "Certificate" or "Security" information. This might be a small icon (like a lock or an exclamation mark) in the address bar or on the error page itself.
3. Click on this to view the certificate details. Pay close attention to the "Issued to" or "Subject" field and compare it with the actual domain name you are trying to visit. This will often confirm the common name mismatch.

## Step 6: Consider Network or Antivirus Interference

Sometimes, security software or your network configuration can incorrectly flag legitimate connections.
1. **Antivirus/Firewall:** Temporarily disable your antivirus software and firewall one at a time to see if they are the cause. **Remember to re-enable them immediately after testing.** If disabling one resolves the issue, you'll need to configure its settings to allow access to the specific website or adjust its SSL scanning features.
2. **VPN/Proxy:** If you are using a VPN or proxy server, try disabling it and connecting directly to the internet. VPNs and proxies can sometimes interfere with SSL certificate validation.
3. **Network Administrator:** If you are on a corporate or public network, contact your network administrator. They might be using a proxy server or have security settings that could cause this error for certain sites.

## Step 7: Advanced: Temporarily Override (Use with Extreme Caution)

This step should only be considered if you are absolutely certain the website is legitimate and you understand the risks involved. Chrome intentionally makes it difficult to bypass this error to protect users.
1. On the error page, click "Advanced."
2. You may see a link that says "Proceed to [website address] (unsafe)." Click this link.
**WARNING:** This bypasses the security check. Only do this if you have thoroughly investigated and are confident in the website's authenticity. This is not a solution but a temporary workaround for trusted sites where you acknowledge the risk.

## Common Mistakes When Troubleshooting

A frequent misstep is immediately clicking "Proceed to [website address] (unsafe)" without understanding why the error occurred. While this might grant you access, it completely negates the security check that Chrome performed, leaving you vulnerable. Another common mistake is assuming the problem is with Chrome itself and not investigating the website's certificate or your local network environment. Many users also forget to restart their browser or computer after making changes, which is often necessary for those changes to take effect. Lastly, constantly clearing your entire browsing history and cookies for every minor issue can be counterproductive, as it removes useful data that might prevent future problems.

## Prevention Tips for Avoiding Future Errors

To minimize the chances of encountering the `NET::ERR_CERT_COMMON_NAME_INVALID` error:

Regularly update Google Chrome to the latest version. Browser updates often include fixes and improvements to security certificate handling. Ensure your operating system's date and time are consistently accurate by enabling automatic synchronization. If you manage your own website, always double-check that the SSL certificate you purchase and install is valid for the exact domain name(s) and subdomain(s) you intend to use. If using wildcard certificates, ensure they are correctly configured for all intended subdomains. For users on corporate networks, familiarize yourself with your IT department's policies regarding secure browsing and any specific instructions they provide. By maintaining good browser hygiene and being mindful of website security practices, you can significantly reduce the occurrence of such error messages.