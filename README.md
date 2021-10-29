# Apache Linkis Website
[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

[English](README.md) | [中文](README_ZH.md)

This is the repository containing all the source code of `https://linkis.apache.org`.
The project is specially for Linkis, based on the newest `vite` & `vue3`
## Preview and generate static files

This website is compiled using node.

1. download and install nodejs (version>12.5.0)
2. clone the code to local
2. run `npm install` to install the required libraries.
3. run `npm run` in the root directory, you can visit http://localhost:3000 to view the site preview
4. to generate static website resource files, run `npm run build`. The static resources built are in the dist directory.

## Contribution Guidelines

This guide will guide you how to contribute to the Linkis website.

### Specification

#### 1. Directory naming convention

Use all lowercase, separated by a dash. If there is a plural structure, use plural nomenclature and do not use plural abbreviations.

Positive example: `scripts / styles / components / images / utils / layouts / demo-styles / demo-scripts / img / doc`

Counter example: `script / style / demo_scripts / demoStyles / imgs / docs`

[Special] The component directory in components in the VUE project is named with kebab-case

Positive example: `head-search / page-loading / authorized / notice-icon`

Counter-example: `HeadSearch / PageLoading`

[Special] All directories in the VUE project except the components directory are also named with kebab-case
Positive example: `page-one / shopping-car / user-management`

Counter-example: `ShoppingCar / UserManagement`

#### 2.vue and static resource file naming convention

All lowercase, separated by a dash

Positive example: `render-dom.js / signup.css / index.html / company-logo.png`

Counter example: `renderDom.js / UserManagement.html`

#### 3. Resource path

Image resources are unified under `src/assets/{module name}`

css and other style files are placed in the `src/style` directory



### Home page modification

Located in `src/pages/home/index.vue`



### Document modification

Located in src/pages/docs

```json
filename.vue  //vue page
filename_zh.md //Chinese document corresponding 
filename_en.md //English document corresponding

```


### FAQ modification

Located in `src/pages/home/index.vue`

Chinese revision: src/pages/faq/faq_en.md
English revision: src/pages/faq/faq_zh.md

### Download page modification

Chinese list data file: src/pages/download/downloaddata_en.js
English list data file: src/pages/download/downloaddata_zh.js
Example of list data entry

```json
{
    "version":"1.0.2", //version
    "releaseDate":"2021-09-02",//release date
    "releaseDesc":"This release mainly introduces Flink-support into Linkis ecosystem.",//Description
    "newFeatures":"6",//The number of new features added to this version
    "enhancement":"5",//Enhanced optimization function than version
    "bugFixs":"5",//The number of bugs fixed in this version
    "changeLogUrl":"https://github.com/apache/incubator-linkis/releases/tag/1.0.2",//Detailed change log link to release log on github
    "downloadUrl":"https://github.com/apache/incubator-linkis/archive/refs/tags/1.0.2.zip"//version download address
}
```



## other 

The naming convention refers to "Alibaba Front-end Development Specification"