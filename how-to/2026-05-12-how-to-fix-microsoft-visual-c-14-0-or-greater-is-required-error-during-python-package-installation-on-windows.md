---
title: "How to Fix \"Microsoft Visual C++ 14.0 or greater is required\" Error During Python Package Installation on Windows"
date: "2026-05-12T17:10:00.656Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "A comprehensive, step-by-step guide to resolve the \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages on Windows, by installing the necessary Visual Studio Build Tools."
keywords: "Python, pip, error, Microsoft Visual C++, Visual C++ 14.0, build tools, Windows, package installation, compiler, C++, solution, fix, programming, development, numpy, scipy"
---

### Problem Explanation

You're likely here because you've encountered a frustrating error message while trying to install a Python package using `pip` on your Windows machine. The error typically manifests itself with output similar to this:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This message usually appears during the installation of specific Python packages, especially those that rely on underlying C, C++, or Fortran code for performance or functionality. Common culprits include scientific computing libraries like `numpy`, `scipy`, `pandas`, `cryptography`, `lxml`, and many others that need to compile native extensions. When `pip` attempts to install such a package from its source distribution (rather than a pre-compiled binary wheel), it tries to build these extensions, leading to the reported error if the necessary tools are missing.

### Why It Happens

This error occurs because your Python environment, when attempting to install a package from its source code, cannot find a suitable C++ compiler. Python itself on Windows is typically compiled using Microsoft Visual C++ (MSVC). To maintain compatibility and ensure that native extensions built for your Python installation work correctly, any extensions you compile yourself also need to be built with a compatible version of the MSVC compiler.

The error message "Microsoft Visual C++ 14.0 or greater is required" specifically indicates that `pip` needs access to the MSVC compiler that was part of Visual Studio 2015 (which introduced version 14.0 of the compiler) or any newer version (like Visual Studio 2017, 2019, or 2022). These compilers are not part of a standard Windows installation or a typical Python installation. They need to be installed separately as part of the "Microsoft C++ Build Tools" package, which provides the necessary compiler, headers, and libraries without requiring a full Visual Studio Integrated Development Environment (IDE).

### Step-by-Step Solution

Follow these steps carefully to install the required build tools and resolve the error.

#### Step 1: Understand the Specific Requirement

The error message specifically requests "Microsoft Visual C++ 14.0 or greater." This means you need the C++ build tools associated with Visual Studio 2015 or any later version (2017, 2019, 2022). While a full Visual Studio IDE includes these tools, it's often overkill. The leaner "Build Tools" package is usually sufficient.

#### Step 2: Download the Visual Studio Build Tools Installer

Navigate to the official Microsoft Visual Studio download page. You can find this by searching for "Visual Studio Build Tools" on your preferred search engine. Look for the "Tools for Visual Studio" section. You'll typically find a link to download "Build Tools for Visual Studio 2022" (or the latest stable version). This will download a small executable file, often named `vs_buildtools.exe`.

*Self-correction: No direct link will be provided, as per instructions.*

#### Step 3: Run the Visual Studio Installer and Choose Workloads

1.  Locate the downloaded `vs_buildtools.exe` file and double-click it to start the Visual Studio Installer.
2.  If prompted by User Account Control (UAC), click "Yes" to allow the installer to make changes.
3.  The installer will initialize and then present you with several options. You might need to click "Install" initially to install the installer itself, then it will launch the main interface.

#### Step 4: Install the "Desktop development with C++" Workload

This is the most critical step. In the Visual Studio Installer window:

1.  Go to the "Workloads" tab.
2.  Locate and **select the checkbox** next to **"Desktop development with C++"**. This workload includes all the essential components for C++ development on Windows, including the MSVC compiler, Windows SDK, and other necessary libraries.
3.  On the right-hand side, under the "Installation details" section, you can review the individual components that will be installed. Ensure that at least "MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)" (or similar for your chosen VS version) and a "Windows SDK" are selected. You can optionally uncheck other components you absolutely don't need to save disk space, but be careful not to remove essential C++ build tools.
4.  Click the "Install" button.

The installation process can take some time, depending on your internet speed and system performance, as it needs to download and install several gigabytes of data.

#### Step 5: Restart Your System (Recommended)

Once the installation of the Visual Studio Build Tools is complete, it's highly recommended to **restart your computer**. This ensures that all new environment variables and system paths are correctly updated and recognized by your operating system and command line. While not always strictly necessary, skipping this step can sometimes lead to the error persisting because the system doesn't immediately recognize the newly installed tools.

#### Step 6: Retry Python Package Installation

After your system has restarted and is fully loaded, open a new command prompt or PowerShell window. Navigate back to your project directory (if applicable) or simply try to install the problematic Python package again.

For example, if you were trying to install `numpy`, run:

```bash
pip install numpy
```

If the build tools were correctly installed and configured, `pip` should now be able to find and use the MSVC compiler to build any necessary C/C++ extensions, and the installation should proceed without the "Microsoft Visual C++ 14.0 or greater is required" error.

### Common Mistakes

*   **Installing the full Visual Studio IDE:** While the full IDE includes the build tools, it's much larger and more complex than what's needed for Python package compilation alone. Users often install the full IDE when only the lightweight Build Tools are sufficient.
*   **Forgetting to select the "Desktop development with C++" workload:** This is the most frequent mistake. Simply installing the Visual Studio Installer and not selecting the specific workload means the core C++ compiler components are still missing.
*   **Not restarting after installation:** As mentioned, new environment variables might not be registered immediately. Failing to restart your command prompt, terminal, or even your entire system can lead to the error persisting even after successful installation.
*   **Confusing Visual C++ Redistributables with Build Tools:** The redistributables are runtime components required by applications *after* they are compiled. They do not contain the compiler or tools needed to *build* applications or Python extensions.
*   **Ignoring the "or greater" part:** Attempting to install older, incompatible versions of Visual C++ tools instead of the recommended 14.0 or newer.

### Prevention Tips

*   **Prioritize Binary Wheels:** Whenever possible, try to install Python packages that are distributed as pre-compiled binary "wheels" (`.whl` files). These files contain pre-built binaries for specific Python versions and Windows architectures, eliminating the need for local compilation. `pip` automatically prefers wheels if they are available on PyPI.
*   **Keep Build Tools Updated:** If you regularly work with packages requiring compilation, it's a good practice to periodically check for updates to your Visual Studio Build Tools to ensure compatibility with newer packages and Python versions.
*   **Use Virtual Environments:** Always use Python virtual environments for your projects. This isolates dependencies and helps prevent conflicts between different projects. While virtual environments don't prevent the need for build tools, they ensure a clean and controlled environment for troubleshooting.
*   **Update `pip` and `setuptools`:** Ensure your `pip` and `setuptools` packages are up-to-date within your virtual environment:
    ```bash
    python -m pip install --upgrade pip setuptools wheel
    ```
    An updated `pip` is better at finding and utilizing available wheels, and `setuptools` is crucial for the build process itself.