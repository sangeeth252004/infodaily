---
title: "How to Fix 'npm install' Fails with EACCES Error on macOS/Linux"
date: "2026-11-16T04:48:17.001Z"
slug: "how-to-fix-npm-install-fails-with-eacces-error-on-macos-linux"
type: "how-to"
description: "Learn to fix the 'npm install' EACCES permission denied error on macOS/Linux with step-by-step solutions, including NVM, changing global directories, and prevention tips."
keywords: "npm install EACCES, permission denied, macOS, Linux, npm fix permissions, Node.js, NVM, rootless npm, npm error, access denied"
---

### Problem Explanation

When working with Node.js and its package manager `npm` on macOS or Linux, you may frequently encounter an `EACCES` error during `npm install` operations, especially when trying to install global packages (`npm install -g <package-name>`). This error signifies "Permission Denied," indicating that `npm` does not have the necessary write permissions to the directory where it's attempting to install packages or create files.

The typical error message you'll see in your terminal will look something like this:

```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules/<package-name>
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules/<package-name>'
npm ERR! { [Error: EACCES: permission denied, access '/usr/local/lib/node_modules/<package-name>']
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'access',
npm ERR!   path: '/usr/local/lib/node_modules/<package-name>' }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file.
npm ERR!
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its parent directories.
npm ERR! Or try running the command again as root/Administrator (though this is not recommended).
```

This error halts the installation process and prevents you from adding new global packages or updating existing ones, impacting your development workflow.

### Why It Happens

The `EACCES` error almost invariably points to a file system permissions issue. It occurs when `npm` tries to write files or create directories in a location where your current user account does not have the necessary write privileges. On macOS and Linux, global `npm` packages are often installed into system-wide directories like `/usr/local/lib/node_modules` and their executables linked into `/usr/local/bin`. These directories are typically owned by the `root` user and are writable only by `root` or users with `sudo` privileges.

This situation commonly arises when:
1.  **Node.js/npm was installed using a system-wide package manager (e.g., Homebrew, apt, yum)**: These installers often place Node.js and `npm` files in root-owned directories.
2.  **You previously used `sudo npm install -g`**: Running `npm` with `sudo` changes the ownership of the installed packages and potentially other `npm` configuration files to `root`. Subsequent `npm` commands run as your normal user will then lack the permissions to modify these root-owned files.
3.  **Permissions were inadvertently altered**: In rare cases, other system operations or misconfigurations could change the ownership or write permissions of the relevant `npm` directories.

The core issue is that `npm` (running as your standard user) needs to modify files or directories owned by `root`, leading to the `EACCES` error.

### Step-by-Step Solution

Solving the `EACCES` error primarily involves configuring `npm` to install global packages into a directory that your user account owns and has full write permissions to. The recommended approach is using a Node Version Manager, followed by an alternative configuration method if a version manager is not desired.

## Step 1: (Recommended) Install and Use a Node Version Manager (NVM)

The most robust and highly recommended solution is to use a Node Version Manager (NVM) like `nvm` (Node Version Manager for macOS/Linux) or `n` (for macOS/Linux). NVM allows you to install multiple versions of Node.js and `npm` side-by-side, entirely within your user's home directory. This completely bypasses the system-wide permissions issues because everything is installed in a user-owned space.

1.  **Uninstall existing Node.js/npm (Optional but Recommended for a clean slate):**
    If you installed Node.js via Homebrew, apt, or yum, it's best to remove it first.
    *   **macOS (Homebrew):**
        ```bash
        brew uninstall node
        brew doctor # To clean up any lingering files
        sudo rm -rf /usr/local/lib/node_modules
        ```
    *   **Debian/Ubuntu:**
        ```bash
        sudo apt purge nodejs npm
        sudo rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/node
        ```
    *   **CentOS/RHEL:**
        ```bash
        sudo yum remove nodejs npm
        sudo rm -rf /usr/local/lib/node_modules /usr/local/bin/npm /usr/local/bin/node
        ```
    *   Also, remove any `~/.npm` or `~/.nvm` directories if they exist from previous attempts:
        ```bash
        rm -rf ~/.npm ~/.nvm
        ```

2.  **Install NVM:**
    Open your terminal and run the official NVM install script.
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
    (Note: The version number `v0.39.7` might be outdated. Check the official NVM GitHub page for the latest version if this command fails.)

3.  **Restart your terminal or source your profile:**
    After installation, NVM needs to be loaded into your shell. Close and reopen your terminal, or run:
    ```bash
    source ~/.bashrc # If you use Bash
    source ~/.zshrc  # If you use Zsh
    source ~/.profile # Common fallback
    ```
    Verify NVM is installed:
    ```bash
    nvm --version
    ```

4.  **Install Node.js using NVM:**
    Install the latest stable version of Node.js:
    ```bash
    nvm install node
    ```
    To install a specific version:
    ```bash
    nvm install 18 # Installs latest 18.x.x
    nvm install 20.10.0 # Installs exact version
    ```

5.  **Set a default Node.js version:**
    ```bash
    nvm alias default node # Sets the latest installed version as default
    nvm use node # Switches to the specified version for the current session
    ```

Now, `npm` commands, including global installations, will automatically use the `npm` associated with your NVM-managed Node.js version and install packages into your user's home directory (`~/.nvm/versions/node/<version>/lib/node_modules`), resolving the `EACCES` error.

## Step 2: (Alternative) Change npm's Default Global Directory

If you prefer not to use a version manager, you can configure `npm` to install global packages into a directory owned by your user account.

1.  **Find your home directory:**
    ```bash
    echo $HOME
    ```
    This will typically output `/Users/<your-username>` on macOS or `/home/<your-username>` on Linux.

2.  **Create a directory for global npm packages in your home directory:**
    ```bash
    mkdir ~/.npm-global
    ```

3.  **Tell npm to use this new directory:**
    ```bash
    npm config set prefix '~/.npm-global'
    ```

4.  **Add this directory to your system's PATH environment variable:**
    This allows your shell to find the executables of globally installed packages.
    *   Open your shell's configuration file (e.g., `~/.bashrc`, `~/.zshrc`, or `~/.profile`) with a text editor (e.g., `nano`, `vim`, or VS Code).
        ```bash
        nano ~/.bashrc
        ```
    *   Add the following line to the end of the file:
        ```bash
        export PATH="$HOME/.npm-global/bin:$PATH"
        ```
    *   Save and close the file.

5.  **Apply the changes:**
    Close and reopen your terminal, or run:
    ```bash
    source ~/.bashrc # Or your respective shell configuration file
    ```

Now, `npm install -g` commands will install packages into `~/.npm-global/lib/node_modules`, and their executables will be available from `~/.npm-global/bin`, both of which are user-owned.

## Step 3: (Last Resort/Temporary) Fix Existing Global Directory Permissions

This method directly changes the ownership of the system-wide `npm` installation directories. While it can resolve the `EACCES` error, it is **generally not recommended** as a long-term solution because it involves using `sudo` and modifying system-owned directories. It's best used as a temporary fix or when NVM or changing the prefix is not an option.

1.  **Identify npm's global installation path:**
    ```bash
    npm config get prefix
    ```
    This will usually output `/usr/local` on macOS/Linux if you haven't changed it. The actual `node_modules` directory will then be `/usr/local/lib/node_modules`.

2.  **Change the ownership of the global npm directory:**
    Replace `/usr/local` with the path identified in the previous step if it's different. Replace `<your-username>` with your actual username.
    ```bash
    sudo chown -R $(whoami) $(npm config get prefix)/lib/node_modules
    sudo chown -R $(whoami) $(npm config get prefix)/bin
    ```
    You might also need to change ownership of the `.npm` directory in your home folder if it contains root-owned files:
    ```bash
    sudo chown -R $(whoami) ~/.npm
    ```
    **Warning:** Using `sudo chown -R` on system directories should be done with extreme caution. Incorrect usage can lead to broader system permission issues.

## Step 4: Verify the Fix

After applying one of the solutions, test your `npm` installation by installing a common global package.

```bash
npm install -g @vue/cli # Or any other global package
```
If the installation completes without an `EACCES` error, your issue is resolved. You can also try installing a local package within a project to confirm:
```bash
mkdir my-test-project
cd my-test-project
npm init -y
npm install lodash # Install a local dependency
```

## Step 5: Reinstall Affected Packages

If you had previous `npm install -g` commands fail due to `EACCES`, you might need to reinstall those packages after applying the fix.

For global packages:
```bash
npm uninstall -g <package-name>
npm install -g <package-name>
```
For local project dependencies, navigate to your project directory and run:
```bash
rm -rf node_modules package-lock.json # Clean up existing modules and lock file
npm install
```

### Common Mistakes

1.  **Using `sudo npm install -g <package-name>`:** This is the most common mistake that *causes* the `EACCES` error in the first place. While it appears to "fix" the problem by granting root permissions, it changes the ownership of installed packages to `root`. Subsequent `npm` commands run as your normal user will then lack the necessary permissions, perpetuating the cycle of needing `sudo` and creating security vulnerabilities.
2.  **Incorrectly Changing Permissions with `chmod 777`:** Using `chmod 777` (making files/directories globally writable) is a security risk and an incorrect way to address `EACCES`. It grants universal write access, which is highly insecure and unnecessary for `npm` to function correctly. Ownership (`chown`) is the correct property to modify, not broad permissions.
3.  **Not Restarting the Terminal or Sourcing Profile:** After modifying environment variables (like `PATH`) or shell configuration files (`.bashrc`, `.zshrc`), changes only take effect in new terminal sessions or when you explicitly `source` the file. Forgetting this step can lead to frustration as fixes don't seem to apply.
4.  **Ignoring the Root Cause:** Simply trying to install as `sudo` or applying a quick `chown` without understanding *why* the error occurred often leads to recurring problems or new issues down the line. A version manager or properly configured prefix addresses the root cause effectively.

### Prevention Tips

1.  **Always Use a Node Version Manager (NVM):** This is the gold standard for managing Node.js and `npm` installations. NVM ensures that Node.js, `npm`, and all global packages are installed within your user's home directory (`~/.nvm`), where you inherently have full write permissions. This completely sidesteps system-wide permission conflicts.
2.  **Never Use `sudo npm install -g`:** Make it a strict rule to avoid `sudo` when installing global `npm` packages. If you find yourself instinctively typing `sudo`, stop and reassess your `npm` configuration. Proper configuration (like NVM or a user-owned prefix) negates the need for `sudo`.
3.  **Understand File System Permissions:** A basic understanding of `chown` (change owner) and `chmod` (change permissions) can help you diagnose and avoid permission-related issues on macOS/Linux. Know that system directories are generally for `root` and user directories are for your user.
4.  **Keep `npm` and Node.js Updated:** While not directly related to `EACCES`, keeping your Node.js and `npm` versions up-to-date (via NVM) can prevent other unforeseen issues and ensure you benefit from the latest bug fixes and features.