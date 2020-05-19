<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <DefaultAppBar>
        <template v-slot:toggle>
          <v-app-bar-nav-icon
            @click="toggleSidebar"
            @showFavs="toggleSidebar"
          />
        </template>
      </DefaultAppBar>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      ref="drawer"
      :width="navCfg.width"
      app
    >
      <DefaultSideBar />
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
import DefaultSideBar from "@/components/index/DefaultSideBar";
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
    DefaultSideBar,
    DefaultAppBar,
    Default
  },
  methods: {
    toggleLightDark() {
      this.$refs.moon.toggleAttribute("hidden");
      this.$refs.sun.toggleAttribute("hidden");
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  }
};
</script>
