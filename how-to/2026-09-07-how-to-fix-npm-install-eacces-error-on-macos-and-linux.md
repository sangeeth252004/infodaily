---
title: "How to Fix 'npm install' EACCES Error on macOS and Linux"
date: "2026-09-07T22:30:19.129Z"
slug: "how-to-fix-npm-install-eacces-error-on-macos-and-linux"
type: "how-to"
description: "Resolve 'npm install' EACCES permission errors on macOS and Linux with this comprehensive guide, covering causes, step-by-step solutions, and prevention tips."
keywords: "npm install, EACCES error, macOS, Linux, permission denied, Node.js, global packages, npm permissions"
---

## Problem Explanation

You're likely encountering the "EACCES" error when trying to install Node.js packages globally using `npm install -g <package-name>`. This error signifies a permissions issue, meaning the current user doesn't have the necessary rights to write to the directory where npm attempts to install global packages. You'll see output similar to this in your terminal:

```bash
npm ERR! code EACCES
npm ERR! syscall mkdir
npm ERR! path /usr/local/lib/node_modules/<package-name>
npm ERR! errno -13
npm ERR! EACCES: permission denied, mkdir '/usr/local/lib/node_modules/<package-name>'
```

This prevents you from installing or updating command-line tools and other packages that are intended to be available system-wide. The inability to install these essential tools can halt your development workflow, as many development tools and frameworks rely on globally installed npm packages.

## Why It Happens

The core reason for the EACCES error is that npm, by default, tries to install global packages into system-protected directories, typically located within `/usr/local/lib/node_modules` or similar paths. On macOS and Linux systems, these directories are owned by the root user and require administrative privileges (using `sudo`) to modify. When you run `npm install -g` without `sudo` (which is generally discouraged for security reasons), your regular user account lacks the write permissions to these locations, leading to the EACCES error.

Another common cause is misconfiguration or incorrect ownership of npm's default directories, especially after system updates or manual changes to Node.js installations. If the directories where npm needs to write are not owned by your user or a group your user belongs to, you'll encounter permission denied errors. This is a protective measure by the operating system to prevent unauthorized modifications to system-level files.

## Step-by-Step Solution

There are several robust methods to resolve the `npm install` EACCES error. The most recommended approaches involve reconfiguring npm to use a user-owned directory for global packages.

### ## Step 1: Verify Node.js and npm Installation

Before proceeding, ensure Node.js and npm are correctly installed. Open your terminal and run:

```bash
node -v
npm -v
```

If these commands return version numbers, your installation is likely fine. If not, you might need to reinstall Node.js. Consider using a version manager like `nvm` (Node Version Manager) or `fnm` (Fast Node Manager) for easier management and to avoid permission issues altogether.

### ## Step 2: Create a Directory for Global npm Packages

The safest and most recommended solution is to configure npm to install global packages in a directory that your user account owns.

First, create a directory for your global npm packages. A common and good location is within your home directory.

```bash
mkdir ~/.npm-global
```

### ## Step 3: Configure npm to Use the New Directory

Next, tell npm to use this new directory for global installations. Run the following command:

```bash
npm config set prefix '~/.npm-global'
```

This command updates your npm configuration file (`~/.npmrc`) to point the `prefix` setting to your newly created directory.

### ## Step 4: Update Your System's PATH Environment Variable

For the globally installed executables (like command-line tools) to be recognized by your system, you need to add the `bin` directory within your new global npm packages location to your system's `PATH` environment variable.

Open your shell's configuration file. This is typically `~/.bashrc`, `~/.bash_profile`, `~/.zshrc` (if you use Zsh), or `~/.profile`. You can use a text editor like `nano` or `vim`:

```bash
nano ~/.zshrc  # Or ~/.bashrc, ~/.bash_profile, ~/.profile
```

Add the following line to the end of the file:

```bash
export PATH=~/.npm-global/bin:$PATH
```

Save the file and exit the editor.

### ## Step 5: Apply the PATH Changes

To make the changes to your `PATH` effective in your current terminal session, you need to source the configuration file you just modified:

```bash
source ~/.zshrc  # Or source ~/.bashrc, source ~/.bash_profile, source ~/.profile
```

This command reloads your shell's configuration, making the new `PATH` available immediately.

### ## Step 6: Test the New Configuration

Now, try installing a package globally again. This time, it should work without permission errors. For example, you can install `create-react-app`:

```bash
npm install -g create-react-app
```

If the installation completes without any EACCES errors, you have successfully resolved the issue. You can then test if the installed command-line tool is accessible:

```bash
create-react-app --version
```

### ## Alternative (Less Recommended) Solution: Using nvm

If you are managing multiple Node.js versions or prefer a more integrated solution, using a Node Version Manager like `nvm` is highly recommended. `nvm` installs Node.js and its associated global packages within your home directory, automatically avoiding system permission issues.

1.  **Install nvm:** Follow the official installation instructions for nvm. Typically, this involves running a curl or wget script.
2.  **Install Node.js via nvm:**
    ```bash
    nvm install node # Installs the latest version
    nvm use node    # Uses the installed version
    ```
3.  **Install packages globally:** Now, when you install packages globally using `npm install -g <package-name>`, they will be installed within the `nvm` managed Node.js environment in your home directory, thus avoiding EACCES errors.

## Common Mistakes

A frequent mistake is to simply prepend `sudo` to `npm install -g`. While this might seem like a quick fix, it's generally discouraged for several reasons:

*   **Security Risks:** Installing packages with `sudo` gives them elevated privileges. If a malicious package were to be installed this way, it could potentially harm your system.
*   **Permission Conflicts:** Over time, using `sudo` can lead to mixed ownership of files within your npm directories, creating new, harder-to-diagnose permission problems later.
*   **Package Corruption:** Some packages might not be designed to be installed globally with `sudo`, potentially leading to installation errors or corrupted files.

Another common oversight is forgetting to `source` the shell configuration file after modifying the `PATH`. This means that even though you've updated the configuration, your current terminal session won't recognize the new path, and you'll still encounter errors when trying to run globally installed commands.

## Prevention Tips

The best way to prevent EACCES errors is to adopt a robust Node.js and npm management strategy from the outset.

1.  **Use a Node Version Manager:** As mentioned, `nvm` or `fnm` are invaluable tools. They manage Node.js installations and global packages entirely within your user's home directory, sidestepping system permission issues entirely. Once installed, you will rarely, if ever, need to worry about `sudo` for npm operations.

2.  **Configure npm's Global Prefix:** Even without a version manager, consistently configuring npm to use a user-owned directory for global packages (as outlined in the solution steps) is a proactive measure. Ensure this configuration is set up on any new machine or development environment you set up.

3.  **Understand Permissions:** Be mindful of where npm is trying to install packages. If you see errors pointing to system directories like `/usr/local/lib`, it's a strong indicator that you need to adjust your npm configuration or use a version manager, rather than resorting to `sudo`. Always prioritize user-owned directories for development tools and packages.