"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[35312],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var i=t(67294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=i.createContext({}),c=function(e){var n=i.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=c(e.components);return i.createElement(l.Provider,{value:n},e.children)},m={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},u=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(t),d=r,f=u["".concat(l,".").concat(d)]||u[d]||m[d]||o;return t?i.createElement(f,a(a({ref:n},p),{},{components:t})):i.createElement(f,a({ref:n},p))}));function d(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,a=new Array(o);a[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var c=2;c<o;c++)a[c]=t[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,t)}u.displayName="MDXCreateElement"},11921:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var i=t(87462),r=(t(67294),t(3905));const o={title:"Release-Notes Writing Specification",sidebar_position:9},a=void 0,s={unversionedId:"development/development-specification/release-notes",id:"development/development-specification/release-notes",isDocsHomePage:!1,title:"Release-Notes Writing Specification",description:"Before each version is released, the release-notes for this version need to be organized by the release manager or developer to briefly describe the specific changes included in the new version update.",source:"@site/docs/development/development-specification/release-notes.md",sourceDirName:"development/development-specification",slug:"/development/development-specification/release-notes",permalink:"/docs/1.3.1/development/development-specification/release-notes",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/docs/development/development-specification/release-notes.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{title:"Release-Notes Writing Specification",sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"Version and New Feature Specification",permalink:"/docs/1.3.1/development/development-specification/version-feature-specifications"},next:{title:"How to Write Unit Test Code",permalink:"/docs/1.3.1/development/development-specification/how-to-write-unit-test-code"}},l=[{value:"Common notes tags",id:"common-notes-tags",children:[]}],c={toc:l};function p(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,i.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Before each version is released, the release-notes for this version need to be organized by the release manager or developer to briefly describe the specific changes included in the new version update."),(0,r.kt)("p",null,"In order to maintain uniformity and facilitate writing, the following specifications are formulated:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A summary of the version is required, a few sentences summarizing the core main changes of this version"),(0,r.kt)("li",{parentName:"ul"},"According to the changed function points, it is classified into four categories: new features/enhancement points/fixed functions/others"),(0,r.kt)("li",{parentName:"ul"},"Include a thank you column: students who have contributed to this version, in addition to issue/pr, and any students who have participated in this version discussion/community Q&A/comment suggestion"),(0,r.kt)("li",{parentName:"ul"},"Specification of each note: ",(0,r.kt)("inlineCode",{parentName:"li"},"[Service name abbreviation-L1 maven module name][Linkis-pr/issues serial number] This change briefly describes the information, you can generally know the change of this function through the description information.")," ",(0,r.kt)("inlineCode",{parentName:"li"},"[Service name abbreviation -L1 maven module name]")," as a label, the example is as follows"),(0,r.kt)("li",{parentName:"ul"},"Under the same category (new features/enhancement points/fixed functions/others), the service names with the same name are put together and sorted in ascending order of pr/issues serial number"),(0,r.kt)("li",{parentName:"ul"},"Corresponding English documents are required")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"Service name abbreviation: The change of this pr, at the code level, the corresponding service name abbreviation of the main service\nFor example, a pr made bug fixes to the JDBC engine, which is a JDBC module under the linkis-cg-engineconn service\nEG:[EC-Jdbc][[Linkis-1851]](https://github.com/apache/incubator-linkis/issues/1851) Fix the jdbc engine, when there are multiple sql statements in one task execution, it cannot be executed normally The problem\nIf the L1-module does not exist, or it is the adjustment of the entire service level, the lower-level module may not be written, such as Entrance\n")),(0,r.kt)("h2",{id:"common-notes-tags"},"Common notes tags"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-html"},"linkis-mg-eureka Eureka\nlinkis-mg-gateway Gateway\nlinkis-cg-linkismanager LM\nlinkis-cg-engineconnplugin ECP\nlinkis-cg-engineconnmanager ECM\nlinkis-cg-engineconn EC\nlinkis-cg-entrance Entrance\nlinkis-ps-publicservice PS\nlinkis-ps-cs CS\nlinkis-ps-metadatamanager MDM\nlinkis-ps-data-source-query DSQ\n\nWeb console Web\nInstall Install\nInstall-Scripts Install-Scripts\nInstall-SQL Install-Sql\nInstall-Web Install-Web\nCommon module Common\n")))}p.isMDXComponent=!0}}]);