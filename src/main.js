import Vue from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import { useWelcomeStore } from "./stores/welcome";

import App from "./App.vue";

import "../dist/output.css";

Vue.use(PiniaVuePlugin);

new Vue({
  pinia: createPinia(),
  render: (h) => h(App),
}).$mount("#app");
