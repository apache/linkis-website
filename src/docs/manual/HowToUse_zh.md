## 如何使用Linkis1.0  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis为了满足不同的使用场景需求，提供多种使用和接入方式，概括为三类，分别是Client端使用、Scriptis端使用、DataSphere Studio端使用，其中Scriptis和DataSphere Studio是微众银行大数据平台室开源的数据分析平台，由于这两个项目本质上完全兼容Linkis，所以通过Scriptis和DataSphere Studio使用Linkis最为简单。  
## 1. Client端使用  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果需要在Linkis的基础上，接入其它应用，需要针对Linkis提供的接口进行开发，Linkis提供了多种客户端接入接口，更详细的使用介绍可以参考以下内容：  
- [**Restful API使用方式**](./../API_Documentations/Linkis任务提交执行RestAPI文档.md)
- [**JDBC API使用方式**](./../API_Documentations/任务提交执行JDBC_API文档.md)
- [**Java SDK使用方式**](./../User_Manual/Linkis1.0用户使用文档.md)
## 2. Scriptis使用Linkis
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如果需要使用Linkis完成交互式在线分析处理的工作，并且不需要诸如工作流开发、工作流调度、数据服务等数据分析应用工具，可以单独安装[**Scriptis**](https://github.com/WeBankFinTech/Scriptis)，详细安装教程可参考其对应的安装部署文档。  
## 2.1. 使用Scriptis执行脚本
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目前Scriptis支持向Linkis提交多种任务类型，包括Spark SQL、Hive SQL、Scala、PythonSpark等，为了满足数据分析的需求，Scriptis左侧，提供查看用户工作空间信息、用户数据库和表信息、用户自定义函数，以及HDFS目录，同时支持上传下载，结果集导出等功能。Scriptis使用Linkis十分简单，可以很方便的在编辑栏书写脚本，提交到Linkis运行。  
![Scriptis使用Linkis](../Images/EngineUsage/sparksql-run.png)
## 2.2. Scriptis管理台
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Linkis提供资源配置和管理的接口，如果希望对任务资源进行配置管理，可以在Scriptis的管理台界面进行设置，包括队列设置、资源配置、引擎实例个数等。通过管理台，可以很方便的配置向Linkis提交任务的资源，使得更加方便快捷。  
![Scriptis使用Linkis](../Images/EngineUsage/queue-set.png)

## 3. DataSphere Studio使用Linkis
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[**DataSphere Studio**](https://github.com/WeBankFinTech/DataSphereStudio)简称DSS，是微众银行大数据平台开源的一站式数据分析处理平台，DSS交互式分析模块集成了Scriptis，使用DSS进行交互式分析和Scriptis一样，除了提供Scriptis的基本功能外，DSS提供和集成了更加丰富和强大的数据分析功能，包括用于数据提取的数据服务、开发报表的工作流、可视化分析软件Visualis等。由于原生的支持，目前DSS是与Linkis集成度最高的软件，如果希望使用完整的Linkis功能，建议使用DSS搭配Linkis一起使用。  
![DSS运行工作流](../Images/EngineUsage/workflow.png)
