---
title: Installation Package Directory Structure
sidebar_position: 6.1
---

## Linkis installation package decompressed directory structure

Download the officially released [Compilation Complete Package](https://linkis.apache.org/zh-CN/download/main), and the decompressed directory structure is as follows:

```html

├── bin
│   ├── checkEnv.sh //部署环境验证脚本
│   ├── common.sh
│   └── install.sh  //执行安装的脚本
├── deploy-config
│   ├── db.sh       //数据库连接配置
│   └── linkis-env.sh //相关环境配置信息
├── DISCLAIMER
├── LICENSE
├── licenses  
├── linkis-package  //微服务相关的启动配置文件，依赖，脚本，linkis-cli等
│   ├── bin
│   ├── conf
│   ├── db
│   ├── lib
│   └── sbin
├── NOTICE
├── README_CN.md
└── README.md

```