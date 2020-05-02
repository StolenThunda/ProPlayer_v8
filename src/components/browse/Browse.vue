<template>
  <v-card>
    <v-row>
      <v-col>
        <v-toolbar v-if="searching">
          <v-toolbar-title>Current Searches</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip-group v-model="this.search.searchCategories">
            {{ categories }}
            <v-chip v-for="chip in this.search.searchCategories" :key="chip.text" pill close>{{ chip.text }}</v-chip>
          </v-chip-group>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet class="mx-auto" max-width="75vw" outlined v-model="entries">
          <v-list id="content" dense v-for="default_entry in entries" :key="default_entry.id">
            <ResultPanel v-bind="default_entry" />
          </v-list>
        </v-sheet>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
/* 
TODO - enable/disable favorites
*/
import { mapActions, mapState, mapGetters } from 'vuex';
import ResultPanel from "@/components/browse/resultPanel";
export default {
  name: "Browser",
  data: () => ({
    categories: null,
  }),
  components: {
    ResultPanel,
  },
  created(){
    this.fetchDefaultSearch();
    // this.$root.$on('toggleSearching', () => this.setSearching )
  },
  computed: {
    ...mapState(['search']),
    ...mapState({
      entries: state => state.default_browser_entries
      // },{
      // categories: state => state.search.searchCategories
      }),
      ...mapGetters({ searching: 'isSearching'})
  },
  methods: {
    ...mapActions([
      "fetchDefaultSearch",
       "setSearching"
    ])
  },
};
</script>

<style>
#content {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: center;
}
</style>
