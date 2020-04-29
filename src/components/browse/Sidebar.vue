<template>
  <v-card>
     <!-- <v-sheet class="pa-4 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search P"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        dark
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet> -->
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in funnels" :key="i">
      <v-expansion-panel-header class="capital">{{
        i
      }}</v-expansion-panel-header>
      <v-expansion-panel-content
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.</v-expansion-panel-content
      >
    </v-expansion-panel>
  </v-expansion-panels>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "BrowserSidebar",
  data: () => ({
    funnels: {
      collections: [],
      artists: [],
      songs: [],
      difficulty: [],
      tuning: []
    }
  }),
  mounted() {
    this.getFunnels();
  },
  methods: {
    async getFunnels() {
      axios.get("https://texasbluesalley.com/proplayer74-tony/--ajax-");
    }
  }
};
</script>

<style scoped>
.capital {
  text-transform: capitalize;
}
</style>
