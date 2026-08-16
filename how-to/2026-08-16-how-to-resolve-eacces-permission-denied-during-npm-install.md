---
title: "How to Resolve 'EACCES: permission denied' During npm install"
date: "2026-08-16T15:19:28.174Z"
slug: "how-to-resolve-eacces-permission-denied-during-npm-install"
type: "how-to"
description: "A comprehensive guide to fixing the \"EACCES: permission denied\" error during npm install, covering root causes, step-by-step solutions, and prevention tips."
keywords: "EACCES permission denied, npm install error, fix npm EACCES, npm permission denied, Node.js permissions, npm global packages, nvm, Volta, chown, sudo npm, node_modules permissions"
---

When working with Node.js projects, encountering an "EACCES: permission denied" error during `npm install` is a common and frustrating roadblock. This guide provides a detailed breakdown of why this error occurs and offers a series of actionable, step-by-step solutions to help you get your development environment back on track.

### Problem Explanation

The "EACCES: permission denied" error specifically indicates that the Node Package Manager (npm) lacks the necessary permissions to write to a particular directory or file. When this issue arises, you will typically see output similar to the following in your terminal:

```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules'
npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/youruser/.npm/_logs/some-long-log-filename.log
```

The error prevents npm from installing or updating packages, whether they are global packages (like `create-react-app` or `nodemon`) or local dependencies for a specific project. This means your project build will fail, and you won't be able to add new libraries or update existing ones, effectively halting development.

### Why It Happens

At its core, the "EACCES: permission denied" error stems from a conflict between the user executing the `npm install` command and the ownership or permissions of the target directory. npm, by default, attempts to install packages in specific locations on your system. If your current user account does not have write access to these locations, the operation fails.

Several scenarios can lead to this problem:

*   **System-wide npm installation:** Often, Node.js and npm are installed globally on your system, and the default directories (e.g., `/usr/local/lib/node_modules` or `/usr/local/bin`) are owned by the `root` user. If you try to install global packages without elevated privileges, npm cannot write to these `root`-owned directories.
*   **Incorrect `node_modules` permissions:** For local project dependencies, the `node_modules` directory within your project might have incorrect ownership or permissions, especially if the project was cloned from another user, created by a different user account, or if you previously ran `npm install` with `sudo` inside the project directory.
*   **Corrupted npm cache:** Less common, but sometimes corrupted or improperly permissioned files in the npm cache directory (`~/.npm`) can interfere with installations.
*   **Switching user accounts:** If you switch between different user accounts on your machine, or if a build process runs under a different user, permission conflicts can arise.

### Step-by-Step Solution

Solving the `EACCES` error usually involves adjusting permissions or changing npm's configuration to install packages in user-owned directories. Start with the recommended approaches and move to more manual fixes if necessary.

#### ## Step 1: Understand the Error Message

Before attempting any fixes, carefully examine the `npm ERR!` output. The most crucial part is the `path` field, which tells you exactly *which* directory npm is trying to access but cannot.

Example: `npm ERR! path /usr/local/lib/node_modules`

This path indicates that the problem is with npm's global installation directory. If the path points to `your-project-directory/node_modules`, then the issue is local to your project. Identifying this path will guide you to the most appropriate solution.

#### ## Step 2: Option A: Fix Global Permissions by Changing npm's Default Directory (Recommended First Approach)

This is the official npm recommended way to handle permissions for global packages without resorting to `sudo`. It configures npm to install global packages in a user-owned directory within your home folder.

1.  **Find your current npm prefix:**
    ```bash
    npm config get prefix
    ```
    If this returns a system-wide path like `/usr/local`, `/usr/`, or `/opt/homebrew`, you likely have a permissions issue.

2.  **Create a new directory for global npm installations in your home folder:**
    ```bash
    mkdir ~/.npm-global
    ```

3.  **Tell npm to use this new directory for global installations:**
    ```bash
    npm config set prefix '~/.npm-global'
    ```

4.  **Add this directory to your system's PATH environment variable:** This ensures your shell can find the globally installed packages (executables).
    *   Open your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`, or `~/.profile`).
    *   Add the following line to the end of the file:
        ```bash
        export PATH=~/.npm-global/bin:$PATH
        ```
    *   Save the file.

5.  **Apply the changes:**
    ```bash
    source ~/.bashrc  # Or source ~/.zshrc or ~/.profile
    ```
    You may also need to restart your terminal for the changes to take full effect.

6.  **Test by installing a global package:**
    ```bash
    npm install -g your-global-package-name
    ```
    This should now work without permission errors.

#### ## Step 3: Option B: Use a Node Version Manager (NVM, Volta, or FNM) (Recommended Long-Term Solution)

Node Version Managers are highly recommended for managing multiple Node.js versions and inherently resolve `EACCES` issues for global packages. They install Node.js and npm in your user's home directory, meaning all npm operations occur within your user's permissions.

1.  **Install a Node Version Manager:**
    *   **NVM (Node Version Manager):**
        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        ```
        Follow the on-screen instructions to set up `nvm` in your shell profile.
    *   **Volta:**
        ```bash
        curl https://get.volta.sh | bash
        ```
        Follow the on-screen instructions.
    *   **FNM (Fast Node Manager):**
        ```bash
        curl -fsSL https://fnm.vercel.app/install | bash
        ```
        Follow the on-screen instructions.

2.  **Install Node.js through the manager:**
    *   **With NVM:** `nvm install --lts` (installs the latest LTS version)
    *   **With Volta:** `volta install node` (installs the latest stable Node.js)
    *   **With FNM:** `fnm install --lts`

3.  **Confirm the active Node.js/npm versions:**
    ```bash
    node -v
    npm -v
    ```
    Your Node.js and npm installations will now be managed within your home directory, and global package installations will no longer require `sudo`.

#### ## Step 4: Manually Adjust Permissions for Specific Directories (Advanced/Troubleshooting)

If the problem persists, or if you prefer a more direct approach, you can manually fix the permissions of the problematic directories. Use this cautiously and only for the directories identified in your error message.

1.  **Identify the problematic directory:** Refer to the `path` in your error message.

2.  **Fix ownership for npm's global directories (if not using Step 2 or 3):**
    If the error points to `/usr/local/lib/node_modules` or `/usr/local/bin`, you can take ownership of these directories. Replace `$(whoami)` with your actual username if `whoami` doesn't work.
    ```bash
    sudo chown -R $(whoami) /usr/local/lib/node_modules
    sudo chown -R $(whoami) /usr/local/bin
    sudo chown -R $(whoami) /usr/local/share/man/man1 # For npm man pages
    ```
    This grants your user account full control over these directories.

3.  **Fix ownership for your local project's `node_modules` directory:**
    If the error points to `your-project-directory/node_modules`, navigate to your project root and run:
    ```bash
    sudo chown -R $(whoami) node_modules
    ```
    You might also need to remove the `node_modules` directory entirely before running `npm install` again:
    ```bash
    rm -rf node_modules
    npm install
    ```

4.  **Fix ownership for the npm cache directory:**
    ```bash
    sudo chown -R $(whoami) ~/.npm
    ```

#### ## Step 5: Clear npm Cache and Retest

Sometimes, a corrupted npm cache can lead to unexpected permission issues. Clearing the cache can resolve these.

1.  **Clear the npm cache:**
    ```bash
    npm cache clean --force
    ```

2.  **Attempt your `npm install` command again.**

#### ## Step 6: Reinstall Node.js/npm (Last Resort)

If all else fails, a clean reinstallation of Node.js and npm can often resolve deeply entrenched permission problems.

1.  **Uninstall Node.js and npm:** The method depends on how you initially installed them.
    *   **If installed via package manager (Homebrew, APT, etc.):** Use the respective uninstall command (e.g., `brew uninstall node`, `sudo apt-get remove nodejs npm`).
    *   **If installed manually:** You might need to manually remove `/usr/local/lib/node_modules`, `/usr/local/bin/node`, `/usr/local/bin/npm`, and related files. *Exercise extreme caution with manual removal to avoid damaging your system.*

2.  **Download and reinstall Node.js:** The safest way is to use a fresh installer from the official Node.js website (nodejs.org) or, even better, use a Node Version Manager as described in Step 3.

### Common Mistakes

*   **Using `sudo npm install` for local dependencies:** This is a common but harmful mistake. Running `npm install` with `sudo` inside a project directory can change the ownership of `node_modules` files to `root`, causing subsequent `npm` commands (run as your regular user) to fail with `EACCES`. Never use `sudo` for local project installs.
*   **Blindly running `chmod 777`:** While `chmod 777` grants full read, write, and execute permissions to everyone, it's a security risk and generally not the correct way to fix `EACCES`. It's better to fix ownership (`chown`) or use a version manager.
*   **Not restarting the terminal:** After modifying `~/.bashrc` or `~/.zshrc`, you must either `source` the file or restart your terminal for the changes to take effect.
*   **Ignoring the specific `path` in the error:** The `path` field is crucial. Trying to fix `/usr/local/lib/node_modules` when the error points to `~/.npm` won't solve the problem.
*   **Modifying system-managed Node.js installations:** If your Node.js was installed as part of an operating system's default packages, manually changing permissions can sometimes interfere with system updates or other applications that rely on it. Using a version manager is safer.

### Prevention Tips

Preventing the "EACCES: permission denied" error saves significant debugging time. Adopt these best practices:

*   **Always use a Node Version Manager (NVM, Volta, FNM):** This is the single most effective way to prevent `EACCES` errors for global npm packages. These tools isolate Node.js and npm installations within your user's home directory, ensuring you always have the necessary write permissions.
*   **Avoid `sudo npm install` for local projects:** For project-specific dependencies, `npm install` should always be run without `sudo`. If you encounter permissions errors in a local project, investigate the ownership of your project directory and its `node_modules` folder first, rather than escalating privileges.
*   **Configure npm's global prefix to your home directory:** If you choose not to use a version manager, follow Step 2 to configure npm to install global packages in a user-owned directory (`~/.npm-global`). This setup is robust and avoids `root` permission conflicts.
*   **Check directory ownership when cloning repositories:** If you clone a project from a different user or environment, ensure your user account owns the project directory. Use `ls -l` to check and `sudo chown -R $(whoami) .` to take ownership from within the project root if necessary.
*   **Be consistent with your user environment:** When deploying or running build processes, ensure the user executing `npm install` has appropriate permissions. This often means running CI/CD pipelines under a user account with explicit access to the project workspace.