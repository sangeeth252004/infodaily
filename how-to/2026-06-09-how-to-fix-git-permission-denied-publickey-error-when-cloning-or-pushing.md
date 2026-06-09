---
title: "How to Fix Git `Permission denied (publickey)` Error When Cloning or Pushing"
date: "2026-06-09T02:57:20.955Z"
slug: "how-to-fix-git-permission-denied-publickey-error-when-cloning-or-pushing"
type: "how-to"
description: "Resolve Git's \"Permission denied (publickey)\" error by ensuring your SSH keys are correctly configured and authorized on your Git hosting service."
keywords: "Git, Permission denied, publickey, SSH, Git error, cloning, pushing, SSH keys, Git authentication, command line"
---

## Problem Explanation

When you attempt to interact with a remote Git repository, such as cloning a new project or pushing your committed changes, you might encounter the dreaded `Permission denied (publickey)` error. This message indicates that the Git client on your local machine is trying to authenticate with the remote server using an SSH public key, but the server either doesn't recognize the key or doesn't have the necessary authorization configured for it. This effectively blocks your access, preventing any further operations with that remote repository.

You will typically see this error displayed in your terminal or command prompt immediately after trying to execute a Git command like `git clone git@github.com:user/repo.git` or `git push origin main`. The exact wording might vary slightly depending on your Git hosting provider (e.g., GitHub, GitLab, Bitbucket), but the core message of `Permission denied (publickey)` remains consistent, signaling an authentication failure.

## Why It Happens

The `Permission denied (publickey)` error is fundamentally an authentication problem rooted in how SSH (Secure Shell) handles secure connections. When you're asked to provide credentials to access a remote Git repository, especially for operations that modify the repository (like pushing), Git often uses SSH for secure communication. This process involves a pair of cryptographic keys: a private key that stays securely on your local machine and a public key that you share with the remote Git hosting service.

The server uses your public key to verify that the connection request is coming from a client possessing the corresponding private key. The error occurs when this verification fails. Common reasons include:

*   **No SSH key configured:** You haven't generated an SSH key pair on your local machine, or Git isn't aware of it.
*   **SSH key not added to the Git hosting service:** Your public SSH key has been generated but hasn't been uploaded and registered with your account on the platform you're trying to connect to (e.g., GitHub, GitLab).
*   **Incorrect SSH key being used:** Your system might be configured to use a different SSH key than the one you've registered with the Git hosting service.
*   **Permissions issues with SSH files:** The permissions on your `.ssh` directory or key files on your local machine are too broad, which SSH considers a security risk and will refuse to use those keys.
*   **Wrong SSH URL:** You might be using an HTTPS URL when you intend to use SSH, or vice-versa, leading to incorrect authentication attempts.

## Step-by-Step Solution

The most common and effective way to resolve the `Permission denied (publickey)` error is by correctly generating and configuring SSH keys.

### ## Step 1: Check for Existing SSH Keys

Before generating new keys, it's a good practice to see if you already have SSH keys set up.

Open your terminal or command prompt and run the following command:

```bash
ls -al ~/.ssh
```

This command lists the contents of your SSH directory. Look for files named `id_rsa.pub`, `id_ecdsa.pub`, or `id_ed25519.pub`. If you see one of these files, you likely have an existing public SSH key. If you don't see these files, you'll need to generate a new key pair.

### ## Step 2: Generate a New SSH Key Pair (If Necessary)

If you didn't find an existing public key in Step 1, you need to generate a new one. For most users, `ed25519` is the recommended algorithm due to its security and performance.

Run the following command, replacing `your_email@example.com` with your actual email address associated with your Git account:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

You'll be prompted to enter a file in which to save the key. Press `Enter` to accept the default location (`~/.ssh/id_ed25519`).

You'll then be asked to enter a passphrase. It's highly recommended to use a strong passphrase for added security. You'll need to enter this passphrase every time you use your SSH key. If you prefer not to use a passphrase, you can press `Enter` twice to leave it empty, but be aware of the security implications.

This will create two files in your `~/.ssh` directory: `id_ed25519` (your private key) and `id_ed25519.pub` (your public key).

### ## Step 3: Add Your SSH Private Key to the SSH Agent

The SSH agent is a program that holds your private keys and handles authentication requests. Adding your key to the agent makes it easier to use without repeatedly entering your passphrase.

First, ensure the SSH agent is running:

```bash
eval "$(ssh-agent -s)"
```

Then, add your private key to the agent. If you used the default name and location, it would be:

```bash
ssh-add ~/.ssh/id_ed25519
```

If you used a different name for your private key, adjust the command accordingly. If you set a passphrase, you'll be prompted to enter it here.

### ## Step 4: Copy Your SSH Public Key

You need to copy the contents of your public SSH key to add it to your Git hosting service.

If you're on macOS or Linux, you can use `pbcopy` (if available) or `cat` to display the key and then manually copy it:

```bash
cat ~/.ssh/id_ed25519.pub
```

If `pbcopy` is available on your system, you can copy it directly to your clipboard:

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

On Windows, you might use `clip` after displaying the key with `cat` or opening the file in a text editor:

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

**Important:** Ensure you copy the *entire* content of the `.pub` file, including the `ssh-ed25519` (or similar) prefix and your email address at the end.

### ## Step 5: Add Your SSH Public Key to Your Git Hosting Service

Now, you need to tell your Git hosting provider about your public key. The steps vary slightly depending on the service.

**For GitHub:**
1.  Go to your GitHub account settings.
2.  Navigate to "SSH and GPG keys" in the left sidebar.
3.  Click "New SSH key" or "Add SSH key".
4.  Give your key a descriptive title (e.g., "My Work Laptop").
5.  Paste your copied public key into the "Key" field.
6.  Click "Add SSH key".

**For GitLab:**
1.  Go to your GitLab profile settings.
2.  Navigate to "SSH Keys" in the left sidebar.
3.  Paste your copied public key into the "Key" field.
4.  Give your key a title.
5.  Click "Add key".

**For Bitbucket:**
1.  Go to your Bitbucket personal settings.
2.  Navigate to "SSH keys" under "Security".
3.  Click "Add key".
4.  Enter a label for your key.
5.  Paste your copied public key into the "Key" field.
6.  Click "Add key".

### ## Step 6: Test Your SSH Connection

After adding your public key to the hosting service, it's crucial to test if your SSH connection is working correctly.

Run the following command, replacing `github.com` with your Git provider's domain (e.g., `gitlab.com`, `bitbucket.org`):

```bash
ssh -T git@github.com
```

You should receive a message confirming your successful authentication, which might look something like:

```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

If you see this confirmation, your SSH keys are correctly configured. If you encounter another error, review the previous steps carefully, especially ensuring the correct key was copied and added.

### ## Step 7: Update Your Git Remote URL (If Necessary)

If you were previously using an HTTPS URL for your Git repository, you might need to switch to the SSH URL to leverage your newly configured SSH keys.

First, check your current remote URL:

```bash
git remote -v
```

If it shows an `https://` URL, you'll need to change it to an `ssh://` URL. For example, if your HTTPS URL was `https://github.com/user/repo.git`, the SSH URL will be `git@github.com:user/repo.git`.

To change the remote URL, use the following command, replacing `origin` with the name of your remote (usually `origin`) and the URL with the correct SSH URL:

```bash
git remote set-url origin git@github.com:user/repo.git
```

After updating the remote URL, try your `git clone` or `git push` command again.

## Common Mistakes

A frequent mistake is forgetting to add the **public** key (`.pub` file) to the Git hosting service, and instead attempting to add the private key, or copying only a portion of the public key. Ensure you are copying the *entire* contents of the `.pub` file. Another common oversight is not ensuring the SSH agent is running or that the private key has been added to it. If you've recently generated a key or restarted your machine, you might need to re-run `eval "$(ssh-agent -s)"` and `ssh-add ~/.ssh/id_ed25519`. Finally, users sometimes confuse the SSH URL format (`git@github.com:user/repo.git`) with the HTTPS format (`https://github.com/user/repo.git`) and might try to use an SSH key with an HTTPS URL, which will not work.

## Prevention Tips

To prevent this issue from recurring, consistently use SSH URLs for your Git repositories whenever possible, as they often offer more secure and streamlined authentication. Keep your SSH private keys secure by never sharing them and ensuring they are protected by strong passphrases. Regularly review your SSH keys registered with your Git hosting providers to ensure they are up-to-date and that no unauthorized keys are present. If you work on multiple machines, ensure you generate and configure SSH keys on each machine you intend to use for Git operations, and add them to your Git hosting service. Automating the SSH agent setup on system startup can also help ensure your keys are always available when you need them.