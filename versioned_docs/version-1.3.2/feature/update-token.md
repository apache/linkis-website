---
title: Modify the system initialization default Token
sidebar_position: 0.4
---

## 1. Requirement background

Linkis's original default Token is fixed and the length is too short, posing security risks. Therefore, Linkis 1.3.2 changes the original fixed Token to random generation, and increases the length of the Token.

Modified Token format: application abbreviation - 32-bit random number, such as BML-928a721518014ba4a28735ec2a0da799

Token may be used in the Linkis service itself, such as executing tasks through Shell, uploading BML, etc., or it may be used in other applications, such as DSS, Qualitis and other applications to access Linkis.


## 2. Instructions for use

### Token configuration required when Linkis uploads BML
When the Linkis service itself uses Token, the Token in the configuration file must be consistent with the Token in the database. Match by applying the short name prefix.

The token generated in the database can be queried by the following statement:

```sql
select * from linkis_mg_gateway_auth_token;
```

**$LINKIS_HOME/conf/linkis.properites file Token configuration**

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

### Use the linkis-cli command to execute task Token configuration

Modify $LINKIS_HOME/conf/linkis-cli/linkis-cli.properties file Token configuration
```properties
wds.linkis.client.common.tokenValue=BML-928a721518014ba4a28735ec2a0da799
```

## 3. Precautions

### Full installation

For the full installation of the new version of Linkis, the install.sh script will automatically process the configuration file and keep the database Token consistent. Therefore, the Token of the Linkis service itself does not need to be modified. Each application can query and use the new token through the management console.

### version upgrade

When the version is upgraded, the database Token is not modified, so there is no need to modify the configuration file and application Token.

### Token expiration problem

When the Token token is invalid or has expired, query the Token through the management console or sql statement. Check whether the Token used by the client is consistent with the database. If not, there are two solutions.

1. Modify the client configuration to make the Token settings consistent with the database.

2. Modify the Token configuration value of each application in the database. The old version database Token configuration reference is as follows

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