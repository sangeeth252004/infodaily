---
title: "How to Fix \"ORA-01017: Invalid username/password; logon denied\" in Oracle Database"
date: "2026-01-27T20:22:25.961Z"
slug: "how-to-fix-ora-01017-invalid-username-password-logon-denied-in-oracle-database"
type: "how-to"
description: "Resolve the common Oracle ORA-01017 error by understanding its causes and following a step-by-step guide to fix invalid username/password logon denied issues."
keywords: "ORA-01017, Oracle error, invalid username, invalid password, logon denied, database connection, Oracle troubleshooting, fix Oracle error"
---

## Problem Explanation

The "ORA-01017: Invalid username/password; logon denied" error is a ubiquitous and frustrating message encountered by Oracle Database users when attempting to connect to a database instance. This error signifies a fundamental failure in the authentication process – the database simply cannot verify the identity of the user attempting to log in based on the provided credentials. When this error occurs, connection attempts via SQL*Plus, SQL Developer, application interfaces, or any other Oracle client tool will be immediately rejected, preventing any database operations.

Users will typically see this error message displayed directly in their client application's output or log files. For example, a typical SQL*Plus session might look like this:

```
SQL*Plus: Release 19.0.0.0.0 - Production on Mon Oct 26 10:30:00 2023
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle. All rights reserved.

Enter user-name: scott
Enter password:
ERROR:
ORA-01017: invalid username/password; logon denied
```

This clear rejection indicates that the combination of the username and password presented to the Oracle listener or directly to the database server is not recognized as valid.

## Why It Happens

The root cause of the ORA-01017 error is almost always a mismatch between the credentials provided and the credentials stored within the Oracle Database's security schema. Several specific scenarios can lead to this mismatch:

*   **Incorrect Username or Password:** This is the most straightforward reason. The user may have simply mistyped their username or password. Passwords in Oracle are case-sensitive by default, and a single typo, an extra space, or an incorrect case can cause the login to fail.
*   **Expired Password:** Oracle user accounts have password expiration policies. If a user's password has expired according to these policies, the database will reject logins even with the correct password until the password is reset.
*   **Locked Account:** For security reasons, Oracle accounts can be locked by the system or by administrators after a certain number of failed login attempts. A locked account will also result in this error.
*   **Incorrect Database or Service Name:** While not strictly a username/password issue, if the client is attempting to connect to the wrong database instance or service, the credentials provided might be valid for a different database but are not recognized by the target one, leading to this generic authentication error.
*   **Profile Restrictions:** Oracle user profiles can enforce various security parameters, including password complexity, minimum password length, and password reuse. If a newly set password does not meet these profile requirements, it might be rejected or cause subsequent login failures.
*   **Case Sensitivity Mismatch:** If the database has been configured to enforce case-sensitive passwords (which is the default for new Oracle installations), and the user is entering a password with incorrect casing, the login will fail.

Understanding these underlying reasons is crucial for effectively troubleshooting and resolving the ORA-01017 error.

## Step-by-Step Solution

Resolving the ORA-01017 error requires a systematic approach to verify and correct the login credentials and account status.

### ## Step 1: Verify Basic Username and Password Accuracy

The most common cause is a simple typo.

1.  **Double-check spelling:** Carefully re-type the username and password, paying close attention to every character, including spaces.
2.  **Case sensitivity:** Remember that Oracle passwords are case-sensitive by default. Ensure the entered password matches the exact casing of the stored password. If you are unsure of the correct casing, it's best to assume it's case-sensitive and try different combinations if necessary, or proceed to reset it.

### ## Step 2: Confirm Database and Service Name

Ensure you are attempting to connect to the correct Oracle database instance.

1.  **Check your connection string or TNSNAMES.ORA entry:** If you are using a TNS alias, verify that the `(SERVICE_NAME=...)` or `(SID=...)` parameter in your `tnsnames.ora` file correctly points to the intended database.
2.  **Consult your DBA:** If you are unsure about the correct database or service name, reach out to your database administrator.

### ## Step 3: Test Connection with a Known Good User (if possible)

If you have access to another user account with known valid credentials, try connecting with that account.

1.  **Attempt connection with a different user:** Use a username and password for an account you are confident is correct and active.
2.  **Analyze the result:**
    *   If the other user can connect successfully, the problem is specific to the original username/password combination.
    *   If the other user also fails with ORA-01017, it might indicate a broader network or database listener issue, or that the credentials for *all* users are somehow problematic (less likely but possible).

### ## Step 4: Reset the User's Password

If the password is suspected to be incorrect, expired, or you simply cannot recall it, resetting it is often the quickest solution. This step requires DBA privileges or the ability to execute `ALTER USER` commands.

1.  **Connect to the database as a DBA:** Use an account with `ALTER USER` system privilege (e.g., `SYS` or `SYSTEM` with `SYSDBA` or `SYSOPER` role).
2.  **Execute the `ALTER USER` command:**
    ```sql
    ALTER USER your_username IDENTIFIED BY new_strong_password;
    ```
    Replace `your_username` with the actual username and `new_strong_password` with a strong, new password.
3.  **Try logging in again:** Use the username and the newly set password to connect.

### ## Step 5: Check for Account Locking

A user account can be locked after multiple failed login attempts.

1.  **Query user status:** As a DBA, connect to the database and execute the following query:
    ```sql
    SELECT username, account_status FROM dba_users WHERE username = 'YOUR_USERNAME_IN_UPPERCASE';
    ```
    Replace `YOUR_USERNAME_IN_UPPERCASE` with the username in all uppercase.
2.  **Unlock the account if locked:** If the `ACCOUNT_STATUS` shows `LOCKED` or `LOCKED(TIMED)`, use the following command to unlock it:
    ```sql
    ALTER USER your_username ACCOUNT UNLOCK;
    ```
    Replace `your_username` with the actual username.
3.  **Try logging in again:** Attempt to connect with the user's credentials.

### ## Step 6: Verify Password Expiration Policy

Oracle accounts have password expiration policies defined in user profiles.

1.  **Check the user's profile:**
    ```sql
    SELECT profile FROM dba_users WHERE username = 'YOUR_USERNAME_IN_UPPERCASE';
    ```
2.  **Check the profile's password policies:**
    ```sql
    SELECT * FROM dba_profiles WHERE profile = 'YOUR_PROFILE_NAME_IN_UPPERCASE' AND resource_name LIKE '%PASSWORD%';
    ```
    Look for `PASSWORD_LIFE_TIME` and `PASSWORD_GRACE_TIME`. If `PASSWORD_LIFE_TIME` is set, the password might have expired.
3.  **Reset the password:** If the password has expired, reset it as described in Step 4. The `ALTER USER ... IDENTIFIED BY ...` command will reset the password to its initial state and restart its lifecycle.

## Common Mistakes

Users often make a few common errors when attempting to fix the ORA-01017 error:

*   **Ignoring Case Sensitivity:** The most frequent mistake is assuming passwords are not case-sensitive. Oracle's default configuration makes them so. Forgetting this can lead to repeated failed attempts.
*   **Not Verifying the Target Database:** Users may be trying to connect to the correct database with valid credentials, but the connection string or TNS alias is pointing to the wrong Oracle instance, making the valid credentials seem invalid for the target.
*   **Assuming the Problem is External:** While network issues can sometimes manifest with similar symptoms, ORA-01017 specifically points to an authentication failure at the database level. Focusing too early on network troubleshooting can delay the resolution of an authentication problem.
*   **Using Generic or Weak Passwords:** While not a direct fix for the error, weak passwords increase the likelihood of account lockout or security vulnerabilities, indirectly contributing to login issues.
*   **Not Contacting the DBA Promptly:** For non-DBAs, trying to fix account lockouts or password expiry issues without involving a DBA can be futile if they don't have the necessary privileges. Promptly engaging the DBA can save significant time.

## Prevention Tips

Preventing the ORA-01017 error involves establishing good practices for password management and account security.

*   **Enforce Strong Password Policies:** Configure user profiles to enforce strong passwords, including complexity requirements, minimum length, and regular expiration. This reduces the likelihood of weak or easily guessed passwords.
*   **Educate Users on Case Sensitivity:** Ensure users understand that Oracle passwords are case-sensitive and instruct them on how to correctly enter their credentials. Provide guidance on password management tools if applicable.
*   **Implement Account Lockout Thresholds Wisely:** Set reasonable thresholds for account lockouts to deter brute-force attacks but avoid overly aggressive settings that can lock out legitimate users due to minor errors. Ensure a clear process for unlocking accounts.
*   **Regularly Review User Accounts:** Periodically review active and inactive user accounts. Remove or disable accounts that are no longer needed to reduce the attack surface and potential for credential compromise.
*   **Use Connection Management Tools Effectively:** For applications and developers, utilize connection pooling and robust error handling. Ensure connection strings are accurate and managed in a centralized, version-controlled manner (e.g., through configuration files or secure credential stores).
*   **Provide Clear Error Messaging (for Developers):** When building applications that connect to Oracle, implement logic to provide more user-friendly error messages to end-users if possible, rather than directly displaying raw ORA errors. This might involve catching the ORA-01017 and informing the user to check their username and password.