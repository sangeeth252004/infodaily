---
title: "Laptop Plugged In But Not Charging? Here's How to Fix It"
date: "2026-04-21T20:51:54.988Z"
slug: "laptop-plugged-in-but-not-charging-here-s-how-to-fix-it"
type: "how-to"
description: "Troubleshoot and resolve the common issue of your laptop showing as plugged in but not charging. Follow these practical steps to get your battery back online."
keywords: "laptop not charging, plugged in not charging, battery fix, laptop power, charging issue, battery not detected, Windows battery, Mac battery"
---

## Problem Explanation

You've plugged your laptop into a power outlet, and the charging indicator light or icon on your screen confirms it's connected. However, the battery percentage isn't increasing, or worse, it might even be slowly decreasing. You're seeing a message like "Plugged in, not charging" in Windows, or your macOS battery status shows "Not Charging" even when the adapter is connected. This is a frustrating situation, especially when you need your laptop for work, study, or entertainment, and you're tethered to a power source that isn't actually powering your device. The immediate consequence is a dwindling battery life, eventually leading to an unexpected shutdown.

## Why It Happens

This common problem can stem from a variety of sources, ranging from simple software glitches to more serious hardware failures. Often, the root cause is a miscommunication between the operating system, the battery, and the power adapter. A software issue, such as a corrupted battery driver or a bug in the power management settings, can prevent the system from correctly recognizing and utilizing the charging input. Alternatively, the issue could lie with the physical components: a faulty AC adapter might not be delivering sufficient power, a dirty or damaged charging port could be hindering the connection, or the battery itself may have reached the end of its lifespan or is experiencing an internal malfunction. Sometimes, even external factors like a failing power strip can be the culprit.

## Step-by-Step Solution

This section outlines a systematic approach to diagnosing and resolving the "plugged in, not charging" issue. Work through these steps in order.

### Step 1: Basic Checks and Resets

Before diving into complex troubleshooting, ensure the most basic elements are functioning correctly.

1.  **Check the Power Source:**
    *   **Verify the Outlet:** Plug another device into the same wall outlet to confirm it's working.
    *   **Check the Power Strip/Surge Protector:** If using one, bypass it and plug the AC adapter directly into the wall outlet. Faulty power strips can prevent sufficient power flow.
2.  **Inspect the AC Adapter and Cables:**
    *   **Look for Damage:** Carefully examine the AC adapter brick, the cable connecting it to the wall, and the cable connecting to your laptop for any signs of fraying, cuts, kinks, or bent pins. Damaged cables are a fire hazard and a common cause of charging issues.
    *   **Secure Connections:** Ensure the cable is firmly plugged into the adapter brick (if it's a detachable cord) and securely into the laptop's charging port.
3.  **Restart Your Laptop:** A simple reboot can resolve temporary software glitches that might be interfering with battery management.
    *   **Windows:** Click **Start** > **Power** > **Restart**.
    *   **macOS:** Click **Apple menu** > **Restart**.

### Step 2: Troubleshoot the Battery Driver (Windows)

Corrupted or outdated battery drivers are a frequent cause of this problem on Windows laptops.

1.  **Open Device Manager:**
    *   Right-click the **Start button** and select **Device Manager**.
2.  **Locate Batteries:**
    *   Expand the **Batteries** category. You should see at least two items: "Microsoft AC Adapter" and "Microsoft ACPI-Compliant Control Method Battery."
3.  **Uninstall and Reinstall Drivers:**
    *   Right-click on **Microsoft ACPI-Compliant Control Method Battery** and select **Uninstall device**.
    *   **Do NOT check the box that says "Delete the driver software for this device."**
    *   Click **Uninstall**.
    *   Once uninstalled, click the **Action** menu at the top of Device Manager and select **Scan for hardware changes**.
    *   Windows will automatically reinstall the driver.
4.  **Repeat for AC Adapter:**
    *   Right-click on **Microsoft AC Adapter** and select **Uninstall device**.
    *   Click **Uninstall**.
    *   Again, click **Action** > **Scan for hardware changes**.
5.  **Restart Your Laptop:** After reinstalling, restart your laptop. Plug in the AC adapter and see if the battery begins to charge.

### Step 3: Perform a Power Cycle/Hard Reset

This process drains any residual power from the system, which can sometimes clear persistent hardware or software conflicts.

1.  **Shut Down Your Laptop:** Ensure your laptop is completely powered off, not just in sleep or hibernate mode.
2.  **Disconnect Power:** Unplug the AC adapter from the laptop.
3.  **Remove the Battery (If Possible):**
    *   If your laptop has a user-removable battery, carefully detach it from the laptop.
    *   If your battery is internal, skip this step but ensure the AC adapter is disconnected.
4.  **Press and Hold the Power Button:** With the battery removed (or AC adapter unplugged), press and hold the laptop's power button for **15-30 seconds**. This discharges any remaining power.
5.  **Reconnect and Restart:**
    *   If you removed the battery, reinsert it.
    *   Plug the AC adapter back into the laptop.
    *   Turn on your laptop.

### Step 4: Update Your System and BIOS/UEFI

Outdated system firmware or BIOS/UEFI can sometimes cause compatibility issues with power management.

1.  **Update Operating System:**
    *   **Windows:** Go to **Settings** > **Update & Security** > **Windows Update** and click **Check for updates**. Install all available updates.
    *   **macOS:** Go to **System Preferences** > **Software Update**. Install any available updates.
2.  **Update BIOS/UEFI (Advanced):**
    *   This process is manufacturer-specific and can be risky if not done correctly. Consult your laptop manufacturer's support website for instructions on how to check for and install BIOS/UEFI updates for your specific model.
    *   **Warning:** Always ensure your laptop is plugged in and has a stable power source during a BIOS/UEFI update, and follow the manufacturer's instructions precisely. Interrupting this process can render your laptop unusable.

### Step 5: Check Battery Health and Calibration

Your battery might be functioning, but simply not reporting its charge level correctly, or it may be nearing the end of its life.

1.  **Check Battery Health:**
    *   **Windows:** Open **Command Prompt** as an administrator (search for "cmd", right-click, and select "Run as administrator"). Type `powercfg /batteryreport` and press Enter. This will save a report to your user folder (usually `C:\Users\[YourUsername]\battery-report.html`). Open this file in a web browser to see detailed battery information, including its design capacity versus its full charge capacity. A significant difference indicates battery degradation.
    *   **macOS:** Hold the **Option key** and click the **Apple menu**. Select **System Information**. In the left sidebar, under **Hardware**, click **Power**. Look for "Condition" under "Battery Information." It should ideally say "Normal."
2.  **Calibrate Your Battery (If Necessary):** If the health report shows significant degradation, or if the battery level fluctuates wildly, calibration might help. The process varies by manufacturer, but generally involves fully charging the battery, then letting it drain completely until the laptop shuts down, and then fully charging it again without interruption. Consult your laptop's manual or manufacturer's website for specific calibration instructions.

### Step 6: Test with a Different AC Adapter

If the above steps haven't resolved the issue, the AC adapter itself may be faulty.

1.  **Find a Compatible Adapter:** Borrow or purchase an identical or fully compatible AC adapter for your laptop model. Ensure the voltage, amperage, and connector type match exactly. Using an incorrect adapter can damage your laptop.
2.  **Test the New Adapter:** Plug the known-good AC adapter into your laptop and see if it begins to charge. If it does, your original adapter was likely the problem.

## Common Mistakes

When trying to fix a laptop battery that's plugged in but not charging, users often make a few critical errors that hinder their progress or even worsen the situation. One common mistake is not performing the basic checks first. Users might immediately jump to driver uninstallation without confirming the power outlet is functional or that the AC adapter's cables are not damaged. Another frequent pitfall is using a generic or incompatible AC adapter for testing. Using an adapter with incorrect voltage or amperage can cause irreparable damage to the laptop's motherboard or battery charging circuitry. Furthermore, users sometimes skip the crucial step of a full system power cycle (hard reset), which is often the simplest solution for minor electrical glitches. Finally, attempting a BIOS/UEFI update without following the manufacturer's exact instructions can lead to a bricked device, making the charging problem the least of your worries.

## Prevention Tips

To avoid encountering the "plugged in, not charging" issue in the future, adopt a few good practices for managing your laptop's power. Regularly inspect your AC adapter and its cables for any signs of wear and tear. Keep them coiled loosely and avoid sharp bends or kinks when storing or transporting your laptop. Whenever possible, use the original charger provided by the manufacturer or a reputable third-party adapter that is explicitly compatible with your model. Avoid leaving your laptop plugged in 24/7 at 100% charge if your manufacturer offers battery health management features; many modern laptops have settings to limit charging to 80% to prolong battery lifespan. Periodically run the battery health report (as described in Step 5) to monitor your battery's condition. If you notice significant degradation, it's often more cost-effective to replace the battery proactively rather than waiting for it to fail completely or cause other charging-related problems. Finally, keep your operating system and drivers updated, as these updates often include power management improvements and bug fixes.