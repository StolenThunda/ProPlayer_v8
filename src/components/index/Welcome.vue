<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="greeting">
          <H5>
            Welcome
            <span>{{ user }}</span>,
          </H5>
        </div>
      </v-col>
      <v-col>
        <div class="welcome">
          <div>
            <v-btn color="success" @click="isSideBarOpen">
              <v-icon left>mdi-play-circle-outline</v-icon>Orientation
            </v-btn>
          </div>
          <div>
            <v-btn color="primary" @click="isSideBarOpen">
              <v-icon left>mdi-heart</v-icon>Favorites
            </v-btn>
          </div>
          <div>
            <v-btn color="primary" to="Browse">
              <v-icon left>mdi-magnify</v-icon>Browse
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: function() {
    return {
      drawer: null,
      user: "bob"
    };
  },
  methods: {
    loggedIn: () => {
      return true;
    },
    ...mapGetters(["browse"]),
    ...mapActions(["isSideBarOpen"])
  }
};
</script>

<style scoped>
.pageContent {
  height: 100vh;
}
.welcome {
  display: flex;
}
.welcome > div {
  flex: 1;
}
.welcome > div button {
  font-size: 0.75em;
  text-align: center;
  line-height: 2.3em;
  margin-right: 10px;
}
.greeting > h5 {
  margin: 0;
  line-height: 1.2em;
  font-size: 1.25rem;
  font-weight: 500;
}
</style>
