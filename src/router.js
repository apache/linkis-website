const routes = [{
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "group-home" */ './pages/home/index.vue')
  },
  {
    path: '/docs',
    component: () => import( /* webpackChunkName: "group-docs" */ './pages/docs/index.vue'),
    children: [
      {
        path: '',
        name: 'introductionIndex',
        component: () => import( /* webpackChunkName: "group-doc_index" */ './pages/docs/introduction/index.vue')
      }, {
        path: 'deploy/index',
        name: 'deployIndex',
        component: () => import( /* webpackChunkName: "group-doc_linkis" */ './pages/docs/deploy/index.vue')
      }, {
        path: 'deploy/linkis',
        name: 'deployLinkis',
        component: () => import( /* webpackChunkName: "group-doc_linkis" */ './pages/docs/deploy/linkis.vue')
      },
      {
        path: 'deploy/engins',
        name: 'deployEngins',
        component: () => import( /* webpackChunkName: "group-doc_engins" */ './pages/docs/deploy/engins.vue')
      }, {
        path: 'deploy/distributed',
        name: 'deployDistributed',
        component: () => import( /* webpackChunkName: "group-doc_distributed" */ './pages/docs/deploy/distributed.vue')
      }, {
        path: 'deploy/structure',
        name: 'deployStructure',
        component: () => import( /* webpackChunkName: "group-doc_structure" */ './pages/docs/deploy/structure.vue')
      },
      {
        path: 'manual/index',
        name: 'manualIndex',
        component: () => import( /* webpackChunkName: "group-doc_manualIndex" */ './pages/docs/manual/index.vue')
      },
      {
        path: 'manual/user',
        name: 'manualUser',
        component: () => import( /* webpackChunkName: "group-doc_manualUser" */ './pages/docs/manual/user.vue')
      }, {
        path: 'manual/how_to_use',
        name: 'manualHowToUse',
        component: () => import( /* webpackChunkName: "group-doc_manualHowToUse" */ './pages/docs/manual/how_to_use.vue')
      }, {
        path: 'manual/console',
        name: 'manualConsole',
        component: () => import( /* webpackChunkName: "group-doc_manualConsole" */ './pages/docs/manual/console.vue')
      }, {
        path: 'manual/linkis_cli',
        name: 'manualLinkisCli',
        component: () => import( /* webpackChunkName: "group-doc_manualLinkisCli" */ './pages/docs/manual/linkis_cli.vue')
      },
      {
        path: 'engine/index',
        name: 'engineIndex',
        component: () => import( /* webpackChunkName: "group-doc_engineIndex" */ './pages/docs/engine/index.vue')
      },
      {
        path: 'engine/spark',
        name: 'engineSpark',
        component: () => import( /* webpackChunkName: "group-doc_engineSpark" */ './pages/docs/engine/spark.vue')
      }, {
        path: 'engine/hive',
        name: 'doc_engineHive',
        component: () => import( /* webpackChunkName: "group-doc_engineHive" */ './pages/docs/engine/hive.vue')
      }, {
        path: 'engine/jdbc',
        name: 'engineJdbc',
        component: () => import( /* webpackChunkName: "group-doc_engineJdbc" */ './pages/docs/engine/jdbc.vue')
      }, {
        path: 'engine/python',
        name: 'enginePython',
        component: () => import( /* webpackChunkName: "group-doc_engineSpark" */ './pages/docs/engine/python.vue')
      }, {
        path: 'engine/shell',
        name: 'engineShell',
        component: () => import( /* webpackChunkName: "group-doc_engineSpark" */ './pages/docs/engine/shell.vue')
      },
      {
        path: 'engine/add_engine',
        name: 'engineAddEngine',
        component: () => import( /* webpackChunkName: "group-doc_engineSpark" */ './pages/docs/engine/add_engine.vue')
      },
      {
        path: 'tuning/index',
        name: 'tuningIndex',
        component: () => import( /* webpackChunkName: "group-doc_tuningIndex" */ './pages/docs/tuning/index.vue')
      },
      // {
      //     path: 'tuning/question',
      //     name: 'tuningQuestion',
      //     component: () => import( /* webpackChunkName: "group-doc_tuningQuestion" */ './pages/docs/tuning/question.vue')
      // },
      {
        path: 'tuning/configuration',
        name: 'tuningConfiguration',
        component: () => import( /* webpackChunkName: "group-doc_tuningConfiguration" */ './pages/docs/tuning/configuration.vue')
      },
      {
        path: 'tuning/tuning',
        name: 'tuningTuning',
        component: () => import( /* webpackChunkName: "group-doc_tuningTuning" */ './pages/docs/tuning/tuning.vue')
      },
      {
        path: 'architecture/index',
        name: 'architectureIndex',
        component: () => import( /* webpackChunkName: "group-doc_architectureIndex" */ './pages/docs/architecture/index.vue')
      },
      {
        path: 'architecture/job_submission',
        name: 'architectureJobSubmission',
        component: () => import( /* webpackChunkName: "group-doc_JobSubmission" */ './pages/docs/architecture/job_submission.vue')
      }, {
        path: 'architecture/engine_start_process',
        name: 'architectureEngineStartProcess',
        component: () => import( /* webpackChunkName: "group-doc_EngineStartProcess" */ './pages/docs/architecture/engine_start_process.vue')
      }, {
        path: 'architecture/difference',
        name: 'architectureDifference',
        component: () => import( /* webpackChunkName: "group-doc_Difference" */ './pages/docs/architecture/difference.vue')
      },
      {
        path: 'architecture/job_submission',
        name: 'architectureJobSubmission',
        component: () => import( /* webpackChunkName: "group-doc_JobSubmission" */ './pages/docs/architecture/job_submission.vue')
      }, {
        path: 'architecture/computation_governance',
        name: 'architectureComputationGovernance',
        component: () => import( /* webpackChunkName: "group-doc_ComputationGovernance" */ './pages/docs/architecture/computation_governance.vue')
      }, {
        path: 'architecture/manager',
        name: 'architectureManager',
        component: () => import( /* webpackChunkName: "group-doc_Manager" */ './pages/docs/architecture/manager.vue')
      }, {
        path: 'architecture/app_manager',
        name: 'architectureAppManager',
        component: () => import( /* webpackChunkName: "group-doc_AppManager" */ './pages/docs/architecture/app_manager.vue')
      }, {
        path: 'architecture/resource_manager',
        name: 'architectureresource_manager',
        component: () => import( /* webpackChunkName: "group-doc_resource_manager" */ './pages/docs/architecture/resource_manager.vue')
      }, {
        path: 'architecture/label_manager',
        name: 'architecturelabel_manager',
        component: () => import( /* webpackChunkName: "group-doc_label_manager" */ './pages/docs/architecture/label_manager.vue')
      },
      {
        path: 'architecture/engineconn_manager',
        name: 'architectureengineconn_manager',
        component: () => import( /* webpackChunkName: "group-doc_engineconn_manager" */ './pages/docs/architecture/engineconn_manager.vue')
      }, {
        path: 'architecture/engineconn',
        name: 'architectureengineconn',
        component: () => import( /* webpackChunkName: "group-doc_engineconn" */ './pages/docs/architecture/engineconn.vue')
      }, {
        path: 'architecture/engineconn_plugin',
        name: 'architectureengineconn_plugin',
        component: () => import( /* webpackChunkName: "group-doc_engineconn_plugin" */ './pages/docs/architecture/engineconn_plugin.vue')
      }, {
        path: 'architecture/public_enhancement',
        name: 'architecturepublic_enhancement',
        component: () => import( /* webpackChunkName: "group-doc_public_enhancement" */ './pages/docs/architecture/public_enhancement.vue')
      },
      {
        path: 'architecture/datasource',
        name: 'architecturedatasource',
        component: () => import( /* webpackChunkName: "group-doc_datasource" */ './pages/docs/architecture/datasource.vue')
      }, {
        path: 'architecture/bml',
        name: 'architecturebml',
        component: () => import( /* webpackChunkName: "group-doc_bml" */ './pages/docs/architecture/bml.vue')
      }, {
        path: 'architecture/context_service',
        name: 'architecturecontext_service',
        component: () => import( /* webpackChunkName: "group-doc_context_service" */ './pages/docs/architecture/context_service.vue')
      }, {
        path: 'architecture/public_service',
        name: 'architecturepublic_service',
        component: () => import( /* webpackChunkName: "group-doc_public_service" */ './pages/docs/architecture/public_service.vue')
      }, {
        path: 'architecture/microservice_governance',
        name: 'architecturemicroservice_governance',
        component: () => import( /* webpackChunkName: "group-doc_microservice_governance" */ './pages/docs/architecture/microservice_governance.vue')
      },
      {
        path: 'architecture/gateway',
        name: 'architecturegateway',
        component: () => import( /* webpackChunkName: "group-doc_gateway" */ './pages/docs/architecture/gateway.vue')
      }
    ]
  },
  {
    path: '/faq/index',
    name: 'faq',
    component: () => import( /* webpackChunkName: "group-faq" */ './pages/faq/index.vue')
  },
  {
    path: '/download',
    name: 'download',
    component: () => import( /* webpackChunkName: "group-download" */ './pages/download/download.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import( /* webpackChunkName: "group-blog" */ './pages/blog/index.vue')
  },
  {
    path: '/blog/event',
    name: 'blogEvent',
    component: () => import( /* webpackChunkName: "group-blog" */ './pages/blog/event.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import( /* webpackChunkName: "group-team" */ './pages/team/team.vue')
  },
  {
    path: '/team/contributing',
    name: 'teamContributing',
    component: () => import( /* webpackChunkName: "group-contributing" */ './pages/team/contributing.vue')
  },
  {
    path: '/404',
    name: 'PageNotExist',
    component: () => import( /* webpackChunkName: "group-pageNotFound" */ './pages/404.vue')
  },
  {
    path: "/:catchAll(.*)", // 不识别的path自动匹配404
    redirect: '/404',
  }

]

export default routes;