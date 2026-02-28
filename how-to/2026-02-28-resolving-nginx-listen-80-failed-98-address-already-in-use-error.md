---
title: "Resolving Nginx 'listen [::]:80 failed (98: Address already in use)' Error"
date: "2026-02-28T20:24:47.921Z"
slug: "resolving-nginx-listen-80-failed-98-address-already-in-use-error"
type: "how-to"
description: "Learn how to fix the common Nginx error \"listen [::]:80 failed (98: Address already in use)\" by understanding its causes and following step-by-step solutions."
keywords: "Nginx, Address already in use, 98 Address already in use, listen [::]:80, Nginx error, port 80, troubleshooting, server administration"
---

When attempting to start or restart the Nginx web server, you might encounter a critical error message that prevents it from running. A particularly common and frustrating one is:

```
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
```

This message clearly indicates that Nginx is unable to bind to port 80 on the IPv6 address `[::]` (which represents all available IPv6 addresses). The `(98: Address already in use)` part is the key, signifying that another process is already occupying this specific network interface and port combination. Consequently, Nginx cannot start, and your website or application relying on it will be inaccessible.

## Why It Happens

The "Address already in use" error, specifically for `listen [::]:80`, arises because port 80 is a standard port for HTTP traffic and is often used by web servers. When Nginx tries to start and declares its intention to listen on port 80 for IPv6 connections, the operating system checks if that port is already reserved. If another service, or even a previous instance of Nginx that didn't shut down cleanly, is already using port 80 for IPv6, the OS will deny Nginx's request. The `[::]` notation signifies that Nginx is trying to bind to the IPv6 loopback address and all available IPv6 network interfaces, a common and often necessary configuration for modern web servers.

This issue can stem from several scenarios. The most frequent cause is a lingering process from a previous Nginx instance that failed to terminate properly during a shutdown or crash. Other web servers like Apache (often running on port 80 by default) or even custom applications configured to use port 80 for their own HTTP services can also be the culprit. Sometimes, a system update or reboot might not have fully cleared network socket states, leading to this port conflict.

## Step-by-Step Solution

To resolve the `nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)` error, you need to identify and stop the process that is currently occupying port 80 on your IPv6 interface.

### ## Step 1: Verify Nginx Status and Configuration

Before diving into external processes, it's good practice to ensure your Nginx configuration itself is sound and that you're attempting to start Nginx correctly.

1.  **Check Nginx Status:** If Nginx was previously running, check its status.
    ```bash
    sudo systemctl status nginx
    ```
    This might show it as `inactive (dead)` or `failed`.

2.  **Examine Nginx Configuration:** Look for any duplicate `listen` directives for port 80 in your Nginx configuration files, particularly in `/etc/nginx/nginx.conf` and any files within `/etc/nginx/sites-available/` or `/etc/nginx/conf.d/` that are included.
    ```bash
    sudo grep -r "listen \[::\]:80" /etc/nginx/
    ```
    Ensure there's only one primary `listen 80` or `listen [::]:80` directive for your server block(s). Remove or comment out any duplicates.

### ## Step 2: Identify the Process Using Port 80

The core of the solution is finding what's already using the port. The `netstat` command is excellent for this.

1.  **Use `netstat` to find the PID:**
    ```bash
    sudo netstat -tulnp | grep ':80'
    ```
    *   `-t`: Show TCP connections.
    *   `-u`: Show UDP connections.
    *   `-l`: Show listening sockets.
    *   `-n`: Show numerical addresses and port numbers.
    *   `-p`: Show the PID and name of the program to which the socket belongs.
    *   `| grep ':80'`: Filters the output to only show lines containing `:80`.

    You should see output similar to this, where the last column shows the PID and program name:

    ```
    tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      1234/nginx: master
    tcp6       0      0 :::80                   :::*                    LISTEN      5678/apache2
    ```
    In this example, `1234/nginx: master` indicates Nginx is already running, and `5678/apache2` indicates Apache is running. If you see a PID for Nginx, it means Nginx is indeed running but perhaps in a state that caused the bind error upon restart. If you see another service like `apache2` or a custom application, that's your conflict.

### ## Step 3: Terminate the Conflicting Process (If Necessary)

Once you've identified the PID of the process using port 80, you need to stop it. **Exercise caution here, as stopping essential services can affect your system.**

1.  **If Nginx is the culprit:** If `netstat` shows another Nginx master process (PID `1234` in the example) and you're trying to start Nginx, it's likely a stale process.
    ```bash
    sudo systemctl stop nginx
    # or if that doesn't work
    sudo kill -9 1234 # Replace 1234 with the actual PID
    ```

2.  **If another service is the culprit:** If `netstat` shows a different service (e.g., `apache2`), you'll need to stop that service.
    ```bash
    # For Apache:
    sudo systemctl stop apache2

    # For other services, use their specific stop command.
    # If it's a custom application, you might need to find its process and kill it directly.
    ```

3.  **If no process is listed by netstat, but the error persists:** This is less common but can happen. It might indicate a kernel-level issue or a very short-lived process. In such cases, a system reboot is often the most effective way to clear the socket.

### ## Step 4: Attempt to Start Nginx Again

After ensuring no other process is bound to port 80 for IPv6, try starting Nginx again.

1.  **Start Nginx:**
    ```bash
    sudo systemctl start nginx
    ```

2.  **Check Status:**
    ```bash
    sudo systemctl status nginx
    ```
    It should now show as `active (running)`. You can also test by visiting your server's IP address in a web browser.

### ## Step 5: Consider System Reboot as a Last Resort

If the above steps don't resolve the issue, or if you're unsure about stopping specific services, a full system reboot can often clear lingering network states and resolve port conflicts.

1.  **Reboot the Server:**
    ```bash
    sudo reboot
    ```
    After the server restarts, immediately attempt to start Nginx.

## Common Mistakes

A common pitfall is attempting to kill the Nginx process using `kill` without first stopping it gracefully via `systemctl stop nginx`. This can lead to file corruption or incomplete shutdown of worker processes. Another mistake is not carefully checking the output of `netstat` and accidentally killing the wrong process, which could disrupt other critical system functions. Some users might also forget to check both IPv4 (`0.0.0.0:80`) and IPv6 (`:::80`) bindings, although the error message specifically points to IPv6 in this case. Finally, simply restarting Nginx without identifying the root cause will likely result in the same error recurring if another service continues to hold the port.

## Prevention Tips

To prevent the "Address already in use" error, consistently use proper service management commands. Always use `sudo systemctl stop nginx` before attempting to start it again, rather than relying solely on `kill` commands. If you run multiple web servers or HTTP-serving applications on the same machine, meticulously manage their port configurations to avoid conflicts. For instance, ensure one service is on port 80, another on 8080, and so on, and configure Nginx as a reverse proxy to manage traffic to these different ports if needed. Regularly monitor your server's running processes and network activity with tools like `netstat` or `ss` to proactively identify potential port conflicts before they cause an outage. Documenting which services run on which ports is also a valuable preventative measure.