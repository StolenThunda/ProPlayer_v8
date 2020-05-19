<template>
  <v-app>
    <v-app-bar flat app>
      <BrowserToolbar />
      <template v-slot:extension>
        <CurrentSearch v-if="showCurrentSearches" />
      </template>
    </v-app-bar>

    <v-navigation-drawer ref="drawer" :width="navCfg.width" permanent app>
      <BrowserSidebar />
    </v-navigation-drawer>

    <v-content>
      <Browser />
    </v-content>

    <v-footer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import BrowserSidebar from "@/components/browse/Search";
import BrowserToolbar from "@/components/browse/appBar";
import Browser from "@/components/browse/Browser";
import Draggable from "@/views/lib/DraggableMixin";
import CurrentSearch from "@/components/browse/CurrentSearch";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers("browser");

export default {
  name: "AppLayout",
  mixins: [Draggable],
  props: {
    source: String
  },
  data: () => ({
    // drawer: false,
    navCfg: {
      width: 250,
      borderSize: 5
    }
  }),
  components: {
    BrowserSidebar,
    BrowserToolbar,
    Browser,
    CurrentSearch
  },
  computed: {
    ...mapGetters(["showCurrentSearches"])
  }
};
</script>
