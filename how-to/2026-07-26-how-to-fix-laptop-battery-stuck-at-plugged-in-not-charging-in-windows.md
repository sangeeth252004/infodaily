---
title: "How to Fix Laptop Battery Stuck at \"Plugged In, Not Charging\" in Windows"
date: "2026-07-26T11:18:22.379Z"
slug: "how-to-fix-laptop-battery-stuck-at-plugged-in-not-charging-in-windows"
type: "how-to"
description: "Comprehensive guide to troubleshoot and fix laptop battery stuck at \"Plugged In, Not Charging\" in Windows. Learn step-by-step solutions for driver, software, and hardware issues."
keywords: "laptop battery not charging, plugged in not charging, fix laptop battery, Windows battery issue, battery driver, ACPI battery, power cycle laptop, troubleshoot battery, Windows 11 battery, Windows 10 battery"
---

The "Plugged In, Not Charging" status is a frustrating yet common problem faced by many laptop users running Windows. This issue signifies that while your laptop recognizes that the AC adapter is connected and is drawing power to operate, it is not actively charging the internal battery. Your laptop might run perfectly fine when plugged in, but the battery percentage remains stagnant, often at a specific level like 0%, 60%, 80%, or any other value, without increasing.

When this problem occurs, you'll typically see the battery icon in your Windows taskbar displaying the "Plugged In, Not Charging" message upon hovering over it. The battery indicator light on your laptop, if present, might also behave unusually—either remaining off, showing a steady color, or blinking in a way that doesn't indicate active charging. This can lead to a significant loss of portability, as the laptop essentially becomes a desktop unit, tethered to a power outlet.

## Why It Happens

The root causes of a laptop battery being stuck at "Plugged In, Not Charging" can vary, ranging from simple software glitches to more complex hardware failures. Understanding these underlying reasons can guide you toward the most effective solution.

One of the most frequent culprits is a miscommunication between the Windows operating system and the battery's power management system, often due to corrupted or outdated power management drivers. Specifically, the "Microsoft ACPI-Compliant Control Method Battery" driver plays a crucial role in managing battery charging. If this driver becomes corrupted or fails to communicate correctly, Windows may incorrectly report the battery status or fail to initiate the charging process. Other causes include faulty AC adapters that provide insufficient power to charge the battery while simultaneously running the laptop, or even internal battery wear and degradation where the battery management system intentionally stops charging to prolong battery life (a feature, not a bug, in some newer laptops). Rarely, issues with the laptop's charging port, motherboard charging circuitry, or the battery itself might be the cause, requiring more advanced troubleshooting or hardware replacement.

## Step-by-Step Solution

### ## Step 1: Perform a Hard Reset / Power Cycle

Often, the simplest solution is the most effective. A hard reset can clear temporary software glitches, refresh power management settings, and re-establish communication between hardware components.

**For Laptops with Removable Batteries:**
1.  **Shut down** your laptop completely. Do not just put it to sleep.
2.  **Disconnect** the AC adapter from the laptop.
3.  **Remove** the battery from its compartment.
4.  **Press and hold** the power button on your laptop for 15-20 seconds. This drains any residual power from the internal components.
5.  **Reinsert** the battery firmly.
6.  **Reconnect** the AC adapter.
7.  **Power on** your laptop and check the battery status.

**For Laptops with Non-Removable Batteries:**
1.  **Shut down** your laptop completely.
2.  **Disconnect** the AC adapter from the laptop.
3.  **Press and hold** the power button on your laptop for 30-60 seconds. Since you cannot remove the battery, this longer duration helps drain the residual charge.
4.  **Reconnect** the AC adapter.
5.  **Power on** your laptop and check the battery status.

### ## Step 2: Reinstall Battery Drivers via Device Manager

Corrupted or outdated battery drivers are a very common cause of this issue. Reinstalling them forces Windows to re-detect and re-establish proper communication with the battery hardware.

1.  **Right-click** the **Start button** (Windows logo) and select **Device Manager**.
2.  In Device Manager, expand the **Batteries** category. You should see at least two entries: "Microsoft AC Adapter" and "Microsoft ACPI-Compliant Control Method Battery".
3.  **Right-click** on **Microsoft AC Adapter** and select **Uninstall device**. If prompted, **DO NOT** check the box that says "Delete the driver software for this device."
4.  **Right-click** on **Microsoft ACPI-Compliant Control Method Battery** and select **Uninstall device**. Again, **DO NOT** check the box for deleting driver software.
5.  After uninstalling both, **restart** your laptop.
6.  Upon reboot, Windows will automatically detect the uninstalled devices and reinstall the generic default drivers. Check the battery status once Windows has fully loaded.

### ## Step 3: Check AC Adapter, Power Outlet, and Charging Port

A faulty power supply or connection can prevent proper charging even if the laptop appears to be receiving power.

1.  **Inspect the AC Adapter:** Carefully examine your laptop's power brick and cable for any visible damage, such as frayed wires, cuts, kinks, or bent/broken pins at the connector. If any damage is found, replace the adapter with an original or certified compatible replacement. Ensure the adapter's wattage matches your laptop's requirements.
2.  **Test the Power Outlet:** Plug the AC adapter into a different wall outlet that you know is working. Sometimes, a faulty outlet or power strip can be the culprit.
3.  **Examine the Charging Port:** Look closely into your laptop's charging port for any debris, dust, or bent pins. Use a flashlight if necessary. Gently clean the port with compressed air or a non-conductive tool (like a toothpick, *gently*) if you find any obstructions.

### ## Step 4: Update Your Laptop's BIOS/UEFI Firmware

The BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface) firmware controls fundamental hardware operations, including power management. An outdated or buggy BIOS/UEFI version can sometimes cause charging issues.

1.  **Identify Your Laptop Manufacturer and Model:** This is crucial for finding the correct firmware.
2.  **Visit the Manufacturer's Support Website:** Go to the official support page for your laptop (e.g., Dell Support, HP Support, Lenovo Support, Asus Support).
3.  **Locate the Drivers/Support Section:** Search for your specific laptop model and navigate to the "Drivers" or "Firmware" download section.
4.  **Download the Latest BIOS/UEFI Update:** Follow the manufacturer's instructions *precisely* for downloading and installing the update. **Important:** Ensure your laptop is plugged into the AC adapter and has a sufficient battery charge (if it charges at all) before starting a BIOS update, as an interruption during this process can brick your motherboard.

### ## Step 5: Adjust Battery Charging Thresholds in Manufacturer Software

Many modern laptops include proprietary software designed to manage battery health and extend its lifespan. These tools often have features that can limit the battery from charging to 100% to reduce stress on the battery.

1.  **Check for Manufacturer Software:** Look for pre-installed applications like "Dell Power Manager," "Lenovo Vantage," "HP Support Assistant," or similar utilities from your laptop manufacturer.
2.  **Open the Application:** Launch the software and navigate to the battery or power management section.
3.  **Look for Settings:** Search for settings related to "Battery Health," "Charging Thresholds," "Custom Charge Limit," "Battery Saver Mode," or "Adaptive Battery."
4.  **Adjust or Disable Limits:** If you find a setting that limits charging (e.g., stops charging at 80% to preserve battery health), try disabling it or setting it to charge to 100%. Save your changes and reboot your laptop.

### ## Step 6: Run Windows Power Troubleshooter

Windows includes built-in troubleshooters that can automatically detect and resolve common system issues, including power problems.

1.  **Open Settings:** Press `Windows key + I` to open the Settings app.
2.  **Navigate to Troubleshoot:** Go to `System` > `Troubleshoot`.
3.  **Access Other Troubleshooters:** Click on `Other troubleshooters`.
4.  **Run the Power Troubleshooter:** Scroll down to find `Power` and click the `Run` button next to it.
5.  **Follow On-Screen Prompts:** Allow the troubleshooter to scan for issues and apply any recommended fixes.

### ## Step 7: Calibrate Your Laptop Battery (If Suspected Misreporting)

Sometimes, the battery's internal "fuel gauge" or the operating system's perception of the battery's charge level can become inaccurate. Battery calibration involves a full discharge and recharge cycle to reset this gauge.

1.  **Charge to 100%:** If your battery allows, charge it completely to 100% (or as high as it will go while plugged in).
2.  **Let it Discharge:** Unplug the AC adapter and use your laptop normally until the battery completely drains and the laptop automatically shuts down due to low power.
3.  **Leave it Off:** Leave the laptop powered off and unplugged for several hours (4-6 hours is usually sufficient) to ensure the battery cells fully rest.
4.  **Recharge Completely:** Plug in the AC adapter and let the laptop charge uninterrupted to 100% while it is still powered off or in sleep mode. Do not use it during this full recharge cycle.
5.  **Repeat (Optional):** For best results, some experts suggest repeating this entire process once more.

## Common Mistakes

When troubleshooting the "Plugged In, Not Charging" issue, users often make mistakes that can complicate the problem or lead to unnecessary expenses. One common mistake is immediately assuming a hardware failure, such as a dead battery or faulty motherboard, without first exhausting all software and driver-related troubleshooting steps. Many times, the issue is resolved by a simple driver reinstallation or a hard reset. Another pitfall is using a generic or underpowered AC adapter. While a generic adapter might power the laptop, it might not provide sufficient wattage or current to simultaneously run the system *and* charge the battery effectively, perpetuating the problem. Finally, users sometimes overlook manufacturer-specific battery management software, which may have inadvertently activated a setting that limits charging to preserve battery health, mistaking a feature for an error.

## Prevention Tips

Preventing the "Plugged In, Not Charging" issue involves adopting good power management habits and keeping your system healthy. Regularly updating your Windows operating system and device drivers, especially power management and chipset drivers, can prevent software conflicts that lead to charging issues. Always use the original AC adapter that came with your laptop, or a certified replacement from the manufacturer, ensuring it meets the correct voltage and wattage specifications. Avoid exposing your laptop to extreme temperatures, as both excessive heat and cold can degrade battery performance and lifespan. If your laptop manufacturer provides battery health management software (e.g., Dell Power Manager, Lenovo Vantage), utilize its features responsibly. Some tools allow you to set charging thresholds or enable "battery health" modes that prevent continuous 100% charging, which can prolong battery life, though it might appear as if the battery isn't fully charging. Finally, periodically cleaning your laptop's charging port with compressed air can prevent debris from obstructing the connection.