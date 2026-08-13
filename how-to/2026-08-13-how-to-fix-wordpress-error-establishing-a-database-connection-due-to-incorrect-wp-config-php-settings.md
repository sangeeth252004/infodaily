---
title: "How to Fix WordPress 'Error establishing a database connection' Due to Incorrect `wp-config.php` Settings"
date: "2026-08-13T15:57:43.802Z"
slug: "how-to-fix-wordpress-error-establishing-a-database-connection-due-to-incorrect-wp-config-php-settings"
type: "how-to"
description: "Resolve the WordPress \"Error establishing a database connection\" by correctly configuring your database credentials in the `wp-config.php` file. Learn step-by-step how to find and update your database name, username, password, and host."
keywords: "WordPress, database connection error, wp-config.php, fix, troubleshoot, MySQL, MariaDB, database credentials, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST"
---

The "Error establishing a database connection" is one of the most critical and frustrating issues a WordPress user can encounter. When this error appears, your WordPress site completely ceases to function, becoming inaccessible to both visitors and administrators alike. Instead of your beautifully designed website, users are presented with a stark, plain text message: "Error establishing a database connection." This specific error indicates a fundamental communication breakdown between your WordPress application and its underlying database, which stores all your site's content, settings, users, and more. Without this connection, WordPress cannot retrieve any information, rendering the site effectively offline.

While there can be several reasons for this database connection error, a highly prevalent cause, and the focus of this guide, is incorrect database configuration within your WordPress installation's `wp-config.php` file. This crucial file contains vital information, including the credentials WordPress uses to authenticate and connect to its database. If any of these details—the database name, username, password, or host—are even slightly inaccurate or mismatched with the actual database server settings, the connection will fail, triggering the dreaded error message. This scenario often arises after migrations, hosting changes, manual installations, or accidental edits to the `wp-config.php` file.

## Step 1: Confirm the Error and Access Your `wp-config.php` File

Before proceeding, first ensure you are indeed seeing the "Error establishing a database connection" message when you try to visit your website. This guide specifically addresses issues arising from `wp-config.php` settings, so confirming the exact error is important.

Once confirmed, your next step is to access the `wp-config.php` file. This file is located in the root directory of your WordPress installation. You can typically access it using one of the following methods:

*   **FTP/SFTP Client:** Use a program like FileZilla or Cyberduck. Connect to your server using the credentials provided by your hosting provider. Navigate to your public HTML directory (often `public_html`, `www`, or your domain's folder). The `wp-config.php` file will be there. Download a copy to your local machine.
*   **Hosting Control Panel (File Manager):** Most hosting providers offer a web-based file manager (e.g., cPanel File Manager, Plesk File Manager). Log in to your hosting account, locate the File Manager, and navigate to your WordPress root directory. You can usually edit the file directly within the browser interface.

**Crucial First Action:** Before making any changes, always create a backup of your existing `wp-config.php` file. Rename it to something like `wp-config.php.bak` or download a copy to your computer. This allows you to revert to the original if anything goes wrong.

## Step 2: Locate Database Connection Settings

Open the `wp-config.php` file in a text editor (if downloaded) or the hosting control panel's editor. Scroll through the file and locate the section that defines the database connection details. It typically looks something like this:

```php
// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'database_name_here');

/** MySQL database username */
define('DB_USER', 'username_here');

/** MySQL database password */
define('DB_PASSWORD', 'password_here');

/** MySQL hostname */
define('DB_HOST', 'localhost');
```

These four lines are critical. Each `define` statement sets a constant that WordPress uses to connect to the database. Your task is to ensure the values (`'database_name_here'`, `'username_here'`, `'password_here'`, `'localhost'`) accurately reflect your actual database credentials.

## Step 3: Verify the Database Name (`DB_NAME`)

The `DB_NAME` constant specifies the exact name of the database that your WordPress installation uses. It is crucial for this to be correct.

To find your actual database name:

*   **cPanel:** Log in to cPanel. Look for the "MySQL Databases" icon under the "Databases" section. Here, you will see a list of your databases. Your WordPress database name will usually follow a format like `yourcpanelusername_databasename`. Copy the full name exactly as it appears.
*   **phpMyAdmin:** If you have direct access to phpMyAdmin, log in. The database names will be listed on the left sidebar.
*   **Hosting Provider Documentation/Support:** If you can't find it in your control panel, check your hosting provider's documentation or contact their support.

Once you have the correct database name, update the `DB_NAME` line in your `wp-config.php` file. For example:

`define('DB_NAME', 'yourcpanelusername_wpdata');`

## Step 4: Verify the Database Username and Password (`DB_USER`, `DB_PASSWORD`)

These two constants define the username and password that WordPress uses to authenticate with the database. It is a common mistake to confuse these with your WordPress admin login details or your hosting account login. They are separate credentials specifically for database access.

To find your database username and password:

*   **cPanel:** In the "MySQL Databases" section, scroll down to "MySQL Users." You'll see a list of users. Note that a database user might be associated with multiple databases. Ensure the user you select has privileges for your WordPress database (you can check and manage privileges in the "Add User To Database" section). If you're unsure or the password isn't visible, you might need to reset the password for the database user. If you reset it, make sure to update the `wp-config.php` file immediately.
*   **phpMyAdmin:** While phpMyAdmin shows database users, it doesn't display passwords directly. If you manage users here, you might need to create a new user with a strong password and assign it to your WordPress database.
*   **Hosting Provider Documentation/Support:** As with the database name, your host can provide these details or guide you on how to find/reset them.

Update both `DB_USER` and `DB_PASSWORD` in your `wp-config.php` file with the exact, case-sensitive credentials.

```php
define('DB_USER', 'yourcpanelusername_wpuser');
define('DB_PASSWORD', 'YourStrongAndComplexDatabasePasswordHere');
```

**Important:** If you reset the database password, ensure you save it somewhere secure and do not share it publicly.

## Step 5: Verify the Database Host (`DB_HOST`)

The `DB_HOST` constant specifies the address of the database server. For many shared hosting environments, this is simply `'localhost'`, meaning the database server is running on the same machine as the web server. However, this is not always the case.

Common values for `DB_HOST` include:

*   **`'localhost'`**: Most common for shared hosting.
*   **`'127.0.0.1'`**: An alternative to `localhost`, representing the local machine's loopback address.
*   **A specific hostname**: Some hosts use a separate database server, requiring a hostname like `'mysql.yourdomain.com'`, `'db.yourhost.com'`, or `'yourhost.com:portnumber'` (e.g., `'localhost:3306'` for a specific port).
*   **A specific IP address**: Less common, but some custom setups might use a direct IP.

How to verify `DB_HOST`:

*   **Hosting Provider Documentation:** This is the most reliable source. Look for documentation related to "MySQL Hostname" or "Database Server Address."
*   **phpMyAdmin:** Sometimes the server name is displayed on the phpMyAdmin login page or within the interface itself.
*   **Ask Hosting Support:** If you're unsure, contact your hosting provider's technical support. They can confirm the correct `DB_HOST` value.

Once you have the correct host, update the `DB_HOST` line in your `wp-config.php` file.

`define('DB_HOST', 'localhost');` (or your specific host)

## Step 6: Test the Database Connection (Optional but Recommended)

Before testing your full WordPress site, you can perform a quick, independent test to ensure your database credentials are correct.

1.  Create a new file named `test_db_connection.php` in your WordPress root directory (the same place as `wp-config.php`).
2.  Add the following PHP code to the file, replacing the placeholders with your actual database credentials from `wp-config.php`:

    ```php
    <?php
    $db_host = 'YOUR_DB_HOST';    // e.g., 'localhost'
    $db_user = 'YOUR_DB_USER';    // e.g., 'username_wpuser'
    $db_pass = 'YOUR_DB_PASSWORD'; // e.g., 'YourStrongPassword'
    $db_name = 'YOUR_DB_NAME';    // e.g., 'username_wpdata'

    $link = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

    if (!$link) {
        die('Connection Failed: ' . mysqli_connect_error());
    }

    echo 'Successfully connected to the database!';
    mysqli_close($link);
    ?>
    ```
3.  Upload this `test_db_connection.php` file to your server.
4.  Open your web browser and navigate to `http://yourdomain.com/test_db_connection.php`.

*   If you see "Successfully connected to the database!", your database credentials are correct.
*   If you see "Connection Failed: [error message]", the credentials are still incorrect, or there's a server issue. The error message might give you a clue (e.g., "Access denied for user," "Unknown database"). Review your credentials carefully.

**Important:** Delete the `test_db_connection.php` file from your server immediately after testing for security reasons.

## Step 7: Save Changes and Test WordPress

After carefully updating `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `DB_HOST` in your `wp-config.php` file, save the file. If you downloaded it, upload it back to your server, overwriting the old one.

Now, clear any website caching (if applicable) and reload your WordPress website in your browser. If all the credentials are now correct, your WordPress site should load successfully, and the "Error establishing a database connection" message will be gone. You should be able to access both the front-end of your site and the WordPress admin dashboard.

## Common Mistakes

When troubleshooting the "Error establishing a database connection" caused by `wp-config.php`, users often make several common errors:

*   **Typographical Errors:** Even a single misplaced character, incorrect capitalization, or an extra space in the database name, username, or password will prevent the connection. These fields are case-sensitive.
*   **Confusing Credentials:** Using your WordPress admin login, hosting control panel login, or a cPanel/Plesk username and password instead of the specific database username and password. These are distinct sets of credentials.
*   **Incorrect `DB_HOST`:** Assuming `localhost` is always correct. While common, some hosting environments use different hostnames or IP addresses for their database servers.
*   **Lack of Database User Privileges:** The database user specified in `DB_USER` must have sufficient privileges (e.g., all privileges) on the specific database defined by `DB_NAME`. If the user exists but lacks privileges, the connection will fail.
*   **Not Saving or Uploading Changes:** Forgetting to save the `wp-config.php` file after editing, or failing to re-upload the modified file to the server via FTP/SFTP.
*   **Editing the Wrong `wp-config.php`:** If you have multiple WordPress installations on your hosting account, you might accidentally edit the `wp-config.php` for a different site. Always ensure you're working on the correct file for the affected WordPress installation.

## Prevention Tips

Preventing the "Error establishing a database connection" due to `wp-config.php` issues primarily involves careful management of your site's configuration and credentials:

*   **Always Back Up:** Before making any changes to `wp-config.php`, or performing significant operations like site migrations or updates, always create a full backup of your website files and database. This allows for quick recovery if an error occurs.
*   **Verify After Migrations:** If you migrate your WordPress site to a new hosting provider or a different server, database credentials almost always change. Double-check and update `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and especially `DB_HOST` immediately after the migration.
*   **Use Strong, Unique Database Passwords:** Generate complex, unique passwords for your database users. While they can be harder to remember, strong passwords reduce the risk of unauthorized access, which could lead to credential changes without your knowledge.
*   **Secure Your Credentials:** Keep your database credentials in a secure, encrypted location. Avoid storing them in plain text files on your computer or sharing them over unsecured channels.
*   **Consult Hosting Documentation:** Whenever you set up a new WordPress site or encounter a database issue, refer to your hosting provider's official documentation for the correct database server details and best practices. If in doubt, contact their support directly.