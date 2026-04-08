---
title: "Laptop Battery Not Charging When Plugged In: A Comprehensive Troubleshooting Guide"
date: "2026-04-08T10:55:07.834Z"
slug: "laptop-battery-not-charging-when-plugged-in-a-comprehensive-troubleshooting-guide"
type: "how-to"
description: "Learn how to diagnose and fix your laptop battery not charging even when plugged in with this expert technical guide. Covers software, hardware, and driver issues."
keywords: "laptop battery not charging, plugged in not charging, laptop not detecting charger, battery error, charging issues, power adapter problem, battery driver, device manager, power options"
---

## Problem Explanation

The issue of a laptop battery not charging despite being plugged into a power source is a common and frustrating one. Users typically observe that their laptop displays a connection to the power adapter, often indicated by an icon in the system tray (e.g., a plug within the battery symbol), but the battery percentage remains static or even slowly decreases. The system might also display a message such as "Plugged in, not charging," "Low battery," or a specific battery error code within the operating system. This means that while the laptop is receiving power to operate, the battery itself is not receiving any charge to replenish its power reserves.

This problem effectively renders the primary benefit of a laptop—its portability—useless if the battery cannot hold or accept a charge. Users might find their laptop shutting down unexpectedly as soon as the power adapter is disconnected, or they may be forced to keep the device tethered to a wall outlet indefinitely. The situation can escalate from a minor inconvenience to a critical operational roadblock, impacting productivity and the overall user experience.

## Why It Happens

Several factors can contribute to a laptop battery failing to charge when plugged in. At a fundamental level, the problem often stems from a breakdown in the communication or power delivery pathway between the AC adapter, the laptop's charging circuitry, and the battery itself. This can be due to a faulty AC adapter that is not delivering the correct voltage or amperage, a damaged charging port on the laptop, or issues with the battery's internal circuitry.

Software-related issues can also play a significant role. The operating system's power management settings, outdated or corrupted battery drivers, or even incorrect system firmware (BIOS/UEFI) settings can misinterpret the charging status or actively prevent the battery from charging. For instance, some laptops have intelligent charging systems that may suspend charging above a certain percentage to prolong battery lifespan, but a glitch in this system could cause it to permanently disable charging. Furthermore, the battery's age and condition are crucial factors; older batteries naturally degrade and may eventually reach a point where they can no longer accept a charge.

## Step-by-Step Solution

### ## Step 1: Verify the Power Source and Connection

Before delving into more complex solutions, it's crucial to rule out the simplest causes.

1.  **Inspect the AC Adapter:** Check the power brick for any visible damage, such as frayed wires, bent pins on the connector, or signs of overheating.
2.  **Check the Wall Outlet:** Ensure the power outlet you are using is functional by plugging in another device. Try a different outlet if possible.
3.  **Secure the Connection:** Firmly plug the AC adapter into both the wall outlet and the laptop's charging port. Ensure there are no loose connections.
4.  **Inspect the Laptop Charging Port:** Look for any debris, dust, or bent pins inside the laptop's charging port. Carefully remove any obstructions using a non-metallic tool like a wooden toothpick or compressed air. *Caution: Do not use metal objects that could cause a short circuit.*
5.  **Try a Different Adapter (If Available):** If you have access to a compatible AC adapter for your laptop model, try using it. This is the most effective way to determine if the original adapter is faulty.

### ## Step 2: Perform a Power Cycle and Battery Reset

A simple power cycle can often resolve temporary software glitches affecting power management.

1.  **Disconnect Power:** Unplug the AC adapter from the laptop.
2.  **Remove the Battery (If Removable):** If your laptop has a user-removable battery, carefully eject it from its compartment.
3.  **Drain Residual Power:** With the AC adapter unplugged and the battery removed (if applicable), press and hold the laptop's power button for 15-30 seconds. This discharges any remaining power in the system.
4.  **Reinsert Battery:** If you removed the battery, reinsert it securely.
5.  **Reconnect Power:** Plug the AC adapter back into the laptop and the wall outlet.
6.  **Power On:** Turn on your laptop and check if the battery is charging.

### ## Step 3: Check Battery Status in Windows

Windows provides tools to check the battery's health and charging status.

1.  **Access Power Options:**
    *   Right-click the battery icon in the system tray (usually bottom-right corner of the screen).
    *   Select "Power Options."
2.  **View Battery Status:** The Power Options window will show your current power plan and may indicate battery status.
3.  **Access Advanced Power Settings:**
    *   Click "Change plan settings" for your active power plan.
    *   Click "Change advanced power settings."
4.  **Examine Battery Settings:**
    *   Expand the "Battery" section.
    *   Look for "On battery" and "Plugged in" settings related to critical battery action and low battery level. While these don't directly fix charging, they can sometimes reveal misconfigurations.
    *   *Crucially, check if the "Battery status" indicator within the system tray or Power Options shows "Plugged in, not charging" or similar.*

### ## Step 4: Update or Reinstall Battery Drivers via Device Manager

Corrupted or outdated battery drivers are a frequent cause of charging issues.

1.  **Open Device Manager:**
    *   Press `Windows Key + X` and select "Device Manager" from the menu.
    *   Alternatively, search for "Device Manager" in the Windows search bar and open it.
2.  **Locate Batteries:** Expand the "Batteries" section in Device Manager. You should see at least two items: "Microsoft AC Adapter" and "Microsoft ACPI-Compliant Control Method Battery."
3.  **Update Drivers:**
    *   Right-click on "Microsoft ACPI-Compliant Control Method Battery."
    *   Select "Update driver."
    *   Choose "Search automatically for drivers." Windows will attempt to find and install the latest driver.
4.  **Uninstall and Reinstall Drivers:** If updating doesn't work, or if you suspect a corruption:
    *   Right-click on "Microsoft ACPI-Compliant Control Method Battery."
    *   Select "Uninstall device."
    *   **Do NOT check the box that says "Delete the driver software for this device" unless prompted and you're certain about its implications.**
    *   After uninstalling, click "Action" in the Device Manager menu bar and select "Scan for hardware changes." Windows should automatically detect the battery and reinstall the driver.
    *   Repeat the uninstall/reinstall process for "Microsoft AC Adapter" if issues persist.
5.  **Restart Your Laptop:** After updating or reinstalling drivers, restart your laptop.

### ## Step 5: Check for BIOS/UEFI Updates

The BIOS/UEFI is the firmware that controls your hardware at a fundamental level, including power management. An outdated BIOS/UEFI can sometimes cause charging problems.

1.  **Identify Your Laptop Model and BIOS Version:**
    *   Press `Windows Key + R`, type `msinfo32`, and press Enter.
    *   In the System Information window, find "System Model" and "BIOS Version/Date."
2.  **Visit Manufacturer's Website:** Go to the support or downloads section of your laptop manufacturer's official website (e.g., Dell, HP, Lenovo, Asus).
3.  **Search for Updates:** Enter your laptop's model number or serial number to find available driver and BIOS updates.
4.  **Download BIOS Update:** Locate the latest BIOS or UEFI update for your specific model. **Read the instructions carefully** before proceeding, as BIOS updates require specific procedures and can be risky if interrupted.
5.  **Install BIOS Update:** Follow the manufacturer's instructions precisely. This usually involves downloading an executable file or a file to be placed on a USB drive, and then booting into the BIOS/UEFI utility to perform the update.
    *   **Ensure your laptop is connected to AC power and do NOT interrupt the process.**
6.  **Restart and Test:** After the BIOS update is complete, restart your laptop and check if the battery is charging.

### ## Step 6: Check Battery Health Report in Windows

Windows can generate a report on your battery's health.

1.  **Open Command Prompt as Administrator:**
    *   Search for "cmd" in the Windows search bar.
    *   Right-click on "Command Prompt" and select "Run as administrator."
2.  **Generate Battery Report:**
    *   Type the following command and press Enter: `powercfg /batteryreport`
    *   This command will save a detailed battery report to an HTML file. The default location is usually `C:\Windows\system32\battery-report.html` or within your user profile directory. The command prompt will usually display the exact path.
3.  **Open and Review the Report:**
    *   Navigate to the saved file location using File Explorer and open the HTML file in your web browser.
    *   Look for sections like "Installed batteries," "Cycle Count," "Design Capacity," and "Full Charge Capacity."
    *   Compare the "Full Charge Capacity" to the "Design Capacity." A significant difference indicates battery wear. If the "Full Charge Capacity" is drastically lower than the "Design Capacity," the battery may be failing and require replacement.

## Common Mistakes

One common mistake is immediately assuming the battery is dead without properly testing the AC adapter and charging port. Users often overlook the simple, external factors. Another frequent error is forcing the uninstall of drivers without understanding their role or failing to restart the system, which is crucial for driver reinstallation. Many users also attempt BIOS updates without reading the manufacturer's specific instructions, which can lead to system instability or failure. Finally, attempting to physically repair a battery or charging port without adequate technical knowledge is dangerous and can cause further damage.

## Prevention Tips

To prevent your laptop battery from developing charging issues, it's best to follow good battery management practices. Avoid consistently draining your battery to 0% or keeping it plugged in 24/7 at 100% charge, as extreme states can degrade battery health over time. Many modern laptops offer battery health management software that allows you to set charging limits (e.g., stop charging at 80%) to prolong battery lifespan. Regularly clean your laptop's charging port to prevent dust buildup, and always use the original or a certified compatible AC adapter. Keeping your operating system and drivers updated also helps prevent software-related charging problems.