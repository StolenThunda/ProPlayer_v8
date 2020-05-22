<template>
  <v-card flat tile>
    <v-expansion-panels v-if="favorites" popout>
      <v-expansion-panel v-for="(item, i) in Object.keys(favorites)" :key="i">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-expansion-panel-header v-on="on" class="text-capitalize">
              <span>{{ item }}</span>
            </v-expansion-panel-header>
          </template>
          <v-badge
            :content="favorites[item].length"
            offset-x="13"
            bordered
          ></v-badge>
        </v-tooltip>
        <v-expansion-panel-content>
          <v-list dense nav rounded subheader>
            <v-list-item
              v-for="favorite in favorites[item]"
              :key="favorite.name"
            >
              <v-list-item-avatar>
                <v-icon class="ma-4" @click="playMedia(favorite.id)" small
                  >mdi-play-circle</v-icon
                >
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-subtitle
                  v-html="favorite.title"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-icon>
                  <v-list-item-avatar>
                    <v-icon
                      class="pb-2"
                      color="error"
                      @click="removeFavorite(favorite.id)"
                      small
                      >mdi-minus-circle</v-icon
                    >
                  </v-list-item-avatar>
                </v-list-item-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("default");
export default {
  name: "FavList",
  data: () => ({
    hover: true
  }),
  computed: {
    ...mapState(["favorites"])
  },
  methods: {
    playMedia(id) {
      console.dir(id);
    },
    removeFavorite(id) {
      console.log(id ? id : "hello");
    }
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
