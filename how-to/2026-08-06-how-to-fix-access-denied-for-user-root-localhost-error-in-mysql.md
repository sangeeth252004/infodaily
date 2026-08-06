---
title: "How to Fix \"Access denied for user 'root'@'localhost'\" Error in MySQL"
date: "2026-08-06T07:37:34.283Z"
slug: "how-to-fix-access-denied-for-user-root-localhost-error-in-mysql"
type: "how-to"
description: "A comprehensive, step-by-step guide to diagnose and fix the MySQL \"Access denied for user 'root'@'localhost'\" error, covering common causes, password reset procedures, and prevention tips."
keywords: "MySQL, Access denied, root@localhost, error fix, reset root password, skip-grant-tables, authentication error, database access, localhost connection, SQL troubleshooting"
---

### Problem Explanation

The "Access denied for user 'root'@'localhost'" error is a common and frustrating issue for MySQL users, particularly when trying to connect to a local MySQL server instance. This specific error message indicates that the MySQL server successfully received your connection attempt but rejected it because the credentials provided for the `root` user from `localhost` were deemed invalid.

When this problem occurs, you'll typically see the full error message in your terminal after attempting to connect using the `mysql -u root -p` command, often followed by `(using password: YES)` or `(using password: NO)`. Similarly, applications or scripts attempting to connect to MySQL as `root` from the local machine will fail and log a similar "Access denied" message, preventing any database operations from proceeding.

### Why It Happens

This error primarily stems from an authentication or authorization failure involving the `root` user and its `localhost` origin. The most frequent root causes include:

1.  **Incorrect Password:** The password you're providing for the `root` user is simply wrong or has been forgotten. This is by far the most common reason.
2.  **Password Mismatch/Corruption:** The stored password for `root` in the `mysql.user` table might be corrupted, or the client's cached password doesn't match the server's.
3.  **Authentication Plugin Issues:** MySQL 5.7+ and 8.0+ use different default authentication plugins (e.g., `caching_sha2_password` vs. `mysql_native_password`). If the `root` user is configured with a plugin that your client library doesn't support or if the server's plugin configuration is misaligned, this error can occur.
4.  **`root` User Not Configured for `localhost`:** Although less common for the default `root` user, it's possible that the `root` user (or its associated privileges) has been inadvertently modified or deleted, preventing it from connecting from `localhost`.
5.  **MySQL Server Not Running Properly:** While usually resulting in a "Can't connect to MySQL server on 'localhost'" error, an improperly started or configured server might sometimes present an "Access denied" error if it fails during the authentication phase for the root user.

### Step-by-Step Solution

The most robust way to fix this issue, especially if you've forgotten the `root` password, involves starting MySQL in a special mode to reset the password.

#### Step 1: Verify MySQL Server Status

Before troubleshooting authentication, ensure the MySQL server is actually running. If it's not, you'll get a different connection error.

*   **Linux (systemd-based, e.g., Ubuntu, Debian, CentOS 7+):**
    ```bash
    sudo systemctl status mysql
    ```
    If it's not running, start it:
    ```bash
    sudo systemctl start mysql
    ```
*   **macOS (Homebrew installation):**
    ```bash
    brew services list
    ```
    If `mysql` is not listed as `started`, start it:
    ```bash
    brew services start mysql
    ```
*   **Windows (via Services Manager):**
    Open `services.msc` (type `services` in the Start menu search bar). Look for `MySQL` or `MySQL80` (or similar service name). Ensure its status is "Running". If not, right-click and select "Start".

If the server is running and you still get "Access denied," proceed to the next step.

#### Step 2: Stop the MySQL Server

To reset the `root` password safely, you must first stop the running MySQL service.

*   **Linux (systemd):**
    ```bash
    sudo systemctl stop mysql
    ```
*   **macOS (Homebrew):**
    ```bash
    brew services stop mysql
    ```
*   **Windows (Services Manager):**
    Open `services.msc`, find the MySQL service, right-click, and select "Stop".
    Alternatively, from an elevated Command Prompt:
    ```cmd
    net stop MySQL
    ```
    (Replace `MySQL` with your actual service name if different, e.g., `MySQL80`.)

#### Step 3: Start MySQL with `skip-grant-tables`

Starting MySQL with the `skip-grant-tables` option allows anyone to connect as any user without a password, effectively bypassing the authentication system. This is crucial for resetting the `root` password.

1.  **Start MySQL in safe mode:**

    *   **Linux/macOS:**
        Open a new terminal window. You'll usually need to run the `mysqld_safe` or `mysqld` command directly.
        ```bash
        sudo mysqld_safe --skip-grant-tables --skip-networking &
        ```
        The `&` puts the process in the background. `--skip-networking` is optional but recommended for security to prevent external connections while in this vulnerable state.
        *Note: If `mysqld_safe` is not found, try `sudo /usr/sbin/mysqld --skip-grant-tables --skip-networking &` or locate your `mysqld` executable.*

    *   **Windows:**
        Open an elevated Command Prompt. Navigate to your MySQL `bin` directory (e.g., `C:\Program Files\MySQL\MySQL Server 8.0\bin`).
        ```cmd
        mysqld --skip-grant-tables --skip-networking
        ```
        This command will run in the foreground. Do *not* close this window while performing the next steps.

2.  **Connect to MySQL as root (without password):**
    Open *another* terminal/command prompt window.
    ```bash
    mysql -u root
    ```
    You should now be logged into the MySQL prompt without being asked for a password.

#### Step 4: Reset the Root Password

Once connected, you can reset the `root` password. The exact command depends on your MySQL version.

1.  **Flush Privileges:** This is critical to ensure MySQL reloads its grant tables before you make changes.
    ```sql
    FLUSH PRIVILEGES;
    ```

2.  **Reset Password:**

    *   **For MySQL 5.7.6 and later, or MySQL 8.0:**
        ```sql
        ALTER USER 'root'@'localhost' IDENTIFIED BY 'YourNewStrongPasswordHere';
        ```
        Replace `'YourNewStrongPasswordHere'` with a strong, new password.

    *   **For MySQL 5.7.5 and earlier (and if `ALTER USER` doesn't work for some reason):**
        ```sql
        UPDATE mysql.user SET authentication_string=PASSWORD('YourNewStrongPasswordHere'), plugin='mysql_native_password' WHERE user='root' AND host='localhost';
        ```
        *Note: The `plugin='mysql_native_password'` part is important if you encounter client compatibility issues with newer authentication methods like `caching_sha2_password`.*

3.  **Flush Privileges Again:** After modifying the user table, always flush privileges.
    ```sql
    FLUSH PRIVILEGES;
    ```

#### Step 5: Restart MySQL in Normal Mode

1.  **Exit the MySQL prompt:**
    ```sql
    exit;
    ```
2.  **Stop the `mysqld_safe` or `mysqld` process:**
    *   **Linux/macOS:** Find the PID of the `mysqld_safe` or `mysqld` process started in Step 3 (e.g., using `ps aux | grep mysqld`). Then kill it:
        ```bash
        sudo kill <PID>
        ```
        Alternatively, if you didn't close the terminal where you ran `mysqld_safe &`, you can sometimes use `fg` to bring it to the foreground and then `Ctrl+C`.
    *   **Windows:** Close the Command Prompt window where `mysqld --skip-grant-tables` was running in the foreground.

3.  **Start MySQL normally:**
    *   **Linux (systemd):**
        ```bash
        sudo systemctl start mysql
        ```
    *   **macOS (Homebrew):**
        ```bash
        brew services start mysql
        ```
    *   **Windows (Services Manager):**
        Open `services.msc`, find the MySQL service, right-click, and select "Start".
        Alternatively, from an elevated Command Prompt:
        ```cmd
        net start MySQL
        ```

#### Step 6: Test the New Password

Attempt to connect to MySQL again using the `root` user and your newly set password.

```bash
mysql -u root -p
```
When prompted, enter `'YourNewStrongPasswordHere'`. You should now successfully connect.

#### Step 7: Verify User Plugin (Optional but Recommended)

If you still face issues or experience slow connections, verify the authentication plugin for the `root` user. Sometimes, the client library doesn't support the server's default plugin.

Connect as `root` with the new password, then run:
```sql
SELECT user, host, plugin FROM mysql.user WHERE user='root' AND host='localhost';
```
If `plugin` is `caching_sha2_password` and your client is old, you might want to change it to `mysql_native_password` for better compatibility:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourNewStrongPasswordHere';
FLUSH PRIVILEGES;
```
Then, restart MySQL and test again.

### Common Mistakes

*   **Forgetting to `FLUSH PRIVILEGES`:** This is a crucial step. Without it, MySQL might continue to use its cached grant tables, making your password change ineffective until the server is fully restarted.
*   **Not stopping the main MySQL service before starting `mysqld_safe`:** Trying to start `mysqld_safe` while the regular MySQL service is running will often result in port conflicts or other errors.
*   **Closing the `mysqld --skip-grant-tables` window on Windows prematurely:** If you close the command prompt window where you started MySQL in safe mode, the server will shut down before you can reset the password.
*   **Using the wrong `ALTER USER` syntax:** MySQL versions have slightly different commands for password changes. Ensure you're using the correct syntax for your version (especially the difference between `PASSWORD()` function and direct string for `authentication_string`).
*   **Forgetting to restart MySQL in normal mode:** After resetting the password, if you don't stop the `skip-grant-tables` instance and restart the regular MySQL service, you won't be able to connect normally.
*   **Typing the new password incorrectly during the reset or testing:** Double-check your spelling and case sensitivity.

### Prevention Tips

*   **Use Strong, Unique Passwords:** Always choose complex passwords that are hard to guess. Combine uppercase and lowercase letters, numbers, and symbols.
*   **Document Passwords Securely:** If you manage multiple MySQL instances or frequently change passwords, use a secure password manager or documented process to store them.
*   **Avoid Using `root` for Daily Operations:** The `root` user has all privileges. For application connections or routine administrative tasks, create dedicated users with only the necessary privileges (least privilege principle). This reduces the impact if those credentials are compromised.
*   **Regular Backups:** Regularly back up your MySQL databases, including the `mysql` system database which stores user accounts and privileges.
*   **Keep MySQL Up-to-Date:** Update your MySQL server to the latest stable version to benefit from security patches and performance improvements.
*   **Review `my.cnf`/`my.ini` Configuration:** Occasionally review your MySQL configuration file to ensure no unintended security settings (like `skip-networking` or `bind-address` restrictions) are active that could complicate local `root` access.