# Apache Linkis Website
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md)

这是包含 `https://linkis.apache.org` 的所有源代码的存储库。

## 预览并生成静态文件

本网站是使用node编译的。

1. 下载并安装 nodejs(version>12.5.0)
2. 克隆代码到本地 
2. 运行 `npm install` 来安装所需的库。
3. 在根目录运行`npm run start`，英文模式 可以访问http://localhost:3000查看站点预览
3. 在根目录运行`npm run start-zh`，中文模式 可以访问http://localhost:3000查看站点预览
4. 要生成静态网站资源文件，运行 `npm run build`。构建得静态资源在build目录中。
