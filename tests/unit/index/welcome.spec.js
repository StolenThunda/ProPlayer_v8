import { shallowMount } from '@vue/test-utils';
import Welcome from "@/components/index/Welcome"; //home page

let wrapper;

beforeEach(() => {
  wrapper = shallowMount(Welcome, {
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

  test('should contain greeting class', () => {
    expect(wrapper.contains('.greeting')).toBe(true);
  });

  test('should contain 4 buttons', () => {
    expect(wrapper.findAll('button').length).toBe(4);
});
});