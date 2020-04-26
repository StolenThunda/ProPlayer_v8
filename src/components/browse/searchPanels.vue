<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in funnels" :key="i">
      <v-expansion-panel-header>{{ i }}</v-expansion-panel-header>
      <v-expansion-panel-content>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data: () => ({
    funnels: {
      Collections: [],
      Artists: [],
      Songs: [],
      Difficulty: [],
      Tuning: []
    }
  }),
  methods: {
    UCfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>