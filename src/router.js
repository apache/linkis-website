const routes = [{
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "group-home" */ './pages/home.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import( /* webpackChunkName: "group-docs" */ './pages/docs/index.vue'),
    children: [{
      path: 'deploy',
      name: 'docDeploy',
      component: () => import( /* webpackChunkName: "group-doc_linkis" */ './pages/docs/deploy/main.vue')
    },{
      path: 'deploy/linkis',
      name: 'docDeployLinkis',
      component: () => import( /* webpackChunkName: "group-doc_linkis" */ './pages/docs/deploy/linkis.vue')
    },{
      path: 'deploy/engins',
      name: 'docDeployEngins',
      component: () => import( /* webpackChunkName: "group-doc_engins" */ './pages/docs/deploy/engins.vue')
    },{
      path: 'deploy/distributed',
      name: 'docDeployDistributed',
      component: () => import( /* webpackChunkName: "group-doc_distributed" */ './pages/docs/deploy/distributed.vue')
    },{
      path: 'deploy/structure',
      name: 'docDeployStructure',
      component: () => import( /* webpackChunkName: "group-doc_structure" */ './pages/docs/deploy/structure.vue')
    },
    {
      path: 'manual/UserManual',
      name: 'manualUserManual',
      component: () => import( /* webpackChunkName: "group-doc_UserManual" */ './pages/docs/manual/UserManual.vue')
    },{
      path: 'manual/HowToUse',
      name: 'manual/HowToUse',
      component: () => import( /* webpackChunkName: "group-doc_HowToUse" */ './pages/docs/manual/HowToUse.vue')
    },{
      path: 'manual/ConsoleUserManual',
      name: 'manualConsoleUserManual',
      component: () => import( /* webpackChunkName: "group-doc_ConsoleUserManual" */ './pages/docs/manual/ConsoleUserManual.vue')
    },{
        path: 'manual/CliManual',
        name: 'manualCliManual',
        component: () => import( /* webpackChunkName: "group-doc_CliManual" */ './pages/docs/manual/CliManual.vue')
      }]
  },
  {
    path: '/faq/index',
    name: 'faq',
    component: () => import( /* webpackChunkName: "group-faq" */ './pages/faq/index.vue')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import( /* webpackChunkName: "group-download" */ './pages/download.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import( /* webpackChunkName: "group-blog" */ './pages/blog.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import( /* webpackChunkName: "group-team" */ './pages/team.vue')
  },
]

export default routes;
