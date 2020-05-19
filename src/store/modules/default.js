export default {
  namespaced: true,
  state: {
    favorites: []
    // TODO: enable for caching
    // notifications: {
    //     announcements: [],
    //     updates: []
    // }
  },
  mutations: {
    SET_FAVS(ctx, { favs }) {
      // console.log("SettingFAVS:", favs);
      if (favs) ctx.favorites = favs;
    }
  },
  actions: {
    setFavs(ctx, collection) {
      return ctx.commit("SET_FAVS", ctx, collection.favs);
    },
    fetchFavoritesData(ctx) {
      return ctx.rootState.TXBA_UTILS.getFavs();
    },
    fetchNotificationData(ctx) {
      return ctx.rootState.TXBA_UTILS.getNotification();
    },
    async fetchFavorites(ctx) {
      await ctx
        .dispatch("fetchFavoritesData")
        .then(data => ctx.commit("SET_FAVS", data));
    },
    async fetchNotifications(ctx) {
      return await ctx.dispatch("fetchNotificationData");
    },
    initStore: ctx => ctx.dispatch("fetchFavorites")
  },
  getters: {
    getFavorites: state => {
      const fav = {};
      for (let category in state.favorites) {
        fav[category] = category.length;
      }
      // console.log("getFavs", fav)
      return fav;
    }
  }
};
