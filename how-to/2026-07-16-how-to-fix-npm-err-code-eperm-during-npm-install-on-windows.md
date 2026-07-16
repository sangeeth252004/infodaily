---
title: "How to Fix 'npm ERR! code EPERM' During 'npm install' on Windows"
date: "2026-07-16T02:27:42.643Z"
slug: "how-to-fix-npm-err-code-eperm-during-npm-install-on-windows"
type: "how-to"
description: "Resolve the 'npm ERR! code EPERM' error on Windows during 'npm install' with this comprehensive guide. Learn the causes and step-by-step solutions to get your Node.js projects running smoothly again."
keywords: "npm install error, EPERM, Windows, Node.js, package installation, permission denied, resolve npm error, fix npm"
---

## Problem Explanation

When attempting to install Node.js packages using the `npm install` command on a Windows system, you might encounter a frustrating error message that halts the process. The most common culprit here is `npm ERR! code EPERM`, often accompanied by a message indicating "Operation not permitted" or "Permission denied." This error signifies that npm is unable to access, modify, or delete files and directories required for the installation. It can manifest in various ways, but the core issue is always a lack of necessary permissions.

This `EPERM` error can occur at different stages of the installation process, whether you're installing a new package, updating existing ones, or running `npm install` for the first time in a project. The terminal output might show a series of failed operations on specific files or folders within your `node_modules` directory, or even within the global npm cache. This interruption prevents your project from having the necessary dependencies to function correctly, leaving you unable to develop or run your application.

## Why It Happens

The `npm ERR! code EPERM` error on Windows is fundamentally a permissions issue. Node.js and npm often need to write files, create directories, or delete existing ones as part of the installation and management of packages. On Windows, file system permissions are more strictly enforced than on some other operating systems. Several factors can lead to npm lacking these required permissions:

One of the most frequent causes is that another process has locked the files or directories that npm needs to access. This could be your antivirus software performing a scan, a background indexing service, an IDE with a file watcher actively monitoring the `node_modules` folder, or even another instance of npm or Node.js that didn't shut down cleanly. When a file is locked by another process, npm cannot perform its intended operation, leading to the `EPERM` error.

Another significant reason is that the user account running the `npm install` command does not have sufficient privileges to modify the target directories. This is particularly common if you're trying to install packages globally (using the `-g` flag) in directories that are protected by the operating system, such as `Program Files`. Even for local installations within a project, sometimes directory permissions can become corrupted or misconfigured, preventing npm from writing to them.

## Step-by-Step Solution

Here's a comprehensive approach to resolving the `npm ERR! code EPERM` error on Windows:

### Step 1: Run Your Terminal as Administrator

This is often the quickest and most effective solution, especially if the error is related to global installations or protected system directories. Running your command prompt or PowerShell with administrator privileges grants npm the necessary elevated permissions to modify files and folders.

1.  **Search for your terminal:** Click the Windows Start button and type "Command Prompt" or "PowerShell".
2.  **Right-click and select "Run as administrator".**
3.  **Confirm the User Account Control (UAC) prompt** if one appears.
4.  **Navigate to your project directory** using the `cd` command (e.g., `cd C:\Users\YourUser\Projects\my-app`).
5.  **Re-run the npm command** (e.g., `npm install`).

### Step 2: Clean npm Cache

A corrupted or locked npm cache can also lead to `EPERM` errors. Clearing the cache forces npm to re-download packages, which can resolve issues with outdated or corrupted cached files.

1.  **Open your terminal** (preferably as administrator, following Step 1).
2.  **Run the following command:**
    ```bash
    npm cache clean --force
    ```
3.  **Wait for the command to complete.** It might take a moment.
4.  **After cleaning the cache, try running `npm install` again** in your project directory.

### Step 3: Delete `node_modules` and `package-lock.json`

Sometimes, the `node_modules` folder or the `package-lock.json` file can become corrupted, or specific files within them might be locked. Removing them and reinstalling can often resolve the problem.

1.  **Open your terminal** (preferably as administrator).
2.  **Navigate to your project directory.**
3.  **Delete the `node_modules` folder.** You can do this manually through File Explorer or via the command line:
    ```bash
    rmdir /s /q node_modules
    ```
    *(Note: `rmdir` is the command for deleting directories on Windows. `/s` deletes all subdirectories and files, and `/q` enables quiet mode, suppressing confirmation prompts.)*
4.  **Delete the `package-lock.json` file** (or `npm-shrinkwrap.json` if you use that). You can do this via File Explorer or the command line:
    ```bash
    del package-lock.json
    ```
5.  **Re-run the installation command:**
    ```bash
    npm install
    ```

### Step 4: Check for Antivirus Interference

Antivirus software can sometimes incorrectly flag npm processes or files as malicious, leading to them being locked or quarantined. Temporarily disabling your antivirus and then trying the `npm install` can help diagnose if this is the cause.

1.  **Locate your antivirus software** in the Windows system tray or through the Start menu.
2.  **Find the option to disable real-time protection or temporarily disable the antivirus.** The exact wording will vary by software.
3.  **Ensure your terminal is running as administrator** (Step 1).
4.  **Navigate to your project directory.**
5.  **Run `npm install`.**
6.  **If the installation is successful, re-enable your antivirus immediately.**
7.  **Consider adding an exclusion** in your antivirus settings for your project directory or the npm global installation directory to prevent future interference. Refer to your antivirus software's documentation for instructions on how to add exclusions.

### Step 5: Close All Node.js-Related Processes

An orphaned or lingering Node.js process can hold locks on files, preventing npm from operating.

1.  **Open the Task Manager:** Press `Ctrl + Shift + Esc` or right-click the taskbar and select "Task Manager".
2.  **Go to the "Processes" tab.**
3.  **Look for any processes named "node.exe" or "npm".**
4.  **If you find any, select them and click "End task".** Be cautious not to end essential system processes. If you're unsure, focus on processes directly related to your development environment.
5.  **After closing these processes, ensure your terminal is running as administrator** (Step 1).
6.  **Navigate to your project directory** and run `npm install`.

### Step 6: Update Node.js and npm

Outdated versions of Node.js or npm can sometimes have bugs that lead to permission errors. Ensuring you're using the latest stable versions can resolve these issues.

1.  **Check your current Node.js version:** Open your terminal and run `node -v`.
2.  **Check your current npm version:** Open your terminal and run `npm -v`.
3.  **Download the latest LTS (Long Term Support) version of Node.js** from the official Node.js website ([https://nodejs.org/](https://nodejs.org/)).
4.  **Run the installer** and follow the on-screen instructions. This will usually update both Node.js and npm.
5.  **After installation, open a new terminal window** (as administrator) and verify the versions again.
6.  **Navigate to your project directory** and run `npm install`.

### Step 7: Check Directory Permissions Manually

If none of the above steps work, you might need to manually inspect and adjust the permissions of the directories npm is trying to access. This is more involved and typically only necessary if other methods fail.

1.  **Identify the problematic directory:** The error message might specify which folder or file is causing the `EPERM` issue. Common culprits are the `node_modules` directory within your project or npm's global cache directory (which you can find using `npm config get cache`).
2.  **Open File Explorer** and navigate to the directory.
3.  **Right-click the directory** and select "Properties".
4.  **Go to the "Security" tab.**
5.  **Click "Edit" to change permissions.**
6.  **Select your user account** from the list.
7.  **Ensure that "Full control" is checked** under the "Allow" column. If it's not, check it.
8.  **Click "Apply" and then "OK".**
9.  **If you're modifying the `node_modules` folder, you might need to do this for each subfolder and file within it.** This can be tedious, so it's often easier to delete the `node_modules` folder entirely (Step 3) and let `npm install` recreate it with correct permissions.
10. **Repeat the `npm install` command** after adjusting permissions.

## Common Mistakes

A frequent mistake when encountering `npm ERR! code EPERM` is to repeatedly run `npm install` without addressing the underlying cause. While sometimes a transient file lock might resolve itself, consistently failing to do so indicates a deeper issue that needs a specific fix. Another common pitfall is neglecting to run the terminal as administrator, especially when dealing with global installations or system-level directories. Users might also forget to clean the npm cache or delete the `node_modules` folder, which are crucial troubleshooting steps that can resolve corrupted states. Finally, attributing the error solely to npm without considering external factors like antivirus software can lead to unnecessary frustration.

## Prevention Tips

To proactively prevent `npm ERR! code EPERM` errors, it's essential to maintain a clean and well-managed development environment. Regularly updating Node.js and npm to their latest stable versions is crucial, as these updates often include bug fixes and performance improvements that can mitigate permission-related issues. Implementing a consistent practice of closing all Node.js-related processes when you finish a development session ensures that no lingering processes are holding file locks. Additionally, configuring your antivirus software to exclude your project directories and the global npm cache directory can prevent it from interfering with npm operations.

Adopting a habit of running your development terminal as administrator, especially for global package installations or when working in directories that might have stricter permissions, can preempt many `EPERM` errors. Finally, understanding the role of `package-lock.json` and the `node_modules` folder and performing periodic clean installations (deleting `node_modules` and `package-lock.json` and running `npm install`) can help maintain a healthy project dependency state and avoid potential corruption.