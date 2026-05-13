---
title: "How to Fix \"fatal: Authentication failed\" When Pushing to a Git Repository"
date: "2026-05-13T21:25:37.703Z"
slug: "how-to-fix-fatal-authentication-failed-when-pushing-to-a-git-repository"
type: "how-to"
description: "Learn how to resolve the \"fatal: Authentication failed\" error when pushing to Git. This comprehensive guide covers common causes like incorrect credentials, SSH key issues, and remote URL problems, with step-by-step solutions."
keywords: "git, authentication failed, fatal authentication, git push error, fix git authentication, personal access token, SSH key, credential helper, git troubleshooting"
---

### Problem Explanation

You've just made some fantastic changes to your local Git repository and are ready to share them with the world (or at least your team). You type `git push` into your terminal, hit enter, and instead of seeing your changes upload, you're met with a jarring error message that looks something like this:

```
remote: Support for password authentication was removed on August 13, 2021. Please use a personal access token instead.
fatal: Authentication failed for 'https://github.com/your-username/your-repository.git/'
```

Or, if you're using SSH, you might see something more concise like:

```
fatal: Authentication failed for 'git@github.com:your-username/your-repository.git/'
```

This "fatal: Authentication failed" message means that Git, when trying to communicate with your remote repository host (like GitHub, GitLab, or Bitbucket), couldn't verify your identity. It essentially tried to knock on the door, but the security guard (the remote server) didn't recognize your credentials, denying you entry. As a result, your push operation fails, and your local changes remain local, unshared with the remote repository.

### Why It Happens

The "Authentication failed" error fundamentally occurs because the remote Git host doesn't trust that you are who you claim to be, or that you have the necessary permissions to write to the repository. There are several common reasons why this might happen:

1.  **Incorrect Credentials:** This is the most frequent culprit. You might be providing an incorrect username, password, or, more commonly now for HTTPS, an expired or revoked Personal Access Token (PAT). Git credential helpers can sometimes store outdated information, leading to this issue even if you think you're typing the correct credentials.
2.  **Improper SSH Key Setup:** If you're using SSH for authentication, the problem could be that your local SSH key isn't properly loaded into your SSH agent, the key isn't associated with your account on the remote Git host, or the key itself is corrupted or has incorrect permissions.
3.  **Incorrect Remote URL:** Your local repository might be configured with an incorrect remote URL. For instance, you might be trying to push using an HTTPS URL when your remote host is expecting an SSH connection (or vice-versa), or there might be a typo in the URL itself.
4.  **Insufficient Repository Permissions:** Even if your authentication credentials are correct, your user account on the remote Git host might not have the necessary write permissions for that specific repository. This is common in team environments where permissions are finely controlled.

Understanding these root causes is the first step toward effectively troubleshooting and resolving the problem.

### Step-by-Step Solution

Let's walk through the most common fixes for this error, starting with the simplest and most frequent solutions.

## Step 1: Verify Your Credentials (Personal Access Token or Password)

For HTTPS connections, most Git hosts (like GitHub since August 2021) have deprecated password authentication and require a Personal Access Token (PAT) instead. If you're still trying to use your account password, this is likely your issue.

**Action:**
1.  **Generate a New Personal Access Token (PAT):**
    *   **GitHub:** Go to `Settings > Developer settings > Personal access tokens > Tokens (classic)`. Click "Generate new token" and give it a descriptive name (e.g., "My Dev Machine"). Crucially, select the necessary scopes, typically `repo` for full repository access, and potentially `workflow` if you use GitHub Actions. Set an appropriate expiration date (or "No expiration" if you prefer, though generally less secure). Copy the token immediately after creation, as you won't see it again.
    *   **GitLab/Bitbucket:** Similar options exist under your user settings, usually under "Access Tokens" or "App passwords." Consult their documentation for specifics.
2.  **When Git Prompts:** The next time you `git push`, when prompted for your password, paste your newly generated PAT instead of your account password. For the username, use your Git host username.

## Step 2: Clear and Re-enter Stored Git Credentials

Your operating system or Git itself might be caching old, incorrect, or expired credentials. Clearing these forces Git to prompt you for fresh credentials.

**Action:**
1.  **Disable Git's Credential Helper (Temporarily or Permanently):**
    *   To remove the credential helper for the current session or globally (it will prompt for credentials every time):
        ```bash
        git config --global --unset credential.helper
        ```
    *   Alternatively, you can just tell Git to store credentials in memory for a short time, which also forces a re-prompt:
        ```bash
        git config --global credential.helper store --unset
        git config --global credential.helper cache --timeout=3600
        ```
        (This will cache for one hour)
2.  **Clear OS-specific Credential Stores:**
    *   **Windows:** Open "Credential Manager" (search for it in the Start menu). Under "Windows Credentials," look for entries related to `git:` or your Git host (e.g., `git:https://github.com`). Remove any entries associated with the problematic repository or Git host.
    *   **macOS:** Open "Keychain Access" (search in Spotlight). In the "login" keychain, search for "git" or your Git host (e.g., `github.com`). Delete any entries for `github.com` (or similar for GitLab/Bitbucket) that store Git credentials.
3.  **Attempt Push Again:** After clearing, try `git push` again. You should be prompted for your username and then your password/PAT. Enter the correct details from Step 1.

## Step 3: Check Your Remote Repository URL

Ensure your local repository is pointing to the correct remote URL and using the expected protocol (HTTPS or SSH).

**Action:**
1.  **Inspect Remote URLs:**
    *   In your repository's root directory, run:
        ```bash
        git remote -v
        ```
    *   This will show you the configured fetch and push URLs. Look for the `origin` remote.
    *   **HTTPS Example:** `https://github.com/your-username/your-repository.git`
    *   **SSH Example:** `git@github.com:your-username/your-repository.git`
2.  **Change Remote URL (If Incorrect):**
    *   If the URL is wrong, you can update it. For example, to switch from HTTPS to SSH or correct a typo:
        ```bash
        git remote set-url origin git@github.com:your-username/your-repository.git
        # Or to switch to HTTPS
        git remote set-url origin https://github.com/your-username/your-repository.git
        ```
    *   **Important:** If you switch from HTTPS to SSH, you'll need to ensure your SSH key is properly set up (see Step 4).

## Step 4: Troubleshoot SSH Key Setup (If Using SSH)

If you're using SSH for authentication and encounter the error, your SSH key might not be correctly configured or recognized.

**Action:**
1.  **Verify SSH Agent is Running and Key is Loaded:**
    *   Run `ssh-add -l`. If it says "The agent has no identities," your key isn't loaded.
    *   Start the SSH agent (if not running) and add your key (replace `id_rsa` with your key's filename if different):
        ```bash
        eval "$(ssh-agent -s)"
        ssh-add ~/.ssh/id_rsa
        ```
    *   If prompted for a passphrase, enter it.
2.  **Test SSH Connection to Host:**
    *   Test if you can connect to your Git host via SSH:
        ```bash
        ssh -T git@github.com
        # (Replace github.com with gitlab.com or bitbucket.org as appropriate)
        ```
    *   You should see a message indicating successful authentication (e.g., "Hi username! You've successfully authenticated..."). If you see "Permission denied" or similar, the issue is with your SSH key setup on the remote host or locally.
3.  **Ensure Public Key is on Remote Host:**
    *   Log in to your Git host's web interface (GitHub, GitLab, Bitbucket).
    *   Navigate to your `Settings > SSH and GPG keys` (or similar).
    *   Verify that your *public* SSH key (the `.pub` file in `~/.ssh/`) is correctly added to your account. If not, add it.

## Step 5: Verify Repository Permissions

Sometimes, the issue isn't with your credentials but with the permissions assigned to your user account for that specific repository.

**Action:**
1.  **Check Repository Permissions on Git Host:**
    *   Log in to your Git host's web interface.
    *   Navigate to the repository in question.
    *   Look for "Settings," "Manage Access," or "Members" sections.
    *   Confirm that your user account has "write" or "maintainer" access (or equivalent) for that repository. If you only have "read" access, you won't be able to push.
2.  **Contact Repository Administrator:**
    *   If you suspect a permission issue and can't change it yourself, reach out to the repository owner or your team's administrator to request appropriate write access.

## Step 6: Update Git

While less common, an outdated Git client can sometimes lead to authentication problems, especially as remote hosts update their security protocols.

**Action:**
1.  **Update Git:**
    *   **macOS (Homebrew):** `brew upgrade git`
    *   **Windows (Git Bash installer):** Download and run the latest installer from git-scm.com.
    *   **Linux (apt):** `sudo apt update && sudo apt upgrade git`
    *   **Linux (yum):** `sudo yum update git`
2.  After updating, retry your `git push`.

### Common Mistakes

When troubleshooting the "Authentication failed" error, users often make a few common blunders:

*   **Using Account Password for HTTPS:** The most frequent mistake is still trying to use your main account password when the remote host (especially GitHub) explicitly requires a Personal Access Token (PAT) for HTTPS pushes. The error message usually hints at this.
*   **Incorrect PAT Scopes or Expiry:** When generating a PAT, users sometimes forget to grant the necessary "repo" scope (or equivalent write permissions) or set too short an expiry, leading to the token being invalid.
*   **Not Clearing Old Credentials:** Even after generating a new PAT, if old, incorrect credentials are still cached by an operating system's credential manager or Git's credential helper, Git will keep trying to use them, causing the failure to persist.
*   **Confusing HTTPS and SSH:** Mixing up authentication methods, such as having an HTTPS remote URL but expecting SSH key authentication, or vice-versa. The method needs to match the URL's protocol.
*   **Typos in Credentials or URLs:** A simple typo in a username, PAT, or remote URL can lead to authentication failure, which can be frustratingly hard to spot.
*   **Incorrect `~/.ssh/config` or Key Permissions:** For SSH users, incorrect permissions on `.ssh` directory or key files (`chmod 700 ~/.ssh`, `chmod 600 ~/.ssh/id_rsa`), or a misconfigured `~/.ssh/config` file, can prevent the SSH agent from using the correct key.

### Prevention Tips

Avoiding "Authentication failed" errors saves valuable time and frustration. Here are some best practices:

*   **Prioritize SSH Keys for Private Repositories:** For personal or team private repositories, SSH keys are generally more secure and convenient than PATs, as they don't expire and don't require manual regeneration unless you change your key pair.
*   **Use Personal Access Tokens (PATs) for HTTPS:** If you must use HTTPS, always use PATs for authentication. Generate them with the principle of least privilege – only grant the scopes absolutely necessary – and set an appropriate (but not too short) expiry date.
*   **Store PATs Securely:** If your OS has a credential manager (Windows Credential Manager, macOS Keychain), configure Git to use it (`git config --global credential.helper manager` or `osxkeychain`). This securely stores your PATs and avoids re-entering them frequently.
*   **Regularly Audit PATs:** Periodically review your generated PATs on your Git host's settings. Delete any unused or expired tokens.
*   **Keep Git Updated:** Regularly update your Git client to benefit from the latest security features, bug fixes, and compatibility with remote host changes.
*   **Test SSH Connections:** After setting up a new SSH key or configuring a new remote, use `ssh -T git@github.com` (or similar) to confirm connectivity and authentication *before* attempting a `git push`.
*   **Use Descriptive Commit Messages and PRs:** While not directly related to authentication, clear communication about changes can prevent access issues from human error in permission granting.
*   **Document Authentication Methods:** If working in a team, clearly document the preferred and required authentication methods for your repositories. This is especially helpful for onboarding new team members.