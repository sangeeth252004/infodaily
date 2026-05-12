---
title: "How to Resolve 'EADDRINUSE: address already in use' Error When Starting a Node.js Server"
date: "2026-05-12T07:42:01.688Z"
slug: "how-to-resolve-eaddrinuse-address-already-in-use-error-when-starting-a-node-js-server"
type: "how-to"
description: "Learn to fix the 'EADDRINUSE: address already in use' error in Node.js. This comprehensive guide provides step-by-step solutions, including identifying and terminating conflicting processes, changing ports, and prevention tips."
keywords: "EADDRINUSE, address already in use, Node.js, server error, port conflict, process termination, how to fix, Node.js development, debugging, port management"
---

## Problem Explanation

When you're developing a Node.js application, especially a web server, you might encounter a frustrating error message right as you try to start your server:

```
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupDgram (node:net:1330:21)
    at Server._listen2 (node:net:1722:14)
    at listenInCluster (node:net:1787:12)
    at Server.listen (node:net:1874:7)
    at Object.<anonymous> (/path/to/your/app.js:20:5)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12) {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 3000
}
```

This specific error, `EADDRINUSE: address already in use`, signals that your Node.js application cannot start because the network port it's trying to use is already occupied by another process. You'll see your server fail to launch, usually exiting immediately after displaying this message, preventing you from testing or running your application. The port number (e.g., `3000` in the example above) is crucial information to help you identify the culprit.

## Why It Happens

This error occurs because network ports are a finite resource, and typically, only one application can "listen" on a specific port at any given time. When an application starts a server, it binds itself to a port to receive incoming connections. If another application or even a previous instance of your *own* application is still holding onto that port, your new Node.js server won't be able to claim it, leading to the `EADDRINUSE` error.

The most common reasons for this conflict include:

1.  **A previous instance of your Node.js server didn't shut down gracefully.** This often happens if you stop your server with `Ctrl+Z` (which suspends the process) instead of `Ctrl+C` (which terminates it), or if your development environment or machine crashed.
2.  **Another application is already running on the same port.** This could be a different Node.js project, a different web server (like Apache, Nginx, or a Python/Ruby server), or even a system service that happens to use the same default port (e.g., port 80 or 443).
3.  **A build tool or process manager is running a duplicate server.** Tools like `nodemon` or `pm2`, while helpful, can sometimes spin up multiple instances if misconfigured or if a previous instance wasn't fully stopped before a new one was initiated.

## Step-by-Step Solution

Let's walk through how to identify and resolve this common issue.

### 1. Understand the Error Message and Identify the Port

First, pinpoint the exact port number mentioned in the `EADDRINUSE` error message. In the example provided earlier, the error clearly states `port: 3000`. This is the port your server is trying to use and where the conflict lies. Note this number down, as you'll need it for the next steps. Common Node.js development ports include 3000, 8000, 8080, and 5000.

### 2. Check for Running Processes on the Conflicting Port

Now, you need to find out which process is currently occupying that port. The commands differ slightly depending on your operating system.

**For macOS and Linux:**

Open your terminal and use the `lsof` (list open files) command. Remember to replace `[PORT_NUMBER]` with the port you identified (e.g., `3000`).

```bash
sudo lsof -i :[PORT_NUMBER]
```

Example for port 3000:

```bash
sudo lsof -i :3000
```

You'll likely see output similar to this:

```
COMMAND   PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    12345  youruser   14u  IPv6 0xdeadbeef      0t0  TCP *:3000 (LISTEN)
```

The crucial pieces of information here are `PID` (Process ID, e.g., `12345`) and `COMMAND` (e.g., `node`). This tells you which process and what program is listening on that port.

**For Windows:**

Open your Command Prompt or PowerShell as an administrator. Use the `netstat` command to list active connections and then filter by the port.

```cmd
netstat -ano | findstr :[PORT_NUMBER]
```

Example for port 3000:

```cmd
netstat -ano | findstr :3000
```

You'll see output like this:

```
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       12345
  TCP    [::]:3000              [::]:0                 LISTENING       12345
```

The last column, `12345`, is the `PID` (Process ID). Once you have the PID, you can find the corresponding process name using `tasklist`:

```cmd
tasklist | findstr 12345
```

This will show you the executable name associated with that PID, for example: `node.exe`.

### 3. Terminate the Conflicting Process

Once you've identified the Process ID (PID) of the application holding the port, you can terminate it.

**For macOS and Linux:**

Use the `kill` command.

```bash
kill -9 [PID]
```

Example for PID 12345:

```bash
kill -9 12345
```

The `-9` flag sends a "kill -9" signal, which forcibly terminates the process. Be cautious with `kill -9` as it doesn't allow the process to shut down gracefully. In most development scenarios, this is fine for a hung Node.js process.

**For Windows:**

Use the `taskkill` command.

```cmd
taskkill /PID [PID] /F
```

Example for PID 12345:

```cmd
taskkill /PID 12345 /F
```

The `/F` flag forces the termination of the process.

### 4. Verify the Port is Free

After terminating the process, it's a good practice to re-check if the port is truly free. Run the `lsof` or `netstat` command again from Step 2. If no output is returned for that specific port, then the port is free, and you can now try starting your Node.js server.

### 5. Change the Server Port (Alternative/Fallback)

If you consistently face this issue, or if the conflicting process is something you don't want to terminate (e.g., another important development server), you can simply change the port your Node.js server uses.

Locate where your application defines its port, usually in your main server file (e.g., `app.js`, `server.js`, or `index.js`). Look for a line similar to:

```javascript
const PORT = process.env.PORT || 3000; // Original
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Change the default port to a different, available one (e.g., 3001, 4000, 8080, etc.).

```javascript
const PORT = process.env.PORT || 3001; // Changed to 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Remember to update any front-end configurations or environment variables that might also expect the server to run on a specific port.

### 6. Use a Process Manager for Development

For development, tools like `nodemon` or `pm2` can significantly help. `nodemon` watches for file changes and automatically restarts your Node.js application. `pm2` is a production-grade process manager that can manage multiple Node.js applications, keep them alive, and handle restarts.

If you are using `nodemon`, make sure you are stopping it properly with `Ctrl+C`. If it's still running in the background, you might have to kill its process manually using the steps above.

### 7. Check for System-Reserved Ports or Elevated Privileges

While rare for development ports, sometimes certain ports (like 80 or 443) are reserved for system services or require elevated privileges to use. If you're trying to use such a port, ensure your Node.js server is run with `sudo` (on macOS/Linux) or as Administrator (on Windows), or consider changing to a user-level port (1024-65535).

## Common Mistakes

When trying to fix the `EADDRINUSE` error, it's easy to make a few common mistakes:

*   **Not identifying the correct port:** Guessing the port or not carefully reading the error message can lead to spending time troubleshooting the wrong port. Always double-check the `port` number in the error.
*   **Forgetting to use `sudo` (macOS/Linux):** `lsof` and `kill` often require superuser privileges to inspect and terminate processes owned by other users or the system. If your commands return "Permission denied" or no output, try adding `sudo` before them.
*   **Only checking browser tabs:** People sometimes assume that closing a browser tab where the server was running will free up the port. The server process runs independently of the browser and must be terminated at the system level.
*   **Terminating the wrong process:** Accidentally killing an essential system process or another important application can cause instability. Always verify the `COMMAND` associated with the `PID` before running the `kill` or `taskkill` command.
*   **Assuming only one `node` process is the issue:** You might have multiple Node.js applications running, or `nodemon` might have spawned a child process. The `lsof` or `netstat` output will show *all* processes listening on that specific port.

## Prevention Tips

To minimize the chances of encountering the `EADDRINUSE` error in the future, consider these best practices:

*   **Graceful Shutdowns:** Always terminate your Node.js server processes gracefully. In your terminal, use `Ctrl+C` to send a `SIGINT` signal, allowing the application to clean up resources and release the port before exiting. Avoid `Ctrl+Z`, which merely suspends the process, leaving the port in use.
*   **Consistent Port Management:** If you work on multiple Node.js projects, establish a clear port strategy. You might use environment variables (e.g., `PORT=4000 node server.js`) or define different default ports for different projects to avoid clashes.
*   **Utilize Process Managers (Dev/Prod):**
    *   **Development:** Use `nodemon` (as mentioned in Step 6) to automatically restart your server when files change. `nodemon` handles process termination and restarting much more reliably than manual stop/start cycles.
    *   **Production:** Tools like `pm2`, `forever`, or `systemd` are designed to manage Node.js processes, ensuring they start correctly, stay running, and release ports cleanly when stopped.
*   **Use `process.on('SIGINT', ...)` for Cleanup:** In your Node.js application code, you can listen for `SIGINT` (the signal sent by `Ctrl+C`) and perform any necessary cleanup (like closing database connections or releasing resources) before the application exits. This reinforces graceful shutdowns.
*   **Check Port Availability Before Launching:** For more robust scripts or environments, you could programmatically check if a port is available before attempting to start your server. While more advanced, it can prevent the error from even being thrown.

By understanding the cause and following these steps, you can quickly resolve the `EADDRINUSE: address already in use` error and ensure your Node.js applications run smoothly.