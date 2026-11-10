---
title: "How to Fix \"Microsoft Visual C++ 14.0 or Greater Is Required\" Error During Python Package Installation"
date: "2026-11-10T05:58:29.709Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation"
type: "how-to"
description: "Resolve the common \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages with this comprehensive, step-by-step guide. Learn why it happens and how to fix it effectively."
keywords: "Python, Visual C++, C++ 14.0, package installation error, pip, Windows, compiler, build tools, Python development"
---

# How to Fix "Microsoft Visual C++ 14.0 or Greater Is Required" Error During Python Package Installation

Encountering the error message "Microsoft Visual C++ 14.0 or greater is required" while trying to install Python packages using `pip` can be a frustrating roadblock for developers. This message typically appears when you attempt to install a package that needs to be compiled from source code, and your system lacks the necessary C++ build tools. The installation process fails, leaving you unable to proceed with your project.

This error message, often accompanied by more detailed compiler output, signifies that a Python package you're trying to install contains components written in C or C++. These extensions are compiled into machine code to improve performance or interface with existing libraries. When `pip` encounters such a package, it attempts to build these extensions on your machine. If the required C++ compiler and development libraries (specifically, the version corresponding to Visual C++ 14.0 or higher, which aligns with Visual Studio 2015 and later) are not present, the compilation fails, resulting in this error.

## Why It Happens

The root cause of this error is a missing or incompatible C++ build environment on your Windows system. Many popular Python packages, especially those dealing with scientific computing, data analysis, machine learning, or image processing (like NumPy, SciPy, Pandas, or image-related libraries), rely on C/C++ extensions for speed and efficiency. These extensions are often pre-compiled and distributed as "wheels" for common Python versions and operating systems. However, if a wheel isn't available for your specific combination of Python version and operating system, or if you're installing a package directly from its source distribution (sdist), `pip` will attempt to compile the C/C++ code locally.

The error message specifically points to "Microsoft Visual C++ 14.0 or greater" because this is the version of the C++ build tools that is compatible with and used by modern Python versions (specifically Python 3.5 and later). Without the correct version of the Microsoft Visual C++ Build Tools installed, `pip` cannot find a suitable compiler to translate the C/C++ source code into executable components for the Python package, thus leading to the installation failure.

## Step-by-Step Solution

The most straightforward and reliable solution is to install the Microsoft C++ Build Tools that are compatible with your Python installation.

### Step 1: Determine Your Python Version

Before downloading and installing anything, it's crucial to know which version of Python you are using. Open your command prompt or terminal and type:

```bash
python --version
```

or if you have multiple Python installations managed by `py.exe`:

```bash
py --version
```

Note down the major and minor version number (e.g., Python 3.9, Python 3.10, Python 3.11). This will help you select the correct Visual C++ Build Tools.

### Step 2: Identify the Required Visual C++ Redistributable or Build Tools

Microsoft provides these tools in different packages. For recent Python versions (Python 3.5+), you generally need the **Microsoft Build Tools for Visual Studio**.

You can download the **Build Tools for Visual Studio 2022** (which includes C++ build tools compatible with Visual Studio 2015, 2017, 2019, and 2022) from the official Visual Studio website. Search for "Build Tools for Visual Studio 2022" or navigate directly to the Visual Studio downloads page.

*   **Important Note:** While you can install the full Visual Studio IDE, for this specific error, you only need the **Build Tools** component, which is a smaller download.

### Step 3: Download and Run the Visual Studio Installer

1.  Navigate to the Visual Studio downloads page.
2.  Scroll down to "Tools for Visual Studio" and click on "Download" for "Build Tools for Visual Studio 2022".
3.  Once the installer (`vs_buildtools.exe` or similar) is downloaded, run it.

### Step 4: Select the "C++ build tools" Workload

The Visual Studio Installer will launch. You will be presented with a list of workloads.

1.  In the "Workloads" tab, find and select the checkbox next to **"Desktop development with C++"**. This workload includes the necessary C++ compiler, libraries, and build tools required for your Python package installations.
2.  On the right-hand side, under "Installation details", ensure that the core C++ build tools are selected. Usually, just selecting the workload is sufficient as it bundles the essential components.
3.  Click the **"Install"** button.

The installer will download and install the selected components. This process can take a significant amount of time depending on your internet connection and system resources.

### Step 5: Restart Your Computer

After the installation of the Build Tools is complete, it is highly recommended to restart your computer. This ensures that all system changes are properly applied and that the environment variables are updated correctly, allowing Python and `pip` to recognize the newly installed compiler.

### Step 6: Re-attempt Python Package Installation

Once your computer has restarted, open a new command prompt or terminal window. Navigate back to your Python project directory (if necessary) and try installing the problematic package again using `pip`.

```bash
pip install <package_name>
```

For example:

```bash
pip install numpy
```

If the C++ Build Tools were installed correctly, `pip` should now be able to find the necessary compiler and successfully build and install the package.

### Step 7: Verify Installation

After the installation completes without errors, you can verify that the package is installed and working correctly by trying to import it in a Python interpreter.

```python
import <package_name>
print(<package_name>.__version__)
```

## Common Mistakes

A common pitfall is attempting to install older versions of the Visual C++ Redistributable packages (like those for Visual Studio 2013 or earlier) when a newer Python version requires Visual C++ 14.0 or later. The error message "Microsoft Visual C++ 14.0 or greater is required" is specific, and a mismatch in versions will not resolve the issue. Another mistake is only installing the "Visual Studio IDE" without selecting the "Desktop development with C++" workload within the installer. The IDE itself doesn't automatically include the necessary build tools for external compilation. Finally, forgetting to restart the computer after installation can also lead to the error persisting because the system hasn't fully registered the new build tools.

## Prevention Tips

To prevent this error from occurring in the future, maintain a consistent development environment. Always ensure you have the "Desktop development with C++" workload installed if you anticipate working with Python packages that require compilation. When setting up a new development machine or a new virtual environment, make it a practice to install these build tools early in the process. Regularly checking for updates to the Visual Studio Build Tools can also help keep your environment compatible with newer Python versions and packages. Furthermore, when using virtual environments, ensure that the build tools are accessible to the environment. While `pip` generally handles this correctly after system-wide installation, keeping your system's build tools up-to-date is a good general practice.