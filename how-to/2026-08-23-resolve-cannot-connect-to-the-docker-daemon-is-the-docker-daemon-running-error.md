---
title: "Resolve \"Cannot connect to the Docker daemon. Is the docker daemon running?\" Error"
date: "2026-08-23T15:20:32.191Z"
slug: "resolve-cannot-connect-to-the-docker-daemon-is-the-docker-daemon-running-error"
type: "how-to"
description: "Learn how to fix the common \"Cannot connect to the Docker daemon. Is the docker daemon running?\" error in Docker with this comprehensive step-by-step guide."
keywords: "Docker error, cannot connect to docker daemon, docker daemon not running, fix docker error, docker troubleshooting, docker installation, docker service"
---

## Problem Explanation

When attempting to use Docker commands, such as `docker ps`, `docker run`, or `docker build`, you might encounter the frustrating error message: "Cannot connect to the Docker daemon. Is the docker daemon running?". This message indicates that the Docker client, the command-line interface you use to interact with Docker, is unable to establish a connection with the Docker daemon. The Docker daemon (also known as dockerd) is the background service that manages Docker containers, images, networks, and volumes. Without a running and accessible daemon, your Docker commands have no service to communicate with, leading to this error.

This issue typically manifests immediately after installing Docker, after a system restart, or following an unexpected shutdown. It signifies a breakdown in communication between the client and the core Docker service, rendering all Docker operations inoperable until resolved. The inability to connect is a fundamental roadblock for anyone trying to leverage Docker for development, deployment, or container management.

## Why It Happens

The root cause of the "Cannot connect to the Docker daemon" error is almost always that the Docker daemon process is either not running, has crashed, or is inaccessible to the user attempting to run Docker commands. This can occur for several reasons:

*   **Daemon Not Started:** Docker might not have been configured to start automatically upon system boot, or it may have been manually stopped. In some cases, particularly after a fresh installation or system update, the daemon might simply not have been initialized yet.
*   **Daemon Crashed:** The Docker daemon, like any software process, can encounter errors or issues that cause it to terminate unexpectedly. This could be due to resource limitations, configuration problems, or conflicts with other system processes.
*   **Permissions Issues:** On Linux and macOS systems, Docker often runs with elevated privileges or requires specific user group memberships (like the `docker` group) to access its communication socket. If the current user does not have the necessary permissions, the client cannot connect to the daemon's socket file (typically `/var/run/docker.sock`).
*   **Installation Problems:** A corrupted or incomplete Docker installation can also prevent the daemon from starting or functioning correctly, leading to connection failures.
*   **Resource Constraints:** In rare cases, extreme system resource scarcity (CPU, memory) can prevent the Docker daemon from starting or maintaining its operation.

## Step-by-Step Solution

Here’s a comprehensive approach to resolving the "Cannot connect to the Docker daemon" error. Follow these steps systematically, checking if Docker commands work after each major troubleshooting point.

### Step 1: Check if the Docker Daemon is Running

The most direct cause is the daemon simply not running. This is the first thing to verify.

**For Linux (using systemd):**

Open your terminal and run:

```bash
sudo systemctl status docker
```

This command will show you the status of the Docker service. If it's not active, you'll see output indicating it's inactive or failed.

**For macOS and Windows (Docker Desktop):**

Check your system tray (Windows) or menu bar (macOS) for the Docker whale icon. If it's not visible or appears grayed out/stuck, Docker Desktop is likely not running or has encountered an issue. You can try relaunching Docker Desktop from your applications.

### Step 2: Start the Docker Daemon

If the status check in Step 1 indicated the daemon is not running, you need to start it.

**For Linux (using systemd):**

To start the Docker service:

```bash
sudo systemctl start docker
```

To enable Docker to start automatically on boot (highly recommended):

```bash
sudo systemctl enable docker
```

After starting, re-check the status:

```bash
sudo systemctl status docker
```

**For macOS and Windows (Docker Desktop):**

Simply launch the Docker Desktop application. It should automatically start the daemon. If it's already open, try quitting and reopening the application.

### Step 3: Verify Docker Daemon Status After Restarting

Sometimes, the issue is transient, and a simple restart of the daemon can resolve it.

**For Linux:**

```bash
sudo systemctl restart docker
```

Then, check the status again:

```bash
sudo systemctl status docker
```

**For macOS and Windows:**

Quit Docker Desktop completely (ensure it's not just minimized to the system tray/menu bar) and then relaunch it.

### Step 4: Check User Permissions (Linux)

On Linux, non-root users typically need to be part of the `docker` group to interact with the Docker daemon without `sudo`.

1.  **Check if you are in the `docker` group:**

    ```bash
    groups $USER
    ```

    If `docker` is not listed, proceed to the next step.

2.  **Add your user to the `docker` group:**

    ```bash
    sudo usermod -aG docker $USER
    ```

    **Important:** After running this command, you need to **log out and log back in** to your user session for the group changes to take effect. Alternatively, you can reboot your system.

    After logging back in, try a simple Docker command without `sudo`:

    ```bash
    docker ps
    ```

### Step 5: Reinstall Docker (If Necessary)

If the above steps haven't resolved the issue, your Docker installation might be corrupted. A clean reinstallation can fix this.

**For Linux:**

First, uninstall Docker completely:

```bash
sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-ce-rootless-extras
sudo apt-get autoremove --purge
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

Then, follow the official Docker installation guide for your specific Linux distribution (e.g., Ubuntu, Debian, CentOS). Ensure you follow all steps precisely.

**For macOS and Windows:**

Uninstall Docker Desktop through your system's application uninstaller. Then, download the latest version from the official Docker website and perform a fresh installation.

### Step 6: Check Docker Daemon Configuration

Incorrect configuration can sometimes prevent the daemon from starting or being accessible.

*   **Linux:** The primary configuration file is usually located at `/etc/docker/daemon.json`. If this file exists and contains syntax errors or incorrect settings, it could cause problems. You can temporarily rename or remove it to see if the daemon starts.
    ```bash
    sudo mv /etc/docker/daemon.json /etc/docker/daemon.json.backup
    sudo systemctl restart docker
    ```
    If it starts, the issue was in your `daemon.json`. Review it for errors.

*   **Docker Desktop:** Configuration is managed through the Docker Desktop GUI. Resetting to default settings via the Docker Desktop troubleshooting menu might help if you suspect a configuration issue.

### Step 7: Check System Resources

While less common, if your system is critically low on memory or disk space, it can prevent services like the Docker daemon from starting or running correctly.

*   Check your system's available memory (`free -h` on Linux) and disk space (`df -h` on Linux).
*   If resources are very low, free up some space or close unnecessary applications.

## Common Mistakes

One of the most frequent mistakes is not restarting your terminal or system after making permission changes (like adding your user to the `docker` group on Linux). The group membership changes only apply to new login sessions. Another common error is trying to fix the issue by repeatedly running `docker` commands with `sudo` instead of addressing the underlying daemon status or permission problem. Forgetting to explicitly enable Docker to start on boot after starting it manually can also lead to the same error after every system restart. Finally, when reinstalling, some users might skip cleaning up old Docker directories, leading to conflicts with the new installation.

## Prevention Tips

To prevent the "Cannot connect to the Docker daemon" error from recurring, adopt these best practices:

*   **Ensure Docker Starts on Boot:** Always enable the Docker service to start automatically on system startup. On Linux with `systemd`, use `sudo systemctl enable docker`. For Docker Desktop, ensure it's configured to start when your operating system launches.
*   **Regularly Check Docker Status:** If you use Docker frequently, get into the habit of quickly checking its status periodically, especially after system updates or reboots.
*   **Manage User Permissions Correctly (Linux):** Ensure all users who need to interact with Docker are properly added to the `docker` group, and remember that they need to log out and back in for the changes to take effect.
*   **Keep Docker Updated:** Regularly update Docker Engine and Docker Desktop to the latest stable versions. Updates often include bug fixes that can prevent such issues.
*   **Monitor System Resources:** Maintain adequate free disk space and memory on your system. Low resources can destabilize background services like the Docker daemon.
*   **Graceful Shutdowns:** When possible, shut down your system or Docker Desktop gracefully. Abrupt power losses can sometimes leave services in an inconsistent state.