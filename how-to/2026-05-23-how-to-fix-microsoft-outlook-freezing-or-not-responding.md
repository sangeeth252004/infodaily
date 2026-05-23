---
title: "How to Fix Microsoft Outlook Freezing or Not Responding"
date: "2026-05-23T07:30:54.791Z"
slug: "how-to-fix-microsoft-outlook-freezing-or-not-responding"
type: "how-to"
description: "Resolve Microsoft Outlook freezing or \"Not Responding\" errors with this comprehensive guide. Learn step-by-step solutions, from safe mode and add-in management to data file repair and profile recreation, ensuring a stable Outlook experience."
keywords: "Outlook freezing, Outlook not responding, fix Outlook hang, Outlook crash, ScanPST.exe, Outlook safe mode, disable Outlook add-ins, repair Outlook data file, Outlook profile, Microsoft Office repair"
---

### Problem Explanation

Microsoft Outlook users occasionally encounter frustrating scenarios where the application becomes unresponsive, freezes, or displays "Not Responding" in its title bar. This common issue prevents users from interacting with their emails, calendars, or contacts, effectively halting productivity. Symptoms typically include a spinning blue cursor, the application window greying out, delayed or no response to clicks and keyboard input, or a complete hang that necessitates force-closing Outlook via Task Manager. While the application might eventually recover after several minutes, more often it remains stuck, forcing a restart and potentially leading to lost work if an email was being composed.

This unresponsiveness can occur at various times: immediately upon launching Outlook, while opening a specific email, during the sending or receiving of messages, or even when simply navigating between folders. It's a persistent problem that impacts both new installations and long-standing Outlook configurations, indicating a range of underlying causes rather than a single point of failure.

### Why It Happens

The root causes of Outlook freezing or not responding are diverse but generally stem from conflicts, corruption, or resource limitations. One primary culprit is a corrupt or oversized Outlook data file (.PST for POP3/local archives, .OST for Exchange/Microsoft 365/Outlook.com IMAP accounts). As these files grow large over time, they become more susceptible to corruption, especially if Outlook is not shut down cleanly. Another frequent cause involves problematic add-ins. Third-party add-ins, while often useful, can interfere with Outlook's core functions, leading to instability, particularly if they are outdated or poorly coded.

Furthermore, an outdated Outlook client or operating system can contribute to these issues, as critical bug fixes and performance improvements might be missing. Conflicts with antivirus software, which might aggressively scan Outlook processes or data files, can also cause slowdowns and hangs. Less common but still impactful causes include insufficient system resources (RAM, CPU), a corrupted Outlook profile, or even issues with hardware graphics acceleration settings, especially on systems with older or conflicting display drivers.

### Step-by-Step Solution

#### ## Step 1: Close Outlook and Restart in Safe Mode

Restarting Outlook in Safe Mode disables add-ins and certain customization features, which helps determine if the issue is related to a third-party add-in or a configuration problem.

1.  **Close Outlook:** If Outlook is currently frozen, open Task Manager (Ctrl+Shift+Esc or Ctrl+Alt+Del and select Task Manager), find "Microsoft Outlook" under "Apps," select it, and click "End task."
2.  **Open Run Dialog:** Press the Windows key + R to open the Run dialog box.
3.  **Launch Outlook in Safe Mode:** Type `outlook.exe /safe` into the Run dialog and press Enter or click "OK."
4.  **Observe Behavior:** If Outlook opens and functions normally in Safe Mode, the problem is likely caused by an add-in or a corrupt customization. Proceed to Step 2. If it still freezes, the issue is more fundamental and not related to add-ins.

#### ## Step 2: Disable Problematic Add-ins

If Outlook works fine in Safe Mode, you need to identify and disable the conflicting add-in(s).

1.  **Open Outlook (Safe Mode or Normal):** If you're still in Safe Mode, you can proceed. If not, open Outlook normally.
2.  **Access Add-ins:** Go to `File > Options > Add-ins`.
3.  **Manage COM Add-ins:** At the bottom of the "Add-ins" window, next to "Manage: COM Add-ins," click "Go...".
4.  **Disable Add-ins:** Uncheck all the listed add-ins. Click "OK."
5.  **Restart Outlook:** Close Outlook and reopen it normally (not in Safe Mode).
6.  **Re-enable One by One (Optional):** If Outlook now functions correctly, re-enable your add-ins one by one, restarting Outlook after each activation, until the problem reappears. This helps pinpoint the problematic add-in. Once identified, keep it disabled or look for an updated version.

#### ## Step 3: Repair Outlook Data Files (.PST/.OST)

Corrupt data files are a common cause of unresponsiveness. Microsoft provides the Inbox Repair Tool (ScanPST.exe) to fix these issues.

1.  **Close Outlook:** Ensure Outlook is completely closed.
2.  **Locate ScanPST.exe:** The Inbox Repair Tool (`SCANPST.EXE`) is usually found in your Office installation directory. Typical locations include:
    *   **Microsoft 365/2019/2016:** `C:\Program Files\Microsoft Office\root\Office16` or `C:\Program Files (x86)\Microsoft Office\root\Office16`
    *   **Outlook 2013:** `C:\Program Files\Microsoft Office\Office15` or `C:\Program Files (x86)\Microsoft Office\Office15`
    *   *Note: If you can't find it, search for `SCANPST.EXE` on your C: drive.*
3.  **Run ScanPST.exe:** Double-click `SCANPST.EXE` to launch it.
4.  **Browse for Data File:** Click "Browse..." and navigate to your Outlook data file.
    *   **PST files:** Often located in `C:\Users\<YourUsername>\Documents\Outlook Files`
    *   **OST files:** Often located in `C:\Users\<YourUsername>\AppData\Local\Microsoft\Outlook`
    *   *Note: To find the exact location, in Outlook, go to `File > Account Settings > Account Settings... > Data Files` tab, select your data file, and click "Open File Location..."*
5.  **Start Repair:** Click "Start" to begin the scan. If errors are found, click "Repair" to fix them. You might need to run the tool multiple times until no more errors are reported.
6.  **Restart Outlook:** After the repair, open Outlook normally and check for stability.

#### ## Step 4: Update Microsoft Office

Outdated software can lead to bugs and compatibility issues. Ensuring Outlook is up-to-date is crucial for stability.

1.  **Open Outlook:** Launch Outlook normally.
2.  **Access Office Account:** Go to `File > Office Account` (or `File > Account`).
3.  **Update Options:** Under "Product Information," click "Update Options."
4.  **Update Now:** Select "Update Now" from the drop-down menu.
5.  **Allow Updates:** Follow any on-screen prompts to download and install updates. Restart Outlook after the updates are complete.

#### ## Step 5: Disable Hardware Graphics Acceleration

In some cases, conflicts with display drivers can cause Outlook to freeze. Disabling hardware graphics acceleration might resolve this.

1.  **Open Outlook:** Launch Outlook.
2.  **Access Options:** Go to `File > Options`.
3.  **Advanced Settings:** In the Outlook Options dialog box, click on "Advanced" in the left pane.
4.  **Disable Acceleration:** Scroll down to the "Display" section and check the box that says "Disable hardware graphics acceleration."
5.  **Apply and Restart:** Click "OK" to apply the change, then close and restart Outlook.

#### ## Step 6: Create a New Outlook Profile

A corrupt Outlook profile can cause persistent issues that data file repair alone cannot fix. Creating a new profile often resolves deep-seated configuration problems.

1.  **Close Outlook:** Ensure Outlook is completely closed.
2.  **Open Control Panel:**
    *   **Windows 10/11:** Right-click the Start button, select "Run," type `control` and press Enter.
    *   **Older Windows:** Open Start Menu and select "Control Panel."
3.  **Access Mail Setup:** In the Control Panel, search for "Mail" or change "View by" to "Large icons" or "Small icons" and find "Mail (Microsoft Outlook 2016)" (the version number might vary). Click on it.
4.  **Show Profiles:** In the Mail Setup dialog box, click "Show Profiles...".
5.  **Add New Profile:** Click "Add...", type a name for your new profile (e.g., "Outlook New Profile"), and click "OK."
6.  **Configure Account:** Follow the prompts to set up your email account(s) within the new profile. Use the same settings as your old profile.
7.  **Set as Default:** Back in the "Mail" dialog, select "Always use this profile" and choose your new profile from the drop-down menu.
8.  **Launch Outlook:** Close the Mail dialogs and open Outlook. It will now use the new profile. If it works, you can eventually delete the old, problematic profile.

#### ## Step 7: Repair Microsoft Office Installation

If individual Outlook repairs don't work, a full repair of the entire Office installation can fix underlying system file corruption or installation issues.

1.  **Close all Office applications:** Ensure Outlook, Word, Excel, etc., are all closed.
2.  **Open Programs and Features:**
    *   **Windows 10/11:** Right-click the Start button, select "Apps and Features" or "Installed Apps."
    *   **Older Windows:** Open Control Panel, then "Programs and Features."
3.  **Find Microsoft Office:** Locate your Microsoft Office installation in the list (e.g., "Microsoft 365," "Microsoft Office Professional Plus 2019").
4.  **Initiate Repair:** Select "Microsoft Office" and click "Modify" (or "Change").
5.  **Choose Repair Type:** You will likely be given options for "Quick Repair" and "Online Repair."
    *   **Quick Repair:** A faster process that fixes common issues without requiring an internet connection. Try this first.
    *   **Online Repair:** A more comprehensive repair that reinstalls components from Microsoft servers and requires an internet connection. If Quick Repair fails, proceed with Online Repair.
6.  **Follow Prompts:** Follow the on-screen instructions to complete the repair.
7.  **Restart Computer:** Restart your computer after the repair is finished, then launch Outlook.

### Common Mistakes

When troubleshooting Outlook freezing, users often make several common mistakes that can delay or complicate the fix. One frequent error is immediately reinstalling Office without first attempting simpler, less disruptive solutions like disabling add-ins or repairing data files. This can be time-consuming and often unnecessary if the problem lies with a specific add-in or a minor data corruption. Another mistake is ignoring the Inbox Repair Tool (ScanPST.exe) or only running it once. Data files, especially large ones, might require multiple passes with the tool to fully resolve all detected errors.

Additionally, many users overlook the importance of checking for Office updates, which often include critical stability and performance fixes. Failing to test Outlook in Safe Mode before diving into more complex troubleshooting steps means missing out on a quick diagnostic that can immediately point to add-in conflicts. Lastly, users sometimes create a new profile but fail to set it as the default, meaning Outlook continues to launch with the old, problematic profile.

### Prevention Tips

To minimize the likelihood of Microsoft Outlook freezing or becoming unresponsive in the future, adopt several best practices for maintaining a healthy Outlook environment. Regularly update your Microsoft Office suite to ensure you have the latest bug fixes, performance enhancements, and security patches. You can do this via `File > Office Account > Update Options > Update Now`. Also, keep your Windows operating system and device drivers (especially display drivers) up to date, as system-wide stability contributes to application performance.

Periodically review and manage your Outlook data files. Avoid excessively large `.PST` or `.OST` files by archiving old emails or removing attachments, and consider compacting them via `File > Account Settings > Account Settings... > Data Files > Settings > Compact Now`. Be judicious about installing Outlook add-ins, only using those from reputable sources, and periodically disabling any that are not essential or appear to cause performance issues. Finally, ensure your system has adequate RAM and CPU resources, as a system struggling for resources can easily cause applications like Outlook to become unresponsive.