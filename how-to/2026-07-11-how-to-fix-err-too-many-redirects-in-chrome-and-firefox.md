---
title: "How to Fix 'ERR_TOO_MANY_REDIRECTS' in Chrome and Firefox"
date: "2026-07-11T11:04:15.017Z"
slug: "how-to-fix-err-too-many-redirects-in-chrome-and-firefox"
type: "how-to"
description: "A comprehensive, step-by-step guide to troubleshooting and resolving the 'ERR_TOO_MANY_REDIRECTS' error in Chrome and Firefox, covering common causes and prevention."
keywords: "ERR_TOO_MANY_REDIRECTS, Too many redirects, Chrome redirect error, Firefox redirect error, page isn't redirecting properly, clear browser cache, .htaccess, WordPress redirect loop, SSL redirect, fix redirect error"
---

### Problem Explanation

Encountering an infinite redirect loop can be one of the most frustrating website errors, halting your browsing experience dead in its tracks. When your browser gets stuck in a loop of repeatedly being sent from one URL to another, it eventually gives up and displays an error message. In Google Chrome, you'll typically see "ERR_TOO_MANY_REDIRECTS" accompanied by text like "This page isn’t working" or "ERR_TOO_MANY_REDIRECTS took too long to respond." Firefox, on the other hand, will present "The page isn’t redirecting properly," explaining, "Firefox has detected that the server is redirecting the request for this address in a way that will never complete."

Regardless of the browser, the outcome is the same: you can't access the website. This error signifies that the website or its server is caught in an endless cycle of redirection, preventing the browser from ever reaching the final, intended destination page. It’s like trying to find a building, and every time you arrive, you’re told to go to another building, which then sends you back to the first, infinitely.

### Why It Happens

The `ERR_TOO_MANY_REDIRECTS` error primarily occurs when a web browser is caught in an endless loop of HTTP redirects. Websites use redirects (like 301 for permanent or 302 for temporary) to guide users from an old URL to a new one, perhaps after a page move, to enforce HTTPS, or to direct traffic to the preferred domain. However, if these redirect rules are misconfigured or conflict with each other, they can create a cycle.

The root causes are varied and can stem from both the client-side (your browser) and the server-side (the website itself). Common culprits include: outdated or corrupted browser cache and cookies, misconfigured HTTPS/SSL settings that force a redirect to an unsecure version which then redirects back, incorrect URL settings within a Content Management System (CMS) like WordPress, conflicting plugins or extensions (both browser and website), or improperly configured server redirect rules in files like `.htaccess`. Essentially, something is telling the browser to go to Location A, which then tells it to go to Location B, and Location B tells it to go back to Location A, forever.

### Step-by-Step Solution

Let's dive into fixing this pesky redirect loop. We'll start with common browser-side solutions and then move to server-side troubleshooting.

#### ## Step 1: Clear Your Browser's Cache and Cookies

This is often the quickest fix. Stale or corrupted browser data can sometimes trick your browser into an infinite loop, especially if a website's redirect rules have recently changed.

*   **For Google Chrome:**
    1.  Click the three-dot menu in the top-right corner.
    2.  Go to `More tools` > `Clear browsing data`.
    3.  Select a "Time range" (e.g., "All time" for a thorough clean).
    4.  Ensure `Cookies and other site data` and `Cached images and files` are checked.
    5.  Click `Clear data`.
*   **For Mozilla Firefox:**
    1.  Click the three-line "hamburger" menu in the top-right corner.
    2.  Go to `Settings` (or `Options`).
    3.  Select `Privacy & Security` from the left sidebar.
    4.  Scroll down to the `Cookies and Site Data` section and click `Clear Data...`.
    5.  Ensure both `Cookies and Site Data` and `Cached Web Content` are checked.
    6.  Click `Clear`.

After clearing, restart your browser and try accessing the website again.

#### ## Step 2: Check for HTTPS/SSL Redirect Issues

A very common cause of redirect loops is an incorrect HTTPS configuration. If your site is set to always use HTTPS, but there's a problem with your SSL certificate or the redirection from HTTP to HTTPS, it can cause a loop.

1.  **Verify your SSL certificate:** Ensure your SSL certificate is valid and correctly installed. You can check this by clicking the padlock icon in your browser's address bar when on an HTTPS site (if it loads partially). If there's an issue, your browser might show a "Not secure" warning or a broken padlock.
2.  **Ensure all resources are loaded via HTTPS:** Mixed content (some elements loaded over HTTP on an HTTPS page) can sometimes trigger redirect issues, though it typically manifests as security warnings.
3.  **Check for forced HTTPS rules:** If you're using a plugin or server rules to force HTTPS, ensure these rules are correctly written and not creating a conflict, e.g., redirecting `http://domain.com` to `https://domain.com` but then `https://domain.com` is somehow configured to redirect back to `http://domain.com`.

If you manage the website, ensure your hosting provider or CDN service has a valid SSL certificate provisioned and that any "always use HTTPS" settings are correctly configured.

#### ## Step 3: Examine Website URL Settings (WordPress Example)

If you're using a Content Management System (CMS) like WordPress, incorrect URL settings are a frequent culprit. A mismatch between the "WordPress Address (URL)" and "Site Address (URL)" can trigger infinite redirects.

1.  **Access WordPress Admin:** If you can still log into your WordPress admin panel, navigate to `Settings` > `General`.
2.  **Verify URLs:** Check the `WordPress Address (URL)` and `Site Address (URL)`. They should almost always be identical, including the `https://` prefix if your site uses SSL, and whether `www.` is present or not. For example:
    *   `WordPress Address (URL): https://yourdomain.com`
    *   `Site Address (URL): https://yourdomain.com`
    If they are different or use `http` when your site expects `https`, correct them.
3.  **Fix via `wp-config.php` (if admin is inaccessible):** If you can't access your WordPress admin, you can define these URLs directly in your `wp-config.php` file.
    *   Connect to your website via FTP or your hosting control panel's file manager.
    *   Locate the `wp-config.php` file in your WordPress root directory.
    *   Add the following lines *above* the line `/* That's all, stop editing! Happy blogging. */`:
        ```php
        define('WP_HOME','https://yourdomain.com');
        define('WP_SITEURL','https://yourdomain.com');
        ```
    *   Replace `https://yourdomain.com` with your actual domain name, ensuring it matches your desired protocol (HTTP/HTTPS) and `www` preference. Save the file.

#### ## Step 4: Review Your `.htaccess` File (Apache Servers)

The `.htaccess` file is a powerful configuration file used on Apache web servers. Misconfigured redirect rules within this file are a very common cause of redirect loops.

1.  **Access your `.htaccess` file:** Connect to your website via FTP or your hosting control panel's file manager. The `.htaccess` file is typically located in your website's root directory (e.g., `public_html`).
2.  **Rename the file:** As a diagnostic step, rename `.` to `.` (e.g., `htaccess_old`). This temporarily disables all rules within it.
    *   **Test:** Try accessing your website again. If the site loads (even if some permalinks or features are broken), the problem lies within your `.htaccess` file.
3.  **Restore or generate a new file:**
    *   If you find the problem was in `.` you can then open `.` and carefully review the redirect rules you've added. Look for conflicting `RewriteRule` or `Redirect` directives.
    *   For WordPress users, if you've renamed `.` and your site is now accessible, you can generate a default `.` file by simply logging into your WordPress admin, going to `Settings` > `Permalinks`, and clicking `Save Changes` without making any modifications. This will create a fresh, default `.` file.
    *   If you made a backup, restore a known good version of the file.

#### ## Step 5: Temporarily Disable Plugins and Browser Extensions

Conflicting plugins (especially caching, security, SEO, or dedicated redirect plugins) on your website or browser extensions can interfere with redirections.

1.  **Website Plugins (e.g., WordPress):**
    *   If you can access your WordPress admin, go to `Plugins` > `Installed Plugins`. Deactivate all plugins. Then try accessing your site. If the error disappears, reactivate plugins one by one, testing the site after each activation, until the culprit is found.
    *   If you can't access your admin, connect via FTP/file manager, navigate to the `wp-content` folder, and rename the `plugins` folder to something like `plugins_old`. This will deactivate all plugins. If the site loads, rename it back to `plugins` and then go into the WordPress admin to deactivate and reactivate them individually to find the problematic one.
2.  **Browser Extensions:**
    *   Open your browser's extension management page:
        *   **Chrome:** Type `chrome://extensions` into the address bar.
        *   **Firefox:** Type `about:addons` into the address bar.
    *   Disable all extensions. Restart your browser and test the website. If the site works, enable extensions one by one to isolate the one causing the issue.

#### ## Step 6: Check CDN Settings (If Applicable)

If you're using a Content Delivery Network (CDN) like Cloudflare, Sucuri, or others, their caching and SSL settings can sometimes cause redirect loops.

1.  **Temporarily Pause/Disable CDN:** Most CDNs offer an option to temporarily pause or disable their services for your domain. Do this from your CDN's dashboard.
2.  **Test:** If the website works after pausing the CDN, the issue lies within your CDN's configuration. Review its SSL settings (e.g., ensure it's set to "Full (strict)" for Cloudflare if your origin server has an SSL), caching rules, and origin server settings. Ensure the CDN is correctly pointing to your server's appropriate protocol (HTTP or HTTPS).

#### ## Step 7: Contact Your Hosting Provider or Website Developer

If you've tried all the above steps and the `ERR_TOO_MANY_REDIRECTS` error persists, it's time to reach out for professional help.

*   **Hosting Provider:** Your hosting provider has access to server logs which can pinpoint the exact redirect chain causing the loop. They can also check server-level configurations, such as Apache or Nginx redirect rules, that are beyond your direct access. Provide them with details of the troubleshooting steps you've already taken.
*   **Website Developer:** If you have a developer managing your website, they will be able to investigate custom code, theme functions, or database entries that might be causing the issue.

### Common Mistakes

When trying to fix redirect loops, people often make a few common mistakes that can prolong the troubleshooting process:

1.  **Not Clearing *All* Browser Data:** Many users clear only the cache but forget cookies, which can also store conflicting redirect information. Always clear both for a complete browser-side refresh.
2.  **Ignoring Browser Extensions:** Overlooking the possibility that a browser extension, especially one related to security or VPNs, might be interfering with site redirects.
3.  **Making Hasty `.htaccess` Changes:** Editing the `.htaccess` file without making a backup first, or adding new rules without understanding their full impact, can worsen the problem or even take your entire site offline. Always rename or back up the file before making modifications.
4.  **Troubleshooting Without Isolation:** Trying multiple fixes simultaneously (e.g., clearing cache, changing WordPress URLs, and editing `.htaccess` all at once) makes it impossible to identify which specific change resolved the issue or, worse, introduced a new problem. Test each step individually.
5.  **Forgetting CDN Involvement:** If a CDN is active, neglecting to check its settings or temporarily disable it can lead to hours of frustration looking for a problem on your server that's actually on the CDN side.

### Prevention Tips

Preventing `ERR_TOO_MANY_REDIRECTS` involves good website hygiene and careful configuration.

1.  **Regularly Update CMS, Themes, and Plugins:** Keep your website's core software, themes, and plugins up-to-date. Developers often release updates that fix bugs, including potential redirect issues.
2.  **Use Staging Environments:** Before making significant changes to your website (especially to URL structures, `.` files, or installing new redirect/SEO plugins), test them in a staging environment. This allows you to catch redirect loops or other issues before they impact your live site.
3.  **Careful with Redirect Rules:** When implementing new redirects (e.g., for old URLs or canonicalizing domains), double-check the rules for accuracy. Avoid creating chains of multiple redirects (e.g., A -> B -> C -> D); ideally, redirect directly to the final destination (A -> D). Use online redirect checker tools to verify your rules.
4.  **Proper SSL/HTTPS Configuration:** Ensure your SSL certificate is always valid, and your HTTP to HTTPS redirection is configured correctly and consistently across your server, CMS, and CDN. Avoid conflicting "force HTTPS" settings in different layers (e.g., both a plugin and `.htaccess`).
5.  **Backup Your Website Regularly:** Always have recent backups of your website files and database. In case a configuration change leads to a redirect loop, you can quickly revert to a working version.