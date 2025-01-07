---
title: Eureka reports version metadata
sidebar_position: 0.2
---

## 1. Requirement Background
Eureka metadata adds additional information such as version. Supports reading configuration files, which is consistent with the version number of the configuration file, and uses a minor version number for the configuration file. Consider adding two version information in eureka metadata, one is the configuration file version and the other is the program software version. The configuration file versions of different services may be different. The configuration file versions of the same service in the same cluster should be consistent, and the software versions of all programs in the same cluster should be consistent.

## 2. Instructions for use
**Program version configuration**

Add the program version configuration to linkis_env.sh to control the program version, the addition is as follows:
```
linkis.app.version=${version}
```
After reporting eureka metadata, the version format version + compilation time is as follows: 1.3.2-20230304
```xml
<metadata>
    <linkis.app.version>${appVersion}</linkis.app.version>
</metadata>
```

**Service Version Configuration**

Add the service version configuration in the configuration file of each service, and add the following content:
```
linkis.conf.version=version number
```
Version format after reporting eureka metadata
```xml
<metadata>
    <linkis.conf.version>${serviceVersion}</linkis.conf.version>
</metadata>
```