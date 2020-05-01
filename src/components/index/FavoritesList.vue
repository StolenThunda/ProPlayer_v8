<template>
  <v-container fluid>
    <v-expansion-panels v-if="favorites">
      <v-expansion-panel v-for="(item, i) in Object.keys(favorites)" :key="i">
        <v-expansion-panel-header class="text-capitalize">
          <v-badge :content="favorites[item].length">{{ item }}</v-badge>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card>
            <v-list dense>
              <v-list-item-group>
                <v-list-item
                  v-for="favorite in favorites[item]"
                  :key="favorite.name"
                >
                  <v-icon small @click="playMedia">mdi-play-circle</v-icon>

                  <v-list-item-content>
                    <v-list-item-subtitle
                      v-text="favorite.title"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-list-item-icon>
                      <v-icon color="error" @click="removeFavorite" small
                        >fas fa-minus-circle</v-icon
                      >
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
import { mapState } from "vuex";
export default {
  name: "FavList",
  computed: {
    ...mapState(["favorites"]),
  },
  methods: {
    playMedia(el) {
      console.dir(el);
    },
    removeFavorite(id) {
      console.log(id ? id : "hello");
    },
  },
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
