import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Welcome from "@/components/index/Welcome"; //wecome section of home page
import Vuetify from "vuetify";
import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from '../../../router/index'
let wrapper;
let config = createConfig()
function createConfig(overrides) {
  const user = "Antonio";
  const mocks = {
    // Vue Auth
    $auth: {
      check: () => false
    },
    // Vue Router
    $router: {
      push: () => { }
    },
    // Vuex
    $store: {
      state: [{ user }],
      commit: () => { }
    }
  };
  const propsData = { user };
  return Object.assign({ mocks, propsData }, overrides);
}

beforeEach(() => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  localVue.use(VueRouter);

  // global wrapper
  wrapper = shallowMount(Welcome, {
    config,
    localVue,
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe(' Welcome Component', () => {
  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  test('should contain greeting class', () => {
    expect(wrapper.contains('.greeting')).toBe(true);
  });

  test('should display user name from props', () => {
    console.log(wrapper.html())
    expect(wrapper.contains('.greeting')).toBe(true);
  });


  describe('Buttons', () => {
    test('should contain 3 buttons', () => {
      expect(wrapper.findAll('v-btn').length).toBe(3);
    });

    test('should have favorites button', () => {
      expect(wrapper.findAll('#showFav').length).toBe(1);
    });

    test('router called when user clicks browse', () => {
      const router = new VueRouter({ routes });


      jest.spyOn(config.mocks.$router, "push")
      const browseBtn = wrapper.find('#browse');
      browseBtn.trigger('click');
      const route = router.find(route => route.name === 'browse')
      expect(spy).toHaveBeenCalledWith(route);
    });
  });

});