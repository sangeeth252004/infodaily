---
title: "How to Fix \"Microsoft Visual C++ 14.0 or greater is required\" Error During Python Package Installation on Windows"
date: "2026-05-06T16:26:42.765Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "A comprehensive guide to fixing the \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages on Windows by installing the necessary Build Tools."
keywords: "Python, pip install, Microsoft Visual C++, Visual C++ 14.0, build tools, Windows, error fix, package installation, C++ compiler, setuptools error"
---

## Problem Explanation

When attempting to install certain Python packages using `pip` on a Windows operating system, users frequently encounter an error message indicating a missing C++ compiler. The specific error manifest as:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This message typically appears after `pip` tries to download a package and then attempts to build it locally. The installation process grinds to a halt, often listing numerous compilation errors or linking failures before terminating with the explicit "Microsoft Visual C++ 14.0 or greater is required" instruction. The user sees this output directly in their command prompt, PowerShell, or integrated development environment (IDE) terminal, preventing the successful installation of the desired Python package.

## Why It Happens

This error occurs because many popular Python packages, especially those involving numerical computation, data science, or system-level interactions (e.g., NumPy, SciPy, pandas, scikit-learn, psycopg2, lxml), contain components written in C, C++, or Fortran for performance reasons. When you attempt to install such a package using `pip`, the installer first checks for a pre-compiled binary wheel specific to your Python version and operating system architecture (e.g., `package_name-1.0-cp39-cp39-win_amd64.whl`). If a suitable wheel is found, it's downloaded and installed directly, bypassing the need for compilation.

However, if a pre-compiled wheel is not available for your specific environment (e.g., for a less common Python version, a development version of the package, or if the package maintainers don't provide wheels), `pip` will download the package's source distribution. Installing from source requires a C++ compiler to compile these C/C++ components into executable code that Python can use. On Windows, the standard and expected compiler for this task is part of the Microsoft Visual C++ Build Tools, specifically version 14.0 or newer, which corresponds to Visual Studio 2015 or later. Without this compiler present and correctly configured, the compilation step fails, leading to the reported error.

## Step-by-Step Solution

Solving the "Microsoft Visual C++ 14.0 or greater is required" error primarily involves installing the correct Microsoft C++ Build Tools.

### Step 1: Verify Python and Pip are Updated

Before proceeding, ensure your Python environment and `pip` are up to date. While not directly fixing the C++ compiler issue, an outdated `pip` or `setuptools` can sometimes interfere with wheel discovery or source compilation.

1.  **Open Command Prompt/PowerShell as Administrator.**
2.  **Update pip:**
    ```bash
    python -m pip install --upgrade pip
    ```
3.  **Update setuptools:**
    ```bash
    python -m pip install --upgrade setuptools
    ```
4.  **Update wheel (optional but good practice):**
    ```bash
    python -m pip install --upgrade wheel
    ```

### Step 2: Download Microsoft Visual C++ Build Tools

Navigate to the official Microsoft Visual Studio download page to obtain the necessary build tools.

1.  **Open your web browser** and search for "Microsoft Visual C++ Build Tools" or "Visual Studio Build Tools".
2.  **Locate the "Tools for Visual Studio" section.** You are looking for "Build Tools for Visual Studio 2022" (or the latest stable version available).
3.  **Download the installer.** It's usually a small executable file (e.g., `vs_buildtools__*.exe`).

### Step 3: Install Microsoft Visual C++ Build Tools

The installation process requires careful selection of components.

1.  **Run the downloaded installer** (e.g., `vs_buildtools__*.exe`).
2.  **Follow the initial prompts** to accept the license terms and allow the installer to prepare.
3.  In the "Workloads" tab of the Visual Studio Installer, select the **"Desktop development with C++"** workload. This single selection usually includes all the necessary components, including the MSVC v143 build tools (or v142 for VS 2019, v141 for VS 2017, etc., which satisfy the "14.0 or greater" requirement).
    *   *Alternatively, if you want a minimal installation:* Go to the "Individual components" tab and manually select **"MSVC v143 - VS 2022 C++ x64/x86 build tools"** (or the corresponding version for your Visual Studio Build Tools year). Ensure you select the appropriate architecture (x64 for 64-bit Python, which is most common). You might also need "Windows 10/11 SDK" and "C++ CMake tools for Windows" if not included automatically. However, selecting the "Desktop development with C++" workload is generally safer and covers all bases.
4.  **Click "Install"** and wait for the installation to complete. This can take some time depending on your internet connection and system speed.

### Step 4: Restart Your Command Environment

After the Build Tools installation is complete, it's crucial to ensure that your system's environment variables are updated.

1.  **Close all active command prompt windows, PowerShell sessions, or IDE terminals** where you were attempting to install Python packages.
2.  **Open a brand-new command prompt or PowerShell window.** It's often beneficial to open it as an administrator, though usually not strictly necessary for this step unless there are permission issues elsewhere.

### Step 5: Retry Python Package Installation

With the C++ Build Tools installed and your command environment refreshed, you can now attempt to install the problematic Python package again.

1.  **Activate your Python virtual environment** if you are using one (highly recommended).
2.  **Execute the `pip install` command** for your desired package:
    ```bash
    pip install package_name
    ```
    Replace `package_name` with the actual name of the package you were trying to install (e.g., `numpy`, `scipy`, `pandas`, `psycopg2`).

If the installation proceeds without the "Microsoft Visual C++ 14.0 or greater is required" error, you have successfully resolved the issue.

### Step 6: (Advanced) Manual Environment Configuration

In rare cases, even after installing the Build Tools, `setuptools` might still fail to locate the compiler. This typically happens in highly customized environments or if Visual Studio's paths aren't automatically picked up.

1.  **Locate `vcvarsall.bat`:** This batch file sets up the necessary environment variables. It's usually found in a path similar to:
    `C:\Program Files\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\`
    (Adjust `2022\BuildTools` based on your Visual Studio version and edition).
2.  **Run `vcvarsall.bat` before `pip install`:**
    ```bash
    "C:\Program Files\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvarsall.bat" x64
    pip install package_name
    ```
    The `x64` argument specifies that you want to set up an environment for 64-bit compilation, matching the architecture of most modern Python installations. Use `x86` for 32-bit Python.

This manual setup ensures all required compiler paths and environment variables are correctly set for the current command prompt session.

## Common Mistakes

1.  **Installing the Wrong Visual Studio Product:** Users sometimes download the full Visual Studio IDE (Community, Professional, Enterprise) instead of just the "Build Tools." While the full IDE includes the necessary compilers, it's a much larger download and installation than required to fix this specific Python error. The Build Tools are sufficient.
2.  **Not Selecting Correct Components:** During the Build Tools installation, failing to select the "Desktop development with C++" workload or the specific "MSVC v143 (or similar) build tools" in individual components will result in the compiler not being installed, and the error persisting.
3.  **Ignoring the "greater is required" part:** Trying to install old versions of Visual C++ redistributables or earlier, incompatible versions of the build tools will not resolve the issue. The error explicitly states "14.0 or greater."
4.  **Not Restarting the Terminal:** Environment variables are set when a command prompt or PowerShell session is initiated. If you install the Build Tools and immediately retry `pip install` in an existing terminal, that terminal might not have picked up the new environment variables, leading to the error re-appearing. Always close and reopen your command environment.
5.  **Mixing Architectures:** Trying to compile a package for 64-bit Python using 32-bit build tools (or vice versa) will lead to compilation failures. Ensure the architecture selected during Build Tools installation (if choosing individual components) matches your Python installation (most commonly 64-bit).

## Prevention Tips

1.  **Utilize Python Virtual Environments:** Always work within a Python virtual environment (`venv` or `conda`). This isolates your project dependencies, prevents conflicts with system-wide Python installations, and makes troubleshooting much cleaner. When you install packages in a `venv`, they don't affect other projects.
2.  **Prioritize Pre-compiled Wheels:** Whenever possible, use package versions for which pre-compiled wheels (`.whl` files) are available on PyPI. `pip` automatically prefers wheels. If a package consistently requires source compilation and you encounter this error, check the package's PyPI page or official documentation for instructions on how to obtain pre-compiled binaries if they exist for your setup.
3.  **Keep Build Tools Updated:** Periodically check for updates to the Microsoft Visual C++ Build Tools. Newer versions often include bug fixes and better compatibility. You can update them via the Visual Studio Installer application.
4.  **Regularly Update `pip` and `setuptools`:** As demonstrated in the solution, keeping your core Python package management tools updated ensures they can correctly handle new package distributions and compilation requirements.
5.  **Understand Package Dependencies:** Before installing a complex package, briefly check its documentation or PyPI page for any listed system-level dependencies. Knowing a package relies on C/C++ extensions can preemptively inform you that build tools might be required.