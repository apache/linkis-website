---
title: 安装包目录结构
sidebar_position: 3.1
---
> Linkis安装包解压后的目录结构

下载官方发布的[编译完整包](https://linkis.apache.org/zh-CN/download/main)，解压后的目录结构如下:

```html

├── bin
│   ├── checkEnv.sh ── 环境变量检测
│   ├── common.sh ── 部分公共shell函数
│   └── install.sh ── Linkis安装的主脚本
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