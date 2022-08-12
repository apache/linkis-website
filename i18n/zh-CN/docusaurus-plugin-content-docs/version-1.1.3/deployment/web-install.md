---
title: 管理台部署
sidebar_position: 6
---
> web端是使用nginx作为静态资源服务器的，访问请求流程是:`Linkis管理台请求->nginx ip:port->linkis-gateway ip:port-> 其他服务`


Linkis 提供了单独的前端管理台功能，提供了展示历史任务的全局历史、修改用户参数、管理ECM和微服务等功能，部署前端管理台前需要先将Linkis后端进行部署，Linkis的部署手册见：[Linkis部署手册](quick-deploy.md)


## 1 准备工作

1. 从linkis的release页面（[点击这里进入下载页面](https://linkis.apache.org/zh-CN/download/main)）下载web安装包`apache-linkis-x.x.x-incubating-web-bin.tar.gz`
手动解压：`tar -xvf  apache-linkis-x.x.x-incubating-web-bin.tar.gz`，

解压后目录为：
```
├── config.sh
├── DISCLAIMER
├── dist
├── install.sh
├── LICENSE
├── licenses
└── NOTICE
```

## 2 部署

> 分为两种部署方式，自动化部署和手动部署

### 2.1 自动化部署(推荐)

#### 2.1.1 修改配置config.sh
```shell script
#linkis-mg-gateway服务地址
linkis_url="http://127.0.0.1:9001"

#可以配置为安装机器的ip 也可以使用默认值
linkis_ipaddr=127.0.0.1
# 访问管理台的端口
linkis_port=8088

```

#### 2.1.2 执行部署脚本

```shell script
# nginx 需要sudo权限进行安装
sudo sh install.sh
```
安装后，linkis的nginx配置文件默认是 在`/etc/nginx/conf.d/linkis.conf`
nginx的日志文件在 `/var/log/nginx/access.log` 和`/var/log/nginx/error.log`
生成的linkis管理台的nginx配置文件示例如下:
```nginx

        server {
            listen       8188;# 访问端口 如果端口被占用，则需要修改
            server_name  localhost;
            #charset koi8-r;
            #access_log  /var/log/nginx/host.access.log  main;
            location / {
            root   /appcom/Install/linkis-web/dist; # 静态文件目录 
            index  index.html index.html;
            }
            location /ws {
            proxy_pass http://localhost:9020;#后端Linkis的地址
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection upgrade;
            }

            location /api {
            proxy_pass http://localhost:9020; #后端Linkis的地址
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


### 2.2 手动部署

#### 2.2.1 安装Nginx
>如果已经安装过nginx 可以跳过

```shell script
sudo yum install nginx -y
```

#### 2.2.2 修改配置文件
```shell script
sudo vi /etc/nginx/conf.d/linkis.conf
```

添加如下内容：
```
server {
            listen       8080;# 访问端口
            server_name  localhost;
            #charset koi8-r;
            #access_log  /var/log/nginx/host.access.log  main;
            location / {
            root   /appcom/Install/linkis/dist; # 前端包解压的目录
            index  index.html index.html;
            }
          
            location /api {
            proxy_pass http://192.168.xxx.xxx:9001; # linkis-gateway服务的ip端口
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

#### 2.2.3 资源部署 

将前端包拷贝到对应的目录:`/appcom/Install/linkis/dist`

#### 2.2.4  启动服务

```
sudo systemctl restart nginx
```


## 3 登录管理台

浏览器访问`http://linkis_ipaddr:linkis_port` 其中linkis_port为config.sh里面配置的端口，linkis_ipaddr为安装机器的IP

用户名/密码在`{LINKIS_HOME}/conf/linkis-mg-gateway.properties`中查看
```shell script
wds.linkis.admin.user= #用户
wds.linkis.admin.password= #密码

```
管理台使用指引见[使用手册](../user-guide/console-manual.md)


## 4 注意事项 

如果需要修改端口或则静态资源目录等，请修改`/etc/nginx/conf.d/linkis.conf` 文件后执行 `sudo nginx -s reload` 命令
:::caution 注意
- 目前暂未集成visualis功能，安装过程中如果提示安装linkis/visualis失败，可以忽略 
- 查看nginx是否正常启动：检查nginx进程是否存在 `ps -ef |grep nginx` 
- 检查nginx的配置是否正确 `sudo nginx -T ` 
- 如果端口被占用，可以修改nginx启动的服务端口`/etc/nginx/conf.d/linkis.conf`listen端口值，保存后重新启动
- 如果访问管理台出现接口502，或则`Unexpected token < in JSON at position 0`异常，请确认linkis-mg-gateway是否正常启动，如果正常启动，查看nginx配置文件中配置的linkis-mg-gateway服务地址是否正确
:::


## 5 常见问题

### 5.1 上传文件大小限制

```
sudo vi /etc/nginx/nginx.conf
```

更改上传大小

```
client_max_body_size 200m
```

### 5.2 接口超时

```
sudo vi /etc/nginx/conf.d/linkis.conf
```
更改接口超时时间

```
proxy_read_timeout 600s
```
