"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[50828],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=u(n),p=r,g=m["".concat(s,".").concat(p)]||m[p]||d[p]||i;return n?a.createElement(g,l(l({ref:t},c),{},{components:n})):a.createElement(g,l({ref:t},c))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[m]="string"==typeof e?e:r,l[1]=o;for(var u=2;u<i;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},53476:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>u});var a=n(87462),r=(n(67294),n(3905));const i={title:"Glossary",sidebar_position:4},l=void 0,o={unversionedId:"about/glossary",id:"about/glossary",title:"Glossary",description:"1. Glossary",source:"@site/docs/about/glossary.md",sourceDirName:"about",slug:"/about/glossary",permalink:"/docs/1.6.0/about/glossary",draft:!1,editUrl:"https://github.com/apache/linkis-website/edit/dev/docs/about/glossary.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"Glossary",sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Recommended Configuration",permalink:"/docs/1.6.0/about/configuration"},next:{title:"Sandbox",permalink:"/docs/1.6.0/quick/live-demo"}},s={},u=[{value:"1. Glossary",id:"1-glossary",level:2},{value:"1.1 Key module nouns",id:"11-key-module-nouns",level:3},{value:"1.2 Mission key nouns",id:"12-mission-key-nouns",level:3},{value:"2. Service Introduction",id:"2-service-introduction",level:2},{value:"2.1 Service List",id:"21-service-list",level:2},{value:"2.1 Detailed explanation of public enhanced services",id:"21-detailed-explanation-of-public-enhanced-services",level:2},{value:"3 Module Introduction",id:"3-module-introduction",level:3}],c={toc:u},m="wrapper";function d(e){let{components:t,...i}=e;return(0,r.kt)(m,(0,a.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"1-glossary"},"1. Glossary"),(0,r.kt)("p",null,"Linkis is developed based on the microservice architecture, and its services can be divided into 3 types of service groups (groups): computing governance service group, public enhancement service group and microservice governance service group."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Computation Governance Services: The core service for processing tasks, supporting the 4 main stages of the computing task/request processing flow (submit->prepare->execute->result);"),(0,r.kt)("li",{parentName:"ul"},"Public Enhancement Services: Provide basic support services, including context services, engine/udf material management services, job history and other public services and data source management services;"),(0,r.kt)("li",{parentName:"ul"},"Microservice Governance Services: Customized Spring Cloud Gateway, Eureka. Provides a base for microservices")),(0,r.kt)("p",null,"The following will introduce the key Glossary and services of these three groups of services:"),(0,r.kt)("h3",{id:"11-key-module-nouns"},"1.1 Key module nouns"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Abbreviation"),(0,r.kt)("th",{parentName:"tr",align:null},"Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Main Functions"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MG/mg"),(0,r.kt)("td",{parentName:"tr",align:null},"Microservice Governance"),(0,r.kt)("td",{parentName:"tr",align:null},"Microservice Governance")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CG/cg"),(0,r.kt)("td",{parentName:"tr",align:null},"Computation Governance"),(0,r.kt)("td",{parentName:"tr",align:null},"Computation Governance")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"EC/ec"),(0,r.kt)("td",{parentName:"tr",align:null},"EngineConn"),(0,r.kt)("td",{parentName:"tr",align:null},"Engine Connector")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"Engine"),(0,r.kt)("td",{parentName:"tr",align:null},"The underlying computing storage engine, such as spark, hive, shell")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ECM/ecm"),(0,r.kt)("td",{parentName:"tr",align:null},"EngineConnManager"),(0,r.kt)("td",{parentName:"tr",align:null},"Management of Engine Connectors")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"ECP/ecp"),(0,r.kt)("td",{parentName:"tr",align:null},"EngineConnPlugin"),(0,r.kt)("td",{parentName:"tr",align:null},"Engine Connector Plugin")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"RM/rm"),(0,r.kt)("td",{parentName:"tr",align:null},"ResourceManager"),(0,r.kt)("td",{parentName:"tr",align:null},"Resource manager for managing task resource and user resource usage and control")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"AM/am"),(0,r.kt)("td",{parentName:"tr",align:null},"AppManager"),(0,r.kt)("td",{parentName:"tr",align:null},"Application Manager to manage EngineConn and ECM services")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"LM/lm"),(0,r.kt)("td",{parentName:"tr",align:null},"LinkisManager"),(0,r.kt)("td",{parentName:"tr",align:null},"Linkis manager service, including: RM, AM, LabelManager and other modules")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"PES/pes"),(0,r.kt)("td",{parentName:"tr",align:null},"Public Enhancement Services"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"Orchestrator"),(0,r.kt)("td",{parentName:"tr",align:null},"Orchestrator, used for Linkis task orchestration, task multi-active, mixed calculation, AB and other policy support")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"UJES"),(0,r.kt)("td",{parentName:"tr",align:null},"Unified Job Execute Service"),(0,r.kt)("td",{parentName:"tr",align:null},"Unified Job Execute Service")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DDL/ddl"),(0,r.kt)("td",{parentName:"tr",align:null},"Data Definition Language"),(0,r.kt)("td",{parentName:"tr",align:null},"Database Definition Language")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DML/dml"),(0,r.kt)("td",{parentName:"tr",align:null},"Data Manipulation Language"),(0,r.kt)("td",{parentName:"tr",align:null},"Data Manipulation Language")))),(0,r.kt)("h3",{id:"12-mission-key-nouns"},"1.2 Mission key nouns"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"JobRequest: job request, corresponding to the job submitted by the Client to Linkis, including the execution content, user, label and other information of the job"),(0,r.kt)("li",{parentName:"ul"},"RuntimeMap: task runtime parameters, task level take effect, such as data source information for placing multiple data sources"),(0,r.kt)("li",{parentName:"ul"},"StartupMap: Engine connector startup parameters, used to start the EngineConn connected machine, the EngineConn process takes effect, such as setting spark.executor.memory=4G"),(0,r.kt)("li",{parentName:"ul"},"UserCreator: Task creator information: contains user information User and Client submitted application information Creator, used for tenant isolation of tasks and resources"),(0,r.kt)("li",{parentName:"ul"},"submitUser: task submit user"),(0,r.kt)("li",{parentName:"ul"},"executeUser: the real execution user of the task"),(0,r.kt)("li",{parentName:"ul"},"JobSource: Job source information, record the IP or script address of the job"),(0,r.kt)("li",{parentName:"ul"},"errorCode: error code, task error code information"),(0,r.kt)("li",{parentName:"ul"},"JobHistory: task history persistence module, providing historical information query of tasks"),(0,r.kt)("li",{parentName:"ul"},"ResultSet: The result set, the result set corresponding to the task, is saved with the .dolphin file suffix by default"),(0,r.kt)("li",{parentName:"ul"},"JobInfo: Job runtime information, such as logs, progress, resource information, etc."),(0,r.kt)("li",{parentName:"ul"},"Resource: resource information, each task consumes resources"),(0,r.kt)("li",{parentName:"ul"},"RequestTask: The smallest execution unit of EngineConn, the task unit transmitted to EngineConn for execution")),(0,r.kt)("h2",{id:"2-service-introduction"},"2. Service Introduction"),(0,r.kt)("p",null,"This section mainly introduces the services of Linkis, what services will be available after Linkis is started, and the functions of the services."),(0,r.kt)("h2",{id:"21-service-list"},"2.1 Service List"),(0,r.kt)("p",null,"After Linkis is started, the microservices included in each service group (group) are as follows:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Belonging to the microservice group (group)"),(0,r.kt)("th",{parentName:"tr",align:null},"Service name"),(0,r.kt)("th",{parentName:"tr",align:null},"Main functions"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MGS"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-mg-eureka"),(0,r.kt)("td",{parentName:"tr",align:null},"Responsible for service registration and discovery, other upstream components will also reuse the linkis registry, such as dss")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MGS"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-mg-gateway"),(0,r.kt)("td",{parentName:"tr",align:null},"As the gateway entrance of Linkis, it is mainly responsible for request forwarding and user access authentication")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CGS"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-cg-entrance"),(0,r.kt)("td",{parentName:"tr",align:null},"The task submission entry is a service responsible for receiving, scheduling, forwarding execution requests, and life cycle management of computing tasks, and can return calculation results, logs, and progress to the caller")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CGS"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-cg-linkismanager"),(0,r.kt)("td",{parentName:"tr",align:null},"Provides AppManager (application management), ResourceManager (resource management), LabelManager (label management), Engine connector plug-in manager capabilities")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CGS"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-cg-engineconnmanager"),(0,r.kt)("td",{parentName:"tr",align:null},"Manager for EngineConn, providing lifecycle management of engines")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CGS"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-cg-engineconn"),(0,r.kt)("td",{parentName:"tr",align:null},"The engine connector service is the actual connection service with the underlying computing storage engine (Hive/Spark), including session information with the actual engine. For the underlying computing storage engine, it acts as a client and is triggered and started by tasks")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"PES"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-ps-publicservice"),(0,r.kt)("td",{parentName:"tr",align:null},"Public Enhanced Service Group Module Service, which provides functions such as unified configuration management, context service, BML material library, data source management, microservice management, and historical task query for other microservice modules")))),(0,r.kt)("p",null,"All services seen by open source after startup are as follows:\n",(0,r.kt)("img",{alt:"Linkis_Eureka",src:n(11009).Z,width:"1878",height:"727"})),(0,r.kt)("h2",{id:"21-detailed-explanation-of-public-enhanced-services"},"2.1 Detailed explanation of public enhanced services"),(0,r.kt)("p",null,"After version 1.3.1, the Public Enhanced Service Group (PES) merges related module services into one service linkis-ps-publicservice by default to provide related functions. Of course, if you want to deploy separately, it is also supported. You only need to package and deploy the services of the corresponding modules.\nThe combined public enhanced service mainly includes the following functions:"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Abbreviation"),(0,r.kt)("th",{parentName:"tr",align:null},"Service Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Main Functions"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"CS/cs"),(0,r.kt)("td",{parentName:"tr",align:null},"Context Service"),(0,r.kt)("td",{parentName:"tr",align:null},"Context Service, used to transfer result sets, variables, files, etc. between tasks")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"UDF/udf"),(0,r.kt)("td",{parentName:"tr",align:null},"UDF"),(0,r.kt)("td",{parentName:"tr",align:null},"UDF management module, provides management functions for UDF and functions, supports sharing and version control")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"variable"),(0,r.kt)("td",{parentName:"tr",align:null},"Variable"),(0,r.kt)("td",{parentName:"tr",align:null},"Global custom module, providing management functions for global custom variables")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"script"),(0,r.kt)("td",{parentName:"tr",align:null},"Script-dev"),(0,r.kt)("td",{parentName:"tr",align:null},"Script file operation service, providing script editing and saving, script directory management functions")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"jobHistory"),(0,r.kt)("td",{parentName:"tr",align:null},"JobHistory"),(0,r.kt)("td",{parentName:"tr",align:null},"Task history persistence module, providing historical information query of tasks")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"BML/bml"),(0,r.kt)("td",{parentName:"tr",align:null},"BigData Material library"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"Configuration"),(0,r.kt)("td",{parentName:"tr",align:null},"Configuration management, providing management and viewing of configuration parameters")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"instance-label"),(0,r.kt)("td",{parentName:"tr",align:null},"Microservice management service, providing mapping management functions for microservices and routing labels")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"error-code"),(0,r.kt)("td",{parentName:"tr",align:null},"Error code management, providing the function of managing through error codes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"DMS/dms"),(0,r.kt)("td",{parentName:"tr",align:null},"Data Source Manager Service"),(0,r.kt)("td",{parentName:"tr",align:null},"Data Source Management Service")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"MDS/mds"),(0,r.kt)("td",{parentName:"tr",align:null},"MetaData Manager Service"),(0,r.kt)("td",{parentName:"tr",align:null},"Metadata Management Service")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"linkis-metadata"),(0,r.kt)("td",{parentName:"tr",align:null},"Provides Hive metadata information viewing function, which will be merged into MDS later")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"-"),(0,r.kt)("td",{parentName:"tr",align:null},"basedata-manager"),(0,r.kt)("td",{parentName:"tr",align:null},"Basic data management, used to manage Linkis' own basic metadata information")))),(0,r.kt)("h3",{id:"3-module-introduction"},"3 Module Introduction"),(0,r.kt)("p",null,"This section mainly introduces the major modules and functions of Linkis."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"linkis-commons: The public modules of linkis, including public tool modules, RPC modules, microservice foundation and other modules"),(0,r.kt)("li",{parentName:"ul"},"linkis-computation-governance: Computing governance module, including modules for computing governance multiple services: Entrance, LinkisManager, EngineConnManager, EngineConn, etc."),(0,r.kt)("li",{parentName:"ul"},"linkis-engineconn-plugins: Engine connector plugin module, contains all engine connector plugin implementations"),(0,r.kt)("li",{parentName:"ul"},"linkis-extensions: The extension enhancement module of Linkis, not a necessary function module, now mainly includes the IO module for file proxy operation"),(0,r.kt)("li",{parentName:"ul"},"linkis-orchestrator: Orchestration module for Linkis task orchestration, advanced strategy support such as task multi-active, mixed calculation, AB, etc."),(0,r.kt)("li",{parentName:"ul"},"linkis-public-enhancements: public enhancement module, which contains all public services for invoking linkis internal and upper-layer application components"),(0,r.kt)("li",{parentName:"ul"},"linkis-spring-cloud-services: Spring cloud related service modules, including gateway, registry, etc."),(0,r.kt)("li",{parentName:"ul"},"linkis-web: front-end module")))}d.isMDXComponent=!0},11009:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/Linkis_combined_eureka-df062f77476458ba147b315953ebd60e.png"}}]);