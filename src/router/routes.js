import Index from "../views/";
export default [
  {
    path: "/",
    name: "index",
    component: Index
  },
  {
    path: "/browser",
    name: "browser",
    // component: Browser,
    // route level code-splitting
    // this generates a separate chunk (browser.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    meta: {
      layout: "browser"
    },
    component: () =>
      import(/* webpackChunkName: "browse" */ "../views/Browse.vue")
  },
  {
    path: "/watch/:packageID/pdf/:file",
    name: "pdf",
    props: true,
    meta: {
      layout: "watch",
      plugin: "pdfviewer"
    },
    component: () =>
      import(/* webpackChunkName: "watch" */ "../views/Watch.vue")
  },
  {
    path: "/watch/:packageID/play/:file",
    name: "player",
    props: true,
    meta: {
      layout: "watch",
      plugin: "player"
    },
    component: () =>
      import(/* webpackChunkName: "watch" */ "../views/Watch.vue")
  },
  {
    path: "/watch/:packageID",
    name: "watch",
    props: true,
    meta: {
      layout: "watch",
      plugin: "player"
    },
    component: () =>
      import(/* webpackChunkName: "watch" */ "../views/Watch.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "pagenotfound" */ "../views/PageNotFound.vue")
  }
];
