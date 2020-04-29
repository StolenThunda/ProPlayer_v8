<template>
  <v-app id="inspire">  
    
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <defaultAppbar v-show="index" />
      <BrowserAppbar v-show="browse" />
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <defaultSidebar v-show="index" />
      <BrowserSidebar v-show="browse" />
    </v-navigation-drawer>
  
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
// import SideBar from "@/components/AppSidebars";
import BrowserSidebar from "@/components/browse/Sidebar";
import defaultSidebar from "@/components/index/defaultSidebar";
import BrowserAppbar from "@/components/browse/AppBar";
import defaultAppbar from "@/components/index/defaultAppbar";
export default {
  name: "AppLayout",
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    index: false,
    browse: false,
    proplayer: false
  }),
  components: {
    defaultSidebar,
    // SideBar,
    defaultAppbar,
    BrowserSidebar,
    BrowserAppbar
  },
  mounted() {
    this.$vuetify.theme.dark = true;
    this.$store.dispatch("fetchFavorites");
    this.init();
  },
  watch: {
    '$route': 'init'
  },
  methods: {
    init(){ 
      ['index','browse','proplayer'].forEach((el, idx) => {
      this[el] = this.drawerContent(el)
      console.log('el',[el, this[el], idx])
    }).bind(this)
    },
    drawerContent: function(name) { return this[name] = this.$route.name === name},
  }
};
</script>
