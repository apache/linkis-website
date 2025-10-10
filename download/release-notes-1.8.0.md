---
title: Release Notes 1.8.0
sidebar_position: 86
---

Apache Linkis 1.8.0 release introduces the following new features: Linkis task pre-diagnosis and post-diagnosis support, data source display with Ranger support, Azure object storage support, data source management for Oracle and PostgreSQL, Token expiration policy optimization, OAuth2 authentication support, and fixes for several security issues.

Main features include:

- Task pre-diagnosis and bad job interception support, and task post-diagnosis reports
- Data source display with Ranger support
- Azure object storage support
- Data source management support for Oracle and PostgreSQL
- Token expiration policy optimization
- Added UDF log viewing section in task management interface
- Added OAuth2 authentication support
- Fixed security vulnerability in JDBC-based MySQL connections
- Fixed security vulnerability where log files could potentially expose Hive configuration passwords in extreme cases
- Fixed insecure Token configuration issue in containerized configuration files

Abbreviations:

- COMMON: Linkis Common
- ENTRANCE: Linkis Entrance
- EC: Engineconn
- ECM: EngineConnManager
- ECP: EngineConnPlugin
- DMS: Data Source Manager Service
- MDS: MetaData Manager Service
- LM: Linkis Manager
- PS: Linkis Public Service
- PE: Linkis Public Enhancement
- RPC: Linkis Common RPC
- CG: Linkis Computation Governance
- DEPLOY: Linkis Deployment
- WEB: Linkis Web
- GATEWAY: Linkis Gateway
- EP: Engine Plugin
- ORCHESTRATOR: Linkis Orchestrator
- CLIENT: Linkis Client

## New Features

- Task pre-diagnosis and bad job interception support, and task post-diagnosis reports
- Data source display with Ranger support
- Azure object storage support
- Added UDF log viewing section in task management interface
- Added OAuth2 authentication support

## Enhancements

- Data source management support for Oracle and PostgreSQL
- Token expiration policy optimization

## Bug Fixes

- Fixed security vulnerability in JDBC-based MySQL connections
- Fixed security vulnerability where log files could potentially expose Hive configuration passwords in extreme cases
- Fixed insecure Token configuration issue in containerized configuration files

## Acknowledgements

The release of Apache Linkis 1.8.0 would not have been possible without the contributors to the Linkis community. Thank you to all community contributors.