---
title: "How to Fix Nginx '502 Bad Gateway' Error Caused by PHP-FPM Configuration Issues"
date: "2026-02-28T15:21:19.446Z"
slug: "how-to-fix-nginx-502-bad-gateway-error-caused-by-php-fpm-configuration-issues"
type: "how-to"
description: "Diagnose and resolve Nginx '502 Bad Gateway' errors stemming from PHP-FPM configuration problems with this expert guide. Learn to check service status, reconfigure sockets, adjust resource limits, and prevent future occurrences."
keywords: "Nginx 502 Bad Gateway, PHP-FPM configuration, fix Nginx error, PHP-FPM socket, Nginx FastCGI, PHP-FPM resource limits, web server error, troubleshooting 502"
---

### Problem Explanation

The "502 Bad Gateway" error is a common HTTP status code encountered when Nginx, acting as a reverse proxy, fails to receive a valid response from an upstream server, which in the context of PHP applications, is typically PHP-FPM (FastCGI Process Manager). When a user requests a PHP page, Nginx forwards the request to PHP-FPM for processing. If PHP-FPM is unable to process the request or send a timely, valid response back to Nginx, Nginx will display a "502 Bad Gateway" message in the browser.

Users will see a standard error page stating "502 Bad Gateway" in their web browser. Crucially, Nginx's error logs (e.g., `/var/log/nginx/error.log`) will often contain entries such as `connect() failed (111: Connection refused) while connecting to upstream` or `upstream prematurely closed connection while reading response header from upstream`, providing the first critical clues that the problem lies with the communication between Nginx and PHP-FPM.

### Why It Happens

The "502 Bad Gateway" error, specifically when related to PHP-FPM, primarily indicates a communication breakdown or processing failure within the PHP-FPM service itself. Nginx is configured to pass PHP requests to PHP-FPM, usually via a Unix socket file or a TCP port. If PHP-FPM is not running, is misconfigured to listen on a different socket/port than Nginx expects, or if its processes are crashing due to resource exhaustion or fatal PHP errors, Nginx will be unable to establish a connection or receive a proper response.

Common configuration issues include:
*   **Mismatched `listen` and `fastcgi_pass` directives:** Nginx is configured to connect to one socket/port, but PHP-FPM is listening on another, or not listening at all.
*   **Incorrect file permissions or ownership:** The Unix socket file created by PHP-FPM might have permissions that prevent Nginx from accessing it.
*   **Resource limitations:** PHP-FPM processes might be terminating prematurely due to hitting memory limits (`memory_limit`), maximum execution time (`max_execution_time`), or the number of available child processes (`pm.max_children`) being insufficient to handle the load.
*   **PHP-FPM service not running:** The PHP-FPM service might be stopped, crashed, or failed to start correctly.

### Step-by-Step Solution

#### ## Step 1: Verify PHP-FPM Service Status

The first diagnostic step is to confirm that the PHP-FPM service is actually running. A stopped or failed service will immediately result in a 502 error.

Execute the following command, replacing `X.X` with your specific PHP version (e.g., `7.4`, `8.1`, `8.2`):

```bash
sudo systemctl status phpX.X-fpm
```

**Expected output (running):**
```
● phpX.X-fpm.service - The PHP X.X FastCGI Process Manager
     Loaded: loaded (/lib/systemd/system/phpX.X-fpm.service; enabled; vendor preset: enabled)
     Active: active (running) since ...
```

If the service is not active (e.g., `inactive (dead)` or `failed`), attempt to start it:

```bash
sudo systemctl start phpX.X-fpm
```

Then check its status again. If it fails to start, examine the PHP-FPM logs (Step 4) immediately.

#### ## Step 2: Inspect Nginx Configuration for `fastcgi_pass`

Nginx must be correctly configured to pass PHP requests to the PHP-FPM service. This is defined by the `fastcgi_pass` directive within your Nginx server block for PHP processing.

Open your Nginx site configuration file (usually found in `/etc/nginx/sites-available/your_site_config` or `/etc/nginx/conf.d/your_site.conf`):

```bash
sudo nano /etc/nginx/sites-available/your_site_config
```

Locate the `location ~ \.php$` block. Inside this block, find the `fastcgi_pass` directive. It typically looks like one of these:

*   **Unix socket:** `fastcgi_pass unix:/run/php/phpX.X-fpm.sock;`
*   **TCP port:** `fastcgi_pass 127.0.0.1:9000;`

Note down the exact path to the socket or the IP address and port number. This must match PHP-FPM's `listen` directive (next step).

#### ## Step 3: Verify PHP-FPM Pool Configuration (`listen` directive)

Now, check how PHP-FPM is configured to listen for incoming connections. This is defined in its pool configuration file. For most installations, the default pool is `www.conf`.

Open the PHP-FPM pool configuration file, replacing `X.X` with your PHP version:

```bash
sudo nano /etc/php/X.X/fpm/pool.d/www.conf
```

Find the `listen` directive. It should exactly match the `fastcgi_pass` value from your Nginx configuration in Step 2.

*   **Unix socket:** `listen = /run/php/phpX.X-fpm.sock`
*   **TCP port:** `listen = 127.0.0.1:9000`

If there's a mismatch, **correct the `listen` directive in the PHP-FPM configuration to match the `fastcgi_pass` in Nginx.** For Unix sockets, also check the `listen.owner` and `listen.group` directives; these should typically be `nginx` or `www-data` to allow Nginx to access the socket.

```ini
; Example for Unix socket:
listen = /run/php/phpX.X-fpm.sock
listen.owner = www-data   ; Or nginx, depending on your Nginx user
listen.group = www-data   ; Or nginx
listen.mode = 0660
```

#### ## Step 4: Examine PHP-FPM Log Files

If the service is running and configurations match, the next place to look for clues is the PHP-FPM error logs. These logs often contain specific reasons why PHP-FPM processes might be crashing or failing to respond.

The PHP-FPM error log path is often defined in `/etc/php/X.X/fpm/php-fpm.conf` or within the pool configuration file itself (`www.conf`). Common locations include:

*   `/var/log/phpX.X-fpm.log`
*   `/var/log/php-fpm/www-error.log` (if `php_admin_value[error_log]` is set in `www.conf`)
*   The system journal: `journalctl -u phpX.X-fpm.service`

Look for entries immediately preceding the 502 error. Common messages include:

*   `child exited on signal 11 (SIGSEGV)`: Segmentation fault, often due to faulty PHP code or extensions.
*   `max_children limit reached`: Indicates that PHP-FPM doesn't have enough child processes to handle the load.
*   Memory exhaustion errors.

#### ## Step 5: Adjust PHP-FPM Resource Limits

If logs indicate processes are dying or resources are exhausted, you need to adjust PHP-FPM's process management and resource settings in `www.conf` (or your specific pool file).

Look for these directives and adjust them cautiously:

*   `pm = ondemand` or `pm = dynamic`: `dynamic` is generally preferred for most servers. `ondemand` saves memory but can introduce latency.
*   `pm.max_children`: The maximum number of child processes that can be alive at the same time. If this is too low, requests will queue or fail. A starting point could be `Total_RAM / Size_of_average_PHP_process`.
*   `pm.start_servers`: The number of child processes created on startup (for `dynamic` mode).
*   `pm.min_spare_servers`: Minimum number of idle server processes (for `dynamic` mode).
*   `pm.max_spare_servers`: Maximum number of idle server processes (for `dynamic` mode).
*   `request_terminate_timeout`: The maximum time a single request is allowed to execute. If a script exceeds this, the process is killed. Set to `0` for no timeout, but this is not recommended.
*   `php_admin_value[memory_limit]`: The maximum amount of memory a script is permitted to consume. If scripts exceed this, they terminate.

**Example adjustments in `www.conf`:**

```ini
; Process Manager settings (for dynamic mode)
pm = dynamic
pm.max_children = 50   ; Adjust based on your server's RAM and traffic
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 20

; Request timeout
request_terminate_timeout = 300 ; 300 seconds (5 minutes)

; PHP memory limit
php_admin_value[memory_limit] = 256M
```

#### ## Step 6: Verify File Permissions and Ownership

For Unix sockets, correct permissions are crucial. If Nginx (usually running as `www-data` or `nginx` user) cannot access the socket created by PHP-FPM, it will result in a "Connection refused" error.

Ensure the `listen.owner` and `listen.group` directives in `www.conf` (Step 3) are set to the user/group Nginx runs as. If you changed them, you must restart PHP-FPM.

You can check the Nginx user by looking at the `user` directive in `/etc/nginx/nginx.conf`. Typically it's `www-data` or `nginx`.

Also, verify that the directory containing the socket file (e.g., `/run/php/`) has appropriate permissions allowing PHP-FPM to create the file and Nginx to access it. For `/run/php/`, permissions are usually `755` for directories and `0660` for the socket itself, owned by root and the FPM user/group.

```bash
ls -l /run/php/phpX.X-fpm.sock
```

The output should show owner/group matching `listen.owner`/`listen.group` from `www.conf` (e.g., `www-data www-data`).

#### ## Step 7: Restart Services

After making any changes to Nginx or PHP-FPM configuration files, you *must* restart both services for the changes to take effect.

First, test Nginx configuration for syntax errors:

```bash
sudo nginx -t
```

If the test is successful, restart Nginx and PHP-FPM:

```bash
sudo systemctl restart phpX.X-fpm
sudo systemctl restart nginx
```

After restarting, clear your browser cache and try accessing your PHP application again.

### Common Mistakes

*   **Mismatched Socket/Port:** The most frequent error is configuring Nginx's `fastcgi_pass` to point to a different Unix socket path or TCP port than what PHP-FPM's `listen` directive is configured for. Always double-check these two values.
*   **Forgetting to Restart Services:** Configuration changes to Nginx or PHP-FPM are not applied until their respective services are reloaded or restarted. Many users forget this crucial step, leading to frustration when fixes don't seem to work.
*   **Incorrect File Permissions for Socket:** When using Unix sockets, inadequate permissions (e.g., PHP-FPM creating the socket with restrictive permissions, or Nginx running as a user without access) will prevent Nginx from connecting.
*   **Ignoring PHP-FPM Logs:** Users often focus solely on Nginx logs. PHP-FPM logs (and potentially general system logs via `journalctl`) are vital for understanding why PHP processes are failing internally.
*   **Insufficient Resource Allocation:** Under high traffic, default PHP-FPM settings for `pm.max_children` or `memory_limit` can be too low, causing processes to crash or requests to queue indefinitely.
*   **Firewall Blocking TCP Port:** If using TCP (`127.0.0.1:9000`), a firewall on the server might be blocking this internal port, preventing Nginx from communicating with PHP-FPM.

### Prevention Tips

*   **Standardize Socket/Port Configuration:** Consistently use the same Unix socket path (e.g., `/run/php/phpX.X-fpm.sock`) or TCP port (`127.0.0.1:9000`) across all your Nginx and PHP-FPM configurations for a given PHP version. This reduces the chance of mismatches.
*   **Monitor Logs Regularly:** Implement log monitoring tools or habitually check Nginx error logs and PHP-FPM error logs. Early detection of warnings or errors can prevent a full 502 outage.
*   **Resource Scaling:** Periodically review and adjust PHP-FPM's `pm.*` directives (`max_children`, `start_servers`, etc.) based on your server's load, available RAM, and application demands. Don't set `max_children` too high if your server doesn't have the memory to support it.
*   **Code Quality and Optimization:** Ensure your PHP applications are well-written, optimized, and free of fatal errors or excessive memory consumption. Poorly written code can quickly exhaust PHP-FPM resources, leading to process crashes.
*   **Use Version Control for Configurations:** Store your Nginx and PHP-FPM configuration files in a version control system (like Git). This allows you to track changes, revert to previous working states, and easily replicate configurations across environments.
*   **Test in Staging Environments:** Before deploying significant configuration changes or application updates to production, test them thoroughly in a staging environment that mirrors your production setup.