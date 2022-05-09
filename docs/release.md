---
title: Version overview
sidebar_position: 0.1
---
- [Introduction of Proxy User Mode](/architecture/proxy_user.md)
- [UDF function introduction and usage guide](/user_guide/udf.md)
- [Engine material refresh HTTP interface](/api/http/engineconn-plugin-refesh.md)
- [UDF related HTTP interface](/api/http/udf-api.md)
- [UDF related table structure](/table/udf-table.md)
- [Implementation of OpenLookEng Engine](/blog/2022/03/20/openlookeng)
- [Use of OpenLookEng](/engine_usage/openlookeng.md)
- [release-notes](release-notes-1.1.1.md)

## Parameter Changes


| module name (service name) | type | parameter name | default value | description |
| ----------- | ----- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
|ec-openlookeng | New | linkis.openlookeng.engineconn.concurrent.limit | 100|Concurrency Limit |
|ec-openlookeng | New | linkis.openlookeng.http.connectTimeout | 60L | Client request timeout time http request based on OKhttp |
|ec-openlookeng | New | linkis.openlookeng.http.readTimeout |60L | Client read timeout HTTP request built on OKhttp |
|ec-openlookeng | New | linkis.openlookeng.url | http://127.0.0.1:8080| openlookeng service |
|ec-openlookeng | New | linkis.openlookeng.catalog | system| catalog|
|ec-openlookeng | New | linkis.openlookeng.schema | | schema |
|ec-openlookeng | New | linkis.openlookeng.source |global| source | |

## DB Table Changes

For details, see the upgrade schema`db/upgrade/1.1.1_schema` file in the corresponding branch of the code repository (https://github.com/apache/incubator-linkis).

