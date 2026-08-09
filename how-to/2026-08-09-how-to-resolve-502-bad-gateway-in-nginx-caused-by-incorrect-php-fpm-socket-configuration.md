---
title: "How to Resolve '502 Bad Gateway' in Nginx Caused by Incorrect PHP-FPM Socket Configuration"
date: "2026-08-09T20:29:26.686Z"
slug: "how-to-resolve-502-bad-gateway-in-nginx-caused-by-incorrect-php-fpm-socket-configuration"
type: "how-to"
description: "Learn how to fix the Nginx 502 Bad Gateway error stemming from misconfigured PHP-FPM sockets. This guide provides step-by-step instructions and common pitfalls."
keywords: "502 Bad Gateway, Nginx, PHP-FPM, Socket Configuration, Server Error, Web Server, Troubleshooting, Fix"
---

## Problem Explanation

Users encountering the "502 Bad Gateway" error in Nginx when trying to access a website are experiencing a communication breakdown. This specific iteration of the error indicates that Nginx, acting as a gateway, could not receive a valid response from the upstream server it was attempting to reach. In the context of a typical web server setup involving Nginx and PHP-FPM (FastCGI Process Manager), this usually means Nginx tried to pass a PHP request to PHP-FPM but received no valid answer or an error back.

When this error occurs, users will typically see a plain text page in their browser displaying "502 Bad Gateway" or a similar message, often without any further explanation from the web server. This signifies that the web server itself is functioning, but the backend service responsible for processing dynamic content (in this case, PHP scripts via PHP-FPM) is unavailable or misconfigured, preventing the website from rendering correctly.

## Why It Happens

The most common culprit behind a Nginx "502 Bad Gateway" error, specifically when dynamic content like PHP fails to load, is an incorrect configuration of the socket connection between Nginx and PHP-FPM. Nginx forwards PHP requests to PHP-FPM for processing. This communication typically happens over either a TCP socket (e.g., `127.0.0.1:9000`) or a Unix domain socket (e.g., `/run/php/php7.4-fpm.sock`). If Nginx is configured to listen on one type of socket or address/port combination, but PHP-FPM is actually listening on a different one, Nginx cannot establish a connection, leading to the 502 error.

This misconfiguration can arise from several scenarios. It could be due to a manual server setup where the paths or ports were mistyped in the Nginx configuration files or the PHP-FPM pool configuration. It can also happen after software updates, where package managers might change default socket locations or configurations. Essentially, Nginx is reaching out to a specific address to find PHP-FPM, but PHP-FPM isn't present or listening at that exact location, causing Nginx to report a gateway error.

## Step-by-Step Solution

Here's how to diagnose and resolve the "502 Bad Gateway" error caused by incorrect PHP-FPM socket configuration:

### Step 1: Identify the PHP-FPM Socket Configuration

First, you need to determine how PHP-FPM is configured to listen. This is typically found in the PHP-FPM pool configuration files. The exact location varies depending on your operating system and PHP version. Common locations include:

*   **Debian/Ubuntu:** `/etc/php/X.Y/fpm/pool.d/www.conf` (replace `X.Y` with your PHP version, e.g., `7.4`)
*   **CentOS/RHEL/Fedora:** `/etc/php-fpm.d/www.conf`

Open the relevant pool configuration file using a text editor (e.g., `nano`, `vim`). Look for lines starting with `listen =`. You will see either a TCP address and port or a Unix domain socket path.

**Example TCP Socket Configuration:**
```
listen = 127.0.0.1:9000
```

**Example Unix Domain Socket Configuration:**
```
listen = /run/php/php7.4-fpm.sock
```

Make a note of the `listen` directive's value.

### Step 2: Identify the Nginx PHP-FPM FastCGI Configuration

Next, you need to find where Nginx is configured to connect to PHP-FPM. This is usually within your Nginx server block configuration file for the affected website. Common locations for these files are:

*   `/etc/nginx/sites-available/your_website`
*   `/etc/nginx/conf.d/your_website.conf`

Within the `location ~ \.php$` block (or similar), look for the `fastcgi_pass` directive. This directive specifies the address and port or the Unix domain socket Nginx uses to communicate with PHP-FPM.

**Example Nginx Configuration with TCP Socket:**
```nginx
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass 127.0.0.1:9000;
}
```

**Example Nginx Configuration with Unix Domain Socket:**
```nginx
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/run/php/php7.4-fpm.sock;
}
```

Compare the value of `fastcgi_pass` in your Nginx configuration with the `listen` directive from Step 1.

### Step 3: Verify PHP-FPM Service Status

Ensure that the PHP-FPM service is running and that it is indeed listening on the configured socket.

**Check service status:**
```bash
sudo systemctl status phpX.Y-fpm  # Replace X.Y with your PHP version
```

If the service is not active, start it:
```bash
sudo systemctl start phpX.Y-fpm
```

If it is running, you can use tools like `netstat` or `ss` to confirm it's listening on the expected socket.

**For TCP sockets:**
```bash
sudo ss -tulnp | grep 9000 # Replace 9000 with your port
```
You should see an entry indicating `php-fpm` listening on `127.0.0.1:9000`.

**For Unix domain sockets:**
```bash
sudo ss -l | grep php # Or specify the socket path if known
```
You should see the PHP-FPM process listening on the specified `.sock` file.

If PHP-FPM is not listening on the expected socket, it suggests a problem with the PHP-FPM service itself or its configuration. Restarting PHP-FPM can sometimes resolve this:
```bash
sudo systemctl restart phpX.Y-fpm
```

### Step 4: Correct Mismatched Socket Configurations

If you identified a mismatch between the PHP-FPM `listen` directive and the Nginx `fastcgi_pass` directive in Steps 1 and 2, you need to make them consistent.

**Option A: Update Nginx Configuration**
If PHP-FPM is correctly configured to listen on a specific socket, and Nginx is pointing elsewhere, edit your Nginx server block configuration file (from Step 2). Update the `fastcgi_pass` directive to match the `listen` directive in your PHP-FPM pool configuration.

**Option B: Update PHP-FPM Configuration**
If Nginx is correctly configured, but PHP-FPM is listening on a different socket, edit the PHP-FPM pool configuration file (from Step 1). Change the `listen` directive to match the `fastcgi_pass` directive in your Nginx configuration.

**Important:** After making changes to either configuration file, you must reload or restart the respective service.

### Step 5: Reload/Restart Nginx and PHP-FPM

After correcting any configuration mismatches, it's crucial to apply the changes.

**Reload Nginx configuration:**
```bash
sudo systemctl reload nginx
```
(Or `sudo systemctl restart nginx` if a reload doesn't suffice)

**Restart PHP-FPM:**
```bash
sudo systemctl restart phpX.Y-fpm # Replace X.Y with your PHP version
```

### Step 6: Test the Website

Access your website in a web browser. The "502 Bad Gateway" error should now be resolved, and your PHP-powered content should load correctly. If the error persists, re-check all configuration files for typos and ensure PHP-FPM is running without errors.

### Step 7: Check Nginx and PHP-FPM Logs

If the problem persists, consult the logs for more detailed error messages.

**Nginx error log:**
```bash
sudo tail -f /var/log/nginx/error.log
```

**PHP-FPM error log:**
The location varies, but it's often defined within the PHP-FPM pool configuration file (e.g., `error_log` directive). Common locations include:
*   `/var/log/phpX.Y-fpm.log`

Look for specific errors related to connection refused, upstream timed out, or any indication of why the communication failed.

## Common Mistakes

A frequent mistake is assuming the socket paths or ports are standard. While common defaults exist, they can be overridden or change with software updates. Another pitfall is only updating one side of the communication. For instance, changing the Nginx `fastcgi_pass` directive without ensuring PHP-FPM is actually listening on that new socket, or vice-versa, will not resolve the issue. Forgetting to reload or restart Nginx and/or PHP-FPM after making configuration changes is also a very common oversight that leads to the old configuration persisting. Finally, users might confuse the PHP-FPM pool configuration file with the main `php.ini` file; changes need to be made in the specific `pool.d/www.conf` (or similar) file for PHP-FPM to pick them up.

## Prevention Tips

To prevent this issue from recurring, maintain a clear record of your server configurations, especially Nginx and PHP-FPM settings. Document the exact paths and ports used for the `fastcgi_pass` and `listen` directives. When updating PHP or Nginx, always review their configuration files for any default changes or new settings that might affect the existing setup. Regularly check the status of your PHP-FPM service and its listening sockets using `systemctl status` and `ss` commands. Implementing a robust monitoring system that alerts you to service downtime or communication errors can also provide early warnings before users even notice the 502 error.