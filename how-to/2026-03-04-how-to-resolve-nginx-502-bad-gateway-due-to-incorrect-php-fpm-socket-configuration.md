---
title: "How to Resolve Nginx '502 Bad Gateway' Due to Incorrect PHP-FPM Socket Configuration"
date: "2026-03-04T10:36:09.645Z"
slug: "how-to-resolve-nginx-502-bad-gateway-due-to-incorrect-php-fpm-socket-configuration"
type: "how-to"
description: "Learn to fix the Nginx 502 Bad Gateway error caused by mismatched PHP-FPM socket configurations. This guide provides step-by-step instructions to diagnose and resolve the issue."
keywords: "Nginx 502 Bad Gateway, PHP-FPM socket, incorrect configuration, Nginx error, PHP-FPM fix, web server, Unix socket, TCP socket, systemctl"
---

**Problem Explanation**

Encountering a "502 Bad Gateway" error on your website, especially when it's powered by Nginx and PHP, can be a perplexing experience. This particular error indicates that Nginx, acting as a reverse proxy, was unable to successfully communicate with an upstream server, which in the context of PHP applications, is typically PHP-FPM (FastCGI Process Manager). When a user attempts to access a PHP page on your site, instead of seeing the dynamic content, their browser will display a generic "502 Bad Gateway" message.

This specific manifestation of the 502 error commonly points to a configuration discrepancy between Nginx and PHP-FPM regarding their inter-process communication channel. Nginx is designed to serve static files efficiently and forward dynamic requests to an application server. If Nginx cannot find or connect to PHP-FPM's designated communication socket, it cannot hand off the PHP request for processing, leading directly to the communication failure and the resulting "502 Bad Gateway" error.

**Why It Happens**

The root cause of this problem lies in a mismatch in the "socket" configuration. A socket is an endpoint for sending and receiving data across a network or between processes on the same machine. Nginx and PHP-FPM communicate using one of two types of sockets: a Unix domain socket or a TCP/IP network socket. A Unix domain socket is a special file on the filesystem (e.g., `/run/php/php7.4-fpm.sock`) that enables high-performance inter-process communication strictly within the same operating system. A TCP/IP socket, conversely, uses an IP address and port number (e.g., `127.0.0.1:9000`), allowing communication across a network, or locally if using `127.0.0.1` (localhost).

The "502 Bad Gateway" occurs when Nginx is configured to connect to a specific socket (either a Unix socket path or a TCP address:port) but PHP-FPM is either not listening on that exact socket, is listening on a different one, or the specified socket file doesn't exist or has incorrect permissions. For example, your Nginx configuration might tell it to `fastcgi_pass` requests to `unix:/var/run/php/php8.1-fpm.sock`, but PHP-FPM's configuration might have `listen = 127.0.0.1:9000`. This creates a broken chain of communication, as Nginx is attempting to talk to an endpoint that isn't active or accessible, causing the gateway error.

**Step-by-Step Solution**

### Step 1: Verify the Error and Check Nginx Error Logs

The initial step is to confirm the 502 error is consistently appearing and, more importantly, to extract specific error messages from your Nginx logs. These logs are your primary source of diagnostic information.

1.  **Reproduce the error:** Open your web browser and navigate to a PHP page on your website to ensure the "502 Bad Gateway" error is consistently displayed.
2.  **Access Nginx error logs:** Nginx's main error log is typically located at `/var/log/nginx/error.log`.
    *   Use the `tail` command with the `-f` flag to watch the log in real-time:
        ```bash
        sudo tail -f /var/log/nginx/error.log
        ```
    *   After executing the command, refresh your website page in the browser to trigger the error again.
    *   Look for recent entries containing phrases like `connect() failed` or `Connection refused`. You'll likely see messages similar to these:
        *   `connect() to unix:/run/php/php7.4-fpm.sock failed (2: No such file or directory)`
        *   `connect() to 127.0.0.1:9000 failed (111: Connection refused)`
    *   Carefully note the exact socket path or `address:port` Nginx is trying to connect to from these error messages. This is what Nginx *expects*.

### Step 2: Identify PHP-FPM's Actual Listening Socket

Next, determine where PHP-FPM is actually configured to listen for incoming connections. This is crucial for identifying the mismatch.

1.  **Determine your PHP-FPM version:** If you're unsure, you can often find this by running `php -v` or checking your server's package manager. For example, if your application uses PHP 7.4, the paths will usually include `php7.4`.
2.  **Locate PHP-FPM pool configuration files:** PHP-FPM's listening configuration is typically defined within its "pool" files. These are commonly found in `/etc/php/X.X/fpm/pool.d/`, where `X.X` represents your PHP version (e.g., `7.4`, `8.1`). The default pool file is usually `www.conf`.
3.  **Inspect the pool file for the `listen` directive:**
    *   Use `grep` to quickly find the `listen` directive within your main pool file:
        ```bash
        sudo grep -r "listen =" /etc/php/X.X/fpm/pool.d/www.conf
        ```
        Remember to replace `X.X` with your specific PHP version.
    *   The output will show you the exact socket PHP-FPM is configured to use. Examples include:
        *   `listen = /run/php/php7.4-fpm.sock` (Unix domain socket)
        *   `listen = 127.0.0.1:9000` (TCP/IP socket)
    *   Note down this precise socket path or `address:port`. This is what PHP-FPM *is doing*.

### Step 3: Check Nginx Server Block Configuration

Now, verify your Nginx server block configuration to see where it's instructed to forward PHP requests.

1.  **Locate your Nginx server block file:** Nginx server block configurations are typically found in `/etc/nginx/sites-available/` and are often symlinked to `/etc/nginx/sites-enabled/`. Find the configuration file corresponding to your domain (e.g., `yourdomain.conf` or `default`).
2.  **Inspect the `fastcgi_pass` directive:**
    *   Open the relevant Nginx configuration file using a text editor:
        ```bash
        sudo nano /etc/nginx/sites-available/yourdomain.conf
        ```
        (Replace `yourdomain.conf` with the actual file name).
    *   Look for a `location ~ \.php$` block. Inside this block, you'll find the `fastcgi_pass` directive. This directive tells Nginx where to send PHP-related requests.
    *   It will typically look like one of these:
        ```nginx
        location ~ \.php$ {
            # ... other fastcgi parameters ...
            fastcgi_pass unix:/run/php/php7.4-fpm.sock;
            # OR
            fastcgi_pass 127.0.0.1:9000;
        }
        ```
    *   Note the exact socket path or `address:port` specified by `fastcgi_pass`. This is what Nginx *is configured to do*.

### Step 4: Align Nginx and PHP-FPM Socket Configurations

At this point, you have three pieces of information: what Nginx saw in its error logs (Step 1), where PHP-FPM is listening (Step 2), and where Nginx is configured to pass requests (Step 3). The core of the solution is to make Nginx's `fastcgi_pass` directive **exactly match** PHP-FPM's `listen` directive.

1.  **Choose a consistent socket configuration:**
    *   **Recommendation for local servers:** For Nginx and PHP-FPM running on the same machine, a Unix domain socket is generally preferred due to its higher performance and simpler setup (no port conflicts).
    *   **If you prefer Unix sockets:**
        *   Edit PHP-FPM's pool file (`/etc/php/X.X/fpm/pool.d/www.conf`).
        *   Ensure the `listen` directive is set to a Unix socket path, for example: `listen = /run/php/phpX.X-fpm.sock`.
        *   Then, edit your Nginx server block (`/etc/nginx/sites-available/yourdomain.conf`).
        *   Ensure the `fastcgi_pass` directive points to the *exact same* Unix socket path: `fastcgi_pass unix:/run/php/phpX.X-fpm.sock;`.
    *   **If you prefer TCP/IP sockets:**
        *   Edit PHP-FPM's pool file (`/etc/php/X.X/fpm/pool.d/www.conf`).
        *   Ensure the `listen` directive is set to a TCP address and port, for example: `listen = 127.0.0.1:9000`.
        *   Then, edit your Nginx server block (`/etc/nginx/sites-available/yourdomain.conf`).
        *   Ensure the `fastcgi_pass` directive points to the *exact same* TCP address and port: `fastcgi_pass 127.0.0.1:9000;`.
2.  **Save your changes** to both Nginx and PHP-FPM configuration files.

### Step 5: Verify Unix Socket Permissions (If Using Unix Socket)

If you have chosen to use a Unix domain socket, proper file permissions are critical. If Nginx cannot access the socket file, the "502 Bad Gateway" will persist. (Skip this step if using a TCP/IP socket).

1.  **Check the socket file's permissions and ownership:**
    ```bash
    ls -l /run/php/
    ```
    (Or `/var/run/php/` if that's where your socket is).
    You should see an entry for your `phpX.X-fpm.sock` file. The owner and group should ideally allow the Nginx user (commonly `www-data` or `nginx`) to read and write to it. A common working setup is for PHP-FPM to create the socket owned by its user/group (e.g., `www-data:www-data`) with read/write permissions for the group.
2.  **Adjust PHP-FPM pool permissions (if necessary):**
    *   Edit your PHP-FPM pool file (`/etc/php/X.X/fpm/pool.d/www.conf`).
    *   Look for the `listen.owner`, `listen.group`, and `listen.mode` directives.
    *   Ensure they are set to allow Nginx access. A typical secure and functional configuration looks like this (assuming Nginx runs as `www-data`):
        ```
        listen.owner = www-data
        listen.group = www-data
        listen.mode = 0660
        ```
    *   Also, confirm that the `user` and `group` directives at the very top of your `www.conf` file (e.g., `user = www-data`, `group = www-data`) match the user PHP-FPM processes should run as.

### Step 6: Restart Services and Test

After making any configuration modifications, both Nginx and PHP-FPM services must be restarted to load the new settings.

1.  **Test Nginx configuration for syntax errors:**
    ```bash
    sudo nginx -t
    ```
    You should see "test is successful" or similar. If there are errors, carefully review your Nginx configuration file for typos before proceeding.
2.  **Restart PHP-FPM:**
    ```bash
    sudo systemctl restart phpX.X-fpm
    ```
    (Replace `X.X` with your PHP version, e.g., `php7.4-fpm`).
3.  **Restart Nginx:**
    ```bash
    sudo systemctl restart nginx
    ```
4.  **Verify service status:** It's good practice to ensure both services are running correctly:
    ```bash
    sudo systemctl status phpX.X-fpm
    sudo systemctl status nginx
    ```
    Both should report `active (running)`.
5.  **Test your website:** Open your web browser and navigate to your website's PHP pages. The "502 Bad Gateway" error should now be resolved, and your application should load as expected.

**Common Mistakes**

A very common mistake when troubleshooting this error is neglecting to **restart both Nginx and PHP-FPM** after modifying their configuration files. Configuration changes only take effect once the respective services have been reloaded or restarted. Another frequent pitfall is a simple **typo in the socket path or IP address/port** within either the Nginx or PHP-FPM configuration; a single incorrect character can completely break the connection. Users sometimes **mix Unix domain sockets and TCP/IP sockets inconsistently**, configuring Nginx for one type while PHP-FPM is listening on the other, without understanding that they are fundamentally different communication mechanisms. Lastly, for Unix sockets, **incorrect file permissions or ownership** on the `.sock` file itself can prevent Nginx from accessing it, even if the path is otherwise correct.

**Prevention Tips**

To minimize the chances of encountering this "502 Bad Gateway" issue in the future, establishing consistent practices is key. Firstly, **standardize your socket paths and types** across all your Nginx and PHP-FPM configurations, especially if managing multiple PHP versions or web applications. For local communication, Unix domain sockets are generally the preferred and most performant choice. Secondly, always **use configuration management tools** like Ansible, Puppet, or even robust shell scripts to deploy and update server configurations. This approach significantly reduces manual errors and ensures uniformity across environments. Thirdly, implement a **rigorous testing methodology** after any server or application updates, particularly following PHP version upgrades. Always run `sudo nginx -t` to check Nginx syntax and verify service statuses (`systemctl status`) for both Nginx and PHP-FPM after any restarts. Finally, **maintain your configuration files under version control**, ideally using Git. This provides a detailed history of changes, making it far easier to identify what might have introduced an issue and revert to a known stable state if necessary.