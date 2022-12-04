---
title: 沙箱在线体验
sidebar_position: 1
---

##  1. 沙箱环境使用流程

### 1.1 获取邀请码

扫描以下二维码，添加“开源社区小助手”，根据小助手提示，提供相关信息获取邀请码。 

|微信小助手|微信公众号|
|:---|---|
|<img src="https://linkis.apache.org/Images/wedatasphere_contact_01.png" width="128"/>|<img src="https://linkis.apache.org/Images/gzh_01.png " width="128"/>|


### 1.2 注册和登录使用

通过1.1获取到邀请码后，即可进行注册和使用。

第一步：打开注册页面链接 https://dss-open.wedatasphere.com/#/register，填写相关信息，成功注册

![图片](/Images/quick/live-demo/640-16676643563412.jpeg)

第二步：打开DSS沙箱页面 https://dss-open.wedatasphere.com/#/login，用注册的账号和密码进行登录；

- 登录账号：注册的手机号；
- 登录密码：手机号后六位数字； 

![图片](/Images/quick/live-demo/640-16676643776464.png)

### 1.3 界面说明

**重要说明：出于安全考虑，沙箱环境不支持`新增/修改`等操作，仅支持查询/查看的功能。**



（1）成功登陆账户之后，会跳转到DSS的首页。首页顶部默认包括了管理台和Scriptis的入口，也可以添加其他组件入口到顶部导航栏。在首页进行切换工作空间，选中工作空间中的项目。目前已配置了**AIIDEMO**供大家体验，点击对应的项目即可。 

![图片](/Images/quick/live-demo/640-16676644060226.png)

（2）管理台：Linkis计算治理管理台，在这个页面能够看到所有脚本执行的情况、对全局资源进行管理、对参数和变量配置进行配置、进行数据源和UDF管理，是个非常重要的页面；

![图片](/Images/quick/live-demo/640-16676644199108.png)

（3）Scriptis：支持在线写SQL、Pyspark、HiveQL等脚本，提交给Linkis执行的数据分析Web工具，且支持UDF、函数、资源管控和智能诊断等企业级特性。目前沙箱环境出于安全考虑，没有提供python、shell的demo。   

![图片](/Images/quick/live-demo/640-1667665078278140.png)     



### 1.4 导航栏配置

为了更快捷的使用Qualitis、Scheduis、Visualis、Exchangis组件，可以把相对应的入口添加到顶部导航栏。操作方法：点击左上角入口，把对应的组件添加到导航栏。

![图片](/Images/quick/live-demo/640-1667665075544138.png)


## 2. 创建项目和工作流

出于安全考虑，目前沙箱环境暂不支持创建项目和工作流的功能。各位开发者可以在自行搭建的环境中按照以下步骤进行使用。

DSS支持使用工作流的方式，接下来跟着我一步一步来使用。

（1）在工作空间“bdapWorkspace”中点击“创建项目”；

![图片](/Images/quick/live-demo/640-1667665073311136.png)

（2）在弹窗中填入项目的参数，如下图

![图片](/Images/quick/live-demo/640-1667665070215134.jpeg)

由于沙箱环境出于安全考虑，禁止创建工程，因此会提示以下错误。自行搭建DSS环境，可以按照上述方法进行创建工程。

![图片](/Images/quick/live-demo/640-1667665067662132.png)



（3）创建成功后在首页可以看到项目 BI_20220804；

![图片](/Images/quick/live-demo/640-1667665065638130.png)



（4）点击进入创建好的项目“BI_20220804 ”，点击添加工作流

![图片](/Images/quick/live-demo/640-1667665062469128.png)



（5）填写工作流信息

![图片](/Images/quick/live-demo/640-1667665059998126.png)





（6）进入项目工作流DEMO，我们可以看到完整的工作流界面了；

![图片](/Images/quick/live-demo/640-1667665057158124.png)



## 3. DEMO工作流组件说明

目前支持7类工作流节点，使用这类节点可以完成数据同步、数据分析、数据质量管理、数据可视化等任务。

我们直接进入AIIDEMO，点击执行，运行整个DEMO。

![图片](/Images/quick/live-demo/640-1667665054421122.png)



### 3.1 数据交换

使用sqoop节点，让dss与目标数据库之间进行数据交换。

（1）双击“Data Sync”数据交换节点；

![图片](/Images/quick/live-demo/640-1667665051613120.png)



（2）进入到节点编辑界面，可以看到节点的详情；从Hvie同步数据到MYSQL中；

![图片](/Images/quick/live-demo/640-1667665048477118.png)



（3）点击数据源Hive，在弹窗中看到数据源的配置详情，数据源为：“bdptest10_db.presure_testx”

![图片](/Images/quick/live-demo/640-1667665045325116.png)



（4）点击要同步到的数据库为：dss_meta_open.presure_testx

![图片](/Images/quick/live-demo/640-1667665042221114.png)

![图片](/Images/quick/live-demo/640-1667665040045112.png)



（5）同步的字段为：objectid，intcolumn、doublecolumn、floatcolumn；

![图片](/Images/quick/live-demo/640-1667665037278110.png)

（6）我们也可以通过顶部导航栏“Exchangis”进入组件页面，可以查看到全部的数据交换节点和进行数据交换管理。

![图片](/Images/quick/live-demo/640-1667665033853108.jpeg)



### 3.2 数据开发

支持sql、python、pyspark、shell等语言，用于数据开发。直接把节点拖出来，然后双击进入节点的界面进行撰写代码。

（1）我们在DEMO双击“source_data”节点；

![图片](/Images/quick/live-demo/640-1667665030566106.png)



（2）进入编辑界面，撰写对应的脚本语言，进行执行，即可得到相关的执行结果；

![图片](/Images/quick/live-demo/640-1667665027816104.png)



### 3.3 数据质量

使用qualitis进行数据质量校验。

（1）点击数据质量节点“qualitis_200”

![图片](/Images/quick/live-demo/640-1667665025253102.png)



（2）进入数据校验界面，看到当前配置的校验规则；

![图片](/Images/quick/live-demo/640-1667665021038100.png)



（3）通过点击上图中的添加规则，选择不同的校验模板；

![图片](/Images/quick/live-demo/640-166766501764598.png)



（4）通过点击顶部导航菜单“Qualitis”直接进入数据质量的管理台。

![图片](/Images/quick/live-demo/640-166766501543896.png)



### 3.4 可视化

使用visualis组件进行可视化BI分析。在沙箱环境中，有**DEMO**完整的例子可以进行参考。

（1）选中项目，点击“执行”；等待全部执行成功；

![图片](/Images/quick/live-demo/640-166766501239894.png)



（2）点击对应的数据可视化节点，可以看到已经生成的数据图表。

![图片](/Images/quick/live-demo/640-166766501000692.png)

![图片](/Images/quick/live-demo/640-166766500771790.png)





（3）可以通过点击顶部导航菜单“Visualis”直接进入可视化管理台，里面可以看到跟可视化相关的组件。

![图片](/Images/quick/live-demo/640-166766500170288.png)        

（4）如果想进一步详细了解可视化能力，请查看视频教程《使用 DataSphere Studio(DSS)实现大数据可视化》：https://www.bilibili.com/video/BV1xY4y1t7Ma

![图片](/Images/quick/live-demo/640-166766499746286.png)

###  

### **3.5 信号节点**

目前支持三种功能节点，分别为：datachecker、eventsender、eventreceiver。信号节点常用的场景：

1. 在跑批量工作任务前需要检查数据是否齐全，可以使用datachecker；
2. 完成某项工作后，需要通知其他工作流进行工作，使用eventsender进行发送通知；
3. 使用eventreceiver监听信号，一旦接收到eventsender发过来的信号，就执行相对应的工作任务；  

![图片](/Images/quick/live-demo/640-166766499277484.png)



### **3.6 功能节点**

支持connector和subFlow节点。

（1）connector节点仅作为工作流的连接节点，不承担任何功能。

（2）subFlow是子工作流节点，可以理解为单独的工作流。在复杂的工作流场景中可以使用subFlow节点简化主工作流的流程。

![图片](/Images/quick/live-demo/640-166766498331782.png)



### **3.7 数据输出**

支持通过邮件发送的方式

![图片](/Images/quick/live-demo/640-166766497457380.png)   

###  

### **3.8 调度中心**

（1）当我们在编辑模式中完成了工作流开发和测试后，可以点击“发布”按钮，直接发布到调度中心。

![图片](/Images/quick/live-demo/640-166766496979878.png)



（2）点击“前往调度中心”或者通过导航顶部的“Schedulis”都可以进入到调度中心管理台。在调度中心中可以进行调度管理，查看工作流状态。

![图片](/Images/quick/live-demo/640-166766445336610.png)

## **4. 常见错误**

目前沙箱环境仅开放部分功能给社区开发者进行体验，通过使用沙箱环境能有助于开发者快速了解WDS生态。

出于安全考虑，沙箱环境仅提供查看/查询/执行等功能，如出现“沙箱环境仅允许执行有限的查询操作”、“沙箱环境不许创建工程”、“后台接口异常，请联系开发处理”等等的错误提示，属于正常现象。

如有任何疑问，请微信联系小助手进行反馈。

![图片](/Images/quick/live-demo/640.jpeg)
