---
title: "How to Fix \"'Microsoft Visual C++ 14.0 or greater is required' Error\" During Python Package Installation on Windows"
date: "2026-06-14T03:56:24.265Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Resolve the common \"'Microsoft Visual C++ 14.0 or greater is required'\" error when installing Python packages on Windows by following this practical, step-by-step guide."
keywords: "Python, Visual C++, C++ 14.0, Windows, package installation, error fix, pip, compiler, build tools, Python error, programming"
---

## Problem Explanation

You're trying to install a Python package using `pip`, the Python package installer, and you encounter a cryptic error message. The most common phrasing is:

```
Microsoft Visual C++ 14.0 or greater is required. Get it from https://visualstudio.microsoft.com/visual-cpp-build-tools/
error: Microsoft Visual C++ 14.0 or greater is required.
```

This error stops your `pip install` command dead in its tracks, preventing you from adding necessary libraries to your Python environment. It's a frustrating roadblock, especially when you're eager to start developing or running a project that relies on specific Python modules.

## Why It Happens

This error occurs because many Python packages, particularly those that interact with lower-level system functionalities or offer performance optimizations, are not written purely in Python. Instead, they include components written in C or C++ that are compiled into machine code. When `pip` attempts to install such a package, it needs to compile these C/C++ extensions on your machine. To do this, your system requires a C++ compiler.

On Windows, the standard compiler used for this purpose is part of Microsoft's Visual C++ build tools. The error message specifically mentions "Visual C++ 14.0 or greater" because newer versions of Python and its associated libraries are compiled using this or a more recent version of the Visual C++ toolchain. If this compiler is not installed or accessible to your Python environment, `pip` cannot build the necessary components, resulting in the error.

## Step-by-Step Solution

The solution involves installing the necessary Microsoft Visual C++ build tools. Follow these steps carefully:

### ## Step 1: Identify Your Python Version

Before downloading anything, it's crucial to know which version of Python you are using. Different versions of the Visual C++ build tools are sometimes tied to specific Python versions, though generally, installing the latest readily available build tools will suffice. Open your command prompt or PowerShell and run:

```bash
python --version
```

Note down the version number (e.g., Python 3.9.7, Python 3.10.4).

### ## Step 2: Download Visual Studio Build Tools

The official recommendation is to download the "Build Tools for Visual Studio." This is a smaller, more focused installer than the full Visual Studio IDE and contains only the necessary C++ compilation components.

1.  Navigate to the Visual Studio downloads page: [https://visualstudio.microsoft.com/downloads/](https://visualstudio.microsoft.com/downloads/)
2.  Scroll down to the "Tools for Visual Studio" section.
3.  Locate and click the "Download Build Tools" button for the latest stable version of Visual Studio. This will download a small executable file (e.g., `vs_buildtools.exe`).

### ## Step 3: Run the Visual Studio Installer

Once the download is complete, run the `vs_buildtools.exe` installer you downloaded.

### ## Step 4: Select the Correct Workload

The installer will present you with a list of "Workloads." This is where you specify what components you want to install.

1.  In the installer, find and check the box for "**Desktop development with C++**".
2.  On the right-hand side, under "Installation details," ensure that the following components are selected (they usually are by default when you select the C++ workload):
    *   **MSVC v142 - VS 2019 C++ x64/x86 build tools** (or a similar version like v143 for VS 2022). The crucial part is the "MSVC" and the version number (which corresponds to the C++ 14.0 requirement).
    *   **Windows 10 SDK** or **Windows 11 SDK** (whichever is the latest or appropriate for your OS).
3.  You do *not* need to install the entire Visual Studio IDE unless you plan to do full-fledged C++ development. The Build Tools are sufficient.
4.  Click the "Install" button. The installation process may take some time, depending on your internet speed and the selected components.

### ## Step 5: Restart Your Computer

After the installation is complete, it is highly recommended to restart your computer. This ensures that all newly installed components and environment variables are properly registered system-wide.

### ## Step 6: Re-run the `pip install` Command

Once your system has restarted, open a *new* command prompt or PowerShell window. This is important to ensure that the new environment variables are loaded. Navigate to your project directory or the directory where you want to install the package and try installing the package again:

```bash
pip install <package_name>
```

Replace `<package_name>` with the actual name of the Python package you were trying to install. For example:

```bash
pip install numpy
```

### ## Step 7: Verify Installation (Optional)

After the installation completes successfully, you can verify that the package is installed by opening a Python interpreter (type `python` in your command prompt) and trying to import the package:

```python
import <package_name>
print(<package_name>.__version__)
```

If this runs without errors, you have successfully resolved the Microsoft Visual C++ 14.0 error.

## Common Mistakes

One common mistake is to download the full Visual Studio IDE when only the Build Tools are needed. This can lead to a much longer installation time and a larger disk footprint than necessary. Another pitfall is forgetting to open a *new* command prompt window after installing the build tools; existing windows may not pick up the new compiler path, leading to the same error. Some users might also try to install older versions of the build tools, which may not be compatible with newer Python versions or the specific package they are trying to install. Always aim for the latest stable "Build Tools for Visual Studio" and ensure the "Desktop development with C++" workload is selected.

## Prevention Tips

To prevent this error from recurring, always ensure that the "Desktop development with C++" workload is installed whenever you set up a new Python development environment on Windows. If you're using virtual environments (which is a best practice), it's still beneficial to have the build tools installed system-wide, as `pip` will leverage them when it needs to compile extensions within that virtual environment. Regularly checking for updates to Visual Studio Build Tools can also help maintain compatibility with newer Python releases and packages. When setting up a new machine or a new Python installation, making the Visual C++ Build Tools a mandatory step can save significant troubleshooting time down the line.