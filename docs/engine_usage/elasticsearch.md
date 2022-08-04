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

You can click [Linkis engine installation guide] (https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin)  to deployment installation, or according to the following process, Manual compilation and deployment

Compile ElasticSearch engine separately

```
${linkis_code_dir}/linkis-enginepconn-lugins/engineconn-plugins/elasticsearch/
mvn clean install
```

### 2.2 ElasticSearch EngineConn deployment and loading

Upload the engine package compiled in Step 2.1
```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/jdbc/target/out/elasticsearch
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

SET @ELASTICSEARCHENG_LABEL="elasticsearch-7.6.2";
SET @ELASTICSEARCHENG_ALL=CONCAT('*-*,',@ELASTICSEARCHENG_LABEL);
SET @ELASTICSEARCHENG_IDE=CONCAT('*-IDE,',@ELASTICSEARCHENG_LABEL);

insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@ELASTICSEARCHENG_ALL, 'OPTIONAL', 2, now(), now());
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@ELASTICSEARCHENG_IDE, 'OPTIONAL', 2, now(), now());

select @label_id := id from linkis_cg_manager_label where `label_value` = @ELASTICSEARCHENG_IDE;
insert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);


INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.elasticsearcheng.url', 'such as:http://127.0.0.1:8080', 'conn address', 'http://127.0.0.1:8080', 'Regex', '^\\s*http://([^:]+)(:\\d+)(/[^\\?]+)?(\\?\\S*)?$', 'elasticsearcheng', 0, 0, 1, 'data source conf');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.elasticsearcheng.catalog', 'catalog', 'catalog', 'system', 'None', '', 'elasticsearcheng', 0, 0, 1, 'data source conf');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.elasticsearcheng.source', 'source', 'source', 'global', 'None', '', 'elasticsearcheng', 0, 0, 1, 'data source conf');


-- elasticsearcheng-*
insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config
INNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'elasticsearcheng' and label_value = @ELASTICSEARCHENG_ALL);

-- elasticsearcheng default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)
(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation
INNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @ELASTICSEARCHENG_ALL);

```

### 2.4 ElasticSearch EngineConn configurations

|   configurations                   | default              | is necessary |description                                     |
| ------------------------ | ------------------- | ---|---------------------------------------- |
| linkis.es.cluster        | 127.0.0.1:9200      | yes |ElasticSearch cluster，separate multiple nodes using commas  |
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

Linkis provides a client method to call ElasticSearch tasks. The call method is through the SDK provided by LinkisClient. We provide java and scala two ways to call, the specific usage can refer to [JAVA SDK Manual](../user_guide/sdk-manual.md).

For the ElasticSearch task, you only need to change the EngineConnType and CodeType parameters in the Demo.

```java
        Map<String, Object> labels = new HashMap<String, Object>();
        labels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "elasticsearch-7.6.2"); // required engineType Label
        labels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator
        labels.put(LabelKeyConstant.CODE_TYPE_KEY, "elasticsearch"); // required codeType
```

### 3.2 How to use Linkis-cli
**-codeType parameter description**
- sql/essql：
- json/esjson：request parameters are submitted in JSON format

**Using the sample**

After Linkis 1.0, you can submit tasks through cli. We only need to specify the corresponding EngineConn and CodeType tag types. The use of ElasticSearch is as follows.
```shell
sh ./bin/linkis-cli -submitUser hadoop -engineType elasticsearch-7.6.2 -codeType json -code '{"query": {"match": {"order_id": "584677"}}}' -runtimeMap linkis.es.http.method=GET -runtimeMap linkis.es.http.endpoint=/kibana_sample_data_ecommerce/_search
```
Specific use can refer to： [Linkis CLI Manual](../user_guide/linkiscli-manual.md).


## 4. ElasticSearch EngineConn user settings

ElasticSearch user settings are mainly JDBC connection information, but it is recommended that users encrypt and manage this password and other information.
