---
title: "How to Resolve `EACCES: permission denied` During `npm install` on Linux and macOS"
date: "2026-03-01T15:23:00.252Z"
slug: "how-to-resolve-eacces-permission-denied-during-npm-install-on-linux-and-macos"
type: "how-to"
description: "Learn how to fix `EACCES: permission denied` errors when running `npm install` on Linux and macOS. This guide provides step-by-step solutions, explains root causes, and offers prevention tips for sustainable development environments."
keywords: "npm EACCES, permission denied npm install, fix npm permissions, sudo npm install, npm global permissions, Linux npm EACCES, macOS npm EACCES, node.js permissions, npm fix permissions, nodejs error EACCES"
---

### Problem Explanation

When working with Node.js and its package manager `npm` on Linux or macOS, encountering an `EACCES: permission denied` error during an `npm install` operation is a common and frustrating issue. Users typically see a stack trace similar to this in their terminal:

```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, access '/usr/local/lib/node_modules'
npm ERR! { [Error: EACCES: permission denied, access '/usr/local/lib/node_modules']
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'access',
npm ERR!   path: '/usr/local/lib/node_modules' }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file.
npm ERR!
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator (though this is not recommended).
```

The core of the problem is explicitly stated: `permission denied`. This error indicates that `npm` is attempting to write a file or create a directory in a location where the current user does not have the necessary write permissions. While the error message might sometimes suggest running the command as root (e.g., using `sudo`), this approach is generally discouraged as it can lead to further permission conflicts and security vulnerabilities in the long run.

### Why It Happens

The `EACCES: permission denied` error primarily stems from `npm` attempting to install global packages or modify global configuration files within system-owned directories. By default, on Linux and macOS, system directories like `/usr/local/lib/node_modules` or `/usr/local/bin` are owned by the root user and are only writable by root or users with `sudo` privileges.

This situation commonly arises when Node.js and npm are initially installed using a system-wide package manager (e.g., `apt` on Debian/Ubuntu, `yum` on CentOS/RHEL, or directly downloading the installer without careful permission configuration). These methods often install Node.js and npm into system directories with root ownership. Subsequently, when a non-root user attempts to install a global npm package (e.g., `npm install -g some-package`), `npm` tries to write to these restricted directories, resulting in the permission denied error. The ideal scenario is for `npm` to install global packages into a directory that your current user owns and has full write permissions for, without needing elevated privileges.

### Step-by-Step Solution

The most robust and recommended solution is to configure `npm` to install global packages into a user-owned directory, eliminating the need for `sudo` and preventing future permission issues.

#### ## Step 1: Identify Your Current Global npm Prefix

First, determine where `npm` is currently configured to install global packages. This will show you the path that is causing the `EACCES` error.

Open your terminal and run:

```bash
npm config get prefix
```

This command will output a path, typically `/usr/local` on macOS or Linux, or sometimes a different system-owned directory. This is the directory that `npm` is trying to write into without sufficient permissions.

#### ## Step 2: Create a Dedicated Directory for Global npm Packages

You need a new directory in your home folder where `npm` can install global packages without encountering permission issues. Your home directory (`~`) is always owned by your user, so creating a subdirectory here is safe and reliable.

```bash
mkdir ~/.npm-global
```

This command creates a new directory named `.npm-global` inside your home directory. The leading dot (`.`) makes it a hidden directory, which is a common practice for configuration and tool-specific files.

#### ## Step 3: Configure npm to Use the New Global Prefix

Now, instruct `npm` to use your newly created directory as the prefix for all global package installations.

```bash
npm config set prefix '~/.npm-global'
```

This command modifies your `npm` configuration file (usually `~/.npmrc`) to set the `prefix` variable. From now on, `npm` will attempt to install global packages into `~/.npm-global/lib/node_modules` and place executables in `~/.npm-global/bin`.

#### ## Step 4: Update Your System's PATH Environment Variable

For your system to find the executables of globally installed npm packages (e.g., `yarn`, `grunt-cli`, `http-server`), you need to add the `bin` directory within your new npm prefix to your shell's `PATH` environment variable.

1.  **Open your shell configuration file:**
    Most Linux users will use `~/.bashrc`. macOS users using Bash will also use `~/.bashrc` or `~/.profile`. If you're using Zsh (the default on modern macOS), use `~/.zshrc`.
    You can open it with a text editor like `nano` or `vi`:

    ```bash
    # For Bash
    nano ~/.bashrc
    # OR for Zsh
    nano ~/.zshrc
    ```

2.  **Add the following line to the end of the file:**

    ```bash
    export PATH=~/.npm-global/bin:$PATH
    ```
    This line tells your shell to include `~/.npm-global/bin` at the beginning of the list of directories it searches for executables. This ensures that any global npm package executables are found before potentially conflicting system-wide versions.

3.  **Save and exit the text editor.** (In `nano`, press `Ctrl+O` to write out, then `Enter`, then `Ctrl+X` to exit).

4.  **Apply the changes to your current shell session:**
    After modifying the configuration file, you need to "source" it to apply the changes without restarting your terminal.

    ```bash
    # For Bash
    source ~/.bashrc
    # OR for Zsh
    source ~/.zshrc
    ```

    Alternatively, you can simply close and reopen your terminal window.

#### ## Step 5: Verify the New Configuration and Test an Installation

Finally, verify that `npm` is using the correct prefix and that you can install global packages without permission errors.

1.  **Check the global root path:**

    ```bash
    npm root -g
    ```
    This should now output `~/.npm-global/lib/node_modules`, confirming that npm is looking in your user-owned directory.

2.  **Install a test global package:**
    Let's try installing a common global tool, like `yarn`:

    ```bash
    npm install -g yarn
    ```
    This command should now complete successfully without any `EACCES` errors. You can then verify `yarn` is installed and accessible by running `yarn --version`.

### Common Mistakes

When attempting to resolve `EACCES` errors, several common pitfalls can lead to more problems:

*   **Using `sudo npm install` as a permanent solution:** While `sudo npm install` might temporarily bypass the permission error, it's a dangerous practice. It installs packages as the root user, which can make them inaccessible to your regular user, lead to future permission conflicts for updates, and create security vulnerabilities. Avoid it unless a specific tool explicitly requires it (which is rare).
*   **Recursively changing ownership of system directories:** Commands like `sudo chown -R $(whoami) /usr/local` are extremely risky. Changing the ownership of system directories can break other system-level tools, package managers, and dependencies, leading to a cascade of unexpected issues across your operating system.
*   **Forgetting to `source` your shell configuration file:** After modifying `~/.bashrc` or `~/.zshrc`, many users forget to run `source ~/.bashrc` (or `~/.zshrc`). This means the `PATH` environment variable is not updated in the current terminal session, and the system still won't find the globally installed executables until a new terminal session is started.
*   **Incorrectly modifying the `PATH` variable:** Malformed `export PATH` lines can break your shell's ability to find any commands, including basic ones. Always ensure the syntax is correct and includes `$PATH` to append to the existing path, not overwrite it.

### Prevention Tips

Implementing these practices can prevent `EACCES` errors and maintain a clean, stable development environment:

*   **Use a Node.js Version Manager:** The most robust way to prevent `EACCES` errors is to install Node.js and `npm` using a version manager like `nvm` (Node Version Manager) for Linux/macOS, `fnm`, or `asdf`. These tools install Node.js and `npm` (and all global packages) into your user's home directory, completely bypassing system-level permission issues from the outset.
*   **Avoid System Package Managers for Node.js:** While convenient, installing Node.js via `apt`, `yum`, or even Homebrew can sometimes lead to the system-wide permissions issues discussed. Version managers give you more control and flexibility.
*   **Understand Your User's Permissions:** Be mindful of where you're trying to install packages. If `npm` attempts to write outside your home directory, assume it will require root permissions and consider if there's a better, user-owned location.
*   **Keep npm Updated:** While not directly related to `EACCES`, keeping `npm` itself updated (`npm install -g npm`) ensures you have the latest features, bug fixes, and best practices integrated into its operations.
*   **Regularly Clear the npm Cache:** Although not a direct prevention for `EACCES`, an overloaded or corrupted `npm` cache can sometimes lead to unexpected installation issues. Periodically clear it with `npm cache clean --force`.