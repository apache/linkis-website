---
title: Installation and deployment of the tool scriptis
sidebar_position: 10
---

## 1 Introduction

> After Apache Linkis >= 1.1.1 and DSS >= 1.1.0, scriptis can be deployed separately and used in conjunction with Linkis. Using the interactive analysis function of scriptis, you can write SQL, Pyspark, HiveQL, etc. online on web pages Scripts are submitted to Linkis for execution and support features such as UDFs, functions, resource management and custom variables. This article will introduce how to deploy the web component-scriptis separately, and use  Apache Linkis through the scriptis web page.


Prerequisite: The Linkis service (backend and management desk service) has been successfully installed and can be used normally. The deployment process of Linkis can be found in [Quick Deployment of Apache Linkis](quick-deploy.md)

Example description:

- The address of the linkis-gateway service is 10.10.10.10 and the port is 9001
- Linkis console nginx is deployed on 10.10.10.10 port 8080

## 2. Environment preparation

> Requires installation on first use

### 2.1 Install node.js
```shell script
Download node.js and install it. Download address: http://nodejs.cn/download/ (It is recommended to use node v14 version) This step only needs to be executed for the first time
````
### 2.2 Install learn
```shell script
#Wait for the installation to complete, the installation of liarn only needs to be executed when it is used for the first time
npm install lerna -g
````

## 3 Compile and deploy
### 3.1 Get scriptis code
> scriptis is a pure front-end project, integrated as a component in the DSS web code component, we only need to compile the DSS web project with a separate scriptis module

```shell script
#Download >=dss 1.1.0 via git to compile script components
git clone -b branch-1.1.0 https://github.com/WeBankFinTech/DataSphereStudio
# Or directly download the zip package and unzip it
https://github.com/WeBankFinTech/DataSphereStudio/archive/refs/heads/branch-1.1.0.zip

# enter the web directory
cd DataSphereStudio/web

#Add dependencies Note: This is not through npm install but lerna bootstrap needs to be installed first learn This step only needs to be executed for the first time
lerna bootstrap
````

### 3.2 Running the project locally (optional)

> If you don't need to run the debug view locally, you can skip this step

#### 3.2.1 Configure linkis-gateway service address configuration

If you start the service locally, you need to configure the backend linkis-gateway service address in the code, in the `.env` file in the `web/packages/dss/` directory,
No configuration is required when packaging and deploying
```shell script
// Backend linkis-gatway service address
VUE_APP_HOST=http://10.10.10.10:9001
VUE_APP_MN_CONFIG_PREFIX=http://10.10.10.10:9001/api/rest_j/v1
````
#### 3.2.2 Running the scriptis module

```shell script
cd DataSphereStudio/web
# run scriptis component
npm run serve --module=scriptis
````

Open the browser and access the application script through the link `http://localhost:8080` (the default port for local requests is 8080), because it will request the remote linkis-gatway service interface, which will cause cross-domain problems, chrome browser To solve cross-domain problems, please refer to [Solving Chrome Cross-Domain Problems](https://www.jianshu.com/p/56b1e01e6b6a)


## 4 Packaging & deploying scriptis

### 4.1 Packaging
```shell script
#Specify scriptis module
cd DataSphereStudio/web

#After the command is executed successfully, a folder named `dist` will appear in the web directory, which is the component resource code of the packaged scriptis. We need to deploy the front-end resource to the nginx server where linkis-web is located
npm run build --module=scriptis
````

### 4.2 Deployment

Upload the static resources compiled in step 3.1 to the server where the Linkis console is located, and store them in `/data/Install/scriptis-web/dist/`,
In the nginx server configuration where Linkis console is installed, add scriptis static resource access rules. The nginx configuration deployed by Linkis console is generally located in `/etc/nginx/conf.d/linkis.conf`

```shell script
 location /scripts {
     alias /data/Install/scriptis-web/dist/ ;
     index index.html ;
}
````

sudo vim `/etc/nginx/conf.d/linkis.conf`

```shell script
server {
            listen 8080;# access port
            server_name localhost;
            #charset koi8-r;
            #access_log /var/log/nginx/host.access.log main;

            location / {
             root /appcom/Install/linkis-web/dist/; # static file directory
             index index.html;
            }

           location /scriptis { #scriptis resources are prefixed with scriptis to distinguish them from the linkis console
             alias /data/Install/scriptis-web/dist/ ; #nginx scriptis static file storage path (customizable)
             index index.html ;
            }

        ......

location /api {
            proxy_pass http://10.10.10.10:9001; address of #gatway
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

            #error_page 404 /404.html;
            # redirect server error pages to the static page /50x.html
            #
            error_page 500 502 503 504 /50x.html;
            location = /50x.html {
            root /usr/share/nginx/html;
            }
        }

````
After modifying the configuration, reload the nginx configuration

```shell script
sudo nginx -s reload
````

Note the difference between root and alias in the location configuration block in nginx
- The processing result of root is: root path + location path.
- The result of alias processing is: replace the location path with the alias path.
- alias is the definition of a directory alias, root is the definition of the topmost directory

## 5 scriptis usage steps

### 5.1 Log in to Linkis console normally
```shell script
#http://10.10.10.10:8080/#/
http://nginxIp:port/#/
````
Because access to scriptis requires login verification, you need to log in first, obtain and cache cookies.

### 5.2 Access the scriptis page after successful login

```shell script
#http://10.10.10.10:8080/scriptis/#/home
http://nginxIp:port/scriptis/#/home
````
`nginxIp`: The ip of the nginx server deployed by the Linkis console, `port`: the port number of the nginx configuration startup, `scriptis` is the location address of the nginx configuration for requesting the static files of the scriptis project (can be customized)

### 4.3 Using scriptis

Take creating a new sql query task as an example.


step1 Create a new script Select the script type as sql type

![Rendering](/Images-zh/deployment/scriptis/new_script.png)

step2 Enter the statement to be queried

![Rendering](/Images-zh/deployment/scriptis/test_statement.png)

step3 run

![Rendering](/Images-zh/deployment/scriptis/running_results.png)


shep4 View Results

![Rendering](/Images-zh/deployment/scriptis/design_sketch.png)