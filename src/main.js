
import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router';
import login from './components/login.vue';
import home from './components/home.vue';
import registerUser from "@/components/registerUser";
import inquiries from "@/components/inquiries";
import setting from "@/components/setting";


Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/',component:login},
  { path: '/login/:id?', name: 'Login', component: login },
  { path: '/home', component: home },
  { path: '/Registro', component: registerUser},
  { path: '/Consultas', component: inquiries},
  { path: '/Configuraciones', component: setting}

]


const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

