<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in Object.keys(favorites)" :key="i">
      <v-expansion-panel-header class="text-capitalize">
        <v-badge :content="favorites[item].length">{{ item }}</v-badge>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card
          class="fav_list"
          raised
          v-for="favorite in favorites[item]"
          :key="favorite.name"
        >
          <v-avatar size="20">
            <v-icon>mdi-play-circle-outline</v-icon>
          </v-avatar>
          <v-card-subtitle v-text="favorite.name"></v-card-subtitle>

          <div class="my-2">
            <v-btn>HERE</v-btn>
          </div>
          <!-- </v-card-actions> -->
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FavList",
  computed: {
    favsLoaded() {
      return this.favCoursesLoaded || this.favImportedLoaded;
    },
    ...mapState(["favorites", "favCoursesLoaded", "favImportedLoaded"])
  },
  methods: {
    ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    ...mapActions(["fetchFavorites"])
  }
};
</script>

<style scoped>
.fav_list {
  margin: 0;
  padding: 0;
  line-height: 1.4rem;
  font-weight: 600;
  border-bottom: 1px solid #555;
  color: #ddd;
}
/* v-list--item {
  font-weight: bolder !important;
  font-size: 2em;
  height: 55px;
  width: 100vw;
} */
</style>
