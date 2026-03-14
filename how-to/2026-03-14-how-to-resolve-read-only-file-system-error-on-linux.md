---
title: "How to Resolve 'Read-only File System' Error on Linux"
date: "2026-03-14T01:56:20.906Z"
slug: "how-to-resolve-read-only-file-system-error-on-linux"
type: "how-to"
description: "Learn how to diagnose and fix the common 'Read-only File System' error in Linux, with step-by-step solutions and prevention tips."
keywords: "Linux, read-only file system, filesystem error, mount, remount, fstab, systemctl, fsck, troubleshooting"
---

## Problem Explanation

You're working on your Linux system, perhaps trying to save a file, create a new directory, or install software, and suddenly you're met with an error message stating "Read-only file system." This can manifest in various ways depending on the context. For instance, when using a command-line tool, you might see output like:

```bash
mv: cannot move 'source_file' to 'destination_directory': Read-only file system
```

Or when attempting to save a document in a graphical application:

```
Error saving file: The file system is read-only.
```

This error indicates that the operating system is preventing any modifications to the file system in question. It's a protective measure, but it severely limits your ability to interact with your system and accomplish tasks that require writing data.

## Why It Happens

The "Read-only File System" error primarily occurs when the Linux kernel detects a potential problem with the integrity of a mounted file system. To prevent data corruption or further damage, it automatically remounts the affected partition in read-only mode. Common triggers for this include:

*   **File System Corruption:** This is the most frequent cause. If the file system structure becomes inconsistent due to sudden power loss, improper shutdowns, hardware failures (like a failing disk), or software bugs, the system will switch to read-only mode to safeguard your data.
*   **Hardware Issues:** Problems with the storage device itself, such as bad sectors on a hard drive or SSD, can lead the system to believe the file system is unreliable and thus set it to read-only.
*   **Full Disk:** While less common for triggering a read-only remount by default, a completely full file system can sometimes lead to write errors that the system interprets as a need for protection.
*   **Incorrect Mount Options:** Less frequently, a file system might be intentionally mounted in read-only mode via configuration files like `/etc/fstab` or through manual `mount` commands, though this is usually a deliberate action.

## Step-by-Step Solution

Resolving a "Read-only File System" error involves diagnosing the underlying cause and then taking corrective actions. The most common scenario involves file system corruption.

### ## Step 1: Identify the Affected File System

First, you need to determine which file system is causing the problem. The error message often provides clues, but it's best to check the system logs. Use the `dmesg` command to view kernel messages.

```bash
dmesg | grep -i "error\|readonly\|fsck"
```

Look for lines indicating a file system error or a remount to read-only. You might also see references to `fsck` (file system check) being run automatically. To get a list of currently mounted file systems and their status, use:

```bash
mount | grep "ro,"
```

This command will list all partitions mounted in read-only mode. Note the device name (e.g., `/dev/sda1`, `/dev/nvme0n1p2`) and its mount point (e.g., `/`, `/home`).

### ## Step 2: Safely Unmount the File System (If Possible)

Before you can run `fsck`, the file system must be unmounted. If the affected file system is not your root file system (`/`) and is not currently in use by critical system processes, you might be able to unmount it. However, if it's the root file system or heavily used, unmounting might not be possible without rebooting into a recovery environment.

If you identified a non-root file system that appears idle, you can try unmounting it:

```bash
sudo umount /path/to/mountpoint
```

Replace `/path/to/mountpoint` with the actual mount point identified in Step 1. If this command fails with "target is busy," you'll need to proceed with a recovery environment.

### ## Step 3: Boot into a Recovery Environment

For the root file system (`/`) or if unmounting fails, you will need to run `fsck` from an environment where the file system is not actively being used. The most reliable way to do this is by booting from a Linux Live USB/DVD or using your system's recovery mode.

*   **Live USB/DVD:** Boot your computer from a bootable Linux distribution (like Ubuntu, Fedora, or your system's installer media). Select the "Try Ubuntu" or similar option to run the distribution from RAM without installing.
*   **Recovery Mode:** Many Linux distributions offer a "Recovery Mode" or "Advanced options" from the GRUB boot loader. This usually provides access to a root shell and utilities.

Once in the recovery environment, open a terminal.

### ## Step 4: Run File System Check (fsck)

Now, you can run `fsck` on the problematic partition. **Important:** Ensure you are running this on the *correct* device identified in Step 1. Running `fsck` on the wrong device can lead to data loss.

First, re-check the mount status in your recovery environment to ensure the partition is not mounted read-write. If it's still mounted read-only, you're in the right place. If it's somehow mounted read-write, unmount it using `umount` as described in Step 2.

Then, execute the `fsck` command. The `-y` flag automatically answers "yes" to all prompts, which is convenient but use with caution. The `-f` flag forces a check even if the file system appears clean.

```bash
sudo fsck -fy /dev/your_device_name
```

Replace `/dev/your_device_name` with the actual device name from Step 1 (e.g., `/dev/sda1`). `fsck` will scan the file system for errors and attempt to repair them. This process can take a significant amount of time, especially on large drives.

If `fsck` reports that it found and fixed errors, or if it says the file system is clean, you can proceed. If it reports unrecoverable errors, this could indicate a more serious hardware problem.

### ## Step 5: Remount the File System (or Reboot)

After `fsck` has completed, you have two main options depending on whether you're in a live environment or recovery mode:

*   **In a Live Environment:** If you are using a Live USB/DVD, you will need to explicitly mount the repaired file system back to its original location before rebooting.
    ```bash
    sudo mount /dev/your_device_name /path/to/original/mountpoint
    ```
    Then, reboot your system:
    ```bash
    sudo reboot
    ```

*   **In Recovery Mode (or if root was the issue):** If you ran `fsck` from your system's recovery mode, especially on the root file system, simply exit the recovery shell (if necessary) and reboot your system. The system should automatically attempt to mount the file system correctly upon startup.

### ## Step 6: Verify the Fix

Once your system has rebooted normally, try to perform an operation that previously failed. For example, try saving a file or creating a directory in the location that was previously inaccessible.

```bash
touch /path/to/previously/read_only/directory/test_file.txt
```

If the command succeeds without a "Read-only file system" error, the issue is likely resolved.

### ## Step 7: Investigate Persistent Issues (Hardware Check)

If the problem recurs shortly after fixing it, or if `fsck` reported unrecoverable errors, it strongly suggests a hardware problem with the storage device.

*   **SMART Data:** Check the Self-Monitoring, Analysis and Reporting Technology (SMART) data for your hard drive or SSD. You can typically do this using the `smartctl` command (you might need to install `smartmontools`).
    ```bash
    sudo apt install smartmontools  # For Debian/Ubuntu
    sudo yum install smartmontools  # For RHEL/CentOS/Fedora

    sudo smartctl -a /dev/your_device_name
    ```
    Look for attributes indicating failing sectors, reallocated sectors, or other errors.

*   **Disk Manufacturer Tools:** Many drive manufacturers provide diagnostic tools that can be run from a bootable environment.
*   **Hardware Replacement:** If the SMART data or diagnostics indicate a failing drive, plan to back up your data immediately and replace the drive.

## Common Mistakes

One common pitfall is attempting to force a remount of the file system to read-write mode (e.g., `mount -o remount,rw /`) without first diagnosing and repairing the underlying corruption. This is like trying to paint over a rotten plank of wood – it hides the problem temporarily but doesn't fix it, and the corruption will likely worsen, potentially leading to more severe data loss.

Another mistake is running `fsck` on a mounted file system. `fsck` is designed to work on unmounted file systems. While some versions might allow it on a read-only mounted file system, it's best practice and safest to always unmount first. Running `fsck` on a read-write mounted file system can cause severe corruption.

Users also sometimes forget to boot into a recovery environment or use a Live USB when the root file system (`/`) is the one affected, making it impossible to unmount and therefore impossible to safely check.

## Prevention Tips

The best way to prevent "Read-only File System" errors is to ensure your system is shut down gracefully. Avoid forcefully powering off your computer whenever possible. Regularly backing up your important data is crucial. If you experience frequent power outages, consider using an Uninterruptible Power Supply (UPS).

Keep your system software updated. Kernel and file system driver updates often include bug fixes that can prevent corruption issues. Regularly monitoring your disk's health using S.M.A.R.T. data can also help you identify potential hardware problems before they lead to file system corruption and data loss. If you consistently see errors in your SMART data, it's a strong indicator that your storage device is nearing the end of its life, and you should take proactive steps to replace it.