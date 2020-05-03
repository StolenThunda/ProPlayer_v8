import Vue from "vue";
import Helpers from "../middleware/txba_helpers.js";

const plugin = {
  install() {
    Vue.helpers = Helpers;
    Vue.prototype.$helpers = Helpers;
  },
};
Vue.use(plugin);
export default plugin;
