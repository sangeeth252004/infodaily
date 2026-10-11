---
title: "How to Fix \"Microsoft Visual C++ 14.0 or greater is required\" Error During Python Package Installation on Windows"
date: "2026-10-11T04:04:33.370Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Learn how to resolve the common \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages on Windows. This comprehensive guide provides step-by-step solutions and prevention tips."
keywords: "Python, Visual C++, C++ build tools, pip install error, Windows, package installation, error fix, development tools"
---

It's a common frustration for Python developers on Windows: you're happily trying to install a new package using `pip`, and suddenly you're met with a cryptic error message like this:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it from https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This error message halts your installation process dead in its tracks, leaving you wondering what went wrong and how to proceed. You might be trying to install libraries for data science, web development, or machine learning, and this seemingly unrelated C++ requirement throws a wrench into your workflow.

### Why It Happens

This error occurs because many Python packages, especially those that interact with hardware, perform complex calculations, or are written in a mix of Python and C/C++ for performance reasons, rely on external C/C++ code. When `pip` attempts to install such a package, it often needs to *compile* this C/C++ code from source on your machine. To do this compilation, your system needs a C++ compiler and its associated build tools.

The message specifically mentions "Microsoft Visual C++ 14.0 or greater" because this is the version of the Microsoft C++ compiler that is typically required by the build systems used by many Python packages. Without these necessary build tools installed and configured correctly on your Windows system, `pip` cannot perform the compilation step, leading to the error. It's essentially saying, "I need a C++ compiler to build this part of the package, and I can't find it on your computer."

### Step-by-Step Solution

The solution involves installing the necessary Microsoft C++ Build Tools. Here's how to do it:

## Step 1: Download the Visual Studio Build Tools Installer

Open your web browser and navigate to the official Microsoft Visual Studio downloads page. You're looking for the "Build Tools" section.

*   Go to: [https://visualstudio.microsoft.com/downloads/](https://visualstudio.microsoft.com/downloads/)
*   Scroll down to the "Tools for Visual Studio" section.
*   Find and click on the download button for "Build Tools for Visual Studio [latest version]". This will download a small installer executable.

## Step 2: Run the Visual Studio Installer

Once the download is complete, locate the downloaded file (it will likely be named something like `vs_buildtools.exe` or similar) and run it. You might need administrator privileges to install it.

## Step 3: Select the Correct Workload

The Visual Studio Installer will launch. You'll be presented with a list of "Workloads." For the "Microsoft Visual C++ 14.0 or greater is required" error, the most important workload is:

*   **"Desktop development with C++"**

Make sure this workload is checked. This workload includes the C++ compiler and the Windows SDK, which are essential for building C++ code on Windows.

## Step 4: Install the Selected Workload

After selecting the "Desktop development with C++" workload, click the "Install" button at the bottom right of the installer window. The installer will then download and install the selected components. This process can take some time depending on your internet connection and system speed, as it involves downloading quite a bit of data.

## Step 5: Restart Your Computer (Recommended)

Although not always strictly necessary, it's highly recommended to restart your computer after the installation of the Visual C++ Build Tools is complete. This ensures that all environment variables and system paths are updated correctly, making the new build tools accessible to `pip` and other applications.

## Step 6: Re-attempt Python Package Installation

After restarting your computer, open a new command prompt or PowerShell window. Navigate to your Python project directory (if applicable) or simply ensure your Python environment is active. Now, try installing the Python package that previously failed. Use your usual `pip` command, for example:

```bash
pip install <package_name>
```

Replace `<package_name>` with the actual name of the package you were trying to install. The installation should now proceed without the "Microsoft Visual C++ 14.0 or greater is required" error.

## Step 7: Verify Installation (Optional)

If you want to be absolutely sure, you can try importing the package in a Python interpreter to confirm it's working correctly.

```python
import <package_name>
print(f"{<package_name>} imported successfully!")
```

### Common Mistakes

A frequent mistake is only installing the "Base build tools" or not selecting the "Desktop development with C++" workload. The installer often presents many options, and it's easy to overlook the specific components needed. Another common error is trying to run `pip install` again in the *same* command prompt window that showed the error *before* installing the build tools and restarting. Environment variables might not be reloaded in an existing session, so always open a *new* terminal after installing the build tools and restarting. Finally, some users might download the full Visual Studio IDE instead of just the Build Tools, which is unnecessary and can consume significant disk space and installation time.

### Prevention Tips

To prevent this error from recurring, always ensure that you have the "Desktop development with C++" workload installed as part of your Visual Studio Build Tools, especially if you frequently work with Python packages that have C/C++ extensions. When setting up a new Python development environment on Windows, it's a good practice to install these build tools proactively. Additionally, keep your Visual Studio Build Tools updated. Periodically check for updates through the Visual Studio Installer, as newer versions might be required by future Python package releases. Following these steps will greatly minimize the chances of encountering this frustrating error.