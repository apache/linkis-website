---
title: Version Overview
sidebar_position: 0.1
---

- [ElasticSearch engine usage instructions](/engine-usage/elasticsearch.md)
- [Presto Engine Instructions](/engine-usage/presto.md)
- [Integrate Knife4j and enable](/deployment/involve-knife4j-into-linkis.md)
- [Data source function module interface optimization](/api/http/linkis-ps-publicservice-api/metadataquery-api.md)
- [JDBC engine supports data source schema](/engine-usage/jdbc.md)
- [EC History List Architecture Design](/architecture/computation-governance-services/linkis-manager/ec-history-arc.md)
- [Service Isolation Design](/architecture/microservice-governance-services/service_isolation.md)
- [version of Release-Notes](/download/release-notes-1.2.0)


## Configuration Item

| Module Name (Service Name) | Type | Parameter Name | Default Value | Description |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|eureka(application-eureka.yml) | New | management.endpoints.web.exposure.include|refresh,info,health,metrics | The endpoint exposure range for Spring Boot Actuator|
|eureka(application-eureka.yml) | New |eureka.instance.metadata-map:.prometheus.path| ${prometheus.path:/actuator/prometheus} | Prometheus monitoring endpoint for microservices registered in Eureka metadata|
|common(application-linkis.yml) | New | eureka.instance.metadata-map:.prometheus.path|${prometheus.path:${prometheus.endpoint}} | ditto|
|common | New |wds.linkis.prometheus.enable | false| |
|common | Modify | wds.linkis.server.user.restful.uri.pass.auth | /api/rest_j/v1/actuator/prometheus| |
|common | Modify | spring.spring.cloud.config.enabled | false | |
|ec-es | New  | linkis.es.cluster        			| 127.0.0.1:9200    | ElasticSearch cluster，Separate multiple nodes using commas  |
|ec-es | New  | linkis.es.username       			| None     			| ElasticSearch cluster username                 |
|ec-es | New  | linkis.es.password       			| None       			| ElasticSearch cluster password                   |
|ec-es | New  | linkis.es.auth.cache     			| false       		| Whether the client is cache authenticated                       |
|ec-es | New  | linkis.es.sniffer.enable 			| false          	| Whether Sniffer is enabled on the client                   |
|ec-es | New  | linkis.es.http.method    			| GET               | request method                                |
|ec-es | New  | linkis.es.http.endpoint  			| /_search          | the Endpoint in JSON Script                 |
|ec-es | New  | linkis.es.sql.endpoint   			| /_sql             | the Endpoint in SQL                |
|ec-es | New  | linkis.es.sql.format     			| {"query":"%s"} 	| the template of SQL script call , %s replaced with SQL as the body of the request request ElasticSearch cluster |
|ec-es | New  | linkis.es.headers.* 	            | None 				| Client Headers configuration |
|ec-es | New  | linkis.engineconn.concurrent.limit | 100				| Maximum engine concurrency of ElasticSearch cluster |
|ec-presto | New  | wds.linkis.presto.url                  | http://127.0.0.1:8080 | Presto cluster connection                             | 
|ec-presto | New  | wds.linkis.presto.username             | default               | Presto cluster username                           | 
|ec-presto | New  | wds.linkis.presto.password             | None                    | Presto cluster password                             |
|ec-presto | New  | wds.linkis.presto.catalog              | system                |Catalog for queries                             | 
|ec-presto | New  | wds.linkis.presto.schema               | None                    |Query Schema                               | 
|ec-presto | New  | wds.linkis.presto.source               | global                | source used by the query                           |
|ec-presto | New  | presto.session.query_max_total_memory  | 8GB                   | query uses maximum memory                         | 
|ec-presto | New  | wds.linkis.presto.http.connectTimeout  | 60                    | Presto client connect timeout (unit: seconds) |
|ec-presto | New  | wds.linkis.presto.http.readTimeout     | 60                    | Presto client read timeout (unit: seconds)    |
|ec-presto | New  | wds.linkis.engineconn.concurrent.limit | 100                   | The maximum number of concurrent Presto engines                      | 
|ec-jdbc | Modify  | wds.linkis.jdbc.connect.url            | jdbc:mysql://127.0.0.1:3306/test	|	jdbc conn url				|
|ec-jdbc | Modify  | wds.linkis.jdbc.driver            		| com.mysql.jdbc.Driver			  	|	jdbc conn driver			|
|ec-jdbc | Modify  | wds.linkis.jdbc.username            	| None								|	jdbc conn username			|
|ec-jdbc | Modify  | wds.linkis.jdbc.password            	| None								|	jdbc conn password			|

## DB Table Changes
For details, see the upgrade schema`db/upgrade/1.2.0_schema` file in the corresponding branch of the code repository (https://github.com/apache/incubator-linkis).