---
title: "How to Fix \"File Not Found\" Error When Running Python Scripts"
date: "2026-06-27T21:02:18.560Z"
slug: "how-to-fix-file-not-found-error-when-running-python-scripts"
type: "how-to"
description: "Resolve Python's `FileNotFoundError` by understanding current working directories, verifying paths, checking typos, and implementing robust path handling."
keywords: "Python, FileNotFoundError, file not found, Python error, script error, path error, os module, absolute path, relative path, current working directory, troubleshooting, programming, fix"
---

## Problem Explanation

When running a Python script, encountering a `FileNotFoundError` is a common issue, often causing the script to terminate abruptly. This error specifically indicates that the Python interpreter cannot locate a file that your script is attempting to access. You will typically see an error message similar to one of these examples:

```
FileNotFoundError: [Errno 2] No such file or directory: 'data.csv'
```
or
```
FileNotFoundError: [Errno 2] No such file or directory: '/var/log/app/config.json'
```

The crucial part of this message is the path or filename enclosed in single quotes, which specifies exactly what file Python failed to find. This isn't an error in your Python code's logic, but rather a problem with how your script perceives the location of a file it needs to read from, write to, or even execute (if it's another script).

## Why It Happens

The `FileNotFoundError` fundamentally occurs because the path provided to Python for a specific file does not correspond to an actual file on the filesystem that Python can access from its current context. The root causes often boil down to one of the following:

1.  **Incorrect File Path:** The most frequent culprit is a typo in the filename or the directory path, or an incorrect understanding of whether an absolute or relative path is needed.
2.  **Current Working Directory (CWD) Mismatch:** When using relative paths (e.g., `data.txt`), Python looks for the file relative to the CWD *at the time the script is executed*, not necessarily the directory where the script itself resides. If you run the script from a different directory than intended, the relative path will fail.
3.  **File Does Not Exist:** The file genuinely does not exist at the specified location, perhaps it was deleted, moved, or never created.
4.  **Case Sensitivity:** While Windows typically handles file paths as case-insensitive, Linux and macOS are case-sensitive. A mismatch in case (e.g., `data.csv` vs. `Data.csv`) can lead to a `FileNotFoundError` on case-sensitive systems.
5.  **Permissions (Less Common for `FileNotFoundError`):** While `PermissionDeniedError` is the direct outcome of insufficient permissions, in rare cases, a system might report a file as "not found" if it cannot even *see* the file due to very restrictive directory permissions. However, this is less common than a direct path issue.

## Step-by-Step Solution

### Step 1: Understand the Error Message and Current Working Directory (CWD)

The first step is to carefully read the `FileNotFoundError` message. The string immediately after `No such file or directory:` is the exact path or filename Python tried to access. Make note of this.

Next, identify your script's Current Working Directory (CWD) when the error occurred. This is crucial for understanding how relative paths are resolved.

*   **From Python:** You can add `import os; print(os.getcwd())` to your script temporarily to see the CWD.
*   **From Terminal/Command Prompt:**
    *   **Linux/macOS:** Use `pwd`
    *   **Windows:** Use `cd`

Compare the CWD with the path mentioned in the error. If the path in the error is relative (e.g., `my_data.txt`), Python expects `my_data.txt` to be *inside* the CWD.

### Step 2: Verify File Existence and Path Manually

Once you know the problematic path and your CWD, manually confirm if the file exists at that exact location.

*   **For relative paths:** Navigate to the CWD using your terminal or file explorer. Then, check if the file specified in the error exists directly within that directory.
*   **For absolute paths:** Navigate directly to the absolute path specified in the error message.

Use the following commands in your terminal or command prompt:

*   **Linux/macOS:** `ls -l /path/to/your/file.txt` (replace with the full path from the error)
*   **Windows (Command Prompt):** `dir C:\path\to\your\file.txt`
*   **Windows (PowerShell):** `Get-Item C:\path\to\your\file.txt`

If these commands also report that the file doesn't exist, you've confirmed the problem.

### Step 3: Use Absolute Paths for Certainty

Absolute paths specify the full location of a file starting from the root of the filesystem (e.g., `/home/user/documents/data.csv` on Linux/macOS, or `C:\Users\User\Documents\data.csv` on Windows). Using absolute paths eliminates ambiguity related to the CWD.

To use an absolute path:

1.  Find the absolute path to your file.
    *   **Linux/macOS:** `realpath my_data.csv` (if `my_data.csv` is in your current directory)
    *   **Windows:** Right-click the file in File Explorer, select "Properties," and copy the "Location" and "File name" to construct the full path.
2.  Replace the relative path in your Python script with the absolute path.

**Example:**
Instead of:
```python
with open('data.csv', 'r') as f:
    # ...
```
Use:
```python
# Linux/macOS example
with open('/home/youruser/projects/my_app/data.csv', 'r') as f:
    # ...

# Windows example (note double backslashes or forward slashes for Python strings)
with open('C:\\Users\\youruser\\Documents\\data.csv', 'r') as f:
    # ...
# Or use raw string literal (r'...')
with open(r'C:\Users\youruser\Documents\data.csv', 'r') as f:
    # ...
# Or use forward slashes (Python handles them cross-platform for Windows paths too)
with open('C:/Users/youruser/Documents/data.csv', 'r') as f:
    # ...
```

### Step 4: Correctly Handle Relative Paths

If you prefer relative paths (often better for portability), ensure they are relative to a predictable location.

*   **Option A: Run Script from Correct Directory:**
    The simplest fix for relative paths is to ensure you run your Python script from the directory where Python expects the file to be. If your script `main.py` needs `data.csv` which is in the same directory, execute `python main.py` *from that directory*.

*   **Option B: Path Relative to Script's Location:**
    A robust way to use relative paths is to make them relative to the *script's own directory*, regardless of the CWD.

    ```python
    import os

    # Get the directory where the current script is located
    script_dir = os.path.dirname(__file__)

    # Construct the full path to 'data.csv' relative to the script's directory
    file_path = os.path.join(script_dir, 'data.csv')

    try:
        with open(file_path, 'r') as f:
            print(f"Successfully opened: {file_path}")
            # ... process file ...
    except FileNotFoundError:
        print(f"Error: The file '{file_path}' was not found.")
    ```
    This method ensures that `data.csv` is always looked for next to `__file__`, regardless of where the script is executed from.

### Step 5: Check for Typos and Case Sensitivity

Even a single character difference or incorrect capitalization can lead to a `FileNotFoundError`.

*   **Double-check Filename and Extension:** Ensure the filename (e.g., `report.csv` vs. `reports.csv`) and its extension (e.g., `data.txt` vs. `data.csv`) are exact.
*   **Case Sensitivity:** On Linux and macOS, `Data.csv` is different from `data.csv`. Ensure your script's path matches the actual file's casing exactly. Windows is generally more forgiving but it's good practice to match cases.
*   **Invisible Characters:** Occasionally, invisible characters (like a trailing space) can be copied into a filename. Using `os.listdir()` to print directory contents can help reveal exact names.

### Step 6: Confirm File Permissions (If Other Steps Fail)

While less common for `FileNotFoundError`, if you've exhaustively checked paths and existence, a severe permission restriction might prevent Python from even "seeing" the file.

*   **Linux/macOS:** Use `ls -l /path/to/directory` to check permissions on the file and its parent directories. Ensure the user running the Python script has read (`r`) permission on the file and execute (`x`) permission on all directories in the path leading to it.
*   **Windows:** Right-click the file -> "Properties" -> "Security" tab. Check if the user account running the script has "Read" permissions.

### Step 7: Implement Robust Error Handling with `try-except`

For production-ready scripts or situations where a file might genuinely be missing (e.g., user input for a file path), it's good practice to handle `FileNotFoundError` gracefully using a `try-except` block. This prevents your script from crashing and allows you to provide a user-friendly message or fall back to an alternative.

```python
import os

filename = 'my_important_data.csv'
file_path = os.path.join(os.path.dirname(__file__), filename) # Path relative to script

try:
    with open(file_path, 'r') as f:
        content = f.read()
        print(f"File '{filename}' read successfully. Content snippet: {content[:50]}...")
except FileNotFoundError:
    print(f"Error: The file '{filename}' could not be found at '{file_path}'.")
    print("Please ensure the file exists and the path is correct.")
    # You could also log the error, exit gracefully, or prompt the user for a new path
except Exception as e:
    print(f"An unexpected error occurred: {e}")

print("Script continues after error handling.")
```

## Common Mistakes

*   **Assuming CWD is Script's Directory:** Many users assume that if their script is in `/project/script.py` and accesses `data.csv`, then `data.csv` must be in `/project/`. However, if they execute `python /project/script.py` from `/` (the root directory), the CWD is `/`, and `data.csv` won't be found unless its path is `/project/data.csv`.
*   **Ignoring Case Sensitivity:** Especially when developing on Windows and deploying on Linux, forgetting that `myfile.TXT` is different from `myfile.txt` on Linux systems.
*   **Hardcoding Incorrect Path Separators:** Using Windows-style backslashes (`\`) in paths (e.g., `C:\data\file.txt`) on Linux/macOS, or vice-versa, without using `os.path.join` or `pathlib`.
*   **Forgetting File Extensions:** Specifying `my_document` instead of `my_document.docx` or `my_document.txt`.
*   **Not Looking at the Full Error Message:** The error message specifically tells you *what* file was not found. Often, just reading that path closely reveals the mistake.

## Prevention Tips

*   **Always Use `os.path.join` or `pathlib`:** These modules handle path construction in an OS-agnostic way, correctly using `/` or `\` separators. This prevents errors when moving scripts between different operating systems.
    ```python
    import os
    # Example using os.path.join
    config_dir = os.path.join(os.path.dirname(__file__), 'config')
    config_file = os.path.join(config_dir, 'settings.json')

    # Example using pathlib (more modern and often preferred)
    from pathlib import Path
    script_path = Path(__file__)
    config_file_path = script_path.parent / 'config' / 'settings.json'
    ```
*   **Prefer Paths Relative to the Script:** For files integral to your script (e.g., configuration files, data files), construct paths relative to the script's own location using `os.path.dirname(__file__)` or `Path(__file__).parent`. This makes your script portable regardless of where it's executed from.
*   **Validate Paths Early:** Before attempting to open a file, use `os.path.exists()` or `Path.exists()` to check if it's present. This allows for cleaner error messages or alternative logic.
    ```python
    import os
    from pathlib import Path

    file_to_check = Path(__file__).parent / 'important_resource.txt'

    if not file_to_check.exists():
        print(f"Warning: Required resource '{file_to_check}' does not exist. Creating a dummy one.")
        with open(file_to_check, 'w') as f:
            f.write("Default content")
    else:
        print(f"Resource '{file_to_check}' found.")
    ```
*   **Implement Robust Error Handling:** As shown in Step 7, using `try-except FileNotFoundError` blocks around file operations is critical for creating resilient applications that don't crash due to missing files, especially in production environments or user-facing tools.
*   **Use Configuration Files for Variable Paths:** For paths that might change based on deployment environment (e.g., log directories, data storage locations), store them in a configuration file (like `config.ini` or `settings.py`) rather than hardcoding them in your script.