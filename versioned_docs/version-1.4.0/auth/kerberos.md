---
title: Kerberos
sidebar_position: 5
---

## Kerberos authentication

## Scenario 1 HDFS storage
If the hadoop cluster is used, such as the file used to store the result set
```shell script
# Result set logs and other file paths, used to store the result set files of the Job wds.linkis.filesystem.hdfs.root.path(linkis.properties)
HDFS_USER_ROOT_PATH=hdfs:///tmp/linkis
```
And kerberos authentication is enabled, corresponding kerberos configuration is required

Modify the corresponding configuration of `linkis.properties` as follows
```properties
#Whether the kerberos authentication mode is enabled
wds.linkis.keytab.enable=true
#keytab places the directory, which stores the files of username.keytab of multiple users
wds.linkis.keytab.file=/appcom/keytab/
#Whether to bring principle client authentication, the default value is false
wds.linkis.keytab.host.enabled=false
#principle authentication needs to bring the client IP
wds.linkis.keytab.host=127.0.0.1
```
Restart the service after modification


## Scenario 2 HDFS storage kerberos proxy authentication

Hadoop2.0 version began to support the ProxyUser mechanism. The meaning is to use the user authentication information of User A to access the hadoop cluster in the name of User B.
For the server, it is considered that User B is accessing the cluster at this time, and the corresponding authentication of access requests (including the permissions of the HDFS file system and the permissions of YARN submitting task queues) is performed by User B.
User A is considered a superuser.

The main difference from Scenario 1 is that it can solve the problem that each user needs to generate a keytab file. If kerberos proxy authentication is set, the proxy user's keytab file can be used for authentication.
Modify the corresponding configuration of `linkis.properties` as follows

```properties
#Whether the kerberos authentication mode is enabled
wds.linkis.keytab.enable=true
#keytab places the directory, which stores the files of username.keytab of multiple users
wds.linkis.keytab.file=/appcom/keytab/
#Whether to bring principle client authentication, the default value is false
wds.linkis.keytab.host.enabled=false
#principle authentication needs to bring the client IP
wds.linkis.keytab.host=127.0.0.1

#Enable kerberos proxy authentication
wds.linkis.keytab.proxyuser.enable=true

#Use superuser to verify user authentication information
wds.linkis.keytab.proxyuser.superuser=hadoop



```
Restart the service after modification

## Scenario 3 Queue manager checks yarn resource information
![yarn-normal](/Images-zh/auth/yarn-normal.png)
Will access the REST API interface provided by Yarn to provide ResourceManager
If the ResourceManager of yarn has enabled kerberos authentication, you need to configure kerberos-related authentication information

Database table linkis_cg_rm_external_resource_provider
Insert yarn data information
```sql
INSERT INTO `linkis_cg_rm_external_resource_provider`
(`resource_type`, `name`, `labels`, `config`) VALUES
('Yarn', 'default', NULL,
'
     {
         "rmWebAddress": "http://xx.xx.xx.xx:8088",
         "hadoopVersion": "2.7.2",
         "authorEnable": false,
         "user":"hadoop","pwd":"123456",
         "kerberosEnable":@YARN_KERBEROS_ENABLE,
         "principalName": "@YARN_PRINCIPAL_NAME",
         "keytabPath": "@YARN_KEYTAB_PATH"
         "krb5Path": "@YARN_KRB5_PATH"
     }
'
);

```
After the update, because the cache is used in the program, if you want to take effect immediately, you need to restart the `linkis-cg-linkismanager` service

```shell script
sh sbin/linkis-daemon.sh restart cg-linkismanager
```



## Scenario 4 The hive data source in the data source function

If the hive data source that needs to be connected and the corresponding hive cluster environment has kerberos authentication enabled, you need to upload the kerberos and keytab authentication file information when configuring the cluster environment.
![image](/Images-zh/auth/dsm-kerberos.png)