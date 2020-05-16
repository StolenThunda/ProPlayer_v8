import { shallowMount } from '@vue/test-utils';
import HomePage from "@/components/"; //home page

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(HomePage, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
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