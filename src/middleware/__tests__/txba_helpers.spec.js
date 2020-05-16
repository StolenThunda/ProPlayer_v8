import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify'
import helpers from '../txba_helpers';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuetify)
const localVue = createLocalVue();
localVue.use(helpers);
localVue.use(Vuex);


// removes vuetify warnings
// document.body.setAttribute('data-app', true)
describe('TXBA Helper functions', () => {

    let vuetify
    let store
    let mutations = {

    }

    beforeEach(() => {
        vuetify = new Vuetify();
        store = new Vuex.Store({
            state: {
            },
            mutations
        })
    })
    it('helpers loaded', () => {
        // const wrapper = shallowMount(helpers, {
        //     store,
        //     localVue, vuetify,
        // })
        expect(typeof helpers === 'object').toBe(true)
    })



})