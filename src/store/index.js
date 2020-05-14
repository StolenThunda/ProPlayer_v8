import Vue from "vue";
import Vuex from "vuex";
import modules from "./modules"
import helpers from '../middleware/txba_helpers';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    _spinnerState: false,
    TXBA_UTILS: null, 
    
  },
  mutations: {
    SET_UTILITIES(ctx) {
      ctx.TXBA_UTILS = new helpers.BrowserResults();; 
    },
  },
  actions: {
    async initSearchUTIL(ctx) {
     return ctx.commit("SET_UTILITIES")
    },
  },
  modules
});

store.dispatch('initSearchUTIL'); 

for (const moduleName of Object.keys(modules)) {
  if (modules[moduleName].actions && modules[moduleName].actions.initStore) {
    store.dispatch(`${moduleName}/initStore`)
  }
}

export default store;