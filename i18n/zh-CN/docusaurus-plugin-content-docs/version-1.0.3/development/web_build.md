---
title: 前端管理台编译
sidebar_position: 4
---


## 1. 安装Node.js
将Node.js下载到电脑本地，安装即可。下载地址：[http://nodejs.cn/download/](http://nodejs.cn/download/) （建议使用最新的稳定版本）
**该步骤仅第一次使用时需要执行。**

## 2. 安装项目
在终端命令行中执行以下指令：

```
git clone git@github.com:apache/incubator-linkis.git
cd incubator-linkis/web
npm install
```

指令简介：
1. 将项目包从远程仓库拉取到电脑本地
2. 进入项目WEB根目录：cd incubator-linkis/web
3. 安装项目所需依赖：npm install

**该步骤仅第一次使用时需要执行。**

## 3. 配置
:::caution 注意
如果是本地运行时此步骤可跳过
:::
您需要在代码中进行一些配置，如后端接口地址等，如根目录下的.env.development文件：

```
// 后端接口地址
VUE_APP_MN_CONFIG_PREFIX=http://yourIp:yourPort/yourPath
```

配置的具体解释可参考vue-cli官方文档：[环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E5%92%8C%E6%A8%A1%E5%BC%8F)

## 4. 打包项目
您可以通过在终端命令行执行以下指令对项目进行打包，生成压缩后的代码：

```
npm run build
```

该指令成功执行后，项目web目录下会出现一个 “dist” 的文件夹及“*-${getVersion()}-dist.zip”压缩文件，目录dist/dist即为打包好的代码，您可以直接将该文件夹放进您的静态服务器中，或者参考安装文档，使用脚本进行部署安装。

## 5. 运行项目
如果您想在本地浏览器上运行该项目并且改动代码查看效果，需要在终端命令行中执行以下指令：

```
npm run serve
```

在浏览器中（建议Chrome浏览器）通过链接访问应用：[http://localhost:8080/](http://localhost:8080/) .
当您使用该方式运行项目时，您对代码的改动产生的效果，会动态体现在浏览器上。

**注意：因为项目采用前后端分离开发，所以在本地浏览器上运行时，需要对浏览器进行设置跨域才能访问后端接口，具体设置可参考：[解决Chrome跨域问题](https://www.jianshu.com/p/56b1e01e6b6a)**


##6 常见问题

### 6.1 npm install无法成功
如果遇到该情况，可以使用国内的淘宝npm镜像：

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

接着，通过执行以下指令代替npm install指令

```
cnpm install
```

注意，项目启动和打包时，仍然可以使用npm run build和npm run serve指令