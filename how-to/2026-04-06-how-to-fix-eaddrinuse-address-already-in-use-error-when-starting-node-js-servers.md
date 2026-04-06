---
title: "How to Fix 'EADDRINUSE: address already in use' Error When Starting Node.js Servers"
date: "2026-04-06T10:55:40.616Z"
slug: "how-to-fix-eaddrinuse-address-already-in-use-error-when-starting-node-js-servers"
type: "how-to"
description: "Encountering 'EADDRINUSE: address already in use' when starting your Node.js server? Learn the exact steps to identify, terminate, and prevent this common port conflict error with this comprehensive guide."
keywords: "Node.js EADDRINUSE fix, address already in use error Node.js, Node.js port in use, how to kill Node.js process, fix Node.js server startup, EADDRINUSE solution, Node.js development error, port conflict Node.js"
---

### Problem Explanation

You've just hit `node server.js` (or `npm start`), hoping to see your Node.js application spring to life, only to be greeted by a cryptic error message in your terminal. The culprit? An "EADDRINUSE: address already in use" error. This specific error indicates that the network address and port your Node.js server is trying to bind to are currently occupied by another process.

When this problem occurs, your Node.js application will fail to start. Instead of seeing messages like "Server listening on port XXXX," you'll typically see a stack trace ending with something like this:

```
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _setupListenHandle] (node:net:1483:16)
    at Server.listen (node:net:1581:18)
    at Function.listen (/path/to/your/app/node_modules/express/lib/application.js:618:24)
    at Object.<anonymous> (/path/to/your/app/server.js:10:5)
    at Module._compile (node:internal/modules/cjs/loader:1275:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1329:10)
    at Module.load (node:internal/modules/cjs/loader:1133:32)
    at Module._load (node:internal/modules/cjs/loader:972:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:83:12)
    at node:internal/main/run_main_module:23:47 {
  code: 'EADDRINUSE',
  errno: -98,
  syscall: 'listen',
  address: '::',
  port: 3000
}
```

The key part of this message is `EADDRINUSE: address already in use :::3000`. The `3000` here (or whatever number appears) tells you exactly which port is causing the conflict. Your server cannot occupy that port because something else is already using it.

### Why It Happens

At its core, the internet protocol (IP) suite ensures that only one process can "listen" on a specific port at a given IP address at any one time. Think of a port as a unique doorway into your computer for network communications. If one application is already using a particular doorway, another application cannot use the same doorway simultaneously.

This error most commonly occurs for a few reasons:

1.  **A previous instance of your Node.js application didn't shut down gracefully.** This is probably the most frequent cause. Perhaps your application crashed, or you closed your terminal window without properly stopping the server (e.g., using `Ctrl+C`). The operating system might still be holding onto that process, even if it's in a zombie or background state, effectively keeping the port occupied.
2.  **Another application is already running and using the same port.** This could be a different Node.js project, a web server like Apache or Nginx, a Docker container, or even a system service that happens to use the same default port (e.g., port 80 for HTTP, 443 for HTTPS, 3000, 5000, 8080 for development servers).
3.  **Rapid restarts.** Sometimes, if you stop and immediately try to restart your server, the operating system might take a moment to fully release the port. This is less common but can happen.

Understanding that a port is a unique resource is key to troubleshooting this issue. Your goal is to identify *which* process is holding onto that resource and then either terminate it or configure your application to use a different port.

### Step-by-Step Solution

Let's walk through how to systematically diagnose and resolve the "EADDRINUSE" error.

#### ## Step 1: Identify the Conflicting Port

The first thing to do is pinpoint the exact port number causing the conflict. Look for the `port:` field or the number at the end of `address already in use` in your error message. In the example above, it's `3000`. This number is crucial for the next steps.

#### ## Step 2: Check for Running Processes Using the Port

Now that you know the port, you need to find out which process is using it. The commands vary slightly depending on your operating system.

**For macOS and Linux:**

Open your terminal and use the `lsof` (list open files) command combined with `grep`:

```bash
sudo lsof -i :YOUR_PORT_NUMBER
```

Replace `YOUR_PORT_NUMBER` with the actual port number (e.g., `3000`).
Example: `sudo lsof -i :3000`

You might be prompted for your password. This command will list all processes using that port. Look for lines that indicate `LISTEN` in the `NODE` column. Pay close attention to the `PID` (Process ID) column and the `COMMAND` column. You'll likely see a `node` command.

**For Windows:**

Open your Command Prompt (cmd) or PowerShell as an administrator. Use the `netstat` command:

```cmd
netstat -ano | findstr :YOUR_PORT_NUMBER
```

Replace `YOUR_PORT_NUMBER` (e.g., `3000`).
Example: `netstat -ano | findstr :3000`

This command lists all active TCP connections and listening ports, showing the Process ID (PID) in the last column. Look for entries where the "Local Address" ends with `:YOUR_PORT_NUMBER` and the "State" is `LISTENING`.

#### ## Step 3: Terminate the Conflicting Process

Once you've identified the PID (Process ID) of the process using the port, you can terminate it.

**For macOS and Linux:**

Use the `kill` command with the PID:

```bash
kill YOUR_PID
```

Replace `YOUR_PID` with the actual process ID you found in the previous step.
Example: `kill 12345`

If the process doesn't terminate (which can happen if it's stubborn or unresponsive), you might need to force kill it using the `-9` flag (SIGKILL), but use this with caution as it doesn't allow the process to clean up gracefully:

```bash
kill -9 YOUR_PID
```

**For Windows:**

Use the `taskkill` command with the PID:

```cmd
taskkill /PID YOUR_PID /F
```

Replace `YOUR_PID` with the actual process ID. The `/F` flag forces termination.
Example: `taskkill /PID 54321 /F`

After running the appropriate kill command, wait a few seconds for the operating system to fully release the port.

#### ## Step 4: Verify Port Availability and Restart Your Server

After terminating the conflicting process, it's a good idea to re-run the `lsof` or `netstat` command from Step 2 to confirm that the port is now free. If no output is returned for that port, it's available.

Now, try starting your Node.js server again:

```bash
node server.js
# or
npm start
```

Your server should now start successfully.

#### ## Step 5: Consider Changing Your Application's Port

If you frequently encounter this issue, or if the conflicting process is something you *need* to keep running (like another development server, a Docker container, or a system service), a simpler solution might be to change the port your Node.js application uses.

Most Node.js applications use an environment variable (often `PORT`) to define the port, or they'll have it hardcoded.

**Using an Environment Variable (Recommended):**

If your application uses `process.env.PORT` (e.g., `const port = process.env.PORT || 3000;`), you can specify a different port when you start it:

**For macOS and Linux:**

```bash
PORT=4000 node server.js
# or
PORT=4000 npm start
```

**For Windows (Command Prompt):**

```cmd
set PORT=4000 && node server.js
# or
set PORT=4000 && npm start
```

**For Windows (PowerShell):**

```powershell
$env:PORT=4000; node server.js
# or
$env:PORT=4000; npm start
```

**Changing Hardcoded Port:**

If your application's port is hardcoded (e.g., `app.listen(3000, ...) `), you'll need to edit your `server.js` (or equivalent) file to change `3000` to an available port like `4000`, `5000`, or `8080`. Remember to choose a port not commonly used by other services.

#### ## Step 6: Investigate Other Applications or Services

Sometimes the conflict isn't with another Node.js instance. If you've followed Steps 1-4 and still can't find a `node` process or successfully kill the PID, the culprit might be another type of application. Common examples include:

*   **Apache/Nginx:** These web servers often use ports 80 and 443. If your Node.js app is trying to use one of these (e.g., in a production environment), it will conflict.
*   **Database servers:** Some database systems might bind to specific ports, though usually not in the common Node.js development range (3000, 5000).
*   **Docker Containers:** If you use Docker, a container might be exposing a port that conflicts with your host machine's port.

Use the `lsof` or `netstat` commands to check the `COMMAND` or "Image Name" column to identify non-Node processes. If it's a critical system service, changing your Node.js application's port (Step 5) is the best solution.

#### ## Step 7: Check for Docker Container Conflicts (Advanced)

If you're developing with Docker, the "EADDRINUSE" error can occur if a Docker container is already running and exposing a port that your host machine's Node.js application also wants to use.

1.  **List running containers:**
    ```bash
    docker ps
    ```
    Look for containers that are mapping the conflicting port. For example, `0.0.0.0:3000->3000/tcp`.

2.  **Stop the conflicting container (if desired):**
    ```bash
    docker stop CONTAINER_ID_OR_NAME
    ```
    Alternatively, you can modify your Docker Compose file or `docker run` command to map a different host port (e.g., `-p 4000:3000` to map host port 4000 to container port 3000).

### Common Mistakes

When trying to resolve an "EADDRINUSE" error, several common mistakes can lead to frustration or simply not solving the problem:

*   **Not checking the *exact* port in the error message:** Users sometimes assume it's always port 3000 or 8080. Always confirm the specific port listed in the error.
*   **Immediately restarting without killing the old process:** Simply trying to run `node server.js` again won't work if the old process is still holding the port. You *must* identify and terminate it first.
*   **Confusing PIDs between different attempts:** If you run `lsof` or `netstat` multiple times, the PID might change if a new process briefly takes the port. Always use the PID found in the *most recent* output.
*   **Using `kill -9` (SIGKILL) unnecessarily:** While `kill -9` is effective for stubborn processes, it's best to try `kill` first. `kill` (SIGTERM) allows the process to perform cleanup tasks before exiting, which is generally better practice.
*   **Ignoring other applications:** Assuming it's always a Node.js process is a mistake. As discussed, other web servers, databases, or even temporary system processes can occupy ports.

### Prevention Tips

A little foresight and good practice can significantly reduce the frequency of "EADDRINUSE" errors.

*   **Implement Graceful Shutdowns:** For production applications, ensure your Node.js server handles shutdown signals (like `SIGINT` from `Ctrl+C` or `SIGTERM` from process managers) gracefully. This means closing database connections, flushing logs, and explicitly calling `server.close()` before exiting. An example:
    ```javascript
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed.');
        process.exit(0);
      });
    });
    ```
*   **Use Process Managers:** Tools like PM2 or `forever` are designed to manage Node.js processes, ensuring they start, stop, and restart correctly. They often handle graceful shutdowns and can prevent zombie processes from occupying ports.
*   **Consistent Port Management:** For development, be mindful of the ports your projects use. If you have multiple Node.js apps, assign them distinct default ports (e.g., 3000, 3001, 3002) to avoid conflicts.
*   **Leverage Environment Variables for Ports:** Always configure your application to use an environment variable (like `process.env.PORT`) for its port number, with a sensible default. This makes it easy to change the port without modifying code, especially in different deployment environments or for quick local testing.
*   **Develop Good Habits:** When you're done working on a Node.js server, make it a habit to properly stop it by pressing `Ctrl+C` in the terminal where it's running, rather than just closing the terminal window.