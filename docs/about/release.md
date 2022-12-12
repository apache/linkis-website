---
title: Version Overview
sidebar_position: 2
---

- [Trino engine usage instructions](/engine-usage/trino.md)
- [Seatunnel Engine Usage Instructions](/engine-usage/seatunnel.md)
- [Linkis console multi-datasource management](/user-guide/control-panel/datasource-management.md)
- [Multiple data sources usage](/user-guide/datasource-manual.md)
- [Version Release-Notes](/download/release-notes-1.3.1)


## Parameter changes

| module name (service name) | type | parameter name | default value | description |
| ----------- | ----- | ------------------------- | ---------------- |-------------- |
| es-trino | new | linkis.trino.url | http://127.0.0.1:8080 | Trino cluster connection URL  |
| ec-trino | new | linkis.trino.default.limit | 5000 | limit on the number of result sets |
| ec-trino | new | linkis.trino.http.connectTimeout | 60 | connection timeout (seconds) |
| ec-trino | new | linkis.trino.http.readTimeout | 60 | transmission timeout (seconds) |
| ec-trino | new | linkis.trino.resultSet.cache.max | 512k | result set buffer |
| ec-trino | new | linkis.trino.user | null | username |
| ec-trino | new | linkis.trino.password | null | password |
| ec-trino | new | linkis.trino.passwordCmd | null | password callback command |
| ec-trino | new | linkis.trino.catalog | system | Catalog |
| ec-trino | new | linkis.trino.schema | null | Schema |
| ec-trino | new | linkis.trino.ssl.insecured | false | verify SSL certificate |
| ec-trino | new | linkis.engineconn.concurrent.limit | 100 | The maximum number of concurrent engines |
| ec-trino | new | linkis.trino.ssl.key.store | null | keystore path |
| ec-trino | new | linkis.trino.ssl.keystore.password | null | keystore password |
| ec-trino | new | linkis.trino.ssl.keystore.type | null | keystore type |
| ec-trino | new | linkis.trino.ssl.truststore | null | truststore |
| ec-trino | new | linkis.trino.ss..truststore.type | null | trustore type |
| ec-trino | new | linkis.trino.ssl.truststore.password | null | truststore password |
| ec-seatunnel | new | wds.linkis.engine.seatunnel.plugin.home | /opt/linkis/seatunnel | Seatunnel installation path |

## Database table changes
For details, see the upgrade schema `db/upgrade/1.3.1_schema` file in the corresponding branch of the code warehouse (https://github.com/apache/incubator-linkis)