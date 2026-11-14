---
title: "How to Resolve Laptop Battery Showing 'Plugged In, Not Charging' on Windows"
date: "2026-11-14T19:42:12.064Z"
slug: "how-to-resolve-laptop-battery-showing-plugged-in-not-charging-on-windows"
type: "how-to"
description: "Troubleshoot and fix the common \"Plugged In, Not Charging\" error on your Windows laptop with this comprehensive, step-by-step guide."
keywords: "plugged in not charging, laptop battery, windows error, battery fix, charging issue, power adapter, device manager, battery driver, power settings, calibration, adapter check"
---

### Problem Explanation

You've connected your laptop to its power adapter, expecting the familiar charging indicator to appear. Instead, you notice that while the system acknowledges the power source – often displaying a message like "Plugged In, Not Charging" or a battery icon with a red 'X' – the battery percentage remains stagnant or even slowly depletes. This is a frustrating and common predicament, leaving your laptop tethered to an outlet without actually replenishing its power reserves. The inability to charge the battery renders your laptop less portable and can cause significant disruption to your workflow or daily use.

### Why It Happens

The "Plugged In, Not Charging" error on Windows can stem from several underlying causes, ranging from simple software glitches to more serious hardware issues. Often, the problem lies within the operating system's power management settings or drivers. A corrupted battery driver, an outdated BIOS, or incorrect power plan configurations can all interfere with the charging process. Furthermore, Windows' built-in battery management features might be actively preventing charging if it detects a potential issue or if the battery is considered to be nearing the end of its lifespan, as a protective measure. In some cases, it could be a sign of a failing battery or a faulty AC adapter.

### Step-by-Step Solution

Here's a comprehensive approach to diagnose and resolve the "Plugged In, Not Charging" issue on your Windows laptop:

## Step 1: Basic Checks - The Obvious First Steps

Before delving into complex solutions, it's crucial to rule out the simplest explanations.

*   **Inspect the AC Adapter and Cable:** Ensure the power adapter is securely plugged into both the wall outlet and your laptop. Check the adapter cable for any visible signs of damage, fraying, or kinks. Try a different wall outlet to eliminate the possibility of a faulty socket.
*   **Clean the Charging Port:** Dust and debris can accumulate in your laptop's charging port, preventing a proper connection. Gently clean the port using a can of compressed air or a clean, dry cotton swab. Avoid inserting anything metallic into the port.
*   **Try a Different Charger (if available):** If you have access to an identical or compatible AC adapter, test it with your laptop. This will help determine if the issue lies with the adapter itself.

## Step 2: Restart Your Laptop

A simple restart can often resolve temporary software glitches that might be preventing the battery from charging.

*   **Perform a Full Shutdown:** Click the Start button, select Power, and then choose "Shut down." Wait for the laptop to completely power off.
*   **Power On:** Press the power button to boot your laptop back up. Once Windows has loaded, check if the battery is now charging.

## Step 3: Update or Reinstall Battery Drivers via Device Manager

Corrupted or outdated battery drivers are a very common culprit for this issue.

*   **Open Device Manager:** Press the **Windows key + X** and select "Device Manager" from the menu.
*   **Locate Batteries:** In Device Manager, expand the "Batteries" category. You should see two items listed: "Microsoft AC Adapter" and "Microsoft ACPI-Compliant Control Method Battery."
*   **Uninstall the Battery Driver:** Right-click on "Microsoft ACPI-Compliant Control Method Battery" and select "Uninstall device." A confirmation prompt may appear; if so, click "Uninstall."
*   **Scan for Hardware Changes:** After uninstalling, click on the "Action" menu in Device Manager and select "Scan for hardware changes." Windows will automatically detect the missing battery driver and reinstall it.
*   **Restart Your Laptop:** Once the driver is reinstalled, restart your laptop. Plug in the AC adapter and see if the battery begins to charge.

## Step 4: Adjust Power Management Settings

Sometimes, specific power plan settings can interfere with battery charging.

*   **Open Power Options:** Search for "Power Options" in the Windows search bar and open it.
*   **Change Plan Settings:** For your currently selected power plan, click "Change plan settings."
*   **Change Advanced Power Settings:** Click "Change advanced power settings."
*   **Check Battery Settings:** In the advanced settings window, expand the "Battery" section. Look for options related to "Critical battery action" and "Low battery action." While these typically don't *stop* charging, it's good to ensure they are set reasonably. More importantly, check if there are any specific "Plugged in" settings that might be limiting charge.
*   **Restore Default Settings:** If you're unsure about any specific setting, you can always click "Restore plan defaults" for the current plan.

## Step 5: Update Your BIOS/UEFI

An outdated BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface) can sometimes cause hardware compatibility and power management issues, including battery charging problems.

*   **Identify Your Laptop Model:** Find your laptop's exact model number (usually on a sticker on the bottom of the device).
*   **Visit Manufacturer's Website:** Go to the support section of your laptop manufacturer's official website (e.g., Dell, HP, Lenovo, Asus).
*   **Download the Latest BIOS Update:** Search for BIOS/UEFI updates for your specific model. Download the latest version. **Crucially, follow the manufacturer's instructions for updating the BIOS precisely.** This process can be risky if not done correctly; ensure your laptop is plugged in and will not be interrupted during the update.
*   **Install the Update:** Run the downloaded BIOS update utility and follow the on-screen prompts. The system will likely restart multiple times.

## Step 6: Calibrate Your Laptop Battery

Battery calibration helps Windows accurately report the battery's charge level and can sometimes resolve charging inconsistencies.

*   **Charge to 100%:** Plug in your laptop and let it charge until it reaches 100%. Leave it plugged in for an additional hour or two after it shows 100%.
*   **Drain the Battery:** Unplug the AC adapter and use your laptop normally until it drains completely and shuts down automatically.
*   **Leave it Off:** Leave the laptop powered off for a few hours.
*   **Charge Back to 100%:** Plug the AC adapter back in and let the battery charge to 100% without interruption.
*   **Restart:** Once fully charged, restart your laptop.

## Step 7: Check for Windows Updates and Manufacturer Software

Ensure your operating system and any manufacturer-specific utilities are up-to-date.

*   **Windows Updates:** Go to Settings > Update & Security > Windows Update and click "Check for updates." Install any available updates.
*   **Manufacturer Software:** Many laptop manufacturers provide their own utility software (e.g., Dell Power Manager, HP Support Assistant, Lenovo Vantage) that can manage battery health and power settings. Check for updates to these applications through their respective interfaces or your manufacturer's website.

### Common Mistakes

A frequent error users make is assuming the problem is solely hardware-related and immediately jumping to buying a new battery or adapter without proper diagnosis. Another common oversight is not performing a full shutdown and restart, as temporary software glitches are often resolved by this simple step. Some users may also be hesitant to update their BIOS due to perceived complexity or risk, but an outdated BIOS can indeed be the root cause. Finally, when uninstalling drivers in Device Manager, some may forget to scan for hardware changes or restart their computer, hindering the driver's reinstallation.

### Prevention Tips

To minimize the chances of encountering the "Plugged In, Not Charging" issue in the future, consider these best practices. Regularly updating your Windows operating system and all drivers, especially those related to power management, is crucial. Many manufacturers offer tools that can help monitor battery health; utilize these to stay informed about your battery's condition. Avoid consistently leaving your laptop plugged in at 100% for extended periods, as this can sometimes contribute to battery degradation over time. Instead, consider using any battery charge limiting software your manufacturer provides, if available, to cap the charge at 80%. Finally, protect your laptop from extreme temperatures, as both excessive heat and cold can negatively impact battery performance and longevity.