# Apache Linkis Website
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md)

This is the repository containing all the source code of `https://linkis.apache.org`.
This guide will guide you how to contribute to the Linkis website.


## Branch
dev is the development branch. For all modifications, please fork first, and then proceed on the dev branch.
```
master 
dev #development branch
asf-site   #The official environment of asf-site official website is accessed through https://linkis.apache.org
asf-staging #The asf-staging official website test environment is accessed through https://linkis.staged.apache.org
```


## 1. Preview and generate static files

This website is compiled using node, using Docusaurus framework components

1. Download and install nodejs (version>12.5.0)
2. Clone the code to the local `git clone git@github.com:apache/incubator-linkis-website.git`
2. Run `npm install` to install the required dependent libraries.
3. Run `npm run start` in the root directory, you can visit http://localhost:3000 to view the English mode preview of the site
4. Run `npm run start-zh` in the root directory, you can visit http://localhost:3000 to view the Chinese mode preview of the site
5. To generate static website resource files, run `npm run build`. The static resources of the build are in the build directory.


## 2. Specification

### 2.1 Directory naming convention

Use all lowercase, separated by underscores. If there is a plural structure, use plural nomenclature, and do not use plural abbreviations

Positive example: `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

Counter example: `script / style / demoStyles / imgs / docs`

### 2.2 Vue and the naming convention of static resource files

All lowercase, separated by a dash

Positive example: `render-dom.js / signup.css / index.html / company-logo.png`

Counter example: `renderDom.js / UserManagement.html`

### 2.3 Resource Path

Image resources are unified under `static/{module name}`

css and other style files are placed in the `src/css` directory

### 2.4 Page content modification
> Except for the homepage, team, user, Docs>All Version module page, all other pages can be directly jumped to the corresponding github resource modification page through the'Edit this page' button at the bottom

### 2.5 Home page modification
Visit the page https://linkis.apache.org/
Located in `src/pages/home`

```
├─home
│ config.json Home page Chinese and English configuration
│ index.less homepage style
```
### 2.6 Team page modification
Visit the page https://linkis.apache.org/zh-CN/team
Located in `src/pages/team`
```
├─team
│ config.json
│ index.js
│ index.less
```
### 2.7 User list page modification
Visit the page https://linkis.apache.org/zh-CN/user/
```
Located in `src/pages/user`
└─versions
        config.json
        data.json
        img.json
        index.js
        index.less
```

### 2.8 version List page modification
Visit the page https://linkis.apache.org/zh-CN/versions/
```
Located in `src/pages/versions`
└─versions
        config.json
        index.jsorchestrator/overview.md
        index.less
```
## 3. New documents
![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) It is recommended to view the md document through the official website, and view the md document through github. There is a problem that static resources such as pictures cannot be displayed correctly.

-The English document docs/ corresponds to the next version to be released, and the historical archive version is stored in the versioned_docs/version-${versionno} directory.
-Chinese documents are placed in the corresponding directory of i18n/zh-CN/docusaurus-plugin-content-docs/, current is the next version to be released. version-${versionno} is the historical archive version.
-Image resources are placed in the static/ directory
 
## 4. Other
The naming convention refers to "Alibaba Front-end Development Specification