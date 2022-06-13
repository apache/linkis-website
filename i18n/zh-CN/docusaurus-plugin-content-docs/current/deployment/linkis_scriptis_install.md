---
title: 工具Scriptis的安装部署
sidebar_position: 10
---

## 1. 介绍

> 在Linkis1.0和DSS 1.1.X之后，支持将Scritpis单独部署来集成Linkis，使用Scriptis的交互式分析的功能，可以在web 页面在线写SQL、Pyspark、HiveQL等脚本，提交给Linkis执行且支持UDF、函数、资源管控和自定义变量等特性，本文将介绍如何单独部署Web组件-Scriptis，并通过Scriptis这种Web页面来使用Linkis。

:::caution 注意
前提:已经成功安装并可以正常使用了linkis服务（后端和管理台服务），linkis的部署流程可以见[Linkis的快速部署](deployment/quick_deploy)

示例说明:
- linkis-gateway服务的地址为10.10.10.10 端口为9001 
- linkis的管理台nginx部署在10.10.10.10 端口为8080
:::

 



## 2. 编译流程

### 2.1 安装node.js
```shell script
     将node.js下载，安装即可。下载地址：http://nodejs.cn/download/ （建议使用最新的稳定版本） 该步骤仅第一次使用时需要执行
```
    
### 2.2 获取scriptis代码
> Scriptis是一个纯前端的项目，作为一个组件集成在DSS的web代码组件中，我们只需要将DSS web项目进行单独的scriptis模块编译

```shell script
#通过git下载 dss 1.1.0官方版本发布前，建议先使用这个分支dev-1.1.4分支，来编译scriptis组件
git clone https://github.com/WeDataSphere/DataSphereStudio/tree/dev-1.1.4
# 或则直接下载zip包 后解压
https://codeload.github.com/WeDataSphere/DataSphereStudio/zip/refs/heads/dev-1.1.4

#进入web目录
cd DataSphereStudio/web 

#添加依赖  注意：这里不是通过npm install 而是lerna bootstrap  需先安装 learn  该步骤仅第一次使用时需要执行
lerna bootstrap
```



### 2.3 本地运行项目
> 如果不想本地运行查看，可以跳过此步 

#### 2.3.1 配置linkis-gateway服务地址配置
如果是在本地启动服务，需要在代码中配置后端linkis-gateway服务地址，在web/packages/dss/目录下的`.env`文件，
打包部署时不需要进行配置
```shell script
// 后端linkis-gatway服务地址
VUE_APP_HOST=http://10.10.10.10:9001
VUE_APP_MN_CONFIG_PREFIX=http://10.10.10.10:9001/api/rest_j/v1
```
#### 2.3.2 运行scriptis模块 

```shell script
cd DataSphereStudio/web 
# 运行scriptis组件 
npm run serve --module=scriptis
```

打开浏览器，通过链接`http://localhost:8080`(本地请求默认端口是8080)访问应用scriptis ，因为会请求到远端的linkis-gatway服务接口，这会存在跨域问题，chrome浏览器解决跨域问题可参考[解决Chrome跨域问题](https://www.jianshu.com/p/56b1e01e6b6a)


## 3. 打包&部署 scriptis

### 3.1  打包
```shell script
#指定scriptis模块 
cd DataSphereStudio/web 

#该指令成功执行后，web目录下会出现一个名叫 `dist` 的文件夹，该文件夹即为打包好scriptis的组件资源代码。我们需要将该前端资源部署到linkis-web所在的nginx服务器上
npm run build --module=scriptis 
```

### 3.2 部署

将 3.1编译出来的静态资源 上传至 linkis 管理台所在的服务器上，存放于`/data/Install/scriptis-web/dist/`，
在安装 linkis 管理台的nginx服务器配置中，添加 scriptis 的静态资源访问规则，linkis 管理台部署的 nginx 配置一般位于 `/etc/nginx/conf.d/linkis.conf`

```shell script
 location /scriptis { 
     alias      /data/Install/scriptis-web/dist/ ;
     index     index.html ;
}
```

sudo vim `/etc/nginx/conf.d/linkis.conf`

```shell script
server {
            listen       8080;# 访问端口
            server_name  localhost;
            #charset koi8-r;
            #access_log  /var/log/nginx/host.access.log  main;

            location / {
             root    /appcom/Install/linkis-web/dist/; # 静态文件目录
             index   index.html;
            }

           location /scriptis {  #scriptis的资源带有scriptis前缀与linkis 管理台区分开
             alias        /data/Install/scriptis-web/dist/  ;  #nginx scriptis静态文件存放路径(可自定义)
             index     index.html ;
            }

        .......

location /api {
            proxy_pass http://10.10.10.10:9001; #gatway的地址
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

```
修改配置后 ，重新加载nginx配置 
```shell script
sudo nginx -s reload
```

注意nginx中，root和alias区别
- root的处理结果是：root路径＋location路径.
- alias的处理结果是：使用alias路径替换location路径.
- alias是一个目录别名的定义，root则是最上层目录的定义

## 4. scriptis 使用步骤

### 4.1 正常登录linkis管理台
```shell script
#http://10.10.10.10:8080/#/
http://nginxIp:port/#/
```
因scriptis需要进行登录验证所以需要先进行登录，拿到cookie。

### 4.2 登录成功后 访问 scriptis 页面

```shell script
#http://10.10.10.10:8080/scriptis/
http://nginxIp:port/scriptis/
```
nginxIp:nginx服务器ip，port:linkis管理台nginx配置启动的端口号，`scriptis`为请求scriptis项目静态文件nginx配置的location 地址（可自定义设置）

### 4.3 使用 scriptis 
以新建一个sql查询任务为例。


step1 新建脚本 选择脚本类型为sel类型

![效果图](/Images-zh/deployment/scriptis/new_script.png)

step2 输入要查询的语句

![效果图](/Images-zh/deployment/scriptis/test_statement.png)

step3 运行

![效果图](/Images-zh/deployment/scriptis/running_results.png)


shep4 查看结果 

![效果图](/Images-zh/deployment/scriptis/design_sketch.png)


