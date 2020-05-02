<template>
  <v-sheet class="mx-auto" max-width="75vw" outlined v-model="default_browser_entries">
    <v-list id="content" dense v-for="default_entry in default_browser_entries" :key="default_entry.id">
      <ResultPanel v-bind="default_entry" />
    </v-list>
  </v-sheet>
</template>

<script>
/* 
TODO - enable/disable favorites
*/
import { mapActions, mapState } from 'vuex';
import ResultPanel from "@/components/browse/resultPanel";
export default {
  name: "Browser",
  data: () => ({
    drawer: false
  }),
  components: {
    ResultPanel,
  },
  created(){
    this.fetchDefaultSearch();
  },
  mounted() {
    this.$root.$on("navFilter", (code) => {
      return this.getFilteredByCode(code);
    });
  },
  computed: {
    ...mapState(['default_browser_entries'])
  },
  methods: {
    ...mapActions([
      "fetchDefaultSearch", 
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
