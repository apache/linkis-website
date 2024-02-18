---
title: HBase Engine
sidebar_position: 15
---

# HBase engine usage documentation

This article mainly introduces the installation, use and configuration of the `hbase` engine plugin in `Linkis`.

## 1. Preliminary work

### 1.1 Engine Verification

It is strongly recommended that you check these environment variables for the executing user before executing `hbase` tasks. The specific way is

```
sudo su - ${username}
echo ${JAVA_HOME}
```

## 2. Engine plugin installation

### 2.1 Engine plugin preparation [non-default engine](./overview.md)

Compile the engine plug-in separately (requires a `maven` environment)

```
# compile
cd ${linkis_code_dir}/linkis-engineconn-plugins/hbase/
mvn clean install -DskipTests -Dhbase.profile=1.2|1.4|2.2|2.5

# hbase.profile 1.2|1.4|2.2|2.5, The corresponding HBase version is: 1.2.0, 1.4.3, 2.2.6, 2.5.3
# default hbase.profile=2.5, Compile plug-ins for different HBase versions on demand
# The compiled engine plug-in package is located in the following directory
${linkis_code_dir}/linkis-engineconn-plugins/hbase/target/out/
```

[EngineConnPlugin engine plugin installation](../deployment/install-engineconn.md)

### 2.2 Upload and load engine plugins

Upload the engine plug-in package in 2.1 to the engine directory of the server

```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
The directory structure after uploading is as follows
```
linkis-engineconn-plugins/
├── hbase
│   ├── dist
│   │   └── 2.5.3
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 2.5.3
```
### 2.3 Engine refresh

#### 2.3.1 Restart and refresh
Refresh the engine by restarting the `linkis-cg-linkismanager` service
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 Check if the engine is refreshed successfully
You can check whether the `last_update_time` of this table in the `linkis_engine_conn_plugin_bml_resources` in the database is the time when the refresh is triggered.

```sql
#Login to the linkis database
select * from linkis_cg_engine_conn_plugin_bml_resources;
```


## 3. Use of HBase engine

The `HBase` engine of `Linkis` runs a Jruby environment in the background to execute instructions in hbase-shell, 
and is fully compatible with hbase-shell instructions.


### 3.1 Submit tasks through `Linkis-cli`

```shell
 sh bin/linkis-cli -engineType hbase-2.5.3 -code "list" \
  -codeType shell -runtimeMap linkis.hbase.zookeeper.quorum=zk1,zk2,zk3
```

More `Linkis-Cli` command parameter reference: [`Linkis-Cli` usage](../user-guide/linkiscli-manual.md)

HBase engine supports connection parameters:

| Configuration name | Remarks and default value | Is it necessary |
| --- | --- | --- |
| linkis.hbase.zookeeper.quorum | ZooKeeper address for connecting to HBase, e.g. zk1,zk2,zk3, default value: localhost | Required |
| linkis.hbase.zookeeper.property.clientPort | ZooKeeper port for connecting to HBase, default value: 2181 | Optional, usually the default value |
| linkis.zookeeper.znode.parent | ZooKeeper znode path for connecting to HBase, default value: /hbase | Optional, usually the default value |
| linkis.hbase.rootdir | HDFS root directory for the HBase cluster, default value: /hbase | Optional, usually the default value |
| linkis.hbase.security.authentication | Authentication method for connecting to the HBase cluster: simple or kerberos, default value: simple | Optional, depending on the cluster configuration |
| linkis.hbase.kerberos.principal | HBase Kerberos authentication principal, e.g. hbase@HADOOP.LINKIS.COM | Required for Kerberos authentication |
| linkis.hbase.keytab.file | Path to the keytab file required for HBase Kerberos authentication, e.g. /tmp/hbase.keytab | Required for Kerberos authentication |
| linkis.hbase.kerberos.proxy.user | Kerberos proxy user, ensure that the Kerberos authenticated user has the privilege to proxy as a regular user | Optional, can be omitted |
| linkis.hbase.regionserver.kerberos.principal | HBase RegionServer's Kerberos authentication principal, e.g. hbase/_HOST@HADOOP.LINKIS.COM (obtain from the cluster configuration file) | Required for Kerberos authentication |
| linkis.hbase.master.kerberos.principal | HBase Master's Kerberos authentication principal, e.g. hbase/_HOST@HADOOP.LINKIS.COM (obtain from the cluster configuration file) | Required for Kerberos authentication |
