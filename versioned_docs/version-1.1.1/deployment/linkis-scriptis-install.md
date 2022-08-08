---
title: Installation and deployment of tool scriptis
sidebar_position: 10
---

## 1. introduce

> On linkis1.0 and DSS 1.1 After X, scriptpis can be deployed separately to integrate with linkis. Using the interactive analysis function of scriptis, you can write SQL, pyspark, hiveql and other scripts online on the web page, submit them to linkis for execution, and support UDF, functions, resource control, user-defined variables and other features. This article will introduce how to deploy the web component scriptis separately, and use linkis through such a web page as scriptis.
:::caution be careful
Premise: the linkis service (back-end and management console services) has been successfully installed and can be used normally. See [rapid deployment of linkis] (deployment/quick-deploy) for the deployment process of linkis
Example description:
- The address of the linkis gateway service is 10.10.10.10 and the port is 9001
- The management console nginx of linkis is deployed on port 8080 of 10.10.10.10
  :::





## 2. Compilation process

### 2.1 Install node js
```shell script
     Set node JS download and install. Download address: http://nodejs.cn/download/ (it is recommended to use the latest stable version) this step is only required for the first use
```

### 2.1 install learn
```shell script
   #The computer opens the CMD terminal tool and enters the command for global installation
   npm install lerna -g
```
Wait until the installation is completed. The installation of liarn only needs to be performed when it is used for the first time


### 2.2 Get scripts code
> Scriptis is a pure front-end project, which is integrated into the DSS web code component as a component. We only need to compile the DSS web project with a separate scripts module

```shell script
#Before downloading the official version of DSS 1.1.0 through GIT and releasing it, it is recommended to use the dev-1.1.4 branch of this branch to compile the scripts component
git clone  -b dev-1.1.4 https://github.com/WeDataSphere/DataSphereStudio
# Or download the zip package directly and unzip it
https://codeload.github.com/WeDataSphere/DataSphereStudio/zip/refs/heads/dev-1.1.4

#Enter web directory
cd DataSphereStudio/web 

#Add dependency note: learn needs to be installed in lerna bootstrap instead of NPM install. This step needs to be performed only for the first time
lerna bootstrap
```



### 2.3 Local operation project
> If you do not want to run the view locally, you can skip this step

#### 2.3.1 Configure the linkis gateway service address configuration
If the service is started locally, you need to configure the back-end linkis gateway service address in the code, which is in the `. Under the web/packages/dss/ directory Env` file,
Configuration is not required when packaging deployment
```shell script
// Backend linkis gatway service address
VUE_APP_HOST=http://10.10.10.10:9001
VUE_APP_MN_CONFIG_PREFIX=http://10.10.10.10:9001/api/rest_j/v1
```
#### 2.3.2 Running scripts module

```shell script
cd DataSphereStudio/web 
# Run scripts component 
npm run serve --module=scriptis
```

Open the browser and link` http://localhost:8080 `(the default port for the local request is 8080) to access the application scripts, because it will request the remote linkis gatway service interface, which will have a cross domain problem. To solve the cross domain problem for the Chrome browser, please refer to [solve the chrome cross domain problem]（ https://www.jianshu.com/p/56b1e01e6b6a )

## 3. Packaging &amp; Deployment scriptis

### 3.1  pack
```shell script
#Specify scripts module
cd DataSphereStudio/web 

#After the instruction is successfully executed, a folder named 'dist' will appear in the web directory, which is the component resource code of packaged scripts. We need to deploy this front-end resource to the nginx server where linkis web is located
npm run build --module=scriptis 
```

### 3.2 deploy

Upload the static resources compiled in 3.1 to the server where the linkis management console is located, and store them in `/data/install/scripts-web/dist/`,
Add the static resource access rules of scripts to the nginx server configuration for installing the linkis management console. The nginx configuration deployed by the linkis management console is generally located in `/etc/nginx/conf.d/linkis conf`

```shell script
 location /scriptis { 
     alias      /data/Install/scriptis-web/dist/ ;
     index     index.html ;
}
```

sudo vim `/etc/nginx/conf.d/linkis.conf`

```shell script
server {
            listen       8080;# Access port
            server_name  localhost;
            #charset koi8-r;
            #access_log  /var/log/nginx/host.access.log  main;

            location / {
             root    /appcom/Install/linkis-web/dist/; # Static file directory
             index   index.html;
            }

           location /scriptis {  #The resources of scripts are prefixed with scripts to distinguish them from the linkis management console
             alias        /data/Install/scriptis-web/dist/  ;  #Nginx scripts static file storage path (customizable)
             index     index.html ;
            }

        .......

location /api {
            proxy_pass http://10.10.10.10:9001; #Address of gatway
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
After modifying the configuration, reload the nginx configuration
```shell script
sudo nginx -s reload
```

Note the difference between root and alias in nginx
- The result of root processing is: root path + location path
- The result of alias processing is to replace the location path with the alias path
- Alias is the definition of a directory alias, and root is the definition of the top-level directory

## 4. scriptis Use steps

### 4.1 Log in to the linkis management console normally
```shell script
#http://10.10.10.10:8080/#/
http://nginxIp:port/#/
```
Because scripts requires login verification, you need to log in first to get the cookie.

### 4.2 Visit the scripts page after successful login

```shell script
#http://10.10.10.10:8080/scriptis/
http://nginxIp:port/scriptis/
```
Nginxip:nginx server IP, port:linkis management console nginx configuration start port number, `scripts` is the location address configured for the static file nginx of the requested scripts project (customizable)
### 4.3 use scriptis
Take creating an SQL query task as an example.


step1 New script

![design sketch](/Images-zh/deployment/scriptis/new_script.png)

step2 Enter the statement to query

![design sketch](/Images-zh/deployment/scriptis/test_statement.png)

step3 function

![design sketch](/Images-zh/deployment/scriptis/running_results.png)


shep4 View results

![design sketch](/Images-zh/deployment/scriptis/design_sketch.png)


