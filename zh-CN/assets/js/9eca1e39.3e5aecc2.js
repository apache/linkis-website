"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[86585],{3905:(e,t,o)=>{o.d(t,{Zo:()=>m,kt:()=>d});var n=o(67294);function i(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){i(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function l(e,t){if(null==e)return{};var o,n,i=function(e,t){if(null==e)return{};var o,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||(i[o]=e[o]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}var s=n.createContext({}),c=function(e){var t=n.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):a(a({},t),e)),o},m=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var o=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),u=c(o),d=i,h=u["".concat(s,".").concat(d)]||u[d]||p[d]||r;return o?n.createElement(h,a(a({ref:t},m),{},{components:o})):n.createElement(h,a({ref:t},m))}));function d(e,t){var o=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=o.length,a=new Array(r);a[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var c=2;c<r;c++)a[c]=o[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,o)}u.displayName="MDXCreateElement"},49036:(e,t,o)=>{o.r(t),o.d(t,{contentTitle:()=>a,default:()=>m,frontMatter:()=>r,metadata:()=>l,toc:()=>s});var n=o(87462),i=(o(67294),o(3905));const r={title:"Commit Message \u987b\u77e5",sidebar_position:2},a=void 0,l={unversionedId:"development/development-specification/commit-message",id:"development/development-specification/commit-message",isDocsHomePage:!1,title:"Commit Message \u987b\u77e5",description:"\u672c\u6587\u5f15\u7528\u81ea https://dolphinscheduler.apache.org/zh-cn/docs/dev/user_doc/contribute/join/commit-message.html",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/development/development-specification/commit-message.md",sourceDirName:"development/development-specification",slug:"/development/development-specification/commit-message",permalink:"/zh-CN/docs/1.3.1/development/development-specification/commit-message",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/i18n/zh-CN/docusaurus-plugin-content-docs/current/development/development-specification/commit-message.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Commit Message \u987b\u77e5",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"\u7f16\u7a0b\u89c4\u7ea6",permalink:"/zh-CN/docs/1.3.1/development/development-specification/programming-specification"},next:{title:"\u65e5\u5fd7\u89c4\u8303",permalink:"/zh-CN/docs/1.3.1/development/development-specification/log"}},s=[{value:"1.\u524d\u8a00",id:"1\u524d\u8a00",children:[]},{value:"2.Commit Message RIP",id:"2commit-message-rip",children:[]},{value:"3.\u53c2\u8003\u6587\u6863",id:"3\u53c2\u8003\u6587\u6863",children:[]}],c={toc:s};function m(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,n.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"\u672c\u6587\u5f15\u7528\u81ea ",(0,i.kt)("a",{parentName:"p",href:"https://dolphinscheduler.apache.org/zh-cn/docs/dev/user_doc/contribute/join/commit-message.html"},"https://dolphinscheduler.apache.org/zh-cn/docs/dev/user_doc/contribute/join/commit-message.html"))),(0,i.kt)("h3",{id:"1\u524d\u8a00"},"1.\u524d\u8a00"),(0,i.kt)("p",null,"  \u4e00\u4e2a\u597d\u7684 commit message \u662f\u80fd\u591f\u5e2e\u52a9\u5176\u4ed6\u7684\u5f00\u53d1\u8005\uff08\u6216\u8005\u672a\u6765\u7684\u5f00\u53d1\u8005\uff09\u5feb\u901f\u7406\u89e3\u76f8\u5173\u53d8\u66f4\u7684\u4e0a\u4e0b\u6587\uff0c\u540c\u65f6\u4e5f\u53ef\u4ee5\u5e2e\u52a9\u9879\u76ee\u7ba1\u7406\u4eba\u5458\u786e\u5b9a\u8be5\u63d0\u4ea4\u662f\u5426\u9002\u5408\u5305\u542b\u5728\u53d1\u884c\u7248\u4e2d\u3002\u4f46\u5f53\u6211\u4eec\u5728\u67e5\u770b\u4e86\u5f88\u591a\u5f00\u6e90\u9879\u76ee\u7684 commit log \u540e\uff0c\u53d1\u73b0\u4e00\u4e2a\u6709\u8da3\u7684\u95ee\u9898\uff0c\u4e00\u90e8\u5206\u5f00\u53d1\u8005\uff0c\u4ee3\u7801\u8d28\u91cf\u5f88\u4e0d\u9519\uff0c\u4f46\u662f commit message \u8bb0\u5f55\u5374\u6bd4\u8f83\u6df7\u4e71\uff0c\u5f53\u5176\u4ed6\u8d21\u732e\u8005\u6216\u8005\u5b66\u4e60\u8005\u5728\u67e5\u770b\u4ee3\u7801\u7684\u65f6\u5019\uff0c\u5e76\u4e0d\u80fd\u901a\u8fc7 commit log \u5f88\u76f4\u89c2\u7684\u4e86\u89e3\n\u8be5\u63d0\u4ea4\u524d\u540e\u53d8\u66f4\u7684\u76ee\u7684\uff0c\u6b63\u5982 Peter Hutterer \u6240\u8a00\uff1aRe-establishing the context of a piece of code is wasteful. We can\u2019t avoid it completely, so our efforts should go to reducing it as much as possible. Commit messages can do exactly that and as a result, a commit message shows whether a developer is a good collaborator. \u56e0\u6b64\uff0cDolphinScheduler \u7ed3\u5408\u5176\u4ed6\u793e\u533a\u4ee5\u53ca Apache \u5b98\u65b9\u6587\u6863\u5236\u5b9a\u4e86\u8be5\u89c4\u7ea6\u3002"),(0,i.kt)("h3",{id:"2commit-message-rip"},"2.Commit Message RIP"),(0,i.kt)("h4",{id:"21-\u660e\u786e\u4fee\u6539\u5185\u5bb9"},"2.1 \u660e\u786e\u4fee\u6539\u5185\u5bb9"),(0,i.kt)("p",null,"commit message \u5e94\u8be5\u660e\u786e\u8bf4\u660e\u8be5\u63d0\u4ea4\u89e3\u51b3\u4e86\u54ea\u4e9b\u95ee\u9898\uff08bug \u4fee\u590d\u3001\u529f\u80fd\u589e\u5f3a\u7b49\uff09\uff0c\u4ee5\u4fbf\u4e8e\u7528\u6237\u5f00\u53d1\u8005\u66f4\u597d\u7684\u8ddf\u8e2a\u95ee\u9898\uff0c\u660e\u786e\u7248\u672c\u8fed\u4ee3\u8fc7\u7a0b\u4e2d\u7684\u4f18\u5316\u60c5\u51b5\u3002"),(0,i.kt)("h4",{id:"22-\u5173\u8054\u76f8\u5e94\u7684pull-request-\u6216\u8005issue"},"2.2 \u5173\u8054\u76f8\u5e94\u7684Pull Request \u6216\u8005Issue"),(0,i.kt)("p",null,"\u5f53\u6211\u4eec\u7684\u6539\u52a8\u8f83\u5927\u7684\u65f6\u5019\uff0ccommit message \u6700\u597d\u80fd\u591f\u5173\u8054 GitHub \u4e0a\u7684\u76f8\u5173 Issue \u6216\u8005 Pull Request\uff0c\u8fd9\u6837\uff0c\u6211\u4eec\u7684\u5f00\u53d1\u8005\u5728\u67e5\u9605\u4ee3\u7801\u7684\u65f6\u5019\u80fd\u591f\u901a\u8fc7\u5173\u8054\u4fe1\u606f\u8f83\u4e3a\u8fc5\u901f\u7684\u4e86\u89e3\u6539\u4ee3\u7801\u63d0\u4ea4\u7684\u4e0a\u4e0b\u6587\u60c5\u666f\uff0c\u5982\u679c\u5f53\u524d commit \u9488\u5bf9\u67d0\u4e2a issue\uff0c\u90a3\u4e48\u53ef\u4ee5\u5728 Footer \u90e8\u5206\u5173\u95ed\u8fd9\u4e2a issue\u3002"),(0,i.kt)("h4",{id:"23-\u7edf\u4e00\u7684\u683c\u5f0f"},"2.3 \u7edf\u4e00\u7684\u683c\u5f0f"),(0,i.kt)("p",null,"\u683c\u5f0f\u5316\u540e\u7684 CommitMessage \u80fd\u591f\u5e2e\u52a9\u6211\u4eec\u63d0\u4f9b\u66f4\u591a\u7684\u5386\u53f2\u4fe1\u606f\uff0c\u65b9\u4fbf\u5feb\u901f\u6d4f\u89c8\uff0c\u540c\u65f6\u4e5f\u53ef\u4ee5\u76f4\u63a5\u4ece commit \u751f\u6210 Change Log\u3002"),(0,i.kt)("p",null,"Commit message \u5e94\u8be5\u5305\u62ec\u4e09\u4e2a\u90e8\u5206\uff1aHeader\uff0cBody \u548c Footer\u3002\u5176\u4e2d\uff0cHeader \u662f\u5fc5\u9700\u7684\uff0cBody \u548c Footer \u53ef\u4ee5\u7701\u7565\u3002"),(0,i.kt)("h5",{id:"header"},"header"),(0,i.kt)("p",null,"Header \u90e8\u5206\u53ea\u6709\u4e00\u884c\uff0c\u5305\u62ec\u4e09\u4e2a\u5b57\u6bb5\uff1atype\uff08\u5fc5\u9700\uff09\u3001scope\uff08\u53ef\u9009\uff09\u548c subject\uff08\u5fc5\u9700\uff09\u3002"),(0,i.kt)("p",null,"[DS-ISSUE\u7f16\u53f7][type]"," subject"),(0,i.kt)("p",null,"(1) type \u7528\u4e8e\u8bf4\u660e commit \u7684\u7c7b\u522b\uff0c\u53ea\u5141\u8bb8\u4f7f\u7528\u4e0b\u97627\u4e2a\u6807\u8bc6\u3002"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"feat\uff1a\u65b0\u529f\u80fd\uff08feature\uff09"),(0,i.kt)("li",{parentName:"ul"},"fix\uff1a\u4fee\u8865bug"),(0,i.kt)("li",{parentName:"ul"},"docs\uff1a\u6587\u6863\uff08documentation\uff09"),(0,i.kt)("li",{parentName:"ul"},"style\uff1a \u683c\u5f0f\uff08\u4e0d\u5f71\u54cd\u4ee3\u7801\u8fd0\u884c\u7684\u53d8\u52a8\uff09"),(0,i.kt)("li",{parentName:"ul"},"refactor\uff1a\u91cd\u6784\uff08\u5373\u4e0d\u662f\u65b0\u589e\u529f\u80fd\uff0c\u4e5f\u4e0d\u662f\u4fee\u6539bug\u7684\u4ee3\u7801\u53d8\u52a8\uff09"),(0,i.kt)("li",{parentName:"ul"},"test\uff1a\u589e\u52a0\u6d4b\u8bd5"),(0,i.kt)("li",{parentName:"ul"},"chore\uff1a\u6784\u5efa\u8fc7\u7a0b\u6216\u8f85\u52a9\u5de5\u5177\u7684\u53d8\u52a8")),(0,i.kt)("p",null,"\u5982\u679c type \u4e3a feat \u548c fix\uff0c\u5219\u8be5 commit \u5c06\u80af\u5b9a\u51fa\u73b0\u5728 Change log \u4e4b\u4e2d\u3002\u5176\u4ed6\u60c5\u51b5\uff08docs\u3001chore\u3001style\u3001refactor\u3001test\uff09\u5efa\u8bae\u4e0d\u653e\u5165\u3002"),(0,i.kt)("p",null,"(2\uff09scope"),(0,i.kt)("p",null,"scope \u7528\u4e8e\u8bf4\u660e commit \u5f71\u54cd\u7684\u8303\u56f4\uff0c\u6bd4\u5982 server\u3001remote \u7b49\uff0c\u5982\u679c\u6ca1\u6709\u66f4\u5408\u9002\u7684\u8303\u56f4\uff0c\u4f60\u53ef\u4ee5\u7528 *\u3002"),(0,i.kt)("p",null,"(3) subject"),(0,i.kt)("p",null,"subject \u662f commit \u76ee\u7684\u7684\u7b80\u77ed\u63cf\u8ff0\uff0c\u4e0d\u8d85\u8fc750\u4e2a\u5b57\u7b26\u3002"),(0,i.kt)("h5",{id:"body"},"Body"),(0,i.kt)("p",null,"Body \u90e8\u5206\u662f\u5bf9\u672c\u6b21 commit \u7684\u8be6\u7ec6\u63cf\u8ff0\uff0c\u53ef\u4ee5\u5206\u6210\u591a\u884c\uff0c\u6362\u884c\u7b26\u5c06\u4ee572\u4e2a\u5b57\u7b26\u6362\u884c\uff0c\u907f\u514d\u81ea\u52a8\u6362\u884c\u5f71\u54cd\u7f8e\u89c2\u3002"),(0,i.kt)("p",null,"Body \u90e8\u5206\u9700\u8981\u6ce8\u610f\u4ee5\u4e0b\u51e0\u70b9\uff1a"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u4f7f\u7528\u52a8\u5bbe\u7ed3\u6784\uff0c\u6ce8\u610f\u4f7f\u7528\u73b0\u5728\u65f6\uff0c\u6bd4\u5982\u4f7f\u7528 change \u800c\u975e changed \u6216 changes")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u9996\u5b57\u6bcd\u4e0d\u8981\u5927\u5199")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"\u8bed\u53e5\u6700\u540e\u4e0d\u9700\u8981 \u2018.\u2019 (\u53e5\u53f7) \u7ed3\u5c3e"))),(0,i.kt)("h5",{id:"footer"},"Footer"),(0,i.kt)("p",null,"Footer\u53ea\u9002\u7528\u4e8e\u4e24\u79cd\u60c5\u51b5"),(0,i.kt)("p",null,"(1) \u4e0d\u517c\u5bb9\u53d8\u52a8"),(0,i.kt)("p",null,"\u5982\u679c\u5f53\u524d\u4ee3\u7801\u4e0e\u4e0a\u4e00\u4e2a\u7248\u672c\u4e0d\u517c\u5bb9\uff0c\u5219 Footer \u90e8\u5206\u4ee5 BREAKING CHANGE \u5f00\u5934\uff0c\u540e\u9762\u662f\u5bf9\u53d8\u52a8\u7684\u63cf\u8ff0\u3001\u4ee5\u53ca\u53d8\u52a8\u7406\u7531\u548c\u8fc1\u79fb\u65b9\u6cd5\u3002"),(0,i.kt)("p",null,"(2) \u5173\u95ed Issue"),(0,i.kt)("p",null,"\u5982\u679c\u5f53\u524d commit \u9488\u5bf9\u67d0\u4e2aissue\uff0c\u90a3\u4e48\u53ef\u4ee5\u5728 Footer \u90e8\u5206\u5173\u95ed\u8fd9\u4e2a issue,\u4e5f\u53ef\u4ee5\u4e00\u6b21\u5173\u95ed\u591a\u4e2a issue \u3002"),(0,i.kt)("h5",{id:"\u4e3e\u4e2a\u4f8b\u5b50"},"\u4e3e\u4e2a\u4f8b\u5b50"),(0,i.kt)("p",null,"[Linkis-001][docs-zh]"," add commit message"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"commit message RIP"),(0,i.kt)("li",{parentName:"ul"},"build some conventions "),(0,i.kt)("li",{parentName:"ul"},"help the commit messages become clean and tidy "),(0,i.kt)("li",{parentName:"ul"},"help developers and release managers better track issues\nand clarify the optimization in the version iteration")),(0,i.kt)("p",null,"This closes #001"),(0,i.kt)("h3",{id:"3\u53c2\u8003\u6587\u6863"},"3.\u53c2\u8003\u6587\u6863"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://dolphinscheduler.apache.org/zh-cn/docs/dev/user_doc/contribute/join/commit-message.html"},"Dolphinscheduler Commit Message \u987b\u77e5")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/GEODE/Commit+Message+Format"},"\u63d0\u4ea4\u6d88\u606f\u683c\u5f0f")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"http://who-t.blogspot.com/2009/12/on-commit-messages.html"},"\u5173\u4e8e\u63d0\u4ea4\u6d88\u606f")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://mp.weixin.qq.com/s/LKM4IXAY-7dKhTzGu5-oug"},"RocketMQ \u793e\u533a\u64cd\u4f5c\u7ea6\u5b9a")))}m.isMDXComponent=!0}}]);