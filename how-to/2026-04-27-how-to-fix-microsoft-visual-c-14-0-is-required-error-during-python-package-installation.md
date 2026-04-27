---
title: "How to Fix \"Microsoft Visual C++ 14.0 is required\" Error During Python Package Installation"
date: "2026-04-27T16:25:28.410Z"
slug: "how-to-fix-microsoft-visual-c-14-0-is-required-error-during-python-package-installation"
type: "how-to"
description: "Resolve the \"Microsoft Visual C++ 14.0 is required\" error when installing Python packages on Windows. This guide explains the cause and provides step-by-step instructions to install the necessary Visual C++ Build Tools."
keywords: "Microsoft Visual C++ 14.0, Python package installation, pip error, C++ build tools, Visual Studio Build Tools, Windows, compiler error, Python C extensions, py_compile"
---

### Problem Explanation

When attempting to install certain Python packages using `pip` on a Windows operating system, users frequently encounter an error message indicating that "Microsoft Visual C++ 14.0 is required." This error typically halts the installation process, preventing the package from being successfully added to your Python environment. The console output often displays a lengthy traceback, culminating in a clear statement like:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This issue arises because the Python package you are trying to install contains C or C++ extensions that need to be compiled directly on your machine. Without the necessary compiler installed and configured, `pip` cannot complete the compilation step, leading to the reported error and a failed installation.

### Why It Happens

The root cause of this error lies in the nature of some Python packages. Many performance-critical or low-level Python libraries (like `numpy`, `scipy`, `pandas`, `cryptography`, `lxml`, etc.) are written partly in C or C++ for speed and direct interaction with system resources. When you install these packages, Python's `distutils` (or `setuptools`) tries to compile these C/C++ source files into binary modules that Python can then import.

On Windows, Python expects to use the Microsoft Visual C++ compiler for this task. Specifically, "Microsoft Visual C++ 14.0" refers to the compiler toolset that shipped with Visual Studio 2015, and subsequent versions of Visual Studio (2017, 2019, 2022) provide compatible versions, often identified as "14.0 or greater." If you do not have the appropriate Visual C++ Build Tools installed on your system, or if they are installed but not correctly configured in your system's PATH, `pip` cannot find the compiler, resulting in the "required" error message.

### Step-by-Step Solution

The most robust solution involves installing the official Microsoft Visual C++ Build Tools. These tools provide the necessary compiler and associated libraries without requiring a full Visual Studio IDE installation.

#### Step 1: Download the Visual Studio Build Tools

Navigate to the official Microsoft Visual Studio download page. You'll want the "Build Tools for Visual Studio." It's generally recommended to download the latest stable version (e.g., Visual Studio 2022 Build Tools) as it provides backward compatibility for the "14.0" compiler requirement.

*   Open your web browser and go to: `https://visualstudio.microsoft.com/downloads/`
*   Scroll down to the "Tools for Visual Studio" section.
*   Locate "Build Tools for Visual Studio 2022" (or the latest available year) and click the "Download" button next to it.
*   Save the installer executable (e.g., `vs_buildtools__*.exe`) to your downloads folder.

#### Step 2: Run the Build Tools Installer

Once the installer is downloaded, run it with administrative privileges to ensure proper installation.

*   Right-click on the downloaded `vs_buildtools__*.exe` file.
*   Select "Run as administrator."
*   Accept the User Account Control (UAC) prompt if it appears.
*   The Visual Studio Installer will launch and may download some initial files.

#### Step 3: Select Required Workloads

This is the most critical step. You need to select the specific components that include the C++ compiler.

*   In the Visual Studio Installer window, you will see a list of "Workloads."
*   **Select the "Desktop development with C++" workload.** This single selection typically includes all the necessary C++ build tools, Windows SDK, and other components required for Python extensions.
*   Alternatively, if you want a minimal installation, you can switch to the "Individual components" tab and select:
    *   "MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)" (or similar version for VS 2019/2017).
    *   "Windows 10 SDK" or "Windows 11 SDK" (choose the latest stable version).
*   Review the "Space required" on the bottom right to ensure you have enough disk space.
*   Click the "Install" button.

#### Step 4: Complete the Installation

Allow the installer to download and install the selected components. This process can take a significant amount of time depending on your internet connection and chosen components, as it can be several gigabytes in size.

*   Do not interrupt the installation.
*   Once the installation is complete, you may be prompted to restart your computer. It is highly recommended to do so, as it ensures all system environment variables are correctly updated.

#### Step 5: Verify the Installation and Retry Python Package Installation

After the system restart (if prompted), open a new command prompt or PowerShell window. It's important to open a *new* window so that any updated environment variables are loaded.

*   **Do not use the same command prompt window you were using before the installation.**
*   Open a new command prompt (e.g., by typing `cmd` in the Start menu search and pressing Enter).
*   If you are using a Python virtual environment, activate it before attempting the installation.
*   Retry installing the problematic Python package:
    ```bash
    pip install <package-name>
    ```
*   If the installation proceeds without the "Microsoft Visual C++ 14.0 is required" error, you have successfully resolved the issue.

#### Step 6: Consider Pre-compiled Wheels (Optional Alternative/Fallback)

If, for some reason, installing the Build Tools does not resolve the issue, or if you prefer to avoid compiling packages, you can sometimes find pre-compiled binary packages known as "wheels" (`.whl` files).

*   Check PyPI: Some packages provide wheels that cover common Python versions and architectures. `pip` will automatically prefer wheels if available.
*   Unofficial Wheels: For some very difficult-to-compile packages, community-maintained unofficial wheel repositories exist (e.g., `https://www.lfd.uci.edu/~gohlke/pythonlibs/`). You can download the appropriate `.whl` file for your Python version and architecture (e.g., `cp39` for Python 3.9, `win_amd64` for 64-bit Windows) and install it directly:
    ```bash
    pip install path/to/your/downloaded/package_name-version-pyXY-none-any.whl
    ```
    However, always be cautious when using unofficial sources.

### Common Mistakes

1.  **Installing the Wrong Visual Studio Product:** A common mistake is installing a full Visual Studio IDE (Community, Professional, Enterprise) instead of just the "Build Tools." While a full IDE *does* include the necessary compilers, it's a much larger download and installation than typically needed for just Python development. The "Build Tools" are sufficient and more lightweight.
2.  **Not Selecting the Correct Workload/Components:** Simply running the Build Tools installer isn't enough; you *must* explicitly select the "Desktop development with C++" workload or the specific "MSVC C++ build tools" and "Windows SDK" components during installation. Forgetting this step means the compiler is still missing.
3.  **Not Restarting After Installation:** While not always strictly necessary, system restarts ensure that environment variables are correctly updated, allowing your command prompt to locate the newly installed compiler. Failing to restart can lead to the error persisting even after a successful installation of the build tools.
4.  **Using an Old Command Prompt:** If you install the build tools and then try to run `pip install` in the *same* command prompt window that was open during the installation, it might not pick up the new environment variables. Always open a fresh command prompt window after installing system-level tools.
5.  **Conflicting Python Installations:** Having multiple Python installations or incorrectly managed virtual environments can sometimes lead to issues where `pip` points to one environment, but the system's PATH or compiler setup points to another. Ensure you're working within your intended Python environment.

### Prevention Tips

1.  **Utilize Virtual Environments:** Always work within Python virtual environments (e.g., using `venv` or `conda`). This isolates your project dependencies, prevents conflicts between projects, and makes it easier to troubleshoot installation issues without affecting your global Python installation.
2.  **Prefer Pre-compiled Wheels:** Whenever possible, rely on `pip` to automatically download and install pre-compiled wheel files (`.whl`). These are binary distributions that don't require local compilation, completely bypassing the need for C++ build tools for that specific package. Package maintainers usually provide wheels for common platforms and Python versions.
3.  **Keep Build Tools Updated (or Installed):** If your workflow frequently involves packages with C extensions, ensure you have the Visual C++ Build Tools installed and occasionally check for updates to keep them compatible with newer compiler requirements.
4.  **Use `conda` for Complex Packages:** If you are working with data science or scientific computing packages (like NumPy, SciPy, Pandas), consider using `conda` (part of Anaconda or Miniconda). `conda` manages binary dependencies much more effectively than `pip` in many cases, often providing pre-compiled binaries for Windows that eliminate the need for local compilation entirely.
5.  **Review Package Requirements:** Before attempting to install a new package, quickly review its official documentation or PyPI page. Some packages explicitly list their system-level prerequisites, including compilers, which can help you anticipate and prevent this error.