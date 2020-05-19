import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import helpers from "./plugins/helperPlugin";

import Watch from "./views/Watch";
import Browser from "./views/Browse";
import Default from "./views/";

Vue.component("default-layout", Default);
Vue.component("browser-layout", Browser);
Vue.component("watch-layout", Watch);

Vue.component("default-plugin", () => import("./components/proplayer/Default"));
Vue.component("pdfviewer-plugin", () =>
  import("./components/proplayer/PDFViewer")
);
Vue.component("player-plugin", () =>
  import("./components/proplayer/ProPlayer")
);

Vue.config.productionTip = false;
new Vue({
  helpers,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
