---
title: Nebula Engine
sidebar_position: 17
---

This article mainly introduces the installation, use and configuration of the `Nebula` engine plugin in `Linkis`.


## 1. Pre-work

### 1.1 Engine installation

If you want to use `Nebula` engine on your `Linkis` service, you need to install `Nebula` service and make sure the service is available.

### 1.2 Service Verification

```shell
# Execute the task
./usr/local/bin/nebula-console -u root -p password --address=graphd --port=9669

CREATE SPACE IF NOT EXISTS my_space_1 (vid_type=FIXED_STRING(30));SHOW SPACES;

# Get the following output to indicate that the service is available
+--------------+
| Name         |
+--------------+
| "my_space_1" |
+--------------+
```

## 2. Engine plugin deployment

### 2.1 Engine plugin preparation[non-default engine](./overview.md)

Compile the engine plug-in separately (requires `maven` environment)

```
# compile
cd ${linkis_code_dir}/linkis-engineconn-plugins/nebula/
mvn clean install
# The compiled engine plug-in package is located in the following directory
${linkis_code_dir}/linkis-engineconn-plugins/nebula/target/out/
```
[EngineConnPlugin Engine Plugin Installation](../deployment/install-engineconn.md)

### 2.2 Upload and load engine plugins

Upload the engine package in 2.1 to the engine directory of the server
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
The directory structure after uploading is as follows
```
linkis-engineconn-plugins/
├── nebula
│   ├── dist
│   │   └── 3.0.0
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 3.0.0
```

### 2.3 Engine refresh

#### 2.3.1 Restart and refresh
Refresh the engine by restarting the `linkis-cg-linkismanager` service
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 Check whether the engine is refreshed successfully
You can check whether the `last_update_time` of the `linkis_engine_conn_plugin_bml_resources` table in the database is the time to trigger the refresh.

```sql
#login to `linkis` database
select * from linkis_cg_engine_conn_plugin_bml_resources;
```

## 3 Engine usage

### 3.1 Submit tasks through `Linkis-cli`

```shell
sh ./bin/linkis-cli  -engineType nebula-3.0.0 -codeType nebula \
 -code 'CREATE SPACE IF NOT EXISTS my_space_1 (vid_type=FIXED_STRING(30));SHOW SPACES;' \
 -runtimeMap linkis.nebula.port=9669  -runtimeMap linkis.nebula.host=wds07
```

More `Linkis-Cli` command parameter reference: [Linkis-Cli usage](../user-guide/linkiscli-manual.md)

## 4. Engine configuration instructions

### 4.1 Default Configuration Description


| Configuration                                   | Default       | Required          | Description                                           |
| -------------------------------------- |-----------|-------------|-------------------------------------------------------|
| linkis.nebula.host               | 127.0.0.1 | no | host                                                  |
| linkis.nebula.port | 9669      | no           | port                                                  |
| linkis.nebula.username | root      | no           | username                                              |
| linkis.nebula.password | nebula    | no           | password                                              |
| linkis.nebula.max.conn.size | 100       | no           | max conn size                                         |
| linkis.nebula.reconnect.enabled | false    | no           | whether to retry after the connection is disconnected |
| linkis.engineconn.concurrent.limit | 100       | no           | Maximum concurrent number of engines                  |
| linkis.nebula.default.limit | 5000      | no           | Limit the number of result sets                       |

