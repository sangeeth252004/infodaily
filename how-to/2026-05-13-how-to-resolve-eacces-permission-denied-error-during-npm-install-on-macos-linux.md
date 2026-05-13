---
title: "How to Resolve 'EACCES: permission denied' Error During npm install on macOS/Linux"
date: "2026-05-13T17:15:42.890Z"
slug: "how-to-resolve-eacces-permission-denied-error-during-npm-install-on-macos-linux"
type: "how-to"
description: "Learn to fix the 'EACCES: permission denied' error when running npm install on macOS or Linux. This guide provides step-by-step solutions, including fixing directory permissions, using NVM, and preventing future issues."
keywords: "npm, EACCES, permission denied, macOS, Linux, npm install, Node.js, permissions, fix, error, guide, NVM, chown, sudo, global packages"
---

The 'EACCES: permission denied' error is a common stumbling block for developers working with Node.js and npm on Unix-like systems such as macOS and Linux. This specific error indicates that the current user lacks the necessary permissions to write to a particular directory or file that npm is trying to access or modify. When this issue arises, npm cannot complete its operations, leading to failed installations or updates of packages, especially global ones.

Users typically encounter this problem when attempting to install a package globally using `npm install -g <package-name>`, or sometimes even during local installations if the project directory itself has incorrect permissions. The terminal output will prominently feature messages like `npm ERR! code EACCES`, `npm ERR! syscall access`, and `npm ERR! path /usr/local/lib/node_modules/<package-name>`, often followed by `npm ERR! errno -13` or similar. These messages clearly point to a permission issue at a specific file path, usually within a system directory like `/usr/local/lib/node_modules/` or `/usr/local/bin/`.

### Why It Happens

The root cause of the 'EACCES: permission denied' error fundamentally boils down to file system permissions. On macOS and Linux, certain directories, particularly those intended for system-wide applications and binaries (like `/usr/local`), are often owned by the `root` user and only writable by `root`. When Node.js and npm are installed directly via system package managers (e.g., `apt`, `yum`, `brew`) or downloaded directly from nodejs.org, they often place npm's global installation directories within these `root`-owned paths.

If `npm install -g` is executed by a non-root user, npm attempts to write to these `root`-owned directories but is denied access, triggering the `EACCES` error. This often happens because an initial `npm install` or Node.js setup was run using `sudo`, granting root privileges for that specific operation. While `sudo` temporarily bypasses permission issues, it can inadvertently change the ownership of directories or files within the npm ecosystem to `root`, thereby locking out the standard user for subsequent operations. Without the proper permissions for your regular user account, npm cannot manage packages in its designated global location, leading to persistent 'EACCES' errors.

## Step-by-Step Solution

This section outlines several robust methods to resolve the 'EACCES: permission denied' error, ranging from direct permission fixes to adopting a more robust Node.js management strategy.

### Step 1: Understand the Error Message and Your Current User

Before making any changes, it's crucial to understand where npm is trying to write and who you are logged in as. This helps diagnose the exact permission conflict.

1.  **Identify the npm global prefix:**
    This command tells you where npm intends to install global packages.
    ```bash
    npm config get prefix
    ```
    Typically, this will output something like `/usr/local` or `~/.npm-global`. If it's `/usr/local`, you're likely dealing with system-wide permissions.

2.  **Identify your current user:**
    ```bash
    whoami
    ```
    This will show your username, which is the user account that needs write access to the npm global directories.

3.  **Inspect permissions of the problematic directory:**
    Using the path identified in step 1 (e.g., `/usr/local`), examine its current ownership and permissions.
    ```bash
    ls -la $(npm config get prefix)
    ```
    Look for directories like `lib/node_modules`, `bin`, and `share`. If they are owned by `root`, while your `whoami` output is different, this confirms the permission issue.

### Step 2: Method A - Fix npm's Global Installation Directory Permissions (Recommended for existing setups)

This is often the most direct fix if you want to continue using Node.js installed system-wide without a version manager. It involves changing the ownership of npm's global directories to your current user.

1.  **Change ownership of npm's global directories:**
    This command uses `sudo` to temporarily gain root privileges and recursively change the owner of the npm global installation directories (`lib/node_modules`, `bin`, `share`) to your current user (`$(whoami)`).
    ```bash
    sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
    ```
    *   `sudo`: Executes the command with superuser privileges.
    *   `chown`: Changes file owner and group.
    *   `-R`: Recursive, meaning it applies the change to all files and subdirectories.
    *   `$(whoami)`: A command substitution that inserts your current username.
    *   `$(npm config get prefix)`: Another command substitution that inserts the npm global prefix path (e.g., `/usr/local`).
    *   `/{lib/node_modules,bin,share}`: A shell brace expansion that applies the change to these specific subdirectories within the prefix.

2.  **Test the fix:**
    Try installing a global package again without `sudo`.
    ```bash
    npm install -g http-server
    ```
    If it installs successfully, the permissions are now correctly configured.

### Step 3: Method B - Use a Node Version Manager (NVM) (Recommended for new setups and long-term stability)

A Node Version Manager like NVM (Node Version Manager) is the highly recommended approach for managing Node.js and npm installations. NVM installs Node.js versions in your user's home directory, completely bypassing system-wide permission issues.

1.  **Install NVM (if not already installed):**
    Follow the installation instructions from the official NVM GitHub repository. The typical installation involves downloading and running a script:
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
    ```
    After installation, close and reopen your terminal, or source your shell configuration file (e.g., `source ~/.bashrc`, `source ~/.zshrc`).

2.  **Install Node.js via NVM:**
    Install the latest stable version of Node.js. NVM automatically configures it to be installed in a user-owned directory.
    ```bash
    nvm install node
    ```
    To install a specific version: `nvm install 16` or `nvm install 18.17.1`.

3.  **Use the installed Node.js version:**
    ```bash
    nvm use node
    ```
    To set a default version that NVM will use every time you open a new shell:
    ```bash
    nvm alias default node
    ```

4.  **Verify and test:**
    Check your Node.js and npm versions to ensure NVM is active:
    ```bash
    node -v
    npm -v
    ```
    Now, try installing a global package. It should work without permission errors:
    ```bash
    npm install -g create-react-app
    ```
    With NVM, you should never need `sudo` for `npm install` operations.

### Step 4: Method C - Change npm's Default Directory (Alternative for specific scenarios)

If neither of the above methods is suitable for your workflow (e.g., if you cannot use `sudo` or NVM), you can configure npm to install global packages into a directory within your home folder.

1.  **Create a directory for global installations:**
    ```bash
    mkdir ~/.npm-global
    ```

2.  **Configure npm to use this new directory:**
    ```bash
    npm config set prefix '~/.npm-global'
    ```

3.  **Add the new directory to your PATH environment variable:**
    This ensures your system can find executables installed by npm in the new location.
    Open your shell configuration file (e.g., `~/.bashrc`, `~/.zshrc`, `~/.profile`) with a text editor and add the following line:
    ```bash
    export PATH=~/.npm-global/bin:$PATH
    ```
    Save the file and then apply the changes by running:
    ```bash
    source ~/.bashrc  # Or ~/.zshrc, ~/.profile depending on your shell
    ```

4.  **Test the fix:**
    ```bash
    npm install -g yarn
    ```
    This method effectively redirects npm's global installations to a user-owned path, similar to how NVM operates for individual Node.js versions.

### Step 5: Clean npm Cache and Re-attempt

Sometimes, a corrupted npm cache can contribute to installation issues. Clearing it can resolve underlying inconsistencies.

1.  **Clear the npm cache:**
    ```bash
    npm cache clean --force
    ```
    The `--force` flag is necessary for older npm versions (npm v5 and below) or if you encounter issues. For modern npm (v6+), `npm cache clean` should suffice, but `--force` is harmless.

2.  **Re-attempt your installation:**
    After clearing the cache, try your `npm install` command again.

### Step 6: Verify the Fix and Clean Up (If applicable)

After applying one of the solutions, it's good practice to verify everything is working as expected and clean up any potential leftover issues.

1.  **Verify global packages:**
    List globally installed packages to ensure they are now managed correctly:
    ```bash
    npm list -g --depth=0
    ```

2.  **Remove any problematic packages:**
    If you encountered issues with a specific package, try uninstalling and reinstalling it.
    ```bash
    npm uninstall -g <package-name>
    npm install -g <package-name>
    ```

## Common Mistakes

When encountering 'EACCES: permission denied', users often make mistakes that can complicate the situation or lead to temporary, insecure fixes:

*   **Using `sudo` repeatedly for `npm install`:** This is the most common and problematic mistake. While `sudo npm install -g <package>` will temporarily bypass the permission error, it installs the package as the `root` user, changing ownership of those files to `root`. Subsequent `npm install` commands run by your regular user will then fail again with 'EACCES', perpetuating the problem. It's a vicious cycle that locks out your user from managing npm packages.
*   **Not understanding global vs. local installations:** Confusion between `npm install` (local to the project) and `npm install -g` (global, system-wide) can lead to attempting permission fixes on the wrong directories or expecting global packages to be available without proper PATH configuration.
*   **Ignoring the exact path in the error message:** The `npm ERR! path` line in the error message is critical. People sometimes focus on generic solutions without pinpointing which specific directory or file npm is being denied access to, leading to ineffective troubleshooting.

## Prevention Tips

Preventing 'EACCES: permission denied' errors in the future involves adopting best practices for managing Node.js and npm installations:

*   **Always use a Node Version Manager (NVM):** This is the strongest recommendation. NVM installs Node.js and npm in your user's home directory, ensuring all operations are performed with your user's permissions. This completely eliminates system-wide permission conflicts. It also makes it easy to switch between different Node.js versions for various projects.
*   **Never use `sudo` with `npm install`:** Once you have correctly configured your npm environment (either by fixing permissions in `Step 2` or using NVM in `Step 3`), you should never need `sudo` for `npm install` commands, whether global or local. If you find yourself reaching for `sudo`, stop and re-evaluate your setup.
*   **Understand where npm installs packages:** Be aware of the `npm config get prefix` output and how it affects where global packages are stored. For local packages, ensure your project directory and its contents are owned by your user and have appropriate write permissions.
*   **Regularly update Node.js and npm via NVM:** Keep your Node.js and npm versions up-to-date using NVM to benefit from bug fixes and improvements that might resolve subtle permission-related issues or provide better error reporting.