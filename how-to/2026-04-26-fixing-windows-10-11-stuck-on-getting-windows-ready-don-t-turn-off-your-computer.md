---
title: "Fixing Windows 10/11 Stuck on \"Getting Windows Ready, Don't Turn Off Your Computer\""
date: "2026-04-26T02:37:53.950Z"
slug: "fixing-windows-10-11-stuck-on-getting-windows-ready-don-t-turn-off-your-computer"
type: "how-to"
description: "Resolve the frustrating Windows update screen stuck issue. This guide offers step-by-step solutions and prevention tips for when Windows 10 or 11 hangs on \"Getting Windows Ready.\""
keywords: "Windows update stuck, Getting Windows Ready, Windows 10 not booting, Windows 11 not booting, fix Windows update error, Windows stuck on boot screen"
---

## Problem Explanation

You've just restarted your computer, perhaps after a Windows update or a system configuration change, and instead of the familiar login screen or desktop, you're greeted by a static screen displaying "Getting Windows ready. Don't turn off your computer." This message can persist for hours, even days, leaving your system inaccessible and causing significant frustration. It signifies that Windows is in the process of applying updates, configuring new features, or reverting changes, but for some reason, this critical phase has stalled or entered an endless loop. This situation effectively renders your computer unusable until the underlying issue is resolved.

The "Getting Windows ready" screen is intended to be a temporary indicator that the operating system is performing essential background tasks. However, when it freezes, it suggests a disruption in the update process, a conflict with existing system files, or a hardware-related problem that prevents the update from completing. This can occur during major feature updates, routine security patches, or even driver installations, leaving users in a state of uncertainty and helplessness.

## Why It Happens

The primary reason a Windows update or configuration process gets stuck on the "Getting Windows ready" screen is usually due to an interruption or corruption during the installation or configuration phase. This interruption can stem from various sources: a sudden power loss while the update was in progress, an unstable internet connection that led to incomplete download of update files, or conflicts arising from third-party software, aggressive antivirus programs, or outdated drivers interfering with the update process.

Furthermore, corrupted system files can prevent Windows from properly applying updates or completing configurations. If critical files that manage the update process are damaged, the system may become stuck in a loop, unable to proceed. In some less common scenarios, issues with the hard drive itself, such as bad sectors, or problems with the RAM can also lead to data corruption during these sensitive operations, resulting in the system hanging indefinitely on this preparatory screen.

## Step-by-Step Solution

When faced with the "Getting Windows ready" screen of death, it's crucial to approach the troubleshooting process methodically. Patience is key initially, as some updates can genuinely take a considerable amount of time. However, if the screen remains unchanged for more than a few hours, it's time to intervene.

### ## Step 1: Wait (An Extended Period)

Before attempting any drastic measures, it's always wise to give Windows ample time. Some significant feature updates can take anywhere from 30 minutes to several hours, especially on older hardware or with very large updates. If you haven't waited at least 3-4 hours, or even overnight, consider letting it run. Ensure your laptop is plugged in or your desktop has a stable power supply. If after this extended period there's absolutely no change, then proceed to the next steps.

### ## Step 2: Force a Shutdown and Restart

This is the most common initial step when a system is unresponsive.

1.  **Press and hold the power button** on your computer for approximately 10-15 seconds, or until the computer completely shuts down.
2.  **Wait for about 30 seconds** to allow any residual power to dissipate.
3.  **Press the power button again** to turn your computer back on.

Windows will likely attempt to resume the update process. If it was a temporary glitch, it might now proceed normally. If it still gets stuck, you'll need to try further steps.

### ## Step 3: Access Advanced Startup Options

If a simple restart doesn't resolve the issue, you'll need to access Windows' Advanced Startup Options to utilize repair tools. The method for this depends on whether you can reach the login screen or not. Since you're stuck on the "Getting Windows ready" screen, you'll likely need to force this.

1.  **Force shutdown:** As in Step 2, press and hold the power button until the computer shuts down.
2.  **Boot into Automatic Repair:** Turn your computer back on. As soon as you see the Windows logo or the spinning dots, **force shutdown again** by holding the power button.
3.  **Repeat:** Perform this "interrupt-boot" process two to three times. On the third or fourth boot attempt, Windows should automatically enter the **Automatic Repair** environment. You will see a screen saying "Preparing Automatic Repair" or "Diagnosing your PC."

### ## Step 4: Utilize System Restore

Once in the Automatic Repair environment, navigate to the repair tools.

1.  From the "Automatic Repair" screen, click **Advanced options**.
2.  On the "Choose an option" screen, select **Troubleshoot**.
3.  On the "Troubleshoot" screen, select **Advanced options**.
4.  From the "Advanced options" menu, choose **System Restore**.
5.  Follow the on-screen prompts. If you have a restore point created before the problematic update, selecting it can revert your system files and settings to that previous state, potentially bypassing the stuck update. Choose the most recent restore point that you believe predates the issue.

### ## Step 5: Use Command Prompt for Startup Repair or SFC/DISM

If System Restore isn't an option or doesn't work, the Command Prompt within Advanced Startup is a powerful tool.

1.  Navigate through the menus as in Step 4 until you reach the "Advanced options" screen.
2.  Select **Command Prompt**.
3.  In the Command Prompt window, first, try to run the Startup Repair tool. Type `sfc /scannow` and press Enter. This command scans for and attempts to repair corrupted system files. Let it complete.
4.  If `sfc /scannow` finds errors it cannot fix, or if it completes without resolving the issue, you can try DISM (Deployment Image Servicing and Management). Type the following commands, pressing Enter after each:
    ```
    DISM /Online /Cleanup-Image /RestoreHealth
    ```
    This command checks for and downloads necessary files from Windows Update to repair the system image. This step requires an internet connection, which might be available in the Windows Recovery Environment. If it fails due to no internet, you might need to use an offline DISM command with installation media.
5.  After running these commands, type `exit` and press Enter to close the Command Prompt.
6.  On the "Choose an option" screen, click **Continue** to exit and continue to Windows 10/11.

### ## Step 6: Uninstall Recent Updates

If the issue began immediately after a Windows update, uninstalling that specific update might be the solution.

1.  Navigate to **Advanced options** as described in Step 4.
2.  Select **Uninstall Updates**.
3.  You will see options to uninstall the latest Quality Update or the latest Feature Update. **Uninstall the latest Quality Update first.** If that doesn't help, you can try uninstalling the latest Feature Update if one was recently installed.
4.  Follow the prompts to complete the uninstallation and then restart your computer.

### ## Step 7: Reset This PC (Last Resort)

If all other methods fail, resetting your PC is the most drastic but often effective solution. This process reinstalls Windows while giving you the option to keep your personal files.

1.  Navigate to **Advanced options** as described in Step 4.
2.  Select **Reset this PC**.
3.  You will be presented with two options:
    *   **Keep my files:** This removes apps and settings but keeps your personal files. This is the recommended option if you want to preserve your data.
    *   **Remove everything:** This reinstalls Windows and removes all your personal files, apps, and settings.
4.  Choose **Keep my files**.
5.  Follow the on-screen instructions. Windows will then attempt to reset the operating system. This process can take a significant amount of time.

## Common Mistakes

A common mistake is immediately forcing a shutdown as soon as the "Getting Windows ready" message appears without allowing a reasonable amount of time. While persistence is important, some updates are simply very large and time-consuming. Another error is to repeatedly force shutdowns too quickly during the boot process, which can sometimes corrupt the system further or prevent the Automatic Repair environment from loading correctly. Users also sometimes skip the diagnostic steps and jump straight to the most drastic solutions like "Reset this PC," which can be a time-consuming process that could have been avoided with simpler fixes like System Restore or uninstalling an update. Finally, attempting to run complex command-line tools without understanding their purpose can lead to unintended consequences.

## Prevention Tips

To prevent Windows from getting stuck on the "Getting Windows ready" screen in the future, it's crucial to maintain a healthy and stable system. Ensure your computer always has a stable power source during updates; use a UPS (Uninterruptible Power Supply) if you experience frequent power outages. Maintain a strong and consistent internet connection when downloading updates. Avoid interrupting the update process by force-shutting down your PC unless absolutely necessary. Keep your system drivers, especially for your graphics card and storage controllers, up to date, as outdated drivers can sometimes conflict with Windows updates. Regularly run the built-in Windows troubleshooter for Windows Update, and perform routine system maintenance tasks like disk cleanup and checking for disk errors (`chkdsk`). Finally, create regular restore points, especially before major Windows updates or significant system changes, so you have an easy fallback option if something goes wrong.