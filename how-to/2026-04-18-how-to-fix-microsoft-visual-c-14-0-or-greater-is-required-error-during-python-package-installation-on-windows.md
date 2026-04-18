---
title: "How to Fix 'Microsoft Visual C++ 14.0 or greater is required' Error During Python Package Installation on Windows"
date: "2026-04-18T10:39:31.307Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Encountering 'Microsoft Visual C++ 14.0 or greater is required' during Python package installation on Windows? This guide provides a step-by-step solution to resolve the error by installing the necessary build tools."
keywords: "Python, Visual C++, 14.0, error, fix, Windows, package installation, pip, build tools, compiler, vcredist, vcpp, python installation error, C++ build tools, troubleshooting, development environment"
---

The world of Python development on Windows can sometimes present unique challenges, especially when dealing with packages that rely on compiled code. One of the most common and often perplexing errors for Windows users is the "Microsoft Visual C++ 14.0 or greater is required" message. This guide will walk you through understanding, diagnosing, and ultimately resolving this issue, getting you back to seamless Python development.

### Problem Explanation

When you attempt to install certain Python packages using `pip`, you might encounter a lengthy error message concluding with:

```
ERROR: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This error specifically appears during the `pip install` process for packages that contain C, C++, or Fortran extensions. Common examples include scientific computing libraries like `numpy`, `scipy`, `pandas`, data processing tools like `lxml` or `Pillow`, database connectors such as `psycopg2` or `mysqlclient`, and cryptography libraries like `cryptography`. Instead of successfully downloading and installing the package, your terminal or command prompt will flood with red error messages, ultimately pointing to the missing Visual C++ compiler.

### Why It Happens

At its core, this problem stems from how certain Python packages are distributed and installed. Many powerful Python libraries include components written in lower-level languages like C or C++ to achieve higher performance. When you run `pip install package-name`, `pip` first tries to find a pre-compiled binary package, often called a "wheel" file (e.g., `package_name-1.0-cp39-cp39-win_amd64.whl`), that perfectly matches your Python version and operating system. If a suitable wheel is found, the installation is usually quick and straightforward.

However, if `pip` cannot find a pre-compiled wheel for your specific setup (perhaps you're using a very new Python version, a less common architecture, or the package simply doesn't provide wheels), it will fall back to attempting to compile the package from its source distribution (sdist, usually a `.tar.gz` file). Compiling C or C++ code on Windows requires a specific compiler. The "Microsoft Visual C++ 14.0 or greater" error indicates that the necessary Microsoft Visual C++ compiler and associated build tools are not installed or not accessible on your system. Without these tools, `pip` cannot complete the compilation process, leading to the installation failure.

### Step-by-Step Solution

The solution involves installing the correct set of Microsoft C++ Build Tools that provide the compiler `pip` needs.

#### ## Step 1: Understand the Error and Confirm Your Environment

First, take a moment to confirm the exact error message you're seeing. The message "Microsoft Visual C++ 14.0 or greater is required" is a direct indicator that your system lacks the necessary C++ compiler. While not strictly necessary for this fix, it's good practice to know your Python version. You can check this by opening a Command Prompt or PowerShell and typing:

```cmd
python --version
```
or if you have multiple Python versions:
```cmd
py -3.9 --version
```
(Replace `3.9` with your specific Python version if needed). This information can be useful for troubleshooting other issues, but the Visual C++ Build Tools are generally compatible across recent Python versions.

#### ## Step 2: Download the Microsoft C++ Build Tools Installer

The error message itself conveniently provides the link to the solution. Open your web browser and navigate to:

`https://visualstudio.microsoft.com/visual-cpp-build-tools/`

On this page, look for a button or link typically labeled "Download Build Tools" or similar. Click this to download the `vs_buildtools.exe` installer. This executable is a small bootstrapping tool that will download the actual build components.

#### ## Step 3: Run the Visual Studio Installer and Select Workloads

Once `vs_buildtools.exe` has downloaded, run it. This will launch the Visual Studio Installer. You may be prompted to confirm administrative privileges.

1.  **Initial Setup:** The installer might first download some initial files and then present you with a screen to choose "workloads."
2.  **Select the "Desktop development with C++" Workload:** This is the most crucial step. In the "Workloads" tab of the Visual Studio Installer, find and **check the box next to "Desktop development with C++"**. This workload includes all the essential C++ compilers, libraries, and tools required for compiling C/C++ code on Windows.
3.  **Optional: Review Individual Components:** On the right-hand side, you can review the individual components that will be installed with the selected workload. Ensure that a component like "**MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)**" (the exact version number might vary depending on when you download, e.g., v142 for VS 2019, v141 for VS 2017) is selected. This is the actual compiler `pip` needs. You generally don't need to deselect anything within the "Desktop development with C++" workload unless you are severely constrained on disk space.
4.  **Install:** Click the "Install" button in the bottom right corner. The installer will then download and install the selected components. This process can take a significant amount of time, depending on your internet speed and system performance, as it downloads several gigabytes of data.

#### ## Step 4: Verify Installation (Optional but Recommended)

After the installation completes, it's a good idea to confirm that the compiler is now accessible.

1.  **Restart Command Prompt:** Close any existing Command Prompt or PowerShell windows and open a new one. This ensures that your system's `PATH` environment variable is refreshed to include the new compiler paths.
2.  **Test Compiler Availability:** In the new Command Prompt, type:
    ```cmd
    cl.exe
    ```
    If the installation was successful, you should see output from the Microsoft C/C++ Optimizing Compiler, including its version and usage information, rather than an error message like "'cl.exe' is not recognized as an internal or external command."

#### ## Step 5: Retry Python Package Installation

With the C++ Build Tools successfully installed, you can now retry installing the Python package that previously failed.

1.  **Navigate to Project (if applicable):** If you are working on a specific project, navigate to its directory.
2.  **Activate Virtual Environment (Crucial):** If you are using a Python virtual environment (which is highly recommended), ensure it is activated before attempting the installation. For example, if your virtual environment is named `venv`:
    ```cmd
    venv\Scripts\activate
    ```
3.  **Re-run `pip install`:** Execute the `pip install` command for your desired package:
    ```cmd
    pip install package-name
    ```
    This time, `pip` should find the necessary C++ compiler, proceed with compiling the source extensions, and successfully install the package.

#### ## Step 6: Address Specific Package Issues (If Still Failing)

In rare cases, even after installing the build tools, some packages might still present challenges due to specific dependencies or complex build processes.

*   **Unofficial Wheels (Last Resort):** For very stubborn packages, you can sometimes find unofficial pre-compiled Windows wheels online. A well-known resource for these is Christoph Gohlke's Python Extension Packages for Windows at `https://www.lfd.uci.edu/~gohlke/pythonlibs/`.
    *   **Caution:** These are unofficial and should be used with discretion. Always prioritize official methods.
    *   **Usage:** Download the `.whl` file that matches your specific Python version (e.g., `cp39` for Python 3.9) and system architecture (e.g., `win_amd64` for 64-bit Windows). Then, install it using `pip`:
        ```cmd
        pip install C:\path\to\downloaded_package-version-cpXX-cpXX-win_amd64.whl
        ```
*   **Check Package Documentation:** Some packages have very specific system requirements or recommend additional non-Python dependencies. Always consult the official documentation for the package you are trying to install.

### Common Mistakes

When troubleshooting this particular error, people often make a few common missteps:

*   **Installing the full Visual Studio IDE:** While the full Visual Studio IDE includes the C++ build tools, installing it is overkill for this problem. The "Desktop development with C++" workload within the Build Tools installer provides exactly what you need without the unnecessary bulk of the entire IDE.
*   **Installing the Visual C++ Redistributable:** The "Visual C++ Redistributable" packages (like `vcredist_x64.exe` or `vc_redist.x64.exe`) are for *running* applications that were compiled with Visual C++, not for *compiling* new ones. Installing these will not resolve the "Visual C++ 14.0 or greater is required" error.
*   **Forgetting to restart the Command Prompt/PowerShell:** After installing the build tools, the system's `PATH` environment variable needs to be updated. This typically happens when you open a new terminal session. If you try to run `pip install` in an old terminal window, it might still not find the compiler.
*   **Not activating the virtual environment:** If you're working within a virtual environment, always ensure it's active (`venv\Scripts\activate`) before attempting any `pip install` commands. Otherwise, the package might be installed globally or in the wrong environment, potentially leading to confusion later.
*   **Ignoring the exact error message:** The error message itself is highly descriptive and even provides the direct link to the solution. Skimming over it can lead to misdiagnosing the problem.

### Prevention Tips

Once you've successfully resolved this issue, consider these tips to minimize its recurrence and maintain a robust development environment:

*   **Utilize Virtual Environments:** Always use Python virtual environments (`venv` or `conda`) for your projects. While this doesn't directly prevent the compiler error, it isolates your project dependencies, making it much easier to manage specific package versions and troubleshoot environment-specific issues without affecting your global Python installation.
*   **Keep Build Tools Updated (Periodically):** The Microsoft C++ Build Tools are periodically updated. It's a good practice to occasionally check for updates via the Visual Studio Installer, especially after major Windows updates or upgrading your Python version. Newer Python versions might sometimes implicitly rely on slightly newer compiler features.
*   **Prioritize Official Wheels:** Whenever possible, rely on `pip` to automatically find and install official pre-compiled wheels. These are usually optimized and avoid the compilation step entirely. Most popular packages provide wheels for common Python versions and Windows architectures.
*   **Read Package-Specific Documentation:** Some specialized Python packages might have additional, unique system requirements beyond the general C++ compiler. Always review the installation instructions or dependencies section in the official documentation for any new package you plan to use, especially those known for complex builds (e.g., geospatial libraries, advanced scientific computing).
*   **Consider Windows Subsystem for Linux (WSL):** For complex development workflows or if you frequently encounter compilation challenges on Windows, consider using the Windows Subsystem for Linux (WSL). WSL allows you to run a Linux distribution directly on Windows, providing access to standard Linux development tools and compilers (like GCC) which are often more straightforward to manage for certain open-source projects.