---
title: Repl Engine
sidebar_position: 15
---

# Repl engine usage documentation

This article mainly introduces the installation, use and configuration of the `Repl` engine plugin in `Linkis`.

## 1. Preliminary work

### 1.1 Engine Verification

It is strongly recommended that you check these environment variables for the executing user before executing `Repl` tasks. The specific way is

```
sudo su - ${username}
echo ${JAVA_HOME}
```

## 2. Engine plugin installation

### 2.1 Engine plugin preparation [non-default engine](./overview.md)

Compile the engine plug-in separately (requires a `maven` environment)

```
# compile
cd ${linkis_code_dir}/linkis-engineconn-plugins/repl/
mvn clean install 

# The compiled engine plug-in package is located in the following directory
${linkis_code_dir}/linkis-engineconn-plugins/repl/target/out/
```

[EngineConnPlugin engine plugin installation](../deployment/install-engineconn.md)

### 2.2 Upload and load engine plugins

Upload the engine plug-in package in 2.1 to the engine directory of the server

```bash 
${LINKIS_HOME}/lib/linkis-engineplugins
```
The directory structure after uploading is as follows
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
### 2.3 Engine refresh

#### 2.3.1 Restart and refresh
Refresh the engine by restarting the `linkis-cg-linkismanager` service
```bash
cd ${LINKIS_HOME}/sbin
sh linkis-daemon.sh restart cg-linkismanager
```

### 2.3.2 Check if the engine is refreshed successfully
You can check whether the `last_update_time` of this table in the `linkis_engine_conn_plugin_bml_resources` in the database is the time when the refresh is triggered.

```sql
#Login to the linkis database
select * from linkis_cg_engine_conn_plugin_bml_resources;
```


## 3. Use of Repl engine

### 3.1 Submit `java` tasks through `Linkis-cli`

Single method
```shell
 sh bin/linkis-cli -engineType repl-1  -code  \
"import org.apache.commons.lang3.StringUtils;
    public void sayHello() {
        System.out.println(\"hello\");
        System.out.println(StringUtils.isEmpty(\"hello\"));
    }" \
  -codeType repl -runtimeMap linkis.repl.type=java
```

Multiple methods
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

### 3.2 Submit `scala` tasks through `Linkis-cli`

```shell
 sh bin/linkis-cli -engineType repl-1  -code  \
"import org.apache.commons.io.FileUtils
import java.io.File

val x = 2 + 3;
println(x);
FileUtils.forceMkdir(new File(\"/tmp/linkis_repl_scala_test\"));" \
  -codeType repl -runtimeMap linkis.repl.type=scala
```

More `Linkis-Cli` command parameter reference: [`Linkis-Cli` usage](../user-guide/linkiscli-manual.md)

Repl engine supports connection parameters:

| Configuration name | Remarks and default value | Is it necessary |
| --- | --- | --- |
| linkis.repl.type | repl type, supports java and scala, default value: java | Optional |
| linkis.repl.method.name  | The name of the method to execute. The default value is null | Optional |
