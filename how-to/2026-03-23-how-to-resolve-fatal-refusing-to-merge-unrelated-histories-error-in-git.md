---
title: "How to Resolve `fatal: refusing to merge unrelated histories` Error in Git"
date: "2026-03-23T02:08:10.558Z"
slug: "how-to-resolve-fatal-refusing-to-merge-unrelated-histories-error-in-git"
type: "how-to"
description: "Learn how to fix the Git error `fatal: refusing to merge unrelated histories` with a clear, step-by-step guide, including commands and prevention tips."
keywords: "git, git error, refusing to merge unrelated histories, git merge, git pull, allow-unrelated-histories, git fix, version control"
---

The world of Git is powerful, but sometimes it throws a curveball. One such curveball is the `fatal: refusing to merge unrelated histories` error. Encountering this message can feel like hitting a brick wall when you're trying to sync your local work with a remote repository. Don't worry, it's a common issue with a straightforward solution once you understand its roots.

### Problem Explanation

When you encounter the `fatal: refusing to merge unrelated histories` error, Git is essentially telling you that the repository you're trying to merge or pull from has a completely different starting point (history) than your current local repository. You'll typically see this message after attempting a `git pull` or `git merge` command, especially when trying to synchronize a newly initialized local repository with an existing remote one.

The full error message usually looks something like this:

```
fatal: refusing to merge unrelated histories
```

This error prevents Git from proceeding with the merge, leaving your local repository out of sync. It's a safety mechanism designed to prevent accidental mixing of two entirely separate projects that happen to be in the same location or share a remote origin, but have no common commit history connecting them.

### Why It Happens

This error arises because Git's default behavior is to only allow merges between repositories that share a common ancestor commit. This ensures that you're always merging changes within the same project lineage. When Git detects two completely separate histories, it flags them as "unrelated" and stops the merge to prevent potential data loss or corruption.

The most common scenarios leading to this error include:

1.  **Initializing a local repository (`git init`) and then trying to pull from an existing remote repository.** For example, you create a new folder, run `git init`, add a remote (`git remote add origin <URL>`), and then try `git pull origin main`. If the remote already has commits (e.g., a README.md file created through the web interface), your local repository (with its own initial commit) will have no shared history with it.
2.  **Creating an empty remote repository (e.g., on GitHub/GitLab), then locally initializing (`git init`), making your first commit, and *then* the remote repository gets its first commit (e.g., a README or license file added via the web interface) *before* you push.** When you then try to pull from this newly "initialized" remote, Git sees two separate initial commits.
3.  **Manually copying project files into a new local Git repository and then trying to link and pull from an existing remote project.** Git only cares about the commit history, not the file contents. If the histories are different, it won't merge.

Essentially, Git sees two distinct initial "big bangs" for the universe of your project, and it needs explicit permission to combine them.

### Step-by-Step Solution

To resolve the `fatal: refusing to merge unrelated histories` error, you need to explicitly tell Git that you understand these histories are unrelated and that you intend to merge them anyway. This is done using the `--allow-unrelated-histories` flag.

---

### ## Step 1: Back Up Your Local Changes (If Applicable)

Before attempting any merge operations, especially one involving unrelated histories, it's always a good practice to ensure your current work is safe. While this particular fix is generally safe, having a backup provides peace of mind.

You can simply copy your project directory to another location:
```bash
cp -r my_project my_project_backup
```
Or, if you have uncommitted changes you want to save without committing to the current branch, you can stash them:
```bash
git stash save "Backup before merging unrelated histories"
```

---

### ## Step 2: Ensure You're on the Correct Branch

Verify that you are on the branch you intend to merge the remote changes into (typically `main` or `master`).

Check your current branch:
```bash
git branch
```
If you're not on the correct branch, switch to it:
```bash
git checkout main
```
(Replace `main` with your target branch name if it's different).

---

### ## Step 3: Add the Remote Repository (If Not Already Added)

If you haven't already, you need to tell your local Git repository where the remote repository is located.

```bash
git remote add origin <remote_repository_url>
```
Replace `<remote_repository_url>` with the actual URL of your remote Git repository (e.g., `https://github.com/your-username/your-repo.git` or `git@github.com:your-username/your-repo.git`).

You can verify the remote was added correctly:
```bash
git remote -v
```
This command should show `origin` pointing to your remote URL.

---

### ## Step 4: Perform the Pull with `--allow-unrelated-histories`

This is the core step to resolve the error. You will use the `git pull` command with the `--allow-unrelated-histories` flag. This flag instructs Git to proceed with the merge even though the histories are distinct.

```bash
git pull origin main --allow-unrelated-histories
```
(Again, replace `main` with the name of the remote branch you want to pull from).

When you run this command, Git will merge the remote's history into your local branch. Because the histories were previously unrelated, Git will create a merge commit that explicitly ties the two histories together.

---

### ## Step 5: Resolve Merge Conflicts (If They Occur)

It's common for merge conflicts to arise when performing a merge between unrelated histories, especially if both your local repository and the remote repository have files with the same names (like `README.md`).

If conflicts occur, Git will pause the merge and inform you which files have conflicts.
```bash
git status
```
This command will list the files in conflict. You need to manually edit these files, choosing which changes to keep. Conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) will indicate the differing sections.

After resolving conflicts in each file:
```bash
git add .
```
This stages the resolved files.

---

### ## Step 6: Complete the Merge Commit

Once all conflicts are resolved and staged, you need to commit the merge. Git will usually open your default text editor with a pre-filled merge commit message. You can accept it or modify it if you wish.

```bash
git commit
```
Save and close the editor to complete the merge.

---

### ## Step 7: Push Your Merged Changes to the Remote

Finally, once the histories are unified locally and the merge commit is created, you need to push these changes back to your remote repository.

```bash
git push origin main
```
(Replace `main` with your branch name).

This command pushes your local branch, now containing the merged history, to the remote. Your local and remote repositories will now share a common history.

---

### Common Mistakes

When dealing with `refusing to merge unrelated histories`, users often make a few common mistakes:

1.  **Blindly Forcing the Push:** Some users, frustrated by sync issues, might try `git push -f` or `git push --force`. While force pushing has its place, it's generally used to overwrite remote history with your local history, which is not what's needed here. It won't solve the "unrelated histories" problem and can easily cause data loss for others if not used correctly. The `--allow-unrelated-histories` flag on `pull` is the correct approach to *merge* the histories.
2.  **Ignoring Merge Conflicts:** After running `git pull --allow-unrelated-histories`, if conflicts arise, failing to resolve them properly and commit the merge can leave the repository in a messy state. Always check `git status` and resolve conflicts diligently.
3.  **Not Understanding the Impact:** Forgetting that `--allow-unrelated-histories` essentially grafts two distinct timelines together. While it's the fix, it's a significant operation, and you should ensure the content merge makes sense for your project.
4.  **Misidentifying the "Source of Truth":** If you're trying to integrate an existing remote repository into a new local one, the remote is usually the "source of truth." Pulling with `--allow-unrelated-histories` correctly brings its content to you. Trying to push your local, initial content to a non-empty remote without pulling first often leads to this error.

### Prevention Tips

Preventing the `fatal: refusing to merge unrelated histories` error mostly comes down to establishing a common history from the outset.

1.  **Always `git clone` for existing projects:** If a remote repository already exists (even if it's currently empty), use `git clone <remote_url>` to get started. This automatically creates a local repository with the correct remote tracking and a shared history, even if the history is just an initial commit.
    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```
2.  **Initialize empty remote repositories correctly:** When creating a *brand new* repository on a platform like GitHub or GitLab, it's often best to initialize it with a `README.md` or a license file *through the web interface*. Then, `git clone` this *already initialized* remote repo. This ensures there's a common initial commit for you to clone.
    Alternatively, if you create a truly empty remote repo and `git init` locally, make your *first* local commit, then add the remote and *push* your initial commit *before* the remote gains any history of its own.
    ```bash
    # Local
    mkdir my_new_project
    cd my_new_project
    git init
    echo "# My New Project" > README.md
    git add .
    git commit -m "Initial commit"

    # Remote (assuming an empty remote repo has been created)
    git remote add origin <remote_repository_url>
    git push -u origin main # Push your initial commit to the empty remote
    ```
    This sequence ensures your local history becomes the remote's history from the start.
3.  **Pull frequently:** Keep your local repository up-to-date with the remote by pulling changes regularly. This minimizes the chances of significant divergent histories developing between your local work and the remote's `main` branch.
4.  **Be cautious with `git init`:** Understand that `git init` creates a brand-new, isolated repository. If your intention is to work on an existing project, `git clone` is almost always the correct first step.