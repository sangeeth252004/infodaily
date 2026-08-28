---
title: "How to Resolve 'EADDRINUSE: address already in use' Error in Node.js Applications"
date: "2026-08-28T09:36:20.403Z"
slug: "how-to-resolve-eaddrinuse-address-already-in-use-error-in-node-js-applications"
type: "how-to"
description: "A comprehensive guide to understanding and fixing the 'EADDRINUSE: address already in use' error in Node.js, with step-by-step instructions for Windows, macOS, and Linux."
keywords: "EADDRINUSE, Node.js, address already in use, port conflict, fix, error resolution, troubleshooting, netstat, lsof, taskkill, kill"
---

### Problem Explanation

When developing or deploying Node.js applications that involve network communication, such as web servers, you may encounter the critical error `EADDRINUSE: address already in use`. This error indicates that the application attempted to bind to a specific network address and port, but another process on your system is already actively using that exact combination. Your Node.js application will fail to start, typically displaying a stack trace that includes the error message, often pointing to the line where your server attempts to listen for incoming connections.

What you'll see in your terminal or logs is usually a message similar to this:

```
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _setupListenHandle] (node:net:1874:16)
    at Server.listen (node:net:1976:18)
    at Object.<anonymous> (/path/to/your/app.js:10:5)
    at Module._compile (node:internal/modules/cjs/loader:1256:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1310:10)
    at Module.load (node:internal/modules/cjs/loader:1119:32)
    at Module._load (node:internal/modules/cjs/loader:960:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47 {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 3000
}
```

The crucial part of this message is `EADDRINUSE: address already in use` and the `port` number (e.g., `3000` in the example above). This tells you precisely which resource is unavailable.

### Why It Happens

The `EADDRINUSE` error primarily occurs because network ports are exclusive resources. Only one process can bind to a specific IP address and port combination at any given time. If a process is listening on port 3000, no other process can listen on port 3000 until the first process releases it.

Common scenarios leading to this error include:

1.  **Previous Application Instance Not Terminated Properly:** This is the most frequent cause. If your Node.js application crashed, was terminated abruptly (e.g., `Ctrl+Z` instead of `Ctrl+C`), or failed to shut down gracefully, the operating system might not immediately release the port. The process might still be running in the background, consuming the port.
2.  **Multiple Application Instances Running:** You might have inadvertently started your Node.js application multiple times, perhaps in different terminal windows or tabs, or a process manager launched it again while an old instance was still active.
3.  **Another Application Using the Same Port:** An entirely different application or service on your system (e.g., a development server for another language, a database tool, or even a built-in system service) might be configured to use the same port number that your Node.js application is attempting to use.
4.  **Rapid Restarts:** When you stop and immediately try to restart an application, there can be a brief window where the operating system has not yet fully released the port, even if the process has technically terminated. This is less common but can occur.

The operating system manages these ports to prevent conflicts and ensure reliable network communication. When Node.js tries to bind to an in-use port, the OS rejects the request, resulting in the `EADDRINUSE` error.

### Step-by-Step Solution

To resolve the `EADDRINUSE` error, you need to identify the process currently holding the desired port and then terminate it.

#### ## Step 1: Identify the Occupied Port

Look at the error message displayed in your terminal or application logs. Specifically, locate the `port` field within the error object. In the example provided in the "Problem Explanation" section, the port is `3000`. Make a note of this port number, as you will need it for the next steps. This is the port your Node.js application is trying to use and that is currently occupied.

#### ## Step 2: List Processes Using the Port

Now, you need to find out which process is listening on that specific port. The commands differ based on your operating system.

**For Linux/macOS:**
Open your terminal and use the `lsof` (list open files) command or `netstat`. `lsof` is generally more direct for this purpose. Replace `PORT_NUMBER` with the actual port you identified in Step 1.

Using `lsof`:
```bash
lsof -i :PORT_NUMBER
```
Example for port 3000:
```bash
lsof -i :3000
```

Using `netstat` (often requires `sudo` on Linux for full process info):
```bash
netstat -tulpn | grep PORT_NUMBER
```
Example for port 3000:
```bash
sudo netstat -tulpn | grep 3000
```

**For Windows:**
Open Command Prompt or PowerShell as Administrator. Use the `netstat` command to list all active connections and listening ports, then filter the output using `findstr`.

```cmd
netstat -ano | findstr :PORT_NUMBER
```
Example for port 3000:
```cmd
netstat -ano | findstr :3000
```

#### ## Step 3: Identify the Process ID (PID)

After running the command in Step 2, you'll get output showing details about the process(es) using the port.

**For Linux/macOS (`lsof` output example):**
```
COMMAND     PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node      12345   user    5u  IPv6 0x...      0t0  TCP *:3000 (LISTEN)
```
The `PID` column (e.g., `12345`) is what you need.

**For Linux (`netstat -tulpn` output example):**
```
tcp        0      0 0.0.0.0:3000        0.0.0.0:*           LISTEN      12345/node
```
The last column shows `PID/Process_Name` (e.g., `12345/node`).

**For Windows (`netstat -ano` output example):**
```
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       12345
```
The last column (e.g., `12345`) is the PID.

Make a note of this Process ID (PID). This is the identifier for the process you need to terminate.

#### ## Step 4: Terminate the Process

Once you have the PID, you can terminate the offending process. Be careful to ensure you're killing the correct process, especially if multiple processes are listed or if you're working on a shared system.

**For Linux/macOS:**
Use the `kill` command. The `-9` flag sends a `SIGKILL` signal, which forcefully terminates the process and prevents it from performing any cleanup. While `kill PID` (which sends `SIGTERM`) is usually preferred for graceful shutdowns, `-9` is often necessary to immediately free up a port when a process is unresponsive.

```bash
kill -9 PID
```
Example for PID 12345:
```bash
kill -9 12345
```

**For Windows:**
Use the `taskkill` command. The `/F` flag forcefully terminates the process, and `/PID` specifies the Process ID.

```cmd
taskkill /PID PID /F
```
Example for PID 12345:
```cmd
taskkill /PID 12345 /F
```
You should see a message confirming the process was terminated, like "SUCCESS: The process with PID 12345 has been terminated."

#### ## Step 5: Verify Port Availability (Optional but Recommended)

After terminating the process, it's a good practice to verify that the port is indeed free before attempting to restart your Node.js application. Rerun the command from Step 2:

**Linux/macOS:**
```bash
lsof -i :PORT_NUMBER
# Or: sudo netstat -tulpn | grep PORT_NUMBER
```
**Windows:**
```cmd
netstat -ano | findstr :PORT_NUMBER
```

If the port is free, these commands should return no output. If you still see a process, you might have killed the wrong one or another process immediately re-bound to the port (less common). Repeat Steps 3 and 4 if necessary.

#### ## Step 6: Restart Your Node.js Application

With the port confirmed free, you can now safely restart your Node.js application. Navigate to your application's directory in the terminal and execute your start command (e.g., `npm start`, `node app.js`, `yarn dev`). Your application should now be able to bind to the port without the `EADDRINUSE` error.

```bash
# Example:
cd /path/to/your/nodejs/app
npm start
```

#### ## Step 7: Check for Application Configuration Conflicts

If the problem persists after following these steps, or if you consistently find another *intended* application occupying your desired port, review your application's configuration. Ensure that your Node.js application is configured to use a unique port that doesn't conflict with other services running on your machine.
For example, if you have multiple Node.js projects, each should use a different port (e.g., 3000, 3001, 4000). You might define this in a `.env` file or directly in your application code.

```javascript
// Example in Node.js app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use environment variable if available, otherwise default to 3000

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
```

### Common Mistakes

When troubleshooting the `EADDRINUSE` error, users often make a few common mistakes:

*   **Ignoring the Port Number:** The error message explicitly states the port being used. Some users neglect to extract this crucial piece of information and instead try to kill random Node.js processes or restart their machine without targeting the specific conflict. Always identify the exact port number first.
*   **Using Incorrect OS Commands:** Attempting to use `lsof` or `kill` on a Windows machine, or `taskkill` on Linux/macOS, will not work. It's essential to use the correct commands for your operating system as outlined in Step 2 and 4.
*   **Terminating the Wrong Process:** Especially if you have many processes running, it's possible to misidentify the PID and terminate an unrelated, critical process. Always double-check that the `COMMAND` (on Linux/macOS) or process details align with what you expect (e.g., `node` process if it's your Node.js app). If unsure, using tools like `ps aux | grep node` (Linux/macOS) or Task Manager (Windows) to identify the specific Node.js process might help before using `kill` or `taskkill`.
*   **Restarting Too Quickly:** While rare, if you terminate a process and immediately try to start your Node.js app, the OS might not have fully released the port yet. Giving it a second or two before restarting can sometimes resolve transient issues.
*   **Assuming a Clean Exit:** Many developers assume `Ctrl+C` always cleanly terminates their application and releases resources. While usually true, certain application states or signal handling issues can prevent a graceful shutdown, leaving the port in use. Always verify with `lsof` or `netstat`.

### Prevention Tips

Preventing the `EADDRINUSE` error primarily involves ensuring graceful shutdowns and effective port management.

*   **Implement Graceful Shutdowns:** Ensure your Node.js application handles termination signals (`SIGINT`, `SIGTERM`) properly. When these signals are received (e.g., via `Ctrl+C`), your application should close database connections, stop listening on ports, and perform any necessary cleanup before exiting. This typically involves wrapping your server `listen` call and attaching handlers:

    ```javascript
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed. Exiting process.');
        process.exit(0);
      });
    });

    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed. Exiting process.');
        process.exit(0);
      });
    });
    ```
*   **Utilize Process Managers:** For production environments and even complex development setups, use a process manager like PM2, `systemd` (Linux), or Docker. These tools are designed to manage application lifecycle, including graceful shutdowns, restarts, and ensuring only one instance of an application is running. They significantly reduce the chance of orphaned processes holding ports.
*   **Dynamic Port Assignment / Environment Variables:** Avoid hardcoding port numbers directly into your application code, especially if deploying multiple services on the same host. Instead, use environment variables (e.g., `process.env.PORT`) to define the port, allowing you to easily configure different ports for different instances or environments without changing code. If `process.env.PORT` is not set, provide a sensible default.
*   **Review `package.json` Scripts:** If you use scripts like `npm start` or `npm dev`, ensure they don't inadvertently launch multiple instances of your application or fail to terminate previous ones before starting a new one. Some development tools (like `nodemon`) already handle restarts gracefully, but it's worth understanding their configuration.