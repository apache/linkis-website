---
title: Programming Specification
sidebar_position: 1
---
## 1. Naming Convention
1. [**Mandatory**] Do not use Chinese pinyin and unintelligible abbreviations
2. For basic Java naming conventions, please refer to [naming-conventions](https://alibaba.github.io/Alibaba-Java-Coding-Guidelines/#naming-conventions)
3. [Constraints] There is a scalastyle style configuration file in linkis, if it does not conform to the specification, you need to rename it according to the scalastyle style
4. [**Mandatory**] Configuration files, startup file, process name, configuration keys,etc. also need to comply with naming conventions, which are as follows:

|Classification| Style| Specifications| Examples|
|:---- |:--- |:--- |:--- |
|Configuration file|Separated by lowercase'-'| linkis-classification level (ps/cg/mg)-service name.propertis| linkis-cg-linkismanager.properties|
|Start-stop script|Separated by lowercase'-'| linkis-classification level-service name| linkis-cg-linkismanager|
|Module directory|Separated by lowercase'-'| The module directory must be below the corresponding classification level, and the module name is a subdirectory| linkis-public-enhancements/linkis-bml|
|Process naming|Camel case naming| Start with Linkis and end with service name| LinkisBMLApplication|
|Configuration Key Naming|Separated by lowercase'.'| linkis+module name+keyName| linkis.bml.hdfs.prefix|

## 2. Annotation Protocol
1. [**Mandatory**] The class, class attribute, interface method must be commented, and the comment must use the Javadoc specification, using the format of `/**content*/`
2. [**Mandatory**] All abstract methods (including methods in interfaces) must be annotated with Javadoc. In addition to return values, parameters, and exception descriptions, they must also indicate what the method does and what functions it implements
3. [**Mandatory**] All abstract methods (including methods in interfaces) must be annotated with Javadoc, indicating what the method does and does in addition to return values, parameters, and exception descriptions.



4. [**Mandatory**] method inside a single line comment, a separate line above the comment statement, use // comment. Multi-line comments inside methods use /* */ comments, aligned with code.



Example:

```java

// Store the reflection relation between parameter variable like 'T' and type like

Map&lt; String, Type&gt;  typeVariableReflect = new HashMap&lt; &gt; (a);
```

5. [**Mandatory**] All enumeration type fields must have a comment stating the purpose of each data item.



Example:

```java
/**
 * to monitor node status info
 */
public enum NodeHealthy {

  /**
   * healthy status
   */
  Healthy,
  
  /**
   * EM identifies itself as UnHealthy or
   * The manager marks it as abnormal in the status of UnHealthy processing engine.
   * The manager requests all engines to withdraw forcibly (engine suicide).
   */
  UnHealthy,

  /**
   * The engine is in the alarm state, but can accept tasks
   */
  WARN,

  /**
   * The stock is available and can accept tasks. When the EM status is not reported for the last n heartbeats,
   * the Engine that has been started is still normal and can accept tasks
   */
  StockAvailable,

  /**
   * The stock is not available. Tasks cannot be accepted
   */
  StockUnavailable;
```

6. [Recommendation] At the same time of code modification, comments should also be modified, especially parameters, return values, exceptions, core logic, etc.

7. [Recommendation] Delete any unused fields, methods, and inner classes from the class; Remove any unused parameter declarations and internal variables from the method.

8. Carefully comment out code. Specify above, rather than simply commenting it out. If no, delete it. There are two possibilities for the code to be commented out: 1) The code logic will be restored later. 2) Never use it. The former without the comment information, it is difficult to know the annotation motivation. The latter suggestion IS deleted directly CAN, if NEED to consult historical code, log in code WAREHOUSE can.


Example:

```java
     public static final CommonVars<String> TUNING_CLASS =
      CommonVars.apply(
          "wds.linkis.cs.ha.class", "org.apache.linkis.cs.highavailable.DefaultContextHAManager");
        // The following comment code should be removed
        // public static final CommonVars<String> TUNING_CLASS =
        // CommonVars.apply("wds.linkis.cs.ha.class","org.apache.linkis.cs.persistence.ProxyMethodA");
```

9. [Reference] for annotation requirements: first, can accurately reflect the design ideas and code logic; Second, be able to describe the business meaning, so that other programmers can quickly understand the information behind the code. A large piece of code with no comments at all is like a book to the reader. The comments are for the reader, even after a long time, they can clearly understand the thinking at that time. The comments are also for the successor to see, so that he can quickly take over his work.
