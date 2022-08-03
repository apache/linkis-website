---
title: Version overview
sidebar_position: 0.1
---
- [Introduction of Proxy User Mode](/architecture/proxy-user.md)
- [UDF function introduction and usage guide](/user-guide/udf.md)
- [Engine material refresh HTTP interface](/api/http/engineconn-plugin-refesh.md)
- [UDF related HTTP interface](/api/http/udf-api.md)
- [UDF related table structure](/table/udf-table.md)
- [Implementation of OpenLookEng Engine](/blog/2022/03/20/openlookeng)
- [Use of OpenLookEng](/engine-usage/openlookeng.md)
- [release-notes](/download/release-notes-1.1.1)

## Configuration Item 


| Module Name (Service Name) | Type | Parameter Name | Default Value | Description |
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

