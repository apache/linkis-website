import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router';
import App from './App.vue';
import i18n from './i18n';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.resolve({
  name: 'home'
}).href

const app = createApp(App);
app.use(router);
app.use(i18n);

app.mount('#app')
