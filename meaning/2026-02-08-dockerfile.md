---
term: "Dockerfile"
definition: "A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image."
date: "2026-02-08T05:00:20.158Z"
slug: "dockerfile"
keywords: "Dockerfile, containerization, image building, software packaging, devops"
---

This script-like file outlines a series of instructions, executed sequentially, to build a container image. Each instruction creates a layer in the image, resulting in a reproducible and portable software package. It specifies the base operating system, the installation of software, the copying of application files, and the commands to run when a container is started from the image.

For example, a Dockerfile might include instructions to:
*   `FROM ubuntu:latest` (Specify the base image)
*   `RUN apt-get update && apt-get install -y nginx` (Install software)
*   `COPY . /app` (Copy application code)
*   `CMD ["nginx", "-g", "daemon off;"]` (Define the default command to execute)

This term is commonly used in the field of software development, containerization, and cloud-native computing.