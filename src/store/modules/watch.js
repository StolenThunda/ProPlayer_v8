import Vue from "vue";
export default {
  namespaced: true,
  state: {
    currentCourse: null,
    currentSegment: null,
    sections: null,
    previousCourses: []
  },
  mutations: {
    SET_COURSE_DATA(ctx, data) {
      if (!data) return;
      // console.log("SettingCourse:", data);
      if (ctx.currentCourse !== null)
        ctx.previousCourses.push(ctx.currentCourse);
      ctx.currentCourse = data;

      // map course to state
      for (let [k, v] of Object.entries(data)) {
        Vue.set(ctx, k, v);
      }
      Object.assign({}, ctx, data);
    },
    SET_USER_LOOP_DATA(ctx, data) {
      ctx.currentSegment = data;
    }
  },
  actions: {
    async fetchUserLoopData(ctx, ID) {
      const response = await ctx.rootState.TXBA_UTILS.getUserLoopData(ID);
      // console.log('courseData', response)
      ctx.commit("SET_USER_LOOP_DATA", response);
    },
    fetchUserLoop: (ctx, ID) => ctx.dispatch("fetchUserLoopData", ID),
    async fetchPackageData(ctx, ID) {
      const response = await ctx.rootState.TXBA_UTILS.getPackage(ID);
      // console.log('courseData', response)
      ctx.commit("SET_COURSE_DATA", response);
    },
    fetchPackage: (ctx, ID) => ctx.dispatch("fetchPackageData", ID)
  }
}
