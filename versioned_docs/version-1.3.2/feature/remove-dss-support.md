---
title: Remove DSS Support dependency
sidebar_position: 0.4
---

## 1. Requirement background
The Linkis microservice module relies on the dss-gateway-support jar package, and jar package conflicts may occur when compiling with versions earlier than scala 2.12. So consider removing the dss-gateway-support module dependency.

## 2. Instructions for use

After removing the dss-gateway-support dependency, Linkis will not be affected.

## 3. Precautions

- Linkis >= 1.3.2 version, if you encounter an error related to dss support, you can check whether there is a jar package related to dss support in the $LINKIS_HOME/lib/linkis-spring-cloud-services/linkis-mg-gateway directory, and delete it if so Relevant jar packages, just restart the service.

- The reason for the conflict is that the dss support package is installed under linkis-mg-gateway during the one-click installation of dss. The specific jar package is dSS-gateway-support-xxx.jar