<template>
  <v-app class="page">
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

    <v-main>
    
      <Default />
    </v-main>

    <v-footer>
      <span>&copy; 2020</span>
      <v-spacer />
      <v-list>
        <light-dark />
      </v-list>
    </v-footer>
  </v-app>
</template>

<script>
import LightDark from "@/components/base/LightDark";
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
    LightDark,
    DefaultSideBar,
    DefaultAppBar,
    Default
  }
};
</script>
