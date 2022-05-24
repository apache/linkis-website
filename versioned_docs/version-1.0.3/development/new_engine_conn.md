---
title: How To Quickly Implement A New Engine
sidebar_position: 3
---

## 1. Linkis new engine function code implementation

Implementing a new engine is actually implementing a new EngineConnPlugin (ECP) engine plugin. Specific steps are as follows:

### 1.1 Create a new maven module and introduce the maven dependency of ECP

![新引擎模块](http://leo-jie-pic.oss-cn-beijing.aliyuncs.com/blog/d8ar3.png)

```xml
<dependency>
	<groupId>org.apache.linkis</groupId>
	<artifactId>linkis-engineconn-plugin-core</artifactId>
	<version>${linkis.version}</version>
</dependency>
<!-- and some other required maven configurations -->
```

### 1.2 Implement the main interface of ECP

- **EngineConnPlugin：**When starting EngineConn, first find the corresponding EngineConnPlugin class, and use this as the entry point to obtain the implementation of other core interfaces, which is the main interface that must be implemented.

- **EngineConnFactory：**Implementing the logic of how to start an engine connector and how to start an engine executor is an interface that must be implemented.
    - Implement the createEngineConn method：Returns an EngineConn object, where getEngine returns an object that encapsulates the connection information with the underlying engine, and also contains the Engine type information.
    - For engines that only support a single computing scenario, inherit SingleExecutorEngineConnFactory, implement createExecutor, and return the corresponding Executor.
    - For engines that support multi-computing scenarios, you need to inherit MultiExecutorEngineConnFactory and implement an ExecutorFactory for each computation type. EngineConnPlugin will obtain all ExecutorFactory through reflection, and return the corresponding Executor according to the actual situation.
- **EngineConnResourceFactory：**It is used to limit the resources required to start an engine. Before the engine starts, it will apply for resources from Linkis Manager based on this. Not required, GenericEngineResourceFactory can be used by default.
- **EngineLaunchBuilder：**It is used to encapsulate the necessary information that EngineConnManager can parse into startup commands. Not required, you can directly inherit JavaProcessEngineConnLaunchBuilder.

### 1.3 Implement the engine Executor executor logic

Executor is an executor. As a real computing scene executor, it is an actual computing logic execution unit and an abstraction of various specific capabilities of the engine. It provides various services such as locking, accessing status, and obtaining logs. And according to the actual needs, Linkis provides the following derived Executor base classes by default. The class names and main functions are as follows:

- **SensibleExecutor：**
    - Executor exists in multiple states, allowing Executor to switch states
    - After the executor switches states, operations such as notifications are allowed
- **YarnExecutor：**Refers to the Yarn type engine, which can obtain applicationId, applicationURL and queue.
- **ResourceExecutor：**It means that the engine has the ability to dynamically change resources, and provides the requestExpectedResource method, which is used to apply for a new resource to the RM every time you want to change the resource; and the resourceUpdate method is used to report to the RM every time the actual resource used by the engine changes. resource situation.
- **AccessibleExecutor：**Is a very important Executor base class. If the user's Executor inherits this base class, it means that the Engine can be accessed. Here, it is necessary to distinguish between the state() of SensibleExecutor and the getEngineStatus() method of AccessibleExecutor: state() is used to obtain the engine status, and getEngineStatus() will obtain the Metric data of basic indicators such as the status, load, and concurrency of the engine.
- At the same time, if AccessibleExecutor is inherited, it will trigger the Engine process to instantiate multiple EngineReceiver methods. EngineReceiver is used to process RPC requests from Entrance, EM and LinkisMaster, making the engine an accessible engine. If users have special RPC requirements, they can communicate with AccessibleExecutor by implementing the RPCService interface.
- **ExecutableExecutor：**It is a resident Executor base class. The resident Executor includes: Streaming application in the production center, steps specified to run in independent mode after submitting to Schedulelis, business applications for business users, etc.
- **StreamingExecutor：**Streaming is a streaming application, inherited from ExecutableExecutor, and needs to have the ability to diagnose, do checkpoint, collect job information, and monitor alarms.
- **ComputationExecutor：**It is a commonly used interactive engine Executor, which handles interactive execution tasks and has interactive capabilities such as status query and task kill.

### 1.4 Practical case of engine function implementation

The following uses the Hive engine as an example to illustrate the implementation of each interface.

The Hive engine is an interactive engine, so when implementing Executor, it inherits ComputationExecutor and does
The introduction of the following maven dependencies:

```xml
<dependency>
	<groupId>org.apache.linkis</groupId>
	<artifactId>linkis-computation-engineconn</artifactId>
	<version>${linkis.version}</version>
</dependency>
```

As a subclass of ComputationExecutor, HiveEngineConnExecutor implements the executeLine method, which receives a line of execution statement, calls the Hive interface for execution, and returns a different ExecuteResponse to indicate success or failure. At the same time, in this method, the transmission of result sets, logs and progress is realized through the interface provided in the parameter engineExecutorContext.

Hive's engine is an Executor that only needs to execute HQL. It is an engine of a single executor. Therefore, when defining HiveEngineConnFactory, it inherits SingleExecutorEngineConnFactory and implements the following two interfaces:

- **createEngineConn：**An object containing UserGroupInformation, SessionState and HiveConf is created as a package for the connection information with the underlying engine, set to the EngineConn object and returned.
- **createExecutor：**Create a HiveEngineConnExecutor executor object based on the current engine connection information.

The Hive engine is an ordinary Java process, so when implementing EngineConnLaunchBuilder, it directly inherits JavaProcessEngineConnLaunchBuilder. Things like memory size, Java parameters and classPath can be adjusted by configuration, see EnvConfiguration class for details.

The Hive engine uses the LoadInstanceResource resource, so there is no need to implement the EngineResourceFactory, and the default GenericEngineResourceFactory is directly used to adjust the number of resources through configuration. For details, refer to the EngineConnPluginConf class.

Implement HiveEngineConnPlugin and provide the creation method of the above implementation class.

## 2. Take the actual extension engine as an example to explain the next steps of the new engine implementation in detail

The Kyuubi engine is not yet supported on the official branch of Linkis. You can use the jdbc engine to connect to the kyuubi service to execute the corresponding script. This article takes the Kyuubi engine implemented in the Linkis branch maintained by Hehe Information as an example to implement a new engine for user expansion. In addition to the code itself, some additional configuration or modification is required.

### 2.1 engine code preparation

The code implementation of the Kyuubi engine in the Hehe Linkis branch is relatively simple, and it is a copy of the JDBC engine module. The difference is that the abstract class inherited from the core class `JDBCEngineConnExecutor` in the JDBC engine is `ConcurrentComputationExecutor`, and the abstract class inherited from the core class `KyuubiJDBCEngineConnExecutor` in the Kyuubi engine is `ComputationExecutor`. This leads to the biggest difference between the two: the JDBC engine instance is started by the administrator user and is shared by all users; when the Kyuubi type script is submitted, each user will start an engine instance, and the engine instances between users are isolated from each other. In fact, for JDBC-type engines, the standardized approach is to use the concurrent engine feature to avoid each user from pulling up an engine instance, resulting in low machine resource utilization. This will not be discussed in detail here, because whether it is a concurrent engine or a non-concurrent engine Engine, the additional modification process mentioned below should be consistent.

Correspondingly, if your new engine is a concurrent engine, then you need to pay attention to this class: AMConfiguration.scala, if your new engine is a computing engine, you can ignore it.

```scala
object AMConfiguration {
  // If your engine is a multi-user concurrent engine, then this configuration item needs to be paid attention to
  val MULTI_USER_ENGINE_TYPES = CommonVars("wds.linkis.multi.user.engine.types", "jdbc,ck,es,io_file,appconn")
  
    private def getDefaultMultiEngineUser(): String = {
    // This should be to set the startup user when the concurrent engine is pulled up. The default jvmUser is the startup user of the engine service Java process.
    val jvmUser = Utils.getJvmUser
    s"""{jdbc:"$jvmUser", presto: "$jvmUser", kyuubi: "$jvmUser", es: "$jvmUser", ck:"$jvmUser", appconn:"$jvmUser", io_file:"root"}"""
  }
}
```

### 2.2 New engine type extension

In the class `KyuubiJDBCEngineConnFactory` that implements the `ComputationSingleExecutorEngineConnFactory` interface, the following two methods need to be implemented:

```scala
override protected def getEngineConnType: EngineType = EngineType.KYUUBI

override protected def getRunType: RunType = RunType.KYUUBI
```

Therefore, it is necessary to add variables corresponding to Kyuubi in EngineType and RunType.

```scala
// Similar to the variable definition of the existing engine in EngineType, add Kyuubi related variables or codes
object EngineType extends Enumeration with Logging {
  val KYUUBI = Value("kyuubi")
}

def mapStringToEngineType(str: String): EngineType = str match {
  case _ if KYUUBI.toString.equalsIgnoreCase(str) => KYUUBI
}

// RunType中
object RunType extends Enumeration {
	val KYUUBI = Value("kyuubi")
}
```

### 2.3 Version number settings in Kyuubi engine tags

```scala
// Add kyuubi version configuration in LabelCommonConfig
public class LabelCommonConfig {
      public final static CommonVars<String> KYUUBI_ENGINE_VERSION = CommonVars.apply("wds.linkis.kyuubi.engine.version", "1.4");
}

// Supplement kyuubi's matching logic in the init method of EngineTypeLabelCreator
// If this step is not done, when the code is submitted to the engine, the version number will be missing from the engine tag information
public class EngineTypeLabelCreator {
	private static void init() {
    defaultVersion.put(EngineType.KYUUBI().toString(), LabelCommonConfig.KYUUBI_ENGINE_VERSION.getValue());
  }
}
```

### 2.4 Allow kyuubi type script files to be opened in Scripts

Add a new engine script type to the fileType array. If it is not added, the script type of the new engine is not allowed to be opened in the Scripts file list.

```scala
// FileSource.scala中
object FileSource {
    private val fileType = Array("......", "kyuubi")
}
```

### 2.5 Configure kyuubi script variable storage and parsing

If this operation is not done, the variables in the script of the new engine kyuubi cannot be stored and parsed, and the code will fail to execute when ${variable} is used directly in the script!

![脚本变量](http://leo-jie-pic.oss-cn-beijing.aliyuncs.com/blog/rb5z6.png)

In versions prior to Linkis-1.0.3:

```scala
// QLScriptCompaction.scala
class QLScriptCompaction private extends CommonScriptCompaction{
    override def belongTo(suffix: String): Boolean = {
    suffix match {
      ...
      case "kyuubi" => true
      case _ => false
    }
  }
}

// QLScriptParser.scala
class QLScriptParser private extends CommonScriptParser {
  override def belongTo(suffix: String): Boolean = {
    suffix match {
      case "kyuubi" => true
      case _ => false
    }
  }
}

// CustomVariableUtils.scala中
object CustomVariableUtils extends Logging {
   def replaceCustomVar(jobRequest: JobRequest, runType: String): (Boolean, String) = {
    runType match {
      ......
      case "hql" | "sql" | "fql" | "jdbc" | "hive"| "psql" | "presto" | "ck" | "kyuubi" => codeType = SQL_TYPE
      case _ => return (false, code)
    }
   }
}
```

After Linkis-1.1.2:

```scala
// The correspondence between codeType and runType is maintained through the CODE_TYPE_AND_RUN_TYPE_RELATION variable in the CodeAndRunTypeUtils tool class
  val CODE_TYPE_AND_RUN_TYPE_RELATION = CommonVars("wds.linkis.codeType.runType.relation", "sql=>sql|hql|jdbc|hive|psql|fql|kyuubi,python=>python|py|pyspark,java=>java,scala=>scala,shell=>sh|shell")
```

refer to：https://github.com/apache/incubator-linkis/pull/2047

### 2.6 Add new engine type to ujes.client

```scala
// JobExecuteAction.scala中

object EngineType {
	......
  val KYUUBI = new EngineType {
    override val toString: String = "kyuubi"
    val KYUUBI_RunType = new RunType {
      override val toString: String = "kyuubi"
    }
    override def getDefaultRunType: RunType = KYUUBI_RunType
  }
}

// UJESClientUtils.scala中
object UJESClientUtils {
  def toEngineType(engineType: String): EngineType = engineType match {
		......
    case "kyuubi" => EngineType.KYUUBI
    case _ => EngineType.SPARK
  }
  
  def toRunType(runType:String, engineType: EngineType) : RunType = runType match {
    ......
    case "kyuuubi" => EngineType.KYUUBI.KYUUBI_RunType
    case _ => EngineType.SPARK.SQL
  }
}
```

Required by the client API to run scripts of new engine types.

### 2.7Add a new engine text prompt or icon to the engine manager of the Linkis administrator console interface

web/src/dss/module/resourceSimple/engine.vue

```js
methods: {
  calssifyName(params) {
     switch (params) {
        case 'kyuubi':
          return 'Kyuubi';
        ......
     }
  }
  // Icon filtering
  supportIcon(item) {
     const supportTypes = [
       	 ......
        { rule: 'kyuubi', logo: 'fi-kyuubi' },
      ];
  }
}
```



The final effect presented to the user:

![kyuubi引擎](http://leo-jie-pic.oss-cn-beijing.aliyuncs.com/blog/mo5iy.png)

### 2.8 Compilation, packaging, installation and deployment of the engine

An example command for new engine module compilation is as follows:

```shell
cd /Users/leojie/intsig_project/intsiglinkis/linkis-engineconn-plugins/engineconn-plugins/kyuubi

mvn clean install -DskipTests
```

When compiling a complete project, the new engine will not be added to the final tar.gz archive by default. If necessary, please modify the following files:

assembly-combined-package/assembly-combined/src/main/assembly/assembly.xml

```xml
<!--kyuubi-->
<fileSets>
  ......
  <fileSet>
      <directory>
          ../../linkis-engineconn-plugins/engineconn-plugins/kyuubi/target/out/
      </directory>
      <outputDirectory>lib/linkis-engineconn-plugins/</outputDirectory>
      <includes>
          <include>**/*</include>
      </includes>
  </fileSet>
</fileSets>
```

Then run the compile command in the project root directory:

```shell
mvn clean install -DskipTests
```

After successful compilation, find out.zip in the directories of assembly-combined-package/target/apache-linkis-1.x.x-incubating-bin.tar.gz and linkis-engineconn-plugins/engineconn-plugins/kyuubi/target/.

Upload the out.zip file to the deployment node of Linkis, and extract it to: installation directory/lib/linkis-engineconn-plugins/:

![引擎安装](http://leo-jie-pic.oss-cn-beijing.aliyuncs.com/blog/12vvi.png)

Don't forget to delete out.zip after decompression, so far the engine compilation and installation are completed.

### 2.9 Engine database configuration

After the engine is installed, if you want to run the new engine code, you need to configure the database of the engine. Take the Kyuubi engine as an example, please modify it according to the situation of the new engine you implemented yourself.

The SQL reference is as follows:

```sql
SET @KYUUBI_LABEL="kyuubi-1.4";

SET @KYUUBI_ALL=CONCAT('*-*,',@KYUUBI_LABEL);
SET @KYUUBI_IDE=CONCAT('*-IDE,',@KYUUBI_LABEL);
SET @KYUUBI_NODE=CONCAT('*-nodeexecution,',@KYUUBI_LABEL);

-- kyuubi
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.rm.instance', '范围：1-20，单位：个', 'kyuubi引擎最大并发数', '2', 'NumInterval', '[1,20]', '0', '0', '1', '队列资源', 'kyuubi');

insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.connect.url', '例如:jdbc:hive2://127.0.0.1:10000', 'jdbc连接地址', '\"jdbc:hive2://127.0.0.1:10009/;principal=test@LEO.COM\"', 'None', '', '0', '0', '1', '数据源配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.version', '取值范围：jdbc3,jdbc4', 'jdbc版本','jdbc4', 'OFT', '[\"jdbc3\",\"jdbc4\"]', '0', '0', '1', '数据源配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.connect.max', '范围：1-20，单位：个', 'jdbc引擎最大连接数', '10', 'NumInterval', '[1,20]', '0', '0', '1', '数据源配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.auth.type', '取值范围：SIMPLE,USERNAME,KERBEROS', 'jdbc认证方式', 'KERBEROS', 'OFT', '[\"SIMPLE\",\"USERNAME\",\"KERBEROS\"]', '0', '0', '1', '用户配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.username', 'username', '数据库连接用户名', '', 'None', '', '0', '0', '1', '用户配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.password', 'password', '数据库连接密码', '', 'None', '', '0', '0', '1', '用户配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.principal', '例如：hadoop/host@KDC.COM', '用户principal', 'hadoop/host@KDC.COM', 'None', '', '0', '0', '1', '用户配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.keytab.location', '例如：/data/keytab/hadoop.keytab', '用户keytab文件路径', '/data/keytab/hadoop.keytab', 'None', '', '0', '0', '1', '用户配置', 'kyuubi');
insert into `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.kyuubi.jdbc.proxy.user.property', '例如：hive.server2.proxy.user', '用户代理配置', 'hive.server2.proxy.user', 'None', '', '0', '0', '1', '用户配置', 'kyuubi');

INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.engineconn.java.driver.cores', '取值范围：1-8，单位：个', 'kyuubi引擎初始化核心个数', '1', 'NumInterval', '[1,8]', '0', '0', '1', 'kyuubi引擎设置', 'kyuubi');
INSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.engineconn.java.driver.memory', '取值范围：1-8，单位：G', 'kyuubi引擎初始化内存大小', '1g', 'Regex', '^([1-8])(G|g)$', '0', '0', '1', 'kyuubi引擎设置', 'kyuubi');

insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@KYUUBI_ALL, 'OPTIONAL', 2, now(), now());


insert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)
    (select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config INNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'kyuubi' and label_value = @KYUUBI_ALL);

insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@KYUUBI_IDE, 'OPTIONAL', 2, now(), now());
insert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType',@KYUUBI_NODE, 'OPTIONAL', 2, now(), now());


select @label_id := id from linkis_cg_manager_label where `label_value` = @KYUUBI_IDE;
insert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);

select @label_id := id from linkis_cg_manager_label where `label_value` = @KYUUBI_NODE;
insert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);

-- jdbc default configuration
insert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`) (select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation INNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @KYUUBI_ALL);
```

If you want to reset the database configuration data of the engine, the reference files are as follows, please modify and use as needed:

```sql
-- Clear initialization data of kyuubi engine
SET @KYUUBI_LABEL="kyuubi-1.4";

SET @KYUUBI_ALL=CONCAT('*-*,',@KYUUBI_LABEL);
SET @KYUUBI_IDE=CONCAT('*-IDE,',@KYUUBI_LABEL);
SET @KYUUBI_NODE=CONCAT('*-nodeexecution,',@KYUUBI_LABEL);

delete from `linkis_ps_configuration_config_value` where `config_label_id` in
 (select `relation`.`engine_type_label_id` AS `config_label_id` FROM `linkis_ps_configuration_key_engine_relation` relation INNER JOIN `linkis_cg_manager_label` label ON relation.engine_type_label_id = label.id AND label.label_value = @KYUUBI_ALL);

delete from `linkis_ps_configuration_key_engine_relation`
where `engine_type_label_id` in
      (select label.id FROM `linkis_ps_configuration_config_key` config
          INNER JOIN `linkis_cg_manager_label` label
              ON config.engine_conn_type = 'kyuubi' and label_value = @KYUUBI_ALL);


delete from `linkis_ps_configuration_category`
where `label_id` in (select id from `linkis_cg_manager_label` where `label_value` in (@KYUUBI_IDE, @KYUUBI_NODE));


delete from `linkis_ps_configuration_config_key` where `engine_conn_type` = 'kyuubi';

delete from `linkis_cg_manager_label` where `label_value` in (@KYUUBI_ALL, @KYUUBI_IDE, @KYUUBI_NODE);
```

Final effect:

![引擎参数](http://leo-jie-pic.oss-cn-beijing.aliyuncs.com/blog/u84pw.png)

After this configuration, when linkis-cli and Scripts submit the engine script, the tag information of the engine and the connection information of the data source can be correctly matched, and then the newly added engine can be pulled up.

### 2.10 Added script type and icon information in DSS Scripts

If you use the Scripts function of DSS, you also need to make some small changes to the front-end files of the web in the dss project. The purpose of the changes is to support the creation, opening, and execution of new engine script types in Scripts, and to implement the corresponding engine. Icons, fonts, etc.

#### 2.10.1 scriptis.js

web/src/common/config/scriptis.js

```js
{
  rule: /\.kyuubi$/i,
  // syntax highlighting
  lang: 'hql',
  // Is it executable
  executable: true,
  // application
  application: 'kyuubi',
  // run tyoe
  runType: 'kyuubi',
  // ext
  ext: '.kyuubi',
  scriptType: 'kyuubi',
  abbr: 'kyuubi',
  logo: 'fi-kyuubi',
  color: '#FF6666',
  isCanBeNew: true,
  label: 'Kyuubi',
  isCanBeOpen: true,
  flowType: 'kyuubi'
},
```

#### 2.10.2 Script copy support

web/src/apps/scriptis/module/workSidebar/workSidebar.vue

```js
copyName() {
  let typeArr = ['......', 'kyuubi']
}
```

#### 2.10.3 Logo and font color matching

web/src/apps/scriptis/module/workbench/title.vue

```js
  data() {
    return {
      isHover: false,
      iconColor: {
        'fi-kyuubi': '#FF6666',
      },
    };
  },
```

web/src/apps/scriptis/module/workbench/modal.js

```js
let logoList = [
  { rule: /\.kyuubi$/i, logo: 'fi-kyuubi' },
];
```

web/src/components/tree/support.js

```js
export const supportTypes = [
  { rule: /\.kyuubi$/i, logo: 'fi-kyuubi' },
]
```

Engine icon display

web/src/dss/module/resourceSimple/engine.vue

```js
methods: {
  calssifyName(params) {
     switch (params) {
        case 'kyuubi':
          return 'Kyuubi';
        ......
     }
  }
  supportIcon(item) {
     const supportTypes = [
				......
        { rule: 'kyuubi', logo: 'fi-kyuubi' },
      ];
  }
}
```

web/src/dss/assets/projectIconFont/iconfont.css

```css
.fi-kyuubi:before {
  content: "\e75e";
}
```

The control here should be:

![引擎图标](http://leo-jie-pic.oss-cn-beijing.aliyuncs.com/blog/lfcqz.png)



Find an svg file of the engine icon

web/src/components/svgIcon/svg/fi-kyuubi.svg

If the new engine needs to contribute to the community in the future, the svg icons, fonts, etc. corresponding to the new engine need to confirm the open source agreement to which they belong, or obtain their copyright license.

### 2.11 Workflow adaptation of DSS

The final result:

![工作流适配](http://leo-jie-pic.oss-cn-beijing.aliyuncs.com/blog/7dfh4.png)

Save the definition data of the newly added kyuubi engine in the dss_workflow_node table, refer to SQL:

```sql
# Engine task node basic information definition
insert into `dss_workflow_node` (`id`, `name`, `appconn_name`, `node_type`, `jump_url`, `support_jump`, `submit_to_scheduler`, `enable_copy`, `should_creation_before_node`, `icon`) values('18','kyuubi','-1','linkis.kyuubi.kyuubi',NULL,'1','1','1','0','svg文件');

# The svg file corresponds to the new engine task node icon

# Classification and division of engine task nodes
insert  into `dss_workflow_node_to_group`(`node_id`,`group_id`) values (18, 2);

# Basic information (parameter attribute) binding of engine task node
INSERT  INTO `dss_workflow_node_to_ui`(`workflow_node_id`,`ui_id`) VALUES (18,45);

# The basic information related to the engine task node is defined in the dss_workflow_node_ui table, and then displayed in the form of a form on the right side of the above figure. You can expand other basic information for the new engine, and then it will be automatically rendered by the form on the right.
```

web/src/apps/workflows/service/nodeType.js

```js
import kyuubi from '../module/process/images/newIcon/kyuubi.svg';

const NODETYPE = {
  ......
  KYUUBI: 'linkis.kyuubi.kyuubi',
}

const ext = {
	......
  [NODETYPE.KYUUBI]: 'kyuubi',
}

const NODEICON = {
  [NODETYPE.KYUUBI]: {
    icon: kyuubi,
    class: {'kyuubi': true}
  },
}
```

在web/src/apps/workflows/module/process/images/newIcon/ Add the icon of the new engine in the directory

web/src/apps/workflows/module/process/images/newIcon/kyuubi.svg

Also when contributing to the community, please consider the lincese or copyright of the svg file.

