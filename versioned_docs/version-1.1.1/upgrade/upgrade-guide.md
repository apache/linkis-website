---
title: Version upgrades above 1.0.3
sidebar_position: 2
---

> This article briefly introduces the general upgrade process for versions above 1.0.3


## 1 Upgrade Instructions

- If you are installing and using Linkis for the first time, or reinstalling Linkis, you don't need to pay attention to the Linkis upgrade guide.
- If components of other platforms (DataSphereStudio/Qualitis/Visualis, etc.) are involved, please confirm the compatibility between versions before upgrading, and it is best to use the recommended version.
- It is recommended to control the version through the soft chain. You can switch the version by modifying the target address of the soft chain. For example: `linkis -> /appcom/Install/LinkisInstall/linkis-1.1.3.20220615210213`
- The upgrade process mainly requires attention to the adjustment of the database table structure and the adjustment of some configuration parameters
- In addition to the upgrade of the back-end services, the management console resources of linkis also need to be upgraded together
- The main changes of each version can be found in the overview information of the version `https://linkis.apache.org/docs/x.x.x/release` and the version [release-note](https://linkis.apache .org/download/main): https://linkis.apache.org/download/main
- The database changes/configuration parameter changes of each version are based on the previous version

## 2 Service upgrade installation

Press [Deployment guide document](../deployment/quick-deploy) (the installation of the management console in the document can be skipped) to install the new version.

When installing the service, if the historical data is retained, please retain the historical data, if you do not need to retain the data, just reinstall it directly
```shell script
Do you want to clear Linkis table information in the database?
 1: Do not execute table-building statements
 2: Dangerous! Clear all data and rebuild the tables
 other: exit

Please input the choice: ## choice 1
````

## 3. Database table upgrade
>After the service installation is completed, the database structure needs to be modified, including table structure changes and table data changes


Find the corresponding version `db/upgrade/x.x.x-schema/` sql change file

If it is executed across multiple versions, please execute them in the order of versions,
If some versions do not have x.x.x_schema (after the linkis>=1.1.0 version, as long as the adjustment of the database table is involved, there will be a corresponding version of the schema file), it means that there is no change in the data table in this version

:::caution notice
Execute upgrade_1.1.1 under  DDL upgrade script in schema, such as if it is executed to linkis_ cg_ rm_ resource_ action_ Record related error, please check whether the statement creating the table is missing engine=innodb default charset=utf8; If it is missing, please add it before execution
:::

```shell script
├── linkis_ddl.sql # The current version of the full ddl database definition language table building statement
├── linkis_dml.sql # The current version of the full dml data manipulation language data additions and changes
└── upgrade
    ├── 1.1.0_schema # The corresponding version of sql
    │ └── mysql
    │ ├── linkis_ddl.sql
    │ └── linkis_dml.sql
    ├── 1.1.1_schema
    │ └── mysql
    │ ├── linkis_ddl.sql
    │ └── linkis_dml.sql
    └── 1.1.3_schema
        └── mysql
            └── linkis_ddl.sql
````

```mysql-sql
    #If it is executed across multiple versions, please execute in order of versions, execute ddl first and then execute ddl
    #For example, currently upgrade from linkis-1.0.3 to linkis-1.1.2
    source upgrade/1.1.0_schema/mysql/linkis_ddl.sql
    source upgrade/1.1.0_schema/mysql/linkis_dml.sql

    source upgrade/1.1.1_schema/mysql/linkis_ddl.sql
    source upgrade/1.1.1_schema/mysql/linkis_dml.sql

````
## 4 Adjustment of data (optional)
>According to the actual situation, decide whether to make the following adjustments

### 4.1 TOKEN configuration
Authentication for interface calls yes
1.1.1 Version adjustment Migrate the original TOKEN configuration from `${LINKIS_HOME}/conf/token.properties` to the database table `linkis_mg_gateway_auth_token`,
For the TOKEN originally configured in `token.properties`, you need to manually migrate the table
### 4.2 UDF Adjustment
1.1.1 supports the functions of UDF multi-version control and UDF storage to BML, the table structure stored by UDF functions has been adjusted, and the historical data of UDF needs to be migrated separately

### 4.3 Session field key configuration

In version 1.1.1, the key of the session field was adjusted from `bdp-user-ticket-id`-> to `linkis_user_session_ticket_id_v1`,
If it is an upgrade to Linkis. At the same time, DSS or other projects are deployed, but in their service lib package, the linkis-module-x.x.x.jar package of Linkis that they depend on is <1.1.1, you need to modify the file located in `${LINKIS_HOME}/conf/linkis.properties`
```shell
echo "wds.linkis.session.ticket.key=bdp-user-ticket-id" >> linkis.properties
````
### 4.4 Adjustment of default queue
1.1.1 Begin to adjust the default cluster name of yarn queue `wds.linkis.rm.cluster` sit is adjusted to default, if you have been using sit, please modify the table data
Cluster name in `linkis_cg_rm_external_resource_provider`

### 4.5 Copies of other related packages

If there is a third-party appconn plugin installed in `${LINKIS_HOME_OLD}/lib/linkis-engineconn-plugins` in the previous version of Linkis, you need to copy it to the new version,
It is best to link to the appconn path through a soft chain
like:
````
#Check if the old version has a third-party appconn installed
cd ${LINKIS_HOME_OLD}/lib/linkis-engineconn-plugins/
ll
 appconn -> /appcom/Install/LinkisInstall/appconn


#The new version is consistent
cd ${LINKIS_HOME}/lib/linkis-engineconn-plugins/
#soft chain
ln -snf /appcom/Install/LinkisInstall/appconn appconn
````


If dss is installed in the original version, you need to copy the `dss-gateway-support-x.x.x.jar` in the original package to the `./lib/linkis-spring-cloud-services/linkis-mg-gateway/` directory of linkis
like:
```shell script
cp ${LINKIS_HOME_OLD}/lib/linkis-spring-cloud-services/linkis-mg-gateway/dss-gateway-support-1.1.3.jar ${LINKIS_HOME}/lib/linkis-spring-cloud-services/linkis- mg-gateway/dss-gateway-support-1.1.3.jar

````

## 5 Updates to the console

> To upgrade the backend, you also need to upgrade the corresponding management console resources. You don't need to install the management console, just replace the static resources directly.

### 5.1 Download the front-end installation package and unzip it
Upload it to the server where the management console is located, and decompress it
```shell script
tar -xvf apache-linkis-x.x.x-incubating-web-bin.tar.gz
````


### 5.2 Upgrade
>There are many ways to upgrade the management console, because it is only the update of resources, which can be done through the installation script of the management console, or it can directly overwrite the original resources.
>It is recommended to use the soft chain method, just modify the target address of the soft chain. The following takes the new version resource path method as an example

The nginx configuration file is by default in `/etc/nginx/conf.d/*`
nginx log files are in `/var/log/nginx/access.log` and `/var/log/nginx/error.log`

Scenario 1: If it is integrated into the DSS project, modify the address of the linkis management console resource in the DSS project to point to
The nginx configuration file for dss is by default in `/etc/nginx/conf.d/dss.conf`
````nginx
#Example
        server {
            ......
            location dss/linkis {
            alias /appcom/Install/linkis-web-newversion/dist; # static file directory
            index index.html index.html;
            }
            .....
        }
````

Scenario 2: If linkis is deployed independently
Modify the configuration of Nginx, the static resource address points to the new version of the linkis console
Linkis' nginx configuration file is by default in `/etc/nginx/conf.d/dss.conf`
````nginx
#Example
        server {
            ......
            location dss/linkis {
            alias /appcom/Install/linkis-web-newversion/dist; # static file directory
            index index.html index.html;
            }
            ......
        }
````

Reload nginx configuration
````
sudo nginx -s reload
````

### 5.3 Notes

- After the management console is upgraded, because the browser may have a cache, if you want to verify the effect, it is best to clear the browser cache