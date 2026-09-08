---
title: "How to Fix Git 'SSL certificate problem: unable to get local issuer certificate' Error"
date: "2026-09-08T22:22:38.544Z"
slug: "how-to-fix-git-ssl-certificate-problem-unable-to-get-local-issuer-certificate-error"
type: "how-to"
description: "A comprehensive guide to fixing the Git 'SSL certificate problem: unable to get local issuer certificate' error, covering root causes, step-by-step solutions for Windows and Linux/macOS, proxy configurations, and prevention tips."
keywords: "Git, SSL certificate problem, unable to get local issuer certificate, Git SSL error, Git proxy, Git certificate fix, cacert.pem, curl-ca-bundle.crt, http.sslVerify, http.sslCAInfo, corporate proxy, Git security"
---

### Problem Explanation

When attempting to perform Git operations like `git clone`, `git fetch`, or `git push` against a remote repository over HTTPS, you might encounter a `fatal` error message indicating an SSL certificate problem. The most common manifestation of this issue is:

```
fatal: unable to access 'https://github.com/your-username/your-repo.git/': SSL certificate problem: unable to get local issuer certificate
```

This error signals that Git, specifically its underlying OpenSSL library, cannot establish a trusted, secure connection with the remote server. The server presents an SSL certificate as proof of its identity, but Git's local certificate store does not contain the necessary Root Certificate Authority (CA) or an intermediate CA in the certificate chain to verify that identity. In essence, Git doesn't trust the certificate being presented by the server, preventing any secure communication.

### Why It Happens

This problem primarily arises when Git cannot properly validate the authenticity of the SSL certificate presented by the remote server. Git relies on a bundle of trusted Root CA certificates to verify the server's identity. If the server's certificate (or any certificate in its chain of trust) is not signed by a CA present in Git's local trust store, the connection is aborted with the aforementioned error. Several common scenarios lead to this situation:

*   **Corporate Proxies or Firewalls with SSL Inspection:** Many organizations deploy "man-in-the-middle" proxies that intercept and re-sign SSL/TLS traffic. When you try to connect to an external service like GitHub, the proxy intercepts the connection, decrypts it, inspects it, and then re-encrypts it using its own internal Root CA certificate. Your Git client, however, does not inherently trust this internal corporate CA, leading to the "unable to get local issuer certificate" error.
*   **Outdated CA Bundle:** Git for Windows, in particular, often ships with a `curl-ca-bundle.crt` file containing trusted CA certificates. If this bundle is outdated, it might lack newer Root CAs required to validate certificates issued by modern services.
*   **Missing or Incorrect `sslCAInfo` Configuration:** Git might not be configured to point to the correct CA bundle file, or the file specified might be incomplete or corrupted.
*   **Self-Signed Certificates:** If you are connecting to an internal Git server that uses a self-signed SSL certificate not issued by a publicly trusted CA, Git will not trust it by default.

### Step-by-Step Solution

This section provides actionable steps to resolve the Git 'SSL certificate problem'. The solutions range from general checks to specific configurations for different operating systems and proxy environments.

#### ## Step 1: Initial Diagnosis and Network Check

Before diving into configuration changes, it's crucial to perform a quick diagnosis.

1.  **Check Network Connectivity:** Ensure you can reach the remote Git host.
    *   Open your terminal or command prompt and try to ping the host:
        ```bash
        ping github.com
        ```
    *   If you're using a proxy, try accessing the URL in a web browser. If it works, the issue is likely Git's configuration, not general network blockage.
2.  **Identify Proxy Presence:** Determine if you are operating behind a corporate proxy.
    *   Check environment variables:
        ```bash
        # Linux/macOS
        echo $http_proxy
        echo $https_proxy
        # Windows (Command Prompt)
        echo %http_proxy%
        echo %https_proxy%
        ```
    *   Check existing Git proxy configuration:
        ```bash
        git config --global --get http.proxy
        git config --global --get https.proxy
        ```
    If these return values, a proxy is likely configured, and it's a strong candidate for the root cause.

#### ## Step 2: Temporarily Disable SSL Verification (Diagnostic ONLY)

While **not recommended for long-term use due to security implications**, temporarily disabling SSL verification can help confirm that the certificate problem is indeed the core issue. If Git operations succeed after this, you've pinpointed the problem.

1.  **Disable SSL Verification globally:**
    ```bash
    git config --global http.sslVerify false
    ```
2.  **Test a Git command:**
    ```bash
    git ls-remote https://github.com/your-username/your-repo.git
    ```
    (Replace with any actual repository URL you're trying to access)
3.  **Immediately re-enable SSL verification:** After testing, **revert this change** to maintain security.
    ```bash
    git config --global http.sslVerify true
    ```
    or, to completely remove the setting:
    ```bash
    git config --global --unset http.sslVerify
    ```
    If operations succeeded with verification disabled, proceed to the more robust solutions below.

#### ## Step 3: Update or Configure Git's CA Bundle (Windows Specific)

Git for Windows often relies on its own bundled `curl-ca-bundle.crt`. If this is outdated, it won't recognize newer certificates.

1.  **Download the latest `cacert.pem`:** Visit the official `curl` website: `https://curl.se/docs/caextract.html` and download the `cacert.pem` file. This file contains a current list of trusted root certificates.
2.  **Save the file:** Save `cacert.pem` to a location where it won't be accidentally deleted, for example:
    *   `C:\Program Files\Git\mingw64\ssl\certs\cacert.pem` (overwriting the default `curl-ca-bundle.crt` after renaming it if you prefer)
    *   A custom, accessible path like `C:\Users\YourUser\AppData\Local\git-certs\cacert.pem`
3.  **Configure Git to use the new bundle:**
    ```bash
    git config --global http.sslCAInfo "C:/path/to/cacert.pem"
    ```
    **Important:** Use forward slashes (`/`) for paths in Git configuration, even on Windows.
    For example: `git config --global http.sslCAInfo "C:/Users/YourUser/AppData/Local/git-certs/cacert.pem"`

#### ## Step 4: Utilize System CA Certificates (Linux/macOS)

On Linux and macOS, Git typically leverages the operating system's trust store. Ensure your system's CA certificates are up to date.

1.  **Update System CA Certificates:**
    *   **Debian/Ubuntu:**
        ```bash
        sudo apt update && sudo apt install --reinstall ca-certificates
        sudo update-ca-certificates
        ```
    *   **CentOS/RHEL/Fedora:**
        ```bash
        sudo yum update ca-certificates
        sudo update-ca-trust extract
        ```
    *   **macOS (via Homebrew):** Homebrew often handles this when `git` or `curl` are installed. Ensure your system is generally up to date.
2.  **Ensure Git uses the system's SSL backend:**
    ```bash
    git config --global http.sslBackend "openssl"
    ```
    This is usually the default, but it explicitly tells Git to use the OpenSSL library, which in turn consults the system's certificate store.
3.  **Explicitly point to system CA path (if necessary):**
    ```bash
    git config --global http.sslCAPath /etc/ssl/certs
    ```
    (On some systems, this might be `/etc/pki/tls/certs` or similar. Only use `sslCAPath` if `sslCAInfo` (pointing to a single file) does not resolve the issue, as `sslCAPath` expects a directory with hashed certificate files.)

#### ## Step 5: Configure for Corporate Proxies (Adding Custom CA)

If you are behind a corporate proxy performing SSL inspection, you need to instruct Git to trust your organization's internal Root CA certificate.

1.  **Obtain the Corporate Root CA Certificate:** Contact your IT department to get their Root CA certificate. They should provide it in `.pem` or `.crt` format.
2.  **Combine with Existing CA Bundle (Windows):**
    *   Open your `cacert.pem` (from Step 3) or the original `curl-ca-bundle.crt` in a text editor.
    *   Append the contents of your corporate `.pem` or `.crt` file to the end of your `cacert.pem` file. Ensure there's a newline between the existing content and the new certificate.
    *   Make sure `git config --global http.sslCAInfo` points to this combined file.
3.  **Add to System Trust Store (Linux/macOS):**
    *   Copy your corporate CA certificate file (e.g., `corp-ca.crt`) to the appropriate directory:
        ```bash
        sudo cp /path/to/corp-ca.crt /usr/local/share/ca-certificates/
        ```
    *   Update the system's CA certificates:
        ```bash
        sudo update-ca-certificates
        ```
        This command integrates your custom CA into the system's trust store, which Git should then pick up.
4.  **Configure Git Proxy Settings (if not already done):**
    Ensure Git knows about your proxy server. Replace `username:password@proxyserver:port` with your actual proxy details.
    ```bash
    git config --global http.proxy http://username:password@proxyserver:port
    git config --global https.proxy https://username:password@proxyserver:port
    ```
    If your proxy doesn't require authentication, omit `username:password@`.

#### ## Step 6: Verify the Fix

After applying the relevant solutions, re-test your Git operations.

1.  **Try a simple `git ls-remote`:**
    ```bash
    git ls-remote https://github.com/your-username/your-repo.git
    ```
2.  **Attempt your original failing command** (e.g., `git clone`, `git pull`).

If the commands execute without the SSL certificate error, your problem is resolved.

#### ## Step 7: Revert Temporary Changes (if applicable)

If you temporarily disabled `http.sslVerify` in Step 2, ensure it has been re-enabled or unset:

```bash
git config --global --unset http.sslVerify
```

### Common Mistakes

When addressing SSL certificate issues with Git, users often fall into several common traps that can either compromise security or lead to continued frustration:

*   **Permanently Disabling SSL Verification:** The most critical mistake is leaving `git config --global http.sslVerify false` enabled. While it resolves the immediate error, it completely bypasses certificate validation, leaving your connections vulnerable to man-in-the-middle attacks and compromising data integrity. This setting should only be used for diagnosis and immediately reverted.
*   **Incorrect Path to CA Bundle:** On Windows, specifying the `http.sslCAInfo` path with backslashes (`C:\path\to\cert.pem`) instead of forward slashes (`C:/path/to/cert.pem`) is a frequent error. Git configuration expects forward slashes, even on Windows. Also, ensure the path points to the actual file and that the file is readable by the user running Git.
*   **Not Including All Certificates in the Chain:** For corporate proxies, sometimes IT provides only an intermediate CA certificate, not the Root CA, or a single certificate when a chain is expected. The `sslCAInfo` file should contain the entire chain of trust from the issuer of the server certificate up to the trusted root. If appending a corporate certificate, ensure the complete certificate (including `-----BEGIN CERTIFICATE-----` and `-----END CERTIFICATE-----` markers) is copied correctly.
*   **Forgetting to Configure Proxy Settings:** Even if the CA bundle is correctly set up, Git still needs to know *how* to route traffic through the proxy if one is present. Overlooking `http.proxy` and `https.proxy` configurations will prevent connections from reaching the remote server.
*   **Confusing `http.sslCAInfo` with `http.sslCAPath`:** `sslCAInfo` expects a single file containing one or more certificates. `sslCAPath` expects a directory containing multiple certificate files, usually named with specific hash values, which requires a utility like `c_rehash` to set up correctly. For most custom CA bundle scenarios, `sslCAInfo` pointing to a single combined `.pem` file is the simpler and more appropriate choice.

### Prevention Tips

Preventing the 'SSL certificate problem' error involves maintaining a secure and up-to-date Git environment, especially when operating within corporate networks.

*   **Keep Git Updated:** Regularly update your Git client to the latest stable version. Newer versions often include updated CA bundles and improvements in how they handle SSL/TLS connections, potentially resolving compatibility issues with modern server certificates.
*   **Maintain System CA Certificates:** On Linux and macOS, ensure your operating system's CA certificates are kept current. Regular system updates (e.g., `sudo apt upgrade` on Debian/Ubuntu, `sudo yum update` on CentOS/RHEL) typically handle this. For corporate environments, ensure the internal Root CA is consistently distributed and added to all developer machines' system trust stores.
*   **Standardize Git Configuration for Corporate Environments:** If your organization uses an SSL-intercepting proxy, provide clear, standardized instructions and scripts for developers to configure Git's `http.proxy`, `https.proxy`, and `http.sslCAInfo` settings. This ensures everyone has the correct corporate Root CA certificate integrated into their Git setup, reducing individual troubleshooting time.
*   **Understand and Properly Configure Proxies:** From the outset, identify if you are behind a proxy and configure Git accordingly. Don't wait for an error to occur. Proactive configuration of proxy URLs and authentication details (`git config --global http.proxy ...`) can prevent this error before it even appears.
*   **Avoid Permanent Disabling of SSL Verification:** Reiterate the importance of never permanently disabling `http.sslVerify`. It's a critical security feature. If a solution requires disabling it temporarily for diagnosis, make the re-enabling or unsetting of the configuration an immediate follow-up step.