import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import Welcome from "@/components/index/Welcome"; //wecome section of home page
import  vuetify  from "vuetify";
let wrapper;

beforeEach(() => {
  const localVue = createLocalVue()
  localVue.use(vuetify)

  wrapper = shallowMount(Welcome, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
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

  test('should contain greeting class', () => {
    expect(wrapper.contains('.greeting')).toBe(true);
  });

  test('should contain 3 buttons', () => {
    expect(wrapper.findAll('v-btn').length).toBe(3);
});
});