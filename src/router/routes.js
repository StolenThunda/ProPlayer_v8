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
  // {
  //   path: "/watch/pdf/:packageID/:segmentID",
  //   name: "pdf",
  //   props: true,
  //   meta: {
  //     layout: "watch",
  //     plugin: "pdfviewer"
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "watch" */ "../views/Watch.vue")

  // },
  // {
  //   path: "/watch/play/:packageID/:segmentID",
  //   name: "player",
  //   props: true,
  //   meta: {
  //     layout: "watch",
  //     plugin: "player"
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "watch" */ "../views/Watch.vue")
  // },
  {
    path: "/watch/:packageID",
    // name: "watch",
    // props: true,
    // meta: {
    //   layout: "watch"
    // },
    // component: () =>
    //   import(/* webpackChunkName: "watch" */ "../views/Watch.vue"),
    children: [
      {
        path: '',
        name: "watch",
        props: true,
        meta: {
          layout: "watch"
        }
      },
      {
        name: "view",
        path: ":segmentID",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "play" */ "../components/proplayer/Player.vue"
          ),
        meta: {
          layout: "watch",
          plugin: "player"
        }
      },
      {
        path: "pdf/:segmentID",
        name: "pdf",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "pdf" */ "../components/proplayer/PDFViewer.vue"
          ),
        meta: {
          layout: "watch",
          plugin: "pdfviewer"
        }
      },
      {
        path: "youtube/:segmentID",
        name: "yt",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "pdf" */ "../components/proplayer/Player.vue"
          ),
        meta: {
          layout: "watch",
          plugin: "player"
        }
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "pagenotfound" */ "../views/PageNotFound.vue")
  }
];
