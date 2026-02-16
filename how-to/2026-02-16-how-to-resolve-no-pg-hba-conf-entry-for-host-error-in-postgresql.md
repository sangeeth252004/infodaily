---
title: "How to Resolve \"'No pg_hba.conf entry for host...' Error in PostgreSQL\""
date: "2026-02-16T10:50:03.039Z"
slug: "how-to-resolve-no-pg-hba-conf-entry-for-host-error-in-postgresql"
type: "how-to"
description: "Troubleshoot and fix the PostgreSQL \"No pg_hba.conf entry for host...\" error. Learn to configure pg_hba.conf for secure and authorized database access."
keywords: "PostgreSQL, pg_hba.conf, connection error, host access, database authentication, remote connection, psql error, fix postgresql access"
---

### Problem Explanation

The error message "'No pg_hba.conf entry for host "[IP_ADDRESS]", user "[USERNAME]", database "[DATABASE_NAME]", no encryption" indicates that the PostgreSQL server has explicitly denied an incoming connection attempt. This isn't a network connectivity issue (like a firewall blocking the port); instead, it signifies that the PostgreSQL server itself received the connection request but, based on its internal security rules, decided the requesting client is not authorized.

When you encounter this problem, you'll typically see this specific error text in your client application (e.g., `psql`, a custom application, or an ORM attempting to connect) or in the PostgreSQL server logs. The error provides critical details: the source IP address of the client, the username attempting to connect, and the database it's trying to access. These pieces of information are essential for diagnosing and resolving the issue.

### Why It Happens

PostgreSQL uses a configuration file called `pg_hba.conf` (Host-Based Authentication) to control which hosts are allowed to connect, which users can connect to which databases, and what authentication method is required for each connection. This file acts as PostgreSQL's primary gatekeeper for network access.

The "No pg_hba.conf entry for host..." error occurs because, when a connection attempt is made, PostgreSQL searches `pg_hba.conf` from top to bottom for a record that matches the incoming connection's characteristics: connection type (local, host, hostssl, hostnossl), target database, connecting user, and client IP address. If no matching entry is found, or if an entry exists but specifies an incompatible authentication method or explicitly rejects the connection, PostgreSQL denies the request and issues this error. Common root causes include: attempting to connect from a new, unconfigured IP address; using a user that isn't granted access to a specific database from a specific host; or simply forgetting to add an entry for a new client.

### Step-by-Step Solution

#### ## Step 1: Understand the Error Message and Identify Connection Details

Before making any changes, carefully examine the full error message. It provides the exact `[IP_ADDRESS]`, `[USERNAME]`, and `[DATABASE_NAME]` that PostgreSQL found problematic. For example:

```
psql: error: FATAL:  no pg_hba.conf entry for host "192.168.1.100", user "app_user", database "my_app_db", no encryption
```

From this example, we know the client IP is `192.168.1.100`, the user is `app_user`, and the database is `my_app_db`. Keep these details handy as you proceed.

#### ## Step 2: Locate the `pg_hba.conf` File

The location of `pg_hba.conf` can vary depending on your operating system and PostgreSQL installation method. The most reliable way to find it is by querying PostgreSQL itself.

1.  Connect to your PostgreSQL server using `psql` from a *local* machine or user that *already has access*. If you can't connect even locally, you might need to try connecting as the `postgres` superuser or from the server console using `sudo -u postgres psql`.
2.  Once connected, run the following command:

    ```sql
    SHOW hba_file;
    ```

    This will output the full path to the `pg_hba.conf` file, for example: `/etc/postgresql/14/main/pg_hba.conf` or `/var/lib/pgsql/data/pg_hba.conf`.
3.  Exit `psql` using `\q`.

#### ## Step 3: Back Up the `pg_hba.conf` File

Before making any modifications, always create a backup of the existing `pg_hba.conf` file. This allows you to revert to a working configuration if something goes wrong.

```bash
sudo cp /etc/postgresql/14/main/pg_hba.conf /etc/postgresql/14/main/pg_hba.conf.bak
```

Replace `/etc/postgresql/14/main/pg_hba.conf` with the actual path you found in Step 2.

#### ## Step 4: Add or Modify an Entry in `pg_hba.conf`

Open the `pg_hba.conf` file using a text editor with administrative privileges:

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

You'll need to add a new line or modify an existing one to explicitly allow the connection you identified in Step 1. The general syntax for an entry is:

```
TYPE DATABASE USER ADDRESS METHOD [OPTIONS]
```

Let's break down the common fields and provide examples:

*   **TYPE**:
    *   `local`: For Unix-domain socket connections (usually from the same machine).
    *   `host`: For TCP/IP connections, whether SSL is used or not.
    *   `hostssl`: For TCP/IP connections that *must* use SSL.
    *   `hostnossl`: For TCP/IP connections that *must not* use SSL.
*   **DATABASE**:
    *   `all`: Applies to all databases.
    *   `[DATABASE_NAME]`: Applies to a specific database (e.g., `my_app_db`).
    *   `replication`: Special database for replication connections.
*   **USER**:
    *   `all`: Applies to all users.
    *   `[USERNAME]`: Applies to a specific user (e.g., `app_user`).
*   **ADDRESS**:
    *   For `local` connections, this is `[BLANK]`.
    *   For `host` connections, this is the client's IP address and CIDR mask (e.g., `192.168.1.100/32` for a single host, `192.168.1.0/24` for a subnet).
    *   `0.0.0.0/0`: Allows connections from any IP address (use with caution and only with strong authentication methods).
    *   `127.0.0.1/32` or `::1/128`: For local connections over TCP/IP.
*   **METHOD**: The authentication method to use.
    *   `scram-sha-256` (recommended for modern PostgreSQL): Strong, password-based authentication.
    *   `md5`: Password-based authentication (legacy, but still widely used).
    *   `trust`: Allows anyone to connect without a password (**Highly insecure for remote access; use only for local, trusted environments**).
    *   `reject`: Explicitly denies the connection.
    *   `ident`, `peer`: Other methods, typically for local connections.

**Examples based on our error (`192.168.1.100`, `app_user`, `my_app_db`):**

1.  **Allow specific user (`app_user`) from a specific IP (`192.168.1.100`) to access a specific database (`my_app_db`) using `scram-sha-256` password authentication:**

    ```
    host    my_app_db    app_user    192.168.1.100/32    scram-sha-256
    ```

2.  **Allow specific user (`app_user`) from a subnet (`192.168.1.0/24`) to access *all* databases using `md5` password authentication:**

    ```
    host    all    app_user    192.168.1.0/24    md5
    ```

3.  **Allow *all users* from a specific IP (`192.168.1.100`) to access *all databases* using `scram-sha-256`:**

    ```
    host    all    all    192.168.1.100/32    scram-sha-256
    ```

4.  **Allow *all users* from *anywhere* to access *all databases* using `scram-sha-256` (less secure, use only if necessary and with strong passwords):**

    ```
    host    all    all    0.0.0.0/0    scram-sha-256
    ```

    *Self-correction:* Ensure you place the new, more specific rules *above* any broader rules that might inadvertently catch and reject the connection, as `pg_hba.conf` is processed sequentially.

Save the `pg_hba.conf` file and exit the editor.

#### ## Step 5: Reload PostgreSQL Configuration

After modifying `pg_hba.conf`, PostgreSQL needs to reload its configuration for the changes to take effect. A full restart is not usually necessary.

*   **For `systemd` based systems (most Linux distributions):**

    ```bash
    sudo systemctl reload postgresql
    # Or, if that doesn't work, try with the version-specific service:
    # sudo systemctl reload postgresql@14-main
    ```

*   **Using `pg_ctl` (if you know your data directory):**

    ```bash
    sudo -u postgres /usr/lib/postgresql/14/bin/pg_ctl reload -D /var/lib/postgresql/14/main/
    ```

    Replace `14` and the data directory path with your actual PostgreSQL version and data directory.

#### ## Step 6: Test the Connection

Now, attempt the connection again from the client that was previously failing.

```bash
psql -h 192.168.1.100 -U app_user -d my_app_db
```

If you are prompted for a password, enter it. If the connection is successful, you have resolved the issue.

#### ## Step 7: Check Firewall Rules (if still encountering issues for remote connections)

If, after modifying `pg_hba.conf` and reloading PostgreSQL, you *still* cannot connect from a remote host (especially if the error changes to something like "connection refused" or you just get a timeout), it's possible a firewall is blocking the connection *before* it even reaches PostgreSQL.

Ensure that your server's firewall (e.g., `ufw`, `firewalld`, `iptables`, or cloud provider security groups) is configured to allow inbound TCP traffic on PostgreSQL's default port, `5432`, from the client's IP address or subnet.

*   **Example for `ufw`:**

    ```bash
    sudo ufw allow from 192.168.1.100 to any port 5432
    # Or for a subnet:
    sudo ufw allow from 192.168.1.0/24 to any port 5432
    sudo ufw enable # if not already enabled
    ```

After adjusting firewall rules, retry the connection.

### Common Mistakes

*   **Incorrect CIDR Notation:** Using `192.168.1.100` instead of `192.168.1.100/32` for a single host, or an incorrect subnet mask. A `/32` is critical for a single IP.
*   **Wrong Authentication Method:** Specifying `trust` for a remote host when `md5` or `scram-sha-256` is needed (and expected by the client), or vice-versa. Always match the method the client expects.
*   **Not Reloading PostgreSQL:** Changes to `pg_hba.conf` are not applied until the PostgreSQL server is reloaded. This is a very common oversight.
*   **Editing the Wrong `pg_hba.conf`:** If you have multiple PostgreSQL installations or versions, you might be editing the `pg_hba.conf` for an inactive or incorrect instance. Always use `SHOW hba_file;` to confirm the path.
*   **Order of Rules:** The `pg_hba.conf` file is processed from top to bottom. A broader rule placed *above* a more specific rule might inadvertently match and deny a connection that a later specific rule should have allowed. Place specific rules higher up.
*   **Forgetting Server Firewall:** Even if `pg_hba.conf` is correct, an OS-level firewall will block connections before PostgreSQL can even process them.

### Prevention Tips

*   **Plan Access Requirements:** Before deploying applications or granting access, clearly define which users need to connect to which databases from which IP addresses or subnets. This proactive approach minimizes reactive troubleshooting.
*   **Use Specific CIDR Blocks:** Avoid using `0.0.0.0/0` (any host) unless absolutely necessary and always combine it with strong authentication like `scram-sha-256`. Instead, specify exact IP addresses (`/32`) or tightly controlled subnets (`/24`, `/27`, etc.).
*   **Employ Strong Authentication:** Always prefer `scram-sha-256` over `md5` for password-based authentication, and avoid `trust` for remote or production environments.
*   **Document `pg_hba.conf` Changes:** Keep a record of modifications made to `pg_hba.conf`, including the reason for each change, the date, and who made it. Comments within the file (lines starting with `#`) are useful for this.
*   **Regularly Review:** Periodically audit your `pg_hba.conf` file to remove outdated entries or tighten overly permissive ones.
*   **Understand CIDR Notation:** A solid grasp of CIDR (Classless Inter-Domain Routing) notation is crucial for correctly specifying IP ranges in `pg_hba.conf`. A `/32` means a single IP address, `/24` means the entire C-class subnet, and so on.
*   **Utilize Roles and Permissions:** Beyond host-based authentication, enforce granular access within PostgreSQL using roles, users, and grants to restrict what authenticated users can do.