---
title: "How to Resolve 'java.lang.OutOfMemoryError' in Java Applications"
date: "2026-11-21T05:41:14.238Z"
slug: "how-to-resolve-java-lang-outofmemoryerror-in-java-applications"
type: "how-to"
description: "A comprehensive guide to diagnosing and fixing java.lang.OutOfMemoryError, including heap, Metaspace, and native memory issues in Java applications."
keywords: "java.lang.OutOfMemoryError, Java heap space, Metaspace, GC overhead limit exceeded, native memory, JVM memory, -Xmx, -Xms, heap dump, memory leak, Java performance, troubleshooting Java"
---

### Problem Explanation

The `java.lang.OutOfMemoryError` is a critical runtime error in Java applications that signals the Java Virtual Machine (JVM) has run out of allocated memory. It's not a memory leak in the traditional sense where the OS runs out of memory, but rather the JVM cannot allocate more memory within its configured limits. This error manifests in several specific ways, each pointing to a different area of memory exhaustion. Common variations include:

*   `java.lang.OutOfMemoryError: Java heap space`
*   `java.lang.OutOfMemoryError: Metaspace` (or `PermGen space` in older Java versions)
*   `java.lang.OutOfMemoryError: GC overhead limit exceeded`
*   `java.lang.OutOfMemoryError: unable to create new native thread`
*   `java.lang.OutOfMemoryError: requested <size> bytes for <reason>. Out of swap space?`

When this error occurs, your Java application typically slows down dramatically, becomes unresponsive, or crashes entirely. You might observe incomplete operations, corrupted data, or applications failing to start. The exact error message will usually appear in your application logs or standard error output, providing a crucial first clue about the nature of the memory exhaustion.

### Why It Happens

`java.lang.OutOfMemoryError` occurs when the JVM attempts to allocate new memory for an object or process but cannot find sufficient free space within its pre-defined memory regions. The root causes generally fall into two categories:

1.  **Insufficient JVM Configuration**: The default memory settings for the JVM might be too low for the application's actual workload. Modern applications, especially those handling large datasets, many concurrent users, or extensive libraries, often require more memory than the JVM allocates by default. This leads to exhaustion of the heap, Metaspace, or other memory areas simply because the allocated ceilings are too low.
2.  **Memory Leaks or Inefficient Code**: Even with ample JVM memory configured, an application can still encounter `OutOfMemoryError` due to memory leaks. A memory leak in Java occurs when objects are created but remain referenced indefinitely, even after they are no longer needed, preventing the Garbage Collector from reclaiming their memory. This gradual accumulation of "dead" objects eventually exhausts the available memory. Similarly, inefficient code that creates excessively large data structures, caches too much information, or recursively calls methods without proper termination can rapidly consume memory.

Understanding the specific `OutOfMemoryError` message is key to determining whether the problem is a configuration issue that can be solved by increasing memory, or a code-level issue requiring optimization or leak detection.

### Step-by-Step Solution

#### ## Step 1: Identify the Specific OutOfMemoryError Type

The first and most critical step is to read the exact `java.lang.OutOfMemoryError` message from your application logs. This message directly indicates which memory area was exhausted.

*   `Java heap space`: The application tried to allocate an object in the heap but there was no room. This is the most common type.
*   `Metaspace` (or `PermGen space` for Java 7 and older): The JVM ran out of space for class metadata. This usually indicates too many classes are being loaded or generated dynamically.
*   `GC overhead limit exceeded`: The garbage collector is spending almost all its time collecting garbage and not freeing up enough memory to allow the application to make progress. This often points to a memory leak or extremely inefficient memory usage.
*   `unable to create new native thread`: The JVM tried to create a new thread but the underlying operating system refused because of insufficient native memory or OS-level thread limits. This is not directly related to Java heap or Metaspace, but rather to the overall system memory.
*   `requested <size> bytes for <reason>. Out of swap space?`: This indicates the JVM requested memory directly from the OS (native memory) and the OS denied it, often because the system is running out of physical RAM or swap space.

Understanding the specific error guides your troubleshooting path.

#### ## Step 2: Increase JVM Heap Size (for 'Java heap space' errors)

If the error is `Java heap space`, the most common initial fix is to increase the maximum heap size allocated to the JVM. This is done using the `-Xmx` JVM argument. It's also good practice to set the initial heap size (`-Xms`) to prevent frequent garbage collections during application startup.

**Example Command (Linux/macOS):**

```bash
java -Xmx4g -Xms2g -jar YourApplication.jar
```

**Explanation:**
*   `-Xmx4g`: Sets the maximum Java heap size to 4 gigabytes.
*   `-Xms2g`: Sets the initial Java heap size to 2 gigabytes.
*   Adjust these values based on your application's requirements and available system memory. A common starting point is to set `-Xms` to half or a quarter of `-Xmx`. Ensure you don't set `-Xmx` so high that it exhausts your physical RAM and leads to excessive swapping, which severely degrades performance.

#### ## Step 3: Adjust Metaspace Size (for 'Metaspace' errors)

For `Metaspace` errors (Java 8 and later), you need to adjust the maximum Metaspace size. In Java 8+, Metaspace by default grows dynamically up to the available native memory, but a maximum can be set.

**Example Command:**

```bash
java -XX:MaxMetaspaceSize=256m -jar YourApplication.jar
```

**Explanation:**
*   `-XX:MaxMetaspaceSize=256m`: Sets the maximum Metaspace size to 256 megabytes.
*   For Java 7 and older versions which used PermGen, the argument was `-XX:MaxPermSize=<size>`.
*   Increase this value if your application dynamically loads many classes, uses frameworks that generate a lot of bytecode, or employs extensive reflection.

#### ## Step 4: Analyze Heap Dumps for Memory Leaks (for persistent 'Java heap space' or 'GC overhead limit' errors)

If increasing memory only postpones the `OutOfMemoryError` or if you encounter `GC overhead limit exceeded`, it's highly probable you have a memory leak. You need to analyze the heap to identify the objects accumulating unnecessarily.

1.  **Generate a Heap Dump:**
    When an `OutOfMemoryError` occurs, the JVM can automatically generate a heap dump file. Add this JVM argument:
    ```bash
    java -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/path/to/dumps/heapdump.hprof -jar YourApplication.jar
    ```
    Alternatively, you can manually generate a heap dump for a running JVM process using `jmap`:
    ```bash
    jmap -dump:format=b,file=heapdump.hprof <pid>
    ```
    (Replace `<pid>` with the process ID of your Java application).

2.  **Analyze the Heap Dump:**
    Use tools like:
    *   **Eclipse Memory Analyzer Tool (MAT)**: A powerful, free tool for analyzing large heap dumps, identifying memory leaks, and pinpointing problematic objects.
    *   **JVisualVM**: Included in the JDK, offering basic heap dump analysis and live JVM monitoring.
    *   **YourKit Java Profiler / JProfiler**: Commercial tools with advanced profiling and memory leak detection capabilities.

    These tools help you visualize object graphs, identify the largest objects, and trace references to determine why objects are not being garbage collected. Look for objects that hold onto large amounts of memory or continue to grow in number over time.

#### ## Step 5: Optimize Application Code and Resource Usage

Once a memory leak or inefficient memory usage is identified through heap dump analysis, refactor your code.

*   **Release Resources Promptly**: Ensure proper closing of I/O streams, database connections, network sockets, and other disposable resources, ideally using Java's `try-with-resources` statement or finally blocks.
*   **Avoid Excessive Caching**: While caching improves performance, unbounded caches are common sources of memory leaks. Implement size limits, time-based expiry, or weak/soft references for cached objects.
*   **Efficient Data Structures**: Use appropriate and memory-efficient data structures. For example, consider `ConcurrentHashMap` for concurrent access instead of synchronized `HashMap`, or `ArrayList` over `LinkedList` if random access is frequent and removals are rare.
*   **Remove Unnecessary Objects**: Review code that creates large objects temporarily but fails to dereference them, allowing the garbage collector to reclaim the memory.
*   **Be Careful with Static Collections**: Static fields hold references indefinitely. If a `static List` or `Map` is used to store objects, ensure elements are removed when no longer needed, or it will grow indefinitely.

#### ## Step 6: Monitor JVM Performance and Memory Usage in Real-time

Proactive monitoring can help identify memory pressure before an `OutOfMemoryError` occurs.

*   **JVisualVM**: A GUI tool (part of the JDK) that connects to local or remote JVMs to monitor heap usage, GC activity, threads, and CPU usage.
*   **JConsole**: Another JDK tool for monitoring JVM resources and JMX beans.
*   **`jstat`**: A command-line utility for monitoring JVM statistics, including garbage collection and heap utilization.
    *   `jstat -gc <pid> 1000`: Displays garbage collection statistics every 1 second for the specified process ID. Look for increasing old generation usage (`OU` or `OC`) without corresponding decreases.
*   **`jcmd`**: A powerful diagnostic utility that can be used to request various diagnostic commands from a running JVM.
    *   `jcmd <pid> GC.heap_info`: Prints information about the Java heap.
*   **External Monitoring Tools**: Integrate with tools like Prometheus, Grafana, or APM solutions (e.g., New Relic, AppDynamics) for continuous monitoring in production environments.

#### ## Step 7: Address Native Memory Issues (for 'unable to create new native thread' or 'Out of swap space?' errors)

If your error points to native memory issues (not Java heap or Metaspace), the problem lies outside the JVM's explicitly managed Java memory.

*   **Increase OS Thread Limits**: If you're getting `unable to create new native thread`, the OS might be limiting the number of threads a process can create.
    *   On Linux, check and increase `ulimit -u` (max user processes) and `ulimit -n` (max open files, which includes sockets and can indirectly affect thread creation). Edit `/etc/security/limits.conf` for persistent changes.
*   **Reduce Thread Stack Size**: Each Java thread consumes a certain amount of native memory for its stack. You can reduce this using `-Xss`:
    ```bash
    java -Xss512k -jar YourApplication.jar
    ```
    (Defaults vary, often 1MB. Reduce carefully, too small can cause `StackOverflowError`).
*   **Check System Memory and Swap**: For `Out of swap space?`, your physical RAM or swap space on the machine hosting the JVM might be exhausted. This often requires increasing physical RAM, configuring more swap space, or reducing the memory footprint of other processes running on the same machine.
*   **Review JNI Usage**: If your application uses Java Native Interface (JNI), C/C++ code might be leaking native memory, which the JVM cannot garbage collect. Use native memory profilers (like Valgrind) for the native libraries.

### Common Mistakes

1.  **Blindly Increasing Memory**: The most common mistake is simply increasing `-Xmx` or `-XX:MaxMetaspaceSize` without analyzing the root cause. While this might temporarily fix the issue, if a memory leak exists, the problem will eventually re-emerge, consuming even more resources.
2.  **Ignoring the Specific Error Message**: Not distinguishing between "Java heap space" and "Metaspace" or "native thread" errors leads to incorrect troubleshooting. Trying to increase heap for a Metaspace error is futile.
3.  **Over-allocating Memory**: Setting `-Xmx` too high can cause the JVM to consume all available physical RAM, forcing the operating system to swap memory to disk. This results in extremely poor application performance, often worse than the `OutOfMemoryError` itself.
4.  **Not Monitoring After Fixes**: After applying a fix, it's crucial to monitor the application's memory usage and garbage collection behavior. This confirms the fix is effective and ensures no new memory issues arise.
5.  **Confusing Java Memory Leaks with OS Memory Leaks**: An `OutOfMemoryError` is specifically about the JVM's allocated memory. While it can stem from broader system memory pressure (especially native OOMs), the initial focus should be on the JVM's internal memory management.

### Prevention Tips

1.  **Proactive Memory Profiling During Development**: Integrate memory profiling into your development and testing cycles. Tools like JVisualVM or YourKit can help identify memory hogs and potential leaks early, before they reach production.
2.  **Use `try-with-resources` for Auto-Closable Resources**: Ensure that all resources that implement `AutoCloseable` (like streams, connections) are properly closed to prevent resource leaks that can consume native memory or hold onto Java objects.
3.  **Implement Bounded Caches and Collections**: Avoid creating unbounded collections or caches that grow indefinitely. Use collections with maximum size limits, or consider `WeakReference` and `SoftReference` where appropriate for caching.
4.  **Regular Code Reviews for Memory Patterns**: Conduct code reviews focusing on patterns that often lead to memory issues: static collections, long-lived session objects, large object creation in loops, and improper resource handling.
5.  **Perform Load Testing with Memory Monitoring**: Simulate peak load conditions and monitor memory usage. This helps uncover memory issues that only manifest under high stress or with specific data volumes.
6.  **Set Realistic JVM Memory Arguments**: Based on profiling and testing, configure `-Xmx`, `-Xms`, `-XX:MaxMetaspaceSize` appropriately for your production environment. Avoid using default JVM settings for production applications.
7.  **Monitor Production JVMs Continuously**: Implement robust monitoring for your production applications to track heap usage, GC activity, and other JVM metrics. Tools like Prometheus, Grafana, or cloud-native monitoring services can alert you to abnormal memory patterns before they lead to outages.