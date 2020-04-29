<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <defaultAppbar v-show="index" />
      <BrowserAppbar v-show="browse" />
    </v-app-bar>

    <v-navigation-drawer 
      v-model="drawer"
      ref="drawer"
      :width="navCfg.width"
      app clipped 
      >
      <defaultSidebar v-show="index" />
      <BrowserSidebar v-show="browse" />
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
// import SideBar from "@/components/AppSidebars";
import BrowserSidebar from "@/components/browse/Sidebar";
import defaultSidebar from "@/components/index/defaultSidebar";
import BrowserAppbar from "@/components/browse/AppBar";
import defaultAppbar from "@/components/index/defaultAppbar";
export default {
  name: "AppLayout",
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    index: false,
    browse: false,
    proplayer: false,
    navCfg: {
      width: 350,
      borderSize: 3,
    }
  }),
  components: {
    defaultSidebar,
    // SideBar,
    defaultAppbar,
    BrowserSidebar,
    BrowserAppbar
  },
  mounted() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch("fetchFavorites");
    this.setBorderWidth();
    this.setEvents();
    this.init();
  },
  computed: {
    direction() {
      return this.drawer === false ? "Open" : "Closed";
    }
  },
  methods: {
    init() {
      ["index", "browse", "proplayer"]
        .forEach((el, idx) => {
          this[el] = this.drawerContent(el);
          console.log("el", [el, this[el], idx]);
        })
        .bind(this);
    },
    drawerContent: function(name) {
      return (this[name] = this.$route.name === name);
    },
    setBorderWidth() {
      let i = this.$refs.drawer.$el.querySelector(
        ".v-navigation-drawer__border"
      );
      i.style.width = this.navCfg.borderSize + "px";
      i.style.cursor = "ew-resize";
      i.style.backgroundColor = "grey";
    },
    setEvents() {
      const minSize = this.navCfg.borderSize;
      const el = this.$refs.drawer.$el;
      const drawerBorder = el.querySelector(".v-navigation-drawer__border");
      // const vm = this;
      const direction = el.classList.contains("v-navigation-drawer--right")
        ? "right"
        : "left";

      function resize(e) {
        document.body.style.cursor = "ew-resize";
        let f =
          direction === "right"
            ? document.body.scrollWidth - e.clientX
            : e.clientX;
        el.style.width = f + "px";
      }

      drawerBorder.addEventListener(
        "mousedown",
        (e) => {
          if (e.offsetX < minSize) {
            el.style.transition = "initial";
            document.addEventListener("mousemove", resize, false);
          }
        },
        false
      );

      document.addEventListener(
        "mouseup",
        () => {
          el.style.transition = "";
          this.navCfg.width = el.style.width;
          document.body.style.cursor = "";
          document.removeEventListener("mousemove", resize, false);
        },
        false
      );
    }
  }
};
</script>
