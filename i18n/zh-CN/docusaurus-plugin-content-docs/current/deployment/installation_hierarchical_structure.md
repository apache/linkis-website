安装目录结构
============

Linkis1.0的目录结构与0.X版本相差巨大，0.X的每个微服务都时独立存在的一个根目录，这种目录结构带来的主要的好处是易于区分微服务，便于单个的微服务进行管理，但也存在着一些很明显的问题：

1.  微服务目录过于繁杂，切换目录管理不够方便

2.  没有统一的启动脚本，导致微服务启停比较麻烦

3.  存在大量重复的服务配置，同一个配置经常需要修改多处

4.  存在大量重复的Lib依赖，增大了安装包的体积和依赖冲突的风险

因此Linkis1.0中，我们对安装目录结构做了极大程度的优化和调整，减少了微服务目录的数量，降低了重复依赖的jar包，尽可能复用了配置文件和微服务管理脚本，主要体现在以下几个方面：

一、  不再为每个微服务提供bin文件夹，修改为所有微服务共用。

>   Bin文件夹修改为安装目录，主要用于安装Linkis1.0和检查环境状态，新增sbin目录，为Linkis提供一键启停，依靠变更参数的方式为所有微服务提供单独启停。

二、  不再为每个微服务单独提供conf目录，修改为所有微服务共用。

>   Conf文件夹包含两个方面的内容，一方面是所有微服务共用的配置信息，这类配置信息里面包含了用户根据自身环境自定义配置的信息；另一方面是各个微服务的各自的特殊配置，一般情况下用户不需要自行更改。

三、  不再为每个微服务提供lib文件夹，修改为所有微服务共用

>   Lib文件夹中同样包含了两个方面的内容，一方面是所有微服务都需要的公共依赖；另一方面是各个微服务各自需要的特殊依赖。

四、  不再为每个微服务提供log目录，修改为所有微服务共用

>   Log目录中包含了所有微服务的日志文件。

Linkis1.0简化后的目录结构如下，其中加深标注的文件，为用户安装使用时必定会使用的目录项，其他目录项初次使用无特殊情况无需关心：

├── bin 安装目录  
│   ├── checkEnv.sh ── 环境变量检测  
│   ├── checkServices.sh ── 微服务状态检测  
│   ├── common.sh ── 部分公共shell函数  
│   ├── install-io.sh ── 用于安装时的依赖替换  
│   └── **install.sh** ── **Linkis安装的主脚本**  
├── conf 配置目录  
│   ├── application-eureka.yml  
│   ├── application-linkis.yml    ──微服务通用yml   
│   ├── linkis-cg-engineconnmanager-io.properties        
│   ├── linkis-cg-engineconnmanager.properties    
│   ├── linkis-cg-engineplugin.properties          
│   ├── linkis-cg-entrance.properties                   
│   ├── linkis-cg-linkismanager.properties                         
│   ├── linkis-computation-governance                           
│   │   └── linkis-client                                                   
│   │       └── linkis-cli                                                   
│   │           ├── linkis-cli.properties                                                      
│   │           └── log4j2.xml                                                    
│   ├── linkis-env.sh   ──linkis environment properties                                            
│   ├── linkis-et-validator.properties                                            
│   ├── linkis-mg-gateway.properties                                            
│   ├── linkis.properties  ──linkis global properties                                            
│   ├── linkis-ps-bml.properties                                            
│   ├── linkis-ps-cs.properties                                            
│   ├── linkis-ps-datasource.properties                                            
│   ├── linkis-ps-publicservice.properties                                            
│   ├── log4j2.xml                                                                                        
│   ├── proxy.properties(可选)                                                                                      
│   └── token.properties(可选)                                                                                       
├── db 数据库DML和DDL文件目录                                                                                        
│   ├── linkis\_ddl.sql ──数据库表定义SQL                                                                                        
│   ├── linkis\_dml.sql ──数据库表初始化SQL                                                                                        
│   └── module ──包含各个微服务的DML和DDL文件                                                                                        
├── lib lib目录                                                                                        
│   ├── linkis-commons ──公共依赖包                                                                                        
│   ├── linkis-computation-governance ──计算治理模块的lib目录                                                                                        
│   ├── linkis-engineconn-plugins ──所有引擎插件的lib目录                                                                                        
│   ├── linkis-public-enhancements ──公共增强服务的lib目录                                                                                        
│   └── linkis-spring-cloud-services ──SpringCloud的lib目录                                                                                        
├── logs 日志目录                                                                                        
│   ├── linkis-cg-engineconnmanager-gc.log                                                                                                                                                                            
│   ├── linkis-cg-engineconnmanager.log                                                                                                                                                                            
│   ├── linkis-cg-engineconnmanager.out                                                                                      
│   ├── linkis-cg-engineplugin-gc.log                                                                                      
│   ├── linkis-cg-engineplugin.log                                                                                      
│   ├── linkis-cg-engineplugin.out                                                                                      
│   ├── linkis-cg-entrance-gc.log                                                                                      
│   ├── linkis-cg-entrance.log                                                                                                                                                                           
│   ├── linkis-cg-entrance.out                                                                                      
│   ├── linkis-cg-linkismanager-gc.log                                                                                                                                                                            
│   ├── linkis-cg-linkismanager.log                                                                                      
│   ├── linkis-cg-linkismanager.out                                                                                      
│   ├── linkis-et-validator-gc.log                                                                                      
│   ├── linkis-et-validator.log                                                                                      
│   ├── linkis-et-validator.out                                                                                      
│   ├── linkis-mg-eureka-gc.log                                                                                      
│   ├── linkis-mg-eureka.log                                                                                      
│   ├── linkis-mg-eureka.out                                                                                      
│   ├── linkis-mg-gateway-gc.log                                                                                      
│   ├── linkis-mg-gateway.log                                                                                      
│   ├── linkis-mg-gateway.out                                                                                      
│   ├── linkis-ps-bml-gc.log                                                                                      
│   ├── linkis-ps-bml.log                                                                                      
│   ├── linkis-ps-bml.out                                                                                      
│   ├── linkis-ps-cs-gc.log                                                                                      
│   ├── linkis-ps-cs.log                                                                                      
│   ├── linkis-ps-cs.out                                                                                      
│   ├── linkis-ps-datasource-gc.log                                                                                      
│   ├── linkis-ps-datasource.log                                                                                      
│   ├── linkis-ps-datasource.out                                                                                      
│   ├── linkis-ps-publicservice-gc.log                                                                                      
│   ├── linkis-ps-publicservice.log                                                                                      
│   └── linkis-ps-publicservice.out                                                                                      
├── pid 所有微服务的进程ID  
│   ├── linkis\_cg-engineconnmanager.pid ──引擎管理器微服务  
│   ├── linkis\_cg-engineconnplugin.pid ──引擎插件微服务  
│   ├── linkis\_cg-entrance.pid ──引擎入口微服务  
│   ├── linkis\_cg-linkismanager.pid ──linkis管理器微服务  
│   ├── linkis\_mg-eureka.pid ──eureka微服务  
│   ├── linkis\_mg-gateway.pid ──gateway微服务  
│   ├── linkis\_ps-bml.pid ──物料库微服务  
│   ├── linkis\_ps-cs.pid ──上下文微服务  
│   ├── linkis\_ps-datasource.pid ──数据源微服务  
│   └── linkis\_ps-publicservice.pid ──公共微服务  
└── sbin 微服务启停脚本目录  
     ├── ext ──各个微服务的启停脚本目录  
     ├── **linkis-daemon.sh** ── **快捷启停、重启单个微服务脚本**  
 &ensp;  ├── **linkis-start-all.sh** ── **一键启动全部微服务脚本**  
 &ensp;&ensp; └── **linkis-stop-all.sh** ── **一键停止全部微服务脚本**
 
 # 配置项修改
 
 在执行完bin目录下的install.sh完成Linkis安装后，需要进行配置项修改，所有配置项位于con目录下，通常情况下需要修改db.sh、linkis.properties、linkis-env.sh三个配置文件，项目安装和配置可以参考文章《Linkis1.0安装》
 
 # 微服务启停
 
修改完配置项之后即可在sbin目录下启动微服务，所有微服务名称如下：
 
├── linkis-cg-engineconnmanager 引擎管理服务  
├── linkis-cg-engineplugin 引擎插件管理服务  
├── linkis-cg-entrance 计算治理入口服务  
├── linkis-cg-linkismanager 计算治理管理服务  
├── linkis-mg-eureka 微服务注册中心服务  
├── linkis-mg-gateway Linkis网关服务  
├── linkis-ps-bml 物料库服务  
├── linkis-ps-cs 上下文服务  
├── linkis-ps-datasource 数据源服务  
└── linkis-ps-publicservice 公共服务
 
**微服务简称**：
 
 | 简称 | 英文全称                | 中文全称   |
 |------|-------------------------|------------|
 | cg   | Computation Governance  | 计算治理   |
 | mg   | Microservice Covernance | 微服务治理 |
 | ps   | Public Enhancement Service  | 公共增强服务   |
 
 以往启停单个微服务需要进入到各个微服务的bin目录下，执行start/stop脚本，在微服务较多的情况下启停比较麻烦，增加了很多额外的切换目录操作，Linkis1.0将所有的微服务启停相关的脚本放置在了sbin目录下，只需要执行单个入口脚本即可。
 
 **在Linkis/sbin目录下**：
 
 1.  一次性启动所有微服务：
 
     sh linkis-start-all.sh
 
 2.  一次性关停所有微服务
 
     sh linkis-stop-all.sh
 
 3.  启动单个微服务（服务名需要去掉linkis前缀如：mg-eureka）
 
     sh linkis-daemon.sh start service-name
 
     例如: sh linkis-daemon.sh start mg-eureka
 
 4.  关闭单个微服务
 
     sh linkis-daemon.sh stop service-name
 
     例如: sh linkis-daemon.sh stop mg-eureka
 
 5.  重启单个微服务
 
     sh linkis-daemon.sh restart service-name
 
     例如: sh linkis-daemon.sh restart mg-eureka
 
 6.  查看单个微服务的状态
 
     sh linkis-daemon.sh status service-name
 
     例如: sh linkis-daemon.sh status mg-eureka
