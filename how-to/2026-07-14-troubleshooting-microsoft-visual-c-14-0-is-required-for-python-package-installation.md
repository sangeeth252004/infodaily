---
title: "Troubleshooting \"Microsoft Visual C++ 14.0 is Required\" for Python Package Installation"
date: "2026-07-14T07:10:09.061Z"
slug: "troubleshooting-microsoft-visual-c-14-0-is-required-for-python-package-installation"
type: "how-to"
description: "Learn how to resolve the common \"Microsoft Visual C++ 14.0 is required\" error when installing Python packages with clear, step-by-step instructions."
keywords: "Python, Visual C++, C++ 14.0, package installation, error fix, pip, build tools, development environment"
---

# Troubleshooting "Microsoft Visual C++ 14.0 is Required" for Python Package Installation

You're trying to install a new Python package using `pip`, but suddenly you're hit with an error message that looks something like this:

```
Microsoft Visual C++ 14.0 or greater is required. Get it from https://visualstudio.microsoft.com/visual-cpp-build-tools/
error: command 'cl.exe' failed with exit status 2
```

Or perhaps a slightly different variation indicating a failure to build a required component. This can be a frustrating roadblock, especially when you're eager to get started with a new library or framework. You might be wondering what C++ has to do with your Python project in the first place!

## Why It Happens

The "Microsoft Visual C++ 14.0 is required" error typically arises when you're attempting to install a Python package that needs to be compiled from source code. Many Python packages, especially those that interface with lower-level systems or offer significant performance enhancements, are written in C or C++. When `pip` encounters such a package, it tries to build (compile) the C/C++ components directly on your machine.

This compilation process requires a C++ compiler and the associated development tools. On Windows, the standard toolset for this is Microsoft Visual C++. Specifically, the error message points to "Visual C++ 14.0 or greater," which corresponds to the build tools included with Visual Studio 2015, 2017, 2019, and 2022. If these tools are not present or not correctly configured on your system, the compilation process fails, leading to the error you see.

## Step-by-Step Solution

The most reliable way to resolve this issue is to install the necessary Microsoft Visual C++ Build Tools. Here’s how to do it:

### Step 1: Download Visual C++ Build Tools

First, you need to obtain the correct installer.

1.  Navigate to the official Microsoft Visual Studio downloads page. Search for "Visual Studio Build Tools" or directly access the link provided in the error message: [https://visualstudio.microsoft.com/visual-cpp-build-tools/](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
2.  On the Visual C++ Build Tools download page, you'll find different versions. Look for the latest supported version. You typically want the "Build Tools for Visual Studio" installer, not a full IDE like Visual Studio Community or Professional unless you plan to do extensive C++ development.
3.  Click the "Download" button for the Build Tools. This will download a small installer executable.

### Step 2: Run the Visual Studio Installer

Once the download is complete, locate the installer file (e.g., `vs_buildtools.exe`) and run it as an administrator.

1.  Double-click the downloaded installer file.
2.  If prompted by User Account Control (UAC), click "Yes" to allow the installer to make changes.
3.  The Visual Studio Installer will launch. It might perform an initial update before presenting you with workload options.

### Step 3: Select the Correct Workload

This is a crucial step. You need to select the workload that includes the C++ build tools.

1.  In the Visual Studio Installer, under the "Workloads" tab, find and check the box labeled **"Desktop development with C++"**.
2.  Ensure that the individual components within this workload are also selected. Typically, the default selections are sufficient. If you see options like "MSVC v142 - VS 2019 C++ x64/x86 build tools" or similar (the version number might vary, but it should be 14.0 or higher), make sure they are checked. The installer usually selects the most appropriate ones by default when you check the main workload.
3.  On the right-hand side of the installer, you will see the "Installation details." Verify that components related to MSVC (Microsoft Visual C++) and the correct toolset version (e.g., v14x) are included.

### Step 4: Install the Selected Components

Now, proceed with the installation of the selected components.

1.  Click the "Install" button at the bottom right of the Visual Studio Installer window.
2.  The installer will download and install the selected C++ build tools and related dependencies. This process might take some time, depending on your internet speed and system performance.
3.  You may be prompted to restart your computer after the installation is complete. It's generally a good practice to do so to ensure all changes are applied correctly.

### Step 5: Verify the Installation (Optional but Recommended)

After restarting your computer, it's a good idea to verify that the build tools are installed and accessible.

1.  Open a new Command Prompt or PowerShell window.
2.  Try to run a simple C++ compilation command. A quick way to do this is by creating a dummy C++ file.
    *   Create a file named `hello.cpp` in a temporary directory (e.g., `C:\temp\hello.cpp`) with the following content:
        ```cpp
        #include <iostream>

        int main() {
            std::cout << "Hello, C++!" << std::endl;
            return 0;
        }
        ```
    *   Open your Command Prompt and navigate to the directory where you saved `hello.cpp`.
    *   You need to ensure the C++ compiler (`cl.exe`) is in your system's PATH. The Visual Studio Installer usually sets this up, but you might need to use a "Developer Command Prompt" or manually add the path. A more reliable way is to launch the **"Developer Command Prompt for VS 20XX"** (where XX is your Visual Studio version, e.g., 2022) from the Start Menu.
    *   In the Developer Command Prompt, run: `cl hello.cpp`
    *   If compilation is successful, you'll see compiler output and potentially a `hello.exe` file will be created. If you get an error like "'cl' is not recognized," the build tools might not be correctly configured in your PATH, or the installation was incomplete.

### Step 6: Reinstall the Python Package

With the C++ build tools in place, you can now retry installing the Python package that caused the error.

1.  Open a new Command Prompt or PowerShell window. It's best to start fresh after installing new system components.
2.  Use `pip` to install the package again. For example, if you were trying to install `some_package`:
    ```bash
    pip install some_package
    ```
3.  If the installation was successful, you should no longer see the "Microsoft Visual C++ 14.0 is required" error, and the package should install correctly.

## Common Mistakes

Several common mistakes can hinder the resolution of this error. One is attempting to install the "Build Tools for Visual Studio" without selecting the "Desktop development with C++" workload. The installer downloads many components, and without explicitly choosing this workload, the necessary C++ compiler and headers will not be present. Another mistake is not running the installer as an administrator, which can sometimes lead to permission issues during installation. Finally, users sometimes forget to restart their computer after installation, which can prevent the system from recognizing the newly installed tools. Always try to install and then restart before attempting the `pip install` again.

## Prevention Tips

To prevent this error from recurring in the future, consider these best practices. Firstly, when setting up a new Python development environment on Windows, it's often wise to install the Visual C++ Build Tools proactively, especially if you anticipate working with packages that rely on compiled extensions. This saves you from encountering the error later. Secondly, maintain your Python environment and system updates. While you don't need the full Visual Studio IDE for most Python development, keeping the Build Tools updated can resolve bugs and improve compatibility. Lastly, when working in team environments or on different machines, document the required build tools, including the specific version or workload needed for your project's dependencies. This ensures that anyone setting up the environment can quickly install the necessary components.