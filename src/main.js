import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import helpers from "./plugins/helperPlugin"
import Browser from './views/Browser';
import Default from './views/';

Vue.component('default-layout', Default);
Vue.component('browser-layout', Browser);
Vue.use(helpers);

Vue.config.productionTip = false;
new Vue({
  helpers,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
