---
title: 修改系统初始化默认 Token
sidebar_position: 0.4
--- 

## 1. 需求背景

Linkis 原有默认 Token 固定且长度太短存在安全隐患。因此 Linkis 1.3.2 将原有固定 Token 改为随机生成，并增加 Token 长度。

修改后 Token 格式：应用简称-32 位随机数，如BML-928a721518014ba4a28735ec2a0da799

Token 可能在 Linkis 服务自身使用，如通过 Shell 方式执行任务、BML 上传等，也可能在其它应用中使用，如 DSS、Qualitis 等应用访问 Linkis。


## 2. 使用说明

### Linkis 上传 BML 时所需 Token 配置
Linkis 服务本身使用 Token 时，配置文件中 Token 需与数据库中 Token 一致。通过应用简称前缀匹配。

数据库中生成的 token 可通过如下语句查询：

```sql
select * from linkis_mg_gateway_auth_token;
```

**$LINKIS_HOME/conf/linkis.properites 文件 Token 配置**

```
linkis.configuration.linkisclient.auth.token.value=BML-928a721518014ba4a28735ec2a0da799
wds.linkis.client.common.tokenValue=BML-928a721518014ba4a28735ec2a0da799
wds.linkis.bml.auth.token.value=BML-928a721518014ba4a28735ec2a0da799
wds.linkis.context.client.auth.value=BML-928a721518014ba4a28735ec2a0da799
wds.linkis.errorcode.auth.token=BML-928a721518014ba4a28735ec2a0da799

wds.linkis.client.test.common.tokenValue=LINKIS_CLI-215af9e265ae437ca1f070b17d6a540d

wds.linkis.filesystem.token.value=WS-52bce72ed51741c7a2a9544812b45725
wds.linkis.gateway.access.token=WS-52bce72ed51741c7a2a9544812b45725

wds.linkis.server.dsm.auth.token.value=DSM-65169e8e1b564c0d8a04ee861ca7df6e
```

### 使用 linkis-cli 命令执行任务 Token 配置

修改 $LINKIS_HOME/conf/linkis-cli/linkis-cli.properties文件 Token 配置
```properties
wds.linkis.client.common.tokenValue=BML-928a721518014ba4a28735ec2a0da799
```

## 3. 注意事项

### 全量安装

对于全量安装新版本 Linkis 时， install.sh 脚本中会自动处理配置文件和数据库 Token 保持一致。因此 Linkis 服务自身 Token 无需修改。各应用可通过管理台查询并使用新 Token。

### 版本升级

版本升级时，数据库 Token 并未修改，因此无需修改配置文件和应用 Token。

### Token 过期问题

当遇到 Token 令牌无效或已过期问题时，通过管理台或者 sql 语句查询 Token。检查客户端使用的 Token 是否与数据库一致，若不一致有两种解决办法。

1. 修改客户端配置，将 Token 设置位与数据库一致。

2. 修改数据库各应用 Token 配置值。旧版本数据库 Token 配置参考如下

```sql
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('QML-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('BML-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('WS-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('dss-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('QUALITIS-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('VALIDATOR-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('LINKISCLI-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('DSM-AUTH','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
INSERT INTO `linkis_mg_gateway_auth_token`(`token_name`,`legal_users`,`legal_hosts`,`business_owner`,`create_time`,`update_time`,`elapse_day`,`update_by`) VALUES ('LINKIS_CLI_TEST','*','*','BDP',curdate(),curdate(),-1,'LINKIS');
```