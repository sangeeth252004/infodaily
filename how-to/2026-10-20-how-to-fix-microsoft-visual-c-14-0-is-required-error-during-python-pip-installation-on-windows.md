---
title: "How to Fix 'Microsoft Visual C++ 14.0 is required' Error During Python Pip Installation on Windows"
date: "2026-10-20T22:56:07.822Z"
slug: "how-to-fix-microsoft-visual-c-14-0-is-required-error-during-python-pip-installation-on-windows"
type: "how-to"
description: "A step-by-step guide to resolve the 'Microsoft Visual C++ 14.0 is required' error encountered during Python pip installation on Windows, detailing the necessary Build Tools and installation steps."
keywords: "Python, pip, Visual C++, Visual C++ 14.0, Build Tools, Windows, installation error, fix, compile error, Microsoft Visual C++ Build Tools, Python packages, C extensions"
---

### Problem Explanation

When attempting to install certain Python packages using `pip` on a Windows operating system, you might encounter an error message indicating a missing C++ compiler. This typically occurs for packages that are not pure Python and contain components written in C, C++, or Fortran, requiring compilation during the installation process. Common examples include scientific computing libraries like `numpy`, `scipy`, `pandas`, or others like `lxml`, `Pillow`, `psycopg2`, and `scikit-learn`.

The precise error message you will see in your command prompt or PowerShell window will often look similar to this:

```
error: Microsoft Visual C++ 14.0 is required. Get it with "Microsoft Visual C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This message might be accompanied by additional lines indicating `failed with exit code 2`, `Unable to find vcvarsall.bat`, or other compilation-related failures. The core issue, however, remains the absence of the necessary C++ compiler.

### Why It Happens

Python, by its nature, is an interpreted language. However, for performance-critical operations or to interface with existing C/C++ libraries, many powerful Python packages are developed with underlying C or C++ code. When you run `pip install` for such a package, `pip` doesn't just download pre-compiled binaries; it attempts to compile the source code components of the package directly on your machine.

On Windows, the standard and expected compiler for Python extensions is Microsoft Visual C++. Specifically, different versions of Python are built using different versions of the Visual C++ compiler. For example, Python 3.5 through 3.8 were built with Visual C++ 14.0 (part of Visual Studio 2015), while newer Python versions (3.9 and above) use more recent versions of the Visual C++ compiler. Although the error message often specifically mentions "14.0", it refers to the minimum runtime library compatibility. The problem arises because the required Visual C++ compiler tools, known as the "Build Tools for Visual Studio," are either not installed on your system or not correctly configured in your system's environment variables for `pip` to find them. Without these tools, `pip` cannot compile the C/C++ extensions, and the installation fails.

### Step-by-Step Solution

To resolve the 'Microsoft Visual C++ 14.0 is required' error, you need to install the appropriate Microsoft Visual C++ Build Tools package and ensure it is correctly configured.

#### Step 1: Identify Your Python Version

Before proceeding, determine which version of Python you are using, as this can sometimes influence the precise compiler requirements. Open your Command Prompt or PowerShell and run one of the following commands:

```bash
python --version
```
or, if you have multiple Python installations, specify the one you are using:
```bash
py -3.x --version
```
(Replace `3.x` with your specific version, e.g., `py -3.9 --version`).
Note down your Python version (e.g., Python 3.9.7).

#### Step 2: Download Visual Studio Build Tools

Navigate to the official Microsoft Visual Studio download page to obtain the necessary Build Tools.
Go to: [https://visualstudio.microsoft.com/downloads/](https://visualstudio.microsoft.com/downloads/)

Scroll down to the "Tools for Visual Studio" section. Under this, locate "Build Tools for Visual Studio 2022" (or the latest available stable version). Click the "Download" button next to it. Although the error mentions "14.0", the Visual Studio 2022 Build Tools are generally backward-compatible and include the necessary toolsets for most Python versions that trigger this error.

#### Step 3: Install Visual Studio Build Tools with "Desktop development with C++"

Once the installer (e.g., `vs_BuildTools.exe`) has downloaded, run it.
1.  The Visual Studio Installer will launch. You might see a window asking to install the installer itself first; let it complete.
2.  Once the main installer window appears, you will see a list of "Workloads." This is the crucial step.
3.  Select the **"Desktop development with C++"** workload. This workload includes all the essential components for C++ development, including the MSVC compilers and build tools that Python requires.
4.  On the right-hand side, under "Installation details," you can verify that components like "MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)" and potentially older toolsets if needed, are selected. For most modern Python versions, the default selection within "Desktop development with C++" is sufficient.
5.  Click the **"Install"** button. The installation can take some time and consume several gigabytes of disk space.

#### Step 4: Restart Your Command Prompt or PowerShell

After the Visual Studio Build Tools installation completes, it is absolutely essential to close any open Command Prompt or PowerShell windows and then open a new one. This ensures that the system's environment variables are refreshed and the newly installed compiler tools are correctly added to your system's PATH, making them discoverable by `pip`.

#### Step 5: Retry Your Pip Installation

With the Build Tools installed and your terminal restarted, you can now retry installing the Python package that previously failed.

Open your new Command Prompt or PowerShell window and run the `pip install` command again:

```bash
pip install <package_name>
```
Replace `<package_name>` with the actual package you were trying to install (e.g., `pip install numpy`). The installation should now proceed without the "Microsoft Visual C++ 14.0 is required" error, as `pip` can successfully find and use the compiler.

#### Step 6 (Alternative/Workaround): Utilize Pre-built Wheels

If, for some reason, installing the Build Tools is not feasible or you still encounter issues, many complex Python packages (especially those with C extensions) offer pre-compiled binary packages known as "wheel" files (`.whl`). These wheels bypass the need for local compilation entirely.

1.  First, ensure you have the `wheel` package installed:
    ```bash
    pip install wheel
    ```
2.  Search for your desired package's `.whl` file. A common resource for unofficial but highly reliable Windows wheel files is Christoph Gohlke's website: [https://www.lfd.uci.edu/~gohlke/pythonlibs/](https://www.lfd.uci.edu/~gohlke/pythonlibs/). Be sure to download the wheel file that matches your Python version (e.g., `cp39` for Python 3.9) and your system architecture (e.g., `win_amd64` for 64-bit Windows).
3.  Once downloaded, navigate your Command Prompt to the directory where you saved the `.whl` file and install it using `pip`:
    ```bash
    pip install "C:\path\to\your\downloaded_package-version-pyXY-none-any.whl"
    ```
    (Replace the path and filename with your actual file).

### Common Mistakes

*   **Installing the full Visual Studio IDE:** Many users mistakenly download and install the entire Visual Studio integrated development environment (IDE) thinking it's required. While the IDE includes the Build Tools, it's a much larger download and installation than necessary. The "Build Tools for Visual Studio" is a standalone, lightweight package specifically for command-line compilation.
*   **Not selecting "Desktop development with C++":** During the Visual Studio Build Tools installation, failing to select the "Desktop development with C++" workload means the crucial C++ compilers and related tools will not be installed, leaving the problem unresolved.
*   **Forgetting to restart the terminal:** Environment variables are set when a process (like your Command Prompt) starts. If you don't close and reopen your terminal after installing the Build Tools, it won't recognize the newly available compilers.
*   **Installing older Visual C++ Redistributables:** The error specifically asks for *Build Tools*, which are compilers, not *Redistributables*. Redistributables are runtime components needed to *run* applications compiled with Visual C++, not to *compile* them. Installing these will not solve the problem.
*   **Ignoring Python version compatibility:** While the latest Build Tools are often backward compatible, if you're using a very old Python version (e.g., Python 3.4 or earlier), you might need an older, specific version of the Visual C++ Build Tools (e.g., VS 2010 or VS 2015). Always check your Python version's official documentation for its specific compiler requirements if the general solution fails.

### Prevention Tips

*   **Use Virtual Environments:** Always develop your Python projects within virtual environments (`venv` or `conda`). This isolates your project dependencies, prevents conflicts between different projects, and helps manage package installations more cleanly.
*   **Prioritize Pre-built Wheels:** For packages known to have C extensions, always check if a pre-built wheel (`.whl` file) is available for your specific Python version and operating system architecture. Installing wheels is significantly faster and completely bypasses the need for a local compiler. Many popular packages on PyPI automatically provide wheels.
*   **Keep Build Tools Updated:** If you frequently work with Python packages requiring compilation, it's good practice to keep your Visual Studio Build Tools updated to the latest stable version, as this often includes support for newer compiler features and bug fixes.
*   **Consider Anaconda/Miniconda:** For data science, machine learning, or scientific computing workflows, using Anaconda or Miniconda distributions can significantly simplify dependency management. These distributions often come with many complex packages (like NumPy, SciPy, Pandas) pre-compiled and optimized, reducing the chance of encountering compilation errors during `pip` installations.
*   **Read Package Documentation:** Before installing a challenging package, consult its official documentation. Developers often provide specific installation instructions or prerequisites for different operating systems, which can save you time and effort.