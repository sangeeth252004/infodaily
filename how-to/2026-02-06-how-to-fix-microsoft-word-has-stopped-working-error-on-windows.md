---
title: "How to Fix 'Microsoft Word Has Stopped Working' Error on Windows"
date: "2026-02-06T15:39:20.428Z"
slug: "how-to-fix-microsoft-word-has-stopped-working-error-on-windows"
type: "how-to"
description: "Troubleshoot and resolve the 'Microsoft Word Has Stopped Working' error on Windows. Learn step-by-step solutions, common causes, and prevention tips to get Word working reliably again."
keywords: "Microsoft Word stopped working, Word crashing, Word not responding, fix Word error, Windows, Office 365, troubleshoot Word, Word repair, disable add-ins, safe mode Word, update Word, change printer, fix corrupted Word."
---

The "Microsoft Word Has Stopped Working" error can be one of the most frustrating issues for any user, particularly when you're in the middle of an important document. This problem manifests as Word becoming unresponsive, freezing, or crashing entirely. When it occurs, you typically see a dialog box stating: "Microsoft Word has stopped working. A problem caused the program to stop working correctly. Windows will close the program and notify you if a solution is available."

This error can appear seemingly out of nowhere, whether you're just opening the application, saving a file, inserting an object, or performing routine formatting tasks. The immediate consequence is the potential loss of unsaved work and a significant disruption to your productivity. Understanding the underlying causes is the first step toward a lasting solution.

### Why It Happens

The "Microsoft Word Has Stopped Working" error on Windows can stem from a variety of sources, ranging from software conflicts to corrupted files. Often, the issue isn't with Word itself, but with external factors or minor corruptions that prevent it from operating smoothly.

Common culprits include outdated Microsoft Office installations, which may lack critical bug fixes or compatibility updates. Third-party add-ins, while often useful, can sometimes conflict with Word's core functionalities, leading to instability. Corrupted user profile data, a damaged `Normal.dotm` template (Word's default global template), or even a faulty printer driver can also trigger crashes, as Word frequently interacts with the default printer settings. Furthermore, a corrupted Office program installation or conflicts with other installed software, such as antivirus programs, can prevent Word from launching or functioning correctly.

### Step-by-Step Solution

Addressing the "Microsoft Word Has Stopped Working" error requires a methodical approach. The following steps will guide you through common fixes, starting with the least intrusive solutions.

#### ## Step 1: Start Word in Safe Mode and Disable Add-ins

Many "stopped working" errors are caused by conflicting add-ins. Starting Word in Safe Mode temporarily disables these, allowing you to identify if an add-in is the culprit.

1.  **Open Word in Safe Mode:**
    *   Press the `Windows key + R` to open the Run dialog.
    *   Type `winword /safe` and press `Enter`.
    *   If Word opens without issues, an add-in is likely the cause.

2.  **Disable Add-ins:**
    *   With Word open in Safe Mode, go to **File > Options**.
    *   In the Word Options dialog box, click on **Add-ins** in the left pane.
    *   At the bottom of the Add-ins section, next to "Manage: COM Add-ins," click **Go...**.
    *   Uncheck all listed COM Add-ins.
    *   Click **OK**.
    *   Close Word and reopen it normally. If the problem is resolved, re-enable add-ins one by one to identify the problematic one.

#### ## Step 2: Repair Your Office Installation

A corrupted Office installation can lead to various issues, including frequent crashes. The built-in repair tool can fix many problems by replacing damaged files.

1.  **Open Programs and Features:**
    *   Right-click the **Start** button and select **Apps and Features** (or **Programs and Features** in Control Panel for older Windows versions).
2.  **Locate Microsoft Office:**
    *   Scroll down and find your Microsoft Office installation (e.g., "Microsoft Office 365" or "Microsoft Office Professional Plus 2019").
3.  **Initiate Repair:**
    *   Click on your Office installation and select **Modify** (or **Change**).
    *   You'll typically be given two options: **Quick Repair** and **Online Repair**.
        *   **Quick Repair:** This option fixes most issues quickly without requiring an internet connection. Try this first.
        *   **Online Repair:** This is a more comprehensive repair that downloads fresh installation files from Microsoft. It takes longer and requires an active internet connection but is more effective for deeply rooted problems. If Quick Repair doesn't work, proceed with Online Repair.
    *   Follow the on-screen prompts to complete the repair process.
4.  Restart your computer and test Word.

#### ## Step 3: Update Microsoft Office and Windows

Outdated software is a common source of bugs and instability. Ensuring both Office and Windows are up to date can resolve known issues.

1.  **Update Microsoft Office:**
    *   Open any Office application (e.g., Word, Excel).
    *   Go to **File > Account**.
    *   Under "Product Information," click **Update Options > Update Now**.
    *   Allow the updates to download and install.

2.  **Update Windows:**
    *   Go to **Settings > Update & Security > Windows Update**.
    *   Click **Check for updates** and install any available updates.
    *   Restart your computer after updates are installed.

#### ## Step 4: Change Your Default Printer

Word interacts heavily with your default printer settings, even if you're not printing. A corrupted or outdated printer driver can sometimes cause crashes.

1.  **Change Default Printer:**
    *   Go to **Settings > Devices > Printers & scanners**.
    *   Uncheck "Let Windows manage my default printer" if it's enabled.
    *   Select "Microsoft Print to PDF" or "Microsoft XPS Document Writer" and set it as your default printer.
2.  **Test Word:**
    *   Open Word and see if the issue persists. If it's resolved, the problem lies with your original default printer driver.
3.  **Update/Reinstall Printer Driver:**
    *   Visit your printer manufacturer's website to download and install the latest driver for your specific printer model.
    *   After updating the driver, you can switch your default printer back.

#### ## Step 5: Replace the Normal.dotm Template

The `Normal.dotm` template is Word's default global template, storing default styles, macros, and customizations. A corrupted `Normal.dotm` file can cause Word to crash.

1.  **Close Word:** Ensure all instances of Word are closed.
2.  **Locate the Template Folder:**
    *   Open File Explorer.
    *   In the address bar, type `%appdata%\Microsoft\Templates` and press `Enter`.
3.  **Rename Normal.dotm:**
    *   Find `Normal.dotm` in the folder.
    *   Right-click `Normal.dotm` and select **Rename**.
    *   Rename it to `Normal.old.dotm`.
    *   **Note:** If you cannot find `Normal.dotm`, you may need to enable "Show hidden files, folders, and drives" in File Explorer's Folder Options.
4.  **Test Word:**
    *   Open Word normally. It will automatically create a new, clean `Normal.dotm` file. If the issue is resolved, your old template was corrupted.

#### ## Step 6: Disable Hardware Graphics Acceleration

In some cases, conflicts with your graphics card driver or hardware acceleration settings can lead to crashes in Office applications.

1.  **Open Word Options:**
    *   Open Word (if possible, in Safe Mode, or try to open it before it crashes).
    *   Go to **File > Options**.
2.  **Navigate to Advanced Settings:**
    *   In the Word Options dialog box, click on **Advanced** in the left pane.
3.  **Disable Hardware Graphics Acceleration:**
    *   Scroll down to the "Display" section.
    *   Check the box for **"Disable hardware graphics acceleration."**
    *   Click **OK**.
4.  Restart Word and test.

#### ## Step 7: Perform a Clean Boot

A clean boot starts Windows with a minimal set of drivers and startup programs, helping to isolate software conflicts that might be causing Word to crash. This is an advanced troubleshooting step.

1.  **Open System Configuration:**
    *   Press `Windows key + R`, type `msconfig`, and press `Enter`.
2.  **Configure Services:**
    *   In the System Configuration window, go to the **Services** tab.
    *   Check the box for **"Hide all Microsoft services."**
    *   Click **Disable all**.
3.  **Configure Startup Items:**
    *   Go to the **Startup** tab.
    *   Click **Open Task Manager**.
    *   In Task Manager, for each startup item, select it and click **Disable**.
    *   Close Task Manager.
4.  **Apply and Restart:**
    *   Back in System Configuration, click **Apply** and then **OK**.
    *   Restart your computer when prompted.
5.  **Test Word:**
    *   After the clean boot, try opening Word. If it works correctly, a third-party program or service was causing the conflict.
6.  **Re-enable Gradually:**
    *   To find the culprit, re-enable services and startup items in small groups through `msconfig` and Task Manager, restarting your computer each time, until Word crashes again. This will help you identify the conflicting software.
7.  Once done troubleshooting, remember to revert your system to a normal startup by selecting "Normal startup" in `msconfig`.

### Common Mistakes

When troubleshooting the "Microsoft Word Has Stopped Working" error, users often make certain mistakes that can prolong the resolution process or lead to unnecessary effort. A common pitfall is immediately reinstalling Microsoft Office without first attempting simpler, more targeted fixes like disabling add-ins or running a quick repair. This can be time-consuming and often doesn't address the root cause if it's something minor like a corrupted template or a conflicting printer driver.

Another frequent error is overlooking the importance of updates for both Office and Windows. Many "stopped working" issues are resolved through routine software patches. Users also sometimes forget to check Word in Safe Mode, which is a crucial diagnostic step to rule out add-in conflicts early on. Lastly, not thoroughly checking for system-wide issues like outdated printer drivers or other background applications conflicting with Office can lead to frustration, as the problem might lie outside Word's core application files.

### Prevention Tips

Preventing the "Microsoft Word Has Stopped Working" error from recurring involves adopting good software maintenance practices and being mindful of potential conflicts. Regularly updating both Microsoft Office and your Windows operating system is paramount, as these updates often contain critical bug fixes, security patches, and performance improvements that enhance stability.

Be judicious about installing third-party add-ins for Word. Only install add-ins from reputable sources and ensure they are compatible with your version of Office. If you experience crashes after installing a new add-in, consider disabling or uninstalling it. Additionally, keep your printer drivers updated, as outdated drivers are a frequent, yet often overlooked, cause of Word crashes. Regularly saving your work, utilizing Word's AutoRecover feature, and performing routine system maintenance like disk cleanup and error checking can also contribute to a stable computing environment, minimizing the chances of encountering this disruptive error.