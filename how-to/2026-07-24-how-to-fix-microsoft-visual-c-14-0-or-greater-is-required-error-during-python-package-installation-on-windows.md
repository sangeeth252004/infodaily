---
title: "How to Fix \"Microsoft Visual C++ 14.0 or greater is required\" Error During Python Package Installation on Windows"
date: "2026-07-24T07:29:52.057Z"
slug: "how-to-fix-microsoft-visual-c-14-0-or-greater-is-required-error-during-python-package-installation-on-windows"
type: "how-to"
description: "A comprehensive guide to resolve the \"Microsoft Visual C++ 14.0 or greater is required\" error when installing Python packages on Windows, explaining the cause and providing step-by-step solutions using Visual Studio Build Tools."
keywords: "Python, Visual C++, C++ Build Tools, pip install error, Windows, package installation, compilation error, MSVC, fix, solution, C extensions"
---

### Problem Explanation

When attempting to install certain Python packages using `pip` on a Windows operating system, you might encounter an error message indicating a missing C++ compiler. This typically manifests as a build failure, with the console output displaying lines similar to:

```
Collecting some-package
  Using cached some-package-1.0.0.tar.gz (1.2 MB)
  Preparing metadata (setup.py) ... done
  Building wheels for collected packages: some-package
  Building wheel for some-package (setup.py) ... error
  ERROR: Command errored out with exit status 1:
   command: 'C:\Python39\python.exe' -u -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'C:\\Users\\YourUser\\AppData\\Local\\Temp\\pip-install-random\\some-package\\setup.py'"'"'; __file__='"'"'C:\\Users\\YourUser\\AppData\\Local\\Temp\\pip-install-random\\some-package\\setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' bdist_wheel -d 'C:\Users\YourUser\AppData\Local\Temp\pip-wheel-random'
       cwd: C:\Users\YourUser\AppData\Local\Temp\pip-install-random\some-package\
  Complete output (XX lines):
  running bdist_wheel
  running build
  running build_ext
  building 'some_package_module' extension
  error: Microsoft Visual C++ 14.0 or greater is required. Get it with "Microsoft C++ Build Tools": https://visualstudio.microsoft.com/visual-cpp-build-tools/
  ----------------------------------------
  ERROR: Failed building wheel for some-package
Failed to build some-package
ERROR: Could not build wheels for some-package which use PEP 517 and cannot be installed directly
```

The core of the problem is the line: `error: Microsoft Visual C++ 14.0 or greater is required.` This error prevents the package from being installed, often leading to a halted installation process and the package remaining unavailable.

### Why It Happens

This error occurs because many Python packages, particularly those focused on performance-critical operations like scientific computing, data processing, or low-level system interactions, include components written in C or C++ (often referred to as "C extensions"). These extensions are part of the package's source code.

When you try to install such a package using `pip`, the installer first attempts to find a pre-compiled binary version of the package (a "wheel" file) that matches your Python version and operating system. If a suitable wheel is not found on PyPI, `pip` falls back to downloading the package's source code and attempting to compile these C/C++ extensions directly on your machine. Unlike Linux or macOS, which typically come with C/C++ compilers pre-installed or readily available, a standard Windows installation does not include a C/C++ compiler by default. Therefore, to compile these extensions, your Windows system needs the appropriate Microsoft Visual C++ compiler toolchain. The "14.0 or greater" specification refers to the version of the Visual C++ compiler provided with Visual Studio 2015 and newer, which Python versions compiled with these tools expect to use.

### Step-by-Step Solution

The solution involves installing the specific C++ build tools required by Python from Microsoft. You do not need to install the full Visual Studio IDE.

#### Step 1: Identify the Correct Visual Studio Build Tools

The error message explicitly points to "Microsoft C++ Build Tools." These are command-line compilers and tools that can be installed independently of the complete Visual Studio IDE. The Python version you are using dictates which version of the C++ Build Tools is compatible. For example, Python 3.5-3.8 typically expect MSVC 14.0 (Visual Studio 2015-2017 toolset), while Python 3.9+ might expect MSVC 14.1 (VS 2019) or 14.2 (VS 2022). The latest build tools generally support older C++ standards, so installing the most recent ones (e.g., from Visual Studio 2022) is usually sufficient for all modern Python versions.

#### Step 2: Download the Visual Studio Build Tools Installer

Navigate to the official Microsoft Visual Studio download page. Specifically, look for "Build Tools for Visual Studio."

You can find it by searching for "Visual Studio Build Tools" or directly visiting the Visual Studio download page: `https://visualstudio.microsoft.com/downloads/`

Scroll down to "Tools for Visual Studio" and locate "Build Tools for Visual Studio 2022" (or the latest stable version available). Click the "Download" button next to it. This will download a small executable file, typically named `vs_buildtools__<some_id>.exe`.

#### Step 3: Run the Installer and Select Required Components

1.  **Execute the installer:** Double-click the downloaded `vs_buildtools__<some_id>.exe` file. If prompted by User Account Control (UAC), click "Yes."
2.  **Initial setup:** The Visual Studio Installer will launch. It may take a moment to download initial files.
3.  **Select workloads:** Once the installer loads, you will be presented with a list of "Workloads." These are pre-selected bundles of components. The most straightforward option is to select the **"Desktop development with C++"** workload. This workload includes all the necessary compilers, libraries, and build tools for C++ development.
    *   *Alternative (more minimal):* If you prefer a more lightweight installation, you can switch to the "Individual components" tab. There, search for and select:
        *   "MSVC v143 - VS 2022 C++ x64/x86 build tools (Latest)" (or the equivalent for VS 2019/2017 if you specifically need an older toolchain, though the latest usually works).
        *   Optionally, "Windows 10 SDK" or "Windows 11 SDK" for the relevant headers and libraries. The "Desktop development with C++" workload usually includes a suitable SDK by default.
4.  **Initiate installation:** After selecting "Desktop development with C++" (or the individual components), click the "Install" button. The installation size can range from a few gigabytes, depending on your selections. Allow the installation to complete. This process can take a significant amount of time, depending on your internet connection and system speed.

#### Step 4: Restart Your Command Prompt or Terminal

After the Visual Studio Build Tools installation finishes, it is crucial to close and then re-open any command prompt, PowerShell window, or integrated terminal (like those in VS Code or PyCharm) where you intend to install Python packages. This ensures that the system's `PATH` environment variable is correctly updated to include the directories containing the newly installed C++ compilers and tools. Without restarting, your terminal might still operate with the old `PATH`, unable to locate the compiler.

#### Step 5: Update `pip` and `setuptools`

Outdated versions of `pip` or `setuptools` (a library that assists `pip` in building packages) can sometimes contribute to compilation issues or fail to correctly detect newly installed build tools. It's good practice to ensure they are up to date:

Open your new command prompt or terminal and run:

```bash
python -m pip install --upgrade pip setuptools wheel
```

This command upgrades `pip`, `setuptools`, and `wheel` to their latest versions, often resolving subtle compatibility problems.

#### Step 6: Retry Python Package Installation

With the Visual C++ Build Tools installed and your terminal restarted, attempt to install the problematic Python package again using `pip`:

```bash
pip install some-package
```

This time, `pip` should be able to locate and utilize the installed C++ compiler to build the package's C extensions, leading to a successful installation.

### Common Mistakes

1.  **Installing Full Visual Studio Instead of Build Tools:** Many users mistakenly believe they need to install the entire Visual Studio IDE. While the full IDE includes the build tools, it's a much larger download and installation than necessary. The dedicated "Build Tools" package is sufficient and more efficient.
2.  **Not Selecting the Correct Components:** Downloading the Visual Studio Build Tools installer is only the first step. If you run the installer but do not select the "Desktop development with C++" workload or the specific "MSVC vXXX - C++ build tools" component, the compiler will not be installed, and the error will persist.
3.  **Forgetting to Restart the Command Prompt:** Environment variables, including the `PATH` variable that tells your system where to find executables like `cl.exe` (the MSVC compiler), are loaded when a command prompt or terminal session starts. If you install the build tools and immediately try to install a Python package in an *existing* terminal session, it won't recognize the newly added compiler paths. Always restart your terminal after installation.
4.  **Ignoring Python Version Compatibility:** While generally the latest Build Tools work, if you are working with a very old Python installation (e.g., Python 3.4 or earlier, which expected MSVC 10.0 or 12.0), the newer Build Tools might not be fully compatible. Stick to currently supported Python versions for best compatibility.
5.  **Running as Non-Administrator:** In some corporate environments or restricted user profiles, permissions issues might prevent the installer from correctly modifying system paths or installing components. Ensure you have administrator privileges when running the Build Tools installer.

### Prevention Tips

1.  **Prioritize Pre-compiled Wheels:** Whenever possible, use `pip` in environments where pre-compiled wheels for your operating system and Python version are available. `pip` automatically prefers wheels, but sometimes they aren't published for all package versions or platforms. Keeping `pip` updated (as mentioned in the solution) helps ensure it can find and utilize the latest available wheels.
2.  **Maintain Up-to-Date Build Tools:** Periodically check for updates to your Visual Studio Build Tools. The Visual Studio Installer itself can be used to update installed components. Newer toolchains often include bug fixes and improved compatibility.
3.  **Use Virtual Environments:** While virtual environments (`venv` or `conda`) don't directly prevent the C++ compiler requirement, they isolate your project dependencies. This helps maintain a clean base Python installation and prevents conflicts between package versions, making troubleshooting easier if this error reappears for a specific project.
4.  **Consider Anaconda/Miniconda for Scientific Packages:** For users heavily involved in scientific computing or data science, distributions like Anaconda or Miniconda often provide pre-compiled binaries for many popular packages (e.g., NumPy, SciPy, Pandas) that would otherwise require compilation, thus bypassing the need for C++ build tools in many cases.
5.  **Check Package Documentation:** Before attempting to install a complex package, briefly review its documentation or PyPI page. Some packages explicitly state their build requirements or recommend specific installation methods that might help avoid compilation issues.