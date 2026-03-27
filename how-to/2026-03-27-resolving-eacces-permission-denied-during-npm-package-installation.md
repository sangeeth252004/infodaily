---
title: "Resolving 'EACCES: permission denied' During npm Package Installation"
date: "2026-03-27T02:12:45.737Z"
slug: "resolving-eacces-permission-denied-during-npm-package-installation"
type: "how-to"
description: "Learn how to fix the common 'EACCES: permission denied' error when installing npm packages on your system. This guide provides clear, actionable solutions."
keywords: "npm, EACCES, permission denied, Node.js, package installation, fix, error, troubleshooting, command line"
---

## Problem Explanation

When attempting to install Node.js packages using npm (Node Package Manager), you might encounter the frustrating `EACCES: permission denied` error. This typically manifests in your terminal output, appearing something like this:

```
npm ERR! code EACCES
npm ERR! syscall mkdir
npm ERR! path /usr/local/lib/node_modules/some-package
npm ERR! errno -13
npm ERR!  { [Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/some-package']
npm ERR!   stack: 'Error: EACCES: permission denied, mkdir \'/usr/local/lib/node_modules/some-package\'',
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'mkdir',
npm ERR!   path: '/usr/local/lib/node_modules/some-package' }
npm ERR!
npm ERR! To fix this, please try the following commands:
npm ERR! sudo chown -R $(whoami) "$HOME/.npm"
npm ERR! sudo chown -R $(whoami) "/usr/local/lib/node_modules"
npm ERR!
npm ERR! npm.cmd, C:\Program Files\nodejs\node.exe, please inspect the 'npm ERR! code' above.
```

This error signifies that npm lacks the necessary permissions to write to a specific directory on your system, preventing the installation of new packages or the update of existing ones. This can halt your development workflow and prevent you from utilizing required libraries.

## Why It Happens

The `EACCES: permission denied` error almost always boils down to file system permissions. On Unix-like systems (macOS and Linux), directories and files are owned by specific users and groups, and each has associated read, write, and execute permissions. When you install Node.js and npm, they are often installed globally (e.g., in `/usr/local/lib/node_modules`). By default, these global directories might be owned by the 'root' user or another system administrator account.

When you, as a regular user, try to install a package globally without the necessary write permissions for these directories, your operating system prevents the operation to protect system integrity. npm, therefore, cannot create the necessary files and folders for the new package, resulting in the `EACCES` error. This issue is particularly common if you installed Node.js using system package managers (like `apt` or `brew`) without explicitly configuring it for user-level installs.

## Step-by-Step Solution

There are several robust methods to resolve the `EACCES: permission denied` error. The most recommended approach involves configuring npm to use a user-owned directory for global packages, avoiding the need to modify system-level permissions.

### ## Step 1: Change npm's Default Directory (Recommended)

This method involves telling npm to install global packages in a directory that your user account owns. This is the safest and most recommended approach as it avoids modifying system-wide permissions, which can have unintended consequences.

1.  **Create a directory for global npm packages:**
    Open your terminal and create a hidden directory in your home folder for npm packages:
    ```bash
    mkdir ~/.npm-global
    ```

2.  **Configure npm to use this directory:**
    Tell npm to use this new directory for installing global packages:
    ```bash
    npm config set prefix '~/.npm-global'
    ```

3.  **Add the new directory to your PATH:**
    For your system to find the globally installed executables, you need to add the new npm bin directory to your system's PATH environment variable.
    Open your shell's configuration file. This is typically `~/.bashrc`, `~/.bash_profile`, or `~/.zshrc`, depending on your shell. If you're unsure, try `echo $SHELL` to see your current shell.
    For Bash, edit `~/.bash_profile` (or `~/.bashrc`):
    ```bash
    # For macOS users, typically ~/.bash_profile
    # For Linux users, typically ~/.bashrc
    nano ~/.bash_profile
    ```
    Add the following line to the end of the file:
    ```bash
    export PATH=~/.npm-global/bin:$PATH
    ```
    If you are using Zsh (common on newer macOS versions), edit `~/.zshrc`:
    ```bash
    nano ~/.zshrc
    ```
    And add the same line:
    ```bash
    export PATH=~/.npm-global/bin:$PATH
    ```

4.  **Update your shell:**
    Save the file and exit the editor. Then, reload your shell configuration for the changes to take effect:
    ```bash
    source ~/.bash_profile  # Or source ~/.zshrc if you edited that file
    ```

5.  **Test the configuration:**
    Try installing a global package again. For example, `npm install -g yarn`:
    ```bash
    npm install -g yarn
    ```
    If this command completes without an `EACCES` error, the problem is resolved. You can now also run `yarn` from your terminal.

### ## Step 2: Use `sudo` (Not Recommended for Global Installs)

While `sudo` (superuser do) can temporarily grant your npm command elevated permissions, **this is generally not recommended for global package installations.** Using `sudo` for `npm install -g` can lead to ownership conflicts and security vulnerabilities. However, if you are troubleshooting or in a very specific, controlled environment, you might temporarily use it.

**Warning:** Use this method with extreme caution and only if you understand the implications. It's far better to configure npm to use a user-owned directory.

```bash
sudo npm install -g <package-name>
```

**Why this is discouraged:**
When you use `sudo`, npm installs packages as the root user. This means the installed packages and their dependencies will be owned by root, not your user account. Future installations or updates might then fail with permission errors when your regular user tries to modify these root-owned files, creating a cycle of permission issues.

### ## Step 3: Change Ownership of npm Directories (Use with Caution)

If you've already installed Node.js and npm globally and don't want to reconfigure npm's prefix, you can try changing the ownership of the npm directories to your current user. This is a more direct but potentially riskier approach.

1.  **Identify npm's directories:**
    You can find the npm directories by running:
    ```bash
    npm config get prefix
    ```
    This will likely point to something like `/usr/local`. You'll need to change ownership for `/usr/local/lib/node_modules` and potentially `/usr/local/bin`.

2.  **Change ownership:**
    Run the following commands, replacing `$(whoami)` with your actual username if it doesn't work:
    ```bash
    sudo chown -R $(whoami) $(npm config get prefix)/lib/node_modules
    sudo chown -R $(whoami) $(npm config get prefix)/bin
    ```
    You might also need to change ownership of npm's cache directory, which is often in your home directory:
    ```bash
    sudo chown -R $(whoami) ~/.npm
    ```

3.  **Test:**
    Try installing a global package again:
    ```bash
    npm install -g <package-name>
    ```

**Caution:** Be very careful when using `chown -R`. Incorrectly applying it to the wrong directories can cause significant system instability. Always double-check the paths.

## Common Mistakes

One of the most frequent mistakes is blindly using `sudo npm install -g <package-name>` without understanding the long-term consequences. As mentioned, this can lead to recurring permission issues because files become owned by `root`. Users might then repeatedly use `sudo`, further complicating the ownership structure.

Another common pitfall is not correctly updating the PATH environment variable after changing npm's global prefix. If `~/.npm-global/bin` is not in your PATH, you won't be able to execute global command-line tools installed by npm (like `yarn` or `nodemon`) even if the installation itself succeeded. Users might then think the installation failed when it's just a path issue.

Finally, users sometimes forget to restart their terminal or IDE after updating shell configuration files (`.bash_profile`, `.zshrc`). The PATH changes only take effect in new terminal sessions.

## Prevention Tips

To prevent the `EACCES: permission denied` error from occurring in the future, adopt best practices for managing your Node.js and npm environment.

The most effective prevention is to **consistently use the method of configuring npm to use a user-owned directory for global installations (Step 1).** This avoids modifying system-level permissions and ensures that all global packages and executables are owned by your user account, eliminating the root cause of `EACCES` errors for global installations.

Furthermore, consider using a Node Version Manager (NVM). Tools like NVM allow you to install and manage multiple Node.js versions on your system. Each NVM-managed Node.js installation typically uses user-specific directories for global packages, automatically sidestepping permission issues associated with system-wide installations. Installing NVM and then installing Node.js through NVM often resolves `EACCES` errors out-of-the-box.

Finally, always install local project dependencies using `npm install` (without `-g`) within your project directory. These dependencies are installed within the project's `node_modules` folder, which your user account will always have permission to write to.