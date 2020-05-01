<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="toggleSidebar" @showFavs="toggleSidebar" />
      <DefaultAppBar />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      ref="drawer"
      :width="navCfg.width"
      app
      clipped
    >
      <DefaultNavBar />
    </v-navigation-drawer>

    <v-content>
      <Default />
    </v-content>

    <v-footer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import DefaultNavBar from "@/components/index/DefaultNavBar";
import DefaultAppBar from "@/components/index/DefaultAppBar";
import Default from "@/components/index/";
import Draggable from "@/views/lib/DraggableMixin.js";

export default {
  name: "DefaultLayout",
  mixins: [Draggable],
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
    navCfg: {
      width: 350,
      borderSize: 3,
    },
  }),
  components: {
    DefaultNavBar,
    DefaultAppBar,
    Default,
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch("fetchFavorites");
  },
  mounted() {
    this.setBorderWidth();
    this.setEvents();
  },
  computed: {
    direction() {
      return this.drawer === false ? "Open" : "Closed";
    },
  },
};
</script>
