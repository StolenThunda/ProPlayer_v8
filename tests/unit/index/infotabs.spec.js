import { shallowMount, createLocalVue } from '@vue/test-utils';
import InfoTabs from "@/components/index/InfoTabs"; //home page
import Vuex from 'vuex';

let wrapper;
let store;
let actions;
let mutations
let state;
const localVue = createLocalVue();
localVue.use(Vuex);

beforeEach(() => {
  actions = {
    
  };
  mutations = {

  };
  state = {

  };
  store = new Vuex.Store({
    actions,
    mutations,
    state
  });

  wrapper = shallowMount(InfoTabs, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
    store,
    localVue
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe('Component', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });


});