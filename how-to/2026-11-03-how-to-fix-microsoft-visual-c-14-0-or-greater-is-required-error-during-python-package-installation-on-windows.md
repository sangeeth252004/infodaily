---
title: "How to Fix \"'Microsoft Visual C++ 14.0 or greater is required' Error during Python Package Installation on Windows\""
date: "2026-11-03T05:24:37.689Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "A comprehensive, step-by-step guide to resolve the \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages on Windows by installing the correct Visual Studio Build Tools."
keywords: "Python, pip, Windows, C++, Visual C++, build tools, error fix, package installation, compiler error, Visual Studio 14.0, greater is required, python setup.py egg_info, vcvarsall.bat"
---

## Problem Explanation

When you're working with Python on a Windows system and attempting to install certain packages using `pip`, you might encounter a frustrating error message that stops the installation process dead in its tracks. The specific message typically reads:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This error most commonly appears when `pip` is trying to install a Python package that includes components written in languages like C, C++, or Fortran. Instead of installing successfully, your terminal or command prompt will halt, display this error, and often indicate that the installation has failed. You'll see this after `pip` downloads the package and attempts to build it from source.

## Why It Happens

This error occurs because many popular Python packages are not written purely in Python. For performance or integration with system libraries, they often contain "extensions" written in compiled languages like C or C++. On Linux or macOS, the necessary compilers (like GCC or Clang) are typically pre-installed or easily accessible. However, on Windows, these compilers are not part of the default operating system installation.

When `pip` attempts to install such a package and cannot find a pre-compiled binary "wheel" file specific to your Python version and Windows architecture, it tries to compile the package from its source code. To do this, it needs a compatible C++ compiler. The error message specifically states that it requires "Microsoft Visual C++ 14.0 or greater," which refers to the compiler toolset that ships with Visual Studio 2015 (version 14.0) or newer versions of Visual Studio. If these build tools are missing or improperly installed on your Windows system, `pip` has no way to compile the C/C++ components, leading to the reported error.

## Step-by-Step Solution

Solving this problem primarily involves installing the correct Microsoft Visual C++ Build Tools. Follow these steps carefully to get your Python environment back on track.

### ## Step 1: Confirm the Error and Your Environment

Before proceeding, ensure you are indeed facing the "Microsoft Visual C++ 14.0 or greater is required" error. Note the exact package you are trying to install and your Python version. This context can be helpful if you encounter further issues. Open your command prompt or PowerShell and attempt to install the problematic package again to re-confirm the error:

```bash
pip install <package-name>
```

Replace `<package-name>` with the actual package you're trying to install (e.g., `numpy`, `scipy`, `pandas`, `lxml`, `opencv-python`).

### ## Step 2: Download the Visual Studio Build Tools Installer

The error message itself provides the direct link. Navigate to the official Microsoft download page for the Visual C++ Build Tools.

Go to: `https://visualstudio.microsoft.com/visual-cpp-build-tools/`

On this page, look for the "Tools for Visual Studio" section. You should find a download button, often labeled "Download Build Tools" or similar. Click this to download the `vs_buildtools.exe` installer.

### ## Step 3: Launch the Installer and Select Workloads

Once the `vs_buildtools.exe` file has downloaded, run it. You might need administrator privileges to start the installation.

The Visual Studio Installer will launch. It may take a moment to initialize. Once it's ready, you will see a screen with various "Workloads." These workloads are collections of tools and components designed for specific development scenarios.

### ## Step 4: Choose "Desktop development with C++" Workload

This is the most crucial step. Among the list of workloads, locate and select the checkbox next to **"Desktop development with C++"**.

Do *not* install the full Visual Studio IDE unless you need it for other development purposes. The Build Tools alone are sufficient for Python's needs and are much smaller. Selecting just this workload ensures you get the necessary C++ compilers and libraries without unnecessary bloat.

### ## Step 5: Verify Individual Components (Optional, but Recommended)

After selecting the "Desktop development with C++" workload, look at the right-hand panel in the installer. This panel shows the "Installation details" and lists the individual components that will be installed with the chosen workload.

While the default selection for "Desktop development with C++" usually includes everything you need, it's good practice to quickly check. Ensure that components like:
*   **MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)** (or similar, depending on the VS version)
*   **Windows 11 SDK** (or Windows 10 SDK, depending on your OS)
*   **C++ ATL for latest v143 build tools (x86 & x64)**
*   **C++ MFC for latest v143 build tools (x86 & x64)**

are selected. These are the core C++ compiler components. If you're on an older Windows version, you might see "MSVC v142 - VS 2019 C++ x64/x86 build tools" or "MSVC v141 - VS 2017 C++ x64/x86 build tools," which are also generally compatible as they are "14.0 or greater."

### ## Step 6: Install the Build Tools

With the correct workload selected, click the **"Install"** button (usually at the bottom right of the installer window).

The installer will then download and install the selected components. This process can take a significant amount of time, depending on your internet connection speed and your computer's performance. You will see a progress bar indicating the status. Once the installation is complete, the installer will inform you. You can then close the Visual Studio Installer.

### ## Step 7: Restart Your Terminal and Re-attempt Package Installation

After the Visual Studio Build Tools are installed, it's crucial to **close and re-open your command prompt or PowerShell window.** This ensures that your system's environment variables are refreshed and the newly installed compiler tools are recognized by Python and `pip`.

In your fresh terminal session, navigate back to your Python project or environment (if applicable) and try installing the problematic package again:

```bash
pip install <package-name>
```

This time, `pip` should be able to locate the necessary C++ compiler, proceed with compiling the source extensions, and successfully install your Python package.

## Common Mistakes

Here are some common pitfalls users encounter when trying to fix this error:

*   **Installing the wrong Visual Studio product:** Many users mistakenly install the full Visual Studio IDE (Community, Professional, Enterprise) instead of just the "Build Tools." While the IDE includes the build tools, it's a much larger installation and unnecessary if you only need the compiler for Python packages.
*   **Not selecting the "Desktop development with C++" workload:** Even if you download the correct Build Tools installer, failing to select this specific workload will mean the C++ compiler components are not installed, and the error will persist.
*   **Not restarting the terminal:** Environment variables that point to the newly installed compiler might not be loaded until you open a new command prompt or PowerShell session, or even restart your computer. Skipping this step often leads to the error reappearing immediately after installation.
*   **Trying to install older or incompatible compilers:** The error specifically requests "14.0 or greater." Attempting to manually install older versions or third-party compilers often won't resolve the issue for Python packages expecting the Microsoft toolchain.
*   **Ignoring the specific error message link:** The error message itself provides the direct link to the correct download page. Deviating from this link might lead to downloading incorrect or outdated installers.

## Prevention Tips

To minimize the chances of encountering this error in the future, consider these best practices:

*   **Prioritize using pre-compiled wheels:** Whenever possible, `pip` prefers to install pre-compiled binary packages called "wheels" (files ending with `.whl`). These do not require compilation from source. Ensure your `pip` is up-to-date (`python -m pip install --upgrade pip`) as newer versions are better at finding and utilizing wheels. Also, ensure the `wheel` package itself is installed (`pip install wheel`).
*   **Keep Visual Studio Build Tools updated:** Periodically run the Visual Studio Installer (search for it in your Start Menu) and check for updates to your installed "Desktop development with C++" workload. Newer Python versions or packages might eventually require newer compiler features.
*   **Use virtual environments:** Always work within Python virtual environments (created with `venv` or `conda`). This isolates your project dependencies and can sometimes prevent system-wide conflicts, although it won't directly prevent the need for build tools if a package needs compilation.
*   **Consider Anaconda/Miniconda for data science packages:** If you frequently work with complex scientific computing or data science packages (like NumPy, SciPy, Pandas, scikit-learn), consider using the Anaconda or Miniconda distribution. These distributions often bundle pre-compiled binaries for many common packages, bypassing the need for you to compile them yourself and thus avoiding the C++ compiler error altogether.