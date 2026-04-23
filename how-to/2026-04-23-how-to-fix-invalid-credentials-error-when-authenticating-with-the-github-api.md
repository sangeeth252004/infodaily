---
title: "How to Fix \"Invalid Credentials\" Error When Authenticating with the GitHub API"
date: "2026-04-23T20:51:47.742Z"
slug: "how-to-fix-invalid-credentials-error-when-authenticating-with-the-github-api"
type: "how-to"
description: "Learn how to resolve the common \"Invalid Credentials\" error when interacting with the GitHub API, covering personal access tokens, SSH keys, and authentication best practices."
keywords: "GitHub API, Invalid Credentials, authentication error, personal access token, SSH key, API token, GitHub authentication, resolve GitHub API error"
---

When you're building applications that interact with GitHub repositories, you'll often need to authenticate with the GitHub API. This usually involves using a Personal Access Token (PAT) or an SSH key. However, you might encounter a frustrating error message that states "Invalid Credentials." This error can halt your development process and leave you wondering what went wrong. You might see responses like:

```
{
  "message": "Bad credentials",
  "documentation_url": "https://docs.github.com/rest/reference/users#get-the-authenticated-user"
}
```

Or, if you're using command-line tools like `git` over SSH, you might see errors related to authentication failure. This generally means that the credentials you're providing to GitHub are not being accepted by their servers.

### Why It Happens

The "Invalid Credentials" error typically arises because the authentication information you're sending to GitHub is incorrect, expired, or lacks the necessary permissions. This can stem from a variety of reasons. Most commonly, it's an issue with your Personal Access Token (PAT). Perhaps the token has been revoked, has expired (PATs have a default expiration of 30 days or can be set for longer periods, but they *will* expire), or was generated with insufficient scopes (permissions) for the action you're trying to perform.

Another frequent cause is related to SSH authentication. If you're cloning repositories or pushing code using SSH, an "Invalid Credentials" error might indicate that your SSH public key isn't properly registered with your GitHub account, or that the SSH client on your machine is configured to use the wrong private key, or that the key itself is corrupted or expired. Incorrectly formatted tokens or typos when entering credentials in your application or in your Git configuration can also lead to this problem.

### Step-by-Step Solution

Let's systematically tackle the "Invalid Credentials" error.

## Step 1: Verify Your Personal Access Token (PAT)

The most common culprit is an incorrect or expired PAT.

1.  **Navigate to GitHub Settings:** Log in to your GitHub account. Click on your profile picture in the upper right corner, then select "Settings."
2.  **Access Developer Settings:** In the left-hand sidebar, scroll down and click on "Developer settings."
3.  **Go to Personal Access Tokens:** Under "Developer settings," click on "Personal access tokens." You'll see a list of your generated tokens.
4.  **Check Token Status and Expiration:**
    *   **Expired Tokens:** If a token has expired, you'll need to generate a new one.
    *   **Revoked Tokens:** If you or an administrator revoked the token, you'll need a new one.
    *   **Scopes:** Click on a token to view its details. Ensure the **Scopes** listed include the necessary permissions for the API calls you're making (e.g., `repo` for full repository access, `read:org` for organization data).
5.  **Generate a New Token (if necessary):** If your token is expired, revoked, or lacks sufficient scopes, click the "Generate new token" button.
    *   Provide a descriptive **Note** for the token (e.g., "My Project API Access").
    *   Set an **Expiration** date. It's good practice to set an expiration date to enhance security.
    *   Select the appropriate **Scopes** for your needs.
    *   Click "Generate token." **Crucially, copy the token immediately.** You will not be able to see it again after leaving the page.

## Step 2: Update Your Application's Credentials

Once you have a valid PAT, you need to update where your application is using it.

1.  **Locate Credential Storage:** This depends on your application.
    *   **Environment Variables:** If you're using environment variables (e.g., `GITHUB_TOKEN`), update the value of that variable with your new PAT.
    *   **Configuration Files:** If your token is stored in a configuration file (e.g., `.env`, `config.json`), find and replace the old token with the new one.
    *   **Code:** If the token is hardcoded (which is generally discouraged for security reasons), find and update the string literal.
2.  **Restart Your Application/Service:** After updating the credentials, restart any application, service, or script that uses the token for the changes to take effect.

## Step 3: Verify Git's Credential Manager (for Git operations)

If you're using Git commands (clone, push, pull) and encountering this error, Git's credential helper might be storing outdated information.

1.  **Check Git Configuration:** Open your terminal and run:
    ```bash
    git config --list --show-origin
    ```
    Look for lines related to `credential.helper`. Common helpers include `manager`, `osxkeychain`, `gnome-keyring`, `libsecret`.
2.  **Clear Stored Credentials (if applicable):**
    *   **Windows Credential Manager:** Search for "Credential Manager" in Windows. Under "Windows Credentials," find entries related to `git:https://github.com` and remove them.
    *   **macOS Keychain Access:** Open "Keychain Access." Search for `github.com` and delete any relevant entries.
    *   **Linux (e.g., GNOME Keyring/libsecret):** The method varies by distribution. You might need to use a tool like `seahorse` or command-line tools specific to your keyring. For `libsecret`, you might find entries under "Passwords" -> "Login" or similar.
3.  **Re-authenticate:** The next time you perform a Git operation that requires authentication (like `git push`), Git will prompt you for your username and password/token. Enter your GitHub username and the PAT you generated in Step 1.

## Step 4: Check SSH Key Configuration (for SSH operations)

If you're using SSH to interact with GitHub (e.g., `git clone git@github.com:user/repo.git`), an "Invalid Credentials" error usually points to SSH key issues.

1.  **Verify SSH Agent is Running:** Open your terminal and run:
    ```bash
    ssh-add -l
    ```
    If it lists your keys, the agent is running and has keys loaded. If not, you might need to start it:
    ```bash
    eval "$(ssh-agent -s)"
    ```
    Then, add your private key:
    ```bash
    ssh-add ~/.ssh/your_private_key # Replace with your actual private key file name
    ```
2.  **Ensure SSH Key is Added to GitHub:**
    *   Go to GitHub Settings -> SSH and GPG keys.
    *   Verify that the public key corresponding to the private key your SSH agent is using (`~/.ssh/id_rsa.pub` or `~/.ssh/id_ed25519.pub` are common) is listed there.
    *   If not, add it by clicking "New SSH key," giving it a title, and pasting the contents of your public key file (e.g., `cat ~/.ssh/id_rsa.pub` and copy the output).
3.  **Test SSH Connection:** Run the following command:
    ```bash
    ssh -T git@github.com
    ```
    You should receive a message like: `Hi username! You've successfully authenticated, but GitHub does not provide shell access.` If you get an "Authentication failed" error, review steps 4.1 and 4.2 carefully.

## Step 5: Double-Check for Typos and Formatting

Even a small mistake can cause authentication to fail.

1.  **Username:** Ensure you are using your correct GitHub username.
2.  **PAT:** When copying and pasting your PAT, be extremely careful not to add or miss any characters. Many users encounter issues because of a trailing space or a missed digit.
3.  **SSH Keys:** Verify that the public key added to GitHub exactly matches the content of your `.pub` file.
4.  **API Endpoint:** While not strictly a credential issue, ensure your API calls are directed to the correct endpoint (e.g., `https://api.github.com/`).

## Step 6: Review API Request Headers

If you are making raw HTTP requests to the GitHub API, ensure your authentication header is correctly formatted.

1.  **Authorization Header:** The standard format for using a PAT in an API request is:
    ```
    Authorization: Bearer YOUR_PERSONAL_ACCESS_TOKEN
    ```
    Or, for basic authentication (username and PAT):
    ```
    Authorization: Basic BASE64_ENCODED_USERNAME:PAT
    ```
    (Note: Using "Basic" authentication with a PAT is generally less recommended than "Bearer" for most API interactions.)
2.  **Content-Type Header:** For most POST or PATCH requests, you'll also need:
    ```
    Content-Type: application/json
    ```
    Ensure these headers are present and correctly formatted in your HTTP request.

### Common Mistakes

One of the most common mistakes is forgetting to copy the Personal Access Token *immediately* after generation. GitHub does not show you the full token again for security reasons. If you lose it, you must generate a new one. Another pitfall is not assigning sufficient scopes to your PAT. For instance, if you're trying to create a repository but your token only has read permissions, you'll receive an "Invalid Credentials" error, but it's technically a permissions error masquerading as a credential issue. People also sometimes forget to restart their services after updating environment variables or configuration files, leading them to believe the token change didn't work. For SSH, forgetting to add the key to your SSH agent or ensuring the correct public key is registered on GitHub are frequent oversights.

### Prevention Tips

To prevent the "Invalid Credentials" error from recurring, implement a few best practices. Regularly review your generated Personal Access Tokens in your GitHub settings. Set expiration dates for all PATs to ensure they don't linger indefinitely. Use tokens with the minimum necessary scopes required for the task at hand; avoid granting broad permissions unless absolutely necessary. For applications, always use environment variables or secure secret management tools to store your tokens, rather than hardcoding them directly into your source code. Educate your team on proper credential handling, including the secure generation, storage, and rotation of API tokens and SSH keys. Regularly test your SSH connections and ensure your keys are up-to-date and correctly configured.