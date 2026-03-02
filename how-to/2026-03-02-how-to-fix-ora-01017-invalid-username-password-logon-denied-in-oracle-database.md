---
title: "How to Fix \"ORA-01017: Invalid Username/Password; Logon Denied\" in Oracle Database"
date: "2026-03-02T02:01:25.173Z"
slug: "how-to-fix-ora-01017-invalid-username-password-logon-denied-in-oracle-database"
type: "how-to"
description: "This comprehensive guide provides a step-by-step solution to resolve the common Oracle error \"ORA-01017: Invalid Username/Password; Logon Denied\". Learn why it happens and how to fix it."
keywords: "ORA-01017, Oracle error, invalid username, invalid password, logon denied, Oracle database, fix, troubleshooting, authentication"
---

## Problem Explanation

You're trying to connect to your Oracle database, perhaps using SQL*Plus, SQL Developer, or another application, and you're met with a frustrating error message: `ORA-01017: Invalid Username/Password; Logon Denied`. This message is Oracle's way of telling you that the credentials you provided to access the database are incorrect. It's a common roadblock that can halt your work, whether you're a developer, DBA, or even an end-user trying to access data. The specific circumstances might vary – you might see this when running a script, starting a client tool, or even during an application startup. Regardless, the outcome is the same: access denied.

## Why It Happens

The `ORA-01017` error fundamentally boils down to a mismatch between the username and password provided and the credentials stored within the Oracle database's security system. This can occur for several reasons. Most commonly, it's a simple typo in either the username or the password when attempting to log in. Passwords are case-sensitive in Oracle, so mistyping a letter or forgetting to hold down the Shift key can lead to this error. Another frequent culprit is an expired password. Oracle databases often have password policies configured that require users to change their passwords periodically. If a password has reached its expiration date, subsequent login attempts with the old password will fail. Furthermore, an account might be locked by the database administrator due to too many failed login attempts or other security reasons. Finally, the user account itself might no longer exist in the database or may have been disabled.

## Step-by-Step Solution

Let's work through the common causes and fix them methodically.

### ## Step 1: Verify Your Username and Password for Typos

This is the most straightforward and often the most overlooked step. Before diving into complex troubleshooting, take a moment to carefully re-examine the username and password you are using.

*   **Action:** Double-check the spelling of the username. Ensure there are no extra spaces at the beginning or end.
*   **Action:** Carefully re-type the password. Pay close attention to capitalization, numbers, and special characters. If you are using a password manager, ensure it's providing the correct password and not an old or incorrect one.
*   **Example (SQL*Plus):**
    ```sql
    sqlplus your_username/your_password@your_service_name
    ```
    If the above fails, try entering the credentials separately:
    ```sql
    sqlplus your_username
    Enter password: <type your password here, it won't be displayed>
    ```
    If you suspect the password might be stored incorrectly in a tool's configuration, locate that configuration and re-enter the password.

### ## Step 2: Check Password Case Sensitivity

Oracle usernames are typically case-insensitive (though this can be configured), but passwords are *always* case-sensitive.

*   **Action:** If your password includes uppercase letters, ensure you are typing them exactly as they are defined. Forgetting to press the `Shift` key or using the wrong case can cause this error.
*   **Example:** If your password is `MySecret123!`, typing `mysecret123!` or `Mysecret123!` will result in `ORA-01017`.

### ## Step 3: Test with a Known Working User or by Resetting Your Password

If you have access to another user account that you know can connect, try logging in with those credentials. This helps determine if the issue is specific to your account or a broader database connectivity problem. If you don't have another account, or if the other account also fails, it might be time to consider resetting your password if you have the necessary privileges or can ask an administrator to do so.

*   **Action:** If you are an administrator or have the ability to reset passwords for users, log in to the database with an administrative account (e.g., `SYS`, `SYSTEM`) and reset the password for the affected user.
*   **Example (SQL*Plus as SYSDBA):**
    ```sql
    sqlplus / as sysdba
    ```
    Once connected as SYSDBA, you can reset a user's password:
    ```sql
    ALTER USER your_username IDENTIFIED BY new_strong_password;
    ```
    Replace `your_username` and `new_strong_password` with the actual username and your desired new password. After resetting, try logging in with the new password.

### ## Step 4: Verify the User Account Status and Existence

It's possible that the user account has been locked or even intentionally disabled by a database administrator.

*   **Action:** As a user with `SELECT ANY DICTIONARY` or specific `SELECT` privileges on `DBA_USERS`, query the `DBA_USERS` view to check the status of the account.
*   **Example (SQL*Plus as a privileged user):**
    ```sql
    SELECT username, account_status FROM dba_users WHERE username = 'YOUR_USERNAME_IN_UPPERCASE';
    ```
    Common `account_status` values include:
    *   `OPEN`: The account is unlocked and active.
    *   `LOCKED`: The account is locked, typically due to too many failed login attempts.
    *   `LOCKED(TIMED)`: The account is locked for a specific period.
    *   `EXPIRED(GRACE)` or `EXPIRED`: The password has expired.
    *   `CLOSED`: The account is disabled.

    If the `account_status` is `LOCKED` or `CLOSED`, you will need to unlock it. If it's `EXPIRED`, you'll need to reset the password (as shown in Step 3) and potentially grant grace periods if the policy allows.

### ## Step 5: Unlock a Locked Account

If `DBA_USERS` shows your account is locked, you can unlock it using the `ALTER USER` statement.

*   **Action:** Connect to the database with an administrative account (e.g., `SYS`, `SYSTEM`).
*   **Action:** Execute the `ALTER USER ... ACCOUNT UNLOCK` command.
*   **Example (SQL*Plus as SYSDBA):**
    ```sql
    sqlplus / as sysdba
    ALTER USER your_username ACCOUNT UNLOCK;
    ```
    After unlocking, attempt to log in again. If the lock was due to too many failed attempts, you might need to wait for a timed lockout to expire before it can be unlocked.

### ## Step 6: Check the Service Name or SID and Host Details

While `ORA-01017` is primarily about credentials, incorrect connection details can sometimes mask underlying issues or lead to attempts to connect to the wrong database instance where the username/password combination is indeed invalid. Ensure your connection string or TNSNAMES.ORA entry is correct.

*   **Action:** Verify the `SERVICE_NAME` or `SID` you are using in your connection string or TNS entry.
*   **Action:** Confirm the hostname and port specified in your connection details are correct for the intended Oracle instance.
*   **Example (SQL*Plus connection string):**
    ```sql
    sqlplus your_username/your_password@//your_host:your_port/your_service_name
    ```
    or using TNSNAMES.ORA:
    ```sql
    sqlplus your_username/your_password@your_tns_alias
    ```
    Ensure `your_tns_alias` correctly resolves to the intended host, port, and service name/SID in your `tnsnames.ora` file.

## Common Mistakes

One of the most common mistakes when facing `ORA-01017` is not re-typing the password carefully. Users often assume their initial entry was correct and jump straight to more complex solutions. Another pitfall is forgetting that Oracle passwords are case-sensitive; what works in one system might not work in Oracle if capitalization differs. Additionally, administrators sometimes try to unlock accounts using the same credentials that caused them to be locked in the first place, which is futile. Lastly, confusing `SYS` or `SYSTEM` passwords with regular user passwords can lead to errors if the wrong password is used for the wrong account.

## Prevention Tips

To minimize future `ORA-01017` errors, establish clear procedures for password management. Encourage users to use strong, memorable passwords and to update them regularly according to the database's security policy. Implement password expiration policies and educate users on how to change their passwords *before* they expire. For administrators, document all user accounts, their statuses, and any specific lockout policies. Regularly audit user accounts to ensure they are active and necessary. When creating new users or resetting passwords, always confirm the new password with the user to ensure it's entered correctly. Utilizing tools that securely store and manage credentials, like password vaults, can also significantly reduce the occurrence of this error.