const data = {
    info: {},
    list: [
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
            link: '/docs/manual/UserManual',
            children: [
                {
                    title: 'User Manual',
                    link: '/docs/manual/UserManual',
                }, {
                    title: 'How To Use',
                    link: '/docs/manual/HowToUse',
                }, {
                    title: 'Console User Manual',
                    link: '/docs/manual/ConsoleUserManual',
                }, {
                    title: 'Linkis-Cli Usage',
                    link: '/docs/manual/CliManual',
                }]


        },
        {
            title: 'Architecture',
            link: '/docs/architecture/DifferenceBetween1.0&0.x',
            children: [
                {
                    title: 'Difference Between1.0 And 0.x',
                    link: '/docs/architecture/DifferenceBetween1.0&0.x',
                },
                {
                    title: 'Job Submission Preparation',
                    link: '/docs/architecture/JobSubmission',
                }, {
                    title: 'How To Add An EngineConn',
                    link: '/docs/architecture/AddEngineConn',
                }]


        }
    ]
}

export default data
