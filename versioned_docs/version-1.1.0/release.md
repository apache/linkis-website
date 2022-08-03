---
title: Version Overview
sidebar_position: 0.1
---

- [Datasource Management Service Architecture Documentation](/architecture/public-enhancement-services/datasource-manager.md)
- [Metadata Management Services Architecture Documentation](/architecture/public-enhancement-services/metadata-manager.md)
- [Data source introduction & function usage guide](/deployment/start-metadatasource.md)
- [Guidelines for using the datasource client](user-guide/linkis-datasource-client.md)
- [Data source http interface documentation](/api/http/data-source-manager-api.md)
- [Metadata http interface documentation](/api/http/metadatamanager-api.md)
- [Start SkyWalking](/deployment/involve-skywalking-into-linkis.md)
- [Release-notes](/download/release-notes-1.1.0)

## Configuration Item 

| Module Name (Service Name) | Type | Parameter Name | Default Value | Description |
| ----------- | ----- | ------------------------------- | ------------------------- | ------------------------ |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.lib.dir | /lib/linkis-public-enhancements/linkis-ps-metadatamanager/service | Set the relative path to load the data source jar package, will be called by reflection|
|ps-metadatamanager | New | wds.linkis.server.mdm.service.instance.expire-in-seconds | 60 | Set the expiration time for loading sub-services, after which the service will not be loaded |
|ps-metadatamanager | New | wds.linkis.server.dsm.app.name | linkis-ps-data-source-manager | Set the name of the data source information |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.app.name | linkis-ps-metadatamanager | Service name for setting metadata information |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.kerberos.principle | hadoop/HOST@EXAMPLE.COM | set kerberos principle for linkis-metadata hive service |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.user | hadoop | Set the access user of hive service |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.kerberos.krb5.path | "" | Set the kerberos krb5 path used by the hive service |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.temp.location | classpath:/tmp | Set the temporary path of kafka and hive |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.sql.driver | com.mysql.jdbc.Driver | Set the driver of mysql service |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.sql.url | jdbc:mysql://%s:%s/%s | Set the url format of mysql service |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.sql.connect.timeout | 3000 | Set the connection timeout time for mysql service to connect to mysql service |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.sql.socket.timeout | 6000 | Set the socket timeout time for mysql service to open mysql service |
|ps-metadatamanager | New | wds.linkis.server.mdm.service.temp.location | /tmp/keytab | Set the local temporary storage path of the service, mainly to store the authentication files downloaded from the bml material service |
|ps-data-source-manager| New | wds.linkis.server.dsm.auth.admin | hadoop | datasourcemanager part of the interface permission authentication user |
|cg-engineconnmanager| Modified | wds.linkis.engineconn.max.free.time | 1h -> 0.5h | Maximum idle time of EngineConn changed from 1h to 0.5h |

## DB Table Changes

For details, see the upgrade schema`db/upgrade/1.1.0_schema` file in the corresponding branch of the code repository (https://github.com/apache/incubator-linkis).