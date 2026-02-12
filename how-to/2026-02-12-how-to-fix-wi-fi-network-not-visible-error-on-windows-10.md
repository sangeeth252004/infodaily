---
title: "How to Fix \"Wi-Fi Network Not Visible\" Error on Windows 10"
date: "2026-02-12T02:05:42.710Z"
slug: "how-to-fix-wi-fi-network-not-visible-error-on-windows-10"
type: "how-to"
description: "Troubleshoot and resolve the \"Wi-Fi network not visible\" error on Windows 10 with this comprehensive technical guide. Learn common causes and step-by-step solutions."
keywords: "Windows 10 Wi-Fi not visible, Wi-Fi list empty, cannot see Wi-Fi network, fix Wi-Fi connection, network adapter issues, driver update, troubleshoot Wi-Fi, Windows network problems"
---

# How to Fix "Wi-Fi Network Not Visible" Error on Windows 10

## Problem Explanation

You're trying to connect to your wireless network on your Windows 10 computer, but the Wi-Fi icon in the system tray either shows no available networks or displays an empty list altogether. You click on the Wi-Fi icon, expecting to see a list of nearby SSIDs (network names), but instead, nothing appears. This is a common and frustrating issue, as it prevents you from accessing the internet wirelessly. The problem can manifest as the Wi-Fi icon being present but displaying a globe symbol (indicating no connection or no networks found) or the icon itself being absent, with only a wired network connection option available.

## Why It Happens

The "Wi-Fi network not visible" error on Windows 10 typically stems from issues related to your computer's wireless network adapter. This could be a hardware problem, such as the adapter being disabled or faulty, or a software problem, most commonly due to outdated, corrupted, or incorrectly configured network drivers. Other potential causes include interference from other electronic devices, the Wi-Fi network itself being hidden (though this is less common for a complete inability to see *any* networks), or specific Windows updates that may have introduced compatibility conflicts. In some rare cases, the issue might be with the router itself, but if other devices can see and connect to the network, the problem is likely on your Windows 10 machine.

## Step-by-Step Solution

Follow these steps systematically to diagnose and resolve the "Wi-Fi network not visible" error.

### ## Step 1: Verify Wi-Fi is Enabled and Airplane Mode is Off

The simplest solution is often overlooked. Ensure that Wi-Fi is actually enabled on your laptop and that you are not in Airplane Mode.

1.  Click the **Wi-Fi icon** in the system tray (usually near the clock on the bottom-right of your screen).
2.  Look for a **Wi-Fi toggle button**. Ensure it is turned **On**. If it's off, click it to enable.
3.  Check if **Airplane mode** is enabled. If it is, click the **Airplane mode button** to turn it off. Airplane mode disables all wireless communications.

### ## Step 2: Restart Your Computer and Router

A simple restart can resolve many temporary glitches that might be preventing your computer from detecting Wi-Fi networks.

1.  **Restart your computer:** Click the **Start menu**, then **Power**, and select **Restart**.
2.  **Restart your router and modem:**
    *   Unplug the power cord from both your router and modem.
    *   Wait for at least 30 seconds.
    *   Plug the modem back in first and wait for its indicator lights to stabilize (usually 1-2 minutes).
    *   Plug the router back in and wait for its indicator lights to stabilize (usually 1-2 minutes).
3.  Once both devices have fully restarted, check if your Wi-Fi networks are now visible on your Windows 10 computer.

### ## Step 3: Troubleshoot Network Adapters in Device Manager

Issues with the network adapter's driver are a very common cause. We'll check its status and try to re-enable it.

1.  Press the **Windows key + X** to open the Power User menu.
2.  Select **Device Manager**.
3.  Expand the **Network adapters** section by clicking the arrow next to it.
4.  Locate your **Wireless Network Adapter**. It will typically have "Wireless," "Wi-Fi," or "802.11" in its name (e.g., "Intel(R) Dual Band Wireless-AC 8265").
5.  **Check for a down arrow icon:** If you see a small down arrow on the adapter's icon, it means the adapter is disabled. Right-click on it and select **Enable device**.
6.  **Check for a yellow exclamation mark:** If there's a yellow exclamation mark, it indicates a driver problem. Proceed to Step 4.
7.  If there are no icons indicating issues, try right-clicking the adapter and selecting **Uninstall device**. **Crucially, do NOT check the box that says "Delete the driver software for this device."** Click **Uninstall**.
8.  After uninstalling, restart your computer. Windows should automatically detect the network adapter and reinstall a default driver upon reboot.

### ## Step 4: Update or Reinstall Network Adapter Drivers

Outdated or corrupted drivers are a prime suspect for Wi-Fi issues.

1.  Press **Windows key + X** and select **Device Manager**.
2.  Expand **Network adapters**.
3.  Right-click on your **Wireless Network Adapter** and select **Update driver**.
4.  Choose **Search automatically for drivers**. Windows will attempt to find and install the latest driver online.
5.  If Windows reports that the best drivers are already installed, you may need to manually download drivers from the manufacturer's website.
    *   Identify your laptop's manufacturer and model number, or the specific Wi-Fi adapter model.
    *   Visit the manufacturer's support website (e.g., Dell, HP, Lenovo, or Intel, Realtek for the adapter itself).
    *   Navigate to the drivers or support section and download the latest Wi-Fi/Wireless LAN driver for your specific model and Windows 10 version (32-bit or 64-bit).
    *   Once downloaded, run the installer.
6.  Alternatively, you can choose **Browse my computer for drivers** in the "Update Drivers" wizard and point it to the downloaded driver files if you extracted them.
7.  After installing or updating, restart your computer.

### ## Step 5: Run the Network Troubleshooter

Windows has built-in troubleshooters that can automatically detect and fix network problems.

1.  Click the **Start menu**.
2.  Go to **Settings** (the gear icon).
3.  Click on **Network & Internet**.
4.  Scroll down and click on **Network troubleshooter**.
5.  Follow the on-screen prompts. The troubleshooter will attempt to identify and fix issues with your Wi-Fi connection. It may ask you which network adapter to troubleshoot; select your wireless adapter if prompted.

### ## Step 6: Check Network Discovery Settings

Network discovery needs to be enabled for your computer to see other devices and networks.

1.  In the Windows search bar, type `control panel` and press Enter.
2.  In the Control Panel, search for "Network and Sharing Center" or click on it directly.
3.  On the left-hand side, click **Change advanced sharing settings**.
4.  Expand the profile that is currently active (usually "Private" or "Guest or Public").
5.  Under **Network discovery**, ensure **Turn on network discovery** is selected.
6.  Under **File and printer sharing**, ensure **Turn on file and printer sharing** is selected (this is not strictly necessary for seeing Wi-Fi networks but is good practice for network functionality).
7.  Click **Save changes**.

### ## Step 7: Reset Network Settings

As a more drastic measure, you can reset all network adapters and settings to their defaults. This will require you to re-enter your Wi-Fi passwords.

1.  Click the **Start menu**.
2.  Go to **Settings** (the gear icon).
3.  Click on **Network & Internet**.
4.  Scroll down and click on **Network reset**.
5.  Click the **Reset now** button.
6.  A confirmation prompt will appear. Click **Yes**.
7.  Your computer will restart after a few minutes. After it reboots, try to connect to your Wi-Fi network again. You will need to re-enter your Wi-Fi password.

## Common Mistakes

A frequent mistake is assuming the problem lies with the router when the issue is entirely with the Windows 10 machine. Users often spend significant time reconfiguring their router without first thoroughly checking the computer's settings and drivers. Another common pitfall is when users uninstall the network adapter driver and check the option to "Delete the driver software for this device." This removes the driver entirely, and without manual intervention to reinstall it, the adapter may not function at all. Additionally, some users might overlook the simple solutions like restarting their computer or ensuring Airplane Mode is off, jumping straight to more complex troubleshooting steps.

## Prevention Tips

To prevent the "Wi-Fi network not visible" error from recurring, maintain up-to-date drivers for your network adapter. Regularly check the manufacturer's website for driver updates, especially after major Windows updates. Ensure your Wi-Fi router's firmware is also up to date, as this can resolve compatibility issues. Avoid placing your laptop near other electronic devices that emit strong electromagnetic interference, such as microwaves or cordless phones, as this can sometimes disrupt Wi-Fi signals. Keeping your Windows 10 operating system updated is also beneficial, as Microsoft frequently releases patches that can address network-related bugs. Finally, regularly running Windows Network Troubleshooter can help catch minor issues before they escalate.