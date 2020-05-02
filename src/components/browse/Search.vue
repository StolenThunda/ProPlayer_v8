<template>
  <v-card>
    <v-sheet class="pa-4 lighten-2">
      
      <v-text-field
        label="Search"
        v-model="search"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
     
      <v-checkbox v-model="caseSensitive" dark hide-details label="Case sensitive search"></v-checkbox>
    </v-sheet>
    <v-expansion-panels>
      <v-expansion-panel v-for="criterion in this.criteria" :key="criterion.sectionId">
        <v-expansion-panel-header class="capital" v-html="criterion.sectionId"></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet elevation="10" class="pa-2">
            <v-chip-group column active-class="primary--text">
              <v-chip v-for="tag in criterion.tags" :key="tag">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- <v-card>{{ this.criteria }}</v-card> -->
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "BrowserSidebar",
  data: () => ({
    caseSensitive: null,
    search: null,
    tags: [
      "Work",
      "Home Improvement",
      "Vacation",
      "Food",
      "Drawers",
      "Shopping",
      "Art",
      "Tech",
      "Creative Writing",
    ],
  }),
  created() {
    this.fetchSearchCriteria();
  },
  mounted() {
     console.log('crit',this.criteria);
  },
  computed: {
    ...mapState(["criteria"])
  },
  methods: {
   ...mapActions([
     "fetchSearchCriteria"
   ])
  },
};
</script>

<style scoped>
.capital {
  text-transform: capitalize;
}
</style>
