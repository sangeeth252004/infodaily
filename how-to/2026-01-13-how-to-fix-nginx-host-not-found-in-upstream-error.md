---
title: "How to Fix Nginx \"'host not found in upstream'\" Error"
date: "2026-01-13T15:06:19.334Z"
slug: "how-to-fix-nginx-host-not-found-in-upstream-error"
type: "how-to"
description: "Learn to diagnose and resolve the Nginx 'host not found in upstream' error with a clear, step-by-step guide covering DNS, configuration, and best practices."
keywords: "Nginx, host not found in upstream, Nginx error, fix Nginx, Nginx DNS, Nginx proxy_pass, resolver directive, Nginx troubleshooting"
---

The Nginx web server is a powerful tool for serving web content and acting as a reverse proxy. However, like any complex system, it can encounter issues that interrupt its smooth operation. One common error that can leave you scratching your head is the "'host not found in upstream'" message. Understanding this error and how to fix it is crucial for maintaining your web services.

## Problem Explanation

When Nginx acts as a reverse proxy, it forwards client requests to another server, known as an "upstream" server. This upstream server could be an application server (like Node.js, Python/Django, PHP-FPM), another web server, or a microservice. The "'host not found in upstream'" error indicates that Nginx was unable to resolve the hostname of this target upstream server.

You will typically encounter this error in your Nginx error logs, often located at `/var/log/nginx/error.log` (on Linux systems). The log entry will look something like this:

```
2023/10/27 10:30:05 [error] 12345#12345: *678 host not found in upstream "api.example.com" in /etc/nginx/sites-enabled/myapp.conf:15
```

This message tells you the exact host Nginx couldn't find (`api.example.com`), the configuration file and line number where it was referenced, and the process ID (PID) and connection ID (CID) associated with the error. From a user's perspective, they might see a "502 Bad Gateway" error in their browser, as Nginx failed to connect to the backend service it was supposed to proxy to.

## Why It Happens

This error primarily occurs because Nginx, running on your server, cannot translate the hostname of your upstream server into an IP address. This translation process is called DNS (Domain Name System) resolution.

Here are the main reasons this problem manifests:

1.  **DNS Resolution Failure:** The most common cause. The Nginx server either cannot reach its configured DNS servers (e.g., `/etc/resolv.conf` issues), the DNS servers themselves are down, or the upstream hostname simply doesn't exist or is misspelled.
2.  **Nginx's DNS Caching Behavior:** By default, Nginx resolves upstream hostnames *only once* when it starts or reloads its configuration. If the upstream server's IP address changes after Nginx has started (a dynamic IP), or if the DNS record was unavailable at Nginx startup/reload time, Nginx will continue to use the stale or non-existent IP.
3.  **Typographical Errors:** A simple typo in the `proxy_pass` directive's hostname is often overlooked but easily fixed.
4.  **Network or Firewall Issues:** Even if DNS resolves correctly, a firewall (on the Nginx server, the upstream server, or anywhere in between) might be blocking the connection to the resolved IP address and port, leading Nginx to report a "host not found" as it cannot establish a connection.
5.  **Using Variables with `proxy_pass` without a `resolver`:** If you use a variable for the hostname in `proxy_pass` (e.g., `proxy_pass http://$backend_host;`), Nginx requires a `resolver` directive to be explicitly configured because it cannot resolve variables at configuration load time.

## Step-by-Step Solution

Let's walk through the steps to diagnose and resolve the "'host not found in upstream'" error.

### Step 1: Identify the Exact Upstream Host and Nginx Configuration

First, locate the exact `proxy_pass` directive causing the issue. The Nginx error log (e.g., `/var/log/nginx/error.log`) is your best friend here. It will tell you the specific hostname Nginx couldn't find and the configuration file and line number.

For example, if the error is:
`host not found in upstream "api.example.com" in /etc/nginx/sites-enabled/myapp.conf:15`

You'd open `/etc/nginx/sites-enabled/myapp.conf` and look for line 15, which likely contains something like:
```nginx
proxy_pass http://api.example.com;
```
or
```nginx
set $upstream_host "api.example.com";
proxy_pass http://$upstream_host;
```

Double-check the hostname for any typos right away. Even a single extra space or misplaced character can cause this error.

### Step 2: Verify DNS Resolution from the Nginx Server

This is the most critical step. You need to ensure the Nginx server itself can resolve the problematic hostname.

1.  **SSH into your Nginx server.**
2.  **Use DNS lookup tools:**
    *   `dig <hostname>` (e.g., `dig api.example.com`)
    *   `nslookup <hostname>` (e.g., `nslookup api.example.com`)
    *   `ping <hostname>` (e.g., `ping api.example.com`)

    **Expected Output (Success):** You should see one or more IP addresses returned.
    ```
    dig api.example.com
    ...
    ;; ANSWER SECTION:
    api.example.com.        300     IN      A       192.0.2.10
    ...
    ```

    **Error Output (Failure):** You might see `NXDOMAIN` (non-existent domain), `no servers could be reached`, or simply no `ANSWER SECTION`.
    ```
    dig api.example.com
    ...
    ;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: ...
    ```

3.  **Check `/etc/resolv.conf`:** If DNS resolution fails, examine `/etc/resolv.conf` on your Nginx server. This file lists the DNS servers your system uses. Ensure the `nameserver` entries are valid and reachable. You can try changing them to public DNS servers like Google's (8.8.8.8, 8.8.4.4) or Cloudflare's (1.1.1.1, 1.0.0.1) temporarily to rule out issues with your current DNS configuration.

    ```bash
    cat /etc/resolv.conf
    # Example content
    nameserver 8.8.8.8
    nameserver 8.8.4.4
    ```

### Step 3: Check Upstream Server Availability and Connectivity

Even if DNS resolves, the upstream server might be down or unreachable.

1.  **Ping the resolved IP:** Once you have the IP address from Step 2, try `ping <resolved_ip_address>` to check basic network connectivity.
2.  **Test specific port connectivity:** Use `curl` or `telnet` to check if the specific port the upstream service is listening on is open and responsive from the Nginx server.
    *   `curl -I http://<resolved_ip_address>:<port>` (e.g., `curl -I http://192.0.2.10:8000`)
    *   `telnet <resolved_ip_address> <port>` (e.g., `telnet 192.0.2.10 8000`)

    If `telnet` connects and shows a blank screen or a simple response, the port is open. If it hangs or shows "Connection refused" or "No route to host," there's a connectivity issue.
3.  **Check Firewalls:**
    *   **Nginx Server:** Ensure your Nginx server's outbound firewall allows connections to the upstream server's IP and port. (e.g., `sudo ufw status`, `sudo firewall-cmd --list-all`)
    *   **Upstream Server:** Verify that the upstream server's inbound firewall allows connections from your Nginx server's IP address on the correct port. (e.g., `sudo ufw status`, `sudo firewall-cmd --list-all`, or cloud provider security groups/network ACLs).

### Step 4: Implement Nginx Resolver for Dynamic Hostnames or Variables

If the upstream hostname's IP address changes frequently (common in cloud environments with auto-scaling or service discovery), or if you're using a variable in your `proxy_pass` directive, Nginx's default static DNS resolution won't work. You need to configure Nginx to dynamically resolve hostnames.

Add a `resolver` directive to your `http`, `server`, or `location` block.

```nginx
http {
    # ...
    resolver 8.8.8.8 8.8.4.4 valid=30s; # Google DNS. Use your local DNS if preferred.
                                      # valid=30s means Nginx will re-query DNS after 30 seconds.
    # ...
    server {
        # ...
        location /api/ {
            set $upstream_api_host "api.example.com"; # Define variable
            proxy_pass http://$upstream_api_host;     # Use variable in proxy_pass
            # Required for proxy_pass with variable:
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_http_version 1.1;
            proxy_set_header Connection ""; # Clear Connection header for keep-alive
        }
    }
}
```

**Important Notes:**
*   Always use a variable (e.g., `$upstream_api_host`) when configuring dynamic DNS with `proxy_pass`. Nginx will resolve the variable's value dynamically at runtime using the `resolver`. If you directly use a hostname without a variable (e.g., `proxy_pass http://api.example.com;`), Nginx will still resolve it only at startup/reload, rendering the `resolver` less effective for *dynamic* changes.
*   Choose reliable DNS servers for the `resolver` directive. Using your local network's DNS server is often best if it's reliable and resolves internal hostnames. Public DNS servers like 8.8.8.8 are a good general fallback.

### Step 5: Test Nginx Configuration and Apply Changes

After making any changes to your Nginx configuration, always test it for syntax errors before reloading or restarting.

1.  **Test Nginx configuration:**
    ```bash
    sudo nginx -t
    ```
    You should see `syntax is ok` and `test is successful`. If there are errors, correct them before proceeding.

2.  **Reload Nginx:** If the test is successful, reload Nginx to apply the changes without dropping active connections.
    ```bash
    sudo systemctl reload nginx
    ```
    If a simple `reload` doesn't work or if you've made significant changes (especially involving `resolver` in `http` block scope), a `restart` might be necessary.
    ```bash
    sudo systemctl restart nginx
    ```

3.  **Monitor Logs:** After reloading/restarting, monitor your Nginx error logs (`tail -f /var/log/nginx/error.log`) and check your application's functionality to confirm the error is gone.

### Step 6: Consider Using IP Addresses Directly (Last Resort)

If all else fails and DNS resolution remains a persistent problem, you can temporarily or permanently use the upstream server's IP address directly in your `proxy_pass` directive:

```nginx
proxy_pass http://192.0.2.10:8000; # Replace with your upstream server's IP and port
```

**Caution:** Using IP addresses directly makes your configuration less flexible if the upstream server's IP ever changes. It's generally preferred to fix DNS issues rather than hardcoding IPs.

## Common Mistakes

*   **Forgetting to Reload/Restart Nginx:** After modifying configuration files, Nginx needs to be told to load the new settings. A common mistake is to change the config but forget `sudo systemctl reload nginx` or `sudo systemctl restart nginx`.
*   **Typos in Hostnames:** A seemingly obvious one, but a common cause. Double-check `api.example.com` versus `api.exampl.com` or `api.example.com `.
*   **Incorrect `resolver` Placement or Values:** Placing the `resolver` directive in the wrong block (it should be in `http`, `server`, or `location`) or using invalid DNS server IPs can cause issues.
*   **Not Using a Variable with Dynamic `proxy_pass`:** If you add a `resolver` but still use `proxy_pass http://hostname.com;` without a variable, Nginx will still perform its default one-time resolution at startup/reload.
*   **Firewall Blockage:** Assuming network connectivity when a firewall on either the Nginx server or the upstream server is silently dropping packets. Always verify with `curl` or `telnet`.
*   **Stale DNS Cache on Nginx Server OS:** Even if `/etc/resolv.conf` is fine, the OS itself might have a DNS cache. Clearing it or restarting the `systemd-resolved` service might be necessary in some cases, though less common with Nginx's own resolver.

## Prevention Tips

*   **Use Reliable DNS:** Ensure your Nginx server uses reliable and fast DNS resolvers. If you're in a corporate environment, use your internal DNS servers. For public-facing services, consider public DNS like 1.1.1.1 or 8.8.8.8 if they offer better reliability.
*   **Implement Nginx `resolver` for Dynamic Upstreams:** If your upstream services are prone to IP changes (e.g., in containerized environments, cloud autoscaling groups), always configure the `resolver` directive with a short `valid` time (e.g., `valid=10s` to `30s`) and use a variable in your `proxy_pass` directive.
*   **Monitor Upstream Services:** Implement health checks and monitoring for your upstream servers. Tools like Prometheus, Grafana, or basic uptime monitors can alert you when an upstream service becomes unavailable, often before Nginx even logs a "host not found" error due to other connectivity issues.
*   **Centralized Configuration Management:** Use tools like Ansible, Puppet, or Chef to manage your Nginx configurations. This reduces the chance of manual typos and ensures consistent, validated configurations across your servers.
*   **Thorough Testing:** Whenever you deploy new services or change network configurations, always test end-to-end connectivity from the Nginx server to the upstream service. Don't just rely on Nginx restarting without errors; actively send requests to ensure the proxy works.
*   **Use `/etc/hosts` for Static, Internal Upstreams (with Caution):** For internal, highly stable upstream services, you can add an entry to `/etc/hosts` on your Nginx server. This bypasses DNS resolution entirely. However, this method is inflexible if the IP ever changes.

By understanding the underlying causes and systematically working through the solution steps, you can quickly resolve the Nginx "'host not found in upstream'" error and ensure your web services remain accessible.