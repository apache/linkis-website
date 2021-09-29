const routes = [{
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "group-home" */ './pages/home.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import( /* webpackChunkName: "group-docs" */ './pages/docs.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import( /* webpackChunkName: "group-faq" */ './pages/faq.vue')
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