---
title: "Resolving `git push` Rejection: \"Updates were rejected because the remote contains work that you do not have locally\""
date: "2026-04-10T20:35:26.014Z"
slug: "resolving-git-push-rejection-updates-were-rejected-because-the-remote-contains-work-that-you-do-not-have-locally"
type: "how-to"
description: "Learn how to fix the common \"Updates were rejected because the remote contains work that you do not have locally\" error in Git. This comprehensive guide explains the cause and provides step-by-step solutions."
keywords: "Git, git push, error, remote, local, pull, rebase, merge, commit, synchronization, version control, code"
---

## Problem Explanation

You've made some changes to your local Git repository, staged them, committed them, and now you're trying to push them to the remote repository (e.g., GitHub, GitLab, Bitbucket) using the command `git push`. However, instead of a successful update, you're met with a frustrating error message:

```
To github.com:your-username/your-repo.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'github.com:your-username/your-repo.git'
hint: Updates were rejected because the remote contains work that you do not have locally.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

This error signifies a divergence between your local branch and the remote branch. The remote repository has received updates from another source (perhaps another developer, or even yourself from a different machine) since your last pull or synchronization. Your local repository is now out of sync, and Git, in its effort to maintain a clean and predictable history, refuses to overwrite the remote changes with your older version.

## Why It Happens

The core of this error lies in Git's "fast-forward" merge policy. When you `git push`, Git checks if your local branch is a direct descendant of the remote branch. If it is, Git can simply "fast-forward" the remote branch to include your new commits, effectively moving its pointer forward.

However, when the remote branch has new commits that are not present in your local branch, a simple fast-forward is no longer possible. Your local branch is now based on an older commit than the remote branch. Pushing your changes directly would overwrite these newer remote commits, potentially losing work. Git prevents this by rejecting the push, informing you that the remote has work you haven't incorporated locally. This is a safety mechanism to prevent accidental data loss and maintain a linear, coherent commit history.

## Step-by-Step Solution

The most common and recommended way to resolve this is by integrating the remote changes into your local branch before attempting to push again. This is typically done using `git pull`.

### ## Step 1: Fetch and Pull Remote Changes

The first step is to bring the latest changes from the remote repository into your local repository.

```bash
git pull origin <your-branch-name>
```

Replace `<your-branch-name>` with the name of the branch you are working on (e.g., `main`, `master`, `develop`). `origin` is the default name for your remote repository.

**What happens here:**
*   `git pull` is a composite command that first performs `git fetch` (to download commits, files, and refs from the remote) and then `git merge` (to integrate those fetched commits into your current local branch).

**Potential Scenarios after `git pull`:**

*   **Automatic Merge (No Conflicts):** If your local changes and the remote changes do not overlap on the same lines of code, Git will automatically merge them. You'll see output indicating that files have been updated, and you can proceed to the next step.

*   **Merge Conflicts:** If both your local changes and the remote changes have modified the same parts of the same files, Git will stop the merge and report a merge conflict. You will see messages like:

    ```
    Auto-merging path/to/your/file.txt
    CONFLICT (content): Merge conflict in path/to/your/file.txt
    Automatic merge failed; fix conflicts and then commit the result.
    ```
    You will need to resolve these conflicts manually.

### ## Step 2: Resolve Merge Conflicts (If Any)

If `git pull` resulted in merge conflicts, you must manually resolve them.

1.  **Identify Conflicted Files:** Git will list the files with conflicts. You can also use `git status` to see them under the "Unmerged paths" section.

2.  **Open Conflicted Files:** Open each conflicted file in your code editor. You will find markers like `<<<<<<<`, `=======`, and `>>>>>>>` indicating the different versions of the code.

    ```
    <<<<<<< HEAD
    // Your local changes
    console.log("This is my local change.");
    =======
    // Remote changes
    console.log("This is the change from the remote.");
    >>>>>>> origin/main
    ```

3.  **Edit Files to Resolve Conflicts:** Carefully review the conflicting sections. Decide which version of the code you want to keep, or if you need to combine parts from both. **Crucially, you must remove the `<<<<<<<`, `=======`, and `>>>>>>>` markers.**

4.  **Stage Resolved Files:** After resolving all conflicts in a file, stage it using:

    ```bash
    git add path/to/your/resolved/file.txt
    ```

    Repeat this for all files that had conflicts.

### ## Step 3: Commit the Merge

Once all conflicts are resolved and the files are staged, you need to commit the merge.

```bash
git commit
```

Git will typically pre-populate a commit message indicating a merge. You can modify this message if you wish, but it's often sufficient to use the default. Save and close the commit message editor.

**Alternative to `git merge` with `git pull`:**

Instead of using `git pull` which defaults to merging, you might prefer to use `git rebase`. This rewrites your local commit history to appear as if your changes were made after the remote changes, resulting in a cleaner, linear history.

To use rebase:

1.  **Fetch Remote Changes:**
    ```bash
    git fetch origin
    ```
2.  **Rebase Your Branch onto the Remote Branch:**
    ```bash
    git rebase origin/<your-branch-name>
    ```

    This command takes your local commits and reapplies them one by one on top of the latest commit from the remote branch.

    **Handling Conflicts with `git rebase`:** If conflicts arise during `git rebase`, they are resolved similarly to merge conflicts. You'll edit the files, then stage them, and then continue the rebase:
    ```bash
    git add . # Or git add <specific-file>
    git rebase --continue
    ```
    If you decide to abandon the rebase, you can use:
    ```bash
    git rebase --abort
    ```

### ## Step 4: Push Your Changes Again

After successfully pulling (and resolving conflicts if necessary), your local branch should now contain all the remote changes, plus your own. You can now push your updated branch to the remote repository.

```bash
git push origin <your-branch-name>
```

This time, the push should be a fast-forward operation, and the command should succeed without the "Updates were rejected" error.

## Common Mistakes

One of the most common mistakes is to simply try `git push` again without first fetching and integrating the remote changes. This will predictably lead to the same rejection. Another frequent error is to force push (`git push -f`) immediately. While force pushing can resolve the immediate error, it overwrites the remote history and can cause significant problems for collaborators by losing their work or creating a disjointed history. **Only use `git push -f` if you are absolutely certain you know what you are doing and have communicated with your team.** Finally, during conflict resolution, forgetting to remove the `<<<<<<<`, `=======`, and `>>>>>>>` markers or failing to stage the resolved files before committing are common pitfalls.

## Prevention Tips

To prevent the "Updates were rejected" error, cultivate a habit of pulling frequently. Before starting new work, and regularly throughout your workday, fetch and merge or rebase the latest changes from the remote.

```bash
# Frequently
git pull origin <your-branch-name>
```

This keeps your local branch synchronized with the remote, minimizing the chances of divergence. If you're working on a busy branch, consider fetching more often to be aware of incoming changes. Communicate with your team about ongoing work to avoid accidentally stepping on each other's commits. If you anticipate significant changes from others, consider rebasing your work to maintain a cleaner, linear history, which can make future merges smoother.