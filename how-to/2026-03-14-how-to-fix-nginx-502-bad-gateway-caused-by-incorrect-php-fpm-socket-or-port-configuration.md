---
title: "How to Fix Nginx '502 Bad Gateway' Caused by Incorrect PHP-FPM Socket or Port Configuration"
date: "2026-03-14T10:27:45.110Z"
slug: "how-to-fix-nginx-502-bad-gateway-caused-by-incorrect-php-fpm-socket-or-port-configuration"
type: "how-to"
description: "Resolve Nginx '502 Bad Gateway' errors by diagnosing and correcting common mismatches in PHP-FPM socket or TCP port configurations. A detailed guide for Nginx and PHP-FPM connectivity."
keywords: "Nginx 502 Bad Gateway, PHP-FPM, socket mismatch, port mismatch, Nginx PHP-FPM connection, PHP-FPM configuration, Nginx error fix, unix socket, TCP port, php-fpm.sock, Nginx troubleshooting"
---

### Problem Explanation

When attempting to access a PHP-based website or application served by Nginx, you may encounter a "502 Bad Gateway" error in your web browser. This error indicates that Nginx, acting as a reverse proxy, received an invalid response from an upstream server. In the context of a PHP application, this upstream server is typically PHP-FPM (FastCGI Process Manager). The specific Nginx error log messages often accompanying this issue will explicitly mention connection failures to a PHP-FPM socket or port, such as `connect() failed (111: Connection refused)` or `connect() to unix:/var/run/php/php-fpm.sock failed (2: No such file or directory)`.

Visually, the user experience is a generic error page, either default Nginx 502 page or a custom one configured for the web server. The application itself will not load, and no PHP content will be rendered. This error is distinct from internal server errors (500) or service unavailable (503) as it specifically points to Nginx's inability to communicate successfully with its designated backend PHP processor.

### Why It Happens

Nginx serves static files efficiently but cannot directly process PHP code. To handle dynamic PHP content, Nginx relies on an external interpreter like PHP-FPM. Nginx passes requests for PHP files to PHP-FPM, which processes the script and returns the output to Nginx, which then delivers it to the client browser. This communication between Nginx and PHP-FPM occurs over a FastCGI interface.

The "502 Bad Gateway" error, in this specific scenario, typically arises when Nginx attempts to establish this communication channel with PHP-FPM but fails because of a mismatch or unavailability in their configured connection points. The root causes usually fall into two categories:

1.  **PHP-FPM is not running:** The PHP-FPM service is stopped, crashed, or failed to start, so there's no process listening on the expected socket or port.
2.  **Configuration Mismatch:** Nginx is configured to connect to PHP-FPM using a specific Unix socket path (e.g., `/var/run/php/php-fpm.sock`) or a TCP port (e.g., `127.0.0.1:9000`), but PHP-FPM is either listening on a different socket/port, or the specified socket file doesn't exist, or has incorrect permissions. This means Nginx is looking for PHP-FPM in one place, while PHP-FPM is listening somewhere else entirely or not at all on that specific interface.

### Step-by-Step Solution

Addressing this issue requires a systematic approach to verify and synchronize the communication settings between Nginx and PHP-FPM.

#### ## Step 1: Verify PHP-FPM Service Status

The first diagnostic step is to confirm that the PHP-FPM service is actually running. If PHP-FPM is not active, Nginx will inevitably fail to connect.

To check the status of PHP-FPM on most Linux distributions using `systemd` (like Ubuntu, Debian, CentOS 7+, RHEL 7+):

```bash
sudo systemctl status phpX.Y-fpm
```

Replace `X.Y` with your specific PHP version (e.g., `php8.1-fpm`, `php7.4-fpm`). If you're unsure of the exact service name, you can often try `php-fpm` alone or check `/etc/init.d/` or `/lib/systemd/system/` for `php*-fpm.service` files.

If the service is not running (indicated by `inactive (dead)` or similar), attempt to start it:

```bash
sudo systemctl start phpX.Y-fpm
sudo systemctl enable phpX.Y-fpm # To ensure it starts on boot
```

If it fails to start, check the PHP-FPM logs (often `/var/log/phpX.Y-fpm.log` or viewable via `journalctl -u phpX.Y-fpm`) for more specific errors.

#### ## Step 2: Examine Nginx Error Logs for Connection Details

The Nginx error log is the authoritative source for understanding precisely why Nginx is failing to connect. This log will specify the exact socket path or IP:port Nginx is attempting to use.

Common Nginx error log locations:
*   Debian/Ubuntu: `/var/log/nginx/error.log`
*   CentOS/RHEL: `/var/log/nginx/error.log`

Open the error log and search for recent `connect()` or `upstream` errors, typically around the time you encountered the 502 error.

```bash
sudo tail -f /var/log/nginx/error.log
```

You'll likely see messages similar to these:

*   `2023/10/27 10:30:15 [crit] 1234#1234: *5 connect() to unix:/var/run/php/php-fpm.sock failed (2: No such file or directory) while connecting to upstream, client: 192.168.1.100, server: example.com, request: "GET /index.php", upstream: "fastcgi://unix:/var/run/php/php-fpm.sock:", host: "example.com"`
*   `2023/10/27 10:30:15 [error] 1234#1234: *5 connect() failed (111: Connection refused) while connecting to upstream, client: 192.168.1.100, server: example.com, request: "GET /index.php", upstream: "fastcgi://127.0.0.1:9000", host: "example.com"`

Note down the exact socket path (e.g., `unix:/var/run/php/php-fpm.sock`) or IP:port (e.g., `127.0.0.1:9000`) that Nginx is trying to connect to. This is the crucial piece of information for the next steps.

#### ## Step 3: Identify PHP-FPM's Listening Configuration

Now you need to determine where PHP-FPM is *actually* configured to listen for incoming connections. PHP-FPM configurations are typically managed through "pool" files.

Common PHP-FPM pool configuration paths:
*   Debian/Ubuntu: `/etc/php/X.Y/fpm/pool.d/www.conf` (or other `.conf` files in that directory)
*   CentOS/RHEL: `/etc/php-fpm.d/www.conf` (or other `.conf` files in that directory)

Open the relevant `www.conf` file (or the specific pool file for your application if you have multiple pools) and look for the `listen` directive:

```bash
sudo grep -E '^listen =' /etc/php/X.Y/fpm/pool.d/www.conf
```

You will find one of these formats:
*   **Unix socket:** `listen = /var/run/php/php-fpm.sock` (The path might vary, e.g., `/run/php/php8.1-fpm.sock`)
*   **TCP port:** `listen = 127.0.0.1:9000` (The IP address might be `0.0.0.0` for all interfaces, and the port can be different).

Confirm the exact value of the `listen` directive. This is where PHP-FPM expects Nginx to connect.

#### ## Step 4: Verify Nginx's PHP-FPM Upstream Configuration

Next, you need to check your Nginx site configuration to see where *it* is configured to pass PHP requests. This is found in the `fastcgi_pass` directive within your site's server block.

Common Nginx site configuration paths:
*   `/etc/nginx/sites-available/your_site.conf` (Debian/Ubuntu, symlinked to `sites-enabled`)
*   `/etc/nginx/conf.d/your_site.conf` (CentOS/RHEL)

Open the configuration file for the site experiencing the 502 error:

```bash
sudo nano /etc/nginx/sites-available/your_site.conf
```

Inside the `server` block, locate a `location ~ \.php$` block and find the `fastcgi_pass` directive:

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/html;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf; # This snippet often contains fastcgi_pass
        # OR explicitly:
        fastcgi_pass unix:/var/run/php/php-fpm.sock; # Check this line!
        # OR:
        # fastcgi_pass 127.0.0.1:9000; # Check this line!
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_buffers 16 16k;
        fastcgi_buffer_size 32k;
    }
}
```

If your configuration includes `include snippets/fastcgi-php.conf`, you'll need to examine that file (typically `/etc/nginx/snippets/fastcgi-php.conf`) to find the actual `fastcgi_pass` directive.

Note the exact value of the `fastcgi_pass` directive.

#### ## Step 5: Align Nginx and PHP-FPM Configurations

This is the core fix. The `listen` directive in PHP-FPM's pool configuration (from Step 3) **must exactly match** the `fastcgi_pass` directive in Nginx's site configuration (from Step 4).

**Scenario A: Mismatched Unix Socket Paths**
If Nginx's error log shows it failed to connect to `unix:/var/run/php/php-fpm.sock` (Step 2), but PHP-FPM's `listen` directive is `listen = /run/php/php8.1-fpm.sock` (Step 3), then you have a mismatch.

*   **Option 1 (Recommended):** Update Nginx's `fastcgi_pass` to match PHP-FPM's `listen` path.
    ```nginx
    # In /etc/nginx/sites-available/your_site.conf or snippet
    fastcgi_pass unix:/run/php/php8.1-fpm.sock;
    ```
*   **Option 2:** Update PHP-FPM's `listen` path to match Nginx.
    ```ini
    # In /etc/php/X.Y/fpm/pool.d/www.conf
    listen = /var/run/php/php-fpm.sock
    ```
    (Ensure the directory `/var/run/php/` exists and has proper permissions if you change it here.)

**Scenario B: Mismatched TCP Ports**
If Nginx's error log shows it failed to connect to `127.0.0.1:9000`, but PHP-FPM's `listen` directive is `listen = 127.0.0.1:9001`, you have a port mismatch.

*   **Option 1 (Recommended):** Update Nginx's `fastcgi_pass` to match PHP-FPM's `listen` port.
    ```nginx
    # In /etc/nginx/sites-available/your_site.conf or snippet
    fastcgi_pass 127.0.0.1:9001;
    ```
*   **Option 2:** Update PHP-FPM's `listen` port to match Nginx.
    ```ini
    # In /etc/php/X.Y/fpm/pool.d/www.conf
    listen = 127.0.0.1:9000
    ```
    (Ensure no other service is already using this port.)

Choose one option and make the necessary change to either the Nginx or PHP-FPM configuration file.

#### ## Step 6: Check Unix Socket Permissions (If Using Sockets)

If you are using a Unix socket and still getting a "No such file or directory" or "Permission denied" error even after aligning the paths, it might be a permission issue.

Check the permissions and ownership of the socket file (once PHP-FPM is running, as the socket file is created by FPM itself):

```bash
ls -l /var/run/php/php-fpm.sock # Replace with your actual socket path
```

Output might look like: `-rw-r--r-- 1 www-data www-data 0 Oct 27 10:45 /var/run/php/php-fpm.sock`

Nginx (typically running as `www-data` or `nginx` user) needs read/write access to this socket. In your PHP-FPM pool configuration (`www.conf`), ensure the `listen.owner`, `listen.group`, and `listen.mode` directives are correctly set. For example:

```ini
; Set permissions for the socket
listen.owner = www-data
listen.group = www-data
listen.mode = 0660
```
This configuration allows the `www-data` user and `www-data` group to read and write to the socket, which is typically sufficient for Nginx to connect. Adjust `listen.owner` and `listen.group` to match the user/group Nginx runs as on your system if different.

#### ## Step 7: Test Nginx Configuration and Restart Services

After making any changes to either Nginx or PHP-FPM configuration files, you must test the Nginx configuration and then restart both services for the changes to take effect.

1.  **Test Nginx configuration:**
    ```bash
    sudo nginx -t
    ```
    If you see `test is successful`, your Nginx syntax is correct. Address any warnings or errors before proceeding.

2.  **Restart PHP-FPM:**
    ```bash
    sudo systemctl restart phpX.Y-fpm
    ```

3.  **Restart Nginx:**
    ```bash
    sudo systemctl restart nginx
    ```

After both services have successfully restarted, clear your browser cache and attempt to access your website again. The "502 Bad Gateway" error should now be resolved.

### Common Mistakes

*   **Forgetting to restart services:** Configuration changes in Nginx or PHP-FPM require a service restart (or reload for Nginx) to apply. Many users make changes, refresh the browser, and wonder why the error persists.
*   **Typographical errors:** A simple typo in a socket path or TCP port number in either Nginx or PHP-FPM configuration is a frequent culprit. Double-check every character.
*   **Ignoring Nginx error logs:** These logs are your primary diagnostic tool. Guessing without consulting them leads to wasted time. The log message specifies exactly what Nginx tried to do and why it failed.
*   **Using different PHP-FPM versions:** On systems with multiple PHP versions installed (e.g., PHP 7.4 and PHP 8.1), it's easy to configure Nginx to point to `php7.4-fpm.sock` while PHP-FPM 8.1 is the one actually running or serving the application. Ensure `phpX.Y-fpm` service names, socket paths, and Nginx configurations all refer to the *same* PHP version.
*   **Firewall blocking TCP port:** While less common for localhost (127.0.0.1) connections, if PHP-FPM is configured to listen on an external IP or if you're connecting from a different server, a firewall (like `ufw` or `firewalld`) could be blocking the TCP port.
*   **Incorrect socket file ownership/permissions:** If using Unix sockets, the user Nginx runs as (`www-data` or `nginx`) must have sufficient permissions to access the socket file created by PHP-FPM.

### Prevention Tips

To minimize the chances of encountering this specific "502 Bad Gateway" error in the future, consider these best practices:

*   **Standardize Naming Conventions:** When managing multiple PHP-FPM pools or versions, use clear and consistent naming for socket files (e.g., `/run/php/php8.1-fpm.sock`, `/run/php/php7.4-fpm.sock`). Reflect these names directly in your Nginx configurations.
*   **Version-Specific Paths:** Always reference PHP-FPM sockets and configurations with their PHP version (e.g., `php8.1-fpm` instead of a generic `php-fpm`). This prevents conflicts when upgrading PHP or running multiple versions.
*   **Use Configuration Management Tools:** For production environments, tools like Ansible, Puppet, or Chef can automate and standardize your Nginx and PHP-FPM configurations, ensuring consistency across servers and reducing manual errors.
*   **Test Configurations Before Applying:** Always use `nginx -t` to check Nginx syntax and `php-fpm -t` (if available, or `php-fpm -y /path/to/php-fpm.conf -t`) to validate PHP-FPM configurations before restarting services.
*   **Monitor Logs Regularly:** Implement log monitoring solutions to alert you to critical errors in Nginx and PHP-FPM logs. Proactive monitoring can help identify and resolve issues before they significantly impact users.
*   **Consistent User/Group Management:** Ensure that the user and group under which Nginx runs (e.g., `www-data` or `nginx`) have the necessary permissions to interact with PHP-FPM sockets or ports. Consistent setup prevents permission-related connectivity issues.