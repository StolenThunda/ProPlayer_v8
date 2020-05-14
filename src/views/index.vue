<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="toggleSidebar" @showFavs="toggleSidebar" />
      <DefaultAppBar />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" ref="drawer" :width="navCfg.width" app clipped>
      <DefaultNavBar />
    </v-navigation-drawer>

    <v-content>
      <Default />
    </v-content>

    <v-footer>
      <span>&copy; 2020</span>
      <v-spacer />
      <v-btn icon fab @click="toggleLightDark">
        <div ref="moon" hidden>

          <v-icon>fas fa-moon</v-icon>
        </div>
        <div ref="sun">
          <v-icon>fas fa-sun</v-icon>
        </div>
      </v-btn>
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
    source: String
  },
  data: () => ({
    drawer: false,
    navCfg: {
      width: 350,
      borderSize: 3
    }
  }),
  components: {
    DefaultNavBar,
    DefaultAppBar,
    Default
  },
  methods: {
    toggleLightDark() {
      this.$refs.moon.toggleAttribute('hidden') 
      this.$refs.sun.toggleAttribute('hidden') 
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>

<style  scoped>
</style>