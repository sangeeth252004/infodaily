---
title: "How to Fix Nginx '502 Bad Gateway' When Proxying to PHP-FPM Due to Incorrect Socket or Port Configuration"
date: "2026-09-28T03:43:31.402Z"
slug: "how-to-fix-nginx-502-bad-gateway-when-proxying-to-php-fpm-due-to-incorrect-socket-or-port-configuration"
type: "how-to"
description: "Resolve Nginx 502 Bad Gateway errors caused by misconfigured PHP-FPM socket or port settings with this comprehensive technical guide."
keywords: "Nginx, PHP-FPM, 502 Bad Gateway, proxy, configuration, socket, port, server, fix, error, troubleshooting, web server"
---

## Problem Explanation

Encountering a "502 Bad Gateway" error when your Nginx web server is configured to proxy requests to a PHP-FPM (FastCGI Process Manager) backend is a common and frustrating issue. When a user attempts to access a dynamic page on your website, Nginx receives the request and forwards it to PHP-FPM for processing. If Nginx cannot successfully communicate with PHP-FPM, it will return a 502 Bad Gateway error, indicating that it received an invalid response from the upstream server. This means that the web server (Nginx) is functioning, but the application server (PHP-FPM) it's trying to communicate with is not responding correctly or is unreachable. Users will typically see a plain "502 Bad Gateway" page in their browser, often with no further explanation, leaving them unable to access your website's content.

## Why It Happens

The "502 Bad Gateway" error in this context specifically points to a breakdown in communication between Nginx and PHP-FPM. The most frequent culprit is an incorrect configuration that prevents Nginx from locating or connecting to the PHP-FPM process. PHP-FPM can communicate with Nginx via two primary methods: a Unix socket file or a TCP/IP port. If the `fastcgi_pass` directive in your Nginx server block is pointing to the wrong socket path or an incorrect port, Nginx will fail to establish a connection. This could be due to a typo, a misunderstanding of where PHP-FPM is configured to listen, or a change in the PHP-FPM configuration that hasn't been reflected in Nginx's settings. Essentially, Nginx is trying to knock on a door that either doesn't exist or is being answered by the wrong entity, leading to the gateway error.

## Step-by-Step Solution

### ## Step 1: Verify PHP-FPM Service Status

Before diving into configuration files, confirm that the PHP-FPM service is actually running. An inactive PHP-FPM process is a guaranteed way to trigger a 502 error.

Use your system's package manager or `systemctl` to check the status. For systems using `systemd` (common on modern Linux distributions):

```bash
sudo systemctl status php*-fpm.service
```

Replace `php*` with your specific PHP version, e.g., `php8.1-fpm.service`.

If the service is not active, start it:

```bash
sudo systemctl start php*-fpm.service
```

And enable it to start on boot:

```bash
sudo systemctl enable php*-fpm.service
```

If you encounter errors starting PHP-FPM, investigate the PHP-FPM error logs (often located in `/var/log/php*-fpm/error.log`) for more detailed information.

### ## Step 2: Locate PHP-FPM Configuration

The PHP-FPM configuration file dictates how it listens for connections from Nginx. The primary configuration file typically resides in a path like `/etc/php/[PHP_VERSION]/fpm/php-fpm.conf` or `/etc/php/[PHP_VERSION]/fpm/pool.d/www.conf`.

To find the specific listen address, open the relevant pool configuration file for editing. A common pool configuration file is `www.conf`:

```bash
sudo nano /etc/php/[PHP_VERSION]/fpm/pool.d/www.conf
```

Again, replace `[PHP_VERSION]` with your installed PHP version (e.g., `8.1`).

### ## Step 3: Identify PHP-FPM Listen Directive

Within the `www.conf` file (or your chosen pool configuration file), look for the `listen` directive. This directive specifies how PHP-FPM is accessible. It will either be a Unix socket path or a TCP/IP address and port.

**Example of a Unix socket:**
```ini
listen = /run/php/php[PHP_VERSION]-fpm.sock
```

**Example of a TCP/IP port:**
```ini
listen = 127.0.0.1:9000
```
or
```ini
listen = 9000
```

Note down the exact value of this `listen` directive. This is the address Nginx *must* be configured to use.

### ## Step 4: Inspect Nginx Server Block Configuration

Now, you need to examine your Nginx server block configuration for the website experiencing the 502 error. This file is usually located in `/etc/nginx/sites-available/` and symlinked to `/etc/nginx/sites-enabled/`.

Open the relevant Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/your_site_config
```

Replace `your_site_config` with the name of your site's configuration file.

### ## Step 5: Verify Nginx `fastcgi_pass` Directive

Inside your Nginx server block configuration, locate the `location ~ \.php$` block (or similar) which handles PHP requests. Within this block, you'll find the `fastcgi_pass` directive. This directive tells Nginx where to send PHP requests.

Compare the value of `fastcgi_pass` with the `listen` directive you found in PHP-FPM's configuration file.

**If PHP-FPM uses a Unix socket:**
Your `fastcgi_pass` directive in Nginx should look exactly like this:
```nginx
fastcgi_pass unix:/run/php/php[PHP_VERSION]-fpm.sock;
```
Ensure the path, including the `.sock` extension, matches precisely.

**If PHP-FPM uses a TCP/IP port:**
Your `fastcgi_pass` directive in Nginx should look like this:
```nginx
fastcgi_pass 127.0.0.1:[PORT_NUMBER];
```
or
```nginx
fastcgi_pass [PORT_NUMBER];
```
Again, the IP address (if specified) and the port number must match what's configured in `php-fpm.conf`.

If there is a mismatch, correct the `fastcgi_pass` directive in your Nginx configuration to align with the `listen` directive in PHP-FPM.

### ## Step 6: Reload Nginx and PHP-FPM

After making any necessary corrections to the Nginx configuration, you need to reload Nginx for the changes to take effect.

```bash
sudo systemctl reload nginx
```

If you also modified the PHP-FPM configuration (e.g., changed the listen port or socket), you should also restart or reload PHP-FPM:

```bash
sudo systemctl restart php*-fpm.service
```
Or, for a less disruptive reload:
```bash
sudo systemctl reload php*-fpm.service
```

### ## Step 7: Test Your Website

Finally, visit your website in a browser and try to access a PHP page. If the configuration is correct, the "502 Bad Gateway" error should be gone, and your PHP application should function as expected. If the error persists, re-examine the logs for both Nginx (`/var/log/nginx/error.log`) and PHP-FPM for any new error messages.

## Common Mistakes

A very common pitfall is a simple typo in either the Nginx `fastcgi_pass` directive or the PHP-FPM `listen` directive. Even a single incorrect character or a missing slash can lead to a connection failure. Another frequent mistake is assuming the PHP-FPM configuration file path is the same across all installations or PHP versions; always verify the correct path for your specific setup. Furthermore, users sometimes forget to reload or restart Nginx and PHP-FPM after making configuration changes, meaning their edits are never applied. Lastly, if PHP-FPM is configured to listen on a non-default port, forgetting to include that port number in Nginx's `fastcgi_pass` directive will result in a failed connection.

## Prevention Tips

To prevent this issue from recurring, maintain meticulous documentation of your server configurations, including the exact paths to PHP-FPM configuration files and the `listen` directives. When deploying new sites or updating PHP versions, carefully cross-reference the Nginx `fastcgi_pass` settings with the corresponding PHP-FPM `listen` settings. Consider using a consistent naming convention for your PHP-FPM socket files if you manage multiple PHP versions. Regularly check the status of your PHP-FPM service and review its logs to catch potential issues early. Automating configuration management with tools like Ansible or Chef can also help ensure consistency and reduce manual errors.