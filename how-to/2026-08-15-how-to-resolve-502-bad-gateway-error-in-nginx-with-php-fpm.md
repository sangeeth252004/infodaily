---
title: "How to Resolve '502 Bad Gateway' Error in Nginx with PHP-FPM"
date: "2026-08-15T10:20:46.693Z"
slug: "how-to-resolve-502-bad-gateway-error-in-nginx-with-php-fpm"
type: "how-to"
description: "A comprehensive guide to diagnosing and fixing the '502 Bad Gateway' error when Nginx is proxying requests to PHP-FPM, covering common causes, step-by-step solutions, and prevention tips."
keywords: "Nginx, PHP-FPM, 502 Bad Gateway, error resolution, web server, PHP error, server troubleshooting, Nginx configuration, PHP-FPM configuration, fastcgi"
---

### Problem Explanation

The "502 Bad Gateway" error is a common HTTP status code that indicates one server on the internet received an invalid response from another server it was trying to access while acting as a gateway or proxy. In the context of an Nginx web server serving PHP applications, this error specifically means that Nginx, acting as a reverse proxy, failed to get a valid response from the upstream PHP-FPM (FastCGI Process Manager) service. When a user tries to access a PHP-driven website or application, instead of seeing the expected content, their browser displays a generic error page, often stating "502 Bad Gateway," sometimes with additional information like "nginx/1.X.X." This immediately signals that the web server itself is operational, but its connection or communication with the PHP backend is failing.

This error can be particularly frustrating because it obscures the underlying issue, making it difficult to pinpoint whether the problem lies with Nginx's configuration, PHP-FPM's health, or even deeper system-level resource constraints. The critical point is that Nginx successfully received the client's request but could not fulfill it because its designated PHP processor (PHP-FPM) did not respond appropriately or at all.

### Why It Happens

The "502 Bad Gateway" error in an Nginx and PHP-FPM setup primarily occurs when Nginx cannot establish or maintain a proper communication channel with PHP-FPM, or when PHP-FPM itself encounters a fatal error and fails to process the request within the expected parameters. Nginx sends PHP requests to PHP-FPM via the FastCGI protocol, typically over a Unix socket or a TCP port. If PHP-FPM is not running, is overloaded, crashes, or is misconfigured to listen on a different socket/port than Nginx expects, the communication breaks down, leading to the 502 error.

Common root causes include: PHP-FPM service not running, incorrect socket/port configuration mismatch between Nginx and PHP-FPM, PHP-FPM process pool exhaustion, PHP scripts exceeding execution time or memory limits, file permission issues preventing PHP-FPM from reading necessary files, or severe system resource shortages (e.g., out of memory, high CPU load) causing PHP-FPM processes to crash or become unresponsive. Essentially, anything that prevents PHP-FPM from accepting and successfully processing a request from Nginx and returning a valid response can trigger this error.

### Step-by-Step Solution

#### Step 1: Check Nginx Error Logs

The Nginx error logs are the first place to look for specific clues. They will often contain detailed messages about why the connection to PHP-FPM failed.

1.  **Locate Nginx Error Logs:** The default location is usually `/var/log/nginx/error.log` on most Linux distributions. You might also find them at `/usr/local/nginx/logs/error.log` or a custom path defined in your Nginx configuration.
2.  **Inspect the Logs:** Use `tail` or `grep` to view recent entries:
    ```bash
    sudo tail -f /var/log/nginx/error.log
    ```
    Look for messages indicating connection failures, such as:
    *   `connect() failed (111: Connection refused) while connecting to upstream`
    *   `recv() failed (104: Connection reset by peer) while reading response from upstream`
    *   `upstream timed out (110: Connection timed out) while reading response from upstream`
    These messages typically point to an issue with PHP-FPM.

#### Step 2: Verify PHP-FPM Service Status

Ensure that the PHP-FPM service is actually running and healthy.

1.  **Check Service Status:** Use your system's service manager to check PHP-FPM's status. Replace `php-fpm` with your specific PHP version if applicable (e.g., `php7.4-fpm`, `php8.2-fpm`).
    ```bash
    sudo systemctl status php-fpm
    # Or for specific versions:
    sudo systemctl status php7.4-fpm
    ```
    If it's not running, or shows errors, attempt to start it:
    ```bash
    sudo systemctl start php-fpm
    ```
2.  **Check Process List:** Verify PHP-FPM processes are active:
    ```bash
    ps aux | grep php-fpm
    ```
    You should see several `php-fpm` processes running. If not, the service is not properly started.

#### Step 3: Inspect PHP-FPM and Nginx Configuration for Socket/Port Mismatch

A common cause is Nginx trying to connect to PHP-FPM on a different address or port than PHP-FPM is listening on.

1.  **Check PHP-FPM Pool Configuration:**
    *   Locate your PHP-FPM pool configuration file. It's usually in `/etc/php/X.X/fpm/pool.d/www.conf` (where `X.X` is your PHP version) or `/etc/php-fpm.d/www.conf`.
    *   Find the `listen` directive:
        ```ini
        ;listen = /run/php/php7.4-fpm.sock
        listen = 127.0.0.1:9000
        ```
    *   Note whether it's configured for a Unix socket or a TCP port. If it's a Unix socket, check its path. If it's a TCP port, note the IP address and port number.
    *   Ensure the `listen.owner` and `listen.group` directives (for sockets) match the Nginx user/group (typically `nginx` or `www-data`) for proper permissions.
2.  **Check Nginx Server Block Configuration:**
    *   Open your Nginx virtual host configuration file (e.g., `/etc/nginx/sites-available/your_site.conf` or in `/etc/nginx/nginx.conf`).
    *   Locate the `location ~ \.php$` block.
    *   Find the `fastcgi_pass` directive. It must exactly match the `listen` directive from your PHP-FPM configuration:
        ```nginx
        fastcgi_pass unix:/run/php/php7.4-fpm.sock; # For Unix socket
        # OR
        fastcgi_pass 127.0.0.1:9000; # For TCP port
        ```
3.  **Permissions for Sockets:** If using a Unix socket, ensure the socket file has correct permissions for Nginx to access it. The `listen.owner` and `listen.group` in `www.conf` should typically be `www-data` or `nginx`.
4.  **Restart Services:** After any changes, restart both PHP-FPM and Nginx:
    ```bash
    sudo systemctl restart php-fpm
    sudo systemctl restart nginx
    ```

#### Step 4: Analyze PHP-FPM Pool and PHP Settings for Resource Limits

Overloaded PHP-FPM processes or scripts hitting PHP limits can cause 502 errors.

1.  **PHP-FPM Pool Configuration (`www.conf`):**
    *   **`pm` (process manager):**
        *   `pm = dynamic` is common.
        *   `pm.max_children`: The maximum number of child processes that can be created. If your application needs more, requests will queue or fail.
        *   `pm.start_servers`, `pm.min_servers`, `pm.max_servers`: Control how PHP-FPM dynamically manages processes. If `max_children` is too low for your traffic, new requests will fail.
        *   Consider increasing `pm.max_children` if your server has sufficient RAM.
    *   **`request_terminate_timeout`**: If a PHP script runs longer than this value, PHP-FPM will kill it, leading to a 502. Increase this if you have long-running scripts (e.g., `300s` for 5 minutes).
2.  **PHP Configuration (`php.ini`):**
    *   Locate your `php.ini` file (e.g., `/etc/php/X.X/fpm/php.ini`).
    *   **`memory_limit`**: If a script exceeds this, it will fail. Increase it (e.g., `256M` or `512M`) if your scripts are memory-intensive.
    *   **`max_execution_time`**: If a script runs longer than this, PHP will terminate it. Increase it if needed (e.g., `300` seconds).
    *   **`post_max_size`** and **`upload_max_filesize`**: If you're uploading large files, ensure these are sufficiently large.
3.  **Restart PHP-FPM:** After modifying `www.conf` or `php.ini`:
    ```bash
    sudo systemctl restart php-fpm
    ```

#### Step 5: Adjust Nginx FastCGI Proxy Settings

Nginx has its own set of timeouts and buffer settings for FastCGI communication that might need tuning.

1.  **Open Nginx Configuration:** Edit your Nginx server block or a `fastcgi_params` file.
2.  **Adjust Timeouts:**
    ```nginx
    fastcgi_read_timeout 180s; # Time Nginx waits for a response from PHP-FPM
    fastcgi_send_timeout 180s; # Time Nginx waits for PHP-FPM to acknowledge data
    fastcgi_connect_timeout 180s; # Time Nginx waits to connect to PHP-FPM
    ```
    Increase these values if you have long-running scripts. Be cautious not to set them excessively high, as it could tie up Nginx workers.
3.  **Adjust Buffers:** If PHP-FPM sends large responses, Nginx might run out of buffer space.
    ```nginx
    fastcgi_buffers 16 16k; # Number and size of buffers for reading responses
    fastcgi_buffer_size 32k; # Size of the first buffer for reading the response
    ```
    These are usually sufficient, but might need slight increases for extremely large responses.
4.  **Restart Nginx:**
    ```bash
    sudo systemctl restart nginx
    ```

#### Step 6: Check for System Resource Exhaustion

A server running out of resources can cause PHP-FPM processes to crash or become unresponsive.

1.  **Monitor RAM and CPU:** Use tools like `htop`, `top`, or `free -h` to check available memory and CPU usage. If RAM is consistently low or CPU is constantly maxed out, it indicates a bottleneck.
    ```bash
    free -h
    top
    ```
2.  **Check for OOM Killer:** The Out-Of-Memory (OOM) killer can terminate processes (including PHP-FPM workers) when the system runs out of RAM. Check kernel logs:
    ```bash
    dmesg | grep -i oom
    ```
    If you see OOM killer messages for PHP-FPM, you need more RAM, or your `pm.max_children` and `memory_limit` settings are too high for your server's capacity.
3.  **Disk I/O:** High disk I/O can also slow down processes. Use `iostat` or `iotop` to check disk activity.

#### Step 7: Final Restart of Services

After making any changes, especially configuration adjustments, always perform a full restart of both PHP-FPM and Nginx to ensure all new settings are applied.

```bash
sudo systemctl restart php-fpm
sudo systemctl restart nginx
```
If the problem persists, review your application's PHP logs for unhandled exceptions or fatal errors, which might be causing PHP-FPM workers to crash repeatedly.

### Common Mistakes

1.  **Ignoring Log Files:** Many users jump straight to configuration changes without first consulting the Nginx error logs or PHP-FPM logs. These logs almost always provide the most direct clues to the problem's root cause.
2.  **Socket/Port Mismatch:** A very frequent error is Nginx attempting to connect to PHP-FPM via a Unix socket or TCP port that PHP-FPM is not actually listening on, or which has incorrect permissions. Double-check `fastcgi_pass` in Nginx and `listen` in PHP-FPM's pool configuration.
3.  **Insufficient Resource Allocation:** Underestimating the required `pm.max_children` for PHP-FPM or `memory_limit` in `php.ini` can lead to processes crashing or requests timing out under load.
4.  **Not Restarting Services:** Configuration changes to Nginx or PHP-FPM are often ineffective until the respective services are gracefully restarted. Simply saving a file is not enough.
5.  **Overlooking File Permissions:** If Nginx or PHP-FPM doesn't have the necessary permissions to read/write files (e.g., application files, session files, socket files), it can lead to various errors, including 502.

### Prevention Tips

1.  **Monitor Server Resources:** Regularly monitor CPU, RAM, and disk I/O usage. Tools like Prometheus/Grafana, Zabbix, or simple `top`/`htop` combined with shell scripts can alert you to impending resource exhaustion.
2.  **Tune PHP-FPM Pool Settings:** Configure `pm.max_children`, `pm.min_servers`, `pm.max_servers` appropriately based on your server's RAM and typical traffic load. Using `pm = ondemand` or `pm = dynamic` with carefully chosen values can help prevent over-allocation.
3.  **Optimize PHP Application Code:** Inefficient or buggy PHP code is a common culprit. Profile your application to identify bottlenecks, memory leaks, or long-running operations. Optimize database queries, use caching mechanisms, and ensure error handling is robust.
4.  **Implement Robust Logging and Alerting:** Centralize your logs and set up alerts for critical errors (e.g., specific 502 messages in Nginx logs, fatal errors in PHP-FPM logs). This allows for proactive rather than reactive troubleshooting.
5.  **Keep Software Updated:** Regularly update Nginx, PHP, and PHP-FPM to benefit from performance improvements, bug fixes, and security patches.
6.  **Use Version Control and Configuration Management:** Store your Nginx and PHP-FPM configurations in version control. For multiple servers, use configuration management tools (Ansible, Puppet, Chef) to ensure consistency and prevent misconfigurations.
7.  **Test Under Load:** Before deploying major changes or new applications, perform load testing to identify potential resource bottlenecks and configuration issues under realistic traffic conditions.