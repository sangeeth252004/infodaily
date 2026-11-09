---
title: "How to Resolve 'Unmet Dependencies' Error During `apt install` on Debian/Ubuntu"
date: "2026-11-09T13:37:31.162Z"
slug: "how-to-resolve-unmet-dependencies-error-during-apt-install-on-debian-ubuntu"
type: "how-to"
description: "Learn to diagnose and fix the 'Unmet Dependencies' error in Debian and Ubuntu during `apt install`. This guide provides step-by-step solutions, including using `apt --fix-broken install`, checking repositories, and cleaning up your system."
keywords: "unmet dependencies, apt install error, Debian, Ubuntu, fix broken packages, package management, apt, dpkg, sources.list, PPA, troubleshooting"
---

### Problem Explanation

When attempting to install, upgrade, or even remove software packages on Debian or Ubuntu systems using the `apt` command, users occasionally encounter the dreaded "Unmet Dependencies" error. This specific issue prevents the desired package operation from completing, leaving the system in a state where the requested software cannot be installed or updated. The error message typically manifests as a block of text, often similar to the following:

```
The following packages have unmet dependencies:
 package-name : Depends: dependency-name (= version-string) but version-string is to be installed
                Depends: another-dependency (>= minimum-version) but it is not installable
E: Unmet dependencies. Try 'apt --fix-broken install' with no packages (or specify a solution).
```

This output indicates that the package you are trying to manipulate requires other packages (dependencies) at specific versions or conditions that are not currently met or available on your system. Until these prerequisites are satisfied, `apt` cannot proceed with the requested action, ensuring system stability by preventing the installation of potentially non-functional software.

### Why It Happens

The "Unmet Dependencies" error primarily occurs when the package manager cannot find or install all the necessary prerequisite packages required by the software you are trying to install. Several underlying reasons can lead to this situation:

1.  **Broken or Mismatched Repositories:** This is a common culprit. If your `/etc/apt/sources.list` file or entries in `/etc/apt/sources.list.d/` point to incorrect, outdated, or conflicting software repositories (including Personal Package Archives, or PPAs), the package manager might fetch incompatible package versions or fail to find required dependencies altogether.
2.  **Partial Upgrades or Interrupted Operations:** If a system upgrade was interrupted, or if `apt` commands were forcefully terminated, some packages might be partially installed or configured incorrectly, leading to a "broken" state that prevents further operations.
3.  **Conflicting Package Versions:** Sometimes, installing a new package might require a dependency at a version that directly conflicts with an already installed package, or with another dependency required by a different piece of software. This creates an unresolvable conflict for the package manager.
4.  **Holding Back Packages:** If specific packages have been intentionally "held" (e.g., using `apt-mark hold`), they might prevent critical dependencies from being upgraded or installed to the version required by new software.
5.  **External or Third-Party Packages:** Packages installed from `.deb` files directly, or from unofficial sources, may not properly integrate with the system's dependency resolution, leading to conflicts or missing dependencies.

### Step-by-Step Solution

Addressing unmet dependencies requires a systematic approach to identify and rectify the underlying cause.

#### ## Step 1: Understand the Error Output

Before executing any commands, carefully read the full error message. It explicitly lists the problematic packages and their unmet dependencies. This information is crucial for diagnosing the specific conflict. Pay attention to package names, required versions, and whether a dependency is "not installable" or simply at the wrong version.

#### ## Step 2: Update Package Lists and Upgrade System

Often, the issue stems from an outdated package index or a system that isn't fully up-to-date. Refreshing the package lists and attempting a full upgrade can resolve many dependency issues by making newer, compatible versions available.

```bash
sudo apt update
sudo apt upgrade
```

If `apt upgrade` reports further unmet dependencies, proceed to the next step.

#### ## Step 3: Attempt to Fix Broken Dependencies Automatically

`apt` and `dpkg` provide tools specifically designed to resolve broken packages and dependencies.

First, try `apt --fix-broken install`. This command attempts to correct a system with broken dependencies by installing any missing ones or removing conflicting packages as a last resort. Do not specify any package names with this command.

```bash
sudo apt --fix-broken install
```

Next, ensure that all partially installed packages are properly configured. This command reconfigures any unpacked but unconfigured packages.

```bash
sudo dpkg --configure -a
```

If these commands succeed, try your original `apt install` command again.

#### ## Step 4: Clean Up Unused Packages and Cache

Leftover packages or an overflowing cache can sometimes contribute to dependency confusion. Clearing them out can help.

The `autoremove` command removes packages that were automatically installed to satisfy dependencies for other packages and are no longer needed.

```bash
sudo apt autoremove
```

The `clean` command clears out the local repository of retrieved package files (`.deb` files). These files are stored in `/var/cache/apt/archives/`.

```bash
sudo apt clean
```

After these commands, run `sudo apt update && sudo apt upgrade` again, and then retry your original installation.

#### ## Step 5: Examine and Disable Problematic Repositories (PPAs)

If the problem persists, especially if it points to packages from specific sources, your `sources.list` or added PPAs might be the cause.

Inspect your repository sources:
```bash
cat /etc/apt/sources.list
ls /etc/apt/sources.list.d/
```

Look for any recently added or unofficial repositories. PPAs are commonly found in `/etc/apt/sources.list.d/`. If you suspect a PPA is causing the issue, it's best to temporarily disable or remove it.

To remove a PPA, use `add-apt-repository` with the `--remove` flag. Replace `ppa:user/ppa-name` with the actual PPA entry (e.g., `ppa:ondrej/php`).

```bash
sudo add-apt-repository --remove ppa:user/ppa-name
```

Alternatively, you can manually comment out (add `#` at the beginning of the line) or delete `.list` files in `/etc/apt/sources.list.d/`. Always back up files before modifying them. After making changes, update your package lists:

```bash
sudo apt update
sudo apt upgrade
```

Then, retry installing your desired package.

#### ## Step 6: Manually Install or Remove Conflicting Packages

If the error message clearly identifies a specific package and version conflict, you might need to manually address it.

*   **Downgrade/Upgrade a Specific Package:** If `package-A` requires `dependency-X` at version `1.0`, but your system has `dependency-X` at version `2.0`, you might need to install `dependency-X=1.0`. You can see available versions with `apt policy dependency-X`.
    ```bash
    sudo apt install dependency-X=1.0
    ```
    This is risky and should only be done if you understand the implications for other software.
*   **Remove Conflicting Packages:** If the error states that `package-A` cannot be installed because it conflicts with an already installed `package-B`, you might need to remove `package-B` first.
    ```bash
    sudo apt remove package-B
    ```
    Ensure that removing `package-B` does not break other essential parts of your system.
*   **Utilize `aptitude`:** `aptitude` is a more powerful, dependency-resolving package manager. If installed (`sudo apt install aptitude`), `aptitude install <package-name>` will often suggest multiple solutions to dependency problems, allowing you to choose the best option.

#### ## Step 7: Reinstall Problematic Packages

If the dependency error points to a core library or a package that is known to be broken (e.g., from a partial installation), reinstalling it can sometimes fix the issue.

```bash
sudo apt reinstall package-name
```

This command will download the package again and attempt to install it, potentially resolving any corruption.

### Common Mistakes

1.  **Ignoring the Specific Error Message:** Many users immediately jump to generic solutions without reading which packages and dependencies are actually causing the problem. The error output contains vital clues.
2.  **Blindly Removing Packages:** Removing packages without understanding their role or impact on other installed software can lead to a broken system or render essential applications unusable. Always review what `apt remove` proposes to remove.
3.  **Adding Too Many Unofficial PPAs:** While PPAs can provide newer software, adding too many or untrusted ones significantly increases the chance of dependency conflicts and system instability.
4.  **Not Updating After Repository Changes:** After adding, removing, or modifying entries in `sources.list` or `sources.list.d`, failing to run `sudo apt update` means the package manager is still working with old information, perpetuating the problem.
5.  **Force-Installing Packages:** Using `dpkg -i --force-depends` or similar commands to bypass dependency checks is extremely risky and almost always leads to a truly broken system that is harder to repair.

### Prevention Tips

1.  **Regularly Update and Upgrade:** Keep your system updated by routinely running `sudo apt update && sudo apt upgrade`. This ensures you have the latest stable package versions and reduces the likelihood of encountering outdated dependency issues.
2.  **Be Selective with PPAs and Third-Party Repositories:** Only add PPAs or external repositories from trusted sources. If a PPA is no longer maintained or actively developed, consider removing it. Always verify the PPA's compatibility with your Ubuntu/Debian version.
3.  **Understand Package Origins:** Before installing a package, especially if it's not from the main repositories, try to understand where it comes from and its potential impact on your system. Use `apt policy <package-name>` to see where `apt` would source a package from and its available versions.
4.  **Avoid Interrupted Upgrades:** Ensure a stable internet connection and power supply when performing system upgrades. If an upgrade is interrupted, immediately run `sudo dpkg --configure -a` and `sudo apt --fix-broken install`.
5.  **Use Snap or Flatpak for Isolated Applications:** For applications that are difficult to manage with traditional `apt` dependencies, consider using containerized solutions like Snap or Flatpak. These technologies bundle applications with their dependencies, isolating them from the main system and preventing conflicts.