import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/browser",
    name: "browser",
    // component: Browser,
    // route level code-splitting
    // this generates a separate chunk (browser.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      layout: "browser",
    },
    component: () =>
      import(/* webpackChunkName: "browser" */ "../views/Browser.vue"),
  },
  {
    path: "/proplayer/:packageID",
    name: "proplayer",
    props: true,
    meta: {
      layout: "watch",
    },
    component: () =>
      import(/* webpackChunkName: "proplayer" */ "../views/Proplayer.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(
        /* webpackChunkName: "pagenotfound" */ "../views/PageNotFound.vue"
      ),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
