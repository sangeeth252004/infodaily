---
title: "How to Resolve 'Windows Update Error 0x80070005' on Windows 10/11: A Comprehensive Troubleshooting Guide"
date: "2026-07-23T07:32:36.273Z"
slug: "how-to-resolve-windows-update-error-0x80070005-on-windows-10-11-a-comprehensive-troubleshooting-guide"
type: "how-to"
description: "Troubleshoot and fix Windows Update Error 0x80070005 (Access Denied) on Windows 10 and 11. Learn the common causes and discover step-by-step solutions to restore your system's critical updates."
keywords: "Windows Update Error 0x80070005, fix 0x80070005, Windows 10 update error, Windows 11 update error, access denied error, update fails, Windows update troubleshooting, system permissions, sfc scan, DISM, reset Windows Update components"
---

Windows Update is a critical component of your operating system, delivering essential security patches, bug fixes, and feature enhancements. Encountering an error during this process can be frustrating and leave your system vulnerable. One such common issue is "Windows Update Error 0x80070005," often described as an "Access Denied" error. This guide provides a detailed walkthrough to diagnose and resolve this specific problem on Windows 10 and Windows 11.

## Problem Explanation

When you encounter "Windows Update Error 0x80070005," it means that the Windows Update service is being denied access to certain files, folders, or registry keys that it needs to read, write, or modify during the update process. This typically manifests as updates failing to download, install, or even scan properly. Users will often see a message similar to: "There were some problems installing updates, but we'll try again later. If you keep seeing this and want to search the web or contact support for information, this may help: (0x80070005)." This error prevents your system from receiving vital security updates, leaving it exposed to potential threats, and you may miss out on new features and performance improvements.

## Why It Happens

The root cause of Error 0x80070005 is almost always a permissions issue. The Windows Update service, or the System account under which it operates, lacks the necessary administrative rights to perform an action critical for the update's successful completion. Several factors can lead to this permissions breakdown:

*   **Corrupted System Files:** Essential system files that Windows Update relies on might be damaged, preventing proper access.
*   **Malware or Antivirus Interference:** Malicious software can alter system permissions, or an overly aggressive antivirus program might mistakenly block legitimate Windows Update processes, flagging them as suspicious.
*   **Incorrect Security Settings or Group Policies:** System administrators or third-party applications might have inadvertently configured security settings that restrict access for the Windows Update service.
*   **Issues with the Windows Update Service:** The service itself might be misconfigured, stopped, or have encountered an internal error.
*   **Corruption in the Windows Update Cache:** The temporary files used by Windows Update can become corrupted, leading to access problems during subsequent update attempts.
*   **User Account Control (UAC) Settings:** While less common for this specific error, overly restrictive UAC settings can sometimes contribute to permission conflicts.

## Step-by-Step Solution

Follow these steps in order, testing for resolution after each step, to address "Windows Update Error 0x80070005."

### Step 1: Run the Windows Update Troubleshooter

Windows includes built-in troubleshooters designed to automatically detect and fix common issues. This should always be your first step.

1.  **For Windows 10:**
    *   Go to **Start Menu > Settings > Update & Security > Troubleshoot**.
    *   Click on **Additional troubleshooters**.
    *   Select **Windows Update** and then click **Run the troubleshooter**.
2.  **For Windows 11:**
    *   Go to **Start Menu > Settings > System > Troubleshoot**.
    *   Click on **Other troubleshooters**.
    *   Locate **Windows Update** and click the **Run** button next to it.

Allow the troubleshooter to complete its scan and apply any recommended fixes. Restart your computer and try to run Windows Update again.

### Step 2: Check System Date and Time

An incorrect system date and time can interfere with secure connections to Microsoft's update servers, leading to authentication and permission errors.

1.  Go to **Start Menu > Settings > Time & Language > Date & time**.
2.  Ensure that **"Set time automatically"** and **"Set time zone automatically"** are both toggled **On**.
3.  If they were off, enable them, and then click **Sync now** under "Synchronize your clock" to ensure your system clock is accurate.

Restart your computer and reattempt the update.

### Step 3: Run System File Checker (SFC) and DISM Tools

Corrupted system files are a frequent cause of various Windows errors, including update failures. The System File Checker (SFC) and Deployment Image Servicing and Management (DISM) tools can scan and repair these files.

1.  Open Command Prompt as an administrator:
    *   Type `cmd` in the Windows search bar.
    *   Right-click on **"Command Prompt"** and select **"Run as administrator."**
    *   Click **Yes** if prompted by User Account Control.
2.  In the Command Prompt window, type the following command and press Enter:
    ```cmd
    sfc /scannow
    ```
    *   This scan can take some time. Do not close the window until it completes, displaying "Verification 100% complete."
3.  If SFC finds errors it cannot fix, or even if it reports no integrity violations, proceed with the DISM commands to repair the Windows image:
    ```cmd
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    *   This command downloads repair files from Windows Update to fix potential issues with the Windows image. An active internet connection is required. This process can also take significant time.

After both commands complete, restart your computer and attempt to run Windows Update again.

### Step 4: Reset Windows Update Components

This is often one of the most effective solutions for Error 0x80070005 as it clears the update cache and resets the services involved, effectively resolving many underlying permission issues.

1.  Open Command Prompt as an administrator (refer to Step 3 for instructions).
2.  Stop the necessary Windows Update services by typing these commands, pressing Enter after each:
    ```cmd
    net stop bits
    net stop wuauserv
    net stop appidsvc
    net stop cryptsvc
    ```
3.  Rename the SoftwareDistribution and Catroot2 folders, which store temporary update files and update logs. This forces Windows to create fresh ones. Type these commands and press Enter after each:
    ```cmd
    ren C:\Windows\SoftwareDistribution SoftwareDistribution.old
    ren C:\Windows\System32\catroot2 catroot2.old
    ```
    *   If you encounter "Access Denied" errors here, ensure the services from the previous step are completely stopped. You might need to restart your computer and try stopping them again.
4.  Restart the services you stopped in step 2:
    ```cmd
    net start bits
    net start wuauserv
    net start appidsvc
    net start cryptsvc
    ```

Close Command Prompt, restart your computer, and try to perform Windows Update.

### Step 5: Temporarily Disable Antivirus/Firewall

Third-party antivirus software or firewall settings can sometimes be overly aggressive and block legitimate Windows Update processes, leading to "Access Denied" errors.

1.  **Temporarily disable your third-party antivirus software.** The method varies by product; typically, you can right-click its icon in the system tray and choose a disable option.
2.  **Temporarily disable the Windows Defender Firewall.**
    *   Type `Windows Defender Firewall` in the Windows search bar and open it.
    *   Click on **"Turn Windows Defender Firewall on or off"** in the left pane.
    *   Select **"Turn off Windows Defender Firewall (not recommended)"** for both Private and Public network settings. Click **OK**.
    *   **Important:** Re-enable your antivirus and firewall immediately after testing the update, regardless of the outcome, to maintain system security.

With your security software temporarily disabled, try to run Windows Update. If the update succeeds, re-enable your security software, then investigate its settings to ensure it doesn't interfere with Windows Update in the future (e.g., by adding exclusions).

### Step 6: Manually Adjust Permissions for the 'SYSTEM' Account

If all previous steps fail, it's possible that a specific critical folder or registry key has incorrect permissions for the `SYSTEM` account, which is crucial for Windows Update operations. This step requires caution. We'll focus on common folders known to cause 0x80070005.

1.  **Grant Full Control to SYSTEM for `SoftwareDistribution` and `Catroot2` (if Step 4 did not resolve it):**
    *   Navigate to `C:\Windows`.
    *   Right-click on the `SoftwareDistribution` folder and select **Properties**.
    *   Go to the **Security** tab and click **Edit...**.
    *   Click **Add...**, type `SYSTEM`, click **Check Names**, then **OK**.
    *   Select `SYSTEM` from the list of group or user names.
    *   Under "Permissions for SYSTEM," ensure that the **"Full control"** checkbox in the "Allow" column is **checked**.
    *   Click **Apply**, then **OK**.
    *   Repeat this process for `C:\Windows\System32\catroot2`.
2.  **Grant Full Control to SYSTEM for the `Temp` Folder:**
    *   Navigate to `C:\Windows`.
    *   Right-click on the `Temp` folder and select **Properties**.
    *   Go to the **Security** tab, click **Edit...**, then **Add...**, type `SYSTEM`, click **Check Names**, then **OK**.
    *   Select `SYSTEM` from the list.
    *   Under "Permissions for SYSTEM," ensure that **"Full control"** in the "Allow" column is **checked**.
    *   Click **Apply**, then **OK**.

Restart your computer and try running Windows Update. If modifying these permissions still doesn't resolve the issue, consider performing an in-place upgrade of Windows, which reinstalls the operating system while preserving your files and applications, effectively repairing most system-level issues.

## Common Mistakes

When troubleshooting Error 0x80070005, avoid these common pitfalls:

*   **Ignoring the Error:** Postponing updates leaves your system vulnerable to known security exploits. Prompt resolution is crucial.
*   **Not Running Commands as Administrator:** Most of the powerful fixes (SFC, DISM, resetting components) require elevated administrative privileges in Command Prompt. Failing to run as administrator will result in "Access Denied" messages within the command prompt itself.
*   **Skipping Basic Steps:** Jumping directly to complex solutions without trying the troubleshooter or checking date/time can waste time and overlook simple fixes.
*   **Making Irreversible Changes:** Indiscriminately modifying registry keys or system file permissions without understanding their purpose can lead to system instability. Always follow specific instructions.
*   **Forgetting to Restart:** Many fixes, especially those involving system services or file integrity, require a system restart to take full effect.
*   **Not Re-enabling Security Software:** If you disable your antivirus or firewall, always remember to re-enable them after testing to maintain system security.

## Prevention Tips

Preventing "Windows Update Error 0x80070005" largely involves maintaining a healthy and secure operating environment:

*   **Keep Security Software Up-to-Date:** Ensure your antivirus and anti-malware programs are current and perform regular scans to detect and remove threats that might tamper with system permissions.
*   **Maintain Administrative Privileges:** Ensure your primary user account has administrative rights, or that you are always performing updates from an administrator account.
*   **Avoid Unknown Software:** Be cautious when installing third-party applications from untrusted sources, as they can sometimes interfere with system files or permissions.
*   **Install Updates Regularly:** Don't defer updates indefinitely. Regular patching ensures your system remains current and potential vulnerabilities are addressed before they can be exploited to cause system file corruption or permission issues.
*   **Monitor Disk Health:** Use tools like `chkdsk` (run from Command Prompt as administrator: `chkdsk /f /r`) periodically to check for and repair file system errors that could impact update processes.
*   **Create System Restore Points:** Before making significant system changes or installing new software, create a system restore point. This provides a rollback option if an issue arises.