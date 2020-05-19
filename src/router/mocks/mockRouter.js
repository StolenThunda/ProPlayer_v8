import routes from "../routes";
import VueRouter from "vue-router";
import { mockRouterComponents } from "../../plugins/vue-test-util-helpers";

export default {
  mock() {
    const clearedRoutes = mockRouterComponents(routes);
    return new VueRouter({
      mode: "abstract",
      routes: clearedRoutes
    });
  }
};
