import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router';
import App from './App.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.resolve({
  name: 'home'
}).href

const app = createApp(App);
app.use(router);

app.mount('#app')
