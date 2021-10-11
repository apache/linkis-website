## **CS HA架构设计**

### 1，CS HA架构概要

#### （1）CS HA架构图

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-ha-01.png)

#### （2）要解决的问题

-   Context instance对象的HA

-   Client创建工作流时生成CSID请求

-   CS Server的别名列表

-   CSID统一的生成和解析规则

#### （3）主要设计思路

①负载均衡

当客户端创建新的工作流时，等概率随机请求到某台Server的HA模块生成新的HAID，HAID信息包含该主Server信息（以下称主instance），和备选instance，其中备选instance为剩余Server中负载最低的instance，以及一个对应的ContextID。生成的HAID与该工作流绑定且被持久化到数据库，并且随后该工作流所有变更操作请求都将发送至主instance，实现负载的均匀分配。

②高可用

在后续操作中，当客户端或者gateway判定主instance不可用时，会将操作请求转发至备instance处理，从而实现服务的高可用。备instance的HA模块会根据HAID信息首先验证请求合法性。

③别名机制

对机器采用别名机制，HAID中包含的Instance信息采用自定义别名，后台维护别名映射队列。在于客户端交互时采用HAID，而与后台其它组件交互则采用ContextID，在实现具体操作时采用动态代理机制，将HAID转换为ContextID进行处理。

### 2，模块设计

#### （1）模块图

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-ha-02.png)

#### （2）具体模块

①ContextHAManager模块

提供接口供CS Server调用生成CSID及HAID，并提供基于动态代理的别名转换接口；

调用持久化模块接口持久化CSID信息；

②AbstractContextHAManager模块

ContextHAManager的抽象，可支持实现多种ContextHAManager；

③InstanceAliasManager模块

RPC模块提供Instance与别名转换接口，维护别名映射队列，并提供别名与CS
Server实例的查询；提供验证主机是否有效接口；

④HAContextIDGenerator模块

生成新的HAID，并且封装成客户端约定格式返回给客户端。HAID结构如下：

\${第一个instance长度}\${第二个instance长度}{instance别名1}{instance别名2}{实际ID}，实际ID定为ContextID
Key；

⑤ContextHAChecker模块

提供HAID的校验接口。收到的每个请求会校验ID格式是否有效，以及当前主机是否为主Instance或备Instance：如果是主Instance，则校验通过；如果为备Instance，则验证主Instance是否失效，主Instance失效则验证通过。

⑥BackupInstanceGenerator模块

生成备用实例，附加在CSID信息里；

⑦MultiTenantBackupInstanceGenerator接口

（保留接口，暂不实现）

### 3. UML类图

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-ha-03.png)

### 4. HA模块操作时序图

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-ha-04.png)

第一次生成CSID:
由客户端发出请求，Gateway转发到任一Server，HA模块生成HAID，包含主Instance和备instance及CSID，完成工作流与HAID的绑定。

当客户端发送变更请求时，Gateway判定主Instance失效，则将请求转发到备Instance进行处理。备Instance上实例验证HAID有效后，加载Instance并处理请求。
