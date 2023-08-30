"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[2604],{3905:(e,n,i)=>{i.d(n,{Zo:()=>m,kt:()=>k});var a=i(67294);function t(e,n,i){return n in e?Object.defineProperty(e,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[n]=i,e}function o(e,n){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),i.push.apply(i,a)}return i}function l(e){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?o(Object(i),!0).forEach((function(n){t(e,n,i[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(i,n))}))}return e}function r(e,n){if(null==e)return{};var i,a,t=function(e,n){if(null==e)return{};var i,a,t={},o=Object.keys(e);for(a=0;a<o.length;a++)i=o[a],n.indexOf(i)>=0||(t[i]=e[i]);return t}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)i=o[a],n.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(t[i]=e[i])}return t}var s=a.createContext({}),p=function(e){var n=a.useContext(s),i=n;return e&&(i="function"==typeof e?e(n):l(l({},n),e)),i},m=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},u=a.forwardRef((function(e,n){var i=e.components,t=e.mdxType,o=e.originalType,s=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),d=p(i),u=t,k=d["".concat(s,".").concat(u)]||d[u]||c[u]||o;return i?a.createElement(k,l(l({ref:n},m),{},{components:i})):a.createElement(k,l({ref:n},m))}));function k(e,n){var i=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var o=i.length,l=new Array(o);l[0]=u;var r={};for(var s in n)hasOwnProperty.call(n,s)&&(r[s]=n[s]);r.originalType=e,r[d]="string"==typeof e?e:t,l[1]=r;for(var p=2;p<o;p++)l[p]=i[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,i)}u.displayName="MDXCreateElement"},54175:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>c,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var a=i(87462),t=(i(67294),i(3905));const o={title:"Version Adaptation",sidebar_position:8},l="Version Adaptation",r={unversionedId:"deployment/version-adaptation",id:"deployment/version-adaptation",title:"Version Adaptation",description:"1. Function description",source:"@site/docs/deployment/version-adaptation.md",sourceDirName:"deployment",slug:"/deployment/version-adaptation",permalink:"/docs/1.5.0/deployment/version-adaptation",draft:!1,editUrl:"https://github.com/apache/linkis-website/edit/dev/docs/deployment/version-adaptation.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"Version Adaptation",sidebar_position:8},sidebar:"tutorialSidebar",previous:{title:"Installation EngineConn Plugin",permalink:"/docs/1.5.0/deployment/install-engineconn"},next:{title:"Installation Spark lineage",permalink:"/docs/1.5.0/deployment/integrated/spark-lineage"}},s={},p=[{value:"1. Function description",id:"1-function-description",level:2},{value:"2. Compilation instruction",id:"2-compilation-instruction",level:2},{value:"3. SQL Script Switch",id:"3-sql-script-switch",level:2},{value:"4. Linkis official version",id:"4-linkis-official-version",level:2},{value:"5. Apache version adaptation",id:"5-apache-version-adaptation",level:2},{value:"5.1 Apache3.1.x version",id:"51-apache31x-version",level:3},{value:"5.1.1 The pom file of linkis",id:"511-the-pom-file-of-linkis",level:4},{value:"5.1.2  The pom file of linkis-hadoop-common",id:"512--the-pom-file-of-linkis-hadoop-common",level:4},{value:"5.1.3 The pom file of linkis-engineplugin-hive",id:"513-the-pom-file-of-linkis-engineplugin-hive",level:4},{value:"5.1.4 The pom file of linkis-engineplugin-spark",id:"514-the-pom-file-of-linkis-engineplugin-spark",level:4},{value:"5.1.5 The pom file of flink-engineconn-flink",id:"515-the-pom-file-of-flink-engineconn-flink",level:4},{value:"5.1.6 linkis-label-commo adjustment",id:"516-linkis-label-commo-adjustment",level:4},{value:"5.1.7 linkis-computation-governance-common adjustment",id:"517-linkis-computation-governance-common-adjustment",level:4},{value:"6. HDP version adaptation",id:"6-hdp-version-adaptation",level:2},{value:"6.1 HDP3.0.1 version",id:"61-hdp301-version",level:3},{value:"6.1.1 The pom file of linkis",id:"611-the-pom-file-of-linkis",level:4},{value:"6.1.2 The pom file of linkis-engineplugin-hive",id:"612-the-pom-file-of-linkis-engineplugin-hive",level:4},{value:"6.1.3 The pom file of linkis-engineplugin-spark",id:"613-the-pom-file-of-linkis-engineplugin-spark",level:4},{value:"6.1.4 linkis-label-common adjustment",id:"614-linkis-label-common-adjustment",level:4},{value:"6.1.5 linkis-computation-governance-common adjustment",id:"615-linkis-computation-governance-common-adjustment",level:4},{value:"7 CDH Version adaptation",id:"7-cdh-version-adaptation",level:2},{value:"7.1 maven Configure address",id:"71-maven-configure-address",level:3},{value:"7.1.1 setting file",id:"711-setting-file",level:4},{value:"7.1.2 The pom file of linkis",id:"712-the-pom-file-of-linkis",level:4},{value:"7.2 CDH5.12.1 version",id:"72-cdh5121-version",level:3},{value:"7.2.1 The pom file of linkis",id:"721-the-pom-file-of-linkis",level:4},{value:"7.2.2 The pom file of linkis-engineplugin-hive",id:"722-the-pom-file-of-linkis-engineplugin-hive",level:4},{value:"7.2.3  The pom file of linkis-engineplugin-flink",id:"723--the-pom-file-of-linkis-engineplugin-flink",level:4},{value:"7.2.4 The pom file of linkis-engineplugin-spark",id:"724-the-pom-file-of-linkis-engineplugin-spark",level:4},{value:"7.2.5 The pom file of linkis-engineplugin-python",id:"725-the-pom-file-of-linkis-engineplugin-python",level:4},{value:"7.2.6 linkis-label-common adjustment",id:"726-linkis-label-common-adjustment",level:4},{value:"7.2.7 linkis-computation-governance-common adjustment",id:"727-linkis-computation-governance-common-adjustment",level:4},{value:"7.3 CDH6.3.2",id:"73-cdh632",level:3},{value:"7.3.1 The pom file of linkis",id:"731-the-pom-file-of-linkis",level:4},{value:"7.3.2  The pom file of linkis-hadoop-common",id:"732--the-pom-file-of-linkis-hadoop-common",level:4},{value:"7.3.3 The pom file of linkis-engineplugin-hive",id:"733-the-pom-file-of-linkis-engineplugin-hive",level:4},{value:"7.3.4  The pom file of linkis-engineplugin-spark",id:"734--the-pom-file-of-linkis-engineplugin-spark",level:4},{value:"7.3.5 linkis-label-common adjustment",id:"735-linkis-label-common-adjustment",level:4},{value:"7.3.6 linkis-computation-governance-common adjustment",id:"736-linkis-computation-governance-common-adjustment",level:4},{value:"8 Compilation Skills",id:"8-compilation-skills",level:2}],m={toc:p},d="wrapper";function c(e){let{components:n,...i}=e;return(0,t.kt)(d,(0,a.Z)({},m,i,{components:n,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"version-adaptation"},"Version Adaptation"),(0,t.kt)("h2",{id:"1-function-description"},"1. Function description"),(0,t.kt)("p",null,"Explain where manual modification is required for Apache, CDH, HDP and other version adaptations"),(0,t.kt)("h2",{id:"2-compilation-instruction"},"2. Compilation instruction"),(0,t.kt)("p",null,"Enter the root directory of the project and execute the following commands in sequence"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Dmaven.test.skip=true\n")),(0,t.kt)("h2",{id:"3-sql-script-switch"},"3. SQL Script Switch"),(0,t.kt)("p",null,"linkis-dist -> package -> linkis-dml.sql(db folder)"),(0,t.kt)("p",null,"Switch the corresponding engine version to the version you need. If the  version you use is consistent with the official version, you do not need to modify this step "),(0,t.kt)("p",null,"for example:   "),(0,t.kt)("ol",null,(0,t.kt)("li",{parentName:"ol"},'If Spark is 3.0.0, this is SET @ SPARK_ LABEL="spark-3.0.0";'),(0,t.kt)("li",{parentName:"ol"},"If hive is 2.1.1-cdh6.3.2, adjust 2.1.1 first",(0,t.kt)("em",{parentName:"li"}," Cdh6.3.2 (during construction), this is SET @ HIVE"),' LABEL="hive-2.1.1_cdh6.3.2";')),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-sql"},'-- variable\uff1a\nSET @SPARK_LABEL="spark-2.4.3";\nSET @HIVE_LABEL="hive-2.3.3";\nSET @PYTHON_LABEL="python-python2";\nSET @PIPELINE_LABEL="pipeline-1";\nSET @JDBC_LABEL="jdbc-4";\nSET @PRESTO_LABEL="presto-0.234";\nSET @IO_FILE_LABEL="io_file-1.0";\nSET @OPENLOOKENG_LABEL="openlookeng-1.5.0";\n')),(0,t.kt)("h2",{id:"4-linkis-official-version"},"4. Linkis official version"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"engine"),(0,t.kt)("th",{parentName:"tr",align:null},"version"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"2.7.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"2.3.3")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"2.4.3")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"flink"),(0,t.kt)("td",{parentName:"tr",align:null},"1.12.2")))),(0,t.kt)("h2",{id:"5-apache-version-adaptation"},"5. Apache version adaptation"),(0,t.kt)("h3",{id:"51-apache31x-version"},"5.1 Apache3.1.x version"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"engine"),(0,t.kt)("th",{parentName:"tr",align:null},"version"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"3.0.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"flink"),(0,t.kt)("td",{parentName:"tr",align:null},"1.13.2")))),(0,t.kt)("h4",{id:"511-the-pom-file-of-linkis"},"5.1.1 The pom file of linkis"),(0,t.kt)("p",null,"For Linkis version < 1.3.2"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hadoop.version>3.1.1</hadoop.version>\n<scala.version>2.12.10</scala.version>\n<scala.binary.version>2.12</scala.binary.version>\n\n\x3c!-- hadoop-hdfs replace with hadoop-hdfs-client --\x3e\n<dependency>\n    <groupId>org.apache.hadoop</groupId>\n    <artifactId>hadoop-hdfs-client</artifactId>\n    <version>${hadoop.version}</version>\n<dependency>\n\n")),(0,t.kt)("p",null,"For Linkis version >= 1.3.2, we only need to set ",(0,t.kt)("inlineCode",{parentName:"p"},"scala.version")," and ",(0,t.kt)("inlineCode",{parentName:"p"},"scala.binary.version")," if necessary"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<scala.version>2.12.10</scala.version>\n<scala.binary.version>2.12</scala.binary.version>\n")),(0,t.kt)("p",null,"Because we can directly compile with hadoop-3.3 or hadoop-2.7 profile.\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-3.3")," can be used for any hadoop3.x, default hadoop3.x version will be hadoop 3.3.1,\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-2.7")," can be used for any hadoop2.x, default hadoop2.x version will be hadoop 2.7.2,\nother hadoop version can be specified by -Dhadoop.version=xxx"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"512--the-pom-file-of-linkis-hadoop-common"},"5.1.2  The pom file of linkis-hadoop-common"),(0,t.kt)("p",null,"For Linkis version < 1.3.2"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"\x3c!-- Notice here <version>${hadoop.version}</version> , adjust according to whether you have encountered errors --\x3e \n<dependency>\n    <groupId>org.apache.hadoop</groupId>\n    <artifactId>hadoop-hdfs-client</artifactId>\n    <version>${hadoop.version}</version>\n</dependency>\n")),(0,t.kt)("p",null,"For Linkis version >= 1.3.2,",(0,t.kt)("inlineCode",{parentName:"p"},"linkis-hadoop-common")," module no need to change"),(0,t.kt)("h4",{id:"513-the-pom-file-of-linkis-engineplugin-hive"},"5.1.3 The pom file of linkis-engineplugin-hive"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hive.version>3.1.2</hive.version>\n")),(0,t.kt)("h4",{id:"514-the-pom-file-of-linkis-engineplugin-spark"},"5.1.4 The pom file of linkis-engineplugin-spark"),(0,t.kt)("p",null,"For Linkis version < 1.3.2"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<spark.version>3.0.1</spark.version>\n")),(0,t.kt)("p",null,"For Linkis version >= 1.3.2"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"We can directly compile with spark-3.2 or spark-2.4-hadoop-3.3 profile, if we need to used with hadoop3, then profile hadoop-3.3 will be needed.\ndefault spark3.x version will be spark 3.2.1. if we compile with spark-3.2 then scala version will be 2.12.15 by default,\nso we do not need to set the scala version in Linkis project pom file(mentioned in 5.1.1).\nif spark2.x used with hadoop3, for compatibility reason, profile `spark-2.4-hadoop-3.3` need to be activated.\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"515-the-pom-file-of-flink-engineconn-flink"},"5.1.5 The pom file of flink-engineconn-flink"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<flink.version>1.13.2</flink.version>\n")),(0,t.kt)("p",null,"Since some classes of Flink 1.12.2 to 1.13.2 are adjusted, it is necessary to compile and adjust Flink. Select Scala version 2.12 for compiling Flink"),(0,t.kt)("admonition",{title:"temporary plan",type:"caution"},(0,t.kt)("p",{parentName:"admonition"},"Note that the following operations are all in flink"),(0,t.kt)("p",{parentName:"admonition"},"Due to flink1.12.2 to 1.13.2, some classes are adjusted, so flink needs to be compiled and adjusted, and the version of scala selected for compiling flink is version 2.12(The scala version is based on the actual version used)"),(0,t.kt)("p",{parentName:"admonition"},"flink compilation reference instruction: mvn clean install -DskipTests -P scala-2.12 -Dfast -T 4 -Dmaven.compile.fock=true")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"-- Note that the following classes are copied from version 1.12.2 to version 1.13.2\norg.apache.flink.table.client.config.entries.DeploymentEntry\norg.apache.flink.table.client.config.entries.ExecutionEntry\norg.apache.flink.table.client.gateway.local.CollectBatchTableSink\norg.apache.flink.table.client.gateway.local.CollectStreamTableSink\n")),(0,t.kt)("h4",{id:"516-linkis-label-commo-adjustment"},"5.1.6 linkis-label-commo adjustment"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig  file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'    public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.1");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.2");\n')),(0,t.kt)("h4",{id:"517-linkis-computation-governance-common-adjustment"},"5.1.7 linkis-computation-governance-common adjustment"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.1")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.2")\n')),(0,t.kt)("h2",{id:"6-hdp-version-adaptation"},"6. HDP version adaptation"),(0,t.kt)("h3",{id:"61-hdp301-version"},"6.1 HDP3.0.1 version"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"engine"),(0,t.kt)("th",{parentName:"tr",align:null},"version"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.0")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"2.3.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"json4s.version"),(0,t.kt)("td",{parentName:"tr",align:null},"3.2.11")))),(0,t.kt)("h4",{id:"611-the-pom-file-of-linkis"},"6.1.1 The pom file of linkis"),(0,t.kt)("p",null,"For Linkis version < 1.3.2"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hadoop.version>3.1.1</hadoop.version>\n<json4s.version>3.2.11</json4s.version>\n    \n\x3c!-- hadoop-hdfs replace with hadoop-hdfs-client --\x3e\n<dependency>\n    <groupId>org.apache.hadoop</groupId>\n    <artifactId>hadoop-hdfs-client</artifactId>\n    <version>${hadoop.version}</version>\n<dependency>\n")),(0,t.kt)("p",null,"For Linkis version >= 1.3.2, we only need to set ",(0,t.kt)("inlineCode",{parentName:"p"},"json4s.version")," if necessary"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<json4s.version>3.2.11</json4s.version>\n")),(0,t.kt)("p",null,"Because we can directly compile with hadoop-3.3 or hadoop-2.7 profile.\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-3.3")," can be used for any hadoop3.x, default hadoop3.x version will be hadoop 3.3.1,\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-2.7")," can be used for any hadoop2.x, default hadoop2.x version will be hadoop 2.7.2,\nother hadoop version can be specified by -Dhadoop.version=xxx"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"612-the-pom-file-of-linkis-engineplugin-hive"},"6.1.2 The pom file of linkis-engineplugin-hive"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hive.version>3.1.0</hive.version>\n")),(0,t.kt)("h4",{id:"613-the-pom-file-of-linkis-engineplugin-spark"},"6.1.3 The pom file of linkis-engineplugin-spark"),(0,t.kt)("p",null,"For Linkis version < 1.3.2"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<spark.version>2.3.2</spark.version>\n")),(0,t.kt)("p",null,"For Linkis version >= 1.3.2"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"We can directly compile with spark-3.2 profile, if we need to use with hadoop3, then profile hadoop-3.3 will be needed.\ndefault spark3.x version will be spark 3.2.1. if we compile with spark-3.2 then scala version will be 2.12.15 by default,\nso we do not need to set the scala version in Linkis project pom file(mentioned in 5.1.1).\nif spark2.x used with hadoop3, for compatibility reason, profile `spark-2.4-hadoop-3.3` need to be activated.\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"614-linkis-label-common-adjustment"},"6.1.4 linkis-label-common adjustment"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'    public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.2");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.0");\n')),(0,t.kt)("h4",{id:"615-linkis-computation-governance-common-adjustment"},"6.1.5 linkis-computation-governance-common adjustment"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.2")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.0")\n')),(0,t.kt)("h2",{id:"7-cdh-version-adaptation"},"7 CDH Version adaptation"),(0,t.kt)("h3",{id:"71-maven-configure-address"},"7.1 maven Configure address"),(0,t.kt)("h4",{id:"711-setting-file"},"7.1.1 setting file"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<mirrors>\n  \x3c!-- mirror\n   | Specifies a repository mirror site to use instead of a given repository. The repository that\n   | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used\n   | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.\n   |\n  <mirror>\n    <id>mirrorId</id>\n    <mirrorOf>repositoryId</mirrorOf>\n    <name>Human Readable Name for this Mirror.</name>\n    <url>http://my.repository.com/repo/path</url>\n  </mirror>\n   --\x3e\n   <mirror>\n       <id>nexus-aliyun</id>\n       <mirrorOf>*,!cloudera</mirrorOf>\n       <name>Nexus aliyun</name>\n       <url>http://maven.aliyun.com/nexus/content/groups/public</url>\n   </mirror>\n   <mirror>\n       <id>aliyunmaven</id>\n       <mirrorOf>*,!cloudera</mirrorOf>\n       <name>Alibaba Cloud Public Warehouse</name>\n       <url>https://maven.aliyun.com/repository/public</url>\n   </mirror>\n   <mirror>\n       <id>aliyunmaven</id>\n       <mirrorOf>*,!cloudera</mirrorOf>\n       <name>spring-plugin</name>\n       <url>https://maven.aliyun.com/repository/spring-plugin</url>\n   </mirror>\n  <mirror>\n    <id>maven-default-http-blocker</id>\n    <mirrorOf>external:http:*</mirrorOf>\n    <name>Pseudo repository to mirror external repositories initially using HTTP.</name>\n    <url>http://0.0.0.0/</url>\n    <blocked>true</blocked>\n  </mirror>\n</mirrors>\n")),(0,t.kt)("h4",{id:"712-the-pom-file-of-linkis"},"7.1.2 The pom file of linkis"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"    <repositories>\n        <repository>\n            <id>cloudera</id>\n            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>\n            <releases>\n                <enabled>true</enabled>\n            </releases>\n        </repository>\n        \x3c!--To prevent cloudera from not being found, add Alibaba Source--\x3e\n        <repository>\n            <id>aliyun</id>\n            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>\n            <releases>\n                <enabled>true</enabled>\n            </releases>\n        </repository>\n    </repositories>\n")),(0,t.kt)("h3",{id:"72-cdh5121-version"},"7.2 CDH5.12.1 version"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"engine"),(0,t.kt)("th",{parentName:"tr",align:null},"version"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"2.6.0-cdh5.12.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"zookeeper"),(0,t.kt)("td",{parentName:"tr",align:null},"3.4.5-cdh5.12.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"1.1.0-cdh5.12.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"2.3.4")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"flink"),(0,t.kt)("td",{parentName:"tr",align:null},"1.12.4")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"python"),(0,t.kt)("td",{parentName:"tr",align:null},"python3")))),(0,t.kt)("h4",{id:"721-the-pom-file-of-linkis"},"7.2.1 The pom file of linkis"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hadoop.version>2.6.0-cdh5.12.1</hadoop.version>\n<zookeeper.version>3.4.5-cdh5.12.1</zookeeper.version>\n<scala.version>2.11.8</scala.version>\n")),(0,t.kt)("h4",{id:"722-the-pom-file-of-linkis-engineplugin-hive"},"7.2.2 The pom file of linkis-engineplugin-hive"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"-- update\n<hive.version>1.1.0-cdh5.12.1</hive.version>\n-- add\n<package.hive.version>1.1.0_cdh5.12.1</package.hive.version>\n")),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"update assembly under distribution.xml file")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>\n<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>\n<outputDirectory>plugin/${package.hive.version}</outputDirectory>\n")),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"update CustomerDelimitedJSONSerDe file"),(0,t.kt)("pre",{parentName:"li"},(0,t.kt)("code",{parentName:"pre"},"   /* hive version is too low and needs to be noted\n   case INTERVAL_YEAR_MONTH:\n       {\n           wc = ((HiveIntervalYearMonthObjectInspector) oi).getPrimitiveWritableObject(o);\n           binaryData = Base64.encodeBase64(String.valueOf(wc).getBytes());\n           break;\n       }\n   case INTERVAL_DAY_TIME:\n       {\n           wc = ((HiveIntervalDayTimeObjectInspector) oi).getPrimitiveWritableObject(o);\n           binaryData = Base64.encodeBase64(String.valueOf(wc).getBytes());\n           break;\n       }\n   */\n")))),(0,t.kt)("h4",{id:"723--the-pom-file-of-linkis-engineplugin-flink"},"7.2.3  The pom file of linkis-engineplugin-flink"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<flink.version>1.12.4</flink.version>\n")),(0,t.kt)("h4",{id:"724-the-pom-file-of-linkis-engineplugin-spark"},"7.2.4 The pom file of linkis-engineplugin-spark"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<spark.version>2.3.4</spark.version>\n")),(0,t.kt)("h4",{id:"725-the-pom-file-of-linkis-engineplugin-python"},"7.2.5 The pom file of linkis-engineplugin-python"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<python.version>python3</python.version>\n")),(0,t.kt)("h4",{id:"726-linkis-label-common-adjustment"},"7.2.6 linkis-label-common adjustment"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig  file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'   public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.4");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "1.1.0");\n\n            CommonVars.apply("wds.linkis.python.engine.version", "python3")\n')),(0,t.kt)("h4",{id:"727-linkis-computation-governance-common-adjustment"},"7.2.7 linkis-computation-governance-common adjustment"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.4")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "1.1.0")\n      \n  val PYTHON_ENGINE_VERSION = CommonVars("wds.linkis.python.engine.version", "python3")\n')),(0,t.kt)("h3",{id:"73-cdh632"},"7.3 CDH6.3.2"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"engine"),(0,t.kt)("th",{parentName:"tr",align:null},"version"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"3.0.0-cdh6.3.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"2.1.1-cdh6.3.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"3.0.0")))),(0,t.kt)("h4",{id:"731-the-pom-file-of-linkis"},"7.3.1 The pom file of linkis"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hadoop.version>3.0.0-cdh6.3.2</hadoop.version> \n<scala.version>2.12.10</scala.version>\n")),(0,t.kt)("h4",{id:"732--the-pom-file-of-linkis-hadoop-common"},"7.3.2  The pom file of linkis-hadoop-common"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"   \x3c!-- hadoop-hdfs replace with hadoop-hdfs-client --\x3e \n   <dependency>\n      <groupId>org.apache.hadoop</groupId>\n      <artifactId>hadoop-hdfs-client</artifactId>\n    </dependency>\n")),(0,t.kt)("h4",{id:"733-the-pom-file-of-linkis-engineplugin-hive"},"7.3.3 The pom file of linkis-engineplugin-hive"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"-- update\n<hive.version>2.1.1-cdh6.3.2</hive.version>\n-- add\n<package.hive.version>2.1.1_cdh6.3.2</package.hive.version>\n")),(0,t.kt)("p",null,"update assembly under distribution.xml file"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>\n<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>\n<outputDirectory>plugin/${package.hive.version}</outputDirectory>\n")),(0,t.kt)("h4",{id:"734--the-pom-file-of-linkis-engineplugin-spark"},"7.3.4  The pom file of linkis-engineplugin-spark"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<spark.version>3.0.0</spark.version>\n")),(0,t.kt)("h4",{id:"735-linkis-label-common-adjustment"},"7.3.5 linkis-label-common adjustment"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig  file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'   public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.0");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2");\n')),(0,t.kt)("h4",{id:"736-linkis-computation-governance-common-adjustment"},"7.3.6 linkis-computation-governance-common adjustment"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf  file adjustment"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.0")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2")\n')),(0,t.kt)("h2",{id:"8-compilation-skills"},"8 Compilation Skills"),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"If the class is missing or the method in the class is missing, find the corresponding package dependency, and how to try to switch to the version with the corresponding package or class"),(0,t.kt)("li",{parentName:"ul"},"If the engine version needs to use -, use _  to replace, add<package.(engine name).version>to specify the  replaced version, and use ${package.(engine name). version} in the  corresponding engine distribution file to replace the original"),(0,t.kt)("li",{parentName:"ul"},"If sometimes there is a 403 problem when using Alibaba Cloud images to download the jars of guava, you can switch to Huawei, Tencent and other image warehouses")))}c.isMDXComponent=!0}}]);