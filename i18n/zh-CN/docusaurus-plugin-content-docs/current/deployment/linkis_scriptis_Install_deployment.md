---
title: linkis+scriptis 安装部署
sidebar_position: 10
---

# 介绍

---
### 在Linkis1.0和DSS 1.1.X之后，支持将Scritpis单独部署来集成Linkis，使用Scriptis的交互式分析的功能，可以在web 页面在线写SQL、Pyspark、HiveQL等脚本，提交给Linkis执行具，且支持UDF、函数、资源管控和自定义变量等特性，本文将介绍从Scriptis源码编译到部署集成Linkis的整个流程

### 一：本地启动流程

#### （一）：安装Node.js
````bash
     将Node.js下载到电脑本地，安装即可。下载地址：http://nodejs.cn/download/ （建议使用最新的稳定版本） 该步骤仅第一次使用时需要执行
````
#### （二）：本地安装项目
````bash
    1， 在下载路径打开终端命令行执行以下指令：
         git clone https://github.com/WeDataSphere/DataSphereStudio/tree/dev-1.1.x(dss1.1.0版本发布前建议先使用这个分支)
    （注意：为保证源码的可读性，部分开源项目编码规范要求类、方法和变量的命名要做到望文生义，避免使用缩写，因此可能导致部分源码文件命名较长。由于Windows版本的Git是使用msys编译的，它使用了旧版本的Windows Api，限制文件名不能超过260个字符。
    解决方案如下：
        打开cmd.exe（你需要将git添加到环境变量中）并执行下面的命令：
        git config --global core.longpaths true

    2，cd DataSphereStudio/web (进入web目录)

    lerna bootstrap （添加依赖） (注意：这里不是通过npm install 而是lerna bootstrap  需先安装 learn )
    注意：下载linkis服务时及DSS版本时建议在这个区间下载 Linkis > 1.0.3 DSS > 1.1.x （版本配置下载）
    原因：因为DSS暂时还未发布版本，dss1.1.0版本发布前建议先使用这个区间的分支

````
#### 指令简介：

将项目包从远程仓库拉取到电脑本地：git clone ${ipAddress}
进入项目包根目录：cd DataSphereStudio/web
安装项目所需依赖：lerna bootstrap （该步骤仅第一次使用时需要执行）

#### （三）：配置

````bash
如果您是在本地启动服务的话需要在代码中进行一些配置，如根目录下的.env.development文件：
// 后端接口地址
VUE_APP_MN_CONFIG_PREFIX=http://yourIp:yourPort/yourPath （gatway服务）

````
##### 注意：本地启动才需要配置服务器上启动不用添加，如VUE_APP_MN_CONFIG_PREFIX默认为空即可。
#### （四）：本地运行项目

````bash
如果您想在本地浏览器上运行该项目并且改动代码查看效果，需要在该项目路径下打开终端命令窗口在命令中执行以下指令：
# 开发启动DSS
npm run serve
# 运行部分模块子应用，支持通过module组合。如scriptis版本：
npm run serve --module=scriptis
````
#### （五）：打包项目（线上服务器使用）
````bash
  您可以通过在该项目路径下打开终端命令窗口在命令中对项目进行打包，生成编译后的代码
  
  1，打包DSS应用
    npm run build
  2，打包子应用，支持通过module组合
    npm run build --module=scriptis
    npm run build --module=apiServices,workspace --micro_module=apiServices
````
该指令成功执行后，项目根目录下会出现一个名叫 “dist” 的文件夹，该文件夹即为打包好的代码。您可以直接将该文件夹放进您的静态服务器中。
在浏览器中（建议Chrome浏览器）通过链接访问应用：http://localhost:port/ . 当您使用该方式运行项目时，您对代码的改动产生的效果，会动态体现在浏览器上。

##### 注意：因为项目采用前后端分离开发，所以在本地浏览器上运行时，需要对浏览器进行设置跨域才能访问后端接口

##### 如chrome浏览器： windows系统下的配置方式：

关闭所有的chrome浏览器。
新建一个chrome快捷方式，右键“属性”，“快捷方式”选项卡里选择“目标”，添加 --args --disable-web-security --user-data-dir=C:\MyChromeDevUserData
通过快捷方式打开chrome浏览器 mac系统下的配置方式： 在终端命令行执行以下命令(需要替换路径中的yourname，若还不生效请检查您机器上MyChromeDevUserData文件夹的位置并将路径复制到下面指令的“--user-data-dir=”后面)

open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/yourname/MyChromeDevUserData/

### 二：Scriptis单独安装步骤

#### （一）：scriptis打包
````bash
	npm run serve --module=scriptis #指定模块 
````
#### （二）：手动部署
````bash
 location /scriptistest { 
             alias      /data/Install/scriptisInstall/dist/dist/ ;
             index     index.html ;
            }
server {
            listen       port;# 访问端口
            server_name  localhost;
            #charset koi8-r;
            #access_log  /var/log/nginx/host.access.log  main;
            location /linkis/visualis {
            root   /data/Install/LinkisWeb/linkis/visualis; # 静态文件目录
            autoindex on;
            }
            location / {
             root    /appcom/Install/linkis-web/dist/; # 静态文件目录
             index   index.html;
            }
            location /scriptistest {
             alias      /data/Install/scriptisInstall/dist/dist/ ;  #nginx scriptis静态文件存放路径(可自定义)
             index     index.html ;
            }~~~~
            location /ws {
            proxy_pass http://yourIP:port;#gatway的地址
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection upgrade;
            }
 location /api {
            proxy_pass http://yourIP:port; #gatway的地址
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header x_real_ipP $remote_addr;
            proxy_set_header remote_addr $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_http_version 1.1;
            proxy_connect_timeout 4s;
            proxy_read_timeout 600s;
            proxy_send_timeout 12s;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection upgrade;
            }

            #error_page  404              /404.html;
            # redirect server error pages to the static page /50x.html
            #
            error_page   500 502 503 504  /50x.html;
            location = /50x.html {
            root   /usr/share/nginx/html;
            }
        }
````
##### 注意：root和alias区别：
root的处理结果是：root路径＋location路径
alias的处理结果是：使用alias路径替换location路径

### 三：scriptis 使用步骤：

#### （一）正常登录linkis管理台
````bash
http://yourIP:port/#/
````
因scriptis需要进行登录验证所以需要先进行登录。
#### （二）登录成功后 访问 scriptis 页面
````bash
http://yourIP:port/scriptistest/#/home
````
yourIP:个人电脑IP，port:端口号（自行定义），scriptistest为请求scriptis项目静态文件前缀（可自定义设置）

#### 效果图

![效果图](/Images-zh/deployment/skywalking/linkis-scriptis.png)


