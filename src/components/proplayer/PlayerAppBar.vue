<template>
  <!-- src="https://i.picsum.photos/id/307/1920/1080.jpg" -->
  <v-app-bar absolute app>
    <slot name="toggle" />
    <v-btn to="/" class="pa-8" icon fab>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <span v-if="packageTitle" v-html="packageTitle"></span>
      <span v-else>No Course Data</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon to="/browser">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon @click="gotoFavs">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <i class="fa fa-arrows-alt"></i>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  data: () => ({
    // title: null
  }),
  // mounted() {
  //   this.title = this.getTitle();
  // },
  computed: {
    ...mapState(["packageTitle"])
  },
  methods: {
    gotoFavs() {
      this.$root.$emit("showTab", "favorites");
      this.$root.$emit("toggleSidebar");
      // this.$refs.favorites.click();
    }
  }
};
</script>

<style lang="scss" scoped></style>
