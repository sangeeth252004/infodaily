---
title: "How to Fix 'SSL: CERTIFICATE_VERIFY_FAILED' Error When Using Pip"
date: "2026-05-30T16:03:50.506Z"
slug: "how-to-fix-ssl-certificate-verify-failed-error-when-using-pip"
type: "how-to"
description: "Learn to resolve the 'SSL: CERTIFICATE_VERIFY_FAILED' error when installing Python packages with Pip. This guide provides step-by-step solutions for common SSL certificate issues."
keywords: "pip SSL error, CERTIFICATE_VERIFY_FAILED, pip certificate problem, fix pip SSL, Python pip install error, SSL verification failed, trusted host pip, corporate proxy SSL"
---

The "SSL: CERTIFICATE_VERIFY_FAILED" error is a common roadblock encountered by Python developers when attempting to install packages using Pip. This frustrating message indicates that Pip, when trying to establish a secure HTTPS connection to a package index like PyPI (Python Package Index), failed to verify the authenticity of the server's SSL certificate. Instead of successfully downloading and installing your desired package, your operation halts with a traceback, often accompanied by `pip._vendor.urllib3.exceptions.MaxRetryError` and the explicit `SSLCertVerificationError` stating `CERTIFICATE_VERIFY_FAILED`.

When you encounter this error, you will typically see output similar to this in your terminal:

```
ERROR: Could not install packages due to an OSError: HTTPSConnectionPool(host='pypi.org', port=443): Max retries exceeded with url: /simple/requests/ (Caused by SSLError(SSLCertVerificationError(1, 'CERTIFICATE_VERIFY_FAILED')))
```

This specific message confirms that the issue lies with the secure connection's certificate verification, preventing Pip from trusting the server it's trying to communicate with.

### Why It Happens

The core reason for the "SSL: CERTIFICATE_VERIFY_FAILED" error is that your system, or specifically your Python environment, does not trust the SSL certificate presented by the server hosting the Python packages (most commonly pypi.org or files.pythonhosted.org). SSL/TLS certificates are digital documents that verify the identity of a website or server, ensuring that your connection is secure and you're communicating with the intended party. When this verification fails, it's a security mechanism preventing potentially malicious connections.

Several common scenarios can lead to this trust breakdown:

1.  **Outdated Certificate Authority (CA) Certificates:** Your operating system's root certificate store might be outdated. Browsers and applications rely on a set of trusted root CAs to validate server certificates. If the CA that signed PyPI's certificate (or an intermediate CA in its chain) is not present or is too old in your system's trust store, verification will fail.
2.  **Corporate Proxies and SSL Inspection:** In many corporate network environments, traffic goes through a proxy server that performs "SSL inspection." This means the proxy intercepts encrypted HTTPS traffic, decrypts it, inspects it for security threats, and then re-encrypts it with its own internally generated SSL certificate before forwarding it to your machine. If your system doesn't trust the corporate proxy's internal Certificate Authority, all HTTPS connections will fail certificate verification.
3.  **Antivirus or Firewall Interference:** Some aggressive antivirus software or network firewalls can interfere with SSL/TLS connections, sometimes by injecting their own certificates, leading to verification errors if their certificates are not trusted by your system.
4.  **Misconfigured Python Environment or `certifi`:** Less commonly, issues can arise from a corrupted or outdated `certifi` package (which Python often uses to bundle a set of trusted CA certificates) or other specific Python environment configurations.

### Step-by-Step Solution

Addressing the "SSL: CERTIFICATE_VERIFY_FAILED" error requires systematically identifying and correcting the underlying cause. Begin with the less invasive solutions and proceed as necessary.

### ## Step 1: Update Your Operating System's CA Certificates

Ensure your operating system's root certificate store is current. This is often the simplest fix if the issue is due to outdated system components.

*   **On Windows:** Ensure your Windows operating system is fully updated via Windows Update. Microsoft routinely pushes certificate updates through this mechanism.
*   **On Linux (Debian/Ubuntu):** Open a terminal and run:
    ```bash
    sudo apt update
    sudo apt install --reinstall ca-certificates
    sudo update-ca-certificates
    ```
*   **On Linux (CentOS/RHEL/Fedora):** Open a terminal and run:
    ```bash
    sudo yum update
    sudo yum install ca-certificates
    sudo update-ca-certificates
    ```
*   **On macOS:** Keep your macOS updated via System Settings/App Store. If you're using Homebrew and have explicitly linked OpenSSL, ensure it's up to date:
    ```bash
    brew update
    brew upgrade openssl
    ```
    Then, ensure Python is configured to use Homebrew's OpenSSL if needed, usually done by setting environment variables during Python compilation or via `pyenv`.

### ## Step 2: Configure Pip to Trust a Specific Certificate Bundle (Corporate Proxy)

If you are behind a corporate proxy performing SSL inspection, you will need to obtain your organization's custom root CA certificate (typically a `.pem` or `.crt` file) and tell Pip to trust it.

1.  **Obtain the corporate CA certificate:** Contact your IT department to get the `.pem` or `.crt` file for your corporate root CA.
2.  **Configure Pip:**
    *   **Method A: Environment Variable (Temporary or for automation)**
        Set the `PIP_CERT` environment variable to the path of your corporate CA certificate file.
        *   **Linux/macOS:**
            ```bash
            export PIP_CERT="/path/to/your/corporate_ca.pem"
            # Then run your pip command
            pip install <package_name>
            ```
        *   **Windows (Command Prompt):**
            ```cmd
            set PIP_CERT="C:\path\to\your\corporate_ca.pem"
            pip install <package_name>
            ```
        *   **Windows (PowerShell):**
            ```powershell
            $env:PIP_CERT="C:\path\to\your\corporate_ca.pem"
            pip install <package_name>
            ```
    *   **Method B: Pip Configuration File (Permanent)**
        Create or edit the Pip configuration file (`pip.ini` on Windows, `pip.conf` on Linux/macOS) to permanently set the `cert` option.
        *   **Location:**
            *   **Linux/macOS:** `~/.config/pip/pip.conf` (create `pip` directory if it doesn't exist within `.config`)
            *   **Windows:** `%APPDATA%\pip\pip.ini` (e.g., `C:\Users\<YourUsername>\AppData\Roaming\pip\pip.ini`)
        *   **File Content:** Add the following to the file:
            ```ini
            [global]
            cert = /path/to/your/corporate_ca.pem
            ```
            Replace `/path/to/your/corporate_ca.pem` with the actual path to your corporate certificate.

### ## Step 3: Specify a Trusted Host (Use with Caution)

If the above steps don't resolve the issue, and you understand the security implications, you can tell Pip to trust specific hosts without fully verifying their SSL certificates. This is often used as a workaround in corporate environments where the CA certificate is hard to obtain or configure.

**WARNING:** Using `--trusted-host` disables SSL certificate verification for the specified host. This makes your connection vulnerable to Man-in-the-Middle attacks if the host is compromised or if you are on an untrusted network. Use this only when absolutely necessary and you fully trust the network and hosts involved.

```bash
pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org <package_name>
```

You can make this permanent by adding it to your `pip.ini` or `pip.conf` file:

```ini
[global]
trusted-host = pypi.org
trusted-host = files.pythonhosted.org
```

### ## Step 4: Configure HTTP/HTTPS Proxy Environment Variables

If you are using a proxy server (especially in a corporate setting), ensure your proxy settings are correctly configured as environment variables. Pip respects these variables.

*   **Linux/macOS:**
    ```bash
    export HTTP_PROXY="http://user:pass@proxy.example.com:8080"
    export HTTPS_PROXY="http://user:pass@proxy.example.com:8080"
    # Or without authentication if not required
    # export HTTP_PROXY="http://proxy.example.com:8080"
    # export HTTPS_PROXY="http://proxy.example.com:8080"
    ```
*   **Windows (Command Prompt):**
    ```cmd
    set HTTP_PROXY="http://user:pass@proxy.example.com:8080"
    set HTTPS_PROXY="http://user:pass@proxy.example.com:8080"
    ```
*   **Windows (PowerShell):**
    ```powershell
    $env:HTTP_PROXY="http://user:pass@proxy.example.com:8080"
    $env:HTTPS_PROXY="http://user:pass@proxy.example.com:8080"
    ```
    Replace `user:pass@proxy.example.com:8080` with your actual proxy details. Note that `HTTPS_PROXY` might still point to an `http://` address if your proxy handles the SSL termination.

### ## Step 5: Update Pip and Python

Ensure you are using a recent version of Pip and Python, as newer versions often come with updated certificate bundles (e.g., through the `certifi` package) or improved SSL handling.

```bash
python -m pip install --upgrade pip
```

You can also try updating the `certifi` package directly:

```bash
pip install --upgrade certifi
```

### ## Step 6: Temporarily Disable SSL Verification (Absolute Last Resort)

**WARNING:** This is a severe security risk and should ONLY be used for temporary debugging on isolated, non-production systems, or if you completely understand the security implications and accept the risk. It disables ALL SSL verification, leaving you vulnerable to trivial Man-in-the-Middle attacks. Do not use this in production environments.

```bash
pip install --no-verify-ssl <package_name>
```

This command directly instructs Pip to ignore SSL certificate errors. It should be reverted or avoided for any long-term solution.

### Common Mistakes

1.  **Ignoring Security Warnings:** Blindly using `--trusted-host` or `--no-verify-ssl` without understanding the security implications is a major mistake. These options bypass crucial security checks and can expose your system to risks.
2.  **Incorrect Path to CA Certificate:** When configuring `PIP_CERT` or the `cert` option in `pip.conf`, providing an incorrect or inaccessible path to your corporate CA certificate file is a common oversight.
3.  **Mixing Solutions Inefficiently:** Trying multiple solutions simultaneously without understanding their interactions can lead to confusion. For example, setting `PIP_CERT` and then also using `--trusted-host` might override each other or lead to unexpected behavior.
4.  **Not Updating System Certificates First:** Many users jump to proxy or Pip-specific configurations before checking if a simple system-wide CA certificate update could resolve the issue. Always start with the basics.
5.  **Forgetting Proxy Authentication:** If your corporate proxy requires authentication, failing to include `user:pass@` in your `HTTP_PROXY`/`HTTPS_PROXY` environment variables will prevent connection.

### Prevention Tips

1.  **Keep Your Systems Updated:** Regularly update your operating system and its core components, including CA certificates. This ensures your system has the latest trusted root certificates.
2.  **Maintain Current Python & Pip:** Periodically update your Python installation and Pip to benefit from security patches, improved SSL handling, and updated `certifi` bundles.
3.  **Understand Your Network Environment:** If you work in a corporate environment, understand how your network handles HTTPS traffic (e.g., through SSL inspection proxies). Proactively obtain and configure the corporate root CA certificate for your development tools.
4.  **Prefer Proper Certificate Configuration:** Always opt for configuring Pip to trust a specific CA certificate (`PIP_CERT` or `cert` in `pip.conf`) over using `--trusted-host` or `--no-verify-ssl`. This maintains a secure connection while allowing you to operate within your network's constraints.
5.  **Use Virtual Environments:** While not directly preventing this error, using Python virtual environments (`venv` or `conda`) isolates your project dependencies, making troubleshooting easier and preventing system-wide configuration conflicts. Each virtual environment can be configured with specific Pip settings if needed.