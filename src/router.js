const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "group-app" */ './app.vue'),
    children: [
      { path: '', component: () => import(/* webpackChunkName: "group-home" */ './pages/home.vue') },
      { path: '/docs', component: () => import(/* webpackChunkName: "group-docs" */ './pages/docs.vue') },
      { path: '/faq', component: () => import(/* webpackChunkName: "group-faq" */ './pages/faq.vue') },
      { path: '/download', component: () => import(/* webpackChunkName: "group-download" */ './pages/download.vue') },
      { path: '/blog', component: () => import(/* webpackChunkName: "group-blog" */ './pages/blog.vue') },
      { path: '/team', component: () => import(/* webpackChunkName: "group-team" */ './pages/team.vue') },
    ]
  }
]

export default routes;