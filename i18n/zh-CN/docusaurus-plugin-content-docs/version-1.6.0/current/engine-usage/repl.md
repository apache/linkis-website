---
title: Repl
sidebar_position: 16
---

# Repl 引擎使用文档

本文主要介绍在 `Linkis` 中，`Repl` 引擎插件的安装、使用和配置。

## 1. 前置工作

### 1.1 引擎验证

强烈建议您在执行 `Repl` 任务之前，检查下执行用户的这些环境变量。具体方式是
```
sudo su - ${username}
echo ${JAVA_HOME}
```

## 2. 引擎插件安装

### 2.1 引擎插件准备[非默认引擎](./overview.md)

单独编译引擎插件（需要有 `maven` 环境）

```
# 编译
cd ${linkis_code_dir}/linkis-engineconn-plugins/repl/
mvn clean install 

# 编译出来的引擎插件包，位于如下目录中
${linkis_code_dir}/linkis-engineconn-plugins/repl/target/out/
```

[EngineConnPlugin 引擎插件安装](../deployment/install-engineconn.md)

### 2.2 引擎插件的上传和加载

将 2.1 中的引擎插件包上传到服务器的引擎目录下
```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
上传后目录结构如下所示
```
linkis-engineconn-plugins/
├── repl
│   ├── dist
│   │   └── 1
│   │       ├── conf
│   │       └── lib
│   └── plugin
│       └── 1
```
### 2.3 引擎刷新

#### 2.3.1 重启刷新
通过重启 `linkis-cg-linkismanager` 服务刷新引擎
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 检查引擎是否刷新成功
可以查看数据库中的 `linkis_engine_conn_plugin_bml_resources` 这张表的 `last_update_time` 是否为触发刷新的时间。

```sql
#登陆到linkis的数据库 
select * from linkis_cg_engine_conn_plugin_bml_resources;
```


## 3. Repl引擎的使用

### 3.1 通过 `Linkis-cli` 提交`java`任务

单个方法
```shell
 sh bin/linkis-cli -engineType repl-1  -code  \
"import org.apache.commons.lang3.StringUtils;
    public void sayHello() {
        System.out.println(\"hello\");
        System.out.println(StringUtils.isEmpty(\"hello\"));
    }" \
  -codeType repl -runtimeMap linkis.repl.type=java
```

多个方法
```shell
 sh bin/linkis-cli -engineType repl-1  -code  \
"import org.apache.commons.lang3.StringUtils;

    public void sayHello() {
        System.out.println(\"hello\");
        System.out.println(StringUtils.isEmpty(\"hello\"));
    }
    public void sayHi() {
        System.out.println(\"hi\");
        System.out.println(StringUtils.isEmpty(\"hi\"));
    }" \
  -codeType repl -runtimeMap linkis.repl.type=java -runtimeMap linkis.repl.method.name=sayHi
```

### 3.2 通过 `Linkis-cli` 提交`scala`任务

```shell
 sh bin/linkis-cli -engineType repl-1  -code  \
"import org.apache.commons.io.FileUtils
import java.io.File

val x = 2 + 3;
println(x);
FileUtils.forceMkdir(new File(\"/tmp/linkis_repl_scala_test\"));" \
  -codeType repl -runtimeMap linkis.repl.type=scala
```

更多 `Linkis-Cli` 命令参数参考： [`Linkis-Cli` 使用](../user-guide/linkiscli-manual.md)


Repl引擎，支持的连接参数有：

| 配置名称      | 备注及默认值信息                     | 是否必须                                   |
|-----------------|------------------------------|----------------------------------------|
| linkis.repl.type | repl类型，支持java和scala，默认值：java | 非必须 |
| linkis.repl.method.name   | 执行的方法名称，默认值为空   | 非必须 |
