---
title: "How to Fix 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY' During `npm install`"
date: "2026-10-15T14:40:18.989Z"
slug: "how-to-fix-unable-to-get-issuer-cert-locally-during-npm-install"
type: "how-to"
description: "Troubleshoot and resolve the common 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY' error when running `npm install`. This guide provides clear steps, explanations, and prevention tips."
keywords: "npm install error, UNABLE_TO_GET_ISSUER_CERT_LOCALLY, certificate error, npm troubleshooting, node.js SSL, npm registry, certificate authority"
---

## Problem Explanation

When you attempt to install Node.js packages using the Node Package Manager (npm), you might encounter a frustrating error message indicating an issue with certificate verification. The most common manifestation of this problem is the `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` error. This typically appears in your terminal output during the `npm install` command, interrupting the package download and installation process. You'll see a series of connection and SSL-related messages leading up to the definitive error, often looking something like this:

```
npm ERR! code UNABLE_TO_GET_ISSUER_CERT_LOCALLY
npm ERR! errno 1
npm ERR! cert_get_error unable to get local issuer certificate
```

This error signifies that npm, or the underlying Node.js runtime, cannot verify the authenticity of the SSL certificate presented by the npm registry (or another package source). Without proper verification, npm refuses to establish a secure connection and download packages, leaving your project in an incomplete state.

## Why It Happens

The `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` error occurs because your system or Node.js environment is unable to locate or trust the Certificate Authority (CA) that signed the SSL certificate of the server it's trying to connect to. When you visit a secure website (HTTPS), your browser or application checks the server's certificate against a list of trusted root CAs. If the issuer of the server's certificate isn't found in your system's trusted store, or if the chain of trust is broken, you get this error.

In the context of `npm install`, this often points to a few key issues. Firstly, your system's CA bundle might be outdated or incomplete. Operating systems and Node.js versions rely on a set of trusted certificates to validate secure connections. If this bundle is not up-to-date, it won't recognize newer certificates issued by legitimate CAs. Secondly, corporate network environments frequently use proxy servers or firewalls that intercept and re-sign SSL certificates to inspect traffic. This process can break the original certificate chain, leading to verification failures unless your system is configured to trust the proxy's issuing certificate. Finally, issues with Node.js installation or configuration itself can sometimes lead to incorrect certificate handling.

## Step-by-Step Solution

Here's a comprehensive approach to resolve the `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` error:

### Step 1: Update Your System's Certificate Authority Bundle

Outdated CA certificates are a frequent culprit. Ensure your operating system's root certificates are up-to-date.

*   **On Windows:** Windows updates typically include certificate updates. Ensure your system is configured to receive these updates. You can manually check for updates via `Settings > Update & Security > Windows Update`.
*   **On macOS:** macOS updates also refresh the system's trust store. Go to `System Preferences > Software Update` and install any available updates.
*   **On Linux:** The process varies by distribution.
    *   **Debian/Ubuntu:** Run `sudo apt update && sudo apt upgrade ca-certificates`
    *   **Fedora/CentOS/RHEL:** Run `sudo dnf update ca-certificates` or `sudo yum update ca-certificates`

After updating, try running `npm install` again.

### Step 2: Reinstall Node.js and npm

A corrupted Node.js or npm installation can cause certificate issues. Reinstalling can often resolve these problems.

1.  **Uninstall Node.js:** Refer to your operating system's documentation for the correct uninstallation procedure. For example, on macOS, you might remove files in `/usr/local/lib/node` and `/usr/local/bin/node`. On Linux, use your package manager (e.g., `sudo apt remove nodejs npm`).
2.  **Download the Latest LTS Version:** Visit the official Node.js website ([https://nodejs.org/](https://nodejs.org/)) and download the latest Long Term Support (LTS) version for your operating system.
3.  **Install Node.js:** Run the installer and follow the on-screen instructions. This will typically reinstall both Node.js and npm.
4.  **Verify Installation:** Open a new terminal window and run `node -v` and `npm -v` to confirm they are installed and show recent versions.

Try `npm install` again.

### Step 3: Configure npm to Use a Different Registry (if applicable)

Sometimes, the issue might be with the default npm registry or a specific mirror. Trying a different registry can help isolate the problem.

1.  **Check Current Registry:** Run `npm config get registry` to see your current registry.
2.  **Set to Public Registry:** If you suspect a proxy or internal network issue, temporarily switch to the public npm registry:
    ```bash
    npm config set registry https://registry.npmjs.org/
    ```
3.  **Install Packages:** Run `npm install` again.
4.  **Revert Registry (Optional):** If this fixes the issue and you need to return to your previous registry, you'll need to know what it was and set it back using `npm config set registry <your_original_registry_url>`.

### Step 4: Update npm's Certificate Authority (CA) Bundle

npm can be configured to use a specific CA bundle. If your system's bundle is problematic, you can point npm to a known good one.

1.  **Download a Public CA Bundle:** A common and reliable source is the one provided by Node.js itself. You can download it from the Node.js repository. Alternatively, many Linux distributions provide a `ca-certificates.crt` file. For example, on Debian/Ubuntu, it's usually at `/etc/ssl/certs/ca-certificates.crt`.
2.  **Set npm Configuration:** Use the `npm config set` command to specify the path to your CA bundle file. Replace `/path/to/your/ca-bundle.crt` with the actual path:
    ```bash
    npm config set cafile /path/to/your/ca-bundle.crt
    ```
    If you're on Linux and using the system's bundle, you might use:
    ```bash
    npm config set cafile /etc/ssl/certs/ca-certificates.crt
    ```
3.  **Verify Setting:** Run `npm config get cafile` to confirm the setting.
4.  **Test Installation:** Run `npm install`.

### Step 5: Bypass SSL Certificate Verification (Use with Extreme Caution)

**This is a temporary workaround and should only be used if you understand the security implications.** Bypassing SSL verification means your connection will not be encrypted or authenticated, making you vulnerable to man-in-the-middle attacks. **Never use this in production environments or on untrusted networks.**

1.  **Set npm Configuration:**
    ```bash
    npm config set strict-ssl false
    ```
2.  **Test Installation:** Run `npm install`.
3.  **Revert Setting (CRITICAL):** Once your packages are installed, immediately revert this setting to re-enable SSL verification:
    ```bash
    npm config set strict-ssl true
    ```
    Or, to remove the setting entirely and revert to the default:
    ```bash
    npm config delete strict-ssl
    ```

### Step 6: Configure Proxy Settings (If Behind a Corporate Proxy)

If you are in a corporate network, your proxy server might be interfering with SSL certificates. You need to configure npm with your proxy details and potentially tell it to trust the proxy's certificate.

1.  **Identify Proxy Details:** Obtain your HTTP and HTTPS proxy server addresses and port numbers.
2.  **Configure npm Proxy:**
    ```bash
    npm config set proxy http://your_proxy_address:port
    npm config set https-proxy http://your_proxy_address:port
    ```
    Replace `your_proxy_address:port` with your actual proxy details.
3.  **Configure CA Certificate for Proxy:** If your proxy uses a custom certificate, you'll need to get that certificate file and tell npm to use it.
    ```bash
    npm config set cafile /path/to/your/proxy-ca-certificate.pem
    ```
    You might also need to set `NODE_EXTRA_CA_CERTS` environment variable.
4.  **Test Installation:** Run `npm install`.

## Common Mistakes

One common mistake is immediately resorting to bypassing SSL verification (`strict-ssl false`) without first trying safer solutions like updating certificates or reinstalling Node.js. This bypass is a security risk and should be a last resort. Another pitfall is not restarting your terminal or IDE after making configuration changes, which can lead to the old settings persisting. Users also sometimes forget to set the `registry` back to its original value after testing a different one, which can cause ongoing issues. Finally, incorrectly specifying the path to CA certificate files in `npm config set cafile` will lead to the error persisting. Always double-check file paths.

## Prevention Tips

To prevent the `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` error from recurring, make it a habit to keep your system and Node.js installation up-to-date. Regularly run system updates, which include critical security and certificate updates. When installing Node.js, always use the official installer from nodejs.org and prefer LTS versions for stability. If you work in a corporate environment, proactively ask your IT department about proxy configurations and any necessary steps for development tools to work correctly. Documenting your npm proxy settings and any custom CA certificates used in your network can save significant troubleshooting time later. Regularly cleaning your npm cache (`npm cache clean --force`) can also sometimes resolve obscure issues, though it's not a direct fix for certificate problems.