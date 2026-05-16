---
title: "How to Fix 'Could not resolve all dependencies' Error in Gradle Builds"
date: "2026-05-16T15:58:02.102Z"
slug: "how-to-fix-could-not-resolve-all-dependencies-error-in-gradle-builds"
type: "how-to"
description: "Troubleshoot and fix the 'Could not resolve all dependencies' error in Gradle. Learn common causes, step-by-step solutions, and prevention tips for successful builds."
keywords: "Gradle, dependencies, error, fix, troubleshoot, build failed, resolve dependencies, dependency resolution, Gradle cache, proxy, repository, offline mode, version conflict, build.gradle"
---

The "Could not resolve all dependencies" error is a common hurdle faced by developers working with Gradle. It's frustrating when your build fails, especially when you're just trying to get your project up and running or integrate a new library. But don't worry, this guide will walk you through understanding, diagnosing, and ultimately fixing this pesky problem.

### Problem Explanation

When you encounter the "Could not resolve all dependencies" error, Gradle is essentially telling you that it tried to find one or more of the external libraries (dependencies) that your project needs to compile or run, but it couldn't locate them. The error message typically appears during the configuration or compilation phase of your build.

You'll usually see output similar to this in your terminal or IDE build window:

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not resolve all dependencies for configuration ':app:debugRuntimeClasspath'.
> Could not find com.example:some-library:1.0.0.
  Searched in the following locations:
    - https://repo.maven.apache.org/maven2/com/example/some-library/1.0.0/some-library-1.0.0.pom
    - https://repo.maven.apache.org/maven2/com/example/some-library/1.0.0/some-library-1.0.0.jar
  Required by:
      project :app

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output. Run with --scan to get full insights.

* Get more help at https://help.gradle.org
```

The key part here is "Could not resolve all dependencies for configuration..." followed by "Could not find `groupId:artifactId:version`". This clearly indicates which specific dependency Gradle failed to locate and often lists the repositories it checked.

### Why It Happens

This error occurs when Gradle cannot successfully download or access one or more of the required external libraries that your project declares. There are several common reasons why this might happen:

1.  **Network Connectivity Issues:** Your machine might not have an active internet connection, or a firewall might be blocking Gradle's access to external dependency repositories. If you're behind a corporate proxy, Gradle might not be configured to use it.
2.  **Incorrect Repository Configuration:** Gradle needs to know *where* to look for dependencies. If the repository containing a specific library (e.g., Maven Central, Google Maven, a private Artifactory, or JCenter for older projects) is not declared or is misspelled in your `build.gradle` or `settings.gradle` file, Gradle won't find it.
3.  **Typos or Non-Existent Dependencies:** A simple typo in the `groupId`, `artifactId`, or `version` of a dependency declaration will lead Gradle to search for something that doesn't exist. Similarly, you might be requesting a version of a library that has not been published yet or has been removed from the repository.
4.  **Gradle Cache Corruption:** Over time, Gradle's local cache (where it stores downloaded dependencies) can become corrupted, leading to issues even if the dependency exists in remote repositories.
5.  **Offline Mode Enabled:** If Gradle is explicitly running in "offline mode," it will not attempt to fetch any new dependencies from remote repositories, relying solely on its local cache. If a dependency isn't in the cache, it will fail.

Understanding these root causes is the first step toward effective troubleshooting. Now, let's dive into the solutions.

### Step-by-Step Solution

Follow these steps to diagnose and resolve the "Could not resolve all dependencies" error in your Gradle build.

#### ## Step 1: Understand the Error Message and Identify the Culprit

The most crucial piece of information is the specific dependency that Gradle failed to resolve. Look for lines in the error output like:

```
> Could not find com.example:some-library:1.0.0.
```

This tells you exactly which `groupId`, `artifactId`, and `version` Gradle couldn't locate. Make a note of this dependency, as it will be your primary focus for the subsequent steps. The error message also often indicates *where* Gradle looked (e.g., `https://repo.maven.apache.org/maven2/...`), which can be a clue if a repository is missing.

#### ## Step 2: Check Network Connectivity and Proxy Settings

A surprising number of dependency resolution issues are due to basic network problems.

1.  **Verify Internet Connection:** Open a web browser and try to access a public site like `https://repo.maven.apache.org/maven2/` or `https://google.com`. If you can't access these, your internet connection is the problem.
2.  **Ping a Repository Host:** From your terminal, try pinging one of the repository hosts that Gradle mentioned in the error message (e.g., `ping repo.maven.apache.org`). If it fails, there's a network issue or firewall blocking access.
3.  **Configure Proxy Settings (if applicable):** If you're behind a corporate proxy, Gradle needs to be aware of it. You can configure proxy settings in your `gradle.properties` file (located in your Gradle user home directory, usually `~/.gradle/` on Linux/macOS or `%USERPROFILE%\.gradle\` on Windows, or within your project root for project-specific settings). Add the following lines, replacing the placeholders with your proxy details:

    ```properties
    systemProp.http.proxyHost=your.proxy.host
    systemProp.http.proxyPort=8080
    systemProp.https.proxyHost=your.proxy.host
    systemProp.https.proxyPort=8080
    systemProp.http.nonProxyHosts=localhost|127.0.0.1
    ```

    You might also need to specify proxy authentication if your proxy requires it.

    ```properties
    systemProp.http.proxyUser=your_username
    systemProp.http.proxyPassword=your_password
    systemProp.https.proxyUser=your_username
    systemProp.https.proxyPassword=your_password
    ```

    After configuring, try running your build again.

#### ## Step 3: Verify Repository Configuration

Gradle needs to know which repositories to search for dependencies. These are declared in the `repositories {}` block, typically in your `build.gradle` file (at the project level or module level) or sometimes in `settings.gradle`.

1.  **Check `build.gradle` and `settings.gradle`:** Open your project's `build.gradle` (or `build.gradle.kts`) and `settings.gradle` (or `settings.gradle.kts`) files. Ensure that all necessary repositories are declared. Common public repositories include:

    ```gradle
    repositories {
        mavenCentral() // Essential for most Java/JVM projects
        google()       // Essential for Android projects
        jcenter()      // Deprecated, but still used by older projects
        // Add any custom or private repositories here
        maven { url 'https://repo.spring.io/milestone' } // Example for Spring milestones
    }
    ```

2.  **Ensure All Required Repositories are Present:** If the problematic dependency is from a specific vendor or framework (e.g., Spring milestones, Jetpack Compose, a private company library), ensure that its corresponding repository URL is correctly added. A good practice is to declare `repositories {}` in the root `build.gradle` for multi-project builds and use `allprojects { repositories { ... } }` or `subprojects { repositories { ... } }` to apply them to all modules.

3.  **Check Repository Order:** While usually not the cause of "could not resolve," repository order can sometimes affect which version is picked. Generally, place more specific or faster repositories first.

#### ## Step 4: Scrutinize Dependency Declarations for Typos or Incorrect Versions

Now that you know which dependency is problematic (from Step 1), carefully examine its declaration in your `build.gradle` file.

1.  **Exact Match:** Ensure the `groupId`, `artifactId`, and `version` exactly match what Gradle reported as "Could not find." Even a single character typo will prevent resolution.
    *   Example: `implementation 'com.example:some-library:1.0.0'`
2.  **Verify Against Official Sources:** Go to Maven Central (`https://search.maven.org/`) or the official documentation/website for the problematic library. Search for the library using its `groupId` and `artifactId` to confirm that the specific `version` you're requesting actually exists and is spelled correctly. Sometimes, a developer might release a library under a slightly different `artifactId` or `groupId`.
3.  **Avoid Dynamic Versions (for troubleshooting):** If you're using dynamic versions like `1.0.+` or `latest.release`, temporarily replace them with a fixed, known-good version (e.g., `1.0.0`) to rule out issues with Gradle's dynamic version resolution.

#### ## Step 5: Clear the Gradle Cache and Re-sync

Gradle maintains a local cache of downloaded dependencies to speed up builds. Sometimes, this cache can become corrupted or outdated, leading to resolution failures.

1.  **Use `--refresh-dependencies`:** The most common and safest way to clear the cache for specific dependencies is to run your build command with the `--refresh-dependencies` flag. This forces Gradle to ignore locally cached versions and fetch them anew from remote repositories.

    ```bash
    ./gradlew clean build --refresh-dependencies
    # or just:
    ./gradlew --refresh-dependencies
    ```

    The `clean` task ensures that any compiled artifacts are removed before a fresh build, which is a good practice.

2.  **Manually Delete Cache (if persistent):** If `--refresh-dependencies` doesn't work, you can manually delete Gradle's caches. This is a more aggressive step and will force Gradle to re-download *everything* for all projects.
    *   **Location:**
        *   Linux/macOS: `~/.gradle/caches`
        *   Windows: `%USERPROFILE%\.gradle\caches`
    *   Delete the entire `caches` directory. Then, try running your build again: `./gradlew clean build`.
3.  **IDE Cache Invalidation:** If you're using an IDE like IntelliJ IDEA or Android Studio, sometimes their internal caches can also cause issues.
    *   Go to `File > Invalidate Caches / Restart...`
    *   Select "Invalidate and Restart" (and optionally "Clear file system cache and local history").

#### ## Step 6: Check for Gradle Offline Mode

Gradle has an "offline mode" feature that prevents it from accessing the internet to resolve dependencies. While useful for working without network access, it's a common cause of this error if accidentally enabled.

1.  **Command Line:** Ensure you are *not* passing the `--offline` flag when running your build.
    *   Correct: `./gradlew build`
    *   Incorrect (if you need to resolve dependencies): `./gradlew build --offline`
2.  **IDE Settings:**
    *   **Android Studio/IntelliJ IDEA:** Go to `File > Settings` (or `Android Studio > Preferences` on macOS) `> Build, Execution, Deployment > Gradle`. Ensure the "Offline work" checkbox is *unchecked*.
    *   **Eclipse (with Buildship):** Check your workspace or project settings for "offline mode" under Gradle.

#### ## Step 7: Investigate Specific Version Conflicts or Build Script Issues

While "Could not resolve" usually means "could not *find*," sometimes deep version conflicts can manifest in similar ways or block resolution.

1.  **Inspect Dependency Tree:** If the above steps don't work, there might be a more subtle issue. Use Gradle's `dependencies` task to inspect the full dependency tree for your project:

    ```bash
    ./gradlew dependencies --configuration <configurationName>
    ```

    Replace `<configurationName>` with the specific configuration mentioned in the error (e.g., `debugRuntimeClasspath`, `implementation`, `testImplementation`). This can reveal conflicts or unexpected dependency versions.

2.  **Gradle Sync Issues:** If using an IDE, try forcing a Gradle sync (e.g., the "Sync Project with Gradle Files" button in Android Studio or IntelliJ). This can sometimes resolve transient issues.

### Common Mistakes

When troubleshooting this error, developers often make a few common mistakes that can prolong the resolution process:

1.  **Ignoring the Specific Error Message:** Many users immediately jump to clearing caches without first identifying the exact dependency that failed. The error message is your best clue!
2.  **Forgetting `--refresh-dependencies`:** Simply running `gradlew clean build` often isn't enough. If the issue is with cached dependency metadata, `clean` won't force a fresh download. Always add `--refresh-dependencies` when dealing with resolution errors after making changes to repositories or dependencies.
3.  **Missing a Required Repository:** Assuming all dependencies are in Maven Central or Google Maven is a common pitfall. Many libraries (especially older ones, snapshots, or company-internal ones) reside in other repositories that must be explicitly added.
4.  **Typo in Dependency Coordinates:** It's surprisingly easy to misspell a `groupId`, `artifactId`, or `version`. Double-check these against official documentation or Maven Central.
5.  **Unintentionally Running in Offline Mode:** Forgetting that offline mode was enabled in an IDE or via a command-line flag can lead to confusion when dependencies aren't resolved.

### Prevention Tips

Preventing this error from occurring in the first place saves a lot of time and frustration. Implement these best practices in your Gradle projects:

1.  **Centralize Repository Declarations:** For multi-project builds, declare your `repositories {}` block in the root `build.gradle` file and apply it to all subprojects using `allprojects { repositories { ... } }`. This ensures consistency across your entire project.
2.  **Use Dependency Management Tools:** Leverage Gradle's Bill of Materials (BOMs) or Spring Boot's dependency management plugin to manage versions centrally. This helps prevent version conflicts and ensures that compatible versions of related libraries are used.
3.  **Pin Known-Good Versions:** Avoid using dynamic versions (e.g., `1.0.+` or `latest.release`) in production or shared development environments. While convenient, they can lead to unreproducible builds if a new version is released that breaks compatibility. Stick to explicit version numbers.
4.  **Regularly Review Dependency Declarations:** Periodically audit your `build.gradle` files to ensure all declared dependencies are still necessary and have correct coordinates and versions. Remove unused dependencies.
5.  **Utilize `gradle.properties` for Environment-Specific Config:** For sensitive information like proxy credentials or repository URLs that change per environment, use `gradle.properties`. Consider placing this file outside of version control for security.
6.  **Stay Updated with Gradle and Plugin Versions:** Keep your Gradle wrapper and essential plugin versions reasonably current. Newer versions often include bug fixes and improvements to dependency resolution logic.
7.  **Version Control Your `gradlew` and `gradle-wrapper.properties`:** Always commit your `gradlew` (or `gradlew.bat`) script and the `gradle/wrapper/gradle-wrapper.properties` file to version control. This ensures everyone on your team uses the same Gradle version and wrapper settings, enhancing build reproducibility.

By following these steps and incorporating prevention tips, you'll be well-equipped to tackle the "Could not resolve all dependencies" error and maintain a smooth, reliable Gradle build process.