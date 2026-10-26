---
title: "How to Fix 'The application was unable to start correctly (0xc0000005)' Error in Windows"
date: "2026-10-26T10:46:04.031Z"
slug: "how-to-fix-the-application-was-unable-to-start-correctly-0xc0000005-error-in-windows"
type: "how-to"
description: "Resolve the persistent 0xc0000005 error in Windows with this comprehensive troubleshooting guide. Learn the causes and follow step-by-step solutions to get your applications running again."
keywords: "0xc0000005 error, Windows application error, fix startup error, application failed to start, Windows troubleshooting, memory access violation"
---

# How to Fix 'The application was unable to start correctly (0xc0000005)' Error in Windows

Encountering the dreaded "The application was unable to start correctly (0xc0000005)" error message in Windows can be incredibly frustrating. You try to launch a program, perhaps a game, a productivity suite, or even a core Windows component, and instead of opening, you're met with this cryptic notification. It often appears in a small dialog box, sometimes accompanied by a unique error code or a hexadecimal string, but the core message remains the same: the application simply cannot get off the ground. This error prevents you from using your software, potentially disrupting your work or leisure activities.

This specific error, 0xc0000005, is a **STATUS_ACCESS_VIOLATION**. In simpler terms, it means that the application you're trying to run attempted to access a memory location that it was not permitted to access. Think of your computer's memory as a vast library, and applications are researchers trying to find specific books (data). An access violation is like a researcher trying to sneak into a restricted section of the library – they're not allowed, and the librarian (Windows) stops them immediately to prevent any damage to sensitive materials or the overall system. This can happen for a variety of reasons, all boiling down to a disruption in how the application interacts with the computer's memory or system resources.

## Why It Happens

The root cause of the 0xc0000005 error is almost always related to **memory management issues**. This can stem from corrupted application files, problems with your system's RAM (Random Access Memory), driver conflicts, malware infections, or even issues with critical Windows system files. When an application tries to read from or write to a memory address that is either invalid, protected, or already occupied by another process that shouldn't be there, Windows flags it as an unauthorized access attempt and terminates the application to maintain system stability. It's a protective measure, but one that can feel like a roadblock.

More specifically, corrupted data within the application's executable files, a faulty memory module in your computer, or outdated or conflicting device drivers can all lead to improper memory addressing. Malware can also interfere with memory operations, causing legitimate applications to trigger this error. Furthermore, issues with the Windows Registry, which stores crucial configuration settings for your operating system and installed programs, can sometimes contribute to this problem if specific application entries become corrupted.

## Step-by-Step Solution

Let's systematically work through the common solutions to resolve the 0xc0000005 error.

## Step 1: Restart Your Computer

This might seem overly simplistic, but a fresh restart can resolve many temporary glitches that might be causing memory conflicts. Sometimes, a program might have left behind invalid memory pointers or a background process might be hogging resources in an unexpected way.

1.  Click the **Start button** (Windows logo).
2.  Click the **Power icon**.
3.  Select **Restart**.
4.  Once your computer has fully booted up, try running the application again.

## Step 2: Run System File Checker (SFC)

Corrupted Windows system files can often lead to application startup errors like 0xc0000005. The System File Checker is a built-in Windows tool that scans for and repairs corrupted system files.

1.  Click the **Start button**.
2.  Type `cmd`.
3.  Right-click on **Command Prompt** and select **Run as administrator**.
4.  In the Command Prompt window, type the following command and press **Enter**:
    `sfc /scannow`
5.  Let the scan complete. This can take some time.
6.  If SFC finds and repairs any corrupted files, you will be notified. Restart your computer after the scan finishes and try running the application.

## Step 3: Run DISM (Deployment Image Servicing and Management)

If SFC doesn't resolve the issue, or if it reports that it couldn't repair the corrupted files, the DISM tool can help repair the Windows image that SFC uses.

1.  Open **Command Prompt as administrator** (follow steps 1-3 from Step 2).
2.  In the Command Prompt window, type the following commands, pressing **Enter** after each one:
    `DISM /Online /Cleanup-Image /ScanHealth`
    `DISM /Online /Cleanup-Image /RestoreHealth`
3.  These commands will check for and download necessary files from Windows Update to repair the image. This process can also take a significant amount of time.
4.  Once DISM has completed, close the Command Prompt, and run `sfc /scannow` again (as described in Step 2).
5.  Restart your computer and test the application.

## Step 4: Update or Roll Back Device Drivers

Outdated, corrupted, or incompatible device drivers, especially graphics card drivers, can be a common culprit for 0xc0000005 errors, particularly in games or graphics-intensive applications.

**To Update Drivers:**

1.  Press **Windows Key + X** and select **Device Manager**.
2.  Expand the category for the relevant hardware (e.g., **Display adapters** for graphics cards).
3.  Right-click on the device and select **Update driver**.
4.  Choose **Search automatically for drivers**.
5.  Follow any on-screen prompts. If a new driver is found and installed, restart your computer.

**To Roll Back Drivers (if the issue started after a driver update):**

1.  Open **Device Manager** (as described above).
2.  Expand the relevant category and right-click on the device.
3.  Select **Properties**.
4.  Go to the **Driver** tab.
5.  If the **Roll Back Driver** button is available, click it and follow the prompts.
6.  Restart your computer.

## Step 5: Check for Malware

Malware can interfere with system processes and memory operations, leading to the 0xc0000005 error. Running a full system scan with your antivirus software is crucial.

1.  Ensure your antivirus software is up-to-date with the latest definitions.
2.  Perform a **full system scan**. This can take a while, so it's often best to do this when you don't need to use your computer urgently.
3.  If any threats are detected, follow your antivirus program's instructions to remove or quarantine them.
4.  Restart your computer after the scan and removal process.

## Step 6: Check RAM for Errors

Faulty RAM modules are a frequent cause of the 0xc0000005 error. Windows has a built-in memory diagnostic tool.

1.  Click the **Start button**.
2.  Type `Windows Memory Diagnostic` and select it from the search results.
3.  Choose **Restart now and check for problems (recommended)**.
4.  Your computer will restart and run the memory diagnostic. This process can take a while.
5.  Once the scan is complete, Windows will boot up normally. You can view the results by searching for "Event Viewer" in the Start menu, then navigating to **Windows Logs > System**, and looking for events with "MemoryDiagnostic" in the source.
6.  If errors are found, it's highly recommended to replace the faulty RAM module(s).

## Step 7: Reinstall the Application

If the error persists and seems specific to a single application, the application's installation files might be corrupted.

1.  Go to **Settings > Apps > Apps & features**.
2.  Find the problematic application in the list.
3.  Click on it and select **Uninstall**.
4.  Follow the on-screen prompts to complete the uninstallation.
5.  Download a fresh copy of the application installer from the official source.
6.  Run the installer and follow the setup instructions.
7.  Try launching the application after reinstallation.

## Common Mistakes

One of the most common mistakes when dealing with the 0xc0000005 error is to immediately assume the worst and decide to reinstall Windows without trying the simpler, less disruptive solutions first. Many users also skip running a full antivirus scan, which is a critical step as malware is a frequent, yet often overlooked, cause. Another pitfall is not running commands like SFC and DISM as an administrator; these tools require elevated privileges to function correctly. Finally, people sometimes forget to restart their computer after making changes, which is essential for those changes to take effect properly.

## Prevention Tips

To prevent the "The application was unable to start correctly (0xc0000005)" error from recurring, maintain a healthy Windows environment. Regularly update your operating system and all installed applications to ensure you have the latest bug fixes and security patches. Keep your device drivers up-to-date, but be cautious about driver updates; sometimes, rolling back to a previous stable version is more beneficial if a new driver causes issues. Invest in a reputable antivirus program and perform regular scans to keep your system free from malware. Avoid downloading software from untrusted sources, as these can often contain malicious code or corrupted files. Finally, if you're not comfortable diagnosing hardware issues, consider having your RAM tested professionally if you suspect it might be failing.