---
title: proxy authentication
sidebar_position: 4
---


> This method allows the login user to be different from the actual user. The main function is to control that the user must be a real-name user when logging in, but a non-real-name user when actually using the big data platform. It is convenient to verify and control permissions.
> For example: when linkis executes the task submitted by the user, the linkis main process service will switch to the corresponding user through sudo -u ${submit user}, and then execute the corresponding engine start command,
> This requires creating a corresponding system user for each ${submit user} in advance, and configuring related environment variables. For new users, a series of environment initialization preparations are required,
> Frequent user changes will increase the cost of operation and maintenance, and there are too many users, it is impossible to configure resources for a single user, and resources cannot be well controlled. If A proxy can be implemented for the specified proxy user to execute, the execution entry can be uniformly converged to solve the problem of needing to initialize the environment.

## 1. Implementation logic introduction


- Login users: users who directly log in to the system through username and password
- Proxy user: The user who actually performs operations as a login user is called a proxy user, and the proxy login user performs related operations

For login cookie processing, parse out the login user and proxy user

```html
The key of the proxy user's cookie is: linkis_user_session_proxy_ticket_id_v1
Login user cookie: linkis_user_session_ticket_id_v1

```
The relevant interface of linkis can identify the proxy user information based on the UserName information, and use the proxy user to perform various operations. And record the audit log, including the user's task execution operation, download operation
When the task is submitted for execution, the entrance entry service modifies the executed user as the proxy user

## 2. How to use

### 2.1 Step1 Turn on proxy mode
Specify the following parameters in `linkis.properties`:
```shell script
# Turn on proxy mode
     wds.linkis.gateway.conf.enable.proxy.user=true
     # Specify the proxy configuration file
     wds.linkis.gateway.conf.proxy.user.config=proxy.properties
```

    
In the conf directory, create a `proxy.properties` file with the following content:
```shell script
# The format is as follows:
     ${LOGIN_USER}=${PROXY_USER}
     # For example:
     enjoyyin=hadoop
```
If the existing proxy mode cannot meet your needs, you can also further modify: `org.apache.linkis.gateway.security.ProxyUserUtils`.

### 2.2 Step2 Restart the service of linkis-mg-gateway

After modifying the configuration, you need to restart the `linkis-mg-gateway` service `sh sbin/linkis-daemon.sh start mg-mgtaeway` to take effect

## 3 Notes

- Users are divided into proxy users and non-proxy users. Proxy users cannot be proxied to other users for execution
- It is necessary to control the list of login users and system users who can be proxied, prohibit any proxy, and avoid uncontrollable permissions. It is best to support the configuration of the database table, and it can be directly modified to take effect without restarting the service
- A separate record log file contains the operations of the proxy user, such as proxy execution, function update, etc. PublicService proxy user operations are all recorded in the log, which is convenient for auditing