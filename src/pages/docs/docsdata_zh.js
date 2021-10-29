const data = {
    info: {},
    list: [
        {
            title: 'Apache Linkis 介绍',
            link: '/docs/introduction/index',
        },
        {
            title: '部署文档',
            link: '/docs/deploy/linkis',
            children: [{
                title: '快速部署Linkis1.0',
                link: '/docs/deploy/linkis',
            }, {
                title: '安装EngineConnPlugin引擎插件',
                link: '/docs/deploy/engins',
            }, {
                title: '分布式部署手册',
                link: '/docs/deploy/distributed',
            }, {
                title: '安装包目录层级结构',
                link: '/docs/deploy/structure',
            }]
        },
        {
            title: '用户手册',
            link: '/docs/manual/index',
            children: [
                {
                    title: '用户使用文档',
                    link: '/docs/manual/user',
                }, {
                    title: '使用的几种方式',
                    link: '/docs/manual/how_to_use',
                }, {
                    title: '管理台使用文档',
                    link: '/docs/manual/console',
                }, {
                    title: 'Linkis-Cli使用文档',
                    link: '/docs/manual/linkis_cli',
                }]


        },
        {
            title: '引擎使用',
            link: '/docs/engine/index',
            children: [
                {
                    title: 'Spark引擎',
                    link: '/docs/engine/spark',
                },
                {
                    title: 'Hive引擎',
                    link: '/docs/engine/hive',
                },
                // {
                //     title: 'Presto Engine',
                //     link: '/docs/engine/presto',
                // },
                // {
                //     title: 'ElasticSearch Engine',
                //     link: '/docs/engine/elastic_search',
                // },
                {
                    title: 'Python引擎',
                    link: '/docs/engine/python',
                }, {
                    title: 'Shell引擎',
                    link: '/docs/engine/shell',
                },
                {
                    title: 'JDBC引擎',
                    link: '/docs/engine/jdbc',
                },
                // {
                //     title: 'MLSQL引擎',
                //     link: '/docs/engine/mysql',
                // },
                {
                    title: '实现一个全新引擎',
                    link: '/docs/engine/add_engine',
                }]
        },
        {
            title:"调优排障",
            link: '/docs/tuning/index',
            children: [
                // {
                //     title: '常见问题',
                //     link: '/docs/tuning/question',
                // },
                {
                    title: '参数列表',
                    link: '/docs/tuning/configuration',
                }, {
                    title: '调优手册',
                    link: '/docs/tuning/tuning',
                }]
        },
        {
            title: '架构设计',
            link: '/docs/architecture/index',
            children: [
                {
                    title: 'Job提交准备执行流程',
                    link: '/docs/architecture/job_submission',
                },
                {
                    title: 'EngineConn启动全流程',
                    link: '/docs/architecture/engine_start_process',
                },
                {
                    title: 'Linkis1.0与Linkis0.X的区别简述',
                    link: '/docs/architecture/difference',
                },
                {
                    title: '计算治理服务架构设计',
                    link: '/docs/architecture/computation_governance',
                },
                {
                    title: 'Manager架构设计',
                    link: '/docs/architecture/manager',
                },
                {
                    title: 'AppManager架构设计',
                    link: '/docs/architecture/app_manager',
                },
                {
                    title: 'ResourceManager架构设计',
                    link: '/docs/architecture/resource_manager',
                },
                {
                    title: 'LabelManager架构设计',
                    link: '/docs/architecture/label_manager',
                },
                {
                    title: 'EngineConnManager架构设计',
                    link: '/docs/architecture/engineconn_manager',
                },
                {
                    title: 'EngineConn架构设计',
                    link: '/docs/architecture/engineconn',
                },
                {
                    title: 'EngineConnPlugin架构设计',
                    link: '/docs/architecture/engineconn_plugin',
                },

                {
                    title: '公共增强服务架构设计',
                    link: '/docs/architecture/public_enhancement',
                },
                // {
                //     title: 'DataSource(统一数据源)架构设计',
                //     link: '/docs/architecture/datasource',
                // },
                {
                    title: 'ContextService(上下文)架构设计',
                    link: '/docs/architecture/context_service',
                },
                {
                    title: 'BML(物料库)架构设计',
                    link: '/docs/architecture/bml',
                },
                {
                    title: 'PublicService(公共服务)架构设计',
                    link: '/docs/architecture/public_service',
                },
                {
                    title: '微服务治理服务架构设计',
                    link: '/docs/architecture/microservice_governance',
                },
                {
                    title: 'GateWay(网关)架构设计文档',
                    link: '/docs/architecture/gateway',
                },
            ]
        }
    ]
}

export default data
