"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[28017],{3905:(e,n,a)=>{a.d(n,{Zo:()=>m,kt:()=>u});var i=a(67294);function t(e,n,a){return n in e?Object.defineProperty(e,n,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[n]=a,e}function l(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?l(Object(a),!0).forEach((function(n){t(e,n,a[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))}))}return e}function r(e,n){if(null==e)return{};var a,i,t=function(e,n){if(null==e)return{};var a,i,t={},l=Object.keys(e);for(i=0;i<l.length;i++)a=l[i],n.indexOf(a)>=0||(t[a]=e[a]);return t}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(i=0;i<l.length;i++)a=l[i],n.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(t[a]=e[a])}return t}var p=i.createContext({}),s=function(e){var n=i.useContext(p),a=n;return e&&(a="function"==typeof e?e(n):o(o({},n),e)),a},m=function(e){var n=s(e.components);return i.createElement(p.Provider,{value:n},e.children)},k="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},c=i.forwardRef((function(e,n){var a=e.components,t=e.mdxType,l=e.originalType,p=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),k=s(a),c=t,u=k["".concat(p,".").concat(c)]||k[c]||d[c]||l;return a?i.createElement(u,o(o({ref:n},m),{},{components:a})):i.createElement(u,o({ref:n},m))}));function u(e,n){var a=arguments,t=n&&n.mdxType;if("string"==typeof e||t){var l=a.length,o=new Array(l);o[0]=c;var r={};for(var p in n)hasOwnProperty.call(n,p)&&(r[p]=n[p]);r.originalType=e,r[k]="string"==typeof e?e:t,o[1]=r;for(var s=2;s<l;s++)o[s]=a[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,a)}c.displayName="MDXCreateElement"},11179:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>r,toc:()=>s});var i=a(87462),t=(a(67294),a(3905));const l={title:"\u7248\u672c\u9002\u914d",sidebar_position:8},o="\u7248\u672c\u9002\u914d",r={unversionedId:"deployment/version-adaptation",id:"deployment/version-adaptation",title:"\u7248\u672c\u9002\u914d",description:"1. \u529f\u80fd\u8bf4\u660e",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/deployment/version-adaptation.md",sourceDirName:"deployment",slug:"/deployment/version-adaptation",permalink:"/zh-CN/docs/1.5.0/deployment/version-adaptation",draft:!1,editUrl:"https://github.com/apache/linkis-website/edit/dev/i18n/zh-CN/docusaurus-plugin-content-docs/current/deployment/version-adaptation.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{title:"\u7248\u672c\u9002\u914d",sidebar_position:8},sidebar:"tutorialSidebar",previous:{title:"\u5f15\u64ce\u7684\u5b89\u88c5",permalink:"/zh-CN/docs/1.5.0/deployment/install-engineconn"},next:{title:"\u96c6\u6210 Hive\u8840\u7f18",permalink:"/zh-CN/docs/1.5.0/deployment/integrated/hive-lineage"}},p={},s=[{value:"1. \u529f\u80fd\u8bf4\u660e",id:"1-\u529f\u80fd\u8bf4\u660e",level:2},{value:"2. \u7f16\u8bd1\u6307\u4ee4",id:"2-\u7f16\u8bd1\u6307\u4ee4",level:2},{value:"3. SQL\u811a\u672c\u5207\u6362",id:"3-sql\u811a\u672c\u5207\u6362",level:2},{value:"4. Linkis\u5b98\u65b9\u7248\u672c",id:"4-linkis\u5b98\u65b9\u7248\u672c",level:2},{value:"5. Apache\u7248\u672c\u9002\u914d",id:"5-apache\u7248\u672c\u9002\u914d",level:2},{value:"5.1 Apache3.1.x\u7248\u672c",id:"51-apache31x\u7248\u672c",level:3},{value:"5.1.1 linkis\u7684pom\u6587\u4ef6",id:"511-linkis\u7684pom\u6587\u4ef6",level:4},{value:"5.1.2 linkis-hadoop-common\u7684pom\u6587\u4ef6",id:"512-linkis-hadoop-common\u7684pom\u6587\u4ef6",level:4},{value:"5.1.3 linkis-engineplugin-hive\u7684pom\u6587\u4ef6",id:"513-linkis-engineplugin-hive\u7684pom\u6587\u4ef6",level:4},{value:"5.1.4 linkis-engineplugin-spark\u7684pom\u6587\u4ef6",id:"514-linkis-engineplugin-spark\u7684pom\u6587\u4ef6",level:4},{value:"5.1.5 flink-engineconn-flink\u7684pom\u6587\u4ef6",id:"515-flink-engineconn-flink\u7684pom\u6587\u4ef6",level:4},{value:"5.1.6 linkis-label-common\u8c03\u6574",id:"516-linkis-label-common\u8c03\u6574",level:4},{value:"5.1.7 linkis-computation-governance-common\u8c03\u6574",id:"517-linkis-computation-governance-common\u8c03\u6574",level:4},{value:"6. HDP\u7248\u672c\u9002\u914d",id:"6-hdp\u7248\u672c\u9002\u914d",level:2},{value:"6.1 HDP3.0.1\u7248\u672c",id:"61-hdp301\u7248\u672c",level:3},{value:"6.1.1 linkis\u7684pom\u6587\u4ef6",id:"611-linkis\u7684pom\u6587\u4ef6",level:4},{value:"6.1.2 linkis-engineplugin-hive\u7684pom\u6587\u4ef6",id:"612-linkis-engineplugin-hive\u7684pom\u6587\u4ef6",level:4},{value:"6.1.3 linkis-engineplugin-spark\u7684pom\u6587\u4ef6",id:"613-linkis-engineplugin-spark\u7684pom\u6587\u4ef6",level:4},{value:"6.1.4 linkis-label-common\u8c03\u6574",id:"614-linkis-label-common\u8c03\u6574",level:4},{value:"6.1.5 linkis-computation-governance-common\u8c03\u6574",id:"615-linkis-computation-governance-common\u8c03\u6574",level:4},{value:"7 CDH\u7248\u672c\u9002\u914d",id:"7-cdh\u7248\u672c\u9002\u914d",level:2},{value:"7.1 maven\u914d\u7f6e\u5730\u5740",id:"71-maven\u914d\u7f6e\u5730\u5740",level:3},{value:"7.1.1 setting\u6587\u4ef6",id:"711-setting\u6587\u4ef6",level:4},{value:"7.1.2 linkis\u7684pom\u6587\u4ef6",id:"712-linkis\u7684pom\u6587\u4ef6",level:4},{value:"7.2 CDH5.12.1\u7248\u672c",id:"72-cdh5121\u7248\u672c",level:3},{value:"7.2.1 linkis\u7684pom\u6587\u4ef6",id:"721-linkis\u7684pom\u6587\u4ef6",level:4},{value:"7.2.2 linkis-engineplugin-hive\u7684pom\u6587\u4ef6",id:"722-linkis-engineplugin-hive\u7684pom\u6587\u4ef6",level:4},{value:"7.2.3 linkis-engineplugin-flink\u7684pom\u6587\u4ef6",id:"723-linkis-engineplugin-flink\u7684pom\u6587\u4ef6",level:4},{value:"7.2.4 linkis-engineplugin-spark\u7684pom\u6587\u4ef6",id:"724-linkis-engineplugin-spark\u7684pom\u6587\u4ef6",level:4},{value:"7.2.5 linkis-engineplugin-python\u7684pom\u6587\u4ef6",id:"725-linkis-engineplugin-python\u7684pom\u6587\u4ef6",level:4},{value:"7.2.6 linkis-label-common\u8c03\u6574",id:"726-linkis-label-common\u8c03\u6574",level:4},{value:"7.2.7 linkis-computation-governance-common\u8c03\u6574",id:"727-linkis-computation-governance-common\u8c03\u6574",level:4},{value:"7.3 CDH6.3.2",id:"73-cdh632",level:3},{value:"7.3.1 linkis\u7684pom\u6587\u4ef6",id:"731-linkis\u7684pom\u6587\u4ef6",level:4},{value:"7.3.2 linkis-hadoop-common",id:"732-linkis-hadoop-common",level:4},{value:"7.3.3 linkis-engineplugin-hive\u7684pom\u6587\u4ef6",id:"733-linkis-engineplugin-hive\u7684pom\u6587\u4ef6",level:4},{value:"7.3.4 linkis-engineplugin-spark\u7684pom\u6587\u4ef6",id:"734-linkis-engineplugin-spark\u7684pom\u6587\u4ef6",level:4},{value:"7.3.5 linkis-label-common\u8c03\u6574",id:"735-linkis-label-common\u8c03\u6574",level:4},{value:"7.3.6 linkis-computation-governance-common\u8c03\u6574",id:"736-linkis-computation-governance-common\u8c03\u6574",level:4},{value:"8 \u7f16\u8bd1\u6280\u5de7",id:"8-\u7f16\u8bd1\u6280\u5de7",level:2}],m={toc:s},k="wrapper";function d(e){let{components:n,...a}=e;return(0,t.kt)(k,(0,i.Z)({},m,a,{components:n,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"\u7248\u672c\u9002\u914d"},"\u7248\u672c\u9002\u914d"),(0,t.kt)("h2",{id:"1-\u529f\u80fd\u8bf4\u660e"},"1. \u529f\u80fd\u8bf4\u660e"),(0,t.kt)("p",null,"\u9488\u5bf9Apache,CDH,HDP\u7b49\u7248\u672c\u9002\u914d\u9700\u8981\u624b\u52a8\u4fee\u6539\u7684\u5730\u65b9\u8fdb\u884c\u8bf4\u660e"),(0,t.kt)("h2",{id:"2-\u7f16\u8bd1\u6307\u4ee4"},"2. \u7f16\u8bd1\u6307\u4ee4"),(0,t.kt)("p",null,"\u8fdb\u5165\u5230\u9879\u76ee\u7684\u6839\u76ee\u5f55\u4e0b,\u4f9d\u6b21\u6267\u884c\u5982\u4e0b\u6307\u4ee4"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Dmaven.test.skip=true\n")),(0,t.kt)("h2",{id:"3-sql\u811a\u672c\u5207\u6362"},"3. SQL\u811a\u672c\u5207\u6362"),(0,t.kt)("p",null,"linkis-dist -> package -> db \u4e0b\u7684 linkis-dml.sql \u811a\u672c"),(0,t.kt)("p",null,"\u5c06\u5bf9\u5e94\u7684\u5f15\u64ce\u7248\u672c\u5207\u6362\u4e3a\u81ea\u5df1\u9700\u8981\u7684\u7248\u672c\uff0c\u5982\u679c\u4f60\u4f7f\u7528\u7684\u7248\u672c\u548c\u5b98\u65b9\u4e00\u81f4\u7684\u8bdd,\u5219\u65e0\u9700\u4fee\u6539\u6b64\u6b65"),(0,t.kt)("p",null,"\u6bd4\u5982:   "),(0,t.kt)("ol",null,(0,t.kt)("li",{parentName:"ol"},'spark\u662f3.0.0\u7684\u8bdd,\u5219\u6b64\u5904\u662f SET @SPARK_LABEL="spark-3.0.0";'),(0,t.kt)("li",{parentName:"ol"},'hive\u662f2.1.1-cdh6.3.2\u7684\u8bdd,\u9700\u5148\u8c03\u65742.1.1_cdh6.3.2(\u6784\u5efa\u65f6),\u5219\u6b64\u5904\u662f SET @HIVE_LABEL="hive-2.1.1_cdh6.3.2";')),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-sql"},'-- \u53d8\u91cf\uff1a\nSET @SPARK_LABEL="spark-2.4.3";\nSET @HIVE_LABEL="hive-2.3.3";\nSET @PYTHON_LABEL="python-python2";\nSET @PIPELINE_LABEL="pipeline-1";\nSET @JDBC_LABEL="jdbc-4";\nSET @PRESTO_LABEL="presto-0.234";\nSET @IO_FILE_LABEL="io_file-1.0";\nSET @OPENLOOKENG_LABEL="openlookeng-1.5.0";\n')),(0,t.kt)("h2",{id:"4-linkis\u5b98\u65b9\u7248\u672c"},"4. Linkis\u5b98\u65b9\u7248\u672c"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"\u5f15\u64ce"),(0,t.kt)("th",{parentName:"tr",align:null},"\u7248\u672c"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"2.7.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"2.3.3")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"2.4.3")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"flink"),(0,t.kt)("td",{parentName:"tr",align:null},"1.12.2")))),(0,t.kt)("h2",{id:"5-apache\u7248\u672c\u9002\u914d"},"5. Apache\u7248\u672c\u9002\u914d"),(0,t.kt)("h3",{id:"51-apache31x\u7248\u672c"},"5.1 Apache3.1.x\u7248\u672c"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"\u5f15\u64ce"),(0,t.kt)("th",{parentName:"tr",align:null},"\u7248\u672c"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"3.0.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"flink"),(0,t.kt)("td",{parentName:"tr",align:null},"1.13.2")))),(0,t.kt)("h4",{id:"511-linkis\u7684pom\u6587\u4ef6"},"5.1.1 linkis\u7684pom\u6587\u4ef6"),(0,t.kt)("p",null,"Linkis\u7248\u672c\u5c0f\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<hadoop.version>3.1.1</hadoop.version>\n<scala.version>2.12.10</scala.version>\n<scala.binary.version>2.12</scala.binary.version>\n\n\x3c!-- \u5c06hadoop-hdfs \u66ff\u6362\u6210\u4e3ahadoop-hdfs-client --\x3e\n<dependency>\n    <groupId>org.apache.hadoop</groupId>\n    <artifactId>hadoop-hdfs-client</artifactId>\n    <version>${hadoop.version}</version>\n<dependency>\n")),(0,t.kt)("p",null,"\u5f53Linkis\u7248\u672c\u5927\u4e8e\u7b49\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6, \u53ea\u9700\u8981\u8bbe\u7f6e ",(0,t.kt)("inlineCode",{parentName:"p"},"scala.version")," and ",(0,t.kt)("inlineCode",{parentName:"p"},"scala.binary.version")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<scala.version>2.12.10</scala.version>\n<scala.binary.version>2.12</scala.binary.version>\n")),(0,t.kt)("p",null,"\u56e0\u4e3a\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-3.3")," or ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-2.7")," profile\u6765\u7f16\u8bd1\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-3.3")," \u53ef\u4ee5\u7528\u4e8e\u4efb\u610fhadoop3.x, \u9ed8\u8ba4hadoop3.x\u7248\u672c\u662f3.3.1,\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-2.7")," \u53ef\u4ee5\u7528\u4e8e\u4efb\u610fhadoop2.x, \u9ed8\u8ba4hadoop2.x\u7248\u672c\u662f2.7.2,\n\u60f3\u8981\u7528\u5176\u4ed6\u7248\u672c\u53ef\u4ee5\u7f16\u8bd1\u65f6\u6307\u5b9a -Dhadoop.version=xxx"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"512-linkis-hadoop-common\u7684pom\u6587\u4ef6"},"5.1.2 linkis-hadoop-common\u7684pom\u6587\u4ef6"),(0,t.kt)("p",null,"Linkis\u7248\u672c\u5c0f\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"\x3c!-- \u6ce8\u610f\u8fd9\u91cc\u7684 <version>${hadoop.version}</version> , \u6839\u636e\u4f60\u6709\u6ca1\u6709\u9047\u5230\u9519\u8bef\u6765\u8fdb\u884c\u8c03\u6574 --\x3e \n<dependency>\n    <groupId>org.apache.hadoop</groupId>\n    <artifactId>hadoop-hdfs-client</artifactId>\n    <version>${hadoop.version}</version>\n</dependency>\n")),(0,t.kt)("p",null,"\u5f53Linkis\u7248\u672c\u5927\u4e8e\u7b49\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6,",(0,t.kt)("inlineCode",{parentName:"p"},"linkis-hadoop-common"),"\u6a21\u5757\u4e0d\u9700\u8981\u53d8\u66f4"),(0,t.kt)("h4",{id:"513-linkis-engineplugin-hive\u7684pom\u6587\u4ef6"},"5.1.3 linkis-engineplugin-hive\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<hive.version>3.1.2</hive.version>\n")),(0,t.kt)("h4",{id:"514-linkis-engineplugin-spark\u7684pom\u6587\u4ef6"},"5.1.4 linkis-engineplugin-spark\u7684pom\u6587\u4ef6"),(0,t.kt)("p",null,"Linkis\u7248\u672c\u5c0f\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<spark.version>3.0.1</spark.version>\n")),(0,t.kt)("p",null,"\u5f53Linkis\u7248\u672c\u5927\u4e8e\u7b49\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u7f16\u8bd1spark-3.2 profile, \u5982\u679c\u6211\u4eec\u540c\u65f6\u4f7f\u7528hadoop3, \u90a3\u4e48\u6211\u4eec\u8fd8\u9700\u8981\u6307\u5b9ahadoop-3.3 profile.\n\u9ed8\u8ba4 spark3.x \u7248\u672c\u65f63.2.1. \u5982\u679c\u6211\u4eec\u4f7f\u7528spark-3.2 profile\u7f16\u8bd1, scala\u7248\u672c\u9ed8\u8ba4\u662f2.12.15,\u56e0\u6b64\u6211\u4eec\u4e0d\u9700\u8981\u5728\u9879\u76ee\u6839\u76ee\u5f55\u8bbe\u7f6escala\u7248\u672c\u4e86\uff085.1.1\u63d0\u5230\u5f53)\n\u5982\u679cLinkis\u4f7f\u7528hadoop3\u7f16\u8bd1\uff0c\u540c\u65f6spark\u4ecd\u65e7\u662f2.x\u7248\u672c\u7684\u8bdd\uff0c\u7531\u4e8espark\u517c\u5bb9\u6027\u95ee\u9898\u9700\u8981\u6fc0\u6d3bprofile `spark-2.4-hadoop-3.3`\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"515-flink-engineconn-flink\u7684pom\u6587\u4ef6"},"5.1.5 flink-engineconn-flink\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<flink.version>1.13.2</flink.version>\n")),(0,t.kt)("admonition",{title:"\u4e34\u65f6\u65b9\u6848",type:"caution"},(0,t.kt)("p",{parentName:"admonition"},"\u6ce8\u610f\u4ee5\u4e0b\u590d\u5236\u7c7b\u64cd\u4f5c\u5747\u5728flink\u4e2d"),(0,t.kt)("p",{parentName:"admonition"},"\u7531\u4e8eflink1.12.2\u52301.13.2\u7248\u672c,\u6709\u90e8\u5206\u7c7b\u8fdb\u884c\u8c03\u6574,\u6240\u4ee5\u9700\u8981\u8fdb\u884cflink\u7684\u7f16\u8bd1\u548c\u8c03\u6574,\u7f16\u8bd1flink\u9009\u62e9scala\u7684\u7248\u672c\u4e3a2.12\u7248\u672c(scala\u7248\u672c\u6839\u636e\u81ea\u5df1\u7684\u5b9e\u9645\u4f7f\u7528\u7248\u672c\u6765)"),(0,t.kt)("p",{parentName:"admonition"},"flink\u7f16\u8bd1\u53c2\u8003\u6307\u4ee4: mvn clean install -DskipTests -P scala-2.12 -Dfast -T 4 -Dmaven.compile.fock=true")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"-- \u6ce8\u610f,\u4e0b\u5217\u7684\u7c7b\u662f\u4eceflink\u76841.12.2\u7248\u672c\u7ed9copy\u5230flink\u76841.13.2\u7248\u672c\u6765\norg.apache.flink.table.client.config.entries.DeploymentEntry\norg.apache.flink.table.client.config.entries.ExecutionEntry\norg.apache.flink.table.client.gateway.local.CollectBatchTableSink\norg.apache.flink.table.client.gateway.local.CollectStreamTableSink\n")),(0,t.kt)("h4",{id:"516-linkis-label-common\u8c03\u6574"},"5.1.6 linkis-label-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'    public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.1");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.2");\n')),(0,t.kt)("h4",{id:"517-linkis-computation-governance-common\u8c03\u6574"},"5.1.7 linkis-computation-governance-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.1")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.2")\n')),(0,t.kt)("h2",{id:"6-hdp\u7248\u672c\u9002\u914d"},"6. HDP\u7248\u672c\u9002\u914d"),(0,t.kt)("h3",{id:"61-hdp301\u7248\u672c"},"6.1 HDP3.0.1\u7248\u672c"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"\u5f15\u64ce"),(0,t.kt)("th",{parentName:"tr",align:null},"\u7248\u672c"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"3.1.0")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"2.3.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"json4s.version"),(0,t.kt)("td",{parentName:"tr",align:null},"3.2.11")))),(0,t.kt)("h4",{id:"611-linkis\u7684pom\u6587\u4ef6"},"6.1.1 linkis\u7684pom\u6587\u4ef6"),(0,t.kt)("p",null,"Linkis\u7248\u672c\u5c0f\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<hadoop.version>3.1.1</hadoop.version>\n<json4s.version>3.2.11</json4s.version>\n    \n\x3c!-- \u5c06hadoop-hdfs \u66ff\u6362\u6210\u4e3ahadoop-hdfs-client --\x3e\n<dependency>\n    <groupId>org.apache.hadoop</groupId>\n    <artifactId>hadoop-hdfs-client</artifactId>\n    <version>${hadoop.version}</version>\n<dependency>\n")),(0,t.kt)("p",null,"\u5f53Linkis\u7248\u672c\u5927\u4e8e\u7b49\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6, \u53ea\u9700\u8981\u8bbe\u7f6e ",(0,t.kt)("inlineCode",{parentName:"p"},"json4s.version")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<json4s.version>3.2.11</json4s.version>\n")),(0,t.kt)("p",null,"\u56e0\u4e3a\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u4f7f\u7528",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-3.3")," or ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-2.7")," profile\u6765\u7f16\u8bd1\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-3.3")," \u53ef\u4ee5\u7528\u4e8e\u4efb\u610fhadoop3.x, \u9ed8\u8ba4hadoop3.x\u7248\u672c\u662f3.3.1,\nProfile ",(0,t.kt)("inlineCode",{parentName:"p"},"hadoop-2.7")," \u53ef\u4ee5\u7528\u4e8e\u4efb\u610fhadoop2.x, \u9ed8\u8ba4hadoop2.x\u7248\u672c\u662f2.7.2,\n\u60f3\u8981\u7528\u5176\u4ed6\u7248\u672c\u53ef\u4ee5\u7f16\u8bd1\u65f6\u6307\u5b9a -Dhadoop.version=xxx"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Phadoop-3.3 -Dhadoop.version=3.1.1 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"612-linkis-engineplugin-hive\u7684pom\u6587\u4ef6"},"6.1.2 linkis-engineplugin-hive\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<hive.version>3.1.0</hive.version>\n")),(0,t.kt)("h4",{id:"613-linkis-engineplugin-spark\u7684pom\u6587\u4ef6"},"6.1.3 linkis-engineplugin-spark\u7684pom\u6587\u4ef6"),(0,t.kt)("p",null,"Linkis\u7248\u672c\u5c0f\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},"<spark.version>2.3.2</spark.version>\n")),(0,t.kt)("p",null,"\u5f53Linkis\u7248\u672c\u5927\u4e8e\u7b49\u4e8e",(0,t.kt)("inlineCode",{parentName:"p"},"1.3.2"),"\u65f6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"\u6211\u4eec\u53ef\u4ee5\u76f4\u63a5\u7f16\u8bd1spark-3.2 profile, \u5982\u679c\u6211\u4eec\u540c\u65f6\u4f7f\u7528hadoop3, \u90a3\u4e48\u6211\u4eec\u8fd8\u9700\u8981\u6307\u5b9ahadoop-3.3 profile.\n\u9ed8\u8ba4 spark3.x \u7248\u672c\u65f63.2.1. \u5982\u679c\u6211\u4eec\u4f7f\u7528spark-3.2 profile\u7f16\u8bd1, scala\u7248\u672c\u9ed8\u8ba4\u662f2.12.15,\u56e0\u6b64\u6211\u4eec\u4e0d\u9700\u8981\u5728\u9879\u76ee\u6839\u76ee\u5f55\u8bbe\u7f6escala\u7248\u672c\u4e86\uff085.1.1\u63d0\u5230\u5f53)\n\u5982\u679cLinkis\u4f7f\u7528hadoop3\u7f16\u8bd1\uff0c\u540c\u65f6spark\u4ecd\u65e7\u662f2.x\u7248\u672c\u7684\u8bdd\uff0c\u7531\u4e8espark\u517c\u5bb9\u6027\u95ee\u9898\u9700\u8981\u6fc0\u6d3bprofile `spark-2.4-hadoop-3.3`\n")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-text"},"mvn -N  install\nmvn clean install -Pspark-3.2 -Phadoop-3.3 -Dmaven.test.skip=true\nmvn clean install -Pspark-2.4-hadoop-3.3 -Phadoop-3.3 -Dmaven.test.skip=true\n")),(0,t.kt)("h4",{id:"614-linkis-label-common\u8c03\u6574"},"6.1.4 linkis-label-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'    public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.2");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "3.1.0");\n')),(0,t.kt)("h4",{id:"615-linkis-computation-governance-common\u8c03\u6574"},"6.1.5 linkis-computation-governance-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.2")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "3.1.0")\n')),(0,t.kt)("h2",{id:"7-cdh\u7248\u672c\u9002\u914d"},"7 CDH\u7248\u672c\u9002\u914d"),(0,t.kt)("h3",{id:"71-maven\u914d\u7f6e\u5730\u5740"},"7.1 maven\u914d\u7f6e\u5730\u5740"),(0,t.kt)("h4",{id:"711-setting\u6587\u4ef6"},"7.1.1 setting\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<mirrors>\n  \x3c!-- mirror\n   | Specifies a repository mirror site to use instead of a given repository. The repository that\n   | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used\n   | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.\n   |\n  <mirror>\n    <id>mirrorId</id>\n    <mirrorOf>repositoryId</mirrorOf>\n    <name>Human Readable Name for this Mirror.</name>\n    <url>http://my.repository.com/repo/path</url>\n  </mirror>\n   --\x3e\n   <mirror>\n       <id>nexus-aliyun</id>\n       <mirrorOf>*,!cloudera</mirrorOf>\n       <name>Nexus aliyun</name>\n       <url>http://maven.aliyun.com/nexus/content/groups/public</url>\n   </mirror>\n   <mirror>\n       <id>aliyunmaven</id>\n       <mirrorOf>*,!cloudera</mirrorOf>\n       <name>\u963f\u91cc\u4e91\u516c\u5171\u4ed3\u5e93</name>\n       <url>https://maven.aliyun.com/repository/public</url>\n   </mirror>\n   <mirror>\n       <id>aliyunmaven</id>\n       <mirrorOf>*,!cloudera</mirrorOf>\n       <name>spring-plugin</name>\n       <url>https://maven.aliyun.com/repository/spring-plugin</url>\n   </mirror>\n  <mirror>\n    <id>maven-default-http-blocker</id>\n    <mirrorOf>external:http:*</mirrorOf>\n    <name>Pseudo repository to mirror external repositories initially using HTTP.</name>\n    <url>http://0.0.0.0/</url>\n    <blocked>true</blocked>\n  </mirror>\n</mirrors>\n")),(0,t.kt)("h4",{id:"712-linkis\u7684pom\u6587\u4ef6"},"7.1.2 linkis\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"    <repositories>\n        <repository>\n            <id>cloudera</id>\n            <url>https://repository.cloudera.com/artifactory/cloudera-repos/</url>\n            <releases>\n                <enabled>true</enabled>\n            </releases>\n        </repository>\n        \x3c!--\u9632\u6b62cloudera\u627e\u4e0d\u5230\uff0c\u52a0\u4e0a\u963f\u91cc\u6e90--\x3e\n        <repository>\n            <id>aliyun</id>\n            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>\n            <releases>\n                <enabled>true</enabled>\n            </releases>\n        </repository>\n    </repositories>\n")),(0,t.kt)("h3",{id:"72-cdh5121\u7248\u672c"},"7.2 CDH5.12.1\u7248\u672c"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"\u5f15\u64ce"),(0,t.kt)("th",{parentName:"tr",align:null},"\u7248\u672c"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"2.6.0-cdh5.12.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"zookeeper"),(0,t.kt)("td",{parentName:"tr",align:null},"3.4.5-cdh5.12.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"1.1.0-cdh5.12.1")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"2.3.4")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"flink"),(0,t.kt)("td",{parentName:"tr",align:null},"1.12.4")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"python"),(0,t.kt)("td",{parentName:"tr",align:null},"python3")))),(0,t.kt)("h4",{id:"721-linkis\u7684pom\u6587\u4ef6"},"7.2.1 linkis\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hadoop.version>2.6.0-cdh5.12.1</hadoop.version>\n<zookeeper.version>3.4.5-cdh5.12.1</zookeeper.version>\n<scala.version>2.11.8</scala.version>\n")),(0,t.kt)("h4",{id:"722-linkis-engineplugin-hive\u7684pom\u6587\u4ef6"},"7.2.2 linkis-engineplugin-hive\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"-- \u4fee\u6539\n<hive.version>1.1.0-cdh5.12.1</hive.version>\n-- \u6dfb\u52a0\n<package.hive.version>1.1.0_cdh5.12.1</package.hive.version>\n")),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"\u4fee\u6539 assembly \u4e0b\u7684 distribution.xml \u6587\u4ef6")),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>\n<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>\n<outputDirectory>plugin/${package.hive.version}</outputDirectory>\n")),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},(0,t.kt)("p",{parentName:"li"},"\u4fee\u6539CustomerDelimitedJSONSerDe\u6587\u4ef6"),(0,t.kt)("pre",{parentName:"li"},(0,t.kt)("code",{parentName:"pre"},"   /* hive\u7248\u672c\u8fc7\u4f4e\uff0c\u9700\u6ce8\u91ca\n   case INTERVAL_YEAR_MONTH:\n       {\n           wc = ((HiveIntervalYearMonthObjectInspector) oi).getPrimitiveWritableObject(o);\n           binaryData = Base64.encodeBase64(String.valueOf(wc).getBytes());\n           break;\n       }\n   case INTERVAL_DAY_TIME:\n       {\n           wc = ((HiveIntervalDayTimeObjectInspector) oi).getPrimitiveWritableObject(o);\n           binaryData = Base64.encodeBase64(String.valueOf(wc).getBytes());\n           break;\n       }\n   */\n")))),(0,t.kt)("h4",{id:"723-linkis-engineplugin-flink\u7684pom\u6587\u4ef6"},"7.2.3 linkis-engineplugin-flink\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<flink.version>1.12.4</flink.version>\n")),(0,t.kt)("h4",{id:"724-linkis-engineplugin-spark\u7684pom\u6587\u4ef6"},"7.2.4 linkis-engineplugin-spark\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<spark.version>2.3.4</spark.version>\n")),(0,t.kt)("h4",{id:"725-linkis-engineplugin-python\u7684pom\u6587\u4ef6"},"7.2.5 linkis-engineplugin-python\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<python.version>python3</python.version>\n")),(0,t.kt)("h4",{id:"726-linkis-label-common\u8c03\u6574"},"7.2.6 linkis-label-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'   public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "2.3.4");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "1.1.0");\n\n            CommonVars.apply("wds.linkis.python.engine.version", "python3")\n')),(0,t.kt)("h4",{id:"727-linkis-computation-governance-common\u8c03\u6574"},"7.2.7 linkis-computation-governance-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "2.3.4")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "1.1.0")\n      \n  val PYTHON_ENGINE_VERSION = CommonVars("wds.linkis.python.engine.version", "python3")\n')),(0,t.kt)("h3",{id:"73-cdh632"},"7.3 CDH6.3.2"),(0,t.kt)("table",null,(0,t.kt)("thead",{parentName:"table"},(0,t.kt)("tr",{parentName:"thead"},(0,t.kt)("th",{parentName:"tr",align:null},"\u5f15\u64ce"),(0,t.kt)("th",{parentName:"tr",align:null},"\u7248\u672c"))),(0,t.kt)("tbody",{parentName:"table"},(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,t.kt)("td",{parentName:"tr",align:null},"3.0.0-cdh6.3.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"hive"),(0,t.kt)("td",{parentName:"tr",align:null},"2.1.1-cdh6.3.2")),(0,t.kt)("tr",{parentName:"tbody"},(0,t.kt)("td",{parentName:"tr",align:null},"spark"),(0,t.kt)("td",{parentName:"tr",align:null},"3.0.0")))),(0,t.kt)("h4",{id:"731-linkis\u7684pom\u6587\u4ef6"},"7.3.1 linkis\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<hadoop.version>3.0.0-cdh6.3.2</hadoop.version> \n<scala.version>2.12.10</scala.version>\n")),(0,t.kt)("h4",{id:"732-linkis-hadoop-common"},"7.3.2 linkis-hadoop-common"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"   \x3c!-- \u5c06hadoop-hdfs \u5207\u6362 hadoop-hdfs-client --\x3e \n   <dependency>\n      <groupId>org.apache.hadoop</groupId>\n      <artifactId>hadoop-hdfs-client</artifactId>\n    </dependency>\n")),(0,t.kt)("h4",{id:"733-linkis-engineplugin-hive\u7684pom\u6587\u4ef6"},"7.3.3 linkis-engineplugin-hive\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"-- \u4fee\u6539\n<hive.version>2.1.1-cdh6.3.2</hive.version>\n-- \u6dfb\u52a0\n<package.hive.version>2.1.1_cdh6.3.2</package.hive.version>\n")),(0,t.kt)("p",null,"\u4fee\u6539 assembly \u4e0b\u7684 distribution.xml \u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<outputDirectory>/dist/v${package.hive.version}/lib</outputDirectory>\n<outputDirectory>dist/v${package.hive.version}/conf</outputDirectory>\n<outputDirectory>plugin/${package.hive.version}</outputDirectory>\n")),(0,t.kt)("h4",{id:"734-linkis-engineplugin-spark\u7684pom\u6587\u4ef6"},"7.3.4 linkis-engineplugin-spark\u7684pom\u6587\u4ef6"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-xml"},"<spark.version>3.0.0</spark.version>\n")),(0,t.kt)("h4",{id:"735-linkis-label-common\u8c03\u6574"},"7.3.5 linkis-label-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.manager.label.conf.LabelCommonConfig \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'   public static final CommonVars<String> SPARK_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.spark.engine.version", "3.0.0");\n\n    public static final CommonVars<String> HIVE_ENGINE_VERSION =\n            CommonVars.apply("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2");\n')),(0,t.kt)("h4",{id:"736-linkis-computation-governance-common\u8c03\u6574"},"7.3.6 linkis-computation-governance-common\u8c03\u6574"),(0,t.kt)("p",null,"org.apache.linkis.governance.common.conf.GovernanceCommonConf \u6587\u4ef6\u8c03\u6574"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-java"},'  val SPARK_ENGINE_VERSION = CommonVars("wds.linkis.spark.engine.version", "3.0.0")\n\n  val HIVE_ENGINE_VERSION = CommonVars("wds.linkis.hive.engine.version", "2.1.1_cdh6.3.2")\n')),(0,t.kt)("h2",{id:"8-\u7f16\u8bd1\u6280\u5de7"},"8 \u7f16\u8bd1\u6280\u5de7"),(0,t.kt)("ul",null,(0,t.kt)("li",{parentName:"ul"},"\u5982\u679c\u9047\u5230\u7c7b\u7f3a\u5c11\u6216\u8005\u7c7b\u4e2d\u65b9\u6cd5\u7f3a\u5c11\u7684\u60c5\u51b5\u4e0b,\u627e\u5230\u5bf9\u5e94\u5f15\u7528\u8fd9\u4e2a\u5305\u4f9d\u8d56,\u5982\u4f55\u5c1d\u8bd5\u5207\u6362\u5230\u6709\u5bf9\u5e94\u5305\u6216\u8005\u7c7b\u7684\u7248\u672c\u4e2d\u6765"),(0,t.kt)("li",{parentName:"ul"},"\u5f15\u64ce\u7248\u672c\u5982\u679c\u9700\u8981\u4f7f\u7528\u5230-\u7684\u8bdd,\u4f7f\u7528_\u6765\u8fdb\u884c\u66ff\u6362,\u5e76\u4e14\u52a0\u4e0a<package.\u5f15\u64ce\u540d\u5b57.version>\u6765\u6307\u5b9a\u66ff\u6362\u540e\u7684\u7248\u672c,\u540c\u65f6\u5728\u5bf9\u5e94\u7684\u5f15\u64cedistribution\u6587\u4ef6\u4e2d\u4f7f\u7528${package.\u5f15\u64ce\u540d\u5b57.version}\u6765\u66ff\u6362\u539f\u6709\u7684"),(0,t.kt)("li",{parentName:"ul"},"\u5982\u679c\u6709\u65f6\u5019\u4f7f\u7528\u963f\u91cc\u4e91\u955c\u50cf\u51fa\u73b0\u4e0b\u8f7dguava\u7684jar\u51fa\u73b0403\u7684\u95ee\u9898\u7684\u8bdd,\u53ef\u4ee5\u5207\u6362\u5230\u534e\u4e3a,\u817e\u8baf\u7b49\u955c\u50cf\u4ed3\u5e93")))}d.isMDXComponent=!0}}]);