---
title: "Resolving 'npm ERR! code EACCES' on macOS/Linux: A Comprehensive Guide to Global Package Installation"
date: "2026-10-25T14:06:07.496Z"
slug: "resolving-npm-err-code-eacces-on-macos-linux-a-comprehensive-guide-to-global-package-installation"
type: "how-to"
description: "Learn how to fix the common 'npm ERR! code EACCES' error on macOS and Linux when installing global npm packages. This guide provides clear steps, explanations, and preventative measures."
keywords: "npm, EACCES, npm install, global packages, macOS, Linux, permissions, Node.js, command line, developer tools, troubleshooting"
---

# Resolving 'npm ERR! code EACCES' on macOS/Linux: A Comprehensive Guide to Global Package Installation

Encountering permission errors while working with Node.js and its package manager, npm, is a common hurdle for developers on macOS and Linux. The most frequent culprit is the `npm ERR! code EACCES` error, which typically surfaces when you attempt to install packages globally using `npm install -g <package-name>`. This error signifies that npm lacks the necessary permissions to write to the directories where global packages are stored, leading to a frustrating roadblock in your development workflow.

When this error occurs, your terminal output will likely display a series of messages indicating failure. You'll see lines similar to this:

```
npm ERR! code EACCES
npm ERR! syscall access
npm ERR! path /usr/local/lib/node_modules
npm ERR! errno -13
npm ERR!  EACCES: permission denied, access '/usr/local/lib/node_modules'
```

The crucial part is `EACCES: permission denied, access '/usr/local/lib/node_modules'`. This explicitly tells you that the user account currently executing the `npm` command does not have the rights to modify the specified directory. This prevents npm from creating, modifying, or deleting files and folders required for global package installation, effectively halting your ability to use command-line tools installed globally.

## Why It Happens

The `npm ERR! code EACCES` error arises due to a fundamental aspect of how macOS and Linux manage file system permissions. By default, npm attempts to install global packages into system-wide directories, such as `/usr/local/lib/node_modules` on many Unix-like systems. These directories are typically owned by the root user or a system group, granting write access only to privileged users.

When you, as a regular user, try to install a global package, your user account doesn't possess the elevated permissions needed to write to these protected locations. npm, running under your user's context, hits this permission wall and throws the `EACCES` error. This is a security measure designed to prevent unauthorized modifications to critical system files and directories. While well-intentioned, it can be inconvenient for developers who frequently install and manage global Node.js tools.

## Step-by-Step Solution

There are several effective ways to resolve the `npm ERR! code EACCES` error. The most recommended and secure approach involves configuring npm to use a user-owned directory for global installations. This eliminates the need for elevated privileges.

### ## Step 1: Check Your Current npm Directory Configuration

Before making any changes, it's good practice to understand how npm is currently configured. Open your terminal and run the following command:

```bash
npm config get prefix
```

This command will show you the directory where npm is attempting to install global packages. If it's a system directory like `/usr/local`, this confirms the root cause of your `EACCES` error.

### ## Step 2: Create a Dedicated Directory for Global npm Packages

The best solution is to tell npm to install global packages within your home directory, where your user account has full write permissions. First, create a new directory for this purpose. You can choose any location, but a common and sensible place is within your home directory, for example, `~/.npm-global`.

Execute these commands in your terminal:

```bash
mkdir ~/.npm-global
```

### ## Step 3: Configure npm to Use the New Directory

Now, instruct npm to use this newly created directory as its global installation prefix. Run the following command:

```bash
npm config set prefix '~/.npm-global'
```

This command updates your npm configuration file (usually `~/.npmrc`) to reflect the new prefix.

### ## Step 4: Update Your System's PATH Environment Variable

For your system to find the global packages you install (especially command-line tools), you need to tell it where to look. This is done by adding the `bin` directory within your new npm global prefix to your system's `PATH` environment variable.

First, open your shell's configuration file. This is typically `.bashrc`, `.bash_profile`, or `.zshrc` depending on your shell. For Zsh (common on modern macOS), it's `.zshrc`. For Bash, it's often `.bash_profile` or `.bashrc`.

You can open it with a text editor. For example, using `nano` for `.zshrc`:

```bash
nano ~/.zshrc
```

Add the following line to the end of the file:

```bash
export PATH=~/.npm-global/bin:$PATH
```

Save the file and exit the editor (in nano, press `Ctrl+X`, then `Y`, then `Enter`).

### ## Step 5: Reload Your Shell Configuration

For the changes to your `PATH` to take effect, you need to reload your shell configuration. You can either close and reopen your terminal window, or run the following command:

```bash
source ~/.zshrc
```

(Replace `~/.zshrc` with the appropriate file if you used a different one in Step 4).

### ## Step 6: Verify the New Configuration

After reloading your shell, verify that npm is now using the correct prefix:

```bash
npm config get prefix
```

The output should now be `~/.npm-global` (or whatever path you chose).

### ## Step 7: Test with a Global Package Installation

Now, try installing a global package again. A simple test package is `http-server`, which provides a simple web server.

```bash
npm install -g http-server
```

If everything is configured correctly, this command should now complete without any `EACCES` errors. You should then be able to run `http-server` from any directory in your terminal.

## Common Mistakes

One common pitfall when trying to fix `EACCES` errors is resorting to `sudo npm install -g`. While this might seem like a quick fix, it's generally discouraged. Running `npm` with `sudo` gives npm root privileges, meaning it can modify any file on your system. This bypasses important security measures and can lead to unintended consequences, such as corrupting your npm installation or even your operating system if a malicious package is installed. It also doesn't solve the underlying permission issue, it merely masks it with elevated privileges. Another mistake is not correctly updating the `PATH` environment variable or not reloading the shell configuration, leading to the system not finding the newly installed global executables.

## Prevention Tips

The best way to prevent `npm ERR! code EACCES` from recurring is to consistently use the user-owned global directory method described above. By configuring npm to install global packages within your home directory, you ensure that you always have the necessary permissions without needing to elevate your privileges. Regularly checking your npm configuration using `npm config get prefix` can also help you quickly identify if something has inadvertently changed. Maintaining a clean and organized Node.js environment, including understanding how to manage different Node.js versions (e.g., using tools like `nvm`), can also contribute to a smoother development experience and fewer permission-related issues.