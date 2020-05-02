<template>
  <v-card>
    <v-sheet class="pa-4 lighten-2">
      
      <v-text-field
        label="Search"
        v-model="searchText"
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
      <v-expansion-panel v-for="criterion in this.search.criteria" :key="criterion.sectionId">
        <v-expansion-panel-header class="capital" v-html="criterion.sectionId"></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-sheet elevation="10" class="pa-2">
            <v-chip-group 
              v-model="selected"
              active-class="primary--text" 
              multiple
              column>
              <v-chip 
                @click="select(this, chip)"
                v-for="chip in criterion.chips" 
                :key="chip.id" 
                pill 
                filter
              >
                {{ chip.text }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: "BrowserSidebar",
  data: () => ({
    caseSensitive: null,
    searchText: null,
    selected: [],
  }),
  created() {
    this.fetchSearchCriteria();
  },
  computed: {
    ...mapState(["search"]),
  },
  methods: {
    select(el, chipData){
      console.log(el)
      this.addSearchCriteria(chipData);
      if (!this.isSearching) this.$root.$emit('toggleSearching');
    },
   ...mapActions([
     "fetchSearchCriteria", 
     "addSearchCriteria", 
     "removeSearchCriteria"
   ])
  },
};
</script>

<style scoped>
.capital {
  text-transform: capitalize;
}
</style>
