import Vue from 'vue';
import helpers from '../../middleware/txba_helpers';
export default {
    namespaced: true,
    state: {
        searching: false,
        default_browser_entries: null,
        search: {
            criteria: null,
            searchCategories: []
        }
    },
    mutations: {
        TOGGLE_SEARCHING(ctx, bool) {
            ctx.searching = bool;
        },
        SET_DEFAULT_BROWSER_ENTRIES(ctx, data) {
            // console.log("SettingBrower:", data);
            if (data) ctx.default_browser_entries = data;
        },
        SET_CRITERIA(ctx, data) {
            // console.log("SettingCriteria:", data);
            if (data.auth) Vue.set(ctx, 'auth', data.auth);
            if (data.funnels) ctx.search.criteria = data.funnels;
        },
        TOGGLE_CURRENT_SEARCH(ctx, data) {
            const cats = ctx.search.searchCategories;
            const idx = cats.findIndex(obj => obj === data)
            if (idx >= 0) {
                // already in array so remove
                ctx.search.searchCategories = [
                    ...cats.slice(0, idx),
                    ...cats.slice(idx + 1)
                ]
            } else {
                ctx.search.searchCategories.push(data);
            }
        },
    },
    actions: {
        toggleSearchCriteria(ctx, itm) {
            ctx.dispatch('setSearching', true)
            return ctx.commit("TOGGLE_CURRENT_SEARCH", itm);
        },
        fetchDefaultSearchData() {
            return new helpers.BrowserResults();
        },
        async fetchDefaultSearch(ctx) {
            return await ctx.dispatch("fetchDefaultSearchData")
                .then(data => ctx.commit("SET_DEFAULT_BROWSER_ENTRIES", data));
        },
        fetchCriteriaData() {
            return new helpers.SearchUtils();
        },
        async fetchSearchCriteria(ctx) {
            return await ctx.dispatch("fetchCriteriaData")
                .then(data => ctx.commit("SET_CRITERIA", data));
        },
        setSearching: (ctx, bool) => ctx.commit("TOGGLE_SEARCHING", ctx, bool),
        initStore: (ctx) => {
            ctx.dispatch('fetchSearchCriteria');
            ctx.dispatch('fetchDefaultSearch');
        }
    },
    getters: {
        default_browser_entries: (state) => state.default_browser_entries,
        // isSearching: (state) => state.searching,
        showCurrentSearches: (state) => {
            return (state.search.searchCategories && state.search.searchCategories.length > 0)
        }
    }
}