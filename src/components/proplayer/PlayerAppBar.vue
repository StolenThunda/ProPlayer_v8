<template>
  <!-- src="https://i.picsum.photos/id/307/1920/1080.jpg" -->
  <v-app-bar flat app>
    <slot name="toggle" />
    <v-btn :to="{name: 'index'}" class="pa-8" fab icon>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn @click="$root.$emit('toggleCourseInfo')" fab icon>
      <v-icon>mdi-information</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-title>
      <span v-if="packageTitle" v-html="packageTitle"></span>
      <span v-else>No Course Data</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon :to="{name: 'browser'}">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon @click="gotoFavs">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <i class="fa fa-arrows-alt"></i>
    </v-btn>
    <ToolList />
  </v-app-bar>
</template>

<script>
import ToolList from "@/components/base/ToolList";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("watch");
export default {
  components: {
    ToolList
  },
  computed: {
    ...mapState(["packageTitle"])
  },
  methods: {
    toggleInfo: () => {
      this.$root.$emit("toggleCourseInfo");
    },
    gotoFavs() {
      this.$root.$emit("showTab", "favorites");
      this.$root.$emit("toggleSidebar");
    }
  }
};
</script>

<style lang="scss" scoped></style>
