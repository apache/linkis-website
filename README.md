# Apache Linkis Website
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md)

# English todo  

这是包含 `https://linkis.apache.org` 的所有源代码的存储库。
本指南将指导您如何为Linkis的网站做出贡献。

## 1.预览并生成静态文件

本网站是使用node编译的，使用的是Docusaurus组件

1. 下载并安装 nodejs(version>12.5.0)
2. 克隆代码到本地 `git clone  git@github.com:apache/incubator-linkis-website.git`
2. 运行 `npm install` 来安装所需的依赖库。
3. 在根目录运行`npm run start`，可以访问http://localhost:3000查看站点英文模式预览
4. 在根目录运行`npm run start-zh`，可以访问http://localhost:3000查看站点的中文模式预览
5. 要生成静态网站资源文件，运行 `npm run build`。构建的静态资源在build目录中。


## 2.规范

### 2.1 目录命名规范

全部采用小写方式， 以中下划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数

正例： `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

反例： `script / style / demoStyles / imgs / docs`

### 2.2 vue以及静态资源文件命名规范

全部采用小写方式， 以中划线分隔

正例： `render-dom.js / signup.css / index.html / company-logo.png`

反例： `renderDom.js / UserManagement.html`

### 2.3 资源路径 

图片资源统一放在`static/{模块名}`下

css等样式文件放在`src/css`目录下

### 2.4 页面内容修改 
> 除了首页、团队、Docs>All Version 模块页面外，其余页面都能通过底部的Edit this page 直接跳转至对应的github的资源修改页

### 2.5 首页页面修改
https://linkis.apache.org/
位于 `src/pages/home`

文件详细
```
├─home
│      config.json 首页中英文的配置
│      data.json    
│      img.json    user case的图片数据
│      index.jsx   
│      index.less  首页样式
```
### 2.6 团队页面修改
https://linkis.apache.org/zh-CN/team
位于 `src/pages/team`
```
├─team
│      config.json
│      index.js
│      index.less
```

### 2.7 version 列表页面修改
访问页面  https://linkis.apache.org/zh-CN/versions/
```
位于 `src/pages/versions`
└─versions
        config.json
        index.js
        index.less
```
## 3.新增文档 

- 英文文档 放在docs/的对应模块目录下 
- 中文文档 放在i18n/zh-CN/docusaurus-plugin-content-docs/对应模块目录下 
- 图片资源 放在static/目录下
 
## 4.其他 
命名规范参考《阿里前端开发规范》