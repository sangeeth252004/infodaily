---
title: "How to Resolve 'Invalid Host Header' Error in Webpack Dev Server"
date: "2026-04-30T07:27:24.784Z"
slug: "how-to-resolve-invalid-host-header-error-in-webpack-dev-server"
type: "how-to"
description: "Stuck on \"Invalid Host Header\" with Webpack Dev Server? This guide provides a friendly, step-by-step solution, explaining why it happens and how to configure `allowedHosts` or use CLI flags to fix it permanently."
keywords: "webpack, webpack dev server, invalid host header, allowedHosts, devServer, frontend development, troubleshooting, host header, dns rebinding, configuration error"
---

The Webpack Dev Server is an incredibly useful tool for rapid frontend development, providing features like hot module replacement and live reloading. However, you might occasionally run into a cryptic but common error: "Invalid Host Header." This issue can halt your development workflow, leaving your browser stuck on a blank page or an error message.

### Problem Explanation

When you try to access your application served by Webpack Dev Server, either through `localhost`, an IP address, or a custom domain, instead of seeing your application, you might encounter a browser error page that explicitly states "Invalid Host Header." Sometimes, the browser might just show a generic "This site can't be reached" message, but your terminal where the Webpack Dev Server is running will most likely output a clear warning or error message similar to this:

```
[webpack-dev-server] Invalid Host Header
```

This means the server is refusing to connect, preventing you from viewing or interacting with your development build. It's a frustrating roadblock, especially when you're deep in coding and expect your changes to appear instantly.

### Why It Happens

The "Invalid Host Header" error is a security feature implemented in Webpack Dev Server (and other development servers like `create-react-app`'s underlying server) to protect against a type of attack known as DNS rebinding.

Here's the simplified explanation: when your browser requests a resource from `http://your-app.dev:8080`, it sends an HTTP header called `Host: your-app.dev:8080` along with the request. The Webpack Dev Server, by default, is configured to only accept requests where the `Host` header matches `localhost`, `127.0.0.1`, or `[::1]`. If the `Host` header in the incoming request does not match one of these default allowed hosts, the server assumes it might be a malicious request attempting a DNS rebinding attack and rejects the connection, resulting in the "Invalid Host Header" error. This security measure is crucial, but it often trips up developers who are using custom domains, IP addresses, or accessing their dev server from another machine on the network.

### Step-by-Step Solution

Let's walk through the steps to get your Webpack Dev Server up and running smoothly again.

#### ## Step 1: Understand Your Current Setup and Desired Access

Before making changes, clarify how you're trying to access your application.
*   Are you using `localhost` but with a non-standard port?
*   Are you trying to access it via an IP address (e.g., `192.168.1.100`)?
*   Are you using a custom domain (e.g., `my-app.test`) configured in your `hosts` file?
*   Are you trying to access it from another device on your network?

This context will guide you to the most appropriate solution.

#### ## Step 2: Check Your `webpack.config.js` Dev Server Settings

The first place to look for a fix is within your `webpack.config.js` file, specifically the `devServer` configuration block. Open your `webpack.config.js` and locate the `devServer` object.

You might have settings like these:

```javascript
// webpack.config.js
module.exports = {
  // ... other webpack configurations
  devServer: {
    host: 'localhost', // Or '0.0.0.0' for network access
    port: 8080,
    // ... other devServer options
  },
};
```

If your `host` is set to `'0.0.0.0'` (which allows access from any network interface) but you're still getting the error when accessing via an IP or custom domain, it means the `allowedHosts` setting is the key.

#### ## Step 3: Configure `devServer.allowedHosts`

This is the most common and robust solution. The `allowedHosts` option explicitly tells Webpack Dev Server which hostnames are permitted to access it. You have a few options for its value:

*   **For Specific Hosts:** If you're using a custom domain (e.g., `my-app.test`) or specific IP addresses, list them in an array:

    ```javascript
    // webpack.config.js
    module.exports = {
      // ...
      devServer: {
        host: '0.0.0.0', // Essential if you're not using localhost
        port: 8080,
        allowedHosts: [
          'my-app.test',       // Your custom domain
          '192.168.1.100',     // Your local IP address
          '.yourdomain.com'    // A wildcard for subdomains (note the leading dot)
        ],
      },
    };
    ```

    Remember to set `host: '0.0.0.0'` if you intend to access your server from anything other than `localhost`. If `host` is `'localhost'`, it won't listen on external interfaces, and `allowedHosts` might not be enough for external access.

*   **Allow All Hosts (Use with Caution):** If you need broad access (e.g., testing on multiple devices, or you're unsure of specific IPs), you can set `allowedHosts` to `'all'`. However, be aware that this disables the DNS rebinding protection entirely, making your dev server vulnerable to such attacks. It's generally not recommended for public-facing servers or shared networks unless you fully understand the risks.

    ```javascript
    // webpack.config.js
    module.exports = {
      // ...
      devServer: {
        host: '0.0.0.0', // Crucial for external access
        port: 8080,
        allowedHosts: 'all', // Disables host header validation
      },
    };
    ```

*   **Automatic Detection (`auto`):** Introduced in Webpack Dev Server v4, the `'auto'` option attempts to detect allowed hosts based on your `host` and `port` configuration. This can be a good middle-ground if `localhost` isn't cutting it but you don't want to list every possible IP.

    ```javascript
    // webpack.config.js
    module.exports = {
      // ...
      devServer: {
        host: '0.0.0.0', // Or a specific IP
        port: 8080,
        allowedHosts: 'auto', // Tries to automatically determine allowed hosts
      },
    };
    ```

After making changes to `webpack.config.js`, **you must restart your Webpack Dev Server** for the changes to take effect.

#### ## Step 4: Use CLI Flags for Quick Testing (Alternative)

If you're launching Webpack Dev Server directly from the command line or via `package.json` scripts, you can pass `allowedHosts` as a CLI flag. This is useful for quick tests or if you don't want to modify `webpack.config.js`.

For example, in your `package.json` script:

```json
{
  "scripts": {
    "start": "webpack serve --host 0.0.0.0 --port 8080 --allowed-hosts my-app.test 192.168.1.100",
    "start-all": "webpack serve --host 0.0.0.0 --port 8080 --allowed-hosts all"
  }
}
```

Or directly in your terminal:

```bash
webpack serve --host 0.0.0.0 --port 8080 --allowed-hosts all
```

Remember that CLI flags can override settings in `webpack.config.js`.

#### ## Step 5: Verify Network Access and Firewall Settings

If you've configured `host: '0.0.0.0'` and `allowedHosts` appropriately but still can't access your dev server from another machine or via an IP address, check your network configuration:

*   **Firewall:** Ensure your operating system's firewall isn't blocking incoming connections to the port your Webpack Dev Server is using (e.g., 8080). You might need to create an inbound rule to allow traffic on that specific port.
*   **Network Router:** If you're on a complex network, ensure your router isn't blocking local network traffic between devices.

#### ## Step 6: Clear Browser Cache and Test Again

Sometimes, your browser might cache old redirect rules or simply behave unexpectedly. After making changes to your server configuration, it's always a good idea to perform a hard refresh (`Ctrl+Shift+R` or `Cmd+Shift+R`) or clear your browser's cache for the specific URL you're trying to access. Then, try navigating to your application's URL again.

### Common Mistakes

*   **Forgetting to Restart the Server:** This is perhaps the most frequent mistake. Changes to `webpack.config.js` are not automatically picked up by a running Webpack Dev Server. Always stop and restart it.
*   **Typographical Errors:** A simple typo in a hostname or IP address within the `allowedHosts` array will prevent it from working correctly. Double-check your entries.
*   **Misunderstanding `host: '0.0.0.0'`:** Setting `host` to `'0.0.0.0'` allows the server to listen on *all* available network interfaces. However, it doesn't automatically mean all host headers are allowed. You still need `allowedHosts` if you're not using `localhost` or `127.0.0.1`. If your `host` is set to `localhost`, the server will only be accessible via `localhost` or `127.0.0.1`, even if you specify `allowedHosts` for external IPs/domains.
*   **Using `'all'` indiscriminately:** While `'all'` is a quick fix, it bypasses an important security measure. It's fine for isolated development environments, but be cautious in shared or less controlled settings.
*   **Incorrect `hosts` file entry:** If you're using a custom domain (e.g., `my-app.test`), ensure it's correctly mapped to `127.0.0.1` (or your machine's local IP) in your operating system's `hosts` file.

### Prevention Tips

*   **Be Explicit with `allowedHosts`:** Whenever you deviate from `localhost`, make `allowedHosts` a standard part of your `devServer` configuration. Explicitly list the domains or IPs you intend to use.
*   **Use Environment Variables:** For flexibility, especially in team environments or when deploying to different local setups, consider using environment variables for host and port settings. This allows developers to easily override them without modifying `webpack.config.js` directly.

    ```javascript
    // webpack.config.js
    module.exports = {
      // ...
      devServer: {
        host: process.env.DEV_SERVER_HOST || 'localhost',
        port: process.env.DEV_SERVER_PORT || 8080,
        allowedHosts: process.env.DEV_SERVER_ALLOWED_HOSTS ? process.env.DEV_SERVER_ALLOWED_HOSTS.split(',') : ['localhost'],
      },
    };
    ```

    Then, you can start your server like: `DEV_SERVER_ALLOWED_HOSTS="my-app.test,192.168.1.100" webpack serve`.

*   **Understand Your Network:** Familiarize yourself with your local network setup, including your machine's IP address and any firewall rules that might affect port access.
*   **Keep Webpack Dev Server Updated:** New versions often bring improvements and better default behaviors. Regularly update your `webpack-dev-server` package to benefit from the latest fixes and features.

By following these steps and understanding the underlying reasons, you can confidently tackle the "Invalid Host Header" error and keep your development workflow smooth and secure.