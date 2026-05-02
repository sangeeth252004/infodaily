---
title: "How to Fix 'npm install' Fails with EACCES Error on macOS/Linux"
date: "2026-05-02T10:51:13.007Z"
slug: "how-to-fix-npm-install-fails-with-eacces-error-on-macos-linux"
type: "how-to"
description: "Resolve EACCES permission errors during 'npm install' on macOS and Linux. Understand root causes and implement robust, step-by-step solutions like using nvm or fixing npm directory permissions."
keywords: "npm install, EACCES, permission denied, macOS, Linux, Node.js, npm, nvm, fix error, troubleshooting, package manager, global packages"
---

## Problem Explanation

When attempting to install Node.js packages using `npm install` on macOS or Linux systems, you might encounter an `EACCES` error. This error indicates "Permission denied," meaning the `npm` command is trying to write files or create directories in a location where your current user account lacks the necessary write privileges. This issue commonly arises when installing global packages (e.g., `npm install -g <package-name>`), but can also affect local project dependencies if the `npm` cache or project directory permissions are misconfigured.

The typical output you'll see in your terminal will include "EACCES: permission denied," often pointing to a specific path like `/usr/local/lib/node_modules` or within your user's `.npm` directory. Here's an example of such an error message:

```bash
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules'
npm ERR!  { [Error: EACCES: permission denied, access '/usr/local/lib/node_modules']
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'access',
npm ERR!   path: '/usr/local/lib/node_modules' }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR!
npm ERR! If you appear to be the correct owner, please review any system documentation for
npm ERR! shared file systems, or file permissions.
```

## Why It Happens

The `EACCES` error primarily occurs because Node.js and `npm` were installed in a way that granted root ownership to system-wide directories where `npm` attempts to write. This often happens under a few scenarios:

1.  **Node.js/npm installed with `sudo`:** If Node.js or `npm` were initially installed or updated using `sudo` (e.g., `sudo apt install nodejs` or `sudo npm install -g npm`), the global `node_modules` directory and `npm`'s cache directories might have been created or modified with root ownership. Subsequent `npm install` commands run without `sudo` will fail because your regular user lacks permission to write to those root-owned directories.
2.  **System-wide installation:** Using a system package manager (like `apt` on Debian/Ubuntu, `yum`/`dnf` on Fedora/RHEL, or a direct macOS installer without a version manager) often places Node.js and `npm` files in system locations (`/usr/local`, `/usr/bin`, etc.) that typically require root privileges for modification.
3.  **Corrupted permissions:** Less common, but permissions in your user's `~/.npm` cache directory or a specific project's `node_modules` directory might become incorrect due to various system events, leading to permission issues even for local installations.

The core issue is a mismatch between the user executing `npm install` and the owner of the target installation directories. Solving this requires ensuring your user has proper write access without resorting to `sudo` for every `npm` command, which is a security risk and perpetuates the problem.

## Step-by-Step Solution

The most robust and recommended solution is to use a Node Version Manager (NVM). This completely sidesteps permission issues by installing Node.js and `npm` within your user's home directory. If NVM is not an option for specific reasons, alternative methods involving permission adjustments are also provided.

### Step 1: Install and Configure Node Version Manager (NVM) (Recommended)

NVM allows you to install and manage multiple Node.js versions on your system without requiring root access. It places Node.js and `npm` in your user's home directory, `/home/<user>/.nvm` (Linux) or `~/.nvm` (macOS), which you always have write access to.

1.  **Remove existing Node.js/npm installations:**
    Before installing NVM, it's highly recommended to remove any existing system-wide Node.js and `npm` installations that might be causing conflicts.
    *   **macOS (if installed via Homebrew):**
        ```bash
        brew uninstall node
        brew cleanup
        ```
    *   **macOS (if installed via official installer):** You may need to manually remove files from `/usr/local/bin`, `/usr/local/lib`, `/usr/local/include`, etc. Use caution.
        ```bash
        # List files that might be Node.js related
        ls -la /usr/local/bin | grep "node"
        ls -la /usr/local/bin | grep "npm"
        # Then remove them if they exist and are related to Node.js/npm (use with extreme caution)
        # sudo rm -rf /usr/local/{lib/node_modules,bin/node,bin/npm,bin/npx}
        ```
    *   **Linux (if installed via `apt`/`yum`/`dnf`):**
        ```bash
        sudo apt remove nodejs npm # For Debian/Ubuntu
        sudo yum remove nodejs npm # For Fedora/RHEL/CentOS
        sudo dnf remove nodejs npm # For modern Fedora
        ```
    *   Clear `npm` cache:
        ```bash
        npm cache clean --force
        ```
        You may need `sudo` for this if permissions are already broken.

2.  **Install NVM:**
    Open your terminal and run the official NVM installation script:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    ```
    *(Verify the latest version on NVM's GitHub page if v0.39.7 is outdated.)*

3.  **Verify NVM installation and load it:**
    After installation, close and reopen your terminal, or source your shell's profile:
    ```bash
    source ~/.bashrc # Or ~/.zshrc, ~/.profile, depending on your shell
    nvm --version
    ```
    If it outputs a version number, NVM is installed correctly.

4.  **Install Node.js using NVM:**
    Install the latest stable version of Node.js:
    ```bash
    nvm install node # Installs the latest stable version
    nvm use node
    nvm alias default node # Set this version as default for new shells
    ```
    You can also install specific versions, e.g., `nvm install 18`.

5.  **Verify Node.js and npm:**
    ```bash
    node -v
    npm -v
    ```
    Both should output version numbers. Now, `npm install` operations should work without `EACCES` errors.

### Step 2: Fix `npm`'s Default Directory (Alternative to NVM)

If you cannot use NVM, you can configure `npm` to install global packages into a directory within your home folder, which you have full control over.

1.  **Create a directory for global `npm` packages:**
    ```bash
    mkdir ~/.npm-global
    ```

2.  **Configure `npm` to use this new directory:**
    ```bash
    npm config set prefix '~/.npm-global'
    ```

3.  **Add the new `npm` path to your shell's `PATH` environment variable:**
    Open your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`, or `~/.profile`) with a text editor:
    ```bash
    nano ~/.bashrc
    ```
    Add the following line at the end of the file:
    ```bash
    export PATH="$PATH:~/.npm-global/bin"
    ```
    Save the file and exit the editor.

4.  **Apply the changes:**
    Close and reopen your terminal, or run:
    ```bash
    source ~/.bashrc # Or ~/.zshrc, ~/.profile
    ```

5.  **Test the fix:**
    Try installing a global package:
    ```bash
    npm install -g yarn
    ```
    This should now install Yarn into `~/.npm-global/bin` without permission errors.

### Step 3: Change Ownership of `npm`'s Global Directory (Use with Caution)

This method directly changes the ownership of the system-wide global `npm` directories to your user. While effective, it's less preferred than NVM or changing the prefix, as it modifies system directories and can lead to issues if Node/npm are reinstalled by a system process.

1.  **Find your `npm` global directory:**
    ```bash
    npm root -g
    ```
    This command will typically output a path like `/usr/local/lib/node_modules`. Let's assume the output is `/usr/local/lib/node_modules`.

2.  **Change ownership of the directory:**
    Replace `<YOUR_USERNAME>` with your actual username and `/usr/local/lib/node_modules` with the path found in the previous step.
    ```bash
    sudo chown -R $(whoami) $(npm root -g)
    ```
    This command recursively changes the owner of the `node_modules` directory (and everything inside it) to your current user.

3.  **Change ownership of `npm`'s cache directory:**
    ```bash
    sudo chown -R $(whoami) ~/.npm
    ```

4.  **Clear the `npm` cache:**
    ```bash
    npm cache clean --force
    ```

5.  **Test the fix:**
    ```bash
    npm install -g @vue/cli # Example global package
    ```

### Step 4: Clear npm Cache

Sometimes, a corrupted `npm` cache can lead to unexpected permission issues. Clearing it can resolve problems.

1.  **Clear the cache:**
    ```bash
    npm cache clean --force
    ```
    If you still face `EACCES` when clearing, you might need to use `sudo` *once* for this specific command if the cache directory permissions are severely broken:
    ```bash
    sudo npm cache clean --force
    ```
    After clearing with `sudo`, try `npm install` again. If successful, use the method from Step 1 or 2 to prevent future issues.

### Step 5: Verify Node.js and npm Installation

After applying any of the above solutions, always verify that Node.js and `npm` are functioning correctly.

1.  **Check versions:**
    ```bash
    node -v
    npm -v
    ```
    These should output the installed version numbers without errors.

2.  **Test a global installation:**
    ```bash
    npm install -g nodemon
    ```
    If this runs successfully without `EACCES` errors, your problem is resolved.

## Common Mistakes

*   **Using `sudo npm install` as a regular fix:** This is the most common mistake. While `sudo` temporarily bypasses the permission error, it does so by running `npm` as the root user. This creates or modifies files with root ownership, perpetuating the `EACCES` problem for future `npm` commands run by your regular user. It's a temporary workaround that makes the underlying problem worse.
*   **Incorrectly removing Node.js/npm:** Rushing to remove Node.js without understanding how it was installed can leave remnants that cause conflicts with new installations, especially when switching to version managers.
*   **Applying `chown` to the wrong directory:** Using `sudo chown -R` on an incorrect or overly broad directory can destabilize your system. Always target specific `npm` or Node.js directories as identified by `npm root -g`.
*   **Not sourcing shell profiles:** After modifying `~/.bashrc` or `~/.zshrc`, users sometimes forget to run `source ~/.bashrc` (or equivalent) or reopen their terminal, leading to the new `PATH` or environment variables not taking effect.

## Prevention Tips

To prevent `EACCES` errors from recurring and ensure a smooth development workflow:

*   **Always use a Node Version Manager (NVM):** This is the single most effective prevention strategy. NVM installs Node.js and `npm` into your user's home directory, ensuring you always have the necessary permissions. It also allows you to easily switch between Node.js versions for different projects, which is a common requirement in development.
*   **Avoid `sudo npm install` for global packages:** Unless you have a very specific, well-understood reason, never use `sudo` when installing global `npm` packages. If you find yourself needing `sudo`, it's a strong indicator that your Node.js/npm setup has permission issues that need to be addressed at a fundamental level (e.g., using NVM).
*   **Regularly clear your `npm` cache:** While not directly related to `EACCES`, a clean `npm` cache (`npm cache clean --force`) helps prevent other installation issues and ensures a fresh slate, especially after resolving permission problems.
*   **Understand your `PATH`:** Be aware of where your `node` and `npm` executables are located in your system's `PATH`. If you have multiple installations or are using a version manager, ensure the correct version is prioritized in your `PATH` to avoid unexpected behavior.
*   **Check system permissions:** If you're working on a shared system or a non-standard setup, occasionally verify the permissions of key directories (`/usr/local/lib/node_modules`, `~/.npm`) to ensure they align with your user's access rights.