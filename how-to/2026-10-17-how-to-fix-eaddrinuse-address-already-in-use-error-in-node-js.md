---
title: "How to Fix 'EADDRINUSE: address already in use' Error in Node.js"
date: "2026-10-17T13:27:51.295Z"
slug: "how-to-fix-eaddrinuse-address-already-in-use-error-in-node-js"
type: "how-to"
description: "Learn how to resolve the common 'EADDRINUSE: address already in use' error in Node.js applications. This comprehensive guide explains the cause, provides step-by-step solutions, and offers prevention tips."
keywords: "Node.js, EADDRINUSE, address already in use, server error, port conflict, debugging Node.js, fix Node.js error, process management"
---

## Problem Explanation

When developing or running Node.js applications, particularly those that involve network communication like web servers or APIs, you may encounter the frustrating `EADDRINUSE: address already in use` error. This error message typically appears in your console output, often accompanied by the specific port number that is causing the conflict. For instance, you might see:

```
Error: listen EADDRINUSE: address already in use 0.0.0.0:3000
    at Server.setupListenHandle [as listen] (node:net:1309:16)
    at listen (node:net:1397:10)
    at Server.listen (node:net:1475:10)
    at Object.<anonymous> (/path/to/your/app.js:XX:XX)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at node:internal/main/run_main_module:17:47
```

This error signifies that your Node.js application is attempting to bind to a network address (usually a specific IP address and port combination) that is already occupied by another process on your system. Consequently, your application cannot start or listen for incoming connections on the intended port.

## Why It Happens

The `EADDRINUSE` error fundamentally occurs due to a port conflict. Every network service that listens for incoming connections on a computer must be assigned a unique port number. When you start a Node.js application that defines a specific port (e.g., `app.listen(3000)`), it attempts to claim that port. If another program, including a previous instance of your own Node.js application that didn't shut down cleanly, is already using that same port, the operating system will refuse your application's request to bind to it, resulting in the `EADDRINUSE` error.

Common culprits include:

*   **Stale Server Processes:** A previous run of your Node.js application might have crashed or been terminated abruptly without properly closing the network socket. This leaves the port in a "listening" state, even though no active process is using it.
*   **Other Applications:** You might have another application running on your system that is configured to use the same port. This could be a different web server, a development tool, a database, or any other network-aware service.
*   **Multiple Development Instances:** Running multiple instances of your Node.js application simultaneously during development, especially if they are all configured to use the same port, will inevitably lead to this conflict.

## Step-by-Step Solution

The primary goal is to identify the process occupying the port and then terminate it or reconfigure your application.

### ## Step 1: Identify the Port Number

First, carefully examine the error message. It will explicitly state the port number that is already in use. In the example above, it's `3000`. Note this number down, as it's crucial for the next steps. If your application uses dynamic port assignment (e.g., `process.env.PORT`), you might need to check your environment configuration or the actual port the application tried to bind to before failing.

### ## Step 2: Check for Running Processes Using the Port

The most common cause is a lingering process. We need to find out which process is holding onto the port. The command varies slightly depending on your operating system.

**On macOS and Linux:**

Open your terminal and run the following command, replacing `[PORT_NUMBER]` with the port you identified in Step 1:

```bash
sudo lsof -i :[PORT_NUMBER]
```

For example, if the port is `3000`:

```bash
sudo lsof -i :3000
```

This command will list processes that are using the specified port. Look for the `PID` (Process ID) column.

**On Windows:**

Open your Command Prompt or PowerShell **as an administrator**. Run the following command, replacing `[PORT_NUMBER]`:

```bash
netstat -ano | findstr :[PORT_NUMBER]
```

For example:

```bash
netstat -ano | findstr :3000
```

This will show you lines containing `:3000`. The last number on each line is the `PID`. You can then use the `tasklist` command to see what process corresponds to that PID:

```bash
tasklist | findstr "[PID]"
```

For example, if the PID is `1234`:

```bash
tasklist | findstr "1234"
```

### ## Step 3: Terminate the Conflicting Process

Once you have identified the `PID` of the process using the port, you can terminate it.

**On macOS and Linux:**

Use the `kill` command with the `PID` you found. It's generally recommended to try a graceful termination first with `SIGTERM` (the default signal for `kill`), and if that doesn't work, use `SIGKILL` (`-9`) for a forceful termination.

```bash
kill [PID]
```

If the process doesn't stop:

```bash
kill -9 [PID]
```

**On Windows:**

Use the `taskkill` command.

```bash
taskkill /PID [PID] /F
```

The `/F` flag forces the termination of the process.

### ## Step 4: Verify the Port is Free

After terminating the process, it's good practice to re-run the command from Step 2 to ensure that the port is no longer in use. If the output is empty, the port is free.

**On macOS and Linux:**

```bash
sudo lsof -i :[PORT_NUMBER]
```

**On Windows:**

```bash
netstat -ano | findstr :[PORT_NUMBER]
```

### ## Step 5: Restart Your Node.js Application

With the conflicting process removed, you can now safely restart your Node.js application. Navigate to your project directory in the terminal and run your application's start command (e.g., `node app.js`, `npm start`, `yarn start`).

### ## Step 6: (Optional) Change Your Application's Port

If you frequently encounter this issue, or if you have a strong reason to believe the port is often occupied by essential system services, you can configure your Node.js application to use a different port.

If you hardcode the port:

```javascript
// Before
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// After (e.g., using port 3001)
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

It's generally better to use environment variables for port configuration, especially in production or containerized environments:

```javascript
// Using environment variable, with a fallback
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

You can then set the `PORT` environment variable when running your application:

```bash
PORT=3001 node app.js
```

### ## Step 7: (Advanced) Graceful Shutdown Handling

For more robust applications, implement graceful shutdown mechanisms. This ensures that when your application receives termination signals (like `SIGINT` from `Ctrl+C` or `SIGTERM` from a process manager), it properly closes its server and exits, releasing the port.

```javascript
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});
```

## Common Mistakes

A frequent mistake is to repeatedly try restarting the Node.js application without first identifying and terminating the process that is already using the port. This often leads to a loop of `EADDRINUSE` errors. Another common oversight is forgetting to run terminal commands with administrator privileges (on Windows) or `sudo` (on macOS/Linux) when trying to inspect or kill processes, which can lead to permission denied errors. Users might also mistakenly believe the port is permanently unavailable, when in reality, it's just a temporary conflict with a rogue process.

## Prevention Tips

To prevent `EADDRINUSE` errors, adopt a disciplined approach to managing your development environment and application lifecycle. Always ensure your Node.js applications shut down cleanly. This can be achieved by using `Ctrl+C` in the terminal where the app is running, or by implementing graceful shutdown handlers as shown in Step 7, especially when deploying to production environments or using process managers like PM2 or Nodemon. Be mindful of the ports you are using; avoid hardcoding ports that are commonly used by system services (e.g., 80, 443) and prefer using environment variables for port configuration. Keep your development environment organized by closing applications and processes you are no longer actively using. Regularly check for and kill any orphaned Node.js processes before starting new ones, especially after development sessions that might have been interrupted.