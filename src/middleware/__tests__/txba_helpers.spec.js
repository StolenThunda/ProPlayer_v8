import { createLocalVue, shallowMount } from "@vue/test-utils";
import helpers from "../txba_helpers";
import Vuex from "vuex";

let wrapper;
let Helpers = new helpers();
const localVue = createLocalVue();
localVue.use(Vuex);

describe("TXBA Helper functions", () => {
  let store;
  let mutations = {};

  beforeEach(() => {
    store = new Vuex.Store({
      state: {},
      mutations
    });
    wrapper = shallowMount(Helpers, {
      store,
      localVue
    });
  });
  it("helpers loaded", () => {
    // expect(wrapper).toBe(true);
    console.log("helpers", Helpers);
    expect(typeof Helpers === "object").toBe(true);
  });
});
