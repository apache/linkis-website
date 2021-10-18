const data = {
    info: {},
    list: [
        {
            title: '部署文档',
            link: '/docs/deploy/linkis',
            children: [{
                title: '快速部署 Linkis1.0',
                link: '/docs/deploy/linkis',
            }, {
                title: '快速安装 EngineConnPlugin 引擎插件',
                link: '/docs/deploy/engins',
            }, {
                title: 'Linkis1.0 分布式部署手册',
                link: '/docs/deploy/distributed',
            }, {
                title: 'Linkis1.0 安装包目录层级结构详解',
                link: '/docs/deploy/structure',
            }]
        },
        {
            title: '用户手册',
            link: '/docs/manual/UserManual',
            children: [
                {
                    title: '用户使用文档',
                    link: '/docs/manual/UserManual',
                }, {
                    title: '使用的几种方式',
                    link: '/docs/manual/HowToUse',
                }, {
                    title: '管理台使用文档',
                    link: '/docs/manual/ConsoleUserManual',
                }, {
                    title: 'Linkis-Cli使用文档',
                    link: '/docs/manual/CliManual',
                }]


        },
        {
            title: '架构文档',
            link: '/docs/architecture/DifferenceBetween1.0&0.x',
            children: [
                {
                    title: 'Linkis1.0与Linkis0.X的区别简述',
                    link: '/docs/architecture/DifferenceBetween1.0&0.x',
                },
                {
                    title: 'Job提交准备执行流程',
                    link: '/docs/architecture/JobSubmission',
                }, {
                    title: 'EngineConn新增流程',
                    link: '/docs/architecture/AddEngineConn',
                }]


        }
    ]
}

export default data
