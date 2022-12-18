"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[18421],{3905:(e,t,o)=>{o.d(t,{Zo:()=>m,kt:()=>d});var n=o(67294);function i(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,n)}return o}function a(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){i(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,n,i=function(e,t){if(null==e)return{};var o,n,i={},r=Object.keys(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||(i[o]=e[o]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)o=r[n],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(i[o]=e[o])}return i}var c=n.createContext({}),l=function(e){var t=n.useContext(c),o=t;return e&&(o="function"==typeof e?e(t):a(a({},t),e)),o},m=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var o=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=l(o),d=i,h=u["".concat(c,".").concat(d)]||u[d]||p[d]||r;return o?n.createElement(h,a(a({ref:t},m),{},{components:o})):n.createElement(h,a({ref:t},m))}));function d(e,t){var o=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=o.length,a=new Array(r);a[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var l=2;l<r;l++)a[l]=o[l];return n.createElement.apply(null,a)}return n.createElement.apply(null,o)}u.displayName="MDXCreateElement"},32115:(e,t,o)=>{o.r(t),o.d(t,{contentTitle:()=>a,default:()=>m,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var n=o(87462),i=(o(67294),o(3905));const r={title:"Commit Message Notice",sidebar_position:2},a=void 0,s={unversionedId:"development/development-specification/commit-message",id:"development/development-specification/commit-message",isDocsHomePage:!1,title:"Commit Message Notice",description:"This article is quoted from https://dolphinscheduler.apache.org/en-us/docs/dev/user_doc/contribute/join/commit-message.html",source:"@site/docs/development/development-specification/commit-message.md",sourceDirName:"development/development-specification",slug:"/development/development-specification/commit-message",permalink:"/docs/1.3.1/development/development-specification/commit-message",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/docs/development/development-specification/commit-message.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Commit Message Notice",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Programming Specification",permalink:"/docs/1.3.1/development/development-specification/programming-specification"},next:{title:"Log Specification",permalink:"/docs/1.3.1/development/development-specification/log"}},c=[{value:"1.Preface",id:"1preface",children:[]},{value:"2.Commit Message RIP",id:"2commit-message-rip",children:[]},{value:"3.Reference documents",id:"3reference-documents",children:[]}],l={toc:c};function m(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,n.Z)({},l,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"This article is quoted from ",(0,i.kt)("a",{parentName:"p",href:"https://dolphinscheduler.apache.org/en-us/docs/dev/user_doc/contribute/join/commit-message.html"},"https://dolphinscheduler.apache.org/en-us/docs/dev/user_doc/contribute/join/commit-message.html"))),(0,i.kt)("h3",{id:"1preface"},"1.Preface"),(0,i.kt)("p",null,"A good commit message can help other developers (or future developers) quickly understand the context of related changes, and can also help project managers determine whether the commit is suitable for inclusion in the release. But when we checked the commit logs of many open source projects, we found an interesting problem. Some developers have very good code quality, but the commit message record is rather confusing. When other contributors or learners are viewing the code, it can\u2019t be intuitively understood through commit log.\nThe purpose of the changes before and after the submission, as Peter Hutterer said\uff1aRe-establishing the context of a piece of code is wasteful. We can\u2019t avoid it completely, so our efforts should go to reducing it as much as possible. Commit messages can do exactly that and as a result, a commit message shows whether a developer is a good collaborator. Therefore, DolphinScheduler developed the protocol in conjunction with other communities and official Apache documents."),(0,i.kt)("h3",{id:"2commit-message-rip"},"2.Commit Message RIP"),(0,i.kt)("h4",{id:"21-clearly-modify-the-content"},"2.1 Clearly modify the content"),(0,i.kt)("p",null,"A commit message should clearly state what issues (bug fixes, function enhancements, etc.) the submission solves, so that other developers can better track the issues and clarify the optimization during the version iteration process."),(0,i.kt)("h4",{id:"22-associate-the-corresponding-pull-request-or-issue"},"2.2 Associate the corresponding Pull Request or Issue"),(0,i.kt)("p",null,"When our changes are large, the commit message should best be associated with the relevant Issue or Pull Request on GitHub, so that our developers can quickly understand the context of the code submission through the associated information when reviewing the code. If the current commit is for an issue, then the issue can be closed in the Footer section."),(0,i.kt)("h4",{id:"23-unified-format"},"2.3 Unified format"),(0,i.kt)("p",null,"The formatted CommitMessage can help provide more historical information for quick browsing, and it can also generate a Change Log directly from commit."),(0,i.kt)("p",null,"Commit message should include three parts: Header, Body and Footer. Among them, Header is required, Body and Footer can be omitted."),(0,i.kt)("h5",{id:"header"},"Header"),(0,i.kt)("p",null,"The header part has only one line, including three fields: type (required), scope (optional), and subject (required)."),(0,i.kt)("p",null,"[DS-ISSUE number][type]"," subject"),(0,i.kt)("p",null,"(1) Type is used to indicate the category of commit, and only the following 7 types are allowed."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"feat\uff1aNew features"),(0,i.kt)("li",{parentName:"ul"},"fix\uff1aBug fixes"),(0,i.kt)("li",{parentName:"ul"},"docs\uff1aDocumentation"),(0,i.kt)("li",{parentName:"ul"},"style\uff1a Format (does not affect changes in code operation)"),(0,i.kt)("li",{parentName:"ul"},"refactor\uff1aRefactoring (It is not a new feature or a code change to fix a bug)"),(0,i.kt)("li",{parentName:"ul"},"test\uff1aAdd test"),(0,i.kt)("li",{parentName:"ul"},"chore\uff1aChanges in the build process or auxiliary tools")),(0,i.kt)("p",null,"If the type is feat and fix, the commit will definitely appear in the change log. Other types (docs, chore, style, refactor, test) are not recommended."),(0,i.kt)("p",null,"(2) Scope"),(0,i.kt)("p",null,"Scope is used to indicate the scope of commit impact, such as server, remote, etc. If there is no suitable scope, you can use ","*","."),(0,i.kt)("p",null,"(3) subject"),(0,i.kt)("p",null,"Subject is a short description of the purpose of the commit, no more than 50 characters."),(0,i.kt)("h5",{id:"body"},"Body"),(0,i.kt)("p",null,"The body part is a detailed description of this commit, which can be divided into multiple lines, and the line break will wrap with 72 characters to avoid automatic line wrapping affecting the appearance."),(0,i.kt)("p",null,"Note the following points in the Body section:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Use the verb-object structure, note the use of present tense. For example, use change instead of changed or changes")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Don't capitalize the first letter")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The end of the sentence does not need a \u2018.\u2019 (period)"))),(0,i.kt)("h5",{id:"footer"},"Footer"),(0,i.kt)("p",null,"Footer only works in two situations"),(0,i.kt)("p",null,"(1) Incompatible changes"),(0,i.kt)("p",null,"If the current code is not compatible with the previous version, the Footer part starts with BREAKING CHANGE, followed by a description of the change, the reason for the change, and the migration method."),(0,i.kt)("p",null,"(2) Close Issue"),(0,i.kt)("p",null,"If the current commit is for a certain issue, you can close the issue in the Footer section, or close multiple issues at once."),(0,i.kt)("h5",{id:"for-example"},"For Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"[Linkis-001][docs-en] add commit message\n\n- commit message RIP\n- build some conventions\n- help the commit messages become clean and tidy\n- help developers and release managers better track issues\n  and clarify the optimization in the version iteration\n\nThis closes #001\n")),(0,i.kt)("h3",{id:"3reference-documents"},"3.Reference documents"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://dolphinscheduler.apache.org/zh-cn/docs/dev/user_doc/contribute/join/commit-message.html"},"Dolphinscheduler Commit Message")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://cwiki.apache.org/confluence/display/GEODE/Commit+Message+Format"},"Commit message format")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"http://who-t.blogspot.com/2009/12/on-commit-messages.html"},"On commit messages-Peter Hutterer")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://mp.weixin.qq.com/s/LKM4IXAY-7dKhTzGu5-oug"},"RocketMQ Community Operation Conventions")))}m.isMDXComponent=!0}}]);