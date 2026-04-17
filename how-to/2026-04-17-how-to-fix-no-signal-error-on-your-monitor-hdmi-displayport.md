---
title: "How to Fix \"No Signal\" Error on Your Monitor (HDMI/DisplayPort)"
date: "2026-04-17T10:55:04.385Z"
slug: "how-to-fix-no-signal-error-on-your-monitor-hdmi-displayport"
type: "how-to"
description: "Troubleshooting guide to resolve the \"No Signal\" error on your monitor when using HDMI or DisplayPort connections, with step-by-step solutions."
keywords: "monitor no signal, HDMI no signal, DisplayPort no signal, no video signal, troubleshoot monitor, fix monitor error, computer display issue, graphics card connection, display cable"
---

## Problem Explanation

You've just powered on your computer, or perhaps switched inputs on your monitor, and instead of seeing your familiar desktop, your screen displays a stark message: "No Signal." This often appears in a small pop-up window or as plain text, sometimes accompanied by a blinking power indicator on the monitor itself. This error indicates that the monitor is not receiving any video data from your computer or other connected device. It's a common and frustrating issue that can stem from a variety of sources, preventing you from seeing anything on your display and thus rendering your computer unusable for visual interaction.

The "No Signal" error is a direct communication failure between your graphics source (computer, console, etc.) and your display device (monitor, TV). It means the monitor is powered on and capable of receiving a signal, but it's not detecting one from the active input. This can happen during initial setup, after a hardware change, or seemingly without any reason at all, leaving users staring at a blank screen and wondering what went wrong.

## Why It Happens

The "No Signal" error typically occurs because of an issue with the physical connection, incorrect input selection, or a problem with the graphics hardware or drivers. The most frequent culprits are loose or damaged display cables (HDMI or DisplayPort), which are the physical conduits for video information. If a cable is not fully seated in its port on either the monitor or the computer, or if it's frayed or internally damaged, it can prevent the signal from reaching the display.

Another common cause is selecting the wrong input source on the monitor. Many monitors have multiple input ports (e.g., HDMI 1, HDMI 2, DisplayPort). If your computer is connected via HDMI 1, but your monitor is set to display input from DisplayPort, you will receive a "No Signal" error. Less commonly, but still possible, is a problem with the graphics card itself, its drivers, or even the monitor's internal settings being corrupted, leading to an inability to process or display the incoming signal.

## Step-by-Step Solution

Let's systematically work through the potential causes of the "No Signal" error.

### ## Step 1: Verify Cable Connections

This is the most common fix. Ensure your HDMI or DisplayPort cable is firmly plugged into both your computer's graphics card output and your monitor's input port.

1.  **Disconnect:** Gently unplug the cable from both the computer and the monitor.
2.  **Inspect:** Visually inspect the cable for any visible damage, such as kinks, cuts, or bent pins on the connectors. If you see damage, try a different cable.
3.  **Reconnect:** Firmly reinsert the cable into the corresponding ports. You should feel a slight click or resistance, ensuring it's seated correctly. Try both ends. If your graphics card has multiple outputs, try a different one.

### ## Step 2: Check Monitor Input Source

Your monitor needs to be set to the correct input that your device is connected to.

1.  **Locate Input Button:** Find the physical buttons on your monitor (usually on the bottom, side, or back). Look for a button labeled "Input," "Source," or an icon resembling an arrow going into a box.
2.  **Cycle Through Inputs:** Press this button repeatedly. Your monitor will cycle through its available input sources (e.g., HDMI 1, HDMI 2, DisplayPort, VGA).
3.  **Wait for Signal:** After each selection, wait 5-10 seconds to see if the "No Signal" message disappears and your display appears. Continue cycling until you find the correct input.

### ## Step 3: Restart Your Computer and Monitor

A simple restart can resolve temporary glitches.

1.  **Power Down:** Turn off your computer completely. If it's a laptop, shut it down via the operating system. For a desktop, hold the power button for a few seconds if a normal shutdown isn't possible.
2.  **Unplug Monitor:** Turn off your monitor and unplug its power cable from the wall outlet.
3.  **Wait:** Wait for about 30-60 seconds to allow components to fully discharge.
4.  **Reconnect and Power On:** Plug the monitor back in and turn it on. Then, power on your computer.

### ## Step 4: Test with a Different Cable

Cables, especially older or lower-quality ones, can fail.

1.  **Obtain Another Cable:** If possible, borrow a known working HDMI or DisplayPort cable from a friend or another device.
2.  **Replace:** Use this new cable to connect your computer to the monitor, ensuring both ends are securely seated.
3.  **Test:** Restart your computer to see if the "No Signal" error is resolved.

### ## Step 5: Test with a Different Monitor or Device

This helps isolate whether the problem lies with the computer or the monitor.

1.  **Connect to Different Monitor:** If you have another monitor or a TV with an HDMI/DisplayPort input, connect your computer to it using the same cable. If you get a signal on the other display, your original monitor is likely the issue.
2.  **Connect Different Device:** Alternatively, connect a different device (like a gaming console or a Blu-ray player) to your original monitor using the same HDMI/DisplayPort cable. If the device displays correctly, your computer might be the source of the problem.

### ## Step 6: Reseat Your Graphics Card (Desktop PCs)

If you have a desktop computer and have recently moved it or suspect a hardware issue, the graphics card might be loose.

**WARNING:** This step involves opening your computer and requires caution. Ensure you are grounded to avoid electrostatic discharge.

1.  **Power Off and Unplug:** Shut down your computer completely and unplug the power cord from the wall.
2.  **Open Case:** Open your computer's case. Consult your computer's manual if unsure how.
3.  **Locate Graphics Card:** Identify your graphics card, which is typically a large card plugged into a long slot (PCIe slot) on the motherboard.
4.  **Release Latch:** Most PCIe slots have a small plastic latch at the end that secures the card. Gently press this latch to release the card.
5.  **Remove Card:** Carefully pull the graphics card straight up and out of the slot.
6.  **Reseat Card:** Align the graphics card with the PCIe slot and firmly press it down until it clicks into place and the latch re-engages.
7.  **Close Case and Test:** Reassemble your computer, plug it in, and try powering it on.

### ## Step 7: Check Display Settings in Safe Mode (If Possible)

If the issue started after a driver update or Windows update, you might need to access Safe Mode to adjust settings.

1.  **Enter Safe Mode:** The method varies by Windows version. For Windows 10/11, after a few failed boot attempts, Windows should automatically enter the Advanced Startup options. From there, navigate to **Troubleshoot > Advanced options > Startup Settings > Restart**. After restarting, press **4** or **F4** to boot into Safe Mode. If you have a graphics card, you might need to select **5** or **F5** for Safe Mode with Networking to access drivers.
2.  **Adjust Display Resolution:** Once in Safe Mode, the display will likely be at a low resolution. Right-click on the desktop and select **Display settings**.
3.  **Change Resolution/Refresh Rate:** Try setting a lower resolution and a standard refresh rate (e.g., 60Hz).
4.  **Update/Rollback Drivers:** If you suspect driver issues, go to Device Manager (type "Device Manager" in the Windows search bar). Expand "Display adapters," right-click your graphics card, and select "Update driver" or "Uninstall device" (if uninstalling, check the box to delete driver software if prompted, then restart; Windows will attempt to reinstall a basic driver).

## Common Mistakes

A frequent mistake is assuming the cable is fine without testing it with another device or trying a known good cable. People often blame the monitor or the computer when a simple, faulty cable is the culprit. Another common error is not verifying the correct input source on the monitor; users might be connected to HDMI 1 but the monitor is set to look for a signal on DisplayPort. Overlooking the simple act of physically unplugging and replugging cables, ensuring they are seated with a firm connection, is also a very common oversight. For desktop users, attempting to reseat the graphics card without properly grounding themselves can lead to component damage.

## Prevention Tips

To minimize the chances of encountering the "No Signal" error, invest in high-quality, certified HDMI or DisplayPort cables. Avoid bending or straining cables excessively, and ensure they are not running across high-traffic areas where they can be accidentally tugged. Regularly check that your cables are securely connected to both your computer and monitor, especially if you move your setup. Keep your graphics card drivers updated through official channels (Nvidia, AMD, Intel websites) to avoid compatibility issues. Periodically, performing a clean boot of your operating system can also help identify software conflicts that might indirectly affect display output.