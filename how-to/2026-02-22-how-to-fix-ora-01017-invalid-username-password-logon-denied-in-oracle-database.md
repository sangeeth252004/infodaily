---
title: "How to Fix \"ORA-01017: Invalid username/password; logon denied\" in Oracle Database"
date: "2026-02-22T20:27:04.496Z"
slug: "how-to-fix-ora-01017-invalid-username-password-logon-denied-in-oracle-database"
type: "how-to"
description: "A comprehensive guide to diagnose and resolve the Oracle ORA-01017 error. Learn step-by-step how to check credentials, reset passwords, and prevent future logon denials."
keywords: "ORA-01017, Oracle, invalid username password, logon denied, fix Oracle error, database connection error, Oracle troubleshooting, password reset Oracle, account locked Oracle"
---

The "ORA-01017: invalid username/password; logon denied" error is one of the most common issues Oracle Database users encounter. While seemingly straightforward, its root cause can sometimes be elusive, leading to frustration when attempting to connect to an Oracle instance. This guide provides a structured approach to diagnosing and resolving this specific database logon failure.

### Problem Explanation

The `ORA-01017: invalid username/password; logon denied` error occurs when the Oracle Database server explicitly rejects a connection attempt because the authentication credentials provided are incorrect. This means the combination of the username and its corresponding password supplied by the client does not match any valid user account or the correct password for the specified user within the target database.

Users typically encounter this problem when trying to connect via SQL*Plus, SQL Developer, application servers, or any custom application that interacts with an Oracle database. The specific message you'll see often appears in the client application's output, for instance:

```
SQL> CONNECT myuser/mypassword@mydb
ORA-01017: invalid username/password; logon denied
```
This error explicitly indicates that the database was reached, but the logon failed due to an authentication mismatch, distinguishing it from network or listener errors that would typically return different ORA- errors.

### Why It Happens

The `ORA-01017` error primarily stems from a mismatch between the credentials provided and those expected by the database. The most common reasons for this mismatch include:

*   **Incorrect Username:** A typo in the username, incorrect case (if the username was created with double quotes and is therefore case-sensitive, though standard practice is uppercase), or specifying a user that simply does not exist in the target database.
*   **Incorrect Password:** A typo in the password, incorrect case sensitivity (Oracle passwords are case-sensitive by default), Caps Lock being active, or an older, forgotten password being used after a recent change.
*   **Account Status Issues:** The user account might be locked (`ACCOUNT_STATUS = 'LOCKED'`) due to multiple failed login attempts (configured through a password profile) or explicitly locked by a DBA. The account might also be expired (`ACCOUNT_STATUS = 'EXPIRED'`) if a password expiry policy is in place and the password has not been changed within the allowed period.
*   **Incorrect Target Database/Service:** While less common to directly manifest as ORA-01017, connecting to the wrong database instance (e.g., a development database instead of production) can result in this error if the username/password combination exists in one but not the other, or if the password differs.
*   **External Authentication Mismatch:** If the user is configured for external authentication (e.g., operating system authentication, LDAP), a misconfiguration on either the client or server side, or an issue with the external authentication system itself, can lead to this error.

Understanding these underlying causes is crucial for systematically troubleshooting the logon denial.

### Step-by-Step Solution

Follow these steps to diagnose and resolve the `ORA-01017` error. You will often need administrative privileges (like `SYSDBA` or `SYSTEM`) to perform some of these checks and fixes.

#### ## Step 1: Verify Provided Username and Password

The most basic and often overlooked step is to meticulously check the credentials you are using.

*   **Check Spelling and Case:** Ensure the username and password are spelled correctly. Oracle usernames are typically case-insensitive unless they were created using double-quotes (e.g., `CREATE USER "MyUser"`). Passwords, however, are always case-sensitive.
*   **Toggle Caps Lock:** Confirm that Caps Lock is in the correct state (on or off) for your password entry.
*   **Special Characters:** If the password contains special characters, ensure they are being typed correctly and not misinterpreted by the client application or keyboard layout.
*   **Known Good Credentials:** If you have access to another known valid set of credentials (e.g., `SYSTEM` user, or another application user), try connecting with those to rule out a general connection issue versus a specific user problem.
*   **OS Authentication (Local Server):** If you are attempting to connect from the database server itself, try `CONNECT / AS SYSDBA`. If this works, it confirms the database instance is up and accessible, narrowing the issue to specific user credentials.

#### ## Step 2: Confirm Connection String and Target Database

Ensure you are trying to connect to the correct database instance. A valid username/password for `DB_A` will fail with `ORA-01017` if you accidentally connect to `DB_B`.

*   **Review TNS Entry (if applicable):** If you are using a TNS alias (e.g., `mydb` in `myuser/mypassword@mydb`), check your `tnsnames.ora` file.
    *   Verify the `HOST` (or `ADDRESS`) and `SERVICE_NAME` (or `SID`) are correct for your intended database.
    *   Example `tnsnames.ora` entry:
        ```
        MYDB =
          (DESCRIPTION =
            (ADDRESS_LIST =
              (ADDRESS = (PROTOCOL = TCP)(HOST = your_db_host)(PORT = 1521))
            )
            (CONNECT_DATA =
              (SERVICE_NAME = orclpdb1)
            )
          )
        ```
*   **Direct Connection String:** If using a direct connection string (e.g., `myuser/mypassword@(HOST=your_db_host:PORT=1521/SERVICE_NAME=orclpdb1)`), double-check all components for accuracy.
*   **Verify Listener Status:** On the database server, ensure the listener is running and registered with the correct database service:
    ```sql
    lsnrctl status
    lsnrctl services
    ```
    Confirm that your database's `SERVICE_NAME` is listed as "Ready".
*   **Multi-tenant (CDB/PDB):** If using a multi-tenant environment, ensure you are connecting to the correct Pluggable Database (PDB). A common user (e.g., `C##MYUSER`) would connect to the CDB, while a local user (e.g., `MYUSER`) would connect to a specific PDB. Your connection string's `SERVICE_NAME` should point to the PDB if connecting to a local user.

#### ## Step 3: Reset User Password (as SYSDBA/SYSTEM)

If you suspect the password is incorrect or forgotten, a privileged user can reset it. This requires connecting as `SYSDBA` or `SYSTEM` (or another user with `ALTER USER` privilege).

1.  **Connect as a privileged user:**
    ```sql
    SQL> CONNECT sys/sys_password@mydb AS SYSDBA
    -- OR
    SQL> CONNECT system/system_password@mydb
    ```
    If you cannot connect with `SYSDBA` remotely, you might need to connect locally on the server:
    ```sql
    SQL> CONNECT / AS SYSDBA
    ```
2.  **Reset the user's password:**
    ```sql
    SQL> ALTER USER <username> IDENTIFIED BY <new_strong_password>;
    ```
    Replace `<username>` with the actual username (e.g., `MYUSER`) and `<new_strong_password>` with a secure new password. Remember, Oracle passwords are case-sensitive.
3.  **Test the new password:**
    ```sql
    SQL> CONNECT <username>/<new_strong_password>@mydb
    ```

#### ## Step 4: Check User Account Status

Even with the correct password, a user cannot log in if their account is locked or expired.

1.  **Connect as a privileged user** (e.g., `SYS` or `SYSTEM`).
2.  **Query `DBA_USERS`:**
    ```sql
    SQL> SELECT USERNAME, ACCOUNT_STATUS, EXPIRY_DATE
         FROM DBA_USERS
         WHERE USERNAME = UPPER('<username>');
    ```
    Look for the `ACCOUNT_STATUS` column.
    *   If it shows `LOCKED` or `LOCKED(TIMED)`, the account has been locked.
    *   If it shows `EXPIRED`, `EXPIRED & LOCKED`, or `OPEN` but `EXPIRY_DATE` is in the past, the password has expired.
3.  **Unlock the account (if locked):**
    ```sql
    SQL> ALTER USER <username> ACCOUNT UNLOCK;
    ```
4.  **Resolve expired password:** If `ACCOUNT_STATUS` is `EXPIRED` or `EXPIRED & LOCKED`, resetting the password as described in Step 3 will typically resolve this by setting a new password and resetting the expiry timer. If the user logs in after password expiry but before the account locks, Oracle will prompt them to change their password.

#### ## Step 5: Examine Database Profile Password Policy

User accounts are assigned a profile that dictates password policies (e.g., complexity, expiry, lockout). Issues with these policies can prevent logins.

1.  **Connect as a privileged user.**
2.  **Identify the user's profile:**
    ```sql
    SQL> SELECT USERNAME, PROFILE
         FROM DBA_USERS
         WHERE USERNAME = UPPER('<username>');
    ```
3.  **Check the profile's password parameters:**
    ```sql
    SQL> SELECT RESOURCE_NAME, LIMIT
         FROM DBA_PROFILES
         WHERE PROFILE = '<profile_name>'
         AND RESOURCE_TYPE = 'PASSWORD';
    ```
    Pay attention to `PASSWORD_LIFE_TIME` (for expiry), `FAILED_LOGIN_ATTEMPTS` (for lockout), and `PASSWORD_VERIFY_FUNCTION` (for complexity rules). If you're setting a password that doesn't meet the `PASSWORD_VERIFY_FUNCTION` requirements, the `ALTER USER` command might succeed but the new password still won't allow login, or it might fail with a different `ORA-` error indicating the complexity issue. Adjust the password to meet the profile requirements or temporarily alter the profile (if safe and appropriate) to ease password setting.

#### ## Step 6: Investigate External Authentication (If Used)

If your user is configured for external authentication (e.g., `IDENTIFIED EXTERNALLY` for OS authentication, or through LDAP/Active Directory), the problem lies outside Oracle's internal password store.

1.  **Check `DBA_USERS`:** Verify how the user is identified:
    ```sql
    SQL> SELECT USERNAME, AUTHENTICATION_TYPE FROM DBA_USERS WHERE USERNAME = UPPER('<username>');
    ```
    If `AUTHENTICATION_TYPE` is `EXTERNAL` or `GLOBAL`, external authentication is in use.
2.  **OS Authentication:**
    *   Ensure the OS user exists on the database server.
    *   Check the `OS_AUTHENT_PREFIX` parameter in the database:
        ```sql
        SHOW PARAMETER OS_AUTHENT_PREFIX;
        ```
        If `OS_AUTHENT_PREFIX` is `OPS$`, an Oracle user `OPS$MYUSER` will map to an OS user `MYUSER`.
    *   Verify the `sqlnet.ora` file on the server (and potentially client) has `SQLNET.AUTHENTICATION_SERVICES=(NTS)` or `(NONE)` for Windows, or `(ALL)` for Linux/Unix.
3.  **LDAP/Active Directory (Global Authentication):**
    *   Verify the LDAP server is reachable and operational.
    *   Check `sqlnet.ora` for `NAMES.DIRECTORY_PATH` parameter which should include `LDAP`.
    *   Confirm the user exists and is correctly configured in the LDAP directory.
    *   Test authentication directly with the LDAP server if possible.

### Common Mistakes

When troubleshooting `ORA-01017`, users often make several common mistakes:

*   **Ignoring Case Sensitivity:** Assuming passwords are case-insensitive. Oracle passwords are case-sensitive by default, so `Password123` is different from `password123`.
*   **Typographical Errors:** Rushing through credentials entry and overlooking simple typos in either the username or password.
*   **Incorrect Service Name/SID:** Providing a correct username/password but for the wrong database instance, leading to a "logon denied" if that user doesn't exist or has different credentials on the target database.
*   **Using Old Passwords:** Forgetting that a password was recently changed, either manually or due to a policy-forced expiry, and attempting to log in with the obsolete password.
*   **Not Checking Account Status:** Repeatedly trying a password without checking if the account is locked or expired, which is a common cause for `ORA-01017` even with the correct password.
*   **Misinterpreting the Error:** Confusing `ORA-01017` with network or listener errors. `ORA-01017` confirms a connection *was* made to the database process, but authentication failed. Network issues (e.g., `ORA-12170`, `ORA-12541`) occur *before* the database even attempts to authenticate.

### Prevention Tips

Implementing best practices can significantly reduce the occurrence of `ORA-01017` errors:

*   **Strong Password Policies:** Implement and enforce robust password profiles that require complex passwords, regular expiry, and account lockouts after a reasonable number of failed attempts. This secures your database and encourages users to update their credentials.
*   **Secure Password Management:** Encourage users to utilize secure password managers to store and retrieve complex passwords accurately, eliminating typos and forgotten passwords.
*   **Clear Documentation:** Maintain clear, up-to-date documentation for all database users, their roles, associated profiles, and initial/default passwords (stored securely, of course). Document all changes to administrative passwords immediately.
*   **Standardized Naming Conventions:** Use consistent naming conventions for usernames and database services/SIDs across environments to prevent confusion.
*   **Regular Account Audits:** Periodically review `DBA_USERS` for orphaned accounts, accounts with default/weak passwords, or accounts that are consistently locked or expired, indicating potential issues or misuse.
*   **Educate Users:** Inform users about password case sensitivity, the importance of strong passwords, and procedures for password resets.
*   **Centralized Authentication (LDAP/AD):** For large environments, consider integrating Oracle with enterprise-wide authentication systems like LDAP or Active Directory. This centralizes user management and reduces the number of disparate passwords users need to remember.
*   **Monitor Account Lockouts:** Implement monitoring tools that alert DBAs when user accounts are frequently getting locked. This can indicate brute-force attempts, application misconfigurations, or users struggling with their passwords.