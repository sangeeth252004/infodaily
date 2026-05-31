---
title: "How to Fix 'Permission Denied' Error (Errno 13) During pip Package Installation"
date: "2026-05-31T03:40:59.927Z"
slug: "how-to-fix-permission-denied-error-errno-13-during-pip-package-installation"
type: "how-to"
description: "Resolve the common 'Permission Denied' (Errno 13) error when installing Python packages with pip. This comprehensive guide provides practical steps and preventative measures."
keywords: "pip, permission denied, errno 13, python, package installation, fix, error, troubleshooting"
---

# How to Fix 'Permission Denied' Error (Errno 13) During pip Package Installation

## Problem Explanation

When attempting to install a Python package using the `pip` package manager, you might encounter an error message indicating a "Permission denied" situation. This is commonly presented as `ERROR: Could not install packages due to an OSError: [Errno 13] Permission denied: '/path/to/some/directory'`. The specific path mentioned will vary depending on your system and the package being installed, but the core of the problem remains the same: `pip` is unable to write files to a particular location on your system. This prevents the installation process from completing, leaving you unable to use the desired package.

The error typically manifests during the installation of packages that need to write files to system-wide Python directories, such as site-packages, or even temporary directories used during the build process. You'll see this error outputted directly in your terminal or command prompt, halting the `pip install <package-name>` command. For instance, you might see lines like:

```
  Installing collected packages: <package-name>
  Attempting uninstall: <package-name>
    Found existing installation: <package-name> X.Y.Z
    Uninstalling <package-name>-X.Y.Z:
ERROR: Could not install packages due to an OSError: [Errno 13] Permission denied: '/usr/local/lib/python3.9/site-packages/somefile.py'
```
or similar variations pointing to write restrictions.

## Why It Happens

The root cause of the `[Errno 13] Permission denied` error during `pip` installations is almost always a lack of the necessary file system permissions. Your operating system has a security model that dictates which users and processes can read, write, and execute files in specific locations. When `pip` tries to install a package, it needs to create or modify files within directories that are protected and require administrative privileges to alter. This often happens when you are trying to install packages into a system-wide Python installation without having the elevated rights to do so.

Common scenarios include trying to install packages globally on Linux or macOS systems, where Python's `site-packages` directory is typically owned by the root user. On Windows, similar issues can arise if you attempt to install packages into protected directories like `C:\Program Files\PythonXX` without administrator privileges. Another factor can be incorrect ownership or permissions set on directories that `pip` is trying to access, even if they are not strictly system-level directories.

## Step-by-Step Solution

Here's a structured approach to resolve the `[Errno 13] Permission denied` error:

### ## Step 1: Identify the Target Directory

First, carefully examine the full error message. It will explicitly state the directory path where `pip` is encountering the permission issue. For example, `[Errno 13] Permission denied: '/usr/local/lib/python3.9/site-packages/'`. This path is crucial for understanding where the problem lies. It's usually a directory within your Python installation's `site-packages` or `dist-packages` folder, where external libraries are installed.

### ## Step 2: Consider Using a Virtual Environment (Recommended)

The most robust and recommended solution is to use a Python virtual environment. Virtual environments create isolated Python installations for specific projects, allowing you to install packages without affecting your system-wide Python or requiring administrative privileges.

**On Linux/macOS:**
Open your terminal and navigate to your project directory. Then, run:
```bash
python3 -m venv myenv
```
Replace `myenv` with your preferred environment name.
To activate the environment:
```bash
source myenv/bin/activate
```
Your terminal prompt will change to indicate the active environment (e.g., `(myenv) user@host:~/$`). Now, try installing your package again:
```bash
pip install <package-name>
```

**On Windows:**
Open your command prompt or PowerShell and navigate to your project directory. Then, run:
```cmd
python -m venv myenv
```
Replace `myenv` with your preferred environment name.
To activate the environment:
```cmd
myenv\Scripts\activate
```
Your command prompt will change to indicate the active environment (e.g., `(myenv) C:\Users\YourUser\Project>$`). Now, try installing your package again:
```cmd
pip install <package-name>
```

### ## Step 3: Install with User-Specific Permissions (Alternative)

If you don't want to use a virtual environment, or if you need to install a package globally but lack administrative access, you can tell `pip` to install the package only for the current user. This typically installs packages into your user's home directory, which you usually have write permissions for.

Run the `pip install` command with the `--user` flag:
```bash
pip install --user <package-name>
```
or on Windows:
```cmd
pip install --user <package-name>
```
This will attempt to install the package in a user-specific `site-packages` directory (e.g., `~/.local/lib/pythonX.Y/site-packages` on Linux/macOS, or `%APPDATA%\Python\PythonXY\site-packages` on Windows).

### ## Step 4: Use `sudo` (Linux/macOS - Use with Caution)

On Linux and macOS, if you are certain you need to install a package globally and understand the implications, you can use `sudo` to run `pip` with administrator privileges. **However, this is generally discouraged for routine package installations as it can lead to conflicts and security issues.** Use this only if you have a specific reason for global installation and are aware of the risks.

```bash
sudo pip3 install <package-name>
```
You will be prompted for your administrator password. Be absolutely sure you are installing the correct package from a trusted source.

### ## Step 5: Use Administrator Privileges (Windows - Use with Caution)

On Windows, if you need to install a package globally and have a valid reason, you can run your command prompt or PowerShell as an administrator.

1.  Search for "Command Prompt" or "PowerShell" in the Start menu.
2.  Right-click on the application.
3.  Select "Run as administrator."
4.  In the elevated command prompt/PowerShell window, navigate to your Python scripts directory if necessary, or directly run:
    ```cmd
    pip install <package-name>
    ```
    Again, this should be done with caution and only when necessary.

### ## Step 6: Check and Correct Directory Permissions (Advanced)

In rare cases, the permissions of the target directory might be incorrectly set even for the user who should own them. This is an advanced troubleshooting step.

**On Linux/macOS:**
You can use `ls -l /path/to/directory` to view permissions. If you suspect incorrect ownership, you might need to change it using `sudo chown -R your_user:your_group /path/to/directory`. However, modifying system directories directly is risky. It's much safer to use virtual environments.

**On Windows:**
Right-click the problematic directory in File Explorer, select "Properties," then go to the "Security" tab. You can check and edit permissions for users and groups. **Exercise extreme caution when modifying permissions on system folders.**

## Common Mistakes

A frequent mistake is to immediately resort to using `sudo` or running as administrator without considering virtual environments. While `sudo` can bypass the permission error, it often installs packages in a way that can conflict with your system's package manager or other Python installations, leading to harder-to-diagnose problems later. Another error is trying to install packages globally when the intention was a project-specific dependency; a virtual environment is the correct solution for project isolation. People also sometimes forget to activate their virtual environment after creating it, leading them to still encounter permission errors.

## Prevention Tips

The best way to prevent `[Errno 13] Permission denied` errors is to adopt a consistent workflow that avoids them from the start. Always use virtual environments for your Python projects. This not only prevents permission issues but also ensures that your project dependencies are isolated and reproducible. For each new project, create a new virtual environment. This practice keeps your global Python installation clean and minimizes the risk of conflicts. When sharing projects, include a `requirements.txt` file generated from your active virtual environment (`pip freeze > requirements.txt`) so others can easily recreate the environment and its dependencies.