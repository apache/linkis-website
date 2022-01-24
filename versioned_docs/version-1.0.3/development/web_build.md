---
title: Linkis Console Compile
sidebar_position: 4
---

## Start the process

### 1. Install Node.js
Download Node.js to your computer and install it. Download link: [http://nodejs.cn/download/](http://nodejs.cn/download/) (It is recommended to use the latest stable version)
**This step only needs to be performed the first time you use it. **

### Second, the installation project
Execute the following commands in the terminal command line:

```
git clone git@github.com:apache/incubator-linkis.git
cd incubator-linkis/web
npm install
```

Introduction to the instruction:
1. Pull the project package from the remote git repository  to the local computer
2. Enter the web root directory of the project: cd Linkis/web
3. Dependencies required to install the project: npm install

**This step only needs to be performed the first time you use it. **

### Three, configuration
You need to make some configuration in the code, such as the back-end interface address, etc., such as the .env.development file in the root directory:

```
// back-end interface address
VUE_APP_MN_CONFIG_PREFIX=http://yourIp:yourPort/yourPath
```

For specific explanation of the configuration, please refer to the official vue-cli document: [Environment Variables and Modes](https://cli.vuejs.org/zh/guide/mode-and-env.html#%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F%E5%92%8C%E6%A8%A1%E5%BC%8F)

### Package the project
You can package the project by executing the following commands on the terminal command line to generate compressed code:

```
npm run build
```

After the command is successfully executed, a "dist" folder and a "*-${getVersion()}-dist.zip" compressed file will appear in the project web directory. The directory dist/dist is the packaged code. You can Put the folder directly into your static server, or refer to the installation document and use the script to deploy and install.

### Run the project
If you want to run the project on a local browser and change the code to view the effect, you need to execute the following commands in the terminal command line:

```
npm run serve
```

In the browser (Chrome browser is recommended) to access the application through the link: [http://localhost:8080/](http://localhost:8080/).
When you run the project in this way, the effect of your code changes will be dynamically reflected in the browser.

**Note: Because the project is developed separately from the front and back ends, when running on a local browser, the browser needs to be set to cross domains to access the back-end interface:**

For example, the chrome browser:
Configuration method under windows system:
1. Close all chrome browsers.
2. Create a new chrome shortcut, right-click "Properties", select "Target" in the "Shortcut" tab, and add --args --disable-web-security --user-data-dir=C:\MyChromeDevUserData
3. Open chrome browser via shortcut
Configuration method under mac system:
Execute the following command on the terminal command line (you need to replace yourname in the path, if it does not take effect, please check the location of the MyChromeDevUserData folder on your machine and copy the path to the "--user-data-dir=" in the following command)

```
open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/yourname/MyChromeDevUserData/
```


### common problem

#### npm install cannot succeed
If you encounter this situation, you can use the domestic Taobao npm mirror:

```
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

Then, replace the npm install command by executing the following command

```
cnpm install
```

Note that when the project is started and packaged, you can still use the npm run build and npm run serve commands