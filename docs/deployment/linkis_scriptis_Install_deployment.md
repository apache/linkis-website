---
title: linkis+scriptis Installation and erection
sidebar_position: 8
---

# introduce

---

### On linkis1.0 and DSS 1.1 After X, scriptpis can be deployed separately to integrate linkis. Using the interactive analysis function of scriptis, you can write SQL, pyspark, hiveql and other scripts online on the web page and submit them to the linkis executor. It also supports UDF, functions, resource control, user-defined variables and other features. This article will introduce the whole process from the compilation of scriptis source code to the deployment of integrated linkis
### 一：Local start process

#### （一）：Install node js
````bash
     Set node JS can be downloaded to the local computer and installed. Download address: http://nodejs.cn/download/ (it is recommended to use the latest stable version) this step is only required for the first use
````
#### （二）：Local installation project
````bash
    1， Open the terminal command line in the download path and execute the following commands:
         git clone https://github.com/WeDataSphere/DataSphereStudio/tree/dev-1.1.x(It is recommended to use this branch before dss1.1.0 release)
    Note: in order to ensure the readability of the source code, the coding specifications of some open source projects require that the naming of classes, methods and variables should be literal and avoid abbreviations. Therefore, some source code files may be named longer. Because the Windows version of Git is compiled with msys, it uses the old version of Windows API, and the file name is limited to 260 characters.
    The solution is as follows:
        Open cmd Exe (you need to add git to the environment variable) and execute the following command:
        git config --global core.longpaths true

    2，cd DataSphereStudio/web (Enter web directory)

    lerna bootstrap （Add dependency） Note: learn should be installed in lerna bootstrap instead of NPM install 
    Note: it is recommended to download linkis > 1.0.3 DSS > 1.1 X (version configuration download)
    Reason: because DSS has not yet released its version, it is recommended to use the branch of this interval before the release of dss1.1.0

````
#### Instruction introduction：

Pull project package from remote warehouse to local computer：git clone ${ipAddress}
Enter the project package root directory：cd DataSphereStudio/web
Dependencies required for installation project：lerna bootstrap （This step is only required for the first use）

#### （三）：to configure

````bash
If you start the service locally, you need to make some configuration in the code, such as in the root directory env. Development file:
// Back end interface address
VUE_APP_MN_CONFIG_PREFIX=http://yourIp:yourPort/yourPath （gatway server）
// VUE_APP_HOST=
VUE_APP_HOST=/yourSocketPath
````
##### Note: only the local startup needs to be configured. The startup on the server does not need to be added, such as Vue_ APP_ MN_ CONFIG_ Prefix is empty by default.
#### （四）：Local operation project

````bash
If you want to run the project on the local browser and change the code to view the effect, you need to open the terminal command window under the project path and execute the following commands in the command:
# Develop and start DSS
npm run serve
# Run some module sub applications, and support combination through modules. For example, scripts version:
npm run serve --module=scriptis
````
#### （五）：Package project (for online server)
````bash
 You can open the terminal command window under the project path to package the project in the command and generate compiled code
  
  1，Package DSS application
    npm run build
  2，The Baoding sub application supports combination through module
    npm run build --module=scriptis
    npm run build --module=apiServices,workspace --micro_module=apiServices
````
After the command is successfully executed, a folder named "dist" will appear under the project root directory, which is the packaged code. You can put this folder directly into your static server.
Access the app through a link in the browser (Chrome browser is recommended): http://localhost:port/  .  When you use this method to run a project, the effect of your code changes will be dynamically reflected in the browser.

##### Note: because the project adopts front-end and back-end separate development, when running on the local browser, you need to set the browser to access the back-end interface across domains

##### For example, Chrome browser: the configuration mode under Windows system:

Close all chrome browsers.
Create a new chrome shortcut, right-click properties, select target in the Shortcut tab, and add --args --disable web security --user data dir=c:\mychromedevuserdata
Open the configuration method under the Chrome browser MAC system through a shortcut: execute the following command on the terminal command line (you need to replace the yourname in the path. If it does not take effect, please check the location of the mychromedevuserdata folder on your machine and copy the path to the "--user-data-dir=" of the following command)

open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/yourname/MyChromeDevUserData/

### 二：Scriptis separate installation steps

#### （一）：scriptis pack
````bash
	npm run serve --module=scriptis #Specify module
````
#### （二）：Manual deployment
````bash
 location /scriptistest { 
             alias      /data/Install/scriptisInstall/dist/dist/ ;
             index     index.html ;
            }
server {
            listen       port;# Access port
            server_name  localhost;
            #charset koi8-r;
            #access_log  /var/log/nginx/host.access.log  main;
            location /linkis/visualis {
            root   /data/Install/LinkisWeb/linkis/visualis; # Static file directory
            autoindex on;
            }
            location / {
             root    /appcom/Install/linkis-web/dist/; # Static file directory
             index   index.html;
            }
            location /scriptistest {
             alias      /data/Install/scriptisInstall/dist/dist/ ;  #nginx scriptis Static file storage path (customizable)
             index     index.html ;
            }~~~~
            location /ws {
            proxy_pass http://yourIP:port;#Address of gatway
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection upgrade;
            }
 location /api {
            proxy_pass http://yourIP:port; #Address of gatway
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
##### Note: the difference between root and alias:
The result of root processing is: root path + location path
The result of alias processing is to replace the location path with the alias path

### 三：scriptis Use steps:

#### （一）Log in to the linkis management console normally
````bash
http://yourIP:port/#/
````
Because scripts requires login verification, you need to log in first.
#### （二）Visit the scripts page after successful login
````bash
http://yourIP:port/scriptistest/#/home
````
Yourip: personal computer IP, port: port number (self-defined), scriptest is the static file prefix of the requested scripts project (customizable)
#### design sketch

![design sketch](/Images-zh/deployment/skywalking/linkis-scriptis.png)


