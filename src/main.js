import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router';
import App from './App.vue';
import i18n from './i18n';
import 'github-markdown-css';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})

router.resolve({
  name: 'home'
}).href

const app = createApp(App);
app.use(router);
app.use(i18n);

app.mount('#app')
