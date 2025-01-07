---
title: 安全问题
sidebar_position: 5
---

# 安全

Apache Software Foundation 在消除其软件项目中的安全问题方面采取了严格的立场。Apache Linkis 也十分关注与其特性和功能相关的安全问题。

如果您对 Linkis 的安全性感到担忧，或者您发现了漏洞或潜在的威胁，请不要犹豫与 [Apache 安全团队](http://www.apache.org/security/) 联系，发送邮件至 [security@apache.org](mailto:security@apache.org)。 在邮件中请指明项目名称为 Linkis，并提供相关问题或潜在威胁的描述。同时推荐重现和复制安全问题的方法。在评估和分析调查结果后，Apache 安全团队和 Linkis 社区将直接与您回复。

**请注意** 在提交安全邮件之前，请勿在公共领域披露安全电子邮件报告的安全问题。

# 安全漏洞修复

## Linkis 1.3.2 
### CVE-2023-27602

问题描述：FsRestfulApi的upload接口存在越权问题。用户默认是有自己对应目录的权限，该接口上传文件时缺少对相对路径的校验，导致用户可以使用相对路径的方式将文件上传至非该用户权限的目录下。

修复PR：https://github.com/apache/linkis/pull/4366

### CVE-2023-27603

问题描述：FsRestfulApi的物料上传接口存在越权问题。接口未做相对路径校验，导致用户上传物料是存在访问非法目录的情况。

修复PR：https://github.com/apache/linkis/pull/4400

### CVE-2023-27987

问题描述：Linkis 默认配置的 Token 长度太短且固定不变，攻击者可以用暴力穷举的方式猜出 Token 值，存在安全隐患。

修复PR：https://github.com/apache/linkis/pull/4349

### CVE-2023-29215 和 CVE-2023-29216

问题描述：Linkis 系统 数据源模块和 JDBC 引擎连接器插件，在配置 Mysql 链接的时候，后台校验覆盖不全面。未过滤掉用户配置的 allowLoadLocalInfile、autoDeserialize 等存在安全隐患的参数。

修复PR： https://github.com/apache/linkis/pull/4412