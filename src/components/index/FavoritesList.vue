<template>
<v-container fluid>
  <v-expansion-panels >
    <v-expansion-panel v-for="(item, i) in Object.keys(favorites)" :key="i">
      <v-expansion-panel-header class="text-capitalize">
        <v-badge :content="favorites[item].length">{{ item }}</v-badge>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card>
          <v-list dense>
      <v-list-item-group v-model="model" mandatory color="indigo">
        <v-list-item
          v-for="favorite in favorites[item]"
          :key="favorite.name"
        >
          <v-list-item-icon>
            <v-icon small>mdi-play-circle</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-subtitle v-text="favorite.name"></v-list-item-subtitle>
          </v-list-item-content>
        <v-list-item-action>
           <v-list-item-icon>
             <v-avatar @click="removeFavorite">
            <v-icon color="error" small>fas fa-minus-circle</v-icon>
             </v-avatar>
          </v-list-item-icon>
        </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
     </v-card>
       
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</v-container>
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
    removeFavorite(id){
      console.log(id ? id : 'hello')
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
