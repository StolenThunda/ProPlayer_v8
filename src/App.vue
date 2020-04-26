<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <SidebarTabs />
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn to="Index">
        <v-icon left>mdi-home</v-icon>
      </v-btn>
      <v-toolbar-title>TXBA ProPlayer v8</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import SidebarTabs from "@/components/sidebar/SidebarTabs";
import { mapActions } from "vuex";
export default {
  name: "AppFrame",
  props: {
    source: String
  },
  components: {
    SidebarTabs
  },
  data: () => ({
    drawer: null
  }),
  created() {
    this.$vuetify.theme.dark = true;
    this.fetchBacon();
    this.fetchFavorites();
  },
  methods: {
    toggleDrawer(toggle) {
      this.drawer = toggle;
    },
    ...mapActions(["fetchBacon", "fetchFavorites"])
  }
};
</script>