"use strict";(self.webpackChunklinkis_web_apache=self.webpackChunklinkis_web_apache||[]).push([[41331],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>k});var i=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},s=Object.keys(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(i=0;i<s.length;i++)n=s[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=i.createContext({}),p=function(e){var t=i.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=p(e.components);return i.createElement(o.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},u=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,d=a(e,["components","mdxType","originalType","parentName"]),u=p(n),k=r,h=u["".concat(o,".").concat(k)]||u[k]||c[k]||s;return n?i.createElement(h,l(l({ref:t},d),{},{components:n})):i.createElement(h,l({ref:t},d))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,l=new Array(s);l[0]=u;var a={};for(var o in t)hasOwnProperty.call(t,o)&&(a[o]=t[o]);a.originalType=e,a.mdxType="string"==typeof e?e:r,l[1]=a;for(var p=2;p<s;p++)l[p]=n[p];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}u.displayName="MDXCreateElement"},75553:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>o});var i=n(87462),r=(n(67294),n(3905));const s={title:"Kubernetes Deployment",sidebar_position:2},l=void 0,a={unversionedId:"quick/deploy-to-kubernetes",id:"quick/deploy-to-kubernetes",isDocsHomePage:!1,title:"Kubernetes Deployment",description:"This article describes how to deploy a Linkis service in a Kind Kubernetes environment for easier learning and debugging.",source:"@site/docs/quick/deploy-to-kubernetes.md",sourceDirName:"quick",slug:"/quick/deploy-to-kubernetes",permalink:"/docs/1.3.1/quick/deploy-to-kubernetes",editUrl:"https://github.com/apache/incubator-linkis-website/edit/dev/docs/quick/deploy-to-kubernetes.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{title:"Kubernetes Deployment",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Sandbox",permalink:"/docs/1.3.1/quick/live-demo"},next:{title:"Deploy without HDFS",permalink:"/docs/1.3.1/quick/deploy-without-hdfs"}},o=[{value:"1. Dependencies and versions",id:"1-dependencies-and-versions",children:[{value:"Versions",id:"versions",children:[]},{value:"Notice",id:"notice",children:[]}]},{value:"2.Install the docker",id:"2install-the-docker",children:[{value:"2.1 Install the tutorial",id:"21-install-the-tutorial",children:[]}]},{value:"3. Install the kind",id:"3-install-the-kind",children:[{value:"Step1 Manually download the kind binary",id:"step1-manually-download-the-kind-binary",children:[]},{value:"Step2 Install kind Binary",id:"step2-install-kind-binary",children:[]}]},{value:"4. Install linkis",id:"4-install-linkis",children:[{value:"Step1 Download linkis1.3.1 deployment package",id:"step1-download-linkis131-deployment-package",children:[]},{value:"Step2 Build directory",id:"step2-build-directory",children:[]},{value:"Step3 Copy driver to /opt/data/common/extendlib",id:"step3-copy-driver-to-optdatacommonextendlib",children:[]},{value:"Step3 Reset kind (not necessary)",id:"step3-reset-kind-not-necessary",children:[]},{value:"Step5 Pull the image",id:"step5-pull-the-image",children:[]},{value:"Step6 Install linkis to kind",id:"step6-install-linkis-to-kind",children:[]},{value:"Step7 Run commands to view services and wait until all services are successfully started",id:"step7-run-commands-to-view-services-and-wait-until-all-services-are-successfully-started",children:[]},{value:"Step8 Copy the ldh environment to linkis",id:"step8-copy-the-ldh-environment-to-linkis",children:[]},{value:"Step9 Enabling Port Mapping",id:"step9-enabling-port-mapping",children:[]},{value:"Step10 Access to the system",id:"step10-access-to-the-system",children:[]},{value:"Step11 use linkis-cli executes the task",id:"step11-use-linkis-cli-executes-the-task",children:[]}]}],p={toc:o};function d(e){let{components:t,...s}=e;return(0,r.kt)("wrapper",(0,i.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This article describes how to deploy a Linkis service in a Kind Kubernetes environment for easier learning and debugging."),(0,r.kt)("h2",{id:"1-dependencies-and-versions"},"1. Dependencies and versions"),(0,r.kt)("p",null,"kind github\uff1a",(0,r.kt)("a",{parentName:"p",href:"https://github.com/kubernetes-sigs/kind"},"https://github.com/kubernetes-sigs/kind"),(0,r.kt)("br",{parentName:"p"}),"\n","kind web site\uff1a",(0,r.kt)("a",{parentName:"p",href:"https://kind.sigs.k8s.io/"},"kind.sigs.k8s.io/")),(0,r.kt)("h3",{id:"versions"},"Versions"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"kind 0.14.0  "),(0,r.kt)("li",{parentName:"ul"},"docker 20.10.17  "),(0,r.kt)("li",{parentName:"ul"},"centos 7.6  "),(0,r.kt)("li",{parentName:"ul"},"helm 3.x  ")),(0,r.kt)("h3",{id:"notice"},"Notice"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("ol",{parentName:"li"},(0,r.kt)("li",{parentName:"ol"},"Ensure that the component depends on the version  "))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("ol",{parentName:"li",start:2},(0,r.kt)("li",{parentName:"ol"},"kind means that the machine simulating node with docker container is restarted and the container has changed and the scheduler is not working anymore. This is a kind limitation and there is a detailed explanation in the official document.")))),(0,r.kt)("h2",{id:"2install-the-docker"},"2.Install the docker"),(0,r.kt)("h3",{id:"21-install-the-tutorial"},"2.1 Install the tutorial"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"sudo yum install -y yum-utils device-mapper-persistent-data lvm2\nsudo yum -y install docker-ce\nsystemctl start docker\nsystemctl enable docker\n")),(0,r.kt)("h2",{id:"3-install-the-kind"},"3. Install the kind"),(0,r.kt)("h3",{id:"step1-manually-download-the-kind-binary"},"Step1 Manually download the kind binary"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"https://github.com/kubernetes-sigs/kind/releases\n")),(0,r.kt)("h3",{id:"step2-install-kind-binary"},"Step2 Install kind Binary"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"chmod +x ./kind\nmv kind-linux-amd64 /usr/bin/kind\n")),(0,r.kt)("h2",{id:"4-install-linkis"},"4. Install linkis"),(0,r.kt)("h3",{id:"step1-download-linkis131-deployment-package"},"Step1 Download linkis1.3.1 deployment package"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"apache-linkis-1.3.1-incubating-bin.tar.gz\n")),(0,r.kt)("h3",{id:"step2-build-directory"},"Step2 Build directory"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"mkdir -p /opt/data/common/extendlib\n")),(0,r.kt)("h3",{id:"step3-copy-driver-to-optdatacommonextendlib"},"Step3 Copy driver to /opt/data/common/extendlib"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"curl https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar -o /opt/data/common/extendlib/[mysql-connector-java-8.0.28.jar](https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.28/mysql-connector-java-8.0.28.jar)\n")),(0,r.kt)("h3",{id:"step3-reset-kind-not-necessary"},"Step3 Reset kind (not necessary)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./bin/install-linkis-to-kubernetes.sh reset\n")),(0,r.kt)("h3",{id:"step5-pull-the-image"},"Step5 Pull the image"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./bin/install-linkis-to-kubernetes.sh pull -mghcr.dockerproxy.com\n")),(0,r.kt)("h3",{id:"step6-install-linkis-to-kind"},"Step6 Install linkis to kind"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./bin/install-linkis-to-kubernetes.sh install -l -mghcr.dockerproxy.com\n")),(0,r.kt)("h3",{id:"step7-run-commands-to-view-services-and-wait-until-all-services-are-successfully-started"},"Step7 Run commands to view services and wait until all services are successfully started"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"kubectl get pods -A\n")),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(37840).Z})),(0,r.kt)("h3",{id:"step8-copy-the-ldh-environment-to-linkis"},"Step8 Copy the ldh environment to linkis"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./helm/scripts/prepare-for-spark.sh\n")),(0,r.kt)("h3",{id:"step9-enabling-port-mapping"},"Step9 Enabling Port Mapping"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"./helm/scripts/remote-proxy.sh start\n")),(0,r.kt)("h3",{id:"step10-access-to-the-system"},"Step10 Access to the system"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"linkis-web: http://10.0.2.102:8088/#/login\nusername:hadoop\nGet the password command\uff1a\nkubectl describe cm linkis-demo-linkis-config -n linkis |grep wds.linkis.admin.password\npassword:4f90c1b13\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"eureka: http://10.0.2.101:20303/\n")),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(15743).Z})),(0,r.kt)("h3",{id:"step11-use-linkis-cli-executes-the-task"},"Step11 use linkis-cli executes the task"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'Enter the container\n./helm/scripts/login-pod.sh cg-engineconnmanager\nExecuting shell tests\nsh ./bin/linkis-cli -engineType shell-1 -codeType shell -code "echo "hello" "  -submitUser hadoop -proxyUser hadoop\nExecuting hive Tests\nsh ./bin/linkis-cli -engineType hive-2.3.3 -codeType hql -code "show tables"  -submitUser hadoop -proxyUser hadoop\nExecuting spark Tests\nsh ./bin/linkis-cli -engineType spark-2.4.3 -codeType sql -code "show tables"  -submitUser hadoop -proxyUser hadoop\nExecuting python Tests\nsh ./bin/linkis-cli -engineType python-python2 -codeType python -code "print(\\"hello\\")"  -submitUser hadoop -proxyUser hadoop  -confMap  python.version=python\n')),(0,r.kt)("p",null,(0,r.kt)("img",{src:n(99359).Z})))}d.isMDXComponent=!0},15743:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/eureka-200241584d49a88314554cda60f2e239.png"},99359:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/linkis-37fe8c9f4209ea07542c9ab7e1a89f7a.jpg"},37840:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/pods-df2553c9e0c1a61bb73bd5f17033e63e.jpg"}}]);