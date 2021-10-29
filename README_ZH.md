# Apache Linkis Website
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md)

这是包含 `https://linkis.apache.org` 的所有源代码的存储库。

## 预览并生成静态文件

本网站是使用node编译的。

1. 下载并安装 nodejs(version>12.5.0)
2. 克隆代码到本地 
2. 运行 `npm install` 来安装所需的库。
3. 在根目录运行`npm run`，可以访问http://localhost:3000查看站点预览
4. 要生成静态网站资源文件，运行 `npm run build`。构建得静态资源在dist目录中。

## 贡献指南

本指南将指导您如何为Linkis 网站做出贡献。

### 规范

#### 1.目录命名规范

全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数

正例： `scripts / styles / components / images / utils / layouts / demo-styles / demo-scripts / img / doc`

反例： `script / style / demo_scripts / demoStyles / imgs / docs`

【特殊】VUE 的项目中的 components 中的组件目录，使用 kebab-case 命名

正例： `head-search / page-loading / authorized / notice-icon`

反例： `HeadSearch / PageLoading`

【特殊】VUE 的项目中的除 components 组件目录外的所有目录也使用 kebab-case 命名
正例： `page-one / shopping-car / user-management`

反例： `ShoppingCar / UserManagement`

#### 2.vue以及静态资源文件命名规范

全部采用小写方式， 以中划线分隔

正例： `render-dom.js / signup.css / index.html / company-logo.png`

反例： `renderDom.js / UserManagement.html`

#### 3.资源路径 

图片资源统一放在`src/assets/{模块名}`下

css等样式文件放在`src/style`目录下



### 首页修改

位于 `src/pages/home/index.vue`



### 文档修改 

位于src/pages/docs

```json
filename.vue    //vue页面
filename_zh.md  //对应的中文文档
filename_en.md	//对应的英文文档

```


### FAQ修改

位于 `src/pages/home/index.vue`

中文修改：src/pages/faq/faq_en.md
英文修改：src/pages/faq/faq_zh.md

### 下载页面修改

中文列表数据文件：src/pages/download/downloaddata_en.js
英文列表数据文件：src/pages/download/downloaddata_zh.js
列表数据条目示例

```json
{
    "version":"1.0.2", //版本
    "releaseDate":"2021-09-02",//发布日期
    "releaseDesc":"This release mainly introduces Flink-support into Linkis ecosystem.",//描述
    "newFeatures":"6",//此版本新加特性数
    "enhancement":"5",//比版本加强优化功能
    "bugFixs":"5",//此版本修复的bug数
    "changeLogUrl":"https://github.com/apache/incubator-linkis/releases/tag/1.0.2",//详细变更日志 链接到github上发布日志
    "downloadUrl":"https://github.com/apache/incubator-linkis/archive/refs/tags/1.0.2.zip"//版本的下载地址
}
```



## 其他 
命名规范参考《阿里前端开发规范》