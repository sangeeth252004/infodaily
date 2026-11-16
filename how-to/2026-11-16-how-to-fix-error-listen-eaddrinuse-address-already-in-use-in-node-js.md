---
title: "How to Fix \"Error: listen EADDRINUSE: address already in use\" in Node.js"
date: "2026-11-16T23:38:54.217Z"
slug: "how-to-fix-error-listen-eaddrinuse-address-already-in-use-in-node-js"
type: "how-to"
description: "Learn to diagnose and resolve the Node.js EADDRINUSE error, which indicates a port is already in use. This guide provides step-by-step solutions for Linux, macOS, and Windows."
keywords: "Node.js, EADDRINUSE, address already in use, port conflict, fix Node.js error, listen EADDRINUSE, how to fix EADDRINUSE, process management, terminate process, Node.js port"
---

### Problem Explanation

When developing or deploying Node.js applications, you might encounter a frustrating error message that prevents your server from starting: `Error: listen EADDRINUSE: address already in use`. This specific error indicates that the network port your Node.js application is attempting to bind to is already occupied by another process on your system.

What you'll typically see in your console output is something similar to this, often followed by a stack trace:

```
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupDnsBindings (node:net:1134:19)
    at Server.listen (node:net:1200:10)
    at Object.<anonymous> (/path/to/your/app.js:XX:XX)
    at Module._compile (node:internal/modules/cjs/loader:XXXX:XX)
    at Module._extensions..js (node:internal/modules/cjs/loader:XXXX:XX)
    at Module.load (node:internal/modules/cjs/loader:XXXX:XX)
    at Module._load (node:internal/modules/cjs/loader:XXXX:XX)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:XX:XX)
    at node:internal/main/run_main_module:XX:XX {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 3000
}
```

The key piece of information is `EADDRINUSE: address already in use`, followed by the port number (e.g., `:::3000` indicates port 3000). Your Node.js application cannot start because the operating system is reporting that the requested network resource (the port) is unavailable.

### Why It Happens

The root cause of the `EADDRINUSE` error is straightforward: a port conflict. Every network service listens on a specific port number on a machine. When your Node.js application tries to start and listen on, say, port 3000, the operating system checks if that port is free. If another process is already actively using port 3000, the OS will deny your application's request, resulting in the `EADDRINUSE` error.

This most commonly occurs in a few scenarios:

1.  **A previous instance of your Node.js application crashed:** If your server didn't shut down gracefully, its process might still be running in the background, holding onto the port. When you try to restart the server, the old, lingering process is still occupying the port.
2.  **You started your application multiple times:** You might have inadvertently launched your Node.js server twice, perhaps in different terminal windows or through different build commands.
3.  **Another application is using the same port:** It could be another development server (e.g., a Python Flask app, a Ruby on Rails app, or another Node.js project) that you forgot was running, or even a system service that happens to be configured to use the same port.
4.  **A process manager (like PM2 or Forever) is already managing an instance:** If you use a process manager, it might have already started your application, and a manual attempt to launch it again will cause this conflict.

Understanding that the operating system can only assign a specific port to one process at a time is crucial for troubleshooting this error. The goal is to identify and terminate the rogue process that's holding your desired port hostage.

### Step-by-Step Solution

To resolve the `EADDRINUSE` error, you need to identify the process currently using the problematic port and then terminate it.

#### ## Step 1: Identify the Occupied Port

The error message itself will tell you which port is causing the problem. Look for `port: XXXX` or `:::XXXX` in the error output. For example, in `Error: listen EADDRINUSE: address already in use :::3000`, the port is `3000`. Make a note of this port number.

#### ## Step 2: Find the Process Using the Port

Once you know the port, you need to find out which process is using it. The commands vary slightly depending on your operating system.

**For Linux/macOS:**

Open your terminal and use one of the following commands, replacing `PORT_NUMBER` with the actual port (e.g., `3000`):

```bash
sudo lsof -i :PORT_NUMBER
```

*Example Output:*
```
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    12345   user   20u  IPv6 0x...      0t0  TCP *:3000 (LISTEN)
```

Alternatively, you can use `netstat` (often requires `sudo` on Linux):

```bash
sudo netstat -tunlp | grep PORT_NUMBER
```

*Example Output:*
```
tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      12345/node
```

In both cases, look for the `PID` (Process ID) column. In the examples above, the PID is `12345`.

**For Windows:**

Open Command Prompt as an administrator (right-click Command Prompt and select "Run as administrator") and use the following command:

```cmd
netstat -ano | findstr :PORT_NUMBER
```

*Example Output:*
```
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       12345
```

In this output, the last column on the right is the `PID`. In the example, the PID is `12345`.

#### ## Step 3: Terminate the Process

Once you have identified the PID of the process occupying the port, you can terminate it.

**For Linux/macOS:**

Use the `kill` command followed by the PID. The `-9` flag forces termination, which is usually necessary for stubborn processes.

```bash
kill -9 PID_NUMBER
```

*Example:* `kill -9 12345`

**For Windows:**

Use the `taskkill` command followed by the PID. The `/F` flag forces termination, and `/PID` specifies the process ID.

```cmd
taskkill /PID PID_NUMBER /F
```

*Example:* `taskkill /PID 12345 /F`

You should see a success message like "SUCCESS: The process with PID 12345 has been terminated."

#### ## Step 4: Verify Process Termination (Optional, but Recommended)

After attempting to kill the process, it's a good practice to verify that it has indeed stopped. Rerun the command you used in Step 2 to find the process:

*   **Linux/macOS:** `sudo lsof -i :PORT_NUMBER` or `sudo netstat -tunlp | grep PORT_NUMBER`
*   **Windows:** `netstat -ano | findstr :PORT_NUMBER`

If no output is returned (or the `LISTEN` state for that port is gone), the process has been successfully terminated, and the port is now free.

#### ## Step 5: Restart Your Node.js Application

With the port now clear, you can safely restart your Node.js application. Navigate to your application's directory in your terminal and run your start command:

```bash
node your_app.js
# or
npm start
# or
yarn start
```

Your application should now start successfully without the `EADDRINUSE` error.

#### ## Step 6: Consider Changing the Port (Alternative or Fallback)

If, for some reason, you consistently encounter port conflicts, or if the port is used by a critical system service you cannot terminate, an alternative is to change your Node.js application's port.

Most Node.js applications configure their port using an environment variable or a default value, like this:

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Uses PORT env variable, or 3000 by default

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

You can change the default `3000` to another unused port (e.g., `4000`, `8080`, `8000`). Alternatively, you can set the `PORT` environment variable before running your application:

**For Linux/macOS:**

```bash
PORT=4000 npm start
# or
PORT=4000 node your_app.js
```

**For Windows (Command Prompt):**

```cmd
set PORT=4000 && npm start
```

**For Windows (PowerShell):**

```powershell
$env:PORT=4000; npm start
```

This tells your application to use the specified port instead of the default.

### Common Mistakes

When troubleshooting the `EADDRINUSE` error, users often fall into a few common traps:

1.  **Restarting without terminating:** The most frequent mistake is simply trying to restart the Node.js application immediately after seeing the error, without first identifying and killing the process that holds the port. This will, of course, lead to the same error repeatedly.
2.  **Killing the wrong process:** While less common, if you misread the PID or accidentally kill a crucial system process, it can lead to system instability or other issues. Always double-check the PID before issuing the `kill` or `taskkill` command.
3.  **Ignoring the root cause:** Just changing the port (as in Step 6) without understanding why the original port was occupied can mask underlying issues. For instance, if your application regularly crashes and leaves zombie processes, simply changing the port repeatedly won't solve the stability problem.
4.  **Not using administrator/sudo privileges:** On many systems, `netstat`, `lsof`, `kill`, and `taskkill` commands require elevated privileges to display all processes or to terminate processes owned by other users or the system. Forgetting `sudo` on Linux/macOS or "Run as administrator" on Windows can prevent you from seeing or killing the offending process.
5.  **Forgetting about process managers:** If you use tools like PM2 or Forever, they are designed to keep your application running. Manually starting an application already managed by such a tool will inevitably lead to an `EADDRINUSE` error. Always interact with your application through the process manager (e.g., `pm2 restart app_name`).

### Prevention Tips

Preventing the `EADDRINUSE` error primarily involves good development practices and understanding how your applications and the operating system manage resources.

1.  **Implement Graceful Shutdowns:** Ensure your Node.js applications handle termination signals (`SIGINT`, `SIGTERM`) gracefully. This allows your server to close open connections and release the port before exiting. For Express applications, this often involves calling `server.close()`:

    ```javascript
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    process.on('SIGINT', () => {
      console.log('SIGINT signal received. Closing HTTP server.');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    });
    ```

2.  **Use Process Managers (e.g., PM2, Forever):** For production environments or even complex development setups, using a dedicated process manager is highly recommended. These tools ensure that only one instance of your application is running, automatically restart it if it crashes, and manage port allocation more effectively, minimizing `EADDRINUSE` occurrences.

3.  **Configure Ports Dynamically or with Environment Variables:** Always configure your application's port using environment variables (e.g., `process.env.PORT`) with a sensible default. This makes your application more flexible and less prone to conflicts, as you can easily change the port without modifying code.

4.  **Be Mindful of Background Processes:** After development sessions or system restarts, take a moment to ensure that old development servers or other applications aren't still running in the background and occupying ports you intend to use. Regularly checking with `lsof` or `netstat` can be a good habit.

5.  **Use Unique Ports for Different Projects:** If you work on multiple Node.js projects simultaneously, assign distinct default ports to each project to avoid conflicts during concurrent development. For example, project A uses 3000, project B uses 3001, etc.