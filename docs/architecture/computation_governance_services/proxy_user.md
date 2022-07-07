---
title: Proxy User Mode
sidebar_position: 4
---

## 1 Background
At present, when linkis is executing the task submitted by the user, the main process service of linkis will switch to the corresponding user through sudo -u ${submit user}, and then execute the corresponding engine startup command.
This requires creating a corresponding system user for each ${submit user} in advance, and configuring relevant environment variables.
For new users, a series of environment initialization preparations are required. Frequent user changes will increase operation and maintenance costs, and there are too many users, so resources cannot be configured for a single user, and resources cannot be well managed. If the A agent can be executed to the designated agent user, the execution entry can be converged uniformly, and the problem of needing to initialize the environment can be solved.

## 2 Basic Concepts
- Login user: the user who directly logs in to the system through the user name and password
- Proxy user: The user who actually performs the operation as the login user is called the proxy user, and the related operations of the proxy login user

## 3 Goals achieved
- Login user A can choose a proxy user and decide which proxy user to proxy to
- Login user A can delegate tasks to proxy user B for execution
- When logging in to user A as an agent to agent user B, you can view B-related execution records, task results and other data
- A proxy user can proxy multiple login users at the same time, but a login user can only be associated with a certain proxy user at the same time

## 4 Realize the general idea

Modify the existing interface cookie processing, which needs to be able to parse out the logged-in user and proxy user in the cookie
```html
The key of the proxy user's cookie is: linkis_user_session_proxy_ticket_id_v1
Login user's cookie: linkis_user_session_ticket_id_v1

````

- The relevant interface of linkis needs to be able to identify the proxy user information based on the original UserName obtained, and use the proxy user to perform various operations. And record the audit log, including the user's task execution operation, download operation
- When the task is submitted for execution, the entry service needs to modify the executing user to be the proxy user

## 5 Things to Consider & Note

- Users are divided into proxy users and non-proxy users. Users of proxy type cannot perform proxying to other users again.
- It is necessary to control the list of logged-in users and system users who can be proxied, to prohibit the occurrence of arbitrary proxies, and to avoid uncontrollable permissions. It is best to support database tables to configure, and can be directly modified to take effect without restarting the service
- Separately record log files containing proxy user operations, such as proxy execution, function update, etc. All proxy user operations of PublicService are recorded in the log, which is convenient for auditing