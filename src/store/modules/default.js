export default {
  namespaced: true,
  state: {
    favorites: [],
    notifications: null
  },
  mutations: {
    SET_FAVS(ctx, favs ) {
      // console.log("SettingFAVS:", favs);
      if (favs) ctx.favorites = favs;
    },
    SET_NOTIFICATIONS(ctx, notes ) {
      // console.log("SettingNotes:", notes);
      if (notes) ctx.notifications = notes;
    }
  },
  actions: {
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
      await ctx
        .dispatch("fetchNotificationData")
        .then(data => ctx.commit("SET_NOTIFICATIONS", data));
    },
    initStore: ctx => {
      ctx.dispatch("fetchFavorites");
      ctx.dispatch("fetchNotifications");
    }
  },
  getters: {
    getAnnouncements: ctx => ctx.notifications.announcements || [],
    getUpdates: ctx => ctx.notifications.updates || [],
    loaded: (ctx) => ctx.notifications.announcements.length > 0 || ctx.notifications.updates
  }
};
