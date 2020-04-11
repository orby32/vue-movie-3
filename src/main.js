import Vue from 'vue'
import App from './App.vue'
import store from './store';
import VueRouter from "vue-router";
import { routes } from './router';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
