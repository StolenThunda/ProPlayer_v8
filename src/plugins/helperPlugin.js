import Vue from "vue";
import Helpers from "../components/helpers.js";

const plugin = {
  install() {
    Vue.helpers = Helpers;
    Vue.prototype.$helpers = Helpers;
  },
};
export default plugin;
