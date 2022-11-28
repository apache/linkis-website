---
title: 前端管理台部署
sidebar_position: 6
---

Linkis在1.0提供了单独的前端管理台功能，提供了展示Linis的全局历史、修改用户参数、管理ECM和微服务等功能，部署前端管理台前需要先将Linkis后端进行部署，Linkis的部署手册见：[Linkis部署手册](deployment/quick-deploy.md)

## 1、准备工作

1. 在linkis的安装包（wedatasphere-linkis-x.x.x-combined-package-dist.tar.gz）中解压后会有前端的压缩包：wedatasphere-linkis-web-1.0.0.zip
2. 需要手动解压：unzip wedatasphere-linkis-web-1.0.0.zip，解压后目录为：
```
config.sh
dist
install.sh
```

## 2、部署
&nbsp;&nbsp;&nbsp;&nbsp;分为两种部署方式，自动化部署和手动部署

### 2.1 自动化部署
&nbsp;&nbsp;&nbsp;&nbsp;进入解压的前端目录，在该目录下编辑 ```vi config.sh ```
更改前端端口和后端接口地址,后端接口地址为linkis的gateway地址

```$xslt
#Configuring front-end ports
linkis_port="8088"

#URL of the backend linkis gateway
linkis_url="http://localhost:9001"

#linkis ip address, replace `127.0.0.1` to real ip address if neccssary
linkis_ipaddr=127.0.0.1
```

修改完后在该目录下执行,需要使用sudo执行：```sudo sh install.sh ```

执行完后可以直接通过在谷歌浏览器访问：```http://linkis_ipaddr:linkis_port``` 其中linkis_port为config.sh里面配置的端口，linkis_ipaddr为安装机器的IP

如果访问失败：可以通过查看安装日志哪一步出错

### 2.2 手动部署
1.安装Nginx:```sudo yum install nginx -y```

2.修改配置文件：sudo vi /etc/nginx/conf.d/linkis.conf
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

3.将前端包拷贝到对应的目录:```/appcom/Install/linkis/dist; # 前端包解压的目录 ```

4.启动服务```sudo systemctl restart nginx```

5.执行完后可以直接通过在谷歌浏览器访问：```http://nginx_ip:nginx_port```

## 3、常见问题

(1)上传文件大小限制

```
sudo vi /etc/nginx/nginx.conf
```

更改上传大小

```
client_max_body_size 200m
```

 (2)接口超时

```
sudo vi /etc/nginx/conf.d/linkis.conf
```


更改接口超时时间

```
proxy_read_timeout 600s
```

