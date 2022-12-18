"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[1068],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>g});var i=t(67294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,l=function(e,n){if(null==e)return{};var t,i,l={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var s=i.createContext({}),p=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},c=function(e){var n=p(e.components);return i.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,l=e.mdxType,a=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(t),g=l,m=u["".concat(s,".").concat(g)]||u[g]||d[g]||a;return t?i.createElement(m,r(r({ref:n},c),{},{components:t})):i.createElement(m,r({ref:n},c))}));function g(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var a=t.length,r=new Array(a);r[0]=u;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:l,r[1]=o;for(var p=2;p<a;p++)r[p]=t[p];return i.createElement.apply(null,r)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},69039:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>r,default:()=>c,frontMatter:()=>a,metadata:()=>o,toc:()=>s});var i=t(87462),l=(t(67294),t(3905));const a={title:"Pipeline Engine",sidebar_position:10},r=void 0,o={unversionedId:"engine-usage/pipeline",id:"version-1.3.0/engine-usage/pipeline",isDocsHomePage:!1,title:"Pipeline Engine",description:"This article mainly introduces the configuration, deployment and use of pipeline (>=1.1.0 version support) engine.",source:"@site/versioned_docs/version-1.3.0/engine-usage/pipeline.md",sourceDirName:"engine-usage",slug:"/engine-usage/pipeline",permalink:"/docs/latest/engine-usage/pipeline",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/versioned_docs/version-1.3.0/engine-usage/pipeline.md",tags:[],version:"1.3.0",sidebarPosition:10,frontMatter:{title:"Pipeline Engine",sidebar_position:10},sidebar:"version-1.3.0/tutorialSidebar",previous:{title:"Sqoop Engine",permalink:"/docs/latest/engine-usage/sqoop"},next:{title:"ElasticSearch Engine",permalink:"/docs/latest/engine-usage/elasticsearch"}},s=[{value:"1. Configuration and deployment",id:"1-configuration-and-deployment",children:[{value:"1.1 Version selection and compilation",id:"11-version-selection-and-compilation",children:[]},{value:"1.2 Material deployment and loading",id:"12-material-deployment-and-loading",children:[]},{value:"1.3 Engine label",id:"13-engine-label",children:[]}]},{value:"2. Use of engine",id:"2-use-of-engine",children:[{value:"2.1 Task submission via linkis cli",id:"21-task-submission-via-linkis-cli",children:[]},{value:"2.2 New script",id:"22-new-script",children:[]},{value:"2.3 Script",id:"23-script",children:[]},{value:"2.4 result",id:"24-result",children:[]}]}],p={toc:s};function c(e){let{components:n,...a}=e;return(0,l.kt)("wrapper",(0,i.Z)({},p,a,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"This article mainly introduces the configuration, deployment and use of pipeline (>=1.1.0 version support) engine."),(0,l.kt)("h2",{id:"1-configuration-and-deployment"},"1. Configuration and deployment"),(0,l.kt)("h3",{id:"11-version-selection-and-compilation"},"1.1 Version selection and compilation"),(0,l.kt)("p",null,"Note: before compiling the ",(0,l.kt)("inlineCode",{parentName:"p"},"pipeline"),"engine, you need to compile the linkis project in full\nCurrently, the ",(0,l.kt)("inlineCode",{parentName:"p"},"pipeline")," engine needs to be installed and deployed by itself"),(0,l.kt)("p",null,"This engine plug-in is not included in the published installation and deployment package by default,\nYou can follow this guide to deploy the installation ",(0,l.kt)("a",{parentName:"p",href:"https://linkis.apache.org/blog/2022/04/15/how-to-download-engineconn-plugin"},"https://linkis.apache.org/blog/2022/04/15/how-to-download-engineconn-plugin"),"\nOr manually compile the deployment according to the following process"),(0,l.kt)("p",null,"Compile separately",(0,l.kt)("inlineCode",{parentName:"p"},"pipeline")," "),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"${linkis_code_dir}/linkis-enginepconn-pugins/engineconn-plugins/pipeline/\nmvn clean install\n")),(0,l.kt)("h3",{id:"12-material-deployment-and-loading"},"1.2 Material deployment and loading"),(0,l.kt)("p",null,"The engine package compiled in step 1.1 is located in"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"${linkis_code_dir}/linkis-engineconn-pluginspipeline/target/out/pipeline\n")),(0,l.kt)("p",null,"Upload to the engine directory of the server"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"${LINKIS_HOME}/lib/linkis-engineplugins\n")),(0,l.kt)("p",null,"And restart the ",(0,l.kt)("inlineCode",{parentName:"p"},"linkis engineplugin")," to refresh the engine"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"cd ${LINKIS_HOME}/sbin\nsh linkis-daemon.sh restart cg-engineplugin\n")),(0,l.kt)("p",null,"Or refresh through the engine interface. After the engine is placed in the corresponding directory, send a refresh request to the ",(0,l.kt)("inlineCode",{parentName:"p"},"linkis CG engineconplugin service")," through the HTTP interface."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Interface",(0,l.kt)("inlineCode",{parentName:"p"},"http://${engineconn-plugin-server-IP}:${port}/api/rest_j/v1/rpc/receiveAndReply"))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},"Request mode ",(0,l.kt)("inlineCode",{parentName:"p"},"POST")))),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "method": "/enginePlugin/engineConn/refreshAll"\n}\n')),(0,l.kt)("p",null,"Check whether the engine is refreshed successfully: if you encounter problems during the refresh process and need to confirm whether the refresh is successful, you can view the",(0,l.kt)("inlineCode",{parentName:"p"},"linkis_engine_conn_plugin_bml_resources"),"Of this table",(0,l.kt)("inlineCode",{parentName:"p"},"last_update_time"),"Whether it is the time when the refresh is triggered."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"#Log in to the database of linkis\nselect *  from linkis_cg_engine_conn_plugin_bml_resources\n")),(0,l.kt)("h3",{id:"13-engine-label"},"1.3 Engine label"),(0,l.kt)("p",null,"Linkis1.XIt is carried out through labels, so it is necessary to insert data into our database. The insertion method is shown below."),(0,l.kt)("p",null,(0,l.kt)("a",{parentName:"p",href:"../deployment/install-engineconn"},"EngineConnPlugin Engine plug-in installation")," "),(0,l.kt)("h2",{id:"2-use-of-engine"},"2. Use of engine"),(0,l.kt)("h3",{id:"21-task-submission-via-linkis-cli"},"2.1 Task submission via linkis cli"),(0,l.kt)("p",null,"Link 1.0 provides cli to submit tasks. We only need to specify the corresponding enginecon and codetype tag types. The use of pipeline is as follows:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Note that the enginetype pipeline-1 engine version setting is prefixed. If the pipeline version is V1 , it is set to pipeline-1 ")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-shell"},'sh bin/linkis-cli -submitUser  hadoop  -engineType pipeline-1  -codeType pipeline  -code "from hdfs:///000/000/000/A.dolphin  to file:///000/000/000/B.csv"\n')),(0,l.kt)("p",null,"from hdfs:///000/000/000/A.dolphin  to file:///000/000/000/B.csv 3.3 Explained"),(0,l.kt)("p",null,"For specific use, please refer to\uff1a ",(0,l.kt)("a",{parentName:"p",href:"/docs/latest/user-guide/linkiscli-manual"},"Linkis CLI Manual"),"."),(0,l.kt)("p",null,"because",(0,l.kt)("inlineCode",{parentName:"p"},"pipeline"),"The engine is mainly used to import and export files. Now let's assume that importing files from a to B is the most introduced case"),(0,l.kt)("h3",{id:"22-new-script"},"2.2 New script"),(0,l.kt)("p",null,"Right click the workspace module and select Create a new workspace of type",(0,l.kt)("inlineCode",{parentName:"p"},"storage"),"Script for"),(0,l.kt)("p",null,(0,l.kt)("img",{src:t(20903).Z})),(0,l.kt)("h3",{id:"23-script"},"2.3 Script"),(0,l.kt)("h5",{id:"syntax-isfrom-path-to-path"},"Syntax is\uff1afrom path to path"),(0,l.kt)("p",null,"The syntax is file copy rule:",(0,l.kt)("inlineCode",{parentName:"p"},"dolphin"),"Suffix type files are result set files that can be converted to",(0,l.kt)("inlineCode",{parentName:"p"},".csv"),"Type and",(0,l.kt)("inlineCode",{parentName:"p"},".xlsx"),"Type file, other types can only be copied from address a to address B, referred to as handling"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"#dolphin type\nfrom hdfs:///000/000/000/A.dolphin to file:///000/000/000/B.csv\nfrom hdfs:///000/000/000/A.dolphin to file:///000/000/000/B.xlsx\n\n#Other types\nfrom hdfs:///000/000/000/A.txt to file:///000/000/000/B.txt\n")),(0,l.kt)("p",null,"A file importing script to B folder"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"from hdfs:///000/000/000/A.csv to file:///000/000/B/\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"from")," grammar\uff0c",(0,l.kt)("inlineCode",{parentName:"li"},"to"),"\uff1agrammar"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"hdfs:///000/000/000/A.csv"),"\uff1aInput file path"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"file:///000/000/B/"),"\uff1a Output path")),(0,l.kt)("p",null,"file B is exported as file A"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"from hdfs:///000/000/000/B.csv to file:///000/000/000/A.CSV\n")),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"hdfs:///000/000/000/B.csv"),"\uff1a Input file path"),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"file:///000/000/000/A.CSV"),"\uff1a Output file path")),(0,l.kt)("p",null,(0,l.kt)("img",{src:t(32792).Z})),(0,l.kt)("p",null,"Note: no semicolon is allowed at the end of the syntax; Otherwise, the syntax is incorrect."),(0,l.kt)("h3",{id:"24-result"},"2.4 result"),(0,l.kt)("p",null,"speed of progress"),(0,l.kt)("p",null,(0,l.kt)("img",{src:t(77242).Z})),(0,l.kt)("p",null,"historical information\n",(0,l.kt)("img",{src:t(31937).Z})))}c.isMDXComponent=!0},31937:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/historical_information-d99bbfb4230732cea0dbb96a34ac990a.png"},77242:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/job_state-fb7240b087736c48def704b2a683b873.png"},20903:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/new_pipeline_script-3a37e4c0883855702a289b87ded7cd90.png"},32792:(e,n,t)=>{t.d(n,{Z:()=>i});const i=t.p+"assets/images/to_write-6b49f070a804d94e1882f6d11c41508c.png"}}]);