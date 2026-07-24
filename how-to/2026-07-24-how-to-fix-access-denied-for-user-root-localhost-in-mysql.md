---
title: "How to Fix 'Access denied for user 'root'@'localhost'' in MySQL"
date: "2026-07-24T02:32:07.211Z"
slug: "how-to-fix-access-denied-for-user-root-localhost-in-mysql"
type: "how-to"
description: "A step-by-step guide to fixing the \"Access denied for user 'root'@'localhost'\" error in MySQL, covering common causes, password reset procedures, and prevention tips."
keywords: "MySQL, access denied, root user, localhost, fix error, password reset, skip grant tables, database error, MySQL troubleshooting"
---

### Problem Explanation

Encountering "Access denied for user 'root'@'localhost'" is a common and often frustrating hurdle for anyone working with MySQL, whether you're a developer, system administrator, or just learning the ropes. This specific error message indicates that your attempt to connect to the MySQL server as the `root` user, originating from `localhost` (the same machine where MySQL is running), has been rejected.

You might see this error when trying to log in via the command line using `mysql -u root -p`, or perhaps within an application that's attempting to connect to the database. The full message often looks something like:

`ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)`
or
`ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)`

The `(using password: YES/NO)` part tells you whether the connection attempt included a password or not. Regardless, the outcome is the same: MySQL refused your entry.

### Why It Happens

This "Access denied" error for the `root` user from `localhost` typically occurs due to one of a few key reasons:

1.  **Incorrect Password:** This is by far the most common cause. The password you're providing (or not providing, if the error says `(using password: NO)` and a password is expected) simply doesn't match the one stored for the `root` user in MySQL's internal grant tables. It's easy to forget a password, especially if you set it a while ago or inherited a system.
2.  **Forgotten Password:** You've genuinely forgotten the `root` password and have no way to retrieve it. This scenario requires a password reset procedure.
3.  **Root User Misconfiguration:** Less common, but possible. The `root` user might have been accidentally altered or deleted from the `mysql.user` table, or its host entry (`localhost`) might have been changed, preventing connections from the local machine.
4.  **Corrupt Grant Tables:** In rare cases, the MySQL system tables (which store user privileges) might become corrupted, leading to authentication issues.
5.  **Installation Issues:** Sometimes, a fresh installation might not have properly set up the `root` user or its initial password, leading to immediate access problems.

Essentially, the MySQL server is acting as a gatekeeper, verifying your credentials against its stored records, and it's currently saying, "Nope, you're not allowed in with those details."

### Step-by-Step Solution

To regain access to your MySQL server as the `root` user, we'll bypass the normal authentication process temporarily to reset the password. This procedure requires administrative (sudo/root) access to the server where MySQL is running.

#### ## Step 1: Stop Your MySQL Server

Before we can make changes, MySQL needs to be stopped. This ensures that no processes are writing to the grant tables while we're manipulating them, and allows us to restart the server in a special mode.

**On Linux (Systemd-based distributions like Ubuntu 16.04+, CentOS 7+, Debian 8+):**

```bash
sudo systemctl stop mysql
# Or for MariaDB:
sudo systemctl stop mariadb
```

**On Linux (SysVinit-based distributions like older Ubuntu/Debian, CentOS 6):**

```bash
sudo service mysql stop
# Or for MariaDB:
sudo service mariadb stop
```

**On macOS (using Homebrew):**

```bash
brew services stop mysql
```

**On Windows:**
Open the Services Manager (search for "Services"). Find the MySQL service (e.g., "MySQL80" or "MySQL57"), right-click it, and select "Stop."

Verify that the server has stopped by trying to connect again (it should fail immediately or time out).

#### ## Step 2: Start MySQL in Safe Mode (Skip Grant Tables)

We need to start the MySQL server in a special mode that bypasses the privilege system, allowing us to connect without a password and reset the `root` user's credentials.

**On Linux/macOS:**

Open a new terminal window. We'll start `mysqld_safe` (a wrapper for `mysqld`) which lets us run MySQL in the background.

```bash
sudo mysqld_safe --skip-grant-tables --skip-networking &
```

*   `--skip-grant-tables`: This is the crucial flag that tells MySQL to ignore the privilege system.
*   `--skip-networking`: This is a good security measure, preventing remote connections while your server is in this vulnerable state.
*   `&`: This runs the command in the background, freeing up your terminal.

Wait a few moments for the server to start in this mode. You might see some output; ignore it for now.

**On Windows:**
This process is a bit different as `mysqld_safe` is not typically used.
1.  Open an administrative Command Prompt or PowerShell.
2.  Navigate to your MySQL bin directory (e.g., `C:\Program Files\MySQL\MySQL Server 8.0\bin`).
3.  Execute:
    ```cmd
    mysqld --skip-grant-tables --skip-networking
    ```
    This will run MySQL in the foreground in the current window. Do **not** close this window. You'll open a *new* administrative command prompt for the next steps.

#### ## Step 3: Connect to MySQL as Root (Passwordless)

Now that MySQL is running without checking privileges, you can connect as the `root` user without a password.

**On Linux/macOS (in a *new* terminal window if you used `&` in Step 2):**

```bash
mysql -u root
```

**On Windows (in a *new* administrative command prompt window):**

```cmd
mysql -u root
```

You should now be presented with the MySQL prompt: `mysql>`. If you get an "Access denied" error here, double-check that MySQL is indeed running with `--skip-grant-tables` and that no other MySQL instance is active.

#### ## Step 4: Reset the Root Password

Now, let's update the `root` user's password. The command differs slightly depending on your MySQL version.

**For MySQL 8.0 and later:**

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourNewStrongPasswordHere';
```

Replace `'YourNewStrongPasswordHere'` with a strong, unique password that you'll remember.

**For MySQL 5.7.x:**

```sql
UPDATE mysql.user SET authentication_string = 'YourNewStrongPasswordHere', plugin = 'mysql_native_password' WHERE User = 'root' AND Host = 'localhost';
```
Then, you'll need to update the password using `ALTER USER` which is required for MySQL 5.7+ to hash the `authentication_string` correctly:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourNewStrongPasswordHere';
```
It's often safer to just use the `ALTER USER` command directly for 5.7 as well, which correctly handles the hashing. The first `UPDATE` step is mostly for older versions if `ALTER USER` fails.
So, for simplicity with 5.7+, after connecting, use:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourNewStrongPasswordHere';
```

**For MySQL 5.6.x and earlier:**

```sql
UPDATE mysql.user SET password = PASSWORD('YourNewStrongPasswordHere') WHERE User = 'root' AND Host = 'localhost';
```

**Important:** Replace `'YourNewStrongPasswordHere'` with your desired new password. Ensure you include the semicolon `;` at the end of the SQL command. After executing, you should see `Query OK, 0 rows affected (0.xx sec)` or `Query OK, 1 row affected (0.xx sec)`.

#### ## Step 5: Flush Privileges and Exit

After updating the password, you *must* tell MySQL to reload its grant tables so that your changes take effect.

```sql
FLUSH PRIVILEGES;
```

Then, exit the MySQL client:

```sql
exit
```

#### ## Step 6: Stop MySQL (Safe Mode) and Restart Normally

Now that the password is reset, it's crucial to properly shut down the MySQL instance running in safe mode and restart it normally.

**On Linux/macOS:**
First, find the process ID (PID) of the `mysqld_safe` process.
```bash
ps aux | grep mysqld_safe
```
You'll see output like `root 12345 ... mysqld_safe --skip-grant-tables --skip-networking`. The number `12345` is the PID.
Kill that process:
```bash
sudo kill 12345
# Replace 12345 with the actual PID you found.
```
Sometimes `killall` can be used as well, but `kill` with the specific PID is safer. If `mysqld_safe` was started by `sudo` and is running in the background, you might need to use `sudo kill <PID>`.

Then, start MySQL normally:
```bash
sudo systemctl start mysql
# Or for MariaDB:
sudo systemctl start mariadb
# Or for macOS Homebrew:
brew services start mysql
```

**On Windows:**
Go back to the administrative Command Prompt window where `mysqld --skip-grant-tables --skip-networking` is running. Press `Ctrl+C` to stop it. Then, restart the MySQL service via the Services Manager (right-click MySQL service, select "Start") or from the command line:
```cmd
net start mysqlservice
# (Replace 'mysqlservice' with your actual service name, e.g., MySQL80)
```

#### ## Step 7: Test Your New Password

Finally, try logging in with the `root` user and your newly set password to confirm everything is working correctly.

```bash
mysql -u root -p
```

When prompted for the password, enter the one you just set. You should now be greeted by the `mysql>` prompt, indicating successful login. Congratulations!

### Common Mistakes

When performing this password reset, it's easy to stumble into a few common pitfalls:

*   **Forgetting `FLUSH PRIVILEGES`:** This is probably the most frequent mistake. If you don't run `FLUSH PRIVILEGES;` after updating the password, MySQL won't reload its grant tables, and your new password won't be recognized until the server is fully restarted. You'll still get "Access denied."
*   **Not fully stopping `mysqld_safe`:** If you started MySQL with `mysqld_safe --skip-grant-tables &`, forgetting to kill that process before attempting to start the regular MySQL service can lead to port conflicts or confusing errors. Ensure you find and `kill` the background `mysqld_safe` process.
*   **Incorrect `ALTER USER` or `UPDATE` syntax:** MySQL versions handle password changes differently. Using a command meant for an older version on a newer one (or vice-versa) can lead to errors or a password that doesn't actually work. Always double-check your MySQL version.
*   **Trying to connect to a different host:** Remember that the `root` user for `localhost` is specific. If you're trying to connect from a different machine or IP address, this reset won't help unless that host is also explicitly configured for the `root` user.
*   **Closing the Windows `mysqld` command prompt:** If you started `mysqld --skip-grant-tables --skip-networking` on Windows, closing that command prompt window will terminate the MySQL server, preventing you from completing the next steps.

### Prevention Tips

To avoid running into the "Access denied" nightmare again, consider these best practices:

*   **Use Strong, Unique Passwords:** This goes without saying for any account, but especially for your database root user. Use a mix of uppercase and lowercase letters, numbers, and symbols. Consider using a password manager.
*   **Create Dedicated Users for Applications:** Never use the `root` user for your applications or even for regular development tasks. Create specific users with the minimum necessary privileges for each application or purpose. For example, `myapp_user` with `SELECT`, `INSERT`, `UPDATE`, `DELETE` permissions only on `mydb.myapp_table`. This limits the damage if an application's credentials are compromised.
*   **Document Passwords Securely:** If you're managing multiple servers or working in a team, securely document all critical passwords. A shared, encrypted password manager is ideal.
*   **Regularly Back Up Your `mysql` Database:** The `mysql` database contains the grant tables (user permissions). While not a direct solution for a forgotten password, having a backup can be invaluable for restoring users and privileges in case of corruption or accidental deletion.
*   **Avoid `--skip-grant-tables` in Production:** The `--skip-grant-tables` option should *only* be used for emergency recovery procedures like this. Running a production server with this enabled is a massive security risk, as anyone can connect without authentication.
*   **Understand User and Host:** Remember that `user@host` is the full identity. `root@localhost` is distinct from `root@'192.168.1.100'` or `root@'%'`. Be mindful of which host entry you are modifying or trying to connect from.