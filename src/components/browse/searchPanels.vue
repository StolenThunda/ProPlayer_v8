<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in funnels" :key="i">
      <v-expansion-panel-header class='capital'>{{ i }}</v-expansion-panel-header>
      <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    funnels: {
      collections: [],
      artists: [],
      songs: [],
      difficulty: [],
      tuning: []
    }
  }),
  mounted(){
    this.getFunnels();
  },
  methods: {
    async getFunnels(){
      axios
        .get("https://texasbluesalley.com/proplayer74-tony/--ajax-")
    }
  }
};
</script>

<style scoped>
.capital {
  text-transform: capitalize;
}
</style>