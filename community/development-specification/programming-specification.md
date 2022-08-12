---
title: Programming Specification
sidebar_position: 1
---
## 1. Naming Convention
1. [**Mandatory**] Do not use Chinese pinyin and unintelligible abbreviations
2. For basic Java naming conventions, please refer to [naming-conventions](https://alibaba.github.io/Alibaba-Java-Coding-Guidelines/#naming-conventions)
3. [Constraints] There is a scalastyle style configuration file in linkis, if it does not conform to the specification, you need to rename it according to the scalastyle style
4. [**Mandatory**] Configuration files, startup file, process name, configuration keys,etc. also need to comply with naming conventions, which are as follows:

|Classification| Style| Specifications| Examples|
|:---- |:--- |:--- |:--- |
|Configuration file|Separated by lowercase'-'| linkis-classification level (ps/cg/mg)-service name.propertis| linkis-cg-linkismanager.properties|
|Start-stop script|Separated by lowercase'-'| linkis-classification level-service name| linkis-cg-linkismanager|
|Module directory|Separated by lowercase'-'| The module directory must be below the corresponding classification level, and the module name is a subdirectory| linkis-public-enhancements/linkis-bml|
|Process naming|Camel case naming| Start with Linkis and end with service name| LinkisBMLApplication|
|Configuration Key Naming|Separated by lowercase'.'| linkis+module name+keyName| linkis.bml.hdfs.prefix|

## 2. Annotation Protocol
1. [**Mandatory**] The class, class attribute, interface method must be commented, and the comment must use the Javadoc specification, using the format of `/**content*/`
2. [**Mandatory**] All abstract methods (including methods in interfaces) must be annotated with Javadoc. In addition to return values, parameters, and exception descriptions, they must also indicate what the method does and what functions it implements
