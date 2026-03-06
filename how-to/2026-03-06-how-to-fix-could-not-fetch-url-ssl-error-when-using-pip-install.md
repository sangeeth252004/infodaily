---
title: "How to Fix 'Could not fetch URL' SSL Error When Using Pip Install"
date: "2026-03-06T15:36:31.444Z"
slug: "how-to-fix-could-not-fetch-url-ssl-error-when-using-pip-install"
type: "how-to"
description: "Encountering a 'Could not fetch URL' SSL error with pip install? This comprehensive guide explains the causes and provides step-by-step solutions to get your Python package installations back on track."
keywords: "pip install, SSL error, Python, package installation, could not fetch URL, network error, certificate error, fix, troubleshooting"
---

# How to Fix 'Could not fetch URL' SSL Error When Using Pip Install

You're trying to install a Python package using `pip install`, a routine task that usually goes smoothly. However, you're suddenly greeted with an error message that looks something like this:

```
WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by 'SSLError(SSLCertVerificationError(1, '[SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1129)'))': /simple/requests/
Could not fetch URL https://pypi.org/simple/requests/: There was a problem confirming the SSL certificate: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get local issuer certificate (_ssl.c:1129) - skipping
ERROR: Could not find a version that satisfies the requirement requests (from versions: none)
```

This frustrating "Could not fetch URL" error, often accompanied by `SSLError` or `CERTIFICATE_VERIFY_FAILED`, prevents `pip` from accessing the Python Package Index (PyPI) or other package repositories. It's a common roadblock that can halt your development workflow.

## Why It Happens

This error fundamentally stems from a failure in `pip`'s ability to securely connect to the package repository. When `pip` tries to download packages, it establishes a secure connection using SSL/TLS. This process involves verifying the identity of the server it's communicating with through a digital certificate. The "certificate verify failed" part of the error means that `pip` could not trust the certificate presented by the server. This distrust can arise for several reasons:

The most frequent culprits are issues with your system's or Python's understanding of trusted certificate authorities, or problems with network intermediaries like firewalls or proxy servers that are intercepting and modifying the SSL connection. If your system doesn't have an up-to-date list of trusted Certificate Authorities (CAs), or if a proxy server is presenting its own certificate that isn't trusted by your system, `pip` will refuse to proceed, deeming the connection insecure.

## Step-by-Step Solution

Let's work through the common solutions to get `pip` back to fetching packages reliably.

### Step 1: Ensure Your System's Time is Accurate

An incredibly simple yet often overlooked cause is an incorrect system time. SSL certificates have validity periods, and if your system's clock is significantly ahead or behind, it can cause certificate validation to fail.

1.  **Windows:** Right-click the clock in the taskbar, select "Adjust date/time," and ensure "Set time automatically" and "Set time zone automatically" are enabled. You can also click "Sync now" to force an update.
2.  **macOS:** Go to System Settings > General > Date & Time. Ensure "Set date and time automatically" is checked and select your appropriate time zone.
3.  **Linux:** Open a terminal. You can use `sudo timedatectl set-ntp true` to enable Network Time Protocol (NTP) synchronization. If that doesn't work, you can manually set it with `sudo date -s "YYYY-MM-DD HH:MM:SS"`.

After adjusting your time, try running `pip install` again.

### Step 2: Update `pip` and `setuptools`

Outdated versions of `pip` and `setuptools` can sometimes have bugs or lack support for newer security protocols and certificate handling mechanisms. Updating them is a good first troubleshooting step.

Open your terminal or command prompt and run:

```bash
python -m pip install --upgrade pip setuptools
```

If you are using a virtual environment, make sure it's activated before running this command. After the update, try installing your desired package.

### Step 3: Verify Your SSL Certificate Bundle

Python relies on a bundle of trusted root certificates to verify the identity of servers. Sometimes, this bundle can be missing, corrupted, or outdated.

**For Windows:**

Often, Python installers on Windows include a mechanism to download or verify these certificates. If you suspect this is an issue, you can try reinstalling Python and ensuring you select the option to install/upgrade the certificate bundle during the installation process. If you have Python installed, you can try running the `ensurepip` module:

```bash
python -m ensurepip --upgrade
```

This command can help ensure `pip` and its associated certificates are properly set up.

**For macOS:**

macOS typically manages its system-wide certificates. However, Python might use its own bundled certificates. If your Python installation is from python.org, you can try to ensure the `certifi` package is installed and up-to-date, as Python often uses this for certificate verification.

```bash
pip install --upgrade certifi
```

If you installed Python via Homebrew, you might need to ensure your system's SSL certificates are up-to-date.

**For Linux:**

On many Linux distributions, Python uses the system's OpenSSL certificates. Ensure your system is up-to-date:

*   **Debian/Ubuntu:** `sudo apt update && sudo apt upgrade`
*   **Fedora:** `sudo dnf update`
*   **CentOS/RHEL:** `sudo yum update`

After updating your system, you might need to tell Python to use the system's certificates. The `certifi` package is also a good fallback.

```bash
pip install --upgrade certifi
```

### Step 4: Bypass SSL Verification (Use with Extreme Caution!)

**This is a temporary workaround and significantly compromises security. Only use this if you are on a trusted, private network and understand the risks. It should NOT be used for general internet access or on untrusted networks.**

If you are behind a corporate firewall or proxy that is inspecting SSL traffic, it might be presenting its own certificate which your system doesn't trust. As a last resort, you can tell `pip` to ignore SSL certificate verification.

Add the `--trusted-host` flag to your `pip install` command. You'll need to specify the host you are trying to connect to (e.g., `pypi.org`).

```bash
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org your_package_name
```

**Important:** This disables certificate verification for the specified hosts, meaning `pip` will not verify the identity of the server. This makes you vulnerable to Man-in-the-Middle (MITM) attacks. This should only be used in controlled environments where you fully trust the network and the servers.

### Step 5: Configure `pip` to Use a Proxy Server

If you are in a corporate environment or behind a proxy server, `pip` needs to be configured to use it. The SSL error can occur if `pip` is not aware of the proxy or if the proxy is not correctly handling SSL traffic.

You can configure pip to use a proxy by setting environment variables:

**On Linux/macOS:**

```bash
export HTTP_PROXY="http://username:password@your_proxy_server:port"
export HTTPS_PROXY="http://username:password@your_proxy_server:port"
```

If your proxy does not require authentication, use:

```bash
export HTTP_PROXY="http://your_proxy_server:port"
export HTTPS_PROXY="http://your_proxy_server:port"
```

**On Windows:**

```batch
set HTTP_PROXY=http://username:password@your_proxy_server:port
set HTTPS_PROXY=http://username:password@your_proxy_server:port
```

Or without authentication:

```batch
set HTTP_PROXY=http://your_proxy_server:port
set HTTPS_PROXY=http://your_proxy_server:port
```

After setting these environment variables, try your `pip install` command again. For a more permanent solution, you can configure pip to use these proxies by default by creating or editing the `pip.ini` (Windows) or `pip.conf` (Linux/macOS) file in your user's home directory.

Add the following to your configuration file:

```ini
[global]
proxy = http://username:password@your_proxy_server:port
```

### Step 6: Check Firewall or Antivirus Software

Sometimes, overly aggressive firewall or antivirus software can interfere with SSL connections. They might block or alter the connection in a way that causes certificate validation to fail.

1.  **Temporarily Disable:** As a diagnostic step, try temporarily disabling your firewall or antivirus software and then attempt the `pip install` command.
2.  **Configure Exceptions:** If disabling resolves the issue, re-enable your security software and look for options to create an exception for Python or the `pip` executable. Consult your security software's documentation for instructions on how to do this.

**Remember to re-enable your security software immediately after testing.**

### Step 7: Use an Alternative Python Installation or Virtual Environment

If you've tried all the above and are still encountering issues, especially if you're working with system-wide Python installations that might be managed by an operating system or package manager, try using a dedicated virtual environment or an alternative Python installation.

**Using `venv` (built into Python 3):**

```bash
# Create a virtual environment
python -m venv myenv

# Activate the virtual environment
# On Windows:
myenv\Scripts\activate
# On macOS/Linux:
source myenv/bin/activate

# Now try installing your package within the activated environment
pip install your_package_name
```

This creates an isolated Python environment with its own set of packages and certificates, which can help bypass system-level conflicts.

## Common Mistakes

One common mistake is immediately resorting to disabling SSL verification (`--trusted-host`). While it might seem like a quick fix, it bypasses crucial security checks and leaves you vulnerable. Always exhaust other troubleshooting steps first. Another pitfall is forgetting to activate a virtual environment before running commands like `pip install --upgrade pip`, which can lead to unintended modifications of your system's Python installation. Finally, when setting proxy environments, users sometimes forget to specify the correct protocol (http/https) or miss including authentication details if required.

## Prevention Tips

To prevent future `pip install` SSL errors, regularly update your Python installation and your operating system. Keeping your system's CA certificate store up-to-date is also vital. For corporate users, maintain clear communication with your IT department regarding proxy server configurations and any potential network security policies that might affect Python package installations. Using virtual environments for all your Python projects is a best practice that isolates dependencies and avoids conflicts, including those related to SSL certificates. Finally, if you do encounter this issue frequently in a specific network environment, document the necessary proxy settings or firewall exceptions to save time in the future.