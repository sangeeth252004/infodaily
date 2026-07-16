---
title: "How to Fix 'pip install' Failing with 'Microsoft Visual C++ 14.0 or greater is required' Error"
date: "2026-07-16T16:16:14.431Z"
slug: "how-to-fix-pip-install-failing-with-microsoft-visual-c-14-0-or-greater-is-required-error"
type: "how-to"
description: "Fix the 'Microsoft Visual C++ 14.0 or greater is required' error when using pip install on Windows. Learn to install the necessary build tools and resolve Python package compilation issues."
keywords: "pip install error, Microsoft Visual C++ 14.0, build tools, Python compilation, setuptools, wheels, Windows, pip fix, C++ compiler required"
---

### Problem Explanation

You're trying to install a Python package using `pip install <package-name>`, and instead of a successful installation, you're met with a daunting error message. The most prominent part of this error usually reads something like:

```
ERROR: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This message indicates that `pip` is attempting to compile a part of the Python package from its source code, but it cannot find the necessary C++ compiler on your Windows system. This usually happens after a series of warnings or other compilation-related messages that might scroll by quickly. Without this specific compiler, the installation process grinds to a halt, leaving the package uninstalled and you, quite understandably, frustrated.

### Why It Happens

This error occurs because many Python packages are not written purely in Python. For performance reasons, to interact with system libraries, or to encapsulate complex algorithms, developers often write parts of their packages in lower-level languages like C or C++. When you try to install such a package using `pip`, if a pre-compiled binary (a "wheel" file) isn't available for your specific Python version and operating system, `pip` will attempt to download the package's source code and compile these C/C++ extensions directly on your machine.

On Windows, the Python interpreter itself is compiled using Microsoft Visual C++. Consequently, for `setuptools` (which `pip` uses for compilation tasks) to successfully build C/C++ extensions for Python packages, it requires the same or a compatible version of the Microsoft Visual C++ compiler that was used to build your Python interpreter. For Python versions 3.5 and above, this typically means Visual C++ 14.0 (from Visual Studio 2015) or a newer compatible version is needed. If these build tools are not installed, or not correctly configured on your system's PATH, the compilation fails, leading to the error you're seeing.

### Step-by-Step Solution

Let's get those build tools installed and your `pip install` commands running smoothly!

#### ## Step 1: Understand the Error's Context

Before diving into solutions, double-check that the error you're facing explicitly mentions "Microsoft Visual C++ 14.0 or greater is required." This guide specifically addresses *that* exact error. If your error message differs significantly, this particular solution might not be the direct fix, though updating build tools is often a good general practice for Python development on Windows.

Also, confirm you are on a Windows operating system, as this solution is Windows-specific.

#### ## Step 2: Install Microsoft Visual C++ Build Tools

This is the primary and most effective solution. You need to install the Microsoft Visual C++ Build Tools.

1.  **Download the Visual Studio Installer:** Open your web browser and navigate to the official Microsoft Visual C++ Build Tools download page. (A quick search for "Microsoft Visual C++ Build Tools" will lead you to the correct download link on visualstudio.microsoft.com).
2.  **Run the Installer:** Once downloaded, run the `vs_buildtools.exe` file. This will launch the Visual Studio Installer application.
3.  **Select Workloads or Individual Components:**
    *   **Recommended Method (Workload):** In the Visual Studio Installer, look for the "Workloads" tab. Select the "Desktop development with C++" workload. This option includes all the necessary components for C++ development, including the compilers.
    *   **Alternative Method (Individual Components):** If you prefer a more minimal installation, go to the "Individual components" tab. Scroll down and ensure that the "MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)" (or the latest compatible version displayed, e.g., v142 for VS 2019, v141 for VS 2017) and "Windows 10 SDK" (or Windows 11 SDK, if applicable) are selected. You might also want to include the "C++ CMake tools for Windows" and "C++ ATL for latest v143 build tools" for broader compatibility.
4.  **Install:** Click the "Install" button. The download and installation process can take some time, depending on your internet speed and the components you selected.

#### ## Step 3: Restart Your System and Verify

After the installation of the Visual C++ Build Tools is complete, it is **crucial** to restart your computer. This ensures that all necessary environment variables and system paths are updated correctly. Without a restart, your system might not recognize the newly installed compilers.

Once your system has restarted, open a new command prompt or PowerShell window. This ensures you're working with a fresh environment that has loaded the updated system paths.

#### ## Step 4: Re-attempt Your `pip install`

Now that the build tools are in place and your system has restarted, try installing the problematic package again:

```bash
pip install <package-name>
```

Replace `<package-name>` with the actual name of the package you were trying to install (e.g., `pip install cryptography` or `pip install pandas`). This time, `pip` should be able to locate and utilize the installed C++ compiler to build any necessary extensions. If the problem was solely due to the missing compiler, your installation should now proceed successfully.

#### ## Step 5: Ensure `pip` and `setuptools` are Up-to-Date

While the C++ Build Tools are the direct fix for the error message, sometimes an outdated `pip` or `setuptools` might cause issues with finding pre-compiled binaries (wheels) or interacting with the build environment. It's always a good practice to keep them updated:

```bash
python -m pip install --upgrade pip setuptools wheel
```

Running this command ensures you have the latest versions of these essential tools, which can improve compatibility and problem-solving capabilities.

#### ## Step 6: Consider Python Version Compatibility and Pre-compiled Wheels (Advanced)

In rare cases, even with build tools installed, specific packages might still struggle to compile, or you might encounter issues if you're using a very old or very new Python version that isn't yet fully supported by a package's source distribution.

*   **Pre-compiled Wheels:** For many popular scientific or data-intensive packages (like NumPy, SciPy, Pandas), developers provide pre-compiled binary packages called "wheels" (`.whl` files) on PyPI. `pip` usually prefers these if they are available for your Python version and architecture. If you've encountered the compiler error, it means `pip` couldn't find a suitable wheel and fell back to source compilation.
*   **Specific Python Versions:** If you continue to have issues, ensure the package you're trying to install officially supports your exact Python version. Sometimes, temporarily switching to a slightly older, more stable Python release (e.g., Python 3.9 instead of a brand new 3.11 for certain legacy packages) can resolve stubborn compilation issues. However, this is usually a last resort after installing build tools has failed.

### Common Mistakes

When troubleshooting this error, users frequently make a few common mistakes:

*   **Forgetting to Restart:** Installing the C++ Build Tools often requires a system restart for environment variables to be properly updated. Many users skip this step and immediately try `pip install` again, leading to continued failure. Always restart after installing major system components.
*   **Incorrect Build Tool Components:** Not selecting the correct "Workload" or "Individual Components" in the Visual Studio Installer is another pitfall. Simply installing the installer itself or general Visual Studio might not include the specific C++ compilers needed by Python. Ensure you've explicitly selected the "Desktop development with C++" workload or the "MSVC v14x" build tools and an SDK.
*   **Outdated `pip` or `setuptools`:** While not the direct cause of the compiler error, outdated versions of `pip` or `setuptools` can sometimes interfere with proper package resolution or interaction with the build environment. Keeping them current is a good habit.
*   **Using a non-Windows environment:** This solution is specific to Windows. Attempting these steps on macOS or Linux will not resolve a C++ compiler error (which would typically involve `gcc` or `clang` on those systems).

### Prevention Tips

Here are some tips to help prevent this error from cropping up again:

*   **Keep Your Build Tools Updated:** Periodically open the Visual Studio Installer and check for updates to your installed components, especially the "Desktop development with C++" workload. Newer Python versions might rely on newer compiler features.
*   **Prioritize Pre-compiled Wheels:** Whenever possible, rely on `pip` to automatically install pre-compiled wheel files (`.whl`). These bypass the need for local compilation entirely. Most popular packages provide them. If a package consistently forces compilation and causes issues, check if there's an official wheel for your specific Python version and architecture.
*   **Maintain Up-to-Date `pip` and `setuptools`:** Regularly update `pip`, `setuptools`, and `wheel` using `python -m pip install --upgrade pip setuptools wheel`. This ensures `pip` is capable of handling the latest package formats and interacting efficiently with the build environment.
*   **Use Virtual Environments:** Always work within Python virtual environments (`venv` or `conda`). This isolates your project's dependencies and helps avoid system-wide conflicts. While virtual environments don't prevent the need for a C++ compiler, they make managing your Python installations cleaner and prevent global system issues.
*   **Understand Package Dependencies:** Before installing a package, especially one known for complex binaries (like scientific computing libraries), a quick check of its documentation might reveal specific system prerequisites or recommended installation methods that can help you avoid compilation headaches.