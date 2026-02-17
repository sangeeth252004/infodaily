---
title: "How to Fix \"Kernel Security Check Failure\" BSOD in Windows 10/11"
date: "2026-02-17T02:01:15.090Z"
slug: "how-to-fix-kernel-security-check-failure-bsod-in-windows-10-11"
type: "how-to"
description: "Learn how to resolve the common \"Kernel Security Check Failure\" Blue Screen of Death (BSOD) error in Windows 10 and Windows 11 with this comprehensive technical guide."
keywords: "Kernel Security Check Failure, BSOD, Blue Screen of Death, Windows 10, Windows 11, error fix, troubleshooting, system stability, Windows errors"
---

## Problem Explanation

The "Kernel Security Check Failure" is a critical error that manifests as a Blue Screen of Death (BSOD) in Windows. When this error occurs, your computer abruptly stops functioning, displays a blue screen with white text, and typically reboots. The error message itself, "KERNEL_SECURITY_CHECK_FAILURE," indicates a problem with a core component of the Windows operating system related to security checks. This can be a frustrating experience, as it halts your work, potentially leading to data loss and disrupting your workflow. The screen usually provides a stop code, which in this case is `0x000000139`, along with the error name.

## Why It Happens

The "Kernel Security Check Failure" error points to a corruption or malfunction within the Windows kernel, which is the central part of the operating system responsible for managing hardware and software resources. This specific error often arises when Windows detects an integrity violation within its security-related kernel structures. Common culprits include outdated or corrupted device drivers, issues with system files, malware infections that tamper with system integrity, or even hardware malfunctions, particularly with RAM or the hard drive. Sometimes, a recent Windows update or the installation of new software might introduce conflicts that trigger this security check failure.

## Step-by-Step Solution

### ## Step 1: Restart Your Computer

Before diving into more complex troubleshooting, the simplest solution is often the most effective. A temporary glitch or a minor software conflict can sometimes be resolved with a straightforward reboot.

1.  **Click the Start button.**
2.  **Click the Power icon.**
3.  **Select "Restart."**

If the BSOD persists after restarting, proceed to the next steps.

### ## Step 2: Run System File Checker (SFC) and Deployment Image Servicing and Management (DISM)

Corrupted system files are a frequent cause of BSOD errors. SFC and DISM are built-in Windows tools that can scan for and repair these corrupted files.

1.  **Open Command Prompt as Administrator:**
    *   Click the **Start button**.
    *   Type `cmd`.
    *   Right-click on **Command Prompt** and select **Run as administrator**.
    *   Click **Yes** if prompted by User Account Control.
2.  **Run SFC:**
    *   In the elevated Command Prompt window, type the following command and press Enter:
        ```
        sfc /scannow
        ```
    *   Allow the scan to complete. This may take some time.
3.  **Run DISM (if SFC finds errors it cannot fix):**
    *   If SFC reports it found corrupted files but couldn't fix them, or if the problem continues, run DISM. Type the following commands one by one, pressing Enter after each:
        ```
        DISM /Online /Cleanup-Image /ScanHealth
        DISM /Online /Cleanup-Image /CheckHealth
        DISM /Online /Cleanup-Image /RestoreHealth
        ```
    *   These DISM commands will scan for and attempt to repair issues with the Windows image.
4.  **Restart your computer** after these scans are complete.

### ## Step 3: Update or Roll Back Device Drivers

Outdated, corrupted, or incompatible device drivers are a very common cause of BSODs, including the "Kernel Security Check Failure."

1.  **Access Device Manager:**
    *   Right-click the **Start button** and select **Device Manager**.
2.  **Check for Driver Issues:**
    *   Look for any devices with a yellow exclamation mark, which indicates a driver problem.
    *   Pay close attention to drivers for graphics cards, network adapters, and storage controllers.
3.  **Update Drivers:**
    *   Right-click on a device with an issue (or any critical device like your graphics card) and select **Update driver**.
    *   Choose **Search automatically for drivers**.
    *   If Windows finds a newer driver, follow the on-screen instructions to install it.
4.  **Roll Back Drivers (if the problem started after a driver update):**
    *   If you suspect a recently updated driver caused the issue, right-click the device, select **Properties**, go to the **Driver** tab, and click **Roll Back Driver** (if the option is available).
5.  **Manually Download Drivers:**
    *   If automatic updates don't work, visit the manufacturer's website for your specific hardware components (e.g., NVIDIA, AMD, Intel, your motherboard manufacturer) and download the latest drivers for your Windows version. Install them manually.
6.  **Restart your computer** after updating or rolling back drivers.

### ## Step 4: Check for Windows Updates

Ensuring your Windows operating system is up-to-date can resolve many stability issues, as Microsoft frequently releases patches and fixes for known problems.

1.  **Open Windows Settings:**
    *   Click the **Start button** and select **Settings** (the gear icon).
2.  **Navigate to Windows Update:**
    *   Click on **Update & Security** (Windows 10) or **Windows Update** (Windows 11).
3.  **Check for Updates:**
    *   Click the **Check for updates** button.
    *   If updates are available, download and install them. You may need to restart your computer to complete the installation.

### ## Step 5: Run Windows Memory Diagnostic

Faulty RAM can cause a wide range of system instability, including BSODs. This tool helps identify RAM issues.

1.  **Search for Windows Memory Diagnostic:**
    *   Click the **Start button** and type `Windows Memory Diagnostic`.
2.  **Run the Tool:**
    *   Select **Windows Memory Diagnostic** from the search results.
    *   Choose **Restart now and check for problems (recommended)**.
3.  **Wait for the Scan:**
    *   Your computer will restart and begin the memory test. This process can take a considerable amount of time.
4.  **View Results:**
    *   Once Windows restarts, the results of the memory diagnostic will be displayed. If errors are found, it indicates a problem with your RAM.

### ## Step 6: Scan for Malware

Malware can corrupt system files and interfere with critical Windows processes, leading to BSODs.

1.  **Open Windows Security (or your preferred antivirus):**
    *   Click the **Start button**, type `Windows Security`, and select it.
2.  **Run a Full Scan:**
    *   Click on **Virus & threat protection**.
    *   Click on **Scan options**.
    *   Select **Full scan** and then click **Scan now**.
    *   Allow the scan to complete and follow any instructions to remove detected threats.
3.  **Consider a Second Opinion:**
    *   If you don't have a robust third-party antivirus installed, consider downloading a reputable on-demand scanner (like Malwarebytes) for an additional scan.
4.  **Restart your computer** after the scan and removal process.

### ## Step 7: Check Your Hard Drive for Errors

Errors on your hard drive can also lead to data corruption and system instability.

1.  **Open File Explorer:**
    *   Click the **File Explorer** icon on your taskbar or press `Windows Key + E`.
2.  **Access Drive Properties:**
    *   Right-click on your **C: drive** (or the drive where Windows is installed) and select **Properties**.
3.  **Run Error Checking:**
    *   Go to the **Tools** tab.
    *   Under "Error checking," click the **Check** button.
    *   Click **Scan drive**. If prompted that the drive is already checked, click **Scan drive** again.
4.  **Schedule Scan (if necessary):**
    *   If Windows indicates it can't scan the drive while it's in use, you'll be prompted to schedule the scan for the next restart. Click **Schedule disk check** and then restart your computer.
5.  **Restart your computer** after the scan is complete.

## Common Mistakes

One common mistake when encountering a "Kernel Security Check Failure" is immediately assuming hardware failure and replacing components unnecessarily. While hardware issues can be a cause, it's crucial to exhaust all software-related troubleshooting steps first, as corrupted drivers, system files, or malware are often the culprits. Another pitfall is not performing a *full* system scan for malware, or only relying on a quick scan, which might miss deeply embedded threats. Additionally, some users update drivers without first checking if a recent driver update coincided with the onset of the BSOD. In such cases, rolling back the driver is often more effective than updating again. Finally, failing to run SFC and DISM with administrator privileges will prevent these tools from performing their necessary system repairs.

## Prevention Tips

To minimize the chances of encountering the "Kernel Security Check Failure" and other BSODs, it's essential to maintain your system diligently. Regularly update Windows and your device drivers from official sources. Avoid installing software from untrusted websites, as this can introduce malware or incompatible applications. Implement a reliable antivirus solution and perform regular full system scans. Periodically run SFC and DISM scans as a proactive maintenance measure to ensure system file integrity. Back up your important data regularly, either to an external drive or a cloud service, so that if a critical error does occur, your data remains safe. Finally, monitor your system's health and be mindful of any unusual behavior, such as slow performance or frequent crashes, as these can be early indicators of underlying problems.