---
title: Security
sidebar_position: 5
---

# Security

The Apache Software Foundation takes a rigorous stance on eliminating security issues in its software projects. Likewise, Apache Linkis is also vigilant and takes security issues related to its features and functionality into the highest consideration.

If you have any concerns regarding Linkis’s security, or you discover a vulnerability or potential threat, please don’t hesitate to get in touch with the [Apache Security Team](http://www.apache.org/security/) by dropping an email at [security@apache.org](mailto:security@apache.org).

Please specify the project name as "Linkis" in the email, and provide a description of the relevant problem or potential threat. You are also urged to recommend how to reproduce and replicate the issue.

The Apache Security Team and the Linkis community will get back to you after assessing and analyzing the findings.

**Please note** that the security issue should be reported on the security email first, before disclosing it on any public domain.

# Security fixes

## Linkis 1.3.2

### CVE-2023-27602


Problem description: The upload interface of FsRestfulApi has an overreach problem. By default, the user has the permissions of the corresponding directory. The interface does not verify the relative path when uploading files. As a result, the user can upload files to a directory that is not the user's permission by using the relative path.


Repair PR: https://github.com/apache/linkis/pull/4366



### CVE-2023-27603


Problem description: The material upload interface of FsRestfulApi has an overreach problem. The interface does not check the relative path. As a result, users upload materials to an illegal directory.


Repair PR: https://github.com/apache/linkis/pull/4400


### CVE-2023-27987


Problem description: The default Token length configured by Linkis is too short and fixed. Attackers can guess the Token value by brent-force exhaustion, resulting in security risks.


Repair PR: https://github.com/apache/linkis/pull/4349


### CVE-2023-29215 and CVE-2023-29216


Problem description: Linkis system data source module and JDBC engine connector plug-in, when configging Mysql link, background check coverage is not comprehensive. Unfiltered user-configured parameters such as allowLoadLocalInfile and autoDeserialize that have security risks.


Repair of PR: https://github.com/apache/linkis/pull/4412