---
title: How to Participate in Website Project Contribution
sidebar_position: 2.1
---


## Branch
dev is the development branch, please fork to your own repository, create a fix/feature branch based on the dev branch, and then perform development and modification on this branch.
```
master 
dev #development branch
asf-site   #The official environment of asf-site official website is accessed through https://linkis.apache.org
asf-staging #The asf-staging official website test environment is accessed through https://linkis.staged.apache.org
```


## 1 Preview and generate static files

This website is compiled using node, using Docusaurus framework components

1. Download and install nodejs (version>12.5.0)
2. Clone the code to the local `git clone git@github.com:{githubid}/incubator-linkis-website.git`
2. Run `npm install` to install the required dependent libraries.
3. Run `npm run start` in the root directory, you can visit http://localhost:3000 to view the English mode preview of the site
4. Run `npm run start-zh` in the root directory, you can visit http://localhost:3000 to view the Chinese mode preview of the site
5. To generate static website resource files, run `npm run build`. The static resources of the build are in the build directory.

## 2 Directory structure
```html
|-- blog
|-- community 
|-- docs     //The next version of the document that will be released soon
|-- download 
|-- faq      //Q&A
|-- i18n    
|   `-- zh-CN  //Internationalized Chinese
|       |-- code.json
|       |-- docusaurus-plugin-content-blog
|       |-- docusaurus-plugin-content-docs
|       |-- docusaurus-plugin-content-docs-community
|       |-- docusaurus-plugin-content-docs-download
|       |-- docusaurus-plugin-content-docs-faq
|       `-- docusaurus-theme-classic
|-- resource  // Original project files for architecture/timing diagram/flow chart, etc.
|-- src
|   |-- components
|   |-- css
|   |-- js
|   |-- pages
|   |   |-- home
|   |   |-- index.jsx
|   |   |-- team
|   |   |-- user
|   |   `-- versions
|   |-- styles
|-- static //Picture static resource
|   |-- Images
|   |-- Images-zh
|   |-- faq
|   |-- home
|   `-- img
|-- docusaurus.config.js
|-- versioned_docs //Historical version archive
|   `-- version-1.0.2
|-- versioned_sidebars
|   `-- version-1.0.2-sidebars.json
`-- versions.json

```
The following table illustrates how versioned files are mapped to their version and generated URL.


| file Path                               | Version        | http URL              |
| --------------------------------------- | -------------- | ----------------- |
| `versioned_docs/version-1.0.1/hello.md` | 1.0.1         | /docs/1.0.1/hello |
| `versioned_docs/version-1.0.2/hello.md` | 1.0.2 (latest current stable version) | /docs/latest/hello  |
| `docs/hello.md`                         | current (the next version 1.0.3 to be released)     | /docs/1.0.3/hello  |


Current version information

| Version | Access Path | English Document Path | Chinese Document Path |
| ---------------------------------------| -------------- | -------------- | ----------------- |
| 1.0.2|https://linkis.apache.org/docs/latest/xxx (https://linkis.apache.org/zh-CN/docs/latest/xxx)| versioned_docs/version-1.0.2/  |  i18n/zh-CN/docusaurus-plugin-content-docs/version-1.0.2 |
|1.0.3|https://linkis.apache.org/docs/1.0.3/xxx (https://linkis.apache.org/zh-CN/docs/1.0.3/xxx) |  /docs  |i18n/zh-CN/docusaurus-plugin-content-docs/current|


## 3 Specification

### 3.1 Directory naming convention

Use all lowercase, separated by underscores. If there is a plural structure, use plural nomenclature, and do not use plural abbreviations

Positive example: `scripts / styles / components / images / utils / layouts / demo_styles / demo-scripts / img / doc`

Counter example: `script / style / demoStyles / imgs / docs`

### 3.2 Vue and the naming convention of static resource files

All lowercase, separated by a dash

Positive example: `render-dom.js / signup.css / index.html / company-logo.png`

Counter example: `renderDom.js / UserManagement.html`

### 3.3 Resource path

Image resources are unified under `static/{module name}`

css and other style files are placed in the `src/css` directory

### 3.4 Page content modification
> Except for the homepage, team, user, Docs>All Version module page, all other pages can be directly jumped to the corresponding github resource modification page through the'Edit this page' button at the bottom

### 3.5 Home page modification
Visit the page https://linkis.apache.org
Located in `src/pages/home`

```
├─home
│ config.json Home page Chinese and English configuration
│ index.less homepage style
```
### 3.6 Team page modification
Visit the page https://linkis.apache.org/team
Located in `src/pages/team`
```
├─team
│ config.json
│ index.js
│ index.less
```
### 3.7 User list page modification
Visit the page https://linkis.apache.org/user
```
Located in `src/pages/user`
└─versions
        config.json
        data.json
        img.json
        index.js
        index.less
```

### 3.8 Version list page modification
Visit the page https://linkis.apache.org/versions
```
Located in `src/pages/versions`
└─versions
        config.json
        index.jsorchestrator/overview.md
        index.less
```

### 3.9 User list page modification
Visit the page https://linkis.apache.org/user

Company logo Located in `static/home/user`, and the picture size must be 176 × 88.

### 3.10 Path specification
If you want to link from a markdown document to another, it is best to use absolute path. For example, if you want to link to `quick-deploy.md`, the path should be `/docs/deployment/quick-deploy.md`.

### English document title specification
English siderbar titles should be capitalized except for prepositions, and only the first word of the title in the markdwon document should be capitalized.


## 4 New documents

![#f03c15](https://via.placeholder.com/15/f03c15/000000?text=+) The md document is recommended to be viewed by visiting the official website and viewing the md document through github. There is a problem that static resources such as pictures cannot be displayed correctly

- The English document docs/ corresponds to the next Next version to be released, and the historical archive version is stored in the versioned_docs/version-${versionno} directory.
- Chinese documents are placed in the corresponding directory of i18n/zh-CN/docusaurus-plugin-content-docs/, current is the next version to be released. version-${versionno} is the historical archive version.
- Image resources are placed in the static/ directory

## 5 How to deploy
The official website of linkis is divided into test environment and formal environment
-Test environment access URL https://linkis.staged.apache.org
-Official environment visit URL https://linkis.apache.org

When the dev branch code is updated, git action will automatically execute the source build of the dev branch, and automatically update the compiled resource results to the asf-staging branch.
The internal mechanism of Apache will deploy the content of the asf-staging branch to the test environment, so when the git action is successfully executed, it can be verified by visiting https://linkis.staged.apache.org.
After the verification is correct, the asf-staging branch can be merged to the asf-site branch. The internal mechanism of Apache will deploy the content of the asf-site branch to the formal environment. After the merge, the formal environment is considered to be updated successfully.

## 6 Points for attention
- When adding Chinese documents, you need to add English documents at the same time, otherwise the added page cannot be displayed  
- When adding a document, pay attention to the document node name and node sorting fields, as shown in the following figure  
![pg-eng](https://user-images.githubusercontent.com/29391030/161210331-497bbc90-369d-4401-b9dd-fe63bbaba850.png)

## 7 Acknowledgments

[![Deploys by Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg "Deploys by Netlify")](https://www.netlify.com/) 
[Netlify](https://www.netlify.com) kindly provides pull request builds, checks and previews for this website.

## 8 Other
The naming convention refers to "Alibaba Front-end Development Specification"

