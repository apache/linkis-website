## **CSCache架构**
### **需要解决的问题**

###  1.1. 内存结构需要解决的问题：

1. 支持按ContextType进行拆分：加快存储和查询性能

2. 支持按不同得ContextID进行拆分：需要完成ContextID见元数据隔离

3. 支持LRU：按照特定算法进行回收

4. 支持按关键字进行检索：支持通过关键字进行索引

5. 支持索引：支持直接通过ContextKey进行索引

6. 支持遍历：需要支持通过按照ContextID、ContextType进行遍历

###  1.2 加载与解析需要解决的问题：

1. 支持将ContextValue解析成内存数据结构：需要完成对ContextKey和value解析出对应的关键字。

2. 需要与与Persistence模块进行对接完成ContextID内容的加载与解析

###  1.3 Metric和清理机制需要解决的问题：

1. 当JVM内存不够时能够基于内存使用和使用频率的清理

2. 支持统计每个ContextID的内存使用情况

3. 支持统计每个ContextID的使用频率

## **ContextCache架构**

ContextCache的架构如下图展示：

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-01.png)

1.  ContextService：完成对外接口的提供，包括增删改查；

2.  Cache：完成对上下文信息的存储，通过ContextKey和ContextValue进行映射存储

3.  Index：建立的关键字索引，存储的是上下文信息的关键字和ContextKey的映射；

4.  Parser：完成对上下文信息的关键字解析；

5.  LoadModule当ContextCache没有对应的ContextID信息时从持久层完成信息的加载；

6.  AutoClear：当Jvm内存不足时完成对ContextCache进行按需清理；

7.  Listener：用于手机ContextCache的Metric信息，如：内存占用、访问次数。

## **ContextCache存储结构设计**

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-02.png)

ContextCache的存储结构划分为了三层结构：

**ContextCach：**存储了ContextID和ContextIDValue的映射关系，并能够完成ContextID按照LRU算法进行回收；

**ContextIDValue：**拥有存储了ContextID的所有上下文信息和索引的CSKeyValueContext。并统计ContestID的内存和使用记录。

**CSKeyValueContext：**包含了按照类型存储并支持关键词的CSInvertedIndexSet索引集，还包含了存储ContextKey和ContextValue的存储集CSKeyValueMapSet。

CSInvertedIndexSet：通过CSType进行分类存储关键词索引

CSKeyValueMapSet：通过CSType进行分类存储上下文信息

## **ContextCache UML类图设计**

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-03.png)

## **ContextCache 时序图**

下面的图绘制了以ContextID、KeyWord、ContextType去ContextCache中查对应的ContextKeyValue的整体流程。
![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-04.png)

说明：其中ContextIDValueGenerator会去持久层拉取ContextID的Array[ContextKeyValue]，并通过ContextKeyValueParser解析ContextKeyValue的关键字存储索引和内容。

ContextCacheService提供的其他接口流程类似，这里不再赘述。

## **KeyWord解析逻辑**

ContextValue具体的实体Bean需要在对应可以作为keyword的get方法上面使用注解\@keywordMethod,比如Table的getTableName方法必须加上\@keywordMethod注解。

![](../../../Images/Architecture/Public_Enhancement_Service/ContextService/linkis-contextservice-cache-05.png)

ContextKeyValueParser在解析ContextKeyValue的时候，会去扫描传入的具体对象的所有被KeywordMethod修饰的注解并调用该get方法获得返回对象toString并会通过用户可选的规则进行解析，存入keyword集合里面。规则有分隔符，和正则表达式

注意事项：

1.  该注解会定义到cs的core模块

2.  被修饰的Get方法不能带参数

3.  Get方法的返回对象的toSting方法必须返回的是关键字
