<template>
  <!-- <v-sheet> -->
    <v-row align='center' no-gutters>

    <v-card class='pa-5 col-md-8 offset-md-2'>
    <v-tabs v-model='tab' icons-and-text centered>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#segments">
        Segments
        <v-icon>mdi-menu</v-icon>
      </v-tab>
      <v-tab href="#favorites">
        Favorites
        <v-icon>mdi-heart</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" outlined>
      <v-tab-item id="segments">
        <segments />
      </v-tab-item>
      <v-tab-item id="favorites">
        <favorites />
      </v-tab-item>
    </v-tabs-items>
    </v-card>
    </v-row>
  <!-- </v-sheet> -->
</template>

<script>
import Segments from "@/components/proplayer/Segments";
import Favs from "@/components/index/FavoritesList";
export default {
  name: "PlayerTabs",
  data: () => ({ 
    tab: null
  }),
  components: {
   favorites: Favs,
   segments: Segments
  }
};
</script>
