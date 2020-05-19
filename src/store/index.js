import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules";
import TXBA_Utilities from "../middleware/txba_helpers";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    _spinnerState: false,
    TXBA_UTILS: null
  },
  mutations: {
    SET_UTILITIES(ctx) {
      ctx.TXBA_UTILS = new TXBA_Utilities();
    }
  },
  actions: {
    async initSearchUTIL(ctx) {
      ctx.commit("SET_UTILITIES");
    }
  },
  modules
});

store.dispatch("initSearchUTIL");

// auto init namespaced stores if the have an "initStore" action
for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.initStore) {
    store.dispatch(`${moduleName}/initStore`);
  }
}

export default store;
