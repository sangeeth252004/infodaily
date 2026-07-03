---
title: "How to Fix \"error: Microsoft Visual C++ 14.0 or greater is required\" During Python Package Installation on Windows"
date: "2026-07-03T08:08:17.921Z"
slug: "how-to-fix-error-microsoft-visual-c-14-0-or-greater-is-required-during-python-package-installation-on-windows"
type: "how-to"
description: "A step-by-step guide to resolve the \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages on Windows, focusing on installing the correct Visual C++ Build Tools."
keywords: "Python, pip install, Windows, Microsoft Visual C++, Visual C++ 14.0, compiler error, build tools, package installation, C++ requirements, development with C++"
---

## Problem Explanation

When attempting to install certain Python packages using `pip` on a Windows operating system, you might encounter an error message indicating a missing or outdated C++ compiler. The specific error often appears in your command prompt or terminal output, typically during the "Building wheels for collected packages" phase, and explicitly states:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft Visual C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This error usually occurs when `pip` needs to compile C, C++, or Fortran code that is part of the Python package. Common packages that trigger this error include scientific computing libraries like NumPy, SciPy, Pandas, or other packages with underlying C extensions, such as `lxml`, `opencv-python`, or even some cryptography-related libraries, if a pre-built binary wheel is not available for your specific Python version and Windows architecture. The installation process grinds to a halt, failing to build the necessary components for the package.

## Why It Happens

The root cause of this error lies in how many Python packages are structured and compiled. To achieve optimal performance, many complex Python libraries utilize code written in lower-level languages like C or C++. When you install such a package from its source code (a `.tar.gz` file, for example), `pip` invokes a build process that attempts to compile this C/C++ code into machine-executable instructions.

On Windows, the standard compiler used by Python itself, and therefore expected by packages that need to be compiled against it, is Microsoft Visual C++. The error "Microsoft Visual C++ 14.0 or greater is required" means that your system either does not have a compatible C++ compiler installed at all, or the installed version is older than what Python and the package's build scripts expect (i.e., older than Visual Studio 2015, which introduced version 14.0 of the MSVC toolset). Without this specific compiler toolset, the build process cannot proceed, leading to the installation failure. This often happens when a fresh Windows installation or a developer environment setup lacks these critical C++ build dependencies.

## Step-by-Step Solution

### Step 1: Understand Your Python Environment

Before proceeding, it's good practice to verify your Python version and architecture. This helps ensure compatibility with the build tools.

Open your command prompt or terminal and run:

```bash
python --version
python -c "import platform; print(platform.architecture())"
```

Note down the Python version (e.g., Python 3.9.7) and whether it's 32-bit ('32bit') or 64-bit ('64bit'). Most modern Python installations on Windows are 64-bit.

### Step 2: Download the Visual Studio Build Tools Installer

The solution involves installing the specific C++ compiler components needed by Python. These are provided by Microsoft as part of the "Visual Studio Build Tools" package, which is a standalone installer much lighter than a full Visual Studio IDE.

Navigate to the official Microsoft Visual Studio download page. Look for the "Tools for Visual Studio" section, specifically for "Visual Studio Build Tools". Download the installer for the *latest* available version of the Visual Studio Build Tools (e.g., Visual Studio 2022 Build Tools). This ensures you get "14.0 or greater" as required.

### Step 3: Run the Installer and Select Required Workloads

Once the installer (e.g., `vs_buildtools__<version>.exe`) is downloaded, run it. You will likely need administrator privileges.

The Visual Studio Installer window will appear. It offers various "Workloads" and "Individual components." To fix the Python C++ compiler error, you need to select the following:

1.  **Under the "Workloads" tab:**
    *   Check the box for **"Desktop development with C++"**. This is the primary workload that includes the necessary C++ build tools.

2.  **Under the "Individual components" tab (after selecting the workload, or to double-check):**
    *   Ensure that a component similar to **"MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)"** (the exact version number may vary depending on the Visual Studio Build Tools version you downloaded) is checked. This provides the actual compiler toolset.
    *   Additionally, ensure that a **"Windows SDK"** (e.g., "Windows 11 SDK (10.0.22000.0)" or similar, depending on your OS) is selected. This provides essential headers and libraries for Windows development. The "Desktop development with C++" workload usually includes a compatible Windows SDK by default.

### Step 4: Install the Selected Components

After selecting the necessary workloads and individual components, click the **"Install"** button in the Visual Studio Installer.

The installation process can take a significant amount of time, depending on your internet connection and system speed, as it downloads and installs several GBs of data. Allow the installer to complete fully. Do not close the window prematurely.

### Step 5: Close and Reopen Your Terminal

After the installation completes, it is crucial to **close all open command prompt or terminal windows** you were using for Python. Then, reopen a new command prompt or terminal. This action ensures that your system's environment variables are refreshed and that the newly installed compiler tools are discoverable by `pip` and Python. If you're using a specific virtual environment, activate it again.

### Step 6: Retry Python Package Installation

With the Visual C++ Build Tools now correctly installed and your terminal refreshed, navigate back to your project directory (or activate your virtual environment) and attempt to install the problematic Python package again:

```bash
pip install <package_name>
```

The installation should now proceed without the "Microsoft Visual C++ 14.0 or greater is required" error. The compiler will successfully build any C/C++ extensions, allowing the package to install properly.

## Common Mistakes

When addressing this error, users often make a few common missteps:

*   **Installing a Full Visual Studio IDE:** Some users mistakenly believe they need to install the entire Visual Studio Community, Professional, or Enterprise IDE. While these include the build tools, they are significantly larger and often unnecessary just for Python package compilation. The "Visual Studio Build Tools" standalone package is the correct, lightweight solution.
*   **Forgetting "Desktop development with C++":** Even if the Visual Studio Installer is run, failing to select the "Desktop development with C++" workload or the specific "MSVC vXYZ C++ build tools" individual component means the necessary compiler won't be installed.
*   **Not Restarting the Terminal:** Environment variables are often updated during the Build Tools installation. If you don't close and reopen your command prompt or terminal, the system won't recognize the newly installed compiler in the PATH, and `pip` will continue to report the error.
*   **Ignoring the "14.0 or greater" Requirement:** Installing very old versions of Visual C++ redistributables or earlier Build Tools (e.g., pre-Visual Studio 2015) will not satisfy the `14.0 or greater` requirement, leading to the error persisting. Always download the *latest* Visual Studio Build Tools.

## Prevention Tips

To minimize the chances of encountering the "Microsoft Visual C++ 14.0 or greater is required" error in the future:

*   **Prioritize Pre-built Wheels:** For popular data science and scientific computing packages (like NumPy, SciPy, Pandas, Matplotlib), `pip` usually prefers to install pre-built binary packages called "wheels" (`.whl` files). These files already contain compiled code for common Python versions and architectures, thus bypassing the need for local compilation. Ensure your `pip` is up to date (`python -m pip install --upgrade pip`) to maximize its ability to find and use compatible wheels.
*   **Use Virtual Environments:** Always work within Python virtual environments (`venv` or `conda env`). This isolates your project dependencies and helps maintain a clean, consistent development environment, even if it doesn't directly prevent the C++ compiler issue itself.
*   **Consider Anaconda/Miniconda:** For heavy scientific computing or data science work, consider using a Python distribution like Anaconda or Miniconda. These distributions often come with many complex packages (like NumPy, SciPy, etc.) pre-compiled and managed by the `conda` package manager, which frequently provides its own pre-built binaries, effectively sidestepping the need for the Microsoft Visual C++ Build Tools for those specific packages.
*   **Keep Build Tools Updated (Periodically):** If you regularly work with packages requiring compilation, it's good practice to periodically check for updates to your Visual Studio Build Tools, especially after major Python version upgrades or Windows updates.
*   **Install Build Tools Proactively:** If you're setting up a new Windows development machine for Python, consider installing the "Desktop development with C++" workload via Visual Studio Build Tools early in the setup process to proactively avoid potential compilation errors down the line.