---
title: Advice Configuration
sidebar_position: 0.1
---

# Suggested configuration of software and hardware environment

Linkis builds a layer of computing middleware between the upper application and the underlying engine. As an open source distributed computing middleware, it can be well deployed and run on Intel architecture servers and mainstream virtualization environments, and supports mainstream Linux operating system environments

## 1. Linux operating system version requirements

| OS | Version |
| :---------------------- | :----------: |
| Red Hat Enterprise Linux | 7.0 and above |
| CentOS | 7.0 and above |
| Oracle Enterprise Linux | 7.0 and above |
| Ubuntu LTS | 16.04 and above |

> **Note:** The above Linux operating systems can run on physical servers and mainstream virtualization environments such as VMware, KVM, and XEN

## 2. Server recommended configuration

Linkis supports 64-bit general-purpose hardware server platforms running on the Intel x86-64 architecture. The following recommendations are made for the server hardware configuration of the production environment:

### Production Environment

| **CPU** | **Memory** | **Disk type** | **Network** | **Number of instances** |
| ------- | -------- | ------------ | -------- | ---------- -- |
| 16 cores + | 32GB + | SAS | Gigabit network card | 1+ |

> **Note:**
>
> - The above recommended configuration is the minimum configuration for deploying Linkis, and a higher configuration is strongly recommended for production environments
> - The hard disk size configuration is recommended to be 50GB+, and the system disk and data disk are separated

## 3. Software requirements

Linkis binary packages are compiled based on the following software versions:

| Component | Version | Description |
| :------------ | ------- | ---- |
| Hadoop | 2.7.2 | |
| Hive | 2.3.3 | |
| Spark | 2.4.3 | |
| Flink | 1.12.2 | |
| OpenLooKeng | 1.5.0 | |
| Sqoop | 1.4.6 | |
| ElasticSearch | 7.6.2 | |
| Presto | 0.234 | |
| Python | Python2 | |

> **Note:**
> If the locally installed component version is inconsistent with the above, you need to modify the corresponding component version and compile the binary package yourself for installation.

## 4. Client web browser requirements

Linkis recommends Chrome version 73 for front-end access