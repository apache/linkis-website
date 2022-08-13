---
title:  ElasticSearch Engine Usage
sidebar_position: 11
---


This article mainly introduces the configuration, deployment and use of ElasticSearch EngineConn in Linkis1.0.

## 1. Environment configuration before using the ElasticSearch EngineConn

If you want to use the ElasticSearch EngineConn on your server, you need to prepare the ElasticSearch connection information, such as the connection address, user name and password of the ElasticSearch service, etc.

## 2. ElasticSearch engineConn configuration and deployment

### 2.1 ElasticSearch version selection and compilation

Note: The Linkis project needs to be fully compiled before ElasticSearch EngineConn is built.

The published installation and deployment packages do not contain the engine plugin by default.

You can click [Linkis engine installation guide](https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)  to deployment installation, or according to the following process, Manual compilation and deployment

Compile ElasticSearch engine separately

```
${linkis_code_dir}linkis-engineconn-plugins/elasticsearch/
mvn clean install
```

### 2.2 ElasticSearch EngineConn deployment and loading

Upload the engine package compiled in Step 2.1
```bash
${linkis_code_dir}/linkis-engineconn-pluginsjdbc/target/out/elasticsearch
```
to the engine directory on the server
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```

### 2.3 ElasticSearch EngineConn Labels
Linkis1.x works with tags, so you need to insert data into our database as shown below.

The configuration of the management console is managed by engine labels. If a new engine needs to be configured, you need to modify the metadata of the corresponding table.

```
linkis_ps_configuration_config_key:  Insert the key and default values for the engine's configuration parameters
linkis_cg_manager_label：Insert engine label such as：elasticsearch-7.6.2
linkis_ps_configuration_category： Insert the directory association of the engine
linkis_ps_configuration_config_value： Insert the configuration that the engine needs to show
linkis_ps_configuration_key_engine_relation:Association between configuration items and engines
```

```sql
-- set variable
SET @ENGINE_LABEL="elasticsearch-7.6.2";
SET @ENGINE_IDE=CONCAT('*-IDE,',@ENGINE_LABEL);
SET @ENGINE_NAME="elasticsearch";

-- add es engine to IDE
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @ENGINE_IDE, 'OPTIONAL', 2, now(), now());
select @label_id := id from `linkis_cg_manager_label` where label_value = @ENGINE_IDE;
insert into `linkis_ps_configuration_category` (`label_id`, `level`) VALUES (@label_id, 2);

-- insert configuration key
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.cluster', 'eg:http://127.0.0.1:9200', 'connection address', 'http://127.0.0.1:9200', 'Regex', '^\\s*http://([^:]+)(:\\d+)(/[^\\?]+)?(\\?\\S*)?$', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.datasource', 'datasource', 'datasource', 'hadoop', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.username', 'username', 'ES cluster username', 'None', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.password', 'password', 'ES cluster password', 'None', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.auth.cache', 'Whether the client is cache authenticated', 'Whether the client is cache authenticated', 'false', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.sniffer.enable', 'Whether Sniffer is enabled on the client', 'Whether Sniffer is enabled on the client', 'false', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.http.method', 'Request Method', 'HTTP Request Method', 'GET', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.http.endpoint', '/_search', 'The Endpoint of th JSON script', '/_search', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.sql.endpoint', '/_sql', 'The Endpoint of th SQL script', '/_sql', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.sql.format', 'SQL script call template, %s replaced with SQL as the body of the request request Es cluster', 'request body', '{"query":"%s"}', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.headers.*', 'client headers configuration', 'client headers configuration', 'None', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.engineconn.concurrent.limit', 'the maximum engine concurrency', 'the maximum engine concurrency', '100', 'None', '', @ENGINE_NAME, 0, 0, 1, 'datasource configuration');


-- elasticsearch engine -*
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as config_key_id, label.id AS engine_type_label_id FROM `linkis_ps_configuration_config_key` config
INNER JOIN `linkis_cg_manager_label` label ON config.engine_conn_type = @ENGINE_NAME and label_value = @ENGINE_IDE);

-- elasticsearch engine default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select relation.config_key_id AS config_key_id, '' AS config_value, relation.engine_type_label_id AS config_label_id FROM `linkis_ps_configuration_key_engine_relation` relation
INNER JOIN `linkis_cg_manager_label` label ON relation.engine_type_label_id = label.id AND label.label_value = @ENGINE_IDE);

```

### 2.4 ElasticSearch EngineConn configurations

|   configurations                   | default              | is necessary |description                                     |
| ------------------------ | ------------------- | ---|---------------------------------------- |
| linkis.es.cluster        | 127.0.0.1:9200      | yes |ElasticSearch cluster，separate multiple nodes using commas  |
| linkis.datasource        | hadoop            |yes  | ElasticSearch datasource |
| linkis.es.username       | None                  |no | ElasticSearch cluster username                 |
| linkis.es.password       | None                  |no | ElasticSearch cluster password                   |
| linkis.es.auth.cache     | false               |no | Whether the client is cache authenticated                       |
| linkis.es.sniffer.enable | false               |no | Whether the sniffer is enabled on the client                   |
| linkis.es.http.method    | GET                 | no | Request methods                                 |
| linkis.es.http.endpoint  | /_search            |no | the Endpoint in JSON Script                 |
| linkis.es.sql.endpoint   | /_sql               |no | the Endpoint in SQL                  |
| linkis.es.sql.format     | {"query":"%s"} | no | the template of SQL script call , %s replaced with SQL as the body of the request request ElasticSearch cluster |
| linkis.es.headers.* | None | no | Client Headers configuration |
| linkis.engineconn.concurrent.limit | 100 | no | Maximum engine concurrency of ElasticSearch cluster |

## 3. The use of ElasticSearch EngineConn 
### 3.1 Ready to operate
You need to configure ElasticSearch connection information, including connection address information and user name and password (if needed).

![ElasticSearch](https://user-images.githubusercontent.com/22620332/182787195-8051bf25-1e1e-47e5-ad88-4896278857f2.png)  

Figure 3-1 ElasticSearch Configuration information

You can also specify in the RuntimeMap of the submitted task.
```shell
linkis.es.cluster
linkis.es.username               |
linkis.es.password
```

### 3.2 How to use Linkis SDK

Linkis provides a client method to call ElasticSearch tasks. The call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to [JAVA SDK Manual](../user-guide/linkiscli-manual.md).

For the ElasticSearch task, you only need to change the EngineConnType and CodeType parameters in the Demo.

```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "elasticsearch-7.6.2"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "elasticsearch"); // required codeType
```

### 3.2 How to use Linkis-cli
**-codeType parameter description**
- essql：Execute ES engine tasks through SQL scripts
- esjson：Execute ES engine tasks using JSON scripts

**Using the sample**

After Linkis 1.0, you can submit tasks through cli. We only need to specify the corresponding EngineConn and CodeType tag types. The use of ElasticSearch is as follows.

**Example using mode essql**

**Note：** To use the SQL script, you must install the SQL plugin for ElasticSearch service：https://github.com/NLPchina/elasticsearch-sql#elasticsearch-762
```shell
 sh ./bin/linkis-cli -submitUser hadoop -engineType elasticsearch-7.6.2 -codeType essql -code '{"sql": "select * from kibana_sample_data_ecommerce limit 10' -runtimeMap linkis.es.http.method=GET -runtimeMap linkis.es.http.endpoint=/_sql -runtimeMap linkis.datasource=hadoop  -runtimeMap linkis.es.cluster=127.0.0.1:9200
```

**Example using mode esjson**
```shell
sh ./bin/linkis-cli -submitUser hadoop -engineType elasticsearch-7.6.2 -codeType esjson -code '{"query": {"match": {"order_id": "584677"}}}' -runtimeMap linkis.es.http.method=GET -runtimeMap linkis.es.http.endpoint=/kibana_sample_data_ecommerce/_search -runtimeMap linkis.datasource=hadoop  -runtimeMap linkis.es.cluster=127.0.0.1:9200 
```
Specific use can refer to： [Linkis CLI Manual](../user-guide/linkiscli-manual.md).


## 4. ElasticSearch EngineConn user settings

ElasticSearch user settings are mainly JDBC connection information, but it is recommended that users encrypt and manage this password and other information.
