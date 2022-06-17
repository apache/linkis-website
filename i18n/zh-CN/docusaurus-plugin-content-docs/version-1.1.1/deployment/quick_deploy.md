---
title: 快速部署
sidebar_position: 1
---

## 1. 注意事项

<font color="red">

因为mysql-connector-java驱动是GPL2.0协议，不满足Apache开源协议关于license的政策，因此从1.0.3版本开始，提供的Apache版本官方部署包，默认是没有mysql-connector-java-x.x.x.jar的依赖包，安装部署时需要添加依赖到对应的lib包中。

安装过程中遇到的问题，可以参考[排障指引](https://linkis.apache.org/zh-CN/blog/2022/02/21/linkis-deploy)  https://linkis.apache.org/zh-CN/blog/2022/02/21/linkis-deploy

</font>


**如果您已经是 Linkis 的使用用户，安装或升级前建议先阅读：[Linkis1.0 与 Linkis0.X 的区别简述](architecture/difference_between_1.0_and_0.x.md)**。

请注意：除了 Linkis1.0 安装包默认已经包含的：Python/Shell/Hive/Spark四个EngineConnPlugin以外，如果大家有需要，可以手动安装如 JDBC 引擎等类型的其他引擎，具体请参考 [EngineConnPlugin引擎插件安装文档](../deployment/engine_conn_plugin_installation)。

Linkis1.0.3 默认已适配的引擎列表如下：

| 引擎类型          | 适配情况       | 官方安装包是否包含 |
|---------------|------------|---|
| Python        | 1.0已适配     | 包含 |
| JDBC          | 1.0已适配     | **不包含** |
| Flink         | 1.0已适配     | **不包含** |
| OpenLooKeng   | 1.1.1已适配   | **不包含** |
| Shell         | 1.0已适配     | 包含 |
| Hive          | 1.0已适配     | 包含 |
| Spark         | 1.0已适配     | 包含 |
| Pipeline      | 1.0已适配     | **不包含** |
| Presto        | **1.0未适配** | **不包含** |
| ElasticSearch | **1.0未适配** | **不包含** |
| Impala        | **1.0未适配** | **不包含** |
| MLSQL         | **1.0未适配** | **不包含** |
| TiSpark       | **1.0未适配** | **不包含** |

## 2. 确定您的安装环境
这里给出每个引擎的依赖信息列表：

| 引擎类型 | 依赖环境 | 特殊说明 |
|---|---|---|
| Python| Python环境 | 日志和结果集如果配置hdfs://则依赖HDFS环境|
| JDBC| 可以无依赖 | 日志和结果集路径如果配置hdfs://则依赖HDFS环境 |
| Shell| 可以无依赖 | 日志和结果集路径如果配置hdfs://则依赖HDFS环境 |
| Hive| 依赖Hadoop和Hive环境 |  |
| Spark| 依赖Hadoop/Hive/Spark |  |

**要求：安装Linkis需要至少3G内存。**

默认每个微服务JVM堆内存为512M，可以通过修改`SERVER_HEAP_SIZE`来统一调整每个微服务的堆内存，如果您的服务器资源较少，我们建议修改该参数为128M。如下：

```bash
    vim ${LINKIS_HOME}/deploy-config/linkis-env.sh
```

```bash
    # java application default jvm memory.
    export SERVER_HEAP_SIZE="128M"
```

----

## 3. Linkis环境准备

### 3.1 基础软件安装

下面的软件必装：

- MySQL (5.5+)，本地安装或者使用远程数据库都可以。[如何安装MySQL](https://www.runoob.com/mysql/mysql-install.html)
- JDK (1.8.0_141以上)，[如何安装JDK](https://www.runoob.com/java/java-environment-setup.html)


### 3.2 创建用户

例如: **部署用户是hadoop账号**

1. 在部署机器上创建部署用户，用于安装

```bash
    sudo useradd hadoop  
```
2. 因为Linkis的服务是以 sudo -u ${linux-user} 方式来切换引擎，从而执行作业，所以部署用户需要有 sudo 权限，而且是免密的。

```bash
    vi /etc/sudoers
```

```text
    hadoop  ALL=(ALL)       NOPASSWD: NOPASSWD: ALL
```

3. **在每台安装节点设置如下的全局环境变量，以便Linkis能正常使用Hadoop、Hive和Spark**。

   修改安装用户的.bash_rc，命令如下：

```bash     
    vim /home/hadoop/.bash_rc  ##以部署用户Hadoop为例
```

下方为环境变量示例：

```bash
    #JDK
    export JAVA_HOME=/nemo/jdk1.8.0_141

    ##如果不使用Hive、Spark等引擎且不依赖Hadoop，则不需要修改以下环境变量
    #HADOOP  
    export HADOOP_HOME=/appcom/Install/hadoop
    export HADOOP_CONF_DIR=/appcom/config/hadoop-config
    #Hive
    export HIVE_HOME=/appcom/Install/hive
    export HIVE_CONF_DIR=/appcom/config/hive-config
    #Spark
    export SPARK_HOME=/appcom/Install/spark
    export SPARK_CONF_DIR=/appcom/config/spark-config/
    export PYSPARK_ALLOW_INSECURE_GATEWAY=1  # Pyspark必须加的参数
```

4. **如果您的Pyspark和Python想拥有画图功能，则还需在所有安装节点，安装画图模块**。命令如下：

```bash
    python -m pip install matplotlib
```

5. **底层依赖检查**

执行相应的命令，查看是否支持相关依赖
```shell script
#spark/hive/hdfs/python/的校验
$ spark-submit --version 
$ python --version
$ hdfs  version
$ hive --version

```


### 3.3 安装包准备

从Linkis已发布的release中（[点击这里进入下载页面](https://linkis.apache.org/zh-CN/download/main)），下载最新的安装包。

先解压安装包到安装目录，并对解压后的文件进行配置修改。

```bash   
    #version >=1.0.3
    tar -xvf  apache-linkis-x.x.x-incubating-bin.tar.gz
```


### 3.4 依赖HDFS/Hive/Spark的基础配置修改

```bash
     vi deploy-config/linkis-env.sh
```

```properties
   
    deployUser=hadoop      #指定部署用户
    WORKSPACE_USER_ROOT_PATH=file:///tmp/hadoop    # 指定用户根目录，一般用于存储用户的脚本文件和日志文件等，是用户的工作空间。
    RESULT_SET_ROOT_PATH=hdfs:///tmp/linkis   # 结果集文件路径，用于存储Job的结果集文件
    ENGINECONN_ROOT_PATH=/appcom/tmp #存放ECP的安装路径，需要部署用户有写权限的本地目录
    ENTRANCE_CONFIG_LOG_PATH=hdfs:///tmp/linkis/  #ENTRANCE的日志路径

    #因为1.0支持多Yarn集群，使用到Yarn队列资源的一定需要配置YARN_RESTFUL_URL
    YARN_RESTFUL_URL=http://127.0.0.1:8088  #Yarn的ResourceManager的地址

    # 配置hadoop/hive/spark的配置目录 
    HADOOP_CONF_DIR=/appcom/config/hadoop-config  #hadoop的conf目录
    HIVE_CONF_DIR=/appcom/config/hive-config   #hive的conf目录
    SPARK_CONF_DIR=/appcom/config/spark-config #spark的conf目录

    ## LDAP配置，默认Linkis只支持部署用户登录，如果需要支持多用户登录可以使用LDAP，需要配置以下参数：
    #LDAP_URL=ldap://localhost:1389/ 
    #LDAP_BASEDN=
    
    ##如果spark不是2.4.3的版本需要修改参数：
    #SPARK_VERSION=3.1.1

    ##如果hive不是1.2.1的版本需要修改参数：
    #HIVE_VERSION=2.3.3
```

###  3.5 修改数据库配置

```bash   
    vi deploy-config/db.sh 
```

```properties    

    # 设置数据库的连接信息
    # 包括IP地址、数据库名称、用户名、端口
    # 主要用于存储用户的自定义变量、配置参数、UDF和小函数，以及提供JobHistory的底层存储
    MYSQL_HOST=
    MYSQL_PORT=
    MYSQL_DB=
    MYSQL_USER=
    MYSQL_PASSWORD=

    #主要是配合scriptis一起使用，如果不配置，会默认尝试通过$HIVE_CONF_DIR 中的配置文件获取
    HIVE_META_URL=    # HiveMeta元数据库的URL
    HIVE_META_USER=   # HiveMeta元数据库的用户
    HIVE_META_PASSWORD=    # HiveMeta元数据库的密码
 ```

### 3.6 检查需要的软件环境

```bash   
    sh bin/checkEnv.sh 
```

## 4. 安装和启动

### 4.1 执行安装脚本：

```bash
    sh bin/install.sh
```
>linkis默认是使用静态用户和密码,静态用户即部署用户，静态密码会在执行部署是随机生成一个密码串，存储于`{installPath}/conf/linkis-mg-gateway.propertie`(>=1.0.3版本)

### 4.2 安装步骤

install.sh脚本会询问您是否需要初始化数据库并导入元数据。

因为担心用户重复执行install.sh脚本，把数据库中的用户数据清空，所以在install.sh执行时，会询问用户是否需要初始化数据库并导入元数据。

**第一次安装**必须选是。

**请注意：如果您是升级已有环境的 Linkis0.X 到 Linkis1.0，请不要直接选是，请先参考 [Linkis1.0升级指南](upgrade/upgrade_from_0.X_to_1.0_guide.md)**。

**请注意：如果您是升级已有环境的 Linkis0.X 到 Linkis1.0，请不要直接选是，请先参考 [Linkis1.0升级指南](upgrade/upgrade_from_0.X_to_1.0_guide.md)**。

**请注意：如果您是升级已有环境的 Linkis0.X 到 Linkis1.0，请不要直接选是，请先参考 [Linkis1.0升级指南](upgrade/upgrade_from_0.X_to_1.0_guide.md)**。

### 4.3 是否安装成功：

通过查看控制台打印的日志信息查看是否安装成功。

如果有错误信息，可以查看具体报错原因。

您也可以通过查看我们的[常见问题](https://docs.qq.com/doc/DSGZhdnpMV3lTUUxq)，获取问题的解答。

### <font color="red"> 4.4 添加mysql驱动包</font>

:::caution 注意
因为mysql-connector-java驱动是GPL2.0协议，不满足Apache开源协议关于license的政策，因此从1.0.3版本开始，提供的Apache版本官方部署包，默认是没有mysql-connector-java-x.x.x.jar的依赖包，安装部署时需要自行添加依赖到对应的lib包中
:::

下载mysql驱动 以5.1.49版本为例：[下载链接](https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.49/mysql-connector-java-5.1.49.jar) https://repo1.maven.org/maven2/mysql/mysql-connector-java/5.1.49/mysql-connector-java-5.1.49.jar

拷贝mysql 驱动包至lib包下
```
cp mysql-connector-java-5.1.49.jar  {LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/
cp mysql-connector-java-5.1.49.jar  {LINKIS_HOME}/lib/linkis-commons/public-module/
```


### 4.5 快速启动Linkis

**注意** 如果您用的DSS或者其他项目依赖的Linkis版本<1.1.1，还需要修改位于`${LINKIS_HOME}/conf/linkis.properties`文件：
```shell
echo "wds.linkis.session.ticket.key=bdp-user-ticket-id" >> linkis.properties
```

#### 4.5.1 启动服务：

在安装目录执行以下命令，启动所有服务：

```bash  
  sh sbin/linkis-start-all.sh
```

#### 4.5.2 查看是否启动成功

可以在Eureka界面查看服务启动成功情况，查看方法：

使用http://${EUREKA_INSTALL_IP}:${EUREKA_PORT}, 在浏览器中打开，查看服务是否注册成功。

如果您没有在linkis-env.sh指定EUREKA_INSTALL_IP和EUREKA_INSTALL_IP，则HTTP地址为：http://127.0.0.1:20303

如下图，如您的Eureka主页出现以下微服务，则表示服务都启动成功，可以正常对外提供服务了：

默认会启动8个Linkis微服务，其中图下linkis-cg-engineconn服务为运行任务才会启动

![Linkis1.0_Eureka](/Images-zh/deployment/Linkis1.0_combined_eureka.png)

默认启动的微服务名称如下：
 ```
├── linkis-cg-engineconnmanager 引擎管理服务  
├── linkis-cg-engineplugin 引擎插件管理服务  
├── linkis-cg-entrance 计算治理入口服务  
├── linkis-cg-linkismanager 计算治理管理服务  
├── linkis-mg-eureka 微服务注册中心服务  
├── linkis-mg-gateway Linkis网关服务  
├── linkis-ps-cs 上下文服务 
├── linkis-ps-publicservice 公共服务 
 ```
#### 4.5.3 查看服务是否正常
1. 服务启动成功后您可以通过，安装前端管理台，来检验服务的正常性，[点击跳转管理台安装文档](web_install.md)
2. 您也可以通过Linkis用户手册来测试Linkis是否能正常运行任务，[点击跳转用户手册](user_guide/overview.md)

### 4.5 安装web前端
web端是使用nginx作为静态资源服务器的，访问请求流程是:
linkis管理台请求->nginx ip:port->linkis-gateway ip:port-> 其他服务

#### 4.5.1 下载前端安装包并解压
tar -xvf apache-linkis-1.0.x-incubating-web-bin.tar.gz

#### 4.5.2 修改配置config.sh
```shell script
#管理台访问的端口 http://localhost:8088
linkis_port="8088"

#linkis-mg-gateway服务地址
linkis_url="http://localhost:9020"
```

#### 4.5.3 执行前端部署

```shell script
sudo sh install
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

#### 4.5.4 登录web端查看信息
http://xx.xx.xx.xx:8188/#/login
用户名/密码在{InstallPath}/conf/linkis-mg-gateway.properties中查看
```shell script
#未使用LDAP配置时
wds.linkis.admin.user= #用户
wds.linkis.admin.password= #密码

```

## 5. Yarn队列检查
>如果需要使用到spark/hive/flink引擎

登录后查看能否正常显示yarn队列资源(点击页面右下角按钮)(需要先安装前端)  
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

### 5.2 查看yarn队列是否正确
异常信息:`desc: queue ide is not exists in YARN.`
标明配置的yarn队列不存在，需要进行调整

修改方式:linkis管理台/参数配置>全局设置>yarn队列名[wds.linkis.rm.yarnqueue],修改一个可以使用的yarn队列,可以使用的yarn 队列可以在 rmWebAddress:http://xx.xx.xx.xx:8088/cluster/scheduler 上查看到

### 5.3 查看yarn队列
- 查看hadoop集群地址: http://ip:8088/cluster
- 查看yarn队列地址：http://ip:8888/cluster/scheduler

## 6. 检查引擎物料资源是否上传成功

```sql
#登陆到linkis的数据库 
select *  from linkis_cg_engine_conn_plugin_bml_resources
```

正常如下：
![bml](https://user-images.githubusercontent.com/29391030/156343249-9f6dca8f-4e0d-438b-995f-4f469270a22d.png)

查看引擎的物料记录是否存在(如果有更新,查看更新时间是否正确)。

如果不存在或则未更新，先尝试手动刷新物料资源(详细见[引擎物料资源刷新](docs/latest/deployment/engine_conn_plugin_installation#23-引擎刷新))。通过`log/linkis-cg-engineplugin.log`日志，查看物料失败的具体原因，很多时候可能是hdfs目录没有权限导致，检查gateway地址配置是否正确`conf/linkis.properties:wds.linkis.gateway.url`

引擎的物料资源默认上传到hdfs目录为 `/apps-data/${deployUser}/bml`
```shell script
hdfs dfs -ls /apps-data/hadoop/bml
#如果没有该目录 请手动创建目录并授予${deployUser}读写权限
hdfs dfs -mkdir  /apps-data
hdfs dfs -chown hadoop:hadoop   /apps-data
```

## 7. 验证基础功能
```
#引擎的engineType 拼接的版本号，一定要与实际的相匹配

sh bin/linkis-cli -submitUser  hadoop  -engineType shell-1 -codeType shell  -code "whoami"
sh bin/linkis-cli -submitUser  hadoop  -engineType hive-2.3.3  -codeType hql  -code "show tables"
sh bin/linkis-cli -submitUser  hadoop  -engineType spark-2.4.3 -codeType sql  -code "show tables"
sh bin/linkis-cli -submitUser  hadoop  -engineType python-python2 -codeType python  -code 'print("hello, world!")'
```

## 8. 修改注册中心eureka的端口
有时候当eureka的端口被其他服务占用,无法使用默认的eureka端口的时候,需要对eureka端口进行修改,这里把对eureka端口的修改分为执行安装之前和执行安装之后两种情况。
1.执行安装之前修改注册中心eureka端口
```
1. 进入apache-linkis-x.x.x-incubating-bin.tar.gz的解压目录
2. 执行 vi deploy-config/linkis-env.sh
3. 修改EUREKA_PORT=20303为EUREKA_PORT=端口号
```
2.执行安装之后修改注册中心eureka端口  
```
1. 进入${linkis_home}/conf目录
2. 执行grep -r 20303 ./* ,查询结果如下所示:
      ./application-eureka.yml:  port: 20303
      ./application-eureka.yml:      defaultZone: http://ip:20303/eureka/
      ./application-linkis.yml:      defaultZone: http://ip:20303/eureka/
      ./linkis-env.sh:EUREKA_PORT=20303
      ./linkis.properties:wds.linkis.eureka.defaultZone=http://ip:20303/eureka/
3. 将对应位置的端口修改为新的端口,并且重启所有服务sh restart sbin/linkis-start-all.sh
```

## <font color="red">9. 安装部署常见问题的排障</font>

### 9.1 登陆密码问题

      linkis默认是使用静态用户和密码,静态用户即部署用户，静态密码会在执行部署是随机生成一个密码串，存储于{InstallPath}/conf/linkis-mg-gateway.properties(>=1.0.3版本)

### 9.2 版本兼容性问题

linkis默认支持的引擎，与dss兼容关系可以查看此文档 https://github.com/apache/incubator-linkis/blob/master/README.md

### 9.3 如何定位服务端异常日志

linkis的微服务比较多，若对系统不熟悉，有时候无法定位到具体哪个模块出现了异常，可以通过全局日志搜索方式
```shell script
tail -f log/* |grep -5n exception(或则tail -f log/* |grep -5n ERROR)  
less log/* |grep -5n exception(或则less log/* |grep -5n ERROR)  
```


### 9.4 执行引擎任务的异常排查

** step1:找到引擎的启动部署目录 **  
方式1：如果执行日志中有显示，可以在管理台上查看到 如下图:        
![engine-log](https://user-images.githubusercontent.com/29391030/156343802-9d47fa98-dc70-4206-b07f-df439b291028.png)
方式2:如果方式1中没有找到，可以通过找到`conf/linkis-cg-engineconnmanager.properties`配置的`wds.linkis.engineconn.root.dir`的参数，该值就是引擎启动部署的目录，子目录按执行引擎的用户进行了隔离。
```shell script
如果不清楚taskid，可以按时间排序后进行选择 ll -rt /appcom/tmp/${执行的用户}/${日期}/${引擎}/  
cd /appcom/tmp/${执行的用户}/${日期}/${引擎}/${taskId}  
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

### 9.5 CDH适配版本的注意事项

CDH本身不是使用的官方标准的hive/spark包,进行适配时，最好修改linkis的源码中的hive/spark版本的依赖，进行重新编译部署。  
具体可以参考CDH适配博文    
[【Linkis1.0——CDH5环境中的安装与踩坑】](https://mp.weixin.qq.com/s/__QxC1NoLQFwme1yljy-Nw)  
[【DSS1.0.0+Linkis1.0.2——CDH5环境中的试用记录】](https://mp.weixin.qq.com/s/9Pl9P0hizDWbbTBf1yzGJA)  
[【DSS1.0.0与Linkis1.0.2——JDBC引擎相关问题汇总】](https://mp.weixin.qq.com/s/vcFge4BNiEuW-7OC3P-yaw)  
[【DSS1.0.0与Linkis1.0.2——Flink引擎相关问题汇总】](https://mp.weixin.qq.com/s/VxZ16IPMd1CvcrvHFuU4RQ)

### 9.6 Http接口的调试

- 方式1 可以开启[免登陆模式指引](/docs/latest/api/login_api/#2免登录配置)
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

### 9.7 异常问题的排查流程
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


