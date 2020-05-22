<template>
  <v-app @showTab="showTab">
    <!-- APPBAR -->
    <watch-app-bar :drawer="drawer">
      <template v-slot:toggle>
        <v-app-bar-nav-icon @click="toggleSidebar" />
      </template>
    </watch-app-bar>
    <!-- END APPBAR -->

    <!-- NAV DRAWER -->
    <v-navigation-drawer
      v-model="drawer"
      ref="drawer"
      class="ma-50 mx-auto"
      app
    >
      <watch-side-bar-tabs :tab="currentTab" :sectionData="this.sections" />
    </v-navigation-drawer>
    <!-- END NAV DRAWER -->

    <!-- CONTENT -->
    <v-content>
      <component :is="plugin"></component>
    </v-content>
    <!-- END CONTENT -->

    <!-- FOOTER -->
    <!-- <v-footer>
      <span>&copy; 2020</span>
    </v-footer> -->
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
    }),
    components: {
      "watch-app-bar": AppBar,
      "watch-side-bar-tabs": SBTabs,
    },
    created() {
      this.getSegmentData();
    },
    computed: {
      plugin() {
        return (this.$route.meta.plugin || "default") + "-plugin";
      },
      ...mapState(["sections", "currentCourse"]),
    },
    methods: {
      showTab(tab) {
        this.currentTab = tab;
      },
      goBack() {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push("/");
      },
      async getSegmentData() {
        return await this.fetchPackage(this.$route.params.packageID);
      },
      ...mapActions(["fetchPackage"]),
    },
  };
</script>

<style lang="scss" scoped></style>
