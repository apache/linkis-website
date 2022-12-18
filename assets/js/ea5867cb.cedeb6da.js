"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[79211],{3905:(e,r,t)=>{t.d(r,{Zo:()=>l,kt:()=>h});var i=t(67294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);r&&(i=i.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,i)}return t}function c(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function o(e,r){if(null==e)return{};var t,i,n=function(e,r){if(null==e)return{};var t,i,n={},a=Object.keys(e);for(i=0;i<a.length;i++)t=a[i],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)t=a[i],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=i.createContext({}),u=function(e){var r=i.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):c(c({},r),e)),t},l=function(e){var r=u(e.components);return i.createElement(s.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return i.createElement(i.Fragment,{},r)}},p=i.forwardRef((function(e,r){var t=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),p=u(t),h=n,v=p["".concat(s,".").concat(h)]||p[h]||d[h]||a;return t?i.createElement(v,c(c({ref:r},l),{},{components:t})):i.createElement(v,c({ref:r},l))}));function h(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var a=t.length,c=new Array(a);c[0]=p;var o={};for(var s in r)hasOwnProperty.call(r,s)&&(o[s]=r[s]);o.originalType=e,o.mdxType="string"==typeof e?e:n,c[1]=o;for(var u=2;u<a;u++)c[u]=t[u];return i.createElement.apply(null,c)}return i.createElement.apply(null,t)}p.displayName="MDXCreateElement"},83998:(e,r,t)=>{t.r(r),t.d(r,{contentTitle:()=>c,default:()=>l,frontMatter:()=>a,metadata:()=>o,toc:()=>s});var i=t(87462),n=(t(67294),t(3905));const a={title:"Overview",sidebar_position:0},c=void 0,o={unversionedId:"architecture/service-architecture/overview",id:"architecture/service-architecture/overview",isDocsHomePage:!1,title:"Overview",description:"Background",source:"@site/docs/architecture/service-architecture/overview.md",sourceDirName:"architecture/service-architecture",slug:"/architecture/service-architecture/overview",permalink:"/docs/1.3.1/architecture/service-architecture/overview",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/docs/architecture/service-architecture/overview.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{title:"Overview",sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Task Flow Description",permalink:"/docs/1.3.1/architecture/task-flow"},next:{title:"Gateway Design",permalink:"/docs/1.3.1/architecture/service-architecture/gateway"}},s=[{value:"<strong>Background</strong>",id:"background",children:[]},{value:"<strong>Architecture diagram</strong>",id:"architecture-diagram",children:[]},{value:"<strong>Architecture Introduction</strong>",id:"architecture-introduction",children:[]}],u={toc:s};function l(e){let{components:r,...a}=e;return(0,n.kt)("wrapper",(0,i.Z)({},u,a,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"background"},(0,n.kt)("strong",{parentName:"h2"},"Background")),(0,n.kt)("p",null,"Microservice governance includes three main microservices: Gateway, Eureka and Open Feign.\nIt is used to solve Linkis's service discovery and registration, unified gateway, request forwarding, inter-service communication, load balancing and other issues.\nAt the same time, Linkis 1.0 will also provide the supporting for Nacos; the entire Linkis is a complete microservice architecture and each business progress requires multiple microservices to complete."),(0,n.kt)("h2",{id:"architecture-diagram"},(0,n.kt)("strong",{parentName:"h2"},"Architecture diagram")),(0,n.kt)("p",null,(0,n.kt)("img",{src:t(48518).Z})),(0,n.kt)("h2",{id:"architecture-introduction"},(0,n.kt)("strong",{parentName:"h2"},"Architecture Introduction")),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Linkis Gateway",(0,n.kt)("br",{parentName:"p"}),"\n","As the gateway entrance of Linkis, Linkis Gateway is mainly responsible for request forwarding, user access authentication and WebSocket communication.\nThe Gateway of Linkis 1.0 also added Label-based routing and forwarding capabilities.\nA WebSocket routing and forwarder is implemented by Spring Cloud Gateway in Linkis, it is used to establish a WebSocket connection with the client.\nAfter the connection is established, it will automatically analyze the client's WebSocket request and determine which backend microservice the request should be forward to through the rules,\nthen the request is forwarded to the corresponding backend microservice instance.",(0,n.kt)("br",{parentName:"p"}),"\n","","\xa0","\xa0","\xa0","\xa0",(0,n.kt)("a",{parentName:"p",href:"/docs/1.3.1/architecture/service-architecture/gateway"},"Linkis Gateway"))),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Linkis Eureka",(0,n.kt)("br",{parentName:"p"}),"\n","Mainly responsible for service registration and discovery. Eureka consists of multiple instances(service instances). These service instances can be divided into two types: Eureka Server and Eureka Client.\nFor ease of understanding, we divide Eureka Client into Service Provider and Service Consumer. Eureka Server provides service registration and discovery.\nThe Service Provider registers its own service with Eureka, so that service consumers can find it.\nThe Service Consumer obtains a listed of registered services from Eureka, so that they can consume services.")),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("p",{parentName:"li"},"Linkis has implemented a set of its own underlying RPC communication schema based on Feign. As the underlying communication solution, Linkis RPC integrates the SDK into the microservices in need.\nA microservice can be both the request caller and the request receiver.\nAs the request caller, the Receiver of the target microservice will be requested through the Sender.\nAs the request receiver, the Receiver will be provided to process the request sent by the Sender in order to complete the synchronous response or asynchronous response.\n"))),(0,n.kt)("p",null,(0,n.kt)("img",{src:t(35665).Z})))}l.isMDXComponent=!0},48518:(e,r,t)=>{t.d(r,{Z:()=>i});const i=t.p+"assets/images/linkis-microservice-gov-01-c677653c7ded2c8b47cd3a4b48f3eee8.png"},35665:(e,r,t)=>{t.d(r,{Z:()=>i});const i=t.p+"assets/images/linkis-microservice-gov-03-6da92a57bfdd5592c24efd65f8d79f58.png"}}]);