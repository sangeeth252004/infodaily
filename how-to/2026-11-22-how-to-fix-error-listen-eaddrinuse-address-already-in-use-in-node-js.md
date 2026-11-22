---
title: "How to Fix 'Error: listen EADDRINUSE: address already in use' in Node.js"
date: "2026-11-22T00:05:59.173Z"
slug: "how-to-fix-error-listen-eaddrinuse-address-already-in-use-in-node-js"
type: "how-to"
description: "Resolve the 'EADDRINUSE' error in Node.js by identifying and stopping the process that's already using the port. Learn practical steps and prevention tips."
keywords: "Node.js, EADDRINUSE, address already in use, port conflict, error fix, development, server error, debugging, terminal, command line"
---

When developing Node.js applications, you'll inevitably encounter the dreaded `Error: listen EADDRINUSE: address already in use` message. This error signals that your Node.js server is trying to bind to a network port that is already occupied by another process. You'll typically see this in your terminal output when you attempt to start your Node.js application.

The exact message might look something like this:

```
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (net.js:1301:14)
    at resolve (net.js:978:10)
    at net.js:1065:7
    at List.next (events.js:143:20)
    at List.emit (events.js:206:7)
    at net.js:1085:9
    at process._tickCallback (internal/process/next_tick.js:63:7)
```

This error is a common roadblock, particularly during development, as it prevents your application from starting and serving requests on its intended port.

### Why It Happens

The `EADDRINUSE` error occurs because network ports, like a phone number for a specific service on a computer, can only be used by one application at a time. When your Node.js application tries to start a server on a port (e.g., port 3000), it requests exclusive access to that port. If another process is already listening on that same port, the operating system denies your application's request, resulting in the `EADDRINUSE` error.

This situation arises for several common reasons:

*   **Previous instance of your application is still running:** You might have forgotten to stop a previous instance of your Node.js application. This is especially common if you're running it in the background or in a separate terminal tab.
*   **Another application is using the same port:** A different program on your system, such as a web server (like Apache or Nginx), another development server, or even some database services, might be configured to use the same port.
*   **Stuck process after unexpected termination:** If your Node.js application crashed or was terminated abruptly (e.g., by killing the process manually without a graceful shutdown), the port might not have been properly released, leaving it in a "busy" state.

### Step-by-Step Solution

The core of fixing this error involves identifying the process that is occupying the port and then stopping that process.

## Step 1: Identify the Port Number

First, confirm the exact port number that is causing the conflict. Look at the error message. In the example `Error: listen EADDRINUSE: address already in use :::3000`, the port number is `3000`. If your application is configured to use a different port (e.g., 8080, 5000, 80), make note of that specific number.

## Step 2: Find the Process ID (PID) Using the Port

This step varies slightly depending on your operating system.

**For macOS and Linux:**

Open your terminal and use the `lsof` (list open files) command. This command can show you which processes are using a particular network port.

Replace `[PORT_NUMBER]` with the actual port number you identified in Step 1.

```bash
sudo lsof -i :[PORT_NUMBER]
```

For example, to find processes using port 3000:

```bash
sudo lsof -i :3000
```

The output will look something like this:

```
COMMAND  PID   USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
Node    1234 youruser   20u  IPv6 0xabcdef      0t0  TCP *:3000 (LISTEN)
```

The `PID` column shows the Process ID. In this example, the PID is `1234`. You might be prompted for your administrator password due to the `sudo` command.

**For Windows:**

Open Command Prompt or PowerShell as an administrator. Use the `netstat` command with the `-ano` flags.

Replace `[PORT_NUMBER]` with your port.

```cmd
netstat -ano | findstr ":[PORT_NUMBER]"
```

For example, to find processes using port 3000:

```cmd
netstat -ano | findstr ":3000"
```

The output will show connection information, including the PID. Look for a line with `LISTENING` in the `Proto` column and your port number. The last column will be the PID.

```
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING       1234
```

In this output, `1234` is the PID.

## Step 3: Terminate the Conflicting Process

Once you have the PID, you need to stop the process using that port.

**For macOS and Linux:**

Use the `kill` command with the PID you found.

```bash
kill [PID]
```

For example, if the PID was `1234`:

```bash
kill 1234
```

If the process doesn't stop, you can use the `-9` flag for a forceful kill (use this cautiously):

```bash
kill -9 [PID]
```

Example:

```bash
kill -9 1234
```

**For Windows:**

Use the `taskkill` command.

```cmd
taskkill /PID [PID] /F
```

The `/F` flag forcefully terminates the process.

Example:

```cmd
taskkill /PID 1234 /F
```

## Step 4: Verify the Port is Free

After terminating the process, it's good practice to verify that the port is no longer in use. You can re-run the command from Step 2.

**For macOS and Linux:**

```bash
sudo lsof -i :[PORT_NUMBER]
```

If the output is empty, the port is free.

**For Windows:**

```cmd
netstat -ano | findstr ":[PORT_NUMBER]"
```

If no lines are returned, the port is free.

## Step 5: Restart Your Node.js Application

Now that the port is clear, you can safely restart your Node.js application. Navigate to your project directory in the terminal and run your start command (e.g., `node index.js`, `npm start`, `yarn start`).

```bash
node your_app_file.js
```

or if using npm scripts:

```bash
npm start
```

Your application should now start without the `EADDRINUSE` error.

## Step 6: If the Problem Persists (Advanced Troubleshooting)

If you still encounter the error after following the above steps, the issue might be more complex:

*   **Check your Node.js configuration:** Ensure your Node.js application is configured to use the port you expect. Look for `app.listen(port)` or similar in your server setup code.
*   **Inspect firewall settings:** In rare cases, firewalls might interfere, though this is less likely for `EADDRINUSE`.
*   **Reboot your machine:** A simple reboot can resolve stubborn process issues and clear out any lingering zombie processes.

### Common Mistakes

One common mistake is repeatedly trying to start the Node.js application without first identifying and terminating the occupying process. This simply reiterates the same error. Another frequent oversight is failing to use `sudo` for `lsof` on Linux/macOS or running Command Prompt/PowerShell as an administrator on Windows, which can lead to `lsof` or `netstat` not showing all processes, or `kill`/`taskkill` failing to terminate them. Users also sometimes forget to check all possible ports their application might be configured to use, especially if they have multiple configuration files or environment variables.

### Prevention Tips

To prevent the `EADDRINUSE` error from recurring, adopt these practices:

*   **Always gracefully shut down your Node.js applications:** When you stop your server (e.g., using `Ctrl+C` in the terminal), ensure it has time to perform cleanup operations. If running in the background, use proper process management tools (like `pm2` or systemd services) that handle graceful shutdowns.
*   **Use a process manager:** Tools like `pm2` are invaluable for managing Node.js applications. They automatically restart crashed applications and can be configured to manage ports and prevent conflicts.
*   **Assign dynamic ports during development (optional):** For development environments, you can configure your application to use a dynamic port (e.g., `process.env.PORT || 3000`). This allows the operating system to assign an available port if the default is taken.
*   **Be mindful of your development environment:** If you're running multiple Node.js projects simultaneously, ensure they are configured to use different ports to avoid conflicts. Regularly check which ports are in use if you suspect issues.