---
title: Linkis 部署排障
---
> linkis的单独部署说明和注意点

## 1 前置准备

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

部署用户: linkis核心进程的启动用户，同时默认还是admin管理员用户，部署过程中会生成对应的管理员登录密码，位于conf/gateway/properties文件中

linkis支持指定提交、执行的用户。linkis的主要进程服务会通过sudo -u  ${linkis-user} 切换到对应的执行用户，在执行对应的引擎启动命令，所以引擎进程linkis-engine的进程用户是归属于任务的执行所有者user

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
export PYSPARK_ALLOW_INSECURE_GATEWAY=1  # 如果是Pyspark，则必须加次参数
```

刷新配置
```shell script
$ source /home/hadoop/.bash_rc
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
0.X 和1.X的版本差异化比较大，
1.0.3前是com.webank.wedatasphere.linkis的包名，linkis>=1.0.3为org.apache.linkis的包名

[下载地址](https://github.com/apache/incubator-linkis/releases):https://github.com/apache/incubator-linkis/releases


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
可以访问的mysql数据库资源 用来存储linkis自身的业务元数据的数据库
可以访问的yarn资源队列 spark/hive/flink引擎的执行都需要yarn队列资源
可以访问的hive的matedata数据库资源(mysql为例) hive引擎执行时需要

:::caution 注意
注意hive spark的版本,如果和默认版本区别比较大，最好重新修改版本进行编译
:::

## 2. 安裝
### 2.1  安装包解压
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
文件位置`deploy-config/linkis-env.sh`

#### 基础目录配置
>请确认部署用户deployUser，拥有这些配置目录的读写权限

```shell script
deployUser=hadoop #执行部署的用户，之前创建的用户hadoop

WORKSPACE_USER_ROOT_PATH=file:///tmp/linkis   # 指定用户使用的目录路径，一般用于存储用户的脚本文件和日志文件等，是用户的工作空间。 对应的配置文件配置项为  wds.linkis.filesystem.root.path(linkis.properties)

RESULT_SET_ROOT_PATH=file:///tmp/linkis   # 结果集日志等文件路径，用于存储Job的结果集文件  wds.linkis.resultSet.store.path(linkis-cg-entrance.properties) //如果未配置 使用HDFS_USER_ROOT_PATH的配置

HDFS_USER_ROOT_PATH=hdfs:///tmp/linkis   #  结果集日志等文件路径，用于存储Job的结果集文件  wds.linkis.filesystem.hdfs.root.path(linkis.properties)

ENGINECONN_ROOT_PATH=/appcom/tmp #存放执行引擎的工作路径，需要部署用户有写权限的本地目录   wds.linkis.engineconn.root.dir(linkis-cg-engineconnmanager.properties)
```
:::notice 注意 
确认部署用户是否有对应文件目录的读写的权限
 
:::
#### HIVE的MATA配置
```shell script
HIVE_META_URL=jdbc:mysql://10.10.10.10:3306/hive_meta_demo?useUnicode=true&amp;characterEncoding=UTF-8 # HiveMeta元数据库的URL
HIVE_META_USER=demo   # HiveMeta元数据库的用户
HIVE_META_PASSWORD=demo123    # HiveMeta元数据库的密码
```

#### Yarn的ResourceManager的地址

```shell script

YARN_RESTFUL_URL=http://xx.xx.xx.xx:8088  #可以通过访问http://xx.xx.xx.xx:8088/ws/v1/cluster/scheduler 接口确认是否正常

```


#### LDAP 登录验证
>linkis默认是使用静态用户和密码,静态用户即部署用户，静态密码会在执行部署是随机生成一个密码串，存储于conf/gateway/properties(>=1.0.3版本)。
```shell script
#LDAP配置，默认Linkis只支持部署用户登录，如果需要支持多用户登录可以使用LDAP，需要配置以下参数：
#LDAP_URL=ldap://localhost:1389/
#LDAP_BASEDN=dc=webank,dc=com
```


#### 基础组件环境信息 
> 最好通过环境变量配置(1.2 添加部署用户中已说明), deploy-config/linkis-env.sh配置文件中可以不进行配置 直接注释掉
```shell script
###HADOOP CONF DIR
#HADOOP_CONF_DIR=/appcom/config/hadoop-config
###HIVE CONF DIR
#HIVE_CONF_DIR=/appcom/config/hive-config
###SPARK CONF DIR
#SPARK_CONF_DIR=/appcom/config/spark-config
```

#### 引擎版本信息 
```shell script
##如果spark不是2.4.3的版本(可以在linkis-package/lib/linkis-engineconn-plugins/hive/plugin中查看引擎版本)，需要修改参数：
#SPARK_VERSION=3.1.1

##如果hive不是2.3.3的版本，需要修改参数：
#HIVE_VERSION=2.3.4
```
如果配置了，执行安装部署后，实际会在`{linkisInstallPath}/conf/linkis.properties`中被更新，供程序使用
```shell script
#wds.linkis.spark.engine.version=
#wds.linkis.hive.engine.version=
#wds.linkis.python.engine.version=
```

#### jvm内存配置
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

## 部署流程
执行部署脚本 
sh bin/install.sh

可能遇到的问题
1. 权限问题 mkdir: cannot create directory ‘xxxx’: Permission denied
执行成功提示如下
Congratulations! You have installed Linkis 1.0.3 successfully, please use sh /data/Install/linkis/sbin/linkis-start-all.sh to start it!
Your default account password ishadoop/5e8e312b4

#安装完成后，如果需要修改配置，可以重新执行安装，或则修改对应${InstallPath}/conf/*properties文件，重启对应的服务


## 添加mysql驱动(>=1.0.3)版本 
   todo
## 启动服务
   todo 


## 安装web前端
>主要进行YARN的相关配置

下载前端安装包并解压
tar -xvf apache-linkis-1.0.3-incubating-web-bin.tar.gz

修改配置config.sh
```shell script
#管理台访问的端口 http://localhost:8088
linkis_port="8088"

#linkis-mg-gateway服务地址
linkis_url="http://localhost:9020"
```

执行前端部署

```shell script

sudo sh install
```
安装后，linkis的nginx配置文件默认是 在/etc/nginx/conf.d/linkis.conf
nginx的日志文件在 /var/log/nginx/access.log 和/var/log/nginx/error.log
```nginx

        server {
            listen       8188;# 访问端口
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

如果需要修改端口或则静态资源目录等 请修改/etc/nginx/conf.d/linkis.conf后执行 sudo nginx -s reload 命令

登录web端查看信息
http://xx.xx.xx.xx:8188/#/login
用户名/密码(在{InstallPath}/conf/linkis-mg-gateway.properties中查看)

```shell script
#未使用LDAP配置时
wds.linkis.admin.user= #用户
wds.linkis.admin.password= #密码
```



登录后查看能否正常显示yarn队列资源(如果要使用spark/hive/flink引擎)
正常如下图所示:
![img](./img/yarn-normal.png)

如果无法显示：
1 查看yarn地址是否配置正确 
数据库表 linkis_cg_rm_external_resource_provider
插入yarn数据信息
```sql
INSERT INTO `linkis_cg_rm_external_resource_provider`
(`resource_type`, `name`, `labels`, `config`) VALUES
('Yarn', 'sit', NULL,
'{\r\n"rmWebAddress": "http://172.21.193.21:8088",\r\n"hadoopVersion": "2.7.2",\r\n"authorEnable":false,\r\n"user":"hadoop",\r\n"pwd":"123456"\r\n}'
);

config字段属性

"rmWebAddress": "http://xx.xx.xx.xx:8088",  #需要带上http以及端口
"hadoopVersion": "2.7.2",
"authorEnable":true, //是否需要认证 可以在浏览器中通过访问http://xx.xx.xx.xx:8088验证用户名和密码
"user":"user",//用户名
"pwd":"pwd"//密码

```
更新后，因为程序中有使用到guava缓存，需要重启linkis-cg-linkismanager 服务

sh sbin/linkis-daemon.sh  restart cg-linkismanager

2 查看yarn队列是否正确 
异常信息:desc: queue ide is not exists in YARN.
配置yarn队列不存在，需要调整

修改方式:linkis管理台/参数配置>全局设置>yarn队列名[wds.linkis.rm.yarnqueue]  修改一个可以使用的yarn队列
可以使用的yarn 队列可以在 rmWebAddress:http://xx.xx.xx.xx:8088 上查看到

## 查看引擎物料资源是否上传成功

select *  from linkis_cg_engine_conn_plugin_bml_resources
查看引擎的物料记录是够存在(如果有更新 查看更新时间是够真确)，如果不存在或则未更新，查看log/linkis-cg-engineplugin.log日志，查看物料失败的具体原因，很多时候可能是hdfs目录没有权限导致

引擎的物料资源默认上传到hdfs目录为 /apps-data/${deployUser}/bml

hdfs dfs -ls /apps-data/hadoop/bml
如果没有该目录 请手动创建目录并授予${deployUser}读写权限
hdfs dfs -mkdir  /apps-data
hdfs dfs -chown hadoop:hadoop   /apps-data



##验证基础功能
```
sh bin/linkis-cli -submitUser  hadoop  -engineType shell-1 -codeType shell  -code "whoami"
sh bin/linkis-cli -submitUser  hadoop  -engineType hive-2.3.3  -codeType hql  -code "show tables"
sh bin/linkis-cli -submitUser  hadoop  -engineType spark-2.4.3 -codeType sql  -code "show tables"
sh bin/linkis-cli -submitUser  hadoop  -engineType python-python2 -codeType python  -code 'print("hello, world!")'
```


查看各个引擎的版本

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

安装部署常见问题Q&A
1. 版本兼容性问题 
   linkis/dss兼容关系 
   
2. 如何查看定位异常日志
    linkis的微服务比较多，有时候无法定位到具体哪里出现了异常，可以通过
    tail -f log/* |grep -5N exception(或则tail -f log/* |grep -5N ERROR)


相关博文链接
     //todo
     https://github.com/apache/incubator-linkis/issues/1233  以及linkis公众号文章
    【apache incubator-linkis编译笔记】http://utopianet.synology.me:56041/wordpress/?p=46
    【apache incubator-linkis安装部署】http://utopianet.synology.me:56041/wordpress/?p=50




