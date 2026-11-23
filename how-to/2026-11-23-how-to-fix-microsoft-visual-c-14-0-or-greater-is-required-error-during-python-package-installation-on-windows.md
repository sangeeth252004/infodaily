---
title: "How to Fix 'Microsoft Visual C++ 14.0 or greater is required' Error During Python Package Installation on Windows"
date: "2026-11-23T05:49:53.283Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "Solve the 'Microsoft Visual C++ 14.0 or greater is required' error when installing Python packages on Windows. This guide provides step-by-step solutions to successfully install your libraries by addressing common compilation issues."
keywords: "Python, pip, Visual C++, C++ Build Tools, Microsoft Visual C++ 14.0, Windows, package installation, error fix, compiler error, venv, virtual environment, numpy, pandas, scikit-learn"
---

### Problem Explanation

You're likely here because you encountered a frustrating error message while trying to install a Python package using `pip` on your Windows machine. The error typically looks something like this in your command prompt or terminal:

```
ERROR: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
```

This message pops up when you're trying to install certain Python libraries, particularly those that aren't pure Python and contain underlying C or C++ code that needs to be compiled. Common examples of such packages include NumPy, pandas, SciPy, scikit-learn, psycopg2, Pillow, and many others that rely on high-performance C/C++ implementations. When this error appears, `pip` is essentially telling you that it can't find the necessary tools on your system to build these components from their source code.

### Why It Happens

The core reason this error occurs is that your system lacks the specific C/C++ compiler and build tools that Python's installation utilities (`distutils` and `setuptools`) expect to find on a Windows operating system. Many powerful Python libraries are written partly in C or C++ for performance reasons. When you run `pip install <package_name>`, `pip` first tries to download a pre-compiled binary version of the package (known as a "wheel" file, usually with a `.whl` extension) that matches your Python version and Windows architecture.

If `pip` cannot find a suitable pre-compiled wheel for your specific setup (which can happen for various reasons, including very new Python versions, specific package versions, or less common architectures), it falls back to attempting to compile the package directly from its source code. For this compilation process to succeed on Windows, it requires the Microsoft Visual C++ Build Tools, specifically version 14.0 or newer. Without these tools, the compilation fails, and you receive the aforementioned error message, halting your package installation.

### Step-by-Step Solution

Let's walk through the process of getting those Python packages installed correctly.

#### ## Step 1: Update pip, setuptools, and wheel

Before diving into C++ build tools, it's always a good practice to ensure your core Python package management tools are up-to-date. Often, an updated `pip` and `setuptools` can magically find compatible pre-compiled wheels that older versions might have missed, completely bypassing the need for a compiler.

Open your command prompt or terminal (make sure you've activated your virtual environment if you're using one) and run the following commands:

```bash
python -m pip install --upgrade pip setuptools wheel
```

*   `python -m pip`: Ensures you're using the `pip` associated with your current Python installation.
*   `install --upgrade`: Tells `pip` to update the specified packages if they're already installed, or install them if they're not.
*   `pip`, `setuptools`, `wheel`: These are the essential packages. `setuptools` is critical for building Python extensions, and `wheel` is for handling wheel files.

After updating, try installing your problematic package again:

```bash
pip install <your_package_name>
```

If the error persists, proceed to Step 2.

#### ## Step 2: Download and Install Microsoft C++ Build Tools

This is the most common and definitive solution when pre-compiled wheels aren't available. You need to install the specific C++ build tools provided by Microsoft.

1.  **Go to the Official Download Page:** Open your web browser and navigate to the official Microsoft Visual C++ Build Tools download page. The error message itself usually provides the link: `https://visualstudio.microsoft.com/visual-cpp-build-tools/`

2.  **Download the Installer:** On the page, look for the "Build Tools for Visual Studio 20XX" (e.g., Build Tools for Visual Studio 2022). Click the "Download" button next to it. This will download a small installer executable.

3.  **Run the Installer:** Once the download is complete, run the executable (e.g., `vs_buildtools__<version>.exe`). The Visual Studio Installer will launch.

4.  **Select the "Desktop development with C++" Workload:**
    *   In the installer window, you'll see a list of "Workloads."
    *   Crucially, you need to select the **"Desktop development with C++"** workload. Check the box next to it.
    *   On the right side of the installer, you'll see "Installation details." Make sure that under "Desktop development with C++," the following components are selected (they usually are by default when you select the workload, but it's good to confirm):
        *   "MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)" (or similar for other Visual Studio versions like v142 for VS 2019, v141 for VS 2017). This is the actual compiler.
        *   "Windows 10 SDK" or "Windows 11 SDK" (a specific version will typically be pre-selected).

5.  **Install:** Click the "Install" button. The installation might take some time as it downloads and sets up the necessary components.

6.  **Reboot (Optional but Recommended):** While often not strictly necessary if you open a new terminal, a system reboot can ensure all environment variables and registry settings are fully updated, especially if you encounter issues later.

#### ## Step 3: Verify Installation and Environment (New Terminal)

After the installation of the C++ Build Tools is complete, it's vital to open a **new** command prompt or terminal window. This is because existing terminal sessions don't automatically pick up new system environment variables or registry entries that the installer creates.

1.  **Open a New Terminal:** Close any existing terminals you were using for Python and open a fresh one.
2.  **Activate Virtual Environment (if applicable):** If you're using a virtual environment, activate it again. For example:
    ```bash
    cd my_project
    .\venv\Scripts\activate
    ```
3.  **No Manual PATH Configuration Needed:** You typically do *not* need to manually add paths for `cl.exe` (the C++ compiler executable) to your system's PATH. Python's `distutils` is smart enough to find the Visual C++ compiler through registry entries created by the Visual Studio Build Tools installer. Trying to manually add paths can sometimes cause more problems.

#### ## Step 4: Retry Python Package Installation

With the C++ Build Tools correctly installed and your environment refreshed, you can now attempt to install your problematic Python package again.

In your **new** command prompt or terminal (with virtual environment activated, if applicable), run:

```bash
pip install <your_package_name>
```

For example:

```bash
pip install numpy
pip install pandas
pip install psycopg2
```

The installation process should now proceed without the "Microsoft Visual C++ 14.0 or greater is required" error, successfully compiling any necessary C/C++ extensions.

#### ## Step 5: Advanced Troubleshooting (If Problem Persists)

If, by some chance, the error still occurs after following all the previous steps:

1.  **Check Installer Logs:** The Visual Studio Installer itself has logs that can sometimes reveal specific failures during the C++ Build Tools installation.
2.  **Specific SDK Versions:** A very rare case might involve a package that specifically requires an older or different Windows SDK version than what was installed by default. You can often add more SDK versions through the "Individual components" tab in the Visual Studio Installer.
3.  **Python Version Compatibility:** Ensure the Python version you're using is officially supported by the package you're trying to install. Sometimes very new Python versions might not have immediate wheel support for all packages, or older packages might not support newer Python versions.
4.  **Full Visual Studio IDE:** As a last resort, if you're doing heavy development or working with very specific projects, installing a full Visual Studio IDE (Community, Professional, or Enterprise edition) will definitely include all necessary build tools. However, for most Python package installations, the "Build Tools" package is sufficient and much lighter.
5.  **Look for Unofficial Wheels (Cautious Approach):** For exceptionally stubborn packages without official wheels, websites like [Christoph Gohlke's Python Extension Packages for Windows](https://www.lfd.uci.edu/~gohlke/pythonlibs/) often provide unofficial pre-compiled wheels for many packages. You would download the `.whl` file matching your Python version and architecture, then install it using `pip install <path_to_wheel_file>`. *Exercise caution when using unofficial sources and verify their trustworthiness.*

### Common Mistakes

1.  **Not Opening a New Terminal:** This is arguably the most frequent oversight. Environment changes made by installers aren't always picked up by already open terminal windows.
2.  **Installing the Wrong Visual Studio Component:** People sometimes install the full Visual Studio IDE without selecting the "Desktop development with C++" workload, or they download a different "Build Tools" package that doesn't include the necessary C++ compiler.
3.  **Forgetting to Update `pip` and `setuptools`:** While not always the direct fix, outdated tools can sometimes fail to find existing wheels, pushing you towards a source compilation when it wasn't necessary.
4.  **Ignoring the Error Message's Hint:** The error message itself explicitly points to "Microsoft C++ Build Tools" and provides a link. Diverging from this advice can lead to installing irrelevant software.
5.  **Assuming Python Itself is Broken:** The error doesn't mean your Python installation is corrupted; it simply means a dependency for compiling specific types of packages is missing.

### Prevention Tips

1.  **Always Use Virtual Environments:** For every Python project, create and activate a virtual environment (`venv` or `conda`). This isolates your project dependencies and prevents conflicts between different projects or with your system's global Python installation.
2.  **Keep `pip`, `setuptools`, and `wheel` Updated:** Regularly update these core packages as shown in Step 1. Newer versions are better at handling package resolution and finding appropriate wheels.
3.  **Install C++ Build Tools Proactively:** If you regularly work with data science, machine learning, or scientific computing packages (like NumPy, pandas, etc.), it's a good idea to install the Microsoft C++ Build Tools as part of your initial development environment setup on a new Windows machine. This prevents future headaches.
4.  **Check Package Documentation:** Before installing a potentially complex package, glance at its official documentation. It might list specific system requirements or platform-specific installation notes that can save you trouble.
5.  **Prefer Pre-compiled Wheels:** Whenever possible, `pip` will automatically prefer a pre-compiled wheel. Ensuring your Python version matches a widely supported version for a package increases the likelihood of finding an available wheel, thus avoiding the compilation step entirely.