---
title: "How to Fix Nginx \"connect() to unix:/var/run/php/php7.4-fpm.sock failed (2: No such file or directory)\" Error"
date: "2026-02-20T10:37:12.497Z"
slug: "how-to-fix-nginx-connect-to-unix-var-run-php-php7-4-fpm-sock-failed-2-no-such-file-or-directory-error"
type: "how-to"
description: "Resolve the Nginx 502 Bad Gateway error caused by PHP-FPM socket connection issues. Learn step-by-step how to troubleshoot and fix the \"No such file or directory\" error for php7.4-fpm.sock."
keywords: "nginx, php-fpm, socket error, 502 bad gateway, /var/run/php/php7.4-fpm.sock, no such file or directory, connect failed, unix socket, php configuration, nginx configuration, server troubleshooting"
---

### Problem Explanation

When serving dynamic PHP content via Nginx, you might encounter an HTTP 502 Bad Gateway error in your web browser. This indicates that Nginx, acting as a reverse proxy, failed to receive a valid response from the upstream server – in this case, PHP-FPM (FastCGI Process Manager). Upon checking your Nginx error logs (typically located at `/var/log/nginx/error.log`), you will see a specific message similar to:

`connect() to unix:/var/run/php/php7.4-fpm.sock failed (2: No such file or directory)`

This error precisely tells you that Nginx attempted to establish a connection with the PHP-FPM service using a Unix socket located at `/var/run/php/php7.4-fpm.sock`, but the operating system reported that the specified socket file simply does not exist at that path. Without a functional connection to PHP-FPM, Nginx cannot process PHP requests, leading to the 502 Bad Gateway response for any PHP-based pages on your website.

### Why It Happens

This error occurs when Nginx is configured to pass PHP requests to a specific PHP-FPM Unix socket, but that socket file is either missing or inaccessible. The underlying reasons for the socket being unavailable typically fall into one of the following categories:

*   **PHP-FPM Service is Not Running:** The most common cause is that the `php7.4-fpm` service is either stopped, failed to start, or was never enabled to run automatically. If PHP-FPM isn't running, it won't create its socket file.
*   **Incorrect PHP-FPM Configuration:** PHP-FPM might be running, but it's configured to listen on a different Unix socket path or a TCP port (e.g., `127.0.0.1:9000`) instead of the `/var/run/php/php7.4-fpm.sock` path Nginx expects.
*   **Mismatched Nginx Configuration:** Nginx is configured to look for a socket path that does not match what PHP-FPM is actually using. This is a common oversight during server setup or migrations.
*   **Missing or Corrupted PHP-FPM Installation:** The `php7.4-fpm` package itself might not be installed, or its installation is corrupted, preventing the service from starting correctly and creating the socket.
*   **Permissions Issues:** While less common for the "No such file or directory" error, incorrect directory permissions for `/var/run/php/` could prevent PHP-FPM from creating the socket, or immediately delete it.

Understanding these root causes is crucial for systematically troubleshooting and resolving the issue.

### Step-by-Step Solution

This section outlines a methodical approach to diagnose and fix the Nginx "No such file or directory" error for the PHP-FPM socket. Remember to replace `php7.4-fpm` with your specific PHP version if it differs.

---

### Step 1: Verify PHP-FPM Service Status

The first step is to confirm whether the PHP-FPM service for your specific PHP version is actually running. If it's not active, it cannot create the socket file Nginx expects.

Open your terminal and execute the following command:

```bash
sudo systemctl status php7.4-fpm
```

**Expected Output (Service Running):**
```
● php7.4-fpm.service - The PHP 7.4 FastCGI Process Manager
     Loaded: loaded (/lib/systemd/system/php7.4-fpm.service; enabled; vendor preset: enabled)
     Active: active (running) since ...
       Docs: https://php.net
    Process: ...
   Main PID: ...
      Tasks: ...
     Memory: ...
        CPU: ...
     CGroup: /system.slice/php7.4-fpm.service
             ├─... php-fpm: master process (...
             ├─... php-fpm: pool www
             └─... php-fpm: pool www
```

**If the service is *not* running (e.g., `Active: inactive (dead)` or `failed`), attempt to start it:**

```bash
sudo systemctl start php7.4-fpm
sudo systemctl enable php7.4-fpm
```

The `enable` command ensures the service starts automatically on boot. After attempting to start, check the status again. If it fails to start, investigate its logs for more specific errors:

```bash
sudo journalctl -xeu php7.4-fpm
```

This will often reveal configuration errors or missing dependencies preventing PHP-FPM from starting.

---

### Step 2: Confirm PHP-FPM Socket Configuration

If PHP-FPM is running but the error persists, it's possible it's configured to use a different socket path or a TCP port. You need to inspect the PHP-FPM pool configuration file.

The primary configuration file for the default `www` pool is usually located at:

```
/etc/php/7.4/fpm/pool.d/www.conf
```

Open this file using a text editor (like `nano` or `vi`):

```bash
sudo nano /etc/php/7.4/fpm/pool.d/www.conf
```

Inside this file, search for the `listen` directive. It dictates where PHP-FPM will listen for connections.

**Correct Configuration for Unix Socket:**
You should find a line that looks exactly like, or very similar to:

```ini
listen = /run/php/php7.4-fpm.sock
```

*Note: `/var/run` is often a symlink to `/run`. Both paths often point to the same location, but consistency is key. If your Nginx error specifies `/var/run/php/php7.4-fpm.sock`, ensure your PHP-FPM `listen` directive also uses `/var/run/php/php7.4-fpm.sock` for absolute consistency.*

**Incorrect Configuration (TCP Port):**
If you find a line like `listen = 127.0.0.1:9000` or `listen = [::1]:9000`, it means PHP-FPM is configured to listen on a TCP port, not a Unix socket. In this case, you have two options:
1.  **Change PHP-FPM to use a Unix socket:** Uncomment or modify the `listen` directive to use the Unix socket path `/var/run/php/php7.4-fpm.sock`.
2.  **Adjust Nginx to use the TCP port:** Keep the TCP port configuration in PHP-FPM, but you will need to modify your Nginx configuration (Step 3) to `fastcgi_pass 127.0.0.1:9000;`.

**After making any changes to `www.conf`, save the file and restart the PHP-FPM service:**

```bash
sudo systemctl restart php7.4-fpm
```

---

### Step 3: Check Nginx Server Block Configuration

Now, verify that your Nginx server block configuration for the specific website is pointing to the *correct* PHP-FPM socket path or TCP port, matching what you confirmed in Step 2.

Nginx site configurations are typically found in `/etc/nginx/sites-available/` and symlinked to `/etc/nginx/sites-enabled/`. Open your site's configuration file (e.g., `default` or `your_domain.conf`):

```bash
sudo nano /etc/nginx/sites-available/your_domain.conf
```

Locate the `location ~ \.php$` block, which handles PHP file requests. Within this block, find the `fastcgi_pass` directive.

**Matching Nginx to PHP-FPM's Unix Socket:**
If PHP-FPM is configured to use a Unix socket at `/var/run/php/php7.4-fpm.sock`, Nginx must also point there:

```nginx
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock; # Ensure this path matches PHP-FPM config
    # ... other directives
}
```

**Matching Nginx to PHP-FPM's TCP Port (if applicable):**
If you chose to keep PHP-FPM listening on a TCP port (e.g., `127.0.0.1:9000`), Nginx must be configured as such:

```nginx
location ~ \.php$ {
    include snippets/fastcgi-php.conf;
    fastcgi_pass 127.0.0.1:9000; # Ensure this matches PHP-FPM config
    # ... other directives
}
```

**After making changes, test your Nginx configuration for syntax errors:**

```bash
sudo nginx -t
```

You should see: `nginx: configuration file /etc/nginx/nginx.conf syntax is ok` and `nginx: configuration file /etc/nginx/nginx.conf test is successful`. If there are errors, fix them before proceeding.

**Then, reload Nginx to apply the changes:**

```bash
sudo systemctl reload nginx
```

---

### Step 4: Verify Socket File Existence and Permissions

If both PHP-FPM and Nginx are configured to use the same Unix socket path, but the error persists, there might be an issue with the socket file's existence or its permissions.

First, check if the socket file is actually created when `php7.4-fpm` is running:

```bash
ls -l /var/run/php/php7.4-fpm.sock
```

**Expected Output (Socket Exists):**
```
srwxrwxrwx 1 www-data www-data 0 May 15 10:30 /var/run/php/php7.4-fpm.sock
```
(The exact user/group and permissions might vary slightly, but it should be present and indicate `s` for socket.)

If the file does not exist after `php7.4-fpm` is confirmed to be running and configured correctly, or if `ls -l` shows errors, check the parent directory permissions:

```bash
ls -ld /var/run/php
```

Ensure that the directory `/var/run/php` exists and has appropriate permissions (e.g., `drwxr-xr-x`). PHP-FPM usually creates the socket with the correct permissions. However, if Nginx cannot access it due to incorrect ownership (e.g., Nginx runs as `nginx` user, but socket is owned by `php-fpm` user without proper group access), you might need to adjust the `user` and `group` directives in `/etc/php/7.4/fpm/pool.d/www.conf`:

```ini
; in www.conf
user = www-data    ; Or 'nginx' if your Nginx process runs as 'nginx' user
group = www-data   ; Or 'nginx'
listen.owner = www-data
listen.group = www-data
listen.mode = 0660 ; Or 0666 for broader access, but 0660 is usually sufficient with correct owner/group
```
Then `sudo systemctl restart php7.4-fpm`. The `user` and `group` directives control the owner of the FPM processes, which subsequently dictates the ownership of the socket file. Nginx's user (e.g., `www-data` or `nginx`) must be able to read and write to this socket.

---

### Step 5: Address Multiple PHP Versions (If Applicable)

If you have multiple PHP versions installed on your server (e.g., `php7.4-fpm`, `php8.0-fpm`, `php8.1-fpm`), it's critical to ensure that Nginx is configured to communicate with the *specific* PHP-FPM version you intend to use for your site.

First, confirm which PHP versions are installed and active:

```bash
sudo update-alternatives --config php
```

This command will show a list of available PHP CLI versions. More importantly, ensure that the `php7.4-fpm` *package* is actually installed:

**For Debian/Ubuntu:**
```bash
sudo apt list --installed | grep php7.4-fpm
# If not installed:
sudo apt install php7.4-fpm
```

**For CentOS/RHEL (using remi-php or similar repos):**
```bash
sudo yum list installed | grep php7.4-php-fpm
# If not installed:
sudo yum install php7.4-php-fpm
```

Once installed, ensure the `php7.4-fpm` service is started and enabled (refer to Step 1), and that both its `www.conf` (Step 2) and Nginx's site configuration (Step 3) point to `php7.4-fpm.sock`. If you accidentally configured Nginx to point to `php8.1-fpm.sock` while `php7.4-fpm` is the desired and running service (or vice-versa), you'll encounter this "No such file or directory" error for the mismatched socket.

---

### Step 6: Final Restart and Log Review

After systematically applying the above steps and making any necessary corrections, perform a full restart of both PHP-FPM and Nginx services to ensure all changes are loaded.

```bash
sudo systemctl restart php7.4-fpm
sudo systemctl restart nginx
```

Immediately after restarting, check the Nginx error logs again in real-time for any recurring errors:

```bash
sudo tail -f /var/log/nginx/error.log
```

Also, re-check the PHP-FPM journal logs for any startup issues:

```bash
sudo journalctl -xeu php7.4-fpm
```

Finally, try accessing your website in the browser. If the issue is resolved, your PHP pages should now load correctly.

---

### Common Mistakes

When troubleshooting this specific Nginx-PHP-FPM connection error, users frequently make a few key mistakes:

*   **Forgetting to Restart Services:** Changes to `php-fpm.conf` or Nginx configuration files do not take effect until their respective services are restarted or reloaded. Many users apply a fix but forget this critical step, leading to continued errors.
*   **Mismatched Socket Paths:** A common error is configuring PHP-FPM to listen on one Unix socket path (e.g., `/run/php/php7.4-fpm.sock`) while Nginx is configured to connect to a slightly different path (e.g., `/var/run/php/php7.4-fpm.sock`) or even a TCP port (`127.0.0.1:9000`). Even a minor typo will result in the "No such file or directory" error.
*   **Checking the Wrong Configuration File:** If you have multiple PHP versions installed, you might inadvertently edit the `www.conf` for `php8.1-fpm` while Nginx is configured to use `php7.4-fpm`, or vice versa. Always ensure you are editing the configuration relevant to the PHP-FPM service that Nginx is attempting to connect to.
*   **Ignoring PHP-FPM Startup Errors:** If `php-fpm` fails to start, investigating its specific error logs (`journalctl -xeu php7.4-fpm`) is paramount. Generic errors like "No such file or directory" are often a symptom of PHP-FPM itself not being healthy or running.
*   **Incorrect Permissions on the Socket:** While the error explicitly says "No such file or directory," occasionally underlying permission issues for the `/var/run/php` directory or for the socket file itself (if it briefly existed but was inaccessible) can manifest similarly.

### Prevention Tips

To minimize the chances of encountering the Nginx "No such file or directory" error for PHP-FPM sockets in the future, consider implementing these best practices:

*   **Standardize Socket Paths:** Maintain consistent naming conventions and absolute paths for your PHP-FPM Unix sockets across all your server configurations. Avoid relative paths or paths that depend on symlinks if possible, or at least be explicit about their resolution.
*   **Utilize Configuration Management Tools:** For managing multiple servers or complex setups, tools like Ansible, Puppet, or Chef can automate configuration deployment, ensuring that Nginx and PHP-FPM settings are always in sync and reducing human error.
*   **Monitor Service Health:** Implement proactive monitoring for your `php-fpm` service. Tools like Monit or custom `systemd` scripts can automatically restart PHP-FPM if it goes down unexpectedly, preventing prolonged outages. Also, monitor your Nginx error logs for recurring warnings or errors.
*   **Test PHP Version Upgrades Carefully:** When upgrading PHP versions, always perform the upgrade and configuration changes in a staging environment first. Ensure that the new PHP-FPM service starts correctly, its socket is created, and Nginx is properly reconfigured to point to the new socket (e.g., `php8.1-fpm.sock`).
*   **Understand `systemd` Dependencies:** While not strictly necessary for this specific error, you can define `systemd` dependencies to ensure `php-fpm` starts *before* Nginx, or that Nginx waits for `php-fpm` to be active. However, Nginx is generally resilient enough to retry connections, so ensuring `php-fpm` is simply enabled and running is usually sufficient.