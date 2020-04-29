<template>
  <v-card>
    <v-sheet class="pa-4 lighten-2">
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
    </v-sheet>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in funnels" :key="i">
        <v-expansion-panel-header class="capital">{{
          i
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
      <v-sheet elevation="10" class="pa-2">
        <v-chip-group
          column
          active-class="primary--text"
        >
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
  </v-expansion-panel-content
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
    tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',
      ],
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
