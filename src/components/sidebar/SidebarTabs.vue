<template>
  <v-container>
    <v-tabs v-model="tab" centered dark icons-and-text>
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#favorites">
        Favorites
        <v-icon>mdi-heart</v-icon>
      </v-tab>

    </v-tabs>
    <v-tabs-items v-model="tab">    
      <FavList />  
    </v-tabs-items>
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
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
  computed: {
    ...mapState(['isSideBarOpen'])
  }
};
</script>
