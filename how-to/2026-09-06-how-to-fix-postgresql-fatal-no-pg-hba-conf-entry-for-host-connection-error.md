---
title: "How to Fix PostgreSQL 'FATAL: no pg_hba.conf entry for host...' Connection Error"
date: "2026-09-06T13:24:35.213Z"
slug: "how-to-fix-postgresql-fatal-no-pg-hba-conf-entry-for-host-connection-error"
type: "how-to"
description: "Resolve the common PostgreSQL 'FATAL: no pg_hba.conf entry for host...' error by understanding its cause and following this comprehensive step-by-step guide. Learn to configure pg_hba.conf for secure and successful database connections."
keywords: "PostgreSQL, pg_hba.conf, connection error, FATAL no pg_hba.conf entry, database connection, HBA configuration, PostgreSQL authentication, fix connection, troubleshoot PostgreSQL"
---

When attempting to connect to a PostgreSQL database, you might encounter a frustrating error message:

```
FATAL: no pg_hba.conf entry for host "your_client_ip", user "your_username", database "your_database", SSL off
```

This message clearly indicates that PostgreSQL is refusing your connection attempt because it cannot find a configuration rule that explicitly permits your specific host (identified by its IP address or hostname), the username you're trying to use, the database you're targeting, and the SSL status of the connection. Essentially, PostgreSQL is saying, "I don't know who you are, where you're coming from, or what you want to do, so I can't let you in."

## Why It Happens

The root cause of the "FATAL: no pg_hba.conf entry for host..." error lies within PostgreSQL's host-based authentication system, managed by the `pg_hba.conf` file. This file acts as a firewall and access control list for your PostgreSQL server. It defines which hosts are allowed to connect, to which databases, as which users, and using which authentication methods. PostgreSQL reads this file from top to bottom. If it processes all the rules and doesn't find a match for your connection request, it defaults to denying access, hence the "no entry" error.

This error typically occurs in several scenarios:

*   **New installations or configurations:** When setting up PostgreSQL for the first time or making significant network changes, the default `pg_hba.conf` might be too restrictive or not configured for your specific client environment.
*   **Connecting from a different IP address or network:** If you're connecting from a new machine, a different subnet, or a remote location, your current IP address likely doesn't have a corresponding entry.
*   **Using a different username or database:** Even if your IP is allowed, the combination of username and database might not be explicitly permitted.
*   **Incorrect authentication method:** The `pg_hba.conf` might specify an authentication method (like `md5` or `scram-sha-256`) that your client application or tool is not configured to use.
*   **SSL enabled/disabled mismatch:** The error message often specifies `SSL off`. If your client is attempting to connect with SSL enabled, and there's no `pg_hba.conf` entry for that specific combination, you'll get this error. Conversely, if your client attempts to connect without SSL and no matching entry exists, the same error will appear.

## Step-by-Step Solution

To resolve this error, you need to locate and modify the `pg_hba.conf` file to include an entry that matches your connection attempt.

### Step 1: Locate Your PostgreSQL Configuration Directory

The `pg_hba.conf` file is located within your PostgreSQL installation's configuration directory. The exact path varies depending on your operating system and installation method.

*   **Linux (Package Manager):**
    *   Debian/Ubuntu: `/etc/postgresql/<version>/<cluster_name>/pg_hba.conf` (e.g., `/etc/postgresql/14/main/pg_hba.conf`)
    *   RHEL/CentOS/Fedora: `/var/lib/pgsql/<version>/data/pg_hba.conf` (e.g., `/var/lib/pgsql/14/data/pg_hba.conf`)
*   **macOS (Homebrew):**
    *   `/usr/local/var/postgres/pg_hba.conf` or similar, depending on your Homebrew prefix.
*   **Windows:**
    *   `C:\Program Files\PostgreSQL\<version>\data\pg_hba.conf`

You can also find the configuration directory by connecting to your database using `psql` (if you can connect locally) and running the following query:

```sql
SHOW hba_file_location;
```

This will output the full path to the `pg_hba.conf` file.

### Step 2: Access the `pg_hba.conf` File with Appropriate Permissions

Once you've located the file, you'll need to edit it. This usually requires administrative privileges.

*   **Linux/macOS:** Use a text editor with `sudo`:
    ```bash
    sudo nano /etc/postgresql/14/main/pg_hba.conf
    # or
    sudo vi /var/lib/pgsql/14/data/pg_hba.conf
    ```
    (Replace the path with your actual file path.)
*   **Windows:** Open your text editor (like Notepad or VS Code) as an administrator, then navigate to and open the `pg_hba.conf` file.

### Step 3: Understand the `pg_hba.conf` File Structure

Before making changes, it's crucial to understand the format of each line in `pg_hba.conf`. Each line defines a rule and consists of seven fields, separated by spaces:

`TYPE DATABASE USER ADDRESS METHOD [OPTIONS]`

*   **TYPE:** The type of connection. Common values are:
    *   `local`: For Unix-domain socket connections (when the client is on the same machine as the server).
    *   `host`: For TCP/IP connections (including SSL and non-SSL connections).
    *   `hostssl`: For SSL-encrypted TCP/IP connections only.
    *   `hostnossl`: For non-SSL TCP/IP connections only.
*   **DATABASE:** The database(s) the rule applies to. Wildcards can be used (`*` for all, a comma-separated list for specific databases).
*   **USER:** The user(s) the rule applies to. Wildcards can be used (`*` for all users).
*   **ADDRESS:** The client IP address or hostname range.
    *   `127.0.0.1/32`: Localhost IPv4.
    *   `::1/128`: Localhost IPv6.
    *   `0.0.0.0/0`: Any IPv4 address (use with caution).
    *   `::/0`: Any IPv6 address (use with caution).
    *   `192.168.1.0/24`: A subnet.
    *   A specific IP address (e.g., `192.168.1.100/32`).
*   **METHOD:** The authentication method to use. Common values are:
    *   `trust`: Grants access without a password (highly insecure, only for trusted environments).
    *   `reject`: Rejects the connection outright.
    *   `md5`: Requires a password encrypted with MD5.
    *   `scram-sha-256`: Requires a password encrypted with SCRAM-SHA-256 (recommended for newer PostgreSQL versions).
    *   `password`: Requires a plain-text password (highly insecure, avoid).
    *   `ident`: For TCP/IP connections, it uses the client's OS username to verify the PostgreSQL username (typically only used with local connections).
    *   `peer`: For local connections, it verifies the client's OS username against the PostgreSQL username.
*   **OPTIONS (Optional):** Additional parameters like `clientcert=verify-full` for certificate authentication.

### Step 4: Add a New Entry to `pg_hba.conf`

This is the core step to fix the error. You need to add a line that explicitly allows your connection.

**Example Scenarios and Corresponding Entries:**

*   **Allowing connections from your local machine's IP address for any user and any database, using SCRAM-SHA-256 authentication:**
    Find your client's IP address (e.g., `192.168.1.150`). Add this line:
    ```
    host    all             all             192.168.1.150/32         scram-sha-256
    ```
    *Note: If you need to allow connections from a specific subnet, use CIDR notation like `192.168.1.0/24`.*

*   **Allowing connections from any IP address for a specific user and database (use with extreme caution and strong passwords):**
    ```
    host    mydatabase      myuser          0.0.0.0/0                scram-sha-256
    ```
    **Security Warning:** `0.0.0.0/0` (any IPv4) or `::/0` (any IPv6) are very insecure. Only use them if absolutely necessary and if you have robust network security in place. It's generally better to restrict access to specific IP addresses or subnets.

*   **Allowing connections from your local network (e.g., 192.168.1.x) for any user and database:**
    ```
    host    all             all             192.168.1.0/24           scram-sha-256
    ```

*   **If the error message indicates SSL off, and you want to allow non-SSL connections from your IP:**
    ```
    hostnossl all             all             192.168.1.150/32         scram-sha-256
    ```
    Or, if you want to allow both SSL and non-SSL connections from your IP:
    ```
    host    all             all             192.168.1.150/32         scram-sha-256
    ```
    The `host` type generally covers both SSL and non-SSL when `ssl=true` is not explicitly specified in the `OPTIONS` column.

**Placement Matters:** PostgreSQL reads `pg_hba.conf` from top to bottom. More specific rules should generally come before more general rules. For instance, a rule for `192.168.1.150/32` should typically appear before a rule for `192.168.1.0/24`. If a more general rule appears first, it might prevent the more specific rule from ever being evaluated.

### Step 5: Save the `pg_hba.conf` File

After adding your new entry, save the file.

*   **Nano (Linux/macOS):** Press `Ctrl+X`, then `Y` to confirm, and `Enter` to save.
*   **Vim (Linux/macOS):** Press `Esc`, then type `:wq` and press `Enter`.
*   **Windows:** Click `File > Save` in your text editor.

### Step 6: Reload PostgreSQL Configuration

For the changes in `pg_hba.conf` to take effect, you need to tell the PostgreSQL server to reload its configuration. You do **not** need to restart the entire server.

*   **Linux (Systemd):**
    ```bash
    sudo systemctl reload postgresql
    # or if using a specific cluster name
    sudo systemctl reload postgresql@<version>-<cluster_name>
    ```
    (e.g., `sudo systemctl reload postgresql@14-main`)

*   **Linux (SysVinit):**
    ```bash
    sudo service postgresql reload
    ```

*   **macOS (Homebrew):**
    ```bash
    brew services reload postgresql
    ```

*   **Windows:**
    Open the Services management console (`services.msc`), find your PostgreSQL service (e.g., `postgresql-x64-14`), right-click it, and select "Restart". While reload is preferred on Linux, a restart is often necessary on Windows to apply configuration changes.

### Step 7: Test Your Connection

Try connecting to the PostgreSQL database again from your client machine. If you've correctly identified your client's IP, username, and database, and added an appropriate entry to `pg_hba.conf`, the connection should now succeed.

## Common Mistakes

One of the most frequent mistakes is **not understanding the IP address being used**. Clients can sometimes appear to connect from a different IP than you expect, especially if they are behind NAT or a proxy. Always double-check the actual source IP address reported by the PostgreSQL server in the error message or by your client application.

Another common pitfall is **using overly broad IP ranges** like `0.0.0.0/0` without considering the security implications. This allows *any* machine on the internet to attempt a connection, significantly increasing your attack surface. Unless you have very specific, well-justified reasons and robust security measures, stick to specific IPs or narrow subnets.

Forgetting to **reload the PostgreSQL configuration** after editing `pg_hba.conf` is also a frequent oversight. Changes to `pg_hba.conf` are not applied until the server reloads this file.

Finally, **case sensitivity** in usernames or database names is important. Ensure the names in your `pg_hba.conf` entry match exactly, including case, unless you are using wildcards effectively.

## Prevention Tips

To prevent the "FATAL: no pg_hba.conf entry for host..." error in the future, adopt a proactive approach to your PostgreSQL security and configuration.

**Maintain a Clear and Granular `pg_hba.conf`:** Instead of relying on very general rules, aim for specific entries for each client, network, or application that needs database access. Document who needs access to what, from where, and with which authentication method.

**Use Strong Authentication Methods:** Always prefer `scram-sha-256` over `md5`, and absolutely avoid `password` or `trust` in production environments. Ensure your users have strong, unique passwords.

**Regularly Review Your `pg_hba.conf`:** Periodically audit your `pg_hba.conf` file. Remove any outdated entries for users or hosts that no longer require access. This is crucial for maintaining a secure environment.

**Consider Using Environment Variables or Configuration Management Tools:** For larger or more complex deployments, consider automating the management of `pg_hba.conf` using tools like Ansible, Chef, or Puppet. This ensures consistency and reduces manual errors.

By understanding the mechanics of `pg_hba.conf` and implementing these preventive measures, you can significantly reduce the likelihood of encountering connection errors and enhance the overall security posture of your PostgreSQL database.