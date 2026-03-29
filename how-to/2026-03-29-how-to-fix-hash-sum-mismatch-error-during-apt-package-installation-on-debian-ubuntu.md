---
title: "How to Fix 'Hash Sum Mismatch' Error During apt Package Installation on Debian/Ubuntu"
date: "2026-03-29T15:32:04.694Z"
slug: "how-to-fix-hash-sum-mismatch-error-during-apt-package-installation-on-debian-ubuntu"
type: "how-to"
description: "Resolve the frustrating 'Hash Sum Mismatch' error when installing packages on Debian and Ubuntu. This guide provides clear steps, explanations, and prevention tips."
keywords: "apt, debian, ubuntu, hash sum mismatch, package installation, error fix, linux, command line, sudo, update, upgrade, clean, remove, repository"
---

## Problem Explanation

You're trying to install or update software on your Debian or Ubuntu system using the `apt` package manager, and suddenly, you're hit with an error message that looks something like this:

```
W: Failed to fetch http://archive.ubuntu.com/ubuntu/dists/focal-updates/main/binary-amd64/Packages  Hash Sum mismatch
E: Some index files failed to download. They have been ignored, or old ones used instead.
```

This "Hash Sum Mismatch" error is a common roadblock. It signifies that the package index files that `apt` downloads to know what software is available and how to get it have been corrupted or are not the correct versions. Consequently, `apt` cannot verify the integrity of the data it has received, preventing it from proceeding with your requested installation or upgrade. This leaves your package management system in an inconsistent state, unable to reliably update or install new software until resolved.

## Why It Happens

The core reason for a "Hash Sum Mismatch" error lies in the integrity check process of `apt`. When `apt` downloads package lists from its configured repositories, it also downloads corresponding checksums (hash sums) for these lists. These checksums act like digital fingerprints, ensuring that the downloaded files are exactly as they should be, without any corruption or tampering during transit.

When you encounter the mismatch error, it means that the checksum calculated by `apt` for a downloaded package index file does not match the checksum provided by the repository. This discrepancy can occur due to several reasons. Network issues, such as an unstable internet connection, packet loss, or proxy interference, can lead to incomplete or corrupted downloads. Sometimes, the repository itself might have temporary issues, serving incorrect or outdated index files. Less commonly, a problem with your local system's disk or memory could also contribute to data corruption. Essentially, `apt` is flagging that it cannot trust the downloaded information due to this integrity verification failure.

## Step-by-Step Solution

The most effective way to resolve the "Hash Sum Mismatch" error involves clearing out the problematic cached data and forcing `apt` to re-download fresh package information.

### ## Step 1: Update Package Lists

Before anything else, it's crucial to attempt a refresh of your package lists. This can sometimes resolve temporary glitches. Open your terminal and run:

```bash
sudo apt update
```

Observe the output carefully. If the error persists immediately after this command, proceed to the next steps.

### ## Step 2: Clean Local Repository Cache

The "Hash Sum Mismatch" error often stems from corrupted or outdated cached package information stored on your local system. The `apt clean` command removes all downloaded `.deb` files from the `/var/cache/apt/archives/` directory. While this doesn't directly address the index files, it's a good general cleanup step.

Run the following command:

```bash
sudo apt clean
```

This command is safe to run and will free up disk space.

### ## Step 3: Remove Stale Package Index Files

This is the most critical step for resolving the "Hash Sum Mismatch" error. `apt` stores its package index files in `/var/lib/apt/lists/`. These are the files that are likely corrupted. We need to remove them so that `apt update` will fetch fresh copies.

First, it's wise to back up these files in case something unexpected happens, though it's rarely necessary for this specific issue.

```bash
sudo cp -r /var/lib/apt/lists/ /var/lib/apt/lists_backup
```

Now, remove the contents of the `lists` directory:

```bash
sudo rm -rf /var/lib/apt/lists/*
```

The `rm -rf` command is powerful, so ensure you have the correct path. The `*` wildcard will remove all files and subdirectories within `/var/lib/apt/lists/`.

### ## Step 4: Re-run apt update

With the old, potentially corrupted index files removed, it's time to force `apt` to download them again from the repositories.

Run the update command again:

```bash
sudo apt update
```

This command will now attempt to fetch all the necessary index files from your configured software sources. Pay close attention to the output. If the "Hash Sum Mismatch" error is gone and all index files download successfully, you've likely resolved the issue.

### ## Step 5: Re-run apt upgrade (Optional but Recommended)

After successfully updating the package lists, it's a good practice to upgrade any packages that have available updates. This ensures your system is in a consistent state.

```bash
sudo apt upgrade
```

If the `apt update` in the previous step succeeded without errors, this command should also run without issues.

### ## Step 6: Install or Reinstall the Problematic Package

If you were trying to install a specific package when the error occurred, try installing it again now. If you were upgrading and encountered the error, try upgrading again.

For example, to install a package named `your-package-name`:

```bash
sudo apt install your-package-name
```

Or to upgrade all packages again:

```bash
sudo apt upgrade
```

If the `apt update` command completed without the "Hash Sum Mismatch" error, the subsequent `install` or `upgrade` should now succeed.

### ## Step 7: Check Repository Configuration (If Problem Persists)

In rare cases, if the error persists even after clearing the cache and re-updating, there might be an issue with your `/etc/apt/sources.list` file or files within `/etc/apt/sources.list.d/`. Ensure that the repository URLs are correct and accessible. You can try commenting out suspect repository entries by adding a `#` at the beginning of the line, then run `sudo apt update` again to see if the error disappears. If it does, the commented-out repository is the source of the problem.

## Common Mistakes

A common pitfall when encountering this error is repeatedly running `sudo apt update` without clearing the corrupted cache. This simply tries to download the same problematic files again, leading to the same error. Another mistake is to ignore the error and proceed with `apt upgrade` or `apt install`. While `apt` might sometimes use old index files, this can lead to installing outdated software or encountering further dependency issues down the line, creating a less stable system. Lastly, some users might attempt to manually download and replace files in `/var/lib/apt/lists/`, which is a risky approach that can easily lead to more severe package management problems if not done with extreme precision and understanding.

## Prevention Tips

To minimize the chances of encountering the "Hash Sum Mismatch" error in the future, always ensure you have a stable internet connection when running `apt update` or `install` commands. If you are on a network that experiences frequent drops or high latency, consider waiting for a more stable connection. Regularly running `sudo apt update` (e.g., weekly or before significant installations) can help catch minor issues before they escalate. Additionally, keeping your system updated with regular `sudo apt upgrade` commands ensures that you are using the latest package lists and can often prevent inconsistencies from forming. If you add new repositories, always verify their source and ensure they are reputable and well-maintained.