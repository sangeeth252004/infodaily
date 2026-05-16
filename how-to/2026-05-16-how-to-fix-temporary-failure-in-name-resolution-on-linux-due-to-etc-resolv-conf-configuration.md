---
title: "How to Fix 'Temporary failure in name resolution' on Linux Due to `/etc/resolv.conf` Configuration"
date: "2026-05-16T07:14:00.652Z"
slug: "how-to-fix-temporary-failure-in-name-resolution-on-linux-due-to-etc-resolv-conf-configuration"
type: "how-to"
description: "Resolve \"Temporary failure in name resolution\" on Linux by troubleshooting and correctly configuring `/etc/resolv.conf` and related network services like NetworkManager or systemd-resolved."
keywords: "Linux, name resolution, DNS, /etc/resolv.conf, temporary failure, NetworkManager, systemd-resolved, DNS fix, network configuration"
---

### Problem Explanation

The error "Temporary failure in name resolution" on a Linux system indicates that the system is unable to translate domain names (like `google.com`) into IP addresses (like `172.217.160.142`). This is a critical issue because most internet services and internal network communications rely on this translation process, known as DNS (Domain Name System) resolution.

When this problem occurs, users will typically observe various symptoms across their system:
*   `ping google.com` will return `ping: google.com: Temporary failure in name resolution`.
*   `apt update` or `yum update` commands will fail to reach package repositories, showing messages like `Could not resolve 'archive.ubuntu.com'` or `Cannot find a valid baseurl for repo`.
*   Web browsers will display "Server Not Found" or "DNS_PROBE_FINISHED_BAD_CONFIG" errors.
*   `ssh` attempts to connect to remote servers by hostname will fail.
*   `curl` or `wget` commands will report similar resolution failures.
Crucially, if you try to `ping` a known IP address (e.g., `ping 8.8.8.8`), it will often succeed, confirming that basic network connectivity exists, but DNS resolution is broken.

### Why It Happens

The primary cause of "Temporary failure in name resolution" when tied to `/etc/resolv.conf` issues is an incorrect, missing, or improperly managed configuration of DNS servers. On Linux, `/etc/resolv.conf` is the key file that client applications consult to find out which DNS servers to query.

The problem usually stems from one of the following root causes:
1.  **Incorrect or Missing DNS Server Entries:** The `/etc/resolv.conf` file might contain no `nameserver` entries, or the listed IP addresses for DNS servers are incorrect, unreachable, or non-functional.
2.  **Overwriting by Network Management Services:** Modern Linux distributions often use network management services like `NetworkManager` (common in desktop environments and many servers) or `systemd-resolved` (part of `systemd`) to dynamically manage `/etc/resolv.conf`. If these services are misconfigured, fail to start, or are overridden, they can write an empty, incorrect, or inaccessible `/etc/resolv.conf` file.
3.  **Permissions and Immutability Issues:** Incorrect file permissions on `/etc/resolv.conf` can prevent applications from reading it. Less common, but possible, is the `chattr +i` (immutable) attribute being set on the file, preventing any write operations, even by root or network managers, leading to stale or empty configurations.
4.  **Network Configuration Discrepancies:** While `/etc/resolv.conf` is the symptom, the underlying issue might be how an interface obtained its DNS configuration via DHCP or a static setup, which then failed to propagate correctly to `/etc/resolv.conf`.

### Step-by-Step Solution

#### ## Step 1: Diagnose the Current DNS Configuration

First, verify that name resolution is indeed failing and inspect the current `/etc/resolv.conf`.

1.  **Test Connectivity (IP vs. Name):**
    ```bash
    ping 8.8.8.8  # Test basic network connectivity to Google's DNS server
    ping google.com # Test name resolution
    ```
    If `ping 8.8.8.8` works but `ping google.com` fails, your network connection is fine, and the issue is DNS.

2.  **Inspect `/etc/resolv.conf`:**
    ```bash
    cat /etc/resolv.conf
    ```
    Look for `nameserver` entries. An empty file, or a file pointing to `127.0.0.1` (which relies on `systemd-resolved` or a local caching DNS server) without that service running correctly, are common indicators of a problem.

#### ## Step 2: Backup the Existing `resolv.conf`

Before making any changes, always back up the original configuration.

```bash
sudo cp /etc/resolv.conf /etc/resolv.conf.backup
```

#### ## Step 3: Manually Configure DNS Servers in `resolv.conf`

This step provides a temporary or sometimes permanent fix by directly instructing the system which DNS servers to use.

1.  **Open `resolv.conf` for editing:**
    ```bash
    sudo nano /etc/resolv.conf
    # Or use your preferred text editor like vi/vim
    ```

2.  **Add reliable public DNS servers:** Delete existing `nameserver` lines if they are problematic and add new ones. Recommended public DNS servers include Google DNS, Cloudflare DNS, or OpenDNS.
    ```
    nameserver 8.8.8.8
    nameserver 8.8.4.4
    # Optional: Add Cloudflare DNS as a fallback
    # nameserver 1.1.1.1
    ```
    Save and exit the editor (Ctrl+X, Y, Enter for nano).

3.  **Test Resolution:**
    ```bash
    ping google.com
    ```
    If it works, the manual configuration has resolved the immediate issue.

#### ## Step 4: Check File Permissions and Immutability

Incorrect permissions or the immutable attribute can prevent `/etc/resolv.conf` from being updated or read.

1.  **Check permissions:**
    ```bash
    ls -l /etc/resolv.conf
    ```
    Typical permissions are `rw-r--r--` (`644`) for root owner. If permissions are too restrictive (e.g., `400`), applications might not read it. Correct them with `sudo chmod 644 /etc/resolv.conf`.

2.  **Check for immutability:**
    ```bash
    lsattr /etc/resolv.conf
    ```
    If you see `i` in the output (e.g., `----i--------e-- /etc/resolv.conf`), the file is immutable. This prevents any changes. Remove the immutable attribute:
    ```bash
    sudo chattr -i /etc/resolv.conf
    ```
    Then you can re-apply the changes from Step 3 if needed.

#### ## Step 5: Address Overwriting by Network Management Services

Often, manual changes to `/etc/resolv.conf` are temporary because a network management service overwrites it. You need to configure these services directly.

1.  **For `systemd-resolved` (Ubuntu 18.04+, Debian 10+, Fedora):**
    `systemd-resolved` typically creates a symlink from `/etc/resolv.conf` to `/run/systemd/resolve/stub-resolv.conf` or `/lib/systemd/resolv.conf`. If it's configured to use local addresses (like `127.0.0.53`) and it's not forwarding correctly, resolution fails.
    *   **Check status:** `systemctl status systemd-resolved`
    *   **Check current DNS servers used by resolved:** `resolvectl status`
    *   **Configure DNS servers for `systemd-resolved`:** Edit `/etc/systemd/resolved.conf`
        ```bash
        sudo nano /etc/systemd/resolved.conf
        ```
        Uncomment or add the `DNS=` line under the `[Resolve]` section:
        ```
        [Resolve]
        DNS=8.8.8.8 8.8.4.4
        #FallbackDNS=1.1.1.1
        ```
        Save and exit.
    *   **Restart the service:**
        ```bash
        sudo systemctl restart systemd-resolved
        ```
    *   **Verify:** `resolvectl status` and `ping google.com`.

2.  **For `NetworkManager`:**
    NetworkManager typically manages `/etc/resolv.conf` if present.
    *   **Disable automatic DNS updates by NetworkManager (if you prefer manual control):**
        Edit `/etc/NetworkManager/NetworkManager.conf`
        ```bash
        sudo nano /etc/NetworkManager/NetworkManager.conf
        ```
        Under the `[main]` section, add or modify:
        ```
        [main]
        dns=none
        ```
        Then, restart NetworkManager: `sudo systemctl restart NetworkManager`. After this, `NetworkManager` will no longer modify `/etc/resolv.conf`, allowing your manual changes from Step 3 to persist.
    *   **Configure DNS via NetworkManager (preferred):**
        *   **Using `nmcli` (command line):**
            Identify your active connection name: `nmcli connection show --active` (e.g., `eth0` or `enp0s3`).
            ```bash
            sudo nmcli connection modify <connection_name> ipv4.dns "8.8.8.8 8.8.4.4"
            sudo nmcli connection up <connection_name>
            ```
            Replace `<connection_name>` with your actual connection name.
        *   **Using a GUI (e.g., GNOME Network Settings):** Navigate to your network adapter settings, find the IPv4/IPv6 DNS section, and enter your preferred DNS servers there.

#### ## Step 6: Final Test and Verification

After applying any of the above solutions, perform a comprehensive test.

```bash
ping google.com
dig google.com
nslookup google.com
```
All of these should now successfully resolve domain names to IP addresses.

### Common Mistakes

1.  **Ignoring Network Management Services:** Many users manually edit `/etc/resolv.conf` without realizing that `NetworkManager` or `systemd-resolved` will overwrite their changes shortly after, leading to frustration and the error reappearing. Always configure DNS through the service that manages it, or disable its control over `/etc/resolv.conf` if necessary.
2.  **Incorrect DNS Server Addresses:** Entering invalid or unreachable IP addresses for `nameserver` entries will obviously prevent resolution. Always use known, reliable public DNS servers if you're unsure, or those provided by your ISP.
3.  **Forgetting to Save or Restart:** After editing configuration files or modifying NetworkManager settings, users might forget to save the file or restart the relevant service (`systemd-resolved`, `NetworkManager`) for changes to take effect.
4.  **Incorrect File Permissions or Immutability:** Overlooking `chattr +i` or incorrect file permissions on `/etc/resolv.conf` can make it impossible for the system to read or write the necessary DNS configuration.
5.  **Firewall Blocking DNS Ports:** While less common for "Temporary failure in name resolution" and more for complete DNS failure, a local firewall (e.g., `ufw`, `firewalld`) blocking UDP port 53 (the standard DNS port) can prevent queries from reaching DNS servers. Always check basic network connectivity first.

### Prevention Tips

1.  **Use Network Management Tools:** Whenever possible, configure DNS settings through your distribution's standard network management tools (e.g., `NetworkManager`, `netplan`, `systemd-resolved`). These tools are designed to handle dynamic network changes and maintain the correct `/etc/resolv.conf`.
2.  **Understand Your Distribution's DNS Handling:** Different Linux distributions and versions manage DNS slightly differently. For example, modern Ubuntu/Debian often uses `systemd-resolved`, while older versions or other distros might rely more on `NetworkManager` or `resolvconf` utility. Knowing your system's mechanism prevents conflicts.
3.  **Backup Before Changes:** Always create a backup of `/etc/resolv.conf` (and any other critical network configuration files) before making changes. This provides a quick rollback option if things go wrong.
4.  **Monitor Logs for Network Issues:** Regularly check system logs (`journalctl -u systemd-resolved`, `journalctl -u NetworkManager`, `dmesg`, `/var/log/syslog`) for any warnings or errors related to network configuration or DNS services.
5.  **Use Reliable DNS Servers:** If configuring manually, choose well-known, reliable public DNS servers (e.g., Google `8.8.8.8`, `8.8.4.4`; Cloudflare `1.1.1.1`, `1.0.0.1`) or your ISP's designated servers. Avoid using unknown or potentially unstable DNS servers.
6.  **Avoid Manual Edits of `resolv.conf` if Managed:** Unless you specifically intend to disable network management services from controlling `/etc/resolv.conf`, avoid direct manual edits as they are likely to be overwritten. Configure through the managing service instead.