import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import { routes } from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import "./filters";


Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
  mode: "history",
  routes
});

new Vue({
  el: "#app",
  render: (h) => h(App),
  store,
  vuetify,
  router
});
