---
title: Linkis 部署排障
---
> linkis的部署说明和注意点

## 1. 前置准备注意事项

### 1.1 linux服务器

**硬件要求**  
安装linkis 微服务近10个，每个微服务默认配置启动的jvm -Xmx 内存大小为 512M(内存不够的情况下，可以尝试调小至256/128M，内存足够情况下也可以调大)

**软件要求**  
基本的软件环境  
使用下面命令检查是否已安装对应的软件 ，若未安装，请先进行安装
```shell
#java环境 推荐>=1.0.8
command -v  java

#yum 包管理工具，主要是在执行linkis web管理台安装脚本时,会通过yum安装nginx/policycoreutils-python软件
command -v  yum

#linkis的数据库初始化时，会使用到mysql客户端连接数据库，执行sql语句
command -v mysql

command -v  telnet

#用于解压linkis的相关安装包
command -v  tar

#初始的服务配置文件linkis-*.properties是执行安装脚本install.sh时候，根据`deploy-config/*sh`配置的数据 通过sed 替换到properties文件中的
command -v sed

```

### 1.2 添加部署用户

部署用户: linkis核心进程的启动用户，同时此用户会默认作为管理员权限，<font color="red">部署过程中会生成对应的管理员登录密码，位于conf/linkis-mg-gateway.properties文件中</font>

linkis支持指定提交、执行的用户。linkis主要进程服务会通过sudo -u  ${linkis-user} 切换到对应用户下，然后执行对应的引擎启动命令，所以引擎linkis-engine进程归属的用户是任务的执行者（所以部署用户需要有sudo权限，而且是免密的）

以hadoop用户为例:

先查看系统中是否已经有 hadoop 用户，若已经存在，则直接授权即可；若不存在，先创建用户，再授权。

查看是否已存在 hadoop 用户
```shell script
$ id hadoop
uid=2001(hadoop) gid=2001(hadoop) groups=2001(hadoop)
```

若不存在，则需要创建 hadoop 用户，并加入 hadoop 用户组
```shell script
$ sudo useradd hadoop -g hadoop
$ vi /etc/sudoers
#加上配置
hadoop ALL=(ALL) NOPASSWD: NOPASSWD: ALL
```

修改安装用户的环境变量,`vim /home/hadoop/.bash_rc`配置环境变量，环境变量如下：
```shell script
export JAVA_HOME=/opt/jdk1.8
export HADOOP_HOME=/opt/install/hadoop
export HADOOP_CONF_DIR=/etc/conf/hadoop
export HIVE_HOME=/opt/install/hive
export HIVE_CONF_DIR=/etc/conf/conf
export SPARK_HOME=/opt/install/spark
export SPARK_CONF_DIR=/etc/spark/conf
export PYSPARK_ALLOW_INSECURE_GATEWAY=1  # 如果是Pyspark，则必须加此参数
```

刷新配置  
```shell script
$ source /home/hadoop/.bash_rc
#如果.bashrc文件不存，可以配置到.bash_profile中
```

查看是否生效
```shell script
$ sudo -su hadoop
$ echo $JAVA_HOME
$ echo $HADOOP_HOME
```

<font color='red'>以下操作都是在hadoop用户下进行</font>

### 1.3 安装包准备

linkis安装包，推荐使用1.X及上版本
0.X 和1.X的版本差异化比较大，1.0.3前是`com.webank.wedatasphere.linkis`的包名，linkis>=1.0.3为`org.apache.linkis`的包名

[下载地址](https://linkis.apache.org/zh-CN/download/main):https://linkis.apache.org/zh-CN/download/main


### 1.4 底层依赖检查

可以执行相应的命令，查看是否支持
```shell script
spark/hive/hdfs/python/
$ spark-submit --version //spark 任务会通过这个命令提交到YARN上执行
$ python --version
$ hdfs  version
$ hive --version

```

### 1.5 资源依赖  
可以访问的mysql数据库资源 用来存储linkis自身的业务数据的数据库  
可以访问的yarn资源队列 spark/hive/flink引擎的执行都需要yarn队列资源  
可以访问的hive的matedata数据库资源(mysql为例) hive引擎执行时需要  

:::caution 注意
注意：hive spark的版本,如果和默认版本区别比较大，最好修改linkis maven依赖相关的hive/spark版本，然后重新进行编译
:::

## 2. 安裝
### 2.1 安装包解压
上传安装包`apache-linkis-1.0.3-incubating-bin.tar.gz`后，进行解压安装包 

```shell script
$ tar -xvf apache-linkis-1.0.3-incubating-bin.tar.gz
$ pwd
/data/Install/1.0.3
```

解压后的目录结构如下
```shell script
-rw-r--r-- 1 hadoop hadoop 531847342 Feb 21 10:10 apache-linkis-1.0.3-incubating-bin.tar.gz
drwxrwxr-x 2 hadoop hadoop      4096 Feb 21 10:13 bin  //执行环境检查和安装的脚本
drwxrwxr-x 2 hadoop hadoop      4096 Feb 21 10:13 deploy-config // 部署时依赖的DB等环境配置信息
-rw-r--r-- 1 hadoop hadoop      1707 Jan 22  2020 DISCLAIMER-WIP
-rw-r--r-- 1 hadoop hadoop     66058 Jan 22  2020 LICENSE
drwxrwxr-x 2 hadoop hadoop     16384 Feb 21 10:13 licenses
drwxrwxr-x 7 hadoop hadoop      4096 Feb 21 10:13 linkis-package // 实际的软件包，包括lib/服务启动脚本工具/db的初始化脚本/微服务的配置文件等
-rw-r--r-- 1 hadoop hadoop     83126 Jan 22  2020 NOTICE
-rw-r--r-- 1 hadoop hadoop      7900 Jan 22  2020 README_CN.md
-rw-r--r-- 1 hadoop hadoop      8184 Jan 22  2020 README.md

```

### 2.2 配置linkis自身数据库信息
```shell script
vim deploy-config/db.sh

示例:
MYSQL_HOST=xx.xx.xx.xx
MYSQL_PORT=3306
MYSQL_DB=linkis_test
MYSQL_USER=test
MYSQL_PASSWORD=xxxxx

```

### 2.3 配置基础环境变量

文件位于`deploy-config/linkis-env.sh`

#### 基础目录配置
>请确认部署用户deployUser，拥有这些配置目录的读写权限

```shell script
deployUser=hadoop #执行部署的用户，之前创建的用户hadoop

WORKSPACE_USER_ROOT_PATH=file:///tmp/linkis   # 指定用户使用的目录路径，一般用于存储用户的脚本文件和日志文件等，是用户的工作空间。 对应的配置文件配置项为  wds.linkis.filesystem.root.path(linkis.properties)

RESULT_SET_ROOT_PATH=file:///tmp/linkis   # 结果集日志等文件路径，用于存储Job的结果集文件  wds.linkis.resultSet.store.path(linkis-cg-entrance.properties) //如果未配置 使用HDFS_USER_ROOT_PATH的配置

HDFS_USER_ROOT_PATH=hdfs:///tmp/linkis   #  结果集日志等文件路径，用于存储Job的结果集文件  wds.linkis.filesystem.hdfs.root.path(linkis.properties)

ENGINECONN_ROOT_PATH=/appcom/tmp #存放执行引擎的工作路径，需要部署用户有写权限的本地目录   wds.linkis.engineconn.root.dir(linkis-cg-engineconnmanager.properties)
```
注意：确认部署用户是否有对应文件目录的读写的权限

#### HIVE的META配置
```shell script
HIVE_META_URL=jdbc:mysql://10.10.10.10:3306/hive_meta_demo?useUnicode=true&amp;characterEncoding=UTF-8 # HiveMeta元数据库的URL
HIVE_META_USER=demo   # HiveMeta元数据库的用户
HIVE_META_PASSWORD=demo123    # HiveMeta元数据库的密码
```

#### Yarn的ResourceManager的地址

```shell script

#可以通过访问http://xx.xx.xx.xx:8088/ws/v1/cluster/scheduler 接口确认是否正常
YARN_RESTFUL_URL=http://xx.xx.xx.xx:8088 
```
执行spark任务时，需要使用到yarn的ResourceManager，linkis默认它是未开启权限验证的，如果ResourceManager开启了密码权限验证，请安装部署后，修改`linkis_cg_engine_conn_plugin_bml_resources`表数据(或则参见[检查引擎物料资源是否上传成功](#6-检查引擎物料资源是否上传成功))

#### LDAP 登录验证
>linkis默认是使用静态用户和密码,静态用户即部署用户，静态密码会在执行部署是随机生成一个密码串，存储于{InstallPath}/conf/linkis-mg-gateway.properties(>=1.0.3版本)。
```shell script
#LDAP配置，默认Linkis只支持部署用户登录，如果需要支持多用户登录可以使用LDAP，需要配置以下参数：
#LDAP_URL=ldap://localhost:1389/
#LDAP_BASEDN=dc=webank,dc=com
```


#### 基础组件环境信息 
> 最好通过用户的系统环境变量配置(步骤 1.2 添加部署用户已说明), deploy-config/linkis-env.sh配置文件中可以不进行配置 直接注释掉
```shell script
###HADOOP CONF DIR
#HADOOP_CONF_DIR=/appcom/config/hadoop-config
###HIVE CONF DIR
#HIVE_CONF_DIR=/appcom/config/hive-config
###SPARK CONF DIR
#SPARK_CONF_DIR=/appcom/config/spark-config
```

#### 引擎版本信息 
:::caution 注意
如果使用的官方发布包 无需修改，如果是有自行修改Hive/Spark引擎版本编译的，需要修改。
:::
如果spark不是2.4.3的版本，需要修改参数：
```shell script
## Engine version conf
#SPARK_VERSION，如果安装的Spark版本不是2.4.3，则需要修改为相应的版本，如3.1.1
SPARK_VERSION=3.1.1
```
如果hive不是2.3.3的版本，需要修改参数：
```shell script
## Engine version conf
##HIVE_VERSION，如果安装的Hive版本不是2.3.3，则需要修改为相应的版本，如2.3.4
HIVE_VERSION=2.3.4
```
如果配置了，执行安装部署后，实际会在`{linkisInstallPath}/conf/linkis.properties`文件中被更新
```shell script
#wds.linkis.spark.engine.version=
#wds.linkis.hive.engine.version=
#wds.linkis.python.engine.version=
```

#### JVM内存配置
>微服务启动jvm内存配置，可以根据机器实际情况进行调整，如果机器内存资源较少，可以尝试调小至256/128M
```shell script
## java application default jvm memory
export SERVER_HEAP_SIZE="512M"
```

#### 安装目录配置

>linkis最终会被安装到此目录下，不配置默认是与当前安装包同一级目录下
>
```shell script
##The decompression directory and the installation directory need to be inconsistent
LINKIS_HOME=/appcom/Install/LinkisInstall
```

## 3. 部署流程

### 3.1 执行部署脚本 
```shell script
sh bin/install.sh
```
:::tip 注意
- 如果出现报错，又不清楚具体是执行什么命令报错，可以加 -v 参数`sh -v bin/install.sh`，将shell脚本执行过程日志打印出来，方便定位问题
- 权限问题:mkdir: cannot create directory ‘xxxx’: Permission denied,请确认部署用户是否拥有该路径的读写权限 
:::

### 3.2 可能遇到的问题  


执行成功提示如下:
`Congratulations! You have installed Linkis 1.0.3 successfully, please use sh /data/Install/linkis/sbin/linkis-start-all.sh to start it!  
Your default account password is [hadoop/5e8e312b4]`

### 3.3 配置的修改
安装完成后，如果需要修改配置，可以重新执行安装，或则修改对应${InstallPath}/conf/*properties文件，重启对应的服务

### 3.4 添加mysql驱动(>=1.0.3)版本 
因为license原因，linkis官方发布包中(dss集成的全家桶会包含，无需手动添加)移除了mysql-connector-java，需要手动添加  
具体参见[ 添加mysql驱动包](/docs/latest/deployment/deploy-quick#-44-添加mysql驱动包)

### 3.5 启动服务
```shell script
sh sbin/linkis-start-all.sh
```

### 3.6 检查服务是否正常启动 
访问eureka服务页面(http://eurekaip:20303)，1.0.x版本，以下服务是必须正常启动
```shell script
LINKIS-CG-ENGINECONNMANAGER
LINKIS-CG-ENGINEPLUGIN
LINKIS-CG-ENTRANCE
LINKIS-CG-LINKISMANAGER        
LINKIS-MG-EUREKA        
LINKIS-MG-GATEWAY
LINKIS-PS-CS
LINKIS-PS-PUBLICSERVICE
```
如果有服务未启动，可以在对应的log/${服务名}.log文件中查看详细异常日志。


## 4. 安装web前端
web端是使用nginx作为静态资源服务器的，访问请求流程是:
linkis管理台请求->nginx ip:port->linkis-gateway ip:port-> 其他服务

### 4.1 下载前端安装包并解压
tar -xvf apache-linkis-1.0.x-incubating-web-bin.tar.gz

### 4.2 修改配置config.sh
```shell script
#管理台访问的端口 http://localhost:8088
linkis_port="8088"

#linkis-mg-gateway服务地址
linkis_url="http://localhost:9020"
```

### 4.3 执行前端部署

```shell script
#nginx 需要sudo权限进行安装
sudo sh install.sh
```
安装后，linkis的nginx配置文件默认是 在/etc/nginx/conf.d/linkis.conf
nginx的日志文件在 /var/log/nginx/access.log 和/var/log/nginx/error.log
```nginx

        server {
            listen       8188;# 访问端口 如果端口被占用，则需要修改
            server_name  localhost;
            #charset koi8-r;
            #access_log  /var/log/nginx/host.access.log  main;
            location /linkis/visualis {
            root   /appcom/Install/linkis-web/linkis/visualis; # 静态文件目录 
            autoindex on;
            }
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

如果需要修改端口或则静态资源目录等，请修改/etc/nginx/conf.d/linkis.conf 文件后执行 `sudo nginx -s reload` 命令
:::caution 注意
- 目前暂未集成visualis功能，安装过程中如果提示安装linkis/visualis失败，可以忽略 
- 查看nginx是否正常启动：检查nginx进程是否存在 ps -ef |grep nginx 
- 检查nginx的配置是否正确 sudo nginx -T  
- 如果端口被占用，可以修改nginx启动的服务端口`/etc/nginx/conf.d/linkis.conf`listen端口值，保存后重新启动
- 如果访问管理台出现接口502，或则`Unexpected token < in JSON at position 0`异常，请确认linkis-mg-gateway是否正常启动，如果正常启动，查看nginx配置文件中配置的linkis-mg-gateway服务地址是否正确
:::

### 4.4 登录web端查看信息
http://xx.xx.xx.xx:8188/#/login
用户名/密码在{InstallPath}/conf/linkis-mg-gateway.properties中查看
```shell script
#未使用LDAP配置时
wds.linkis.admin.user= #用户
wds.linkis.admin.password= #密码

```
## 5 Yarn队列检查
>如果需要使用到spark/hive/flink引擎    

登录后查看能否正常显示yarn队列资源(点击页面右下角按钮)  
正常如下图所示:    
![yarn-normal](https://user-images.githubusercontent.com/7869972/159955494-2f305a38-a3d6-4798-83aa-58cde23bc436.png)

若如果无法显示：可以按以下指引调整 

### 5.1 查看yarn地址是否配置正确   
数据库表 linkis_cg_rm_external_resource_provider  
插入yarn数据信息  
```sql
INSERT INTO `linkis_cg_rm_external_resource_provider`
(`resource_type`, `name`, `labels`, `config`) VALUES
('Yarn', 'sit', NULL,
'{\r\n"rmWebAddress": "http://xx.xx.xx.xx:8088",\r\n"hadoopVersion": "2.7.2",\r\n"authorEnable":false,\r\n"user":"hadoop",\r\n"pwd":"123456"\r\n}'
);

config字段属性

"rmWebAddress": "http://xx.xx.xx.xx:8088",  #需要带上http以及端口
"hadoopVersion": "2.7.2",
"authorEnable":true, //是否需要认证 可以在浏览器中通过访问http://xx.xx.xx.xx:8088验证用户名和密码
"user":"user",//用户名
"pwd":"pwd"//密码

```
更新后，因为程序中有使用到缓存，想要立即生效，需要重启linkis-cg-linkismanager服务
```shell script
sh sbin/linkis-daemon.sh  restart cg-linkismanager
```

#### 5.2 查看yarn队列是否正确 
异常信息:`desc: queue ide is not exists in YARN.`
表明配置的yarn队列不存在，需要进行调整

修改方式:linkis管理台/参数配置>全局设置>yarn队列名[wds.linkis.rm.yarnqueue],修改一个可以使用的yarn队列,可以使用的yarn 队列可以在 rmWebAddress:http://xx.xx.xx.xx:8088/cluster/scheduler 上查看到  

#### 5.3 查看yarn队列    
- 查看hadoop集群地址: http://ip:8088/cluster  
- 查看yarn队列地址：http://ip:8888/cluster/scheduler  

## 6 检查引擎物料资源是否上传成功

```sql
#登陆到linkis的数据库 
select *  from linkis_cg_engine_conn_plugin_bml_resources
```

正常如下： 
![bml](https://user-images.githubusercontent.com/29391030/156343249-9f6dca8f-4e0d-438b-995f-4f469270a22d.png)

查看引擎的物料记录是否存在(如果有更新,查看更新时间是否正确)。
  
如果不存在或则未更新，先尝试手动刷新物料资源(详细见[引擎物料资源刷新](/docs/latest/deployment/install-engineconn#23-引擎刷新))。通过`log/linkis-cg-engineplugin.log`日志，查看物料失败的具体原因，很多时候可能是hdfs目录没有权限导致，检查gateway地址配置是否正确`conf/linkis.properties:wds.linkis.gateway.url`  

引擎的物料资源默认上传到hdfs目录为 `/apps-data/${deployUser}/bml`  
```shell script
hdfs dfs -ls /apps-data/hadoop/bml
#如果没有该目录 请手动创建目录并授予${deployUser}读写权限
hdfs dfs -mkdir  /apps-data
hdfs dfs -chown hadoop:hadoop   /apps-data
```

## 7 验证基础功能
```
#引擎的engineType 拼接的版本号，一定要与实际的相匹配

sh bin/linkis-cli -submitUser  hadoop  -engineType shell-1 -codeType shell  -code "whoami"
sh bin/linkis-cli -submitUser  hadoop  -engineType hive-2.3.3  -codeType hql  -code "show tables"
sh bin/linkis-cli -submitUser  hadoop  -engineType spark-2.4.3 -codeType sql  -code "show tables"
sh bin/linkis-cli -submitUser  hadoop  -engineType python-python2 -codeType python  -code 'print("hello, world!")'
```

## 8 查看支持的各个引擎的版本

### 8.1 方式1:查看引擎打包的目录
```
$ tree linkis-package/lib/linkis-engineconn-plugins/ -L 3
linkis-package/lib/linkis-engineconn-plugins/
├── hive
│   ├── dist
│   │   └── v2.3.3  #版本为2.3.3  engineType 为hive-2.3.3
│   └── plugin
│       └── 2.3.3
├── python
│   ├── dist
│   │   └── vpython2
│   └── plugin
│       └── python2 #版本为python2 engineType 为python-python2
├── shell
│   ├── dist
│   │   └── v1
│   └── plugin
│       └── 1
└── spark
    ├── dist
    │   └── v2.4.3
    └── plugin
        └── 2.4.3
```

### 8.2 方式2:查看linkis的数据库表
```shell script
select *  from linkis_cg_engine_conn_plugin_bml_resources
```



## <font color="red">9. 安装部署常见问题的排障</font>

### 9.0 登陆密码问题

      linkis默认是使用静态用户和密码,静态用户即部署用户，静态密码会在执行部署是随机生成一个密码串，存储于{InstallPath}/conf/linkis-mg-gateway.properties(>=1.0.3版本)
      
### 9.1 版本兼容性问题   

linkis默认支持的引擎，与dss兼容关系可以查看此文档 https://github.com/apache/incubator-linkis/blob/master/README.md   

### 9.2 如何定位服务端异常日志 

linkis的微服务比较多，若对系统不熟悉，有时候无法定位到具体哪个模块出现了异常，可以通过全局日志搜索方式  
```shell script
tail -f log/* |grep -5n exception(或则tail -f log/* |grep -5n ERROR)  
less log/* |grep -5n exception(或则less log/* |grep -5n ERROR)  
```


### 9.3 执行引擎任务的异常排查 

** step1:找到引擎的启动部署目录 **  
方式1：如果执行日志中有显示，可以在管理台上查看到 如下图:        
![engine-log](https://user-images.githubusercontent.com/29391030/156343802-9d47fa98-dc70-4206-b07f-df439b291028.png)
方式2:如果方式1中没有找到，可以通过找到`conf/linkis-cg-engineconnmanager.properties`配置的`wds.linkis.engineconn.root.dir`的参数，该值就是引擎启动部署的目录，子目录按执行引擎的用户进行了隔离。
```shell script
如果不清楚taskid，可以按时间排序后进行选择 ll -rt /appcom/tmp/${执行的用户}/workDir   
cd /appcom/tmp/${执行的用户}/workDir/${taskId}  
目录大体如下  
conf -> /appcom/tmp/engineConnPublickDir/6a09d5fb-81dd-41af-a58b-9cb5d5d81b5a/v000002/conf #引擎的配置文件  
engineConnExec.sh #生成的引擎的启动脚本  
lib -> /appcom/tmp/engineConnPublickDir/45bf0e6b-0fa5-47da-9532-c2a9f3ec764d/v000003/lib #引擎依赖的包  
logs #引擎启动执行的相关日志  
```
** step2：查看引擎的日志 **   
```shell script
less logs/stdout  
```

** step3：尝试手动执行脚本(如果需要) **  
可以通过尝试手动执行脚本，进行调试 
``` 
sh -v engineConnExec.sh  
```

### 9.4 CDH适配版本的注意事项 

CDH本身不是使用的官方标准的hive/spark包,进行适配时，最好修改linkis的源码中的hive/spark版本的依赖，进行重新编译部署。  
具体可以参考CDH适配博文    
[【Linkis1.0——CDH5环境中的安装与踩坑】](https://mp.weixin.qq.com/s/__QxC1NoLQFwme1yljy-Nw)  
[【DSS1.0.0+Linkis1.0.2——CDH5环境中的试用记录】](https://mp.weixin.qq.com/s/9Pl9P0hizDWbbTBf1yzGJA)  
[【DSS1.0.0与Linkis1.0.2——JDBC引擎相关问题汇总】](https://mp.weixin.qq.com/s/vcFge4BNiEuW-7OC3P-yaw)  
[【DSS1.0.0与Linkis1.0.2——Flink引擎相关问题汇总】](https://mp.weixin.qq.com/s/VxZ16IPMd1CvcrvHFuU4RQ)  

### 9.5 Http接口的调试  

- 方式1 可以开启[免登陆模式指引](/docs/latest/api/login-api/#2免登录配置)  
- 方式2 postman中的，请求头带上登陆成功的cookie值
cookie值可以在浏览器端登陆成功后，获取
![bml](https://user-images.githubusercontent.com/7869972/157619718-3afb480f-6087-4d5c-9a77-5e75c8cb4a3c.png)

```shell script
Cookie: bdp-user-ticket-id=xxxxxxxxxxxxxxxxxxxxxxxxxxx
```
- 方式3 http请求头添加静态的Token令牌  
Token在conf/token.properties进行配置 
如:TEST-AUTH=hadoop,root,user01
```shell script
Token-Code:TEST-AUTH
Token-User:hadoop
```

### 9.6 异常问题的排查流程  
首先要按上述步骤检查服务/环境等是否都正常启动  
按上述罗列的一些场景的方式进行基础问题的排查  
[QA文档](https://docs.qq.com/doc/DSGZhdnpMV3lTUUxq)中查找是否有解决方案，链接：https://docs.qq.com/doc/DSGZhdnpMV3lTUUxq  
通过搜索issue中的内容,看是否能找到解决方案        
![issues](https://user-images.githubusercontent.com/29391030/156343419-81cc25e0-aa94-4c06-871c-bb036eb6d4ff.png)    
通过官网文档搜索，对于某些问题，可以通过官网搜索关键字进行查询，比如搜索"部署"相关。(如果出现404,请浏览器中刷新一下)          
![search](https://user-images.githubusercontent.com/29391030/156343459-7911bd05-4d8d-4a7b-b9f8-35c152d52c41.png)  


## 10. 相关的资料如何获取 
linkis官网文档正在不断的完善,可以在本官网查看/关键字搜索相关文档。  
相关博文链接  
- Linkis的技术博文集  https://github.com/apache/incubator-linkis/issues/1233  
- 公众号技术博文https://mp.weixin.qq.com/mp/homepage?__biz=MzI4MDkxNzUxMg==&hid=1&sn=088cbf2bbed1c80d003c5865bc92ace8&scene=18  
- 官网文档 https://linkis.apache.org/zh-CN/docs/latest/introduction  
- bili技术分享视频 https://space.bilibili.com/598542776?spm_id_from=333.788.b_765f7570696e666f.2  



