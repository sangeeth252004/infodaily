---
title: "How to Resolve Laptop Battery Stuck at 'Plugged In, Not Charging' on Windows Laptops"
date: "2026-01-22T10:27:31.402Z"
slug: "how-to-resolve-laptop-battery-stuck-at-plugged-in-not-charging-on-windows-laptops"
type: "how-to"
description: "Stuck at \"Plugged In, Not Charging\"? Learn expert, step-by-step solutions to fix your laptop battery issue, from basic checks to advanced driver and power management troubleshooting on Windows."
keywords: "laptop battery not charging, plugged in not charging, windows battery fix, laptop power issue, battery troubleshooting, ACPI-Compliant Control Method Battery, power cycle battery, battery report"
---

### Problem Explanation

Encountering a laptop battery that's "Plugged In, Not Charging" can be a frustrating experience, leaving your portable device tethered to a power outlet. This specific issue manifests when your Windows laptop is connected to its AC adapter, the power indicator light is on (or flashing, depending on the model), but the battery percentage consistently remains at a fixed level, refusing to increase towards a full charge. You'll typically observe this status when hovering over the battery icon in the system tray, where it clearly states "Plugged in, not charging" instead of the expected "Plugged in, charging." This isn't a problem of the charger not being detected at all, nor is it a slow charging scenario; the system acknowledges power input but refuses to direct it towards recharging the battery.

This condition can occur at any battery percentage – whether it’s stuck at 80%, 50%, or even 5% – and prevents the laptop from achieving its full intended battery life, essentially turning it into a desktop computer. While the laptop functions normally when connected to power, its portability is severely compromised, making it a critical issue for users who rely on their device on the go.

### Why It Happens

The "Plugged In, Not Charging" problem usually stems from a communication breakdown or a protective measure within your laptop's power management system, rather than a simple charger failure. Common culprits include corrupted or outdated battery drivers, which act as the interpreter between your operating system and the battery hardware. If these drivers are faulty, Windows might not correctly instruct the battery to charge, even if power is available.

Another significant reason involves misconfigured power settings within Windows itself, or even in the laptop's BIOS/UEFI firmware, where charging thresholds or battery health management features might prevent a full charge to prolong battery lifespan. Physical issues like a faulty AC adapter, a damaged charging port, or even a disconnected internal battery cable can also contribute. Lastly, the battery itself might be at fault; older or degraded batteries can lose their ability to hold a charge or communicate their status correctly, prompting the system to stop charging as a safety precaution. Understanding these underlying causes is the first step toward effectively troubleshooting and resolving the issue.

### Step-by-Step Solution

Follow these steps carefully to diagnose and resolve your laptop battery's "Plugged In, Not Charging" issue.

## Step 1: Perform Basic Checks and a Hard Reboot

Start with the simplest solutions, as often the issue is less complicated than it seems.

1.  **Check the Power Connection:** Ensure the AC adapter is securely plugged into both the laptop and the wall outlet. Try a different wall outlet.
2.  **Inspect the Charger:** Examine your AC adapter for any visible damage to the cable or the brick. If you have access to another compatible charger, test it with your laptop. A faulty charger might provide power but not enough to initiate charging.
3.  **Perform a Full Shutdown and Restart:**
    *   Save all your work and close applications.
    *   Go to **Start** > **Power** > **Shut down**. Do not use "Restart."
    *   Once the laptop is completely off, wait for a few seconds.
    *   Press the power button to turn it back on. Check the battery status.

## Step 2: Perform a Battery Power Cycle (Physical Reset)

This step helps clear any residual power and often resolves communication glitches between the battery and the system.

1.  **Disconnect AC Adapter:** Unplug the charger from your laptop.
2.  **Remove the Battery (If Possible):** If your laptop has an easily removable battery, slide the release latches and carefully remove it. For laptops with non-removable (internal) batteries, proceed to the next sub-step. *Do not attempt to open your laptop if you are unsure how, as this could void your warranty or cause damage.*
3.  **Drain Residual Power:** With the AC adapter disconnected and the battery removed (or if the battery is internal), press and hold the laptop's power button for a full 15-30 seconds. This drains any residual charge from the capacitors.
4.  **Reinstall Battery (If Applicable):** If you removed the battery, carefully reinsert it.
5.  **Reconnect AC Adapter:** Plug the AC adapter back into your laptop.
6.  **Power On:** Turn on your laptop and check the battery status.

## Step 3: Update or Reinstall Battery Drivers

Corrupt or outdated battery drivers are a common cause of charging issues. This process forces Windows to re-detect and reinstall the drivers.

1.  **Open Device Manager:** Right-click the **Start** button and select "Device Manager."
2.  **Expand "Batteries":** In the Device Manager window, locate and expand the "Batteries" category.
3.  **Uninstall Drivers:** You should see two main entries: "Microsoft AC Adapter" and "Microsoft ACPI-Compliant Control Method Battery."
    *   Right-click on **"Microsoft AC Adapter"** and select "Uninstall device."
    *   Right-click on **"Microsoft ACPI-Compliant Control Method Battery"** and select "Uninstall device."
    *   *Important:* If prompted, **do not** check the box to "Delete the driver software for this device." Just click "Uninstall."
4.  **Restart Your Laptop:** Close Device Manager and restart your laptop normally (Start > Power > Restart).
5.  **Reinstallation:** Windows will automatically detect the missing battery drivers and reinstall them upon restart. Once logged back in, check your battery status.

## Step 4: Adjust Power Plan Settings

Sometimes, power management settings can unintentionally limit battery charging.

1.  **Open Power Options:** Search for "Power & sleep settings" in the Windows search bar and click on it. Then, on the right pane, click "Additional power settings."
2.  **Change Plan Settings:** For your currently active power plan (usually "Balanced" or "Power Saver"), click "Change plan settings."
3.  **Advanced Power Settings:** Click "Change advanced power settings."
4.  **Check Battery Settings:** Scroll down and expand the "Battery" category.
    *   Expand "Low battery level," "Critical battery level," and "Reserve battery level." Ensure these are set to appropriate percentages and that "Plugged in" actions are set to reasonable values (e.g., "Do nothing" or "Hibernate" if critical, but not stopping charge).
    *   Crucially, some manufacturers (like Dell, HP, Lenovo) include their own battery management tools within their power options or a separate utility. Look for categories like "Battery Life Extender," "Battery Health Manager," or "Charging Thresholds." These settings might deliberately stop charging at a certain percentage (e.g., 80%) to prolong battery life. If enabled, disable them temporarily to see if charging resumes.
5.  **Apply and Check:** Click "Apply" and then "OK." Restart your laptop and check the battery status.

## Step 5: Check for BIOS/UEFI Updates and Settings

The BIOS/UEFI firmware manages the lowest level of hardware functions, including battery charging.

1.  **Access BIOS/UEFI:** Restart your laptop and repeatedly press the key specified by your manufacturer to enter BIOS/UEFI setup (commonly F2, F10, F12, DEL, or ESC). Consult your laptop's manual or manufacturer's website if you're unsure.
2.  **Look for Battery-Related Settings:** Navigate through the BIOS/UEFI menus. Look for sections related to "Power Management," "Battery," "Advanced," or "Configuration."
    *   **Battery Health Management:** Some laptops have features to optimize battery lifespan by not charging to 100% (e.g., "Adaptive Battery Optimizer," "Primary Battery Charge Configuration," "Battery Charge Threshold"). If such a setting is enabled, try disabling it or setting it to "Standard" or "Always charge to 100%" to see if it resolves the issue.
    *   **Firmware Update:** While in BIOS, check your current BIOS version. Visit your laptop manufacturer's support website to see if there's a newer BIOS/UEFI version available. Updating the firmware can sometimes resolve power management issues, but proceed with caution, as a failed BIOS update can brick your laptop. Only update if absolutely necessary and follow manufacturer instructions precisely.
3.  **Save and Exit:** Save any changes you made and exit BIOS/UEFI. Your laptop will restart. Check the battery status.

## Step 6: Generate a Battery Report for Diagnosis

If the above steps haven't worked, generating a detailed battery report can provide insights into your battery's health and historical performance, helping you determine if the battery itself is failing.

1.  **Open Command Prompt as Administrator:** Search for "cmd" in the Windows search bar. Right-click on "Command Prompt" and select "Run as administrator."
2.  **Run Battery Report Command:** Type the following command and press Enter:
    `powercfg /batteryreport`
3.  **Locate the Report:** The command will output a file path, usually in your user folder (`C:\Users\<YourUsername>\battery-report.html`). Copy this path and paste it into your web browser or File Explorer to open the report.
4.  **Interpret the Report:**
    *   **Installed Batteries:** Check "Design Capacity" versus "Full Charge Capacity." Over time, "Full Charge Capacity" will decrease. If it's significantly lower (e.g., less than 50-60%) than the "Design Capacity," your battery is likely degraded and may need replacement.
    *   **Battery Life Estimates:** This section provides an idea of how much charge your battery can hold compared to its original capacity.
    *   **Recent Usage:** This shows when the laptop was plugged in and charging, and when it was discharging. Look for anomalies where it was "Plugged In" but "Discharging" or "Not Charging" unexpectedly.
5.  **Next Steps:** If the battery report indicates a heavily degraded "Full Charge Capacity" or shows consistent errors, it strongly suggests a failing battery that requires professional repair or replacement.

### Common Mistakes

When troubleshooting the "Plugged In, Not Charging" issue, several common mistakes can lead to unnecessary frustration or expenses. One frequent oversight is immediately assuming the battery is dead and rushing to buy a new one without thoroughly checking the charger and power outlet. A faulty AC adapter or even a loose wall socket can mimic battery problems. Another mistake is skipping the physical battery power cycle (Step 2); this simple procedure often resolves software-hardware communication glitches that more complex steps might miss.

Users also sometimes neglect to check the laptop manufacturer's specific battery health software or BIOS settings (as mentioned in Step 4 and 5), which might be configured to intentionally stop charging at a certain percentage to extend battery life. Overlooking driver reinstallation in Device Manager (Step 3) is another pitfall, as corrupt drivers are a primary cause. Finally, many users overlook the comprehensive diagnostic `powercfg /batteryreport` (Step 6), which provides crucial data to confirm if the issue is indeed a failing battery or something else entirely.

### Prevention Tips

Preventing the "Plugged In, Not Charging" issue involves adopting good battery care habits and keeping your system optimized. Firstly, avoid completely draining your laptop battery frequently; deep discharges put more stress on the battery cells. Instead, try to keep the charge between 20% and 80% for optimal longevity. Modern laptops often have features in their BIOS or manufacturer software (like Lenovo Vantage, Dell Power Manager, HP Battery Health Manager) that allow you to set charging thresholds, which can limit the battery from charging to 100% when constantly plugged in, thus prolonging its lifespan.

Regularly ensure your Windows operating system and all device drivers, especially those under the "Batteries" category in Device Manager, are up to date. Manufacturer-provided updates often include fixes for power management and battery issues. Always use the original AC adapter that came with your laptop, or a certified, high-quality replacement with identical voltage and amperage specifications. Generic or incorrect chargers can lead to charging issues or even damage the battery. Lastly, keep your laptop's cooling system clean and free of dust. Excessive heat is detrimental to battery health and can accelerate degradation, potentially leading to charging problems.