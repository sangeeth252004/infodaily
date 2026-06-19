---
title: "How to Fix 'Microsoft Visual C++ 14.0 or greater is required' During Python Package Installation on Windows"
date: "2026-06-19T17:18:27.360Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-during-python-package-installation-on-windows"
type: "how-to"
description: "A comprehensive guide to resolve the 'Microsoft Visual C++ 14.0 or greater is required' error when installing Python packages with pip on Windows, focusing on installing Visual Studio Build Tools."
keywords: "Python, pip, Visual C++, C++ compiler, Windows, package installation, error fix, Visual Studio Build Tools, MSVC, desktop development with C++"
---

### Problem Explanation

When attempting to install certain Python packages using `pip` on a Windows operating system, users frequently encounter an error message indicating a missing or insufficient C++ compiler. The specific error manifest as:

```
error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This message typically appears after `pip` attempts to download and then build a package from its source distribution (a `.tar.gz` or `.zip` file), rather than installing a pre-compiled binary wheel (`.whl` file). The installation process halts, preventing the package from being successfully integrated into your Python environment.

### Why It Happens

This error occurs because many Python packages, especially those that involve numerical computation, data science, or system-level interactions (e.g., NumPy, SciPy, pandas, cryptography), are not written purely in Python. Instead, they contain components or extensions written in lower-level languages like C, C++, or Fortran for performance or direct hardware access.

When `pip` tries to install such a package and a pre-compiled binary wheel compatible with your specific Python version and Windows architecture is not available (or `pip` prioritizes building from source), it needs to compile these C/C++ components on your machine. For this compilation process on Windows, the official Microsoft Visual C++ compiler (MSVC) is required. The error message explicitly states that version 14.0 or greater is necessary, which corresponds to the C++ compiler toolset included with Visual Studio 2015 and later versions. Without this compiler present and correctly configured in your system's `PATH`, the build process fails.

### Step-by-Step Solution

Follow these steps carefully to install the necessary build tools and resolve the error.

#### ## Step 1: Understand the Core Problem

The root cause is the absence of a C++ compiler environment that Python's `distutils` or `setuptools` can leverage during package installation. Specifically, Microsoft Visual C++ (MSVC) Build Tools are required. The solution involves installing these specific tools, not the entire Visual Studio IDE unless you need it for other development purposes.

#### ## Step 2: Download Visual Studio Build Tools

Navigate to the official Microsoft Visual Studio download page. Look for "Build Tools for Visual Studio" or "Visual Studio Build Tools".
*   Go to a web browser and search for "Visual Studio Build Tools" or navigate directly to `https://visualstudio.microsoft.com/downloads/`.
*   Scroll down to the "Tools for Visual Studio" section.
*   Locate "Visual Studio 20XX Build Tools" (choose the latest stable year, e.g., 2022) and click the "Download" button. This will download a small installer executable (e.g., `vs_buildtools__xxxx.exe`).

#### ## Step 3: Install Required C++ Development Workload

Run the downloaded installer and select the correct components. This is the most crucial step.

1.  **Run the Installer:** Double-click the `vs_buildtools__xxxx.exe` file. If prompted by User Account Control (UAC), click "Yes".
2.  **Initial Setup:** The Visual Studio Installer will launch. It may take a moment to prepare.
3.  **Select Workloads:** In the installer window, you will see a list of "Workloads". Select the following workload:
    *   **"Desktop development with C++"**: This workload includes the necessary MSVC toolsets, Windows SDKs, and other components required for compiling C/C++ code.
4.  **Confirm Installation:** Ensure that "Desktop development with C++" is checked. You typically do not need to customize individual components within this workload unless specifically instructed by a package.
5.  **Initiate Installation:** Click the "Install" button. The download and installation process can take a considerable amount of time depending on your internet connection and system speed, as it downloads several gigabytes of data.

#### ## Step 4: Restart Your Terminal and Retry Installation

After the Visual Studio Build Tools installation completes, it is essential to restart any open command prompt or PowerShell windows. This ensures that the system's `PATH` environment variable is updated to include the directories where the C++ compiler (`cl.exe`) is located.

1.  **Close Terminals:** Close all active command prompt, PowerShell, Git Bash, or IDE terminals that you were using for Python.
2.  **Open New Terminal:** Open a fresh command prompt or PowerShell window.
3.  **Activate Virtual Environment (if applicable):** If you are working within a Python virtual environment, activate it now.
4.  **Retry `pip install`:** Attempt to install your desired Python package again:
    ```bash
    pip install your-package-name
    ```
    Replace `your-package-name` with the actual name of the package causing the error.

#### ## Step 5: Verify C++ Compiler Installation (Optional but Recommended)

If the issue persists, you can manually verify if the C++ compiler is accessible from your terminal.

1.  **Open Developer Command Prompt:** Search for "Developer Command Prompt for VS 20XX" (where 20XX matches your installed Build Tools version) in the Windows Start menu. Open it. This special command prompt automatically sets up the necessary environment variables.
2.  **Check Compiler Version:** In this Developer Command Prompt, type:
    ```bash
    cl
    ```
    You should see output indicating the Microsoft (R) C/C++ Optimizing Compiler version. If you see something like `cl : Command not found` or similar, the installation might have failed or been corrupted.
3.  **Test `pip install` (if necessary):** If `cl` works in the Developer Command Prompt, try `pip install your-package-name` from *within that Developer Command Prompt*. If it succeeds here but not in a regular prompt, it indicates a `PATH` environment variable issue that the Visual Studio installer failed to fully propagate system-wide.

#### ## Step 6: Update pip and setuptools (If Issues Persist)

Occasionally, outdated versions of `pip` or `setuptools` can contribute to build problems, even with the correct compiler installed. Updating them can resolve obscure compatibility issues.

1.  **Open a new terminal.**
2.  **Update `pip`:**
    ```bash
    python -m pip install --upgrade pip
    ```
3.  **Update `setuptools`:**
    ```bash
    python -m pip install --upgrade setuptools wheel
    ```
    The `wheel` package is also crucial for building and distributing Python packages.
4.  **Retry `pip install`:** Attempt the package installation again after these updates.

### Common Mistakes

*   **Installing the wrong Visual Studio component:** A frequent mistake is downloading and installing the full Visual Studio IDE when only the lightweight Build Tools are needed, or installing the Build Tools but forgetting to select the "Desktop development with C++" workload during setup.
*   **Not restarting the terminal:** Environment variables set by the Build Tools installer are not immediately active in already open command prompt windows. Always close and reopen your terminals after installation.
*   **Ignoring previous error messages:** Sometimes, the C++ compiler error is a secondary issue. Ensure you read the full error traceback; there might be other missing dependencies or specific package requirements listed earlier in the output.
*   **Using a 32-bit Python with 64-bit compiler (or vice-versa):** While less common with modern Python installations (which are usually 64-bit on 64-bit Windows), ensure your Python interpreter's architecture matches the compiler's target architecture if you encounter unusual linker errors. The default installation from Visual Studio Build Tools usually provides compatible compilers.

### Prevention Tips

*   **Use Binary Wheels when Available:** For common packages, `pip` usually prefers installing pre-compiled binary wheels (`.whl` files) if they are available for your Python version and system architecture. This completely bypasses the need for a compiler. Ensure your `pip` is up-to-date, as newer versions are better at finding wheels.
*   **Use Virtual Environments:** Always work within Python virtual environments (`venv` or `conda`). This isolates your project dependencies and helps avoid system-wide conflicts. While it doesn't prevent the need for a compiler, it ensures a clean and reproducible setup.
*   **Keep Build Tools Updated:** Periodically check for updates to your Visual Studio Build Tools. Newer Python versions or packages might eventually require newer compiler features or versions. The Visual Studio Installer itself can be used to update existing installations.
*   **Read Package Documentation:** Before installing complex packages, quickly review their official documentation for any specific Windows installation prerequisites or known issues, especially concerning dependencies and build requirements.