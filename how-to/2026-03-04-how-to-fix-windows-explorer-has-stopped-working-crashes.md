---
title: "How to Fix \"Windows Explorer Has Stopped Working\" Crashes"
date: "2026-03-04T20:30:50.171Z"
slug: "how-to-fix-windows-explorer-has-stopped-working-crashes"
type: "how-to"
description: "Learn how to resolve the frustrating \"Windows Explorer has stopped working\" error with this comprehensive step-by-step guide. Fix crashes and regain control of your PC."
keywords: "Windows Explorer stopped working, fix explorer.exe crash, Windows Explorer error, explorer.exe has stopped responding, fix file explorer crash, Windows crashes, taskbar not working, how to fix Windows Explorer"
---

It's incredibly frustrating when Windows Explorer, the program you use to navigate your files, folders, and the desktop, suddenly decides to quit on you. You might see a pop-up message stating, "Windows Explorer has stopped working." This often happens when you're trying to open a folder, access a drive, or even just click on an icon. When this error occurs, your taskbar might disappear, your desktop icons vanish, and you're left with a blank screen or a blinking cursor. This can be particularly disruptive if you're in the middle of important work or need to access specific files quickly.

The "Windows Explorer has stopped working" error is a general indication that the `explorer.exe` process has encountered a critical error and has been shut down by Windows to prevent further instability. This doesn't necessarily mean your entire operating system is failing, but it severely impacts your ability to interact with your computer's graphical interface. The unexpected termination can leave you feeling stranded, unable to perform basic tasks like opening applications or managing files.

### Why It Happens

There are several common culprits behind the "Windows Explorer has stopped working" error. Often, a corrupted system file or a malfunctioning driver is to blame. When these essential components of Windows become damaged or outdated, they can cause conflicts that lead to the `explorer.exe` process crashing. Think of it like a vital cog in a complex machine suddenly breaking – the whole system can grind to a halt.

Another frequent cause is an issue with third-party software or shell extensions. These are add-ons that integrate with File Explorer to provide extra functionality. If one of these extensions becomes buggy or incompatible with your current Windows version, it can trigger a crash whenever File Explorer tries to use it. Malware or viruses can also corrupt system files or interfere with `explorer.exe`, leading to these persistent crashes.

## Step 1: Restart Windows Explorer

Sometimes, the simplest solution is the most effective. A quick restart of the Windows Explorer process can resolve temporary glitches that are causing the crashes.

1.  Press **Ctrl + Shift + Esc** on your keyboard simultaneously. This will open the **Task Manager**.
2.  If you see a simplified view, click on **More details** at the bottom.
3.  In the **Processes** tab, scroll down until you find **Windows Explorer**.
4.  Right-click on **Windows Explorer** and select **Restart**.
5.  Your taskbar and desktop icons should disappear for a moment and then reappear. Check if the error is resolved.

## Step 2: Run the System File Checker (SFC) Tool

The System File Checker is a built-in Windows utility that scans for and repairs corrupted Windows system files. Corrupted files are a common cause of Explorer crashes.

1.  Click the **Start button**.
2.  Type `cmd` in the search bar.
3.  Right-click on **Command Prompt** in the search results and select **Run as administrator**.
4.  In the Command Prompt window, type the following command and press **Enter**:
    ```
    sfc /scannow
    ```
5.  The scan may take some time to complete. Once it's finished, it will report whether it found any integrity violations and if it was able to repair them.
6.  After the scan, close the Command Prompt and restart your computer.

## Step 3: Run the Deployment Image Servicing and Management (DISM) Tool

If the SFC scan doesn't resolve the issue, the DISM tool can be used to repair the Windows image that SFC uses. This is particularly useful if SFC itself is unable to fix the corrupted files because the underlying image is damaged.

1.  Open **Command Prompt as administrator** again (follow steps 1-3 from Step 2).
2.  Type the following command and press **Enter**:
    ```
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
3.  This process can also take a while. It will download necessary files from Windows Update to repair the image.
4.  Once DISM has finished, it's a good idea to run the SFC tool again:
    ```
    sfc /scannow
    ```
5.  Restart your computer after both scans are complete.

## Step 4: Check for Problematic Shell Extensions

Third-party shell extensions are a very common cause of Windows Explorer crashes. These are often installed with software like archiving tools, cloud storage services, or media players.

1.  Download and run a free utility called **ShellExView** from a reputable source (e.g., NirSoft).
2.  Once ShellExView is open, go to **Options > Filter by Extension Type** and uncheck **All Extension Types**.
3.  Then, go back to **Options > Filter by Extension Type** and select **Context Menu** and **Explorer**.
4.  Sort the list by the "Company" column. Look for any extensions that are not from Microsoft.
5.  Select any non-Microsoft shell extension, right-click on it, and choose **Disable Selected Items**.
6.  **Restart your computer.**
7.  If the problem is resolved, you can re-enable the extensions one by one (disabling and restarting each time) to identify the culprit.

## Step 5: Update or Roll Back Graphics Drivers

Outdated or corrupted graphics drivers can sometimes interfere with Windows Explorer.

1.  Right-click the **Start button** and select **Device Manager**.
2.  Expand **Display adapters**.
3.  Right-click on your graphics card and select **Update driver**. Choose **Search automatically for drivers**.
4.  If Windows finds a newer driver, install it and restart your computer.
5.  If the problem started after a recent driver update, or if updating doesn't help, try rolling back the driver:
    *   In Device Manager, right-click your graphics card again.
    *   Select **Properties**.
    *   Go to the **Driver** tab.
    *   Click **Roll Back Driver** (if available).
    *   Follow the prompts and restart your computer.

## Step 6: Scan for Malware

Malware can corrupt system files and cause instability, including Explorer crashes.

1.  Ensure your antivirus software is up to date.
2.  Perform a full system scan using your antivirus program.
3.  If you don't have an antivirus program installed, consider using a free, reputable scanner like Windows Defender (built into Windows) or Malwarebytes.
4.  Follow the on-screen instructions to remove any detected threats.
5.  Restart your computer after the scan and removal process.

## Step 7: Perform a Clean Boot

A clean boot starts Windows with a minimal set of drivers and startup programs. This helps you identify if a background program or service is causing the conflict.

1.  Click the **Start button**.
2.  Type `msconfig` and press **Enter** to open **System Configuration**.
3.  Go to the **Services** tab.
4.  Check the box that says **Hide all Microsoft services**.
5.  Click **Disable all**.
6.  Go to the **Startup** tab.
7.  Click **Open Task Manager**.
8.  In Task Manager, disable each startup item by right-clicking on it and selecting **Disable**.
9.  Close Task Manager, then click **OK** in the System Configuration window.
10. **Restart your computer.**
11. If Explorer works fine in a clean boot state, you can re-enable services and startup items gradually to pinpoint the cause.

### Common Mistakes

One common mistake is immediately assuming the worst and attempting a full Windows reinstall. While this can fix the problem, it's a drastic measure that's usually unnecessary and time-consuming. Users also sometimes overlook the role of third-party shell extensions, which are a very frequent cause of these crashes. Failing to run system file checker scans with administrator privileges is another pitfall, as these commands require elevated permissions to modify system files. Additionally, not restarting the computer after making changes can lead to the fixes not being properly applied.

### Prevention Tips

To help prevent "Windows Explorer has stopped working" crashes in the future, keep your Windows operating system and all installed software up to date. Regular Windows updates often include patches for stability issues. Be cautious about installing software from untrusted sources, especially those that integrate heavily with File Explorer. Regularly scan your computer for malware and ensure your antivirus software is always current. Finally, consider uninstalling any programs you no longer use, as they might be contributing to system clutter and potential conflicts.