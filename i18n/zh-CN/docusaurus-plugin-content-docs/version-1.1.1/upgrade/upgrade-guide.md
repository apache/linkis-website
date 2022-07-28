---
title: 1.0.3以上的版本升级
sidebar_position: 2
---

> 本文简单介绍1.0.3以上的版本的升级大体流程 


## 1 升级说明

- 如果是第一次安装使用 Linkis，或重装 Linkis，无需关注 Linkis 升级指南。
- 如果涉及到其他平台的组件（DataSphereStudio/Qualitis/Visualis等），升级前，请确认版本之间的兼容性，最好使用推荐的版本，可参考 https://github.com/apache/incubator-linkis#ecosystem。
- 建议通过软链方式来进行版本管控，可以通过修改软链的目标地址 来切换版本 如:`linkis -> /appcom/Install/LinkisInstall/linkis-1.1.3.20220615210213` 
- 升级过程主要是需要关注数据库表结构的调整和部分配置参数的调整 
- 除了后端服务的升级，linkis的管理台资源也需要一并升级  
- 每个版本的主要变动点 可以查阅版本的总览信息`https://linkis.apache.org/zh-CN/docs/x.x.x /release` 以及版本的[Release-Note](https://linkis.apache.org/zh-CN/download/main):https://linkis.apache.org/zh-CN/download/main
- 每个版本的数据库变化/配置参数变化 都是基于上一个版本

## 2 服务升级安装

按[部署指引文档](../deployment/quick-deploy)（文档中关于管理台的安装可以跳过），进行新版本的安装。

安装服务时，如果历史数据保留，请保留历史数据，如果无需保留数据，直接重装即可，也无需关注升级流程
```shell script
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 1
```

## 3. 数据库表升级
>服务安装完成后，需要对数据库进行结构修改，包括进行表结构变更和表数据变更 
 3

找到对应的版本`db/upgrade/x.x.x-schema/` sql变动文件

如果是跨多个版本执行，请按版本顺序，依次执行，
如果某些版本没有x.x.x_schema(linkis>=1.1.0版本后，只要涉及到数据库表的调整，都会有对应版本的schema文件),则表示该版本没有数据表的变化 

:::caution 注意
执行upgrade下的1.1.1_schema中的ddl升级脚本,如若执行到linkis_cg_rm_resource_action_record相关的错误,请检查创建该表的语句是否缺少ENGINE=InnoDB DEFAULT CHARSET=utf8;   如果缺少,请加上再执行
:::

```shell script
├── linkis_ddl.sql # 当前版本的全量ddl 数据库定义语言 建表语句 
├── linkis_dml.sql # 当前版本的全量dml 数据操纵语言   数据的增改
└── upgrade
    ├── 1.1.0_schema   # 对应版本的sql
    │   └── mysql
    │       ├── linkis_ddl.sql
    │       └── linkis_dml.sql
    ├── 1.1.1_schema
    │   └── mysql
    │       ├── linkis_ddl.sql
    │       └── linkis_dml.sql
    └── 1.1.3_schema
        └── mysql
            └── linkis_ddl.sql
```

```mysql-sql
    #如果是跨多个版本执行，请按版本顺序，依次执行 先执行ddl 再执行dml 
    #比如当前从linkis-1.0.3 升级到linkis-1.1.2 
    source upgrade/1.1.0_schema/mysql/linkis_ddl.sql
    source upgrade/1.1.0_schema/mysql/linkis_dml.sql

    source upgrade/1.1.1_schema/mysql/linkis_ddl.sql
    source upgrade/1.1.1_schema/mysql/linkis_dml.sql

```
## 4 数据的调整(可选)
>按实际情况，决定是否需要做如下调整 

### 4.1 TOKEN 配置 
> 用于接口调用时的认证

1.1.1 版本调整将原来的TOKEN配置从`${LINKIS_HOME}/conf/token.properties`迁移到数据库表`linkis_mg_gateway_auth_token`,
对于原来在`token.properties`额外配置的TOKEN，需要手动迁移表中

### 4.2 UDF 调整 
1.1.1 中支持支持UDF多版本控制、UDF存储到BML的功能特性，UDF函数存储的表结构有调整，UDF的历史数据，需要单独进行迁移 

### 4.3 Session 字段key配置 

1.1.1 版本中调整了session字段的key，从`bdp-user-ticket-id`-> 调整为 `linkis_user_session_ticket_id_v1`，
如果是对Linkis的升级。同时部署DSS或者其他项目，但他们服务lib包中，所依赖的Linkis的linkis-module-x.x.x.jar包 <1.1.1，则需要修改位于`${LINKIS_HOME}/conf/linkis.properties`文件
```shell
echo "wds.linkis.session.ticket.key=bdp-user-ticket-id" >> linkis.properties
```
### 4.4 默认队列的调整 
1.1.1 开始调整了yarn队列默认集群名`wds.linkis.rm.cluster` sit调整为default，如果一直使用的sit，请修改表数据 
`linkis_cg_rm_external_resource_provider`中的集群名 

###  4.5 其他相关包的拷贝 

如果之前老版本Linkis中`${LINKIS_HOME_OLD}/lib/linkis-engineconn-plugins`有安装第三方appconn插件，需要拷贝至新版本中，
最好通过软链链接到appconn路径上 
如:
```
#查看老版本是否有安装第三方appconn
cd ${LINKIS_HOME_OLD}/lib/linkis-engineconn-plugins/
ll
 appconn -> /appcom/Install/LinkisInstall/appconn


#新版本保持一致 
cd ${LINKIS_HOME}/lib/linkis-engineconn-plugins/ 
#软链
ln -snf  /appcom/Install/LinkisInstall/appconn  appconn 
```


如果原来版本有安装dss，需要拷贝原来包中的`dss-gateway-support-x.x.x.jar` 至linkis的`./lib/linkis-spring-cloud-services/linkis-mg-gateway/`目录下 
如:
```shell script
cp ${LINKIS_HOME_OLD}/lib/linkis-spring-cloud-services/linkis-mg-gateway/dss-gateway-support-1.1.3.jar ${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis-mg-gateway/dss-gateway-support-1.1.3.jar

```

## 5 管理台的更新 

> 升级后端，同时也需要升级对应的管理台资源，无需执行管理台的安装，直接替换掉静态资源即可

### 5.1 下载前端安装包并解压
上传至管理台所在的服务器上 ，解压
```shell script
tar -xvf apache-linkis-x.x.x-incubating-web-bin.tar.gz
```


### 5.2 升级 
>管理台升级方式比较多，因为只是资源的更新，可以通过管理台安装脚本来进行，也可以直接覆盖掉原有的资源，
>推荐使用软链方式来进行，只需呀修改软链的目标地址即可，下面以新建版本资源路径方式为例

nginx配置文件默认是 在`/etc/nginx/conf.d/*`
nginx的日志文件在 `/var/log/nginx/access.log` 和`/var/log/nginx/error.log`

场景1： 如果是集成再DSS项目中，修改DSS项目中linkis管理台资源的地址指向 
dss的nginx配置文件默认是 在`/etc/nginx/conf.d/dss.conf`
```nginx
#示例
        server {
            ......
            location dss/linkis {
            alias   /appcom/Install/linkis-web-newversion/dist; # 静态文件目录  
            index  index.html index.html;
            }
            .....
        }
```

场景2：如果linkis是独立部署
修改Nginx的配置,静态资源地址 指向新版本的linkis管理台 
linkis的nginx配置文件默认是 在`/etc/nginx/conf.d/dss.conf`
```nginx
#示例
        server {
            ......
            location dss/linkis {
            alias   /appcom/Install/linkis-web-newversion/dist; # 静态文件目录 
            index  index.html index.html;
            }
            ......
        }
```

重新加载nginx 配置
```
sudo nginx -s reload 
```

### 5.3 注意事项

- 管理台升级后，因为浏览器可能存在缓存，如果要验证效果，最好清空下浏览器缓存 