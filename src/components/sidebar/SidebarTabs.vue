<template>
  <v-container>
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
  </v-container>
</template>

<script>
import FavList from "@/components/sidebar/FavoritesList";
import { mapState } from 'vuex';
export default {
  components: {
    FavList,
    // RandoCard,
  },
  data() {
    return {
      tab: true,
    };
  },
  computed: {
    ...mapState(['isSideBarOpen'])
  }
};
</script>
