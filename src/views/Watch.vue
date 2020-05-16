
<template>
  <v-app @showTab="showTab">
    <!-- APPBAR -->
    <AppBar  :drawer="drawer">
      <template v-slot:toggle>
       <v-app-bar-nav-icon @click="toggleSidebar" />
      </template>
    </AppBar>
    <!-- END APPBAR -->

    <!-- NAV DRAWER -->
    <v-navigation-drawer v-model="drawer"  ref="drawer"  app>
      <SBTabs  :tab="currentTab" :sectionData="this.sections" />
    </v-navigation-drawer>
    <!-- END NAV DRAWER -->
<!-- class="ma-50 mx-auto" -->
    <!-- CONTENT -->
    <v-content >
      <component 
        :is="plugin" 
        :options="videoOptions"
      ></component>
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
import AppBar from "@/components/proplayer/PlayerAppBar";
import SBTabs from "@/components/proplayer/PlayerSidebarTabs";
import Draggable from "@/views/lib/DraggableMixin";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("watch");

export default {
  name: "WatchLayout",
  mixins: [Draggable],
  data: () => ({
    drawer: false,
    currentTab: null,
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
    AppBar,
    SBTabs
  },
  created() {
    this.getCourseData();
  },
  computed: {
    plugin() {
      return (this.$route.meta.plugin || "default") + "-plugin";
    },
    ...mapState(["sections"])
  },
  methods: {
    showTab(tab){
      debugger
      this.currentTab = tab;
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
