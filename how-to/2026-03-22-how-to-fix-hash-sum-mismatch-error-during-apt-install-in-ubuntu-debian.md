---
title: "How to Fix 'Hash Sum Mismatch' Error During `apt install` in Ubuntu/Debian"
date: "2026-03-22T10:26:50.966Z"
slug: "how-to-fix-hash-sum-mismatch-error-during-apt-install-in-ubuntu-debian"
type: "how-to"
description: "Resolve the 'Hash Sum Mismatch' error when using `apt install` in Ubuntu or Debian systems. Learn the causes and step-by-step solutions to ensure successful package installations."
keywords: "apt, hash sum mismatch, error, ubuntu, debian, apt install, fix, package management, apt update, apt clean, sources.list, repository, mirror, network issue"
---

## Problem Explanation

The "Hash Sum Mismatch" error is a common issue encountered by users of Ubuntu and Debian-based systems when attempting to install or update packages using the `apt` package manager. This error signifies that the integrity check for a downloaded package or its metadata has failed. When `apt` downloads package files, it expects a cryptographic hash (like MD5 or SHA256) of the downloaded file to match a hash sum listed in the repository's metadata. If these sums do not match, `apt` flags it as a "Hash Sum Mismatch" to prevent the installation of potentially corrupted or tampered files.

Users typically see this error message directly in their terminal output, often after running `sudo apt update` or `sudo apt upgrade`, or when trying to install a specific package with `sudo apt install [package-name]`. The output will usually list the specific package file (e.g., a `.deb` file) and the expected versus actual hash sums, followed by a message indicating that some index files failed to download or that a specific package could not be fetched. This prevents the desired operation from completing, leaving packages in an uninstalled or un-upgraded state.

## Why It Happens

The "Hash Sum Mismatch" error primarily occurs when the file downloaded by `apt` is not identical to what the package repository expects. Several root causes can lead to this discrepancy:

1.  **Corrupted Download:** The most frequent cause is a corrupted download. This can happen due to unstable network connections, intermittent Wi-Fi issues, faulty network hardware, or even brief power fluctuations affecting data transfer.
2.  **Outdated Mirror Data:** APT repositories often use geographically distributed mirrors. If a local mirror you're using is not fully synchronized with the main repository, it might serve older or inconsistent package lists or package files that no longer match the latest checksums.
3.  **Proxy Server Issues:** If you're behind a proxy server, especially one that caches content, the cached version might be outdated or corrupted, leading to the mismatch. Some proxies might also interfere with the data stream.
4.  **Repository Issues:** Less commonly, the repository itself might have temporary inconsistencies or errors, although official Debian/Ubuntu repositories are generally very stable. Custom PPAs (Personal Package Archives) are more prone to such issues.
5.  **System Time Discrepancy:** Incorrect system time can occasionally lead to problems with package validity or fetching, as timestamps are used in various integrity checks.
6.  **Local Cache Corruption:** Your local `apt` cache (`/var/cache/apt/archives`) or the list of available packages (`/var/lib/apt/lists`) might become corrupted, leading `apt` to try to use incorrect local information.

## Step-by-Step Solution

### Step 1: Update and Clean APT Cache

Start by ensuring your local package lists are up-to-date and clearing any potentially corrupted local cache files.

First, update your package lists:
```bash
sudo apt update
```
If the error persists after `apt update`, clear the local cache:
```bash
sudo apt clean
sudo rm -rf /var/lib/apt/lists/*
sudo apt update
```
The `apt clean` command removes downloaded `.deb` files from the local cache. `rm -rf /var/lib/apt/lists/*` forces `apt` to re-download all package lists from scratch. After these steps, run `sudo apt update` again to fetch fresh lists.

### Step 2: Change APT Mirrors

If cleaning the cache doesn't resolve the issue, the problem might lie with the specific repository mirror you are using. Changing to a different, more reliable mirror (or the main server) often fixes this.

**Graphical Method (Ubuntu Desktop):**
1.  Open "Software & Updates" from your applications menu.
2.  Go to the "Ubuntu Software" tab.
3.  From the "Download from:" dropdown, select "Other...".
4.  Click "Select Best Server" to have your system automatically find the fastest mirror, or manually choose a well-known server like "Main server".
5.  Click "Choose", then close the "Software & Updates" window. It will prompt you to reload your software sources; confirm this.

**Command Line Method (All Debian/Ubuntu):**
Edit your `sources.list` file:
```bash
sudo nano /etc/apt/sources.list
```
Look for lines starting with `deb` or `deb-src`. For example:
`deb http://us.archive.ubuntu.com/ubuntu/ focal main restricted`
You can try commenting out your current mirror (add a `#` at the beginning of the line) and uncommenting or adding a line for the main server. For Ubuntu, you might change `us.archive.ubuntu.com` to `archive.ubuntu.com` or for Debian, change `ftp.us.debian.org` to `deb.debian.org`.
Alternatively, you can try public mirrors like those from Cloudflare, if available for your distribution, or just switch to the country-specific server for your region.

After saving changes, run:
```bash
sudo apt update
```

### Step 3: Check Network Connectivity and DNS Resolution

A shaky network connection or DNS issues can lead to incomplete downloads. Verify your network's health.

Test connectivity to a public server:
```bash
ping google.com
```
Test connectivity to your repository mirror:
```bash
ping archive.ubuntu.com # Replace with your actual mirror
```
Check DNS resolution:
```bash
nslookup archive.ubuntu.com # Or dig archive.ubuntu.com
```
If you encounter packet loss, high latency, or DNS lookup failures, investigate your network connection, router, or DNS server settings. You might try temporarily changing your DNS server to a public one like Google's (8.8.8.8 and 8.8.4.4) or Cloudflare's (1.1.1.1).

### Step 4: Disable/Bypass Proxies

If you are using a proxy server, it might be caching outdated content or interfering with the download.

First, check if APT is configured to use a proxy. Look for proxy settings in:
*   `/etc/apt/apt.conf`
*   `/etc/apt/apt.conf.d/` (any file ending with `.conf`)
*   Environment variables (e.g., `http_proxy`, `https_proxy`)

To temporarily disable proxy settings for `apt`, you can unset environment variables or comment out proxy lines in configuration files.
For environment variables, you might run:
```bash
unset http_proxy
unset https_proxy
unset ftp_proxy
```
Then try `sudo apt update` and `sudo apt upgrade`. If `apt` is configured via `/etc/apt/apt.conf.d/`, find the file (e.g., `20proxy.conf`) and comment out the `Acquire::http::Proxy` or similar lines.

If disabling the proxy resolves the issue, investigate your proxy server's caching or configuration.

### Step 5: Verify System Time and Date

Incorrect system time can cause issues with SSL/TLS certificates and package validity checks, leading to download failures.

Check your current system time:
```bash
timedatectl
```
Ensure that "NTP service: active" and "System clock synchronized: yes" are displayed. If your time is significantly off, or NTP is not active, you can resynchronize it.
To enable NTP synchronization if it's disabled:
```bash
sudo timedatectl set-ntp true
```
If your system time is drastically incorrect and NTP isn't fixing it, manually set it (use with caution):
```bash
sudo date -s "YYYY-MM-DD HH:MM:SS"
```
Then re-run `sudo apt update`.

### Step 6: Identify and Purge Problematic Packages (Advanced)

If the hash sum mismatch consistently appears for a specific package after trying the above, there might be a deeper issue with that package or its metadata.

You can try to isolate the problematic package. The error message usually points to it. If it's a `Packages` or `Release` file failing, it's broader repository issue. If it's a specific `.deb` file, you could try to remove it from the cache and attempt to download it again.

If the error persists for a particular PPA or third-party repository, consider removing that repository from your `sources.list.d` directory.
For example, to remove a PPA:
```bash
sudo add-apt-repository --remove ppa:user/ppa-name
```
Then run `sudo apt update` to refresh your sources.

## Common Mistakes

1.  **Ignoring the Error and Retrying Immediately:** Many users simply run `sudo apt update` or `sudo apt upgrade` again without taking any corrective action. While sometimes a transient network glitch can cause a one-off error, persistent "Hash Sum Mismatch" requires investigation and specific steps, not just retries.
2.  **Not Cleaning the APT Cache:** Often, the problem lies with a locally cached, corrupted package list or a `.deb` file. Skipping `sudo apt clean` and `sudo rm -rf /var/lib/apt/lists/*` means `apt` might keep trying to use the same problematic local data.
3.  **Overlooking Network Issues:** Assuming the problem is always with the repository and not checking local network stability, DNS resolution, or proxy configurations. A flaky Wi-Fi connection or a misconfigured router can easily cause this.
4.  **Not Trying Different Mirrors:** Sticking to the default or current mirror without attempting to switch to a main server or a different local mirror. Mirror synchronization issues are a very common cause.
5.  **Confusing `apt update` with `apt upgrade`:** `apt update` refreshes the list of available packages, while `apt upgrade` installs them. Both can trigger the error, but the fix usually starts with ensuring `apt update` completes successfully after clearing lists or changing mirrors.

## Prevention Tips

1.  **Use Reliable Package Mirrors:** Stick to the official mirrors provided by your distribution (Debian/Ubuntu) or well-known, geographically close mirrors. Avoid using experimental or unverified mirrors for critical systems. You can configure this via "Software & Updates" or by editing `sources.list`.
2.  **Regularly Clean APT Cache:** Periodically run `sudo apt clean` to clear your local package archive cache. This prevents old, potentially corrupted `.deb` files from lingering and ensures fresh downloads when needed.
3.  **Maintain a Stable Network Connection:** Ensure your system has a stable and reliable internet connection, especially during large updates or installations. Wired connections are often more reliable than Wi-Fi for critical downloads.
4.  **Keep System Time Synchronized:** Ensure your system's clock is synchronized using NTP (Network Time Protocol). Most modern distributions do this by default, but verify it with `timedatectl`. Correct time is crucial for SSL certificate validation and package integrity.
5.  **Be Cautious with Third-Party PPAs:** While PPAs can be useful, they are not always as stable or well-maintained as official repositories. If you frequently encounter "Hash Sum Mismatch" errors after adding a PPA, consider removing it or reporting the issue to the PPA maintainer.
6.  **Avoid Aggressive Proxy Caching (if applicable):** If you manage a proxy server, ensure its caching policies are not overly aggressive, leading to stale content being served. Regular cache invalidation or bypassing for specific domains might be necessary.