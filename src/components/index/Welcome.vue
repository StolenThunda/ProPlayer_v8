<template>
  <v-card>
    <v-row class="md-6" justify="center" no-gutters>
      <v-col offset-md="2">
        <div class="greeting">
          <H5>
            Welcome
            <span>{{ user || "Antonio" }}</span
            >,
          </H5>
        </div>
      </v-col>
      <v-col>
        <div class="welcome">
          <div>
            <v-btn color="success">
              <v-icon left>mdi-play-circle-outline</v-icon>Orientation
            </v-btn>
          </div>
          <div @click="$root.$emit('toggleSidebar')">
            <v-btn color="primary">
              <v-icon left>mdi-heart</v-icon>Favorites
            </v-btn>
          </div>
          <div>
            <v-btn color="primary" to="browser">
              <v-icon left>mdi-magnify</v-icon>Browse
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    user: String,
  },
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
