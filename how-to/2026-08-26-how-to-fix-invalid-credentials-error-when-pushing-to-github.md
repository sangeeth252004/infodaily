---
title: "How to Fix \"Invalid Credentials\" Error When Pushing to GitHub"
date: "2026-08-26T05:32:16.243Z"
slug: "how-to-fix-invalid-credentials-error-when-pushing-to-github"
type: "how-to"
description: "Resolve the common \"Invalid Credentials\" error when pushing code to GitHub with this comprehensive troubleshooting guide. Learn why it happens and get step-by-step solutions."
keywords: "GitHub, invalid credentials, push error, Git, authentication, SSH, PAT, credential manager, Git prompt"
---

## Problem Explanation

You've been diligently working on your project, committing your changes locally, and are ready to push them to your remote GitHub repository. You type in your usual `git push` command, expecting your code to be uploaded. However, instead of a successful transfer, you're met with a frustrating error message:

```
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/yourusername/yourrepo.git/'
```

This "Invalid Credentials" error signifies that GitHub has rejected your attempt to authenticate. It means that the username and password (or other authentication method) you're providing are not recognized by GitHub as belonging to an authorized user for this operation. This prevents any further interaction with the remote repository, leaving your local changes unsynced.

## Why It Happens

The "Invalid Credentials" error fundamentally boils down to a failure in the authentication process between your local Git client and GitHub's servers. Git uses credentials to verify your identity before allowing you to perform actions like pushing, pulling, or cloning repositories. There are several common reasons why these credentials might be deemed invalid:

1.  **Incorrect Username or Password:** The most straightforward cause is simply mistyping your GitHub username or password. This can happen easily, especially if you have multiple accounts or have recently changed your password.
2.  **Outdated or Revoked Personal Access Token (PAT):** If you're using a PAT for authentication (which is the recommended method over passwords for Git operations), the token might have expired, been revoked by you or an administrator, or may not have the necessary permissions for the operation you're trying to perform.
3.  **Credential Manager Issues:** Your operating system or a third-party Git credential manager might be storing outdated or incorrect credentials. When Git attempts to connect, it retrieves these stored credentials, which are no longer valid, leading to the error.
4.  **Using a Password Instead of a PAT for HTTPS:** GitHub has deprecated password authentication for Git operations over HTTPS. If you're still attempting to use your account password, this will result in an "Invalid Credentials" error. You *must* use a Personal Access Token (PAT) instead.
5.  **SSH Key Misconfiguration:** If you're using SSH for authentication, an incorrect SSH key configuration (e.g., the wrong key being used, the key not being added to your GitHub account, or the SSH agent not running correctly) can also trigger authentication failures.

## Step-by-Step Solution

This section provides a structured approach to resolving the "Invalid Credentials" error. We'll start with the most common causes and progressively move to more complex troubleshooting.

### Step 1: Verify Your GitHub Username and Password (If Applicable)

If you are *certain* you are using your account password for HTTPS (which is not recommended and likely to fail), the first step is to double-check your credentials.

*   **Action:** Go to the GitHub website ([github.com](https://github.com)) and attempt to log in with your username and password.
*   **Outcome:** If you cannot log in here, your password is incorrect. Reset your password via GitHub's password recovery process. If you *can* log in, your username is correct, but the issue lies elsewhere.

### Step 2: Generate and Use a Personal Access Token (PAT)

As mentioned, GitHub strongly recommends using Personal Access Tokens (PATs) for Git operations over HTTPS instead of your account password. A PAT is a secure token you can create on GitHub that grants specific permissions to applications or Git operations.

*   **Action:**
    1.  Go to GitHub.com and log in.
    2.  Click on your profile picture in the top-right corner and select "Settings".
    3.  In the left-hand sidebar, scroll down and click "Developer settings".
    4.  Click "Personal access tokens" and then "Tokens (classic)".
    5.  Click the "Generate new token" button.
    6.  Give your token a descriptive name (e.g., "Git Push Token").
    7.  Set an expiration date for the token. It's best practice not to create tokens that never expire.
    8.  Under "Select scopes," check the boxes for the permissions your token needs. For pushing to repositories, you'll typically need at least `repo` (Full control of private repositories) or `public_repo` (Full control of public repositories).
    9.  Click "Generate token".
    10. **Crucially, copy the generated token immediately.** You will *never* see it again after leaving this page. Store it in a secure place.
*   **Outcome:** You will have a unique PAT that you can use instead of your password.

### Step 3: Update Your Git Credentials in Your Credential Manager

Your operating system or Git might be storing outdated credentials. You need to clear these so Git prompts you for new ones (which you'll provide using your PAT).

*   **On Windows:**
    *   **Action:** Open "Credential Manager" from the Windows search bar. Navigate to "Windows Credentials". Look for entries related to `git:https://github.com` or `github.com`. Select the relevant entry and click "Remove".
*   **On macOS:**
    *   **Action:** Open "Keychain Access" (Applications > Utilities > Keychain Access). In the search bar, type "GitHub". Look for entries like `github.com` or `Git credentials - github.com`. Right-click on them and select "Delete".
*   **On Linux:**
    *   **Action:** The default Git credential helper might be `store` or `cache`. If you're using `cache`, it's time-based. If you're using `store`, the credentials are in a file (usually `~/.git-credentials`). You can edit or delete this file. If you're using a more advanced helper, consult its documentation. For simplicity, you might temporarily disable the helper or clear its cache.

### Step 4: Force Git to Prompt for New Credentials

After clearing old credentials, you need to trigger Git to ask for them again. The easiest way is to attempt a Git operation that requires authentication.

*   **Action:** Open your terminal or Git Bash in your local repository. Run the following command:
    ```bash
    git push
    ```
*   **Outcome:** You should now be prompted for your username and password.
    *   **Username:** Enter your GitHub username.
    *   **Password:** **This is where you should paste your generated Personal Access Token (PAT)**. Do *not* paste your actual GitHub account password.

### Step 5: Troubleshoot SSH Authentication (If You Use SSH)

If you're using SSH for authentication (your remote URL will look like `git@github.com:yourusername/yourrepo.git`), the "Invalid Credentials" error can manifest differently, often as a "permission denied" error, but it's worth checking.

*   **Action:**
    1.  **Check SSH Agent:** Ensure your SSH agent is running. In your terminal, run `ssh-add -l`. If no keys are listed or you get an error, start the agent: `eval "$(ssh-agent -s)"`. Then add your key: `ssh-add ~/.ssh/id_rsa` (replace `~/.ssh/id_rsa` with the actual path to your private SSH key).
    2.  **Verify SSH Key on GitHub:** Go to your GitHub Settings > SSH and GPG keys. Ensure the public key corresponding to your private key is listed and active. If not, add it.
    3.  **Test SSH Connection:** Run `ssh -T git@github.com`. You should see a message like "Hi yourusername! You've successfully authenticated, but GitHub does not provide shell access."
*   **Outcome:** If these steps resolve the issue, your SSH configuration was likely the problem.

### Step 6: Re-clone the Repository

As a last resort, or if you suspect deeper configuration issues, a clean re-clone can often resolve persistent credential problems.

*   **Action:**
    1.  **Backup Local Changes:** If you have unpushed local commits, ensure they are backed up. You can temporarily copy your project folder to a safe location.
    2.  **Remove Local Repository:** Delete your existing local repository folder.
    3.  **Clone Again:** Open your terminal in the desired location and clone the repository using the HTTPS URL (which will now prompt for your PAT) or your SSH URL.
        ```bash
        # Example for HTTPS
        git clone https://github.com/yourusername/yourrepo.git

        # Example for SSH
        git clone git@github.com:yourusername/yourrepo.git
        ```
    4.  **Reapply Local Changes:** If you backed up your changes, carefully copy them back into the newly cloned repository and commit/push them.
*   **Outcome:** This ensures you have a clean, fresh connection with correct authentication methods set up from the start.

## Common Mistakes

Many users encounter the "Invalid Credentials" error due to a few recurring missteps. One of the most common is **continuing to try and use their GitHub account password** for HTTPS operations. Since GitHub has deprecated this for Git, it will always fail. Users might also **forget to copy the entire Personal Access Token** or accidentally paste only a portion of it, leading to a new "Invalid Credentials" error. Another frequent mistake is **not clearing the old credentials** from their operating system's credential manager. Git will continue to use the cached, invalid credentials even if you've generated a new PAT, leading to frustration. Finally, **incorrectly configuring SSH keys** or not ensuring the SSH agent is running and has the correct keys loaded can cause authentication problems that are misattributed to the wrong cause.

## Prevention Tips

Preventing the "Invalid Credentials" error is about adopting secure and robust authentication practices. **Always use Personal Access Tokens (PATs) for Git operations over HTTPS.** Store your PATs securely and consider using a password manager designed for secrets. When creating PATs, grant only the necessary permissions and set expiration dates. Regularly review your active PATs in your GitHub settings and revoke any that are no longer needed or are nearing expiration. If you prefer SSH, ensure your SSH keys are properly managed, securely stored, and that your SSH agent is configured to use the correct key for GitHub connections. Keeping your Git client and operating system's credential manager up-to-date can also help avoid conflicts. By proactively managing your authentication methods, you can significantly reduce the chances of encountering this disruptive error.