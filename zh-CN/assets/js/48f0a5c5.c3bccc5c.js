"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[7591],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>k});var a=t(67294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var o=a.createContext({}),p=function(e){var n=a.useContext(o),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},d=function(e){var n=p(e.components);return a.createElement(o.Provider,{value:n},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},_=a.forwardRef((function(e,n){var t=e.components,i=e.mdxType,l=e.originalType,o=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),c=p(t),_=i,k=c["".concat(o,".").concat(_)]||c[_]||u[_]||l;return t?a.createElement(k,r(r({ref:n},d),{},{components:t})):a.createElement(k,r({ref:n},d))}));function k(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var l=t.length,r=new Array(l);r[0]=_;var s={};for(var o in n)hasOwnProperty.call(n,o)&&(s[o]=n[o]);s.originalType=e,s[c]="string"==typeof e?e:i,r[1]=s;for(var p=2;p<l;p++)r[p]=t[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}_.displayName="MDXCreateElement"},69785:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var a=t(87462),i=(t(67294),t(3905));const l={title:"ElasticSearch",sidebar_position:10},r=void 0,s={unversionedId:"engine-usage/elasticsearch",id:"engine-usage/elasticsearch",title:"ElasticSearch",description:"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u5728 Linkis \u4e2d\uff0cElasticSearch \u5f15\u64ce\u8fde\u63a5\u5668\u7684\u5b89\u88c5\u3001\u4f7f\u7528\u548c\u914d\u7f6e\u3002",source:"@site/i18n/zh-CN/docusaurus-plugin-content-docs/current/engine-usage/elasticsearch.md",sourceDirName:"engine-usage",slug:"/engine-usage/elasticsearch",permalink:"/zh-CN/docs/1.5.0/engine-usage/elasticsearch",draft:!1,editUrl:"https://github.com/apache/linkis-website/edit/dev/i18n/zh-CN/docusaurus-plugin-content-docs/current/engine-usage/elasticsearch.md",tags:[],version:"current",sidebarPosition:10,frontMatter:{title:"ElasticSearch",sidebar_position:10},sidebar:"tutorialSidebar",previous:{title:"Pipeline",permalink:"/zh-CN/docs/1.5.0/engine-usage/pipeline"},next:{title:"Presto",permalink:"/zh-CN/docs/1.5.0/engine-usage/presto"}},o={},p=[{value:"1. \u524d\u7f6e\u5de5\u4f5c",id:"1-\u524d\u7f6e\u5de5\u4f5c",level:2},{value:"1.1 \u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5",id:"11-\u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5",level:3},{value:"1.2 \u670d\u52a1\u9a8c\u8bc1",id:"12-\u670d\u52a1\u9a8c\u8bc1",level:3},{value:"2. \u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5",id:"2-\u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5",level:2},{value:"2.1 \u5f15\u64ce\u8fde\u63a5\u5668\u51c6\u5907\uff08\u4e8c\u9009\u4e00\uff09\u975e\u9ed8\u8ba4\u5f15\u64ce\u8fde\u63a5\u5668",id:"21-\u5f15\u64ce\u8fde\u63a5\u5668\u51c6\u5907\u4e8c\u9009\u4e00\u975e\u9ed8\u8ba4\u5f15\u64ce\u8fde\u63a5\u5668",level:3},{value:"2.2 \u5f15\u64ce\u8fde\u63a5\u5668\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d",id:"22-\u5f15\u64ce\u8fde\u63a5\u5668\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d",level:3},{value:"2.3 \u5f15\u64ce\u8fde\u63a5\u5668\u5237\u65b0",id:"23-\u5f15\u64ce\u8fde\u63a5\u5668\u5237\u65b0",level:3},{value:"2.3.1 \u91cd\u542f\u5237\u65b0",id:"231-\u91cd\u542f\u5237\u65b0",level:4},{value:"2.3.2 \u68c0\u67e5\u5f15\u64ce\u8fde\u63a5\u5668\u662f\u5426\u5237\u65b0\u6210\u529f",id:"232-\u68c0\u67e5\u5f15\u64ce\u8fde\u63a5\u5668\u662f\u5426\u5237\u65b0\u6210\u529f",level:3},{value:"3.\u5f15\u64ce\u8fde\u63a5\u5668\u4f7f\u7528",id:"3\u5f15\u64ce\u8fde\u63a5\u5668\u4f7f\u7528",level:2},{value:"3.1 \u901a\u8fc7 <code>Linkis-cli</code> \u63d0\u4ea4\u4efb\u52a1",id:"31-\u901a\u8fc7-linkis-cli-\u63d0\u4ea4\u4efb\u52a1",level:3},{value:"4. \u5f15\u64ce\u8fde\u63a5\u5668\u914d\u7f6e\u8bf4\u660e",id:"4-\u5f15\u64ce\u8fde\u63a5\u5668\u914d\u7f6e\u8bf4\u660e",level:2},{value:"4.1 \u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e",id:"41-\u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e",level:3},{value:"4.2 \u914d\u7f6e\u4fee\u6539",id:"42-\u914d\u7f6e\u4fee\u6539",level:3},{value:"4.2.1 \u7ba1\u7406\u53f0\u914d\u7f6e",id:"421-\u7ba1\u7406\u53f0\u914d\u7f6e",level:4},{value:"4.2.2 \u4efb\u52a1\u63a5\u53e3\u914d\u7f6e",id:"422-\u4efb\u52a1\u63a5\u53e3\u914d\u7f6e",level:4},{value:"4.2.3 \u6587\u4ef6\u914d\u7f6e",id:"423-\u6587\u4ef6\u914d\u7f6e",level:4},{value:"4.3 \u5f15\u64ce\u8fde\u63a5\u5668\u76f8\u5173\u6570\u636e\u8868",id:"43-\u5f15\u64ce\u8fde\u63a5\u5668\u76f8\u5173\u6570\u636e\u8868",level:3}],d={toc:p},c="wrapper";function u(e){let{components:n,...l}=e;return(0,i.kt)(c,(0,a.Z)({},d,l,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"\u672c\u6587\u4e3b\u8981\u4ecb\u7ecd\u5728 ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," \u4e2d\uff0c",(0,i.kt)("inlineCode",{parentName:"p"},"ElasticSearch")," \u5f15\u64ce\u8fde\u63a5\u5668\u7684\u5b89\u88c5\u3001\u4f7f\u7528\u548c\u914d\u7f6e\u3002"),(0,i.kt)("h2",{id:"1-\u524d\u7f6e\u5de5\u4f5c"},"1. \u524d\u7f6e\u5de5\u4f5c"),(0,i.kt)("h3",{id:"11-\u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5"},"1.1 \u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5"),(0,i.kt)("p",null,"\u5982\u679c\u60a8\u5e0c\u671b\u5728\u60a8\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," \u670d\u52a1\u4e0a\u4f7f\u7528 ",(0,i.kt)("inlineCode",{parentName:"p"},"ElasticSearch")," \u5f15\u64ce\u8fde\u63a5\u5668\uff0c\u60a8\u9700\u8981\u5b89\u88c5 ",(0,i.kt)("inlineCode",{parentName:"p"},"ElasticSearch")," \u670d\u52a1\u5e76\u4fdd\u8bc1\u670d\u52a1\u53ef\u7528\u3002"),(0,i.kt)("h3",{id:"12-\u670d\u52a1\u9a8c\u8bc1"},"1.2 \u670d\u52a1\u9a8c\u8bc1"),(0,i.kt)("p",null,"\u901a\u8fc7\u5982\u4e0b\u547d\u4ee4\u9a8c\u8bc1 ",(0,i.kt)("inlineCode",{parentName:"p"},"ElasticSearch")," \u5f15\u64ce\u8fde\u63a5\u5668\u670d\u52a1\u662f\u5426\u53ef\u7528\uff0c\u5982\u670d\u52a1\u5df2\u5f00\u542f\u7528\u6237\u9a8c\u8bc1\u5219\u9700\u8981\u589e\u52a0  ",(0,i.kt)("inlineCode",{parentName:"p"},"--user username:password")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"curl [--user username:password] http://ip:port/_cluster/healty?pretty\n")),(0,i.kt)("p",null,"\u8f93\u51fa\u5982\u4e0b\u5185\u5bb9\u4ee3\u8868 ",(0,i.kt)("inlineCode",{parentName:"p"},"ElasticSearch")," \u670d\u52a1\u53ef\u7528\uff0c\u6ce8\u610f\u96c6\u7fa4 ",(0,i.kt)("inlineCode",{parentName:"p"},"status")," \u4e3a ",(0,i.kt)("inlineCode",{parentName:"p"},"green")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "cluster_name" : "docker-cluster",\n  "status" : "green",\n  "timed_out" : false,\n  "number_of_nodes" : 1,\n  "number_of_data_nodes" : 1,\n  "active_primary_shards" : 7,\n  "active_shards" : 7,\n  "relocating_shards" : 0,\n  "initializing_shards" : 0,\n  "unassigned_shards" : 0,\n  "delayed_unassigned_shards" : 0,\n  "number_of_pending_tasks" : 0,\n  "number_of_in_flight_fetch" : 0,\n  "task_max_waiting_in_queue_millis" : 0,\n  "active_shards_percent_as_number" : 100.0\n}\n')),(0,i.kt)("h2",{id:"2-\u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5"},"2. \u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5"),(0,i.kt)("h3",{id:"21-\u5f15\u64ce\u8fde\u63a5\u5668\u51c6\u5907\u4e8c\u9009\u4e00\u975e\u9ed8\u8ba4\u5f15\u64ce\u8fde\u63a5\u5668"},"2.1 \u5f15\u64ce\u8fde\u63a5\u5668\u51c6\u5907\uff08\u4e8c\u9009\u4e00\uff09",(0,i.kt)("a",{parentName:"h3",href:"/zh-CN/docs/1.5.0/engine-usage/overview"},"\u975e\u9ed8\u8ba4\u5f15\u64ce\u8fde\u63a5\u5668")),(0,i.kt)("p",null,"\u65b9\u5f0f\u4e00\uff1a\u76f4\u63a5\u4e0b\u8f7d\u5f15\u64ce\u8fde\u63a5\u5668\u5305"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://linkis.apache.org/zh-CN/blog/2022/04/15/how-to-download-engineconn-plugin"},"Linkis \u5f15\u64ce\u8fde\u63a5\u5668\u4e0b\u8f7d")),(0,i.kt)("p",null,"\u65b9\u5f0f\u4e8c\uff1a\u5355\u72ec\u7f16\u8bd1\u5f15\u64ce\u8fde\u63a5\u5668\uff08\u9700\u8981\u6709 ",(0,i.kt)("inlineCode",{parentName:"p"},"maven")," \u73af\u5883\uff09"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"# \u7f16\u8bd1\ncd ${linkis_code_dir}/linkis-engineconn-plugins/elasticsearch/\nmvn clean install\n# \u7f16\u8bd1\u51fa\u6765\u7684\u5f15\u64ce\u8fde\u63a5\u5668\u5305\uff0c\u4f4d\u4e8e\u5982\u4e0b\u76ee\u5f55\u4e2d\n${linkis_code_dir}/linkis-engineconn-plugins/elasticsearch/target/out/\n")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/zh-CN/docs/1.5.0/deployment/install-engineconn"},"EngineConnPlugin \u5f15\u64ce\u8fde\u63a5\u5668\u5b89\u88c5")),(0,i.kt)("h3",{id:"22-\u5f15\u64ce\u8fde\u63a5\u5668\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d"},"2.2 \u5f15\u64ce\u8fde\u63a5\u5668\u7684\u4e0a\u4f20\u548c\u52a0\u8f7d"),(0,i.kt)("p",null,"\u5c06 2.1 \u4e2d\u7684\u5f15\u64ce\u8fde\u63a5\u5668\u5305\u4e0a\u4f20\u5230\u670d\u52a1\u5668\u7684\u5f15\u64ce\u8fde\u63a5\u5668\u76ee\u5f55\u4e0b"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"${LINKIS_HOME}/lib/linkis-engineconn-plugins\n")),(0,i.kt)("p",null,"\u4e0a\u4f20\u540e\u76ee\u5f55\u7ed3\u6784\u5982\u4e0b\u6240\u793a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"linkis-engineconn-plugins/\n\u251c\u2500\u2500 elasticsearch\n\u2502\xa0\xa0 \u251c\u2500\u2500 dist\n\u2502\xa0\xa0 \u2502\xa0\xa0 \u2514\u2500\u2500 7.6.2\n\u2502\xa0\xa0 \u2502\xa0\xa0     \u251c\u2500\u2500 conf\n\u2502\xa0\xa0 \u2502\xa0\xa0     \u2514\u2500\u2500 lib\n\u2502\xa0\xa0 \u2514\u2500\u2500 plugin\n\u2502\xa0\xa0     \u2514\u2500\u2500 7.6.2\n")),(0,i.kt)("h3",{id:"23-\u5f15\u64ce\u8fde\u63a5\u5668\u5237\u65b0"},"2.3 \u5f15\u64ce\u8fde\u63a5\u5668\u5237\u65b0"),(0,i.kt)("h4",{id:"231-\u91cd\u542f\u5237\u65b0"},"2.3.1 \u91cd\u542f\u5237\u65b0"),(0,i.kt)("p",null,"\u901a\u8fc7\u91cd\u542f ",(0,i.kt)("inlineCode",{parentName:"p"},"linkis-cg-linkismanager")," \u670d\u52a1\u5237\u65b0\u5f15\u64ce\u8fde\u63a5\u5668"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd ${LINKIS_HOME}/sbin\nsh linkis-daemon.sh restart cg-linkismanager\n")),(0,i.kt)("h3",{id:"232-\u68c0\u67e5\u5f15\u64ce\u8fde\u63a5\u5668\u662f\u5426\u5237\u65b0\u6210\u529f"},"2.3.2 \u68c0\u67e5\u5f15\u64ce\u8fde\u63a5\u5668\u662f\u5426\u5237\u65b0\u6210\u529f"),(0,i.kt)("p",null,"\u53ef\u4ee5\u67e5\u770b\u6570\u636e\u5e93\u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"linkis_engine_conn_plugin_bml_resources")," \u8fd9\u5f20\u8868\u7684",(0,i.kt)("inlineCode",{parentName:"p"},"last_update_time")," \u662f\u5426\u4e3a\u89e6\u53d1\u5237\u65b0\u7684\u65f6\u95f4\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"#\u767b\u9646\u5230linkis\u7684\u6570\u636e\u5e93 \nselect * from linkis_cg_engine_conn_plugin_bml_resources;\n")),(0,i.kt)("h2",{id:"3\u5f15\u64ce\u8fde\u63a5\u5668\u4f7f\u7528"},"3.\u5f15\u64ce\u8fde\u63a5\u5668\u4f7f\u7528"),(0,i.kt)("h3",{id:"31-\u901a\u8fc7-linkis-cli-\u63d0\u4ea4\u4efb\u52a1"},"3.1 \u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"h3"},"Linkis-cli")," \u63d0\u4ea4\u4efb\u52a1"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"-codeType")," \u53c2\u6570\u8bf4\u660e")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"essql"),"\uff1a\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"li"},"SQL")," \u811a\u672c\u7684\u65b9\u5f0f\u6267\u884c ",(0,i.kt)("inlineCode",{parentName:"li"},"ElasticSearch")," \u5f15\u64ce\u8fde\u63a5\u5668\u4efb\u52a1"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"esjson"),"\uff1a\u901a\u8fc7 ",(0,i.kt)("inlineCode",{parentName:"li"},"JSON")," \u811a\u672c\u7684\u65b9\u5f0f\u6267\u884c ",(0,i.kt)("inlineCode",{parentName:"li"},"ElasticSearch")," \u5f15\u64ce\u8fde\u63a5\u5668\u4efb\u52a1")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"essql")," \u65b9\u5f0f\u793a\u4f8b")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"\u6ce8\u610f\uff1a")," \u4f7f\u7528\u8fd9\u79cd\u5f62\u5f0f\uff0c ",(0,i.kt)("inlineCode",{parentName:"p"},"ElasticSearch")," \u670d\u52a1\u5fc5\u987b\u5b89\u88c5SQL\u63d2\u4ef6\uff0c\u5b89\u88c5\u65b9\u5f0f\u53c2\u8003\uff1a",(0,i.kt)("a",{parentName:"p",href:"https://github.com/NLPchina/elasticsearch-sql#elasticsearch-762"},"https://github.com/NLPchina/elasticsearch-sql#elasticsearch-762")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},' sh ./bin/linkis-cli -submitUser hadoop \\\n -engineType elasticsearch-7.6.2 -codeType essql \\\n -code \'{"sql": "select * from kibana_sample_data_ecommerce limit 10\' \\\n -runtimeMap linkis.es.http.method=GET \\\n -runtimeMap linkis.es.http.endpoint=/_sql \\\n -runtimeMap linkis.es.datasource=hadoop  \\\n -runtimeMap linkis.es.cluster=127.0.0.1:9200\n')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"esjson")," \u65b9\u5f0f\u793a\u4f8b")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'sh ./bin/linkis-cli -submitUser hadoop \\\n-engineType elasticsearch-7.6.2 -codeType esjson \\\n-code \'{"query": {"match": {"order_id": "584677"}}}\' \\\n-runtimeMap linkis.es.http.method=GET \\\n-runtimeMap linkis.es.http.endpoint=/kibana_sample_data_ecommerce/_search \\\n-runtimeMap linkis.es.datasource=hadoop  \\\n-runtimeMap linkis.es.cluster=127.0.0.1:9200\n')),(0,i.kt)("p",null,"\u66f4\u591a ",(0,i.kt)("inlineCode",{parentName:"p"},"Linkis-Cli")," \u547d\u4ee4\u53c2\u6570\u53c2\u8003\uff1a ",(0,i.kt)("a",{parentName:"p",href:"/zh-CN/docs/1.5.0/user-guide/linkiscli-manual"},"Linkis-Cli \u4f7f\u7528")),(0,i.kt)("h2",{id:"4-\u5f15\u64ce\u8fde\u63a5\u5668\u914d\u7f6e\u8bf4\u660e"},"4. \u5f15\u64ce\u8fde\u63a5\u5668\u914d\u7f6e\u8bf4\u660e"),(0,i.kt)("h3",{id:"41-\u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e"},"4.1 \u9ed8\u8ba4\u914d\u7f6e\u8bf4\u660e"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"\u914d\u7f6e"),(0,i.kt)("th",{parentName:"tr",align:null},"\u9ed8\u8ba4\u503c"),(0,i.kt)("th",{parentName:"tr",align:null},"\u662f\u5426\u5fc5\u987b"),(0,i.kt)("th",{parentName:"tr",align:null},"\u8bf4\u660e"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.cluster"),(0,i.kt)("td",{parentName:"tr",align:null},"127.0.0.1:9200"),(0,i.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,i.kt)("td",{parentName:"tr",align:null},"ElasticSearch \u96c6\u7fa4\uff0c\u591a\u4e2a\u8282\u70b9\u4f7f\u7528\u9017\u53f7\u5206\u9694")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.datasource"),(0,i.kt)("td",{parentName:"tr",align:null},"hadoop"),(0,i.kt)("td",{parentName:"tr",align:null},"\u662f"),(0,i.kt)("td",{parentName:"tr",align:null},"ElasticSearch datasource")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.username"),(0,i.kt)("td",{parentName:"tr",align:null},"\u65e0"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"ElasticSearch \u96c6\u7fa4\u7528\u6237\u540d")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.password"),(0,i.kt)("td",{parentName:"tr",align:null},"\u65e0"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"ElasticSearch \u96c6\u7fa4\u5bc6\u7801")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.auth.cache"),(0,i.kt)("td",{parentName:"tr",align:null},"false"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5ba2\u6237\u7aef\u662f\u5426\u7f13\u5b58\u8ba4\u8bc1")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.sniffer.enable"),(0,i.kt)("td",{parentName:"tr",align:null},"false"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5ba2\u6237\u7aef\u662f\u5426\u5f00\u542f sniffer")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.http.method"),(0,i.kt)("td",{parentName:"tr",align:null},"GET"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"\u8c03\u7528\u65b9\u5f0f")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.http.endpoint"),(0,i.kt)("td",{parentName:"tr",align:null},"/_search"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"JSON \u811a\u672c\u8c03\u7528\u7684 Endpoint")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.sql.endpoint"),(0,i.kt)("td",{parentName:"tr",align:null},"/_sql"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"SQL \u811a\u672c\u8c03\u7528\u7684 Endpoint")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.sql.format"),(0,i.kt)("td",{parentName:"tr",align:null},'{"query":"%s"}'),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"SQL \u811a\u672c\u8c03\u7528\u7684\u6a21\u677f\uff0c%s \u66ff\u6362\u6210 SQL \u4f5c\u4e3a\u8bf7\u6c42\u4f53\u8bf7\u6c42Es \u96c6\u7fa4")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.es.headers.*"),(0,i.kt)("td",{parentName:"tr",align:null},"\u65e0"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5ba2\u6237\u7aef Headers \u914d\u7f6e")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"linkis.engineconn.concurrent.limit"),(0,i.kt)("td",{parentName:"tr",align:null},"100"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5426"),(0,i.kt)("td",{parentName:"tr",align:null},"\u5f15\u64ce\u8fde\u63a5\u5668\u6700\u5927\u5e76\u53d1")))),(0,i.kt)("h3",{id:"42-\u914d\u7f6e\u4fee\u6539"},"4.2 \u914d\u7f6e\u4fee\u6539"),(0,i.kt)("p",null,"\u5982\u679c\u9ed8\u8ba4\u53c2\u6570\u4e0d\u6ee1\u8db3\u65f6\uff0c\u6709\u5982\u4e0b\u51e0\u4e2d\u65b9\u5f0f\u53ef\u4ee5\u8fdb\u884c\u4e00\u4e9b\u57fa\u7840\u53c2\u6570\u914d\u7f6e"),(0,i.kt)("h4",{id:"421-\u7ba1\u7406\u53f0\u914d\u7f6e"},"4.2.1 \u7ba1\u7406\u53f0\u914d\u7f6e"),(0,i.kt)("p",null,(0,i.kt)("img",{src:t(35743).Z,width:"1886",height:"819"})),(0,i.kt)("p",null,"\u6ce8\u610f: \u4fee\u6539 ",(0,i.kt)("inlineCode",{parentName:"p"},"IDE")," \u6807\u7b7e\u4e0b\u7684\u914d\u7f6e\u540e\u9700\u8981\u6307\u5b9a ",(0,i.kt)("inlineCode",{parentName:"p"},"-creator IDE")," \u624d\u4f1a\u751f\u6548\uff08\u5176\u5b83\u6807\u7b7e\u7c7b\u4f3c\uff09\uff0c\u5982\uff1a"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'sh ./bin/linkis-cli -creator IDE -submitUser hadoop \\\n-engineType elasticsearch-7.6.2 -codeType esjson \\\n-code \'{"query": {"match": {"order_id": "584677"}}}\' \\\n-runtimeMap linkis.es.http.method=GET \\\n-runtimeMap linkis.es.http.endpoint=/kibana_sample_data_ecommerce/_search \n')),(0,i.kt)("h4",{id:"422-\u4efb\u52a1\u63a5\u53e3\u914d\u7f6e"},"4.2.2 \u4efb\u52a1\u63a5\u53e3\u914d\u7f6e"),(0,i.kt)("p",null,"\u63d0\u4ea4\u4efb\u52a1\u63a5\u53e3\uff0c\u901a\u8fc7\u53c2\u6570 ",(0,i.kt)("inlineCode",{parentName:"p"},"params.configuration.runtime")," \u8fdb\u884c\u914d\u7f6e"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-shell"},'http \u8bf7\u6c42\u53c2\u6570\u793a\u4f8b \n{\n    "executionContent": {"code": "select * from kibana_sample_data_ecommerce limit 10;", "runType":  "essql"},\n    "params": {\n                    "variable": {},\n                    "configuration": {\n                            "runtime": {\n                                "linkis.es.cluster":"http://127.0.0.1:9200",\n                                "linkis.es.datasource":"hadoop",\n                                "linkis.es.username":"",\n                                "linkis.es.password":""\n                                }\n                            }\n                    },\n    "labels": {\n        "engineType": "elasticsearch-7.6.2",\n        "userCreator": "hadoop-IDE"\n    }\n}\n')),(0,i.kt)("h4",{id:"423-\u6587\u4ef6\u914d\u7f6e"},"4.2.3 \u6587\u4ef6\u914d\u7f6e"),(0,i.kt)("p",null,"\u901a\u8fc7\u4fee\u6539\u76ee\u5f55 ",(0,i.kt)("inlineCode",{parentName:"p"},"${LINKIS_HOME}/lib/linkis-engineconn-plugins/elasticsearch/dist/7.6.2/conf/")," \u4e2d\u7684 ",(0,i.kt)("inlineCode",{parentName:"p"},"linkis-engineconn.properties")," \u6587\u4ef6\u8fdb\u884c\u914d\u7f6e\uff0c\u5982\u4e0b\u56fe\uff1a"),(0,i.kt)("p",null,(0,i.kt)("img",{src:t(24156).Z,width:"958",height:"369"})),(0,i.kt)("h3",{id:"43-\u5f15\u64ce\u8fde\u63a5\u5668\u76f8\u5173\u6570\u636e\u8868"},"4.3 \u5f15\u64ce\u8fde\u63a5\u5668\u76f8\u5173\u6570\u636e\u8868"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Linkis")," \u662f\u901a\u8fc7\u5f15\u64ce\u8fde\u63a5\u5668\u6807\u7b7e\u6765\u8fdb\u884c\u7ba1\u7406\u7684\uff0c\u6240\u6d89\u53ca\u7684\u6570\u636e\u8868\u4fe1\u606f\u5982\u4e0b\u6240\u793a\u3002"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"linkis_ps_configuration_config_key:  \u63d2\u5165\u5f15\u64ce\u8fde\u63a5\u5668\u7684\u914d\u7f6e\u53c2\u6570\u7684key\u548c\u9ed8\u8ba4values\nlinkis_cg_manager_label\uff1a\u63d2\u5165\u5f15\u64ce\u8fde\u63a5\u5668label\u5982\uff1aelasticsearch-7.6.2\nlinkis_ps_configuration_category\uff1a \u63d2\u5165\u5f15\u64ce\u8fde\u63a5\u5668\u7684\u76ee\u5f55\u5173\u8054\u5173\u7cfb\nlinkis_ps_configuration_config_value\uff1a \u63d2\u5165\u5f15\u64ce\u8fde\u63a5\u5668\u9700\u8981\u5c55\u793a\u7684\u914d\u7f6e\nlinkis_ps_configuration_key_engine_relation:\u914d\u7f6e\u9879\u548c\u5f15\u64ce\u8fde\u63a5\u5668\u7684\u5173\u8054\u5173\u7cfb\n")),(0,i.kt)("p",null,"\u8868\u4e2d\u4e0e\u5f15\u64ce\u8fde\u63a5\u5668\u76f8\u5173\u7684\u521d\u59cb\u6570\u636e\u5982\u4e0b"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sql"},"-- set variable\nSET @ENGINE_LABEL=\"elasticsearch-7.6.2\";\nSET @ENGINE_ALL=CONCAT('*-*,',@ENGINE_LABEL);\nSET @ENGINE_IDE=CONCAT('*-IDE,',@ENGINE_LABEL);\nSET @ENGINE_NAME=\"elasticsearch\";\n\n-- engine label\ninsert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @ENGINE_ALL, 'OPTIONAL', 2, now(), now());\ninsert into `linkis_cg_manager_label` (`label_key`, `label_value`, `label_feature`, `label_value_size`, `update_time`, `create_time`) VALUES ('combined_userCreator_engineType', @ENGINE_IDE, 'OPTIONAL', 2, now(), now());\n\nselect @label_id := id from `linkis_cg_manager_label` where label_value = @ENGINE_IDE;\ninsert into `linkis_ps_configuration_category` (`label_id`, `level`) VALUES (@label_id, 2);\n\n-- configuration key\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.cluster', '\u4f8b\u5982:http://127.0.0.1:9200', '\u8fde\u63a5\u5730\u5740', 'http://127.0.0.1:9200', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.datasource', '\u8fde\u63a5\u522b\u540d', '\u8fde\u63a5\u522b\u540d', 'hadoop', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.username', 'username', 'ES\u96c6\u7fa4\u7528\u6237\u540d', '\u65e0', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.password', 'password', 'ES\u96c6\u7fa4\u5bc6\u7801', '\u65e0', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.auth.cache', '\u5ba2\u6237\u7aef\u662f\u5426\u7f13\u5b58\u8ba4\u8bc1', '\u5ba2\u6237\u7aef\u662f\u5426\u7f13\u5b58\u8ba4\u8bc1', 'false', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.sniffer.enable', '\u5ba2\u6237\u7aef\u662f\u5426\u5f00\u542f sniffer', '\u5ba2\u6237\u7aef\u662f\u5426\u5f00\u542f sniffer', 'false', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.http.method', '\u8c03\u7528\u65b9\u5f0f', 'HTTP\u8bf7\u6c42\u65b9\u5f0f', 'GET', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.http.endpoint', '/_search', 'JSON \u811a\u672c\u8c03\u7528\u7684 Endpoint', '/_search', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.sql.endpoint', '/_sql', 'SQL \u811a\u672c\u8c03\u7528\u7684 Endpoint', '/_sql', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.sql.format', 'SQL \u811a\u672c\u8c03\u7528\u7684\u6a21\u677f\uff0c%s \u66ff\u6362\u6210 SQL \u4f5c\u4e3a\u8bf7\u6c42\u4f53\u8bf7\u6c42Es \u96c6\u7fa4', '\u8bf7\u6c42\u4f53', '{\"query\":\"%s\"}', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.es.headers.*', '\u5ba2\u6237\u7aef Headers \u914d\u7f6e', '\u5ba2\u6237\u7aef Headers \u914d\u7f6e', '\u65e0', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\nINSERT INTO `linkis_ps_configuration_config_key` (`key`, `description`, `name`, `default_value`, `validate_type`, `validate_range`, `engine_conn_type`, `is_hidden`, `is_advanced`, `level`, `treeName`) VALUES ('linkis.engineconn.concurrent.limit', '\u5f15\u64ce\u8fde\u63a5\u5668\u6700\u5927\u5e76\u53d1', '\u5f15\u64ce\u8fde\u63a5\u5668\u6700\u5927\u5e76\u53d1', '100', 'None', '', @ENGINE_NAME, 0, 0, 1, '\u6570\u636e\u6e90\u914d\u7f6e');\n\n-- key engine relation\ninsert into `linkis_ps_configuration_key_engine_relation` (`config_key_id`, `engine_type_label_id`)\n(select config.id as config_key_id, label.id AS engine_type_label_id FROM `linkis_ps_configuration_config_key` config\nINNER JOIN `linkis_cg_manager_label` label ON config.engine_conn_type = @ENGINE_NAME and label_value = @ENGINE_ALL);\n\n-- engine default configuration\ninsert into `linkis_ps_configuration_config_value` (`config_key_id`, `config_value`, `config_label_id`)\n(select relation.config_key_id AS config_key_id, '' AS config_value, relation.engine_type_label_id AS config_label_id FROM `linkis_ps_configuration_key_engine_relation` relation\nINNER JOIN `linkis_cg_manager_label` label ON relation.engine_type_label_id = label.id AND label.label_value = @ENGINE_ALL);\n\n")))}u.isMDXComponent=!0},24156:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/es-config-c33911e8a31efd6d8e139251fa3ce2eb.png"},35743:(e,n,t)=>{t.d(n,{Z:()=>a});const a=t.p+"assets/images/es-manage-4e7f9f69cc0e74d647734fe3e111caa9.png"}}]);