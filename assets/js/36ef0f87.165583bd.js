"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[250],{3905:function(e,t,i){i.d(t,{Zo:function(){return p},kt:function(){return f}});var n=i(7294);function s(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function r(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function a(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?r(Object(i),!0).forEach((function(t){s(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):r(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function o(e,t){if(null==e)return{};var i,n,s=function(e,t){if(null==e)return{};var i,n,s={},r=Object.keys(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||(s[i]=e[i]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)i=r[n],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(e,i)&&(s[i]=e[i])}return s}var c=n.createContext({}),u=function(e){var t=n.useContext(c),i=t;return e&&(i="function"==typeof e?e(t):a(a({},t),e)),i},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},l=n.forwardRef((function(e,t){var i=e.components,s=e.mdxType,r=e.originalType,c=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),l=u(i),f=s,m=l["".concat(c,".").concat(f)]||l[f]||d[f]||r;return i?n.createElement(m,a(a({ref:t},p),{},{components:i})):n.createElement(m,a({ref:t},p))}));function f(e,t){var i=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=i.length,a=new Array(r);a[0]=l;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:s,a[1]=o;for(var u=2;u<r;u++)a[u]=i[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,i)}l.displayName="MDXCreateElement"},2210:function(e,t,i){i.r(t),i.d(t,{frontMatter:function(){return o},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return p},default:function(){return l}});var n=i(7462),s=i(3366),r=(i(7294),i(3905)),a=["components"],o={title:"How to Use",sidebar_position:1},c="How to use Linkis?",u={unversionedId:"user_guide/how_to_use",id:"user_guide/how_to_use",isDocsHomePage:!1,title:"How to Use",description:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In order to meet the needs of different usage scenarios, Linkis provides a variety of usage and access methods, which can be summarized into three categories, namely Client-side use, Scriptis-side use, and DataSphere It is used on the Studio side, among which Scriptis and DataSphere Studio are the open source data analysis platforms of the WeBank Big Data Platform Room. Since these two projects are essentially compatible with Linkis, it is easiest to use Linkis through Scriptis and DataSphere Studio.",source:"@site/docs/user_guide/how_to_use.md",sourceDirName:"user_guide",slug:"/user_guide/how_to_use",permalink:"/docs/next/user_guide/how_to_use",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/docs/user_guide/how_to_use.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"How to Use",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Overview",permalink:"/docs/next/user_guide/overview"},next:{title:"User Manual",permalink:"/docs/next/user_guide/user_manual"}},p=[{value:"1. Client side usage",id:"1-client-side-usage",children:[]},{value:"2. Scriptis uses Linkis",id:"2-scriptis-uses-linkis",children:[]},{value:"2.1. Use Scriptis to execute scripts",id:"21-use-scriptis-to-execute-scripts",children:[]},{value:"2.2. Scriptis Management Console",id:"22-scriptis-management-console",children:[]},{value:"3. DataSphere Studio uses Linkis",id:"3-datasphere-studio-uses-linkis",children:[]}],d={toc:p};function l(e){var t=e.components,o=(0,s.Z)(e,a);return(0,r.kt)("wrapper",(0,n.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"how-to-use-linkis"},"How to use Linkis?"),(0,r.kt)("p",null,"\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","In order to meet the needs of different usage scenarios, Linkis provides a variety of usage and access methods, which can be summarized into three categories, namely Client-side use, Scriptis-side use, and DataSphere It is used on the Studio side, among which Scriptis and DataSphere Studio are the open source data analysis platforms of the WeBank Big Data Platform Room. Since these two projects are essentially compatible with Linkis, it is easiest to use Linkis through Scriptis and DataSphere Studio."),(0,r.kt)("h2",{id:"1-client-side-usage"},"1. Client side usage"),(0,r.kt)("p",null,"\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","If you need to connect to other applications on the basis of Linkis, you need to develop the interface provided by Linkis. Linkis provides a variety of client access interfaces. For detailed usage introduction, please refer to the following:\n-",(0,r.kt)("a",{parentName:"p",href:"/docs/next/api/linkis_task_operator"},(0,r.kt)("strong",{parentName:"a"},"Restful API Usage")),"\n-",(0,r.kt)("a",{parentName:"p",href:"/docs/next/api/jdbc_api"},(0,r.kt)("strong",{parentName:"a"},"JDBC API Usage")),"\n-",(0,r.kt)("a",{parentName:"p",href:"/docs/next/user_guide/user_manual"},(0,r.kt)("strong",{parentName:"a"},"How \u200b\u200bto use Java SDK"))),(0,r.kt)("h2",{id:"2-scriptis-uses-linkis"},"2. Scriptis uses Linkis"),(0,r.kt)("p",null,"\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","If you need to use Linkis to complete interactive online analysis and processing, and you do not need data analysis application tools such as workflow development, workflow scheduling, data services, etc., you can Install ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/WeBankFinTech/Scriptis"},(0,r.kt)("strong",{parentName:"a"},"Scriptis"))," separately. For detailed installation tutorial, please refer to its corresponding installation and deployment documents."),(0,r.kt)("h2",{id:"21-use-scriptis-to-execute-scripts"},"2.1. Use Scriptis to execute scripts"),(0,r.kt)("p",null,"\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","Currently Scriptis supports submitting a variety of task types to Linkis, including Spark SQL, Hive SQL, Scala, PythonSpark, etc. In order to meet the needs of data analysis, the left side of Scriptis, Provides viewing user workspace information, user database and table information, user-defined functions, and HDFS directories. It also supports uploading and downloading, result set exporting and other functions. Scriptis is very simple to use Linkis, you can easily write scripts in the edit bar, and submit them to Linkis to run.\n",(0,r.kt)("img",{alt:"Scriptis uses Linkis",src:i(2196).Z})),(0,r.kt)("h2",{id:"22-scriptis-management-console"},"2.2. Scriptis Management Console"),(0,r.kt)("p",null,"\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","Linkis provides an interface for resource configuration and management. If you want to configure and manage task resources, you can set it on the Scriptis management console interface, including queue settings and resource configuration , The number of engine instances, etc. Through the management console, you can easily configure the resources for submitting tasks to Linkis, making it more convenient and faster.\n",(0,r.kt)("img",{alt:"Scriptis uses Linkis",src:i(7117).Z})),(0,r.kt)("h2",{id:"3-datasphere-studio-uses-linkis"},"3. DataSphere Studio uses Linkis"),(0,r.kt)("p",null,"\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0",(0,r.kt)("a",{parentName:"p",href:"https://github.com/WeBankFinTech/DataSphereStudio"},(0,r.kt)("strong",{parentName:"a"},"DataSphere Studio")),", referred to as DSS, is an open source part of WeBank\u2019s big data platform Station-type data analysis and processing platform, the DSS interactive analysis module integrates Scriptis. Using DSS for interactive analysis is the same as Scriptis. In addition to providing the basic functions of Scriptis, DSS provides and integrates richer and more powerful data analysis functions, including Data services for data extraction, workflow for developing reports, visual analysis software Visualis, etc. Due to native support, DSS is currently the most integrated software with Linkis. If you want to use the complete Linkis function, it is recommended to use DSS with Linkis.\n",(0,r.kt)("img",{alt:"DSS Run Workflow",src:i(1884).Z})))}l.isMDXComponent=!0},7117:function(e,t,i){t.Z=i.p+"assets/images/queue-set-e97a179515f871064f97ad6a28747f0c.png"},2196:function(e,t,i){t.Z=i.p+"assets/images/sparksql-run-d748d4fab0548fa92a6e91f42c911466.png"},1884:function(e,t,i){t.Z=i.p+"assets/images/workflow-10d4a1090b39c00c25a2b62f1c25ca60.png"}}]);