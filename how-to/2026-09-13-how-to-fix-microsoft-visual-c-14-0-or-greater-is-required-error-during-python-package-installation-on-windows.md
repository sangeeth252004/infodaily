---
title: "How to Fix 'Microsoft Visual C++ 14.0 or greater is required' Error During Python Package Installation on Windows"
date: "2026-09-13T22:07:29.192Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Resolve the 'Microsoft Visual C++ 14.0 or greater is required' error when installing Python packages on Windows. Learn the causes, get a step-by-step solution, and prevent future issues."
keywords: "Python, Visual C++, C++ compiler, Windows, package installation, pip, error fix, programming, development, build tools"
---

## Problem Explanation

When attempting to install certain Python packages using `pip` on Windows, you might encounter an error message similar to this:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it from https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This error halts the installation process, preventing you from using packages that rely on compiled C or C++ code. These packages often include libraries for data science, machine learning, web development frameworks, or performance-critical modules. Without the necessary C++ build tools, `pip` cannot compile these components on your system, leading to the installation failure.

## Why It Happens

The core reason for this error is that many Python packages are not written purely in Python. They often contain performance-critical sections or interface with existing C/C++ libraries. When you install such a package on Windows, `pip` needs to compile these C/C++ components specifically for your system architecture. This compilation process requires a C++ compiler, and the error message indicates that the required version, specifically Visual C++ 14.0 or later, is not found on your system.

Visual C++ Build Tools are part of Microsoft's development environment and provide the necessary compiler (like `cl.exe`) and related libraries to build C++ code on Windows. Without these tools, `pip` cannot proceed with the compilation step, even if the Python parts of the package are already present. This is particularly common with packages that have extensions written in C or C++ for performance or to interact with system-level functionalities.

## Step-by-Step Solution

The most effective way to resolve this error is by installing the necessary Microsoft Visual C++ Build Tools.

### Step 1: Download Visual Studio Build Tools

1.  Navigate to the official Visual Studio downloads page: [https://visualstudio.microsoft.com/downloads/](https://visualstudio.microsoft.com/downloads/)
2.  Scroll down to the "Tools for Visual Studio" section.
3.  Locate and click on "Build Tools for Visual Studio [Latest Version]". This will download a small executable installer.

### Step 2: Run the Installer and Select Workloads

1.  Run the downloaded installer executable (e.g., `vs_buildtools.exe`).
2.  The Visual Studio Installer window will appear. You will be presented with a list of "Workloads."
3.  Select the **"Desktop development with C++"** workload. This is the essential workload that includes the C++ compiler and related build tools required by Python packages.

### Step 3: Install the Selected Workload

1.  After selecting the "Desktop development with C++" workload, the installer will automatically populate the necessary components on the right-hand side under "Installation details." Ensure that the core C++ build tools are selected.
2.  Click the **"Install"** button at the bottom right of the installer window. The installation process may take some time, depending on your internet connection and system speed, as it downloads and installs the selected components.

### Step 4: Verify Installation

Once the installation is complete, you may be prompted to restart your computer. It's a good practice to restart to ensure all components are properly registered.

### Step 5: Reinstall the Python Package

1.  Open a new Command Prompt or PowerShell window. It's important to use a new window after installing the build tools to ensure it picks up the new environment variables.
2.  Attempt to install the Python package again using `pip`. For example, if you were trying to install `some-package`:
    ```bash
    pip install some-package
    ```

If the Visual C++ Build Tools were installed correctly, `pip` should now be able to find the necessary compiler and successfully build and install the package.

### Step 6: Troubleshoot if the Issue Persists

If the error persists, double-check the following:

*   **Correct Workload:** Ensure you selected "Desktop development with C++" and not another workload.
*   **Installation Path:** Verify that the Visual C++ Build Tools were installed in a location that your system can access.
*   **Python Environment:** If you are using a virtual environment (e.g., `venv`, `conda`), make sure the `pip` command is associated with the correct environment and that the build tools are available system-wide.
*   **System Restart:** Confirm you have restarted your computer after the installation.

## Common Mistakes

A common mistake is downloading the full Visual Studio IDE instead of just the Build Tools. While the IDE includes the build tools, it's a much larger download and may not be necessary if you only need the compiler for Python package installations. Another frequent oversight is forgetting to close and re-open the command prompt or terminal after installing the build tools. The system needs to refresh its environment variables to recognize the newly installed compiler. Some users also mistakenly try to install pre-compiled wheels if they are not available for their specific Python version or architecture, which can lead to other installation issues.

## Prevention Tips

To prevent this error from occurring in the future, consider these practices. Always check the installation requirements for Python packages you intend to use. Many packages that require compilation will explicitly state the need for C++ build tools in their documentation. Keeping your Python installation and `pip` updated can also help, as newer versions might sometimes handle dependencies more gracefully or provide clearer error messages.

When setting up a new development environment on Windows, it's highly recommended to install the Visual C++ Build Tools as one of the initial steps. This proactive approach ensures that you have the necessary compilation capabilities readily available for any Python package that might require them, saving you troubleshooting time later on. For users managing multiple Python projects or versions, using virtual environments is crucial. While the build tools are system-wide, ensuring your virtual environment is correctly activated before running `pip install` commands is essential for proper package management.