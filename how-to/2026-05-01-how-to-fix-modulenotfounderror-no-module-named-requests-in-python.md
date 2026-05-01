---
title: "How to Fix `ModuleNotFoundError: No module named 'requests'` in Python"
date: "2026-05-01T15:56:53.932Z"
slug: "how-to-fix-modulenotfounderror-no-module-named-requests-in-python"
type: "how-to"
description: "Learn to resolve `ModuleNotFoundError: No module named 'requests'` in Python with this comprehensive guide, covering installation, virtual environments, and common pitfalls."
keywords: "Python, ModuleNotFoundError, requests module, pip install, virtual environment, package management, troubleshooting Python, Python error fix"
---

### Problem Explanation

The `ModuleNotFoundError: No module named 'requests'` is a common error encountered by Python developers. It indicates that the Python interpreter cannot find the `requests` library when your script attempts to import it. This typically occurs at the line `import requests` in your Python code.

When this error strikes, your program will halt execution, and you'll see a traceback similar to this:

```
Traceback (most recent call last):
  File "your_script_name.py", line 1, in <module>
    import requests
ModuleNotFoundError: No module named 'requests'
```

This error message is definitive: Python searched its configured module paths but couldn't locate a module named 'requests'. Without this module, any part of your script that relies on its functionality (like making HTTP requests) cannot proceed.

### Why It Happens

This specific `ModuleNotFoundError` arises primarily because the `requests` package is not installed within the Python environment that is executing your script. Unlike some built-in modules, `requests` is a third-party library, meaning it doesn't come pre-installed with Python itself. It needs to be explicitly installed using a package manager like `pip`.

The root causes often stem from:

1.  **Missing Installation:** The `requests` library has simply not been installed in your system or project's Python environment.
2.  **Incorrect Environment:** You might have multiple Python installations (e.g., system Python, Homebrew Python, Anaconda, various virtual environments), and `requests` was installed in one environment but your script is being run by a different one where it's absent.
3.  **Virtual Environment Not Activated:** If you are using a virtual environment (which is highly recommended), you might have forgotten to activate it before installing `requests` or before running your script. Consequently, your script runs against the global Python installation, which doesn't have the module.

Understanding that Python looks for modules in specific locations defined by its `sys.path` is crucial. If `requests` isn't in any of those locations for the *active* interpreter, the `ModuleNotFoundError` will occur.

### Step-by-Step Solution

This section provides a structured approach to diagnose and resolve the `ModuleNotFoundError: No module named 'requests'` error.

#### ## Step 1: Verify Your Python Installation and Environment

Before attempting any fixes, it's essential to understand which Python interpreter your system is using and which `pip` command is associated with it. This is a common source of confusion.

Open your terminal or command prompt and run the following commands:

```bash
python --version
pip --version
```
*   If `python --version` shows "Python 2.x.x", you might need to use `python3 --version` and `pip3 --version` to check your Python 3 installation.
*   The `pip --version` output will show `pip`'s version and the path to the Python installation it belongs to (e.g., `from /path/to/python/lib/python3.x/site-packages/pip`). Pay close attention to this path; it tells you which Python interpreter `pip` is managing.

If `pip` is not found, you might need to install `pip` for your Python version first. Refer to the official Python documentation for installing `pip`.

#### ## Step 2: Install `requests` Using `pip`

This is the most direct solution. Once you've identified the correct `pip` for your Python environment, use it to install the `requests` library.

In your terminal or command prompt, execute one of the following commands:

*   **For Python 3 (most common):**
    ```bash
    pip install requests
    ```
*   **If you have both Python 2 and Python 3 and `pip` defaults to Python 2:**
    ```bash
    pip3 install requests
    ```
*   **If you are certain about your Python interpreter and want to be explicit (recommended):**
    ```bash
    python -m pip install requests
    ```
    or
    ```bash
    python3 -m pip install requests
    ```
    Using `python -m pip` ensures that you are running the `pip` module associated with the *specific* Python interpreter that your `python` command points to. This helps avoid conflicts if you have multiple Python installations.

After execution, you should see output indicating that `requests` and its dependencies (like `charset_normalizer`, `idna`, `urllib3`, `certifi`) were successfully installed:

```
Collecting requests
  Downloading requests-X.X.X-py2.py3-none-any.whl (XX kB)
Collecting idna<4,>=2.5
  Downloading idna-X.X-py2.py3-none-any.whl (XX kB)
...
Successfully installed certifi-X.X.X charset-normalizer-X.X.X idna-X.X requests-X.X.X urllib3-X.X.X
```

#### ## Step 3: Utilize Python Virtual Environments (Highly Recommended)

For any serious Python development, virtual environments are indispensable. They create isolated Python environments for each project, preventing conflicts between package versions required by different projects.

1.  **Create a Virtual Environment:**
    Navigate to your project's root directory in the terminal. Then, create a virtual environment (e.g., named `venv` or `myenv`):
    ```bash
    python -m venv venv
    ```
    (Replace `python` with `python3` if necessary.)

2.  **Activate the Virtual Environment:**
    *   **On Linux/macOS:**
        ```bash
        source venv/bin/activate
        ```
    *   **On Windows (Command Prompt):**
        ```bash
        venv\Scripts\activate.bat
        ```
    *   **On Windows (PowerShell):**
        ```bash
        venv\Scripts\Activate.ps1
        ```
    You'll know the virtual environment is active when your terminal prompt changes to include the environment's name (e.g., `(venv) your_username@your_machine:~/your_project$`).

3.  **Install `requests` within the Activated Environment:**
    Now, with the virtual environment active, install `requests`. This installation will be confined to this specific environment.
    ```bash
    (venv) pip install requests
    ```
    Notice that you just use `pip` here, as `pip` inside an activated virtual environment automatically refers to that environment's `pip`.

4.  **Deactivate the Virtual Environment (when finished):**
    When you're done working on the project or want to switch to another, you can deactivate the environment:
    ```bash
    (venv) deactivate
    ```

#### ## Step 4: Verify the Installation

After installing, it's a good practice to confirm that `requests` is indeed available in your environment.

1.  **Check `pip show`:**
    If your virtual environment is active (or if you installed globally), you can use `pip show` to get details about the installed package:
    ```bash
    pip show requests
    ```
    This should output information like `Name: requests`, `Version: X.X.X`, `Location: /path/to/site-packages`. The `Location` is crucial; it should point to your active Python environment's `site-packages` directory.

2.  **Test in Python Interactive Shell:**
    Open a Python interactive shell and try importing `requests`:
    ```bash
    python
    >>> import requests
    >>> requests.__version__
    'X.X.X'
    >>> exit()
    ```
    If no `ModuleNotFoundError` occurs and `requests.__version__` displays a version number, the installation was successful.

#### ## Step 5: Run Your Python Script

With `requests` successfully installed in the correct Python environment, try running your original Python script again.

```bash
python your_script_name.py
```
If you are using a virtual environment, ensure it is activated before running your script. Your script should now execute without the `ModuleNotFoundError`.

### Common Mistakes

When encountering and trying to fix this error, people often make a few common mistakes:

*   **Installing in the Wrong Environment:** A frequent error is running `pip install requests` without activating the intended virtual environment. This installs `requests` globally (or into another default Python environment), but your script, running in a different environment, still can't find it. Always ensure your virtual environment is active.
*   **Using the Wrong `pip` or `python` command:** If you have multiple Python versions (e.g., Python 2 and Python 3) installed on your system, `pip` might point to Python 2 while your script uses Python 3. This leads to `requests` being installed for the wrong interpreter. Always use `pip3` or, better yet, `python -m pip` (or `python3 -m pip`) to explicitly link `pip` to the desired Python executable.
*   **Typo in Module Name:** While less common for `requests`, accidentally typing `pip install request` (singular) instead of `pip install requests` (plural) will fail to install the correct package.
*   **Forgetting to Reactivate:** If you close your terminal or switch projects, a virtual environment needs to be reactivated each time you return to that project. Forgetting to `source venv/bin/activate` will cause your script to fall back to the global environment.

### Prevention Tips

Preventing `ModuleNotFoundError` issues from recurring primarily involves adopting good Python development practices, especially regarding package management and environment isolation.

*   **Always Use Virtual Environments:** Make creating and activating a virtual environment the very first step for any new Python project. This isolates project dependencies, preventing conflicts and ensuring that `pip install` commands only affect the current project. This habit is the single most effective way to prevent dependency issues.
*   **Document Dependencies with `requirements.txt`:** After installing all necessary packages for a project within its virtual environment, generate a `requirements.txt` file. This file lists all the exact package versions your project needs:
    ```bash
    pip freeze > requirements.txt
    ```
    When starting on a new machine or with a fresh environment, you can then install all dependencies with a single command:
    ```bash
    pip install -r requirements.txt
    ```
*   **Be Explicit with `python -m pip`:** When installing packages, consistently use the `python -m pip install <package_name>` command (or `python3 -m pip install <package_name>`). This explicitly tells Python to use the `pip` module associated with the *currently invoked* `python` interpreter, significantly reducing ambiguity when multiple Python installations are present.
*   **Keep `pip` Updated:** Periodically update your `pip` installer to benefit from the latest features and bug fixes. You can do this by running:
    ```bash
    python -m pip install --upgrade pip
    ```
*   **Verify Environment Before Running:** Before executing a script that relies on specific libraries, take a moment to confirm that your virtual environment is active (if applicable) and that the Python interpreter you're using is the one where the libraries are installed.