---
title: Overview
sidebar_position: 1
---

PublicEnhencementService (PS) architecture design
=====================================

PublicEnhancementService (PS): Public enhancement service, a module that provides functions such as unified configuration management, context service, physical library, data source management, microservice management, and historical task query for other microservice modules.

![](/Images/Architecture/PublicEnhencementArchitecture.png)

Introduction to the second-level module:
==============

BML material library
---------

It is the linkis material management system, which is mainly used to store various file data of users, including user scripts, resource files, third-party Jar packages, etc., and can also store class libraries that need to be used when the engine runs.

| Core Class | Core Function |
|-----------------|------------------------------------|
| UploadService | Provide resource upload service |
| DownloadService | Provide resource download service |
| ResourceManager | Provides a unified management entry for uploading and downloading resources |
| VersionManager | Provides resource version marking and version management functions |
| ProjectManager | Provides project-level resource management and control capabilities |

Unified configuration management
-------------------------

Configuration provides a "user-engine-application" three-level configuration management solution, which provides users with the function of configuring custom engine parameters under various access applications.

| Core Class | Core Function |
|----------------------|--------------------------------|
| CategoryService | Provides management services for application and engine catalogs |
| ConfigurationService | Provides a unified management service for user configuration |

ContextService context service
------------------------

ContextService is used to solve the problem of data and information sharing across multiple systems in a data application development process.

| Core Class | Core Function |
|---------------------|------------------------------------------|
| ContextCacheService | Provides a cache service for context information |
| ContextClient | Provides the ability for other microservices to interact with the CSServer group |
| ContextHAManager | Provide high-availability capabilities for ContextService |
| ListenerManager | The ability to provide a message bus |
| ContextSearch | Provides query entry |
| ContextService | Implements the overall execution logic of the context service |

Datasource data source management
--------------------

Datasource provides the ability to connect to different data sources for other microservices.

| Core Class | Core Function |
|-------------------|--------------------------|
| datasource-server | Provide the ability to connect to different data sources |

InstanceLabel microservice management
-----------------------

InstanceLabel provides registration and labeling functions for other microservices connected to linkis.

| Core Class | Core Function |
|-----------------|--------------------------------|
| InsLabelService | Provides microservice registration and label management functions |

Jobhistory historical task management
----------------------

Jobhistory provides users with linkis historical task query, progress, log display related functions, and provides a unified historical task view for administrators.

| Core Class | Core Function |
|------------------------|----------------------|
| JobHistoryQueryService | Provide historical task query service |

Variable user-defined variable management
--------------------------

Variable provides users with functions related to the storage and use of custom variables.

| Core Class | Core Function |
|-----------------|-------------------------------------|
| VariableService | Provides functions related to the storage and use of custom variables |

UDF user-defined function management
---------------------

UDF provides users with the function of custom functions, which can be introduced by users when writing code.

| Core Class | Core Function |
|------------|------------------------|
| UDFService | Provide user-defined function service |