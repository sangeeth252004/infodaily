---
title: "How to Fix 'ERR_TOO_MANY_REDIRECTS' Error in Chrome"
date: "2026-03-21T10:25:39.159Z"
slug: "how-to-fix-err-too-many-redirects-error-in-chrome"
type: "how-to"
description: "Resolve the 'ERR_TOO_MANY_REDIRECTS' error in Google Chrome with this expert guide. Learn why it happens and follow step-by-step solutions to get back online."
keywords: "ERR_TOO_MANY_REDIRECTS, Chrome error, redirect loop, fix browser error, clear cookies, clear cache, Chrome troubleshooting, website not loading"
---

### Problem Explanation

The 'ERR_TOO_MANY_REDIRECTS' error in Google Chrome is a frustrating message indicating that your browser is stuck in an infinite loop while trying to load a webpage. Instead of navigating directly to the content you requested, the browser is repeatedly sent from one URL to another, and then back again, or to a series of URLs that never reach a final destination. This continuous redirection exhausts the browser's ability to complete the request within a reasonable number of attempts.

When this error occurs, you will typically see a blank page or a specific error screen in Chrome. The message usually displays as "This page isn't working" followed by "\[website.com] redirected you too many times." Below this, Chrome often suggests trying to clear your cookies. This clearly indicates that the browser has been unsuccessful in resolving a series of redirects initiated by the website or potentially influenced by your browser's local data.

### Why It Happens

This persistent redirect loop primarily occurs when either the website's server or your local browser configuration gets confused about where to send you. On the server side, it might be a misconfiguration in the website's `.htaccess` file, incorrect server settings, or an issue with a content management system (CMS) or plugin that's generating an endless chain of redirects (e.g., forcing HTTP to HTTPS, then back to HTTP, or redirecting to a non-existent page which itself redirects).

On the client side, the problem often stems from outdated or corrupted browser data. Stored cookies from the problematic website, a full or corrupted browser cache, or even conflicting browser extensions can interfere with the redirection process. When your browser encounters an instruction to redirect, it might be using old, cached information or a faulty extension to interpret or execute that instruction, leading to the endless loop that triggers the 'ERR_TOO_MANY_REDIRECTS' message. An incorrect system clock can also cause issues with SSL/TLS certificates, contributing to redirect problems.

### Step-by-Step Solution

Follow these steps carefully to diagnose and resolve the 'ERR_TOO_MANY_REDIRECTS' error.

#### ## Step 1: Clear Specific Site Cookies and Data

Cookies and cached data for a specific website are the most common culprits. Clearing them for just the problematic site is less disruptive than clearing all browser data.

1.  Open Chrome and navigate to the problematic website, even if it displays the error.
2.  Click the **lock icon** (or "Not secure" text) to the left of the URL in the address bar.
3.  In the small dropdown menu, select **"Site settings"**. This will open a new tab with specific settings for that domain.
4.  Alternatively, you can go to `chrome://settings/siteData` directly, search for the website's domain, and click the **trash can icon** next to it.
5.  Click **"Clear data"** and then **"Clear"** to confirm.
6.  Close the settings tab and try refreshing the website.

#### ## Step 2: Clear Your Browser's Entire Cache and Cookies

If clearing specific site data doesn't work, a broader cache and cookie clearance might be necessary, as another site's data or a more general cache issue could be involved.

1.  Click the **three vertical dots** (menu icon) in the top-right corner of Chrome.
2.  Go to **"More tools" > "Clear browsing data..."**.
3.  In the "Clear browsing data" window, select the **"Advanced"** tab.
4.  From the "Time range" dropdown, choose **"All time"**.
5.  Ensure **"Cookies and other site data"** and **"Cached images and files"** are checked. You can uncheck "Browsing history" if you wish to preserve it.
6.  Click **"Clear data"**.
7.  Once completed, close and reopen Chrome, then try accessing the website again.

#### ## Step 3: Test in Incognito Mode

Incognito mode runs Chrome with a clean slate, disabling extensions and ignoring most cached data. This helps determine if extensions or your regular browser profile are causing the issue.

1.  Click the **three vertical dots** (menu icon) in the top-right corner of Chrome.
2.  Select **"New Incognito window"** (or use the shortcut `Ctrl+Shift+N` on Windows/Linux, `Cmd+Shift+N` on macOS).
3.  In the Incognito window, try to access the problematic website.

If the website loads correctly in Incognito mode, the problem is likely related to your browser extensions or your regular profile's cached data. Proceed to Step 4.

#### ## Step 4: Disable Browser Extensions

If Incognito mode resolved the issue, a faulty browser extension is a strong suspect. Extensions can sometimes interfere with website scripts, including redirection logic.

1.  Open Chrome and type `chrome://extensions` into the address bar, then press Enter.
2.  You will see a list of all installed extensions.
3.  **Disable all extensions** by toggling the blue switch for each one to the off position.
4.  Restart Chrome.
5.  Try accessing the problematic website. If it loads, re-enable your extensions one by one, checking the website after each re-enablement. This will help you identify the specific extension causing the conflict. Once found, remove or update that extension.

#### ## Step 5: Check Your System Date and Time

An incorrect system clock can cause issues with SSL/TLS certificates and secure connections, which might manifest as redirect errors.

1.  **On Windows:** Right-click the clock in the bottom-right corner of your taskbar and select "Adjust date/time." Ensure "Set time automatically" and "Set time zone automatically" are enabled. If not, enable them and click "Sync now."
2.  **On macOS:** Go to "System Settings" (or "System Preferences" on older versions) > "General" > "Date & Time." Ensure "Set date and time automatically" is checked.
3.  After verifying or correcting your system time, restart Chrome and test the website.

#### ## Step 6: Reset Chrome Browser Settings

If the above steps don't work, resetting Chrome to its default settings can resolve deeper configuration issues without deleting your bookmarks, history, or saved passwords.

1.  Click the **three vertical dots** (menu icon) in the top-right corner of Chrome.
2.  Go to **"Settings"**.
3.  Scroll down and click **"Reset settings"** in the left-hand menu (or expand "Advanced" then click "Reset settings").
4.  Click **"Restore settings to their original defaults"**.
5.  Confirm by clicking **"Reset settings"** in the dialog box. This will disable all extensions, clear temporary data, and reset themes.
6.  Restart Chrome and try loading the website.

#### ## Step 7: Flush Your Operating System's DNS Cache

Sometimes, outdated or incorrect DNS information stored on your computer can cause redirection problems by pointing your browser to an old or incorrect IP address for a website.

1.  **On Windows:**
    *   Open the Command Prompt as an administrator: Search for `cmd`, right-click "Command Prompt," and select "Run as administrator."
    *   Type `ipconfig /flushdns` and press Enter. You should see a confirmation message: "Successfully flushed the DNS Resolver Cache."
2.  **On macOS:**
    *   Open Terminal: Go to "Applications" > "Utilities" > "Terminal."
    *   Type `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder` and press Enter. You may be prompted for your administrator password.
3.  After flushing the DNS cache, restart your computer, then try accessing the website in Chrome.

### Common Mistakes

When encountering the 'ERR_TOO_MANY_REDIRECTS' error, many users make a few common mistakes that can prolong the troubleshooting process:

1.  **Not clearing the correct data:** Users often clear only their browsing history, which does not address cookies or cached files that are typically the source of redirect issues. It's crucial to specifically target "Cookies and other site data" and "Cached images and files."
2.  **Ignoring Incognito Mode results:** If a website loads in Incognito Mode, it's a strong indicator that an extension or your regular browser profile is the problem. Failing to follow up by disabling extensions one by one can lead to frustration and unnecessary, more drastic troubleshooting steps.
3.  **Restarting only the browser:** While a good initial step, some changes (like flushing DNS or resetting system time) require a full system restart to ensure all components are refreshed and correctly applied.

### Prevention Tips

To minimize the chances of encountering the 'ERR_TOO_MANY_REDIRECTS' error in the future, consider these best practices:

1.  **Regularly Clear Browser Data:** Periodically clear your browser's cache and cookies, especially for frequently visited or problematic websites. This keeps your local data fresh and prevents accumulation of potentially corrupted files. Consider doing a full cache/cookie clear every few months.
2.  **Manage Extensions Wisely:** Only install extensions you genuinely need and trust. Regularly review your installed extensions (`chrome://extensions`) and disable or remove any that are unused or seem suspicious. Keep your extensions updated, as developers often release fixes for conflicts.
3.  **Keep Chrome Updated:** Ensure your Google Chrome browser is always running the latest version. Browser updates often include bug fixes and improvements that can prevent various errors, including redirect issues caused by browser-side logic.
4.  **Maintain Accurate System Time:** Ensure your operating system's date and time are set to update automatically. Incorrect system time can interfere with secure connections and certificate validation, which are integral to website loading and redirection.