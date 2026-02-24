---
title: "How to Fix \"Build Failed: java.lang.OutOfMemoryError: Java heap space\" in Android Studio"
date: "2026-02-24T20:35:20.539Z"
slug: "how-to-fix-build-failed-java-lang-outofmemoryerror-java-heap-space-in-android-studio"
type: "how-to"
description: "Experiencing 'Build Failed: java.lang.OutOfMemoryError: Java heap space' in Android Studio? This comprehensive guide provides step-by-step solutions to increase memory allocation for Gradle and the IDE, helping you resolve and prevent build errors."
keywords: "Android Studio, OutOfMemoryError, Java heap space, build failed, Gradle, JVM arguments, memory allocation, Gradle properties, vmoptions, fixing build errors"
---

## Problem Explanation

Encountering a "Build Failed: java.lang.OutOfMemoryError: Java heap space" error in Android Studio can be a frustrating roadblock for any developer. This specific error message indicates that the Java Virtual Machine (JVM) responsible for executing your build process has run out of allocated memory. You'll typically see this message prominently displayed in the "Build" output window within Android Studio, often accompanied by a stack trace that pinpoints the exact moment the memory exhaustion occurred.

This issue commonly arises during various stages of your project's lifecycle, such as when you're syncing Gradle, compiling your code, running complex annotation processors, or even simply trying to rebuild a large project. The build process will halt abruptly, preventing your application from compiling, packaging, or running on an emulator or device. The core message "Java heap space" specifically refers to the region of memory where objects are allocated, and when this space is fully utilized, the JVM cannot proceed.

## Why It Happens

The root cause of the "java.lang.OutOfMemoryError: Java heap space" error is straightforward: the Java process responsible for building your Android project, primarily the Gradle Daemon, has exhausted the memory it was allotted. Every Java application runs within a JVM, and this JVM is given a specific amount of memory for its operations, known as the heap. Android projects, especially as they grow in size, complexity, and the number of dependencies, require a significant amount of this heap space.

Several factors contribute to this memory crunch. Large projects with hundreds of classes, numerous third-party libraries, multiple modules, or extensive use of code generation tools (like Dagger, Room, or Data Binding) can push the default memory limits. Additionally, a project's build configuration, including complex custom tasks or a high number of build variants, can also demand more memory. By default, Android Studio and Gradle are configured with a reasonable, but often conservative, amount of heap space. As your project scales, these default settings might no longer be sufficient, leading to the dreaded OutOfMemoryError.

## Step-by-Step Solution

Let's dive into the practical steps to overcome this persistent build error. We'll start with the most common fixes and move to more advanced troubleshooting.

### Step 1: Increase Gradle Daemon Heap Space in `gradle.properties`

This is the most frequent and effective solution, as the Gradle Daemon is the primary memory consumer during the build process.

1.  **Locate `gradle.properties`**: In your Android Studio project, find the `gradle.properties` file. This file is typically located at the root of your project directory (the same level as `app` and `build.gradle` for the project).
2.  **Add or Modify `org.gradle.jvmargs`**: Open the `gradle.properties` file. Look for a line that starts with `org.gradle.jvmargs`. If it doesn't exist, add it. If it does, you'll modify it.
    The key part of this line is `-Xmx<SIZE>g`, which sets the maximum heap size for the Gradle Daemon.
    
    A common starting point is `4g` (4 gigabytes) or `6g`. For very large projects, you might go up to `8g` or even `12g`, but ensure your system has enough physical RAM to support this.
    
    Add or modify the line to something like this:
    ```properties
    org.gradle.jvmargs=-Xmx6g -Dfile.encoding=UTF-8
    ```
    *   `-Xmx6g`: This tells the Gradle Daemon to use a maximum of 6 Gigabytes of heap memory. Adjust `6g` based on your project size and available system RAM.
    *   `-Dfile.encoding=UTF-8`: This is a standard setting for character encoding and is good practice to include.
3.  **Sync Project with Gradle Files**: After saving `gradle.properties`, Android Studio will usually prompt you to sync your project. If not, click the "Sync Project with Gradle Files" icon in the toolbar (a refresh icon with an elephant).

### Step 2: Increase Android Studio's JVM Heap Space

While the previous step addresses Gradle's memory, sometimes Android Studio itself (the IDE) runs out of memory, especially with large projects or many open files.

1.  **Access VM Options**: In Android Studio, go to `Help` in the top menu bar.
2.  **Edit Custom VM Options**: Select `Edit Custom VM Options...`. If you haven't created one before, Android Studio will ask if you want to create a new `studio.vmoptions` file (or `studio64.vmoptions` on 64-bit systems). Click "Yes".
3.  **Modify `-Xmx`**: This file contains JVM arguments specifically for Android Studio. Look for the line starting with `-Xmx`.
    *   The default is often `-Xmx2g` (2GB). For larger projects, consider increasing it to `4g` or even `6g`.
    ```properties
    -Xmx4096m
    # or -Xmx4g (some versions prefer 'm' suffix)
    -Xms256m
    -XX:ReservedCodeCacheSize=512m
    -XX:+UseCompressedOops
    ```
    *   `-Xmx4096m`: Sets the maximum heap size for Android Studio to 4096 megabytes (4GB).
    *   `-Xms256m`: Sets the initial heap size to 256 megabytes.
4.  **Save and Restart Android Studio**: Save the `studio.vmoptions` file and completely restart Android Studio for the changes to take effect.

### Step 3: Clean and Rebuild Your Project

Sometimes, corrupted or stale build caches can lead to unexpected memory issues. Performing a clean and rebuild can resolve these.

1.  **Clean Project**: In Android Studio, go to `Build` in the top menu bar, then select `Clean Project`. This will remove all generated build files.
2.  **Rebuild Project**: After cleaning, go to `Build` again and select `Rebuild Project`. This forces Android Studio and Gradle to perform a full build from scratch.

### Step 4: Invalidate Caches and Restart

Android Studio maintains various caches to speed up its operations. Occasionally, these caches can become corrupted or contain outdated information, leading to bizarre errors including OutOfMemoryErrors.

1.  **Invalidate Caches**: In Android Studio, go to `File` in the top menu bar.
2.  **Select "Invalidate Caches / Restart..."**: A dialog box will appear.
3.  **Choose "Invalidate and Restart"**: Click this button. Android Studio will clear its caches and then restart itself. This process might take a few minutes upon restart as it re-indexes your project.

### Step 5: Update Gradle Version and Android Gradle Plugin (AGP)

Newer versions of Gradle and the Android Gradle Plugin often come with performance improvements and bug fixes that can make them more memory-efficient or resolve underlying issues.

1.  **Check Project-Level `build.gradle`**: Open your project-level `build.gradle` file (the one in the root directory, not in the `app` module). Look for the `classpath` declaration for the Android Gradle Plugin:
    ```gradle
    // project-level build.gradle
    buildscript {
        repositories {
            google()
            mavenCentral()
        }
        dependencies {
            classpath 'com.android.tools.build:gradle:X.Y.Z' // Check this line
            // ... other dependencies
        }
    }
    ```
    Replace `X.Y.Z` with the latest stable version (e.g., `8.2.0`). You can find the latest versions on the official Android Developers website or by checking for updates within Android Studio.
2.  **Check `gradle-wrapper.properties`**: Open the `gradle/wrapper/gradle-wrapper.properties` file. Look for the `distributionUrl`:
    ```properties
    distributionUrl=https\://services.gradle.org/distributions/gradle-A.B-bin.zip
    ```
    Replace `A.B` with the Gradle version recommended for your chosen AGP version (e.g., for AGP 8.2.0, you might use Gradle 8.2 or 8.3). Android Studio usually prompts you to update Gradle when you update AGP.
3.  **Sync and Rebuild**: After updating these files, sync your project with Gradle and attempt a clean and rebuild.

### Step 6: Review Project Dependencies and Build Configuration

Sometimes the issue isn't just about memory allocation, but about what's consuming that memory.

1.  **Reduce Unnecessary Dependencies**: Review your `build.gradle` files (especially the app module's) for any dependencies you are no longer using. Remove them.
2.  **Optimize Annotation Processors**: If you're using many annotation processors, ensure they are configured correctly and that you're not including redundant ones. Some annotation processors can be memory intensive.
3.  **Consider Build Variants**: If you have a huge number of build variants, consider if all combinations are truly necessary. Each variant can add to the build complexity and memory footprint.
4.  **Gradle `--scan` (Advanced)**: For deeper analysis, you can run Gradle with the `--scan` flag from your terminal (e.g., `gradlew assembleDebug --scan`). This generates a detailed report of your build, which can sometimes highlight memory bottlenecks, though interpreting it might require more expertise.

## Common Mistakes

When trying to fix OutOfMemory errors, it's easy to fall into common traps that either don't solve the problem or create new ones:

*   **Setting Heap Size Too High**: While it seems logical to just throw more memory at the problem, setting `-Xmx` values (for either Gradle or Android Studio) excessively high without sufficient physical RAM can backfire. Your system might start using swap space (hard drive as virtual RAM), which is much slower, leading to an even more sluggish build process or making your entire system unstable. Always monitor your system's RAM usage and allocate memory judiciously.
*   **Confusing Gradle Daemon with Android Studio JVM**: Many developers mistakenly increase Android Studio's `-Xmx` in `studio.vmoptions` when the actual problem lies with the Gradle Daemon's memory, configured in `gradle.properties`. Remember, these are two separate Java processes. Address the one that is actually running out of memory, or both if symptoms suggest it.
*   **Not Restarting/Syncing**: Changes to `gradle.properties` require a Gradle sync, and changes to `studio.vmoptions` require a full restart of Android Studio to take effect. Forgetting this step means your changes won't be applied, and the problem will persist.
*   **Ignoring Underlying Issues**: While increasing memory is often a quick fix, it's sometimes a band-aid. Continuously hitting memory limits might indicate that your project has inefficient build configurations or too many dependencies, which could be optimized.

## Prevention Tips

To avoid encountering "java.lang.OutOfMemoryError: Java heap space" in the future, adopt these best practices:

*   **Monitor Memory Usage**: Keep an eye on your system's resource monitor (Task Manager on Windows, Activity Monitor on macOS, `htop` on Linux) during heavy Android Studio use and project builds. This helps you understand if you're approaching your system's memory limits and can guide your `-Xmx` adjustments.
*   **Keep Software Updated**: Regularly update Android Studio, the Android Gradle Plugin, and Gradle itself. Newer versions often include performance optimizations and better memory management, which can naturally reduce memory pressure.
*   **Optimize Dependencies**: Regularly review your project's `build.gradle` files. Remove any unused libraries and ensure you're using the most memory-efficient versions of your dependencies. Smaller projects build faster and require less memory.
*   **Use Build Cache and Configuration Cache**: Leverage Gradle's build cache and configuration cache features. These can significantly speed up builds and potentially reduce memory spikes by reusing previous build outputs.
*   **Allocate Sufficient RAM**: If you're consistently running into memory issues across multiple Android projects, regardless of optimization efforts, it might be a sign that your development machine requires more physical RAM. Android development can be memory-intensive, especially for large projects.
*   **Clean and Invalidate Caches Periodically**: Make it a habit to occasionally clean your project and invalidate Android Studio's caches, even if you're not facing immediate errors. This helps keep the environment fresh and prevents accumulation of stale data that could later cause issues.