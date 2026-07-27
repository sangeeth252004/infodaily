---
title: "How to Fix the \"Microsoft Visual C++ 14.0 or greater is required\" Error During Python Package Installation"
date: "2026-07-27T08:29:36.124Z"
slug: "how-to-fix-the-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation"
type: "how-to"
description: "Resolve the \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages. Learn why this error occurs and get a step-by-step guide to installing the necessary C++ build tools or using pre-compiled wheels."
keywords: "Python error, pip install error, Visual C++ 14.0 required, Microsoft Visual C++ Build Tools, Python package installation, C++ compiler Python, pre-compiled wheels, Python Windows, fixing build error"
---

### Problem Explanation

You're likely here because you've encountered a frustrating error message while trying to install a Python package using `pip`. The exact message you'll see typically looks something like this:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft Visual C++ Build Tools": https://visualstudio.microsoft.com/downloads/
```

This error usually halts the installation process, preventing your desired Python package from being set up. It appears prominently in your terminal or command prompt, often after `pip` has tried to download a package and begins the "Building wheel for..." phase. You might also see related messages mentioning `failed with exit status 2` or `error: command 'C:\\Program Files (x86)\\Microsoft Visual Studio\\...\\cl.exe' failed`. Essentially, your Python environment is telling you it needs a specific development tool that isn't present on your system.

### Why It Happens

This error occurs because many popular Python packages, especially those involved in scientific computing, data analysis, machine learning, or low-level system interactions (like NumPy, SciPy, Pandas, TensorFlow, PyTorch, or even some cryptography libraries), are not written *entirely* in Python. Instead, they include components written in languages like C, C++, or Fortran for performance reasons.

When you try to install such a package using `pip`, if a pre-compiled version (known as a "wheel" file, with a `.whl` extension) isn't available for your specific Python version and operating system, `pip` attempts to compile these C/C++ components from their source code. To perform this compilation on a Windows system, `pip` requires a compatible C++ compiler. The error message explicitly states that "Microsoft Visual C++ 14.0 or greater" is needed. This refers to the specific version of Microsoft's C++ compiler and related build tools, which are usually part of the Visual Studio suite. Without these tools, the compilation fails, and your package installation grinds to a halt.

### Step-by-Step Solution

Solving this issue primarily involves providing your Python environment with the necessary C++ compiler. Here's how to do it:

### 1. Identify the Missing Build Tools

The error message is quite direct: "Microsoft Visual C++ 14.0 or greater is required." This means you need the Microsoft Visual C++ Build Tools. These tools are separate from the full Visual Studio Integrated Development Environment (IDE) and can be installed independently, making them a lighter-weight solution if you don't need the entire IDE.

### 2. Download the Visual Studio Installer

The easiest way to get the necessary build tools is through the Visual Studio Installer.
*   Open your web browser and navigate to the official Microsoft Visual Studio download page. You can usually find this by searching for "Visual Studio Build Tools" or "Visual Studio Community" on your preferred search engine.
*   Look for the section that offers "Build Tools for Visual Studio" or "Visual Studio Community" (the free version). If you only need the build tools, download the "Build Tools" installer. If you plan on doing more C++/C# development in the future, the "Community" edition is also a valid choice as it includes the build tools.
*   Once downloaded, run the executable file (e.g., `vs_buildtools__*.exe` or `vs_community__*.exe`). This will launch the Visual Studio Installer.

### 3. Install the "Desktop development with C++" Workload

After launching the Visual Studio Installer:
*   The installer will present you with various "workloads." These are pre-selected bundles of tools for different development scenarios.
*   Crucially, you need to select the "Desktop development with C++" workload. This workload includes the MSVC v143 (or similar, depending on the Visual Studio version) build tools, Windows SDK, and other necessary components for C++ compilation.
*   On the right side of the installer, after selecting the workload, you can review "Installation details." Ensure that "MSVC v143 - VS 2022 C++ x64/x86 build tools (latest)" or similar components for C++ are selected. If you downloaded the Build Tools installer, this workload might be presented directly or as part of a custom installation.
*   Click the "Install" button. This download and installation process can take some time, depending on your internet speed and system performance, as it's downloading several gigabytes of data.

### 4. Restart Your System (Optional but Recommended)

While sometimes not strictly necessary, restarting your computer after installing major system components like build tools can help ensure that all environment variables and system paths are correctly updated and recognized by your operating system and command line. This can prevent subtle issues where the system still can't find the newly installed compiler.

### 5. Verify the Installation by Retrying Package Installation

After the installation is complete and you've optionally restarted:
*   Open a new command prompt or terminal window. It's important to open a *new* one, as existing terminals might not have the updated system paths.
*   Navigate to your project directory or virtual environment.
*   Attempt to install the Python package that previously failed:
    ```bash
    pip install your_package_name
    ```
*   If the build tools were correctly installed, `pip` should now be able to find and utilize the C++ compiler, successfully compiling the necessary components and installing your package.

### 6. Consider Using Pre-Compiled Wheels (Alternative/Complementary)

If for some reason installing the build tools is problematic, or you simply prefer to avoid compilation, many popular packages offer pre-compiled "wheel" files (`.whl`) for various Python versions and architectures.
*   Before running `pip install`, you can often find these wheels on PyPI. `pip` will automatically try to find and download a wheel if one is available.
*   Alternatively, for packages that are difficult to build or have specific dependencies, unofficial repositories like "Unofficial Windows Binaries for Python Extension Packages" (search for it) often provide pre-compiled `.whl` files. You can download the appropriate `.whl` file for your Python version and then install it locally:
    ```bash
    pip install C:\path\to\your_package_name-version-pyXX-none-any.whl
    ```
    Replace `C:\path\to\` with the actual path and filename. This method bypasses the need for local compilation entirely.

### 7. Ensure Your Virtual Environment is Active (If Used)

If you are working within a Python virtual environment, always ensure it is activated *before* attempting `pip install`. The build tools are system-wide, but the Python environment needs to be correctly set up to use `pip` for the desired Python interpreter.

### Common Mistakes

*   **Not selecting the "Desktop development with C++" workload:** This is the most frequent error. Users download the Visual Studio Installer but either don't select any workload, or select an incorrect one (like "Python development" without the C++ components), leading to the compiler still being missing.
*   **Not restarting the terminal/system:** After installing the build tools, the system's PATH environment variable needs to be updated. An old terminal window might not recognize the new tools. A full system restart ensures everything is refreshed.
*   **Ignoring the specific error details:** While the headline error is clear, sometimes subsequent lines provide clues if the C++ tools are installed but *still* not found (e.g., path issues). Always skim the full error output.
*   **Installing the full Visual Studio IDE when only build tools are needed:** While not strictly a mistake (it will still work), installing the full IDE takes up significantly more disk space and time than just the build tools.

### Prevention Tips

*   **Prioritize packages with pre-compiled wheels:** Whenever possible, use `pip install` as it automatically tries to find and use pre-compiled wheels. This is the simplest and most robust way to avoid compilation issues.
*   **Keep your build tools updated:** Periodically check for updates to your Visual Studio Build Tools via the Visual Studio Installer. Newer Python packages might occasionally require features from more recent compiler versions.
*   **Understand package dependencies:** Before installing a new package, especially complex scientific ones, check its documentation for system requirements. This can give you a heads-up if C++ compilation will be needed.
*   **Use virtual environments:** While virtual environments don't prevent the C++ compiler issue, they isolate your project dependencies. If you successfully install a challenging package in one environment, it won't affect or conflict with other projects.
*   **Leverage unofficial binaries for specific scenarios:** If you frequently work with a specific package that often fails to build, consider keeping a known good `.whl` file for your Python version handy, especially if official wheels are slow to update.