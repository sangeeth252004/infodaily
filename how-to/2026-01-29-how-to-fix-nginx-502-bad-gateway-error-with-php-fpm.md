---
title: "How to Fix Nginx '502 Bad Gateway' Error with PHP-FPM"
date: "2026-01-29T15:35:20.154Z"
slug: "how-to-fix-nginx-502-bad-gateway-error-with-php-fpm"
type: "how-to"
description: "Diagnose and resolve the Nginx '502 Bad Gateway' error when serving PHP applications with PHP-FPM. Learn common causes, step-by-step solutions, and prevention tips."
keywords: "Nginx 502 bad gateway, PHP-FPM error, fix 502, Nginx PHP error, PHP-FPM troubleshooting, Nginx configuration, PHP-FPM sockets, PHP memory limit, fastcgi_pass, upstream timed out"
---

### Problem Explanation

The Nginx '502 Bad Gateway' error indicates that Nginx, acting as a reverse proxy, received an invalid response from an upstream server. In the context of PHP applications, this upstream server is almost always PHP-FPM (FastCGI Process Manager). When a user requests a PHP page, Nginx forwards the request to PHP-FPM, waits for PHP-FPM to process the script and return the output, and then serves that output to the user. A 502 error means this handshake failed: PHP-FPM either didn't respond, responded too slowly, or sent an uninterpretable response.

Users encountering this problem will see a "502 Bad Gateway" message displayed in their web browser, often accompanied by an Nginx default error page or a customized error page if configured. The immediate impact is that the PHP application is inaccessible, leading to service disruption. Identifying the root cause requires methodical investigation of both Nginx and PHP-FPM configurations and logs.

### Why It Happens

The '502 Bad Gateway' error between Nginx and PHP-FPM typically arises from a breakdown in communication or an inability of PHP-FPM to process requests. Common root causes include:

1.  **PHP-FPM Not Running or Unresponsive:** The PHP-FPM service might be stopped, crashed, or completely overwhelmed by too many requests, making it unable to accept new connections from Nginx.
2.  **Incorrect Configuration:** Mismatches between Nginx's `fastcgi_pass` directive and PHP-FPM's `listen` directive (e.g., Nginx expecting a TCP port while PHP-FPM listens on a Unix socket, or vice-versa, or incorrect paths/ports).
3.  **Resource Exhaustion:** PHP-FPM child processes might be hitting PHP limits (like `memory_limit`, `max_execution_time`) or server resource limits (CPU, RAM), causing them to crash or hang before returning a response. This leads Nginx to time out waiting.
4.  **Permission Issues:** Nginx might lack the necessary read/write permissions for the PHP-FPM Unix socket file, preventing it from establishing a connection.
5.  **Network Problems/Firewall:** While less common in a typical Nginx-PHP-FPM setup on a single server, network issues or firewall rules could block communication if PHP-FPM is running on a different host or listening on a non-standard port.

### Step-by-Step Solution

#### ## Step 1: Check PHP-FPM Service Status

The first step is to confirm that the PHP-FPM service is running and healthy.

1.  **Check Service Status:**
    ```bash
    sudo systemctl status php*-fpm
    ```
    (Replace `php*-fpm` with your specific PHP version, e.g., `php7.4-fpm` or `php8.1-fpm`. On RHEL/CentOS, it might just be `php-fpm`.)

    Look for "Active: active (running)". If it's not running, or shows errors:
    ```bash
    sudo systemctl start php*-fpm
    sudo systemctl enable php*-fpm # To ensure it starts on boot
    ```
    If it's running but appears problematic, try restarting it:
    ```bash
    sudo systemctl restart php*-fpm
    ```

2.  **Inspect PHP-FPM Logs:**
    If the service is failing to start or restarting frequently, check its specific logs:
    ```bash
    sudo journalctl -u php*-fpm --since "5 minutes ago"
    ```
    Or, check pool-specific error logs, often found at `/var/log/php-fpm/www-error.log` or similar locations. This can reveal underlying PHP configuration issues or script errors causing crashes.

#### ## Step 2: Verify Nginx Configuration for PHP-FPM

Nginx must be correctly configured to pass requests to PHP-FPM.

1.  **Locate Nginx Server Block:** Find your website's Nginx configuration file, typically in `/etc/nginx/sites-available/your_site.conf` or directly in `/etc/nginx/nginx.conf`.
2.  **Check `fastcgi_pass` Directive:** Inside the `location ~ \.php$` block, locate the `fastcgi_pass` directive. It should point to your PHP-FPM socket or TCP address.
    *   **Unix Socket Example:** `fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;`
    *   **TCP Port Example:** `fastcgi_pass 127.0.0.1:9000;`
3.  **Match with PHP-FPM `listen` Directive:** Ensure this value exactly matches the `listen` directive in your PHP-FPM pool configuration file (e.g., `/etc/php/*/fpm/pool.d/www.conf`).
    ```ini
    ; In /etc/php/*/fpm/pool.d/www.conf
    listen = /var/run/php/php8.1-fpm.sock  ; Must match Nginx's fastcgi_pass
    ; OR
    listen = 127.0.0.1:9000                ; Must match Nginx's fastcgi_pass
    ```
4.  **Test and Reload Nginx:**
    ```bash
    sudo nginx -t
    ```
    If the syntax is okay, reload Nginx for changes to take effect:
    ```bash
    sudo systemctl reload nginx
    ```

#### ## Step 3: Inspect PHP-FPM Pool and PHP Settings

PHP-FPM's resource management and general PHP settings can cause 502s.

1.  **Review PHP-FPM Pool Configuration (`www.conf`):**
    *   **`pm` (Process Manager):** `ondemand` saves memory but can introduce latency; `dynamic` is a good balance; `static` is fixed. If `pm` is `ondemand` or `dynamic` and `pm.max_children` is too low, PHP-FPM might become unresponsive under load. Increase `pm.max_children` if necessary, but monitor server RAM.
    *   **`request_terminate_timeout`:** If set too low, long-running PHP scripts will be killed, causing Nginx to receive no response. Set to `0` for unlimited (not recommended for production) or a reasonable value (e.g., `300s`).
    *   **`listen.owner`, `listen.group`, `listen.mode`:** If using a Unix socket, these directives define permissions. Nginx's user (typically `www-data` on Debian/Ubuntu, `nginx` on RHEL/CentOS) must have read/write access to the socket. Ensure `listen.owner = www-data` and `listen.group = www-data` (or corresponding Nginx user/group).
2.  **Examine `php.ini` Settings:**
    *   **`memory_limit`:** If a script exceeds this, it will terminate, leading to a 502. Increase (e.g., `256M` or `512M`) if your application requires more memory.
    *   **`max_execution_time`:** Similar to `request_terminate_timeout`, if a script runs longer than this, it will be terminated. Increase if legitimate long-running scripts are causing issues.
    *   **`upload_max_filesize` / `post_max_size`:** Large file uploads can hit these limits, potentially causing issues.
    *   **Error Logging:** Ensure `log_errors = On` and `error_log` points to a writable file for detailed PHP errors.
    ```bash
    sudo nano /etc/php/*/fpm/php.ini # Or similar path for php.ini
    sudo nano /etc/php/*/fpm/pool.d/www.conf # Or similar path for www.conf
    ```
    After changes, restart PHP-FPM: `sudo systemctl restart php*-fpm`.

#### ## Step 4: Examine Nginx Error Logs for Specific Clues

Nginx's error logs often provide precise details about why it couldn't connect to or get a response from PHP-FPM.

1.  **Check Nginx Error Log:**
    ```bash
    sudo tail -f /var/log/nginx/error.log
    ```
    Look for entries related to `fastcgi_pass` or the 502 error. Common messages include:
    *   `connect() failed (13: Permission denied) while connecting to upstream`: Indicates Nginx cannot access the PHP-FPM socket due to incorrect permissions.
    *   `connect() failed (111: Connection refused) while connecting to upstream`: PHP-FPM is not listening on the specified socket/port, or is completely down.
    *   `upstream timed out (110: Connection timed out) while reading response header from upstream`: PHP-FPM accepted the connection but didn't send a response within Nginx's configured timeout. This often points to a hanging PHP script or an overwhelmed PHP-FPM.
    *   `No such file or directory`: The specified Unix socket path for `fastcgi_pass` does not exist.

#### ## Step 5: Increase Nginx and PHP-FPM Timeouts

If "upstream timed out" is the issue, or if your application involves long-running processes, you may need to increase timeout values.

1.  **Nginx Timeouts (in your Nginx server block):**
    ```nginx
    location ~ \.php$ {
        # ... other fastcgi parameters ...
        fastcgi_read_timeout 300s;  # Default is 60s
        fastcgi_send_timeout 300s;  # Default is 60s
        fastcgi_connect_timeout 300s; # Default is 60s
        # ...
    }
    ```
    Set these to a value higher than your longest expected PHP script execution. Reload Nginx after changes: `sudo systemctl reload nginx`.

2.  **PHP-FPM Request Terminate Timeout (in `www.conf`):**
    Ensure `request_terminate_timeout` in your PHP-FPM pool configuration is either `0` (unlimited, use with caution) or higher than Nginx's `fastcgi_read_timeout`.
    ```ini
    request_terminate_timeout = 300s
    ```
    Restart PHP-FPM after changes: `sudo systemctl restart php*-fpm`.

#### ## Step 6: Check File and Directory Permissions

Incorrect permissions are a frequent cause of `Permission denied` errors in Nginx logs.

1.  **PHP-FPM Socket Permissions:**
    If using a Unix socket (e.g., `/var/run/php/php8.1-fpm.sock`), check its permissions:
    ```bash
    ls -l /var/run/php/php*-fpm.sock
    ```
    The owner and group should typically be `root` and `www-data` (or the Nginx user's group), with permissions like `srw-rw----` (socket, read/write for owner and group).
    If your `www.conf` file specifies `listen.owner` and `listen.group`, ensure these match the Nginx user and group. If not, PHP-FPM won't create the socket with the correct permissions.

2.  **Web Root Directory Permissions:**
    While less directly related to the 502, incorrect permissions on your web root directory (where PHP files reside) can prevent PHP-FPM from reading scripts, potentially leading to errors or timeouts. Ensure your Nginx user (e.g., `www-data`) and PHP-FPM user have read and execute permissions for directories and read permissions for files.
    ```bash
    sudo chown -R www-data:www-data /var/www/your_site
    sudo find /var/www/your_site -type d -exec chmod 755 {} \;
    sudo find /var/www/your_site -type f -exec chmod 644 {} \;
    ```

#### ## Step 7: Debugging a Hanging PHP Script or Application

If PHP-FPM is running and configured correctly, but the 502 occurs only for specific requests, a problematic PHP script is likely the culprit.

1.  **Identify Problematic Scripts:** Check your application's internal logs, Nginx access logs (for slow requests), or use browser developer tools to pinpoint which URLs cause the 502.
2.  **Enable Detailed PHP Error Reporting (Temporarily):** In `php.ini`, set:
    ```ini
    display_errors = On
    display_startup_errors = On
    error_reporting = E_ALL
    ```
    **Remember to turn this off in production environments.** Restart PHP-FPM. This might display more specific PHP errors instead of a generic 502.
3.  **Trace Execution:** For complex issues, tools like Xdebug can help step through PHP code execution. Command-line tools like `strace` can trace system calls made by PHP-FPM processes (`sudo strace -p <php-fpm-pid>`) to identify where it's getting stuck.
4.  **Database/External Service Issues:** Check if the PHP script relies on a database or external API that might be slow or unresponsive.

### Common Mistakes

1.  **Not Restarting/Reloading Services:** Configuration changes to Nginx or PHP-FPM require a service reload (`nginx -s reload` or `systemctl reload nginx`) or restart (`systemctl restart php*-fpm`) to take effect. Forgetting this is a common oversight.
2.  **Mismatch in `fastcgi_pass` and `listen`:** Using a Unix socket path in Nginx while PHP-FPM is listening on a TCP port, or vice-versa, or simply an incorrect path/port.
3.  **Ignoring Logs:** Troubleshooting without consulting Nginx's `error.log` and PHP-FPM's error logs is like trying to fix a car with a blindfold. These logs are your primary diagnostic tools.
4.  **Insufficient Resource Allocation:** Underestimating the memory (`memory_limit`) or execution time (`max_execution_time`, `request_terminate_timeout`) required by complex PHP applications, or not allocating enough PHP-FPM child processes (`pm.max_children`).
5.  **Incorrect Socket Permissions:** Forgetting to set `listen.owner` and `listen.group` in `www.conf` to match the Nginx user/group, or not ensuring the socket file itself has the correct permissions for Nginx to access it.

### Prevention Tips

1.  **Monitor System Resources:** Implement monitoring for CPU, RAM, and PHP-FPM process count. Tools like `htop`, `Netdata`, or a full-fledged monitoring stack (e.g., Prometheus with Grafana) can alert you to resource exhaustion before it causes 502 errors.
2.  **Regular Log Review and Alerting:** Regularly check Nginx and PHP-FPM error logs. Configure log aggregation and alerting (e.g., ELK stack, Splunk, or simpler `grep` scripts) to notify you immediately of critical errors.
3.  **Tune PHP-FPM Process Manager:** Configure PHP-FPM's process manager (`pm`) settings (`pm.max_children`, `pm.start_servers`, `pm.min_spare_servers`, `pm.max_spare_servers`) based on your server's available RAM and expected traffic. `dynamic` or `static` modes are generally preferred for production over `ondemand` for performance, provided you have sufficient memory.
4.  **Optimize PHP Application Code:** Ensure your PHP application is efficient, especially concerning database queries and external API calls. Long-running, memory-intensive, or I/O-bound operations are prime candidates for causing timeouts and 502s. Implement caching where appropriate.
5.  **Set Realistic Timeouts:** While increasing timeouts can prevent immediate 502s, excessively high timeouts can mask underlying performance issues. Set timeouts (Nginx `fastcgi_read_timeout`, PHP-FPM `request_terminate_timeout`) to reasonable values that accommodate legitimate long processes but still catch runaway scripts.
6.  **Maintain Consistent Configuration:** Use configuration management tools (Ansible, Puppet, Chef) or version control for Nginx and PHP-FPM configuration files to ensure consistency and easier rollback if changes introduce new issues.
7.  **Keep Software Updated:** Regularly update Nginx, PHP, and PHP-FPM to benefit from performance improvements, bug fixes, and security patches.