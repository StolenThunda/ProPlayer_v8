import Vue from 'vue';
export default {
    namespaced: true,
    state: {
        currentCourse: null,
        sections: null,
        previousCourses: [],
    },
    mutations: {
        SET_COURSE_DATA(ctx, data) {
            if (!data) return;
            // console.log("SettingCourse:", data);
            if (ctx.currentCourse !== null) ctx.previousCourses.push(ctx.currentCourse);
            ctx.currentCourse = data;

            // map course to state
            for (let [k, v] of Object.entries(data)) {
                Vue.set(ctx, k, v);
            }
            Object.assign({}, ctx, data);
        },
    },
    actions: {
        async fetchCourseData(ctx, ID) {
            const response = await ctx.rootState.TXBA_UTILS.getCourse(ID)
            // console.log('courseData', response)
            ctx.commit('SET_COURSE_DATA', response)
        },
        fetchCourse: (ctx, ID) => ctx.dispatch("fetchCourseData", ID)
    },
}