// import helpers from '../../middleware/txba_helpers';
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
            ctx.sections = data['sections'];
            if (ctx.currentCourse !== null) ctx.previousCourses.push(ctx.currentCourse);
            ctx.currentCourse = data;
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