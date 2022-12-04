---
title: Release-Notes Writing Specification
sidebar_position: 9
---
Before each version is released, the release-notes for this version need to be organized by the release manager or developer to briefly describe the specific changes included in the new version update.

In order to maintain uniformity and facilitate writing, the following specifications are formulated:
- A summary of the version is required, a few sentences summarizing the core main changes of this version
- According to the changed function points, it is classified into four categories: new features/enhancement points/fixed functions/others
- Include a thank you column: students who have contributed to this version, in addition to issue/pr, and any students who have participated in this version discussion/community Q&A/comment suggestion
- Specification of each note: `[Service name abbreviation-L1 maven module name][Linkis-pr/issues serial number] This change briefly describes the information, you can generally know the change of this function through the description information.` `[Service name abbreviation -L1 maven module name]` as a label, the example is as follows
- Under the same category (new features/enhancement points/fixed functions/others), the service names with the same name are put together and sorted in ascending order of pr/issues serial number
- Corresponding English documents are required

````
Service name abbreviation: The change of this pr, at the code level, the corresponding service name abbreviation of the main service
For example, a pr made bug fixes to the JDBC engine, which is a JDBC module under the linkis-cg-engineconn service
EG:[EC-Jdbc][[Linkis-1851]](https://github.com/apache/incubator-linkis/issues/1851) Fix the jdbc engine, when there are multiple sql statements in one task execution, it cannot be executed normally The problem
If the L1-module does not exist, or it is the adjustment of the entire service level, the lower-level module may not be written, such as Entrance
````

## Common notes tags
```html
linkis-mg-eureka Eureka
linkis-mg-gateway Gateway
linkis-cg-linkismanager LM
linkis-cg-engineconnplugin ECP
linkis-cg-engineconnmanager ECM
linkis-cg-engineconn EC
linkis-cg-entrance Entrance
linkis-ps-publicservice PS
linkis-ps-cs CS
linkis-ps-metadatamanager MDM
linkis-ps-data-source-query DSQ

Web console Web
Install Install
Install-Scripts Install-Scripts
Install-SQL Install-Sql
Install-Web Install-Web
Common module Common
````