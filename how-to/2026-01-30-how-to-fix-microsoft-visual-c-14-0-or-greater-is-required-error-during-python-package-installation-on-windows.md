---
title: "How to Fix 'Microsoft Visual C++ 14.0 or greater is required' Error During Python Package Installation on Windows"
date: "2026-01-30T15:33:37.717Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Resolve the \"Microsoft Visual C++ 14.0 or greater is required\" error on Windows when installing Python packages. This guide provides a step-by-step solution to get your development environment running smoothly."
keywords: "Python, Visual C++, C++ 14.0, build tools, Windows, pip install, error fix, solution, package installation, compiler, Visual Studio Build Tools, C extensions, pre-compiled wheels"
---

### Problem Explanation

You're likely trying to install a Python package using `pip` on a Windows machine, and instead of a successful installation, you're met with a cryptic error message. The exact message you'll typically see is:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft Visual C++ Build Tools": https://visualstudio.microsoft.com/downloads/
```

This error usually appears after `pip` attempts to "Building wheel for [package-name]" and fails. You might see a long traceback before this specific line, indicating that a build process failed. This prevents the Python package from installing correctly, leaving you unable to use the desired library in your project. It's a common hurdle for many Python developers, especially when working with scientific computing, data science, or certain low-level libraries.

### Why It Happens

The root cause of this error lies in the nature of some Python packages. While Python is an interpreted language, many powerful and performance-critical libraries aren't written purely in Python. To achieve optimal speed or interact directly with system resources, parts of these packages are often written in compiled languages like C, C++, or Fortran. Examples include popular libraries like NumPy, SciPy, pandas, cryptography, lxml, and scikit-learn.

When you attempt to install such a package using `pip`, the installer first checks for a pre-compiled binary wheel (`.whl` file) that matches your Python version and system architecture (32-bit or 64-bit). If a suitable wheel is found, `pip` simply downloads and installs it, bypassing the need for compilation.

However, if a pre-compiled wheel isn't available for your specific setup (perhaps due to an obscure Python version, a beta release, or if you're attempting to install a development version from source), `pip` will fall back to downloading the package's source distribution. When installing from source, `pip` needs to compile those C/C++ components into executable code for your Windows system. This compilation process requires a C++ compiler. On Windows, the standard compiler used by Python's build system is Microsoft Visual C++. The error message "Microsoft Visual C++ 14.0 or greater is required" means your system doesn't have the necessary Visual C++ build tools installed, or the installed version is too old for the package you're trying to build.

### Step-by-Step Solution

The core solution involves installing the correct Microsoft Visual C++ Build Tools, which provide the compiler and associated libraries needed to build these Python packages from source.

#### ## Step 1: Confirm Your Python Architecture and Version

Before proceeding, it's crucial to know whether your Python installation is 32-bit or 64-bit. This helps in selecting the correct build tools. Open your command prompt (cmd) or PowerShell and run the following command:

```bash
python -c "import platform; print(platform.architecture())"
```

You'll see output like `('64bit', 'WindowsPE')` or `('32bit', 'WindowsPE')`. Most modern systems use 64-bit Python. Also, note your Python version (e.g., Python 3.9, 3.10, 3.11). This information is less critical for the build tools themselves but useful for general debugging.

#### ## Step 2: Download the Visual Studio Build Tools Installer

You need to obtain the official Microsoft Visual Studio Build Tools. These are separate from the full Visual Studio Integrated Development Environment (IDE) and are much lighter, containing only the compilers and tools necessary for building applications.

1.  Open your web browser and navigate to the official Microsoft Visual Studio download page. You can typically find this by searching for "Visual Studio Build Tools" on your preferred search engine.
2.  On the Visual Studio download page, look for the "Tools for Visual Studio" section. You'll usually find the "Build Tools for Visual Studio 2022" (or the latest stable version available).
3.  Click the "Download" button next to "Build Tools for Visual Studio 2022" to download the `vs_buildtools.exe` installer.

#### ## Step 3: Run the Installer and Select Required Components

Once the `vs_buildtools.exe` file is downloaded, run it. This will launch the Visual Studio Installer.

1.  When the installer opens, you'll be presented with various workloads. You *do not* need to install the entire "Desktop development with C++" workload if you're only solving this Python problem, as it can be very large.
2.  Instead, navigate to the **"Individual components"** tab at the top of the installer window.
3.  In the search bar on the "Individual components" tab, type "MSVC".
4.  From the search results, select the **MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)** (or the equivalent for VS 2019/2017 if you specifically need an older compiler version, though latest is generally fine for `14.0 or greater`).
    *   **Crucial:** Ensure you select both x64 and x86 components if you're unsure, or at least the architecture that matches your Python installation (e.g., x64 for 64-bit Python).
5.  Also, search for "Windows SDK" and select the latest **Windows 10 SDK** or **Windows 11 SDK** checkbox. This provides essential header files and libraries.
6.  On the right side, the installer will show the "Total space required". Ensure you have enough disk space.
7.  Click the **"Install"** button. The installation process might take some time, depending on your internet speed and selected components.

#### ## Step 4: Restart Your Command Prompt/PowerShell

After the installation completes, it's a good practice to close any open command prompt or PowerShell windows and open new ones. This ensures that your system's environment variables are refreshed and the new build tools are recognized. A full system reboot isn't always necessary but can sometimes resolve lingering path issues.

#### ## Step 5: Retry Python Package Installation

With the Visual C++ Build Tools successfully installed, you can now retry installing the Python package that previously failed. Open a *new* command prompt or PowerShell window and run your `pip install` command:

```bash
pip install your-package-name
```

Replace `your-package-name` with the actual name of the package you were trying to install (e.g., `numpy`, `pandas`, `cryptography`). If all went well, the installation should now proceed without the "Microsoft Visual C++ 14.0 or greater is required" error.

#### ## Step 6 (Optional): Consider Pre-compiled Wheels (Unofficial Sources)

In rare cases, even with the build tools installed, some particularly complex packages might still encounter compilation issues. For such scenarios, or if you prefer to avoid compilation entirely, you can sometimes find unofficial pre-compiled `.whl` files.

A notable source for these is Christoph Gohlke's website (often found by searching "Unofficial Windows Binaries for Python Extension Packages"). You can download the specific `.whl` file that matches your Python version and architecture directly from there.

Once downloaded, you can install it using `pip` by providing the full path to the `.whl` file:

```bash
pip install C:\Users\YourUser\Downloads\your_package_name-version-cpXX-cpXXm-win_amd64.whl
```

(Adjust the path and filename accordingly). This method bypasses the need for compilation entirely.

### Common Mistakes

1.  **Installing the Wrong Visual Studio Component:** A common mistake is installing the full Visual Studio IDE, or only the "Desktop development with C++" workload without ensuring the specific MSVC build tools and Windows SDK are selected. While the full IDE *includes* the necessary tools, it's a much larger download and installation than typically needed. Focus on the "Individual components" tab.
2.  **Not Matching Python Architecture:** Installing 32-bit build tools when you have 64-bit Python (or vice-versa) will lead to continued errors. Always verify your Python architecture in Step 1.
3.  **Forgetting to Restart the Shell:** Environment variables pointing to the newly installed compilers are often not picked up by already open command prompt windows. Always close and reopen your shell after installing the build tools.
4.  **Outdated `pip` or `setuptools`:** Sometimes, `pip` itself, or its dependencies like `setuptools` and `wheel`, might be outdated and cause issues during the build process. Ensure they are up-to-date: `python -m pip install --upgrade pip setuptools wheel`.
5.  **Insufficient Disk Space:** The Visual C++ Build Tools, even when selecting minimal components, can still require several gigabytes of disk space. Ensure you have ample free space before starting the installation.

### Prevention Tips

1.  **Prioritize Pre-compiled Wheels:** Whenever possible, rely on `pip` to automatically find and install pre-compiled binary wheels (`.whl` files). Most popular packages provide these for common Python versions and Windows architectures, eliminating the need for local compilation.
2.  **Keep Build Tools Updated (if used):** If you frequently work with packages that require compilation, periodically check for updates to your Visual Studio Build Tools. Newer versions of Python or certain libraries might require newer compiler features.
3.  **Use Virtual Environments:** Always use virtual environments for your Python projects. This isolates dependencies, preventing conflicts between projects and ensuring that the correct `pip` (and thus the correct compiler, if needed) is invoked for your specific project.
4.  **Consider Anaconda/Miniconda:** For data science and scientific computing, distributions like Anaconda or Miniconda are excellent choices. They come with a vast array of popular packages (like NumPy, SciPy, pandas) pre-compiled and pre-installed, often using their own robust package manager (`conda`), which bypasses the Visual C++ compilation issue for those specific libraries entirely.
5.  **Maintain a Clean Development Environment:** Regularly update `pip`, `setuptools`, and `wheel` in your base Python installation and virtual environments to ensure you have the latest tools that can handle modern package installations efficiently.