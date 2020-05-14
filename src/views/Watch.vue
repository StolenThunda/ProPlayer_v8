
<template>
  <v-app>
    <!-- APPBAR -->
    <v-app-bar absolute src="https://i.picsum.photos/id/307/1920/1080.jpg" app>
      <!-- src="https://picsum.photos/1920/1080?random" -->
      <v-app-bar-nav-icon class="ma-1" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn to="/" class="pa-8" icon fab>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title v-html="currentCourse.packageTitle" v-if="currentCourse"></v-toolbar-title>
      <v-toolbar-title v-else>No DATA</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon to="/browser">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon @click="favs = !favs; drawer = (favs) ? true : false">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="maximize">
        <i class="fa fa-arrows-alt"></i>
      </v-btn>
    </v-app-bar>
    <!-- END APPBAR -->

    <!-- NAV DRAWER -->
    <v-navigation-drawer v-model="drawer" ref="drawer" :width="navCfg.width" app clipped>
      <SBTabs :sectionData="this.sections" />
    </v-navigation-drawer>
    <!-- END NAV DRAWER -->

    <!-- CONTENT -->
    <v-content class="ma-50 mx-auto">
      <component :is="plugin" :options="videoOptions"></component>
    </v-content>
    <!-- END CONTENT -->

    <!-- FOOTER -->
    <v-footer>
      <span>&copy; 2020</span>
    </v-footer>
    <!-- END FOOTER -->
  </v-app>
</template>

<script>
import SBTabs from "@/components/base/Tabs.vue";
import Draggable from "@/views/lib/DraggableMixin";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("watch");

export default {
  name: "WatchLayout",
  mixins: [Draggable],
  data: () => ({
    drawer: false,
    navCfg: {
      width: 350,
      borderSize: 3
    },
    favs: false,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" }
    ],
    videoOptions: {
      autoplay: true,
      controls: true,
      sources: [
        {
          src: "//vjs.zencdn.net/v/oceans.mp4",
          type: "video/mp4"
        }
      ]
    }
    // mini: true
  }),
  components: {
    // ProPlayer,
    // FavList: () =>
    //   import(
    //     /* webpackChunkName: "favList" */ "@/components/index/FavoritesList.vue"
    //   ),
    SBTabs
  },
  created() {
    this.getCourseData();
  },
  mounted() {
    console.log("this", this);
  },
  computed: {
    plugin() {
      return (this.$route.meta.plugin || "default") + "-plugin";
    },
    ...mapState(["sections", "currentCourse"])
  },
  methods: {
    maximize() {
      // this.player.fullScreenToggle();
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async getCourseData() {
      return await this.fetchCourse(this.$route.params.packageID);
    },
    ...mapActions(["fetchCourse"])
  }
};
</script>

<style lang="scss" scoped></style>
