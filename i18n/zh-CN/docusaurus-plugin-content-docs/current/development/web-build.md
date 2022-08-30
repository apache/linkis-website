---
title: Linkis 管理台编译
sidebar_position: 4
---

## 1. 前置准备 

## 1.1 安装Node.js

>该步骤仅第一次使用时需要执行,如果已有node环境，可跳过 

将Node.js下载到本地，安装即可。下载地址：[http://nodejs.cn/download/](http://nodejs.cn/download/) （建议使用node v14版本）

## 1.2 源码获取

- 方式1：从[github仓库](https://github.com/apache/incubator-linkis) https://github.com/apache/incubator-linkis 获取项目的源代码。
- 方式2：从[linkis的官方下载页面](https://linkis.apache.org/download/main) https://linkis.apache.org/download/main 下载所需版本的源码包。


## 2. 编译

## 2.1 安装npm依赖 

在终端命令行中执行以下指令：
```
#进入项目WEB根目录
$ cd incubator-linkis/linkis-web
#安装项目所需依赖
$ npm install
```
**该步骤仅第一次使用时需要执行。**


## 2.2. 打包项目

在终端命令行执行以下指令对项目进行打包，生成压缩后的部署安装包。
检查`linkis-web/package.json`，`linkis-web/.env`文件，检查前端管理台版本号是否正确。
```
$ npm run build
```
上述命令执行成功后，会生成前端管理台安装包 `apache-linkis-${version}-incubating-web-bin.tar.gz`，可以直接将该文件夹放进您的静态服务器中，或者参考[安装文档](../deployment/web-install.md)，使用脚本进行部署安装。

## 3 . 注意事项
### 3.1 Windows下npm install 步骤报错
```shell
Error: Can't find Python executable "python", you can set the PYTHON env variable
安装windows-build-tools （管理员权限）
$ npm install --global --production windows-build-tools
安装node-gyp
$ npm install --global node-gyp

2.如果编译失败 请按如下步骤清理后重新执行
#进入项目工作目录，删除 node_modules
$ rm -rf node_modules
#删除 package-lock.json
$ rm -rf package-lock.json
#清除 npm 缓存
$ npm cache clear --force
#重新下载依赖
$ npm install

```
### 3.2  如果出现兼容问题,建议重新安装node
[node下载地址](https://nodejs.org/zh-cn/download/)
```shell
1.查看node版本(推荐使用node v14版本)
$ node -v
2.下载node v14版本并且重新安装node 
```

### 3.3  npm install下载前端依赖无法成功    
如果遇到该情况，可以使用国内的淘宝npm镜像：    
```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```
接着，通过执行以下指令代替npm install指令
```
cnpm install
```
