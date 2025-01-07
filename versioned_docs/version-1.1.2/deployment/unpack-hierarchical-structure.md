---
title: installation package directory structure
sidebar_position: 4.5
---

## Linkis installation package decompressed directory structure

Download the officially released [Compilation Complete Package](https://linkis.apache.org/download/main), and the decompressed directory structure is as follows:

```html

├── bin
│ ├── checkEnv.sh //deployment environment verification script
│ ├── common.sh
│ └── install.sh //script to execute the installation
├── deploy-config
│ ├── db.sh //database connection configuration
│ └── linkis-env.sh //related environment configuration information
├── DISCLAIMER
├── LICENSE
├── licenses
├── linkis-package //microservice related startup configuration files, dependencies, scripts, linkis-cli, etc.
│ ├── bin
│ ├── conf
│ ├── db
│ ├── lib
│ └── sbin
├── NOTICE
├── README_CN.md
└── README.md

```