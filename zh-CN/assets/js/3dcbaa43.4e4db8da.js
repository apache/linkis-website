"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[62881],{3905:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>v});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),s=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=s(e.components);return r.createElement(l.Provider,{value:n},e.children)},u="mdxType",k={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=s(t),d=a,v=u["".concat(l,".").concat(d)]||u[d]||k[d]||i;return t?r.createElement(v,o(o({ref:n},c),{},{components:t})):r.createElement(v,o({ref:n},c))}));function v(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=d;var p={};for(var l in n)hasOwnProperty.call(n,l)&&(p[l]=n[l]);p.originalType=e,p[u]="string"==typeof e?e:a,o[1]=p;for(var s=2;s<i;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},42292:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>k,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var r=t(87462),a=(t(67294),t(3905));const i={title:"\u57fa\u7840\u5f15\u64ce\u4f9d\u8d56\u6027\u3001\u517c\u5bb9\u6027\u3001\u9ed8\u8ba4\u7248\u672c\u4f18\u5316",sidebar_position:.2},o=void 0,p={unversionedId:"feature/base-engine-compatibilty",id:"version-1.4.0/feature/base-engine-compatibilty",title:"\u57fa\u7840\u5f15\u64ce\u4f9d\u8d56\u6027\u3001\u517c\u5bb9\u6027\u3001\u9ed8\u8ba4\u7248\u672c\u4f18\u5316",description:"1. \u9700\u6c42\u80cc\u666f",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/version-1.4.0/feature/base-engine-compatibilty.md",sourceDirName:"feature",slug:"/feature/base-engine-compatibilty",permalink:"/zh-CN/docs/1.4.0/feature/base-engine-compatibilty",draft:!1,editUrl:"https://github.com/apache/linkis-website/edit/dev/i18n/zh-CN/docusaurus-plugin-content-docs/version-1.4.0/feature/base-engine-compatibilty.md",tags:[],version:"1.4.0",sidebarPosition:.2,frontMatter:{title:"\u57fa\u7840\u5f15\u64ce\u4f9d\u8d56\u6027\u3001\u517c\u5bb9\u6027\u3001\u9ed8\u8ba4\u7248\u672c\u4f18\u5316",sidebar_position:.2},sidebar:"tutorialSidebar",previous:{title:"\u7248\u672c\u603b\u89c8",permalink:"/zh-CN/docs/1.4.0/feature/overview"},next:{title:"hive engine\u652f\u6301\u5e76\u53d1\uff0c\u652f\u6301\u590d\u7528",permalink:"/zh-CN/docs/1.4.0/feature/hive-engine-support-concurrent"}},l={},s=[{value:"1. \u9700\u6c42\u80cc\u666f",id:"1-\u9700\u6c42\u80cc\u666f",level:2},{value:"2. \u4f7f\u7528\u8bf4\u660e",id:"2-\u4f7f\u7528\u8bf4\u660e",level:2},{value:"2.1 \u9ed8\u8ba4\u7248\u672c\u8c03\u6574\u8bf4\u660e",id:"21-\u9ed8\u8ba4\u7248\u672c\u8c03\u6574\u8bf4\u660e",level:2},{value:"2.2 \u4e0d\u540c\u7248\u672c\u9002\u914d",id:"22-\u4e0d\u540c\u7248\u672c\u9002\u914d",level:2},{value:"3. \u6ce8\u610f\u4e8b\u9879",id:"3-\u6ce8\u610f\u4e8b\u9879",level:2}],c={toc:s},u="wrapper";function k(e){let{components:n,...t}=e;return(0,a.kt)(u,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"1-\u9700\u6c42\u80cc\u666f"},"1. \u9700\u6c42\u80cc\u666f"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u4f4e\u7248\u672c linkis \u9700\u8981\u901a\u8fc7\u4fee\u6539\u4ee3\u7801\u6765\u9002\u914d\u4e0d\u540c\u7684 Hive\u3001Spark \u7b49\u7248\u672c\uff0c\u56e0\u4e3a\u517c\u5bb9\u6027\u95ee\u9898\uff0c\u7f16\u8bd1\u53ef\u80fd\u4f1a\u5931\u8d25\uff0c\u53ef\u4ee5\u51cf\u5c11\u8fd9\u4e9b\u57fa\u7840\u5f15\u64ce\u7684\u517c\u5bb9\u6027\u95ee\u9898\u3002"),(0,a.kt)("li",{parentName:"ol"},"Hadoop\u3001Hive\u3001Spark 3.x \u5df2\u7ecf\u5f88\u6210\u719f\uff0c\u5e76\u4e14\u4f4e\u7248\u672c\u7684\u5f15\u64ce\u53ef\u80fd\u6709\u6f5c\u5728\u7684\u98ce\u9669\u70b9\uff0c\u793e\u533a\u5f88\u591a\u7528\u6237\u9ed8\u8ba4\u4f7f\u7528 3.x \u7248\u672c\uff0c\u56e0\u6b64\u8003\u8651\u5c06 Linkis \u9ed8\u8ba4\u7f16\u8bd1\u7684\u7248\u672c\u4fee\u6539\u4e3a 3.x \u3002")),(0,a.kt)("h2",{id:"2-\u4f7f\u7528\u8bf4\u660e"},"2. \u4f7f\u7528\u8bf4\u660e"),(0,a.kt)("h2",{id:"21-\u9ed8\u8ba4\u7248\u672c\u8c03\u6574\u8bf4\u660e"},"2.1 \u9ed8\u8ba4\u7248\u672c\u8c03\u6574\u8bf4\u660e"),(0,a.kt)("p",null,"Linkis 1.4.0 \u5c06 Hadoop\u3001Hive\u3001Spark \u9ed8\u8ba4\u7248\u672c\u4fee\u6539\u4e3a 3.x\uff0c\u5177\u4f53\u7248\u672c\u5206\u522b\u4e3a Hadoop 3.3.4\u3001Hive 3.1.3\u3001Spark 3.2.1 \u3002"),(0,a.kt)("h2",{id:"22-\u4e0d\u540c\u7248\u672c\u9002\u914d"},"2.2 \u4e0d\u540c\u7248\u672c\u9002\u914d"),(0,a.kt)("p",null,"\u4e0d\u540c\u7684hive\u7248\u672c\u7684\u7f16\u8bd1\uff0c\u6211\u4eec\u53ea\u9700\u8981\u6307\u5b9a",(0,a.kt)("inlineCode",{parentName:"p"},"-D=xxx"),"\u5c31\u53ef\u4ee5\u4e86\uff0c\u6bd4\u5982\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"mvn clean install package -Dhive.version=2.3.3\n")),(0,a.kt)("p",null,"\u4e0d\u540c\u7248\u672c\u7684spark\u7f16\u8bd1\uff0c\u6211\u4eec\u4e5f\u53ea\u9700\u8981\u6307\u5b9a",(0,a.kt)("inlineCode",{parentName:"p"},"-D=xxx"),"\u5c31\u53ef\u4ee5\u4e86\uff0c\u5e38\u7528\u7684\u4f7f\u7528\u573a\u666f\u5982\u4e0b\uff1a"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"#spark3+hadoop3\nmvn install package\n\n#spark3+hadoop2\nmvn install package  -Phadoop-2.7\n\n#spark2+hadoop2\nmvn install package -Pspark-2.4 -Phadoop-2.7\n\n#spark2+ hadoop3\nmvn install package -Pspark-2.4\n")),(0,a.kt)("h2",{id:"3-\u6ce8\u610f\u4e8b\u9879"},"3. \u6ce8\u610f\u4e8b\u9879"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u9ed8\u8ba4\u7248\u672c\u7f16\u8bd1\u65f6\uff0c\u57fa\u7840\u7248\u672c\u4e3a\uff1ahadoop3.3.4 + hive3.1.3 + spark3.2.1")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"mvn install package\n")),(0,a.kt)("p",null,"\u7531\u4e8e\u9ed8\u8ba4\u57fa\u7840\u5f15\u64ce\u7684\u9ed8\u8ba4\u7248\u672c\u5347\u7ea7\uff0c",(0,a.kt)("inlineCode",{parentName:"p"},"spark-3.2"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"hadoop-3.3"),"\u548c",(0,a.kt)("inlineCode",{parentName:"p"},"spark-2.4-hadoop-3.3")," profile\u88ab\u79fb\u9664\uff0c\u65b0\u589eprofile ",(0,a.kt)("inlineCode",{parentName:"p"},"hadoop-2.7")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"spark-2.4"),"\u3002"),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"spark\u7684\u5b50\u7248\u672c\u53ef\u4ee5\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"-Dspark.version=xxx")," \u6765\u6307\u5b9a\uff0c\u7cfb\u7edf\u9ed8\u8ba4\u4f7f\u7528\u7684 scala \u7248\u672c\u4e3a 2.12.17\uff0c\u53ef\u9002\u914d spark 3.x \u7248\u672c \u3002\u5982\u9700\u7f16\u8bd1 spark 2.x\uff0c\u9700\u8981\u4f7f\u7528 scala 2.11 \u7248\u672c\u3002\u53ef\u901a\u8fc7 -Pspark-2.4 \u53c2\u6570\uff0c\u6216\u8005 -Dspark.version=2.xx -Dscala.version=2.11.12 -Dscala.binary.version=2.11 \u7f16\u8bd1\u3002")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("p",{parentName:"li"},"hadoop\u7684\u5b50\u7248\u672c\u53ef\u4ee5\u901a\u8fc7",(0,a.kt)("inlineCode",{parentName:"p"},"-Dhadoop.version=xxx")," \u6765\u6307\u5b9a"))),(0,a.kt)("p",null,"\u4e3e\u4e2a\u4f8b\u5b50 :"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"mvn install package -Pspark-3.2 -Phadoop-3.3 -Dspark.version=3.1.3\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"hive 2.x \u7248\u672c\u9700\u8981\u4f9d\u8d56 jersey\uff0chive EC \u9ed8\u8ba4\u7f16\u8bd1\u65f6\u672a\u6dfb\u52a0 jersey\u4f9d\u8d56\uff0c\u53ef\u901a\u8fc7\u5982\u4e0b\u6307\u5f15\u7f16\u8bd1\u3002")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u7f16\u8bd1 hive 2.3.3 \u7248\u672c")),(0,a.kt)("p",null,"\u7f16\u8bd1 hive EC \u65f6\u9ed8\u8ba4\u6dfb\u52a0\u4e86\u6307\u5b9a 2.3.3 \u7248\u672c\u65f6\u6fc0\u6d3b\u6dfb\u52a0 jersey \u4f9d\u8d56\u7684 profile\uff0c\u7528\u6237\u53ef\u901a\u8fc7\u6307\u5b9a -Dhive.version=2.3.3 \u53c2\u6570\u7f16\u8bd1"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"\u7f16\u8bd1\u5176\u5b83 hive 2.x \u7248\u672c")),(0,a.kt)("p",null,"\u4fee\u6539 linkis-engineconn-plugins/hive/pom.xml \u6587\u4ef6\uff0c\u5c06 2.3.3 \u4fee\u6539\u4e3a\u7528\u6237\u7f16\u8bd1\u7248\u672c\uff0c\u5982 2.1.0"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml"},"<profile>\n      <id>hive-jersey-dependencies</id>\n      <activation>\n        <property>\n          <name>hive.version</name>\n          \x3c!-- <value>2.3.3</value> --\x3e\n          <value>2.1.0</value>\n        </property>\n      </activation>\n      ...\n    </profile>\n")),(0,a.kt)("p",null,"\u7f16\u8bd1\u65f6\u6dfb\u52a0 -Dhive.version=2.1.0 \u53c2\u6570\u3002"))}k.isMDXComponent=!0}}]);