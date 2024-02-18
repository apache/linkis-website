---
title: Public Service
sidebar_position: 2
---
## **Background**
Why do we need to add public enhanced capabilities after we use Linkis as a unified gateway or JobServer? This is after we actually developed multiple upper-level application tools, and found that if a UDF and variable debugging were defined in the IDE tool, after publishing to the scheduling tool, these UDFs and variables need to be redefined again. When some dependent jar packages, configuration files, etc. change, two places also need to be modified.
Aiming at these issues like the common context across upper-layer application tools, after we realized the unified entry of tasks as Linkis, we wondered whether Linkis could provide this public enhancement capability, and provide some common features that can be used by multiple application tools. The ability to reuse. Therefore, a layer of public enhanced service PES is designed at the Linkis layer.


## **Architecture diagram**

![Diagram](/Images/Architecture/linkis-publicService-01.png)

## **Architecture Introduction**

The capabilities are now provided:

- Provide unified data source capability: data sources are defined and managed uniformly at the Linkis layer, and application tools only need to use the data source name, and no longer need to maintain the connection information of the corresponding data source. And the meaning of the data source is the same between different tools. And it provides the query ability of the metadata of the corresponding data source.
- Provide public UDF capabilities: Unify the definition specifications and semantics of UDF and small functions, so that multiple tools can be used when defined in one place.
- The ability to provide a unified context: support the transfer of information between tasks, including the transfer of variables, result sets, and resource files between multiple tasks, and provide the ability to transfer context between tasks.
- The ability to provide unified materials: Provide unified materials, support shared access to these materials among multiple tools, and materials support storage of various file types, and support version control.
- Ability to provide unified configuration and variables: Provides unified configuration capabilities to support templated configuration of different engine parameter templates, custom variables, built-in commonly used system variables and time format variables, etc.
- Ability to provide public error codes: Provide unified error code capabilities, classify and code crops of commonly used computing storage engines and knowledge bases, and provide a convenient SDK for calling.