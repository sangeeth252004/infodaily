---
title: "Resolving 'No 'Access-Control-Allow-Origin' Header' CORS Errors in Nginx"
date: "2026-10-09T04:37:57.171Z"
slug: "resolving-no-access-control-allow-origin-header-cors-errors-in-nginx"
type: "how-to"
description: "Learn how to fix the common 'No 'Access-Control-Allow-Origin' header is present' CORS error in Nginx. This guide provides a step-by-step solution, explains the cause, and offers prevention tips."
keywords: "Nginx, CORS, Access-Control-Allow-Origin, CORS error, Nginx configuration, web development, cross-origin requests, HTTP headers"
---

## Problem Explanation

When your web application makes requests from a different domain, protocol, or port than the server hosting the resource, the browser enforces a security policy called the Same-Origin Policy (SOP). If the server does not explicitly permit these cross-origin requests, the browser will block them and return an error. The most common manifestation of this is the following JavaScript error in the browser's developer console:

`Access to fetch at 'https://your-api-domain.com/resource' from origin 'https://your-frontend-domain.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to and the response to a regular 'Fetch' to avoid this error.`

This error message indicates that the server responded to a cross-origin request, but it did not include the necessary `Access-Control-Allow-Origin` HTTP header. Without this header, the browser, acting on behalf of the user, cannot confirm that the server intends to allow requests from your frontend's origin, and therefore denies access for security reasons.

## Why It Happens

The `Access-Control-Allow-Origin` header is part of the Cross-Origin Resource Sharing (CORS) mechanism. CORS is a browser security feature that allows web pages to make requests to a domain different from the one that served the web page. For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. When a browser makes a cross-origin request, the server must include specific CORS headers in its response to tell the browser which origins are allowed to access its resources.

The `Access-Control-Allow-Origin` header is the most fundamental of these. It specifies whether the response from the server can be shared with requesting code from the given origin. If this header is missing entirely, or if it doesn't match the origin of the requesting script, the browser will reject the request. This typically occurs when an Nginx server is acting as a reverse proxy for an API or a backend application, and its configuration does not include directives to set this essential CORS header.

## Step-by-Step Solution

The solution involves configuring Nginx to add the `Access-Control-Allow-Origin` header to responses, especially for cross-origin requests.

### Step 1: Locate Your Nginx Configuration File

The primary Nginx configuration file is typically located at `/etc/nginx/nginx.conf`. However, server-specific configurations are often placed in separate files within directories like `/etc/nginx/sites-available/` and symlinked to `/etc/nginx/sites-enabled/`. You'll need to edit the configuration file that handles the location of your API or the resources triggering the CORS error.

### Step 2: Identify the Relevant `location` Block

Within your Nginx configuration file, find the `server` block that corresponds to the domain or IP address your frontend is trying to access. Inside this `server` block, locate the `location` block that matches the URL path of your API endpoint or the resources that are causing the CORS error.

For example, if your API is at `/api/`, your configuration might look like this:

```nginx
server {
    listen 80;
    server_name your-backend-domain.com;

    location /api/ {
        # ... other proxy settings ...
    }
}
```

### Step 3: Add CORS Headers to the `location` Block

Inside the `location` block you identified, you need to add directives that will set the CORS headers. The most common and flexible approach is to use the `add_header` directive.

#### Allowing All Origins (Development/Testing Only)

For development or testing environments, you might want to allow requests from any origin. **Use this with extreme caution in production, as it exposes your API to all domains.**

```nginx
location /api/ {
    proxy_pass http://your_backend_app; # Your backend upstream
    # ... other proxy settings ...

    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,X-Kite'; # Example: if you need to expose custom headers
}
```

**Explanation of the added headers:**

*   `Access-Control-Allow-Origin`: Specifies which origins are allowed to access the resource. `*` means any origin.
*   `Access-Control-Allow-Methods`: Lists the HTTP methods allowed for cross-origin requests.
*   `Access-Control-Allow-Headers`: Lists the headers that can be used in actual requests.
*   `Access-Control-Expose-Headers`: (Optional) Specifies which headers are exposed to the browser when the response is not a CORS-safelisted header.

#### Allowing Specific Origins (Recommended for Production)

For production, it's best practice to only allow specific, trusted origins. Replace `https://your-frontend-domain.com` with the actual domain of your frontend application.

```nginx
location /api/ {
    proxy_pass http://your_backend_app; # Your backend upstream
    # ... other proxy settings ...

    set $cors_origin "https://your-frontend-domain.com";
    add_header 'Access-Control-Allow-Origin' $cors_origin;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,X-Kite';
}
```

To handle multiple specific origins, you can use an `if` statement or a map, though for simplicity, if you have many, a more complex solution or handling it at the application layer might be better. A common pattern for a few specific origins:

```nginx
location /api/ {
    proxy_pass http://your_backend_app; # Your backend upstream
    # ... other proxy settings ...

    # Check if the Origin header matches allowed origins
    if ($http_origin ~* ^(https?:\/\/your-frontend-domain\.com|https?:\/\/another-frontend\.com)$) {
        add_header 'Access-Control-Allow-Origin' '$http_origin';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,X-Kite';
    }
}
```

### Step 4: Handle Preflight Requests (OPTIONS Method)

CORS often involves a "preflight" request. Before the actual request (e.g., POST, PUT, DELETE), the browser sends an `OPTIONS` request to the server to ask for permission. Nginx needs to handle these `OPTIONS` requests correctly by returning the appropriate CORS headers.

You can add a separate `location` block specifically for `OPTIONS` requests or include it in your existing `location` block. The latter is shown above by including `'OPTIONS'` in `Access-Control-Allow-Methods`. However, for a cleaner separation or when dealing with specific paths that require it, a dedicated `location` block can be useful.

```nginx
location /api/ {
    proxy_pass http://your_backend_app;
    # ... other proxy settings ...

    # CORS Headers for actual requests
    add_header 'Access-Control-Allow-Origin' 'https://your-frontend-domain.com';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    add_header 'Access-Control-Expose-Headers' 'Content-Length,X-Kite';
}

location ~* ^/api/.*$ { # Matches /api/ and anything after it
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' 'https://your-frontend-domain.com';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Max-Age' 1728000; # Cache preflight response for 20 days
        add_header 'Content-Type' 'text/plain charset=UTF-8';
        add_header 'Content-Length' 0;
        return 204; # No Content
    }
}
```

In this setup, the first `location /api/` block handles the actual API requests and adds CORS headers to their responses. The second `location ~* ^/api/.*$` block specifically intercepts `OPTIONS` requests destined for `/api/` and returns a `204 No Content` status with the necessary CORS headers. This is a common and effective pattern.

### Step 5: Test Your Nginx Configuration

Before reloading Nginx, it's crucial to test your configuration for syntax errors.

```bash
sudo nginx -t
```

If the test is successful, you will see output indicating that the syntax is okay and the test is successful. If there are errors, Nginx will point you to the line number and file where the problem occurred.

### Step 6: Reload Nginx

Once your configuration is tested and validated, reload Nginx to apply the changes.

```bash
sudo systemctl reload nginx
```

Or, if you are on a system that uses `service`:

```bash
sudo service nginx reload
```

### Step 7: Verify the Solution

Open your web application in a browser and try to perform the action that previously triggered the CORS error. Check the browser's developer console (usually F12) for any new errors. The `Access-Control-Allow-Origin` error should now be resolved. You can also inspect the network requests in the developer console to see if the `Access-Control-Allow-Origin` header is present in the server's response.

## Common Mistakes

One common mistake is forgetting to include the `OPTIONS` method in `Access-Control-Allow-Methods` when handling preflight requests, or not handling `OPTIONS` requests at all. This can lead to preflight requests failing, even if `Access-Control-Allow-Origin` is set for other methods.

Another pitfall is using `add_header` inside a `location` block that has `proxy_pass` without considering how Nginx merges headers. While `add_header` generally works as expected, in more complex scenarios with multiple `location` blocks or `if` directives, unintended header overwrites or omissions can occur. Always test thoroughly.

Finally, a very common error is forgetting to specify the correct origin. Forgetting to add `https://` or `http://`, or a trailing slash, can cause the `Access-Control-Allow-Origin` header to not match, leading to the same CORS error. Using `*` for `Access-Control-Allow-Origin` in production is also a significant security oversight.

## Prevention Tips

To prevent `Access-Control-Allow-Origin` errors and other CORS issues in the future, always follow a principle of least privilege. In production environments, configure Nginx to allow only specific, trusted frontend origins. Avoid using `*` unless absolutely necessary for a public, non-sensitive API.

Maintain a consistent CORS configuration across your development, staging, and production environments, adjusting only the allowed origins as needed. Document your CORS policies clearly.

Consider abstracting CORS handling to your backend application layer if your Nginx configuration becomes overly complex or if you need more dynamic CORS policies. Many web frameworks provide built-in CORS middleware that can simplify management and ensure compliance. Regularly review your Nginx configuration and security best practices to stay ahead of potential issues.