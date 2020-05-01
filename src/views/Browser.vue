<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <BrowserAppbar />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" ref="drawer" :width="navCfg.width" app clipped>
      <BrowserSidebar  />
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
import BrowserSidebar from "@/components/browse/Sidebar";
import BrowserAppbar from "@/components/browse/appBar";
import Browser from "@/components/browse/Browse";
import Draggable from '@/views/lib/DraggableMixin';

export default {
  name: "AppLayout",
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
    BrowserSidebar,
    BrowserAppbar,
    Browser
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch("fetchFavorites");
  },
  mounted(){
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
