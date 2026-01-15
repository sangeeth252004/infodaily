---
title: "How to Fix \"Microsoft Visual C++ 14.0 or greater is required\" Error During Python Package Installation"
date: "2026-01-15T10:24:18.019Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation"
type: "how-to"
description: "Stuck with \"Microsoft Visual C++ 14.0 or greater is required\" during Python package installation? This guide provides a step-by-step solution to get your Python environment back on track by installing the necessary C++ build tools."
keywords: "Python, pip, Visual C++, Visual Studio, Build Tools, C++ compiler, Windows, package installation, error fix, pip install, Microsoft Visual C++ 14.0"
---

### Problem Explanation

You've encountered a common roadblock for Python developers on Windows: the "Microsoft Visual C++ 14.0 or greater is required" error. This typically occurs when you're trying to install a Python package using `pip` (or other package managers) and the installation process fails abruptly. Instead of a successful installation message, your terminal fills with red error text, prominently featuring a message similar to this:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This error signals that the system lacks a crucial component needed to build certain Python packages. You'll most frequently see this with scientific computing libraries like `numpy`, `scipy`, `pandas`, or others that involve performance-critical C/C++ extensions, such as `Pillow` (for image processing), `lxml` (for XML parsing), or even some database connectors.

### Why It Happens

The root cause of this error lies in how some Python packages are distributed and installed, particularly on Windows. While many Python packages are "pure Python" and install without needing special compilers, a significant number include parts written in C, C++, or Fortran. These "extension modules" are used to boost performance, interact directly with system hardware, or integrate with existing C/C++ libraries.

When you attempt to install such a package, `pip` first tries to find a pre-compiled binary package, known as a "wheel" file (`.whl`), that matches your specific Python version and Windows architecture (32-bit or 64-bit). If a suitable wheel is found on the Python Package Index (PyPI), the installation is usually smooth.

However, if `pip` cannot find a pre-compiled wheel for your exact setup (perhaps due to an unusual Python version, a very new or old package version, or a niche package), it falls back to downloading the package's source code and attempting to *compile* those C/C++ extensions directly on your machine. Unlike Linux or macOS, which often come with development tools like `gcc` pre-installed or easily installable, a standard Windows installation does not include a C/C++ compiler. The "Microsoft Visual C++ 14.0 or greater is required" message tells you precisely what's missing: the necessary Microsoft Visual C++ compiler that matches the version Python itself was compiled with, or a compatible newer version.

### Step-by-Step Solution

Solving this problem primarily involves installing the correct Microsoft Visual C++ Build Tools. Follow these steps to get your Python package installations back on track.

#### ## Step 1: Understand the Requirement for C++ Build Tools

Before you proceed, understand that installing Microsoft C++ Build Tools is the definitive and recommended solution for this specific error. It provides the compiler and development libraries that Python packages need to build their C/C++ components on your Windows system. Do not confuse this with needing a full Visual Studio Integrated Development Environment (IDE); the Build Tools are a lighter, command-line focused installation tailored for compilation.

#### ## Step 2: Download the Microsoft C++ Build Tools Installer

Navigate to the official Microsoft Visual Studio website. Specifically, you'll be looking for the "Build Tools for Visual Studio" or "Microsoft C++ Build Tools" section.

1.  Open your web browser and go to `visualstudio.microsoft.com/downloads/`.
2.  Scroll down to the "Tools for Visual Studio" section.
3.  Locate "Build Tools for Visual Studio" and click the "Download" button next to the latest stable version (e.g., for Visual Studio 2022).
4.  This will download a small executable file, typically named `vs_buildtools.exe`.

#### ## Step 3: Run the Visual Studio Installer and Select Components

This is the most critical step. You need to ensure you select the correct components during the installation process.

1.  **Run the downloaded installer:** Double-click `vs_buildtools.exe`. The Visual Studio Installer will launch and prepare itself.
2.  **Choose Workloads:** Once the installer loads, you will be presented with several "Workloads." The most straightforward and recommended approach is to select:
    *   **"Desktop development with C++"**: This workload includes all the essential components for C++ development, including the MSVC compiler, Windows SDK, and other build tools required by Python packages.
3.  **Alternative (More Specific) Component Selection:** If you prefer a minimal installation or want to ensure you only install what's strictly necessary, you can switch to the "Individual components" tab (if available in your installer version) and select the following:
    *   **Compilers, build tools, and runtimes:**
        *   Look for "MSVC v143 - VS 2022 C++ x64/x86 build tools" (or the equivalent for VS 2019/v142, VS 2017/v141 if recommended by your Python version, though v143 is generally backward compatible and sufficient). Choose the latest stable version.
    *   **SDKs, libraries, and frameworks:**
        *   **"Windows 10 SDK"** or **"Windows 11 SDK"** (select the latest version available).
4.  **Initiate Installation:** After selecting your components (either the workload or individual components), click the "Install" button. The download and installation process will begin. This can take some time, depending on your internet speed and system performance, as the full build tools package is several gigabytes.
5.  **Restart (if prompted):** Once the installation is complete, the installer might prompt you to restart your computer. It's often a good idea to do so to ensure all environment variables are correctly set. If not prompted, proceed to the next step.

#### ## Step 4: Verify the Installation Environment

After the Build Tools are installed, it's crucial to ensure your command prompt environment recognizes them.

1.  **Close and re-open all terminal windows:** Any command prompt, PowerShell, or Git Bash windows that were open during the Build Tools installation will not have the updated environment variables. Close them all and open a *new* terminal window.
2.  **Verify (Optional):** You can try to run a command like `cl.exe` in the new terminal. You might get an error about `cl.exe` not being found in PATH, but if you launch a "Developer Command Prompt for VS 2022" (search for it in your Windows Start Menu), then `cl.exe` should execute and show version information, confirming the tools are accessible. However, for `pip` installations, typically simply installing the tools and restarting your standard terminal is sufficient.

#### ## Step 5: Re-attempt Python Package Installation

With the Visual C++ Build Tools successfully installed and your environment refreshed, you can now try installing your problematic Python package again.

1.  **Open a new terminal:** Ensure you are in a fresh command prompt or terminal window.
2.  **Activate your virtual environment (if applicable):** If you are working within a virtual environment, activate it now using its respective activation script (e.g., `venv\Scripts\activate`).
3.  **Run your `pip install` command:** Execute the `pip install` command for the package that previously failed.

    Example:
    ```bash
    pip install numpy
    ```
    or
    ```bash
    pip install -r requirements.txt
    ```

    This time, `pip` should be able to locate and utilize the installed C++ compiler to build any necessary extensions, leading to a successful installation.

#### ## Step 6: Consider Using Pre-compiled Wheels (Advanced Troubleshooting)

In rare cases, even after installing the Build Tools, you might still encounter issues, perhaps due to very specific package versions or complex dependencies. If the previous steps don't resolve the issue, you might consider manually acquiring a pre-compiled wheel file.

1.  **Search for Official Wheels:** Check PyPI (`pypi.org`) for your package. Sometimes, there are wheels available for specific Python versions that `pip` might miss.
2.  **Search for Unofficial Wheels:** For some particularly tricky packages, community members create and distribute unofficial pre-compiled `.whl` files, especially for Windows. A common source for these is independent build maintainers. Search online for "[package_name] wheel windows" to see if such resources exist. If you find one, ensure it's from a reputable source and compatible with your Python version and Windows architecture. You can then install it using `pip install path/to/your/package_name.whl`.

### Common Mistakes

When encountering and fixing this error, some common missteps include:

*   **Not restarting the terminal:** The installed Build Tools often modify system environment variables. Existing command prompts or terminals won't recognize these changes until they are closed and reopened, or the system is restarted.
*   **Installing the wrong Visual Studio components:** Simply installing the full Visual Studio IDE or selecting unrelated components like "Web development" will not provide the necessary C++ compiler. You must specifically select "Desktop development with C++" or the individual MSVC compiler and Windows SDK components.
*   **Ignoring administrative privileges:** Installing Visual Studio Build Tools requires administrator rights. If you encounter permissions errors during installation, ensure you are running the installer as an administrator.
*   **Expecting `pip` to automatically update environment:** `pip` itself doesn't directly manage system compilers. It relies on the operating system's environment to provide access to them. The fix is external to Python.
*   **Trying to install a full Visual Studio IDE unnecessarily:** While a full Visual Studio installation also provides the necessary tools, it's a much larger download and installation. The Build Tools are sufficient and much lighter for just solving this Python compilation issue.

### Prevention Tips

While this error can be a nuisance, there are several best practices you can adopt to minimize its recurrence:

*   **Utilize Virtual Environments:** Always work within Python virtual environments (`venv`, `conda`, `virtualenv`). This isolates your project dependencies and helps manage different package versions without conflicts. It doesn't prevent the C++ compiler error directly, but it keeps your global Python installation clean.
*   **Prioritize Pre-compiled Wheels:** Whenever possible, rely on `pip` to find and install pre-compiled wheel files. Ensure your `pip` and `setuptools` are up-to-date (`python -m pip install --upgrade pip setuptools wheel`), as newer versions are better at locating and utilizing wheels.
*   **Use Conda for Scientific/Data Science Packages:** If you frequently work with data science or scientific computing packages (like NumPy, SciPy, Pandas), consider using the Anaconda or Miniconda distribution. These distributions come with their own package manager (`conda`) that often provides pre-compiled binaries for these complex libraries, sidestepping the need for local compilation entirely for many common packages.
*   **Keep Build Tools Updated (if used frequently):** If your development workflow often involves compiling C/C++ code, periodically updating your Microsoft Visual C++ Build Tools can ensure compatibility with newer packages and Python versions.
*   **Review `requirements.txt`:** Before running `pip install -r requirements.txt`, glance at the packages listed. If you see known C/C++ heavy packages, anticipate the need for the Build Tools.