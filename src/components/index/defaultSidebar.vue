<template>
  <v-card>
    <v-card >
    <v-tabs-slider></v-tabs-slider>
    <v-tab href="#favorites">
      Favorites
      <v-icon>mdi-heart</v-icon>
    </v-tab>
    <v-tabs>
      <v-tabs-items v-model="tab">
        <FavList />
      </v-tabs-items>
    </v-tabs>
  </v-card>
  <v-card>
  </v-card>
  </v-card>
</template>

<script>
import FavList from "@/components/index/FavoritesList";
export default {
  name: "defaultSidebar",
  components: {
    FavList,
  },
  data() {
    return {
      tab: true
    };
  },
  mounted(){
    console.dir(this.$route)
  }
};
</script>
