---
title: "How to Fix 'Microsoft Visual C++ 14.0 is Required' Error During Python Package Installation on Windows"
date: "2026-11-11T00:25:01.602Z"
slug: "how-to-fix-microsoft-visual-c-14-0-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Resolve the 'Microsoft Visual C++ 14.0 is required' error when installing Python packages on Windows. This guide provides a step-by-step solution and preventative measures."
keywords: "Python, Visual C++, C++ 14.0, error, installation, Windows, package management, pip, build tools, compiler"
---

## Problem Explanation

When attempting to install certain Python packages that include compiled extensions, you might encounter an error message indicating that "Microsoft Visual C++ 14.0 is required." This error typically surfaces during the `pip install` process, halting the installation and preventing the package from being used. The exact wording can vary slightly, but it commonly appears as:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it from visualstudio.microsoft.com/visual-cpp-build-tools/
```

This signifies that the Python package you are trying to install needs to compile C or C++ code from source on your system, and the necessary development tools are missing or inaccessible.

## Why It Happens

Python packages are often distributed as pre-compiled "wheels" for common architectures and operating systems. However, some packages, especially those with complex dependencies or those that interface directly with system libraries, may not have pre-built wheels available for every combination. In such cases, `pip` will attempt to download the source code and compile it locally.

The compilation process requires a C/C++ compiler and its associated build tools. On Windows, this is primarily provided by Microsoft's Visual C++ build tools. The error message specifically calls for "Visual C++ 14.0 or greater," which refers to a specific version of the Microsoft build tools that corresponds to Visual Studio 2015 and later versions. If this compiler suite is not installed or not properly configured in your system's PATH environment variable, `pip` cannot find the necessary tools to perform the compilation, resulting in the error.

## Step-by-Step Solution

The most direct and reliable way to resolve this error is to install the Microsoft C++ Build Tools.

### Step 1: Download the Visual C++ Build Tools Installer

Navigate to the official Microsoft Visual Studio downloads page. You do not need to install the full Visual Studio IDE. Instead, you need the standalone Build Tools.

Go to: [visualstudio.microsoft.com/visual-cpp-build-tools/](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

On this page, locate and download the "Build Tools for Visual Studio" installer. It's usually a relatively small download that, when run, allows you to select the specific components you need.

### Step 2: Run the Installer and Select Components

Once the installer (`vs_buildtools.exe` or similar) has downloaded, run it. You will be presented with a screen to select workloads.

Look for the **"Desktop development with C++"** workload. Ensure this workload is checked. This workload includes the necessary C++ compiler, Windows SDKs, and other essential tools for building C++ applications on Windows.

Under the "Installation details" pane on the right side of the installer window, you can verify that the "MSVC v140 - VS 2015 C++ build tools (v14.00)" or a later version (e.g., v141, v142, v143) is selected. The installer usually defaults to installing the latest compatible version.

You do not need to select any other workloads unless you have specific reasons for them.

### Step 3: Install the Selected Components

After selecting the "Desktop development with C++" workload, click the **"Install"** button. The installer will download and install the selected components. This process can take some time depending on your internet speed and system resources.

### Step 4: Restart Your Computer

After the installation is complete, it is highly recommended to restart your computer. This ensures that all environment variables are properly updated and that the newly installed build tools are recognized by the system and any running applications, including your command prompt or terminal.

### Step 5: Re-attempt Python Package Installation

Open a new command prompt or terminal window. Navigate to your Python project directory or the environment where you intend to install the package. Then, re-run the `pip install` command for the package that was previously failing.

For example, if you were trying to install `some_package`:

```bash
pip install some_package
```

The installation should now proceed without the "Microsoft Visual C++ 14.0 is required" error. If the package still fails to install, it might be due to a different dependency or a more specific issue with that particular package's build process, but the C++ build tools are the most common culprit.

### Step 6: Verify Installation (Optional)

After successful installation, you can optionally verify that the package is installed and import it in a Python interpreter to ensure it's functioning as expected.

```python
import some_package
# If no error is raised, the installation was successful.
```

## Common Mistakes

One common mistake is attempting to install Visual Studio IDE instead of just the Build Tools. While the IDE includes the build tools, it's a much larger installation and unnecessary for this specific problem. Downloading and installing the full IDE can consume significant disk space and time. Another mistake is not restarting the computer after installation. Changes to system environment variables that point to the compiler's location are often not fully applied until a system reboot. Finally, users might try to force installation using `--no-binary` without ensuring the build tools are present, which will invariably lead back to the same error.

## Prevention Tips

To prevent this error from recurring, always ensure you have the Microsoft C++ Build Tools installed before attempting to install Python packages that might require compilation. When setting up a new development environment on Windows, it's a good practice to install these tools proactively. Keeping your Python environment clean and using virtual environments (like `venv` or `conda`) can also help isolate dependencies and make package management more predictable. If you are part of a team, establishing a standard development environment configuration that includes the necessary build tools can save everyone time and troubleshooting effort. Consider using a Python environment manager that can handle C++ dependencies, such as Conda, which often manages these prerequisites automatically during package installation.