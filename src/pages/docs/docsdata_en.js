const data = {
    info: {},
    list: [
        {
            title: 'Apache Linkis Introduction',
            link: '/docs',
        },
        {
            title: 'Deployment',
            link: '/docs/deploy/linkis',
            children: [{
                title: 'Quick Deploy',
                link: '/docs/deploy/linkis',
            }, {
                title: 'EngineConnPlugin installation',
                link: '/docs/deploy/engins',
            }, {
                title: 'Cluster Deployment',
                link: '/docs/deploy/distributed',
            }, {
                title: 'Installation Hierarchical Structure',
                link: '/docs/deploy/structure',
            }]
        },
        {
            title: 'User Manual',
            link: '/docs/manual/index',
            children: [
                {
                    title: 'User Manual',
                    link: '/docs/manual/user',
                }, {
                    title: 'How To Use',
                    link: '/docs/manual/how_to_use',
                }, {
                    title: 'Console User Manual',
                    link: '/docs/manual/console',
                }, {
                    title: 'Linkis-Cli Usage',
                    link: '/docs/manual/linkis_cli',
                }]


        },
        {
            title: 'Engine Usage',
            link: '/docs/engine/index',
            children: [
                {
                    title: 'Spark Engine',
                    link: '/docs/engine/spark',
                },
                {
                    title: 'Hive Engine',
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
                    title: 'Python Engine',
                    link: '/docs/engine/python',
                }, {
                    title: 'Shell Engine',
                    link: '/docs/engine/shell',
                },
                {
                    title: 'JDBC Engine',
                    link: '/docs/engine/jdbc',
                },
                // {
                //     title: 'MLSQL Engine',
                //     link: '/docs/engine/mysql',
                // },
                {
                    title: 'Add An EngineConn',
                    link: '/docs/engine/add_engine',
                }]
        },
        {
            title:"Tuning And Troubleshooting",
            link: '/docs/tuning/index',
            children: [
                // {
                //     title: 'Q&A',
                //     link: '/docs/tuning/question',
                // },
                {
                    title: 'Configuration',
                    link: '/docs/tuning/configuration',
                }, {
                    title: 'Tuning',
                    link: '/docs/tuning/tuning',
                }]
        },

        {
            title: 'Architecture',
            link: '/docs/architecture/index',
            children: [
                {
                    title: 'Job Submission',
                    link: '/docs/architecture/job_submission',
                },
                {
                    title: 'Engine Start Process',
                    link: '/docs/architecture/engine_start_process',
                },
                {
                    title: 'Difference Between1.0 And 0.x',
                    link: '/docs/architecture/difference_1.0_and_0.x',
                },
                {
                    title: 'Computation Governance',
                    link: '/docs/architecture/computation_governance',
                },
                {
                    title: 'Linkis Manager',
                    link: '/docs/architecture/manager',
                },
                {
                    title: 'AppManager',
                    link: '/docs/architecture/app_manager',
                },
                {
                    title: 'ResourceManager',
                    link: '/docs/architecture/resource_manager',
                },
                {
                    title: 'LabelManager',
                    link: '/docs/architecture/label_manager',
                },
                {
                    title: 'EngineConnManager',
                    link: '/docs/architecture/engineconn_manager',
                },
                {
                    title: 'EngineConn',
                    link: '/docs/architecture/engineconn',
                },
                {
                    title: 'EngineConnPlugin',
                    link: '/docs/architecture/engineconn_plugin',
                },

                {
                    title: 'Public Enhancement Services',
                    link: '/docs/architecture/public_enhancement',
                },
                // {
                //     title: 'DataSource',
                //     link: '/docs/architecture/datasource',
                // },
                {
                    title: 'ContextService',
                    link: '/docs/architecture/context_service',
                },
                {
                    title: 'BML',
                    link: '/docs/architecture/bml',
                },
                {
                    title: 'PublicService',
                    link: '/docs/architecture/public_service',
                },
                {
                    title: 'Microservice Governance',
                    link: '/docs/architecture/microservice_governance',
                },
                {
                    title: 'GateWay',
                    link: '/docs/architecture/gateway',
                },
            ]
        },

        // {
        //     title: 'Architecture',
        //     link: '/docs/architecture/DifferenceBetween1.0&0.x',
        //     children: [
        //         {
        //             title: 'Difference Between1.0 And 0.x',
        //             link: '/docs/architecture/DifferenceBetween1.0&0.x',
        //         },
        //         {
        //             title: 'Job Submission Preparation',
        //             link: '/docs/architecture/JobSubmission',
        //         }, {
        //             title: 'How To Add An EngineConn',
        //             link: '/docs/architecture/AddEngineConn',
        //         }]
        //
        //
        // }
    ]
}

export default data
