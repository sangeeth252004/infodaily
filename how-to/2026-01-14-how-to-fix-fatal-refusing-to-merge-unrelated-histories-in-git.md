---
title: "How to Fix \"fatal: refusing to merge unrelated histories\" in Git"
date: "2026-01-14T10:24:17.023Z"
slug: "how-to-fix-fatal-refusing-to-merge-unrelated-histories-in-git"
type: "how-to"
description: "Learn how to resolve the common Git error \"fatal: refusing to merge unrelated histories\" with a step-by-step guide, including its causes, the `allow-unrelated-histories` solution, and prevention tips."
keywords: "git, unrelated histories, merge error, fatal error, git pull, git merge, allow unrelated histories, version control, git fix, common git errors"
---

### Problem Explanation

When working with Git, you might encounter the "fatal: refusing to merge unrelated histories" error. This message typically appears when you attempt to merge branches or pull changes from a remote repository, and Git detects that the two histories have no common ancestor commit. For example, you might see this after running `git pull origin main` or `git merge some-branch`, and the command fails with output similar to this:

```
fatal: refusing to merge unrelated histories
```

This error signifies that Git has stopped the merge operation because it believes the two sets of changes originate from entirely separate projects or initial commits. It's a safety mechanism designed to prevent accidental mixing of divergent codebases that were never intended to be combined.

### Why It Happens

Git's core strength lies in tracking changes and merging divergent histories that stem from a shared point. The "refusing to merge unrelated histories" error occurs precisely because Git cannot find this common lineage. This situation most commonly arises in a few specific scenarios:

1.  **Initializing a Local Repository Independently:** You created a local Git repository with `git init` and made some initial commits. Later, you tried to connect it to an *existing* remote repository (e.g., on GitHub, GitLab, or Bitbucket) that also started with its own `git init` and initial commit, and then attempted to `git pull` its content. Since both repositories started from scratch independently, their commit histories have no common root.
2.  **Re-initializing a Remote Repository:** A remote repository might have been accidentally deleted and then re-initialized, effectively wiping its commit history. When you try to push or pull from your local repository (which retains the old history) to this newly initialized remote, Git sees two distinct histories.
3.  **Importing an Existing Project without Proper Git Integration:** If a project was initially developed without Git, and then `git init` was run locally, and separately, the existing code was uploaded to a new remote Git repository (again, likely with `git init` and an initial commit on the remote), the two histories will be unrelated.

In essence, this error is Git's way of asking for explicit confirmation that you indeed want to combine two distinct project timelines.

### Step-by-Step Solution

The most straightforward way to resolve "fatal: refusing to merge unrelated histories" is by explicitly telling Git to allow the merge using the `--allow-unrelated-histories` option.

#### ## Step 1: Understand Your Current Git State

Before attempting any merge, it's good practice to understand your repository's current status. This helps confirm you are on the correct branch and have no pending changes that might complicate the process.

First, check your working directory:

```bash
git status
```

Ensure your working tree is clean. If you have uncommitted changes, either commit them or stash them:

```bash
git add .
git commit -m "Save local changes before merging unrelated histories"
```

Next, verify your current branch and remote connections:

```bash
git branch
git remote -v
```

This will show you which branch you're on (e.g., `main`, `master`, or `development`) and the URLs of your configured remotes. You'll primarily be dealing with the `origin` remote.

#### ## Step 2: Add the Remote Repository (If Not Already Done)

If you haven't already linked your local repository to the remote one, you need to add it. This step is often done first but is crucial if missing. Replace `<remote_url>` with the actual URL of your Git repository (e.g., from GitHub, GitLab, etc.).

```bash
git remote add origin <remote_url>
```

For example:

```bash
git remote add origin https://github.com/your-username/your-repo.git
```

If `git remote -v` already shows an `origin` remote, you can skip this step. If it points to an incorrect URL, you might need to update it: `git remote set-url origin <new_remote_url>`.

#### ## Step 3: Fetch the Remote Changes

Once the remote is configured, fetch all branches and their respective commit histories from the remote repository. This doesn't merge anything but downloads the data to your local repository, making it available for merging.

```bash
git fetch origin
```

This command will download all branches and their commit histories from the `origin` remote. You won't see changes applied to your local working directory yet.

#### ## Step 4: Perform the Merge with `--allow-unrelated-histories`

Now that you have the remote's history fetched, you can perform the merge. This is the critical step where you use the `--allow-unrelated-histories` flag. You'll typically merge the `origin`'s main branch (often `main` or `master`) into your current local branch.

First, ensure you are on the branch where you want to incorporate the remote changes (e.g., `main`):

```bash
git checkout main
```

Then, execute the merge command:

```bash
git merge origin/main --allow-unrelated-histories
```

*   **`git merge`**: The standard command to integrate changes.
*   **`origin/main`**: Specifies the branch from the `origin` remote that you want to merge. Adjust `main` if your remote's primary branch is named `master` or something else (e.g., `origin/master`).
*   **`--allow-unrelated-histories`**: This flag explicitly tells Git to proceed with the merge even if it detects no common history between the current branch and `origin/main`. It effectively overrides Git's safety check for this specific operation.

After running this command, Git will attempt to combine the two distinct histories.

#### ## Step 5: Resolve Merge Conflicts (If Any)

It's highly probable that after merging two unrelated histories, you will encounter merge conflicts. This happens when the same lines of code or files have been modified differently in both histories.

Git will pause the merge and indicate which files have conflicts. Your terminal output will look something like this:

```
Auto-merging <file_name>
CONFLICT (add/add): Merge conflict in <file_name>
Automatic merge failed; fix conflicts and then commit the result.
```

To resolve conflicts:
1.  Open the conflicted files in your text editor.
2.  You will see conflict markers (e.g., `<<<<<<<`, `=======`, `>>>>>>>`) indicating the differing versions.
3.  Manually edit the files to choose which changes to keep, combining them as appropriate.
4.  After resolving conflicts in a file, mark it as resolved:
    ```bash
    git add <conflicted_file_name>
    ```
5.  Repeat this for all conflicted files.
6.  You can use `git status` at any point to see which files still have conflicts.

#### ## Step 6: Commit and Push the Merged Changes

Once all conflicts are resolved and marked with `git add`, complete the merge by committing the changes. Git will usually pre-populate a commit message for the merge; you can accept it or modify it.

```bash
git commit
```

This will open your default text editor to allow you to finalize the commit message. Save and close the editor to complete the commit.

Finally, push your newly merged local branch, which now contains the combined history, to the remote repository:

```bash
git push origin main
```

Replace `main` with your branch name if it's different. This will update the remote repository with the consolidated history.

#### ## Step 7: Alternative Approach - Rebase (Use with Caution)

While merging with `--allow-unrelated-histories` is the most direct solution, some users might consider `git rebase` if they want a linear history. However, rebasing unrelated histories is generally not recommended, especially if the remote history is significant, as it fundamentally rewrites history. The primary goal of `rebase` is to integrate changes from one branch onto another by moving or combining a sequence of commits to a new base commit. When histories are unrelated, this becomes problematic and often involves force pushes that can disrupt other collaborators. Stick to the merge solution unless you fully understand the implications of rebase and are working alone or in a controlled environment.

### Common Mistakes

1.  **Forgetting to Add `origin/main` (or `origin/master`)**: Many users simply run `git merge --allow-unrelated-histories` without specifying *what* to merge. You must specify the remote branch, like `origin/main`.
2.  **Not Resolving Conflicts Properly**: Rushing through conflict resolution or accidentally discarding necessary changes can lead to lost work or a broken codebase. Take your time to review all conflicts carefully.
3.  **Attempting to `git push --force` prematurely**: Before performing the merge with `--allow-unrelated-histories`, some users might try to force push their local changes, thinking it will overwrite the remote. While `git push --force` has its uses, it typically won't resolve the "unrelated histories" error and can potentially overwrite the remote's valid history without merging, leading to data loss for others.
4.  **Misunderstanding `--allow-unrelated-histories`**: This flag permits a merge between two truly separate histories. It does not magically resolve conflicts, nor does it guarantee a clean merge. It's a directive to Git to proceed with the merge *despite* the lack of a common ancestor.

### Prevention Tips

Preventing the "fatal: refusing to merge unrelated histories" error boils down to ensuring a shared history from the beginning of your project.

1.  **Always Clone an Existing Repository**: If a remote repository already exists, the best practice is to always clone it (`git clone <remote_url>`) rather than initializing a local repository with `git init` and then trying to link it. Cloning automatically creates a local copy with a shared history.
2.  **Coordinate Initial Repository Setup**: When starting a new project that will be hosted on a remote Git service, establish a single source of truth from the outset. Either `git init` locally, make an initial commit, push it to a *new, empty* remote repository, and then have others clone it. Or, create an empty repository directly on the remote service, and then clone *that empty repository* locally.
3.  **Avoid Re-initializing Remote Repositories**: Do not delete and re-create a remote repository if local copies exist, as this will sever the historical link. If you need to clean up a remote repository, consider archiving it and creating a new one, or carefully remove all files but preserve the `.git` directory on the remote.
4.  **Regular `git pull` or `git fetch`**: Staying updated with the remote repository helps prevent unrelated histories from developing. Though this specific error is usually due to an initial setup issue, regular updates generally ensure a smoother workflow.

By understanding the root causes and following these best practices, you can largely avoid encountering the "fatal: refusing to merge unrelated histories" error, ensuring a more seamless Git experience.