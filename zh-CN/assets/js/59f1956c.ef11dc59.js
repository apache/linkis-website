"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[13836],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>g});var l=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function r(e,n){if(null==e)return{};var t,l,i=function(e,n){if(null==e)return{};var t,l,i={},a=Object.keys(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(l=0;l<a.length;l++)t=a[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var p=l.createContext({}),s=function(e){var n=l.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},d=function(e){var n=s(e.components);return l.createElement(p.Provider,{value:n},e.children)},c="mdxType",k={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},u=l.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,p=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),c=s(t),u=i,g=c["".concat(p,".").concat(u)]||c[u]||k[u]||a;return t?l.createElement(g,o(o({ref:n},d),{},{components:t})):l.createElement(g,o({ref:n},d))}));function g(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=u;var r={};for(var p in n)hasOwnProperty.call(n,p)&&(r[p]=n[p]);r.originalType=e,r[c]="string"==typeof e?e:i,o[1]=r;for(var s=2;s<a;s++)o[s]=t[s];return l.createElement.apply(null,o)}return l.createElement.apply(null,t)}u.displayName="MDXCreateElement"},73056:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>k,frontMatter:()=>a,metadata:()=>r,toc:()=>s});var l=t(87462),i=(t(67294),t(3905));const a={title:"openLooKeng",sidebar_position:7},o=void 0,r={unversionedId:"engine-usage/openlookeng",id:"version-1.3.1/engine-usage/openlookeng",title:"openLooKeng",description:"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u5728 Linkis \u4e2d\uff0copenLooKeng \u5f15\u64ce\u63d2\u4ef6\u7684\u5b89\u88c5\u3001\u4f7f\u7528\u548c\u914d\u7f6e\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/version-1.3.1/engine-usage/openlookeng.md",sourceDirName:"engine-usage",slug:"/engine-usage/openlookeng",permalink:"/zh-CN/docs/1.3.1/engine-usage/openlookeng",draft:!1,editUrl:"https://github.com/apache/linkis-website/edit/dev/i18n/zh-CN/docusaurus-plugin-content-docs/version-1.3.1/engine-usage/openlookeng.md",tags:[],version:"1.3.1",sidebarPosition:7,frontMatter:{title:"openLooKeng",sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"Flink",permalink:"/zh-CN/docs/1.3.1/engine-usage/flink"},next:{title:"Sqoop",permalink:"/zh-CN/docs/1.3.1/engine-usage/sqoop"}},p={},s=[{value:"1. \u524d\u7f6e\u5de5\u4f5c",id:"1-\u524d\u7f6e\u5de5\u4f5c",level:2},{value:"1.1 \u73af\u5883\u5b89\u88c5",id:"11-\u73af\u5883\u5b89\u88c5",level:3},{value:"1.2 \u670d\u52a1\u9a8c\u8bc1",id:"12-\u670d\u52a1\u9a8c\u8bc1",level:3},{value:"2. \u5f15\u64ce\u63d2\u4ef6\u5b89\u88c5",id:"2-\u5f15\u64ce\u63d2\u4ef6\u5b89\u88c5",level:2},{value:"2.1 \u5f15\u64ce\u63d2\u4ef6\u51c6\u5907\uff08\u4e8c\u9009\u4e00\uff09\u975e\u9ed8\u8ba4\u5f15\u64ce",id:"21-\u5f15\u64ce\u63d2\u4ef6\u51c6\u5907\u4e8c\u9009\u4e00\u975e\u9ed8\u8ba4\u5f15\u64ce",level:3},{value:"2.2 \u5f15\u64ce\u63d2\u4ef6\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d",id:"22-\u5f15\u64ce\u63d2\u4ef6\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d",level:3},{value:"2.3 \u5f15\u64ce\u5237\u65b0",id:"23-\u5f15\u64ce\u5237\u65b0",level:3},{value:"2.3.1 \u91cd\u542f\u5237\u65b0",id:"231-\u91cd\u542f\u5237\u65b0",level:4},{value:"2.3.2 \u68c0\u67e5\u5f15\u64ce\u662f\u5426\u5237\u65b0\u6210\u529f",id:"232-\u68c0\u67e5\u5f15\u64ce\u662f\u5426\u5237\u65b0\u6210\u529f",level:3},{value:"3. \u5f15\u64ce\u7684\u4f7f\u7528",id:"3-\u5f15\u64ce\u7684\u4f7f\u7528",level:2},{value:"3.1 \u901a\u8fc7 <code>Linkis-cli</code> \u63d0\u4ea4\u4efb\u52a1",id:"31-\u901a\u8fc7-linkis-cli-\u63d0\u4ea4\u4efb\u52a1",level:3},{value:"3.2 \u901a\u8fc7 <code>Linkis SDK</code> \u63d0\u4ea4\u4efb\u52a1",id:"32-\u901a\u8fc7-linkis-sdk-\u63d0\u4ea4\u4efb\u52a1",level:3},{value:"4. \u5f15\u64ce\u914d\u7f6e\u8bf4\u660e",id:"4-\u5f15\u64ce\u914d\u7f6e\u8bf4\u660e",level:2},{value:"4.1 \u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e",id:"41-\u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e",level:3},{value:"4.2 \u914d\u7f6e\u4fee\u6539",id:"42-\u914d\u7f6e\u4fee\u6539",level:3},{value:"4.2.1 \u7ba1\u7406\u53f0\u914d\u7f6e",id:"421-\u7ba1\u7406\u53f0\u914d\u7f6e",level:4},{value:"4.2.2 \u4efb\u52a1\u63a5\u53e3\u914d\u7f6e",id:"422-\u4efb\u52a1\u63a5\u53e3\u914d\u7f6e",level:4},{value:"4.3 \u5f15\u64ce\u76f8\u5173\u6570\u636e\u8868",id:"43-\u5f15\u64ce\u76f8\u5173\u6570\u636e\u8868",level:3}],d={toc:s},c="wrapper";function k(e){let{components:n,...a}=e;return(0,i.kt)(c,(0,l.Z)({},d,a,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," ",(0,i.kt)("inlineCode",{parentName:"p"},"\u4e2d\uff0copenLooKeng")," \u5f15\u64ce\u63d2\u4ef6\u7684\u5b89\u88c5\u3001\u4f7f\u7528\u548c\u914d\u7f6e\u3002"),(0,i.kt)("h2",{id:"1-\u524d\u7f6e\u5de5\u4f5c"},"1. \u524d\u7f6e\u5de5\u4f5c"),(0,i.kt)("h3",{id:"11-\u73af\u5883\u5b89\u88c5"},"1.1 \u73af\u5883\u5b89\u88c5"),(0,i.kt)("p",null,"\u5982\u679c\u60a8\u5e0c\u671b\u90e8\u7f72\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"openLooKeng")," \u5f15\u64ce\uff0c\u60a8\u9700\u8981\u51c6\u5907\u4e00\u5957\u53ef\u7528\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"openLooKeng")," \u73af\u5883\u3002"),(0,i.kt)("h3",{id:"12-\u670d\u52a1\u9a8c\u8bc1"},"1.2 \u670d\u52a1\u9a8c\u8bc1"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"# \u51c6\u5907 hetu-cli\nwget https://download.openlookeng.io/1.5.0/hetu-cli-1.5.0-executable.jar\nmv hetu-cli-1.5.0-executable.jar hetu-cli\nchmod +x hetu-cli\n\n#  \u94fe\u63a5\u670d\u52a1\n./hetu-cli --server 127.0.0.1:9090 --catalog tpcds --schema default\n\n# \u6267\u884c\u67e5\u8be2\u8bed\u53e5\nlk:default> select d_date_sk, d_date_id, d_date, d_month_seq from tpcds.sf1.date_dim order by d_date limit 5;\n\n# \u5f97\u5230\u5982\u4e0b\u8f93\u51fa\u4ee3\u8868\u670d\u52a1\u53ef\u7528\n d_date_sk |    d_date_id     |   d_date   | d_month_seq\n-----------+------------------+------------+-------------\n   2415022 | AAAAAAAAOKJNECAA | 1900-01-02 |           0\n   2415023 | AAAAAAAAPKJNECAA | 1900-01-03 |           0\n   2415024 | AAAAAAAAALJNECAA | 1900-01-04 |           0\n   2415025 | AAAAAAAABLJNECAA | 1900-01-05 |           0\n   2415026 | AAAAAAAACLJNECAA | 1900-01-06 |           0\n(5 rows)\n\nQuery 20221110_043803_00011_m9gmv, FINISHED, 1 node\nSplits: 33 total, 33 done (100.00%)\n0:00 [73K rows, 0B] [86.8K rows/s, 0B/s]\n")),(0,i.kt)("h2",{id:"2-\u5f15\u64ce\u63d2\u4ef6\u5b89\u88c5"},"2. \u5f15\u64ce\u63d2\u4ef6\u5b89\u88c5"),(0,i.kt)("h3",{id:"21-\u5f15\u64ce\u63d2\u4ef6\u51c6\u5907\u4e8c\u9009\u4e00\u975e\u9ed8\u8ba4\u5f15\u64ce"},"2.1 \u5f15\u64ce\u63d2\u4ef6\u51c6\u5907\uff08\u4e8c\u9009\u4e00\uff09",(0,i.kt)("a",{parentName:"h3",href:"/zh-CN/docs/1.3.1/engine-usage/overview"},"\u975e\u9ed8\u8ba4\u5f15\u64ce")),(0,i.kt)("p",null,"\u65b9\u5f0f\u4e00\uff1a\u76f4\u63a5\u4e0b\u8f7d\u5f15\u64ce\u63d2\u4ef6\u5305"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin"},"Linkis \u5f15\u64ce\u63d2\u4ef6\u4e0b\u8f7d")),(0,i.kt)("p",null,"\u65b9\u5f0f\u4e8c\uff1a\u5355\u72ec\u7f16\u8bd1\u5f15\u64ce\u63d2\u4ef6\uff08\u9700\u8981\u6709 ",(0,i.kt)("inlineCode",{parentName:"p"},"maven")," \u73af\u5883\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"# \u7f16\u8bd1\n${linkis_code_dir}/linkis-enginepconn-pugins/engineconn-plugins/openlookeng/\nmvn clean install\n# \u7f16\u8bd1\u51fa\u6765\u7684\u5f15\u64ce\u63d2\u4ef6\u5305\uff0c\u4f4d\u4e8e\u5982\u4e0b\u76ee\u5f55\u4e2d\n${linkis_code_dir}/linkis-engineconn-plugins/openlookeng/target/out/\n")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/zh-CN/docs/1.3.1/deployment/install-engineconn"},"EngineConnPlugin \u5f15\u64ce\u63d2\u4ef6\u5b89\u88c5")),(0,i.kt)("h3",{id:"22-\u5f15\u64ce\u63d2\u4ef6\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d"},"2.2 \u5f15\u64ce\u63d2\u4ef6\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d"),(0,i.kt)("p",null,"\u5c06 2.1 \u4e2d\u7684\u5f15\u64ce\u63d2\u4ef6\u5305\u4e0a\u4f20\u5230\u670d\u52a1\u5668\u7684\u5f15\u64ce\u76ee\u5f55\u4e0b"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"${LINKIS_HOME}/lib/linkis-engineconn-plugins\n")),(0,i.kt)("p",null,"\u4e0a\u4f20\u540e\u76ee\u5f55\u7ed3\u6784\u5982\u4e0b\u6240\u793a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"linkis-engineconn-plugins/\n\u251c\u2500\u2500 openlookeng\n\u2502\xa0\xa0 \u251c\u2500\u2500 dist\n\u2502\xa0\xa0 \u2502\xa0\xa0 \u2514\u2500\u2500 v1.5.0\n\u2502\xa0\xa0 \u2502\xa0\xa0     \u251c\u2500\u2500 conf\n\u2502\xa0\xa0 \u2502\xa0\xa0     \u2514\u2500\u2500 lib\n\u2502\xa0\xa0 \u2514\u2500\u2500 plugin\n\u2502\xa0\xa0     \u2514\u2500\u2500 1.5.0\n")),(0,i.kt)("h3",{id:"23-\u5f15\u64ce\u5237\u65b0"},"2.3 \u5f15\u64ce\u5237\u65b0"),(0,i.kt)("h4",{id:"231-\u91cd\u542f\u5237\u65b0"},"2.3.1 \u91cd\u542f\u5237\u65b0"),(0,i.kt)("p",null,"\u901a\u8fc7\u91cd\u542f ",(0,i.kt)("inlineCode",{parentName:"p"},"linkis-cg-linkismanager")," \u670d\u52a1\u5237\u65b0\u5f15\u64ce"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd ${LINKIS_HOME}/sbin\nsh linkis-daemon.sh restart cg-linkismanager\n")),(0,i.kt)("h3",{id:"232-\u68c0\u67e5\u5f15\u64ce\u662f\u5426\u5237\u65b0\u6210\u529f"},"2.3.2 \u68c0\u67e5\u5f15\u64ce\u662f\u5426\u5237\u65b0\u6210\u529f"),(0,i.kt)("p",null,"\u53ef\u4ee5\u67e5\u770b\u6570\u636e\u5e93\u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"linkis_engine_conn_plugin_bml_resources")," \u8fd9\u5f20\u8868\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"last_update_time")," \u662f\u5426\u4e3a\u89e6\u53d1\u5237\u65b0\u7684\u65f6\u95f4\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"#\u767b\u9646\u5230 `linkis` \u7684\u6570\u636e\u5e93 \nselect * from linkis_cg_engine_conn_plugin_bml_resources;\n")),(0,i.kt)("h2",{id:"3-\u5f15\u64ce\u7684\u4f7f\u7528"},"3. \u5f15\u64ce\u7684\u4f7f\u7528"),(0,i.kt)("h3",{id:"31-\u901a\u8fc7-linkis-cli-\u63d0\u4ea4\u4efb\u52a1"},"3.1 \u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"h3"},"Linkis-cli")," \u63d0\u4ea4\u4efb\u52a1"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sh ./bin/linkis-cli -engineType openlookeng-1.5.0 \\\n-codeType sql -code 'select * from tpcds.sf1.date_dim;' \\\n-submitUser hadoop -proxyUser hadoop \\\n-runtimeMap linkis.openlookeng.url=http://127.0.0.1:8080 \n")),(0,i.kt)("p",null,"\u66f4\u591a ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis-Cli")," \u547d\u4ee4\u53c2\u6570\u53c2\u8003\uff1a ",(0,i.kt)("a",{parentName:"p",href:"/zh-CN/docs/1.3.1/user-guide/linkiscli-manual"},"Linkis-Cli \u4f7f\u7528")),(0,i.kt)("h3",{id:"32-\u901a\u8fc7-linkis-sdk-\u63d0\u4ea4\u4efb\u52a1"},"3.2 \u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"h3"},"Linkis SDK")," \u63d0\u4ea4\u4efb\u52a1"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," \u63d0\u4f9b\u4e86 ",(0,i.kt)("inlineCode",{parentName:"p"},"Java")," \u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"Scala")," \u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"SDK")," \u5411 ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," \u670d\u52a1\u7aef\u63d0\u4ea4\u4efb\u52a1\u3002\u5177\u4f53\u53ef\u4ee5\u53c2\u8003 ",(0,i.kt)("a",{parentName:"p",href:"/zh-CN/docs/1.3.1/user-guide/sdk-manual"},"JAVA SDK Manual"),"\u3002\u5bf9\u4e8e ",(0,i.kt)("inlineCode",{parentName:"p"},"JDBC")," \u4efb\u52a1\u60a8\u53ea\u9700\u8981\u4fee\u6539 ",(0,i.kt)("inlineCode",{parentName:"p"},"Demo")," \u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"EngineConnType")," \u548c ",(0,i.kt)("inlineCode",{parentName:"p"},"CodeType")," \u53c2\u6570\u5373\u53ef:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-java"},'Map<String, Object> labels = new HashMap<String, Object>();\nlabels.put(LabelKeyConstant.ENGINE_TYPE_KEY, "openlookeng-1.5.0"); // required engineType Label\nlabels.put(LabelKeyConstant.USER_CREATOR_TYPE_KEY, "hadoop-IDE");// required execute user and creator\nlabels.put(LabelKeyConstant.CODE_TYPE_KEY, "sql"); // required codeType\n')),(0,i.kt)("h2",{id:"4-\u5f15\u64ce\u914d\u7f6e\u8bf4\u660e"},"4. \u5f15\u64ce\u914d\u7f6e\u8bf4\u660e"),(0,i.kt)("h3",{id:"41-\u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e"},"4.1 \u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"\u914d\u7f6e"),(0,i.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,i.kt)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u987b"),(0,i.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.openlookeng.url"),(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("a",{parentName:"td",href:"http://127.0.0.1:8080"},"http://127.0.0.1:8080")),(0,i.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,i.kt)("td",{parentName:"tr",align:null},"\u94fe\u63a5\u5730\u5740")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.openlookeng.catalog"),(0,i.kt)("td",{parentName:"tr",align:null},"system"),(0,i.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,i.kt)("td",{parentName:"tr",align:null},"catalog")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.openlookeng.source"),(0,i.kt)("td",{parentName:"tr",align:null},"global"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"source")))),(0,i.kt)("h3",{id:"42-\u914d\u7f6e\u4fee\u6539"},"4.2 \u914d\u7f6e\u4fee\u6539"),(0,i.kt)("p",null,"\u5982\u679c\u9ed8\u8ba4\u53c2\u6570\u4e0d\u6ee1\u8db3\u65f6\uff0c\u6709\u5982\u4e0b\u51e0\u4e2d\u65b9\u5f0f\u53ef\u4ee5\u8fdb\u884c\u4e00\u4e9b\u57fa\u7840\u53c2\u6570\u914d\u7f6e"),(0,i.kt)("h4",{id:"421-\u7ba1\u7406\u53f0\u914d\u7f6e"},"4.2.1 \u7ba1\u7406\u53f0\u914d\u7f6e"),(0,i.kt)("p",null,(0,i.kt)("img",{src:t(32862).Z,width:"1906",height:"674"})),(0,i.kt)("p",null,"\u6ce8\u610f: \u4fee\u6539 ",(0,i.kt)("inlineCode",{parentName:"p"},"IDE")," \u6807\u7b7e\u4e0b\u7684\u914d\u7f6e\u540e\u9700\u8981\u6307\u5b9a ",(0,i.kt)("inlineCode",{parentName:"p"},"-creator IDE")," \u624d\u4f1a\u751f\u6548\uff08\u5176\u5b83\u6807\u7b7e\u7c7b\u4f3c\uff09\uff0c\u5982\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},"sh ./bin/linkis-cli -creator IDE \\\n-engineType openlookeng-1.5.0 -codeType sql \\\n-code 'select * from tpcds.sf1.date_dim;' \\\n-submitUser hadoop -proxyUser hadoop \n")),(0,i.kt)("h4",{id:"422-\u4efb\u52a1\u63a5\u53e3\u914d\u7f6e"},"4.2.2 \u4efb\u52a1\u63a5\u53e3\u914d\u7f6e"),(0,i.kt)("p",null,"\u63d0\u4ea4\u4efb\u52a1\u63a5\u53e3\uff0c\u901a\u8fc7\u53c2\u6570 ",(0,i.kt)("inlineCode",{parentName:"p"},"params.configuration.runtime")," \u8fdb\u884c\u914d\u7f6e"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'http \u8bf7\u6c42\u53c2\u6570\u793a\u4f8b \n{\n    "executionContent": {"code": "select * from tpcds.sf1.date_dim;", "runType":  "sql"},\n    "params": {\n                    "variable": {},\n                    "configuration": {\n                            "runtime": {\n                                "linkis.openlookeng.url":"http://127.0.0.1:9090"\n                                }\n                            }\n                    },\n    "labels": {\n        "engineType": "openlookeng-1.5.0",\n        "userCreator": "hadoop-IDE"\n    }\n}\n')),(0,i.kt)("h3",{id:"43-\u5f15\u64ce\u76f8\u5173\u6570\u636e\u8868"},"4.3 \u5f15\u64ce\u76f8\u5173\u6570\u636e\u8868"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," \u662f\u901a\u8fc7\u5f15\u64ce\u6807\u7b7e\u6765\u8fdb\u884c\u7ba1\u7406\u7684\uff0c\u6240\u6d89\u53ca\u7684\u6570\u636e\u8868\u4fe1\u606f\u5982\u4e0b\u6240\u793a\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"linkis_ps_configuration_config_key:  \u63d2\u5165\u5f15\u64ce\u7684\u914d\u7f6e\u53c2\u6570\u7684key\u548c\u9ed8\u8ba4values\nlinkis_cg_manager_label\uff1a\u63d2\u5165\u5f15\u64celabel\u5982\uff1aopenlookeng-1.5.0\nlinkis_ps_configuration_category\uff1a \u63d2\u5165\u5f15\u64ce\u7684\u76ee\u5f55\u5173\u8054\u5173\u7cfb\nlinkis_ps_configuration_config_value\uff1a \u63d2\u5165\u5f15\u64ce\u9700\u8981\u5c55\u793a\u7684\u914d\u7f6e\nlinkis_ps_configuration_key_engine_relation:\u914d\u7f6e\u9879\u548c\u5f15\u64ce\u7684\u5173\u8054\u5173\u7cfb\n")),(0,i.kt)("p",null,"\u8868\u4e2d\u4e0e\u5f15\u64ce\u76f8\u5173\u7684\u521d\u59cb\u6570\u636e\u5982\u4e0b"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"-- set variable\nSET @OPENLOOKENG_LABEL=\"openlookeng-1.5.0\";\nSET @OPENLOOKENG_ALL=CONCAT('*-*,',@OPENLOOKENG_LABEL);\nSET @OPENLOOKENG_IDE=CONCAT('*-IDE,',@OPENLOOKENG_LABEL);\n\n-- engine label\ninsert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @OPENLOOKENG_ALL, 'OPTIONAL', 2, now(), now());\ninsert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @OPENLOOKENG_IDE, 'OPTIONAL', 2, now(), now());\n\nselect @label_id := id from linkis_cg_manager_label where `label_value` = @OPENLOOKENG_IDE;\ninsert into linkis_ps_configuration_category (`label_id`, `level`) VALUES (@label_id, 2);\n\n-- configuration key\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.openlookeng.url', '\u4f8b\u5982:http://127.0.0.1:8080', '\u8fde\u63a5\u5730\u5740', 'http://127.0.0.1:8080', 'Regex', '^\\\\s*http://([^:]+)(:\\\\d+)(/[^\\\\?]+)?(\\\\?\\\\S*)?$', 'openlookeng', 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.openlookeng.catalog', 'catalog', 'catalog', 'system', 'None', '', 'openlookeng', 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.openlookeng.source', 'source', 'source', 'global', 'None', '', 'openlookeng', 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\n\n-- key engine relation\ninsert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)\n(select config.id as `config_key_id`, label.id AS `engine_type_label_id` FROM linkis_ps_configuration_config_key config\nINNER JOIN linkis_cg_manager_label label ON config.engine_conn_type = 'openlookeng' and label_value = @OPENLOOKENG_ALL);\n\n-- openlookeng default configuration\ninsert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)\n(select `relation`.`config_key_id` AS `config_key_id`, '' AS `config_value`, `relation`.`engine_type_label_id` AS `config_label_id` FROM linkis_ps_configuration_key_engine_relation relation\nINNER JOIN linkis_cg_manager_label label ON relation.engine_type_label_id = label.id AND label.label_value = @OPENLOOKENG_ALL);\n\n")))}k.isMDXComponent=!0},32862:(e,n,t)=>{t.d(n,{Z:()=>l});const l=t.p+"assets/images/openlookeng-config-2df376b782443f32b528df56ce88d8b8.png"}}]);