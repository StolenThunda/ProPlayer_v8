<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <SidebarTabs />
    </v-navigation-drawer>

    <MainAppBar :drawer="drawer" />

    <v-content app>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import SidebarTabs from "@/components/index/SidebarTabs";
import MainAppBar from "@/components/index/MainAppBar";
export default {
  name: "AppFrame",
  props: {
    source: String
  },
  components: {
    SidebarTabs,
    MainAppBar
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch('fetchFavorites');
  },
  computed: {
    drawer: {
      get: function() {
        return this.$store.getters.isSideBarOpen;
      },
      set: function() {
        return this.$store.dispatch('isSideBarOpen');
    },
  },
  // methods: {
  // }
  }
};
</script>
