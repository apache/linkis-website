---
title: pipeline 引擎
sidebar_position: 10
---

本文主要介绍`pipeline`(>=1.1.0版本支持)引擎的配置、部署和使用。

## 1 环境要求

如果您希望部署使用`pipeline`引擎，您需要准备一套可用的`pipeline`环境。

## 2 配置和部署

### 2.1 版本的选择和编译
注意: 编译`pipeline`引擎之前需要进行linkis项目全量编译  
目前`pipeline`引擎，需自行安装部署

发布的安装部署包中默认不包含此引擎插件，
你可以按此指引部署安装 https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin
或者按以下流程，手动编译部署

单独编译`pipeline`

```
${linkis_code_dir}/linkis-enginepconn-pugins/engineconn-plugins/pipeline/
mvn clean install
```

### 2.2 物料的部署和加载

将 2.1 步编译出来的引擎包,位于

```bash
${linkis_code_dir}/linkis-engineconn-plugins/engineconn-plugins/pipeline/target/out/pipeline
```
上传到服务器的引擎目录下

```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```

并重启linkis-engineplugin进行引擎刷新
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-engineplugin
```
或通过引擎接口进行刷新，引擎放置到对应目录后，通过http接口向linkis-cg-engineconnplugin 服务发送刷新请求即可。

- 接口 `http://${engineconn-plugin-server-IP}:${port}/api/rest_j/v1/rpc/receiveAndReply`

- 请求方式 `POST`

```json
{
  "method": "/enginePlugin/engineConn/refreshAll"
}
```
检查引擎是否刷新成功：如果在刷新过程中遇到问题，需要确认是否刷新成功，则可以查看数据库中的linkis_engine_conn_plugin_bml_resources这张表的last_update_time是否为触发刷新的时间。

```sql
#登陆到linkis的数据库 
select *  from linkis_cg_engine_conn_plugin_bml_resources
```

### 2.3 引擎的标签

Linkis1.X是通过标签来进行的，所以需要在我们数据库中插入数据，插入的方式如下文所示。

[EngineConnPlugin引擎插件安装](deployment/engine_conn_plugin_installation.md) 


## 3 引擎的使用

### 3.1 通过Linkis-cli进行任务提交

Linkis 1.0后提供了cli的方式提交任务，我们只需要指定对应的EngineConn和CodeType标签类型即可，pipeline的使用如下：
- 注意 `engineType pipeline-1` 引擎版本设置是有前缀的  如 `pipeline` 版本为`v1` 则设置为 `pipeline-1`
```shell
sh bin/linkis-cli -submitUser  hadoop  -engineType pipeline-1  -codeType pipeline  -code "from hdfs:///000/000/000/A.dolphin  to file:///000/000/000/B.csv"
```
`from hdfs:///000/000/000/A.dolphin  to file:///000/000/000/B.csv` 该内容 3.3有解释

具体使用可以参考： [Linkis CLI Manual](user_guide/linkiscli_manual.md).


因为`pipeline`引擎主要用来导入导出文件为主，现在我们假设从A向B导入文件最为介绍案例

### 3.2 新建脚本 
工作空间模块右键选择新建一个类型为`storage`的脚本

![](/Images-zh/EngineConnNew/new_pipeline_script.png)

### 3.3 编写脚本
A文件向B文件夹导入脚本 
```bash
from hdfs:///000/000/000/A.csv to file:///000/000/000/B.csv
```
- `from` 语法，`to`：语法
- `hdfs:///000/000/000/A.csv`： 输出文件路径及文件
- `file:///000/000/000/B.csv`： 输入文件路径及文件

B文件向A文件夹导入脚本
```bash
from hdfs:///000/000/000/B.csv to file:///000/000/000/A.CSV
```
- `hdfs:///000/000/000/B.csv`： 输出文件路径及文件
- `file:///000/000/000/B.csv`： 输入文件路径及文件

![](/Images-zh/EngineConnNew/to_write.png)

注意：语法末端不能带分号；否则语法错误。

### 3.4 结果
进度 

![](/Images-zh/EngineConnNew/job_state.png)

历史记录

![](/Images-zh/EngineConnNew/historical_information.png)
