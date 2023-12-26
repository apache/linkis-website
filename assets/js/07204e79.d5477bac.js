"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[57624],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>g});var a=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},k=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=p(t),k=i,g=u["".concat(s,".").concat(k)]||u[k]||c[k]||r;return t?a.createElement(g,l(l({ref:n},d),{},{components:t})):a.createElement(g,l({ref:n},d))}));function g(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,l=new Array(r);l[0]=k;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o[u]="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=t[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,t)}k.displayName="MDXCreateElement"},67738:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>p});var a=t(87462),i=(t(67294),t(3905));const r={title:"Spark Engine",sidebar_position:1},l=void 0,o={unversionedId:"engine-usage/spark",id:"version-1.4.0/engine-usage/spark",title:"Spark Engine",description:"This article mainly introduces the installation, use and configuration of the Spark engine plugin in Linkis.",source:"@site/versioned_docs/version-1.4.0/engine-usage/spark.md",sourceDirName:"engine-usage",slug:"/engine-usage/spark",permalink:"/docs/1.4.0/engine-usage/spark",draft:!1,editUrl:"https://github.com/apache/linkis-website/edit/dev/versioned_docs/version-1.4.0/engine-usage/spark.md",tags:[],version:"1.4.0",sidebarPosition:1,frontMatter:{title:"Spark Engine",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/docs/1.4.0/engine-usage/overview"},next:{title:"Hive Engine",permalink:"/docs/1.4.0/engine-usage/hive"}},s={},p=[{value:"1. Preliminary work",id:"1-preliminary-work",level:2},{value:"1.1 Engine installation",id:"11-engine-installation",level:3},{value:"1.2 Environment verification",id:"12-environment-verification",level:3},{value:"2. Engine plugin installation default engine",id:"2-engine-plugin-installation-default-engine",level:2},{value:"3. Using the <code>spark</code> engine",id:"3-using-the-spark-engine",level:2},{value:"3.1 Submitting tasks via <code>Linkis-cli</code>",id:"31-submitting-tasks-via-linkis-cli",level:3},{value:"3.2 Submitting tasks through <code>Linkis SDK</code>",id:"32-submitting-tasks-through-linkis-sdk",level:3},{value:"3.3 Submitting tasks by submitting the jar package",id:"33-submitting-tasks-by-submitting-the-jar-package",level:3},{value:"3.4 Submitting tasks with <code>Restful API</code>",id:"34-submitting-tasks-with-restful-api",level:3},{value:"4. Engine configuration instructions",id:"4-engine-configuration-instructions",level:2},{value:"4.1 Default Configuration Description",id:"41-default-configuration-description",level:3},{value:"4.2 Queue resource configuration",id:"42-queue-resource-configuration",level:3},{value:"4.3 Configuration modification",id:"43-configuration-modification",level:3},{value:"4.3.1 Management Console Configuration",id:"431-management-console-configuration",level:4},{value:"4.3.2 Task interface configuration",id:"432-task-interface-configuration",level:4},{value:"4.4 Engine related data sheet",id:"44-engine-related-data-sheet",level:3}],d={toc:p},u="wrapper";function c(e){let{components:n,...r}=e;return(0,i.kt)(u,(0,a.Z)({},d,r,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This article mainly introduces the installation, use and configuration of the ",(0,i.kt)("inlineCode",{parentName:"p"},"Spark")," engine plugin in ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis"),"."),(0,i.kt)("h2",{id:"1-preliminary-work"},"1. Preliminary work"),(0,i.kt)("h3",{id:"11-engine-installation"},"1.1 Engine installation"),(0,i.kt)("p",null,"If you wish to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," engine on your server, you need to ensure that the following environment variables are set correctly and that the engine's starting user has these environment variables."),(0,i.kt)("p",null,"It is strongly recommended that you check these environment variables for the executing user before executing a ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," job."),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Environment variable name"),(0,i.kt)("th",{parentName:"tr",align:null},"Environment variable content"),(0,i.kt)("th",{parentName:"tr",align:null},"Remarks"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"JAVA_HOME"),(0,i.kt)("td",{parentName:"tr",align:null},"JDK installation path"),(0,i.kt)("td",{parentName:"tr",align:null},"Required")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"HADOOP_HOME"),(0,i.kt)("td",{parentName:"tr",align:null},"Hadoop installation path"),(0,i.kt)("td",{parentName:"tr",align:null},"Required")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"HADOOP_CONF_DIR"),(0,i.kt)("td",{parentName:"tr",align:null},"Hadoop configuration path"),(0,i.kt)("td",{parentName:"tr",align:null},"required")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"HIVE_CONF_DIR"),(0,i.kt)("td",{parentName:"tr",align:null},"Hive configuration path"),(0,i.kt)("td",{parentName:"tr",align:null},"required")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"SPARK_HOME"),(0,i.kt)("td",{parentName:"tr",align:null},"Spark installation path"),(0,i.kt)("td",{parentName:"tr",align:null},"Required")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"SPARK_CONF_DIR"),(0,i.kt)("td",{parentName:"tr",align:null},"Spark configuration path"),(0,i.kt)("td",{parentName:"tr",align:null},"Required")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"python"),(0,i.kt)("td",{parentName:"tr",align:null},"python"),(0,i.kt)("td",{parentName:"tr",align:null},"It is recommended to use anaconda's python as the default python")))),(0,i.kt)("h3",{id:"12-environment-verification"},"1.2 Environment verification"),(0,i.kt)("p",null,"Verify that ",(0,i.kt)("inlineCode",{parentName:"p"},"Spark")," is successfully installed by ",(0,i.kt)("inlineCode",{parentName:"p"},"pyspark")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"pyspark\n\n#After entering the pyspark virtual environment, the spark logo appears, indicating that the environment is successfully installed\nWelcome to\n      ______\n     /__/__ ___ _____/ /__\n    _\\ \\/ _ \\/ _ `/ __/ '_/\n   /__ / .__/\\_,_/_/ /_/\\_\\   version 3.2.1\n      /_/\n\nUsing Python version 2.7.13 (default, Sep 30 2017 18:12:43)\nSparkSession available as 'spark'.\n")),(0,i.kt)("h2",{id:"2-engine-plugin-installation-default-engine"},"2. Engine plugin installation ",(0,i.kt)("a",{parentName:"h2",href:"/docs/1.4.0/engine-usage/overview"},"default engine")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Spark")," engine plugin is included in the binary installation package released by ",(0,i.kt)("inlineCode",{parentName:"p"},"linkis")," by default, and users do not need to install it additionally."),(0,i.kt)("p",null,"In theory ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," supports all versions of ",(0,i.kt)("inlineCode",{parentName:"p"},"spark2.x")," and above. The default supported version is ",(0,i.kt)("inlineCode",{parentName:"p"},"Spark3.2.1"),". If you want to use another version of ",(0,i.kt)("inlineCode",{parentName:"p"},"spark"),", such as ",(0,i.kt)("inlineCode",{parentName:"p"},"spark2.1.0"),", you just need to modify the version of the plugin ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," and compile it. Specifically, you can find the ",(0,i.kt)("inlineCode",{parentName:"p"},"linkis-engineplugin-spark")," module, change the value of the ",(0,i.kt)("inlineCode",{parentName:"p"},"<spark.version>")," tag in the ",(0,i.kt)("inlineCode",{parentName:"p"},"maven")," dependency to 2.1.0, and then compile this module separately."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/1.4.0/deployment/install-engineconn"},"EngineConnPlugin engine plugin installation")),(0,i.kt)("h2",{id:"3-using-the-spark-engine"},"3. Using the ",(0,i.kt)("inlineCode",{parentName:"h2"},"spark")," engine"),(0,i.kt)("h3",{id:"31-submitting-tasks-via-linkis-cli"},"3.1 Submitting tasks via ",(0,i.kt)("inlineCode",{parentName:"h3"},"Linkis-cli")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'# codeType correspondence py--\x3epyspark sql--\x3esparkSQL scala--\x3eSpark scala\nsh ./bin/linkis-cli -engineType spark-3.2.1 -codeType sql -code "show databases"  -submitUser hadoop -proxyUser hadoop\n\n# You can specify the yarn queue in the submission parameter by -confMap wds.linkis.yarnqueue=dws\nsh ./bin/linkis-cli -engineType spark-3.2.1 -codeType sql  -confMap wds.linkis.yarnqueue=dws -code "show databases"  -submitUser hadoop -proxyUser hadoop\n')),(0,i.kt)("p",null,"More ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis-Cli")," command parameter reference: ",(0,i.kt)("a",{parentName:"p",href:"/docs/1.4.0/user-guide/linkiscli-manual"},"Linkis-Cli usage")),(0,i.kt)("h3",{id:"32-submitting-tasks-through-linkis-sdk"},"3.2 Submitting tasks through ",(0,i.kt)("inlineCode",{parentName:"h3"},"Linkis SDK")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," provides ",(0,i.kt)("inlineCode",{parentName:"p"},"SDK")," of ",(0,i.kt)("inlineCode",{parentName:"p"},"Java")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Scala")," to submit tasks to ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," server. For details, please refer to ",(0,i.kt)("a",{parentName:"p",href:"/docs/1.4.0/user-guide/sdk-manual"},"JAVA SDK Manual"),".\nFor ",(0,i.kt)("inlineCode",{parentName:"p"},"Spark")," tasks you only need to modify the ",(0,i.kt)("inlineCode",{parentName:"p"},"EngineConnType")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"CodeType")," parameters in ",(0,i.kt)("inlineCode",{parentName:"p"},"Demo"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'Map<String, Object> labels = new HashMap<String, Object>();\nlabels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "spark-3.2.1"); // required engineType Label\nlabels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator\nlabels.put(LabelKeyConstant.CODE_TYPE_KEY, "sql"); // required codeType py,sql,scala\n')),(0,i.kt)("p",null,"You can also submit scala and python code:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'\n//scala \nlabels.put(LabelKeyConstant.CODE_TYPE_KEY, "scala");\ncode:\nval df=spark.sql("show tables")\nshow(df)        \n//pyspark\n/labels.put(LabelKeyConstant.CODE_TYPE_KEY, "py");\ncode:\ndf=spark.sql("show tables")\nshow(df)\n')),(0,i.kt)("h3",{id:"33-submitting-tasks-by-submitting-the-jar-package"},"3.3 Submitting tasks by submitting the jar package"),(0,i.kt)("p",null,"Through ",(0,i.kt)("inlineCode",{parentName:"p"},"OnceEngineConn")," submit tasks (through the spark-submit submit jar package mission), submission for reference ",(0,i.kt)("inlineCode",{parentName:"p"},"org.apache.linkis.com putation.Client.SparkOnceJobTest"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'public class SparkOnceJobTest {\n\n    public static void main(String[] args)  {\n\n        LinkisJobClient.config().setDefaultServerUrl("http://127.0.0.1:9001");\n\n        String submitUser = "linkis";\n        String engineType = "spark";\n\n        SubmittableSimpleOnceJob onceJob =\n                // region\n                LinkisJobClient.once().simple().builder()\n                        .setCreateService("Spark-Test")\n                        .setMaxSubmitTime(300000)\n                        .setDescription("SparkTestDescription")\n                        .addExecuteUser(submitUser)\n                        .addJobContent("runType", "jar")\n                        .addJobContent("spark.app.main.class", "org.apache.spark.examples.JavaWordCount")\n                        // Parameters obtained from the submitted jar package\n                        .addJobContent("spark.app.args", "hdfs:///tmp/test_word_count.txt") // WordCount test file\n                        .addLabel("engineType", engineType + "-2.4.7")\n                        .addLabel("userCreator", submitUser + "-IDE")\n                        .addLabel("engineConnMode", "once")\n                        .addStartupParam("spark.app.name", "spark-submit-jar-test-linkis") // Application Name on yarn \n                        .addStartupParam("spark.executor.memory", "1g")\n                        .addStartupParam("spark.driver.memory", "1g")\n                        .addStartupParam("spark.executor.cores", "1")\n                        .addStartupParam("spark.executor.instance", "1")\n                        .addStartupParam("spark.app.resource", "hdfs:///tmp/spark/spark-examples_2.11-2.3.0.2.6.5.0-292.jar")\n                        .addSource("jobName", "OnceJobTest")\n                        .build();\n        // endregion\n        onceJob.submit();\n        onceJob.waitForCompleted(); //A temporary network interruption may cause an exception. It is recommended to modify the SDK later. If the SDK is in use at this stage, exception handling is required.\n        // Temporary network failure will cause exceptions. It is recommended to modify the SDK later. For use at this stage, exception handling is required\n        onceJob.waitForCompleted();\n    }\n}\n')),(0,i.kt)("h3",{id:"34-submitting-tasks-with-restful-api"},"3.4 Submitting tasks with ",(0,i.kt)("inlineCode",{parentName:"h3"},"Restful API")),(0,i.kt)("p",null,"Scripts type includes ",(0,i.kt)("inlineCode",{parentName:"p"},"sql"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"scala"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"python"),"\u3001",(0,i.kt)("inlineCode",{parentName:"p"},"data_calc(content type is json)"),"."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/docs/1.4.0/api/linkis-task-operator"},"Restful API Usage")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-http",metastring:"request",request:!0},'POST /api/rest_j/v1/entrance/submit\nContent-Type: application/json\nToken-Code: dss-AUTH\nToken-User: linkis\n\n{\n    "executionContent": {\n        // script content, type: sql, python, scala, json\n        "code": "show databases",\n        // script type: sql, py\uff08pyspark\uff09, scala, data_calc(json)\n        "runType": "sql"\n    },\n    "params": {\n        "variable": {\n        },\n        "configuration": {\n            // spark startup parameters, not required\n            "startup": {\n                "spark.executor.memory": "1g",\n                "spark.driver.memory": "1g",\n                "spark.executor.cores": "1",\n                "spark.executor.instances": 1\n            }\n        }\n    },\n    "source":  {\n        // not required, file:/// or hdfs:///\n        "scriptPath": "file:///tmp/hadoop/test.sql"\n    },\n    "labels": {\n        // pattern\uff1aengineType-version\n        "engineType": "spark-3.2.1",\n        // userCreator: linkis is username\u3002IDE is system that be configed in Linkis\u3002\n        "userCreator": "linkis-IDE"\n    }\n}\n')),(0,i.kt)("h2",{id:"4-engine-configuration-instructions"},"4. Engine configuration instructions"),(0,i.kt)("h3",{id:"41-default-configuration-description"},"4.1 Default Configuration Description"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Configuration"),(0,i.kt)("th",{parentName:"tr",align:null},"Default"),(0,i.kt)("th",{parentName:"tr",align:null},"Required"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"wds.linkis.rm.instance"),(0,i.kt)("td",{parentName:"tr",align:null},"10"),(0,i.kt)("td",{parentName:"tr",align:null},"No"),(0,i.kt)("td",{parentName:"tr",align:null},"Maximum number of concurrent engines")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"spark.executor.cores"),(0,i.kt)("td",{parentName:"tr",align:null},"1"),(0,i.kt)("td",{parentName:"tr",align:null},"No"),(0,i.kt)("td",{parentName:"tr",align:null},"Number of spark executor cores")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"spark.driver.memory"),(0,i.kt)("td",{parentName:"tr",align:null},"1g"),(0,i.kt)("td",{parentName:"tr",align:null},"no"),(0,i.kt)("td",{parentName:"tr",align:null},"maximum concurrent number of spark executor instances")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"spark.executor.memory"),(0,i.kt)("td",{parentName:"tr",align:null},"1g"),(0,i.kt)("td",{parentName:"tr",align:null},"No"),(0,i.kt)("td",{parentName:"tr",align:null},"spark executor memory size")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"wds.linkis.engineconn.max.free.time"),(0,i.kt)("td",{parentName:"tr",align:null},"1h"),(0,i.kt)("td",{parentName:"tr",align:null},"No"),(0,i.kt)("td",{parentName:"tr",align:null},"Engine idle exit time")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"spark.python.version"),(0,i.kt)("td",{parentName:"tr",align:null},"python2"),(0,i.kt)("td",{parentName:"tr",align:null},"no"),(0,i.kt)("td",{parentName:"tr",align:null},"python version")))),(0,i.kt)("h3",{id:"42-queue-resource-configuration"},"4.2 Queue resource configuration"),(0,i.kt)("p",null,"Because the execution of ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," requires queue resources, you need to set up a queue that you can execute.    "),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"yarn",src:t(58197).Z,width:"1252",height:"653"})," "),(0,i.kt)("h3",{id:"43-configuration-modification"},"4.3 Configuration modification"),(0,i.kt)("p",null,"If the default parameters are not satisfied, there are the following ways to configure some basic parameters"),(0,i.kt)("h4",{id:"431-management-console-configuration"},"4.3.1 Management Console Configuration"),(0,i.kt)("p",null,"Users can customize settings, such as the number of ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," sessions ",(0,i.kt)("inlineCode",{parentName:"p"},"executor")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"executor")," memory. These parameters are for users to set their own ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," parameters more freely, and other ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," parameters can also be modified, such as the ",(0,i.kt)("inlineCode",{parentName:"p"},"python")," version of ",(0,i.kt)("inlineCode",{parentName:"p"},"pyspark"),", etc.\n",(0,i.kt)("img",{alt:"spark",src:t(91901).Z,width:"1271",height:"737"})),(0,i.kt)("p",null,"Note: After modifying the configuration under the ",(0,i.kt)("inlineCode",{parentName:"p"},"IDE")," tag, you need to specify ",(0,i.kt)("inlineCode",{parentName:"p"},"-creator IDE")," to take effect (other tags are similar), such as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'sh ./bin/linkis-cli -creator IDE \\\n-engineType spark-3.2.1 -codeType sql \\\n-code "show databases"  \\\n-submitUser hadoop -proxyUser hadoop\n')),(0,i.kt)("h4",{id:"432-task-interface-configuration"},"4.3.2 Task interface configuration"),(0,i.kt)("p",null,"Submit the task interface, configure it through the parameter ",(0,i.kt)("inlineCode",{parentName:"p"},"params.configuration.runtime")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'Example of http request parameters\n{\n    "executionContent": {"code": "show databases;", "runType":  "sql"},\n    "params": {\n                    "variable": {},\n                    "configuration": {\n                            "runtime": {\n                                "wds.linkis.rm.instance":"10"\n                                }\n                            }\n                    },\n    "labels": {\n        "engineType": "spark-3.2.1",\n        "userCreator": "hadoop-IDE"\n    }\n}\n')),(0,i.kt)("h3",{id:"44-engine-related-data-sheet"},"4.4 Engine related data sheet"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," is managed through the engine tag, and the data table information involved is shown below."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"linkis_ps_configuration_config_key: Insert the key and default values \u200b\u200b\u200b\u200bof the configuration parameters of the engine\nlinkis_cg_manager_label: insert engine label such as: spark-3.2.1\nlinkis_ps_configuration_category: The directory association relationship of the insertion engine\nlinkis_ps_configuration_config_value: The configuration that the insertion engine needs to display\nlinkis_ps_configuration_key_engine_relation: The relationship between the configuration item and the engine\n")),(0,i.kt)("p",null,"The initial data in the table related to the ",(0,i.kt)("inlineCode",{parentName:"p"},"spark")," engine is as follows"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"-- set variable\nSET @SPARK_LABEL=\"spark-3.2.1\";\nSET @SPARK_ALL=CONCAT('*-*,',@SPARK_LABEL);\nSET @SPARK_IDE=CONCAT('*-IDE,',@SPARK_LABEL);\n\n-- engine label\ninsert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @SPARK_ALL, 'OPTIONAL', 2, now(), now());\ninsert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @SPARK_IDE, 'OPTIONAL', 2, now(), now());\n\nselect @label_id := id from linkis_cg_manager_label where `label_value` = @SPARK_IDE;\ninsert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);\n\n-- configuration key\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.rm.instance', 'Range: 1-20, unit: each', 'Maximum concurrent number of spark engine', '10', 'NumInterval', '[1,20]', '0 ', '0', '1', 'queue resources', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.instances', 'value range: 1-40, unit: individual', 'maximum concurrent number of spark executor instances', '1', 'NumInterval', '[1,40]', '0', '0', '2', 'spark resource settings', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.cores', 'Value range: 1-8, unit: number', 'Number of spark executor cores', '1', 'NumInterval', '[1,8]', ' 0', '0', '1','spark resource settings', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.executor.memory', 'value range: 1-15, unit: G', 'spark executor memory size', '1g', 'Regex', '^([1-9]|1 [0-5])(G|g)$', '0', '0', '3', 'spark resource settings', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.driver.cores', 'Value range: only 1, unit: number', 'Number of spark driver cores', '1', 'NumInterval', '[1,1]', '0 ', '1', '1', 'spark resource settings', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.driver.memory', 'value range: 1-15, unit: G', 'spark driver memory size','1g', 'Regex', '^([1-9]|1[ 0-5])(G|g)$', '0', '0', '1', 'spark resource settings', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('wds.linkis.engineconn.max.free.time', 'Value range: 3m,15m,30m,1h,2h', 'Engine idle exit time','1h', 'OFT', '[\\ \"1h\\\",\\\"2h\\\",\\\"30m\\\",\\\"15m\\\",\\\"3m\\\"]', '0', '0', '1', 'spark engine settings', ' spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.pd.addresses', NULL, NULL, 'pd0:2379', 'None', NULL, '0', '0', '1', 'tidb\u8bbe\u7f6e', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.addr', NULL, NULL, 'tidb', 'None', NULL, '0', '0', '1', 'tidb\u8bbe\u7f6e', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.password', NULL, NULL, NULL, 'None', NULL, '0', '0', '1', 'tidb\u8bbe\u7f6e', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.port', NULL, NULL, '4000', 'None', NULL, '0', '0', '1', 'tidb\u8bbe\u7f6e', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.tispark.tidb.user', NULL, NULL, 'root', 'None', NULL, '0', '0', '1', 'tidb\u8bbe\u7f6e', 'spark');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `is_hidden`, `is_advanced`, `level`, `treeName`, `engine_conn_type`) VALUES ('spark.python.version', 'Value range: python2,python3', 'python version','python2', 'OFT', '[\\\"python3\\\",\\\"python2\\\"]', ' 0', '0', '1', 'spark engine settings', 'spark');\n\n-- key engine relation\ninsert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)\n(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config\nINNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'spark' and label.label_value = @SPARK_ALL);\n\n-- engine default configuration\ninsert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)\n(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation\nINNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @SPARK_ALL);\n\n")))}c.isMDXComponent=!0},91901:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/spark-conf-5a082f340d4291dae5670ee961b95538.png"},58197:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/yarn-conf-3611575997ffb7ba32993da83d626e72.png"}}]);