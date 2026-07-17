---
title: "How to Fix High CPU Usage by \"System and Compressed Memory\" Process in Windows 10"
date: "2026-07-17T20:52:48.827Z"
slug: "how-to-fix-high-cpu-usage-by-system-and-compressed-memory-process-in-windows-10"
type: "how-to"
description: "Resolve the \"System and Compressed Memory\" process consuming excessive CPU in Windows 10 with this comprehensive guide. Learn the causes and effective troubleshooting steps."
keywords: "Windows 10, System and Compressed Memory, High CPU, Task Manager, Memory Compression, Performance Issues, Troubleshooting, Fix"
---

## Problem Explanation

One of the more perplexing performance issues in Windows 10 is when the "System and Compressed Memory" process begins to consistently consume a high percentage of your CPU resources. This can manifest as a sluggish computer, unresponsive applications, and an overall frustrating user experience. When you open Task Manager, you'll likely see "System and Compressed Memory" listed as a process, often with a CPU usage figure that is unusually high – sometimes hovering around 20-50%, or even higher, even when your system should be relatively idle. This process is designed to help manage memory efficiently, but when it malfunctions, it can severely impact your system's performance.

The core of the problem lies in the memory management subsystem of Windows 10. The "System and Compressed Memory" process is responsible for a crucial feature called memory compression. When your system runs low on physical RAM, Windows attempts to free up memory by compressing less frequently used data and storing it in RAM instead of paging it to the hard drive. This compression and decompression process can be resource-intensive. However, when this process gets stuck in a loop, encounters errors, or is triggered by an underlying issue, it can lead to disproportionately high CPU usage, making your computer feel slow and unstable.

## Why It Happens

The primary reason for elevated CPU usage by "System and Compressed Memory" is typically related to how Windows manages memory, especially under certain conditions. Windows 10 introduced memory compression as a way to improve performance on systems with limited RAM. When physical memory starts to get full, Windows will compress pages of memory that haven't been accessed recently. This compressed data is then stored in RAM itself. This is generally a good thing, as accessing compressed data in RAM is much faster than reading from the page file on your hard drive. However, if the system is constantly struggling to manage memory, or if there's a bug in the memory management driver, the compression and decompression cycles can become excessively frequent and computationally expensive, leading to the high CPU load you're observing.

Several factors can contribute to this. Outdated or corrupted device drivers, particularly those related to graphics or storage, can interfere with memory management. Malware or viruses can also place a strain on system resources, indirectly causing the memory manager to work harder. Furthermore, specific hardware issues, or even a problematic Windows update, can sometimes trigger this behavior. In essence, the "System and Compressed Memory" process is often a symptom of a deeper issue that forces it to work overtime.

## Step-by-Step Solution

Here are the steps you can take to diagnose and resolve high CPU usage by the "System and Compressed Memory" process.

### ## Step 1: Restart Your Computer

This is the simplest and often most effective first step for many temporary software glitches. A clean reboot can clear out temporary processes, resolve minor conflicts, and reset the memory manager.

1.  Click the **Start** button.
2.  Click the **Power** icon.
3.  Select **Restart**.
4.  Once your computer has fully restarted, check Task Manager (Ctrl+Shift+Esc) to see if the CPU usage of "System and Compressed Memory" has returned to normal levels.

### ## Step 2: Update Your Device Drivers

Outdated or corrupt device drivers are a common culprit. Focus on graphics, network, and storage drivers.

1.  Right-click the **Start** button and select **Device Manager**.
2.  Expand categories like **Display adapters**, **Network adapters**, and **Storage controllers**.
3.  For each relevant device, right-click on it and select **Update driver**.
4.  Choose **Search automatically for drivers**.
5.  If Windows finds and installs an update, restart your computer and check Task Manager.
6.  If Windows doesn't find an update, consider visiting your computer manufacturer's website or the individual hardware component manufacturer's website (e.g., NVIDIA, AMD, Intel) to download the latest drivers manually.

### ## Step 3: Run a Malware Scan

Malware can consume system resources and disrupt normal operations.

1.  Open **Windows Security** (search for it in the Start menu).
2.  Click on **Virus & threat protection**.
3.  Under "Current threats," click **Quick scan**.
4.  If the scan finds any threats, follow the on-screen instructions to remove them.
5.  For a more thorough scan, you can click **Scan options** and select **Full scan**.
6.  After the scan and any necessary removals, restart your computer.

### ## Step 4: Check for Windows Updates

Microsoft frequently releases updates that include performance improvements and bug fixes.

1.  Click the **Start** button.
2.  Click **Settings** (the gear icon).
3.  Click **Update & Security**.
4.  Click **Windows Update** on the left pane.
5.  Click **Check for updates**.
6.  Download and install any available updates. You will likely need to restart your computer after the installation is complete.

### ## Step 5: Disable the Superfetch (SysMain) Service (Temporary)

While often beneficial, the Superfetch service (now called SysMain) can sometimes contribute to high disk or memory usage, which might indirectly affect "System and Compressed Memory." Disabling it is a troubleshooting step, and you can re-enable it later.

1.  Press **Windows Key + R** to open the Run dialog box.
2.  Type `services.msc` and press Enter.
3.  In the Services window, scroll down and find **SysMain** (or **Superfetch**).
4.  Right-click on **SysMain** and select **Properties**.
5.  Under the "General" tab, click the **Startup type** dropdown menu and select **Disabled**.
6.  Click **Stop** to immediately stop the service.
7.  Click **Apply** and then **OK**.
8.  Restart your computer and check Task Manager.

*Note: If disabling SysMain resolves the issue, you might consider re-enabling it later and ensuring your drive is not fragmented if it's an HDD, or checking for other disk-related issues.*

### ## Step 6: Adjust Virtual Memory Settings

Incorrect virtual memory settings can sometimes lead to performance problems. While Windows usually manages this well automatically, manual adjustment can be helpful.

1.  Press **Windows Key + Pause/Break** to open System properties, or search for "View advanced system settings" in the Start menu and select it.
2.  In the System Properties window, go to the **Advanced** tab.
3.  Under the "Performance" section, click **Settings...**.
4.  In the Performance Options window, go to the **Advanced** tab.
5.  Under the "Virtual memory" section, click **Change...**.
6.  Uncheck the box that says **"Automatically manage paging file size for all drives."**
7.  Select your primary drive (usually C:).
8.  Choose **Custom size**.
9.  For "Initial size," enter a value that is 1.5 times your physical RAM (e.g., if you have 8GB RAM, enter 12288 MB).
10. For "Maximum size," enter a value that is 3 times your physical RAM (e.g., if you have 8GB RAM, enter 24576 MB). You can find your RAM in GB by dividing the MB value by 1024.
11. Click **Set**, then **OK**.
12. You will be prompted to restart your computer. Do so, and then check Task Manager.

*Note: If you're unsure about these values, it's generally safer to re-enable "Automatically manage paging file size for all drives" and let Windows handle it.*

### ## Step 7: Run System File Checker (SFC) and DISM

These tools can repair corrupted Windows system files that might be causing the issue.

1.  Right-click the **Start** button and select **Command Prompt (Admin)** or **Windows PowerShell (Admin)**.
2.  In the administrative command prompt window, type the following command and press Enter:
    `sfc /scannow`
3.  This process can take some time. Once it completes, it will report whether it found and fixed any corrupted files.
4.  After SFC completes, run the DISM tool. Type the following command and press Enter:
    `DISM /Online /Cleanup-Image /RestoreHealth`
5.  This command also takes time. Once it finishes, restart your computer.

## Common Mistakes

One common mistake is to immediately disable memory compression entirely, which is not directly possible through a simple setting and would negatively impact performance. Users might also incorrectly assume the "System and Compressed Memory" process itself is the direct problem, when it's usually a symptom of an underlying driver or system file issue. Another pitfall is making drastic changes to virtual memory settings without understanding them, which can sometimes worsen performance. Finally, users might repeatedly reboot their system without following up with diagnostic steps, hoping the problem will resolve itself, when a systematic approach is required.

## Prevention Tips

To prevent "System and Compressed Memory" from consuming excessive CPU in the future, it's crucial to maintain a healthy system. Regularly update your Windows operating system and all device drivers. Keeping your antivirus software up-to-date and performing regular malware scans is also vital. Avoid installing software from untrusted sources, as it can introduce malware or poorly written applications that strain system resources. Ensuring you have sufficient RAM for your typical workload can also reduce the instances where Windows needs to heavily rely on memory compression. For those using traditional hard drives (HDDs), periodically defragmenting your drive can also contribute to better overall system performance.