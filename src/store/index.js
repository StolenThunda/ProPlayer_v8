import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {
    bacon: [],
    drawerState: false,
    _spinnerState: false,
    favsPopulated: false,
    favorites: null,
    currentCourse: {},
    previousCourses: [],
    default_browser_entries: null
  },
  mutations: {
    TOGGLE_SIDEBAR(ctx, data) {
      this.state.drawerState = data;
    },
    SET_SPINNER() {
      this.state._spinnerState = !this.state._spinnerState;
    },
    SET_DEFAULT_BROWSER_ENTRIES(ctx,  data ) {
      console.log("SettingBrower:", data);
      if (data) this.state.default_browser_entries = data;
    },
    SET_FAVS(ctx, { favs }) {
      // console.log("SettingFAVS:", favs);
      this.state.favorites = favs;

      //TODO: remove hard coded favs
      this.state.favsPopulated =
        favs.Courses.length > 0 || favs.Imported.length > 0;
    },
    SET_BACON_DATA(ctx, { data }) {
      this.state.bacon = data;
    },
  },
  actions: {
    setFavs(ctx, collection) {
      return ctx.commit("SET_FAVS", ctx, collection.favs);
    },
    async fetchBaconData(ctx) {
      ctx.commit("SET_SPINNER");
      return axios.get("https://baconipsum.com/api/?callback=?", {
        type: "meat-and-filler",
        "start-with-lorem": "1",
        paras: "10",
      });
    },
    async fetchBacon(ctx) {
      return ctx.dispatch("fetchBaconData").then((response) => {
        const newData = response.data.map((info, idx) => {
          return {
            id: "bit_" + idx,
            title: info.split(" ").splice(0, 3).join(" ").toUpperCase(),
            data: info.split(" ").splice(3).join(" "),
          };
        });
        // console.log("obj", newData);
        ctx.commit("SET_BACON_DATA", { data: newData });
        ctx.commit("SET_SPINNER");
        return newData;
      });
    },
    async fetchCourseData() {
      return axios.get("https://baconipsum.com/api/?callback=?", {
        type: "meat-and-filler",
        "start-with-lorem": "1",
        paras: "10",
      });
    },
    async fetchCourse(ctx) {
      return ctx.dispatch("fetchCourseData").then((response) => {
        console.log("obj", response.data);
        ctx.commit("SET_COURSE_DATA", { data: response.data });
        return response.data;
      });
    },

    async fetchFavorites(ctx) {
      await ctx
        .dispatch("fetchFavoritesData")
        .then((myJson) => ctx.commit("SET_FAVS", myJson));
    },
    fetchFavoritesData() {
      return new Vue.helpers.FavUtils();
    },
    fetchNotificationData() {
      return new Vue.helpers.NoteUtils();
    },
    async fetchNotifications(ctx) {
      return await ctx.dispatch("fetchNotificationData");
    },
    fetchDefaultSearchData() {
      return new Vue.helpers.BrowserResults();
    },
    async fetchDefaultSearch(ctx) {
      return await ctx.dispatch("fetchDefaultSearchData")
        .then(data => ctx.commit("SET_DEFAULT_BROWSER_ENTRIES", data));
    },
    drawerState: (ctx, data) => ctx.commit("TOGGLE_SIDEBAR", ctx, data),
  },
  getters: {
    getSliceBacon: (state) =>
      state.bacon[Math.floor(Math.random() * state.bacon.length)],
    drawerState: (state) => state.drawerState,
    fetchFavorites: (state) => state.favorites,
    getBacon: (state) => state.bacon,
    getCurrentCourseData: (state) => state.currentCourse,
    default_browser_entries: (state) => state.default_browser_entries
  },
});
