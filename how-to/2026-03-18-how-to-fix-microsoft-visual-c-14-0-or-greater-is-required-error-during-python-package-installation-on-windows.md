---
title: "How to Fix 'Microsoft Visual C++ 14.0 or greater is required' Error During Python Package Installation on Windows"
date: "2026-03-18T16:07:47.846Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Resolve the 'Microsoft Visual C++ 14.0 or greater is required' error when installing Python packages on Windows. Learn to install Visual C++ Build Tools step-by-step."
keywords: "Python, pip install error, Microsoft Visual C++ 14.0, Build Tools, Windows, C++ compiler, Python package installation, fix error, native extensions, setuptools, distutils"
---

## Problem Explanation

When attempting to install certain Python packages using `pip` on a Windows operating system, users frequently encounter an error message indicating a missing C++ compiler. The specific error message typically reads:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This error halts the installation process, preventing the desired Python package from being set up. This problem commonly arises when installing packages that contain C, C++, or Fortran extensions, such as `numpy`, `scipy`, `pandas`, `lxml`, `Pillow`, `matplotlib`, or `psycopg2`. Instead of a successful `pip install` output, the terminal will display a series of compilation-related errors culminating in the explicit request for the Visual C++ compiler, often followed by a traceback.

## Why It Happens

This error occurs because many performance-critical or low-level Python packages include parts written in compiled languages like C or C++ (often referred to as "native extensions"). When you try to install such a package, `pip` (or more accurately, the underlying `setuptools` or `distutils` module) attempts to compile these native extensions into machine code specific to your system.

On Linux and macOS, C/C++ compilers (like GCC or Clang) are often pre-installed or easily installable through package managers. However, Windows does not come with a C/C++ compiler by default. Python, when running on Windows, expects the Microsoft Visual C++ compiler to be available for compiling these extensions. The error "Microsoft Visual C++ 14.0 or greater is required" specifically points to the compiler versions bundled with Visual Studio 2015, 2017, 2019, or 2022. Without this specific compiler toolchain present and correctly configured in your system's environment, the compilation step fails, leading to the error message.

## Step-by-Step Solution

To resolve the 'Microsoft Visual C++ 14.0 or greater is required' error, you need to install the Microsoft Build Tools for Visual Studio, which includes the necessary C++ compilers. Follow these steps carefully:

### Step 1: Understand the Error and Your Python Setup

Before proceeding, confirm that the error you are encountering is precisely the "Microsoft Visual C++ 14.0 or greater is required" message. This guide specifically addresses this issue. It's also helpful to know your Python version and whether it's 32-bit or 64-bit, as the build tools should ideally match your Python architecture.

To check your Python version and architecture, open a command prompt or PowerShell and run:

```bash
python --version
```

Then, launch a Python interactive session and check the system information:

```python
python
>>> import sys
>>> print(sys.version)
>>> exit()
```

Look for "AMD64" for 64-bit Python or "32-bit" for 32-bit Python in the `sys.version` output. Most modern Python installations are 64-bit.

### Step 2: Download the Visual Studio Build Tools

Navigate to the official Microsoft Visual Studio downloads page. You do not need to install the full Visual Studio IDE, which is a large download. Instead, look for the "Build Tools for Visual Studio" section.

1.  Open your web browser and go to: `https://visualstudio.microsoft.com/downloads/`
2.  Scroll down to the "Tools for Visual Studio" section.
3.  Under "Build Tools for Visual Studio", click the "Download" button for the latest stable version (e.g., Visual Studio 2022 Build Tools). This will download a small installer executable (e.g., `vs_buildtools.exe`).

### Step 3: Run the Visual Studio Build Tools Installer

Locate the downloaded `vs_buildtools.exe` file (usually in your `Downloads` folder) and run it as an administrator.

1.  Right-click on `vs_buildtools.exe`.
2.  Select "Run as administrator" from the context menu.
3.  Accept any User Account Control (UAC) prompts that appear.
4.  The Visual Studio Installer will launch and prepare for installation.

### Step 4: Select Required Workloads and Components

This is the most critical step. You must select the correct components to ensure the C++ compiler is installed.

1.  In the Visual Studio Installer window, you'll see a list of "Workloads."
2.  Select the **"Desktop development with C++"** workload. This is essential as it includes the core C++ build tools.
3.  (Optional but Recommended for Python developers): Also consider selecting the **"Python development"** workload, as it provides additional Python-specific build components and tools.
4.  On the right-hand side, under the "Installation details" panel, verify that the necessary C++ components are selected. Specifically, ensure that at least one "MSVC vXYZ - VS [Year] C++ x64/x86 build tools (Latest)" component is checked. For example, "MSVC v143 - VS 2022 C++ x64/x86 build tools". The installer usually selects these automatically when you choose the "Desktop development with C++" workload.
5.  Click the "Install" button. The installation size can be several gigabytes, and the process may take some time depending on your internet speed and system performance.

### Step 5: Complete Installation and Restart

Allow the installation to complete without interruption. Once finished, you will receive a confirmation message.

1.  After the installation is finished, close the Visual Studio Installer.
2.  **It is highly recommended to restart your computer.** This ensures that all environment variables and PATH settings are correctly updated and recognized by your system and applications. If a restart is not immediately feasible, at least close and reopen any command prompts or terminals you were using.

### Step 6: Retry Python Package Installation

After restarting your computer, open a new command prompt or PowerShell window and attempt to install the problematic Python package again.

```bash
pip install package-name
```

Replace `package-name` with the actual name of the package you were trying to install (e.g., `numpy`, `scipy`). If the build tools were installed correctly, `pip` should now find the necessary C++ compiler and proceed with the installation without the previous error.

## Common Mistakes

When encountering and attempting to fix this error, users often make several common mistakes:

*   **Installing the full Visual Studio IDE instead of Build Tools:** The full Visual Studio Community, Professional, or Enterprise editions are comprehensive development environments. While they include the necessary compilers, they are much larger downloads and installations than what is required to fix this specific Python error. The "Build Tools for Visual Studio" package is sufficient and more lightweight.
*   **Not selecting the correct workloads/components:** The most frequent mistake is running the Build Tools installer but failing to select the "Desktop development with C++" workload or deselecting critical C++ build components within that workload. Without these components, the C++ compiler will still be missing.
*   **Forgetting to restart the system or terminal:** After installing the Build Tools, system environment variables (like PATH) need to be refreshed for new programs to be recognized. Simply closing and reopening your command prompt or restarting your computer ensures these changes take effect. If you don't, `pip` might still report the compiler missing.
*   **Mismatched architecture:** While less common now due to most Python installations being 64-bit, ensure that if you are using a 32-bit Python, the installed C++ build tools are also capable of compiling 32-bit binaries. The "x64/x86 build tools" component covers both.
*   **Outdated Build Tools for a newer Python:** If you have an older version of the Visual Studio Build Tools installed, it might not be compatible with newer Python versions or specific package requirements that explicitly need a `14.0 or greater` compiler. Always ensure you download a recent version of the Build Tools.

## Prevention Tips

Preventing this issue from recurring involves adopting a few best practices for managing your Python environment on Windows:

*   **Maintain Up-to-Date Build Tools:** Periodically check for updates to your Visual Studio Build Tools through the Visual Studio Installer. Keeping them updated ensures compatibility with newer Python versions and package requirements.
*   **Utilize Virtual Environments:** Always work within Python virtual environments (`venv` or `conda`). While a virtual environment doesn't prevent the compiler error itself, it isolates your project dependencies. If a package requires compilation, and the process somehow corrupts the environment (unlikely but possible), it won't affect your global Python installation or other projects.
*   **Prioritize Pre-built Wheels:** Whenever possible, prefer installing Python packages that offer pre-compiled binary packages known as "wheels" (`.whl` files) on PyPI. `pip` will automatically download and install these if available for your operating system and Python version/architecture. Wheels bypass the need for local compilation entirely, thus avoiding the C++ compiler requirement. Many popular scientific computing packages (like `numpy`, `scipy`, `pandas`) usually provide wheels.
*   **Consult Package Documentation:** Before installing a new package, especially one that seems to have complex dependencies, briefly check its official documentation. Some packages explicitly list build-time requirements for Windows users.
*   **Consider Anaconda/Miniconda for Data Science:** If you frequently work with data science, machine learning, or scientific computing libraries, consider using Anaconda or Miniconda. These distributions come with many common packages (like NumPy, SciPy, Pandas) pre-compiled and optimized, significantly reducing the chances of encountering C++ compilation errors. They also provide robust environment management.