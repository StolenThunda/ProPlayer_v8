

// import helpers from '../../middleware/txba_helpers';
import axios from "axios";
export default {
    namespaced: true,
    state: {
        currentCourse: null,
        previousCourses: [],
    },
    mutations: {
        SET_COURSE_DATA(ctx, { data }) {
            // console.log("SettingCourse:", data);
            if (typeof this.state.currentCourse !== 'undefined') {
                this.state.previousCourses.push(this.state.currentCourse);
            }
            this.state.currentCourse = data;
        },
    },
    actions: {        
        async fetchCourseData() {
            return axios.get("https://baconipsum.com/api/?callback=?", {
                type: "meat-and-filler",
                "start-with-lorem": "1",
                paras: "10",
            });
        },
        async fetchCourse(ctx) {
            return ctx.dispatch("fetchCourseData").then((response) => {
                // console.log("obj", response.data);
                ctx.commit("SET_COURSE_DATA", { data: response.data });
                return response.data;
            });
        },
        initStore: (ctx) => ctx.dispatch('fetchCourse')
    },
    getters: {
        getCurrentCourseData: (state) => state.currentCourse,
    }
}