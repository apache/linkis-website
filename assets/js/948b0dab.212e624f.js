"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[1405],{3905:function(e,t,r){r.d(t,{Zo:function(){return u},kt:function(){return p}});var n=r(67294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=a(e,["components","mdxType","originalType","parentName"]),m=l(r),p=i,h=m["".concat(s,".").concat(p)]||m[p]||d[p]||o;return r?n.createElement(h,c(c({ref:t},u),{},{components:r})):n.createElement(h,c({ref:t},u))}));function p(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,c=new Array(o);c[0]=m;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:i,c[1]=a;for(var l=2;l<o;l++)c[l]=r[l];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},53143:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return l},toc:function(){return u},default:function(){return m}});var n=r(87462),i=r(63366),o=(r(67294),r(3905)),c=["components"],a={title:"Message Scheduler Module",sidebar_position:1},s=void 0,l={unversionedId:"architecture/commons/message_scheduler",id:"version-1.1.1/architecture/commons/message_scheduler",isDocsHomePage:!1,title:"Message Scheduler Module",description:"1 Overview",source:"@site/versioned_docs/version-1.1.1/architecture/commons/message_scheduler.md",sourceDirName:"architecture/commons",slug:"/architecture/commons/message_scheduler",permalink:"/docs/latest/architecture/commons/message_scheduler",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/versioned_docs/version-1.1.1/architecture/commons/message_scheduler.md",tags:[],version:"1.1.1",sidebarPosition:1,frontMatter:{title:"Message Scheduler Module",sidebar_position:1}},u=[{value:"1 Overview",id:"1-overview",children:[]},{value:"2. Architecture description",id:"2-architecture-description",children:[]},{value:"2.1. Architecture design diagram",id:"21-architecture-design-diagram",children:[]},{value:"2.2. Module description",id:"22-module-description",children:[]}],d={toc:u};function m(e){var t=e.components,a=(0,i.Z)(e,c);return(0,o.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"1-overview"},"1 Overview"),(0,o.kt)("p",null,"\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","\xa0","Linkis-RPC can realize the communication between microservices. In order to simplify the use of RPC, Linkis provides the Message-Scheduler module, which is annotated by @Receiver Analyze, identify and call. At the same time, it also unifies the use of RPC and Restful interfaces, which has better scalability."),(0,o.kt)("h2",{id:"2-architecture-description"},"2. Architecture description"),(0,o.kt)("h2",{id:"21-architecture-design-diagram"},"2.1. Architecture design diagram"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Module Design Drawing",src:r(49590).Z})),(0,o.kt)("h2",{id:"22-module-description"},"2.2. Module description"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"ServiceParser: Parse the (Object) object of the Service module, and encapsulate the @Receiver annotated method into the ServiceMethod object."),(0,o.kt)("li",{parentName:"ul"},"ServiceRegistry: Register the corresponding Service module, and store the ServiceMethod parsed by the Service in the Map container."),(0,o.kt)("li",{parentName:"ul"},"ImplicitParser: parse the object of the Implicit module, and the method annotated with @Implicit will be encapsulated into the ImplicitMethod object."),(0,o.kt)("li",{parentName:"ul"},"ImplicitRegistry: Register the corresponding Implicit module, and store the resolved ImplicitMethod in a Map container."),(0,o.kt)("li",{parentName:"ul"},"Converter: Start to scan the non-interface non-abstract subclass of RequestMethod and store it in the Map, parse the Restful and match the related RequestProtocol."),(0,o.kt)("li",{parentName:"ul"},"Publisher: Realize the publishing scheduling function, find the ServiceMethod matching the RequestProtocol in the Registry, and encapsulate it as a Job for submission scheduling."),(0,o.kt)("li",{parentName:"ul"},"Scheduler: Scheduling implementation, using Linkis-Scheduler to execute the job and return the MessageJob object."),(0,o.kt)("li",{parentName:"ul"},"TxManager: Complete transaction management, perform transaction management on job execution, and judge whether to commit or rollback after the job execution ends.")))}m.isMDXComponent=!0},49590:function(e,t,r){t.Z=r.p+"assets/images/linkis-message-scheduler-f135fb5503becb15e197bf0a2d422bac.png"}}]);