---
title: "How to Fix \"'pip' is not recognized as an internal or external command\" on Windows"
date: "2026-06-07T11:47:15.797Z"
slug: "how-to-fix-pip-is-not-recognized-as-an-internal-or-external-command-on-windows"
type: "how-to"
description: "Resolved the \"'pip' is not recognized\" error on Windows by correctly adding Python to your system's PATH environment variable. Step-by-step guide."
keywords: "pip not recognized, windows pip error, python path, environment variables, command prompt python, fix pip, install python windows"
---

## Problem Explanation

You're trying to use `pip`, the package installer for Python, from your Windows Command Prompt or PowerShell, and you're met with a frustrating message:

```
'pip' is not recognized as an internal or external command, operable program or batch file.
```

This error means that your Windows operating system cannot find the `pip` executable file when you try to run it. It's like trying to ask someone to do a job, but they don't know where the tools are located. You can install Python, and even see your Python installation, but `pip` remains elusive.

## Why It Happens

The core reason behind this error is that the directory where the `pip` executable is located is not included in your system's `PATH` environment variable. The `PATH` variable is a list of directories that Windows searches through when you type a command. If `pip`'s location isn't in this list, Windows doesn't know where to look for it, and therefore, it reports that the command is not recognized.

This typically happens for a few reasons:
*   **Python not added to PATH during installation:** When you install Python on Windows, there's usually an option to "Add Python to PATH." If this box was unchecked, `pip` (and Python itself) won't be automatically discoverable.
*   **Multiple Python installations:** If you have several Python versions installed, or if Python was installed for all users versus just your user account, the `PATH` might not be updated correctly for the version you intend to use `pip` with.
*   **Manual installation or incomplete setup:** In some less common scenarios, a manual Python installation might have missed the step of updating the `PATH`.

## Step-by-Step Solution

Let's get `pip` recognized and working. This involves ensuring that the directories containing the `pip` executable are added to your system's PATH environment variable.

### Step 1: Locate Your Python and Scripts Directories

First, we need to find where Python and its associated scripts (where `pip` resides) are installed.

*   **If you know where Python is installed:** Navigate to that directory in File Explorer. For example, it might be something like `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39` or `C:\Python39`.
*   **If you don't know where Python is installed:**
    1.  Open Command Prompt or PowerShell.
    2.  Type `python` and press Enter. If Python is installed and in your PATH, it will show the Python version.
    3.  Type `import sys; print(sys.executable)` and press Enter. This will show the full path to your Python executable. The directory containing this file is your Python installation directory.
    4.  Once you have the Python installation directory (e.g., `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39`), you'll need to find the `Scripts` sub-directory within it. This is usually located at `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39\Scripts`. This `Scripts` folder is where `pip.exe` is usually found.

**Important:** Make a note of these two paths:
1.  The main Python installation directory (e.g., `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39`)
2.  The `Scripts` sub-directory within the Python installation (e.g., `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39\Scripts`)

### Step 2: Access Environment Variables Settings

Now, we'll modify the system's PATH variable.

1.  Press the **Windows key** on your keyboard.
2.  Type `environment variables` and select **"Edit the system environment variables"** from the search results.
3.  The "System Properties" window will appear. Click the **"Environment Variables..."** button at the bottom.

### Step 3: Edit the 'Path' Variable

In the "Environment Variables" window, you'll see two sections: "User variables for [YourUsername]" and "System variables."

1.  In the **"User variables"** section (or "System variables" if you want to make it available to all users), find the variable named `Path`.
2.  Select `Path` and click the **"Edit..."** button.

### Step 4: Add Python and Scripts Directories to PATH

This is the crucial step. You'll see a list of directories.

1.  Click the **"New"** button.
2.  Paste the **full path to your Python installation directory** (e.g., `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39`) that you found in Step 1.
3.  Click **"New"** again.
4.  Paste the **full path to your Python `Scripts` directory** (e.g., `C:\Users\YourUsername\AppData\Local\Programs\Python\Python39\Scripts`) that you found in Step 1.

*   **Order Matters (Sometimes):** While not always critical for `pip`, it's generally good practice to have your Python directories listed before other system directories that might contain executables with similar names. You can use the "Move Up" button to adjust the order if needed, though for this specific issue, just adding them is usually sufficient.

### Step 5: Save Changes

After adding both paths:

1.  Click **"OK"** on the "Edit Environment Variable" window.
2.  Click **"OK"** on the "Environment Variables" window.
3.  Click **"OK"** on the "System Properties" window.

### Step 6: Restart Your Command Prompt/PowerShell

**This is a very important step!** Environment variable changes are not retroactive for already open command windows.

1.  Close any Command Prompt or PowerShell windows you currently have open.
2.  Open a **new** Command Prompt or PowerShell window.

### Step 7: Verify the Fix

In your new Command Prompt or PowerShell window, type:

```bash
pip --version
```

If everything has been done correctly, you should now see output similar to this (the version number will vary):

```
pip 23.0.1 from C:\Users\YourUsername\AppData\Local\Programs\Python\Python39\Lib\site-packages\pip (python 3.9)
```

Congratulations! `pip` is now recognized.

## Common Mistakes

*   **Forgetting to restart the Command Prompt:** Many users add the path correctly but forget to close and reopen their command window. This is the most frequent reason why the fix doesn't seem to work immediately.
*   **Typing incorrect paths:** Double-check the exact spelling and capitalization of the directories you're adding. Even a small typo will prevent Windows from finding the executables.
*   **Adding the wrong directories:** Ensure you are adding the Python installation directory and its `Scripts` sub-directory, not just any random folder.
*   **Not adding both directories:** Sometimes, only the main Python directory is added, but `pip.exe` resides in the `Scripts` sub-folder. Both are necessary for `pip` to be recognized directly.
*   **Using quotes unnecessarily:** When entering paths into the environment variable editor, do not put quotation marks around the paths unless they contain spaces (which is less common for default Python installs). The system handles paths with spaces correctly without them in this context.

## Prevention Tips

To avoid this problem in the future:

*   **Always check "Add Python to PATH" during installation:** When you run the Python installer on Windows, actively look for the checkbox that says "Add Python X.Y to PATH" (where X.Y is your Python version) and make sure it's checked before proceeding with the installation. This is the simplest and most effective way to prevent this issue.
*   **Be mindful of custom installations:** If you're installing Python in a non-standard location or performing a highly customized installation, take extra care to note the exact installation paths and manually add them to your PATH if the installer doesn't prompt you.
*   **Use virtual environments:** For project-specific dependencies, always use Python virtual environments (like `venv` or `conda`). When a virtual environment is activated, its `Scripts` directory is temporarily added to your PATH, ensuring that the correct `pip` version for that environment is used without cluttering your global system PATH. This also helps avoid version conflicts between different projects.