---
title: "How to Fix \"Bluetooth Device Not Found\" Error on Windows 11"
date: "2026-05-07T02:44:51.593Z"
slug: "how-to-fix-bluetooth-device-not-found-error-on-windows-11"
type: "how-to"
description: "Troubleshoot and resolve the common \"Bluetooth Device Not Found\" error on Windows 11 with this comprehensive, step-by-step guide. Fix driver issues, service problems, and more."
keywords: "Windows 11 Bluetooth not found, fix Bluetooth error, Bluetooth not working Windows 11, Bluetooth driver Windows 11, Bluetooth service Windows 11, troubleshoot Bluetooth, device not detected Windows 11"
---

The frustration of wanting to connect your wireless headphones, mouse, or keyboard only to be met with a cryptic error message can be significant. On Windows 11, a common hurdle users encounter is the "Bluetooth device not found" error. This message typically appears when you attempt to pair a new Bluetooth device or when an already paired device suddenly becomes unresponsive and disappears from your system's Bluetooth list. You might also notice that the Bluetooth toggle in Windows Settings is grayed out or missing entirely, preventing any attempt at connection. This indicates that your Windows 11 system is unable to detect or communicate with any Bluetooth hardware, rendering all Bluetooth functionality inoperable.

This error can stem from a variety of underlying issues, ranging from simple software glitches to more complex hardware or driver-related problems. Often, the Bluetooth service on your Windows 11 machine might not be running, or its configuration could be corrupted. Driver issues are also a very frequent culprit; outdated, corrupted, or incompatible Bluetooth drivers can prevent Windows from recognizing and managing your Bluetooth adapter. In some cases, the problem might be as straightforward as a temporary software conflict or a need for a simple system restart. Less commonly, but still possible, is a hardware failure of the Bluetooth adapter itself, though this is usually a last resort to consider.

### Step 1: Restart Your Bluetooth Device and PC

A simple restart can resolve many temporary software glitches that might be preventing your Bluetooth device from being found.

1.  **Restart your Bluetooth device:** Turn off your Bluetooth peripheral (e.g., headphones, mouse) and then turn it back on. Ensure it is in pairing mode if you are trying to connect it for the first time.
2.  **Restart your Windows 11 PC:**
    *   Click the **Start** button.
    *   Click the **Power** icon.
    *   Select **Restart**.

After both devices have restarted, try to find and connect your Bluetooth device again through **Settings > Bluetooth & devices**.

### Step 2: Ensure Bluetooth is Enabled in Windows Settings

It might sound obvious, but it's crucial to verify that Bluetooth is actually turned on within Windows 11.

1.  Click the **Start** button and select **Settings**.
2.  In the left-hand menu, click on **Bluetooth & devices**.
3.  Ensure the **Bluetooth** toggle switch at the top is turned **On**. If it's already on, try toggling it off and then on again.

If the toggle is missing or grayed out, this suggests a more significant issue with your Bluetooth adapter or its drivers, and you should proceed to the next steps.

### Step 3: Run the Bluetooth Troubleshooter

Windows 11 includes a built-in troubleshooter that can automatically detect and fix common Bluetooth problems.

1.  Click the **Start** button and select **Settings**.
2.  In the left-hand menu, click on **System**.
3.  Scroll down and click on **Troubleshoot**.
4.  Click on **Other troubleshooters**.
5.  Find **Bluetooth** in the list and click **Run**.
6.  Follow the on-screen prompts. The troubleshooter will attempt to identify and fix any issues it finds.

### Step 4: Check and Update Bluetooth Drivers in Device Manager

Outdated or corrupted Bluetooth drivers are a primary cause of the "device not found" error.

1.  Right-click the **Start** button and select **Device Manager**.
2.  Expand the **Bluetooth** category. If you don't see a Bluetooth category, your system may not have Bluetooth hardware, or Windows might not be detecting it at all. If you see it, right-click on your Bluetooth adapter (it might be named something like "Intel(R) Wireless Bluetooth(R)" or have "Bluetooth" in its name).
3.  Select **Update driver**.
4.  Choose **Search automatically for drivers**. Windows will attempt to find and install the latest driver.
5.  If Windows cannot find a driver, try selecting **Browse my computer for drivers** > **Let me pick from a list of available drivers on my computer**. Look for a generic Bluetooth adapter driver or an older driver that might work.
6.  **If updating doesn't work, try uninstalling and reinstalling:**
    *   In Device Manager, right-click your Bluetooth adapter and select **Uninstall device**.
    *   Check the box that says "Attempt to remove the driver for this device" if available.
    *   Click **Uninstall**.
    *   Restart your PC. Windows will attempt to automatically reinstall a generic Bluetooth driver upon startup.
7.  **Manually download drivers:** If automatic methods fail, visit your PC manufacturer's website (e.g., Dell, HP, Lenovo, Microsoft Surface) or the website of your Bluetooth adapter's manufacturer (e.g., Intel, Realtek). Search for your specific PC model or Bluetooth adapter model and download the latest Windows 11 Bluetooth drivers. Then, repeat steps 1-3 and select **Browse my computer for drivers**, navigating to the downloaded driver files.

### Step 5: Verify Bluetooth Services are Running

The Bluetooth Support Service needs to be active for Bluetooth to function correctly.

1.  Press **Windows Key + R** to open the Run dialog box.
2.  Type `services.msc` and press **Enter** or click **OK**.
3.  In the Services window, locate the following services:
    *   **Bluetooth Audio Gateway Service**
    *   **Bluetooth Support Service**
    *   **Bluetooth User Support Service**
4.  For each of these services, check the **Status** column. If it says "Running," right-click on the service and select **Restart**. If it does not say "Running," right-click on the service and select **Start**.
5.  Ensure the **Startup type** for each of these services is set to **Automatic**. If not, double-click the service, change the **Startup type** to **Automatic**, and click **Apply** and **OK**.

### Step 6: Check for Windows Updates

Sometimes, the "Bluetooth device not found" error can be a known issue that Microsoft has addressed in a Windows update.

1.  Click the **Start** button and select **Settings**.
2.  In the left-hand menu, click on **Windows Update**.
3.  Click **Check for updates**.
4.  If any updates are found, download and install them, then restart your PC.

### Step 7: Remove and Re-pair Your Bluetooth Device

If you were previously able to connect the device, it might have become unpaired or corrupted in the system's paired devices list.

1.  Click the **Start** button and select **Settings**.
2.  Click on **Bluetooth & devices**.
3.  Under "Devices," find the Bluetooth device that is not being found or is not working.
4.  Click the three dots next to the device name and select **Remove device**.
5.  Confirm the removal.
6.  Restart your PC and your Bluetooth device, and then try to pair them again from scratch by putting the device in pairing mode and searching for it in **Settings > Bluetooth & devices > Add device**.

### Common Mistakes

One of the most common mistakes users make is forgetting to put their Bluetooth device into **pairing mode** when attempting to connect it for the first time. Each device has a specific way to enter this mode (often by holding down a button). Simply turning the device on is usually not enough. Another frequent error is assuming the problem is solely with the PC when the Bluetooth device itself might be malfunctioning, out of battery, or too far away. Users also sometimes skip the basic troubleshooting steps like restarting their PC and the Bluetooth device, jumping straight to driver updates which can be more time-consuming. Finally, it's a mistake to exclusively rely on automatic driver updates; often, manually downloading drivers from the manufacturer's website is necessary for optimal compatibility.

### Prevention Tips

To prevent the "Bluetooth device not found" error from recurring, maintain regular **system and driver updates**. Keep your Windows 11 operating system up to date, as these updates often include fixes for hardware compatibility issues. Pay attention to driver updates for your Bluetooth adapter, especially if you have a separate adapter or your PC manufacturer releases specific Bluetooth driver packages. Ensure your Bluetooth devices are kept charged and within a reasonable range of your PC to maintain a stable connection. Regularly check the **Bluetooth service status** in `services.msc` to ensure they are set to start automatically and are running. Finally, avoid installing generic or unverified third-party driver update software, as these can sometimes install incorrect or malicious drivers, leading to more problems than they solve.