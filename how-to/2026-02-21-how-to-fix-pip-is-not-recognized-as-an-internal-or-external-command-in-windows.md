---
title: "How to Fix \"'pip' is not recognized as an internal or external command\" in Windows"
date: "2026-02-21T01:55:09.752Z"
slug: "how-to-fix-pip-is-not-recognized-as-an-internal-or-external-command-in-windows"
type: "how-to"
description: "Resolve the common \"'pip' is not recognized\" error in Windows by ensuring Python and pip are correctly installed and added to your system's PATH. This guide provides a step-by-step solution for Windows users."
keywords: "pip not recognized, windows pip error, python PATH, command prompt, environment variables, pip installation, fix python command, windows command line"
---

# How to Fix "'pip' is not recognized as an internal or external command" in Windows

## Problem Explanation

You're trying to install a Python package using the `pip` command in your Windows Command Prompt or PowerShell, perhaps something like `pip install requests`, and instead of seeing the installation process begin, you are met with a frustrating error message:

```
'pip' is not recognized as an internal or external command, operable program or batch file.
```

This message signifies that your Windows operating system does not know where to find the `pip` executable. It's a common roadblock for developers and users who are new to Python or have recently set up a new development environment. The inability to run `pip` means you cannot easily install, upgrade, or manage Python packages, which are essential for most Python development workflows.

## Why It Happens

The root cause of the "'pip' is not recognized" error is almost always related to how your system's environment variables are configured, specifically the `PATH` variable. The `PATH` variable is a list of directories that Windows searches through whenever you type a command without specifying its full location. When you install Python, especially if you don't select the option to "Add Python to PATH" during installation, the directory containing the `pip` executable (and the Python interpreter itself) is not included in this list. Consequently, when you type `pip`, Windows looks for it in all the directories listed in `PATH`, can't find it, and reports that the command is not recognized.

Another potential, though less common, reason is that Python and pip were not installed correctly in the first place, or a previous installation was corrupted. This could happen due to interrupted installations, disk errors, or conflicts with other software. Ensuring a clean and complete installation, followed by proper PATH configuration, is key to resolving this issue.

## Step-by-Step Solution

Follow these steps to diagnose and fix the "'pip' is not recognized" error in Windows.

### Step 1: Verify Python and Pip Installation

Before making any changes, confirm that Python and `pip` are actually installed on your system.

1.  Open **Command Prompt** or **PowerShell**. You can do this by typing `cmd` or `powershell` in the Windows search bar and pressing Enter.
2.  Type the following command and press Enter:
    ```bash
    python --version
    ```
    If Python is installed and recognized, you will see its version number (e.g., `Python 3.9.7`). If you get a similar "'python' is not recognized" error, you'll need to install Python first. You can download it from the official Python website: [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/). **Crucially, on the installer's first screen, make sure to check the box that says "Add Python X.X to PATH" (where X.X is your Python version).**
3.  If Python is recognized, try verifying `pip`:
    ```bash
    pip --version
    ```
    If this command works, `pip` is recognized, and the issue is likely resolved (or was a temporary glitch). If it still shows the "'pip' is not recognized" error, proceed to the next steps.

### Step 2: Locate the Python and Pip Installation Directories

If `pip --version` still fails, you need to find where Python and its associated `Scripts` folder (where `pip.exe` resides) are installed.

1.  Open **Command Prompt** or **PowerShell**.
2.  Run the following command to find your Python installation path:
    ```bash
    where python
    ```
    This command will output the full path(s) to your Python executable(s). Note the directory shown. For example, it might look like `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39\python.exe`.
3.  The `pip` executable is typically located in a `Scripts` subdirectory within your Python installation. Based on the output from the `where python` command, navigate to that directory and look for a `Scripts` folder. For instance, if `python.exe` is in `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39`, then `pip.exe` should be in `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39\Scripts`.

### Step 3: Access Environment Variables Settings

Now you need to add these directories to your system's `PATH` environment variable.

1.  Press the **Windows key + S** to open the search bar.
2.  Type `environment variables` and select **"Edit the system environment variables"**.
3.  In the System Properties window, click the **"Environment Variables..."** button.

### Step 4: Add Python and Scripts Directories to PATH

In the "Environment Variables" window, you'll see two sections: "User variables for [YourUsername]" and "System variables". It's generally recommended to add to your User variables for simplicity and to avoid potential system-wide conflicts unless you are sure you want it available for all users.

1.  In the **"User variables for [YourUsername]"** section, find the variable named **`Path`**.
2.  Select the `Path` variable and click the **"Edit..."** button.
3.  In the "Edit environment variable" window, click **"New"**.
4.  Paste the **full path to your Python installation directory** (e.g., `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39`) into the new line.
5.  Click **"New"** again.
6.  Paste the **full path to your Python `Scripts` directory** (e.g., `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39\Scripts`) into the next new line. This `Scripts` directory is crucial as it contains `pip.exe`.

### Step 5: Save Changes and Restart Command Prompt

It's essential to properly save your changes and restart your command-line interface for them to take effect.

1.  Click **"OK"** on the "Edit environment variable" window.
2.  Click **"OK"** on the "Environment Variables" window.
3.  Click **"OK"** on the "System Properties" window.
4.  **Close any Command Prompt or PowerShell windows that are currently open.** This is a critical step; existing windows will not pick up the new environment variable settings.
5.  Open a **new** Command Prompt or PowerShell window.

### Step 6: Test Pip Recognition

With a fresh command-line session, verify that `pip` is now recognized.

1.  In the new Command Prompt or PowerShell window, type:
    ```bash
    pip --version
    ```
    You should now see the `pip` version and its location, confirming that the fix was successful. You can now proceed to use `pip` commands like `pip install package_name`.

## Common Mistakes

One of the most frequent errors when trying to fix this problem is forgetting to **close and reopen the Command Prompt or PowerShell window** after modifying the environment variables. Environment variables are loaded when a command-line session starts, so any changes made while a window is open will not be applied until that window is closed and a new one is launched.

Another common mistake is **incorrectly specifying the path**. Ensure you are copying the *exact* directory paths for both your Python installation and its `Scripts` subfolder. Typos or missing components in the path will prevent Windows from finding the executables. Users also sometimes add only the Python directory and forget to add the `Scripts` directory, which is where `pip.exe` is actually located. Finally, some users might try to add `pip.exe` directly to the PATH instead of the directory containing it; the PATH variable lists directories, not individual executables.

## Prevention Tips

The most straightforward way to prevent the "'pip' is not recognized" error from occurring in the first place is to **select the "Add Python X.X to PATH" option during the initial Python installation**. This option, usually found on the first screen of the Python installer, automates the process of adding the necessary directories to your system's `PATH` variable.

If you are installing Python on a shared or multi-user system, you might consider adding Python to the **System variables** `Path` instead of User variables, though this requires administrator privileges. However, for most individual users, relying on the installer's "Add to PATH" option for User variables is sufficient and recommended. Regularly checking your Python installation and its PATH configuration, especially after major system updates or when setting up new development environments, can also help you catch and fix potential issues before they become a problem.