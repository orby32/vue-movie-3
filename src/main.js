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

Vue.filter('money', function(value) {
  if (typeof value !== "number") return value;
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
  return formatter.format(value);
}) 
Vue.filter('hour', function(value) {
  if(typeof value !== "number") return value;
  let hours = Math.floor(value / 60);
  let minutes = value % 60;
  return `${hours}:${minutes}h` ;
})
Vue.filter('formattedText', function(value) {
  let newValue = value.replace('_', ' ');
  return newValue;
})

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})