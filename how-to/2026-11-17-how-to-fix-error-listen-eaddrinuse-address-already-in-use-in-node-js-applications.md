---
title: "How to Fix 'Error: listen EADDRINUSE: address already in use' in Node.js Applications"
date: "2026-11-17T06:36:53.887Z"
slug: "how-to-fix-error-listen-eaddrinuse-address-already-in-use-in-node-js-applications"
type: "how-to"
description: "A comprehensive, step-by-step guide to resolve the Node.js 'EADDRINUSE' error, helping you identify, terminate, and prevent port conflicts."
keywords: "Node.js, EADDRINUSE, address already in use, port conflict, fix error, troubleshoot Node.js, listen error, netstat, lsof, taskkill, kill process, Node.js port"
---

When developing Node.js applications, especially those that involve network communication like web servers, you might occasionally run into a frustrating error message: `Error: listen EADDRINUSE: address already in use`. This message halts your application's startup and can be a stumbling block for developers of all experience levels. It directly tells you that your application cannot start because the network address and port it's trying to use are already claimed by another process on your system.

What you'll typically see in your terminal or command prompt is a stack trace similar to this:

```
events.js:180
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (net.js:1286:14)
    at Server.listen (net.js:1384:10)
    at Object.<anonymous> (/path/to/your/app.js:5:5)
    ... (rest of the stack trace)
    {
      code: 'EADDRINUSE',
      errno: -98,
      syscall: 'listen',
      address: '::',
      port: 3000
    }
```

The key part here is `EADDRINUSE` (Error Address In Use) and the specific port number, often `3000` (or `8000`, `8080`, etc., depending on your application's configuration). This error means your Node.js server tried to open a "door" (a port) to listen for incoming connections, but that door was already locked by someone else.

### Why It Happens

The root cause of `EADDRINUSE` is straightforward: a designated port on your machine can only be actively listened to by one process at a time. When your Node.js application tries to start a server on a specific port (like port 3000), and another application is already using that port, the operating system prevents the new application from binding to it, thus throwing the `EADDRINUSE` error.

This commonly occurs for a few reasons. Often, a previous instance of your Node.js application (or another server application) didn't shut down cleanly. Perhaps you closed the terminal window without properly stopping the running process, or the application crashed, leaving its server process orphaned in the background. Other times, another completely different application – maybe a local development server like Apache, Nginx, or even a Docker container – is legitimately using that port. Regardless of the culprit, the system cannot allow two processes to listen on the exact same port simultaneously, leading to the conflict.

### Step-by-Step Solution

Let's walk through how to identify and resolve this port conflict effectively.

## Step 1: Identify the Occupied Port

The first and most crucial step is to determine exactly which port is causing the problem. Your error message will explicitly state this. Look for the `port:` field in the error object or the part of the error message that says `address already in use :::<PORT_NUMBER>`. In our example, it was `:::3000`, so the port is `3000`. Make a note of this number, as you'll need it for the next steps.

## Step 2: Find the Process Using the Port (Windows)

If you're on a Windows machine, you can use the `netstat` and `tasklist` commands in Command Prompt or PowerShell to find the offending process.

1.  Open Command Prompt or PowerShell as an administrator.
2.  Type the following command, replacing `<PORT_NUMBER>` with the port you identified (e.g., `3000`):
    ```bash
    netstat -ano | findstr :<PORT_NUMBER>
    ```
    For example: `netstat -ano | findstr :3000`

    This command lists all active network connections and listening ports, then filters for entries containing your port number. The `-a` flag shows all connections and listening ports, `-n` displays addresses and port numbers in numerical form, and `-o` includes the Process ID (PID) for each connection.

3.  Look for a line that says `LISTENING`. The last column on that line will be the PID. For example:
    ```
      TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       1234
    ```
    Here, `1234` is the PID.

4.  To identify the application associated with that PID, use the `tasklist` command:
    ```bash
    tasklist /fi "PID eq <PID>"
    ```
    For example: `tasklist /fi "PID eq 1234"`

    This will show you the image name (process name) and other details, helping you understand what program is running.

## Step 3: Find the Process Using the Port (macOS/Linux)

For macOS and Linux users, the `lsof` (list open files) or `netstat` (network statistics) commands are your best friends.

1.  Open your Terminal.
2.  Use the `lsof` command, replacing `<PORT_NUMBER>` with your port:
    ```bash
    lsof -i tcp:<PORT_NUMBER>
    ```
    For example: `lsof -i tcp:3000`

    This command lists information about processes that have network files open on the specified TCP port. You'll see output like:
    ```
    COMMAND    PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
    node      1234   youruser   12u  IPv4 0x...      0t0  TCP *:3000 (LISTEN)
    ```
    Here, `node` is the command and `1234` is the PID.

3.  Alternatively, especially on Linux, you can use `netstat`:
    ```bash
    sudo netstat -tulpn | grep :<PORT_NUMBER>
    ```
    For example: `sudo netstat -tulpn | grep :3000`

    This command requires `sudo` to show process names and PIDs. You'll see similar output, with the PID in the `PID/Program name` column:
    ```
    tcp        0      0 0.0.0.0:3000            0.0.0.0:*               LISTEN      1234/node
    ```
    Again, `1234` is the PID, and `node` is the program.

## Step 4: Terminate the Conflicting Process

Once you have the PID of the process occupying your desired port, you can terminate it. Be cautious here: ensure you are killing the correct process, especially if it's not immediately obvious that it belongs to your development environment.

*   **For Windows:**
    Use `taskkill` with the `/PID` (Process ID) and `/F` (Forcefully terminate) flags.
    ```bash
    taskkill /PID <PID> /F
    ```
    For example: `taskkill /PID 1234 /F`

*   **For macOS/Linux:**
    Use the `kill` command. The `-9` flag sends a `SIGKILL` signal, which forcefully terminates the process.
    ```bash
    kill -9 <PID>
    ```
    For example: `kill -9 1234`

After running the command, you can re-run the `netstat` or `lsof` command from Step 2 or 3 to verify that the port is no longer in use.

## Step 5: Change Your Application's Port (Alternative)

If you find that the port is legitimately being used by another important service or you frequently encounter conflicts, you might consider changing the port your Node.js application uses. This is often the quickest fix if you don't want to terminate other processes.

Most Node.js server setups allow you to specify the port. For example, with Express.js:

```javascript
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080; // Use environment variable or default to 8080

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

In this example, the application will try to use the port specified in the `PORT` environment variable. If that variable isn't set, it will default to `8080`. You can start your application with a different port like this:

*   **macOS/Linux:** `PORT=3001 node your-app.js`
*   **Windows (Command Prompt):** `set PORT=3001 && node your-app.js`
*   **Windows (PowerShell):** `$env:PORT=3001; node your-app.js`

Choose a port that is typically not used by common services (e.g., ports above 1024 are generally safe for user applications, avoiding well-known ports like 80, 443, 22, etc.).

## Step 6: Restart Your Node.js Application

Once you've either terminated the conflicting process or changed your application's port, it's time to try starting your Node.js application again.

Use your usual command, such as:
*   `node your-app.js`
*   `npm start`
*   `yarn start`

If all went well, your application should now start without the `EADDRINUSE` error, and you should see your server's "listening" message in the console.

## Step 7: Check for Daemonized Processes or Process Managers

Sometimes, simply killing a process (Step 4) doesn't work because it's managed by a daemon or a process manager that automatically restarts it. This is common in production environments but can also happen in development if you're using tools like PM2, Docker, or systemd services.

*   **PM2:** If you're using PM2, an instance of your app might be running in the background.
    *   List all PM2 processes: `pm2 list`
    *   Stop a specific process by ID or name: `pm2 stop <id|name>`
    *   Delete it from PM2's list: `pm2 delete <id|name>`
    *   Then, try `pm2 start your-app.js` again, or `node your-app.js` if you're done with PM2 for now.

*   **Docker:** If your Node.js app is running inside a Docker container, the container might be using the port.
    *   List running containers: `docker ps`
    *   Find the container that's exposing your problematic port (e.g., `0.0.0.0:3000->3000/tcp`).
    *   Stop the container: `docker stop <container_id_or_name>`
    *   If you need to remove it to prevent automatic restart: `docker rm <container_id_or_name>`
    *   Then restart your Node.js app or Docker container as needed.

### Common Mistakes

When troubleshooting the `EADDRINUSE` error, developers often make a few common mistakes that can prolong the resolution process:

1.  **Ignoring the Port Number:** The error message always specifies the exact port. Overlooking this detail and just guessing which port is causing the issue can lead to wasted time investigating the wrong processes. Always confirm the port first.
2.  **Killing the Wrong Process:** Especially on Windows, where process names can be generic (like `node.exe` or `svchost.exe`), it's easy to accidentally terminate a system process or another important application if you don't carefully check the PID. Always verify the PID and, if possible, the process name before terminating.
3.  **Not Using Forceful Termination:** Sometimes, a process might be unresponsive and won't shut down with a standard `kill` command. Forgetting to use the forceful options (`/F` on Windows `taskkill` or `-9` on Unix `kill`) means the process might persist, making you think the port is still in use by something else.
4.  **Immediately Restarting Without Verification:** After attempting to kill a process, it's good practice to re-run `netstat` or `lsof` to confirm the port is indeed free *before* trying to start your Node.js application again. This prevents re-encountering the same error and helps confirm your fix worked.
5.  **Forgetting Process Managers:** If your application is managed by a tool like PM2 or is running inside Docker, simply killing its parent `node` process might not be enough. The manager could detect the termination and immediately restart the application, re-claiming the port.

### Prevention Tips

While `EADDRINUSE` is a common issue, there are practices you can adopt to minimize its occurrence and streamline your development workflow.

1.  **Implement Graceful Shutdowns:** Teach your Node.js application to shut down cleanly when it receives termination signals. This ensures that the server properly closes connections and releases the port. Node.js applications typically receive `SIGINT` (when you press `Ctrl+C`) or `SIGTERM` (from process managers or system commands).
    ```javascript
    const http = require('http');
    const app = require('./app'); // Assuming your Express/Koa app is in app.js

    const PORT = process.env.PORT || 3000;
    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

    process.on('SIGINT', () => {
      console.log('SIGINT signal received. Closing HTTP server.');
      server.close(() => {
        console.log('HTTP server closed. Exiting process.');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received. Closing HTTP server.');
      server.close(() => {
        console.log('HTTP server closed. Exiting process.');
        process.exit(0);
      });
    });
    ```
    This code snippet demonstrates how to listen for `SIGINT` and `SIGTERM` and gracefully close the `server` before exiting the process.

2.  **Use Environment Variables for Port Configuration:** As shown in Step 5, always configure your application's port using an environment variable (e.g., `process.env.PORT`). This makes it incredibly easy to switch ports without modifying your code, which is invaluable for local development and deployment flexibility. It also allows different team members to use different local ports without conflict.

3.  **Leverage Process Managers in Development:** For applications with multiple services or those that need to run continuously, consider using process managers like PM2 even in development. PM2 provides robust features for starting, stopping, restarting, and monitoring Node.js applications, making it less likely for orphaned processes to linger. Similarly, for containerized applications, Docker Compose simplifies managing multi-service setups and ensures clean starts and stops.

4.  **Standardize Development Ports:** If you work in a team or on multiple projects, agree on specific port ranges for different types of services (e.g., all backend APIs use ports 3000-3099, frontend dev servers use 4000-4099). This reduces the likelihood of unintentional port clashes between different projects or team members.