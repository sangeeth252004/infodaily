---
title: "How to Fix 'ModuleNotFoundError: No module named 'requests'' in Python"
date: "2026-10-03T03:50:51.757Z"
slug: "how-to-fix-modulenotfounderror-no-module-named-requests-in-python"
type: "how-to"
description: "Learn how to resolve the common Python error 'ModuleNotFoundError: No module named 'requests'' with this comprehensive, step-by-step guide."
keywords: "Python, ModuleNotFoundError, requests, pip, install, environment, virtual environment, package, module, fix, error, troubleshooting"
---

# How to Fix 'ModuleNotFoundError: No module named 'requests'' in Python

Encountering a `ModuleNotFoundError: No module named 'requests'` can be a frustrating roadblock when you're trying to fetch data from the web in your Python projects. This error typically pops up when your Python script attempts to import the `requests` library, but Python can't find it in its installed packages.

When this error occurs, you'll likely see a traceback in your terminal or IDE that looks something like this:

```
Traceback (most recent call last):
  File "your_script_name.py", line 1, in <module>
    import requests
ModuleNotFoundError: No module named 'requests'
```

This message clearly indicates that Python looked for a module named 'requests' and couldn't locate it anywhere in its search path.

## Why It Happens

The `ModuleNotFoundError: No module named 'requests'` error occurs because the `requests` library, which is not a built-in part of Python's standard library, needs to be explicitly installed in your Python environment. Python relies on these installed packages to provide extended functionality beyond its core features. When you try to `import requests` without having it installed, Python doesn't know where to find the code for this library, leading to the `ModuleNotFoundError`.

This issue is particularly common for new Python users or when working in a fresh development environment where essential third-party libraries haven't been set up yet. It can also arise if you're switching between different Python installations or virtual environments and the library isn't present in the active one.

## Step-by-Step Solution

The most straightforward way to fix this error is by installing the `requests` library using `pip`, Python's package installer. Here’s how to do it:

### Step 1: Open Your Terminal or Command Prompt

First, you need to access your system's command-line interface.
*   **On Windows:** Search for "Command Prompt" or "PowerShell" in the Start menu and open it.
*   **On macOS:** Open the "Terminal" application, which can be found in Applications > Utilities.
*   **On Linux:** Open your preferred terminal emulator.

### Step 2: Check Your Python Version (Optional but Recommended)

It's a good practice to know which Python version you are currently using. This can help if you have multiple Python installations. Type the following command and press Enter:

```bash
python --version
# or
python3 --version
```

This will display the version of Python that your system is configured to use by default. If you are using a specific version like `python3.9`, you might need to use `pip3` instead of `pip` in the next steps.

### Step 3: Install the 'requests' Library using pip

Now, you'll use `pip` to download and install the `requests` package. In your terminal, type the following command and press Enter:

```bash
pip install requests
```

If you are on a system where `pip` is linked to an older Python version, or if you explicitly use `python3` commands, you might need to use `pip3`:

```bash
pip3 install requests
```

`pip` will then connect to the Python Package Index (PyPI), download the `requests` library and any of its dependencies, and install them into your current Python environment. You should see output indicating the progress of the installation.

### Step 4: Verify the Installation

After the installation completes, you can quickly verify that `requests` has been installed successfully. Open a Python interactive interpreter by typing `python` or `python3` in your terminal and pressing Enter. Then, try to import `requests`:

```python
>>> import requests
>>> print(requests.__version__)
```

If the `import requests` command runs without any errors and `print(requests.__version__)` displays a version number (e.g., `2.31.0`), then the installation was successful. You can exit the interpreter by typing `exit()` and pressing Enter.

### Step 5: Rerun Your Python Script

Navigate back to the directory where your Python script is located (if you are not already there) and run your script again.

```bash
python your_script_name.py
# or
python3 your_script_name.py
```

The `ModuleNotFoundError: No module named 'requests'` error should now be resolved, and your script should be able to import and use the `requests` library.

### Step 6: Consider Virtual Environments

If you are working on multiple Python projects, it is highly recommended to use virtual environments. If you are not using a virtual environment, the `requests` library is installed globally for your Python installation. If you *are* using a virtual environment, ensure that it is activated **before** you run `pip install requests` and **before** you run your Python script.

To create and activate a virtual environment (using Python's built-in `venv` module):

1.  **Navigate to your project directory** in the terminal.
2.  **Create the virtual environment:**
    ```bash
    python -m venv venv
    # or
    python3 -m venv venv
    ```
    (This creates a directory named `venv` within your project folder.)
3.  **Activate the virtual environment:**
    *   **On Windows:**
        ```bash
        venv\Scripts\activate
        ```
    *   **On macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```
    You'll see `(venv)` at the beginning of your terminal prompt, indicating that the virtual environment is active.
4.  **Install `requests` within the activated environment:**
    ```bash
    pip install requests
    ```
5.  **Run your script** while the virtual environment is active:
    ```bash
    python your_script_name.py
    ```

Using virtual environments isolates project dependencies, preventing conflicts and ensuring that each project has its own set of installed libraries.

## Common Mistakes

One common mistake is attempting to install `requests` in the wrong Python environment. If you have multiple Python versions installed (e.g., Python 2.7, Python 3.7, Python 3.10), you need to ensure you are using the `pip` command that corresponds to the Python interpreter running your script. For example, if your script is run with `python3`, you must use `pip3 install requests`.

Another pitfall is forgetting to activate a virtual environment before installing packages. If you install `requests` globally when you intended to install it only for a specific project using a virtual environment, the script running within that project (without the environment activated) won't find the package. Conversely, if you activate a virtual environment but then try to use a globally installed `pip` command that installs the package elsewhere, it also won't be found in the active environment.

## Prevention Tips

To prevent the `ModuleNotFoundError: No module named 'requests'` error from recurring, embrace best practices in your Python development workflow. The most effective method is to consistently use **virtual environments** for every Python project. This creates isolated spaces for your dependencies, ensuring that installations for one project don't interfere with others. When you start a new project, create a virtual environment, activate it, and then install all necessary packages, including `requests`, within that environment.

Maintain a `requirements.txt` file for your project. This file lists all the external libraries your project depends on. After installing all necessary packages in your virtual environment, you can generate this file with:

```bash
pip freeze > requirements.txt
```

When you or someone else needs to set up the project on a different machine, they can simply activate the virtual environment and run:

```bash
pip install -r requirements.txt
```

This command installs all packages listed in `requirements.txt` into the active environment, ensuring a consistent and reproducible setup and preventing forgotten dependencies.